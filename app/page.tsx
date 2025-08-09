"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Zap, Users, Microscope, ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NeuroTechWebsite() {
  const [videoEnded, setVideoEnded] = useState(false)
  const [showText, setShowText] = useState(false)

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

    // Prefer reduced motion or mobile: skip intro autoplay which can stall
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (reduceMotion || isMobile) {
      setVideoEnded(true)
      setShowText(true)
    }

    return () => clearTimeout(timer)
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    setTimeout(() => {
      setShowText(true)
    }, 500)
  }

  // Prevent scrolling until video ends
  useEffect(() => {
  if (!videoEnded) {
      // Disable scrolling
      document.body.style.overflow = 'hidden'
      
      // Prevent wheel events
      const preventScroll = (e: WheelEvent) => {
        e.preventDefault()
      }
      
      // Prevent touch scroll on mobile
      const preventTouchMove = (e: TouchEvent) => {
        e.preventDefault()
      }
      
      // Prevent arrow key scrolling
      const preventKeyScroll = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
          e.preventDefault()
        }
      }

      window.addEventListener('wheel', preventScroll, { passive: false })
      // Avoid preventing touchmove on mobile to reduce jank/freezes
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      if (!isMobile) {
        window.addEventListener('touchmove', preventTouchMove, { passive: false })
      }
      window.addEventListener('keydown', preventKeyScroll)

      return () => {
        document.body.style.overflow = 'unset'
  window.removeEventListener('wheel', preventScroll)
  window.removeEventListener('touchmove', preventTouchMove)
        window.removeEventListener('keydown', preventKeyScroll)
      }
    } else {
      // Re-enable scrolling and add brain circuit color transition
      document.body.style.overflow = 'unset'
      
      const handleBrainOverlay = () => {
        const footerSection = document.querySelector('footer')
        const joinSection = document.getElementById('join')
        const overlay = document.getElementById('brain-overlay')
        const brainImage = document.getElementById('brain-image')
        
        if (footerSection && joinSection && overlay && brainImage) {
          const joinRect = joinSection.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          // Calculate visibility based on join section
          const joinVisibleEnd = Math.max(0, windowHeight - joinRect.top)
          const joinTotalVisible = Math.min(joinVisibleEnd, joinRect.height)
          const joinVisiblePercentage = Math.max(0, Math.min(joinTotalVisible / joinRect.height, 1))
          
          // Smooth top-down reveal effect with easing
          const revealProgress = Math.min(joinVisiblePercentage * 1.2, 1)
          const easedProgress = revealProgress * revealProgress * (3 - 2 * revealProgress) // Smoothstep easing
          
          brainImage.style.clipPath = `inset(${100 - (easedProgress * 100)}% 0 0 0)`
          
          // Smoother scale transition
          const scaleProgress = 1.8 + (easedProgress * 0.4) // Scale from 1.8 to 2.2
          brainImage.style.transform = `scale(${scaleProgress})`
          
          // Enhanced color transition with multiple steps
          const hueRotate = easedProgress * 260 // 0 to 260 degrees (white to purple-blue)
          const brightness = 1.5 - (easedProgress * 0.8) // 1.5 to 0.7 (bright to normal)
          const saturation = 0.3 + (easedProgress * 1.2) // 0.3 to 1.5 (desaturated to saturated)
          const contrast = 1.2 + (easedProgress * 0.3) // 1.2 to 1.5 (normal to enhanced)
          
          brainImage.style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`
          brainImage.style.opacity = `${0.6 + (easedProgress * 0.3)}` // 0.6 to 0.9
          
          // Enhanced gradient overlay with smoother color transitions and theme awareness
          const purpleIntensity = Math.min(easedProgress * 1.3, 1)
          const blueIntensity = Math.min(easedProgress * 1.1, 1)
          const isDarkTheme = document.documentElement.classList.contains('dark')
          const baseAlpha = isDarkTheme ? (0.75 - purpleIntensity * 0.18) : (0.25 - purpleIntensity * 0.08)
          const purpleAlpha = isDarkTheme ? (0.38 + purpleIntensity * 0.28) : (0.22 + purpleIntensity * 0.18)
          const blueAlpha = isDarkTheme ? (0.28 + blueIntensity * 0.36) : (0.18 + blueIntensity * 0.22)

          overlay.style.background = `linear-gradient(135deg,
            rgba(0,0,0,${Math.max(0, baseAlpha)}) 0%,
            rgba(139,69,193,${Math.min(1, purpleAlpha)}) 50%,
            rgba(59,130,246,${Math.min(1, blueAlpha)}) 100%)`
        }
      }

      const isMobile = window.matchMedia('(max-width: 768px)').matches
      if (!isMobile) {
        window.addEventListener('scroll', handleBrainOverlay, { passive: true })
      }
      // Initial call to set correct overlay state
      if (!isMobile) handleBrainOverlay()

      return () => {
  window.removeEventListener('scroll', handleBrainOverlay)
      }
    }
  }, [videoEnded])

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
  }, [showText])

  return (
  <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      {showText && (
        <nav className="fixed inset-x-0 top-0 z-50 animate-in fade-in duration-1000">
          <div className="w-full bg-background/70 backdrop-blur-sm border-b border-border px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/logo.png" 
                  alt="NeuroTechUofT Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <span className="text-2xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  NeuroTechUofT
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-foreground/80 hover:text-purple-500 transition-all duration-300 relative group">
                  About Us
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="/projects" className="text-foreground/80 hover:text-purple-500 transition-all duration-300 relative group">
                  Projects
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="/contact" className="text-foreground/80 hover:text-purple-500 transition-all duration-300 relative group">
                  Contact Us
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="/community" className="text-foreground/80 hover:text-purple-500 transition-all duration-300 relative group">
                  Community
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle />
                <Button 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-primary-foreground border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light"
              >
                Contact
              </Button>
              </div>
              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}
      {/* Hero Section with Video Background */}
  <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        {/* Skip Button - only visible during video */}
        {!videoEnded && (
          <button
            onClick={handleVideoEnd}
            className="fixed top-6 right-6 z-50 bg-black/30 hover:bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            Skip Video
          </button>
        )}

        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0.7;
            }}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              videoEnded ? "opacity-40" : "opacity-100"
            }`}
          >
            <source src="/brain-loop.mp4" type="video/mp4" />
          </video>
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              videoEnded ? "bg-background/70" : "bg-background/10"
            }`}
          />
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight text-foreground">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NeuroTechUofT
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Join the next generation of neurotechnology and neuroscience enthusiasts.
          </p>

          <div className="mt-12 text-center">
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
              
              <a href="/about" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-primary-foreground px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">Learn More</a>
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

      {/* Upcoming Events Section */}
  <section className="relative z-10 py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-purple-400 font-light">
                WHAT&apos;S HAPPENING
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight mb-8">
              Upcoming 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join us for exciting workshops, seminars, and networking events that push the boundaries of neurotechnology.
            </p>
          </div>

          {/* Events Container with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('events-container');
                if (container) {
                  container.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card border border-border hover:border-purple-500/50 rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-purple-400" />
            </button>

            {/* Right Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('events-container');
                if (container) {
                  container.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card border border-border hover:border-purple-500/50 rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 hover:text-purple-400" />
            </button>

            {/* Scrollable Events Container */}
            <div 
              id="events-container"
              className="flex overflow-x-auto scrollbar-hide gap-8 pb-6 px-16" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Event Card 1 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-light">
                    Workshop
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    Mar 15, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  Brain-Computer Interface Fundamentals
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Learn the basics of BCI technology and explore hands-on applications in our state-of-the-art lab environment.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-3" />
                  Engineering Building
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-light">
                    Seminar
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    Mar 22, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  Neural Signal Processing in Action
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Deep dive into advanced signal processing techniques used in modern neurotechnology applications.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4 mr-3" />
                  6:00 PM - 8:00 PM
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-light">
                    Networking
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    Apr 5, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  Industry Connections Mixer
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Connect with industry professionals and explore career opportunities in neurotechnology.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="w-4 h-4 mr-3" />
                  50+ Attendees
                </div>
              </div>

              {/* Event Card 4 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-light">
                    Project Demo
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    Apr 12, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  NeuronMove Showcase
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  See our flagship project in action and learn about the latest developments in Parkinson&apos;s treatment.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Microscope className="w-4 h-4 mr-3" />
                  Live Demo
                </div>
              </div>

              {/* Event Card 5 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-light">
                    Conference
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    Apr 20, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  Future of Neurotechnology Summit
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Annual conference featuring keynote speakers from leading neurotechnology companies and research institutions.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ArrowRight className="w-4 h-4 mr-3" />
                  All Day Event
                </div>
              </div>

              {/* Event Card 6 */}
              <div className="flex-none w-80 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-light">
                    Workshop
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    May 3, 2024
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground mb-4 leading-tight">
                  Advanced Neural Interfaces
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Explore cutting-edge developments in neural interface technology and their clinical applications.
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-3" />
                  Medical Sciences Building
                </div>
              </div>
            </div>

            {/* Gradient fade indicators */}
            <div className="absolute left-16 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-16 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
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
          <div className="text-center mt-16">
            <a href="/projects" className="inline-flex bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-400 px-8 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105">
              Explore All Projects →
            </a>
          </div>
        </div>
      </section>

      {/* Join Us and Footer Container with Brain Circuit Background */}
      <div className="relative">
        {/* Gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
        
        {/* Background Image with Top-Down Reveal Effect */}
        <div className="fixed inset-0 z-0">
          {/* Single Brain Image */}
          <div 
            id="brain-image"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-out"
            style={{ 
              backgroundImage: 'url(/brain-wallpaper.jpg)',
              clipPath: 'inset(100% 0 0 0)',
              transform: 'scale(1.8)',
              filter: 'hue-rotate(0deg) brightness(1.5) saturate(0.3) contrast(1.2)',
              opacity: '0.6'
            }}
          />
          <div 
            id="brain-overlay"
            className="absolute inset-0 transition-all duration-1500 ease-out"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(139,69,193,0.35) 50%, rgba(59,130,246,0.25) 100%)'
            }}
          />
          {/* Additional overlay for smoother blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/40"></div>
        </div>

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
              <a href="/contact" className="text-purple-500 hover:text-foreground transition-colors duration-300 text-sm uppercase tracking-wide">Get Involved →</a>
              <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm uppercase tracking-wide">View Projects →</a>
            </div>
          </div>
        </section>

        {/* Footer */}
    <footer className="relative z-10 py-16 px-6 border-t border-border/80">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Image 
                src="/logo.png" 
                alt="NeuroTechUofT Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6"
              />
              <span className="text-lg font-extralight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NeuroTechUofT
              </span>
            </div>

      <p className="text-muted-foreground text-sm">
              &copy; 2025 NeuroTechUofT. Pioneering the future of neurotechnology.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
