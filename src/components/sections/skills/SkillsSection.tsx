"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { skills } from "@/data/skills"

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="py-16 sm:py-20 lg:py-32">
      <SectionHeader
        subtitle="01 — Capacidades"
        title="Capacidades para construir software de principio a fin"
        description="No vendemos herramientas aisladas. Diseñamos, desarrollamos y desplegamos sistemas digitales completos usando tecnología moderna como soporte de decisiones de producto."
        className="sm:mb-10 lg:mb-14"
      />

      <div className="border-y border-white/10 sm:hidden">
        {skills.map((group, index) => (
          <details key={group.category} className="group border-b border-white/10 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center gap-3 py-5 [&::-webkit-details-marker]:hidden">
              <span className="w-6 shrink-0 text-xs text-cyan-100/45">0{index + 1}</span>
              <span className="min-w-0 flex-1 text-base font-medium tracking-[-0.02em] text-white">{group.category}</span>
              <span className="text-xl font-light text-white/35 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="pb-5 pl-9 pr-4">
              <p className="text-sm leading-6 text-white/45">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((skill) => (
                  <span key={skill.name} className="text-xs text-white/45">{skill.name}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="hidden gap-px border-y border-white/10 bg-white/10 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <motion.article
            key={group.category}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#030506] py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-9"
          >
            <p className="text-xs text-white/25">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-medium tracking-[-0.02em] text-white sm:text-xl">{group.category}</h3>
            <p className="mt-2 text-sm leading-6 text-white/42">{group.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6">
              {group.items.map((skill) => (
                <span key={skill.name} className="text-xs text-white/45 transition hover:text-white/80 sm:text-sm">
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
