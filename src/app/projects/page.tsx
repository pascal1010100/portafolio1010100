import { Metadata } from "next"
import { ProjectShell } from "@/components/layout/ProjectShell"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"
import { absoluteUrl } from "@/lib/site"

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
        canonical: absoluteUrl("/projects"),
    },
    openGraph: {
        title: "Projects | Pascal.dev",
        description: "Published web products with details about the problem, solution, technologies, and outcome.",
        type: "website",
        url: absoluteUrl("/projects"),
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
    return (
        <ProjectShell>
            <ProjectArchive />
        </ProjectShell>
    )
}
