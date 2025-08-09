import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
  <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-4">About NeuroTechUofT</h1>
          <p className="text-muted-foreground leading-relaxed">
            We are an interdisciplinary student team advancing brain–computer interfaces and neurotechnology at the University of Toronto. Learn more about our mission, projects, and the people leading the organization.
          </p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          <a
            href="/about/leadership"
            className="block rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors bg-card"
          >
            <h2 className="text-2xl font-light mb-2">Leadership Team →</h2>
            <p className="text-muted-foreground">Meet the people guiding our strategy, projects, and community.</p>
          </a>
          <a
            href="/projects"
            className="block rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors bg-card"
          >
            <h2 className="text-2xl font-light mb-2">Projects →</h2>
            <p className="text-muted-foreground">Explore our research, hardware, and software initiatives.</p>
          </a>
        </div>
      </section>
    </main>
  )
}
