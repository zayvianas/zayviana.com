"use client"
import { useEffect, useRef } from "react"
import { mount } from "./hqEngine"

// The signed-in HQ. The engine draws everything inside this one element.
export default function HqApp() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    return mount(ref.current)
  }, [])
  return <div ref={ref} className="hq2" data-theme="light" />
}
