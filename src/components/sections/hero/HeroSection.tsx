"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Linkedin } from "lucide-react"
import { profile } from "@/data/profile"

const SpatialScene = dynamic(
  () => import("@/components/visuals/SpatialScene").then((module) => module.SpatialScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/10 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#030506]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_42%,rgba(112,170,255,0.16),transparent_27%),radial-gradient(circle_at_67%_72%,rgba(255,193,124,0.08),transparent_20%)]" />
      <div className="pointer-events-none absolute left-[38%] top-[6%] -z-10 h-[115%] w-[1px] rotate-[55deg] bg-gradient-to-b from-transparent via-cyan-100/30 to-transparent shadow-[0_0_36px_rgba(190,225,255,0.25)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-10">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/42 sm:mb-8 sm:text-xs sm:tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-100" />
            </span>
            Disponible para proyectos seleccionados
          </div>

          <h1 className="max-w-4xl text-[2.6rem] font-medium leading-[0.98] tracking-[-0.055em] text-white min-[380px]:text-5xl sm:text-6xl lg:text-[5.15rem]">
            Diseño productos digitales que se sienten inevitables.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/50 sm:mt-8 sm:text-lg sm:leading-8">
            Estrategia, UI/UX e ingeniería full-stack para convertir una idea ambiciosa en una experiencia clara, memorable y lista para crecer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Link href="#projects" className="liquid-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-50 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_36px_rgba(207,239,255,0.08)] transition hover:bg-white">
              Explorar proyectos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/75 transition hover:border-white/30 hover:text-white">
              Cuéntame tu idea
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-5 text-xs text-white/35 sm:mt-12 sm:gap-x-5 sm:pt-6 sm:text-sm">
            <span>Respuesta en 24–48 h</span>
            <span>Proyectos desde $5k</span>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
            </a>
            <a href={`${profile.social.email}?subject=Solicitud%20de%20CV`} className="transition hover:text-white">
              Solicitar CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mx-2 -mt-3 h-[20rem] sm:mx-0 sm:mt-0 sm:h-[32rem] lg:-ml-16 lg:mr-[-8rem] lg:h-[47rem]"
          aria-label="Cubo conceptual interactivo con núcleo cambiante"
        >
          <div className="pointer-events-none absolute inset-[14%] rounded-full bg-sky-300/[0.07] blur-[90px]" />
          <LazySpatialScene />
          <div className="pointer-events-none absolute bottom-[15%] right-[12%] hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30 lg:flex">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-100/50" />
            Hover · Núcleo reactivo
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 border-t border-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {["Product strategy", "Advanced UI/UX", "Full-stack systems", "Applied AI"].map((item, index) => (
          <div key={item} className="group flex items-center gap-2 border-white/10 py-4 text-[10px] uppercase tracking-[0.13em] text-white/30 transition hover:text-white/60 odd:border-r lg:border-r lg:last:border-r-0 lg:gap-3 lg:px-6 lg:py-5 lg:text-xs lg:tracking-[0.16em] lg:first:pl-0">
            <span className="text-cyan-100/55">0{index + 1}</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function LazySpatialScene() {
  const container = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element) return

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: "240px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={container} className="h-full w-full">{shouldRender && <SpatialScene />}</div>
}
