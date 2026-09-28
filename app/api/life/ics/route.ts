import { authed, buildIcs, loadTasksAndClients } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

// One task (?id=) or one week (?week=YYYY-MM-DD, the Monday). Opening this on
// an iPhone or Mac offers "Add to Calendar".
export async function GET(req: Request) {
  if (!authed(req)) return new Response("Open Life OS and enter your passcode first.", { status: 401 })
  const q = new URL(req.url).searchParams
  const { tasks, names } = await loadTasksAndClients()
  let list = tasks.filter((t) => t.date && !t.done)
  let file = "life-os.ics"
  const id = q.get("id"), week = q.get("week")
  if (id) { list = list.filter((t) => t.id === id); file = "task.ics" }
  else if (week && /^\d{4}-\d{2}-\d{2}$/.test(week)) {
    const [y, m, d] = week.split("-").map(Number)
    const end = new Date(Date.UTC(y, m - 1, d + 6)).toISOString().slice(0, 10)
    list = list.filter((t) => t.date! >= week && t.date! <= end)
    file = "week-" + week + ".ics"
  }
  if (!list.length) return new Response("Nothing to add.", { status: 404 })
  return new Response(buildIcs(list, names), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `inline; filename="${file}"`, "Cache-Control": "no-store" },
  })
}
