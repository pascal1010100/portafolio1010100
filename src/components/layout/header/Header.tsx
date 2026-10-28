"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { PascalMark } from "@/components/brand/PascalMark"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "projects", name: "Work", homeHref: "#projects", siteHref: "/projects" },
  { id: "services", name: "Services", homeHref: "#services", siteHref: "/#services" },
  { id: "process", name: "Process", homeHref: "#process", siteHref: "/#process" },
  { id: "skills", name: "Capabilities", homeHref: "#skills", siteHref: "/#skills" },
  { id: "about", name: "About", homeHref: "#about", siteHref: "/#about" },
] as const

type NavbarProps = {
  context?: "home" | "work" | "hiring"
}

export function Navbar({ context = "home" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(context === "work" ? "projects" : "home")
  const [scrolled, setScrolled] = useState(context !== "home")
  const shouldReduceMotion = useReducedMotion() ?? false
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (context !== "home") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
      const observedSections = ["home", ...navItems.map((item) => item.id), "contact"]
      const scrollPosition = window.scrollY + 160
      const visible = observedSections.findLast((id) => {
        const element = document.getElementById(id)
        return element ? element.offsetTop <= scrollPosition : false
      })
      setActiveSection(visible || "home")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [context])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setIsMobileMenuOpen(false)
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  const handleHomeAnchor = (href: string) => {
    if (context !== "home") return
    const shouldRestoreMenuFocus = isMobileMenuOpen
    document.querySelector(href)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" })
    setIsMobileMenuOpen(false)
    if (shouldRestoreMenuFocus) requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const cta = context === "hiring"
    ? { href: "mailto:josemanu0885@gmail.com?subject=Opportunity%20via%20Pascal.dev", short: "Résumé", long: "Request résumé" }
    : { href: context === "home" ? "#contact" : "/#contact", short: "Contact", long: "Discuss your project" }

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition duration-300",
      scrolled ? "border-b border-white/10 bg-black/80 shadow-2xl shadow-black/20 backdrop-blur-2xl" : "bg-transparent",
    )}>
      <div className={cn(
        "mx-auto mt-3 flex h-[66px] max-w-[1360px] items-center justify-between px-5 transition sm:px-6 lg:px-8",
        !scrolled && "rounded-[18px] border border-white/10 bg-[#030506]/55 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl",
      )}>
        <Link
          href={context === "home" ? "#home" : "/"}
          onClick={context === "home" ? () => handleHomeAnchor("#home") : undefined}
          className="inline-flex items-center gap-3 font-display text-2xl font-medium tracking-[-0.035em] text-[#ecfeff]"
          aria-label="Pascal.dev home"
        >
          <PascalMark compact />
          <span>Pascal<span className="text-white/55">.dev</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const href = context === "home" ? item.homeHref : item.siteHref
            const isActive = context === "home" ? activeSection === item.id : context === "work" && item.id === "projects"
            return (
              <Link
                key={item.id}
                href={href}
                onClick={context === "home" ? () => handleHomeAnchor(item.homeHref) : undefined}
                aria-current={isActive ? (context === "home" ? "location" : "page") : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center px-2 py-2 text-sm font-normal xl:px-4 transition after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#89cdff] after:transition-transform",
                  isActive ? "text-white after:scale-x-100" : "text-white/55 after:scale-x-0 hover:text-white",
                )}
              >
                {item.name}
              </Link>
            )
          })}
          <Link
            href="/hiring"
            aria-current={context === "hiring" ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center px-2 py-2 text-sm transition xl:px-4",
              context === "hiring" ? "text-white" : "text-white/55 hover:text-white",
            )}
          >
            Hiring
          </Link>
          <a
            href={cta.href}
            aria-current={context === "home" && activeSection === "contact" ? "location" : undefined}
            onClick={context === "home" ? () => handleHomeAnchor("#contact") : undefined}
            className="ml-3 inline-flex min-h-11 items-center rounded-xl border border-[#203038] bg-[#101a20] px-5 py-2.5 text-sm font-medium text-[#ecfeff] transition hover:border-[#89cdff]/45 hover:bg-[#132129]"
          >
            {cta.long}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={cta.href}
            aria-current={context === "home" && activeSection === "contact" ? "location" : undefined}
            onClick={context === "home" ? () => handleHomeAnchor("#contact") : undefined}
            className="hidden min-h-11 items-center rounded-xl border border-[#203038] bg-[#101a20] px-4 py-2 text-sm font-medium text-[#ecfeff] sm:inline-flex"
          >
            {cta.short}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="border-y border-white/10 bg-black/95 px-4 py-5 backdrop-blur-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => {
                const href = context === "home" ? item.homeHref : item.siteHref
                const isActive = context === "home" ? activeSection === item.id : context === "work" && item.id === "projects"
                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={context === "home" ? () => handleHomeAnchor(item.homeHref) : closeMobileMenu}
                    aria-current={isActive ? (context === "home" ? "location" : "page") : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/[0.06] hover:text-white",
                      isActive ? "bg-white/[0.06] text-white underline decoration-[#89cdff] underline-offset-8" : "text-white/75",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/hiring"
                onClick={closeMobileMenu}
                aria-current={context === "hiring" ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/[0.06] hover:text-white",
                  context === "hiring" ? "bg-white/[0.06] text-white underline decoration-[#89cdff] underline-offset-8" : "text-white/75",
                )}
              >
                Hiring
              </Link>
              <a href={cta.href} aria-current={context === "home" && activeSection === "contact" ? "location" : undefined} onClick={context === "home" ? () => handleHomeAnchor("#contact") : closeMobileMenu} className="mt-2 rounded-xl bg-[#ecfeff] px-4 py-3 text-center font-semibold text-[#030506]">
                {cta.long}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
