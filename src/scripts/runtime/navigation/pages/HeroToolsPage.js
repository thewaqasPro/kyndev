/**
 * Hero Tools Page Controller (/hero-tools)
 * Enables seamless SPA page transitions between the original balloons hero and 3D marketing tools.
 */
import Page from "./Page.js";
import heroToolsSection from "../../sections/HeroToolsSection.js";
import { homeBalloons } from "../../scenes/hero/HomeBalloons.js";
import header from "../../ui/Header.js";

class HeroToolsPage extends Page {
  path = "hero-tools";
  id = "hero-tools";
  hasEndVisual = !1;
  updateAudio = !1;
  endSectionActiveThreshold = 0.9;

  preInit(r) {
    let e = this.domContainer || (r && r.dom) || document.getElementById("page-container-inner") || document.body;
    this.domContainer = e;
    super.preInit(r);
    heroToolsSection.preInit(this.domContainer);
  }

  init() {
    super.init();
    heroToolsSection.init();
  }

  show(e, t, r) {
    this.showDuration = 1;
    this.useGenericTransition = !0;
    if (header) {
      header.forceWhite = true;
    }
    // Ensure original balloons scene is deactivated while tools page is active
    if (homeBalloons) {
      homeBalloons.isActive = false;
    }
    heroToolsSection.preInit(this.domContainer);
    heroToolsSection.init();
    super.show(e, t, r);
  }

  hide(e, t, r) {
    this.hideDuration = 1;
    this.useGenericTransition = !0;
    if (header) {
      header.forceWhite = false;
    }
    heroToolsSection.hide();
    super.hide(e, t, r);
  }

  resize(e, t) {
    super.resize(e, t);
    heroToolsSection.resize(e, t);
  }

  update(e) {
    super.update(e);
    heroToolsSection.update(e);
  }
}

export const heroToolsPage = new HeroToolsPage();
globalThis.heroToolsPage = heroToolsPage;
export default heroToolsPage;
