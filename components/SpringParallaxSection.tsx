"use client"

import React, { useRef, useEffect, useState } from "react"
import { Brain, Zap, Users } from "lucide-react"
import clsx from "clsx"

type Gradient = "pink" | "teal" | "tomato"

interface Section {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  gradient: Gradient
  bgGradient: string
}

const gradientMap: Record<Gradient, { bg: string; accent: string }> = {
  pink: {
    bg: "from-pink-900/10 via-black to-rose-900/10",
    accent: "from-pink-600/20 to-rose-600/20",
  },
  teal: {
    bg: "from-cyan-900/10 via-black to-blue-900/10",
    accent: "from-cyan-600/20 to-blue-600/20",
  },
  tomato: {
    bg: "from-yellow-900/10 via-black to-orange-900/10",
    accent: "from-yellow-600/20 to-orange-600/20",
  },
}

export default function SpringParallaxSection() {
  const containerRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isInSection, setIsInSection] = useState(false)

  const sections: Section[] = [
    {
      id: "who-we-are",
      title: "Who We Are",
      subtitle: "Passionate Innovators",
      description: "We are a diverse community of undergraduate students at the University of Toronto Engineering, united by our passion for Neurotechnology.",
      icon: <Users className="w-20 h-20 text-pink-400" />,
      gradient: "pink",
      bgGradient: gradientMap["pink"].bg,
    },
    {
      id: "what-we-do",
      title: "What We Do",
      subtitle: "Bridging Science & Technology",
      description: "We develop cutting-edge solutions that merge neuroscience with engineering principles, creating innovations with real-world impact.",
      icon: <Brain className="w-20 h-20 text-cyan-400" />,
      gradient: "teal",
      bgGradient: gradientMap["teal"].bg,
    },
    {
      id: "our-mission",
      title: "Our Mission",
      subtitle: "Transforming Lives Through Innovation",
      description: "We strive to make Neurotechnology accessible while developing solutions that transform lives through collaboration and research.",
      icon: <Zap className="w-20 h-20 text-yellow-400" />,
      gradient: "tomato",
      bgGradient: gradientMap["tomato"].bg,
    },
  ]

  useEffect(() => {
    let accumulatedScroll = 0
    const maxScroll = 100 // How much scroll needed to complete each section

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || !scrollRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInParallaxZone = rect.top <= 0 && rect.bottom >= window.innerHeight

      if (isInParallaxZone) {
        e.preventDefault()
        
        // Accumulate scroll delta
        accumulatedScroll += e.deltaY * 0.5 // Reduce sensitivity
        accumulatedScroll = Math.max(0, Math.min(accumulatedScroll, maxScroll * sections.length))
        
        // Calculate which section and progress
        const sectionProgress = accumulatedScroll / maxScroll
        const currentSectionIndex = Math.floor(sectionProgress)
        const progress = sectionProgress / sections.length
        
        setCurrentSection(Math.min(currentSectionIndex, sections.length - 1))
        setIsInSection(true)
        
        // Calculate horizontal translation
        const scrollWidth = scrollRef.current.scrollWidth
        const containerWidth = window.innerWidth
        const translateX = progress * (scrollWidth - containerWidth)
        
        scrollRef.current.style.transform = `translateX(-${translateX}px)`
        
        // Check if we've completed all sections
        if (accumulatedScroll >= maxScroll * sections.length) {
          // Allow normal scrolling to continue
          setIsInSection(false)
          // Reset for next time
          accumulatedScroll = 0
        }
      } else {
        setIsInSection(false)
        accumulatedScroll = 0
      }
    }

    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInParallaxZone = rect.top <= 0 && rect.bottom >= window.innerHeight
      
      if (!isInParallaxZone) {
        setIsInSection(false)
        accumulatedScroll = 0
        // Reset transform when not in section
        scrollRef.current.style.transform = `translateX(0px)`
        setCurrentSection(0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections.length])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={scrollRef}
          className="flex transition-transform duration-100 ease-out"
          style={{ width: `${sections.length * 100}vw` }}
        >
          {sections.map((sec) => (
            <div
              key={sec.id}
              className={clsx(
                "w-screen h-screen flex flex-col items-center justify-center px-8 relative",
                `bg-gradient-to-br ${sec.bgGradient}`
              )}
            >
              <div
                className={clsx(
                  "absolute inset-0 blur-3xl opacity-30",
                  `bg-gradient-to-br ${gradientMap[sec.gradient].accent}`
                )}
              />
              <div className="relative z-10 max-w-4xl text-center">
                <div className="mb-8 flex justify-center">{sec.icon}</div>
                <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                  {sec.title}
                </h2>
                <h3 className="text-2xl md:text-3xl text-cyan-400 mb-8 font-medium">
                  {sec.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {sec.description}
                </p>
                
                {/* Section indicators */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {sections.map((_, i) => (
                    <div
                      key={i}
                      className={clsx(
                        "rounded-full transition-all duration-300",
                        i === currentSection ? "bg-cyan-400 w-8 h-2" : "bg-gray-600 w-2 h-2"
                      )}
                    />
                  ))}
                </div>
                
                {/* Scroll hint */}
                {isInSection && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 animate-pulse">
                    Scroll to explore horizontally
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
