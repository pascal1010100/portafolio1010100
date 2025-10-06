"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border py-12 text-foreground">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xl font-bold font-mono tracking-widest">
            <span className="text-white">{`{`}</span>
            <svg
              className="w-5 h-5 text-cyan-400 neon-glow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span className="text-white">{`}`}</span>
            <span className="text-cyan-400">Pascal</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Desarrollando soluciones web con precisión, estilo y propósito
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/pascal1010100"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/pascal1010100"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:pascal@pascal.dev"
            className="hover:text-cyan-400 transition-colors"
            aria-label="Correo"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Botón volver arriba */}
        <button
          onClick={scrollToTop}
          className="group p-2 rounded-lg border border-border hover:border-cyan-400 hover:bg-accent-cyan/10 transition-all"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        © {currentYear} Pascal. Todos los derechos reservados.
      </div>
    </footer>
  )
}
