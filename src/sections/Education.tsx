import { Award, GraduationCap, Languages } from 'lucide-react'
import { Glass } from '../components/Glass'
import { SectionTitle } from '../components/SectionTitle'
import { Tag } from '../components/Tag'
import { certifications, education, languages } from '../data/education'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="education-title">Education and certifications</SectionTitle>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="reveal lg:col-span-3">
            <Glass tilt className="h-full p-6 sm:p-8">
              <h3 className="flex items-center gap-2.5 text-lg font-bold text-white">
                <GraduationCap className="size-5 text-aqua" strokeWidth={1.75} aria-hidden /> Education
              </h3>
              <ol className="mt-6 grid gap-5">
                {education.map((e) => (
                  <li key={e.title} className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[8rem_1fr_auto]">
                    <p className="text-sm font-medium text-slate-400">{e.period}</p>
                    <div>
                      <p className="font-semibold text-white">{e.title}</p>
                      <p className="text-sm">{e.place}</p>
                    </div>
                    <p className="text-sm font-semibold text-aqua">{e.score}</p>
                  </li>
                ))}
              </ol>
            </Glass>
          </div>

          <div className="grid gap-6 lg:col-span-2">
            <div className="reveal" style={{ ['--i' as string]: 1 }}>
              <Glass tilt className="h-full p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-white">
                  <Award className="size-5 text-rose" strokeWidth={1.75} aria-hidden /> Certifications
                </h3>
                <ul className="mt-5 grid gap-4">
                  {certifications.map((c) => (
                    <li key={c.title}>
                      <p className="font-semibold leading-snug text-white">{c.title}</p>
                      <p className="text-sm">{c.issuer}</p>
                    </li>
                  ))}
                </ul>
              </Glass>
            </div>
            <div className="reveal" style={{ ['--i' as string]: 2 }}>
              <Glass tilt className="p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-white">
                  <Languages className="size-5 text-mint" strokeWidth={1.75} aria-hidden /> Languages
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <Tag key={l}>{l}</Tag>
                  ))}
                </ul>
              </Glass>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
