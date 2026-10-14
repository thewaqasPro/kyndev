/**
 * Animation tweening helper
 */
import math from './MathUtils.js';

let instances = [];
class Tween {
  constructor(e, t = null) {
    ((this.target = e),
      (this.fromProperties = {}),
      (this.toProperties = {}),
      (this.onComplete = t),
      (this.t = 0),
      (this.duration = 0),
      (this.autoUpdate = !0),
      instances.push(this));
  }
  static autoUpdate(e) {
    for (let t = 0; t < instances.length; t++) {
      let r = instances[t];
      r.autoUpdate && r.update(e);
    }
  }
  restart() {
    ((this.isActive = !0), (this.t = 0));
  }
  kill() {
    this.t = this.duration;
  }
  to(e, t, r = null) {
    let n = {};
    for (let a in t) n[a] = this.target[a];
    this.fromTo(e, n, t, r);
  }
  fromTo(e, t, r, n) {
    ((this.duration = e),
      (this.ease = n),
      (this.fromProperties = t),
      (this.toProperties = r),
      this.restart(),
      this.update(0, this.duration == 0));
  }
  update(e = 0, t = !1) {
    if (this.t < this.duration || t) {
      this.t = Math.min(this.duration, this.t + e);
      let r = this.duration > 0 ? this.t / this.duration : 1;
      this.ease && (r = this.ease(r));
      for (let n in this.toProperties)
        this.target[n] = math.mix(
          this.fromProperties[n],
          this.toProperties[n],
          r,
        );
      this.t == this.duration && this.onComplete && this.onComplete();
    }
  }
}
globalThis.Tween = Tween;
export { Tween };
export default Tween;
