import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"

const services = [
  {
    number: "01",
    title: "Web products and first releases",
    description: "I design and build SaaS products, platforms, and portals to validate an idea on solid foundations.",
    scope: "Planning · Design · Development",
    timing: "Phased delivery",
    price: "Custom proposal",
  },
  {
    number: "02",
    title: "Tools for daily operations",
    description: "Online stores, booking flows, and internal dashboards that simplify operations and improve customer experience.",
    scope: "Processes · Data · Automation",
    timing: "Modular delivery",
    price: "Custom proposal",
  },
  {
    number: "03",
    title: "AI, automation, and integrations",
    description: "I connect assistants, external services, and AI tools to solve specific tasks and reduce manual work.",
    scope: "AI · APIs · Automation",
    timing: "Based on the need",
    price: "Custom proposal",
  },
]

export function ServicesSection() {
  return (
    <SectionContainer id="services" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(125,180,255,0.08),transparent_28%)]" />
      <div className="relative">
        <SectionHeader
          subtitle="03 — Services"
          title="Software designed to solve real problems"
          description="I help founders, small teams, and businesses turn a need into a product they can use and grow."
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
                  <span className="block text-xs text-white/50">Project dependent</span>
                </div>
                <Link
                  href="#contact"
                  aria-label={`Discuss ${service.title}`}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/65 transition group-hover:border-cyan-100/35 group-hover:bg-cyan-100 group-hover:text-black"
                >
                  Let's talk
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-5 text-white/50">
          Timeline, investment, and scope are agreed after understanding what you need.
        </p>
      </div>
    </SectionContainer>
  )
}
