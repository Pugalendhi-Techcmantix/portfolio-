import type { ProjectIcon } from '../data/projects'

/** Small illustrated UI for each project card, made from plain divs and SVG. */
export function ProjectVisual({ kind }: { kind: ProjectIcon }) {
  return (
    <div aria-hidden className="relative h-40 overflow-hidden rounded-2xl bg-linear-to-br from-white/8 to-transparent p-4">
      {kind === 'chat' && (
        <div className="space-y-2.5 text-xs">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-white/12 px-3 py-1.5 text-slate-200">Find the refund policy</div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-linear-to-br from-iris/80 to-rose/70 px-3 py-1.5 text-[#ffffff]">Found it in policy.pdf, page 4.</div>
          <div className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-aqua">Source: Drive</div>
        </div>
      )}
      {kind === 'flow' && (
        <svg viewBox="0 0 300 120" className="size-full" fill="none">
          <path d="M70 60 H122 M178 60 H230 M150 36 V14 M150 84 V106" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
          <rect x="22" y="38" width="48" height="44" rx="13" className="fill-white/10 stroke-white/30" />
          <rect x="122" y="32" width="56" height="56" rx="16" fill="url(#pf)" className="stroke-white/40" />
          <rect x="230" y="38" width="48" height="44" rx="13" className="fill-white/10 stroke-white/30" />
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
      {kind === 'dashboard' && (
        <div className="flex h-full gap-3">
          <div className="flex flex-1 items-end gap-2 rounded-xl bg-white/6 p-3">
            {[40, 65, 50, 85, 60, 95].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md bg-linear-to-t from-iris/60 to-aqua/80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="grid w-20 gap-2">
            <div className="grid place-items-center rounded-xl bg-white/8">
              <span className="size-5 rounded-full bg-mint/80 shadow-[0_0_14px_rgb(52_211_153/0.7)]" />
            </div>
            <div className="grid place-items-center rounded-xl bg-white/8">
              <span className="size-5 rounded-full bg-amber-300/80 shadow-[0_0_14px_rgb(252_211_77/0.7)]" />
            </div>
          </div>
        </div>
      )}
      {kind === 'portal' && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded-full bg-linear-to-br from-iris to-rose" />
            <span className="h-2.5 w-24 rounded-full bg-white/20" />
            <span className="ml-auto h-6 w-14 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {['from-iris/50', 'from-aqua/50', 'from-rose/50'].map((c) => (
              <div key={c} className={`h-16 rounded-xl bg-linear-to-br ${c} to-white/5 p-2`}>
                <span className="block h-2 w-8 rounded-full bg-white/40" />
              </div>
            ))}
          </div>
          <span className="block h-2.5 w-3/4 rounded-full bg-white/15" />
        </div>
      )}
      {kind === 'code' && (
        <div className="h-full rounded-xl bg-[#0f172a] p-3 font-mono text-[11px] leading-5 text-[#cbd5e1]">
          <div>
            <span className="text-[#a5b4fc]">function</span> <span className="text-[#67e8f9]">solve</span>(n) {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#a5b4fc]">return</span> n * 2
          </div>
          <div>{'}'}</div>
          <span className="absolute bottom-3 right-3 rounded-full bg-mint/85 px-3 py-1 text-[11px] font-semibold text-ink">Run</span>
        </div>
      )}
      {kind === 'auth' && (
        <div className="flex h-full items-center justify-center gap-4">
          <div className="grid size-16 place-items-center rounded-2xl bg-linear-to-br from-mint/80 to-aqua/70 shadow-[0_0_30px_rgb(52_211_153/0.4)]">
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
