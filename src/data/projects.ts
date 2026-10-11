export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  client: string;
  year: string;
  services: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  accentColor: string;
  featured: boolean;
  reelDuration: string;
  aspectRatio: string;
}

export const projects: Project[] = [
  {
    slug: 'everswap',
    title: 'EVERSWAP PROTOCOL',
    tagline: 'Institutional decentralized liquidity engine & zero-latency trading terminal',
    category: 'Web Applications',
    client: 'Everswap Global AG',
    year: '2026',
    services: ['Frontend Architecture', 'WebGL Visualizer', 'High-Speed WebSockets', 'Solidity Integration'],
    metrics: [
      { label: 'Execution Latency', value: '< 28ms' },
      { label: 'Cumulative TVL', value: '$840M+' },
      { label: 'Lighthouse Performance', value: '99/100' }
    ],
    overview: 'A tier-1 institutional order-book swap terminal designed to rival centralized Bloomberg-grade financial screens while preserving decentralized cryptographic settlement.',
    challenge: 'Rendering thousands of order-book updates per second alongside multi-tier depth charts caused severe compositor thrashing and frame drops on standard React architectures.',
    solution: 'We engineered a bespoke WebGL-accelerated order-depth stream paired with an Astro-powered static application shell, offloading heavy calculations to dedicated Web Workers.',
    techStack: ['Astro', 'Three.js / WebGL', 'Web Workers', 'Rust / Wasm', 'Tailored CSS Tokens', 'Ethers.js'],
    accentColor: '#00f0ff',
    featured: true,
    reelDuration: '01:42',
    aspectRatio: '16/9'
  },
  {
    slug: 'spaace',
    title: 'SPAACE STUDIOS',
    tagline: 'Photorealistic spatial 3D furniture configurator on Shopify Plus',
    category: 'Shopify Apps',
    client: 'Spaace Design Labs',
    year: '2025',
    services: ['Shopify Plus Architecture', 'Three.js Configurator', 'Custom Theme Engineering', 'GLTF Pipeline'],
    metrics: [
      { label: 'Conversion Lift', value: '+142%' },
      { label: 'Return Rate Drop', value: '-38%' },
      { label: 'Asset Payload', value: '1.4MB' }
    ],
    overview: 'A bleeding-edge headless e-commerce flagship for luxury modular architecture, empowering collectors to customize finishes, fabrics, and dimensional arrangements in real time.',
    challenge: 'Delivering photorealistic PBR materials and high-poly geometry on mobile Safari without causing memory panics or sluggish page load times.',
    solution: 'Crafted a custom Draco-compressed asset delivery pipeline integrated directly with Shopify Storefront API, yielding 60fps interaction even on low-power mobile devices.',
    techStack: ['Shopify Storefront API', 'Three.js', 'Draco Mesh Compression', 'Custom GLSL Shaders', 'Astro Islands'],
    accentColor: '#ff0055',
    featured: true,
    reelDuration: '02:15',
    aspectRatio: '16/9'
  },
  {
    slug: 'atlas-motion',
    title: 'ATLAS TELEMETRY',
    tagline: 'Autonomous planetary logistics visualizer & real-time GIS command center',
    category: 'Systems & WebGL',
    client: 'Atlas Motion Systems',
    year: '2025',
    services: ['Command Dashboard', 'GeoJSON Rendering', 'WebGL Globe Engine', 'Distributed Telemetry'],
    metrics: [
      { label: 'Active Fleets Tracked', value: '120,000+' },
      { label: 'Throughput', value: '4.2M evt/s' },
      { label: 'Render Frame Time', value: '16.6ms' }
    ],
    overview: 'Mission control interface for autonomous freight networks, streaming spatial coordinate meshes, battery health, and atmospheric routing live on a globe.',
    challenge: 'Streaming geospatial vector layers for global shipping corridors while maintaining fluid camera navigation from low-Earth orbit down to street-level docking bays.',
    solution: 'Constructed an adaptive quadtree tile renderer powered by custom GPU instancing, enabling instantaneous zoom transitions without network stutter.',
    techStack: ['Three.js', 'Astro', 'Mapbox GL', 'Go Backend Microservices', 'Kafka Stream Bridge'],
    accentColor: '#ffaa00',
    featured: true,
    reelDuration: '01:58',
    aspectRatio: '16/9'
  },
  {
    slug: 'choo-choo-world',
    title: 'CHOO CHOO WORLD',
    tagline: 'Interactive physics-driven procedural generative micro-universe',
    category: 'Interactive 3D',
    client: 'Supervoid Studio',
    year: '2024',
    services: ['3D Web Experience', 'Procedural Terrain', 'Spatial Audio Engine', 'Motion System'],
    metrics: [
      { label: 'Awards Won', value: 'FWA of the Day' },
      { label: 'Average Dwell Time', value: '6m 48s' },
      { label: 'Social Reach', value: '2.8M views' }
    ],
    overview: 'A whimsical yet technologically formidable WebGL interactive sandbox where users build intricate rail systems across procedurally generated low-poly planetary bodies.',
    challenge: 'Ensuring rigid-body physics calculations ran smoothly alongside spatial audio convolution filters in browser environments without freezing UI thread execution.',
    solution: 'Implemented Rapier.js physics in a web worker thread with interpolated render states feeding Three.js transforms via SharedArrayBuffers.',
    techStack: ['Three.js', 'Rapier Physics', 'Web Audio API', 'GSAP', 'Lenis Smooth Scroll'],
    accentColor: '#39ff14',
    featured: true,
    reelDuration: '02:30',
    aspectRatio: '16/9'
  },
  {
    slug: 'ddd-2024',
    title: 'DDD SUMMIT 2024',
    tagline: 'Generative design summit portal with audio-reactive stage synesthesia',
    category: 'Web Applications',
    client: 'Design Driven Developers',
    year: '2024',
    services: ['Conference Platform', 'Generative Identity', 'Ticket Checkout', 'Dynamic Agenda'],
    metrics: [
      { label: 'Attendees Registered', value: '8,500+' },
      { label: 'Live Stream Concurrents', value: '34,000' },
      { label: 'Checkout Conversion', value: '18.4%' }
    ],
    overview: 'The primary digital gateway for the international DDD Summit, blending generative kinetic typography, interactive schedule graphs, and instant ticket processing.',
    challenge: 'Handling sudden traffic surges of 50,000 simultaneous users at ticket release time while running heavy client-side audio-reactive shader animations.',
    solution: 'Static pre-rendering with Astro on Edge CDN paired with headless Stripe serverless functions ensured 0% downtime and sub-100ms response times.',
    techStack: ['Astro', 'GSAP ScrollTrigger', 'Web Audio Analyser', 'Stripe API', 'Edge Middleware'],
    accentColor: '#b026ff',
    featured: true,
    reelDuration: '01:15',
    aspectRatio: '16/9'
  },
  {
    slug: 'devin-ai',
    title: 'DEVIN COGNITIVE OS',
    tagline: 'Next-generation developer runtime interface and real-time AST graph studio',
    category: 'Frontend Architecture',
    client: 'Cognition Dynamics',
    year: '2026',
    services: ['AI Interface Design', 'Realtime Canvas', 'Syntax Streaming Engine', 'Design System'],
    metrics: [
      { label: 'Token Stream Speed', value: '120 tok/s' },
      { label: 'Graph Nodes Rendered', value: '25,000' },
      { label: 'Developer CSAT', value: '4.9 / 5.0' }
    ],
    overview: 'An avant-garde human-in-the-loop developer environment allowing software teams to guide, verify, and orchestrate autonomous engineering swarms seamlessly.',
    challenge: 'Rendering rapid LLM multi-file diff streams with syntax highlighting and interactive dependency graph exploration at 60fps.',
    solution: 'Engineered a virtualized canvas DOM projection layer with custom syntax token caching, eliminating standard DOM reflows entirely.',
    techStack: ['Astro Shell', 'TypeScript', 'Canvas2D / WebGL', 'WebSockets', 'GSAP Timeline'],
    accentColor: '#00d4ff',
    featured: true,
    reelDuration: '02:04',
    aspectRatio: '16/9'
  }
];
