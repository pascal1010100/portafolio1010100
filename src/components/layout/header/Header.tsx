"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Inicio", href: "#home" },
  { name: "Habilidades", href: "#skills" },
  { name: "Proyectos", href: "#projects" },
  // Eliminado el ítem de Contacto del menú principal
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const getActiveSection = () => {
      const scrollPosition = window.scrollY + 100 // Ajuste para activar antes de llegar a la sección
      let currentSection = ""
      
      // Encontrar la sección más cercana al viewport
      const sectionOffsets = navItems.map(item => {
        const section = item.href.substring(1)
        const element = document.getElementById(section)
        return {
          id: section,
          offsetTop: element ? element.offsetTop : Infinity,
          offsetHeight: element ? element.offsetHeight : 0
        }
      }).filter(section => !isNaN(section.offsetTop))
      
      // Ordenar por proximidad al scroll actual
      sectionOffsets.sort((a, b) => {
        const aDistance = Math.abs(scrollPosition - a.offsetTop)
        const bDistance = Math.abs(scrollPosition - b.offsetTop)
        return aDistance - bDistance
      })
      
      // Tomar la sección más cercana que esté dentro del rango
      for (const section of sectionOffsets) {
        if (
          scrollPosition >= section.offsetTop - 100 && 
          scrollPosition < section.offsetTop + section.offsetHeight - 100
        ) {
          currentSection = section.id
          break
        }
      }
      
      // Si no encontramos ninguna sección, usar la más cercana
      if (!currentSection && sectionOffsets.length > 0) {
        currentSection = sectionOffsets[0].id
      }
      
      return currentSection
    }
    
    const handleScroll = () => {
      const newSection = getActiveSection()
      
      if (newSection && newSection !== activeSection) {
        setActiveSection(newSection)
      }
      
      // Efecto de transparencia al hacer scroll
      setScrolled(window.scrollY > 10)
    }
    
    // Usar un throttle para mejorar el rendimiento
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Llamar una vez al cargar para establecer el estado inicial
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [activeSection]) // Añadimos activeSection como dependencia

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/20 shadow-lg" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
              onClick={() => handleNavClick("#home")}
            >
              Pascal.dev
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div 
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-1"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    activeSection === item.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/90"
                  )}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                  <motion.span
                    className={cn(
                      "absolute left-1/2 -bottom-1 h-0.5 bg-primary rounded-full -translate-x-1/2 transition-all duration-300",
                      activeSection === item.href.substring(1) ? "w-3/4" : "w-0"
                    )}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.3,
                    }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Botón de contacto destacado */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <Link
                href="#contact"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => handleNavClick("#contact")}
              >
                Contáctame
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Fondo semitransparente */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menú lateral derecho */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background/95 backdrop-blur-md border-l border-border/20 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 mt-4 border-t border-border/20">
                  <Link
                    href="#contact"
                    className="block w-full px-4 py-3 text-center font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Contáctame
                  </Link>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
