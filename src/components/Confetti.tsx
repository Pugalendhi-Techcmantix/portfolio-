import { motion } from 'motion/react'
import { useMemo } from 'react'

const colors = ['#ff4fa3', '#ffe04a', '#1fb6ff', '#34d07f']

/** Deterministic 0..1 noise so renders stay pure; `seed` varies each burst. */
const noise = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

/** A one-shot burst. Remount (change `key`) to fire again. */
export function Confetti({ count = 28, seed = 1 }: { count?: number; seed?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (k: number) => noise(seed * 97 + i * 13 + k)
        const angle = (i / count) * Math.PI * 2 + r(1) * 0.4
        const dist = 90 + r(2) * 110
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          rotate: r(3) * 540 - 270,
          color: colors[i % colors.length],
          round: i % 3 === 0,
        }
      }),
    [count, seed],
  )

  return (
    <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-2.5 border border-plum"
          style={{ backgroundColor: p.color, borderRadius: p.round ? '999px' : '2px' }}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 80], scale: [0, 1.2, 1], rotate: p.rotate, opacity: [1, 1, 0] }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.4, 1] }}
        />
      ))}
    </span>
  )
}
