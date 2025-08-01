"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface NeuralPulseButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function NeuralPulseButton({ children, onClick, className = "" }: NeuralPulseButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false)

  const handleClick = () => {
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 1000)
    onClick?.()
  }

  return (
    <div className="relative">
      {/* Neural pulse rings */}
      {isPulsing && (
        <>
          <div className="absolute inset-0 rounded-lg bg-cyan-400/20 animate-ping" />
          <div className="absolute inset-0 rounded-lg bg-purple-400/20 animate-ping animation-delay-200" />
          <div className="absolute inset-0 rounded-lg bg-pink-400/20 animate-ping animation-delay-400" />
        </>
      )}

      <Button
        onClick={handleClick}
        className={`relative z-10 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 transition-all duration-300 ${
          isPulsing ? "scale-105 shadow-lg shadow-cyan-400/25" : ""
        } ${className}`}
      >
        {children}
      </Button>
    </div>
  )
}
