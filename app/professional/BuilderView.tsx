"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { techCategories, clients, builds } from "../lib/siteData"

const focus = ["Product Management", "AI Consulting", "Data & Analytics", "Product Strategy", "Startup & Brand Building"]

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
          <span className="text-[var(--accent-pink)]">AI</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-green)]">Data</span>
          <span className={dark ? "text-white/30" : "text-black/25"}> · </span>
          <span className="text-[var(--accent-red)]">Founder</span>
        </p>
        <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-gray-300" : "text-gray-700"}`}>
          I turn ideas into products that work. A decade across product management, AI, data, and founding ventures, building for startups and enterprises alike.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/connect"
            className="gradient-tag rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Get in touch
          </a>
          <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer"
            className={`rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
              dark ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
                   : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
            }`}>
            LinkedIn
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

      {/* WHAT I'VE BUILT */}
      <section id="built" className={`scroll-mt-20 px-6 py-16 ${dark ? "bg-white/5" : "bg-black/[0.02]"}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${kicker}`}>Apps, Products & Ventures</p>
          <h2 className={`mb-10 ${h2}`}>What I've built</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {builds.map(({ name, type, status, color, desc, href }) => (
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
                    Visit →
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
          <a href="/connect"
            className="gradient-tag inline-block rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90">
            Get in touch
          </a>
        </div>
      </section>
    </main>
  )
}
