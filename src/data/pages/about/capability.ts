// src/data/pages/about/capability.ts

export interface CapabilityCard {
  title: string;
  letter: string;
  items: string[];
}

export interface AboutCapabilityData {
  titleLines: [string, string];
  subheaderText: string;
  subheaderCards: string[];
  capabilities: CapabilityCard[];
}

export const aboutCapabilityData: AboutCapabilityData = {
  titleLines: ['AREA OF', 'EXPERTISE'],
  subheaderText:
    'Multidisciplinary expertise across strategy, creative, technology, and production.',
  subheaderCards: ['s', 'd', 't', '3'],
  capabilities: [
    {
      title: 'Strategy',
      letter: 's',
      items: [
        'Digital Experience Strategy',
        'Technology Strategy',
        'Creative Direction',
        'Discovery',
        'Research',
      ],
    },
    {
      title: 'Creative',
      letter: 'c',
      items: [
        'Art Direction',
        'UX/UI Design',
        'Motion Design',
        'Interactive Design',
        'Illustration',
      ],
    },
    {
      title: 'Tech',
      letter: 't',
      items: [
        'WebGL Development',
        'Front End Development',
        'Unity/Unreal',
        'Interactive Installations',
        'AR and VR Experiences',
      ],
    },
    {
      title: 'Production',
      letter: 'P',
      items: [
        'Procedural Modeling',
        '3D Asset Creation',
        '3D Optimization',
        'Animation',
        '3D Pipeline Development',
      ],
    },
  ],
};
