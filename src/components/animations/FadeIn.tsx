'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: FadeInProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
          delay: delay,
        }
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
