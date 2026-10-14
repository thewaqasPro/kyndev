/**
 * Physics Dynamics, Spring Solvers & Noise Generators
 */
class SecondOrderDynamics {
  target0 = null;
  target = null;
  prevTarget = null;
  value = null;
  valueVel = null;
  k1;
  k2;
  k3;
  _f;
  _z;
  _r;
  _w;
  _z;
  _d;
  _targetVelCache;
  _cache1;
  _cache2;
  _k1Stable;
  _k2Stable;
  isVector = null;
  isRobust = null;
  constructor(e, t = 1.5, r = 0.8, n = 2, a = !0) {
    ((this.isRobust = a),
      (this.isVector = typeof e == "object"),
      this.setFZR(t, r, n),
      this.isVector
        ? ((this.target = e),
          (this.target0 = e.clone()),
          (this.prevTarget = e.clone()),
          (this.value = e.clone()),
          (this.valueVel = e.clone().setScalar(0)),
          (this._targetVelCache = this.valueVel.clone()),
          (this._cache1 = this.valueVel.clone()),
          (this._cache2 = this.valueVel.clone()),
          (this.update = this._updateVector),
          (this.reset = this._resetVector))
        : ((this.target0 = e),
          (this.prevTarget = e),
          (this.value = e),
          (this.valueVel = 0),
          (this.update = this._updateNumber),
          (this.reset = this._resetNumber)),
      (this.computeStableCoefficients = a
        ? this._computeRobustStableCoefficients
        : this._computeStableCoefficients));
  }
  update(e, t = 0) {}
  reset(e = null) {}
  _resetVector(e = this.target0) {
    (this.valueVel.setScalar(0),
      this.prevTarget.copy(e),
      this.target.copy(e),
      this.value.copy(e));
  }
  _resetNumber(e = this.target0) {
    ((this.valueVel = 0),
      (this.prevTarget = e),
      (this.target = e),
      (this.value = e));
  }
  setFZR(e = this._f, t = this._z, r = this._r) {
    let n = Math.PI * 2 * e;
    (this.isRobust &&
      ((this._w = n),
      (this._z = t),
      (this._d = this._w * Math.sqrt(Math.abs(this._z * this._z - 1)))),
      (this.k1 = t / (Math.PI * e)),
      (this.k2 = 1 / (n * n)),
      (this.k3 = (r * t) / n));
  }
  _computeStableCoefficients(e) {
    ((this._k1Stable = this.k1),
      (this._k2Stable = Math.max(
        this.k2,
        (1.1 * e * e) / 4 + (e * this.k1) / 2,
      )));
  }
  _computeRobustStableCoefficients(e) {
    if (this._w * e < this._z)
      ((this._k1Stable = this.k1),
        (this._k2Stable = Math.max(
          this.k2,
          (e * e) / 2 + (e * this.k1) / 2,
          e * this.k1,
        )));
    else {
      let t = Math.exp(-this._z * this._w * e),
        r =
          2 *
          t *
          (this._z <= 1 ? Math.cos(e * this._d) : Math.cosh(e * this._d)),
        n = t * t,
        a = e / (1 + n - r);
      ((this._k1Stable = (1 - n) * a), (this._k2Stable = e * a));
    }
  }
  _updateVector(e, t = this.target) {
    e > 0 &&
      (this._targetVelCache.copy(t).sub(this.prevTarget).divideScalar(e),
      this.prevTarget.copy(t),
      this.computeStableCoefficients(e),
      this.value.add(this._cache1.copy(this.valueVel).multiplyScalar(e)),
      this._cache1
        .copy(t)
        .add(this._targetVelCache.multiplyScalar(this.k3))
        .sub(this.value)
        .sub(this._cache2.copy(this.valueVel).multiplyScalar(this._k1Stable))
        .multiplyScalar(e / this._k2Stable),
      this.valueVel.add(this._cache1));
  }
  _updateNumber(e, t = this.target) {
    if (e > 0) {
      let r = (t - this.prevTarget) / e;
      ((this.prevTarget = t),
        this.computeStableCoefficients(e),
        (this.valueVel +=
          (t + this.k3 * r - this.value - this._k1Stable * this.valueVel) *
          (e / this._k2Stable)),
        (this.value += this.valueVel * e));
    }
  }
}

class Simple1DNoise {
  static MAX_VERTICES = 512;
  static MAX_VERTICES_MASK = Simple1DNoise.MAX_VERTICES - 1;
  _scale = 1;
  _amplitude = 1;
  _r = [];
  constructor(e) {
    let t = e ? math.getSeedRandomFn(e) : Math.random;
    for (let r = 0; r < Simple1DNoise.MAX_VERTICES; ++r)
      this._r.push(t() - 0.5);
  }
  getVal(e) {
    const t = e * this._scale,
      r = Math.floor(t),
      n = t - r,
      a = n * n * (3 - 2 * n),
      l = r & Simple1DNoise.MAX_VERTICES_MASK,
      c = (l + 1) & Simple1DNoise.MAX_VERTICES_MASK;
    return math.mix(this._r[l], this._r[c], a) * this._amplitude;
  }
  getFbm(e, t) {
    let r = 0,
      n = 0.5;
    for (let a = 0; a < t; a++)
      ((r += n * this.getVal(e)), (e *= 2), (n *= 0.5));
    return r;
  }
  get amplitude() {
    return this._amplitude;
  }
  set amplitude(e) {
    this._amplitude = e;
  }
  get scale() {
    return this._scale;
  }
  set scale(e) {
    this._scale = e;
  }
}
const _v$2 = new Vector3();
class BrownianMotion {
  _position = new Vector3();
  _rotation = new Quaternion();
  _euler = new Euler();
  _scale = new Vector3(1, 1, 1);
  _matrix = new Matrix4();
  _enablePositionNoise = !0;
  _enableRotationNoise = !0;
  _positionFrequency = 0.25;
  _rotationFrequency = 0.25;
  _positionAmplitude = 0.3;
  _rotationAmplitude = 0.003;
  _positionScale = new Vector3(1, 1, 1);
  _rotationScale = new Vector3(1, 1, 0);
  _positionFractalLevel = 3;
  _rotationFractalLevel = 3;
  _times = new Float32Array(6);
  _noise = new Simple1DNoise();
  static FBM_NORM = 1 / 0.75;
  constructor() {
    this.rehash();
  }
  rehash() {
    for (let e = 0; e < 6; e++) this._times[e] = Math.random() * -1e4;
  }
  update(e) {
    const t = e === void 0 ? 16.666666666666668 : e;
    if (this._enablePositionNoise) {
      for (let r = 0; r < 3; r++) this._times[r] += this._positionFrequency * t;
      (_v$2.set(
        this._noise.getFbm(this._times[0], this._positionFractalLevel),
        this._noise.getFbm(this._times[1], this._positionFractalLevel),
        this._noise.getFbm(this._times[2], this._positionFractalLevel),
      ),
        _v$2.multiply(this._positionScale),
        _v$2.multiplyScalar(this._positionAmplitude * BrownianMotion.FBM_NORM),
        this._position.copy(_v$2));
    }
    if (this._enableRotationNoise) {
      for (let r = 0; r < 3; r++)
        this._times[r + 3] += this._rotationFrequency * t;
      (_v$2.set(
        this._noise.getFbm(this._times[3], this._rotationFractalLevel),
        this._noise.getFbm(this._times[4], this._rotationFractalLevel),
        this._noise.getFbm(this._times[5], this._rotationFractalLevel),
      ),
        _v$2.multiply(this._rotationScale),
        _v$2.multiplyScalar(this._rotationAmplitude * BrownianMotion.FBM_NORM),
        this._euler.set(_v$2.x, _v$2.y, _v$2.z),
        this._rotation.setFromEuler(this._euler));
    }
    this._matrix.compose(this._position, this._rotation, this._scale);
  }
  get positionAmplitude() {
    return this._positionAmplitude;
  }
  set positionAmplitude(e) {
    this._positionAmplitude = e;
  }
  get positionFrequency() {
    return this._positionFrequency;
  }
  set positionFrequency(e) {
    this._positionFrequency = e;
  }
  get rotationAmplitude() {
    return this._rotationAmplitude;
  }
  set rotationAmplitude(e) {
    this._rotationAmplitude = e;
  }
  get rotationFrequency() {
    return this._rotationFrequency;
  }
  set rotationFrequency(e) {
    this._rotationFrequency = e;
  }
  get matrix() {
    return this._matrix;
  }
  set matrix(e) {
    this._matrix = e;
  }
}
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
vec3 color1=u_color1;vec3 color2=u_color2;vec3 baseColor=0.5+mix(color1,color2,v_rands.x)*1.2;vec3 emissiveColor=mix(color1,color2,v_rands.y)*3.5;diffuse*=(0.5+texture2D(u_feedbackTexture,screenUv+worldNormal.xy*0.02).r*feedbackMultiplier);gl_FragColor.rgb=baseColor*vec3(ao*0.75*diffuse)+emissiveColor*v_emission;gl_FragColor.rgb*=v_opacity;float endBloomStrength=linearStep(u_outBloomFromToStrength.x,u_outBloomFromToStrength.y,v_depth)*u_outBloomFromToStrength.z;float bloomScale=linearStep(5.0,20.0,v_depth)*(1.0-linearStep(15.0,25.0,length(v_worldPosition.xy)));gl_FragColor.a=bloomScale*max(0.,dot(gl_FragColor.rgb,vec3(.299,.587,.114))*2.5-1.)+endBloomStrength*0.75;gl_FragColor.rgb+=endBloomStrength*(0.35+gl_FragColor.rgb*0.65);}`,
  goalBlackTunnelTransformShader = `#define GLSLIFY 1
uniform float u_blackTunnelTransformRatio;vec3 goalBlackTunnelTransform(vec3 pos){float t=u_blackTunnelTransformRatio*6.2831853;float zWeight=pos.z*0.025;float angle=t*zWeight*zWeight*sign(zWeight);float sa=sin(angle);float ca=cos(angle);mat2 m2=mat2(ca,-sa,sa,ca);pos.xy=m2*pos.xy;pos.z+=t*1.;pos=pos.xzy;float rad=20.;pos/=rad;vec3 a=pos;vec2 pq=vec2(-1.,.5)*t;float ada=dot(a,a);vec4 b=vec4(2.*a,ada-1.)/(1.+ada);vec4 pq_cs=vec4(cos(pq),sin(pq)).xzyw;vec2 np1=vec2(-1.,1.);vec4 c=(b.xxyy*np1.yxyy*pq_cs+b.zzww*np1.yyxy*pq_cs.yxwz).xzyw;pos=c.xyz/(1.-c.w);pos=pos.xzy;return pos*rad;}`;

globalThis.SecondOrderDynamics = SecondOrderDynamics;
globalThis.BrownianMotion = BrownianMotion;
globalThis.Simple1DNoise = Simple1DNoise;

export { SecondOrderDynamics, Simple1DNoise, BrownianMotion };