import homePage from './pages/HomePage.js';
import aboutPage from './pages/AboutPage.js';
import projectPage from './pages/ProjectPage.js';
import projectsPage from './pages/ProjectsPage.js';
import playgroundPage from './pages/PlaygroundPage.js';
import servicesPage from './pages/ServicesPage.js';
import contactPage from './pages/ContactPage.js';
import heroToolsPage from './pages/HeroToolsPage.js';
import hubPage from './pages/HubPage.js';
import routeManager, { Route } from './RouteManager.js';
import { MinSignal$2 } from '../loaders/QuickLoader.js';
import { preUfx, postUfx } from '../webgl/passes/PostEffect.js';
import transitionOverlay from '../ui/TransitionOverlay.js';
import taskManager from '../core/TaskManager.js';
import math from '../core/MathUtils.js';
import properties from '../core/Properties.js';
import scrollManager from './ScrollManager.js';
import { pageExtraSections } from '../ui/FooterSection.js';
import audios from '../audio/Audios.js';

/**
 * Page Transitions & Active Route Coordinator
 */
class PageManager {
  pages = {};
  pageList = [homePage, aboutPage, projectPage, projectsPage, playgroundPage, servicesPage, contactPage, heroToolsPage, hubPage];
  scrollTargetPage = null;
  domContainer = null;
  domInner = null;
  prevRoute = null;
  currRoute = null;
  _defaultRoute;
  _pendingRoute;
  _isHiding = !1;
  _isShowing = !1;
  _hasPreloaded = !0;
  isFirstRoute = !0;
  _needsShowLoading = !1;
  onIdled = new MinSignal$2();
  onScrollTargetChanged = new MinSignal$2();
  NEEDS_LOG = !1;
  constructor() {
    ((this._defaultRoute = new Route(void 0)),
      (this.prevRoute = this.currRoute = this._defaultRoute));
    for (let e = 0; e < this.pageList.length; e++) {
      let t = this.pageList[e];
      ((this.pages[t.id] = t),
        routeManager.addPath(t.path, t),
        preUfx?.scene?.add(t.preUfxContainer),
        postUfx?.scene?.add(t.postUfxContainer));
    }
    (transitionOverlay.onShowTextCompleted.add(this._onShowTextComplete, this),
      transitionOverlay.onHideTextCompleted.add(this._onHideTextComplete, this),
      taskManager.onCompleted.add(this._onTaskComplete, this));
  }
  preInit() {
    ((this.domContainer = document.getElementById("page-container")),
      (this.domContainerInner = document.getElementById(
        "page-container-inner",
      )),
      routeManager.onRouteChanged.add(this._onRouteChanged, this),
      this._onRouteChanged(routeManager.currRoute));
  }
  get isIdle() {
    return (
      !this._isHiding &&
      this._hasPreloaded &&
      !this._isShowing &&
      !this._needsShowLoading
    );
  }
  _onRouteChanged(e) {
    if (!this.isIdle) this._pendingRoute = e;
    else if (this.currRoute !== e) {
      ((this.prevRoute = this.currRoute), (this.currRoute = e));
      let t = this.currRoute.target;
      if (!t.domContainer) {
        t.domContainer = this.currRoute.dom || t.domContainer;
        this._log("preInit: " + this.currRoute.path);
        t.preInit(this.currRoute);
        if (properties.hasInitialized && !t.bypassShowingLoading) {
          this._needsShowLoading = true;
        }
      }
      if (properties.hasInitialized) {
        this._hasPreloaded = false;
      } else {
        this.scrollTargetPage = t;
        this.onScrollTargetChanged.dispatch(t);
      }
      if (!this.currRoute.hasContentPreloaded) {
        this._log("preInitContent: " + this.currRoute.path);
        t.preInitContent(this.currRoute);
      }
      if (properties.hasInitialized) {
        if (this._transitionSafetyTimeout) clearTimeout(this._transitionSafetyTimeout);
        this._transitionSafetyTimeout = setTimeout(() => {
          if (this._isHiding || !this._hasPreloaded || this._isShowing || this._needsShowLoading) {
            console.warn("[PageManager watchdog]: Auto-completing stalled transition for", this.currRoute?.path);
            this._isHiding = false;
            this._hasPreloaded = true;
            this._needsShowLoading = false;
            this._isShowing = false;
            transitionOverlay.needsShowText = false;
            transitionOverlay.needsHideText = false;
            transitionOverlay.hideTextRatio = 1;
            transitionOverlay.contentShowRatio = 1;
            if (transitionOverlay.canvas) transitionOverlay.canvas.style.display = "none";
            this._showPage();
          }
        }, 2500);
        ((transitionOverlay.showTextRatio = 0),
          (transitionOverlay.waitTextRatio = 0),
          (transitionOverlay.hideTextRatio = 0),
          (transitionOverlay.needsShowText = !1),
          (transitionOverlay.needsHideText = !1));
        let r = this.prevRoute.target;
        ((this._isHiding = !0),
          this._log("hide page", r.id),
          r.onHideStarted.dispatch(),
          r.hide(this.prevRoute, this.currRoute, () => {
            ((this._isHiding = !1),
              this._needsShowLoading
                ? (transitionOverlay.needsShowText = !0)
                : this._hasPreloaded && this._onHideComplete());
          }),
          r.useGenericTransition && audios.countPlay("page"),
          properties.loader.start((n) => {
            n == 1 &&
              ((this._hasPreloaded = !0),
              this._isHiding ||
                (this._needsShowLoading
                  ? transitionOverlay.showTextRatio == 1 &&
                    this._onHideComplete()
                  : this._onHideComplete()));
          }));
      }
    }
  }
  _onShowTextComplete() {
    this._hasPreloaded && this._onHideComplete();
  }
  _onHideTextComplete() {
    this._showPage();
  }
  _onTaskComplete() {
    this.isFirstRoute;
  }
  init() {
    this._initPage();
  }
  _initPage() {
    let e = this.currRoute.target;
    (e.hasInitialized ||
      (this._log("init: " + this.currRoute.path),
      e.init(this.currRoute),
      (e.hasInitialized = !0)),
      this.currRoute.hasContentPreloaded ||
        ((this.currRoute.hasContentPreloaded = !0),
        this._log("initContent: " + this.currRoute.path),
        e.initContent(this.currRoute)),
      taskManager.start());
  }
  _onHideComplete() {
    if ((this._initPage(), this.prevRoute.target)) {
      let e = this.prevRoute.target;
      (e.onHideCompleted.dispatch(),
        this._log("hide page complete: " + this.prevRoute.path),
        (e.isActive = !1),
        e !== this.currRoute.target &&
          (e.domContainer.remove(),
          (e.preUfxContainer.visible = !1),
          (e.postUfxContainer.visible = !1)));
    }
    this._needsShowLoading
      ? (transitionOverlay.needsHideText = !0)
      : this._showPage();
  }
  resize(e, t) {
    (this.prevRoute.target &&
      this.prevRoute.target.isActive &&
      this.prevRoute.target !== this.currRoute.target &&
      this.prevRoute.target.hasInitialized &&
      this.prevRoute.target.resize(e, t),
      this.currRoute &&
        this.currRoute.target.isActive &&
        this.currRoute.target.resize(e, t));
  }
  start() {
    this._showPage();
  }
  _showPage() {
    ((this._isShowing = !0), (this._needsShowLoading = !1));
    let e = this.currRoute.target;
    if (!this.domContainerInner || !this.domContainerInner.isConnected) {
      this.domContainerInner = document.getElementById("page-container-inner") || document.getElementById("page-container") || document.body;
    }
    ((e.isActive = !0),
      properties.hasInitialized &&
        e !== this.prevRoute.target &&
        (this.domContainerInner.prepend(e.domContainer), (e.time = 0)),
      (document.title = this.currRoute.title),
      (this.scrollTargetPage = e),
      (e.preUfxContainer.visible = !0),
      (e.postUfxContainer.visible = !0),
      this.onScrollTargetChanged.dispatch(e),
      this._log("show page: " + this.currRoute.path),
      pageExtraSections?.resize(
        properties.viewportWidth,
        properties.viewportHeight,
      ),
      scrollManager?.resize(properties.viewportWidth, properties.viewportHeight),
      scrollManager?.scrollToPixel(0, !0),
      e.resize(properties.viewportWidth, properties.viewportHeight),
      e.onShowStarted.dispatch(),
      e.show(this.prevRoute, this.currRoute, this._onShowComplete.bind(this)),
      e.useGenericTransition && audios.countPlay("page"));
  }
  _onShowComplete() {
    if (this._transitionSafetyTimeout) {
      clearTimeout(this._transitionSafetyTimeout);
      this._transitionSafetyTimeout = null;
    }
    transitionOverlay.contentShowRatio = 1;
    if (transitionOverlay.canvas) {
      transitionOverlay.canvas.style.display = "none";
      if (transitionOverlay.ctx) {
        transitionOverlay.ctx.clearRect(
          0,
          0,
          transitionOverlay.canvas.width,
          transitionOverlay.canvas.height,
        );
      }
    }
    this._isShowing = !1;
    this.isFirstRoute = !1;
    this.currRoute.target.isFirstShown = !0;
    this.currRoute.target.onShowCompleted.dispatch();
    this._log("===============");
    if (this._pendingRoute) {
      let e = this._pendingRoute;
      ((this._pendingRoute = null), this._onRouteChanged(e));
    } else {
      this.onIdled.dispatch();
    }
    if (properties.isContactFromProjectPage) {
      properties.isContactFromProjectPage = !1;
      scrollManager.scrollTo("footer-section", 0, !1);
    }
  }
  update(e) {
    if (
      this.prevRoute.target &&
      this.prevRoute.target.isActive &&
      this.prevRoute.target !== this.currRoute.target &&
      this.prevRoute.target.hasInitialized
    ) {
      let t = this.prevRoute.target;
      ((t.time += e), t.update(e));
    }
    if (this.currRoute && this.currRoute.target.isActive) {
      let t = this.currRoute.target;
      ((t.time += e), t.update(e));
    }
    if (!this.isFirstRoute) {
      ((this._isHiding || !this._hasPreloaded) &&
        !this._isShowing &&
        this.prevRoute.target.useGenericTransition &&
        ((transitionOverlay.contentHideRatio = this.prevRoute.target.hideRatio),
        (transitionOverlay.contentShowRatio = 0)),
        this._isShowing &&
          this.currRoute.target &&
          this.currRoute.target.useGenericTransition &&
          ((transitionOverlay.contentHideRatio = 1),
          (transitionOverlay.contentShowRatio =
            this.currRoute.target.showRatio)));
      let t = 1;
      (this.prevRoute != this.currRoute &&
        (this._isHiding &&
          !this.prevRoute.target.useGenericTransition &&
          (t *= math.fit(this.prevRoute.target.hideRatio, 0, 0.5, 1, 0)),
        this._isShowing &&
          !this.currRoute.target.useGenericTransition &&
          (t *= math.fit(this.currRoute.target.showRatio, 0.5, 1, 0, 1))),
        (this.domContainer.style.opacity = t));
    }
  }
  _log(e) {}
}
const pagesManager = new PageManager();
globalThis.pagesManager = pagesManager;
window.pagesManager = pagesManager;

export { PageManager, pagesManager };
export default pagesManager;
