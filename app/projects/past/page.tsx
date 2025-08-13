import Link from "next/link"
import TopNav from "@/components/top-nav"

const pastProjects = Array.from({ length: 9 }).map((_, i) => ({
  slug: `past-${i+1}`,
  title: `Past Project ${i+1}`,
  summary: "Short description placeholder.",
}))

export default function PastProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 px-6 pb-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Past Projects</span>
        </h1>
        <p className="text-muted-foreground mb-6">Explore past efforts; each opens to a detail page with more info.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastProjects.map((p) => (
            <Link key={p.slug} href={`/projects/past/${p.slug}`} className="rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
              <h3 className="text-xl font-light mb-1">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
