import { experience } from '../data/experience'
import { Tag } from '../components/Tag'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mb-24 scroll-mt-16 md:mb-32 lg:scroll-mt-24">
      <h2 id="experience-title" className="sticky top-0 z-10 -mx-6 mb-4 bg-night/80 px-6 py-5 text-sm font-semibold text-slate-200 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        Experience
      </h2>
      <ol className="group/list">
        {experience.map((job) => (
          <li key={job.role} className="mb-10 last:mb-0">
            <div className="group relative grid gap-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:ring-1 lg:group-hover:ring-white/5" />
              <p className="z-10 mt-1 text-xs font-medium text-slate-500 sm:col-span-2">{job.period}</p>
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">{job.role}</h3>
                <p className="text-slate-400">{job.place}</p>
                <p className="mt-2 text-sm leading-normal">{job.summary}</p>
                {job.tags.length > 0 && (
                  <ul aria-label="Technologies used" className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
