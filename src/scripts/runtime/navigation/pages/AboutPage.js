const titleVert = `#define GLSLIFY 1
#ifdef IS_EDGE
attribute vec2 instancedPositionA;attribute vec2 instancedPositionB;varying vec2 v_toNode;uniform float u_radius;
#endif
uniform float u_scrollRatio;
#include <ufxVert>
varying vec2 v_uv;varying float v_ddd;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){
#ifdef IS_EDGE
bool isTop=position.y>0.;vec3 pos=vec3(isTop ? instancedPositionA : instancedPositionB,0.0);
#else
vec3 pos=position;
#endif
float lineRatio=floor(pos.y*6.)/6.;pos*=1.5;pos.x-=linearStep(lineRatio*0.4,0.56+lineRatio*0.4,u_scrollRatio)*0.5;vec3 basePos=getBasePosition(pos);vec3 screenPos=getScreenPosition(basePos);
#ifdef IS_EDGE
vec2 vAB=(instancedPositionA-instancedPositionB)*u_domWH;float angle=atan(vAB.y,vAB.x)+3.1415926*0.5;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);v_toNode=m*(position.xy*vec2(1.,step(0.5,abs(position.y))));screenPos.xy+=v_toNode*u_radius;
#endif
gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv*0.002);}`,
  titleFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform sampler2D u_gradientTexture;uniform vec2 u_screenPaintTextureSize;uniform vec2 u_resolution;uniform float u_time;uniform float u_invertRatio;uniform sampler2D u_texture;varying vec2 v_uv;
#ifdef IS_EDGE
varying vec2 v_toNode;
#endif
#include <getBlueNoise>
#include <textureBicubic>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(38.,27.));vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec4 screenPaintData=textureBicubic(u_screenPaintTexture,screenPaintUv,u_screenPaintTextureSize);float timeOffset=u_time;
#ifdef IS_EDGE
timeOffset+=3.1415926;
#endif
float d=cos((screenPaintUv.x+screenPaintUv.y)*4.+timeOffset)*0.5+0.5;float screenPaintStrength=1.;float constantStrength=0.;float alpha=1.0;
#ifdef IS_EDGE
vec2 toNode=v_toNode;float toNodeDist=length(toNode);alpha=smoothstep(1.0+fwidth(toNodeDist),1.0,toNodeDist);screenPaintStrength=4.;vec3 baseColor=vec3(0.004+d*d*0.15);constantStrength=max(0.,d*2.-1.)*0.15;
#else
vec3 baseColor=vec3(0.004+d*d*0.015);
#endif
float hue=(screenPaintData.x+screenPaintData.y)*1.5+d*2.;vec3 color=mix(baseColor,texture2D(u_gradientTexture,vec2(hue,0.0)).rgb,max(screenPaintData.z,screenPaintData.w)*screenPaintStrength+constantStrength)+noise.x*0.004;gl_FragColor=vec4(mix(color,1.-color,u_invertRatio),alpha);}`;
globalThis.titleVert = titleVert;
globalThis.titleFrag = titleFrag;

/**
 * About Page Controller & Subsections
 */
class WhoSubsectionWeAre {
  domContainer;
  domScroll;
  domLeftTexts;
  logoHideRatio = 0;
  preInit(e) {
    ((this.domContainer = e.querySelector("#about-who-subsection-we-are")),
      (this.domScroll = e.querySelector("#about-who-title-main-scroll")),
      (this.domLeftTexts = e.querySelectorAll(
        "#about-who-title-left-1, #about-who-title-left-2 svg, #about-who-title-left-3, #about-who-title-left-4 span",
      )),
      (this.domRightTexts = e.querySelectorAll(".about-who-title-right-text")),
      aboutWhoLogo.preInit(e));
  }
  init() {
    aboutWhoLogo.init();
  }
  show() {}
  hide() {}
  resize(e, t) {
    ((this.offsetUnitSize = Math.max(60, properties.viewportWidth * 0.08)),
      aboutWhoLogo.resize(e, t));
  }
  update(e, t, r, n, a) {
    if (
      ((this.domContainer.style.visibility = t ? "visible" : "hidden"),
      (this.domContainer.style.opacity = t ? 1 : 0),
      (aboutWhoLogo.container.visible = t),
      t)
    ) {
      let l = properties.useMobileLayout ? properties.viewportWidth * -r : 0;
      this.domContainer.style.transform = "translate3d(" + l + "px, 0, 0)";
      let c = aboutHero.introRatio < 0.05;
      this.logoHideRatio = math.saturate(this.logoHideRatio + e * (c ? -1 : 1));
      let u = this.offsetUnitSize;
      aboutWhoLogo._pageScrollOffsetXRatio = 0;
      for (let p = 0; p < this.domLeftTexts.length; p++) {
        let g = this.domLeftTexts[p],
          _ =
            (!properties.useMobileLayout && p == 5 ? 4 : p) /
            (this.domLeftTexts.length - 1),
          T = math.fit(this.logoHideRatio, _ * 0.2, _ * 0.2 + 0.8, 0, 1),
          M = math.fit(r, 0, _ * 0.5 + 0.3, 0, -10, ease.cubicOut);
        ((g._pageScrollOffsetXRatio = M),
          properties.useMobileLayout || p != 1
            ? ((T = math.fit(T, 0.35, 1, 0, 1, ease.cubicOut)),
              (g.style.opacity = T),
              (g.style.transform =
                "translate3d(" + ((1 - T) * 1 + M) * u + "px, 0, 0)"),
              p == 1 && (aboutWhoLogo.hideRatio = this.logoHideRatio))
            : ((aboutWhoLogo.hideRatio = T),
              (aboutWhoLogo._pageScrollOffsetXRatio = M)));
      }
      for (let p = 0; p < this.domRightTexts.length; p++) {
        let g = this.domRightTexts[p],
          v = p / (this.domRightTexts.length - 1),
          _ = math.fit(
            this.logoHideRatio,
            0.5 + v * 0.1,
            v * 0.1 + 0.9,
            0,
            1,
            ease.cubicOut,
          ),
          T = math.fit(r, 0.35, v * 0.5 + 1.35, 0, -5, ease.cubicOut);
        ((g.style.opacity = _),
          (g.style.transform =
            "translate3d(" + ((1 - _) * 1 + T) * u + "px, 0, 0)"));
      }
      let f = math.fit(this.logoHideRatio, 0, 0.35, 1, 0, ease.cubicInOut);
      ((this.domScroll.style.opacity = f),
        properties.useMobileLayout
          ? (this.domScroll.style.transform =
              "translate3d(50%, " + (1 - f) * 120 + "%, 0)")
          : (this.domScroll.style.transform =
              "translate3d(0, " + (1 - f) * 120 + "%, 0)"),
        aboutWhoLogo.update(
          e,
          -r * properties.viewportWidth +
            aboutWhoLogo._pageScrollOffsetXRatio * u,
          -scrollManager.scrollPixel + a,
          aboutWhoLogo._pageScrollOffsetXRatio * u,
          this.domLeftTexts[1]._pageScrollOffsetXRatio * u,
        ));
    }
  }
}
const whoSubsectionWeAre = new WhoSubsectionWeAre();
class WhoSubsectionDetails {
  domContainer;
  activeFaceId = -1;
  domTopWords;
  domBottomWords;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-details");
    let t = this.domContainer.querySelector("#about-who-desc-top"),
      r = this.domContainer.querySelector("#about-who-desc-bottom");
    ((this.domTopWords = this._parseDomText(t)),
      (this.domBottomWords = this._parseDomText(r)));
  }
  _parseDomText(e) {
    let t = e.querySelectorAll("span");
    for (let r = 0; r < t.length; r++) {
      let n = t[r],
        a = t[r].innerHTML.split(" ");
      n.innerHTML = "<span>" + a.join("</span><span>") + "</span>";
    }
    return e.querySelectorAll("span span");
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    let r;
    r = this.domTopWords;
    let n = 1 / 0,
      a = -1;
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      ((c.style.transform = "translateZ(0)"), (c.style.opacity = 1));
      let u = c.getBoundingClientRect().left;
      (u <= n && a++, (n = u + 1), (c._line = a));
    }
    ((this.domTopWords._lineCount = a + 1),
      (r = this.domBottomWords),
      (n = 1 / 0),
      (a = -1));
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      ((c.style.transform = "translateZ(0)"), (c.style.opacity = 1));
      let u = c.getBoundingClientRect().right;
      (u <= n && a++, (n = u + 1), (c._line = a));
    }
    this.domBottomWords._lineCount = a + 1;
  }
  update(e, t, r) {
    if (((this.domContainer.style.visibility = t ? "visible" : "hidden"), t)) {
      let n = 0;
      if (properties.useMobileLayout)
        n = math.fit(r, -0.75, -0.25, 0, 1) * math.fit(r, 0.25, 0.5, 1, 0);
      else {
        n = 1;
        let a, l;
        ((a = this.domTopWords), (l = a._lineCount));
        for (let c = 0; c < a.length; c++) {
          let u = a[c],
            f = u._line / l,
            p = c / a.length,
            g = math.fit(r, -1 + f * 0.5, -0.1, 0, 1),
            v = math.fit(r, -1 + p * 0.5, -0.1, 0, 1),
            _ = math.fit(r, 0.1, 0.5 + f * 0.5, 0, 1),
            T = math.fit(r, 0.1, 0.5 + p * 0.5, 0, 1);
          ((u.style.transform =
            "translate3d(" +
            (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) +
            "em, 0, 0) translate3d(" +
            (math.fit(r, -1, 0, -50, 0) + math.fit(r, 0.1, 1, 0, 20)) +
            "vw, 0, 0)"),
            (u.style.opacity = v * (1 - T)));
        }
        ((a = this.domBottomWords), (l = a._lineCount));
        for (let c = 0; c < a.length; c++) {
          let u = a[c],
            f = u._line / l,
            p = c / a.length,
            g = math.fit(r, -0.6 + f * 0.5, -0.1, 0, 1),
            v = math.fit(r, -0.6 + p * 0.5, -0.1, 0, 1),
            _ = math.fit(r, 0.2, 0.5 + f * 0.5, 0, 1),
            T = math.fit(r, 0.2, 0.5 + p * 0.5, 0, 1);
          ((u.style.transform =
            "translate3d(" +
            (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) +
            "em, 0, 0) translate3d(" +
            (math.fit(r, -1, 0, -20, 0) + math.fit(r, 0, 1, 0, 50)) +
            "vw, 0, 0)"),
            (u.style.opacity = v * (1 - T)));
        }
      }
      this.domContainer.style.opacity = n;
    }
  }
}
const whoSubsectionDetails = new WhoSubsectionDetails();
class TextAnimationHelper {
  setMatrixText(e, t, r = 0, n = 40, a = 2, l = 1 / 15) {
    ((e._rawTime = 0),
      (e._time = 0),
      (e._direction = 1),
      (e._prevRefreshTime = -1 / 0),
      (e._refreshRate = l),
      (e._delay = r),
      (t = t.replace(
        "<br>",
        `
`,
      )),
      (e._text = t),
      (e._letterPerSecond = n),
      (e._maxRandLetterCount = a),
      (e.textContent = ""));
  }
  resetMatrixTextTime(e) {
    ((e._rawTime = 0), (e._time = 0), (e._prevRefreshTime = -1 / 0));
  }
  updateMatrixText(e, t = properties.deltaTime) {
    if (
      ((e._rawTime += t),
      (e._time += t * e._direction),
      (e._time = math.clamp(
        e._time,
        0,
        e._delay +
          (e._text.length + e._maxRandLetterCount) / e._letterPerSecond,
      )),
      e._rawTime >= e._prevRefreshTime + e._refreshRate)
    ) {
      e._prevRefreshTime = e._rawTime;
      let r = e._text,
        n = Math.max(0, Math.floor(e._letterPerSecond * (e._time - e._delay))),
        a = Math.min(r.length, n - e._maxRandLetterCount),
        l = Math.min(r.length, n),
        c = "";
      if (n > 0) {
        c = r.substr(0, a);
        for (let u = 0; u < l - a; u++)
          c += String.fromCharCode(33 + ~~(Math.random() * 93));
        c = c.replace(
          `
`,
          "<br>",
        );
      }
      e._str != c && ((e._str = c), (e.innerHTML = c));
    }
  }
}
const textAnimationHelper = new TextAnimationHelper(),
  letterVert = `#define GLSLIFY 1
#include <ufxVert>
uniform float u_letterIdx;varying vec2 v_pixel;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_pixel=vec2(u_letterIdx*5.+1.,1.)+vec2(uv.x,1.-uv.y)*vec2(3.,4.);}`,
  letterFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_opacity;uniform float u_time;varying vec2 v_pixel;vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(vec3(floor(v_pixel),floor(u_opacity*3.)+floor(u_time+sin(u_time*3.)*1.5)));float opacity=mix(pow(rands.x,5.),0.95+rands.y*0.05,smoothstep(.75,1.,u_opacity))*u_opacity;vec2 uv=(floor(v_pixel)+.5)/vec2(210.,6.);float mask=texture2D(u_texture,uv).r;vec2 dd=abs(fract(v_pixel)-.5);float dotMask=step(max(dd.x,dd.y),.05);gl_FragColor=vec4(1.,1.,1.,max(dotMask*.3*(opacity*0.5+u_opacity*0.5),mask*opacity));}`;
class WhoSubsectionTeam {
  domContainer;
  domProgress;
  domLeftTexts;
  domLeftNamePlaceholder;
  domLeftNameText;
  domLeftJobPlaceholder;
  domLeftJobText;
  domRight;
  domIndicator;
  domIndicatorInner;
  teamDataMap = {};
  teamDataList = [];
  faceId = "edan";
  targetActiveFaceIndex = 0;
  faceIndex = 0;
  _faceIndexTween;
  facesCount = 0;
  faceIndexTimer = 0;
  containerOffsetX = 0;
  itemActiveRatio = 0;
  isForward = !0;
  wasActive = null;
  isChangable = !1;
  canSwipe = !0;
  hasSwiped = !1;
  hasSwipedOnce = !1;
  _isAnimating = !1;
  timeBaseChangeSpeed = 0.2;
  lastSwipeTime = -1;
  domCursorDirection = -1;
  domCursorActive = !1;
  domCursorActiveRatio = 0;
  domCursorRotateRatio = 0;
  domCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  faceRect = { x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0 };
  letterRect = { x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0 };
  domRightWidth = 0;
  preInit(e) {
    ((this.domContainer = e.querySelector("#about-who-subsection-team")),
      (this.domProgress = e.querySelector("#about-who-team-progress")),
      (this.domLeft = e.querySelector("#about-who-team-left")),
      (this.domLeftInfo = e.querySelector("#about-who-team-info")),
      (this.domLeftNameIcon = e.querySelector("#about-who-team-name-icon")),
      (this.domLeftNamePlaceholder = e.querySelector(
        "#about-who-team-name-placeholder",
      )),
      (this.domLeftNameText = e.querySelector("#about-who-team-name-text")),
      (this.domLeftJobPlaceholder = e.querySelector(
        "#about-who-team-job-placeholder",
      )),
      (this.domLeftJobText = e.querySelector("#about-who-team-job-text")),
      (this.domNumber = e.querySelector("#about-who-team-number")),
      (this.domTopCompass = e.querySelector("#about-who-team-top-compass")),
      (this.domBottomCompass = e.querySelector(
        "#about-who-team-bottom-compass",
      )),
      (this.domDots = e.querySelector("#about-who-team-dots")),
      (this.domLetterContainer = e.querySelector(
        "#about-who-team-letter-container",
      )),
      (this.domIndicator = this.domProgress.querySelector(
        "#about-who-team-indicator",
      )),
      (this.domIndicatorInner = this.domProgress.querySelector(
        "#about-who-team-indicator-inner",
      )),
      (this.domIndicator._prevActiveRatio = -1),
      (this.domRight = e.querySelector("#about-who-team-right")),
      (this.domTitle = e.querySelector("#about-who-team-title")),
      (this.domDesc = e.querySelector("#about-who-team-desc")),
      (this.domDescText = e.querySelector("#about-who-team-desc-text")),
      (this.domDescSquare = e.querySelector("#about-who-team-square")),
      (this.domCursor = e.querySelector("#about-who-face-cursor")),
      (this.domCursorArrow = e.querySelector("#about-who-face-cursor-arrow")),
      (this.domFaces = e.querySelector("#about-who-team-faces")),
      (this.domMobileSwipe = e.querySelector(
        "#about-who-team-left-mobile-tips",
      )),
      (this.domTeamNumber = e.querySelector(
        "#about-who-team-number-center-item",
      )),
      properties.loader.add(settings.TEAM_PATH + "team.json", {
        onLoad: (t) => {
          ((this.teamDataList = t), this._createUIElements());
          for (let r = 0; r < t.length; r++)
            ((t[r].index = r), (this.teamDataMap[t[r].id] = t[r]));
        },
      }),
      aboutHeroFaces.load(this.faceId),
      (this.letterMesh = new UfxMesh({
        uniforms: {
          u_texture: {
            value: properties.loader.add(settings.TEXTURE_PATH + "font.png", {
              minFilter: LinearFilter,
              type: "texture",
            }).content,
          },
          u_letterIdx: { value: 0 },
          u_opacity: { value: 1 },
          u_time: properties.sharedUniforms.u_time,
        },
        vertexShader: letterVert,
        fragmentShader: letterFrag,
      })),
      (this.letterMesh.visible = !1),
      aboutPage.postUfxContainer.add(this.letterMesh),
      (this._faceIndexTween = new Tween(this, () => {
        this.onTweenComplete();
      })));
  }
  init() {
    (input.onXScrolled.add(() => {
      properties.useMobileLayout &&
        this.canSwipe &&
        this.wasActive &&
        properties.time - this.lastSwipeTime > 0.5 &&
        ((this.hasSwiped = !0),
        (this.canSwipe = !1),
        (this.domCursorDirection = input.lastScrollXDirection),
        (this.lastSwipeTime = properties.time));
    }, this),
      input.onUped.add(() => {
        this.canSwipe = !0;
      }, this));
  }
  onPageShow() {
    aboutHeroFaces.showRatio = 0;
    for (let e = 0; e < this.teamDataList.length; e++) {
      let t = this.teamDataList[e].id;
      aboutHeroFaces.load(t);
    }
    ((this.facesCount = this.teamDataList.length), this.updateTeamNumberUI());
  }
  prev() {
    (this.targetActiveFaceIndex--,
      (this.isForward = !1),
      this._clearTween(),
      (this._isAnimating = !0),
      this._faceIndexTween.to(
        1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25,
        { faceIndex: this.targetActiveFaceIndex },
        ease.cubicInOut,
      ),
      this.updateTeamNumberUI());
  }
  next() {
    (this.targetActiveFaceIndex++,
      (this.isForward = !0),
      this._clearTween(),
      (this._isAnimating = !0),
      this._faceIndexTween.to(
        1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25,
        { faceIndex: this.targetActiveFaceIndex },
        ease.cubicInOut,
      ),
      this.updateTeamNumberUI());
  }
  _clearTween() {
    ((this._isAnimating = !1), this._faceIndexTween.kill());
  }
  updateTeamNumberUI() {
    const t = `${(math.mod(this.targetActiveFaceIndex, this.facesCount) + 1001).toString().substring(1)}`;
    this.domTeamNumber.innerHTML = t;
  }
  onTweenComplete() {
    (this._clearTween(),
      (this.faceIndexTimer = 0),
      this._changeFaceUIByIndex(
        math.mod(this.targetActiveFaceIndex, this.teamDataList.length),
      ));
  }
  reset() {
    (this._clearTween(),
      (this.faceIndexTimer = 0),
      (this.targetActiveFaceIndex = 0),
      (this.faceIndex = 0),
      (this.canSwipe = !0),
      (this.isForward = !0),
      this._changeFaceUIByIndex(0));
  }
  resize(e, t) {
    (this._splitText(),
      this.syncContainerOffset(),
      (this.domRightWidth = this.domRight.offsetWidth));
    let r = this.domContainer.getBoundingClientRect(),
      n = this.domFaces.getBoundingClientRect();
    this._updateRect(this.faceRect, n, r);
    let a = this.domLetterContainer.getBoundingClientRect();
    (this._updateRect(this.letterRect, a, r), this._splitText());
  }
  _updateRect(e, t, r) {
    ((e.x =
      t.left -
      aboutWhoSection.subsectionContainerOffsetX -
      this.containerOffsetX),
      (e.y =
        t.top -
        aboutWhoSection.subsectionContainerOffsetY +
        scrollManager.scrollPixel),
      (e.width = t.width),
      (e.height = t.height),
      (e.offsetX = t.left - r.left),
      (e.offsetY = t.top - r.top));
  }
  _changeFaceUIByIndex(e) {
    e = math.mod(e, this.teamDataList.length);
    let t = (this.faceId = this.teamDataList[e].id),
      r = this.teamDataMap[t].name,
      n = this.teamDataMap[t].role;
    ((this.domLeftNamePlaceholder.innerHTML = r),
      textAnimationHelper.setMatrixText(
        this.domLeftNameText,
        r,
        0,
        1,
        3,
        1 / 30,
      ),
      (this.domLeftJobPlaceholder.innerHTML = n),
      textAnimationHelper.setMatrixText(
        this.domLeftJobText,
        n,
        0,
        1,
        3,
        1 / 30,
      ));
  }
  _createUIElements() {
    if (!this.teamDataList || !this.domTopCompass || !this.domBottomCompass) return;
    let e = document.createElement("div");
    ((e.id = "about-who-team-top-compass-inner"),
      (this.topCompassInnerDiv = e));
    for (let r = 0; r < this.teamDataList.length - 4; r++)
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        (a.classList.add("about-who-team-top-compass-long"), e.append(a));
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          (c.classList.add("about-who-team-top-compass-small"), e.append(c));
        }
      }
    this.domTopCompass.append(e);
    let t = document.createElement("div");
    ((t.id = "about-who-team-bottom-compass-inner"),
      (this.bottomCompassInnerDiv = t));
    for (let r = 0; r < this.teamDataList.length - 4; r++)
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        (a.classList.add("about-who-team-bottom-compass-long"), t.append(a));
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          (c.classList.add("about-who-team-bottom-compass-small"), t.append(c));
        }
      }
    this.domBottomCompass.append(t);
    for (let r = 0; r < 11; r++) {
      let n = document.createElement("div");
      n.classList.add("about-who-team-dots-col");
      for (let a = 0; a < 3; a++) {
        let l = document.createElement("div");
        (l.classList.add("about-who-team-dot"), n.append(l));
      }
      this.domDots.append(n);
    }
    ((this.topCompassInnerDiv._width =
      this.topCompassInnerDiv.getBoundingClientRect().width -
      this.domTopCompass.getBoundingClientRect().width),
      (this.bottomCompassInnerDiv._width =
        this.bottomCompassInnerDiv.getBoundingClientRect().width -
        this.domBottomCompass.getBoundingClientRect().width));
  }
  syncContainerOffset() {
    ((this.containerOffsetX = properties.useMobileLayout
      ? 0
      : (aboutWhoSection.scrollRatio * aboutWhoSection.PAGE_DISTANCE -
          aboutWhoSection.PAGE_DISTANCE * 2) *
        properties.viewportWidth),
      (this.domContainer.style.transform =
        "translate3d(" + this.containerOffsetX + "px,0,0)"));
  }
  _splitText() {}
  preUpdate() {
    ((this.domCursor.style.display = "none"), (this.letterMesh.visible = !1));
  }
  onSwipe() {
    this.hasSwipedOnce = !0;
  }
  update(e, t, r, n, a, l) {
    let c = l > 0.5;
    ((aboutHeroFaces.showRatio = math.saturate(
      aboutHeroFaces.showRatio + (c ? e : -e) / 1.5,
    )),
      (aboutHeroFaces.isActive = aboutHeroFaces.showRatio > 0),
      (this.itemActiveRatio = math.saturate(
        this.itemActiveRatio +
          (aboutHeroFaces.isActive ? (this._isAnimating ? -2 : 2) : 0) * e,
      )),
      t && this.syncContainerOffset(),
      c && !this.hasSwipedOnce
        ? this.domMobileSwipe.classList.add("--is-active")
        : this.domMobileSwipe.classList.remove("--is-active"));
    let u =
        this.faceRect.x +
        aboutWhoSection.subsectionContainerOffsetX +
        this.containerOffsetX,
      f =
        this.faceRect.y +
        aboutWhoSection.subsectionContainerOffsetY -
        scrollManager.scrollPixel,
      p = this.faceRect.width,
      g = this.faceRect.height,
      v = input.easedMouseDynamics.default.value.x,
      _ = input.easedMouseDynamics.default.value.y,
      T = (v * 0.5 + 0.5) * properties.viewportWidth,
      M = (0.5 - _ * 0.5) * properties.viewportHeight,
      S = !1;
    if (properties.useMobileLayout) this.domCursor.style.display = "none";
    else if (
      (this.wasActive || (this.domCursorActiveRatio = 0),
      (S = c && T > u && T < u + p && M > f && M < f + g),
      (this.domCursorActiveRatio = math.saturate(
        this.domCursorActiveRatio + (S ? e : -e) * 1.5,
      )),
      (S = this.domCursorActiveRatio > 0),
      (this.domCursorDirection = T - u - p * 0.5 > 0 ? 1 : -1),
      S)
    ) {
      this.domCursor.style.display = "flex";
      let R = T - u,
        E = M + this.faceRect.offsetY - f,
        I =
          Math.min(
            2.5,
            input.easedMouseDynamics.default.valueVel.length() / 5 + 1,
          ) *
          ease.backOut(this.domCursorActiveRatio) *
          math.fit(n, 0, properties.viewportHeight, 1, 0);
      ((this.domCursor.style.transform = `translate3d(${R}px, ${E}px,0) translate3d(-50%, -50%, 0) scale(${I})`),
        (this.domCursorRotateRatio = math.saturate(
          this.domCursorRotateRatio +
            (this.domCursorDirection > 0 ? e * 3 : e * -3),
        )),
        this.domCursorExtraRotationMotion.update(
          e,
          math.clamp(
            input.easedMouseDynamics.default.valueVel.y *
              -this.domCursorDirection,
            -1,
            1,
          ),
        ));
      let F = ease.backInOut(this.domCursorRotateRatio);
      this.domCursorArrow.style.transform = `rotate(${F * 180 + this.domCursorExtraRotationMotion.value * 75}deg)`;
    } else this.domCursor.style.display = "none";
    let b = 0,
      C = 0,
      w = 0;
    if (
      (t
        ? (properties.useMobileLayout
            ? ((b = math.fit(r, -0.5, 0, 0, 1)),
              (C = math.fit(r, -0.5, 0, 0, 1) * math.fit(r, 0.5, 1, 1, 0)),
              (w = l))
            : ((b = math.fit(r, -0.5, -0.2, 0, 1)),
              (C = math.fit(r, -0.4, -0.1, 0, 1)),
              (w = math.fit(r, -0.3, 0, 0, 1))),
          (this.domTitle.style.opacity = b),
          (this.domDesc.style.opacity = C),
          (this.domLeft.style.opacity = w),
          (this.domLeft.style.visibility = "visible"),
          (this.domTitle.style.visibility = "visible"),
          (this.domDesc.style.visibility = "visible"),
          this.letterMesh.syncRect(
            this.letterRect.x +
              aboutWhoSection.subsectionContainerOffsetX +
              this.containerOffsetX,
            this.letterRect.y +
              aboutWhoSection.subsectionContainerOffsetY -
              scrollManager.scrollPixel,
            this.letterRect.width,
            this.letterRect.height,
          ),
          this.letterMesh.update(),
          (this.letterMesh.visible = !0))
        : ((this.domLeft.style.visibility = "hidden"),
          (this.domTitle.style.visibility = "hidden"),
          (this.domDesc.style.visibility = "hidden")),
      this.teamDataList.length)
    )
      if (t) {
        (this.wasActive || this.reset(),
          properties.useMobileLayout ||
            (aboutHero.properties.cameraViewportOffsetX =
              (properties.viewportWidth / 2 -
                (properties.viewportWidth - this.domRightWidth) / 2) *
              math.fit(
                r,
                -aboutWhoSection.PAGE_DISTANCE,
                0,
                0,
                1,
                ease.cubicInOut,
              )));
        let R = this.hasSwiped && c;
        ((R || (S && input.justClicked)) &&
          (audios.countPlay("click"),
          this.domCursorDirection == 1 ? this.next() : this.prev()),
          R && this.onSwipe());
        let E = this.faceIndexTimer;
        ((this.faceIndexTimer = Math.min(
          1,
          this.faceIndexTimer +
            e * this.timeBaseChangeSpeed * (this._isAnimating ? 0 : 1),
        )),
          E < 1 &&
            this.faceIndexTimer >= 1 &&
            (this.isForward ? this.next() : this.prev()));
        let I = Math.floor(math.mod(this.faceIndex, this.teamDataList.length)),
          F = math.mod(I + 1, this.teamDataList.length),
          k = this.faceIndex - Math.floor(this.faceIndex);
        ((aboutHeroFaces.currId = this.teamDataList[I].id),
          (aboutHeroFaces.nextId = this.teamDataList[F].id),
          (aboutHeroFaces.transitionRatio = k));
        let L = this.domIndicatorInner;
        ((L.style.transform = "scaleX(" + this.faceIndexTimer + ")"),
          (this.domIndicator.style.transform =
            "scaleX(" + ease.expoInOut(this.itemActiveRatio) + ")"));
        let D =
          this.itemActiveRatio > 0.95
            ? 1
            : (Math.cos(this.itemActiveRatio * 17.213) * 0.5 + 0.5) *
              Math.pow(this.itemActiveRatio, 0.25);
        ((this.domLeftNameIcon.style.opacity = D),
          (this.domLeftNameText._direction = this.domLeftJobText._direction =
            this._isAnimating ? -1 : 1),
          (this.domLeftNameText._letterPerSecond =
            this.domLeftJobText._letterPerSecond =
              this._isAnimating ? 60 : 30),
          textAnimationHelper.updateMatrixText(this.domLeftNameText),
          textAnimationHelper.updateMatrixText(this.domLeftJobText),
          (this.letterMesh.material.uniforms.u_letterIdx.value =
            aboutHeroFaces.currId.substring(0, 1).toUpperCase().charCodeAt(0) -
            65),
          (this.letterMesh.material.uniforms.u_opacity.value = w * D));
      } else this._clearTween();
    ((this.wasActive = t), (this.hasSwiped = !1));
  }
}
const whoSubsectionTeam = new WhoSubsectionTeam();
class AboutWhoSection {
  domContainer;
  activeFaceId = -1;
  scrollRatio = 0;
  subsectionContainerOffsetY = 0;
  subsectionContainerOffsetX = 0;
  RANGE_START_WAIT = 3.5;
  RANGE_PAGE_12 = 1.75;
  RANGE_PAGE_23 = 1.75;
  RANGE_PAGE_34 = 1.75;
  RANGE_END_WAIT = 2.5;
  PAGE_DISTANCE = 1.25;
  THRESHOLDS = [];
  MOBILE_THRESHOLDS = [];
  preInit(e) {
    ((this.domContainer = e.querySelector("#about-who")),
      (this.domSubsectionContainer = e.querySelector(
        "#about-who-subsection-container",
      )),
      (this.domCrosses = e.querySelector("#about-crosses ")));
    let t = 0,
      r = 0;
    (this.THRESHOLDS.push((t += this.RANGE_START_WAIT)),
      this.THRESHOLDS.push((t += this.RANGE_PAGE_12)),
      this.THRESHOLDS.push((t += this.RANGE_PAGE_23)),
      (r = t),
      this.MOBILE_THRESHOLDS.push.apply(
        this.MOBILE_THRESHOLDS,
        this.THRESHOLDS,
      ),
      this.THRESHOLDS.push((t += this.RANGE_END_WAIT)),
      this.MOBILE_THRESHOLDS.push((r += this.RANGE_PAGE_34)),
      this.MOBILE_THRESHOLDS.push((r += this.RANGE_END_WAIT)),
      whoSubsectionWeAre.preInit(e),
      whoSubsectionDetails.preInit(e),
      whoSubsectionTeam.preInit(e),
      aboutHero.preInit(),
      visuals.stage3DList.push(aboutHero));
  }
  init() {
    (whoSubsectionWeAre.init(),
      whoSubsectionDetails.init(),
      whoSubsectionTeam.init(),
      aboutHero.init());
  }
  resize(e, t) {
    (this.syncSubsectionContainerTransform(),
      whoSubsectionWeAre.resize(e, t),
      whoSubsectionDetails.resize(e, t),
      whoSubsectionTeam.resize(e, t),
      aboutHero.resize(properties.width, properties.height));
  }
  show() {
    ((aboutWhoLogo.hideRatio = 0), whoSubsectionTeam.onPageShow());
  }
  getMoveRatio() {
    return (
      -scrollManager.getDomRange(this.domContainer).screenY /
      (properties.useMobileLayout
        ? properties.viewportHeight
        : properties.viewportWidth)
    );
  }
  getScrollRatio() {
    let e = properties.useMobileLayout
        ? this.MOBILE_THRESHOLDS
        : this.THRESHOLDS,
      t = this.getMoveRatio(),
      r = 0;
    return (
      t < e[0]
        ? (r = 0)
        : t < e[1]
          ? (r = math.fit(t, e[0], e[1], 0, 1, ease.cubicInOut))
          : properties.useMobileLayout
            ? t < e[2]
              ? (r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut))
              : (r = math.fit(t, e[2], e[3], 2, 3, ease.cubicInOut))
            : (r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut)),
      (this.scrollRatio = r)
    );
  }
  syncSubsectionContainerTransform() {
    let e = properties.useMobileLayout
        ? this.MOBILE_THRESHOLDS
        : this.THRESHOLDS,
      t = properties.useMobileLayout
        ? properties.viewportHeight
        : properties.viewportWidth;
    this.scrollableSize = e[e.length - 1] * t;
    let n = scrollManager.getDomRange(this.domContainer).isActive,
      a = scrollManager.getDomRange(this.domContainer),
      l = this.getScrollRatio() * this.PAGE_DISTANCE;
    ((this.subsectionContainerOffsetY = math.fit(
      a.screenY,
      0,
      -this.scrollableSize,
      0,
      this.scrollableSize,
    )),
      properties.useMobileLayout
        ? (this.subsectionContainerOffsetX = 0)
        : (this.subsectionContainerOffsetX = l * -properties.viewportWidth),
      (this.domSubsectionContainer.style.transform =
        "translate3d(" +
        this.subsectionContainerOffsetX +
        "px," +
        this.subsectionContainerOffsetY +
        "px, 0)"),
      (this.domCrosses.style.transform =
        "translate3d(" + -this.subsectionContainerOffsetX + "px,0, 0)"),
      n || (aboutHero.isActive = !1));
  }
  update(e) {
    let t = properties.useMobileLayout
        ? this.MOBILE_THRESHOLDS
        : this.THRESHOLDS,
      r = properties.useMobileLayout
        ? properties.viewportHeight
        : properties.viewportWidth;
    this.scrollableSize = t[t.length - 1] * r;
    let a = scrollManager.getDomRange(this.domContainer).isActive,
      l = scrollManager.getDomRange(this.domContainer);
    if (
      (this.syncSubsectionContainerTransform(),
      whoSubsectionTeam.preUpdate(),
      a)
    ) {
      let c = this.getScrollRatio() * this.PAGE_DISTANCE,
        u =
          -l.screenY /
          (properties.useMobileLayout
            ? properties.viewportHeight
            : properties.viewportWidth);
      ((aboutHero.initialSplineRatio = math.fit(u, 0, t[1], 0, 1)),
        (aboutHero.hudRatio = math.fit(
          u,
          t[1],
          t[1] + this.RANGE_PAGE_23 * 0.5,
          0,
          1,
        )),
        (aboutHero.outSectionRatio = math.fit(u / t[3], 0.9, 1, 0, 1)),
        (aboutHero.properties.cameraViewportOffsetX = 0),
        (aboutHero.properties.cameraViewportOffsetY = 0),
        (aboutHero.scrollYRatio = 0),
        (aboutHero.faceShowRatio = 0),
        c < this.PAGE_DISTANCE
          ? ((aboutHero.introRatio =
              u / (this.RANGE_START_WAIT + this.RANGE_PAGE_12)),
            whoSubsectionWeAre.update(
              e,
              !0,
              c,
              u,
              this.subsectionContainerOffsetY,
            ))
          : ((aboutHero.introRatio = 1),
            whoSubsectionWeAre.update(
              e,
              !1,
              c,
              u,
              this.subsectionContainerOffsetY,
            )),
        c > 0 && c < this.PAGE_DISTANCE * 2
          ? whoSubsectionDetails.update(
              e,
              !0,
              c - this.PAGE_DISTANCE,
              this.subsectionContainerOffsetY,
            )
          : whoSubsectionDetails.update(
              e,
              !1,
              c - this.PAGE_DISTANCE,
              this.subsectionContainerOffsetY,
            ));
      let f = this.getMoveRatio();
      properties.useMobileLayout
        ? (aboutHero.panningSplineRaito = math.fit(f, t[2], t[4], 0, 1))
        : (aboutHero.panningSplineRaito = math.fit(f, t[1], t[3], 0, 1));
      let p = math.fit(
          c -
            this.PAGE_DISTANCE * 2 -
            (properties.useMobileLayout ? this.PAGE_DISTANCE : 0),
          -1,
          0,
          0,
          1,
        ),
        g = Math.max(
          0,
          scrollManager.scrollPixel - l.top - t[t.length - 1] * r,
        );
      (c >= this.PAGE_DISTANCE
        ? ((aboutHero.properties.cameraViewportOffsetY = g),
          (aboutHero.scrollYRatio = g / r),
          whoSubsectionTeam.update(
            e,
            !0,
            c - this.PAGE_DISTANCE * 2,
            g,
            this.subsectionContainerOffsetY,
            p,
          ))
        : whoSubsectionTeam.update(
            e,
            !1,
            c - this.PAGE_DISTANCE * 2,
            g,
            this.subsectionContainerOffsetY,
            p,
          ),
        (aboutHero.isActive = !0));
    } else ((aboutHero.isActive = !1), (whoSubsectionTeam.wasActive = !1));
  }
}
const aboutWhoSection = new AboutWhoSection(),
  TITLE_STAGGER = 20,
  DESCRIPTION_STAGGER = 50;
class AboutClientSection {
  _needsReset = !0;
  isSectionWasActive = !1;
  preInit(e) {
    ((this.domContainer = e.querySelector("#about-clients")),
      (this.domTitle = e.querySelector("#about-clients-title")),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      (this.domTitle._words = []),
      (this.domDesc = e.querySelector("#about-clients-desc")),
      (this.domDesc._time = 0),
      (this.domDesc._animating = !1),
      (this.domCarousel = e.querySelector("#about-clients-carousel")),
      (this.domCarouselLines = Array.from(
        this.domCarousel.querySelectorAll(".about-clients-carousel-line"),
      )),
      (this.domCarouselLinesWrapper = []));
  }
  init() {
    this._createCarousel();
  }
  resize(e, t) {
    this._splitText();
    for (let r = 0; r < this.domCarouselLines.length; r++) {
      let n = this.domCarouselLines[r],
        a = this.domCarouselLinesWrapper[r];
      a._width = n.getBoundingClientRect().width;
    }
  }
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive,
      n = scrollManager.scrollViewDelta,
      a = scrollManager.getDomRange(this.domTitle),
      l = scrollManager.getDomRange(this.domDesc);
    if (r) {
      (this._needsReset && this._reset(),
        (this.domTitle._time = math.clamp(
          this.domTitle._time + (this.domTitle._animating ? e : -e),
          0,
          1 + this.domTitle._words.length / TITLE_STAGGER,
        )),
        (this.domDesc._time = math.clamp(
          this.domDesc._time + (this.domDesc._animating ? e : -e),
          0,
          1 + this.domDesc._splitted.words.length / DESCRIPTION_STAGGER,
        )),
        a.screenRatio > -1 &&
          ((this.domTitle._animating = !0),
          properties.useMobileLayout
            ? this.domTitle._words.forEach((c) => {
                c.forEach((u) => {
                  u.style.transform = "translate3d(0, 0, 0)";
                });
              })
            : this.domTitle._words.forEach((c, u) => {
                c.forEach((f, p) => {
                  let g = math.saturate(this.domTitle._time - u / 20),
                    v = ease.expoOut(g);
                  f.style.transform = `translate3d(0, ${100 * (1 - v) - (4 - p) * 100 * v}%, 0)`;
                });
              })),
        l.screenRatio > -1 &&
          ((this.domDesc._animating = !0),
          this.domDesc._splitted.words.forEach((c, u) => {
            let f =
                properties.viewportWidth >= settings.MOBILE_WIDTH
                  ? ease.lusion(this.domDesc._time - u / DESCRIPTION_STAGGER)
                  : 1,
              p =
                properties.viewportWidth >= settings.MOBILE_WIDTH
                  ? math.fit(
                      this.domDesc._time - u / DESCRIPTION_STAGGER,
                      0,
                      1,
                      100,
                      0,
                      ease.lusion,
                    )
                  : 0;
            ((c.style.transform = `translate3d(0, ${p}%, 0)`),
              (c.style.opacity = f));
          })));
      for (let c = 0; c < this.domCarouselLinesWrapper.length; c++) {
        let u = this.domCarouselLinesWrapper[c],
          f = c % 2;
        u._time +=
          e * input.lastScrollYDirection * (100 + f * 35) + n * (100 + f * 35);
        let p = -math.loop(u._time, 0, u._width);
        u.style.transform = `translateX(${p}px)`;
      }
    } else this._needsReset = !0;
    this.isSectionWasActive = r;
  }
  _createCarousel() {
    this.domCarouselLines.forEach((e) => {
      const t = document.createElement("div");
      t.classList.add("about-clients-carousel-line-wrapper");
      const r = e.cloneNode(!0),
        n = e.cloneNode(!0);
      (t.append(r, n, e),
        this.domCarousel.append(t),
        (t._time = 0),
        this.domCarouselLinesWrapper.push(t));
    });
  }
  _splitText() {
    this.domTitle._originalHTML = this.domTitle._originalHTML || this.domTitle.innerHTML;
    this.domTitle.innerHTML = this.domTitle._originalHTML;
    ((this.domTitleWordList = []),
      (this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words",
        wordClass: "about-clients-title-word",
      })),
      this.domTitle._splitted.words.forEach((e, t) => {
        const r = [],
          n = e.parentNode,
          a = document.createElement("div");
        ((a.style.position = "relative"),
          (a.style.overflow = "hidden"),
          a.classList.add("about-clients-title-word-wrapper"),
          (a.style.display = "flex"),
          (a.style.flexDirection = "column"),
          e.remove(),
          this.domTitleWordList.push(a));
        for (let l = 0; l < 3; l++) {
          const c = e.cloneNode(!0);
          ((c.style.transform = "translate3d(0, 100%, 0)"),
            a.append(c),
            r.push(c),
            (this.domTitle._words[t] = r));
        }
        (n.append(a), e.remove());
      }),
      (this.domDesc._splitted = new SplitType(this.domDesc, {
        types: "words",
        wordClass: "about-clients-desc-text-word",
      })));
  }
  _reset() {
    this.domTitle._splitted &&
      ((this._needsReset = !1),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      this.domTitle._splitted.words.forEach((e) => {
        e.style.transform = "translate3d(0, 100%, 0)";
      }),
      (this.domDesc._time = 0),
      (this.domDesc._animating = !1),
      this.domDesc._splitted.words.forEach((e) => {
        ((e.style.transform = "translate3d(0, 100%, 0)"),
          (e.style.opacity = 0));
      }));
  }
}
const aboutClientSection = new AboutClientSection();

class AboutAwardSection {
  domContainer;
  domTitle;
  domCapabilitySectionContainer;
  offsetY = 0;
  showItemPerSecond = 10;
  _needsReset = !0;
  isSectionWasActive = !1;
  preInit(e) {
    ((this.domContainer = e.querySelector("#about-award")),
      (this.domTitle = e.querySelector("#about-award-title")),
      (this.domHeaders = Array.from(e.querySelectorAll(".about-award-header"))),
      (this.domItems = Array.from(e.querySelectorAll(".about-award-item"))));
    for (let l = 0; l < this.domHeaders.length; l++) {
      let c = this.domHeaders[l],
        u = c.querySelector(".about-award-header-title"),
        f = c.querySelector(".about-award-header-svg"),
        p = c.querySelector(".about-award-header-text");
      ((u._splitted = new SplitType(u, { types: "chars" })),
        (p._splitted = new SplitType(p, { types: "chars" })),
        (c._title = u),
        (c._svg = f),
        (c._number = p),
        (c._animating = !1),
        (c._time = 0));
    }
    for (let l = 0; l < this.domItems.length; l++) {
      let c = this.domItems[l],
        u = c.querySelector(".about-award-line"),
        f = Array.from(c.querySelectorAll(".about-award-item-wrapper"));
      ((c._animating = !1), (c._time = 0));
      for (let p = 0; p < f.length; p++) {
        let g = f[p],
          v = Array.from(g.querySelectorAll(".about-award-item-wrapper-text"));
        for (let _ = 0; _ < v.length; _++) {
          let T = v[_];
          T._splitted = new SplitType(T, { types: "words" });
        }
        g._texts = v;
      }
      ((c._line = u), (c._wrappers = f));
    }
    this.domCapabilitySectionContainer = e.querySelector("#about-capability");
    let t = svgParser.createShapes(
        svgParser.parse(this.domTitle.outerHTML).paths[0],
      ),
      r = new ShapeGeometry(t);
    r.scale(1 / 1438, 1 / 1252, 1);
    let n = this._generateEdgeIndices(r),
      a = properties.loader.add(settings.TEXTURE_PATH + "award_gradient.png", {
        type: "texture",
        minFilter: LinearFilter,
      }).content;
    ((a.wrapS = a.wrapT = RepeatWrapping),
      (this.titleEdgeMesh = new UfxMesh({
        refDom: this.domTitle,
        geometry: n,
        uniforms: Object.assign(
          {
            u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
            u_screenPaintTextureSize:
              screenPaint.sharedUniforms.u_paintTextureSize,
            u_time: properties.sharedUniforms.u_time,
            u_gradientTexture: { value: a },
            u_radius: { value: 2 },
            u_invertRatio: { value: 0 },
            u_scrollRatio: { value: 0 },
          },
          blueNoise.sharedUniforms,
        ),
        vertexShader: titleVert,
        fragmentShader: titleFrag,
      })),
      (this.titleEdgeMesh.material.defines.IS_EDGE = !0),
      aboutPage.postUfxContainer.add(this.titleEdgeMesh),
      (this.titleMesh = new UfxMesh({
        refDom: this.domTitle,
        geometry: r,
        uniforms: this.titleEdgeMesh.material.uniforms,
        vertexShader: titleVert,
        fragmentShader: titleFrag,
      })),
      (this.titleMesh.renderOrder = 1),
      aboutPage.postUfxContainer.add(this.titleMesh));
  }
  _generateEdgeIndices(e) {
    let t = {},
      r = [],
      n = [],
      a = e.attributes.position.array,
      l = e.index.array;
    for (let p = 0; p < l.length; p += 3) {
      let g = l[p],
        v = l[p + 1],
        _ = l[p + 2],
        T = g < v ? `${g}_${v}` : `${v}_${g}`,
        M = v < _ ? `${v}_${_}` : `${_}_${v}`,
        S = _ < g ? `${_}_${g}` : `${g}_${_}`;
      (t[T] ? t[T].count++ : (t[T] = { count: 1, p0: g, p1: v }),
        t[M] ? t[M].count++ : (t[M] = { count: 1, p0: v, p1: _ }),
        t[S] ? t[S].count++ : (t[S] = { count: 1, p0: _, p1: g }));
    }
    let c = 0;
    for (let p in t) {
      let g = t[p];
      g.count === 1 &&
        ((r[c] = a[g.p0 * 3]),
        (n[c] = a[g.p1 * 3]),
        c++,
        (r[c] = a[g.p0 * 3 + 1]),
        (n[c] = a[g.p1 * 3 + 1]),
        c++);
    }
    let u = new PlaneGeometry(2, 2, 1, 3),
      f = new InstancedBufferGeometry();
    return (
      (f.index = u.index),
      (f.attributes.position = u.attributes.position),
      (f.attributes.instancedPositionA = new InstancedBufferAttribute(
        new Float32Array(r),
        2,
      )),
      (f.attributes.instancedPositionB = new InstancedBufferAttribute(
        new Float32Array(n),
        2,
      )),
      f
    );
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    (this._splitText(),
      this.titleMesh.syncDom(-scrollManager.scrollPixel),
      this.titleEdgeMesh.syncDom(-scrollManager.scrollPixel),
      (this.titleEdgeMesh.material.uniforms.u_radius.value = Math.max(
        1,
        properties.viewportWidth / 1200,
      )));
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer),
      r = t.isActive;
    if (
      ((this.titleMesh.visible = r),
      (this.titleEdgeMesh.visible = r),
      this.titleMesh.visible)
    ) {
      ((this.titleMesh.material.uniforms.u_scrollRatio.value = math.fit(
        t.ratio,
        -0.75,
        0.75,
        0,
        1,
      )),
        this.titleMesh.update(-scrollManager.scrollPixel),
        this.titleEdgeMesh.update(-scrollManager.scrollPixel));
      let n = scrollManager.getDomRange(this.domCapabilitySectionContainer);
      this.titleMesh.material.uniforms.u_invertRatio.value = math.fit(
        n.screenRatio,
        -1,
        -0.75,
        0,
        1,
      );
    }
    if (r) {
      for (let n = 0; n < this.domHeaders.length; n++) {
        let a = this.domHeaders[n],
          l = scrollManager.getDomRange(a);
        (l.screenRatio > -1 ? (a._animating = !0) : (a._animating = !1),
          (a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5)),
          (a._svg.style.transform = `scale(${math.fit(a._time, 0.2, 0.6, 0, 1, ease.backOut)}) rotate(${math.fit(l.screenRatio - n / 10, -1, 1, n % 2 === 0 ? -360 : 360, 0)}deg)`));
        for (let c = 0; c < a._title._splitted.chars.length; c++) {
          let u = a._title._splitted.chars[c],
            f = math.fit(a._time - c / 25, 0, 0.7, 30, 0, ease.expoOut),
            p = math.fit(a._time - c / 25, 0, 0.7, 100, 0, ease.expoOut);
          (properties.viewportWidth < settings.MOBILE_WIDTH &&
            ((p = 0), (f = 0)),
            (u.style.transform = `translate3d(0, ${p}%, 0) rotate(${f}deg)`));
        }
        for (let c = 0; c < a._number._splitted.chars.length; c++) {
          let u = a._number._splitted.chars[c],
            f = math.fit(a._time - c / 20, 0.2, 0.9, 100, 0, ease.expoOut);
          (properties.viewportWidth < settings.MOBILE_WIDTH && (f = 0),
            (u.style.transform = `translate3d(0, ${f}%, 0)`));
        }
      }
      for (let n = 0; n < this.domItems.length; n++) {
        let a = this.domItems[n];
        (scrollManager.getDomRange(a).screenRatio > -1
          ? (a._animating = !0)
          : (a._animating = !1),
          (a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5)),
          (a._line.style.transform = `scale3d(${math.fit(a._time, 0.2, 1, 0, 1, ease.expoOut)} ,1 ,1)`));
        for (let c = 0; c < a._wrappers.length; c++) {
          let u = a._wrappers[c];
          for (let f = 0; f < u._texts.length; f++) {
            let p = u._texts[f];
            for (let g = 0; g < p._splitted.words.length; g++) {
              let v = p._splitted.words[g],
                _ = math.fit(
                  a._time - c / 10 - f / 20 - g / 50,
                  0,
                  0.8,
                  100,
                  0,
                  ease.expoOut,
                );
              (properties.viewportWidth < settings.MOBILE_WIDTH && (_ = 0),
                (v.style.transform = `translate3d(0, ${_}%, 0)`));
            }
          }
        }
      }
      this._needsReset && this._reset();
    } else this._needsReset = !0;
    this.isSectionWasActive = r;
  }
  _splitText() {}
  _reset() {
    this._needsReset = !1;
    for (let e = 0; e < this.domHeaders.length; e++) {
      let t = this.domHeaders[e];
      ((t._animating = !1), (t._time = 0));
    }
    for (let e = 0; e < this.domItems.length; e++) {
      let t = this.domItems[e],
        r = Array.from(t.querySelectorAll(".about-award-item-wrapper"));
      ((t._animating = !1), (t._time = 0));
      for (let n = 0; n < r.length; n++) {
        let a = r[n],
          l = Array.from(a.querySelectorAll(".about-award-item-wrapper-text"));
        for (let c = 0; c < l.length; c++) {
          let u = l[c];
          u._splitted = new SplitType(u, { types: "words" });
        }
        a._texts = l;
      }
    }
  }
}
const aboutAwardSection = new AboutAwardSection(),
  NUMBER_OF_CARDS = 4;
class AboutCapabilitySection {
  domContainer;
  domList;
  domLine1;
  domLine2;
  domCards;
  showItemPerSecond = 10;
  time = 0;
  _needsReset = !0;
  preInit(e) {
    if (!e) return;
    this.domContainer = e.querySelector("#about-capability");
    if (!this.domContainer) return;
    ((this.domTitle = e.querySelector("#about-capability-title")),
      (this.domSubheader = e.querySelector("#about-capability-subheader")),
      (this.domSubheaderText = e.querySelector(
        "#about-capability-subheader-text",
      )),
      (this.domSubhheaderCards = Array.from(
        e.querySelectorAll(".about-capability-subheader-card"),
      )),
      (this.domLine1 = e.querySelector("#about-capability-title-line-1")),
      (this.domLine2 = e.querySelector("#about-capability-title-line-2")),
      (this.domCardsWrapper = e.querySelector(
        "#about-capability-cards-wrapper",
      )),
      (this.domCards = e.querySelector("#about-capability-cards")),
      (this.domCardsArray = Array.from(
        this.domContainer.querySelectorAll(".about-capability-card"),
      )),
      (this.titleTime = 0),
      browser$1.isMobile ||
        ((this.lineVisual = new Line(2)),
        this.lineVisual.preInit(),
        (this.lineVisual2 = new Line(3)),
        this.lineVisual2.preInit()));
  }
  init() {
    browser$1.isMobile ||
      (this.lineVisual.init(),
      aboutPage.postUfxContainer.add(this.lineVisual.container),
      this.lineVisual2.init(),
      aboutPage.postUfxContainer.add(this.lineVisual2.container));
  }
  resize(e, t) {
    if (!this.domContainer || !this.domCards) return;
    (this._splitText(), (this.domCards.style.transform = "translateZ(0)"));
    for (let u = 0, f = this.domCardsArray.length; u < f; u++)
      this.domCardsArray[u].style = "translateZ(0)";
    let r = this.domCardsArray[0].getBoundingClientRect();
    this.domCards.style.height =
      properties.viewportWidth < 812 ? "auto" : r.height + "px";
    for (let u = 0, f = this.domCardsArray.length; u < f; u++);
    browser$1.isMobile ||
      (this.lineVisual.resize(e, t), this.lineVisual2.resize(e, t));
    let n = this.domCardsWrapper.getBoundingClientRect(),
      a = this.domCards.getBoundingClientRect(),
      l = this.domLine1.getBoundingClientRect(),
      c = this.domLine2.getBoundingClientRect();
    for (let u = 0, f = this.domCardsArray.length; u < f; u++) {
      let p = this.domCardsArray[u];
      ((p._width = r.width),
        (p._height = r.height),
        (p._offsetY = u % 2 === 0 ? 30 : -30));
    }
    ((this.domCardsWrapper._height =
      this.domCardsWrapper.offsetHeight - this.domCardsArray[0]._height),
      (this.domCardsWrapper._width = n.width),
      (this.domCardsWrapper._cardOffset =
        this.domCardsWrapper._width -
        this.domCardsArray[0]._width * NUMBER_OF_CARDS),
      (this.domCards._screenRatio = a.height / properties.viewportHeight),
      (this.domLine2._translateX = c.left - l.left),
      (this.domTitle._height = this.domTitle.getBoundingClientRect().height),
      scrollManager.resize(
        properties.viewportWidth,
        properties.viewportHeight,
      ));
  }
  update(e) {
    if (!this.domContainer || !this.domCards) return;
    let t = scrollManager.getDomRange(this.domContainer);
    ((this.isSectionActive = t.isActive),
      browser$1.isMobile ||
        (this.lineVisual.update(e, t), this.lineVisual2.update(e, t)));
    let r = scrollManager.getDomRange(this.domTitle);
    if (
      ((this.domTitle.style.visibility = this.isSectionActive
        ? "visible"
        : "hidden"),
      (this.domCards.style.transform = "translateZ(0)"),
      (properties.screenPaintOffsetRatio *=
        math.fit(t.screenRatio, -0.5, 0, 1, 0) +
        math.fit(t.screenRatio, 0.8, 1, 0, 1)),
      this.isSectionActive)
    ) {
      this._needsReset && this._reset();
      let n = math.fit(t.screenRatio, -0.6, 0.2, 0, 1),
        a = math.fit(t.screenRatio, -0.5, 0.7, 0, 1),
        l = math.fit(
          t.screenRatio,
          -0.5,
          0.7,
          -Math.PI / 2,
          Math.PI - Math.PI / 2,
        );
      if (((this.time += e), properties.viewportWidth > 812)) {
        let u = scrollManager.getDomRange(this.domCardsWrapper),
          f = scrollManager.getEaseInOutOffset(
            scrollManager.scrollPixel -
              u.top +
              (properties.viewportHeight - u.height) * 0.5,
            properties.viewportHeight * 3,
            5,
            1,
          );
        this.domCards.style.transform = `translate3d(0, ${f}px, 0)`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p],
            _ = this.domCardsWrapper._width / 2 - v._width / 2,
            T =
              (p / NUMBER_OF_CARDS) *
              (this.domCardsWrapper._width +
                this.domCardsWrapper._cardOffset / (NUMBER_OF_CARDS - 1)),
            M = math.fit(n, 0.2, 1, _, T, ease.expoOut),
            S = math.fit(
              a,
              0,
              0.7 - Math.abs(g - 1 - p) / 20,
              180,
              0,
              ease.backInOut,
            ),
            b = math.fit(
              Math.abs(math.fit(n, 0, 0.75, 0, 1) * 2 - 1),
              1,
              0,
              0,
              (p - 1.5) * 9,
              ease.expoInOut,
            ),
            C = Math.cos(this.time * 3 + p) * Math.cos(l);
          v.style.transform = `translate3d(${M}px, ${C * 10}px, 0) rotateZ(${b}deg) rotate3d(0, 1,  0, ${S}deg)`;
        }
      } else {
        let u = scrollManager.getDomRange(this.domCards),
          f = math.fit(u.showScreenOffset, 0, this.domCards._screenRatio, 0, 1);
        this.domCards.style.perspectiveOrigin = `center ${f * 100}%`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p],
            _ = scrollManager.getDomRange(v),
            T = math.fit(
              _.screenRatio,
              -0.85 - (p % 2) / 10,
              0,
              180,
              0,
              ease.cubicInOut,
            );
          v.style.transform = `rotateY(${T}deg)`;
        }
      }
      let c = r.screenRatio > -1;
      ((this.titleTime += e * (c ? 1 : 0)),
        this.domTitle._splitted.words.forEach((u, f) => {
          if (properties.useMobileLayout)
            u.style.transform = "translate3d(0px, 0, 0)";
          else if (f < 2) {
            let p = math.fit(
              this.titleTime - f / 10,
              0,
              1,
              100,
              0,
              ease.lusion,
            );
            u.style.transform = `translate3d(0, ${p}%, 0)`;
          } else {
            let p = math.fit(
                this.titleTime - f / 10,
                1,
                2,
                -this.domLine2._translateX,
                0,
                ease.lusion,
              ),
              g = math.fit(
                this.titleTime - f / 10,
                0.1,
                1.1,
                -100,
                0,
                ease.lusion,
              );
            u.style.transform = `translate3d(${p}px, ${g}%, 0)`;
          }
        }),
        this.domSubheaderText._splitted.lines.forEach((u, f) => {
          let p = c ? math.saturate(this.titleTime - f / 10 - 0.25) : 0,
            g =
              properties.viewportWidth >= settings.MOBILE_WIDTH
                ? Math.round(ease.expoOut(p) * 1e3) / 1e3
                : 1;
          u.style.transform = `translate3d(0, ${math.fit(g, 0, 1, 110, 0)}%, 0)`;
        }));
      for (let u = 0, f = this.domSubhheaderCards.length; u < f; u++) {
        let p = this.domSubhheaderCards[u],
          g = c ? math.saturate(this.titleTime - u / 10 - 0.25) : 0,
          v =
            properties.viewportWidth >= settings.MOBILE_WIDTH
              ? Math.round(ease.expoOut(g) * 1e3) / 1e3
              : 1;
        p.style.transform = `translate3d(0, ${math.fit(v, 0, 1, 110, 0)}%, 0)`;
      }
    } else this._needsReset = !0;
  }
  _splitText() {
    this.domTitle._originalHTML = this.domTitle._originalHTML || this.domTitle.innerHTML;
    this.domTitle.innerHTML = this.domTitle._originalHTML;
    this.domSubheaderText._originalHTML = this.domSubheaderText._originalHTML || this.domSubheaderText.innerHTML;
    this.domSubheaderText.innerHTML = this.domSubheaderText._originalHTML;
    ((this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words, lines",
      charClass: "about-capability-title-char",
    })),
      this.domTitle._splitted.lines.forEach((e) => {
        const t = document.createElement("div");
        ((t.style.position = "relative"),
          (t.style.overflow = "hidden"),
          t.append(e),
          this.domTitle.append(t));
      }),
      (this.domSubheaderText._splitted = new SplitType(this.domSubheaderText, {
        types: "lines",
      })),
      this.domSubheaderText._splitted.lines.forEach((e) => {
        const t = document.createElement("div");
        ((t.style.position = "relative"),
          (t.style.overflow = "hidden"),
          t.append(e),
          this.domSubheaderText.append(t));
      }));
  }
  _reset() {
    if (this.domTitle._splitted) {
      ((this._needsReset = !1),
        (this.titleTime = 0),
        this.domTitle._splitted.words.forEach((e) => {
          e.style.transform = "translate3d(0, 100%, 0)";
        }),
        this.domSubheaderText._splitted.chars.forEach((e) => {
          e.style.transform = "translate3d(0, 100%, 0)";
        }));
      for (let e = 0, t = this.domSubhheaderCards.length; e < t; e++) {
        let r = this.domSubhheaderCards[e];
        r.style.transform = "translate3d(0, 110%, 0)";
      }
    }
  }
}
const aboutCapabilitySection = new AboutCapabilitySection();
class AboutPageAudios {
  hasInit = !1;
  bgFilterActive = !1;
  bgTrackName = "cinematic_0";
  constructor() {}
  init() {
    settings.USE_AUDIO && (this.hasInit || (this.hasInit = !0));
  }
  update(e) {
    if (!settings.USE_AUDIO) return;
    (e
      ? audios.fadeBgMusic(this.bgTrackName, 1)
      : audios.fadeBgMusic("generic", 1),
      audios.items[this.bgTrackName].setFilterFrequencyViaRatio(
        math.fit(aboutHero.freezeRatio, 0.25, 1, 0, 0.75),
      ));
  }
}
const aboutPageAudios = new AboutPageAudios();
let _c = new Color();
class AboutPage extends Page {
  path = "about";
  id = "about";
  endVisualColor = properties.offWhiteColorHex;
  preInit() {
    let e = this.domContainer;
    (aboutWhoSection.preInit(e),
      aboutClientSection.preInit(e),
      aboutAwardSection.preInit(e),
      aboutCapabilitySection.preInit(e));
  }
  init() {
    (aboutWhoSection.init(),
      aboutClientSection.init(),
      aboutAwardSection.init(),
      aboutCapabilitySection.init(),
      super.init());
  }
  resize(e, t) {
    (aboutWhoSection.resize(e, t),
      aboutClientSection.resize(e, t),
      aboutAwardSection.resize(e, t),
      aboutCapabilitySection.resize(e, t));
  }
  show(e, t, r) {
    (aboutWhoSection.show(), aboutPageAudios.init(), super.show(e, t, r));
  }
  update(e) {
    super.update(e);
    let t = !1,
      r = !0,
      n = !1;
    if (pagesManager.scrollTargetPage == this) {
      properties.bgColor.setStyle(properties.blackColorHex);
      if (aboutCapabilitySection.domContainer) {
        let a = scrollManager.getDomRange(aboutCapabilitySection.domContainer);
        (properties.bgColor.lerp(
          _c.setStyle(properties.blueColorHex),
          math.fit(a.screenRatio, -1, -0.5, 0, 1),
        ),
          a.screenRatio > -0.75 ? ((n = !0), (r = !1)) : ((n = !1), (r = !0)),
          footerSection.getDomRange().ratio > -0.1 &&
            ((t = !0), (r = !1), (n = !1)),
          document.documentElement.classList.toggle("is-black-bg", r),
          document.documentElement.classList.toggle("is-white-bg", t),
          document.documentElement.classList.toggle("is-blue-bg", n));
      }
    }
    (aboutWhoSection.update(e),
      aboutClientSection.update(e),
      aboutAwardSection.update(e),
      aboutCapabilitySection.update(e),
      aboutPageAudios.update(r));
  }
}
const aboutPage = new AboutPage();

export {
  WhoSubsectionWeAre,
  WhoSubsectionDetails,
  WhoSubsectionTeam,
  AboutWhoSection,
  AboutClientSection,
  AboutAwardSection,
  AboutCapabilitySection,
  AboutPage,
  aboutPage
};
globalThis.aboutPage = aboutPage;

export default aboutPage;
