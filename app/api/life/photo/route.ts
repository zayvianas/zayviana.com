import { randomBytes } from "crypto"
import { authed, unauthorized, redis, json, PREFIX } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

// Photos are resized in the browser to a small JPEG before upload.
export async function POST(req: Request) {
  if (!(await authed(req))) return unauthorized()
  let data = ""
  try { data = String((await req.json()).data || "") } catch { return json({ error: "bad_json" }, 400) }
  const m = data.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/)
  if (!m) return json({ error: "not_an_image" }, 400)
  if (m[2].length > 900_000) return json({ error: "too_large" }, 413)
  const id = randomBytes(12).toString("hex")
  await redis("SET", PREFIX + "photo:" + id, data)
  return json({ id })
}

export async function GET(req: Request) {
  if (!(await authed(req))) return new Response("Locked", { status: 401 })
  const id = new URL(req.url).searchParams.get("id") || ""
  if (!/^[a-f0-9]{24}$/.test(id)) return new Response("Not found", { status: 404 })
  const data = await redis<string | null>("GET", PREFIX + "photo:" + id)
  const m = data && data.match(/^data:(image\/[a-z]+);base64,(.+)$/)
  if (!m) return new Response("Not found", { status: 404 })
  return new Response(Buffer.from(m[2], "base64"), { headers: { "Content-Type": m[1], "Cache-Control": "private, max-age=31536000, immutable" } })
}

export async function DELETE(req: Request) {
  if (!(await authed(req))) return unauthorized()
  const id = new URL(req.url).searchParams.get("id") || ""
  if (/^[a-f0-9]{24}$/.test(id)) await redis("DEL", PREFIX + "photo:" + id)
  return json({ ok: true })
}
