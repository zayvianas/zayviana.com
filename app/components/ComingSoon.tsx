"use client"

import { useColorMode } from "./ColorModeProvider"

type Props = {
  tag: string
  tagColor: string
  title: React.ReactNode
  lines: string[]
  note?: { text: string; color: string }
  primary?: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
}

export default function ComingSoon({ tag, tagColor, title, lines, note, primary, secondary }: Props) {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white" : "min-h-screen bg-white text-[#0e0e10]"}>
      <div className="flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white" style={{ backgroundColor: tagColor }}>
          {tag}
        </span>

        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
          {title}
        </h1>

        {lines.map((line, i) => (
          <p key={i} className={`mt-${i === 0 ? "6" : "4"} max-w-xl text-${i === 0 ? "lg" : "base"} ${
            dark ? (i === 0 ? "text-gray-300" : "text-gray-400") : (i === 0 ? "text-gray-600" : "text-gray-500")
          }`}>
            {line}
          </p>
        ))}

        {note && (
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: note.color }}>
            {note.text}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-3">
          {primary && (
            <a href={primary.href}
              {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{ backgroundColor: tagColor }}
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:opacity-90">
              {primary.label}
            </a>
          )}
          {secondary && (
            <a href={secondary.href}
              {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`text-sm underline underline-offset-4 transition ${dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#0e0e10]"}`}>
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
