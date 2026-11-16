import type { Transition } from 'motion/react'

export const springs = {
  bouncy: { type: 'spring', stiffness: 400, damping: 15 },
  snappy: { type: 'spring', stiffness: 500, damping: 30 },
  gentle: { type: 'spring', stiffness: 120, damping: 20 },
} satisfies Record<string, Transition>

export const durations = { fast: 0.2, base: 0.4, slow: 0.8 }
