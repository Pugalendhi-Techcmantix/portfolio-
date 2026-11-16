import { motion } from 'motion/react'
import { useReducedMotion } from '../lib/media'
import { springs } from '../lib/motion'

type Props = { text: string; delay?: number; className?: string }

/** Letters spring up on load (the page's one orchestrated entrance) and hop when hovered. */
export function SplitText({ text, delay = 0, className }: Props) {
  const reduced = useReducedMotion()
  return (
    <span aria-hidden className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduced ? false : { y: '110%', rotate: 12 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ ...springs.bouncy, delay: delay + i * 0.06 }}
            whileHover={reduced ? undefined : { y: '-12%', rotate: i % 2 ? 6 : -6, transition: springs.bouncy }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
