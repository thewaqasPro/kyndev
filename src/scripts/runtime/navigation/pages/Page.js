/**
 * Abstract Base Page Controller
 */
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
  constructor() {
    ((this._showPageTween = new Tween(this)),
      (this._hidePageTween = new Tween(this)));
  }
  get activeRatio() {
    return this.showRatio * (1 - this.hideRatio);
  }
  hasProject(e) {
    return !1;
  }
  get isScrollTarget() {
    return pagesManager.scrollTargetPage === this;
  }
  preInit(e) {}
  preInitContent(e) {}
  init(e) {
    (taskManager.add(this.preUfxContainer),
      taskManager.add(this.postUfxContainer));
  }
  initContent(e) {}
  show(e, t, r) {
    (this._showPageTween.kill(),
      (this._showPageTween.onComplete = r),
      (this.hideRatio = 0),
      this._showPageTween.fromTo(
        this.showDuration,
        { showRatio: 0 },
        { showRatio: 1 },
      ));
  }
  hide(e, t, r) {
    (this._hidePageTween && this._hidePageTween.kill(),
      (this._hidePageTween.onComplete = r),
      this._hidePageTween.fromTo(
        this.hideDuration,
        { hideRatio: 0 },
        { hideRatio: 1 },
      ));
  }
  resize(e, t) {}
  update(e) {}
}
let self$1;

export { Page };
globalThis.Page = Page;

export default Page;