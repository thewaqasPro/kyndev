/**
 * 3D Product Showcase Viewer & Interactive Case Study Shaders
 */
import * as THREE from "../../three.js";
import domHelper from "../../ui/DomHelper.js";
import fboHelper from "../../webgl/FboHelper.js";
import properties from "../../core/Properties.js";
import math from "../../core/MathUtils.js";
import ease from "../../core/Ease.js";
import input from "../../core/Input.js";
import routeManager from "../../navigation/RouteManager.js";
import header from "../../ui/Header.js";
import { ScrollPane } from "../../navigation/ScrollManager.js";
import { UfxMesh } from "../../webgl/geometry/UfxMesh.js";
import videoOverlay from "../../ui/VideoOverlay.js";
import pagesManager from "../../navigation/PageManager.js";
import projectPage from "../../navigation/pages/ProjectPage.js";

const {
  Scene,
  Camera,
  PerspectiveCamera,
  Object3D,
  Vector2,
  Vector3,
  Color,
  PlaneGeometry,
  Mesh,
  RawShaderMaterial,
  ShaderMaterial,
  Texture,
  DoubleSide,
  BufferGeometry,
  BufferAttribute,
  LinearFilter,
  NearestFilter,
  ClampToEdgeWrapping
} = THREE;

const vertexShader = `#define GLSLIFY 1
attribute float branchRatio;attribute vec3 branchSplinePos;attribute vec3 leafAxis;attribute float leafRatio;attribute float meshId;uniform float u_time;uniform float u_delay;uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform float u_angleForce;varying vec3 v_position;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 toQuaternion(float angle,vec3 axis){float half_angle=angle/2.0;vec4 q;q.x=axis.x*sin(half_angle);q.y=axis.y*sin(half_angle);q.z=axis.z*sin(half_angle);q.w=cos(half_angle);return q;}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=position;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;float time=u_delay+0.2*u_time;float branchNoiseStrength=0.001;vec3 branchOffset=branchNoiseStrength*branchRatio*branchRatio*simplexNoiseDerivatives(vec4(pos,time)).xyz;branchOffset+=vec3(-1.0,0.0,0.0)*u_angleForce*branchRatio*branchRatio*0.1;if(meshId>0.0){vec3 toBranchSpline=pos-branchSplinePos;float angle=0.005*simplexNoiseDerivatives(vec4(branchRatio*0.5,u_time,meshId,1.0)).x;angle-=0.5*sign(leafAxis.z)*leafRatio*leafRatio*u_angleForce;vec4 q=toQuaternion(angle,leafAxis);toBranchSpline=qrotate(q,toBranchSpline);pos=branchSplinePos+branchOffset+toBranchSpline;}else{pos+=branchOffset;}vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_position=pos;}`,
  fragmentShader$3 = `#define GLSLIFY 1
uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform vec3 u_mask;varying vec3 v_position;void main(){gl_FragColor.rgb=u_mask*vec3((v_position.x-u_bbMin.x)/(u_bbMax.x-u_bbMin.x));gl_FragColor.a=1.0;}`;
globalThis.vertexShader = vertexShader;
globalThis.fragmentShader$3 = fragmentShader$3;


const vert$b = `#define GLSLIFY 1
attribute float centroidY;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_shadowProjPosition;varying vec3 v_worldPosition;
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);vec4 worldPosition=modelMatrix*vec4(position,1.0);v_worldPosition=worldPosition.xyz;}`,
  frag$f = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_shadowTexture;uniform vec3 u_shadowProjPosition;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_bgColor;uniform float u_plantsShadow;uniform vec3 u_previewBgColor;uniform float u_previewBgThreshold;uniform bool u_isVertical;uniform float u_scrollXStrength;uniform float u_activeRatio;varying vec2 v_uv;varying vec3 v_worldPosition;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(22.,45.));vec2 imageUv=v_uv;float moveAxis=u_isVertical ? 1.-v_uv.y : v_uv.x;float waveOffset=cos(moveAxis*6.2831853)*2.*u_scrollXStrength*u_scrollXStrength;vec2 imageUvOffsetBit=vec2(0.0,0.0);if(u_isVertical){imageUv.x+=waveOffset;imageUvOffsetBit.y=u_scrollXStrength/8.;}else{imageUv.y+=waveOffset;imageUvOffsetBit.x=u_scrollXStrength/8.;}imageUv+=imageUvOffsetBit*noise.x;vec4 image=vec4(0.0,0.0,0.0,0.0);vec4 baseColor=vec4(u_bgColor,0.0);for(int i=0;i<8;i++){vec4 texel=texture2D(u_texture,imageUv);image+=mix(baseColor,texel,texel.a);imageUv+=imageUvOffsetBit;}image/=8.;vec3 worldPosition=v_worldPosition;worldPosition.z+=mix(0.0,-4.,image.a);vec3 projectorDirection=normalize(u_shadowProjPosition-worldPosition);float projectorDistance=length(u_shadowProjPosition-worldPosition);vec4 texCoords=u_shadowViewMatrixCamera*vec4(worldPosition,1.0);vec2 shadowUv=(texCoords.xy/texCoords.w)*0.9;shadowUv.y=1.0-shadowUv.y;vec4 shadowImage=texture2D(u_shadowTexture,shadowUv);float shadow=max(shadowImage.r,max(shadowImage.g,shadowImage.b));shadow=mix(0.,mix(shadow,0.35+shadow*0.65,image.w),u_activeRatio);vec3 color=image.rgb;color=mix(color,u_previewBgColor,smoothstep(u_previewBgThreshold,u_previewBgThreshold+fwidth(moveAxis),moveAxis));color*=mix(1.0,u_plantsShadow,shadow);gl_FragColor=vec4(color,1.);}`,
  _v3 = new Vector3();
let _c1$2 = new Color();
new Color();
class ProjectDetailsScreen {
  screenRT;
  screenCamera;
  screenScene = new Scene();
  screenMesh;
  shadowContainer = new Object3D();
  shadowCamera;
  shadowRt;
  shadowBlurRt1;
  shadowBlurRt2;
  shadowBlurRt3;
  shadowFinalRt;
  plantGeo;
  plantMaterial;
  plantMesh0;
  plantMesh1;
  plantMesh2;
  velocity = new Vector2();
  mouse = new Vector2();
  angleForce = 0;
  angleForceEased = 0;
  shadow = 1;
  previewBgThreshold = 1;
  previewColorRatio = 0;
  previewBgColorDefaultColorHex = "#F3F4F9";
  previewBgColorHex = "#000";
  sharedUniforms = {
    u_shadowTexture: { value: null },
    u_shadowViewMatrixCamera: { value: new Matrix4() },
    u_shadowProjectionMatrixCamera: { value: new Matrix4() },
    u_shadowModelMatrixCamera: { value: new Matrix4() },
    u_shadowProjPosition: { value: new Vector3() },
  };
  preInit(e) {
    ((this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 200)),
      this.screenCamera.position.set(0, 0, 100),
      (this.screenRT = fboHelper.createRenderTarget(1, 1)),
      (this.screenMesh = new UfxMesh({
        refDom: e,
        uniforms: Object.assign(
          {
            u_texture: { value: this.screenRT.texture },
            u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
            u_previewBgColor: { value: new Color("#f00") },
            u_previewBgThreshold: { value: 1 },
            u_plantsShadow: { value: 1 },
            u_scrollXStrength: { value: 0 },
            u_activeRatio: { value: 0 },
            u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical,
          },
          this.sharedUniforms,
          blueNoise.sharedUniforms,
        ),
        vertexShader: vert$b,
        fragmentShader: frag$f,
        depthWrite: !0,
        depthTest: !0,
        transparent: !1,
      })),
      projectPage.preUfxContainer.add(this.screenMesh),
      properties.loader.add(settings.MODEL_PATH + "plant.buf", {
        onLoad: (t) => (this.plantGeo = t),
      }),
      (this.shadowRT = fboHelper.createRenderTarget(1, 1)),
      (this.shadowBlurRT1 = fboHelper.createRenderTarget(1, 1)),
      (this.shadowBlurRT2 = fboHelper.createRenderTarget(1, 1)),
      (this.shadowBlurRT3 = fboHelper.createRenderTarget(1, 1)),
      (this.shadowFinalRt = fboHelper.createRenderTarget(1, 1)),
      (this.shadowCamera = new OrthographicCamera(-1, 1, 1, -1, 0.001, 50)),
      (this.sharedUniforms.u_shadowTexture.value = this.shadowFinalRt.texture));
  }
  init() {
    (this.shadowCamera.position.set(0, 0, 10),
      this.shadowCamera.lookAt(0.2, 0, 0),
      (this.shadowCamera.zoom = 2500),
      this.shadowCamera.updateProjectionMatrix(),
      this.shadowCamera.updateMatrixWorld(),
      this.shadowCamera.updateWorldMatrix(),
      this.plantGeo.computeBoundingBox());
    const e = new ShaderMaterial({
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_bbMin: { value: this.plantGeo.boundingBox.min },
        u_bbMax: { value: this.plantGeo.boundingBox.max },
        u_delay: { value: 0 },
        u_angleForce: { value: 0 },
        u_mask: { value: new Vector3() },
      },
      vertexShader,
      fragmentShader: fragmentShader$3,
      side: 2,
    });
    (e.uniforms.u_mask.value.set(1, 0, 0),
      (this.plantMesh0 = new Mesh(this.plantGeo, e)),
      this.plantMesh0.position.set(-0.55, -0.8, -5),
      this.plantMesh0.rotation.set(0, -0.2, -0.2));
    const t = e.clone();
    ((t.uniforms.u_time = properties.sharedUniforms.u_time),
      t.uniforms.u_mask.value.set(0, 1, 0),
      (this.plantMesh1 = new Mesh(this.plantGeo, t)),
      this.plantMesh1.position.set(-0.75, -0.8, 0),
      this.plantMesh1.rotation.set(0, 0.2, -0.5));
    const r = e.clone();
    ((r.uniforms.u_time = properties.sharedUniforms.u_time),
      r.uniforms.u_mask.value.set(0, 0, 1),
      (this.plantMesh2 = new Mesh(this.plantGeo, r)),
      this.plantMesh2.position.set(-0.45, -0.8, 5),
      this.plantMesh2.rotation.set(0.3, 0.3, 0.1),
      this.shadowContainer.add(this.plantMesh0),
      this.shadowContainer.add(this.plantMesh1),
      this.shadowContainer.add(this.plantMesh2),
      (this.plantMesh0.onBeforeRender = this._onPlantMeshRender.bind(
        this,
        this.plantMesh0,
      )),
      (this.plantMesh1.onBeforeRender = this._onPlantMeshRender.bind(
        this,
        this.plantMesh1,
      )),
      (this.plantMesh2.onBeforeRender = this._onPlantMeshRender.bind(
        this,
        this.plantMesh2,
      )));
  }
  _onPlantMeshRender(e) {
    let t = e.material.uniforms.u_mask.value;
    properties.gl.colorMask(t.x == 1, t.y == 1, t.z == 1, !0);
  }
  resize() {
    let e = properties.width,
      t = properties.height;
    (this.screenMesh.syncDom(0), this.screenRT.setSize(e, t));
    let r = properties.viewportWidth,
      n = properties.viewportHeight;
    ((this.screenCamera.left = -r * 0.5),
      (this.screenCamera.right = r * 0.5),
      (this.screenCamera.top = n * 0.5),
      (this.screenCamera.bottom = -n * 0.5));
    const a = 0.75;
    let l = Math.ceil(a * e),
      c = Math.ceil(a * t);
    (this.shadowRT.setSize(l, c),
      this.shadowFinalRt.setSize(l, c),
      (this.shadowCamera.left = -r * 0.5),
      (this.shadowCamera.right = r * 0.5),
      (this.shadowCamera.top = n * 0.5),
      (this.shadowCamera.bottom = -n * 0.5),
      this.shadowCamera.updateProjectionMatrix());
  }
  update(e) {
    if (!this.plantMesh0) return;
    let t = projectDetailsSection.scrollPane;
    (_v3.set(-0.1, 0.1, 10),
      (_v3.x += 0.03 * input.mouseXY.x),
      (_v3.y += 0.015 * input.mouseXY.y),
      this.shadowCamera.position.lerp(_v3, 4 * e),
      this.shadowCamera.lookAt(-0.1, 0, 0),
      this.shadowCamera.updateProjectionMatrix(),
      this.shadowCamera.updateMatrixWorld(),
      this.shadowCamera.updateWorldMatrix(),
      (this.angleForce += Math.abs(t.scrollViewDelta)),
      (this.angleForceEased = math.mix(
        this.angleForceEased,
        this.angleForce,
        0.02,
      )));
    const r = math.clamp(this.angleForce - this.angleForceEased, -1, 1);
    (this.sharedUniforms.u_shadowViewMatrixCamera.value.copy(
      this.shadowCamera.matrixWorldInverse,
    ),
      this.sharedUniforms.u_shadowProjectionMatrixCamera.value.copy(
        this.shadowCamera.projectionMatrix,
      ),
      this.sharedUniforms.u_shadowModelMatrixCamera.value.copy(
        this.shadowCamera.matrixWorld,
      ),
      this.sharedUniforms.u_shadowProjPosition.value.copy(
        this.shadowCamera.position,
      ),
      fboHelper.copy(textureHelper.transparentTexture, this.shadowFinalRt));
    const n = fboHelper.getColorState();
    let a = fboHelper.renderer.getRenderTarget(),
      l = fboHelper.renderer;
    (l.setRenderTarget(this.shadowRT),
      l.setClearColor(0, 0),
      (this.plantMesh0.material.uniforms.u_delay.value = 0),
      (this.plantMesh1.material.uniforms.u_delay.value = 0.2),
      (this.plantMesh2.material.uniforms.u_delay.value = 0.5),
      (this.plantMesh0.material.uniforms.u_angleForce.value = r),
      (this.plantMesh1.material.uniforms.u_angleForce.value = r),
      (this.plantMesh2.material.uniforms.u_angleForce.value = r),
      fboHelper.renderMesh(
        this.shadowContainer,
        this.shadowRT,
        this.shadowCamera,
      ),
      properties.gl.colorMask(!0, !0, !0, !0),
      blur.blur(2, 1, this.shadowRT, this.shadowBlurRT1),
      textureHelper.mixChannels(
        this.shadowRT.texture,
        this.shadowFinalRt,
        0,
        -1,
        -1,
        -1,
      ),
      blur.blur(4, 0.5, this.shadowRT, this.shadowBlurRT2),
      textureHelper.mixChannels(
        this.shadowRT.texture,
        this.shadowFinalRt,
        -1,
        1,
        -1,
        -1,
      ),
      blur.blur(4, 0.75, this.shadowRT, this.shadowBlurRT3),
      textureHelper.mixChannels(
        this.shadowRT.texture,
        this.shadowFinalRt,
        -1,
        -1,
        2,
        -1,
      ),
      l.setRenderTarget(null),
      (this.screenCamera.position.x = properties.viewportWidth * 0.5),
      (this.screenCamera.position.y = -properties.viewportHeight * 0.5),
      this.screenCamera.updateProjectionMatrix(),
      (this.screenMesh.material.uniforms.u_plantsShadow.value = this.shadow),
      (this.screenMesh.material.uniforms.u_previewBgThreshold.value =
        this.previewBgThreshold),
      (this.screenMesh.material.uniforms.u_scrollXStrength.value = Math.min(
        0.15,
        t.isActive ? t.scrollViewDelta : 0,
      )),
      this.screenMesh.material.uniforms.u_previewBgColor.value
        .setStyle(this.previewBgColorDefaultColorHex)
        .lerp(_c1$2.setStyle(this.previewBgColorHex), this.previewColorRatio),
      (this.screenMesh.material.uniforms.u_activeRatio.value =
        projectPage.activeRatio),
      this.screenMesh.update(),
      l.setClearColor(0, 0),
      l.clear(this.screenRT),
      l.setRenderTarget(this.screenRT),
      l.render(this.screenScene, this.screenCamera),
      l.setRenderTarget(a),
      fboHelper.setColorState(n));
  }
}
const projectDetailsScreen = new ProjectDetailsScreen();
let _c1$1 = new Color(), _c2$1 = new Color();

class ProjectDetailsData {
  id = "";
  title = "";
  desc = "";
  ctaTitle = "";
  ctaUrl = "";
  colorBg = "#000";
  colorBtnBg = "#000";
  colorBtnBgHover = "#000";
  colorBtnText = "#000";
  colorBtnTextHover = "#000";
  colorHighlight = "#000";
  colorIconBg = "#000";
  colorIconColor = "#000";
  colorText = "#000";
  shadow = 0;
  nextColorBg = "#000";
  nextColorText = "#000";
  nextId = "";
  nextTitle = "";
  nextShadow = 0;
  domServiceSideListItems;
  domLinkSideListItems;
  itemDataList = [];
  constructor(e, t) {
    this.id = e;
    this.title = t.querySelector("#project-details-title")?.innerHTML || "";
    this.desc = t.querySelector("#project-details-desc")?.innerHTML || "";
    this.ctaTitle = t.querySelector("#project-details-launch-cta-text")?.textContent || "";
    this.ctaUrl = t.querySelector("#project-details-launch-cta")?.href || "";
    let r = { ...(t.querySelector("#project-details")?.dataset || {}) };
    this.colorBg = r.colorBg || "#000";
    this.colorBtnBg = r.colorBtnBg || "#000";
    this.colorBtnBgHover = r.colorBtnBgHover || "#000";
    this.colorBtnText = r.colorBtnText || "#000";
    this.colorBtnTextHover = r.colorBtnTextHover || "#000";
    this.colorHighlight = r.colorHighlight || "#fff";
    this.colorIconBg = r.colorIconBg || "#000";
    this.colorIconColor = r.colorIconColor || "#000";
    this.colorText = r.colorText || "#fff";
    this.shadow = parseFloat(r.shadow || "0") || 0;
    this.domServiceSideListItems = Array.from(
      t.querySelectorAll("#project-details-side-list-services > *"),
    );
    this.domServiceSideListItems.forEach((l) => {
      l.remove();
    });
    this.domLinkSideListItems = Array.from(
      t.querySelectorAll("#project-details-side-list-links > *"),
    );
    this.domLinkSideListItems.forEach((l) => {
      l.remove();
    });
    let n = Array.from(t.querySelectorAll(".project-details-item"));
    for (let l = 0; l < n.length; l++) {
      let c = n[l],
        u = { ...c.dataset };
      if (c.classList.contains("is-text")) {
        u.content = c.querySelector(".project-details-item-text")?.textContent || "";
      } else {
        u.width = parseFloat(u.width) || 1200;
        u.height = parseFloat(u.height) || 800;
        u.parallax = parseFloat(u.parallax || "1") || 1;
        u.fullscreen = u.fullscreen !== void 0;
      }
      this.itemDataList.push(u);
      c.remove();
    }
    let a = { ...(t.querySelector("#project-details-preview")?.dataset || {}) };
    this.nextColorBg = a.nextColorBg || "#000";
    this.nextColorText = a.nextColorText || "#fff";
    this.nextId = a.nextId || "";
    this.nextShadow = parseFloat(a.nextShadow || "0") || 0;
    this.nextTitle = t.querySelector("#project-details-preview-title")?.textContent || "";
  }
}
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
class ProjectDetailsItem {
  constructor(e = "image") {
    ((this.idx = idx++),
      (this.data = {}),
      (this.type = e),
      (this.aspect = 1),
      (this.imgVersion = 0),
      (this.texture = null),
      (this.isActive = !1),
      (this.textSpeed = 1),
      (this.parallaxRatio = 1),
      (this.activeTime = 0),
      (this.domVideoButton = null),
      (this.onClick = null));
    let t = (this.domWrapper = document.createElement("div"));
    t.classList.add("project-details-item");
    let r = (this.uniforms = Object.assign(
      {
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
        u_texture: { value: null },
        u_activeRatio: { value: 0 },
        u_isFullscreen: { value: 0 },
        u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical,
        u_opacity: projectDetailsSection.sharedUniforms.u_opacity,
        u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
        u_screenRTSize: projectDetailsSection.sharedUniforms.u_screenRTSize,
        u_highlightColor: projectDetailsSection.sharedUniforms.u_highlightColor,
        u_textureSize: { value: new Vector2(1, 1) },
        u_time: properties.sharedUniforms.u_time,
        u_dpr: properties.sharedUniforms.u_dpr,
        u_mouseXY: { value: input.mouseXY },
        u_parallax: { value: 0 },
        u_parallaxRatio: { value: 1 },
        u_borderRadius: { value: 0 },
      },
      blueNoise.sharedUniforms,
    ));
    switch ((t.classList.add("is-" + e), e)) {
      case "image":
      case "video":
        ((r.u_readyRatio = { value: 0 }),
          (this.ufxMesh = new UfxMesh({
            refDom: t,
            uniforms: r,
            depthTest: !1,
            depthWrite: !1,
            vertexShader: vert$a,
            fragmentShader: frag$e,
            transparent: !1,
          })));
        break;
      case "text":
        ((this.domText = document.createElement("div")),
          this.domText.classList.add("project-details-item-text"),
          this.domWrapper.appendChild(this.domText),
          (r.u_textColor = projectDetailsSection.sharedUniforms.u_textColor),
          (r.u_bgColor = projectDetailsSection.sharedUniforms.u_bgColor),
          (r.u_textRatio = { value: 0 }),
          (this.ufxMesh = new UfxTextMesh({
            refDom: this.domText,
            uniforms: r,
            depthTest: !1,
            depthWrite: !1,
            vertexShader: vert$a,
            fragmentShader: frag$e,
            transparent: !1,
          })),
          (this.ufxMesh.material.defines.IS_TEXT = !0));
        break;
    }
    projectDetailsScreen.screenScene.add(this.ufxMesh);
  }
  activate(e) {
    ((this.data = e),
      (this.parallaxRatio = this.uniforms.u_parallaxRatio.value =
        e.parallax || 1),
      (this.isFullscreen = !!e.fullscreen),
      (this.uniforms.u_isFullscreen.value = +this.isFullscreen),
      (this.uniforms.u_activeRatio.value = 0),
      this.type == "image"
        ? this._initImage()
        : this.type == "video"
          ? this._initVideo()
          : this.type == "text"
            ? this._initText()
            : console.error("unknown type"),
      (this.isActive = !0));
  }
  deactivate() {
    ((this.isActive = !1), this.playPauseVideo(!1));
  }
  _initVideo() {
    let e = this.data,
      t = browser$1.isMobile
        ? e.filename.replace("/video", "/mobile_video")
        : e.filename;
    t.indexOf("/") == 0 && (t = settings.CDN_PATH + t);
    let r = t + ".mp4",
      n = this.texture;
    if (n && n.__url == r) return;
    (this.imgVersion++,
      n && n.__loaded && n.dispose(),
      (this.aspect = e.width / e.height),
      (this.uniforms.u_texture.value = textureHelper.blackTexture),
      this.uniforms.u_textureSize.value.set(e.width, e.height));
    let a;
    const l = document.createElement("video");
    (settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH &&
      (l.crossOrigin = "anonymous"),
      (l.muted = !0),
      (l.playsinline = !0),
      l.setAttribute("playsinline", ""),
      (l.src = r),
      (l.loop = !0),
      l.load(),
      (a = new VideoTexture(l)),
      (a.__version = this.version),
      (a.__url = this.url),
      (a.__loaded = !0),
      (this.texture = a),
      (this.uniforms.u_texture.value = a));
  }
  _initImage() {
    let e = this.data,
      t = browser$1.isMobile
        ? e.filename.replace("/image", "/mobile_image")
        : e.filename;
    t.indexOf("/") == 0 && (t = settings.CDN_PATH + t);
    let r = t + ".webp",
      n = this.texture;
    if (n && n.__url == r) return;
    (this.imgVersion++,
      n && n.__loaded && n.dispose(),
      (this.aspect = e.width / e.height),
      (this.uniforms.u_texture.value = textureHelper.blackTexture),
      this.uniforms.u_textureSize.value.set(e.width, e.height));
    let a = new Texture(new Image());
    ((a.__version = this.version),
      (a.__url = this.url),
      properties.loader.load(r, {
        type: "texture",
        content: a,
        minFilter: settings.USE_WEBGL2
          ? LinearMipmapLinearFilter
          : LinearFilter,
        onLoad: (l) => {
          l.__version != this.imgVersion
            ? ((l.__loaded = !0),
              (this.texture = l),
              (this.uniforms.u_texture.value = l))
            : l.dispose();
        },
      }));
  }
  _initText() {
    let e = this.data;
    ((this.domWrapper.style.fontSize = e.fontSize + "em"),
      (this.domText.innerHTML = e.content),
      (this.uniforms.u_textRatio.value = 0),
      (this.textSpeed = 50 / Math.max(30, e.content.length)));
  }
  _onMouseEnter() {}
  _onMouseLeave() {}
  _onClick() {}
  resize(e, t, r) {
    let n, a;
    (r
      ? ((e += this.isFullscreen ? 2 : 0),
        (n = e),
        (a = e / this.aspect),
        (this.type == "image" || this.type == "video") &&
          (a *= this.parallaxRatio))
      : ((t += this.isFullscreen ? 2 : 0),
        (n = t * this.aspect),
        (a = t),
        (this.type == "image" || this.type == "video") &&
          (n *= this.parallaxRatio)),
      (this.domWrapper.style.width = n + "px"),
      this.type == "text" && r
        ? (this.domWrapper.style.height = "auto")
        : (this.domWrapper.style.height = a + "px"),
      this.type == "text" && this.ufxMesh.syncText());
  }
  syncDom() {
    let e = properties.useMobileLayout,
      t = e ? 0 : projectDetailsSection.scrollPane.scrollPixel,
      r = e ? projectDetailsSection.scrollPane.scrollPixel : 0;
    this.ufxMesh.syncDom(-r, -t);
  }
  playPauseVideo(e) {
    if (this.type == "video") {
      let t =
        this.texture && this.texture.image && this.texture.image.pause
          ? this.texture.image
          : null;
      t && (!e && !t.paused && t.pause(), e && t.paused && t.play());
    }
  }
  update(e) {
    let t = properties.useMobileLayout,
      r = t
        ? this.isFullscreen
          ? 1
          : 0
        : projectDetailsSection.scrollPane.scrollPixel,
      n = t
        ? projectDetailsSection.scrollPane.scrollPixel
        : this.isFullscreen
          ? 1
          : 0,
      a = this.ufxMesh.testViewport(-n, -r);
    if ((this.ufxMesh.update(-n, -r), a)) {
      if (
        ((this.uniforms.u_borderRadius.value =
          this.isFullscreen && !properties.useMobileLayout
            ? 0
            : properties.globalRadius),
        this.type == "image" || this.type == "video")
      )
        if (t) {
          let l = this.uniforms.u_domXY.value.y;
          this.uniforms.u_parallax.value = math.fit(
            l,
            -this.ufxMesh._domHeight,
            properties.viewportHeight,
            -0.5,
            0.5,
          );
        } else {
          let l = this.uniforms.u_domXY.value.x;
          this.uniforms.u_parallax.value = math.fit(
            l,
            -this.ufxMesh._domWidth,
            properties.viewportWidth,
            -0.5,
            0.5,
          );
        }
      ((this.activeTime += e),
        (this.uniforms.u_activeRatio.value = math.fit(
          this.activeTime,
          0,
          1,
          0,
          1,
          ease.expoOut,
        )),
        this.playPauseVideo(!!pagesManager.isIdle));
    } else ((this.activeTime = 0), this.playPauseVideo(!1));
    if (this.type == "image" || this.type == "video") {
      let l = this.uniforms.u_texture.value,
        c = l !== textureHelper.blackTexture && l.__loaded;
      this.uniforms.u_readyRatio.value = Math.min(
        1,
        this.uniforms.u_readyRatio.value + (c ? e : 0),
      );
    }
    if (this.type == "text")
      if (this.ufxMesh.testViewport(-n, -r)) {
        let l;
        t
          ? (l = math.unClampedFit(
              this.uniforms.u_domXY.value.y,
              properties.viewportHeight,
              -this.uniforms.u_domWH.value.y,
              0,
              1,
            ))
          : (l = math.unClampedFit(
              this.uniforms.u_domXY.value.x,
              properties.viewportWidth,
              -this.uniforms.u_domWH.value.x,
              0,
              1,
            ));
        let c = l > 0.2 && l < 0.8;
        this.uniforms.u_textRatio.value = math.clamp(
          this.uniforms.u_textRatio.value + e * (c ? this.textSpeed : 0),
          0,
          1,
        );
      } else this.uniforms.u_textRatio.value = 0;
  }
}
class ProjectDetailsItems {
  moveContainer;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  useItem(e) {
    let t = e.type,
      r;
    switch (t) {
      case "image":
        r = this.imageItemPool;
        break;
      case "video":
        r = this.videoItemPool;
        break;
      case "text":
        r = this.textItemPool;
        break;
    }
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      if (!l.isActive) return l;
    }
    let n = new ProjectDetailsItem(t);
    return (r.push(n), this.itemPool.push(n), n);
  }
  deactivateAll() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      t.isActive && (t.deactivate(), t.domWrapper.remove());
    }
  }
  pauseAllVideos() {
    for (let e = 0; e < this.itemPool.length; e++)
      this.itemPool[e].playPauseVideo(!1);
  }
  resizeAll(e, t, r) {
    let n = properties.useMobileLayout;
    for (let a = 0; a < this.itemPool.length; a++) {
      let l = this.itemPool[a];
      if (l.isActive) {
        let c = l.isFullscreen && !properties.useMobileLayout;
        (l.resize(e, c ? properties.viewportHeight : t, n),
          (l.domWrapper.style.top = (c ? -r : 0) + "px"));
      }
    }
  }
  syncDoms() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      t.isActive && t.syncDom();
    }
  }
  update(e, t, r) {
    for (let n = 0; n < this.itemPool.length; n++) {
      let a = this.itemPool[n];
      (a.isActive && a.update(e),
        a.isActive && a.ufxMesh.testViewport(-r, -t)
          ? (a.ufxMesh.visible = !0)
          : (a.ufxMesh.visible = !1));
    }
  }
}
const projectDetailsItems = new ProjectDetailsItems();
let _c1 = new Color(),
  _c2 = new Color();
class ProjectDetailsSection {
  projectDetailsDatas = {};
  projectDetailsData;
  domContainer;
  domHeaderInfo;
  domHeaderBackBtn;
  domTitle;
  domDesc;
  domCta;
  domSideListService;
  domSideListLinks;
  domDetailsItemsWrapper;
  domDetailsItemsMoveContainer;
  domPreview;
  domPreviewInner;
  domPreviewHeader;
  domPreviewTitle;
  domPreviewFooterBarInner;
  selectedId = "";
  contentShowRatio = 0;
  nextProjectRatio = 0;
  overScrollRatio = 0;
  overScrollSize = 0;
  previewInnerOffsetFrom = 0;
  previewInnerOffsetTo = 0;
  titleCenterOffsetY = 0;
  previewTitleColorDefaultColorHex = "#c2c3c7";
  previewTitleColorHex = "#000";
  previewShadow = 0;
  scrollPane;
  isVertical = null;
  VERTICAL_BREAK_PIONT = 1e3;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  projectDatas = {};
  sharedUniforms = {
    u_opacity: { value: 0 },
    u_isVertical: { value: 0 },
    u_scrollX: { value: 0 },
    u_highlightColor: { value: new Color() },
    u_bgColor: { value: new Color() },
    u_textColor: { value: new Color() },
  };
  domHeaderBackBtnHoverAnimation = { animating: !1, ratio: 0 };
  preInit(e) {
    ((this.domContainer = e.querySelector("#project-details")),
      (this.domContainer.style.backgroundColor = ""),
      (this.domHeaderInfo = e.querySelector("#project-details-header-info")),
      (this.domHeaderInfo._ratio = 0),
      (this.domHeaderInfo._hide = !1),
      (this.domHeaderBackBtn = document.querySelector(
        "#header-center-project-back-btn",
      )),
      (this.domHeaderInfoSvg = document.querySelector(
        "#project-details-header-info-svg",
      )),
      (this.domMeta = e.querySelector("#project-details-meta")),
      (this.domTitle = e.querySelector("#project-details-title")),
      (this.domDesc = e.querySelector("#project-details-desc")),
      (this.domCta = e.querySelector("#project-details-launch-cta")),
      (this.domCtaText = e.querySelector("#project-details-launch-cta-text")),
      (this.domCtaMobile = e.querySelector(
        "#project-details-launch-cta-mobile",
      )),
      (this.domCtaMobileText = e.querySelector(
        "#project-details-launch-cta-mobile-text",
      )),
      (this.domSideListService = e.querySelector(
        "#project-details-side-list-services",
      )),
      (this.domSideListLinks = e.querySelector(
        "#project-details-side-list-links",
      )),
      (this.domDetailsItemsWrapper = e.querySelector(
        "#project-details-items-wrapper",
      )),
      (this.domDetailsItemsMoveContainer = e.querySelector(
        "#project-details-items-move-container",
      )),
      (this.domPreview = e.querySelector("#project-details-preview")),
      (this.domPreviewInner = e.querySelector(
        "#project-details-preview-inner",
      )),
      (this.domPreviewTitle = e.querySelector(
        "#project-details-preview-title",
      )),
      (this.domPreviewFooter = e.querySelector(
        "#project-details-preview-footer",
      )),
      (this.domPreviewFooterBarInner = e.querySelector(
        "#project-details-preview-footer-bar-inner",
      )),
      (this.scrollPane = new ScrollPane()),
      (this.scrollPane.contentDom = this.domDetailsItemsMoveContainer),
      this.scrollPane.init(),
      projectDetailsScreen.preInit(this.domContainer));
  }
  preInitContent(e) {
    let t = e.pathNodes[1];
    this.projectDetailsDatas[t] = new ProjectDetailsData(t, e.dom);
  }
  _onModelLoad(e) {}
  init() {
    (projectDetailsScreen.init(),
      projectPage.onHideCompleted.add(() => {
        projectDetailsItems.pauseAllVideos();
      }));
  }
  show(e) {
    (this._disposeLayout(),
      this._initLayout(e),
      (this.overScrollRatio = 0),
      (this.scrollPane.isActive = !0),
      this.scrollPane.scrollToPixel(0, !0),
      this.scrollPane.update(0),
      (this.scrollPane.isActive = !1),
      this.updatePreviewUI(e, !0),
      this.resize(properties.viewportWidth, properties.viewportHeight),
      this.update(0, !0));
  }
  updatePreviewUI(e, t = !0) {
    let r = this.projectDetailsDatas[e];
    t
      ? ((this.domPreviewTitle.innerHTML = r.nextTitle),
        (projectDetailsScreen.previewBgColorHex = r.nextColorBg),
        (this.previewTitleColorHex = r.nextColorText),
        (this.previewShadow = r.nextShadow))
      : ((this.domPreviewTitle.innerHTML = r.title),
        (projectDetailsScreen.previewBgColorHex = r.colorBg),
        (this.previewTitleColorHex = r.colorText),
        (this.previewShadow = r.shadow));
  }
  _disposeLayout() {
    let e = this.projectDetailsData;
    projectDetailsItems.deactivateAll();
    if (!e) {
      window.addEventListener("wheel", this._onWindowWheel.bind(this), {
        once: !0,
      });
    } else {
      e.domServiceSideListItems?.forEach((t) => {
        t.remove();
      });
      e.domLinkSideListItems?.forEach((t) => {
        t.remove();
      });
    }
  }
  _initLayout(e) {
    let t = (this.projectDetailsData = this.projectDetailsDatas[e]);
    if (!t) return;
    if (t.nextId) {
      routeManager.preFetch("/projects/" + t.nextId);
    }
    if (this.domTitle) this.domTitle.innerHTML = t.title || "";
    if (this.domDesc) this.domDesc.innerHTML = t.desc || "";
    if (this.domCtaText) this.domCtaText.textContent = t.ctaTitle || "";
    if (this.domCtaMobileText) this.domCtaMobileText.textContent = t.ctaTitle || "";
    if (this.domCta) {
      if (routeManager.parseUrl(t.ctaUrl)) {
        this.domCta.href = t.ctaUrl;
        if (this.domCtaMobile) this.domCtaMobile.href = t.ctaUrl;
        this.domContainer?.classList.add("has-cta");
      } else {
        this.domContainer?.classList.remove("has-cta");
      }
    }
    if (this.domSideListService) {
      this.domSideListService.style.visibility =
        t.domServiceSideListItems && t.domServiceSideListItems.length > 1 ? "visible" : "hidden";
      t.domServiceSideListItems?.forEach((r) => {
        this.domSideListService.appendChild(r);
      });
    }
    if (this.domSideListLinks) {
      this.domSideListLinks.style.visibility =
        t.domLinkSideListItems && t.domLinkSideListItems.length > 1 ? "visible" : "hidden";
      t.domLinkSideListItems?.forEach((r) => {
        this.domSideListLinks.appendChild(r);
      });
    }
    if (t.colorHighlight) this.sharedUniforms.u_highlightColor.value.setStyle(t.colorHighlight);
    if (t.colorText) this.sharedUniforms.u_textColor.value.setStyle(t.colorText);
    if (t.colorBg) this.sharedUniforms.u_bgColor.value.setStyle(t.colorBg);
    if (this.domHeaderBackBtn) {
      this.domHeaderBackBtn.addEventListener(
        "click",
        this._onBackBtnClick.bind(this),
      );
    }
    for (let r in t) {
      if (typeof t[r] === "string" && r.startsWith("color")) {
        let a = r
          .replace(/^color/, "")
          .replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (l, c, u) => c + "-" + u)
          .toLowerCase();
        properties.domRoot.style.setProperty("--project-details-" + a, t[r]);
      }
    }
    if (t.colorHighlight) {
      properties.domRoot.style.setProperty("--header-color", t.colorHighlight);
      if (header?.domContainer) header.domContainer.style.color = t.colorHighlight;
    }
    if (t.colorBtnText) {
      properties.domRoot.style.setProperty("--header-text-color", t.colorBtnText);
    }
    if (this.domDetailsItemsMoveContainer) {
      t.itemDataList?.forEach((r) => {
        let n = projectDetailsItems.useItem(r);
        n.activate(r);
        this.domDetailsItemsMoveContainer.appendChild(n.domWrapper);
      });
    }
  }
  _onBackBtnClick() {
    this.scrollPane.isActive &&
      pagesManager.isIdle &&
      routeManager.setPath(projectPage.prevNonProjectPath || "/");
  }
  _splitText() {}
  hide(e, t, r) {
    (r(), (this.scrollPane.isActive = !1));
  }
  resize(e, t) {
    this._splitText();
    let r = properties.useMobileLayout;
    ((this.sharedUniforms.u_isVertical.value = r ? 1 : 0),
      r
        ? (this.domMeta.style.transform = "translateZ(0)")
        : (this.domMeta.style.transform = "translate3d(0,-50%,0)"));
    let n = this.domMeta.getBoundingClientRect();
    ((this.domDetailsItemsMoveContainer.style.paddingTop =
      (r ? n.bottom : 0) + "px"),
      r
        ? ((this.overScrollSize =
            this.domPreviewInner.getBoundingClientRect().height),
          (this.domDetailsItemsMoveContainer.style.paddingRight = 0),
          (this.domDetailsItemsMoveContainer.style.paddingBottom =
            this.overScrollSize +
            this.domDetailsItemsWrapper.getBoundingClientRect().top +
            "px"))
        : ((this.overScrollSize = properties.viewportWidth * 0.25),
          (this.domDetailsItemsMoveContainer.style.paddingRight =
            this.overScrollSize + "px"),
          (this.domDetailsItemsMoveContainer.style.paddingBottom = 0)));
    let a = this.domDetailsItemsMoveContainer.getBoundingClientRect();
    projectDetailsItems.resizeAll(a.width, a.height, a.top);
    let l = this.domTitle.getBoundingClientRect();
    if (r) {
      let c = this.domPreviewTitle.getBoundingClientRect(),
        u = this.domPreviewInner.getBoundingClientRect();
      ((this.previewInnerOffsetFrom = 0),
        (this.previewInnerOffsetTo = l.top - (c.top - u.top)));
    } else
      ((this.previewInnerOffsetFrom = this.overScrollSize * 0.2),
        (this.previewInnerOffsetTo = n.left));
    ((this.domHeaderInfo.style.bottom =
      (properties.viewportHeight -
        this.domDetailsItemsWrapper.getBoundingClientRect().bottom) /
        2 -
      this.domHeaderInfo.getBoundingClientRect().height / 2 +
      "px"),
      (this.titleCenterOffsetY = r
        ? 0
        : properties.viewportHeight * 0.5 - n.top - l.height * 0.5),
      (this.domPreviewTitle.style.width = l.width + "px"),
      (this.scrollPane.isVertical = r),
      (this.scrollPane.isActive = !0),
      this.scrollPane.resize(e, t),
      this.scrollPane.update(0),
      (this.scrollPane.isActive = !1),
      projectDetailsItems.syncDoms(),
      projectDetailsScreen.resize(e, t));
  }
  update(e, t = !1) {
    let r = this.projectDetailsData;
    if (!r) return;
    let n = properties.useMobileLayout,
      a = n ? 0 : this.scrollPane.scrollPixel,
      l = n ? this.scrollPane.scrollPixel : 0,
      c = math.fit(
        projectPage.showRatio * (1 - projectPage.hideRatio),
        0.5,
        1,
        0,
        1,
      ),
      u = math.fit(c, 0, 0.5, 0, 1, ease.expoOut);
    ((this.domHeaderBackBtn.style.transform = `translate3d(0,${1 - u}em,0)`),
      (this.domHeaderBackBtn.style.opacity = u),
      (this.scrollPane.isActive =
        projectPage.nextProjectRatio == 0 &&
        projectPage.contentShowRatio > 0.75),
      projectPage.contentShowRatio <= 0.75 &&
        this.scrollPane.scrollToPixel(0, !0),
      this.scrollPane.update(e));
    let f =
      (this.scrollPane.contentSize + 1) * this.scrollPane.viewSizePixel -
      this.scrollPane.scrollPixel -
      this.overScrollSize;
    (n
      ? (f = Math.min(f, l + properties.viewportHeight))
      : (f = Math.min(f, a + properties.viewportWidth)),
      (f = math.fit(
        projectPage.nextProjectRatio,
        0,
        1,
        f,
        0,
        ease.quintInOut,
      )));
    let p = math.fit(
      projectPage.nextProjectRatio,
      0,
      1,
      this.previewInnerOffsetFrom,
      this.previewInnerOffsetTo,
    );
    (n
      ? ((this.domPreview.style.transform = `translate3d(0, ${f}px, 0)`),
        (this.domPreviewInner.style.transform = `translate3d(0, ${p}px, 0)`))
      : ((this.domPreview.style.transform = `translate3d(${f}px, 0, 0)`),
        (this.domPreviewInner.style.transform = `translate3d(${p}px, 0, 0)`)),
      (this.domPreviewFooterBarInner.style.transform = `scaleX(${this.overScrollRatio})`));
    let g =
        c *
        math.fit(projectPage.nextProjectRatio, 0, 0.5, 1, 0) *
        math.fit(projectPage.contentShowRatio, 0.5, 1, 0, 1),
      v = 1;
    n
      ? (this.domMeta.style.transform =
          this.domDetailsItemsMoveContainer.style.transform)
      : ((this.domMeta.style.transform = "translate3d(0,-50%,0)"),
        (v = math.fit(
          this.scrollPane.scrollPixel,
          0,
          (n ? properties.viewportHeight : properties.viewportWidth) * 0.25,
          1,
          0,
        )),
        (v =
          Math.min(1 - projectPage.nextProjectRatio, v, c) *
          math.fit(projectPage.nextProjectRatio, 0, 0.3, 1, 0)));
    let _ = math.fit(projectPage.nextProjectRatio, 0.75, 1, 0, 1);
    ((this.domPreviewFooter.style.opacity = ease.expoInOut(g)),
      (this.domPreviewTitle.style.color = _c1
        .setStyle(this.previewTitleColorDefaultColorHex)
        .lerp(_c2.setStyle(this.previewTitleColorHex), _)
        .getStyle()),
      (projectDetailsScreen.previewColorRatio = _),
      (projectDetailsScreen.previewBgThreshold =
        f / (n ? properties.viewportHeight : properties.viewportWidth)),
      (projectDetailsScreen.shadow = math.mix(
        r.shadow,
        this.previewShadow,
        projectPage.nextProjectRatio,
      )),
      this.domMeta.classList.toggle("is-active", v > 0.5),
      (this.domTitle.style.transform = `translate3d(${this.scrollPane.x / 2}px, ${math.fit(projectPage.contentShowRatio, 0, 0.65, this.titleCenterOffsetY, 0, ease.expoInOut)}px, 0)`),
      (this.domTitle.style.opacity = v));
    let T = math.fit(
      projectPage.contentShowRatio,
      0.4,
      0.85,
      0,
      1,
      ease.expoOut,
    );
    if (this.domDesc) {
      this.domDesc.style.transform = `translate3d(${this.scrollPane.x / 3}px, ${(1 - T) * 30}px, 0)`;
      this.domDesc.style.opacity = Math.min(v, T);
    }
    T = math.fit(
      projectPage.contentShowRatio,
      0.45,
      0.9,
      0,
      1,
      ease.expoOut,
    );
    if (this.domCta) {
      this.domCta.style.transform = `translate3d(0, ${(1 - T) * 30}px, 0)`;
      this.domCta.style.opacity = Math.min(v, T);
    }
    T = math.fit(
      projectPage.contentShowRatio,
      0.5,
      0.95,
      0,
      1,
      ease.expoOut,
    );
    if (this.domSideListService) {
      this.domSideListService.style.transform = `translate3d(${this.scrollPane.x / 5}px, ${(1 - T) * 30}px, 0)`;
      this.domSideListService.style.opacity = Math.min(v, T);
    }
    T = math.fit(projectPage.contentShowRatio, 0.55, 1, 0, 1, ease.expoOut);
    if (this.domSideListLinks) {
      this.domSideListLinks.style.transform = `translate3d(${this.scrollPane.x / 4}px, ${(1 - T) * 30}px, 0)`;
      this.domSideListLinks.style.opacity = Math.min(v, T);
    }
    if (this.domHeaderInfo) {
      this.domHeaderInfo._ratio = math.saturate(
        this.domHeaderInfo._ratio + (this.domHeaderInfo._hide ? e : -e),
      );
      this.domHeaderInfo.style.opacity =
        T - ease.expoOut(this.domHeaderInfo._ratio);
    }
    this.sharedUniforms.u_opacity.value = g;
    projectDetailsItems.update(e, a, l);
    if (!t) projectDetailsScreen.update(e);

    if (this.scrollPane.isActive && pagesManager.isIdle) {
      let M =
        this.scrollPane.targetScrollPixel >=
        this.scrollPane.contentSize * this.scrollPane.viewSizePixel - 1,
        S = properties.useMobileLayout
          ? input.deltaDragScrollY + input.deltaWheel
          : input.deltaDragScrollX + input.deltaWheel;
      this.overScrollRatio = math.saturate(
        this.overScrollRatio + e * (M && S > 0 ? 3 : S < 0 ? -5 : -0.2),
      );
      if (this.overScrollRatio === 1) {
        routeManager.setPath("/projects/" + r.nextId);
      }
    }
  }
  _onWindowWheel() {
    this.domHeaderInfo._hide = !0;
  }
}
const projectDetailsSection = new ProjectDetailsSection();

globalThis.vert$b = vert$b;
globalThis.frag$f = frag$f;
globalThis.ProjectDetailsData = ProjectDetailsData;
globalThis.ProjectDetailsItem = ProjectDetailsItem;
globalThis.ProjectDetailsItems = ProjectDetailsItems;
globalThis.ProjectDetailsSection = ProjectDetailsSection;
globalThis.projectDetailsScreen = projectDetailsScreen;
globalThis.projectDetailsSection = projectDetailsSection;

export {
  ProjectDetailsScreen,
  ProjectDetailsData,
  ProjectDetailsItem,
  ProjectDetailsItems,
  ProjectDetailsSection,
  projectDetailsScreen,
  projectDetailsSection,
  vert$b,
  frag$f
};
export default projectDetailsScreen;
