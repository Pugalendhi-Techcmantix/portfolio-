import { Tag } from '../components/Tag'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mb-24 scroll-mt-16 md:mb-32 lg:scroll-mt-24">
      <h2 id="skills-title" className="sticky top-0 z-10 -mx-6 mb-6 bg-night/80 px-6 py-5 text-sm font-semibold text-slate-200 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        Skills
      </h2>
      <div className="grid gap-6">
        {skillGroups.map((g) => (
          <div key={g.name}>
            <h3 className="mb-2.5 text-sm font-medium text-slate-200">{g.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
