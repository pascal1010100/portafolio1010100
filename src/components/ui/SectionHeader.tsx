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
        <span
          className="mb-4 inline-block text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 sm:mb-5 sm:text-xs sm:tracking-[0.18em]"
        >
          {subtitle}
        </span>
      )}
      <h2
        className="mb-4 text-3xl font-display font-medium leading-[1.05] tracking-[-0.04em] text-white sm:mb-5 sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className="max-w-2xl text-sm leading-7 text-white/65 sm:text-lg sm:leading-8"
        >
          {description}
        </p>
      )}
    </div>
  )
}
