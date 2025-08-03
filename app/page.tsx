import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

// Dynamic imports con SSR desactivado
const HeroSection = dynamic(() =>
  import("@/components/hero-section").then((mod) => mod.HeroSection),
  { ssr: false }
)

const ContactSection = dynamic(() =>
  import("@/components/contact-section").then((mod) => mod.ContactSection),
  { ssr: false }
)

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