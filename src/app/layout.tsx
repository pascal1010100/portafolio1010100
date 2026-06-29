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
  title: "Pascal — Product Engineer & Advanced UI/UX",
  description:
    "Diseño y desarrollo de productos digitales, SaaS y experiencias con AI: estrategia, UI/UX avanzada e ingeniería full-stack.",
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
    locale: "es_GT",
    url: "https://pascal.dev",
    title: "Pascal — Product Engineer & Advanced UI/UX",
    description: "Productos digitales memorables, escalables y listos para crecer.",
    siteName: "pascal.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal — Product Engineer & Advanced UI/UX",
    description: "Productos digitales memorables, escalables y listos para crecer.",
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
