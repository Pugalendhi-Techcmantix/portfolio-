# Pugalendhi S — Portfolio

Personal portfolio of Pugalendhi S, web developer (React, Next.js, Node.js, Laravel, n8n, RAG chatbots).
A fast, frontend-only site with a glassmorphism design, light and dark themes (dark by default),
and scroll animations. No backend and no database.

## Tech stack
React 19 · TypeScript · Vite · Tailwind CSS v4 · Lenis (smooth scrolling) · Simple Icons · lucide-react

## Run it locally
```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build to `dist/` |
| `npm run lint` | Lint the code |
| `npm run preview` | Serve the production build locally |
| `npm start` | Serve `dist/` with the small Express server (`server.js`) |
| `npm run package` | Build and create `portfolio-site.zip` for cPanel upload |

## Edit the content
All text lives in `src/data/` (profile, experience, education, projects, skills).
Components never contain copy, so changing content does not touch the design code.

## Deploy
- **Vercel:** import the repo, framework preset **Vite**, build command `npm run build`, output directory `dist`.
- **cPanel / Apache:** `npm run package`, upload the zip and extract it (see `DEPLOY.md`).
- **Node server with PM2:** see `DEPLOY.md`.

## Project notes
`CLAUDE.md` describes the design rules and performance rules for working on this project with Claude Code.
