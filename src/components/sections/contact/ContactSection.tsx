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
  "An initial assessment of your idea",
  "The next step I recommend",
  "An initial estimate, if I can help",
]

export function ContactSection() {
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    name: "",
    project: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const details = [
      `Name: ${form.name.trim()}`,
      form.project.trim() ? `Project or idea: ${form.project.trim()}` : "",
    ].filter(Boolean)

    const message = [
      "Hi Pascal, I visited Pascal.dev and would like to discuss a project.",
      "",
      ...details,
      "",
      "Context:",
      form.message.trim(),
    ].join("\n")

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    const openedWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    )

    setFallbackUrl(openedWindow ? null : url)
  }

  return (
    <SectionContainer id="contact" className="py-20 sm:py-28">
      <SectionHeader
        subtitle="06 — Start a conversation"
        title="Tell me what you need to launch, improve, or simplify"
        description="Share the goal, the current problem, who will use the product, your expected timeline, and any links that provide useful context."
      />

      <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          className="space-y-7 border-b border-white/10 bg-white/[0.012] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-cyan-100/75">Independent practice · Guatemala · Remote</p>
            <h3 className="text-2xl font-semibold text-white">A direct conversation about the project</h3>
            <p className="leading-7 text-white/65">
              I work with founders, small teams, and businesses that value clarity, thoughtful design, and responsible development.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/75">
              <Sparkles className="h-4 w-4 text-cyan-100/70" aria-hidden="true" />
              What you can expect from my reply
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
              Fields marked with <span aria-hidden="true">*</span>
              <span className="sr-only">asterisk</span> are required.
            </p>
            <InputField
              label="Name"
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              hint="Enter at least 2 characters."
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            />
            <InputField
              label="What do you need help with?"
              id="contact-project"
              name="project"
              autoComplete="off"
              maxLength={160}
              value={form.project}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, project: e.target.value })}
            />
            <div>
              <label htmlFor="contact-message" className="mb-3 block text-sm font-medium text-muted-foreground">
                Tell me about the problem <span aria-hidden="true" className="text-cyan-100/75">*</span>
                <span className="sr-only"> (required)</span>
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
                placeholder="Include the goal, the current process or product, who will use it, your expected timeline, and any useful links."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <p id="contact-message-hint" className="mt-3 text-xs leading-5 text-white/65">
                Enter at least 10 characters to explain your idea.
              </p>
              <p id="contact-message-privacy" className="mt-2 text-xs leading-5 text-white/55">
                Nothing is sent automatically. You can review and confirm the message inside WhatsApp.
              </p>
            </div>
            <Button type="submit" size="lg" className="liquid-sheen w-full justify-center bg-cyan-50 text-[var(--observatory-graphite)] hover:bg-white">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Review message in WhatsApp
            </Button>
            {fallbackUrl && (
              <p role="status" className="text-sm leading-6 text-white/70">
                If WhatsApp did not open, {" "}
                <a href={fallbackUrl} target="_blank" rel="noreferrer" className="font-medium text-cyan-100 underline underline-offset-4">
                  Open the prepared message directly
                </a>.
              </p>
            )}
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
            <span className="sr-only"> (required)</span>
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
