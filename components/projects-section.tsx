import { ExternalLink, Github } from "lucide-react"
import { SectionContainer } from "./ui/section-container"

const projects = [
  {
    title: "Catálogo E-Commerce",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, gestión de productos, filtros avanzados y proceso de checkout optimizado. Desarrollada con tecnologías modernas para una experiencia de usuario fluida.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/pascal1010100/catalogo-ecommerce",
    demo: "https://tu-catalogo.vercel.app",
    featured: true,
  },
  {
    title: "pascal.dev - Blog Técnico",
    description:
      "Blog personal enfocado en desarrollo web, tecnologías modernas y mejores prácticas. Incluye artículos técnicos, tutoriales y reflexiones sobre el mundo del desarrollo software.",
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Vercel"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/pascal1010100/pascal.dev",
    demo: "https://pascal.dev",
    featured: true,
  },
  {
    title: "Más Proyectos en GitHub",
    description:
      "Explora mi repositorio completo en GitHub donde encontrarás más proyectos, experimentos con nuevas tecnologías y contribuciones a proyectos de código abierto.",
    technologies: ["React", "Node.js", "TypeScript", "REST APIs", "Git"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/pascal1010100",
    demo: "https://github.com/pascal1010100",
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="bg-white dark:bg-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-foreground mb-4">
          Proyectos{" "}
          <span className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-cyan dark:to-accent-purple bg-clip-text text-transparent">
            Destacados
          </span>
        </h2>
        <p className="text-slate-600 dark:text-foreground-muted text-lg max-w-2xl mx-auto">
          Una selección de proyectos que demuestran mis habilidades técnicas y creatividad en el desarrollo web.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`group rounded-xl border overflow-hidden transition-all duration-300 transform hover:scale-105 ${
              project.featured
                ? "border-slate-300 dark:border-accent-purple/50 bg-slate-50 dark:bg-background-secondary hover:border-slate-400 dark:hover:border-accent-cyan/50"
                : "border-slate-200 dark:border-border bg-slate-50/50 dark:bg-background-secondary/50 hover:border-slate-300 dark:hover:border-border opacity-75"
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="aspect-video bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-accent-purple/10 dark:to-accent-cyan/10 relative overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 dark:from-background-secondary/80 to-transparent" />

              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium bg-slate-700 dark:bg-accent-purple text-white rounded-full">
                    Destacado
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-foreground mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-foreground-muted mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-accent-purple/10 text-slate-700 dark:text-accent-purple rounded-full border border-slate-300 dark:border-accent-purple/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-500 dark:text-foreground-muted hover:text-slate-700 dark:hover:text-accent-purple transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Código</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-500 dark:text-foreground-muted hover:text-slate-700 dark:hover:text-accent-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Ver Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-4 p-6 bg-slate-50 dark:bg-background-secondary rounded-2xl border border-slate-200 dark:border-border">
          <div className="text-center">
            <a
              href="https://github.com/pascal1010100"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan text-white font-medium rounded-lg hover:shadow-lg hover:shadow-slate-500/25 dark:hover:shadow-accent-purple/25 transition-all duration-300 transform hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span>Ver todos los proyectos</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
