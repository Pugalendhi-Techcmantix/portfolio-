export function Tag({ children }: { children: string }) {
  return (
    <li className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-medium leading-5 text-indigo-200">
      {children}
    </li>
  )
}
