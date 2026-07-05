import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import ClientWrapper from "@/components/client-wrapper"
import "./globals.css"
import { LazyMotion, domAnimation } from "framer-motion"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://portafolio1010100.vercel.app'

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
  title: "Pascal.dev — Ingeniería de producto digital",
  description:
    "Producto digital, arquitectura full-stack e IA aplicada, respaldados por casos reales y una ejecución técnica mantenible.",
  keywords: [
    "pascal.dev",
    "Ingeniería de producto digital",
    "Arquitectura full-stack",
    "Desarrollo asistido por IA",
    "Sistemas UI/UX",
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
    title: "Pascal.dev — Ingeniería de producto digital",
    description: "Producto digital, arquitectura full-stack e IA aplicada, respaldados por casos reales.",
    siteName: "pascal.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal.dev — Ingeniería de producto digital",
    description: "Producto digital, arquitectura full-stack e IA aplicada, respaldados por casos reales.",
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <LazyMotion features={domAnimation}>
          <ClientWrapper>
            <div className="relative z-10">
              {children}
            </div>
          </ClientWrapper>
        </LazyMotion>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
