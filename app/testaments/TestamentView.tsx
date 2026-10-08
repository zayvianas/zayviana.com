"use client"

import { useState } from "react"
import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"
import { TAGS } from "./posts"

type ListItem = {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
  minutes: number
  draft: boolean
}

export default function TestamentView({ posts }: { posts: ListItem[] }) {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)
  const [tag, setTag] = useState<string | null>(null)

  const shown = tag ? posts.filter(p => p.tags.includes(tag)) : posts

  return (
    <main className={t.main}>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className={`mb-2 ${t.kicker}`}>Thoughts & Reflections</p>
        <h1 className="font-display text-6xl font-extrabold tracking-tight">
          Testaments<span className="text-[var(--accent-red)]">.</span>
        </h1>
        <p className={`mt-4 max-w-xl text-lg ${t.lead}`}>
          Faith, business, AI, and life. The record of what I believe and what I&apos;m learning, written to be read in about 5 to 10 minutes. Every post has a listen button if you&apos;d rather hear it.
        </p>

        {posts.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            <button onClick={() => setTag(null)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                tag === null ? "border-[var(--accent-red)] bg-[var(--accent-red)] text-white" : t.pill
              }`}>
              All
            </button>
            {TAGS.map(name => (
              <button key={name} onClick={() => setTag(tag === name ? null : name)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                  tag === name ? "border-[var(--accent-red)] bg-[var(--accent-red)] text-white" : t.pill
                }`}>
                {name}
              </button>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className={`mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center ${dark ? "border-white/15" : "border-gray-300"}`}>
            <p className="text-lg font-medium">The first Testament is on the way.</p>
            <p className={`mt-2 text-sm ${t.faint}`}>Check back soon.</p>
          </div>
        ) : (
          <div className="mt-12 flex flex-col">
            {shown.map(p => (
              <a key={p.slug} href={`/testaments/${p.slug}`}
                className={`group border-t py-8 transition ${t.rule}`}>
                <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.15em] ${t.faint}`}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.minutes} min read</span>
                  {p.draft && <span className="rounded-full bg-[var(--accent-pink)] px-2 py-0.5 text-[10px] text-white">Draft · preview only</span>}
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight transition group-hover:text-[var(--accent-red)] md:text-3xl">{p.title}</h2>
                <p className={`mt-2 text-base leading-relaxed ${t.muted}`}>{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map(name => (
                    <span key={name} className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${t.pill}`}>{name}</span>
                  ))}
                </div>
              </a>
            ))}
            {shown.length === 0 && (
              <p className={`border-t py-8 text-sm ${t.rule} ${t.muted}`}>Nothing tagged {tag} yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
