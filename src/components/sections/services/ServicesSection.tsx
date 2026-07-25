import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const services = [
  {
    number: "01",
    title: "Productos web y primeras versiones",
    description: "Diseño y desarrollo productos SaaS, plataformas y portales para validar una idea y comenzar con una base sólida.",
    scope: "Planificación · Diseño · Desarrollo",
    timing: "Trabajo por etapas",
    price: "Propuesta personalizada",
  },
  {
    number: "02",
    title: "Herramientas para el día a día",
    description: "Tiendas en línea, reservas y paneles internos que simplifican el trabajo del negocio y la experiencia de sus clientes.",
    scope: "Procesos · Datos · Automatización",
    timing: "Trabajo por módulos",
    price: "Propuesta personalizada",
  },
  {
    number: "03",
    title: "IA, automatizaciones e integraciones",
    description: "Conecto asistentes, servicios externos y herramientas con IA para resolver tareas concretas y reducir trabajo manual.",
    scope: "IA · APIs · Automatización",
    timing: "Según la necesidad",
    price: "Propuesta personalizada",
  },
]

export function ServicesSection() {
  return (
    <SectionContainer id="services" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(125,180,255,0.08),transparent_28%)]" />
      <div className="relative">
        <SectionHeader
          subtitle="03 — Servicios"
          title="Software pensado para resolver problemas reales"
          description="Ayudo a fundadores, equipos pequeños y negocios a convertir una necesidad en un producto que puedan usar y hacer crecer."
        />

        <div className="border-t border-white/12">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="boutique-row group grid gap-5 border-b border-white/10 py-7 transition-colors sm:px-5 sm:py-8 lg:grid-cols-[4rem_1.05fr_1fr_auto] lg:items-center lg:gap-10"
            >
              <span className="text-xs tracking-[0.18em] text-white/50">{service.number}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">{service.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{service.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-white/55">{service.scope}</p>
                <p className="text-white/55">{service.timing}</p>
              </div>
              <div className="flex items-center justify-between gap-6 lg:justify-end">
                <div className="space-y-1 lg:text-right">
                  <span className="block whitespace-nowrap text-sm font-medium text-cyan-100/75">{service.price}</span>
                  <span className="block text-xs text-white/50">Según el proyecto</span>
                </div>
                <Link
                  href="#contact"
                  aria-label={`Hablar sobre ${service.title}`}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/65 transition group-hover:border-cyan-100/35 group-hover:bg-cyan-100 group-hover:text-black"
                >
                  Hablemos
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-5 text-white/50">
          El tiempo, la inversión y lo que incluye cada proyecto se acuerdan después de entender lo que necesitas.
        </p>
      </div>
    </SectionContainer>
  )
}
