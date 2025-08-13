import TopNav from "@/components/top-nav"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 px-6 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Portfolio</span>
        </h1>
        <p className="text-muted-foreground">Placeholder portfolio page. Content to be added later.</p>
      </section>
    </main>
  )
}
