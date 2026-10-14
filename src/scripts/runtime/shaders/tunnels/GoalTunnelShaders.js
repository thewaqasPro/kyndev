/**
 * Shaders for Space Tunnels (Wormhole & White Light Tunnel)
 */

export const tunnelEarthVertexShader = /* glsl */ `
#define GLSLIFY 1
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;
varying vec3 v_viewNormal;
varying vec2 v_uv;
varying vec3 v_localPosition;

void main() {
  vec3 pos = position;
  pos.z *= 0.1;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  v_worldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  v_viewNormal = normalMatrix * normal;
  v_viewPosition = -mvPosition.xyz;
  v_uv = uv;
  v_localPosition = pos;
}
`;

export const tunnelEarthFragmentShader = /* glsl */ `
#define GLSLIFY 1
varying vec3 v_viewPosition;
varying vec3 v_worldPosition;
varying vec3 v_viewNormal;
varying vec2 v_uv;
varying vec3 v_localPosition;
uniform sampler2D u_earthTexture;
uniform vec3 u_bgColor;
uniform vec3 u_atmosphereColor;

#include <getBlueNoise>

void main() {
  vec3 bn = getBlueNoise(gl_FragCoord.xy);
  vec3 earthMap = texture2D(u_earthTexture, v_uv).rgb;
  gl_FragColor.rgb = earthMap;
  gl_FragColor.a = 0.0;
}
`;

export const frameBackgroundVertexShader = /* glsl */ `
#define GLSLIFY 1
attribute vec2 position;
uniform vec2 u_viewportResolution;
uniform vec2 u_frameOffset;
uniform float u_frameScale;
uniform float u_frameRotate;
uniform vec2 u_domXY;
uniform vec2 u_domWH;
uniform vec2 u_dom2Offset;
uniform vec2 u_dom2WH;
varying vec2 v_uv;
varying vec2 v_uv2;

mat2 getRotation2D(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  v_uv = position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  v_uv = (v_uv * u_viewportResolution - u_domXY - u_domWH * 0.5);
  v_uv -= u_frameOffset;
  v_uv = getRotation2D(u_frameRotate) * v_uv;
  v_uv /= u_frameScale;
  v_uv2 = v_uv + (-u_dom2Offset);
  v_uv2 = (v_uv2 + u_dom2WH * 0.5) / u_dom2WH;
  v_uv = (v_uv + u_domWH * 0.5) / u_domWH;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const frameBackgroundFragmentShader = /* glsl */ `
#define GLSLIFY 1
uniform sampler2D u_dom2Texture;
uniform vec3 u_bgColor;
uniform vec2 u_domWH;
uniform vec2 u_dom2WH;
uniform float u_globalRadius;
uniform float u_radiusScale;
uniform vec3 u_glowColor;
uniform float u_glowRadius;
uniform float u_glowUpperBound;
uniform float u_glowPow;
uniform float u_glowTint;
varying vec2 v_uv;
varying vec2 v_uv2;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sdRoundedBox(in vec2 p, in vec2 b, in float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float getRoundedCornerMask(vec2 uv, vec2 size, float radius, float ratio) {
  vec2 halfSize = size * 0.5;
  float maxDist = length(halfSize);
  float minSize = min(halfSize.x, halfSize.y);
  float maxSize = max(halfSize.x, halfSize.y);
  float t = ratio * maxDist;
  radius = mix(minSize * linearStep(0.0, minSize, t), radius, linearStep(maxSize, maxDist, t));
  halfSize = min(halfSize, vec2(t));
  float d = sdRoundedBox((uv - 0.5) * size, halfSize, radius);
  return smoothstep(0.0, -fwidth(d), d);
}

float sdBox(in vec2 p, in vec2 b) {
  vec2 w = abs(p) - b;
  vec2 s = vec2(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0);
  float g = max(w.x, w.y);
  return (g > 0.0) ? length(max(w, 0.0)) : g;
}

void main() {
  vec3 map = texture2D(u_dom2Texture, v_uv2).rgb;
  float opacity = 1.0 - getRoundedCornerMask(v_uv, u_domWH, u_globalRadius * u_radiusScale, 1.0);
  vec3 color = u_bgColor;
  float shadow = 1.0;
  vec2 lightPos = vec2(2.0, 1.5);
  vec2 tabletSize = vec2(u_domWH.x / u_domWH.y, 1.0);
  float tabletRadiusOffset = 0.05;
  vec2 pos = (v_uv * 2.0 - 1.0) * tabletSize;
  vec2 toLight = normalize(lightPos - pos);
  float dist = sdBox(pos, tabletSize - tabletRadiusOffset) - u_glowRadius - tabletRadiusOffset;
  color = mix(u_glowColor, color, pow(linearStep(0.0, u_glowUpperBound, dist), u_glowPow));
  color = mix(color, mix(map.ggg, map.ggg * u_glowColor, u_glowTint), 1.0 - map.r);
  gl_FragColor = vec4(color, opacity);
}
`;
