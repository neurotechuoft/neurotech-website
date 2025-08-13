import Link from "next/link"
import TopNav from "@/components/top-nav"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      {/* Intro */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">About NeuroTechUofT</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We are an interdisciplinary team advancing brain–computer interfaces and neurotechnology at the University of Toronto.
          </p>
        </div>
      </section>

      {/* Origin, Mission, Vision, Core Principles */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="text-2xl font-light mb-2">Origin</h2>
            <p className="text-muted-foreground">Placeholder: how the club started, early milestones, and inspiration.</p>
          </div>
          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="text-2xl font-light mb-2">Mission</h2>
            <p className="text-muted-foreground">Placeholder: what we aim to achieve and why it matters.</p>
          </div>
          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="text-2xl font-light mb-2">Vision</h2>
            <p className="text-muted-foreground">Placeholder: the long-term future we&apos;re building toward.</p>
          </div>
          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="text-2xl font-light mb-2">Core Principles</h2>
            <ul className="text-muted-foreground list-disc pl-5 space-y-1">
              <li>Scientific rigor</li>
              <li>Interdisciplinary collaboration</li>
              <li>Ethics and accessibility</li>
              <li>Impact-driven innovation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick links to subsections */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <Link href="/about/people" className="block rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
            <h3 className="text-xl font-light mb-1">People →</h3>
            <p className="text-muted-foreground text-sm">Leadership-style cards that open to person pages.</p>
          </Link>
          <Link href="/about/team" className="block rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
            <h3 className="text-xl font-light mb-1">Team →</h3>
            <p className="text-muted-foreground text-sm">Hardware, Software, Neuroscience, Outreach, Content, Podcast.</p>
          </Link>
          <Link href="/about/portfolio" className="block rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
            <h3 className="text-xl font-light mb-1">Portfolio →</h3>
            <p className="text-muted-foreground text-sm">Placeholder page for future content.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
