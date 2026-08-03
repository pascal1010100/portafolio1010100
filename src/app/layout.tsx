import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://portafolio1010100.vercel.app'

const socialImage = {
  url: "/social-preview-v2.png",
  width: 1200,
  height: 630,
  alt: "Pascal.dev — Founder-led product engineering studio",
}

// Font configuration
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
  title: "Pascal.dev — Founder-led product engineering studio",
  description:
    "An independent practice building commercial websites, operational tools, and focused web MVPs for founders, small teams, and businesses.",
  keywords: [
    "pascal.dev",
    "Digital product design",
    "Full-stack architecture",
    "AI-assisted development",
    "Experience design",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
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
    locale: "en_US",
    url: siteUrl,
    title: "Pascal.dev — Founder-led product engineering studio",
    description: "An independent practice building commercial websites, operational tools, and focused web MVPs around real business needs.",
    siteName: "pascal.dev",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal.dev — Founder-led product engineering studio",
    description: "An independent practice building commercial websites, operational tools, and focused web MVPs around real business needs.",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
