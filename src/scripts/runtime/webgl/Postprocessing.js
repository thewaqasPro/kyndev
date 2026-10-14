/**
 * Master WebGL Post-processing Pipeline
 */
import * as THREE from "../three.js";
let _geom;
class Postprocessing {
  width = 1;
  height = 1;
  scene = null;
  camera = null;
  resolution = new Vector2(0, 0);
  texelSize = new Vector2(0, 0);
  aspect = new Vector2(1, 1);
  onBeforeSceneRendered = new MinSignal$2();
  onAfterSceneRendered = new MinSignal$2();
  onAfterRendered = new MinSignal$2();
  sceneRenderTarget = null;
  fromRenderTarget = null;
  toRenderTarget = null;
  useDepthTexture = !0;
  depthTexture = null;
  fromTexture = null;
  toTexture = null;
  sceneTexture = null;
  mesh = null;
  queue = [];
  sharedUniforms = {};
  geom;
  hasSizeChanged = !0;
  init(e) {
    if (
      (Object.assign(this, e),
      _geom
        ? (this.geom = _geom)
        : ((this.geom = _geom = new BufferGeometry()),
          this.geom.setAttribute(
            "position",
            new BufferAttribute(
              new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]),
              3,
            ),
          ),
          this.geom.setAttribute(
            "a_uvClamp",
            new BufferAttribute(
              new Float32Array([0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]),
              4,
            ),
          )),
      (this.sceneFlatRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this.sceneFlatRenderTarget.depthBuffer = !0),
      (this.sceneMsRenderTarget = fboHelper.createMultisampleRenderTarget(
        1,
        1,
      )),
      (this.sceneMsRenderTarget.depthBuffer = !0),
      (this.fromRenderTarget = fboHelper.createRenderTarget(1, 1)),
      (this.toRenderTarget = this.fromRenderTarget.clone()),
      (this.useDepthTexture =
        !!this.useDepthTexture &&
        fboHelper.renderer &&
        (fboHelper.renderer.capabilities.isWebGL2 ||
          fboHelper.renderer.extensions.get("WEBGL_depth_texture"))),
      (this.fromTexture = this.fromRenderTarget.texture),
      (this.toTexture = this.toRenderTarget.texture),
      (this.sceneRenderTarget = this.sceneMsRenderTarget),
      (this.sceneTexture = this.sceneMsRenderTarget.texture),
      (this.mesh = new Mesh()),
      (this.sharedUniforms = Object.assign(this.sharedUniforms, {
        u_sceneTexture: { value: this.sceneTexture },
        u_fromTexture: { value: null },
        u_toTexture: { value: null },
        u_sceneDepthTexture: { value: null },
        u_cameraNear: { value: 0 },
        u_cameraFar: { value: 1 },
        u_cameraFovRad: { value: 1 },
        u_resolution: { value: this.resolution },
        u_texelSize: { value: this.texelSize },
        u_aspect: { value: this.aspect },
      })),
      this.useDepthTexture && fboHelper.renderer)
    ) {
      const t = new DepthTexture(this.resolution.width, this.resolution.height);
      (fboHelper.renderer.capabilities.isWebGL2
        ? (t.type = UnsignedIntType)
        : ((t.format = DepthStencilFormat), (t.type = UnsignedInt248Type)),
        (t.minFilter = NearestFilter),
        (t.magFilter = NearestFilter),
        (this.sceneFlatRenderTarget.depthTexture = t),
        (this.sceneMsRenderTarget.depthTexture = t),
        (this.depthTexture = this.sharedUniforms.u_sceneDepthTexture.value =
          t));
    }
  }
  swap() {
    const e = this.fromRenderTarget;
    ((this.fromRenderTarget = this.toRenderTarget),
      (this.toRenderTarget = e),
      (this.fromTexture = this.fromRenderTarget.texture),
      (this.toTexture = this.toRenderTarget.texture),
      (this.sharedUniforms.u_fromTexture.value = this.fromTexture),
      (this.sharedUniforms.u_toTexture.value = this.toTexture));
  }
  setSize(e, t) {
    if (this.width !== e || this.height !== t) {
      ((this.hasSizeChanged = !0),
        (this.width = e),
        (this.height = t),
        this.resolution.set(e, t),
        this.texelSize.set(1 / e, 1 / t));
      const r = (t / Math.sqrt(e * e + t * t)) * 2;
      (this.aspect.set((e / t) * r, r),
        this.sceneFlatRenderTarget.setSize(e, t),
        this.sceneMsRenderTarget.setSize(e, t),
        this.fromRenderTarget.setSize(e, t),
        this.toRenderTarget.setSize(e, t));
    }
  }
  dispose() {
    (this.fromRenderTarget && this.fromRenderTarget.dispose(),
      this.toRenderTarget && this.toRenderTarget.dispose(),
      this.sceneMsRenderTarget && this.sceneMsRenderTarget.dispose(),
      this.sceneFlatRenderTarget && this.sceneFlatRenderTarget.dispose());
  }
  _filterQueue(e) {
    return e.enabled && e.needsRender();
  }
  renderMaterial(e, t) {
    ((this.mesh.material = e), fboHelper.renderMesh(this.mesh, t));
  }
  checkSceneRt() {
    ((this.sceneRenderTarget = properties.isSmaaEnabled
      ? this.sceneFlatRenderTarget
      : this.sceneMsRenderTarget),
      (this.sceneTexture = this.sceneRenderTarget.texture),
      (this.sharedUniforms.u_sceneTexture.value = this.sceneTexture));
  }
  render(e, t, r) {
    if (!fboHelper.renderer) return;
    ((this.scene = e), (this.camera = t), (this.mesh.geometry = this.geom));
    const n = this.queue.filter(this._filterQueue),
      a = this.sharedUniforms;
    if (
      (n.sort((l, c) =>
        l.renderOrder == c.renderOrder ? 0 : l.renderOrder - c.renderOrder,
      ),
      this.checkSceneRt(),
      (a.u_cameraNear.value = t.near),
      (a.u_cameraFar.value = t.far),
      (a.u_cameraFovRad.value = (t.fov / 180) * Math.PI),
      this.onBeforeSceneRendered.dispatch(),
      n.length)
    ) {
      (fboHelper.renderer.setRenderTarget(this.sceneRenderTarget),
        fboHelper.renderer.render(e, t),
        fboHelper.renderer.setRenderTarget(null),
        fboHelper.copy(this.sceneRenderTarget.texture, this.fromRenderTarget),
        this.onAfterSceneRendered.dispatch(this.sceneRenderTarget));
      const l = fboHelper.getColorState();
      fboHelper.renderer.autoClear = !1;
      for (let c = 0, u = n.length; c < u; c++) {
        const f = c === u - 1 && r,
          p = n[c];
        (p.setPostprocessing(this), p.render(this, f));
      }
      fboHelper.setColorState(l);
    } else
      (fboHelper.renderer.render(e, t), this.onAfterSceneRendered.dispatch());
    (this.onAfterRendered.dispatch(), (this.hasSizeChanged = !1));
  }
}
const smaaBlendVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[2];void SMAANeighborhoodBlendingVS(vec2 texcoord){v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-1.0,0.0,0.0,1.0);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(1.0,0.0,0.0,-1.0);}void main(){v_uv=position.xy*0.5+0.5;SMAANeighborhoodBlendingVS(v_uv);gl_Position=vec4(position,1.0);}`,
  smaaBlendFrag = `#define GLSLIFY 1
uniform sampler2D u_weightsTexture;uniform sampler2D u_texture;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[2];vec4 SMAANeighborhoodBlendingPS(vec2 texcoord,vec4 offset[2],sampler2D colorTex,sampler2D blendTex){vec4 a;a.xz=texture2D(blendTex,texcoord).xz;a.y=texture2D(blendTex,offset[1].zw).g;a.w=texture2D(blendTex,offset[1].xy).a;if(dot(a,vec4(1.0,1.0,1.0,1.0))<1e-5){return texture2D(colorTex,texcoord,0.0);}else{vec2 offset;offset.x=a.a>a.b ? a.a :-a.b;offset.y=a.g>a.r ?-a.g : a.r;if(abs(offset.x)>abs(offset.y)){offset.y=0.0;}else{offset.x=0.0;}vec4 C=texture2D(colorTex,texcoord,0.0);texcoord+=sign(offset)*u_texelSize;vec4 Cop=texture2D(colorTex,texcoord,0.0);float s=abs(offset.x)>abs(offset.y)? abs(offset.x): abs(offset.y);C.xyz=pow(abs(C.xyz),vec3(2.2));Cop.xyz=pow(abs(Cop.xyz),vec3(2.2));vec4 mixed=mix(C,Cop,s);mixed.xyz=pow(abs(mixed.xyz),vec3(1.0/2.2));return mixed;}}void main(){gl_FragColor=SMAANeighborhoodBlendingPS(v_uv,v_offsets,u_texture,u_weightsTexture);}`,
  smaaEdgesVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];void SMAAEdgeDetectionVS(vec2 texcoord){v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-1.0,0.0,0.0,1.0);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(1.0,0.0,0.0,-1.0);v_offsets[2]=texcoord.xyxy+u_texelSize.xyxy*vec4(-2.0,0.0,0.0,2.0);}void main(){v_uv=position.xy*0.5+0.5;SMAAEdgeDetectionVS(v_uv);gl_Position=vec4(position,1.0);}`,
  smaaEdgesFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv;varying vec4 v_offsets[3];vec4 SMAAColorEdgeDetectionPS(vec2 texcoord,vec4 offset[3],sampler2D colorTex){vec2 threshold=vec2(SMAA_THRESHOLD,SMAA_THRESHOLD);vec4 delta;vec3 C=texture2D(colorTex,texcoord).rgb;vec3 Cleft=texture2D(colorTex,offset[0].xy).rgb;vec3 t=abs(C-Cleft);delta.x=max(max(t.r,t.g),t.b);vec3 Ctop=texture2D(colorTex,offset[0].zw).rgb;t=abs(C-Ctop);delta.y=max(max(t.r,t.g),t.b);vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0,1.0))==0.0)discard;vec3 Cright=texture2D(colorTex,offset[1].xy).rgb;t=abs(C-Cright);delta.z=max(max(t.r,t.g),t.b);vec3 Cbottom=texture2D(colorTex,offset[1].zw).rgb;t=abs(C-Cbottom);delta.w=max(max(t.r,t.g),t.b);float maxDelta=max(max(max(delta.x,delta.y),delta.z),delta.w);vec3 Cleftleft=texture2D(colorTex,offset[2].xy).rgb;t=abs(C-Cleftleft);delta.z=max(max(t.r,t.g),t.b);vec3 Ctoptop=texture2D(colorTex,offset[2].zw).rgb;t=abs(C-Ctoptop);delta.w=max(max(t.r,t.g),t.b);maxDelta=max(max(maxDelta,delta.z),delta.w);edges.xy*=step(0.5*maxDelta,delta.xy);return vec4(edges,0.0,0.0);}void main(){gl_FragColor=SMAAColorEdgeDetectionPS(v_uv,v_offsets,u_texture);}`,
  smaaWeightsVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];varying vec2 v_pixcoord;void SMAABlendingWeightCalculationVS(vec2 texcoord){v_pixcoord=texcoord/u_texelSize;v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-0.25,0.125,1.25,0.125);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(-0.125,0.25,-0.125,-1.25);v_offsets[2]=vec4(v_offsets[0].xz,v_offsets[1].yw)+vec4(-2.0,2.0,-2.0,2.0)*u_texelSize.xxyy*float(SMAA_MAX_SEARCH_STEPS);}void main(){v_uv=position.xy*0.5+0.5;SMAABlendingWeightCalculationVS(v_uv);gl_Position=vec4(position,1.0);}`,
  smaaWeightsFrag = `#define GLSLIFY 1
#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * u_texelSize, 0.0 )
uniform sampler2D u_edgesTexture;uniform sampler2D u_areaTexture;uniform sampler2D u_searchTexture;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];varying vec2 v_pixcoord;vec2 round2(vec2 x){return sign(x)*floor(abs(x)+0.5);}float SMAASearchLength(sampler2D searchTex,vec2 e,float bias,float scale){e.r=bias+e.r*scale;return 255.0*texture2D(searchTex,e,0.0).r;}float SMAASearchXLeft(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord-=vec2(2.0,0.0)*u_texelSize;if(!(texcoord.x>end&&e.g>0.8281&&e.r==0.0))break;}texcoord.x+=0.25*u_texelSize.x;texcoord.x+=u_texelSize.x;texcoord.x+=2.0*u_texelSize.x;texcoord.x-=u_texelSize.x*SMAASearchLength(searchTex,e,0.0,0.5);return texcoord.x;}float SMAASearchXRight(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord+=vec2(2.0,0.0)*u_texelSize;if(!(texcoord.x<end&&e.g>0.8281&&e.r==0.0))break;}texcoord.x-=0.25*u_texelSize.x;texcoord.x-=u_texelSize.x;texcoord.x-=2.0*u_texelSize.x;texcoord.x+=u_texelSize.x*SMAASearchLength(searchTex,e,0.5,0.5);return texcoord.x;}float SMAASearchYUp(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord+=vec2(0.0,2.0)*u_texelSize;if(!(texcoord.y>end&&e.r>0.8281&&e.g==0.0))break;}texcoord.y-=0.25*u_texelSize.y;texcoord.y-=u_texelSize.y;texcoord.y-=2.0*u_texelSize.y;texcoord.y+=u_texelSize.y*SMAASearchLength(searchTex,e.gr,0.0,0.5);return texcoord.y;}float SMAASearchYDown(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord-=vec2(0.0,2.0)*u_texelSize;if(!(texcoord.y<end&&e.r>0.8281&&e.g==0.0))break;}texcoord.y+=0.25*u_texelSize.y;texcoord.y+=u_texelSize.y;texcoord.y+=2.0*u_texelSize.y;texcoord.y-=u_texelSize.y*SMAASearchLength(searchTex,e.gr,0.5,0.5);return texcoord.y;}vec2 SMAAArea(sampler2D areaTex,vec2 dist,float e1,float e2,float offset){vec2 texcoord=float(SMAA_AREATEX_MAX_DISTANCE)*round2(4.0*vec2(e1,e2))+dist;texcoord=SMAA_AREATEX_PIXEL_SIZE*texcoord+(0.5*SMAA_AREATEX_PIXEL_SIZE);texcoord.y+=SMAA_AREATEX_SUBTEX_SIZE*offset;return texture2D(areaTex,texcoord,0.0).rg;}vec4 SMAABlendingWeightCalculationPS(vec2 texcoord,vec2 pixcoord,vec4 offset[3],sampler2D edgesTex,sampler2D areaTex,sampler2D searchTex,ivec4 subsampleIndices){vec4 weights=vec4(0.0,0.0,0.0,0.0);vec2 e=texture2D(edgesTex,texcoord).rg;if(e.g>0.0){vec2 d;vec2 coords;coords.x=SMAASearchXLeft(edgesTex,searchTex,offset[0].xy,offset[2].x);coords.y=offset[1].y;d.x=coords.x;float e1=texture2D(edgesTex,coords,0.0).r;coords.x=SMAASearchXRight(edgesTex,searchTex,offset[0].zw,offset[2].y);d.y=coords.x;d=d/u_texelSize.x-pixcoord.x;vec2 sqrt_d=sqrt(abs(d));coords.y-=1.0*u_texelSize.y;float e2=SMAASampleLevelZeroOffset(edgesTex,coords,ivec2(1,0)).r;weights.rg=SMAAArea(areaTex,sqrt_d,e1,e2,float(subsampleIndices.y));}if(e.r>0.0){vec2 d;vec2 coords;coords.y=SMAASearchYUp(edgesTex,searchTex,offset[1].xy,offset[2].z);coords.x=offset[0].x;d.x=coords.y;float e1=texture2D(edgesTex,coords,0.0).g;coords.y=SMAASearchYDown(edgesTex,searchTex,offset[1].zw,offset[2].w);d.y=coords.y;d=d/u_texelSize.y-pixcoord.y;vec2 sqrt_d=sqrt(abs(d));coords.y-=1.0*u_texelSize.y;float e2=SMAASampleLevelZeroOffset(edgesTex,coords,ivec2(0,1)).g;weights.ba=SMAAArea(areaTex,sqrt_d,e1,e2,float(subsampleIndices.x));}return weights;}void main(){gl_FragColor=SMAABlendingWeightCalculationPS(v_uv,v_pixcoord,v_offsets,u_edgesTexture,u_areaTexture,u_searchTexture,ivec4(0.0));}`;

export { Postprocessing };
export default Postprocessing;

globalThis.Postprocessing = Postprocessing;
