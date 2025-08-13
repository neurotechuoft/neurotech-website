"use client"

import TopNav from "@/components/top-nav"

const modules = [
  { title: "BCI 101", description: "Crash course on brain-computer interfaces (signals, hardware, decoding)." },
  { title: "Signal Processing Basics", description: "Filters, FFT, feature extraction for EEG/EMG (intro level)." },
  { title: "Machine Learning for Neuro", description: "From features to classifiers, cross-validation, pitfalls." },
  { title: "Ethics & Accessibility", description: "Responsible neurotech, safety, inclusion, and human factors." },
]

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Education</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Crash-course materials for students getting started in neurotechnology.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-light mb-1">{m.title}</h2>
              <p className="text-muted-foreground text-sm">{m.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
