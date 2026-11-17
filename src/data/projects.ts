import type { AccentColor } from './profile'

export type ArtStyle = 'chat' | 'flow' | 'tasks' | 'auth'

export type Project = {
  id: string
  title: string
  status: string
  role: string
  summary: string
  tags: string[]
  color: AccentColor
  art: ArtStyle
  highlights: string[]
  href: string
  hrefLabel: string
}

const github = 'https://github.com/PugalGamer'

export const projects: Project[] = [
  {
    id: 'rag-drive-chatbot',
    title: 'Drive RAG chatbot',
    status: 'In progress',
    role: 'AI and full stack',
    summary: 'A chatbot that answers questions from files stored in Google Drive.',
    tags: ['RAG', 'Ollama', 'Supabase'],
    color: 'bubblegum',
    art: 'chat',
    highlights: [
      'Reads documents from Drive and splits them into searchable pieces.',
      'Stores the embeddings in Supabase for fast similarity search.',
      'Runs a local model with Ollama, so documents stay on your own machine.',
      'Answers from the retrieved text instead of guessing.',
    ],
    href: github,
    hrefLabel: 'See my GitHub',
  },
  {
    id: 'n8n-automations',
    title: 'n8n automations',
    status: 'Work projects',
    role: 'Automation',
    summary: 'Workflows that connect apps and APIs so repetitive work runs on its own.',
    tags: ['n8n', 'APIs', 'Webhooks'],
    color: 'pool',
    art: 'flow',
    highlights: [
      'Visual workflows that link apps, databases and APIs.',
      'Triggered by webhooks, schedules or form submissions.',
      'Chatbot and RAG steps can sit inside a workflow.',
    ],
    href: github,
    hrefLabel: 'See my GitHub',
  },
  {
    id: 'task-manager',
    title: 'Task management app',
    status: 'Personal project',
    role: 'Front end',
    summary: 'A clean React app for planning work, with tasks you can add, edit and finish.',
    tags: ['React', 'JavaScript', 'CSS'],
    color: 'lemon',
    art: 'tasks',
    highlights: [
      'Create, edit, complete and delete tasks.',
      'Responsive layout that works on phones and desktops.',
      'Built with React components and hooks.',
    ],
    href: github,
    hrefLabel: 'See my GitHub',
  },
  {
    id: 'mern-auth',
    title: 'MERN app with Google sign-in',
    status: 'Personal project',
    role: 'Full stack',
    summary: 'A MERN CRUD app with separate user and admin pages behind Google login.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    color: 'grass',
    art: 'auth',
    highlights: [
      'Sign in with Google.',
      'Separate pages for regular users and admins.',
      'Full create, read, update and delete on a MongoDB database.',
    ],
    href: github,
    hrefLabel: 'See my GitHub',
  },
]
