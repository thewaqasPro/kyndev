var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);
function getDefaultExportFromCjs(o) { return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o; }
import * as THREE from "../../three.js";
import math from "../../core/MathUtils.js";
import settings from "../../core/Settings.js";
import properties from "../../core/Properties.js";
import scrollManager from "../ScrollManager.js";
import pagesManager from "../PageManager.js";
import audios from "../../audio/Audios.js";
import input from "../../core/Input.js";
import ease from "../../core/Ease.js";
import { SecondOrderDynamics } from "../../core/Dynamics.js";
import { UfxMesh } from "../../webgl/geometry/UfxMesh.js";
import { Page } from "./Page.js";

const { Vector2, Vector3, Color, LinearFilter, LinearMipmapLinearFilter } = THREE;

let TEXT_STAGGER = 20,
  LETTER_PER_SECOND = 40,
  MAX_RAND_LETTER_COUNT = 5;

globalThis.TEXT_STAGGER = TEXT_STAGGER;
globalThis.LETTER_PER_SECOND = LETTER_PER_SECOND;
globalThis.MAX_RAND_LETTER_COUNT = MAX_RAND_LETTER_COUNT;

const vert$i = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`,
  frag$l = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform vec3 u_colorBg;uniform float u_showRatio;uniform float u_activeRatio;uniform vec2 u_textureSize;uniform vec2 u_domWH;uniform vec2 u_shiftXY;uniform vec3 u_focusPos;uniform float u_time;uniform float u_zoomRatio;uniform float u_dofRangeOffset;uniform float u_saturation;uniform float u_brightness;uniform float u_borderRatio;uniform float u_rippleStrength;uniform vec2 u_resolution;uniform float u_globalRadius;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*u_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;vec2 baseUv=v_uv;baseUv.x-=(screenUv.x-0.5)*(1.-sin((screenUv.y)*3.141592))*u_rippleStrength;float radiusRatio=1.;vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(5.,28.));float imageAlpha=getRoundedCornerMask(baseUv,u_domWH*mix(0.7,1.,u_showRatio),u_globalRadius,radiusRatio);vec2 toUvSpace=1./(u_textureSize*max(u_domWH.x/u_textureSize.x,u_domWH.y/u_textureSize.y));float borderThickenss=(u_domWH.y*0.08+5.)*u_borderRatio-5.;vec2 uv=baseUv-.5;uv*=u_domWH*mix(0.75,1.,u_showRatio);uv*=mix(0.975,1.,u_zoomRatio);float zMultiplier=u_domWH.y*(.15+u_activeRatio*15.);vec3 pos=vec3(uv,-zMultiplier);float cameraDepth=u_domWH.y*mix(10.,5.,u_zoomRatio);vec3 rayOri=vec3(u_focusPos.xy,cameraDepth);float dist=length(pos-rayOri);vec3 rayDir=(pos-rayOri)/dist;float skipDist=cameraDepth/-rayDir.z;dist-=skipDist;float stepDist=dist/float(PARALLAX_SAMPLES);vec3 rayStep=rayDir*stepDist;vec3 rayPos=rayOri+rayDir*(skipDist+stepDist*noise.x);for(int i=0;i<PARALLAX_SAMPLES;i++){float currZ=-texture2D(u_depthTexture,rayPos.xy*toUvSpace+.5).r*zMultiplier;if(currZ>rayPos.z){break;}rayPos+=rayStep;dist+=stepDist;}uv=rayPos.xy;uv*=toUvSpace;uv+=u_shiftXY*0.015;float depth=texture2D(u_depthTexture,uv+.5).r;vec3 color=vec3(0.0);float PI=3.1415926;float blurriness=mix(0.0,0.01,u_zoomRatio)*linearStep(0.0,0.5,abs(depth-u_focusPos.z)+u_dofRangeOffset);float angle=PI*2.*noise.y;float textureAspectInv=u_textureSize.y/u_textureSize.x;float numSampleInv=1./float(BLUR_SAMPLES);for(int i=0;i<BLUR_SAMPLES;i++){float fI=float(i);float r=sqrt((fI+0.5)*numSampleInv)*blurriness;angle+=10.16640738;vec2 uvOffset=r*vec2(cos(angle)*textureAspectInv,sin(angle));vec4 image=texture2D(u_texture,uv+uvOffset+.5);color+=image.rgb;}color*=numSampleInv;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color+=u_brightness;float fogThickness=0.75;color=mix(color,u_colorBg,linearStep(0.0,fogThickness,u_activeRatio*(1.+fogThickness*2.)-fogThickness-(1.0-depth)));gl_FragColor=vec4(color,imageAlpha);}`;
globalThis.vert$i = vert$i;
globalThis.frag$l = frag$l;

/**
 * Projects Gallery Portfolio Controller
 */
class ProjectItem {
  static hoverDom = null;
  constructor(e, t, r, n) {
    ((this.list = e),
      (this.id = t),
      (this.dom = r),
      (this.index = n),
      (this.isHover = !1),
      (this.hoverRatio = 0),
      (this.hoverThresholds = [0, 0.2, 0.3]),
      (this.focusZ = 0.5),
      (this.parallaxStrength = 1),
      (this.activeRatio = 0),
      (this.showTime = 0),
      (this.isHoverDom = !1),
      (this.domMain = this.dom.querySelector(".project-item-main")),
      (this.domFooterLine1 = this.dom.querySelector(".project-item-line-1")),
      (this.domFooterLine2 = this.dom.querySelector(
        ".project-item-line-2-inner",
      )),
      (this.domFooterLine2Icon = this.dom.querySelector(
        ".project-item-line-2-icon",
      )),
      (this.domFooterLine2List = []),
      (this.domFooterLine1Text = this.domFooterLine1.textContent),
      (this.domFooterLine1Time = 0),
      (this.domFooterLine2Text = this.domFooterLine2.textContent),
      (this.domFooterLine2Time = 0),
      (this.domFooterLine2HoverRatio = 0));
    let a = settings.USE_WEBGL2 ? LinearMipmapLinearFilter : LinearFilter,
      l = properties.loader.load(
        settings.PROJECT_PATH + this.id + "/home.webp",
        { type: "texture", minFilter: a },
      ).content,
      c = properties.loader.load(
        settings.PROJECT_PATH + this.id + "/home_depth.webp",
        { type: "texture", minFilter: LinearFilter },
      ).content;
    ((this.focusPosMotion = new SecondOrderDynamics(new Vector3(), 1, 0.6, 2)),
      (this.focusPos = this.focusPosMotion.value),
      (this.shiftXYTarget = new Vector2()),
      (this.shiftXY = new Vector2()),
      (this.zoomMotion = new SecondOrderDynamics(1, 2.2, 0.7, 3)),
      (this.dofRangeOffsetRatio = 0),
      (this.borderMotion = new SecondOrderDynamics(0, 2.5, 0.5, 2)));
    let u = n % 2 ? 1 : -1;
    ((this.ufxMesh = new UfxMesh({
      refDom: this.domMain,
      paddingL: u > 0 ? 0 : 1e3,
      paddingR: u < 0 ? 0 : 1e3,
      uniforms: Object.assign(
        {
          u_side: { value: u },
          u_sideMargin: { value: 1 },
          u_texture: { value: l },
          u_depthTexture: { value: c },
          u_textureSize: { value: l.size },
          u_focusPos: { value: this.focusPos },
          u_shiftXY: { value: this.shiftXY },
          u_deltaOffset: { value: new Vector2() },
          u_zoomRatio: this.zoomMotion,
          u_dofRangeOffset: { value: 0 },
          u_dofStrength: { value: 1 },
          u_saturation: { value: -1 },
          u_brightness: { value: 0 },
          u_colorBg: { value: new Color(r.dataset.colorBg) },
          u_activeRatio: { value: 0 },
          u_showRatio: { value: 0 },
          u_borderRatio: { value: 0 },
          u_rippleStrength: { value: 0 },
          u_time: properties.sharedUniforms.u_time,
          u_globalRadius: properties.sharedUniforms.u_globalRadius,
        },
        blueNoise.sharedUniforms,
      ),
      depthTest: !1,
      depthWrite: !1,
      vertexShader: vert$i,
      fragmentShader: frag$l,
    })),
      (this.ufxMesh.material.defines.PARALLAX_SAMPLES = 12),
      (this.ufxMesh.material.defines.BLUR_SAMPLES = 6),
      (this.ufxMesh.renderOrder = 10),
      this.domMain.addEventListener(
        "mouseenter",
        this._onMouseEnter.bind(this),
      ),
      this.domMain.addEventListener(
        "mouseleave",
        this._onMouseLeave.bind(this),
      ));
  }
  _onMouseEnter() {
    pagesManager.isIdle &&
      this.list.zoomRatio == 0 &&
      ((this.isHover = !0), audios.countPlay("focus"));
  }
  _onMouseLeave() {
    this.isHover = !1;
  }
  syncDom() {
    this.ufxMesh.syncDom(-scrollManager.scrollPixel);
  }
  _findIndexFromThresholds(e) {
    for (let t = 0; t < this.hoverThresholds.length; t++)
      if (e < this.hoverThresholds[t]) return t;
    return this.hoverThresholds.length;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.dom);
    if (t.ratio > -1 && t.ratio < 1) {
      (this.ufxMesh.update(-scrollManager.scrollPixel),
        (this.domFooterLine2HoverRatio = math.saturate(
          this.domFooterLine2HoverRatio + (this.isHoverDom ? 1 : -1) * e * 2.5,
        )),
        (this.domFooterLine1Time += e));
      let r = this.domFooterLine1Text,
        n = Math.min(
          r.length,
          Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time) -
            MAX_RAND_LETTER_COUNT,
        ),
        a = Math.min(
          r.length,
          Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time),
        ),
        l = "";
      for (let c = 0; c < n; c++) l += r[c];
      for (let c = 0; c < a - n; c++)
        l += String.fromCharCode(33 + ~~(Math.random() * 93));
      if (
        ((this.domFooterLine1.textContent = l),
        (this.domFooterLine2Time += e * 0.8),
        properties.useMobileLayout)
      )
        (this.domFooterLine2List.forEach((c, u) => {
          c.style.transform = "translate3d(1.5em, 0, 0)";
          let f = math.saturate(
              this.domFooterLine2HoverRatio -
                Math.abs(u - this.domFooterLine2List.length - 1) / 100,
            ),
            p = math.fit(f, 0, 1, 0, 1.5, ease.lusion);
          c.style.transform += `translateX(${p}em)`;
        }),
          (this.domFooterLine2Icon.style.transform = "translateX(1em)"));
      else {
        this.domFooterLine2List.forEach((u, f) => {
          let p = math.fit(
              f,
              0,
              this.domFooterLine2List.length - 1,
              Math.PI / 2,
              (3 * Math.PI) / 2,
            ),
            g = math.saturate(
              this.domFooterLine2Time - Math.cos(p) / TEXT_STAGGER,
            ),
            v = math.fit(g, 0, 1, 500, 0, ease.expoInOut),
            _ = math.saturate(
              this.domFooterLine2HoverRatio -
                Math.abs(f - this.domFooterLine2List.length - 1) / 100,
            ),
            T = math.fit(_, 0, 1, 0, 1.5, ease.lusion);
          u.style.transform = `translate3d(${T}em, -${v}%, 0)`;
        });
        let c = math.fit(
          this.domFooterLine2HoverRatio,
          0.3,
          1,
          0,
          1,
          ease.lusion,
        );
        this.domFooterLine2Icon.style.transform = `translateX(${c}em)`;
      }
      if (
        ((this.showTime += e),
        this.ufxMesh.testViewport(-scrollManager.scrollPixel))
      ) {
        this.ufxMesh.visible = !0;
        let c = input.mousePixelXY.x,
          u = input.mousePixelXY.y + scrollManager.scrollPixel,
          f = this.ufxMesh._domX,
          p = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY,
          g = this.ufxMesh._domWidth,
          v = this.ufxMesh._domHeight,
          _ = this.hoverRatio;
        if (
          ((this.hoverRatio = math.clamp(
            this.hoverRatio + (this.isHover ? 1 : -1) * e,
            0,
            1,
          )),
          _ < this.hoverRatio)
        ) {
          let w = this._findIndexFromThresholds(_),
            R = this._findIndexFromThresholds(this.hoverRatio);
          (R != w &&
            this.shiftXYTarget
              .set(Math.random() - 0.5, Math.random() - 0.5)
              .normalize()
              .multiplyScalar(math.fit(this.hoverRatio, 0, 0.6, 1, 0)),
            R == this.hoverThresholds.length &&
              this.shiftXYTarget.multiplyScalar(0.5));
        } else this.shiftXYTarget.multiplyScalar(0.95);
        this.shiftXY.lerp(this.shiftXYTarget, 0.2);
        let T = this.focusPosMotion.target,
          M = this.list.zoomRatio,
          S = (this.activeRatio =
            this.id == this.list.selectedId
              ? M
              : Math.min(this.activeRatio, M));
        if (this.isHover && S == 0) {
          let w = this.parallaxStrength,
            R =
              this.hoverRatio > 0
                ? math.fit(this.hoverRatio, 0, 0.3, 1, 0) * v * 0.75
                : 0;
          ((T.x =
            ((c - f - g * 0.5 + Math.cos(properties.time * 20) * R) / g) *
            -v *
            w),
            (T.y =
              ((u - p - v * 0.5 - Math.sin(properties.time * 30) * R) / v) *
              v *
              w),
            (T.z = this.focusZ));
        } else ((T.x = 0), (T.y = 0), (T.z = S > 0 ? this.focusZ : -1));
        ((this.zoomMotion.target = this.isHover || S > 0 ? 1 : 0),
          (this.dofRangeOffsetRatio = math.clamp(
            this.dofRangeOffsetRatio + (this.isHover ? 0.75 : -1) * e,
            0,
            1,
          )),
          (this.ufxMesh.material.uniforms.u_dofRangeOffset.value = math.mix(
            0,
            -0.5,
            this.dofRangeOffsetRatio,
          )),
          (this.ufxMesh.material.uniforms.u_saturation.value = 0),
          (this.ufxMesh.material.uniforms.u_brightness.value = 0));
        let b = math.fit(this.showTime, 0, 1.5, 0, 1, ease.expoOut);
        ((this.ufxMesh.material.uniforms.u_showRatio.value = b),
          (this.ufxMesh.material.uniforms.u_activeRatio.value = S * S));
        let C = math.fit(this.showTime, 0, 2, 0, 1, ease.expoOut);
        ((this.ufxMesh.position.x =
          (1 - C) * ((this.index % 2) - 0.5) * -properties.viewportWidth * 0.1),
          (this.ufxMesh.rotation.z = (1 - C) * ((this.index % 2) - 0.5) * 0.1),
          (this.borderMotion.target = this.isHover && S == 0 ? 1 : 0),
          this.borderMotion.update(e),
          (this.ufxMesh.material.uniforms.u_borderRatio.value = 0),
          (this.ufxMesh.material.uniforms.u_rippleStrength.value = Math.min(
            0.15,
            scrollManager.easedScrollStrength * 0.5,
          )),
          this.focusPosMotion.update(e),
          this.zoomMotion.update(e));
      } else this.ufxMesh.visible = !1;
    } else
      ((this.ufxMesh.visible = !1),
        (this.showTime = 0),
        (this.domFooterLine1Time = 0),
        (this.domFooterLine2Time = 0),
        this.domFooterLine2.style.removeProperty("will-change"));
  }
  preloadImage() {}
}
class ProjectItemList {
  selectedId = null;
  page = null;
  zoomRatio = 0;
  projectItems = {};
  projectItemList = [];
  ufxContainer = new Object3D();
  ufxPivotContainer = new Object3D();
  constructor(e, t) {
    ((this.page = e),
      this.ufxContainer.add(this.ufxPivotContainer),
      e.postUfxContainer.add(this.ufxContainer));
    let r = t.querySelectorAll(".project-item");
    for (let n = 0; n < r.length; n++) {
      let a = r[n],
        l = a.dataset.id,
        c =
          (this.projectItems[l] =
          this.projectItemList[n] =
            new ProjectItem(this, l, a, n));
      (properties.useMobileLayout ||
        (c.dom.addEventListener(
          "mouseenter",
          this._onDomItemMouseEnter.bind(this),
        ),
        c.dom.addEventListener(
          "mouseleave",
          this._onDomItemMouseLeave.bind(this),
        )),
        this.ufxPivotContainer.add(c.ufxMesh));
      let u = c.domFooterLine2.textContent.split("");
      ((c.domFooterLine2.textContent = ""),
        u.forEach((f) => {
          let p = document.createElement("div");
          if (
            (p.classList.add("project-item-line-2-inner-list"),
            (p.style.display = "flex"),
            (p.style.flexDirection = "column"),
            (p.style.transform = "translateY(-400%)"),
            c.domFooterLine2List.push(p),
            f === " ")
          )
            p.style.width = "0.3em";
          else
            for (let g = 0; g < 4; g++) {
              let v = document.createElement("span");
              ((v.textContent = f), p.appendChild(v));
            }
          c.domFooterLine2.appendChild(p);
        }));
    }
  }
  hasProject(e) {
    return !!this.projectItems[e];
  }
  getProjectItemTop(e) {
    let t = this.projectItems[e];
    return t ? scrollManager.getDomRange(t.dom)._top : 0;
  }
  _onDomItemMouseEnter(e) {
    let t = this.projectItemList.filter((r) => r.dom === e.target)[0];
    ((t.isHoverDom = !0), (ProjectItem.hoverDom = t));
  }
  _onDomItemMouseLeave(e) {
    let t = this.projectItemList.filter((r) => r.dom === e.target)[0];
    ((t.isHoverDom = !1), (ProjectItem.hoverDom = null));
  }
  resize = (e, t) => {
    ((this.needsSyncUfx = !0),
      this.ufxPivotContainer.position.set(-e * 0.5, t * 0.5, 0),
      this.ufxContainer.position.set(e * 0.5, -t * 0.5, 0));
    for (let r = 0; r < this.projectItemList.length; r++) {
      let n = this.projectItemList[r];
      n.isHoverDom = !1;
    }
    ProjectItem.hoverDom = null;
  };
  update(e) {
    if (this.needsSyncUfx) {
      this.needsSyncUfx = !1;
      for (let u = 0; u < this.projectItemList.length; u++)
        this.projectItemList[u].syncDom();
    }
    let t = 0,
      r = 0,
      n = 0,
      a = 0,
      l = 1,
      c = this.projectItems[this.selectedId];
    if (c) {
      let u = ease.cubicInOut(this.zoomRatio),
        f = Math.max(
          properties.viewportWidth / c.ufxMesh._domWidth,
          properties.viewportHeight / c.ufxMesh._domHeight,
        );
      l *= math.mix(1, f * 1.2, u);
      let p =
          properties.viewportWidth * 0.5 -
          c.ufxMesh._domX -
          c.ufxMesh._domWidth * 0.5,
        g =
          properties.viewportHeight * 0.5 -
          c.ufxMesh._domY -
          c.ufxMesh._domHeight * 0.5 +
          scrollManager.scrollPixel +
          c.ufxMesh._capturedOffsetY;
      ((t += p),
        (r -= g),
        (t -= (p * (1 - u)) / l),
        (r += (g * (1 - u)) / l),
        (n += (u * 0.3 * p) / properties.viewportWidth),
        (a -= (u * 0.3 * p) / properties.viewportWidth));
    }
    ((t -= properties.viewportWidth * 0.5),
      (r += properties.viewportHeight * 0.5),
      this.ufxPivotContainer.position.set(t, r, 0),
      (this.ufxContainer.rotation.y = n),
      (this.ufxContainer.rotation.z = a),
      this.ufxContainer.scale.setScalar(l));
    for (let u = 0; u < this.projectItemList.length; u++)
      this.projectItemList[u].update(e);
  }
}

class ProjectsMainSection {
  domContainer;
  domTitle;
  projectItemList;
  time = 0;
  _needsReset = !0;
  preInit(e) {
    ((this.domContainer = e.querySelector("#projects-main")),
      (this.projectItemList = new ProjectItemList(
        projectsPage,
        e.querySelector(".project-list"),
      )),
      (this.domItems = e.querySelectorAll(".project-item")),
      (this.domTitle = e.querySelector("#projects-main-title")),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      (this.domTitleProjectNumber = e.querySelector(
        "#projects-main-title-project-number",
      )),
      (this.domTitleProjectArrow = e.querySelector(
        "#projects-main-title-project-arrow",
      )));
  }
  init() {}
  hasProject(e) {
    return this.projectItemList.hasProject(e);
  }
  resize(e, t) {
    (this._splitText(), this.projectItemList.resize(e, t));
  }
  update(e) {
    if (scrollManager.getDomRange(this.domContainer).isActive) {
      this._needsReset && this._reset();
      let r = scrollManager.getDomRange(this.domTitle);
      if (
        ((this.domTitle._time = math.clamp(
          this.domTitle._time + (this.domTitle._animating ? e : -e),
          0,
          2,
        )),
        r.screenRatio > -1 && (this.domTitle._animating = !0),
        properties.useMobileLayout)
      )
        this.domTitleProjectArrow.style.transform = "scale(1)";
      else {
        (this.domTitle._splitted.chars.forEach((a, l) => {
          let c = math.fit(
              this.domTitle._time * 1.5 - l / 20 - 0.2,
              0,
              1,
              100,
              0,
              ease.lusion,
            ),
            u = math.fit(
              this.domTitle._time * 1.5 - l / 20 - 0.2,
              0,
              1,
              30,
              0,
              ease.lusion,
            );
          a.style.transform = `translate3d(0, ${c}%, 0) rotate(${u}deg)`;
        }),
          this.domTitleProjectNumber._splitted.chars.forEach((a, l) => {
            let c = math.fit(
              this.domTitle._time - l / 20 - 0.5,
              0,
              1,
              100,
              0,
              ease.lusion,
            );
            a.style.transform = `translate3d(0, ${c}%, 0)`;
          }));
        let n = ease.elasticOut(math.saturate(this.domTitle._time - 0.6));
        this.domTitleProjectArrow.style.transform = `scale(${n})`;
      }
    } else this._needsReset = !0;
    ((this.projectItemList.zoomRatio = math.fit(
      projectsPage.activeRatio,
      0,
      0.75,
      1,
      0,
    )),
      this.projectItemList.update(e));
  }
  _reset() {
    this.domTitle._splitted &&
      ((this._needsReset = !1),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      properties.useMobileLayout
        ? (this.domTitle._splitted.chars &&
            this.domTitle._splitted.chars.forEach((e) => {
              e.style.transform = "translate3d(0, 0, 0)";
            }),
          this.domTitleProjectNumber._splitted.chars &&
            this.domTitleProjectNumber._splitted.chars.forEach((e) => {
              e.style.transform = "translate3d(0, 0, 0)";
            }),
          (this.domTitleProjectArrow.style.transform = "scale(1)"))
        : (this.domTitle._splitted.chars.forEach((e) => {
            e.style.transform = "translate3d(0, 100%, 0)";
          }),
          this.domTitleProjectNumber._splitted.chars.forEach((e) => {
            e.style.transform = "translate3d(0, 100%, 0)";
          }),
          (this.domTitleProjectArrow.style.transform = "scale(0)")));
  }
  _splitText() {
    this.domTitle._splitted && this.domTitle._splitted.revert && this.domTitle._splitted.revert();
    this.domTitleProjectNumber._splitted && this.domTitleProjectNumber._splitted.revert && this.domTitleProjectNumber._splitted.revert();
    if (!properties.useMobileLayout) {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "chars",
      });
      this.domTitleProjectNumber._splitted = new SplitType(
        this.domTitleProjectNumber,
        { types: "chars" },
      );
    }
  }
}
const projectsMainSection = new ProjectsMainSection();
class ProjectsPageAudios {
  hasInit = !1;
  constructor() {}
  init() {
    settings.USE_AUDIO &&
      (audios.fadeBgMusic("generic", 1),
      !this.hasInit &&
        ((this.domProjectItems = Array.from(
          document.querySelectorAll("#projects .project-item"),
        )),
        this.domProjectItems.forEach((e) => {
          audios.addHoverClickEvents(e);
        }),
        (this.hasInit = !0)));
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectsPageAudios = new ProjectsPageAudios();
class ProjectsPage extends Page {
  path = "projects";
  id = "projects";
  endVisualUseTextured = !0;
  preInit() {
    let e = this.domContainer;
    projectsMainSection.preInit(e);
  }
  init() {
    projectsMainSection.init();
  }
  hasProject(e) {
    return projectsMainSection.projectItemList.hasProject(e);
  }
  show(e, t, r) {
    ((this.useGenericTransition = !0),
      (projectsMainSection.projectItemList.selectedId = null));
    let n = e.pathNodes[1];
    (e.target === projectPage && this.hasProject(n) && this.isFirstShown
      ? ((this.useGenericTransition = !1),
        (this.showDuration = 1.5),
        scrollManager.scrollToPixel(
          projectsMainSection.projectItemList.getProjectItemTop(n) -
            properties.viewportHeight * 0.25,
          !0,
        ),
        (projectsMainSection.projectItemList.selectedId = n))
      : (this.showDuration = 1),
      projectsPageAudios.init(),
      super.show(e, t, r));
  }
  hide(e, t, r) {
    ((this.useGenericTransition = !0),
      (projectsMainSection.projectItemList.selectedId = null),
      t.target === projectPage && this.hasProject(t.pathNodes[1])
        ? ((this.useGenericTransition = !1),
          (this.hideDuration = 1.5),
          (projectsMainSection.projectItemList.selectedId = t.pathNodes[1]))
        : (this.hideDuration = 1),
      super.hide(e, t, r));
  }
  resize(e, t) {
    projectsMainSection.resize(e, t);
  }
  update(e) {
    if ((super.update(e), !!this.hasInitialized)) {
      if (
        (projectsMainSection.update(e), pagesManager.scrollTargetPage == this)
      ) {
        properties.bgColor.setStyle(properties.offWhiteColorHex);
        let t = !0,
          r = !1,
          n = !1;
        (document.documentElement.classList.toggle("is-black-bg", r),
          document.documentElement.classList.toggle("is-white-bg", t),
          document.documentElement.classList.toggle("is-blue-bg", n));
      }
      projectsPageAudios.update(e);
    }
  }
}
const projectsPage = new ProjectsPage();
var dayjs_min = { exports: {} };
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    var t = 1e3,
      r = 6e4,
      n = 36e5,
      a = "millisecond",
      l = "second",
      c = "minute",
      u = "hour",
      f = "day",
      p = "week",
      g = "month",
      v = "quarter",
      _ = "year",
      T = "date",
      M = "Invalid Date",
      S =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      b =
        /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      C = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (z) {
          var j = ["th", "st", "nd", "rd"],
            X = z % 100;
          return "[" + z + (j[(X - 20) % 10] || j[X] || j[0]) + "]";
        },
      },
      w = function (z, j, X) {
        var Z = String(z);
        return !Z || Z.length >= j
          ? z
          : "" + Array(j + 1 - Z.length).join(X) + z;
      },
      R = {
        s: w,
        z: function (z) {
          var j = -z.utcOffset(),
            X = Math.abs(j),
            Z = Math.floor(X / 60),
            q = X % 60;
          return (j <= 0 ? "+" : "-") + w(Z, 2, "0") + ":" + w(q, 2, "0");
        },
        m: function z(j, X) {
          if (j.date() < X.date()) return -z(X, j);
          var Z = 12 * (X.year() - j.year()) + (X.month() - j.month()),
            q = j.clone().add(Z, g),
            ue = X - q < 0,
            oe = j.clone().add(Z + (ue ? -1 : 1), g);
          return +(-(Z + (X - q) / (ue ? q - oe : oe - q)) || 0);
        },
        a: function (z) {
          return z < 0 ? Math.ceil(z) || 0 : Math.floor(z);
        },
        p: function (z) {
          return (
            { M: g, y: _, w: p, d: f, D: T, h: u, m: c, s: l, ms: a, Q: v }[
              z
            ] ||
            String(z || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (z) {
          return z === void 0;
        },
      },
      E = "en",
      I = {};
    I[E] = C;
    var F = "$isDayjsObject",
      k = function (z) {
        return z instanceof re || !(!z || !z[F]);
      },
      L = function z(j, X, Z) {
        var q;
        if (!j) return E;
        if (typeof j == "string") {
          var ue = j.toLowerCase();
          (I[ue] && (q = ue), X && ((I[ue] = X), (q = ue)));
          var oe = j.split("-");
          if (!q && oe.length > 1) return z(oe[0]);
        } else {
          var te = j.name;
          ((I[te] = j), (q = te));
        }
        return (!Z && q && (E = q), q || (!Z && E));
      },
      D = function (z, j) {
        if (k(z)) return z.clone();
        var X = typeof j == "object" ? j : {};
        return ((X.date = z), (X.args = arguments), new re(X));
      },
      ne = R;
    ((ne.l = L),
      (ne.i = k),
      (ne.w = function (z, j) {
        return D(z, { locale: j.$L, utc: j.$u, x: j.$x, $offset: j.$offset });
      }));
    var re = (function () {
        function z(X) {
          ((this.$L = L(X.locale, null, !0)),
            this.parse(X),
            (this.$x = this.$x || X.x || {}),
            (this[F] = !0));
        }
        var j = z.prototype;
        return (
          (j.parse = function (X) {
            ((this.$d = (function (Z) {
              var q = Z.date,
                ue = Z.utc;
              if (q === null) return new Date(NaN);
              if (ne.u(q)) return new Date();
              if (q instanceof Date) return new Date(q);
              if (typeof q == "string" && !/Z$/i.test(q)) {
                var oe = q.match(S);
                if (oe) {
                  var te = oe[2] - 1 || 0,
                    le = (oe[7] || "0").substring(0, 3);
                  return ue
                    ? new Date(
                        Date.UTC(
                          oe[1],
                          te,
                          oe[3] || 1,
                          oe[4] || 0,
                          oe[5] || 0,
                          oe[6] || 0,
                          le,
                        ),
                      )
                    : new Date(
                        oe[1],
                        te,
                        oe[3] || 1,
                        oe[4] || 0,
                        oe[5] || 0,
                        oe[6] || 0,
                        le,
                      );
                }
              }
              return new Date(q);
            })(X)),
              this.init());
          }),
          (j.init = function () {
            var X = this.$d;
            ((this.$y = X.getFullYear()),
              (this.$M = X.getMonth()),
              (this.$D = X.getDate()),
              (this.$W = X.getDay()),
              (this.$H = X.getHours()),
              (this.$m = X.getMinutes()),
              (this.$s = X.getSeconds()),
              (this.$ms = X.getMilliseconds()));
          }),
          (j.$utils = function () {
            return ne;
          }),
          (j.isValid = function () {
            return this.$d.toString() !== M;
          }),
          (j.isSame = function (X, Z) {
            var q = D(X);
            return this.startOf(Z) <= q && q <= this.endOf(Z);
          }),
          (j.isAfter = function (X, Z) {
            return D(X) < this.startOf(Z);
          }),
          (j.isBefore = function (X, Z) {
            return this.endOf(Z) < D(X);
          }),
          (j.$g = function (X, Z, q) {
            return ne.u(X) ? this[Z] : this.set(q, X);
          }),
          (j.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (j.valueOf = function () {
            return this.$d.getTime();
          }),
          (j.startOf = function (X, Z) {
            var q = this,
              ue = !!ne.u(Z) || Z,
              oe = ne.p(X),
              te = function (ve, de) {
                var xe = ne.w(
                  q.$u ? Date.UTC(q.$y, de, ve) : new Date(q.$y, de, ve),
                  q,
                );
                return ue ? xe : xe.endOf(f);
              },
              le = function (ve, de) {
                return ne.w(
                  q
                    .toDate()
                    [ve].apply(
                      q.toDate("s"),
                      (ue ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(de),
                    ),
                  q,
                );
              },
              Te = this.$W,
              K = this.$M,
              G = this.$D,
              U = "set" + (this.$u ? "UTC" : "");
            switch (oe) {
              case _:
                return ue ? te(1, 0) : te(31, 11);
              case g:
                return ue ? te(1, K) : te(0, K + 1);
              case p:
                var N = this.$locale().weekStart || 0,
                  he = (Te < N ? Te + 7 : Te) - N;
                return te(ue ? G - he : G + (6 - he), K);
              case f:
              case T:
                return le(U + "Hours", 0);
              case u:
                return le(U + "Minutes", 1);
              case c:
                return le(U + "Seconds", 2);
              case l:
                return le(U + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (j.endOf = function (X) {
            return this.startOf(X, !1);
          }),
          (j.$set = function (X, Z) {
            var q,
              ue = ne.p(X),
              oe = "set" + (this.$u ? "UTC" : ""),
              te = ((q = {}),
              (q[f] = oe + "Date"),
              (q[T] = oe + "Date"),
              (q[g] = oe + "Month"),
              (q[_] = oe + "FullYear"),
              (q[u] = oe + "Hours"),
              (q[c] = oe + "Minutes"),
              (q[l] = oe + "Seconds"),
              (q[a] = oe + "Milliseconds"),
              q)[ue],
              le = ue === f ? this.$D + (Z - this.$W) : Z;
            if (ue === g || ue === _) {
              var Te = this.clone().set(T, 1);
              (Te.$d[te](le),
                Te.init(),
                (this.$d = Te.set(T, Math.min(this.$D, Te.daysInMonth())).$d));
            } else te && this.$d[te](le);
            return (this.init(), this);
          }),
          (j.set = function (X, Z) {
            return this.clone().$set(X, Z);
          }),
          (j.get = function (X) {
            return this[ne.p(X)]();
          }),
          (j.add = function (X, Z) {
            var q,
              ue = this;
            X = Number(X);
            var oe = ne.p(Z),
              te = function (K) {
                var G = D(ue);
                return ne.w(G.date(G.date() + Math.round(K * X)), ue);
              };
            if (oe === g) return this.set(g, this.$M + X);
            if (oe === _) return this.set(_, this.$y + X);
            if (oe === f) return te(1);
            if (oe === p) return te(7);
            var le = ((q = {}), (q[c] = r), (q[u] = n), (q[l] = t), q)[oe] || 1,
              Te = this.$d.getTime() + X * le;
            return ne.w(Te, this);
          }),
          (j.subtract = function (X, Z) {
            return this.add(-1 * X, Z);
          }),
          (j.format = function (X) {
            var Z = this,
              q = this.$locale();
            if (!this.isValid()) return q.invalidDate || M;
            var ue = X || "YYYY-MM-DDTHH:mm:ssZ",
              oe = ne.z(this),
              te = this.$H,
              le = this.$m,
              Te = this.$M,
              K = q.weekdays,
              G = q.months,
              U = q.meridiem,
              N = function (de, xe, ee, Ue) {
                return (de && (de[xe] || de(Z, ue))) || ee[xe].slice(0, Ue);
              },
              he = function (de) {
                return ne.s(te % 12 || 12, de, "0");
              },
              ve =
                U ||
                function (de, xe, ee) {
                  var Ue = de < 12 ? "AM" : "PM";
                  return ee ? Ue.toLowerCase() : Ue;
                };
            return ue.replace(b, function (de, xe) {
              return (
                xe ||
                (function (ee) {
                  switch (ee) {
                    case "YY":
                      return String(Z.$y).slice(-2);
                    case "YYYY":
                      return ne.s(Z.$y, 4, "0");
                    case "M":
                      return Te + 1;
                    case "MM":
                      return ne.s(Te + 1, 2, "0");
                    case "MMM":
                      return N(q.monthsShort, Te, G, 3);
                    case "MMMM":
                      return N(G, Te);
                    case "D":
                      return Z.$D;
                    case "DD":
                      return ne.s(Z.$D, 2, "0");
                    case "d":
                      return String(Z.$W);
                    case "dd":
                      return N(q.weekdaysMin, Z.$W, K, 2);
                    case "ddd":
                      return N(q.weekdaysShort, Z.$W, K, 3);
                    case "dddd":
                      return K[Z.$W];
                    case "H":
                      return String(te);
                    case "HH":
                      return ne.s(te, 2, "0");
                    case "h":
                      return he(1);
                    case "hh":
                      return he(2);
                    case "a":
                      return ve(te, le, !0);
                    case "A":
                      return ve(te, le, !1);
                    case "m":
                      return String(le);
                    case "mm":
                      return ne.s(le, 2, "0");
                    case "s":
                      return String(Z.$s);
                    case "ss":
                      return ne.s(Z.$s, 2, "0");
                    case "SSS":
                      return ne.s(Z.$ms, 3, "0");
                    case "Z":
                      return oe;
                  }
                  return null;
                })(de) ||
                oe.replace(":", "")
              );
            });
          }),
          (j.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (j.diff = function (X, Z, q) {
            var ue,
              oe = this,
              te = ne.p(Z),
              le = D(X),
              Te = (le.utcOffset() - this.utcOffset()) * r,
              K = this - le,
              G = function () {
                return ne.m(oe, le);
              };
            switch (te) {
              case _:
                ue = G() / 12;
                break;
              case g:
                ue = G();
                break;
              case v:
                ue = G() / 3;
                break;
              case p:
                ue = (K - Te) / 6048e5;
                break;
              case f:
                ue = (K - Te) / 864e5;
                break;
              case u:
                ue = K / n;
                break;
              case c:
                ue = K / r;
                break;
              case l:
                ue = K / t;
                break;
              default:
                ue = K;
            }
            return q ? ue : ne.a(ue);
          }),
          (j.daysInMonth = function () {
            return this.endOf(g).$D;
          }),
          (j.$locale = function () {
            return I[this.$L];
          }),
          (j.locale = function (X, Z) {
            if (!X) return this.$L;
            var q = this.clone(),
              ue = L(X, Z, !0);
            return (ue && (q.$L = ue), q);
          }),
          (j.clone = function () {
            return ne.w(this.$d, this);
          }),
          (j.toDate = function () {
            return new Date(this.valueOf());
          }),
          (j.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (j.toISOString = function () {
            return this.$d.toISOString();
          }),
          (j.toString = function () {
            return this.$d.toUTCString();
          }),
          z
        );
      })(),
      ce = re.prototype;
    return (
      (D.prototype = ce),
      [
        ["$ms", a],
        ["$s", l],
        ["$m", c],
        ["$H", u],
        ["$W", f],
        ["$M", g],
        ["$y", _],
        ["$D", T],
      ].forEach(function (z) {
        ce[z[1]] = function (j) {
          return this.$g(j, z[0], z[1]);
        };
      }),
      (D.extend = function (z, j) {
        return (z.$i || (z(j, re, D), (z.$i = !0)), D);
      }),
      (D.locale = L),
      (D.isDayjs = k),
      (D.unix = function (z) {
        return D(1e3 * z);
      }),
      (D.en = I[E]),
      (D.Ls = I),
      (D.p = {}),
      D
    );
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = getDefaultExportFromCjs(dayjs_minExports);
globalThis.dayjs = dayjs;

export { ProjectItem, ProjectItemList, ProjectsMainSection, ProjectsPage, projectsPage };
globalThis.projectsPage = projectsPage;

export default projectsPage;
