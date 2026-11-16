import clsx from 'clsx'
import { motion } from 'motion/react'
import { profile } from '../data/profile'
import { springs } from '../lib/motion'
import { useActiveSection, type SectionId } from '../lib/scroll-store'
import { ThemeToggle } from './ThemeToggle'

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
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full border-2 border-ink bg-paper/85 p-1.5 shadow-toy backdrop-blur-md"
      >
        <a
          href="#hero"
          aria-label={`${profile.firstName} ${profile.lastName}, back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-bubblegum font-display text-xs font-bold text-plum"
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
                className="relative flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition-colors hover:bg-ink/10 sm:px-4"
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={springs.snappy}
                    className="absolute inset-0 rounded-full border-2 border-ink bg-pool"
                  />
                )}
                <span className={clsx('relative', active === l.id && 'text-plum')}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
