import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import ColorModeProvider from "./components/ColorModeProvider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Zayviana Singletary · A believer who builds",
  description: "Believer · Builder · Creator. Faith-led technologist, founder, and creator building at the intersection of faith, technology, and creativity.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <ColorModeProvider>
          {children}
        </ColorModeProvider>
      </body>
    </html>
  )
}
