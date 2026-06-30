"use client"

import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const services = [
  {
    number: "01",
    title: "Aplicaciones web modernas",
    description: "Productos SaaS, portales privados, MVPs y plataformas web construidas con arquitectura clara y una base lista para evolucionar.",
    scope: "Producto · Full-stack · MVP",
    timing: "Por fases",
    price: "Diagnóstico previo",
  },
  {
    number: "02",
    title: "Landing pages premium",
    description: "Páginas comerciales con narrativa clara, dirección visual refinada y estructura pensada para convertir visitas calificadas.",
    scope: "Copy · UI/UX · Conversión",
    timing: "Sprint corto",
    price: "Alcance definido",
  },
  {
    number: "03",
    title: "E-commerce light",
    description: "Catálogos, reservas, pagos y flujos de compra simples para negocios que necesitan vender sin cargar una plataforma innecesaria.",
    scope: "Catálogo · Pagos · Operación",
    timing: "Por alcance",
    price: "Diagnóstico previo",
  },
  {
    number: "04",
    title: "Dashboards internos",
    description: "Paneles para visualizar datos, gestionar procesos y reducir trabajo manual dentro de equipos pequeños o negocios en crecimiento.",
    scope: "Datos · Roles · Operación",
    timing: "Por módulos",
    price: "Alcance definido",
  },
  {
    number: "05",
    title: "Automatizaciones con IA",
    description: "Asistentes, clasificación, generación de contenido, búsqueda semántica y flujos inteligentes con utilidad concreta.",
    scope: "IA aplicada · RAG · Workflows",
    timing: "Por caso de uso",
    price: "Diagnóstico previo",
  },
  {
    number: "06",
    title: "Integraciones cloud",
    description: "Conexiones con Supabase, GitHub, WhatsApp, Resend, APIs externas, Vercel y servicios serverless para operaciones más fluidas.",
    scope: "APIs · Webhooks · CI/CD",
    timing: "Por integración",
    price: "Alcance definido",
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
          subtitle="03 — Servicios"
          title="Software concreto para necesidades reales de negocio"
          description="Trabajamos con fundadores, equipos pequeños y negocios que necesitan convertir una idea, operación o proceso en una plataforma digital clara, usable y mantenible."
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
                  <span className="block text-xs text-white/30">Según fase</span>
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
          Alcance, inversión y prioridad técnica se definen después de una conversación de diagnóstico.
        </p>
      </div>
    </SectionContainer>
  )
}
