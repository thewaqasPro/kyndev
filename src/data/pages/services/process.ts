// src/data/pages/services/process.ts

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface ServicesProcessData {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
}

export const servicesProcessData: ServicesProcessData = {
  eyebrow: 'Our Methodology //',
  title: 'How we deliver results that matter',
  steps: [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Uncovering brand objectives, audience behaviors, and technical opportunities through collaborative workshops.',
    },
    {
      num: '02',
      title: 'Architecture',
      desc: 'Engineering user journeys, conversion wireframes, and design systems tailored specifically to your goals.',
    },
    {
      num: '03',
      title: 'Production',
      desc: 'Crafting responsive layouts, WebGL animations, and seamless user experiences with zero boilerplate fluff.',
    },
    {
      num: '04',
      title: 'Optimization',
      desc: 'Refining Core Web Vitals, deploying tracking, and executing iteration loops for sustainable compounding growth.',
    },
  ],
};
