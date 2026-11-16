import clsx from 'clsx'
import { RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { accentBg } from '../data/profile'
import { skillGroups } from '../data/skills'
import { springs } from '../lib/motion'

const rotations = [-4, 3, -2, 5, -3, 2, 4, -5]

export function Skills() {
  const area = useRef<HTMLDivElement>(null)
  const [round, setRound] = useState(0)
  const [moved, setMoved] = useState(false)

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-5 py-28 sm:px-8 md:px-14 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="skills-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              My toy box
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg">The tools I reach for. Go on, pick them up and throw them around.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRound((r) => r + 1)
              setMoved(false)
            }}
            disabled={!moved}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 font-display text-sm font-semibold shadow-toy transition-opacity disabled:opacity-40"
          >
            <RotateCcw size={16} strokeWidth={2.5} aria-hidden />
            Tidy up
          </button>
        </div>

        <div
          ref={area}
          key={round}
          className="relative mt-10 grid gap-8 rounded-[32px] border-2 border-dashed border-ink/50 p-5 sm:p-8"
        >
          {skillGroups.map((g) => (
            <div key={g.name}>
              <h3 className="mb-3 text-base font-semibold">{g.name}</h3>
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
                    whileHover={{ scale: 1.06 }}
                    whileDrag={{ scale: 1.15, rotate: 0, zIndex: 20 }}
                    transition={springs.bouncy}
                    className={clsx(
                      'relative cursor-grab touch-none select-none rounded-2xl border-2 border-ink px-4 py-2.5 font-display text-sm font-semibold text-plum shadow-toy active:cursor-grabbing md:text-base',
                      accentBg[g.color],
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
