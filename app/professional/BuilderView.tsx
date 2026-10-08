"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"
import { techCategories, clients, builtLive, building, type Build } from "../lib/siteData"

const LINKEDIN = "https://www.linkedin.com/in/zayviana/"

const focus = [
  "Product Management",
  "People Leadership",
  "Program & Project Management",
  "Founder & Entrepreneur",
  "AI & Data",
  "Forward Deployed Engineering",
  "Stakeholder Alignment",
  "Hybrid Delivery (Agile, Waterfall, EOS)",
]

const experience = [
  {
    company: "CornerStone Labs",
    role: "Founder & Forward Deployed Product Engineer",
    period: "2020 - Present",
    bullets: [
      "Founded and run an AI workflow and technology consulting practice for small and mid-sized businesses, and do the discovery, design, and build work myself.",
      "Audit how client teams actually get work done, map the current state, and design future-state workflows that replace manual steps and outdated systems with AI automation and modern web tools.",
      "Write the requirements, diagrams, and documentation for each build, then ship it with Claude Code, GitHub, and Vercel.",
    ],
  },
  {
    company: "Army National Guard",
    role: "IT Systems Specialist (25H)",
    period: "2026 - Present",
    bullets: [
      "Serve as an IT Systems Specialist in a mission-critical military environment, maintaining network infrastructure and applying IT security protocols in support of operational readiness.",
    ],
  },
  {
    company: "RevStar",
    role: "Sr. Data and AI Product Manager",
    period: "2025 - 2026",
    bullets: [
      "Served as the bridge between client stakeholders and engineering across a $1M+ portfolio of software and AI engagements, leading 10+ people across full-stack, front-end, back-end, AI engineering, and DevOps.",
      "Authored 40+ SOWs and PRDs, turning ambiguous business asks into scoped epics, user stories, and acceptance criteria that moved from signed contract to sprint without rework.",
      "Ran sprint planning, backlog refinement, and release planning across parallel programs, tracking risks, dependencies, and budget burn against contracted hours.",
      "Built intake and scoping workflows, governance gates, SOPs, and PM training documentation adopted across the delivery organization.",
      "Used Claude Code, custom GPTs, and MCP integrations to prototype concepts and speed up requirements and documentation before committing engineering capacity.",
    ],
  },
  {
    company: "Tampa Electric",
    role: "IT Modernization Transformation Project & Portfolio Manager (Contract via Insight Global)",
    period: "2025",
    bullets: [
      "Led the ServiceNow STEP modernization program, introducing custom catalog items, intake forms, and analytics dashboards that modernized incident and request lifecycle management.",
      "Mapped current-state intake workflows and redesigned SOPs and change management processes, increasing ServiceNow ITSM adoption across business units.",
      "Managed two enterprise portfolios (Reporting and Device Management), building KPI tracking and executive dashboards in Excel and ServiceNow Platform Analytics.",
    ],
  },
  {
    company: "MITER Brands",
    role: "IT Transformation Project Manager, Business & Process Integration (Contract via Kelly SET&T)",
    period: "2022 - 2025",
    bullets: [
      "Directed IT and process integration through the PGT Innovations and NewSouth Window acquisitions, aligning legacy systems, data, SOPs, and workflows across seven business functions.",
      "Facilitated alignment workshops with IT, Finance, HR, Customer Service, Sales, Production, and Operations to standardize processes and remove duplicate workflows.",
      "Designed SharePoint automation, reporting dashboards, and process documentation that gave leadership real visibility into transformation progress.",
    ],
  },
]

const earlier = [
  { company: "Dev10", role: "Software Development Associate", period: "2023", text: "Built full-stack applications with Java, Spring Boot, and JavaScript, and delivered a production-ready web app as part of a team." },
  { company: "Value Tech Realty Services", role: "Data Analyst & Project Associate", period: "2023", text: "Ran market and valuation analysis for 10+ multifamily and senior housing projects, and built web apps and Tableau dashboards that cut delivery time by 20%." },
  { company: "InvestCloud", role: "Business Analyst, Data & UAT", period: "2020 - 2021", text: "Ran UAT and regression testing on financial applications, cutting defects by 20%, and resolved 500+ client tickets at a 95% SLA rate." },
  { company: "Puelo's Concrete | Carja Construction", role: "Junior Project Manager", period: "2018 - 2020", text: "Coordinated multiple concrete construction projects, optimized labor and material scheduling to cut delays, and served as the liaison between field crews, vendors, and leadership to keep projects on time and on budget." },
]

const education = [
  { school: "University of South Florida", degree: "MS, Artificial Intelligence & Business Analytics", year: "2025" },
  { school: "University of South Florida", degree: "BS, Information Technology", year: "2020" },
]

const certificates = "Project Management Foundations · Agile Foundations · AI Foundations: Machine Learning · Wireshark Essential Training"

const skills = [
  { label: "Product & Requirements", items: "Technical product management, business and technical requirements, PRDs, epics and user stories, functional specs, acceptance criteria, roadmap planning, prioritization" },
  { label: "Modernization & Architecture", items: "Legacy modernization, system and process integration through M&A, platform migration, current-state and future-state mapping, dependency mapping, Mermaid diagrams, process maps, governance and intake design" },
  { label: "Hybrid Delivery", items: "Agile (Scrum and Kanban), Waterfall for enterprise programs, EOS rocks and weekly cadence, sprint planning, backlog refinement, release and go-live readiness, UAT, full SDLC" },
  { label: "AI & Data", items: "Claude Code, MCP integrations, custom GPTs and agents, agentic workflow design, AI-assisted documentation and prototyping, KPI definition, Tableau, ServiceNow Platform Analytics" },
  { label: "Technical", items: "Python, TypeScript, JavaScript, React, Next.js, Node.js, HTML/CSS, Tailwind CSS, SQL and PostgreSQL (Supabase), REST APIs, data modeling, Java, Docker, GitHub, Vercel" },
  { label: "Stakeholder Management", items: "Executive briefings and QBRs, alignment workshops, change management, translating technical work for business leaders" },
]

export default function BuilderView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)

  function BuildCard({ name, type, status, color, desc, href, cta }: Build) {
    return (
      <div className={`${href ? t.cardHover : t.card} flex flex-col`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: color }}>
            {status}
          </span>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${t.pill}`}>{type}</span>
        </div>
        <h3 className="mt-5 font-display text-xl font-bold">{name}</h3>
        <p className={`mt-2 flex-1 text-sm leading-relaxed ${t.muted}`}>{desc}</p>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)] hover:opacity-70">
            {cta || "Visit →"}
          </a>
        )}
      </div>
    )
  }

  return (
    <main className={t.main}>

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
          <span className="text-[var(--accent-green)]">Founder</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-red)]">AI</span>
        </p>
        <p className={`mt-2 text-sm font-medium uppercase tracking-[0.15em] ${t.faint}`}>
          Product, Program &amp; Project Leader · Forward Deployed Product Engineer · Founder · Tampa Bay
        </p>
        <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${t.lead}`}>
          A product leader, people leader, and founder who has sat in a lot of chairs. Over the past decade I&apos;ve managed products, programs, and projects across enterprise IT, financial services, SaaS, and AI, led cross-functional teams across every engineering discipline, and built businesses of my own. I started as a developer and data analyst, so I&apos;m as comfortable building hands-on as I am leading a team or briefing executives. I founded CornerStone Labs, teach through The Good Tutor, and serve in the Army National Guard. Master&apos;s in AI &amp; Business Analytics from USF.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/connect"
            className="gradient-tag rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Book a call
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={t.btnGhost}>View LinkedIn</a>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {focus.map(f => (
            <span key={f} className={`rounded-full border px-4 py-1.5 text-xs font-medium ${t.pill}`}>{f}</span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`scroll-mt-20 px-6 py-16 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Experience</p>
          <h2 className={`mb-10 ${t.h2}`}>Where I&apos;ve worked</h2>

          <div className="flex flex-col gap-10">
            {experience.map(({ company, role, period, bullets }) => (
              <div key={company} className={`border-l-2 pl-6 ${dark ? "border-white/15" : "border-black/10"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-xl font-bold">{company}</h3>
                  <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${t.faint}`}>{period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--accent-pink)]">{role}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {bullets.map((b, i) => (
                    <li key={i} className={`flex gap-3 text-sm leading-relaxed ${t.muted}`}>
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-red)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`mt-12 border-t pt-8 ${t.rule}`}>
            <p className={`mb-5 ${t.kicker}`}>Earlier Experience</p>
            <div className="grid gap-6 md:grid-cols-2">
              {earlier.map(({ company, role, period, text }) => (
                <div key={company}>
                  <p className="font-display text-base font-semibold">{company}</p>
                  <p className={`mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] ${t.faint}`}>{role} · {period}</p>
                  <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-12 border-t pt-8 ${t.rule}`}>
            <div>
              <p className={`mb-5 ${t.kicker}`}>Education</p>
              <div className="flex flex-col gap-4">
                {education.map(({ school, degree, year }) => (
                  <div key={degree}>
                    <p className="font-display text-base font-semibold">{degree}</p>
                    <p className={`mt-1 text-sm ${t.muted}`}>{school} · {year}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-6 text-sm ${t.muted}`}><span className="font-semibold">Certificates:</span> {certificates}</p>
            </div>
          </div>

          <div className="mt-10">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent-red)] hover:opacity-70">
              See the full career on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Core Skills</p>
          <h2 className={`mb-10 ${t.h2}`}>What I bring</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map(({ label, items }) => (
              <div key={label} className={t.card}>
                <h3 className="font-display text-base font-bold text-[var(--accent-red)]">{label}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>{items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I'VE BUILT */}
      <section id="built" className={`scroll-mt-20 px-6 py-16 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Apps, Products & Ventures</p>
          <h2 className={`mb-10 ${t.h2}`}>What I&apos;ve built</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {builtLive.map(b => <BuildCard key={b.name} {...b} />)}
          </div>

          <h2 className={`mt-16 mb-10 ${t.h2}`}>What I&apos;m building</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {building.map(b => <BuildCard key={b.name} {...b} />)}
          </div>

          {/* BUILD WITH ME */}
          <div className={`mt-12 rounded-3xl border border-dashed p-8 md:p-10 ${dark ? "border-white/20" : "border-black/15"}`}>
            <p className={`mb-2 ${t.kicker}`}>Build With Me</p>
            <h3 className="font-display text-2xl font-bold">Want real project experience?</h3>
            <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${t.muted}`}>
              If you&apos;re a student or early in your career and want to help build these apps, I&apos;d love to hear from you. You&apos;d work on a real product, come away with something solid for your portfolio, and learn alongside me. Send a note about what you want to learn and what you&apos;re good at.
            </p>
            <a href="mailto:hello@zayviana.com?subject=I%27d%20like%20to%20build%20with%20you"
              className={`mt-6 ${t.btnPrimary}`}>
              Raise your hand
            </a>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Tools & Technologies</p>
          <h2 className={`mb-10 ${t.h2}`}>Tech stack</h2>
          <div className="flex flex-col gap-8">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-red)]">{cat.label}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map(({ name, Icon, img, color }) => (
                    <div key={name}
                      className={
                        dark
                          ? "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                          : "flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
                      }>
                      {Icon && <Icon style={{ color }} className="text-base shrink-0" />}
                      {!Icon && img && <img src={img} alt="" className="h-4 w-4 shrink-0 object-contain" />}
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
      <section className={`px-6 py-16 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Work & Collaboration</p>
          <h2 className={`mb-10 ${t.h2}`}>Brands I&apos;ve worked with</h2>
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
            Let&apos;s work together
          </h2>
          <p className={`mx-auto mb-8 max-w-xl text-base ${t.muted}`}>
            Open to product roles and collaborations. If your business needs help, CornerStone Labs is the place to start.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/connect" className={t.btnPrimary}>Book a call</a>
            <a href="https://cstonelabs.com" target="_blank" rel="noopener noreferrer" className={t.btnGhost}>Visit CornerStone Labs</a>
          </div>
        </div>
      </section>
    </main>
  )
}
