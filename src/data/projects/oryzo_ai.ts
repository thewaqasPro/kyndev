// src/data/projects/oryzo_ai.ts
import type { ProjectData } from './types';

export const oryzo_ai: ProjectData = {
  slug: 'oryzo_ai',
  title: 'Oryzo AI',
  tags: 'concept • web • design • development • 3d • animation',
  theme: {
    style: 'background-color:#1a1411',
    shadow: '0.9',
    colorBg: '#1a1411',
    colorHighlight: '#dc5000',
    colorBtnBg: '#ffedd7',
    colorBtnText: '#192743',
    colorIconBg: '#ffedd7',
    colorIconColor: '#192743',
    colorText: '#ffedd7',
    colorBtnBgHover: '#dc5000',
    colorBtnTextHover: '#ffedd7',
  },
  descHtml:
    '<p>Oryzo AI is a self initiated project by KYNDEV built around a deliberately ridiculous idea: presenting a simple cork coaster as a serious AI era product launch. We treated it as a full campaign, combining premium visual production with satire to see how far craft, storytelling, and presentation could push an ordinary object.</p><p>Beyond the main website, we extended the idea across a <a href="https://github.com/lusionltd/ORYZO-1" target="_blank">GitHub page</a>, <a href="https://www.producthunt.com/products/oryzo-ai" target="_blank">Product Hunt launch</a>, <a href="https://x.com/lusionltd/status/2034659078840996274" target="_blank">founder video</a>, and social content. It gave us room to experiment more freely with tone and campaign thinking, while showing the same level of design, motion, and digital production we bring to client work.</p>',
  launchUrl: 'https://oryzo.ai/',
  launchLabel: 'Launch Project',
  services: ['Concept', 'Web Design', 'Web Development', '3D Design', 'WebGL', 'Animation'],
  links: [
    {
      url: 'https://thefwa.com/cases/oryzo-ai',
      label: 'FWA SOTM',
    },
    {
      url: 'https://www.awwwards.com/sites/oryzo-ai',
      label: 'Awwwards SOTM',
    },
    {
      url: 'https://www.producthunt.com/products/oryzo-ai',
      label: 'Product Hunt',
    },
    {
      url: 'https://github.com/lusionltd/ORYZO-1',
      label: 'Github',
    },
  ],
  items: [
    {
      filename: '/assets/projects/oryzo_ai/main',
      type: 'video',
      width: 1250,
      height: 720,
      fullscreen: false,
    },
    {
      filename: '/assets/projects/oryzo_ai/image_1',
      type: 'image',
      width: 1296,
      height: 1620,
      fullscreen: true,
    },
    {
      filename: '/assets/projects/oryzo_ai/launch',
      type: 'video',
      width: 1280,
      height: 720,
      fullscreen: false,
    },
    {
      filename: '/assets/projects/oryzo_ai/image_2',
      type: 'image',
      width: 1080,
      height: 1440,
      fullscreen: true,
    },
    {
      filename: '/assets/projects/oryzo_ai/bts',
      type: 'video',
      width: 1280,
      height: 720,
      fullscreen: false,
    },
    {
      filename: '/assets/projects/oryzo_ai/founder',
      type: 'image',
      width: 2043,
      height: 1140,
      fullscreen: false,
    },
    {
      filename: '/assets/projects/oryzo_ai/image_3',
      type: 'image',
      width: 1296,
      height: 1620,
      fullscreen: true,
    },
  ],
  nextProject: {
    id: 'atlas_motion',
    title: 'Atlas Motion',
    colorBg: '#181818',
    colorText: '#FFFDE0',
    shadow: '0.95',
  },
};
