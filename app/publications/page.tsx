import TopNav from "@/components/top-nav"

export default function PublicationsPage() {
  const varsity = [
    { title: "The Varsity Article #1 (placeholder)", href: "#" },
    { title: "The Varsity Article #2 (placeholder)", href: "#" },
    { title: "The Varsity Article #3 (placeholder)", href: "#" },
  ]

  const mediumPosts = [
    { title: "Medium Post #1 (placeholder)", href: "#" },
    { title: "Medium Post #2 (placeholder)", href: "#" },
    { title: "Medium Post #3 (placeholder)", href: "#" },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* Featured Paper */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Publications</span>
          </h1>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-light text-foreground mb-2">Featured Paper (placeholder)</h2>
            <p className="text-muted-foreground mb-4 max-w-3xl">Brief abstract/summary placeholder for the paper we’re currently working on. This will be updated with title, authors, venue, and links.</p>
            <div className="flex gap-3">
              <a href="#" className="px-4 py-2 rounded-md border border-border text-foreground/80 hover:border-purple-400/60 hover:text-foreground transition">Read Draft (PDF)</a>
              <a href="#" className="px-4 py-2 rounded-md border border-border text-foreground/80 hover:border-purple-400/60 hover:text-foreground transition">BibTeX</a>
            </div>
          </div>
        </div>
      </section>

      {/* Varsity Articles */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light mb-6">The Varsity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {varsity.map((a, i) => (
              <a key={i} href={a.href} className="rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
                <h3 className="text-lg font-light">{a.title}</h3>
                <p className="text-muted-foreground text-sm">Short blurb placeholder. Link points to the article.</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Medium Space */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light mb-4">Medium</h2>
          <p className="text-muted-foreground mb-6">We publish longer-form pieces on Medium. This section can become an embedded feed later.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediumPosts.map((p, i) => (
              <a key={i} href={p.href} className="rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
                <h3 className="text-lg font-light">{p.title}</h3>
                <p className="text-muted-foreground text-sm">Short summary placeholder. Link points to the Medium post.</p>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href="#" className="text-purple-600 hover:underline">Visit our Medium space →</a>
          </div>
        </div>
      </section>
    </main>
  )
}
