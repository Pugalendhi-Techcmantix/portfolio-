export type ProjectIcon = 'chat' | 'flow' | 'tasks' | 'auth'

export type Project = {
  id: string
  title: string
  status: string
  summary: string
  highlights: string[]
  tags: string[]
  icon: ProjectIcon
}

export const projects: Project[] = [
  {
    id: 'rag-drive-chatbot',
    title: 'Drive RAG chatbot',
    status: 'In progress',
    summary: 'A chatbot that answers questions from files stored in Google Drive.',
    highlights: [
      'Splits Drive documents into searchable pieces and stores embeddings in Supabase.',
      'Runs a local model with Ollama, so documents stay on your own machine.',
      'Answers from the retrieved text instead of guessing.',
    ],
    tags: ['RAG', 'Ollama', 'Supabase'],
    icon: 'chat',
  },
  {
    id: 'n8n-automations',
    title: 'n8n automations',
    status: 'Work projects',
    summary: 'Workflows that connect apps and APIs so repetitive work runs on its own.',
    highlights: [
      'Visual workflows that link apps, databases and APIs.',
      'Triggered by webhooks, schedules or form submissions.',
    ],
    tags: ['n8n', 'APIs', 'Webhooks'],
    icon: 'flow',
  },
  {
    id: 'task-manager',
    title: 'Task management app',
    status: 'Personal project',
    summary: 'A React app for planning work, with tasks you can add, edit and finish.',
    highlights: ['Create, edit, complete and delete tasks.', 'Responsive layout for phones and desktops.'],
    tags: ['React', 'JavaScript', 'CSS'],
    icon: 'tasks',
  },
  {
    id: 'mern-auth',
    title: 'MERN app with Google sign-in',
    status: 'Personal project',
    summary: 'A MERN CRUD app with separate user and admin pages behind Google login.',
    highlights: ['Sign in with Google.', 'Separate pages for users and admins, with full CRUD on MongoDB.'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    icon: 'auth',
  },
]
