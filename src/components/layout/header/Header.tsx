"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Inicio", href: "#home" },
  { name: "Capacidades", href: "#skills" },
  { name: "Enfoque", href: "#process" },
  { name: "Servicios", href: "#services" },
  { name: "Proyectos", href: "#projects" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)

      const scrollPosition = window.scrollY + 160
      const visible = navItems.findLast((item) => {
        const element = document.getElementById(item.href.slice(1))
        return element ? element.offsetTop <= scrollPosition : false
      })
      setActiveSection(visible?.href.slice(1) || "home")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        scrolled
          ? "border-white/10 bg-black/80 shadow-2xl shadow-black/20 backdrop-blur-2xl"
          : "border-white/10 bg-black/45 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="inline-flex items-center gap-3 text-lg font-semibold tracking-[-0.03em] text-white"
        >
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/[0.06]">
            <span className="h-3 w-3 rotate-45 border border-white/80" />
          </span>
          Pascal<span className="text-white/35">.dev</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeSection === item.href.slice(1)
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className="ml-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Iniciar proyecto
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-white/15 bg-white/[0.04] p-2.5 text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-black/95 px-4 py-5 backdrop-blur-2xl lg:hidden"
            aria-label="Navegación móvil"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => handleNavClick(item.href)} className="rounded-xl px-4 py-3 text-base font-medium text-white hover:bg-white/[0.06]">
                  {item.name}
                </Link>
              ))}
              <Link href="#contact" onClick={() => handleNavClick("#contact")} className="mt-2 rounded-xl bg-white px-4 py-3 text-center font-semibold text-black">
                Iniciar proyecto
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
