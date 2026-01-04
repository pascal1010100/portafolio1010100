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
  metadataBase: new URL("https://pascal.dev"),
  title: "Pascal - Senior Full-Stack Engineer | pascal.dev",
  description:
    "Professional portfolio of Pascal, a Senior Full-Stack Engineer specializing in React, Next.js, TypeScript, and AI-driven solutions. Building scalable, high-performance digital products.",
  keywords: [
    "Pascal",
    "pascal.dev",
    "Full-Stack Engineer",
    "Senior Developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "SaaS",
    "Software Engineer",
  ],
  authors: [{ name: "Pascal", url: "https://pascal.dev" }],
  creator: "Pascal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pascal.dev",
    title: "Pascal - Senior Full-Stack Engineer",
    description: "Building scalable, high-performance digital products with modern technologies.",
    siteName: "pascal.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal - Senior Full-Stack Engineer",
    description: "Building scalable, high-performance digital products with modern technologies.",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
