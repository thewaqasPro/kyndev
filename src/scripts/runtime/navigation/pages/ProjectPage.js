/**
 * Project Case Study Details Page Controller
 */
class ProjectPage extends Page {
  path = /projects\/([^\/]+)$/;
  id = "project";
  hasExtraPages = !1;
  bypassShowingLoading = !0;
  contentShowRatio = 0;
  nextProjectRatio = 0;
  prevNonProjectPath = null;
  preInit() {
    this._hideShownTween = new Tween(
      this,
      this._onContentShowComplete.bind(this),
    );
    let e = this.domContainer;
    (projectDetailsSection.preInit(e), videoOverlay.preInit());
  }
  preInitContent(e) {
    projectDetailsSection.preInitContent(e);
  }
  init() {
    (projectDetailsSection.init(), videoOverlay.init(), super.init());
  }
  show(e, t, r) {
    ((this.useGenericTransition = !0), this._showPageTween.kill());
    let n = t.pathNodes[1];
    ((this.hideRatio = 0),
      (header.forceWhite = !0),
      (header.domRightMenuBtn.style.background = "#fff"),
      header.domContainer.classList.add("--is-projects"),
      (projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "auto"),
      e.target && e.target !== this && (this.prevNonProjectPath = e.path),
      (this._onShowCompleteCallback = r),
      e.target === t.target
        ? ((this.useGenericTransition = !1),
          projectDetailsSection.updatePreviewUI(n, !1),
          projectDetailsSection.update(0, !0),
          (this._showPageTween.onComplete =
            this._onNextProjectComplete.bind(this)),
          this._showPageTween.fromTo(
            1,
            { nextProjectRatio: 0 },
            { nextProjectRatio: 1 },
          ))
        : (e.target &&
            e.target.hasProject(n) &&
            (this.useGenericTransition = !1),
          projectDetailsSection.show(n),
          (this._showPageTween.onComplete = r),
          this._showPageTween.fromTo(
            this.showDuration,
            { showRatio: 0, contentShowRatio: 0 },
            { showRatio: 1, contentShowRatio: 1 },
          )),
      projectPageAudios.init());
  }
  hide(e, t, r) {
    if (
      ((this.useGenericTransition = !0),
      header.domRightMenuBtn.style.removeProperty("background"),
      header.domContainer.classList.remove("--is-projects"),
      (projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "none"),
      e.target === t.target)
    )
      ((this.useGenericTransition = !1), (this.hideRatio = 1), r());
    else {
      let n = e.pathNodes[1];
      (t.target.hasProject(n) &&
        t.target.isFirstShown &&
        (this.useGenericTransition = !1),
        super.hide(e, t, () => {
          (header.domContainer.style.removeProperty("color"),
            (header.forceWhite = !1));
          for (let a in projectDetailsSection.projectDetailsData)
            a.replace(/^color(.+)/g, (l, c) => {
              ((c = c
                .replace(
                  /([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g,
                  (u, f, p) => f + "-" + p,
                )
                .toLowerCase()),
                properties.domRoot.style.removeProperty(
                  "--project-details-" + c,
                ),
                properties.domRoot.style.removeProperty("--header-color"),
                properties.domRoot.style.removeProperty("--header-text-color"));
            });
          r();
        }));
    }
  }
  resize(e, t) {
    this.hasInitialized && projectDetailsSection.resize(e, t);
  }
  update(e) {
    (super.update(e),
      this.hasInitialized &&
        (properties.smaa && (properties.smaa.enabled = !1),
        projectDetailsSection.update(e),
        projectPageAudios.update(e)));
  }
  _onContentShowComplete() {
    this._onShowCompleteCallback();
  }
  _onNextProjectComplete() {
    this._hideShownTween.kill();
    let e = pagesManager.currRoute.pathNodes[1];
    ((this.nextProjectRatio = 0),
      (this.contentShowRatio = 0),
      projectDetailsSection.show(e),
      this._hideShownTween.fromTo(
        1.5,
        { contentShowRatio: 0 },
        { contentShowRatio: 1 },
      ));
  }
}
const projectPage = new ProjectPage();
let _brokenGlassStep = 0;

export { ProjectPage, projectPage };
globalThis.projectPage = projectPage;

export default projectPage;
