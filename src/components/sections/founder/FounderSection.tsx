import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { profile } from "@/data/profile"

const links = [
  { label: "View GitHub", href: profile.social.github, icon: Github },
  { label: "View LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  { label: "Request my résumé", href: `${profile.social.email}?subject=Resume%20request`, icon: Mail },
]

export function FounderSection() {
  return (
    <SectionContainer id="about" className="border-y border-white/10 bg-white/[0.012] py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
        <SectionHeader
          subtitle="05 — Founder-led practice"
          title="One direct point of contact for product and engineering"
          description="I’m Pascal, the independent product engineer behind Pascal.dev. I work directly with founders, small teams, and businesses across product definition, interface design, full-stack development, and the delivery agreed for each engagement."
          className="mb-0"
        />

        <div className="boutique-panel border border-white/10 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.16em] text-cyan-100/70">Pascal.dev · Guatemala · Remote</p>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Working directly keeps product decisions and engineering execution connected. Scope, responsibilities, and any specialist needs are made explicit before work begins.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/75 transition hover:border-cyan-100/35 hover:bg-cyan-50 hover:text-black">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
