import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { springs } from '../lib/motion'
import { getTheme, setTheme, type Theme } from '../lib/theme'

export function ThemeToggle() {
  const [theme, setLocal] = useState<Theme>(getTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    setTheme(next)
    setLocal(next)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#1a0c30' : '#d9d2ff')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-lemon text-plum"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 90, scale: 0 }}
          transition={springs.bouncy}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
