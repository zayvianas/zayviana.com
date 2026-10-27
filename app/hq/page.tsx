import type { Metadata } from "next"
import { cookies } from "next/headers"
import { HQ_COOKIE, hqAuthedCookie, configured } from "../lib/lifeServer"
import { groups, decisions, consoles, AUDITED, type Project, type Status, type Portfolio } from "../lib/hqData"
import { LoginForm, SignOut, Filter } from "./HqClient"
import "./hq.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "HQ",
  robots: { index: false, follow: false },
}

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  invite: "Invite only",
  building: "Building",
  waitlist: "Waitlist",
  personal: "Private",
  retire: "Retire",
}

const PORTFOLIO_LABEL: Record<Portfolio, string> = {
  on: "On portfolio",
  missing: "Missing from portfolio",
  "your call": "Portfolio: your call",
  private: "Private",
  "n/a": "",
}

type Check = { up: boolean; code: number | string; ms: number }

async function check(url: string): Promise<Check> {
  const t = Date.now()
  try {
    const r = await fetch(url, { redirect: "follow", cache: "no-store", signal: AbortSignal.timeout(6000), headers: { "User-Agent": "zayviana-hq-check" } })
    // A login page (200) or a locked response (401/403) still means the site answers.
    return { up: r.status < 500, code: r.status, ms: Date.now() - t }
  } catch {
    return { up: false, code: "no answer", ms: Date.now() - t }
  }
}

function host(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export default async function HQ() {
  const jar = await cookies()
  const ok = configured() && (await hqAuthedCookie(jar.get(HQ_COOKIE)?.value))

  if (!ok) {
    return (
      <div className="hq-root hq-center">
        <LoginForm />
      </div>
    )
  }

  // Live checks run server-side on every load, in parallel.
  const urls = Array.from(new Set(groups.flatMap((g) => g.projects.flatMap((p) => p.urls.map((u) => u.url)))))
  const results = await Promise.all(urls.map(check))
  const status = new Map(urls.map((u, i) => [u, results[i]]))
  const down = urls.filter((u) => !status.get(u)!.up)

  const all = groups.flatMap((g) => g.projects)
  const paused = all.filter((p) => p.db?.state === "paused")
  const missing = all.filter((p) => p.portfolio === "missing")
  const yours = decisions.filter((d) => d.who === "you")

  const checkedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit", month: "short", day: "numeric" })

  return (
    <div className="hq-root">
      <div className="hq-wrap">
        <header className="hq-head">
          <div>
            <p className="hq-eyebrow">Zayviana · Private</p>
            <h1 className="font-display">HQ</h1>
            <p className="hq-muted">Everything you&apos;ve built, where it lives, and what needs you. Sites checked live at {checkedAt}. Everything else audited {AUDITED}.</p>
          </div>
          <SignOut />
        </header>

        <section className="hq-stats" aria-label="Summary">
          <Stat n={urls.length - down.length} of={urls.length} label="Sites answering" tone={down.length ? "warn" : "good"} />
          <Stat n={all.filter((p) => p.status !== "retire").length} label="Projects" />
          <Stat n={paused.length} label="Databases paused" tone={paused.length ? "warn" : "good"} />
          <Stat n={yours.length} label="Need your decision" tone={yours.length ? "warn" : "good"} />
        </section>

        {down.length > 0 && (
          <div className="hq-alert" role="status">
            <strong>Not answering right now:</strong> {down.map(host).join(", ")}
          </div>
        )}

        <section className="hq-section">
          <h2 className="font-display">Needs a decision</h2>
          <ol className="hq-decisions">
            {decisions.map((d) => (
              <li key={d.title}>
                <div>
                  <p className="hq-dtitle">{d.title}</p>
                  <p className="hq-muted">{d.detail}</p>
                </div>
                <span className={`hq-who ${d.who === "you" ? "is-you" : ""}`}>{d.who === "you" ? "You" : "Kisha"}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="hq-toolbar">
          <Filter />
          <nav className="hq-consoles" aria-label="Dashboards">
            {consoles.map((c) => (
              <a key={c.label} href={c.url} target="_blank" rel="noreferrer">{c.label} ↗</a>
            ))}
          </nav>
        </div>

        {groups.map((g) => (
          <section key={g.title} className="hq-section">
            <div className="hq-ghead">
              <h2 className="font-display">{g.title}</h2>
              <p className="hq-muted">{g.blurb}</p>
            </div>
            <div className="hq-cards">
              {g.projects.map((p) => (
                <ProjectCard key={p.name} p={p} status={status} />
              ))}
            </div>
          </section>
        ))}

        {missing.length > 0 && (
          <p className="hq-foot hq-muted">Missing from the portfolio: {missing.map((p) => p.name).join(", ")}.</p>
        )}
        <p className="hq-foot hq-muted">To change anything here, tell Kisha. The list lives in the zayviana.com repo (app/lib/hqData.ts).</p>
      </div>
    </div>
  )
}

function Stat({ n, of, label, tone }: { n: number; of?: number; label: string; tone?: "good" | "warn" }) {
  return (
    <div className={`hq-stat ${tone ? "is-" + tone : ""}`}>
      <p className="hq-n font-display">{n}{of !== undefined && <span>/{of}</span>}</p>
      <p className="hq-muted">{label}</p>
    </div>
  )
}

function ProjectCard({ p, status }: { p: Project; status: Map<string, Check> }) {
  const search = [p.name, p.what, p.repo, p.vercel, ...p.urls.map((u) => u.url)].join(" ").toLowerCase()
  return (
    <article className={`hq-card st-${p.status}`} data-hq-row={search}>
      <div className="hq-card-top">
        <h3 className="font-display">{p.name}</h3>
        <span className={`hq-pill st-${p.status}`}>{STATUS_LABEL[p.status]}</span>
      </div>
      <p className="hq-muted">{p.what}</p>

      {p.urls.length > 0 && (
        <ul className="hq-urls">
          {p.urls.map((u) => {
            const c = status.get(u.url)
            return (
              <li key={u.url}>
                <span className={`hq-dot ${c?.up ? "up" : "down"}`} title={c ? `${c.code} · ${c.ms} ms` : ""} aria-label={c?.up ? "answering" : "not answering"} />
                <a href={u.url} target="_blank" rel="noreferrer">{u.label || host(u.url)}</a>
                {u.note && <span className="hq-note">{u.note}</span>}
              </li>
            )
          })}
        </ul>
      )}

      <dl className="hq-meta">
        {p.repo && (
          <div><dt>GitHub</dt><dd><a href={`https://github.com/zayvianas/${p.repo}`} target="_blank" rel="noreferrer">{p.repo}</a></dd></div>
        )}
        {p.vercel && (
          <div><dt>Vercel</dt><dd><a href={`https://vercel.com/zayvianas-projects/${p.vercel}`} target="_blank" rel="noreferrer">{p.vercel}</a></dd></div>
        )}
        {p.db && (
          <div><dt>Data</dt><dd className={p.db.state === "paused" ? "is-warn" : ""}>{p.db.kind}{p.db.state !== "n/a" ? ` · ${p.db.state}` : ""}</dd></div>
        )}
        {PORTFOLIO_LABEL[p.portfolio] && (
          <div><dt>Portfolio</dt><dd className={p.portfolio === "missing" ? "is-warn" : ""}>{PORTFOLIO_LABEL[p.portfolio].replace("Portfolio: ", "")}</dd></div>
        )}
      </dl>
      {p.note && <p className="hq-cardnote">{p.note}</p>}
    </article>
  )
}
