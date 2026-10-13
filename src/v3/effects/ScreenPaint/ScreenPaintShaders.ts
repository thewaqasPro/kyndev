/**
 * ScreenPaint Shaders
 *
 * Exact 1-to-1 reverse-engineered GLSL shaders vert$k, frag$o, frag$n from deobfuscated.js (lines 4086–4102).
 */

export const screenPaintVert = `
uniform vec2 u_clipScale;
uniform vec2 u_clipOffset;
varying vec2 v_uv;

void main() {
  vec3 pos = position;
  vec3 absPos = abs(position);
  if (max(absPos.x, absPos.y) < 0.9) {
    pos.xy = pos.xy * u_clipScale + u_clipOffset;
    pos *= 2.0;
  }
  gl_Position = vec4(pos, 1.0);
  v_uv = vec2(pos.x, pos.y) * 0.5 + 0.5;
}
`;

export const screenPaintClearFrag = `
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform float u_aspect;
uniform vec2 u_smooth;
uniform vec2 u_resolution;
varying vec2 v_uv;

void main() {
  vec2 q = vec2(v_uv - 0.5);
  q.x *= u_aspect;
  float dst = length(q);
  dst = smoothstep(u_smooth.x, u_smooth.y, dst);
  vec3 color = mix(u_color0, u_color1, 0.925 + 0.075 * dst);
  gl_FragColor = vec4(color, 0.0);
}
`;

export const screenPaintSimFrag = `
uniform sampler2D u_lowPaintTexture;
uniform sampler2D u_prevPaintTexture;
uniform vec2 u_paintTexelSize;
uniform vec2 u_scrollOffset;
uniform vec4 u_drawFrom;
uniform vec4 u_drawTo;
uniform float u_pushStrength;
uniform vec3 u_dissipations;
uniform vec2 u_vel;
varying vec2 v_uv;

vec2 sdSegment(in vec2 p, in vec2 a, in vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return vec2(length(pa - ba * h), h);
}

void main() {
  vec2 res = sdSegment(gl_FragCoord.xy, u_drawFrom.xy, u_drawTo.xy);
  vec2 radiusWeight = mix(u_drawFrom.zw, u_drawTo.zw, res.y);
  float d = 1.0 - smoothstep(-0.01, radiusWeight.x, res.x);
  
  vec4 lowData = texture2D(u_lowPaintTexture, v_uv - u_scrollOffset);
  vec2 velInv = (0.5 - lowData.xy) * u_pushStrength;
  
  vec4 data = texture2D(u_prevPaintTexture, v_uv - u_scrollOffset + velInv * u_paintTexelSize);
  data.xy -= 0.5;
  
  vec4 delta = (u_dissipations.xxyz - 1.0) * data;
  vec2 newVel = u_vel * d;
  delta += vec4(newVel, radiusWeight.yy * d);
  delta.zw = sign(delta.zw) * max(vec2(0.004), abs(delta.zw));
  
  data += delta;
  data.xy += 0.5;
  gl_FragColor = clamp(data, vec4(0.0), vec4(1.0));
}
`;
