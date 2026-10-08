"use client"

import { useState, useEffect, useRef } from "react"
import { useColorMode } from "./components/ColorModeProvider"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])
  return { ref, visible }
}

const pillarData = [
  {
    name: "Believer",
    color: "var(--accent-red)",
    href: "/believer",
    desc: "Faith is the foundation of my life, the why behind everything. It shapes how I think, how I lead, and how I build.",
    evidence: "Faith · Testimony · Community",
  },
  {
    name: "Builder",
    color: "var(--accent-pink)",
    href: "/professional",
    desc: "I turn ideas into real things: products, systems, ventures. A decade of PM, AI, data, and founding what didn't exist yet.",
    evidence: "Portfolio · PM · AI · Founder",
  },
  {
    name: "Creator",
    color: "var(--accent-green)",
    href: "/creative",
    desc: "I sing, I dance, I model, I paint. Creativity runs through everything I do, and it's all rooted in gratitude.",
    evidence: "Music · Movement · Art · Design",
  },
]

type Venture = {
  name: string
  forWho: string
  desc: string
  color: string
  status?: string
  href: string | null
  cta: string
  external?: boolean
}

const ventures: Venture[] = [
  {
    name: "CornerStone Labs",
    forWho: "Need help with your business",
    desc: "AI and technology consulting that helps businesses work smarter, with AI workflows, better processes, and modern websites. In person across the Greater Tampa Bay area, online worldwide.",
    color: "var(--accent-red)",
    href: "https://cstonelabs.com",
    cta: "Visit CornerStone Labs",
    external: true,
  },
  {
    name: "The Good Tutor",
    forWho: "Looking for a tutor",
    desc: "Math, science, coding, and test prep for middle schoolers through adults. In person across the Greater Tampa Bay area, online worldwide.",
    color: "var(--accent-green)",
    href: "https://learnwithtgt.com",
    cta: "Visit The Good Tutor",
    external: true,
  },
  {
    name: "Christians Anonymous",
    forWho: "Looking for Christian community",
    desc: "A home for Christians in Tampa Bay. Find events, find a church home through other people's experiences, and find your people.",
    color: "var(--accent-pink)",
    status: "Coming soon",
    href: "/believer#community",
    cta: "Learn more",
  },
]

export default function Home() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  const pillars = useFadeUp()
  const venturesSection = useFadeUp()
  const connect = useFadeUp()

  const cardBase = dark
    ? "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    : "rounded-3xl border border-black/10 bg-black/[0.03] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-black/[0.05]"
  const cardStatic = dark
    ? "rounded-3xl border border-white/10 bg-white/5"
    : "rounded-3xl border border-black/10 bg-black/[0.03]"

  const kicker = "text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]"
  const h2 = `font-display text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`
  const muted = dark ? "text-gray-400" : "text-gray-600"
  const faint = dark ? "text-gray-500" : "text-gray-400"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white transition-colors duration-300" : "min-h-screen bg-[var(--paper)] text-[#0e0e10] transition-colors duration-300"}>

      {/* HERO */}
      <section className="relative flex min-h-[88vh] w-full items-center overflow-hidden">
        <img
          src={dark ? "/black-swirl.png" : "/swirl.png"}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover swirl-animate ${dark ? "opacity-25" : "opacity-70"}`}
        />
        <div className={`absolute inset-0 ${dark ? "bg-[#0e0e10]/82" : "bg-[var(--paper)]/35"}`} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <h1 className={`font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-8xl ${dark ? "text-white" : "text-[#0e0e10]"}`}>
            ZAYVIANA<span className="text-[var(--accent-red)]">.</span>
          </h1>

          <p className="mt-5 font-display text-xl font-bold md:text-2xl">
            <span className="text-[var(--accent-red)]">Believer</span>
            <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
            <span className="text-[var(--accent-pink)]">Builder</span>
            <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
            <span className="text-[var(--accent-green)]">Creator</span>
          </p>

          <p className={`mt-6 max-w-xl text-lg ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Hi, I&apos;m Zayviana. This is where you&apos;ll find my story, my work, and everything I&apos;m building.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#ventures"
              className="rounded-full bg-[var(--accent-red)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
              Find what you&apos;re looking for
            </a>
            <a href="/connect"
              className={`rounded-full border px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
                dark ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
                     : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
              }`}>
              Connect
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section ref={pillars.ref} className={`fade-up ${pillars.visible ? "visible" : ""} px-6 pt-24 pb-20`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>Who I Am</p>
          <h2 className={`mb-3 text-center ${h2}`}>Three things, one foundation</h2>
          <p className={`mb-12 text-center text-base ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Different passions. One root: faith.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {pillarData.map(({ name, color, href, desc, evidence }) => {
              const inner = (
                <>
                  <h3 className="font-display text-2xl font-bold" style={{ color }}>{name}</h3>
                  <p className={`mt-4 text-sm leading-relaxed ${muted}`}>{desc}</p>
                  <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.12em] ${faint}`}>{evidence}</p>
                </>
              )
              return href
                ? <a key={name} href={href} className={`${cardBase} block p-8`}>{inner}</a>
                : <div key={name} className={`${cardStatic} p-8`}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      {/* VENTURES - which Zayviana did you meet? */}
      <section id="ventures" ref={venturesSection.ref} className={`fade-up ${venturesSection.visible ? "visible" : ""} scroll-mt-20 px-6 py-24 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>What Brought You Here?</p>
          <h2 className={`mb-3 text-center ${h2}`}>Which Zayviana did you meet?</h2>
          <p className={`mx-auto mb-12 max-w-xl text-center text-base ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Maybe you met the business owner, the tutor, or someone from church. Here&apos;s where to find each one.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {ventures.map(({ name, forWho, desc, color, status, href, cta, external }) => (
              <div key={name} className={`${href ? cardBase : cardStatic} flex flex-col p-8`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color }}>{forWho}</span>
                  {status && (
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${dark ? "border-white/20 text-gray-400" : "border-black/15 text-gray-500"}`}>
                      {status}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">{name}</h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${muted}`}>{desc}</p>
                {href && (
                  <a href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-6 inline-block self-start rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90"
                    style={{ backgroundColor: color }}>
                    {cta}
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className={`mt-10 text-center text-sm ${muted}`}>
            Here for my professional background?{" "}
            <a href="/professional" className="font-semibold text-[var(--accent-red)] underline-offset-4 hover:underline">See my portfolio</a>
          </p>
        </div>
      </section>

      {/* CONNECT */}
      <section ref={connect.ref} className={`fade-up ${connect.visible ? "visible" : ""} px-6 py-24`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`mb-4 font-display text-4xl font-extrabold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`}>
            Let&apos;s talk<span className="text-[var(--accent-red)]">.</span>
          </h2>
          <p className={`mx-auto mb-8 max-w-md text-base ${muted}`}>
            A quick hello, a real conversation, or a project. Pick a time that works for you.
          </p>
          <a href="/connect"
            className="inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Connect with me
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`w-full px-6 py-14 transition-colors duration-300 ${dark ? "border-t border-white/10" : "border-t border-black/10"}`}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-display text-lg font-extrabold tracking-tight">
            ZAYVIANA<span className="text-[var(--accent-red)]">.</span>
          </p>
          <p className={`mt-3 text-xs uppercase tracking-[0.18em] ${faint}`}>
            Believer · Builder · Creator
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-6 text-xl">
              <a href="https://github.com/zayvianas" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-[var(--accent-pink)]"><FaGithub /></a>
              <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-[var(--accent-pink)]"><FaLinkedin /></a>
              <a href="mailto:hello@zayviana.com" aria-label="Email" className="transition hover:text-[var(--accent-pink)]"><FaEnvelope /></a>
            </div>
          </div>

          <p className={`mt-8 text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
            © {new Date().getFullYear()} Zayviana Singletary
          </p>
        </div>
      </footer>
    </main>
  )
}
