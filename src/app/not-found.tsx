import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
    title: "Página no encontrada | Pascal.dev",
    description: "La ruta solicitada no existe. Vuelve al inicio para explorar los proyectos y servicios de Pascal.dev.",
    robots: { index: false, follow: true },
}

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden text-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                {/* 404 number */}
                <div className="relative">
                    <p className="text-[150px] sm:text-[200px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-transparent font-display opacity-20 select-none">
                        404
                    </p>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-3 mb-4 text-red-500 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                            <span className="font-mono text-sm tracking-widest uppercase">Ruta no encontrada</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Página no encontrada
                        </h1>

                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            La ruta que buscas no existe o fue movida. Vuelve al inicio para explorar el trabajo disponible.
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 group bg-primary text-primary-foreground px-8 py-4 rounded-none border border-primary/20 font-mono tracking-wider uppercase hover:bg-primary/90 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                        Volver al inicio
                    </Link>
                </div>
            </div>

            {/* Decorative Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center opacity-30">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">pascal.dev — error 404</p>
            </div>
        </div>
    )
}

