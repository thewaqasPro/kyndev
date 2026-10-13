/**
 * SecondOrderDynamics
 *
 * Exact 1-to-1 reverse-engineered implementation from deobfuscated.js (lines 2270–2378).
 * Simulates second-order spring dynamics with frequency (f), damping ratio (z), and initial response (r).
 */
export class SecondOrderDynamics {
  public isRobust: boolean;
  public isVector: boolean;
  public target: any;
  public target0: any;
  public prevTarget: any;
  public value: any;
  public valueVel: any;

  private _f: number = 1;
  private _z: number = 0.5;
  private _r: number = 0;
  private _w: number = 0;
  private _d: number = 0;

  public k1: number = 0;
  public k2: number = 0;
  public k3: number = 0;
  private _k1Stable: number = 0;
  private _k2Stable: number = 0;

  private _targetVelCache: any;
  private _cache1: any;
  private _cache2: any;

  public computeStableCoefficients: (delta: number) => void;

  constructor(
    initialValue: any,
    f: number = 1,
    z: number = 0.5,
    r: number = 0,
    isRobust: boolean = false
  ) {
    this._f = f;
    this._z = z;
    this._r = r;
    this.isRobust = isRobust;
    this.isVector = typeof initialValue === 'object' && initialValue !== null && 'clone' in initialValue;

    this.computeStableCoefficients = isRobust
      ? this._computeRobustStableCoefficients.bind(this)
      : this._computeStableCoefficients.bind(this);

    this.setFZR(f, z, r);

    if (this.isVector) {
      this.target = initialValue;
      this.target0 = initialValue.clone();
      this.prevTarget = initialValue.clone();
      this.value = initialValue.clone();
      this.valueVel = initialValue.clone().setScalar(0);
      this._targetVelCache = this.valueVel.clone();
      this._cache1 = this.valueVel.clone();
      this._cache2 = this.valueVel.clone();
      this.update = this._updateVector.bind(this);
      this.reset = this._resetVector.bind(this);
    } else {
      this.target = initialValue;
      this.target0 = initialValue;
      this.prevTarget = initialValue;
      this.value = initialValue;
      this.valueVel = 0;
      this.update = this._updateNumber.bind(this);
      this.reset = this._resetNumber.bind(this);
    }
  }

  public setFZR(f: number = this._f, z: number = this._z, r: number = this._r): void {
    this._f = f;
    this._z = z;
    this._r = r;
    const n = Math.PI * 2 * f;
    if (this.isRobust) {
      this._w = n;
      this._d = this._w * Math.sqrt(Math.abs(z * z - 1));
    }
    this.k1 = z / (Math.PI * f);
    this.k2 = 1 / (n * n);
    this.k3 = (r * z) / n;
  }

  private _computeStableCoefficients(delta: number): void {
    this._k1Stable = this.k1;
    this._k2Stable = Math.max(this.k2, (delta * 1.1 * delta) / 4 + (delta * this.k1) / 2);
  }

  private _computeRobustStableCoefficients(delta: number): void {
    if (this._w * delta < this._z) {
      this._k1Stable = this.k1;
      this._k2Stable = Math.max(this.k2, (delta * delta) / 2 + (delta * this.k1) / 2, delta * this.k1);
    } else {
      const t = Math.exp(-this._z * this._w * delta);
      const r = t * 2 * (this._z <= 1 ? Math.cos(delta * this._d) : Math.cosh(delta * this._d));
      const n = t * t;
      const a = delta / (1 + n - r);
      this._k1Stable = (1 - n) * a;
      this._k2Stable = delta * a;
    }
  }

  public update(_delta: number, _target?: any): void {}
  public reset(_initial?: any): void {}

  private _resetVector(target: any = this.target0): void {
    this.valueVel.setScalar(0);
    this.prevTarget.copy(target);
    this.target.copy(target);
    this.value.copy(target);
  }

  private _resetNumber(target: number = this.target0): void {
    this.valueVel = 0;
    this.prevTarget = target;
    this.target = target;
    this.value = target;
  }

  private _updateVector(delta: number, target: any = this.target): void {
    if (delta > 0) {
      this._targetVelCache.copy(target).sub(this.prevTarget).divideScalar(delta);
      this.prevTarget.copy(target);
      this.computeStableCoefficients(delta);
      this.value.add(this._cache1.copy(this.valueVel).multiplyScalar(delta));
      this._cache1
        .copy(target)
        .add(this._targetVelCache.multiplyScalar(this.k3))
        .sub(this.value)
        .sub(this._cache2.copy(this.valueVel).multiplyScalar(this._k1Stable))
        .multiplyScalar(delta / this._k2Stable);
      this.valueVel.add(this._cache1);
    }
  }

  private _updateNumber(delta: number, target: number = this.target): void {
    if (delta > 0) {
      const r = (target - this.prevTarget) / delta;
      this.prevTarget = target;
      this.computeStableCoefficients(delta);
      this.valueVel += (target + this.k3 * r - this.value - this._k1Stable * this.valueVel) * (delta / this._k2Stable);
      this.value += this.valueVel * delta;
    }
  }
}
