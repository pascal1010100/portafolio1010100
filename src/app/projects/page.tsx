import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

export const metadata: Metadata = {
    title: "Archivo de proyectos | Pascal",
    description: "Una selección de productos digitales, experimentos y contribuciones construidas por Pascal.",
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
