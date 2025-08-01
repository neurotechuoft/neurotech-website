"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function BrainScanViewer() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [activeRegions, setActiveRegions] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            setIsScanning(false)
            return 0
          }
          return newProgress
        })

        // Randomly activate brain regions
        setActiveRegions((prev) => {
          const newRegions = [...prev]
          if (Math.random() < 0.3) {
            const regionId = Math.floor(Math.random() * 8)
            if (!newRegions.includes(regionId)) {
              newRegions.push(regionId)
            }
          }
          if (newRegions.length > 4) {
            newRegions.shift()
          }
          return newRegions
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning])

  const brainRegions = [
    { id: 0, name: "Frontal Cortex", x: 50, y: 30, color: "cyan" },
    { id: 1, name: "Parietal Lobe", x: 70, y: 25, color: "purple" },
    { id: 2, name: "Temporal Lobe", x: 30, y: 50, color: "pink" },
    { id: 3, name: "Occipital Lobe", x: 85, y: 45, color: "green" },
    { id: 4, name: "Cerebellum", x: 75, y: 70, color: "yellow" },
    { id: 5, name: "Brain Stem", x: 55, y: 75, color: "red" },
    { id: 6, name: "Motor Cortex", x: 45, y: 20, color: "blue" },
    { id: 7, name: "Sensory Cortex", x: 65, y: 35, color: "orange" },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm">
        {/* Brain outline */}
        <div className="relative w-full h-64 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Brain outline */}
            <path
              d="M20,40 Q15,25 30,20 Q45,15 60,20 Q75,15 85,25 Q90,35 85,50 Q90,65 80,75 Q70,85 55,80 Q40,85 25,75 Q15,65 20,50 Q15,45 20,40 Z"
              fill="none"
              stroke="rgba(107, 114, 128, 0.5)"
              strokeWidth="1"
            />

            {/* Scan line */}
            {isScanning && (
              <line
                x1="0"
                y1={scanProgress}
                x2="100"
                y2={scanProgress}
                stroke="rgba(34, 211, 238, 0.8)"
                strokeWidth="0.5"
                className="animate-pulse"
              />
            )}

            {/* Brain regions */}
            {brainRegions.map((region) => (
              <circle
                key={region.id}
                cx={region.x}
                cy={region.y}
                r={activeRegions.includes(region.id) ? "4" : "2"}
                fill={activeRegions.includes(region.id) ? `rgba(34, 211, 238, 0.8)` : "rgba(107, 114, 128, 0.3)"}
                className={activeRegions.includes(region.id) ? "animate-pulse" : ""}
              />
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2 mb-4">
          <Button
            size="sm"
            onClick={() => setIsScanning(!isScanning)}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0"
          >
            {isScanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsScanning(false)
              setScanProgress(0)
              setActiveRegions([])
            }}
            className="border-gray-600 text-gray-400 hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Active regions display */}
        <div className="space-y-1">
          <div className="text-xs text-gray-400 font-mono">ACTIVE REGIONS:</div>
          {activeRegions.map((regionId) => (
            <div key={regionId} className="text-xs text-cyan-400 font-mono">
              → {brainRegions[regionId].name}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {isScanning && (
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="text-xs text-center text-gray-400 mt-1 font-mono">SCANNING... {scanProgress}%</div>
          </div>
        )}
      </div>
    </div>
  )
}
