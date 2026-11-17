import { profile } from '../data/profile'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-8 text-base sm:flex-row sm:px-8 md:px-14">
      <p>
        © {YEAR} {profile.firstName} {profile.lastName}. Built with React, three.js and a lot of springs.
      </p>
      <a href="#hero" className="inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-4 hover:decoration-bubblegum">
        Back to top
      </a>
    </footer>
  )
}
