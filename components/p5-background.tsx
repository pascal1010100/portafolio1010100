"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import p5 from "p5"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function P5Background() {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<p5 | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const sketch = (p: p5) => {
      const particles: Particle[] = []
      const mouse = { x: 0, y: 0 }
      let canvas: p5.Renderer

      const getColors = () => {
        return theme === "light"
          ? {
              purple: "#8b5cf6",
              cyan: "#06b6d4",
              glow: 8,
              connectionColor: [100, 116, 139],
              connectionOpacity: 40,
            }
          : {
              purple: "#b300ff",
              cyan: "#00ccff",
              glow: 12,
              connectionColor: [255, 255, 255],
              connectionOpacity: 30,
            }
      }

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(containerRef.current!)

        for (let i = 0; i < 80; i++) {
          particles.push(createParticle(p))
        }
      }

      p.draw = () => {
        p.clear()

        mouse.x = p.mouseX
        mouse.y = p.mouseY

        updateParticles(p)
        drawParticles(p)
        drawConnections(p)
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.mouseMoved = () => {
        if (particles.length < 100) {
          particles.push(createParticle(p, p.mouseX, p.mouseY))
        }
      }

      function createParticle(p: p5, x?: number, y?: number): Particle {
        const colors = getColors()
        return {
          x: x || p.random(p.width),
          y: y || p.random(p.height),
          vx: p.random(-0.5, 0.5),
          vy: p.random(-0.5, 0.5),
          size: p.random(1.5, 3.5),
          opacity: theme === "light" ? p.random(0.5, 0.9) : p.random(0.15, 0.6),
          color: p.random() > 0.5 ? colors.purple : colors.cyan,
        }
      }

      function updateParticles(p: p5) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i]

          particle.x += particle.vx
          particle.y += particle.vy

          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            particle.vx += dx * 0.00005
            particle.vy += dy * 0.00005
          }

          if (particle.x < 0 || particle.x > p.width) {
            particle.vx *= -0.8
            particle.x = p.constrain(particle.x, 0, p.width)
          }
          if (particle.y < 0 || particle.y > p.height) {
            particle.vy *= -0.8
            particle.y = p.constrain(particle.y, 0, p.height)
          }

          particle.vx *= 0.999
          particle.vy *= 0.999
          particle.opacity *= theme === "light" ? 0.9995 : 0.998

          if (particle.opacity < 0.01) {
            particles.splice(i, 1)
          }
        }

        while (particles.length < 60) {
          particles.push(createParticle(p))
        }
      }

      function drawParticles(p: p5) {
        const colors = getColors()

        for (const particle of particles) {
          p.push()
          p.noStroke()
          p.drawingContext.shadowColor = particle.color
          p.drawingContext.shadowBlur = colors.glow

          const c = p.color(particle.color)
          c.setAlpha(particle.opacity * 255)
          p.fill(c)
          p.circle(particle.x, particle.y, particle.size)
          p.pop()
        }
      }

      function drawConnections(p: p5) {
        const colors = getColors()
        p.strokeWeight(0.5)

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              const opacity = p.map(distance, 0, 100, colors.connectionOpacity, 0)
              const strokeColor = p.color(
                colors.connectionColor[0],
                colors.connectionColor[1],
                colors.connectionColor[2],
                opacity
              )
              p.stroke(strokeColor)
              p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            }
          }
        }
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
