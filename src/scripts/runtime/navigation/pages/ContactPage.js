import Page from "./Page.js";
import properties from "../../core/Properties.js";
import { visuals } from "../../webgl/Stage3D.js";
import { contactStage } from "../../scenes/contact/ContactStage.js";

/**
 * Contact Page Controller with 3D Chrome Fluid Orb
 */
class ContactPage extends Page {
  path = "contact";
  id = "contact";
  endVisualColor = properties.blueColorHex;

  preInit(e) {
    super.preInit(e);
    if (!visuals.stage3DList.includes(contactStage)) {
      visuals.stage3DList.push(contactStage);
    }
    contactStage.preInit();
  }

  init() {
    super.init();
    contactStage.init();
  }

  resize(w, h) {
    super.resize(w, h);
    contactStage.resize(w, h);
  }

  show(e, t, r) {
    super.show(e, t, r);
    contactStage.isActive = true;
  }

  hide(e, t, r) {
    super.hide(e, t, r);
    contactStage.isActive = false;
  }

  onPageShow() {
    super.onPageShow();
    contactStage.isActive = true;
  }

  onPageHide() {
    super.onPageHide();
    contactStage.isActive = false;
  }
}

const contactPage = new ContactPage();
export { ContactPage, contactPage };
globalThis.contactPage = contactPage;
export default contactPage;
