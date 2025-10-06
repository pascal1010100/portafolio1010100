"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGitkraken,
} from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiShadcnui,
  SiPostgresql,
  SiVercel,
  SiSupabase,
  SiExpress,
  SiApollographql,
  SiGraphql,
} from "react-icons/si"
import { TbApi } from "react-icons/tb"

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Shadcn/ui", icon: SiShadcnui, color: "#000000" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "REST API", icon: TbApi, color: "#00A1F1" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitKraken", icon: FaGitkraken, color: "#179287" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
]

const glowColors = [
  "rgba(97, 218, 251, 0.7)",  // React blue
  "rgba(0, 0, 0, 0.7)",       // Next.js black
  "rgba(49, 120, 198, 0.7)",  // TypeScript blue
  "rgba(6, 182, 212, 0.7)",   // Tailwind cyan
  "rgba(0, 0, 0, 0.7)",       // Shadcn black
  "rgba(51, 153, 51, 0.7)",   // Node.js green
  "rgba(225, 0, 152, 0.7)",   // GraphQL pink
  "rgba(0, 161, 241, 0.7)",   // API blue
  "rgba(62, 207, 142, 0.7)",  // Supabase green
  "rgba(51, 103, 145, 0.7)",  // PostgreSQL blue
  "rgba(0, 0, 0, 0.7)",       // Express black
  "rgba(240, 80, 50, 0.7)",   // Git orange
  "rgba(23, 146, 135, 0.7)",  // GitKraken teal
  "rgba(0, 0, 0, 0.7)",       // Vercel black
]

// Animaciones
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (hoveredIndex !== null) return // pausa si hay hover
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * skills.length)
      setActiveIndex(random)
    }, 2500) // 🔁 cambia cada 2.5 segundos

    return () => clearInterval(interval)
  }, [hoveredIndex])

  return (
    <SectionContainer id="skills" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">Stack Tecnológico</h2>
        <p className="text-sm text-foreground-muted mt-2">
          Herramientas que uso para construir experiencias digitales.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => {
          const isActive = index === (hoveredIndex ?? activeIndex)
          const glowColor = glowColors[index % glowColors.length]

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-md border border-border bg-gradient-to-br from-background via-background/50 to-background/10 transition-all duration-700 ease-in-out`}
              style={{
                boxShadow: isActive ? `0 0 18px ${glowColor}` : "none",
                transform: isActive ? "scale(1.08)" : "scale(1)",
              }}
            >
              <skill.icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              />
              <span
                className={`text-xs text-center ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </SectionContainer>
  )
}
