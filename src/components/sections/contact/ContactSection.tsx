"use client"

import { useState } from "react"
import { Mail, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  email: string
  project: string
  budget: string
  message: string
  website: string
}

const budgetLabels = ["< $5k", "$5k - $15k", "$15k - $50k", "> $50k"]

const responseExpectations = [
  "Lectura inicial del reto",
  "Siguiente paso recomendado",
  "Rango de alcance si hay fit",
]

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
    website: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    setSubmitting(true)
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data: { ok?: boolean; error?: string } = await res.json()

      if (data.ok) {
        setSuccess(true)
        setForm({ name: "", email: "", project: "", budget: "", message: "", website: "" })
      } else {
        setErrorMessage(data.error || "No se pudo enviar el mensaje")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("Error de red, intenta de nuevo más tarde.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionContainer id="contact" className="py-20 sm:py-28">
      <SectionHeader
        subtitle="05 — Iniciar un proyecto"
        title="Convirtamos una idea o sistema existente en una hoja de ruta clara"
        description="Cuéntanos qué quieres construir, qué proceso necesita mejorar o qué producto debe evolucionar. Pascal.dev responderá con una lectura inicial, riesgos visibles y el siguiente paso recomendado."
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
            <Mail className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-cyan-100/75">Agenda abierta · Respuesta en 24–48 h</p>
            <h3 className="text-2xl font-semibold text-white">Diagnóstico antes de construir</h3>
            <p className="leading-7 text-white/50">
              Trabajamos mejor con fundadores, equipos pequeños y negocios que valoran claridad, diseño premium y una ejecución técnica responsable.
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
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:josemanu0885@gmail.com" className="break-words text-foreground hover:text-primary transition-colors">josemanu0885@gmail.com</a>
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
          <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting}>
            <div className="grid gap-6 sm:grid-cols-2">
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
                label="Correo"
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <InputField
              label="Producto o reto"
              id="contact-project"
              name="project"
              autoComplete="off"
              maxLength={160}
              value={form.project}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, project: e.target.value })}
            />
            <fieldset>
              <legend className="mb-3 block text-sm font-medium text-muted-foreground">Inversión aproximada</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {budgetLabels.map((label) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={form.budget === label}
                    onClick={() => setForm({ ...form, budget: label })}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-sm transition",
                      form.budget === label
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/25 hover:bg-white/[0.05]"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
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
            </div>
            <input
              type="text"
              name="website"
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
            {errorMessage && (
              <p role="alert" className="text-sm text-red-400">
                {errorMessage}
              </p>
            )}
            {success && (
              <p role="status" className="text-sm text-emerald-400">
                Gracias. Tu mensaje fue enviado correctamente.
              </p>
            )}
            <Button type="submit" size="lg" className="liquid-sheen w-full justify-center bg-cyan-50 text-slate-950 hover:bg-white" disabled={submitting || success}>
              {submitting ? "Enviando..." : success ? "Mensaje enviado" : "Solicitar conversación"}
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
