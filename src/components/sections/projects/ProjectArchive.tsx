"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Github, ExternalLink, Calendar, Code, Database, Search } from "lucide-react"
import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ProjectArchive() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <div ref={containerRef} className="relative min-h-screen bg-background pt-32 pb-20">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                {/* Header */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                                All Projects
                            </h1>
                            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                                A curated collection of web applications, experiments, and open-source contributions.
                            </p>
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="bg-zinc-900/50 border border-white/10 rounded-full py-3 pl-10 pr-6 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all w-full md:w-64 placeholder:text-zinc-600"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Project List */}
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors"
                        >
                            {/* Image */}
                            <Link href={`/projects/${project.slug}`} className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/5 block">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>

                            {/* Content */}
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">

                                {/* Title & Category */}
                                <div className="md:col-span-4">
                                    <Link href={`/projects/${project.slug}`}>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </Link>
                                    <span className="text-sm text-zinc-500 font-medium">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Tech Stack */}
                                <div className="md:col-span-6 flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 4).map(tech => (
                                        <span key={tech} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-zinc-400 border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-2.5 py-1 text-xs text-zinc-500">+</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-2 flex justify-end gap-2">
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-primary/20 hover:text-primary transition-all"
                                            title="Visit Website"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-primary/20 hover:text-primary transition-all"
                                            title="View Source"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
