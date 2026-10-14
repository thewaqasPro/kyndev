/**
 * Shader Chunk & Uniform Compilation Helper
 */
class ShaderHelper {
  glslifyStrip(e) {
    return e.replace(/#define\sGLSLIFY\s./, "");
  }
  addChunk(e, t) {
    ShaderChunk[e] = this.glslifyStrip(t);
  }
  _wrapInclude(e) {
    return "#include <" + e + ">";
  }
  insertBefore(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(
      t,
      this.glslifyStrip(r) +
        `
` +
        a,
    );
  }
  insertAfter(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(
      a,
      a +
        `
` +
        this.glslifyStrip(r) +
        `
`,
    );
  }
  replace(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(
      a,
      `
` +
        this.glslifyStrip(r) +
        `
`,
    );
  }
}
const shaderHelper = new ShaderHelper();
globalThis.shaderHelper = shaderHelper;
const
  getBlueNoiseShader = `#define GLSLIFY 1
uniform sampler2D u_blueNoiseTexture;uniform vec2 u_blueNoiseTexelSize;uniform vec2 u_blueNoiseCoordOffset;vec3 getBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize+u_blueNoiseCoordOffset).rgb;}vec3 getStaticBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize).rgb;}`;

export { ShaderHelper, shaderHelper };
export default shaderHelper;

globalThis.getBlueNoiseShader = getBlueNoiseShader;


const glOffsetShader = `#define GLSLIFY 1
uniform vec2 u_glPositionOffset;vec4 glPositionOffset(vec4 glPosition){return glPosition+vec4(u_glPositionOffset*glPosition.w,0.0,0.0);}`;
class GlPositionOffset {
  offset = new Vector2();
  sharedUniforms = { u_glPositionOffset: { value: null } };
  init() {
    ((this.sharedUniforms.u_glPositionOffset.value = this.offset),
      shaderHelper.addChunk("glPositionOffset", glOffsetShader));
  }
  setOffset(e, t) {
    return this.offset.set(e, t);
  }
}
const glPositionOffset = new GlPositionOffset();
globalThis.glPositionOffset = glPositionOffset;
