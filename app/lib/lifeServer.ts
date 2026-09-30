// Server helpers for Life OS (life.zayviana.com).
// Storage: Upstash Redis over its REST API. Auth: one passcode, signed cookie.
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto"

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ""
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ""
const ENV_SECRET = process.env.LIFE_SECRET || ""
const ENV_PASSCODE = process.env.LIFE_PASSCODE || ""

export const COOKIE = "life_session"
export const PREFIX = "life:"
const AUTH_KEY = PREFIX + "auth"

export function configured() {
  return Boolean(URL_ && TOKEN)
}

export async function redis<T = unknown>(...cmd: (string | number)[]): Promise<T> {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  })
  const json = (await res.json()) as { result?: T; error?: string }
  if (!res.ok || json.error) throw new Error(json.error || `Redis ${res.status}`)
  return json.result as T
}

/* The passcode is created in the app on first visit (stored hashed in Redis),
   unless LIFE_PASSCODE / LIFE_SECRET are set as environment variables. */
type AuthRecord = { salt: string; hash: string; secret: string }
let cached: AuthRecord | null = null

function hashPass(p: string, salt: string) {
  return scryptSync(p, salt, 32).toString("hex")
}

async function authRecord(): Promise<AuthRecord | null> {
  if (ENV_PASSCODE && ENV_SECRET) return { salt: "env", hash: hashPass(ENV_PASSCODE, "env"), secret: ENV_SECRET }
  if (cached) return cached
  if (!configured()) return null
  const raw = await redis<string | null>("GET", AUTH_KEY)
  cached = raw ? (JSON.parse(raw) as AuthRecord) : null
  return cached
}

export async function needsSetup() {
  return configured() && !(await authRecord())
}

// Only succeeds when no passcode exists yet.
export async function createPasscode(p: string) {
  const salt = randomBytes(16).toString("hex")
  const rec: AuthRecord = { salt, hash: hashPass(p, salt), secret: randomBytes(32).toString("hex") }
  const ok = await redis<string | null>("SET", AUTH_KEY, JSON.stringify(rec), "NX")
  if (ok !== "OK") return false
  cached = rec
  return true
}

function sign(secret: string, value: string) {
  return createHmac("sha256", secret).update(value).digest("hex")
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export async function checkPasscode(p: string) {
  const rec = await authRecord()
  return !!rec && safeEqual(hashPass(p, rec.salt), rec.hash)
}

export async function sessionValue() {
  const rec = await authRecord()
  return rec ? sign(rec.secret, "session:v1") : ""
}

export async function feedToken() {
  const rec = await authRecord()
  return rec ? sign(rec.secret, "feed:v1").slice(0, 32) : ""
}

export async function authed(req: Request) {
  if (!configured()) return false
  const want = await sessionValue()
  if (!want) return false
  const raw = req.headers.get("cookie") || ""
  const m = raw.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"))
  return !!m && safeEqual(m[1], want)
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  })
}

export async function unauthorized() {
  if (!configured()) return json({ error: "not_configured" }, 401)
  return json({ error: (await needsSetup()) ? "setup" : "locked" }, 401)
}

// Only these document paths can be written.
export function validPath(path: string) {
  return /^(config\/(plan|inbox|clients|money)|days\/\d{4}-\d{2}-\d{2})$/.test(path)
}

/* ---------- calendar (.ics) ---------- */
export type Task = { id: string; text: string; date?: string; time?: string; dur?: number; client?: string; done?: boolean }

function icsEscape(s: string) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n")
}
function fold(line: string) {
  const out: string[] = []
  let s = line
  while (s.length > 73) { out.push(s.slice(0, 73)); s = " " + s.slice(73) }
  out.push(s)
  return out.join("\r\n")
}
function ymd(d: string) { return d.replace(/-/g, "") }
function addMinutes(date: string, time: string, mins: number) {
  const [y, mo, d] = date.split("-").map(Number)
  const [h, mi] = time.split(":").map(Number)
  const t = new Date(Date.UTC(y, mo - 1, d, h, mi) + mins * 60000)
  const p = (n: number) => String(n).padStart(2, "0")
  return `${t.getUTCFullYear()}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}T${p(t.getUTCHours())}${p(t.getUTCMinutes())}00`
}
function nextDay(date: string) {
  const [y, mo, d] = date.split("-").map(Number)
  const t = new Date(Date.UTC(y, mo - 1, d + 1))
  const p = (n: number) => String(n).padStart(2, "0")
  return `${t.getUTCFullYear()}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}`
}

const TZID = "America/New_York"
const VTZ = [
  "BEGIN:VTIMEZONE", "TZID:America/New_York",
  "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400", "TZNAME:EDT", "DTSTART:19700308T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
  "BEGIN:STANDARD", "TZOFFSETFROM:-0400", "TZOFFSETTO:-0500", "TZNAME:EST", "DTSTART:19701101T020000", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD",
  "END:VTIMEZONE",
]

export function buildIcs(tasks: Task[], clientNames: Record<string, string>, calName = "Life OS") {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Zayviana//Life OS//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:" + icsEscape(calName), "X-WR-TIMEZONE:" + TZID, ...VTZ]
  for (const t of tasks) {
    if (!t.date || !/^\d{4}-\d{2}-\d{2}$/.test(t.date)) continue
    const cn = t.client ? clientNames[t.client] : ""
    lines.push("BEGIN:VEVENT", "UID:" + t.id + "@life.zayviana.com", "DTSTAMP:" + stamp)
    if (t.time && /^\d{2}:\d{2}$/.test(t.time)) {
      lines.push(`DTSTART;TZID=${TZID}:${ymd(t.date)}T${t.time.replace(":", "")}00`)
      lines.push(`DTEND;TZID=${TZID}:${addMinutes(t.date, t.time, t.dur || 30)}`)
    } else {
      lines.push(`DTSTART;VALUE=DATE:${ymd(t.date)}`, `DTEND;VALUE=DATE:${nextDay(t.date)}`)
    }
    lines.push("SUMMARY:" + icsEscape((t.done ? "✓ " : "") + t.text))
    if (cn) lines.push("DESCRIPTION:" + icsEscape("Client: " + cn))
    if (t.time) lines.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + icsEscape(t.text), "TRIGGER:-PT15M", "END:VALARM")
    lines.push("END:VEVENT")
  }
  lines.push("END:VCALENDAR")
  return lines.map(fold).join("\r\n") + "\r\n"
}

type MoneyItem = { id: string; name: string; isDebt?: boolean; min?: number; due?: string; payer?: string; type?: string; status?: string; balance?: number; until?: string }

export async function loadTasksAndClients() {
  const [inbox, clients, money] = await redis<(string | null)[]>("MGET", PREFIX + "config/inbox", PREFIX + "config/clients", PREFIX + "config/money")
  const tasks: Task[] = inbox ? (JSON.parse(inbox).items || []) : []
  // Money due dates show up in the calendar too.
  const items: MoneyItem[] = money ? (JSON.parse(money).items || []) : []
  items.forEach((i) => {
    const owes = i.isDebt || i.type === "card" || i.type === "bnpl" || i.type === "loan" ? Number(i.balance) > 0.009 : i.status !== "canceled"
    if (i.type === "income" || !i.due || !(Number(i.min) > 0) || (i.payer && i.payer !== "me") || !owes || (i.until && i.due >= i.until)) return
    tasks.push({ id: "pay-" + i.id + "-" + i.due, text: `Pay ${i.name} $${Number(i.min).toFixed(2)}`, date: i.due })
  })
  const cl: { id: string; name: string }[] = clients ? (JSON.parse(clients).items || []) : []
  const names: Record<string, string> = {}
  cl.forEach((c) => { names[c.id] = c.name })
  return { tasks, names }
}
