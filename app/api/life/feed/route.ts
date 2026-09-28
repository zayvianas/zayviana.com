import { buildIcs, configured, feedToken, loadTasksAndClients } from "../../../lib/lifeServer"
import { timingSafeEqual } from "crypto"

export const dynamic = "force-dynamic"

// Subscription feed for Apple Calendar: webcal://life.zayviana.com/api/life/feed?token=...
// Every task with a date shows up and updates on its own.
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || ""
  const want = configured() ? feedToken() : ""
  const ok = want && token.length === want.length && timingSafeEqual(Buffer.from(token), Buffer.from(want))
  if (!ok) return new Response("Not found", { status: 404 })
  const { tasks, names } = await loadTasksAndClients()
  const since = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10)
  const list = tasks.filter((t) => t.date && t.date >= since)
  return new Response(buildIcs(list, names), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Cache-Control": "no-store" },
  })
}
