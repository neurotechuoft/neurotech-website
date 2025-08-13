import HeroSlideshow, { type Slide } from "@/components/hero-slideshow"
import TopNav from "@/components/top-nav"

export default function NeuronMovePage() {
  const slides: Slide[] = [
    { type: 'image', src: '/next.svg', alt: 'NeuronMove 1' },
    { type: 'image', src: '/next.svg', alt: 'NeuronMove 2' },
    { type: 'video', src: '/brain-loop.mp4', alt: 'NeuronMove video' },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-light mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">NeuronMove</span>
          </h1>
          <p className="text-muted-foreground mb-6">Flagship project tackling Parkinson&apos;s tremors via bioprosthetics and brain-wave tech. Placeholder summary.</p>

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-4">
              <h2 className="text-xl font-light mb-2">Specs</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>Ultra-soft interface inspired by Axoft insights (placeholder)</li>
                <li>High-density electrodes and low-noise front-end (placeholder)</li>
                <li>Closed-loop control capabilities (placeholder)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border p-4">
              <h2 className="text-xl font-light mb-2">Features</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>Real-time tremor suppression (placeholder)</li>
                <li>Adaptive ML algorithms (placeholder)</li>
                <li>Cloud-based data pipeline (placeholder)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border p-4">
              <h2 className="text-xl font-light mb-2">Proposal</h2>
              <p className="text-sm text-muted-foreground">Download project proposal (placeholder link).</p>
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
