import clsx from 'clsx'
import { motion } from 'motion/react'
import { profile } from '../data/profile'
import { springs } from '../lib/motion'
import { useActiveSection, type SectionId } from '../lib/scroll-store'

const links: { id: SectionId; label: string; mobile: boolean }[] = [
  { id: 'about', label: 'About', mobile: true },
  { id: 'projects', label: 'Work', mobile: true },
  { id: 'skills', label: 'Skills', mobile: false },
  { id: 'experience', label: 'Experience', mobile: false },
  { id: 'contact', label: 'Contact', mobile: true },
]

export function Nav() {
  const active = useActiveSection()

  return (
    <header className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 flex justify-center px-4">
      <nav aria-label="Main" className="glass flex items-center gap-1 rounded-full p-1.5">
        <a
          href="#hero"
          aria-label={`${profile.firstName} ${profile.lastName}, back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-bubblegum to-violet font-display text-xs font-bold text-white shadow-[0_0_18px_rgb(255_79_163/0.55)] transition-transform duration-300 hover:scale-105"
        >
          {profile.firstName[0]}
          {profile.lastName[0]}
        </a>
        <ul className="flex items-center">
          {links.map((l) => (
            <li key={l.id} className={clsx(!l.mobile && 'hidden md:block')}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'location' : undefined}
                className="relative flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-white/75 transition-colors hover:text-white aria-[current=location]:text-white sm:px-4"
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={springs.snappy}
                    className="absolute inset-0 rounded-full border border-white/30 bg-white/15 shadow-[0_0_20px_rgb(31_182_255/0.45),inset_0_1px_0_rgb(255_255_255/0.4)]"
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
