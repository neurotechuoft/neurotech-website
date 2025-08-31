"use client"

import { useState, useEffect } from "react"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set timer for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-[600px] h-[600px] object-contain"
        style={{ maxWidth: '600px', maxHeight: '600px' }}
      >
        <source src="/preloader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
