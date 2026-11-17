import clsx from 'clsx'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useCoarsePointer, useReducedMotion } from '../lib/media'
import { springs } from '../lib/motion'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
  'aria-label'?: string
}

const variants = {
  primary:
    'border border-white/30 bg-gradient-to-br from-bubblegum to-violet text-white shadow-[0_0_28px_rgb(255_79_163/0.45),inset_0_1px_0_rgb(255_255_255/0.45)] hover:shadow-[0_0_44px_rgb(255_79_163/0.7),inset_0_1px_0_rgb(255_255_255/0.45)]',
  secondary: 'glass text-white',
}

/** A chunky toy button that leans toward the pointer and squishes on press. */
export function MagneticButton({ children, variant = 'primary', href, onClick, className, external, ...aria }: Props) {
  const coarse = useCoarsePointer()
  const reduced = useReducedMotion()
  const magnetic = !coarse && !reduced
  const x = useSpring(useMotionValue(0), springs.bouncy)
  const y = useSpring(useMotionValue(0), springs.bouncy)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    style: { x, y },
    onPointerMove: onMove,
    onPointerLeave: reset,
    whileTap: reduced ? undefined : { scale: 0.92 },
    transition: springs.bouncy,
    className: clsx(
      'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3',
      'font-display text-sm font-semibold transition-shadow duration-300',
      variants[variant],
      className,
    ),
    ...aria,
  }

  if (href) {
    return (
      <motion.a href={href} {...shared} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  )
}
