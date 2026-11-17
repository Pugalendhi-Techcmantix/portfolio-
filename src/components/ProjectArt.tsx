import type { ArtStyle } from '../data/projects'

const ink = '#22103d'

/** Generated cover art per project so each card has its own look without screenshots. */
export function ProjectArt({ style, className }: { style: ArtStyle; className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {style === 'chat' && (
        <>
          <rect width="400" height="260" fill="#ffd6ea" />
          <g stroke={ink} strokeWidth="4" strokeLinejoin="round">
            <path d="M40 40 H250 a18 18 0 0 1 18 18 V96 a18 18 0 0 1 -18 18 H110 L78 142 V114 H58 a18 18 0 0 1 -18 -18 V58 a18 18 0 0 1 18 -18Z" fill="#fff" />
            <path d="M150 140 H342 a18 18 0 0 1 18 18 V196 a18 18 0 0 1 -18 18 H322 V242 L290 214 H168 a18 18 0 0 1 -18 -18 V158 a18 18 0 0 1 18 -18Z" fill="#ff4fa3" />
          </g>
          <g fill={ink}>
            <rect x="62" y="62" width="150" height="10" rx="5" />
            <rect x="62" y="82" width="100" height="10" rx="5" />
            <rect x="172" y="164" width="150" height="10" rx="5" />
            <rect x="172" y="184" width="110" height="10" rx="5" />
          </g>
          <circle cx="344" cy="52" r="26" fill="#ffe04a" stroke={ink} strokeWidth="4" />
        </>
      )}
      {style === 'flow' && (
        <>
          <rect width="400" height="260" fill="#d2efff" />
          <path d="M92 130 H150 M250 130 H308 M200 82 V50 M200 178 V210" stroke={ink} strokeWidth="5" strokeDasharray="2 10" strokeLinecap="round" />
          <g stroke={ink} strokeWidth="4">
            <rect x="30" y="102" width="62" height="56" rx="16" fill="#ffe04a" />
            <rect x="150" y="96" width="100" height="68" rx="20" fill="#ff4fa3" />
            <rect x="308" y="102" width="62" height="56" rx="16" fill="#34d07f" />
            <circle cx="200" cy="34" r="20" fill="#fff" />
            <circle cx="200" cy="226" r="20" fill="#fff" />
          </g>
          <circle cx="200" cy="130" r="14" fill="#fff" stroke={ink} strokeWidth="4" />
        </>
      )}
      {style === 'tasks' && (
        <>
          <rect width="400" height="260" fill="#fff4b8" />
          <rect x="70" y="28" width="260" height="204" rx="26" fill="#fff" stroke={ink} strokeWidth="4" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(98 ${58 + i * 58})`}>
              <rect width="34" height="34" rx="10" fill={i < 2 ? '#34d07f' : '#fff'} stroke={ink} strokeWidth="4" />
              {i < 2 && <path d="M8 18 l8 8 l12 -16" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="54" y="8" width={150 - i * 24} height="12" rx="6" fill={ink} opacity={i < 2 ? 0.35 : 1} />
            </g>
          ))}
          <circle cx="350" cy="44" r="22" fill="#ff4fa3" stroke={ink} strokeWidth="4" />
        </>
      )}
      {style === 'auth' && (
        <>
          <rect width="400" height="260" fill="#d9f7e6" />
          <path d="M200 30 L290 62 V130 C290 180 250 214 200 232 C150 214 110 180 110 130 V62 Z" fill="#34d07f" stroke={ink} strokeWidth="5" strokeLinejoin="round" />
          <circle cx="200" cy="108" r="22" fill="#fff" stroke={ink} strokeWidth="4" />
          <path d="M158 178 C162 148 238 148 242 178" fill="#fff" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <circle cx="330" cy="56" r="24" fill="#ffe04a" stroke={ink} strokeWidth="4" />
          <circle cx="70" cy="200" r="18" fill="#ff4fa3" stroke={ink} strokeWidth="4" />
        </>
      )}
    </svg>
  )
}
