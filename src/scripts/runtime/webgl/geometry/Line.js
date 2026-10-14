/**
 * 3D Camera-Facing Extruded Ribbon Spline Geometry
 */
import * as THREE from "../../three.js";
import math from "../../core/MathUtils.js";
import ease from "../../core/Ease.js";
import properties from "../../core/Properties.js";
import settings from "../../core/Settings.js";
import { vert$j, frag$m, lineEndVert, lineEndFrag, LINES_DATA_LIST } from "./UfxMesh.js";

const { Object3D, BufferGeometry, Mesh, ShaderMaterial, Color, Vector2, Vector3, Box3, PlaneGeometry } = THREE;
const _v0$2 = new Vector3();
const _v1$5 = new Vector3();
const _box = new Box3();

class Line {
  container = new Object3D();
  innerContainer = new Object3D();
  geometry = new BufferGeometry();
  mesh = null;
  lineId = 0;
  aoThreshold = 0.47;
  radius = 0.008;
  lineData = null;
  constructor(e = 0) {
    ((this.lineId = e), (this.lineData = LINES_DATA_LIST[this.lineId]));
  }
  preInit() {
    (this.container.add(this.innerContainer),
      properties.loader.add(
        settings.MODEL_PATH + "lines/" + this.lineData.fileName + ".buf",
        {
          onLoad: (e) => {
            this.geometry = e;
            if (this.mesh) this.mesh.geometry = e;
            if (!this.lineRatioArray && e.attributes && e.attributes.position) {
              const { array: a, count: c } = e.attributes.position;
              this.lineRatioArray = new Float32Array(c);
              for (let r = 0; r < c; r++) this.lineRatioArray[r] = a[r * 3 + 2];
            }
          },
        },
      ));
  }
  init() {
    ((this.mesh = new Mesh(
      this.geometry,
      new ShaderMaterial({
        uniforms: {
          u_showRatio: { value: 0 },
          u_aoThreshold: { value: this.lineData.aoThreshold },
          u_colorBg: { value: new Color() },
          u_color0: { value: new Color(this.lineData.color0) },
          u_color1: { value: new Color(this.lineData.color1) },
          u_scrollY: { value: 0 },
          u_radius: { value: 0 },
          u_aspect: { value: new Vector2() },
          u_margin: {
            value: new Vector2(this.lineData.margin.x, this.lineData.margin.y),
          },
          u_viewportResolution: properties.sharedUniforms.u_viewportResolution,
        },
        vertexShader: vert$j,
        fragmentShader: frag$m,
        depthTest: !1,
        transparent: !0,
      }),
    )),
      (this.mesh.frustumCulled = !1),
      (this.mesh.material.defines.IS_LINE = !0),
      (this.mesh.material.extensions.derivatives = !0),
      (this.box = new Box3().setFromObject(this.mesh)),
      this.innerContainer.add(this.mesh),
      (this.circle = new Mesh(
        new PlaneGeometry(2, 2),
        new ShaderMaterial({
          uniforms: {
            u_color0: { value: new Color(this.lineData.color0) },
            u_color1: { value: new Color(this.lineData.color1) },
            u_ao: { value: 1 },
            u_mixRatio: { value: 0 },
          },
          vertexShader: lineEndVert,
          fragmentShader: lineEndFrag,
          side: 2,
          depthTest: !1,
          transparent: !0,
        }),
      )),
      (this.circle.material.extensions.derivatives = !0),
      (this.circle.frustumCulled = !1),
      this.innerContainer.add(this.circle));
    if (
      this.geometry &&
      this.geometry.attributes &&
      this.geometry.attributes.position
    ) {
      const { array: e, count: t } = this.geometry.attributes.position;
      this.lineRatioArray = new Float32Array(
        this.geometry.attributes.position.count,
      );
      for (let r = 0; r < t; r++) this.lineRatioArray[r] = e[r * 3 + 2];
    }
  }
  resize(e, t) {
    if (!this.mesh) this.init();
    if (!this.mesh || !this.mesh.material || !this.mesh.material.uniforms || !this.mesh.material.uniforms.u_aspect) return;
    const r = t / Math.sqrt(e * e + t * t);
    this.mesh.material.uniforms.u_aspect.value.set((e / t) * r, r);
  }
  update(e, t, r = 0) {
    if (!this.mesh || !this.mesh.material || !this.mesh.material.uniforms || !this.mesh.material.uniforms.u_aspect) return;
    let n = this.radius * math.fit(properties.viewportWidth, 540, 1920, 2, 1),
      a = math.saturate(
        -(
          t.screenY -
          this.lineData.scrollToRatioFactors[0] * properties.viewportHeight
        ) /
          (this.lineData.scrollToRatioFactors[1] * properties.viewportHeight),
      );
    a = ease.quadInOut(a);
    const l = t.screenY + r;
    let c =
        properties.viewportWidth / this.mesh.material.uniforms.u_aspect.value.x,
      u =
        properties.viewportHeight /
        this.mesh.material.uniforms.u_aspect.value.y;
    ((this.mesh.material.uniforms.u_showRatio.value = math.saturate(a)),
      (this.mesh.material.uniforms.u_scrollY.value = -l),
      this.mesh.material.uniforms.u_colorBg.value.copy(properties.bgColor),
      (this.mesh.material.uniforms.u_radius.value = n),
      (this.innerContainer.position.x = this.lineData.margin.x * c),
      (this.innerContainer.position.y = this.lineData.margin.y * u - l),
      (this.innerContainer.scale.x = c),
      (this.innerContainer.scale.y = u),
      (this.container.visible = !1),
      this.container.parent &&
        (this.container.parent.updateMatrixWorld(!0),
        _box.min.copy(this.lineData.boxMin),
        _box.max.copy(this.lineData.boxMax),
        _box.applyMatrix4(this.innerContainer.matrixWorld),
        (this.container.visible =
          _box.max.y > -properties.viewportHeight && _box.min.y < 0)));
    if (
      !this.geometry ||
      !this.geometry.attributes ||
      !this.geometry.attributes.CP ||
      !this.geometry.attributes.position ||
      !this.lineRatioArray
    )
      return;
    const { array: f, count: p } = this.geometry.attributes.CP,
      { array: g } = this.geometry.attributes.position;
    let v = 0,
      _ = 0;
    for (let R = 0; R < p; R++)
      a >= this.lineRatioArray[R] &&
        ((v = R),
        R === p - 1
          ? (_ = 0)
          : (_ =
              (a - this.lineRatioArray[R]) /
              (this.lineRatioArray[R + 1] - this.lineRatioArray[R])));
    const T = v,
      M = Math.min(v + 1, p - 1);
    (_v0$2.fromArray(f, v * 3),
      _v1$5.fromArray(f, Math.min(p - 1, v + 1) * 3),
      _v0$2.lerp(_v1$5, _));
    const S = this.geometry.attributes.Cd.array;
    let b = math.lerp(S[T], S[M], _);
    b = 0.9 + 0.1 * b;
    const C = math.linearStep(
      this.lineData.aoThreshold - 0.02,
      this.lineData.aoThreshold + 0.02,
      a,
    );
    (this.circle.position.copy(_v0$2),
      this.circle.scale.set(n, n, 1),
      (this.circle.material.uniforms.u_ao.value = Math.min(1, b + 1 - C)));
    let w = math.lerp(g[T * 3 + 2], g[M * 3 + 2], _);
    ((w = 1 - Math.pow(1 - math.clamp(w, 0, 1), 2)),
      (this.circle.material.uniforms.u_mixRatio.value = w));
  }
}

globalThis.Line = Line;
export { Line };
export default Line;
