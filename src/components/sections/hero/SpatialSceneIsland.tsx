"use client"

import dynamic from "next/dynamic"
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react"
import { PascalMark } from "@/components/brand/PascalMark"

const SpatialScene = dynamic(
  () => import("@/components/visuals/SpatialScene").then((module) => module.SpatialScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

function SpatialSceneFallback() {
  return (
    <div
      className="spatial-fallback pointer-events-none absolute inset-0"
      data-testid="spatial-scene-fallback"
      aria-hidden="true"
    >
      <div className="spatial-fallback__mist" />
      <div className="spatial-fallback__pedestal">
        <div className="spatial-fallback__top" />
        <div className="spatial-fallback__reflection" />
      </div>
      <div className="spatial-fallback__cube"><PascalMark className="h-full w-full border-0 bg-transparent [&_svg]:h-full [&_svg]:w-full" /></div>
    </div>
  )
}

class SpatialSceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.props.onError()
  }

  render() {
    if (this.state.failed) return <SpatialSceneFallback />

    return this.props.children
  }
}

export function SpatialSceneIsland() {
  const container = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [useLowQuality, setUseLowQuality] = useState(false)
  const [composition, setComposition] = useState<"phone" | "tablet" | "desktop">("desktop")
  const [pointerActive, setPointerActive] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setShouldReduceMotion(preference.matches)
    updatePreference()
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    const element = container.current
    if (!element) return

    const contextProbe = document.createElement("canvas")
    const supportsWebGL = Boolean(
      contextProbe.getContext("webgl2") ?? contextProbe.getContext("webgl"),
    )

    if (!supportsWebGL) {
      setSceneFailed(true)
      return
    }

    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number }
    const lowPowerDevice =
      (navigatorWithMemory.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4

    const updateComposition = () => {
      setComposition(window.innerWidth < 600 ? "phone" : window.innerWidth < 900 ? "tablet" : "desktop")
    }

    setUseLowQuality(lowPowerDevice)
    setIsPageVisible(document.visibilityState === "visible")
    updateComposition()

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible")
    }

    const handleContextLoss = () => {
      setSceneFailed(true)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("resize", updateComposition)
    element.addEventListener("webglcontextlost", handleContextLoss, true)

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true)
      setIsInViewport(true)
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        window.removeEventListener("resize", updateComposition)
        element.removeEventListener("webglcontextlost", handleContextLoss, true)
      }
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          preloadObserver.disconnect()
        }
      },
      { rootMargin: "120px" },
    )

    const activityObserver = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0),
      { rootMargin: "0px", threshold: 0.01 },
    )

    preloadObserver.observe(element)
    activityObserver.observe(element)
    return () => {
      preloadObserver.disconnect()
      activityObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", updateComposition)
      element.removeEventListener("webglcontextlost", handleContextLoss, true)
    }
  }, [])

  const sceneActive = isInViewport && isPageVisible && !shouldReduceMotion && !motionPaused

  return (
    <div
      ref={container}
      className="hero-scene relative z-10 h-[20rem] min-w-0 overflow-hidden sm:h-[22rem] lg:h-[34rem] xl:h-[38rem]"
      role="group"
      aria-label="Pascal.dev framed cube in white and cyan light over a graphite platform"
      data-scene-active={sceneActive ? "true" : "false"}
      data-scene-loaded={shouldRender ? "true" : "false"}
      data-scene-motion={shouldReduceMotion ? "reduced" : sceneActive ? "running" : "paused"}
      data-scene-composition={composition}
      data-scene-quality={useLowQuality ? "low" : "standard"}
      onPointerEnter={() => setPointerActive(true)}
      onPointerLeave={() => setPointerActive(false)}
    >
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-cyan-100/[0.055] blur-[84px]" />
      {shouldRender && !sceneFailed && !shouldReduceMotion && (
        <button
          type="button"
          onClick={() => setMotionPaused((paused) => !paused)}
          aria-pressed={motionPaused}
          className="absolute bottom-2 right-4 z-10 inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-black/40 px-3 text-xs text-white/75 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100"
        >
          {motionPaused ? "Resume motion" : "Pause motion"}
        </button>
      )}
      <div className="h-full w-full overflow-hidden">
        {sceneFailed ? (
          <SpatialSceneFallback />
        ) : (
          shouldRender && (
            <SpatialSceneErrorBoundary onError={() => setSceneFailed(true)}>
              <SpatialScene
                active={sceneActive}
                composition={composition}
                lowQuality={useLowQuality}
                pointerActive={pointerActive}
                reduceMotion={shouldReduceMotion}
              />
            </SpatialSceneErrorBoundary>
          )
        )}
      </div>
    </div>
  )
}
