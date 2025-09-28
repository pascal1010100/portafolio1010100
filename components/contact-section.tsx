"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin } from "lucide-react";
import { SectionContainer } from "./ui/section-container";

type FormState = {
  name: string;
  email: string;
  project: string;
  budget: number; // 0..3
  message: string;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof FormState, string>>;

const budgetLabels = ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

const CONTACT_TOKEN = process.env.NEXT_PUBLIC_CONTACT_TOKEN || "";

// Función para enviar el formulario a la API
async function sendContact(payload: {
  name: string;
  email: string;
  project: string;
  budget: number;
  message: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CONTACT_TOKEN ? { "x-contact-token": CONTACT_TOKEN } : {}),
    },
    body: JSON.stringify(payload),
  });

  let data: any = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok || !data?.ok) {
    const msg = data?.error || `Error ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "",
    budget: 0,
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre.";
    if (!form.email.trim()) e.email = "Ingresa tu email.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido.";
    if (!form.project.trim()) e.project = "Describe brevemente el proyecto.";
    if (!form.message.trim()) e.message = "Agrega contexto para una propuesta precisa.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setApiError(null);
    setSuccess(false);

    if (!validate()) return;
    if (form.website) return; // honeypot

    setSubmitting(true);
    try {
      await sendContact({
        name: form.name.trim(),
        email: form.email.trim(),
        project: form.project.trim(),
        budget: form.budget,
        message: form.message.trim(),
      });

      setSuccess(true);
      setForm({ name: "", email: "", project: "", budget: 0, message: "", website: "" });
    } catch (err: any) {
      setApiError(err?.message || "No pude enviar el mensaje. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const percent = (form.budget / (budgetLabels.length - 1)) * 100;

  return (
    <SectionContainer id="contact" className="py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Iniciemos una conversación
          </h2>
          <p className="mt-3 text-sm text-foreground-muted">
            Respondo en ~24h con un plan claro (alcance, tiempos y estimación).
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr,1.45fr]">
          {/* Info lateral */}
          <aside className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-7">
            <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,theme(colors.cyan.400/.18),transparent_70%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono font-semibold tracking-widest">
                <span className="text-white">{`{`}</span>
                <svg
                  className="w-5 h-5 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 2px rgba(34,211,238,.35))" }}
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span className="text-white">{`}`}</span>
                <span className="text-cyan-400">Pascal</span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-foreground">Diseño claro. Código sólido.</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                <li>• Interfaz moderna, limpia y consistente con tu marca.</li>
                <li>• Código accesible, escalable y mantenible.</li>
                <li>• Puesta en producción con buenas prácticas.</li>
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                <a
                  href="mailto:pascal@pascal.dev"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 hover:border-cyan-400/60 hover:bg-background/70 transition"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href="https://github.com/pascal1010100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 hover:border-cyan-400/60 hover:bg-background/70 transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/josema-aguilar-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 hover:border-cyan-400/60 hover:bg-background/70 transition"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>

              <p className="mt-4 text-xs text-foreground-muted">
                ¿Prefieres agenda directa? Escríbeme por email y coordinamos una llamada breve.
              </p>
            </div>
          </aside>

          {/* Formulario */}
          <main className="rounded-2xl border border-border bg-background/70 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  id="name"
                  label="Nombre *"
                  error={errors.name}
                  input={
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Tu nombre"
                      className={inputClass(errors.name)}
                      required
                    />
                  }
                />
                <Field
                  id="email"
                  label="Email *"
                  error={errors.email}
                  input={
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="tu@email.com"
                      className={inputClass(errors.email)}
                      required
                    />
                  }
                />
              </div>

              <Field
                id="project"
                label="Proyecto *"
                hint="Ej: catálogo con checkout y panel admin; o landing con captación."
                error={errors.project}
                input={
                  <input
                    id="project"
                    value={form.project}
                    onChange={(e) => setField("project", e.target.value)}
                    placeholder="¿Qué quieres construir?"
                    className={inputClass(errors.project)}
                    required
                  />
                }
              />

              {/* Presupuesto */}
              <div>
                <label className="block text-sm mb-2 text-foreground">Presupuesto estimado</label>
                <div
                  className="relative"
                  style={
                    {
                      ["--p" as any]: `${percent}%`,
                    } as React.CSSProperties
                  }
                >
                  <input
                    type="range"
                    min={0}
                    max={budgetLabels.length - 1}
                    value={form.budget}
                    onChange={(e) => setField("budget", Number(e.target.value))}
                    className="range-neon w-full"
                    aria-label="Presupuesto"
                  />
                  <div className="mt-2 text-sm text-foreground-muted text-center">
                    <span className="px-2 py-0.5 rounded-md border border-border bg-background/60">
                      {budgetLabels[form.budget]}
                    </span>
                  </div>
                </div>
              </div>

              <Field
                id="message"
                label="Mensaje *"
                hint="Objetivo, funcionalidades clave, integraciones, fechas aproximadas."
                error={errors.message}
                input={
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder="Dame el contexto para responder con una propuesta concreta."
                    className={textareaClass(errors.message)}
                    required
                  />
                }
              />

              {/* Honeypot */}
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {apiError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  {apiError}
                </div>
              )}

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-foreground-muted">
                  Respuesta estimada en 24 horas. Tu información queda entre nosotros.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan px-6 py-2.5 text-white transition hover:shadow-[0_0_10px_rgba(34,211,238,0.25)] disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {submitting ? "Enviando..." : "Solicitar propuesta"}
                </button>
              </div>

              {success && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-accent-purple/25 bg-background/80 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">¡Mensaje enviado!</p>
                    <p className="text-foreground-muted">
                      Te envié un correo con los próximos pasos. Revisa spam si no lo ves.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </main>
        </div>
      </div>

      {/* Slider styles */}
      <style jsx global>{`
        .range-neon {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          background:
            linear-gradient(90deg, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.35) var(--p), rgba(255,255,255,0.06) var(--p), rgba(255,255,255,0.06) 100%);
          border: 1px solid rgba(148, 163, 184, 0.25);
          transition: background 180ms ease;
        }
        .range-neon:focus {
          outline: none;
        }
        .range-neon::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0b1220;
          border: 2px solid rgba(34, 211, 238, 0.75);
          box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }
        .range-neon:hover::-webkit-slider-thumb {
          transform: scale(1.04);
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.10);
        }
        .range-neon:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.12);
          border-color: rgba(34, 211, 238, 0.9);
        }
        .range-neon::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0b1220;
          border: 2px solid rgba(34, 211, 238, 0.75);
          box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }
        .range-neon:hover::-moz-range-thumb {
          transform: scale(1.04);
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.10);
        }
        .range-neon:focus::-moz-range-thumb {
          box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.12);
          border-color: rgba(34, 211, 238, 0.9);
        }
      `}</style>
    </SectionContainer>
  );
}

/* ===== Helpers ===== */
function inputClass(hasError?: string) {
  return [
    "w-full rounded-lg bg-background border text-foreground placeholder-foreground-muted",
    "px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40",
    hasError ? "border-red-500" : "border-border",
  ].join(" ");
}
function textareaClass(hasError?: string) {
  return [
    "w-full rounded-lg bg-background border text-foreground placeholder-foreground-muted",
    "px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40",
    hasError ? "border-red-500" : "border-border",
  ].join(" ");
}
function Field({
  id,
  label,
  hint,
  error,
  input,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-foreground">
        {label}
      </label>
      {hint && <p className="mb-2 text-xs text-foreground-muted">{hint}</p>}
      {input}
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
