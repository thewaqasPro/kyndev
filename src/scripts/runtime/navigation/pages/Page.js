/**
 * Abstract Base Page Controller
 */
import * as THREE from "../../three.js";
const { Object3D } = THREE;
import Tween from "../../core/Tween.js";
import properties from "../../core/Properties.js";
import taskManager from "../../core/TaskManager.js";
import { MinSignal$2 } from "../../loaders/QuickLoader.js";
import sectionRegistry from "../../sections/SectionRegistry.js";

class Page {
  domContainer;
  route = null;
  time = 0;
  showDuration = 1;
  hideDuration = 1;
  showRatio = 0;
  hideRatio = 0;
  _showPageTween;
  _hidePageTween;
  isActive = !1;
  hasInitialized = !1;
  hasExtraPages = !0;
  hasEndVisual = !0;
  endVisualColor = properties.blueColorHex;
  endVisualUseTextured = !1;
  endSectionActiveThreshold = 0.9;
  useGenericTransition = !0;
  isFirstShown = !1;
  bypassShowingLoading = !1;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  onShowStarted = new MinSignal$2();
  onShowCompleted = new MinSignal$2();
  onHideStarted = new MinSignal$2();
  onHideCompleted = new MinSignal$2();
  activeSections = [];

  constructor() {
    this._showPageTween = new Tween(this);
    this._hidePageTween = new Tween(this);
  }

  get activeRatio() {
    return this.showRatio * (1 - this.hideRatio);
  }

  hasProject(e) {
    return !1;
  }

  get isScrollTarget() {
    return window.pagesManager?.scrollTargetPage === this;
  }

  preInit(e) {
    let container =
      this.domContainer ||
      (e && e.dom) ||
      (e && e.querySelector ? e : null) ||
      document.getElementById("page-container-inner") ||
      document.body;
    this.domContainer = container;
    this._initDynamicSections(container);
  }

  preInitContent(e) {}

  _initDynamicSections(container) {
    this.activeSections = sectionRegistry.detectSections(
      container || this.domContainer || document,
      this,
    );
  }

  _ensureSectionContainers() {
    for (let i = 0; i < this.activeSections.length; i++) {
      let s = this.activeSections[i];
      if (s.frameMesh) {
        this.preUfxContainer.add(s.frameMesh);
      }
      if (s.ufxMesh) {
        this.preUfxContainer.add(s.ufxMesh);
      }
      if (s.lineVisual?.container) {
        if (s === window.homeGoalSection) {
          this.postUfxContainer.add(s.lineVisual.container);
        } else {
          this.preUfxContainer.add(s.lineVisual.container);
        }
      }
      if (s.frameBgMesh) {
        this.preUfxContainer.add(s.frameBgMesh);
      }
      if (s === window.homeGoalSection) {
        if (window.goalTunnelGlass?.container) this.preUfxContainer.add(window.goalTunnelGlass.container);
        if (window.goalTunnelAstronauts?.container) this.preUfxContainer.add(window.goalTunnelAstronauts.container);
      }
    }
  }

  init(e) {
    taskManager.add(this.preUfxContainer);
    taskManager.add(this.postUfxContainer);
    this._ensureSectionContainers();
    for (let i = 0; i < this.activeSections.length; i++) {
      let s = this.activeSections[i];
      if (typeof s.init === "function") s.init();
    }
  }

  initContent(e) {}

  show(e, t, r) {
    this._ensureSectionContainers();
    if (this._showPageTween) {
      this._showPageTween.kill();
      this._showPageTween.onComplete = r;
      this.hideRatio = 0;
      this._showPageTween.fromTo(
        this.showDuration,
        { showRatio: 0 },
        { showRatio: 1 },
      );
    } else {
      r && r();
    }
  }

  hide(e, t, r) {
    if (this._hidePageTween) {
      this._hidePageTween.kill();
      this._hidePageTween.onComplete = r;
      this._hidePageTween.fromTo(
        this.hideDuration,
        { hideRatio: 0 },
        { hideRatio: 1 },
      );
    } else {
      r && r();
    }
    for (let i = 0; i < this.activeSections.length; i++) {
      let s = this.activeSections[i];
      if (typeof s.hide === "function") s.hide();
      else if (typeof s._onPageHideStarted === "function") s._onPageHideStarted();
    }
  }

  resize(e, t) {
    for (let i = 0; i < this.activeSections.length; i++) {
      let s = this.activeSections[i];
      if (typeof s.resize === "function") s.resize(e, t);
    }
  }

  update(e) {
    for (let i = 0; i < this.activeSections.length; i++) {
      let s = this.activeSections[i];
      if (typeof s.update === "function") s.update(e);
    }

    if (
      typeof window !== "undefined" &&
      window.homeGoalSection &&
      this.activeSections.includes(window.homeGoalSection) &&
      window.pagesManager?.scrollTargetPage === this &&
      window.homeGoalSection.domContainer
    ) {
      let isBlack =
        window.scrollManager?.getDomRange(window.homeGoalSection.domContainer)?.screenRatio === 1;
      let isWhite = !isBlack;
      let isBlue = !1;
      if (window.homeGoalSection.uiBgColorNeedsOverride) {
        isBlack = window.homeGoalSection.isUIBgBlack;
        isWhite = !isBlack;
      }
      if (typeof window.footerSection !== "undefined" && window.footerSection.getDomRange().ratio > -0.1) {
        isWhite = !0;
        isBlack = !1;
        isBlue = !1;
      }
      properties.bgColor.setStyle(isBlack ? properties.blackColorHex : properties.offWhiteColorHex);
      document.documentElement.classList.toggle("is-black-bg", isBlack);
      document.documentElement.classList.toggle("is-white-bg", isWhite);
      document.documentElement.classList.toggle("is-blue-bg", isBlue);
    }
  }
}

let self$1;

export { Page };
globalThis.Page = Page;

export default Page;
