export const projects = [
    {
        title: "Open Narrative",
        slug: "open-narrative",
        description: "Plataforma SaaS que utiliza modelos avanzados de AI para transformar texto generado automáticamente en una narrativa más natural, clara y atractiva.",
        longDescription: "Open Narrative responde a la necesidad de mejorar la calidad editorial del contenido generado con AI. El producto ayuda a creadores y equipos de marketing a refinar tono, ritmo y naturalidad sin perder la intención original.",
        challenges: [
            "Detectar patrones repetitivos en la salida de modelos de lenguaje.",
            "Mantener la intención y precisión del texto durante la reescritura.",
            "Escalar el procesamiento para usuarios de alto volumen sin elevar la latencia."
        ],
        solutions: [
            "Implementé una pipeline de varias etapas para analizar y refinar el contenido.",
            "Desarrollé una métrica de naturalidad con retroalimentación en tiempo real.",
            "Diseñé un sistema de colas serverless sobre Supabase Edge Functions."
        ],
        results: "La arquitectura permitió procesar grandes volúmenes de texto durante la beta manteniendo una experiencia rápida y consistente.",
        technologies: ["Next.js", "OpenAI API", "Stripe", "Supabase", "Tailwind CSS"],
        image: "/images/opennarrative.png",
        github: "https://github.com/pascal1010100",
        demo: "https://opennarrative.co/",
        featured: true,
        category: "AI SaaS"
    },
    {
        title: "Hostales Mandalas",
        slug: "hostales-mandalas",
        description: "Ecosistema digital para hospitalidad que centraliza reservas, disponibilidad, pagos y comunicación con huéspedes.",
        longDescription: "Hostales Mandalas necesitaba una solución propia para gestionar dormitorios y habitaciones privadas, reducir dependencia de intermediarios y fortalecer las reservas directas.",
        challenges: [
            "Sincronizar disponibilidad en tiempo real para evitar reservas duplicadas.",
            "Resolver reglas distintas para inventario por cama y por habitación.",
            "Integrar métodos de pago locales en una experiencia sencilla."
        ],
        solutions: [
            "Construí un motor de disponibilidad en tiempo real con PostgreSQL y Row Level Security.",
            "Creé un panel administrativo para check-ins, reservas y operación interna.",
            "Integré mapas interactivos para facilitar la llegada de los huéspedes."
        ],
        results: "La plataforma fortaleció el canal de reserva directa y redujo trabajo administrativo mediante confirmaciones automatizadas.",
        technologies: ["Next.js", "Supabase", "Real-time", "PostgreSQL", "Google Maps API"],
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/hostales-mandalas",
        demo: "https://mandalas-sigma.vercel.app/",
        featured: true,
        category: "Plataforma hotelera"
    },
    {
        title: "Nomad Guide AI",
        slug: "nomad-guide",
        description: "Guía para nómadas digitales que combina mapas interactivos con un asistente de AI contextual basado en RAG.",
        longDescription: "Nomad Guide AI ayuda a encontrar espacios de trabajo con conectividad y condiciones confiables al combinar información geográfica, reseñas y respuestas contextualizadas.",
        challenges: [
            "Unificar información dispersa de distintas fuentes geográficas.",
            "Generar respuestas relevantes según ubicación y necesidades específicas.",
            "Mantener funciones útiles con conectividad limitada."
        ],
        solutions: [
            "Construí una pipeline RAG para consultar una base vectorial de reseñas.",
            "Implementé capacidades PWA para acceso con conectividad limitada.",
            "Utilicé Mapbox para mapas interactivos personalizados y eficientes."
        ],
        results: "La beta validó que combinar búsqueda geográfica y AI reduce la fricción al comparar espacios de trabajo.",
        technologies: ["RAG AI", "Mapbox", "PWA", "React", "Node.js"],
        image: "/images/nomadguide.png",
        github: "https://github.com/pascal1010100/nomad-guide",
        demo: "https://nomada-fantasma.vercel.app",
        featured: true,
        category: "AI y geolocalización"
    }
]
