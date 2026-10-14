/**
 * Dual-filter Pyramid HDR Bloom Pass
 */
import { PostEffect } from "./PostEffect.js";
const frag$2 = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform float u_saturation;uniform sampler2D u_blurTexture0;
#if ITERATION > 1
uniform sampler2D u_blurTexture1;
#endif
#if ITERATION > 2
uniform sampler2D u_blurTexture2;
#endif
#if ITERATION > 3
uniform sampler2D u_blurTexture3;
#endif
#if ITERATION > 4
uniform sampler2D u_blurTexture4;
#endif
uniform float u_bloomWeights[ITERATION];
#include <common>
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}void main(){vec4 c=texture2D(u_texture,v_uv);gl_FragColor=c+(u_bloomWeights[0]*texture2D(u_blurTexture0,v_uv)
#if ITERATION > 1
+u_bloomWeights[1]*texture2D(u_blurTexture1,v_uv)
#endif
#if ITERATION > 2
+u_bloomWeights[2]*texture2D(u_blurTexture2,v_uv)
#endif
#if ITERATION > 3
+u_bloomWeights[3]*texture2D(u_blurTexture3,v_uv)
#endif
#if ITERATION > 4
+u_bloomWeights[4]*texture2D(u_blurTexture4,v_uv)
#endif
);gl_FragColor.rgb=mix(vec3(dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114))),gl_FragColor.rgb,u_saturation);gl_FragColor.rgb=dithering(gl_FragColor.rgb);gl_FragColor.a=1.0;}`,
  highPassFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_luminosityThreshold;uniform float u_smoothWidth;uniform float u_amount;
#ifdef USE_HALO
uniform vec2 u_texelSize;uniform vec2 u_aspect;uniform float u_haloWidth;uniform float u_haloRGBShift;uniform float u_haloStrength;uniform float u_haloMaskInner;uniform float u_haloMaskOuter;
#ifdef USE_LENS_DIRT
uniform sampler2D u_dirtTexture;uniform vec2 u_dirtAspect;
#endif
#endif
#ifdef USE_CONVOLUTION
uniform float u_convolutionBuffer;
#endif
varying vec2 v_uv;void main(){vec2 uv=v_uv;
#ifdef USE_CONVOLUTION
uv=(uv-0.5)*(1.0+u_convolutionBuffer)+0.5;
#endif
vec4 texel=texture2D(u_texture,uv);vec3 luma=vec3(0.299,0.587,0.114);float v=dot(texel.xyz,luma);float alpha=texel.a*u_amount;gl_FragColor=vec4(texel.rgb*alpha,1.0);
#ifdef USE_HALO
vec2 toCenter=(uv-0.5)*u_aspect;vec2 ghostUv=1.0-(toCenter+0.5);vec2 ghostVec=(vec2(0.5)-ghostUv);vec2 direction=normalize(ghostVec);vec2 haloVec=direction*u_haloWidth;float weight=length(vec2(0.5)-fract(ghostUv+haloVec));weight=pow(1.0-weight,3.0);vec3 distortion=vec3(-u_texelSize.x,0.0,u_texelSize.x)*u_haloRGBShift;float zoomBlurRatio=fract(atan(toCenter.y,toCenter.x)*40.0)*0.05+0.95;ghostUv*=zoomBlurRatio;vec2 haloUv=ghostUv+haloVec;vec3 halo=vec3(texture2D(u_texture,haloUv+direction*distortion.r).r,texture2D(u_texture,haloUv+direction*distortion.g).g,texture2D(u_texture,haloUv+direction*distortion.b).b)*u_haloStrength*smoothstep(u_haloMaskInner,u_haloMaskOuter,length(toCenter));
#ifdef USE_LENS_DIRT
vec2 dirtUv=(uv-0.5)*u_dirtAspect+0.5;vec3 dirt=texture2D(u_dirtTexture,dirtUv).rgb;gl_FragColor.rgb+=(halo+alpha+0.05*dirt)*dirt;
#else
gl_FragColor.rgb+=halo;
#endif
#endif
#ifdef USE_CONVOLUTION
gl_FragColor.rgb*=max(abs(uv.x-0.5),abs(uv.y-0.5))>0.5 ? 0. : 1.;
#endif
}`,
  blurFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform vec2 u_resolution;uniform vec2 u_direction;float gaussianPdf(in float x,in float sigma){return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;}void main(){vec2 invSize=1.0/u_resolution;float fSigma=float(SIGMA);float weightSum=gaussianPdf(0.0,fSigma);vec3 diffuseSum=texture2D(u_texture,v_uv).rgb*weightSum;for(int i=1;i<KERNEL_RADIUS;i++){float x=float(i);float w=gaussianPdf(x,fSigma);vec2 uvOffset=u_direction*invSize*x;vec3 sample1=texture2D(u_texture,v_uv+uvOffset).rgb;vec3 sample2=texture2D(u_texture,v_uv-uvOffset).rgb;diffuseSum+=(sample1+sample2)*w;weightSum+=2.0*w;}gl_FragColor=vec4(diffuseSum/weightSum,1.0);}`,
  fftFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_texelSize;uniform float u_subtransformSize;uniform float u_normalization;uniform bool u_isForward;const float TWOPI=6.283185307179586;void main(){
#ifdef HORIZTONAL
float index=gl_FragCoord.x-.5;
#else
float index=gl_FragCoord.y-.5;
#endif
float evenIndex=floor(index/u_subtransformSize)*(u_subtransformSize*0.5)+mod(index,u_subtransformSize*0.5);
#ifdef HORIZTONAL
vec2 evenPos=vec2(evenIndex,gl_FragCoord.y)*u_texelSize;vec2 oddPos=evenPos+vec2(.5,0.);
#else
vec2 evenPos=vec2(gl_FragCoord.x,evenIndex)*u_texelSize;vec2 oddPos=evenPos+vec2(0.,.5);
#endif
vec4 even=texture2D(u_texture,evenPos);vec4 odd=texture2D(u_texture,oddPos);float twiddleArgument=(u_isForward ? TWOPI :-TWOPI)*(index/u_subtransformSize);vec2 twiddle=vec2(cos(twiddleArgument),sin(twiddleArgument));gl_FragColor=(even+vec4(twiddle.x*odd.xy-twiddle.y*odd.zw,twiddle.y*odd.xy+twiddle.x*odd.zw))*u_normalization;}`,
  convolutionSrcFrag = `#define GLSLIFY 1
uniform vec2 u_aspect;uniform sampler2D u_texture;varying vec2 v_uv;void main(){vec2 toCenter=(fract(v_uv+0.5)-0.5)*u_aspect;vec2 rotToCenter=mat2(0.7071067811865476,-0.7071067811865476,0.7071067811865476,0.7071067811865476)*toCenter;float res=exp(-length(toCenter)*1.0)*0.05+exp(-length(toCenter)*7.5)*0.5+exp(-length(toCenter)*25.0)*1.+exp(-length(toCenter*vec2(1.0,10.0))*30.0)*20.+exp(-length(toCenter*vec2(1.0,20.0))*60.0)*300.+exp(-length(toCenter*vec2(10.0,1.0))*30.0)*20.+exp(-length(toCenter*vec2(20.0,1.0))*60.0)*300.+exp(-length(rotToCenter*vec2(1.0,8.0))*37.5)*12.+exp(-length(rotToCenter*vec2(1.0,20.0))*75.0)*300.+exp(-length(rotToCenter*vec2(20.0,1.0))*75.0)*300.;gl_FragColor=vec4(res,res,0.,0.);}`,
  convolutionMixFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_kernelTexture;void main(){vec4 a=texture2D(u_texture,v_uv);vec4 b=texture2D(u_kernelTexture,v_uv);gl_FragColor=vec4(a.xy*b.xy-a.zw*b.zw,a.xy*b.zw+a.zw*b.xy);}`,
  convolutionCacheFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_amount;uniform float u_saturation;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv)*u_amount;gl_FragColor.rgb=mix(vec3(dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114))),gl_FragColor.rgb,u_saturation);}`,
  convolutionFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_bloomTexture;uniform float u_convolutionBuffer;
#include <common>
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}void main(){vec4 c=texture2D(u_texture,v_uv);vec2 bloomUv=(v_uv-0.5)/(1.0+u_convolutionBuffer)+0.5;gl_FragColor=c+texture2D(u_bloomTexture,bloomUv);gl_FragColor.rgb=dithering(gl_FragColor.rgb);gl_FragColor.a=1.0;}`;
class Bloom extends PostEffect {
  ITERATION = 5;
  USE_CONVOLUTION = !0;
  USE_HD = !0;
  USE_LENS_DIRT = !1;
  amount = 1;
  radius = 0;
  threshold = 0.1;
  smoothWidth = 1;
  highPassMultiplier = 1;
  haloWidth = 0.8;
  haloRGBShift = 0.03;
  haloStrength = 0.21;
  haloMaskInner = 0.3;
  haloMaskOuter = 0.5;
  highPassMaterial;
  highPassRenderTarget;
  fftHMaterial;
  fftVMaterial;
  srcMaterial;
  convolutionSrcFrag = convolutionSrcFrag;
  srcSize = 256;
  srcRT;
  fftCacheRT1;
  fftCacheRT2;
  fftSrcRT;
  fftBloomOutCacheMaterial;
  fftBloomOutCacheRT;
  convolutionMixMaterial;
  convolutionMixDownScale = 1;
  convolutionBuffer = 0.1;
  renderTargetsHorizontal = [];
  renderTargetsVertical = [];
  blurMaterials = [];
  saturation = 1;
  renderOrder = 10;
  directionX = new Vector2(1, 0);
  directionY = new Vector2(0, 1);
  fftSrcRT;
  init(e) {
    (Object.assign(this, e), super.init());
    let t = HalfFloatType;
    if (
      ((this.highPassRenderTarget = fboHelper.createRenderTarget(
        1,
        1,
        !this.USE_HD,
        t,
      )),
      (this.highPassMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: { value: null },
          u_luminosityThreshold: { value: 1 },
          u_smoothWidth: { value: 1 },
          u_amount: { value: 1 },
          u_haloWidth: { value: 1 },
          u_haloRGBShift: { value: 1 },
          u_haloStrength: { value: 1 },
          u_haloMaskInner: { value: 1 },
          u_haloMaskOuter: { value: 1 },
          u_texelSize: null,
          u_aspect: { value: new Vector2() },
          u_dirtTexture: { value: null },
          u_dirtAspect: { value: new Vector2() },
        },
        fragmentShader: highPassFrag,
      })),
      (this.highPassMaterial.defines.USE_LENS_DIRT = this.USE_LENS_DIRT),
      this.USE_CONVOLUTION)
    )
      ((this.highPassMaterial.defines.USE_CONVOLUTION = !0),
        (this.highPassMaterial.uniforms.u_convolutionBuffer = { value: 0.15 }),
        (this.fftSrcRT = fboHelper.createRenderTarget(1, 1, !0, t)),
        (this.fftCacheRT1 = fboHelper.createRenderTarget(1, 1, !0, t)),
        (this.fftCacheRT2 = this.fftCacheRT1.clone()),
        (this.fftBloomOutCacheRT = fboHelper.createRenderTarget(1, 1)),
        (this.srcMaterial = fboHelper.createRawShaderMaterial({
          uniforms: { u_aspect: { value: new Vector2() } },
          fragmentShader: this.convolutionSrcFrag,
        })),
        (this.fftHMaterial = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_texelSize: { value: new Vector2() },
            u_subtransformSize: { value: 0 },
            u_normalization: { value: 0 },
            u_isForward: { value: 0 },
          },
          fragmentShader: fftFrag,
        })),
        (this.fftHMaterial.defines.HORIZTONAL = !0),
        (this.fftVMaterial = fboHelper.createRawShaderMaterial({
          uniforms: this.fftHMaterial.uniforms,
          fragmentShader: fftFrag,
        })),
        (this.convolutionMixMaterial = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_kernelTexture: { value: this.fftSrcRT.texture },
          },
          fragmentShader: convolutionMixFrag,
        })),
        (this.fftBloomOutCacheMaterial = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_amount: { value: 0 },
            u_saturation: { value: 0 },
          },
          fragmentShader: convolutionCacheFrag,
        })),
        (this.material = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_bloomTexture: { value: this.fftBloomOutCacheRT.texture },
            u_convolutionBuffer:
              this.highPassMaterial.uniforms.u_convolutionBuffer,
          },
          fragmentShader: convolutionFrag,
          blending: NoBlending,
        })));
    else {
      for (let r = 0; r < this.ITERATION; r++) {
        (this.renderTargetsHorizontal.push(
          fboHelper.createRenderTarget(1, 1, !1, t),
        ),
          this.renderTargetsVertical.push(
            fboHelper.createRenderTarget(1, 1, !1, t),
          ));
        const n = 3 + r * 2;
        this.blurMaterials[r] = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_resolution: { value: new Vector2() },
            u_direction: { value: null },
          },
          fragmentShader: blurFrag,
          defines: { KERNEL_RADIUS: n, SIGMA: n },
        });
      }
      this.material = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: { value: null },
          u_bloomStrength: { value: 1 },
          u_bloomWeights: { value: [] },
          u_saturation: { value: 0 },
        },
        fragmentShader: frag$2,
        blending: NoBlending,
        defines: { ITERATION: this.ITERATION },
      });
      for (let r = 0; r < this.ITERATION; r++)
        this.material.uniforms["u_blurTexture" + r] = {
          value: this.renderTargetsVertical[r].texture,
        };
    }
  }
  setDirtTexture(e) {
    this.highPassMaterial.uniforms.u_dirtTexture.value = e;
  }
  setPostprocessing(e) {
    const t = e.width,
      r = e.height;
    if (this.USE_CONVOLUTION) {
      let n = math.powerTwoCeiling(t / 2) >> this.convolutionMixDownScale,
        a = math.powerTwoCeiling(r / 2) >> this.convolutionMixDownScale;
      if (
        (this.highPassRenderTarget.setSize(n, a),
        n !== this.fftCacheRT1.width || a !== this.fftCacheRT1.height)
      ) {
        (this.fftSrcRT.setSize(n, a),
          this.fftCacheRT1.setSize(n, a),
          this.fftCacheRT2.setSize(n, a),
          this.fftBloomOutCacheRT.setSize(n, a));
        let l = r / Math.max(t, r);
        (this.srcMaterial.uniforms.u_aspect.value.set((t / r) * l, l),
          fboHelper.render(this.srcMaterial, this.fftCacheRT1),
          this.renderFFT(this.fftCacheRT1, this.fftSrcRT, !0));
      }
    } else {
      let n = Math.ceil(t / 2),
        a = Math.ceil(r / 2);
      (this.highPassRenderTarget.setSize(n, a), super.setPostprocessing(e));
      for (let l = 0; l < this.ITERATION; l++)
        (this.renderTargetsHorizontal[l].setSize(n, a),
          this.renderTargetsVertical[l].setSize(n, a),
          this.blurMaterials[l].uniforms.u_resolution.value.set(n, a),
          (n = Math.ceil(n / 2)),
          (a = Math.ceil(a / 2)));
    }
  }
  dispose() {
    if (!this.USE_CONVOLUTION) {
      this.highPassRenderTarget && this.highPassRenderTarget.dispose();
      for (let e = 0; e < this.ITERATION; e++)
        (this.renderTargetsHorizontal[e] &&
          this.renderTargetsHorizontal[e].dispose(),
          this.renderTargetsVertical[e] &&
            this.renderTargetsVertical[e].dispose());
    }
  }
  needsRender() {
    return !!this.amount;
  }
  renderFFT(e, t, r) {
    let n = e.width,
      a = e.height,
      l = Math.round(Math.log(n) / Math.log(2)),
      c = Math.round(Math.log(a) / Math.log(2)),
      u = l + c,
      f = u % 2 === 0;
    this.fftHMaterial;
    let p = this.fftHMaterial.uniforms;
    for (let g = 0; g < u; g++) {
      let v = g < l;
      ((p.u_texture.value = e.texture),
        (p.u_normalization.value = g === 0 ? 1 / Math.sqrt(n * a) : 1),
        (p.u_isForward.value = !!r),
        p.u_texelSize.value.set(1 / n, 1 / a),
        (p.u_subtransformSize.value = Math.pow(2, (v ? g : g - l) + 1)),
        fboHelper.render(v ? this.fftHMaterial : this.fftVMaterial, t));
      let _ = e;
      ((e = t), (t = _));
    }
    f && fboHelper.copy(e.texture, t);
  }
  render(e, t = !1) {
    let r = properties.postprocessing.width,
      n = properties.postprocessing.height;
    ((this.highPassMaterial.uniforms.u_texture.value = e.fromTexture),
      (this.highPassMaterial.uniforms.u_luminosityThreshold.value =
        this.threshold),
      (this.highPassMaterial.uniforms.u_smoothWidth.value = this.smoothWidth),
      (this.highPassMaterial.uniforms.u_amount.value = this.highPassMultiplier),
      (this.highPassMaterial.uniforms.u_haloWidth.value = this.haloWidth),
      (this.highPassMaterial.uniforms.u_haloRGBShift.value =
        this.haloRGBShift * r),
      (this.highPassMaterial.uniforms.u_haloStrength.value = this.haloStrength),
      (this.highPassMaterial.uniforms.u_haloMaskInner.value =
        this.haloMaskInner),
      (this.highPassMaterial.uniforms.u_haloMaskOuter.value =
        this.haloMaskOuter),
      (this.highPassMaterial.uniforms.u_texelSize =
        e.sharedUniforms.u_texelSize),
      (this.highPassMaterial.uniforms.u_aspect = e.sharedUniforms.u_aspect));
    let a = this.haloStrength > 0,
      l = (n / Math.sqrt(r * r + n * n)) * 2;
    if (
      (this.highPassMaterial.uniforms.u_aspect.value.set((r / n) * l, l),
      (l = n / Math.max(r, n)),
      this.highPassMaterial.uniforms.u_dirtAspect.value.set((r / n) * l, l),
      this.highPassMaterial.defines.USE_HALO !== a &&
        ((this.highPassMaterial.defines.USE_HALO = a),
        (this.highPassMaterial.needsUpdate = !0)),
      this.USE_CONVOLUTION &&
        (this.highPassMaterial.uniforms.u_convolutionBuffer.value =
          this.convolutionBuffer),
      e.renderMaterial(this.highPassMaterial, this.highPassRenderTarget),
      this.USE_CONVOLUTION)
    ) {
      (fboHelper.copy(this.highPassRenderTarget.texture, this.fftCacheRT1),
        this.renderFFT(this.fftCacheRT1, this.fftCacheRT2, !0),
        (this.convolutionMixMaterial.uniforms.u_texture.value =
          this.fftCacheRT2.texture),
        fboHelper.render(this.convolutionMixMaterial, this.fftCacheRT1),
        this.renderFFT(this.fftCacheRT1, this.fftCacheRT2, !1));
      let c = this.amount * 1024;
      ((c =
        (c /
          Math.pow(
            math.powerTwoCeilingBase(
              this.fftCacheRT1.width * this.fftCacheRT1.height,
            ),
            4,
          )) *
        0.85),
        (this.fftBloomOutCacheMaterial.uniforms.u_amount.value = c),
        (this.fftBloomOutCacheMaterial.uniforms.u_saturation.value =
          this.saturation),
        (this.fftBloomOutCacheMaterial.uniforms.u_texture.value =
          this.fftCacheRT2.texture),
        e.renderMaterial(
          this.fftBloomOutCacheMaterial,
          this.fftBloomOutCacheRT,
        ),
        super.render(e, t));
    } else {
      let c = this.highPassRenderTarget;
      for (let u = 0; u < this.ITERATION; u++) {
        const f = this.blurMaterials[u];
        ((f.uniforms.u_texture.value = c.texture),
          (f.uniforms.u_direction.value = this.directionX),
          e.renderMaterial(f, this.renderTargetsHorizontal[u]),
          (f.uniforms.u_texture.value =
            this.renderTargetsHorizontal[u].texture),
          (f.uniforms.u_direction.value = this.directionY),
          e.renderMaterial(f, this.renderTargetsVertical[u]),
          (c = this.renderTargetsVertical[u]));
      }
      ((this.material.uniforms.u_texture.value = e.fromTexture),
        (this.material.uniforms.u_saturation.value = math.mix(
          1,
          this.saturation,
          0.5,
        )));
      for (let u = 0; u < this.ITERATION; u++) {
        const f = (this.ITERATION - u) / this.ITERATION;
        this.material.uniforms.u_bloomWeights.value[u] =
          (this.amount * (f + (1.2 - f * 2) * this.radius)) /
          Math.pow(2, this.ITERATION - u - 1);
      }
      super.render(e, t);
    }
  }
}

globalThis.Bloom = Bloom;
export { Bloom };
export default Bloom;
