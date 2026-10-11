export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  tagline: string;
  details: string;
  deliverables: string[];
  techStack: string[];
  stats: { label: string; value: string };
}

export const services: Service[] = [
  {
    id: 'web-applications',
    number: '01',
    title: 'Enterprise Web Applications',
    shortDesc: 'High-performance, fault-tolerant SaaS platforms engineered for scale, speed, and uncompromising reliability.',
    tagline: 'Zero-latency reactive frontends backed by rock-solid cloud architecture.',
    details: 'We build mission-critical digital products that handle high concurrent workloads without flinching. From multi-tenant SaaS dashboards to data-intensive financial terminals, every screen is tuned for instant interaction and composable state management.',
    deliverables: [
      'Multi-tenant SaaS Architecture',
      'Complex Real-Time State Engines',
      'Interactive Canvas & WebGL Dashboards',
      'Role-Based Security & SSO Protocols',
      'Automated CI/CD & Edge Delivery'
    ],
    techStack: ['Astro', 'TypeScript', 'Next.js', 'React', 'Web Workers', 'Node / Go'],
    stats: { label: 'Average SLA Uptime', value: '99.99%' }
  },
  {
    id: 'shopify-apps',
    number: '02',
    title: 'Shopify Plus & Custom Apps',
    shortDesc: 'Bespoke Shopify applications, high-converting headless storefronts, and deep ERP integrations.',
    tagline: 'Custom merchant ecosystems that maximize GMV and eliminate checkout friction.',
    details: 'We architect flagship Shopify Plus experiences from custom private applications and Shopify Functions to headless Storefront API implementations and high-fidelity 3D product visualizers.',
    deliverables: [
      'Shopify Functions (Discounts, Cart Validation, Shipping)',
      'Headless Storefronts via Storefront GraphQL API',
      'Bespoke Embedded Admin UI Extensions (Polaris)',
      'Multi-Currency & Internationalized Market Routing',
      'Custom ERP & 3PL Logistics Synchronization'
    ],
    techStack: ['Shopify CLI', 'Storefront GraphQL', 'Shopify Functions (Rust/Wasm)', 'Polaris', 'Hydrogen / Remix'],
    stats: { label: 'Combined GMV Managed', value: '$350M+' }
  },
  {
    id: 'wordpress-headless',
    number: '03',
    title: 'WordPress & Modern Headless CMS',
    shortDesc: 'Enterprise WordPress platforms and decoupled content graphs paired with ultra-fast modern frontends.',
    tagline: 'Empowering editorial freedom without sacrificing frontend speed or security.',
    details: 'Transform legacy WordPress installations into hardened headless content engines or hyper-optimized custom theme architectures. We liberate content teams with Gutenberg block suites while delivering sub-second edge cache hit rates.',
    deliverables: [
      'Decoupled Headless WordPress via WPGraphQL',
      'Custom Native Gutenberg Block Suites',
      'Sub-second Edge Cache Invalidation Pipelines',
      'Enterprise Hardening & Automated Backups',
      'High-Capacity Editorial Publishing Workflows'
    ],
    techStack: ['WordPress REST & WPGraphQL', 'Astro Static Regeneration', 'PHP 8.3 / Composer', 'Redis Caching', 'Cloudflare Workers'],
    stats: { label: 'Average Edge Cache Hit', value: '98.4%' }
  },
  {
    id: 'frontend-architecture',
    number: '04',
    title: 'Frontend Systems & WebGL',
    shortDesc: 'Award-winning interactive design, 60fps WebGL/Three.js atmospheres, and bulletproof design systems.',
    tagline: 'Cinematic digital brand flagships that captivate audiences and dominate benchmarks.',
    details: 'We combine artistic direction with deep systems engineering. Our interactive builds leverage custom GLSL shaders, GSAP timelines, Lenis smooth scrolling, and rigorous compositor optimization to guarantee silky 60fps on both desktop and mobile.',
    deliverables: [
      'Interactive 3D WebGL / Three.js Visualizers',
      'Scroll-Choreographed Motion Systems',
      'Accessible, Tokenized Design Systems',
      'Micro-Interactions & Fluid State Transitions',
      'Core Web Vitals Optimization (LCP < 1.2s)'
    ],
    techStack: ['Three.js', 'GLSL Shaders', 'GSAP / ScrollTrigger', 'Lenis', 'Modern CSS Variables', 'Astro View Transitions'],
    stats: { label: 'Benchmark Frame Rate', value: '60 FPS' }
  },
  {
    id: 'backend-infrastructure',
    number: '05',
    title: 'High-Scale Backend & APIs',
    shortDesc: 'Distributed microservices, real-time WebSockets, and resilient database schemas engineered for massive traffic.',
    tagline: 'Reliable computation engines engineered to absorb peak transactional spikes without breaking.',
    details: 'We build the computational engines behind heavy traffic applications. Whether designing low-latency event buses, PostgreSQL query tuning, or resilient serverless clusters, our backends maintain low latencies under extreme loads.',
    deliverables: [
      'Distributed REST, gRPC & GraphQL APIs',
      'Low-Latency WebSocket Streaming Gateways',
      'PostgreSQL / Redis Sharding & Query Tuning',
      'Event-Driven Microservices (Kafka / RabbitMQ)',
      'Automated Infrastructure as Code (Terraform / Docker)'
    ],
    techStack: ['Node.js / Bun', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS / Cloudflare Edge'],
    stats: { label: 'Peak Request Latency', value: '< 35ms' }
  },
  {
    id: 'systems-integrations',
    number: '06',
    title: 'Systems & Legacy Migration',
    shortDesc: 'Harmonious integration pipelines, legacy monolith refactoring, and automated synchronization engines.',
    tagline: 'Bridging disparate enterprise software into unified, high-efficiency data flows.',
    details: 'Organizations suffer when critical systems operate in silos. We build fault-tolerant data synchronization bridges between CRMs, ERPs, accounting engines, and custom consumer apps with complete audit logging and self-healing retries.',
    deliverables: [
      'ERP / CRM / Stripe / NetSuite Connectors',
      'Strangler-Fig Monolith-to-Microservices Migration',
      'Automated Data Reconciliation & Dead-Letter Queues',
      'Webhook Aggregators & Rate-Limiting Proxies',
      'Full End-to-End Synthetic Health Monitoring'
    ],
    techStack: ['TypeScript', 'Temporal.io', 'AWS SQS / EventBridge', 'OpenAPI / Swagger', 'Datadog'],
    stats: { label: 'Sync Pipeline Reliability', value: '99.999%' }
  }
];
