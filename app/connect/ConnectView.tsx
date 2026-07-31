"use client"

import { useColorMode } from "../components/ColorModeProvider"

const ways = [
  {
    label: "LinkedIn",
    desc: "Professional connection, collabs, or consulting inquiries.",
    href: "https://linkedin.com/in/zayviana",
    cta: "Connect on LinkedIn",
    color: "#e11d48",
    external: true,
  },
  {
    label: "Email",
    desc: "For detailed inquiries, partnerships, or anything that needs a real conversation.",
    href: "mailto:hello@zayviana.com",
    cta: "Send an email",
    color: "#f472b6",
    external: false,
  },
  {
    label: "The Good Tutor",
    desc: "Looking for tutoring or educational support? This is the place.",
    href: "https://thegoodtutor.co",
    cta: "Book a session",
    color: "#10b981",
    external: true,
  },
]

export default function ConnectView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  const card = dark
    ? "rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    : "rounded-2xl border border-black/10 p-8 transition duration-200 hover:-translate-y-1 hover:shadow-md"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white" : "min-h-screen bg-white text-[#0e0e10]"}>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]">Let's Talk</p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Connect</h1>
        <p className={`mt-4 max-w-xl text-lg ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Whether it's a project, a question, or just a conversation, I'm here for it.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {ways.map(({ label, desc, href, cta, color, external }) => (
            <div key={label} className={card}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color }}>{label}</p>
              <p className={`mt-3 text-base leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-5 inline-block rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <div className={`mt-16 rounded-2xl border border-dashed p-10 text-center ${dark ? "border-white/15" : "border-gray-200"}`}>
          <p className="font-display text-2xl font-bold tracking-tight">Got a big idea?</p>
          <p className={`mx-auto mt-3 max-w-md text-sm ${dark ? "text-gray-400" : "text-gray-400"}`}>
            I work with founders, brands, and teams at the intersection of AI, product, and impact. If something's brewing, let's build it.
          </p>
          <a
            href="mailto:hello@zayviana.com"
            className="mt-6 inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:opacity-90"
          >
            Start the conversation
          </a>
        </div>
      </div>
    </main>
  )
}
