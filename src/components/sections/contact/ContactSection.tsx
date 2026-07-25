"use client"

import { useState } from "react"
import { MessageCircle, Sparkles } from "lucide-react"
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
  "Una primera lectura de tu idea",
  "El siguiente paso que recomiendo",
  "Una estimación inicial, si puedo ayudarte",
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
      form.project.trim() ? `Proyecto o idea: ${form.project.trim()}` : "",
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
        title="Cuéntame qué quieres construir o mejorar"
        description="Comparte tu idea, el problema que quieres resolver o el producto que ya tienes. Podrás revisar el mensaje antes de enviármelo por WhatsApp."
      />

      <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          className="space-y-7 border-b border-white/10 bg-white/[0.012] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-cyan-100/75">Disponible · Respondo en 24–48 h</p>
            <h3 className="text-2xl font-semibold text-white">Primero entendemos el proyecto</h3>
            <p className="leading-7 text-white/65">
              Suelo trabajar con fundadores, equipos pequeños y negocios que buscan claridad, buen diseño y un desarrollo responsable.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/75">
              <Sparkles className="h-4 w-4 text-cyan-100/70" aria-hidden="true" />
              Qué puedes esperar de mi respuesta
            </div>
            <ul className="space-y-3 text-sm text-white/60">
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
                className="inline-flex min-h-11 items-center break-words py-2 text-foreground transition-colors hover:text-primary"
              >
                +502 4290 0009
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LinkedIn</p>
              <a href="https://www.linkedin.com/in/josema-aguilar-dev" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center break-words py-2 text-foreground transition-colors hover:text-primary">
                linkedin.com/in/josema-aguilar-dev
              </a>
            </div>
          </div>
        </div>

        <div
          className="bg-white/[0.02] p-7 sm:p-9 lg:p-10"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-describedby="contact-form-instructions"
          >
            <p id="contact-form-instructions" className="text-sm leading-6 text-white/60">
              Los campos marcados con <span aria-hidden="true">*</span>
              <span className="sr-only">asterisco</span> son obligatorios.
            </p>
            <InputField
              label="Nombre"
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              hint="Escribe al menos 2 caracteres."
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            />
            <InputField
              label="¿Qué quieres construir o mejorar?"
              id="contact-project"
              name="project"
              autoComplete="off"
              maxLength={160}
              value={form.project}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, project: e.target.value })}
            />
            <div>
              <label htmlFor="contact-message" className="mb-3 block text-sm font-medium text-muted-foreground">
                Cuéntame un poco más <span aria-hidden="true" className="text-cyan-100/75">*</span>
                <span className="sr-only"> (obligatorio)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={4000}
                aria-describedby="contact-message-hint contact-message-privacy"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-white/55 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Puedes incluir el objetivo, el problema actual, quién lo usará, el plazo y cualquier enlace que ayude a entender la idea."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <p id="contact-message-hint" className="mt-3 text-xs leading-5 text-white/65">
                Escribe al menos 10 caracteres para explicar tu idea.
              </p>
              <p id="contact-message-privacy" className="mt-2 text-xs leading-5 text-white/55">
                No se enviará nada automáticamente. Podrás revisar y confirmar el mensaje dentro de WhatsApp.
              </p>
            </div>
            <Button type="submit" size="lg" className="liquid-sheen w-full justify-center bg-cyan-50 text-[var(--observatory-graphite)] hover:bg-white">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Continuar por WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </SectionContainer>
  )
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

function InputField({ label, id, hint, required, ...props }: InputFieldProps) {
  const hintId = hint && id ? `${id}-hint` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/65">
        {label}
        {required && (
          <>
            {" "}<span aria-hidden="true" className="text-cyan-100/75">*</span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-describedby={hintId}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/55 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-xs leading-5 text-white/65">
          {hint}
        </p>
      )}
    </div>
  )
}
