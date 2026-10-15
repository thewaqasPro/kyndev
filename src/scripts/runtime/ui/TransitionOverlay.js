/**
 * Transition Overlay Canvas & Pixelated Grid
 */
import properties from '../core/Properties.js';
import settings from '../core/Settings.js';
import math from '../core/MathUtils.js';
import ease from '../core/Ease.js';
import taskManager from '../core/TaskManager.js';
import { MinSignal$2 } from '../loaders/QuickLoader.js';

const LOADING_RECTS = [];

class TransitionOverlay {
  canvas = null;
  ctx = null;
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
  _safetyWatchdog = null;

  init() {
    this.canvas = document.getElementById("transition-overlay");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      if (this.activeRatio <= 0) {
        this.canvas.style.display = "none";
      }
    }
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

      // Handle route navigation transition state
      const isNavTransition = this.needsShowText || this.showTextRatio > 0;

      if (this.needsShowText) {
        this.showTextRatio = Math.min(1, this.showTextRatio + e * 1.5);
        if (this.showTextRatio >= 1) {
          this.needsShowText = false;
          this.onShowTextCompleted.dispatch();
        }
      }

      if (this.showTextRatio === 1) {
        this.waitTextRatio = Math.min(1, this.waitTextRatio + e * 2.8);
        if (
          this.waitTextRatio === 1 &&
          this.needsHideText &&
          taskManager.percent === 1
        ) {
          this.hideTextRatio = Math.min(1, this.hideTextRatio + e * 1.5);
          if (this.hideTextRatio >= 1) {
            this.needsHideText = false;
            this.onHideTextCompleted.dispatch();
          }
        }
      }

      // Unified progress bar & K-morph animation
      let navProgress = this.showTextRatio;
      let navMorph = this.showTextRatio >= 1 ? ease.expoInOut(this.waitTextRatio) : 0;
      let navReveal = this.hideTextRatio > 0 ? ease.expoInOut(this.hideTextRatio) : 0;

      let effMorph = isNavTransition ? navMorph : l;
      let effProgress = isNavTransition ? navProgress : a;
      let f = ease.expoInOut(1 - this.activeRatio);
      let effReveal = isNavTransition ? navReveal : f;
      let p = (1 + effReveal * c) * n;

      u.translate(t * 0.5, r * 0.5);
      u.rotate(effReveal * (this.contentShowRatio === 0 ? -1 : 1));
      u.translate(n * effReveal * c, -n * 0.5 * effReveal * c);
      u.scale(p, p);

      if (effMorph === 0) {
        // Sleek horizontal progress loading bar
        u.fillStyle = "#333";
        u.fillRect(-2.7, -0.5, 5.4, 1);
        u.fillStyle = "#fff";
        u.fillRect(-2.7, -0.5, 5.4 * effProgress, 1);
      } else {
        // Kinetic origami transformation: morph from horizontal bar to brand "K"
        const jX = -0.6;
        const jY = 0;
        u.translate(-0.35 * effMorph, 0);

        const drawSegment = (sx, sy, sw, sh, angle) => {
          u.save();
          u.translate(jX, jY);
          if (angle !== 0) u.rotate(angle);
          u.globalCompositeOperation = "xor";
          u.fillRect(sx, sy, sw, sh);
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = 1 - effReveal;
          u.fillRect(sx, sy, sw, sh);
          u.restore();
        };

        // 1. Upper Vertical Stem (rotates 90 deg into upper spine)
        drawSegment(-2.1, -0.5, 2.1, 1, effMorph * Math.PI * 0.5);

        // 2. Lower Vertical Stem (rotates -90 deg into lower spine)
        drawSegment(-2.1, -0.5, 2.1, 1, -effMorph * Math.PI * 0.5);

        // 3. Upper Diagonal Arm (rotates upward by 42 deg)
        drawSegment(0, -0.5, 3.2, 1, -effMorph * (Math.PI * 0.233));

        // 4. Lower Diagonal Arm (rotates downward by 42 deg)
        drawSegment(0, -0.5, 3.2, 1, effMorph * (Math.PI * 0.233));
      }

      u.restore();
      if (this.canvas && this.canvas.style.display !== "block") {
        this.canvas.style.display = "block";
      }
    } else {
      if (this.canvas && this.canvas.style.display !== "none") {
        this.canvas.style.display = "none";
        if (this.ctx) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    }
  }
}

const transitionOverlay = new TransitionOverlay();
globalThis.transitionOverlay = transitionOverlay;

export { TransitionOverlay, transitionOverlay, LOADING_RECTS };
export default transitionOverlay;
