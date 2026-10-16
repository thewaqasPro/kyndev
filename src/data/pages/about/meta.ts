// src/data/pages/about/meta.ts

export interface AboutMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
}

export const aboutMetaData: AboutMetaData = {
  title: 'KYNDEV - About Us',
  description: 'KYNDEV is a boutique creative production studio with wide range of talents and capabilities for your next project.',
  ogUrl: 'https://kyndev.com/about/',
  scrollNavPath: '/projects',
  scrollNavText: 'Projects',
};
