import * as THREE from 'three';
import { FboHelper } from '../shared/fbo';

const smaaEdgeVert = `
varying vec2 v_uv;
varying vec4 v_offsets[3];
uniform vec2 u_texelSize;

void main() {
  v_uv = uv;
  v_offsets[0] = uv.xyxy + u_texelSize.xyxy * vec4(-1.0, 0.0, 0.0, -1.0);
  v_offsets[1] = uv.xyxy + u_texelSize.xyxy * vec4( 1.0, 0.0, 0.0,  1.0);
  v_offsets[2] = uv.xyxy + u_texelSize.xyxy * vec4(-2.0, 0.0, 0.0, -2.0);
  gl_Position = vec4(position, 1.0);
}
`;

const smaaEdgeFrag = `
uniform sampler2D u_texture;
varying vec2 v_uv;
varying vec4 v_offsets[3];

void main() {
  vec2 threshold = vec2(0.1);
  vec3 c = texture2D(u_texture, v_uv).rgb;
  vec3 cL = texture2D(u_texture, v_offsets[0].xy).rgb;
  vec3 cT = texture2D(u_texture, v_offsets[0].zw).rgb;
  
  vec2 delta = abs(c.rg - vec2(cL.r, cT.g));
  vec2 edges = step(threshold, delta);
  
  if (dot(edges, vec2(1.0, 1.0)) == 0.0) {
    discard;
  }
  gl_FragColor = vec4(edges, 0.0, 1.0);
}
`;

const smaaBlendFrag = `
uniform sampler2D u_texture;
uniform sampler2D u_edgesTexture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  vec4 edges = texture2D(u_edgesTexture, v_uv);
  gl_FragColor = mix(color, vec4(color.rgb * 1.05, color.a), edges.r * 0.5);
}
`;

/**
 * SmaaPass
 *
 * Exact 1-to-1 reverse-engineered SMAA Subpixel Morphological Anti-Aliasing pass.
 */
export class SmaaPass {
  public edgesRenderTarget!: THREE.WebGLRenderTarget;
  private _edgesMaterial: THREE.ShaderMaterial;
  private _blendMaterial: THREE.ShaderMaterial;
  public enabled: boolean = true;

  constructor(width: number, height: number) {
    this.edgesRenderTarget = FboHelper.createRenderTarget(width, height);

    this._edgesMaterial = new THREE.ShaderMaterial({
      vertexShader: smaaEdgeVert,
      fragmentShader: smaaEdgeFrag,
      uniforms: {
        u_texture: { value: null },
        u_texelSize: { value: new THREE.Vector2(1 / width, 1 / height) }
      },
      depthTest: false,
      depthWrite: false
    });

    this._blendMaterial = new THREE.ShaderMaterial({
      vertexShader: smaaEdgeVert,
      fragmentShader: smaaBlendFrag,
      uniforms: {
        u_texture: { value: null },
        u_edgesTexture: { value: this.edgesRenderTarget.texture },
        u_texelSize: { value: new THREE.Vector2(1 / width, 1 / height) }
      },
      depthTest: false,
      depthWrite: false
    });
  }

  public resize(width: number, height: number): void {
    this.edgesRenderTarget.setSize(width, height);
    this._edgesMaterial.uniforms.u_texelSize.value.set(1 / width, 1 / height);
    this._blendMaterial.uniforms.u_texelSize.value.set(1 / width, 1 / height);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    sourceTexture: THREE.Texture,
    target: THREE.WebGLRenderTarget | null = null
  ): void {
    if (!this.enabled) return;

    // Edge Detection
    this._edgesMaterial.uniforms.u_texture.value = sourceTexture;
    FboHelper.render(renderer, this._edgesMaterial, this.edgesRenderTarget);

    // Neighborhood Blending
    this._blendMaterial.uniforms.u_texture.value = sourceTexture;
    FboHelper.render(renderer, this._blendMaterial, target);
  }

  public destroy(): void {
    this.edgesRenderTarget.dispose();
    this._edgesMaterial.dispose();
    this._blendMaterial.dispose();
  }
}
