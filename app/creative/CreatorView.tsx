"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"

type Craft = {
  name: string
  color: string
  text: string
  tags: string[]
  photo?: { src: string; alt: string; caption: string }
}

const crafts: Craft[] = [
  {
    name: "Music",
    color: "var(--accent-red)",
    text: "I've been singing since I was five or six, and I haven't stopped. I played cello in fifth grade, I've made beats, and I love every kind of music there is. Literally every genre.",
    tags: ["Singing", "Beat making", "Cello"],
  },
  {
    name: "Stage",
    color: "var(--accent-pink)",
    text: "Musical theater and Broadway have my whole heart. I love acting, performing, and anything that puts a story on a stage.",
    tags: ["Musical theater", "Broadway", "Acting", "Performing"],
    photo: { src: "/creative-3.jpg", alt: "Zayviana smiling while an artist paints a design on her shoulder before a show", caption: "Getting body art done for a show" },
  },
  {
    name: "Runway",
    color: "var(--accent-green)",
    text: "My favorite part of modeling isn't the photos. It's the walk. Give me a runway and I'm going to shred it.",
    tags: ["Runway", "Modeling", "Fashion"],
    photo: { src: "/creative-1.jpg", alt: "Zayviana in a styled group fashion shoot, everyone in black against a green backdrop", caption: "Fashion shoot" },
  },
  {
    name: "Making",
    color: "var(--accent-red)",
    text: "In high school I'd pick up anything. I customized shoes, and I've knitted, crocheted, made waist beads, and painted in watercolor and acrylic. If it creates something, I'm in.",
    tags: ["Waist beads", "Custom shoes", "Knitting", "Crochet", "Watercolor", "Acrylic"],
    photo: { src: "/creative-2.jpg", alt: "Purple and pink waist beads Zayviana made, held in her hand at the beach", caption: "Waist beads I made" },
  },
  {
    name: "Movement",
    color: "var(--accent-pink)",
    text: "Dancing, skating, anything that moves. It's one more way I express myself.",
    tags: ["Dance", "Skating"],
  },
]

const comingSoon = ["Singing", "My hair journey", "Runway and modeling", "Art and custom pieces", "Everyday life"]

export default function CreatorView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)
  let photoIndex = 0

  return (
    <main className={t.main}>
      {/* INTRO */}
      <section className="px-6 pt-24 pb-16">
        <div className="mx-auto max-w-5xl">
          <span className="mb-5 inline-block rounded-full bg-[var(--accent-green)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            The Creator
          </span>
          <h1 className={t.h1}>
            Made to create<span className="text-[var(--accent-red)]">.</span>
          </h1>
          <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${t.lead}`}>
            I don&apos;t fit in one creative box, and I don&apos;t want to. I sing, I act, I walk runways, I paint, I make things with my hands. I just love expressing myself in every way I can, and every one of those gifts came from God.
          </p>
        </div>
      </section>

      {/* CRAFTS */}
      <section className={`px-6 py-20 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>All The Ways I Create</p>
          <h2 className={`mb-10 ${t.h2}`}>A little bit of everything</h2>
          <div className="flex flex-col gap-6">
            {crafts.map(({ name, color, text, tags, photo }) => {
              const flip = photo ? photoIndex++ % 2 === 1 : false
              return (
                <div key={name} className={`${t.card} md:p-10 ${photo ? "grid items-center gap-8 md:grid-cols-2 md:gap-12" : ""}`}>
                  <div className={flip ? "md:order-2" : ""}>
                    <h3 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color }}>
                      {name}<span className={dark ? "text-white" : "text-[#0e0e10]"}>.</span>
                    </h3>
                    <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${t.lead}`}>{text}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span key={tag} className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${t.pill}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {photo && (
                    <figure className={flip ? "md:order-1" : ""}>
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                      </div>
                      <figcaption className={`mt-2 text-xs font-semibold uppercase tracking-[0.15em] ${t.faint}`}>{photo.caption}</figcaption>
                    </figure>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STAY TUNED */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className={`border border-dashed p-8 md:p-12 ${dark ? "border-white/20" : "border-black/15"}`}>
            <h2 className={t.h2}>Stay tuned<span className="text-[var(--accent-red)]">.</span></h2>
            <p className={`mt-3 max-w-2xl text-base leading-relaxed md:text-lg ${t.lead}`}>
              I&apos;ll be posting and sharing my talents and my life soon.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {comingSoon.map(item => (
                <span key={item} className={`rounded-full border px-4 py-2 text-sm font-medium ${t.pill}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
