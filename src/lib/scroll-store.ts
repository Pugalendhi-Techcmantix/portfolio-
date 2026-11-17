import { useEffect, useSyncExternalStore } from 'react'

export const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

type State = { section: SectionId; pointer: { x: number; y: number; active: boolean } }

/** Mutable store read every frame by the 3D scene (no React re-renders). */
const state: State = { section: 'hero', pointer: { x: 0, y: 0, active: false } }
const listeners = new Set<() => void>()

export const scrollStore = {
  get: () => state,
  setSection(id: SectionId) {
    if (state.section === id) return
    state.section = id
    listeners.forEach((l) => l())
  },
  /** x, y normalised to -1..1 */
  setPointer(x: number, y: number) {
    state.pointer.x = x
    state.pointer.y = y
    state.pointer.active = true
  },
  subscribe(fn: () => void) {
    listeners.add(fn)
    return () => {
      listeners.delete(fn)
    }
  },
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(scrollStore.subscribe, () => state.section, () => 'hero')
}

/** Observes section[id] elements and publishes the one crossing the viewport centre. */
export function useTrackSections() {
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) scrollStore.setSection(e.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))

    const onMove = (e: PointerEvent) =>
      scrollStore.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1))
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}
