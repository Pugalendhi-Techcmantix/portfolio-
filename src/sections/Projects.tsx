import clsx from 'clsx'
import { AnimatePresence, LayoutGroup } from 'motion/react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ProjectModal } from '../components/ProjectModal'
import { ProjectPanel } from '../components/ProjectPanel'
import { projects, type Project } from '../data/projects'
import { gsap, useGSAP } from '../lib/gsap'
import { useMediaQuery, useReducedMotion } from '../lib/media'

export function Projects() {
  const reduced = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const pinned = desktop && !reduced
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<Project | null>(null)

  useGSAP(
    () => {
      if (!pinned || !track.current) return
      const distance = () => track.current!.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: section, dependencies: [pinned], revertOnUpdate: true },
  )

  const openProject = (p: Project, el: HTMLButtonElement) => {
    trigger.current = el
    setOpen(p)
  }
  const close = () => {
    setOpen(null)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }

  return (
    <section
      id="projects"
      ref={section}
      aria-labelledby="projects-title"
      className={clsx('relative', pinned ? 'h-svh overflow-hidden' : 'py-24')}
    >
      <LayoutGroup>
        <div
          ref={track}
          className={clsx(
            'flex gap-8 px-5 sm:px-8 md:px-14',
            pinned ? 'h-full w-max flex-row items-center gap-12 pr-[12vw] pt-16' : 'flex-col',
          )}
        >
          <header className={clsx('shrink-0', pinned && 'w-[min(26rem,30vw)]')}>
            <h2
              id="projects-title"
              className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
            >
              Selected work
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg">
              Projects from work and from my own practice. Open any card to see what it does.
            </p>
          </header>
          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} wide={pinned} onOpen={openProject} />
          ))}
        </div>

        {createPortal(
          <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={close} />}</AnimatePresence>,
          document.body,
        )}
      </LayoutGroup>
    </section>
  )
}
