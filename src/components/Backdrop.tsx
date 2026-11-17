import { CursorGlow } from './CursorGlow'

const blobs = [
  { c: '#6366f1', pos: 'left-[-22vmax] top-[-22vmax]', t: '42s', shift: '-30vh' },
  { c: '#06b6d4', pos: 'right-[-26vmax] top-[8vmax]', t: '50s', shift: '-55vh' },
  { c: '#ec4899', pos: 'left-[4vmax] top-[70vh]', t: '46s', shift: '-70vh' },
  { c: '#10b981', pos: 'right-[-10vmax] top-[130vh]', t: '56s', shift: '-90vh' },
]

/** The page background: four colour fields drifting slowly (and sliding with scroll), plus film grain. */
export function Backdrop() {
  return (
    <>
      <div aria-hidden className="aurora">
        {blobs.map((b) => (
          <div key={b.c} className={`aurora-wrap ${b.pos}`} style={{ ['--shift' as string]: b.shift }}>
            <div className="aurora-blob" style={{ ['--c' as string]: b.c, ['--t' as string]: b.t }} />
          </div>
        ))}
      </div>
      <div aria-hidden className="grain" />
      <CursorGlow />
      <div aria-hidden className="progress" />
    </>
  )
}
