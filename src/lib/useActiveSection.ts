import { useEffect, useState } from 'react'

export const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

/** Returns the section that is currently crossing the middle of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}
