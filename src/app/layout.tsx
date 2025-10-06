import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import ClientWrapper from "@/components/client-wrapper"
import "./globals.css"
import { LazyMotion, domAnimation } from "framer-motion"
import dynamic from "next/dynamic"

// Importar dinámicamente el componente de partículas con SSR deshabilitado
const NeoParticles = dynamic(
  () => import("@/components/backgrounds/neo-particles").then((mod) => mod.NeoParticles),
  { ssr: false }
)

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
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <NeoParticles />
        <LazyMotion features={domAnimation}>
          <ClientWrapper>
            <div className="relative z-10">
              <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3a1a5a33,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#3a1a5a66,transparent)] pointer-events-none" />
              <div className="fixed inset-0 bg-[url('/images/grid.svg')] opacity-5 bg-[length:100px_100px] -z-10 pointer-events-none" />
              {children}
            </div>
          </ClientWrapper>
        </LazyMotion>
      </body>
    </html>
  )
}
