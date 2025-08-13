"use client"

import Image from "next/image"
import TopNav from "@/components/top-nav"

const episodes = Array.from({ length: 6 }).map((_, i) => ({
  title: `Episode ${i + 1}: Guest Name (placeholder)`,
  guest: `Guest ${i + 1}`,
  image: "/next.svg",
  description:
    "Short blurb about the episode topic and why it matters. Placeholder copy for now.",
  links: {
    spotify: "#",
    apple: "#",
    youtube: "#",
  },
}))

export default function NeurONAirPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">NeurON Air</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Conversations with guests in neurotech. Each episode section includes a guest image and streaming links.
          </p>
        </div>
      </section>

      {/* Episodes list */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-10">
          {episodes.map((e, i) => (
            <article key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center rounded-2xl border border-border bg-card p-6">
              {/* Left: image */}
              <div className="md:col-span-1">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image src={e.image} alt={e.guest} fill className="object-cover" />
                </div>
              </div>
              {/* Right: content */}
              <div className="md:col-span-2 flex flex-col h-full">
                <h2 className="text-2xl font-light mb-1">{e.title}</h2>
                <p className="text-muted-foreground mb-4">{e.description}</p>
                <div className="mt-auto flex items-center gap-3">
                  <a href={e.links.spotify} className="text-purple-600 hover:underline text-sm">Spotify</a>
                  <a href={e.links.apple} className="text-purple-600 hover:underline text-sm">Apple Podcasts</a>
                  <a href={e.links.youtube} className="text-purple-600 hover:underline text-sm">YouTube</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
