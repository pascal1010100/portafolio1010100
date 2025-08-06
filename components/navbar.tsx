"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

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

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 ease-out font-mono">
      <div className="absolute inset-0 bg-[#0e0e2c]/70 dark:bg-black/70 backdrop-blur-sm border-b border-[#222]/40 shadow-sm shadow-cyan-500/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="font-bold text-xl tracking-wide text-[#00fff7] drop-shadow-md hover:text-cyan-400 transition-colors duration-300"
          >
            {`<Pascal />`}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm font-medium uppercase tracking-widest transition-all duration-300 group hover:text-cyan-400 ${
                    isActive ? "text-cyan-300" : "text-zinc-400 dark:text-zinc-300"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-cyan-500/50" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="group relative w-10 h-10 flex flex-col justify-center items-center gap-1"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 bg-cyan-400 shadow-[0_0_6px_#00fff7] ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 bg-cyan-400 shadow-[0_0_6px_#00fff7] ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 bg-cyan-400 shadow-[0_0_6px_#00fff7] ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-[#0e0e2c] text-zinc-100 shadow-2xl z-50 animate-slide-in font-mono">
          <div className="flex flex-col p-6 space-y-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-left text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-zinc-300 hover:text-cyan-300"
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
