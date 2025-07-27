"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import p5 from "p5"

export function SubtleP5Background() {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<p5 | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const sketch = (p: p5) => {
      let time = 0
      let canvas: p5.Renderer

      const getWaveColors = () => {
        if (theme === "light") {
          return {
            purple: { r: 139, g: 92, b: 246, opacity: 35 },
            cyan: { r: 6, g: 182, b: 212, opacity: 25 },
          }
        } else {
          return {
            purple: { r: 179, g: 0, b: 255, opacity: 20 },
            cyan: { r: 0, g: 204, b: 255, opacity: 15 },
          }
        }
      }

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(containerRef.current!)
      }

      p.draw = () => {
        p.clear()

        const colors = getWaveColors()

        p.noFill()
        p.strokeWeight(theme === "light" ? 1.5 : 1)

        // Ondas púrpura
        for (let i = 0; i < 3; i++) {
          const color = colors.purple
          p.stroke(color.r, color.g, color.b, color.opacity - i * 8)

          p.beginShape()
          for (let x = 0; x <= p.width; x += 10) {
            const y =
              p.height / 2 +
              Math.sin(x * 0.01 + time * 0.02 + i * 0.5) * (30 + i * 10) +
              Math.sin(x * 0.005 + time * 0.01 + i * 0.3) * (20 + i * 5)

            p.vertex(x, y)
          }
          p.endShape()
        }

        // Ondas cian
        for (let i = 0; i < 2; i++) {
          const color = colors.cyan
          p.stroke(color.r, color.g, color.b, color.opacity - i * 8)

          p.beginShape()
          for (let x = 0; x <= p.width; x += 10) {
            const y =
              p.height / 2 +
              100 +
              Math.sin(x * 0.008 + time * 0.015 + i * 0.7) * (25 + i * 8) +
              Math.cos(x * 0.006 + time * 0.012 + i * 0.4) * (15 + i * 3)

            p.vertex(x, y)
          }
          p.endShape()
        }

        time += 1
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    p5InstanceRef.current = new p5(sketch)

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }
    }
  }, [theme])

  return <div ref={containerRef} className="absolute inset-0 opacity-50 dark:opacity-30" style={{ zIndex: 1 }} />
}
