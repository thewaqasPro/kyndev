/**
 * Shaders for AboutWhoLogo (3D Animated Brand Typography)
 * Interpolates extruded letter vertices from the initial intro title position
 * to the inline "WE ARE [BRAND]" header position based on scroll ratio.
 */

export const logoVertexShader = /* glsl */ `
#define GLSLIFY 1
attribute float char;
uniform float u_time;
uniform float u_showRatio;
uniform float u_hideRatio;
uniform float u_aspect;
uniform vec2 u_toDomXY;
uniform vec2 u_toDomWH;
uniform vec2 u_toDomPivot;
varying float v_dist;

#include <ufxVert>

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float cubicInOut(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float cubicBezier(float p0, float p1, float p2, float p3, float t) {
  float c = (p1 - p0) * 3.0;
  float b = (p2 - p1) * 3.0 - c;
  float a = p3 - p0 - c - b;
  float t2 = t * t;
  float t3 = t2 * t;
  return a * t3 + b * t2 + c * t + p0;
}

float easeOutBack(float t) {
  return cubicBezier(0.0, 1.3, 1.1, 1.0, t);
}

void main() {
  vec3 pos = vec3(position.xy, 0.0);
  vec3 aspectCorrectedPos = pos * vec3(1.0, u_aspect, 1.0);
  v_dist = position.z;
  
  vec3 basePos = getBasePosition(aspectCorrectedPos);
  basePos.y = 1.0 - basePos.y;
  vec3 screenPos = getScreenPosition(basePos);
  
  float vertexShowRatio = easeOutBack(linearStep(0.0, 1.0, u_showRatio * 2.2 - aspectCorrectedPos.x - aspectCorrectedPos.y * 0.2));
  screenPos.y -= (1.0 - vertexShowRatio) * (u_domWH.y + min(u_domWH.y * 1.1, 100.0));
  
  // Character offset shift across letter indices
  pos.x -= (char / 5.0) * 0.08;
  
  vec3 aspectCorrectedToPos = pos * vec3(1.0, u_aspect, 1.0);
  vec3 toBasePos = vec3((aspectCorrectedToPos.xy) * u_toDomWH - u_toDomPivot, aspectCorrectedToPos.z);
  toBasePos.y = 1.0 - toBasePos.y;
  vec3 toScreenPos = toBasePos + vec3(u_toDomPivot.xy, 0.0);
  toScreenPos = (toScreenPos + vec3(u_toDomXY.xy, 0.0)) * vec3(1.0, -1.0, 1.0);
  
  float vertexHideRatio = cubicInOut(linearStep(0.0, 1.0, u_hideRatio * 2.2 - aspectCorrectedPos.x - pow(aspectCorrectedPos.y, 1.0 + u_hideRatio) * 0.2));
  screenPos = mix(screenPos, toScreenPos, vertexHideRatio);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(screenPos, 1.0);
}
`;

export const logoFragmentShader = /* glsl */ `
#define GLSLIFY 1
varying float v_dist;

void main() {
  float alpha = smoothstep(0.0, fwidth(v_dist), v_dist);
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
`;
