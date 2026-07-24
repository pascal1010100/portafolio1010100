"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const SpatialScene = dynamic(
  () => import("@/components/visuals/SpatialScene").then((module) => module.SpatialScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

export function SpatialSceneIsland() {
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

  return (
    <div
      ref={container}
      className="hero-scene relative z-0 mx-0 hidden min-w-0 overflow-hidden sm:mt-0 sm:block sm:h-[28rem] lg:h-[32rem] xl:-ml-44 xl:mr-[-5rem] xl:-mt-16 xl:h-[38rem] 2xl:-ml-56 2xl:mr-[-7rem] 2xl:-mt-20 2xl:h-[41rem]"
      role="img"
      aria-label="Visual tridimensional de Pascal.dev"
    >
      <div className="pointer-events-none absolute inset-[14%] rounded-full bg-sky-300/[0.07] blur-[90px]" />
      <div className="h-full w-full overflow-hidden">
        {shouldRender && <SpatialScene />}
      </div>
    </div>
  )
}
