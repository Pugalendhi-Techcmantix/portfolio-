/** Still SVG toys shown when motion is reduced or WebGL is unavailable. */
export function StaticToys() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg className="absolute -right-6 top-24 w-28 md:w-40" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="none" stroke="#ff4fa3" strokeWidth="22" />
      </svg>
      <svg className="absolute bottom-16 right-10 w-16 md:w-24" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="22" fill="#ffe04a" />
      </svg>
      <svg className="absolute -left-4 bottom-1/3 w-14 md:w-20" viewBox="0 0 100 100">
        <polygon
          points="50,4 61,38 97,38 68,59 79,94 50,73 21,94 32,59 3,38 39,38"
          fill="#34d07f"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="absolute left-1/2 top-10 w-10 md:w-14" viewBox="0 0 100 100">
        <rect x="30" y="4" width="40" height="92" rx="20" fill="#1fb6ff" />
      </svg>
    </div>
  )
}
