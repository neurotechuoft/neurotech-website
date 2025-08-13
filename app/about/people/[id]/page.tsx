"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import HeroSlideshow, { type Slide } from "@/components/hero-slideshow"
import TopNav from "@/components/top-nav"

export default function PersonDetailPage() {
  const params = useParams<{ id: string }>()
  const personId = params?.id ?? "person"

  const slides: Slide[] = useMemo(() => (
    [0,1,2,3,4].map((i) => ({ type: 'image', src: '/next.svg', alt: `Slide ${i+1}` }))
  ), [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-light mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Person: {personId}</span>
          </h1>
          <p className="text-primary">Position, Team</p>
          <p className="text-muted-foreground mb-4">Undergraduate/Graduate Program at UofT</p>
          <p className="text-muted-foreground">Placeholder bio text about the person, achievements, interests, and contributions to NeuroTechUofT. This section will be auto-filled from Google Form responses in a later iteration.</p>
        </div>
        <div>
          <HeroSlideshow slides={slides} intervalMs={5000} className="min-h-[320px] md:min-h-[420px]" />
        </div>
      </section>
    </main>
  )
}
