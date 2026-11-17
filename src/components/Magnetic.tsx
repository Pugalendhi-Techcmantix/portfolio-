import clsx from 'clsx'
import { useRef, type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'glass'
  external?: boolean
  className?: string
  'aria-label'?: string
}

const styles = {
  primary:
    'bg-gradient-to-br from-iris via-indigo-400 to-rose text-[#ffffff] shadow-[0_8px_30px_rgb(129_140_248/0.45),inset_0_1px_0_rgb(255_255_255/0.4)] hover:shadow-[0_10px_44px_rgb(244_114_182/0.5),inset_0_1px_0_rgb(255_255_255/0.4)]',
  glass: 'glass-lite text-slate-100 hover:bg-white/10',
}

/** A button that leans toward the cursor (desktop mouse only). */
export function Magnetic({ children, href, onClick, variant = 'primary', external, className, ...aria }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.22}px, ${(e.clientY - (r.top + r.height / 2)) * 0.3}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const cls = clsx(
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-300 ease-out active:scale-95',
    styles[variant],
    className,
  )

  return href ? (
    <a ref={ref} href={href} onPointerMove={onMove} onPointerLeave={onLeave} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...aria}>
      {children}
    </a>
  ) : (
    <button ref={ref} type="button" onClick={onClick} onPointerMove={onMove} onPointerLeave={onLeave} className={cls} {...aria}>
      {children}
    </button>
  )
}
