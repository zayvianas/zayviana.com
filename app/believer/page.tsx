import ComingSoon from "../components/ComingSoon"

export const metadata = { title: "The Believer · Zayviana" }

export default function BelieverPage() {
  return (
    <ComingSoon
      tag="The Believer"
      tagColor="#e11d48"
      title={<>Faith<br />First.</>}
      lines={[
        "Everything I am starts here. My faith in God is not a background detail. It is the foundation that shapes how I think, how I build, and how I love people.",
        "I'm working on sharing my full testimony: the hard parts, the turning points, and what God has done in my life. It's worth telling.",
      ]}
      note={{ text: "Testimony coming soon", color: "#e11d48" }}
      secondary={{ label: "Read Testament →", href: "/testament" }}
    />
  )
}
