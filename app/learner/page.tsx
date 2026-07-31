import ComingSoon from "../components/ComingSoon"

export const metadata = { title: "The Educator · Zayviana" }

export default function LearnerPage() {
  return (
    <ComingSoon
      tag="The Educator"
      tagColor="#10b981"
      title={<>Still<br />Learning.</>}
      lines={[
        "Tutoring since 19. Teaching for 3 years. Living with ADHD and dyslexia, and turning that struggle into a superpower for others.",
        "The Educator is powered by The Good Tutor, a tutoring and education brand rooted in empathy, creativity, and the belief that everyone can learn.",
      ]}
      note={{ text: "Full page coming soon", color: "#10b981" }}
      secondary={{ label: "Interested in tutoring? Let's connect →", href: "/connect" }}
    />
  )
}
