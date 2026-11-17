import { motion } from 'motion/react'
import DecryptedText from '../components/reactbits/DecryptedText'
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
    <section id="hero" className="relative flex min-h-svh flex-col justify-end overflow-x-clip px-5 pb-14 pt-28 sm:px-8 md:px-14 md:pb-20">
      <div aria-hidden className="grid-floor -z-10" />

      <motion.p {...rise(0.7)} className="mb-5 flex flex-wrap items-center gap-3 text-base font-semibold text-white/90">
        <span>
          {profile.firstName} {profile.lastName}, based in {profile.location.split(',')[0]}
        </span>
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm">
          <span className="relative flex size-2.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-grass opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2.5 rounded-full bg-grass" />
          </span>
          {profile.availability}
        </span>
      </motion.p>

      <h1
        aria-label={`${profile.firstName} ${profile.lastName}, ${profile.role}`}
        className="font-display text-[clamp(2.3rem,10.4vw,9.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white [filter:drop-shadow(0_0_36px_rgb(139_92_246/0.6))]"
      >
        <SplitText text={profile.firstName} className="block" />
        <span aria-hidden className="mt-3 block text-[0.42em] font-extrabold leading-none tracking-[-0.02em] md:mt-5">
          <DecryptedText
            text={profile.role}
            animateOn="view"
            sequential
            speed={60}
            revealDirection="start"
            parentClassName="neon-text"
            encryptedClassName="text-pool"
          />
        </span>
      </h1>

      <motion.p {...rise(0.9)} className="mt-8 max-w-[34ch] text-xl leading-snug text-white/85 md:text-2xl">
        {profile.tagline}
      </motion.p>

      <motion.div {...rise(1.05)} className="mt-8 flex flex-wrap items-center gap-4">
        <MagneticButton href="#projects">See my work</MagneticButton>
        <MagneticButton href="#contact" variant="secondary">
          Contact me
        </MagneticButton>
      </motion.div>

      <motion.p {...rise(1.2)} className="glass mt-7 w-fit max-w-full rounded-2xl px-4 py-2.5 text-base">
        <span className="font-display text-sm font-bold text-bubblegum">Current quest</span>
        <span className="ml-3 text-white/90">{profile.quest}</span>
      </motion.p>
    </section>
  )
}
