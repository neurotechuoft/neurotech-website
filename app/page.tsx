"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { GradientButton } from "@/components/ui/gradient-button"

import TopNav from "@/components/top-nav"
import HeroSlideshow from "@/components/hero-slideshow"
import Footer from "@/components/footer"
import { getUpcomingEvents } from "@/lib/events"

export default function NeurotechWebsite() {
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
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight text-foreground">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NeurotechUofT
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the next generation of Neurotechnology and neuroscience enthusiasts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <GradientButton href="/events">
              View Events
            </GradientButton>
            <GradientButton href="/projects">
              Explore Projects
            </GradientButton>
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
            <div className="transform transition-all duration-1000 ease-out flex flex-col justify-center h-full" data-animate="slideInLeft">
              <div className="mb-4">
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-foreground leading-tight">
                Engineering the future of
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}human potential at the University of Toronto.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                For a decade, NeurotechUofT has been at the forefront of student-led innovation in neurotechnology. We&apos;ve grown from a small group of enthusiasts to a vibrant community of over 200 members, pioneering breakthrough research and fostering the next generation of neurotech leaders.
              </p>
              <Link href="/projects" className="inline-flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md font-light transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-indigo-500/25 border border-indigo-400/30 hover:border-indigo-300/50 text-sm">Check out our R&D & Events</Link>
            </div>
            {/* Right Column - Image Only */}
            <div className="flex flex-col items-center justify-center h-full">
              <Image src="/brain-wallpaper.jpg" alt="About NeurotechUofT Placeholder" className="rounded-2xl shadow-lg object-cover w-full max-w-xl min-h-[340px]" width={600} height={340} />
            </div>
          </div>
        </div>
      </section>

    {/* Upcoming Events (teaser) */}
    <section id="events" className="relative z-10 py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-purple-400 font-light">What&apos;s happening</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-3">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join us for workshops, talks, and mixers.
          </p>
        </div>

        {/* Events Auto-Scrolling Container */}
        <div className="relative">
          <div 
            className="flex space-x-8 overflow-hidden py-8 w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
            }}
          >
            {/* Animated Inner Container */}
            <div className="flex space-x-8 animate-scroll-slow">
              {/* Original Events */}
              {[...getUpcomingEvents(4), ...getUpcomingEvents(4)].map((e, index) => (
                <Link 
                  key={`${e.slug}-${index}`} 
                  href={`/events/${e.slug}`} 
                  className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out"
                >
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
          </div>
        </div>

        <div className="text-center mt-10">
          <GradientButton href="/events">View all events →</GradientButton>
        </div>
      </div>
    </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-32 px-6 bg-background overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          {/* Gradient overlay for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-blue-950/30 to-gray-950/50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-purple-400 font-light">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8">
              Our Community  
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                 Speaks
              </span>
            </h2>
          </div>

          {/* Testimonials Auto-Scrolling Container */}
          <div className="relative">
            <div 
              className="flex space-x-8 overflow-hidden py-8 w-full"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
              }}
            >
              {/* Animated Inner Container */}
              <div className="flex space-x-8 animate-scroll-slow">
                {/* Testimonial Cards - Original Set */}
                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Sarah Chen</h3>
                      <p className="text-sm text-muted-foreground">Research Lead &apos;24</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;Being part of NeurotechUofT has been transformative. The hands-on experience with cutting-edge BCI technology and the supportive community have shaped my career in neurotech.&quot;
                  </p>
                </div>

                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Michael Patel</h3>
                      <p className="text-sm text-muted-foreground">Project Director &apos;23</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;The collaborative spirit here is unmatched. We&apos;re not just learning about neurotechnology – we&apos;re actively developing solutions that could change lives.&quot;
                  </p>
                </div>

                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Dr. Emma Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Faculty Advisor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;The innovation and dedication I see in these students is inspiring. They&apos;re not just learning – they&apos;re pushing the boundaries of what&apos;s possible in neurotechnology.&quot;
                  </p>
                </div>

                {/* Duplicate Set for Seamless Loop */}
                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Sarah Chen</h3>
                      <p className="text-sm text-muted-foreground">Research Lead &apos;24</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;Being part of NeurotechUofT has been transformative. The hands-on experience with cutting-edge BCI technology and the supportive community have shaped my career in neurotech.&quot;
                  </p>
                </div>

                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Michael Patel</h3>
                      <p className="text-sm text-muted-foreground">Project Director &apos;23</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;The collaborative spirit here is unmatched. We&apos;re not just learning about neurotechnology – we&apos;re actively developing solutions that could change lives.&quot;
                  </p>
                </div>

                <div className="flex-none w-[300px] sm:w-[400px] bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border hover:scale-105 hover:z-10 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-light text-lg">Dr. Emma Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Faculty Advisor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;The innovation and dedication I see in these students is inspiring. They&apos;re not just learning – they&apos;re pushing the boundaries of what&apos;s possible in neurotechnology.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-purple-400/70 font-light">Our Partners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4">
              Proudly
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Sponsored By
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Working alongside leading organizations to advance neurotechnology research and innovation
            </p>
          </div>

          {/* Sponsor Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 lg:gap-20 max-w-4xl mx-auto">
            {/* CPSIF */}
            <div className="group">
              <Image 
                src="/sponsors/cpsif.png" 
                alt="CPSIF - Canadian Partnership for Stroke and Innovation Fund" 
                className="h-16 sm:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                width={80}
                height={80}
              />
            </div>
            
            {/* SEP */}
            <div className="group">
              <Image 
                src="/sponsors/sep white.png" 
                alt="SEP - Startup Engineering Program" 
                className="h-16 sm:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                width={80}
                height={80}
              />
            </div>
            
            {/* SIF */}
            <div className="group">
              <Image 
                src="/sponsors/sif reg-white.png" 
                alt="SIF - Student Innovation Fund" 
                className="h-16 sm:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                width={80}
                height={80}
              />
            </div>
          </div>

          {/* Additional info */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground/70 font-light">
              Interested in partnering with us? <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">Get in touch</a>
            </p>
          </div>
        </div>
      </section>

      {/* Join Us and Footer Container */}
      <div className="relative">
        {/* No background image or overlay effect */}

        {/* Join Us Section */}
        

  {/* Footer */}
  <Footer />
      </div>
    </div>
  )
}
