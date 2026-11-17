# Portfolio — project rules

Personal portfolio for Pugalendhi S (web developer, Trichy). Frontend-only: no API, no database.
Production host: cPanel/Apache at pugal.techcmantix.in, deployed as static files (`npm run package` → upload `portfolio-site.zip`; `public/.htaccess` handles routing/caching). `server.js` (Express) is an alternative Node host. See `DEPLOY.md`.

## Stack
Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, theme in `src/styles/globals.css`) · lucide-react icons · Inter variable font (Fontsource). No 3D, no animation libraries: the site must stay fast (about 75 KB gzip JS).

## Design
Professional, content-first, dark. Two-column layout on desktop (fixed left column with name, nav and links; scrolling right column), single column on mobile. One accent colour (indigo), slate greys, subtle cursor glow. Sentence case, no all-caps labels, no gimmicks (no 3D scenes, custom cursors, pinned scroll or heavy blur).

## Rules
- All content lives in `src/data/*.ts`; never hardcode copy in components.
- Respect `prefers-reduced-motion`.
- Visible keyboard focus on all interactive elements; semantic landmarks; no horizontal scroll.
- Never invent achievements, numbers or links. Ask the user for real details.
- Verify with `npm run build` and Playwright screenshots at 375 / 768 / 1440px.
