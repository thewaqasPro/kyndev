/**
 * Animated Percentage Counter Preloader
 */
import properties from '../core/Properties.js';
import settings from '../core/Settings.js';
import math from '../core/MathUtils.js';
import ease from '../core/Ease.js';
import taskManager from '../core/TaskManager.js';
import transitionOverlay from './TransitionOverlay.js';

class Preloader {
  percentTarget = 0;
  percent = 0;
  percentToStart = 0;
  DELAY = 1.5;
  MIN_PRELOAD_DURATION = 1;
  PERCENT_BETWEEN_INIT_AND_START = 0.3;
  MIN_DURATION_BETWEEN_INIT_AND_START = 0.25;
  HIDE_DURATION = 0.5;
  isActive = !1;
  lineTransformTime = 0;
  digitsWidth = 0;
  preInit() {
    ((this.domContainer = document.getElementById("preloader")),
      (this.domDigitsContainer = document.getElementById(
        "preloader-percent-digits",
      )),
      (this.domDigits = document.querySelectorAll(".preloader-percent-digit")));
    for (let e = 0; e < this.domDigits.length; e++) {
      let t = this.domDigits[e];
      ((t._domNums = t.querySelectorAll(".preloader-percent-digit-num")),
        (t._easedVal = 0));
    }
  }
  init() {}
  show(e, t) {
    ((this._initCallback = e),
      (this._startCallback = t),
      (this.isActive = !0),
      properties.loader.start((r) => {
        this.percentTarget = r >= 0.95 ? 1 : r;
      }),
      setTimeout(() => {
        if (this.percentTarget < 1) {
          console.warn("[Preloader timeout trigger]");
          this.percentTarget = 1;
        }
      }, 1200),
      setTimeout(() => {
        if (!properties.hasStarted) {
          console.warn("[Preloader auto-start fallback trigger]");
          ((this.percentTarget = 1),
            (this.percent = 1),
            (this.percentToStart = 1),
            (taskManager.percent = 1),
            properties.hasInitialized || this._initCallback(),
            this._startCallback());
        }
      }, 2200));
  }
  hide() {}
  resize(e, t, r) {
    r !== !0 && this.domDigitsContainer && (this.digitsWidth = this.domDigitsContainer.offsetWidth);
  }
  update(e) {
    if (!this.isActive) return;
    ((this.percent = Math.min(
      this.percentTarget,
      this.percent +
        (settings.SKIP_ANIMATION
          ? 1
          : this.percentTarget > this.percent
            ? e
            : 0) /
          this.MIN_PRELOAD_DURATION,
    )),
      this.percentTarget >= 0.98 &&
        ((this.percentTarget = 1),
        properties.hasInitialized || this._initCallback(),
        (this.percentToStart = settings.SKIP_ANIMATION
          ? 1
          : Math.min(
              taskManager.percent >= 0.98 ? 1 : taskManager.percent,
              this.percentToStart +
                e / this.MIN_DURATION_BETWEEN_INIT_AND_START,
            ))));
    let t =
        this.percentToStart * this.PERCENT_BETWEEN_INIT_AND_START +
        this.percent * (1 - this.PERCENT_BETWEEN_INIT_AND_START),
      r = 0;
    t >= 0.98 && (t = 1);
    (t == 1 &&
      ((this.lineTransformTime += settings.SKIP_ANIMATION ? 1 : e),
      (r = ease.expoInOut(math.saturate(this.lineTransformTime)))),
      r >= 0.98 && (r = 1));
    r == 1 && !properties.hasStarted && this._startCallback();
    let n = settings.SKIP_ANIMATION
      ? +properties.hasStarted
      : math.saturate(properties.startTime);
    for (let a = 0; a < this.domDigits.length; a++) {
      let l = this.domDigits[a],
        c = Math.floor((t * 100) / Math.pow(10, this.domDigits.length - a - 1));
      ((l._easedVal = math.mix(l._easedVal, c, 1 - Math.exp(-7 * e))),
        c - l._easedVal < 0.01 && (l._easedVal = c));
      let u = l._easedVal % 10,
        f = Math.floor(u),
        p = Math.ceil(u) % 10,
        g = u - f;
      ((l._domNums[0].innerHTML = f),
        (l._domNums[1].innerHTML = p),
        (l.style.transform =
          "translateY(" +
          -(
            g -
            ease.expoInOut(
              math.saturate(n * 1.2 - (0.2 * a) / (this.domDigits.length - 1)),
            )
          ) *
            50 +
          "%) translateY(-0.05em)"));
    }
    ((transitionOverlay.loadBarRatio = t),
      (transitionOverlay.lineTransformRatio = r),
      (transitionOverlay.contentShowRatio = n),
      n >= 0.98 &&
        (this.domContainer && (this.domContainer.style.display = "none"), (this.isActive = !1)));
  }
}
const preloader = new Preloader();
globalThis.preloader = preloader;

export { Preloader, preloader };
export default preloader;
