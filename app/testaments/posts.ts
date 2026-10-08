// Testaments: Zayviana's newsletter-style posts.
// To add one, copy the template in TESTAMENTS.md at the repo root.
// Posts with published: false only show on Vercel preview links, never on zayviana.com.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }

export type Post = {
  slug: string
  title: string
  summary: string
  date: string // YYYY-MM-DD
  tags: string[]
  published: boolean
  body: Block[]
}

export const TAGS = ["Faith", "Business", "AI", "Tech", "PM", "Learning", "Money", "Life"]

export const posts: Post[] = [
  {
    slug: "sample-faith-first",
    title: "Why I Build Faith First",
    summary: "A sample Testament so you can see the layout. Rewrite it, replace it, or delete it.",
    date: "2026-10-07",
    tags: ["Faith", "Business"],
    published: false,
    body: [
      { type: "p", text: "This is a sample post. It's here so you can see how a Testament looks and sounds before the first real one goes up. Everything below is a placeholder written from things you've already said, so feel free to tear it up." },
      { type: "h2", text: "Where it started" },
      { type: "p", text: "I grew up in the church, wandered for a while, and came back. On February 4, 2024, I was baptized as an adult and rededicated my life to Jesus. When I look back now, I can see His hand on all of it, even the years I wasn't looking for Him." },
      { type: "p", text: "He's given me gifts I could never have given myself. And the longer I live, the more convinced I am that gifts aren't meant to be kept. They're meant to be used for other people." },
      { type: "h2", text: "What faith first actually looks like" },
      { type: "p", text: "Faith first doesn't mean I put a Bible verse on everything I make. Not everything needs a label. It means my faith shows up in the decisions nobody sees: how I price, how I treat a client who can't pay much, whether I tell the truth when a lie would close the deal faster." },
      { type: "list", items: ["Honesty comes before the sale.", "People come before the product.", "Generosity is part of the business model, not an afterthought."] },
      { type: "quote", text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", cite: "Matthew 5:16" },
      { type: "h2", text: "Why I'm writing this down" },
      { type: "p", text: "Testaments is my record. It's where I'll share what I believe, what I'm learning, and what God is doing, the good parts and the hard parts. If something here helps you, that's the whole point." },
      { type: "p", text: "Thanks for reading. If this one stuck with you, send me a note. I'd love to hear from you." },
    ],
  },
]

export function visiblePosts(): Post[] {
  const isProduction = process.env.VERCEL_ENV === "production"
  return posts
    .filter(p => p.published || !isProduction)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function readingMinutes(post: Post): number {
  const words = post.body
    .map(b => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}
