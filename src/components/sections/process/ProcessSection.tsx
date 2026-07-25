import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const processSteps = [
  {
    title: "Entender el problema",
    description: "Revisamos el objetivo, las personas que usarán el producto, las prioridades y las restricciones antes de decidir qué construir.",
  },
  {
    title: "Diseñar y construir",
    description: "Convertimos la idea en una experiencia clara y desarrollamos primero lo que aporta más valor.",
  },
  {
    title: "Probar y publicar",
    description: "Revisamos las tareas principales, los datos y el rendimiento antes de poner el producto en línea.",
  },
  {
    title: "Medir y mejorar",
    description: "Después del lanzamiento, usamos resultados reales para decidir qué conviene mejorar a continuación.",
  },
]

export function ProcessSection() {
  return (
    <SectionContainer id="process" className="border-t border-white/10 py-16 sm:py-20 lg:py-32">
      <SectionHeader
        subtitle="02 — Cómo trabajo"
        title="De una necesidad clara a un producto funcionando"
        description="Trabajo en cuatro etapas para reducir dudas, construir con foco y lanzar con confianza."
        className="sm:mb-10 lg:mb-14"
      />

      <div className="border-y border-white/10 sm:hidden">
        {processSteps.map((step, index) => (
          <details key={step.title} className="group border-b border-white/10 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center gap-3 py-5 [&::-webkit-details-marker]:hidden">
              <span className="w-6 shrink-0 text-xs tracking-[0.14em] text-cyan-100/45">0{index + 1}</span>
              <span className="min-w-0 flex-1 text-base font-medium tracking-[-0.02em] text-white">{step.title}</span>
              <span className="text-xl font-light text-white/55 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="pb-5 pl-9 pr-4 text-sm leading-6 text-white/60">{step.description}</p>
          </details>
        ))}
      </div>

      <div className="hidden gap-px border-y border-white/10 bg-white/10 sm:grid sm:grid-cols-2">
        {processSteps.map((step, index) => (
          <article
            key={step.title}
            className="group bg-[var(--observatory-graphite)] p-6 transition-colors hover:bg-[#07090a] lg:p-8"
          >
            <p className="text-xs tracking-[0.18em] text-cyan-100/60">0{index + 1}</p>
            <h3 className="mt-4 text-xl font-medium tracking-[-0.025em] text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{step.description}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}
