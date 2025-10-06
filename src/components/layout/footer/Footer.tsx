"use client"

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code2, MessageSquare, Phone, MapPin, Coffee } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

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
      icon: <Github className="w-4 h-4" aria-hidden="true" />,
      href: "https://github.com/tuusuario",
      label: "GitHub",
      srText: "Visita mi perfil de GitHub (se abre en una nueva pestaña)",
    },
    {
      icon: <Linkedin className="w-4 h-4" aria-hidden="true" />,
      href: "https://linkedin.com/in/tu-perfil",
      label: "LinkedIn",
      srText: "Visita mi perfil de LinkedIn (se abre en una nueva pestaña)",
    },
    {
      icon: <Mail className="w-4 h-4" aria-hidden="true" />,
      href: "mailto:contacto@tudominio.com",
      label: "Email",
      srText: "Enviar correo electrónico a contacto@tudominio.com",
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
    <footer 
      className={cn(
        "relative border-t border-border/30 bg-background/90 backdrop-blur-lg py-16 md:py-20 text-foreground overflow-hidden",
        "bg-gradient-to-b from-background to-background/80"
      )}
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Elementos decorativos - ocultos para lectores de pantalla */}
      <div 
        className="absolute inset-0 -z-10" 
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Columna 1: Logo y descripción */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 text-primary font-mono font-medium text-sm mb-4">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>CONÉCTATE</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4" id="trabajemos-juntos">Trabajemos juntos</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Estoy abierto a nuevas oportunidades y proyectos interesantes. ¡Hablemos sobre cómo puedo ayudarte a hacer realidad tus ideas!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.srText}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border border-border",
                    "hover:bg-accent/50 transition-colors focus:outline-none",
                    "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  )}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.srText}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Enlaces rápidos */}
          <motion.div 
            className="md:col-span-2 md:col-start-7"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li><a href="#inicio" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</a></li>
              <li><a href="#proyectos" className="text-muted-foreground hover:text-foreground transition-colors">Proyectos</a></li>
              <li><a href="#sobre-mi" className="text-muted-foreground hover:text-foreground transition-colors">Sobre mí</a></li>
              <li><a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </motion.div>

          {/* Columna 3: Contacto */}
          <motion.div 
            className="md:col-span-3"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <a href="mailto:contacto@tudominio.com" className="hover:text-foreground transition-colors">contacto@tudominio.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Ciudad, País</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="pt-8 mt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tu Nombre. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span>Hecho con</span>
              <Coffee className="w-3 h-3 text-amber-600" aria-hidden="true" />
              <span>y</span>
              <Code2 className="w-3 h-3 text-primary" aria-hidden="true" />
              <span>por ti</span>
            </p>
          </div>
        </div>
      </div>

      {/* Botón de scroll to top */}
      <motion.button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg",
          "hover:bg-primary/90 transition-all focus:outline-none",
          "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          "transform transition-transform hover:scale-105 active:scale-95",
          !showScrollButton && "opacity-0 pointer-events-none"
        )}
        aria-label="Volver al inicio de la página"
        aria-expanded={showScrollButton}
        variants={itemVariants}
        initial={false}
        animate={{ 
          opacity: showScrollButton ? 1 : 0,
          y: showScrollButton ? 0 : 20
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </footer>
  )
}
