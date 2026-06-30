"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const processSteps = [
  {
    title: "Architecture",
    description: "Definimos estructura, datos, integraciones y límites técnicos antes de escalar complejidad.",
  },
  {
    title: "Documentation",
    description: "Convertimos decisiones clave en documentación útil para reducir ambigüedad y sostener continuidad.",
  },
  {
    title: "AI-Assisted Development",
    description: "Usamos IA como acelerador de ingeniería, manteniendo criterio humano sobre diseño, código y producto.",
  },
  {
    title: "Testing & CI",
    description: "Validamos tipos, lint, build, datos y flujos críticos antes de publicar o evolucionar una entrega.",
  },
  {
    title: "Deployment",
    description: "Publicamos con entornos claros, variables documentadas y una base preparada para operación.",
  },
  {
    title: "Continuous Improvement",
    description: "El producto queda listo para evolucionar con feedback, evidencia y cambios controlados.",
  },
]

export function ProcessSection() {
  return (
    <SectionContainer id="process" className="border-t border-white/10 py-20 sm:py-28 lg:py-36">
      <SectionHeader
        subtitle="02 — How we build"
        title="Una metodología de ingeniería para construir productos con criterio"
        description="Pascal.dev combina discovery, arquitectura, documentación, desarrollo asistido por IA, testing, CI/CD y despliegue para llevar ideas digitales desde una primera decisión clara hasta un producto mantenible."
      />

      <div className="grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group min-h-[13rem] border-b border-white/10 p-6 transition-colors hover:bg-white/[0.018] md:border-r lg:p-8 lg:[&:nth-child(3n)]:border-r-0"
          >
            <p className="text-xs tracking-[0.18em] text-cyan-100/45">0{index + 1}</p>
            <h3 className="mt-6 text-xl font-medium tracking-[-0.025em] text-white">{step.title}</h3>
            <p className="mt-4 text-sm leading-6 text-white/45">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  )
}
