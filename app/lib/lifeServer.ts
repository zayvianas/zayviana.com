// Server helpers for Life OS (life.zayviana.com).
// Storage: Upstash Redis over its REST API. Auth: one passcode, signed cookie.
import { createHmac, timingSafeEqual } from "crypto"

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ""
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ""
const SECRET = process.env.LIFE_SECRET || ""
const PASSCODE = process.env.LIFE_PASSCODE || ""

export const COOKIE = "life_session"
export const PREFIX = "life:"

export function configured() {
  return Boolean(URL_ && TOKEN && SECRET && PASSCODE)
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

function sign(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex")
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function checkPasscode(p: string) {
  return !!PASSCODE && safeEqual(sign("pass:" + p), sign("pass:" + PASSCODE))
}

export function sessionValue() {
  return sign("session:v1")
}

export function feedToken() {
  return sign("feed:v1").slice(0, 32)
}

export function authed(req: Request) {
  if (!configured()) return false
  const raw = req.headers.get("cookie") || ""
  const m = raw.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"))
  return !!m && safeEqual(m[1], sessionValue())
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  })
}

export function unauthorized() {
  return json({ error: configured() ? "locked" : "not_configured" }, 401)
}

// Only these document paths can be written.
export function validPath(path: string) {
  return /^(config\/(plan|inbox|clients)|days\/\d{4}-\d{2}-\d{2})$/.test(path)
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

export async function loadTasksAndClients() {
  const [inbox, clients] = await redis<(string | null)[]>("MGET", PREFIX + "config/inbox", PREFIX + "config/clients")
  const tasks: Task[] = inbox ? (JSON.parse(inbox).items || []) : []
  const cl: { id: string; name: string }[] = clients ? (JSON.parse(clients).items || []) : []
  const names: Record<string, string> = {}
  cl.forEach((c) => { names[c.id] = c.name })
  return { tasks, names }
}
