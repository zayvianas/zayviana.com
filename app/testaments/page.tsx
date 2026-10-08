import TestamentView from "./TestamentView"
import { visiblePosts, readingMinutes, formatDate } from "./posts"

export const metadata = { title: "Testaments · Zayviana" }

export default function TestamentPage() {
  const list = visiblePosts().map(p => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    date: formatDate(p.date),
    tags: p.tags,
    minutes: readingMinutes(p),
    draft: !p.published,
  }))
  return <TestamentView posts={list} />
}
