// Placeholder content: replace with your own details.
export const profile = {
  firstName: 'Mika',
  lastName: 'Arden',
  role: 'Creative developer',
  tagline: 'I build websites and interfaces you want to poke, squish and play with, without ever getting in the way of what people came to do.',
  toyHint: 'Psst: the shapes are clickable.',
  email: 'hello@mika-arden.dev',
  location: 'Lisbon, Portugal',
  availability: 'Open to freelance from March',
  about: {
    heading: 'Hi, I’m Mika.',
    paragraphs: [
      'I’m a front-end developer who sits right where design and engineering overlap. For the last six years I’ve helped studios and startups turn flat mockups into interfaces with weight, bounce and personality.',
      'I care about the details people feel before they notice them: a button that squishes when pressed, a page that scrolls like butter, motion that explains instead of decorates. And I always ship it accessible and fast.',
    ],
    facts: [
      { label: 'Based in Lisbon', color: 'lemon' },
      { label: 'Currently learning shaders', color: 'pool' },
      { label: 'Coffee, then code', color: 'bubblegum' },
    ],
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'Read.cv', href: 'https://read.cv/' },
  ],
} as const

export type AccentColor = 'bubblegum' | 'lemon' | 'pool' | 'grass'

export const accentBg: Record<AccentColor, string> = {
  bubblegum: 'bg-bubblegum',
  lemon: 'bg-lemon',
  pool: 'bg-pool',
  grass: 'bg-grass',
}
