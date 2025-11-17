import Link from "next/link"
import TopNav from "@/components/top-nav"

const teams = [
  { slug: "hardware", name: "Hardware@R&D (NeuronMove - version 2)", blurb: "Building devices and interfaces" },
  { slug: "software", name: "Software @R&D (NeuronMove - v2)", blurb: "Algorithms, apps, infrastructure" },
  { slug: "neuroscience", name: "Neuroscience @R&D (NeuronMove -v2)", blurb: "Signal processing and biology" },
  { slug: "posthardware", name: "Hardware@R&D (Post-Stroke Rehab)", blurb: "Community and partnerships" },
  { slug: "neurornd", name: "Neuroscience @R&D ((Post-Stroke Rehab))", blurb: "Design and storytelling" },
  { slug: "outreach", name: "Outreach", blurb: "Conversations in Neurotech" },
    { slug: "content", name: "Content Creation", blurb: "Conversations in Neurotech" },
      { slug: "podcast", name: "Podcast", blurb: "Conversations in Neurotech" },
]

export default function TeamIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 px-6 pb-16 max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-light mb-2">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Teams</span>
        </h1>
        <p className="text-muted-foreground">Explore our sub-teams and what they do.</p>
      </section>
      <section className="px-6 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map(t => (
          <Link key={t.slug} href={`/about/team/${t.slug}`} className="rounded-2xl border border-border p-6 bg-card hover:border-primary/30 transition">
            <h3 className="text-xl font-light">{t.name} →</h3>
            <p className="text-muted-foreground text-sm">{t.blurb}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}
