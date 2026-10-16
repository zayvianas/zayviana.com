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

const SITE_DESCRIPTION = "Believer · Builder · Creator. Faith-led technologist, founder, and creator building at the intersection of faith, technology, and creativity."

export const metadata: Metadata = {
  metadataBase: new URL("https://zayviana.com"),
  title: "Zayviana Singletary · A believer who builds",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Zayviana Singletary · A believer who builds",
    description: SITE_DESCRIPTION,
    url: "https://zayviana.com",
    siteName: "Zayviana Singletary",
    type: "website",
    images: [{ url: "/og-zayviana.png", width: 1200, height: 630, alt: "Zayviana Singletary · Believer, Builder, Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayviana Singletary · A believer who builds",
    description: SITE_DESCRIPTION,
    images: ["/og-zayviana.png"],
  },
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
