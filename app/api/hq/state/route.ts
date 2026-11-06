import { json, configured } from "../../../lib/lifeServer"
import { hqAuthed, readState, writeState } from "../../../lib/hqServer"

export const dynamic = "force-dynamic"

// HQ's tasks, the cards you add, and your edits. One JSON document, synced across devices.
export async function GET(req: Request) {
  if (!configured() || !(await hqAuthed(req))) return json({ error: "locked" }, 401)
  return json({ state: await readState() })
}

export async function PUT(req: Request) {
  if (!configured() || !(await hqAuthed(req))) return json({ error: "locked" }, 401)
  let body: { state?: unknown } = {}
  try { body = await req.json() } catch { return json({ error: "bad_json" }, 400) }
  if (!body.state || typeof body.state !== "object") return json({ error: "no_state" }, 400)
  try { await writeState(body.state) } catch (e) { return json({ error: String((e as Error).message || e) }, 400) }
  return json({ ok: true, savedAt: new Date().toISOString() })
}
