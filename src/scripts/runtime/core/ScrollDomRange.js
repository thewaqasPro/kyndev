/**
 * Scroll DOM element range calculator
 */
import math from './MathUtils.js';

class ScrollDomRange {
  constructor(e, t) {
    ((this.dom = e),
      (this.isVertical = t),
      (this.needsUpdate = !0),
      (this.forcedUpdate = !0),
      (this.screenX = 0),
      (this.screenY = 0),
      (this.ratio = 0),
      (this.screenRatio = 0),
      (this.isActive = !1),
      (this._left = 0),
      (this._right = 0),
      (this._top = 0),
      (this._bottom = 0),
      (this.left = 0),
      (this.right = 0),
      (this.top = 0),
      (this.bottom = 0),
      (this.width = 0),
      (this.height = 0),
      (this.showScreenOffset = 0),
      (this.hideScreenOffset = 0));
  }
  update(e, t, r, n) {
    if (((n = n || this.needsUpdate), n)) {
      if (!this.dom || !this.dom.getBoundingClientRect) return;
      let c = this.dom.getBoundingClientRect();
      ((this.needsUpdate = !1),
        (this._left = c.left),
        (this._right = c.right),
        (this._top = c.top),
        (this._bottom = c.bottom),
        (this.width = c.width),
        (this.height = c.height),
        (this.forcedUpdate = !1),
        this.isVertical
          ? ((this._top += e), (this._bottom += e))
          : ((this._left += e), (this._right += e)));
    }
    ((this.left = this._left),
      (this.right = this._right),
      (this.top = this._top),
      (this.bottom = this._bottom),
      this.isVertical
        ? ((this.top += r), (this.bottom += r))
        : ((this.left += r), (this.right += r)),
      (this.screenX = this.left),
      (this.screenY = this.top));
    let a;
    this.isVertical ? (a = this.screenY -= e) : (a = this.screenX -= e);
    let l = this.isVertical ? this.height : this.width;
    ((this.ratio = Math.min(0, math.unClampedFit(a, t, t - l, -1, 0))),
      (this.ratio += Math.max(0, math.unClampedFit(a, 0, -l, 0, 1))),
      (this.screenRatio = math.fit(a, t, -l, -1, 1)),
      (this.showScreenOffset = -(a - t) / t),
      (this.hideScreenOffset = -(a + l) / t),
      (this.isActive = this.ratio >= -1 && this.ratio <= 1));
  }
}
let instances = [];

globalThis.ScrollDomRange = ScrollDomRange;

export { ScrollDomRange };
export default ScrollDomRange;
