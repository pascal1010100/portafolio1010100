export const projects = [
    {
        title: "Open Narrative",
        slug: "open-narrative",
        description: "Plataforma SaaS con IA para mejorar la naturalidad y claridad de contenido generado automáticamente mediante una experiencia editorial simple.",
        longDescription: "Open Narrative responde a la necesidad de mejorar contenido generado con IA sin perder intención, tono ni precisión. El caso explora procesamiento editorial, experiencia de usuario y una base técnica preparada para flujos de alto volumen.",
        challenges: [
            "Detectar patrones repetitivos en la salida de modelos de lenguaje.",
            "Mantener la intención y precisión del texto durante la reescritura.",
            "Preparar una arquitectura capaz de evolucionar hacia procesamiento de mayor volumen."
        ],
        solutions: [
            "Se diseñó una pipeline de varias etapas para analizar y refinar contenido.",
            "Se exploró una métrica de naturalidad con retroalimentación en tiempo real.",
            "Se planteó una base serverless preparada para procesamiento asíncrono."
        ],
        results: "La beta funcional permitió validar una experiencia editorial clara para transformar texto generado con IA en contenido más natural.",
        technologies: ["Next.js", "OpenAI API", "Stripe", "Supabase", "Tailwind CSS"],
        evidence: ["Demo pública", "Repositorio base", "Beta funcional"],
        role: "Producto, UI/UX e ingeniería full-stack",
        status: "Beta funcional desplegada",
        image: "/images/opennarrative.png",
        github: "https://github.com/pascal1010100",
        demo: "https://opennarrative.co/",
        featured: true,
        category: "SaaS con IA"
    },
    {
        title: "Hostales Mandalas",
        slug: "hostales-mandalas",
        description: "Sistema web para gestión de reservas, disponibilidad y operación de hospitalidad con experiencia pública y panel operativo.",
        longDescription: "Hostales Mandalas necesitaba una solución propia para gestionar dormitorios y habitaciones privadas, reducir dependencia de intermediarios y fortalecer reservas directas. El proyecto conecta experiencia pública, administración interna y datos operativos.",
        challenges: [
            "Sincronizar disponibilidad en tiempo real para evitar reservas duplicadas.",
            "Resolver reglas distintas para inventario por cama y por habitación.",
            "Integrar métodos de pago locales en una experiencia sencilla."
        ],
        solutions: [
            "Se diseñó un modelo de disponibilidad con PostgreSQL y reglas de acceso.",
            "Se construyó un panel administrativo para check-ins, reservas y operación interna.",
            "Se integraron mapas interactivos para facilitar la llegada de huéspedes."
        ],
        results: "El prototipo avanzado desplegado muestra un flujo de reserva directa y una base operativa preparada para evolucionar con reglas reales del negocio.",
        technologies: ["Next.js", "Supabase", "Real-time", "PostgreSQL", "Google Maps API"],
        evidence: ["Demo desplegada", "Repositorio público", "Flujo de reservas visible"],
        role: "Arquitectura, base de datos e interfaz operativa",
        status: "Prototipo avanzado desplegado",
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/hostales-mandalas",
        demo: "https://mandalas-sigma.vercel.app/",
        featured: true,
        category: "Plataforma hotelera"
    },
    {
        title: "Nomad Guide AI",
        slug: "nomad-guide",
        description: "Guía para nómadas digitales que combina mapas interactivos, búsqueda contextual y asistencia con IA basada en RAG.",
        longDescription: "Nomad Guide AI explora cómo combinar información geográfica, reseñas y respuestas contextualizadas para ayudar a comparar espacios y destinos de trabajo remoto.",
        challenges: [
            "Unificar información dispersa de distintas fuentes geográficas.",
            "Generar respuestas relevantes según ubicación y necesidades específicas.",
            "Mantener funciones útiles con conectividad limitada."
        ],
        solutions: [
            "Se diseñó una pipeline RAG para consultar información contextual.",
            "Se exploraron capacidades PWA para mejorar disponibilidad de la experiencia.",
            "Se integraron mapas interactivos para comparar ubicaciones de forma visual."
        ],
        results: "La beta conceptual desplegada valida una dirección de producto donde geolocalización e IA reducen fricción al comparar espacios de trabajo.",
        technologies: ["RAG AI", "Mapbox", "PWA", "React", "Node.js"],
        evidence: ["Demo pública", "Repositorio público", "Validación conceptual"],
        role: "Producto, mapas, IA contextual y experiencia PWA",
        status: "Beta conceptual desplegada",
        image: "/images/nomadguide.png",
        github: "https://github.com/pascal1010100/nomad-guide",
        demo: "https://nomada-fantasma.vercel.app",
        featured: true,
        category: "IA y geolocalización"
    }
]
