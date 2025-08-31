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
            We are an interdisciplinary team advancing brain–computer interfaces and neurotechnology at the University of Toronto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GradientButton href="/about/people" variant="ghost">Leadership</GradientButton>
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
                  For a decade, NeurotechUofT has been at the forefront of student-led innovation in neurotechnology. We&apos;ve grown from a small group of enthusiasts to a vibrant community of over 200 members.
                </p>
              </div>
              <div className="mt-10">
                <GradientButton href="/about/people">Meet Our Team</GradientButton>
              </div>
            </div>
            
            {/* Right Column - Timeline */}
            <div className="relative">
              <div className="relative border-l-2 border-purple-400/30 pl-8 space-y-8">
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="text-sm text-purple-400 font-light mb-2">2018</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Foundation</h3>
                  <p className="text-muted-foreground">NeurotechUofT is founded by students inspired by brain-computer interfaces.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-blue-400 rounded-full"></div>
                  <div className="text-sm text-blue-400 font-light mb-2">2019</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">First interdisciplinary workshop sparks cross-field collaboration.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="text-sm text-purple-400 font-light mb-2">2020</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Research</h3>
                  <p className="text-muted-foreground">Launch of student-led research projects and outreach initiatives.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <div className="text-sm text-blue-400 font-light mb-2">Today</div>
                  <h3 className="text-xl font-light text-foreground mb-2">Innovation</h3>
                  <p className="text-muted-foreground">A thriving community driving curiosity, innovation, and accessible neurotechnology.</p>
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
                        <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-purple-400 font-light">Vision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Our Mission
              </span>
            </h2>
            <blockquote className="text-xl text-muted-foreground italic max-w-4xl mx-auto leading-relaxed">
              &quot;We believe that the intersection of neuroscience and technology holds unprecedented potential to enhance human capabilities, treat neurological conditions, and unlock new frontiers of understanding.&quot;
            </blockquote>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Interdisciplinary Collaboration</h3>
              <p className="text-muted-foreground leading-relaxed">Bridging neuroscience, engineering, and computer science to tackle complex challenges.</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Innovation in Neuroscience</h3>
              <p className="text-muted-foreground leading-relaxed">Pioneering cutting-edge research and development in neurotechnology.</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Ethical & Accessible Tech</h3>
              <p className="text-muted-foreground leading-relaxed">Ensuring neurotechnology benefits everyone through responsible development.</p>
            </div>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🔬", title: "Scientific Rigor", desc: "Evidence-based research and methodical approach" },
              { icon: "🤝", title: "Collaboration", desc: "Breaking silos across disciplines" },
              { icon: "⚖️", title: "Ethics & Access", desc: "Responsible and inclusive technology" },
              { icon: "💡", title: "Impact Innovation", desc: "Solutions that make a real difference" },
              { icon: "🌍", title: "Community Focus", desc: "Engaging and serving our community" },
              { icon: "📖", title: "Transparency", desc: "Open science and shared knowledge" },
              { icon: "📚", title: "Lifelong Learning", desc: "Continuous growth and adaptation" },
              { icon: "👥", title: "Leadership", desc: "Responsible stewardship of technology" }
            ].map((principle, index) => (
              <div key={index} className="group bg-card/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border hover:bg-card/60 hover:scale-105 transition-all duration-500">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{principle.icon}</div>
                <h3 className="text-lg font-light text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
