interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  id?: string
}

export function SectionContainer({
  as: Component = "section",
  className = "",
  children,
  id,
  ...props
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={`scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </Component>
  )
}
