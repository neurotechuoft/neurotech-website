"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Synapse {
  x: number
  y: number
  targetX: number
  targetY: number
  progress: number
  active: boolean
}

export function SynapticConnections() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [synapses, setSynapses] = useState<Synapse[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createSynapse = () => {
      const rect = container.getBoundingClientRect()
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        targetX: Math.random() * rect.width,
        targetY: Math.random() * rect.height,
        progress: 0,
        active: false,
      }
    }

    const initialSynapses = Array.from({ length: 20 }, createSynapse)
    setSynapses(initialSynapses)

    const interval = setInterval(() => {
      setSynapses((prev) =>
        prev.map((synapse) => {
          if (Math.random() < 0.02) {
            return { ...synapse, active: true, progress: 0 }
          }
          if (synapse.active) {
            const newProgress = synapse.progress + 0.05
            if (newProgress >= 1) {
              return { ...synapse, active: false, progress: 0 }
            }
            return { ...synapse, progress: newProgress }
          }
          return synapse
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    // Activate nearby synapses
    setSynapses((prev) =>
      prev.map((synapse) => {
        const distance = Math.sqrt((synapse.x - mousePos.x) ** 2 + (synapse.y - mousePos.y) ** 2)
        if (distance < 100 && !synapse.active) {
          return { ...synapse, active: true, progress: 0 }
        }
        return synapse
      }),
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
      {synapses.map((synapse, index) => (
        <div key={index}>
          {/* Source neuron */}
          <div
            className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
              synapse.active ? "bg-cyan-400 shadow-lg shadow-cyan-400/50" : "bg-gray-600"
            }`}
            style={{
              left: synapse.x,
              top: synapse.y,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Target neuron */}
          <div
            className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
              synapse.progress > 0.8 ? "bg-purple-400 shadow-lg shadow-purple-400/50" : "bg-gray-600"
            }`}
            style={{
              left: synapse.targetX,
              top: synapse.targetY,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Connection line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <line
              x1={synapse.x}
              y1={synapse.y}
              x2={synapse.targetX}
              y2={synapse.targetY}
              stroke={synapse.active ? "rgba(34, 211, 238, 0.3)" : "rgba(107, 114, 128, 0.2)"}
              strokeWidth="1"
            />

            {/* Traveling signal */}
            {synapse.active && (
              <circle
                cx={synapse.x + (synapse.targetX - synapse.x) * synapse.progress}
                cy={synapse.y + (synapse.targetY - synapse.y) * synapse.progress}
                r="2"
                fill="rgba(168, 85, 247, 0.8)"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>
      ))}

      <div className="absolute bottom-2 left-2 text-xs text-cyan-400 font-mono">SYNAPTIC ACTIVITY</div>
    </div>
  )
}
