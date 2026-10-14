/**
 * Shaders for Goal Tunnels (Wormhole, Motion Blur, Particles & Stickers)
 */

export const blackTunnelVertexShader = /* glsl */ `
#define GLSLIFY 1
attribute float ao;
attribute float areaRatio;
attribute float cluster;
attribute float height;
attribute vec3 center;
attribute vec3 instancePos;
attribute vec3 instanceGridIds;
attribute vec3 instanceAxis;
attribute vec4 tangent;
uniform float u_time;
uniform float u_showRatio;
uniform float u_offsetZ;
varying vec3 v_worldPosition;
varying vec4 v_worldTangent;
varying vec3 v_worldNormal;
varying float v_ao;
varying float v_opacity;
varying float v_emission;
varying vec2 v_uv;
varying vec4 v_rands;
varying float v_depth;

#define PI 3.14159265359

vec3 qrotate(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec4 quaternion(vec3 axis, float angle) {
  float halfAngle = angle * 0.5;
  return vec4(axis * sin(halfAngle), cos(halfAngle));
}

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

vec4 hash44(vec4 p4) {
  p4 = fract(p4 * vec4(0.1031, 0.1030, 0.0973, 0.1099));
  p4 += dot(p4, p4.wzxy + 33.33);
  return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec3 inverseTransformDirection(in vec3 dir, in mat4 matrix) {
  return normalize((vec4(dir, 0.0) * matrix).xyz);
}

#include <goalBlackTunnelTransform>

void main() {
  vec3 pos = position;
  vec3 nor = normal;
  vec3 tang = tangent.xyz;

#ifdef IS_HD
  float blockId = floor(pos.x + 0.5);
#else
  float blockId = 0.0;
#endif

  vec4 q;
  vec3 offsetInstanceGridIds = instanceGridIds;
  offsetInstanceGridIds.z -= floor(u_offsetZ / float(GRID_SIZE)) * 2.0;
  vec4 instanceRand1s = hash44(floor(vec4(offsetInstanceGridIds + 0.5, blockId + cluster)));
  v_rands = hash44(floor(vec4(offsetInstanceGridIds + 0.5, 100.0)));
  
  float showRatio = u_showRatio;
  showRatio *= 1.0 - step(10.5, instanceGridIds.z) * mod(u_offsetZ / float(GRID_SIZE), 1.0);

#ifdef IS_HD
  pos = mix(center, pos, showRatio);
#else
  pos.xy *= showRatio * showRatio;
  pos.z *= showRatio;
#endif

#ifdef IS_HD
  pos.x -= blockId;
  float blockOffset = sin(u_time * 2.0 + cos(u_time * 4.0 + 0.2 + offsetInstanceGridIds.z)) * 0.15 * instanceRand1s.y;
  float heightRatio = 1.0;
  pos.y = pos.y * height * heightRatio + (0.025 + blockOffset);
  float variation = floor(instanceRand1s.x * 8.0);
  q = quaternion(vec3(0.0, 0.0, variation > 3.5 ? -1.0 : 1.0), (mod(blockId, 4.0) + mod(variation, 4.0)) * PI * 0.5);
  pos = qrotate(q, pos);
  nor = qrotate(q, nor);
  tang = qrotate(q, tang);
#endif

  q = quaternion(instanceAxis, PI * 0.5);
  pos = qrotate(q, pos) * float(GRID_SIZE) + instancePos;
  nor = qrotate(q, nor);
  tang = qrotate(q, tang);
  pos.z += mod(u_offsetZ, float(GRID_SIZE));
  v_depth = -pos.z;
  pos = goalBlackTunnelTransform(pos);

#ifdef IS_HD
  v_ao = ao;
  v_emission = areaRatio < 0.25 ? sin(pos.z * 0.25 - u_time) * 0.5 + 0.5 : 0.0;
#else
  v_ao = 1.0;
  v_emission = 0.0;
#endif

  v_opacity = linearStep(57.0, 30.0, length(pos.xy)) * linearStep(105.0, 85.0, cameraPosition.z - pos.z);
  v_worldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  v_worldTangent = vec4(inverseTransformDirection(normalMatrix * tang, viewMatrix), tangent.w);
  v_worldNormal = inverseTransformDirection(normalMatrix * nor, viewMatrix);
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const blackTunnelFragmentShader = /* glsl */ `
#define GLSLIFY 1
uniform sampler2D u_feedbackTexture;
uniform sampler2D u_greebleArmbTexture;
uniform sampler2D u_greebleNormalTexture;
uniform vec2 u_resolution;
uniform float u_outRatio;
uniform vec3 u_outBloomFromToStrength;
uniform vec3 u_color1;
uniform vec3 u_color2;
varying vec3 v_worldPosition;
varying vec4 v_worldTangent;
varying vec3 v_worldNormal;
varying vec4 v_rands;
varying float v_ao;
varying float v_opacity;
varying float v_emission;
varying float v_depth;
varying vec2 v_uv;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / u_resolution;
  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;
  vec3 worldNormal = normalize(v_worldNormal) * faceDirection;
  vec3 worldTangent = normalize(v_worldTangent.xyz) * faceDirection;
  vec3 worldBinormal = normalize(cross(worldNormal, worldTangent)) * -v_worldTangent.w;
  worldTangent = normalize(cross(worldBinormal, worldNormal));
  vec3 tangentSpaceNormal = normalize(texture2D(u_greebleNormalTexture, v_uv).xyz - 0.5);
  worldNormal = normalize(tangentSpaceNormal.x * worldTangent + tangentSpaceNormal.y * worldBinormal + tangentSpaceNormal.z * worldNormal);
  
  vec4 armb = texture2D(u_greebleArmbTexture, v_uv);
  float ao = v_ao * armb.r;
  float roughness = armb.g;
  float metalness = armb.b;
  float albedo = armb.a;
  
  vec3 lightPos = vec3(0.0, 0.0, -100.0);
  vec3 toLight = normalize(lightPos - v_worldPosition);
  float diffuse = dot(worldNormal, toLight) * 0.5 + 0.5;

#ifdef IS_HD
  float feedbackMultiplier = 2.5;
#else
  float feedbackMultiplier = 2.0;
#endif

  vec3 color1 = u_color1;
  vec3 color2 = u_color2;
  vec3 baseColor = 0.5 + mix(color1, color2, v_rands.x) * 1.2;
  vec3 emissiveColor = mix(color1, color2, v_rands.y) * 3.5;
  diffuse *= (0.5 + texture2D(u_feedbackTexture, screenUv + worldNormal.xy * 0.02).r * feedbackMultiplier);
  gl_FragColor.rgb = baseColor * vec3(ao * 0.75 * diffuse) + emissiveColor * v_emission;
  gl_FragColor.rgb *= v_opacity;
  
  float endBloomStrength = linearStep(u_outBloomFromToStrength.x, u_outBloomFromToStrength.y, v_depth) * u_outBloomFromToStrength.z;
  float bloomScale = linearStep(5.0, 20.0, v_depth) * (1.0 - linearStep(15.0, 25.0, length(v_worldPosition.xy)));
  gl_FragColor.a = bloomScale * max(0.0, dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114)) * 2.5 - 1.0) + endBloomStrength * 0.75;
  gl_FragColor.rgb += endBloomStrength * (0.35 + gl_FragColor.rgb * 0.65);
}
`;

export const tunnelVelocityBlurShader = /* glsl */ `
#define GLSLIFY 1
uniform sampler2D u_texture;
uniform sampler2D u_depthTexture;
uniform mat4 u_projectionViewInverseMatrix;
uniform mat4 u_prevProjectionViewMatrix;
uniform vec2 u_aspect;
uniform float u_amount;
varying vec2 v_uv;

#include <getBlueNoise>

void main() {
  vec3 bnoise = getBlueNoise(gl_FragCoord.xy);
  float depth = texture2D(u_depthTexture, v_uv + bnoise.yz * 0.01 * u_aspect).r;
  vec4 ndc = vec4(v_uv.xy * 2.0 - 1.0, depth, 1.0);
  vec4 worldPos = u_projectionViewInverseMatrix * ndc;
  vec4 prevPos = u_prevProjectionViewMatrix * worldPos;
  prevPos /= prevPos.w;
  prevPos.xy = prevPos.xy * 0.5 + 0.5;
  vec2 velocity = (prevPos.xy - v_uv) / 16.0 * u_amount;
  vec2 uv = v_uv + bnoise.xy * velocity;
  vec4 color = vec4(0.0);
  float weightSum = 0.0;
  float weight = 1.0;
  float weightFalloff = 1.0;
  for (int i = 0; i < 16; i++) {
    color += texture2D(u_texture, uv) * weight;
    uv += velocity;
    weightSum += weight;
    weight *= weightFalloff;
  }
  gl_FragColor = color / weightSum;
}
`;

export const whiteTunnelParticleVertexShader = /* glsl */ `
#define GLSLIFY 1
attribute vec3 a_instancePosition;
attribute vec3 a_instanceRotationAxis;
attribute vec4 a_instanceRand;
attribute float thickness;
uniform float u_time;
uniform float u_aspect;
uniform float u_activeRatio;
varying vec3 v_viewNormal;
varying float v_thickness;
varying vec3 v_cameraPositionLS;
varying vec3 v_positionLS;
varying vec3 v_normalLS;
varying vec4 v_orient;
varying float v_fadeOut;

#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float elasticOut(float t) {
  return sin(-13.0 * (t + 1.0) * HALF_PI) * pow(2.0, -10.0 * t) + 1.0;
}

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

vec3 qrotate(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec4 quaternion(vec3 axis, float halfAngle) {
  return vec4(axis * sin(halfAngle), cos(halfAngle));
}

void main() {
  float time = 0.5 * u_time + 4.0 * a_instanceRand.x;
  float scale = 0.75;
  vec3 pos = position;
  vec4 orient = quaternion(a_instanceRotationAxis, (0.5 + a_instanceRand.y) * time);
  pos = qrotate(orient, pos);
  pos *= scale;
  vec3 nor = qrotate(orient, normal);
  vec3 instancePosition = a_instancePosition;
  instancePosition.y += 0.5 * u_time * (1.0 + a_instanceRand.x);
  float yLimit = 20.0 / u_aspect;
  instancePosition.y = mod(instancePosition.y, yLimit) - 0.5 * yLimit;
  v_fadeOut = abs(instancePosition.y) / (yLimit * 0.5);
  pos *= linearStep(a_instanceRand.w * 0.5, a_instanceRand.w * 0.5 + 0.5, u_activeRatio);
  pos += instancePosition;
  vec4 orientInv = vec4(-orient.xyz, orient.w);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_cameraPositionLS = qrotate(orientInv, (cameraPosition - instancePosition) / scale);
  v_positionLS = position * scale;
  v_normalLS = normal;
  v_orient = orient;
  v_viewNormal = normalMatrix * nor;
  v_thickness = thickness;
}
`;

export const whiteTunnelParticleFragmentShader = /* glsl */ `
#define GLSLIFY 1
uniform vec3 u_color;
uniform vec3 u_bgColor;
uniform vec4 u_planes[25];
uniform mat3 normalMatrix;
varying vec3 v_viewNormal;
varying float v_thickness;
varying vec3 v_cameraPositionLS;
varying vec3 v_positionLS;
varying vec3 v_normalLS;
varying vec4 v_orient;
varying float v_fadeOut;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float plaIntersect(in vec3 ro, in vec3 rd, in vec4 p) {
  return -(dot(ro, p.xyz) + p.w) / dot(rd, p.xyz);
}

vec4 getColorShade(vec3 dir, vec3 vn) {
  float d = dot(dir, vn);
  float shade = (1.0 - max(0.0, vn.z)) * v_thickness * 5.0;
  shade *= (pow(linearStep(2.0, -1.0, d), 4.0) * 0.15 + pow(linearStep(1.0, -2.0, d), 5.0) * 7.0);
  vec3 rgb = mix(vec3(0.8), clamp(abs(mod((d + vn.z) * 12.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0), 1.0 - shade);
  return vec4((vec3(u_color) + rgb * 1.2) * shade, 0.035 + (1.0 - v_thickness) * shade * shade) * (1.0 - abs(vn.z));
}

vec3 qrotate(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

void main() {
  vec3 localDir = normalize(v_positionLS);
  vec3 viewNormal = normalize(v_viewNormal);
  float ior = 2.418;
  vec3 norLS = normalize(v_normalLS);
  vec3 refrLS = refract(normalize(v_positionLS - v_cameraPositionLS), norLS, 1.0 / ior);
  float dist = 100.0;
  vec3 planeDir = vec3(0.0);
  for (int i = 0; i < 25; i++) {
    vec4 plane = u_planes[i];
    plane.xyz *= -1.0;
    plane.w *= 0.7501;
    float hitDist = plaIntersect(v_positionLS + refrLS * 0.001, refrLS, plane);
    if (hitDist > 0.0 && hitDist < dist) {
      dist = hitDist;
      planeDir = u_planes[i].xyz;
    }
  }
  vec3 refrPosLS = v_positionLS + refrLS * dist;
  refrLS = refract(refrLS, planeDir, ior);
  vec3 refrLocalDir = qrotate(v_orient, normalize(refrPosLS));
  vec3 viewPlaneNor = normalMatrix * qrotate(v_orient, planeDir);
  vec4 frontColorShade = getColorShade(localDir, viewNormal);
  vec4 backColorShade = getColorShade(refrLocalDir, viewPlaneNor);
  gl_FragColor = frontColorShade * 1.5 + vec4(backColorShade.rgb * 0.75, backColorShade.a * 0.5);
  gl_FragColor.rgb = mix(u_bgColor, gl_FragColor.rgb, linearStep(0.0, 0.1, 1.0 - v_fadeOut));
}
`;

export const whiteTunnelStickerVertexShader = /* glsl */ `
#define GLSLIFY 1
attribute float instanceId;
attribute vec4 instanceUvInfo;
attribute vec4 instanceRands;
uniform float u_time;
uniform float u_activeRatio;
uniform float u_aspect;
uniform vec2 u_textureSize;
varying float v_fadeOut;
varying vec2 v_uv;

vec4 hash42(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
  p4 += dot(p4, p4.wzxy + 33.33);
  return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, s, -s, c);
  return m * v;
}

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  vec3 pos = position;
  pos.xy *= instanceUvInfo.zw * u_textureSize * 0.01;
  float t = u_time * mix(0.05, 0.1, instanceRands.x) + instanceRands.y;
  float cycle = floor(t);
  float ratio = fract(t);
  vec4 cycleRands = hash42(vec2(cycle, instanceId));
  pos.xy = rotate(pos.xy, instanceRands.z * 6.28 + sign(cycleRands.z - 0.5) * u_time * mix(0.5, 1.0, cycleRands.y)) * linearStep(instanceRands.w * 0.5, instanceRands.w * 0.5 + 0.5, u_activeRatio) * 0.35;
  float yLimit = 7.0 / u_aspect;
  vec3 instancePos = vec3(mix(-5.0, 5.0, cycleRands.x), yLimit * mix(-1.0, 1.0, ratio), 20.0 + instanceId / float(COUNT));
  pos += instancePos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_uv = instanceUvInfo.xy + instanceUvInfo.zw * vec2(uv.x, 1.0 - uv.y);
  v_uv.y = 1.0 - v_uv.y;
  v_fadeOut = 2.0 * abs(ratio - 0.5);
}
`;

export const whiteTunnelStickerFragmentShader = /* glsl */ `
#define GLSLIFY 1
uniform sampler2D u_texture;
uniform vec3 u_bgColor;
varying vec2 v_uv;
varying float v_fadeOut;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  gl_FragColor = texture2D(u_texture, v_uv);
  gl_FragColor.rgb = mix(u_bgColor, gl_FragColor.rgb, linearStep(0.0, 0.1, 1.0 - v_fadeOut));
}
`;
