import { Stage3D, Visuals, visuals } from "../../webgl/Stage3D.js";
/**
 * 3D Hero Scene: Jacks Rigid-body Physics Simulation & Dynamic Balloons
 */
import * as THREE from "../../three.js";

const vert$l = `#define GLSLIFY 1
attribute vec3 daoN;attribute vec3 daoP;attribute float ao;attribute float thickness;attribute vec3 SN;uniform vec3 u_lightPosition;uniform vec4 u_selfPositionRadius;uniform vec4 u_selfRotation;uniform float u_time;varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_smoothViewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_ao;varying float v_thickness;varying float v_selfShadow;vec3 qrotate(vec3 v,vec4 q){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){v_localPosition=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;vec3 worldPosition=(modelMatrix*vec4(position,1.)).xyz;vec4 invertedQuat=vec4(-u_selfRotation.xyz,u_selfRotation.w);vec3 L=(u_lightPosition-worldPosition)/u_selfPositionRadius.w;L=normalize(qrotate(L,invertedQuat));vec3 dao=mix(daoN,daoP,sign(L)*.5+.5);vec3 absDir=abs(L);float selfShadow=dot(absDir,dao)/(absDir.x+absDir.y+absDir.z);selfShadow=min(pow(selfShadow*3.,0.3)*1.45,1.);v_worldPosition=worldPosition;v_viewNormal=normalMatrix*normal;v_smoothViewNormal=normalMatrix*SN;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_ao=ao;v_thickness=thickness;v_selfShadow=selfShadow;}`,
  frag$p = `#define GLSLIFY 1
varying vec3 v_viewNormal;varying vec3 v_smoothViewNormal;varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_ao;varying float v_selfShadow;uniform vec4 u_nearPositionRadiusList[NEIGHBOUR_COUNT];uniform vec4 u_nearRotationList[NEIGHBOUR_COUNT];uniform vec3 u_nearColorList[NEIGHBOUR_COUNT];uniform vec2 u_nearTransparencyLumaList[NEIGHBOUR_COUNT];uniform float u_roughness;uniform vec3 u_bgColor;uniform vec3 u_color;uniform float u_time;uniform mat4 projectionMatrix;uniform sampler2D u_matcap;uniform vec3 u_lightPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
varying float v_thickness;
#include <textureBicubic>
#include <getBlueNoise>
#ifdef IS_SEMITRANSPARENT_BACK
uniform sampler2D u_sceneTexture;
#endif
#ifdef IS_SEMITRANSPARENT
uniform sampler2D u_sceneTexture;uniform sampler2D u_blurredTextures[4];uniform vec2 u_blurredTextureSizes[4];vec4 lodSample(vec2 uv,float lod){lod=clamp(lod,1.,3.999);float lodFloor=floor(lod);float lodFract=lod-lodFloor;vec4 mapFrom;vec4 mapTo;if(lodFloor<1.5){mapFrom=textureBicubic(u_blurredTextures[0],uv,u_blurredTextureSizes[0]);mapTo=textureBicubic(u_blurredTextures[1],uv,u_blurredTextureSizes[1]);}else if(lodFloor<2.5){mapFrom=textureBicubic(u_blurredTextures[1],uv,u_blurredTextureSizes[1]);mapTo=textureBicubic(u_blurredTextures[2],uv,u_blurredTextureSizes[2]);}else{mapFrom=textureBicubic(u_blurredTextures[2],uv,u_blurredTextureSizes[2]);mapTo=textureBicubic(u_blurredTextures[3],uv,u_blurredTextureSizes[3]);}return mix(mapFrom,mapTo,lodFract);}
#endif
uniform float u_sss;uniform vec3 u_sssColor;vec3 qrotate(vec3 v,vec4 q){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}float cylIntersect(in vec3 ro,in vec3 rd,in vec3 a,in vec3 b,float ra){vec3 ba=b-a;vec3 oc=ro-a;float baba=dot(ba,ba);float bard=dot(ba,rd);float baoc=dot(ba,oc);float k2=baba-bard*bard;float k1=baba*dot(oc,rd)-baoc*bard;float k0=baba*dot(oc,oc)-baoc*baoc-ra*ra*baba;float h=k1*k1-k2*k0;if(h>=0.){h=sqrt(h);float t=(-k1-h)/k2;float y=baoc+t*bard;if(y>0.0&&y<baba)return t;t=(((y<0.0)? 0.0 : baba)-baoc)/bard;if(abs(k1+k2*t)<h){return t;}}return 200.;}bool centerSphereHitTest(in vec3 ro,in vec3 rd,in float r){float b=dot(ro,rd);float c=dot(ro,ro)-r*r;return b*b-c>=0.0;}vec3 getCrossAoShadowIntersect(in vec3 p,in vec3 n,in vec3 l,in vec3 refl,in vec4 objPosRadius,in vec4 quaternion,in float intersectDist){float ao=1.0;float shadow=1.0;float intersect=100.0;float R=0.666667*objPosRadius.w;float r=0.333333*objPosRadius.w;vec3 centerPos=objPosRadius.xyz;vec3 invertedPosOffset=-objPosRadius.xyz;vec4 invertedQuat=vec4(-quaternion.xyz,quaternion.w);p=qrotate(p+invertedPosOffset,invertedQuat);l=normalize(qrotate(l+invertedPosOffset,invertedQuat));n=qrotate(n,invertedQuat);refl=qrotate(refl,invertedQuat);vec3 ro=p,pa=vec3(-R),pb=vec3(R);float k=1.;vec3 ba=pb-pa;vec3 oa=ro-pa;vec3 oaX=vec3(oa.x,ro.y,ro.z);vec3 oaY=vec3(ro.x,oa.y,ro.z);vec3 oaZ=vec3(ro.x,ro.y,oa.z);vec3 baba=ba*ba;vec3 oaba=oa*ba;vec3 h3=clamp(oaba/baba,vec3(0.),vec3(1.));vec3 odX=oaX-vec3(h3.x*ba.x,0.,0.);vec3 odY=oaY-vec3(0.,h3.y*ba.y,0.);vec3 odZ=oaZ-vec3(0.,0.,h3.z*ba.z);vec3 dl3=vec3(length(odX),length(odY),length(odZ));vec3 o3=vec3(1.)-saturate(vec3(dot(-odX,n),dot(-odY,n),dot(-odZ,n))*r*r/(dl3*dl3*dl3));o3=sqrt(o3*o3*o3);ao=o3.x*o3.y*o3.z;vec3 oad=vec3(dot(oaX,l),dot(oaY,l),dot(oaZ,l));vec3 dba=l*ba;vec3 thDiv=1./(baba-dba*dba);vec3 thX3=max((-oad*baba+dba*oaba)*thDiv,vec3(0.0001));vec3 thY3=saturate((oaba-oad*dba)*thDiv);vec3 pp=pa+ba*thY3;vec3 qqX=ro+l*thX3.x;vec3 qqY=ro+l*thX3.y;vec3 qqZ=ro+l*thX3.z;vec3 dd=vec3(length(vec3(pp.x,0.,0.)-qqX),length(vec3(0.,pp.y,0.)-qqY),length(vec3(0.,0.,pp.z)-qqZ))-r;vec3 s=saturate(k*dd/thX3+0.5);s=s*s*(3.0-2.0*s);shadow=s.x*s.y*s.z;vec3 a;vec3 b;r*=0.9;if((intersectDist+2.05>length(p)-objPosRadius.w)&&centerSphereHitTest(ro,refl,objPosRadius.w*1.1)){a=vec3(-objPosRadius.w,0.0,0.0);b=vec3(objPosRadius.w,0.0,0.0);intersect=min(intersect,cylIntersect(p,refl,a,b,r));a=vec3(0.0,-objPosRadius.w,0.0);b=vec3(0.0,objPosRadius.w,0.0);intersect=min(intersect,cylIntersect(p,refl,a,b,r));a=vec3(0.0,0.0,-objPosRadius.w);b=vec3(0.0,0.0,objPosRadius.w);intersect=min(intersect,cylIntersect(p,refl,a,b,r));}return vec3(ao,shadow,intersect);}vec2 getUvFromPos(vec3 v){vec4 ndcPos=projectionMatrix*viewMatrix*vec4(v,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;return refractionCoords;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 filmicToneMapping(vec3 color){color=max(vec3(0.),color-vec3(0.004));color=(color*(6.2*color+.5))/(color*(6.2*color+1.7)+0.06);return color;}vec3 hueShift(vec3 color,float hue){const vec3 k=vec3(0.57735,0.57735,0.57735);float cosAngle=cos(hue);return vec3(color*cosAngle+cross(k,color)*sin(hue)+k*dot(k,color)*(1.0-cosAngle));}vec3 hue2RGBSmooth(in float hue){vec3 rgb=clamp(abs(mod(hue*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return rgb*rgb*(3.0-2.0*rgb);}void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+vec2(3.,9.));vec3 blueNoise2=getBlueNoise(gl_FragCoord.xy+vec2(56.,39.));float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 viewNormal=faceDirection*normalize(v_viewNormal);vec3 smoothViewNormal=faceDirection*normalize(v_smoothViewNormal);vec3 V=normalize(cameraPosition-v_worldPosition);vec3 N=inverseTransformDirection(viewNormal,viewMatrix);vec3 SN=inverseTransformDirection(smoothViewNormal,viewMatrix);float roughness=min(0.9,u_roughness+dot(vec3(1.0),fwidth((viewNormal))));vec3 reflectView=reflect(-V,N);vec3 reflectViewBN=normalize(reflectView+(blueNoise-.5)*(roughness>0.5 ? 0.5 : 0.01));vec3 worldToLight=u_lightPosition-v_worldPosition;vec3 L=normalize(worldToLight);float NdV=clamp(abs(dot(N,V)),0.001,1.0);float NdL=clamp(dot(N,L),0.001,1.0);vec3 gi=vec3(1.0);vec4 reflections=vec4(0.,0.,0.,100.);float ao=1.0;float shadow=1.0;float alpha=0.0;vec3 albedo=vec3(1.0);for(int i=0;i<NEIGHBOUR_COUNT;i++){vec3 nearColor=u_nearColorList[i];vec2 nearTransparencyLuma=u_nearTransparencyLumaList[i].xy;vec3 aoShadowIntersect=getCrossAoShadowIntersect(v_worldPosition,N,worldToLight,reflectViewBN,u_nearPositionRadiusList[i],u_nearRotationList[i],reflections.w);float _ao=aoShadowIntersect.r;_ao=saturate(_ao+0.5*nearTransparencyLuma.x);ao*=_ao;shadow*=aoShadowIntersect.g;gi+=(1.0-0.9*nearTransparencyLuma.y)*nearColor*3.0*min(1.,(1.0-_ao*_ao)/0.7);float neighNearFarDist=aoShadowIntersect.b;if(neighNearFarDist<reflections.w&&neighNearFarDist>0.0001){reflections=vec4(vec3((1.0-0.5*nearTransparencyLuma.x)*nearColor),neighNearFarDist);}}reflections.rgb*=1./((0.2+roughness*0.8)*reflections.w*10.+4.);reflections=reflections*ao*v_ao;gi/=float(NEIGHBOUR_COUNT);
#if defined(IS_SEMITRANSPARENT) || defined(IS_SEMITRANSPARENT_BACK)
float ior=2.4;
#ifdef IS_SEMITRANSPARENT
vec3 refractionVector=refract(-V,SN,1.0/ior);vec2 refractionCoords=getUvFromPos(v_worldPosition+refractionVector*0.3);float lod=2.5+v_thickness;vec4 blur=lodSample(refractionCoords,lod);albedo=blur.rgb*(0.75+u_color*0.4);albedo=albedo*0.8+(0.125+0.2*v_selfShadow*v_ao)*u_color;
#else
vec3 refractionVector=refract(-V,-N,ior);vec2 refractionCoords=getUvFromPos(v_worldPosition+refractionVector*ao*0.5);albedo=texture2D(u_sceneTexture,refractionCoords).rgb;albedo=albedo*0.5+(0.05+0.2*v_selfShadow*v_ao)*u_color;
#endif
#endif
albedo*=u_color;vec3 viewDir=normalize(v_viewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);
#ifdef IS_SEMITRANSPARENT
vec2 uvPerturbed=vec2(dot(x,smoothViewNormal),dot(y,smoothViewNormal))*0.5+0.5;
#else
vec2 uvPerturbed=vec2(dot(x,viewNormal),dot(y,viewNormal))*0.5+0.5;
#endif
vec3 matcapMap=texture2D(u_matcap,uvPerturbed).rgb;vec3 matcapDiff=vec3(matcapMap.r);vec3 matcapSpec=vec3(roughness>.5 ? matcapMap.g : matcapMap.b);reflections.rgb*=0.75+0.25*shadow*v_selfShadow;matcapDiff=0.25+0.75*matcapDiff;matcapSpec=matcapSpec;shadow=0.6+0.4*shadow;float selfShadow=v_selfShadow;vec3 color;
#if defined(IS_SEMITRANSPARENT) || defined(IS_SEMITRANSPARENT_BACK)
float fresnel=(1.0-clamp(abs(dot(normalize(N+SN),V)),0.001,1.0))*(1.-v_thickness);color=albedo;color+=0.15*matcapDiff;color+=fresnel*albedo*0.5;
#ifdef IS_SEMITRANSPARENT
color+=reflections.rgb;color+=hue2RGBSmooth(viewNormal.z*v_ao*1.5)*pow(1.-v_thickness*0.75,2.)*max(vec3(0.),1.-matcapDiff)*0.2*dot(albedo,vec3(0.299,0.587,0.114));
#endif
color*=(selfShadow*0.35+0.65);color*=(ao*shadow*0.75+0.25);;
#else
color=albedo*matcapDiff+matcapSpec;color+=reflections.rgb;color*=ao;color+=gi;color*=selfShadow;color*=shadow;
#endif
gl_FragColor.rgb=color;gl_FragColor.a=max(0.,dot(color,vec3(0.299,0.587,0.114))*1.5-1.);gl_FragColor.rgb=filmicToneMapping(pow(gl_FragColor.rgb,vec3(2.2)));}`,
  prePassVert = `#define GLSLIFY 1
void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z+=0.002/gl_Position.w;}`,
  prePassFrag = `#define GLSLIFY 1
void main(){gl_FragColor=vec4(1.);}`;
const vert$k = `#define GLSLIFY 1
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
globalThis.vert$l = vert$l;
globalThis.frag$p = frag$p;
globalThis.prePassVert = prePassVert;
globalThis.prePassFrag = prePassFrag;
globalThis.vert$k = vert$k;
globalThis.frag$o = frag$o;

const COLORS$1 = settings.BALLOON_COLOR
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
const SPHERES_DATA = sphereData;

class HomeBalloonsBackground {
  container = new Object3D();
  mesh = null;
  activeRatio = 0;
  clipOffset = new Vector2();
  clipScale = new Vector2(1, 1);
  constructor() {}
  preInit() {}
  init() {
    let e = new BufferGeometry();
    (e.setAttribute(
      "position",
      new BufferAttribute(
        new Float32Array([
          0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0,
          -1, -1, 0, -0.5, -0.5, 0, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1,
        ]),
        3,
      ),
    ),
      e.setIndex(
        new BufferAttribute(
          new Uint16Array([
            3, 2, 7, 8, 9, 11, 11, 10, 8, 0, 5, 7, 0, 1, 5, 1, 4, 5, 1, 2, 4, 2,
            3, 4, 5, 6, 7, 6, 3, 7,
          ]),
          1,
        ),
      ),
      (this.mesh = new Mesh(
        e,
        new ShaderMaterial({
          uniforms: Object.assign(
            {
              u_color0: { value: new Color("#141515") },
              u_color1: { value: new Color("#141515") },
              u_colorPaint: { value: new Color("#1a2ffb") },
              u_aspect: { value: 1 },
              u_smooth: { value: new Vector2(0, 1) },
              u_clipScale: { value: this.clipScale },
              u_clipOffset: { value: this.clipOffset },
              u_time: { value: 0 },
              u_activeRatio: { value: 0 },
              u_resolution: { value: new Vector2() },
              u_screenPaintTexture:
                screenPaint.sharedUniforms.u_currPaintTexture,
            },
            blueNoise.sharedUniforms,
          ),
          vertexShader: vert$k,
          fragmentShader: frag$o,
          side: BackSide,
        }),
      )),
      (this.mesh.material.defines.NEIGHBOUR_COUNT =
        homeBalloons.NEIGHBOUR_COUNT + 1),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = -1e3),
      this.container.add(this.mesh));
  }
  resize(e, t) {}
  update(e) {
    this.mesh &&
      ((this.mesh.material.uniforms.u_activeRatio.value = this.activeRatio),
      (this.mesh.material.uniforms.u_time.value += 0.2 * e),
      (this.mesh.material.uniforms.u_aspect.value =
        properties.width / properties.height),
      this.mesh.material.uniforms.u_resolution.value.copy(
        properties.sharedUniforms.u_resolution.value,
      ),
      this.mesh.material.uniforms.u_color0.value.set(
        COLORS$1[properties.balloonsColorIndex],
      ));
  }
}
const homeBalloonsBackground = new HomeBalloonsBackground();
let random = math.getSeedRandomFn("balloonBody-25");
const GRAVITY_FACTOR = 40;
class HomeBalloonsBody {
  position0 = new Vector3();
  velocity0 = new Vector3();
  position = new Vector3();
  velocity = new Vector3();
  gravityVel = new Vector3();
  gravityAcc = new Vector3();
  gravityForce = new Vector3();
  angularVelocity = new Vector3();
  torque = new Vector3();
  quaternion = new Quaternion();
  radius = 1;
  mass = 1;
  volume = 1;
  density = 1;
  friction = 1;
  frictionTot = 0;
  restitution = 1;
  inertia = 0;
  constructor(e = 1, t = 1, r = 0.5, n = 0.5, a = !1) {
    (this.position0.set(
      (random() - 0.5) * 12,
      (random() - 0.5) * 12,
      a ? 7 + random() : (random() - 0.5) * 6,
    ),
      this.velocity0.copy(this.position0).multiplyScalar(-2),
      this.position.copy(this.position0),
      this.velocity.copy(this.velocity0),
      (this.radius = 1.05 * e),
      (this.density = t),
      (this.friction = r),
      (this.restitution = n),
      (this.volume = Math.PI * this.radius * 1.333333),
      (this.mass = this.volume * this.radius * this.radius * this.density),
      (this.inertia = this.mass * this.radius * this.radius * 0.4),
      this.reset());
  }
  reset() {
    (this.position.copy(this.position0), this.velocity.copy(this.velocity0));
  }
  applyImpulse() {
    (this.gravityForce.copy(this.position).negate().multiplyScalar(10),
      this.gravityAcc.copy(this.gravityForce),
      this.gravityForce
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .multiplyScalar(80),
      this.gravityAcc.add(this.gravityForce).multiplyScalar(1 / this.mass),
      this.velocity.negate(),
      this.velocity.add(this.gravityAcc));
  }
  updateGravity(e) {
    (this.gravityForce
      .copy(this.position)
      .negate()
      .multiplyScalar(GRAVITY_FACTOR),
      this.gravityAcc.copy(this.gravityForce).multiplyScalar(1 / this.mass),
      this.gravityAcc.multiplyScalar(1 / (1 + this.frictionTot)),
      this.velocity.addScaledVector(this.gravityAcc, e),
      (this.frictionTot *= 0.5));
  }
  update(e) {
    (this.position.addScaledVector(this.velocity, e),
      this.velocity.multiplyScalar(Math.pow(0.2, e)));
  }
}
const _mouse = new Vector3(),
  _mousePrev = new Vector3(),
  _vel = new Vector3(),
  _pos = new Vector3(),
  _v0$3 = new Vector3(),
  _v1$6 = new Vector3(),
  _p1$1 = new Vector3(),
  _normal = new Vector3(),
  _q$2 = new Quaternion(),
  _mousePushForce = new Vector3(),
  _mouseBA = new Vector3();
class HomeBalloonsPhysics {
  MOUSE_RADIUS = 0.025;
  MOUSE_INFLUENCE = 0.1;
  MOUSE_PUSH_FORCE = 0.12;
  bodies = [];
  isActive = !0;
  initWorld() {
    for (let e = 0; e < homeBalloons.NUM_BALLOONS; e++) {
      const t = homeBalloons.balloonList[e],
        {
          radius: r,
          density: n,
          friction: a,
          restitution: l,
          isSemitransparent: c,
        } = t,
        u = new HomeBalloonsBody(r, n, a, l, c);
      this.bodies.push(u);
    }
  }
  reset() {
    for (let e = 0; e < this.bodies.length; e++) this.bodies[e].reset();
  }
  update(e) {
    if (!this.isActive) return;
    (_p1$1.set(input.mouseXY.x, input.mouseXY.y, 0.5),
      _p1$1.unproject(properties.camera),
      _p1$1.sub(properties.camera.position).normalize());
    const r = (0 - properties.camera.position.z) / _p1$1.z;
    (_p1$1.multiplyScalar(r),
      _mouse.copy(properties.camera.position).add(_p1$1),
      _mousePushForce
        .copy(_mouse)
        .sub(_mousePrev)
        .multiplyScalar(this.MOUSE_PUSH_FORCE / e),
      _mouseBA.copy(_mouse).sub(properties.camera.position));
    let n = _mouseBA.lengthSq();
    _mousePrev.copy(_mouse);
    for (let a = 0; a < this.bodies.length; a++) {
      const l = this.bodies[a];
      (l.updateGravity(e), _vel.copy(l.velocity), _pos.copy(l.position));
      for (let p = a + 1; p < this.bodies.length; p++) {
        const g = this.bodies[p];
        (_v1$6.copy(g.velocity),
          _p1$1.copy(g.position),
          _normal.copy(_pos).sub(_p1$1));
        const v = _normal.length(),
          _ = l.radius + g.radius;
        if (v < _) {
          const T = Math.sqrt(l.friction * g.friction, 2);
          ((l.frictionTot += T),
            (g.frictionTot += T),
            _normal.normalize(),
            _normal.multiplyScalar(0.5 * (v - _)),
            _pos.sub(_normal),
            _p1$1.add(_normal),
            _normal.normalize());
          const M = _vel.dot(_normal),
            S = _v1$6.dot(_normal),
            b = l.mass,
            C = g.mass,
            w = l.restitution,
            R = g.restitution,
            E = (b * M + C * S - C * (M - S) * w) / (b + C),
            I = (b * M + C * S - b * (S - M) * R) / (b + C);
          (_vel.addScaledVector(_normal, (E - M) / (1 + T)),
            _v1$6.addScaledVector(_normal, (I - S) / (1 + T)),
            g.position.copy(_p1$1),
            g.velocity.copy(_v1$6));
        }
      }
      _v0$3.copy(_pos).sub(properties.camera.position);
      let c = _v0$3.dot(_mouseBA) / n;
      ((c =
        _v0$3.sub(_v1$6.copy(_mouseBA).multiplyScalar(c)).length() -
        l.radius -
        this.MOUSE_RADIUS),
        0 > c &&
          (_v0$3
            .copy(_pos)
            .sub(properties.camera.position)
            .cross(_mouseBA)
            .normalize(),
          _v1$6.copy(_mouseBA).cross(_v0$3).normalize(),
          _pos.sub(_v1$6.multiplyScalar(this.MOUSE_INFLUENCE * c)),
          _v1$6.multiplyScalar(-this.MOUSE_PUSH_FORCE / e),
          _vel.add(_v1$6),
          _vel.add(_mousePushForce)));
      let u = _pos.length();
      if (u > 0) {
        _v0$3.set(1, 1, 1).normalize();
        let p = 1 - Math.abs(_v0$3.dot(_v1$6.copy(_pos).normalize()));
        ((p *= e * math.fit(u, 0, 2, 0, 1) * 0.5),
          (p *= (a % 2) * 2 - 1),
          _q$2.setFromAxisAngle(_v0$3, p),
          _v1$6.copy(_pos).applyQuaternion(_q$2).sub(_v0$3.copy(_pos)),
          _vel.add(_v1$6));
      }
      _v0$3.cross(_vel);
      let f = _v0$3.length();
      ((f /= l.inertia),
        f > 0 &&
          (_v0$3.normalize(),
          _q$2.setFromAxisAngle(_v0$3, f * e),
          l.quaternion.premultiply(_q$2)),
        l.position.copy(_pos),
        l.velocity.copy(_vel),
        l.update(e));
    }
  }
}
const homeBalloonsPhysics = new HomeBalloonsPhysics();
let _v$3 = new Vector3(),
  _color = new Color(),
  _blackWhiteToggle = 0;
class HomeBalloons extends Stage3D {
  NUM_BALLOONS = 0;
  NEIGHBOUR_COUNT = -1;
  container = new Object3D();
  balloonList = [];
  prePassMeshList = [];
  _sortedBalloonList;
  instancedPositionRadiusAttribute;
  instancedPositionRadiusArray;
  instancedNearPositionRadiusAttributes = [];
  instancedNearPositionRadiusArrays = [];
  ratio = 0;
  cacheRT = null;
  cacheRTBlur0 = null;
  cacheRTBlur1 = null;
  cacheRTBlur2 = null;
  cacheRTBlur3 = null;
  sharedUniforms = {
    u_blurredTextures: { value: [] },
    u_blurredTextureSizes: { value: [] },
    u_matcap: { value: null },
    u_lightPosition: { value: new Vector3(10, 10, 5) },
  };
  isReady = !1;
  lockedIndex = -1;
  changeHomeHeroColorSignal = new MinSignal$2();
  constructor() {
    (super({
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 0),
        defaultLookAtPosition: new Vector3(0, 0, 0),
        cameraFov: 25,
        clearAlpha: 0,
      },
    }),
      (this.NUM_BALLOONS = SPHERES_DATA.length),
      (this.cacheRT = fboHelper.createRenderTarget(1, 1)),
      (this.cacheInterRT0 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheInterRT1 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheInterRT2 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheInterRT3 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheRTBlur0 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheRTBlur1 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheRTBlur2 = fboHelper.createRenderTarget(1, 1)),
      (this.cacheRTBlur3 = fboHelper.createRenderTarget(1, 1)),
      this.sharedUniforms.u_blurredTextures.value.push(
        this.cacheRTBlur0.texture,
      ),
      this.sharedUniforms.u_blurredTextures.value.push(
        this.cacheRTBlur1.texture,
      ),
      this.sharedUniforms.u_blurredTextures.value.push(
        this.cacheRTBlur2.texture,
      ),
      this.sharedUniforms.u_blurredTextures.value.push(
        this.cacheRTBlur3.texture,
      ),
      this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2()),
      this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2()),
      this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2()),
      this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2()));
  }
  preInit() {
    (properties.loader.add(
      settings.MODEL_PATH +
        "home/" +
        (browser$1.isMobile ? "cross_ld" : "cross") +
        ".buf",
      {
        onLoad: (e) => {
          this.geometry = e;
        },
      },
    ),
      properties.loader.add(
        `${settings.TEXTURE_PATH}home/${browser$1.isMobile ? "matcap_ld" : "matcap"}.exr`,
        {
          onLoad: (e) => {
            ((e && (e.minFilter = LinearFilter)),
              (this.sharedUniforms.u_matcap.value = e));
          },
        },
      ),
      homeBalloonsBackground.preInit(),
      this.changeHomeHeroColorSignal.add(() => {
        ((properties.balloonsColorIndex += 1),
          (properties.balloonsColorIndex = math.mod(
            properties.balloonsColorIndex,
            COLORS$1.length,
          )),
          (_blackWhiteToggle = 1 - _blackWhiteToggle),
          homeBalloonsPhysics.bodies.forEach((e) => e.applyImpulse()));
      }));
  }
  init() {
    let e = math.getSeedRandomFn("balloon24");
    this.NEIGHBOUR_COUNT = this.NUM_BALLOONS - 1;
    let t = new ShaderMaterial({
        uniforms: {},
        vertexShader: prePassVert,
        fragmentShader: prePassFrag,
        colorWrite: !1,
      }),
      r = new ShaderMaterial({
        uniforms: {},
        vertexShader: prePassVert,
        fragmentShader: prePassFrag,
        side: BackSide,
        colorWrite: !1,
      });
    for (let n = 0; n < this.NUM_BALLOONS; n++) {
      let a = SPHERES_DATA[n],
        {
          sssColor: l,
          name: c,
          color: u,
          isColored: f,
          sss: p,
          isSemitransparent: g,
          isRough: v,
          radius: _rawRadius,
          density: T,
          friction: M,
          restitution: S,
          isBlackWhite: b,
        } = a,
        _ = _rawRadius * (settings.BALLOON_SCALE || 0.85),
        C = this.geometry,
        w = new Vector4(),
        R = Object.assign(
          {
            u_color: { value: new Color() },
            u_bgColor: { value: new Color() },
            u_sssColor: { value: new Color() },
            u_matcap: this.sharedUniforms.u_matcap,
            u_lightPosition: this.sharedUniforms.u_lightPosition,
            u_sss: { value: 0 },
            u_roughness: { value: v ? 0.8 : 0.1 },
            u_selfPositionRadius: { value: w },
            u_selfRotation: { value: new Quaternion() },
            u_nearPositionRadiusList: { value: [] },
            u_nearRotationList: { value: [] },
            u_nearColorList: { value: [] },
            u_nearTransparencyLumaList: { value: [] },
            u_time: properties.sharedUniforms.u_time,
          },
          blueNoise.sharedUniforms,
        ),
        E = new Mesh(
          C,
          new ShaderMaterial({
            uniforms: R,
            vertexShader: vert$l,
            fragmentShader: frag$p,
          }),
        ),
        I = new Mesh(C, g ? r : t);
      ((E._prePassMesh = I),
        (I._mesh = E),
        this.prePassMeshList.push(I),
        (E.material.defines.NEIGHBOUR_COUNT = this.NEIGHBOUR_COUNT),
        (E.material.extensions.derivatives = !0),
        (E.frustumCulled = !1));
      for (let k = 0; k < this.NEIGHBOUR_COUNT; k++)
        ((E.material.uniforms.u_nearPositionRadiusList.value[k] =
          new Vector4()),
          (E.material.uniforms.u_nearRotationList.value[k] = new Quaternion()),
          (E.material.uniforms.u_nearColorList.value[k] = new Color()),
          (E.material.uniforms.u_nearTransparencyLumaList.value[k] =
            new Vector2()));
      (E.position.set(e() * 2, e() * 2 - 1, e() * 2 - 1),
        E.scale.setScalar(_),
        I.scale.setScalar(_),
        (w.w = _),
        this.add(E),
        this.add(I));
      let F = {
        name: c,
        mesh: E,
        radius: _,
        distance2: 0,
        distanceFromCamera: 0,
        selfPositionRadius: w,
        color: u,
        sss: p,
        isRough: v,
        isSemitransparent: g,
        sssColor: l,
        density: T,
        friction: M,
        restitution: S,
        isColored: f,
        isBlackWhite: b,
      };
      if (g) {
        ((E.onBeforeRender = this.onBeforeRenderFront.bind(this)),
          (E.material.uniforms.u_sceneTexture = {
            value: this.cacheRT.texture,
          }),
          (E.material.uniforms.u_blurredTextures =
            this.sharedUniforms.u_blurredTextures),
          (E.material.uniforms.u_blurredTextureSizes =
            this.sharedUniforms.u_blurredTextureSizes),
          (E.material.defines.IS_SEMITRANSPARENT = !0));
        let k = E.clone();
        ((k.material = new ShaderMaterial({
          uniforms: Object.assign(
            { u_sceneTexture: E.material.uniforms.u_sceneTexture },
            R,
          ),
          vertexShader: vert$l,
          fragmentShader: frag$p,
          side: 1,
        })),
          (k.onBeforeRender = this.onBeforeRenderBack.bind(this)),
          (k.material.defines.NEIGHBOUR_COUNT = this.NEIGHBOUR_COUNT),
          (k.material.defines.IS_SEMITRANSPARENT_BACK = !0),
          (k.material.extensions.derivatives = !0),
          this.add(k),
          (F.meshBack = k));
      }
      this.balloonList.push(F);
    }
    ((this._sortedBalloonList = this.balloonList.slice(0)),
      homeBalloonsBackground.init(),
      this.add(homeBalloonsBackground.container),
      homeBalloonsPhysics.initWorld(),
      taskManager.add(this),
      (this.isReady = !0));
  }
  onBeforeRenderFront() {
    let e = fboHelper.renderer,
      t = e.getRenderTarget();
    (fboHelper.clearMultisampleRenderTargetState(),
      fboHelper.copy(t.texture, this.cacheRT),
      blur.blur(
        6,
        0.5,
        this.cacheRT,
        this.cacheInterRT0,
        this.cacheRTBlur0,
        !0,
      ),
      blur.blur(
        6,
        0.5,
        this.cacheRTBlur0,
        this.cacheInterRT1,
        this.cacheRTBlur1,
        !0,
      ),
      blur.blur(
        6,
        0.5,
        this.cacheRTBlur1,
        this.cacheInterRT2,
        this.cacheRTBlur2,
        !0,
      ),
      blur.blur(
        6,
        0.5,
        this.cacheRTBlur2,
        this.cacheInterRT3,
        this.cacheRTBlur3,
        !0,
      ),
      this.sharedUniforms.u_blurredTextureSizes.value[0].set(
        this.cacheRTBlur0.width,
        this.cacheRTBlur0.height,
      ),
      this.sharedUniforms.u_blurredTextureSizes.value[1].set(
        this.cacheRTBlur1.width,
        this.cacheRTBlur1.height,
      ),
      this.sharedUniforms.u_blurredTextureSizes.value[2].set(
        this.cacheRTBlur2.width,
        this.cacheRTBlur2.height,
      ),
      this.sharedUniforms.u_blurredTextureSizes.value[3].set(
        this.cacheRTBlur3.width,
        this.cacheRTBlur3.height,
      ),
      e.setRenderTarget(t));
  }
  onBeforeRenderBack() {
    let e = fboHelper.renderer,
      t = e.getRenderTarget();
    (fboHelper.clearMultisampleRenderTargetState(),
      fboHelper.copy(t.texture, this.cacheRT),
      e.setRenderTarget(t));
  }
  resize(e, t) {
    this.cacheRT.setSize(e, t);
    let r = e >> 1,
      n = t >> 1;
    (this.cacheRTBlur0.setSize(r, n),
      (r = r >> 1),
      (n = n >> 1),
      this.cacheRTBlur1.setSize(r, n),
      (r = r >> 1),
      (n = n >> 1),
      this.cacheRTBlur2.setSize(r, n),
      (r = r >> 1),
      (n = n >> 1),
      this.cacheRTBlur3.setSize(r, n),
      homeBalloonsBackground.resize(r, n));
  }
  _sortDist2(e, t) {
    return e.distance2 - t.distance2;
  }
  _sortMeshDist2(e, t) {
    return e._mesh.distance2 - t._mesh.distance2;
  }
  syncProperties(e) {
    ((this.properties.defaultCameraPosition.z = math.fit(
      homePage.time,
      0.3,
      2,
      25,
      17.5,
      ease.backOut,
    )),
      (this.properties.cameraDollyZoomFovOffset = math.fit(
        homePage.time,
        0.3,
        3,
        100,
        0,
        ease.backOut,
      )));
  }
  updateColor() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      const t = this.balloonList[e];
      if (t.isColored) {
        const r = COLORS$1[properties.balloonsColorIndex];
        t.isSemitransparent
          ? (_color.set(r),
            _color.offsetHSL(0, 0, 0.3),
            (t.color = "#" + _color.getHexString()))
          : (t.color = r);
      } else t.isBlackWhite && (t.color = _blackWhiteToggle ? "#888" : "#eee");
    }
  }
  updateUniforms() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      let t = this.balloonList[e],
        { isSemitransparent: r, color: n, sss: a, sssColor: l } = t;
      (t.mesh.material.uniforms.u_bgColor.value.copy(properties.bgColor),
        t.mesh.material.uniforms.u_color.value.set(n),
        (t.mesh.material.uniforms.u_sss.value = a),
        t.mesh.material.uniforms.u_sssColor.value.set(l),
        r &&
          (t.meshBack.material.uniforms.u_bgColor.value.copy(
            properties.bgColor,
          ),
          t.meshBack.material.uniforms.u_color.value.set(n),
          (t.meshBack.material.uniforms.u_sss.value = a),
          t.meshBack.material.uniforms.u_sssColor.value.set(l)));
    }
  }
  updateSorting() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      let t = this.balloonList[e];
      for (let r = 0; r < this.NUM_BALLOONS; r++) {
        let n = this._sortedBalloonList[r];
        t == n
          ? (n.distance2 = 0)
          : (n.distance2 = t.mesh.position.distanceToSquared(n.mesh.position));
      }
      (this._sortedBalloonList.sort(this._sortDist2),
        t.mesh.material.uniforms.u_selfRotation.value.copy(t.mesh.quaternion));
      for (let r = 0; r < this.NEIGHBOUR_COUNT; r++) {
        let n = this._sortedBalloonList[r + 1];
        (t.mesh.material.uniforms.u_nearPositionRadiusList.value[r].set(
          n.mesh.position.x,
          n.mesh.position.y,
          n.mesh.position.z,
          n.mesh.scale.x,
        ),
          t.mesh.material.uniforms.u_nearRotationList.value[r].copy(
            n.mesh.quaternion,
          ),
          _color.set(n.color),
          t.mesh.material.uniforms.u_nearColorList.value[r].copy(_color),
          t.mesh.material.uniforms.u_nearTransparencyLumaList.value[r].set(
            n.isSemitransparent ? 1 : 0,
            _color.r * 0.299 + _color.g * 0.587 + _color.b * 0.114,
          ));
      }
      (t.mesh.getWorldPosition(_v$3),
        _v$3.applyMatrix4(properties.camera.matrixWorldInverse),
        (t.distanceFromCamera = -_v$3.z));
    }
  }
  updateRenderOrder() {
    this._sortedBalloonList.sort((r, n) =>
      r.distanceFromCamera < n.distanceFromCamera ? 1 : -1,
    );
    let e = [-1];
    for (let r = 0; r < this.NUM_BALLOONS; r++)
      this._sortedBalloonList[r].isSemitransparent && e.push(r);
    e.push(this.NUM_BALLOONS);
    let t = 0;
    for (let r = 0; r < this.NUM_BALLOONS; r++) {
      let n = this._sortedBalloonList[r];
      n.isSemitransparent
        ? ((n.mesh.renderOrder = r * 3 + 2),
          (n.meshBack.renderOrder = r * 3),
          t++)
        : (n.mesh.renderOrder = (e[t + 1] - (r - e[t])) * 3 + 2);
    }
  }
  updateTransformations() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      const t = this.balloonList[e],
        r = homeBalloonsPhysics.bodies[e];
      (t.mesh.position.copy(r.position),
        t.mesh.quaternion.copy(r.quaternion),
        (t.selfPositionRadius.x = t.mesh.position.x),
        (t.selfPositionRadius.y = t.mesh.position.y),
        (t.selfPositionRadius.z = t.mesh.position.z),
        t.isSemitransparent &&
          (t.meshBack.position.copy(t.mesh.position),
          t.meshBack.rotation.copy(t.mesh.rotation)));
    }
  }
  update(e) {
    if (this.isReady) {
      if (
        (homeBalloonsBackground.update(e),
        homeBalloonsPhysics.update(e),
        this.lockedIndex > -1)
      ) {
        let t = this.balloonList[this.lockedIndex];
        (t.mesh.position.set(0, 0, 3),
          t.meshBack && t.meshBack.position.copy(t.mesh.position),
          t.mesh.rotation.set(properties.time, properties.time * 1.5, 0));
      }
      (this.updateTransformations(),
        this.updateColor(),
        this.updateUniforms(),
        this.updateSorting(),
        this.updateRenderOrder(),
        this.prePassMeshList.sort(this._sortMeshDist2));
      for (let t = 0; t < this.prePassMeshList.length; t++) {
        let r = this.prePassMeshList[t];
        (r.position.copy(r._mesh.position),
          r.rotation.copy(r._mesh.rotation),
          (r.renderOrder = -500 + t));
      }
    }
  }
}
const homeBalloons = new HomeBalloons();
globalThis.homeBalloons = homeBalloons;
const
  frameVert = `#define GLSLIFY 1
attribute vec3 position;varying vec2 v_uv;uniform vec2 u_viewportResolution;uniform vec2 u_domXY;uniform vec2 u_domWH;void main(){v_uv=position.xy*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,1.0);}`,
  frameFrag = `#define GLSLIFY 1
uniform vec3 u_bgColor;uniform vec2 u_aspect;uniform vec2 u_domWH;uniform float u_globalRadius;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){float mask=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius,1.0);gl_FragColor.rgb=u_bgColor;gl_FragColor.a=mask;}`;
(function () {
  function o() {
    for (var r = arguments.length, n = 0; n < r; n++) {
      var a = n < 0 || arguments.length <= n ? void 0 : arguments[n];
      a.nodeType === 1 || a.nodeType === 11
        ? this.appendChild(a)
        : this.appendChild(document.createTextNode(String(a)));
    }
  }
  function e() {
    for (; this.lastChild;) this.removeChild(this.lastChild);
    arguments.length && this.append.apply(this, arguments);
  }
  function t() {
    for (
      var r = this.parentNode, n = arguments.length, a = new Array(n), l = 0;
      l < n;
      l++
    )
      a[l] = arguments[l];
    var c = a.length;
    if (r)
      for (c || r.removeChild(this); c--;) {
        var u = a[c];
        (typeof u != "object"
          ? (u = this.ownerDocument.createTextNode(u))
          : u.parentNode && u.parentNode.removeChild(u),
          c
            ? r.insertBefore(this.previousSibling, u)
            : r.replaceChild(u, this));
      }
  }
  typeof Element < "u" &&
    (Element.prototype.append ||
      ((Element.prototype.append = o), (DocumentFragment.prototype.append = o)),
    Element.prototype.replaceChildren ||
      ((Element.prototype.replaceChildren = e),
      (DocumentFragment.prototype.replaceChildren = e)),
    Element.prototype.replaceWith ||
      ((Element.prototype.replaceWith = t),
      (DocumentFragment.prototype.replaceWith = t)));
})();
function _classCallCheck(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(o, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(o, r.key, r));
  }
}
function _createClass(o, e, t) {
  return (
    e && _defineProperties(o.prototype, e),
    t && _defineProperties(o, t),
    o
  );
}
function _defineProperty(o, e, t) {
  return (
    e in o
      ? Object.defineProperty(o, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (o[e] = t),
    o
  );
}
function ownKeys(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    (e &&
      (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(o, n).enumerable;
      })),
      t.push.apply(t, r));
  }
  return t;
}
function _objectSpread2(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(o, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(o, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return o;
}
function _slicedToArray(o, e) {
  return (
    _arrayWithHoles(o) ||
    _iterableToArrayLimit(o, e) ||
    _unsupportedIterableToArray(o, e) ||
    _nonIterableRest()
  );
}
function _toConsumableArray(o) {
  return (
    _arrayWithoutHoles(o) ||
    _iterableToArray(o) ||
    _unsupportedIterableToArray(o) ||
    _nonIterableSpread()
  );
}
function _arrayWithoutHoles(o) {
  if (Array.isArray(o)) return _arrayLikeToArray(o);
}
function _arrayWithHoles(o) {
  if (Array.isArray(o)) return o;
}
function _iterableToArray(o) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(o)) return Array.from(o);
}
function _iterableToArrayLimit(o, e) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(o)))) {
    var t = [],
      r = !0,
      n = !1,
      a = void 0;
    try {
      for (
        var l = o[Symbol.iterator](), c;
        !(r = (c = l.next()).done) && (t.push(c.value), !(e && t.length === e));
        r = !0
      );
    } catch (u) {
      ((n = !0), (a = u));
    } finally {
      try {
        !r && l.return != null && l.return();
      } finally {
        if (n) throw a;
      }
    }
    return t;
  }
}
function _unsupportedIterableToArray(o, e) {
  if (o) {
    if (typeof o == "string") return _arrayLikeToArray(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (
      (t === "Object" && o.constructor && (t = o.constructor.name),
      t === "Map" || t === "Set")
    )
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return _arrayLikeToArray(o, e);
  }
}
function _arrayLikeToArray(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = o[t];
  return r;
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function extend(o, e) {
  return Object.getOwnPropertyNames(Object(o)).reduce(function (t, r) {
    var n = Object.getOwnPropertyDescriptor(Object(o), r),
      a = Object.getOwnPropertyDescriptor(Object(e), r);
    return Object.defineProperty(t, r, a || n);
  }, {});
}
function isString(o) {
  return typeof o == "string";
}
function isArray(o) {
  return Array.isArray(o);
}
function parseSettings() {
  var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    e = extend(o),
    t;
  return (
    e.types !== void 0 ? (t = e.types) : e.split !== void 0 && (t = e.split),
    t !== void 0 &&
      (e.types = (isString(t) || isArray(t) ? String(t) : "")
        .split(",")
        .map(function (r) {
          return String(r).trim();
        })
        .filter(function (r) {
          return /((line)|(word)|(char))/i.test(r);
        })),
    (e.absolute || e.position) &&
      (e.absolute = e.absolute || /absolute/.test(o.position)),
    e
  );
}
function parseTypes(o) {
  var e = isString(o) || isArray(o) ? String(o) : "";
  return {
    none: !e,
    lines: /line/i.test(e),
    words: /word/i.test(e),
    chars: /char/i.test(e),
  };
}
function isObject(o) {
  return o !== null && typeof o == "object";
}
function isNode$1(o) {
  return isObject(o) && /^(1|3|11)$/.test(o.nodeType);
}
function isLength(o) {
  return typeof o == "number" && o > -1 && o % 1 === 0;
}
function isArrayLike(o) {
  return isObject(o) && isLength(o.length);
}
function toArray(o) {
  return isArray(o)
    ? o
    : o == null
      ? []
      : isArrayLike(o)
        ? Array.prototype.slice.call(o)
        : [o];
}
function getTargetElements(o) {
  var e = o;
  return (
    isString(o) &&
      (/^(#[a-z]\w+)$/.test(o.trim())
        ? (e = document.getElementById(o.trim().slice(1)))
        : (e = document.querySelectorAll(o))),
    toArray(e).reduce(function (t, r) {
      return [].concat(
        _toConsumableArray(t),
        _toConsumableArray(toArray(r).filter(isNode$1)),
      );
    }, [])
  );
}
var entries = Object.entries,
  expando = "_splittype",
  cache = {},
  uid = 0;
function set(o, e, t) {
  if (!isObject(o))
    return (console.warn("[data.set] owner is not an object"), null);
  var r = o[expando] || (o[expando] = ++uid),
    n = cache[r] || (cache[r] = {});
  return (
    t === void 0
      ? e &&
        Object.getPrototypeOf(e) === Object.prototype &&
        (cache[r] = _objectSpread2(_objectSpread2({}, n), e))
      : e !== void 0 && (n[e] = t),
    t
  );
}
function get(o, e) {
  var t = isObject(o) ? o[expando] : null,
    r = (t && cache[t]) || {};
  return r;
}
function remove(o) {
  var e = o && o[expando];
  e && (delete o[e], delete cache[e]);
}
function clear() {
  Object.keys(cache).forEach(function (o) {
    delete cache[o];
  });
}
function cleanup() {
  entries(cache).forEach(function (o) {
    var e = _slicedToArray(o, 2),
      t = e[0],
      r = e[1],
      n = r.isRoot,
      a = r.isSplit;
    (!n || !a) && ((cache[t] = null), delete cache[t]);
  });
}
function toWords(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ",
    t = o ? String(o) : "";
  return t.trim().replace(/\s+/g, " ").split(e);
}
var rsAstralRange = "\\ud800-\\udfff",
  rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23",
  rsComboSymbolsRange = "\\u20d0-\\u20f0",
  rsVarRange = "\\ufe0e\\ufe0f",
  rsAstral = "[".concat(rsAstralRange, "]"),
  rsCombo = "[".concat(rsComboMarksRange).concat(rsComboSymbolsRange, "]"),
  rsFitz = "\\ud83c[\\udffb-\\udfff]",
  rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")"),
  rsNonAstral = "[^".concat(rsAstralRange, "]"),
  rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  rsZWJ = "\\u200d",
  reOptMod = "".concat(rsModifier, "?"),
  rsOptVar = "[".concat(rsVarRange, "]?"),
  rsOptJoin =
    "(?:" +
    rsZWJ +
    "(?:" +
    [rsNonAstral, rsRegional, rsSurrPair].join("|") +
    ")" +
    rsOptVar +
    reOptMod +
    ")*",
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsSymbol = "(?:".concat(
    [
      "".concat(rsNonAstral).concat(rsCombo, "?"),
      rsCombo,
      rsRegional,
      rsSurrPair,
      rsAstral,
    ].join("|"),
    `
)`,
  ),
  reUnicode = RegExp(
    ""
      .concat(rsFitz, "(?=")
      .concat(rsFitz, ")|")
      .concat(rsSymbol)
      .concat(rsSeq),
    "g",
  ),
  unicodeRange = [
    rsZWJ,
    rsAstralRange,
    rsComboMarksRange,
    rsComboSymbolsRange,
    rsVarRange,
  ],
  reHasUnicode = RegExp("[".concat(unicodeRange.join(""), "]"));
function asciiToArray(o) {
  return o.split("");
}
function hasUnicode(o) {
  return reHasUnicode.test(o);
}
function unicodeToArray(o) {
  return o.match(reUnicode) || [];
}
function stringToArray(o) {
  return hasUnicode(o) ? unicodeToArray(o) : asciiToArray(o);
}
function toString(o) {
  return o == null ? "" : String(o);
}
function toChars(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (
    (o = toString(o)),
    o && isString(o) && !e && hasUnicode(o) ? stringToArray(o) : o.split(e)
  );
}
function createElement(o, e) {
  var t = document.createElement(o);
  return (
    e &&
      Object.keys(e).forEach(function (r) {
        var n = e[r],
          a = isString(n) ? n.trim() : n;
        a === null ||
          a === "" ||
          (r === "children"
            ? t.append.apply(t, _toConsumableArray(toArray(a)))
            : t.setAttribute(r, a));
      }),
    t
  );
}
var defaults = {
  splitClass: "",
  lineClass: "line",
  wordClass: "word",
  charClass: "char",
  types: ["lines", "words", "chars"],
  absolute: !1,
  tagName: "div",
};
function splitWordsAndChars(o, e) {
  e = extend(defaults, e);
  var t = parseTypes(e.types),
    r = e.tagName,
    n = o.nodeValue,
    a = document.createDocumentFragment(),
    l = [],
    c = [];
  return (
    /^\s/.test(n) && a.append(" "),
    (l = toWords(n).reduce(function (u, f, p, g) {
      var v, _;
      return (
        t.chars &&
          (_ = toChars(f).map(function (T) {
            var M = createElement(r, {
              class: "".concat(e.splitClass, " ").concat(e.charClass),
              style: "display: inline-block;",
              children: T,
            });
            return (
              set(M, "isChar", !0),
              (c = [].concat(_toConsumableArray(c), [M])),
              M
            );
          })),
        t.words || t.lines
          ? ((v = createElement(r, {
              class: "".concat(e.wordClass, " ").concat(e.splitClass),
              style: "display: inline-block; ".concat(
                t.words && e.absolute ? "position: relative;" : "",
              ),
              children: t.chars ? _ : f,
            })),
            set(v, { isWord: !0, isWordStart: !0, isWordEnd: !0 }),
            a.appendChild(v))
          : _.forEach(function (T) {
              a.appendChild(T);
            }),
        p < g.length - 1 && a.append(" "),
        t.words ? u.concat(v) : u
      );
    }, [])),
    /\s$/.test(n) && a.append(" "),
    o.replaceWith(a),
    { words: l, chars: c }
  );
}
function split(o, e) {
  var t = o.nodeType,
    r = { words: [], chars: [] };
  if (!/(1|3|11)/.test(t)) return r;
  if (t === 3 && /\S/.test(o.nodeValue)) return splitWordsAndChars(o, e);
  var n = toArray(o.childNodes);
  if (n.length && (set(o, "isSplit", !0), !get(o).isRoot)) {
    ((o.style.display = "inline-block"), (o.style.position = "relative"));
    var a = o.nextSibling,
      l = o.previousSibling,
      c = o.textContent || "",
      u = a ? a.textContent : " ",
      f = l ? l.textContent : " ";
    set(o, {
      isWordEnd: /\s$/.test(c) || /^\s/.test(u),
      isWordStart: /^\s/.test(c) || /\s$/.test(f),
    });
  }
  return n.reduce(function (p, g) {
    var v = split(g, e),
      _ = v.words,
      T = v.chars;
    return {
      words: [].concat(_toConsumableArray(p.words), _toConsumableArray(_)),
      chars: [].concat(_toConsumableArray(p.chars), _toConsumableArray(T)),
    };
  }, r);
}
function getPosition(o, e, t, r) {
  if (!t.absolute) return { top: e ? o.offsetTop : null };
  var n = o.offsetParent,
    a = _slicedToArray(r, 2),
    l = a[0],
    c = a[1],
    u = 0,
    f = 0;
  if (n && n !== document.body) {
    var p = n.getBoundingClientRect();
    ((u = p.x + l), (f = p.y + c));
  }
  var g = o.getBoundingClientRect(),
    v = g.width,
    _ = g.height,
    T = g.x,
    M = g.y,
    S = M + c - f,
    b = T + l - u;
  return { width: v, height: _, top: S, left: b };
}
function unSplitWords(o) {
  get(o).isWord
    ? (remove(o), o.replaceWith.apply(o, _toConsumableArray(o.childNodes)))
    : toArray(o.children).forEach(function (e) {
        return unSplitWords(e);
      });
}
var createFragment = function o() {
  return document.createDocumentFragment();
};
function repositionAfterSplit(o, e, t) {
  var r = parseTypes(e.types),
    n = e.tagName,
    a = o.getElementsByTagName("*"),
    l = [],
    c = [],
    u = null,
    f,
    p,
    g,
    v = [],
    _ = o.parentElement,
    T = o.nextElementSibling,
    M = createFragment(),
    S = window.getComputedStyle(o),
    b = S.textAlign,
    C = parseFloat(S.fontSize),
    w = C * 0.2;
  return (
    e.absolute &&
      ((g = { left: o.offsetLeft, top: o.offsetTop, width: o.offsetWidth }),
      (p = o.offsetWidth),
      (f = o.offsetHeight),
      set(o, { cssWidth: o.style.width, cssHeight: o.style.height })),
    toArray(a).forEach(function (R) {
      var E = R.parentElement === o,
        I = getPosition(R, E, e, t),
        F = I.width,
        k = I.height,
        L = I.top,
        D = I.left;
      /^br$/i.test(R.nodeName) ||
        (r.lines &&
          E &&
          ((u === null || L - u >= w) && ((u = L), l.push((c = []))),
          c.push(R)),
        e.absolute && set(R, { top: L, left: D, width: F, height: k }));
    }),
    _ && _.removeChild(o),
    r.lines &&
      ((v = l.map(function (R) {
        var E = createElement(n, {
          class: "".concat(e.splitClass, " ").concat(e.lineClass),
          style: "display: block; text-align: ".concat(b, "; width: 100%;"),
        });
        set(E, "isLine", !0);
        var I = { height: 0, top: 1e4 };
        return (
          M.appendChild(E),
          R.forEach(function (F, k, L) {
            var D = get(F),
              ne = D.isWordEnd,
              re = D.top,
              ce = D.height,
              z = L[k + 1];
            ((I.height = Math.max(I.height, ce)),
              (I.top = Math.min(I.top, re)),
              E.appendChild(F),
              ne && get(z).isWordStart && E.append(" "));
          }),
          e.absolute && set(E, { height: I.height, top: I.top }),
          E
        );
      })),
      r.words || unSplitWords(M),
      o.replaceChildren(M)),
    e.absolute &&
      ((o.style.width = "".concat(o.style.width || p, "px")),
      (o.style.height = "".concat(f, "px")),
      toArray(a).forEach(function (R) {
        var E = get(R),
          I = E.isLine,
          F = E.top,
          k = E.left,
          L = E.width,
          D = E.height,
          ne = get(R.parentElement),
          re = !I && ne.isLine;
        ((R.style.top = "".concat(re ? F - ne.top : F, "px")),
          (R.style.left = I
            ? "".concat(g.left, "px")
            : "".concat(k - (re ? g.left : 0), "px")),
          (R.style.height = "".concat(D, "px")),
          (R.style.width = I ? "".concat(g.width, "px") : "".concat(L, "px")),
          (R.style.position = "absolute"));
      })),
    _ && (T ? _.insertBefore(o, T) : _.appendChild(o)),
    v
  );
}
var _defaults = extend(defaults, {}),
  SplitType = (function () {
    _createClass(o, null, [
      {
        key: "clearData",
        value: function () {
          clear();
        },
      },
      {
        key: "setDefaults",
        value: function (t) {
          return ((_defaults = extend(_defaults, parseSettings(t))), defaults);
        },
      },
      {
        key: "revert",
        value: function (t) {
          getTargetElements(t).forEach(function (r) {
            var n = get(r),
              a = n.isSplit,
              l = n.html,
              c = n.cssWidth,
              u = n.cssHeight;
            a &&
              ((r.innerHTML = l),
              (r.style.width = c || ""),
              (r.style.height = u || ""),
              remove(r));
          });
        },
      },
      {
        key: "create",
        value: function (t, r) {
          return new o(t, r);
        },
      },
      {
        key: "data",
        get: function () {
          return cache;
        },
      },
      {
        key: "defaults",
        get: function () {
          return _defaults;
        },
        set: function (t) {
          _defaults = extend(_defaults, parseSettings(t));
        },
      },
    ]);
    function o(e, t) {
      (_classCallCheck(this, o),
        (this.isSplit = !1),
        (this.settings = extend(_defaults, parseSettings(t))),
        (this.elements = getTargetElements(e)),
        this.split());
    }
    return (
      _createClass(o, [
        {
          key: "split",
          value: function (t) {
            var r = this;
            (this.revert(),
              this.elements.forEach(function (l) {
                set(l, "html", l.innerHTML);
              }),
              (this.lines = []),
              (this.words = []),
              (this.chars = []));
            var n = [window.pageXOffset, window.pageYOffset];
            t !== void 0 &&
              (this.settings = extend(this.settings, parseSettings(t)));
            var a = parseTypes(this.settings.types);
            a.none ||
              (this.elements.forEach(function (l) {
                set(l, "isRoot", !0);
                var c = split(l, r.settings),
                  u = c.words,
                  f = c.chars;
                ((r.words = [].concat(
                  _toConsumableArray(r.words),
                  _toConsumableArray(u),
                )),
                  (r.chars = [].concat(
                    _toConsumableArray(r.chars),
                    _toConsumableArray(f),
                  )));
              }),
              this.elements.forEach(function (l) {
                if (a.lines || r.settings.absolute) {
                  var c = repositionAfterSplit(l, r.settings, n);
                  r.lines = [].concat(
                    _toConsumableArray(r.lines),
                    _toConsumableArray(c),
                  );
                }
              }),
              (this.isSplit = !0),
              window.scrollTo(n[0], n[1]),
              cleanup());
          },
        },
        {
          key: "revert",
          value: function () {
            (this.isSplit &&
              ((this.lines = null),
              (this.words = null),
              (this.chars = null),
              (this.isSplit = !1)),
              o.revert(this.elements));
          },
        },
      ]),
      o
    );
  })();



globalThis.SplitType = SplitType;
globalThis.homeBalloonsBackground = homeBalloonsBackground;
globalThis.homeBalloonsPhysics = homeBalloonsPhysics;
globalThis.homeBalloons = homeBalloons;
globalThis.visuals = visuals;

export {
  SplitType,
  HomeBalloonsBackground,
  homeBalloonsBackground,
  HomeBalloonsBody,
  HomeBalloonsPhysics,
  HomeBalloons,
  Visuals,
  homeBalloons,
  visuals
};
export default homeBalloons;
