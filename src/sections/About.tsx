import { Glass } from '../components/Glass'
import { SectionTitle } from '../components/SectionTitle'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

const tools = skillGroups.reduce((sum, g) => sum + g.items.length, 0)

const stats = [
  { value: 2, suffix: '+', label: 'years as a web developer' },
  { value: projects.length, suffix: '', label: 'featured projects' },
  { value: tools, suffix: '', label: 'tools and technologies' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="about-title">About me</SectionTitle>
        <div className="reveal">
          <Glass className="p-7 sm:p-10" style={{ ['--r' as string]: '32px' }}>
            <div className="grid items-start gap-8 md:grid-cols-[15rem_1fr] md:gap-12">
              {/* Photo in a glowing gradient frame */}
              <div className="mx-auto w-52 md:mx-0 md:w-full">
                <div className="rounded-[28px] bg-gradient-to-br from-aqua via-iris to-rose p-[3px] shadow-[0_0_50px_rgb(129_140_248/0.45)]">
                  <img
                    src="/profile.jpg"
                    alt={`Portrait of ${profile.name}`}
                    width={240}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-[25px] object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 text-lg">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="glass-lite rounded-2xl p-5">
                  <dd className="text-5xl font-extrabold tracking-tight text-white">
                    <span className="sr-only">
                      {s.value}
                      {s.suffix}
                    </span>
                    <span aria-hidden>
                      <span className="count" style={{ ['--num' as string]: s.value }} />
                      {s.suffix}
                    </span>
                  </dd>
                  <dt className="mt-1 text-sm">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Glass>
        </div>
      </div>
    </section>
  )
}
