# Portfolio — project rules

Frontend-only personal portfolio. No API, no database. `server.js` (Express) only serves the built `dist/` for self-hosting; see `DEPLOY.md`. Run with `npm run build && npm start` (PORT env, default 3000).

## Stack
Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `@theme` in `src/styles/globals.css`) · Motion (`motion/react`) for component/gesture animation · GSAP + ScrollTrigger (`@gsap/react` `useGSAP`) for scroll choreography · Lenis smooth scroll synced to GSAP ticker · three + @react-three/fiber + drei for the 3D toy scene · lucide-react icons · Fonts: Unbounded (display), Figtree (body) via Fontsource.

## Design
Spec: `docs/superpowers/specs/2026-11-16-portfolio-design.md`. Use only the palette tokens (lilac, plum, bubblegum, lemon, pool, grass). Sentence case, no all-caps eyebrows, no "→" in buttons.

## Rules
- All content lives in `src/data/*.ts` — never hardcode copy in components.
- Every animation must respect `prefers-reduced-motion` (use `useReducedMotion` from `src/lib`).
- 3D canvas is lazy-loaded, DPR ≤ 1.5, static fallback for reduced motion.
- Visible keyboard focus on all interactive elements; semantic landmarks.
- Verify with `npm run build` and Playwright screenshots at 375 / 768 / 1440px.
