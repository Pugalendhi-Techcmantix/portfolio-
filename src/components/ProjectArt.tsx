import type { ArtStyle } from '../data/projects'

const ink = '#22103d'

/** Generated cover art per project, so the placeholder content still feels designed. */
export function ProjectArt({ style, className }: { style: ArtStyle; className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {style === 'garden' && (
        <>
          <rect width="400" height="260" fill="#d9f7e6" />
          <circle cx="320" cy="60" r="34" fill="#ffe04a" stroke={ink} strokeWidth="4" />
          {[70, 150, 230, 310].map((x, i) => (
            <g key={x} transform={`translate(${x} ${200 - i * 8})`}>
              <path d={`M0 60 C0 20 0 0 0 -${40 + i * 18}`} stroke={ink} strokeWidth="5" fill="none" />
              <ellipse cx="-22" cy={-30 - i * 10} rx="24" ry="12" fill="#34d07f" stroke={ink} strokeWidth="4" transform={`rotate(-30 -22 ${-30 - i * 10})`} />
              <ellipse cx="22" cy={-46 - i * 12} rx="24" ry="12" fill="#34d07f" stroke={ink} strokeWidth="4" transform={`rotate(30 22 ${-46 - i * 12})`} />
            </g>
          ))}
          <rect y="232" width="400" height="28" fill="#ff4fa3" stroke={ink} strokeWidth="4" />
        </>
      )}
      {style === 'waves' && (
        <>
          <rect width="400" height="260" fill="#ffd6ea" />
          {Array.from({ length: 16 }, (_, i) => {
            const h = 30 + Math.abs(Math.sin(i * 1.3)) * 140
            return <rect key={i} x={20 + i * 23} y={130 - h / 2} width="14" height={h} rx="7" fill={i % 3 ? '#ff4fa3' : '#22103d'} />
          })}
          <circle cx="330" cy="200" r="40" fill="#ffe04a" stroke={ink} strokeWidth="4" />
          <circle cx="330" cy="200" r="10" fill={ink} />
        </>
      )}
      {style === 'planes' && (
        <>
          <rect width="400" height="260" fill="#d2efff" />
          <path d="M20 220 C 120 120, 220 240, 380 60" stroke={ink} strokeWidth="3" strokeDasharray="8 10" fill="none" />
          <g transform="translate(250 70) rotate(-18)">
            <path d="M0 0 L120 40 L0 70 L30 40 Z" fill="#fff" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
            <path d="M30 40 L120 40" stroke={ink} strokeWidth="4" />
          </g>
          <g transform="translate(60 150) rotate(10) scale(0.55)">
            <path d="M0 0 L120 40 L0 70 L30 40 Z" fill="#1fb6ff" stroke={ink} strokeWidth="6" strokeLinejoin="round" />
          </g>
          <circle cx="70" cy="60" r="22" fill="#ffe04a" stroke={ink} strokeWidth="4" />
        </>
      )}
      {style === 'map' && (
        <>
          <rect width="400" height="260" fill="#fff4b8" />
          <path d="M0 90 H400 M0 180 H400 M110 0 V260 M260 0 V260" stroke="#ffffff" strokeWidth="18" />
          <path d="M0 40 C 120 70, 200 10, 400 120" stroke="#1fb6ff" strokeWidth="16" fill="none" opacity="0.8" />
          {[
            [110, 90, '#ff4fa3'],
            [260, 180, '#34d07f'],
            [320, 70, '#ff4fa3'],
            [60, 200, '#1fb6ff'],
          ].map(([x, y, c]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <path d="M0 0 C -18 -22 -18 -44 0 -44 C 18 -44 18 -22 0 0 Z" fill={c as string} stroke={ink} strokeWidth="4" />
              <circle cy="-30" r="6" fill="#fff" stroke={ink} strokeWidth="3" />
            </g>
          ))}
        </>
      )}
    </svg>
  )
}
