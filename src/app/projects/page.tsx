import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://portafolio1010100.vercel.app'

const socialImage = {
    url: "/social-preview.png",
    width: 1200,
    height: 630,
    alt: "Pascal.dev projects",
}

export const metadata: Metadata = {
    title: "Projects | Pascal.dev",
    description: "Published web products with details about the problem, solution, technologies, and outcome.",
    alternates: {
        canonical: `${siteUrl}/projects`,
    },
    openGraph: {
        title: "Projects | Pascal.dev",
        description: "Published web products with details about the problem, solution, technologies, and outcome.",
        type: "website",
        url: `${siteUrl}/projects`,
        siteName: "pascal.dev",
        images: [socialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | Pascal.dev",
        description: "Published web products with details about the problem, solution, technologies, and outcome.",
        images: [socialImage],
    },
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
