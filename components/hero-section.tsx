"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Code, Rocket } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ParticlesBackground } from "./backgrounds/particles-background"

// Componente SectionContainer inline para evitar problemas de importación
const SectionContainer = ({ 
  children, 
  className = "", 
  id 
}: { 
  children: React.ReactNode, 
  className?: string, 
  id?: string 
}) => (
  <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
)

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    return () => {}
  }, [])

  // Animaciones simplificadas temporalmente
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const cyberGlitch = {
    initial: { 
      textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0ff, 0 0 40px #0ff',
      opacity: 1 
    },
    animate: {
      textShadow: [
        '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0ff, 0 0 40px #0ff',
        '0 0 5px #fff, 0 0 10px #0ff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 35px #0ff, 0 0 40px #0ff',
        '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0ff, 0 0 40px #0ff',
      ],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  }

  if (!isMounted) return null

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-transparent pointer-events-none z-0" />

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Avatar con animación mejorada */}
          <motion.div 
            className="mb-8 flex justify-center"
            variants={item}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent-purple via-accent-cyan to-accent-purple p-1"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.8)',
                  '0 0 10px rgba(59, 130, 246, 0.5)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse' as const,
              }}
            >
              <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/10">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Pascal"
                  width={176}
                  height={176}
                  className="rounded-full object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center"
            variants={item}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight">
              <span className="text-white/90 font-light">Hola, soy</span>
            </h1>
            <div className="relative mt-2">
              <h1 className="relative z-10 font-space-grotesk font-bold text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                PASCAL
              </h1>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-70 -z-10"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
            </div>
          </motion.div>
          
          {/* Subtítulo principal */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mt-6 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              letterSpacing: '0.02em'
            }}
            variants={item}
          >
            Desarrollador Full Stack especializado en crear experiencias digitales excepcionales con tecnologías modernas.
          </motion.p>

          {/* Botones de acción */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={item}
          >
            <Link
              href="#projects"
              className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_-5px_RGBA(59,130,246,0.4)] flex items-center gap-2"
            >
              <Code className="w-5 h-5" />
              Ver Proyectos
            </Link>
            <Link
              href="#contact"
              className="px-8 py-3.5 bg-transparent border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Contactar
            </Link>
          </motion.div>

          {/* Enlaces sociales con animación */}
          <motion.div 
            className="flex justify-center space-x-6 mb-12"
            variants={item}
          >
            {[
              { icon: Github, href: "https://github.com/pascal1010100", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/josema-aguilar-dev/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:pascal@pascal.dev", label: "Correo" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-foreground/80 hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Flecha de scroll con animación mejorada */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="w-6 h-6 text-accent-cyan drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
