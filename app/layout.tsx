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
  title: "Zayviana Singletary · Believer, Builder, Creator",
  description: "Zayviana Singletary is a founder, product manager, and teacher in Tampa Bay. Find her ventures, her work, and her story.",
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
