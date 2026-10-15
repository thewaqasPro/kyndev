// src/data/projects/aguy_contracting.ts
import type { ProjectData } from './types';

export const aguy_contracting: ProjectData = {
  slug: 'aguy_contracting',
  title: 'A Guy Contracting',
  tags: 'concept • web • design • development • 3d • animation',
  theme: {
    style: 'background-color:#141518',
    shadow: '0.9',
    colorBg: '#141518',
    colorHighlight: '#0081fb',
    colorBtnBg: '#f0f3fa',
    colorBtnText: '#0a0c12',
    colorIconBg: '#f0f3fa',
    colorIconColor: '#0a0c12',
    colorText: '#f0f3fa',
    colorBtnBgHover: '#0081fb',
    colorBtnTextHover: '#ffffff',
  },
  descHtml:
    '<p>A Guy Contracting is a bespoke digital experience designed and built to showcase high-end craftsmanship, architectural remodeling, and modern contracting services. We engineered an interactive portfolio experience with custom 2.5D WebGL depth, smooth visual pacing, and premium brand storytelling.</p>',
  launchUrl: 'https://aguycontracting.com/',
  launchLabel: 'Launch Project',
  services: ['Concept', 'Web Design', 'Web Development', '3D Design', 'WebGL', 'Animation'],
  links: [],
  items: [
    {
      filename: '/assets/projects/aguy_contracting/main',
      type: 'image',
      width: 1200,
      height: 834,
      fullscreen: true,
    },
  ],
  nextProject: {
    id: 'oryzo_ai',
    title: 'Oryzo AI',
    colorBg: '#1a1411',
    colorText: '#ffedd7',
    shadow: '0.9',
  },
};
