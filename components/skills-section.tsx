import { SectionContainer } from "./ui/section-container"

const skillCategories = [
  {
    name: "Frontend",
    color: "from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan",
    skills: [
      { name: "React", level: 95, icon: "R" },
      { name: "Next.js", level: 90, icon: "N" },
      { name: "TypeScript", level: 88, icon: "T" },
      { name: "Tailwind", level: 92, icon: "TW" },
      { name: "Shadcn/ui", level: 85, icon: "SH" },
    ],
  },
  {
    name: "Backend",
    color: "from-slate-700 to-slate-900 dark:from-accent-cyan dark:to-accent-purple",
    skills: [
      { name: "Node.js", level: 85, icon: "N" },
      { name: "REST APIs", level: 90, icon: "API" },
      { name: "Supabase", level: 88, icon: "SB" },
      { name: "Express", level: 85, icon: "E" },
    ],
  },
  {
    name: "Database & Tools",
    color: "from-slate-500 to-slate-700 dark:from-green-400 dark:to-accent-cyan",
    skills: [
      { name: "PostgreSQL", level: 85, icon: "PG" },
      { name: "Supabase", level: 88, icon: "SB" },
      { name: "Git", level: 95, icon: "G" },
      { name: "Vercel", level: 92, icon: "V" },
    ],
  },
]

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="bg-slate-50 dark:bg-background-secondary">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-foreground mb-4">
          Stack{" "}
          <span className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan bg-clip-text text-transparent">
            Tecnológico
          </span>
        </h2>
        <p className="text-slate-600 dark:text-foreground-muted text-lg max-w-2xl mx-auto">
          Tecnologías que domino para crear soluciones digitales robustas y escalables.
        </p>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`h-1 w-8 bg-gradient-to-r ${category.color} rounded-full`} />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground">{category.name}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="group relative p-3 rounded-lg border border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple/50 bg-white dark:bg-background hover:bg-gradient-to-br hover:from-slate-50 hover:to-slate-100 dark:hover:from-accent-purple/5 dark:hover:to-accent-cyan/5 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  style={{
                    animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`,
                  }}
                >
                  {/* Skill Icon */}
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className={`w-8 h-8 rounded-md bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                    >
                      {skill.icon}
                    </div>
                  </div>

                  {/* Skill Name */}
                  <div className="text-center">
                    <h4 className="font-medium text-slate-900 dark:text-foreground text-sm mb-1 truncate">
                      {skill.name}
                    </h4>

                    {/* Experience Level Bar */}
                    <div className="w-full bg-slate-200 dark:bg-border rounded-full h-1.5 mb-1">
                      <div
                        className={`h-1.5 bg-gradient-to-r ${category.color} rounded-full transition-all duration-500 group-hover:shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Level Percentage */}
                    <span className="text-xs text-slate-500 dark:text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 rounded-lg bg-white dark:bg-background border border-slate-200 dark:border-border">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan bg-clip-text text-transparent mb-1">
            5+
          </div>
          <div className="text-sm text-slate-500 dark:text-foreground-muted">Años de experiencia</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-background border border-slate-200 dark:border-border">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-cyan dark:to-accent-purple bg-clip-text text-transparent mb-1">
            50+
          </div>
          <div className="text-sm text-slate-500 dark:text-foreground-muted">Proyectos completados</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-background border border-slate-200 dark:border-border">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan bg-clip-text text-transparent mb-1">
            8+
          </div>
          <div className="text-sm text-slate-500 dark:text-foreground-muted">Tecnologías dominadas</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-background border border-slate-200 dark:border-border">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-cyan dark:to-accent-purple bg-clip-text text-transparent mb-1">
            100%
          </div>
          <div className="text-sm text-slate-500 dark:text-foreground-muted">Proyectos entregados</div>
        </div>
      </div>
    </SectionContainer>
  )
}
