import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rótulos para compatibilidad con tu UI anterior (budget como índice) y actual (string)
const BUDGET_LABELS = ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const ContactSchema = z
  .object({
    name: z.string().trim().min(2, "Nombre requerido").max(100, "Nombre demasiado largo"),
    email: z.string().trim().email("Email inválido").max(254, "Email demasiado largo"),
    project: z.string().trim().max(160, "Proyecto demasiado largo").optional().default(""),
    budget: z
      .union([z.string().trim().max(40), z.number().int().min(0).max(BUDGET_LABELS.length - 1)])
      .optional()
      .default(""),
    message: z.string().trim().max(4_000, "Mensaje demasiado largo").optional().default(""),
    company: z.string().trim().max(120).optional().default(""),
    phone: z.string().trim().max(40).optional().default(""),
    projectType: z.string().trim().max(80).optional().default(""),
    timeline: z.string().trim().max(80).optional().default(""),
    description: z.string().trim().max(4_000, "Descripción demasiado larga").optional().default(""),
    goals: z.string().trim().max(1_000).optional().default(""),
    references: z.string().trim().max(1_000).optional().default(""),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

function isAllowedOrigin(origin: string, allowedSite: string) {
  try {
    return new URL(origin).origin === new URL(allowedSite).origin;
  } catch {
    return false;
  }
}

function getClientKey(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || req.headers.get("x-real-ip") || "unknown";
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1_000) };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") || "";
    const allowedSite = process.env.NEXT_PUBLIC_SITE_URL;
    if (allowedSite && !isAllowedOrigin(origin, allowedSite)) {
      return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
    }

    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ ok: false, error: "Tipo de contenido no permitido" }, { status: 415 });
    }

    const contentLength = Number(req.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
    }

    // Protección de mejor esfuerzo por instancia. En producción distribuida debe
    // reemplazarse o complementarse con un rate limiter compartido en el edge/proveedor.
    const rateLimit = consumeRateLimit(getClientKey(req));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Demasiados intentos. Intenta de nuevo más tarde." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
      );
    }

    const raw = await req.json();
    if (JSON.stringify(raw).length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
    }
    const data = ContactSchema.parse(raw);

    if (data.website) {
      return NextResponse.json({ ok: true });
    }

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
      return NextResponse.json({ ok: false, error: "El servicio de correo no está disponible" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: sent?.id ?? null });
  } catch (err: unknown) {
    console.error("Contact API error:", err instanceof Error ? err.message : err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Datos inválidos", issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "No se pudo enviar el correo." }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: true, message: "Contact endpoint" });
}
