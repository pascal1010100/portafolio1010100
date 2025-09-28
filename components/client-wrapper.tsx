'use client'

import { ThemeProvider as NextThemes } from 'next-themes'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes 
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemes>
  )
}
