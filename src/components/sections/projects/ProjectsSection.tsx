"use client"

import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

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
    <SectionContainer id="projects" className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/5">
      {/* Efecto de partículas en el fondo */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Efecto de gradiente sutil */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background"></div>
      
      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              <span className="block mb-3">Proyectos</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple animate-gradient">
                Destacados
              </span>
            </h2>
          </motion.div>
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explora mis proyectos más recientes. Cada uno representa un desafío único y una solución creativa.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={item}
              whileHover="hover"
              className="group relative h-full flex flex-col"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple/20 via-accent-cyan/20 to-accent-purple/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300" />
              <div className="h-full flex flex-col bg-background/80 backdrop-blur-sm border border-border/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-xl group-hover:shadow-accent/5">
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/30" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <motion.div 
                      className="translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center">
                        {project.title}
                        <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      </h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    </div>
                    <motion.div 
                      className="flex space-x-1"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-200 group-hover:bg-foreground/5 flex items-center justify-center"
                          aria-label={`Ver código de ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors" />
                        </motion.a>
                      )}
                      {project.demo && project.demo !== project.github && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-200 group-hover:bg-foreground/5 flex items-center justify-center"
                          aria-label={`Ver demo de ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors" />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                          "bg-foreground/5 text-foreground/70 border border-border/20",
                          "group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent-foreground/90",
                          "transition-all duration-200"
                        )}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/pascal1010100"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white transition-all"
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.3), 0 8px 10px -6px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Ver todos los proyectos</span>
            <ArrowUpRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
