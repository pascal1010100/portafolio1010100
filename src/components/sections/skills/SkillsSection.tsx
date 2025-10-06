"use client"

import { useEffect, useState } from "react"
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
} from "react-icons/si"

const skills = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Shadcn/ui", icon: SiShadcnui },
  { name: "Node.js", icon: FaNodeJs },
  { name: "REST APIs", icon: SiApollographql },
  { name: "Supabase", icon: SiSupabase },
  { name: "Git", icon: FaGitAlt },
  { name: "GitKraken", icon: FaGitkraken },
  { name: "Vercel", icon: SiVercel },
]

const glowColors = ["#00fff7", "#ff00ff", "#39ff14", "#ff9900", "#00aaff"]

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
