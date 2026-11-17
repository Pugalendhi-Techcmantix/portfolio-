import { Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { SECTION_IDS, useActiveSection } from '../lib/useActiveSection'
import { GitHubIcon, LinkedInIcon } from './Icons'

const labels: Record<(typeof SECTION_IDS)[number], string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  contact: 'Contact',
}

const social =
  'grid size-10 place-items-center rounded-full text-slate-400 transition-colors hover:text-slate-100 hover:bg-white/5'

/** Left column on desktop (stays in view while the content scrolls); a simple intro on mobile. */
export function Header() {
  const active = useActiveSection()

  return (
    <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          <a href="#about">{profile.name}</a>
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-200 sm:text-xl">{profile.role}</p>
        <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>
        <p className="mt-4 flex items-center gap-2 text-sm">
          <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
          {profile.company}, {profile.location.split(',')[0]}
        </p>

        <nav aria-label="Sections" className="mt-16 hidden lg:block">
          <ul className="grid gap-4">
            {SECTION_IDS.map((id) => {
              const on = active === id
              return (
                <li key={id}>
                  <a href={`#${id}`} aria-current={on ? 'location' : undefined} className="group flex items-center py-1">
                    <span
                      aria-hidden
                      className={`mr-4 h-px bg-slate-500 transition-all duration-200 group-hover:w-16 group-hover:bg-slate-200 ${
                        on ? 'w-16 bg-slate-200' : 'w-8'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors group-hover:text-slate-200 ${
                        on ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {labels[id]}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ul aria-label="Contact links" className="mt-8 flex items-center gap-1 lg:mt-0">
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)" className={social}>
            <GitHubIcon className="size-5" />
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)" className={social}>
            <LinkedInIcon className="size-5" />
          </a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className={social}>
            <Mail className="size-5" strokeWidth={1.75} aria-hidden />
          </a>
        </li>
        <li>
          <a href={profile.phoneHref} aria-label={`Call ${profile.phone}`} className={social}>
            <Phone className="size-5" strokeWidth={1.75} aria-hidden />
          </a>
        </li>
      </ul>
    </header>
  )
}
