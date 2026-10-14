/**
 * Client-Side SPA Route Manager & HTML Cache
 */
class Route {
  constructor(e) {
    ((this.path = e),
      (this.pathNodes = e ? e.split("/") : []),
      (this.target = null),
      (this.title = ""),
      (this.dom = null),
      (this.scrollNavPath = ""),
      (this.scrollNavText = ""),
      (this.hasContentPreloaded = !1),
      (this.content = {}));
  }
  setTitleDom(e, t, r, n) {
    ((this.title = e),
      (this.dom = t),
      (this.scrollNavPath = r),
      (this.scrollNavText = n));
  }
  setTarget(e) {
    let t = null;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (n.regExp.test(this.path)) {
        t = n;
        break;
      }
    }
    (t ||
      (console.error("route not found for path: " + this.path),
      (window.location.href = window.location.origin)),
      (this.target = t.target));
  }
}
let loc = window.location,
  ORIGIN = window.location.origin,
  URL_PREFIX_REGEX = new RegExp("^" + ORIGIN.replace(/\//g, "\\/"));
class RouteManager {
  routes = {};
  matchList = [];
  currPath = null;
  _pendingPath = null;
  queryStr;
  onRouteChanged = new MinSignal$2();
  get currRoute() {
    return this.routes[this.currPath];
  }
  init() {
    ((this.queryStr = loc.href.split("?")[1] || ""),
      window.addEventListener("popstate", this._onStatePop.bind(this)),
      this.setUrl());
  }
  addPath(e, t) {
    this.matchList.push({
      regExp: e instanceof RegExp ? e : new RegExp("^" + e + "$"),
      target: t,
    });
  }
  _createRoute(e) {
    let t = (this.routes[e] = new Route(e));
    return (t.setTarget(this.matchList), t);
  }
  _fetchHtml(e) {
    let t = this.routes[e];
    if (t && t.dom) {
      this._onDomReady(t);
      return;
    }
    let route = t || this._createRoute(e);
    if (route._isFetching) return;
    route._isFetching = true;
    let url = "/" + (e ? e.replace(/^\/|\/$/g, "") + "/" : "");
    properties.loader.load(url, {
      type: "text",
      onLoad: (html) => {
        route._isFetching = false;
        this._initDom(route, html);
      },
      onError: () => {
        route._isFetching = false;
        window.location.href = url;
      },
    });
  }
  _initDom(e, t) {
    let r = document,
      n = r.title;
    if (t) {
      r = r.implementation.createHTMLDocument();
      let headMatch = /<head[^>]*>((.|[\n\r])*)<\/head>/im.exec(t);
      if (headMatch) {
        r.head.innerHTML = headMatch[1];
        let links = r.head.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
          let href = link.getAttribute("href");
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            let newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.href = href;
            document.head.appendChild(newLink);
          }
        });
        let styles = r.head.querySelectorAll("style");
        styles.forEach((style) => {
          let css = style.textContent;
          if (css && !Array.from(document.querySelectorAll("style")).some((s) => s.textContent === css)) {
            let newStyle = document.createElement("style");
            newStyle.textContent = css;
            document.head.appendChild(newStyle);
          }
        });
      }
      let bodyMatch = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(t);
      if (bodyMatch) {
        r.body.innerHTML = bodyMatch[1];
      }
      let u = /<title[^>]*>((.|[\n\r])*)<\/title>/im.exec(t);
      n = u ? u[1] : "";
    }
    let a = r.getElementById("scroll-nav-section"),
      l,
      c;
    (a &&
      ((l = a.dataset.path),
      (c = r.getElementById("scroll-nav-text").innerHTML)),
      e.setTitleDom(n, r.querySelector(".page"), l, c),
      a && a.removeAttribute("data-path"),
      this._attachEvents(t ? e.dom : r.documentElement),
      this._onDomReady(e));
  }
  _attachEvents(e) {
    let t = e.querySelectorAll("a");
    for (let r = 0, n = t.length; r < n; r++) {
      let a = t[r];
      if (!a.__hasClickParsed) {
        a.__hasClickParsed = !0;
        let l =
          a.href.indexOf(window.location.origin) === 0 ||
          a.href.indexOf("/") === 0;
        (a.dataset.linkType && (l = a.dataset.linkType === "internal"),
          l
            ? (a.addEventListener("mouseenter", (c) => {
                this.preFetch(this.parseUrl(a.href));
              }),
              a.addEventListener(
                "click",
                this._onInternalLinkClick.bind(this, a),
              ))
            : a.addEventListener(
                "click",
                this._onRegularLinkClick.bind(this, a),
              ));
      }
    }
  }
  _onRegularLinkClick(e, t) {
    let r = e.href;
    if (r.indexOf("https://player.vimeo.com/video/") === 0) {
      t.preventDefault();
      let n = r.split("/").pop();
      videoOverlay.initAndPlayVideo(n, !0);
    }
  }
  _onInternalLinkClick(e, t) {
    t.preventDefault();
    let r = !0;
    (e._onPreClick && (r = e._onPreClick() !== !1), r && this.setUrl(e.href));
  }
  _onDomReady(e) {
    this._pendingPath == e.path &&
      ((this._pendingPath = null), this.onRouteChanged.dispatch(e));
  }
  parseUrl(e = loc.href) {
    let t = e.replace(URL_PREFIX_REGEX, ""),
      r = t.split("#");
    return (r[1], (r = r[0].split("?")), r[1], (t = this.parsePath(r[0])), t);
  }
  parsePath(e) {
    return ((e = e.replace(/^\/|\/$/g, "")), e);
  }
  setUrl(e = loc.href) {
    let t = this.parseUrl(e);
    this.setPath(t);
  }
  setPath(e) {
    ((e = this.parsePath(e)),
      e !== this.currPath &&
        (history.pushState(
          null,
          null,
          (e || "/") + (this.queryStr ? "?" + this.queryStr : ""),
        ),
        this._onStatePop()));
  }
  preFetch(e) {
    ((e = this.parsePath(e)), this._fetchHtml(e));
  }
  _onStatePop(e) {
    e && e.preventDefault();
    let t = this.parseUrl();
    t !== this.currPath &&
      ((this.currPath = t),
      (this._pendingPath = t),
      properties.hasInitialized
        ? this._fetchHtml(t)
        : this._initDom(this._createRoute(t)));
  }
}
const routeManager = new RouteManager();
globalThis.routeManager = routeManager;
globalThis.Route = Route;
let _c1$1 = new Color(),
  _c2$1 = new Color();

export { Route, RouteManager, routeManager };
export default routeManager;
