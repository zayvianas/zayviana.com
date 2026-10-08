"use client"

import { useColorMode } from "../components/ColorModeProvider"
import { themeClasses } from "../components/theme"

const faithFirst = [
  {
    title: "How I carry myself",
    text: "My faith should show up in my character before it ever shows up in my words. You should be able to see it in how I treat people.",
  },
  {
    title: "What I say",
    text: "I want the words that come out of my mouth to build people up and point them back to Him.",
  },
  {
    title: "What I build",
    text: "Every business and app I make is meant to serve people well. Honesty, integrity, and generosity come first, even when it costs me something.",
  },
]

export default function BelieverView() {
  const { colorMode } = useColorMode()
  const dark = colorMode === "dark"
  const t = themeClasses(dark)

  return (
    <main className={t.main}>
      {/* INTRO */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <span className="mb-5 inline-block rounded-full bg-[var(--accent-red)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          The Believer
        </span>
        <h1 className={t.h1}>
          Faith first<span className="text-[var(--accent-red)]">.</span>
        </h1>
        <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${t.lead}`}>
          Everything I am starts here. My faith in God isn&apos;t a side note. It&apos;s the reason behind everything I do and everything I build.
        </p>
      </section>

      {/* STORY */}
      <section className={`px-6 py-16 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
          <p className={`mb-2 ${t.kicker}`}>My Story</p>
          <h2 className={`mb-8 ${t.h2}`}>February 4, 2024</h2>
          <div className={`flex flex-col gap-5 text-base leading-relaxed md:text-lg ${t.lead}`}>
            <p>
              That&apos;s the day I was baptized as an adult and rededicated my life to Jesus Christ. But my story with God started long before that. I grew up in the church, and faith was always around me.
            </p>
            <p>
              Then high school happened. I lost friends to gun violence and to suicide, and I didn&apos;t know how to carry that kind of loss. I started questioning everything, including God.
            </p>
            <p>
              So I went looking. I explored Islam and Buddhism, crystals, sage, and all kinds of spiritual practices. I tried just about everything, searching for something that could make sense of the pain.
            </p>
            <p>
              Nothing filled that space the way He did. When I came back to Jesus, I came back for real. Looking back, I can see His hand on my life the whole time, even in the years I wasn&apos;t looking for Him. He gave me a purpose, and He&apos;s given me gifts and talents I could never have given myself.
            </p>
            <p>
              I don&apos;t want to keep those to myself. I want to use them to help as many people as I can, to share the good news, and to be a light for anyone who&apos;s watching. That&apos;s my purpose, and it shapes every other part of my life.
            </p>
            <p className={t.muted}>
              There&apos;s more to my story, and I&apos;ll be sharing it in{" "}
              <a href="/testaments" className="font-semibold text-[var(--accent-red)] underline-offset-4 hover:underline">Testaments</a>.
            </p>
          </div>

          <blockquote className={`mt-12 border-l-2 border-[var(--accent-red)] pl-6`}>
            <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
              &ldquo;Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.&rdquo;
            </p>
            <p className={`mt-3 text-sm font-semibold uppercase tracking-[0.15em] ${t.faint}`}>Matthew 5:16</p>
          </blockquote>
          </div>
        </div>
      </section>

      {/* FAITH FIRST */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>What Faith First Means</p>
          <h2 className={`mb-3 ${t.h2}`}>Not preachy. Just present.</h2>
          <p className={`mb-10 max-w-2xl text-base ${t.muted}`}>
            I bring my faith into whatever I&apos;m doing. Not by preaching at people, but by letting it show in three places.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {faithFirst.map(({ title, text }) => (
              <div key={title} className={t.card}>
                <h3 className="font-display text-lg font-bold text-[var(--accent-red)]">{title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className={`scroll-mt-20 px-6 py-16 ${t.band}`}>
        <div className="mx-auto max-w-5xl">
          <p className={`mb-2 ${t.kicker}`}>Find Community</p>
          <h2 className={`mb-10 ${t.h2}`}>Looking for your people?</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className={`${t.card} flex flex-col`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-pink)]">The App</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${t.pill}`}>Coming soon</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">Christians Anonymous</h3>
              <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>
                A home for Christians in Tampa Bay. Browse Christian events, find a church home through other people&apos;s experiences, and connect with people who want community too.
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>
                About the name: like any &ldquo;Anonymous&rdquo; group, we all come in as sinners carrying something. We lay it down, and our identity moves from the sin to Christ.
              </p>
            </div>

            <div className={`${t.card} flex flex-col`}>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-green)]">Right Now</span>
              <h3 className="mt-3 font-display text-2xl font-bold">Let&apos;s connect</h3>
              <p className={`mt-3 flex-1 text-sm leading-relaxed ${t.muted}`}>
                In the Tampa Bay area and looking for Christian friends, a Bible study, or a church home? Reach out. I&apos;d love to help you find your people.
              </p>
              <a href="/connect" className={`mt-6 self-start ${t.btnPrimary}`}>Say hello</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
