import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"
import Link from "next/link"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="relative py-24 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Editorial Style */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground">
              SELECTED
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                WORKS.
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/30 pl-4">
              A curation of high-impact digital products. Full-stack ecosystems, AI integrations, and scalable architectures.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              className={index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"}
            />
          ))}
        </motion.div>

        {/* Footer Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-secondary/30 border border-white/10 hover:border-primary/50 hover:bg-secondary/50 transition-all"
          >
            <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-mono text-sm tracking-wider uppercase">Access Full Archives</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

function ProjectCard({ project, index, className }: { project: any, index: number, className?: string }) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/10",
        "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500",
        className
      )}
    >
      {/* Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
              {project.demo && (
                <a href={project.demo} target="_blank" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors text-white">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors text-white">
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors drop-shadow-md">
            {project.title}
          </h3>

          <p className="text-zinc-300 text-sm md:text-base line-clamp-2 mb-4 group-hover:text-white transition-colors drop-shadow-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <span key={tech} className="text-xs font-mono text-zinc-500 group-hover:text-primary/80 transition-colors">
                #{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
