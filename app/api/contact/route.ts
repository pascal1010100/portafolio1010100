import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rótulos para compatibilidad con tu UI anterior (budget como índice) y actual (string)
const BUDGET_LABELS = ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

const ContactSchema = z
  .object({
    name: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    project: z.string().optional().default(""),
    budget: z.union([z.string(), z.number()]).optional().default(""),
    message: z.string().optional().default(""),
    company: z.string().optional().default(""),
    phone: z.string().optional().default(""),
    projectType: z.string().optional().default(""),
    timeline: z.string().optional().default(""),
    description: z.string().optional().default(""),
    goals: z.string().optional().default(""),
    references: z.string().optional().default(""),
  })
  .strict();

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

export async function POST(req: Request) {
  try {
    // (Opcional) Validación de origen
    const origin = req.headers.get("origin") || "";
    const allowedSite = process.env.NEXT_PUBLIC_SITE_URL;
    if (allowedSite && !origin.startsWith(allowedSite)) {
      return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
    }

    // (Opcional) Token anti POSTs desde consola
    const serverToken = process.env.CONTACT_TOKEN || "";
    if (serverToken) {
      const clientToken = req.headers.get("x-contact-token");
      if (clientToken !== serverToken) {
        return NextResponse.json({ ok: false, error: "Token inválido" }, { status: 401 });
      }
    }

    // Datos
    const raw = await req.json();
    const data = ContactSchema.parse(raw);

    // Normalización de budget
    let budgetLabel = "No indicado";
    if (typeof data.budget === "number") {
      budgetLabel = BUDGET_LABELS[data.budget] ?? "No indicado";
    } else if (typeof data.budget === "string" && data.budget.trim()) {
      budgetLabel = data.budget;
    }

    // Contenido principal
    const mainMessage = data.description?.trim() || data.message?.trim() || "";
    if (!mainMessage) {
      return NextResponse.json({ ok: false, error: "Mensaje/Descripción requerido" }, { status: 400 });
    }

    const linesPlain: string[] = [
      "Nueva propuesta desde el portafolio",
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
    ];

    const extraPlain = [
      data.company ? `Empresa: ${data.company}` : "",
      data.phone ? `Teléfono: ${data.phone}` : "",
      data.project ? `Proyecto: ${data.project}` : "",
      data.projectType ? `Tipo de proyecto: ${data.projectType}` : "",
      budgetLabel ? `Presupuesto: ${budgetLabel}` : "",
      data.timeline ? `Timeline: ${data.timeline}` : "",
      data.references ? `Referencias: ${data.references}` : "",
      data.goals ? `Objetivos: ${data.goals}` : "",
      "",
      "Mensaje:",
      mainMessage,
    ]
      .filter(Boolean)
      .join("\n");

    const plain = [linesPlain.join("\n"), extraPlain].join("\n");

    const html = `
      <div style="font-family:Inter,ui-sans-serif,system-ui;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 12px">Nueva propuesta desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${esc(data.name)}</p>
        <p><strong>Email:</strong> ${esc(data.email)}</p>
        ${data.company ? `<p><strong>Empresa:</strong> ${esc(data.company)}</p>` : ""}
        ${data.phone ? `<p><strong>Teléfono:</strong> ${esc(data.phone)}</p>` : ""}
        ${data.project ? `<p><strong>Proyecto:</strong> ${esc(data.project)}</p>` : ""}
        ${data.projectType ? `<p><strong>Tipo de proyecto:</strong> ${esc(data.projectType)}</p>` : ""}
        ${budgetLabel ? `<p><strong>Presupuesto:</strong> ${esc(budgetLabel)}</p>` : ""}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${esc(data.timeline)}</p>` : ""}
        ${data.references ? `<p><strong>Referencias:</strong> ${esc(data.references)}</p>` : ""}
        ${data.goals ? `<p><strong>Objetivos:</strong> ${esc(data.goals)}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:10px;border:1px solid #e5e7eb">${esc(mainMessage)}</pre>
      </div>
    `;

    const FROM = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const TO = process.env.CONTACT_TO || "josemanu0885@gmail.com";
    const API_KEY = process.env.RESEND_API_KEY;

    if (!API_KEY || !FROM || !TO) {
      console.error("Faltan variables de entorno para email");
      return NextResponse.json({ ok: false, error: "Servidor no configurado" }, { status: 500 });
    }

    // 👇 Instanciar Resend *aquí*, no en top-level
    const resend = new Resend(API_KEY);

    const { data: sent, error } = await resend.emails.send({
      from: `Contacto Portafolio <${FROM}>`,
      to: [TO],
      replyTo: data.email,
      subject: `Nueva propuesta de ${data.name}`,
      text: plain,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: (error as any).message || "Email provider error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: sent?.id ?? null });
  } catch (err: any) {
    console.error("Contact API error:", err?.message || err);
    if (err?.name === "ZodError") {
      return NextResponse.json({ ok: false, error: "Datos inválidos", issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "No se pudo enviar el correo." }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: true, message: "Contact endpoint" });
}
