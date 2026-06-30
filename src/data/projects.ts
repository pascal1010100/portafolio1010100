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
        description: "Experiencia web para presentar dos propiedades en San Pedro La Laguna y convertir interés en consultas directas por fechas y tipo de estadía.",
        longDescription: "Mandalas necesitaba diferenciar con claridad una propiedad social en el centro y una alternativa tranquila cerca del lago. El sitio organiza ambas experiencias, sus espacios y su propuesta de valor, y dirige al huésped hacia una consulta directa por WhatsApp.",
        challenges: [
            "Comunicar dos propiedades con personalidades distintas dentro de una sola marca.",
            "Ayudar al viajero a elegir por ubicación, ritmo y tipo de estadía.",
            "Reducir fricción entre la exploración visual y la consulta de disponibilidad."
        ],
        solutions: [
            "Se diseñó una portada comparativa que presenta ambas propiedades desde el primer viewport.",
            "Se construyeron recorridos editoriales separados para Mandalas y Hideout.",
            "Se conectaron consultas guiadas y accesos directos a WhatsApp sin simular un motor de reservas inexistente."
        ],
        results: "El sitio está publicado en dominio propio y presenta de forma verificable ambas propiedades, sus diferencias y un canal directo para consultar disponibilidad.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
        evidence: [
            { label: "Dominio de producción", source: "Sitio público", url: "https://www.mandalashostels.com/" },
            { label: "Implementación disponible", source: "Repositorio público", url: "https://github.com/pascal1010100/mandalas" },
            { label: "Consulta directa visible", source: "Sitio público", url: "https://www.mandalashostels.com/contact" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Diseño de experiencia y desarrollo web",
        status: "Sitio comercial en producción",
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/mandalas",
        demo: "https://www.mandalashostels.com/",
        featured: true,
        category: "Hospitalidad y conversión"
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
        description: "Landing comercial para experiencias de buceo de altura, estadías y transporte hacia el Lago de Atitlán.",
        longDescription: "GuateRaw Travel necesitaba sustituir una presencia básica en WordPress por una experiencia rápida y enfocada en conversión. La landing presenta paquetes, precios e inclusiones y conecta cada decisión con el checkout externo de Recurrente o una consulta directa por WhatsApp.",
        challenges: [
            "Explicar experiencias turísticas de precio alto con suficiente claridad antes de enviar al usuario a otro sitio.",
            "Distinguir lo incluido, lo que debe confirmarse y dónde termina el proceso de reserva.",
            "Lograr una presencia visual fuerte con una implementación pequeña y rápida."
        ],
        solutions: [
            "Se construyó una landing estática y ligera con Astro.",
            "Se organizó cada paquete con precio, inclusiones y llamadas a reserva específicas.",
            "Se hizo explícita la transición hacia Recurrente y se mantuvo WhatsApp como canal de aclaración."
        ],
        results: "La primera versión está desplegada, presenta tres opciones comerciales y conduce al visitante hacia reservas en Recurrente o contacto directo por WhatsApp.",
        technologies: ["Astro", "TypeScript", "SEO técnico", "Recurrente", "Vercel"],
        evidence: [
            { label: "Landing pública operativa", source: "Sitio público", url: "https://guateraw-travel.vercel.app/" },
            { label: "Reservas externas conectadas", source: "Sitio público", url: "https://guateraw-travel.vercel.app/#experiencias" },
            { label: "Implementación responsive", source: "Repositorio privado" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Estrategia de conversión, diseño y desarrollo frontend",
        status: "Primera versión desplegada",
        image: "/images/guateraw-travel.png",
        github: "",
        demo: "https://guateraw-travel.vercel.app/",
        featured: false,
        category: "Landing comercial"
    }
]
