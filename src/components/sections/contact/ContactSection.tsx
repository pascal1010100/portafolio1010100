"use client"

import { useState } from "react"
import { MessageCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/button"

type FormState = {
  name: string
  project: string
  message: string
}

const whatsappNumber = "50242900009"

const responseExpectations = [
  "Lectura inicial del reto",
  "Siguiente paso recomendado",
  "Rango de alcance si hay fit",
]

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    project: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const details = [
      `Nombre: ${form.name.trim()}`,
      form.project.trim() ? `Producto o reto: ${form.project.trim()}` : "",
    ].filter(Boolean)

    const message = [
      "Hola Pascal, vi tu portafolio y me gustaría conversar sobre un proyecto.",
      "",
      ...details,
      "",
      "Contexto:",
      form.message.trim(),
    ].join("\n")

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <SectionContainer id="contact" className="py-20 sm:py-28">
      <SectionHeader
        subtitle="05 — Iniciar un proyecto"
        title="Convirtamos una idea o sistema existente en una hoja de ruta clara"
        description="Cuéntame qué quieres construir, qué proceso necesita mejorar o qué producto debe evolucionar. Prepararemos el contexto y abriremos una conversación directa por WhatsApp."
      />

      <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7 border-b border-white/10 bg-white/[0.012] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-cyan-100/75">Agenda abierta · Respuesta en 24–48 h</p>
            <h3 className="text-2xl font-semibold text-white">Diagnóstico antes de construir</h3>
            <p className="leading-7 text-white/50">
              Mejor encaje: fundadores, equipos pequeños y negocios que valoran claridad, diseño cuidado y una ejecución técnica responsable.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/75">
              <Sparkles className="h-4 w-4 text-cyan-100/70" aria-hidden="true" />
              Qué recibirás primero
            </div>
            <ul className="space-y-3 text-sm text-white/48">
              {responseExpectations.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-100/65" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 border-t border-white/10 pt-6">
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="break-words text-foreground transition-colors hover:text-primary"
              >
                +502 4290 0009
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LinkedIn</p>
              <a href="https://www.linkedin.com/in/josema-aguilar-dev" target="_blank" rel="noreferrer" className="break-words text-foreground hover:text-primary transition-colors">
                linkedin.com/in/josema-aguilar-dev
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="bg-white/[0.02] p-7 sm:p-9 lg:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Nombre"
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            />
            <InputField
              label="Producto o reto"
              id="contact-project"
              name="project"
              autoComplete="off"
              maxLength={160}
              value={form.project}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, project: e.target.value })}
            />
            <div>
              <label htmlFor="contact-message" className="mb-3 block text-sm font-medium text-muted-foreground">Contexto para el diagnóstico</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={4000}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Objetivo, problema actual, plazo, usuarios y cualquier enlace que ayude a entender la oportunidad."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <p className="mt-3 text-xs leading-5 text-white/40">
                No se enviará nada automáticamente. Podrás revisar y confirmar el mensaje dentro de WhatsApp.
              </p>
            </div>
            <Button type="submit" size="lg" className="liquid-sheen w-full justify-center bg-cyan-50 text-slate-950 hover:bg-white">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Continuar por WhatsApp
            </Button>
          </form>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/50">{label}</label>
      <input
        id={id}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        {...props}
      />
    </div>
  )
}
