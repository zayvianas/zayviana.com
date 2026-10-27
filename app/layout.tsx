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

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zayviana Singletary",
  url: "https://zayviana.com",
  image: "https://zayviana.com/og-zayviana.png",
  description: SITE_DESCRIPTION,
  sameAs: ["https://linkedin.com/in/zayviana", "https://github.com/zayvianas"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of South Florida" },
  owns: [
    { "@type": "Organization", name: "CornerStone Labs", url: "https://cstonelabs.com" },
    { "@type": "EducationalOrganization", name: "TGT Academy", url: "https://learnwithtgt.com" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://zayviana.com"),
  title: "Zayviana Singletary · A believer who builds",
  description: SITE_DESCRIPTION,
  // Home page canonical. Every other page sets its own so Google treats
  // https://zayviana.com/<path> as the one real copy (not www., hq., learn., or life.).
  alternates: { canonical: "/" },
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
        <script
          type="application/ld+json"
          // Tells Google who this site is about and which businesses are hers.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <ColorModeProvider>
          {children}
        </ColorModeProvider>
      </body>
    </html>
  )
}
