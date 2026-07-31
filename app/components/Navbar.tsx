"use client"
import { useState } from "react"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa"
import type { Mode } from "./ColorModeProvider"

const navLinks = [
  { label: "Believer",  href: "/believer" },
  { label: "Builder",   href: "/professional" },
  { label: "Creator",   href: "/creative" },
  { label: "Testaments", href: "/testaments" },
  { label: "Connect",   href: "/connect" },
]

const nextLabel: Record<Mode, string> = {
  dark:  "Light",
  light: "Dark",
}

type NavConfig = {
  bg: string
  logoText: string
  linkMuted: string
  iconMuted: string
  iconHover: string
  border: string
  btnText: string
  btnBorder: string
  btnHover: string
  mobileBg: string
  mobileDivide: string
}

const configs: Record<Mode, NavConfig> = {
  dark: {
    bg:           "bg-[#0e0e10]/90 backdrop-blur-md border-b border-white/10",
    logoText:     "text-white",
    linkMuted:    "text-white/60 hover:text-white",
    iconMuted:    "text-white/60",
    iconHover:    "hover:text-[var(--accent-pink)]",
    border:       "border-white/30",
    btnText:      "text-white",
    btnBorder:    "border-white/30",
    btnHover:     "hover:bg-white hover:text-[#0e0e10]",
    mobileBg:     "bg-[#0e0e10] border-b border-white/10",
    mobileDivide: "divide-white/10",
  },
  light: {
    bg:           "bg-[var(--paper)]/85 backdrop-blur-md border-b border-black/10",
    logoText:     "text-[#0e0e10]",
    linkMuted:    "text-black/50 hover:text-[#0e0e10]",
    iconMuted:    "text-black/50",
    iconHover:    "hover:text-[var(--accent-red)]",
    border:       "border-black/20",
    btnText:      "text-[#0e0e10]",
    btnBorder:    "border-black/20",
    btnHover:     "hover:bg-[#0e0e10] hover:text-white",
    mobileBg:     "bg-[var(--paper)] border-b border-black/10",
    mobileDivide: "divide-black/10",
  },
}

function Logo({ className }: { className: string }) {
  return (
    <span className={`font-display text-lg font-extrabold tracking-tight ${className}`}>
      ZAYVIANA<span className="text-[var(--accent-red)]">.</span>
    </span>
  )
}

export default function Navbar({
  colorMode = "dark",
  onToggle,
}: {
  colorMode?: Mode
  onToggle?: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const c = configs[colorMode]

  return (
    <nav className={`w-full ${c.bg} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Logo className={c.logoText} />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition ${c.linkMuted}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: icons + mode toggle + hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/zayvianas" target="_blank" rel="noopener noreferrer"
              className={`text-lg transition hover:scale-110 ${c.iconMuted} ${c.iconHover}`}>
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer"
              className={`text-lg transition hover:scale-110 ${c.iconMuted} ${c.iconHover}`}>
              <FaLinkedin />
            </a>
            <a href="mailto:hello@zayviana.com"
              className={`text-lg transition hover:scale-110 ${c.iconMuted} ${c.iconHover}`}>
              <FaEnvelope />
            </a>
          </div>

          {onToggle !== undefined && (
            <button
              onClick={onToggle}
              className={`rounded-full border ${c.btnBorder} ${c.btnText} px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] transition ${c.btnHover}`}
            >
              {nextLabel[colorMode]}
            </button>
          )}

          <button
            className={`text-xl md:hidden transition ${c.logoText}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={`md:hidden ${c.mobileBg} divide-y ${c.mobileDivide}`}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition ${c.linkMuted}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-6 px-6 py-4">
            <a href="https://github.com/zayvianas" target="_blank" rel="noopener noreferrer"
              className={`text-lg transition ${c.iconMuted} ${c.iconHover}`}>
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/zayviana" target="_blank" rel="noopener noreferrer"
              className={`text-lg transition ${c.iconMuted} ${c.iconHover}`}>
              <FaLinkedin />
            </a>
            <a href="mailto:hello@zayviana.com"
              className={`text-lg transition ${c.iconMuted} ${c.iconHover}`}>
              <FaEnvelope />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
