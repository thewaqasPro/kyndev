const ufxVert = globalThis.ufxVert;
const getLightUvShader = `#define GLSLIFY 1
uniform vec2 u_lightShadowTextureTexelSize;vec2 getLightUv(vec3 lightToWorld){float flatYScale=1.5;vec2 flatUv=normalize(lightToWorld*vec3(1.,flatYScale,1.)).xz;vec2 dir=abs(normalize(flatUv));flatUv=(flatUv*(dir.y>dir.x ? 1./dir.y : 1./dir.x)*0.5+0.5)*vec2(1.,0.5);float isTop=lightToWorld.y>0.0 ? 1.0 : 0.0;float halfTexelY=u_lightShadowTextureTexelSize.y*0.5;flatUv.y=clamp(0.+isTop*halfTexelY,0.5-(1.-isTop)*halfTexelY,flatUv.y);return flatUv+vec2(0.,isTop*.5);}`;
globalThis.getLightUvShader = getLightUvShader;

/**
 * 3D Lunar Scene: Moon Terrain Displacement, Floating Rocks, GPGPU Dust & Astronaut
 */
import * as THREE from "../../three.js";
class AboutHeroLight {
  shadowMapSize = 1024;
  position = new Vector3(0, 8, 0);
  shadowRenderTarget = null;
  sharedUniforms = {
    u_lightPosition: { value: this.position },
    u_lightColor: { value: new Color("#000") },
    u_lightShadowMaxDistance: { value: 12 },
    u_lightShadowTexture: { value: null },
    u_lightShadowTextureTexelSize: {
      value: new Vector2(1 / this.shadowMapSize, 1 / (this.shadowMapSize * 2)),
    },
  };
  preInit() {}
  init() {
    (shaderHelper.addChunk("getLightUv", getLightUvShader),
      (this.shadowRenderTarget = fboHelper.createRenderTarget(
        this.shadowMapSize,
        this.shadowMapSize * 2,
        !0,
        HalfFloatType,
      )));
    let e = (this.sharedUniforms.u_lightShadowTexture.value =
      this.shadowRenderTarget.texture);
    ((this.shadowRenderTarget.depthBuffer = !0),
      settings.USE_WEBGL2 && (e.format = RedFormat));
  }
  update(e) {
    let t = properties.renderer,
      r = fboHelper.getColorState(),
      n = t.getRenderTarget();
    (t.setRenderTarget(this.shadowRenderTarget),
      t.setClearColor(16777215, 1),
      t.clear(),
      t.setRenderTarget(n),
      fboHelper.setColorState(r));
  }
  renderMesh(e) {
    let t = properties.renderer,
      r = fboHelper.getColorState(),
      n = t.getRenderTarget();
    ((t.autoClearColor = !1),
      fboHelper.renderMesh(e, this.shadowRenderTarget),
      t.setRenderTarget(n),
      fboHelper.setColorState(r));
  }
  postUpdate(e) {
    let t = properties.renderer,
      r = fboHelper.getColorState(),
      n = t.getRenderTarget();
    (properties.gl,
      (t.autoClear = !1),
      t.setRenderTarget(n),
      fboHelper.setColorState(r));
  }
}
const light = new AboutHeroLight(),
  sliceShader = `#define GLSLIFY 1
uniform vec2 u_lightFieldSlicedTextureSize;uniform vec2 u_lightFieldSliceColRowCount;uniform vec3 u_lightFieldGridCount;uniform vec3 u_lightFieldVolumeOffset;uniform vec3 u_lightFieldVolumeSize;vec2 lightFieldGridToUv(vec3 grid){vec2 uv=grid.xy;vec2 colRow=floor(vec2(mod(grid.z,u_lightFieldSliceColRowCount.x),grid.z/u_lightFieldSliceColRowCount.x));uv+=colRow*u_lightFieldGridCount.xy+.5;return uv/u_lightFieldSlicedTextureSize;}vec3 lightFieldGridToUv3(vec3 grid){return grid/u_lightFieldGridCount;}vec3 clampLightFieldGrid(vec3 grid){return clamp(grid,vec3(.5),u_lightFieldGridCount-vec3(.5));}vec3 lightFieldPosToGrid(vec3 pos){return(pos-u_lightFieldVolumeOffset)/u_lightFieldVolumeSize*u_lightFieldGridCount;}vec3 clampedLightFieldPosToGrid(vec3 pos){return clampLightFieldGrid(lightFieldPosToGrid(pos));}vec4 sampleLightField(sampler2D tex,vec3 gridPos){gridPos.z-=.5;vec2 uv1=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,floor(gridPos.z)+.5)));vec2 uv2=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,ceil(gridPos.z)+.5)));return mix(texture2D(tex,uv1),texture2D(tex,uv2),fract(gridPos.z));}`,
  sliceBlendFrag = `#define GLSLIFY 1
uniform sampler2D u_prevSliceTexture;uniform sampler2D u_drawnSliceTexture;varying vec2 v_uv;
#include <lightFieldSlice>
vec4 sampleSlice4(vec3 gridPos){vec3 sliceOffset=vec3(-.5,.5,0.);return(texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xyz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yyz))))/4.;}void main(){vec3 gridPos=vec3(mod(gl_FragCoord.xy,u_lightFieldGridCount.xy),dot(floor(gl_FragCoord.xy/u_lightFieldGridCount.xy),vec2(1.,u_lightFieldSliceColRowCount.x))+.5);vec4 prev=texture2D(u_prevSliceTexture,v_uv);vec4 curr=(sampleSlice4(gridPos+vec3(0.,0.,-1.))+sampleSlice4(gridPos)*2.+sampleSlice4(gridPos+vec3(0.,0.,1.)))*.25;prev+=(curr-prev)*mix(0.15,0.08,clamp(prev.r,0.,1.));gl_FragColor=prev;}`;
class AboutHeroLightField {
  GRID_COUNT = new Vector3(64, 64, 64);
  VOLUME_SIZE = new Vector3(8, 0, 0);
  container = new Object3D();
  prevSliceRenderTarget = null;
  currSliceRenderTarget = null;
  drawnSliceRenderTarget = null;
  sliceTo3DMesh = null;
  sliceBlendMaterial;
  sliceColumnCount = 0;
  sliceRowCount = 0;
  gridSize = 0;
  SHOW_TEST_VOXELS = !1;
  sharedUniforms = {
    u_lightFieldTexture3D: { value: null },
    u_lightFieldMaxLod: { value: 0 },
    u_lightFieldSlicedTexture: { value: null },
    u_lightFieldSlicedTextureSize: { value: new Vector2() },
    u_lightFieldSliceColRowCount: { value: new Vector2() },
    u_lightFieldGridSize: { value: 0 },
    u_lightFieldGridCount: { value: this.GRID_COUNT },
    u_lightFieldVolumeOffset: { value: new Vector3() },
    u_lightFieldVolumeSize: { value: new Vector3() },
  };
  preInit() {}
  init() {
    (shaderHelper.addChunk("lightFieldSlice", sliceShader),
      (this.gridSize = this.VOLUME_SIZE.x / (this.GRID_COUNT.x - 1)),
      (this.sharedUniforms.u_lightFieldGridSize.value = this.gridSize),
      (this.VOLUME_SIZE.y = this.gridSize * (this.GRID_COUNT.y - 1)),
      (this.VOLUME_SIZE.z = this.gridSize * (this.GRID_COUNT.z - 1)),
      this.sharedUniforms.u_lightFieldVolumeSize.value
        .setScalar(this.gridSize)
        .add(this.VOLUME_SIZE),
      (this.sharedUniforms.u_lightFieldMaxLod.value = Math.log2(
        Math.min(this.GRID_COUNT.x, this.GRID_COUNT.y, this.GRID_COUNT.z),
      )));
    let e = this.GRID_COUNT.x * this.GRID_COUNT.y * this.GRID_COUNT.z,
      t = (this.sliceColumnCount = Math.ceil(Math.sqrt(e) / this.GRID_COUNT.x)),
      r = (this.sliceRowCount = Math.ceil(this.GRID_COUNT.z / t));
    this.sharedUniforms.u_lightFieldSliceColRowCount.value.set(t, r);
    let n = this.GRID_COUNT.x * t,
      a = this.GRID_COUNT.y * r;
    (this.sharedUniforms.u_lightFieldSlicedTextureSize.value.set(n, a),
      (this.currSliceRenderTarget = fboHelper.createRenderTarget(n, a)),
      (this.prevSliceRenderTarget = this.currSliceRenderTarget.clone()),
      (this.drawnSliceRenderTarget = this.currSliceRenderTarget.clone()),
      fboHelper.clearColor(0, 0, 0, 0, this.currSliceRenderTarget),
      (this.sliceBlendMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_lightFieldSlicedTextureSize:
            this.sharedUniforms.u_lightFieldSlicedTextureSize,
          u_lightFieldSliceColRowCount:
            this.sharedUniforms.u_lightFieldSliceColRowCount,
          u_lightFieldGridCount: this.sharedUniforms.u_lightFieldGridCount,
          u_lightFieldVolumeOffset:
            this.sharedUniforms.u_lightFieldVolumeOffset,
          u_lightFieldVolumeSize: this.sharedUniforms.u_lightFieldVolumeSize,
          u_prevSliceTexture: { value: null },
          u_drawnSliceTexture: { value: this.drawnSliceRenderTarget.texture },
        },
        fragmentShader: sliceBlendFrag,
      })));
  }
  update(e) {
    let t = this.VOLUME_SIZE.clone()
      .multiplyScalar(0.5)
      .sub(light.position)
      .multiplyScalar(-1);
    this.sharedUniforms.u_lightFieldVolumeOffset.value
      .setScalar(-this.gridSize / 2)
      .add(t);
    let r = properties.renderer,
      n = fboHelper.getColorState(),
      a = r.getRenderTarget();
    (r.setRenderTarget(this.drawnSliceRenderTarget),
      r.setClearColor(0, 0),
      r.clear(),
      r.setRenderTarget(a),
      fboHelper.setColorState(n));
  }
  renderMesh(e) {
    let t = properties.renderer,
      r = fboHelper.getColorState(),
      n = t.getRenderTarget();
    ((t.autoClearColor = !1),
      fboHelper.renderMesh(e, this.drawnSliceRenderTarget),
      t.setRenderTarget(n),
      fboHelper.setColorState(r));
  }
  postUpdate(e) {
    let t = properties.renderer,
      r = fboHelper.getColorState(),
      n = t.getRenderTarget();
    (properties.gl, (t.autoClear = !1));
    let a = this.prevSliceRenderTarget;
    ((this.prevSliceRenderTarget = this.currSliceRenderTarget),
      (this.currSliceRenderTarget = a),
      (this.sharedUniforms.u_lightFieldSlicedTexture.value =
        this.currSliceRenderTarget.texture),
      (this.sliceBlendMaterial.uniforms.u_prevSliceTexture.value =
        this.prevSliceRenderTarget.texture),
      fboHelper.render(this.sliceBlendMaterial, this.currSliceRenderTarget),
      t.setRenderTarget(n),
      fboHelper.setColorState(r));
  }
}
const lightField = new AboutHeroLightField(),
  fragSim = `#define GLSLIFY 1
uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simDefaultPosLifeTexture;uniform float u_introDeltaTime;uniform float u_noiseTime;uniform float u_noiseScale;uniform float u_noiseStableFactor;uniform vec3 u_lightPosition;varying vec2 v_uv;
#define PI2 6.283185307179586
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<2;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(xNoisePotentialDerivatives[3]-zNoisePotentialDerivatives[1],zNoisePotentialDerivatives[2]-yNoisePotentialDerivatives[3],yNoisePotentialDerivatives[1]-xNoisePotentialDerivatives[2]);}void main(){vec4 posLife=texture2D(u_simPrevPosLifeTexture,v_uv);vec3 posLifeOrigin=posLife.xyz-u_lightPosition;posLife.w-=(0.5+u_noiseStableFactor)*u_introDeltaTime;if(posLife.w<0.0){vec3 defPosOrigin=texture2D(u_simDefaultPosLifeTexture,v_uv).xyz;vec3 defPos=defPosOrigin*(1.25+sin(u_noiseTime*2.5+v_uv.x*21.)*0.25)+u_lightPosition;posLife.w+=1.;posLife.xyz=defPos;}vec3 toLight=posLife.xyz-u_lightPosition;vec3 axis=vec3(sin(u_noiseTime),cos(u_noiseTime*2.+v_uv.y*6.283185),0.0);vec3 spinDir=cross(axis,toLight);float dist=length(toLight);if(dist>0.01){float spinStrength=u_introDeltaTime*(0.1+smoothstep(0.5,2.0,dist-v_uv.x*0.5)*(v_uv.y<0.5 ? 1. :-1.)*mix(2.,4.,v_uv.x))*mix(0.75,1.5,u_noiseStableFactor);posLife.xyz+=spinDir*spinStrength;}posLife.xyz+=(1.25+0.5*u_noiseScale)*curl((posLife.xyz-u_lightPosition)*(0.4+0.3*u_noiseStableFactor),u_noiseTime,0.2)*u_introDeltaTime*mix(0.4,1.5,posLife.w*posLife.w)*mix(0.75,1.25,v_uv.x);gl_FragColor=posLife;}`;
new Vector3();
class AboutHeroParticlesSimulation {
  SIM_TEXTURE_WIDTH = 128;
  SIM_TEXTURE_HEIGHT = browser$1.isMobile ? 128 : 192;
  currPositionRenderTarget = null;
  prevPositionRenderTarget = null;
  ORIGIN = new Vector3(0, 8, 0);
  isPlaying = !0;
  isFirstSim = !0;
  noiseSpeed = 0.4;
  _noise = new Simple1DNoise();
  noiseScaleTime = Math.random();
  noiseStableFactorTime = Math.random();
  noiseStableFactor = Math.random();
  sharedUniforms = {
    u_simCurrPosLifeTexture: { value: null },
    u_simPrevPosLifeTexture: { value: null },
    u_simDefaultPosLifeTexture: { value: null },
    u_simTextureSize: {
      value: new Vector2(this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT),
    },
    u_noiseStableFactor: { value: 0 },
  };
  preInit() {
    ((this.currPositionRenderTarget = fboHelper.createRenderTarget(
      this.SIM_TEXTURE_WIDTH,
      this.SIM_TEXTURE_HEIGHT,
      !0,
      FloatType,
    )),
      (this.prevPositionRenderTarget = this.currPositionRenderTarget.clone()),
      (this.positionMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_lightPosition: light.sharedUniforms.u_lightPosition,
          u_simPrevPosLifeTexture: this.sharedUniforms.u_simPrevPosLifeTexture,
          u_simDefaultPosLifeTexture:
            this.sharedUniforms.u_simDefaultPosLifeTexture,
          u_introDeltaTime: aboutHero.sharedUniforms.u_introDeltaTime,
          u_noiseTime: { value: 0 },
          u_noiseScale: { value: 0 },
          u_noiseStableFactor: this.sharedUniforms.u_noiseStableFactor,
        },
        fragmentShader: fragSim,
      })));
    let e = this.SIM_TEXTURE_WIDTH * this.SIM_TEXTURE_HEIGHT,
      t = new Float32Array(e * 4);
    for (let n = 0, a = 0; n < e; n++, a += 4) {
      let l = Math.random(),
        c = Math.random(),
        u = l * 2 * Math.PI,
        f = Math.acos(2 * c - 1),
        p = 0.25 + Math.cbrt(Math.random()) * 0.5,
        g = Math.sin(u),
        v = Math.cos(u),
        _ = Math.sin(f),
        T = Math.cos(f);
      ((t[a + 0] = p * _ * v),
        (t[a + 1] = p * _ * g),
        (t[a + 2] = p * T),
        (t[a + 3] = n / e - 1));
    }
    let r = (this.sharedUniforms.u_simDefaultPosLifeTexture.value =
      fboHelper.createDataTexture(
        t,
        this.SIM_TEXTURE_WIDTH,
        this.SIM_TEXTURE_HEIGHT,
        !0,
        !0,
      ));
    fboHelper.copy(r, this.currPositionRenderTarget);
  }
  init() {}
  update(e) {
    if (this.isPlaying) {
      let t = this.currPositionRenderTarget;
      ((this.currPositionRenderTarget = this.prevPositionRenderTarget),
        (this.prevPositionRenderTarget = t),
        (this.sharedUniforms.u_simCurrPosLifeTexture.value =
          this.currPositionRenderTarget.texture),
        (this.sharedUniforms.u_simPrevPosLifeTexture.value =
          this.prevPositionRenderTarget.texture),
        (this.positionMaterial.uniforms.u_noiseTime.value +=
          e * this.noiseSpeed),
        (this.noiseScaleTime += e));
      const r = this._noise.getFbm(this.noiseScaleTime, 3);
      ((this.positionMaterial.uniforms.u_noiseScale.value = 10 * Math.abs(r)),
        (this.noiseStableFactorTime += 0.5 * e),
        (this.noiseStableFactor +=
          0.05 * Math.abs(this._noise.getFbm(this.noiseStableFactorTime, 3))),
        (this.sharedUniforms.u_noiseStableFactor.value =
          math.fit(aboutHero.introRatio, 0, 0.4, 0, 1) *
          math.smoothstep(
            0.9,
            0.95,
            0.5 + 0.5 * Math.sin(this.noiseStableFactor),
          )),
        fboHelper.render(this.positionMaterial, this.currPositionRenderTarget));
    }
  }
}
const sim = new AboutHeroParticlesSimulation(),
  vert$9 = `#define GLSLIFY 1
attribute vec3 simUv;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_sceneHideRatio;uniform float u_isEmissive;uniform float u_noiseStableFactor;uniform sampler2D u_lightFieldSlicedTexture;
#include <lightFieldSlice>
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying float v_depth;varying float v_diff;varying float v_ao;varying float v_emission;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv.xy);vec4 rands=hash43(simUv);float particleSize=mix(0.06,0.175,u_isEmissive)*(0.5+rands.x*0.5);float particleSizeScale=linearStep(0.0,0.1,currPositionInfo.w)*linearStep(1.0,0.9,currPositionInfo.w);particleSize*=particleSizeScale*(1.0-u_sceneHideRatio);vec3 pos=position*particleSize+currPositionInfo.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*normal;v_worldNormal=normalize((vec4(v_viewNormal,0.)*viewMatrix).xyz);vec3 rayGridDir=v_worldNormal;vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec4 indirectDiffuse=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+rayGridDir);float lifeFalloff=mix(0.5,1.,particleSizeScale);v_emission=(indirectDiffuse.a*0.55*lifeFalloff+0.45)*u_isEmissive;v_diff=(1.-indirectDiffuse.a)*lifeFalloff;v_diff*=linearStep(5.,1.5,length(v_worldPosition-vec3(0.,8.,0.)));v_ao=1.0-indirectDiffuse.a;
#include <aboutHeroVisualFinal_vert>
}`,
  frag$d = `#define GLSLIFY 1
uniform sampler2D u_lightFieldSlicedTexture;uniform float u_noiseStableFactor;uniform float u_emissiveRatio;uniform float u_contrast;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewNormal;varying float v_depth;varying float v_diff;varying float v_emission;varying float v_ao;
#include <lightFieldSlice>
#include <getScatter>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=normalize(v_worldNormal);vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec3 rayGridDir=worldNormal;vec3 rayGridSpecDir=reflect(normalize(v_worldPosition-cameraPosition),worldNormal);vec4 indirectSpecular=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridSpecDir+(noise-.5)*0.25)*(1.+noise.z));float specular=indirectSpecular.r;vec3 rayGridRefractDir=refract(normalize(v_worldPosition-cameraPosition),worldNormal,1./1.4);vec4 refractionInfo=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridRefractDir+(noise-.5)*0.25)*(1.5+noise.z));float refraction=refractionInfo.r*(1.-refractionInfo.a*0.75);float shade=v_diff*0.45+specular+refraction;shade+=getScatter(cameraPosition,v_worldPosition)*1.35;float viewShade=linearStep(-1.,1.,dot(viewNormal,vec3(.5773)));shade=mix(shade,viewShade,v_emission*v_ao)*(.4+v_ao*.6);gl_FragColor=vec4(mix(shade,smoothstep(0.,1.,shade),0.5),v_depth,1.,mix(v_diff*v_diff+v_emission,1.,u_emissiveRatio));}`,
  lightFieldVert = `#define GLSLIFY 1
attribute vec3 position;uniform sampler2D u_simCurrPosLifeTexture;uniform float u_noiseStableFactor;
#include <lightFieldSlice>
varying vec4 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(position);vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,position.xy);float scale=linearStep(1.0,0.9,currPositionInfo.w);vec3 pos=currPositionInfo.xyz;vec3 lightFieldGrid=clampedLightFieldPosToGrid(pos);vec2 lightFieldUv=lightFieldGridToUv(lightFieldGrid);gl_Position=vec4(lightFieldUv*2.0-1.0,0.0,1.0);gl_PointSize=1.0;vec3 color=position.x<0.005 ? vec3(1.): vec3(0.1);v_color=vec4(color,1.)*scale;}`,
  lightFieldFrag = `#define GLSLIFY 1
varying vec4 v_color;void main(){gl_FragColor=v_color;}`,
  motionVert = `#define GLSLIFY 1
attribute vec2 simUv;uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_strength;uniform float u_aspect;varying vec2 v_delta;varying float v_headTail;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv);vec4 prevPositionInfo=texture2D(u_simPrevPosLifeTexture,simUv);vec4 rands=hash43(vec3(simUv.xy,0.));float particleSize=(simUv.x<0.005 ? 0.175 : 0.06)*(0.5+rands.x*0.5);mat4 mvp=projectionMatrix*modelViewMatrix;vec4 currScreenPos=mvp*vec4(currPositionInfo.xyz,1.0);vec4 prevScreenPos=mvp*vec4(prevPositionInfo.xyz,1.0);currScreenPos/=currScreenPos.w;prevScreenPos/=prevScreenPos.w;vec2 screenPosDelta=currScreenPos.xy-prevScreenPos.xy;float screenPosDist=length(screenPosDelta);float angle=screenPosDist>0.001 ? atan(screenPosDelta.y,screenPosDelta.x*u_aspect): 0.;vec4 screenPos=position.x>-0.0001 ? currScreenPos : prevScreenPos;vec4 offsetScreenPos=modelViewMatrix*vec4((position.x>0. ? currPositionInfo.xyz : prevPositionInfo.xyz),1.0);offsetScreenPos.xy+=particleSize;offsetScreenPos=projectionMatrix*offsetScreenPos;offsetScreenPos/=offsetScreenPos.w;offsetScreenPos=offsetScreenPos-screenPos;v_delta=screenPosDelta;v_headTail=position.x;vec4 pos=vec4(position,0.);pos.xy=rotate(pos.xy,angle)*length(offsetScreenPos.xy*vec2(u_aspect,1.));pos.xy*=vec2(1./u_aspect,1.);pos+=screenPos;pos.xy+=v_delta*.5;v_delta=v_delta*2.+.5;gl_Position=pos;if(currPositionInfo.w>prevPositionInfo.w){gl_Position=vec4(2.,0.,0.,1.);}}`,
  motionFrag = `#define GLSLIFY 1
varying vec2 v_delta;varying float v_headTail;void main(){float ratio=sqrt(abs(v_headTail)*2.);float strength=sign(v_headTail)*ratio*-.5;gl_FragColor=vec4(v_delta,strength+.5,v_headTail+0.5);}`,
  getScatter = `#define GLSLIFY 1
uniform vec2 u_lightScatterDivider;uniform float u_lightScatterPowInv;uniform vec3 u_lightScatterPos0;uniform vec3 u_lightScatterPos1;uniform float u_lightScatterRatio;float getScatterCoff(vec3 start,vec3 dir,vec3 lightPos,float d){vec3 q=start-lightPos;float b=dot(dir,q);float c=dot(q,q);float t=c-b*b;float s=1.0/(2.5+pow(0.001+t,0.8));return s*(atan((d+b)*s)-atan(b*s));}vec2 getScatterLine(vec3 start,vec3 dir,vec3 lightPos0,vec3 lightPos1,float d){vec3 segCenter=(lightPos0+lightPos1)*0.5;vec3 segDir=normalize(lightPos1-lightPos0);vec3 diff=start-segCenter;float segExtent=distance(lightPos0,lightPos1)*0.5;float a01=-dot(dir,segDir);float b0=dot(diff,dir);float b1=-dot(diff,segDir);float det=abs(1.0-a01*a01);float s=clamp((a01*b0-b1)/max(0.0001,det),-segExtent,segExtent);vec3 lightPos=segDir*s+segCenter;return vec2(getScatterCoff(start,dir,segExtent>0.0 ? lightPos : lightPos0,d),s/segExtent*0.5+0.5);}float getScatter(vec3 cameraPosition,vec3 worldPos,vec2 lightScatterDivider,float lightScatterPowInv){vec3 worldToCamera=worldPos-cameraPosition;float d=length(worldToCamera);vec3 dir=worldToCamera/d;vec2 val=getScatterLine(cameraPosition,dir,u_lightScatterPos0,u_lightScatterPos1,d);return pow(max(0.0,val.x/mix(lightScatterDivider.x,lightScatterDivider.y,val.y)),lightScatterPowInv)*u_lightScatterRatio;}float getScatter(vec3 cameraPosition,vec3 worldPos){return getScatter(cameraPosition,worldPos,u_lightScatterDivider,u_lightScatterPowInv);}`;
class AboutHeroScatter {
  sharedUniforms = {
    u_lightScatterDivider: { value: new Vector2(1.1, 5.5) },
    u_lightScatterPowInv: { value: 0 },
    u_lightScatterRatio: { value: 0 },
    u_lightScatterPos0: { value: new Vector3(0, 18, 0) },
    u_lightScatterPos1: { value: new Vector3(0, 0, 0) },
  };
  constructor() {
    ((this._brownianMotion0 = new BrownianMotion()),
      (this._brownianMotion1 = new BrownianMotion()));
  }
  init() {
    shaderHelper.addChunk("getScatter", getScatter);
  }
  update(e) {
    let t = math.fit(aboutHero.introRatio, 0, 0.2, 2, 0.7);
    ((t = math.fit(aboutHero.introRatio, 0.7, 0.85, t, 0.4)),
      (this.sharedUniforms.u_lightScatterPowInv.value = t),
      (this.sharedUniforms.u_lightScatterRatio.value = math.fit(
        aboutHero.introRatio,
        0.7,
        0.85,
        1,
        0,
        ease.cubicIn,
      )));
  }
}
const aboutHeroScatter = new AboutHeroScatter(),
  fragmentShader$2 = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;void main(){gl_FragColor=texture2D(u_texture,v_uv).rrra;}`,
  motionBlurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_motionTexture;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(41.,25.));vec4 motion=texture2D(u_motionTexture,v_uv);motion.xy-=0.5;motion.xy*=(motion.z-.5)/16.*u_blurRatio*0.25;vec4 c=vec4(0.);vec2 offset=motion.xy*noise.xy;for(int i=0;i<16;i++){offset+=motion.xy;c+=texture2D(u_texture,v_uv+offset);}c/=16.;gl_FragColor=vec4(c.rrr,c.a);vec4 color=texture2D(u_texture,v_uv).rrra;gl_FragColor=max(color,gl_FragColor);}`,
  blurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform float u_aspect;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec4 tex=texture2D(u_texture,v_uv);vec2 ra=vec2(0.);float fi=0.;float theta=noise.x*6.283185307179586;vec2 strength=vec2(1.,1.*u_aspect)*.006*tex.b*u_blurRatio;for(int i=0;i<8;i++){theta+=10.166407384630519;ra+=texture2D(u_texture,v_uv+vec2(cos(theta),sin(theta))*sqrt((fi+.5)/8.)*strength).ra;fi+=1.;}ra/=8.;gl_FragColor=ra.xxxy;}`;
class AboutPageHeroEfxPrepass extends PostEffect {
  isActive = !0;
  cacheRT = null;
  motionBlurRatio = 1;
  motionRT;
  motionTmpRT;
  useMotionBlur = !1;
  blurRatio = 0;
  scene = new Scene();
  needsRenderScene = !0;
  renderOrder = 5;
  init(e) {
    (Object.assign(this, e),
      super.init(),
      (this.cacheRT = fboHelper.createRenderTarget(1, 1)),
      (this.motionRT = fboHelper.createRenderTarget(1, 1)),
      (this.motionRT.depthBuffer = !0),
      (this.motionTmpRT = fboHelper.createRenderTarget(1, 1)),
      (this._material = fboHelper.createRawShaderMaterial({
        uniforms: Object.assign(
          {
            u_texture: { value: null },
            u_motionTexture: { value: this.motionRT.texture },
            u_aspect: { value: 1 },
            u_blurRatio: { value: 0 },
          },
          blueNoise.sharedUniforms,
        ),
        fragmentShader: fragmentShader$2,
      })),
      (this._motionBlurMaterial = fboHelper.createRawShaderMaterial({
        uniforms: this._material.uniforms,
        fragmentShader: motionBlurFragmentShader,
      })),
      (this._blurMaterial = fboHelper.createRawShaderMaterial({
        uniforms: this._material.uniforms,
        fragmentShader: blurFragmentShader,
      })));
  }
  needsRender() {
    return this.isActive;
  }
  setPostprocessing(e) {
    const t = e.width,
      r = e.height;
    (this.cacheRT.setSize(t, r),
      (this._material.uniforms.u_aspect.value = t / r));
  }
  renderMotion(e, t, r, n) {
    let a = properties.renderer,
      l = fboHelper.getColorState(),
      c = a.getRenderTarget();
    (this.motionRT.setSize(r, n),
      a.setRenderTarget(this.motionRT),
      a.setClearColor(8355711, 0),
      a.clear(),
      fboHelper.renderMesh(e, this.motionRT, t),
      blur.blur(2, 1, this.motionRT, this.motionTmpRT, this.motionRT),
      a.setRenderTarget(c),
      fboHelper.setColorState(l),
      (this.useMotionBlur = !0));
  }
  render(e, t = !1) {
    if (
      (fboHelper.copy(e.fromTexture, this.cacheRT),
      this.useMotionBlur
        ? ((this.useMotionBlur = !1),
          (this.material = this._motionBlurMaterial),
          (this.material.uniforms.u_blurRatio.value = this.motionBlurRatio))
        : ((this.material =
            this.blurRatio > 0 ? this._blurMaterial : this._material),
          (this.material.uniforms.u_blurRatio.value = this.blurRatio)),
      this.needsRenderScene)
    ) {
      ((this.material.uniforms.u_texture.value = e.fromTexture),
        fboHelper.render(this.material, e.toRenderTarget));
      let r = fboHelper.getColorState();
      ((fboHelper.renderer.autoClear = !1),
        fboHelper.renderer.setRenderTarget(e.toRenderTarget),
        fboHelper.renderer.render(this.scene, e.camera),
        fboHelper.setColorState(r),
        e.swap());
    } else super.render(e, t);
  }
}
const aboutPageHeroEfxPrepass = new AboutPageHeroEfxPrepass();
class AboutHeroParticles {
  container = new Object3D();
  emissiveMesh = null;
  nonEmissiveMesh = null;
  lightFieldMesh = null;
  lodIds = ["l", "m", "s", "xs"];
  lodRefGeometries = [];
  preInit() {
    for (let p = settings.IS_SMALL_SCREEN ? 1 : 0; p < 4; p++)
      properties.loader.add(
        settings.MODEL_PATH + "about/sphere_" + this.lodIds[p] + ".buf",
        { onLoad: this._onGeometryLoad.bind(this, p) },
      );
    let e = sim.SIM_TEXTURE_WIDTH * sim.SIM_TEXTURE_HEIGHT,
      t = new Float32Array(e * 3),
      r = new InstancedBufferGeometry(),
      n = new InstancedBufferGeometry(),
      a = new Float32Array(
        (sim.SIM_TEXTURE_WIDTH - 1) * sim.SIM_TEXTURE_HEIGHT * 2,
      ),
      l = new Float32Array(sim.SIM_TEXTURE_HEIGHT * 2);
    for (let p = 0, g = 0, v = 0, _ = 0; p < e; p++, g += 3) {
      let T = (t[g + 0] =
          ((p % sim.SIM_TEXTURE_WIDTH) + 0.5) / sim.SIM_TEXTURE_WIDTH),
        M = (t[g + 1] =
          (~~(p / sim.SIM_TEXTURE_WIDTH) + 0.5) / sim.SIM_TEXTURE_HEIGHT);
      p % sim.SIM_TEXTURE_WIDTH == 0
        ? ((l[v + 0] = T), (l[v + 1] = M), (v += 2))
        : ((a[_ + 0] = T), (a[_ + 1] = M), (_ += 2));
    }
    (r.setAttribute("simUv", new InstancedBufferAttribute(a, 2)),
      (this.nonEmissiveMesh = new Mesh(
        r,
        new ShaderMaterial({
          uniforms: Object.assign(
            {
              u_simCurrPosLifeTexture:
                sim.sharedUniforms.u_simCurrPosLifeTexture,
              u_simTextureSize: sim.sharedUniforms.u_simTextureSize,
              u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
              u_isEmissive: { value: 0 },
              u_emissiveRatio: { value: 0 },
            },
            lightField.sharedUniforms,
            aboutHeroScatter.sharedUniforms,
            aboutHero.sharedUniforms,
            blueNoise.sharedUniforms,
          ),
          vertexShader: vert$9,
          fragmentShader: frag$d,
        }),
      )),
      (this.nonEmissiveMesh.renderOrder = 5),
      (this.nonEmissiveMesh.frustumCulled = !1),
      this.container.add(this.nonEmissiveMesh),
      n.setAttribute("simUv", new InstancedBufferAttribute(l, 2)),
      (this.emissiveMesh = new Mesh(
        n,
        new ShaderMaterial({
          uniforms: Object.assign({}, this.nonEmissiveMesh.material.uniforms, {
            u_isEmissive: { value: 1 },
            u_emissiveRatio: { value: 0 },
          }),
          vertexShader: vert$9,
          fragmentShader: frag$d,
        }),
      )),
      (this.emissiveMesh.renderOrder = 5),
      (this.emissiveMesh.frustumCulled = !1),
      this.container.add(this.emissiveMesh));
    let c = new PlaneGeometry(1, 1),
      u = new InstancedBufferGeometry();
    for (let p in c.attributes) u.attributes[p] = c.attributes[p];
    (u.setIndex(c.getIndex()),
      u.setAttribute("simUv", new InstancedBufferAttribute(t, 3)),
      (this.motionMesh = new Mesh(
        u,
        new ShaderMaterial({
          uniforms: {
            u_simPrevPosLifeTexture: sim.sharedUniforms.u_simPrevPosLifeTexture,
            u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
            u_aspect: properties.sharedUniforms.u_aspect,
          },
          vertexShader: motionVert,
          fragmentShader: motionFrag,
        }),
      )),
      (this.motionMesh.frustumCulled = !1));
    let f = new BufferGeometry();
    ((f.name = "lightFieldGeometry"),
      f.setAttribute("position", new BufferAttribute(t, 3)),
      (this.lightFieldMesh = new Points(
        f,
        fboHelper.createRawShaderMaterial({
          uniforms: Object.assign(
            {
              u_simCurrPosLifeTexture:
                sim.sharedUniforms.u_simCurrPosLifeTexture,
              u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
            },
            lightField.sharedUniforms,
          ),
          vertexShader: lightFieldVert,
          fragmentShader: lightFieldFrag,
          blending: CustomBlending,
          blendEquation: MaxEquation,
          blendSrc: OneFactor,
          blendDst: OneFactor,
          blendEquationAlpha: MaxEquation,
          blendSrcAlpha: OneFactor,
          blendDstAlpha: OneFactor,
        }),
      )),
      (this.lightFieldMesh.frustumCulled = !1));
  }
  _onGeometryLoad(e, t) {
    this.lodRefGeometries[e] = t;
  }
  init() {}
  update(e) {
    ((this.nonEmissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(
      aboutHero.introRatio,
      0,
      0.2,
      0,
      0.75,
    )),
      (this.emissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(
        aboutHero.introRatio,
        0,
        0.2,
        0,
        0.75,
      )));
    let t,
      r = aboutHero.introRatio < 0.3,
      n = !r && aboutHero.introRatio < 0.7,
      a = 0,
      l = 0;
    (settings.IS_SMALL_SCREEN
      ? ((a = r ? 2 : 3), (l = r ? 1 : n ? 2 : 3))
      : ((a = r ? 1 : n ? 2 : 3), (l = r ? 0 : n ? 1 : 3)),
      (t = this.lodRefGeometries[a]));
    if (!t || typeof t.getIndex !== 'function') return;
    for (let u in t.attributes)
      this.nonEmissiveMesh.geometry.attributes[u] = t.attributes[u];
    (this.nonEmissiveMesh.geometry.setIndex(t.getIndex()),
      (t = this.lodRefGeometries[l]));
    if (!t || typeof t.getIndex !== 'function') return;
    for (let u in t.attributes)
      this.emissiveMesh.geometry.attributes[u] = t.attributes[u];
    (this.emissiveMesh.geometry.setIndex(t.getIndex()),
      lightField.renderMesh(this.lightFieldMesh));
    let c = math.fit(aboutHero.introRatio, 0, 0.1, 1, 1.5);
    ((c = math.fit(aboutHero.introRatio, 0.1, 0.15, c, 0)),
      (aboutPageHeroEfxPrepass.motionBlurRatio = c),
      aboutPageHeroEfxPrepass.motionBlurRatio > 0 &&
        aboutPageHeroEfxPrepass.renderMotion(
          this.motionMesh,
          properties.camera,
          properties.width >> 2,
          properties.height >> 2,
        ));
  }
}
const aboutHeroParticles = new AboutHeroParticles(),
  vert$8 = `#define GLSLIFY 1
attribute float piece;attribute float instanceId;attribute vec4 instanceRands;uniform sampler2D u_posRandTexture;uniform sampler2D u_orientTexture;uniform vec2 u_animationTextureSize;uniform float u_time;uniform float u_globalTime;uniform float u_scale;uniform float u_noiseStableFactor;uniform float u_hudRatio;
#ifdef IS_SHADOW
uniform vec3 u_lightPosition;uniform float u_lightShadowMaxDistance;varying float v_distToLight;
#include <getLightUv>
#else
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){float duration=0.25+2.+4.;float time=duration*instanceRands.x+u_time;float cycle=floor(time/duration);time=time-duration*cycle;vec4 cycleRands=hash42(vec2(cycle,instanceId));float flyUpRatio=pow(linearStep(2.25,6.25,time),1.5);float appearRatio=linearStep(0.,0.25,time-instanceRands.y)*(1.0-u_hudRatio);vec4 selfSpin=quaternion(normalize(instanceRands.xyz-0.5),flyUpRatio*mix(5.0,30.,cycleRands.z));float pieceScale=appearRatio;vec3 origin=vec3(0.0,1.9+instanceRands.w*0.4,0.0);float angle=cycleRands.x*6.2832;float radius=4.+cycleRands.w*4.;float rollRatio=1.0-linearStep(0.,3.25,time+instanceRands.x);radius-=(rollRatio*rollRatio)*5.;vec2 dir=vec2(cos(angle),sin(angle));vec3 instanceOffset=vec3(dir.x*radius,flyUpRatio*mix(30.0,40.,cycleRands.z)+u_noiseStableFactor*(0.5+0.5*sin(u_globalTime+instanceId*0.1))*0.1,dir.y*radius);instanceOffset.xz=rotate(instanceOffset.xz,flyUpRatio*flyUpRatio*mix(-1.,1.,instanceRands.z))*smoothstep(1.5,0.35,flyUpRatio);float frame=linearStep(0.25,2.25,time)*119.;float frameFloor=floor(frame);float frameCeil=min(frameFloor+1.,119.);float frameFract=frame-frameFloor;vec4 simUvs=(vec3(piece,frameFloor,frameCeil).xyxz+.5)/u_animationTextureSize.xyxy;vec4 posRand1=texture2D(u_posRandTexture,simUvs.xy);vec4 orient1=texture2D(u_orientTexture,simUvs.xy);vec4 posRand2=texture2D(u_posRandTexture,simUvs.zw);vec4 orient2=texture2D(u_orientTexture,simUvs.zw);
#ifdef IS_SHADOW
pieceScale*=1.5;
#endif
vec3 pos1=qrotate(orient1,position)*pieceScale+posRand1.xyz;vec3 pos2=qrotate(orient2,position)*pieceScale+posRand2.xyz;vec3 pos=u_scale*0.75*mix(0.5,1.5,instanceRands.z*instanceRands.z)*linearStep(1.,0.9,flyUpRatio)*(qrotate(selfSpin,mix(pos1,pos2,frameFract)-origin)+origin)*mix(0.3,0.7,cycleRands.w)+instanceOffset;
#ifdef IS_SHADOW
pos=(modelMatrix*vec4(pos,1.0)).xyz;vec3 center=instanceOffset+origin-u_lightPosition;pos-=u_lightPosition;v_distToLight=length(pos)/u_lightShadowMaxDistance;if(center.y>0.0){pos.y=max(0.001,pos.y);}else{pos.y=min(-0.001,pos.y);}gl_Position=vec4(getLightUv(pos)*2.0-1.0,1.-v_distToLight,1.0);
#else
vec3 nor1=qrotate(selfSpin,qrotate(orient1,normal));vec3 nor2=qrotate(selfSpin,qrotate(orient2,normal));vec3 nor=normalize(mix(nor1,nor2,frameFract));gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*nor;v_uv=uv;vec4 viewPosition=modelViewMatrix*vec4(pos,1.0);
#include <aboutHeroVisualFinal_vert>
#endif
}`,
  frag$c = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_textureChannelMixer;uniform vec3 u_lightColor;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){float pattern=dot(u_textureChannelMixer,texture2D(u_texture,v_uv));vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);float attenutation=1.0/(0.05+(0.02-0.005*u_noiseStableFactor)*worldToLightDist*worldToLightDist);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);float diff=0.25+0.75*dot(worldNormal,worldToLight);float spec=0.8*dot(reflect(cameraToWorld,worldNormal),worldToLight);vec3 color=vec3(pattern);color*=attenutation*(0.05+diff+spec*diff);gl_FragColor=vec4(color*0.85+0.15,spec*(0.3+u_noiseStableFactor));gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
}`,
  lightShadowMapFrag = `#define GLSLIFY 1
varying float v_distToLight;void main(){gl_FragColor=vec4(v_distToLight);}`;
class AboutHeroRocks {
  ROCK_PIECE_COUNT = 16;
  FRAME_COUNT = 120;
  FPS = 60;
  COUNT = browser$1.isMobile ? 48 : 64;
  container = new Object3D();
  meshList = [];
  shadowMeshList = [];
  meshAnimationUniformList = [];
  meshInstanceUniformsList = [];
  meshInstanceAttributesList = [];
  time = 0;
  sharedUniforms = {
    u_texture: { value: null },
    u_animationTextureSize: {
      value: new Vector2(this.ROCK_PIECE_COUNT, this.FRAME_COUNT),
    },
    u_time: { value: 0 },
    u_globalTime: { value: 0 },
    u_scale: { value: 0 },
    u_lightPosition: light.sharedUniforms.u_lightPosition,
    u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
  };
  preInit() {
    properties.loader.add(settings.TEXTURE_PATH + "about/rocks.webp", {
      type: "texture",
      onLoad: (e) => {
        let t = fboHelper.createRawShaderMaterial({
            uniforms: Object.assign(
              { u_texture: { value: e } },
              aboutHeroScatter.sharedUniforms,
            ),
            fragmentShader: `
						uniform sampler2D u_texture;
						varying vec2 v_uv;
						void main () {
							vec2 uv = v_uv * 0.5;
							gl_FragColor = vec4(
								texture2D(u_texture, uv).g,
								texture2D(u_texture, uv + vec2(.5, 0.)).g,
								texture2D(u_texture, uv + vec2(0., .5)).g,
								texture2D(u_texture, uv + vec2(.5, .5)).g
							);
						}`,
          }),
          r = fboHelper.createRenderTarget(512, 512);
        ((r.texture.minFitler = LinearMipmapLinearFilter),
          (r.texture.generateMipmaps = !0),
          fboHelper.render(t, r),
          (this.sharedUniforms.u_texture.value = r.texture),
          t.dispose(),
          e.dispose());
      },
    }).content;
    for (let e = 0; e < 4; e++) {
      ((this.meshAnimationUniformList[e] = {
        u_posRandTexture: { value: null },
        u_orientTexture: { value: null },
      }),
        (this.meshInstanceUniformsList[e] = Object.assign(
          {
            u_textureChannelMixer: {
              value: new Vector4(+(e == 0), +(e == 1), +(e == 2), +(e == 3)),
            },
          },
          this.meshAnimationUniformList[e],
          this.sharedUniforms,
          aboutHero.sharedUniforms,
          light.sharedUniforms,
          aboutHeroScatter.sharedUniforms,
        )));
      let t = new Float32Array(this.COUNT),
        r = new Float32Array(this.COUNT * 4);
      for (let n = 0; n < this.COUNT; n++)
        ((t[n] = e + n * 4),
          (r[n * 4 + 0] = Math.random()),
          (r[n * 4 + 1] = Math.random()),
          (r[n * 4 + 2] = Math.random()),
          (r[n * 4 + 3] = Math.random()));
      ((this.meshInstanceAttributesList[e] = {
        instanceId: new InstancedBufferAttribute(t, 1),
        instanceRands: new InstancedBufferAttribute(r, 4),
      }),
        properties.loader.add(
          settings.MODEL_PATH + "about/rock_" + e + ".buf",
          { onLoad: this._onRockLoad.bind(this, e, !1) },
        ),
        properties.loader.add(
          settings.MODEL_PATH + "about/rock_" + e + "_low.buf",
          { onLoad: this._onRockLoad.bind(this, e, !0) },
        ),
        properties.loader.add(
          settings.MODEL_PATH + "about/rock_animation_" + e + ".buf",
          { onLoad: this._onRockAnimationLoad.bind(this, e) },
        ));
    }
  }
  loadRock(e) {}
  _onRockLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let c in r.attributes) n.setAttribute(c, r.attributes[c]);
    n.index = r.index;
    let a = this.meshInstanceAttributesList[e];
    (n.setAttribute("instanceId", a.instanceId),
      n.setAttribute("instanceRands", a.instanceRands));
    let l = new Mesh(
      n,
      new ShaderMaterial({
        uniforms: this.meshInstanceUniformsList[e],
        vertexShader: vert$8,
        fragmentShader: frag$c,
      }),
    );
    ((l.frustumCulled = !1),
      t
        ? ((this.shadowMeshList[e] = l),
          (l.material.defines.IS_SHADOW = !0),
          (l.material.fragmentShader = lightShadowMapFrag),
          (l.material.side = DoubleSide))
        : (this.meshList[e] = l));
  }
  _onRockAnimationLoad(e, t) {
    if (!t || !t.attributes || !t.attributes.position || !t.attributes.orient) return;
    let r = t.attributes.position.array,
      n = t.attributes.orient.array,
      a = new Float32Array((r.length / 3) * 4),
      l = [];
    for (let c = 0, u = 0, f = 0; u < r.length; c++, u += 3, f += 4)
      ((a[f] = r[u]),
        (a[f + 1] = r[u + 1]),
        (a[f + 2] = r[u + 2]),
        c < this.ROCK_PIECE_COUNT && (l[c] = Math.random()),
        (a[f + 3] = l[c % this.ROCK_PIECE_COUNT]));
    ((this.meshAnimationUniformList[e].u_posRandTexture.value =
      fboHelper.createDataTexture(
        a,
        this.ROCK_PIECE_COUNT,
        this.FRAME_COUNT,
        !0,
        !0,
      )),
      (this.meshAnimationUniformList[e].u_orientTexture.value =
        fboHelper.createDataTexture(
          n,
          this.ROCK_PIECE_COUNT,
          this.FRAME_COUNT,
          !0,
          !0,
        )));
  }
  init() {
    for (let e = 0; e < 4; e++) this.container.add(this.meshList[e]);
  }
  update(e) {
    if (properties.hasInitialized) {
      (sim.sharedUniforms.u_noiseStableFactor.value,
        (this.time += e),
        (this.sharedUniforms.u_time.value = this.time),
        (this.sharedUniforms.u_globalTime.value = properties.time),
        (this.sharedUniforms.u_scale.value = math.fit(
          aboutHero.introRatio,
          0,
          0.2,
          0,
          1,
        )));
      for (let t = 0; t < 4; t++) light.renderMesh(this.shadowMeshList[t]);
    }
  }
}
const aboutHeroRocks = new AboutHeroRocks(),
  frag$b = `#define GLSLIFY 1
uniform sampler2D u_prevTexture;uniform sampler2D u_lightShadowTexture;uniform vec3 u_lightPosition;uniform vec2 u_blueNoiseOffset;uniform float u_lightShadowMaxDistance;uniform float u_radius;uniform float u_texelSize;varying vec2 v_uv;
#include <getLightUv>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+u_blueNoiseOffset);vec2 uvDir=normalize(v_uv-0.5);vec2 uv=v_uv-uvDir*u_texelSize;vec3 worldPosition=vec3(uv*2.0-1.0,0.0).xzy*u_radius;worldPosition.z*=-1.0;vec3 lightToWorld=worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float expandRatio=linearStep(u_lightPosition.y,14.,distToLight);vec3 lightSampleStep=((vec3(lightToWorld.x,0.0,lightToWorld.z)*(1.0-expandRatio*0.75)+(blueNoise-0.5)*expandRatio*4.)*25.0*expandRatio*expandRatio)/float(LIGHT_SHADOW_SAMPLE_COUNT)*-mix(0.06,0.1,expandRatio);vec3 lightToWorldPos=lightToWorld+lightSampleStep*blueNoise.y;float accum=0.0;for(int i=0;i<LIGHT_SHADOW_SAMPLE_COUNT;i++){float selfDist=min(1.0,length(lightToWorldPos)/u_lightShadowMaxDistance);vec2 lightShadowUv=getLightUv(lightToWorldPos);float dist=texture2D(u_lightShadowTexture,lightShadowUv).r;float delta=selfDist-dist;accum+=delta>0. ? min(delta*delta*20.,1.): 1.0;lightToWorldPos+=lightSampleStep;}float shadowMask=accum/float(LIGHT_SHADOW_SAMPLE_COUNT);shadowMask=mix(shadowMask,1.0,expandRatio);shadowMask=pow(shadowMask,6.);float prevShadowMask=texture2D(u_prevTexture,v_uv).r;gl_FragColor=vec4(mix(prevShadowMask,shadowMask,shadowMask>prevShadowMask ? 0.5 : 0.2));}`,
  groundVert = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(position,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;
#include <aboutHeroVisualFinal_vert>
}`,
  groundFrag = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform sampler2D u_texture;uniform sampler2D u_groundShadowTexture;uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform float u_fogA;uniform float u_fogB;uniform float u_sceneRatio;uniform float u_hudRatio;uniform float u_noiseStableFactor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 applyFog(in vec3 rgb,in float distance,in vec3 rayOri,in vec3 rayDir){float a=u_fogA;float b=u_fogB;float fogAmount=(a/b)*exp(-rayOri.y*b)*(1.0-exp(-distance*rayDir.y*b))/rayDir.y;return mix(rgb,u_bgColor,fogAmount);}vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(v_uv);vec2 dSTdy=dFdy(v_uv);float scale=0.1;float Hll=scale*texture2D(u_texture,v_uv).b;float dBx=scale*texture2D(u_texture,v_uv+dSTdx).b-Hll;float dBy=scale*texture2D(u_texture,v_uv+dSTdy).b-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+vec2(48.,31.));vec3 mixedTexture=texture2D(u_texture,v_uv).rgb;float shadow=mixedTexture.r;float light=clamp(mixedTexture.g,0.1,1.0);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 normal=normalize(v_viewNormal)*faceDirection;normal=perturbNormalArb(-v_viewPosition,normal,dHdxy_fwd(),faceDirection);vec3 N=inverseTransformDirection(normal,viewMatrix);vec3 L=normalize(u_lightPosition-v_worldPosition);vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdL=clamp(dot(N,L),0.001,1.0);float NdV=clamp(abs(dot(N,V)),0.001,1.0);vec3 lightToWorld=v_worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float attenutation=1.0/(0.05+(0.025-0.005*u_noiseStableFactor)*distToLight*distToLight);float dist=1.0-pow(2.0*length(v_uv-0.5),2.0);float rockShadows=texture2D(u_groundShadowTexture,(vec2(v_localPosition.x,-v_localPosition.z)+(blueNoise.xy-.5)*0.1)*0.0425+0.5).r;float spec=dot(reflect(V,N),L)*linearStep(0.9,0.0,N.y)*4.;gl_FragColor.rgb=vec3(light+attenutation*spec);gl_FragColor.rgb*=shadow*(0.5+rockShadows*0.5)*(1.+spec);gl_FragColor.rgb=applyFog(gl_FragColor.rgb,length(cameraPosition-v_worldPosition),cameraPosition,-V);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r=mix(gl_FragColor.r,shadow*(1.-abs(N.y)),u_hudRatio);gl_FragColor.r*=u_sceneRatio;gl_FragColor.g-=blueNoise.z*0.004;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=spec*shadow;}`;
class AboutHeroGround {
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  RADIUS = 12;
  SIZE = 768;
  sharedUniforms = { u_groundShadowTexture: { value: null } };
  prevRenderTarget = null;
  currRenderTarget = null;
  blurCacheRenderTarget = null;
  preInit() {
    (properties.loader.add(settings.MODEL_PATH + "about/terrain.buf", {
      onLoad: (e) => (this.geometry = e),
    }),
      (this.texture = properties.loader.load(
        settings.TEXTURE_PATH + "about/terrain_shadow_light_height.webp",
        { type: "texture", flipY: !0, minFilter: LinearFilter },
      ).content));
  }
  init() {
    ((this.prevRenderTarget = fboHelper.createRenderTarget(
      this.SIZE,
      this.SIZE,
    )),
      (this.currRenderTarget = this.prevRenderTarget.clone()),
      (this.blurCacheRenderTarget = this.prevRenderTarget.clone()),
      (this.mesh = new Mesh(
        new CircleGeometry(1.1, 128),
        fboHelper.createRawShaderMaterial({
          uniforms: Object.assign(
            {
              u_prevTexture: { value: null },
              u_radius: { value: this.RADIUS },
              u_texelSize: { value: 1 / this.SIZE },
              u_blueNoiseOffset: { value: new Vector2() },
            },
            light.sharedUniforms,
            blueNoise.sharedUniforms,
          ),
          fragmentShader: frag$b,
        }),
      )),
      (this.mesh.material.defines.LIGHT_SHADOW_SAMPLE_COUNT = 8),
      (this.groundMesh = new Mesh(
        this.geometry,
        new ShaderMaterial({
          uniforms: Object.assign(
            {
              u_texture: { value: this.texture },
              u_groundShadowTexture: { value: this.currRenderTarget.texture },
              u_color: { value: new Color() },
              u_bgColor: { value: new Color() },
              u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
              u_fogA: { value: 0.03 },
              u_fogB: { value: 0.285 },
            },
            light.sharedUniforms,
            aboutHeroScatter.sharedUniforms,
            blueNoise.sharedUniforms,
            aboutHero.sharedUniforms,
          ),
          vertexShader: groundVert,
          fragmentShader: groundFrag,
        }),
      )),
      (this.groundMesh.material.extensions.derivatives = !0),
      this.container.add(this.groundMesh),
      fboHelper.clearColor(1, 1, 1, 1, this.currRenderTarget));
  }
  update(e) {
    let t = this.prevRenderTarget;
    ((this.prevRenderTarget = this.currRenderTarget),
      (this.currRenderTarget = t));
    let r = properties.renderer,
      n = fboHelper.getColorState(),
      a = r.getRenderTarget();
    (r.setRenderTarget(this.currRenderTarget),
      r.setClearColor(16777215, 1),
      this.mesh.material.uniforms.u_blueNoiseOffset.value.set(
        ~~(Math.random() * 128),
        ~~(Math.random() * 128),
      ),
      (this.mesh.material.uniforms.u_prevTexture.value =
        this.prevRenderTarget.texture),
      fboHelper.renderMesh(this.mesh, this.currRenderTarget),
      r.setRenderTarget(a),
      fboHelper.setColorState(n),
      sim.sharedUniforms.u_noiseStableFactor.value,
      (this.groundMesh.material.uniforms.u_groundShadowTexture.value =
        this.currRenderTarget.texture),
      this.groundMesh.material.uniforms.u_bgColor.value.copy(
        properties.bgColor,
      ),
      this.groundMesh.material.uniforms.u_color.value.set("#fff"));
  }
}
const aboutHeroGround = new AboutHeroGround(),
  vert$7 = `#define GLSLIFY 1
attribute float t;attribute float totalLength;attribute float lineId;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){v_t=t;v_totalLength=totalLength;float yIndex=floor(position.y+.5);v_thicknessRatio=step(mod(yIndex,4.),0.5);vec3 pos=position+normal*mix(0.04,0.1,v_thicknessRatio);vec3 nor=normalize(normalMatrix*normal);v_viewNormal=nor;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);gl_Position.z-=0.1/gl_Position.w;}`,
  frag$a = `#define GLSLIFY 1
uniform float u_time;uniform float u_hudRatio;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float pnoise(vec2 P,vec2 rep){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,rep.xyxy);Pi=mod289(Pi);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float t=mod(v_t-u_time*2.,v_totalLength);float noiseScale=0.25;float n=pnoise(vec2(t*noiseScale,0.),vec2(v_totalLength*noiseScale,100.));float shade=mix(0.3+smoothstep(0.,0.-fwidth(n),n)*0.6,1.,v_thicknessRatio);shade*=linearStep(50.,-20.,v_worldPosition.z);gl_FragColor=vec4(shade,0.,0.,1.)*step(v_totalLength-v_t,v_totalLength*u_hudRatio);gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.r*=.85;}`;
let SEGMENT_COUNT = 3,
  THREHSOLDS = [
    60, 245, 806, 966, 991, 1026, 1191, 1853, 2061, 3111, 4279, 4309, 4338,
    5265, 5316, 5447, 5475, 6407, 6445, 7116, 7235, 7349, 7934, 8555, 8583,
    8614, 9154, 9640, 9688, 10163, 10420, 10645, 10895, 11074, 11286, 11453,
    11596, 11628, 11740, 11799, 11832,
  ],
  v0 = new Vector3();
new Vector3();
new Vector3();
class AboutHeroLines {
  container = new Object3D();
  time = 0;
  sharedUniforms = {};
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/terrain_lines.buf", {
      onLoad: this._onLineLoad.bind(this),
    });
  }
  _onLineLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) return;
    let t = e.attributes.position.array,
      r = THREHSOLDS.length,
      n = t.length / 3,
      a = new Float32Array(n * SEGMENT_COUNT * 3),
      l = new Float32Array(n * SEGMENT_COUNT * 3),
      c = new Float32Array(n * SEGMENT_COUNT),
      u = new Float32Array(n * SEGMENT_COUNT),
      f = new Uint8Array(n * SEGMENT_COUNT),
      p = new Uint16Array((n - r) * 6 * SEGMENT_COUNT),
      g = new Vector3(),
      v = new Vector3(),
      _ = new Vector3(),
      T = new Vector3(),
      M = new Vector3(),
      S = new Vector3(),
      b = new Quaternion(),
      C = new Vector3(),
      w = 0,
      R = 0,
      E = 0;
    for (let k = 0; k < THREHSOLDS.length; k++) {
      let L = k == 0 ? 0 : THREHSOLDS[k - 1],
        D = THREHSOLDS[k];
      (_.fromArray(t, L * 3), v.copy(_), M.set(0, 1, 0));
      let ne = 0;
      for (let z = L; z < D; z++) {
        let j = z * 3;
        (g.copy(v),
          v.copy(_),
          z < D - 1 && _.fromArray(t, j + 3),
          T.subVectors(_, g).normalize(),
          S.crossVectors(M, T).normalize(),
          b.setFromAxisAngle(T, (Math.PI * 2) / SEGMENT_COUNT),
          C.copy(M),
          (ne += v0.copy(v).sub(g).length()));
        for (let X = 0; X < SEGMENT_COUNT; X++) {
          if (
            (C.applyQuaternion(b),
            (a[R + 0] = v.x),
            (a[R + 1] = v.y),
            (a[R + 2] = v.z),
            (l[R + 0] = C.x),
            (l[R + 1] = C.y),
            (l[R + 2] = C.z),
            (c[w] = ne),
            (f[w] = k),
            z < D - 1)
          ) {
            let Z = X == SEGMENT_COUNT - 1 ? 1 - SEGMENT_COUNT : 1;
            ((p[E++] = w),
              (p[E++] = w + Z),
              (p[E++] = w + SEGMENT_COUNT),
              (p[E++] = w + Z),
              (p[E++] = w + SEGMENT_COUNT + Z),
              (p[E++] = w + SEGMENT_COUNT));
          }
          (w++, (R += 3));
        }
      }
      let re = SEGMENT_COUNT * (D - L);
      w -= re;
      let ce = w + re;
      for (; w < ce; w++) u[w] = ne;
    }
    let I = new BufferGeometry();
    (I.setAttribute("position", new BufferAttribute(a, 3)),
      I.setAttribute("normal", new BufferAttribute(l, 3)),
      I.setAttribute("t", new BufferAttribute(c, 1)),
      I.setAttribute("totalLength", new BufferAttribute(u, 1)),
      I.setAttribute("lineId", new BufferAttribute(f, 1)),
      I.setIndex(new BufferAttribute(p, 1)));
    let F = new ShaderMaterial({
      uniforms: Object.assign(
        { u_time: properties.sharedUniforms.u_time },
        aboutHero.sharedUniforms,
      ),
      vertexShader: vert$7,
      fragmentShader: frag$a,
      blending: CustomBlending,
      blendEquation: MaxEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor,
    });
    ((F.extensions.derivatives = !0),
      (this.mesh = new Mesh(I, F)),
      (this.mesh.renderOrder = 15),
      this.container.add(this.mesh));
  }
  init() {}
  update(e) {}
}
const aboutHeroLines = new AboutHeroLines(),
  vert$6 = `#define GLSLIFY 1
attribute vec2 boneIndices;attribute vec2 boneWeights;uniform vec3 u_bonePoses[BONE_COUNT];uniform vec4 u_boneOrients[BONE_COUNT];varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=vec3(0.0);vec3 nor=vec3(0.0);vec3 bonePos;vec4 boneOrient;bonePos=u_bonePoses[int(boneIndices.x)];boneOrient=u_boneOrients[int(boneIndices.x)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.x;nor+=qrotate(boneOrient,normal)*boneWeights.x;bonePos=u_bonePoses[int(boneIndices.y)];boneOrient=u_boneOrients[int(boneIndices.y)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.y;nor+=qrotate(boneOrient,normal)*boneWeights.y;vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_uv=uv;
#include <aboutHeroVisualFinal_vert>
}`,
  frag$9 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightPosition;uniform vec3 u_lightMixer;uniform float u_sceneRatio;uniform float u_hudRatio;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){vec3 worldNormal=normalize(v_worldNormal);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);vec4 map=texture2D(u_texture,v_uv);float light=dot(u_lightMixer,map.rgb);light=pow(light,1.25);float baseShade=map.a;vec3 color=vec3(baseShade*light);gl_FragColor=vec4(color,0.);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);}`,
  shadowVert = `#define GLSLIFY 1
varying vec2 v_uv;void main(){v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  shadowFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightMixer;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(3.,36.));vec3 map3=texture2D(u_texture,v_uv).xyz;float light1=dot(u_lightMixer,map3);float light2=dot(u_lightMixer.gbr,map3);float light=mix(light1,light2,blueNoises.x);light=light*light*.3+.7;gl_FragColor=vec4(light,1.,1.,0.);}`;
let _v1$2 = new Vector3(),
  _v2$1 = new Vector3(),
  _q1$1 = new Quaternion(),
  _q2 = new Quaternion();
class aboutHeroPerson {
  BONE_COUNT = 54;
  FPS = 60;
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  shadowMesh = null;
  shadowTexture = null;
  time = 0;
  frameCount = 0;
  bonePosAnimationData;
  boneOrientAnimationData;
  bonePoses = new Float32Array(this.BONE_COUNT * 3);
  boneOrients = new Float32Array(this.BONE_COUNT * 4);
  sharedUniforms = {
    u_texture: { value: null },
    u_lightMixer: { value: new Vector3(1, 0, 0) },
  };
  preInit() {
    (properties.loader.load(settings.TEXTURE_PATH + "about/person_light.webp", {
      type: "texture",
      onLoad: (e) => {
        ((this.lightTexture = e), this._onTextureLoad(e));
      },
    }).content,
      properties.loader.load(settings.TEXTURE_PATH + "about/person.webp", {
        type: "texture",
        onLoad: (e) => {
          ((this.texture = e), this._onTextureLoad(e));
        },
      }).content,
      (this.shadowTexture = properties.loader.load(
        settings.TEXTURE_PATH + "about/ground_person_shadow.webp",
        { type: "texture" },
      ).content),
      properties.loader.add(settings.MODEL_PATH + "about/person.buf", {
        onLoad: (e) => {
          this._onModelLoad(e);
        },
      }),
      properties.loader.add(settings.MODEL_PATH + "about/person_idle.buf", {
        onLoad: (e) => {
          this._onAnimationLoad(e);
        },
      }));
  }
  _onTextureLoad() {
    if (this.lightTexture && this.texture) {
      let e = fboHelper.createRenderTarget(
        this.lightTexture.image.width,
        this.lightTexture.image.height,
      );
      ((e.texture.minFilter = LinearMipMapNearestFilter),
        (e.texture.generateMipmaps = !1),
        (this.sharedUniforms.u_texture.value = e.texture),
        fboHelper.copy(textureHelper.transparentTexture, e),
        textureHelper.mixChannels(this.lightTexture, e, 0, 1, 2, -1),
        (e.texture.generateMipmaps = !0),
        textureHelper.mixChannels(this.texture, e, -1, -1, -1, 0),
        this.texture.dispose(),
        this.lightTexture.dispose(),
        (this.texture = null),
        (this.lightTexture = null));
    }
  }
  _onModelLoad(e) {
    ((this.mesh = new Mesh(
      e,
      new ShaderMaterial({
        uniforms: Object.assign(
          {
            u_texture: this.sharedUniforms.u_texture,
            u_lightMixer: this.sharedUniforms.u_lightMixer,
            u_bonePoses: { value: this.bonePoses },
            u_boneOrients: { value: this.boneOrients },
          },
          light.sharedUniforms,
          aboutHeroScatter.sharedUniforms,
          aboutHero.sharedUniforms,
        ),
        vertexShader: vert$6,
        fragmentShader: frag$9,
      }),
    )),
      (this.mesh.material.defines.BONE_COUNT = this.BONE_COUNT),
      this.container.add(this.mesh));
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position || !e.attributes.orient)
      return;
    ((this.bonePosAnimationData = e.attributes.position.array),
      (this.boneOrientAnimationData = e.attributes.orient.array),
      (this.frameCount =
        this.bonePosAnimationData.length / (this.BONE_COUNT * 3)));
  }
  init() {
    ((this.shadowMesh = new Mesh(
      new PlaneGeometry(1.5, 1.5),
      new ShaderMaterial({
        uniforms: Object.assign(
          {
            u_texture: { value: this.shadowTexture },
            u_lightMixer: this.sharedUniforms.u_lightMixer,
          },
          blueNoise.sharedUniforms,
        ),
        vertexShader: shadowVert,
        fragmentShader: shadowFrag,
        blending: MultiplyBlending,
      }),
    )),
      (this.shadowMesh.renderOrder = 10),
      (this.shadowMesh.position.y = 0.01),
      (this.shadowMesh.rotation.x = -Math.PI / 2),
      this.container.add(this.shadowMesh));
  }
  update(e) {
    if (this.mesh && this.frameCount) {
      this.time += e * 0.5;
      let t = (this.time * this.FPS) % this.frameCount,
        r = Math.floor(t),
        n = Math.ceil(t) % this.frameCount,
        a = t - r,
        l = r * this.BONE_COUNT,
        c = n * this.BONE_COUNT,
        u = this.frameCount / 3;
      this.sharedUniforms.u_lightMixer.value.set(
        math.fit(t, u * 2, this.frameCount, 0, 1) + math.fit(t, 0, u, 1, 0),
        math.fit(t, 0, u, 0, 1) * math.fit(t, u, u * 2, 1, 0),
        math.fit(t, u, u * 2, 0, 1) * math.fit(t, u * 2, this.frameCount, 1, 0),
      );
      for (let f = 0; f < this.BONE_COUNT; f++)
        (_v1$2
          .fromArray(this.bonePosAnimationData, (l + f) * 3)
          .lerp(_v2$1.fromArray(this.bonePosAnimationData, (c + f) * 3), a)
          .toArray(this.bonePoses, f * 3),
          _q1$1
            .fromArray(this.boneOrientAnimationData, (l + f) * 4)
            .slerp(_q2.fromArray(this.boneOrientAnimationData, (c + f) * 4), a)
            .toArray(this.boneOrients, f * 4));
    }
  }
}
const aboutHeroPerson$1 = new aboutHeroPerson(),
  aboutHeroVisualFinalVert = `#define GLSLIFY 1
float viewZ=(modelViewMatrix*vec4(pos,1.0)).z;float near=1.;float far=100.0;v_depth=1.0-(viewZ+near)/(near-far);`,
  aboutHeroVisualFinalFrag = `#define GLSLIFY 1
gl_FragColor.r=gl_FragColor.r;gl_FragColor.g=v_depth;gl_FragColor.b=1.0;`,
  vert$5 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;attribute float a_instanceId;attribute vec3 a_instancePos;attribute vec3 a_instanceRands;uniform float u_introTime;uniform float u_sceneRatio;uniform float u_hudRatio;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 localPos=position;localPos.xy=rotate(localPos.xy,a_instanceRands.y*6.28+sign(-a_instancePos.x)*u_introTime*mix(0.03,0.15,a_instanceRands.z));vec3 pos=(9.0+2.0*a_instanceRands.x)*localPos;vec3 noise=simplexNoiseDerivatives(vec4((a_instancePos+pos)*0.5,u_introTime*0.075)).yzw;float cycle=fract((0.08+0.08*a_instanceRands.x)*u_introTime+a_instanceRands.z);vec3 instancePos=a_instancePos+vec3(cycle*(a_instancePos.x*0.75+sign(a_instancePos.x)*0.25),0.0,0.0)+noise*vec3(0.35,0.2,0.1);instancePos.y-=linearStep(4.,1.,abs(instancePos.x))*1.+0.5;pos+=instancePos;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_uv=uv;v_instanceId=a_instanceId;float d=(modelViewMatrix*vec4(instancePos,1.0)).z;v_opacity=smoothstep(1.,3.,-d)*u_sceneRatio*(1.-u_hudRatio)*linearStep(0.,0.25,cycle)*linearStep(1.,0.75,cycle)*mix(1.,0.75,a_instanceRands.x);if(v_opacity<0.004){gl_Position.z=2.*gl_Position.w;}
#include <aboutHeroVisualFinal_vert>
}`,
  frag$8 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;uniform sampler2D u_currSceneTexture;uniform sampler2D u_fogTexture;uniform vec2 u_resolution;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;uniform float u_time;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
#include <getBlueNoise>
#include <getScatter>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec2 fogMap=texture2D(u_fogTexture,v_uv).rg;vec4 currScene=texture2D(u_currSceneTexture,screenPaintUv);float depth=v_depth-fogMap.y*0.02;float depthMask=fogMap.x*1.35-fogMap.y*0.15;gl_FragColor.r=depthMask*v_opacity;gl_FragColor.gb=currScene.gb;gl_FragColor.a=exp(-length(v_worldPosition+vec3(0.,0.,-max(0.,fogMap.y-0.25)*10.+5.)-vec3(0.,0.,0.))*(0.22-fogMap.x*0.2))*fogMap.y*linearStep(0.0,0.035,depth-currScene.g)*v_opacity*0.45;}`;
class AboutHeroFog {
  container = new Object3D();
  geometry = null;
  material = null;
  mesh = null;
  texture = null;
  cacheRT = null;
  INSTANCES_COUNT = 32;
  preInit() {
    this.texture = properties.loader.add(
      settings.TEXTURE_PATH + "about/fog.png",
      { type: "texture" },
    ).content;
  }
  init() {
    let e = math.getSeedRandomFn("fog96");
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    const t = new PlaneGeometry(1, 1, 3, 3);
    this.geometry = new InstancedBufferGeometry();
    for (let l in t.attributes) this.geometry.setAttribute(l, t.attributes[l]);
    this.geometry.setIndex(t.index);
    const r = new Float32Array(this.INSTANCES_COUNT),
      n = new Float32Array(this.INSTANCES_COUNT * 3),
      a = new Float32Array(this.INSTANCES_COUNT * 3);
    for (let l = 0, c = 0; l < this.INSTANCES_COUNT; l++)
      ((r[l] = l),
        (n[c] = 12 * (e() * 2 - 1)),
        (n[c + 1] = -0.25 + 0.5 * e()),
        (n[c + 2] = 12 * (1 - (l / (this.INSTANCES_COUNT - 1)) * 2)),
        (a[c] = e() * 2 - 1),
        (a[c + 1] = e() * 2 - 1),
        (a[c + 2] = e() * 2 - 1),
        (c += 3));
    (this.geometry.setAttribute(
      "a_instanceId",
      new InstancedBufferAttribute(r, 1),
    ),
      this.geometry.setAttribute(
        "a_instancePos",
        new InstancedBufferAttribute(n, 3),
      ),
      this.geometry.setAttribute(
        "a_instanceRands",
        new InstancedBufferAttribute(a, 3),
      ),
      (this.material = new ShaderMaterial({
        uniforms: Object.assign(
          {
            u_fogTexture: { value: this.texture },
            u_currSceneTexture: { value: this.cacheRT.texture },
            u_lightPosition: light.sharedUniforms.u_lightPosition,
            u_resolution: properties.sharedUniforms.u_resolution,
          },
          blueNoise.sharedUniforms,
          aboutHeroScatter.sharedUniforms,
          aboutHero.sharedUniforms,
        ),
        vertexShader: vert$5,
        fragmentShader: frag$8,
        side: DoubleSide,
        depthWrite: !1,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: SrcAlphaFactor,
        blendDst: OneMinusSrcAlphaFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: ZeroFactor,
        blendDstAlpha: OneFactor,
      })),
      (this.mesh = new Mesh(this.geometry, this.material)),
      (this.mesh.renderOrder = 20),
      (this.mesh.frustumCulled = !1),
      (this.mesh.onBeforeRender = this.onBeforeRender.bind(this)),
      this.container.add(this.mesh));
  }
  onBeforeRender() {
    let e = fboHelper.renderer,
      t = e.getRenderTarget();
    (fboHelper.clearMultisampleRenderTargetState(),
      fboHelper.copy(t.texture, this.cacheRT),
      e.setRenderTarget(t));
  }
  resize(e, t) {
    this.cacheRT.setSize(e, t);
  }
  update(e) {}
}
const aboutHeroFog = new AboutHeroFog(),
  vert$4 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_lightPosition;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;gl_Position.z=1.*(gl_Position.w);}`,
  frag$7 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform vec2 u_resolution;uniform sampler2D u_currSceneTexture;uniform float u_sceneRatio;uniform float u_hudRatio;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(57.,27.));gl_FragColor.r=getScatter(cameraPosition,v_worldPosition);gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);gl_FragColor.g=1.;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=0.;gl_FragColor.r+=noise.r*0.004;}`;
class AboutHeroHalo {
  container = new Object3D();
  mesh = null;
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/bg_box.buf", {
      onLoad: this._onGeometryLoad.bind(this),
    });
  }
  _onGeometryLoad(e) {
    ((this.mesh = new Mesh(
      e,
      new ShaderMaterial({
        uniforms: Object.assign(
          { u_resolution: properties.sharedUniforms.u_resolution },
          light.sharedUniforms,
          blueNoise.sharedUniforms,
          aboutHeroScatter.sharedUniforms,
          aboutHero.sharedUniforms,
        ),
        vertexShader: vert$4,
        fragmentShader: frag$7,
      }),
    )),
      (this.mesh.renderOrder = 10),
      this.container.add(this.mesh));
  }
  init() {}
  resize(e, t) {}
  update(e) {}
}
const aboutHeroHalo = new AboutHeroHalo(),
  vert$3 = `#define GLSLIFY 1
uniform sampler2D u_positionTexture;uniform sampler2D u_norShadeTexture;uniform float u_activeRatio;uniform float u_showRatio;uniform vec3 u_mouse;uniform vec2 u_resolution;uniform float u_time;uniform float u_isForward;uniform float u_glitchOffset;uniform float u_glitchStrength;uniform float u_glitchThreshold;attribute vec2 a_simUv;attribute vec4 a_rands1;attribute vec4 a_rands2;varying float v_shade;varying float v_showRatio;varying float v_blurriness;varying vec2 v_toCenter;varying vec2 v_uv;varying vec3 v_color;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){vec3 basePos=texture2D(u_positionTexture,a_simUv).xyz;vec3 pos=basePos;float yRatio=basePos.y*0.5+0.5;float showRatio=smoothstep(a_rands1.x*0.2+yRatio*0.4,0.4+a_rands1.y*0.2+yRatio*0.4,u_showRatio);pos*=1.3;pos+=(simplexNoiseDerivatives(vec4(basePos*8.,u_time)).yzw*0.2+vec3(1.*yRatio,0.0,-1.))*(1.-showRatio);v_showRatio=showRatio;vec4 norShade=texture2D(u_norShadeTexture,a_simUv);float depth=clamp(1.-pos.z,0.0,1.0);vec3 nor=norShade.xyz*2.-1.;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;vec3 viewNormal=normalMatrix*normalize(nor);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 lightDir=normalize(u_mouse-worldPosition);float distToLight=distance(u_mouse,worldPosition);float light=norShade.w*1.25;float diff=linearStep(0.35,1.0,dot(worldNormal,lightDir))/sqrt(distToLight*0.1);light*=diff+0.6;light+=(0.05+diff*0.15)*smoothstep(0.0,0.005,norShade.w);float frontFaceMultiplier=linearStep(-0.2,0.0,viewNormal.z);light*=frontFaceMultiplier;v_blurriness=min(1.0,(abs(depth-(1.-u_activeRatio*showRatio)*0.5))*2.5)*(2.-showRatio);float basePointSize=0.009*(1.+pow(v_blurriness,1.5)*8.)*frontFaceMultiplier;float pointSize=max(basePointSize,12./u_resolution.y);float subpixelMultiplier=pow(basePointSize/pointSize,1.5);pos.xy+=position.xy*pointSize*step(0.003,light)*linearStep(0.0,0.75,u_activeRatio);vec4 verticalRands=hash42(vec2(floor(basePos.y*3.+cos(basePos.y*3.+u_glitchOffset)*2.+u_glitchOffset),0.))*u_glitchStrength;float glitchWeight=verticalRands.x*step(u_glitchThreshold,verticalRands.y);pos.x+=(verticalRands.z*verticalRands.z)*glitchWeight*0.35*cos(basePos.y+u_glitchOffset);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_color=mix(vec3(1.0),(viewNormal.xzy*0.5+0.5)*vec3(1.0,0.5,2.0),glitchWeight);light*=(1.+glitchWeight*1.5);light+=0.1*glitchWeight;float scanline=smoothstep(0.04,0.,abs(fract(u_time*-0.3-basePos.y*.5+.5)));light+=scanline*(0.25*norShade.w*(1.0-light)+smoothstep(0.03,0.,abs(viewNormal.z)));v_shade=min(1.0,light*(1.-v_blurriness*0.5))*subpixelMultiplier*showRatio;v_toCenter=(uv-.5)*2.;v_uv=uv;}`,
  frag$6 = `#define GLSLIFY 1
varying float v_shade;varying float v_showRatio;varying vec2 v_toCenter;varying float v_blurriness;varying vec2 v_uv;varying vec3 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 linearStep(vec3 edge0,vec3 edge1,vec3 x){return clamp((x-edge0)/(edge1-edge0),vec3(0.),vec3(1.));}void main(){float shade=v_shade;float d=length(v_toCenter);float range=v_blurriness*5.;float brightness=linearStep(1.,1.-range-fwidth(d),d);shade*=brightness*(1.25-v_blurriness*v_shade);gl_FragColor=vec4(shade)*v_showRatio*v_showRatio;gl_FragColor.a*=pow(1.-v_blurriness,3.)*0.8*linearStep(0.8,1.0,v_showRatio*v_showRatio);}`,
  PARTICLE_COUNT = 8192,
  SIM_TEXTURE_WIDTH = 128,
  SIM_TEXTURE_HEIGHT = 64,
  MAX_FACE_NUM = 2;
let _v1$1 = new Vector3();
new Vector3();
let _m = new Matrix4();
class AboutHeroFaces {
  container = new Object3D();
  faceContainer = new Object3D();
  isActive = !1;
  hasStartedLoads = {};
  teamPosDataTextures = {};
  teamNShadeDataTextures = {};
  sharedUniforms = {
    u_mouse: { value: new Vector3() },
    u_glitchOffset: { value: 0 },
    u_glitchStrength: { value: 0 },
    u_showRatio: { value: 0 },
  };
  currId = "";
  nextId = "";
  transitionRatio = 0;
  showRatio = 0;
  activeRatio = 1;
  hideRatio = 0;
  meshArray = [];
  preInit() {}
  load(e) {
    this.hasStartedLoads[e] ||
      ((this.hasStartedLoads[e] = !0),
      properties.loader[properties.hasInitialized ? "load" : "add"](
        settings.TEAM_PATH + e + ".buf",
        {
          onLoad: (t) => {
            this._onModelLoaded(e, t);
          },
        },
      ));
  }
  _onModelLoaded(e, t) {
    if (!t || !t.attributes || !t.attributes.position || !t.attributes.nShade) return;
    let r = t.attributes.position.array,
      n = new Float32Array(PARTICLE_COUNT * 4);
    for (let a = 0, l = 0, c = 0; a < PARTICLE_COUNT; a++, l += 3, c += 4)
      ((n[c] = r[l]),
        (n[c + 1] = r[l + 1]),
        (n[c + 2] = r[l + 2]),
        (n[c + 3] = 1 / PARTICLE_COUNT));
    ((this.teamPosDataTextures[e] = fboHelper.createDataTexture(
      n,
      SIM_TEXTURE_WIDTH,
      SIM_TEXTURE_HEIGHT,
      !0,
      !0,
    )),
      (this.teamNShadeDataTextures[e] = fboHelper.createDataTexture(
        t.attributes.nShade.array,
        SIM_TEXTURE_WIDTH,
        SIM_TEXTURE_HEIGHT,
        !1,
        !0,
      )));
  }
  init() {
    (this.container.add(this.faceContainer),
      this.container.scale.set(27.5, 27.5, 16),
      (this.container.rotation.y = Math.PI + 0.2),
      (this.container.rotation.x = 0.1),
      (this.container.position.y = 34),
      (this.container.position.z = 25),
      this.container.updateMatrixWorld(!0));
    let e = new PlaneGeometry(1, 1),
      t = new InstancedBufferGeometry();
    for (let l in e.attributes) t.attributes[l] = e.attributes[l];
    t.index = e.index;
    let r = new Float32Array(PARTICLE_COUNT * 2),
      n = new Float32Array(PARTICLE_COUNT * 4),
      a = new Float32Array(PARTICLE_COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < PARTICLE_COUNT; l++, c += 2, u += 4)
      ((r[c] = ((l % SIM_TEXTURE_WIDTH) + 0.5) / SIM_TEXTURE_WIDTH),
        (r[c + 1] = (~~(l / SIM_TEXTURE_WIDTH) + 0.5) / SIM_TEXTURE_HEIGHT),
        (n[u] = Math.random()),
        (n[u + 1] = Math.random()),
        (n[u + 2] = Math.random()),
        (n[u + 3] = Math.random()),
        (a[u] = Math.random()),
        (a[u + 1] = Math.random()),
        (a[u + 2] = Math.random()),
        (a[u + 3] = Math.random()));
    (t.setAttribute("a_simUv", new InstancedBufferAttribute(r, 2)),
      t.setAttribute("a_rands1", new InstancedBufferAttribute(n, 4)),
      t.setAttribute("a_rands2", new InstancedBufferAttribute(a, 4)));
    for (let l = 0; l < MAX_FACE_NUM; l++) {
      const c = new ShaderMaterial({
        uniforms: {
          u_time: properties.sharedUniforms.u_time,
          u_resolution: properties.sharedUniforms.u_resolution,
          u_mouse: this.sharedUniforms.u_mouse,
          u_glitchOffset: this.sharedUniforms.u_glitchOffset,
          u_glitchStrength: this.sharedUniforms.u_glitchStrength,
          u_glitchThreshold: { value: 0 },
          u_activeRatio: { value: 0 },
          u_showRatio: this.sharedUniforms.u_showRatio,
          u_positionTexture: { value: null },
          u_norShadeTexture: { value: null },
        },
        vertexShader: vert$3,
        fragmentShader: frag$6,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor,
      });
      c.extensions.derivatives = !0;
      const u = new Mesh(t, c);
      ((u.frustumCulled = !1),
        (u.visible = !1),
        this.meshArray.push(u),
        this.faceContainer.add(u));
    }
  }
  resize(e, t) {}
  update(e) {
    if (this.meshArray.length > 0) {
      let t = this.transitionRatio;
      this.sharedUniforms.u_showRatio.value = this.showRatio;
      let r = input.easedMouseDynamics.default.value;
      (_v1$1
        .set(r.x, r.y, 0.5)
        .unproject(cameraControls._camera)
        .sub(cameraControls._camera.position)
        .normalize(),
        _v1$1.multiplyScalar(75 / _v1$1.z).add(cameraControls._camera.position),
        _m.copy(this.faceContainer.matrixWorld).invert(),
        _v1$1.applyMatrix4(_m));
      let n = math.clamp(_v1$1.y * 0.03, -0.05, 0.05),
        a = math.clamp(_v1$1.x * 0.03, -0.05, 0.05);
      (_v1$1.applyMatrix4(this.faceContainer.matrixWorld),
        this.sharedUniforms.u_mouse.value.copy(_v1$1));
      let l = this.meshArray[0];
      ((l.material.uniforms.u_positionTexture.value =
        this.teamPosDataTextures[this.currId]),
        (l.material.uniforms.u_norShadeTexture.value =
          this.teamNShadeDataTextures[this.currId]),
        (l.material.uniforms.u_activeRatio.value = 1 - t),
        (l.material.uniforms.u_glitchThreshold.value = math.fit(
          l.material.uniforms.u_activeRatio.value,
          0.4,
          1,
          0,
          0.9,
        )),
        (l.material.uniforms.u_activeRatio.value *= this.activeRatio),
        (l.position.x = t * -1.5),
        (l.position.z = -t * 2 - (1 - this.activeRatio) * 2),
        (l.rotation.y = t * -0.3 + a),
        (l.rotation.x = t * 0.4 + n),
        (l.visible = !0));
      let c = this.meshArray[1];
      ((c.material.uniforms.u_positionTexture.value =
        this.teamPosDataTextures[this.nextId]),
        (c.material.uniforms.u_norShadeTexture.value =
          this.teamNShadeDataTextures[this.nextId]),
        (c.material.uniforms.u_activeRatio.value = t),
        (c.material.uniforms.u_glitchThreshold.value = math.fit(
          c.material.uniforms.u_activeRatio.value,
          0.4,
          1,
          0,
          0.9,
        )),
        (c.material.uniforms.u_activeRatio.value *= this.activeRatio),
        (c.position.x = (t - 1) * -1.5),
        (c.position.z = (t - 1) * 2 - (1 - this.activeRatio) * 2),
        (c.rotation.y = (t - 1) * -0.3 + a),
        (c.rotation.x = (t - 1) * -0.4 + n),
        (c.visible = !0),
        (this.sharedUniforms.u_glitchOffset.value = Math.random() * 1e3),
        (this.sharedUniforms.u_glitchStrength.value = Math.random()),
        (this.container.visible = this.isActive));
    }
  }
}
const aboutHeroFaces = new AboutHeroFaces(),
  fragmentShader$1 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_colorBurn;uniform float u_colorBurnAlpha;uniform vec3 u_colorDodge;uniform float u_colorDodgeAlpha;varying vec2 v_uv;vec3 colorDodge(in vec3 src,in vec3 dst){return mix(step(0.,src)*(min(vec3(1.),dst/(1.-src))),vec3(1.),step(1.,dst));}vec3 colorBurn(in vec3 src,in vec3 dst){return mix(step(0.,src)*(1.-min(vec3(1.),(1.-dst)/src)),vec3(1.),step(1.,dst));}void main(){vec4 texture=texture2D(u_texture,v_uv);vec3 colorBurn=mix(texture.rgb,colorBurn(u_colorBurn,texture.rgb),u_colorBurnAlpha);vec3 colorDodge=mix(texture.rgb,colorDodge(u_colorDodge,texture.rgb),u_colorDodgeAlpha);texture.rgb=mix(colorBurn,colorDodge,texture.rgb);gl_FragColor=texture;}`;
let _sceneColorBurn = new Color("#00f0ff"),
  _sceneColorDodge = new Color("#005aff"),
  _sceneColorBurnAlpha = 0.15,
  _sceneColorDodgeAlpha = 0.12,
  _hudColorBurn = new Color("#79a8ff"),
  _hudColorDodge = new Color("#a5ff44"),
  _hudColorBurnAlpha = 1,
  _hudColorDodgeAlpha = 0.7;
class AboutPageHeroEfx extends PostEffect {
  colorBurn = new Color("#000");
  colorDodge = new Color("#000");
  hudRatio = 1;
  isActive = !0;
  renderOrder = 20;
  randSimplex1Ds = [];
  init(e) {
    (Object.assign(this, e),
      super.init(),
      (this.material = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: { value: null },
          u_colorBurn: { value: this.colorBurn },
          u_colorBurnAlpha: { value: 1 },
          u_colorDodge: { value: this.colorDodge },
          u_colorDodgeAlpha: { value: 1 },
        },
        fragmentShader: fragmentShader$1,
      })));
  }
  needsRender() {
    return this.isActive;
  }
  render(e, t = !1) {
    let r = this.material.uniforms;
    (this.colorBurn.copy(_sceneColorBurn).lerp(_hudColorBurn, this.hudRatio),
      this.colorDodge
        .copy(_sceneColorDodge)
        .lerp(_hudColorDodge, this.hudRatio),
      (r.u_colorBurnAlpha.value = math.mix(
        _sceneColorBurnAlpha,
        _hudColorBurnAlpha,
        this.hudRatio * this.hudRatio,
      )),
      (r.u_colorDodgeAlpha.value = math.mix(
        _sceneColorDodgeAlpha,
        _hudColorDodgeAlpha,
        this.hudRatio * this.hudRatio,
      )),
      super.render(e, t));
  }
}
const aboutPageHeroEfx = new AboutPageHeroEfx(),
  vert$2 = `#define GLSLIFY 1
attribute vec3 instancePos;attribute vec4 instanceRands;attribute float instanceDensity;uniform float u_time;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_charUv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;void main(){float charCount=mix(50.,100.,instanceRands.y);vec3 pos=position;v_uv=uv;pos.xy*=vec2(1.,6./5.*charCount);v_charUv=vec2(1.-position.x,position.y*charCount)+vec2(.5,0.);v_charUv.y-=u_time*mix(2.,10.,instanceRands.x);pos=pos*0.75+instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_instanceRands=instanceRands;v_opacity=mix(.5,1.,instanceDensity)*u_showRatio;}`,
  frag$5 = `#define GLSLIFY 1
uniform sampler2D u_letterTexture;uniform float u_time;varying vec2 v_charUv;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){float fade=1.-linearStep(15.,66.,v_worldPosition.z);float MAX_CHAR=42.;float charIdx=floor(mod(v_charUv.y,MAX_CHAR));float charTime=u_time*mix(1.,2.,v_instanceRands.y+hash43(vec3(charIdx,-100.,v_instanceRands.z)).x);vec4 charRands=hash43(vec3(charIdx,v_instanceRands.w,floor(charTime*-2.)));charIdx=mod(charIdx+floor(charRands.x*MAX_CHAR),MAX_CHAR);vec2 charUv=vec2((v_charUv.x+charIdx)/MAX_CHAR,mod(v_charUv.y,1.));float shade=texture2D(u_letterTexture,charUv).r;gl_FragColor=vec4(shade)*charRands.w*charRands.y*v_opacity;gl_FragColor*=smoothstep(0.5,0.35,abs(v_uv.y-.5))*(0.5+fade*0.5)*(0.3+v_instanceRands.z*1.25)*smoothstep(100.,150.,mod(v_charUv.y-200.*v_instanceRands.y,200.));gl_FragColor.a*=3.;}`;
class AboutHeroLetters {
  container = new Object3D();
  rt;
  blurRt;
  sharedUniforms = {};
  mesh;
  meshList = [];
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/letter_placements.buf", {
      onLoad: this._onGeometryLoad.bind(this),
    });
  }
  _onGeometryLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) return;
    let t = new PlaneGeometry(1, 1).translate(0, 0.5, 0).rotateY(Math.PI),
      r = e.attributes.position.count,
      n = Math.floor(r / 4),
      a = new ShaderMaterial({
        uniforms: Object.assign(
          {
            u_time: properties.sharedUniforms.u_time,
            u_showRatio: aboutHeroFaces.sharedUniforms.u_showRatio,
          },
          aboutHero.sharedUniforms,
        ),
        depthTest: !1,
        depthWrite: !1,
        vertexShader: vert$2,
        fragmentShader: frag$5,
        transparent: !0,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor,
      });
    for (let l = 0; l < 4; l++) {
      let c = new InstancedBufferGeometry();
      for (let p in t.attributes) c.setAttribute(p, t.attributes[p]);
      c.setIndex(t.index);
      let u = new Float32Array(r * 4);
      for (let p = 0; p < n; p++)
        ((u[p * 4 + 0] = Math.random()),
          (u[p * 4 + 1] = Math.random()),
          (u[p * 4 + 2] = Math.random()),
          (u[p * 4 + 3] = Math.random()));
      c.setAttribute("instanceRands", new InstancedBufferAttribute(u, 4));
      let f = n * l;
      (c.setAttribute(
        "instancePos",
        new InstancedBufferAttribute(
          e.attributes.position.array.slice(f * 3, (f + n) * 3),
          3,
        ),
      ),
        c.setAttribute(
          "instanceDensity",
          new InstancedBufferAttribute(
            e.attributes.density.array.slice(f, f + n),
            1,
          ),
        ),
        (this.meshList[l] = new Mesh(c, a)));
    }
    ((this.rt = fboHelper.createRenderTarget(1, 1)),
      (this.blurRt = fboHelper.createRenderTarget(1, 1)),
      (this.mesh = new Mesh(
        new PlaneGeometry(2, 2),
        fboHelper.createRawShaderMaterial({
          uniforms: { u_texture: { value: this.rt.texture } },
          depthTest: !1,
          depthWrite: !1,
          transparent: !0,
          blending: CustomBlending,
          blendEquation: AddEquation,
          blendSrc: OneFactor,
          blendDst: OneFactor,
          blendEquationAlpha: AddEquation,
          blendSrcAlpha: OneFactor,
          blendDstAlpha: OneFactor,
        }),
      )),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 10),
      this.container.add(this.mesh),
      (this.mesh.onBeforeRender = this._onBeforeRender.bind(this)));
  }
  init() {}
  _onBeforeRender() {
    (properties.width != this.rt.width ||
      properties.height != this.rt.height) &&
      this.rt.setSize(properties.width, properties.height);
    let e = properties.renderer,
      t = e.getRenderTarget(),
      r = fboHelper.getColorState();
    (e.setClearColor(0, 0),
      e.setRenderTarget(this.rt),
      e.clear(),
      (e.autoClear = !1),
      fboHelper.renderMesh(this.meshList[0], this.rt, properties.camera),
      blur.blur(16, 0.5, this.rt, this.blurRt, this.rt),
      fboHelper.renderMesh(this.meshList[1], this.rt, properties.camera),
      blur.blur(8, 0.5, this.rt, this.blurRt, this.rt),
      fboHelper.renderMesh(this.meshList[2], this.rt, properties.camera),
      blur.blur(4, 0.5, this.rt, this.blurRt, this.rt),
      fboHelper.renderMesh(this.meshList[3], this.rt, properties.camera),
      e.setRenderTarget(t),
      fboHelper.setColorState(r));
  }
  update(e) {}
}
const aboutHeroLetters = new AboutHeroLetters(),
  _v = new Vector3(),
  _q0 = new Quaternion(),
  _q1 = new Quaternion();
class AboutHero extends Stage3D {
  container = new Object3D();
  sceneContainer = new Object3D();
  hudContainer = new Object3D();
  cameraSplineGeo = null;
  cameraSplinePositions = null;
  cameraSplineOrientation = null;
  sceneRatio = 0;
  sceneHideRatio = 0;
  initialSplineRatio = 0;
  hudRatio = 0;
  introRatio = 0;
  outSectionRatio = 0;
  freezeRatio = 1;
  introTime = 0;
  scrollYRatio = 0;
  panningSplineRaito = 0;
  sharedUniforms = {
    u_sceneRatio: { value: 0 },
    u_sceneHideRatio: { value: 0 },
    u_hudRatio: { value: 0 },
    u_introRatio: { value: 0 },
    u_introTime: { value: 0 },
    u_introDeltaTime: { value: 0 },
    u_letterTexture: { value: null },
  };
  constructor() {
    super({
      properties: {
        defaultCameraPosition: new Vector3(0, 5, 5),
        defaultLookAtPosition: new Vector3(0, 5, 0),
        cameraDollyZoomFovOffset: 0,
        cameraFov: 60,
        bloomAmount: 4,
        bloomRadius: 0.25,
        bloomThreshold: 0.8,
        bloomSmoothWidth: 0.3,
        haloStrength: 0,
        clearAlpha: 0,
        cameraLookStrength: 0.1,
        screenPaintOffsetRatio: 0,
        screenPaintDistortionRGBShift: 0.1,
      },
    });
  }
  preInit() {
    (aboutPageHeroEfxPrepass.init(),
      properties.postprocessing.queue.push(aboutPageHeroEfxPrepass),
      aboutPageHeroEfx.init(),
      properties.postprocessing.queue.push(aboutPageHeroEfx),
      (this.sharedUniforms.u_letterTexture.value = properties.loader.add(
        settings.TEXTURE_PATH + "font.png",
        { minFilter: LinearFilter, type: "texture" },
      ).content),
      shaderHelper.addChunk(
        "aboutHeroVisualFinal_vert",
        aboutHeroVisualFinalVert,
      ),
      shaderHelper.addChunk(
        "aboutHeroVisualFinal_frag",
        aboutHeroVisualFinalFrag,
      ),
      properties.loader.add(settings.MODEL_PATH + "about/camera_spline.buf", {
        onLoad: (e) => (this.cameraSplineGeo = e),
      }),
      light.preInit(),
      sim.preInit(),
      lightField.preInit(),
      aboutHeroParticles.preInit(),
      aboutHeroRocks.preInit(),
      aboutHeroGround.preInit(),
      aboutHeroLines.preInit(),
      aboutHeroPerson$1.preInit(),
      aboutHeroFog.preInit(),
      aboutHeroHalo.preInit(),
      aboutHeroFaces.preInit(),
      aboutHeroLetters.preInit());
  }
  init() {
    (light.init(),
      sim.init(),
      lightField.init(),
      aboutHeroParticles.init(),
      aboutHeroRocks.init(),
      aboutHeroGround.init(),
      aboutHeroLines.init(),
      aboutHeroPerson$1.init(),
      aboutHeroFog.init(),
      aboutHeroScatter.init(),
      aboutHeroHalo.init(),
      aboutHeroFaces.init(),
      aboutHeroLetters.init(),
      this.add(aboutHeroParticles.container),
      this.sceneContainer.add(aboutHeroRocks.container),
      this.sceneContainer.add(aboutHeroPerson$1.container),
      this.sceneContainer.add(aboutHeroFog.container),
      this.add(this.sceneContainer),
      this.add(aboutHeroGround.container),
      this.add(aboutHeroHalo.container),
      this.hudContainer.add(aboutHeroLines.container),
      this.add(this.hudContainer),
      aboutPageHeroEfxPrepass.scene.add(aboutHeroFaces.container),
      aboutPageHeroEfxPrepass.scene.add(aboutHeroLetters.container),
      (this.cameraSplinePositions = this.cameraSplineGeo.attributes.position),
      (this.cameraSplineOrientation = this.cameraSplineGeo.attributes.orient),
      taskManager.add(this),
      taskManager.add(aboutPageHeroEfxPrepass.scene));
  }
  resize(e, t) {
    (aboutHeroFog.resize(e, t),
      aboutHeroHalo.resize(e, t),
      aboutHeroFaces.resize(e, t));
  }
  syncProperties(e) {
    this.sharedUniforms.u_introRatio.value = this.introRatio;
    const t =
        math.saturate(this.initialSplineRatio) * 149 +
        math.saturate(this.panningSplineRaito) * 50,
      r = Math.floor(t),
      n = Math.min(this.cameraSplinePositions.count - 1, Math.ceil(t)),
      a = t - r;
    ((this.sceneRatio = this.sharedUniforms.u_sceneRatio.value =
      math.fit(this.introRatio, 0.01, 0.1, 0, 1, ease.cubicOut)),
      (this.sceneHideRatio = this.sharedUniforms.u_sceneHideRatio.value =
        math.fit(this.introRatio, 0.85, 1, 0, 1)),
      (this.sharedUniforms.u_hudRatio.value = this.hudRatio),
      (this.properties.bloomAmount = 3),
      (this.properties.bloomAmount = math.fit(
        this.introRatio,
        0.1,
        0.85,
        this.properties.bloomAmount,
        1.5,
        ease.sineOut,
      )),
      (this.properties.bloomAmount = math.fit(
        this.introRatio,
        0.85,
        1,
        this.properties.bloomAmount,
        10,
      )),
      (this.properties.bloomAmount = math.fit(
        this.hudRatio,
        0,
        0.5,
        this.properties.bloomAmount,
        12.5,
      )),
      (this.properties.haloStrength = 0.08),
      (this.properties.haloStrength = math.fit(
        this.introRatio,
        0.1,
        0.4,
        this.properties.haloStrength,
        0.15,
      )),
      (this.properties.haloStrength = math.fit(
        this.hudRatio,
        0,
        0.5,
        this.properties.haloStrength,
        0,
      )),
      (this.properties.screenPaintDistortionRGBShift = math.mix(
        0,
        properties.defaults.screenPaintDistortionRGBShift,
        this.outSectionRatio,
      )),
      (this.properties.cameraLookStrength = math.fit(
        this.initialSplineRatio,
        0,
        1,
        0.1,
        0.035,
      )),
      _v.fromArray(this.cameraSplinePositions.array, n * 3),
      this.properties.defaultCameraPosition.fromArray(
        this.cameraSplinePositions.array,
        r * 3,
      ),
      this.properties.defaultCameraPosition.lerp(_v, a),
      _q0.fromArray(this.cameraSplineOrientation.array, r * 4),
      _q1.fromArray(this.cameraSplineOrientation.array, n * 4),
      _q0.slerp(_q1, a),
      _v
        .set(0, 0, 1)
        .applyQuaternion(_q0)
        .add(this.properties.defaultCameraPosition),
      this.properties.defaultLookAtPosition.copy(_v),
      (this.properties.cameraDollyZoomFovOffset = math.fit(
        this.initialSplineRatio,
        0.4,
        0.8,
        0,
        -10,
        ease.sineInOut,
      )),
      (this.properties.defaultCameraPosition.y += math.fit(
        this.scrollYRatio,
        0,
        1,
        0,
        -10,
        ease.sineOut,
      )),
      (this.properties.defaultLookAtPosition.y += math.fit(
        this.scrollYRatio,
        0,
        1,
        0,
        -10.1,
        ease.sineOut,
      )),
      (this.freezeRatio +=
        ((input.isDown ? 1 - this.hudRatio : 0) - this.freezeRatio) * 0.1));
  }
  update(e) {
    let t = e * math.mix(1, 0.1, this.freezeRatio);
    ((this.introTime += t),
      (this.sharedUniforms.u_introTime.value = this.introTime),
      (this.sharedUniforms.u_introDeltaTime.value = t),
      aboutHeroScatter.update(),
      this.hudRatio < 1
        ? (sim.update(e),
          lightField.update(t),
          aboutHeroParticles.update(t),
          (aboutHeroParticles.container.visible = !0))
        : (aboutHeroParticles.container.visible = !1),
      this.sceneRatio > 0 && this.hudRatio < 1
        ? (light.update(t),
          aboutHeroRocks.update(t),
          aboutHeroPerson$1.update(t),
          aboutHeroFog.update(t),
          aboutHeroHalo.update(t),
          (this.sceneContainer.visible = !0))
        : (this.sceneContainer.visible = !1),
      this.sceneRatio > 0 && aboutHeroGround.update(t),
      this.hudRatio > 0
        ? (aboutHeroLines.update(e), (this.hudContainer.visible = !0))
        : (this.hudContainer.visible = !1),
      aboutHeroFaces.update(e),
      aboutHeroLetters.update(e),
      (aboutPageHeroEfxPrepass.blurRatio = this.hudRatio),
      (aboutPageHeroEfxPrepass.needsRenderScene = aboutHeroFaces.isActive),
      (aboutPageHeroEfx.hudRatio = aboutHeroFaces.showRatio),
      this.hudRatio < 1 && lightField.postUpdate(e),
      this.sceneRatio > 0 && this.hudRatio < 1 && light.postUpdate(e));
  }
}
const aboutHero = new AboutHero(),
  vert$1 = `#define GLSLIFY 1
attribute float char;uniform float u_time;uniform float u_showRatio;uniform float u_hideRatio;uniform float u_aspect;uniform vec2 u_toDomXY;uniform vec2 u_toDomWH;uniform vec2 u_toDomPivot;varying float v_dist;
#include <ufxVert>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float cubicInOut(float t){return t<0.5? 4.0*t*t*t: 0.5*pow(2.0*t-2.0,3.0)+1.0;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){vec3 pos=vec3(position.xy,0.);vec3 aspectCorrectedPos=pos*vec3(1.,u_aspect,1.);v_dist=position.z;vec3 basePos=getBasePosition(aspectCorrectedPos);basePos.y=1.-basePos.y;vec3 screenPos=getScreenPosition(basePos);float vertexShowRatio=easeOutBack(linearStep(0.,1.,u_showRatio*2.2-aspectCorrectedPos.x-(aspectCorrectedPos.y)*0.2));screenPos.y-=(1.0-vertexShowRatio)*(u_domWH.y+min(u_domWH.y*1.1,100.));pos.x-=char/5.*0.08;vec3 aspectCorrectedToPos=pos*vec3(1.,u_aspect,1.);vec3 toBasePos=vec3((aspectCorrectedToPos.xy)*u_toDomWH-u_toDomPivot,aspectCorrectedToPos.z);toBasePos.y=1.-toBasePos.y;vec3 toScreenPos=toBasePos+vec3(u_toDomPivot.xy,0.);toScreenPos=(toScreenPos+vec3(u_toDomXY.xy,0.))*vec3(1.,-1.,1.);float vertexHideRatio=cubicInOut(linearStep(0.,1.,u_hideRatio*2.2-aspectCorrectedPos.x-pow(aspectCorrectedPos.y,1.+u_hideRatio)*0.2));screenPos=mix(screenPos,toScreenPos,vertexHideRatio);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);}`,
  frag$4 = `#define GLSLIFY 1
varying float v_dist;void main(){float alpha=smoothstep(0.,0.+fwidth(v_dist),v_dist);gl_FragColor=vec4(1.,1.,1.,alpha);}`;
let _needsSync = !1;
class AboutWhoLogo {
  container = new Object3D();
  fromDom;
  toDom;
  mesh;
  toMesh;
  containerWidth = 0;
  hideRatio = 0;
  preInit(e) {
    ((this.fromDom = e.querySelector("#about-who-title-main-logo")),
      (this.toDom = e.querySelector("#about-who-title-left-2")),
      aboutPage.postUfxContainer.add(this.container),
      (this.toMesh = new UfxMesh({ refDom: this.toDom })),
      properties.loader.add(settings.MODEL_PATH + "about/logo_text.buf", {
        onLoad: this._onGeometryLoad.bind(this),
      }));
  }
  _onGeometryLoad(e) {
    let t = this.toMesh.material.uniforms;
    ((this.mesh = new UfxMesh({
      refDom: this.fromDom,
      geometry: e,
      uniforms: {
        u_showRatio: { value: 1 },
        u_hideRatio: { value: 0 },
        u_aspect: { value: 1 / 0.200957 },
        u_toDomXY: t.u_domXY,
        u_toDomWH: t.u_domWH,
        u_toDomPivot: t.u_domPivot,
        u_time: properties.sharedUniforms.u_time,
      },
      vertexShader: vert$1,
      fragmentShader: frag$4,
    })),
      this.container.add(this.mesh));
  }
  init() {}
  resize(e, t) {
    _needsSync = !0;
  }
  update(e, t, r, n, a) {
    this.mesh &&
      (_needsSync &&
        ((_needsSync = !1),
        this.mesh.syncDom(r, t - n),
        this.toMesh.syncDom(r, t - a)),
      (this.mesh.material.uniforms.u_showRatio.value = math.fit(
        aboutPage.time,
        0.5,
        1.5,
        0,
        1,
      )),
      properties.useMobileLayout
        ? ((this.mesh.material.uniforms.u_showRatio.value *=
            1 - this.hideRatio),
          (this.mesh.material.uniforms.u_hideRatio.value = 0))
        : (this.mesh.material.uniforms.u_hideRatio.value = this.hideRatio),
      this.mesh.update(r, t),
      this.toMesh.update(r, t));
  }
}
const aboutWhoLogo = new AboutWhoLogo();


globalThis.light = light;
globalThis.lightField = lightField;
globalThis.sim = sim;
globalThis.aboutHeroScatter = aboutHeroScatter;
globalThis.aboutPageHeroEfxPrepass = aboutPageHeroEfxPrepass;
globalThis.aboutHeroParticles = aboutHeroParticles;
globalThis.aboutHeroRocks = aboutHeroRocks;
globalThis.aboutHeroGround = aboutHeroGround;
globalThis.aboutHeroLines = aboutHeroLines;
globalThis.aboutHeroPerson = aboutHeroPerson;
globalThis.aboutHeroFog = aboutHeroFog;
globalThis.aboutHeroHalo = aboutHeroHalo;
globalThis.aboutHeroFaces = aboutHeroFaces;
globalThis.aboutPageHeroEfx = aboutPageHeroEfx;
globalThis.aboutHeroLetters = aboutHeroLetters;
globalThis.aboutHero = aboutHero;
globalThis.aboutWhoLogo = aboutWhoLogo;

export {
  AboutHeroLight,
  AboutHeroLightField,
  AboutHeroParticlesSimulation,
  AboutHeroScatter,
  AboutHeroParticles,
  AboutHeroRocks,
  AboutHeroGround,
  AboutHeroLines,
  aboutHeroPerson,
  AboutHeroFog,
  AboutHeroHalo,
  AboutHeroFaces,
  AboutHeroLetters,
  AboutHero,
  AboutWhoLogo,
  aboutHero
};
export default aboutHero;
