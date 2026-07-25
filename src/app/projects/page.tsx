import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://portafolio1010100.vercel.app'

const socialImage = {
    url: "/social-preview.png",
    width: 1200,
    height: 630,
    alt: "Proyectos de Pascal.dev",
}

export const metadata: Metadata = {
    title: "Proyectos | Pascal.dev",
    description: "Productos web publicados por Pascal.dev, con detalles sobre el problema, la solución, las tecnologías y el resultado.",
    alternates: {
        canonical: `${siteUrl}/projects`,
    },
    openGraph: {
        title: "Proyectos | Pascal.dev",
        description: "Productos web publicados por Pascal.dev, con detalles sobre el problema, la solución, las tecnologías y el resultado.",
        type: "website",
        url: `${siteUrl}/projects`,
        siteName: "pascal.dev",
        images: [socialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "Proyectos | Pascal.dev",
        description: "Productos web publicados por Pascal.dev, con detalles sobre el problema, la solución, las tecnologías y el resultado.",
        images: [socialImage],
    },
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
