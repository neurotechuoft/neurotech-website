"use client"

import Link from "next/link"
import Image from "next/image"
import TopNav from "@/components/top-nav"

type LeaderCard = {
  id: string
  name: string
  role: string
  program: string
  image: string
}

const people: LeaderCard[] = [
  { id: "usman", name: "Usman Wani", role: "Co-President", program: "Biomedical/Mechatronics Engineering 2T7", image: "/images/Usman.jpg" },
  { id: "shuntaro-wakamatsu", name: "Shuntaro Wakamatsu", role: "Co-President", program: "BASc 2T5 – Electrical & Computer Engineering", image: "/people/images/Shuntaro.jpg" },
  { id: "usman-wani", name: "Usman Wani", role: "Co-President", program: "BASc 2T4 – Mechatronics", image: "/people/images/Usman.jpg" },
  { id: "matthew-chen", name: "Matthew Chen", role: "VP Recruitment", program: "Computer Engineering 2T6", image: "/people/images/Matthew.jpg" },
  { id: "kyoko-lin", name: "Kyoko Lin", role: "VP Logistics", program: "Industrial Engineering 2T5", image: "/people/images/Kyoko.jpg" },
  { id: "derek-yu", name: "Derek Yu", role: "VP Administration", program: "Rotman Commerce 2T5", image: "/people/images/Derek.jpg" },
  { id: "jean-jung", name: "Jean Jung", role: "VP Marketing", program: "Computer Science 2T5", image: "/team/jean-jung.jpg" },
  { id: "noor-rahman", name: "Noor Rahman", role: "Director, Neuroscience", program: "Neuroscience & Physiology 2T5", image: "/team/noor-rahman.jpg" },
  { id: "julian-park", name: "Julian Park", role: "Director, Software R&D", program: "Engineering Science 2T4", image: "/team/julian-park.jpg" },
  { id: "ariel-sun", name: "Ariel Sun", role: "Director, Hardware Systems", program: "Mechanical Engineering 2T4", image: "/team/ariel-sun.jpg" },
  { id: "micah-fernandez", name: "Micah Fernandez", role: "Program Manager, Community & Education", program: "Psychology & Computer Science 2T5", image: "/team/micah-fernandez.jpg" },
  { id: "tara-nguyen", name: "Tara Nguyen", role: "Director, Partnerships", program: "Rotman Commerce 2T4", image: "/team/tara-nguyen.jpg" }
]

const defaultImage = "/next.svg"

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />
      <div className="pt-28 px-6 pb-16">
      <section className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">The Tenth Leadership </span>
        </h1>
        <p className="text-muted-foreground">2025 - 2026 </p>
      </section>

  <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((p) => {
            const imageSrc = p.image ?? defaultImage
            return (
              <Link key={p.id} href={`/about/people/${p.id}`} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition">
                <div className="relative aspect-[4/5]">
                  <Image src={imageSrc} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-light">{p.name}</h3>
                  <p className="text-primary text-xs">{p.role}</p>
                  <p className="text-muted-foreground text-xs">{p.program}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
  </div>
    </main>
  )
}
