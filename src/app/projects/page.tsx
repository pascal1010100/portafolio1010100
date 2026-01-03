import { Metadata } from "next"
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive"

export const metadata: Metadata = {
    title: "Project Archive | Pascal",
    description: "A comprehensive list of all projects, experiments, and open source contributions.",
}

export default function ProjectsPage() {
    return <ProjectArchive />
}
