import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"

// 👇 carga dinámica de HeroSection sin SSR
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection), {
  ssr: false,
});


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
