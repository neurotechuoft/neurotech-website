"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const items = [
  { label: "About", href: "/about", children: [
    { label: "People", href: "/about/people" },
    { label: "Team", href: "/about/team" },
    { label: "Portfolio", href: "/about/portfolio" },
  ] },
  { label: "R&D", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community", children: [
    { label: "NeurON Air", href: "/community/air" },
    { label: "Education", href: "/community/education" },
  ] },
  { label: "Contact", href: "/contact" },
]

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border">
      <div className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="NeuroTechUofT Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-2xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NeuroTechUofT
            </span>
          </Link>

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
                  {/* Dropdown */}
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
            <ThemeToggle />
            <Link
              href="/apply"
              className="ml-2 inline-flex items-center rounded-md px-4 py-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-primary-foreground border border-border/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-light"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
