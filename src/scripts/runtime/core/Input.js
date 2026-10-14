/**
 * User input coordinator: Mouse, Touch, Pointer & Wheel
 */
import * as THREE from "../three.js";
import math from "./MathUtils.js";
import settings from "./Settings.js";
import properties from "./Properties.js";
import { browser$1 } from "./Browser.js";
import { SecondOrderDynamics } from "./Dynamics.js";
import { MinSignal$2 } from "../loaders/QuickLoader.js";

const { Vector2 } = THREE;

const PIXEL_STEP = 10,
  LINE_HEIGHT = 40,
  PAGE_HEIGHT = 800;

function normalizeWheel(o) {
  var e = 0,
    t = 0,
    r = 0,
    n = 0;
  return (
    "detail" in o && (t = o.detail),
    "wheelDelta" in o && (t = -o.wheelDelta / 120),
    "wheelDeltaY" in o && (t = -o.wheelDeltaY / 120),
    "wheelDeltaX" in o && (e = -o.wheelDeltaX / 120),
    "axis" in o && o.axis === o.HORIZONTAL_AXIS && ((e = t), (t = 0)),
    (r = e * PIXEL_STEP),
    (n = t * PIXEL_STEP),
    "deltaY" in o && (n = o.deltaY),
    "deltaX" in o && (r = o.deltaX),
    (r || n) &&
      o.deltaMode &&
      (o.deltaMode == 1
        ? ((r *= LINE_HEIGHT), (n *= LINE_HEIGHT))
        : ((r *= PAGE_HEIGHT), (n *= PAGE_HEIGHT))),
    r && !e && (e = r < 1 ? -1 : 1),
    n && !t && (t = n < 1 ? -1 : 1),
    { spinX: e, spinY: t, pixelX: r, pixelY: n }
  );
}
const normalizeWheel$1 = normalizeWheel;
globalThis.normalizeWheel$1 = normalizeWheel$1;

class Input {
  onDowned = new MinSignal$2();
  onMoved = new MinSignal$2();
  onUped = new MinSignal$2();
  onClicked = new MinSignal$2();
  onWheeled = new MinSignal$2();
  onXScrolled = new MinSignal$2();
  onYScrolled = new MinSignal$2();
  wasDown = !1;
  isDown = !1;
  downTime = 0;
  hasClicked = !1;
  hasMoved = !1;
  hadMoved = !1;
  justClicked = !1;
  mouseXY = new Vector2();
  _prevMouseXY = new Vector2();
  prevMouseXY = new Vector2();
  mousePixelXY = new Vector2();
  _prevMousePixelXY = new Vector2();
  prevMousePixelXY = new Vector2();
  downXY = new Vector2();
  downPixelXY = new Vector2();
  deltaXY = new Vector2();
  deltaPixelXY = new Vector2();
  deltaDownXY = new Vector2();
  deltaDownPixelXY = new Vector2();
  deltaDownPixelDistance = 0;
  deltaWheel = 0;
  deltaDragScrollX = 0;
  deltaScrollX = 0;
  deltaDragScrollY = 0;
  deltaScrollY = 0;
  isDragScrollingX = !1;
  isDragScrollingY = !1;
  isWheelScrolling = !1;
  dragScrollXMomentum = 0;
  dragScrollYMomentum = 0;
  dragScrollMomentumMultiplier = 10;
  canDesktopDragScroll = !1;
  needsCheckDragScrollDirection = !1;
  lastScrollXDirection = 0;
  lastScrollYDirection = 0;
  easedMouseDynamics = {};
  dragScrollDynamic;
  downThroughElems = [];
  currThroughElems = [];
  prevThroughElems = [];
  clickThroughElems = [];
  preInit() {
    const e = document;
    (e.addEventListener("mousedown", this._onDown.bind(this)),
      e.addEventListener("touchstart", this._getTouchBound(this, this._onDown)),
      e.addEventListener("mousemove", this._onMove.bind(this)),
      e.addEventListener("touchmove", this._getTouchBound(this, this._onMove)),
      e.addEventListener("mouseup", this._onUp.bind(this)),
      e.addEventListener("touchend", this._getTouchBound(this, this._onUp)),
      e.addEventListener("wheel", this._onWheel.bind(this)),
      e.addEventListener("mousewheel", this._onWheel.bind(this)),
      this.addEasedInput("default", 1.35, 0.5, 1.25),
      (this.dragScrollDynamic = this.addEasedInput("dragScroll", 2, 1, 1)),
      this.onUped.addOnce(() => {
        properties.onFirstClicked.dispatch();
      }));
  }
  init() {}
  resize() {
    for (let e in this.easedMouseDynamics) this.easedMouseDynamics[e].reset();
  }
  update(e) {
    for (let t in this.easedMouseDynamics) {
      let r = this.easedMouseDynamics[t];
      (r.target.copy(this.mouseXY), r.update(e));
    }
  }
  addEasedInput(e, t = 1.5, r = 0.8, n = 2) {
    return (this.easedMouseDynamics[e] = new SecondOrderDynamics(
      new Vector2(),
      t,
      r,
      n,
    ));
  }
  postUpdate(e) {
    ((this.prevThroughElems.length = 0),
      this.prevThroughElems.concat(this.currThroughElems),
      (this.deltaWheel = 0),
      (this.deltaDragScrollX = 0),
      (this.deltaDragScrollY = 0),
      (this.deltaScrollX = 0),
      (this.deltaScrollY = 0),
      (this.dragScrollXMomentum = 0),
      (this.dragScrollYMomentum = 0),
      this.deltaXY.set(0, 0),
      this.deltaPixelXY.set(0, 0),
      this.prevMouseXY.copy(this.mouseXY),
      this.prevMousePixelXY.copy(this.mousePixelXY),
      (this.hadMoved = this.hasMoved),
      (this.wasDown = this.isDown),
      (this.justClicked = !1),
      (this.isWheelScrolling = !1));
  }
  _onWheel(e) {
    let t = normalizeWheel$1(e).pixelY;
    ((t = math.clamp(t, -200, 200)),
      (this.deltaWheel += t),
      (this.deltaScrollX = this.deltaDragScrollX + this.deltaWheel),
      (this.deltaScrollY = this.deltaDragScrollY + this.deltaWheel),
      (this.lastScrollXDirection = this.deltaWheel > 0 ? 1 : -1),
      (this.lastScrollYDirection = this.deltaWheel > 0 ? 1 : -1),
      (this.isWheelScrolling = !0),
      this.onWheeled.dispatch(e.target),
      this.onXScrolled.dispatch(e.target),
      this.onYScrolled.dispatch(e.target));
  }
  _onDown(e) {
    e.button === 2 ||
      e.button === 1 ||
      ((this.isDown = !0),
      (this.downTime = +new Date()),
      (this.prevThroughElems.length = 0),
      this._setThroughElementsByEvent(e, this.downThroughElems),
      this.deltaXY.set(0, 0),
      this.deltaPixelXY.set(0, 0),
      this._getInputXY(e, this.mouseXY),
      this.dragScrollDynamic.reset(this.mouseXY),
      (this.isDragScrollingX = !1),
      (this.isDragScrollingY = !1),
      (this.needsCheckDragScrollDirection = !1),
      this._onMove(e),
      this.onDowned.dispatch(e),
      (this.needsCheckDragScrollDirection = !0));
  }
  _onMove(e) {
    e.button === 2 ||
      e.button === 1 ||
      (this._getInputXY(e, this.mouseXY),
      this._getInputPixelXY(e, this.mousePixelXY),
      this.deltaXY.copy(this.mouseXY).sub(this._prevMouseXY),
      this.deltaPixelXY.copy(this.mousePixelXY).sub(this._prevMousePixelXY),
      this._prevMouseXY.copy(this.mouseXY),
      this._prevMousePixelXY.copy(this.mousePixelXY),
      (this.hasMoved = this.deltaXY.length() > 0),
      this.isDown &&
        (this.deltaDownXY.copy(this.mouseXY).sub(this.downXY),
        this.deltaDownPixelXY.copy(this.mousePixelXY).sub(this.downPixelXY),
        (this.deltaDownPixelDistance = this.deltaDownPixelXY.length()),
        (browser$1.isMobile || this.canDesktopDragScroll) &&
          (this.needsCheckDragScrollDirection &&
            ((this.isDragScrollingX =
              Math.abs(this.deltaPixelXY.x) > Math.abs(this.deltaPixelXY.y)),
            (this.isDragScrollingY = !this.isDragScrollingX),
            (this.needsCheckDragScrollDirection = !1)),
          this.isDragScrollingX &&
            ((this.deltaDragScrollX += -this.deltaPixelXY.x),
            (this.deltaScrollX += -this.deltaPixelXY.x + this.deltaWheel),
            (this.lastScrollXDirection = this.deltaDragScrollX > 0 ? 1 : -1),
            this.onXScrolled.dispatch(e.target)),
          this.isDragScrollingY &&
            ((this.deltaDragScrollY += -this.deltaPixelXY.y),
            (this.deltaScrollY += -this.deltaPixelXY.y + this.deltaWheel),
            (this.lastScrollYDirection = this.deltaDragScrollY > 0 ? 1 : -1),
            this.onYScrolled.dispatch(e.target)))),
      this._setThroughElementsByEvent(e, this.currThroughElems),
      this.onMoved.dispatch(e));
  }
  _onUp(e) {
    if (e.button === 2 || e.button === 1) return;
    const t = e.clientX - this.downPixelXY.x,
      r = e.clientY - this.downPixelXY.y;
    (Math.sqrt(t * t + r * r) < 40 &&
      +new Date() - this.downTime < 300 &&
      (this._setThroughElementsByEvent(e, this.clickThroughElems),
      this._getInputXY(e, this.mouseXY),
      (this.hasClicked = !0),
      (this.justClicked = !0),
      this.onClicked.dispatch(e)),
      this.deltaDownXY.set(0, 0),
      this.deltaDownPixelXY.set(0, 0),
      (this.deltaDownPixelDistance = 0),
      (this.dragScrollXMomentum =
        this.dragScrollDynamic.valueVel.y *
        properties.viewportWidth *
        this.dragScrollMomentumMultiplier *
        properties.deltaTime),
      (this.dragScrollYMomentum =
        this.dragScrollDynamic.valueVel.y *
        properties.viewportHeight *
        this.dragScrollMomentumMultiplier *
        properties.deltaTime),
      (this.isDown = !1),
      (this.needsCheckDragScrollDirection = !1),
      this.onUped.dispatch(e));
  }
  _getTouchBound(e, t, r) {
    return function (n) {
      (r && n.preventDefault && n.preventDefault(),
        t.call(e, n.changedTouches[0] || n.touches[0]));
    };
  }
  _getInputXY(e, t) {
    return (
      t.set(
        (e.clientX / properties.viewportWidth) * 2 - 1,
        1 - (e.clientY / properties.viewportHeight) * 2,
      ),
      t
    );
  }
  _getInputPixelXY(e, t) {
    t.set(e.clientX, e.clientY);
  }
  _setThroughElementsByEvent(e, t) {
    let r = e.target;
    for (t.length = 0; r.parentNode;) (t.push(r), (r = r.parentNode));
  }
  hasThroughElem(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems,
      n = r.length;
    for (; n--;) if (r[n] === e) return !0;
    return !1;
  }
  hasThroughElemWithClass(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems,
      n = r.length;
    for (; n--;) if (r[n].classList.contains(e)) return r[n];
    return null;
  }
}
const input = new Input();
globalThis.input = input;

export { Input, input };
export default input;
