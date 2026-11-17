# Portfolio — project rules

Frontend-only personal portfolio. No API, no database. Production host: cPanel/Apache at pugal.techcmantix.in, deployed as static files (`npm run package` → upload `portfolio-site.zip`; `public/.htaccess` handles routing/caching). `server.js` (Express) is an alternative Node host. See `DEPLOY.md`.

## Stack
Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `@theme` in `src/styles/globals.css`) · Motion (`motion/react`) for component/gesture animation · GSAP + ScrollTrigger (`@gsap/react` `useGSAP`) for scroll choreography · Lenis smooth scroll synced to GSAP ticker · three + @react-three/fiber + drei for the 3D toy scene · lucide-react icons · Fonts: Unbounded (display), Figtree (body) via Fontsource.

## Design
Spec: `docs/superpowers/specs/2026-11-16-portfolio-design.md`. Use only the palette tokens (lilac, plum, bubblegum, lemon, pool, grass). Sentence case, no all-caps eyebrows, no "→" in buttons.
Look: dark "arcade" theme (dark only): React Bits Galaxy background (src/components/reactbits), R3F planet + neon toys, glass panels (.glass / .glass-lite in globals.css). Third-party skills installed in .claude/skills: apple-design, glassmorphism, threejs-*.

## Rules
- All content lives in `src/data/*.ts` — never hardcode copy in components.
- Every animation must respect `prefers-reduced-motion` (use `useReducedMotion` from `src/lib`).
- 3D canvas is lazy-loaded, DPR ≤ 1.5, static fallback for reduced motion.
- Visible keyboard focus on all interactive elements; semantic landmarks.
- Verify with `npm run build` and Playwright screenshots at 375 / 768 / 1440px.
