/**
 * Base 3D interactive stage extending Three Scene & Global Visuals Coordinator
 */
import * as THREE from "../three.js";
const { Scene, Vector3 } = THREE;
import properties from "../core/Properties.js";

class Stage3D extends Scene {
  wasActive = null;
  /** @type {boolean | null} */
  isActive = null;
  constructor(e = {}) {
    super();
    Object.assign(
      this,
      {
        defaultCameraPosition: new Vector3(0, 0, 5),
        defaultLookAtPosition: new Vector3(0, 0, 0),
        properties: {},
      },
      e,
    );
  }
  preInit() {}
  init() {}
  resize(e, t) {}
  syncProperties(e) {}
  update(e) {}
}

class Visuals {
  defaultStage3D = new Stage3D();
  currentStage3D = null;
  stage3DList = [];
  preInit() {}
  init() {}
  start() {}
  resize(e, t) {}
  deactivateAll() {
    for (let e = 0; e < this.stage3DList.length; e++) {
      let t = this.stage3DList[e];
      t.isActive = !1;
    }
  }
  syncProperties(e) {
    this.currentStage3D = this.defaultStage3D;
    for (let t = 0; t < this.stage3DList.length; t++) {
      let r = this.stage3DList[t];
      if (r.isActive === !0) {
        ((this.currentStage3D = r), r.syncProperties(e));
        for (let n in r.properties) properties[n] = r.properties[n];
      } else r.isActive = !1;
    }
  }
  update(e) {
    if (this.currentStage3D && typeof this.currentStage3D.update === "function") {
      this.currentStage3D.update(e);
      this.currentStage3D.visible = !0;
    }
    for (let t = 0; t < this.stage3DList.length; t++) {
      let r = this.stage3DList[t];
      r.wasActive = r.isActive;
    }
  }
}

const visuals = globalThis.visuals || new Visuals();
globalThis.visuals = visuals;
globalThis.Stage3D = Stage3D;
globalThis.Visuals = Visuals;

const blur9VaryingVertexShader = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_delta;varying vec2 v_uv[9];void main(){vec2 uv=position.xy*0.5+0.5;v_uv[0]=uv;vec2 delta=u_delta;v_uv[1]=uv-delta;v_uv[2]=uv+delta;delta+=u_delta;v_uv[3]=uv-delta;v_uv[4]=uv+delta;delta+=u_delta;v_uv[5]=uv-delta;v_uv[6]=uv+delta;delta+=u_delta;v_uv[7]=uv-delta;v_uv[8]=uv+delta;gl_Position=vec4(position,1.0);}`,
  blur9VaryingFragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv[9];void main(){vec4 color=texture2D(u_texture,v_uv[0])*0.1633;color+=texture2D(u_texture,v_uv[1])*0.1531;color+=texture2D(u_texture,v_uv[2])*0.1531;color+=texture2D(u_texture,v_uv[3])*0.12245;color+=texture2D(u_texture,v_uv[4])*0.12245;color+=texture2D(u_texture,v_uv[5])*0.0918;color+=texture2D(u_texture,v_uv[6])*0.0918;color+=texture2D(u_texture,v_uv[7])*0.051;color+=texture2D(u_texture,v_uv[8])*0.051;gl_FragColor=color;}`,
  blur9FragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_delta;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv)*0.1633;vec2 delta=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.1531;color+=texture2D(u_texture,v_uv+delta)*0.1531;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.12245;color+=texture2D(u_texture,v_uv+delta)*0.12245;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.0918;color+=texture2D(u_texture,v_uv+delta)*0.0918;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.051;color+=texture2D(u_texture,v_uv+delta)*0.051;gl_FragColor=color;}`;

export { Stage3D, Visuals, visuals };
export default Stage3D;
