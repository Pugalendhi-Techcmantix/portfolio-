import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    <section id="contact" aria-labelledby="contact-title" className="mb-16 scroll-mt-16 lg:scroll-mt-24">
      <h2 id="contact-title" className="sticky top-0 z-10 -mx-6 mb-6 bg-night/80 px-6 py-5 text-sm font-semibold text-slate-200 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        Contact
      </h2>
      <p className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">Let’s work together.</p>
      <p className="mt-3 max-w-md">
        I’m open to new projects and roles. The quickest way to reach me is by email or phone.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center rounded-full bg-indigo-300 px-5 text-sm font-semibold text-slate-900 transition-colors hover:bg-indigo-200"
        >
          Email me
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy email address ${profile.email}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-700 px-5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-white/5"
        >
          {status === 'copied' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          {profile.email}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-slate-300">
        {message}
      </p>

      <dl className="mt-4 grid gap-1 text-sm">
        <div className="flex gap-2">
          <dt className="text-slate-500">Phone</dt>
          <dd>
            <a href={profile.phoneHref} className="text-slate-200 hover:text-indigo-200">
              {profile.phone}
            </a>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-slate-500">Location</dt>
          <dd className="text-slate-200">{profile.location}</dd>
        </div>
      </dl>
    </section>
  )
}
