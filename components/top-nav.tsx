"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
// import { ThemeToggle } from "@/components/theme-toggle"
import { cn, getButtonClass } from "@/lib/utils"

const items = [
  { label: "About", href: "/about", children: [
    { label: "Leadership", href: "/about/people" },
    { label: "Team", href: "/about/team" },
    { label: "Portfolio", href: "/about/portfolio" },
  ] },
  { label: "R&D", href: "/projects", children: [
    { label: "Past Projects", href: "/projects/past" },
    { label: "Stroke Rehab", href: "/projects/stroke-rehab" },
    { label: "NeuronMove", href: "/projects/neuronmove" },
  ] },
  { label: "Publications", href: "/publications" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community", children: [
    { label: "NeurON Air", href: "/community/air" },
    { label: "Education", href: "/community/education" },
    { label: "Newsletter", href: "/community/newsletter" },
  ] },
  { label: "Contact", href: "/contact" },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border">
      <div className="w-full px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="NeurotechUofT Logo" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NeurotechUofT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`text-foreground/80 transition-all duration-300 relative ${
                      isActive ? "text-purple-500" : "hover:text-purple-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Desktop Dropdown */}
                  {item.children && (
                    <div className="absolute left-0 top-full -ml-4 pt-3 z-50">
                      <div
                        className="opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:visible hover:translate-y-0 hover:pointer-events-auto transition duration-150 bg-card border border-border rounded-lg shadow-lg min-w-[220px] py-2"
                        role="menu"
                        aria-label={`${item.label} submenu`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50"
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            {/* <ThemeToggle /> */}
            <Link
              href="/apply"
              className={cn(getButtonClass({ size: "sm" }), "ml-2")}
            >
              Apply
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-purple-500 transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              {items.map((item) => {
                const isActive = pathname === item.href
                const isExpanded = expandedItems.includes(item.href)
                
                return (
                  <div key={item.href} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-foreground/80 transition-all duration-300 flex-1 ${
                          isActive ? "text-purple-500" : "hover:text-purple-500"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() => toggleExpanded(item.href)}
                          className="px-4 py-2 text-foreground/60 hover:text-purple-500 transition-colors"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Submenu */}
                    {item.children && isExpanded && (
                      <div className="pl-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              
              <div className="pt-4 border-t border-border mt-4">
                <Link
                  href="/apply"
                  className={cn(getButtonClass({ size: "sm" }), "mx-4")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
