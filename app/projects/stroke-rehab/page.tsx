import HeroSlideshow, { type Slide } from "@/components/hero-slideshow"
import TopNav from "@/components/top-nav"

export default function StrokeRehabPage() {
  const slides: Slide[] = [
    { type: 'image', src: '/next.svg', alt: 'Stroke Rehab 1' },
    { type: 'image', src: '/next.svg', alt: 'Stroke Rehab 2' },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-light mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Stroke Rehab</span>
          </h1>
          <p className="text-muted-foreground mb-6">In collaboration with UTMIST. Placeholder summary and specs.</p>

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-4">
              <h2 className="text-xl font-light mb-2">Specs</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>Rehab protocol integration (placeholder)</li>
                <li>Lightweight wearable sensors (placeholder)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border p-4">
              <h2 className="text-xl font-light mb-2">Learn More</h2>
              <a href="https://utmist.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline">
                Visit the UTMIST page →
              </a>
            </div>
          </div>
        </div>
        <div>
          <HeroSlideshow slides={slides} intervalMs={5000} className="min-h-[300px] md:min-h-[420px]" />
        </div>
      </section>
    </main>
  )
}
