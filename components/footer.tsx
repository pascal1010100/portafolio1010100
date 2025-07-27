"use client"

import { Github, Linkedin, Mail, ExternalLink, Heart, Code, Coffee, ArrowUp, Briefcase } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-white dark:bg-background border-t border-slate-200 dark:border-border overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-accent-purple/10 dark:to-accent-cyan/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-slate-300/30 to-slate-400/30 dark:from-accent-purple dark:to-accent-cyan rounded-sm"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animation: "pulse 3s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                {/* Cubo 3D para footer */}
                <div className="relative w-12 h-12">
                  <div className="cube-container-large">
                    <div className="cube-large">
                      <div className="face-large front">
                        <span className="text-lg">P</span>
                      </div>
                      <div className="face-large back">
                        <span className="text-lg">D</span>
                      </div>
                      <div className="face-large right">
                        <span className="text-lg">E</span>
                      </div>
                      <div className="face-large left">
                        <span className="text-lg">V</span>
                      </div>
                      <div className="face-large top">
                        <span className="text-lg">•</span>
                      </div>
                      <div className="face-large bottom">
                        <span className="text-lg">•</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground">pascal.dev</h3>
                  <p className="text-sm text-slate-500 dark:text-foreground-muted">Desarrollador Full-Stack</p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-foreground-muted leading-relaxed max-w-md">
                Creando experiencias digitales excepcionales con tecnologías modernas. Especializado en desarrollo web
                full-stack, desde la concepción hasta el despliegue.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-accent-purple/10 text-slate-700 dark:text-accent-purple rounded-full border border-slate-300 dark:border-accent-purple/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com/pascal1010100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl border border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple hover:bg-slate-100 dark:hover:bg-accent-purple/10 transition-all duration-300"
                >
                  <Github className="w-5 h-5 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-purple transition-colors" />
                </a>
                <a
                  href="https://linkedin.com/in/pascal1010100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl border border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-cyan hover:bg-slate-100 dark:hover:bg-accent-cyan/10 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-cyan transition-colors" />
                </a>
                <a
                  href="mailto:pascal@pascal.dev"
                  className="group p-3 rounded-xl border border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple hover:bg-slate-100 dark:hover:bg-accent-purple/10 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-purple transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground">Enlaces Rápidos</h4>
              <nav className="space-y-3">
                {[
                  { name: "Inicio", href: "#home" },
                  { name: "Habilidades", href: "#skills" },
                  { name: "Proyectos", href: "#projects" },
                  { name: "Contacto", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="block text-slate-500 dark:text-foreground-muted hover:text-slate-700 dark:hover:text-accent-purple transition-colors duration-200 group"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{link.name}</span>
                      <ArrowUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-stone-800 dark:text-foreground flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-b from-stone-600 to-stone-700 dark:from-accent-purple dark:to-accent-cyan rounded-full" />
                <span>Recursos</span>
              </h4>
              <nav className="space-y-3">
                {/* Blog Técnico */}
                <div className="group relative">
                  <a
                    href="https://pascal.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl border border-stone-200/60 dark:border-border/30 bg-gradient-to-r from-stone-50/50 to-stone-100/30 dark:from-background/50 dark:to-background-secondary/30 hover:from-stone-100/70 hover:to-stone-200/50 dark:hover:from-accent-purple/10 dark:hover:to-accent-cyan/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-accent-purple/10 metallic-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-600 to-stone-700 dark:from-accent-purple dark:to-accent-cyan flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span>B</span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-700 dark:text-foreground group-hover:text-stone-800 dark:group-hover:text-accent-purple transition-colors duration-300">
                            Blog Técnico
                          </span>
                          <p className="text-xs text-stone-500 dark:text-foreground-muted group-hover:text-stone-600 dark:group-hover:text-foreground-muted transition-colors duration-300">
                            Artículos y tutoriales
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <ExternalLink className="w-4 h-4 text-stone-400 dark:text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:text-stone-600 dark:group-hover:text-accent-purple transition-all duration-300 transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-300/0 via-stone-400/10 to-stone-300/0 dark:from-accent-purple/0 dark:via-accent-purple/5 dark:to-accent-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer rounded-xl" />
                  </a>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-stone-800 dark:bg-background text-white dark:text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    pascal.dev - Contenido técnico actualizado
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800 dark:border-t-background" />
                  </div>
                </div>

                {/* GitHub - Código Abierto */}
                <div className="group relative">
                  <a
                    href="https://github.com/pascal1010100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl border border-stone-200/60 dark:border-border/30 bg-gradient-to-r from-stone-50/50 to-stone-100/30 dark:from-background/50 dark:to-background-secondary/30 hover:from-stone-100/70 hover:to-stone-200/50 dark:hover:from-accent-cyan/10 dark:hover:to-accent-purple/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-accent-cyan/10 metallic-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-700 to-stone-800 dark:from-accent-cyan dark:to-accent-purple flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Github className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-medium text-stone-700 dark:text-foreground group-hover:text-stone-800 dark:group-hover:text-accent-cyan transition-colors duration-300">
                            Código Abierto
                          </span>
                          <p className="text-xs text-stone-500 dark:text-foreground-muted group-hover:text-stone-600 dark:group-hover:text-foreground-muted transition-colors duration-300">
                            50+ repositorios públicos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-stone-400 dark:bg-accent-cyan rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-stone-500 dark:bg-accent-cyan rounded-full animate-pulse delay-100" />
                          <div className="w-1 h-1 bg-stone-600 dark:bg-accent-cyan rounded-full animate-pulse delay-200" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-stone-400 dark:text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:text-stone-600 dark:group-hover:text-accent-cyan transition-all duration-300 transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-300/0 via-stone-400/10 to-stone-300/0 dark:from-accent-cyan/0 dark:via-accent-cyan/5 dark:to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </a>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-stone-800 dark:bg-background text-white dark:text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    Proyectos open source y contribuciones
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800 dark:border-t-background" />
                  </div>
                </div>

                {/* Colaboraciones */}
                <div className="group relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="w-full text-left block p-3 rounded-xl border border-stone-200/60 dark:border-border/30 bg-gradient-to-r from-stone-50/50 to-stone-100/30 dark:from-background/50 dark:to-background-secondary/30 hover:from-stone-100/70 hover:to-stone-200/50 dark:hover:from-accent-purple/10 dark:hover:to-accent-cyan/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-accent-purple/10 metallic-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-600 to-stone-700 dark:from-accent-purple dark:to-accent-cyan flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span>🤝</span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-700 dark:text-foreground group-hover:text-stone-800 dark:group-hover:text-accent-purple transition-colors duration-300">
                            Colaboraciones
                          </span>
                          <p className="text-xs text-stone-500 dark:text-foreground-muted group-hover:text-stone-600 dark:group-hover:text-foreground-muted transition-colors duration-300">
                            Proyectos en equipo
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <ArrowUp className="w-4 h-4 text-stone-400 dark:text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:text-stone-600 dark:group-hover:text-accent-purple transition-all duration-300 rotate-45 transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-300/0 via-stone-400/10 to-stone-300/0 dark:from-accent-purple/0 dark:via-accent-purple/5 dark:to-accent-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </button>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-stone-800 dark:bg-background text-white dark:text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    Ir a sección de contacto
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800 dark:border-t-background" />
                  </div>
                </div>

                {/* Consultoría */}
                <div className="group relative">
                  <a
                    href="mailto:pascal@pascal.dev?subject=Consultoría%20Técnica&body=Hola%20Pascal,%0A%0AEstoy%20interesado%20en%20tus%20servicios%20de%20consultoría.%0A%0AMi%20proyecto:%0A-%20Descripción:%0A-%20Tecnologías:%0A-%20Timeline:%0A-%20Presupuesto:%0A%0AGracias!"
                    className="block p-3 rounded-xl border border-stone-200/60 dark:border-border/30 bg-gradient-to-r from-stone-50/50 to-stone-100/30 dark:from-background/50 dark:to-background-secondary/30 hover:from-stone-100/70 hover:to-stone-200/50 dark:hover:from-accent-cyan/10 dark:hover:to-accent-purple/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-accent-cyan/10 metallic-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-700 to-stone-800 dark:from-accent-cyan dark:to-accent-purple flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-medium text-stone-700 dark:text-foreground group-hover:text-stone-800 dark:group-hover:text-accent-cyan transition-colors duration-300">
                            Consultoría
                          </span>
                          <p className="text-xs text-stone-500 dark:text-foreground-muted group-hover:text-stone-600 dark:group-hover:text-foreground-muted transition-colors duration-300">
                            Asesoría técnica especializada
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <Mail className="w-4 h-4 text-stone-400 dark:text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:text-stone-600 dark:group-hover:text-accent-cyan transition-all duration-300 transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-300/0 via-stone-400/10 to-stone-300/0 dark:from-accent-cyan/0 dark:via-accent-cyan/5 dark:to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </a>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-stone-800 dark:bg-background text-white dark:text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    Abrir email con plantilla de consultoría
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800 dark:border-t-background" />
                  </div>
                </div>

                {/* Recursos Adicionales - Expandible */}
                <div className="group relative">
                  <details className="group/details">
                    <summary className="cursor-pointer list-none p-3 rounded-xl border border-stone-200/60 dark:border-border/30 bg-gradient-to-r from-stone-50/50 to-stone-100/30 dark:from-background/50 dark:to-background-secondary/30 hover:from-stone-100/70 hover:to-stone-200/50 dark:hover:from-accent-purple/10 dark:hover:to-accent-cyan/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-accent-purple/10 metallic-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-600 to-stone-700 dark:from-accent-purple dark:to-accent-cyan flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span>+</span>
                          </div>
                          <div>
                            <span className="font-medium text-stone-700 dark:text-foreground group-hover:text-stone-800 dark:group-hover:text-accent-purple transition-colors duration-300">
                              Más Recursos
                            </span>
                            <p className="text-xs text-stone-500 dark:text-foreground-muted group-hover:text-stone-600 dark:group-hover:text-foreground-muted transition-colors duration-300">
                              Herramientas y enlaces útiles
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-stone-400 to-stone-600 dark:from-accent-purple dark:to-accent-cyan rounded-full transform group-open/details:rotate-90 transition-transform duration-300" />
                        </div>
                      </div>
                    </summary>

                    {/* Contenido expandible */}
                    <div className="mt-3 ml-11 space-y-2 animate-fade-in-up">
                      <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-stone-500 dark:text-foreground-muted hover:text-stone-700 dark:hover:text-accent-purple transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>📚</span>
                        <span>Documentación Next.js</span>
                      </a>
                      <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-stone-500 dark:text-foreground-muted hover:text-stone-700 dark:hover:text-accent-cyan transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>🎨</span>
                        <span>Tailwind CSS</span>
                      </a>
                      <a
                        href="https://ui.shadcn.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-stone-500 dark:text-foreground-muted hover:text-stone-700 dark:hover:text-accent-purple transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>🧩</span>
                        <span>Shadcn/ui Components</span>
                      </a>
                    </div>
                  </details>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 dark:border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-slate-500 dark:text-foreground-muted">
              <span>© {currentYear} Pascal.</span>
              <span className="flex items-center space-x-1">
                <span>Hecho con</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>y</span>
                <Coffee className="w-4 h-4 text-amber-600" />
              </span>
            </div>

            {/* Tech Badge */}
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-foreground-muted">
              <Code className="w-4 h-4" />
              <span>Construido con Next.js, TypeScript y Tailwind CSS</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group p-2 rounded-lg border border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple hover:bg-slate-100 dark:hover:bg-accent-purple/10 transition-all duration-300"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-purple transition-colors" />
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-accent-purple/10 dark:to-accent-cyan/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-slate-300/50 to-slate-200/50 dark:from-accent-cyan/10 dark:to-accent-purple/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
    </footer>
  )
}
