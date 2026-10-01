/**
 * BUILDBYTES DATA REPOSITORY
 * 
 * Central data file containing all copy, metadata, proof-of-work items,
 * industry cards, process steps, and contact links for the BuildBytes studio landing page.
 */

export const buildbytesData = {
  brand: {
    name: "BuildBytes",
    tagline: "Software & Business Automation Studio",
    headline: "We build the automation your business is missing.",
    subline: "Software and automation for real estate, healthcare, hotels, cafes, and small businesses — local and international.",
    ctaDemoText: "Book a free demo",
    ctaProofText: "See proof of work",
  },

  scenes: [
    { id: "hero", number: "01", code: "SCENE 01 / 07", title: "TITLE SEQUENCE" },
    { id: "problem", number: "02", code: "SCENE 02 / 07", title: "THE BOTTLENECKS" },
    { id: "services", number: "03", code: "SCENE 03 / 07", title: "SERVICES & SOLUTIONS" },
    { id: "industries", number: "04", code: "SCENE 04 / 07", title: "WHO WE BUILD FOR" },
    { id: "proof", number: "05", code: "SCENE 05 / 07", title: "PROOF OF WORK" },
    { id: "process", number: "06", code: "SCENE 06 / 07", title: "HOW WE WORK" },
    { id: "contact", number: "07", code: "SCENE 07 / 07", title: "CLOSING CREDITS" },
  ],

  problem: {
    label: "Scene 02 — What's costing you time",
    headline: "Manual tasks are silent revenue leaks.",
    subline: "When your team spends hours typing updates, forwarding messages, and chasing reminders, high-value client relationships suffer.",
    points: [
      {
        code: "01",
        title: "Slow Enquiry Replies",
        description: "Prospective customer leads go cold within minutes when your team is busy, off-duty, or caught in manual triage.",
        impact: "Lost conversion opportunities to faster-responding competitors."
      },
      {
        code: "02",
        title: "Manual Booking & Reminders",
        description: "Hours wasted every single week hand-typing appointment confirmations, manual rescheduling, and chasing avoidable no-shows.",
        impact: "Empty calendar slots and lost operational hours."
      },
      {
        code: "03",
        title: "Zero Visibility into Cash Flow & Bookings",
        description: "Critical business decisions get made on guesswork because your numbers are fragmented across chat threads, paper notes, and disjointed apps.",
        impact: "Blind spots in daily revenue and delayed invoice collection."
      }
    ]
  },

  services: {
    label: "Scene 03 — Software Solutions & Services",
    headline: "From intelligent web platforms to autonomous AI pipelines.",
    subline: "We engineer production-grade software solutions: responsive web applications, high-converting e-commerce stores, data-backed SEO, autonomous workflows, and domain-specific RAG AI systems.",
    categories: ["ALL SOLUTIONS", "WEB & COMMERCE", "AI & AUTOMATIONS", "SEARCH & SEO"],
    items: [
      {
        id: "web-apps",
        category: "WEB & COMMERCE",
        type: "FULL-STACK DEVELOPMENT",
        code: "SOL // 01",
        title: "Web Applications",
        tagline: "Scalable, reactive web platforms & client portals",
        description: "Modern, high-performance web applications built with clean architecture, real-time state synchronization, role-based security, and fluid micro-interactions.",
        capabilities: [
          "Interactive React / Next.js web applications & SaaS dashboards",
          "Secure user authentication (OAuth, JWT, role-based access)",
          "Real-time data synchronization & live notification systems",
          "Responsive, mobile-first design optimized for instant loading"
        ],
        tags: ["React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "REST / GraphQL"],
        highlight: "Sub-second load times & 99.9% uptime architecture",
        icon: "Globe"
      },
      {
        id: "ecommerce",
        category: "WEB & COMMERCE",
        type: "DIGITAL COMMERCE",
        code: "SOL // 02",
        title: "E-Commerce Websites",
        tagline: "High-converting online storefronts & checkout systems",
        description: "Conversion-optimized digital storefronts engineered for lightning-quick checkout, multi-gateway payments, automatic inventory sync, and customer retention.",
        capabilities: [
          "Custom storefronts & headless e-commerce architectures",
          "Seamless payment gateway integration (Stripe, Razorpay, PayPal)",
          "Automated cart abandonment follow-ups & recovery workflows",
          "Live order tracking, automated invoicing & vendor dispatch"
        ],
        tags: ["Next.js Commerce", "Shopify / Custom", "Stripe", "Razorpay", "Webhooks"],
        highlight: "Zero-drop checkout flow engineered for conversion",
        icon: "ShoppingBag"
      },
      {
        id: "seo",
        category: "SEARCH & SEO",
        type: "SEARCH VISIBILITY",
        code: "SOL // 03",
        title: "SEO & Growth Optimization",
        tagline: "Technical search dominance & organic pipeline growth",
        description: "Data-driven technical SEO, Core Web Vitals acceleration, and semantic schema architectures that rank your business at the top of Google and AI search engines.",
        capabilities: [
          "Core Web Vitals optimization (targeting 95+ Google Lighthouse)",
          "Structured JSON-LD schema markup & rich snippets indexing",
          "Programmatic SEO architecture for high-intent long-tail keywords",
          "Technical site audits, metadata optimization & sitemap automation"
        ],
        tags: ["Core Web Vitals", "Schema.org", "Programmatic SEO", "Google Search Console", "Lighthouse 100"],
        highlight: "Top 1% technical performance for first-page search rankings",
        icon: "Search"
      },
      {
        id: "automations",
        category: "AI & AUTOMATIONS",
        type: "ZERO-TOUCH WORKFLOWS",
        code: "SOL // 04",
        title: "Autonomous Automations",
        tagline: "Event-driven background pipelines that eliminate manual labor",
        description: "Resilient autonomous pipelines that bridge your disparate software, eliminate repetitive data entry, and execute business actions 24/7 with zero human intervention.",
        capabilities: [
          "Production n8n and webhook pipeline architecture with error retries",
          "Automated multi-channel lead capture & instant CRM dispatch",
          "Headless browser automation (Playwright) for web workflows without APIs",
          "Automated invoice collection, WhatsApp/SMS alerts & nightly digests"
        ],
        tags: ["n8n", "Playwright", "Webhooks", "CRM Sync", "WhatsApp API", "Zapier"],
        highlight: "Eliminates 15–20+ hours of repetitive manual triage weekly",
        icon: "Cpu"
      },
      {
        id: "rag-applications",
        category: "AI & AUTOMATIONS",
        type: "COGNITIVE AI ENGINES",
        code: "SOL // 05",
        title: "RAG Applications",
        tagline: "Context-aware AI querying your company's proprietary data",
        description: "Retrieval-Augmented Generation (RAG) systems and domain-specific AI agents that ingest your company knowledge base, docs, and databases to deliver accurate, hallucination-free answers.",
        capabilities: [
          "Vector embeddings & semantic search pipelines (Pinecone, ChromaDB)",
          "Interactive document Q&A across PDFs, spreadsheets, and databases",
          "Domain-trained AI chatbots with guardrails & factual source citations",
          "Cognitive workflow extraction from unstructured emails and files"
        ],
        tags: ["RAG Pipelines", "Vector DBs", "OpenAI / Gemini", "LangChain", "Embeddings"],
        highlight: "Instant, source-grounded answers with zero hallucinations",
        icon: "Bot"
      },
      {
        id: "cloud-apis",
        category: "WEB & COMMERCE",
        type: "SCALABLE BACKENDS",
        code: "SOL // 06",
        title: "Custom Cloud & API Systems",
        tagline: "Serverless backends & robust integrations",
        description: "Enterprise-grade serverless cloud backends, custom REST/GraphQL APIs, and database architectures engineered to scale smoothly without maintenance overhead.",
        capabilities: [
          "AWS serverless architecture (Lambda, API Gateway, S3, Cognito)",
          "Custom API bridges connecting legacy tools to modern software",
          "Role-based security, token authorization & encrypted secrets",
          "Live health telemetry, error logging & automated backup pipelines"
        ],
        tags: ["AWS Lambda", "API Gateway", "PostgreSQL", "Docker", "Cloudflare"],
        highlight: "Event-driven scaling with zero idle server costs",
        icon: "Layers"
      }
    ]
  },

  industries: {
    label: "Scene 04 — Who we build for",
    headline: "Tailored automation engines for high-touch operations.",
    cards: [
      {
        id: "real-estate",
        code: "SECTOR 01",
        title: "Real Estate",
        tagline: "Instant lead engagement & calendar dispatch",
        features: [
          "Automated instant lead capture across web & social",
          "Immediate conversational auto-reply & triage",
          "Automated site-visit & property tour scheduling"
        ],
        highlight: "Zero dropped buyer inquiries"
      },
      {
        id: "healthcare",
        code: "SECTOR 02",
        title: "Healthcare Clinics",
        tagline: "Frictionless patient attendance & retention",
        features: [
          "Automated WhatsApp / SMS appointment reminders",
          "Gentle no-show follow-up & rebooking triggers",
          "Automated patient feedback & review requests",
        ],
        disclaimer: "Strictly operational workflows — zero private patient health data handled",
        highlight: "Dramatically lower clinic no-show rates"
      },
      {
        id: "hotels",
        code: "SECTOR 03",
        title: "Hotels & Stays",
        tagline: "24/7 guest communications & daily telemetry",
        features: [
          "Instant booking enquiry auto-reply across channels",
          "Automated post-checkout review request workflows",
          "Automated daily occupancy & revenue digests to management"
        ],
        highlight: "Hands-free guest dispatch around the clock"
      },
      {
        id: "cafes-smb",
        code: "SECTOR 04",
        title: "Cafes & Small Business",
        tagline: "Financial hygiene & streamlined order routing",
        features: [
          "Automated invoice dispatch & polite payment reminders",
          "Real-time order tracking & vendor dispatch notices",
          "Automated end-of-day cash-flow & sales digest"
        ],
        highlight: "Faster invoice collection without uncomfortable calls"
      }
    ]
  },

  proofOfWork: {
    label: "Scene 05 — What we've actually built",
    headline: "Real completed systems. Zero simulated demos.",
    subline: "We build resilient, production-tested software and autonomous pipelines designed to run 24/7 with comprehensive error handling.",
    clientNote: "Client automations follow the same process — tell us your bottleneck on a call.",
    cards: [
      {
        id: "pinterest-pipeline",
        category: "END-TO-END WORKFLOW AUTOMATION",
        title: "Automated Publishing Pipeline",
        projectRef: "Pinterest Automation System",
        description: "An n8n trigger runs every minute, reads a Google Sheets queue for rows matching the current date/time/status, sends them to an Express.js API bridge, which runs Playwright to upload the image (hosted on Cloudinary), fill in title/description/link/board/tags, and publish — then updates the sheet status (pending/posted/failed) automatically.",
        demonstrates: "End-to-end workflow automation with robust error handling and headless browser execution.",
        stack: ["n8n", "Playwright", "Cloudinary", "Express.js", "Node.js", "Google Sheets"],
        image: "/images/pinterest-automation.jpg",
        keyMetric: "100% Autonomous execution"
      },
      {
        id: "workpulse-platform",
        category: "SERVERLESS CLOUD PLATFORM",
        title: "Cloud-Native Platform Experience",
        projectRef: "WorkPulse",
        description: "An AI workforce platform built on React.js and AWS serverless (Lambda, API Gateway), with LLM workflows automating operations and AWS Cognito role-based authentication.",
        demonstrates: "Serverless architecture, decoupled microservices, and secure role-based access control.",
        stack: ["React.js", "AWS Lambda", "API Gateway", "AWS Cognito", "Amazon S3", "LLM Workflows"],
        image: "/images/workpulse.jpg",
        keyMetric: "Event-driven scale with zero idle cost"
      },
      {
        id: "ai-operations",
        category: "AUTONOMOUS AGENTS & COGNITIVE PIPELINES",
        title: "AI-Assisted Operations",
        projectRef: "Generative & Agentic Tooling",
        description: "Hands-on experience with Generative AI, Agentic AI, RAG, prompt engineering, and OpenAI/Gemini API integration, combined with no-code automation (n8n, Zapier), to automate both technical and content workflows.",
        demonstrates: "Multi-step agentic problem solving, structured LLM extraction, and context-augmented pipelines.",
        stack: ["Generative AI", "Agentic AI", "RAG", "OpenAI / Gemini APIs", "n8n", "Zapier"],
        image: "/images/buildbytes.jpg",
        keyMetric: "Cognitive workflows replacing manual review"
      }
    ]
  },

  process: {
    label: "Scene 06 — How we work",
    headline: "From manual drag to autonomous speed in 4 disciplined steps.",
    steps: [
      {
        number: "01",
        name: "Discovery Call",
        sentence: "We map your current manual bottlenecks and identify the high-impact workflows worth automating."
      },
      {
        number: "02",
        name: "Build",
        sentence: "We engineer custom autonomous pipelines using battle-tested software, n8n, and cloud infrastructure."
      },
      {
        number: "03",
        name: "Launch",
        sentence: "We deploy the automation directly into your day-to-day tools with zero disruption to your active operations."
      },
      {
        number: "04",
        name: "Support",
        sentence: "We monitor run health, handle API updates, and ensure every execution succeeds reliably."
      }
    ]
  },

  contact: {
    label: "Scene 07 — Credits",
    headline: "Ready to automate your operations?",
    subline: "Schedule a 20-minute live demonstration. We'll show you exactly where hours and revenue can be unlocked in your business.",
    email: "sutharisaimanikantavivek@gmail.com",
    phone: "+91 9505764142",
    linkedin: "https://www.linkedin.com/in/sai-manikanta-vivek-suthari-467001232",
    linkedinDisplay: "linkedin.com/in/sai-manikanta-vivek-suthari-467001232",
    instagramBuildbytes: "https://www.instagram.com/buildbytes.tech/",
    instagramBuildbytesDisplay: "@buildbytes.tech",
    instagramTinyTale: "https://www.instagram.com/tiny_talekids/",
    instagramTinyTaleDisplay: "@tiny_talekids",
    facebook: "https://www.facebook.com/profile.php?id=61592485326978",
    facebookDisplay: "BuildBytes Official",
    socials: [
      {
        name: "Instagram (BuildBytes)",
        handle: "@buildbytes.tech",
        url: "https://www.instagram.com/buildbytes.tech/",
        type: "instagram",
        color: "#E53E9C"
      },
      {
        name: "Instagram (Tiny Tale Kids)",
        handle: "@tiny_talekids",
        url: "https://www.instagram.com/tiny_talekids/",
        type: "instagram",
        color: "#E53E9C"
      },
      {
        name: "Facebook",
        handle: "BuildBytes Official",
        url: "https://www.facebook.com/profile.php?id=61592485326978",
        type: "facebook",
        color: "#4F6EF7"
      },
      {
        name: "LinkedIn",
        handle: "sai-manikanta-vivek-suthari",
        url: "https://www.linkedin.com/in/sai-manikanta-vivek-suthari-467001232",
        type: "linkedin",
        color: "#4F6EF7"
      }
    ],
    ctaDemoLink: "#contact",
    directMailtoLink: "mailto:sutharisaimanikantavivek@gmail.com?subject=BuildBytes%20Demo%20Inquiry%20-%20Automation%20Studio&body=Hi%20BuildBytes%20Team%2C%0A%0AI'd%20like%20to%20schedule%20a%20free%20demo%20to%20discuss%20automating%20our%20business%20workflows.%0A%0ABusiness%20Name%3A%20%0AIndustry%3A%20%0ACurrent%20Bottleneck%3A%20%0A%0AThanks!",
    creditsRoll: [
      { role: "AUTOMATION STUDIO", name: "BUILDBYTES" },
      { role: "FOUNDER & SOLUTIONS ARCHITECT", name: "SUTHARI SAI MANIKANTA VIVEK" },
      { role: "CORE CAPABILITIES", name: "N8N WORKFLOWS • PLAYWRIGHT • AWS SERVERLESS • AGENTIC AI" },
      { role: "CLIENT REACH", name: "LOCAL & INTERNATIONAL ENTERPRISES" },
      { role: "OPERATIONAL BASE", name: "ANDHRA PRADESH, INDIA (UTC+05:30)" }
    ]
  }
};
