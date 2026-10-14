/**
 * WebFont Loader & Dynamic Font Metrics Detector
 */
import properties from "../../core/Properties.js";
const AnyItem = properties.loader ? properties.loader.ITEM_CLASSES.any : class {};
class FontItem extends AnyItem {
  constructor(e, t) {
    (FontItem.dom || FontItem.initDom(),
      (t.loadFunc = () => {}),
      (t.hasLoading = t.hasLoading === void 0 ? !0 : t.hasLoading),
      (t.refText = "refing something..."),
      (t.refFontSize = t.refFontSize || 120),
      (t.refFont = "Helvetica, Arial, FreeSans, Garuda, sans-serif"),
      (t.interval = t.interval || 20),
      (t.refTextWidth = 0),
      super(e, t),
      (this.loadFunc = this._loadFunc.bind(this)));
  }
  static dom;
  static initDom() {
    let e = document.createElement("dom");
    ((e.style.position = "fixed"),
      (e.style.left = e.style.top = 0),
      (e.style.visibility = "hidden"),
      (document.body || document.documentElement).appendChild(e),
      (FontItem.dom = e));
  }
  _loadFunc(e, t, r) {
    let n = e.split(","),
      a = [];
    for (let g = 0; g < n.length; g++) a.push(n[g].trim());
    n = this.refFont.split(":");
    let l = n[0],
      c = n[1] || "normal",
      u = n[2] || "normal",
      f,
      p = a.length;
    let timer = setTimeout(() => {
      clearInterval(f);
      t();
    }, 1200);
    f = setInterval(() => {
      if (!a.length) {
        clearInterval(f);
        clearTimeout(timer);
        t();
        return;
      }
      ((n = a[0].split(":")),
        (l = n[0]),
        (c = n[1] || "normal"),
        (u = n[2] || "normal"));
      let g = this._getTextWidth(l, c, u, this.refFont),
        v = this._getTextWidth(this.refFont, c, u, this.refFont);
      g !== v &&
        (a.shift(),
        r.dispatch((p - a.length) / p),
        a.length === 0 && (clearInterval(f), clearTimeout(timer), t()));
    }, this.interval);
  }
  _getTextWidth = (e, t, r, n) => {
    let a = FontItem.dom;
    return (
      (a.style.fontFamily = '"' + e + '"' + (n ? ", " + n : "")),
      (a.style.fontWeight = t),
      (a.style.fontStyle = r),
      (a.innerHTML = this.refText),
      a.getBoundingClientRect().width
    );
  };
  _onLoaderLoad(e, t) {
    ((this.content = t), e(t));
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
FontItem.type = "font";
FontItem.extensions = [];

globalThis.FontItem = FontItem;

export { FontItem };
export default FontItem;
