import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'
import { HeroVisual } from '../components/HeroVisual'
import { Magnetic } from '../components/Magnetic'
import { profile } from '../data/profile'

const social = 'glass-lite grid size-11 place-items-center rounded-full text-slate-200 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/15'

export function Hero() {
  let n = 0
  return (
    <section id="top" className="relative flex min-h-svh items-center px-6 pb-16 pt-28 md:px-12 lg:px-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="glass-lite rise inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-slate-200" style={{ ['--i' as string]: 0 }}>
            <span className="relative flex size-2.5" aria-hidden>
              <span className="ping absolute inline-flex size-full rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-mint" />
            </span>
            {profile.company}, {profile.location.split(',')[0]}
          </p>

          <h1
            aria-label={profile.name}
            className="mt-6 whitespace-nowrap text-[clamp(2.3rem,5.4vw,4.9rem)] font-extrabold leading-[1] tracking-[-0.045em] text-white [text-shadow:0_0_60px_rgb(129_140_248/0.5)]"
          >
            {profile.name.split(' ').map((word) => (
              <span key={word} aria-hidden className="mr-[0.22em] inline-block whitespace-nowrap">
                {Array.from(word).map((ch) => (
                  <span key={n} className="letter" style={{ ['--i' as string]: n++ }}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="rise mt-5 text-2xl font-semibold text-slate-100 sm:text-3xl" style={{ ['--i' as string]: 5 }}>
            <span className="sr-only">I build {profile.words.join(', ')}</span>
            <span aria-hidden>
              I build{' '}
              <span className="words !grid sm:!inline-grid">
                {profile.words.map((w, i) => (
                  <span key={w} className="gradient-text" style={{ ['--i' as string]: i }}>
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </p>

          <p className="rise mt-5 max-w-xl text-lg" style={{ ['--i' as string]: 6 }}>
            {profile.tagline}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ['--i' as string]: 7 }}>
            <Magnetic href="#projects">See my work</Magnetic>
            <Magnetic href="#contact" variant="glass">
              Contact me
            </Magnetic>
          </div>

          <ul aria-label="Links" className="rise mt-8 flex items-center gap-2.5" style={{ ['--i' as string]: 8 }}>
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
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
