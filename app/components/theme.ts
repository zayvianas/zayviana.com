// Shared class names so every page reads as one site.
export function themeClasses(dark: boolean) {
  return {
    main: dark
      ? "min-h-screen bg-[#0e0e10] text-white transition-colors duration-300"
      : "min-h-screen bg-[var(--paper)] text-[#0e0e10] transition-colors duration-300",
    kicker: "text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-pink)]",
    h1: "font-display text-5xl font-extrabold tracking-tight md:text-6xl",
    h2: `font-display text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#0e0e10]"}`,
    lead: dark ? "text-gray-300" : "text-gray-700",
    muted: dark ? "text-gray-400" : "text-gray-600",
    faint: dark ? "text-gray-500" : "text-gray-400",
    band: dark ? "bg-white/5" : "bg-black/[0.02]",
    card: dark
      ? "rounded-2xl border border-white/10 bg-white/5 p-7"
      : "rounded-2xl border border-black/10 bg-white p-7",
    cardHover: dark
      ? "rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
      : "rounded-2xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-md",
    pill: dark ? "border-white/15 text-gray-300" : "border-black/10 text-gray-600",
    btnPrimary:
      "inline-block rounded-full bg-[var(--accent-red)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90",
    btnGhost: `inline-block rounded-full border px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${
      dark
        ? "border-white/30 text-white hover:bg-white hover:text-[#0e0e10]"
        : "border-black/20 text-[#0e0e10] hover:bg-[#0e0e10] hover:text-white"
    }`,
    rule: dark ? "border-white/10" : "border-black/10",
  }
}
