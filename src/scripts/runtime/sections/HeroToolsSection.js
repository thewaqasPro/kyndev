/**
 * Hero Tools Section Controller
 * Isolated component controller for the interactive 3D Marketing Tools Physics Section.
 */
import { HeroToolsScene } from "../../../components/home/HeroTools/HeroToolsScene.ts";
import audios from "../audio/Audios.js";

class HeroToolsSection {
  domContainer = null;
  domVisualContainer = null;
  domHudIcon = null;
  domHudName = null;
  domHudSub = null;
  domImpulseBtn = null;
  scene = null;
  _onImpulseClick = null;

  preInit(container) {
    const root = container || document;
    this.domContainer = root.querySelector("#home-hero-tools");
    if (!this.domContainer) return;

    this.domVisualContainer = this.domContainer.querySelector("#hero-tools-canvas-container");
    this.domHudIcon = this.domContainer.querySelector("#hero-tools-hud-icon");
    this.domHudName = this.domContainer.querySelector("#hero-tools-hud-name");
    this.domHudSub = this.domContainer.querySelector("#hero-tools-hud-sub");
    this.domImpulseBtn = this.domContainer.querySelector("#hero-tools-impulse-btn");
  }

  init() {
    if (!this.domContainer || !this.domVisualContainer?.isConnected) {
      this.preInit();
    }
    if (!this.domVisualContainer) return;

    // Clean existing scene if re-mounting
    if (this.scene) {
      this.scene.destroy();
      this.scene = null;
    }

    // Clear any residual elements
    while (this.domVisualContainer.firstChild) {
      this.domVisualContainer.removeChild(this.domVisualContainer.firstChild);
    }

    try {
      this.scene = new HeroToolsScene(this.domVisualContainer);

      this.scene.onToolSelect = (tool) => {
        if (this.domHudIcon) {
          this.domHudIcon.textContent = tool.name.charAt(0);
          this.domHudIcon.style.backgroundColor = tool.primaryColor;
        }
        if (this.domHudName) {
          this.domHudName.textContent = tool.name;
          this.domHudName.style.color = tool.primaryColor;
        }
        if (this.domHudSub) {
          this.domHudSub.textContent = tool.subtitle;
        }
        audios?.countPlay?.("click");
      };

      if (this.domImpulseBtn && !this._onImpulseClick) {
        this._onImpulseClick = () => {
          this.scene?.applyImpulseToAll();
          audios?.countPlay?.("click");
        };
        this.domImpulseBtn.addEventListener("click", this._onImpulseClick);
      }
    } catch (err) {
      console.warn("[HeroToolsSection] Error initializing 3D scene:", err);
    }
  }

  resize(w, h) {
    // HeroToolsScene internally manages viewport resizing
  }

  update(dt) {
    // HeroToolsScene maintains its own physics loop
  }

  hide() {
    if (this.scene) {
      this.scene.destroy();
      this.scene = null;
    }
    if (this.domImpulseBtn && this._onImpulseClick) {
      this.domImpulseBtn.removeEventListener("click", this._onImpulseClick);
      this._onImpulseClick = null;
    }
  }
}

export const heroToolsSection = new HeroToolsSection();
globalThis.heroToolsSection = heroToolsSection;
export default heroToolsSection;
