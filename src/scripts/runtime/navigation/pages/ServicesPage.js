import Page from "./Page.js";
import properties from "../../core/Properties.js";
import { visuals } from "../../webgl/Stage3D.js";
import { servicesStage } from "../../scenes/services/ServicesStage.js";

/**
 * Services Page Controller (Handles both /services and /services/[slug])
 */
class ServicesPage extends Page {
  path = /^services(\/([^\/]+))?$/;
  id = "services";
  endVisualColor = properties.blueColorHex;

  preInit(e) {
    super.preInit(e);
    if (!visuals.stage3DList.includes(servicesStage)) {
      visuals.stage3DList.push(servicesStage);
    }
    servicesStage.preInit();
  }

  init() {
    super.init();
    servicesStage.init();
  }

  resize(w, h) {
    super.resize(w, h);
    servicesStage.resize(w, h);
  }

  update(e, t, r, n, a) {
    super.update(e, t, r, n, a);
    servicesStage.isActive = true;
  }

  show(e, t, r) {
    super.show(e, t, r);
    servicesStage.isActive = true;
  }

  hide(e, t, r) {
    super.hide(e, t, r);
    servicesStage.isActive = false;
  }

  onPageShow() {
    super.onPageShow();
    servicesStage.isActive = true;
  }

  onPageHide() {
    super.onPageHide();
    servicesStage.isActive = false;
  }
}

const servicesPage = new ServicesPage();
export { ServicesPage, servicesPage };
globalThis.servicesPage = servicesPage;
export default servicesPage;
