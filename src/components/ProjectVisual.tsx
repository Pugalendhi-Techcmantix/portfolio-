import type { ProjectIcon } from '../data/projects'

/** Small illustrated UI for each project card, made from plain divs and SVG. */
export function ProjectVisual({ kind }: { kind: ProjectIcon }) {
  return (
    <div aria-hidden className="relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent p-4">
      {kind === 'chat' && (
        <div className="space-y-2.5 text-xs">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-white/12 px-3 py-1.5 text-slate-200">Find the refund policy</div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-gradient-to-br from-iris/80 to-rose/70 px-3 py-1.5 text-white">Found it in policy.pdf, page 4.</div>
          <div className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-aqua">Source: Drive</div>
        </div>
      )}
      {kind === 'flow' && (
        <svg viewBox="0 0 300 120" className="size-full" fill="none">
          <path d="M70 60 H122 M178 60 H230 M150 36 V14 M150 84 V106" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
          <rect x="22" y="38" width="48" height="44" rx="13" fill="rgb(255 255 255 / 0.1)" stroke="rgb(255 255 255 / 0.3)" />
          <rect x="122" y="32" width="56" height="56" rx="16" fill="url(#pf)" stroke="rgb(255 255 255 / 0.4)" />
          <rect x="230" y="38" width="48" height="44" rx="13" fill="rgb(255 255 255 / 0.1)" stroke="rgb(255 255 255 / 0.3)" />
          <circle cx="150" cy="10" r="7" fill="#34d399" />
          <circle cx="150" cy="110" r="7" fill="#fbbf24" />
          <defs>
            <linearGradient id="pf" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {kind === 'tasks' && (
        <ul className="space-y-2.5 text-xs">
          {[
            ['Design the layout', true],
            ['Build the components', true],
            ['Write the tests', false],
          ].map(([t, done]) => (
            <li key={String(t)} className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2 text-slate-200">
              <span className={`grid size-4 place-items-center rounded-md border ${done ? 'border-mint bg-mint/80 text-ink' : 'border-white/30'}`}>{done && '✓'}</span>
              <span className={done ? 'text-slate-400 line-through' : ''}>{t}</span>
            </li>
          ))}
        </ul>
      )}
      {kind === 'auth' && (
        <div className="flex h-full items-center justify-center gap-4">
          <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-mint/80 to-aqua/70 shadow-[0_0_30px_rgb(52_211_153/0.4)]">
            <svg viewBox="0 0 24 24" className="size-8 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6l-8-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="space-y-2 text-xs">
            <div className="rounded-full bg-white/10 px-3 py-1 text-slate-200">User page</div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-slate-200">Admin page</div>
          </div>
        </div>
      )}
    </div>
  )
}
