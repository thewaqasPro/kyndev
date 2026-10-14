/**
 * Reel Section Controller
 * Isolated component controller for the Showreel video texture, UfxMesh, rollup text, and Vimeo modal.
 */
import * as THREE from "../three.js";
const { Vector2, VideoTexture, Color } = THREE;
import properties from "../core/Properties.js";
import settings from "../core/Settings.js";
import math from "../core/MathUtils.js";
import ease from "../core/Ease.js";
import scrollManager from "../navigation/ScrollManager.js";
import input from "../core/Input.js";
import videoOverlay, { VIDEO_LIST } from "../ui/VideoOverlay.js";
import screenPaint from "../webgl/ScreenPaint.js";
import blueNoise from "../webgl/BlueNoise.js";
import UfxMesh from "../webgl/geometry/UfxMesh.js";
import Line from "../webgl/geometry/Line.js";
import sectionRegistry from "./SectionRegistry.js";

const videoVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXYFrom;uniform vec2 u_domWHFrom;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;varying float v_deltaRatio;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos,in vec2 domWH){vec3 basePos=vec3((pos.xy)*domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 getScreenPosition(in vec3 basePos,in vec2 domXY){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(domXY,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){float placementWeight=1.-(pow(position.x*position.x,0.75)+pow(1.-position.y,1.5))/2.;v_showRatio=(smoothstep(placementWeight*0.3,0.7+placementWeight*0.3,u_showRatio));vec2 domXY=mix(u_domXYFrom,u_domXY,v_showRatio);vec2 domWH=mix(u_domWHFrom,u_domWH,v_showRatio);domXY.x+=mix(domWH.x,0.,cos(v_showRatio*3.1415926*2.)*0.5+0.5)*0.1;vec3 basePos=getBasePosition(position,domWH);float rot=(smoothstep(0.,1.,v_showRatio)-v_showRatio)*-0.5;vec3 rotBasePos=qrotate(vec4(0.,0.,sin(rot),cos(rot)),basePos);vec3 screenPos=getScreenPosition(rotBasePos,domXY);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=vec2(uv.x,1.-uv.y);v_domWH=domWH;}`;
const videoFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec3 u_color;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_time;uniform vec2 u_radialCenter;uniform float u_showRatio;uniform float u_globalRadius;uniform float u_aspectScale;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*v_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(6.,25.));float imageAlpha=getRoundedCornerMask(v_uv,v_domWH,u_globalRadius,1.0);vec2 baseUv=v_uv;float toRadialCenterDist=length((baseUv-u_radialCenter)*vec2(v_domWH.x/v_domWH.y,1.));baseUv.y=(baseUv.y-.5)*mix(1.,u_aspectScale,v_showRatio)+0.5;vec3 color=texture2D(u_texture,baseUv).rgb;vec3 tintedColor=max(u_color,vec3(dot(color,vec3(0.299,0.587,0.114))));gl_FragColor=vec4(mix(tintedColor,color,v_showRatio),imageAlpha);}`;

globalThis.videoVert = videoVert;
globalThis.videoFrag = videoFrag;

class HomeReelSection {
  domContainer;
  domTitle;
  domTitleLine1;
  domDesc;
  domTopContainer;
  domBottomContainer;
  domTopPlayButton;
  domReelContainer;
  domVideoPlaceholder;
  videoPlaceholderHeight = 0;
  ufxMesh;
  ufxShowRatio = 0;
  ufxMeshRadialCenter = new Vector2(0.5, 0.5);
  isUfxMeshHover = !1;
  ROLLUP_ANIMATION_INTERVAL = 2;
  currRollupTime = 0;
  prevRollupTime = 0;
  hoverRatio = 0;
  geometry = null;
  _needsReset = !0;
  isVerticalVideo = !1;
  showVideoPlaceholderButton = !1;
  hostPage = null;
  _hasBoundClick = !1;
  _hasBoundHide = !1;
  _onVideoMeshMouseEnterBound = null;
  _onVideoMeshMouseLeaveBound = null;
  _onDomVideoButtonMouseenterBound = null;
  _onDomVideoButtonMouseleaveBound = null;

  preInit(e, hostPage) {
    this.hostPage = hostPage || window.pagesManager?.currRoute?.target || window.homePage;
    let container = e || document;
    this.domContainer = container.querySelector("#home-reel");
    if (!this.domContainer) return;

    this.domTitle = container.querySelector("#home-reel-title");
    if (this.domTitle) {
      this.domTitle._time = 0;
      this.domTitle._animating = !1;
    }
    this.domTitleInner = container.querySelector("#home-reel-title-inner");
    this.domTitleLine1 = container.querySelector("#home-reel-title-line-1");
    this.domContent = container.querySelector("#home-reel-content");
    this.domDescription = container.querySelector("#home-reel-desc");
    if (this.domDescription) {
      this.domDescription._time = 0;
      this.domDescription._animating = !1;
    }
    this.domBtn = container.querySelector("#home-reel-cta");
    if (this.domBtn) {
      this.domBtn._ratio = 0;
      this.domBtn._animating = !1;
    }
    this.domThumb = container.querySelector("#home-reel-thumb");
    this.domReelContainer = container.querySelector("#home-reel-container");
    this.domReelContainerInner = container.querySelector(
      "#home-reel-container-inner",
    );
    this.domVideoContainer = container.querySelector("#home-reel-video-container");
    this.domVideoContainerDecorationTop = container.querySelector(
      "#home-reel-video-container-top",
    );
    if (this.domVideoContainerDecorationTop) {
      this.domVideoContainerDecorationTop._crosses = Array.from(
        this.domVideoContainerDecorationTop.querySelectorAll(
          ".home-reel-video-container-cross",
        ),
      );
      this.domVideoContainerDecorationTop._svgWrapper =
        this.domVideoContainerDecorationTop.querySelector(
          ".home-reel-video-container-svg-wrapper",
        );
      this.domVideoContainerDecorationTop._svgs = Array.from(
        this.domVideoContainerDecorationTop.querySelectorAll("svg"),
      );
      this.domVideoContainerDecorationTop._animating = !1;
      this.domVideoContainerDecorationTop._time = 0;
    }
    this.domVideoContainerDecorationBottom = container.querySelector(
      "#home-reel-video-container-bottom",
    );
    if (this.domVideoContainerDecorationBottom) {
      this.domVideoContainerDecorationBottom._crosses = Array.from(
        this.domVideoContainerDecorationBottom.querySelectorAll(
          ".home-reel-video-container-cross",
        ),
      );
      this.domVideoContainerDecorationBottom._svgWrapper =
        this.domVideoContainerDecorationBottom.querySelector(
          ".home-reel-video-container-svg-wrapper",
        );
      this.domVideoContainerDecorationBottom._svgs = Array.from(
        this.domVideoContainerDecorationBottom.querySelectorAll("svg"),
      );
      this.domVideoContainerDecorationBottom._animating = !1;
      this.domVideoContainerDecorationBottom._time = 0;
    }
    this.domVideoPlaceholder = container.querySelector(
      "#home-reel-video-placeholder",
    );
    this.domVideoTitle = container.querySelector("#home-reel-video-title");
    if (this.domVideoTitle) {
      this.domVideoTitle._animating = !1;
      this.domVideoTitle._time = 0;
      this.domVideoTitle._showAnimating = !1;
      this.domVideoTitle._showTime = 0;
    }
    this.domVideoContainerDecoration = container.querySelector(
      "#home-reel-video-container-decoration",
    );
    this.domTopContainer = container.querySelector(
      "#home-reel-decoration-top-container",
    );
    this.domBottomContainer = container.querySelector(
      "#home-reel-decoration-bottom-container",
    );
    this.domVideoButton = container.querySelector("#home-reel-video-watch-btn");
    if (this.domVideoButton) {
      this.domVideoButton._active = !1;
      this.domVideoButton._ratio = 0;
      this.domVideoButton._time = 0;
      this.domVideoButton._hover = !1;
      this.domVideoButton._hoverRatio = 0;
      this.domVideoButton._hoverRatio2 = 0;
      this.domVideoButton._hoverRatio3 = 0;
      this.domVideoButton._hoverTime = 0;
    }
    this.isVerticalVideo = properties.viewportWidth <= 560;

    if (!this.video) {
      this.video = document.createElement("video");
      this.video.muted = !0;
      this.video.playsinline = !0;
      this.video.setAttribute("playsinline", "");
      settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH &&
        (this.video.crossOrigin = "anonymous");
      this.video.src =
        settings.TEXTURE_PATH +
        (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4");
      this.video.loop = !0;
      this.video.load();
      this.videoTexture = new VideoTexture(this.video);
    }

    if (!this.ufxMesh) {
      this.ufxMeshThumb = new UfxMesh({ refDom: this.domThumb });
      this.ufxMesh = new UfxMesh({
        refDom: this.domReelContainerInner,
        segX: 32,
        segY: 32,
        uniforms: Object.assign(
          {
            u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
            u_resolution: properties.sharedUniforms.u_resolution,
            u_texture: { value: this.videoTexture },
            u_radialCenter: { value: this.ufxMeshRadialCenter },
            u_color: { value: new Color(1716219) },
            u_showRatio: { value: 0 },
            u_aspectScale: { value: 1 },
            u_time: properties.sharedUniforms.u_time,
            u_domXYFrom: this.ufxMeshThumb.material.uniforms.u_domXY,
            u_domWHFrom: this.ufxMeshThumb.material.uniforms.u_domWH,
            u_globalRadius: properties.sharedUniforms.u_globalRadius,
          },
          blueNoise.sharedUniforms,
        ),
        vertexShader: videoVert,
        fragmentShader: videoFrag,
        depthTest: !1,
        depthWrite: !1,
        side: 2,
      });
      this.ufxMesh.renderOrder = 1e3;
    } else {
      if (this.ufxMeshThumb) this.ufxMeshThumb.refDom = this.domThumb;
      if (this.ufxMesh) this.ufxMesh.refDom = this.domReelContainerInner;
    }

    const targetContainer = (this.hostPage && this.hostPage.preUfxContainer) || (window.homePage && window.homePage.preUfxContainer);
    if (targetContainer && this.ufxMesh) {
      targetContainer.add(this.ufxMesh);
    }

    videoOverlay.preInit();
    if (!this.lineVisual) {
      this.lineVisual = new Line(0);
      this.lineVisual.preInit();
    }

    if (this.domVideoPlaceholder) {
      if (this._onVideoMeshMouseEnterBound) {
        this.domVideoPlaceholder.removeEventListener("mouseenter", this._onVideoMeshMouseEnterBound);
        this.domVideoPlaceholder.removeEventListener("mouseleave", this._onVideoMeshMouseLeaveBound);
      }
      this._onVideoMeshMouseEnterBound = this._onVideoMeshMouseEnter.bind(this);
      this._onVideoMeshMouseLeaveBound = this._onVideoMeshMouseLeave.bind(this);
      this.domVideoPlaceholder.addEventListener("mouseenter", this._onVideoMeshMouseEnterBound);
      this.domVideoPlaceholder.addEventListener("mouseleave", this._onVideoMeshMouseLeaveBound);
    }

    if (this.domVideoButton) {
      if (this._onDomVideoButtonMouseenterBound) {
        this.domVideoButton.removeEventListener("mouseenter", this._onDomVideoButtonMouseenterBound);
        this.domVideoButton.removeEventListener("mouseleave", this._onDomVideoButtonMouseleaveBound);
        this.domVideoButton.removeEventListener("click", this._onDomVideoButtonClickBound);
      }
      this._onDomVideoButtonMouseenterBound = this._onDomVideoButtonMouseenter.bind(this);
      this._onDomVideoButtonMouseleaveBound = this._onDomVideoButtonMouseleave.bind(this);
      this._onDomVideoButtonClickBound = this._onDomVideoButtonClick.bind(this);
      this.domVideoButton.addEventListener("mouseenter", this._onDomVideoButtonMouseenterBound);
      this.domVideoButton.addEventListener("mouseleave", this._onDomVideoButtonMouseleaveBound);
      this.domVideoButton.addEventListener("click", this._onDomVideoButtonClickBound);
    }

    if (!this._hasBoundClick) {
      this._hasBoundClick = !0;
      input.onClicked.add(() => {
        if (this.domVideoButton && input.hasThroughElem(this.domVideoButton, "click")) {
          this._onDomVideoButtonClick();
        }
      });
    }
  }
  init() {
    if (this.lineVisual) {
      this.lineVisual.init();
      if (this.lineVisual.mesh) {
        this.lineVisual.mesh.material.transparent = !0;
        this.lineVisual.mesh.renderOrder = 200;
      }
      if (this.lineVisual.circle) {
        this.lineVisual.circle.material.transparent = !0;
        this.lineVisual.circle.renderOrder = 200;
      }
    }
    videoOverlay.init();
    const hideSignal = (this.hostPage && this.hostPage.onHideStarted) || (window.homePage && window.homePage.onHideStarted);
    if (hideSignal && !this._hasBoundHide) {
      this._hasBoundHide = !0;
      hideSignal.add(this._onPageHideStarted.bind(this));
    }
  }
  _onPageHideStarted() {
    (this.video.paused || this.video.pause(),
      (this.domDescription.style.transform = "translate3d(0, 0, 0)"));
  }
  resize(e, t) {
    let r = e <= 560;
    this._splitText();
    let n = this.domVideoContainer.getBoundingClientRect().width,
      a,
      l = 0,
      c = 1;
    if (r) a = (n / 3) * 4;
    else {
      let u = document
          .getElementById("header-container")
          .getBoundingClientRect().bottom,
        f = properties.viewportHeight - u,
        p =
          Math.abs(
            parseFloat(
              window.getComputedStyle(this.domVideoContainerDecoration).top,
            ) * 3,
          ) / 2;
      ((f -= p * 2),
        (a = Math.min(f, n / 2)),
        (l = -properties.viewportHeight * 0.5 + f * 0.5 + u + p),
        (c = a / ((n / 1920) * 960)));
    }
    ((this.domVideoContainer.style.height = a + "px"),
      (this.domVideoContainer.style.marginTop = l + "px"),
      scrollManager.resize(properties.viewportWidth, properties.viewportHeight),
      this.ufxMeshThumb.syncDom(-scrollManager.scrollPixel),
      this.ufxMesh.syncDom(-scrollManager.scrollPixel),
      (this.ufxMesh.material.uniforms.u_aspectScale.value = c),
      this.lineVisual.resize(e, t),
      (this.domVideoButton._width =
        12 * parseFloat(getComputedStyle(document.documentElement).fontSize)),
      (this.videoPlaceholderHeight =
        this.domVideoPlaceholder.getBoundingClientRect().height),
      (this.domTitleLine1._paddingLeft = Number(
        getComputedStyle(this.domTitleLine1).paddingLeft.split("px")[0],
      )),
      (this.domVideoContainer.style.transform = "translateZ(0)"),
      (this.domVideoContainerDecorationTop._svgWrapper._width =
        this.domVideoContainerDecorationTop._svgWrapper.getBoundingClientRect().width),
      this.isVerticalVideo !== r &&
        ((this.isVerticalVideo = r),
        (this.video.src =
          settings.TEXTURE_PATH +
          (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4"))));
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer),
      r = t.isActive;
    this.lineVisual.update(e, t);
    let n = properties.viewportWidth <= 812,
      a = scrollManager.getDomRange(this.domReelContainer),
      l = scrollManager.getDomRange(this.domReelContainerInner),
      c = n
        ? 0
        : scrollManager.getEaseInOutOffset(
            scrollManager.scrollPixel -
              a.top +
              (properties.viewportHeight - l.height) * 0.5,
            properties.viewportHeight,
            1,
            0,
          ),
      u = scrollManager.getDomRange(this.domThumb),
      f = n ? l.isActive : u.showScreenOffset > 0 && l.hideScreenOffset < 1;
    const targetC = (this.hostPage && this.hostPage.preUfxContainer) || (window.homePage && window.homePage.preUfxContainer);
    if (targetC && this.lineVisual?.container) {
      targetC.add(this.lineVisual.container);
    }
    if (this.domVideoContainer) {
      if (f) this.domVideoContainer.classList.add("--is-visible");
      else this.domVideoContainer.classList.remove("--is-visible");
    }
    if (f) {
      let p = u.top - (properties.viewportHeight - u.height) * 0.5,
        g = a.top - (properties.viewportHeight - a.height) * 0.5,
        v = Math.max(
          0,
          u.showScreenOffset * properties.viewportHeight -
            properties.viewportHeight * 0.5 -
            u.height * 0.5,
        );
      (this.ufxMeshThumb.update(-scrollManager.scrollPixel + v),
        this.ufxMesh.update(-scrollManager.scrollPixel + c),
        (this.ufxMesh.visible = !0),
        (this.ufxMesh.visible = r),
        (this.hoverRatio = math.saturate(
          this.hoverRatio + 4 * e * (this.isUfxMeshHover ? 1 : -1),
        )));
      let _ = input.mousePixelXY.x,
        T = input.mousePixelXY.y + scrollManager.scrollPixel,
        M = this.ufxMesh._domX,
        S = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY,
        b = this.ufxMesh._domWidth,
        C = this.ufxMesh._domHeight;
      this.ufxMeshRadialCenter.set((_ - M) / b, 1 - (T - S) / C);
      let w = math.fit(scrollManager.scrollPixel, p, g, 0, 1);
      ((this.videoPlaceholderRatio = w),
        (this.showVideoPlaceholderButton = w > 0.9),
        (this.ufxMesh.material.uniforms.u_showRatio.value = n ? 1 : w),
        w === 1
          ? ((this.domVideoTitle._animating = !0),
            (this.domVideoTitle._showAnimating = !0))
          : ((this.domVideoTitle._showAnimating = !1),
            (this.domVideoTitle._animating = !1)),
        (this.domVideoContainer.style.transform = `translate3d(0,${c}px,0)`),
        !properties.useMobileLayout &&
          w % 1 > 0 &&
          (properties.autoScrollSpeed = input.lastScrollYDirection),
        this.video.paused && this.video.play());
    } else
      ((this.ufxMesh.visible = !1), this.video.paused || this.video.pause());
    (t.screenRatio === -1 && this._reset(),
      r ? this._updateUI(e, a, t) : (this._needsReset = !0));
  }
  _updateUI(e, t, r) {
    let n = scrollManager.getDomRange(this.domTitle),
      a = scrollManager.getDomRange(this.domContent);
    if (
      ((this.domTitle._time = math.clamp(
        this.domTitle._time + (this.domTitle._animating ? e : -e),
        0,
        2,
      )),
      (this.domDescription._time = math.clamp(
        this.domDescription._time + (this.domDescription._animating ? e : -e),
        0,
        2,
      )),
      (this.domBtn._ratio = math.saturate(
        this.domBtn._ratio + (this.domBtn._animating ? e : -e),
      )),
      this.videoPlaceholderRatio !== 1 && (this.domVideoButton._hover = !1),
      (this.domVideoButton._ratio = math.fit(
        this.videoPlaceholderRatio,
        0.3,
        1,
        0,
        1,
      )),
      (this.domVideoButton._active = this.domVideoButton._ratio === 1),
      (this.domVideoButton._time = math.clamp(
        this.domVideoButton._time + (t.screenRatio > -1 ? e : -e),
        0,
        1 / 0,
      )),
      (this.domVideoButton._hoverRatio = math.saturate(
        this.domVideoButton._hoverRatio + (this.domVideoButton._hover ? e : -e),
      )),
      (this.domVideoButton._hoverRatio2 = math.saturate(
        this.domVideoButton._hoverRatio2 +
          (this.domVideoButton._hover ? e * 1.5 : -e * 1.5),
      )),
      (this.domVideoButton._hoverRatio3 = math.saturate(
        this.domVideoButton._hoverRatio3 +
          (this.domVideoButton._hover ? e * 3 : -e * 3),
      )),
      (this.domVideoButton._hoverTime = math.clamp(
        this.domVideoButton._hoverTime +
          (this.domVideoButton._hover ? e * 2 : -e * 0),
        0,
        1 / 0,
      )),
      (this.domVideoContainerDecorationTop._time = math.clamp(
        this.domVideoContainerDecorationTop._time +
          (this.domVideoContainerDecorationTop._animating ? e : -e * 2),
        0,
        1.4,
      )),
      (this.domVideoContainerDecorationBottom._time = math.clamp(
        this.domVideoContainerDecorationBottom._time +
          (this.domVideoContainerDecorationBottom._animating ? e : -e * 2),
        0,
        1.4,
      )),
      !properties.useMobileLayout)
    ) {
      ((this.domVideoButton.style.opacity = ease.expoInOut(
        this.domVideoButton._ratio,
      )),
        (this.domVideoButton.style.transform = `scale(${ease.expoInOut(this.domVideoButton._ratio) + 0.1 * ease.expoInOut(this.domVideoButton._hoverRatio3)})`),
        (this.domVideoButton.style.display =
          this.domVideoButton._ratio > 0 ? "flex" : "none"),
        this.domVideoButton._ratio === 1
          ? ((this.domVideoContainerDecorationTop._animating = !0),
            (this.domVideoContainerDecorationBottom._animating = !0))
          : ((this.domVideoContainerDecorationTop._animating = !1),
            (this.domVideoContainerDecorationBottom._animating = !1)));
      for (
        let f = 0;
        f < this.domVideoContainerDecorationTop._crosses.length;
        f++
      ) {
        let p = this.domVideoContainerDecorationTop._crosses[f],
          g = math.fit(
            this.domVideoContainerDecorationTop._time - f / 10,
            0,
            0.6,
            0,
            1,
            ease.lusion,
          ),
          v = math.fit(
            this.domVideoContainerDecorationTop._time - f / 10,
            0,
            0.6,
            0,
            180,
            ease.lusion,
          ),
          _ = math.fit(
            this.domVideoButton._hoverRatio2 - f / 10,
            0,
            0.7,
            0,
            1,
            ease.expoInOut,
          );
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
      for (
        let f = 0;
        f < this.domVideoContainerDecorationBottom._crosses.length;
        f++
      ) {
        let p = this.domVideoContainerDecorationBottom._crosses[f],
          g = math.fit(
            this.domVideoContainerDecorationBottom._time - f / 10,
            0,
            0.6,
            0,
            1,
            ease.lusion,
          ),
          v = math.fit(
            this.domVideoContainerDecorationBottom._time - f / 10,
            0,
            0.6,
            0,
            180,
            ease.lusion,
          ),
          _ = math.fit(
            this.domVideoButton._hoverRatio2 - f / 10,
            0,
            0.7,
            0,
            1,
            ease.expoInOut,
          );
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
    }
    for (let f = 0; f < this.domVideoContainerDecorationTop._svgs.length; f++) {
      let p = this.domVideoContainerDecorationTop._svgs[f],
        g =
          properties.viewportWidth >= settings.MOBILE_WIDTH
            ? math.fit(
                this.domVideoButton._hoverRatio2 - f / 25,
                0.2,
                1,
                1.2,
                0,
                ease.expoInOut,
              )
            : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    for (
      let f = 0;
      f < this.domVideoContainerDecorationBottom._svgs.length;
      f++
    ) {
      let p = this.domVideoContainerDecorationBottom._svgs[f],
        g =
          properties.viewportWidth >= settings.MOBILE_WIDTH
            ? math.fit(
                this.domVideoButton._hoverRatio2 - f / 25,
                0.2,
                1,
                1.2,
                0,
                ease.expoInOut,
              )
            : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    let l =
        properties.viewportWidth < settings.MOBILE_WIDTH
          ? this.domVideoButton._time
          : this.domVideoButton._hoverTime,
      c = math.fit(
        l % 15,
        0,
        15,
        0,
        -this.domVideoContainerDecorationTop._svgWrapper._width / 2,
      );
    ((this.domVideoContainerDecorationTop._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`),
      (c = math.fit(
        l % 15,
        0,
        15,
        -this.domVideoContainerDecorationTop._svgWrapper._width / 2,
        0,
      )),
      (this.domVideoContainerDecorationBottom._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`));
    let u = properties.viewportHeight * 0.1;
    if (
      ((this.domTitleInner.style.transform = "translateZ(0)"),
      n.screenRatio > -1)
    ) {
      if (((this.domTitle._animating = !0), !properties.useMobileLayout)) {
        ((this.domVideoTitle._time = math.clamp(
          this.domVideoTitle._time + (this.domVideoTitle._animating ? e : -e),
          0,
          1 / 0,
        )),
          (this.domVideoTitle._showTime = Math.min(
            this.domVideoButton._ratio,
            math.saturate(
              this.domVideoTitle._showTime +
                (this.domVideoTitle._showAnimating ? e : -e),
            ),
          )),
          (this.domVideoTitle._hoverTime = math.saturate(
            this.domVideoTitle._hoverTime +
              (this.domVideoTitle._hover && this.domVideoTitle._time > 1
                ? e * 1.5
                : -e * 1.5),
          )),
          (this.currRollupTime =
            this.domVideoTitle._time % this.ROLLUP_ANIMATION_INTERVAL));
        for (let p = 0; p < this.domVideoTitle._splitted.words.length; p++) {
          let g = this.domVideoTitle._splitted.words[p];
          this.prevRollupTime - this.currRollupTime >
            this.ROLLUP_ANIMATION_INTERVAL - 1 &&
            (g._randCharIndex = Math.round(
              Math.random() * (g._chars.length - 1),
            ));
          for (let v = 0; v < g._chars.length; v++) {
            let _ = g._chars[v],
              T = math.fit(
                this.domVideoTitle._showTime - p / 4 - v / 20,
                0,
                0.6,
                200,
                0,
                ease.lusion,
              );
            (v === g._randCharIndex &&
              (T += math.fit(
                this.currRollupTime - p / 10,
                0.5,
                1.3,
                0,
                -100,
                ease.lusion,
              )),
              (_._wrapper.style.transform = `translate3d(0, ${T}%, 0)`));
          }
        }
        for (let p = 0, g = this.domTitle._splitted.words.length; p < g; p++) {
          let v = this.domTitle._splitted.words[p],
            _,
            T;
          (p < 2
            ? ((_ = math.fit(
                this.domTitle._time - Math.abs(2 - p) / 10,
                0.5,
                1.2,
                -this.domTitleLine1._paddingLeft,
                0,
                ease.lusion,
              )),
              (T = math.fit(
                this.domTitle._time - p / 10,
                0,
                1,
                100,
                0,
                ease.lusion,
              )))
            : ((_ = 0),
              (T = math.fit(
                this.domTitle._time - p / 10,
                0,
                1,
                -100,
                0,
                ease.lusion,
              ))),
            (v.style.transform = `translate3d(${_}px, ${T}%, 0)`));
        }
      }
      let f = n.showScreenOffset * -u * 0.5;
      ((this.domTitleInner.style.transform = "translate3d(0," + f + "px,0)"),
        (this.prevRollupTime = this.currRollupTime));
    }
    if (a.screenRatio > -1) {
      let f = a.showScreenOffset * -u * 1.5;
      ((this.domDescription.style.transform = "translate3d(0," + f + "px,0)"),
        (this.domDescription._animating = !0),
        properties.useMobileLayout ||
          this.domDescription._splitted.words.forEach((g, v) => {
            let _ = math.fit(
                this.domDescription._time - v / 100,
                0,
                1,
                0.1,
                1,
                ease.expoOut,
              ),
              T = math.fit(
                this.domDescription._time - v / 100,
                0,
                1,
                100,
                0,
                ease.expoOut,
              );
            ((g.style.opacity = _),
              (g.style.transform = `translate3d(0, ${T}%, 0)`));
          }),
        (this.domBtn._animating = !0));
      let p = a.showScreenOffset * -u * 1.25;
      properties.viewportWidth >= 812
        ? ((this.domBtn.style.transform = `translateY(${p}px)translate3d(0, ${math.fit(this.domBtn._ratio, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domBtn._ratio, 0, 1, 10, 0, ease.lusion)}deg)`),
          (this.domBtn.style.opacity = ease.lusion(this.domBtn._ratio)))
        : (this.domBtn.style.transform = `translateY(${p}px)`);
    }
  }
  _onDomVideoButtonClick() {
    videoOverlay.initAndPlayVideo(VIDEO_LIST.MAIN_VIDEO_REEL);
  }
  _onDomVideoButtonMouseenter() {
    ((this.domVideoButton._hover = !0),
      this.domVideoContainerDecorationBottom.classList.add("--is-active"),
      this.domVideoContainerDecorationTop.classList.add("--is-active"));
  }
  _onDomVideoButtonMouseleave() {
    ((this.domVideoButton._hover = !1),
      this.domVideoContainerDecorationBottom.classList.remove("--is-active"),
      this.domVideoContainerDecorationTop.classList.remove("--is-active"));
  }
  _onVideoMeshMouseEnter() {
    this.isUfxMeshHover = !0;
  }
  _onVideoMeshMouseLeave() {
    this.isUfxMeshHover = !1;
  }
  _splitText() {
    this.domDescription?._splitted?.revert?.();
    this.domTitle?._splitted?.revert?.();
    this.domVideoTitle?._splitted?.revert?.();
    if (properties.viewportWidth >= 812) {
      ((this.domDescription._splitted = new SplitType(this.domDescription, {
        types: "words",
      })),
        (this.domTitle._splitted = new SplitType(this.domTitleInner, {
          types: "words",
        })),
        (this.domTitleLine1 = document.getElementById(
          "home-reel-title-line-1",
        )),
        (this.domVideoTitle._splitted = new SplitType(this.domVideoTitle, {
          types: "words",
          wordClass: "home-reel-video-title-word",
        })));
      for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
        let t = this.domVideoTitle._splitted.words[e],
          r = new SplitType(t, { types: "chars" });
        t._chars = r.chars;
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
  }
  _reset() {
    if (this.domDescription._splitted) {
      if (
        ((this._needsReset = !1),
        (this.domTitle._time = 0),
        (this.domTitle._animating = !1),
        (this.domDescription._time = 0),
        (this.domDescription._animating = !1),
        (this.domVideoButton._active = !1),
        (this.domVideoButton._ratio = 0),
        (this.domVideoButton._hover = !1),
        (this.domVideoButton._hoverTime = 0),
        (this.domVideoButton._hoverRatio = 0),
        (this.domVideoButton._hoverRatio2 = 0),
        (this.domVideoButton._hoverRatio3 = 0),
        (this.domBtn._animating = !1),
        (this.domBtn._ratio = 0),
        (this.domVideoContainerDecorationTop._animating = !1),
        (this.domVideoContainerDecorationTop._time = 0),
        properties.useMobileLayout)
      )
        (this.domDescription._splitted &&
          this.domDescription._splitted.revert(),
          this.domTitle._splitted && this.domTitle._splitted.revert());
      else {
        (this.domDescription._splitted.words.forEach((e) => {
          ((e.style.transform = "translate3d(0, 100%, 0)"),
            (e.style.opacity = 0));
        }),
          this.domTitle._splitted.words.forEach((e) => {
            e.style.transform = "translate3d(0, 100%, 0)";
          }));
        for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
          let t = this.domVideoTitle._splitted.words[e];
          for (let r = 0; r < t._chars.length; r++) {
            let n = t._chars[r];
            ((n._wrapper.style.transform = "translate3d(0, 0, 0)"),
              (n.style.transform = "translate3d(0, 0, 0)"));
          }
        }
      }
      ((this.domVideoTitle._animating = !1),
        (this.domVideoTitle._time = 0),
        (this.domVideoTitle._showAnimating = !1),
        (this.domVideoTitle._showTime = 0));
    }
  }
}
const homeReelSection = new HomeReelSection();

window.homeReelSection = homeReelSection;
globalThis.homeReelSection = homeReelSection;

sectionRegistry.register("#home-reel", () => homeReelSection);

export { HomeReelSection, homeReelSection, videoVert, videoFrag };
export default homeReelSection;
