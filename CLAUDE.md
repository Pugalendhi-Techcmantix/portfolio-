# Portfolio — project rules

Personal portfolio for Pugalendhi S (web developer, Trichy). Frontend-only: no API, no database.
Production host: cPanel/Apache at pugal.techcmantix.in, deployed as static files (`npm run package` → upload `portfolio-site.zip`; `public/.htaccess` handles routing/caching). `server.js` (Express) is an alternative Node host. See `DEPLOY.md`.

## Stack
Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, effects in `src/styles/globals.css`) · lucide-react icons · Inter variable font. About 79 KB gzip JS; keep it fast.

## Design
Modern glassmorphism in two themes (light and dark, toggle in the nav, saved in localStorage, defaults to the system setting; theme set before first paint by a script in index.html). All theme colours are CSS variables in globals.css; in light mode the Tailwind white/slate/accent colours are remapped, so use text-white/text-slate-* for theme-aware text and text-[#ffffff] only for text on coloured gradients. Slowly drifting aurora background. Rich but cheap motion: CSS scroll-driven animations (animation-timeline: view()/scroll()) for reveals, progress bar, counters and timeline; CSS keyframes for hero text and floating panels; tiny pointer handlers write CSS variables for tilt, spotlight, parallax and magnetic buttons. No WebGL, no animation libraries.
Performance rules: animate only transform/opacity, keep backdrop-filter elements few (use .glass-lite for small chips), never animate blur, no nested blur, write pointer positions to CSS variables not React state. Fallbacks: prefers-reduced-motion, prefers-reduced-transparency, unsupported scroll-driven animations show the final state.

## Rules
- All content lives in `src/data/*.ts`; never hardcode copy in components.
- Respect `prefers-reduced-motion`.
- Visible keyboard focus on all interactive elements; semantic landmarks; no horizontal scroll.
- Never invent achievements, numbers or links. Ask the user for real details.
- Verify with `npm run build` and Playwright screenshots at 375 / 768 / 1440px.
