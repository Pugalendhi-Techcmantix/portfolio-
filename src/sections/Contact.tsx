import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Confetti } from '../components/Confetti'
import { MagneticButton } from '../components/MagneticButton'
import { profile } from '../data/profile'
import { useReducedMotion } from '../lib/media'

type Status = 'idle' | 'copied' | 'failed'

export function Contact() {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    if (status === 'idle') return
    const t = setTimeout(() => setStatus('idle'), 2600)
    return () => clearTimeout(t)
  }, [status, burst])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setStatus('copied')
      setBurst((b) => b + 1)
    } catch {
      setStatus('failed')
    }
  }

  const message = {
    idle: '',
    copied: 'Email copied to your clipboard.',
    failed: `Couldn’t copy automatically. The address is ${profile.email}`,
  }[status]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col items-center justify-center px-5 py-28 text-center sm:px-8"
    >
      <h2 id="contact-title" className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-black leading-[0.9] tracking-[-0.045em]">
        Let’s make
        <br />
        something fun.
      </h2>
      <p className="mt-6 max-w-[40ch] text-xl">
        Got a project, a weird idea, or just want to say hi? My inbox is always open.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <span className="relative">
          <MagneticButton onClick={copy} className="text-base md:text-lg" aria-label={`Copy email address ${profile.email}`}>
            {status === 'copied' ? <Check size={20} strokeWidth={2.75} aria-hidden /> : <Copy size={18} strokeWidth={2.5} aria-hidden />}
            {status === 'copied' ? 'Copied!' : profile.email}
          </MagneticButton>
          {burst > 0 && !reduced && <Confetti key={burst} seed={burst} />}
        </span>
        <MagneticButton href={`mailto:${profile.email}`} variant="secondary">
          Send an email
        </MagneticButton>
      </div>
      <p role="status" aria-live="polite" className="mt-4 min-h-7 text-base font-semibold">
        {message}
      </p>

      <ul aria-label="Elsewhere" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-4 hover:decoration-bubblegum"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
