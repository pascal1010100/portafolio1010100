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
            purple: { r: 217, g: 70, b: 239, opacity: 90 }, // Neon purple
            cyan: { r: 103, g: 232, b: 249, opacity: 70 },   // Neon cyan
          }
        } else {
          return {
            purple: { r: 217, g: 70, b: 239, opacity: 60 },
            cyan: { r: 103, g: 232, b: 249, opacity: 50 },
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
        p.strokeWeight(theme === "light" ? 2 : 1.5)

        // Ondas púrpura
        for (let i = 0; i < 4; i++) {
          const color = colors.purple
          p.stroke(color.r, color.g, color.b, color.opacity - i * 10)

          p.beginShape()
          for (let x = 0; x <= p.width; x += 8) {
            const y =
              p.height / 2 +
              Math.sin(x * 0.015 + time * 0.025 + i * 0.6) * (40 + i * 12) +
              Math.sin(x * 0.005 + time * 0.01 + i * 0.3) * (25 + i * 8)

            p.vertex(x, y)
          }
          p.endShape()
        }

        // Ondas cian
        for (let i = 0; i < 3; i++) {
          const color = colors.cyan
          p.stroke(color.r, color.g, color.b, color.opacity - i * 10)

          p.beginShape()
          for (let x = 0; x <= p.width; x += 8) {
            const y =
              p.height / 2 +
              120 +
              Math.sin(x * 0.012 + time * 0.02 + i * 0.5) * (30 + i * 10) +
              Math.cos(x * 0.006 + time * 0.015 + i * 0.4) * (18 + i * 5)

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

  return <div ref={containerRef} className="absolute inset-0 opacity-60 dark:opacity-40" style={{ zIndex: 1 }} />
}
