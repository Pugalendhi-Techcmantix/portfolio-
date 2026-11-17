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
          <Glass className="grid gap-10 p-7 sm:p-10 lg:grid-cols-5" style={{ ['--r' as string]: '32px' }}>
            <div className="space-y-4 text-lg lg:col-span-3">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="grid gap-4 lg:col-span-2">
              {stats.map((s) => (
                <div key={s.label} className="glass-lite rounded-2xl p-5">
                  <dd className="text-5xl font-extrabold tracking-tight text-white">
                    <span className="count" style={{ ['--num' as string]: s.value }} aria-label={String(s.value)} />
                    {s.suffix}
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
