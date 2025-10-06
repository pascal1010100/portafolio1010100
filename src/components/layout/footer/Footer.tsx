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
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/tuusuario",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://linkedin.com/in/tu-perfil",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:contacto@tudominio.com",
      label: "Email",
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
    <footer className={cn(
      "relative border-t border-border/30 bg-background/90 backdrop-blur-lg py-16 md:py-20 text-foreground overflow-hidden",
      "bg-gradient-to-b from-background to-background/80"
    )}>
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
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
              <MessageSquare className="w-4 h-4" />
              <span>CONÉCTATE</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Trabajemos juntos</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Estoy abierto a nuevas oportunidades y proyectos interesantes. ¡Hablemos sobre cómo puedo ayudarte a hacer realidad tus ideas!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm rounded-lg",
                    "bg-background/50 hover:bg-background/80 transition-all duration-300",
                    "border border-border/30 hover:border-primary/30 hover:shadow-sm"
                  )}
                  aria-label={link.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {React.cloneElement(link.icon, {
                    className: "w-4 h-4"
                  })}
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Navegación */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Enlaces rápidos</h3>
            <nav className="space-y-3">
              {[
                { label: 'Inicio', href: '#home' },
                { label: 'Habilidades', href: '#skills' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Contacto', href: '#contact' },
              ].map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="block text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:transition-transform after:duration-300 after:opacity-0 after:scale-x-0">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Columna 3: Contacto */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Información de contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Correo electrónico</h4>
                  <a href="mailto:contacto@tudominio.com" className="text-foreground hover:text-primary transition-colors">
                    contacto@tudominio.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Teléfono</h4>
                  <a href="tel:+1234567890" className="text-foreground hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Ubicación</h4>
                  <p className="text-foreground">Ciudad, País</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div 
          className="border-t border-border/20 my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Copyright y derechos */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pascal. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Coffee className="w-4 h-4 text-amber-600 mx-1" />
            <span>y muchas horas de código</span>
          </div>
        </motion.div>
      </div>

      {/* Botón flotante para volver arriba */}
      <motion.button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full",
          "bg-background/80 backdrop-blur-lg border border-border/30 shadow-lg",
          "hover:border-primary/50 hover:bg-primary/5 transition-all duration-300",
          showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
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
        <ArrowUp className="w-5 h-5 text-primary" />
      </motion.button>
    </footer>
  )
}
