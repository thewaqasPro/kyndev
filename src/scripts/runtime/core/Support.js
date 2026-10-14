/**
 * WebGL feature support detector
 */
import settings from "./Settings.js";
class Support {
  isSupported() {
    return (
      (properties._isSupportedDevice = !0),
      (properties._isSupportedBrowser =
        (browser$1.isChrome ||
          browser$1.isSafari ||
          browser$1.isEdge ||
          browser$1.isFirefox ||
          browser$1.isOpera) &&
        !browser$1.isIE),
      (properties._isSupportedWebGL = this.checkSupportWebGL()),
      properties._isSupportedWebGL
    );
  }
  checkSupportWebGL() {
    if (!(properties.canvas instanceof HTMLCanvasElement)) return !1;
    if (settings.USE_WEBGL2 && window.WebGL2RenderingContext)
      try {
        return (
          (properties.gl = properties.canvas.getContext(
            "webgl2",
            properties.webglOpts,
          )),
          (settings.RENDER_TARGET_FLOAT_TYPE = HalfFloatType),
          (settings.DATA_FLOAT_TYPE = FloatType),
          !0
        );
      } catch (e) {
        return (console.error(e), !1);
      }
    if (((settings.USE_WEBGL2 = !1), window.WebGLRenderingContext))
      try {
        let e = (properties.gl =
          properties.canvas.getContext("webgl", properties.webglOpts) ||
          properties.canvas.getContext(
            "experimental-webgl",
            properties.webglOpts,
          ));
        if (
          (e.getExtension("OES_texture_float") ||
            e.getExtension("OES_texture_half_float")) &&
          e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
        )
          ((settings.RENDER_TARGET_FLOAT_TYPE =
            browser$1.isIOS || e.getExtension("OES_texture_half_float")
              ? HalfFloatType
              : FloatType),
            (settings.DATA_FLOAT_TYPE = FloatType));
        else
          return (
            (settings.USE_FLOAT_PACKING = !0),
            (settings.RENDER_TARGET_FLOAT_TYPE = settings.DATA_FLOAT_TYPE =
              UnsignedByteType),
            !1
          );
        return !0;
      } catch (e) {
        return (console.error(e), !1);
      }
    return !1;
  }
}
const support = new Support();
globalThis.support = support;
const textureBicubicShader = `#define GLSLIFY 1
vec4 cubic(float v){vec4 n=vec4(1.0,2.0,3.0,4.0)-v;vec4 s=n*n*n;float x=s.x;float y=s.y-4.0*s.x;float z=s.z-4.0*s.y+6.0*s.x;float w=6.0-x-y-z;return vec4(x,y,z,w);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,offset.xz);vec4 sample1=texture2D(t,offset.yz);vec4 sample2=texture2D(t,offset.xw);vec4 sample3=texture2D(t,offset.yw);float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize,vec4 clampRect){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,clamp(offset.xz,clampRect.xy,clampRect.zw));vec4 sample1=texture2D(t,clamp(offset.yz,clampRect.xy,clampRect.zw));vec4 sample2=texture2D(t,clamp(offset.xw,clampRect.xy,clampRect.zw));vec4 sample3=texture2D(t,clamp(offset.yw,clampRect.xy,clampRect.zw));float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}`;

export { Support, support };
export default support;

globalThis.textureBicubicShader = textureBicubicShader;
