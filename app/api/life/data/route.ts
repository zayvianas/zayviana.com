import { authed, unauthorized, redis, json, PREFIX, feedToken } from "../../../lib/lifeServer"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  if (!(await authed(req))) return unauthorized()
  const dayKeys: string[] = []
  let cursor = "0"
  do {
    const [next, keys] = await redis<[string, string[]]>("SCAN", cursor, "MATCH", PREFIX + "days/*", "COUNT", 500)
    cursor = next
    dayKeys.push(...keys)
  } while (cursor !== "0")
  const keys = [PREFIX + "config/plan", PREFIX + "config/inbox", PREFIX + "config/clients", ...dayKeys]
  const vals = await redis<(string | null)[]>("MGET", ...keys)
  const parse = (v: string | null) => (v ? JSON.parse(v) : null)
  const days: Record<string, unknown> = {}
  dayKeys.forEach((k, i) => { const v = parse(vals[i + 3]); if (v) days[k.slice((PREFIX + "days/").length)] = v })
  return json({ plan: parse(vals[0]), inbox: parse(vals[1]) || { items: [] }, clients: parse(vals[2]) || { items: [] }, days, feedToken: await feedToken() })
}
