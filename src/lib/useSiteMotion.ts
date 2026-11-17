import Lenis from 'lenis'
import { useEffect } from 'react'

/** All page-level motion in one place:
 *  1. reveal-on-scroll (IntersectionObserver adds `.in`; CSS does the animation),
 *  2. smooth wheel scrolling (Lenis),
 *  3. one throttled scroll handler that writes a few CSS variables
 *     (progress bar, background parallax, hero parallax, timeline line). */
export function useSiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Reveals
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    let io: IntersectionObserver | undefined
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue
            e.target.classList.add('in')
            io?.unobserve(e.target)
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
      )
      els.forEach((el) => io?.observe(el))
    }

    if (reduced) return () => io?.disconnect()

    // 2. Smooth scrolling (touch devices keep native scrolling)
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -88 } })

    // 3. Scroll-linked values
    const progress = document.querySelector<HTMLElement>('.progress')
    const aurora = document.querySelector<HTMLElement>('.aurora')
    const hero = document.querySelector<HTMLElement>('.hero-par')
    const timeline = document.querySelector<HTMLElement>('[data-timeline]')
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress?.style.setProperty('--p', String(max > 0 ? Math.min(1, y / max) : 0))
      aurora?.style.setProperty('--sy', String(y))
      hero?.style.setProperty('--hy', String(Math.min(y, 900) * 0.22))
      if (timeline) {
        const r = timeline.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height))
        timeline.style.setProperty('--p', p.toFixed(3))
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      lenis.destroy()
      io?.disconnect()
    }
  }, [])
}
