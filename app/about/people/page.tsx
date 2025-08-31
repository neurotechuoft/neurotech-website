"use client"

import Link from "next/link"
import Image from "next/image"
import TopNav from "@/components/top-nav"

const people = Array.from({ length: 12 }).map((_, i) => ({
  id: `person-${i + 1}`,
  name: `Person ${i + 1}`,
  role: i === 0 ? "President" : i === 1 ? "VP Research" : "Member",
  program: "BASc, UofT",
  image: "/next.svg", // placeholder
}))

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <div className="pt-28 px-6 pb-16">
      <section className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Leadership</span>
        </h1>
        <p className="text-muted-foreground">Leadership-style grid. Click a person to view their page.</p>
      </section>

  <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((p) => (
            <Link key={p.id} href={`/about/people/${p.id}`} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition">
              <div className="relative aspect-[4/5]">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-light">{p.name}</h3>
                <p className="text-primary text-xs">{p.role}</p>
                <p className="text-muted-foreground text-xs">{p.program}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
  </div>
    </main>
  )
}
