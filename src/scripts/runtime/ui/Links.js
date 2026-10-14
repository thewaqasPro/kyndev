/**
 * Animated Interactive Link Underlines
 */
class Links {
  links = [];
  preInit() {
    Array.from(document.querySelectorAll(".is-link")).forEach((t) => {
      const r = {
        el: t,
        canvas: document.createElement("canvas"),
        context: null,
        ratio: 0,
        animating: !1,
        color: t.classList.contains("is-email") ? "#000000" : "#ffffff",
      };
      ((r.context = r.canvas.getContext("2d")),
        (r.el.style.position = "relative"),
        (r.el.style.width = "fit-content"),
        (r.canvas.style.position = "absolute"),
        (r.canvas.style.left = "0"),
        (r.canvas.style.top = "0"),
        (r.canvas.style.pointerEvents = "none"),
        r.el.append(r.canvas),
        this.links.push(r));
    });
  }
  init() {
    this.links.forEach((e) => {
      (e.el.addEventListener("mouseenter", this._onLinkMouseenter.bind(this)),
        e.el.addEventListener("mouseleave", this._onLinkMouseleave.bind(this)));
    });
  }
  resize() {
    this.links.forEach((e) => {
      const t = e.el.getBoundingClientRect();
      ((e._width = t.width),
        (e._height = t.height),
        (e.canvas.width = e._width * settings.DPR),
        (e.canvas.height = e._height * settings.DPR),
        (e.canvas.style.width = e._width + "px"),
        (e.canvas.style.height = e._height + "px"));
    });
  }
  update(e) {
    this.links.forEach((t) => {
      let r = t.ratio;
      if (
        ((t.ratio = math.saturate(t.ratio + (t.animating ? 1 : -1) * e * 3)),
        t.ratio !== 0 || r !== t.ratio)
      ) {
        const n = ease.quadInOut(t.ratio),
          a = ease.quadOut(Math.abs(t.ratio * 2 - 1));
        (t.context.save(),
          t.context.scale(settings.DPR, settings.DPR),
          (t.context.lineWidth = 2),
          (t.context.strokeStyle = t.color),
          t.context.clearRect(0, 0, t._width, t._height),
          t.context.beginPath(),
          t.context.moveTo(0, t._height - t.context.lineWidth / 2),
          t.context.arcTo(
            t._width * n,
            t._height - t.context.lineWidth / 2,
            t._width * n,
            t._height - t.context.lineWidth / 2 - 1,
            30 * (1 - a),
          ),
          t.context.stroke(),
          t.context.restore());
      }
    });
  }
  _onLinkMouseenter(e) {
    const t = this.links.filter((r) => r.el === e.target)[0];
    t.animating = !0;
  }
  _onLinkMouseleave(e) {
    const t = this.links.filter((r) => r.el === e.target)[0];
    t.animating = !1;
  }
}
const links = new Links();
globalThis.links = links;
new Color();

export { Links, links };
export default links;
