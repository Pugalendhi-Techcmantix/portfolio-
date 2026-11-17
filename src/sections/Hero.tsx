import { motion } from 'motion/react'
import { MagneticButton } from '../components/MagneticButton'
import { SplitText } from '../components/SplitText'
import { profile } from '../data/profile'
import { useReducedMotion } from '../lib/media'
import { springs } from '../lib/motion'

export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { ...springs.gentle, delay } }

  return (
    <section id="hero" className="relative flex min-h-svh flex-col justify-end px-5 pb-14 pt-28 sm:px-8 md:px-14 md:pb-20">
      <motion.p {...rise(0.7)} className="mb-5 flex flex-wrap items-center gap-3 text-base font-semibold">
        <span>
          {profile.firstName} {profile.lastName}, based in {profile.location.split(',')[0]}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm">
          <span className="size-2.5 rounded-full bg-grass" aria-hidden />
          {profile.availability}
        </span>
      </motion.p>

      <h1
        aria-label={`${profile.firstName} ${profile.lastName}, ${profile.role}`}
        className="font-display text-[clamp(2.3rem,10.4vw,9.5rem)] font-black leading-[0.95] tracking-[-0.04em]"
      >
        <SplitText text={profile.firstName} className="block" />
        <SplitText text={profile.role} delay={0.3} className="mt-3 block text-[0.42em] font-extrabold leading-none tracking-[-0.02em] md:mt-5" />
      </h1>

      <motion.p {...rise(0.9)} className="mt-8 max-w-[34ch] text-xl leading-snug md:text-2xl">
        {profile.tagline}
      </motion.p>

      <motion.div {...rise(1.05)} className="mt-8 flex flex-wrap items-center gap-4">
        <MagneticButton href="#projects">See my work</MagneticButton>
        <MagneticButton href="#contact" variant="secondary">
          Contact me
        </MagneticButton>
        <span className="hidden text-sm opacity-75 md:inline">{profile.toyHint}</span>
      </motion.div>
    </section>
  )
}
