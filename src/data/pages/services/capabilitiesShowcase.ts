// src/data/pages/services/capabilitiesShowcase.ts

export interface CapabilityPillar {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface ServicesCapabilitiesShowcaseData {
  tag: string;
  title: string;
  pillars: CapabilityPillar[];
}

export const servicesCapabilitiesShowcaseData: ServicesCapabilitiesShowcaseData = {
  tag: '// Studio Capabilities Matrix',
  title: 'Creative Technology & Digital Mastery',
  pillars: [
    {
      num: '01',
      title: '3D & Creative Engineering',
      desc: 'Custom WebGL shaders, Three.js pipelines, procedural physics, and interactive fluid simulations engineered for buttery smooth 60-120 FPS performance.',
      tags: ['Custom GLSL', 'Three.js / WebGL2', 'GPU Computing', 'Micro-Interactions'],
    },
    {
      num: '02',
      title: 'Bespoke Digital Product Design',
      desc: 'Award-caliber UI/UX systems, emotive typography hierarchies, and intuitive user journeys that transform digital interfaces into memorable brand statements.',
      tags: ['Design Systems', 'Kinetic Direction', 'Spatial Prototyping', 'Accessibility'],
    },
    {
      num: '03',
      title: 'Full-Stack Performance Systems',
      desc: 'Scalable headless web architecture, sub-second TTFB, edge computing, and zero layout shift designed to convert high-volume commercial traffic.',
      tags: ['Astro / Next.js', 'Headless CMS', 'Edge Deployment', 'Core Web Vitals 100%'],
    },
  ],
};
