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
      <div className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-64 w-64 rounded-full bg-cyan-100/[0.045] blur-[100px] sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="relative mx-auto grid max-w-7xl min-w-0 items-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:min-h-[calc(100vh-6rem)] xl:grid-cols-[0.95fr_1.05fr] xl:py-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full min-w-0 max-w-3xl"
        >
          <div className="mb-5 flex min-w-0 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-100" />
            </span>
            <span className="min-w-0">Disponible para proyectos seleccionados</span>
          </div>

          <h1 className="max-w-full text-[2.35rem] font-medium leading-[0.98] tracking-[-0.055em] text-white min-[380px]:text-[2.55rem] sm:text-6xl lg:text-[4.15rem] xl:text-[4.35rem] 2xl:text-[4.65rem]">
            Diseño productos digitales que se sienten inevitables.
          </h1>

          <p className="mt-5 max-w-full text-base leading-7 text-white/58 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
            Estrategia, UI/UX e ingeniería full-stack para SaaS, interfaces con IA y sistemas digitales que necesitan verse sólidos desde el primer demo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link href="#projects" className="liquid-sheen group inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-cyan-50 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_36px_rgba(207,239,255,0.08)] transition hover:bg-white sm:w-auto">
              <span className="truncate">Explorar proyectos</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="#contact" className="inline-flex w-full min-w-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-white/82 transition hover:border-white/35 hover:bg-white/[0.055] hover:text-white sm:w-auto">
              Cuéntame tu idea
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/10 pt-5 text-[11px] text-white/45 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:pt-5 sm:text-sm">
            <span className="text-white/62">Respuesta en 24–48 h</span>
            <span className="text-white/62">Proyectos desde $5k</span>
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
          className="relative mx-0 mt-2 h-[15rem] min-w-0 overflow-hidden sm:mt-0 sm:h-[28rem] lg:h-[32rem] xl:-ml-10 xl:mr-[-3rem] xl:-mt-20 xl:h-[36rem] 2xl:mr-[-5rem] 2xl:-mt-24 2xl:h-[39rem]"
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

  return <div ref={container} className="h-full w-full overflow-hidden">{shouldRender && <SpatialScene />}</div>
}
