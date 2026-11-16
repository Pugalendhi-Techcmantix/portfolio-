import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './media'

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ autoRaf: false, lerp: 0.1, anchors: true })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Null when smooth scrolling is off (reduced motion). */
export const useLenis = () => useContext(LenisContext)
