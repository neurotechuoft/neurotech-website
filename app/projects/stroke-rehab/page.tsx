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
            <div className="mt-6">
              <a
                href="/pdfs/Neurorehabilitation%20Device%20for%20Post-Stroke%20Recovery%20%E2%80%93%20Project%20Proposal%20(Final)%20(1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all"
                download
              >
                Download/Read Project Proposal (PDF)
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
