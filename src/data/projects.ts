export const projects = [
    {
        title: "Open Narrative",
        slug: "open-narrative",
        description: "A production SaaS platform that leverages advanced AI models to refine and 'humanize' AI-generated text. It bridges the gap between raw LLM output and natural, engaging narrative.",
        longDescription: "Open Narrative addresses the growing need for high-quality, undetectable AI-generated content. As AI writing tools became ubiquitous, the need to refine their output for 'human' nuance and pass AI detection filters became critical for content creators and marketers.",
        challenges: [
            "Detecting subtle patterns in LLM output that trigger AI classifiers.",
            "Maintaining the original intent and factual accuracy while rewriting.",
            "Scaling text processing for high-volume users without latency spikes."
        ],
        solutions: [
            "Implemented a multi-stage pipeline using custom fine-tuned models.",
            "Developed a 'Human Score' algorithm to give users real-time feedback.",
            "Architected a serverless queue system on Supabase Edge Functions."
        ],
        results: "Achieved a 95% pass rate on leading AI detectors. Processed over 1 million words in the first month of beta.",
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
        description: "A comprehensive digital ecosystem for the hospitality industry, managing reservations, payments, and guest experiences directly.",
        longDescription: "Mandalas Hostal required a bespoke solution to manage their unique inventory of dorms and private rooms, moving away from expensive OTAs to a direct-booking model.",
        challenges: [
            "Synchronizing availability in real-time to prevent double bookings.",
            "Handling complex room types (per bed vs per room) logic.",
            " integrating local payment gateways for seamless transactions."
        ],
        solutions: [
            "built a real-time availability engine using PostgreSQL Row Level Security.",
            "Created a custom admin dashboard for staff to manage check-ins and housekeeping.",
            "Integrated interactive maps for guests to find the location easily."
        ],
        results: "Reduced dependency on OTAs by 40%, saving significant commission fees. Improved administrative efficiency by automating email confirmations.",
        technologies: ["Next.js", "Supabase", "Real-time", "PostgreSQL", "Google Maps API"],
        image: "/images/mandalas.png",
        github: "https://github.com/pascal1010100/hostales-mandalas",
        demo: "https://mandalas-sigma.vercel.app/",
        featured: true,
        category: "Hospitality Platform"
    },
    {
        title: "Nomad Guide AI",
        slug: "nomad-guide",
        description: "The ultimate companion for digital nomads. Integrates interactive mapping with a context-aware AI assistant (RAG).",
        longDescription: "Digital nomads often struggle to find workspaces with reliable Wi-Fi and power. Nomad Guide AI solves this by aggregating verified user reviews and analyzing them with AI.",
        challenges: [
            "Aggregating scattered data from various sources (Google Maps, Foursquare).",
            "Providing relevant answers based on user location and specific needs.",
            "Offline functionality for travelers with spotty connections."
        ],
        solutions: [
            "Built a RAG (Retrieval-Augmented Generation) pipeline to query a vector database of venue reviews.",
            "Implemented PWA features for offline map access.",
            "Used Mapbox for high-performance custom interactive maps."
        ],
        results: "Beta users reported a 50% reduction in time spent searching for workspaces. The AI assistant successfully handled complex queries like 'quiet cafes with good coffee near me'.",
        technologies: ["RAG AI", "Mapbox", "PWA", "React", "Node.js"],
        image: "/images/nomadguide.png",
        github: "https://github.com/pascal1010100/nomad-guide",
        demo: "https://nomada-fantasma.vercel.app",
        featured: true,
        category: "AI & Geo-Location"
    }
]
