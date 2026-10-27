import type { MetadataRoute } from "next"
import { posts } from "./testaments/posts"

// Public pages only. HQ, Life OS, and the Study Shelf stay private (noindex).
const BASE = "https://zayviana.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/professional`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/believer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/testaments`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/connect`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/learner`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]
  const postPages: MetadataRoute.Sitemap = posts
    .filter(p => p.published)
    .map(p => ({ url: `${BASE}/testaments/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly", priority: 0.6 }))
  return [...pages, ...postPages]
}
