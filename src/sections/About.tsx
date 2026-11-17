import { profile } from '../data/profile'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mb-24 scroll-mt-16 md:mb-32 lg:scroll-mt-24">
      <h2 id="about-title" className="sticky top-0 z-10 -mx-6 mb-6 bg-night/80 px-6 py-5 text-sm font-semibold text-slate-200 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        About
      </h2>
      <div className="space-y-4">
        {profile.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  )
}
