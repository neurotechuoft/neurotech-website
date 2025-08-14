"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import HeroSlideshow, { type Slide } from "@/components/hero-slideshow"
import TopNav from "@/components/top-nav"

export default function TeamDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug ?? "team"
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)

  const slides = useMemo<Slide[]>(() => (
    [0,1,2].map((i) => ({ type: 'image', src: '/next.svg', alt: `Team ${slug} ${i+1}` }))
  ), [slug])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="pt-28 max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-light mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{name} Team</span>
          </h1>
          <p className="text-muted-foreground mb-4">Short subtitle about what the team does. Placeholder content for now.</p>
          <p className="text-muted-foreground">Optional paragraph describing goals, typical projects, and how members collaborate. Additional details can go here or below.</p>
        </div>
        <div>
          <HeroSlideshow slides={slides} intervalMs={5000} className="min-h-[320px] md:min-h-[420px]" />
        </div>
      </section>

      {/* Optional roster section - can be removed if redundant */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light mb-4">People (placeholder)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4 bg-card text-sm text-muted-foreground">Member {i+1}</div>
          ))}
        </div>
      </section>
    </main>
  )
}
