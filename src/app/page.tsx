"use client"

import dynamic from "next/dynamic"

// Layout Components
const Navbar = dynamic(
  () => import("@/components/layout/header/Header").then((mod) => mod.Navbar),
  { ssr: false }
)

const Footer = dynamic(
  () => import("@/components/layout/footer/Footer").then((mod) => mod.Footer),
  { ssr: false }
)

// Section Components

const HeroSection = dynamic(
  () => import("@/components/sections/hero/HeroSection").then((mod) => mod.HeroSection)
)

const SkillsSection = dynamic(
  () => import("@/components/sections/skills/SkillsSection").then((mod) => mod.SkillsSection)
)

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects/ProjectsSection").then((mod) => mod.ProjectsSection)
)

const ContactSection = dynamic(
  () => import("@/components/sections/contact/ContactSection").then((mod) => mod.ContactSection)
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
