export const profile = {
  firstName: 'Pugalendhi',
  lastName: 'S',
  role: 'Web developer',
  company: 'Techcmantix Technologies Pvt Ltd',
  tagline:
    'I build React, Next.js and Node.js web apps, and AI features like RAG chatbots and n8n automations, at Techcmantix Technologies in Trichy.',
  quest: 'Drive RAG chatbot with Ollama and Supabase',
  email: 'pugalp702@gmail.com',
  phone: '+91 78715 33595',
  phoneHref: 'tel:+917871533595',
  location: 'Trichy, India',
  availability: 'Working at Techcmantix Technologies',
  about: {
    heading: 'Hi, I’m Pugalendhi.',
    paragraphs: [
      'I’m a web developer at Techcmantix Technologies in Trichy. Since October 2024 I’ve been building web apps with React, Next.js, Node.js and Laravel, and I like taking an idea from a design all the way to something people can use.',
      'Lately I’m also building AI features: RAG chatbots that answer questions from Drive files, using Ollama for the model and Supabase for storage, and n8n workflows that automate repetitive work. I’m a self-driven learner with an MCA from Bishop Heber College, where I was president of the department.',
    ],
    // Shown as a gamer-style "player card".
    card: [
      { label: 'Class', value: 'Web developer', color: 'bubblegum' },
      { label: 'Main weapons', value: 'React, Next.js, Node.js, Laravel', color: 'pool' },
      { label: 'Side quests', value: 'RAG chatbots, n8n automations', color: 'grass' },
      { label: 'Playing since', value: 'October 2024', color: 'lemon' },
      { label: 'Base', value: 'Trichy, India', color: 'violet' },
    ],
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/PugalGamer' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pugalendhi-s-9a5229280' },
  ],
} as const

export type AccentColor = 'bubblegum' | 'lemon' | 'pool' | 'grass' | 'violet'

export const accentBg: Record<AccentColor, string> = {
  bubblegum: 'bg-bubblegum',
  lemon: 'bg-lemon',
  pool: 'bg-pool',
  grass: 'bg-grass',
  violet: 'bg-violet',
}

/** Glow colours for dots and chips (neon on dark glass). */
export const accentGlow: Record<AccentColor, string> = {
  bubblegum: 'shadow-[0_0_14px_rgb(255_79_163/0.8)]',
  lemon: 'shadow-[0_0_14px_rgb(255_224_74/0.8)]',
  pool: 'shadow-[0_0_14px_rgb(31_182_255/0.8)]',
  grass: 'shadow-[0_0_14px_rgb(52_208_127/0.8)]',
  violet: 'shadow-[0_0_14px_rgb(139_92_246/0.9)]',
}
