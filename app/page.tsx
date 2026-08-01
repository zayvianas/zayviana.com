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

const clients = [
  { name: "Feastables",               domain: "feastables.com" },
  { name: "Who's Your Landlord",      domain: "wyl.co" },
  { name: "SuperCarl",                domain: "supercarl.ai" },
  { name: "Levra",                    domain: "levra.me" },
  { name: "Tampa Electric",           domain: "tampaelectric.com" },
  { name: "Miter Brands",             domain: "miterbrands.com" },
  { name: "New South Windows",        domain: "newsouthwindow.com" },
  { name: "PGT Innovations",          domain: "pgtinnovations.com" },
  { name: "Upmeals / Demi",           domain: "getdemi.co" },
  { name: "Data For Inclusion",       domain: "dataforinclusion.com" },
  { name: "Atunwa Digital",           domain: "atunwadigital.com" },
  { name: "Positronix",               domain: "uspositronix.com" },
  { name: "Band Connect",             domain: "bandconnect.net" },
  { name: "Feeding South Florida",    domain: "feedingsouthflorida.org" },
  { name: "Klerk",                    domain: "klerk.ca" },
  { name: "Word Collections",         domain: "wordcollections.com" },
  { name: "Lima Compost",             domain: "limacompost.com" },
  { name: "Sumeera",                  domain: "sumeerasolutions.com" },
  { name: "HomeCare Hub",             domain: "homecarehub.com" },
  { name: "Ready Set Surgical",       domain: "readysetsurgical.com" },
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

function ClientCard({ name, domain, onFail }: { name: string; domain: string; onFail: () => void }) {
  return (
    <div className="flex w-40 shrink-0 flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-6 text-center text-black transition duration-200 hover:border-gray-300 hover:shadow-sm">
      <img
        suppressHydrationWarning
        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`}
        alt={name}
        className="h-12 w-12 rounded-xl object-contain"
        onError={onFail}
        onLoad={(e) => { if (e.currentTarget.naturalWidth < 48) onFail() }}
      />
      <span className="text-xs font-medium leading-tight">{name}</span>
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

  const [failedDomains, setFailedDomains] = useState<Set<string>>(new Set())
  const markFailed = (domain: string) => setFailedDomains(prev => new Set([...prev, domain]))
  const visibleClients = clients.filter(c => !failedDomains.has(c.domain))

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
            <a href="/connect"
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

          <div className="relative overflow-hidden">
            <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent ${dark ? "from-[#0e0e10]" : "from-[var(--paper)]"}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent ${dark ? "from-[#0e0e10]" : "from-[var(--paper)]"}`} />
            <div
              className="flex w-max gap-4 py-2"
              style={{ animation: "marquee 90s linear infinite" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
            >
              {[...visibleClients, ...visibleClients].map(({ name, domain }, i) => (
                <ClientCard key={`${name}-${i}`} name={name} domain={domain} onFail={() => markFailed(domain)} />
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-pink)]">And many more</p>
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

      {/* SERVICES - Clients */}
      <section ref={services.ref} className={`fade-up ${services.visible ? "visible" : ""} px-6 py-24`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>What I Do</p>
          <h2 className={`mb-14 text-center ${h2}`}>Services</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🤖", title: "AI Consulting", desc: "Strategy, implementation, and education around AI tools, workflows, and products for teams and businesses." },
              { icon: "📋", title: "Product & Project Management", desc: "End-to-end product strategy, roadmapping, sprint planning, and delivery for startups and enterprises." },
              { icon: "🌐", title: "Web & Digital Services", desc: "Websites, branding, logos, and digital presence, built to reflect who you actually are." },
              { icon: "🚀", title: "Startup & Brand Building", desc: "From zero to launched. Helping founders and small businesses establish their foundation and identity." },
              { icon: "📣", title: "Marketing & Social Media", desc: "Content strategy, social presence, and storytelling that connects your brand to the right audience." },
              { icon: "💡", title: "Business Consulting", desc: "Operational guidance, tools setup, and strategic thinking for growing organizations and entrepreneurs." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className={`rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                dark ? "border-white/10 bg-white/5 hover:border-[var(--accent-pink)]/40 hover:bg-white/10"
                     : "border-black/10 bg-white hover:border-[var(--accent-pink)]/40 hover:shadow-md"
              }`}>
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/connect" className="inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
              Work with me
            </a>
          </div>
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
