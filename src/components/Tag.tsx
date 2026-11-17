import { TechIcon } from './TechIcon'

/** A chip with the technology's logo (when there is one) and its name. */
export function Tag({ children }: { children: string }) {
  return (
    <li className="chip glass-lite inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium leading-5 text-slate-200 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/15">
      <TechIcon name={children} />
      {children}
    </li>
  )
}
