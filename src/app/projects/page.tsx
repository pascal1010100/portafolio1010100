import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://portafolio1010100.vercel.app'

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
    },
    twitter: {
        card: "summary_large_image",
        title: "Casos de trabajo | Pascal.dev",
        description: "Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.",
    },
}

export default function ProjectsPage() {
    return <ProjectArchive />
}

