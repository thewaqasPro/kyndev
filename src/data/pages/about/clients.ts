// src/data/pages/about/clients.ts

export interface ClientLogo {
  src: string;
  alt: string;
}

export interface AboutClientsData {
  title: string;
  description: string;
  carouselRows: ClientLogo[][];
}

export const aboutClientsData: AboutClientsData = {
  title: 'BRANDS WE WORK WITH',
  description: 'Trusted by global brands, cultural institutions, and forward thinking teams.',
  carouselRows: [
    [
      { src: '/assets/images/logo/@logo--cocacola.svg', alt: 'Coca Cola' },
      { src: '/assets/images/logo/@logo--maxmara.svg', alt: 'Max Mara' },
      { src: '/assets/images/logo/@logo--calvin-klein.svg', alt: 'Calvin Klein' },
      { src: '/assets/images/logo/@logo--porsche.svg', alt: 'Porsche' },
      { src: '/assets/images/logo/@logo--wallpaper.svg', alt: 'Wallpaper' },
      { src: '/assets/images/logo/@logo--cocacola.svg', alt: 'Coca Cola' },
      { src: '/assets/images/logo/@logo--maxmara.svg', alt: 'Max Mara' },
      { src: '/assets/images/logo/@logo--calvin-klein.svg', alt: 'Calvin Klein' },
      { src: '/assets/images/logo/@logo--porsche.svg', alt: 'Porsche' },
      { src: '/assets/images/logo/@logo--wallpaper.svg', alt: 'Wallpaper' },
    ],
    [
      { src: '/assets/images/logo/@logo--hyundai.svg', alt: 'Hyundai' },
      { src: '/assets/images/logo/@logo--google.svg', alt: 'Google' },
      { src: '/assets/images/logo/@logo--apple.svg', alt: 'Apple' },
      { src: '/assets/images/logo/@logo--webby-awards.svg', alt: 'Webby Awards' },
      { src: '/assets/images/logo/@logo--stanford.svg', alt: 'Stanford' },
      { src: '/assets/images/logo/@logo--sony.svg', alt: 'Sony' },
      { src: '/assets/images/logo/@logo--hyundai.svg', alt: 'Hyundai' },
      { src: '/assets/images/logo/@logo--google.svg', alt: 'Google' },
      { src: '/assets/images/logo/@logo--apple.svg', alt: 'Apple' },
      { src: '/assets/images/logo/@logo--webby-awards.svg', alt: 'Webby Awards' },
      { src: '/assets/images/logo/@logo--stanford.svg', alt: 'Stanford' },
      { src: '/assets/images/logo/@logo--sony.svg', alt: 'Sony' },
    ],
    [
      { src: '/assets/images/logo/@logo--awwwards.svg', alt: 'Awwwards' },
      { src: '/assets/images/logo/@logo--nvidia.svg', alt: 'Nvidia' },
      { src: '/assets/images/logo/@logo--akqa.svg', alt: 'AKQA' },
      { src: '/assets/images/logo/@logo--nexus-studios.svg', alt: 'Nexus Studios' },
      { src: '/assets/images/logo/@logo--cocacola.svg', alt: 'Coca Cola' },
      { src: '/assets/images/logo/@logo--awwwards.svg', alt: 'Awwwards' },
      { src: '/assets/images/logo/@logo--nvidia.svg', alt: 'Nvidia' },
      { src: '/assets/images/logo/@logo--akqa.svg', alt: 'AKQA' },
      { src: '/assets/images/logo/@logo--nexus-studios.svg', alt: 'Nexus Studios' },
      { src: '/assets/images/logo/@logo--cocacola.svg', alt: 'Coca Cola' },
    ],
  ],
};
