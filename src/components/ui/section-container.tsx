"use client"

import { forwardRef } from "react"

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  id?: string
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  ({ as: Component = "section", className = "", children, id, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        id={id}
        className={`scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Component>
    )
  },
)

SectionContainer.displayName = "SectionContainer"
