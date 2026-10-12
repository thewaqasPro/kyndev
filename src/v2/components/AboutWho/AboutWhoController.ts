import { audioManager } from '../../shared/audio';
import { AboutWhoScene3D } from './AboutWhoScene3D';

export interface TeamMember {
  id: string;
  num: string;
  name: string;
  role: string;
  bio: string;
  location: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'edan',
    num: '001',
    name: 'Edan Kwan',
    role: 'Cofounder & Creative Director',
    bio: 'Pioneering WebGL generative systems, bespoke shader design, and cinematic digital production.',
    location: 'London, UK',
  },
  {
    id: 'pierre',
    num: '002',
    name: 'Pierre Pro',
    role: 'Lead Systems Architect & Tech Director',
    bio: 'Specialist in high-concurrency modular architectures, 3D WebGL context pooling, and full-stack performance.',
    location: 'Zurich, CH',
  },
  {
    id: 'paul',
    num: '003',
    name: 'Paul Vance',
    role: 'Senior 3D & Procedural Artist',
    bio: 'Sculpting high-density procedural geometries, PBR material synthesis, and kinetic motion physics.',
    location: 'Tokyo, JP',
  },
  {
    id: 'sunny',
    num: '004',
    name: 'Sunny Rostova',
    role: 'Lead Motion & Interaction Designer',
    bio: 'Crafting fluid UI micro-interactions, spring mechanics, and responsive typography choreography.',
    location: 'Berlin, DE',
  },
  {
    id: 'andrii',
    num: '005',
    name: 'Andrii Laurent',
    role: 'Executive Producer & Strategy Lead',
    bio: 'Bridging high-craft digital artistry with enterprise commercial outcomes for global luxury brands.',
    location: 'Paris, FR',
  },
  {
    id: 'yannic',
    num: '006',
    name: 'Yannic Chen',
    role: 'WebGL & Creative Technologist',
    bio: 'Pushing browser graphics to native limits with GLSL compute shaders and raymarching engines.',
    location: 'Singapore, SG',
  },
];

/**
 * Controller for Kyndev V2 AboutWho & Team Showcase Component
 *
 * Coordinates:
 * 1. 3D WebGL Terrain, Floating Rocks, and Point Cloud Team Busts (AboutWhoScene3D)
 * 2. Interactive team carousel navigation with audio feedback
 * 3. Cross matrix sliding animation
 */
export class AboutWhoController {
  private container: HTMLElement | null = null;
  private currentIndex: number = 0;
  private scene3d: AboutWhoScene3D | null = null;
  private cleanups: Array<() => void> = [];

  // DOM Elements
  private elNum: HTMLElement | null = null;
  private elName: HTMLElement | null = null;
  private elRole: HTMLElement | null = null;
  private elBio: HTMLElement | null = null;
  private elLocation: HTMLElement | null = null;
  private elProgressBar: HTMLElement | null = null;

  public async init(rootElement: HTMLElement): Promise<void> {
    this.container = rootElement;
    this.elNum = this.container.querySelector('.who-team-num-val');
    this.elName = this.container.querySelector('.who-team-member-name');
    this.elRole = this.container.querySelector('.who-team-member-role');
    this.elBio = this.container.querySelector('.who-team-member-bio');
    this.elLocation = this.container.querySelector('.who-team-member-loc');
    this.elProgressBar = this.container.querySelector('.who-progress-fill');

    // Initialize 3D Scene
    this.scene3d = new AboutWhoScene3D(this.container);
    await this.scene3d.init();

    this.bindControls();
    this.renderActiveMember();
  }

  private bindControls(): void {
    if (!this.container) return;

    const prevBtn = this.container.querySelector('.who-team-prev-btn');
    const nextBtn = this.container.querySelector('.who-team-next-btn');

    if (prevBtn) {
      const onPrev = (): void => {
        audioManager.play('click');
        this.step(-1);
      };
      prevBtn.addEventListener('click', onPrev);
      this.cleanups.push(() => prevBtn.removeEventListener('click', onPrev));
    }

    if (nextBtn) {
      const onNext = (): void => {
        audioManager.play('click');
        this.step(1);
      };
      nextBtn.addEventListener('click', onNext);
      this.cleanups.push(() => nextBtn.removeEventListener('click', onNext));
    }
  }

  public step(dir: number): void {
    const total = TEAM_MEMBERS.length;
    this.currentIndex = (this.currentIndex + dir + total) % total;
    this.renderActiveMember();
  }

  private renderActiveMember(): void {
    const member = TEAM_MEMBERS[this.currentIndex];
    if (!member) return;

    if (this.elNum) this.elNum.textContent = member.num;
    if (this.elName) this.elName.textContent = member.name;
    if (this.elRole) this.elRole.textContent = member.role;
    if (this.elBio) this.elBio.textContent = member.bio;
    if (this.elLocation) this.elLocation.textContent = member.location;

    // Update 3D Team Bust Point Cloud
    this.scene3d?.setTeamMember(member.id);

    if (this.elProgressBar) {
      const progress = ((this.currentIndex + 1) / TEAM_MEMBERS.length) * 100;
      this.elProgressBar.style.width = `${progress}%`;
    }
  }

  public destroy(): void {
    this.scene3d?.destroy();
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
