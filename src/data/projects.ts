export type ProjectIcon = 'dashboard' | 'portal' | 'code' | 'chat' | 'flow' | 'auth'

export type Project = {
  id: string
  title: string
  status: string
  summary: string
  highlights: string[]
  tags: string[]
  icon: ProjectIcon
}

// Source: resume, plus the AI work described by the owner.
export const projects: Project[] = [
  {
    id: 'quality-management',
    title: 'Digital Quality Management System',
    status: 'Work project',
    summary: 'A web application to manage and track quality processes.',
    highlights: ['Tracks quality processes in one place.', 'Improves workflow efficiency and data handling.'],
    tags: ['React.js'],
    icon: 'dashboard',
  },
  {
    id: 'customer-portal',
    title: 'Customer Portal',
    status: 'Work project',
    summary: 'A user-friendly portal where customers use services and manage their data.',
    highlights: ['Customers can access services.', 'Customers can manage their data and interact with the system.'],
    tags: ['React.js'],
    icon: 'portal',
  },
  {
    id: 'coding-documents',
    title: 'Coding Document Application',
    status: 'MERN project',
    summary: 'A coding platform with an online compiler and a document-style view of questions and solutions.',
    highlights: [
      'Online compiler for running code.',
      'Form to add, edit and delete coding questions with their answers and code.',
      'Document view that shows all questions, answers and solutions in an organised format.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    icon: 'code',
  },
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
    id: 'n8n-agents',
    title: 'n8n agents and automations',
    status: 'Learning and work',
    summary: 'Workflows that connect apps and APIs, with AI agents, RAG and LLMs inside them.',
    highlights: ['Visual workflows that link apps, databases and APIs.', 'AI agent and LLM steps that handle repetitive work.'],
    tags: ['n8n', 'Agents', 'LLM'],
    icon: 'flow',
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
