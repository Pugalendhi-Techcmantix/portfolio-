import { ListChecks, MessageSquare, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react'
import { Tag } from '../components/Tag'
import { profile } from '../data/profile'
import { projects, type ProjectIcon } from '../data/projects'

const icons: Record<ProjectIcon, LucideIcon> = {
  chat: MessageSquare,
  flow: Workflow,
  tasks: ListChecks,
  auth: ShieldCheck,
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mb-24 scroll-mt-16 md:mb-32 lg:scroll-mt-24">
      <h2 id="projects-title" className="sticky top-0 z-10 -mx-6 mb-4 bg-night/80 px-6 py-5 text-sm font-semibold text-slate-200 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        Projects
      </h2>
      <ul className="group/list">
        {projects.map((p) => {
          const Icon = icons[p.icon]
          return (
            <li key={p.id} className="mb-10">
              <div className="group relative grid gap-4 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:ring-1 lg:group-hover:ring-white/5" />
                <div className="z-10 sm:col-span-2">
                  <div className="grid size-12 place-items-center rounded-xl bg-indigo-400/10 text-indigo-200 ring-1 ring-inset ring-indigo-300/15">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </div>
                </div>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">{p.title}</h3>
                  <p className="text-xs font-medium text-slate-500">{p.status}</p>
                  <p className="mt-2 text-sm leading-normal">{p.summary}</p>
                  <ul className="mt-2 grid gap-1 text-sm leading-normal">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-slate-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul aria-label="Technologies used" className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center font-medium text-slate-200 hover:text-indigo-200 focus-visible:text-indigo-200"
      >
        <span className="border-b border-transparent pb-px transition group-hover:border-indigo-200">See more on GitHub</span>
        <span aria-hidden className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1">
          ↗
        </span>
      </a>
    </section>
  )
}
