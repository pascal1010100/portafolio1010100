import Link from "next/link"
import { ArrowUpRight, Github, Linkedin } from "lucide-react"
import { SpatialSceneIsland } from "@/components/sections/hero/SpatialSceneIsland"
import { profile } from "@/data/profile"

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/10 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[var(--observatory-graphite)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_42%,rgba(112,170,255,0.16),transparent_27%),radial-gradient(circle_at_67%_72%,rgba(255,193,124,0.08),transparent_20%)]" />
      <div className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-64 w-64 rounded-full bg-cyan-100/[0.045] blur-[100px] sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="hero-shell relative mx-auto grid max-w-7xl min-w-0 items-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:min-h-[calc(100vh-6rem)] xl:grid-cols-[0.95fr_1.05fr] xl:py-8">
        <div
          className="hero-copy relative z-20 w-full min-w-0 max-w-3xl"
        >
          <div className="hero-status mb-5 flex min-w-0 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-100" />
            </span>
            <span className="min-w-0">Disponible para nuevos proyectos</span>
          </div>

          <h1 className="hero-title relative max-w-full text-[2.35rem] font-medium leading-[0.98] tracking-[-0.04em] text-white min-[380px]:text-[2.55rem] sm:text-6xl lg:text-[4.15rem] xl:text-[4.35rem] 2xl:text-[4.65rem]">
            {profile.headline}
          </h1>

          <p className="hero-subheadline mt-5 max-w-full text-base leading-7 text-white/72 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
            {profile.subheadline}
          </p>

          <div className="hero-actions mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link href="#projects" className="liquid-sheen group inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-cyan-50 px-6 py-3.5 text-sm font-semibold text-[var(--observatory-graphite)] shadow-[0_0_36px_rgba(207,239,255,0.08)] transition hover:bg-white sm:w-auto">
              <span className="truncate">Ver trabajo</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="#contact" className="inline-flex w-full min-w-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-white/82 transition hover:border-white/35 hover:bg-white/[0.055] hover:text-white sm:w-auto">
              Hablemos de tu proyecto
            </Link>
          </div>

          <div className="hero-proof mt-7 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/10 pt-5 text-[11px] text-white/60 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:pt-5 sm:text-sm">
            <span className="text-white/75">Proyectos · Colaboraciones · Oportunidades</span>
            <span className="text-white/75">Producto · Full-stack · IA aplicada</span>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 py-2 transition hover:text-white sm:min-h-0 sm:py-0">
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 py-2 transition hover:text-white sm:min-h-0 sm:py-0">
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
            </a>
            <a href={`${profile.social.email}?subject=Solicitud%20de%20CV`} className="inline-flex min-h-11 items-center py-2 transition hover:text-white sm:min-h-0 sm:py-0">
              Solicitar CV
            </a>
          </div>
        </div>

        <SpatialSceneIsland />
      </div>

    </section>
  )
}
