import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const processSteps = [
  {
    title: "Understand the problem",
    description: "We review the goal, the people who will use the product, the priorities, and the constraints before deciding what to build.",
  },
  {
    title: "Design and build",
    description: "We turn the idea into a clear experience and build the highest-value parts first.",
  },
  {
    title: "Test and launch",
    description: "We validate core tasks, data, and performance before putting the product online.",
  },
  {
    title: "Measure and improve",
    description: "After launch, we use real results to decide what should improve next.",
  },
]

export function ProcessSection() {
  return (
    <SectionContainer id="process" className="border-t border-white/10 py-16 sm:py-20 lg:py-32">
      <SectionHeader
        subtitle="02 — How I work"
        title="From a clear need to a working product"
        description="I work in four stages to reduce uncertainty, build with focus, and launch with confidence."
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
