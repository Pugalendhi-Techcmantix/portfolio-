import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/profile'
import { useTheme } from '../lib/theme'
import { SECTION_IDS, useActiveSection } from '../lib/useActiveSection'

const labels: Record<(typeof SECTION_IDS)[number], string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  education: 'Education',
  contact: 'Contact',
}
const mobile = new Set(['about', 'projects', 'contact'])

/** Floating glass navigation pill. The active section is highlighted. */
export function Nav() {
  const active = useActiveSection()
  const { theme, toggle } = useTheme()

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Main" className="glass flex items-center gap-1 p-1.5" style={{ ['--r' as string]: '9999px' }}>
        <a
          href="#top"
          aria-label={`PS: ${profile.name}, back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-iris to-rose text-sm font-bold text-[#ffffff] shadow-[0_0_22px_rgb(129_140_248/0.55)] transition-transform duration-300 hover:scale-105"
        >
          PS
        </a>
        <ul className="flex items-center">
          {SECTION_IDS.map((id) => (
            <li key={id} className={clsx(!mobile.has(id) && 'hidden md:block')}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                className="relative flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium text-slate-300 transition-colors hover:text-white aria-[current=location]:bg-white/12 aria-[current=location]:text-white aria-[current=location]:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_0_20px_rgb(34_211_238/0.25)]"
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="group relative ml-1 grid size-11 shrink-0 place-items-center overflow-hidden rounded-full text-slate-200 transition-colors hover:bg-white/10"
        >
          <Sun
            aria-hidden
            className={clsx('absolute size-5 transition-all duration-500 ease-out', theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0')}
            strokeWidth={1.9}
          />
          <Moon
            aria-hidden
            className={clsx('absolute size-5 transition-all duration-500 ease-out', theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0')}
            strokeWidth={1.9}
          />
        </button>
      </nav>
    </header>
  )
}
