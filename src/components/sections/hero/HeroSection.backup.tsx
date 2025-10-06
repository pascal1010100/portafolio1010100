"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, Rocket } from "lucide-react"
import { NeoParticles } from "@/components/backgrounds/neo-particles"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Animaciones
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
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
  
  const neonGradient = "bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
  const glassEffect = "bg-background/70 backdrop-blur-lg border border-border/20 shadow-xl"
  const hoverEffect = "hover:shadow-purple-500/20 hover:border-purple-400/40 transition-all duration-300"

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Efecto de partículas */}
      <NeoParticles />
      
      {/* Efecto de gradiente sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-900/10 via-background/95 to-background/90"></div>
      
      {/* Efecto de grid sutil */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Borde de neón sutil */}
        <motion.div 
          className="absolute inset-0 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)',
            pointerEvents: 'none',
            border: '1px solid rgba(168, 85, 247, 0.1)'
          }}
        />

        <motion.div 
          className={`relative z-10 text-center max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl ${glassEffect} ${hoverEffect}`}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {/* Avatar con efecto flotante y neón */}
          <motion.div 
            className="mb-10 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative group">
              <motion.div 
                className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 blur-lg transition-all duration-700 group-hover:duration-1000"
                style={{
                  background: 'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 8s ease infinite',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-purple-500/20 group-hover:border-purple-400/50 transition-all duration-500">
                <Image
                  src="/avatar.png"
                  alt="Avatar de Pascal"
                  width={176}
                  height={176}
                  className="rounded-full object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          {/* Título principal */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight">
              <span className="relative inline-block">
                <span className={`${neonGradient} bg-clip-text text-transparent`}>
                  Hola, soy
                </span>
                <motion.span 
                  className="block mt-2 text-5xl sm:text-6xl md:text-7xl font-extrabold"
                  style={{
                    background: 'linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  Pascal
                </motion.span>
              </span>
            </h1>
          </motion.div>
          
          {/* Subtítulo */}
          <motion.div 
            className="mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <Link 
              href="#projects" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">🚀 Ver Proyectos</span>
              <Rocket className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4 mt-12 pt-6 border-t border-border/20"
            variants={staggerContainer}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/50 backdrop-blur-md border border-border/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={fadeInUp}
                custom={index}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-foreground/80 group-hover:text-purple-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Desplázate</span>
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-purple-400 rounded-full"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop" as const,
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
