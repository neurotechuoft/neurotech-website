import TopNav from "@/components/top-nav"

export default function ProjectsHistoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">History</span>
        </h1>
        <p className="text-muted-foreground mb-6">Timeline and milestones of R&D efforts. Placeholder content.</p>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4 bg-card">
              <h3 className="text-lg font-light">Year {2020 + i}</h3>
              <p className="text-muted-foreground text-sm">Key achievements and summaries (placeholder).</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
