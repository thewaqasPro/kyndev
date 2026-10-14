/**
 * Cursor Fluid Screen Paint Buffer & Dissipation FBO
 */
import * as THREE from "../three.js";
const vert$k = `#define GLSLIFY 1
uniform vec2 u_clipScale;uniform vec2 u_clipOffset;varying vec2 v_uv;void main(){vec3 pos=position;vec3 absPos=abs(position);if(max(absPos.x,absPos.y)<0.9){pos.xy=pos.xy*u_clipScale+u_clipOffset;pos*=2.;}gl_Position=vec4(pos,1.0);v_uv=vec2(pos.x,pos.y)*0.5+0.5;}`,
  frag$o = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform vec3 u_colorPaint;uniform float u_aspect;uniform vec2 u_smooth;uniform vec2 u_resolution;uniform float u_activeRatio;uniform sampler2D u_screenPaintTexture;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec2 q=vec2(v_uv-0.5);q.x*=u_aspect;float dst=length(q);dst=smoothstep(u_smooth.x,u_smooth.y,dst);vec3 color=mix(u_color0,u_color1,0.925+0.075*dst);color+=noise*0.004;gl_FragColor.rgb=color;gl_FragColor.a=0.0;}`,
  frag$n = `#define GLSLIFY 1
uniform sampler2D u_lowPaintTexture;uniform sampler2D u_prevPaintTexture;uniform vec2 u_paintTexelSize;uniform vec2 u_scrollOffset;uniform vec4 u_drawFrom;uniform vec4 u_drawTo;uniform float u_pushStrength;uniform vec3 u_dissipations;uniform vec2 u_vel;varying vec2 v_uv;vec2 sdSegment(in vec2 p,in vec2 a,in vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return vec2(length(pa-ba*h),h);}
#ifdef USE_NOISE
uniform float u_curlScale;uniform float u_curlStrength;vec2 hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yzx+33.33);return fract((p3.xx+p3.yz)*p3.zy)*2.0-1.0;}vec3 noised(in vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);vec2 du=30.0*f*f*(f*(f-2.0)+1.0);vec2 ga=hash(i+vec2(0.0,0.0));vec2 gb=hash(i+vec2(1.0,0.0));vec2 gc=hash(i+vec2(0.0,1.0));vec2 gd=hash(i+vec2(1.0,1.0));float va=dot(ga,f-vec2(0.0,0.0));float vb=dot(gb,f-vec2(1.0,0.0));float vc=dot(gc,f-vec2(0.0,1.0));float vd=dot(gd,f-vec2(1.0,1.0));return vec3(va+u.x*(vb-va)+u.y*(vc-va)+u.x*u.y*(va-vb-vc+vd),ga+u.x*(gb-ga)+u.y*(gc-ga)+u.x*u.y*(ga-gb-gc+gd)+du*(u.yx*(va-vb-vc+vd)+vec2(vb,vc)-va));}
#endif
void main(){vec2 res=sdSegment(gl_FragCoord.xy,u_drawFrom.xy,u_drawTo.xy);vec2 radiusWeight=mix(u_drawFrom.zw,u_drawTo.zw,res.y);float d=1.0-smoothstep(-0.01,radiusWeight.x,res.x);vec4 lowData=texture2D(u_lowPaintTexture,v_uv-u_scrollOffset);vec2 velInv=(0.5-lowData.xy)*u_pushStrength;
#ifdef USE_NOISE
vec3 noise3=noised(gl_FragCoord.xy*u_curlScale*(1.0-lowData.xy));vec2 noise=noised(gl_FragCoord.xy*u_curlScale*(2.0-lowData.xy*(0.5+noise3.x)+noise3.yz*0.1)).yz;velInv+=noise*(lowData.z+lowData.w)*u_curlStrength;
#endif
vec4 data=texture2D(u_prevPaintTexture,v_uv-u_scrollOffset+velInv*u_paintTexelSize);data.xy-=0.5;vec4 delta=(u_dissipations.xxyz-1.0)*data;vec2 newVel=u_vel*d;delta+=vec4(newVel,radiusWeight.yy*d);delta.zw=sign(delta.zw)*max(vec2(0.004),abs(delta.zw));data+=delta;data.xy+=0.5;gl_FragColor=clamp(data,vec4(0.0),vec4(1.0));}`;
let _v$4 = new Vector2();

class ScreenPaint {
  _lowRenderTarget;
  _lowBlurRenderTarget;
  _prevPaintRenderTarget;
  _currPaintRenderTarget;
  _material;
  _material2;
  _distortionMaterial;
  _fromDrawData;
  _toDrawData;
  drawEnabled = !0;
  needsMouseDown = !1;
  enabled = !0;
  minRadius = 0;
  maxRadius = 100;
  radiusDistanceRange = 100;
  pushStrength = 25;
  accelerationDissipation = 0.8;
  velocityDissipation = 0.985;
  weight1Dissipation = 0.985;
  weight2Dissipation = 0.5;
  useNoise = !1;
  curlScale = 0.1;
  curlStrength = 5;
  _prevUseNoise = null;
  sharedUniforms = {
    u_paintTexelSize: { value: new Vector2() },
    u_paintTextureSize: { value: new Vector2() },
    u_prevPaintTexture: { value: null },
    u_currPaintTexture: { value: null },
    u_lowPaintTexture: { value: null },
  };
  init() {
    ((this._lowRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this._lowBlurRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this._prevPaintRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this._currPaintRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this.sharedUniforms.u_lowPaintTexture.value =
        this._lowRenderTarget.texture),
      (this._material = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_lowPaintTexture: { value: this._lowRenderTarget.texture },
          u_prevPaintTexture: this.sharedUniforms.u_prevPaintTexture,
          u_paintTexelSize: this.sharedUniforms.u_paintTexelSize,
          u_drawFrom: { value: (this._fromDrawData = new Vector4(0, 0, 0, 0)) },
          u_drawTo: { value: (this._toDrawData = new Vector4(0, 0, 0, 0)) },
          u_pushStrength: { value: 0 },
          u_curlScale: { value: 0 },
          u_curlStrength: { value: 0 },
          u_vel: { value: new Vector2() },
          u_dissipations: { value: new Vector3() },
          u_scrollOffset: { value: new Vector2() },
        },
        fragmentShader: frag$n,
      })));
  }
  resize(e, t) {
    let r = e >> 2,
      n = t >> 2,
      a = e >> 3,
      l = t >> 3;
    (r !== this._currPaintRenderTarget.width ||
      n !== this._currPaintRenderTarget.height) &&
      (this._currPaintRenderTarget.setSize(r, n),
      this._prevPaintRenderTarget.setSize(r, n),
      this._lowRenderTarget.setSize(a, l),
      this._lowBlurRenderTarget.setSize(a, l),
      this.sharedUniforms.u_paintTexelSize.value.set(1 / r, 1 / n),
      this.sharedUniforms.u_paintTextureSize.value.set(r, n),
      this.clear());
  }
  clear = () => {
    (fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowRenderTarget),
      fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowBlurRenderTarget),
      fboHelper.clearColor(0.5, 0.5, 0, 0, this._currPaintRenderTarget),
      this._material.uniforms.u_vel.value.set(0, 0));
  };
  update(e) {
    if (!this.enabled) return;
    this.useNoise !== this._prevUseNoise &&
      ((this._material.defines.USE_NOISE = this.useNoise),
      (this._material.needsUpdate = !0),
      (this._prevUseNoise = this.useNoise));
    let t = this._currPaintRenderTarget.width,
      r = this._currPaintRenderTarget.height,
      n = this._prevPaintRenderTarget;
    ((this._prevPaintRenderTarget = this._currPaintRenderTarget),
      (this._currPaintRenderTarget = n),
      (this.sharedUniforms.u_prevPaintTexture.value =
        this._prevPaintRenderTarget.texture),
      (this.sharedUniforms.u_currPaintTexture.value =
        this._currPaintRenderTarget.texture));
    let a = scrollManager.scrollViewDelta * properties.screenPaintOffsetRatio,
      l = scrollManager.isVertical ? 0 : a,
      c = scrollManager.isVertical ? a : 0;
    (_v$4.copy(input.mousePixelXY),
      (_v$4.x += l * properties.viewportWidth * 3),
      (_v$4.y += c * properties.viewportHeight * 3));
    let u = _v$4.distanceTo(input.prevMousePixelXY),
      f = math.fit(
        u,
        0,
        this.radiusDistanceRange,
        this.minRadius,
        this.maxRadius,
      );
    (Math.abs(scrollManager.scrollViewDelta) == 0 &&
      (!input.hadMoved ||
        !this.drawEnabled ||
        ((this.needsMouseDown || browser$1.isMobile) &&
          (!input.isDown || !input.wasDown))) &&
      (f = 0),
      (f = (f / properties.viewportHeight) * r),
      (this._material.uniforms.u_pushStrength.value = this.pushStrength),
      (this._material.uniforms.u_curlScale.value = this.curlScale),
      (this._material.uniforms.u_curlStrength.value = this.curlStrength),
      this._material.uniforms.u_dissipations.value.set(
        this.velocityDissipation,
        this.weight1Dissipation,
        this.weight2Dissipation,
      ),
      this._fromDrawData.copy(this._toDrawData),
      _v$4.copy(input.mouseXY),
      (_v$4.x += l),
      (_v$4.y += c),
      this._toDrawData.set(
        ((_v$4.x + 1) * t) / 2,
        ((_v$4.y + 1) * r) / 2,
        f,
        1,
      ),
      _v$4
        .set(
          this._toDrawData.x - this._fromDrawData.x,
          this._toDrawData.y - this._fromDrawData.y,
        )
        .multiplyScalar(e * 0.8),
      this._material.uniforms.u_vel.value
        .multiplyScalar(this.accelerationDissipation)
        .add(_v$4),
      (this._material.uniforms.u_scrollOffset.value.y = l),
      (this._material.uniforms.u_scrollOffset.value.y = c),
      fboHelper.render(this._material, this._currPaintRenderTarget),
      fboHelper.copy(
        this._currPaintRenderTarget.texture,
        this._lowRenderTarget,
      ),
      blur.blur(8, 1, this._lowRenderTarget, this._lowBlurRenderTarget));
  }
}
const screenPaint = new ScreenPaint();
globalThis.screenPaint = screenPaint;

export { ScreenPaint, screenPaint };
export default screenPaint;
