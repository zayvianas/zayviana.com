import { authed, unauthorized, redis, json, PREFIX, validPath } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

// One-time import of a backup file: { plan, inbox, clients, days: { "YYYY-MM-DD": {...} } }
export async function POST(req: Request) {
  if (!authed(req)) return unauthorized()
  let b: { plan?: object; inbox?: object; clients?: object; days?: Record<string, object> }
  try { b = await req.json() } catch { return json({ error: "bad_json" }, 400) }
  const pairs: string[] = []
  const add = (path: string, v: unknown) => { if (v && typeof v === "object" && validPath(path)) pairs.push(PREFIX + path, JSON.stringify(v)) }
  add("config/plan", b.plan); add("config/inbox", b.inbox); add("config/clients", b.clients)
  Object.entries(b.days || {}).forEach(([k, v]) => add("days/" + k, v))
  if (!pairs.length) return json({ error: "empty" }, 400)
  await redis("MSET", ...pairs)
  return json({ ok: true, docs: pairs.length / 2 })
}
