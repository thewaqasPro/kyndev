// src/data/pages/about/who.ts

export interface AboutWhoMember {
  number: string;
  name: string;
  role: string;
}

export interface AboutWhoData {
  scrollPrompt: string;
  tagline: {
    weAre: string;
    studioName: string;
    creative: string;
    production: string;
    studioWord: string;
  };
  headlineRight: string[];
  manifesto: {
    topItalic: string;
    topText: string[];
    bottomText: string[];
  };
  team: {
    number: string;
    member: {
      name: string;
      roleLines: string[];
    };
    narrative: string;
    mobileSwipeHint: string;
  };
}

export const aboutWhoData: AboutWhoData = {
  scrollPrompt: 'SCROLL TO EXPLORE',
  tagline: {
    weAre: 'WE ARE',
    studioName: 'KYNDEV',
    creative: 'A CREATIVE',
    production: 'PRODUCTION',
    studioWord: 'STUDIO',
  },
  headlineRight: ['CRAFTING UNIQUE', 'DIGITAL EXPERIENCES'],
  manifesto: {
    topItalic: 'A worldwide team',
    topText: ['of', 'specialists in design,', 'motion, 3D, and technology'],
    bottomText: [
      'working together to',
      'turn ambitious ideas into',
      'immersive digital',
      'experiences.',
    ],
  },
  team: {
    number: '001',
    member: {
      name: 'Edan Kwan',
      roleLines: ['Cofounder &', 'Creative Director'],
    },
    narrative:
      'We combine different disciplines into one creative production process, allowing ideas to move from concept to execution with clarity and craft. The result is digital work that feels distinctive, technically refined, and built to make a lasting impact.',
    mobileSwipeHint: 'Swipe to change',
  },
};
