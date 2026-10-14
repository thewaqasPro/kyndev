/**
 * Global experience runtime configuration & feature flags
 */
import browser from "./Browser.js";
const browser$1 = browser;
let CDN_PATH = "";
class Settings {
  CDN_PATH = "";
  TEAM_PATH = "/assets/team/";
  PROJECT_PATH = "/assets/projects/";
  MODEL_PATH = "/assets/models/";
  IMAGE_PATH = "/assets/images/";
  TEXTURE_PATH = "/assets/textures/";
  AUDIO_PATH = "/assets/audios/";
  SPRITE_PATH = "/assets/sprites/";
  RENDER_TARGET_FLOAT_TYPE = null;
  DATA_FLOAT_TYPE = null;
  USE_FLOAT_PACKING = !1;
  USE_WEBGL2 = !0;
  DPR = Math.min(1.5, browser$1.devicePixelRatio) || 1;
  USE_PIXEL_LIMIT = !0;
  MAX_PIXEL_COUNT = 2560 * 1440;
  MOBILE_WIDTH = 812;
  IS_SMALL_SCREEN = Math.min(window.screen.width, window.screen.height) <= 820;
  JUMP_SECTION = "";
  JUMP_OFFSET = 0;
  USE_HD = !1;
  SHOW_DETAILS = "";
  CROSS_ORIGINS = { "https://lusion.dev/": "anonymous" };
  IS_DEV = !1;
  LOG = !1;
  SKIP_ANIMATION = !1;
  WEBGL_OFF = !1;
  LOOK_DEV_MODE = !1;
  TEST_TUNNEL = !1;
  HOME_TEST = !1;
  OPEN_CONTACT = !1;
  TEST_BALLOONS = !1;
  BALLOON_COLOR = "";
  USE_AUDIO = browser$1.isSupportOgg && !browser$1.isMobile;
  constructor() {
    if (window.URLSearchParams) {
      const t = ((r) =>
        [...r].reduce((n, [a, l]) => ((n[a] = l === "" ? !0 : l), n), {}))(
        new URLSearchParams(window.location.search),
      );
      this.override(t);
      for (const r in this)
        r.indexOf("_PATH") > -1 &&
          ((this["LOCAL_" + r] = this[r]), (this[r] = CDN_PATH + this[r]));
    }
  }
  override(e) {
    for (const t in e)
      if (this[t] !== void 0) {
        const r = e[t].toString();
        typeof this[t] == "boolean"
          ? (this[t] = !(r === "0" || r === !1))
          : typeof this[t] == "number"
            ? (this[t] = parseFloat(r))
            : typeof this[t] == "string" && (this[t] = r);
      }
    this.USE_HD && (this.USE_PIXEL_LIMIT = !1);
  }
}
const settings = new Settings();
globalThis.settings = settings;

export { Settings, settings };
export default settings;
