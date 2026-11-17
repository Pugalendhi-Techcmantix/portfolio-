import { Backdrop } from './components/Backdrop'
import { Nav } from './components/Nav'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-iris px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to content
      </a>
      <Backdrop />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="relative z-10 px-6 pb-12 text-center text-sm text-slate-400">
        Designed and built by Pugalendhi S with React and Tailwind CSS.
      </footer>
    </>
  )
}
