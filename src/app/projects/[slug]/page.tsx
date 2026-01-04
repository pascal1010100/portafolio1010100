
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug)

    if (!project) {
        return {
            title: "Project Not Found",
        }
    }

    return {
        title: `${project.title} | Pascal`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: "article",
            url: `https://pascal.dev/projects/${project.slug}`,
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [project.image],
        },
    }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug)
    const currentIndex = projects.findIndex((p) => p.slug === params.slug)
    const nextProject = projects[(currentIndex + 1) % projects.length]

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* Dynamic Atmosphere */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

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
                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 top-32 sticky">
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

                        {/* Context */}
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

                        {/* Next Project Navigation */}
                        <div className="pt-20 border-t border-white/5">
                            <p className="text-sm font-mono text-zinc-500 mb-4">Next_Case_Study</p>
                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="group block p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:bg-white/5 hover:border-primary/20 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                            {nextProject.title}
                                        </h3>
                                        <p className="text-muted-foreground">{nextProject.description}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                                        <ArrowLeft className="w-5 h-5 text-white rotate-180" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    )
}
