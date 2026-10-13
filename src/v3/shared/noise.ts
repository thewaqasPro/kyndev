import * as THREE from 'three';
import { math } from './math';

/**
 * Simple1DNoise
 *
 * Exact 1-to-1 reverse-engineered implementation from deobfuscated.js (lines 9471–9515).
 */
export class Simple1DNoise {
  public static readonly MAX_VERTICES = 512;
  public static readonly MAX_VERTICES_MASK = Simple1DNoise.MAX_VERTICES - 1;

  private _scale: number = 1;
  private _amplitude: number = 1;
  private _r: number[] = [];

  constructor(seed?: number) {
    const randomFn = seed !== undefined ? Math.random : Math.random;
    for (let i = 0; i < Simple1DNoise.MAX_VERTICES; ++i) {
      this._r.push(randomFn() - 0.5);
    }
  }

  public getVal(x: number): number {
    const t = x * this._scale;
    const r = Math.floor(t);
    const n = t - r;
    const a = n * n * (3 - n * 2);
    const l = r & Simple1DNoise.MAX_VERTICES_MASK;
    const c = (l + 1) & Simple1DNoise.MAX_VERTICES_MASK;
    return math.lerp(this._r[l], this._r[c], a) * this._amplitude;
  }

  public getFbm(x: number, octaves: number): number {
    let r = 0;
    let n = 0.5;
    for (let i = 0; i < octaves; i++) {
      r += n * this.getVal(x);
      x *= 2;
      n *= 0.5;
    }
    return r;
  }

  public get amplitude(): number {
    return this._amplitude;
  }

  public set amplitude(val: number) {
    this._amplitude = val;
  }

  public get scale(): number {
    return this._scale;
  }

  public set scale(val: number) {
    this._scale = val;
  }
}

const _v2 = new THREE.Vector3();

/**
 * BrownianMotion
 *
 * Exact 1-to-1 reverse-engineered procedural 3D Brownian noise drift from deobfuscated.js (lines 9516–9633).
 */
export class BrownianMotion {
  private _position = new THREE.Vector3();
  private _rotation = new THREE.Quaternion();
  private _euler = new THREE.Euler();
  private _scale = new THREE.Vector3(1, 1, 1);
  private _matrix = new THREE.Matrix4();

  private _enablePositionNoise = true;
  private _enableRotationNoise = true;

  private _positionFrequency = 0.25;
  private _rotationFrequency = 0.25;
  private _positionAmplitude = 0.3;
  private _rotationAmplitude = 0.003;

  private _positionScale = new THREE.Vector3(1, 1, 1);
  private _rotationScale = new THREE.Vector3(1, 1, 0);

  private _positionFractalLevel = 3;
  private _rotationFractalLevel = 3;

  private _times = new Float32Array(6);
  private _noise = new Simple1DNoise();

  public static readonly FBM_NORM = 1 / 0.75;

  constructor() {
    this.rehash();
  }

  public rehash(): void {
    for (let i = 0; i < 6; i++) {
      this._times[i] = Math.random() * -10000;
    }
  }

  public update(deltaMs: number = 16.6667): void {
    if (this._enablePositionNoise) {
      for (let i = 0; i < 3; i++) {
        this._times[i] += this._positionFrequency * deltaMs;
      }
      _v2.set(
        this._noise.getFbm(this._times[0], this._positionFractalLevel),
        this._noise.getFbm(this._times[1], this._positionFractalLevel),
        this._noise.getFbm(this._times[2], this._positionFractalLevel)
      );
      _v2.multiply(this._positionScale);
      _v2.multiplyScalar(this._positionAmplitude * BrownianMotion.FBM_NORM);
      this._position.copy(_v2);
    }

    if (this._enableRotationNoise) {
      for (let i = 0; i < 3; i++) {
        this._times[i + 3] += this._rotationFrequency * deltaMs;
      }
      _v2.set(
        this._noise.getFbm(this._times[3], this._rotationFractalLevel),
        this._noise.getFbm(this._times[4], this._rotationFractalLevel),
        this._noise.getFbm(this._times[5], this._rotationFractalLevel)
      );
      _v2.multiply(this._rotationScale);
      _v2.multiplyScalar(this._rotationAmplitude * BrownianMotion.FBM_NORM);
      this._euler.set(_v2.x, _v2.y, _v2.z);
      this._rotation.setFromEuler(this._euler);
    }

    this._matrix.compose(this._position, this._rotation, this._scale);
  }

  public get position(): THREE.Vector3 {
    return this._position;
  }

  public get rotation(): THREE.Quaternion {
    return this._rotation;
  }

  public get matrix(): THREE.Matrix4 {
    return this._matrix;
  }

  public get positionAmplitude(): number {
    return this._positionAmplitude;
  }

  public set positionAmplitude(v: number) {
    this._positionAmplitude = v;
  }

  public get positionFrequency(): number {
    return this._positionFrequency;
  }

  public set positionFrequency(v: number) {
    this._positionFrequency = v;
  }

  public get rotationAmplitude(): number {
    return this._rotationAmplitude;
  }

  public set rotationAmplitude(v: number) {
    this._rotationAmplitude = v;
  }

  public get rotationFrequency(): number {
    return this._rotationFrequency;
  }

  public set rotationFrequency(v: number) {
    this._rotationFrequency = v;
  }
}
