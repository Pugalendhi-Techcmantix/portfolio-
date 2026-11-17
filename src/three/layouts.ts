import type { SectionId } from '../lib/scroll-store'

export type ToyKind = 'torus' | 'capsule' | 'box' | 'star' | 'sphere' | 'cone'

export const TOYS: { kind: ToyKind; color: string }[] = [
  { kind: 'torus', color: '#ff4fa3' },
  { kind: 'capsule', color: '#1fb6ff' },
  { kind: 'box', color: '#ffe04a' },
  { kind: 'star', color: '#34d07f' },
  { kind: 'sphere', color: '#ff4fa3' },
  { kind: 'cone', color: '#1fb6ff' },
]

/** [x, y] as fractions of viewport width/height from centre, z in world units, scale. */
export type Slot = [x: number, y: number, z: number, scale: number]
type Layout = Record<SectionId, Slot[]>

const corners: Slot[] = [
  [-0.44, 0.38, -2, 0.42],
  [0.44, 0.38, -2, 0.42],
  [-0.44, -0.4, -2, 0.42],
  [0.44, -0.4, -2, 0.42],
  [0.02, 0.44, -3, 0.32],
  [-0.02, -0.45, -3, 0.32],
]

const ring: Slot[] = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 + 0.4
  return [Math.cos(a) * 0.43, Math.sin(a) * 0.37, (i % 2) - 1, 0.6] as Slot
})

/** Landscape screens: text sits left, toys play on the right. */
const wide: Layout = {
  hero: [
    [0.3, 0.2, 0, 1.15],
    [0.16, -0.24, -1, 0.95],
    [0.4, -0.1, 0.5, 0.8],
    [0.08, 0.34, -1.5, 0.75],
    [0.25, 0.0, 1.2, 0.6],
    [0.43, 0.32, -1, 0.6],
  ],
  // tidied into a stack beside the bio
  about: [
    [0.3, -0.3, 0, 0.85],
    [0.3, -0.12, 0, 0.75],
    [0.3, 0.04, 0, 0.7],
    [0.3, 0.2, 0, 0.6],
    [0.3, 0.33, 0, 0.45],
    [0.42, -0.36, 0, 0.5],
  ],
  projects: corners,
  skills: [
    [-0.44, 0.28, -1, 0.45],
    [-0.44, 0.06, -1, 0.45],
    [-0.44, -0.18, -1, 0.45],
    [0.45, 0.3, -1, 0.45],
    [0.45, 0.05, -1, 0.4],
    [0.45, -0.22, -1, 0.4],
  ],
  experience: [
    [0.34, 0.26, -0.5, 0.7],
    [0.4, -0.02, -1, 0.6],
    [0.3, -0.28, 0, 0.65],
    [0.2, 0.36, -2, 0.45],
    [0.44, 0.38, -1, 0.4],
    [0.22, -0.1, -2, 0.45],
  ],
  contact: ring,
}

/** Portrait screens: toys keep to the top and bottom edges so text stays readable. */
const tall: Layout = {
  hero: [
    [0.24, 0.3, 0, 1.15],
    [-0.26, 0.24, -1, 0.95],
    [0.32, -0.4, 0, 0.8],
    [-0.06, 0.38, -1.5, 0.8],
    [-0.32, -0.42, 0.5, 0.7],
    [0.3, 0.42, -1, 0.6],
  ],
  about: corners,
  projects: corners,
  skills: corners,
  experience: corners,
  contact: corners,
}

/** The big planet: one slot per section. Far-away z values make it feel massive. */
const planetWide: Record<SectionId, Slot> = {
  hero: [0.3, 0.0, -3, 2.1],
  about: [0.33, -0.04, -3, 1.6],
  projects: [0.42, 0.34, -6, 0.9],
  skills: [0, 0.02, -10, 3.4],
  experience: [0.36, 0.06, -5, 1.5],
  contact: [0, 0, -11, 3.6],
}
const planetTall: Record<SectionId, Slot> = {
  hero: [0.1, 0.34, -4, 1.25],
  about: [0.2, 0.42, -5, 1.1],
  projects: [0.2, 0.42, -6, 0.9],
  skills: [0.2, 0.42, -6, 0.9],
  experience: [0.2, 0.42, -6, 0.9],
  contact: [0, 0.35, -8, 1.4],
}

export const layouts = { wide, tall, planetWide, planetTall }
