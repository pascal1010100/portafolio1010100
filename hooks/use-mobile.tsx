"use client";

import * as React from "react"
import dynamic from "next/dynamic"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Dynamic imports con SSR desactivado
const Navbar = dynamic(() => import("@/components/navbar").then(mod => mod.Navbar), { ssr: false })
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => mod.HeroSection), { ssr: false })
const SkillsSection = dynamic(() => import("@/components/skills-section").then(mod => mod.SkillsSection), { ssr: false })
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => mod.ProjectsSection), { ssr: false })
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer), { ssr: false })

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
