import type { ReactNode } from "react"
import { Footer } from "@/components/layout/footer/Footer"
import { Navbar } from "@/components/layout/header/Header"

type ProjectShellProps = {
  children: ReactNode
  activePage?: "work" | "hiring"
}

export function ProjectShell({ children, activePage = "work" }: ProjectShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cyan-50 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--observatory-graphite)]">
        Skip to main content
      </a>
      <Navbar context={activePage} />
      {children}
      <Footer />
    </div>
  )
}
