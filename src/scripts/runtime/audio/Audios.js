const AUDIO_DATA = {
  ui: [
    {
      id: "hover_[3]",
      ext: ".ogg",
      isLoopable: !1,
      isPositional: !1,
      isPreload: !0,
      isElem: !1,
      isSfx: !0,
      volume: 1,
    },
    {
      id: "click_[2]",
      ext: ".ogg",
      isLoopable: !1,
      isPositional: !1,
      isPreload: !0,
      isElem: !1,
      isSfx: !0,
      volume: 1,
    },
    {
      id: "focus_[3]",
      ext: ".ogg",
      isLoopable: !1,
      isPositional: !1,
      isPreload: !0,
      isElem: !1,
      isSfx: !0,
      volume: 0.4,
    },
    {
      id: "glass_broken",
      ext: ".ogg",
      isLoopable: !1,
      isPositional: !1,
      isPreload: !0,
      isElem: !1,
      isSfx: !0,
      volume: 1,
    },
    {
      id: "page_[2]",
      ext: ".ogg",
      isLoopable: !1,
      isPositional: !1,
      isPreload: !0,
      isElem: !1,
      isSfx: !0,
      volume: 1,
    },
  ],
  music: [
    {
      id: "generic",
      ext: ".ogg",
      isLoopable: !0,
      isPositional: !1,
      isPreload: !1,
      isElem: !0,
      needsFilter: !1,
      isSfx: !1,
      volume: 1,
    },
    {
      id: "cinematic_0",
      ext: ".ogg",
      isLoopable: !0,
      isPositional: !1,
      isPreload: !1,
      isElem: !0,
      needsFilter: !0,
      isSfx: !1,
      volume: 1,
    },
    {
      id: "cinematic_2",
      ext: ".ogg",
      isLoopable: !0,
      isPositional: !1,
      isPreload: !1,
      isElem: !0,
      needsFilter: !0,
      isSfx: !1,
      volume: 1,
    },
    {
      id: "cinematic_3",
      ext: ".ogg",
      isLoopable: !0,
      isPositional: !1,
      isPreload: !1,
      isElem: !0,
      needsFilter: !0,
      isSfx: !1,
      volume: 1,
    },
    {
      id: "generic_end",
      ext: ".ogg",
      isLoopable: !0,
      isPositional: !1,
      isPreload: !1,
      isElem: !0,
      needsFilter: !1,
      isSfx: !1,
      volume: 1,
    },
  ],
};

/**
 * Master Experience WebAudio Coordinator
 */
import * as THREE from "../three.js";
import settings from "../core/Settings.js";
import properties from "../core/Properties.js";
import input from "../core/Input.js";
import { MinSignal$2 } from "../loaders/QuickLoader.js";
import { AudioGroup } from "./AudioGroup.js";
import { AudioItem } from "./AudioItem.js";

const { AudioListener } = THREE;
class GlobalAudios {
  hasInit = !1;
  constructor() {}
  init() {
    ((this.domRightTalkBtn = document.getElementById("header-right-talk-btn")),
      (this.domRightSoundBtn = document.getElementById(
        "header-right-sound-btn",
      )),
      (this.domRightMenuBtn = document.getElementById("header-right-menu-btn")),
      (this.domHeaderProjectBack = document.getElementById(
        "header-center-project-back-btn",
      )),
      (this.domMenuLabLink = document.getElementById("header-menu-labs")),
      (this.domEndSectionTitleLink = document.getElementById(
        "end-section-title-link",
      )),
      (this.domFooterBottomUp = document.getElementById("footer-bottom-up")),
      (this.domFooterEnquiresLink = document.getElementById(
        "footer-enquires-link",
      )),
      (this.domFooterBusinessLink = document.getElementById(
        "footer-business-link",
      )),
      (this.domFooterBottomLabs =
        document.getElementById("footer-bottom-labs")),
      (this.domMenuLinks = Array.from(
        document.querySelectorAll("#header-menu-links .header-menu-link"),
      )),
      (this.domFooterSocialsLinks = Array.from(
        document.querySelectorAll(".footer-socials-line-wrapper"),
      )),
      audios.addHoverClickEvents(this.domRightTalkBtn),
      audios.addHoverClickEvents(this.domRightSoundBtn),
      audios.addHoverClickEvents(this.domRightMenuBtn),
      audios.addHoverClickEvents(this.domHeaderProjectBack),
      audios.addHoverClickEvents(this.domMenuLabLink),
      audios.addHoverClickEvents(this.domEndSectionTitleLink),
      audios.addHoverClickEvents(this.domFooterBottomUp),
      audios.addHoverClickEvents(this.domFooterEnquiresLink),
      audios.addHoverClickEvents(this.domFooterBusinessLink),
      audios.addHoverClickEvents(this.domFooterBottomLabs),
      this.domMenuLinks.forEach((e) => audios.addHoverClickEvents(e)),
      this.domFooterSocialsLinks.forEach((e) => audios.addHoverClickEvents(e)),
      (this.hasInit = !0));
  }
  update() {}
}
const globalAudios = new GlobalAudios();
let SKIP_AUDIO = !settings.USE_AUDIO;
class Audios {
  groups = {};
  items = {};
  isActive = !0;
  volume = 0;
  listener = null;
  _boundOnBodyClick = null;
  _onBodyClicked = new MinSignal$2();
  _onRolloverCount = -1;
  _onClickCount = -1;
  _onFocusCount = -1;
  prevBgMusicId = null;
  currBgMusicId = null;
  wasActive = !1;
  _counts = {};
  _maxes = {};
  preInit() {
    if (!SKIP_AUDIO) {
      ((this._boundOnBodyClick = () => this._onBodyClick()),
        input.onDowned.add(this._boundOnBodyClick));
      for (let e in AUDIO_DATA) {
        let t = new AudioGroup(),
          r = AUDIO_DATA[e];
        (t.init({ id: e, volume: 1 }), (this.groups[e] = t));
        let n = r.length;
        for (; n--;) {
          let a = r[n],
            l = this._parseCountText(a.id),
            c = l.text;
          if (l.count > 0) {
            for (let u = 1; u < l.count; u++) {
              let f = Object.assign({}, a);
              ((f.id = l.text + "_" + u), r.push(f));
            }
            ((this._counts[c] = -1),
              (this._maxes[c] = l.count),
              (a.id = l.text + "_0"));
          }
        }
        r.forEach((a) => {
          let l = new AudioItem(),
            c = a.id,
            u = c + a.ext;
          ((a.url = settings.AUDIO_PATH + u),
            l.preInit(a),
            l.load(() => {}),
            (this.items[c] = l),
            this.groups[e].add(l));
        });
      }
    }
  }
  _parseCountText(e) {
    let t = 0;
    return (
      e.replace(/(.+)_\[(\d)\]/, (r, n, a, l) => {
        ((e = n), (t = parseInt(a, 10)));
      }),
      { text: e, count: t }
    );
  }
  init() {
    SKIP_AUDIO ||
      (this.getListener((e) => {
        for (let t in this.items) this.items[t].init(e);
      }),
      globalAudios.init());
  }
  _lastToggleTime = 0;
  on() {
    this.isActive = !0;
    this._applyState();
  }
  off() {
    this.isActive = !1;
    this._applyState();
  }
  toggle() {
    const now = Date.now();
    if (now - this._lastToggleTime < 150) return this.isActive;
    this._lastToggleTime = now;
    this.isActive = !this.isActive;
    this._applyState();
    return this.isActive;
  }
  pause() {
    this.wasActive = this.isActive;
  }
  resume() {}
  getListener(e) {
    SKIP_AUDIO ||
      (this.listener ? e(this.listener) : this._onBodyClicked.add(e));
  }
  _ensureListener() {
    if (!this.listener && !SKIP_AUDIO) {
      try {
        if (this._boundOnBodyClick) {
          input.onDowned.remove(this._boundOnBodyClick);
        }
        this.listener = new AudioListener();
        this._onBodyClicked.dispatch(this.listener);
        if (properties.camera) {
          properties.camera.add(this.listener);
        }
      } catch (err) {
        console.warn("AudioListener init error:", err);
      }
    }
  }
  _applyState() {
    this._ensureListener();
    if (this.listener?.context && this.listener.context.state === "suspended" && this.isActive) {
      this.listener.context.resume().catch(() => {});
    }
    if (!this.isActive) {
      this.volume = 0;
      this.listener?.setMasterVolume(0);
      for (let t in this.items) {
        let item = this.items[t];
        if (item.elem) {
          item.elem.muted = true;
          item.elem.volume = 0;
        }
      }
      for (let g in this.groups) {
        this.groups[g].update(0);
      }
    } else {
      this.volume = 1;
      this.listener?.setMasterVolume(1);
      for (let t in this.items) {
        let item = this.items[t];
        if (item.elem) {
          item.elem.muted = false;
          item.elem.volume = item.volume;
        }
      }
      for (let g in this.groups) {
        this.groups[g].update(1);
      }
      if (this.currBgMusicId && this.items[this.currBgMusicId]) {
        this.items[this.currBgMusicId].play();
      }
    }
    const btn = document.getElementById("header-right-sound-btn");
    if (btn) {
      btn.classList.toggle("--is-muted", !this.isActive);
      btn.setAttribute("aria-label", this.isActive ? "Mute sound" : "Unmute sound");
      btn.setAttribute("aria-pressed", this.isActive ? "true" : "false");
    }
  }
  _onBodyClick() {
    if (SKIP_AUDIO) return;
    this._ensureListener();
  }
  addHoverClickEvents(e) {
    if (!e) return;
    SKIP_AUDIO || (this.addHoverEvent(e), this.addClickEvent(e));
  }
  addHoverEvent(e, t = "hover") {
    if (!e || SKIP_AUDIO) return;
    e.addEventListener("mouseenter", () => {
      this.countPlay(t);
    });
  }
  addClickEvent(e, t = "click") {
    if (!e || SKIP_AUDIO) return;
    input.onClicked.add(() => {
      input.hasThroughElem(e, t) && this.countPlay(t);
    });
  }
  countPlay(e) {
    if (SKIP_AUDIO || !this.isActive) return;
    let t = this._counts[e],
      r = this._maxes[e];
    if (r === undefined) return;
    ((t = this._counts[e] = (t + 1) % r), this.items[e + "_" + t]?.play());
  }
  fadeBgMusic(e, t = 1, r = void 0) {
    if (SKIP_AUDIO) return;
    if (this.currBgMusicId !== e) {
      this.prevBgMusicId = this.currBgMusicId;
      this.currBgMusicId = e;
      r === void 0 && (r = t);
      this.items[this.prevBgMusicId]?.setFadeOut(r);
      if (this.isActive) {
        this.items[this.currBgMusicId]?.setFadeIn(t);
      }
    }
  }
  update(e) {
    if (!SKIP_AUDIO) {
      globalAudios.update(e);
      if (this.listener) {
        this.volume = math.saturate(this.volume + (this.isActive ? 1 : -1) * e);
        this.listener.setMasterVolume(this.isActive ? this.volume : 0);
        for (let t in this.items) this.items[t].update(e);
        for (let t in this.groups) this.groups[t].update(this.volume);
      }
    }
  }
}
const audios = new Audios();


globalThis.globalAudios = globalAudios;
globalThis.audios = audios;

export { GlobalAudios, Audios, globalAudios, audios };
export default audios;
