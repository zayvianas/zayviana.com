"use client"
import { useState } from "react"

export function LoginForm() {
  const [code, setCode] = useState("")
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr("")
    try {
      const r = await fetch("/api/hq/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ passcode: code }) })
      if (r.ok) { window.location.reload(); return }
      const j = await r.json().catch(() => ({}))
      setErr(j.error === "setup" ? "Set your passcode in Life OS first." : "That passcode didn't work.")
    } catch {
      setErr("Couldn't reach the server. Try again.")
    }
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="hq-login">
      <p className="hq-eyebrow">Private</p>
      <h1 className="font-display">HQ</h1>
      <p className="hq-muted">Use your Life OS passcode.</p>
      <input
        type="password"
        inputMode="numeric"
        autoComplete="current-password"
        autoFocus
        value={code}
        onChange={(e) => setCode(e.target.value)}
        aria-label="Passcode"
        placeholder="Passcode"
      />
      <button type="submit" disabled={busy || !code}>{busy ? "Checking…" : "Open HQ"}</button>
      {err && <p className="hq-err" role="alert">{err}</p>}
    </form>
  )
}

export function SignOut() {
  return (
    <button
      className="hq-link-btn"
      onClick={async () => { await fetch("/api/hq/login", { method: "DELETE" }); window.location.reload() }}
    >
      Sign out
    </button>
  )
}

export function Filter() {
  const [q, setQ] = useState("")
  function apply(v: string) {
    setQ(v)
    const t = v.trim().toLowerCase()
    document.querySelectorAll<HTMLElement>("[data-hq-row]").forEach((el) => {
      el.style.display = !t || (el.dataset.hqRow || "").includes(t) ? "" : "none"
    })
  }
  return (
    <input className="hq-filter" value={q} onChange={(e) => apply(e.target.value)} placeholder="Filter projects or domains" aria-label="Filter projects or domains" />
  )
}
