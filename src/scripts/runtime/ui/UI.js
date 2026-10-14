import settings from '../core/Settings.js';
import properties from '../core/Properties.js';
import transitionOverlay from './TransitionOverlay.js';
import preloader from './Preloader.js';
import header from './Header.js';
import links from './Links.js';
import { pageExtraSections } from './FooterSection.js';
import videoOverlay from './VideoOverlay.js';

/**
 * Root UI Manager orchestrating DOM widgets, transitions & preloader
 */
class UI {
  domSectionsContainer = typeof document !== "undefined" ? document.querySelector("#page-container") : null;
  preInit() {
    (settings.WEBGL_OFF || (typeof document !== "undefined" && document.documentElement.classList.add("is-ready")),
      transitionOverlay.init(),
      preloader.preInit(),
      header.preInit(),
      links.preInit(),
      pageExtraSections.preInit());
  }
  preload(e, t) {
    preloader.show(e, t);
  }
  init() {
    (header.init(), links.init(), pageExtraSections.init());
  }
  start() {
    (preloader.hide(), header.show());
  }
  resize(e, t, r) {
    (transitionOverlay.resize(e, t),
      preloader.resize(e, t, r),
      links.resize(e, t),
      header.resize(e, t),
      pageExtraSections.resize(e, t),
      videoOverlay.resize(e, t));
    const a = typeof document !== "undefined" ? getComputedStyle(document.documentElement)
      .getPropertyValue("--global-border-radius")
      .split("px")[0] : 0;
    properties.globalRadius = properties.sharedUniforms.u_globalRadius.value =
      parseInt(a) || 0;
  }
  update(e) {
    (preloader.update(e),
      transitionOverlay.update(e),
      links.update(e),
      header.update(e),
      pageExtraSections.update(e),
      videoOverlay.update(e));
  }
}
const ui = new UI();
globalThis.ui = ui;

export { UI, ui };
export default ui;
