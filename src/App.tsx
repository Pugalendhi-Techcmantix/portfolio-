import { lazy, Suspense, useState } from 'react'
import { Cursor } from './components/Cursor'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { useReducedMotion } from './lib/media'
import { useTrackSections } from './lib/scroll-store'
import { SmoothScroll } from './lib/smooth-scroll'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { StaticToys } from './three/StaticToys'

const ToyScene = lazy(() => import('./three/ToyScene'))

function hasWebGL() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

function ToyLayer() {
  const reduced = useReducedMotion()
  const [webgl] = useState(hasWebGL)
  if (reduced || !webgl) return <StaticToys />
  return (
    <Suspense fallback={null}>
      <ToyScene />
    </Suspense>
  )
}

export default function App() {
  useTrackSections()

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-lemon px-5 py-3 font-semibold text-plum focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <ToyLayer />
      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
