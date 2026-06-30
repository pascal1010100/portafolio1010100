"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const processSteps = [
  {
    title: "Arquitectura",
    description: "Definimos estructura, datos, integraciones y límites técnicos antes de escalar complejidad.",
  },
  {
    title: "Documentación",
    description: "Convertimos decisiones clave en documentación útil para reducir ambigüedad y sostener continuidad.",
  },
  {
    title: "Desarrollo asistido por IA",
    description: "Usamos IA como acelerador de ingeniería, manteniendo criterio humano sobre diseño, código y producto.",
  },
  {
    title: "Pruebas y CI",
    description: "Validamos tipos, lint, build, datos y flujos críticos antes de publicar o evolucionar una entrega.",
  },
  {
    title: "Despliegue",
    description: "Publicamos con entornos claros, variables documentadas y una base preparada para operación.",
  },
  {
    title: "Mejora continua",
    description: "El producto queda listo para evolucionar con feedback, evidencia y cambios controlados.",
  },
]

export function ProcessSection() {
  return (
    <SectionContainer id="process" className="border-t border-white/10 py-16 sm:py-20 lg:py-32">
      <SectionHeader
        subtitle="02 — Cómo construimos"
        title="Una metodología de ingeniería para construir productos con criterio"
        description="Pascal.dev combina discovery, arquitectura, documentación, desarrollo asistido por IA, testing, CI/CD y despliegue para llevar ideas digitales desde una primera decisión clara hasta un producto mantenible."
        className="sm:mb-10 lg:mb-14"
      />

      <div className="border-y border-white/10 sm:hidden">
        {processSteps.map((step, index) => (
          <details key={step.title} className="group border-b border-white/10 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center gap-3 py-5 [&::-webkit-details-marker]:hidden">
              <span className="w-6 shrink-0 text-xs tracking-[0.14em] text-cyan-100/45">0{index + 1}</span>
              <span className="min-w-0 flex-1 text-base font-medium tracking-[-0.02em] text-white">{step.title}</span>
              <span className="text-xl font-light text-white/35 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="pb-5 pl-9 pr-4 text-sm leading-6 text-white/45">{step.description}</p>
          </details>
        ))}
      </div>

      <div className="hidden gap-px border-y border-white/10 bg-white/10 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-[#030506] p-6 transition-colors hover:bg-[#07090a] lg:p-8"
          >
            <p className="text-xs tracking-[0.18em] text-cyan-100/45">0{index + 1}</p>
            <h3 className="mt-4 text-xl font-medium tracking-[-0.025em] text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/45">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  )
}
