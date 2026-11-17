import { useCoarsePointer, useReducedMotion } from '../lib/media'
import Galaxy from './reactbits/Galaxy'

/** Fixed full-screen galaxy behind everything. The stars bend away from the cursor, and a click sends a warp ripple. */
export function Backdrop() {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Galaxy
        starColors={['#ffffff', '#8b5cf6', '#1fb6ff', '#ff4fa3']}
        density={1.25}
        glowIntensity={0.45}
        twinkleIntensity={0.5}
        starSpeed={0.35}
        speed={0.8}
        rotationSpeed={0.04}
        mouseInteraction={!reduced && !coarse}
        mouseRepulsion={!reduced && !coarse}
        repulsionStrength={2.4}
        clickWarp={!reduced}
        disableAnimation={reduced}
        intro={!reduced}
        dpr={coarse ? 1 : 1.5}
      />
    </div>
  )
}
