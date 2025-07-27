"use client"

import type React from "react"

import { useState } from "react"
import {
  Send,
  Upload,
  Briefcase,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  Github,
  ExternalLink,
} from "lucide-react"
import { SectionContainer } from "./ui/section-container"

interface FormData {
  // Información personal
  name: string
  email: string
  company: string
  phone: string

  // Detalles del proyecto
  projectType: string
  budget: string
  timeline: string
  description: string
  goals: string

  // Archivos y referencias
  files: File[]
  references: string
}

interface FormErrors {
  [key: string]: string
}

const projectTypes = [
  { id: "web-app", name: "Aplicación Web", icon: "💻", description: "Desarrollo de aplicaciones web modernas" },
  { id: "ecommerce", name: "E-commerce", icon: "🛒", description: "Tiendas online y plataformas de venta" },
  { id: "landing", name: "Landing Page", icon: "🎯", description: "Páginas de aterrizaje optimizadas" },
  { id: "blog", name: "Blog/CMS", icon: "📝", description: "Sistemas de gestión de contenido" },
  { id: "api", name: "API/Backend", icon: "⚙️", description: "Servicios backend y APIs" },
  { id: "mobile", name: "App Móvil", icon: "📱", description: "Aplicaciones móviles nativas" },
]

const budgetRanges = [
  { id: "small", range: "$1,000 - $5,000", icon: "💡", description: "Proyectos pequeños" },
  { id: "medium", range: "$5,000 - $15,000", icon: "🚀", description: "Proyectos medianos" },
  { id: "large", range: "$15,000 - $50,000", icon: "⭐", description: "Proyectos grandes" },
  { id: "enterprise", range: "$50,000+", icon: "🏢", description: "Proyectos empresariales" },
]

const timelineOptions = [
  { id: "urgent", time: "1-2 semanas", icon: "⚡", description: "Urgente" },
  { id: "fast", time: "1 mes", icon: "🏃", description: "Rápido" },
  { id: "normal", time: "2-3 meses", icon: "📅", description: "Normal" },
  { id: "flexible", time: "3+ meses", icon: "🎯", description: "Flexible" },
]

export function ContactSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    goals: "",
    files: [],
    references: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const totalSteps = 4

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
        break
      case 2:
        if (!formData.projectType) newErrors.projectType = "Selecciona un tipo de proyecto"
        break
      case 3:
        if (!formData.budget) newErrors.budget = "Selecciona un rango de presupuesto"
        if (!formData.timeline) newErrors.timeline = "Selecciona un timeline"
        break
      case 4:
        if (!formData.description.trim()) newErrors.description = "La descripción es requerida"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  if (isSubmitted) {
    return (
      <SectionContainer id="contact" className="bg-slate-50 dark:bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-background rounded-2xl p-12 border border-slate-200 dark:border-border shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-foreground mb-4">¡Propuesta Enviada!</h2>
            <p className="text-slate-600 dark:text-foreground-muted text-lg mb-8">
              Gracias por confiar en mí. He recibido tu propuesta y me pondré en contacto contigo dentro de las próximas
              24 horas.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <Clock className="w-8 h-8 text-slate-600 dark:text-accent-purple mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-foreground mb-1">Respuesta rápida</h3>
                <p className="text-sm text-slate-500 dark:text-foreground-muted">Dentro de 24 horas</p>
              </div>
              <div className="p-4">
                <Star className="w-8 h-8 text-slate-600 dark:text-accent-cyan mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-foreground mb-1">Propuesta detallada</h3>
                <p className="text-sm text-slate-500 dark:text-foreground-muted">Plan completo del proyecto</p>
              </div>
              <div className="p-4">
                <Briefcase className="w-8 h-8 text-slate-600 dark:text-accent-purple mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-foreground mb-1">Inicio inmediato</h3>
                <p className="text-sm text-slate-500 dark:text-foreground-muted">Comenzamos cuando estés listo</p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer id="contact" className="bg-slate-50 dark:bg-background-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-foreground mb-4">
            Trabajemos{" "}
            <span className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan bg-clip-text text-transparent">
              Juntos
            </span>
          </h2>
          <p className="text-slate-600 dark:text-foreground-muted text-lg max-w-2xl mx-auto">
            Cuéntame sobre tu proyecto y creemos algo extraordinario. Un proceso simple y profesional para comenzar
            nuestra colaboración.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Información y beneficios */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-background rounded-2xl p-6 border border-slate-200 dark:border-border">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground mb-4">¿Por qué elegirme?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-slate-600 dark:text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-foreground">Experiencia comprobada</h4>
                    <p className="text-sm text-slate-500 dark:text-foreground-muted">
                      5+ años desarrollando soluciones web modernas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-foreground">Entregas puntuales</h4>
                    <p className="text-sm text-slate-500 dark:text-foreground-muted">
                      100% de proyectos entregados a tiempo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-slate-600 dark:text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-foreground">Calidad premium</h4>
                    <p className="text-sm text-slate-500 dark:text-foreground-muted">
                      Código limpio y optimizado para el futuro
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-background rounded-2xl p-6 border border-slate-200 dark:border-border">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground mb-4">Conecta conmigo</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/pascal1010100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-background-secondary/50 transition-colors group"
                >
                  <Github className="w-5 h-5 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-purple transition-colors" />
                  <div>
                    <span className="text-sm font-medium text-slate-900 dark:text-foreground">GitHub</span>
                    <p className="text-xs text-slate-500 dark:text-foreground-muted">pascal1010100</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 dark:text-foreground-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://pascal.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-background-secondary/50 transition-colors group"
                >
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-slate-500 to-slate-700 dark:from-accent-purple dark:to-accent-cyan flex items-center justify-center">
                    <span className="text-xs font-bold text-white">P</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900 dark:text-foreground">Blog</span>
                    <p className="text-xs text-slate-500 dark:text-foreground-muted">pascal.dev</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 dark:text-foreground-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="mailto:pascal@pascal.dev"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-background-secondary/50 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-slate-500 dark:text-foreground-muted group-hover:text-slate-700 dark:group-hover:text-accent-cyan transition-colors" />
                  <div>
                    <span className="text-sm font-medium text-slate-900 dark:text-foreground">Email</span>
                    <p className="text-xs text-slate-500 dark:text-foreground-muted">pascal@pascal.dev</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-background rounded-2xl p-6 border border-slate-200 dark:border-border">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground mb-4">Proceso de trabajo</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-600 dark:bg-accent-purple text-white text-xs flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-sm text-slate-500 dark:text-foreground-muted">Análisis y planificación</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 dark:bg-accent-cyan text-white text-xs flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-sm text-slate-500 dark:text-foreground-muted">Diseño y prototipado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-600 dark:bg-accent-purple text-white text-xs flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="text-sm text-slate-500 dark:text-foreground-muted">Desarrollo y testing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 dark:bg-accent-cyan text-white text-xs flex items-center justify-center font-bold">
                    4
                  </div>
                  <span className="text-sm text-slate-500 dark:text-foreground-muted">Lanzamiento y soporte</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-background rounded-2xl p-8 border border-slate-200 dark:border-border shadow-lg">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-foreground">
                    Paso {currentStep} de {totalSteps}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-foreground-muted">
                    {Math.round((currentStep / totalSteps) * 100)}% completado
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-border rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Información personal */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-2">
                      Información personal
                    </h3>
                    <p className="text-slate-600 dark:text-foreground-muted">Comencemos conociéndonos mejor</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                        Nombre completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-foreground-muted" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors ${
                            errors.name
                              ? "border-red-500"
                              : "border-slate-300 dark:border-border focus:border-slate-500 dark:focus:border-accent-purple"
                          }`}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-foreground-muted" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors ${
                            errors.email
                              ? "border-red-500"
                              : "border-slate-300 dark:border-border focus:border-slate-500 dark:focus:border-accent-purple"
                          }`}
                          placeholder="tu@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                        Empresa/Organización
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-foreground-muted" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:border-slate-500 dark:focus:border-accent-purple focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:border-slate-500 dark:focus:border-accent-purple focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Tipo de proyecto */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-2">Tipo de proyecto</h3>
                    <p className="text-slate-600 dark:text-foreground-muted">¿Qué tipo de proyecto tienes en mente?</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData((prev) => ({ ...prev, projectType: type.id }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                          formData.projectType === type.id
                            ? "border-slate-500 dark:border-accent-purple bg-slate-100 dark:bg-accent-purple/10"
                            : "border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-foreground">{type.name}</h4>
                            <p className="text-sm text-slate-500 dark:text-foreground-muted">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType}</p>}
                </div>
              )}

              {/* Step 3: Presupuesto y timeline */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-2">
                      Presupuesto y timeline
                    </h3>
                    <p className="text-slate-600 dark:text-foreground-muted">
                      Ayúdame a entender el alcance de tu proyecto
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">
                      Rango de presupuesto
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {budgetRanges.map((budget) => (
                        <button
                          key={budget.id}
                          onClick={() => setFormData((prev) => ({ ...prev, budget: budget.id }))}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                            formData.budget === budget.id
                              ? "border-slate-600 dark:border-accent-cyan bg-slate-100 dark:bg-accent-cyan/10"
                              : "border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-cyan/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{budget.icon}</span>
                            <div>
                              <h5 className="font-semibold text-slate-900 dark:text-foreground">{budget.range}</h5>
                              <p className="text-sm text-slate-500 dark:text-foreground-muted">{budget.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-foreground mb-4">Timeline deseado</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {timelineOptions.map((timeline) => (
                        <button
                          key={timeline.id}
                          onClick={() => setFormData((prev) => ({ ...prev, timeline: timeline.id }))}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                            formData.timeline === timeline.id
                              ? "border-slate-500 dark:border-accent-purple bg-slate-100 dark:bg-accent-purple/10"
                              : "border-slate-200 dark:border-border hover:border-slate-400 dark:hover:border-accent-purple/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{timeline.icon}</span>
                            <div>
                              <h5 className="font-semibold text-slate-900 dark:text-foreground">{timeline.time}</h5>
                              <p className="text-sm text-slate-500 dark:text-foreground-muted">
                                {timeline.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.timeline && <p className="text-red-500 text-sm mt-2">{errors.timeline}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Detalles del proyecto */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-2">
                      Detalles del proyecto
                    </h3>
                    <p className="text-slate-600 dark:text-foreground-muted">Cuéntame más sobre tu visión</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                      Descripción del proyecto *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-foreground-muted" />
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors resize-none ${
                          errors.description
                            ? "border-red-500"
                            : "border-slate-300 dark:border-border focus:border-slate-500 dark:focus:border-accent-purple"
                        }`}
                        placeholder="Describe tu proyecto, funcionalidades principales, audiencia objetivo..."
                      />
                    </div>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                      Objetivos y metas
                    </label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:border-slate-500 dark:focus:border-accent-purple focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors resize-none"
                      placeholder="¿Qué esperas lograr con este proyecto? ¿Cuáles son tus KPIs?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                      Referencias o inspiración
                    </label>
                    <input
                      type="text"
                      value={formData.references}
                      onChange={(e) => setFormData((prev) => ({ ...prev, references: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-background text-slate-900 dark:text-foreground placeholder-slate-400 dark:placeholder-foreground-muted focus:border-slate-500 dark:focus:border-accent-purple focus:ring-2 focus:ring-slate-500 dark:focus:ring-accent-purple transition-colors"
                      placeholder="URLs de sitios que te inspiran o referencias visuales"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-foreground mb-2">
                      Archivos adjuntos
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-border rounded-lg p-6 text-center hover:border-slate-400 dark:hover:border-accent-purple/50 transition-colors">
                      <Upload className="w-8 h-8 text-slate-400 dark:text-foreground-muted mx-auto mb-2" />
                      <p className="text-slate-500 dark:text-foreground-muted mb-2">
                        Arrastra archivos aquí o haz clic para seleccionar
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-4 py-2 bg-slate-200 dark:bg-accent-purple/10 text-slate-700 dark:text-accent-purple rounded-lg cursor-pointer hover:bg-slate-300 dark:hover:bg-accent-purple/20 transition-colors"
                      >
                        Seleccionar archivos
                      </label>
                      <p className="text-xs text-slate-400 dark:text-foreground-muted mt-2">
                        PDF, DOC, PNG, JPG (máx. 10MB cada uno)
                      </p>
                    </div>

                    {formData.files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-slate-100 dark:bg-background-secondary rounded-lg"
                          >
                            <span className="text-sm text-slate-900 dark:text-foreground">{file.name}</span>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-border">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-slate-300 dark:border-border text-slate-700 dark:text-foreground rounded-lg hover:bg-slate-100 dark:hover:bg-background-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan text-white font-medium rounded-lg hover:shadow-lg hover:shadow-slate-500/25 dark:hover:shadow-accent-purple/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-800 dark:from-accent-purple dark:to-accent-cyan text-white font-medium rounded-lg hover:shadow-lg hover:shadow-slate-500/25 dark:hover:shadow-accent-purple/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar propuesta</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
