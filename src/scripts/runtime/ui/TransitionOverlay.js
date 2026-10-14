/**
 * Fullscreen Route Transition Canvas & Safety Watchdog
 */
import settings from "../core/Settings.js";
import properties from "../core/Properties.js";
import math from "../core/MathUtils.js";
import ease from "../core/Ease.js";
import taskManager from "../core/TaskManager.js";
import { MinSignal$2 } from "../loaders/QuickLoader.js";

const LOADING_RECTS = [
  1, 1, 1, 3, 2, 4, 2, 1, 6, 2, 1, 2, 7, 1, 1, 1, 7, 4, 1, 1, 8, 2, 1, 2, 11, 2,
  1, 3, 13, 2, 1, 3, 12, 1, 1, 1, 16, 1, 2, 1, 18, 2, 1, 2, 16, 4, 2, 1, 22, 1,
  1, 4, 26, 1, 1, 4, 27, 1, 1, 1, 28, 2, 1, 3, 32, 1, 1, 1, 33, 3, 1, 1, 31, 1,
  1, 3, 32, 4, 2, 1,
];
globalThis.LOADING_RECTS = LOADING_RECTS;

class TransitionOverlay {
  contentShowRatio = 0;
  contentHideRatio = 1;
  loadBarRatio = 0;
  lineTransformRatio = 0;
  showTextRatio = 0;
  waitTextRatio = 0;
  hideTextRatio = 1;
  pixelWidth = 0;
  needsShowText = !1;
  needsHideText = !1;
  loadingTextAnimation = 0;
  onShowTextCompleted = new MinSignal$2();
  onHideTextCompleted = new MinSignal$2();
  init() {
    ((this.canvas = document.getElementById("transition-overlay")),
      (this.ctx = this.canvas.getContext("2d")));
  }
  resize(e, t) {
    if (!this.canvas) this.canvas = document.getElementById("transition-overlay");
    if (!this.canvas) return;
    ((e += 2),
      (t += 2),
      (this.canvas.width = e * settings.DPR),
      (this.canvas.height = t * settings.DPR),
      (this.canvas.style.width = e + "px"),
      (this.canvas.style.height = t + "px"),
      (this.pixelWidth = ~~Math.min(42, properties.viewportWidth / 30)));
  }
  isReadyToHide() {}
  get activeRatio() {
    return Math.min(1 - this.contentShowRatio, this.contentHideRatio);
  }
  update(e) {
    if (this.activeRatio > 0) {
      if (!this._safetyWatchdog) {
        this._safetyWatchdog = setTimeout(() => {
          this.contentShowRatio = 1;
          this.contentHideRatio = 1;
          this.showTextRatio = 1;
          this.hideTextRatio = 1;
          this.needsShowText = false;
          this.needsHideText = false;
          if (this.canvas) this.canvas.style.display = "none";
          this.onShowTextCompleted.dispatch();
          this.onHideTextCompleted.dispatch();
          this._safetyWatchdog = null;
        }, 1500);
      }
      if (!this.ctx) this.init();
      if (!this.ctx) return;
      let t = properties.viewportWidth + 2,
        r = properties.viewportHeight + 2,
        n = this.pixelWidth,
        a = this.loadBarRatio,
        l = this.lineTransformRatio,
        c = Math.sqrt(t * t + r * r) / n,
        u = this.ctx;
      (u.save(),
        u.scale(settings.DPR, settings.DPR),
        (u.fillStyle = "#000"),
        u.fillRect(0, 0, t, r));
      let f = ease.expoInOut(1 - this.activeRatio),
        p = (1 + f * c) * n;
      if (
        (u.translate(t * 0.5, r * 0.5),
        u.rotate(f * (this.contentShowRatio == 0 ? -1 : 1)),
        u.translate(n * f * c, -n * 0.5 * f * c),
        u.scale(p, p),
        l == 0)
      )
        ((u.fillStyle = "#333"),
          u.fillRect(-2.5, -0.5, 5, 1),
          (u.fillStyle = "#fff"),
          u.fillRect(-2.5, -0.5, 5 * a, 1));
      else {
        ((u.fillStyle = "#fff"),
          this.needsShowText &&
            ((this.showTextRatio = this.showTextRatio + e * 1.25),
            this.showTextRatio >= 1 &&
              ((this.showTextRatio = 1),
              (this.needsShowText = !1),
              this.onShowTextCompleted.dispatch())),
          this.showTextRatio == 1 &&
            ((this.waitTextRatio = Math.min(1, this.waitTextRatio + e * 3)),
            this.waitTextRatio == 1 &&
              this.needsHideText &&
              taskManager.percent == 1 &&
              ((this.hideTextRatio = this.hideTextRatio + e * 1.25),
              this.hideTextRatio >= 1 &&
                ((this.hideTextRatio = 1),
                (this.needsHideText = !1),
                this.onHideTextCompleted.dispatch()))));
        let g = this.showTextRatio,
          v = this.hideTextRatio,
          _ = math.fit(Math.min(g, 1 - v), 0, 0.5, 1, 0.2, ease.expoInOut),
          T = (ease.expoInOut(g) + ease.expoInOut(v)) * -15;
        if (g > 0 && v < 1) {
          (u.scale(_, _),
            u.translate(-l, 1.5 * l),
            u.translate(T, 0),
            u.save(),
            u.translate(-1.5, -4.5),
            u.beginPath());
          for (
            let M = 0, S = LOADING_RECTS.length / 4, b = 0;
            M < S;
            M++, b += 4
          ) {
            u.fillStyle = "#fff";
            let C = LOADING_RECTS[b + 0],
              w = LOADING_RECTS[b + 1],
              R = LOADING_RECTS[b + 2],
              E = LOADING_RECTS[b + 3],
              I = M / (S - 1),
              F =
                math.fit(g, I * 0.5, 0.5 + I * 0.5, 0, 1, ease.expoIn) *
                math.fit(v, I * 0.5, 0.5 + I * 0.5, 1, 0, ease.expoOut);
            (g < 1 ? M < 2 && (F = 1) : M >= S - 2 && (F = 1),
              u.rect(
                C + (1 - F) * R * 0.5,
                w + (1 - F) * E * 0.5,
                R * F,
                E * F,
              ));
          }
          (u.closePath(), u.fill(), u.restore());
        } else
          (u.translate(-l, 1.5 * l),
            u.save(),
            u.translate(0.5, -0.5),
            u.rotate(l * Math.PI * 0.5),
            (u.globalCompositeOperation = "xor"),
            u.fillRect(-3, 0, 3, 1),
            (u.globalCompositeOperation = "source-over"),
            (u.globalAlpha = 1 - f),
            u.fillRect(-3, 0, 3, 1),
            u.restore(),
            u.save(),
            u.translate(0.5, -0.5),
            (u.globalCompositeOperation = "xor"),
            u.fillRect(0, 0, 2, 1),
            (u.globalCompositeOperation = "source-over"),
            (u.globalAlpha = 1 - f),
            u.fillRect(0, 0, 2, 1),
            u.restore());
      }
      (u.restore(), (this.canvas.style.display = "block"));
    } else {
      if (this._safetyWatchdog) {
        clearTimeout(this._safetyWatchdog);
        this._safetyWatchdog = null;
      }
      this.canvas.style.display = "none";
    }
  }
}
const transitionOverlay = new TransitionOverlay();
globalThis.transitionOverlay = transitionOverlay;

export { TransitionOverlay, transitionOverlay, LOADING_RECTS };
export default transitionOverlay;
