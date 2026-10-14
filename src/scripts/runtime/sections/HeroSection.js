/**
 * Hero Section Controller
 * Isolated component controller for the interactive 3D Balloons & Split text hero.
 */
import * as THREE from "../three.js";
const { Vector2, Mesh, NormalBlending } = THREE;
import fboHelper from "../webgl/FboHelper.js";
import properties from "../core/Properties.js";
import math from "../core/MathUtils.js";
import ease from "../core/Ease.js";
import scrollManager from "../navigation/ScrollManager.js";
import input from "../core/Input.js";
import audios from "../audio/Audios.js";
import { visuals } from "../webgl/Stage3D.js";
import { homeBalloons, homeBalloonsBackground } from "../scenes/hero/HomeBalloons.js";
import sectionRegistry from "./SectionRegistry.js";

const frameVert = `#define GLSLIFY 1
attribute vec3 position;varying vec2 v_uv;uniform vec2 u_viewportResolution;uniform vec2 u_domXY;uniform vec2 u_domWH;void main(){v_uv=position.xy*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,1.0);}`;
const frameFrag = `#define GLSLIFY 1
uniform vec3 u_bgColor;uniform vec2 u_aspect;uniform vec2 u_domWH;uniform float u_globalRadius;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){float mask=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius,1.0);gl_FragColor.rgb=u_bgColor;gl_FragColor.a=mask;}`;

globalThis.frameVert = frameVert;
globalThis.frameFrag = frameFrag;

class HomeHeroSection {
  domContainer;
  domHomeTitle;
  sectionDomRange;
  hostPage = null;
  _hasBoundClick = !1;
  preInit(e, hostPage) {
    this.hostPage = hostPage || window.pagesManager?.currRoute?.target || window.homePage;
    let container = e || document;
    ((this.domContainer = container.querySelector("#home-hero")),
      (this.domVisualContainer = container.querySelector(
        "#home-hero-visual-container",
      )),
      (this.domHomeTitle = container.querySelector("#home-hero-title")),
      (this.domHomeScroll = container.querySelector("#home-hero-scroll")),
      (this.domHomeCrosses = Array.from(
        container.querySelectorAll(".home-hero-scroll-container-cross"),
      )));
    if (!this.domContainer) return;
    if (this.domHomeScroll) {
      this.domHomeScroll._animating = !1;
      this.domHomeScroll._time = 0;
    }
    if (!visuals.stage3DList.includes(homeBalloons)) {
      visuals.stage3DList.push(homeBalloons);
    }
    homeBalloons.preInit();
    if (!this.frameMesh) {
      this.frameMesh = new Mesh(
        fboHelper.triGeom,
        fboHelper.createRawShaderMaterial({
          uniforms: Object.assign({
            u_viewportResolution:
              properties.sharedUniforms.u_viewportResolution,
            u_domXY: { value: new Vector2() },
            u_domWH: { value: new Vector2() },
            u_bgColor: properties.sharedUniforms.u_bgColor,
            u_globalRadius: properties.sharedUniforms.u_globalRadius,
          }),
          vertexShader: frameVert,
          fragmentShader: frameFrag,
          blending: NormalBlending,
          depthTest: !1,
          depthWrite: !1,
          derivatives: !0,
          transparent: !0,
          side: 2,
        }),
      );
      this.frameMesh.material.extensions.derivatives = !0;
      this.frameMesh.visible = !1;
      this.frameMesh.renderOrder = -1e3;
    }
    const targetContainer = (this.hostPage && this.hostPage.preUfxContainer) || (window.homePage && window.homePage.preUfxContainer);
    if (targetContainer && this.frameMesh) {
      targetContainer.add(this.frameMesh);
    }
  }
  init() {
    if (!this._hasBoundClick) {
      this._hasBoundClick = !0;
      input.onClicked.add(() => {
        if (this.domVisualContainer && input.hasThroughElem(this.domVisualContainer, "click")) {
          audios.countPlay("click");
          homeBalloons.changeHomeHeroColorSignal.dispatch();
        }
      });
    }
    homeBalloons.init();
  }
  initEvent() {
    window.addEventListener("wheel", this._onWheel.bind(this), { once: !0 });
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer),
      n = r.isActive;
    homeBalloons.ratio = math.fit(r.ratio, 0, 1, 1, 0) * (n ? 1 : 0);
    let a = new SplitType(this.domHomeTitle, { types: "lines, words" });
    for (let l = 0; l < a.lines.length; l++) {
      let c = a.lines[l];
      ((c.style.position = "relative"), (c.style.overflow = "hidden"));
    }
    ((this.domHomeTitle._words = a.words),
      (a = new SplitType(this.domHomeScroll, { types: "words" })),
      (this.domHomeScroll._words = a.words),
      properties.hasInitialized &&
        homeBalloons.resize(properties.width, properties.height));
  }
  _updateUi(e) {
    (scrollManager.scrollPixel,
      math.fit(this.sectionDomRange.ratio, 0.3, 0.7, 0, 1, ease.cubcInOut));
    let t = Math.max(0, (this.hostPage || window.homePage).time - 1);
    for (let r = 0; r < this.domHomeTitle._words.length; r++) {
      let n = this.domHomeTitle._words[r],
        a = t - r / 20;
      n.style.transform = `translate3d(0, ${math.fit(a, 0, 1, 1.7, 0, ease.lusion)}em, 0) rotate(${math.fit(a, 0, 0.7, 15, 0, ease.lusion)}deg)`;
    }
    for (let r = 0; r < this.domHomeCrosses.length; r++) {
      let n = this.domHomeCrosses[r],
        a = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 1, ease.lusion),
        l = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 180, ease.lusion);
      n.style.transform = `scale(${a}) rotate(${l}deg)`;
    }
    for (let r = 0; r < this.domHomeScroll._words.length; r++) {
      let n = this.domHomeScroll._words[r],
        a = math.fit(t - 0.23 - r / 10, 0, 0.6, 0.8, 1, ease.lusion),
        l = math.fit(t - 0.23 - r / 10, 0, 0.6, 0, 1, ease.lusion);
      ((n.style.opacity = l), (n.style.transform = `scale(${a})`));
    }
  }
  _onWheel() {
    this.domHomeScroll._animating = !0;
  }
  update(e) {
    this.sectionDomRange = scrollManager.getDomRange(this.domContainer);
    let t = this.sectionDomRange.isActive,
      r = scrollManager.getDomRange(this.domVisualContainer),
      n = this.frameMesh.material.uniforms;
    if (
      (n.u_domXY.value.set(r.screenX, r.screenY),
      n.u_domWH.value.set(r.width, r.height),
      (homeBalloons.ratio =
        math.fit(this.sectionDomRange.ratio, 0, 1, 1, 0) * (t ? 1 : 0)),
      (homeBalloons.isActive = homeBalloons.ratio > 0),
      (this.frameMesh.visible = t),
      t)
    ) {
      homeBalloons.properties.cameraViewportOffsetY = -(
        r.screenY +
        r.height * 0.5 -
        properties.viewportHeight * 0.5
      );
      let a = r.width / r.height,
        l = math.fit(a, 2.2, 2 / 3, 18, 30);
      ((homeBalloons.properties.cameraFov = l),
        homeBalloonsBackground.clipScale.set(
          (r.width + 2) / properties.viewportWidth,
          (r.height + 2) / properties.viewportHeight,
        ),
        homeBalloonsBackground.clipOffset.set(
          -1 / properties.viewportWidth,
          (homeBalloons.properties.cameraViewportOffsetY - 1) /
            properties.viewportHeight,
        ));
    }
    t && properties.hasStarted && this._updateUi(e, this.sectionDomRange);
  }
  hide() {
    this._reset();
  }
  _reset() {
    if (this.domHomeScroll) {
      this.domHomeScroll._animating = !1;
      this.domHomeScroll._time = 0;
    }
    if (this.domHomeTitle && this.domHomeTitle._words) {
      for (let e = 0; e < this.domHomeTitle._words.length; e++) {
        let t = this.domHomeTitle._words[e];
        if (t && t.style) t.style.transform = "translate3d(0, 100%, 0)";
      }
    }
  }
}

const homeHeroSection = new HomeHeroSection();
window.homeHeroSection = homeHeroSection;
globalThis.homeHeroSection = homeHeroSection;

sectionRegistry.register("#home-hero", () => homeHeroSection);

export { HomeHeroSection, homeHeroSection, frameVert, frameFrag };
export default homeHeroSection;
