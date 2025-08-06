import { SectionContainer } from "./ui/section-container"
import { FaReact, FaNodeJs, FaGitAlt, FaGitkraken } from "react-icons/fa"
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiShadcnui, SiPostgresql, SiVercel, SiSupabase, SiExpress, SiApollographql } from "react-icons/si"

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

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">Stack Tecnológico</h2>
        <p className="text-sm text-foreground-muted mt-2">
          Herramientas que uso para construir experiencias digitales.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center w-20 h-20 rounded-md border border-border bg-gradient-to-br from-background via-background/50 to-background/10 hover:from-[#0f0f0f] hover:to-[#1f1f1f] hover:shadow-[0_0_10px_#00fff7] transition duration-300"
          >
            <skill.icon className="w-6 h-6 text-accent-cyan mb-1 group-hover:animate-pulse" />
            <span className="text-xs text-white text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
