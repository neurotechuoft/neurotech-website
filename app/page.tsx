"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Users, Microscope, ArrowRight, Github, Mail, MapPin, Calendar } from "lucide-react"

function FullPageParallax() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const fgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !bgRef.current || !fgRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1)

      bgRef.current.style.transform = `translateY(${(progress * 30).toFixed(2)}px)`
      fgRef.current.style.transform = `translateY(${(-progress * 60).toFixed(2)}px)`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="parallaxPage"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(20,30,60,0.6) 0%, rgba(10,10,30,1) 80%)", filter: "blur(40px)" }}
        />
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h2 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Deep Motion
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Scroll to reveal connections. Layers shift independently to give depth and meaning.
          </p>
          <div
            ref={fgRef}
            className="mx-auto w-full flex justify-center gap-8 flex-wrap"
          >
            <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 w-60">
              <Image 
                src="/logo.png" 
                alt="Neural signal layers" 
                width={40} 
                height={40} 
                className="w-10 h-10 mx-auto mb-2"
              />
              <p className="text-center text-sm">Neural signal layers</p>
            </div>
            <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 w-60">
              <Zap className="w-10 h-10 text-purple-300 mb-2 mx-auto" />
              <p className="text-center text-sm">Dynamic modulation</p>
            </div>
            <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 w-60">
              <Users className="w-10 h-10 text-pink-300 mb-2 mx-auto" />
              <p className="text-center text-sm">Collaborative layers</p>
            </div>
          </div>
        </div>
      </div>
      {/* spacer so scrolling consumes full height */}
      <div className="absolute bottom-0 w-full h-[200vh]" aria-hidden="true" />
    </section>
  )
}

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
      window.addEventListener('touchmove', preventTouchMove, { passive: false })
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
        const overlay = document.getElementById('brain-overlay')
        const brainImage = document.getElementById('brain-image')
        
        if (footerSection && overlay && brainImage) {
          const rect = footerSection.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          // Calculate how much of the footer is visible
          const visibleStart = Math.max(0, windowHeight - rect.bottom)
          const visibleEnd = Math.max(0, windowHeight - rect.top)
          const totalVisible = Math.min(visibleEnd, rect.height)
          const visiblePercentage = Math.max(0, Math.min(totalVisible / rect.height, 1))
          
          // Top-down reveal effect - reveal from top to bottom
          const revealProgress = Math.min(visiblePercentage * 1.5, 1)
          brainImage.style.clipPath = `inset(${100 - (revealProgress * 100)}% 0 0 0)`
          
          // Scale up the image as it reveals
          const scaleProgress = 1.8 + (revealProgress * 0.6) // Scale from 1.8 to 2.4
          brainImage.style.transform = `scale(${scaleProgress})`
          
          // Color transition from white to purple
          const hueRotate = revealProgress * 280 // 0 to 280 degrees (white to purple)
          const brightness = 2 - (revealProgress * 1.5) // 2 to 0.5 (bright white to normal)
          const saturation = revealProgress * 1.5 // 0 to 1.5 (desaturated to saturated)
          brainImage.style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness}) saturate(${saturation})`
          
          // Transition overlay from dark to purple
          const purpleIntensity = Math.min(visiblePercentage * 1.5, 1)
          overlay.style.background = `linear-gradient(135deg, 
            rgba(0,0,0,${0.8 - purpleIntensity * 0.3}) 0%, 
            rgba(139,69,193,${0.3 + purpleIntensity * 0.4}) 100%)`
        }
      }

      window.addEventListener('scroll', handleBrainOverlay, { passive: true })
      // Initial call to set correct overlay state
      handleBrainOverlay()

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

    window.addEventListener('scroll', handleScrollAnimations, { passive: true })
    handleScrollAnimations() // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScrollAnimations)
    }
  }, [showText])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      {showText && (
        <nav className="fixed inset-x-0 top-0 z-50 animate-in fade-in duration-1000">
          <div className="w-full bg-black/10 backdrop-blur-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/logo.png" 
                  alt="Neurotech UofT Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Neurotech UofT
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-white/80 hover:text-purple-400 transition-all duration-300 relative group">
                  About
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="#projects" className="text-white/80 hover:text-purple-400 transition-all duration-300 relative group">
                  Projects
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="#partnerships" className="text-white/80 hover:text-purple-400 transition-all duration-300 relative group">
                  Partnerships
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="#join" className="text-white/80 hover:text-purple-400 transition-all duration-300 relative group">
                  Join Us
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </div>
              <Button className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                Contact
              </Button>
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
            className={`w-full h-full object-cover transition-all duration-1000 ${
              videoEnded ? "opacity-40" : "opacity-100"
            }`}
          >
            <source src="/brain-loop.mp4" type="video/mp4" />
          </video>
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              videoEnded
                ? "bg-black/70"
                : "bg-black/10"
            }`}
          />
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Neurotech UofT
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8">
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
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
                <span className="text-sm uppercase tracking-wider text-purple-400 font-medium">
                  ABOUT US
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mt-2 transform origin-left transition-all duration-700 ease-out" data-animate="scaleX"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Advancing Brain-Computer 
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}Interfaces from the Lab.
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With cutting-edge research in neural engineering, we can decode brain signals as complex 
                as motor intentions and cognitive states, transmitting breakthrough discoveries to advance 
                neurotechnology applications in real-time.
              </p>
              
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                From 5-microvolt signals in the lab to 50-millivolt applications in the field, our research 
                spans the entire spectrum of neural interface development.
              </p>
              
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                Learn More
              </Button>
            </div>
            
            {/* Right Column - Content */}
            <div className="space-y-8 transform transition-all duration-1000 ease-out" data-animate="slideInRight">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 transform transition-all duration-700 ease-out hover:scale-105 hover:border-purple-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Innovation at the Intersection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We bridge the gap between cutting-edge engineering and neuroscience, creating solutions that transform
                  lives and push the boundaries of what's possible in brain-computer interface technology.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900/20 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6 text-center transform transition-all duration-500 ease-out hover:scale-105 hover:border-purple-400/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <p className="text-sm text-gray-400">Research Projects</p>
                </div>
                
                <div className="bg-gray-900/20 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6 text-center transform transition-all duration-500 ease-out hover:scale-105 hover:border-blue-400/50" style={{ transitionDelay: '0.2s' }}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    200+
                  </div>
                  <p className="text-sm text-gray-400">Active Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            NeuronMove
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            A groundbreaking initiative to combat Parkinson's disease tremors through cutting-edge bioprosthetics
            and brain-wave technologies.
          </p>
          
          <button className="text-purple-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wide">
            Learn More →
          </button>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
            Strategic Partnerships
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Through partnerships with top organizations, we spark conversations that make neurotechnology accessible and
            impactful for undergraduates.
          </p>
        </div>
      </section>

      {/* Join Us and Footer Container with Brain Circuit Background */}
      <div className="relative">
        {/* Background Image with Top-Down Reveal Effect */}
        <div className="fixed inset-0 z-0">
          {/* Single Brain Image */}
          <div 
            id="brain-image"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-out"
            style={{ 
              backgroundImage: 'url(/brain-wallpaper.jpg)',
              clipPath: 'inset(100% 0 0 0)',
              transform: 'scale(1.8)',
              filter: 'hue-rotate(0deg) brightness(2) saturate(0)'
            }}
          />
          <div 
            id="brain-overlay"
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,193,0.3) 100%)'
            }}
          />
        </div>

        {/* Join Us Section */}
        <section id="join" className="relative z-10 py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Be part of the next generation of innovators shaping the future of neurotechnology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="text-purple-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wide">
                Get Involved →
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wide">
                View Projects →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-16 px-6 border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Image 
                src="/logo.png" 
                alt="Neurotech UofT Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6"
              />
              <span className="text-lg font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Neurotech UofT
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              &copy; 2024 Neurotech UofT. Pioneering the future of neurotechnology.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
