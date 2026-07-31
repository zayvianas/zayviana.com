"use client"

import { useColorMode } from "../components/ColorModeProvider"

const ventures = [
  {
    name: "The Good Tutor",
    tagline: "Education rooted in empathy.",
    desc: "A tutoring and education brand built for people who think differently. Rooted in a personal story of ADHD, dyslexia, and a deep love of learning.",
    status: "Active",
    color: "#10b981",
  },
  {
    name: "Nest Egg",
    tagline: "Financial futures, for everyone.",
    desc: "A financial wellness venture focused on helping people, especially underrepresented communities, build sustainable financial habits and wealth. V1 is live.",
    status: "Live",
    color: "#e11d48",
  },
  {
    name: "Nearby",
    tagline: "Community, close to home.",
    desc: "A location-aware app connecting people to what's around them: local events, businesses, and opportunities hiding in plain sight.",
    status: "Building",
    color: "#f472b6",
  },
  {
    name: "Christians Anonymous",
    tagline: "Faith in the open.",
    desc: "A community and content brand for Christians who are honest about doubt, struggle, and growth, with no performance required.",
    status: "Building",
    color: "#e11d48",
  },
]

export default function VenturesView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white" : "min-h-screen bg-[var(--paper)] text-[#0e0e10]"}>
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]">What I'm Building</p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Ventures</h1>
        <p className={`mt-4 max-w-xl text-lg ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Ideas turned into real things. Each one rooted in a problem worth solving.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {ventures.map(({ name, tagline, desc, status, color }) => (
            <div key={name} className={`rounded-2xl border p-8 transition duration-200 hover:-translate-y-1 ${
              dark ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10" : "border-black/10 hover:shadow-md"
            }`}>
              <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: color }}>
                {status}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">{name}</h2>
              <p className="mt-1 text-sm font-medium" style={{ color }}>{tagline}</p>
              <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
            </div>
          ))}
        </div>

        <p className={`mt-12 text-center text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>More ventures in stealth. Stay tuned.</p>
      </div>
    </main>
  )
}
