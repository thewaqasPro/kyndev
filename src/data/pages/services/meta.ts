// src/data/pages/services/meta.ts

export interface ServicesMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
  scrollNavSubtitle: string;
}

export const servicesMetaData: ServicesMetaData = {
  title: 'KYNDEV - Our Services',
  description:
    'Responsive web development, UX/UI design, and digital growth services tailored to your goals. No templates, no guesswork.',
  ogUrl: 'https://kyndev.com/services/',
  scrollNavPath: '/projects',
  scrollNavText: 'Our Projects',
  scrollNavSubtitle: 'Next',
};
