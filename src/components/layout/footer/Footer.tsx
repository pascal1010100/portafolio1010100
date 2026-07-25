import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { BackToTopButton } from "@/components/layout/footer/BackToTopButton"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" aria-hidden="true" />,
      href: "https://github.com/pascal1010100",
      label: "GitHub",
      srText: "Visita el perfil de GitHub de Pascal.dev",
    },
    {
      icon: <Linkedin className="w-4 h-4" aria-hidden="true" />,
      href: "https://www.linkedin.com/in/josema-aguilar-dev",
      label: "LinkedIn",
      srText: "Visita el perfil de LinkedIn de Pascal.dev",
    },
    {
      icon: <Mail className="w-4 h-4" aria-hidden="true" />,
      href: "mailto:josemanu0885@gmail.com",
      label: "Email",
      srText: "Enviar correo electrónico",
    },
  ]

  return (
    <footer
      className="border-t border-border/70 bg-background py-16 text-foreground md:py-20"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr] mb-12"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold text-cyan-100/75">Pascal.dev · Diseño y desarrollo de software</p>
            <h2 className="text-2xl font-display font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">Ideas y procesos complejos convertidos en software claro.</h2>
            <p className="max-w-xl text-muted-foreground leading-7">
              Productos web, herramientas internas e integraciones pensadas para crecer contigo.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.srText}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-primary/10"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navegación</h3>
            <ul className="mt-3">
              <li><a href="#home" className="inline-flex min-h-11 items-center text-muted-foreground transition hover:text-foreground lg:min-h-0 lg:py-1.5">Inicio</a></li>
              <li><a href="#services" className="inline-flex min-h-11 items-center text-muted-foreground transition hover:text-foreground lg:min-h-0 lg:py-1.5">Servicios</a></li>
              <li><a href="#projects" className="inline-flex min-h-11 items-center text-muted-foreground transition hover:text-foreground lg:min-h-0 lg:py-1.5">Proyectos</a></li>
              <li><a href="#contact" className="inline-flex min-h-11 items-center text-muted-foreground transition hover:text-foreground lg:min-h-0 lg:py-1.5">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="mt-3 text-muted-foreground">
              <li className="flex min-h-11 items-center gap-2 lg:min-h-0 lg:py-1.5"><Mail className="h-4 w-4" aria-hidden="true" /> <a href="mailto:josemanu0885@gmail.com" className="inline-flex min-h-11 items-center transition hover:text-foreground lg:min-h-0">josemanu0885@gmail.com</a></li>
              <li className="flex min-h-11 items-center gap-2 lg:min-h-0 lg:py-1.5"><MapPin className="h-4 w-4" aria-hidden="true" /> <span>Guatemala · Remoto</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/30 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Pascal.dev. Todos los derechos reservados.</p>
          <p>Software útil, claro y hecho con atención al detalle.</p>
        </div>
      </div>

      <BackToTopButton />
    </footer>
  )
}
