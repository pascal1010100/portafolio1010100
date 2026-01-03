import {
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaDocker,
} from "react-icons/fa"
import {
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiPostgresql,
    SiSupabase,
    SiGraphql,
    SiOpenai,
    SiPrisma
} from "react-icons/si"

export const skills = [
    {
        category: "Frontend Core",
        items: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" }
        ]
    },
    {
        category: "Backend & Database",
        items: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
            { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
            { name: "GraphQL", icon: SiGraphql, color: "#E10098" }
        ]
    },
    {
        category: "AI & Infrastructure",
        items: [
            { name: "OpenAI API", icon: SiOpenai, color: "#412991" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "Prisma", icon: SiPrisma, color: "#2D3748" }
        ]
    }
]
