import clsx from 'clsx'
import { motion } from 'motion/react'
import { accentBg, profile, type AccentColor } from '../data/profile'
import { useReducedMotion } from '../lib/media'
import { springs } from '../lib/motion'

const tilts = ['-rotate-3', 'rotate-2', '-rotate-1']

export function About() {
  const reduced = useReducedMotion()
  const { about } = profile

  return (
    <section id="about" aria-labelledby="about-title" className="relative px-5 py-28 sm:px-8 md:px-14 md:py-40">
      <div className="max-w-[40rem]">
        <h2 id="about-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {about.heading}
        </h2>
        <div className="mt-8 space-y-5 text-lg md:text-xl">
          {about.paragraphs.map((p) => (
            <p key={p} className="max-w-[60ch]">
              {p}
            </p>
          ))}
        </div>
        <ul aria-label="A few facts" className="mt-10 flex flex-wrap gap-4">
          {about.facts.map((f, i) => (
            <motion.li
              key={f.label}
              whileHover={reduced ? undefined : { rotate: [0, -6, 5, -3, 0], scale: 1.06, transition: { duration: 0.5 } }}
              transition={springs.bouncy}
              className={clsx(
                'rounded-2xl border-2 border-ink px-4 py-2.5 font-display text-sm font-semibold text-plum shadow-toy',
                accentBg[f.color as AccentColor],
                tilts[i % tilts.length],
              )}
            >
              {f.label}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
