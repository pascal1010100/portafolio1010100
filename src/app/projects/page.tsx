import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://portafolio1010100.vercel.app'

const socialImage = {
    url: "/social-preview.png",
    width: 1200,
    height: 630,
    alt: "Casos de trabajo de Pascal.dev",
}

export const metadata: Metadata = {
    title: "Casos de trabajo | Pascal.dev",
    description: "Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.",
    alternates: {
        canonical: `${siteUrl}/projects`,
    },
    openGraph: {
        title: "Casos de trabajo | Pascal.dev",
        description: "Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.",
        type: "website",
        url: `${siteUrl}/projects`,
        siteName: "pascal.dev",
        images: [socialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "Casos de trabajo | Pascal.dev",
        description: "Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.",
        images: [socialImage],
    },
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
