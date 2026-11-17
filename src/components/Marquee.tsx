import { skillGroups } from '../data/skills'

const all = skillGroups.flatMap((g) => g.items)
const rowA = all.filter((_, i) => i % 2 === 0)
const rowB = all.filter((_, i) => i % 2 === 1)

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrap overflow-hidden py-1.5">
      <div className={`marquee ${reverse ? 'reverse' : ''} gap-4 pr-4`} style={{ ['--mt' as string]: reverse ? '55s' : '48s' }}>
        {doubled.map((t, i) => (
          <span key={i} className="glass-lite whitespace-nowrap rounded-full px-5 py-2 text-base font-semibold text-slate-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Two opposite-moving rows of the tech stack (transform only). Decorative: the full list is in Skills. */
export function Marquee() {
  return (
    <div
      aria-hidden
      className="relative py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </div>
  )
}
