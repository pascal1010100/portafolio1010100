import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SpatialSceneIsland } from "@/components/sections/hero/SpatialSceneIsland"
import { profile } from "@/data/profile"

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[var(--observatory-graphite)] px-3 pb-4 pt-24 sm:px-5 sm:pb-6 sm:pt-28 lg:px-8">
      <div className="hero-premium relative mx-auto min-h-[calc(100svh-7.5rem)] max-w-[1440px] overflow-hidden rounded-[1.75rem] border border-[#203038]/90 bg-[#030506] shadow-[0_26px_64px_-18px_rgba(0,0,0,0.68)] sm:min-h-[720px] lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="absolute inset-0 bg-[url('/images/pascal-hero-environment-v2.png')] bg-cover bg-[62%_center] sm:bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#030506_0%,rgba(3,5,6,0.97)_36%,rgba(3,5,6,0.69)_58%,rgba(3,5,6,0.12)_82%,rgba(3,5,6,0)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,5,6,0.92)_0%,rgba(3,5,6,0.84)_54%,rgba(3,5,6,0.22)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,6,0.76)_0%,rgba(3,5,6,0.04)_28%,rgba(3,5,6,0.04)_72%,rgba(3,5,6,0.76)_100%)]" aria-hidden="true" />

        <div
          className="hero-copy relative z-20 flex min-w-0 flex-col px-6 pt-12 sm:px-12 sm:pt-16 lg:py-16 lg:pl-14 lg:pr-0"
        >
          <div className="hero-status mb-5 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#89cdff] sm:mb-6 sm:text-[11px]">
            Product engineering&nbsp;&nbsp;/&nbsp;&nbsp;digital systems
          </div>

          <h1 className="hero-title relative max-w-[620px] text-[2.35rem] font-medium leading-[1.02] tracking-[-0.035em] text-[#ecfeff] min-[380px]:text-[2.55rem] sm:text-5xl sm:leading-[1.04] xl:text-[3.75rem]">
            {profile.headline}
          </h1>

          <p className="hero-subheadline mt-6 max-w-[560px] text-base leading-7 text-[#a8bac2]">
            {profile.subheadline}
          </p>

          <div className="hero-actions mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
            <Link href="#contact" className="liquid-sheen group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#ecfeff] bg-[#ecfeff] px-5 py-3 text-sm font-semibold text-[#030506] shadow-[0_10px_24px_rgba(207,250,254,0.13)] transition hover:bg-white">
              <span>Discuss your project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="#projects" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#203038] bg-[#101a20]/90 px-5 py-3 text-sm font-medium text-[#ecfeff] backdrop-blur-sm transition hover:border-[#89cdff]/45 hover:bg-[#132129]">
              <span>See selected work</span>
              <ArrowUpRight className="h-4 w-4 text-[#89cdff] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="hero-proof pr-0 pt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#78909b] sm:pr-0">
            <span className="sm:hidden">Independent practice&nbsp;&nbsp;·&nbsp;&nbsp;Guatemala / Remote</span>
            <span className="hidden sm:inline">Independent practice&nbsp;&nbsp;·&nbsp;&nbsp;Direct founder involvement&nbsp;&nbsp;·&nbsp;&nbsp;Guatemala / Remote</span>
          </div>
        </div>

        <SpatialSceneIsland />
      </div>
    </section>
  )
}
