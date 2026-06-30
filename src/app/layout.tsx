import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import ClientWrapper from "@/components/client-wrapper"
import "./globals.css"
import { LazyMotion, domAnimation } from "framer-motion"

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
  title: "Pascal.dev — Boutique Software Engineering",
  description:
    "Pascal.dev diseña y desarrolla software moderno, escalable y mantenible con arquitectura sólida, diseño premium, automatización e ingeniería asistida por IA.",
  keywords: [
    "pascal.dev",
    "Boutique Software Engineering",
    "Product Engineering",
    "Full-Stack Architecture",
    "AI-assisted Development",
    "UI/UX Systems",
    "React",
    "Next.js",
    "TypeScript",
    "IA",
    "SaaS",
    "CI/CD",
  ],
  authors: [{ name: "Pascal.dev", url: "https://pascal.dev" }],
  creator: "Pascal.dev",
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: "https://pascal.dev",
    title: "Pascal.dev — Boutique Software Engineering",
    description: "Software moderno, escalable y mantenible con arquitectura, diseño premium, automatización e IA asistida.",
    siteName: "pascal.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal.dev — Boutique Software Engineering",
    description: "Software moderno, escalable y mantenible con arquitectura, diseño premium, automatización e IA asistida.",
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
      </body>
    </html>
  )
}
