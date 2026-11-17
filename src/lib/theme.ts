import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'theme'
const COLORS: Record<Theme, string> = { light: '#eef1fa', dark: '#070912' }

function current(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function apply(theme: Theme, animate: boolean) {
  const root = document.documentElement
  if (animate) {
    root.classList.add('theme-anim')
    window.setTimeout(() => root.classList.remove('theme-anim'), 600)
  }
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme])
}

/** Light/dark theme. The first value comes from the choice saved in this browser, otherwise dark
 *  (set by a tiny script in index.html before first paint). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)

  const choose = useCallback((next: Theme) => {
    apply(next, true)
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
  }, [])

  return { theme, toggle: () => choose(theme === 'dark' ? 'light' : 'dark') }
}
