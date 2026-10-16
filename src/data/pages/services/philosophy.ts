// src/data/pages/services/philosophy.ts

export interface PhilosophyValue {
  icon: string;
  title: string;
  text: string;
}

export interface ServicesPhilosophyData {
  tag: string;
  title: string;
  values: PhilosophyValue[];
}

export const servicesPhilosophyData: ServicesPhilosophyData = {
  tag: '// The Studio Ethos',
  title: 'Built for Brands That Refuse to Be Ignored',
  values: [
    {
      icon: '⚡',
      title: 'Zero Bloat & Templates',
      text: 'Every line of code and every pixel is crafted intentionally. We do not use off-the-shelf templates, heavy drag-and-drop builders, or generic frameworks.',
    },
    {
      icon: '🎯',
      title: 'Performance as an Art Form',
      text: 'We hold our work to the highest technical standards—guaranteeing 60-120 FPS render loops, flawless Core Web Vitals, and sub-second global load times.',
    },
    {
      icon: '👁️',
      title: 'Immersive Emotional Resonance',
      text: 'We fuse artistic creative direction with deep human psychology to create websites and digital worlds that people truly remember, share, and love.',
    },
  ],
};
