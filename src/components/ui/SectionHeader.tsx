'use client'

import { motion } from 'framer-motion'

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
    <div className={`mb-10 max-w-3xl sm:mb-14 ${className}`}>
      {subtitle && (
        <motion.span
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-block text-[10px] font-medium uppercase tracking-[0.16em] text-white/35 sm:mb-5 sm:text-xs sm:tracking-[0.18em]"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mb-4 text-3xl font-display font-medium leading-[1.05] tracking-[-0.04em] text-white sm:mb-5 sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="max-w-2xl text-sm leading-7 text-white/50 sm:text-lg sm:leading-8"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
