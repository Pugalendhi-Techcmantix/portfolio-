import type { AccentColor } from './profile'

export const skillGroups: { name: string; color: AccentColor; items: string[] }[] = [
  { name: 'Front end', color: 'bubblegum', items: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { name: 'Back end and data', color: 'pool', items: ['Node.js', 'Laravel', 'MySQL', 'MongoDB', 'Supabase'] },
  { name: 'AI and automation', color: 'grass', items: ['RAG', 'Chatbots', 'Ollama', 'n8n'] },
  { name: 'Tools', color: 'lemon', items: ['Git', 'GitHub', 'Postman'] },
]
