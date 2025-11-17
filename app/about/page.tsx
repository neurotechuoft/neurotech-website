"use client"

import { useEffect } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import TopNav from "@/components/top-nav"
import Footer from "@/components/footer"

export default function AboutPage() {
  // Scroll animations for sections
  useEffect(() => {
    const handleScrollAnimations = () => {
      const sections = document.querySelectorAll('[data-animate]')
      const windowHeight = window.innerHeight
      const triggerPoint = windowHeight * 0.8

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top < triggerPoint && rect.bottom > 0) {
          section.classList.add('opacity-100', 'translate-y-0')
          section.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }

    // Set initial states
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-1000')
    })

    window.addEventListener('scroll', handleScrollAnimations, { passive: true })
    handleScrollAnimations() // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScrollAnimations)
    }
  }, [])

  const subsystems = [
    {
      title: "Hardware",
      desc: "Building embedded signal-acquisition devices, actuators, and wearable systems that bring intent-driven movement to life.",
      icon: "🛠️",
      accent: "from-purple-400 via-fuchsia-400 to-blue-400"
    },
    {
      title: "Software",
      desc: "Developing real-time signal processing pipelines, machine learning models, and adaptive control algorithms.",
      icon: "💻",
      accent: "from-blue-400 via-cyan-400 to-emerald-400"
    },
    {
      title: "Neuroscience",
      desc: "Ensuring physiological accuracy, clinical relevance, and alignment with translational research goals.",
      icon: "🧠",
      accent: "from-pink-400 via-purple-400 to-indigo-400"
    }
  ]
  const corePrinciples = [
    { title: "Think From First Principles", desc: "Don’t copy. Don’t assume. When faced with a challenge, break it down into smaller problems. Identify what’s known, isolate what isn’t, and reason up with fundamentals from the ground.", accent: "from-purple-400/40 via-blue-400/30 to-transparent" },
    { title: "Challenge Ideas, Not People", desc: "Debate is welcome, but egos aren’t. The best ideas win, not the loudest voices. Every voice matters, but professionalism is non-negotiable.", accent: "from-amber-400/40 via-orange-400/20 to-transparent" },
    { title: "Facts > Feelings, but Instinct Always Wins", desc: "Lead with common sense, reasoning, and data. But when the evidence runs out and decisions still need to be made, listen to others, then trust your gut and move on.", accent: "from-slate-200/30 via-slate-400/20 to-transparent" },
    { title: "Commit to the Process", desc: "Great engineering may come with trade-offs: time, comfort, or certainty. Progress often requires stretching beyond what feels easy, but never expect to carry the weight alone. Ask for support when in need. Take pride in the growth that comes with working together as a team.", accent: "from-yellow-300/40 via-amber-400/30 to-transparent" },
    { title: "You’re measured at your worst, not your best", desc: "It’s easy to be focused when things are smooth. But who we are shows up during the most stressful week of the year, when everything breaks and pressure peaks.", accent: "from-emerald-300/40 via-teal-300/30 to-transparent" },
    { title: "The Most Dangerous Word in Our Dictionary: Bureaucracy", desc: "Process matters, but progress matters more. Skip unnecessary chains of command if they exist, and don’t create hierarchy where it isn’t needed. Minimize meetings and regulations to maximize creative independence. We care about getting things done, not protocol for protocol’s sake.", accent: "from-cyan-300/40 via-blue-400/30 to-transparent" },
    { title: "Think Beyond Limits, Build Within Reach", desc: "It’s good to aim higher than what seems realistic. Every breakthrough began as a “what if.” Be bold when imagining what’s possible, and realistic when planning how to get there. Balancing vision with pragmatism is what drives true progress.", accent: "from-pink-300/40 via-rose-400/30 to-transparent" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto px-4">
We are the only group of ambitious undergraduate students at the University of Toronto that's obsessed with educating and engineerng neurotechnology projects to benefit the greater university & Toronto community.          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GradientButton href="/about/people" variant="ghost">The Tenth Leadership</GradientButton>
            <GradientButton href="/about/team" variant="ghost">Teams</GradientButton>
            <GradientButton href="/about/portfolio" variant="ghost">Portfolio</GradientButton>
          </div>
          
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-6 h-6 border-2 border-purple-400 rounded-full mx-auto animate-bounce cursor-pointer hover:border-white transition-colors duration-300"
            />
          </div>
        </div>
        
        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
      </section>
      {/* Our Story Section */}
      <section id="story" className="relative py-32 px-6 bg-background" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story Content */}
            <div className="relative z-10">
              <div className="mb-6">
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-foreground leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}Origin
                </span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
For nearly a decade, NeurotechUofT has been shaping the landscape of undergraduate neuroengineering at the University of Toronto. What began in 2016 as a small group of students experimenting with EEG boards and early brain–computer interface workshops has grown into one of Toronto's most active and enduring student-run neurotechnology communities.                </p>
              </div>
              <div className="mt-10">
              </div>
            </div>
            
            {/* Right Column - Timeline */}
            <div className="relative">
              <div className="relative border-l-2 border-purple-400/30 pl-8 space-y-8">
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="text-sm text-purple-400 font-light mb-2">2016</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Foundation</h3>
                  <p className="text-muted-foreground">NeurotechUofT began quietly in 2016, started by a small group of students who simply wanted to learn more about brain–computer interfaces. There was no roadmap, no grand plan; just curiosity, a couple of OpenBCI boards, and a desire to build things together.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-blue-400 rounded-full"></div>
                  <div className="text-sm text-blue-400 font-light mb-2">2017–2022</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Early NTX Era: Small, Fun, Experimental Projects</h3>
                  <p className="text-muted-foreground">Early NTX Era: Small, Fun, Experimental Projects
The team develops small but creative North American NeuroTechX (NTX) competition submissions each year. These projects, fun, lightweight, and exploratory, become annual traditions that help students learn signal processing, EMG/EEG acquisition, and prototyping in a low-stakes environment.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="text-sm text-purple-400 font-light mb-2">2023</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Last NTX ProjectProsthetic Hand Exoskeleton</h3>
                  <p className="text-muted-foreground">NeurotechUofT takes a significant step forward with its first full-scale engineering system: an EMG-controlled prosthetic hand exoskeleton for the NTX Student Competition. This marked a shift from recreational projects toward more rigorous, structured design.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <div className="text-sm text-blue-400 font-light mb-2">2024</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Major Revamp: New Identity, New Direction</h3>
                  <p className="text-muted-foreground">NeurotechUofT undergoes a major rebranding and structural revamp, divesting from the NeuroTechX competition after eight years. The team redefines its mission and vision, shifting from short-term student projects to long-term neuroengineering impact. This year marks the transition from a competition-focused club to a research- and innovation-driven organization, setting the foundation for sustained growth and academic contribution. NeurotechUofT launches NeuronMove v1, its largest project to date: a closed-loop neurotechnology system designed to detect Parkinsonian tremors and akinesia and stabilize movement using EMG/EEG-driven actuation.</p>
                </div>
                    <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <div className="text-sm text-blue-400 font-light mb-2">Today</div>
                  <h3 className="text-xl font-light text-foreground mb-2">The Most Active and Significant Evolution in Our History
</h3>
                  <p className="text-muted-foreground">2025 marks the most transformative year NeurotechUofT has ever experienced. The team doubles in size and adopts a more rigorous recruitment standard, and officially opening its doors to highly engaged Master's & PhD Students. 

With the introduction of the 7 Core Principles, NeurotechUofT strengthens its identity around first-principles reasoning, accountability, and high technical standards. This new culture sets the stage for launching two major R&D projects: NeuronMove v2, an advanced continuation of our Parkinson’s closed-loop system, and the Post-Stroke Rehabilitation (PSR) Project with UTMIST, expanding our work into neurorehabilitation. These initiatives, alongside deepened affiliations with the Krembil Brain Institute and SickKids, elevate NTUT’s visibility among clinicians, neuroscientists, and neurosurgeons, creating new pathways for students to contribute to impactful academic research and published scientific work.

Beyond R&D, the Community & Education Arm is fully rebuilt, expanding workshops, clinical observorships, pipelines, and learning programs for both undergraduate and graduate members. NeurotechUofT also officially launches its podcast as a full-scale initiative, amplifying our presence in the broader neurotechnology community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 px-6 overflow-hidden" data-animate>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
                        <div className="mb-6">            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Mission
              </span>
            </h2>
            <blockquote className="text-xl text-muted-foreground italic max-w-4xl mx-auto leading-relaxed">
              &quot;NeurotechUofT’s mission is to empower students to design neuroengineering technologies that create real, measurable impact in healthcare. As U of T’s only student design team dedicated exclusively to neuroengineering, we bring together engineering, neuroscience, and clinical insight to develop systems that advance human function: from biosignal-driven prosthetics to neuromodulation-inspired assistive devices. Through collaborations with the Krembil Brain Institute, UHN, SickKids, and the Institute of Biomedical Engineering, we offer students observerships, mentorship, and hands-on exposure to clinical and academic environments. At NTUT, students don’t just learn about the brain, they engineer solutions for it. &quot;
            </blockquote>
<div className="mt-6 text-sm uppercase tracking-[0.3em] text-purple-200/80">Our work spans three tightly integrated subsystems</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {subsystems.map(system => (
              <div key={system.title} className="group relative">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${system.accent} opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-50`}></div>
                <div className="relative h-full rounded-3xl bg-card/80 backdrop-blur-2xl border border-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/15">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${system.accent} flex items-center justify-center text-2xl`}>
                      <span>{system.icon}</span>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground opacity-70">Subsystem</p>
                      <h3 className="text-2xl font-light text-foreground">{system.title}</h3>
                    </div>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{system.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="relative py-32 px-6 bg-background" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-purple-400 font-light">Our Values</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight">
              Core
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Principles
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePrinciples.map((principle, index) => (
              <div key={principle.title} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-card/70 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${principle.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
                <div className="relative flex flex-col h-full items-center justify-between gap-4">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/80">Principle</p>
                  <h3 className="text-lg sm:text-xl font-light text-foreground">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{principle.desc}</p>
                  <div className="mt-6 h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-xs tracking-widest text-white/50 uppercase">0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
