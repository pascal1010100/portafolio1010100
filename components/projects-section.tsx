import { ExternalLink, Github } from "lucide-react"
import { SectionContainer } from "./ui/section-container"

const projects = [
  {
    title: "Catálogo E-Commerce",
    description:
      "Plataforma completa con carrito, filtros, gestión de productos y checkout. Hecha con tecnologías modernas y enfoque UX.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    image: "/images/catalogo.png", // ✅ imagen real
    github: "https://github.com/pascal1010100/catalogo-ecommerce",
    demo: "https://catalogo-agroforesta-visu.vercel.app/",
    featured: true,
  },
  {
    title: "pascal.dev - Blog Técnico",
    description:
      "Blog con artículos técnicos, automatización con IA y reflexiones sobre desarrollo moderno. Ideal para compartir conocimiento.",
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Vercel"],
    image: "/images/blog.png", // ✅ imagen real
    github: "https://github.com/pascal1010100/pascal.dev",
    demo: "https://pascal-dev-0101.vercel.app/",
    featured: true,
  },
  {
    title: "Más Proyectos en GitHub",
    description:
      "Explora mis experimentos, ideas y proyectos open source. Siempre probando nuevas herramientas y enfoques.",
    technologies: ["React", "Node.js", "TypeScript", "REST APIs", "Git"],
    image: "/images/github.png", // ✅ imagen genérica
    github: "https://github.com/pascal1010100",
    demo: "https://github.com/pascal1010100",
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="bg-background py-16">
     <div className="text-center mb-14 px-4">
  <h2 className="text-4xl font-bold text-foreground leading-tight mx-auto max-w-xl">
    <span className="block">Proyectos</span>
    <span className="block bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
      Destacados
    </span>
  </h2>
  <p className="text-muted-foreground text-base max-w-2xl mx-auto mt-4">
    Una selección de desarrollos reales que combinan tecnología, diseño y funcionalidad.
  </p>
</div>


      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block rounded-xl border p-4 md:p-6 transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
              project.featured
                ? "border-border bg-background-secondary hover:border-accent-purple"
                : "border-border bg-background-secondary/80 opacity-80 hover:opacity-100"
            }`}
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-muted text-foreground border border-border rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <Github className="w-4 h-4" />
                Código
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-cyan transition">
                <ExternalLink className="w-4 h-4" />
                Demo
              </span>
            </div>
          </a>
        ))}
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
