'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  description?: string
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl mx-auto text-center mb-12 ${className}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-primary mb-2 inline-block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
