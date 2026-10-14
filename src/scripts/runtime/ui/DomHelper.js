/**
 * DOM Text Splitting & Text Animation Utilities
 */
class DomHelper {
  clone(e) {
    wrapper.innerHTML = e.outerHTML;
    let t = wrapper.firstChild;
    return (wrapper.removeChild(t), t);
  }
  _collapseWhiteSpace(e) {
    return e.trim().replace(/\s+/g, " ");
  }
  getLinesFromText(e) {
    let t = e.childNodes,
      r = [];
    for (let n = 0, a = t.length; n < a; n++) {
      let l = t[n];
      l.nodeType == 3 && r.push.apply(r, this.getLinesFromTextNode(l));
    }
    return r;
  }
  getLinesFromTextNode(e) {
    if (e.nodeType !== 3)
      throw new Error("Lines can only be extracted from text nodes.");
    e.textContent = this._collapseWhiteSpace(e.textContent);
    for (
      var t = e.textContent, r = document.createRange(), n = [], a = [], l = 0;
      l < t.length;
      l++
    ) {
      (r.setStart(e, 0), r.setEnd(e, l + 1));
      var c = r.getClientRects().length - 1;
      (n[c] || n.push((a = [])), a.push(t.charAt(l)));
    }
    return ((n = n.map((u) => this._collapseWhiteSpace(u.join("")))), n);
  }
}
const domHelper = new DomHelper(),
  vert$i = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`,
  frag$l = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform vec3 u_colorBg;uniform float u_showRatio;uniform float u_activeRatio;uniform vec2 u_textureSize;uniform vec2 u_domWH;uniform vec2 u_shiftXY;uniform vec3 u_focusPos;uniform float u_time;uniform float u_zoomRatio;uniform float u_dofRangeOffset;uniform float u_saturation;uniform float u_brightness;uniform float u_borderRatio;uniform float u_rippleStrength;uniform vec2 u_resolution;uniform float u_globalRadius;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*u_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;vec2 baseUv=v_uv;baseUv.x-=(screenUv.x-0.5)*(1.-sin((screenUv.y)*3.141592))*u_rippleStrength;float radiusRatio=1.;vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(5.,28.));float imageAlpha=getRoundedCornerMask(baseUv,u_domWH*mix(0.7,1.,u_showRatio),u_globalRadius,radiusRatio);vec2 toUvSpace=1./(u_textureSize*max(u_domWH.x/u_textureSize.x,u_domWH.y/u_textureSize.y));float borderThickenss=(u_domWH.y*0.08+5.)*u_borderRatio-5.;vec2 uv=baseUv-.5;uv*=u_domWH*mix(0.75,1.,u_showRatio);uv*=mix(0.975,1.,u_zoomRatio);float zMultiplier=u_domWH.y*(.15+u_activeRatio*15.);vec3 pos=vec3(uv,-zMultiplier);float cameraDepth=u_domWH.y*mix(10.,5.,u_zoomRatio);vec3 rayOri=vec3(u_focusPos.xy,cameraDepth);float dist=length(pos-rayOri);vec3 rayDir=(pos-rayOri)/dist;float skipDist=cameraDepth/-rayDir.z;dist-=skipDist;float stepDist=dist/float(PARALLAX_SAMPLES);vec3 rayStep=rayDir*stepDist;vec3 rayPos=rayOri+rayDir*(skipDist+stepDist*noise.x);for(int i=0;i<PARALLAX_SAMPLES;i++){float currZ=-texture2D(u_depthTexture,rayPos.xy*toUvSpace+.5).r*zMultiplier;if(currZ>rayPos.z){break;}rayPos+=rayStep;dist+=stepDist;}uv=rayPos.xy;uv*=toUvSpace;uv+=u_shiftXY*0.015;float depth=texture2D(u_depthTexture,uv+.5).r;vec3 color=vec3(0.0);float PI=3.1415926;float blurriness=mix(0.0,0.01,u_zoomRatio)*linearStep(0.0,0.5,abs(depth-u_focusPos.z)+u_dofRangeOffset);float angle=PI*2.*noise.y;float textureAspectInv=u_textureSize.y/u_textureSize.x;float numSampleInv=1./float(BLUR_SAMPLES);for(int i=0;i<BLUR_SAMPLES;i++){float fI=float(i);float r=sqrt((fI+0.5)*numSampleInv)*blurriness;angle+=10.16640738;vec2 uvOffset=r*vec2(cos(angle)*textureAspectInv,sin(angle));vec4 image=texture2D(u_texture,uv+uvOffset+.5);color+=image.rgb;}color*=numSampleInv;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color+=u_brightness;float fogThickness=0.75;color=mix(color,u_colorBg,linearStep(0.0,fogThickness,u_activeRatio*(1.+fogThickness*2.)-fogThickness-(1.0-depth)));gl_FragColor=vec4(color,imageAlpha);}`;
let TEXT_STAGGER = 20,
  LETTER_PER_SECOND = 40,
  MAX_RAND_LETTER_COUNT = 5;

class TextAnimationHelper {
  setMatrixText(e, t, r = 0, n = 40, a = 2, l = 1 / 15) {
    ((e._rawTime = 0),
      (e._time = 0),
      (e._direction = 1),
      (e._prevRefreshTime = -1 / 0),
      (e._refreshRate = l),
      (e._delay = r),
      (t = t.replace(
        "<br>",
        `
`,
      )),
      (e._text = t),
      (e._letterPerSecond = n),
      (e._maxRandLetterCount = a),
      (e.textContent = ""));
  }
  resetMatrixTextTime(e) {
    ((e._rawTime = 0), (e._time = 0), (e._prevRefreshTime = -1 / 0));
  }
  updateMatrixText(e, t = properties.deltaTime) {
    if (
      ((e._rawTime += t),
      (e._time += t * e._direction),
      (e._time = math.clamp(
        e._time,
        0,
        e._delay +
          (e._text.length + e._maxRandLetterCount) / e._letterPerSecond,
      )),
      e._rawTime >= e._prevRefreshTime + e._refreshRate)
    ) {
      e._prevRefreshTime = e._rawTime;
      let r = e._text,
        n = Math.max(0, Math.floor(e._letterPerSecond * (e._time - e._delay))),
        a = Math.min(r.length, n - e._maxRandLetterCount),
        l = Math.min(r.length, n),
        c = "";
      if (n > 0) {
        c = r.substr(0, a);
        for (let u = 0; u < l - a; u++)
          c += String.fromCharCode(33 + ~~(Math.random() * 93));
        c = c.replace(
          `
`,
          "<br>",
        );
      }
      e._str != c && ((e._str = c), (e.innerHTML = c));
    }
  }
}
const textAnimationHelper = new TextAnimationHelper(),
  letterVert = `#define GLSLIFY 1
#include <ufxVert>
uniform float u_letterIdx;varying vec2 v_pixel;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_pixel=vec2(u_letterIdx*5.+1.,1.)+vec2(uv.x,1.-uv.y)*vec2(3.,4.);}`,
  letterFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_opacity;uniform float u_time;varying vec2 v_pixel;vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(vec3(floor(v_pixel),floor(u_opacity*3.)+floor(u_time+sin(u_time*3.)*1.5)));float opacity=mix(pow(rands.x,5.),0.95+rands.y*0.05,smoothstep(.75,1.,u_opacity))*u_opacity;vec2 uv=(floor(v_pixel)+.5)/vec2(210.,6.);float mask=texture2D(u_texture,uv).r;vec2 dd=abs(fract(v_pixel)-.5);float dotMask=step(max(dd.x,dd.y),.05);gl_FragColor=vec4(1.,1.,1.,max(dotMask*.3*(opacity*0.5+u_opacity*0.5),mask*opacity));}`;

globalThis.domHelper = domHelper;
globalThis.textAnimationHelper = textAnimationHelper;
globalThis.TEXT_STAGGER = TEXT_STAGGER;
globalThis.LETTER_PER_SECOND = LETTER_PER_SECOND;
globalThis.MAX_RAND_LETTER_COUNT = MAX_RAND_LETTER_COUNT;

export { DomHelper, TextAnimationHelper, domHelper, textAnimationHelper, TEXT_STAGGER, LETTER_PER_SECOND, MAX_RAND_LETTER_COUNT };
export default domHelper;
