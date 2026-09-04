interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children: React.ReactNode
  id?: string
}

export function SectionContainer({
  className = "",
  children,
  id,
  ...props
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
}
