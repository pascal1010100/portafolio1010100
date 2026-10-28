"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, ExternalLink, Github, Search, X } from "lucide-react"
import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectArchive() {
  const [searchQuery, setSearchQuery] = useState("")
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProjects = normalizedQuery ? projects.filter((project) => (
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery) ||
      project.technologies.some((technology) => technology.toLowerCase().includes(normalizedQuery)) ||
      project.category.toLowerCase().includes(normalizedQuery)
    )) : projects

  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen overflow-hidden bg-[#020303] pb-24 pt-36 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_78%_8%,rgba(112,170,255,0.11),transparent_33%),linear-gradient(to_bottom,rgba(3,5,6,0.2),#020303)]" />
      <div className="pointer-events-none absolute left-[8%] top-40 h-px w-[84%] bg-gradient-to-r from-transparent via-cyan-100/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:pb-16">
          <div>
            <Link href="/" className="group inline-flex min-h-11 items-center gap-2 text-sm text-white/55 transition hover:text-white">
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span>
              Back to the observatory
            </Link>
            <h1 className="mt-10 max-w-4xl text-balance font-display text-5xl font-medium leading-[0.96] tracking-[-0.04em] text-[#ecfeff] sm:text-6xl lg:text-7xl">
              Products built around real constraints.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
              A working archive of commercial websites, operational tools, and focused platforms. Each case documents the problem, my role, and the evidence available to review.
            </p>
          </div>

          <div className="lg:pb-1">
            <div className="mb-3 flex items-center justify-between text-xs text-white/45">
              <span>{filteredProjects.length} of {projects.length} projects</span>
              {searchQuery && <span>Filtered archive</span>}
            </div>
            <div className="group relative">
              <label htmlFor="project-search" className="sr-only">Search projects by name, category, or technology</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition group-focus-within:text-cyan-100" aria-hidden="true" />
              <input
                id="project-search"
                type="search"
                placeholder="Search the archive"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-cyan-100/35 focus:ring-1 focus:ring-cyan-100/20"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/[0.06] hover:text-white" aria-label="Clear project search">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="divide-y divide-white/10 border-b border-white/10">
          {filteredProjects.map((project, index) => {
            const reversed = index % 2 === 1
            return (
              <article key={project.slug} className="group grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
                <Link href={`/projects/${project.slug}`} className={cn("relative block aspect-[16/10] overflow-hidden bg-white/[0.025] lg:col-span-7", reversed && "lg:order-2")}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 730px, (min-width: 1024px) 58vw, 100vw"
                    className="object-cover opacity-80 grayscale-[0.2] transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 transition-opacity duration-700 group-hover:opacity-60" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </Link>

                <div className={cn("flex flex-col lg:col-span-5", reversed && "lg:order-1")}>
                  <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4 text-xs uppercase tracking-[0.16em]">
                    <span className="text-cyan-100/65">{project.category}</span>
                    <span className="font-mono text-white/35">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h2 className="mt-7 text-balance font-display text-3xl font-medium tracking-[-0.035em] text-[#ecfeff] sm:text-4xl">
                    <Link href={`/projects/${project.slug}`} className="transition group-hover:text-cyan-50">{project.title}</Link>
                  </h2>
                  <p className="mt-5 text-base leading-7 text-white/60">{project.description}</p>

                  <dl className="mt-7 grid gap-5 border-y border-white/10 py-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <dt className="text-xs text-white/40">Role</dt>
                      <dd className="mt-1.5 text-sm leading-6 text-white/75">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-white/40">Verification</dt>
                      <dd className="mt-1.5 flex items-center gap-2 text-sm leading-6 text-white/75">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-100/65" aria-hidden="true" />
                        {project.evidence.length} sources · {project.verifiedAt}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/45">
                    {project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href={`/projects/${project.slug}`} className="liquid-sheen inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ecfeff] px-5 py-3 text-sm font-semibold text-[#030506] transition hover:bg-white">
                      Read case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {project.demo && (
                      <a aria-label={`Open ${project.title} demo`} href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.05] hover:text-white">
                        Live product <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a aria-label={`Open ${project.title} repository`} href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.05] hover:text-white">
                        Source <Github className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="border-b border-white/10 py-24 text-center">
            <p className="text-xl text-white/70">No projects match “{searchQuery}”.</p>
            <p className="mt-3 text-sm text-white/45">Try a product name, category, or technology.</p>
            <button type="button" onClick={() => setSearchQuery("")} className="mt-7 inline-flex min-h-11 items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-cyan-100/35 hover:bg-white/[0.05]">
              Clear search
            </button>
          </div>
        )}

        <section className="grid gap-8 border-b border-white/10 py-16 lg:grid-cols-[1fr_auto] lg:items-end" aria-labelledby="projects-contact-title">
          <div>
            <h2 id="projects-contact-title" className="max-w-3xl text-balance font-display text-3xl font-medium tracking-[-0.035em] text-[#ecfeff] sm:text-4xl">
              Have a business need that deserves the same level of focus?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/55">Share the context, constraints, and outcome. I’ll help define a practical next step.</p>
          </div>
          <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-100/25 bg-cyan-100/[0.06] px-6 py-3 text-sm font-medium text-cyan-50 transition hover:border-cyan-100/45 hover:bg-cyan-100/[0.1]">
            Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  )
}
