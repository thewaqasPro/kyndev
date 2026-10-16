// src/data/pages/projects/meta.ts

export interface ProjectsMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
}

export const projectsMetaData: ProjectsMetaData = {
  title: 'KYNDEV - Our Projects',
  description:
    'KYNDEV works with a wide range of clients including global brands, startups and agencies.',
  ogUrl: 'https://kyndev.com/projects/',
  scrollNavPath: '/about',
  scrollNavText: 'About Us',
};
