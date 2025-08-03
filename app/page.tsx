"use client"

import dynamic from "next/dynamic"

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
