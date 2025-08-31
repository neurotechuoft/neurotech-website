"use client"

import React, { useRef, useEffect } from 'react'
import { Brain, Zap, Users } from 'lucide-react'

const IntegratedHorizontalParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return
      
      const container = containerRef.current
      const scrollElement = scrollRef.current
      const rect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight
      const scrollWidth = scrollElement.scrollWidth
      const containerWidth = container.offsetWidth
      
      // Calculate how far through the container we've scrolled (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (containerHeight - window.innerHeight)))
      
      // Translate the horizontal scroll based on progress
      const translateX = scrollProgress * (scrollWidth - containerWidth)
      scrollElement.style.transform = `translateX(-${translateX}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sections = [
    {
      id: 'who-we-are',
      title: 'Who We Are',
      subtitle: 'Passionate Innovators',
      description: 'We are a diverse community of undergraduate students at the University of Toronto Engineering, united by our passion for Neurotechnology. Our team combines expertise from various engineering disciplines with deep curiosity about the human brain and nervous system.',
      icon: <Users className="w-20 h-20 text-pink-400" />,
      gradient: 'from-pink-600/20 to-rose-600/20',
      bgGradient: 'from-pink-900/10 via-black to-rose-900/10'
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      subtitle: 'Bridging Science & Technology',
      description: 'We develop cutting-edge solutions that merge neuroscience with engineering principles. From brain-computer interfaces to assistive technologies, we create innovations that have real-world impact on people\'s lives, particularly focusing on neurological disorders and accessibility.',
      icon: <Brain className="w-20 h-20 text-cyan-400" />,
      gradient: 'from-cyan-600/20 to-blue-600/20',
      bgGradient: 'from-cyan-900/10 via-black to-blue-900/10'
    },
    {
      id: 'our-mission',
      title: 'Our Mission',
      subtitle: 'Transforming Lives Through Innovation',
      description: 'We strive to make Neurotechnology accessible and impactful for undergraduates while developing solutions that transform lives. Through collaboration, research, and hands-on projects, we\'re shaping the future of how technology interfaces with the human brain.',
      icon: <Zap className="w-20 h-20 text-yellow-400" />,
      gradient: 'from-yellow-600/20 to-orange-600/20',
      bgGradient: 'from-yellow-900/10 via-black to-orange-900/10'
    }
  ]

  return (
    <section ref={containerRef} className="relative h-[600vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex transition-transform duration-75 ease-out"
          style={{ width: `${sections.length * 100}vw` }}
        >
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className={`w-screen h-screen flex items-center justify-center px-8 relative bg-gradient-to-br ${section.bgGradient}`}
            >
              {/* Background decoration */}
              <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} blur-3xl opacity-30`} />
              
              {/* Content */}
              <div className="relative z-10 max-w-4xl text-center">
                <div className="mb-8 flex justify-center">
                  {section.icon}
                </div>
                <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                  {section.title}
                </h2>
                <h3 className="text-2xl md:text-3xl text-cyan-400 mb-8 font-medium">
                  {section.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {section.description}
                </p>
                
                {/* Section indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {sections.map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'bg-cyan-400 w-8' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntegratedHorizontalParallax
