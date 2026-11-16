export type Theme = 'light' | 'dark'
const KEY = 'toybox-theme'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
}
