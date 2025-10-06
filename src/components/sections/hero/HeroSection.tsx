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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradiente de color sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-800/20 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <NeoParticles />
        
        {/* Borde sutil */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent" style={{
          boxShadow: '0 0 20px rgba(30, 58, 138, 0.2), 0 0 40px rgba(30, 64, 175, 0.1)',
          pointerEvents: 'none'
        }}></div>

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12 sm:px-8 sm:py-16 rounded-3xl backdrop-blur-sm"
          style={{
            background: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(100, 116, 139, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-blue-400/40 rounded-full opacity-60 group-hover:opacity-80 blur transition duration-300 group-hover:duration-500 animate-tilt"></div>
              <div className="relative w-44 h-44 rounded-full bg-slate-900/60 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-slate-600/20 group-hover:border-slate-500/30 transition-all duration-300">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Pascal"
                  width={176}
                  height={176}
                  className="rounded-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-110 contrast-110"
                  style={{
                    filter: 'grayscale(20%) contrast(1.1)'
                  }}
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          {/* Título principal */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight mb-6"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              <span className="text-slate-300 font-light block">
                Hola, soy
              </span>
              <motion.span 
                className="block mt-2 text-5xl sm:text-6xl md:text-7xl font-bold"
                style={{
                  background: 'linear-gradient(90deg, #60a5fa, #818cf8, #c084fc, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '300% 300%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Pascal
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
            style={{
              color: 'rgba(226, 232, 240, 0.9)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              lineHeight: '1.8',
              fontWeight: 350
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
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:shadow-lg hover:shadow-slate-600/30 hover:from-slate-600 hover:to-slate-500"
                style={{
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                }}
              >
                <span className="text-slate-100">Contáctame</span>
                <Mail className="ml-2 h-5 w-5 text-slate-200" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#projects"
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 bg-transparent border-2 border-slate-500/30 text-slate-200 hover:bg-slate-700/30 hover:border-slate-400/50"
                style={{
                  backdropFilter: 'blur(8px)'
                }}
              >
                <span>Ver Proyectos</span>
                <Rocket className="ml-2 h-5 w-5 text-slate-300" />
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
                  className="p-2.5 rounded-xl bg-slate-800/40 backdrop-blur-md border border-slate-700/30 hover:border-blue-400/50 hover:bg-slate-700/20 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.3)]"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
                </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

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
