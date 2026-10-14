/**
 * Featured Section Controller
 * Isolated component controller for the interactive ProjectItemList cards.
 */
import properties from "../core/Properties.js";
import math from "../core/MathUtils.js";
import ease from "../core/Ease.js";
import scrollManager from "../navigation/ScrollManager.js";
import { ProjectItemList } from "../navigation/pages/ProjectsPage.js";
import sectionRegistry from "./SectionRegistry.js";

class HomeFeaturedSection {
  domContainer;
  domTitle;
  domDisclaimer;
  domCta;
  projectItemList;
  time = 0;
  _needsReset = !0;
  hostPage = null;
  preInit(e, hostPage) {
    this.hostPage = hostPage || this.hostPage || window.homePage;
    let container = e || document;
    ((this.domContainer = container.querySelector ? (container.querySelector("#home-featured") || document.getElementById("home-featured")) : document.getElementById("home-featured")),
      (this.projectItemList = new ProjectItemList(
        this.hostPage || window.homePage,
        (container.querySelector && container.querySelector(".project-list")) || document.querySelector(".project-list"),
      )),
      (this.domItems = (this.domContainer || document).querySelectorAll(".project-item")),
      (this.domTitle = (container.querySelector && container.querySelector("#home-featured-title")) || document.getElementById("home-featured-title")),
      this.domTitle && ((this.domTitle._time = 0), (this.domTitle._animating = !1)),
      (this.domDisclaimer = (container.querySelector && container.querySelector("#home-featured-disclaimer")) || document.getElementById("home-featured-disclaimer")),
      this.domDisclaimer && ((this.domDisclaimer._time = 0), (this.domDisclaimer._animating = !1)),
      (this.domCta = (container.querySelector && container.querySelector("#home-featured-cta")) || document.getElementById("home-featured-cta")),
      this.domCta && ((this.domCta._time = 0), (this.domCta._animating = !1)));
  }
  init() {}
  resize(e, t) {
    (this._splitText(), this.projectItemList && this.projectItemList.resize(e, t));
  }
  update(e) {
    if (this.domContainer && scrollManager.getDomRange(this.domContainer).isActive) {
      this._needsReset && this._reset();
      let r = this.domTitle ? scrollManager.getDomRange(this.domTitle) : null,
        n = this.domDisclaimer ? scrollManager.getDomRange(this.domDisclaimer) : null,
        a = this.domCta ? scrollManager.getDomRange(this.domCta) : null;
      ((this.domTitle && (this.domTitle._time = math.clamp(
        this.domTitle._time + (this.domTitle._animating ? e : -e),
        0,
        2,
      ))),
        (this.domDisclaimer && (this.domDisclaimer._time = math.clamp(
          this.domDisclaimer._time + (this.domDisclaimer._animating ? e : -e),
          0,
          2,
        ))),
        (this.domCta && (this.domCta._time = math.clamp(
          this.domCta._time + (this.domCta._animating ? e : -e),
          0,
          1,
        ))),
        r && r.screenRatio > -1 &&
          ((this.domTitle._animating = !0),
          properties.useMobileLayout ||
            this.domTitle?._splitted?.chars?.forEach((l, c) => {
              let u = math.fit(
                  this.domTitle._time * 1.5 - c / 20,
                  0,
                  1,
                  1,
                  0,
                  ease.lusion,
                ),
                f = math.fit(
                  this.domTitle._time * 1.5 - c / 20,
                  0,
                  1,
                  10,
                  0,
                  ease.lusion,
                );
              l.style.transform = `translate3d(0, ${u}em, 0) rotate(${f}deg)`;
            })),
        n && n.screenRatio > -1 &&
          ((this.domDisclaimer._animating = !0),
          properties.useMobileLayout ||
            this.domDisclaimer?._splitted?.lines?.forEach((l, c) => {
              let u = math.fit(
                this.domDisclaimer._time * 1 - c / 20,
                0,
                1,
                100,
                0,
                ease.lusion,
              );
              l.style.transform = `translate3d(0, ${u}%, 0)`;
            })),
        a && a.screenRatio > -1 &&
          (properties.useMobileLayout
            ? (this.domCta && ((this.domCta.style.transform =
                "translate3d(0, 0, 0) rotate(0deg)"),
              (this.domCta.style.opacity = 1)))
            : (this.domCta && ((this.domCta._animating = !0),
              (this.domCta.style.transform = `translate3d(0, ${math.fit(this.domCta._time, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domCta._time, 0, 1, 10, 0, ease.lusion)}deg)`),
              (this.domCta.style.opacity = ease.lusion(this.domCta._time))))));
    } else this._needsReset = !0;
    this.projectItemList &&
      (((this.projectItemList.zoomRatio = math.fit(
        (this.hostPage || window.homePage).activeRatio,
        0,
        0.75,
        1,
        0,
      )),
        this.projectItemList.update(e)));
  }
  _reset() {
    this.domTitle?._splitted &&
      ((this._needsReset = !1),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      this.domDisclaimer && ((this.domDisclaimer._time = 0), (this.domDisclaimer._animating = !1)),
      this.domCta && ((this.domCta._time = 0), (this.domCta._animating = !1)),
      properties.useMobileLayout ||
        (this.domDisclaimer?._splitted?.lines?.forEach((e) => {
          e.style.transform = "translate3d(0, 100%, 0)";
        }),
        this.domTitle?._splitted?.chars?.forEach((e) => {
          e.style.transform = "translate3d(0, 100%, 0)";
        })));
  }
  _splitText() {
    if (!this.domTitle) {
      this.domTitle = document.getElementById("home-featured-title");
      this.domDisclaimer = document.getElementById("home-featured-disclaimer");
      this.domCta = document.getElementById("home-featured-cta");
    }
    this.domTitle?._splitted?.revert?.();
    this.domDisclaimer?._splitted?.revert?.();
    if (!properties.useMobileLayout && typeof SplitType !== "undefined") {
      if (this.domTitle) {
        this.domTitle._splitted = new SplitType(this.domTitle, {
          types: "words, chars",
        });
      }
      if (this.domDisclaimer) {
        this.domDisclaimer._splitted = new SplitType(this.domDisclaimer, {
          types: "lines",
        });
        this.domDisclaimer._splitted?.lines?.forEach((e) => {
          let t = document.createElement("div");
          t.style.position = "relative";
          t.style.overflow = "hidden";
          t.append(e);
          this.domDisclaimer.append(t);
        });
      }
    }
  }
}

const homeFeaturedSection = new HomeFeaturedSection();
window.homeFeaturedSection = homeFeaturedSection;
globalThis.homeFeaturedSection = homeFeaturedSection;

sectionRegistry.register("#home-featured", () => homeFeaturedSection);

export { HomeFeaturedSection, homeFeaturedSection };
export default homeFeaturedSection;
