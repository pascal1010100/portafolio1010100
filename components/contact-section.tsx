"use client";

import type React from "react";
import { useState } from "react";
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
} from "lucide-react";
import { SectionContainer } from "./ui/section-container";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  goals: string;
  files: File[];
  references: string;
}

interface FormErrors {
  [key: string]: string;
}

const projectTypes = [
  { id: "web-app", name: "Aplicación Web", icon: "💻", description: "Aplicaciones web modernas" },
  { id: "ecommerce", name: "E-commerce", icon: "🛒", description: "Tiendas online" },
  { id: "landing", name: "Landing Page", icon: "🎯", description: "Páginas optimizadas" },
  { id: "blog", name: "Blog/CMS", icon: "📝", description: "Sistemas de contenido" },
  { id: "api", name: "API/Backend", icon: "⚙️", description: "Servicios y APIs" },
  { id: "mobile", name: "App Móvil", icon: "📱", description: "Aplicaciones móviles" },
];

const budgetRanges = [
  { id: "small", range: "$1,000 - $5,000", icon: "💡", description: "Proyectos pequeños" },
  { id: "medium", range: "$5,000 - $15,000", icon: "🚀", description: "Proyectos medianos" },
  { id: "large", range: "$15,000 - $50,000", icon: "⭐", description: "Proyectos grandes" },
  { id: "enterprise", range: "$50,000+", icon: "🏢", description: "Proyectos empresariales" },
];

const timelineOptions = [
  { id: "urgent", time: "1-2 semanas", icon: "⚡", description: "Urgente" },
  { id: "fast", time: "1 mes", icon: "🏃", description: "Rápido" },
  { id: "normal", time: "2-3 meses", icon: "📅", description: "Normal" },
  { id: "flexible", time: "3+ meses", icon: "🎯", description: "Flexible" },
];

export function ContactSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.email.trim()) newErrors.email = "El email es requerido";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = "Selecciona un tipo de proyecto";
        break;
      case 3:
        if (!formData.budget) newErrors.budget = "Selecciona un rango de presupuesto";
        if (!formData.timeline) newErrors.timeline = "Selecciona un timeline";
        break;
      case 4:
        if (!formData.description.trim()) newErrors.description = "La descripción es requerida";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  if (isSubmitted) {
    return (
      <SectionContainer id="contact" className="bg-black dark:bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/80 rounded-2xl p-12 border border-accent-purple/30 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">¡Propuesta Enviada!</h2>
            <p className="text-foreground-muted text-lg mb-8">
              Gracias por confiar en mí. Me pondré en contacto contigo en las próximas 24 horas.
            </p>
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="contact" className="bg-black dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Trabajemos{" "}
            <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
              Juntos
            </span>
          </h2>
          <p className="text-foreground-muted text-base max-w-2xl mx-auto">
            Cuéntame sobre tu proyecto y hagamos algo épico.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Columna izquierda */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-background/60 rounded-2xl p-6 border border-accent-purple/20 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
              <h3 className="text-lg font-semibold text-foreground mb-3">¿Por qué elegirme?</h3>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent-purple" />
                  Experiencia en proyectos reales
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent-cyan" />
                  Entregas puntuales
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-purple" />
                  Código limpio y optimizado
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <div className="bg-background/60 rounded-2xl p-8 border border-accent-cyan/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
              {/* Barra de progreso */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-foreground-muted mb-1">
                  <span>Paso {currentStep} de {totalSteps}</span>
                  <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-semibold text-foreground">Información Personal</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm mb-1 text-foreground-muted">Nombre *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-accent-cyan/70" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className={`w-full pl-9 pr-3 py-2 rounded-lg bg-background border text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-accent-purple focus:outline-none ${
                            errors.name ? "border-red-500" : "border-border"
                          }`}
                          placeholder="Tu nombre"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-foreground-muted">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-accent-cyan/70" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className={`w-full pl-9 pr-3 py-2 rounded-lg bg-background border text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-accent-purple focus:outline-none ${
                            errors.email ? "border-red-500" : "border-border"
                          }`}
                          placeholder="tu@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8 pt-4 border-t border-border">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-5 py-2 border border-border text-foreground rounded-lg hover:bg-accent-purple/10 transition disabled:opacity-40"
                >
                  Anterior
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="px-7 py-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white rounded-lg hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-7 py-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white rounded-lg hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all disabled:opacity-40 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? "Enviando..." : "Enviar"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
