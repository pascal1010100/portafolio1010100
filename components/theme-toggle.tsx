"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg border border-border/50 bg-background/50 animate-pulse" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background-secondary/50 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icons container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun
          className={`absolute w-4 h-4 text-amber-500 transition-all duration-500 ${
            theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute w-4 h-4 text-blue-400 transition-all duration-500 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          theme === "dark"
            ? "shadow-lg shadow-blue-400/0 group-hover:shadow-blue-400/20"
            : "shadow-lg shadow-amber-500/0 group-hover:shadow-amber-500/20"
        }`}
      />
    </button>
  )
}
