import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("@/components/layout/header/Header").then((mod) => mod.Navbar))
const HeroSection = dynamic(() => import("@/components/sections/hero/HeroSection").then((mod) => mod.HeroSection))
const SkillsSection = dynamic(() => import("@/components/sections/skills/SkillsSection").then((mod) => mod.SkillsSection))
const ServicesSection = dynamic(() => import("@/components/sections/services/ServicesSection").then((mod) => mod.ServicesSection))
const ProjectsSection = dynamic(() => import("@/components/sections/projects/ProjectsSection").then((mod) => mod.ProjectsSection))
const ContactSection = dynamic(() => import("@/components/sections/contact/ContactSection").then((mod) => mod.ContactSection))
const Footer = dynamic(() => import("@/components/layout/footer/Footer").then((mod) => mod.Footer))

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
