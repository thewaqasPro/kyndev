const channelMixerFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_channelMixerR;uniform vec4 u_channelMixerG;uniform vec4 u_channelMixerB;uniform vec4 u_channelMixerA;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv);gl_FragColor=vec4(dot(color,u_channelMixerR),dot(color,u_channelMixerG),dot(color,u_channelMixerB),dot(color,u_channelMixerA));}`;
globalThis.channelMixerFrag = channelMixerFrag;

/**
 * Procedural Dynamic Textures & Noise Gradients
 */
import * as THREE from "../three.js";
class TextureHelper {
  blackTexture;
  whiteTexture;
  transparentTexture;
  channelMixerMaterial;
  init() {
    ((this.blackTexture = this._createPixelTexture([0, 0, 0, 255])),
      (this.whiteTexture = this._createPixelTexture([255, 255, 255, 255])),
      (this.transparentTexture = this._createPixelTexture([0, 0, 0, 0])));
  }
  _createPixelTexture(e) {
    return fboHelper.createDataTexture(new Uint8Array(e), 1, 1, !1, !0);
  }
  mixChannels(e, t, r = -1, n = -1, a = -1, l = -1) {
    (this.channelMixerMaterial ||
      (this.channelMixerMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: { value: null },
          u_channelMixerR: { value: new Vector4() },
          u_channelMixerG: { value: new Vector4() },
          u_channelMixerB: { value: new Vector4() },
          u_channelMixerA: { value: new Vector4() },
        },
        vertexShader: fboHelper.vertexShader,
        fragmentShader: fboHelper.precisionPrefix + channelMixerFrag,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendDst: OneFactor,
        blendSrc: OneFactor,
        blendEquationAlpha: AddEquation,
        blendDstAlpha: OneFactor,
        blendSrcAlpha: OneFactor,
      })),
      (this.channelMixerMaterial.uniforms.u_texture.value = e),
      this.channelMixerMaterial.uniforms.u_channelMixerR.value
        .set(+(r % 4 == 0), +(r % 4 == 1), +(r % 4 == 2), +(r % 4 == 3))
        .multiplyScalar(r < 0 ? 0 : 1),
      this.channelMixerMaterial.uniforms.u_channelMixerG.value
        .set(+(n % 4 == 0), +(n % 4 == 1), +(n % 4 == 2), +(n % 4 == 3))
        .multiplyScalar(n < 0 ? 0 : 1),
      this.channelMixerMaterial.uniforms.u_channelMixerB.value
        .set(+(a % 4 == 0), +(a % 4 == 1), +(a % 4 == 2), +(a % 4 == 3))
        .multiplyScalar(a < 0 ? 0 : 1),
      this.channelMixerMaterial.uniforms.u_channelMixerA.value
        .set(+(l % 4 == 0), +(l % 4 == 1), +(l % 4 == 2), +(l % 4 == 3))
        .multiplyScalar(l < 0 ? 0 : 1));
    let c = fboHelper.getColorState();
    ((fboHelper.renderer.autoClear = !1),
      fboHelper.render(this.channelMixerMaterial, t),
      fboHelper.setColorState(c));
  }
}
const textureHelper = new TextureHelper();
globalThis.textureHelper = textureHelper;

export { TextureHelper, textureHelper };
export default textureHelper;
