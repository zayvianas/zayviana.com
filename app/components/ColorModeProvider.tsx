"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import Navbar from "./Navbar"

export type Mode = "dark" | "light"

const order: Mode[] = ["dark", "light"]

export const ColorModeContext = createContext<{ colorMode: Mode; cycleMode: () => void }>({
  colorMode: "dark",
  cycleMode: () => {},
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

export default function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<Mode>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("colorMode") as Mode | null
    if (saved && order.includes(saved)) setColorMode(saved)
  }, [])

  const cycleMode = () => {
    setColorMode(prev => {
      const next = order[(order.indexOf(prev) + 1) % order.length]
      localStorage.setItem("colorMode", next)
      return next
    })
  }

  // Dark is the signature (Kinetic) mode; render it first paint to avoid a light flash.
  const activeMode = mounted ? colorMode : "dark"

  return (
    <ColorModeContext.Provider value={{ colorMode: activeMode, cycleMode }}>
      <Navbar colorMode={activeMode} onToggle={cycleMode} />
      {children}
    </ColorModeContext.Provider>
  )
}
