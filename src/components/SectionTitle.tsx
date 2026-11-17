export function SectionTitle({ id, children, intro }: { id: string; children: string; intro?: string }) {
  return (
    <div className="reveal mb-10 max-w-2xl md:mb-14">
      <h2 id={id} className="gradient-text text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
        {children}
      </h2>
      {intro && <p className="mt-4 text-lg">{intro}</p>}
    </div>
  )
}
