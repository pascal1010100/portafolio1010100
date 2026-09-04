import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react"
import { ProjectShell } from "@/components/layout/ProjectShell"
import { absoluteUrl } from "@/lib/site"

const description =
  "Product-focused full-stack developer in Guatemala, available for remote opportunities. Six years of practical JavaScript and React experience."

export const metadata: Metadata = {
  title: "Hiring | Pascal.dev",
  description,
  alternates: {
    canonical: absoluteUrl("/hiring"),
  },
  openGraph: {
    title: "Hiring | Pascal.dev",
    description,
    type: "profile",
    url: absoluteUrl("/hiring"),
    siteName: "pascal.dev",
    images: [
      {
        url: "/social-preview-v2.png",
        width: 1200,
        height: 630,
        alt: "Pascal.dev — Product-focused full-stack developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiring | Pascal.dev",
    description,
    images: ["/social-preview-v2.png"],
  },
}

const profileFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Guatemala · Remote",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "Native Spanish · English B2",
  },
  {
    icon: BriefcaseBusiness,
    label: "Experience",
    value: "6 years of practical JavaScript and React development",
  },
  {
    icon: Clock3,
    label: "Availability",
    value: "Remote · Up to 30 hours per week",
  },
  {
    icon: CircleDollarSign,
    label: "Contract rate",
    value: "USD 35/hour target · USD 30/hour floor",
  },
]

const strengths = [
  {
    title: "Product thinking",
    body: "Turns business processes and opportunities into focused scopes, clear user flows, and products ready to operate.",
  },
  {
    title: "Full-stack delivery",
    body: "Builds responsive interfaces, application logic, PostgreSQL/Supabase data layers, and REST or webhook integrations with Next.js and TypeScript.",
  },
  {
    title: "Delivery quality",
    body: "Treats accessibility, Playwright testing, CI and deployment, performance, SEO, analytics, and documented handoff as part of the product.",
  },
]

export default function HiringPage() {
  return (
    <ProjectShell activePage="hiring">
      <main id="main-content" tabIndex={-1} className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_72%_14%,rgba(112,170,255,0.12),transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="border-b border-white/10 pb-16 sm:pb-20" aria-labelledby="hiring-title">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-100/65">
              Open to remote opportunities
            </p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:items-end">
              <div>
                <h1 id="hiring-title" className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  Product-focused full-stack developer.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
                  I build clear, maintainable web products by connecting product thinking, interface engineering, integrations, and delivery quality.
                </p>
                <p className="mt-4 max-w-2xl leading-7 text-white/50">
                  My six years describe practical development experience with JavaScript and React, not six years of formal employment.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:josemanu0885@gmail.com?subject=R%C3%A9sum%C3%A9%20request%20from%20Pascal.dev"
                  className="liquid-sheen inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-50 px-6 py-3 text-sm font-semibold text-[var(--observatory-graphite)] hover:bg-white"
                >
                  Request résumé <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/projects"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-100/40 hover:bg-white/[0.05]"
                >
                  Review case studies <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[0.72fr_1.28fr] sm:py-20" aria-labelledby="profile-title">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-100/60">Profile</p>
              <h2 id="profile-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                A practical product engineering profile.
              </h2>
            </div>

            <dl className="divide-y divide-white/10 border-y border-white/10">
              {profileFacts.map((fact) => {
                const Icon = fact.icon

                return (
                  <div key={fact.label} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:items-center">
                    <dt className="flex items-center gap-2 text-sm text-white/45">
                      <Icon className="h-4 w-4 text-cyan-100/55" aria-hidden="true" />
                      {fact.label}
                    </dt>
                    <dd className="text-base text-white/85 sm:text-lg">{fact.value}</dd>
                  </div>
                )
              })}
            </dl>
          </section>

          <section className="py-16 sm:py-20" aria-labelledby="strengths-title">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-100/60">How I contribute</p>
              <h2 id="strengths-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                From a defined need to a working product.
              </h2>
            </div>

            <div className="mt-10 grid border-y border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
              {strengths.map((strength, index) => (
                <article key={strength.title} className="border-b border-white/10 py-8 last:border-b-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <span className="font-mono text-xs text-cyan-100/45">0{index + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold text-white">{strength.title}</h3>
                  <p className="mt-3 leading-7 text-white/55">{strength.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-gradient-to-br from-cyan-100/[0.08] via-white/[0.025] to-transparent px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-end lg:justify-between lg:gap-10" aria-labelledby="hiring-contact-title">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-100/60">Role or collaboration</p>
              <h2 id="hiring-contact-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                Let&apos;s see whether the opportunity is a good fit.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/60">
                Share the role, product context, and the problems you need help solving. Availability and timing can be confirmed directly.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
              <a href="https://github.com/pascal1010100" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.05]">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/josema-aguilar-dev" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.05]">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
              <a href="mailto:josemanu0885@gmail.com?subject=Remote%20opportunity%20from%20Pascal.dev" className="liquid-sheen inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-50 px-5 py-3 text-sm font-semibold text-[var(--observatory-graphite)] hover:bg-white">
                Email Pascal <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </ProjectShell>
  )
}
