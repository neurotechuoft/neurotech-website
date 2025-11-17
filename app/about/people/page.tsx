"use client"

import Link from "next/link"
import TopNav from "@/components/top-nav"
import Image, { type StaticImageData } from "next/image"
import usmanImage from "./images/Usman.jpg"
import robertImage from "./images/Robert.jpg"
import kyokoImage from "./images/Kyoko.jpg"
import emmaImage from "./images/Emma.jpg"
import advaithImage from "./images/Advaith.jpg"
import louiseImage from "./images/Louise.jpg"
import adityaImage from "./images/Aditya.jpg"
import ameliaImage from "./images/Amelia.jpg"
import amelyImage from "./images/Amely.jpg"
import marounImage from "./images/Maroun.jpg"
import catherineImage from "./images/Catherine.jpg"
import patriciaImage from "./images/Patricia.jpg"
import tuanaImage from "./images/Tuana.jpg"
import angelaImage from "./images/Angela.jpg"


type LeaderCard = {
  id: string
  name: string
  role: string
  program: string
  image: StaticImageData | string
}

const people: LeaderCard[] = [
  { id: "usman", name: "Usman Wani", role: "Co-President", program: "Biomedical/Mechatronics Engineering 2T7", image: usmanImage },
    { id: "robert", name: "Robert Youssef", role: "Co-President", program: "Biomedical/Mechatronics Engineering 2T7", image: robertImage },
  { id: "kyoko", name: "Kyoko Lin", role: "Co-President", program: "Neuroscience Specialist Third Year", image: kyokoImage },
  { id: "emma", name: "Emma Ding", role: "VP Logistics", program: "Neuroscience Specialist Third Year", image: emmaImage },
  { id: "advaith", name: "Advaith Gopaljee", role: "VP Finance", program: "Statistics Third Year", image: advaithImage },
  { id: "louise", name: "Louise Lee", role: "VP Marketing", program: "Visual Design - Daniels Third Year", image: louiseImage },
  { id: "aditya", name: "Aditya Mishra", role: "VP Outreach", program: "Industrial Engineering 2T7", image: adityaImage },
  { id: "amelia", name: "Amelia Wu", role: "NeuronMove-V2 Project Manager", program: "Bioinformatics Year 3", image: ameliaImage },
  { id: "amely", name: "Amely Vorontsov", role: "Post Stroke Rehab Manager", program: "Bioengineering + Mechatronics Engineering 2T7", image: amelyImage },
  { id: "maroun", name: "Maroun Fares", role: "NeuronMove-V2 Hardware Director", program: "Mechanical Engineering 2T6", image: marounImage },
  { id: "catherine", name: "Catherine Zhang", role: "Post Stroke Hardware Director", program: "Bioengineering + Mechatronics Engineering 2T7", image: catherineImage },
  { id: "patricia", name: "Patricia Watanabe", role: "NeuronMove-V2 Software Director", program: "PhD candidate", image: patriciaImage },
  { id: "tuana", name: "Tuana Agrikli", role: "NeuronMove-V2 Neuroscience Director", program: "Neuroscience Year 2", image: tuanaImage },
  { id: "angela", name: "Angela Jiang",  role: "Post Stroke Neuroscience Director", program: "Neuroscience + Cognitive Science Year 3", image: angelaImage },


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
