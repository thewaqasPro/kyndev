// src/data/pages/contact/meta.ts

export interface ContactMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
  scrollNavSubtitle: string;
}

export const contactMetaData: ContactMetaData = {
  title: 'KYNDEV - Contact Us',
  description:
    'Get in touch with KYNDEV. Whether you have a project idea, question, or want to collaborate, drop us a message.',
  ogUrl: 'https://kyndev.com/contact/',
  scrollNavPath: '/',
  scrollNavText: 'Home',
  scrollNavSubtitle: 'Back To',
};
