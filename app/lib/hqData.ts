// Data behind hq.zayviana.com (private). Only rendered after the passcode check.
// Last full audit: Oct 27, 2026 (Vercel, GitHub, Supabase, portfolio page).
// When something changes, update it here and push; Vercel redeploys on its own.

export const AUDITED = "Oct 27, 2026"

export type Status = "live" | "invite" | "building" | "waitlist" | "personal" | "retire"
export type Portfolio = "on" | "missing" | "your call" | "private" | "n/a"

export type Project = {
  name: string
  what: string
  status: Status
  urls: { url: string; label?: string; note?: string }[]
  repo?: string // GitHub repo under zayvianas/
  vercel?: string // Vercel project name
  db?: { kind: string; state: "active" | "paused" | "n/a" }
  portfolio: Portfolio
  note?: string
}

export type Group = { title: string; blurb: string; projects: Project[] }

export const groups: Group[] = [
  {
    title: "CornerStone Labs",
    blurb: "The business, and the home for apps meant to sell.",
    projects: [
      {
        name: "CornerStone Labs site",
        what: "AI and modernization consulting. The storefront.",
        status: "live",
        urls: [
          { url: "https://cstonelabs.com" },
          { url: "https://cornerstonelabs.app", note: "redirects to cstonelabs.com" },
          { url: "https://cornerstonelabs.dev", note: "redirects to cstonelabs.com" },
        ],
        repo: "cornerstone-labs",
        vercel: "cornerstone-labs",
        db: { kind: "Vercel Blob (files)", state: "active" },
        portfolio: "on",
      },
      {
        name: "Client hub + Leads",
        what: "Private client profiles, revenue, demos, and the nightly leads list.",
        status: "personal",
        urls: [{ url: "https://hub.cstonelabs.com", note: "password" }, { url: "https://hub.cstonelabs.com/leads", label: "Leads" }],
        repo: "cornerstone-labs",
        vercel: "cornerstone-labs",
        portfolio: "private",
        note: "Same code and Vercel project as the main site.",
      },
      {
        name: "Steady Trader",
        what: "Options-trading mindset course, agent, and journal. Invite only.",
        status: "invite",
        urls: [{ url: "https://steadytrader.cstonelabs.com" }],
        repo: "steady-trader",
        vercel: "steady-trader",
        portfolio: "your call",
        note: "Not on the portfolio yet. Add it once it's ready for strangers to see.",
      },
      {
        name: "Loop Timer",
        what: "Interval timer that calls out switches over your music.",
        status: "live",
        urls: [{ url: "https://looptimer.cstonelabs.com" }],
        repo: "loop-timer",
        vercel: "loop-timer",
        portfolio: "on",
      },
      {
        name: "Nest Egg",
        what: "Whole financial life in one place, with an AI money guide.",
        status: "building",
        urls: [{ url: "https://nestegg.cstonelabs.com" }],
        repo: "nestegg-app",
        vercel: "nestegg",
        db: { kind: "Supabase · Nest Egg", state: "paused" },
        portfolio: "on",
        note: "Database is paused, so anything that saves data won't work until it's resumed.",
      },
    ],
  },
  {
    title: "TGT Academy",
    blurb: "Tutoring: the public site, the private hub, and study tools.",
    projects: [
      {
        name: "TGT Academy site",
        what: "Tutoring site with pricing, booking requests, and the student notes portal.",
        status: "live",
        urls: [{ url: "https://learnwithtgt.com" }, { url: "https://learnwithtgt.com/notes", label: "Student notes" }],
        repo: "the-good-tutor",
        vercel: "the-good-tutor",
        portfolio: "on",
      },
      {
        name: "TGT Hub",
        what: "Private: bookings, families, students, notes, reminders.",
        status: "personal",
        urls: [{ url: "https://hub.learnwithtgt.com", note: "password" }],
        repo: "the-good-tutor",
        vercel: "the-good-tutor",
        portfolio: "private",
        note: "Went live Oct 27. Same Vercel project as the TGT site.",
      },
      {
        name: "TGT ASVAB",
        what: "ASVAB practice tool for students.",
        status: "live",
        urls: [{ url: "https://asvab.learnwithtgt.com" }],
        repo: "tgt-asvab",
        vercel: "tgt-asvab",
        portfolio: "missing",
        note: "Working, but not on the portfolio.",
      },
    ],
  },
  {
    title: "Ventures in progress",
    blurb: "Bigger ideas with a public face but no revenue yet.",
    projects: [
      {
        name: "Christians Anonymous",
        what: "Christian events and community app for Tampa Bay.",
        status: "building",
        urls: [{ url: "https://www.joincacommunity.com", label: "joincacommunity.com" }],
        repo: "christian-anonymous",
        vercel: "christian-anonymous",
        db: { kind: "Supabase · christians-anonymous", state: "active" },
        portfolio: "on",
        note: "Stage 1 (org portal, events, admin approval) built on the v1-orgs branch. Free Supabase pauses after about a week idle.",
      },
      {
        name: "NearBy",
        what: "AI local discovery app. Landing page and waitlist.",
        status: "waitlist",
        urls: [{ url: "https://nearbyapp.io" }],
        repo: "nearby-landing",
        vercel: "nearby-landing",
        portfolio: "on",
      },
    ],
  },
  {
    title: "Zayviana",
    blurb: "Personal brand and personal tools.",
    projects: [
      {
        name: "zayviana.com",
        what: "Personal brand site: Believer, Builder, Creator.",
        status: "live",
        urls: [
          { url: "https://zayviana.com" },
          { url: "https://zayviana.com/professional", label: "Portfolio" },
          { url: "https://zayviana.xyz", note: "shows a duplicate copy, not redirecting" },
        ],
        repo: "zayviana.com",
        vercel: "zayviana-com",
        portfolio: "n/a",
      },
      {
        name: "Study Shelf",
        what: "Plain-English study guides on any device.",
        status: "live",
        urls: [{ url: "https://learn.zayviana.com" }],
        repo: "zayviana.com",
        vercel: "zayviana-com",
        portfolio: "missing",
      },
      {
        name: "Life OS",
        what: "Daily structure: workouts, water, time with God, tasks.",
        status: "personal",
        urls: [{ url: "https://life.zayviana.com", note: "passcode" }],
        repo: "zayviana.com",
        vercel: "zayviana-com",
        db: { kind: "Upstash Redis", state: "active" },
        portfolio: "private",
      },
      {
        name: "HQ",
        what: "This page.",
        status: "personal",
        urls: [{ url: "https://hq.zayviana.com", note: "same passcode as Life OS" }],
        repo: "zayviana.com",
        vercel: "zayviana-com",
        portfolio: "private",
      },
      {
        name: "Ship Ready",
        what: "Pre-ship tracker: countdown, workouts, food log.",
        status: "personal",
        urls: [{ url: "https://fit.zayviana.com" }],
        repo: "ship-ready",
        vercel: "ship-ready",
        db: { kind: "Supabase · ship-ready", state: "paused" },
        portfolio: "your call",
        note: "Built around the Nov 3 ship date, which has moved. Overlaps with the fitness tracker idea.",
      },
      {
        name: "HBD Alex",
        what: "Birthday page.",
        status: "personal",
        urls: [{ url: "https://hbdalex.zayviana.com" }],
        repo: "hbd-alex",
        vercel: "hbd-alex",
        portfolio: "private",
      },
    ],
  },
  {
    title: "To retire",
    blurb: "You said tear these down on Oct 17. They're still in Vercel.",
    projects: [
      {
        name: "zayviana-xyz",
        what: "Old personal site. No live domain.",
        status: "retire",
        urls: [],
        repo: "zayviana.xyz",
        vercel: "zayviana-xyz",
        portfolio: "n/a",
      },
      {
        name: "zayviana-portfolio",
        what: "Old portfolio, replaced by zayviana.com. No live domain.",
        status: "retire",
        urls: [],
        repo: "zayviana-portfolio",
        vercel: "zayviana-portfolio",
        portfolio: "n/a",
      },
    ],
  },
]

export const decisions: { title: string; detail: string; who: "you" | "Kisha" }[] = [
  {
    title: "Fix the Army National Guard line on your portfolio",
    detail: "It says 2026 to present and describes duties you haven't started. With Nov 3 off, it should read as enlisted with no ship date. Recruiters will check this.",
    who: "you",
  },
  {
    title: "Delete the two retired Vercel projects",
    detail: "zayviana-xyz and zayviana-portfolio. Only the account owner can permanently delete. Neither has a live domain, so nothing breaks.",
    who: "you",
  },
  {
    title: "Pick the second Supabase slot",
    detail: "Free plan allows two active. Christians Anonymous has one. Ship Ready or Nest Egg gets the other; both are paused right now.",
    who: "you",
  },
  {
    title: "Point zayviana.xyz at zayviana.com",
    detail: "It shows a full duplicate of your site, which splits search results. A redirect fixes it in one step.",
    who: "you",
  },
  {
    title: "Portfolio adds",
    detail: "TGT ASVAB and Study Shelf are working and missing. Steady Trader and Ship Ready are your call.",
    who: "you",
  },
  {
    title: "Keep hbdalex.zayviana.com up or take it down",
    detail: "The birthday has passed.",
    who: "you",
  },
  {
    title: "Keep the Christians Anonymous database awake",
    detail: "Free Supabase pauses after about a week idle, which breaks sign-in. A small daily check prevents it.",
    who: "Kisha",
  },
]

export const consoles = [
  { label: "Vercel", url: "https://vercel.com/zayvianas-projects" },
  { label: "GitHub", url: "https://github.com/zayvianas?tab=repositories" },
  { label: "Supabase", url: "https://supabase.com/dashboard/projects" },
  { label: "Google Business", url: "https://business.google.com" },
]
