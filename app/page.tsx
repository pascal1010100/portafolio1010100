import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

// 👇 carga dinámica de HeroSection sin SSR
const HeroSection = dynamic(() => import("@/components/hero-section"), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
