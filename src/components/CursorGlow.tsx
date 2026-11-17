import { useEffect } from 'react'

/** Soft light behind the page that follows the cursor. Skipped on touch screens and for reduced motion. */
export function CursorGlow() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

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
