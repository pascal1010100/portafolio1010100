"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { SectionContainer } from "./ui/section-container"
import { P5Background } from "./p5-background"

export function HeroSection() {
  return (
    <SectionContainer id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo base con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-background dark:via-background dark:to-background-secondary" />

      {/* Gradiente adicional para el efecto cyber */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-slate-300/30 dark:bg-cyber-gradient opacity-30" />

      {/* Fondo animado con p5.js */}
      <P5Background />

      {/* Overlay más sutil para no opacar el canvas */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 pointer-events-none" style={{ zIndex: 2 }} />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-accent-purple dark:to-accent-cyan p-1 animate-glow">
            <div className="w-full h-full rounded-full bg-white dark:bg-background flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Avatar de Pascal"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-slide-up leading-tight">
          <span className="text-slate-900 dark:text-foreground">Hola, soy </span>
          <span className="bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 dark:from-accent-purple dark:via-accent-cyan dark:to-accent-purple bg-clip-text text-transparent">
            Pascal
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base md:text-lg text-slate-600 dark:text-foreground-muted mb-10 max-w-xl mx-auto animate-slide-up leading-relaxed">
          Desarrollador web full-stack especializado en interfaces modernas, interactivas y con estilo.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-slide-up">
          <Link
            href="#projects"
            className="px-6 py-2.5 text-sm md:text-base bg-gradient-to-r from-slate-700 to-slate-900 dark:from-accent-purple dark:to-accent-cyan text-white font-medium rounded-lg hover:shadow-lg hover:shadow-slate-500/25 dark:hover:shadow-accent-purple/25 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Ver proyectos
          </Link>
          <a
            href="https://pascal.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm md:text-base border border-slate-500 dark:border-accent-cyan text-slate-700 dark:text-accent-cyan hover:bg-slate-500 hover:text-white dark:hover:bg-accent-cyan dark:hover:text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
          >
            <span>Visitar Blog</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-5 mb-10 animate-slide-up">
          <a href="https://github.com/pascal1010100" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-300 dark:border-border hover:border-slate-500 dark:hover:border-accent-purple hover:bg-slate-100 dark:hover:bg-accent-purple/10 transition-all duration-300 backdrop-blur-sm group">
            <Github className="w-5 h-5 text-slate-600 dark:text-foreground-muted group-hover:text-slate-800 dark:group-hover:text-accent-purple transition-colors" />
          </a>
          <a href="https://linkedin.com/in/pascal1010100" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-300 dark:border-border hover:border-slate-500 dark:hover:border-accent-cyan hover:bg-slate-100 dark:hover:bg-accent-cyan/10 transition-all duration-300 backdrop-blur-sm group">
            <Linkedin className="w-5 h-5 text-slate-600 dark:text-foreground-muted group-hover:text-slate-800 dark:group-hover:text-accent-cyan transition-colors" />
          </a>
          <a href="mailto:pascal@pascal.dev" className="p-2.5 rounded-full border border-slate-300 dark:border-border hover:border-slate-500 dark:hover:border-accent-purple hover:bg-slate-100 dark:hover:bg-accent-purple/10 transition-all duration-300 backdrop-blur-sm group">
            <Mail className="w-5 h-5 text-slate-600 dark:text-foreground-muted group-hover:text-slate-800 dark:group-hover:text-accent-purple transition-colors" />
          </a>
        </div>

        {/* Flecha scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-slate-500 dark:text-foreground-muted drop-shadow-lg" />
        </div>
      </div>
    </SectionContainer>
  )
}
