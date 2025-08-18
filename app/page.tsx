"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Zap, Microscope } from "lucide-react"

import TopNav from "@/components/top-nav"
import HeroSlideshow from "@/components/hero-slideshow"
import Footer from "@/components/footer"
import { getUpcomingEvents } from "@/lib/events"

export default function NeuroTechWebsite() {
  // Reveal hero text and show nav immediately (no intro lock)
  const showText = true

  useEffect(() => {
    // Force scroll to top on page load/reload
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Also set it after a small delay to ensure it takes effect
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  // Brain-image overlay effect (previously gated by intro); run always
  useEffect(() => {
    const handleBrainOverlay = () => {
      const footerSection = document.querySelector('footer')
      const joinSection = document.getElementById('join')
      const overlay = document.getElementById('brain-overlay')
      const brainImage = document.getElementById('brain-image')
      if (footerSection && joinSection && overlay && brainImage) {
        const joinRect = joinSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const joinVisibleEnd = Math.max(0, windowHeight - joinRect.top)
        const joinTotalVisible = Math.min(joinVisibleEnd, joinRect.height)
        const joinVisiblePercentage = Math.max(0, Math.min(joinTotalVisible / joinRect.height, 1))
        const revealProgress = Math.min(joinVisiblePercentage * 1.2, 1)
        const easedProgress = revealProgress * revealProgress * (3 - 2 * revealProgress)
        ;(brainImage as HTMLElement).style.clipPath = `inset(${100 - (easedProgress * 100)}% 0 0 0)`
        const scaleProgress = 1.8 + (easedProgress * 0.4)
        ;(brainImage as HTMLElement).style.transform = `scale(${scaleProgress})`
        const hueRotate = easedProgress * 260
        const brightness = 1.5 - (easedProgress * 0.8)
        const saturation = 0.3 + (easedProgress * 1.2)
        const contrast = 1.2 + (easedProgress * 0.3)
        ;(brainImage as HTMLElement).style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`
        ;(brainImage as HTMLElement).style.opacity = `${0.6 + (easedProgress * 0.3)}`
        const isDarkTheme = document.documentElement.classList.contains('dark')
        const purpleIntensity = Math.min(easedProgress * 1.3, 1)
        const blueIntensity = Math.min(easedProgress * 1.1, 1)
        const baseAlpha = isDarkTheme ? (0.75 - purpleIntensity * 0.18) : (0.25 - purpleIntensity * 0.08)
        const purpleAlpha = isDarkTheme ? (0.38 + purpleIntensity * 0.28) : (0.22 + purpleIntensity * 0.18)
        const blueAlpha = isDarkTheme ? (0.28 + blueIntensity * 0.36) : (0.18 + blueIntensity * 0.22)
        ;(overlay as HTMLElement).style.background = `linear-gradient(135deg,
          rgba(0,0,0,${Math.max(0, baseAlpha)}) 0%,
          rgba(139,69,193,${Math.min(1, purpleAlpha)}) 50%,
          rgba(59,130,246,${Math.min(1, blueAlpha)}) 100%)`
      }
    }
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) {
      window.addEventListener('scroll', handleBrainOverlay, { passive: true })
      handleBrainOverlay()
    }
    return () => {
      window.removeEventListener('scroll', handleBrainOverlay)
    }
  }, [])

  // Scroll animations for About section
  useEffect(() => {
    const handleScrollAnimations = () => {
      const aboutSection = document.getElementById('about')
      if (!aboutSection) return

      const rect = aboutSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const triggerPoint = windowHeight * 0.8 // Trigger when section is 80% visible

      if (rect.top < triggerPoint && rect.bottom > 0) {
        // Add animation classes when section is in view
        const leftElements = aboutSection.querySelectorAll('[data-animate="slideInLeft"]')
        const rightElements = aboutSection.querySelectorAll('[data-animate="slideInRight"]')
        const scaleElements = aboutSection.querySelectorAll('[data-animate="scaleX"]')

        leftElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('translate-x-0', 'opacity-100')
            el.classList.remove('translate-x-[-100px]', 'opacity-0')
          }, index * 200)
        })

        rightElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('translate-x-0', 'opacity-100')
            el.classList.remove('translate-x-[100px]', 'opacity-0')
          }, index * 200)
        })

        scaleElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('scale-x-100')
            el.classList.remove('scale-x-0')
          }, index * 100 + 500)
        })
      }
    }

    // Set initial states
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const leftElements = aboutSection.querySelectorAll('[data-animate="slideInLeft"]')
      const rightElements = aboutSection.querySelectorAll('[data-animate="slideInRight"]')
      const scaleElements = aboutSection.querySelectorAll('[data-animate="scaleX"]')

      leftElements.forEach(el => {
        el.classList.add('translate-x-[-100px]', 'opacity-0')
      })

      rightElements.forEach(el => {
        el.classList.add('translate-x-[100px]', 'opacity-0')
      })

      scaleElements.forEach(el => {
        el.classList.add('scale-x-0')
      })
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) {
      window.addEventListener('scroll', handleScrollAnimations, { passive: true })
      handleScrollAnimations() // Check on mount
    } else {
      // On mobile, skip heavy transforms; show elements immediately
      const about = document.getElementById('about')
      if (about) {
        about.querySelectorAll('[data-animate]')
          .forEach((el) => {
            el.classList.remove('opacity-0', 'translate-x-[100px]', 'translate-x-[-100px]', 'scale-x-0')
            el.classList.add('opacity-100', 'translate-x-0', 'scale-x-100')
          })
      }
    }

    return () => {
  window.removeEventListener('scroll', handleScrollAnimations)
    }
  }, [])

  return (
  <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
  {showText && <TopNav />}
      {/* Hero Section with slideshow */}
  <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        {/* Background slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <HeroSlideshow
            slides={[
              { type: 'video', src: '/brain-loop.mp4', alt: 'Brain animation' },
              { type: 'image', src: '/brain-wallpaper.jpg', alt: 'Brain wallpaper 1' },
              { type: 'image', src: '/brain-wallpaper.jpg', alt: 'Brain wallpaper 2' },
              { type: 'image', src: '/brain-wallpaper.jpg', alt: 'Brain wallpaper 3' },
            ]}
            intervalMs={5000}
          />
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-foreground">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NeuroTechUofT
            </span>
          </h1>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold shadow-lg">
              Celebrating 10 Years
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Join the next generation of neurotechnology and neuroscience enthusiasts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="inline-flex items-center rounded-md px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-primary-foreground border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light">
              View Events
            </Link>
            <Link href="/projects" className="inline-flex items-center rounded-md px-6 py-3 border border-purple-400/50 text-purple-500 hover:bg-purple-600/10 transition">
              Explore Projects
            </Link>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-6 h-6 border-2 border-purple-400 rounded-full mx-auto animate-bounce cursor-pointer hover:border-white transition-colors duration-300"
            />
          </div>
        </div>

        {/* Gradient fade to next section */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* About Section */}
  <section id="about" className="relative z-10 py-32 px-6 bg-background">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="transform transition-all duration-1000 ease-out" data-animate="slideInLeft">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-wider text-purple-400 font-light">
                ABOUT US
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mt-2 transform origin-left transition-all duration-700 ease-out" data-animate="scaleX"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground leading-tight">
              Advancing Brain-Computer 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Interfaces from the Lab.
              </span>
              </h2>              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
At NeuroTechUofT, we are pioneering innovation in neurotechnology by merging engineering and neuroscience to create meaningful change. Through partnerships with top organizations, we spark conversations that make neurotechnology accessible and impactful for undergraduates.
              </p>
              
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Join us as we shape the future of neurotechnology with passion, collaboration, and innovation at UofT Engineering.
              </p>
              
              <Link href="/about" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-primary-foreground px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">Learn More</Link>
            </div>
            
            {/* Right Column - Content */}
            <div className="space-y-8 transform transition-all duration-1000 ease-out" data-animate="slideInRight">
              <div className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border p-8 transform transition-all duration-700 ease-out hover:scale-105 hover:border-purple-500/40">
                <h3 className="text-xl font-light text-foreground mb-4">
                  Innovation at the Intersection
                </h3>
                <p className="text-muted-foreground leading-relaxed">
Our flagship project, NeuronMove, is a groundbreaking initiative to combat Parkinson&apos;s disease tremors through cutting-edge bioprosthetics and brain-wave technologies.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6 text-center transform transition-all duration-500 ease-out hover:scale-105 hover:border-purple-400/50">
                  <div className="text-3xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <p className="text-sm text-muted-foreground">Research Projects</p>
                </div>
                
                <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6 text-center transform transition-all duration-500 ease-out hover:scale-105 hover:border-blue-400/50" style={{ transitionDelay: '0.2s' }}>
                  <div className="text-3xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    200+
                  </div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Upcoming Events (teaser) */}
    <section id="events" className="relative z-10 py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-purple-400 font-light">What&apos;s happening</span>
          <h2 className="text-4xl md:text-5xl font-light mt-3">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join us for workshops, talks, and mixers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {getUpcomingEvents(2).map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}`} className="block bg-card/60 border border-border rounded-2xl p-6 hover:border-purple-500/50 transition">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  e.type === "Workshop" || e.type === "Project Demo" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"
                }`}>{e.type}</span>
                <span className="text-muted-foreground text-sm">{new Date(e.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-light mb-2">{e.title}</h3>
              <p className="text-muted-foreground text-sm">{e.summary}</p>
              {(e.location || e.time) && (
                <p className="text-xs text-muted-foreground mt-3">{e.location}{e.location && e.time ? " • " : ""}{e.time}</p>
              )}
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/events" className="inline-flex items-center rounded-md px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-primary-foreground border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light">View all events →</Link>
        </div>
      </div>
    </section>

      {/* Featured Projects Section */}
  <section className="relative z-10 py-32 px-6 bg-background">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-blue-400 font-light">
                FEATURED PROJECTS
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight mb-8">
              Breakthrough 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Research
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our cutting-edge projects that are pushing the boundaries of neurotechnology and transforming lives.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - 10,000x Flexibility */}
            <div className="space-y-8">
              <div className="border-l-4 border-purple-400 pl-8">
                <h3 className="text-6xl md:text-7xl font-light text-foreground mb-4">
                  10,000x
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  softer than today&apos;s flexible electronics
                </p>
              </div>
              
              {/* Hardware Image Placeholder */}
              <div className="bg-card/60 rounded-2xl p-8 border border-border/80">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Microscope className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Flexible Neural Interface Hardware</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 1,000x Electrode Density */}
            <div className="space-y-8">
              <div className="border-l-4 border-blue-400 pl-8">
                <h3 className="text-6xl md:text-7xl font-light text-foreground mb-4">
                  1,000x
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  greater electrode density than soft probes on the market
                </p>
              </div>
              
              {/* Electrode Array Image Placeholder */}
              <div className="bg-card/60 rounded-2xl p-8 border border-border/80">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Ultra-Dense Electrode Array</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="inline-flex bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-500 hover:text-foreground border border-blue-500/30 hover:border-blue-400 px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105">
              Explore All Projects →
            </Link>
            <Link href="/events" className="inline-flex border border-purple-400/50 text-purple-500 hover:bg-purple-600/10 px-8 py-3 rounded-lg font-light transition-all duration-300">
              Go to Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Join Us and Footer Container with Brain Circuit Background */}
      <div className="relative">
        {/* Gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
        
  {/* No background image or overlay effect */}

        {/* Join Us Section */}
        <section id="join" className="relative z-10 py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-foreground">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Be part of the next generation of innovators shaping the future of neurotechnology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="text-purple-500 hover:text-foreground transition-colors duration-300 text-sm uppercase tracking-wide">Get Involved →</Link>
              <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm uppercase tracking-wide">View Projects →</Link>
            </div>
          </div>
        </section>

  {/* Footer */}
  <Footer />
      </div>
    </div>
  )
}
