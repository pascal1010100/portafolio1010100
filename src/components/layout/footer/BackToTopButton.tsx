"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-[opacity,transform,background-color] duration-300 hover:bg-primary/90 focus:outline-none",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0",
      )}
      aria-label="Volver al inicio"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
