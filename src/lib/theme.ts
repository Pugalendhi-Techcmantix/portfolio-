import { useCallback, useEffect, useState } from 'react'

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

/** Light/dark theme. The first value comes from the choice saved in this browser, else the system setting
 *  (set by a tiny script in index.html before first paint). After a manual choice the system setting is ignored. */
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

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(KEY)) return
      } catch {
        /* ignore */
      }
      const next: Theme = e.matches ? 'light' : 'dark'
      apply(next, true)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, toggle: () => choose(theme === 'dark' ? 'light' : 'dark') }
}
