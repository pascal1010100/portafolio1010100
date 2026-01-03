"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown, Terminal, Cpu, Globe } from "lucide-react"
import { NeoParticles } from "@/components/backgrounds/neo-particles"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"

// HUD Animations
const hudContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const hudItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "circOut" }
  }
}

const glitchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 } // Fast snap-in for cyber feel
  }
}

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])



  // Removed early return to allow SSR


  const socialLinks = [
    { icon: Github, href: profile.social.github, label: "GitHub Hq" },
    { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn Net" },
    { icon: Mail, href: profile.social.email, label: "Encrypted Mail" }
  ]

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* Background Layer - Void Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

      {/* Interactive Particles - Low opacity for subtlety */}
      <div className="absolute inset-0 opacity-20">
        <NeoParticles />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">

        {/* Left Column: Semantic Info (The "Terminal") */}
        <motion.div
          className="flex-1 text-left"
          initial="hidden"
          animate="visible"
          variants={hudContainerVariants}
        >
          {/* System Status HUD */}
          <motion.div variants={hudItemVariants} className="flex items-center gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-mono text-xs text-primary/80 tracking-widest uppercase">
              System Online // V.2.5.0
            </span>
          </motion.div>

          {/* Main Title Block */}
          <div className="relative mb-8">
            <motion.div variants={hudItemVariants} className="overflow-hidden">
              <span className="font-mono text-muted-foreground text-sm sm:text-base mb-2 block border-l-2 border-primary/50 pl-4">
                &gt; Subject: {profile.name}
              </span>
            </motion.div>

            <motion.h1
              variants={glitchVariants}
              className="glitch-text text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter text-foreground leading-[0.9]"
            >
              PASCAL
              <span className="text-primary">.DEV</span>
            </motion.h1>

            <motion.div variants={hudItemVariants} className="mt-4 flex flex-wrap gap-3">
              <Badge icon={Terminal} text="Senior Full-Stack" />
              <Badge icon={Cpu} text="AI Systems Arch" />
              <Badge icon={Globe} text="Remote Capable" />
            </motion.div>
          </div>

          {/* Description Block with "Glass" Card backing */}
          <motion.div
            variants={hudItemVariants}
            className="elite-glass p-6 md:p-8 rounded-sm max-w-2xl border-l-4 border-l-primary mb-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Engineering high-performance SaaS solutions.
              <br />
              <span className="text-foreground font-medium">Clear Design. Solid Code. Scalable Architecture.</span>
            </p>
          </motion.div>

          {/* Action Module */}
          <motion.div variants={hudItemVariants} className="flex flex-col sm:flex-row gap-5">
            <Link
              href="#contact"
              className="group relative px-8 py-4 bg-primary text-background font-bold font-mono uppercase tracking-wider overflow-hidden hover:bg-primary/90 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Init_Procedure <ArrowDown className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              href="#projects"
              className="cyber-border px-8 py-4 text-primary font-mono uppercase tracking-wider hover:bg-primary/10 transition-all flex items-center gap-2"
            >
              View_Database
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-muted-foreground font-mono uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 border border-transparent hover:border-white/10 rounded-sm"
            >
              Download_CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Identity Core (Avatar + Aura) */}
        <motion.div
          className="hidden md:flex flex-1 justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Soul Nebula Effect behind Avatar */}
          <div className="absolute inset-0 bg-soul-gradient blur-3xl opacity-60 scale-150 animate-pulse" style={{ animationDuration: '4s' }} />

          <div className="relative group">
            {/* Tech Rings */}
            <div className="absolute -inset-1 rounded-full border border-primary/20 scale-110 animate-spin [animation-duration:20s]" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-primary/10 scale-105 animate-spin [animation-duration:30s] [animation-direction:reverse]" />

            {/* Glitch/Ghost Effect Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />

            {/* Actual Avatar */}
            <div className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-full p-2 border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/20">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full filter contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* HUD Overlay on Avatar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono tracking-widest text-white/80 uppercase">
                  Operator
                </span>
              </div>
            </div>
          </div>

          {/* Floating Social Nodes - Connected feeling */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2 pl-3 bg-black/40 backdrop-blur-md border-l-2 border-primary/50 text-muted-foreground hover:text-white hover:bg-primary/10 transition-all hover:translate-x-1"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator - Tech Style */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">Scroll_Down</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

    </section>
  )
}

function Badge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none border border-border bg-secondary/30 text-xs font-mono text-primary/80 uppercase">
      <Icon className="w-3 h-3" />
      {text}
    </span>
  )
}
