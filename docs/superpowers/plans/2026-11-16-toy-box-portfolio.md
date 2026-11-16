# Toy Box Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Single-page playful 3D portfolio ("The Toy Box") with a persistent scroll-choreographed R3F toy scene.

**Architecture:** Vite SPA. `App` mounts Lenis (synced to GSAP ticker), a fixed lazy-loaded `<ToyScene>` canvas behind content, and section components. Scroll progress per section is published through a tiny store (`src/lib/scroll-store.ts`) that the 3D scene reads in `useFrame` — no React re-render per frame. All copy in `src/data/`.

**Tech Stack:** React 19, TS, Tailwind v4, motion/react, gsap + ScrollTrigger + @gsap/react, lenis, three + @react-three/fiber + @react-three/drei.

**Spec:** `docs/superpowers/specs/2026-11-16-portfolio-design.md`

## Global Constraints
- Palette tokens only: lilac `#D9D2FF`, plum `#22103D`, bubblegum `#FF4FA3`, lemon `#FFE04A`, pool `#1FB6FF`, grass `#34D07F`.
- Fonts: `font-display` Unbounded, `font-sans` Figtree. Sentence case; no all-caps eyebrows; no "→" in buttons.
- Toy shape style: `border-2 border-plum shadow-toy` on interactive pieces.
- Springs: bouncy {stiffness 400, damping 15}, snappy {500, 30}, gentle {120, 20}.
- `prefers-reduced-motion`: Lenis off, ScrollTrigger scrubs off, 3D replaced by static SVG toys, no confetti.
- Canvas: lazy import, `dpr={[1, 1.5]}`, `frameloop` "never" when tab hidden.
- Verification per task: `npm run build` clean + Playwright screenshot 375/1440.

## Review Focus
1. Touch devices: custom cursor and magnetic effect must be disabled (`(pointer: coarse)`); drag still works on touch.
2. Reduced motion: every section's content fully visible without scroll animations (no element stuck at opacity 0).
3. Mobile width 375: hero name never overflows horizontally (clamp font size); horizontal projects track becomes vertical stack below 768px.
4. Theme toggle persists across reload (localStorage wrapped in try/catch) and 3D materials stay legible in dark mode.
5. Modal: Esc closes, focus returns to the opening panel, body scroll (Lenis) paused while open.

---

### Task 1: Core libs + layout shell
**Files:** Create `src/lib/motion.ts` (springs), `src/lib/useReducedMotion.ts`, `src/lib/useCoarsePointer.ts`, `src/lib/scroll-store.ts`, `src/lib/smooth-scroll.tsx` (`<SmoothScroll>` provider + `useLenis()`), `src/data/profile.ts`, `src/components/Nav.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Cursor.tsx`, `src/components/MagneticButton.tsx`; Modify `src/App.tsx`.
**Interfaces produces:** `springs.{bouncy,snappy,gentle}`; `scrollStore: { get(): ScrollState; set(p: Partial<ScrollState>): void }` where `ScrollState = { section: SectionId; progress: number; pointer: {x:number;y:number} }`; `SectionId = 'hero'|'about'|'projects'|'skills'|'experience'|'contact'`; `useLenis(): Lenis | null`.
- [ ] Implement; Nav active indicator uses IntersectionObserver over `section[id]`, writes `scrollStore.section`.
- [ ] Verify build + screenshot; commit.

### Task 2: 3D toy scene
**Files:** Create `src/three/ToyScene.tsx` (default export, Canvas), `src/three/Toy.tsx`, `src/three/layouts.ts` (per-section target transforms for 6 toys), `src/three/StaticToys.tsx` (SVG fallback).
**Interfaces consumes:** `scrollStore`. Toys lerp toward `layouts[section]` each frame, lean toward pointer in hero, bonk (scale squash + spin impulse) on click.
- [ ] Implement; lazy-load from App with `<Suspense>`; static fallback under reduced motion.
- [ ] Verify canvas renders (Playwright screenshot shows toys), no console errors; commit.

### Task 3: Hero + About
**Files:** `src/sections/Hero.tsx`, `src/sections/About.tsx`, `src/components/SplitText.tsx`.
- [ ] Hero: name per-letter spring entrance (the one page-load moment), `clamp()` size; CTAs "See the work" / "Say hello".
- [ ] About: bio + sticker facts (lemon/grass/pool chips, slight rotation, wobble on hover).
- [ ] Verify 375 no horizontal overflow; commit.

### Task 4: Projects + case-study modal
**Files:** `src/data/projects.ts`, `src/sections/Projects.tsx`, `src/components/ProjectPanel.tsx`, `src/components/ProjectModal.tsx`, `src/components/ProjectArt.tsx` (generated SVG art per project).
- [ ] GSAP pinned horizontal track ≥768px (`matchMedia`), vertical stack below; tilt on hover; `layoutId` shared transition to modal; Esc/focus return/Lenis stop.
- [ ] Verify open/close via Playwright click + Esc; commit.

### Task 5: Skills, Experience, Contact, Footer
**Files:** `src/data/skills.ts`, `src/data/experience.ts`, `src/sections/Skills.tsx`, `src/sections/Experience.tsx`, `src/sections/Contact.tsx`, `src/components/Confetti.tsx`.
- [ ] Skills draggable blocks inside play area (`dragConstraints`, `dragElastic`, snap back).
- [ ] Experience timeline line `scaleY` scrubbed by ScrollTrigger.
- [ ] Contact copy-email button → "Copied!" + confetti; mailto fallback if clipboard fails.
- [ ] Verify; commit.

### Task 6: Polish & audit
- [ ] Meta/OG tags, favicon, `web-design-guidelines` audit, `vercel-react-best-practices` pass, reduced-motion + dark-mode Playwright checks at 375/768/1440; fix issues; commit.
