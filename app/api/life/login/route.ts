import { checkPasscode, configured, json, COOKIE, sessionValue } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  if (!configured()) return json({ error: "not_configured" }, 500)
  let passcode = ""
  try { passcode = String((await req.json()).passcode || "") } catch {}
  // Small delay makes guessing slow.
  await new Promise((r) => setTimeout(r, 400))
  if (!checkPasscode(passcode)) return json({ error: "wrong_passcode" }, 401)
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${COOKIE}=${sessionValue()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}`)
  return res
}

export async function DELETE() {
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`)
  return res
}
