import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const COARSE_POINTER = '(pointer: coarse)'

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION)
export const useCoarsePointer = () => useMediaQuery(COARSE_POINTER)
