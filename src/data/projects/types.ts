// src/data/projects/types.ts
export interface ProjectItem {
  type: 'image' | 'video';
  filename: string;
  width: number;
  height: number;
  fullscreen?: boolean;
}

export interface ProjectTheme {
  style: string;
  shadow: string;
  colorBg: string;
  colorHighlight: string;
  colorBtnBg: string;
  colorBtnText: string;
  colorIconBg: string;
  colorIconColor: string;
  colorText: string;
  colorBtnBgHover: string;
  colorBtnTextHover: string;
}

export interface NextProjectPreview {
  id: string;
  title: string;
  colorBg: string;
  colorText: string;
  shadow: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  tags: string;
  theme: ProjectTheme;
  descHtml: string;
  launchUrl: string;
  launchLabel: string;
  services: string[];
  links: Array<{ label: string; url: string }>;
  items: ProjectItem[];
  nextProject: NextProjectPreview;
}
