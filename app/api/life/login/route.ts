import { checkPasscode, configured, createPasscode, json, COOKIE, needsSetup, sessionValue } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

async function signedIn() {
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${COOKIE}=${await sessionValue()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}`)
  return res
}

export async function POST(req: Request) {
  if (!configured()) return json({ error: "not_configured" }, 500)
  let body: { passcode?: string; setup?: boolean } = {}
  try { body = await req.json() } catch {}
  const passcode = String(body.passcode || "")
  // Small delay makes guessing slow.
  await new Promise((r) => setTimeout(r, 400))
  if (body.setup) {
    if (passcode.length < 6) return json({ error: "too_short" }, 400)
    if (!(await createPasscode(passcode))) return json({ error: "already_set" }, 409)
    return signedIn()
  }
  if (await needsSetup()) return json({ error: "setup" }, 401)
  if (!(await checkPasscode(passcode))) return json({ error: "wrong_passcode" }, 401)
  return signedIn()
}

export async function DELETE() {
  const res = json({ ok: true })
  res.headers.append("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`)
  return res
}
