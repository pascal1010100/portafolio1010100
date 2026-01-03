import { motion, Variants } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { skills } from "@/data/skills"
import { cn } from "@/lib/utils"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10
    }
  }
}

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 border-b border-white/10 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h6 className="text-primary font-mono text-xs tracking-widest uppercase mb-2">
                   // System_Diagnostics_Module_v2.5
              </h6>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground uppercase tracking-tight">
                Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Capabilities</span>
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>SYSTEMS: ONLINE</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span>UPTIME: 99.9%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              className="group relative"
              variants={itemVariant}
            >
              {/* Terminal Card */}
              <div className="relative h-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-500">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    MOD_{String(index + 1).padStart(2, '0')} :: {group.category.toUpperCase().replace(/\s+/g, '_')}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-5">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded bg-white/5 text-zinc-300 group-hover/skill:text-primary transition-colors">
                            <skill.icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm text-zinc-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-primary/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          READY
                        </span>
                      </div>

                      {/* Decorative Progress Line */}
                      <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary/50 to-purple-500/50"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
