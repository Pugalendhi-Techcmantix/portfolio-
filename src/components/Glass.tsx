import clsx from 'clsx'
import { useRef, type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from 'react'

type Props = {
  as?: ElementType
  tilt?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** A frosted glass panel. With `tilt` it leans toward the cursor; a spotlight follows the cursor either way.
 *  Pointer position is written straight to CSS variables (no React state), and only on the hovered card. */
export function Glass({ as: Tag = 'div', tilt = false, className, style, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(0)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (clientX - r.left) / r.width
      const y = (clientY - r.top) / r.height
      el.style.setProperty('--sx', `${clientX - r.left}px`)
      el.style.setProperty('--sy', `${clientY - r.top}px`)
      if (tilt) {
        el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`)
        el.style.setProperty('--rx', `${-(y - 0.5) * 7}deg`)
      }
    })
  }
  const onLeave = () => {
    cancelAnimationFrame(frame.current)
    const el = ref.current
    if (!el || !tilt) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={style} className={clsx('glass spot', tilt && 'tilt', className)}>
      {children}
    </Tag>
  )
}
