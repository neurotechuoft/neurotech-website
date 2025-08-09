"use client"

import { Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const teamMembers = [
  { name: "Selen Bayram", role: "Co-President", department: "Executive Committee", specialization: "Community Leadership" },
  { name: "Shuntaro Wakamatsu", role: "Co-President", department: "Executive Committee", specialization: "Engineering Leadership" },
  { name: "Usman Wani", role: "Co-President", department: "Executive Committee", specialization: "Operations Leadership" },
  { name: "Matthew Chen", role: "VP Recruitment", department: "Operations", specialization: "Member Engagement" },
  { name: "Kyoko Lin", role: "VP Logistics", department: "Operations", specialization: "Event Coordination" },
  { name: "Derek Yu", role: "VP Admin", department: "Operations", specialization: "Administrative Systems" },
  { name: "Jean Jung", role: "VP Marketing", department: "Operations", specialization: "Brand & Communications" },
]

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-28 px-6 pb-16">
      <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Meet Our Leadership Team</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our dedicated executive team leads initiatives, coordinates projects, and fosters community growth at NeuroTechUofT.
        </p>
      </section>

      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((m) => (
            <div key={m.name} className="bg-card rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-colors">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-light mb-1">{m.name}</h3>
              <p className="text-primary text-sm mb-1">{m.role}</p>
              <p className="text-muted-foreground text-xs mb-1">{m.department}</p>
              <p className="text-muted-foreground/80 text-xs">{m.specialization}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
