"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"
import { FaLinkedin, FaEnvelope } from "react-icons/fa"

// Booking links from Google Calendar appointment schedules.
// Set a link to null to hide that option.
const calls: { length: string; label: string; desc: string; href: string | null; color: string }[] = [
  {
    length: "15 min",
    label: "Quick hello",
    desc: "Say hi, ask a quick question, or see if we should talk longer.",
    href: null,
    color: "#f472b6",
  },
  {
    length: "30 min",
    label: "Intro chat",
    desc: "Get to know each other. Great for recruiters, collaborators, and new connections.",
    href: "https://calendar.app.google/6SxperZ148UqN4vz9",
    color: "#e11d48",
  },
  {
    length: "1 hour",
    label: "Deep conversation",
    desc: "Room to dig in: a project, an idea, career advice, or mentorship.",
    href: "https://calendar.app.google/wZpM17NFu1f9cUTp7",
    color: "#10b981",
  },
]

export default function ConnectView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)
  const liveCalls = calls.filter(c => c.href)

  return (
    <main className={t.main}>
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p className={`mb-2 ${t.kicker}`}>Let&apos;s Talk</p>
        <h1 className={t.h1}>
          Connect<span className="text-[var(--accent-red)]">.</span>
        </h1>
        <p className={`mt-4 max-w-xl text-lg ${t.lead}`}>
          Whether it&apos;s a project, a question, or just a conversation, I&apos;d love to hear from you. Pick whatever works best.
        </p>

        {/* CALLS */}
        <h2 className={`mt-16 mb-6 ${t.h2}`}>Book a call</h2>
        <div className={`grid gap-5 ${liveCalls.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {liveCalls.map(({ length, label, desc, href, color }) => (
            <a key={length} href={href!} target="_blank" rel="noopener noreferrer" className={`${t.cardHover} flex flex-col`}>
              <span className="font-display text-3xl font-extrabold tracking-tight" style={{ color }}>{length}</span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em]">{label}</span>
              <p className={`mt-3 flex-1 text-sm leading-relaxed ${t.muted}`}>{desc}</p>
              <span className="mt-5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color }}>Pick a time →</span>
            </a>
          ))}
        </div>

        {/* OTHER WAYS */}
        <h2 className={`mt-16 mb-6 ${t.h2}`}>Or reach out</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer" className={`${t.cardHover} flex items-start gap-4`}>
            <FaLinkedin className="mt-1 shrink-0 text-2xl text-[#0a66c2]" />
            <div>
              <p className="font-display text-lg font-bold">LinkedIn</p>
              <p className={`mt-1 text-sm ${t.muted}`}>Connect professionally or send me a message.</p>
            </div>
          </a>
          <a href="mailto:hello@zayviana.com" className={`${t.cardHover} flex items-start gap-4`}>
            <FaEnvelope className="mt-1 shrink-0 text-2xl text-[var(--accent-red)]" />
            <div>
              <p className="font-display text-lg font-bold">Email</p>
              <p className={`mt-1 text-sm ${t.muted}`}>hello@zayviana.com. I read every note.</p>
            </div>
          </a>
        </div>

        {/* LOOKING FOR SOMETHING SPECIFIC */}
        <div className={`mt-16 rounded-3xl border border-dashed p-8 md:p-10 ${dark ? "border-white/20" : "border-black/15"}`}>
          <p className={`mb-6 ${t.kicker}`}>Looking for something specific?</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-display text-xl font-bold">Help for your business</p>
              <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>
                AI workflows, better processes, and modern websites go through CornerStone Labs.
              </p>
              <a href="https://cstonelabs.com" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)] hover:opacity-70">
                Visit CornerStone Labs →
              </a>
            </div>
            <div>
              <p className="font-display text-xl font-bold">Tutoring</p>
              <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>
                Math, science, coding, and test prep sessions are booked through The Good Tutor.
              </p>
              <a href="https://learnwithtgt.com" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-green)] hover:opacity-70">
                Visit The Good Tutor →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
