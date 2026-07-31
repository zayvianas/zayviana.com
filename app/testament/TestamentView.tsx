"use client"

import { useColorMode } from "../components/ColorModeProvider"

const tags = ["Faith", "AI", "Crypto", "Learning", "PM", "Life", "Business", "Tech"]

export default function TestamentView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white" : "min-h-screen bg-white text-[#0e0e10]"}>
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]">Thoughts & Reflections</p>
        <h1 className="font-display text-6xl font-extrabold tracking-tight">
          Testament<span className="text-[var(--accent-red)]">.</span>
        </h1>
        <p className={`mt-4 max-w-xl text-lg ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Faith, AI, crypto, life, all unfiltered. The record of what I believe and what I'm learning, tagged so you can follow the threads that resonate.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                dark
                  ? "border-white/20 text-white/80 hover:bg-[var(--accent-red)] hover:border-[var(--accent-red)] hover:text-white"
                  : "border-[#e11d48]/30 text-[#e11d48] hover:bg-[#e11d48] hover:text-white"
              }`}>
              {tag}
            </span>
          ))}
        </div>

        <div className={`mt-20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center ${dark ? "border-white/15" : "border-gray-200"}`}>
          <p className="text-4xl">✍🏾</p>
          <p className="mt-4 text-lg font-medium">First piece dropping soon.</p>
          <p className={`mt-2 text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>Check back. There's a lot on my mind.</p>
        </div>
      </div>
    </main>
  )
}
