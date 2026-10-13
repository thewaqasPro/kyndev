import * as THREE from 'three';

export const distortionFrag = `
uniform sampler2D u_texture;
uniform sampler2D u_screenPaintTexture;
uniform vec2 u_screenPaintTexelSize;
uniform float u_amount;
uniform float u_rgbShift;
uniform float u_multiplier;
uniform float u_colorMultiplier;
uniform float u_shade;
varying vec2 v_uv;

void main() {
  vec4 data = texture2D(u_screenPaintTexture, v_uv);
  float weight = (data.z + data.w) * 0.5;
  vec2 vel = (0.5 - data.xy - 0.001) * 2.0 * weight;
  vec4 color = vec4(0.0);
  vec2 velocity = vel * u_amount / 4.0 * u_screenPaintTexelSize * u_multiplier;
  vec2 uv = v_uv;
  
  for (int i = 0; i < 9; i++) {
    color += texture2D(u_texture, uv);
    uv += velocity;
  }
  color /= 9.0;
  
  vec3 rgbShiftColor = sin(vec3(vel.x + vel.y) * 40.0 + vec3(0.0, 2.0, 4.0) * u_rgbShift);
  color.rgb += rgbShiftColor * smoothstep(0.4, -0.9, weight) * u_shade * max(abs(vel.x), abs(vel.y)) * u_colorMultiplier;
  gl_FragColor = color;
}
`;

export const distortionVert = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

/**
 * ScreenDistortionPass
 *
 * Exact 1-to-1 reverse-engineered ScreenPaintDistortion postpass from deobfuscated.js (lines 24220–24291).
 */
export class ScreenDistortionPass {
  public material: THREE.ShaderMaterial;
  public quad: THREE.Mesh;
  public camera: THREE.OrthographicCamera;
  public scene: THREE.Scene;

  public amount: number = 20;
  public rgbShift: number = 1.0;
  public multiplier: number = 1.25;
  public colorMultiplier: number = 1.0;
  public shade: number = 1.25;

  constructor() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();

    this.material = new THREE.ShaderMaterial({
      vertexShader: distortionVert,
      fragmentShader: distortionFrag,
      uniforms: {
        u_texture: { value: null },
        u_screenPaintTexture: { value: null },
        u_screenPaintTexelSize: { value: new THREE.Vector2(1 / window.innerWidth, 1 / window.innerHeight) },
        u_amount: { value: this.amount },
        u_rgbShift: { value: this.rgbShift },
        u_multiplier: { value: this.multiplier },
        u_colorMultiplier: { value: this.colorMultiplier },
        u_shade: { value: this.shade }
      },
      depthTest: false,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    this.quad = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.quad);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    sourceTexture: THREE.Texture,
    paintTexture: THREE.Texture,
    target: THREE.WebGLRenderTarget | null = null
  ): void {
    this.material.uniforms.u_texture.value = sourceTexture;
    this.material.uniforms.u_screenPaintTexture.value = paintTexture;
    this.material.uniforms.u_amount.value = this.amount;
    this.material.uniforms.u_rgbShift.value = this.rgbShift;
    this.material.uniforms.u_multiplier.value = this.multiplier;

    renderer.setRenderTarget(target);
    renderer.render(this.scene, this.camera);
  }

  public resize(width: number, height: number): void {
    this.material.uniforms.u_screenPaintTexelSize.value.set(1 / width, 1 / height);
  }

  public destroy(): void {
    this.quad.geometry.dispose();
    this.material.dispose();
  }
}
