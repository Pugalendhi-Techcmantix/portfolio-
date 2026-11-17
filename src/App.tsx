import { CursorGlow } from './components/CursorGlow'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-indigo-300 px-5 py-3 font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <CursorGlow />
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Header />
          <main id="main" className="pt-24 lg:w-[50%] lg:py-24">
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            <footer className="max-w-md pb-16 text-sm text-slate-500">
              Designed and built by Pugalendhi S with React and Tailwind CSS.
            </footer>
          </main>
        </div>
      </div>
    </>
  )
}
