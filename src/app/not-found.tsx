import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Página no encontrada | Pascal.dev",
    description: "La ruta solicitada no existe. Vuelve al inicio para explorar los proyectos y servicios de Pascal.dev.",
    robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen overflow-hidden bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[var(--observatory-graphite)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(112,170,255,0.12),transparent_28%),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:auto,120px_120px,120px_120px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="grid w-full items-end gap-12 border-y border-white/10 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-20 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/65">
              Señal 404 · Ruta no encontrada
            </p>
            <h1 className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Esta coordenada quedó fuera del mapa.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              La página no existe o cambió de ubicación. Puedes volver al inicio o continuar explorando los casos de trabajo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="liquid-sheen group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-50 px-6 py-3 text-sm font-semibold text-[var(--observatory-graphite)] transition hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                Volver al inicio
              </Link>
              <Link
                href="/projects"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.025] px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/35 hover:bg-white/[0.055] hover:text-white"
              >
                Explorar casos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="select-none text-[clamp(7rem,22vw,15rem)] font-medium leading-[0.72] tracking-[-0.04em] text-white/[0.055]" aria-hidden="true">
            404
          </p>
        </div>
      </div>
    </main>
  )
}
