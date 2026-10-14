/**
 * Chromatic Refractive Distortion Pass from Pointer Fluid
 */
import { PostEffect } from "./PostEffect.js";
const frag$1 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_screenPaintTexture;uniform vec2 u_screenPaintTexelSize;uniform float u_amount;uniform float u_rgbShift;uniform float u_multiplier;uniform float u_colorMultiplier;uniform float u_shade;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 bnoise=getBlueNoise(gl_FragCoord.xy+vec2(17.,29.));vec4 data=texture2D(u_screenPaintTexture,v_uv);float weight=(data.z+data.w)*0.5;vec2 vel=(0.5-data.xy-0.001)*2.*weight;vec4 color=vec4(0.0);vec2 velocity=vel*u_amount/4.0*u_screenPaintTexelSize*u_multiplier;vec2 uv=v_uv+bnoise.xy*velocity;for(int i=0;i<9;i++){color+=texture2D(u_texture,uv);uv+=velocity;}color/=9.;color.rgb+=sin(vec3(vel.x+vel.y)*40.0+vec3(0.0,2.0,4.0)*u_rgbShift)*smoothstep(0.4,-0.9,weight)*u_shade*max(abs(vel.x),abs(vel.y))*u_colorMultiplier;gl_FragColor=color;}`;

class ScreenPaintDistortion extends PostEffect {
  screenPaint = null;
  amount = 20;
  rgbShift = 1;
  multiplier = 1.25;
  colorMultiplier = 1;
  shade = 1.25;
  renderOrder = 75;
  init(e) {
    if ((Object.assign(this, e), super.init(), !this.screenPaint))
      throw new Error("screenPaint is required");
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign(
        {
          u_texture: { value: null },
          u_screenPaintTexture:
            this.screenPaint.sharedUniforms.u_currPaintTexture,
          u_screenPaintTexelSize:
            this.screenPaint.sharedUniforms.u_paintTexelSize,
          u_amount: { value: 0 },
          u_rgbShift: { value: 0 },
          u_multiplier: { value: 0 },
          u_colorMultiplier: { value: 0 },
          u_shade: { value: 0 },
        },
        blueNoise.sharedUniforms,
      ),
      fragmentShader: frag$1,
    });
  }
  needsRender(e) {
    return this.amount > 0;
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
    ((this.material.uniforms.u_amount.value = this.amount),
      (this.material.uniforms.u_rgbShift.value = this.rgbShift),
      (this.material.uniforms.u_multiplier.value = this.multiplier),
      (this.material.uniforms.u_colorMultiplier.value = this.colorMultiplier),
      (this.material.uniforms.u_shade.value = this.shade),
      super.render(e, t));
  }
}
const fragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform vec3 u_bgColor;uniform float u_opacity;uniform float u_vignetteFrom;uniform float u_vignetteTo;uniform vec2 u_vignetteAspect;uniform vec3 u_vignetteColor;uniform float u_saturation;uniform float u_contrast;uniform float u_brightness;uniform vec3 u_tintColor;uniform float u_tintOpacity;uniform float u_ditherSeed;float hash13(vec3 p3){p3=fract(p3*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}vec3 screen(vec3 cb,vec3 cs){return cb+cs-(cb*cs);}vec3 colorDodge(vec3 cb,vec3 cs){return mix(min(vec3(1.0),cb/(1.0-cs)),vec3(1.0),step(vec3(1.0),cs));}void main(){vec2 uv=v_uv;vec3 color=texture2D(u_texture,uv).rgb;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color=0.5+(1.0+u_contrast)*(color-0.5);color+=u_brightness;color=mix(color,screen(colorDodge(color,u_tintColor),u_tintColor),u_tintOpacity);float d=length((uv-0.5)*u_vignetteAspect)*2.0;color=mix(color,u_vignetteColor,smoothstep(u_vignetteFrom,u_vignetteTo,d));gl_FragColor=vec4(mix(u_bgColor,color,u_opacity)+hash13(vec3(gl_FragCoord.xy,u_ditherSeed))/255.0,1.0);}`;

export { ScreenPaintDistortion };
export default ScreenPaintDistortion;

globalThis.ScreenPaintDistortion = ScreenPaintDistortion;
