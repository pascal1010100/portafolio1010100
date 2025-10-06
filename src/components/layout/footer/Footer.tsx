"use client"

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code2 } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/pascal1010100",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/pascal1010100",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:pascal@pascal.dev",
      label: "Correo electrónico",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-lg py-12 text-foreground overflow-hidden">
      {/* Efecto de partículas decorativas */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Columna 1: Logo y descripción */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 text-cyan-400 text-2xl font-bold font-mono tracking-wider mb-3">
              <span className="text-white">{"{"}</span>
              <Code2 className="w-6 h-6 text-cyan-400" />
              <span className="text-white">{"}"}</span>
              <span className="text-cyan-400 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
                Pascal
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Transformando ideas en experiencias digitales excepcionales con código limpio y diseño atemporal.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border/50 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                  aria-label={link.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {React.cloneElement(link.icon, {
                    className: "w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors"
                  })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Navegación */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Navegación</h3>
            <nav className="space-y-2">
              <a 
                href="#home" 
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors block"
              >
                Inicio
              </a>
              <a 
                href="#skills" 
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors block"
              >
                Habilidades
              </a>
              <a 
                href="#projects" 
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors block"
              >
                Proyectos
              </a>
              <a 
                href="#contact" 
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors block"
              >
                Contacto
              </a>
            </nav>
          </motion.div>

          {/* Columna 3: Contacto */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contacto</h3>
            <div className="space-y-3">
              <a 
                href="mailto:pascal@pascal.dev" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                pascal@pascal.dev
              </a>
              <div className="text-sm text-muted-foreground">
                <p>Disponible para proyectos</p>
                <p>y colaboraciones interesantes</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div 
          className="border-t border-border/30 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        {/* Copyright y derechos */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground">
            © {currentYear} Pascal. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho con <span className="text-rose-500">♥</span> y Next.js
          </p>
        </motion.div>
      </div>

      {/* Botón flotante para volver arriba */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 ${
          showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Volver arriba"
        whileHover={{ y: -5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScrollButton ? 1 : 0,
          y: showScrollButton ? 0 : 20
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <ArrowUp className="w-5 h-5 text-cyan-400" />
      </motion.button>
      <motion.div
        className="absolute top-0 right-0 p-3 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <span className="font-bold">{"}"}</span>
      </motion.div>
    </footer>
  )
}
