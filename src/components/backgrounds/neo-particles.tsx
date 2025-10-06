'use client'

import { useEffect, useRef, useCallback } from 'react';
import React from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  history: {x: number, y: number}[];
}

export const NeoParticles = React.memo(() => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const createParticle = useCallback((x: number, y: number): Particle => {
    return {
      x,
      y,
      size: Math.random() * 3 + 1,
      baseSize: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
      alpha: 0,
      targetAlpha: 0.5,
      history: Array(5).fill({ x, y })
    };
  }, []);

  const initParticles = useCallback((count: number, width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(
        createParticle(
          Math.random() * width,
          Math.random() * height
        )
      );
    }
    particlesRef.current = particles;
  }, [createParticle]);

  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvasSizeRef.current;
    const mouse = mouseRef.current;
    
    ctx.clearRect(0, 0, width, height);
    
    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
      
      // Update history
      particle.history.shift();
      particle.history.push({ x: particle.x, y: particle.y });
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Draw connections
      if (Math.abs(particle.x - mouse.x) < 100 && Math.abs(particle.y - mouse.y) < 100) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `${particle.color}40`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      return particle;
    });
    
    animationRef.current = requestAnimationFrame(() => updateParticles(ctx));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      
      const { width, height } = canvasRef.current.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      
      // Reinitialize particles on resize
      initParticles(50, width, height);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animationRef.current = requestAnimationFrame(() => updateParticles(ctx));
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, updateParticles]);

  return (
    <div ref={canvasRef} className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <canvas />
    </div>
  );
});

NeoParticles.displayName = 'NeoParticles';
