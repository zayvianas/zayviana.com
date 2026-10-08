"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"

const crafts = [
  { verb: "I sing", line: "Music and worship", color: "var(--accent-red)" },
  { verb: "I dance", line: "Movement and rhythm", color: "var(--accent-pink)" },
  { verb: "I model", line: "Style and presence", color: "var(--accent-green)" },
  { verb: "I paint", line: "Color and canvas", color: "var(--accent-red)" },
]

export default function CreatorView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)

  return (
    <main className={t.main}>
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <span className="mb-5 inline-block rounded-full bg-[var(--accent-green)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          The Creator
        </span>
        <h1 className={t.h1}>
          Made to create<span className="text-[var(--accent-red)]">.</span>
        </h1>
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${t.lead}`}>
          Creativity is a gift, and I don&apos;t take it for granted. It shows up in how I build and how I teach, and it shows up here too.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {crafts.map(({ verb, line, color }) => (
            <div key={verb} className={`${t.card} flex min-h-[200px] flex-col justify-end`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${t.faint}`}>{line}</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color }}>
                {verb}<span className={dark ? "text-white" : "text-[#0e0e10]"}>.</span>
              </h2>
            </div>
          ))}
        </div>
        <p className={`mt-10 text-center text-sm ${t.muted}`}>
          Photos, videos, and pieces are on the way. Check back soon.
        </p>
      </section>
    </main>
  )
}
