/**
 * Footer, Newsletter Form & Extra Sections Controller
 */
const validateEmail = (o) =>
  String(o).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

const MAILCHIMP_URL =
  "https://lusion.us20.list-manage.com/subscribe/post?u=ea813c53ac6d7a0b76f2e36a1&id=44b41b41bf&v_id=4233&f_id=001e18e7f0";

const getAjaxUrl = (o) => o.replace("/post?", "/post-json?");

const toQueryString = (obj) => new URLSearchParams(obj).toString();

function jsonp$1(url, opts, fn) {
  if (typeof opts === "function") {
    fn = opts;
    opts = {};
  }
  opts = opts || {};
  const cbName = "__jp" + Math.floor(Math.random() * 1000000);
  window[cbName] = function (data) {
    try { delete window[cbName]; } catch(e) {}
    if (script && script.parentNode) script.parentNode.removeChild(script);
    if (fn) fn(null, data);
  };
  const script = document.createElement("script");
  script.src =
    url +
    (url.includes("?") ? "&" : "?") +
    (opts.param || "c") +
    "=" +
    cbName;
  document.head.appendChild(script);
}

class NewletterForm {
  isSendingTheNewletterRequest = !1;
  domNewsletterForm;
  domNewsletterMessage;
  constructor(e, t, r) {
    ((this.domNewsletterForm = e),
      (this.domNewsletterButton = t),
      (this.domNewsletterMessage = r),
      this.domNewsletterForm.addEventListener(
        "submit",
        this._onFormSubmit.bind(this),
      ));
  }
  _onFormSubmit(e) {
    if ((e.preventDefault(), this.isSendingTheNewletterRequest)) return;
    (this.domNewsletterMessage.classList.remove("error"),
      (this.domNewsletterMessage.innerHTML = ""));
    const t = e.target,
      n = new FormData(t).get("EMAIL");
    if (!validateEmail(n)) {
      (this.domNewsletterMessage.classList.add("error"),
        (this.domNewsletterMessage.innerHTML = "The email is not valid!"));
      return;
    }
    ((this.isSendingTheNewletterRequest = !0),
      (this.domNewsletterButton.disabled = !0));
    const a = getAjaxUrl(MAILCHIMP_URL) + "&" + toQueryString({ EMAIL: n });
    jsonp$1(a, { param: "c" }, (l, c) => {
      (l
        ? (this.domNewsletterMessage.classList.add("error"),
          (this.domNewsletterMessage.innerHTML =
            "Something went wrong, try again"))
        : c.result !== "success"
          ? (this.domNewsletterMessage.classList.add("error"),
            (this.domNewsletterMessage.innerHTML =
              "Something went wrong, try again"))
          : ((this.domNewsletterMessage.innerHTML =
              "Almost there! Check your email box!"),
            t.reset(),
            setTimeout(() => {
              this.domNewsletterMessage.innerHTML = "";
            }, 3e3)),
        (this.isSendingTheNewletterRequest = !1),
        (this.domNewsletterButton.disabled = !1));
    });
  }
}
class FooterSection {
  domContainer;
  offsetY = 0;
  _needsReset = !0;
  preInit() {
    ((this.domContainer = document.getElementById("footer-section")),
      (this.domContactAddress = document.getElementById(
        "footer-contact-address",
      )),
      (this.domContactAddress._words = []),
      (this.domContactSocials = document.getElementById(
        "footer-contact-socials",
      )),
      (this.domContactSocials._words = []),
      (this.domContactEnquires = document.getElementById(
        "footer-contact-enquires",
      )),
      (this.domContactEnquires._words = []),
      (this.domContactBusiness = document.getElementById(
        "footer-contact-business",
      )),
      (this.domContactBusiness._words = []),
      (this.domNewsletterHeader = document.getElementById(
        "footer-newsletter-header",
      )),
      (this.domNewsletterHeader._words = []),
      (this.domNewsletterForm = document.getElementById(
        "footer-newsletter-form",
      )),
      (this.domNewsletterMessage = document.getElementById(
        "footer-newsletter-feedback-message",
      )),
      (this.domNewsletterInput = document.getElementById(
        "footer-newsletter-input",
      )),
      (this.domNewsletterInput._time = 0),
      (this.domNewsletterInput._animating = !1),
      (this.domNewsletterBg = document.getElementById("footer-newsletter-bg")),
      (this.domNewsletterButton = document.getElementById(
        "footer-newsletter-input-arrow",
      )),
      (this.domFooterBottom = document.getElementById("footer-bottom")),
      (this.domFooterBottom._time = 0),
      (this.domFooterBottom._animating = !1),
      (this.domFooterMiddle = document.getElementById("footer-middle")),
      (this.domFooterBottomLabs =
        document.getElementById("footer-bottom-labs")),
      (this.domFooterBottomCopyright = document.getElementById(
        "footer-bottom-copyright",
      )),
      (this.domFooterBottomTagline = document.getElementById(
        "footer-bottom-tagline",
      )),
      (this.domFooterBottomUp = document.getElementById("footer-bottom-up")),
      (this.domFooterBottomUp._time = 0),
      (this.domAddressLines = Array.from(
        document.querySelectorAll(".footer-address-line"),
      )),
      (this.domSocialsLines = Array.from(
        document.querySelectorAll(".footer-socials-line"),
      )),
      (this.domEnquiresLines = [
        document.getElementById("footer-enquires-header"),
        document.getElementById("footer-enquires-link"),
      ]),
      (this.domBusinessLines = [
        document.getElementById("footer-business-header"),
        document.getElementById("footer-business-link"),
      ]),
      (this.domNewsletterLines = Array.from(
        document.querySelectorAll(".footer-newsletter-line"),
      )),
      (this.middleContainers = [
        this.domContactAddress,
        this.domContactSocials,
        this.domContactEnquires,
        this.domContactBusiness,
        this.domNewsletterHeader,
      ]),
      (this.bottomContainers = [
        this.domFooterBottomCopyright,
        this.domFooterBottomLabs,
        this.domFooterBottomTagline,
        this.domFooterBottomUp,
      ]));
  }
  init() {
    if (!this.domFooterBottomUp) this.preInit();
    if (!this.domFooterBottomUp) return;
    ((this.formManager = new NewletterForm(
      this.domNewsletterForm,
      this.domNewsletterButton,
      this.domNewsletterMessage,
    )),
      this.domFooterBottomUp.addEventListener(
        "click",
        this._onDomUpBtnClick.bind(this),
      ),
      this._splitText());
  }
  resize(e, t) {
    if (!this.domContactAddress) this.preInit();
    if (!this.domContactAddress) return;
    let r = Array.from(
        this.domContactAddress.querySelectorAll(".footer-address-line-wrapper"),
      ),
      n = this.domContactAddress.getBoundingClientRect();
    for (let a = 0; a < r.length; a++) {
      let l = r[a],
        c = l.getBoundingClientRect();
      l.style.setProperty("--delta-x", n.right - c.right + "px");
    }
  }
  getDomRange() {
    return scrollManager.getDomRange(this.domContainer);
  }
  update(e) {
    let t = this.getDomRange();
    if (t.isActive) {
      if (
        (this._needsReset && this._reset(),
        t.screenRatio > -0.1
          ? document.documentElement.classList.add("is-footer-in")
          : document.documentElement.classList.remove("is-footer-in"),
        properties.useMobileLayout)
      )
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l];
          for (let u = 0; u < c._words.length; u++) {
            let f = c._words[u];
            for (let p = 0; p < f.length; p++) {
              let g = f[p],
                v = 0;
              g.style.transform = `translate3d(0, ${v}em, 0)`;
            }
          }
        }
      else
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l],
            u = scrollManager.getDomRange(c);
          c._time = math.clamp(c._time + (c._animating ? e : -e), 0, 1 / 0);
          for (let f = 0; f < c._words.length; f++) {
            let p = c._words[f];
            for (let g = 0; g < p.length; g++) {
              let v = p[g],
                _ = math.fit(c._time - f / 10, 0, 1, 1.5, 0, ease.lusion);
              v.style.transform = `translate3d(0, ${_}em, 0)`;
            }
          }
          u.screenRatio > -1 ? (c._animating = !0) : (c._animating = !1);
        }
      let n = scrollManager.getDomRange(this.domNewsletterInput);
      ((this.domNewsletterInput._time = math.saturate(
        this.domNewsletterInput._time +
          (this.domNewsletterInput._animating ? e : -e),
      )),
        n.screenRatio > -1
          ? ((this.domNewsletterInput._animating = !0),
            this.domNewsletterInput.classList.add("--active"))
          : ((this.domNewsletterInput._animating = !1),
            this.domNewsletterInput.classList.remove("--active")),
        properties.useMobileLayout
          ? ((this.domNewsletterBg.style.transform = "scale3d(1, 1, 1)"),
            (this.domNewsletterButton.style.transform = "scale(1)"))
          : ((this.domNewsletterBg.style.transform = `scale3d(${math.fit(this.domNewsletterInput._time, 0, 1, 0, 1, ease.lusion)}, 1, 1)`),
            (this.domNewsletterButton.style.transform = `scale(${math.fit(this.domNewsletterInput._time - 0.8, 0, 0.2, 0, 1, ease.lusion)})`)));
      let a = scrollManager.getDomRange(this.domFooterBottom);
      if (
        ((this.domFooterBottom._time = math.saturate(
          this.domFooterBottom._time +
            (this.domFooterBottom._animating ? e * 1 : -e * 1),
        )),
        a.screenRatio > -1
          ? (this.domFooterBottom._animating = !0)
          : (this.domFooterBottom._animating = !1),
        !properties.useMobileLayout)
      )
        for (let l = 0; l < this.bottomContainers.length; l++) {
          let c = this.bottomContainers[l];
          if (l === this.bottomContainers.length - 1) {
            let u = math.fit(
              this.domFooterBottom._time - 0.3,
              0,
              0.3,
              0,
              1,
              ease.lusion,
            );
            c.style.transform = `scale(${u})`;
          } else
            for (let u = 0; u < c._splitted.words.length; u++) {
              let f = c._splitted.words[u],
                p = math.fit(
                  this.domFooterBottom._time - l / 10 - u / 10,
                  0,
                  0.6,
                  100,
                  0,
                  ease.lusion,
                );
              f.style.transform = `translate3d(0, ${p}%, 0)`;
            }
        }
    } else this._needsReset = !0;
  }
  _splitText() {
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, { types: "words" });
    }
    let e = [
      { lines: this.domAddressLines, parent: this.domContactAddress },
      { lines: this.domSocialsLines, parent: this.domContactSocials },
      { lines: this.domEnquiresLines, parent: this.domContactEnquires },
      { lines: this.domBusinessLines, parent: this.domContactBusiness },
      { lines: this.domNewsletterLines, parent: this.domNewsletterHeader },
    ];
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, { types: "words" });
    }
    for (let t = 0; t < e.length; t++) {
      let r = e[t].lines,
        n = e[t].parent;
      for (let a = 0; a < r.length; a++) {
        let l = r[a];
        this._createWrapper(l, n);
      }
    }
  }
  _createWrapper(e, t) {
    let r = new SplitType(e, { types: "words" }),
      n = document.createElement("div");
    (n.classList.add(
      e.classList[0] ? e.classList[0] + "-wrapper" : e.id + "-wrapper",
    ),
      (n.style.position = "relative"),
      (n.style.overflow = "hidden"),
      (n.style.display = "flex"),
      (n.style.flexDirection = "column"),
      n.append(e),
      t.appendChild(n),
      t._words.push(r.words),
      (t._time = 0),
      (t._animating = !1),
      (n._topWords = r.words));
  }
  _reset() {
    this._needsReset = !1;
    for (let e = 0; e < this.middleContainers.length; e++) {
      let t = this.middleContainers[e];
      t._time = 0;
      for (let r = 0; r < t._words.length; r++) {
        let n = t._words[r];
        for (let a = 0; a < n.length; a++) {
          let l = n[a];
          l.style.transform = "translate3d(0, 0, 0)";
        }
      }
      t._animating = !1;
    }
  }
  _onDomUpBtnClick() {
    scrollManager.scrollToPixel(0);
  }
}
const footerSection = new FooterSection();

class EndSection {
  domContainer;
  offsetY = 0;
  _needsReset = !0;
  ROLLUP_ANIMATION_DURATION = 1;
  ROLLUP_ANIMATION_INTERVAL = 2;
  activeRatio = 0;
  hoverRatio = 0;
  time = 0;
  isHover = !1;
  preInit() {
    ((this.domContainer = document.getElementById("end-section")),
      (this.outerContainer = document.getElementById("end-section-outer")),
      (this.domContent = document.getElementById("end-section-content")),
      (this.domTitle = document.getElementById("end-section-title")),
      (this.domTitleLink = document.getElementById("end-section-title-link")),
      (this.domTitleTopDecoration = document.getElementById(
        "end-section-title-top-decoration",
      )),
      (this.domTitleBottomLeftDecoration = document.getElementById(
        "end-section-title-bottom-left-decoration",
      )),
      (this.domTitleBottomRightDecoration = document.getElementById(
        "end-section-title-bottom-right-decoration",
      )),
      (this.domSubtitle = document.getElementById("end-section-subtitle-text")),
      (this.domButton = document.getElementById("end-bottom")),
      (this.domCrosses = Array.from(
        document.querySelectorAll(".end-section-content-cross"),
      )),
      flipAnimation.preInit());
  }
  init() {
    if (!this.domTitle) this.preInit();
    if (!this.domTitle) return;
    (flipAnimation.init(),
      properties.useMobileLayout ||
        (this.domTitle.addEventListener(
          "mouseenter",
          this._onDomTitleMouseenter.bind(this),
        ),
        this.domTitle.addEventListener(
          "mouseleave",
          this._onDomTitleMouseleave.bind(this),
        )));
  }
  resize(e, t) {
    if (!this.domContent) this.preInit();
    if (this.domContent) {
      this.domContent.style.transform =
        "translate3d(-50%,-50%,0) scale3d(1,1,1)";
    }
    this._splitText();
    this._needsReset = !0;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer),
      r = t.isActive;
    pagesManager.scrollTargetPage &&
      ((flipAnimation.isActive = pagesManager.scrollTargetPage.hasEndVisual),
      (flipAnimation.colorHex = pagesManager.scrollTargetPage.endVisualColor),
      (flipAnimation.useTextured =
        pagesManager.scrollTargetPage.endVisualUseTextured),
      (flipAnimation.container.visible = flipAnimation.isActive),
      (flipAnimation.opacity = math.fit(
        pagesManager.scrollTargetPage.hideRatio,
        0,
        0.3,
        1,
        0,
      )));
    let n = math.fit(t.hideScreenOffset, -0.75, 0, 0, 1),
      a = math.mix(1, 0.9, n);
    if (
      ((this.offsetY = Math.max(0, -t.screenY)),
      (this.outerContainer.style.transform = `translate3d(0, ${this.offsetY - Math.max(0, t.hideScreenOffset) * properties.viewportHeight}px, 0)`),
      (this.domContent.style.transform = `translate3d(-50%,-50%,0) scale3d(${a}, ${a}, ${a})`),
      r)
    ) {
      this._needsReset && this._reset();
      let l = pagesManager.scrollTargetPage
          ? pagesManager.scrollTargetPage.endSectionActiveThreshold
          : 1,
        c = t.showScreenOffset > l,
        u = this.time;
      ((this.activeRatio = math.saturate(this.activeRatio + (c ? e : -e))),
        (this.hoverRatio = math.saturate(
          this.hoverRatio + (this.isHover && this.activeRatio == 1 ? e : -e),
        )),
        (this.time += e));
      let f = u % this.ROLLUP_ANIMATION_INTERVAL,
        p = this.time % this.ROLLUP_ANIMATION_INTERVAL;
      this.domTitle.style.pointerEvents =
        c && this.activeRatio > 0.75 ? "auto" : "none";
      for (let v = 0; v < this.domCrosses.length; v++) {
        let _ = v / (this.domCrosses.length - 1),
          T = math.fit(
            this.activeRatio,
            _ * 0.2,
            _ * 0.2 + 0.7,
            0,
            1,
            ease.lusion,
          ),
          M = this.domCrosses[v],
          S = math.fit(T, 0, 1, 0, 1, ease.lusion),
          b = math.fit(T, 0, 1, 0, 180, ease.lusion);
        M.style.transform = `scale(${S}) rotate(${b}deg)`;
      }
      if (!properties.useMobileLayout)
        for (let v = 0; v < this.domSubtitle._splitted.words.length; v++) {
          let _ = this.domSubtitle._splitted.words[v],
            T = v / (this.domSubtitle._splitted.words.length - 1),
            M = math.fit(
              this.activeRatio,
              T * 0.15,
              T * 0.15 + 0.75,
              200,
              0,
              ease.lusion,
            ),
            S = math.fit(
              this.activeRatio,
              T * 0.1,
              T * 0.1 + 0.8,
              30,
              0,
              ease.lusion,
            );
          _.style.transform = `translate3d(0, ${M}%, 0) rotate(${S}deg)`;
        }
      for (let v = 0; v < this.domTitleLink._splitted.words.length; v++) {
        let _ = this.domTitleLink._splitted.words[v],
          T = v / (this.domTitleLink._splitted.words.length - 1);
        (f > p &&
          ((_._randCharIndex = Math.floor(Math.random() * _._chars.length)),
          _._ratio == 0 && (_._ratio = 0.001)),
          _._ratio > 0 &&
            ((_._ratio = math.saturate(
              _._ratio + (c ? e / this.ROLLUP_ANIMATION_DURATION : -e * 2),
            )),
            _._ratio == 1 && (_._ratio = 0)));
        for (let M = 0; M < _._chars.length; M++) {
          let S = _._chars[M],
            b = M / (_._chars.length - 1),
            C =
              properties.viewportWidth >= settings.MOBILE_WIDTH
                ? math.fit(
                    this.activeRatio,
                    T * 0.15 + b * 0.15,
                    T * 0.15 + b * 0.15 + 0.7,
                    100,
                    0,
                    ease.lusion,
                  )
                : 0;
          (M === _._randCharIndex
            ? (S._wrapper.style.transform = `translate3d(0, ${math.fit(_._ratio, T * 0.2, T * 0.2 + 0.8, 0, -100, ease.lusion)}%, 0)`)
            : (S._wrapper.style.transform = "translateZ(0)"),
            (S.style.transform = `translate3d(0, ${C}%, 0)`));
        }
      }
      this.domTitleTopDecoration.style.transform = `scale3d(${math.fit(this.hoverRatio, 0, 0.7, 0, 1, ease.cubicInOut)}, 1, 1)`;
      let g = math.fit(this.hoverRatio, 0.2, 1, 0, 1, ease.cubicInOut);
      ((this.domTitleBottomLeftDecoration.style.transform = `scale3d(${math.fit(g, 0, 0.35, 0, 1)}, 1, 1)`),
        (this.domTitleBottomRightDecoration.style.transform = `scale3d(${math.fit(g, 0.4, 1, 0, 1)}, 1, 1)`));
    } else ((this._needsReset = !0), (flipAnimation.isActive = !1));
    flipAnimation.update(e);
  }
  _splitText() {
    if (!this.domSubtitle) this.preInit();
    if (!this.domSubtitle || !this.domTitleLink) return;
    this.domSubtitle._originalHTML = this.domSubtitle._originalHTML || this.domSubtitle.innerHTML;
    this.domSubtitle.innerHTML = this.domSubtitle._originalHTML;
    this.domTitleLink._originalHTML = this.domTitleLink._originalHTML || this.domTitleLink.innerHTML;
    this.domTitleLink.innerHTML = this.domTitleLink._originalHTML;
    if (properties.useMobileLayout)
      this.domSubtitle._splitted && this.domSubtitle._splitted.revert();
    else {
      this.domSubtitle._splitted = new SplitType(this.domSubtitle, {
        types: "lines, words",
      });
      for (let e = 0; e < this.domSubtitle._splitted.lines.length; e++) {
        let t = this.domSubtitle._splitted.lines[e],
          r = document.createElement("div");
        ((r.style.position = "relative"),
          (r.style.overflow = "hidden"),
          r.append(t),
          this.domSubtitle.append(r));
      }
    }
    this.domTitleLink._splitted = new SplitType(this.domTitleLink, {
      types: "lines, words",
      lineClass: "end-section-title-link-line",
      wordClass: "end-section-title-link-word",
    });
    for (let e = 0; e < this.domTitleLink._splitted.lines.length; e++) {
      let t = this.domTitleLink._splitted.lines[e];
      e === 0
        ? t.append(this.domTitleTopDecoration)
        : (t.append(this.domTitleBottomLeftDecoration),
          t.append(this.domTitleBottomRightDecoration));
    }
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e],
        r = new SplitType(t, { types: "chars" });
      ((t._chars = r.chars), (t._ratio = 0));
      for (let n = 0; n < t._chars.length; n++) {
        let a = t._chars[n],
          l = a.cloneNode(!0),
          c = document.createElement("div");
        (c.classList.add("char-wrapper"),
          (c.style.display = "inline-block"),
          (a._wrapper = c),
          c.append(a),
          c.append(l),
          t.append(c));
      }
    }
  }
  _reset() {
    ((this._needsReset = !1),
      (this.time = 0),
      (this.hoverRatio = 0),
      (this.activeRatio = 0));
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e];
      for (let r = 0; r < t._chars.length; r++) {
        let n = t._chars[r];
        ((n._wrapper.style.transform = "translate3d(0, 0, 0)"),
          (n.style.transform = "translate3d(0, 0, 0)"));
      }
    }
    flipAnimation.needsReset = !0;
  }
  _onDomTitleMouseenter() {
    this.isHover = !0;
  }
  _onDomTitleMouseleave() {
    this.isHover = !1;
  }
}
const endSection = new EndSection();
class ScrollNavSection {
  domContainer;
  domText;
  overScrollRatio = 0;
  downWaitTime = 0;
  _needsReset = !0;
  path = "";
  preInit() {
    ((this.domContainer = document.getElementById("scroll-nav-section")),
      (this.domText = document.getElementById("scroll-nav-text")),
      (this.barInner = document.getElementById("scroll-nav-next-bar-inner")));
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive,
      n =
        scrollManager.scrollPixel >=
        scrollManager.contentSize * scrollManager.viewSizePixel - 5,
      a =
        (input.deltaDragScrollY + input.deltaWheel) *
        (scrollManager.isActive && pagesManager.isIdle ? 1 : 0);
    if (
      ((this.downWaitTime = a > 0 ? 0.3 : Math.max(0, this.downWaitTime - e)),
      (this.overScrollRatio = r
        ? math.saturate(
            this.overScrollRatio +
              e *
                (n && a > 0
                  ? 2
                  : this.downWaitTime > 0
                    ? 0
                    : a < 0
                      ? -5
                      : -0.2) *
                (pagesManager.isIdle ? 1 : 0),
          )
        : 0),
      r)
    ) {
      let l = pagesManager.currRoute;
      ((this.barInner.style.transform = `scaleX(${this.overScrollRatio})`),
        scrollManager.isActive &&
          pagesManager.isIdle &&
          (this.path !== l.scrollNavPath &&
            ((this.path = l.scrollNavPath),
            (this.domText.innerHTML = l.scrollNavText)),
          this.overScrollRatio == 1 && routeManager.setPath(this.path)));
    }
  }
}
const scrollNavSection = new ScrollNavSection();
class PageExtraSections {
  isActive = !0;
  domContainer;
  _needsResize = !1;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  preInit() {
    (preUfx.scene.add(this.preUfxContainer),
      postUfx.scene.add(this.postUfxContainer),
      (this.domContainer = document.querySelector("#page-extra-sections")),
      endSection.preInit(),
      footerSection.preInit(),
      scrollNavSection.preInit());
  }
  init() {
    (endSection.init(), footerSection.init(), scrollNavSection.init());
  }
  resize(e, t) {
    if (!this.domContainer) this.domContainer = document.querySelector("#page-extra-sections");
    ((this.preUfxContainer.visible = this.postUfxContainer.visible = !1),
      pagesManager.scrollTargetPage &&
        (pagesManager.scrollTargetPage.hasExtraPages
          ? ((this.preUfxContainer.visible = this.postUfxContainer.visible =
              !0),
            (this._needsResize = !1),
            this.domContainer && (this.domContainer.style.display = "block"),
            endSection.resize(e, t),
            footerSection.resize(e, t),
            scrollNavSection.resize(e, t))
          : (this.domContainer && (this.domContainer.style.display = "none"),
            (this._needsResize = !0))));
  }
  update(e) {
    if (!this.domContainer) this.domContainer = document.querySelector("#page-extra-sections");
    ((this.preUfxContainer.visible = this.postUfxContainer.visible = !1),
      pagesManager.scrollTargetPage &&
        (pagesManager.scrollTargetPage.hasExtraPages
          ? ((this.preUfxContainer.visible = this.postUfxContainer.visible =
              !0),
            this._needsResize &&
              this.resize(properties.viewportWidth, properties.viewportHeight),
            this.domContainer && (this.domContainer.style.display = "block"),
            endSection.update(e),
            footerSection.update(e),
            scrollNavSection.update(e))
          : (this.domContainer && (this.domContainer.style.display = "none"),
            (this._needsResize = !0))));
  }
}
const pageExtraSections = new PageExtraSections();
let LOADING_RECTS = [
  1, 1, 1, 3, 2, 4, 2, 1, 6, 2, 1, 2, 7, 1, 1, 1, 7, 4, 1, 1, 8, 2, 1, 2, 11, 2,
  1, 3, 13, 2, 1, 3, 12, 1, 1, 1, 16, 1, 2, 1, 18, 2, 1, 2, 16, 4, 2, 1, 22, 1,
  1, 4, 26, 1, 1, 4, 27, 1, 1, 1, 28, 2, 1, 3, 32, 1, 1, 1, 33, 3, 1, 1, 31, 1,
  1, 3, 32, 4, 2, 1,
];


globalThis.NewletterForm = NewletterForm;
globalThis.FooterSection = FooterSection;
globalThis.footerSection = footerSection;
globalThis.EndSection = EndSection;
globalThis.endSection = endSection;
globalThis.ScrollNavSection = ScrollNavSection;
globalThis.scrollNavSection = scrollNavSection;
globalThis.PageExtraSections = PageExtraSections;
globalThis.pageExtraSections = pageExtraSections;

export { NewletterForm, FooterSection, EndSection, ScrollNavSection, PageExtraSections, footerSection, pageExtraSections };
