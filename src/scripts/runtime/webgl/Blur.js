/**
 * Dual-pass Gaussian Blur
 */
import * as THREE from "../three.js";
const blur9VaryingVertexShader = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_delta;varying vec2 v_uv[9];void main(){vec2 uv=position.xy*0.5+0.5;v_uv[0]=uv;vec2 delta=u_delta;v_uv[1]=uv-delta;v_uv[2]=uv+delta;delta+=u_delta;v_uv[3]=uv-delta;v_uv[4]=uv+delta;delta+=u_delta;v_uv[5]=uv-delta;v_uv[6]=uv+delta;delta+=u_delta;v_uv[7]=uv-delta;v_uv[8]=uv+delta;gl_Position=vec4(position,1.0);}`,
  blur9VaryingFragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv[9];void main(){vec4 color=texture2D(u_texture,v_uv[0])*0.1633;color+=texture2D(u_texture,v_uv[1])*0.1531;color+=texture2D(u_texture,v_uv[2])*0.1531;color+=texture2D(u_texture,v_uv[3])*0.12245;color+=texture2D(u_texture,v_uv[4])*0.12245;color+=texture2D(u_texture,v_uv[5])*0.0918;color+=texture2D(u_texture,v_uv[6])*0.0918;color+=texture2D(u_texture,v_uv[7])*0.051;color+=texture2D(u_texture,v_uv[8])*0.051;gl_FragColor=color;}`,
  blur9FragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_delta;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv)*0.1633;vec2 delta=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.1531;color+=texture2D(u_texture,v_uv+delta)*0.1531;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.12245;color+=texture2D(u_texture,v_uv+delta)*0.12245;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.0918;color+=texture2D(u_texture,v_uv+delta)*0.0918;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.051;color+=texture2D(u_texture,v_uv+delta)*0.051;gl_FragColor=color;}`;

class Blur {
  material = null;
  getBlur9Material() {
    let e = fboHelper.MAX_VARYING_VECTORS > 8;
    return (
      this.blur9Material ||
        (this.blur9Material = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: { value: null },
            u_delta: { value: new Vector2() },
          },
          vertexShader: e
            ? fboHelper.precisionPrefix + blur9VaryingVertexShader
            : fboHelper.vertexShader,
          fragmentShader:
            fboHelper.precisionPrefix +
            (e ? blur9VaryingFragmentShader : blur9FragmentShader),
          depthWrite: !1,
          depthTest: !1,
        })),
      this.blur9Material
    );
  }
  blur(e, t, r, n, a, l) {
    let c = 0.25,
      u = Math.ceil(r.width * t) || 0,
      f = Math.ceil(r.height * t) || 0;
    (this.material || (this.material = this.getBlur9Material()),
      n || console.warn("You have to pass intermediateRenderTarget to blur"),
      (u !== n.width || f !== n.height) && n.setSize(u, f),
      a ? l || a.setSize(r.width, r.height) : (a = r),
      (this.material.uniforms.u_texture.value = r.texture || r),
      this.material.uniforms.u_delta.value.set((e / u) * c, 0),
      fboHelper.render(this.material, n),
      (this.material.uniforms.u_texture.value = n.texture || n),
      this.material.uniforms.u_delta.value.set(0, (e / f) * c),
      fboHelper.render(this.material, a));
  }
}
const blur = new Blur();
globalThis.blur = blur;

export { Blur, blur };
export default blur;
