// src/data/pages/contact/form.ts

export interface SocialLink {
  name: string;
  href: string;
}

export interface BudgetOption {
  value: string;
  label: string;
  selected?: boolean;
}

export interface ContactFormData {
  email: string;
  phone: string;
  address: string;
  statusBadge: string;
  servicesOptions: string[];
  budgetOptions: BudgetOption[];
  socialLinks: SocialLink[];
  confirmationMessage: string;
}

export const contactFormData: ContactFormData = {
  email: 'hello@kyndstudio.com',
  phone: '+1 (778) 594-5459',
  address: 'Rossland, B.C (HQ) & Bristol, UK',
  statusBadge: 'Available for Q2/Q3 Projects',
  servicesOptions: [
    'Web Development',
    'Web Design',
    'Social Media Marketing',
    'SEO',
    'Sales Funnels',
    'PPC Advertising',
  ],
  budgetOptions: [
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000', selected: true },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
  ],
  socialLinks: [
    { name: 'Twitter / X', href: 'https://twitter.com/kyndev' },
    { name: 'Instagram', href: 'https://instagram.com/kyndev' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/kyndev' },
    { name: 'GitHub', href: 'https://github.com/kyndev' },
  ],
  confirmationMessage:
    'Thank you for reaching out! The KYNDEV team will get back to you shortly.',
};
