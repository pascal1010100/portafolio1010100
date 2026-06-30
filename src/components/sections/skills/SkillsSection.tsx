"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { skills } from "@/data/skills"

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="py-20 sm:py-28 lg:py-36">
      <SectionHeader
        subtitle="01 — Capacidades"
        title="Capacidades para construir software de principio a fin"
        description="No vendemos herramientas aisladas. Diseñamos, desarrollamos y desplegamos sistemas digitales completos usando tecnología moderna como soporte de decisiones de producto."
      />

      <div className="grid border-y border-white/10 md:grid-cols-3">
        {skills.map((group, index) => (
          <motion.article
            key={group.category}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/10 py-8 sm:py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 lg:px-10"
          >
            <p className="text-xs text-white/25">0{index + 1}</p>
            <h3 className="mt-5 text-xl font-medium tracking-[-0.02em] text-white">{group.category}</h3>
            <p className="mt-3 text-sm leading-6 text-white/42">{group.description}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {group.items.map((skill) => (
                <span key={skill.name} className="text-sm text-white/45 transition hover:text-white/80">
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  )
}
