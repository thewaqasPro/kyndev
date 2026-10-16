// src/data/common/footer.ts

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterData {
  /** Physical studio address lines */
  addressLines: string[];
  /** Google Maps link for the address */
  mapsUrl: string;
  /** General email */
  emailGeneral: string;
  /** Business inquiry email */
  emailBusiness: string;
  /** Social media links */
  socials: SocialLink[];
  /** Copyright line */
  copyright: string;
  /** Tagline */
  tagline: string;
}

export const footerData: FooterData = {
  addressLines: ['Suite 2', '9 Marsh Street', 'Bristol, BS1 4AA', 'United Kingdom'],
  mapsUrl: 'https://goo.gl/maps/x9evc1NxZocjrM947',
  emailGeneral: 'hello@kyndev.com',
  emailBusiness: 'business@kyndev.com',
  socials: [
    { platform: 'Twitter / X', url: 'https://twitter.com/kyndev' },
    { platform: 'Instagram', url: 'https://www.instagram.com/kyndev' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/kyndev' },
    { platform: 'GitHub', url: 'https://github.com/thewaqaspro' },
  ],
  copyright: '©2026 KYNDEV Creative Studio',
  tagline: 'Built by KYNDEV with ❤️',
};
