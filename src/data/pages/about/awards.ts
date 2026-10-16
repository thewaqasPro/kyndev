// src/data/pages/about/awards.ts

export interface AwardItem {
  count: string;
  label: string;
}

export interface AwardGroup {
  organization: string;
  items: AwardItem[];
}

export interface ArticleFeature {
  title: string;
  href: string;
}

export interface SpeakingTalk {
  event: string;
  dateLocation: string;
}

export interface AboutAwardsData {
  awardsCategory: {
    title: string;
    totalCount: string;
    groups: AwardGroup[];
  };
  articlesCategory: {
    title: string;
    totalCount: string;
    articles: ArticleFeature[];
  };
  talksCategory: {
    title: string;
    totalCount: string;
    talks: SpeakingTalk[];
  };
}

export const aboutAwardsData: AboutAwardsData = {
  awardsCategory: {
    title: 'Awards',
    totalCount: '58',
    groups: [
      {
        organization: 'Awwwards',
        items: [
          { count: '001', label: 'Site of the Year' },
          { count: '001', label: 'Developer Site of the Year' },
          { count: '001', label: 'Site of the Month' },
          { count: '010', label: 'Site of the Day' },
          { count: '016', label: 'Honorable Mention' },
        ],
      },
      {
        organization: 'FWA',
        items: [
          { count: '001', label: 'Site of the Year' },
          { count: '002', label: 'Site of the Month' },
          { count: '017', label: 'Site of the Day' },
        ],
      },
      {
        organization: 'CSSDA',
        items: [
          { count: '001', label: 'Site of the Year' },
          { count: '001', label: 'Agency Site of the Year' },
        ],
      },
      {
        organization: 'Webby Awards',
        items: [
          { count: '002', label: 'Webby Winner' },
          { count: '002', label: 'Webby Nominee' },
        ],
      },
      {
        organization: 'Lovie Awards',
        items: [{ count: '001', label: 'Lovie Winner' }],
      },
      {
        organization: 'Drum Awards',
        items: [{ count: '001', label: 'The Drum Awards for Design' }],
      },
      {
        organization: 'CommArts',
        items: [{ count: '001', label: 'Best-in-show Interactive' }],
      },
    ],
  },
  articlesCategory: {
    title: 'Articles',
    totalCount: '03',
    articles: [
      {
        title: 'Porsche Newsroom - Driven By Dream',
        href: 'https://newsroom.porsche.com/en_US/2023/company/porsche-great-britain-wallpaper-lusion-short-film-ferry-porsche-356-london-driven-by-dreams-30982.html',
      },
      {
        title: 'Wallpaper - Driven by Dreams',
        href: 'https://www.wallpaper.com/art/porsche-driven-by-dreams',
      },
      {
        title: 'Opera North - The Turn of the Screw',
        href: 'https://www.operanorth.co.uk/news/cutting-edge-creeps-with-new-trailer-for-the-turn-of-the-screw/',
      },
    ],
  },
  talksCategory: {
    title: 'Talks',
    totalCount: '5',
    talks: [
      { event: 'Digital Design Days', dateLocation: 'Oct 2024 Milan' },
      { event: 'Awwwards Conf', dateLocation: 'Oct 2023 Amsterdam' },
      { event: 'KIKK Festival', dateLocation: 'Oct 2023 Namur' },
      { event: 'Awwwards Conf', dateLocation: 'Oct 2022 Amsterdam' },
      { event: 'Grow Paris', dateLocation: 'Nov 2018 Paris' },
    ],
  },
};
