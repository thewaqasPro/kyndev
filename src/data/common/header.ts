// src/data/common/header.ts

export interface NavLink {
  label: string;
  path: string;
  pageId: string;
}

export interface HeaderData {
  /** Logo text mark */
  logoText: string;
  /** Primary contact / talk email */
  email: string;
  /** Primary navigation menu links */
  navLinks: NavLink[];
  /** Secondary studio link */
  externalStudio: {
    label: string;
    url: string;
  };
}

export const headerData: HeaderData = {
  logoText: 'KYNDEV',
  email: 'hello@kyndev.com',
  navLinks: [
    { label: 'Home', path: '/', pageId: 'home' },
    { label: 'Services', path: '/services', pageId: 'services' },
    { label: 'Projects', path: '/projects', pageId: 'projects' },
    { label: 'About us', path: '/about', pageId: 'about' },
    { label: 'Contact', path: '/contact', pageId: 'contact' },
  ],
  externalStudio: {
    label: 'Studio',
    url: 'https://kyndstudio.com/',
  },
};
