import { Blocks, Bot, Database, MessageSquare, Plug, Sparkles, Webhook, type LucideIcon } from 'lucide-react'
import {
  siClaude,
  siCss,
  siCursor,
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostman,
  siReact,
  siSupabase,
  siTailwindcss,
} from 'simple-icons'

type Brand = { path: string; hex: string }

// Official brand logos (Simple Icons), keyed by the lowercase label used on the site.
const brands: Record<string, Brand> = {
  react: siReact,
  'react.js': siReact,
  'next.js': siNextdotjs,
  javascript: siJavascript,
  html: siHtml5,
  css: siCss,
  'tailwind css': siTailwindcss,
  'node.js': siNodedotjs,
  laravel: siLaravel,
  mysql: siMysql,
  mongodb: siMongodb,
  express: siExpress,
  supabase: siSupabase,
  ollama: siOllama,
  n8n: siN8n,
  git: siGit,
  github: siGithub,
  postman: siPostman,
  claude: siClaude,
  gemini: siGooglegemini,
  'google ai studio': siGooglegemini,
  cursor: siCursor,
}

// Labels with no official logo get a neutral icon.
const fallbacks: Record<string, LucideIcon> = {
  rag: Database,
  chatbots: MessageSquare,
  chatgpt: Bot,
  'builder.io': Blocks,
  agents: Bot,
  llm: Sparkles,
  apis: Plug,
  webhooks: Webhook,
}

/** Very dark brand colours (Next.js, GitHub, Cursor...) would vanish on the dark theme, so lighten them. */
function readable(hex: string) {
  const n = parseInt(hex, 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.35 ? '#e2e8f0' : `#${hex}`
}

/** The logo for a technology, or nothing if there is none. Decorative: the text label stays next to it. */
export function TechIcon({ name, className = 'size-4' }: { name: string; className?: string }) {
  const k = name.toLowerCase()
  const brand = brands[k]
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`${className} shrink-0`} fill={readable(brand.hex)}>
        <path d={brand.path} />
      </svg>
    )
  }
  const Fallback = fallbacks[k]
  return Fallback ? <Fallback aria-hidden className={`${className} shrink-0 text-slate-300`} strokeWidth={1.75} /> : null
}
