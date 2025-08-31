import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light shadow-lg shadow-purple-500/20",
        destructive:
          "bg-gradient-to-r from-red-600/80 to-rose-600/80 hover:from-red-600 hover:to-rose-600 text-white border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light shadow-lg shadow-red-500/20",
        outline:
          "border border-border/60 bg-transparent text-foreground/80 hover:text-purple-500 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light",
        secondary:
          "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-600 hover:to-purple-600 text-white border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light shadow-lg shadow-indigo-500/20",
        ghost:
          "text-foreground/80 hover:text-purple-500 hover:bg-purple-500/10 backdrop-blur-sm transition-all duration-300",
        link: "text-foreground/80 hover:text-purple-500 underline-offset-4 hover:underline transition-colors duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
