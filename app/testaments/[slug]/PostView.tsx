"use client"

import Script from "next/script"
import { useColorMode } from "../../components/ColorModeProvider"
import { themeClasses } from "../../components/theme"
import type { Post } from "../posts"

export default function PostView({ post, date, minutes }: { post: Post; date: string; minutes: number }) {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)

  return (
    <main className={t.main}>
      <article className="mx-auto max-w-2xl px-6 py-20">
        <a href="/testaments" className={`tts-skip text-xs font-semibold uppercase tracking-[0.18em] ${t.faint} hover:text-[var(--accent-red)]`}>
          ← All Testaments
        </a>

        {!post.published && (
          <p className="tts-skip mt-6 rounded-xl bg-[var(--accent-pink)]/15 px-4 py-3 text-sm font-medium text-[var(--accent-pink)]">
            Draft. This post only shows on preview links, not on zayviana.com.
          </p>
        )}

        <header className="mt-8">
          <div className={`tts-skip flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.15em] ${t.faint}`}>
            <span>{date}</span>
            <span>·</span>
            <span>{minutes} min read</span>
            <span>·</span>
            <span>Tap play below to listen</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
          <p className={`mt-4 text-lg leading-relaxed ${t.muted}`}>{post.summary}</p>
          <div className="tts-skip mt-5 flex flex-wrap gap-2">
            {post.tags.map(name => (
              <span key={name} className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${t.pill}`}>{name}</span>
            ))}
          </div>
        </header>

        <div className={`mt-10 border-t pt-10 ${t.rule}`}>
          <div className={`flex flex-col gap-6 text-[17px] leading-[1.8] ${t.lead}`}>
            {post.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className={`mt-6 font-display text-2xl font-bold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`}>{b.text}</h2>
              if (b.type === "quote") return (
                <blockquote key={i} className="my-2 border-l-2 border-[var(--accent-red)] pl-6">
                  <p className={`font-display text-xl font-semibold leading-snug ${dark ? "text-white" : "text-[#0e0e10]"}`}>&ldquo;{b.text}&rdquo;</p>
                  {b.cite && <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.15em] ${t.faint}`}>{b.cite}</p>}
                </blockquote>
              )
              if (b.type === "list") return (
                <ul key={i} className="flex flex-col gap-2 pl-1">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-red)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )
              return <p key={i}>{b.text}</p>
            })}
          </div>
        </div>

        <div className={`tts-skip mt-16 rounded-2xl border p-8 text-center ${t.rule}`}>
          <p className="font-display text-xl font-bold">Thanks for reading.</p>
          <p className={`mt-2 text-sm ${t.muted}`}>If this one stuck with you, I&apos;d love to hear about it.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@zayviana.com" className={t.btnPrimary}>Send me a note</a>
            <a href="/testaments" className={t.btnGhost}>More Testaments</a>
          </div>
        </div>
      </article>
      <style>{`body{background:${dark ? "#0e0e10" : "var(--paper)"}}`}</style>
      <Script src="/learn/reader.js" strategy="afterInteractive" />
    </main>
  )
}
