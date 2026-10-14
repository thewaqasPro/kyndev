/**
 * 3D Contact Scene: Interactive Liquid Chrome Orb with Vertex Ripple Physics
 */
import * as THREE from "../../three.js";
const {
  Scene,
  Object3D,
  Vector3,
  Color,
  Mesh,
  SphereGeometry,
  ShaderMaterial,
  DoubleSide
} = THREE;

import { Stage3D, visuals } from "../../webgl/Stage3D.js";
import properties from "../../core/Properties.js";

const mercuryVertexShader = /* glsl */ `
uniform float u_time;
uniform float u_rippleStrength;
varying vec3 v_normal;
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;

// 3D Simplex-style organic displacement
vec3 getDisplacement(vec3 p) {
  float wave1 = sin(p.x * 2.5 + u_time * 2.0) * cos(p.y * 2.5 + u_time * 1.5);
  float wave2 = sin(p.z * 3.0 + u_time * 2.5) * 0.5;
  float ripple = sin(length(p) * 6.0 - u_time * 5.0) * u_rippleStrength;
  return normalize(p) * (wave1 * 0.12 + wave2 * 0.08 + ripple * 0.25);
}

void main() {
  vec3 displacedPosition = position + getDisplacement(position);
  vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
  v_viewPosition = -mvPosition.xyz;
  v_normal = normalize(normalMatrix * normal);
  v_worldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const mercuryFragmentShader = /* glsl */ `
uniform float u_time;
uniform vec3 u_tintColor;
varying vec3 v_normal;
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;

void main() {
  vec3 viewDir = normalize(v_viewPosition);
  vec3 normal = normalize(v_normal);
  
  // Metallic reflection approximation with multi-band specular highlights
  vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
  vec3 halfVector = normalize(lightDir + viewDir);
  float spec = pow(max(0.0, dot(normal, halfVector)), 64.0);
  
  float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.5);
  
  // High-contrast chrome gradient
  vec3 chrome = mix(vec3(0.05, 0.07, 0.12), vec3(0.9, 0.95, 1.0), fresnel);
  chrome += spec * vec3(1.0, 1.0, 1.0) * 1.5;
  chrome += u_tintColor * fresnel * 0.4;
  
  gl_FragColor = vec4(chrome, 0.95);
}
`;

class ContactStage extends Stage3D {
  orbMesh = null;
  orbGroup = new Object3D();

  mouseTarget = { x: 0, y: 0 };
  mouseCurrent = { x: 0, y: 0 };
  targetRipple = 0;
  currentRipple = 0;
  time = 0;

  constructor() {
    super({
      defaultCameraPosition: new Vector3(0, 0, 14),
      defaultLookAtPosition: new Vector3(0, 0, 0),
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 14),
        defaultLookAtPosition: new Vector3(0, 0, 0),
        useFinal: true,
      },
    });
  }

  syncProperties(e) {
    if (this.properties?.defaultCameraPosition) {
      this.properties.defaultCameraPosition.set(0, 0, 14);
      this.properties.defaultLookAtPosition.set(0, 0, 0);
    }
  }

  preInit() {
    if (this.orbGroup.children.length > 0) return;
    const geo = new SphereGeometry(2.8, 64, 64);
    const mat = new ShaderMaterial({
      vertexShader: mercuryVertexShader,
      fragmentShader: mercuryFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_rippleStrength: { value: 0 },
        u_tintColor: { value: new Color("#1a2ffb") },
      },
      side: DoubleSide,
    });

    this.orbMesh = new Mesh(geo, mat);
    this.orbGroup.add(this.orbMesh);
    this.add(this.orbGroup);

    // Position on right-hand side of contact form
    this.orbGroup.position.set(3.8, 0, 0);
  }

  init() {
    window.addEventListener("pointermove", this._onPointerMove.bind(this), { passive: true });
    
    // Trigger fluid ripples on form interactions
    document.addEventListener("focusin", (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
        this.triggerRipple(1.0);
      }
    });

    document.addEventListener("click", () => {
      this.triggerRipple(0.6);
    });
  }

  triggerRipple(strength = 1.0) {
    this.targetRipple = strength;
  }

  _onPointerMove(e) {
    this.mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  resize(w, h) {
    if (w < 812) {
      this.orbGroup.position.set(0, 2.5, -4);
      this.orbGroup.scale.setScalar(0.7);
    } else {
      this.orbGroup.position.set(3.8, 0, 0);
      this.orbGroup.scale.setScalar(1);
    }
  }

  update(delta = 0.016) {
    this.time += delta;

    // Smooth inertia
    this.mouseCurrent.x += (this.mouseTarget.x - this.mouseCurrent.x) * 0.06;
    this.mouseCurrent.y += (this.mouseTarget.y - this.mouseCurrent.y) * 0.06;

    // Dampen ripple over time
    this.currentRipple += (this.targetRipple - this.currentRipple) * 0.1;
    this.targetRipple *= 0.94;

    if (this.orbMesh && this.orbMesh.material.uniforms) {
      this.orbMesh.material.uniforms.u_time.value = this.time;
      this.orbMesh.material.uniforms.u_rippleStrength.value = this.currentRipple;
    }

    if (this.orbGroup) {
      this.orbGroup.rotation.y = this.time * 0.4 + this.mouseCurrent.x * 0.5;
      this.orbGroup.rotation.x = this.time * 0.2 + this.mouseCurrent.y * 0.3;
      this.orbGroup.position.y += Math.sin(this.time * 2.0) * 0.004;
    }
  }
}

const contactStage = new ContactStage();
globalThis.contactStage = contactStage;
export { ContactStage, contactStage };
export default contactStage;
