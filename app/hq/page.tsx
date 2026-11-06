import type { Metadata } from "next"
import { cookies } from "next/headers"
import { HQ_COOKIE, hqAuthedCookie, configured } from "../lib/lifeServer"
import { LoginForm } from "./HqClient"
import HqApp from "./HqApp"
import "./hq.css"
import "./hq2.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "HQ",
  robots: { index: false, follow: false },
}

// hq.zayviana.com: Zayviana's private home base. Same passcode as Life OS.
// Ventures, tasks, money and "gone quiet" all live in the client app (HqApp).
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
  return <HqApp />
}
