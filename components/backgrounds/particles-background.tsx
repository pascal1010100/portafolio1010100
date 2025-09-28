"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import p5 from "p5"

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  color: number[]
  angle: number
  speed: number
  noiseOffset: number
  alpha: number
  targetAlpha: number
  velocity: {
    x: number
    y: number
  }
  z: number
  targetZ: number
  rotation: number
  spin: number
}

// Configuración
const CONFIG = {
  // Cantidad de partículas
  PARTICLE_COUNT: 80,
  // Distancia máxima para conexiones
  MAX_DISTANCE: 180,
  // Radio de interacción del mouse
  MOUSE_RADIUS: 250,
  // Radio de interacción en móviles
  MOBILE_MOUSE_RADIUS: 180,
  // Velocidad base de las partículas
  BASE_SPEED: 0.25,
  // Escala del ruido para el movimiento
  NOISE_SCALE: 0.005,
  // Opacidad de fondo
  BG_ALPHA: 15,
  // Opacidad de las conexiones
  CONNECTION_OPACITY: 0.6,
  // Opacidad de las partículas
  PARTICLE_OPACITY: 0.9,
  // Fuerza de repulsión del mouse
  MOUSE_FORCE: 4,
  // Suavizado del movimiento
  LERP_FACTOR: 0.08,
  // Tamaño de las partículas
  PARTICLE_SIZE_MIN: 1.2,
  PARTICLE_SIZE_MAX: 2.5,
  // Profundidad (efecto 3D)
  DEPTH: 200,
  // Colores
  COLORS: [
    [138, 180, 255], // Azul cielo brillante
    [200, 220, 255], // Azul muy claro
    [255, 255, 255], // Blanco puro
    [170, 210, 255]  // Azul celeste
  ] as [number, number, number][],
  // Color de fondo
  BG_COLOR: [8, 8, 16] as [number, number, number],
  // Color de las conexiones
  CONNECTION_COLOR: [160, 200, 255] as [number, number, number]
}

export function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const p5Instance = useRef<p5 | null>(null)
  const frameCount = useRef(0)
  const lastMouseMove = useRef(performance.now())
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  }, [])

  // Configuración dinámica basada en el dispositivo
  const config = useMemo(() => ({
    ...CONFIG,
    particleCount: isMobile ? Math.floor(CONFIG.PARTICLE_COUNT * 0.6) : CONFIG.PARTICLE_COUNT,
    mouseRadius: isMobile ? CONFIG.MOBILE_MOUSE_RADIUS : CONFIG.MOUSE_RADIUS,
    baseSpeed: isMobile ? CONFIG.BASE_SPEED * 0.7 : CONFIG.BASE_SPEED,
    maxDistance: isMobile ? CONFIG.MAX_DISTANCE * 0.8 : CONFIG.MAX_DISTANCE,
    // Make sure all config properties are properly cased
    bgColor: CONFIG.BG_COLOR,
    bgAlpha: CONFIG.BG_ALPHA,
    connectionOpacity: CONFIG.CONNECTION_OPACITY,
    particleOpacity: CONFIG.PARTICLE_OPACITY
  }), [isMobile])

  // Función para manejar el movimiento del mouse con throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now()
    if (now - lastMouseMove.current > 16) { // ~60fps
      setMousePos({ x: e.clientX, y: e.clientY })
      lastMouseMove.current = now
    }
  }, [])

  // Manejar eventos táctiles
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      const now = performance.now()
      if (now - lastMouseMove.current > 16) {
        setMousePos({ x: touch.clientX, y: touch.clientY })
        lastMouseMove.current = now
      }
    }
  }, [])

  // Efecto principal de la animación
  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined" || p5Instance.current) return

    // Añadir event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const sketch = (p: p5) => {
      let particles: Particle[] = []
      let canvas: p5.Renderer

      // Inicialización
      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(containerRef.current!)
        p.noStroke()
        initParticles()
      }

      // Inicializar partículas
      const initParticles = () => {
        particles = []
        for (let i = 0; i < config.particleCount; i++) {
          particles.push(createParticle(p))
        }
      }

      // Crear una nueva partícula
      const createParticle = (p: p5): Particle => {
        const color = p.random(CONFIG.COLORS)
        const size = p.random(1, 2.5)
        const angle = p.random(p.TWO_PI)
        const speed = config.baseSpeed * p.random(0.8, 1.2)
        
        return {
          x: p.random(p.width),
          y: p.random(p.height),
          z: 0,  // Added missing property
          targetZ: 0,  // Added missing property
          size: size,
          baseSize: size,
          color: color,
          angle: angle,
          speed: speed,
          noiseOffset: p.random(1000),
          alpha: 0,
          targetAlpha: p.random(50, 200),
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          },
          rotation: 0,  // Added missing property
          spin: p.random(-0.05, 0.05)  // Added missing property with a small random spin
        }
      }
      // Actualizar posición y propiedades de las partículas
      const updateParticles = () => {
        const time = p.millis() * 0.001 * config.BASE_SPEED
        
        particles.forEach(particle => {
          // Actualizar posición basada en el ruido de Perlin para movimiento orgánico
          const noiseVal = p.noise(
            particle.x * 0.01, 
            particle.y * 0.01, 
            particle.noiseOffset + time
          )
          
          // Actualizar ángulo basado en el ruido
          particle.angle = noiseVal * p.TWO_PI * 2
          
          // Actualizar velocidad
          particle.velocity.x = Math.cos(particle.angle) * particle.speed
          particle.velocity.y = Math.sin(particle.angle) * particle.speed
          
          // Actualizar posición
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y
          
          // Rebotar en los bordes
          if (particle.x < 0 || particle.x > p.width) {
            particle.velocity.x *= -1
            particle.x = p.constrain(particle.x, 0, p.width)
          }
          if (particle.y < 0 || particle.y > p.height) {
            particle.velocity.y *= -1
            particle.y = p.constrain(particle.y, 0, p.height)
          }
          
          // Actualizar alpha para efecto de parpadeo suave
          particle.alpha = p.lerp(particle.alpha, particle.targetAlpha, 0.05)
          if (p.random() < 0.01) {
            particle.targetAlpha = p.random(50, 200)
          }
          
          // Actualizar rotación
          particle.rotation += particle.spin
        })
      }
      
      // Dibujar conexiones entre partículas
      const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i]
          
          // Dibujar partícula
          p.fill(p1.color[0], p1.color[1], p1.color[2], p1.alpha * config.particleOpacity)
          p.noStroke()
          p.ellipse(p1.x, p1.y, p1.size * 2)
          
          // Buscar conexiones con otras partículas
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distanceSq = dx * dx + dy * dy
            
            // Solo dibujar líneas entre partículas cercanas
            if (distanceSq < config.maxDistance * config.maxDistance) {
              const distance = Math.sqrt(distanceSq)
              const opacity = (1 - distance / config.maxDistance) * config.connectionOpacity * 255 * (Math.min(p1.alpha, p2.alpha) / 255)
              
              // Interpolar el color entre las dos partículas
              const color = [
                (p1.color[0] + p2.color[0]) / 2,
                (p1.color[1] + p2.color[1]) / 2,
                (p1.color[2] + p2.color[2]) / 2
              ]
              
              // Dibujar línea con gradiente
              const gradient = p.drawingContext.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
              gradient.addColorStop(0, `rgba(${p1.color.join(',')}, ${opacity * 0.7})`)
              gradient.addColorStop(1, `rgba(${p2.color.join(',')}, ${opacity * 0.7})`)
              
              p.drawingContext.strokeStyle = gradient
              p.drawingContext.lineWidth = 0.5
              p.drawingContext.beginPath()
              p.drawingContext.moveTo(p1.x, p1.y)
              p.drawingContext.lineTo(p2.x, p2.y)
              p.drawingContext.stroke()
            }
          }
        }
      }
      
      // Bucle de dibujado principal
      p.draw = () => {
        frameCount.current++
        
        // Fondo con transparencia para efecto de rastro
        p.background(config.bgColor[0], config.bgColor[1], config.bgColor[2], config.bgAlpha)
        p.rect(0, 0, p.width, p.height)
        
        // Actualizar y dibujar partículas
        updateParticles()
        drawConnections()
      }

      // Mover la lógica de dibujado de partículas al lugar correcto
      // (esto debería estar dentro de updateParticles o drawConnections)

      // Manejar bordes con wrap-around suave
      const wrapAroundBorders = (particle: Particle) => {
        const margin = 100
        const easeFactor = 0.1
        
        // Suavizar la transición al reaparecer
        if (particle.x < -margin) {
          particle.x = p.width + margin
          particle.y = p.random(p.height)
        } else if (particle.x > p.width + margin) {
          particle.x = -margin
          particle.y = p.random(p.height)
        }
        
        if (particle.y < -margin) {
          particle.y = p.height + margin
          particle.x = p.random(p.width)
        } else if (particle.y > p.height + margin) {
          particle.y = -margin
          particle.x = p.random(p.width)
        }
      }

      // Aplicar interacción con el mouse
      const applyMouseInteraction = (particle: Particle) => {
        const mouseDist = p.dist(particle.x, particle.y, mousePos.x, mousePos.y)
        
        if (mouseDist < config.mouseRadius) {
          const angle = Math.atan2(particle.y - mousePos.y, particle.x - mousePos.x)
          const force = p.map(mouseDist, 0, config.mouseRadius, 0.8, 0)
          
          // Aplicar fuerza de repulsión
          particle.x += Math.cos(angle) * force * 3
          particle.y += Math.sin(angle) * force * 3
          
          // Aumentar el tamaño al interactuar
          particle.size = p.lerp(
            particle.size, 
            particle.baseSize * 1.5, 
            0.1
          )
        } else {
          // Volver al tamaño original
          particle.size = p.lerp(
            particle.size, 
            particle.baseSize, 
            0.05
          )
        }
      }

      // Manejar redimensionamiento
      const handleResize = () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }
        
        resizeTimeoutRef.current = setTimeout(() => {
          if (p5Instance.current && containerRef.current) {
            p5Instance.current.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
          }
        }, 250)
      }

    }
    
    // Inicializar p5
    const p5InstanceValue = new p5(sketch, containerRef.current)
    p5Instance.current = p5InstanceValue
    
    // Manejar redimensionamiento inicial
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (p5InstanceValue && containerRef.current) {
          p5InstanceValue.resizeCanvas(
            containerRef.current.offsetWidth, 
            containerRef.current.offsetHeight
          )
        }
      }, 250)
    }
    
    // Añadir listener de redimensionamiento
    window.addEventListener('resize', handleResize)
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      
      if (p5InstanceValue) {
        p5InstanceValue.remove()
        if (p5Instance.current === p5InstanceValue) {
          p5Instance.current = null
        }
      }
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-90"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(10,10,30,0.8) 0%, rgba(5,5,15,0.95) 100%)',
        pointerEvents: 'none'
      }}
    />
  )
}
//!