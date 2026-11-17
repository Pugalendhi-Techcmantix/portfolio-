import clsx from 'clsx'
import { RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { accentGlow } from '../data/profile'
import { skillGroups } from '../data/skills'
import { springs } from '../lib/motion'

const rotations = [-4, 3, -2, 5, -3, 2, 4, -5]

const chipColor = {
  bubblegum: 'border-bubblegum/70 bg-bubblegum/20',
  pool: 'border-pool/70 bg-pool/20',
  grass: 'border-grass/70 bg-grass/20',
  lemon: 'border-lemon/70 bg-lemon/20',
  violet: 'border-violet/70 bg-violet/25',
} as const

export function Skills() {
  const area = useRef<HTMLDivElement>(null)
  const [round, setRound] = useState(0)
  const [moved, setMoved] = useState(false)

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-5 py-28 sm:px-8 md:px-14 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="skills-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
              Tech stack
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg text-white/80">What I use day to day. Grab a chip and fling it around the glass.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRound((r) => r + 1)
              setMoved(false)
            }}
            disabled={!moved}
            className="glass inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-display text-sm font-semibold text-white transition-opacity disabled:opacity-40"
          >
            <RotateCcw size={16} strokeWidth={2.5} aria-hidden />
            Tidy up
          </button>
        </div>

        <div ref={area} key={round} className="glass relative mt-10 grid gap-8 rounded-[32px] p-5 sm:p-8">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <h3 className="mb-3 text-base font-semibold text-white/70">{g.name}</h3>
              <ul className="flex flex-wrap gap-3">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    data-cursor="grab"
                    drag
                    dragConstraints={area}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 14 }}
                    onDragStart={() => setMoved(true)}
                    initial={{ rotate: rotations[i % rotations.length] }}
                    whileHover={{ scale: 1.07 }}
                    whileDrag={{ scale: 1.15, rotate: 0, zIndex: 20 }}
                    transition={springs.bouncy}
                    className={clsx(
                      'relative cursor-grab touch-none select-none rounded-2xl border px-4 py-2.5 font-display text-sm font-semibold text-white backdrop-blur-sm active:cursor-grabbing md:text-base',
                      chipColor[g.color],
                      accentGlow[g.color].replace('0.8', '0.35').replace('0.9', '0.4'),
                    )}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
