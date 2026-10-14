/**
 * AMD FidelityFX Super Resolution (FSR) Upscaler Pass
 */
import { PostEffect } from "./PostEffect.js";
class Fsr extends PostEffect {
  sharpness = 1;
  fsr;
  renderOrder = 2e3;
  init(e) {
    (Object.assign(this, e), super.init(), (this.fsr = new Fsr$1()));
  }
  render(e, t = !1) {
    ((this.fsr.sharpness = this.sharpness),
      this.fsr.render(e.fromTexture, t ? null : e.toRenderTarget),
      e.swap());
  }
}
const XHRItem = properties.loader.ITEM_CLASSES.xhr;

export { Fsr };
export default Fsr;

globalThis.Fsr = Fsr;
