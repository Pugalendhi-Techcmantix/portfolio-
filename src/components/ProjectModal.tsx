import clsx from 'clsx'
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { accentBg } from '../data/profile'
import type { Project } from '../data/projects'
import { useReducedMotion } from '../lib/media'
import { springs } from '../lib/motion'
import { useLenis } from '../lib/smooth-scroll'
import { ProjectArt } from './ProjectArt'

type Props = { project: Project; onClose: () => void }

export function ProjectModal({ project, onClose }: Props) {
  const lenis = useLenis()
  const reduced = useReducedMotion()
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus({ preventScroll: true })

    // Listen on document so Esc and the focus trap work even if focus left the dialog (e.g. backdrop click).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !dialog.current) return
      const focusable = dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const inside = dialog.current.contains(document.activeElement)
      if (!inside || (e.shiftKey && document.activeElement === first)) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = prevOverflow
    }
  }, [lenis])

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-plum/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        data-lenis-prevent
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.2 } }}
        transition={springs.snappy}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain [scrollbar-width:thin] rounded-[32px] border-2 border-ink bg-paper shadow-toy-lg"
      >
        <div className={clsx('relative', accentBg[project.color])}>
          <motion.div layoutId={`art-${project.id}`} className="overflow-hidden border-b-2 border-ink">
            <ProjectArt style={project.art} className="aspect-[400/220] w-full" />
          </motion.div>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border-2 border-plum bg-lemon text-plum shadow-[3px_3px_0_#22103d]"
          >
            <X size={22} strokeWidth={2.75} />
          </button>
        </div>

        <motion.div
          className="p-6 md:p-10"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0, transition: { ...springs.gentle, delay: 0.12 } }}
        >
          <p className="text-base font-semibold">
            {project.status}, {project.role}
          </p>
          <h2 id="case-title" className="mt-1 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em]">
            {project.title}
          </h2>
          <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[62ch] text-lg">{project.summary}</p>
          <h3 className="mt-8 font-display text-lg font-bold">What it does</h3>
          <ul className="mt-3 grid max-w-[62ch] gap-2.5 text-lg">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-2.5 shrink-0 rounded-full border-2 border-ink bg-bubblegum" />
                {h}
              </li>
            ))}
          </ul>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex min-h-12 items-center rounded-full border-2 border-ink bg-bubblegum px-6 font-display text-sm font-semibold text-plum shadow-toy"
          >
            {project.hrefLabel}
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
