import ComingSoon from "../components/ComingSoon"

export const metadata = { title: "The Builder · Zayviana" }

export default function ProfessionalPage() {
  return (
    <ComingSoon
      tag="The Builder"
      tagColor="#f472b6"
      title={<>Something Is<br />Being Built.</>}
      lines={[
        "PM, AI consulting, data, product strategy, and the ventures I've founded. The full professional story is on its way.",
      ]}
      primary={{ label: "See my LinkedIn", href: "https://linkedin.com/in/zayviana", external: true }}
      secondary={{ label: "See my ventures →", href: "/ventures" }}
    />
  )
}
