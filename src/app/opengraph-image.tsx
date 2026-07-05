import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Pascal.dev — Ingeniería de producto digital"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030506",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(112,170,255,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(207,239,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Top: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#a5f3fc",
              boxShadow: "0 0 12px #a5f3fc",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            Disponible para proyectos seleccionados
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 10 }}>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Software claro para sistemas
            <br />
            que deben evolucionar.
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 640,
            }}
          >
            Producto digital, arquitectura full-stack e IA aplicada,
            respaldados por casos reales.
          </p>
        </div>

        {/* Bottom: brand + tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            pascal.dev
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {["Producto", "Full-stack", "IA aplicada"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 9999,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
