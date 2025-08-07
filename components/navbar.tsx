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
    setIsMobileMenuOpen(false) // Cierra el menú al hacer clic en un ítem
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-zinc-800">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link
          href="#home"
          className="text-cyan-400 text-xl font-bold font-mono tracking-widest"
        >
          {"Pascal"}
        </Link>

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
