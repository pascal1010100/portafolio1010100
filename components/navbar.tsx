"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Inicio", href: "#home" },
  { name: "Habilidades", href: "#skills" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 ease-out">
      <div className="absolute inset-0 bg-white/70 dark:bg-background/70 backdrop-blur-md border-b border-stone-200/30 dark:border-border/20 shadow-sm shadow-stone-200/20 dark:shadow-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/20 via-transparent to-transparent dark:from-accent-purple/5 dark:via-transparent dark:to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Pascal.dev 2D */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="group relative z-10 font-bold text-xl bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple bg-clip-text text-transparent drop-shadow-sm transition-all duration-300"
          >
            <span className="md:hidden">{`{🧊}`}</span>
            <span className="hidden md:inline">{`{🧊} Pascal`}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-stone-800 dark:text-accent-purple drop-shadow-sm"
                      : "text-stone-600 dark:text-foreground-muted hover:text-stone-800 dark:hover:text-foreground drop-shadow-sm"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-300/60 via-stone-400/40 to-stone-300/60 dark:bg-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-stone-700 to-stone-800 dark:bg-accent-purple rounded-full animate-pulse shadow-sm" />
                  )}
                </button>
              )
            })}
            <div className="ml-4 pl-4 border-l border-stone-400/60 dark:border-border/60">
              <ThemeToggle />
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="relative p-2 rounded-xl border border-stone-400/60 dark:border-border/60 bg-gradient-to-br from-white/90 to-stone-100/80 dark:bg-background/80 backdrop-blur-sm hover:from-stone-100/95 hover:to-stone-200/85 dark:hover:bg-background-secondary/80 hover:border-stone-500/80 dark:hover:border-accent-purple/60 transition-all duration-300 group"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <Menu
                  className={`absolute w-5 h-5 text-stone-700 dark:text-foreground transition-all duration-300 drop-shadow-sm ${
                    isMobileMenuOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute w-5 h-5 text-stone-700 dark:text-foreground transition-all duration-300 drop-shadow-sm ${
                    isMobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
