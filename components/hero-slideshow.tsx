"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type Slide =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; alt?: string }

type Props = {
  slides: Slide[]
  intervalMs?: number
  className?: string
  showOverlay?: boolean
}

export default function HeroSlideshow({ slides, intervalMs = 5000, className, showOverlay = true }: Props) {
  const [index, setIndex] = useState(0)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const count = slides.length

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  const start = () => {
    stop()
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs)
  }
  const stop = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
  }

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, intervalMs])

  // Note: index state already determines the active slide; no extra memo needed.

  return (
    <div className={`relative w-full min-h-[70vh] md:min-h-screen overflow-hidden ${className ?? ''}`} onMouseEnter={stop} onMouseLeave={start}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {s.type === "image" ? (
            // Image Slide
            <Image src={s.src} alt={s.alt ?? "Slide image"} fill priority={i === 0}
                   className="object-cover" />
          ) : (
            // Video Slide (play only when active)
            i === index ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={s.src} type="video/mp4" />
              </video>
            ) : null
          )}
          {/* Theme-aware overlay for readability */}
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 dark:from-black/40 dark:via-black/20 dark:to-black/60" />
          )}
        </div>
      ))}

      {/* Controls */}
      <button aria-label="Previous slide" onClick={() => go(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-background/50 border border-border hover:bg-background/70 transition">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button aria-label="Next slide" onClick={() => go(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-background/50 border border-border hover:bg-background/70 transition">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-foreground" : "w-2.5 bg-muted"}`} />
        ))}
      </div>
    </div>
  )
}