export type ProjectEvidence = {
    label: string
    source: "Public website" | "Public repository" | "Private repository"
    url?: string
}

export const projects = [
    {
        title: "Open Narrative",
        slug: "open-narrative",
        description: "An AI-powered SaaS product for analyzing drafts, adjusting tone, and turning automatically generated text into more natural writing.",
        longDescription: "Open Narrative turns a complex technical problem—detecting and refining patterns in AI-generated writing—into a direct editorial experience. The public product combines an editor, content analysis, humanization, accounts, and access plans in one coherent flow.",
        challenges: [
            "Present text analysis and transformation without making the experience difficult to understand.",
            "Preserve the draft's intent while adjusting tone, length, and mechanical patterns.",
            "Connect the free experience with authentication and commercial plans clearly."
        ],
        solutions: [
            "Built a central editor with separate actions for analyzing content and producing a more natural version.",
            "Designed a simple hierarchy around the text, word limit, and processing status.",
            "Integrated public access, registration, and pricing flows into a coherent SaaS experience."
        ],
        results: "The product is publicly available with an interactive experience where users can paste text, analyze it, and enter the humanization flow through a focused interface.",
        technologies: ["Next.js", "TypeScript", "OpenAI API", "Stripe", "Supabase"],
        evidence: [
            { label: "Operational public product", source: "Public website", url: "https://opennarrative.co/" },
            { label: "Interactive editor available", source: "Public website", url: "https://opennarrative.co/" },
            { label: "Access and pricing flows", source: "Public website", url: "https://opennarrative.co/pricing" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Application development and product experience",
        status: "Public product in operation",
        image: "/images/opennarrative.png",
        github: "",
        demo: "https://opennarrative.co/",
        featured: true,
        category: "AI SaaS"
    },
    {
        title: "Nativa Market",
        slug: "nativa-market",
        description: "A production ecommerce platform for Guatemala with a manageable catalogue, redesigned shopping experience, transactional orders, and product-level SEO.",
        longDescription: "Nativa Market evolved from a functional catalogue into a complete ecommerce store for natural products. The platform connects an editorial storefront with search, categories, galleries, cart, and checkout; behind it, a protected dashboard manages products, orders, payments, deliveries, and configuration without relying on a generic commerce platform.",
        challenges: [
            "Complete the purchase flow without introducing a payment gateway that was outside the validated MVP scope.",
            "Present a broad catalogue and product galleries through a clear, fast, and consistent mobile and desktop experience.",
            "Keep products and categories indexable without exposing private or transactional routes to search engines."
        ],
        solutions: [
            "Organized the system by feature on Next.js 16, React 19, PostgreSQL, Supabase, and Drizzle, with protected server-side administrative actions.",
            "The checkout recalculates totals from the database and stores each order and its items through a transactional SQL function before preparing WhatsApp confirmation.",
            "Redesigned the store with a boutique visual direction, touch carousels, complete image framing, and responsive catalogue, cart, checkout, and confirmation flows.",
            "Implemented canonicals, a dynamic sitemap, category routes, and OnlineStore, Product, Offer, and BreadcrumbList structured data, with noindex rules for private flows."
        ],
        results: "The MVP runs on its own domain with 28 active products, seven categories, two payment methods, and configurable delivery across Guatemala. The UI/UX redesign was validated on desktop and mobile; smoke tests cover ordering and production, while Search Console confirmed a valid sitemap and eligible product rich results.",
        technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Supabase", "Drizzle ORM", "Motion"],
        evidence: [
            { label: "Production store and catalogue on its own domain", source: "Public website", url: "https://www.nativamarket.net/" },
            { label: "Products and categories in the public sitemap", source: "Public website", url: "https://www.nativamarket.net/sitemap.xml" },
            { label: "Transactional checkout and admin dashboard", source: "Private repository" },
            { label: "CI and MVP/production smoke tests", source: "Private repository" },
            { label: "Verified ecommerce SEO and rich results", source: "Private repository" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-07-15",
        role: "Product, architecture, UI/UX, and full-stack engineering",
        status: "MVP in production · UI/UX and SEO redesigned",
        image: "/images/nativa-market.png",
        github: "",
        demo: "https://www.nativamarket.net/",
        featured: true,
        category: "Ecommerce and operations"
    },
    {
        title: "Mandalas Hostal",
        slug: "mandalas-hostal",
        description: "A web experience and operational foundation for two properties, with direct Cloudbeds bookings, PostHog conversion analytics, and a read-only PMS integration.",
        longDescription: "Mandalas needed to distinguish a social town-center property from a quieter lakeside alternative without fragmenting the brand. The current experience connects each stay to its Cloudbeds booking engine, measures booking and contact intent anonymously, and adds a server-side operational layer for reading inventory and reservations without duplicating the PMS source of truth.",
        challenges: [
            "Communicate two properties with distinct personalities under one brand.",
            "Connect Cloudbeds booking and operational data without exposing credentials or replicating sensitive information.",
            "Introduce measurement and automation without compromising performance or mixing the public experience with internal tools."
        ],
        solutions: [
            "Designed a comparative homepage that introduces both properties in the first viewport.",
            "Connected each property to its Cloudbeds booking engine and implemented a read-only server-side client with a dashboard, room mapping, and operational tools.",
            "Combined Vercel Analytics and PostHog to measure visits and conversion intent through booking_intent and whatsapp_intent events, without autocapture, personal profiles, or session recordings; Playwright protects critical public journeys."
        ],
        results: "The website remains live on its own domain, sends each property to its direct Cloudbeds booking flow, and anonymously measures which property and touchpoint generate booking or WhatsApp contact intent.",
        technologies: ["Next.js 16", "TypeScript", "Cloudbeds API", "PostHog", "Vercel Analytics", "Playwright"],
        evidence: [
            { label: "Production domain", source: "Public website", url: "https://www.mandalashostels.com/" },
            { label: "Direct Cloudbeds bookings", source: "Public website", url: "https://www.mandalashostels.com/pueblo" },
            { label: "Read-only Cloudbeds integration", source: "Public repository", url: "https://github.com/pascal1010100/mandalas/tree/main/src/infrastructure/cloudbeds" },
            { label: "Analytics and Speed Insights", source: "Public repository", url: "https://github.com/pascal1010100/mandalas/blob/main/src/app/layout.tsx" },
            { label: "Anonymous PostHog analytics", source: "Public repository", url: "https://github.com/pascal1010100/mandalas/blob/main/instrumentation-client.ts" },
            { label: "Conversion-intent events", source: "Public repository", url: "https://github.com/pascal1010100/mandalas/blob/main/src/lib/analytics.ts" },
            { label: "Critical-route smoke tests", source: "Public repository", url: "https://github.com/pascal1010100/mandalas/blob/main/tests/e2e/public-site.spec.ts" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-07-14",
        role: "Product, redesign, Cloudbeds integration, and full-stack engineering",
        status: "Live website · operational integration evolving",
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/mandalas",
        demo: "https://www.mandalashostels.com/",
        featured: true,
        category: "Hospitality and operations"
    },
    {
        title: "Not Your Money Laundry",
        slug: "not-your-money-laundry",
        description: "An operational application for requesting laundry pickup, selecting a service level, and coordinating delivery and payment in San Pedro La Laguna.",
        longDescription: "Not Your Money Laundry turns informal message-based coordination into a guided journey. Customers define service, pickup point, and garment care; the business confirms the route, quantity, and total before washing and keeps every order associated with a coded bag.",
        challenges: [
            "Collect the information needed without turning the request into a heavy form.",
            "Explain weight- or item-based variable pricing before the final total is known.",
            "Connect the digital request with the physical operation of bags, routes, and deliveries."
        ],
        solutions: [
            "Built a step-by-step flow for service, pickup, care instructions, and confirmation.",
            "Designed a readable ticket that summarizes the request and prepares the WhatsApp message.",
            "Added unit and end-to-end test foundations to protect the core journey."
        ],
        results: "The deployed MVP lets customers configure a request, understand the complete process, and continue operational coordination through WhatsApp without upfront payment.",
        technologies: ["Next.js", "TypeScript", "Supabase", "Zod", "Playwright"],
        evidence: [
            { label: "Operational public demo", source: "Public website", url: "https://not-your-money-laundry.vercel.app/" },
            { label: "Functional guided flow", source: "Public website", url: "https://not-your-money-laundry.vercel.app/" },
            { label: "Unit and E2E tests", source: "Private repository" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Product, operational UX, and full-stack engineering",
        status: "Deployed MVP",
        image: "/images/not-your-money-laundry.png",
        github: "",
        demo: "https://not-your-money-laundry.vercel.app/",
        featured: true,
        category: "Local operations"
    },
    {
        title: "Nómada Fantasma",
        slug: "nomada-fantasma",
        description: "A bilingual platform for exploring Guatemala through tours, transportation, bookings, and a map of verified places.",
        longDescription: "Nómada Fantasma organizes information that is usually scattered across messages, social media, and recommendations. The experience brings magical routes, shuttles, and useful places into one map so travelers can understand their options and move toward a booking.",
        challenges: [
            "Unify experiences, transportation, and useful places without losing navigational clarity.",
            "Present local content in Spanish and English through consistent routes.",
            "Keep geographic data and booking flows verifiable before publication."
        ],
        solutions: [
            "Structured the platform around three decisions: experiences, transportation, and map.",
            "Implemented internationalization with language-based routes and localized content.",
            "Added testing, release verification, and a Leaflet-based geographic layer."
        ],
        results: "The platform is live on its own domain with bilingual navigation, a San Pedro map, an experience catalogue, and booking and transportation journeys.",
        technologies: ["Next.js", "TypeScript", "Supabase", "Leaflet", "next-intl"],
        evidence: [
            { label: "Production domain", source: "Public website", url: "https://nomadafantasma.com/es" },
            { label: "Public implementation", source: "Public repository", url: "https://github.com/pascal1010100/nomada-fantasma" },
            { label: "Bilingual map and routes", source: "Public website", url: "https://nomadafantasma.com/es/mapa?town=san-pedro" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-06-30",
        role: "Product, architecture, and geographic experience",
        status: "Public platform evolving",
        image: "/images/nomadguide.png",
        github: "https://github.com/pascal1010100/nomada-fantasma",
        demo: "https://nomadafantasma.com/es",
        featured: false,
        category: "Tourism and geolocation"
    },
    {
        title: "GuateRaw Travel",
        slug: "guateraw-travel",
        description: "An English-language commercial landing page for discovering and booking high-altitude diving, stays, and transportation around Lake Atitlán.",
        longDescription: "GuateRaw Travel needed to replace a basic WordPress presence with a fast experience aimed at international travelers and focused on conversion. The website organizes the current Recurrente catalogue, explains packages, pricing, and inclusions, and connects each decision to an external booking or a direct WhatsApp inquiry.",
        challenges: [
            "Explain high-value travel experiences clearly enough before sending visitors to Recurrente.",
            "Capture specific international searches for high-altitude scuba diving and services around Lake Atitlán.",
            "Keep packages, pricing, and inclusions aligned with the commercial source without building a proprietary booking engine."
        ],
        solutions: [
            "Built a static English-language landing page with Astro, its own domain, and a hierarchy focused on search and conversion.",
            "Synchronized three commercial options with Recurrente and made the transition to its booking flow explicit.",
            "Implemented social metadata, sitemap, canonicals, FAQs, and TravelAgency, Service, Offer, and FAQPage structured data, together with Vercel Analytics for traffic observation."
        ],
        results: "The site runs on guaterawtravel.com, presents three verified commercial options, and guides visitors to Recurrente or WhatsApp through an experience optimized for high-altitude diving searches around Lake Atitlán.",
        technologies: ["Astro 7", "TypeScript", "Schema.org", "Vercel Analytics", "Recurrente", "Google Search Console"],
        evidence: [
            { label: "Production domain", source: "Public website", url: "https://guaterawtravel.com/" },
            { label: "Catalogue and bookings on Recurrente", source: "Public website", url: "https://guaterawtravel.com/#experiencias" },
            { label: "SEO and structured data", source: "Private repository" },
            { label: "Vercel Analytics and metadata", source: "Private repository" }
        ] satisfies ProjectEvidence[],
        verifiedAt: "2026-07-14",
        role: "Conversion strategy, design, and frontend development",
        status: "Live website · SEO under observation",
        image: "/images/guateraw-travel.png",
        github: "",
        demo: "https://guaterawtravel.com/",
        featured: false,
        category: "Commercial landing page"
    }
]
