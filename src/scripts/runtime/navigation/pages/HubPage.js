/**
 * Engineering Hub Page Controller (/hub, /preview)
 * Coordinates showcases, prototypes, and components catalog.
 */
import Page from "./Page.js";

class HubPage extends Page {
  path = /^(hub|preview)$/;
  id = "hub";
  hasEndVisual = !1;
  hasExtraPages = !0;
  endSectionActiveThreshold = 0.9;

  show(e, t, r) {
    this.showDuration = 1;
    this.useGenericTransition = !0;
    super.show(e, t, r);
  }

  hide(e, t, r) {
    this.hideDuration = 1;
    this.useGenericTransition = !0;
    super.hide(e, t, r);
  }
}

export const hubPage = new HubPage();
globalThis.hubPage = hubPage;
export default hubPage;
