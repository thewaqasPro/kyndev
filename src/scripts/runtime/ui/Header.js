
import * as THREE from "../three.js";
const { Color } = THREE;
let _c1$1 = new Color(), _c2$1 = new Color();

/**
 * Navigation Header Controller & Menu Interactions
 */
class Header {
  sectionId = ["home", "about", "project", "who", "end"];
  isActive = !1;
  ratio = 0;
  soundBtnTime = 0;
  soundBtnSize = 0;
  soundBtnHoverRatio = 0;
  soundBtnHoverAngle = 0;
  isSoundBtnHover = !1;
  forceWhite = !1;
  menu = { opened: !1, ratio: 0 };
  headerColor = "transparent";
  headerTextColor = "#000";
  preInit() {
    ((this.domContainer = document.getElementById("header")),
      (this.domHeaderContainer = document.getElementById("header-menu")),
      (this.domLogoSvg = document.querySelector("#header-logo svg")),
      (this.domBackground = document.getElementById("header-background")),
      (this.domRight = document.getElementById("header-right")),
      (this.domRightSoundBtn = document.getElementById(
        "header-right-sound-btn",
      )),
      (this.domRightSoundBtnCanvas =
        this.domRightSoundBtn.querySelector("canvas")),
      (this.domRightSoundBtnCtx = this.domRightSoundBtnCanvas.getContext("2d")),
      (this.domRightTalkBtn = document.getElementById("header-right-talk-btn")),
      (this.domRightTalkBtnContainer = document.getElementById(
        "header-right-talk-container",
      )),
      (this.domRightTalkPlaceholder = document.getElementById(
        "header-right-talk-btn-placeholder",
      )),
      (this.domRightMenuBtn = document.getElementById("header-right-menu-btn")),
      (this.domMenuLinks = Array.from(
        document.querySelectorAll("#header-menu-links .header-menu-link"),
      )),
      (this.domMenuLinkContact = document.querySelector(
        '.header-menu-link[data-scroll-to="contact"]',
      )),
      (this.domMenuTalk = document.getElementById("header-menu-talk")),
      (this.domMenuNewsletterForm = document.getElementById(
        "header-menu-newsletter-form",
      )),
      (this.domMenuNewsletterButton = document.getElementById(
        "header-menu-newsletter-input-arrow",
      )),
      (this.domMenuNewsletterMessage = document.getElementById(
        "header-menu-newsletter-feedback-message",
      )),
      (this.formManager = new NewletterForm(
        this.domMenuNewsletterForm,
        this.domMenuNewsletterButton,
        this.domMenuNewsletterMessage,
      )),
      (this.containers = [
        document.getElementById("header-menu-links"),
        document.getElementById("header-menu-newsletter"),
        this.domMenuTalk,
        document.getElementById("header-menu-labs"),
      ]),
      routeManager.onRouteChanged.add(this._onRouteChanged, this),
      pagesManager.onScrollTargetChanged.add(
        this._onPageScrollTargetChange,
        this,
      ),
      (document.querySelector("#header-logo")._onPreClick = () => {
        if (routeManager.currRoute.target == homePage)
          return (scrollManager.scrollToPixel(0), !1);
      }),
      pagesManager.onIdled.add(() => {
        ((this.headerColor = window
          .getComputedStyle(properties.domRoot, null)
          .getPropertyValue("--header-color")),
          (this.headerTextColor = window.getComputedStyle(
            this.domRightMenuBtn,
          ).color),
          (this.headerTextColorHover = window
            .getComputedStyle(properties.domRoot, null)
            .getPropertyValue("--project-details-btn-text-hover")));
      }));
  }
  init() {
    if (!this.domRightSoundBtn) this.preInit();
    if (!this.domRightSoundBtn) return;
    (settings.USE_AUDIO || (this.domRightSoundBtn.style.visibility = "hidden"),
      input.onClicked.add(() => {
        !input.hasThroughElem(this.domRightMenuBtn, "click") &&
          !input.hasThroughElem(this.domHeaderContainer, "click") &&
          this._enableMenu(!1);
      }),
      this.domRightSoundBtn.addEventListener("mouseenter", (e) => {
        let t = this.domRightSoundBtn.getBoundingClientRect(),
          r = e.clientX - t.left - t.width / 2,
          n = e.clientY - t.top - t.height / 2;
        ((this.soundBtnHoverAngle = Math.atan2(n, r) - Math.PI / 2),
          (this.isSoundBtnHover = !0));
      }),
      this.domRightSoundBtn.addEventListener("mouseleave", () => {
        this.isSoundBtnHover = !1;
      }),
      this.domRightSoundBtn.addEventListener(
        "click",
        this._onDomRightSoundBtn.bind(this),
      ),
      this.domRightMenuBtn.addEventListener(
        "click",
        this._domRightMenuBtnClick.bind(this),
      ),
      this.domMenuLinkContact &&
        this.domMenuLinkContact.addEventListener(
          "click",
          this._onDomMenuLinkContact.bind(this),
        ),
      this.containers.filter(Boolean).forEach((e, t) => {
        (e.style.setProperty("--open-delay", t / 50 + "s"),
          e.style.setProperty(
            "--close-delay",
            Math.abs(t - this.containers.length) / 50 + "s",
          ));
      }));
  }
  show() {
    this.isActive = !0;
  }
  hideTalkBtn() {}
  changeSection(e) {
    scrollManager.scrollTo(e);
  }
  _onDomRightSoundBtn(e) {
    e?.stopPropagation();
    audios.toggle();
  }
  _onRouteChanged() {
    this._enableMenu(!1);
  }
  _domRightMenuBtnClick() {
    this._enableMenu(!this.menu.opened);
  }
  _onDomMenuLinkContact() {
    routeManager.currRoute.pathNodes[0] === "projects" &&
    routeManager.currRoute.pathNodes[1]
      ? ((properties.isContactFromProjectPage = !0),
        document.querySelector("[data-page='home']").click())
      : (scrollManager.scrollTo("footer-section"), this._enableMenu(!1));
  }
  _enableMenu(e) {
    ((this.menu.opened = e),
      this.domContainer.classList.toggle("--menu-opened", e),
      this.domHeaderContainer.classList.toggle("--opened", e),
      this.domBackground.classList.toggle("--opened", e),
      this.domRightMenuBtn.classList.toggle("--opened", e),
      e
        ? ((this.domBackground.style.opacity =
            properties.viewportWidth >= 1e3 ? 0.2 : 1),
          (this.domHeaderContainer.style.pointerEvents = "auto"))
        : ((this.domBackground.style.opacity = 0),
          (this.domHeaderContainer.style.pointerEvents = "none")));
  }
  _domRightMenuListMouseenter() {
    this.menu.hover = !0;
  }
  _domRightMenuListMouseleave() {
    this.menu.hover = !1;
  }
  _onWindowClick(e) {
    e.target.closest("#header-menu") ||
      e.target.closest("#header-right-menu-btn") ||
      this._enableMenu(!1);
  }
  _onPageScrollTargetChange(e) {
    const t = this.domMenuLinks.filter((n) =>
        n.classList.contains("--active"),
      )[0],
      r = this.domMenuLinks.filter((n) => n.dataset.page === e.id)[0];
    (t && t.classList.remove("--active"), r && r.classList.add("--active"));
  }
  resize(e, t) {
    if (!this.domRightTalkBtn) this.preInit();
    if (!this.domRightTalkBtn || !this.domRightTalkPlaceholder || !this.domRightSoundBtn) return;
    let r = this.domRightTalkBtn.getBoundingClientRect(),
      n = this.domRightTalkPlaceholder.getBoundingClientRect(),
      a = this.domRightSoundBtn.getBoundingClientRect();
    ((this.soundBtnSize = a.width),
      (this.domRightSoundBtnCanvas.width = Math.round(
        this.soundBtnSize * (browser$1.devicePixelRatio > 1 ? 2 : 1),
      )),
      (this.domRightSoundBtnCanvas.height = Math.round(
        this.soundBtnSize * (browser$1.devicePixelRatio > 1 ? 2 : 1),
      )),
      (this.domRightTalkBtn._width = r.width),
      (this.domRightTalkBtn._height = r.height),
      (this.domRightTalkBtn._placeholderWidth = n.width),
      (this.domRightTalkBtn._toWidth = r.height),
      (this.domRightTalkBtn._deltaX =
        n.left -
        properties.viewportWidth * 0.5 +
        parseFloat(getComputedStyle(this.domRightTalkBtn).fontSize) *
          3.2 *
          0.5));
  }
  updateSoundWave(e) {
    let t = (this.soundBtnHoverRatio = math.saturate(
      this.soundBtnHoverRatio + (this.isSoundBtnHover ? e : -e) / 0.3,
    ));
    this.soundBtnTime += e * 0.6 * (1 + t * 0.5);
    let r = this.soundBtnSize,
      n = this.domRightSoundBtnCtx,
      a = browser$1.devicePixelRatio > 1 ? 2 : 1;
    if (
      (n.save(),
      n.scale(a, a),
      n.clearRect(0, 0, r, r),
      n.translate(r / 2, r / 2),
      t < 1 &&
        (n.beginPath(),
        n.arc(0, 0, r / 2, 0, Math.PI * 2),
        _c1$1.setStyle("#E4E6EF"),
        _c2$1.setStyle("#fff"),
        (n.fillStyle = _c1$1
          .lerp(_c2$1, Math.max(this.menu.ratio, +this.forceWhite))
          .getStyle()),
        n.fill(),
        n.closePath()),
      t > 0)
    ) {
      (n.save(), t < 1 && (n.globalCompositeOperation = "source-atop"));
      let f = ease.cubicInOut(t);
      (n.rotate(this.soundBtnHoverAngle),
        n.translate(0, math.fit(t, 0, 1, r * 0.75, 0, ease.cubicInOut)),
        n.scale(f, f),
        n.beginPath(),
        n.arc(0, 0, r / 2, 0, Math.PI * 2),
        (n.fillStyle = this.headerColor),
        n.fill(),
        n.closePath(),
        n.restore());
    }
    (_c1$1.setStyle(this.headerTextColor),
      _c2$1.setStyle(this.headerTextColorHover),
      (n.strokeStyle = _c1$1.lerp(_c2$1, t).getStyle()),
      (n.lineWidth = r * 0.05),
      (n.lineCap = "round"),
      n.beginPath());
    let l = 32,
      c = r * 0.4,
      u = r * 0.28 * (audios.isActive ? audios.volume : 0);
    for (let f = 0; f < l + 1; f++) {
      let p = -c / 2 + (c * f) / l,
        g =
          ((Math.sin(this.soundBtnTime * 8 + (f / l) * 7) * u) / 2) *
          math.fit(Math.abs(f / l - 0.5), 0.5, 0.25, 0.3, 1, ease.sineInOut);
      f == 0 ? n.moveTo(p, g) : n.lineTo(p, g);
    }
    (n.stroke(), n.closePath());
    if (!audios.isActive || audios.volume < 0.05) {
      n.beginPath();
      let s = c * 0.36;
      n.moveTo(-s, s * 0.85);
      n.lineTo(s, -s * 0.85);
      n.stroke();
      n.closePath();
    }
    n.restore();
  }
  update(e) {
    if (!this.domRightSoundBtn) return;
    ((this.menu.ratio = math.saturate(
      this.menu.ratio + (this.menu.opened ? e : -e),
    )),
      (this.ratio = math.clamp(this.ratio + (this.isActive ? e : -e), 0, 2)));
    const t = math.fit(this.ratio, 0.9, 1.7, 0, 1),
      r = math.fit(t, 0, 1, 4, 0, ease.lusion);
    if (
      ((this.domRightSoundBtn.style.transform = `translate3d(0, ${r}em, 0)`),
      (this.domRightTalkBtn.style.display = "none"),
      properties.useMobileLayout || this.updateSoundWave(e),
      properties.useMobileLayout)
    )
      ((this.domRightTalkBtnContainer.style.opacity = 0),
        (this.domRightTalkBtn.style.transform = "none"));
    else {
      let l = math.fit(this.ratio, 1, 1.8, 0, 1),
        c = math.fit(l, 0, 1, 4, 0, ease.lusion);
      ((this.domRightTalkBtnContainer.style.opacity = 1),
        (this.domRightTalkBtn.style.display = "block"),
        (this.domRightTalkBtn.style.pointerEvents = "auto"),
        (this.domRightTalkBtn.style.opacity = 1),
        (this.domRightTalkBtn.style.transform = `translate3d(0, ${c}em, 0)`));
    }
    let n = math.fit(this.ratio, 1.1, 1.9, 0, 1),
      a = math.fit(n, 0, 1, 4, 0, ease.lusion);
    this.domRightMenuBtn.style.transform = `translate3d(0, ${a}em, 0)`;
  }
  _hexToRgb(e) {
    const t = parseInt(e.substring(1, 3), 16) || 0,
      r = parseInt(e.substring(3, 5), 16) || 0,
      n = parseInt(e.substring(5, 7), 16) || 0;
    return [t, r, n];
  }
}
const header = new Header();
globalThis.header = header;

export { Header, header };
export default header;
