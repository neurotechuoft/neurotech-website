import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const buttonStyles = {
  base: "inline-flex items-center rounded-md border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light",
  gradient: "bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20",
  ghost: "bg-transparent hover:bg-purple-500/10 text-foreground/80 hover:text-purple-500",
  sizes: {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  }
}

export function getButtonClass({ variant = "gradient", size = "md", className = "" } = {}) {
  return cn(
    buttonStyles.base,
    buttonStyles[variant as keyof typeof buttonStyles],
    buttonStyles.sizes[size as keyof typeof buttonStyles.sizes],
    className
  )
}
