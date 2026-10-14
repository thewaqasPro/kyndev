/**
 * 3D Shader & Physics Playground Page Controller
 */
class PlaygroundPage extends Page {
  path = "playground";
  id = "playground";
  mesh = null;
  container = new Object3D();
  events = [
    { date: dayjs("2019-01-25") },
    { date: dayjs("2019-09-25") },
    { date: dayjs("2022-04-25") },
  ];
  domEvents = [];
  preInit() {
    let e = this.domContainer;
    ((this.domMain = e.querySelector("#playground-main")),
      (this.domInner = e.querySelector("#playground-main-inner")),
      (this.domTimeline = e.querySelector("#playground-main-timeline")),
      (this.domTimelineLine = e.querySelector(
        "#playground-main-timeline-line",
      )),
      (this.domTimelineLineProgress = e.querySelector(
        "#playground-main-timeline-line-progress",
      )));
    for (let t = 0; t < this.events.length; t++) {
      let r = document.createElement("div");
      r.classList.add("playground-main-timeline-event");
      let n = document.createElement("div");
      (n.classList.add("playground-main-timeline-dot"),
        n.addEventListener("mouseenter", this._onDomDotMouseenter.bind(this)),
        n.addEventListener("mouseleave", this._onDomDotMouseleave.bind(this)));
      let a = document.createElement("div");
      (a.classList.add("playground-main-timeline-text"),
        (a.innerHTML = this.events[t].date.format("YY MMMM'DD")),
        r.append(a),
        r.append(n),
        this.domTimeline.append(r),
        (this.domEvents[t] = r));
    }
    properties.loader.add(settings.MODEL_PATH + "playground/tunnel.buf", {
      onLoad: (t) => {
        this._onTunnelLoad(t);
      },
    });
  }
  init() {
    this.domTimeline.addEventListener(
      "click",
      this._onDomTimelineClick.bind(this),
    );
  }
  resize(e, t) {
    let r = Number(
        getComputedStyle(this.domMain)
          .getPropertyValue("padding-left")
          .split("px")[0],
      ),
      n = this.events[this.events.length - 1].date.diff(
        this.events[0].date,
        "day",
      ),
      a = properties.viewportWidth - 2 * r;
    ((this.offsetRatio = r / properties.viewportWidth),
      (this.domMain._height =
        this.domMain.getBoundingClientRect().height -
        properties.viewportHeight));
    for (let l = 0; l < this.domEvents.length; l++) {
      let c = this.domEvents[l],
        p = this.events[l].date.diff(this.events[0].date, "day") / n;
      ((c._ratio = math.fit(p, 0, 1, this.offsetRatio, 1 - this.offsetRatio)),
        (c.style.left = p * a + r + "px"));
    }
  }
  update(e) {
    super.update(e);
    let t = scrollManager.getDomRange(this.domContainer),
      r = math.fit(t.screenRatio, -0.5, 0.5, 0, 1);
    if (r < 1) {
      ((this.domInner.style.transform = `translate3d(0, ${-scrollManager.y}px, 0)`),
        (this.domTimelineLineProgress.style.transform = `scale3d(${r}, 1, 1)`));
      for (let n = 0; n < this.domEvents.length; n++) {
        let a = this.domEvents[n];
        r >= a._ratio
          ? a.classList.add("--active")
          : a.classList.remove("--active");
      }
    }
  }
  _onTunnelLoad(e) {
    ((this.mesh = new Mesh(e, new MeshNormalMaterial())),
      this.container.add(this.mesh));
  }
  _onDomTimelineClick(e) {
    let t = e.clientX / properties.viewportWidth;
    scrollManager.scrollToPixel(t * this.domMain._height);
  }
  _onDomDotMouseenter(e) {
    e.target
      .closest(".playground-main-timeline-event")
      .classList.add("--hover");
  }
  _onDomDotMouseleave(e) {
    e.target
      .closest(".playground-main-timeline-event")
      .classList.remove("--hover");
  }
}
const playgroundPage = new PlaygroundPage();
var FLUID_CELL = 0,
  AIR_CELL = 1,
  SOLID_CELL = 2,
  EMIT_RATE = 2e3;
let _v0 = new Vector2(),
  _v1 = new Vector2(),
  _v2 = new Vector2();
function clamp(o, e, t) {
  return o < e ? e : o > t ? t : o;
}

export { PlaygroundPage, playgroundPage };
globalThis.playgroundPage = playgroundPage;

export default playgroundPage;
