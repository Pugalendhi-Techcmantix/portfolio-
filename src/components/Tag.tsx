export function Tag({ children }: { children: string }) {
  return (
    <li className="glass-lite rounded-full px-3.5 py-1 text-xs font-medium leading-5 text-slate-200 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/15">
      {children}
    </li>
  )
}
