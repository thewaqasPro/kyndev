var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);
function getDefaultExportFromCjs(o) { return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o; }
const ufxVert = globalThis.ufxVert;
const goalBlackTunnelTransformShader = `#define GLSLIFY 1
uniform float u_blackTunnelTransformRatio;vec3 goalBlackTunnelTransform(vec3 pos){float t=u_blackTunnelTransformRatio*6.2831853;float zWeight=pos.z*0.025;float angle=t*zWeight*zWeight*sign(zWeight);float sa=sin(angle);float ca=cos(angle);mat2 m2=mat2(ca,-sa,sa,ca);pos.xy=m2*pos.xy;pos.z+=t*1.;pos=pos.xzy;float rad=20.;pos/=rad;vec3 a=pos;vec2 pq=vec2(-1.,.5)*t;float ada=dot(a,a);vec4 b=vec4(2.*a,ada-1.)/(1.+ada);vec4 pq_cs=vec4(cos(pq),sin(pq)).xzyw;vec2 np1=vec2(-1.,1.);vec4 c=(b.xxyy*np1.yxyy*pq_cs+b.zzww*np1.yyxy*pq_cs.yxwz).xzyw;pos=c.xyz/(1.-c.w);pos=pos.xzy;return pos*rad;}`;
globalThis.goalBlackTunnelTransformShader = goalBlackTunnelTransformShader;

/**
 * 3D Goal Scene: Space Tunnels, Voronoi Glass, Rigged Astronaut & Particles
 */
import * as THREE from "../../three.js";
const MathUtils$1 = THREE.MathUtils;
const vert$h = `#define GLSLIFY 1
attribute float ao;attribute float areaRatio;attribute float cluster;attribute float height;attribute vec3 center;attribute vec3 instancePos;attribute vec3 instanceGridIds;attribute vec3 instanceAxis;attribute vec4 tangent;uniform float u_time;uniform float u_showRatio;uniform float u_offsetZ;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying float v_ao;varying float v_opacity;varying float v_emission;varying vec2 v_uv;varying vec4 v_rands;varying float v_depth;
#define PI 3.14159265359
vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float angle){float halfAngle=angle*0.5;return vec4(axis*sin(halfAngle),cos(halfAngle));}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash44(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}
#include <goalBlackTunnelTransform>
void main(){vec3 pos=position;vec3 nor=normal;vec3 tang=tangent.xyz;
#ifdef IS_HD
float blockId=floor(pos.x+0.5);
#else
float blockId=0.;
#endif
vec4 q;vec3 offsetInstanceGridIds=instanceGridIds;offsetInstanceGridIds.z-=floor(u_offsetZ/float(GRID_SIZE))*2.;vec4 instanceRand1s=hash44(floor(vec4(offsetInstanceGridIds+.5,blockId+cluster)));v_rands=hash44(floor(vec4(offsetInstanceGridIds+.5,100.0)));float showRatio=u_showRatio;showRatio*=1.-step(10.5,instanceGridIds.z)*mod(u_offsetZ/float(GRID_SIZE),1.);
#ifdef IS_HD
pos=mix(center,pos,showRatio);
#else
pos.xy*=showRatio*showRatio;pos.z*=showRatio;
#endif
#ifdef IS_HD
pos.x-=blockId;float blockOffset=sin(u_time*2.+cos(u_time*4.+0.2+offsetInstanceGridIds.z))*0.15*instanceRand1s.y;float heightRatio=1.;pos.y=pos.y*height*heightRatio+(0.025+blockOffset);float variation=floor(instanceRand1s.x*8.);q=quaternion(vec3(0.,0.,variation>3.5 ?-1. : 1.),(mod(blockId,4.)+mod(variation,4.))*PI*0.5);pos=qrotate(q,pos);nor=qrotate(q,nor);tang=qrotate(q,tang);
#endif
q=quaternion(instanceAxis,PI*0.5);pos=qrotate(q,pos)*float(GRID_SIZE)+instancePos;nor=qrotate(q,nor);tang=qrotate(q,tang);pos.z+=mod(u_offsetZ,float(GRID_SIZE));v_depth=-pos.z;pos=goalBlackTunnelTransform(pos);
#ifdef IS_HD
v_ao=ao;v_emission=areaRatio<0.25 ? sin(pos.z*0.25-u_time)*0.5+0.5 : 0.;
#else
v_ao=1.;v_emission=0.;
#endif
v_opacity=linearStep(57.,30.,length(pos.xy))*linearStep(5.+100.,5.+100.-20.,cameraPosition.z-pos.z);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}`,
  frag$k = `#define GLSLIFY 1
uniform sampler2D u_feedbackTexture;uniform sampler2D u_greebleArmbTexture;uniform sampler2D u_greebleNormalTexture;uniform vec2 u_resolution;uniform float u_outRatio;uniform vec3 u_outBloomFromToStrength;uniform vec3 u_color1;uniform vec3 u_color2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec4 v_rands;varying float v_ao;varying float v_opacity;varying float v_emission;varying float v_depth;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 worldNormal=normalize(v_worldNormal)*faceDirection;vec3 worldTangent=normalize(v_worldTangent.xyz)*faceDirection;vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_greebleNormalTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_greebleArmbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 lightPos=vec3(0.0,-0.0,-100.0);vec3 toLight=normalize(lightPos-v_worldPosition);float diffuse=(dot(worldNormal,toLight)*0.5+0.5);
#ifdef IS_HD
float feedbackMultiplier=2.5;
#else
float feedbackMultiplier=2.0;
#endif
vec3 color1=u_color1;vec3 color2=u_color2;vec3 baseColor=0.5+mix(color1,color2,v_rands.x)*1.2;vec3 emissiveColor=mix(color1,color2,v_rands.y)*3.5;diffuse*=(0.5+texture2D(u_feedbackTexture,screenUv+worldNormal.xy*0.02).r*feedbackMultiplier);gl_FragColor.rgb=baseColor*vec3(ao*0.75*diffuse)+emissiveColor*v_emission;gl_FragColor.rgb*=v_opacity;float endBloomStrength=linearStep(u_outBloomFromToStrength.x,u_outBloomFromToStrength.y,v_depth)*u_outBloomFromToStrength.z;float bloomScale=linearStep(5.0,20.0,v_depth)*(1.0-linearStep(15.0,25.0,length(v_worldPosition.xy)));gl_FragColor.a=bloomScale*max(0.,dot(gl_FragColor.rgb,vec3(.299,.587,.114))*2.5-1.)+endBloomStrength*0.75;gl_FragColor.rgb+=endBloomStrength*(0.35+gl_FragColor.rgb*0.65);}`;
globalThis.vert$h = vert$h;
globalThis.frag$k = frag$k;

const fragmentShader$4 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform mat4 u_projectionViewInverseMatrix;uniform mat4 u_prevProjectionViewMatrix;uniform vec2 u_aspect;uniform float u_amount;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 bnoise=getBlueNoise(gl_FragCoord.xy);float depth=texture2D(u_depthTexture,v_uv+bnoise.yz*0.01*u_aspect).r;vec4 ndc=vec4(v_uv.xy*2.0-1.0,depth,1.0);vec4 worldPos=u_projectionViewInverseMatrix*ndc;vec4 prevPos=u_prevProjectionViewMatrix*worldPos;prevPos/=prevPos.w;prevPos.xy=prevPos.xy*0.5+0.5;vec2 velocity=(prevPos.xy-v_uv)/16.0*u_amount;vec2 uv=v_uv+bnoise.xy*velocity;vec4 color=vec4(0.0);float weightSum=0.0;float weight=1.0;float weightFalloff=1.0;for(int i=0;i<16;i++){color+=texture2D(u_texture,uv)*weight;uv+=velocity;weightSum+=weight;weight*=weightFalloff;}gl_FragColor=color/weightSum;}`;
globalThis.fragmentShader$4 = fragmentShader$4;

class GoalTunnelEfx extends PostEffect {
  needsSync = !0;
  amount = 1;
  _position = null;
  _quaternion = null;
  _scale = null;
  _q = null;
  projectionMatrix = null;
  prevProjectionMatrix = null;
  projectionViewMatrix = null;
  prevProjectionViewMatrix = null;
  projectionViewInverseMatrix = null;
  offsetPostion = null;
  offsetRotation = null;
  offsetScale = null;
  isActive = !1;
  init(e) {
    (Object.assign(this, e),
      super.init(),
      (this._position = new Vector3()),
      (this._quaternion = new Quaternion()),
      (this._scale = new Vector3(1, 1, 1)),
      (this._q = new Quaternion()),
      (this.offsetPostion = new Vector3(0, 0, 0)),
      (this.offsetRotation = new Euler(0, 0, 0)),
      (this.offsetScale = new Vector3(1, 1, 1)),
      (this.projectionViewMatrix = new Matrix4()),
      (this.prevProjectionViewMatrix = new Matrix4()),
      (this.projectionViewInverseMatrix = new Matrix4()),
      (this.finalPrevMatrix = new Matrix4()),
      (this.extraTransformMatrix = new Matrix4()),
      (this.material = fboHelper.createRawShaderMaterial({
        uniforms: Object.assign(
          {
            u_time: properties.sharedUniforms.u_time,
            u_texture: { value: null },
            u_depthTexture: { value: null },
            u_amount: { value: 1 },
            u_aspect: properties.postprocessing.sharedUniforms.u_aspect,
            u_projectionViewInverseMatrix: {
              value: this.projectionViewInverseMatrix,
            },
            u_prevProjectionViewMatrix: { value: this.finalPrevMatrix },
          },
          blueNoise.sharedUniforms,
        ),
        fragmentShader: fragmentShader$4,
      })));
  }
  needsRender(e) {
    let t = this.amount > 0;
    return ((this.needsSync = !t), t && this.isActive);
  }
  syncCamera(e) {
    ((this.needsSync = !0),
      e &&
        (e.matrixWorldInverse.decompose(
          this._position,
          this._quaternion,
          this._scale,
        ),
        this.projectionViewMatrix.multiplyMatrices(
          e.projectionMatrix,
          e.matrixWorldInverse,
        ),
        this.projectionViewInverseMatrix
          .copy(this.projectionViewMatrix)
          .invert()),
      this.prevProjectionViewMatrix.copy(this.projectionViewMatrix));
  }
  render(e, t = !1) {
    let r = e.camera;
    ((this.material.uniforms.u_depthTexture =
      e.sharedUniforms.u_sceneDepthTexture),
      (this.material.uniforms.u_amount.value = this.amount),
      this.needsSync || e.hasSizeChanged
        ? (this.syncCamera(r), (this.needsSync = !1))
        : this.prevProjectionViewMatrix.copy(this.projectionViewMatrix),
      this.projectionViewMatrix.multiplyMatrices(
        r.projectionMatrix,
        r.matrixWorldInverse,
      ),
      this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert(),
      this.extraTransformMatrix
        .compose(
          this.offsetPostion,
          this._q.setFromEuler(this.offsetRotation),
          this.offsetScale,
        )
        .invert(),
      this.finalPrevMatrix.copy(this.prevProjectionViewMatrix),
      this.finalPrevMatrix.multiply(this.extraTransformMatrix),
      super.render(e, t));
  }
}
const goalTunnelEfx = new GoalTunnelEfx(),
  _c1$3 = new Color(),
  _c2$2 = new Color(),
  COLOR_1 = ["#0d2b27", "#ba0000", "#00b5a6", "#0099ff"],
  COLOR_2 = ["#8c8c8c", "#008e6b", "#7e7f05", "#ff0000"];
class GoalBlackTunnel {
  container = new Object3D();
  GRID_SIZE = 20;
  textures = {};
  feedbackRenderTarget = null;
  _structureGeometries = {};
  _baseGeometries = {};
  sharedUniforms = {
    u_blackTunnelTransformRatio: { value: 0 },
    u_showRatio: { value: 1 },
    u_outBloomFromToStrength: { value: new Vector3(0, 70, 0) },
    u_offsetZ: { value: 0 },
    u_feedbackTexture: { value: null },
    u_greebleArmbTexture: { value: null },
    u_greebleNormalTexture: { value: null },
    u_color1: { value: new Color() },
    u_color2: { value: new Color() },
  };
  textureTypeList = ["arm", "base", "nor"];
  timeBasedPulseTime = 0;
  timeBasedLinearTime = 0;
  preInit() {
    let e = ["ld", "hd"];
    (shaderHelper.addChunk(
      "goalBlackTunnelTransform",
      goalBlackTunnelTransformShader,
    ),
      (this.feedbackRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this.feedbackRenderTarget.texture.wrapS =
        this.feedbackRenderTarget.texture.wrapT =
          MirroredRepeatWrapping),
      (this.sharedUniforms.u_feedbackTexture.value =
        this.feedbackRenderTarget.texture));
    for (let t = 0; t < e.length; t++) {
      let r = e[t];
      (properties.loader.add(
        settings.MODEL_PATH + "tunnels/grid_structure_" + r + ".buf",
        { onLoad: this._onGeometryLoad.bind(this, r, "structure") },
      ),
        properties.loader.add(
          settings.MODEL_PATH + "tunnels/grid_base_" + r + ".buf",
          { onLoad: this._onGeometryLoad.bind(this, r, "base") },
        ));
    }
    for (let t = 0; t < this.textureTypeList.length; t++) {
      let r = this.textureTypeList[t];
      properties.loader.add(
        settings.TEXTURE_PATH + "tunnels/grids/greeble_" + r + ".webp",
        { type: "texture", onLoad: this._onGreebleTextureLoad.bind(this, r) },
      );
    }
  }
  _onGeometryLoad(e, t, r) {
    t == "structure"
      ? (this._structureGeometries[e] = r)
      : (this._baseGeometries[e] = r);
    let n = this._baseGeometries[e],
      a = this._structureGeometries[e];
    if (
      n &&
      a &&
      n.attributes &&
      a.attributes &&
      a.attributes.position &&
      a.attributes.gridIds &&
      a.attributes.rotAxis
    ) {
      let l = new InstancedBufferGeometry();
      for (let f in n.attributes) l.attributes[f] = n.attributes[f];
      ((l.index = n.index),
        l.setAttribute(
          "instancePos",
          new InstancedBufferAttribute(a.attributes.position.array, 3),
        ),
        l.setAttribute(
          "instanceGridIds",
          new InstancedBufferAttribute(a.attributes.gridIds.array, 3),
        ),
        l.setAttribute(
          "instanceAxis",
          new InstancedBufferAttribute(a.attributes.rotAxis.array, 3),
        ));
      let c = Object.assign(
          {
            u_time: goalTunnels.sharedUniforms.u_tunnelTime,
            u_resolution: properties.sharedUniforms.u_resolution,
          },
          this.sharedUniforms,
        ),
        u = new Mesh(
          l,
          new ShaderMaterial({
            uniforms: c,
            vertexShader: vert$h,
            fragmentShader: frag$k,
            side: DoubleSide,
          }),
        );
      ((u.material.defines.GRID_SIZE = this.GRID_SIZE),
        (u.material.defines.IS_HD = e == "hd"),
        (u.frustumCulled = !1),
        e == "hd"
          ? ((u.onAfterRender = this._onAfterRender.bind(this)),
            (u.renderOrder = 2))
          : (u.renderOrder = 1),
        this.container.add(u));
    }
  }
  _onAfterRender() {
    let e = fboHelper.getColorState(),
      t = fboHelper.renderer.getRenderTarget();
    (fboHelper.clearMultisampleRenderTargetState(t),
      fboHelper.copy(t.texture, this.feedbackRenderTarget),
      fboHelper.renderer.setRenderTarget(t),
      fboHelper.setColorState(e));
  }
  _onGreebleTextureLoad(e, t) {
    if (
      ((this.textures[e] = t),
      (t.wrapS = t.wrapT = RepeatWrapping),
      e == "arm" || e == "base")
    ) {
      let r = this.textures.arm,
        n = this.textures.base;
      if (r && n) {
        let a = fboHelper.createRenderTarget(
          r.image.width,
          r.image.height,
          !1,
          !1,
        );
        ((a.texture.wrapS = a.texture.wrapT = RepeatWrapping),
          (this.textures.arm = this.textures.base = null),
          fboHelper.copy(textureHelper.transparentTexture, a),
          textureHelper.mixChannels(r, a, 0, 1, 2, -1),
          textureHelper.mixChannels(n, a, -1, -1, -1, 0),
          r.dispose(),
          n.dispose(),
          (this.sharedUniforms.u_greebleArmbTexture.value = a.texture));
      }
    } else this.sharedUniforms.u_greebleNormalTexture.value = t;
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = 0,
      r = Math.floor(properties.width * 0.25),
      n = Math.floor(properties.height * 0.25);
    (this.feedbackRenderTarget.width != r ||
      this.feedbackRenderTarget.height != n) &&
      (this.feedbackRenderTarget.setSize(r, n),
      fboHelper.clearColor(0, 0, 0, 1, this.feedbackRenderTarget));
    let a = -80 * math.cUnMix(0.2, 0, goalTunnels.blackTunnelRatio);
    ((t += a - this.container.position.z),
      (this.container.position.z = a),
      (this.sharedUniforms.u_showRatio.value = goalTunnels.isBlackTunnelActive
        ? ease.expoIn(math.cUnMix(0, 0.1, goalTunnels.blackTunnelRatio))
        : 0));
    let l = this.sharedUniforms.u_outBloomFromToStrength.value;
    ((l.z = math.fit(goalTunnels.blackTunnelRatio, 0.65, 0.75, 0, 0.2)),
      (l.z = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, l.z, 0.15)),
      (l.z = math.fit(goalTunnels.blackTunnelRatio, 0.85, 1, l.z, 0.15)),
      (l.x = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, 20, 60)),
      (l.x = math.fit(goalTunnels.blackTunnelRatio, 0.9, 1, l.x, 30)));
    let c = math.fit(goalTunnels.blackTunnelRatio, 0.6, 1, 0, 1, ease.sineIn);
    this.sharedUniforms.u_blackTunnelTransformRatio.value = c;
    const u =
      (input.lastScrollYDirection < 0 ? -1 : 1) * goalTunnels.tunnelDeltaTime;
    ((this.timeBasedPulseTime +=
      u *
      math.cUnMix(0.1, 0.3, goalTunnels.blackTunnelRatio) *
      math.fit(c, 0, 0.25, 1, 0.5)),
      (this.timeBasedLinearTime += u * math.fit(c, 0, 0.25, 1.5, 1)));
    let f = this.timeBasedPulseTime,
      p = Math.floor(f),
      g = f - p,
      _ =
        (p + ease.cubicInOut(g)) * this.GRID_SIZE +
        this.timeBasedLinearTime * this.GRID_SIZE +
        goalTunnels.blackTunnelRatio * this.GRID_SIZE * 10;
    ((t += _ - this.sharedUniforms.u_offsetZ.value),
      (this.sharedUniforms.u_offsetZ.value = _),
      (goalTunnels.properties.cameraDollyZoomFovOffset =
        Math.sin(goalTunnels.blackTunnelRatio * 10 + properties.time * 1) *
        7.5 *
        math.smoothstep(0, 0.2, goalTunnels.blackTunnelRatio)));
    let T =
        COLOR_1.length * math.fit(goalTunnels.blackTunnelRatio, 0.2, 1, 0, 1),
      M = Math.floor(T),
      S = Math.min(Math.ceil(T), COLOR_1.length - 1),
      b = T - M;
    (_c1$3.set(COLOR_1[M]),
      _c2$2.set(COLOR_1[S]),
      _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0),
      this.sharedUniforms.u_color1.value.copy(_c1$3),
      _c1$3.set(COLOR_2[M]),
      _c2$2.set(COLOR_2[S]),
      _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0),
      this.sharedUniforms.u_color2.value.copy(_c1$3),
      (goalTunnelEfx.offsetPostion.z =
        t * math.fit(goalTunnels.blackTunnelRatio, 0, 0.2, 0, 1)),
      (goalTunnelEfx.offsetRotation.z = t * c * 0.01),
      (goalTunnelEfx.amount = 1));
  }
}
const goalBlackTunnel = new GoalBlackTunnel(),
  _changeEvent = { type: "change" },
  _startEvent = { type: "start" },
  _endEvent = { type: "end" };

class OrbitControls extends EventDispatcher {
  constructor(e, t) {
    (super(),
      t === void 0 &&
        console.warn(
          'THREE.OrbitControls: The second parameter "domElement" is now mandatory.',
        ),
      t === document &&
        console.error(
          'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.',
        ),
      (this.object = e),
      (this.domElement = t),
      (this.domElement.style.touchAction = "none"),
      (this.enabled = !0),
      (this.target = new Vector3()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.15),
      (this.enableZoom = !1),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
      }),
      (this.mouseButtons = {
        LEFT: MOUSE.ROTATE,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.PAN,
      }),
      (this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this.scale = 1),
      (this._domElementKeyEvents = null),
      (this.getPolarAngle = function () {
        return c.phi;
      }),
      (this.getAzimuthalAngle = function () {
        return c.theta;
      }),
      (this.getDistance = function () {
        return this.object.position.distanceTo(this.target);
      }),
      (this.listenToKeyEvents = function (Y) {
        (Y.addEventListener("keydown", Oe), (this._domElementKeyEvents = Y));
      }),
      (this.saveState = function () {
        (r.target0.copy(r.target),
          r.position0.copy(r.object.position),
          (r.zoom0 = r.object.zoom));
      }),
      (this.reset = function () {
        (r.target.copy(r.target0),
          r.object.position.copy(r.position0),
          (r.object.zoom = r.zoom0),
          (r.scale = 1),
          r.object.updateProjectionMatrix(),
          r.dispatchEvent(_changeEvent),
          r.update(),
          (a = n.NONE));
      }),
      (this.update = (function () {
        const Y = new Vector3(),
          we = new Quaternion().setFromUnitVectors(e.up, new Vector3(0, 1, 0)),
          Ee = we.clone().invert(),
          Fe = new Vector3(),
          Xe = new Quaternion(),
          tt = 2 * Math.PI;
        return function () {
          const ot = r.object.position;
          (Y.copy(ot).sub(r.target),
            Y.applyQuaternion(we),
            c.setFromVector3(Y),
            r.autoRotate && a === n.NONE && k(I()),
            r.enableDamping
              ? ((c.theta += u.theta * r.dampingFactor),
                (c.phi += u.phi * r.dampingFactor))
              : ((c.theta += u.theta), (c.phi += u.phi)));
          let je = r.minAzimuthAngle,
            We = r.maxAzimuthAngle;
          (isFinite(je) &&
            isFinite(We) &&
            (je < -Math.PI ? (je += tt) : je > Math.PI && (je -= tt),
            We < -Math.PI ? (We += tt) : We > Math.PI && (We -= tt),
            je <= We
              ? (c.theta = Math.max(je, Math.min(We, c.theta)))
              : (c.theta =
                  c.theta > (je + We) / 2
                    ? Math.max(je, c.theta)
                    : Math.min(We, c.theta))),
            (c.phi = Math.max(
              r.minPolarAngle,
              Math.min(r.maxPolarAngle, c.phi),
            )),
            c.makeSafe());
          let Ge = r.enableDamping
            ? (r.scale - 1) * r.dampingFactor + 1
            : r.scale;
          return (
            (c.radius *= Ge),
            (c.radius = Math.max(
              r.minDistance,
              Math.min(r.maxDistance, c.radius),
            )),
            r.enableDamping === !0
              ? r.target.addScaledVector(f, r.dampingFactor)
              : r.target.add(f),
            Y.setFromSpherical(c),
            Y.applyQuaternion(Ee),
            ot.copy(r.target).add(Y),
            r.object.lookAt(r.target),
            r.enableDamping === !0
              ? ((u.theta *= 1 - r.dampingFactor),
                (u.phi *= 1 - r.dampingFactor),
                f.multiplyScalar(1 - r.dampingFactor))
              : (u.set(0, 0, 0), f.set(0, 0, 0)),
            (r.scale = r.scale / Ge),
            p ||
            Fe.distanceToSquared(r.object.position) > l ||
            8 * (1 - Xe.dot(r.object.quaternion)) > l
              ? (r.dispatchEvent(_changeEvent),
                Fe.copy(r.object.position),
                Xe.copy(r.object.quaternion),
                (p = !1),
                !0)
              : !1
          );
        };
      })()),
      (this.dispose = function () {
        (r.domElement.removeEventListener("contextmenu", W),
          r.domElement.removeEventListener("pointerdown", Ue),
          r.domElement.removeEventListener("pointercancel", Me),
          r.domElement.removeEventListener("wheel", $),
          r.domElement.removeEventListener("pointermove", fe),
          r.domElement.removeEventListener("pointerup", Se),
          r._domElementKeyEvents !== null &&
            r._domElementKeyEvents.removeEventListener("keydown", Oe));
      }));
    const r = this,
      n = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      };
    let a = n.NONE;
    const l = 1e-6,
      c = new Spherical(),
      u = new Spherical(),
      f = new Vector3();
    let p = !1;
    const g = new Vector2(),
      v = new Vector2(),
      _ = new Vector2(),
      T = new Vector2(),
      M = new Vector2(),
      S = new Vector2(),
      b = new Vector2(),
      C = new Vector2(),
      w = new Vector2(),
      R = [],
      E = {};
    function I() {
      return ((2 * Math.PI) / 60 / 60) * r.autoRotateSpeed;
    }
    function F() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function k(Y) {
      u.theta -= Y;
    }
    function L(Y) {
      u.phi -= Y;
    }
    const D = (function () {
        const Y = new Vector3();
        return function (Ee, Fe) {
          (Y.setFromMatrixColumn(Fe, 0), Y.multiplyScalar(-Ee), f.add(Y));
        };
      })(),
      ne = (function () {
        const Y = new Vector3();
        return function (Ee, Fe) {
          (r.screenSpacePanning === !0
            ? Y.setFromMatrixColumn(Fe, 1)
            : (Y.setFromMatrixColumn(Fe, 0), Y.crossVectors(r.object.up, Y)),
            Y.multiplyScalar(Ee),
            f.add(Y));
        };
      })(),
      re = (function () {
        const Y = new Vector3();
        return function (Ee, Fe) {
          const Xe = r.domElement;
          if (r.object.isPerspectiveCamera) {
            const tt = r.object.position;
            Y.copy(tt).sub(r.target);
            let Re = Y.length();
            ((Re *= Math.tan(((r.object.fov / 2) * Math.PI) / 180)),
              D((2 * Ee * Re) / Xe.clientHeight, r.object.matrix),
              ne((2 * Fe * Re) / Xe.clientHeight, r.object.matrix));
          } else
            r.object.isOrthographicCamera
              ? (D(
                  (Ee * (r.object.right - r.object.left)) /
                    r.object.zoom /
                    Xe.clientWidth,
                  r.object.matrix,
                ),
                ne(
                  (Fe * (r.object.top - r.object.bottom)) /
                    r.object.zoom /
                    Xe.clientHeight,
                  r.object.matrix,
                ))
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.",
                ),
                (r.enablePan = !1));
        };
      })();
    function ce(Y) {
      r.object.isPerspectiveCamera
        ? (r.scale /= Y)
        : r.object.isOrthographicCamera
          ? ((r.object.zoom = Math.max(
              r.minZoom,
              Math.min(r.maxZoom, r.object.zoom * Y),
            )),
            r.object.updateProjectionMatrix(),
            (p = !0))
          : (console.warn(
              "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
            ),
            (r.enableZoom = !1));
    }
    function z(Y) {
      r.object.isPerspectiveCamera
        ? (r.scale *= Y)
        : r.object.isOrthographicCamera
          ? ((r.object.zoom = Math.max(
              r.minZoom,
              Math.min(r.maxZoom, r.object.zoom / Y),
            )),
            r.object.updateProjectionMatrix(),
            (p = !0))
          : (console.warn(
              "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
            ),
            (r.enableZoom = !1));
    }
    function j(Y) {
      g.set(Y.clientX, Y.clientY);
    }
    function X(Y) {
      b.set(Y.clientX, Y.clientY);
    }
    function Z(Y) {
      T.set(Y.clientX, Y.clientY);
    }
    function q(Y) {
      (v.set(Y.clientX, Y.clientY),
        _.subVectors(v, g).multiplyScalar(r.rotateSpeed));
      const we = r.domElement;
      (k((2 * Math.PI * _.x) / we.clientHeight),
        L((2 * Math.PI * _.y) / we.clientHeight),
        g.copy(v),
        r.update());
    }
    function ue(Y) {
      (C.set(Y.clientX, Y.clientY),
        w.subVectors(C, b),
        w.y > 0 ? ce(F()) : w.y < 0 && z(F()),
        b.copy(C),
        r.update());
    }
    function oe(Y) {
      (M.set(Y.clientX, Y.clientY),
        S.subVectors(M, T).multiplyScalar(r.panSpeed),
        re(S.x, S.y),
        T.copy(M),
        r.update());
    }
    function te(Y) {
      (Y.deltaY < 0 ? z(F()) : Y.deltaY > 0 && ce(F()), r.update());
    }
    function le(Y) {
      let we = !1;
      switch (Y.code) {
        case r.keys.UP:
          (re(0, r.keyPanSpeed), (we = !0));
          break;
        case r.keys.BOTTOM:
          (re(0, -r.keyPanSpeed), (we = !0));
          break;
        case r.keys.LEFT:
          (re(r.keyPanSpeed, 0), (we = !0));
          break;
        case r.keys.RIGHT:
          (re(-r.keyPanSpeed, 0), (we = !0));
          break;
      }
      we && (Y.preventDefault(), r.update());
    }
    function Te() {
      if (R.length === 1) g.set(R[0].pageX, R[0].pageY);
      else {
        const Y = 0.5 * (R[0].pageX + R[1].pageX),
          we = 0.5 * (R[0].pageY + R[1].pageY);
        g.set(Y, we);
      }
    }
    function K() {
      if (R.length === 1) T.set(R[0].pageX, R[0].pageY);
      else {
        const Y = 0.5 * (R[0].pageX + R[1].pageX),
          we = 0.5 * (R[0].pageY + R[1].pageY);
        T.set(Y, we);
      }
    }
    function G() {
      const Y = R[0].pageX - R[1].pageX,
        we = R[0].pageY - R[1].pageY,
        Ee = Math.sqrt(Y * Y + we * we);
      b.set(0, Ee);
    }
    function U() {
      (r.enableZoom && G(), r.enablePan && K());
    }
    function N() {
      (r.enableZoom && G(), r.enableRotate && Te());
    }
    function he(Y) {
      if (R.length == 1) v.set(Y.pageX, Y.pageY);
      else {
        const Ee = Le(Y),
          Fe = 0.5 * (Y.pageX + Ee.x),
          Xe = 0.5 * (Y.pageY + Ee.y);
        v.set(Fe, Xe);
      }
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      (k((2 * Math.PI * _.x) / we.clientHeight),
        L((2 * Math.PI * _.y) / we.clientHeight),
        g.copy(v));
    }
    function ve(Y) {
      if (R.length === 1) M.set(Y.pageX, Y.pageY);
      else {
        const we = Le(Y),
          Ee = 0.5 * (Y.pageX + we.x),
          Fe = 0.5 * (Y.pageY + we.y);
        M.set(Ee, Fe);
      }
      (S.subVectors(M, T).multiplyScalar(r.panSpeed), re(S.x, S.y), T.copy(M));
    }
    function de(Y) {
      const we = Le(Y),
        Ee = Y.pageX - we.x,
        Fe = Y.pageY - we.y,
        Xe = Math.sqrt(Ee * Ee + Fe * Fe);
      (C.set(0, Xe),
        w.set(0, Math.pow(C.y / b.y, r.zoomSpeed)),
        ce(w.y),
        b.copy(C));
    }
    function xe(Y) {
      (r.enableZoom && de(Y), r.enablePan && ve(Y));
    }
    function ee(Y) {
      (r.enableZoom && de(Y), r.enableRotate && he(Y));
    }
    function Ue(Y) {
      r.enabled !== !1 &&
        (R.length === 0 &&
          (r.domElement.setPointerCapture(Y.pointerId),
          r.domElement.addEventListener("pointermove", fe),
          r.domElement.addEventListener("pointerup", Se)),
        O(Y),
        Y.pointerType === "touch" ? Ye(Y) : Be(Y));
    }
    function fe(Y) {
      r.enabled !== !1 && (Y.pointerType === "touch" ? st(Y) : se(Y));
    }
    function Se(Y) {
      (me(Y),
        R.length === 0 &&
          (r.domElement.releasePointerCapture(Y.pointerId),
          r.domElement.removeEventListener("pointermove", fe),
          r.domElement.removeEventListener("pointerup", Se)),
        r.dispatchEvent(_endEvent),
        (a = n.NONE));
    }
    function Me(Y) {
      me(Y);
    }
    function Be(Y) {
      let we;
      switch (Y.button) {
        case 0:
          we = r.mouseButtons.LEFT;
          break;
        case 1:
          we = r.mouseButtons.MIDDLE;
          break;
        case 2:
          we = r.mouseButtons.RIGHT;
          break;
        default:
          we = -1;
      }
      switch (we) {
        case MOUSE.DOLLY:
          if (r.enableZoom === !1) return;
          (X(Y), (a = n.DOLLY));
          break;
        case MOUSE.ROTATE:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enablePan === !1) return;
            (Z(Y), (a = n.PAN));
          } else {
            if (r.enableRotate === !1) return;
            (j(Y), (a = n.ROTATE));
          }
          break;
        case MOUSE.PAN:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enableRotate === !1) return;
            (j(Y), (a = n.ROTATE));
          } else {
            if (r.enablePan === !1) return;
            (Z(Y), (a = n.PAN));
          }
          break;
        default:
          a = n.NONE;
      }
      a !== n.NONE && r.dispatchEvent(_startEvent);
    }
    function se(Y) {
      if (r.enabled !== !1)
        switch (a) {
          case n.ROTATE:
            if (r.enableRotate === !1) return;
            q(Y);
            break;
          case n.DOLLY:
            if (r.enableZoom === !1) return;
            ue(Y);
            break;
          case n.PAN:
            if (r.enablePan === !1) return;
            oe(Y);
            break;
        }
    }
    function $(Y) {
      r.enabled === !1 ||
        r.enableZoom === !1 ||
        a !== n.NONE ||
        (r.dispatchEvent(_startEvent), te(Y), r.dispatchEvent(_endEvent));
    }
    function Oe(Y) {
      r.enabled === !1 || r.enablePan === !1 || le(Y);
    }
    function Ye(Y) {
      switch ((Ie(Y), R.length)) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === !1) return;
              (Te(), (a = n.TOUCH_ROTATE));
              break;
            case TOUCH.PAN:
              if (r.enablePan === !1) return;
              (K(), (a = n.TOUCH_PAN));
              break;
            default:
              a = n.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === !1 && r.enablePan === !1) return;
              (U(), (a = n.TOUCH_DOLLY_PAN));
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === !1 && r.enableRotate === !1) return;
              (N(), (a = n.TOUCH_DOLLY_ROTATE));
              break;
            default:
              a = n.NONE;
          }
          break;
        default:
          a = n.NONE;
      }
      a !== n.NONE && r.dispatchEvent(_startEvent);
    }
    function st(Y) {
      switch ((Ie(Y), a)) {
        case n.TOUCH_ROTATE:
          if (r.enableRotate === !1) return;
          (he(Y), r.update());
          break;
        case n.TOUCH_PAN:
          if (r.enablePan === !1) return;
          (ve(Y), r.update());
          break;
        case n.TOUCH_DOLLY_PAN:
          if (r.enableZoom === !1 && r.enablePan === !1) return;
          (xe(Y), r.update());
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === !1 && r.enableRotate === !1) return;
          (ee(Y), r.update());
          break;
        default:
          a = n.NONE;
      }
    }
    function W(Y) {
      r.enabled;
    }
    function O(Y) {
      R.push(Y);
    }
    function me(Y) {
      delete E[Y.pointerId];
      for (let we = 0; we < R.length; we++)
        if (R[we].pointerId == Y.pointerId) {
          R.splice(we, 1);
          return;
        }
    }
    function Ie(Y) {
      let we = E[Y.pointerId];
      (we === void 0 && ((we = new Vector2()), (E[Y.pointerId] = we)),
        we.set(Y.pageX, Y.pageY));
    }
    function Le(Y) {
      const we = Y.pointerId === R[0].pointerId ? R[1] : R[0];
      return E[we.pointerId];
    }
    (r.domElement.addEventListener("contextmenu", W),
      r.domElement.addEventListener("pointerdown", Ue),
      r.domElement.addEventListener("pointercancel", Me),
      r.domElement.addEventListener("wheel", $, { passive: !1 }),
      this.update());
  }
}
class DeviceOrientationControls {
  object = null;
  enabled = !0;
  hasValue = !1;
  deviceOrientation = {};
  screenOrientation = 0;
  alphaOffset = 0;
  zee = new Vector3(0, 0, 1);
  euler = new Euler();
  q0 = new Quaternion();
  q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
  _onBoundDeviceOrientationChangeEvent;
  _onBoundScreenOrientationChangeEvent;
  constructor(e) {
    ((this.object = e),
      this.object.rotation.reorder("YXZ"),
      (this._onBoundDeviceOrientationChangeEvent =
        this._onDeviceOrientationChangeEvent.bind(this)),
      (this._onBoundScreenOrientationChangeEvent =
        this._onScreenOrientationChangeEvent.bind(this)),
      this.connect());
  }
  _onDeviceOrientationChangeEvent(e) {
    this.deviceOrientation = e;
  }
  _onScreenOrientationChangeEvent() {
    this.screenOrientation = window.orientation || 0;
  }
  setObjectQuaternion(e, t, r, n, a) {
    (this.euler.set(r, t, -n, "YXZ"),
      e.setFromEuler(this.euler),
      e.multiply(this.q1),
      e.multiply(this.q0.setFromAxisAngle(this.zee, -a)));
  }
  connect() {
    (this._onBoundScreenOrientationChangeEvent(),
      window.DeviceOrientationEvent !== void 0 &&
      typeof window.DeviceOrientationEvent.requestPermission == "function"
        ? window.DeviceOrientationEvent.requestPermission()
            .then((e) => {
              e == "granted" &&
                (window.addEventListener(
                  "orientationchange",
                  this._onBoundScreenOrientationChangeEvent,
                  !1,
                ),
                window.addEventListener(
                  "deviceorientation",
                  this._onBoundDeviceOrientationChangeEvent,
                  !1,
                ));
            })
            .catch(function (e) {})
        : (window.addEventListener(
            "orientationchange",
            this._onBoundScreenOrientationChangeEvent,
            !1,
          ),
          window.addEventListener(
            "deviceorientation",
            this._onBoundDeviceOrientationChangeEvent,
            !1,
          )),
      (this.enabled = !0));
  }
  disconnect() {
    (window.removeEventListener(
      "orientationchange",
      this._onBoundScreenOrientationChangeEvent,
      !1,
    ),
      window.removeEventListener(
        "deviceorientation",
        this._onBoundDeviceOrientationChangeEvent,
        !1,
      ),
      (this.enabled = !1));
  }
  update() {
    if (this.enabled === !1) return;
    let e = this.deviceOrientation;
    if (e) {
      let t = e.alpha ? MathUtils$1.degToRad(e.alpha) + this.alphaOffset : 0,
        r = e.beta ? MathUtils$1.degToRad(e.beta) : 0,
        n = e.gamma ? MathUtils$1.degToRad(e.gamma) : 0,
        a = this.screenOrientation
          ? MathUtils$1.degToRad(this.screenOrientation)
          : 0;
      (this.setObjectQuaternion(this.object.quaternion, t, r, n, a),
        (this.hasValue = this.hasValue || (e.alpha && e.beta && e.gamma)));
    }
  }
  dispose() {
    this.disconnect();
  }
}
class CameraControls {
  useOrbitControls = !1;
  preInit(e) {
    if (
      ((this.DEFAULT_CAMERA_POSITION = new Vector3(0, 0, 5)),
      (this.DEFAULT_LOOKAT_POSITION = new Vector3(0, 0, 0)),
      (this._brownianMotion = null),
      (this._orbitControls = null),
      (this._orbitCamera = null),
      (this._deviceOrientationControls = null),
      (this._baseDeviceControlQuaternion = null),
      (this._targetDeviceControlQuaternion = null),
      (this._deviceOrientationCamera = null),
      (this._hasDeviceOrientationControlValues = !1),
      (this._q = new Quaternion()),
      (this._e = new Euler()),
      (this._v1 = new Vector3()),
      (this._v2 = new Vector3()),
      (this._camera = properties.camera),
      (this._deviceOrientationEuler = new Euler()),
      this._camera.position.copy(this.DEFAULT_CAMERA_POSITION),
      (this._brownianMotion = new BrownianMotion()),
      this.useOrbitControls === !0 &&
        ((this._orbitCamera = this._camera.clone()),
        (this._orbitControls = new OrbitControls(
          this._orbitCamera,
          document.documentElement,
        )),
        (this._orbitControls.enableDamping = !0),
        this._orbitControls.target0.copy(this.DEFAULT_LOOKAT_POSITION),
        this._orbitControls.reset()),
      browser$1.isMobile)
    ) {
      ((this._deviceOrientationCamera = new Camera()),
        (this._baseDeviceControlQuaternion = new Quaternion()),
        (this._targetDeviceControlQuaternion = new Quaternion()));
      let t = () => {
        ((this._deviceOrientationControls = new DeviceOrientationControls(
          this._deviceOrientationCamera,
        )),
          this._deviceOrientationControls.connect());
      };
      browser$1.isIOS ? properties.onFirstClicked.addOnce(t) : t();
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    if (!this._camera) this._camera = properties.camera;
    if (!this._camera) return;

    let t = this._camera;
    (this.DEFAULT_CAMERA_POSITION.copy(properties.defaultCameraPosition),
      this.DEFAULT_LOOKAT_POSITION.copy(properties.defaultLookAtPosition),
      (t.near = properties.cameraNear),
      (t.far = properties.cameraFar),
      t.matrix.identity(),
      t.matrix.decompose(t.position, t.quaternion, t.scale),
      t.position.copy(this.DEFAULT_CAMERA_POSITION),
      t.lookAt(this.DEFAULT_LOOKAT_POSITION),
      browser$1.isMobile &&
        this._deviceOrientationControls &&
        this._deviceOrientationControls.update(),
      this.useOrbitControls === !0 &&
        (this._orbitControls.update(),
        this._orbitCamera.updateMatrix(),
        this._orbitCamera.matrix.decompose(t.position, t.quaternion, t.scale)),
      this._v1.set(0, 0, -1).applyQuaternion(t.quaternion),
      this.useOrbitControls === !0
        ? (this.cameraDistance = this._v2
            .copy(this._orbitControls.target)
            .sub(t.position)
            .dot(this._v1))
        : (this.cameraDistance = this._v2
            .copy(this.DEFAULT_LOOKAT_POSITION)
            .sub(t.position)
            .dot(this._v1)),
      properties.cameraUsePhysical
        ? ((t.filmGauge = properties.cameraFilmGauge),
          t.setFocalLength(properties.cameraFocalLength))
        : (t.fov = properties.cameraFov));
    let r = t.fov;
    t.fov += properties.cameraDollyZoomFovOffset;
    let n = this.cameraDistance;
    if (
      ((n =
        (n * Math.tan(((r / 360) * Math.PI) / 2)) /
          Math.tan(((t.fov / 360) * Math.PI) / 2) -
        n),
      t.translateZ(n),
      t.setViewOffset(
        properties.viewportWidth,
        properties.viewportHeight,
        properties.cameraViewportOffsetX,
        properties.cameraViewportOffsetY,
        properties.viewportWidth,
        properties.viewportHeight,
      ),
      (t.fov = r),
      (this.cameraDistance += n),
      browser$1.isMobile)
    )
      this._deviceOrientationControls &&
        (this._deviceOrientationControls.update(),
        this._deviceOrientationControls.hasValue &&
          (this._hasDeviceOrientationControlValues ||
            (this._targetDeviceControlQuaternion.copy(
              this._deviceOrientationCamera.quaternion,
            ),
            this._baseDeviceControlQuaternion.copy(
              this._deviceOrientationCamera.quaternion,
            )),
          this._targetDeviceControlQuaternion.slerp(
            this._deviceOrientationCamera.quaternion,
            0.15,
          ),
          this._baseDeviceControlQuaternion.slerp(
            this._targetDeviceControlQuaternion,
            0.15,
          ),
          this._q
            .copy(this._baseDeviceControlQuaternion)
            .invert()
            .multiply(this._targetDeviceControlQuaternion),
          this._deviceOrientationEuler.setFromQuaternion(this._q),
          (this._hasDeviceOrientationControlValues = !0),
          t.quaternion.multiply(this._q)));
    else {
      t.translateZ(this.cameraDistance * -1);
      let a =
          math.clamp(input.mouseXY.y, -1, 1) * properties.cameraLookStrength,
        l = math.clamp(-input.mouseXY.x, -1, 1) * properties.cameraLookStrength;
      ((properties.cameraLookX +=
        (a - properties.cameraLookX) * properties.cameraLookEaseDamp),
        (properties.cameraLookY +=
          (l - properties.cameraLookY) * properties.cameraLookEaseDamp),
        this._e.set(properties.cameraLookX, properties.cameraLookY, 0),
        this._q.setFromEuler(this._e),
        t.quaternion.multiply(this._q),
        t.translateZ(this.cameraDistance));
    }
    (t.matrix.compose(t.position, t.quaternion, t.scale),
      (this._brownianMotion.positionAmplitude =
        properties.cameraShakePositionStrength),
      (this._brownianMotion.positionFrequency =
        properties.cameraShakePositionSpeed),
      (this._brownianMotion.rotationAmplitude =
        properties.cameraShakeRotationStrength),
      (this._brownianMotion.rotationFrequency =
        properties.cameraShakeRotationSpeed),
      this._brownianMotion.update(e),
      t.matrix.multiply(this._brownianMotion.matrix),
      t.matrix.decompose(t.position, t.quaternion, t.scale),
      this._v1.set(0, 0, -1).applyQuaternion(t.quaternion),
      this.useOrbitControls === !0 &&
        (properties.cameraDistance = this._v2
          .copy(this._orbitControls.target)
          .sub(t.position)
          .dot(this._v1)),
      t.updateMatrixWorld(),
      properties.cameraDirection
        .set(0, 0, 1)
        .applyMatrix4(t.matrixWorld)
        .sub(this._v1.set(0, 0, 0).applyMatrix4(t.matrixWorld))
        .normalize());
  }
}
const cameraControls = new CameraControls(),
  vert$g = `#define GLSLIFY 1
uniform float u_time;uniform sampler2D u_animationPositionTexture;uniform sampler2D u_animationOrientTexture;uniform vec2 u_animationTextureSize;uniform float u_loopLinearBlend;attribute vec2 boneIndices;attribute vec2 boneWeights;attribute vec4 tangent;attribute float ao;attribute vec3 instancePos;attribute vec4 instanceOrient;attribute vec3 instanceAnimationFrameFromToBlend1;attribute vec3 instanceAnimationFrameFromToBlend2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying vec2 v_uv;varying float v_ao;
#define PI 3.14159265359
vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void computeTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec4 uvBone12){vec3 bonePos1=texture2D(u_animationPositionTexture,uvBone12.xy).xyz;vec3 bonePos2=texture2D(u_animationPositionTexture,uvBone12.zw).xyz;vec4 boneOrient1=texture2D(u_animationOrientTexture,uvBone12.xy);vec4 boneOrient2=texture2D(u_animationOrientTexture,uvBone12.zw);pos=(qrotate(boneOrient1,pos)+bonePos1)*boneWeights.x+(qrotate(boneOrient2,pos)+bonePos2)*boneWeights.y;nor=normalize(qrotate(boneOrient1,nor)*boneWeights.x+qrotate(boneOrient2,nor)*boneWeights.y);tang=normalize(qrotate(boneOrient1,tang)*boneWeights.x+qrotate(boneOrient2,tang)*boneWeights.y);}void computeFrameTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec3 instanceAnimationFrameFromToBlend){vec4 dataOffset=boneIndices.xyxy+instanceAnimationFrameFromToBlend.xxyy*float(BONE_COUNT)+0.5;vec4 fromUvsBone12=vec4(floor(mod(dataOffset.xy,u_animationTextureSize.x))+.5,floor(dataOffset.xy/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec4 toUvsBone12=vec4(floor(mod(dataOffset.zw,u_animationTextureSize.x))+.5,floor(dataOffset.zw/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec3 fromPos=pos;vec3 fromNor=nor;vec3 fromTang=tang.xyz;computeTransform(fromPos,fromTang,fromNor,fromUvsBone12);vec3 toPos=pos;vec3 toNor=nor;vec3 toTang=tang.xyz;computeTransform(toPos,toNor,toTang,toUvsBone12);pos=mix(fromPos,toPos,instanceAnimationFrameFromToBlend.z);nor=mix(fromNor,toNor,instanceAnimationFrameFromToBlend.z);tang=mix(fromTang,toTang,instanceAnimationFrameFromToBlend.z);}void main(){v_ao=ao;vec3 posLoop=position;vec3 norLoop=normal;vec3 tangLoop=tangent.xyz;computeFrameTransform(posLoop,norLoop,tangLoop,instanceAnimationFrameFromToBlend1);vec3 posLinear=position;vec3 norLinear=normal;vec3 tangLinear=tangent.xyz;computeFrameTransform(posLinear,norLinear,tangLinear,instanceAnimationFrameFromToBlend2);vec3 pos=mix(posLoop,posLinear,u_loopLinearBlend);vec3 nor=mix(norLoop,norLinear,u_loopLinearBlend);vec3 tang=mix(tangLoop,tangLinear,u_loopLinearBlend);pos=qrotate(instanceOrient,pos)+instancePos.xyz;nor=normalize(qrotate(instanceOrient,nor));tang=normalize(qrotate(instanceOrient,tang));vec4 mvPos=modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;v_viewPosition=-mvPos.xyz;gl_Position=projectionMatrix*mvPos;}`,
  fragWhite = `#define GLSLIFY 1
uniform sampler2D u_matcapTexture;uniform float u_frameOutRatio;uniform float u_faceLedLight;uniform vec3 u_tintColor;uniform vec3 u_cardPosition;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_faceLedColor;uniform sampler2D u_envTexture;
#include <astronautCommon_pars>
float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}vec2 boxIntersection(in vec3 ro,in vec3 rd,vec3 boxSize){vec3 m=1.0/rd;vec3 n=m*ro;vec3 k=abs(m)*boxSize;vec3 t1=-n-k;vec3 t2=-n+k;float tN=max(max(t1.x,t1.y),t1.z);float tF=min(min(t2.x,t2.y),t2.z);if(tN>tF||tF<0.0)return vec2(-1.0);return vec2(tN,tF);}void main(){
#include <astronautCommon>
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),1.);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float outOfFrameRatio=linearStep(0.35,1.0,u_frameOutRatio);vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float metalMask=1.0-metalness;vec3 color=vec3(matcapShading*albedo);color+=0.8*zAxisShading;color*=u_ambientColor*(0.85+sunNdL*0.5);color*=metalMask;color+=(0.5+0.5*outOfFrameRatio)*metalMask*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color*=0.7+0.3*ao;color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 tunnelColor=color*0.75;vec2 dists=boxIntersection(v_worldPosition+vec3(0.,0.,u_whiteTunnelRatio*7.5*5.)+worldNormal*200.,-worldNormal,vec3(7.5,7.5,100.));float dist=200.-dists.x;vec3 hitPos=v_worldPosition+dist*worldNormal;tunnelColor+=vec3(1.)*(abs(worldNormal.x)*0.5+0.5)/dist*(0.25+0.75*ao)*(cos(u_whiteTunnelRatio*6.283185307179586*5.)*0.3+0.7)*3.5*(1.-metalness);color=mix(tunnelColor,color,outOfFrameRatio)*(0.7+armb.r*0.3);vec3 ledLightPos=u_cardPosition;vec3 ledLightDir=ledLightPos-v_worldPosition;float ledLightDist=length(ledLightDir);ledLightDir/=ledLightDist;float attenuationLed=1.0/(16.0*ledLightDist);color+=attenuationLed*u_faceLedLight*u_faceLedColor*getMetalShininess(V,u_cardPosition,N,(1.0-metalness),metalness);attenuationLed=1.0/(16.0*ledLightDist*ledLightDist);color+=0.5*u_faceLedLight*u_faceLedColor*albedo*attenuationLed*(0.5+0.5*saturate(dot(ledLightDir,N)));gl_FragColor.rgb=mix(u_bgColor,color,vec3(u_showRatio*0.8+0.2));
#ifndef IS_HELMET_GLASS
gl_FragColor.rgb+=outOfFrameRatio*max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao;
#endif
gl_FragColor.rgb=min(vec3(1.),gl_FragColor.rgb+u_tintColor*(1.-u_frameOutRatio*0.3)*(0.4+gl_FragColor.b*0.6));gl_FragColor.rgb*=0.95+mix(u_tintColor,vec3(1.0),v_ao)*0.1;gl_FragColor.rgb*=mix(1.,metalMask*0.7+0.3,linearStep(0.8,1.,u_frameOutRatio));gl_FragColor.a=0.01;}`,
  fragCard = `#define GLSLIFY 1
uniform sampler2D u_cardTexture;uniform sampler2D u_cardLedTexture;uniform vec2 u_cardUvOffset;uniform vec2 u_cardTextureSize;uniform vec3 u_cardColor;uniform float u_cardOpacity;uniform float u_time;varying vec2 v_uv;void main(){vec2 uv=v_uv/u_cardTextureSize;vec4 texel=texture2D(u_cardTexture,uv+u_cardUvOffset);vec3 ledTexture=pow(texture2D(u_cardLedTexture,fract(v_uv*vec2(20.,15.))).rgb,vec3(2.2));float ledMask=dot(ledTexture,u_cardColor*texel.r);gl_FragColor.rgb=pow(ledTexture,vec3(1./2.2))*ledMask*2.5;gl_FragColor.a=texel.r*0.35;}`,
  fragBlack = `#define GLSLIFY 1
uniform sampler2D u_blackTunnelTexture;uniform sampler2D u_matcapTexture;uniform sampler2D u_envTexture;uniform float u_sunFactor;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_sunFadeColor;uniform float u_blackTunnelRatio;uniform float u_offsetZ;uniform float u_frameIn;uniform float u_endRatio;
#ifdef IS_CLONE
uniform float u_alpha;
#endif
#include <astronautCommon_pars>
float sdBoxFrame(vec3 p,vec3 b,float e){p=abs(p)-b;vec3 q=abs(p+e)-e;return min(min(length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));}float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}void main(){
#include <astronautCommon>
vec2 uvDiff=cartesianToPolar(worldNormal);vec2 uvSpec=cartesianToPolar(reflection);vec3 blackTunnelEnvDiff=texture2D(u_blackTunnelTexture,0.25*uvDiff).rgb;vec3 blackTunnelEnvSpec=texture2D(u_blackTunnelTexture,0.25*uvSpec).rgb*(0.2+metalness*0.7)*2.;
#ifdef IS_CLONE
gl_FragColor.rgb=(blackTunnelEnvDiff*3.5*blackTunnelEnvDiff+blackTunnelEnvSpec*3.5)*v_ao*u_alpha*(0.5+fresnel*0.9);gl_FragColor.a=mix(max(gl_FragColor.r,max(gl_FragColor.g,gl_FragColor.b))*u_alpha,0.,u_endRatio);
#else
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),0.2+1.*u_frameIn);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float metalMask=1.0-metalness;float metalShininess=u_sunFactor*getMetalShininess(V,sunPosition,N,(1.0-0.9*metalness),0.4*metalness);vec3 color=vec3(matcapShading*albedo);color+=zAxisShading;color*=metalMask;color*=mix(u_ambientColor*(0.85+sunNdL*0.5),vec3(fresnel*2.),u_blackTunnelRatio*0.5);color+=linearStep(0.,10.0,metalShininess);color*=mix(0.5+0.5*ao,0.75+0.25*ao,u_blackTunnelRatio);color+=metalMask*u_sunFactor*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 blackTunnelColor=(color*blackTunnelEnvSpec*(7.+metalness*10.)+albedo*blackTunnelEnvDiff*1.6)*(1.3-abs(reflection.z))*(0.5+ao*0.5);float GRID_SIZE=20.0;float offsetZ=mod(u_offsetZ,GRID_SIZE);vec3 ro=vec3(0.0,0.0,offsetZ);float t=0.0;vec3 relPos=v_worldPosition+worldNormal*3.+vec3(0.,0.,u_offsetZ);float repDist=GRID_SIZE-1.;vec3 relPosRep=mod(relPos+0.5*repDist,repDist)-0.5*repDist;float sdf=sdBoxFrame(relPosRep,vec3(GRID_SIZE-1.)*.5,1.);blackTunnelColor+=exp(-sdf*0.25)*blackTunnelEnvDiff*2.;gl_FragColor.rgb=color;gl_FragColor.rgb=mix(gl_FragColor.rgb,0.3*gl_FragColor.rgb+blackTunnelColor,clamp(u_blackTunnelRatio*2.-1.+ao,0.,1.));gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,vec3(u_showRatio));gl_FragColor.rgb*=(0.3+armb.r*0.7);gl_FragColor.rgb+=max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao*(1.-u_blackTunnelRatio);gl_FragColor.a=0.01+0.1*max(0.0,gl_FragColor.g-1.+metalness*0.2)*(0.5+metalness*1.5)+gl_FragColor.b*u_blackTunnelRatio*dot(vec3(0.299,0.587,0.114),blackTunnelColor)*5.;gl_FragColor.a+=metalShininess;gl_FragColor.a*=(0.5+fresnel*0.9);
#endif
}`,
  astronautCommon = `#define GLSLIFY 1
vec3 worldNormal=normalize(v_worldNormal);vec3 worldTangent=normalize(v_worldTangent.xyz);vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_norTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_armbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 N=worldNormal;vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdV=clamp(abs(dot(N,V)),0.001,1.0);float fresnel=pow(1.0-NdV,5.0);`,
  astronautCommonPars = `#define GLSLIFY 1
uniform sampler2D u_armbTexture;uniform sampler2D u_norTexture;uniform float u_time;uniform vec3 u_bgColor;uniform float u_showRatio;
#ifdef IS_WHITE
uniform float u_whiteTunnelRatio;
#endif
varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_ao;varying vec3 v_viewPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;const float RECIPROCAL_PI2=0.15915494;const float LN2=0.6931472;const float ENV_LODS=6.0;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec2 cartesianToPolar(vec3 n){vec2 uv;uv.x=atan(n.z,n.x)*RECIPROCAL_PI2+0.5;uv.y=asin(n.y)*RECIPROCAL_PI+0.5;return uv;}mat4 rotation3d(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.0-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);}`;
let _m0 = new Matrix4(),
  _v0$1 = new Vector3(),
  _v1$4 = new Vector3(),
  _p0 = new Vector3(),
  _p1 = new Vector3(),
  _e0 = new Euler(),
  _q0$1 = new Quaternion(),
  _q1$2 = new Quaternion(),
  _matrixWorld$1 = new Matrix4(),
  _matrixWorldInverse$1 = new Matrix4(),
  _projectionMatrix$1 = new Matrix4(),
  _perspectiveCamera = new PerspectiveCamera();

class GoalTunnelAstronauts {
  container = new Object3D();
  materials = {};
  meshes = {};
  cloneMeshes = {};
  CLONES_COUNT = 4;
  TOTAL_COUNT = 5;
  transformObjectList = [];
  partIdList = ["helmet", "helmet_glass", "glove_shoes", "wearpack", "card"];
  textureTypeList = ["arm", "base", "nor"];
  textures = {};
  textureUniforms = {};
  extraCameraViewportOffsetX = 0;
  extraCameraViewportOffsetY = 0;
  instancePosAttribute;
  instanceOrientAttribute;
  instanceAnimationFrameFromToBlend1Attribute;
  instanceAnimationFrameFromToBlend2Attribute;
  instanceClonePosAttribute;
  instanceCloneOrientAttribute;
  instanceCloneAnimationFrameFromToBlend1Attribute;
  instanceCloneAnimationFrameFromToBlend2Attribute;
  _cameraNeedsSync = !1;
  sharedUniforms = {
    u_time: properties.sharedUniforms.u_time,
    u_animationPositionTexture: { value: null },
    u_animationOrientTexture: { value: null },
    u_animationTextureSize: { value: new Vector2(0, 0) },
    u_frameCount: { value: null },
    u_lut: { value: null },
    u_bgColor: { value: new Color() },
    u_showRatio: { value: 0 },
    u_loopLinearBlend: { value: 0 },
    u_ambientColor: { value: new Color("#566d80") },
  };
  whiteTunnelUniforms = {
    u_matcapTexture: { value: null },
    u_frameOutRatio: { value: 0 },
    u_whiteTunnelRatio: { value: 0 },
    u_faceLedLight: { value: 0 },
    u_faceLedColor: { value: new Color("#aaaafb") },
    u_tintColor: { value: new Color() },
    u_cardPosition: { value: new Vector3() },
    u_sunPosition: { value: new Vector3(-20, 0, 22) },
    u_envTexture: { value: null },
  };
  blackTunnelUniforms = {
    u_matcapTexture: { value: null },
    u_frameIn: { value: 0 },
    u_blackTunnelRatio: { value: 0 },
    u_endRatio: { value: 0 },
    u_blackTunnelTexture: { value: null },
    u_sunFactor: { value: 1 },
    u_sunPosition: { value: new Vector3(-20, 0, 22) },
    u_blackTunnelTransformRatio:
      goalBlackTunnel.sharedUniforms.u_blackTunnelTransformRatio,
    u_envTexture: { value: null },
    u_offsetZ: goalBlackTunnel.sharedUniforms.u_offsetZ,
    u_sunFadeColor: { value: new Color("#bbb") },
  };
  cloneUniforms = { u_alpha: { value: 0 } };
  BONE_COUNT = 53;
  frameCount = -1;
  showRatio = 1;
  clonesShowRatio = 0;
  cardNoise = new Simple1DNoise();
  renderTarget = null;
  interRenderTarget = null;
  textureSize = null;
  isCardActive = !1;
  cardTextureSize = new Vector2(5, 23);
  cardTime = 0;
  preInit() {
    ((this.TOTAL_COUNT = this.CLONES_COUNT + 1),
      shaderHelper.addChunk("astronautCommon", astronautCommon),
      shaderHelper.addChunk("astronautCommon_pars", astronautCommonPars),
      (this.camera = new PerspectiveCamera()));
    for (let e = 0; e < this.TOTAL_COUNT; e++) {
      let t = new Object3D();
      (t.position
        .set(Math.random(), Math.random(), Math.random())
        .subScalar(0.5)
        .normalize()
        .multiplyScalar(4 * Math.pow(Math.random(), 1 / 3)),
        (t.position.z += 15),
        t.rotation.set(
          (Math.random() * Math.PI) / 2,
          (Math.random() * Math.PI) / 2,
          (Math.random() * Math.PI) / 2,
        ),
        (t.userData.timeShift = e === 0 ? 0 : 2 * Math.random()),
        (t.userData.cloneTimeShift = Math.random()),
        (t.userData.rotation = new Euler()),
        (t.userData.motion = new BrownianMotion()),
        (t.userData.motion._positionFrequency = 0.2),
        (t.userData.motion._rotationFrequency = 0.6),
        (t.userData.motion._positionAmplitude = 14),
        (t.userData.motion._rotationAmplitude = 8.3),
        (t.userData.positionDynamic = new SecondOrderDynamics(
          new Vector3(),
          1,
          0.65,
          1.3,
        )),
        (t.userData.rotationDynamic = new SecondOrderDynamics(
          new Vector3(),
          1,
          0.85,
          1.1,
        )),
        (t.userData.pauseLoopTime = 0),
        (t.userData.animationTime = 0),
        (t.userData.deltaTimeMultiplier = 1),
        this.transformObjectList.push(t));
    }
    ((this.instancePosAttribute = new InstancedBufferAttribute(
      new Float32Array(3),
      3,
    )),
      (this.instancePosAttribute.usage = DynamicDrawUsage),
      (this.instanceOrientAttribute = new InstancedBufferAttribute(
        new Float32Array(4),
        4,
      )),
      (this.instanceOrientAttribute.usage = DynamicDrawUsage),
      (this.instanceAnimationFrameFromToBlend1Attribute =
        new InstancedBufferAttribute(new Float32Array(3), 3)),
      (this.instanceAnimationFrameFromToBlend1Attribute.usage =
        DynamicDrawUsage),
      (this.instanceAnimationFrameFromToBlend2Attribute =
        new InstancedBufferAttribute(new Float32Array(3), 3)),
      (this.instanceAnimationFrameFromToBlend2Attribute.usage =
        DynamicDrawUsage),
      (this.instanceClonePosAttribute = new InstancedBufferAttribute(
        new Float32Array(this.CLONES_COUNT * 3),
        3,
      )),
      (this.instanceClonePosAttribute.usage = DynamicDrawUsage),
      (this.instanceCloneOrientAttribute = new InstancedBufferAttribute(
        new Float32Array(this.CLONES_COUNT * 4),
        4,
      )),
      (this.instanceCloneOrientAttribute.usage = DynamicDrawUsage),
      (this.instanceCloneAnimationFrameFromToBlend1Attribute =
        new InstancedBufferAttribute(
          new Float32Array(this.CLONES_COUNT * 3),
          3,
        )),
      (this.instanceCloneAnimationFrameFromToBlend1Attribute.usage =
        DynamicDrawUsage),
      (this.instanceCloneAnimationFrameFromToBlend2Attribute =
        new InstancedBufferAttribute(
          new Float32Array(this.CLONES_COUNT * 3),
          3,
        )),
      (this.instanceCloneAnimationFrameFromToBlend2Attribute.usage =
        DynamicDrawUsage),
      (this.textures.card = properties.loader.add(
        settings.TEXTURE_PATH + "tunnels/astronaut/face.png",
        { type: "texture", minFilter: NearestFilter },
      ).content),
      (this.textures.card.magFilter = NearestFilter),
      (this.textures.led = this._initLedTexture()));
    for (let e = 0; e < this.partIdList.length; e++) {
      let t = this.partIdList[e];
      ((this.textureUniforms[t + "_armb"] = { value: null }),
        (this.textureUniforms[t + "_nor"] = { value: null }));
      for (let r = 0; r < this.textureTypeList.length; r++) {
        let n = this.textureTypeList[r];
        t != "helmet_glass" &&
          t !== "card" &&
          properties.loader.add(
            settings.TEXTURE_PATH +
              "tunnels/astronaut/astronaut_" +
              t +
              "_" +
              n +
              ".webp",
            { type: "texture", onLoad: this._onTextureLoad.bind(this, t, n) },
          );
      }
      if (t === "card") {
        let r = new PlaneGeometry(0.2, 0.15).translate(0, 1.68, 0.1);
        (r.setAttribute(
          "boneIndices",
          new BufferAttribute(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 2),
        ),
          r.setAttribute(
            "boneWeights",
            new BufferAttribute(new Float32Array([1, 0, 1, 0, 1, 0, 1, 0]), 2),
          ),
          r.setAttribute(
            "tangent",
            new BufferAttribute(
              new Float32Array([
                0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
              ]),
              4,
            ),
          ),
          this._onGeometryLoad("card", r));
      } else
        properties.loader.add(
          settings.MODEL_PATH + "tunnels/astronaut_" + t + ".buf",
          {
            onLoad: (r) => {
              (this._onGeometryLoad(t, r, !0), this._onGeometryLoad(t, r, !1));
            },
          },
        );
    }
    (properties.loader.add(
      settings.MODEL_PATH + "tunnels/astronaut_in_animation.buf",
      { onLoad: (e) => (this.inAnimation = e) },
    ),
      properties.loader.add(
        settings.MODEL_PATH + "tunnels/astronaut_out_animation.buf",
        { onLoad: (e) => (this.outAnimation = e) },
      ),
      (this.whiteTunnelUniforms.u_envTexture.value =
        this.blackTunnelUniforms.u_envTexture.value =
          properties.loader.add(settings.TEXTURE_PATH + "tunnels/earth.webp", {
            type: "texture",
            minFilter: LinearFilter,
          }).content),
      (this.blackTunnelUniforms.u_matcapTexture.value =
        this.whiteTunnelUniforms.u_matcapTexture.value =
          properties.loader.add(
            settings.TEXTURE_PATH + "tunnels/white_matcap.jpg",
            { type: "texture", minFilter: LinearFilter },
          ).content),
      properties.loader.add(
        settings.MODEL_PATH + "tunnels/astronaut_animations.buf",
        {
          onLoad: (e) => {
            this._onAnimationLoad(e);
          },
        },
      ),
      this.initGui());
  }
  _initLedTexture() {
    let e = document.createElement("canvas");
    e.width = e.height = 11;
    let t = e.getContext("2d");
    ((t.fillStyle = "#000"),
      t.fillRect(0, 0, 11, 11),
      (t.fillStyle = "#f00"),
      t.fillRect(1, 1, 3, 9),
      (t.fillStyle = "#0f0"),
      t.fillRect(4, 1, 3, 9),
      (t.fillStyle = "#00f"),
      t.fillRect(7, 1, 3, 9));
    let r = new Texture(e);
    return ((r.needsUpdate = !0), (r.minFilter = LinearFilter), r);
  }
  initGui() {
    settings.LOOK_DEV_MODE;
  }
  _onTextureLoad(e, t, r) {
    if (((this.textures[e + "_" + t] = r), t == "arm" || t == "base")) {
      let n = this.textures[e + "_arm"],
        a = this.textures[e + "_base"];
      if (n && a) {
        let l = fboHelper.createRenderTarget(
          n.image.width,
          n.image.height,
          !1,
          !1,
        );
        ((this.textures[e + "_arm"] = this.textures[e + "_base"] = null),
          fboHelper.copy(textureHelper.transparentTexture, l),
          textureHelper.mixChannels(n, l, 0, 1, 2, -1),
          textureHelper.mixChannels(a, l, -1, -1, -1, 0),
          n.dispose(),
          a.dispose(),
          (this.textureUniforms[e + "_armb"].value = l.texture));
      }
    } else this.textureUniforms[e + "_" + t].value = r;
  }
  _onGeometryLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let p in t.attributes) n.attributes[p] = t.attributes[p];
    let a = e;
    ((e == "helmet_glass" || e == "card") && (a = "helmet"),
      (n.index = t.index),
      n.setAttribute(
        "instancePos",
        this[`instance${r ? "Clone" : ""}PosAttribute`],
      ),
      n.setAttribute(
        "instanceOrient",
        this[`instance${r ? "Clone" : ""}OrientAttribute`],
      ),
      n.setAttribute(
        "instanceAnimationFrameFromToBlend1",
        this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend1Attribute`],
      ),
      n.setAttribute(
        "instanceAnimationFrameFromToBlend2",
        this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend2Attribute`],
      ));
    let l;
    if (!r) {
      const p = Object.assign(
        {},
        this.whiteTunnelUniforms,
        this.sharedUniforms,
      );
      ((p.u_armbTexture = this.textureUniforms[a + "_armb"]),
        (p.u_norTexture = this.textureUniforms[a + "_nor"]),
        (l = new ShaderMaterial({
          uniforms: p,
          vertexShader: vert$g,
          fragmentShader: e == "card" ? fragCard : fragWhite,
          side: DoubleSide,
          transparent: !0,
          blending: NoBlending,
        })),
        (l.defines.BONE_COUNT = this.BONE_COUNT),
        (l.defines.IS_WHITE = !0),
        (l.name = "whiteTunnelMaterial"),
        e == "helmet_glass" && (l.defines.IS_HELMET_GLASS = !0),
        e == "card" &&
          ((l.uniforms = Object.assign(
            {
              u_cardLedTexture: { value: this.textures.led },
              u_cardTexture: { value: this.textures.card },
              u_cardColor: { value: new Color("#ddddff") },
              u_cardUvOffset: { value: new Vector2(0, 0) },
              u_cardTextureSize: { value: this.cardTextureSize },
              u_cardOpacity: { value: 1 },
            },
            this.sharedUniforms,
          )),
          (l.depthTest = !1),
          (l.depthWrite = !1),
          (l.blending = CustomBlending),
          (l.blendEquation = AddEquation),
          (l.blendSrc = OneFactor),
          (l.blendDst = OneFactor),
          (l.blendEquationAlpha = AddEquation),
          (l.blendSrcAlpha = OneFactor),
          (l.blendDstAlpha = OneFactor)));
    }
    const c = Object.assign(
      {},
      this.blackTunnelUniforms,
      this.sharedUniforms,
      r ? this.cloneUniforms : {},
    );
    ((c.u_armbTexture = this.textureUniforms[a + "_armb"]),
      (c.u_norTexture = this.textureUniforms[a + "_nor"]));
    const u = new ShaderMaterial({
      uniforms: c,
      vertexShader: vert$g,
      fragmentShader: fragBlack,
      transparent: !0,
    });
    (r
      ? ((u.blending = CustomBlending),
        (u.blendEquation = AddEquation),
        (u.blendSrc = OneFactor),
        (u.blendDst = OneFactor),
        (u.depthTest = !1),
        (u.side = DoubleSide))
      : ((u.blending = NoBlending), (u.side = DoubleSide)),
      (u.defines.BONE_COUNT = this.BONE_COUNT),
      (u.defines.IS_BLACK = !0),
      (u.defines.IS_CLONE = r),
      (u.name = "blackTunnelMaterial"),
      l && taskManager.add(l),
      u && taskManager.add(u));
    const f = new Mesh(n, this.blackTunnelMaterial);
    (r
      ? (f.renderOrder = 1e3)
      : ((f.onBeforeRender = this._onBeforeRender.bind(this)),
        (f.onAfterRender = this._onAfterRender.bind(this))),
      (f.renderOrder = e == "card" ? 100 : 0),
      (f.frustumCulled = !1),
      this.container.add(f),
      r
        ? ((f.material = u), (this.cloneMeshes[e] = f))
        : ((this.meshes[e] = f), (this.materials[e] = { white: l, black: u })));
  }
  _onBeforeRender(e, t, r) {
    if (this.container.parent && (this.container.parent == (homeGoalSection.hostPage || window.homePage)?.preUfxContainer || this.container.parent == window.homePage?.preUfxContainer)) {
      let n = cameraControls._camera;
      if (
        (_matrixWorld$1.copy(r.matrixWorld),
        r.matrixWorld.copy(n.matrixWorld),
        _matrixWorldInverse$1.copy(r.matrixWorldInverse),
        r.matrixWorldInverse.copy(n.matrixWorldInverse),
        _projectionMatrix$1.copy(r.projectionMatrix),
        this._cameraNeedsSync &&
          ((this._cameraNeedsSync = !1),
          (_perspectiveCamera.fov = n.fov),
          (_perspectiveCamera.near = n.near),
          (_perspectiveCamera.far = n.far),
          (_perspectiveCamera.filmOffset = n.filmOffset),
          (_perspectiveCamera.coordinateSystem = n.coordinateSystem),
          (_perspectiveCamera.filmGauge = n.filmGauge),
          (_perspectiveCamera.aspect = n.aspect),
          n.view))
      ) {
        _perspectiveCamera.view = _perspectiveCamera.view || {};
        for (let a in n.view) _perspectiveCamera.view[a] = n.view[a];
        ((_perspectiveCamera.view.offsetX += this.extraCameraViewportOffsetX),
          (_perspectiveCamera.view.offsetY += this.extraCameraViewportOffsetY),
          _perspectiveCamera.updateProjectionMatrix());
      }
      r.projectionMatrix.copy(_perspectiveCamera.projectionMatrix);
    }
  }
  _onAfterRender(e, t, r) {
    (this.container.parent && (this.container.parent == (homeGoalSection.hostPage || window.homePage)?.preUfxContainer || this.container.parent == window.homePage?.preUfxContainer)) &&
      (r.matrixWorld.copy(_matrixWorld$1),
      r.matrixWorldInverse.copy(_matrixWorldInverse$1),
      r.projectionMatrix.copy(_projectionMatrix$1));
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position || !e.attributes.orient)
      return;
    let t = e.attributes.position.array,
      r = e.attributes.orient.array,
      n = t.length / 3;
    this.frameCount = n / this.BONE_COUNT;
    let a = Math.ceil(Math.sqrt(n)),
      l = Math.ceil(n / a),
      c = a * l,
      u = new Float32Array(c * 4),
      f = new Float32Array(c * 4);
    for (let p = 0, g = 0, v = 0; p < n; p++, g += 3, v += 4)
      ((u[v + 0] = t[g + 0]),
        (u[v + 1] = t[g + 1]),
        (u[v + 2] = t[g + 2]),
        (u[v + 3] = 1),
        (f[v + 0] = r[v + 0]),
        (f[v + 1] = r[v + 1]),
        (f[v + 2] = r[v + 2]),
        (f[v + 3] = r[v + 3]));
    ((this.sharedUniforms.u_animationPositionTexture.value =
      fboHelper.createDataTexture(u, a, l, !0, !0)),
      (this.sharedUniforms.u_animationPositionTexture.value.flipY = !1),
      (this.sharedUniforms.u_animationOrientTexture.value =
        fboHelper.createDataTexture(f, a, l, !0, !0)),
      (this.sharedUniforms.u_animationOrientTexture.value.flipY = !1),
      this.sharedUniforms.u_animationTextureSize.value.set(a, l),
      (this.sharedUniforms.u_frameCount.value = this.frameCount));
  }
  init() {
    ((this.renderTarget = fboHelper.createRenderTarget(1, 1)),
      (this.interRenderTarget = fboHelper.createRenderTarget(1, 1)));
  }
  resize(e, t) {
    if (!this.renderTarget) return;
    let r = 0.5;
    ((e = Math.ceil((e * r) / 2) * 2),
      (t = Math.ceil((t * r) / 2) * 2),
      (e = math.powerTwoFloor(e)),
      (t = math.powerTwoFloor(t)),
      this.renderTarget.setSize(e, t),
      this.interRenderTarget.setSize(e, t));
  }
  updateTransforms(e) {
    const t = this.transformObjectList[0],
      {
        whiteFrameRatio: r,
        whiteTunnelRatio: n,
        blackTitleRatio: a,
        isBlackTunnelActive: l,
        blackTunnelRatio: c,
        isBlackTitleActive: u,
        isWhiteTunnelActive: f,
        astronautDropRatio: p,
      } = goalTunnels;
    for (let g = 0; g < this.TOTAL_COUNT; g++) {
      let v = this.transformObjectList[g];
      if (
        (v.scale.setScalar(1),
        v.position.set(0, 0, 0),
        v.rotation.set(0, 0, 0),
        g === 0)
      ) {
        let _ = 100,
          T,
          M;
        f
          ? ((T = this.outAnimation.attributes),
            n < 1
              ? (M = math.fit(n, 0, 1, 0, 79))
              : (M = math.fit(p, 0, 1, 79, 99)))
          : ((T = this.inAnimation.attributes), (M = _ * ease.cubicIn(a)));
        let S = T.position.array,
          b = T.orient.array,
          C = Math.min(Math.floor(M), _ - 1),
          w = Math.min(Math.ceil(M), _ - 1),
          R = M - C;
        (_p0.fromArray(S, C * 3),
          _p1.fromArray(S, w * 3),
          _p0.lerp(_p1, R),
          v.position.copy(_p0),
          _q0$1.fromArray(b, C * 4),
          _q1$2.fromArray(b, w * 4),
          _q0$1.slerp(_q1$2, R),
          v.rotation.setFromQuaternion(_q0$1),
          (v.position.y -=
            (properties.useMobileLayout ? 0 : 0.4) * ease.backInOut(p)),
          v.updateMatrix());
        let E = v.userData.motion;
        if (
          ((E._positionFrequency = 0.2),
          (E._rotationFrequency = 0.15),
          (E._positionAmplitude = 0),
          (E._rotationAmplitude = 0),
          l)
        ) {
          let I = c;
          ((E._positionFrequency = 0.2 + 0.5 * I),
            (E._rotationFrequency = 0.15),
            (E._positionAmplitude = 5 * I),
            (E._rotationAmplitude = 60 * I));
        }
        (f &&
          ((E._positionFrequency = math.fit(r, 0, 0.45, 0.5, 0.2)),
          (E._rotationFrequency = math.fit(r, 0, 0.45, 0.4, 0.15)),
          (E._positionAmplitude = math.fit(r, 0, 0.75, 5, 0)),
          (E._rotationAmplitude = math.fit(r, 0, 0.75, 15, 0))),
          E.update(e),
          v.userData.positionDynamic.update(e, E._position),
          _v0$1.copy(E._euler),
          v.userData.rotationDynamic.update(e, _v0$1),
          (_e0.x = v.userData.rotationDynamic.value.x),
          (_e0.y = v.userData.rotationDynamic.value.y),
          (_e0.z = v.userData.rotationDynamic.value.z),
          (v.userData.deltaTimeMultiplier =
            1 +
            Math.min(
              3.5,
              v.userData.positionDynamic.valueVel.length() * 0.2 +
                v.userData.rotationDynamic.valueVel.length() * 0.2,
            )),
          _v1$4.set(1, 1, 1),
          E._matrix.compose(
            v.userData.positionDynamic.value,
            _q0$1.setFromEuler(_e0),
            _v1$4,
          ),
          _m0.copy(v.matrix),
          _m0.multiply(E._matrix),
          _m0.decompose(_v0$1, _q0$1, _v1$4));
      } else if (u || f)
        (v.scale.setScalar(0),
          v.updateMatrix(),
          _m0.copy(v.matrix).decompose(_v0$1, _q0$1, _v1$4));
      else {
        (v.position.copy(t.position),
          v.rotation.copy(t.rotation),
          v.updateMatrix(),
          (v.userData.motion._positionFrequency = 0.2),
          (v.userData.motion._rotationFrequency = 0.6),
          (v.userData.motion._positionAmplitude = 12),
          (v.userData.motion._rotationAmplitude = 10),
          v.userData.motion.update(e),
          _m0.copy(v.matrix),
          _m0.multiply(v.userData.motion._matrix),
          _m0.decompose(_v0$1, _q0$1, _v1$4),
          _v1$4.fromArray(this.instancePosAttribute.array, 0),
          _q1$2.fromArray(this.instanceOrientAttribute.array, 0));
        let _ = g / (this.CLONES_COUNT - 1),
          T = math.fit(
            this.clonesShowRatio,
            _ * 0.3,
            0.7 + _ * 0.3,
            1,
            0,
            ease.sineInOut,
          );
        _v0$1.lerp(_v1$4, T);
      }
      g === 0
        ? (_v0$1.toArray(this.instancePosAttribute.array, 0),
          _q0$1.toArray(this.instanceOrientAttribute.array, 0))
        : (_v0$1.toArray(this.instanceClonePosAttribute.array, (g - 1) * 3),
          _q0$1.toArray(this.instanceCloneOrientAttribute.array, (g - 1) * 4));
    }
    ((this.instancePosAttribute.needsUpdate = !0),
      (this.instanceOrientAttribute.needsUpdate = !0),
      (this.instanceClonePosAttribute.needsUpdate = !0),
      (this.instanceCloneOrientAttribute.needsUpdate = !0));
  }
  updateAnimation(e) {
    const {
      blackTitleRatio: t,
      astronautDropRatio: r,
      whiteFrameOutRatio: n,
    } = goalTunnels;
    let a = !0,
      l,
      c,
      u,
      f,
      p,
      g = math.fit(r, 0, 0.1, 0, 1) * math.fit(r, 0.9, 1, 1, 0),
      v = math.fit(n + r, 0.9, 2, 90, 139, ease.quartIn);
    ((u = Math.floor(v)),
      (f = Math.ceil(v)),
      (p = v - u),
      (this.sharedUniforms.u_loopLinearBlend.value = g));
    const _ = math.fit(r, 0.9, 1, 0, 1, ease.cubicIn);
    this.isCardActive = _ > 0;
    for (let T = 0; T < this.TOTAL_COUNT; T++) {
      const M = this.transformObjectList[T];
      let S = 1,
        b = this.materials.card.white.uniforms;
      if (r < 0.5)
        ((M.userData.pauseLoopTime = 0),
          (S = math.smoothstep(-0.3, 1, t) * 0.75),
          (l = 0),
          (c = 89),
          (b.u_cardOpacity.value = 0));
      else {
        ((S = math.fit(r, 0.9, 1, 0, 1)), (l = 140), (c = 287));
        let k = math.clamp(
          0.5 +
            Math.max(0, this.cardNoise.getFbm(properties.time * 8, 3) + 0.5) *
              4,
          0,
          2,
        );
        ((b.u_cardOpacity.value = k * _),
          r < 1
            ? ((M.userData.pauseLoopTime = Math.max(
                0,
                M.userData.pauseLoopTime,
              )),
              (a = !1))
            : (M.userData.pauseLoopTime = 0));
      }
      (M.userData.pauseLoopTime == 0 &&
        (M.userData.animationTime += e * S * M.userData.deltaTimeMultiplier),
        g == 1 && (M.userData.animationTime = 0));
      let C = M.userData.timeShift;
      T === 0
        ? (M.userData.cloneTimeShift = -1)
        : ((M.userData.cloneTimeShift += 0.2 * e),
          (M.userData.cloneTimeShift %= 1),
          (C = math.mix(0, C, this.clonesShowRatio)));
      let w = C + M.userData.animationTime,
        R = c - l + 1,
        E = (w * 60) % R,
        I = Math.floor(E),
        F = ((I + 1) % R) + l;
      ((I += l),
        F < I &&
          (a ||
            ((F = I = l),
            (M.userData.animationTime = -C),
            (M.userData.pauseLoopTime = 1 / 0))),
        T === 0
          ? ((this.instanceAnimationFrameFromToBlend1Attribute.array[0] = I),
            (this.instanceAnimationFrameFromToBlend1Attribute.array[1] = F),
            (this.instanceAnimationFrameFromToBlend1Attribute.array[2] = E % 1),
            (this.instanceAnimationFrameFromToBlend2Attribute.array[0] = u),
            (this.instanceAnimationFrameFromToBlend2Attribute.array[1] = f),
            (this.instanceAnimationFrameFromToBlend2Attribute.array[2] = p))
          : ((this.instanceCloneAnimationFrameFromToBlend1Attribute.array[
              (T - 1) * 3 + 0
            ] = I),
            (this.instanceCloneAnimationFrameFromToBlend1Attribute.array[
              (T - 1) * 3 + 1
            ] = F),
            (this.instanceCloneAnimationFrameFromToBlend1Attribute.array[
              (T - 1) * 3 + 2
            ] = E % 1),
            (this.instanceCloneAnimationFrameFromToBlend2Attribute.array[
              (T - 1) * 3 + 0
            ] = u),
            (this.instanceCloneAnimationFrameFromToBlend2Attribute.array[
              (T - 1) * 3 + 1
            ] = f),
            (this.instanceCloneAnimationFrameFromToBlend2Attribute.array[
              (T - 1) * 3 + 2
            ] = p)));
    }
    ((this.instanceAnimationFrameFromToBlend1Attribute.needsUpdate = !0),
      (this.instanceAnimationFrameFromToBlend2Attribute.needsUpdate = !0),
      (this.instanceCloneAnimationFrameFromToBlend1Attribute.needsUpdate = !0),
      (this.instanceCloneAnimationFrameFromToBlend2Attribute.needsUpdate = !0));
  }
  updateCard(e) {
    this.cardTime = this.isCardActive ? this.cardTime + e : 0;
    const t = this.cardTextureSize.x,
      r = this.cardTextureSize.y,
      n = Math.floor((10 * this.cardTime) % (t * (r + 1))),
      a = n / (t * (r + 1)),
      l = math.linearStep(0, 0.15, a) * math.linearStep(1, 0.9, a);
    ((this.whiteTunnelUniforms.u_faceLedLight.value = l),
      this.materials.card.white.uniforms.u_cardUvOffset.value.set(
        (n % t) / t,
        (r - Math.floor(n / t)) / r,
      ));
  }
  update(e) {
    const {
      blackFrameInRatio: t,
      whiteFrameBreakRatio: r,
      whiteTunnelRatio: n,
      whiteFrameRatio: a,
      blackTunnelRatio: l,
      whiteTunnelAstronautRatio: c,
      isBlackTunnelActive: u,
      isWhiteTunnelActive: f,
      astronautDropRatio: p,
      blackTitleRatio: g,
    } = goalTunnels;
    (u &&
      (fboHelper.copy(
        goalBlackTunnel.feedbackRenderTarget.texture,
        this.renderTarget,
      ),
      blur.blur(16, 0.5, this.renderTarget, this.interRenderTarget),
      blur.blur(4, 0.5, this.renderTarget, this.interRenderTarget)),
      (this.showRatio = f ? math.smoothstep(0, 0.15, c) : 1),
      (this.clonesShowRatio = math.smoothstep(0.2, 0.4, l)),
      this.partIdList.forEach((v) => {
        ((this.meshes[v].material = this.materials[v][f ? "white" : "black"]),
          this.cloneMeshes[v] &&
            (this.cloneMeshes[v].visible = !f && this.clonesShowRatio > 0));
      }),
      (this.meshes.card.visible = p >= 0.95),
      this.sharedUniforms.u_bgColor.value.copy(properties.bgColor),
      (this.sharedUniforms.u_showRatio.value = this.showRatio),
      (this.blackTunnelUniforms.u_frameIn.value = t),
      (this.blackTunnelUniforms.u_sunFactor.value = u
        ? 1 - math.smoothstep(0.1, 0.2, l)
        : 1),
      (this.blackTunnelUniforms.u_blackTunnelTexture.value =
        this.renderTarget.texture),
      (this.blackTunnelUniforms.u_blackTunnelRatio.value = u
        ? math.smoothstep(0.1, 0.3, l)
        : 0),
      (this.blackTunnelUniforms.u_endRatio.value = u
        ? math.smoothstep(0.65, 0.9, l)
        : 0),
      (this.whiteTunnelUniforms.u_frameOutRatio.value = r),
      (this.whiteTunnelUniforms.u_whiteTunnelRatio.value = n),
      this.whiteTunnelUniforms.u_tintColor.value
        .setStyle("#2533c2")
        .multiplyScalar(math.fit(p, 1, 0, 0.2, 1) * (r > 0 ? 1 : 0)),
      (this.cloneUniforms.u_alpha.value = this.clonesShowRatio),
      this.updateTransforms(e),
      this.updateAnimation(e),
      this.updateCard(e),
      (this._cameraNeedsSync = !0),
      this.whiteTunnelUniforms.u_cardPosition.value.copy(
        this.transformObjectList[0].position,
      ),
      (this.whiteTunnelUniforms.u_cardPosition.value.y += 0.9));
  }
}
const goalTunnelAstronauts = new GoalTunnelAstronauts(),
  blockVert = `#define GLSLIFY 1
attribute float a_instanceId;uniform float u_time;uniform float u_ratio;uniform float u_ratioInverse;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;vec3 deform(in vec3 pos){float origZ=pos.z;float blockCount=float(BLOCK_COUNT);float ratio=mix(.1,1.,u_ratioInverse);float lengthRatio=-pos.z/blockCount;float scalar=mix(0.25,ratio,lengthRatio);pos.x*=1.0+scalar*0.5*sin(lengthRatio*6.283184);pos.y*=1.0+scalar*0.5*cos(lengthRatio*6.283184+3.1415926);float angleRatio=smoothstep(0.25,1.,u_ratioInverse);float angle=(angleRatio+angleRatio*lengthRatio*lengthRatio*1.)*-6.283184;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);pos.xy=m*pos.xy;pos.y+=ratio*sin(ratio*lengthRatio*3.141592*4.)*0.25;pos.z-=(cos(ratio*1.5+(1.0-ratio)*lengthRatio*3.141592*0.5)*0.5+0.5-1.0)*blockCount;pos.z*=1.0+16.0*(ratio*lengthRatio*lengthRatio)+2.0*ratio*(sin(8.0*lengthRatio)*0.5+0.5);pos.z*=(1.-ratio*ratio*ratio)*0.9+0.1;pos.z+=blockCount/4.;return pos*15.;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){float blockCount=float(BLOCK_COUNT);vec3 pos=position;pos.z-=a_instanceId;pos.z/=blockCount;float lengthRatio=-pos.z;pos.z*=blockCount;v_localPosition=pos;v_lengthRatio=lengthRatio;vec3 nor=deform(pos+normal*0.01);pos=deform(pos);nor=normalize(nor-pos);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;v_fog=-0.005*mvPosition.z/mvPosition.w;gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;}`,
  blockFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_ratioInverse;uniform vec3 u_fbm;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;uniform float u_time;float sphOcclusion(in vec3 pos,in vec3 nor,in vec4 sph){vec3 di=sph.xyz-pos;float l=length(di);float nl=dot(nor,di/l);float h=l/sph.w;float h2=h*h;float k2=1.0-h2*nl*nl;return max(0.0,nl)/h2;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 voronoi(const in vec4 x){vec4 p=floor(x);vec4 f=fract(x);float id=0.0;vec2 res=vec2(100.0);for(int l=-1;l<=1;l++){for(int k=-1;k<=1;k++){for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec4 b=vec4(float(i),float(j),float(k),float(l));vec4 r=vec4(b)-f+hash(p+b);float d=dot(r,r);float cond=max(sign(res.x-d),0.0);float nCond=1.0-cond;float cond2=nCond*max(sign(res.y-d),0.0);float nCond2=1.0-cond2;id=(dot(p+b,vec4(1.0,57.0,113.0,421.))*cond)+(id*nCond);res=vec2(d,res.x)*cond+res*nCond;res.y=cond2*d+nCond2*res.y;}}}}return vec3(sqrt(res),abs(id));}vec4 hash(float p){vec4 p4=fract(vec4(p)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 sph=vec4(u_fbm.x*2.,u_fbm.y*2.+1.,0.,2.5);vec3 worldNormal=normalize(v_worldNormal);float ao=1.-sphOcclusion(v_worldPosition,worldNormal,sph)*2.*smoothstep(0.8,0.5,u_ratioInverse);float shade=texture2D(u_texture,v_uv).r;float brightness=pow(v_lengthRatio,5.);float t=u_ratioInverse*-2.+u_time*0.2;vec3 vn=voronoi(vec4(v_localPosition*2.+vec3(0.,0.,-t*0.5),t*0.25));vec4 rnd=hash(vn.z);float threshold=0.05+rnd.x*0.1;float r=abs(vn.x-.5)*(1.75+rnd.y*0.5);float pattern=max(0.,1.-smoothstep(threshold-fwidth(r),threshold,r));vec3 color=mix(vec3(0.102,0.184,0.984),vec3(1.),pattern);color*=(.35+shade)*ao;color+=brightness;gl_FragColor=vec4(color,shade+brightness);gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0),smoothstep(0.8,1.0,u_ratioInverse)*0.5);gl_FragColor.a*=ao*mix(1.,0.15,pattern);gl_FragColor+=linearStep(-10.,-11.,v_localPosition.z);}`;
class GoalWhiteTunnel {
  container = new Object3D();
  baseMesh;
  wallMesh;
  BLOCK_COUNT = 16;
  TEXTURE_SIZE = 1024;
  prevRatio = 0;
  pt0 = new Vector3();
  pt1 = new Vector3();
  pt2 = new Vector3();
  sharedUniforms = {
    u_texture: { value: null },
    u_ratioInverse: { value: 0 },
    u_fbm: { value: null },
  };
  preInit() {
    ((this.fbm = new BrownianMotion()),
      (this.fbm._positionAmplitude = 2),
      (this.fbm._positionFrequency = 1),
      (this.sharedUniforms.u_fbm.value = this.fbm._position),
      (this.sharedUniforms.u_texture.value = properties.loader.add(
        settings.TEXTURE_PATH + "tunnels/white_block.webp",
        { type: "texture" },
      ).content),
      properties.loader.add(
        settings.MODEL_PATH + "tunnels/tunnel_block_base.buf",
        { onLoad: (t) => this._onTunnelBlockLoad(t, !1) },
      ),
      properties.loader.add(
        settings.MODEL_PATH + "tunnels/tunnel_block_wall.buf",
        { onLoad: (t) => this._onTunnelBlockLoad(t, !0) },
      ));
    let e = new Mesh(new SphereGeometry(7.5, 32, 24), new MeshNormalMaterial());
    e.position.z = 0;
  }
  _onTunnelBlockLoad(e, t) {
    let r = new InstancedBufferGeometry();
    for (let c in e.attributes) r.setAttribute(c, e.attributes[c]);
    r.setIndex(e.index);
    let n = new Float32Array(this.BLOCK_COUNT);
    for (let c = 0; c < this.BLOCK_COUNT; c++) n[c] = c;
    r.setAttribute("a_instanceId", new InstancedBufferAttribute(n, 1));
    let a = {
        u_ratio: goalTunnels.sharedUniforms.u_whiteTunnelRatio,
        u_texture: this.sharedUniforms.u_texture,
        u_ratioInverse: this.sharedUniforms.u_ratioInverse,
        u_fbm: this.sharedUniforms.u_fbm,
        u_time: goalTunnels.sharedUniforms.u_tunnelTime,
      },
      l = new Mesh(
        r,
        new ShaderMaterial({
          uniforms: a,
          vertexShader: blockVert,
          fragmentShader: blockFrag,
          extensions: { derivatives: !0 },
        }),
      );
    ((l.material.defines.BLOCK_COUNT = this.BLOCK_COUNT),
      (l.frustumCulled = !1),
      t
        ? ((this.wallMesh = l), (l.material.defines.IS_WALL = !0))
        : (this.baseMesh = l),
      this.container.add(l));
  }
  init() {}
  resize(e, t) {}
  update(e) {
    ((this.sharedUniforms.u_ratioInverse.value =
      1 - goalTunnels.whiteTunnelRatio),
      (goalTunnels.properties.cameraDollyZoomFovOffset = math.fit(
        goalTunnels.whiteTunnelRatio,
        0,
        1,
        60,
        0,
      )));
    let t = goalTunnels.whiteTunnelRatio - this.prevRatio;
    ((goalTunnelEfx.offsetPostion.z = math.clamp(
      -t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.9, 500, 0, ease.sineOut),
      -1,
      1,
    )),
      (goalTunnelEfx.offsetRotation.z = math.clamp(
        -t *
          math.fit(goalTunnels.whiteTunnelRatio, 0, 0.8, 45, 0, ease.sineOut),
        -1,
        1,
      )),
      this.fbm.update(e),
      (goalTunnelEfx.amount = math.fit(
        goalTunnels.whiteTunnelRatio,
        0.75,
        1,
        1,
        0,
      )),
      (this.prevRatio = goalTunnels.whiteTunnelRatio));
  }
}
const goalWhiteTunnel = new GoalWhiteTunnel(),
  vert$f = `#define GLSLIFY 1
attribute float piece;uniform sampler2D u_positionTexture;uniform sampler2D u_orientTexture;uniform vec2 u_textureSize;uniform float u_frameFrom;uniform float u_frameTo;uniform float u_frameRatio;uniform float u_fragmentScale;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec4 animationUvs=(vec4(piece,u_frameFrom,piece,u_frameTo)+.5)/u_textureSize.xyxy;vec3 piecePosFrom=texture2D(u_positionTexture,animationUvs.xy).xyz;vec4 pieceOrientFrom=texture2D(u_orientTexture,animationUvs.xy);vec3 piecePosTo=texture2D(u_positionTexture,animationUvs.zw).xyz;vec4 pieceOrientTo=texture2D(u_orientTexture,animationUvs.zw);float radius=length(position)*u_fragmentScale;vec3 dir=position/radius;vec3 posFrom=qrotate(pieceOrientFrom,dir);vec3 posTo=qrotate(pieceOrientTo,dir);v_localDir=normalize(mix(posFrom,posTo,u_frameRatio));vec3 pos=v_localDir*radius+mix(piecePosFrom,piecePosTo,u_frameRatio);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;gl_Position=projectionMatrix*mvPosition;}`,
  frag$j = `#define GLSLIFY 1
uniform sampler2D u_backgroundTexture;uniform vec2 u_resolution;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 hue2RGBSmooth(in float hue){vec3 rgb=clamp(abs(mod(hue*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return rgb*rgb*(3.0-2.0*rgb);}void main(){vec3 fdx=dFdx(v_viewPosition);vec3 fdy=dFdy(v_viewPosition);vec3 viewNormal=normalize(cross(fdx,fdy));float alpha=abs(1.-viewNormal.z);vec3 localDir=normalize(v_localDir);vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec3 bgColor=texture2D(u_backgroundTexture,uv).rgb;vec2 refl=reflect(normalize(v_viewPosition),viewNormal).xy;vec2 uvOffset=refl.xy*0.2*vec2(u_resolution.x/u_resolution.y,1.);vec3 color=texture2D(u_backgroundTexture,uv+uvOffset).rgb;color+=clamp(abs(mod((alpha)*8.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0)*(1.-alpha)*(1.-bgColor);gl_FragColor=vec4(color,alpha);}`;
class Ufx extends PostEffect {
  scene = new Scene();
  camera = new PerspectiveCamera(60, 1);
  frameIdx = -1;
  sectionLayer = new Object3D();
  projectDetailsLayer = new Object3D();
  sharedUniforms = { u_fromTexture: { value: null } };
  init() {}
  setPostprocessing(e) {
    let t = this.camera,
      r = properties.viewportWidth,
      n = properties.viewportHeight;
    (t.position.set(r / 2, -n / 2, n / (2 * Math.tan((t.fov * Math.PI) / 360))),
      (t.aspect = r / n),
      (t.far = t.position.z * 2),
      (t.near = t.far / 1e3),
      t.updateProjectionMatrix());
  }
  render(e, t = !1) {
    let r = fboHelper.getColorState(),
      n = properties.renderer;
    (fboHelper.copy(e.fromTexture, e.sceneRenderTarget),
      n.setRenderTarget(e.sceneRenderTarget),
      (fboHelper.renderer.autoClear = !1),
      (fboHelper.renderer.autoClearColor = !1),
      (fboHelper.renderer.autoClearStencil = !0),
      (fboHelper.renderer.autoClearDepth = !0),
      fboHelper.renderer.clear(!1, !0, !0),
      n.render(this.scene, this.camera),
      n.setRenderTarget(null));
    let a = t ? null : e.toRenderTarget;
    (fboHelper.copy(e.sceneTexture, a), fboHelper.setColorState(r), e.swap());
  }
}
class PreUfx extends Ufx {
  renderOrder = 50;
}
const preUfx = new PreUfx();
let _matrixWorld = new Matrix4(),
  _matrixWorldInverse = new Matrix4(),
  _projectionMatrix = new Matrix4(),
  _q$1 = new Quaternion(),
  _v1$3 = new Vector3();
class GoalTunnelGlass {
  PIECE_COUNT = 946;
  domFrameHeight = 1;
  domFrameRotation = 0;
  domFrameScale = 1;
  fragmentScale = 1;
  container;
  mesh;
  _geometry;
  ratio = 0;
  frameCount = 0;
  sharedUniforms = {
    u_positionTexture: { value: null },
    u_orientTexture: { value: null },
    u_textureSize: { value: new Vector2(0, 0) },
    u_frameFrom: { value: 0 },
    u_frameTo: { value: 0 },
    u_frameRatio: { value: 0 },
    u_fragmentScale: { value: 0 },
  };
  preInit() {
    ((this.container = new Object3D()),
      properties.loader.add(settings.MODEL_PATH + "tunnels/broken_glass.buf", {
        onLoad: (e) => {
          this._onModelLoad(e);
        },
      }),
      properties.loader.add(
        settings.MODEL_PATH + "tunnels/broken_glass_animation.buf",
        {
          onLoad: (e) => {
            this._onAnimationLoad(e);
          },
        },
      ));
  }
  _onModelLoad(e) {
    ((this.mesh = new Mesh(
      e,
      new ShaderMaterial({
        uniforms: {
          u_backgroundTexture:
            properties.postprocessing.sharedUniforms.u_fromTexture,
          u_resolution: properties.sharedUniforms.u_resolution,
          u_positionTexture: this.sharedUniforms.u_positionTexture,
          u_orientTexture: this.sharedUniforms.u_orientTexture,
          u_textureSize: this.sharedUniforms.u_textureSize,
          u_frameFrom: this.sharedUniforms.u_frameFrom,
          u_frameTo: this.sharedUniforms.u_frameTo,
          u_frameRatio: this.sharedUniforms.u_frameRatio,
          u_fragmentScale: this.sharedUniforms.u_fragmentScale,
        },
        vertexShader: vert$f,
        fragmentShader: frag$j,
        transparent: !0,
        extensions: { derivatives: !0 },
      }),
    )),
      (this.mesh.visible = !1),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 1e3),
      this.container.add(this.mesh),
      (this.mesh.onBeforeRender = this._onBeforeRender.bind(this)),
      (this.mesh.onAfterRender = this._onAfterRender.bind(this)));
  }
  _onBeforeRender(e, t, r) {
    let n = cameraControls._camera;
    (_matrixWorld.copy(r.matrixWorld),
      r.matrixWorld.copy(n.matrixWorld),
      _matrixWorldInverse.copy(r.matrixWorldInverse),
      r.matrixWorldInverse.copy(n.matrixWorldInverse),
      _projectionMatrix.copy(r.projectionMatrix),
      r.projectionMatrix.copy(n.projectionMatrix));
  }
  _onAfterRender(e, t, r) {
    (this.container.parent && (this.container.parent == (homeGoalSection.hostPage || window.homePage)?.preUfxContainer || this.container.parent == window.homePage?.preUfxContainer)) &&
      (r.matrixWorld.copy(_matrixWorld),
      r.matrixWorldInverse.copy(_matrixWorldInverse),
      r.projectionMatrix.copy(_projectionMatrix));
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) return;
    let t = e.attributes.position.array,
      r = new Float32Array((t.length / 3) * 4),
      n = (this.frameCount = t.length / (this.PIECE_COUNT * 3));
    this.sharedUniforms.u_textureSize.value.set(this.PIECE_COUNT, n);
    for (let a = 0, l = 0; a < t.length; a += 3, l += 4)
      ((r[l + 0] = t[a + 0]),
        (r[l + 1] = t[a + 1]),
        (r[l + 2] = t[a + 2]),
        (r[l + 3] = 0));
    ((this.sharedUniforms.u_positionTexture.value = fboHelper.createDataTexture(
      r,
      this.PIECE_COUNT,
      n,
      !0,
      !0,
    )),
      (this.sharedUniforms.u_orientTexture.value = fboHelper.createDataTexture(
        e.attributes.orient.array,
        this.PIECE_COUNT,
        n,
        !0,
        !0,
      )));
  }
  init() {
    this.mesh && taskManager.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    if (this.mesh && this.container.visible)
      if (this.ratio > 0) {
        let t = cameraControls._camera;
        (this.mesh.position.copy(t.position),
          this.mesh.quaternion.copy(t.quaternion),
          this.mesh.translateZ(-goalTunnels.EndCameraDepthToFrame));
        let r =
            Math.tan((t.fov * math.DEG2RAD) / 2) *
            goalTunnels.EndCameraDepthToFrame *
            2,
          n = this.domFrameHeight / properties.viewportHeight;
        ((n *= r * this.domFrameScale),
          _q$1.setFromAxisAngle(_v1$3.set(0, 0, 1), -this.domFrameRotation),
          this.mesh.quaternion.multiply(_q$1),
          this.mesh.scale.setScalar(n));
        let a = this.ratio * (this.frameCount - 1),
          l = Math.floor(a),
          c = Math.min(l + 1, this.frameCount - 1),
          u = a - l;
        ((this.sharedUniforms.u_frameFrom.value = l),
          (this.sharedUniforms.u_frameTo.value = c),
          (this.sharedUniforms.u_frameRatio.value = u),
          (this.sharedUniforms.u_fragmentScale.value = this.fragmentScale),
          (this.mesh.visible = !0));
      } else this.mesh.visible = !1;
  }
}
const goalTunnelGlass = new GoalTunnelGlass(),
  validateEmail = (o) =>
    o.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
var toQuerystring_min = { exports: {} };
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    return (() => {
      var t = {
          d: (p, g) => {
            for (var v in g)
              t.o(g, v) &&
                !t.o(p, v) &&
                Object.defineProperty(p, v, { enumerable: !0, get: g[v] });
          },
          o: (p, g) => Object.prototype.hasOwnProperty.call(p, g),
          r: (p) => {
            (typeof Symbol < "u" &&
              Symbol.toStringTag &&
              Object.defineProperty(p, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(p, "__esModule", { value: !0 }));
          },
        },
        r = {};
      function n(p) {
        return (
          (n =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (g) {
                  return typeof g;
                }
              : function (g) {
                  return g &&
                    typeof Symbol == "function" &&
                    g.constructor === Symbol &&
                    g !== Symbol.prototype
                    ? "symbol"
                    : typeof g;
                }),
          n(p)
        );
      }
      (t.r(r), t.d(r, { default: () => f }));
      var a = encodeURIComponent;
      function l(p, g, v, _, T) {
        var M = (_ && T.arrayPrefix) || "";
        if (n(g) === "object") {
          var S = ""
            .concat(p)
            .concat(M)
            .concat(v && "]", "[");
          return "".concat(u(g, "".concat(v).concat(S), T));
        }
        return v && v.length
          ? "".concat(v).concat(p, "]").concat(M, "=").concat(a(g))
          : "".concat(p).concat(M, "=").concat(a(g));
      }
      function c(p, g, v, _) {
        return g
          .map(function (T) {
            return l(p, T, v, !0, _);
          })
          .join("&");
      }
      function u(p) {
        var g =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "",
          v =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return (
          Array.isArray(p)
            ? p.map(function (_, T) {
                return l("".concat(T), _, g, !0, v);
              })
            : Object.keys(p)
                .filter(function (_) {
                  return p[_] !== void 0;
                })
                .map(function (_) {
                  return p[_] && Array.isArray(p[_])
                    ? c("".concat(_), p[_], g, v)
                    : l(_, p[_], g, !1, v);
                })
        )
          .join("&")
          .replace(/%20/g, "+");
      }
      const f = u;
      return r;
    })();
  });
})(toQuerystring_min);
var toQuerystring_minExports = toQuerystring_min.exports;
const toQueryString = getDefaultExportFromCjs(toQuerystring_minExports);
var browser = { exports: {} },
  debug$1 = { exports: {} },
  s = 1e3,
  m = s * 60,
  h = m * 60,
  d = h * 24,
  y = d * 365.25,
  ms = function (o, e) {
    e = e || {};
    var t = typeof o;
    if (t === "string" && o.length > 0) return parse(o);
    if (t === "number" && isNaN(o) === !1)
      return e.long ? fmtLong(o) : fmtShort(o);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(o),
    );
  };
function parse(o) {
  if (((o = String(o)), !(o.length > 100))) {
    var e =
      /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        o,
      );
    if (e) {
      var t = parseFloat(e[1]),
        r = (e[2] || "ms").toLowerCase();
      switch (r) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return t * y;
        case "days":
        case "day":
        case "d":
          return t * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return t * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return t * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return t * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return t;
        default:
          return;
      }
    }
  }
}
function fmtShort(o) {
  return o >= d
    ? Math.round(o / d) + "d"
    : o >= h
      ? Math.round(o / h) + "h"
      : o >= m
        ? Math.round(o / m) + "m"
        : o >= s
          ? Math.round(o / s) + "s"
          : o + "ms";
}
function fmtLong(o) {
  return (
    plural(o, d, "day") ||
    plural(o, h, "hour") ||
    plural(o, m, "minute") ||
    plural(o, s, "second") ||
    o + " ms"
  );
}
function plural(o, e, t) {
  if (!(o < e))
    return o < e * 1.5
      ? Math.floor(o / e) + " " + t
      : Math.ceil(o / e) + " " + t + "s";
}
(function (o, e) {
  ((e = o.exports = n.debug = n.default = n),
    (e.coerce = u),
    (e.disable = l),
    (e.enable = a),
    (e.enabled = c),
    (e.humanize = ms),
    (e.names = []),
    (e.skips = []),
    (e.formatters = {}));
  var t;
  function r(f) {
    var p = 0,
      g;
    for (g in f) ((p = (p << 5) - p + f.charCodeAt(g)), (p |= 0));
    return e.colors[Math.abs(p) % e.colors.length];
  }
  function n(f) {
    function p() {
      if (p.enabled) {
        var g = p,
          v = +new Date(),
          _ = v - (t || v);
        ((g.diff = _), (g.prev = t), (g.curr = v), (t = v));
        for (var T = new Array(arguments.length), M = 0; M < T.length; M++)
          T[M] = arguments[M];
        ((T[0] = e.coerce(T[0])), typeof T[0] != "string" && T.unshift("%O"));
        var S = 0;
        ((T[0] = T[0].replace(/%([a-zA-Z%])/g, function (C, w) {
          if (C === "%%") return C;
          S++;
          var R = e.formatters[w];
          if (typeof R == "function") {
            var E = T[S];
            ((C = R.call(g, E)), T.splice(S, 1), S--);
          }
          return C;
        })),
          e.formatArgs.call(g, T));
        var b = p.log || e.log || console.log.bind(console);
        b.apply(g, T);
      }
    }
    return (
      (p.namespace = f),
      (p.enabled = e.enabled(f)),
      (p.useColors = e.useColors()),
      (p.color = r(f)),
      typeof e.init == "function" && e.init(p),
      p
    );
  }
  function a(f) {
    (e.save(f), (e.names = []), (e.skips = []));
    for (
      var p = (typeof f == "string" ? f : "").split(/[\s,]+/),
        g = p.length,
        v = 0;
      v < g;
      v++
    )
      p[v] &&
        ((f = p[v].replace(/\*/g, ".*?")),
        f[0] === "-"
          ? e.skips.push(new RegExp("^" + f.substr(1) + "$"))
          : e.names.push(new RegExp("^" + f + "$")));
  }
  function l() {
    e.enable("");
  }
  function c(f) {
    var p, g;
    for (p = 0, g = e.skips.length; p < g; p++)
      if (e.skips[p].test(f)) return !1;
    for (p = 0, g = e.names.length; p < g; p++)
      if (e.names[p].test(f)) return !0;
    return !1;
  }
  function u(f) {
    return f instanceof Error ? f.stack || f.message : f;
  }
})(debug$1, debug$1.exports);
var debugExports = debug$1.exports;
(function (o, e) {
  var t = {};
  ((e = o.exports = debugExports),
    (e.log = a),
    (e.formatArgs = n),
    (e.save = l),
    (e.load = c),
    (e.useColors = r),
    (e.storage =
      typeof chrome < "u" && typeof chrome.storage < "u"
        ? chrome.storage.local
        : u()),
    (e.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson",
    ]));
  function r() {
    return typeof window < "u" &&
      window.process &&
      window.process.type === "renderer"
      ? !0
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
          (typeof window < "u" &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  e.formatters.j = function (f) {
    try {
      return JSON.stringify(f);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
  function n(f) {
    var p = this.useColors;
    if (
      ((f[0] =
        (p ? "%c" : "") +
        this.namespace +
        (p ? " %c" : " ") +
        f[0] +
        (p ? "%c " : " ") +
        "+" +
        e.humanize(this.diff)),
      !!p)
    ) {
      var g = "color: " + this.color;
      f.splice(1, 0, g, "color: inherit");
      var v = 0,
        _ = 0;
      (f[0].replace(/%[a-zA-Z%]/g, function (T) {
        T !== "%%" && (v++, T === "%c" && (_ = v));
      }),
        f.splice(_, 0, g));
    }
  }
  function a() {
    return (
      typeof console == "object" &&
      console.log &&
      Function.prototype.apply.call(console.log, console, arguments)
    );
  }
  function l(f) {
    try {
      f == null ? e.storage.removeItem("debug") : (e.storage.debug = f);
    } catch {}
  }
  function c() {
    var f;
    try {
      f = e.storage.debug;
    } catch {}
    return (!f && typeof process < "u" && "env" in process && (f = t.DEBUG), f);
  }
  e.enable(c());
  function u() {
    try {
      return window.localStorage;
    } catch {}
  }
})(browser, browser.exports);
var browserExports = browser.exports,
  debug = browserExports("jsonp"),
  jsonp_1 = jsonp,
  count = 0;
function noop() {}
function jsonp(o, e, t) {
  (typeof e == "function" && ((t = e), (e = {})), e || (e = {}));
  var r = e.prefix || "__jp",
    n = e.name || r + count++,
    a = e.param || "callback",
    l = e.timeout != null ? e.timeout : 6e4,
    c = encodeURIComponent,
    u = document.getElementsByTagName("script")[0] || document.head,
    f,
    p;
  l &&
    (p = setTimeout(function () {
      (g(), t && t(new Error("Timeout")));
    }, l));
  function g() {
    (f.parentNode && f.parentNode.removeChild(f),
      (window[n] = noop),
      p && clearTimeout(p));
  }
  function v() {
    window[n] && g();
  }
  return (
    (window[n] = function (_) {
      (debug("jsonp got", _), g(), t && t(null, _));
    }),
    (o += (~o.indexOf("?") ? "&" : "?") + a + "=" + c(n)),
    (o = o.replace("?&", "?")),
    debug('jsonp req "%s"', o),
    (f = document.createElement("script")),
    (f.src = o),
    u.parentNode.insertBefore(f, u),
    v
  );
}
const jsonp$1 = getDefaultExportFromCjs(jsonp_1),
  MAILCHIMP_URL =
    "https://lusion.us20.list-manage.com/subscribe/post?u=ea813c53ac6d7a0b76f2e36a1&amp;id=44b41b41bf&amp;v_id=4233&amp;f_id=001e18e7f0",
  getAjaxUrl = (o) => o.replace("/post?", "/post-json?");

class GoalSectionRanges {
  items = {};
  itemList = [
    { id: "blackFrameShow", isPixelBased: !0 },
    { id: "blackFrameIn", weight: 1 },
    { id: "blackTitle", weight: 5 },
    { id: "blackTunnel", weight: 12 },
    { id: "whiteTunnel", weight: 2 },
    { id: "whiteFrameOut", weight: 1 },
    { id: "whiteFrameBreak", weight: 1.5 },
    { id: "astronautDrop", isPixelBased: !0 },
    { id: "astronautWait", isPixelBased: !0 },
  ];
  offsetY = 0;
  prevRatio = null;
  ratio = null;
  wasActive = null;
  isActive = null;
  _cachedRanges = {};
  totalPixelCount = 0;
  totalTunnelWeight = 0;
  baseY = 0;
  domContainer;
  domImgIn;
  domImgOut;
  tick = 0;
  SHOW_DEBUG = !1;
  _debugTimeline;
  _debugTimelineItems = [];
  _debugTimelineIndicator;
  constructor() {
    this.totalTunnelWeight = 0;
    for (let t = 0; t < this.itemList.length; t++) {
      let r = this.itemList[t];
      ((this.items[r.id] = r),
        r.weight && (this.totalTunnelWeight += r.weight));
    }
  }
  init(e) {
    let c = e || document;
    ((this.domContainer = (c.querySelector && c.querySelector("#home-goal")) || document.getElementById("home-goal")),
      (this.domImgIn = (c.querySelector && c.querySelector("#home-goal-image-in")) || document.getElementById("home-goal-image-in")),
      (this.domImgOut = (c.querySelector && c.querySelector("#home-goal-image-out")) || document.getElementById("home-goal-image-out")));
    this.totalTunnelWeight = 0;
    for (let t = 0; t < this.itemList.length; t++) {
      let r = this.itemList[t];
      ((this.items[r.id] = r),
        r.weight && (this.totalTunnelWeight += r.weight));
    }
    if (this.SHOW_DEBUG) {
      ((this._debugTimeline = document.createElement("div")),
        (this._debugTimeline.style = `
				position: fixed;
				bottom: 0;
				left: 0;
				zIndex: 1000;
				height: 4px;
				width: 100%;
				pointerEvents: none;
			`),
        document.body.appendChild(this._debugTimeline));
      for (let t = 0; t < this.itemList.length; t++) {
        let r = (this._debugTimelineItems[t] = document.createElement("div"));
        ((r.style = `
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					bottom: 0;
					background: ${t % 2 ? "green" : "blue"};
					transform-origin: 0 0;
				`),
          this._debugTimeline.appendChild(r));
      }
      ((this._debugTimelineIndicator = document.createElement("div")),
        (this._debugTimelineIndicator.style = `
				position: position;
				left: -10px;
				top: -20px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 20px 10px 0 10px;
				border-color: red transparent transparent transparent;
			`),
        this._debugTimeline.appendChild(this._debugTimelineIndicator));
    }
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer),
      n = scrollManager.getDomRange(this.domImgIn),
      a = scrollManager.getDomRange(this.domImgOut);
    this.baseY = n.top - properties.viewportHeight;
    let c = r.bottom - this.baseY - (t + n.height) * 0.5 - (t + a.height) * 0.5;
    ((this.items.blackFrameShow.pixelCount = (t + n.height) * 0.5),
      (this.items.astronautDrop.pixelCount = (t + a.height) * 0.5 + t));
    let footerDom = (typeof footerSection !== "undefined" && footerSection.domContainer) || document.getElementById("footer-section");
    let footerBottom = footerDom ? scrollManager.getDomRange(footerDom).bottom : r.bottom + t * 4.5;
    let u = Math.max(t * 3.5, footerBottom - r.bottom);
    ((this.items.astronautWait.pixelCount = u),
      (this.totalPixelCount = 0));
    for (let f = 0; f < this.itemList.length; f++) {
      let p = this.itemList[f];
      ((p.pixelFrom = this.totalPixelCount),
        p.weight && (p.pixelCount = (c * p.weight) / this.totalTunnelWeight),
        (this.totalPixelCount += p.pixelCount),
        (p.pixelTo = this.totalPixelCount));
    }
    if (this.SHOW_DEBUG)
      for (let f = 0; f < this.itemList.length; f++) {
        let p = this.itemList[f],
          g = this._debugTimelineItems[f];
        g.style.transform = `translateX(${(p.pixelFrom / this.totalPixelCount) * e}px) scaleX(${p.pixelCount / this.totalPixelCount})`;
      }
  }
  update(e) {
    (this.tick++,
      (this.offsetY = scrollManager.scrollPixel - this.baseY),
      (this.prevRatio = this.ratio),
      (this.ratio = this.offsetY / this.totalPixelCount),
      (this.wasActive = this.isActive),
      (this.isActive = this.ratio >= 0 && this.ratio < 1),
      this.SHOW_DEBUG &&
        (this._debugTimelineIndicator.style.transform = `translateX(${this.ratio * properties.viewportWidth}px) translate3d(-50%, -20px, 0)`));
  }
  getRange(e, t = e) {
    let r = e + "-" + t,
      n = this._cachedRanges[r];
    return (
      n ||
        (n = this._cachedRanges[r] =
          { from: this.items[e], to: this.items[t] }),
      n.tick !== this.tick &&
        ((n.tick = this.tick),
        (n.pixelFrom = n.from.pixelFrom),
        (n.pixelTo = n.to.pixelTo),
        (n.pixelCount = n.pixelTo - n.pixelFrom),
        (n.pixel = scrollManager.scrollPixel - this.baseY - n.pixelFrom),
        (n.ratio = n.pixel / n.pixelCount),
        (n.isActive = n.ratio >= 0 && n.ratio < 1)),
      n
    );
  }
}
const homeGoalSectionRanges = new GoalSectionRanges(),
  vert$e = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;void main(){vec3 pos=position;pos.z*=0.1;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=pos;}`,
  frag$i = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;uniform sampler2D u_earthTexture;uniform vec3 u_bgColor;uniform vec3 u_atmosphereColor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getBlueNoise>
void main(){vec3 bn=getBlueNoise(gl_FragCoord.xy);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 earthMap=texture2D(u_earthTexture,v_uv).rgb;gl_FragColor.rgb=earthMap;gl_FragColor.a=0.0;}`;
class GoalTunnelsBackground {
  container = new Object3D();
  mesh = null;
  constructor() {}
  preInit() {
    ((this.earthTexture = properties.loader.add(
      settings.TEXTURE_PATH + "tunnels/earth_landscape.jpg",
      { type: "texture", minFilter: LinearFilter },
    ).content),
      properties.loader.add(settings.MODEL_PATH + "tunnels/earth_card.buf", {
        onLoad: (e) => {
          this.geo = e;
        },
      }));
  }
  init() {
    ((this.mesh = new Mesh(
      this.geo,
      new ShaderMaterial({
        uniforms: Object.assign(
          {
            u_bgColor: { value: new Color() },
            u_atmosphereColor: { value: new Color("#4169E1") },
            u_earthTexture: { value: this.earthTexture },
          },
          blueNoise.sharedUniforms,
        ),
        vertexShader: vert$e,
        fragmentShader: frag$i,
      }),
    )),
      (this.mesh.renderOrder = -1),
      (this.mesh.frustumCulled = !1),
      this.container.add(this.mesh));
  }
  resize(e, t) {}
  update(e) {
    const t = math.saturate(
        homeGoalSectionRanges.getRange("blackFrameShow").ratio,
      ),
      r = math.saturate(homeGoalSectionRanges.getRange("blackFrameIn").ratio);
    (this.mesh.material.uniforms.u_bgColor.value.copy(properties.bgColor),
      (this.mesh.position.y = -(10 * (1 - t) + 2.5 + 30 * r)),
      this.mesh.scale.setScalar(math.fit(r, 0, 0.5, 40, 70)),
      (this.container.rotation.x = math.fit(r, 0, 0.5, 0, -1)),
      (this.mesh.visible = r < 1));
  }
}
const goalTunnelsBackground = new GoalTunnelsBackground(),
  vert$d = `#define GLSLIFY 1
attribute vec3 a_instancePosition;attribute vec3 a_instanceRotationAxis;attribute vec4 a_instanceRand;attribute float thickness;uniform float u_time;uniform float u_aspect;uniform float u_activeRatio;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif
float elasticOut(float t){return sin(-13.0*(t+1.0)*HALF_PI)*pow(2.0,-10.0*t)+1.0;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec3 rotate(vec3 v,vec3 axis,float angle){vec4 q=quaternion(axis,angle*.5);return qrotate(q,v);}void main(){float time=0.5*u_time+4.*a_instanceRand.x;float scale=0.75;vec3 pos=position;vec4 orient=quaternion(a_instanceRotationAxis,(0.5+a_instanceRand.y)*time);pos=qrotate(orient,pos);pos*=scale;vec3 nor=qrotate(orient,normal);vec3 instancePosition=a_instancePosition;instancePosition.y+=0.5*u_time*(1.+a_instanceRand.x);float yLimit=20.0/u_aspect;instancePosition.y=mod(instancePosition.y,yLimit)-0.5*yLimit;v_fadeOut=abs(instancePosition.y)/(yLimit*0.5);pos*=linearStep(a_instanceRand.w*0.5,a_instanceRand.w*0.5+0.5,u_activeRatio);pos+=instancePosition;vec4 orientInv=vec4(-orient.xyz,orient.w);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_cameraPositionLS=qrotate(orientInv,(cameraPosition-instancePosition)/scale);v_positionLS=position*scale;v_normalLS=normal;v_orient=orient;v_viewNormal=normalMatrix*nor;v_thickness=thickness;}`,
  frag$h = `#define GLSLIFY 1
uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec4 u_planes[25];uniform mat3 normalMatrix;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float plaIntersect(in vec3 ro,in vec3 rd,in vec4 p){return-(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);}vec4 getColorShade(vec3 dir,vec3 vn){float d=dot(dir,vn);float shade=(1.0-max(0.,vn.z))*v_thickness*5.;shade*=(pow(linearStep(2.,-1.,d),4.)*0.15+pow(linearStep(1.,-2.,d),5.)*7.);vec3 rgb=mix(vec3(0.8),clamp(abs(mod((d+vn.z)*12.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0),1.-shade);return vec4((vec3(u_color)+rgb*1.2)*shade,0.035+(1.-v_thickness)*shade*shade)*(1.-abs(vn.z));}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 localDir=normalize(v_positionLS);vec3 viewNormal=normalize(v_viewNormal);float ior=2.418;vec3 norLS=normalize(v_normalLS);vec3 refrLS=refract(normalize(v_positionLS-v_cameraPositionLS),norLS,1./ior);float dist=100.;vec3 planeDir=vec3(0.);for(int i=0;i<25;i++){vec4 plane=u_planes[i];plane.xyz*=-1.;plane.w*=0.7501;float hitDist=plaIntersect(v_positionLS+refrLS*0.001,refrLS,plane);if(hitDist>0.&&hitDist<dist){dist=hitDist;planeDir=u_planes[i].xyz;}}vec3 refrPosLS=v_positionLS+refrLS*dist;refrLS=refract(refrLS,planeDir,ior);vec3 refrLocalDir=qrotate(v_orient,normalize(refrPosLS));vec3 viewPlaneNor=normalMatrix*qrotate(v_orient,planeDir);vec4 frontColorShade=getColorShade(localDir,viewNormal);vec4 backColorShade=getColorShade(refrLocalDir,viewPlaneNor);gl_FragColor=frontColorShade*1.5+vec4(backColorShade.rgb*0.75,backColorShade.a*.5);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`,
  _v$1 = new Vector3();
class GoalWhiteTunnelParticles {
  PARTICLE_COUNT = 64;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  activeRatio = 0;
  constructor() {}
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "tunnels/diamond.buf", {
      onLoad: (e) => (this.geo = e),
    });
  }
  init() {
    let e = this.geo || new BufferGeometry(),
      t = new InstancedBufferGeometry();
    for (let u in e.attributes) t.attributes[u] = e.attributes[u];
    t.index = e.index;
    let r = math.getSeedRandomFn("diamonds-3");
    const n = new Float32Array(this.PARTICLE_COUNT * 3),
      a = new Float32Array(this.PARTICLE_COUNT * 3),
      l = new Float32Array(this.PARTICLE_COUNT * 4);
    let c = [
      -0.694747, 0.694747, 0.186157, -0.239229, -0.50859, 0.694747, 0.50859,
      -0.239229, -0.186157, 0.694747, 0.694747, -0.239229, 0.186157, 0.694747,
      0.694747, -0.239229, 0.50859, 0.694747, 0.50859, -0.239229, 0.694747,
      0.694747, 0.186157, -0.239229, 0.694747, 0.694747, -0.186157, -0.239229,
      0.50859, 0.694747, -0.50859, -0.239229, 0.186157, 0.694747, -0.694746,
      -0.239229, -0.186156, 0.694747, -0.694747, -0.239229, -0.508589, 0.694747,
      -0.50859, -0.239229, -0.694747, 0.694747, -0.186157, -0.239229, -0.694747,
      -0.694747, 0.186157, -0.455518, -0.50859, -0.694747, 0.50859, -0.455518,
      -0.186157, -0.694747, 0.694747, -0.455518, 0.186157, -0.694747, 0.694747,
      -0.455518, 0.50859, -0.694747, 0.50859, -0.455518, 0.694746, -0.694747,
      0.186157, -0.455518, 0.694746, -0.694747, -0.186157, -0.455518, 0.50859,
      -0.694747, -0.50859, -0.455518, 0.186157, -0.694747, -0.694746, -0.455518,
      -0.186156, -0.694747, -0.694747, -0.455518, -0.508589, -0.694747,
      -0.50859, -0.455518, -0.694747, -0.694747, -0.186157, -0.455518, -0, -1,
      -0, -0.34434,
    ];
    for (let u = 0, f = 0, p = 0; u < this.PARTICLE_COUNT; u++, f += 3, p += 4)
      ((n[f] = 16 * (r() * 2 - 1)),
        (n[f + 1] = 16 * (r() * 2 - 1)),
        (n[f + 2] =
          19 - ((this.PARTICLE_COUNT - u - 1) / (this.PARTICLE_COUNT - 1)) * 8),
        _v$1.randomDirection(),
        (a[f] = _v$1.x),
        (a[f + 1] = _v$1.y),
        (a[f + 2] = _v$1.z),
        (l[p] = r()),
        (l[p + 1] = r()),
        (l[p + 2] = r()),
        (l[p + 3] = r()));
    (t.setAttribute("a_instancePosition", new InstancedBufferAttribute(n, 3)),
      t.setAttribute(
        "a_instanceRotationAxis",
        new InstancedBufferAttribute(a, 3),
      ),
      t.setAttribute("a_instanceRand", new InstancedBufferAttribute(l, 4)),
      (this.material = new ShaderMaterial({
        vertexShader: vert$d,
        fragmentShader: frag$h,
        uniforms: {
          u_time: properties.sharedUniforms.u_time,
          u_activeRatio: { value: 0 },
          u_color: { value: new Color("#689aff") },
          u_planes: { value: c },
          u_bgColor: { value: new Color() },
          u_aspect: properties.sharedUniforms.u_aspect,
        },
        transparent: !0,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: ZeroFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor,
      })),
      (this.mesh = new Mesh(t, this.material)),
      (this.mesh.frustumCulled = !1),
      this.container.add(this.mesh));
  }
  resize(e, t) {}
  update(e) {
    const { whiteTunnelWaitRatio: t } = goalTunnels;
    ((this.activeRatio = math.fit(t, 0, 0.2, 0, 1)),
      (this.container.visible = this.activeRatio > 0),
      (this.material.uniforms.u_activeRatio.value = this.activeRatio),
      this.material.uniforms.u_bgColor.value.copy(properties.bgColor));
  }
}
const goalWhiteTunnelParticles = new GoalWhiteTunnelParticles(),
  vert$c = `#define GLSLIFY 1
attribute float instanceId;attribute vec4 instanceUvInfo;attribute vec4 instanceRands;uniform float u_time;uniform float u_activeRatio;uniform float u_aspect;uniform vec2 u_textureSize;varying float v_fadeOut;varying vec2 v_uv;vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 pos=position;pos.xy*=instanceUvInfo.zw*u_textureSize*0.01;float t=u_time*mix(0.05,0.1,instanceRands.x)+instanceRands.y;float cycle=floor(t);float ratio=fract(t);vec4 cycleRands=hash42(vec2(cycle,instanceId));pos.xy=rotate(pos.xy,instanceRands.z*6.28+sign(cycleRands.z-.5)*u_time*mix(.5,1.,cycleRands.y))*linearStep(instanceRands.w*0.5,instanceRands.w*0.5+0.5,u_activeRatio)*0.35;float yLimit=7.0/u_aspect;vec3 instancePos=vec3(mix(-5.,5.,cycleRands.x),yLimit*mix(-1.0,1.0,ratio),20.+instanceId/float(COUNT));pos+=instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=instanceUvInfo.xy+instanceUvInfo.zw*vec2(uv.x,1.-uv.y);v_uv.y=1.0-v_uv.y;v_fadeOut=2.0*abs(ratio-0.5);}`,
  frag$g = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_bgColor;varying vec2 v_uv;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){gl_FragColor=texture2D(u_texture,v_uv);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`,
  goalWhiteTunnelStickerData = [
    { x: 1132, y: 3, w: 195, h: 195 },
    { x: 744, y: 3, w: 195, h: 256 },
    { x: 525, y: 3, w: 213, h: 282 },
    { x: 242, y: 3, w: 277, h: 286 },
    { x: 1055, y: 633, w: 209, h: 209 },
    { x: 1076, y: 398, w: 209, h: 209 },
    { x: 3, y: 772, w: 298, h: 249 },
    { x: 945, y: 3, w: 181, h: 249 },
    { x: 1291, y: 389, w: 160, h: 197 },
    { x: 1055, y: 848, w: 83, h: 122 },
    { x: 1132, y: 204, w: 167, h: 179 },
    { x: 1270, y: 828, w: 192, h: 193 },
    { x: 780, y: 265, w: 182, h: 167 },
    { x: 564, y: 445, w: 294, h: 184 },
    { x: 307, y: 683, w: 205, h: 334 },
    { x: 864, y: 438, w: 206, h: 189 },
    { x: 968, y: 258, w: 149, h: 134 },
    { x: 734, y: 635, w: 165, h: 382 },
    { x: 605, y: 291, w: 169, h: 141 },
    { x: 302, y: 445, w: 256, h: 232 },
    { x: 518, y: 683, w: 210, h: 266 },
    { x: 242, y: 295, w: 357, h: 144 },
    { x: 3, y: 3, w: 233, h: 469 },
    { x: 905, y: 633, w: 144, h: 340 },
    { x: 1270, y: 613, w: 187, h: 209 },
    { x: 3, y: 478, w: 293, h: 288 },
  ];
new Vector3();
class GoalWhiteTunnelStickers {
  COUNT = 26;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  textureSize = new Vector2(1465, 1024);
  sharedUniforms = {
    u_texture: { value: null },
    u_textureSize: { value: this.textureSize },
    u_activeRatio: { value: 0 },
  };
  preInit() {
    this.sharedUniforms.u_texture.value = properties.loader.add(
      settings.TEXTURE_PATH +
        "tunnels/" +
        (browser$1.isMobile ? "stickers_low.png" : "stickers.png"),
      { type: "texture" },
    ).content;
  }
  init() {
    let e = new PlaneGeometry(1, 1),
      t = new InstancedBufferGeometry();
    for (let l in e.attributes) t.attributes[l] = e.attributes[l];
    t.index = e.index;
    let r = new Float32Array(this.COUNT),
      n = new Float32Array(this.COUNT * 4),
      a = new Float32Array(this.COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < this.COUNT; l++, c += 3, u += 4) {
      r[l] = l / this.COUNT;
      let f = goalWhiteTunnelStickerData[l % goalWhiteTunnelStickerData.length];
      ((n[u + 0] = f.x / this.textureSize.x),
        (n[u + 1] = f.y / this.textureSize.y),
        (n[u + 2] = f.w / this.textureSize.x),
        (n[u + 3] = f.h / this.textureSize.y),
        (a[u] = Math.random()),
        (a[u + 1] = Math.random()),
        (a[u + 2] = Math.random()),
        (a[u + 3] = Math.random()));
    }
    (t.setAttribute("instanceId", new InstancedBufferAttribute(r, 1)),
      t.setAttribute("instanceUvInfo", new InstancedBufferAttribute(n, 4)),
      t.setAttribute("instanceRands", new InstancedBufferAttribute(a, 4)),
      (this.material = new ShaderMaterial({
        vertexShader: vert$c,
        fragmentShader: frag$g,
        uniforms: {
          u_time: properties.sharedUniforms.u_time,
          u_activeRatio: this.sharedUniforms.u_activeRatio,
          u_texture: this.sharedUniforms.u_texture,
          u_textureSize: this.sharedUniforms.u_textureSize,
          u_bgColor: { value: new Color() },
          u_aspect: properties.sharedUniforms.u_aspect,
        },
        transparent: !0,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: SrcAlphaFactor,
        blendDst: OneMinusSrcAlphaFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: ZeroFactor,
        blendDstAlpha: ZeroFactor,
      })),
      (this.material.defines.COUNT = this.COUNT),
      (this.mesh = new Mesh(t, this.material)),
      (this.mesh.frustumCulled = !1),
      this.container.add(this.mesh));
  }
  resize(e, t) {}
  update(e) {
    const { whiteTunnelWaitRatio: t } = goalTunnels;
    ((this.activeRatio = math.fit(t, 0, 0.2, 0, 1)),
      (this.container.visible = this.activeRatio > 0),
      (this.material.uniforms.u_activeRatio.value = this.activeRatio),
      this.material.uniforms.u_bgColor.value.copy(properties.bgColor));
  }
}
const goalWhiteTunnelStickers = new GoalWhiteTunnelStickers();
class GoalTunnels extends Stage3D {
  THRESHOLD = [0, 0.3, 0.8, 1];
  blackTitleRatio = 0;
  blackTunnelRatio = 0;
  whiteTunnelRatio = 0;
  frameHeight = 1;
  EndCameraDepthToFrame = 2;
  isBlackTitleActive = !1;
  isBlackTunnelActive = !1;
  isWhiteTunnelActive = !1;
  expectedFov = 45;
  freezeRatio = 0;
  tunnelDeltaTime = 1;
  tunnelTime = 1;
  sharedUniforms = {
    u_whiteTunnelRatio: { value: 0 },
    u_tunnelTime: { value: 0 },
  };
  constructor() {
    super({
      ratio: 0,
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 25),
        defaultLookAtPosition: new Vector3(0, 0, 24),
        cameraLookStrength: 0.2,
        cameraLookEaseDamp: 0.1,
        bloomAmount: 0,
        cameraFov: 30,
        haloRGBShift: 0.015,
        clearAlpha: 0,
      },
    });
  }
  preInit() {
    (goalTunnelEfx.init(),
      properties.postprocessing.queue.push(goalTunnelEfx),
      goalTunnelAstronauts.preInit(),
      goalBlackTunnel.preInit(),
      goalWhiteTunnel.preInit(),
      goalTunnelsBackground.preInit(),
      goalWhiteTunnelParticles.preInit(),
      goalWhiteTunnelStickers.preInit(),
      this.add(goalTunnelsBackground.container),
      this.add(goalBlackTunnel.container),
      this.add(goalWhiteTunnel.container),
      this.add(goalWhiteTunnelParticles.container),
      this.add(goalWhiteTunnelStickers.container),
      goalTunnelGlass.preInit(),
      ((homeGoalSection.hostPage || window.homePage)?.preUfxContainer || window.homePage?.preUfxContainer)?.add(goalTunnelGlass.container));
  }
  init() {
    (goalTunnelAstronauts.init(),
      goalBlackTunnel.init(),
      goalWhiteTunnel.init(),
      goalTunnelGlass.init(),
      goalTunnelsBackground.init(),
      goalWhiteTunnelParticles.init(),
      goalWhiteTunnelStickers.init(),
      this.resetAstronautLayer(),
      taskManager.add(this));
  }
  resize(e, t) {
    (goalTunnelAstronauts.resize(e, t),
      goalBlackTunnel.resize(e, t),
      goalWhiteTunnel.resize(e, t),
      goalTunnelsBackground.resize(e, t),
      goalWhiteTunnelParticles.resize(e, t),
      goalWhiteTunnelStickers.resize(e, t));
  }
  updateRatios() {
    ((this.blackFrameInRatio = math.saturate(
      homeGoalSectionRanges.getRange("blackFrameIn").ratio,
    )),
      (this.blackTitleRatio = math.saturate(
        homeGoalSectionRanges.getRange("blackTitle").ratio,
      )),
      (this.blackTunnelRatio = math.saturate(
        homeGoalSectionRanges.getRange("blackTunnel").ratio,
      )),
      (this.whiteFrameRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteTunnel").ratio,
      )),
      (this.whiteFrameOutRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteFrameOut").ratio,
      )),
      (this.whiteFrameBreakRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteFrameBreak").ratio,
      )),
      (this.astronautDropRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop")
          .ratio,
      )),
      (this.whiteTunnelRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameOut").ratio,
      )),
      (this.whiteTunnelAstronautRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameBreak").ratio,
      )),
      (this.whiteTunnelAstronautOutRatio = math.saturate(
        homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautWait")
          .ratio,
      )),
      (this.whiteTunnelWaitRatio = math.saturate(
        homeGoalSectionRanges.getRange("astronautWait").ratio,
      )));
    let e = this.isBlackTunnelActive,
      t = this.isWhiteTunnelActive;
    ((this.isBlackTitleActive = this.blackTitleRatio < 1),
      (this.isBlackTunnelActive =
        this.blackTunnelRatio < 1 && !this.isBlackTitleActive),
      (this.isWhiteTunnelActive =
        this.whiteTunnelRatio <= 1 &&
        !this.isBlackTunnelActive &&
        !this.isBlackTitleActive),
      (goalBlackTunnel.container.visible = this.isBlackTunnelActive),
      (goalWhiteTunnel.container.visible =
        this.isWhiteTunnelActive && this.astronautDropRatio < 1),
      goalTunnelGlass.container &&
        ((goalTunnelGlass.container.visible =
          goalTunnelGlass.container.visible && this.astronautDropRatio < 1),
        (goalTunnelGlass.fragmentScale = math.fit(
          this.astronautDropRatio,
          0.75,
          1,
          1,
          0,
        ))),
      ((this.isWhiteTunnelActive && !t) || (this.isBlackTunnelActive && !e)) &&
        (goalTunnelEfx.needsSync = !0),
      (this.sharedUniforms.u_whiteTunnelRatio.value = this.whiteTunnelRatio));
    let r = math.mix(
        this.frameHeight,
        properties.viewportHeight,
        this.blackFrameInRatio < 1
          ? this.blackFrameInRatio
          : 1 - this.whiteFrameRatio,
      ),
      n = (this.expectedFov / 180) * Math.PI,
      a = this.defaultCameraPosition.distanceTo(this.defaultLookAtPosition),
      l = (Math.tan(n / 2) * a * 2 * properties.viewportHeight) / r;
    ((this.properties.cameraFov = ((Math.atan(l / 2 / a) * 2) / Math.PI) * 180),
      goalTunnelEfx.offsetPostion.set(0, 0, 0),
      goalTunnelEfx.offsetRotation.set(0, 0, 0),
      goalTunnelEfx.offsetScale.set(1, 1, 1),
      (goalTunnelEfx.amount = 1));
  }
  syncProperties(e) {
    ((this.properties.haloStrength =
      this.blackFrameInRatio *
      (math.mix(0, 0.15, this.blackTitleRatio) +
        math.fit(this.blackTunnelRatio, 0.2, 0.4, 0, 0.25))),
      (this.properties.haloStrength = math.fit(
        this.blackTunnelRatio,
        0.65,
        0.75,
        this.properties.haloStrength,
        0.08,
      )),
      (this.properties.bloomSaturation =
        this.blackTunnelRatio < 1
          ? math.fit(this.blackTunnelRatio, 0, 0.7, 1, 3)
          : 1),
      this.isWhiteTunnelActive
        ? ((this.properties.bloomAmount =
            this.astronautDropRatio < 1
              ? math.fit(this.whiteFrameRatio, 0, 0.05, 4, 2)
              : math.fit(this.whiteTunnelWaitRatio, 0, 0.1, 0, 20)),
          (this.properties.haloStrength = 0),
          (this.properties.clearAlpha = math.fit(
            this.whiteTunnelWaitRatio,
            0,
            0.1,
            0.3,
            0,
          )),
          (this.properties.cameraNear = 1),
          (this.properties.cameraFar = 200))
        : ((this.properties.bloomAmount = math.fit(
            this.blackTitleRatio,
            0,
            0.25,
            30,
            6,
          )),
          (this.properties.cameraNear = 1),
          (this.properties.cameraFar = 200)),
      (this.properties.cameraLookStrength =
        0.08 * math.smoothstep(0.5, 1, this.blackTitleRatio) + 0.02),
      (this.properties.cameraLookStrength *=
        this.whiteTunnelRatio > 0
          ? math.fit(this.whiteTunnelAstronautOutRatio, 0.75, 1, 0, 0.5)
          : 1),
      (this.properties.cameraLookStrength = math.fit(
        this.whiteTunnelWaitRatio,
        0,
        0.1,
        this.properties.cameraLookStrength,
        0.05,
      )),
      (this.freezeRatio += ((input.isDown ? 1 : 0) - this.freezeRatio) * 0.1),
      (this.tunnelDeltaTime = math.fit(this.freezeRatio, 0, 1, 1, 0.3) * e),
      (this.tunnelDeltaTime = math.fit(
        this.blackFrameInRatio,
        0,
        1,
        e,
        this.tunnelDeltaTime,
      )),
      (this.tunnelDeltaTime = math.fit(
        this.whiteTunnelAstronautOutRatio,
        0.5,
        0.75,
        this.tunnelDeltaTime,
        e,
      )),
      (this.tunnelTime += this.tunnelDeltaTime),
      (this.sharedUniforms.u_tunnelTime.value = this.tunnelTime),
      (this.properties.autoScrollSpeed =
        (1 - this.freezeRatio) *
        input.lastScrollYDirection *
        2.5 *
        math.fit(this.blackFrameInRatio, 0, 0.5, 0, 1) *
        math.fit(this.whiteTunnelWaitRatio, 0, 0.25, 1, 0)));
  }
  resetAstronautLayer() {
    this.add(goalTunnelAstronauts.container);
  }
  update(e) {
    (this.isBlackTitleActive && properties.bgColor.setStyle("#000"),
      this.isBlackTunnelActive &&
        (properties.bgColor.setStyle("#000"),
        goalBlackTunnel.update(this.tunnelDeltaTime)),
      this.isWhiteTunnelActive &&
        (properties.bgColor.setStyle(
          this.astronautDropRatio < 1 ? "#fff" : "#000",
        ),
        goalWhiteTunnel.update(this.tunnelDeltaTime),
        this.whiteTunnelRatio == 1 &&
          this.astronautDropRatio < 1 &&
          ((homeGoalSection.hostPage || window.homePage)?.preUfxContainer || window.homePage?.preUfxContainer)?.add(goalTunnelAstronauts.container)),
      goalTunnelAstronauts.update(this.tunnelDeltaTime),
      goalTunnelGlass.update(e),
      goalTunnelsBackground.update(e),
      goalWhiteTunnelParticles.update(e),
      goalWhiteTunnelStickers.update(e));
  }
}
const goalTunnels = new GoalTunnels(),
  frameBgVert = `#define GLSLIFY 1
attribute vec2 position;uniform vec2 u_viewportResolution;uniform vec2 u_frameOffset;uniform float u_frameScale;uniform float u_frameRotate;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_dom2Offset;uniform vec2 u_dom2WH;varying vec2 v_uv;varying vec2 v_uv2;mat2 getRotation2D(float a){float s=sin(a);float c=cos(a);return mat2(c,-s,s,c);}void main(){v_uv=position*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv-=u_frameOffset;v_uv=getRotation2D(u_frameRotate)*v_uv;v_uv/=u_frameScale;v_uv2=v_uv+(-u_dom2Offset);v_uv2=(v_uv2+u_dom2WH*0.5)/u_dom2WH;v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,0.0,1.0);}`,
  frameBgFrag = `#define GLSLIFY 1
uniform sampler2D u_dom2Texture;uniform vec3 u_bgColor;uniform vec2 u_domWH;uniform vec2 u_dom2WH;uniform float u_globalRadius;uniform float u_radiusScale;uniform vec3 u_glowColor;uniform float u_glowRadius;uniform float u_glowUpperBound;uniform float u_glowPow;uniform float u_glowTint;varying vec2 v_uv;varying vec2 v_uv2;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}float sdBox(in vec2 p,in vec2 b){vec2 w=abs(p)-b;vec2 s=vec2(p.x<0.0?-1:1,p.y<0.0?-1:1);float g=max(w.x,w.y);return(g>0.0)?length(max(w,0.0)):g;}void main(){vec3 map=texture2D(u_dom2Texture,v_uv2).rgb;float opacity=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius*u_radiusScale,1.);vec3 color=u_bgColor;float shadow=1.0;vec2 lightPos=vec2(2.,1.5);vec2 tabletSize=vec2(u_domWH.x/u_domWH.y,1.);float tabletRadiusOffset=0.05;vec2 pos=(v_uv*2.-1.)*tabletSize;vec2 toLight=normalize(lightPos-pos);float dist=sdBox(pos,tabletSize-tabletRadiusOffset)-u_glowRadius-tabletRadiusOffset;color=mix(u_glowColor,color,pow(linearStep(0.,u_glowUpperBound,dist),u_glowPow));color=mix(color,mix(map.ggg,map.ggg*u_glowColor,u_glowTint),1.-map.r);gl_FragColor=vec4(color,opacity);}`;
class HomeGoalSectionTunnelTitle {
  domContainer;
  domLines;
  domLineWords = [];
  totalLineHeight = 0;
  RATIO_FROM = 0.25;
  RATIO_TO = 1;
  init(e) {
    let c = e || document;
    ((this.domContainer = (c.querySelector && c.querySelector("#home-goal-tunnel-title")) || document.getElementById("home-goal-tunnel-title")),
      (this.domLines = (c.querySelectorAll && c.querySelectorAll(".home-goal-tunnel-title-line")) || (this.domContainer ? this.domContainer.querySelectorAll(".home-goal-tunnel-title-line") : [])));
    for (let t = 0; t < this.domLines.length; t++) {
      let r = this.domLines[t],
        a = r.textContent.replace(/\s+/g, " ").split(" "),
        l = "";
      for (let c = 0; c < a.length; c++) l += "<span>" + a[c] + "</span>";
      ((r.innerHTML = l), (this.domLineWords[t] = r.querySelectorAll("span")));
    }
  }
  resize(e, t) {
    if (!this.domContainer) this.init();
    if (!this.domContainer) return;
    this.domContainer.style.transform = "translateZ(0)";
    let r = this.domContainer.getBoundingClientRect(),
      n = r.width,
      a = r.left;
    this._resetWords();
    for (let l = 0; l < this.domLineWords.length; l++) {
      let c = this.domLineWords[l],
        u = n;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        ((g._domRect = g.getBoundingClientRect()),
          (g._centerX = g._domRect.left + g._domRect.width * 0.5),
          (u -= g._domRect.width));
      }
      let f = 0;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        ((g._offsetX = -g._domRect.left + a + f),
          (f += g._domRect.width + u / (c.length - 1)));
      }
    }
    this.totalLineHeight =
      this.domLines[this.domLines.length - 1].getBoundingClientRect().bottom -
      this.domLines[0].getBoundingClientRect().top;
  }
  _resetWords() {
    this.domContainer.style.transform = "translateZ(0)";
    for (let e = 0; e < this.domLineWords.length; e++) {
      let t = this.domLineWords[e];
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        n.style.transform = "translateZ(0)";
      }
    }
  }
  update(e) {
    let t = homeGoalSectionRanges.getRange("blackTitle"),
      r = math.fit(t.ratio, this.RATIO_FROM, this.RATIO_TO, 0, 1);
    if (
      ((e = e && r % 1 > 0),
      (this.domContainer.style.visibility = e ? "visible" : "hidden"),
      e)
    ) {
      let n = math.fit(r, 0.5, 1, 1, 12, ease.cubicIn),
        a = math.fit(r, 0.9, 1, 1, 0),
        l = math.fit(r, 0.4, 0.6, 0, 1, ease.cubicInOut);
      ((n *= math.fit(r, 0, 0.15, 0.85, 1, ease.cubicOut)),
        (a *= math.fit(r, 0, 0.05, 0, 1)));
      let c = homeGoalSectionRanges.offsetY - properties.viewportHeight * 0.5;
      ((this.domContainer.style.transform =
        "translate3d(0," +
        c +
        "px,0) scale(" +
        n +
        ")  translateY(" +
        -this.totalLineHeight * 0.5 +
        "px) translateY(0.25em)"),
        (this.domContainer.style.opacity = a));
      for (let u = 0; u < this.domLineWords.length; u++) {
        let f = this.domLineWords[u];
        for (let p = 0; p < f.length; p++) {
          let g = f[p];
          g.style.transform = "translateX(" + l * g._offsetX + "px)";
        }
      }
    }
  }
}
const homeGoalSectionTunnelTitle = new HomeGoalSectionTunnelTitle(),
  TITLE_STAGGER$1 = 40,
  TITLE_DELAY = 0.4;
let _m$1 = new Matrix4(),
  _q = new Quaternion(),
  _e = new Euler(),
  _c0 = new Color();
class GoalSection {
  domContainer;
  domContext;
  domContextInner;
  domImgIn;
  domImgInInner;
  domImgOut;
  domImgOutInner;
  frameBgMesh;
  _placeholderTexture1;
  _placeholderTexture2;
  offsetY = 0;
  radiusRatio = 0;
  uiBgColorNeedsOverride = !1;
  isUIBgBlack = !1;
  _needsReset = !0;
  sectionPaddingTop = 0;
  line = null;
  hostPage = null;
  preInit(e, hostPage) {
    this.hostPage = hostPage || window.pagesManager?.currRoute?.target || window.homePage;
    let container = e || document;
    (homeGoalSectionRanges.init(e),
      (this.domContainer = container.querySelector ? (container.querySelector("#home-goal") || document.getElementById("home-goal")) : document.getElementById("home-goal")),
      (this.domContext = (container.querySelector && container.querySelector("#home-goal-context")) || document.getElementById("home-goal-context")),
      (this.domContextInner = (container.querySelector && container.querySelector("#home-goal-context-inner")) || document.getElementById("home-goal-context-inner")),
      (this.domTitle = (container.querySelector && container.querySelector("#home-goal-title")) || document.getElementById("home-goal-title")),
      this.domTitle && ((this.domTitle._time = 0), (this.domTitle._animating = !1)),
      (this.domDescs = (container.querySelector && container.querySelector("#home-goal-texts")) || document.getElementById("home-goal-texts")),
      (this.domImgIn = (container.querySelector && container.querySelector("#home-goal-image-in")) || document.getElementById("home-goal-image-in")),
      (this.domImgInInner = (container.querySelector && container.querySelector("#home-goal-image-in-inner")) || document.getElementById("home-goal-image-in-inner")),
      (this.domImgOut = (container.querySelector && container.querySelector("#home-goal-image-out")) || document.getElementById("home-goal-image-out")),
      (this.domImgOutInner = (container.querySelector && container.querySelector("#home-goal-image-out-inner")) || document.getElementById("home-goal-image-out-inner")));
    if (!this.frameBgMesh) {
      this.frameBgMesh = new UfxMesh({
        geometry: fboHelper.triGeom,
        material: fboHelper.createRawShaderMaterial({
          uniforms: {
            u_bgColor: { value: new Color() },
            u_frameOffset: { value: new Vector2() },
            u_frameScale: { value: 1 },
            u_frameRotate: { value: 0 },
            u_radiusScale: { value: 0 },
            u_glowColor: { value: new Color(0, 0, 0) },
            u_glowRadius: { value: 0.11 },
            u_glowUpperBound: { value: 0.5 },
            u_glowPow: { value: 0.1 },
            u_glowTint: { value: 0 },
            u_dom2Offset: { value: new Vector2() },
            u_dom2WH: { value: new Vector2() },
            u_dom2Texture: { value: null },
            u_viewportResolution:
              properties.sharedUniforms.u_viewportResolution,
            u_time: properties.sharedUniforms.u_time,
            u_globalRadius: properties.sharedUniforms.u_globalRadius,
          },
          vertexShader: frameBgVert,
          fragmentShader: frameBgFrag,
          depthTest: !1,
          depthWrite: !1,
          derivatives: !0,
          transparent: !0,
          blending: NormalBlending,
        }),
      });
      this.frameBgMesh.renderOrder = -1;
      this.frameBgMesh.visible = !1;
    }
    const targetPreUfx = (this.hostPage && this.hostPage.preUfxContainer) || (window.homePage && window.homePage.preUfxContainer);
    if (targetPreUfx && this.frameBgMesh) {
      targetPreUfx.add(this.frameBgMesh);
    }
    homeGoalSectionTunnelTitle.init(e);
    if (!visuals.stage3DList.includes(goalTunnels)) {
      visuals.stage3DList.push(goalTunnels);
    }
    goalTunnels.preInit();
    if (!this.lineVisual) {
      this.lineVisual = new Line(1);
      this.lineVisual.preInit();
    }
  }
  init() {
    ((this._placeholderTexture1 = properties.loader.load(
      settings.TEXTURE_PATH + "/tunnels/tablet.png",
      { type: "texture", flipY: !1, minFilter: LinearFilter },
    ).content),
      (this._placeholderTexture2 = properties.loader.load(
        settings.TEXTURE_PATH + "/tunnels/desktop.png",
        { type: "texture", flipY: !1, minFilter: LinearFilter },
      ).content),
      goalTunnels.init(),
      this.lineVisual && this.lineVisual.init(),
      this.lineVisual && ((this.hostPage && this.hostPage.postUfxContainer) || (window.homePage && window.homePage.postUfxContainer))?.add(this.lineVisual.container));
  }
  show() {}
  hide() {}
  resize(e, t) {
    (this._splitText(),
      scrollManager.resize(e, t),
      homeGoalSectionRanges.resize(e, t),
      goalTunnelGlass.resize(e, t),
      homeGoalSectionTunnelTitle.resize(e, t),
      goalTunnels.resize(properties.width, properties.height),
      this.lineVisual && this.lineVisual.resize(e, t),
      (this.sectionPaddingTop = this.domContainer ? parseFloat(
        getComputedStyle(this.domContainer).getPropertyValue("padding-top"),
      ) || 0 : 0));
  }
  update(e) {
    homeGoalSectionRanges.update(e);
    let t = scrollManager.getDomRange(this.domContainer),
      r = t.isActive,
      n = scrollManager.getDomRange(this.domImgIn),
      a = scrollManager.getDomRange(this.domImgInInner),
      l = scrollManager.getDomRange(this.domImgOut),
      c = scrollManager.getDomRange(this.domImgOutInner),
      u = 0;
    ((goalTunnels.isActive =
      homeGoalSectionRanges.isActive && properties.hasInitialized),
      goalTunnels.resetAstronautLayer(),
      goalTunnelGlass.container && (goalTunnelGlass.container.visible = !1),
      (this.uiBgColorNeedsOverride = goalTunnels.isActive),
      this.uiBgColorNeedsOverride &&
        (this.isUIBgBlack =
          homeGoalSectionRanges.getRange("blackTitle", "blackTunnel")
            .isActive ||
          homeGoalSectionRanges.getRange("whiteFrameOut", "astronautWait")
            .isActive));
    let f = 0,
      p = 1,
      g,
      v,
      _ = homeGoalSectionRanges.getRange("blackFrameIn");
    if (
      (properties.useMobileLayout
        ? (this.domDescs.style.transform = "translateZ(0)")
        : (this.domDescs.style.transform =
            "translate3d(0," +
            (n._top - this.sectionPaddingTop - t._top + n.height * 0.5) +
            "px,0) translateY(-50%)"),
      goalTunnels.isActive)
    ) {
      let b = this.frameBgMesh.material.uniforms,
        C = math.saturate(homeGoalSectionRanges.ratio),
        w,
        R,
        E = 0,
        I = 1,
        F = 0,
        k = 0,
        L = 0,
        D = 0,
        ne = b.u_glowColor.value;
      goalTunnels.ratio = C;
      let re = textureHelper.blackTexture,
        ce = 0,
        z = homeGoalSectionRanges.getRange("blackTunnel"),
        j = homeGoalSectionRanges.getRange("blackFrameShow"),
        X = homeGoalSectionRanges.getRange("whiteFrameOut"),
        Z = homeGoalSectionRanges.getRange("whiteFrameBreak"),
        q = homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop"),
        ue = homeGoalSectionRanges.getRange("astronautDrop");
      homeGoalSectionTunnelTitle.update(!0);
      let oe = q.ratio,
        te = ue.ratio,
        le = 0;
      E = math.saturate(_.ratio);
      let Te = 0;
      if (z.ratio < 1)
        ((w = n),
          (R = a),
          (u = Math.max(0, homeGoalSectionRanges.offsetY - _.pixelFrom)),
          (le = u),
          (f = E * 0.4),
          (Te = 0),
          (F = math.fit(E, 0, 1, 0.11, -0.5)),
          (k = math.fit(E, 0, 1, 0.25, 2)),
          (L = math.fit(E, 0, 1, 0.06, 0.3)),
          ne
            .setStyle(properties.blackColorHex)
            .lerp(_c0.setStyle(properties.offWhiteColorHex), E),
          this._placeholderTexture1 &&
            this._placeholderTexture1.image.width &&
            (re = this._placeholderTexture1));
      else {
        ((w = l), (R = c));
        let xe =
          -properties.viewportHeight * 0.5 - l.top + n.top - l.height * 0.5;
        if (
          ((u = homeGoalSectionRanges.offsetY + xe),
          te < 1 && (u = math.clamp(u, 0, Z.pixelTo + xe)),
          (Te = 0),
          (E = math.fit(
            homeGoalSectionRanges.offsetY,
            X.pixelFrom,
            X.pixelTo,
            1,
            0,
          )),
          (ce = Math.max(0, homeGoalSectionRanges.offsetY - ue.pixelFrom)),
          (f = E * -0.3),
          oe < 0)
        )
          ((D = 0.8), ne.setStyle(properties.blackColorHex));
        else {
          ((F = -0.5),
            (k = math.fit(oe, 0, 0.15, 0, 0.8)),
            (k = math.fit(oe, 0.15, 0.3, k, 2)),
            (L = math.fit(oe, 0, 0.1, 0.3, 1)),
            (L = math.fit(oe, 0.1, 1, L, 0.2)),
            (D = 0.5));
          let ee = math.fit(oe, 0, 0.1, 1, 0);
          ((ee = math.fit(oe, 0.1, 0.8, ee, 0.85)),
            ne
              .setStyle(properties.blueColorHex)
              .lerp(_c0.setStyle(properties.blackColorHex), ee));
        }
        (this._placeholderTexture2 &&
          this._placeholderTexture2.image.width &&
          (re = this._placeholderTexture2),
          (goalTunnelGlass.domFrameHeight = l.height),
          (goalTunnelGlass.domFrameRotation = f),
          goalTunnelGlass.container && (goalTunnelGlass.container.visible = !0),
          (I = 0));
      }
      let K = properties.viewportHeight * 0.2 * (1 - math.saturate(j.ratio)),
        G = Math.sqrt(
          properties.viewportWidth * properties.viewportWidth +
            properties.viewportHeight * properties.viewportHeight,
        );
      ((p = math.mix(1, G / Math.min(w.width, w.height), E)),
        (goalTunnelGlass.domFrameScale = p),
        te < 1
          ? (g = properties.viewportWidth * 0.5 - w.left - w.width * 0.5)
          : (g = 0),
        (v = -(
          w.top +
          K -
          scrollManager.scrollPixel +
          w.height * 0.5 -
          properties.viewportHeight * 0.5 +
          u
        )),
        (goalTunnels.frameHeight = w.height),
        (goalTunnelAstronauts.extraCameraViewportOffsetX = -math.fit(
          q.ratio,
          0,
          1,
          0,
          -w.left - w.width * 0.5 + properties.viewportWidth * 0.5,
          ease.cubicInOut,
        )),
        (goalTunnelAstronauts.extraCameraViewportOffsetY = -ce),
        (properties.cameraViewportOffsetX = g * (1 - E)),
        (properties.cameraViewportOffsetY = v * (1 - E)),
        (b.u_dom2Texture.value = re),
        b.u_frameOffset.value.set(g * E, v * E),
        (b.u_frameScale.value = p),
        (b.u_frameRotate.value = f),
        (b.u_radiusScale.value = I),
        b.u_bgColor.value.setStyle(
          C < 0.5 ? properties.offWhiteColorHex : properties.blackColorHex,
        ),
        (b.u_glowRadius.value = F),
        (b.u_glowUpperBound.value = k),
        (b.u_glowPow.value = L),
        (b.u_glowTint.value = D),
        (properties.screenPaintOffsetRatio = 1 - E),
        this.frameBgMesh.syncRect(w.left, w.top + K, w.width, w.height),
        this.frameBgMesh.update(-scrollManager.scrollPixel + u),
        (this.frameBgMesh.visible = E < 1),
        (this.frameBgMesh.visible = E < 1 && te < 1),
        (goalTunnelGlass.ratio = math.fit(q.ratio, 0, 1, 0, 1, ease.sineOut)),
        goalTunnelGlass.container &&
          (goalTunnelGlass.container.visible =
            goalTunnelGlass.container.visible && goalTunnelGlass.ratio > 0),
        b.u_dom2Offset.value.set(
          R.left + R.width * 0.5 - w.left - w.width * 0.5,
          R.top + R.height * 0.5 - w.top - w.height * 0.5 + Te,
        ),
        b.u_dom2WH.value.set(R.width, R.height),
        (this.domContextInner.style.transform = `translate3d(0, ${le}px, 0)`),
        (this.domContextInner.style.visibility = this.frameBgMesh.visible
          ? "visible"
          : "hidden"));
      let U = scrollManager.getDomRange(this.domContext),
        N =
          properties.viewportWidth * 0.5 -
          U.screenX -
          properties.cameraViewportOffsetX,
        he =
          properties.viewportHeight * 0.5 -
          U.screenY -
          properties.cameraViewportOffsetY -
          le;
      ((this.domContextInner.style.transformOrigin = "0 0"),
        (this.domContextInner.style.transform = `translate3d(${N}px, ${he + le}px, 0) scale(${p}) rotate(${f}rad) translate3d(${-N + g * E}px, ${-he + v * E}px, 0) `));
      let ve =
          properties.viewportWidth * 0.5 - properties.cameraViewportOffsetX,
        de =
          -properties.viewportHeight * 0.5 + properties.cameraViewportOffsetY;
      if (((ve *= -1), (de *= -1), z.ratio < 1)) {
        let xe = this.lineVisual.container.matrix;
        (xe.makeTranslation(ve, de, 0),
          _e.set(0, 0, -f),
          _q.setFromEuler(_e),
          _m$1.makeRotationFromQuaternion(_q),
          xe.premultiply(_m$1),
          _m$1.makeScale(p, p, p),
          xe.premultiply(_m$1),
          _m$1.makeTranslation(-ve, -de, 0),
          xe.premultiply(_m$1),
          xe.decompose(
            this.lineVisual.container.position,
            this.lineVisual.container.quaternion,
            this.lineVisual.container.scale,
          ),
          this.lineVisual.update(e, t, u));
      }
    } else
      (this.lineVisual.update(e, t),
        (this.frameBgMesh.visible = !1),
        (this.domContextInner.style.visibility = r ? "visible" : "hidden"),
        (this.domContextInner.style.transform = "translateZ(0)"),
        this.lineVisual.container.position.set(0, 0, 0),
        this.lineVisual.container.quaternion.set(0, 0, 0, 1),
        this.lineVisual.container.scale.set(1, 1, 1),
        homeGoalSectionTunnelTitle.update(!1));
    (_.ratio >= 1 && (this.lineVisual.container.visible = !1),
      goalTunnels.updateRatios());
    let T = scrollManager.getDomRange(this.domContext, -u),
      M = T,
      S = properties.useMobileLayout ? 0 : 800;
    if (t.screenRatio < -0.8 && t.screenRatio !== -1) {
      if (
        ((this.domTitle._time = math.clamp(
          this.domTitle._time + (this.domTitle._animating ? e : -e),
          0,
          2,
        )),
        T.screenRatio > -1)
      ) {
        this.domTitle._animating = !0;
        let b = math.fit(t.showScreenOffset, 0, 1.5, S * -0.2, 0);
        ((this.domTitle.style.transform = `translate3d(0, ${b}px, 0)`),
          properties.useMobileLayout ||
            this.domTitle._splitted.words.forEach((C, w) => {
              let R = math.fit(
                  this.domTitle._time - TITLE_DELAY - w / TITLE_STAGGER$1,
                  0,
                  1,
                  200,
                  0,
                  ease.lusion,
                ),
                E = math.fit(
                  this.domTitle._time - w / TITLE_STAGGER$1,
                  0,
                  1,
                  100,
                  0,
                  ease.lusion,
                );
              C.style.transform = `translate3d(${R}px, ${E}%, 0)`;
            }));
      }
      (M.screenRatio > -1, this._needsReset && this._reset());
    } else this._needsReset = !0;
  }
  _splitText() {
    if (!this.domTitle) this.domTitle = document.getElementById("home-goal-title");
    this.domTitle?._splitted?.revert?.();
    if (!properties.useMobileLayout && typeof SplitType !== "undefined" && this.domTitle) {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, lines",
        charClass: "goal-title-char",
      });
      this.domTitle._splitted?.lines?.forEach((e) => {
        const t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.classList.add("goal-title-line-wrapper");
        t.append(e);
        this.domTitle.append(t);
      });
    }
  }
  _reset() {
    this.domTitle?._splitted &&
      ((this._needsReset = !1),
      (this.domTitle._time = 0),
      (this.domTitle._animating = !1),
      properties.viewportWidth > settings.MOBILE_WIDTH &&
        this.domTitle._splitted.words?.forEach((e) => {
          e.style.transform = "translate3d(100%, 100%, 0)";
        }));
  }
}
const homeGoalSection = new GoalSection(),
  vertexShader = `#define GLSLIFY 1
attribute float branchRatio;attribute vec3 branchSplinePos;attribute vec3 leafAxis;attribute float leafRatio;attribute float meshId;uniform float u_time;uniform float u_delay;uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform float u_angleForce;varying vec3 v_position;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 toQuaternion(float angle,vec3 axis){float half_angle=angle/2.0;vec4 q;q.x=axis.x*sin(half_angle);q.y=axis.y*sin(half_angle);q.z=axis.z*sin(half_angle);q.w=cos(half_angle);return q;}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=position;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;float time=u_delay+0.2*u_time;float branchNoiseStrength=0.001;vec3 branchOffset=branchNoiseStrength*branchRatio*branchRatio*simplexNoiseDerivatives(vec4(pos,time)).xyz;branchOffset+=vec3(-1.0,0.0,0.0)*u_angleForce*branchRatio*branchRatio*0.1;if(meshId>0.0){vec3 toBranchSpline=pos-branchSplinePos;float angle=0.005*simplexNoiseDerivatives(vec4(branchRatio*0.5,u_time,meshId,1.0)).x;angle-=0.5*sign(leafAxis.z)*leafRatio*leafRatio*u_angleForce;vec4 q=toQuaternion(angle,leafAxis);toBranchSpline=qrotate(q,toBranchSpline);pos=branchSplinePos+branchOffset+toBranchSpline;}else{pos+=branchOffset;}vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_position=pos;}`,
  fragmentShader$3 = `#define GLSLIFY 1
uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform vec3 u_mask;varying vec3 v_position;void main(){gl_FragColor.rgb=u_mask*vec3((v_position.x-u_bbMin.x)/(u_bbMax.x-u_bbMin.x));gl_FragColor.a=1.0;}`,
  vert$b = `#define GLSLIFY 1
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


globalThis.cameraControls = cameraControls;
globalThis.goalTunnelEfx = goalTunnelEfx;
globalThis.goalBlackTunnel = goalBlackTunnel;
globalThis.goalWhiteTunnel = goalWhiteTunnel;
globalThis.goalTunnelAstronauts = goalTunnelAstronauts;
globalThis.goalTunnelGlass = goalTunnelGlass;
globalThis.goalTunnelsBackground = goalTunnelsBackground;
globalThis.goalWhiteTunnelParticles = goalWhiteTunnelParticles;
globalThis.goalWhiteTunnelStickers = goalWhiteTunnelStickers;
globalThis.goalTunnels = goalTunnels;
globalThis.homeGoalSection = homeGoalSection;
globalThis.homeGoalSectionRanges = homeGoalSectionRanges;
globalThis.homeGoalSectionTunnelTitle = homeGoalSectionTunnelTitle;

export {
  GoalTunnelEfx,
  GoalBlackTunnel,
  OrbitControls,
  DeviceOrientationControls,
  CameraControls,
  GoalTunnelAstronauts,
  GoalWhiteTunnel,
  GoalTunnelGlass,
  GoalSectionRanges,
  GoalTunnelsBackground,
  GoalWhiteTunnelParticles,
  GoalWhiteTunnelStickers,
  GoalTunnels,
  GoalSection,
  goalTunnels
};
export default goalTunnels;
