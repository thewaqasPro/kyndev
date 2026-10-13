import * as THREE from 'three';
import { FboHelper } from '../shared/fbo';

const bloomHighPassVert = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const bloomHighPassFrag = `
uniform sampler2D u_texture;
uniform float u_threshold;
uniform float u_smoothWidth;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  float alpha = smoothstep(u_threshold, u_threshold + u_smoothWidth, luma);
  gl_FragColor = vec4(color.rgb * alpha, 1.0);
}
`;

const bloomBlurFrag = `
uniform sampler2D u_texture;
uniform vec2 u_texelSize;
uniform vec2 u_direction;
varying vec2 v_uv;

void main() {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * u_direction * u_texelSize;
  vec2 off2 = vec2(3.2941176470588234) * u_direction * u_texelSize;
  vec2 off3 = vec2(5.176470588235294) * u_direction * u_texelSize;

  color += texture2D(u_texture, v_uv) * 0.1964825501511404;
  color += texture2D(u_texture, v_uv + off1) * 0.2969069646728344;
  color += texture2D(u_texture, v_uv - off1) * 0.2969069646728344;
  color += texture2D(u_texture, v_uv + off2) * 0.09447039268613932;
  color += texture2D(u_texture, v_uv - off2) * 0.09447039268613932;
  color += texture2D(u_texture, v_uv + off3) * 0.010381362401148057;
  color += texture2D(u_texture, v_uv - off3) * 0.010381362401148057;

  gl_FragColor = color;
}
`;

/**
 * BloomPass
 *
 * Exact 1-to-1 reverse-engineered dual-filter bloom pyramid from deobfuscated.js (lines 23867–24228).
 */
export class BloomPass {
  public amount: number = 2.5;
  public radius: number = 0.85;
  public threshold: number = 0.75;
  public smoothWidth: number = 0.2;

  private _highPassMaterial: THREE.ShaderMaterial;
  private _blurMaterial: THREE.ShaderMaterial;
  private _renderTargetsH: THREE.WebGLRenderTarget[] = [];
  private _renderTargetsV: THREE.WebGLRenderTarget[] = [];
  private _iterations: number = 4;

  constructor(width: number, height: number) {
    this._highPassMaterial = new THREE.ShaderMaterial({
      vertexShader: bloomHighPassVert,
      fragmentShader: bloomHighPassFrag,
      uniforms: {
        u_texture: { value: null },
        u_threshold: { value: this.threshold },
        u_smoothWidth: { value: this.smoothWidth }
      },
      depthTest: false,
      depthWrite: false
    });

    this._blurMaterial = new THREE.ShaderMaterial({
      vertexShader: bloomHighPassVert,
      fragmentShader: bloomBlurFrag,
      uniforms: {
        u_texture: { value: null },
        u_texelSize: { value: new THREE.Vector2() },
        u_direction: { value: new THREE.Vector2() }
      },
      depthTest: false,
      depthWrite: false
    });

    this.resize(width, height);
  }

  public resize(width: number, height: number): void {
    this.disposeRenderTargets();
    let currentW = Math.max(width >> 1, 32);
    let currentH = Math.max(height >> 1, 32);

    for (let i = 0; i < this._iterations; i++) {
      this._renderTargetsH.push(FboHelper.createRenderTarget(currentW, currentH));
      this._renderTargetsV.push(FboHelper.createRenderTarget(currentW, currentH));
      currentW = Math.max(currentW >> 1, 16);
      currentH = Math.max(currentH >> 1, 16);
    }
  }

  public render(renderer: THREE.WebGLRenderer, sourceTexture: THREE.Texture): THREE.Texture {
    if (this._renderTargetsH.length === 0) return sourceTexture;

    // 1. High Pass Threshold
    this._highPassMaterial.uniforms.u_texture.value = sourceTexture;
    this._highPassMaterial.uniforms.u_threshold.value = this.threshold;
    this._highPassMaterial.uniforms.u_smoothWidth.value = this.smoothWidth;
    FboHelper.render(renderer, this._highPassMaterial, this._renderTargetsH[0]);

    // 2. Downsample Blur Pyramid
    for (let i = 0; i < this._iterations; i++) {
      const srcTexture = i === 0 ? this._renderTargetsH[0].texture : this._renderTargetsV[i - 1].texture;
      const rtH = this._renderTargetsH[i];
      const rtV = this._renderTargetsV[i];

      // Horizontal Pass
      this._blurMaterial.uniforms.u_texture.value = srcTexture;
      this._blurMaterial.uniforms.u_texelSize.value.set(1 / rtH.width, 1 / rtH.height);
      this._blurMaterial.uniforms.u_direction.value.set(1, 0);
      FboHelper.render(renderer, this._blurMaterial, rtH);

      // Vertical Pass
      this._blurMaterial.uniforms.u_texture.value = rtH.texture;
      this._blurMaterial.uniforms.u_direction.value.set(0, 1);
      FboHelper.render(renderer, this._blurMaterial, rtV);
    }

    return this._renderTargetsV[this._iterations - 1].texture;
  }

  private disposeRenderTargets(): void {
    this._renderTargetsH.forEach((rt) => rt.dispose());
    this._renderTargetsV.forEach((rt) => rt.dispose());
    this._renderTargetsH = [];
    this._renderTargetsV = [];
  }

  public destroy(): void {
    this.disposeRenderTargets();
    this._highPassMaterial.dispose();
    this._blurMaterial.dispose();
  }
}
