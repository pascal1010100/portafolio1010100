import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://portafolio1010100.vercel.app'

const socialImage = {
  url: "/social-preview.png",
  width: 1200,
  height: 630,
  alt: "Pascal.dev — Diseño y desarrollo de productos digitales",
}

// Configuración de fuentes
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pascal.dev — Diseño y desarrollo de productos digitales",
  description:
    "Productos web, herramientas internas e integraciones con IA diseñados y desarrollados a partir de necesidades reales.",
  keywords: [
    "pascal.dev",
    "Diseño de productos digitales",
    "Arquitectura full-stack",
    "Desarrollo asistido por IA",
    "Diseño de experiencia",
    "React",
    "Next.js",
    "TypeScript",
    "IA",
    "SaaS",
    "CI/CD",
  ],
  authors: [{ name: "Pascal.dev", url: siteUrl }],
  creator: "Pascal.dev",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: siteUrl,
    title: "Pascal.dev — Diseño y desarrollo de productos digitales",
    description: "Productos web, herramientas internas e integraciones con IA creados a partir de necesidades reales.",
    siteName: "pascal.dev",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal.dev — Diseño y desarrollo de productos digitales",
    description: "Productos web, herramientas internas e integraciones con IA creados a partir de necesidades reales.",
    creator: "@pascal1010100",
    images: [socialImage],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
