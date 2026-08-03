import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const services = [
  {
    number: "01",
    title: "Conversion Launch",
    description: "A focused commercial website for a business that needs to explain its offer and guide visitors toward bookings, inquiries, or sales.",
    scope: "Positioning · Responsive design · Development · Technical SEO",
    fit: "For a clearer commercial launch",
  },
  {
    number: "02",
    title: "Operations Flow",
    description: "A scoped web tool for a process that currently depends on messages, spreadsheets, or manual coordination.",
    scope: "Process mapping · Data capture · Focused dashboard · Integrations",
    fit: "For a structured operational workflow",
  },
  {
    number: "03",
    title: "Product MVP",
    description: "A first operational version of a web product built to test a focused proposition without overbuilding the platform.",
    scope: "MVP definition · Full-stack development · Critical integrations · Launch",
    fit: "For a focused first release",
  },
]

export function ServicesSection() {
  return (
    <SectionContainer id="services" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(125,180,255,0.08),transparent_28%)]" />
      <div className="relative">
        <SectionHeader
          subtitle="02 — Ways to work together"
          title="Start with the problem closest to yours"
          description="Three focused engagements provide a clear starting point. Final scope, milestones, and investment are defined after an initial conversation."
        />

        <div className="border-t border-white/12">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="boutique-row group grid gap-5 border-b border-white/10 py-7 transition-colors sm:px-5 sm:py-8 lg:grid-cols-[4rem_1fr_0.9fr_auto] lg:items-center lg:gap-10"
            >
              <span className="text-xs tracking-[0.18em] text-white/65">{service.number}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">{service.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{service.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-white/65">{service.scope}</p>
                <p className="text-white/55">{service.fit}</p>
              </div>
              <div className="flex items-center justify-between gap-6 lg:justify-end">
                <Link
                  href="#contact"
                  aria-label={`Discuss ${service.title}`}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/65 transition group-hover:border-cyan-100/35 group-hover:bg-cyan-100 group-hover:text-black"
                >
                  Discuss {service.title}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-5 text-white/50">
          Before work begins, each engagement defines its written scope, acceptance criteria, milestones, and responsibilities.
        </p>
      </div>
    </SectionContainer>
  )
}
