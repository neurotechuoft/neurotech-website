"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="flex flex-col items-center space-y-2 text-cyan-400">
        <span className="text-sm font-mono">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-6 h-6 animate-pulse" />
      </div>
    </div>
  )
}
