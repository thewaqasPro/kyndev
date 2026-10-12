import * as THREE from 'three';
import type { BalloonConfig } from './HeroData';

const GRAVITY_FACTOR = 40;

export class HeroBody {
  public position0: THREE.Vector3 = new THREE.Vector3();
  public velocity0: THREE.Vector3 = new THREE.Vector3();
  public position: THREE.Vector3 = new THREE.Vector3();
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public quaternion: THREE.Quaternion = new THREE.Quaternion();

  private gravityForce: THREE.Vector3 = new THREE.Vector3();
  private gravityAcc: THREE.Vector3 = new THREE.Vector3();

  public radius: number = 1;
  public mass: number = 1;
  public density: number = 1;
  public friction: number = 1;
  public frictionTot: number = 0;
  public restitution: number = 0.8;
  public inertia: number = 1;

  constructor(config: BalloonConfig, index: number) {
    // Deterministic spread around origin
    const angle = (index / 19) * Math.PI * 2;
    const r = 1.0 + (index % 4) * 0.55;
    this.position0.set(
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      ((index % 5) - 2) * 0.45
    );
    this.velocity0.copy(this.position0).multiplyScalar(-1.2);
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);

    this.radius = config.radius * 1.05;
    this.density = config.density;
    this.friction = config.friction;
    this.restitution = config.restitution;

    const volume = Math.PI * this.radius * 1.333333;
    this.mass = volume * this.radius * this.radius * this.density;
    this.inertia = this.mass * this.radius * this.radius * 0.4;
  }

  public reset(): void {
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);
  }

  public applyImpulse(strength: number = 1.0): void {
    this.gravityForce.copy(this.position).negate().multiplyScalar(10);
    this.gravityAcc.copy(this.gravityForce);
    this.gravityForce.set(
      (Math.random() - 0.5) * 65,
      (Math.random() - 0.5) * 65,
      (Math.random() - 0.5) * 45
    ).multiplyScalar(strength);
    this.gravityAcc.add(this.gravityForce).multiplyScalar(1 / this.mass);
    this.velocity.negate().add(this.gravityAcc);
  }

  public updateGravity(delta: number): void {
    this.gravityForce.copy(this.position).negate().multiplyScalar(GRAVITY_FACTOR);
    this.gravityAcc.copy(this.gravityForce).multiplyScalar(1 / this.mass);
    this.gravityAcc.multiplyScalar(1 / (1 + this.frictionTot));
    this.velocity.addScaledVector(this.gravityAcc, delta);
    this.frictionTot *= 0.5;
  }

  public update(delta: number): void {
    this.position.addScaledVector(this.velocity, delta);
    this.velocity.multiplyScalar(Math.pow(0.2, delta));
  }
}

export class HeroPhysics {
  public bodies: HeroBody[] = [];
  public mouseRadius: number = 0.55;
  public mouseInfluence: number = 0.16;
  public mousePushForce: number = 0.24;

  // Container boundaries in 3D world units
  public boundX: number = 4.2;
  public boundY: number = 2.4;
  public boundZ: number = 2.0;

  // Reusable working vectors to avoid GC pressure
  private _mouse: THREE.Vector3 = new THREE.Vector3();
  private _mousePrev: THREE.Vector3 = new THREE.Vector3();
  private _mousePush: THREE.Vector3 = new THREE.Vector3();
  private _mouseBA: THREE.Vector3 = new THREE.Vector3();
  private _p1: THREE.Vector3 = new THREE.Vector3();
  private _pos: THREE.Vector3 = new THREE.Vector3();
  private _vel: THREE.Vector3 = new THREE.Vector3();
  private _v1: THREE.Vector3 = new THREE.Vector3();
  private _normal: THREE.Vector3 = new THREE.Vector3();
  private _q: THREE.Quaternion = new THREE.Quaternion();
  private _v0: THREE.Vector3 = new THREE.Vector3();

  public setBounds(boundX: number, boundY: number, boundZ: number = 2.0): void {
    this.boundX = boundX;
    this.boundY = boundY;
    this.boundZ = boundZ;
  }

  public init(configs: BalloonConfig[]): void {
    this.bodies = configs.map((cfg, i) => new HeroBody(cfg, i));
  }

  public update(delta: number, camera: THREE.Camera, mouseNDC: THREE.Vector2): void {
    if (this.bodies.length === 0) return;

    // Project mouse cursor into 3D world plane (Z = 0)
    this._p1.set(mouseNDC.x, mouseNDC.y, 0.5);
    this._p1.unproject(camera);
    this._p1.sub(camera.position).normalize();
    const distToPlane = -camera.position.z / Math.min(-0.0001, this._p1.z);
    this._p1.multiplyScalar(distToPlane);
    this._mouse.copy(camera.position).add(this._p1);

    this._mousePush.copy(this._mouse).sub(this._mousePrev).multiplyScalar(this.mousePushForce / delta);
    this._mouseBA.copy(this._mouse).sub(camera.position);
    const mouseBASq = this._mouseBA.lengthSq();
    this._mousePrev.copy(this._mouse);

    // Update bodies & resolve inter-body collisions
    for (let a = 0; a < this.bodies.length; a++) {
      const bodyA = this.bodies[a];
      bodyA.updateGravity(delta);
      this._vel.copy(bodyA.velocity);
      this._pos.copy(bodyA.position);

      for (let p = a + 1; p < this.bodies.length; p++) {
        const bodyB = this.bodies[p];
        this._v1.copy(bodyB.velocity);
        this._p1.copy(bodyB.position);
        this._normal.copy(this._pos).sub(this._p1);
        const dist = this._normal.length();
        const minDist = bodyA.radius + bodyB.radius;

        if (dist < minDist && dist > 0.0001) {
          const friction = Math.sqrt(bodyA.friction * bodyB.friction);
          bodyA.frictionTot += friction;
          bodyB.frictionTot += friction;

          this._normal.normalize();
          this._normal.multiplyScalar((dist - minDist) * 0.5);
          this._pos.sub(this._normal);
          this._p1.add(this._normal);
          this._normal.normalize();

          const vA = this._vel.dot(this._normal);
          const vB = this._v1.dot(this._normal);
          const mA = bodyA.mass;
          const mB = bodyB.mass;
          const eA = bodyA.restitution;
          const eB = bodyB.restitution;

          const newVA = (mA * vA + mB * vB - mB * (vA - vB) * eA) / (mA + mB);
          const newVB = (mA * vA + mB * vB - mA * (vB - vA) * eB) / (mA + mB);

          this._vel.addScaledVector(this._normal, (newVA - vA) / (1 + friction));
          this._v1.addScaledVector(this._normal, (newVB - vB) / (1 + friction));

          bodyB.position.copy(this._p1);
          bodyB.velocity.copy(this._v1);
        }
      }

      // Mouse ray repulsion
      if (mouseBASq > 0) {
        this._v0.copy(this._pos).sub(camera.position);
        const proj = this._v0.dot(this._mouseBA) / mouseBASq;
        let c = this._v0.sub(this._v1.copy(this._mouseBA).multiplyScalar(proj)).length() - bodyA.radius - this.mouseRadius;
        if (c < 0) {
          this._v0.copy(this._pos).sub(camera.position).cross(this._mouseBA).normalize();
          this._v1.copy(this._mouseBA).cross(this._v0).normalize();
          this._pos.sub(this._v1.multiplyScalar(this.mouseInfluence * c));
          this._v1.multiplyScalar(-this.mousePushForce / delta);
          this._vel.add(this._v1);
          this._vel.add(this._mousePush);
        }
      }

      // Angular rotation
      this._v0.cross(this._vel);
      let f = this._v0.length() / Math.max(0.01, bodyA.inertia);
      if (f > 0) {
        this._v0.normalize();
        this._q.setFromAxisAngle(this._v0, f * delta);
        bodyA.quaternion.premultiply(this._q);
      }

      // Container Wall Collisions (Guarantees item never goes over the container)
      const r = bodyA.radius * 0.95;
      if (this._pos.x + r > this.boundX) {
        this._pos.x = this.boundX - r;
        this._vel.x = -Math.abs(this._vel.x) * bodyA.restitution;
      } else if (this._pos.x - r < -this.boundX) {
        this._pos.x = -this.boundX + r;
        this._vel.x = Math.abs(this._vel.x) * bodyA.restitution;
      }

      if (this._pos.y + r > this.boundY) {
        this._pos.y = this.boundY - r;
        this._vel.y = -Math.abs(this._vel.y) * bodyA.restitution;
      } else if (this._pos.y - r < -this.boundY) {
        this._pos.y = -this.boundY + r;
        this._vel.y = Math.abs(this._vel.y) * bodyA.restitution;
      }

      if (this._pos.z + r > this.boundZ) {
        this._pos.z = this.boundZ - r;
        this._vel.z = -Math.abs(this._vel.z) * bodyA.restitution;
      } else if (this._pos.z - r < -this.boundZ) {
        this._pos.z = -this.boundZ + r;
        this._vel.z = Math.abs(this._vel.z) * bodyA.restitution;
      }

      bodyA.position.copy(this._pos);
      bodyA.velocity.copy(this._vel);
      bodyA.update(delta);
    }
  }
}
