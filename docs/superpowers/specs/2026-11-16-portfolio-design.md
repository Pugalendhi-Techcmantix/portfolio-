# Portfolio design — "The Toy Box"

## Intent
A personal portfolio that feels like opening a toy box: playful, colorful, tactile, 3D. Frontend-only (Vite + React + TS). Placeholder content lives in `src/data/` and is swapped later.

- **Subject (placeholder persona):** Mika Arden, a creative developer who builds playful interfaces.
- **Audience:** studios, recruiters, collaborators.
- **Primary job:** show who Mika is and the work, then get people in touch.

## Goals / non-goals / anti-goals
- Goals: a memorable 3D signature moment, smooth scrolling, interactions that respond to the visitor, works great on mobile, Lighthouse ≥ 90.
- Non-goals: backend, CMS, blog, multi-page routing (single page + modal case studies).
- Anti-goals: template look (identical card grid, eyebrow labels, fade-up on every section), motion that blocks reading, 3D that tanks mobile performance.

## Tokens
| Name | Hex | Role |
|---|---|---|
| Lilac | `#D9D2FF` | Page base |
| Plum | `#22103D` | Ink, text, dark-mode base |
| Bubblegum | `#FF4FA3` | Primary accent, CTAs |
| Lemon | `#FFE04A` | Highlight, stickers |
| Pool | `#1FB6FF` | Secondary accent, links |
| Grass | `#34D07F` | Tertiary, status ("available") |

Dark mode: Plum base, Lilac text, same accents.

**Type:** Unbounded (variable, wide/heavy, display only, set huge and tight) + Figtree (body/UI). Scale ≈ 1.333 ratio; body 18px / 1.6; line length ≤ 70ch. Sentence case everywhere; no all-caps labels.

**Shape:** chunky 2px Plum outlines + hard offset shadows (`4px 4px 0 Plum`) on interactive "toy" elements — like plastic pieces. Radius varies by size (pills for buttons, 28px for big panels) rather than one radius everywhere.

**Motion:** spring presets `bouncy` (stiffness 400, damping 15), `snappy` (500, 30), `gentle` (120, 20). Every animation degrades under `prefers-reduced-motion`.

## Signature: the persistent toy scene
One fixed, full-viewport R3F canvas behind the content holds ~6 glossy toy shapes (torus, capsule, rounded cube, star, sphere, cone) in the accent colors. Scroll drives their choreography (GSAP ScrollTrigger → shared progress):
- **Hero:** toys float around the giant name and lean toward the cursor.
- **About:** toys tidy into a loose stack beside the bio.
- **Projects:** toys shrink and orbit the edge, out of the way.
- **Contact:** toys tumble back to centre around the CTA.
Clicking a toy bonks it (squash + spin). Canvas is lazy-loaded, DPR clamped to 1.5, frameloop paused when tab hidden; reduced-motion or low-power → static SVG toys.

Everything else stays quiet so this lands.

## Layout (left-aligned, asymmetric)
```
HERO        [Mika Arden — huge, wraps across 2 lines, left]   (toys float around)
            short line about what Mika makes · [See the work] [Say hello]
ABOUT       [bio, 2 short paragraphs, left 6/12]   (toy stack right)
            small sticker facts (location, now playing, availability)
PROJECTS    pinned horizontal track of 4 large project panels (varied sizes),
            hover tilts the panel; click opens case study modal (shared layout transition)
SKILLS      toy-block pills you can drag around a play area (Motion drag, snaps back)
EXPERIENCE  vertical timeline (true sequence), line draws as you scroll
CONTACT     "Let's make something fun" + copy-email button (confetti on copy) + socials
```
Nav: floating pill, top centre, section links with a moving active indicator; theme toggle.

## Interactions answering the visitor
Magnetic buttons, project panel tilt, draggable skill blocks, toy bonk on click, copy-email confirmation ("Copied!") with confetti. Custom cursor: a small ring that grows over interactive elements (disabled on touch).

## Approaches considered
1. **R3F persistent scene (chosen)** — full control, one canvas, toys choreographed by scroll. Cost: three.js bundle (~150kb gz), lazy-loaded.
2. Spline embeds — fast to design visually but heavy runtime, external dependency, less code control.
3. CSS/SVG pseudo-3D only — lightest, but can't deliver the "real 3D toys" feel requested.

## Left to the builder
Exact toy geometry/materials, choreography keyframes, copy wording, placeholder imagery (generated SVG/gradient art, no stock photos).
