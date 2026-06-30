import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

export const metadata: Metadata = {
    title: "Casos de trabajo | Pascal.dev",
    description: "Productos, prototipos y sistemas desplegados por Pascal.dev con contexto, stack, estado y evidencia disponible.",
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
