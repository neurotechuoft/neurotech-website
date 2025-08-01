"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Brain, Zap, Microscope, Activity, Cpu, Waves } from "lucide-react"

interface ParallaxItem {
  id: number
  icon: React.ReactNode
  text: string
  speed: number
  color: string
}

export function HorizontalParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const parallaxItems: ParallaxItem[] = [
    { id: 1, icon: <Brain className="w-8 h-8" />, text: "Neural Networks", speed: 0.5, color: "text-cyan-400" },
    { id: 2, icon: <Zap className="w-8 h-8" />, text: "Synaptic Processing", speed: 0.8, color: "text-purple-400" },
    { id: 3, icon: <Microscope className="w-8 h-8" />, text: "Brain Analysis", speed: 0.3, color: "text-pink-400" },
    { id: 4, icon: <Activity className="w-8 h-8" />, text: "Neural Activity", speed: 0.6, color: "text-green-400" },
    { id: 5, icon: <Cpu className="w-8 h-8" />, text: "BCI Technology", speed: 0.9, color: "text-yellow-400" },
    { id: 6, icon: <Waves className="w-8 h-8" />, text: "Signal Processing", speed: 0.4, color: "text-blue-400" },
    { id: 7, icon: <Brain className="w-8 h-8" />, text: "Neurotechnology", speed: 0.7, color: "text-indigo-400" },
    { id: 8, icon: <Zap className="w-8 h-8" />, text: "Innovation", speed: 0.2, color: "text-red-400" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-32 overflow-hidden bg-gradient-to-r from-gray-900/10 to-gray-800/10 border-y border-gray-800/50"
    >
      <div className="absolute inset-0 flex items-center">
        {/* First row - moving right */}
        <div
          className="flex items-center space-x-16 whitespace-nowrap"
          style={{
            transform: `translateX(${-scrollY * 0.5}px)`,
          }}
        >
          {parallaxItems.slice(0, 4).map((item) => (
            <div
              key={`row1-${item.id}`}
              className={`flex items-center space-x-3 ${item.color} opacity-60 hover:opacity-100 transition-opacity duration-300`}
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.text}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {parallaxItems.slice(0, 4).map((item) => (
            <div
              key={`row1-dup-${item.id}`}
              className={`flex items-center space-x-3 ${item.color} opacity-60 hover:opacity-100 transition-opacity duration-300`}
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center top-16">
        {/* Second row - moving left */}
        <div
          className="flex items-center space-x-16 whitespace-nowrap"
          style={{
            transform: `translateX(${scrollY * 0.3 - 200}px)`,
          }}
        >
          {parallaxItems.slice(4).map((item) => (
            <div
              key={`row2-${item.id}`}
              className={`flex items-center space-x-3 ${item.color} opacity-40 hover:opacity-100 transition-opacity duration-300`}
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.text}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {parallaxItems.slice(4).map((item) => (
            <div
              key={`row2-dup-${item.id}`}
              className={`flex items-center space-x-3 ${item.color} opacity-40 hover:opacity-100 transition-opacity duration-300`}
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none" />

      {/* Neural connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="1" />
        <line x1="0" y1="75%" x2="100%" y2="25%" stroke="url(#connectionGradient)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}
