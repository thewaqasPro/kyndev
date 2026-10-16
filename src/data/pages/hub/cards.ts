// src/data/pages/hub/cards.ts

export interface HubCardItem {
  id: string;
  category: string;
  group: 'hero' | 'pages' | 'services' | 'cases';
  status: 'live' | 'prototype';
  statusLabel: string;
  title: string;
  description: string;
  tags: string[];
  route: string;
  ctaText: string;
  compact?: boolean;
}

export interface HubGroupHeader {
  group: 'hero' | 'pages' | 'services' | 'cases';
  title: string;
  badge: string;
}

export interface HubCardsData {
  groupHeaders: HubGroupHeader[];
  items: HubCardItem[];
}

export const hubCardsData: HubCardsData = {
  groupHeaders: [
    { group: 'hero', title: 'Hero Section Prototypes & Variations', badge: '2 Available Stages' },
    { group: 'pages', title: 'Flagship Core Production Pages', badge: '5 Core Routes' },
    { group: 'services', title: 'Full Service Capability Matrix', badge: '6 Specialized Disciplines' },
    { group: 'cases', title: 'Featured Case Studies & Worlds', badge: '3 Flagship Case Studies' },
  ],
  items: [
    // --- HERO PROTOTYPES ---
    {
      id: 'hero-balloons',
      category: 'Hero Prototype // 01',
      group: 'hero',
      status: 'live',
      statusLabel: 'Production Default',
      title: 'Original 3D Balloons & Jacks Hero',
      description:
        'Live flagship Three.js hero featuring rigid-body Jacks physics, sphere-sphere boundary repulsion, cursor impulse dynamics, and click-to-cycle 6-tier color palettes.',
      tags: ['Three.js', 'Jacks Physics', 'BufLoader', 'Fluid Dynamics', 'Color Cycler'],
      route: '/',
      ctaText: 'Launch Live Hero',
    },
    {
      id: 'hero-tools',
      category: 'Hero Prototype // 02',
      group: 'hero',
      status: 'prototype',
      statusLabel: 'Active Prototype',
      title: '3D Marketing Tools Physics Hero',
      description:
        'Interactive 3D performance marketing stack with branded physical badges (Google Ads, Meta, HubSpot, Klaviyo, GA4, Shopify, TikTok). Supports raycasted drag-and-toss, impulse scattering, and live HUD inspection.',
      tags: ['Interactive Physics', 'Raycaster', 'PBR Materials', 'Live HUD', 'Spring Dynamics'],
      route: '/hero-tools',
      ctaText: 'Launch 3D Tools Hero',
    },

    // --- FLAGSHIP PAGES ---
    {
      id: 'page-home',
      category: 'Flagship // Flagship Journey',
      group: 'pages',
      status: 'live',
      statusLabel: 'Live Page',
      title: 'Flagship Homepage Experience',
      description:
        'Seamless multi-section journey: 3D Jacks physics hero → interactive showreel player with modal video → 2.5D displacement featured work → 3D goal tunnels → studio conversation CTA.',
      tags: ['Flagship SPA', 'Three.js', 'Video Modal', 'Goal Tunnels', 'Audio Sync'],
      route: '/',
      ctaText: 'Explore Homepage',
    },
    {
      id: 'page-services',
      category: 'Flagship // Capability Hub',
      group: 'pages',
      status: 'live',
      statusLabel: 'Live Page',
      title: 'Services Architecture & Methodology',
      description:
        'Comprehensive studio services directory with 6 service disciplines, interactive capability cards, dedicated 4-phase delivery pipeline, and real-time 3D WebGL ambient background orb.',
      tags: ['Services Matrix', 'WebGL Orb', 'Delivery Pipeline', 'Design System'],
      route: '/services',
      ctaText: 'View Services Hub',
    },
    {
      id: 'page-projects',
      category: 'Flagship // Portfolio Index',
      group: 'pages',
      status: 'live',
      statusLabel: 'Live Page',
      title: 'Projects Portfolio & Case Studies Gallery',
      description:
        'Interactive 12-project gallery featuring 2.5D perspective displacement shaders, slot-reel text animation, dynamic category filters, and seamless page transitions.',
      tags: ['Displacement Shader', 'Slot-Reel Text', 'Case Studies', 'Filter Bar'],
      route: '/projects',
      ctaText: 'View Projects Gallery',
    },
    {
      id: 'page-about',
      category: 'Flagship // Studio Identity',
      group: 'pages',
      status: 'live',
      statusLabel: 'Live Page',
      title: 'About Studio Narrative & Credentials',
      description:
        'Creative studio identity featuring kinetic SVG wordmarks, clients infinite marquee with hover damping, 58-point starburst awards accordion, and 4-column capability matrix.',
      tags: ['Kinetic Typography', 'Infinite Marquee', 'Starburst Accordion', 'Matrix Grid'],
      route: '/about',
      ctaText: 'Read Studio Story',
    },
    {
      id: 'page-contact',
      category: 'Flagship // Lead Conversion',
      group: 'pages',
      status: 'live',
      statusLabel: 'Live Page',
      title: 'Contact & Project Inquiry Portal',
      description:
        'Multi-discipline project inquiry form with interactive service toggles, budget selector, real-time chrome liquid 3D orb scene, and studio location coordinates.',
      tags: ['Lead Form', 'Chrome Fluid 3D', 'Budget Selector', 'Studio Coordinates'],
      route: '/contact',
      ctaText: 'Open Contact Portal',
    },

    // --- SERVICES SUITE ---
    {
      id: 'service-web-dev',
      category: 'Service Showcase // 01',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'Web Development',
      description:
        'High-performing digital foundations crafted to engage, convert, and scale through custom architecture, WebGL/Three.js interactivity, and full-stack engineering.',
      tags: ['Custom Architecture', 'Full-Stack Apps', 'WebGL & Three.js', 'API Tuning'],
      route: '/services/web-development',
      ctaText: 'Inspect Web Dev',
      compact: true,
    },
    {
      id: 'service-web-design',
      category: 'Service Showcase // 02',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'Web Design & UI/UX',
      description:
        'Responsive, conversion-focused design systems crafted to elevate user experience, strengthen brand equity, and scale effortlessly as your business grows.',
      tags: ['UI/UX Design', 'Design Systems', 'Interactive Prototypes', 'Micro-Interactions'],
      route: '/services/web-design',
      ctaText: 'Inspect Web Design',
      compact: true,
    },
    {
      id: 'service-social',
      category: 'Service Showcase // 03',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'Social Media Marketing',
      description:
        'Strategic social campaigns designed to inspire, engage, and convert audiences across LinkedIn, Instagram, TikTok, and YouTube.',
      tags: ['Campaign Strategy', 'Visual Content', 'Storytelling', 'Audience Building'],
      route: '/services/social-media-marketing',
      ctaText: 'Inspect Social Media',
      compact: true,
    },
    {
      id: 'service-seo',
      category: 'Service Showcase // 04',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'Search Engine Optimization',
      description:
        'Data-driven SEO strategies that maximize organic search visibility, optimize Core Web Vitals, and build sustainable compounding customer acquisition.',
      tags: ['Technical SEO', 'Keyword Intelligence', 'Content Architecture', 'Core Web Vitals'],
      route: '/services/seo',
      ctaText: 'Inspect SEO',
      compact: true,
    },
    {
      id: 'service-funnels',
      category: 'Service Showcase // 05',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'Sales Funnels & CRO',
      description:
        'High-converting sales funnels built to transform traffic into loyal customers through rigorous A/B experimentation, funnel mapping, and analytics.',
      tags: ['CRO Optimization', 'Funnel Mapping', 'Landing Pages', 'A/B Testing'],
      route: '/services/sales-funnels',
      ctaText: 'Inspect Funnels',
      compact: true,
    },
    {
      id: 'service-ppc',
      category: 'Service Showcase // 06',
      group: 'services',
      status: 'live',
      statusLabel: 'Dedicated Route',
      title: 'PPC Advertising',
      description:
        'Performance-driven paid acquisition across Google Ads and Meta campaigns built to generate high-intent leads and maximize ROAS.',
      tags: ['Google Ads', 'Meta Campaigns', 'Retargeting Architecture', 'ROAS Scaling'],
      route: '/services/ppc-advertising',
      ctaText: 'Inspect PPC Ads',
      compact: true,
    },

    // --- CASE STUDIES ---
    {
      id: 'case-oryzo',
      category: 'Case Study // AI Brand World',
      group: 'cases',
      status: 'live',
      statusLabel: 'Case Study',
      title: 'Oryzo AI Interactive Brand Experience',
      description:
        'Immersive digital brand world with 3D cork coaster inspection viewer, custom procedural textures, and smooth scroll choreography.',
      tags: ['3D Inspection', 'Procedural Textures', 'PBR Shaders', 'Product Showcase'],
      route: '/projects/oryzo_ai',
      ctaText: 'View Case Study',
      compact: true,
    },
    {
      id: 'case-porsche',
      category: 'Case Study // Automotive',
      group: 'cases',
      status: 'live',
      statusLabel: 'Case Study',
      title: 'Porsche Dream Machine',
      description:
        'Generative 3D automotive experience celebrating bespoke Porsche engineering with real-time lighting and interactive camera maneuvers.',
      tags: ['WebGL Vehicle', 'Studio Lighting', 'Camera Splines', 'PBR Materials'],
      route: '/projects/porsche_dream_machine',
      ctaText: 'View Case Study',
      compact: true,
    },
    {
      id: 'case-devin',
      category: 'Case Study // Autonomous AI',
      group: 'cases',
      status: 'live',
      statusLabel: 'Case Study',
      title: 'Devin AI Visual Architecture',
      description:
        'High-density technical storytelling platform explaining autonomous coding agents through kinetic data visualization and interactive models.',
      tags: ['Autonomous AI', 'Data Visuals', 'Kinetic Web', 'Tech Architecture'],
      route: '/projects/devin_ai',
      ctaText: 'View Case Study',
      compact: true,
    },
  ],
};
