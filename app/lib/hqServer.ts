// Server helpers for HQ (hq.zayviana.com).
// State (tasks, cards you add, edits) lives in the same Upstash Redis as Life OS, under "hq:".
// Money and sessions come live from the CornerStone Hub and TGT Hub through their
// read-only /hq summary doors. "Last touched" comes from GitHub when GITHUB_TOKEN is set.
import { redis, HQ_COOKIE, hqAuthedCookie } from "./lifeServer"

const STATE_KEY = "hq:state"
const GH_CACHE = "hq:cache:github"

const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "").trim()
const FEED = () => clean(process.env.HQ_FEED_TOKEN)
const GH = () => clean(process.env.GITHUB_TOKEN)

export async function hqAuthed(req: Request) {
  const raw = req.headers.get("cookie") || ""
  const m = raw.match(new RegExp("(?:^|;\\s*)" + HQ_COOKIE + "=([^;]+)"))
  return hqAuthedCookie(m ? m[1] : undefined)
}

export async function readState(): Promise<unknown | null> {
  const raw = await redis<string | null>("GET", STATE_KEY)
  return raw ? JSON.parse(raw) : null
}

export async function writeState(state: unknown) {
  const text = JSON.stringify(state)
  if (text.length > 900_000) throw new Error("too_big")
  await redis("SET", STATE_KEY, text)
}

/* ---------- live data ---------- */
export type HubResult = { ok: true; data: Record<string, unknown> } | { ok: false; reason: "not_connected" | "unreachable" | "locked"; url: string }

async function hub(url: string, page: string): Promise<HubResult> {
  if (FEED().length < 32) return { ok: false, reason: "not_connected", url: page }
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${FEED()}` }, cache: "no-store", signal: AbortSignal.timeout(8000) })
    if (r.status === 401 || r.status === 503) return { ok: false, reason: r.status === 401 ? "locked" : "not_connected", url: page }
    if (!r.ok) return { ok: false, reason: "unreachable", url: page }
    return { ok: true, data: await r.json() }
  } catch {
    return { ok: false, reason: "unreachable", url: page }
  }
}

// Every repo HQ cares about. Most are private, so this needs a read-only GITHUB_TOKEN.
const REPOS = ["cornerstone-labs", "the-good-tutor", "tgt-asvab", "nestegg-app", "loop-timer", "steady-trader", "christian-anonymous", "nearby-landing", "zayviana.com"]

async function github(fresh: boolean): Promise<{ connected: boolean; pushed: Record<string, string> }> {
  if (!GH()) return { connected: false, pushed: {} }
  if (!fresh) {
    const cached = await redis<string | null>("GET", GH_CACHE).catch(() => null)
    if (cached) return { connected: true, pushed: JSON.parse(cached) }
  }
  const pushed: Record<string, string> = {}
  await Promise.all(
    REPOS.map(async (repo) => {
      try {
        const r = await fetch(`https://api.github.com/repos/zayvianas/${repo}`, {
          headers: { Authorization: `Bearer ${GH()}`, Accept: "application/vnd.github+json", "User-Agent": "zayviana-hq" },
          cache: "no-store",
          signal: AbortSignal.timeout(6000),
        })
        if (r.ok) {
          const j = (await r.json()) as { pushed_at?: string }
          if (j.pushed_at) pushed[repo] = j.pushed_at
        }
      } catch {}
    }),
  )
  await redis("SET", GH_CACHE, JSON.stringify(pushed), "EX", 1800).catch(() => null)
  return { connected: true, pushed }
}

export async function liveData(fresh = false) {
  const [tgt, csl, gh] = await Promise.all([
    hub("https://learnwithtgt.com/api/hq-summary", "https://hub.learnwithtgt.com"),
    hub("https://hub.cstonelabs.com/api/hq/summary", "https://hub.cstonelabs.com"),
    github(fresh),
  ])
  return { checkedAt: new Date().toISOString(), tgt, csl, github: gh }
}
