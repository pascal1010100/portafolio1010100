"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { SectionContainer } from "./ui/section-container"
import { SubtleP5Background } from "./p5-background"

export function HeroSection() {
  return (
    <SectionContainer
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent"
    >
      {/* Fondo animado con p5.js */}
      <SubtleP5Background />

      {/* Overlay translúcido y fondo degradado más suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-accent-purple dark:to-accent-cyan p-1 animate-glow">
            <div className="w-full h-full rounded-full bg-white dark:bg-background flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Avatar de Pascal"
                width={176}
                height={176}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-slide-up leading-tight">
          <span className="text-white dark:text-white">Hola, soy </span>
          <span className="relative inline-block text-transparent bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple bg-clip-text drop-shadow-[0_0_8px_#00ccff] font-black animate-pulse glitch">
            Pascal
            <span className="absolute top-0 left-0 w-full h-full text-transparent bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple bg-clip-text drop-shadow-[0_0_8px_#00ccff] glitch-layer" aria-hidden="true">
              Pascal
            </span>
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base md:text-lg text-white/80 dark:text-foreground-muted mb-10 max-w-xl mx-auto animate-slide-up leading-relaxed">
          Desarrollador web full-stack especializado en interfaces modernas, interactivas y con estilo.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-slide-up">
          <Link
            href="#projects"
            className="px-6 py-2.5 text-sm md:text-base bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Ver proyectos
          </Link>
          <a
            href="https://pascal.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm md:text-base border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-black font-medium rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
          >
            <span>Visitar Blog</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-5 mb-10 animate-slide-up">
          <a
            href="https://github.com/pascal1010100"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300 backdrop-blur-sm group"
          >
            <Github className="w-5 h-5 text-white group-hover:text-accent-cyan transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/pascal1010100"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300 backdrop-blur-sm group"
          >
            <Linkedin className="w-5 h-5 text-white group-hover:text-accent-cyan transition-colors" />
          </a>
          <a
            href="mailto:pascal@pascal.dev"
            className="p-2.5 rounded-full border border-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300 backdrop-blur-sm group"
          >
            <Mail className="w-5 h-5 text-white group-hover:text-accent-cyan transition-colors" />
          </a>
        </div>

        {/* Flecha scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-accent-cyan drop-shadow-lg" />
        </div>
      </div>
    </SectionContainer>
  )
}
