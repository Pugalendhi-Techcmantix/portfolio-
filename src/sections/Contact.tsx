import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'
import { Glass } from '../components/Glass'
import { Magnetic } from '../components/Magnetic'
import { profile } from '../data/profile'

type Status = 'idle' | 'copied' | 'failed'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const t = setTimeout(() => setStatus('idle'), 2500)
    return () => clearTimeout(t)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  const message = {
    idle: '',
    copied: 'Email address copied.',
    failed: `Couldn’t copy automatically. The address is ${profile.email}`,
  }[status]

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="reveal mx-auto max-w-5xl">
        <Glass className="overflow-hidden p-8 text-center sm:p-14" style={{ ['--r' as string]: '40px' }}>
          <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 size-136 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(129_140_248/0.35),transparent_65%)]" />
          <h2 id="contact-title" className="gradient-text relative text-[clamp(2.4rem,6.5vw,4.75rem)] font-extrabold leading-none tracking-[-0.04em]">
            Let’s build something together.
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-lg">
            I’m open to new projects and roles. The quickest way to reach me is by email or phone.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic href={`mailto:${profile.email}`}>Email me</Magnetic>
            <Magnetic variant="glass" onClick={copy} aria-label={`Copy email address ${profile.email}`}>
              {status === 'copied' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {profile.email}
            </Magnetic>
          </div>
          <p role="status" aria-live="polite" className="relative mt-3 min-h-6 text-sm text-slate-200">
            {message}
          </p>

          <ul aria-label="Other ways to reach me" className="relative mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <li>
              <a href={profile.phoneHref} className="inline-flex min-h-11 items-center font-semibold text-slate-100 hover:text-aqua">
                {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-slate-100 hover:text-aqua">
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-slate-100 hover:text-aqua">
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </Glass>
      </div>
    </section>
  )
}
