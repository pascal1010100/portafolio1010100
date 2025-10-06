"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"

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
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-zinc-800">
      <div className="flex items-center justify-between w-full">
        {/* Logo con cubo SVG minimalista y efecto neón */}
        <Link
          href="#home"
          className="flex items-center gap-2 text-cyan-400 text-xl font-bold font-mono tracking-widest"
        >
          <span className="text-white">{`{`}</span>
          <svg
            className="w-5 h-5 text-cyan-400 neon-glow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="text-white">{`}`}</span>
          <span className="text-cyan-400">Pascal</span>
        </Link>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-mono transition-colors duration-300 ${
                  isActive ? "text-cyan-400" : "text-zinc-300 hover:text-cyan-300"
                }`}
              >
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-cyan-300 text-3xl"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>

        {/* Menú móvil */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  )
}
