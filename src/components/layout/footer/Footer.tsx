"use client"

import React from 'react'
import { Github, Linkedin, Mail, ArrowUp, MapPin } from "lucide-react"
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
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" aria-hidden="true" />,
      href: "https://github.com/pascal1010100",
      label: "GitHub",
      srText: "Visita mi perfil de GitHub",
    },
    {
      icon: <Linkedin className="w-4 h-4" aria-hidden="true" />,
      href: "https://www.linkedin.com/in/josema-aguilar-dev",
      label: "LinkedIn",
      srText: "Visita mi perfil de LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" aria-hidden="true" />,
      href: "mailto:josemanu0885@gmail.com",
      label: "Email",
      srText: "Enviar correo electrónico",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <footer
      className={cn(
        "border-t border-border/70 bg-background py-16 text-foreground md:py-20",
      )}
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr] mb-12"
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <p className="text-sm font-semibold text-cyan-100/75">Pascal.dev · Experience Engineering</p>
            <h2 className="text-2xl font-display font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">Ideas claras. Experiencias memorables. Sistemas sólidos.</h2>
            <p className="max-w-xl text-muted-foreground leading-7">
              Una práctica boutique de producto e ingeniería para equipos que necesitan claridad, una interfaz refinada y una base técnica confiable.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.srText}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-primary/10"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground">Navegación</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#home" className="text-muted-foreground transition hover:text-foreground">Inicio</a></li>
              <li><a href="#services" className="text-muted-foreground transition hover:text-foreground">Servicios</a></li>
              <li><a href="#projects" className="text-muted-foreground transition hover:text-foreground">Proyectos</a></li>
              <li><a href="#contact" className="text-muted-foreground transition hover:text-foreground">Contacto</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden="true" /> <a href="mailto:josemanu0885@gmail.com" className="transition hover:text-foreground">josemanu0885@gmail.com</a></li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" /> <span>Guatemala · Remoto</span></li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4 border-t border-border/30 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Pascal. Todos los derechos reservados.</p>
          <p>Diseño, producto e ingeniería con atención al detalle.</p>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus:outline-none",
          !showScrollButton && "opacity-0 pointer-events-none"
        )}
        aria-label="Volver al inicio"
        initial={false}
        animate={{ opacity: showScrollButton ? 1 : 0, y: showScrollButton ? 0 : 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </motion.button>
    </footer>
  )
}
