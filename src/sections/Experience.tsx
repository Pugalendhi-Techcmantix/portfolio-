import { useRef } from 'react'
import { experience } from '../data/experience'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../lib/media'

export function Experience() {
  const reduced = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
        },
      )
      gsap.utils.toArray<HTMLElement>('[data-dot]').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.4, backgroundColor: 'rgb(5 3 13)' },
          {
            scale: 1,
            backgroundColor: '#ff4fa3',
            ease: 'back.out(3)',
            scrollTrigger: { trigger: dot, start: 'top 62%', toggleActions: 'play none none reverse' },
          },
        )
      })
    },
    { scope: list, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative px-5 py-28 sm:px-8 md:px-14 md:py-40">
      <div className="max-w-3xl">
        <h2 id="experience-title" className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
          Experience and education
        </h2>
        <div className="relative mt-14">
          <div aria-hidden className="absolute bottom-2 left-[13px] top-2 w-1 rounded-full bg-white/10" />
          <div
            ref={line}
            aria-hidden
            className="absolute bottom-2 left-[13px] top-2 w-1 origin-top rounded-full bg-gradient-to-b from-pool via-violet to-bubblegum shadow-[0_0_14px_rgb(139_92_246/0.8)]"
          />
          <ol ref={list} className="relative space-y-8 pl-12">
            {experience.map((job) => (
              <li key={job.years} className="glass-lite relative rounded-3xl p-5 sm:p-6">
                <span
                  data-dot
                  aria-hidden
                  className="absolute -left-12 top-6 size-[30px] rounded-full border-2 border-white/80 bg-bubblegum shadow-[0_0_18px_rgb(255_79_163/0.8)]"
                />
                <p className="text-base font-semibold text-bubblegum">{job.years}</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-[-0.01em] text-white md:text-2xl">
                  {job.role}, <span className="font-medium text-white/80">{job.place}</span>
                </h3>
                <p className="mt-2 max-w-[56ch] text-lg text-white/80">{job.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
