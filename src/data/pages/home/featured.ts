// src/data/pages/home/featured.ts

export interface FeaturedProjectItem {
  id: string;
  href: string;
  tags: string;
  title: string;
  colorBg: string;
  colorText: string;
  colorShadow: string;
}

export interface HomeFeaturedData {
  title: string;
  disclaimer: string;
  ctaText: string;
  ctaLink: string;
  projects: FeaturedProjectItem[];
}

export const homeFeaturedData: HomeFeaturedData = {
  title: 'Featured Work',
  disclaimer: 'A selection of immersive digital experiences created for ambitious brands and forward thinking teams.',
  ctaText: 'See all projects',
  ctaLink: '/projects',
  projects: [
    {
      id: 'oryzo_ai',
      href: '/projects/oryzo_ai',
      tags: 'concept • web • design • development • 3d • animation',
      title: 'Oryzo AI',
      colorBg: '#1a1411',
      colorText: '#ffedd7',
      colorShadow: '0.9',
    },
    {
      id: 'atlas_motion',
      href: '/projects/atlas_motion',
      tags: 'concept • web • design • development • 3d • animation',
      title: 'Atlas Motion',
      colorBg: '#181818',
      colorText: '#FFFDE0',
      colorShadow: '0.95',
    },
    {
      id: 'devin_ai',
      href: '/projects/devin_ai',
      tags: 'web • design • development • 3d',
      title: 'Devin AI',
      colorBg: '#121414',
      colorText: '#ffffff',
      colorShadow: '0.9',
    },
    {
      id: 'of_the_oak',
      href: '/projects/of_the_oak',
      tags: 'web • design • development • 3d • animation',
      title: 'Of The Oak',
      colorBg: '#111a13',
      colorText: '#d9f3de',
      colorShadow: '0.9',
    },
    {
      id: 'everswap',
      href: '/projects/everswap',
      tags: 'concept • web • design • development • 3d • animation',
      title: 'Everswap',
      colorBg: '#E3E3F8',
      colorText: '#000',
      colorShadow: '0.95',
    },
    {
      id: 'porsche_dream_machine',
      href: '/projects/porsche_dream_machine',
      tags: 'concept • 3D illustration • mograph • video',
      title: 'Porsche: Dream Machine',
      colorBg: '#EFD5D3',
      colorText: '#000000',
      colorShadow: '0.95',
    },
    {
      id: 'synthetic_human',
      href: '/projects/synthetic_human',
      tags: 'web • design • development • 3d',
      title: 'Synthetic Human',
      colorBg: '#9d8aff',
      colorText: '#ffffff',
      colorShadow: '0.95',
    },
    {
      id: 'spatial_fusion',
      href: '/projects/spatial_fusion',
      tags: 'web • design • development • 3d',
      title: 'Meta: Spatial Fusion',
      colorBg: '#D6C8ED',
      colorText: '#000000',
      colorShadow: '0.95',
    },
    {
      id: 'spaace',
      href: '/projects/spaace',
      tags: 'web • design • development • 3d • web3',
      title: 'Spaace - NFT Marketplace',
      colorBg: '#010a16',
      colorText: '#ffece2',
      colorShadow: '0.85',
    },
    {
      id: 'ddd_2024',
      href: '/projects/ddd_2024',
      tags: 'web • design • development • 3d',
      title: 'DDD 2024',
      colorBg: '#261c46',
      colorText: '#ffffff',
      colorShadow: '0.95',
    },
    {
      id: 'choo_choo_world',
      href: '/projects/choo_choo_world',
      tags: 'concept • web • game design • 3d',
      title: 'Choo Choo World',
      colorBg: '#E8EEF8',
      colorText: '#000000',
      colorShadow: '0.95',
    },
    {
      id: 'soda_experience',
      href: '/projects/soda_experience',
      tags: 'AR • development • 3d',
      title: 'Soda Experience',
      colorBg: '#E1E2E4',
      colorText: '#000000',
      colorShadow: '0.85',
    },
  ],
};
