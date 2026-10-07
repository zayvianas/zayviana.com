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

const brandsRowA = [
  "Feastables", "Who's Your Landlord", "SuperCarl", "Tampa Electric",
  "Miter Brands", "New South Windows", "PGT Innovations", "Upmeals / Demi",
  "Data For Inclusion", "Atunwa Digital",
]
const brandsRowB = [
  "Positronix", "Band Connect", "Feeding South Florida", "Klerk",
  "Word Collections", "Lima Compost", "Sumeera", "HomeCare Hub", "Ready Set Surgical",
]

const pillarData = [
  {
    name: "Believer",
    color: "var(--accent-red)",
    href: "/believer",
    desc: "Faith is the foundation of my life, the why behind everything. It shapes how I think, how I lead, and how I build.",
    evidence: "Faith · Testimony · Christians Anonymous",
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
    desc: "Creativity runs through everything: music, art, design, and writing. Expression made with purpose and rooted in gratitude.",
    evidence: "Music · Art · Design · Testaments",
  },
]

const brandDots = ["var(--accent-red)", "var(--accent-pink)", "var(--accent-green)"]

function BrandRow({ items, dark, reverse }: { items: string[]; dark: boolean; reverse?: boolean }) {
  return (
    <div
      className="flex w-max items-center gap-7 py-3"
      style={{ animation: `marquee ${reverse ? 62 : 72}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
    >
      {[...items, ...items].map((name, i) => (
        <span key={`${name}-${i}`} className="flex items-center gap-7">
          <span className={`font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-200 md:text-4xl ${dark ? "text-white/40 hover:text-white" : "text-black/35 hover:text-[#0e0e10]"}`}>
            {name}
          </span>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: brandDots[i % 3] }} />
        </span>
      ))}
    </div>
  )
}

export default function Home() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  const pillars  = useFadeUp()
  const clientsSection = useFadeUp()
  const testament = useFadeUp()
  const services = useFadeUp()

  const cardBase = dark
    ? "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    : "rounded-3xl border border-black/10 bg-black/[0.03] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-black/[0.05]"

  const kicker = "text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]"
  const h2 = `font-display text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`
  const muted = dark ? "text-gray-400" : "text-gray-600"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white transition-colors duration-300" : "min-h-screen bg-[var(--paper)] text-[#0e0e10] transition-colors duration-300"}>

      {/* HERO */}
      <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden">
        {/* Swirl backdrop */}
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
            A believer who builds. Faith-led technologist, founder, and creator, building at the intersection of faith, technology, and creativity.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#explore"
              className="rounded-full bg-[var(--accent-red)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
              Explore my world
            </a>
            <a href="https://cstonelabs.com" target="_blank" rel="noopener noreferrer"
              className={`rounded-full border px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
                dark ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
                     : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
              }`}>
              Work with me
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS - Brand */}
      <section id="explore" ref={pillars.ref} className={`fade-up ${pillars.visible ? "visible" : ""} scroll-mt-20 px-6 pt-28 pb-24`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>Who I Am</p>
          <h2 className={`mb-3 text-center ${h2}`}>Three things, one foundation</h2>
          <p className={`mb-12 text-center text-base ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Different passions. One root: faith.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {pillarData.map(({ name, color, href, desc, evidence }) => (
              <a key={name} href={href} className={`${cardBase} block p-8`}>
                <h3 className="font-display text-2xl font-bold" style={{ color }}>{name}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${muted}`}>{desc}</p>
                <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.12em] ${dark ? "text-gray-500" : "text-gray-400"}`}>{evidence}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS - Portfolio */}
      <section ref={clientsSection.ref} className={`fade-up ${clientsSection.visible ? "visible" : ""} px-6 pb-24 pt-24`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>Work & Collaboration</p>
          <h2 className={`mb-14 text-center ${h2}`}>Brands I've worked with</h2>

          <div className="relative flex flex-col gap-1 overflow-hidden">
            <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-32 ${dark ? "from-[#0e0e10]" : "from-[var(--paper)]"}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-32 ${dark ? "from-[#0e0e10]" : "from-[var(--paper)]"}`} />
            <BrandRow items={brandsRowA} dark={dark} />
            <BrandRow items={brandsRowB} dark={dark} reverse />
          </div>
          <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-pink)]">And many more</p>
        </div>
      </section>

      {/* TESTAMENT teaser */}
      <section ref={testament.ref} className={`fade-up ${testament.visible ? "visible" : ""} px-6 py-20 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className={`mb-2 ${kicker}`}>From the blog</p>
          <h2 className={`mb-4 font-display text-4xl font-extrabold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`}>
            Testaments<span className="text-[var(--accent-red)]">.</span>
          </h2>
          <p className={`mx-auto mb-8 max-w-xl text-base ${muted}`}>
            Faith, AI, crypto, life, all unfiltered. The record of what I believe and what I'm learning, tagged so you can follow the threads that resonate.
          </p>
          <a href="/testaments"
            className="inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Read Testaments
          </a>
        </div>
      </section>

      {/* WORK WITH ME - hands off to CornerStone Labs */}
      <section id="work" ref={services.ref} className={`fade-up ${services.visible ? "visible" : ""} scroll-mt-20 px-6 py-24`}>
        <div className={`mx-auto max-w-4xl ${cardBase} p-10 text-center md:p-14`}>
          <p className={`mb-2 ${kicker}`}>Work With Me</p>
          <h2 className={`mb-5 ${h2}`}>
            My business work lives at CornerStone Labs<span className="text-[var(--accent-red)]">.</span>
          </h2>
          <p className={`mx-auto mb-9 max-w-2xl text-base leading-relaxed ${muted}`}>
            If you&apos;re here because your business needs help, that&apos;s where to go. We refresh outdated websites and build AI workflows that take the busywork off your plate, so you can get back to the work that matters. In person around Tampa Bay, remote anywhere.
          </p>
          <a href="https://cstonelabs.com" target="_blank" rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Visit CornerStone Labs
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`w-full px-6 py-14 transition-colors duration-300 ${dark ? "border-t border-white/10" : "border-t border-black/10"}`}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-display text-lg font-extrabold tracking-tight">
            ZAYVIANA<span className="text-[var(--accent-red)]">.</span>
          </p>
          <p className={`mt-3 text-xs uppercase tracking-[0.18em] ${dark ? "text-gray-500" : "text-gray-400"}`}>
            Believer · Builder · Creator
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-6 text-xl">
              <a href="https://github.com/zayvianas" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--accent-pink)]"><FaGithub /></a>
              <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--accent-pink)]"><FaLinkedin /></a>
              <a href="mailto:hello@zayviana.com" className="transition hover:text-[var(--accent-pink)]"><FaEnvelope /></a>
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
