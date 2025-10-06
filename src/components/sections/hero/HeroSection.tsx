"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown, Rocket } from "lucide-react"
import { NeoParticles } from "@/components/backgrounds/neo-particles"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

// Animaciones
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    return () => {}
  }, [])

  if (!isMounted) return null
  
  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/pascal1010100", 
      label: "GitHub" 
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/josema-aguilar-dev/", 
      label: "LinkedIn" 
    },
    { 
      icon: Mail, 
      href: "mailto:pascal@pascal.dev", 
      label: "Correo" 
    }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-background/90 py-20 px-4 sm:px-6 lg:px-8">
      {/* Fondo con efecto de escaneo retro */}
      <div className="absolute inset-0 bg-[length:100%_4px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
      
      {/* Efecto de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,65,180,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,65,180,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradiente de color retro */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/20 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <NeoParticles />
        
        {/* Borde de neón sutil */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent" style={{
          boxShadow: '0 0 15px rgba(255, 65, 180, 0.3), 0 0 30px rgba(100, 210, 255, 0.2)',
          pointerEvents: 'none'
        }}></div>

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12 sm:px-8 sm:py-16 rounded-3xl"
          style={{
            background: 'rgba(10, 5, 20, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 65, 180, 0.15)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Avatar con efecto flotante y neón */}
          <motion.div 
            className="mb-12 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200 group-hover:duration-500 animate-tilt"></div>
              <div className="relative w-44 h-44 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Pascal"
                  width={176}
                  height={176}
                  className="rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          {/* Título principal */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 font-mono tracking-tight"
            variants={itemVariants}
            style={{
              background: 'linear-gradient(90deg, #ff41b4, #64d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255, 65, 180, 0.3)',
              position: 'relative',
              zIndex: 10,
              fontWeight: 800,
              letterSpacing: '-0.5px'
            }}
          >
            Hola, soy Pascal
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            variants={itemVariants}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: '1.7',
              fontWeight: 300
            }}
          >
            Desarrollador Full Stack especializado en crear experiencias digitales excepcionales con tecnologías modernas.
          </motion.p>

          {/* Botones de acción */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-12" 
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 rounded-full font-bold transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/30"
                style={{
                  boxShadow: '0 4px 15px rgba(255, 65, 180, 0.3)'
                }}
              >
                ✨ Contáctame
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#projects" 
                className="inline-flex items-center px-8 py-4 rounded-full font-bold transition-all duration-300 bg-transparent border-2 border-cyan-400/50 text-cyan-100 hover:bg-cyan-500/10 hover:border-cyan-400/80"
                style={{
                  backdropFilter: 'blur(8px)',
                  textShadow: '0 0 10px rgba(100, 210, 255, 0.5)'
                }}
              >
                🚀 Ver Proyectos
                <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Enlaces sociales */}
          <motion.div 
            className="flex justify-center gap-4 mt-12"
            variants={itemVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-foreground/80 hover:text-primary" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Flecha de desplazamiento */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowDown className="w-8 h-8 text-primary/70 hover:text-primary cursor-pointer" />
      </motion.div>
    </section>
  )
}
