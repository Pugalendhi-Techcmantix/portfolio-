import type { AccentColor } from './profile'

export type ArtStyle = 'garden' | 'waves' | 'planes' | 'map'

export type Project = {
  id: string
  title: string
  year: string
  role: string
  summary: string
  tags: string[]
  color: AccentColor
  art: ArtStyle
  challenge: string
  approach: string
  outcome: string
  href: string
}

// Placeholder projects: replace with your own work.
export const projects: Project[] = [
  {
    id: 'pocket-garden',
    title: 'Pocket Garden',
    year: '2026',
    role: 'Design and front-end',
    summary: 'A launch site for a plant-care app where the plants grow as you scroll.',
    tags: ['React', 'three.js', 'GSAP'],
    color: 'grass',
    art: 'garden',
    challenge: 'The app’s whole pitch is “watch your plants thrive”, but static screenshots made it look like every other to-do list.',
    approach: 'I built a scroll-driven garden in three.js: each section waters the scene a little more, and the hero plant reacts to your cursor like it’s reaching for light.',
    outcome: 'Waitlist sign-ups were 3.2× the previous landing page in the first month.',
    href: '#',
  },
  {
    id: 'loudmouth-radio',
    title: 'Loudmouth Radio',
    year: '2025',
    role: 'Front-end lead',
    summary: 'A live player for an independent radio station that dances to whatever is on air.',
    tags: ['Web Audio', 'Canvas', 'TypeScript'],
    color: 'bubblegum',
    art: 'waves',
    challenge: 'Listeners kept the tab in the background, so the station had no way to show its personality or its schedule.',
    approach: 'An audio-reactive visualiser, a schedule that reads like a gig poster, and a mini-player that follows you across the site without dropping a beat.',
    outcome: 'Average listening sessions grew from 18 to 41 minutes.',
    href: '#',
  },
  {
    id: 'fold-and-fly',
    title: 'Fold & Fly',
    year: '2025',
    role: 'Creative development',
    summary: 'A paper-plane builder for a museum’s kids’ week. Fold it, then throw it across the screen.',
    tags: ['React Three Fiber', 'Physics', 'Touch'],
    color: 'pool',
    art: 'planes',
    challenge: 'It had to run on the museum’s ageing touch kiosks and be usable by a six-year-old with no instructions.',
    approach: 'Big, forgiving gestures, a physics model tuned for fun rather than accuracy, and a render budget that held 60fps on hardware from 2017.',
    outcome: 'Over 12,000 planes thrown during the week, and the kiosk version was kept as a permanent exhibit.',
    href: '#',
  },
  {
    id: 'snack-atlas',
    title: 'Snack Atlas',
    year: '2024',
    role: 'Design and front-end',
    summary: 'A hand-drawn map of the city’s best street food, built to be explored rather than searched.',
    tags: ['Mapbox', 'Motion', 'Accessibility'],
    color: 'lemon',
    art: 'map',
    challenge: 'Map interfaces are notoriously hard for keyboard and screen reader users, and this one was meant to be fun for everyone.',
    approach: 'Every stall is also a list item, and the map follows your focus. Springy pins, a custom tile style, and filters that animate the map instead of reloading it.',
    outcome: 'Featured by the city tourism board and passed a full WCAG 2.2 AA audit.',
    href: '#',
  },
]
