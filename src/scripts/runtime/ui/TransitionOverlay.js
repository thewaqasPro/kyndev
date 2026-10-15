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
  _kCanvas = null;
  _kCtx = null;
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
  _hasDebugUI = false;
  debug = {
    active: false,
    morph: 1.0,
    reveal: 0.0,
    progress: 1.0,
    radius: 0.18,
    angle: 0.233,
  };

  init() {
    this.canvas = document.getElementById("transition-overlay");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      if (this.activeRatio <= 0 && !this.debug.active) {
        this.canvas.style.display = "none";
      }
    }
    this._ensureKCanvas();
    this._initDebugUI();
  }

  _ensureKCanvas() {
    if (!this._kCanvas && typeof document !== "undefined") {
      this._kCanvas = document.createElement("canvas");
      this._kCanvas.width = 512;
      this._kCanvas.height = 512;
      this._kCtx = this._kCanvas.getContext("2d");
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
    if (this.debug.active) return 1;
    return Math.min(1 - this.contentShowRatio, this.contentHideRatio);
  }

  update(e) {
    if (this.debug.active || this.activeRatio > 0) {
      if (!this.ctx) this.init();
      if (!this.ctx) return;
      this._ensureKCanvas();
      if (!this._hasDebugUI) this._initDebugUI();

      let t = properties.viewportWidth + 2,
        r = properties.viewportHeight + 2,
        n = this.pixelWidth,
        a = this.loadBarRatio,
        l = this.lineTransformRatio,
        c = Math.sqrt(t * t + r * r) / n,
        u = this.ctx;

      // Handle route navigation transition state
      const isNavTransition = this.needsShowText || this.showTextRatio > 0;

      if (!this.debug.active) {
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
      }

      // Compute morph, progress, and reveal factors
      let navProgress = this.showTextRatio;
      let navMorph = this.showTextRatio >= 1 ? ease.expoInOut(this.waitTextRatio) : 0;
      let navReveal = this.hideTextRatio > 0 ? ease.expoInOut(this.hideTextRatio) : 0;

      let effMorph = this.debug.active
        ? this.debug.morph
        : isNavTransition
          ? navMorph
          : l;
      let effProgress = this.debug.active
        ? this.debug.progress
        : isNavTransition
          ? navProgress
          : a;
      let f = ease.expoInOut(1 - this.activeRatio);
      let effReveal = this.debug.active
        ? this.debug.reveal
        : isNavTransition
          ? navReveal
          : f;
      let strokeRadius = this.debug.active ? this.debug.radius : 0.18;
      let armAngle = this.debug.active ? this.debug.angle : 0.233;

      // Smooth background fade during zoom reveal so it dissolves seamlessly into page
      const bgAlpha = math.fit(effReveal, 0.15, 0.85, 1, 0, ease.expoInOut);
      const kAlpha = math.fit(effReveal, 0, 0.42, 1, 0, ease.expoOut);

      u.save();
      u.scale(settings.DPR, settings.DPR);
      u.clearRect(0, 0, t, r);

      // Reset any shadow or blur artifacts
      u.shadowColor = "transparent";
      u.shadowBlur = 0;
      u.shadowOffsetX = 0;
      u.shadowOffsetY = 0;

      // Smooth cinematic backdrop
      if (bgAlpha > 0) {
        u.fillStyle = `rgba(10, 11, 16, ${bgAlpha})`;
        u.fillRect(0, 0, t, r);
      }

      // If K has dissolved, skip drawing letter geometry
      if (kAlpha > 0.001) {
        let p = (1 + effReveal * c) * n;

        u.save();
        u.translate(t * 0.5, r * 0.5);
        u.rotate(effReveal * (this.contentShowRatio === 0 ? -1 : 1));
        u.translate(n * effReveal * c, -n * 0.5 * effReveal * c);
        u.scale(p, p);

        // Rounded rectangle drawing helper with individual corner radius support [tl, tr, br, bl]
        const drawRoundedRect = (ctx, sx, sy, sw, sh, rad) => {
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(sx, sy, sw, sh, rad);
          } else {
            let tl = 0, tr = 0, br = 0, bl = 0;
            if (Array.isArray(rad)) {
              [tl, tr, br, bl] = rad;
            } else if (typeof rad === "number") {
              tl = tr = br = bl = rad;
            }
            ctx.moveTo(sx + tl, sy);
            ctx.lineTo(sx + sw - tr, sy);
            if (tr > 0) ctx.arcTo(sx + sw, sy, sx + sw, sy + sh, tr);
            ctx.lineTo(sx + sw, sy + sh - br);
            if (br > 0) ctx.arcTo(sx + sw, sy + sh, sx, sy + sh, br);
            ctx.lineTo(sx + bl, sy + sh);
            if (bl > 0) ctx.arcTo(sx, sy + sh, sx, sy, bl);
            ctx.lineTo(sx, sy + tl);
            if (tl > 0) ctx.arcTo(sx, sy, sx + sw, sy, tl);
            ctx.closePath();
          }
          ctx.fill();
        };

        if (effMorph === 0) {
          // Sleek horizontal progress loading capsule with smooth rounded caps
          u.globalCompositeOperation = "source-over";
          u.fillStyle = `rgba(45, 50, 65, ${kAlpha * 0.7})`;
          drawRoundedRect(u, -2.7, -0.5, 5.4, 1, 0.48);

          if (effProgress > 0) {
            u.fillStyle = `rgba(255, 255, 255, ${kAlpha})`;
            drawRoundedRect(u, -2.7, -0.5, Math.max(0.2, 5.4 * effProgress), 1, 0.48);
          }
        } else {
          // Flatten K strokes onto an offscreen canvas at 100% opacity first
          // This eliminates overlapping opacity seams so the K fades out as ONE unified glyph!
          const kCtx = this._kCtx;
          const kCanvas = this._kCanvas;
          const kSize = 512;
          const kScale = 48;

          kCtx.clearRect(0, 0, kSize, kSize);
          kCtx.save();
          kCtx.translate(kSize * 0.5, kSize * 0.5);
          kCtx.scale(kScale, kScale);

          const jX = -0.6;
          const jY = 0;
          kCtx.translate(-0.35 * effMorph, 0);

          const drawSegment = (sx, sy, sw, sh, rad, angle) => {
            kCtx.save();
            kCtx.translate(jX, jY);
            if (angle !== 0) kCtx.rotate(angle);
            kCtx.fillStyle = "#ffffff";
            drawRoundedRect(kCtx, sx, sy, sw, sh, rad);
            kCtx.restore();
          };

          // Corner radius definitions:
          // Vertical stem: outer ends (top of upper, bottom of lower) have strokeRadius.
          // The junction in the middle has RADIUS ZERO, making the vertical column completely straight and continuous!
          const stemRadii = [strokeRadius, 0, 0, strokeRadius];
          // Diagonal arms: outer tips have strokeRadius, inner junction side has radius zero
          const armRadii = [0, strokeRadius, strokeRadius, 0];

          // 1. Upper Vertical Stem (rotates 90 deg into upper spine; top is rounded, bottom/middle is flat)
          drawSegment(-2.1, -0.5, 2.1, 1, stemRadii, effMorph * Math.PI * 0.5);

          // 2. Lower Vertical Stem (rotates -90 deg into lower spine; bottom is rounded, top/middle is flat)
          drawSegment(-2.1, -0.5, 2.1, 1, stemRadii, -effMorph * Math.PI * 0.5);

          // 3. Upper Diagonal Arm (rotates upward into upper wing; outer tip rounded, junction flat)
          drawSegment(0, -0.5, 3.2, 1, armRadii, -effMorph * (Math.PI * armAngle));

          // 4. Lower Diagonal Arm (rotates downward into lower wing; outer tip rounded, junction flat)
          drawSegment(0, -0.5, 3.2, 1, armRadii, effMorph * (Math.PI * armAngle));

          kCtx.restore();

          // Now draw the pre-flattened solid K with a single global opacity onto the main canvas
          u.save();
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = kAlpha;
          u.drawImage(
            kCanvas,
            -kSize * 0.5 / kScale,
            -kSize * 0.5 / kScale,
            kSize / kScale,
            kSize / kScale
          );
          u.restore();
        }
        u.restore();
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

  _initDebugUI() {
    if (typeof window === "undefined" || this._hasDebugUI) return;
    const hasParam = window.location.search.includes("debug-k");
    const hasGlobal = typeof window.DEBUG_K !== "undefined";
    if (!hasParam && !hasGlobal) return;
    this._hasDebugUI = true;

    this.debug.active = true;
    this.debug.morph = 1.0;
    this.debug.reveal = 0.0;
    this.debug.radius = 0.18;
    this.debug.angle = 0.233;

    const panel = document.createElement("div");
    panel.id = "k-morph-debugger";
    panel.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999999;
      background: rgba(14, 16, 24, 0.94);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 16px;
      padding: 16px 20px;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace;
      font-size: 12px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.12); padding-bottom:8px;">
        <span style="font-weight:700; color:#0081fb; font-size:13px; letter-spacing:0.02em;">⚡ K-Morph Live Debugger</span>
        <label style="display:flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; color:#aaa;">
          <input type="checkbox" id="k-dbg-freeze" checked /> Freeze
        </label>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="color:#ddd;">Morph Fold (0 = Bar, 1 = K)</span>
          <span id="k-dbg-morph-val" style="color:#0081fb; font-weight:bold;">1.00</span>
        </div>
        <input type="range" id="k-dbg-morph" min="0" max="1" step="0.01" value="1.0" style="width:100%; cursor:pointer;" />
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="color:#ddd;">Reveal Zoom & Fade Out</span>
          <span id="k-dbg-reveal-val" style="color:#12b76a; font-weight:bold;">0.00</span>
        </div>
        <input type="range" id="k-dbg-reveal" min="0" max="1" step="0.01" value="0.0" style="width:100%; cursor:pointer;" />
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="color:#ddd;">Corner Radius</span>
          <span id="k-dbg-radius-val" style="color:#f59e0b; font-weight:bold;">0.18</span>
        </div>
        <input type="range" id="k-dbg-radius" min="0" max="0.45" step="0.01" value="0.18" style="width:100%; cursor:pointer;" />
      </div>

      <div style="display:flex; gap:8px; margin-top:4px;">
        <button id="k-dbg-play" type="button" style="flex:1; padding:7px 12px; background:#0081fb; border:none; border-radius:8px; color:#fff; font-weight:600; cursor:pointer; transition:opacity 0.2s;">▶ Play Sequence</button>
        <button id="k-dbg-reset" type="button" style="padding:7px 12px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; cursor:pointer;">Reset</button>
      </div>
    `;

    document.body.appendChild(panel);

    const freezeCheck = panel.querySelector("#k-dbg-freeze");
    const morphSlider = panel.querySelector("#k-dbg-morph");
    const morphVal = panel.querySelector("#k-dbg-morph-val");
    const revealSlider = panel.querySelector("#k-dbg-reveal");
    const revealVal = panel.querySelector("#k-dbg-reveal-val");
    const radiusSlider = panel.querySelector("#k-dbg-radius");
    const radiusVal = panel.querySelector("#k-dbg-radius-val");
    const playBtn = panel.querySelector("#k-dbg-play");
    const resetBtn = panel.querySelector("#k-dbg-reset");

    freezeCheck.addEventListener("change", (e) => {
      this.debug.active = e.target.checked;
      if (!this.debug.active && this.canvas) {
        this.canvas.style.display = "none";
      }
    });

    morphSlider.addEventListener("input", (e) => {
      this.debug.morph = parseFloat(e.target.value);
      morphVal.textContent = this.debug.morph.toFixed(2);
      this.debug.active = true;
      freezeCheck.checked = true;
    });

    revealSlider.addEventListener("input", (e) => {
      this.debug.reveal = parseFloat(e.target.value);
      revealVal.textContent = this.debug.reveal.toFixed(2);
      this.debug.active = true;
      freezeCheck.checked = true;
    });

    radiusSlider.addEventListener("input", (e) => {
      this.debug.radius = parseFloat(e.target.value);
      radiusVal.textContent = this.debug.radius.toFixed(2);
      this.debug.active = true;
      freezeCheck.checked = true;
    });

    let playAnimId = null;
    playBtn.addEventListener("click", () => {
      this.debug.active = true;
      freezeCheck.checked = true;
      let start = performance.now();
      const duration = 2400;

      const step = (now) => {
        let p = (now - start) / duration;
        if (p > 1) p = 1;

        if (p < 0.45) {
          this.debug.morph = ease.expoInOut(p / 0.45);
          this.debug.reveal = 0;
        } else if (p < 0.6) {
          this.debug.morph = 1;
          this.debug.reveal = 0;
        } else {
          this.debug.morph = 1;
          this.debug.reveal = ease.expoInOut((p - 0.6) / 0.4);
        }

        morphSlider.value = String(this.debug.morph);
        morphVal.textContent = this.debug.morph.toFixed(2);
        revealSlider.value = String(this.debug.reveal);
        revealVal.textContent = this.debug.reveal.toFixed(2);

        if (p < 1) {
          playAnimId = requestAnimationFrame(step);
        }
      };

      if (playAnimId) cancelAnimationFrame(playAnimId);
      playAnimId = requestAnimationFrame(step);
    });

    resetBtn.addEventListener("click", () => {
      this.debug.morph = 1.0;
      this.debug.reveal = 0.0;
      this.debug.radius = 0.18;
      morphSlider.value = "1.0";
      morphVal.textContent = "1.00";
      revealSlider.value = "0.0";
      revealVal.textContent = "0.00";
      radiusSlider.value = "0.18";
      radiusVal.textContent = "0.18";
    });
  }
}

const transitionOverlay = new TransitionOverlay();
globalThis.transitionOverlay = transitionOverlay;

export { TransitionOverlay, transitionOverlay, LOADING_RECTS };
export default transitionOverlay;
