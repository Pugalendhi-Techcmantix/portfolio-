import clsx from 'clsx'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { CSSProperties, PointerEvent } from 'react'
import type { AccentColor } from '../data/profile'
import type { Project } from '../data/projects'
import { useCoarsePointer, useReducedMotion } from '../lib/media'
import { ProjectArt } from './ProjectArt'
import SpotlightCard from './reactbits/SpotlightCard'

type Props = {
  project: Project
  index: number
  wide: boolean
  onOpen: (project: Project, trigger: HTMLButtonElement) => void
}

const spotlight: Record<AccentColor, string> = {
  bubblegum: '#ff4fa3',
  lemon: '#ffe04a',
  pool: '#1fb6ff',
  grass: '#34d07f',
  violet: '#8b5cf6',
}

/** A project card in glass: tilts toward the pointer, a coloured spotlight follows it, click opens the case study. */
export function ProjectPanel({ project, index, wide, onOpen }: Props) {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  const tilt = !reduced && !coarse
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={reset}
      className={clsx(
        'shrink-0',
        wide &&
          (index % 2
            ? 'w-[min(28rem,32vw,50svh)] translate-y-[9svh]'
            : 'w-[min(34rem,38vw,58svh)] -translate-y-[5svh]'),
      )}
    >
      <SpotlightCard
        theme="dark"
        spotlightColor={spotlight[project.color]}
        className="!p-0"
        style={{ '--spotlight-card-surface': 'rgb(28 18 62 / 0.72)' } as CSSProperties}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(e) => {
            reset()
            onOpen(project, e.currentTarget)
          }}
          className="group block w-full text-left text-white transition-transform duration-300 active:scale-[0.985]"
        >
          <motion.div layoutId={`art-${project.id}`} className="overflow-hidden border-b border-white/15">
            <ProjectArt
              style={project.art}
              className="aspect-[400/260] w-full transition-transform duration-500 ease-glass group-hover:scale-105"
            />
          </motion.div>
          <div className="p-5 md:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">{project.title}</h3>
              <span className="shrink-0 text-sm font-semibold text-white/65">{project.status}</span>
            </div>
            <p className="mt-2 max-w-[48ch] text-base leading-snug text-white/80">{project.summary}</p>
            <span className="mt-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold transition-colors group-hover:bg-white/20">
              Open case study
            </span>
          </div>
        </button>
      </SpotlightCard>
    </motion.div>
  )
}
