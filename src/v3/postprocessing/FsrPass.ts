import * as THREE from 'three';
import { FboHelper } from '../shared/fbo';

const fsrVert = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const rcasFrag = `
uniform sampler2D u_texture;
uniform vec2 u_outResolution;
uniform float u_sharpness;
varying vec2 v_uv;

#define FSR_RCAS_LIMIT (0.25 - (1.0 / 16.0))

vec4 FsrRcasLoadF(vec2 p) {
  return texture2D(u_texture, p / u_outResolution.xy);
}

void FsrRcasCon(out float con, float sharpness) {
  con = exp2(-sharpness);
}

vec3 FsrRcasF(vec2 ip, float con) {
  vec2 sp = vec2(ip);
  vec3 b = FsrRcasLoadF(sp + vec2( 0.0, -1.0)).rgb;
  vec3 d = FsrRcasLoadF(sp + vec2(-1.0,  0.0)).rgb;
  vec3 e = FsrRcasLoadF(sp).rgb;
  vec3 f = FsrRcasLoadF(sp + vec2( 1.0,  0.0)).rgb;
  vec3 h = FsrRcasLoadF(sp + vec2( 0.0,  1.0)).rgb;

  float bL = b.g + 0.5 * (b.b + b.r);
  float dL = d.g + 0.5 * (d.b + d.r);
  float eL = e.g + 0.5 * (e.b + e.r);
  float fL = f.g + 0.5 * (f.b + f.r);
  float hL = h.g + 0.5 * (h.b + h.r);

  float nz = 0.25 * (bL + dL + fL + hL) - eL;
  nz = clamp(abs(nz) / (max(max(bL, dL), max(eL, max(fL, hL))) - min(min(bL, dL), min(eL, min(fL, hL)))), 0.0, 1.0);
  nz = 1.0 - 0.5 * nz;

  vec3 mn4 = min(b, min(f, h));
  vec3 mx4 = max(b, max(f, h));
  vec2 peakC = vec2(1.0, -4.0);
  vec3 hitMin = mn4 / (4.0 * mx4);
  vec3 hitMax = (peakC.x - mx4) / (4.0 * mn4 + peakC.y);
  vec3 lobeRGB = max(-hitMin, hitMax);
  float lobe = max(-FSR_RCAS_LIMIT, min(max(lobeRGB.r, max(lobeRGB.g, lobeRGB.b)), 0.0)) * con;

  return (lobe * (b + d + h + f) + e) / (4.0 * lobe + 1.0);
}

void main() {
  float con;
  FsrRcasCon(con, u_sharpness);
  vec3 col = FsrRcasF(gl_FragCoord.xy, con);
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * FsrPass
 *
 * Exact 1-to-1 reverse-engineered AMD FidelityFX RCAS spatial sharpening pass from deobfuscated.js (lines 24375–24464).
 */
export class FsrPass {
  public sharpness: number = 0.8;
  public enabled: boolean = true;

  private _material: THREE.ShaderMaterial;
  private _outResolution: THREE.Vector2;

  constructor(width: number, height: number) {
    this._outResolution = new THREE.Vector2(width, height);

    this._material = new THREE.ShaderMaterial({
      vertexShader: fsrVert,
      fragmentShader: rcasFrag,
      uniforms: {
        u_texture: { value: null },
        u_outResolution: { value: this._outResolution },
        u_sharpness: { value: this.sharpness }
      },
      depthTest: false,
      depthWrite: false
    });
  }

  public resize(width: number, height: number): void {
    this._outResolution.set(width, height);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    sourceTexture: THREE.Texture,
    target: THREE.WebGLRenderTarget | null = null
  ): void {
    if (!this.enabled) return;

    this._material.uniforms.u_texture.value = sourceTexture;
    this._material.uniforms.u_sharpness.value = this.sharpness;
    FboHelper.render(renderer, this._material, target);
  }

  public destroy(): void {
    this._material.dispose();
  }
}
