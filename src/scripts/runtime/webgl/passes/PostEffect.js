import * as THREE from "../../three.js";
import fboHelper from "../FboHelper.js";
import math from "../../core/MathUtils.js";
import properties from "../../core/Properties.js";

const { Scene, Camera, Matrix4, Quaternion, Vector3 } = THREE;

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
  render(e) {}
}
class Ufx extends PostEffect {
  scene = new Scene();
  camera = new Camera();
  renderOrder = 0;
  prevRatio = 0;
  ratio = 0;
  ratioDelta = 0;
  ratioEased = 0;
  smoothDuration = 0;
  _smoothTimer = 0;
  constructor() {
    super();
  }
  init() {
    this.scene.matrixAutoUpdate = !1;
  }
  render(e, t) {
    let r = fboHelper.getColorState(),
      n = fboHelper.renderer;
    (n.setRenderTarget(e.toRenderTarget),
      fboHelper.clearColor(0, 0, 0, 0),
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
