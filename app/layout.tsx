"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pascal - Desarrollador Web Full Stack | pascal.dev",
  description:
    "Portfolio profesional de Pascal, desarrollador web full-stack especializado en React, Next.js, TypeScript y tecnologías modernas. Creando experiencias digitales excepcionales.",
  keywords: [
    "Pascal",
    "pascal.dev",
    "desarrollador web",
    "full stack",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "desarrollo web",
  ],
  authors: [{ name: "Pascal", url: "https://pascal.dev" }],
  creator: "Pascal",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pascal.dev",
    title: "Pascal - Desarrollador Web Full Stack",
    description: "Creando experiencias digitales excepcionales con tecnologías modernas",
    siteName: "pascal.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal - Desarrollador Web Full Stack",
    description: "Creando experiencias digitales excepcionales con tecnologías modernas",
    creator: "@pascal1010100",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
