// src/data/projectsData.ts
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

export const projectsData: Record<string, ProjectData> = {
  "oryzo_ai": {
    "slug": "oryzo_ai",
    "title": "Oryzo AI",
    "tags": "concept • web • design • development • 3d • animation",
    "theme": {
      "style": "background-color:#1a1411",
      "shadow": "0.9",
      "colorBg": "#1a1411",
      "colorHighlight": "#dc5000",
      "colorBtnBg": "#ffedd7",
      "colorBtnText": "#192743",
      "colorIconBg": "#ffedd7",
      "colorIconColor": "#192743",
      "colorText": "#ffedd7",
      "colorBtnBgHover": "#dc5000",
      "colorBtnTextHover": "#ffedd7"
    },
    "descHtml": "<p>Oryzo AI is a self initiated project by Lusion built around a deliberately ridiculous idea: presenting a simple cork coaster as a serious AI era product launch. We treated it as a full campaign, combining premium visual production with satire to see how far craft, storytelling, and presentation could push an ordinary object.</p><p>Beyond the main website, we extended the idea across a <a href=\"https://github.com/lusionltd/ORYZO-1\" target=\"_blank\">GitHub page</a>, <a href=\"https://www.producthunt.com/products/oryzo-ai\" target=\"_blank\">Product Hunt launch</a>, <a href=\"https://x.com/lusionltd/status/2034659078840996274\" target=\"_blank\">founder video</a>, and social content. It gave us room to experiment more freely with tone and campaign thinking, while showing the same level of design, motion, and digital production we bring to client work.</p>",
    "launchUrl": "https://oryzo.ai/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL",
      "Animation"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/oryzo-ai",
        "label": "FWA SOTM"
      },
      {
        "url": "https://www.awwwards.com/sites/oryzo-ai",
        "label": "Awwwards SOTM"
      },
      {
        "url": "https://www.producthunt.com/products/oryzo-ai",
        "label": "Product Hunt"
      },
      {
        "url": "https://github.com/lusionltd/ORYZO-1",
        "label": "Github"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/oryzo_ai/main",
        "type": "video",
        "width": 1250,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/oryzo_ai/image_1",
        "type": "image",
        "width": 1296,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/oryzo_ai/launch",
        "type": "video",
        "width": 1280,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/oryzo_ai/image_2",
        "type": "image",
        "width": 1080,
        "height": 1440,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/oryzo_ai/bts",
        "type": "video",
        "width": 1280,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/oryzo_ai/founder",
        "type": "image",
        "width": 2043,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/oryzo_ai/image_3",
        "type": "image",
        "width": 1296,
        "height": 1620,
        "fullscreen": true
      }
    ],
    "nextProject": {
      "id": "atlas_motion",
      "title": "Atlas Motion",
      "colorBg": "#181818",
      "colorText": "#FFFDE0",
      "shadow": "0.95"
    }
  },
  "atlas_motion": {
    "slug": "atlas_motion",
    "title": "Atlas Motion",
    "tags": "concept • web • design • development • 3d • animation",
    "theme": {
      "style": "background-color:#181818",
      "shadow": "0.95",
      "colorBg": "#181818",
      "colorHighlight": "#F65893",
      "colorBtnBg": "#FFFDE0",
      "colorBtnText": "#192743",
      "colorIconBg": "#FFFDE0",
      "colorIconColor": "#192743",
      "colorText": "#FFFDE0",
      "colorBtnBgHover": "#F65893",
      "colorBtnTextHover": "#FFFDE0"
    },
    "descHtml": "<p>Atlas is building next generation motion systems for drones, robotics, and autonomous hardware. We worked with the team to create a focused digital experience that turns a complex manufacturing story into something clear, confident, and tangible. The site introduces Atlas’ joint development model, brings their product and factory story to the surface, and uses precise motion, visual pacing, and selective WebGL to communicate the scale of their ambition without losing the seriousness of the category.</p>",
    "launchUrl": "https://atlasmotion.com/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL",
      "Animation"
    ],
    "links": [],
    "items": [
      {
        "filename": "/assets/projects/atlas_motion/main",
        "type": "video",
        "width": 1234,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/1",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/2",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/3",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/4",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/5",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/atlas_motion/6",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "devin_ai",
      "title": "Devin AI",
      "colorBg": "#121414",
      "colorText": "#ffffff",
      "shadow": "0.9"
    }
  },
  "devin_ai": {
    "slug": "devin_ai",
    "title": "Devin AI",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#121414",
      "shadow": "0.9",
      "colorBg": "#121414",
      "colorHighlight": "#64e1ce",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#192743",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#192743",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#64e1ce",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>We partnered with Cognition AI to create a modern website for Devin, their AI software engineer. The challenge was to communicate a complex AI product in a way that felt clear, sleek, and accessible.</p> <p>Through subtle storytelling, animation, and interactive design, we introduced Devin’s features in a more engaging way and created a polished experience that felt both advanced and approachable.</p>",
    "launchUrl": "https://archive-devin-ai.lusion.co/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [],
    "items": [
      {
        "filename": "/assets/projects/devin_ai/video0",
        "type": "video",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/devin_ai/image1",
        "type": "image",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/devin_ai/video2",
        "type": "video",
        "width": 1080,
        "height": 1080,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/devin_ai/video3",
        "type": "video",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/devin_ai/image4",
        "type": "image",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "of_the_oak",
      "title": "Of The Oak",
      "colorBg": "#111a13",
      "colorText": "#d9f3de",
      "shadow": "0.9"
    }
  },
  "of_the_oak": {
    "slug": "of_the_oak",
    "title": "Of The Oak",
    "tags": "web • design • development • 3d • animation",
    "theme": {
      "style": "background-color:#111a13",
      "shadow": "0.9",
      "colorBg": "#111a13",
      "colorHighlight": "#00ab20",
      "colorBtnBg": "#d9f3de",
      "colorBtnText": "#192743",
      "colorIconBg": "#d9f3de",
      "colorIconColor": "#192743",
      "colorText": "#d9f3de",
      "colorBtnBgHover": "#00ab20",
      "colorBtnTextHover": "#d9f3de"
    },
    "descHtml": "<p><a href=\"https://marshmallowlaserfeast.com/\" target=\"_blank\">MLF</a> approached us to create a web companion for Of The Oak, their physical installation created in collaboration with <a href=\"https://www.kew.org/\" target=\"_blank\">Royal Botanic Gardens, Kew</a>. Designed to extend the project beyond the installation itself, the experience gave onsite visitors a more interactive way to engage with the work while also making it accessible to online audiences.</p> <p>The website helped bridge the physical and digital experience, offering a space for visitors to explore the project in greater depth and learn more about its story, ideas, and context.</p>",
    "launchUrl": "https://oftheoak.co.uk/",
    "launchLabel": "Launch Project",
    "services": [
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL",
      "Animation"
    ],
    "links": [
      {
        "url": "https://blooloop.com/of-the-oak/",
        "label": "blooloop"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/of_the_oak/video0",
        "type": "video",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/of_the_oak/species",
        "type": "image",
        "width": 2025,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/of_the_oak/meditation",
        "type": "image",
        "width": 2025,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/of_the_oak/making_of_artwork",
        "type": "image",
        "width": 2025,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/of_the_oak/houdini_custom_branch_flow",
        "type": "image",
        "width": 2024,
        "height": 1080,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/of_the_oak/mobile",
        "type": "image",
        "width": 1920,
        "height": 1080,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "everswap",
      "title": "Everswap",
      "colorBg": "#E3E3F8",
      "colorText": "#000",
      "shadow": "0.95"
    }
  },
  "everswap": {
    "slug": "everswap",
    "title": "Everswap",
    "tags": "concept • web • design • development • 3d • animation",
    "theme": {
      "style": "background-color:#E3E3F8",
      "shadow": "0.95",
      "colorBg": "#E3E3F8",
      "colorHighlight": "#756ACC",
      "colorBtnBg": "#000",
      "colorBtnText": "#192743",
      "colorIconBg": "#000",
      "colorIconColor": "#192743",
      "colorText": "#000",
      "colorBtnBgHover": "#756ACC",
      "colorBtnTextHover": "#000"
    },
    "descHtml": "<p>We were commissioned by the EverSwap team to create an immersive storytelling experience that makes their Web3 products feel intuitive and engaging. Inspired by the natural flow of liquidity, we built a journey through evolving terrains, rivers and lakes - transforming the complexities of trading, lending and borrowing into a fluid visual narrative of movement, connection and exchange.</p>",
    "launchUrl": "https://everswap.com/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL",
      "Animation"
    ],
    "links": [
      {
        "url": "https://www.awwwards.com/sites/everswap",
        "label": "Awwwards SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/everswap/main",
        "type": "video",
        "width": 1280,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/1",
        "type": "image",
        "width": 1679,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/2",
        "type": "image",
        "width": 2262,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/everswap/3",
        "type": "image",
        "width": 1810,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/4",
        "type": "image",
        "width": 1819,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/5",
        "type": "image",
        "width": 1885,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/everswap/6",
        "type": "image",
        "width": 1819,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/7",
        "type": "image",
        "width": 1819,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/8",
        "type": "image",
        "width": 1819,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/everswap/9",
        "type": "image",
        "width": 2280,
        "height": 1280,
        "fullscreen": true
      }
    ],
    "nextProject": {
      "id": "porsche_dream_machine",
      "title": "Porsche:&lt;br&gt;Dream Machine",
      "colorBg": "#EFD5D3",
      "colorText": "#000000",
      "shadow": "0.95"
    }
  },
  "porsche_dream_machine": {
    "slug": "porsche_dream_machine",
    "title": "Porsche: Dream Machine",
    "tags": "concept • 3D illustration • mograph • video",
    "theme": {
      "style": "background-color:#EFD5D3",
      "shadow": "0.95",
      "colorBg": "#EFD5D3",
      "colorHighlight": "#621422",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#621422",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#621422",
      "colorText": "#000000",
      "colorBtnBgHover": "#621422",
      "colorBtnTextHover": "#EFD5D3"
    },
    "descHtml": "<p>Commissioned by Wallpaper* and Porsche GB, Lusion created a CG short film inspired by the visionary ambitions of Porsche founder Ferry Porsche.</p> <p>Directed by Edan Kwan, the piece takes audiences on a four phase journey through the evolution of Porsche sports cars, expressed through digital art and motion design. The work was later showcased at Outernet London across 23,000 square feet of wraparound floor to ceiling 16K LED screens.</p>",
    "launchUrl": "https://player.vimeo.com/video/783015830",
    "launchLabel": "Watch Video",
    "services": [
      "Concept",
      "3D Design",
      "Motion Design",
      "Compositing"
    ],
    "links": [
      {
        "url": "https://www.wallpaper.com/art/porsche-driven-by-dreams",
        "label": "Wallpaper*"
      },
      {
        "url": "https://newsroom.porsche.com/en_PME/2023/company/porsche-great-britain-wallpaper-lusion-short-film-ferry-porsche-356-london-driven-by-dreams-30955.html",
        "label": "Porsche Newsroom"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/porsche_dream_machine/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/video1",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image2",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image5",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image8",
        "type": "image",
        "width": 2026,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image11",
        "type": "image",
        "width": 1620,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image12",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image14",
        "type": "image",
        "width": 1620,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/porsche_dream_machine/image16",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "synthetic_human",
      "title": "Synthetic Human",
      "colorBg": "#9d8aff",
      "colorText": "#ffffff",
      "shadow": "0.95"
    }
  },
  "synthetic_human": {
    "slug": "synthetic_human",
    "title": "Synthetic Human",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#9d8aff",
      "shadow": "0.95",
      "colorBg": "#9d8aff",
      "colorHighlight": "#caddff",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#192743",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#192743",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#bad3ff",
      "colorBtnTextHover": "#192743"
    },
    "descHtml": "<p>We partnered with Fantasy to launch the campaign website for Synthetic Humans, their new AI product. The goal was to create a visually rich digital experience that could support the ambition and identity of the launch.</p> <p>Our team developed a Houdini FX based workflow to optimize high quality 3D assets for real time use on the web, alongside building the interactive front end of the site. We also created the procedural animations and visual effects that gave the experience its depth, movement, and character.</p>",
    "launchUrl": "https://synthetic-humans.ai/",
    "launchLabel": "Launch Project",
    "services": [
      "Creative Coding",
      "Animation",
      "Frontend development",
      "3D Visual optimization"
    ],
    "links": [],
    "items": [
      {
        "filename": "/assets/projects/synthetic_human/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/synthetic_human/image1",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/synthetic_human/image2",
        "type": "image",
        "width": 1920,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/synthetic_human/image3",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/synthetic_human/image4",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/synthetic_human/image5",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/synthetic_human/image6",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "ddd_2024",
      "title": "DDD 2024",
      "colorBg": "#261c46",
      "colorText": "#ffffff",
      "shadow": "0.95"
    }
  },
  "ddd_2024": {
    "slug": "ddd_2024",
    "title": "DDD 2024",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#261c46",
      "shadow": "0.95",
      "colorBg": "#261c46",
      "colorHighlight": "#4ef0e1",
      "colorBtnBg": "#000000",
      "colorBtnText": "#261c46",
      "colorIconBg": "#4ef0e1",
      "colorIconColor": "#261c46",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#7731E9",
      "colorBtnTextHover": "#261c46"
    },
    "descHtml": "<p>Digital Design Days is a 3-day experience that gathers in one place thousands of the world’s best professionals with the brightest creativity minds in the industry and the most innovative brands.</p>",
    "launchUrl": "https://1105-ddd2024-homepage.lusion.co",
    "launchLabel": "Launch Project",
    "services": [
      "UI/UX design",
      "3D Visual design",
      "Creative Coding",
      "Frontend development",
      "Animation"
    ],
    "links": [],
    "items": [
      {
        "filename": "/assets/projects/ddd_2024/video0",
        "type": "video",
        "width": 1152,
        "height": 720,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/ddd_2024/image1",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/ddd_2024/image2",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/ddd_2024/image3",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "spaace",
      "title": "Spaace",
      "colorBg": "#010a16",
      "colorText": "#ffece2",
      "shadow": "0.85"
    }
  },
  "spaace": {
    "slug": "spaace",
    "title": "Spaace",
    "tags": "web • design • development • 3d • web3",
    "theme": {
      "style": "background-color:#010a16",
      "shadow": "0.85",
      "colorBg": "#010a16",
      "colorHighlight": "#ff7225",
      "colorBtnBg": "#ffece2",
      "colorBtnText": "#ff7225",
      "colorIconBg": "#ffece2",
      "colorIconColor": "#ff7225",
      "colorText": "#ffece2",
      "colorBtnBgHover": "#ff7225",
      "colorBtnTextHover": "#ffece2"
    },
    "descHtml": "<p>We worked with Spaace to bring this immersive brand website for their newly released gamification NFT marketplace.</p><p>From creative and production, we took their raw brand material and take it into a whole new level of storytelling in this interactive web experience.</p>",
    "launchUrl": "https://spaace.io",
    "launchLabel": "Launch Project",
    "services": [
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://www.awwwards.com/sites/spaace",
        "label": "Awwwards SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/spaace/video0",
        "type": "video",
        "width": 1146,
        "height": 714,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spaace/image1",
        "type": "image",
        "width": 1600,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/spaace/image2",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spaace/image3",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spaace/image4",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spaace/image5",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spaace/image6",
        "type": "image",
        "width": 1820,
        "height": 1024,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "choo_choo_world",
      "title": "Choo Choo World",
      "colorBg": "#E8EEF8",
      "colorText": "#000000",
      "shadow": "0.95"
    }
  },
  "choo_choo_world": {
    "slug": "choo_choo_world",
    "title": "Choo Choo World",
    "tags": "concept • web • game design • 3d",
    "theme": {
      "style": "background-color:#E8EEF8",
      "shadow": "0.95",
      "colorBg": "#E8EEF8",
      "colorHighlight": "#0591F6",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#0591F6",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#0591F6",
      "colorText": "#000000",
      "colorBtnBgHover": "#0591F6",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>Choo Choo World, a research project by Lusion, aimed to create an enjoyable mini game for all ages, demonstrating web technology's positive potential. It offered a fun introduction to the web, aligned with Lusion’s founders' experiences as parents.</p><p>With a community-building feature, users shared game snapshots on social media, showcasing engagement strategies. Choo Choo World embodies Lusion's commitment to innovative web technology, inspiring both children and adults</p>",
    "launchUrl": "https://choochooworld.com/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Game Design",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/choo-choo-world",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/choo-choo-world",
        "label": "Awwwards HM"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/choo_choo_world/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image2",
        "type": "image",
        "width": 2428,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/choo_choo_world/video1",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/video2",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image10",
        "type": "image",
        "width": 2270,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/choo_choo_world/image11",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image12",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image14",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image16",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image17",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/choo_choo_world/image18",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "zero_tech",
      "title": "Zero Tech",
      "colorBg": "#192743",
      "colorText": "#ffffff",
      "shadow": "0.9"
    }
  },
  "zero_tech": {
    "slug": "zero_tech",
    "title": "Zero Tech",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#192743",
      "shadow": "0.9",
      "colorBg": "#192743",
      "colorHighlight": "#15E2FE",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#192743",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#192743",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#15E2FE",
      "colorBtnTextHover": "#192743"
    },
    "descHtml": "<p>Zero approached us to design an engaging interactive website for Zero.Tech. With a focus on captivating and informing their tech-savvy audience, we seamlessly merged realtime 3D visuals and scroll navigation.</p><p>This created an immersive, visually stunning platform that effectively communicated Zero's innovation and solidified their position as a technology leader.</p>",
    "launchUrl": "https://client-zero-tech.lusion.co/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/zero-tech",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/zero-tech",
        "label": "Awwwards SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/zero_tech/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image2",
        "type": "image",
        "width": 2160,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/zero_tech/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image7",
        "type": "image",
        "width": 2790,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/zero_tech/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image11",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image12",
        "type": "image",
        "width": 2502,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/zero_tech/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/zero_tech/image14",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "spatial_fusion",
      "title": "Meta: Spatial Fusion",
      "colorBg": "#D6C8ED",
      "colorText": "#000000",
      "shadow": "0.95"
    }
  },
  "spatial_fusion": {
    "slug": "spatial_fusion",
    "title": "Meta: Spatial Fusion",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#D6C8ED",
      "shadow": "0.95",
      "colorBg": "#D6C8ED",
      "colorHighlight": "#7731E9",
      "colorBtnBg": "#000000",
      "colorBtnText": "#7731E9",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#7731E9",
      "colorText": "#000000",
      "colorBtnBgHover": "#7731E9",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>Lusion partnered with Phoria and Meta to create Spatial Fusion, an immersive WebXR experience that pushed the possibilities of web based mixed reality. Built with technologies such as spatial anchors, plane detection, and full color passthrough, the project explored new ways for users to interact with digital content in physical space.</p> <p>Bringing together expertise across creative technology, immersive design, and web development, the collaboration helped turn a complex technical challenge into a seamless spatial storytelling experience. The result was a forward looking mixed reality venture that invited users into a new kind of interactive world.</p>",
    "launchUrl": "https://spatialfusion.io/",
    "launchLabel": "Launch Project",
    "services": [
      "Web Design",
      "Web Development",
      "WebGL",
      "WebXR"
    ],
    "links": [
      {
        "url": "https://www.webbyawards.com/crafted-with-code/spatial-fusion/",
        "label": "Webby Nominee"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/spatial_fusion/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image2",
        "type": "image",
        "width": 2478,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/spatial_fusion/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image7",
        "type": "image",
        "width": 2381,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/spatial_fusion/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image11",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/spatial_fusion/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image14",
        "type": "image",
        "width": 1701,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/spatial_fusion/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image16",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/spatial_fusion/image17",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "worldcoin",
      "title": "Worldcoin Globe",
      "colorBg": "#F3F4F9",
      "colorText": "#000000",
      "shadow": "0.975"
    }
  },
  "worldcoin": {
    "slug": "worldcoin",
    "title": "Worldcoin Globe",
    "tags": "api design • webgl • 3d",
    "theme": {
      "style": "background-color:#F3F4F9",
      "shadow": "0.975",
      "colorBg": "#F3F4F9",
      "colorHighlight": "#000000",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#000000",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#000000",
      "colorText": "#000000",
      "colorBtnBgHover": "#000000",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>In collaboration with <a href=\"https://www.toolsforhumanity.com/\" target=\"_blank\">Tools for Humanity</a>, we successfully integrated the dynamic Worldcoin 3D globe visualizer onto their website.</p><p>Our team crafted specialized APIs, empowering the Worldcoin developer team to seamlessly activate visual effects in response to real-time user registration data. Furthermore, we innovatively embedded and compressed country and visual information into an image data format, optimizing GPU-based rendering for efficiency and speed.</p>",
    "launchUrl": "https://worldcoin.org/",
    "launchLabel": "Launch Project",
    "services": [
      "API Design",
      "3D Design",
      "WebGL"
    ],
    "links": [],
    "items": [
      {
        "filename": "/assets/projects/worldcoin/image1",
        "type": "image",
        "width": 1679,
        "height": 1024,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/worldcoin/image2",
        "type": "image",
        "width": 1918,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/worldcoin/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/worldcoin/image4",
        "type": "image",
        "width": 1517,
        "height": 1280,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/worldcoin/image3",
        "type": "image",
        "width": 1500,
        "height": 1024,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "lusion_labs",
      "title": "Lusion Labs",
      "colorBg": "#1F2022",
      "colorText": "#ffffff",
      "shadow": "0.85"
    }
  },
  "lusion_labs": {
    "slug": "lusion_labs",
    "title": "Lusion Labs",
    "tags": "web • design • development • 3d",
    "theme": {
      "style": "background-color:#1F2022",
      "shadow": "0.85",
      "colorBg": "#1F2022",
      "colorHighlight": "#8C8C8D",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#000000",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#000000",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#D9D9DA",
      "colorBtnTextHover": "#000000"
    },
    "descHtml": "<p>Lusion's Dedication to Innovation and Exploration. Our dedicated space showcases internal R&D initiatives, reflecting our commitment to tech advancement. With a sleek, enchanting design, the site offers exclusive insights into our ongoing research, sparking curiosity and inspiring engaging experiences.</p><p>Pioneering the Future of Tech-Driven Advertising. For our clients, this website unveils uncharted possibilities. Displaying our prowess with groundbreaking tech, it inspires fresh avenues for captivating and engaging target audiences.</p>",
    "launchUrl": "https://labs.lusion.co/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/lusion-labs",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/lusion-labs",
        "label": "Awwwards SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/lusion_labs/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image2",
        "type": "image",
        "width": 2480,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/lusion_labs/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image8",
        "type": "image",
        "width": 2234,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/lusion_labs/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image11",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image12",
        "type": "image",
        "width": 2234,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/lusion_labs/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image14",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/lusion_labs/image16",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "my_little_story_book",
      "title": "My Little Storybook",
      "colorBg": "#D1DDF2",
      "colorText": "#000000",
      "shadow": "0.95"
    }
  },
  "my_little_story_book": {
    "slug": "my_little_story_book",
    "title": "My Little Storybook",
    "tags": "concept • design • development • 3d",
    "theme": {
      "style": "background-color:#D1DDF2",
      "shadow": "0.95",
      "colorBg": "#D1DDF2",
      "colorHighlight": "#6680A0",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#6680A0",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#6680A0",
      "colorText": "#000000",
      "colorBtnBgHover": "#6680A0",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>Expanding Boundaries through Cinematic Innovation. An R&D feat by Lusion, this project showcased team versatility and artistry. We crafted 3D assets from scratch and seamlessly blended hand-drawn sketches into a captivating WebGL environment for a unique experience.</p><p>Crafting My Little Storybook's Triumph. The Lusion team meticulously shaped every element in this challenging one-month project. Their dedication resulted in acclaim, with multiple awards, including the coveted 2022 Webby Award for Best Visual Design Aesthetic, recognizing the blend of innovation and creativity.</p>",
    "launchUrl": "https://exp-my-little-storybook.lusion.co/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/my-little-storybook",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/my-little-storybook",
        "label": "Awwwards SOTD"
      },
      {
        "url": "https://winners.webbyawards.com/2022/websites-and-mobile-sites/features-design/best-visual-design-aesthetic/206405/my-little-storybook",
        "label": "Webby Winner"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/my_little_story_book/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image2",
        "type": "image",
        "width": 2428,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/my_little_story_book/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image8",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/my_little_story_book/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image11",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image12",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/my_little_story_book/image14",
        "type": "image",
        "width": 1637,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/my_little_story_book/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "soda_experience",
      "title": "Soda Experience",
      "colorBg": "#E1E2E4",
      "colorText": "#000000",
      "shadow": "0.85"
    }
  },
  "soda_experience": {
    "slug": "soda_experience",
    "title": "Soda Experience",
    "tags": "AR • development • 3d",
    "theme": {
      "style": "background-color:#E1E2E4",
      "shadow": "0.85",
      "colorBg": "#E1E2E4",
      "colorHighlight": "#F40009",
      "colorBtnBg": "#FFFFFF",
      "colorBtnText": "#F40009",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#F40009",
      "colorText": "#000000",
      "colorBtnBgHover": "#F40009",
      "colorBtnTextHover": "#ffffff"
    },
    "descHtml": "<p>Lusion teamed up with GoSpooky to embark on an exciting journey with Coca-Cola European Partners. Our mission? To elevate the way soft drinks are served by bringing the magic of web-based augmented reality (AR) to the beverage experience.</p><p>Faced with a tight timeline due to a previous vendor's shortfall, Lusion undertook the challenge to create a lifelike WebAR encounter that would make Coca-Cola's drink offerings burst to life.</p>",
    "launchUrl": "",
    "launchLabel": "Launch Project",
    "services": [
      "3D Optimization",
      "WebGL",
      "WebAR"
    ],
    "links": [
      {
        "url": "https://www.8thwall.com/blog/post/52515703897/coca-cola-europacific-partners-nl-is-the-first-company-in-the-world-to-add-ar-experience-to-the-serving-of-soft-drinks",
        "label": "8th Wall Blog"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/soda_experience/image1",
        "type": "image",
        "width": 1780,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/image2",
        "type": "image",
        "width": 2428,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/soda_experience/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/soda_experience/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "infinite_passerella",
      "title": "Infinite Passerella",
      "colorBg": "#28262B",
      "colorText": "#ffffff",
      "shadow": "0.9"
    }
  },
  "infinite_passerella": {
    "slug": "infinite_passerella",
    "title": "Infinite Passerella",
    "tags": "concept • design • development • 3d",
    "theme": {
      "style": "background-color:#28262B",
      "shadow": "0.9",
      "colorBg": "#28262B",
      "colorHighlight": "#FFB9B9",
      "colorBtnBg": "#FFB9B9",
      "colorBtnText": "#28262B",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#28262B",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#FFB9B9",
      "colorBtnTextHover": "#28262B"
    },
    "descHtml": "<p>A New Era in Fashion Showcase. Lusion's R&D journey transforms fashion shows into interactive virtual experiences, inviting viewers worldwide to a 24/7 spectacle.</p><p>Meticulously crafted clothing textures and 3D models seamlessly merge fashion and technology, captivating enthusiasts. This pioneering project bridges the realms of fashion and digital innovation, paving the way for the future of virtual fashion.</p>",
    "launchUrl": "https://exp-infinite-passerella.lusion.co/",
    "launchLabel": "Launch Project",
    "services": [
      "Concept",
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/infinite-passerella",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/infinite-passerella",
        "label": "Awwwards SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/infinite_passerella/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image2",
        "type": "image",
        "width": 2428,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/infinite_passerella/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/video1",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image7",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/infinite_passerella/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "the_turn_of_the_screw",
      "title": "The Turn Of The Screw",
      "colorBg": "#2B3037",
      "colorText": "#ffffff",
      "shadow": "0.85"
    }
  },
  "the_turn_of_the_screw": {
    "slug": "the_turn_of_the_screw",
    "title": "The Turn Of The Screw",
    "tags": "design • development • 3d",
    "theme": {
      "style": "background-color:#2B3037",
      "shadow": "0.85",
      "colorBg": "#2B3037",
      "colorHighlight": "#D5BFEF",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#2B3037",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#2B3037",
      "colorText": "#ffffff",
      "colorBtnBgHover": "#D5BFEF",
      "colorBtnTextHover": "#2B3037"
    },
    "descHtml": "<p>In October 2019, Opera North, alongside the Audiolab of York University and the sound artist James Bulley, came to Lusion for a collaboration on an innovative cultural project. Their idea was to record the Turn of the Screw opera in a spatialized way, then place these recordings in an explorable 3D environment. The main goal of this project was to create an audiovisual walk through a binaural landscape.</p>",
    "launchUrl": "https://www.operanorth.co.uk/turn-of-the-screw-immersive-trailer/",
    "launchLabel": "Launch Project",
    "services": [
      "Web Design",
      "Web Development",
      "3D Design",
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/the-turn-of-the-screw",
        "label": "FWA SOTD"
      },
      {
        "url": "https://www.awwwards.com/sites/the-turn-of-the-screw",
        "label": "Awwwards SOTM"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image2",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image3",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image7",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image9",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image11",
        "type": "image",
        "width": 2684,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image12",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/the_turn_of_the_screw/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "maxmara_bearings_gifts",
      "title": "Max Mara: Bearing Gifts",
      "colorBg": "#d2c6b2",
      "colorText": "#000000",
      "shadow": "0.95"
    }
  },
  "maxmara_bearings_gifts": {
    "slug": "maxmara_bearings_gifts",
    "title": "Max Mara: Bearing Gifts",
    "tags": "development • 3D",
    "theme": {
      "style": "background-color:#d2c6b2",
      "shadow": "0.95",
      "colorBg": "#d2c6b2",
      "colorHighlight": "#806542",
      "colorBtnBg": "#ffffff",
      "colorBtnText": "#806542",
      "colorIconBg": "#ffffff",
      "colorIconColor": "#806542",
      "colorText": "#000000",
      "colorBtnBgHover": "#D5BFEF",
      "colorBtnTextHover": "#FFFFFF"
    },
    "descHtml": "<p>Collaborating with LOW: Transforming Digital Experiences. Our partnership on the MaxMara project showcases how creativity shapes digital landscapes. LOW's vision for a charming interactive web experience led to Max the Teddy guiding users through playful scenes and product showcases.</p><p>Central to our approach is meticulous planning, aligning render quality, timelines, and budgets for creative practicality. Transparent communication with LOW's team fostered a shared vision, enabling us to explore unique possibilities.</p><p>Strategic decisions ensured consistent experiences across devices, including non-real-time lighting for optimized performance. Collaborating with 3D modeling vendors enriched the application with carefully designed assets, seamlessly integrating our services.</p>",
    "launchUrl": "",
    "launchLabel": "Launch Project",
    "services": [
      "WebGL"
    ],
    "links": [
      {
        "url": "https://thefwa.com/cases/maxmara-bearing-gifts",
        "label": "FWA SOTD"
      }
    ],
    "items": [
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image1",
        "type": "image",
        "width": 1870,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/video0",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image2",
        "type": "image",
        "width": 2880,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image3",
        "type": "image",
        "width": 2016,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image4",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image5",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image6",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image7",
        "type": "image",
        "width": 2386,
        "height": 1620,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image8",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/video1",
        "type": "video",
        "width": 16,
        "height": 9,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image9",
        "type": "image",
        "width": 1638,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image10",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image11",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image12",
        "type": "image",
        "width": 2880,
        "height": 1660,
        "fullscreen": true
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image13",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image14",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      },
      {
        "filename": "/assets/projects/maxmara_bearings_gifts/image15",
        "type": "image",
        "width": 2026,
        "height": 1140,
        "fullscreen": false
      }
    ],
    "nextProject": {
      "id": "oryzo_ai",
      "title": "Oryzo AI",
      "colorBg": "#1a1411",
      "colorText": "#ffedd7",
      "shadow": "0.9"
    }
  }
};

export const projectsList: ProjectData[] = Object.values(projectsData);
