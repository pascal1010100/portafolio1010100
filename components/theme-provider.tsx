'use client'

import * as React from 'react'
import { ThemeProvider as NextThemes } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Evitar renderizado hasta que el componente esté montado en el cliente
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemes 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  )
}
