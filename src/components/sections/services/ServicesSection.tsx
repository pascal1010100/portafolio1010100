"use client"

import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const services = [
  {
    number: "01",
    title: "Launch Sprint",
    description: "De una idea dispersa a una primera versión clara, deseable y lista para probar con usuarios reales.",
    scope: "Estrategia · UX/UI · MVP",
    timing: "3–5 semanas",
    price: "Desde $5k",
  },
  {
    number: "02",
    title: "Product System",
    description: "Diseño y desarrollo de un producto digital completo, con una base visual y técnica preparada para crecer.",
    scope: "Producto · Full-stack · Design system",
    timing: "6–12 semanas",
    price: "Desde $12k",
  },
  {
    number: "03",
    title: "AI Integration",
    description: "Funciones de AI con una utilidad concreta: automatización, asistentes, búsqueda semántica y flujos inteligentes.",
    scope: "AI aplicada · RAG · Automatización",
    timing: "4–8 semanas",
    price: "Desde $8k",
  },
]

const processSignals = [
  "Diagnóstico antes de cotizar",
  "Alcance claro por fases",
  "Diseño e ingeniería conectados",
]

export function ServicesSection() {
  return (
    <SectionContainer id="services" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(125,180,255,0.08),transparent_28%)]" />
      <div className="relative">
        <SectionHeader
          subtitle="02 — Formas de colaborar"
          title="Del concepto al producto, sin ruido entre capas"
          description="Tres formatos concretos para avanzar con velocidad, criterio y una inversión visible desde el inicio."
        />

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {processSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.018] px-4 py-3 text-sm text-white/55">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-100/65" aria-hidden="true" />
              <span>{signal}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/12">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="boutique-row group grid gap-5 border-b border-white/10 py-7 transition-colors sm:px-5 sm:py-8 lg:grid-cols-[4rem_1.05fr_1fr_auto] lg:items-center lg:gap-10"
            >
              <span className="text-xs tracking-[0.18em] text-white/28">{service.number}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">{service.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">{service.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-white/55">{service.scope}</p>
                <p className="text-white/28">{service.timing}</p>
              </div>
              <div className="flex items-center justify-between gap-6 lg:justify-end">
                <div className="space-y-1 lg:text-right">
                  <span className="block whitespace-nowrap text-sm font-medium text-cyan-100/75">{service.price}</span>
                  <span className="block text-xs text-white/30">Diagnóstico previo</span>
                </div>
                <Link
                  href="#contact"
                  aria-label={`Consultar ${service.title}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/65 transition group-hover:border-cyan-100/35 group-hover:bg-cyan-100 group-hover:text-black"
                >
                  Consultar
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-5 text-white/28">
          Alcance e inversión final se confirman después de una conversación de diagnóstico.
        </p>
      </div>
    </SectionContainer>
  )
}
