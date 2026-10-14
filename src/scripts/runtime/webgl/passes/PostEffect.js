import * as THREE from "../../three.js";
import fboHelper from "../FboHelper.js";
import math from "../../core/MathUtils.js";
import properties from "../../core/Properties.js";

const { Scene, Camera, PerspectiveCamera, Object3D, Matrix4, Quaternion, Vector3 } = THREE;

/**
 * Base Post-processing Effect Pass
 */
class PostEffect {
  sharedUniforms = {};
  enabled = !0;
  material = null;
  renderOrder = 0;
  _hasShownWarning = !1;
  isActive = !0;
  isCustomResolution = !1;
  needsResize = !0;
  constructor(e = !0) {
    this.isActive = e;
  }
  init(e) {
    e && Object.assign(this, e);
  }
  needsRender() {
    return !0;
  }
  warn(e) {
    this._hasShownWarning || (console.warn(e), (this._hasShownWarning = !0));
  }
  setPostprocessing(e) {}
  resize(e, t) {
    this.needsResize = !1;
  }
  render(e, t = !1) {
    (this.material && this.material.uniforms && this.material.uniforms.u_texture &&
      (this.material.uniforms.u_texture.value = e.fromTexture),
      fboHelper.render(this.material, t ? null : e.toRenderTarget),
      e.swap());
  }
}

class Ufx extends PostEffect {
  scene = new Scene();
  camera = new PerspectiveCamera(60, 1);
  frameIdx = -1;
  sectionLayer = new Object3D();
  projectDetailsLayer = new Object3D();
  sharedUniforms = { u_fromTexture: { value: null } };
  init() {}
  setPostprocessing(e) {
    let t = this.camera,
      r = properties.viewportWidth,
      n = properties.viewportHeight;
    (t.position.set(r / 2, -n / 2, n / (2 * Math.tan((t.fov * Math.PI) / 360))),
      (t.aspect = r / n),
      (t.far = t.position.z * 2),
      (t.near = t.far / 1e3),
      t.updateProjectionMatrix());
  }
  render(e, t = !1) {
    let r = fboHelper.getColorState(),
      n = properties.renderer;
    (fboHelper.copy(e.fromTexture, e.sceneRenderTarget),
      n.setRenderTarget(e.sceneRenderTarget),
      (fboHelper.renderer.autoClear = !1),
      (fboHelper.renderer.autoClearColor = !1),
      (fboHelper.renderer.autoClearStencil = !0),
      (fboHelper.renderer.autoClearDepth = !0),
      fboHelper.renderer.clear(!1, !0, !0),
      n.render(this.scene, this.camera),
      n.setRenderTarget(null));
    let a = t ? null : e.toRenderTarget;
    (fboHelper.copy(e.sceneTexture, a), fboHelper.setColorState(r), e.swap());
  }
}

class PreUfx extends Ufx {
  renderOrder = 50;
}
const preUfx = new PreUfx();
let _matrixWorld = new Matrix4(),
  _matrixWorldInverse = new Matrix4(),
  _projectionMatrix = new Matrix4(),
  _q$1 = new Quaternion(),
  _v1$3 = new Vector3();

class PostUfx extends Ufx {
  renderOrder = 100;
}
const postUfx = new PostUfx();

export { PostEffect, Ufx, PreUfx, PostUfx, preUfx, postUfx };
globalThis.PostEffect = PostEffect;
globalThis.Ufx = Ufx;
globalThis.PreUfx = PreUfx;
globalThis.PostUfx = PostUfx;
globalThis.preUfx = preUfx;
globalThis.postUfx = postUfx;

export default PostEffect;
