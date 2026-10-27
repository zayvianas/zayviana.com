import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/hq"] },
    sitemap: "https://zayviana.com/sitemap.xml",
    host: "https://zayviana.com",
  }
}
