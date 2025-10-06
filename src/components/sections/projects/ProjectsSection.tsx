import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { motion } from "framer-motion"

const projects = [
  {
    title: "ZPTVRD - Catálogo de Arte",
    description:
      "Galería minimalista que exhibe obras pictoplasma en paletas pastel, con un diseño limpio que destaca el arte contemporáneo.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    image: "/images/arte-catalogo.jpg",
    github: "https://github.com/pascal1010100/catalogo-arte",
    demo: "https://catalogo-arte.vercel.app/",
    featured: true,
  },
  {
    title: "Nómada Fantasma",
    description:
      "Plataforma definitiva para nómadas digitales que buscan los mejores destinos, conexiones y experiencias alrededor del mundo.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Mapbox", "Vercel"],
    image: "/images/nomada-fantasma.jpg",
    github: "https://github.com/pascal1010100/nomada-fantasma",
    demo: "https://nomada-fantasma.vercel.app/",
    featured: true,
  },
  {
    title: "Catálogo E-Commerce",
    description:
      "Plataforma completa con carrito, filtros, gestión de productos y checkout. Hecha con tecnologías modernas y enfoque UX.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    image: "/images/catalogo.png",
    github: "https://github.com/pascal1010100/catalogo-ecommerce",
    demo: "https://catalogo-agroforesta-visu.vercel.app/",
    featured: true,
  },
  {
    title: "pascal.dev - Blog Técnico",
    description:
      "Blog con artículos técnicos, automatización con IA y reflexiones sobre desarrollo moderno. Ideal para compartir conocimiento.",
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Vercel"],
    image: "/images/blog.png",
    github: "https://github.com/pascal1010100/pascal.dev",
    demo: "https://pascal-dev-0101.vercel.app/",
    featured: true,
  },
  {
    title: "Más Proyectos en GitHub",
    description:
      "Explora mis experimentos, ideas y proyectos open source. Siempre probando nuevas herramientas y enfoques.",
    technologies: ["React", "Node.js", "TypeScript", "REST APIs", "Git"],
    image: "/images/github.png",
    github: "https://github.com/pascal1010100",
    demo: "https://github.com/pascal1010100",
    featured: false,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
      
      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            <span className="block mb-2">Proyectos</span>
            <span className="block bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Una selección de desarrollos que combinan tecnología, diseño y funcionalidad para crear experiencias excepcionales.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              className={`group relative h-full ${!project.featured && 'opacity-80 hover:opacity-100'}`}
            >
              <div className="h-full flex flex-col bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent-purple/10 hover:border-accent-purple/30">
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/30 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center">
                        {project.title}
                        <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium bg-muted/50 text-foreground/80 rounded-full border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-muted/20 text-foreground/60 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Código
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent-foreground bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-full transition-colors group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver demo
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <a
          href="https://github.com/pascal1010100"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:scale-105 transition-all"
        >
          <Github className="w-4 h-4" />
          Ver todos los proyectos
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </SectionContainer>
  )
}
