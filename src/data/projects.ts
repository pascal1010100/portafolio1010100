export type ProjectEvidence = {
    label: string
    source: "Sitio público" | "Repositorio público" | "Repositorio privado"
    url?: string
}

export const projects = [
    {
        title: "Open Narrative",
        slug: "open-narrative",
        description: "Producto SaaS con IA para analizar borradores, ajustar su tono y convertir texto generado automáticamente en escritura más natural.",
        longDescription: "Open Narrative convierte un problema técnico complejo —detectar y refinar patrones de escritura generada por IA— en una experiencia editorial directa. El producto público integra un editor, análisis de contenido, humanización, cuentas y planes de acceso dentro de un flujo único.",
        challenges: [
            "Presentar análisis y transformación de texto sin convertir la experiencia en una herramienta difícil de entender.",
            "Mantener la intención del borrador mientras se ajustan tono, longitud y patrones mecánicos.",
            "Conectar la experiencia gratuita con autenticación y planes comerciales de forma clara."
        ],
        solutions: [
            "Se construyó un editor central con acciones separadas para analizar contenido y producir una versión más natural.",
            "Se diseñó una jerarquía simple alrededor del texto, el límite de palabras y el estado del procesamiento.",
            "Se integraron flujos públicos de acceso, registro y precios como parte de una experiencia SaaS coherente."
        ],
        results: "El producto está disponible públicamente con una experiencia interactiva que permite pegar texto, analizarlo y acceder al flujo de humanización desde una interfaz enfocada.",
        technologies: ["Next.js", "TypeScript", "OpenAI API", "Stripe", "Supabase"],
        evidence: [
            { label: "Producto público operativo", source: "Sitio público", url: "https://opennarrative.co/" },
            { label: "Editor interactivo visible", source: "Sitio público", url: "https://opennarrative.co/" },
            { label: "Flujos de acceso y precios", source: "Sitio público", url: "https://opennarrative.co/pricing" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Desarrollo de la aplicación y experiencia de producto",
        status: "Producto público en operación",
        image: "/images/opennarrative.png",
        github: "",
        demo: "https://opennarrative.co/",
        featured: true,
        category: "SaaS con IA"
    },
    {
        title: "Nativa Market",
        slug: "nativa-market",
        description: "Ecommerce para Guatemala con catálogo administrable, carrito, checkout, pedidos persistentes y confirmación operativa por WhatsApp.",
        longDescription: "Nativa Market necesitaba vender productos naturales sin depender de una plataforma genérica. El proyecto conecta catálogo público, búsqueda, filtros, carrito y checkout con un panel privado donde el negocio administra productos, categorías, configuración y estados de pedidos.",
        challenges: [
            "Cerrar un flujo de compra completo sin añadir una pasarela de pago innecesaria para el MVP.",
            "Mantener catálogo, disponibilidad, costos de entrega y métodos de pago configurables por el negocio.",
            "Guardar el pedido de forma confiable antes de continuar la conversación por WhatsApp."
        ],
        solutions: [
            "Se diseñó un modelo transaccional de pedidos e ítems sobre PostgreSQL y Drizzle ORM.",
            "Se construyó un panel protegido para productos, categorías, pedidos y configuración comercial.",
            "Se añadió verificación automatizada del flujo principal y smoke tests contra producción."
        ],
        results: "El MVP opera en dominio propio con catálogo real, búsqueda por categoría, carrito, checkout, pedidos guardados y entrega configurable para Guatemala.",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Drizzle ORM"],
        evidence: [
            { label: "Dominio de producción", source: "Sitio público", url: "https://www.nativamarket.net/" },
            { label: "Catálogo real operativo", source: "Sitio público", url: "https://www.nativamarket.net/#catalogo" },
            { label: "CI y smoke tests", source: "Repositorio privado" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Producto, arquitectura e ingeniería full-stack",
        status: "MVP validado en producción",
        image: "/images/nativa-market.png",
        github: "",
        demo: "https://www.nativamarket.net/",
        featured: true,
        category: "Ecommerce y operaciones"
    },
    {
        title: "Mandalas Hostal",
        slug: "mandalas-hostal",
        description: "Experiencia web y base operativa para dos propiedades, con reservas directas en Cloudbeds, analítica de conversión con PostHog y una integración PMS de solo lectura.",
        longDescription: "Mandalas necesitaba diferenciar una propiedad social en el centro y una alternativa tranquila cerca del lago sin fragmentar la marca. La evolución actual conecta cada estadía con su propio motor de reservas de Cloudbeds, mide de forma anónima la intención de reserva y contacto, y añade una capa operativa server-side para consultar inventario y reservas sin duplicar la fuente oficial del PMS.",
        challenges: [
            "Comunicar dos propiedades con personalidades distintas dentro de una sola marca.",
            "Conectar reservas y datos operativos de Cloudbeds sin exponer credenciales ni replicar información sensible.",
            "Introducir medición y automatización sin comprometer el rendimiento ni mezclar la experiencia pública con las herramientas internas."
        ],
        solutions: [
            "Se diseñó una portada comparativa que presenta ambas propiedades desde el primer viewport.",
            "Se conectó cada propiedad con su motor de reserva de Cloudbeds y se implementó un cliente server-side de solo lectura con dashboard, mapeo de habitaciones y herramientas operativas.",
            "Se combinaron Vercel Analytics y PostHog para medir visitas e intención de conversión mediante los eventos booking_intent y whatsapp_intent, sin autocaptura, perfiles personales ni grabación de sesiones; Playwright protege los recorridos públicos críticos."
        ],
        results: "El sitio continúa publicado en dominio propio, dirige cada propiedad a su reserva directa en Cloudbeds y permite medir de forma anónima qué propiedad y punto de la experiencia generan intención de reserva o contacto por WhatsApp.",
        technologies: ["Next.js 16", "TypeScript", "Cloudbeds API", "PostHog", "Vercel Analytics", "Playwright"],
        evidence: [
            { label: "Dominio de producción", source: "Sitio público", url: "https://www.mandalashostels.com/" },
            { label: "Reservas directas en Cloudbeds", source: "Sitio público", url: "https://www.mandalashostels.com/pueblo" },
            { label: "Integración Cloudbeds de solo lectura", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas/tree/main/src/infrastructure/cloudbeds" },
            { label: "Analytics y Speed Insights", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas/blob/main/src/app/layout.tsx" },
            { label: "PostHog con analítica anónima", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas/blob/main/instrumentation-client.ts" },
            { label: "Eventos de intención de conversión", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas/blob/main/src/lib/analytics.ts" },
            { label: "Smoke tests de rutas críticas", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas/blob/main/tests/e2e/public-site.spec.ts" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-07-14",
        role: "Producto, rediseño, integración Cloudbeds e ingeniería full-stack",
        status: "Sitio en producción · integración operativa en evolución",
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/mandalas",
        demo: "https://www.mandalashostels.com/",
        featured: true,
        category: "Hospitalidad y operaciones"
    },
    {
        title: "Not Your Money Laundry",
        slug: "not-your-money-laundry",
        description: "Aplicación operativa para solicitar recolección de lavandería, elegir nivel de servicio y coordinar entrega y pago en San Pedro La Laguna.",
        longDescription: "Not Your Money Laundry transforma una coordinación informal por mensajes en un recorrido guiado. El cliente define servicio, punto de recogida y cuidados; el negocio confirma ruta, cantidad y total antes de lavar y mantiene cada orden asociada a una bolsa codificada.",
        challenges: [
            "Recoger la información necesaria sin convertir la solicitud en un formulario pesado.",
            "Explicar precios variables por peso o pieza antes de conocer el total final.",
            "Conectar la solicitud digital con la operación física de bolsas, rutas y entregas."
        ],
        solutions: [
            "Se creó un flujo por pasos para servicio, recogida, cuidados y confirmación.",
            "Se diseñó un ticket legible que resume la solicitud y prepara el mensaje de WhatsApp.",
            "Se incorporó una base de pruebas unitarias y end-to-end para proteger el recorrido principal."
        ],
        results: "El MVP desplegado permite configurar una solicitud, entender el proceso completo y continuar la coordinación operativa por WhatsApp sin solicitar pago anticipado.",
        technologies: ["Next.js", "TypeScript", "Supabase", "Zod", "Playwright"],
        evidence: [
            { label: "Demo pública operativa", source: "Sitio público", url: "https://not-your-money-laundry.vercel.app/" },
            { label: "Flujo guiado funcional", source: "Sitio público", url: "https://not-your-money-laundry.vercel.app/" },
            { label: "Pruebas unitarias y E2E", source: "Repositorio privado" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Producto, UX operativa e ingeniería full-stack",
        status: "MVP desplegado",
        image: "/images/not-your-money-laundry.png",
        github: "",
        demo: "https://not-your-money-laundry.vercel.app/",
        featured: true,
        category: "Operaciones locales"
    },
    {
        title: "Nómada Fantasma",
        slug: "nomada-fantasma",
        description: "Plataforma bilingüe para explorar Guatemala mediante tours, transporte, reservas y un mapa de lugares verificados.",
        longDescription: "Nómada Fantasma organiza información que normalmente está dispersa entre mensajes, redes sociales y recomendaciones. La experiencia reúne rutas mágicas, shuttles y puntos útiles en un mapa para que el viajero pueda entender opciones y avanzar hacia una reserva.",
        challenges: [
            "Unificar experiencias, transporte y lugares útiles sin perder claridad de navegación.",
            "Presentar contenido local en español e inglés con rutas consistentes.",
            "Mantener datos geográficos y flujos de reserva verificables antes de publicar."
        ],
        solutions: [
            "Se estructuró la plataforma alrededor de tres decisiones: experiencias, transporte y mapa.",
            "Se implementó internacionalización con rutas por idioma y contenido localizado.",
            "Se añadieron pruebas, verificación de releases y una capa geográfica basada en Leaflet."
        ],
        results: "La plataforma está publicada en dominio propio con navegación bilingüe, mapa de San Pedro, catálogo de experiencias y recorridos de reserva y transporte.",
        technologies: ["Next.js", "TypeScript", "Supabase", "Leaflet", "next-intl"],
        evidence: [
            { label: "Dominio de producción", source: "Sitio público", url: "https://nomadafantasma.com/es" },
            { label: "Implementación disponible", source: "Repositorio público", url: "https://github.com/pascal1010100/nomada-fantasma" },
            { label: "Mapa y rutas bilingües", source: "Sitio público", url: "https://nomadafantasma.com/es/mapa?town=san-pedro" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Producto, arquitectura y experiencia geográfica",
        status: "Plataforma pública en evolución",
        image: "/images/nomadguide.png",
        github: "https://github.com/pascal1010100/nomada-fantasma",
        demo: "https://nomadafantasma.com/es",
        featured: false,
        category: "Turismo y geolocalización"
    },
    {
        title: "GuateRaw Travel",
        slug: "guateraw-travel",
        description: "Landing comercial en inglés para posicionar y reservar experiencias de buceo de altura, estadías y transporte en el Lago de Atitlán.",
        longDescription: "GuateRaw Travel necesitaba sustituir una presencia básica en WordPress por una experiencia rápida, enfocada en turistas internacionales y orientada a conversión. El sitio organiza el catálogo vigente de Recurrente, explica paquetes, precios e inclusiones y conecta cada decisión con la reserva externa o una consulta directa por WhatsApp.",
        challenges: [
            "Explicar experiencias turísticas de precio alto con suficiente claridad antes de enviar al usuario a Recurrente.",
            "Captar búsquedas internacionales específicas sobre altitude scuba diving y servicios alrededor del Lago de Atitlán.",
            "Mantener paquetes, precios e inclusiones alineados con la fuente comercial sin construir un motor de reservas propio."
        ],
        solutions: [
            "Se construyó una landing estática en inglés con Astro, dominio propio y una jerarquía enfocada en búsqueda y conversión.",
            "Se sincronizaron tres opciones comerciales con Recurrente y se hizo explícita la transición hacia su flujo de reserva.",
            "Se implementaron metadata social, sitemap, canonical, FAQs y datos estructurados de TravelAgency, Service, Offer y FAQPage, junto con Vercel Analytics para observar tráfico."
        ],
        results: "El sitio opera en guaterawtravel.com, presenta tres opciones comerciales verificadas y conduce al visitante hacia Recurrente o WhatsApp desde una experiencia optimizada para búsquedas sobre buceo de altura en el Lago de Atitlán.",
        technologies: ["Astro 7", "TypeScript", "Schema.org", "Vercel Analytics", "Recurrente", "Google Search Console"],
        evidence: [
            { label: "Dominio de producción", source: "Sitio público", url: "https://guaterawtravel.com/" },
            { label: "Catálogo y reservas en Recurrente", source: "Sitio público", url: "https://guaterawtravel.com/#experiencias" },
            { label: "SEO y datos estructurados", source: "Repositorio privado" },
            { label: "Vercel Analytics y metadata", source: "Repositorio privado" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-07-14",
        role: "Estrategia de conversión, diseño y desarrollo frontend",
        status: "Sitio en producción · SEO en seguimiento",
        image: "/images/guateraw-travel.png",
        github: "",
        demo: "https://guaterawtravel.com/",
        featured: false,
        category: "Landing comercial"
    }
]
