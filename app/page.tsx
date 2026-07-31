"use client"

import { useState, useEffect, useRef } from "react"
import { useColorMode } from "./components/ColorModeProvider"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import {
  SiPython, SiJavascript, SiReact, SiHtml5, SiCss,
  SiDjango, SiMysql, SiSqlite, SiGit, SiVercel,
  SiDatabricks, SiSnowflake,
  SiJira, SiConfluence, SiMiro, SiFigma, SiNotion, SiSlack,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

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

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const techCategories = [
  {
    label: "Languages",
    items: [
      { name: "Python",      Icon: SiPython,     img: null, color: "#3776AB" },
      { name: "JavaScript",  Icon: SiJavascript, img: null, color: "#F7DF1E" },
      { name: "Java",        Icon: FaJava,       img: null, color: "#ED8B00" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React",  Icon: SiReact,  img: null, color: "#61DAFB" },
      { name: "HTML5",  Icon: SiHtml5,  img: null, color: "#E34F26" },
      { name: "CSS3",   Icon: SiCss,    img: null, color: "#1572B6" },
    ],
  },
  {
    label: "Backend & Databases",
    items: [
      { name: "Django",  Icon: SiDjango, img: null, color: "#44B78B" },
      { name: "MySQL",   Icon: SiMysql,  img: null, color: "#4479A1" },
      { name: "SQLite",  Icon: SiSqlite, img: null, color: "#003B57" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS",    Icon: null, img: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, color: "#FF9900" },
      { name: "Azure",  Icon: null, img: `${DI}/azure/azure-original.svg`,                               color: "#0078D4" },
      { name: "Git",    Icon: SiGit,    img: null, color: "#F05032" },
      { name: "Vercel", Icon: SiVercel, img: null, color: "#888888" },
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      { name: "Tableau",    Icon: null, img: null, color: "#E97627" },
      { name: "Power BI",   Icon: null, img: `${DI}/microsoftsqlserver/microsoftsqlserver-plain.svg`, color: "#F2C811" },
      { name: "Databricks", Icon: SiDatabricks, img: null, color: "#FF3621" },
      { name: "Snowflake",  Icon: SiSnowflake,  img: null, color: "#29B5E8" },
    ],
  },
  {
    label: "PM & Collaboration",
    items: [
      { name: "Jira",         Icon: SiJira,       img: null, color: "#0052CC" },
      { name: "Confluence",   Icon: SiConfluence, img: null, color: "#0052CC" },
      { name: "Azure DevOps", Icon: null, img: `${DI}/azuredevops/azuredevops-original.svg`, color: "#0078D7" },
      { name: "Miro",         Icon: SiMiro,       img: null, color: "#FFD02F" },
      { name: "Figma",        Icon: SiFigma,      img: null, color: "#F24E1E" },
      { name: "Notion",       Icon: SiNotion,     img: null, color: "#888888" },
      { name: "Slack",        Icon: SiSlack,      img: null, color: "#4A154B" },
    ],
  },
]

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
    evidence: "PM · AI · Founder · Good Tutor, Nest Egg, Nearby",
  },
  {
    name: "Creator",
    color: "var(--accent-green)",
    href: "/creative",
    desc: "Creativity runs through everything: music, art, design, and writing. Expression made with purpose and rooted in gratitude.",
    evidence: "Music · Art · Design · Testament",
  },
]

const ventures = [
  { name: "The Good Tutor",        tagline: "Education rooted in empathy.",  status: "Active",   color: "#10b981" },
  { name: "Nest Egg",              tagline: "Building financial futures.",   status: "Building", color: "#e11d48" },
  { name: "Nearby",                tagline: "Community, close to home.",     status: "Building", color: "#f472b6" },
  { name: "Christians Anonymous",  tagline: "Faith in the open.",           status: "Building", color: "#e11d48" },
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
  const work     = useFadeUp()
  const clientsSection = useFadeUp()
  const tech     = useFadeUp()
  const testament = useFadeUp()
  const services = useFadeUp()
  const explore  = useFadeUp()

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
          className={`absolute inset-0 h-full w-full object-cover swirl-animate ${dark ? "opacity-40" : "opacity-30"}`}
        />
        <div className={`absolute inset-0 ${dark ? "bg-[#0e0e10]/70" : "bg-[var(--paper)]/60"}`} />

        {/* Kinetic orbs */}
        <div className={`orb-animate pointer-events-none absolute -right-24 top-24 h-[380px] w-[380px] rounded-full border ${dark ? "border-white/10" : "border-black/10"}`} />
        <div className={`orb-animate pointer-events-none absolute right-10 top-40 h-[240px] w-[240px] rounded-full border ${dark ? "border-white/5" : "border-black/5"}`} />

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
      <section ref={pillars.ref} className={`fade-up ${pillars.visible ? "visible" : ""} px-6 pt-28 pb-24`}>
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

      {/* SELECTED WORK - Portfolio */}
      <section ref={work.ref} className={`fade-up ${work.visible ? "visible" : ""} px-6 py-20 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>What I'm Building</p>
          <h2 className={`mb-12 text-center ${h2}`}>Selected ventures</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ventures.map(({ name, tagline, status, color }) => (
              <div key={name} className={`${cardBase} p-7`}>
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: color }}>
                  {status}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{name}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color }}>{tagline}</p>
              </div>
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

      {/* TECH STACK - Portfolio */}
      <section ref={tech.ref} className={`fade-up ${tech.visible ? "visible" : ""} px-6 pb-24`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>Tools & Technologies</p>
          <h2 className={`mb-14 text-center ${h2}`}>Tech stack</h2>
          <div className="flex flex-col gap-10">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-red)]">{cat.label}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map(({ name, Icon, img, color }) => (
                    <div
                      key={name}
                      className={
                        dark
                          ? "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm transition duration-200 hover:border-white/20 hover:bg-white/10"
                          : "flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm backdrop-blur-sm transition duration-200 hover:border-black/20 hover:bg-black/[0.06]"
                      }
                    >
                      {Icon && <Icon style={{ color }} className="text-base shrink-0" />}
                      {!Icon && img && <img src={img} alt={name} className="h-4 w-4 shrink-0 object-contain" />}
                      {!Icon && !img && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />}
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTAMENT teaser */}
      <section ref={testament.ref} className={`fade-up ${testament.visible ? "visible" : ""} px-6 py-20 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className={`mb-2 ${kicker}`}>From the blog</p>
          <h2 className={`mb-4 font-display text-4xl font-extrabold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`}>
            Testament<span className="text-[var(--accent-red)]">.</span>
          </h2>
          <p className={`mx-auto mb-8 max-w-xl text-base ${muted}`}>
            Faith, AI, crypto, life, all unfiltered. The record of what I believe and what I'm learning, tagged so you can follow the threads that resonate.
          </p>
          <a href="/testament"
            className="inline-block rounded-full bg-[var(--accent-red)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Read Testament
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

      {/* EXPLORE */}
      <section id="explore" ref={explore.ref} className={`fade-up ${explore.visible ? "visible" : ""} scroll-mt-20 px-6 py-24`}>
        <div className="mx-auto max-w-6xl">
          <p className={`mb-2 text-center ${kicker}`}>There's More</p>
          <h2 className={`mb-14 text-center ${h2}`}>Explore my world</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "The Believer",  href: "/believer",     tag: "Faith",     desc: "My testimony, my faith, and why God is the foundation of everything I do." },
              { label: "The Builder",   href: "/professional", tag: "Work",      desc: "PM, AI, data, product strategy, and the ventures I've founded." },
              { label: "The Creator",   href: "/creative",     tag: "Creative",  desc: "Music, art, and creative expression, made with purpose." },
              { label: "Testament",     href: "/testament",    tag: "Blog",      desc: "Faith, AI, crypto, life: unfiltered thoughts with tags you can follow." },
            ].map(({ label, href, tag, desc }) => (
              <a key={label} href={href}
                className={`group relative overflow-hidden rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                  dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white hover:shadow-md"
                }`}>
                <span className="gradient-tag mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  {tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold">{label}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{desc}</p>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)]">Explore →</span>
              </a>
            ))}
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
