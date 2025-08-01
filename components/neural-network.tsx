"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Neuron {
  x: number
  y: number
  connections: number[]
  activity: number
  pulseTime: number
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize neurons
    const neuronCount = 50
    const newNeurons: Neuron[] = []

    for (let i = 0; i < neuronCount; i++) {
      newNeurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        activity: Math.random(),
        pulseTime: 0,
      })
    }

    // Create connections
    newNeurons.forEach((neuron, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 2
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * neuronCount)
        if (targetIndex !== i && !neuron.connections.includes(targetIndex)) {
          neuron.connections.push(targetIndex)
        }
      }
    })

    setNeurons(newNeurons)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      newNeurons.forEach((neuron, i) => {
        neuron.connections.forEach((connectionIndex) => {
          const target = newNeurons[connectionIndex]
          const distance = Math.sqrt((target.x - neuron.x) ** 2 + (target.y - neuron.y) ** 2)

          // Pulse effect based on activity
          const pulseIntensity = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5
          const alpha = (neuron.activity + target.activity) * 0.3 * pulseIntensity

          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
          ctx.lineWidth = 1 + pulseIntensity
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()

          // Traveling pulse
          if (neuron.activity > 0.8) {
            const progress = (Date.now() * 0.01) % 1
            const pulseX = neuron.x + (target.x - neuron.x) * progress
            const pulseY = neuron.y + (target.y - neuron.y) * progress

            ctx.fillStyle = `rgba(168, 85, 247, ${1 - progress})`
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Update and draw neurons
      newNeurons.forEach((neuron, i) => {
        // Mouse interaction
        const mouseDistance = Math.sqrt((mousePos.x - neuron.x) ** 2 + (mousePos.y - neuron.y) ** 2)
        if (mouseDistance < 100) {
          neuron.activity = Math.min(1, neuron.activity + 0.02)
        } else {
          neuron.activity = Math.max(0, neuron.activity - 0.005)
        }

        // Random firing
        if (Math.random() < 0.001) {
          neuron.activity = 1
        }

        // Draw neuron
        const size = 3 + neuron.activity * 5
        const glow = neuron.activity * 20

        ctx.shadowColor = `rgba(34, 211, 238, ${neuron.activity})`
        ctx.shadowBlur = glow
        ctx.fillStyle = `rgba(34, 211, 238, ${0.6 + neuron.activity * 0.4})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full opacity-30"
      onMouseMove={handleMouseMove}
    />
  )
}
