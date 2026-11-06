import { json, configured } from "../../../lib/lifeServer"
import { hqAuthed, liveData } from "../../../lib/hqServer"

export const dynamic = "force-dynamic"

// Money and sessions from both hubs, plus when each repo was last pushed.
export async function GET(req: Request) {
  if (!configured() || !(await hqAuthed(req))) return json({ error: "locked" }, 401)
  const fresh = new URL(req.url).searchParams.get("fresh") === "1"
  return json(await liveData(fresh))
}
