import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useCoarsePointer, useReducedMotion } from '../lib/media'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="grab"], input, textarea'

/** A ring that trails the pointer and swells over anything you can press. Fine pointers only. */
export function Cursor() {
  const coarse = useCoarsePointer()
  const reduced = useReducedMotion()
  const enabled = !coarse && !reduced
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-toy-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHover(!!target?.closest?.(INTERACTIVE) || document.body.dataset.toyHover !== undefined)
    }
    const leave = () => setVisible(false)
    const press = () => setDown(true)
    const release = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    return () => {
      document.documentElement.classList.remove('has-toy-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1000]">
      <motion.div
        className="absolute left-0 top-0 rounded-full border-2 border-ink"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          opacity: visible ? 1 : 0,
          scale: down ? 0.8 : 1,
          backgroundColor: hover ? 'rgba(255, 79, 163, 0.35)' : 'rgba(255, 79, 163, 0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}
