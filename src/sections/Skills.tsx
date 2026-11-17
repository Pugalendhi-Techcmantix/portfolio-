import { Glass } from '../components/Glass'
import { Marquee } from '../components/Marquee'
import { SectionTitle } from '../components/SectionTitle'
import { Tag } from '../components/Tag'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <SectionTitle id="skills-title" intro="The tools I use day to day, grouped by what they do.">
          Skills
        </SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div key={g.name} className="reveal" style={{ ['--i' as string]: i % 2 }}>
              <Glass tilt className="h-full p-6">
                <h3 className="text-lg font-bold text-white">{g.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </ul>
              </Glass>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <Marquee />
      </div>
    </section>
  )
}
