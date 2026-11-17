import clsx from 'clsx'
import type { CSSProperties } from 'react'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { accentBg, accentGlow, profile, type AccentColor } from '../data/profile'

export function About() {
  const { about } = profile

  return (
    <section id="about" aria-labelledby="about-title" className="relative px-5 py-28 sm:px-8 md:px-14 md:py-40">
      <div className="max-w-[40rem]">
        <h2 id="about-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
          {about.heading}
        </h2>
        <div className="mt-8 space-y-5 text-lg text-white/85 md:text-xl">
          {about.paragraphs.map((p) => (
            <p key={p} className="max-w-[60ch]">
              {p}
            </p>
          ))}
        </div>

        <SpotlightCard
          theme="dark"
          spotlightColor="#8b5cf6"
          className="mt-10 !p-6 backdrop-blur-xl backdrop-saturate-150 sm:!p-7"
          style={{ '--spotlight-card-surface': 'rgb(28 18 62 / 0.45)' } as CSSProperties}
        >
          <h3 className="font-display text-sm font-bold text-bubblegum">Player card</h3>
          <dl className="mt-4 grid gap-3.5">
            {about.card.map((row) => (
              <div key={row.label} className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-0.5 sm:grid-cols-[9.5rem_1fr]">
                <dt className="flex items-center gap-2.5 text-base text-white/65">
                  <span aria-hidden className={clsx('size-2.5 shrink-0 rounded-full', accentBg[row.color as AccentColor], accentGlow[row.color as AccentColor])} />
                  {row.label}
                </dt>
                <dd className="text-base font-semibold text-white sm:text-lg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </SpotlightCard>
      </div>
    </section>
  )
}
