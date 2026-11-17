import { useEffect, useState } from 'react'

export const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

/** Returns the section crossing the middle of the viewport, or null while the hero is in view. */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const ids = ['top', ...SECTION_IDS]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? null : (e.target.id as SectionId))
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}
