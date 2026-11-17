import { Glass } from '../components/Glass'
import { SectionTitle } from '../components/SectionTitle'
import { Tag } from '../components/Tag'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle id="experience-title">Experience and education</SectionTitle>
        <div className="relative">
          <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-white/10" />
          <div aria-hidden className="tl-line absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-gradient-to-b from-aqua via-iris to-rose shadow-[0_0_14px_rgb(129_140_248/0.8)]" />
          <ol className="space-y-8 pl-12">
            {experience.map((job, i) => (
              <li key={job.role} className="reveal relative" style={{ ['--i' as string]: i }}>
                <span aria-hidden className="absolute -left-12 top-7 size-6 rounded-full border-2 border-white/70 bg-gradient-to-br from-iris to-rose shadow-[0_0_20px_rgb(129_140_248/0.8)]" />
                <Glass tilt className="p-6 sm:p-7">
                  <p className="text-sm font-semibold text-aqua">{job.period}</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">{job.role}</h3>
                  <p className="text-slate-300">{job.place}</p>
                  <p className="mt-3">{job.summary}</p>
                  {job.tags.length > 0 && (
                    <ul aria-label="Technologies used" className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </ul>
                  )}
                </Glass>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
