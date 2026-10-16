// src/data/pages/home/meta.ts

export interface HomeMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
}

export const homeMetaData: HomeMetaData = {
  title: 'KYNDEV - Award Winning 3D and Interactive Web Studio',
  description: 'We design and produce 3D visual storytelling, immersive websites, and interactive digital experiences that help brands stand out online.',
  ogUrl: 'https://kyndev.com/',
  scrollNavPath: '/about',
  scrollNavText: 'About Us',
};

export const heroToolsMetaData: HomeMetaData = {
  title: 'KYNDEV - 3D Marketing Tools Hero Preview',
  description: 'Interactive 3D Marketing Stack featuring Google Ads, Meta, HubSpot, Klaviyo, GA4, Shopify, and TikTok physics.',
  ogUrl: 'https://kyndev.com/hero-tools',
  scrollNavPath: '/about',
  scrollNavText: 'About Us',
};
