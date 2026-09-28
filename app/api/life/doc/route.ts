import { authed, unauthorized, redis, json, PREFIX, validPath } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

export async function PUT(req: Request) {
  if (!(await authed(req))) return unauthorized()
  let body: { path?: string; data?: unknown }
  try { body = await req.json() } catch { return json({ error: "bad_json" }, 400) }
  const path = String(body.path || "")
  if (!validPath(path) || !body.data || typeof body.data !== "object") return json({ error: "bad_request" }, 400)
  const str = JSON.stringify(body.data)
  if (str.length > 400_000) return json({ error: "too_large" }, 413)
  await redis("SET", PREFIX + path, str)
  return json({ ok: true })
}
