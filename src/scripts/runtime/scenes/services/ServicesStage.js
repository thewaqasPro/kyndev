/**
 * 3D Services Scene: Chromatic Tech Polyhedra & Orbiting Particle Matrix
 */
import * as THREE from "../../three.js";
const {
  Scene,
  Object3D,
  Vector3,
  Color,
  Mesh,
  Points,
  BufferGeometry,
  BufferAttribute,
  IcosahedronGeometry,
  ShaderMaterial,
  PointsMaterial,
  AdditiveBlending,
  DoubleSide
} = THREE;

import { Stage3D, visuals } from "../../webgl/Stage3D.js";
import properties from "../../core/Properties.js";

const crystalVertexShader = /* glsl */ `
varying vec3 v_normal;
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;

void main() {
  v_normal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  v_viewPosition = -mvPosition.xyz;
  v_worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const crystalFragmentShader = /* glsl */ `
uniform float u_time;
uniform vec3 u_colorCore;
uniform vec3 u_colorAccent;
varying vec3 v_normal;
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;

void main() {
  vec3 viewDir = normalize(v_viewPosition);
  vec3 normal = normalize(v_normal);
  
  // Fresnel glow at glancing angles
  float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);
  
  // Chromatic dispersion shimmer
  float dispersionR = sin(dot(normal.xy, vec2(1.0, 0.5)) * 6.0 + u_time * 1.5) * 0.5 + 0.5;
  float dispersionB = cos(dot(normal.yz, vec2(0.5, 1.0)) * 6.0 - u_time * 1.2) * 0.5 + 0.5;
  vec3 dispersion = vec3(dispersionR, 0.4, dispersionB);
  
  vec3 baseColor = mix(u_colorCore, u_colorAccent, normal.y * 0.5 + 0.5);
  vec3 finalColor = baseColor * 0.4 + dispersion * 0.35 + fresnel * vec3(0.9, 0.95, 1.0) * 1.2;
  
  gl_FragColor = vec4(finalColor, 0.85 + fresnel * 0.15);
}
`;

class ServicesStage extends Stage3D {
  defaultCameraPosition = new Vector3(0, 0, 16);
  defaultLookAtPosition = new Vector3(0, 0, 0);

  crystalGroup = new Object3D();
  crystalMesh = null;
  crystalWire = null;
  particlesMesh = null;

  mouseTarget = { x: 0, y: 0 };
  mouseCurrent = { x: 0, y: 0 };
  scrollRatio = 0;
  time = 0;

  preInit() {
    this._initCrystal();
    this._initParticles();
    this.add(this.crystalGroup);
  }

  _initCrystal() {
    const geo = new IcosahedronGeometry(3.5, 0);
    const mat = new ShaderMaterial({
      vertexShader: crystalVertexShader,
      fragmentShader: crystalFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_colorCore: { value: new Color("#1a2ffb") },
        u_colorAccent: { value: new Color("#8832f7") },
      },
      transparent: true,
      side: DoubleSide,
    });
    this.crystalMesh = new Mesh(geo, mat);
    this.crystalGroup.add(this.crystalMesh);

    // Glowing wireframe cage
    const wireGeo = new IcosahedronGeometry(3.6, 1);
    const wireMat = new ShaderMaterial({
      vertexShader: crystalVertexShader,
      fragmentShader: /* glsl */ `
        uniform float u_time;
        void main() {
          gl_FragColor = vec4(0.4, 0.7, 1.0, 0.35);
        }
      `,
      wireframe: true,
      transparent: true,
    });
    this.crystalWire = new Mesh(wireGeo, wireMat);
    this.crystalGroup.add(this.crystalWire);

    // Position crystal toward upper-right quadrant
    this.crystalGroup.position.set(4, 1.5, 0);
  }

  _initParticles() {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 35;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));

    const mat = new PointsMaterial({
      color: new Color("#7ca6ff"),
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      blending: AdditiveBlending,
    });
    this.particlesMesh = new Points(geo, mat);
    this.add(this.particlesMesh);
  }

  init() {
    window.addEventListener("pointermove", this._onPointerMove.bind(this), { passive: true });
  }

  _onPointerMove(e) {
    this.mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  resize(w, h) {
    if (w < 812) {
      // Center and scale down for mobile screens
      this.crystalGroup.position.set(0, 3, -4);
      this.crystalGroup.scale.setScalar(0.7);
    } else {
      this.crystalGroup.position.set(4.5, 1.2, 0);
      this.crystalGroup.scale.setScalar(1);
    }
  }

  update(delta = 0.016) {
    this.time += delta;

    // Smooth mouse inertia
    this.mouseCurrent.x += (this.mouseTarget.x - this.mouseCurrent.x) * 0.05;
    this.mouseCurrent.y += (this.mouseTarget.y - this.mouseCurrent.y) * 0.05;

    if (this.crystalMesh && this.crystalMesh.material.uniforms) {
      this.crystalMesh.material.uniforms.u_time.value = this.time;
    }

    // Continuous kinetic rotation + mouse tilt
    if (this.crystalGroup) {
      this.crystalGroup.rotation.x = this.time * 0.25 + this.mouseCurrent.y * 0.4;
      this.crystalGroup.rotation.y = this.time * 0.35 + this.mouseCurrent.x * 0.6;
      this.crystalGroup.position.y += Math.sin(this.time * 1.5) * 0.003;
    }

    // Slow orbital drift for particle matrix
    if (this.particlesMesh) {
      this.particlesMesh.rotation.y = this.time * 0.02;
    }
  }
}

const servicesStage = new ServicesStage();
export { ServicesStage, servicesStage };
export default servicesStage;
