"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="border-y border-white/10 bg-white/[0.012] py-20 sm:py-28 lg:py-36">
      <SectionHeader
        subtitle="03 — Trabajo seleccionado"
        title="Productos con una idea clara detrás"
        description="Cada caso conecta una necesidad real con una solución digital coherente, medible y preparada para evolucionar."
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
      className={index === 0 ? "group lg:col-span-7" : index === 1 ? "group lg:col-span-5" : "group lg:col-span-12"}
    >
      <div className="boutique-panel overflow-hidden border border-white/10 bg-black transition duration-500 hover:border-cyan-100/25">
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
            sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : index === 1 ? "(min-width: 1024px) 42vw, 100vw" : "100vw"}
            className="object-cover opacity-85 grayscale-[0.15] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(190,230,255,0.2),transparent_34%),linear-gradient(115deg,transparent_40%,rgba(255,198,148,0.1),transparent_62%)] opacity-0 transition duration-700 group-hover:opacity-100" />
        </Link>

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/30">{project.category}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">{project.title}</h3>
            </div>
            <Link href={`/projects/${project.slug}`} aria-label={`Ver caso ${project.title}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-cyan-100/40 hover:bg-cyan-50 hover:text-black">
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="text-xs text-white/30">{project.technologies.slice(0, 4).join(" · ")}</p>
            <div className="flex items-center gap-3">
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
        </div>
      </div>
    </motion.article>
  )
}
