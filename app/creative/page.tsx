import ComingSoon from "../components/ComingSoon"

export const metadata = { title: "The Creator · Zayviana" }

export default function CreativePage() {
  return (
    <ComingSoon
      tag="The Creator"
      tagColor="#10b981"
      title={<>Made to<br />Create.</>}
      lines={[
        "Music. Art. Movement. Expression. Creativity is a gift, and this is where I use it. The full creative world of Zayviana is getting its own home.",
      ]}
      note={{ text: "creative.zayviana.com · coming soon", color: "#10b981" }}
      secondary={{ label: "← Back home", href: "/" }}
    />
  )
}
