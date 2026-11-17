import { Glass } from '../components/Glass'
import { ProjectVisual } from '../components/ProjectVisual'
import { SectionTitle } from '../components/SectionTitle'
import { Tag } from '../components/Tag'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="projects-title" intro="Work projects and personal builds. Move your cursor over a card.">
          Selected projects
        </SectionTitle>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} className="reveal" style={{ ['--i' as string]: i % 3 }}>
              <Glass tilt className="flex h-full flex-col p-5 sm:p-6">
                <ProjectVisual kind={p.icon} />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{p.title}</h3>
                  <span className="shrink-0 text-xs font-medium text-aqua">{p.status}</span>
                </div>
                <p className="mt-2">{p.summary}</p>
                <ul className="mt-3 grid gap-1.5 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-iris shadow-[0_0_8px_rgb(129_140_248)]" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul aria-label="Technologies used" className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </Glass>
            </li>
          ))}
        </ul>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="reveal group mt-10 inline-flex items-center font-semibold text-slate-100 hover:text-aqua"
        >
          <span className="border-b border-transparent pb-px transition group-hover:border-aqua">See more on GitHub</span>
          <span aria-hidden className="ml-1.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>
    </section>
  )
}
