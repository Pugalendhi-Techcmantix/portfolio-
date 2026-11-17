import { CursorGlow } from './CursorGlow'

// k = how far (px per px of scroll) each colour field slides, so the background has depth as you scroll.
const blobs = [
  { c: '#6366f1', pos: 'left-[-22vmax] top-[-22vmax]', t: '42s', k: -0.08 },
  { c: '#06b6d4', pos: 'right-[-26vmax] top-[8vmax]', t: '50s', k: -0.14 },
  { c: '#ec4899', pos: 'left-[4vmax] top-[70vh]', t: '46s', k: -0.2 },
  { c: '#10b981', pos: 'right-[-10vmax] top-[130vh]', t: '56s', k: -0.28 },
]

/** The page background: four colour fields drifting slowly and sliding with scroll, plus film grain and a progress bar. */
export function Backdrop() {
  return (
    <>
      <div aria-hidden className="aurora">
        {blobs.map((b) => (
          <div key={b.c} className={`aurora-wrap ${b.pos}`} style={{ ['--k' as string]: b.k }}>
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
