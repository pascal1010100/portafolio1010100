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

const SpatialScene = dynamic(
  () => import("@/components/visuals/SpatialScene").then((module) => module.SpatialScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

function SpatialSceneFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      data-testid="spatial-scene-fallback"
      aria-hidden="true"
    >
      <div className="absolute h-[58%] w-[58%] rounded-full border border-cyan-100/[0.08] bg-[radial-gradient(circle,rgba(112,170,255,0.12),rgba(3,5,6,0)_68%)]" />
      <div className="absolute h-[38%] w-[38%] rotate-45 border border-cyan-100/[0.14] bg-white/[0.012] shadow-[0_28px_90px_rgba(0,0,0,0.25)]" />
      <div className="h-[16%] w-[16%] rotate-45 border border-cyan-50/25 bg-[radial-gradient(circle_at_35%_30%,rgba(207,239,255,0.2),rgba(3,5,6,0.94)_66%)]" />
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
  const [useCompactQuality, setUseCompactQuality] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)

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
    const compactDevice =
      window.matchMedia("(max-width: 900px)").matches ||
      (navigatorWithMemory.deviceMemory ?? 8) <= 4 ||
      navigator.hardwareConcurrency <= 4

    setUseCompactQuality(compactDevice)
    setIsPageVisible(document.visibilityState === "visible")

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible")
    }

    const handleContextLoss = () => {
      setSceneFailed(true)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    element.addEventListener("webglcontextlost", handleContextLoss, true)

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true)
      setIsInViewport(true)
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        element.removeEventListener("webglcontextlost", handleContextLoss, true)
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
      element.removeEventListener("webglcontextlost", handleContextLoss, true)
    }
  }, [])

  return (
    <div
      ref={container}
      className="hero-scene relative z-0 mx-0 hidden min-w-0 overflow-hidden sm:mt-0 sm:block sm:h-64 lg:-ml-20 lg:mr-[-2rem] lg:h-[30rem] xl:-ml-44 xl:mr-[-5rem] xl:-mt-16 xl:h-[38rem] 2xl:-ml-56 2xl:mr-[-7rem] 2xl:-mt-20 2xl:h-[41rem]"
      role="img"
      aria-label="Abstract illustration of the Pascal.dev digital core"
    >
      <div className="pointer-events-none absolute inset-[14%] rounded-full bg-sky-300/[0.07] blur-[90px]" />
      <div className="h-full w-full overflow-hidden">
        {sceneFailed ? (
          <SpatialSceneFallback />
        ) : (
          shouldRender && (
            <SpatialSceneErrorBoundary onError={() => setSceneFailed(true)}>
              <SpatialScene
                active={isInViewport && isPageVisible}
                compact={useCompactQuality}
              />
            </SpatialSceneErrorBoundary>
          )
        )}
      </div>
    </div>
  )
}
