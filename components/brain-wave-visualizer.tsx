"use client"

import { useEffect, useRef, useState } from "react"

export function BrainWaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0
    const waves = [
      { frequency: 0.02, amplitude: 20, color: "rgba(34, 211, 238, 0.8)", name: "Alpha" },
      { frequency: 0.05, amplitude: 15, color: "rgba(168, 85, 247, 0.8)", name: "Beta" },
      { frequency: 0.01, amplitude: 25, color: "rgba(236, 72, 153, 0.8)", name: "Theta" },
      { frequency: 0.08, amplitude: 10, color: "rgba(34, 197, 94, 0.8)", name: "Gamma" },
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerY = canvas.height / 2
      const amplitude = isActive ? 1.5 : 1

      waves.forEach((wave, waveIndex) => {
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let x = 0; x < canvas.width; x++) {
          const y =
            centerY +
            Math.sin(x * wave.frequency + time) * wave.amplitude * amplitude +
            Math.sin(x * wave.frequency * 2 + time * 1.5) * (wave.amplitude * 0.3) * amplitude +
            (waveIndex - 1.5) * 30

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        // Add wave labels
        ctx.fillStyle = wave.color
        ctx.font = "12px monospace"
        ctx.fillText(wave.name, 10, 20 + waveIndex * 20)
      })

      time += 0.1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full h-full border border-cyan-500/30 rounded-lg bg-black/20 backdrop-blur-sm"
      />
      <div className="absolute top-2 right-2 text-xs text-cyan-400 font-mono">
        EEG ACTIVITY {isActive ? "ENHANCED" : "BASELINE"}
      </div>
    </div>
  )
}
