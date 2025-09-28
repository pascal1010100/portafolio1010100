"use client"

import React, { useEffect, useRef } from "react"
import { Github, Linkedin, Twitter } from "lucide-react" // Puedes cambiar por react-icons si prefieres

interface NavItem {
  name: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  navItems: NavItem[]
  activeSection: string
  handleNavClick: (href: string) => void
  onClose: () => void
}

export function MobileMenu({
  isOpen,
  navItems,
  activeSection,
  handleNavClick,
  onClose,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      {/* Fondo decorativo con íconos sociales gigantes */}
      <div className="absolute inset-0 pointer-events-none opacity-10 text-cyan-400 text-[150px] flex flex-col items-center justify-center gap-12">
        <Github />
        <Linkedin />
        <Twitter />
      </div>

      {/* Menú móvil principal */}
      <div
        ref={menuRef}
        className="absolute top-0 right-0 w-60 h-full bg-black/80 backdrop-blur-xl border-l border-cyan-500/10 shadow-lg font-mono px-5 py-6 animate-slide-in"
      >
        <div className="flex flex-col space-y-6 z-10 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-left text-base font-medium tracking-wider transition-all duration-300 hover:scale-[1.02] ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_6px_cyan]"
                    : "text-zinc-300 hover:text-cyan-300"
                }`}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
