
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Calendar, Layers, CheckCircle2 } from "lucide-react"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-20">

                {/* Navigation */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back_To_Archive
                </Link>

                {/* Header Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-wider">
                                {project.category}
                            </span>
                            {project.featured && (
                                <span className="px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-xs font-mono uppercase tracking-wider">
                                    Featured_Case
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all">
                                    Live Demo <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all">
                                    Source Code <Github className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50 aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Deep Dive Content */}
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Sidebar: Tech Stack */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
                            <h3 className="text-sm font-mono uppercase text-zinc-500 mb-4 flex items-center gap-2">
                                <Layers className="w-4 h-4" /> Tech_Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-md text-xs text-zinc-300 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content: The Case Study */}
                    <div className="md:col-span-8 space-y-16">

                        {/* Introduction / Context */}
                        {project.longDescription && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-primary font-mono text-sm">01.</span> Context
                                </h2>
                                <div className="prose prose-invert prose-lg text-zinc-400">
                                    <p>{project.longDescription}</p>
                                </div>
                            </section>
                        )}

                        {/* Challenges */}
                        {project.challenges && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-primary font-mono text-sm">02.</span> key_Challenges
                                </h2>
                                <ul className="space-y-4">
                                    {project.challenges.map((challenge: string, i: number) => (
                                        <li key={i} className="flex gap-4 items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                            <span className="mt-1 w-2 h-2 rounded-full bg-red-500/50 shrink-0" />
                                            <span className="text-zinc-300">{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Solutions */}
                        {project.solutions && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-primary font-mono text-sm">03.</span> Technical_Solutions
                                </h2>
                                <ul className="space-y-4">
                                    {project.solutions.map((solution: string, i: number) => (
                                        <li key={i} className="flex gap-4 items-start p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                            <span className="mt-1 w-2 h-2 rounded-full bg-blue-500/50 shrink-0" />
                                            <span className="text-zinc-300">{solution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Results */}
                        {project.results && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-primary font-mono text-sm">04.</span> Impact_&_Results
                                </h2>
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                                        <p className="text-lg text-zinc-200">{project.results}</p>
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>
                </div>

            </main>
        </div>
    )
}
