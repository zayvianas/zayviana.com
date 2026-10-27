import { checkPasscode, configured, json, needsSetup, HQ_COOKIE, hqSessionValue } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  if (!configured()) return json({ error: "not_configured" }, 500)
  let body: { passcode?: string } = {}
  try { body = await req.json() } catch {}
  // Small delay makes guessing slow.
  await new Promise((r) => setTimeout(r, 600))
  // HQ never creates a passcode. Set it up in Life OS first.
  if (await needsSetup()) return json({ error: "setup" }, 401)
  if (!(await checkPasscode(String(body.passcode || "")))) return json({ error: "wrong_passcode" }, 401)
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${HQ_COOKIE}=${await hqSessionValue()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 90}`)
  return res
}

export async function DELETE() {
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${HQ_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`)
  return res
}
