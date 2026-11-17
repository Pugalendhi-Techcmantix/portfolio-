import { useEffect } from 'react'

/** Soft light that follows the mouse. Only two CSS variables change per frame. Skipped on touch and reduced motion. */
export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    let frame = 0
    let x = 0
    let y = 0
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
        frame = 0
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div aria-hidden className="cursor-glow" />
}
