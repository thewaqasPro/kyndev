const getBlueNoiseShader = `#define GLSLIFY 1
uniform sampler2D u_blueNoiseTexture;uniform vec2 u_blueNoiseTexelSize;uniform vec2 u_blueNoiseCoordOffset;vec3 getBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize+u_blueNoiseCoordOffset).rgb;}vec3 getStaticBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize).rgb;}`;
globalThis.getBlueNoiseShader = getBlueNoiseShader;

/**
 * Void-and-Cluster Blue Noise Matrices for Raymarching & Dithering
 */
class BlueNoise {
  sharedUniforms = {
    u_blueNoiseTexture: { value: null },
    u_blueNoiseLinearTexture: { value: null },
    u_blueNoiseTexelSize: { value: null },
    u_blueNoiseCoordOffset: { value: new Vector2() },
  };
  TEXTURE_SIZE = 128;
  preInit() {
    let e = new Texture();
    ((e.generateMipmaps = !1),
      (e.minFilter = e.magFilter = LinearFilter),
      (e.wrapS = e.wrapT = RepeatWrapping));
    let t = new Texture(
      properties.loader.add(settings.TEXTURE_PATH + "LDR_RGB1_0.png", {
        weight: 55,
        onLoad: function () {
          ((t.needsUpdate = !0), (e.needsUpdate = !0));
        },
      }).content,
    );
    ((e.image = t.image),
      (t.generateMipmaps = !1),
      (t.minFilter = t.magFilter = NearestFilter),
      (t.wrapS = t.wrapT = RepeatWrapping),
      (this.sharedUniforms.u_blueNoiseTexture.value = t),
      (this.sharedUniforms.u_blueNoiseLinearTexture.value = e),
      (this.sharedUniforms.u_blueNoiseTexelSize.value = new Vector2(
        1 / this.TEXTURE_SIZE,
        1 / this.TEXTURE_SIZE,
      )),
      shaderHelper.addChunk("getBlueNoise", getBlueNoiseShader));
  }
  update(e) {
    this.sharedUniforms.u_blueNoiseCoordOffset.value.set(
      Math.random(),
      Math.random(),
    );
  }
}
const blueNoise = new BlueNoise();
globalThis.blueNoise = blueNoise;
const
  COLORS$1 = settings.BALLOON_COLOR
    ? ["#" + settings.BALLOON_COLOR]
    : ["#061dfb", "#ADFF00", "#f6000e", "#7e09f5", "#ffc000"],
  colorIndex = Math.floor(Math.random() * COLORS$1.length),
  fancyColor = COLORS$1[colorIndex],
  _c$1 = new Color(fancyColor);
_c$1.offsetHSL(0, 0, 0.5);
let SOFT_PLASTIC, HARD_PLASTIC, GLASS, STONE;
SOFT_PLASTIC =
  HARD_PLASTIC =
  GLASS =
  STONE =
    { density: 1, friction: 2, restitution: 0.8 };
let sphereData = [
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: fancyColor,
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !0,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...SOFT_PLASTIC,
  },
  {
    color: "#ffffff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !0,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...STONE,
  },
  {
    color: "#111",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: !1,
    isRough: !1,
    isColored: !1,
    isBlackWhite: !1,
    radius: 1,
    ...HARD_PLASTIC,
  },
];
browser$1.isMobile ||
  sphereData.push(
    {
      color: "#fff",
      sss: 0,
      sssColor: "#111",
      isSemitransparent: !0,
      isRough: !0,
      isColored: !1,
      isBlackWhite: !0,
      radius: 1,
      ...GLASS,
    },
    {
      color: "#" + _c$1.getHexString(),
      sss: 0,
      sssColor: "#111",
      isSemitransparent: !0,
      isRough: !0,
      isColored: !0,
      isBlackWhite: !1,
      radius: 1,
      ...GLASS,
    },
  );
const SPHERES_DATA = sphereData,
  vert$k = `#define GLSLIFY 1
uniform vec2 u_clipScale;uniform vec2 u_clipOffset;varying vec2 v_uv;void main(){vec3 pos=position;vec3 absPos=abs(position);if(max(absPos.x,absPos.y)<0.9){pos.xy=pos.xy*u_clipScale+u_clipOffset;pos*=2.;}gl_Position=vec4(pos,1.0);v_uv=vec2(pos.x,pos.y)*0.5+0.5;}`,
  frag$o = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform vec3 u_colorPaint;uniform float u_aspect;uniform vec2 u_smooth;uniform vec2 u_resolution;uniform float u_activeRatio;uniform sampler2D u_screenPaintTexture;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec2 q=vec2(v_uv-0.5);q.x*=u_aspect;float dst=length(q);dst=smoothstep(u_smooth.x,u_smooth.y,dst);vec3 color=mix(u_color0,u_color1,0.925+0.075*dst);color+=noise*0.004;gl_FragColor.rgb=color;gl_FragColor.a=0.0;}`,
  frag$n = `#define GLSLIFY 1
uniform sampler2D u_lowPaintTexture;uniform sampler2D u_prevPaintTexture;uniform vec2 u_paintTexelSize;uniform vec2 u_scrollOffset;uniform vec4 u_drawFrom;uniform vec4 u_drawTo;uniform float u_pushStrength;uniform vec3 u_dissipations;uniform vec2 u_vel;varying vec2 v_uv;vec2 sdSegment(in vec2 p,in vec2 a,in vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return vec2(length(pa-ba*h),h);}
#ifdef USE_NOISE
uniform float u_curlScale;uniform float u_curlStrength;vec2 hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yzx+33.33);return fract((p3.xx+p3.yz)*p3.zy)*2.0-1.0;}vec3 noised(in vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);vec2 du=30.0*f*f*(f*(f-2.0)+1.0);vec2 ga=hash(i+vec2(0.0,0.0));vec2 gb=hash(i+vec2(1.0,0.0));vec2 gc=hash(i+vec2(0.0,1.0));vec2 gd=hash(i+vec2(1.0,1.0));float va=dot(ga,f-vec2(0.0,0.0));float vb=dot(gb,f-vec2(1.0,0.0));float vc=dot(gc,f-vec2(0.0,1.0));float vd=dot(gd,f-vec2(1.0,1.0));return vec3(va+u.x*(vb-va)+u.y*(vc-va)+u.x*u.y*(va-vb-vc+vd),ga+u.x*(gb-ga)+u.y*(gc-ga)+u.x*u.y*(ga-gb-gc+gd)+du*(u.yx*(va-vb-vc+vd)+vec2(vb,vc)-va));}
#endif
void main(){vec2 res=sdSegment(gl_FragCoord.xy,u_drawFrom.xy,u_drawTo.xy);vec2 radiusWeight=mix(u_drawFrom.zw,u_drawTo.zw,res.y);float d=1.0-smoothstep(-0.01,radiusWeight.x,res.x);vec4 lowData=texture2D(u_lowPaintTexture,v_uv-u_scrollOffset);vec2 velInv=(0.5-lowData.xy)*u_pushStrength;
#ifdef USE_NOISE
vec3 noise3=noised(gl_FragCoord.xy*u_curlScale*(1.0-lowData.xy));vec2 noise=noised(gl_FragCoord.xy*u_curlScale*(2.0-lowData.xy*(0.5+noise3.x)+noise3.yz*0.1)).yz;velInv+=noise*(lowData.z+lowData.w)*u_curlStrength;
#endif
vec4 data=texture2D(u_prevPaintTexture,v_uv-u_scrollOffset+velInv*u_paintTexelSize);data.xy-=0.5;vec4 delta=(u_dissipations.xxyz-1.0)*data;vec2 newVel=u_vel*d;delta+=vec4(newVel,radiusWeight.yy*d);delta.zw=sign(delta.zw)*max(vec2(0.004),abs(delta.zw));data+=delta;data.xy+=0.5;gl_FragColor=clamp(data,vec4(0.0),vec4(1.0));}`;
let _v$4 = new Vector2();

export { BlueNoise, blueNoise };
export default blueNoise;
