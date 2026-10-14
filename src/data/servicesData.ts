// src/data/servicesData.ts

export interface ServiceCapability {
  title: string;
  description: string;
  features: string[];
}

export interface ServiceProcessStep {
  step: string;
  name: string;
  subtitle: string;
  deliverables: string[];
}

export interface ServiceRelatedProject {
  slug: string;
  title: string;
  category: string;
  image: string;
}

export interface ServiceData {
  slug: string;
  number: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  heroTagline: string;
  heroMetrics: Array<{ label: string; value: string }>;
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  deliverables: string[];
  techStack: string[];
  relatedProjects: ServiceRelatedProject[];
  nextService: {
    slug: string;
    title: string;
    number: string;
  };
}

export const servicesData: Record<string, ServiceData> = {
  'web-development': {
    slug: 'web-development',
    number: '01',
    category: 'Engineering & WebGL',
    title: 'Web Development',
    headline: 'High-Performance Web Architecture & Creative Digital Engineering',
    heroTagline: 'We build ultra-fast, visually striking digital platforms combining cutting-edge WebGL graphics with enterprise-grade stability.',
    description: 'Build a high-performing digital foundation with our web development services—crafted to engage, convert, and scale effortlessly without templates, bloat, or guesswork.',
    heroMetrics: [
      { label: 'Lighthouse Performance', value: '99+' },
      { label: 'Framerate Target', value: '60-120 FPS' },
      { label: 'Architecture', value: 'Full Stack & WebGL' },
    ],
    capabilities: [
      {
        title: 'WebGL & Three.js Experiences',
        description: 'Immersive 3D scenes, custom GLSL shaders, camera physics, and fluid interactive animations optimized for 60fps across desktop and mobile.',
        features: ['Custom GLSL Shaders', 'Three.js & WebGL2 Pipelines', 'Physics-Driven Interactions', 'Post-Processing Buffers'],
      },
      {
        title: 'Modern Full-Stack Applications',
        description: 'Scalable, reactive web platforms architected for lightning-fast latency, high concurrent traffic, and seamless multi-system integrations.',
        features: ['TypeScript & Next.js/Astro', 'Headless CMS Architecture', 'Microservices & REST/GraphQL', 'Edge Runtime Deployment'],
      },
      {
        title: 'Performance & Web Vitals Engineering',
        description: 'Aggressive asset streaming, sub-second TTFB, predictive prefetching, and optimal bundle chunking for maximum search ranking.',
        features: ['Zero Layout Shift (CLS)', 'Sub-second LCP Speeds', 'Asset Quantization', 'Off-thread Web Workers'],
      },
      {
        title: 'Custom API & Platform Integrations',
        description: 'Secure, resilient pipelines connecting your front-end with CRM, payment gateways, authentication layers, and analytics telemetry.',
        features: ['Stripe & Global Checkout', 'Automated Webhooks', 'Secure Identity & Auth', 'Real-time Event Sinks'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Discovery & System Blueprint',
        subtitle: 'Mapping data models, performance constraints, and interactive specs.',
        deliverables: ['Technical Architecture Document', 'Data Flow Diagrams', 'Performance Budget'],
      },
      {
        step: '02',
        name: 'Core Engine & 3D Prototyping',
        subtitle: 'Building the WebGL canvas, lighting environment, and foundational code.',
        deliverables: ['Live Prototype Preview', 'Shader Proof-of-Concepts', 'Asset Pipeline Setup'],
      },
      {
        step: '03',
        name: 'Full-Stack Integration',
        subtitle: 'Connecting responsive front-end components, APIs, and CMS collections.',
        deliverables: ['Fully Integrated Build', 'CMS Authoring Workflows', 'Cross-Browser Verification'],
      },
      {
        step: '04',
        name: 'Stress Testing & Global Launch',
        subtitle: 'Auditing Core Web Vitals, CDN caching, and high-concurrency throughput.',
        deliverables: ['Production Edge Deployment', 'Lighthouse Audit Report', 'Post-Launch Telemetry'],
      },
    ],
    deliverables: [
      'Production-Ready Source Codebase',
      'Custom Three.js / WebGL Scenes & Shaders',
      'Headless CMS Content Management Hub',
      'CI/CD Deployment Pipelines with Rollback',
      'Comprehensive Technical Documentation',
    ],
    techStack: ['Three.js', 'WebGL / GLSL', 'TypeScript', 'Astro / Next.js', 'Tailwind CSS', 'Vite', 'Cloudflare Edge'],
    relatedProjects: [
      {
        slug: 'oryzo_ai',
        title: 'Oryzo AI',
        category: 'WebGL & Product Experience',
        image: '/assets/projects/oryzo_ai/home.webp',
      },
      {
        slug: 'synthetic_human',
        title: 'Synthetic Human',
        category: 'Creative Engineering',
        image: '/assets/projects/synthetic_human/home.webp',
      },
      {
        slug: 'porsche_dream_machine',
        title: 'Porsche Dream Machine',
        category: '3D Configurator',
        image: '/assets/projects/porsche_dream_machine/home.webp',
      },
    ],
    nextService: {
      slug: 'web-design',
      title: 'Web Design',
      number: '02',
    },
  },

  'web-design': {
    slug: 'web-design',
    number: '02',
    category: 'Experience & Art Direction',
    title: 'Web Design',
    headline: 'Award-Winning UI/UX Design, Creative Direction & Brand Expression',
    heroTagline: 'We turn digital interfaces into emotional brand statements with bespoke typography, motion rhythm, and human-centric design systems.',
    description: 'Responsive and conversion-focused web design crafted to align with your business goals, elevate prestige, and scale effortlessly as your audience grows.',
    heroMetrics: [
      { label: 'Award-Caliber Standards', value: 'Awwwards / FWA' },
      { label: 'Design System', value: '100% Bespoke' },
      { label: 'Responsive Reach', value: '320px to 4K' },
    ],
    capabilities: [
      {
        title: 'Art Direction & Visual Identity',
        description: 'Creating unmistakable brand atmospheres with bespoke typography pairings, color physics, spatial balance, and emotive imagery.',
        features: ['Signature Typographic Hierarchies', 'Bespoke Color Space Systems', 'Brand Asset Direction', 'Editorial Visual Rhythm'],
      },
      {
        title: 'Intuitive UI/UX Design Systems',
        description: 'Component-driven Figma design libraries built for fluid handoff, reusable design tokens, and modular consistency across all touchpoints.',
        features: ['Scalable Figma Design Libraries', 'Interactive Micro-Components', 'Accessible Contrast Scoring', 'Design Token Architecture'],
      },
      {
        title: 'Motion Design & Kinetic Flow',
        description: 'Choreographing page pacing, scroll dynamics, gesture feedback, and micro-interactions that captivate users without friction.',
        features: ['Scroll-Driven Timelines', 'Tactile Hover Feedback', 'Magnetic Interactive States', 'Kinetic Layout Transitions'],
      },
      {
        title: 'Conversion UX & Friction Elimination',
        description: 'Fusing aesthetic excellence with proven cognitive UX patterns to guide user attention directly toward high-value conversions.',
        features: ['Cognitive Wireframing', 'Visual Hierarchy Mapping', 'Mobile-First Touch Architecture', 'Checkout & Funnel UX Audits'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Brand Immersion & Research',
        subtitle: 'Unpacking your market positioning, competitor blindspots, and core audience desires.',
        deliverables: ['Creative Direction Deck', 'Moodboards & Aesthetic Directions', 'Information Architecture'],
      },
      {
        step: '02',
        name: 'UX Wireframes & Spatial Layout',
        subtitle: 'Structuring content hierarchy, scroll journeys, and interaction mechanics.',
        deliverables: ['Low-Fidelity Wireframes', 'Content Priority Matrices', 'Flow Diagrams'],
      },
      {
        step: '03',
        name: 'High-Fidelity UI & Motion Design',
        subtitle: 'Crafting pixel-perfect interface screens, interactive states, and animation curves.',
        deliverables: ['Complete High-Fidelity UI Kit', 'Interactive Figma Prototype', 'Design System Library'],
      },
      {
        step: '04',
        name: 'Engineering Handoff & Quality Control',
        subtitle: 'Collaborating directly with developers to ensure 100% design fidelity in production.',
        deliverables: ['Developer Handoff Specs', 'Motion Curve Specifications', 'Production Design QA Audit'],
      },
    ],
    deliverables: [
      'Comprehensive Figma Master System',
      'Complete Responsive UI (Mobile, Tablet, Desktop)',
      'Motion Design & Animation Tokens',
      'Iconography & Vector Brand Assets',
      'Clickable Interactive Prototypes',
    ],
    techStack: ['Figma', 'After Effects', 'Spline 3D', 'Design Tokens', 'Principle', 'Adobe Creative Cloud'],
    relatedProjects: [
      {
        slug: 'spaace',
        title: 'Spaace',
        category: 'UI/UX & Creative Direction',
        image: '/assets/projects/spaace/home.webp',
      },
      {
        slug: 'worldcoin',
        title: 'Worldcoin',
        category: 'Digital Product Design',
        image: '/assets/projects/worldcoin/home.webp',
      },
      {
        slug: 'atlas_motion',
        title: 'Atlas Motion',
        category: 'Interaction Design',
        image: '/assets/projects/atlas_motion/home.webp',
      },
    ],
    nextService: {
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      number: '03',
    },
  },

  'social-media-marketing': {
    slug: 'social-media-marketing',
    number: '03',
    category: 'Growth & Influence',
    title: 'Social Media Marketing',
    headline: 'High-Impact Brand Storytelling & Viral Audience Acceleration',
    heroTagline: 'We engineer dynamic content engines and narrative campaigns that turn passive scrollers into passionate brand evangelists.',
    description: 'Strategic social media marketing designed to engage, inspire, and convert—building meaningful cultural connections with your audience at every stage of their journey.',
    heroMetrics: [
      { label: 'Organic Engagement', value: '+340% Avg' },
      { label: 'Audience Retention', value: 'Top 5%' },
      { label: 'Creative Testing Rate', value: 'Weekly Velocity' },
    ],
    capabilities: [
      {
        title: 'Content Engine & Motion Video',
        description: 'Short-form kinetic video, 3D renders, and editorial carousels engineered specifically for TikTok, Instagram Reels, and LinkedIn algorithms.',
        features: ['Short-Form Motion Reels', '3D Product Teasers', 'High-Retention Scripting', 'Platform-Native Aesthetics'],
      },
      {
        title: 'Multi-Channel Growth Strategy',
        description: 'Comprehensive roadmaps detailing posting cadences, narrative arcs, influencer alignments, and platform-specific tone of voice.',
        features: ['Editorial Calendar Architecture', 'Hashtag & Audio Trend Velocity', 'Audience Segmentation', 'Competitor Share-of-Voice Audits'],
      },
      {
        title: 'Community Activation & Social PR',
        description: 'Fostering loyal, active comment ecosystems and cultural conversations that turn followers into repeat customers.',
        features: ['Proactive Community Engagement', 'UGC Amplification Campaigns', 'Brand Voice Guidelines', 'Crisis & Reputation Management'],
      },
      {
        title: 'Social Analytics & Sentiment Tracking',
        description: 'Granular telemetry tracking saves, shares, sentiment inflection points, and direct-attribution revenue from social channels.',
        features: ['Executive Performance Dashboards', 'Attribution Modeling', 'Creative Fatigue Detection', 'Audience Demographic Mining'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Brand Voice & Cultural Audit',
        subtitle: 'Defining tone, audience psychographics, and benchmark competitors.',
        deliverables: ['Social Brand Playbook', 'Audience Persona Blueprints', 'Creative Direction Matrix'],
      },
      {
        step: '02',
        name: 'Campaign & Content Sprint',
        subtitle: 'Scripting, designing, and editing 30 to 60 days of high-velocity assets.',
        deliverables: ['Monthly Production Batch', 'Copywriting & Hook Variations', 'Ready-to-Post Asset Library'],
      },
      {
        step: '03',
        name: 'Distribution & Optimization',
        subtitle: 'Executing synchronized posting schedules with active engagement sweeps.',
        deliverables: ['Algorithmic Posting Automation', 'Influencer Seeding', 'Real-time Comment Moderation'],
      },
      {
        step: '04',
        name: 'Telemetry & Iterative Refinement',
        subtitle: 'Analyzing breakout hooks and re-engineering high-performing content formats.',
        deliverables: ['Monthly Growth Report', 'Creative Performance Scorecards', 'Next Sprint Roadmap'],
      },
    ],
    deliverables: [
      'Multi-Platform Content Strategy Playbook',
      'Batch Video Assets (Reels, TikToks, Shorts)',
      'High-Impact Graphic Carousels & Infographics',
      'Community Management & Response Protocols',
      'Bi-Weekly Performance Telemetry Dashboards',
    ],
    techStack: ['CapCut Pro', 'Premiere Pro', 'After Effects', 'Figma', 'Hootsuite', 'Sprout Social', 'Meta Business Suite'],
    relatedProjects: [
      {
        slug: 'soda_experience',
        title: 'Soda Experience',
        category: 'Viral Social Campaign',
        image: '/assets/projects/soda_experience/home.webp',
      },
      {
        slug: 'maxmara_bearings_gifts',
        title: 'Max Mara Gifts',
        category: 'Luxury Fashion Activation',
        image: '/assets/projects/maxmara_bearings_gifts/home.webp',
      },
      {
        slug: 'infinite_passerella',
        title: 'Infinite Passerella',
        category: 'Kinetic Motion Content',
        image: '/assets/projects/infinite_passerella/home.webp',
      },
    ],
    nextService: {
      slug: 'seo',
      title: 'Search Engine Optimization',
      number: '04',
    },
  },

  'seo': {
    slug: 'seo',
    number: '04',
    category: 'Visibility & Organic Dominance',
    title: 'Search Engine Optimization (SEO)',
    headline: 'Technical Architecture & High-Intent Organic Traffic Dominance',
    heroTagline: 'We turn search engines into compounding revenue channels through surgical technical SEO, content authority, and search engine architecture.',
    description: 'Data-driven SEO strategies designed to increase organic visibility, attract high-intent traffic, and drive sustainable business revenue through deep technical optimization and authority building.',
    heroMetrics: [
      { label: 'Organic Revenue Lift', value: 'Up to +280%' },
      { label: 'Page 1 Rankings', value: 'High-Intent Focus' },
      { label: 'Core Web Vitals', value: '100% Passed' },
    ],
    capabilities: [
      {
        title: 'Deep Technical SEO & Rendering',
        description: 'Optimizing server-side rendering, crawl budgets, XML schema graphs, canonical indexing, and Core Web Vitals to outrank heavy legacy sites.',
        features: ['Structured JSON-LD Schema Graphs', 'Client vs SSR Crawl Audits', 'Internal Linking Graph Optimization', 'Sub-second LCP & INP Timing'],
      },
      {
        title: 'Search Intent & Keyword Intelligence',
        description: 'Uncovering the exact high-value keywords and buyer-intent queries that drive qualified sales rather than vanity impressions.',
        features: ['Buyer-Intent Query Mining', 'Competitor Gap Analysis', 'Semantic Topical Clustering', 'Search Volume vs Difficulty Modeling'],
      },
      {
        title: 'Editorial Authority & Content Moats',
        description: 'Producing comprehensive, original content that satisfies Google E-E-A-T guidelines and naturally earns high-authority backlinks.',
        features: ['E-E-A-T Editorial Guidelines', 'Topical Authority Pillar Maps', 'Original Research & Benchmarks', 'Content Refresh Architecture'],
      },
      {
        title: 'Local & Global Search Architecture',
        description: 'Optimizing multi-regional hreflang tags, currency switches, and local map pack dominance for international and enterprise brands.',
        features: ['Multi-Region Hreflang Tags', 'Google Business Profile Domination', 'Entity SEO & Knowledge Panels', 'International Indexing Strategy'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Comprehensive Technical Audit',
        subtitle: 'Scanning 100+ technical health signals, crawl bottlenecks, and indexing errors.',
        deliverables: ['Technical Health Scorecard', 'Crawl Error Remediation List', 'Core Web Vitals Benchmark'],
      },
      {
        step: '02',
        name: 'Topical Authority Blueprint',
        subtitle: 'Mapping high-value search intent clusters and site structure hierarchies.',
        deliverables: ['Keyword Intent Master Map', 'Content Architecture Silos', 'Internal Link Graph Plan'],
      },
      {
        step: '03',
        name: 'On-Page Optimization & Schema',
        subtitle: 'Deploying custom JSON-LD schema, metadata engineering, and speed enhancements.',
        deliverables: ['Structured Data Implementation', 'Optimized Meta & Semantic Tags', 'Speed & Compression Tuning'],
      },
      {
        step: '04',
        name: 'Authority Building & Ranking Tracking',
        subtitle: 'Monitoring keyword trajectory, organic search traffic, and conversion attribution.',
        deliverables: ['Weekly Rank Tracking Dashboard', 'Competitor Movement Alerts', 'Quarterly Revenue Impact Report'],
      },
    ],
    deliverables: [
      'Complete Technical SEO Audit & Code Fixes',
      'Custom JSON-LD Structured Data Graph',
      'Targeted Keyword Authority Blueprint',
      'Editorial Guidelines for Google E-E-A-T',
      'Automated Performance & Ranking Telemetry',
    ],
    techStack: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'Schema.org', 'PageSpeed Insights'],
    relatedProjects: [
      {
        slug: 'devin_ai',
        title: 'Devin AI',
        category: 'High-Authority Tech Launch',
        image: '/assets/projects/devin_ai/home.webp',
      },
      {
        slug: 'everswap',
        title: 'EverSwap',
        category: 'Global Web Architecture',
        image: '/assets/projects/everswap/home.webp',
      },
      {
        slug: 'zero_tech',
        title: 'Zero Tech',
        category: 'Technical Foundation',
        image: '/assets/projects/zero_tech/home.webp',
      },
    ],
    nextService: {
      slug: 'sales-funnels',
      title: 'Sales Funnels',
      number: '05',
    },
  },

  'sales-funnels': {
    slug: 'sales-funnels',
    number: '05',
    category: 'Conversion & Revenue Engineering',
    title: 'Sales Funnels',
    headline: 'High-Converting Funnel Architecture & Systematic Revenue Scaling',
    heroTagline: 'We architect frictionless customer journeys that transform cold visitor traffic into high-lifetime-value loyal clients.',
    description: 'High-converting sales funnels built to transform traffic into loyal customers—driving measurable commercial growth and delivering maximum ROI through strategy, psychological design, and continuous optimization.',
    heroMetrics: [
      { label: 'Conversion Rate Lift', value: '+45-120%' },
      { label: 'Average Order Value', value: 'Optimized Upsells' },
      { label: 'A/B Test Rigor', value: 'Statistically Significant' },
    ],
    capabilities: [
      {
        title: 'Funnel Journey Mapping & Psychology',
        description: 'Designing end-to-end customer journeys tailored to user intent—eliminating decision fatigue and guiding users effortlessly to checkout.',
        features: ['Cognitive Friction Removal', 'Multi-Step Journey Flowcharts', 'Dynamic Upsell / Downsell Flows', 'Objection-Handling Section Design'],
      },
      {
        title: 'High-Converting Landing Pages',
        description: 'Bespoke landing pages built with persuasive copy hierarchy, social proof dynamics, and blazing-fast loading speeds.',
        features: ['Hero Section Hook Optimization', 'Sticky Magnetic CTAs', 'Dynamic Proof & Case Badges', 'Single-Click Accelerated Checkout'],
      },
      {
        title: 'Scientific A/B Experimentation',
        description: 'Rigorous multivariate testing across headlines, offer hooks, pricing models, and CTA placements to systematically lift conversion rates.',
        features: ['Statistical Significance Validation', 'Heatmap & Scroll Depth Analysis', 'Session Replay Diagnostic Audits', 'Continuous Iteration Cycles'],
      },
      {
        title: 'Lifecycle Email & SMS Automation',
        description: 'Automated retention and cart-recovery sequences that recapture lost revenue and maximize customer lifetime value (LTV).',
        features: ['Abandoned Checkout Recovery', 'VIP Customer Post-Purchase Flows', 'Dynamic Segment Triggering', 'High-Deliverability Infrastructure'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Funnel Economics & User Audit',
        subtitle: 'Analyzing your current cost per acquisition (CPA), dropoff points, and unit economics.',
        deliverables: ['Friction Diagnostic Report', 'Funnel Journey Blueprint', 'Unit Economics Model'],
      },
      {
        step: '02',
        name: 'Landing Page & Offer Architecture',
        subtitle: 'Writing high-converting direct response copy and crafting tailored page layouts.',
        deliverables: ['Persuasive Copywriting Deck', 'High-Fidelity Funnel UI', 'Interactive Flow Prototype'],
      },
      {
        step: '03',
        name: 'Integration & Checkout Optimization',
        subtitle: 'Connecting payment gateways, analytics tracking, and automated email sequences.',
        deliverables: ['Stripe / Payment Integration', 'Server-Side Event Tracking', 'Automated Email Automation Flows'],
      },
      {
        step: '04',
        name: 'Continuous A/B Experimentation',
        subtitle: 'Launching controlled split tests and systematically increasing baseline conversion rates.',
        deliverables: ['A/B Experimentation Matrix', 'Conversion Rate Lift Reports', 'Ongoing Optimization Sprints'],
      },
    ],
    deliverables: [
      'Complete End-to-End Sales Funnel Architecture',
      'Custom Responsive Landing & Checkout Pages',
      'Multi-Variant A/B Testing Framework',
      'Automated Email & SMS Retention Sequences',
      'Real-Time Attribution & Revenue Dashboard',
    ],
    techStack: ['Klaviyo', 'Stripe', 'Google Analytics 4', 'Hotjar', 'PostHog', 'Astro / Next.js', 'VWO'],
    relatedProjects: [
      {
        slug: 'everswap',
        title: 'EverSwap',
        category: 'Fintech Conversion Funnel',
        image: '/assets/projects/everswap/home.webp',
      },
      {
        slug: 'choo_choo_world',
        title: 'Choo Choo World',
        category: 'Interactive E-Commerce',
        image: '/assets/projects/choo_choo_world/home.webp',
      },
      {
        slug: 'ddd_2024',
        title: 'DDD 2024',
        category: 'Ticketing & Event Funnel',
        image: '/assets/projects/ddd_2024/home.webp',
      },
    ],
    nextService: {
      slug: 'ppc-advertising',
      title: 'PPC Advertising',
      number: '06',
    },
  },

  'ppc-advertising': {
    slug: 'ppc-advertising',
    number: '06',
    category: 'Acquisition & Paid Scaling',
    title: 'PPC Advertising',
    headline: 'Precision Paid Acquisition, ROAS Maximization & Scalable Media Buying',
    heroTagline: 'We turn advertising spend into predictable profit machines through surgical targeting, creative testing, and algorithmic bidding.',
    description: 'Performance-driven PPC advertising campaigns built to generate high-intent leads, accelerate sales, and maximize return on ad spend (ROAS) across Google, Meta, and high-converting paid networks.',
    heroMetrics: [
      { label: 'Target ROAS', value: '3.5x - 7.8x' },
      { label: 'Ad Creatives Tested', value: '20+ / Month' },
      { label: 'CPA Reduction', value: '-38% Avg' },
    ],
    capabilities: [
      {
        title: 'Google Ads & Search Domination',
        description: 'Capturing active commercial intent with high-precision Google Search, Performance Max, and Shopping campaigns.',
        features: ['Negative Keyword Fortressing', 'Single-Themed Ad Groups (STAG)', 'Performance Max Asset Structuring', 'Automated Target CPA/ROAS Bidding'],
      },
      {
        title: 'Meta & Paid Social Scaling',
        description: 'Engaging highly targeted buyer demographics across Instagram and Facebook with scroll-stopping ad creative and dynamic retargeting.',
        features: ['Broad Targeting & Lookalike Models', 'Dynamic Product Ads (DPA)', 'Retargeting Funnel Sequences', 'Creative Testing Sandboxes'],
      },
      {
        title: 'High-Velocity Creative Testing',
        description: 'Designing and testing dozens of video variations, headline angles, and visual hooks each week to combat ad fatigue.',
        features: ['Motion Ad Variations', 'UGC-Style Content Creation', 'Direct Response Visual Hooks', 'Creative Fatigue Alerting'],
      },
      {
        title: 'Server-Side Tracking & Attribution',
        description: 'Deploying Meta Conversions API (CAPI) and Google Enhanced Conversions to bypass ad-blockers and iOS privacy signal loss.',
        features: ['Meta Conversions API (CAPI)', 'Google Enhanced Conversions', 'Multi-Touch Attribution Modeling', 'Custom UTM Tracking Parameters'],
      },
    ],
    process: [
      {
        step: '01',
        name: 'Account Audit & Telemetry Setup',
        subtitle: 'Reviewing past ad efficiency, fixing tracking leaks, and deploying CAPI.',
        deliverables: ['Historical Efficiency Audit', 'Server-Side Tracking Verification', 'Attribution Baseline'],
      },
      {
        step: '02',
        name: 'Campaign Structure & Creative Sprint',
        subtitle: 'Architecting testing sandboxes, scaling campaigns, and producing initial creatives.',
        deliverables: ['Campaign Structure Blueprint', 'Ad Creative Asset Batch', 'Ad Copy Matrix'],
      },
      {
        step: '03',
        name: 'Launch & Algorithmic Learning',
        subtitle: 'Deploying campaigns, monitoring click-through rates, and training algorithmic bid models.',
        deliverables: ['Live Campaign Activation', 'Real-Time Spend Controls', 'Daily Bid Adjustments'],
      },
      {
        step: '04',
        name: 'Aggressive Scaling & Profit Optimization',
        subtitle: 'Directing budget to top-performing ads while aggressively pruning unprofitable segments.',
        deliverables: ['Weekly ROAS Telemetry', 'Winner Creative Iterations', 'Budget Scaling Recommendations'],
      },
    ],
    deliverables: [
      'Multi-Channel Paid Advertising Campaigns',
      'High-Converting Ad Creatives & Video Cuts',
      'Robust Server-Side Tracking (CAPI / Enhanced)',
      'Granular Negative Keyword & Placement Lists',
      'Live Profit & ROAS Reporting Dashboard',
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'Google Tag Manager', 'Stape.io (Server GTM)', 'Triple Whale', 'Looker Studio'],
    relatedProjects: [
      {
        slug: 'oryzo_ai',
        title: 'Oryzo AI',
        category: 'High-Growth Tech Acquisition',
        image: '/assets/projects/oryzo_ai/home.webp',
      },
      {
        slug: 'worldcoin',
        title: 'Worldcoin',
        category: 'Global Paid Distribution',
        image: '/assets/projects/worldcoin/home.webp',
      },
      {
        slug: 'porsche_dream_machine',
        title: 'Porsche Dream Machine',
        category: 'Enterprise Paid Performance',
        image: '/assets/projects/porsche_dream_machine/home.webp',
      },
    ],
    nextService: {
      slug: 'web-development',
      title: 'Web Development',
      number: '01',
    },
  },
};
