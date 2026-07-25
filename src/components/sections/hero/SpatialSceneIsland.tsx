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
  const [isInViewport, setIsInViewport] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [useCompactQuality, setUseCompactQuality] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element) return

    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number }
    const compactDevice =
      window.matchMedia("(max-width: 900px)").matches ||
      (navigatorWithMemory.deviceMemory ?? 8) <= 4 ||
      navigator.hardwareConcurrency <= 4

    setUseCompactQuality(compactDevice)
    setIsPageVisible(document.visibilityState === "visible")

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible")
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true)
      setIsInViewport(true)
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)

        if (entry.isIntersecting) {
          setShouldRender(true)
        }
      },
      { rootMargin: "120px" },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return (
    <div
      ref={container}
      className="hero-scene relative z-0 mx-0 hidden min-w-0 overflow-hidden sm:mt-0 sm:block sm:h-[28rem] lg:h-[32rem] xl:-ml-44 xl:mr-[-5rem] xl:-mt-16 xl:h-[38rem] 2xl:-ml-56 2xl:mr-[-7rem] 2xl:-mt-20 2xl:h-[41rem]"
      role="img"
      aria-label="Ilustración 3D de un núcleo digital de Pascal.dev"
    >
      <div className="pointer-events-none absolute inset-[14%] rounded-full bg-sky-300/[0.07] blur-[90px]" />
      <div className="h-full w-full overflow-hidden">
        {shouldRender && (
          <SpatialScene
            active={isInViewport && isPageVisible}
            compact={useCompactQuality}
          />
        )}
      </div>
    </div>
  )
}
