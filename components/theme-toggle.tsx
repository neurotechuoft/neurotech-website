"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
  const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
  // Default to light unless user explicitly stored 'dark'. Ignore system preference.
  const shouldDark = stored ? stored === 'dark' : false
    setIsDark(shouldDark)
    document.documentElement.classList.toggle('dark', shouldDark)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => {
        const next = !isDark
        setIsDark(next)
        document.documentElement.classList.toggle('dark', next)
        localStorage.setItem('theme', next ? 'dark' : 'light')
      }}
      className="text-foreground"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
