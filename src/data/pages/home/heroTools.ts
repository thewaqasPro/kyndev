// src/data/pages/home/heroTools.ts

export interface HeroToolsData {
  tag: string;
  title: string;
  titleAccent: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  scatterButtonText: string;
  defaultHud: {
    icon: string;
    name: string;
    subtitle: string;
    hint: string;
  };
}

export const heroToolsData: HeroToolsData = {
  tag: 'Performance Marketing Ecosystem',
  title: 'We engineer high-converting campaigns across',
  titleAccent: 'Google, Meta, HubSpot & Klaviyo',
  description: 'Scale your brand with battle-tested paid acquisition, data-driven automation, and custom attribution models built for exponential ROI.',
  ctaText: 'Explore Our Services →',
  ctaLink: '/services',
  scatterButtonText: 'Scatter Stack',
  defaultHud: {
    icon: 'G',
    name: 'Google Ads',
    subtitle: 'PPC & Search Scaling',
    hint: 'Click or drag any 3D tool badge to toss & inspect',
  },
};
