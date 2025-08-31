import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const baseStyles = "inline-flex items-center rounded-md px-6 py-3 border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light"
const gradientStyles = "bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20"
const ghostStyles = "bg-transparent hover:bg-purple-500/10 text-foreground/80 hover:text-purple-500"

interface GradientButtonProps extends React.ComponentProps<"button"> {
  href?: string
  variant?: "default" | "ghost"
  className?: string
  children: React.ReactNode
}

export function GradientButton({
  href,
  variant = "default",
  className,
  children,
  ...props
}: GradientButtonProps) {
  const styles = cn(
    baseStyles,
    variant === "default" ? gradientStyles : ghostStyles,
    className
  )

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
