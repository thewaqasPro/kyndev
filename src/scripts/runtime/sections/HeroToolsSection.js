/**
 * Hero Tools Section Controller
 * Isolated component controller for the interactive 3D Marketing Tools Physics Section.
 * Supports Full Deck (default) and 40/60 Split Column layout modes.
 */
import { HeroToolsScene } from "../../../components/home/HeroTools/HeroToolsScene.ts";
import audios from "../audio/Audios.js";

class HeroToolsSection {
  domContainer = null;
  domVisualContainer = null;
  domDeck = null;
  domHudIcon = null;
  domHudName = null;
  domHudSub = null;
  domImpulseBtn = null;
  domSplitImpulseBtn = null;
  scene = null;
  _onImpulseClick = null;
  _onSplitImpulseClick = null;

  preInit(container) {
    const root = container || document;
    this.domContainer = root.querySelector("#home-hero-tools");
    if (!this.domContainer) return;

    this.domDeck = this.domContainer.querySelector("#hero-tools-deck");
    this.domVisualContainer = this.domContainer.querySelector("#hero-tools-canvas-container");
    this.domHudIcon = this.domContainer.querySelector("#hero-tools-hud-icon");
    this.domHudName = this.domContainer.querySelector("#hero-tools-hud-name");
    this.domHudSub = this.domContainer.querySelector("#hero-tools-hud-sub");
    this.domImpulseBtn = this.domContainer.querySelector("#hero-tools-impulse-btn");
    this.domSplitImpulseBtn = this.domContainer.querySelector("#hero-tools-split-impulse-btn");
  }

  setLayout(mode) {
    if (!this.domDeck) return;
    const targetMode = mode === "split" ? "split" : "full";
    this.domDeck.setAttribute("data-layout", targetMode);

    // Update toggle button states
    const toggleBtns = this.domContainer?.querySelectorAll("[data-set-layout]");
    toggleBtns?.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-set-layout") === targetMode);
    });

    // Give DOM time to reflow, then update 3D scene viewport & boundaries
    setTimeout(() => {
      this.scene?.onResize?.();
      this.scene?.applyImpulseToAll?.();
    }, 60);
  }

  init() {
    if (!this.domContainer || !this.domVisualContainer?.isConnected) {
      this.preInit();
    }
    if (!this.domVisualContainer) return;

    // Check URL query parameters for layout selection
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("layout") === "split") {
        this.setLayout("split");
      }
    } catch (e) {}

    // Wire up interactive layout toggle buttons in the banner
    const toggleBtns = this.domContainer.querySelectorAll("[data-set-layout]");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const mode = btn.getAttribute("data-set-layout");
        this.setLayout(mode);
        audios?.countPlay?.("click");
      });
    });

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

      if (this.domSplitImpulseBtn && !this._onSplitImpulseClick) {
        this._onSplitImpulseClick = () => {
          this.scene?.applyImpulseToAll();
          audios?.countPlay?.("click");
        };
        this.domSplitImpulseBtn.addEventListener("click", this._onSplitImpulseClick);
      }
    } catch (err) {
      console.warn("[HeroToolsSection] Error initializing 3D scene:", err);
    }
  }

  resize(w, h) {
    this.scene?.onResize?.();
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
    if (this.domSplitImpulseBtn && this._onSplitImpulseClick) {
      this.domSplitImpulseBtn.removeEventListener("click", this._onSplitImpulseClick);
      this._onSplitImpulseClick = null;
    }
  }
}

export const heroToolsSection = new HeroToolsSection();
globalThis.heroToolsSection = heroToolsSection;
export default heroToolsSection;
