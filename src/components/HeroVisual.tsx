import { useEffect, useRef } from 'react'
import { Glass } from './Glass'

/** A collage of floating glass panels (code, chat, workflow) that drift on their own and shift with the cursor.
 *  Purely decorative. Parallax is one pointer listener writing two CSS variables. */
export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const section = el?.closest('section')
    if (!el || !section) return
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let nx = 0
    let ny = 0
    const onMove = (e: PointerEvent) => {
      nx = (e.clientX / window.innerWidth) * 2 - 1
      ny = (e.clientY / window.innerHeight) * 2 - 1
      if (frame) return
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--px', nx.toFixed(3))
        el.style.setProperty('--py', ny.toFixed(3))
        frame = 0
      })
    }
    section.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      section.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={root} aria-hidden className="relative hidden h-[34rem] w-full max-w-[34rem] lg:block">
      {/* Glow behind the panels so the glass has something to frost */}
      <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(99_102_241/0.5),transparent_65%)]" />

      <div className="hv absolute left-0 top-6 w-[19rem]" style={{ ['--k' as string]: 14 }}>
        <div className="float" style={{ ['--ft' as string]: '7s' }}>
          <Glass tilt className="p-4 text-[13px] leading-6">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose/80" />
              <span className="size-2.5 rounded-full bg-amber-300/80" />
              <span className="size-2.5 rounded-full bg-mint/80" />
              <span className="ml-2 text-xs text-slate-400">rag.ts</span>
            </div>
            <pre className="overflow-hidden font-mono text-slate-300">
              <span className="text-iris">const</span> answer = <span className="text-iris">await</span> rag.<span className="text-aqua">ask</span>({'\n'}
              {'  '}<span className="text-emerald-300">"Summarise the report"</span>,{'\n'}
              {'  '}{'{ '}source: <span className="text-emerald-300">"drive"</span>,{'\n'}
              {'    '}model: <span className="text-emerald-300">"ollama"</span> {'}'}{'\n'}
              <span className="caret" />
            </pre>
          </Glass>
        </div>
      </div>

      <div className="hv absolute right-0 top-40 w-[17.5rem]" style={{ ['--k' as string]: 26 }}>
        <div className="float" style={{ ['--ft' as string]: '8.5s', ['--fd' as string]: '-2s' }}>
          <Glass tilt className="space-y-3 p-4 text-sm">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2 text-slate-200">What does the report say about Q3?</div>
            <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-gradient-to-br from-iris/70 to-rose/60 px-3.5 py-2 text-white">Revenue grew steadily. Here is a summary from the Drive file.</div>
            <div className="dots flex w-fit gap-1 rounded-full bg-white/10 px-3 py-2">
              <span style={{ ['--i' as string]: 0 }} className="size-1.5 rounded-full bg-slate-300" />
              <span style={{ ['--i' as string]: 1 }} className="size-1.5 rounded-full bg-slate-300" />
              <span style={{ ['--i' as string]: 2 }} className="size-1.5 rounded-full bg-slate-300" />
            </div>
          </Glass>
        </div>
      </div>

      <div className="hv absolute bottom-2 left-8 w-[18rem]" style={{ ['--k' as string]: 20 }}>
        <div className="float" style={{ ['--ft' as string]: '9s', ['--fd' as string]: '-4s' }}>
          <Glass tilt className="p-4">
            <svg viewBox="0 0 260 70" className="w-full" fill="none">
              <path d="M44 35 H100 M160 35 H216" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
              <rect x="6" y="16" width="38" height="38" rx="11" fill="rgb(255 255 255 / 0.12)" stroke="rgb(255 255 255 / 0.35)" />
              <rect x="100" y="12" width="60" height="46" rx="13" fill="url(#g)" stroke="rgb(255 255 255 / 0.4)" />
              <rect x="216" y="16" width="38" height="38" rx="11" fill="rgb(255 255 255 / 0.12)" stroke="rgb(255 255 255 / 0.35)" />
              <circle cx="25" cy="35" r="5" fill="#34d399" />
              <circle cx="235" cy="35" r="5" fill="#f472b6" />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
            <p className="mt-2 text-xs text-slate-400">Workflow running</p>
          </Glass>
        </div>
      </div>

      {[
        ['React', 'right-6 top-2', 5, 18],
        ['Node.js', 'right-2 bottom-24', 6.5, 30],
        ['n8n', 'left-2 top-[15.5rem]', 5.5, 34],
      ].map(([label, pos, ft, k]) => (
        <div key={label} className={`hv absolute ${pos}`} style={{ ['--k' as string]: k }}>
          <div className="float" style={{ ['--ft' as string]: `${ft}s` }}>
            <span className="glass-lite block rounded-full px-4 py-1.5 text-sm font-semibold text-white">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
