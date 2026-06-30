"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, Github, ExternalLink, Search } from "lucide-react"
import { projects } from "@/data/projects"
import Link from "next/link"

export function ProjectArchive() {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter projects based on search query
    const filteredProjects = projects.filter(project => {
        const query = searchQuery.toLowerCase()
        return (
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
            project.category.toLowerCase().includes(query)
        )
    })

    return (
        <div className="relative min-h-screen bg-background pt-32 pb-20">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al inicio
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                                Casos de trabajo
                            </h1>
                            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                                Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.
                            </p>
                        </div>

                        <div className="relative group w-full md:w-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar proyectos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-zinc-900/50 border border-white/10 rounded-full py-3 pl-10 pr-6 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all w-full md:w-64 placeholder:text-zinc-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex flex-col rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors overflow-hidden h-full"
                        >
                            <Link href={`/projects/${project.slug}`} className="w-full aspect-video overflow-hidden bg-zinc-800 border-b border-white/5 block relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-mono text-primary/80 mb-2 block uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <Link href={`/projects/${project.slug}`}>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </Link>
                                    </div>
                                    <div className="flex gap-2">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="mb-5 grid gap-2 text-xs text-zinc-500">
                                    <div className="rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                                        <span className="block text-zinc-600">Rol</span>
                                        <span className="mt-1 block text-zinc-300">{project.role}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.evidence.slice(0, 2).map((item) => (
                                            <span key={item} className="inline-flex items-center gap-1.5 text-zinc-400">
                                                <CheckCircle2 className="h-3 w-3 text-cyan-100/55" aria-hidden="true" />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                    {project.technologies.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-zinc-400 border border-white/5 font-mono uppercase">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 text-[10px] text-zinc-500 font-mono">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No hay proyectos que coincidan con tu búsqueda.</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-primary hover:underline"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
