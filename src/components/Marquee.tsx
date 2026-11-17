import { skillGroups } from '../data/skills'

const items = skillGroups.flatMap((g) => g.items)

/** A slow ribbon of the tech stack between Hero and About. Decorative: the full list is in the Skills section. */
export function Marquee() {
  const row = [...items, ...items]
  return (
    <div aria-hidden className="relative z-10 overflow-x-clip py-6">
      <div className="-rotate-1 border-y-2 border-ink bg-lemon py-3 text-plum">
        <div className="marquee-track flex w-max gap-10 font-display text-lg font-bold md:text-2xl">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="size-3 rounded-full border-2 border-plum bg-bubblegum" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
