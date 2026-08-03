import { Navbar } from "@/components/layout/header/Header"
import { Footer } from "@/components/layout/footer/Footer"
import { ContactSection } from "@/components/sections/contact/ContactSection"
import { HeroSection } from "@/components/sections/hero/HeroSection"
import { FounderSection } from "@/components/sections/founder/FounderSection"
import { ProcessSection } from "@/components/sections/process/ProcessSection"
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection"
import { ServicesSection } from "@/components/sections/services/ServicesSection"
import { SkillsSection } from "@/components/sections/skills/SkillsSection"

export default function Home() {
  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cyan-50 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--observatory-graphite)]"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <SkillsSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
