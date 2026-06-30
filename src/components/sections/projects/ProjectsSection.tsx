"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="border-y border-white/10 bg-white/[0.012] py-20 sm:py-28 lg:py-36">
      <SectionHeader
        subtitle="04 — Trabajo seleccionado"
        title="Casos que demuestran criterio de producto e ingeniería"
        description="Una selección de productos, prototipos y sistemas desplegados donde cada caso muestra problema, solución, stack, estado y evidencia disponible."
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionContainer>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={index === 0 ? "group lg:col-span-7" : index === 1 ? "group lg:col-span-5" : "group lg:col-span-6"}
    >
      <div className="boutique-panel flex h-full flex-col overflow-hidden border border-white/10 bg-black transition duration-500 hover:border-cyan-100/25">
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "relative block overflow-hidden bg-white/[0.03]",
            index === 0 ? "h-60 sm:h-[26rem]" : "h-60 sm:h-72"
          )}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : index === 1 ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
            className="object-cover opacity-85 grayscale-[0.15] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(190,230,255,0.2),transparent_34%),linear-gradient(115deg,transparent_40%,rgba(255,198,148,0.1),transparent_62%)] opacity-0 transition duration-700 group-hover:opacity-100" />
        </Link>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/42">{project.category}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">{project.title}</h3>
            </div>
            <Link href={`/projects/${project.slug}`} aria-label={`Ver caso ${project.title}`} className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-cyan-100/40 hover:bg-cyan-50 hover:text-black sm:inline-flex">
              Ver caso
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">{project.description}</p>

          <div className="mt-5 grid gap-2 text-xs text-white/42 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.018] px-3 py-2">
              <span className="block text-white/28">Rol</span>
              <span className="mt-1 block text-white/58">{project.role}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.018] px-3 py-2">
              <span className="block text-white/28">Estado</span>
              <span className="mt-1 block text-white/58">{project.status}</span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((technology) => (
                <span key={technology} className="rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[11px] text-white/45">
                  {technology}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/projects/${project.slug}`} aria-label={`Ver caso ${project.title}`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/55 transition hover:border-cyan-100/40 hover:bg-cyan-50 hover:text-black sm:hidden">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Abrir demo de ${project.title}`} className="text-white/35 transition hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Abrir código de ${project.title}`} className="text-white/35 transition hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/38">
            {project.evidence.slice(0, 3).map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-cyan-100/55" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
