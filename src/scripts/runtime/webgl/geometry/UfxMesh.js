/**
 * Screen Space Quad & Text Mesh
 */
import * as THREE from "../../three.js";
const { Mesh } = THREE;
const ufxVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos){vec3 basePos=vec3((pos.xy)*u_domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}vec3 getScreenPosition(in vec3 basePos){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(u_domXY.xy,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}vec2 padUv(in vec2 uv){vec2 paddedUv=uv+mix(-u_domPadding.xz,u_domPadding.yw,uv)/u_domWH;paddedUv.y=1.-paddedUv.y;return paddedUv;}`,
  quadVert = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`,
  quadFrag = `#define GLSLIFY 1
uniform sampler2D u_bgTexture;uniform vec2 u_resolution;uniform sampler2D u_texture;varying vec2 v_uv;void main(){vec2 bgUv=gl_FragCoord.xy/u_resolution;vec4 bgColor=texture2D(u_bgTexture,bgUv);float imagePaddingThreshold=max(abs(v_uv.x-.5),abs(v_uv.y-.5));float imageAlpha=smoothstep(0.5,0.5-fwidth(imagePaddingThreshold),imagePaddingThreshold);vec4 image=texture2D(u_texture,v_uv);image.a*=imageAlpha;gl_FragColor.rgb=mix(bgColor.rgb,image.rgb,image.a);gl_FragColor.a=image.a;}`;
ShaderChunk.ufxVert = ufxVert;
globalThis.ufxVert = ufxVert;
globalThis.quadVert = quadVert;
globalThis.quadFrag = quadFrag;

class UfxMesh extends Mesh {
  pivot = new Vector2();
  paddingL = 0;
  paddingR = 0;
  paddingT = 0;
  paddingB = 0;
  refDom;
  requireBg;
  tick = 0;
  _domX = 0;
  _domY = 0;
  _domWidth = 0;
  _domHeight = 0;
  _capturedOffsetX = 0;
  _capturedOffsetY = 0;
  constructor(e = {}) {
    let t =
      e.geometry ||
      new PlaneGeometry(1, 1, e.segX || 1, e.segY || 1).translate(0.5, 0.5, 0);
    (t.computeBoundingBox(),
      super(t, e.material),
      (this.refDom = e.refDom),
      (this.pivot = e.pivot || new Vector2(0.5, 0.5)),
      (this.matrixAutoUpdate = !1),
      (this.frustumCulled = !1),
      (this.requireBg = e.requireBg === !0),
      (this.paddingL = e.paddingL || 0),
      (this.paddingR = e.paddingR || 0),
      (this.paddingT = e.paddingT || 0),
      (this.paddingB = e.paddingB || 0),
      this._initMaterial(e),
      (this.onBeforeRender = this._onBeforeRender.bind(this)));
  }
  _onBeforeRender() {
    if (this.requireBg) {
      let e = fboHelper.renderer,
        t = e.getRenderTarget();
      (fboHelper.clearMultisampleRenderTargetState(),
        fboHelper.copy(
          properties.postprocessing.sceneTexture,
          properties.postprocessing.fromRenderTarget,
        ),
        e.setRenderTarget(t));
    }
  }
  _initMaterial(e) {
    this.material != e.material &&
      ((this.material = new ShaderMaterial({
        vertexShader: e.vertexShader || quadVert,
        fragmentShader: e.fragmentShader || quadFrag,
      })),
      (this.material.side = DoubleSide),
      (this.material.transparent = !0));
    for (let r in e) this.material[r] !== void 0 && (this.material[r] = e[r]);
    this.material.extensions.derivatives = !0;
    let t = this.material.uniforms;
    t &&
      ((t.u_position = { value: this.position }),
      (t.u_quaternion = { value: this.quaternion }),
      (t.u_scale = { value: this.scale }),
      (t.u_domXY = { value: new Vector2() }),
      (t.u_domWH = { value: new Vector2() }),
      (t.u_domPivot = { value: new Vector2() }),
      (t.u_domPadding = { value: new Vector4() }),
      (t.u_bgTexture = properties.postprocessing.sharedUniforms.u_fromTexture),
      (t.u_resolution = properties.postprocessing.sharedUniforms.u_resolution),
      (t.u_viewportResolution =
        properties.sharedUniforms.u_viewportResolution));
  }
  syncDom(e = 0, t = 0) {
    if (this.refDom) {
      let r = this.refDom.getBoundingClientRect();
      this.syncRect(
        r.left,
        r.top,
        Math.ceil(r.width),
        Math.ceil(r.height),
        e,
        t,
      );
    } else console.warn("refDom is missing");
  }
  syncRect(e, t, r, n, a = 0, l = 0) {
    ((this._domX = e),
      (this._domY = t),
      (this._domWidth = Math.ceil(r)),
      (this._domHeight = Math.ceil(n)),
      this.material.uniforms.u_domWH.value.set(this._domWidth, this._domHeight),
      (this._capturedOffsetY = a),
      (this._capturedOffsetX = l));
  }
  testViewport(e = 0, t = 0) {
    let r = this._domX - this._capturedOffsetX + t,
      n = r + this._domWidth,
      a = this._domY - this._capturedOffsetY + e,
      l = a + this._domHeight;
    return (
      a < properties.viewportHeight &&
      l > 0 &&
      r < properties.viewportWidth &&
      n > 0
    );
  }
  update(e = 0, t = 0) {
    let r = this.material.uniforms;
    (r.u_domXY.value.set(
      this._domX - this._capturedOffsetX + t,
      this._domY - this._capturedOffsetY + e,
    ),
      r.u_domPivot.value.set(
        this._domWidth * this.pivot.x,
        this._domHeight * this.pivot.y,
      ),
      r.u_domPadding.value.set(
        this.paddingL,
        this.paddingR,
        this.paddingT,
        this.paddingB,
      ),
      this.tick++);
  }
}
const videoVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXYFrom;uniform vec2 u_domWHFrom;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;varying float v_deltaRatio;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos,in vec2 domWH){vec3 basePos=vec3((pos.xy)*domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 getScreenPosition(in vec3 basePos,in vec2 domXY){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(domXY,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){float placementWeight=1.-(pow(position.x*position.x,0.75)+pow(1.-position.y,1.5))/2.;v_showRatio=(smoothstep(placementWeight*0.3,0.7+placementWeight*0.3,u_showRatio));vec2 domXY=mix(u_domXYFrom,u_domXY,v_showRatio);vec2 domWH=mix(u_domWHFrom,u_domWH,v_showRatio);domXY.x+=mix(domWH.x,0.,cos(v_showRatio*3.1415926*2.)*0.5+0.5)*0.1;vec3 basePos=getBasePosition(position,domWH);float rot=(smoothstep(0.,1.,v_showRatio)-v_showRatio)*-0.5;vec3 rotBasePos=qrotate(vec4(0.,0.,sin(rot),cos(rot)),basePos);vec3 screenPos=getScreenPosition(rotBasePos,domXY);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=vec2(uv.x,1.-uv.y);v_domWH=domWH;}`,
  videoFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec3 u_color;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_time;uniform vec2 u_radialCenter;uniform float u_showRatio;uniform float u_globalRadius;uniform float u_aspectScale;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*v_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(6.,25.));float imageAlpha=getRoundedCornerMask(v_uv,v_domWH,u_globalRadius,1.0);vec2 baseUv=v_uv;float toRadialCenterDist=length((baseUv-u_radialCenter)*vec2(v_domWH.x/v_domWH.y,1.));baseUv.y=(baseUv.y-.5)*mix(1.,u_aspectScale,v_showRatio)+0.5;vec3 color=texture2D(u_texture,baseUv).rgb;vec3 tintedColor=max(u_color,vec3(dot(color,vec3(0.299,0.587,0.114))));gl_FragColor=vec4(mix(tintedColor,color,v_showRatio),imageAlpha);}`,
  vert$j = `#define GLSLIFY 1
attribute vec3 CP;attribute float Cd;varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_scrollY;uniform vec2 u_viewportResolution;uniform vec2 u_aspect;uniform vec2 u_margin;uniform float u_radius;void main(){vec3 pos=vec3(CP.xy+position.xy*u_radius,0.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_cd=Cd;v_lineRatio=position.z;v_s=CP.z;}`,
  frag$m = `#define GLSLIFY 1
varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_showRatio;uniform float u_hideRatio;uniform vec3 u_colorBg;uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_aoThreshold;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}void main(){float ao=0.9+0.1*v_cd;float aoRatio=linearStep(u_aoThreshold-0.02,u_aoThreshold+0.02,u_showRatio);if(step(u_showRatio,v_lineRatio)>0.5)discard;float mixRatio=1.0-pow(1.0-clamp(v_lineRatio,0.0,1.0),2.0);gl_FragColor.rgb=hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),mixRatio));gl_FragColor.rgb*=min(1.0,ao+1.0-aoRatio);float alpha=abs(v_s-.5);gl_FragColor.a=linearStep(0.5,0.5-fwidth(alpha),alpha);}`,
  lineEndVert = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_mixRatio;uniform float u_ao;vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}varying vec3 v_color;varying vec2 v_uv;void main(){v_color=u_ao*hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),u_mixRatio));v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  lineEndFrag = `#define GLSLIFY 1
varying vec3 v_color;varying vec2 v_uv;void main(){float d=length(v_uv-.5)*2.;gl_FragColor.rgb=v_color;gl_FragColor.a=smoothstep(1.,1.-fwidth(d),d);}`,
  _v0$2 = new Vector3(),
  _v1$5 = new Vector3(),
  _box = new Box3(),
  LINES_DATA_LIST = [
    {
      fileName: "line_reel",
      aoThreshold: 0.555,
      margin: { x: -0.05, y: -0.8 },
      scrollToRatioFactors: [0.4, 1.3],
      boxMin: new Vector3(-0.0112049, -0.0141946, 0),
      boxMax: new Vector3(1.01357, 0.718671, 0),
      color0: "#5a90ff",
      color1: "#2a38ee",
    },
    {
      fileName: "line_goal",
      aoThreshold: 1e-4,
      margin: { x: 0.2, y: -0.6 },
      scrollToRatioFactors: [1.2, 2],
      boxMin: new Vector3(-0.0180006, -0.00963629, 0),
      boxMax: new Vector3(1.01777, 0.850395, 0),
      color0: "#94fffb",
      color1: "#1285dc",
    },
    {
      fileName: "line_capability",
      aoThreshold: 1e-4,
      margin: { x: 0, y: -1.15 },
      scrollToRatioFactors: [0, 2],
      boxMin: new Vector3(-0.0165916, -0.0152524, 0),
      boxMax: new Vector3(1.018, 1.08872, 0),
      color0: "#fff",
      color1: "#bbb",
    },
    {
      fileName: "line_office",
      aoThreshold: 1e-4,
      margin: { x: 0, y: -2.2 },
      boxMin: new Vector3(-0.0131718, -0.0141192, 0),
      boxMax: new Vector3(1.01767, 1.2037, 0),
      scrollToRatioFactors: [-2, 1.85],
      color0: "#fff",
      color1: "#bbb",
    },
  ];

class UfxTextMesh extends UfxMesh {
  constructor(e = {}) {
    (super(e),
      this.refDom || console.error("UfxTextMesh: refDom is not defined"),
      (this.material.uniforms.u_texture = {
        value: textureHelper.transparentTexture,
      }),
      (this.canvas = document.createElement("canvas")));
  }
  syncText() {
    let e = domHelper.getLinesFromText(this.refDom),
      t = this.refDom.getBoundingClientRect(),
      r = this.canvas,
      n = r.getContext("2d"),
      a = getComputedStyle(this.refDom),
      l = parseFloat(a.getPropertyValue("padding-left")),
      c = Math.floor(parseFloat(a.getPropertyValue("font-size"))),
      u = a.getPropertyValue("font-style"),
      f = a.getPropertyValue("font-weight"),
      p = a.getPropertyValue("font-family"),
      g = Math.ceil(t.width),
      v = Math.ceil(t.height);
    ((r.width = Math.ceil(g * properties.webglDPR)),
      (r.height = Math.ceil(v * properties.webglDPR)));
    let _ = parseFloat(a.getPropertyValue("line-height"));
    (n.save(),
      n.scale(properties.webglDPR, properties.webglDPR),
      (n.fillStyle = "#000"),
      n.fillRect(0, 0, g, v),
      (n.font = u + " " + f + " " + c + "px " + p));
    let T = 0,
      M = [];
    for (let C = 0; C < e.length; C++) {
      let w = Math.ceil(n.measureText(e[C]).width + 1);
      (M.push(w), (T += w));
    }
    let S = 0,
      b;
    b = _ * 0.15;
    for (let C = 0; C < e.length; C++) {
      let w = l,
        R = C * _ + b,
        E = M[C],
        I = n.createLinearGradient(w, 0, w + E, 0);
      (I.addColorStop(0, "rgb(" + Math.round((S / T) * 255) + ", 0, 0)"),
        (S += E),
        I.addColorStop(1, "rgb(" + Math.round((S / T) * 255) + ", 0, 0)"),
        (n.fillStyle = I),
        n.fillRect(w, R, E, _));
    }
    ((n.globalCompositeOperation = "lighter"),
      (n.fillStyle = "#0f0"),
      (b = _ * 0.8));
    for (let C = 0; C < e.length; C++) {
      let w = l,
        R = C * _ + b;
      n.fillText(e[C], w, R);
    }
    (n.restore(),
      this.texture && this.texture.dispose(),
      (this.texture = new Texture(this.canvas)),
      (this.texture.minFilter = LinearFilter),
      (this.texture.magFilter = LinearFilter),
      (this.material.uniforms.u_texture.value = this.texture),
      (this.texture.needsUpdate = !0));
  }
}
const vert$a = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`,
  frag$e = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform float u_opacity;uniform float u_parallax;uniform float u_time;uniform float u_dpr;uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec2 u_screenRTSize;uniform float u_activeRatio;uniform vec3 u_highlightColor;uniform vec3 u_bgColor;uniform vec2 u_mouseXY;uniform float u_borderRadius;uniform float u_parallaxRatio;uniform float u_isFullscreen;uniform int u_isVertical;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#ifdef IS_TEXT
uniform vec3 u_textColor;uniform float u_textRatio;
#else
uniform float u_readyRatio;float sdRoundedBox(in vec2 p,in vec2 b,in vec4 r){r.xy=(p.x>0.0)?r.xy : r.zw;r.x=(p.y>0.0)?r.x  : r.y;vec2 q=abs(p)-b+r.x;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;}float getRoundedCornerMask(vec2 uv,vec4 radius){float d=sdRoundedBox((uv-.5)*u_domWH,u_domWH*0.5*mix(0.6,1.,max(u_isFullscreen,u_activeRatio)),radius.yzwx);return smoothstep(0.,0.-fwidth(d),d);}
#endif
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(43.,12.));
#ifdef IS_TEXT
vec4 image=texture2D(u_texture,v_uv);vec3 color=u_textColor;float mask=smoothstep(u_textRatio,u_textRatio-.5/255.,image.r*255./256.);float imageAlpha=image.g;color=mix(u_bgColor,color,(0.2+mask*0.8));
#else
vec2 uv=v_uv;uv-=0.5;uv*=mix(0.6,1.,u_activeRatio);if(u_isVertical==1){uv.y*=u_parallaxRatio;uv.y+=u_parallax*(1.-u_parallaxRatio);}else{uv.x*=u_parallaxRatio;uv.x+=u_parallax*(1.-u_parallaxRatio);}uv+=0.5;vec3 color=texture2D(u_texture,uv).rgb;float imageAlpha=getRoundedCornerMask(v_uv,vec4(u_borderRadius));color=mix(u_highlightColor,color,u_readyRatio);
#endif
imageAlpha*=u_opacity;gl_FragColor=vec4(color,imageAlpha);}`;
let idx = 0;


globalThis.videoVert = videoVert;
globalThis.videoFrag = videoFrag;
globalThis.vert$j = vert$j;
globalThis.frag$m = frag$m;
globalThis.lineEndVert = lineEndVert;
globalThis.lineEndFrag = lineEndFrag;
globalThis.LINES_DATA_LIST = LINES_DATA_LIST;
globalThis.vert$a = vert$a;
globalThis.frag$e = frag$e;
globalThis.UfxTextMesh = UfxTextMesh;

export { UfxMesh, UfxTextMesh, ufxVert, quadVert, quadFrag, videoVert, videoFrag, vert$j, frag$m, lineEndVert, lineEndFrag, LINES_DATA_LIST, vert$a, frag$e };
globalThis.UfxMesh = UfxMesh;

export default UfxMesh;
