"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { techCategories, clients, builds } from "../lib/siteData"

const LINKEDIN = "https://www.linkedin.com/in/zayviana/"
const BOOKING = "https://calendar.app.google/6SxperZ148UqN4vz9"

const focus = ["Senior Product Management", "People Leadership", "AI & Data", "Delivery & Execution", "Stakeholder Alignment", "Agile / Scrum"]

const experience = [
  {
    company: "RevStar",
    role: "Senior Data & AI Product Manager & Delivery Manager",
    period: "2025 - Present",
    bullets: [
      "Manage an active client portfolio exceeding $500K with 12+ retained accounts, serving as the primary contact across the full engagement lifecycle from pre-sales and scoping through delivery and executive reporting.",
      "Lead cross-functional teams with direct reports spanning full-stack, front-end, back-end, AI engineering, and DevOps across distributed locations and time zones.",
      "Own the full pre-sales cycle including SOW authoring and PRD development, translating client needs into clearly scoped, billable engagements.",
      "Present portfolio performance at quarterly business reviews and executive briefings; run parallel sprints across EOS and Agile (Scrum/Kanban).",
      "Apply Claude Code, custom GPTs, and MCP integrations to accelerate discovery and prototype concepts before engineering handoff.",
    ],
  },
  {
    company: "CornerStone Labs",
    role: "Builder & Product Lead",
    period: "2024 - Present",
    bullets: [
      "Building CornerStone Labs from scratch: an AI-powered tools company focused on productivity and financial clarity. First product, Nest Egg, is live.",
      "Own all product strategy, roadmap, and customer discovery end-to-end, applying AI throughout the build to move fast and validate before committing to full development.",
    ],
  },
  {
    company: "Tampa Electric",
    role: "IT Modernization Project & Portfolio Manager (Contract, via Insight Global)",
    period: "2025",
    bullets: [
      "Led a ServiceNow STEP transformation in a B2B enterprise environment: defined acceptance criteria, managed UAT cycles, and delivered KPI dashboards that gave leadership measurable delivery visibility across two portfolios.",
      "Redesigned intake workflows, SOPs, and change management processes to reduce friction and improve adoption across enterprise business units.",
    ],
  },
  {
    company: "Miter Brands",
    role: "IT Transformation Project Manager (Contract, via Kelly SET&T)",
    period: "2022 - 2025",
    bullets: [
      "Directed IT and process integration programs across major acquisitions using Agile, leading cross-functional delivery across IT, Finance, HR, Sales, and Operations with full end-to-end ownership.",
      "Translated complex technical programs into executive-ready communication and drove enterprise-wide adoption through structured change management.",
    ],
  },
  {
    company: "Earlier Background",
    role: "Software Dev Associate · Data Analyst · Business Analyst · Jr. Project Manager",
    period: "2018 - 2022",
    bullets: [
      "Dev10, Value Tech Realty, InvestCloud, and Puelo's Concrete. Built the technical foundation across full-stack development (Java, JavaScript), data modeling, UAT, and project coordination before moving into product and delivery.",
    ],
  },
]

const education = [
  { school: "University of South Florida", degree: "MS, Artificial Intelligence & Business Analytics", year: "2025" },
  { school: "University of South Florida", degree: "BS, Information Technology", year: "2020" },
]

const skills = [
  { label: "Leadership", items: "Direct reports, cross-functional & distributed team management, client retention, executive communication, QBRs, stakeholder alignment, change management" },
  { label: "Product Management", items: "PRD & spec writing, SOW authoring, roadmapping, prioritization, sprint planning, backlog management, budget & burn tracking, EOS, Agile" },
  { label: "Data & Analytics", items: "KPI definition & tracking, data-driven prioritization, Python (Pandas, NumPy, Matplotlib), SQL, ServiceNow Platform Analytics, Tableau, Power BI, Excel" },
  { label: "AI & Technology", items: "Claude Code, MCP integrations, custom GPTs & agents, agentic workflow design, prompt engineering, SDLC, UAT, ServiceNow, SharePoint" },
]

export default function BuilderView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"

  const muted = dark ? "text-gray-400" : "text-gray-600"
  const h2 = `font-display text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`
  const kicker = "text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]"
  const card = dark
    ? "rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    : "rounded-2xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-md"

  return (
    <main className={dark ? "min-h-screen bg-[#0e0e10] text-white" : "min-h-screen bg-[var(--paper)] text-[#0e0e10]"}>

      {/* INTRO */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <span className="gradient-tag mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Portfolio
        </span>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">The Builder</h1>
        <p className="mt-4 font-display text-lg font-bold">
          <span className="text-[var(--accent-red)]">Product</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-pink)]">People</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-green)]">Data</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-red)]">AI</span>
        </p>
        <p className={`mt-2 text-sm font-medium uppercase tracking-[0.15em] ${dark ? "text-gray-500" : "text-gray-500"}`}>
          Senior Data &amp; AI Product Manager &amp; People Leader · Tampa Bay, FL
        </p>
        <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-gray-300" : "text-gray-700"}`}>
A senior product manager and people leader, fluent in both the business and the technical side. At RevStar I own a $500K+ client portfolio and manage direct reports across every engineering discipline, from full-stack to AI. As comfortable leading a team as building hands-on, with a decade spanning software development, enterprise IT transformation, and AI. Master's in AI &amp; Business Analytics from USF.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={BOOKING} target="_blank" rel="noopener noreferrer"
            className="gradient-tag rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Book a 30-min call
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
            className={`rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
              dark ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
                   : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
            }`}>
            View LinkedIn
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {focus.map(f => (
            <span key={f} className={`rounded-full border px-4 py-1.5 text-xs font-medium ${dark ? "border-white/15 text-gray-300" : "border-black/10 text-gray-600"}`}>
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`scroll-mt-20 px-6 py-16 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Experience</p>
          <h2 className={`mb-10 ${h2}`}>Where I've worked</h2>

          <div className="flex flex-col gap-8">
            {experience.map(({ company, role, period, bullets }) => (
              <div key={company} className={`border-l-2 pl-6 ${dark ? "border-white/15" : "border-black/10"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-xl font-bold">{company}</h3>
                  <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${dark ? "text-gray-500" : "text-gray-400"}`}>{period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--accent-pink)]">{role}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {bullets.map((b, i) => (
                    <li key={i} className={`flex gap-3 text-sm leading-relaxed ${muted}`}>
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-red)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)] hover:opacity-70">
              See the full career on LinkedIn →
            </a>
          </div>

          {/* Education */}
          <div className={`mt-12 border-t pt-8 ${dark ? "border-white/10" : "border-black/10"}`}>
            <p className={`mb-5 ${kicker}`}>Education</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {education.map(({ school, degree, year }) => (
                <div key={degree}>
                  <p className="font-display text-base font-semibold">{degree}</p>
                  <p className={`mt-1 text-sm ${muted}`}>{school} · {year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Core Skills</p>
          <h2 className={`mb-10 ${h2}`}>What I bring</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map(({ label, items }) => (
              <div key={label} className={card}>
                <h3 className="font-display text-base font-bold text-[var(--accent-red)]">{label}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I'VE BUILT */}
      <section id="built" className={`scroll-mt-20 px-6 py-16 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Apps, Products & Ventures</p>
          <h2 className={`mb-10 ${h2}`}>What I've built</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {builds.map(({ name, type, status, color, desc, href, cta }) => (
              <div key={name} className={card}>
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: color }}>
                    {status}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${dark ? "border-white/20 text-gray-300" : "border-black/15 text-gray-600"}`}>
                    {type}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{desc}</p>
                {href && (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)] hover:opacity-70">
                    {cta || "Visit →"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Tools & Technologies</p>
          <h2 className={`mb-10 ${h2}`}>Tech stack</h2>
          <div className="flex flex-col gap-8">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-red)]">{cat.label}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map(({ name, Icon, img, color }) => (
                    <div key={name}
                      className={
                        dark
                          ? "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-white/20 hover:bg-white/10"
                          : "flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm transition hover:border-black/20"
                      }>
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

      {/* BRANDS */}
      <section className={`px-6 py-16 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Work & Collaboration</p>
          <h2 className={`mb-10 ${h2}`}>Brands I've worked with</h2>
          <div className="flex flex-wrap gap-2.5">
            {clients.map(({ name }) => (
              <span key={name} className={`rounded-full border px-4 py-2 text-sm font-medium ${dark ? "border-white/15 text-gray-200" : "border-black/10 text-gray-700"}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`mb-4 font-display text-3xl font-extrabold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`}>
            Let's build something
          </h2>
          <p className={`mx-auto mb-8 max-w-xl text-base ${muted}`}>
            Open to roles, consulting, and collaborations at the intersection of product, AI, and impact.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer"
              className="gradient-tag inline-block rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
              Book a 30-min call
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className={`inline-block rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
                dark ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
                     : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
              }`}>
              View LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
