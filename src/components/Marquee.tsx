import { skillGroups } from '../data/skills'

const items = skillGroups.flatMap((g) => g.items)
const dots = ['bg-bubblegum', 'bg-pool', 'bg-grass', 'bg-lemon', 'bg-violet']

/** A slow glass ribbon of the tech stack between Hero and About. Decorative: the full list is in the Skills section. */
export function Marquee() {
  const row = [...items, ...items]
  return (
    <div aria-hidden className="relative z-10 overflow-x-clip py-8">
      <div className="glass -rotate-1 rounded-none border-x-0 py-3.5 text-white">
        <div className="marquee-track flex w-max gap-10 font-display text-lg font-bold md:text-2xl">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className={`size-2.5 rounded-full ${dots[i % dots.length]} shadow-[0_0_12px_currentColor]`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
