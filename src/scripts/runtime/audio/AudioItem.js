/**
 * WebAudio Sound Instance
 */
import * as THREE from "../three.js";
import settings from "../core/Settings.js";
import properties from "../core/Properties.js";
import math from "../core/MathUtils.js";
import ease from "../core/Ease.js";
import { MinSignal$2 } from "../loaders/QuickLoader.js";

const { PositionalAudio, Audio: Audio$1, Object3D, AudioContext } = THREE;

const LOW_PASS_FREQ = 300,
  MAX_FREQ = 22050;

class AudioItem {
  autoplay = !1;
  elem = null;
  id = "";
  url = "";
  fileSize = 100;
  isMutable = !1;
  isPositional = !1;
  isLoopable = !1;
  isPreload = !0;
  onInitialized = new MinSignal$2();
  onEnded = new MinSignal$2();
  onPlayed = new MinSignal$2();
  volume = 1;
  audioObject = null;
  hasInitialized = !1;
  container = null;
  refDistance = 1;
  _buffer = null;
  _originalOnEnd = null;
  needsFilter = !1;
  fadeTime = 0;
  fadeDuration = 1;
  isFadingIn = !1;
  isFadingOut = !1;
  isSfx = !1;
  preInit(e) {
    (Object.assign(this, e),
      this.isPositional && (this.container = new Object3D()));
  }
  init(e) {
    if (this.hasInitialized !== !0) {
      if (
        ((this.hasInitialized = !0),
        (this.audioObject = this.isPositional
          ? new PositionalAudio(e)
          : new Audio$1(e)),
        this.isPositional && this.container.add(this.audioObject),
        (this._originalOnEnd = this.audioObject.onEnded.bind(this.audioObject)),
        (this.audioObject.onEnded = this.onEnd.bind(this)),
        this.isPositional && this.setRefDistance(this.refDistance),
        this.isElem &&
          !this.elem &&
          ((this.elem = document.createElement("audio")),
          settings.LOCAL_AUDIO_PATH !== settings.AUDIO_PATH &&
            (this.elem.crossOrigin = "anonymous"),
          (this.elem.src = this.url)),
        this.needsFilter)
      ) {
        const t = this.audioObject.context;
        ((this.biquadFilter = t.createBiquadFilter()),
          (this.biquadFilter.type = "lowpass"),
          (this.biquadFilter.frequency.value = MAX_FREQ),
          this.audioObject.setFilter(this.biquadFilter));
      }
      (this.elem
        ? ((this.elem.loop = this.isLoopable),
          this.audioObject.setMediaElementSource(this.elem),
          this.elem.addEventListener("ended", this.onEnd.bind(this)),
          this.autoplay && this.play())
        : (this.audioObject.setLoop(this.isLoopable),
          this._buffer && this.decodeAudioData()),
        this.onInitialized.dispatch(this));
    }
  }
  load(e) {
    if (this.elem) this.elem.src = this.url;
    else {
      const t = this.isPreload ? "add" : "load";
      properties.loader[t](this.url, {
        weight: this.fileSize,
        type: "xhr",
        responseType: "arraybuffer",
        hasLoading: !0,
        onLoad: (r) => {
          ((this._buffer = r),
            this.hasInitialized && this.decodeAudioData(),
            e && e());
        },
      });
    }
  }
  setFinalVolume(e) {
    this.audioObject?.setVolume(e * this.volume);
    if (this.elem) {
      this.elem.volume = Math.max(0, Math.min(1, e * this.volume));
      this.elem.muted = (e === 0 || (typeof window !== "undefined" && window.audios && !window.audios.isActive));
    }
  }
  activateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(
        LOW_PASS_FREQ,
        e.currentTime + 0.5,
      );
    }
  }
  deactivateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(
        MAX_FREQ,
        e.currentTime + 0.5,
      );
    }
  }
  setFilterFrequency(e = MAX_FREQ) {
    this.needsFilter &&
      this.biquadFilter &&
      (this.audioObject.context, (this.biquadFilter.frequency.value = e));
  }
  setFilterFrequencyViaRatio(e = 1) {
    this.setFilterFrequency(
      math.fit(e, 0, 1, MAX_FREQ, LOW_PASS_FREQ, ease.expoOut),
    );
  }
  setPositionObjectParent(e) {
    this.hasInitialized
      ? e
        ? e.add(this.audioObject)
        : this.audioObject.parent &&
          this.audioObject.parent.remove(this.audioObject)
      : (this.positionObjectParent = e);
  }
  decodeAudioData() {
    const e = this._buffer.slice(0);
    const ctx = AudioContext.getContext ? AudioContext.getContext() : (new (window.AudioContext || window.webkitAudioContext)());
    ctx.decodeAudioData(e, (r) => {
      (this.audioObject.setBuffer(r), this.autoplay && this.play());
    });
  }
  onEnd() {
    (this._originalOnEnd && this._originalOnEnd(), this.onEnded.dispatch(this));
  }
  play() {
    if (typeof window !== "undefined" && window.audios && !window.audios.isActive && this.isSfx) return;
    (this.isSfx || (this.autoplay = !0),
      this.audioObject &&
        !this.audioObject.isPlaying &&
        (this.elem
          ? (this.elem.play(),
            (this.elem.currentTime = 0.01),
            (this.elem.muted = typeof window !== "undefined" && window.audios ? !window.audios.isActive : false),
            (this.audioObject.isPlaying = !0))
          : this.audioObject.play(),
        this.onPlayed.dispatch(this)));
  }
  stop() {
    ((this.autoplay = !1),
      this.audioObject &&
        this.audioObject.isPlaying &&
        (this.elem
          ? (this.elem.pause(), (this.audioObject.isPlaying = !1))
          : this.audioObject.stop(),
        this.onEnded.dispatch(this)));
  }
  setRefDistance(e) {
    ((this.refDistance = e),
      this.isPositional &&
        this.audioObject &&
        this.audioObject.setRefDistance(this.refDistance));
  }
  setFadeIn(e = 1) {
    ((this.fadeTime = 0),
      (this.fadeDuration = e),
      (this.isFadingIn = !0),
      (this.isFadingOut = !1),
      this.play());
  }
  setFadeOut(e = 1) {
    ((this.fadeTime = e),
      (this.fadeDuration = e),
      (this.isFadingIn = !1),
      (this.isFadingOut = !0));
  }
  update(e) {
    if (!this.isFadingOut && !this.isFadingIn) return;
    (this.isFadingOut && (this.fadeTime -= e),
      this.isFadingIn && (this.fadeTime += e));
    const t = math.saturate(this.fadeTime / this.fadeDuration);
    ((this.volume = t),
      this.isFadingOut && t === 0 && (this.stop(), (this.isFadingOut = !1)),
      this.isFadingIn && t === 1 && (this.isFadingIn = !1));
  }
}

export { AudioItem, LOW_PASS_FREQ, MAX_FREQ };
export default AudioItem;
