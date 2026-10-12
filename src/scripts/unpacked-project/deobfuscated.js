/**
 * KYNDEV WebGL & Interactive Experience Runtime
 * Decoupled from vendored Three.js - Powered by official three@158
 */
import * as THREE from "three";
if (typeof window !== "undefined") {
  window.THREE = THREE;
  window.__THREE__ = THREE.REVISION;
}
const {
  ACESFilmicToneMapping,
  AddEquation,
  AddOperation,
  AdditiveAnimationBlendMode,
  AdditiveBlending,
  AlphaFormat,
  AlwaysCompare,
  AlwaysDepth,
  AlwaysStencilFunc,
  AmbientLight,
  AnimationAction,
  AnimationClip,
  AnimationLoader,
  AnimationMixer,
  AnimationObjectGroup,
  AnimationUtils,
  ArcCurve,
  ArrayCamera,
  ArrowHelper,
  AttachedBindMode,
  Audio,
  AudioAnalyser,
  AudioContext,
  AudioListener,
  AudioLoader,
  AxesHelper,
  BackSide,
  BasicDepthPacking,
  BasicShadowMap,
  Bone,
  BooleanKeyframeTrack,
  Box2,
  Box3,
  Box3Helper,
  BoxGeometry,
  BoxHelper,
  BufferAttribute,
  BufferGeometry,
  BufferGeometryLoader,
  ByteType,
  Cache,
  Camera,
  CameraHelper,
  CanvasTexture,
  CapsuleGeometry,
  CatmullRomCurve3,
  CineonToneMapping,
  CircleGeometry,
  ClampToEdgeWrapping,
  Clock,
  Color,
  ColorKeyframeTrack,
  ColorManagement,
  CompressedArrayTexture,
  CompressedCubeTexture,
  CompressedTexture,
  CompressedTextureLoader,
  ConeGeometry,
  ConstantAlphaFactor,
  ConstantColorFactor,
  CubeCamera,
  CubeReflectionMapping,
  CubeRefractionMapping,
  CubeTexture,
  CubeTextureLoader,
  CubeUVReflectionMapping,
  CubicBezierCurve,
  CubicBezierCurve3,
  CubicInterpolant,
  CullFaceBack,
  CullFaceFront,
  CullFaceFrontBack,
  CullFaceNone,
  Curve,
  CurvePath,
  CustomBlending,
  CustomToneMapping,
  CylinderGeometry,
  Cylindrical,
  Data3DTexture,
  DataArrayTexture,
  DataTexture,
  DataTextureLoader,
  DataUtils,
  DecrementStencilOp,
  DecrementWrapStencilOp,
  DefaultLoadingManager,
  DepthFormat,
  DepthStencilFormat,
  DepthTexture,
  DetachedBindMode,
  DirectionalLight,
  DirectionalLightHelper,
  DiscreteInterpolant,
  DisplayP3ColorSpace,
  DodecahedronGeometry,
  DoubleSide,
  DstAlphaFactor,
  DstColorFactor,
  DynamicCopyUsage,
  DynamicDrawUsage,
  DynamicReadUsage,
  EdgesGeometry,
  EllipseCurve,
  EqualCompare,
  EqualDepth,
  EqualStencilFunc,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  Euler,
  EventDispatcher,
  ExtrudeGeometry,
  FileLoader,
  Float16BufferAttribute,
  Float32BufferAttribute,
  Float64BufferAttribute,
  FloatType,
  Fog,
  FogExp2,
  FramebufferTexture,
  FrontSide,
  Frustum,
  GLBufferAttribute,
  GLSL1,
  GLSL3,
  GreaterCompare,
  GreaterDepth,
  GreaterEqualCompare,
  GreaterEqualDepth,
  GreaterEqualStencilFunc,
  GreaterStencilFunc,
  GridHelper,
  Group,
  HalfFloatType,
  HemisphereLight,
  HemisphereLightHelper,
  IcosahedronGeometry,
  ImageBitmapLoader,
  ImageLoader,
  ImageUtils,
  IncrementStencilOp,
  IncrementWrapStencilOp,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  InstancedInterleavedBuffer,
  InstancedMesh,
  Int16BufferAttribute,
  Int32BufferAttribute,
  Int8BufferAttribute,
  IntType,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Interpolant,
  InterpolateDiscrete,
  InterpolateLinear,
  InterpolateSmooth,
  InvertStencilOp,
  KeepStencilOp,
  KeyframeTrack,
  LOD,
  LatheGeometry,
  Layers,
  LessCompare,
  LessDepth,
  LessEqualCompare,
  LessEqualDepth,
  LessEqualStencilFunc,
  LessStencilFunc,
  Light,
  LightProbe,
  Line3,
  LineBasicMaterial,
  LineCurve,
  LineCurve3,
  LineDashedMaterial,
  LineLoop,
  LineSegments,
  LinearDisplayP3ColorSpace,
  LinearEncoding,
  LinearFilter,
  LinearInterpolant,
  LinearMipMapLinearFilter,
  LinearMipMapNearestFilter,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  LinearSRGBColorSpace,
  LinearToneMapping,
  LinearTransfer,
  Loader,
  LoaderUtils,
  LoadingManager,
  LoopOnce,
  LoopPingPong,
  LoopRepeat,
  LuminanceAlphaFormat,
  LuminanceFormat,
  MOUSE,
  Material,
  MaterialLoader,
  Matrix3,
  Matrix4,
  MaxEquation,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  MinEquation,
  MirroredRepeatWrapping,
  MixOperation,
  MultiplyBlending,
  MultiplyOperation,
  NearestFilter,
  NearestMipMapLinearFilter,
  NearestMipMapNearestFilter,
  NearestMipmapLinearFilter,
  NearestMipmapNearestFilter,
  NeverCompare,
  NeverDepth,
  NeverStencilFunc,
  NoBlending,
  NoColorSpace,
  NoToneMapping,
  NormalAnimationBlendMode,
  NormalBlending,
  NotEqualCompare,
  NotEqualDepth,
  NotEqualStencilFunc,
  NumberKeyframeTrack,
  Object3D,
  ObjectLoader,
  ObjectSpaceNormalMap,
  OctahedronGeometry,
  OneFactor,
  OneMinusConstantAlphaFactor,
  OneMinusConstantColorFactor,
  OneMinusDstAlphaFactor,
  OneMinusDstColorFactor,
  OneMinusSrcAlphaFactor,
  OneMinusSrcColorFactor,
  OrthographicCamera,
  P3Primaries,
  PCFShadowMap,
  PCFSoftShadowMap,
  PMREMGenerator,
  Path,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  PlaneHelper,
  PointLight,
  PointLightHelper,
  Points,
  PointsMaterial,
  PolarGridHelper,
  PolyhedronGeometry,
  PositionalAudio,
  PropertyBinding,
  PropertyMixer,
  QuadraticBezierCurve,
  QuadraticBezierCurve3,
  Quaternion,
  QuaternionKeyframeTrack,
  QuaternionLinearInterpolant,
  RED_GREEN_RGTC2_Format,
  RED_RGTC1_Format,
  REVISION,
  RGBADepthPacking,
  RGBAFormat,
  RGBAIntegerFormat,
  RGBA_ASTC_10x10_Format,
  RGBA_ASTC_10x5_Format,
  RGBA_ASTC_10x6_Format,
  RGBA_ASTC_10x8_Format,
  RGBA_ASTC_12x10_Format,
  RGBA_ASTC_12x12_Format,
  RGBA_ASTC_4x4_Format,
  RGBA_ASTC_5x4_Format,
  RGBA_ASTC_5x5_Format,
  RGBA_ASTC_6x5_Format,
  RGBA_ASTC_6x6_Format,
  RGBA_ASTC_8x5_Format,
  RGBA_ASTC_8x6_Format,
  RGBA_ASTC_8x8_Format,
  RGBA_BPTC_Format,
  RGBA_ETC2_EAC_Format,
  RGBA_PVRTC_2BPPV1_Format,
  RGBA_PVRTC_4BPPV1_Format,
  RGBA_S3TC_DXT1_Format,
  RGBA_S3TC_DXT3_Format,
  RGBA_S3TC_DXT5_Format,
  RGB_BPTC_SIGNED_Format,
  RGB_BPTC_UNSIGNED_Format,
  RGB_ETC1_Format,
  RGB_ETC2_Format,
  RGB_PVRTC_2BPPV1_Format,
  RGB_PVRTC_4BPPV1_Format,
  RGB_S3TC_DXT1_Format,
  RGFormat,
  RGIntegerFormat,
  RawShaderMaterial,
  Ray,
  Raycaster,
  Rec709Primaries,
  RectAreaLight,
  RedFormat,
  RedIntegerFormat,
  ReinhardToneMapping,
  RenderTarget,
  RepeatWrapping,
  ReplaceStencilOp,
  ReverseSubtractEquation,
  RingGeometry,
  SIGNED_RED_GREEN_RGTC2_Format,
  SIGNED_RED_RGTC1_Format,
  SRGBColorSpace,
  SRGBTransfer,
  Scene,
  ShaderChunk,
  ShaderLib,
  ShaderMaterial,
  ShadowMaterial,
  Shape,
  ShapeGeometry,
  ShapePath,
  ShapeUtils,
  ShortType,
  Skeleton,
  SkeletonHelper,
  SkinnedMesh,
  Source,
  Sphere,
  SphereGeometry,
  Spherical,
  SphericalHarmonics3,
  SplineCurve,
  SpotLight,
  SpotLightHelper,
  Sprite,
  SpriteMaterial,
  SrcAlphaFactor,
  SrcAlphaSaturateFactor,
  SrcColorFactor,
  StaticCopyUsage,
  StaticDrawUsage,
  StaticReadUsage,
  StereoCamera,
  StreamCopyUsage,
  StreamDrawUsage,
  StreamReadUsage,
  StringKeyframeTrack,
  SubtractEquation,
  SubtractiveBlending,
  TOUCH,
  TangentSpaceNormalMap,
  TetrahedronGeometry,
  Texture,
  TextureLoader,
  TorusGeometry,
  TorusKnotGeometry,
  Triangle,
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  TrianglesDrawMode,
  TubeGeometry,
  TwoPassDoubleSide,
  UVMapping,
  Uint16BufferAttribute,
  Uint32BufferAttribute,
  Uint8BufferAttribute,
  Uint8ClampedBufferAttribute,
  Uniform,
  UniformsGroup,
  UniformsLib,
  UniformsUtils,
  UnsignedByteType,
  UnsignedInt248Type,
  UnsignedIntType,
  UnsignedShort4444Type,
  UnsignedShort5551Type,
  UnsignedShortType,
  VSMShadowMap,
  Vector2,
  Vector3,
  Vector4,
  VectorKeyframeTrack,
  VideoTexture,
  WebGL1Renderer,
  WebGL3DRenderTarget,
  WebGLArrayRenderTarget,
  WebGLCoordinateSystem,
  WebGLCubeRenderTarget,
  WebGLMultipleRenderTargets,
  WebGLRenderTarget,
  WebGLRenderer,
  WebGLUtils,
  WebGPUCoordinateSystem,
  WireframeGeometry,
  WrapAroundEnding,
  ZeroCurvatureEnding,
  ZeroFactor,
  ZeroSlopeEnding,
  ZeroStencilOp,
  _SRGBAFormat,
  createCanvasElement,
  sRGBEncoding
} = THREE;
const Audio$1 = THREE.Audio;
const MathUtils$1 = THREE.MathUtils;
class MathUtils {
  PI = Math.PI;
  PI2 = this.PI * 2;
  HALF_PI = this.PI * 0.5;
  DEG2RAD = this.PI / 180;
  RAD2DEG = 180 / this.PI;
  linearStep(e, t, r) {
    return this.clamp((r - e) / (t - e), 0, 1);
  }
  step(e, t) {
    if (t < e) {
      return 0;
    } else {
      return 1;
    }
  }
  clamp(e, t, r) {
    if (e < t) {
      return t;
    } else if (e > r) {
      return r;
    } else {
      return e;
    }
  }
  mod(e, t) {
    return e - t * Math.floor(e / t);
  }
  mix(e, t, r) {
    return e + (t - e) * r;
  }
  cMix(e, t, r) {
    return e + (t - e) * this.clamp(r, 0, 1);
  }
  unMix(e, t, r) {
    return (r - e) / (t - e);
  }
  cUnMix(e, t, r) {
    return this.clamp((r - e) / (t - e), 0, 1);
  }
  saturate(e) {
    return this.clamp(e, 0, 1);
  }
  fit(e, t, r, n, a, l) {
    e = this.cUnMix(t, r, e);
    if (l) {
      e = l(e);
    }
    return n + e * (a - n);
  }
  unClampedFit(e, t, r, n, a, l) {
    e = this.unMix(t, r, e);
    if (l) {
      e = l(e);
    }
    return n + e * (a - n);
  }
  lerp(e, t, r) {
    return e * (1 - r) + t * r;
  }
  loop(e, t, r) {
    e -= t;
    r -= t;
    return (e < 0 ? (r - Math.abs(e) % r) % r : e % r) + t;
  }
  normalize(e, t, r) {
    return Math.max(0, Math.min(1, e - t / r - t));
  }
  smoothstep(e, t, r) {
    r = this.cUnMix(e, t, r);
    return r * r * (3 - r * 2);
  }
  fract(e) {
    return e - Math.floor(e);
  }
  hash(e) {
    return this.fract(Math.sin(e) * 43758.5453123);
  }
  hash2(e, t) {
    return this.fract(Math.sin(e * 12.9898 + t * 4.1414) * 43758.5453);
  }
  sign(e) {
    if (e) {
      if (e < 0) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  isPowerOfTwo(e) {
    return (e & -e) === e;
  }
  powerTwoCeilingBase(e) {
    return Math.ceil(Math.log(e) / Math.log(2));
  }
  powerTwoCeiling(e) {
    if (this.isPowerOfTwo(e)) {
      return e;
    } else {
      return 1 << this.powerTwoCeilingBase(e);
    }
  }
  powerTwoFloorBase(e) {
    return Math.floor(Math.log(e) / Math.log(2));
  }
  powerTwoFloor(e) {
    if (this.isPowerOfTwo(e)) {
      return e;
    } else {
      return 1 << this.powerTwoFloorBase(e);
    }
  }
  latLngBearing(e, t, r, n) {
    let a = Math.sin(n - t) * Math.cos(r);
    let l = Math.cos(e) * Math.sin(r) - Math.sin(e) * Math.cos(r) * Math.cos(n - t);
    return Math.atan2(a, l);
  }
  distanceTo(e, t) {
    return Math.sqrt(e * e + t * t);
  }
  distanceSqrTo(e, t) {
    return e * e + t * t;
  }
  distanceTo3(e, t, r) {
    return Math.sqrt(e * e + t * t + r * r);
  }
  distanceSqrTo3(e, t, r) {
    return e * e + t * t + r * r;
  }
  latLngDistance(e, t, r, n) {
    let a = Math.sin((r - e) / 2);
    let l = Math.sin((n - t) / 2);
    let c = a * a + Math.cos(e) * Math.cos(r) * l * l;
    return Math.atan2(Math.sqrt(c), Math.sqrt(1 - c)) * 2;
  }
  cubicBezier(e, t, r, n, a) {
    let l = (t - e) * 3;
    let c = (r - t) * 3 - l;
    let u = n - e - l - c;
    let f = a * a;
    let p = f * a;
    return u * p + c * f + l * a + e;
  }
  cubicBezierFn(e, t, r, n) {
    let a = (t - e) * 3;
    let l = (r - t) * 3 - a;
    let c = n - e - a - l;
    return u => {
      let f = u * u;
      let p = f * u;
      return c * p + l * f + a * u + e;
    };
  }
  normalizeAngle(e) {
    e += this.PI;
    e = e < 0 ? this.PI2 - Math.abs(e % PI2) : e % this.PI2;
    e -= this.PI;
    return e;
  }
  closestAngleTo(e, t) {
    return e + this.normalizeAngle(t - e);
  }
  randomRange(e, t) {
    return e + Math.random() * (t - e);
  }
  randomRangeInt(e, t) {
    return Math.floor(this.randomRange(e, t + 1));
  }
  padZero(e, t) {
    if (e.toString().length >= t) {
      return e;
    } else {
      return (Math.pow(10, t) + Math.floor(e)).toString().substring(1);
    }
  }
  lerpColor(e, t, r) {
    const n = e >> 16;
    const a = e >> 8 & 255;
    const l = e & 255;
    const c = t >> 16;
    const u = t >> 8 & 255;
    const f = t & 255;
    const p = n + r * (c - n);
    const g = a + r * (u - a);
    const v = l + r * (f - l);
    return (p << 16) + (g << 8) + (v | 0);
  }
  getSeedRandomFn(e) {
    let t = 1779033703;
    let r = 3144134277;
    let n = 1013904242;
    let a = 2773480762;
    for (let l = 0, c; l < e.length; l++) {
      c = e.charCodeAt(l);
      t = r ^ Math.imul(t ^ c, 597399067);
      r = n ^ Math.imul(r ^ c, 2869860233);
      n = a ^ Math.imul(n ^ c, 951274213);
      a = t ^ Math.imul(a ^ c, 2716044179);
    }
    return _sfc32(Math.imul(n ^ t >>> 18, 597399067), Math.imul(a ^ r >>> 22, 2869860233), Math.imul(t ^ n >>> 17, 951274213), Math.imul(r ^ a >>> 19, 2716044179));
  }
}
function _sfc32(o, e, t, r) {
  return function () {
    o |= 0;
    e |= 0;
    t |= 0;
    r |= 0;
    var n = (o + e | 0) + r | 0;
    r = r + 1 | 0;
    o = e ^ e >>> 9;
    e = t + (t << 3) | 0;
    t = t << 21 | t >>> 11;
    t = t + n | 0;
    return (n >>> 0) / 4294967296;
  };
}
const math = new MathUtils();
var isSSR = typeof window === "undefined";
var DetectUA = function () {
  function o(e) {
    this.userAgent = e || (!isSSR && window.navigator ? window.navigator.userAgent : "");
    this.isAndroidDevice = !/like android/i.test(this.userAgent) && /android/i.test(this.userAgent);
    this.iOSDevice = this.match(1, /(iphone|ipod|ipad)/i).toLowerCase();
    if (!isSSR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 2 && !window.MSStream) {
      this.iOSDevice = "ipad";
    }
  }
  o.prototype.match = function (e, t) {
    var r = this.userAgent.match(t);
    return r && r.length > 1 && r[e] || "";
  };
  Object.defineProperty(o.prototype, "isMobile", {
    get: function () {
      return !this.isTablet && (/[^-]mobi/i.test(this.userAgent) || this.iOSDevice === "iphone" || this.iOSDevice === "ipod" || this.isAndroidDevice || /nexus\s*[0-6]\s*/i.test(this.userAgent));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isTablet", {
    get: function () {
      return /tablet/i.test(this.userAgent) && !/tablet pc/i.test(this.userAgent) || this.iOSDevice === "ipad" || this.isAndroidDevice && !/[^-]mobi/i.test(this.userAgent) || !/nexus\s*[0-6]\s*/i.test(this.userAgent) && /nexus\s*[0-9]+/i.test(this.userAgent);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isDesktop", {
    get: function () {
      return !this.isMobile && !this.isTablet;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isMacOS", {
    get: function () {
      return /macintosh/i.test(this.userAgent) && {
        version: this.match(1, /mac os x (\d+(\.?_?\d+)+)/i).replace(/[_\s]/g, ".").split(".").map(function (e) {
          return e;
        })[1]
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isWindows", {
    get: function () {
      return /windows /i.test(this.userAgent) && {
        version: this.match(1, /Windows ((NT|XP)( \d\d?.\d)?)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isiOS", {
    get: function () {
      return !!this.iOSDevice && {
        version: this.match(1, /os (\d+([_\s]\d+)*) like mac os x/i).replace(/[_\s]/g, ".") || this.match(1, /version\/(\d+(\.\d+)?)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isAndroid", {
    get: function () {
      return this.isAndroidDevice && {
        version: this.match(1, /android[ \/-](\d+(\.\d+)*)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "browser", {
    get: function () {
      var e = this.match(1, /version\/(\d+(\.\d+)?)/i);
      if (/opera/i.test(this.userAgent)) {
        return {
          name: "Opera",
          version: e || this.match(1, /(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/opr\/|opios/i.test(this.userAgent)) {
        return {
          name: "Opera",
          version: this.match(1, /(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || e
        };
      } else if (/SamsungBrowser/i.test(this.userAgent)) {
        return {
          name: "Samsung Internet for Android",
          version: e || this.match(1, /(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/yabrowser/i.test(this.userAgent)) {
        return {
          name: "Yandex Browser",
          version: e || this.match(1, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/ucbrowser/i.test(this.userAgent)) {
        return {
          name: "UC Browser",
          version: this.match(1, /(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/msie|trident/i.test(this.userAgent)) {
        return {
          name: "Internet Explorer",
          version: this.match(1, /(?:msie |rv:)(\d+(\.\d+)?)/i)
        };
      } else if (/(edge|edgios|edga|edg)/i.test(this.userAgent)) {
        return {
          name: "Microsoft Edge",
          version: this.match(2, /(edge|edgios|edga|edg)\/(\d+(\.\d+)?)/i)
        };
      } else if (/firefox|iceweasel|fxios/i.test(this.userAgent)) {
        return {
          name: "Firefox",
          version: this.match(1, /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        };
      } else if (/chromium/i.test(this.userAgent)) {
        return {
          name: "Chromium",
          version: this.match(1, /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || e
        };
      } else if (/chrome|crios|crmo/i.test(this.userAgent)) {
        return {
          name: "Chrome",
          version: this.match(1, /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (/safari|applewebkit/i.test(this.userAgent)) {
        return {
          name: "Safari",
          version: e
        };
      } else {
        return {
          name: this.match(1, /^(.*)\/(.*) /),
          version: this.match(2, /^(.*)\/(.*) /)
        };
      }
    },
    enumerable: false,
    configurable: true
  });
  return o;
}();
ColorManagement.enabled = false;
let detectUA = new DetectUA();
let userAgent = (navigator.userAgent || navigator.vendor).toLowerCase();
let browserName = detectUA.browser.name;
let audioElem = document.createElement("audio");
class Browser {
  isMobile = detectUA.isMobile || detectUA.isTablet;
  isDesktop = detectUA.isDesktop;
  device = this.isMobile ? "mobile" : "desktop";
  isAndroid = !!detectUA.isAndroid;
  isIOS = !!detectUA.isiOS;
  isMacOS = !!detectUA.isMacOS;
  isWindows = detectUA.isWindows.version !== null;
  isLinux = userAgent.indexOf("linux") != -1;
  ua = userAgent;
  isEdge = browserName === "Microsoft Edge";
  isIE = browserName === "Internet Explorer";
  isFirefox = browserName === "Firefox";
  isChrome = browserName === "Chrome";
  isOpera = browserName === "Opera";
  isSafari = browserName === "Safari";
  isSupportMSAA = !userAgent.match("version/15.4 ");
  isSupportOgg = !!audioElem.canPlayType("audio/ogg");
  isRetina = window.devicePixelRatio && window.devicePixelRatio >= 1.5;
  devicePixelRatio = window.devicePixelRatio || 1;
  cpuCoreCount = navigator.hardwareConcurrency || 1;
  baseUrl = document.location.origin;
  isIFrame = window.self !== window.top;
  constructor() {}
}
const browser$1 = new Browser();
let CDN_PATH = "";
/* local assets */
CDN_PATH = "";
if (window.location.hostname == "lusion.dev") {
  window.location.href = "https://lusion.co" + window.location.pathname + window.location.search;
}
class Settings {
  CDN_PATH = "";
  TEAM_PATH = "/assets/team/";
  PROJECT_PATH = "/assets/projects/";
  MODEL_PATH = "/assets/models/";
  IMAGE_PATH = "/assets/images/";
  TEXTURE_PATH = "/assets/textures/";
  AUDIO_PATH = "/assets/audios/";
  SPRITE_PATH = "/assets/sprites/";
  RENDER_TARGET_FLOAT_TYPE = null;
  DATA_FLOAT_TYPE = null;
  USE_FLOAT_PACKING = false;
  USE_WEBGL2 = true;
  DPR = Math.min(1.5, browser$1.devicePixelRatio) || 1;
  USE_PIXEL_LIMIT = true;
  MAX_PIXEL_COUNT = 3686400;
  MOBILE_WIDTH = 812;
  IS_SMALL_SCREEN = Math.min(window.screen.width, window.screen.height) <= 820;
  JUMP_SECTION = "";
  JUMP_OFFSET = 0;
  USE_HD = false;
  SHOW_DETAILS = "";
  CROSS_ORIGINS = {
    "https://lusion.dev/": "anonymous"
  };
  IS_DEV = false;
  LOG = false;
  SKIP_ANIMATION = false;
  WEBGL_OFF = false;
  LOOK_DEV_MODE = false;
  TEST_TUNNEL = false;
  HOME_TEST = false;
  OPEN_CONTACT = false;
  TEST_BALLOONS = false;
  BALLOON_COLOR = "";
  USE_AUDIO = browser$1.isSupportOgg && !browser$1.isMobile;
  constructor() {
    if (window.URLSearchParams) {
      const t = (r => [...r].reduce((n, [a, l]) => {
        n[a] = l === "" ? true : l;
        return n;
      }, {}))(new URLSearchParams(window.location.search));
      this.override(t);
      for (const r in this) {
        if (r.indexOf("_PATH") > -1) {
          this["LOCAL_" + r] = this[r];
          this[r] = CDN_PATH + this[r];
        }
      }
    }
  }
  override(e) {
    for (const t in e) {
      if (this[t] !== undefined) {
        const r = e[t].toString();
        if (typeof this[t] == "boolean") {
          this[t] = r !== "0" && r !== false;
        } else if (typeof this[t] == "number") {
          this[t] = parseFloat(r);
        } else if (typeof this[t] == "string") {
          this[t] = r;
        }
      }
    }
    if (this.USE_HD) {
      this.USE_PIXEL_LIMIT = false;
    }
  }
}
const settings = new Settings();
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(o) {
  if (o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")) {
    return o.default;
  } else {
    return o;
  }
}
var minSignal$1 = {
  exports: {}
};
(function (o) {
  (function (e) {
    function t() {
      this._listeners = [];
      this.dispatchCount = 0;
    }
    var r = t.prototype;
    r.add = c;
    r.addOnce = u;
    r.remove = f;
    r.dispatch = p;
    var n = "Callback function is missing!";
    var a = Array.prototype.slice;
    function l(g) {
      g.sort(function (v, _) {
        v = v.p;
        _ = _.p;
        if (_ < v) {
          return 1;
        } else if (_ > v) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    function c(g, v, _, T) {
      if (!g) {
        throw n;
      }
      _ = _ || 0;
      var M = this._listeners;
      var S;
      var b;
      var C;
      for (var w = M.length; w--;) {
        S = M[w];
        if (S.f === g && S.c === v) {
          return false;
        }
      }
      if (typeof _ == "function") {
        b = _;
        _ = T;
        C = 4;
      }
      M.unshift({
        f: g,
        c: v,
        p: _,
        r: b || g,
        a: a.call(arguments, C || 3),
        j: 0
      });
      l(M);
    }
    function u(g, v, _, T) {
      if (!g) {
        throw n;
      }
      var M = this;
      function S() {
        M.remove.call(M, g, v);
        return g.apply(v, a.call(arguments, 0));
      }
      T = a.call(arguments, 0);
      if (T.length === 1) {
        T.push(e);
      }
      T.splice(2, 0, S);
      c.apply(M, T);
    }
    function f(g, v) {
      if (!g) {
        this._listeners.length = 0;
        return true;
      }
      var _ = this._listeners;
      var T;
      for (var M = _.length; M--;) {
        T = _[M];
        if (T.f === g && (!v || T.c === v)) {
          T.j = 0;
          _.splice(M, 1);
          return true;
        }
      }
      return false;
    }
    function p(g) {
      g = a.call(arguments, 0);
      this.dispatchCount++;
      var v = this.dispatchCount;
      var _ = this._listeners;
      var T;
      var M;
      for (var S = _.length; S--;) {
        T = _[S];
        if (T && T.j < v && (T.j = v, T.r.apply(T.c, T.a.concat(g)) === false)) {
          M = T;
          break;
        }
      }
      _ = this._listeners;
      S = _.length;
      while (S--) {
        _[S].j = 0;
      }
      return M;
    }
    o.exports = t;
  })();
})(minSignal$1);
var minSignalExports$1 = minSignal$1.exports;
const MinSignal$2 = getDefaultExportFromCjs(minSignalExports$1);
var quickLoader$b = {
  exports: {}
};
var minSignal = {
  exports: {}
};
(function (o) {
  (function (e) {
    function t() {
      this._listeners = [];
      this.dispatchCount = 0;
    }
    var r = t.prototype;
    r.add = c;
    r.addOnce = u;
    r.remove = f;
    r.dispatch = p;
    var n = "Callback function is missing!";
    var a = Array.prototype.slice;
    function l(g) {
      g.sort(function (v, _) {
        v = v.p;
        _ = _.p;
        if (_ < v) {
          return 1;
        } else if (v > _) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    function c(g, v, _, T) {
      if (!g) {
        throw n;
      }
      _ = _ || 0;
      var M = this._listeners;
      var S;
      var b;
      var C;
      for (var w = M.length; w--;) {
        S = M[w];
        if (S.f === g && S.c === v) {
          return false;
        }
      }
      if (typeof _ == "function") {
        b = _;
        _ = T;
        C = 4;
      }
      M.unshift({
        f: g,
        c: v,
        p: _,
        r: b || g,
        a: a.call(arguments, C || 3),
        j: 0
      });
      l(M);
    }
    function u(g, v, _, T) {
      if (!g) {
        throw n;
      }
      var M = this;
      function S() {
        M.remove.call(M, g, v);
        return g.apply(v, a.call(arguments, 0));
      }
      T = a.call(arguments, 0);
      if (T.length === 1) {
        T.push(e);
      }
      T.splice(2, 0, S);
      c.apply(M, T);
    }
    function f(g, v) {
      if (!g) {
        this._listeners.length = 0;
        return true;
      }
      var _ = this._listeners;
      var T;
      for (var M = _.length; M--;) {
        T = _[M];
        if (T.f === g && (!v || T.c === v)) {
          T.j = 0;
          _.splice(M, 1);
          return true;
        }
      }
      return false;
    }
    function p(g) {
      g = a.call(arguments, 0);
      this.dispatchCount++;
      var v = this.dispatchCount;
      var _ = this._listeners;
      var T;
      var M;
      for (var S = _.length; S--;) {
        T = _[S];
        if (T && T.j < v && (T.j = v, T.r.apply(T.c, T.a.concat(g)) === false)) {
          M = T;
          break;
        }
      }
      _ = this._listeners;
      S = _.length;
      while (S--) {
        _[S].j = 0;
      }
      return M;
    }
    o.exports = t;
  })();
})(minSignal);
var minSignalExports = minSignal.exports;
var MinSignal$1 = minSignalExports;
var undef$3;
function QuickLoader() {
  this.isLoading = false;
  this.totalWeight = 0;
  this.loadedWeight = 0;
  this.itemUrls = {};
  this.itemList = [];
  this.loadingSignal = new MinSignal$1();
  this.crossOriginMap = {};
  this.queue = [];
  this.activeItems = [];
  this.maxActiveItems = 4;
}
var _p$9 = QuickLoader.prototype;
_p$9.addChunk = addChunk;
_p$9.setCrossOrigin = setCrossOrigin;
_p$9.add = add;
_p$9.load = load$7;
_p$9.start = start$1;
_p$9.loadNext = loadNext;
_p$9._createItem = _createItem;
_p$9._onLoading = _onLoading$1;
_p$9.VERSION = "0.1.17";
_p$9.register = register;
_p$9.retrieveAll = retrieveAll;
_p$9.retrieve = retrieve;
_p$9.testExtensions = testExtensions;
_p$9.create = create;
_p$9.check = check;
var addedItems = _p$9.addedItems = {};
var loadedItems = _p$9.loadedItems = {};
var ITEM_CLASS_LIST = _p$9.ITEM_CLASS_LIST = [];
var ITEM_CLASSES = _p$9.ITEM_CLASSES = {};
quickLoader$b.exports = create();
function setCrossOrigin(o, e) {
  this.crossOriginMap[o] = e;
}
function addChunk(o, e) {
  var t;
  var r;
  var n;
  var a;
  var l;
  var c = retrieveAll(o, e);
  t = 0;
  n = c.length;
  for (; t < n; t++) {
    l = c[t];
    r = 0;
    a = l.items.length;
    for (; r < a; r++) {
      this.add(l.items[r], {
        type: l.type
      });
    }
  }
  return c;
}
function add(o, e) {
  var t = addedItems[o];
  t ||= this._createItem(o, e && e.type ? e.type : retrieve(o).type, e);
  if (e && e.onLoad) {
    t.onLoaded.addOnce(e.onLoad);
  }
  if (!this.itemUrls[o]) {
    this.itemUrls[o] = t;
    this.itemList.push(t);
    this.totalWeight += t.weight;
  }
  return t;
}
function load$7(o, e) {
  var t = addedItems[o];
  t ||= this._createItem(o, e && e.type ? e.type : retrieve(o).type, e);
  if (e && e.onLoad) {
    t.onLoaded.addOnce(e.onLoad);
  }
  if (loadedItems[o]) {
    t.dispatch();
  } else if (!t.isStartLoaded) {
    t.load();
  }
  return t;
}
function start$1(o) {
  if (o) {
    this.loadingSignal.add(o);
  }
  this.isLoading = true;
  var e = this.itemList.length;
  if (e) {
    var t = this.itemList.splice(0, this.itemList.length);
    var r;
    for (var n in this.itemUrls) {
      delete this.itemUrls[n];
    }
    for (var a = 0; a < e; a++) {
      r = t[a];
      var l = !!loadedItems[r.url];
      r.onLoaded.addOnce(_onItemLoad, this, -1024, r, t, l);
      if (r.hasLoading) {
        r.loadingSignal.add(_onLoading$1, this, -1024, r, t, undef$3);
      }
      if (l) {
        r.dispatch(_onItemLoad);
      } else if (!r.isStartLoaded) {
        this.queue.push(r);
      }
    }
    if (this.queue.length) {
      this.loadNext();
    }
  } else {
    _onItemLoad.call(this, undef$3, this.itemList);
  }
}
function loadNext() {
  if (this.queue.length && this.activeItems.length < this.maxActiveItems) {
    var o = this.queue.shift();
    this.activeItems.push(o);
    this.loadNext();
    o.load();
  }
}
function _onLoading$1(o, e, t, r, n) {
  if (!o || !!o.isLoaded || o.getCombinedPercent(r) !== 1) {
    if (n === undef$3) {
      this.loadedWeight = _getLoadedWeight(e);
      n = this.loadedWeight / this.totalWeight;
    }
    t = t || this.loadingSignal;
    t.dispatch(n, o);
  }
}
function _getLoadedWeight(o) {
  var e = 0;
  for (var t = 0, r = o.length; t < r; t++) {
    e += o[t].loadedWeight;
  }
  return e;
}
function _onItemLoad(o, e, t) {
  this.loadedWeight = _getLoadedWeight(e);
  if (!t) {
    var r = this.activeItems;
    for (var n = r.length; n--;) {
      if (r[n] === o) {
        r.splice(n, 1);
        break;
      }
    }
  }
  var a = this.loadingSignal;
  if (this.loadedWeight === this.totalWeight) {
    this.isLoading = false;
    this.loadedWeight = 0;
    this.totalWeight = 0;
    this.loadingSignal = new MinSignal$1();
    this._onLoading(o, e, a, 1, 1);
    if (o && o.noCache) {
      _removeItemCache(o);
    }
  } else {
    this._onLoading(o, e, a, 1, this.loadedWeight / this.totalWeight);
    if (o && o.noCache) {
      _removeItemCache(o);
    }
    if (!t) {
      this.loadNext();
    }
  }
}
function _removeItemCache(o) {
  var e = o.url;
  o.content = undef$3;
  addedItems[e] = undef$3;
  loadedItems[e] = undef$3;
}
function _createItem(o, e, t) {
  t = t || {};
  if (!t.crossOrigin) {
    for (var r in this.crossOriginMap) {
      if (o.indexOf(r) === 0) {
        t.crossOrigin = this.crossOriginMap[r];
        break;
      }
    }
  }
  return new ITEM_CLASSES[e](o, t);
}
function register(o) {
  if (!ITEM_CLASSES[o.type]) {
    ITEM_CLASS_LIST.push(o);
    ITEM_CLASSES[o.type] = o;
  }
}
function retrieveAll(o, e) {
  var t;
  var r;
  var n = o.length;
  var a = [];
  if (n && typeof o != "string") {
    for (t = 0; t < n; t++) {
      r = retrieve(o[t], e);
      if (r) {
        a = a.concat(r);
      }
    }
  } else {
    r = retrieve(o, e);
    if (r) {
      a = a.concat(r);
    }
  }
  return a;
}
function retrieve(o, e) {
  var t;
  var r;
  var n;
  var a;
  var l;
  if (e) {
    a = ITEM_CLASSES[e];
    n = a.retrieve(o);
  } else {
    t = 0;
    r = ITEM_CLASS_LIST.length;
    for (; t < r; t++) {
      a = ITEM_CLASS_LIST[t];
      l = a.type;
      if (typeof o == "string") {
        if (testExtensions(o, a)) {
          n = [o];
          break;
        }
      } else {
        n = a.retrieve(o);
        if (n && n.length && typeof n[0] == "string" && testExtensions(n[0], a)) {
          break;
        }
      }
      n = undef$3;
      l = undef$3;
    }
  }
  if (n) {
    return {
      type: e || l,
      items: n
    };
  }
}
function testExtensions(o, e) {
  if (o) {
    var t = _getExtension(o);
    var r = e.extensions;
    for (var n = r.length; n--;) {
      if (t === r[n]) {
        return true;
      }
    }
    return false;
  }
}
function _getExtension(o) {
  return o.split(".").pop().split(/#|\?/)[0];
}
function create() {
  return new QuickLoader();
}
function check() {
  var o = [];
  var e = [];
  for (var t in addedItems) {
    o.push(t);
    if (!loadedItems[t]) {
      e.push(addedItems[t]);
    }
  }
  console.log({
    added: o,
    notLoaded: e
  });
}
var quickLoaderExports = quickLoader$b.exports;
var MinSignal = minSignalExports;
var quickLoader$a = quickLoaderExports;
function AbstractItem$6(o, e) {
  if (o) {
    this.url = o;
    this.loadedWeight = 0;
    this.weight = 1;
    this.postPercent = 0;
    for (var t in e) {
      this[t] = e[t];
    }
    this.type ||= this.constructor.type;
    if (this.hasLoading) {
      this.loadingSignal = new MinSignal();
      this.loadingSignal.add(_onLoading, this);
      if (this.onLoading) {
        this.loadingSignal.add(this.onLoading);
      }
    }
    if (this.onPost) {
      this.onPostLoadingSignal = new MinSignal();
      this.onPostLoadingSignal.add(this._onPostLoading, this);
      this.postWeightRatio = this.postWeightRatio || 0.1;
    } else {
      this.postWeightRatio = 0;
    }
    var r = this;
    this.boundOnLoad = function () {
      r._onLoad();
    };
    this.onLoaded = new MinSignal();
    quickLoader$a.addedItems[o] = this;
    setTimeout(function () {
      if (!r.isLoaded) {
        console.warn("[QL Item Timeout]:", r.url);
        if (r.content === undefined && r.type === "buf") {
          r.content = new BufferGeometry();
        }
        r._onLoadComplete();
      }
    }, 2500);
  }
}
var AbstractItem_1 = AbstractItem$6;
var _p$8 = AbstractItem$6.prototype;
_p$8.load = load$6;
_p$8._onLoad = _onLoad$6;
_p$8._onLoading = _onLoading;
_p$8._onPostLoading = _onPostLoading;
_p$8._onLoadComplete = _onLoadComplete;
_p$8.getCombinedPercent = getCombinedPercent;
_p$8.dispatch = dispatch;
AbstractItem$6.extensions = [];
AbstractItem$6.retrieve = function () {
  return false;
};
function load$6() {
  this.isStartLoaded = true;
}
function _onLoad$6() {
  if (this.onPost) {
    this.onPost.call(this, this.content, this.onPostLoadingSignal);
  } else {
    this._onLoadComplete();
  }
}
function _onPostLoading(o) {
  this.postPercent = o;
  if (this.hasLoading) {
    this.loadingSignal.dispatch(1);
  }
  if (o === 1) {
    this._onLoadComplete();
  }
}
function _onLoadComplete() {
  this.isLoaded = true;
  this.loadedWeight = this.weight;
  quickLoader$a.loadedItems[this.url] = this;
  this.onLoaded.dispatch(this.content);
}
function getCombinedPercent(o) {
  return o * (1 - this.postWeightRatio) + this.postWeightRatio * this.postPercent;
}
function _onLoading(o) {
  this.loadedWeight = this.weight * this.getCombinedPercent(o);
}
function dispatch() {
  if (this.hasLoading) {
    this.loadingSignal.remove();
  }
  this.onLoaded.dispatch(this.content);
}
var AbstractItem$5 = AbstractItem_1;
var quickLoader$9 = quickLoaderExports;
function __generateFuncName() {
  return "_jsonp" + new Date().getTime() + ~~(Math.random() * 100000000);
}
function JSONPItem(o) {
  if (o) {
    _super$7.constructor.apply(this, arguments);
  }
}
JSONPItem.type = "jsonp";
JSONPItem.extensions = [];
quickLoader$9.register(JSONPItem);
JSONPItem.retrieve = function (o) {
  if (typeof o == "string" && o.indexOf("=") > -1) {
    return [o];
  } else {
    return false;
  }
};
var _super$7 = AbstractItem$5.prototype;
var _p$7 = JSONPItem.prototype = new AbstractItem$5();
_p$7.constructor = JSONPItem;
_p$7.load = load$5;
function load$5(o) {
  _super$7.load.apply(this, arguments);
  var e = this;
  var t = this.url.lastIndexOf("=") + 1;
  var r = this.url.substr(0, t);
  var n = this.url.substr(t);
  if (n.length === 0) {
    n = __generateFuncName();
    this.jsonpCallback = o;
  } else {
    this.jsonpCallback = this.jsonpCallback || window[n];
  }
  window[n] = function (l) {
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
    e.content = l;
    e._onLoad();
  };
  var a = document.createElement("script");
  a.type = "text/javascript";
  a.src = r + n;
  document.getElementsByTagName("head")[0].appendChild(a);
}
var AbstractItem$4 = AbstractItem_1;
var quickLoader$8 = quickLoaderExports;
var undef$2;
var IS_SUPPORT_XML_HTTP_REQUEST = !!window.XMLHttpRequest;
function XHRItem$2(o) {
  if (o) {
    _super$6.constructor.apply(this, arguments);
    this.responseType = this.responseType || "";
    this.method = this.method || "GET";
  }
}
var XHRItem_1 = XHRItem$2;
XHRItem$2.type = "xhr";
XHRItem$2.extensions = [];
quickLoader$8.register(XHRItem$2);
XHRItem$2.retrieve = function () {
  return false;
};
var _super$6 = AbstractItem$4.prototype;
var _p$6 = XHRItem$2.prototype = new AbstractItem$4();
_p$6.constructor = XHRItem$2;
_p$6.load = load$4;
_p$6._onXmlHttpChange = _onXmlHttpChange;
_p$6._onXmlHttpProgress = _onXmlHttpProgress;
_p$6._onLoad = _onLoad$5;
function load$4() {
  _super$6.load.apply(this, arguments);
  var o = this;
  var e;
  if (IS_SUPPORT_XML_HTTP_REQUEST) {
    e = this.xmlhttp = new XMLHttpRequest();
  } else {
    e = this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (this.hasLoading) {
    e.onprogress = function (t) {
      o._onXmlHttpProgress(t);
    };
  }
  e.onreadystatechange = function () {
    o._onXmlHttpChange();
  };
  e.onerror = function () {
    console.warn("[XHR onerror]:", o.url);
    o.content = new ArrayBuffer(0);
    o._onLoad(o.xmlhttp);
  };
  e.open(this.method, this.url, true);
  this.xmlhttp.responseType = this.responseType;
  if (IS_SUPPORT_XML_HTTP_REQUEST) {
    e.send(null);
  } else {
    e.send();
  }
}
function _onXmlHttpProgress(o) {
  this.loadingSignal.dispatch(o.loaded / o.total);
}
function _onXmlHttpChange() {
  if (this.xmlhttp.readyState === 4) {
    if (this.xmlhttp.status === 200 || this.xmlhttp.status === 304 || this.xmlhttp.status === 0) {
      this._onLoad(this.xmlhttp);
    } else {
      console.warn("[XHR non-200]:", this.xmlhttp.status, this.url);
      this.content = new ArrayBuffer(0);
      this._onLoad(this.xmlhttp);
    }
  }
}
function _onLoad$5() {
  this.content ||= this.xmlhttp.response;
  this.xmlhttp = undef$2;
  _super$6._onLoad.call(this);
}
var XHRItem$1 = XHRItem_1;
var quickLoader$7 = quickLoaderExports;
function TextItem$1(o, e) {
  if (o) {
    e.responseType = "text";
    _super$5.constructor.apply(this, arguments);
  }
}
var TextItem_1 = TextItem$1;
TextItem$1.type = "text";
TextItem$1.extensions = ["html", "txt", "svg"];
quickLoader$7.register(TextItem$1);
TextItem$1.retrieve = function () {
  return false;
};
var _super$5 = XHRItem$1.prototype;
var _p$5 = TextItem$1.prototype = new XHRItem$1();
_p$5.constructor = TextItem$1;
_p$5._onLoad = _onLoad$4;
function _onLoad$4() {
  this.content ||= this.xmlhttp.responseText;
  _super$5._onLoad.apply(this, arguments);
}
var TextItem = TextItem_1;
var quickLoader$6 = quickLoaderExports;
function JSONItem(o) {
  if (o) {
    _super$4.constructor.apply(this, arguments);
  }
}
JSONItem.type = "json";
JSONItem.extensions = ["json"];
quickLoader$6.register(JSONItem);
JSONItem.retrieve = function () {
  return false;
};
var _super$4 = TextItem.prototype;
var _p$4 = JSONItem.prototype = new TextItem();
_p$4.constructor = JSONItem;
_p$4._onLoad = _onLoad$3;
function _onLoad$3() {
  this.content ||= window.JSON && window.JSON.parse ? JSON.parse(this.xmlhttp.responseText.toString()) : eval(this.xmlhttp.responseText.toString());
  _super$4._onLoad.call(this);
}
var AbstractItem$3 = AbstractItem_1;
var quickLoader$5 = quickLoaderExports;
var undef$1;
function AudioItem$1(o, e) {
  if (o) {
    this.loadThrough = !e || e.loadThrough === undef$1 ? true : e.loadThrough;
    _super$3.constructor.apply(this, arguments);
    try {
      this.content = this.content || new Audio();
    } catch {
      this.content = this.content || document.createElement("audio");
    }
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
AudioItem$1.type = "audio";
AudioItem$1.extensions = ["mp3", "ogg"];
quickLoader$5.register(AudioItem$1);
AudioItem$1.retrieve = function (o) {
  return false;
};
var _super$3 = AbstractItem$3.prototype;
var _p$3 = AudioItem$1.prototype = new AbstractItem$3();
_p$3.constructor = AudioItem$1;
_p$3.load = load$3;
_p$3._onLoad = _onLoad$2;
function load$3() {
  _super$3.load.apply(this, arguments);
  var o = this;
  var e = o.content;
  e.src = this.url;
  if (this.loadThrough) {
    e.addEventListener("canplaythrough", this.boundOnLoad, false);
  } else {
    e.addEventListener("canplay", this.boundOnLoad, false);
  }
  e.load();
}
function _onLoad$2() {
  this.content.removeEventListener("canplaythrough", this.boundOnLoad, false);
  this.content.removeEventListener("canplay", this.boundOnLoad, false);
  if (!this.isLoaded) {
    _super$3._onLoad.call(this);
  }
}
var AbstractItem$2 = AbstractItem_1;
var quickLoader$4 = quickLoaderExports;
var undef;
function VideoItem(o, e) {
  if (o) {
    this.loadThrough = !e || e.loadThrough === undef ? true : e.loadThrough;
    _super$2.constructor.apply(this, arguments);
    try {
      this.content = this.content || new Video();
    } catch {
      this.content = this.content || document.createElement("video");
    }
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
VideoItem.type = "video";
VideoItem.extensions = ["mp4", "webm", "ogv"];
quickLoader$4.register(VideoItem);
VideoItem.retrieve = function (o) {
  return false;
};
var _super$2 = AbstractItem$2.prototype;
var _p$2 = VideoItem.prototype = new AbstractItem$2();
_p$2.constructor = VideoItem;
_p$2.load = load$2;
_p$2._onLoad = _onLoad$1;
function load$2() {
  _super$2.load.apply(this, arguments);
  var o = this.content;
  o.preload = "auto";
  o.src = this.url;
  if (this.loadThrough) {
    o.addEventListener("canplaythrough", this.boundOnLoad, false);
  } else {
    o.addEventListener("canplay", this.boundOnLoad, false);
  }
  o.load();
}
function _onLoad$1() {
  this.content.removeEventListener("canplaythrough", this.boundOnLoad);
  this.content.removeEventListener("canplay", this.boundOnLoad);
  if (!this.isLoaded) {
    _super$2._onLoad.call(this);
  }
}
var AbstractItem$1 = AbstractItem_1;
var quickLoader$3 = quickLoaderExports;
function AnyItem$3(o, e) {
  if (o) {
    _super$1.constructor.call(this, o, e);
    if (!this.loadFunc && console) {
      console[console.error || console.log]("require loadFunc in the config object.");
    }
  }
}
AnyItem$3.type = "any";
AnyItem$3.extensions = [];
quickLoader$3.register(AnyItem$3);
AnyItem$3.retrieve = function () {
  return false;
};
var _super$1 = AbstractItem$1.prototype;
var _p$1 = AnyItem$3.prototype = new AbstractItem$1();
_p$1.constructor = AnyItem$3;
_p$1.load = load$1;
function load$1() {
  var o = this;
  this.loadFunc(this.url, function (e) {
    o.content = e;
    _super$1._onLoad.call(o);
  }, this.loadingSignal);
}
function computedStyle$2(o, e, t, r) {
  t = window.getComputedStyle;
  r = t ? t(o) : o.currentStyle;
  if (r) {
    return r[e.replace(/-(\w)/gi, function (n, a) {
      return a.toUpperCase();
    })];
  }
}
var computedStyle_commonjs = computedStyle$2;
var AbstractItem = AbstractItem_1;
var computedStyle$1 = computedStyle_commonjs;
var quickLoader$2 = quickLoaderExports;
function ImageItem$1(o, e) {
  if (o) {
    _super.constructor.apply(this, arguments);
    this.content = this.content || new Image();
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
var _super = AbstractItem.prototype;
var _p = ImageItem$1.prototype = new AbstractItem();
_p.constructor = ImageItem$1;
_p.load = load;
_p._onLoad = _onLoad;
ImageItem$1.retrieve = function (o) {
  if (o.nodeType && o.style) {
    var e = [];
    if (o.nodeName.toLowerCase() === "img" && o.src.indexOf(";") < 0) {
      e.push(o.src);
    }
    computedStyle$1(o, "background-image").replace(/s?url\(\s*?['"]?([^;]*?)['"]?\s*?\)/g, function (r, n) {
      e.push(n);
    });
    for (var t = e.length; t--;) {
      if (!_isNotData(e[t])) {
        e.splice(t, 1);
      }
    }
    if (e.length) {
      return e;
    } else {
      return false;
    }
  } else if (typeof o == "string") {
    return [o];
  } else {
    return false;
  }
};
ImageItem$1.type = "image";
ImageItem$1.extensions = ["jpg", "gif", "png"];
quickLoader$2.register(ImageItem$1);
function load() {
  _super.load.apply(this, arguments);
  var o = this.content;
  o.onload = this.boundOnLoad;
  o.onerror = this.boundOnLoad;
  o.src = this.url;
}
function _onLoad() {
  delete this.content.onload;
  this.width = this.content.width;
  this.height = this.content.height;
  _super._onLoad.call(this);
}
function _isNotData(o) {
  return o.indexOf("data:") !== 0;
}
var quickLoader = quickLoaderExports;
const quickLoader$1 = getDefaultExportFromCjs(quickLoader);
let computedStyle = getComputedStyle(document.documentElement);
class Properties {
  win = window;
  isSecureConnection = window.location.protocol === "https:";
  loader = quickLoader$1.create();
  percent = 0;
  easedPercent = 0;
  domRoot = document.querySelector(":root");
  _isSupportedDevice = false;
  _isSupportedBrowser = false;
  _isSupportedWebGL = false;
  _isSupportedMobileOrientation = false;
  _isSupported = false;
  time = 0;
  deltaTime = 0;
  hasInitialized = false;
  hasStarted = false;
  startTime = 0;
  viewportWidth = 0;
  viewportHeight = 0;
  width = 0;
  height = 0;
  useMobileLayout = false;
  renderer = null;
  scene = null;
  camera = null;
  cameraDirection = new Vector3(0, 0, 1);
  postprocessing = null;
  resolution = new Vector2();
  viewportResolution = new Vector2();
  bgColor = new Color();
  canvas = null;
  gl = null;
  webglDPR = 1;
  webglOpts = {
    antialias: false,
    alpha: false,
    xrCompatible: false,
    powerPreference: "high-performance"
  };
  sharedUniforms = {
    u_aspect: {
      value: 1
    },
    u_cameraDirection: {
      value: this.cameraDirection
    },
    u_dpr: {
      value: 1
    },
    u_time: {
      value: 0
    },
    u_deltaTime: {
      value: 1
    },
    u_resolution: {
      value: this.resolution
    },
    u_viewportResolution: {
      value: this.viewportResolution
    },
    u_bgColor: {
      value: this.bgColor
    },
    u_globalRadius: {
      value: 0
    }
  };
  initTaskList = [];
  changeCamera = new MinSignal$2();
  smaa = null;
  fxaa = null;
  aboutPageHeroEfxPrepass = null;
  cameraMotionBlur = null;
  aboutPageHeroEfx = null;
  gtao = null;
  bloom = null;
  screenPaintDistortion = null;
  final = null;
  offWhiteColorHex = computedStyle.getPropertyValue("--color-off-white").trim();
  blackColorHex = computedStyle.getPropertyValue("--color-black").trim();
  blueColorHex = computedStyle.getPropertyValue("--color-blue").trim();
  bgColorHex = computedStyle.getPropertyValue("--color-off-white").trim();
  opacity = 1;
  cameraLookX = 0;
  cameraLookY = 0;
  defaults = {
    defaultCameraPosition: new Vector3(0, 0, 5),
    defaultLookAtPosition: new Vector3(0, 0, 0),
    autoScrollSpeed: 0,
    cameraNear: 0.1,
    cameraFar: 200,
    clearAlpha: 1,
    cameraFov: 45,
    cameraUsePhysical: false,
    cameraFilmGauge: 35,
    cameraFocalLength: 35,
    cameraDollyZoomFovOffset: 0,
    screenPaintOffsetRatio: 1,
    cameraViewportOffsetX: 0,
    cameraViewportOffsetY: 0,
    cameraDistance: 5,
    cameraLookStrength: 0,
    cameraLookEaseDamp: 0.1,
    cameraShakePositionStrength: 0,
    cameraShakePositionSpeed: 0.15,
    cameraShakeRotationStrength: 0,
    cameraShakeRotationSpeed: 0.3,
    cameraDollyZoomFovOffset: 0,
    bloomAmount: 0,
    bloomRadius: 0,
    bloomThreshold: 0,
    bloomSmoothWidth: 0,
    bloomSaturation: 1,
    bloomHighPassMultiplier: 1,
    haloWidth: 0.6,
    haloRGBShift: 0.02,
    haloStrength: 0,
    haloMaskInner: 0.3,
    haloMaskOuter: 0.5,
    useFinal: false,
    vignetteFrom: 2,
    vignetteTo: 5,
    vignetteColorHex: "#000000",
    saturation: 1,
    contrast: 0,
    brightness: 1,
    tintColorHex: "#000000",
    tintOpacity: 0,
    screenPaintNeedsMouseDown: false,
    screenPaintMinRadius: 0,
    screenPaintMaxRadius: 100,
    screenPaintRadiusDistanceRange: 100,
    screenPaintPushStrength: 25,
    screenPaintVelocityDissipation: 0.975,
    screenPaintWeight1Dissipation: 0.95,
    screenPaintWeight2Dissipation: 0.8,
    screenPaintUseNoise: true,
    screenPaintCurlScale: 0.02,
    screenPaintCurlStrength: 3,
    screenPaintDistortionAmount: 3,
    screenPaintDistortionRGBShift: 0.5,
    screenPaintDistortionColorMultiplier: 10,
    screenPaintDistortionMultiplier: 5,
    upscalerAmount: 1,
    upscalerSharpness: 1,
    isSmaaEnabled: !settings.USE_HD
  };
  onFirstClicked = new MinSignal$2();
  isPreloaderFinished = false;
  balloonsColorIndex = 0;
  globalRadius = 0;
  isContactFromProjectPage = false;
  constructor() {}
  reset() {
    for (let e in this.defaults) {
      this[e] = this.defaults[e];
    }
    if (this.smaa) {
      this.smaa.enabled = true;
    }
  }
}
const properties = new Properties();
window.__properties = properties;
var _populated = false;
var _ie;
var _firefox;
var _opera;
var _webkit;
var _chrome;
var _ie_real_version;
var _osx;
var _windows;
var _linux;
var _android;
var _win64;
var _iphone;
var _ipad;
var _native;
var _mobile;
function _populate() {
  if (!_populated) {
    _populated = true;
    var o = navigator.userAgent;
    var e = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(o);
    var t = /(Mac OS X)|(Windows)|(Linux)/.exec(o);
    _iphone = /\b(iPhone|iP[ao]d)/.exec(o);
    _ipad = /\b(iP[ao]d)/.exec(o);
    _android = /Android/i.exec(o);
    _native = /FBAN\/\w+;/i.exec(o);
    _mobile = /Mobile/i.exec(o);
    _win64 = !!/Win64/.exec(o);
    if (e) {
      _ie = e[1] ? parseFloat(e[1]) : e[5] ? parseFloat(e[5]) : NaN;
      if (_ie && document && document.documentMode) {
        _ie = document.documentMode;
      }
      var r = /(?:Trident\/(\d+.\d+))/.exec(o);
      _ie_real_version = r ? parseFloat(r[1]) + 4 : _ie;
      _firefox = e[2] ? parseFloat(e[2]) : NaN;
      _opera = e[3] ? parseFloat(e[3]) : NaN;
      _webkit = e[4] ? parseFloat(e[4]) : NaN;
      if (_webkit) {
        e = /(?:Chrome\/(\d+\.\d+))/.exec(o);
        _chrome = e && e[1] ? parseFloat(e[1]) : NaN;
      } else {
        _chrome = NaN;
      }
    } else {
      _ie = _firefox = _opera = _chrome = _webkit = NaN;
    }
    if (t) {
      if (t[1]) {
        var n = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(o);
        _osx = n ? parseFloat(n[1].replace("_", ".")) : true;
      } else {
        _osx = false;
      }
      _windows = !!t[2];
      _linux = !!t[3];
    } else {
      _osx = _windows = _linux = false;
    }
  }
}
var UserAgent_DEPRECATED$1 = {
  ie: function () {
    return _populate() || _ie;
  },
  ieCompatibilityMode: function () {
    return _populate() || _ie_real_version > _ie;
  },
  ie64: function () {
    return UserAgent_DEPRECATED$1.ie() && _win64;
  },
  firefox: function () {
    return _populate() || _firefox;
  },
  opera: function () {
    return _populate() || _opera;
  },
  webkit: function () {
    return _populate() || _webkit;
  },
  safari: function () {
    return UserAgent_DEPRECATED$1.webkit();
  },
  chrome: function () {
    return _populate() || _chrome;
  },
  windows: function () {
    return _populate() || _windows;
  },
  osx: function () {
    return _populate() || _osx;
  },
  linux: function () {
    return _populate() || _linux;
  },
  iphone: function () {
    return _populate() || _iphone;
  },
  mobile: function () {
    return _populate() || _iphone || _ipad || _android || _mobile;
  },
  nativeApp: function () {
    return _populate() || _native;
  },
  android: function () {
    return _populate() || _android;
  },
  ipad: function () {
    return _populate() || _ipad;
  }
};
var UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED$1;
var canUseDOM = typeof window !== "undefined" && !!window.document && !!window.document.createElement;
var ExecutionEnvironment$1 = {
  canUseDOM
};
var ExecutionEnvironment_1 = ExecutionEnvironment$1;
var ExecutionEnvironment = ExecutionEnvironment_1;
var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== true;
}
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported$1(o, e) {
  if (!ExecutionEnvironment.canUseDOM || e && !("addEventListener" in document)) {
    return false;
  }
  var t = "on" + o;
  var r = t in document;
  if (!r) {
    var n = document.createElement("div");
    n.setAttribute(t, "return;");
    r = typeof n[t] == "function";
  }
  if (!r && useHasFeature && o === "wheel") {
    r = document.implementation.hasFeature("Events.wheel", "3.0");
  }
  return r;
}
var isEventSupported_1 = isEventSupported$1;
var UserAgent_DEPRECATED = UserAgent_DEPRECATED_1;
var isEventSupported = isEventSupported_1;
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function normalizeWheel$2(o) {
  var e = 0;
  var t = 0;
  var r = 0;
  var n = 0;
  if ("detail" in o) {
    t = o.detail;
  }
  if ("wheelDelta" in o) {
    t = -o.wheelDelta / 120;
  }
  if ("wheelDeltaY" in o) {
    t = -o.wheelDeltaY / 120;
  }
  if ("wheelDeltaX" in o) {
    e = -o.wheelDeltaX / 120;
  }
  if ("axis" in o && o.axis === o.HORIZONTAL_AXIS) {
    e = t;
    t = 0;
  }
  r = e * PIXEL_STEP;
  n = t * PIXEL_STEP;
  if ("deltaY" in o) {
    n = o.deltaY;
  }
  if ("deltaX" in o) {
    r = o.deltaX;
  }
  if ((r || n) && o.deltaMode) {
    if (o.deltaMode == 1) {
      r *= LINE_HEIGHT;
      n *= LINE_HEIGHT;
    } else {
      r *= PAGE_HEIGHT;
      n *= PAGE_HEIGHT;
    }
  }
  if (r && !e) {
    e = r < 1 ? -1 : 1;
  }
  if (n && !t) {
    t = n < 1 ? -1 : 1;
  }
  return {
    spinX: e,
    spinY: t,
    pixelX: r,
    pixelY: n
  };
}
normalizeWheel$2.getEventType = function () {
  if (UserAgent_DEPRECATED.firefox()) {
    return "DOMMouseScroll";
  } else if (isEventSupported("wheel")) {
    return "wheel";
  } else {
    return "mousewheel";
  }
};
var normalizeWheel_1 = normalizeWheel$2;
var normalizeWheel = normalizeWheel_1;
const normalizeWheel$1 = getDefaultExportFromCjs(normalizeWheel);
class SecondOrderDynamics {
  target0 = null;
  target = null;
  prevTarget = null;
  value = null;
  valueVel = null;
  k1;
  k2;
  k3;
  _f;
  _z;
  _r;
  _w;
  _z;
  _d;
  _targetVelCache;
  _cache1;
  _cache2;
  _k1Stable;
  _k2Stable;
  isVector = null;
  isRobust = null;
  constructor(e, t = 1.5, r = 0.8, n = 2, a = true) {
    this.isRobust = a;
    this.isVector = typeof e == "object";
    this.setFZR(t, r, n);
    if (this.isVector) {
      this.target = e;
      this.target0 = e.clone();
      this.prevTarget = e.clone();
      this.value = e.clone();
      this.valueVel = e.clone().setScalar(0);
      this._targetVelCache = this.valueVel.clone();
      this._cache1 = this.valueVel.clone();
      this._cache2 = this.valueVel.clone();
      this.update = this._updateVector;
      this.reset = this._resetVector;
    } else {
      this.target0 = e;
      this.prevTarget = e;
      this.value = e;
      this.valueVel = 0;
      this.update = this._updateNumber;
      this.reset = this._resetNumber;
    }
    this.computeStableCoefficients = a ? this._computeRobustStableCoefficients : this._computeStableCoefficients;
  }
  update(e, t = 0) {}
  reset(e = null) {}
  _resetVector(e = this.target0) {
    this.valueVel.setScalar(0);
    this.prevTarget.copy(e);
    this.target.copy(e);
    this.value.copy(e);
  }
  _resetNumber(e = this.target0) {
    this.valueVel = 0;
    this.prevTarget = e;
    this.target = e;
    this.value = e;
  }
  setFZR(e = this._f, t = this._z, r = this._r) {
    let n = Math.PI * 2 * e;
    if (this.isRobust) {
      this._w = n;
      this._z = t;
      this._d = this._w * Math.sqrt(Math.abs(this._z * this._z - 1));
    }
    this.k1 = t / (Math.PI * e);
    this.k2 = 1 / (n * n);
    this.k3 = r * t / n;
  }
  _computeStableCoefficients(e) {
    this._k1Stable = this.k1;
    this._k2Stable = Math.max(this.k2, e * 1.1 * e / 4 + e * this.k1 / 2);
  }
  _computeRobustStableCoefficients(e) {
    if (this._w * e < this._z) {
      this._k1Stable = this.k1;
      this._k2Stable = Math.max(this.k2, e * e / 2 + e * this.k1 / 2, e * this.k1);
    } else {
      let t = Math.exp(-this._z * this._w * e);
      let r = t * 2 * (this._z <= 1 ? Math.cos(e * this._d) : Math.cosh(e * this._d));
      let n = t * t;
      let a = e / (1 + n - r);
      this._k1Stable = (1 - n) * a;
      this._k2Stable = e * a;
    }
  }
  _updateVector(e, t = this.target) {
    if (e > 0) {
      this._targetVelCache.copy(t).sub(this.prevTarget).divideScalar(e);
      this.prevTarget.copy(t);
      this.computeStableCoefficients(e);
      this.value.add(this._cache1.copy(this.valueVel).multiplyScalar(e));
      this._cache1.copy(t).add(this._targetVelCache.multiplyScalar(this.k3)).sub(this.value).sub(this._cache2.copy(this.valueVel).multiplyScalar(this._k1Stable)).multiplyScalar(e / this._k2Stable);
      this.valueVel.add(this._cache1);
    }
  }
  _updateNumber(e, t = this.target) {
    if (e > 0) {
      let r = (t - this.prevTarget) / e;
      this.prevTarget = t;
      this.computeStableCoefficients(e);
      this.valueVel += (t + this.k3 * r - this.value - this._k1Stable * this.valueVel) * (e / this._k2Stable);
      this.value += this.valueVel * e;
    }
  }
}
class Input {
  onDowned = new MinSignal$2();
  onMoved = new MinSignal$2();
  onUped = new MinSignal$2();
  onClicked = new MinSignal$2();
  onWheeled = new MinSignal$2();
  onXScrolled = new MinSignal$2();
  onYScrolled = new MinSignal$2();
  wasDown = false;
  isDown = false;
  downTime = 0;
  hasClicked = false;
  hasMoved = false;
  hadMoved = false;
  justClicked = false;
  mouseXY = new Vector2();
  _prevMouseXY = new Vector2();
  prevMouseXY = new Vector2();
  mousePixelXY = new Vector2();
  _prevMousePixelXY = new Vector2();
  prevMousePixelXY = new Vector2();
  downXY = new Vector2();
  downPixelXY = new Vector2();
  deltaXY = new Vector2();
  deltaPixelXY = new Vector2();
  deltaDownXY = new Vector2();
  deltaDownPixelXY = new Vector2();
  deltaDownPixelDistance = 0;
  deltaWheel = 0;
  deltaDragScrollX = 0;
  deltaScrollX = 0;
  deltaDragScrollY = 0;
  deltaScrollY = 0;
  isDragScrollingX = false;
  isDragScrollingY = false;
  isWheelScrolling = false;
  dragScrollXMomentum = 0;
  dragScrollYMomentum = 0;
  dragScrollMomentumMultiplier = 10;
  canDesktopDragScroll = false;
  needsCheckDragScrollDirection = false;
  lastScrollXDirection = 0;
  lastScrollYDirection = 0;
  easedMouseDynamics = {};
  dragScrollDynamic;
  downThroughElems = [];
  currThroughElems = [];
  prevThroughElems = [];
  clickThroughElems = [];
  preInit() {
    const e = document;
    e.addEventListener("mousedown", this._onDown.bind(this));
    e.addEventListener("touchstart", this._getTouchBound(this, this._onDown));
    e.addEventListener("mousemove", this._onMove.bind(this));
    e.addEventListener("touchmove", this._getTouchBound(this, this._onMove));
    e.addEventListener("mouseup", this._onUp.bind(this));
    e.addEventListener("touchend", this._getTouchBound(this, this._onUp));
    e.addEventListener("wheel", this._onWheel.bind(this));
    e.addEventListener("mousewheel", this._onWheel.bind(this));
    this.addEasedInput("default", 1.35, 0.5, 1.25);
    this.dragScrollDynamic = this.addEasedInput("dragScroll", 2, 1, 1);
    this.onUped.addOnce(() => {
      properties.onFirstClicked.dispatch();
    });
  }
  init() {}
  resize() {
    for (let e in this.easedMouseDynamics) {
      this.easedMouseDynamics[e].reset();
    }
  }
  update(e) {
    for (let t in this.easedMouseDynamics) {
      let r = this.easedMouseDynamics[t];
      r.target.copy(this.mouseXY);
      r.update(e);
    }
  }
  addEasedInput(e, t = 1.5, r = 0.8, n = 2) {
    return this.easedMouseDynamics[e] = new SecondOrderDynamics(new Vector2(), t, r, n);
  }
  postUpdate(e) {
    this.prevThroughElems.length = 0;
    this.prevThroughElems.concat(this.currThroughElems);
    this.deltaWheel = 0;
    this.deltaDragScrollX = 0;
    this.deltaDragScrollY = 0;
    this.deltaScrollX = 0;
    this.deltaScrollY = 0;
    this.dragScrollXMomentum = 0;
    this.dragScrollYMomentum = 0;
    this.deltaXY.set(0, 0);
    this.deltaPixelXY.set(0, 0);
    this.prevMouseXY.copy(this.mouseXY);
    this.prevMousePixelXY.copy(this.mousePixelXY);
    this.hadMoved = this.hasMoved;
    this.wasDown = this.isDown;
    this.justClicked = false;
    this.isWheelScrolling = false;
  }
  _onWheel(e) {
    let t = normalizeWheel$1(e).pixelY;
    t = math.clamp(t, -200, 200);
    this.deltaWheel += t;
    this.deltaScrollX = this.deltaDragScrollX + this.deltaWheel;
    this.deltaScrollY = this.deltaDragScrollY + this.deltaWheel;
    this.lastScrollXDirection = this.deltaWheel > 0 ? 1 : -1;
    this.lastScrollYDirection = this.deltaWheel > 0 ? 1 : -1;
    this.isWheelScrolling = true;
    this.onWheeled.dispatch(e.target);
    this.onXScrolled.dispatch(e.target);
    this.onYScrolled.dispatch(e.target);
  }
  _onDown(e) {
    if (e.button !== 2 && e.button !== 1) {
      this.isDown = true;
      this.downTime = +new Date();
      this.prevThroughElems.length = 0;
      this._setThroughElementsByEvent(e, this.downThroughElems);
      this._getInputXY(e, this.downXY);
      this._getInputPixelXY(e, this.downPixelXY);
      this._prevMouseXY.copy(this.downXY);
      this._prevMousePixelXY.copy(this.downPixelXY);
      this.deltaXY.set(0, 0);
      this.deltaPixelXY.set(0, 0);
      this._getInputXY(e, this.mouseXY);
      this.dragScrollDynamic.reset(this.mouseXY);
      this.isDragScrollingX = false;
      this.isDragScrollingY = false;
      this.needsCheckDragScrollDirection = false;
      this._onMove(e);
      this.onDowned.dispatch(e);
      this.needsCheckDragScrollDirection = true;
    }
  }
  _onMove(e) {
    if (e.button !== 2 && e.button !== 1) {
      this._getInputXY(e, this.mouseXY);
      this._getInputPixelXY(e, this.mousePixelXY);
      this.deltaXY.copy(this.mouseXY).sub(this._prevMouseXY);
      this.deltaPixelXY.copy(this.mousePixelXY).sub(this._prevMousePixelXY);
      this._prevMouseXY.copy(this.mouseXY);
      this._prevMousePixelXY.copy(this.mousePixelXY);
      this.hasMoved = this.deltaXY.length() > 0;
      if (this.isDown) {
        this.deltaDownXY.copy(this.mouseXY).sub(this.downXY);
        this.deltaDownPixelXY.copy(this.mousePixelXY).sub(this.downPixelXY);
        this.deltaDownPixelDistance = this.deltaDownPixelXY.length();
        if (browser$1.isMobile || this.canDesktopDragScroll) {
          if (this.needsCheckDragScrollDirection) {
            this.isDragScrollingX = Math.abs(this.deltaPixelXY.x) > Math.abs(this.deltaPixelXY.y);
            this.isDragScrollingY = !this.isDragScrollingX;
            this.needsCheckDragScrollDirection = false;
          }
          if (this.isDragScrollingX) {
            this.deltaDragScrollX += -this.deltaPixelXY.x;
            this.deltaScrollX += -this.deltaPixelXY.x + this.deltaWheel;
            this.lastScrollXDirection = this.deltaDragScrollX > 0 ? 1 : -1;
            this.onXScrolled.dispatch(e.target);
          }
          if (this.isDragScrollingY) {
            this.deltaDragScrollY += -this.deltaPixelXY.y;
            this.deltaScrollY += -this.deltaPixelXY.y + this.deltaWheel;
            this.lastScrollYDirection = this.deltaDragScrollY > 0 ? 1 : -1;
            this.onYScrolled.dispatch(e.target);
          }
        }
      }
      this._setThroughElementsByEvent(e, this.currThroughElems);
      this.onMoved.dispatch(e);
    }
  }
  _onUp(e) {
    if (e.button === 2 || e.button === 1) {
      return;
    }
    const t = e.clientX - this.downPixelXY.x;
    const r = e.clientY - this.downPixelXY.y;
    if (Math.sqrt(t * t + r * r) < 40 && +new Date() - this.downTime < 300) {
      this._setThroughElementsByEvent(e, this.clickThroughElems);
      this._getInputXY(e, this.mouseXY);
      this.hasClicked = true;
      this.justClicked = true;
      this.onClicked.dispatch(e);
    }
    this.deltaDownXY.set(0, 0);
    this.deltaDownPixelXY.set(0, 0);
    this.deltaDownPixelDistance = 0;
    this.dragScrollXMomentum = this.dragScrollDynamic.valueVel.y * properties.viewportWidth * this.dragScrollMomentumMultiplier * properties.deltaTime;
    this.dragScrollYMomentum = this.dragScrollDynamic.valueVel.y * properties.viewportHeight * this.dragScrollMomentumMultiplier * properties.deltaTime;
    this.isDown = false;
    this.needsCheckDragScrollDirection = false;
    this.onUped.dispatch(e);
  }
  _getTouchBound(e, t, r) {
    return function (n) {
      if (r && n.preventDefault) {
        n.preventDefault();
      }
      t.call(e, n.changedTouches[0] || n.touches[0]);
    };
  }
  _getInputXY(e, t) {
    t.set(e.clientX / properties.viewportWidth * 2 - 1, 1 - e.clientY / properties.viewportHeight * 2);
    return t;
  }
  _getInputPixelXY(e, t) {
    t.set(e.clientX, e.clientY);
  }
  _setThroughElementsByEvent(e, t) {
    let r = e.target;
    for (t.length = 0; r.parentNode;) {
      t.push(r);
      r = r.parentNode;
    }
  }
  hasThroughElem(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems;
    let n = r.length;
    while (n--) {
      if (r[n] === e) {
        return true;
      }
    }
    return false;
  }
  hasThroughElemWithClass(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems;
    let n = r.length;
    while (n--) {
      if (r[n].classList.contains(e)) {
        return r[n];
      }
    }
    return null;
  }
}
const input = new Input();
class ScrollDomRange {
  constructor(e, t) {
    this.dom = e;
    this.isVertical = t;
    this.needsUpdate = true;
    this.forcedUpdate = true;
    this.screenX = 0;
    this.screenY = 0;
    this.ratio = 0;
    this.screenRatio = 0;
    this.isActive = false;
    this._left = 0;
    this._right = 0;
    this._top = 0;
    this._bottom = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.bottom = 0;
    this.width = 0;
    this.height = 0;
    this.showScreenOffset = 0;
    this.hideScreenOffset = 0;
  }
  update(e, t, r, n) {
    n = n || this.needsUpdate;
    if (n) {
      let c = this.dom.getBoundingClientRect();
      this.needsUpdate = false;
      this._left = c.left;
      this._right = c.right;
      this._top = c.top;
      this._bottom = c.bottom;
      this.width = c.width;
      this.height = c.height;
      this.forcedUpdate = false;
      if (this.isVertical) {
        this._top += e;
        this._bottom += e;
      } else {
        this._left += e;
        this._right += e;
      }
    }
    this.left = this._left;
    this.right = this._right;
    this.top = this._top;
    this.bottom = this._bottom;
    if (this.isVertical) {
      this.top += r;
      this.bottom += r;
    } else {
      this.left += r;
      this.right += r;
    }
    this.screenX = this.left;
    this.screenY = this.top;
    let a;
    if (this.isVertical) {
      a = this.screenY -= e;
    } else {
      a = this.screenX -= e;
    }
    let l = this.isVertical ? this.height : this.width;
    this.ratio = Math.min(0, math.unClampedFit(a, t, t - l, -1, 0));
    this.ratio += Math.max(0, math.unClampedFit(a, 0, -l, 0, 1));
    this.screenRatio = math.fit(a, t, -l, -1, 1);
    this.showScreenOffset = -(a - t) / t;
    this.hideScreenOffset = -(a + l) / t;
    this.isActive = this.ratio >= -1 && this.ratio <= 1;
  }
}
let instances = [];
class Tween {
  constructor(e, t) {
    this.target = e;
    this.fromProperties = {};
    this.toProperties = {};
    this.onComplete = t;
    this.t = 0;
    this.duration = 0;
    this.autoUpdate = true;
    instances.push(this);
  }
  static autoUpdate(e) {
    for (let t = 0; t < instances.length; t++) {
      let r = instances[t];
      if (r.autoUpdate) {
        r.update(e);
      }
    }
  }
  restart() {
    this.isActive = true;
    this.t = 0;
  }
  kill() {
    this.t = this.duration;
  }
  to(e, t, r = null) {
    let n = {};
    for (let a in t) {
      n[a] = this.target[a];
    }
    this.fromTo(e, n, t, r);
  }
  fromTo(e, t, r, n) {
    this.duration = e;
    this.ease = n;
    this.fromProperties = t;
    this.toProperties = r;
    this.restart();
    this.update(0, this.duration == 0);
  }
  update(e = 0, t = false) {
    if (this.t < this.duration || t) {
      this.t = Math.min(this.duration, this.t + e);
      let r = this.t / this.duration;
      if (this.ease) {
        r = this.ease(r);
      }
      for (let n in this.toProperties) {
        this.target[n] = math.mix(this.fromProperties[n], this.toProperties[n], r);
      }
      if (this.t == this.duration && this.onComplete) {
        this.onComplete();
      }
    }
  }
}
const blitVert = `#define GLSLIFY 1
attribute vec2 position;varying vec2 v_uv;void main(){v_uv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
const blitFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv);}`;
const uvBlitVert = `#define GLSLIFY 1
attribute vec2 position;attribute vec2 uv;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position,0.0,1.0);}`;
const clearFrag = `#define GLSLIFY 1
uniform vec4 u_color;varying vec2 v_uv;void main(){gl_FragColor=u_color;}`;
const debugVert = `#define GLSLIFY 1
attribute vec3 position;attribute vec2 uv;uniform vec4 u_transform;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position.xy*u_transform.zw+u_transform.xy,0.0,1.0);}`;
class FboHelper {
  isWebGL2;
  renderer;
  quadGeom;
  triGeom;
  floatType;
  precisionPrefix;
  precisionPrefix2;
  vertexShader;
  _scene;
  _camera;
  _tri;
  copyMaterial;
  uvCopyMaterial;
  clearMaterial;
  _debugScene;
  _debugMesh;
  _debugMaterial;
  init(e, t) {
    this.renderer = e;
    this.floatType = t;
    this.isWebGL2 = this.renderer.capabilities.isWebGL2;
    this._scene = new Scene();
    this._camera = new Camera();
    this._camera.position.z = 1;
    this.triGeom = new BufferGeometry();
    this.triGeom.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]), 3));
    this.quadGeom = new PlaneGeometry(2, 2);
    this._tri = new Mesh(this.triGeom);
    this._tri.frustumCulled = false;
    this._scene.add(this._tri);
    this.precisionPrefix = `precision ${this.renderer.capabilities.precision} float;
`;
    this.precisionPrefix2 = `precision ${this.renderer.capabilities.precision} float;
			precision ${this.renderer.capabilities.precision} int;
			#define IS_WEBGL2 true
		`;
    if (this.isWebGL2) {
      this.vertexPrefix = `${this.precisionPrefix2}
				precision mediump sampler2DArray;
				#define attribute in
				#define varying out
				#define texture2D texture
			`;
      this.fragmentPrefix = `${this.precisionPrefix2}
				#define varying in
				out highp vec4 pc_fragColor;
				#define gl_FragColor pc_fragColor
				#define gl_FragDepthEXT gl_FragDepth
				#define texture2D texture
				#define textureCube texture
				#define texture2DProj textureProj
				#define texture2DLodEXT textureLod
				#define texture2DProjLodEXT textureProjLod
				#define textureCubeLodEXT textureLod
				#define texture2DGradEXT textureGrad
				#define texture2DProjGradEXT textureProjGrad
				#define textureCubeGradEXT textureGrad
			`;
    } else {
      this.vertexPrefix = this.precisionPrefix;
      this.fragmentPrefix = this.precisionPrefix;
    }
    this.renderer.getContext().getExtension("OES_standard_derivatives");
    this.vertexShader = this.isWebGL2 ? this.precisionPrefix2 + blitVert : this.precisionPrefix + blitVert;
    this.copyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    this.uvCopyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      vertexShader: uvBlitVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this.clearMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_color: {
          value: new Vector4(1, 1, 1, 1)
        }
      },
      fragmentShader: clearFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    const r = new PlaneGeometry(1, 1);
    r.translate(0.5, -0.5, 0);
    this._debugMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_transform: {
          value: new Vector4(0, 0, 1, 1)
        }
      },
      vertexShader: debugVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this._debugMesh = new Mesh(r, this._debugMaterial);
    this._debugScene = new Scene();
    this._debugScene.frustumCulled = false;
    this._debugScene.add(this._debugMesh);
  }
  copy(e, t) {
    const r = this.copyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  uvCopy(e, t) {
    const r = this.uvCopyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  render(e, t) {
    if (this._tri && this.renderer && this._scene && this._camera) {
      this._tri.material = e;
      if (t) {
        this.renderer.setRenderTarget(t);
      }
      this.renderer.render(this._scene, this._camera);
    }
  }
  renderGeometry(e, t, r) {
    if (this._tri && this.triGeom) {
      this._tri.geometry = e;
      this.render(t, r);
      this._tri.geometry = this.triGeom;
    }
  }
  renderMesh(e, t, r = this._camera) {
    if (this._tri && this.renderer && this._scene && r) {
      this._tri.visible = false;
      this._scene.add(e);
      if (t) {
        this.renderer.setRenderTarget(t || null);
      }
      this.renderer.render(this._scene, r);
      if (t) {
        this.renderer.setRenderTarget(null);
      }
      this._scene.remove(e);
      this._tri.visible = true;
    }
  }
  debugTo(e, t, r, n, a) {
    if (!this.renderer || !this._debugMaterial || !this._debugScene || !this._camera) {
      return;
    }
    t = t || e.width || e.image.width;
    r = r || e.height || e.image.height;
    n = n || 0;
    a = a || 0;
    const l = this.renderer.getSize(new Vector2());
    n = n / l.width * 2 - 1;
    a = 1 - a / l.height * 2;
    t = t / l.width * 2;
    r = r / l.height * 2;
    this._debugMaterial.uniforms.u_texture.value = e;
    this._debugMaterial.uniforms.u_transform.value.set(n, a, t, r);
    const c = this.getColorState();
    this.renderer.autoClearColor = false;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this._debugScene, this._camera);
    this.setColorState(c);
  }
  parseDefines(e) {
    let t = "";
    for (const r in e) {
      const n = e[r];
      if (n === true) {
        t += `#define ${r}
`;
      } else {
        t += `#define ${r} ${n}
`;
      }
    }
    return t;
  }
  clearColor(e, t, r, n, a) {
    if (this.clearMaterial) {
      this.clearMaterial.uniforms.u_color.value.set(e, t, r, n);
      this.render(this.clearMaterial, a);
    }
  }
  getColorState() {
    if (!this.renderer) {
      return {
        autoClear: true,
        autoClearColor: true,
        autoClearStencil: true,
        autoClearDepth: true,
        clearColor: 0,
        clearAlpha: 1
      };
    }
    const e = new Color();
    this.renderer.getClearColor(e);
    return {
      autoClear: this.renderer.autoClear,
      autoClearColor: this.renderer.autoClearColor,
      autoClearStencil: this.renderer.autoClearStencil,
      autoClearDepth: this.renderer.autoClearDepth,
      clearColor: e.getHex(),
      clearAlpha: this.renderer.getClearAlpha()
    };
  }
  setColorState(e) {
    if (this.renderer) {
      this.renderer.setClearColor(e.clearColor, e.clearAlpha);
      this.renderer.autoClear = e.autoClear;
      this.renderer.autoClearColor = e.autoClearColor;
      this.renderer.autoClearStencil = e.autoClearStencil;
      this.renderer.autoClearDepth = e.autoClearDepth;
    }
  }
  createRawShaderMaterial(e) {
    e = Object.assign({
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      vertexShader: blitVert,
      fragmentShader: blitFrag,
      derivatives: false
    }, e);
    e.vertexShader = (e.vertexShaderPrefix ? e.vertexShaderPrefix : e.derivatives ? this.vertexPrefix : this.vertexPrefix) + e.vertexShader;
    e.fragmentShader = (e.fragmentShaderPrefix ? e.fragmentShaderPrefix : e.derivatives ? this.fragmentPrefix : this.fragmentPrefix) + e.fragmentShader;
    delete e.vertexShaderPrefix;
    delete e.fragmentShaderPrefix;
    delete e.derivatives;
    e.glslVersion = this.isWebGL2 ? GLSL3 : GLSL1;
    let t = new RawShaderMaterial(e);
    taskManager.add(t);
    return t;
  }
  createDataTexture(e, t, r, n = false, a = true) {
    let l = new DataTexture(e, t, r, RGBAFormat, n ? FloatType : UnsignedByteType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, a ? NearestFilter : LinearFilter, a ? NearestFilter : LinearFilter, 0);
    l.needsUpdate = true;
    return l;
  }
  createRenderTarget(e, t, r = false, n = false, a = 0) {
    return new WebGLRenderTarget(e, t, {
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
      magFilter: r ? NearestFilter : LinearFilter,
      minFilter: r ? NearestFilter : LinearFilter,
      type: typeof n == "boolean" ? n ? this.floatType : UnsignedByteType : n,
      anisotropy: 0,
      colorSpace: NoColorSpace,
      depthBuffer: false,
      stencilBuffer: false,
      samples: browser$1.isSupportMSAA ? a : 0
    });
  }
  createMultisampleRenderTarget(e, t, r = false, n = false, a = 8) {
    if (!this.renderer || !this.isWebGL2 || !browser$1.isSupportMSAA) {
      return this.createRenderTarget(e, t, r, n);
    } else {
      return new WebGLRenderTarget(e, t, {
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        magFilter: r ? NearestFilter : LinearFilter,
        minFilter: r ? NearestFilter : LinearFilter,
        type: n ? this.floatType : UnsignedByteType,
        anisotropy: 0,
        colorSpace: NoColorSpace,
        depthBuffer: false,
        stencilBuffer: false,
        samples: a
      });
    }
  }
  clearMultisampleRenderTargetState(e) {
    e = e || this.renderer.getRenderTarget();
    if (e && e.samples > 0) {
      const t = this.renderer.properties.get(e);
      let r = this.renderer.getContext();
      r.bindFramebuffer(r.READ_FRAMEBUFFER, t.__webglMultisampledFramebuffer);
      r.bindFramebuffer(r.DRAW_FRAMEBUFFER, t.__webglFramebuffer);
      const n = e.width;
      const a = e.height;
      let l = r.COLOR_BUFFER_BIT;
      if (e.depthBuffer) {
        l |= r.DEPTH_BUFFER_BIT;
      }
      if (e.stencilBuffer) {
        l |= r.STENCIL_BUFFER_BIT;
      }
      r.blitFramebuffer(0, 0, n, a, 0, 0, n, a, l, r.NEAREST);
      r.bindFramebuffer(r.FRAMEBUFFER, t.__webglMultisampledFramebuffer);
    }
  }
}
const fboHelper = new FboHelper();
class Task {
  _completeCount = 0;
  _completeTotal = 0;
  constructor(e) {
    if (Array.isArray(e)) {
      this.run = this.createMultiCallbackFunc(e);
    } else {
      this.run = this.createCallbackFunc(e);
    }
  }
  get isCompleted() {
    return this._completeCount >= this._completeTotal;
  }
  run() {}
  createMultiCallbackFunc(e) {
    let t = [];
    for (let r = 0; r < e.length; r++) {
      t.push(this.createCallbackFunc(e[r]));
    }
    return function () {
      for (let r = 0; r < t.length; r++) {
        t[r]();
      }
    };
  }
  _onComplete() {
    this._completeCount++;
  }
  createCallbackFunc(e) {
    let t;
    this._completeTotal++;
    if (e.isRawShaderMaterial || e.isShaderMaterial) {
      t = this.createShaderMaterialFunc(e);
    } else if (e.isObject3D) {
      t = this.createCompileSceneFunc(e);
    } else if (e.isTexture) {
      t = this.createInitTextureFunc(e);
    } else {
      t = e.bind(this, this._onComplete);
    }
    return t;
  }
  createShaderMaterialFunc(e) {
    return function () {
      let done = false;
      const finish = () => {
        if (!done) {
          done = true;
          this._onComplete();
        }
      };
      const timer = setTimeout(finish, 600);
      try {
        fboHelper._tri.material = e;
        properties.renderer.compileAsync(fboHelper._tri, properties.camera).then(() => {
          clearTimeout(timer);
          finish();
        }).catch(() => {
          clearTimeout(timer);
          finish();
        });
      } catch (err) {
        clearTimeout(timer);
        finish();
      }
    };
  }
  createCompileSceneFunc(e) {
    return function () {
      let done = false;
      let t = e.visible;
      const finish = () => {
        if (!done) {
          done = true;
          try {
            e.traverse(r => {
              r.visible = r._tmpVisible;
            });
            e.visible = t;
          } catch (err) {}
          this._onComplete();
        }
      };
      const timer = setTimeout(finish, 600);
      try {
        e.traverse(r => {
          r._tmpVisible = r.visible;
          r.visible = true;
        });
        e.visible = true;
        properties.renderer.compileAsync(e, properties.camera).then(() => {
          clearTimeout(timer);
          finish();
        }).catch(() => {
          clearTimeout(timer);
          finish();
        });
      } catch (err) {
        clearTimeout(timer);
        finish();
      }
    };
  }
  createInitTextureFunc(e) {
    return function () {
      try {
        properties.renderer.initTexture(e);
      } catch (err) {}
      this._onComplete();
    };
  }
}
class TaskManager {
  percent = 1;
  taskList = [];
  _activeTaskList = [];
  _activeTaskIndex = 0;
  _needsStart = false;
  onCompleted = new MinSignal$2();
  start() {
    this._needsStart = true;
    this.percent = 0;
    if (this._safetyTimer) {
      clearTimeout(this._safetyTimer);
    }
    this._safetyTimer = setTimeout(() => {
      if (this.percent < 1 || this._activeTaskList.length > 0 || this._needsStart) {
        this._needsStart = false;
        this._activeTaskList = [];
        this.percent = 1;
        this.onCompleted.dispatch();
      }
    }, 1000);
  }
  _start() {
    this._needsStart = false;
    this._activeTaskList = this.taskList.splice(0, this.taskList.length);
    this._activeTaskIndex = 0;
  }
  add(e) {
    if (!settings.SKIP_ANIMATION) {
      this.taskList.push(new Task(e));
    }
  }
  update() {
    if (this._needsStart) {
      this._start();
    }
    if (this._activeTaskList.length) {
      if (this._activeTaskIndex < this._activeTaskList.length) {
        let e = this._activeTaskList[this._activeTaskIndex];
        if (e && !e.isCompleted) {
          this._activeTaskIndex++;
          this.percent = this._activeTaskIndex / this._activeTaskList.length;
          e.run();
        }
      } else {
        let allDone = this._activeTaskList.every(t => !t || t.isCompleted);
        if (allDone) {
          this._activeTaskList = [];
          this.percent = 1;
          this.onCompleted.dispatch();
        }
      }
    } else {
      let e = this.percent;
      this.percent = 1;
      if (e < 1) {
        this.onCompleted.dispatch();
      }
    }
  }
}
const taskManager = new TaskManager();
class Page {
  domContainer;
  route = null;
  time = 0;
  showDuration = 1;
  hideDuration = 1;
  showRatio = 0;
  hideRatio = 0;
  _showPageTween;
  _hidePageTween;
  isActive = false;
  hasInitialized = false;
  hasExtraPages = true;
  hasEndVisual = true;
  endVisualColor = properties.blueColorHex;
  endVisualUseTextured = false;
  endSectionActiveThreshold = 0.9;
  useGenericTransition = true;
  isFirstShown = false;
  bypassShowingLoading = false;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  onShowStarted = new MinSignal$2();
  onShowCompleted = new MinSignal$2();
  onHideStarted = new MinSignal$2();
  onHideCompleted = new MinSignal$2();
  constructor() {
    this._showPageTween = new Tween(this);
    this._hidePageTween = new Tween(this);
  }
  get activeRatio() {
    return this.showRatio * (1 - this.hideRatio);
  }
  hasProject(e) {
    return false;
  }
  get isScrollTarget() {
    return pagesManager.scrollTargetPage === this;
  }
  preInit(e) {}
  preInitContent(e) {}
  init(e) {
    taskManager.add(this.preUfxContainer);
    taskManager.add(this.postUfxContainer);
  }
  initContent(e) {}
  show(e, t, r) {
    this._showPageTween.kill();
    this._showPageTween.onComplete = r;
    this.hideRatio = 0;
    this._showPageTween.fromTo(this.showDuration, {
      showRatio: 0
    }, {
      showRatio: 1
    });
  }
  hide(e, t, r) {
    if (this._hidePageTween) {
      this._hidePageTween.kill();
    }
    this._hidePageTween.onComplete = r;
    this._hidePageTween.fromTo(this.hideDuration, {
      hideRatio: 0
    }, {
      hideRatio: 1
    });
  }
  resize(e, t) {}
  update(e) {}
}
let self$1;
class Ease {
  quadIn(e) {
    return e * e;
  }
  quadOut(e) {
    return e * (2 - e);
  }
  quadOutIn(e) {
    if (e < 0.5) {
      return self$1.quadOut(e + e) * 0.5;
    } else {
      return self$1.quadIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quadInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e;
    } else {
      return (--e * (e - 2) - 1) * -0.5;
    }
  }
  cubicIn(e) {
    return e * e * e;
  }
  cubicOut(e) {
    return --e * e * e + 1;
  }
  cubicOutIn(e) {
    if (e < 0.5) {
      return self$1.cubicOut(e + e) * 0.5;
    } else {
      return self$1.cubicIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  cubicInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e;
    } else {
      return ((e -= 2) * e * e + 2) * 0.5;
    }
  }
  quartIn(e) {
    return e * e * e * e;
  }
  quartOut(e) {
    return 1 - --e * e * e * e;
  }
  quartOutIn(e) {
    if (e < 0.5) {
      return self$1.quartOut(e + e) * 0.5;
    } else {
      return self$1.quartIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quartInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e;
    } else {
      return ((e -= 2) * e * e * e - 2) * -0.5;
    }
  }
  quintIn(e) {
    return e * e * e * e * e;
  }
  quintOut(e) {
    return --e * e * e * e * e + 1;
  }
  quintOutIn(e) {
    if (e < 0.5) {
      return self$1.quintOut(e + e) * 0.5;
    } else {
      return self$1.quintIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quintInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e * e;
    } else {
      return ((e -= 2) * e * e * e * e + 2) * 0.5;
    }
  }
  sineIn(e) {
    return 1 - Math.cos(e * Math.PI / 2);
  }
  sineOut(e) {
    return Math.sin(e * Math.PI / 2);
  }
  sineOutIn(e) {
    if (e < 0.5) {
      return self$1.sineOut(e + e) * 0.5;
    } else {
      return self$1.sineIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  sineInOut(e) {
    return (1 - Math.cos(Math.PI * e)) * 0.5;
  }
  expoIn(e) {
    if (e === 0) {
      return 0;
    } else {
      return Math.pow(1024, e - 1);
    }
  }
  expoOut(e) {
    if (e === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, e * -10);
    }
  }
  expoOutIn(e) {
    if (e < 0.5) {
      return self$1.expoOut(e + e) * 0.5;
    } else {
      return self$1.expoIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  expoInOut(e) {
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else if ((e *= 2) < 1) {
      return Math.pow(1024, e - 1) * 0.5;
    } else {
      return (-Math.pow(2, (e - 1) * -10) + 2) * 0.5;
    }
  }
  circIn(e) {
    return 1 - Math.sqrt(1 - e * e);
  }
  circOut(e) {
    return Math.sqrt(1 - --e * e);
  }
  circOutIn(e) {
    if (e < 0.5) {
      return self$1.circOut(e + e) * 0.5;
    } else {
      return self$1.circIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  circInOut(e) {
    if ((e *= 2) < 1) {
      return (Math.sqrt(1 - e * e) - 1) * -0.5;
    } else {
      return (Math.sqrt(1 - (e -= 2) * e) + 1) * 0.5;
    }
  }
  elasticIn(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return -(r * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n));
    }
  }
  elasticOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return r * Math.pow(2, e * -10) * Math.sin((e - t) * 2 * Math.PI / n) + 1;
    }
  }
  elasticOutIn(e) {
    if (e < 0.5) {
      return self$1.elasticOut(e + e) * 0.5;
    } else {
      return self$1.elasticIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  elasticInOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      if ((e *= 2) < 1) {
        return r * -0.5 * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n);
      } else {
        return r * Math.pow(2, (e -= 1) * -10) * Math.sin((e - t) * 2 * Math.PI / n) * 0.5 + 1;
      }
    }
  }
  backIn(e) {
    let t = 1.70158;
    return e * e * ((t + 1) * e - t);
  }
  backOut(e) {
    let t = 1.70158;
    return --e * e * ((t + 1) * e + t) + 1;
  }
  backOutIn(e) {
    if (e < 0.5) {
      return self$1.backOut(e + e) * 0.5;
    } else {
      return self$1.backIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  backInOut(e) {
    let t = 2.5949095;
    if ((e *= 2) < 1) {
      return e * 0.5 * e * ((t + 1) * e - t);
    } else {
      return ((e -= 2) * e * ((t + 1) * e + t) + 2) * 0.5;
    }
  }
  bounceIn(e) {
    return 1 - self$1.bounceOut(1 - e);
  }
  bounceOut(e) {
    if (e < 1 / 2.75) {
      return e * 7.5625 * e;
    } else if (e < 2 / 2.75) {
      return (e -= 1.5 / 2.75) * 7.5625 * e + 0.75;
    } else if (e < 2.5 / 2.75) {
      return (e -= 2.25 / 2.75) * 7.5625 * e + 0.9375;
    } else {
      return (e -= 2.625 / 2.75) * 7.5625 * e + 0.984375;
    }
  }
  bounceOutIn(e) {
    if (e < 0.5) {
      return self$1.bounceOut(e + e) * 0.5;
    } else {
      return self$1.bounceIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  bounceInOut(e) {
    if (e < 0.5) {
      return self$1.bounceIn(e * 2) * 0.5;
    } else {
      return self$1.bounceOut(e * 2 - 1) * 0.5 + 0.5;
    }
  }
  lusion(e) {
    return self$1.cubicBezier(e, 0.35, 0, 0, 1);
  }
  cubicBezier(e, t, r, n, a) {
    if (e <= 0) {
      return 0;
    }
    if (e >= 1) {
      return 1;
    }
    if (t === r && n === a) {
      return e;
    }
    const l = (ce, z, j, X) => 1 / (z * 3 * ce * ce + j * 2 * ce + X);
    const c = (ce, z, j, X, Z) => z * (ce * ce * ce) + j * (ce * ce) + X * ce + Z;
    const u = (ce, z, j, X, Z) => {
      let q = ce * ce;
      return z * (q * ce) + j * q + X * ce + Z;
    };
    let f = 0;
    let p = 0;
    let g = t;
    let v = r;
    let _ = n;
    let T = a;
    let M = 1;
    let S = 1;
    let b = M - _ * 3 + g * 3 - f;
    let C = _ * 3 - g * 6 + f * 3;
    let w = g * 3 - f * 3;
    let R = f;
    let E = S - T * 3 + v * 3 - p;
    let I = T * 3 - v * 6 + p * 3;
    let F = v * 3 - p * 3;
    let k = p;
    let L = e;
    let D;
    let ne;
    let re;
    for (D = 0; D < 100; D++) {
      ne = c(L, b, C, w, R);
      re = l(L, b, C, w);
      if (re === Infinity) {
        re = e;
      }
      L -= (ne - e) * re;
      L = Math.min(Math.max(L, 0), 1);
    }
    return u(L, E, I, F, k);
  }
}
self$1 = new Ease();
const ease = self$1;
const vert$l = `#define GLSLIFY 1
attribute vec3 daoN;attribute vec3 daoP;attribute float ao;attribute float thickness;attribute vec3 SN;uniform vec3 u_lightPosition;uniform vec4 u_selfPositionRadius;uniform vec4 u_selfRotation;uniform float u_time;varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_smoothViewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_ao;varying float v_thickness;varying float v_selfShadow;vec3 qrotate(vec3 v,vec4 q){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){v_localPosition=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;vec3 worldPosition=(modelMatrix*vec4(position,1.)).xyz;vec4 invertedQuat=vec4(-u_selfRotation.xyz,u_selfRotation.w);vec3 L=(u_lightPosition-worldPosition)/u_selfPositionRadius.w;L=normalize(qrotate(L,invertedQuat));vec3 dao=mix(daoN,daoP,sign(L)*.5+.5);vec3 absDir=abs(L);float selfShadow=dot(absDir,dao)/(absDir.x+absDir.y+absDir.z);selfShadow=min(pow(selfShadow*3.,0.3)*1.45,1.);v_worldPosition=worldPosition;v_viewNormal=normalMatrix*normal;v_smoothViewNormal=normalMatrix*SN;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_ao=ao;v_thickness=thickness;v_selfShadow=selfShadow;}`;
const frag$p = `#define GLSLIFY 1
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
gl_FragColor.rgb=color;gl_FragColor.a=max(0.,dot(color,vec3(0.299,0.587,0.114))*1.5-1.);gl_FragColor.rgb=filmicToneMapping(pow(gl_FragColor.rgb,vec3(2.2)));}`;
const prePassVert = `#define GLSLIFY 1
void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z+=0.002/gl_Position.w;}`;
const prePassFrag = `#define GLSLIFY 1
void main(){gl_FragColor=vec4(1.);}`;
class Stage3D extends Scene {
  wasActive = null;
  isActive = null;
  constructor(e = {}) {
    super();
    Object.assign(this, {
      defaultCameraPosition: new Vector3(0, 0, 5),
      defaultLookAtPosition: new Vector3(0, 0, 0),
      properties: {}
    }, e);
  }
  preInit() {}
  init() {}
  resize(e, t) {}
  syncProperties(e) {}
  update(e) {}
}
const blur9VaryingVertexShader = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_delta;varying vec2 v_uv[9];void main(){vec2 uv=position.xy*0.5+0.5;v_uv[0]=uv;vec2 delta=u_delta;v_uv[1]=uv-delta;v_uv[2]=uv+delta;delta+=u_delta;v_uv[3]=uv-delta;v_uv[4]=uv+delta;delta+=u_delta;v_uv[5]=uv-delta;v_uv[6]=uv+delta;delta+=u_delta;v_uv[7]=uv-delta;v_uv[8]=uv+delta;gl_Position=vec4(position,1.0);}`;
const blur9VaryingFragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv[9];void main(){vec4 color=texture2D(u_texture,v_uv[0])*0.1633;color+=texture2D(u_texture,v_uv[1])*0.1531;color+=texture2D(u_texture,v_uv[2])*0.1531;color+=texture2D(u_texture,v_uv[3])*0.12245;color+=texture2D(u_texture,v_uv[4])*0.12245;color+=texture2D(u_texture,v_uv[5])*0.0918;color+=texture2D(u_texture,v_uv[6])*0.0918;color+=texture2D(u_texture,v_uv[7])*0.051;color+=texture2D(u_texture,v_uv[8])*0.051;gl_FragColor=color;}`;
const blur9FragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_delta;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv)*0.1633;vec2 delta=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.1531;color+=texture2D(u_texture,v_uv+delta)*0.1531;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.12245;color+=texture2D(u_texture,v_uv+delta)*0.12245;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.0918;color+=texture2D(u_texture,v_uv+delta)*0.0918;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.051;color+=texture2D(u_texture,v_uv+delta)*0.051;gl_FragColor=color;}`;
class Blur {
  material = null;
  getBlur9Material() {
    let e = fboHelper.MAX_VARYING_VECTORS > 8;
    this.blur9Material ||= fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_delta: {
          value: new Vector2()
        }
      },
      vertexShader: e ? fboHelper.precisionPrefix + blur9VaryingVertexShader : fboHelper.vertexShader,
      fragmentShader: fboHelper.precisionPrefix + (e ? blur9VaryingFragmentShader : blur9FragmentShader),
      depthWrite: false,
      depthTest: false
    });
    return this.blur9Material;
  }
  blur(e, t, r, n, a, l) {
    let c = 0.25;
    let u = Math.ceil(r.width * t) || 0;
    let f = Math.ceil(r.height * t) || 0;
    this.material ||= this.getBlur9Material();
    if (!n) {
      console.warn("You have to pass intermediateRenderTarget to blur");
    }
    if (u !== n.width || f !== n.height) {
      n.setSize(u, f);
    }
    if (a) {
      if (!l) {
        a.setSize(r.width, r.height);
      }
    } else {
      a = r;
    }
    this.material.uniforms.u_texture.value = r.texture || r;
    this.material.uniforms.u_delta.value.set(e / u * c, 0);
    fboHelper.render(this.material, n);
    this.material.uniforms.u_texture.value = n.texture || n;
    this.material.uniforms.u_delta.value.set(0, e / f * c);
    fboHelper.render(this.material, a);
  }
}
const blur = new Blur();
class ShaderHelper {
  glslifyStrip(e) {
    return e.replace(/#define\sGLSLIFY\s./, "");
  }
  addChunk(e, t) {
    ShaderChunk[e] = this.glslifyStrip(t);
  }
  _wrapInclude(e) {
    return "#include <" + e + ">";
  }
  insertBefore(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(t, `${this.glslifyStrip(r)}
${a}`);
  }
  insertAfter(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(a, `${a}
${this.glslifyStrip(r)}
`);
  }
  replace(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(a, `
${this.glslifyStrip(r)}
`);
  }
}
const shaderHelper = new ShaderHelper();
const getBlueNoiseShader = `#define GLSLIFY 1
uniform sampler2D u_blueNoiseTexture;uniform vec2 u_blueNoiseTexelSize;uniform vec2 u_blueNoiseCoordOffset;vec3 getBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize+u_blueNoiseCoordOffset).rgb;}vec3 getStaticBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize).rgb;}`;
class BlueNoise {
  sharedUniforms = {
    u_blueNoiseTexture: {
      value: null
    },
    u_blueNoiseLinearTexture: {
      value: null
    },
    u_blueNoiseTexelSize: {
      value: null
    },
    u_blueNoiseCoordOffset: {
      value: new Vector2()
    }
  };
  TEXTURE_SIZE = 128;
  preInit() {
    let e = new Texture();
    e.generateMipmaps = false;
    e.minFilter = e.magFilter = LinearFilter;
    e.wrapS = e.wrapT = RepeatWrapping;
    let t = new Texture(properties.loader.add(settings.TEXTURE_PATH + "LDR_RGB1_0.png", {
      weight: 55,
      onLoad: function () {
        t.needsUpdate = true;
        e.needsUpdate = true;
      }
    }).content);
    e.image = t.image;
    t.generateMipmaps = false;
    t.minFilter = t.magFilter = NearestFilter;
    t.wrapS = t.wrapT = RepeatWrapping;
    this.sharedUniforms.u_blueNoiseTexture.value = t;
    this.sharedUniforms.u_blueNoiseLinearTexture.value = e;
    this.sharedUniforms.u_blueNoiseTexelSize.value = new Vector2(1 / this.TEXTURE_SIZE, 1 / this.TEXTURE_SIZE);
    shaderHelper.addChunk("getBlueNoise", getBlueNoiseShader);
  }
  update(e) {
    this.sharedUniforms.u_blueNoiseCoordOffset.value.set(Math.random(), Math.random());
  }
}
const blueNoise = new BlueNoise();
const COLORS$1 = settings.BALLOON_COLOR ? ["#" + settings.BALLOON_COLOR] : ["#061dfb", "#ADFF00", "#f6000e", "#7e09f5", "#ffc000"];
const colorIndex = Math.floor(Math.random() * COLORS$1.length);
const fancyColor = COLORS$1[colorIndex];
const _c$1 = new Color(fancyColor);
_c$1.offsetHSL(0, 0, 0.5);
let SOFT_PLASTIC;
let HARD_PLASTIC;
let GLASS;
let STONE;
SOFT_PLASTIC = HARD_PLASTIC = GLASS = STONE = {
  density: 1,
  friction: 2,
  restitution: 0.8
};
let sphereData = [{
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}];
if (!browser$1.isMobile) {
  sphereData.push({
    color: "#fff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: true,
    isRough: true,
    isColored: false,
    isBlackWhite: true,
    radius: 1,
    ...GLASS
  }, {
    color: "#" + _c$1.getHexString(),
    sss: 0,
    sssColor: "#111",
    isSemitransparent: true,
    isRough: true,
    isColored: true,
    isBlackWhite: false,
    radius: 1,
    ...GLASS
  });
}
const SPHERES_DATA = sphereData;
const vert$k = `#define GLSLIFY 1
uniform vec2 u_clipScale;uniform vec2 u_clipOffset;varying vec2 v_uv;void main(){vec3 pos=position;vec3 absPos=abs(position);if(max(absPos.x,absPos.y)<0.9){pos.xy=pos.xy*u_clipScale+u_clipOffset;pos*=2.;}gl_Position=vec4(pos,1.0);v_uv=vec2(pos.x,pos.y)*0.5+0.5;}`;
const frag$o = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform vec3 u_colorPaint;uniform float u_aspect;uniform vec2 u_smooth;uniform vec2 u_resolution;uniform float u_activeRatio;uniform sampler2D u_screenPaintTexture;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec2 q=vec2(v_uv-0.5);q.x*=u_aspect;float dst=length(q);dst=smoothstep(u_smooth.x,u_smooth.y,dst);vec3 color=mix(u_color0,u_color1,0.925+0.075*dst);color+=noise*0.004;gl_FragColor.rgb=color;gl_FragColor.a=0.0;}`;
const frag$n = `#define GLSLIFY 1
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
class ScreenPaint {
  _lowRenderTarget;
  _lowBlurRenderTarget;
  _prevPaintRenderTarget;
  _currPaintRenderTarget;
  _material;
  _material2;
  _distortionMaterial;
  _fromDrawData;
  _toDrawData;
  drawEnabled = true;
  needsMouseDown = false;
  enabled = true;
  minRadius = 0;
  maxRadius = 100;
  radiusDistanceRange = 100;
  pushStrength = 25;
  accelerationDissipation = 0.8;
  velocityDissipation = 0.985;
  weight1Dissipation = 0.985;
  weight2Dissipation = 0.5;
  useNoise = false;
  curlScale = 0.1;
  curlStrength = 5;
  _prevUseNoise = null;
  sharedUniforms = {
    u_paintTexelSize: {
      value: new Vector2()
    },
    u_paintTextureSize: {
      value: new Vector2()
    },
    u_prevPaintTexture: {
      value: null
    },
    u_currPaintTexture: {
      value: null
    },
    u_lowPaintTexture: {
      value: null
    }
  };
  init() {
    this._lowRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._lowBlurRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._prevPaintRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._currPaintRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.sharedUniforms.u_lowPaintTexture.value = this._lowRenderTarget.texture;
    this._material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lowPaintTexture: {
          value: this._lowRenderTarget.texture
        },
        u_prevPaintTexture: this.sharedUniforms.u_prevPaintTexture,
        u_paintTexelSize: this.sharedUniforms.u_paintTexelSize,
        u_drawFrom: {
          value: this._fromDrawData = new Vector4(0, 0, 0, 0)
        },
        u_drawTo: {
          value: this._toDrawData = new Vector4(0, 0, 0, 0)
        },
        u_pushStrength: {
          value: 0
        },
        u_curlScale: {
          value: 0
        },
        u_curlStrength: {
          value: 0
        },
        u_vel: {
          value: new Vector2()
        },
        u_dissipations: {
          value: new Vector3()
        },
        u_scrollOffset: {
          value: new Vector2()
        }
      },
      fragmentShader: frag$n
    });
  }
  resize(e, t) {
    let r = e >> 2;
    let n = t >> 2;
    let a = e >> 3;
    let l = t >> 3;
    if (r !== this._currPaintRenderTarget.width || n !== this._currPaintRenderTarget.height) {
      this._currPaintRenderTarget.setSize(r, n);
      this._prevPaintRenderTarget.setSize(r, n);
      this._lowRenderTarget.setSize(a, l);
      this._lowBlurRenderTarget.setSize(a, l);
      this.sharedUniforms.u_paintTexelSize.value.set(1 / r, 1 / n);
      this.sharedUniforms.u_paintTextureSize.value.set(r, n);
      this.clear();
    }
  }
  clear = () => {
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowRenderTarget);
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowBlurRenderTarget);
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._currPaintRenderTarget);
    this._material.uniforms.u_vel.value.set(0, 0);
  };
  update(e) {
    if (!this.enabled) {
      return;
    }
    if (this.useNoise !== this._prevUseNoise) {
      this._material.defines.USE_NOISE = this.useNoise;
      this._material.needsUpdate = true;
      this._prevUseNoise = this.useNoise;
    }
    let t = this._currPaintRenderTarget.width;
    let r = this._currPaintRenderTarget.height;
    let n = this._prevPaintRenderTarget;
    this._prevPaintRenderTarget = this._currPaintRenderTarget;
    this._currPaintRenderTarget = n;
    this.sharedUniforms.u_prevPaintTexture.value = this._prevPaintRenderTarget.texture;
    this.sharedUniforms.u_currPaintTexture.value = this._currPaintRenderTarget.texture;
    let a = scrollManager.scrollViewDelta * properties.screenPaintOffsetRatio;
    let l = scrollManager.isVertical ? 0 : a;
    let c = scrollManager.isVertical ? a : 0;
    _v$4.copy(input.mousePixelXY);
    _v$4.x += l * properties.viewportWidth * 3;
    _v$4.y += c * properties.viewportHeight * 3;
    let u = _v$4.distanceTo(input.prevMousePixelXY);
    let f = math.fit(u, 0, this.radiusDistanceRange, this.minRadius, this.maxRadius);
    if (Math.abs(scrollManager.scrollViewDelta) == 0 && (!input.hadMoved || !this.drawEnabled || (this.needsMouseDown || browser$1.isMobile) && (!input.isDown || !input.wasDown))) {
      f = 0;
    }
    f = f / properties.viewportHeight * r;
    this._material.uniforms.u_pushStrength.value = this.pushStrength;
    this._material.uniforms.u_curlScale.value = this.curlScale;
    this._material.uniforms.u_curlStrength.value = this.curlStrength;
    this._material.uniforms.u_dissipations.value.set(this.velocityDissipation, this.weight1Dissipation, this.weight2Dissipation);
    this._fromDrawData.copy(this._toDrawData);
    _v$4.copy(input.mouseXY);
    _v$4.x += l;
    _v$4.y += c;
    this._toDrawData.set((_v$4.x + 1) * t / 2, (_v$4.y + 1) * r / 2, f, 1);
    _v$4.set(this._toDrawData.x - this._fromDrawData.x, this._toDrawData.y - this._fromDrawData.y).multiplyScalar(e * 0.8);
    this._material.uniforms.u_vel.value.multiplyScalar(this.accelerationDissipation).add(_v$4);
    this._material.uniforms.u_scrollOffset.value.y = l;
    this._material.uniforms.u_scrollOffset.value.y = c;
    fboHelper.render(this._material, this._currPaintRenderTarget);
    fboHelper.copy(this._currPaintRenderTarget.texture, this._lowRenderTarget);
    blur.blur(8, 1, this._lowRenderTarget, this._lowBlurRenderTarget);
  }
}
const screenPaint = new ScreenPaint();
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
    e.setAttribute("position", new BufferAttribute(new Float32Array([0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0, -0.5, -0.5, 0, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1]), 3));
    e.setIndex(new BufferAttribute(new Uint16Array([3, 2, 7, 8, 9, 11, 11, 10, 8, 0, 5, 7, 0, 1, 5, 1, 4, 5, 1, 2, 4, 2, 3, 4, 5, 6, 7, 6, 3, 7]), 1));
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_color0: {
          value: new Color("#141515")
        },
        u_color1: {
          value: new Color("#141515")
        },
        u_colorPaint: {
          value: new Color("#1a2ffb")
        },
        u_aspect: {
          value: 1
        },
        u_smooth: {
          value: new Vector2(0, 1)
        },
        u_clipScale: {
          value: this.clipScale
        },
        u_clipOffset: {
          value: this.clipOffset
        },
        u_time: {
          value: 0
        },
        u_activeRatio: {
          value: 0
        },
        u_resolution: {
          value: new Vector2()
        },
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture
      }, blueNoise.sharedUniforms),
      vertexShader: vert$k,
      fragmentShader: frag$o,
      side: BackSide
    }));
    this.mesh.material.defines.NEIGHBOUR_COUNT = homeBalloons.NEIGHBOUR_COUNT + 1;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -1000;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    if (this.mesh) {
      this.mesh.material.uniforms.u_activeRatio.value = this.activeRatio;
      this.mesh.material.uniforms.u_time.value += e * 0.2;
      this.mesh.material.uniforms.u_aspect.value = properties.width / properties.height;
      this.mesh.material.uniforms.u_resolution.value.copy(properties.sharedUniforms.u_resolution.value);
      this.mesh.material.uniforms.u_color0.value.set(COLORS$1[properties.balloonsColorIndex]);
    }
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
  constructor(e = 1, t = 1, r = 0.5, n = 0.5, a = false) {
    this.position0.set((random() - 0.5) * 12, (random() - 0.5) * 12, a ? 7 + random() : (random() - 0.5) * 6);
    this.velocity0.copy(this.position0).multiplyScalar(-2);
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);
    this.radius = e * 1.05;
    this.density = t;
    this.friction = r;
    this.restitution = n;
    this.volume = Math.PI * this.radius * 1.333333;
    this.mass = this.volume * this.radius * this.radius * this.density;
    this.inertia = this.mass * this.radius * this.radius * 0.4;
    this.reset();
  }
  reset() {
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);
  }
  applyImpulse() {
    this.gravityForce.copy(this.position).negate().multiplyScalar(10);
    this.gravityAcc.copy(this.gravityForce);
    this.gravityForce.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(80);
    this.gravityAcc.add(this.gravityForce).multiplyScalar(1 / this.mass);
    this.velocity.negate();
    this.velocity.add(this.gravityAcc);
  }
  updateGravity(e) {
    this.gravityForce.copy(this.position).negate().multiplyScalar(GRAVITY_FACTOR);
    this.gravityAcc.copy(this.gravityForce).multiplyScalar(1 / this.mass);
    this.gravityAcc.multiplyScalar(1 / (1 + this.frictionTot));
    this.velocity.addScaledVector(this.gravityAcc, e);
    this.frictionTot *= 0.5;
  }
  update(e) {
    this.position.addScaledVector(this.velocity, e);
    this.velocity.multiplyScalar(Math.pow(0.2, e));
  }
}
const _mouse = new Vector3();
const _mousePrev = new Vector3();
const _vel = new Vector3();
const _pos = new Vector3();
const _v0$3 = new Vector3();
const _v1$6 = new Vector3();
const _p1$1 = new Vector3();
const _normal = new Vector3();
const _q$2 = new Quaternion();
const _mousePushForce = new Vector3();
const _mouseBA = new Vector3();
class HomeBalloonsPhysics {
  MOUSE_RADIUS = 0.025;
  MOUSE_INFLUENCE = 0.1;
  MOUSE_PUSH_FORCE = 0.12;
  bodies = [];
  isActive = true;
  initWorld() {
    for (let e = 0; e < homeBalloons.NUM_BALLOONS; e++) {
      const t = homeBalloons.balloonList[e];
      const {
        radius: r,
        density: n,
        friction: a,
        restitution: l,
        isSemitransparent: c
      } = t;
      const u = new HomeBalloonsBody(r, n, a, l, c);
      this.bodies.push(u);
    }
  }
  reset() {
    for (let e = 0; e < this.bodies.length; e++) {
      this.bodies[e].reset();
    }
  }
  update(e) {
    if (!this.isActive) {
      return;
    }
    _p1$1.set(input.mouseXY.x, input.mouseXY.y, 0.5);
    _p1$1.unproject(properties.camera);
    _p1$1.sub(properties.camera.position).normalize();
    const r = (0 - properties.camera.position.z) / _p1$1.z;
    _p1$1.multiplyScalar(r);
    _mouse.copy(properties.camera.position).add(_p1$1);
    _mousePushForce.copy(_mouse).sub(_mousePrev).multiplyScalar(this.MOUSE_PUSH_FORCE / e);
    _mouseBA.copy(_mouse).sub(properties.camera.position);
    let n = _mouseBA.lengthSq();
    _mousePrev.copy(_mouse);
    for (let a = 0; a < this.bodies.length; a++) {
      const l = this.bodies[a];
      l.updateGravity(e);
      _vel.copy(l.velocity);
      _pos.copy(l.position);
      for (let p = a + 1; p < this.bodies.length; p++) {
        const g = this.bodies[p];
        _v1$6.copy(g.velocity);
        _p1$1.copy(g.position);
        _normal.copy(_pos).sub(_p1$1);
        const v = _normal.length();
        const _ = l.radius + g.radius;
        if (v < _) {
          const T = Math.sqrt(l.friction * g.friction, 2);
          l.frictionTot += T;
          g.frictionTot += T;
          _normal.normalize();
          _normal.multiplyScalar((v - _) * 0.5);
          _pos.sub(_normal);
          _p1$1.add(_normal);
          _normal.normalize();
          const M = _vel.dot(_normal);
          const S = _v1$6.dot(_normal);
          const b = l.mass;
          const C = g.mass;
          const w = l.restitution;
          const R = g.restitution;
          const E = (b * M + C * S - C * (M - S) * w) / (b + C);
          const I = (b * M + C * S - b * (S - M) * R) / (b + C);
          _vel.addScaledVector(_normal, (E - M) / (1 + T));
          _v1$6.addScaledVector(_normal, (I - S) / (1 + T));
          g.position.copy(_p1$1);
          g.velocity.copy(_v1$6);
        }
      }
      _v0$3.copy(_pos).sub(properties.camera.position);
      let c = _v0$3.dot(_mouseBA) / n;
      c = _v0$3.sub(_v1$6.copy(_mouseBA).multiplyScalar(c)).length() - l.radius - this.MOUSE_RADIUS;
      if (c < 0) {
        _v0$3.copy(_pos).sub(properties.camera.position).cross(_mouseBA).normalize();
        _v1$6.copy(_mouseBA).cross(_v0$3).normalize();
        _pos.sub(_v1$6.multiplyScalar(this.MOUSE_INFLUENCE * c));
        _v1$6.multiplyScalar(-this.MOUSE_PUSH_FORCE / e);
        _vel.add(_v1$6);
        _vel.add(_mousePushForce);
      }
      let u = _pos.length();
      if (u > 0) {
        _v0$3.set(1, 1, 1).normalize();
        let p = 1 - Math.abs(_v0$3.dot(_v1$6.copy(_pos).normalize()));
        p *= e * math.fit(u, 0, 2, 0, 1) * 0.5;
        p *= a % 2 * 2 - 1;
        _q$2.setFromAxisAngle(_v0$3, p);
        _v1$6.copy(_pos).applyQuaternion(_q$2).sub(_v0$3.copy(_pos));
        _vel.add(_v1$6);
      }
      _v0$3.cross(_vel);
      let f = _v0$3.length();
      f /= l.inertia;
      if (f > 0) {
        _v0$3.normalize();
        _q$2.setFromAxisAngle(_v0$3, f * e);
        l.quaternion.premultiply(_q$2);
      }
      l.position.copy(_pos);
      l.velocity.copy(_vel);
      l.update(e);
    }
  }
}
const homeBalloonsPhysics = new HomeBalloonsPhysics();
let _v$3 = new Vector3();
let _color = new Color();
let _blackWhiteToggle = 0;
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
    u_blurredTextures: {
      value: []
    },
    u_blurredTextureSizes: {
      value: []
    },
    u_matcap: {
      value: null
    },
    u_lightPosition: {
      value: new Vector3(10, 10, 5)
    }
  };
  isReady = false;
  lockedIndex = -1;
  changeHomeHeroColorSignal = new MinSignal$2();
  constructor() {
    super({
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 0),
        defaultLookAtPosition: new Vector3(0, 0, 0),
        cameraFov: 25,
        clearAlpha: 0
      }
    });
    this.NUM_BALLOONS = SPHERES_DATA.length;
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    this.cacheInterRT0 = fboHelper.createRenderTarget(1, 1);
    this.cacheInterRT1 = fboHelper.createRenderTarget(1, 1);
    this.cacheInterRT2 = fboHelper.createRenderTarget(1, 1);
    this.cacheInterRT3 = fboHelper.createRenderTarget(1, 1);
    this.cacheRTBlur0 = fboHelper.createRenderTarget(1, 1);
    this.cacheRTBlur1 = fboHelper.createRenderTarget(1, 1);
    this.cacheRTBlur2 = fboHelper.createRenderTarget(1, 1);
    this.cacheRTBlur3 = fboHelper.createRenderTarget(1, 1);
    this.sharedUniforms.u_blurredTextures.value.push(this.cacheRTBlur0.texture);
    this.sharedUniforms.u_blurredTextures.value.push(this.cacheRTBlur1.texture);
    this.sharedUniforms.u_blurredTextures.value.push(this.cacheRTBlur2.texture);
    this.sharedUniforms.u_blurredTextures.value.push(this.cacheRTBlur3.texture);
    this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2());
    this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2());
    this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2());
    this.sharedUniforms.u_blurredTextureSizes.value.push(new Vector2());
  }
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "home/" + (browser$1.isMobile ? "cross_ld" : "cross") + ".buf", {
      onLoad: e => {
        this.geometry = e;
      }
    });
    properties.loader.add(`${settings.TEXTURE_PATH}home/${browser$1.isMobile ? "matcap_ld" : "matcap"}.exr`, {
      onLoad: e => {
        if (e) {
          e.minFilter = LinearFilter;
        }
        this.sharedUniforms.u_matcap.value = e;
      }
    });
    homeBalloonsBackground.preInit();
    this.changeHomeHeroColorSignal.add(() => {
      properties.balloonsColorIndex += 1;
      properties.balloonsColorIndex = math.mod(properties.balloonsColorIndex, COLORS$1.length);
      _blackWhiteToggle = 1 - _blackWhiteToggle;
      homeBalloonsPhysics.bodies.forEach(e => e.applyImpulse());
    });
  }
  init() {
    let e = math.getSeedRandomFn("balloon24");
    this.NEIGHBOUR_COUNT = this.NUM_BALLOONS - 1;
    let t = new ShaderMaterial({
      uniforms: {},
      vertexShader: prePassVert,
      fragmentShader: prePassFrag,
      colorWrite: false
    });
    let r = new ShaderMaterial({
      uniforms: {},
      vertexShader: prePassVert,
      fragmentShader: prePassFrag,
      side: BackSide,
      colorWrite: false
    });
    for (let n = 0; n < this.NUM_BALLOONS; n++) {
      let a = SPHERES_DATA[n];
      let {
        sssColor: l,
        name: c,
        color: u,
        isColored: f,
        sss: p,
        isSemitransparent: g,
        isRough: v,
        radius: _,
        density: T,
        friction: M,
        restitution: S,
        isBlackWhite: b
      } = a;
      let C = this.geometry;
      let w = new Vector4();
      let R = Object.assign({
        u_color: {
          value: new Color()
        },
        u_bgColor: {
          value: new Color()
        },
        u_sssColor: {
          value: new Color()
        },
        u_matcap: this.sharedUniforms.u_matcap,
        u_lightPosition: this.sharedUniforms.u_lightPosition,
        u_sss: {
          value: 0
        },
        u_roughness: {
          value: v ? 0.8 : 0.1
        },
        u_selfPositionRadius: {
          value: w
        },
        u_selfRotation: {
          value: new Quaternion()
        },
        u_nearPositionRadiusList: {
          value: []
        },
        u_nearRotationList: {
          value: []
        },
        u_nearColorList: {
          value: []
        },
        u_nearTransparencyLumaList: {
          value: []
        },
        u_time: properties.sharedUniforms.u_time
      }, blueNoise.sharedUniforms);
      let E = new Mesh(C, new ShaderMaterial({
        uniforms: R,
        vertexShader: vert$l,
        fragmentShader: frag$p
      }));
      let I = new Mesh(C, g ? r : t);
      E._prePassMesh = I;
      I._mesh = E;
      this.prePassMeshList.push(I);
      E.material.defines.NEIGHBOUR_COUNT = this.NEIGHBOUR_COUNT;
      E.material.extensions.derivatives = true;
      E.frustumCulled = false;
      for (let k = 0; k < this.NEIGHBOUR_COUNT; k++) {
        E.material.uniforms.u_nearPositionRadiusList.value[k] = new Vector4();
        E.material.uniforms.u_nearRotationList.value[k] = new Quaternion();
        E.material.uniforms.u_nearColorList.value[k] = new Color();
        E.material.uniforms.u_nearTransparencyLumaList.value[k] = new Vector2();
      }
      E.position.set(e() * 2, e() * 2 - 1, e() * 2 - 1);
      E.scale.setScalar(_);
      I.scale.setScalar(_);
      w.w = _;
      this.add(E);
      this.add(I);
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
        isBlackWhite: b
      };
      if (g) {
        E.onBeforeRender = this.onBeforeRenderFront.bind(this);
        E.material.uniforms.u_sceneTexture = {
          value: this.cacheRT.texture
        };
        E.material.uniforms.u_blurredTextures = this.sharedUniforms.u_blurredTextures;
        E.material.uniforms.u_blurredTextureSizes = this.sharedUniforms.u_blurredTextureSizes;
        E.material.defines.IS_SEMITRANSPARENT = true;
        let k = E.clone();
        k.material = new ShaderMaterial({
          uniforms: Object.assign({
            u_sceneTexture: E.material.uniforms.u_sceneTexture
          }, R),
          vertexShader: vert$l,
          fragmentShader: frag$p,
          side: 1
        });
        k.onBeforeRender = this.onBeforeRenderBack.bind(this);
        k.material.defines.NEIGHBOUR_COUNT = this.NEIGHBOUR_COUNT;
        k.material.defines.IS_SEMITRANSPARENT_BACK = true;
        k.material.extensions.derivatives = true;
        this.add(k);
        F.meshBack = k;
      }
      this.balloonList.push(F);
    }
    this._sortedBalloonList = this.balloonList.slice(0);
    homeBalloonsBackground.init();
    this.add(homeBalloonsBackground.container);
    homeBalloonsPhysics.initWorld();
    taskManager.add(this);
    this.isReady = true;
  }
  onBeforeRenderFront() {
    let e = fboHelper.renderer;
    let t = e.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState();
    fboHelper.copy(t.texture, this.cacheRT);
    blur.blur(6, 0.5, this.cacheRT, this.cacheInterRT0, this.cacheRTBlur0, true);
    blur.blur(6, 0.5, this.cacheRTBlur0, this.cacheInterRT1, this.cacheRTBlur1, true);
    blur.blur(6, 0.5, this.cacheRTBlur1, this.cacheInterRT2, this.cacheRTBlur2, true);
    blur.blur(6, 0.5, this.cacheRTBlur2, this.cacheInterRT3, this.cacheRTBlur3, true);
    this.sharedUniforms.u_blurredTextureSizes.value[0].set(this.cacheRTBlur0.width, this.cacheRTBlur0.height);
    this.sharedUniforms.u_blurredTextureSizes.value[1].set(this.cacheRTBlur1.width, this.cacheRTBlur1.height);
    this.sharedUniforms.u_blurredTextureSizes.value[2].set(this.cacheRTBlur2.width, this.cacheRTBlur2.height);
    this.sharedUniforms.u_blurredTextureSizes.value[3].set(this.cacheRTBlur3.width, this.cacheRTBlur3.height);
    e.setRenderTarget(t);
  }
  onBeforeRenderBack() {
    let e = fboHelper.renderer;
    let t = e.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState();
    fboHelper.copy(t.texture, this.cacheRT);
    e.setRenderTarget(t);
  }
  resize(e, t) {
    this.cacheRT.setSize(e, t);
    let r = e >> 1;
    let n = t >> 1;
    this.cacheRTBlur0.setSize(r, n);
    r = r >> 1;
    n = n >> 1;
    this.cacheRTBlur1.setSize(r, n);
    r = r >> 1;
    n = n >> 1;
    this.cacheRTBlur2.setSize(r, n);
    r = r >> 1;
    n = n >> 1;
    this.cacheRTBlur3.setSize(r, n);
    homeBalloonsBackground.resize(r, n);
  }
  _sortDist2(e, t) {
    return e.distance2 - t.distance2;
  }
  _sortMeshDist2(e, t) {
    return e._mesh.distance2 - t._mesh.distance2;
  }
  syncProperties(e) {
    this.properties.defaultCameraPosition.z = math.fit(homePage.time, 0.3, 2, 25, 17.5, ease.backOut);
    this.properties.cameraDollyZoomFovOffset = math.fit(homePage.time, 0.3, 3, 100, 0, ease.backOut);
  }
  updateColor() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      const t = this.balloonList[e];
      if (t.isColored) {
        const r = COLORS$1[properties.balloonsColorIndex];
        if (t.isSemitransparent) {
          _color.set(r);
          _color.offsetHSL(0, 0, 0.3);
          t.color = "#" + _color.getHexString();
        } else {
          t.color = r;
        }
      } else if (t.isBlackWhite) {
        t.color = _blackWhiteToggle ? "#888" : "#eee";
      }
    }
  }
  updateUniforms() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      let t = this.balloonList[e];
      let {
        isSemitransparent: r,
        color: n,
        sss: a,
        sssColor: l
      } = t;
      t.mesh.material.uniforms.u_bgColor.value.copy(properties.bgColor);
      t.mesh.material.uniforms.u_color.value.set(n);
      t.mesh.material.uniforms.u_sss.value = a;
      t.mesh.material.uniforms.u_sssColor.value.set(l);
      if (r) {
        t.meshBack.material.uniforms.u_bgColor.value.copy(properties.bgColor);
        t.meshBack.material.uniforms.u_color.value.set(n);
        t.meshBack.material.uniforms.u_sss.value = a;
        t.meshBack.material.uniforms.u_sssColor.value.set(l);
      }
    }
  }
  updateSorting() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      let t = this.balloonList[e];
      for (let r = 0; r < this.NUM_BALLOONS; r++) {
        let n = this._sortedBalloonList[r];
        if (t == n) {
          n.distance2 = 0;
        } else {
          n.distance2 = t.mesh.position.distanceToSquared(n.mesh.position);
        }
      }
      this._sortedBalloonList.sort(this._sortDist2);
      t.mesh.material.uniforms.u_selfRotation.value.copy(t.mesh.quaternion);
      for (let r = 0; r < this.NEIGHBOUR_COUNT; r++) {
        let n = this._sortedBalloonList[r + 1];
        t.mesh.material.uniforms.u_nearPositionRadiusList.value[r].set(n.mesh.position.x, n.mesh.position.y, n.mesh.position.z, n.mesh.scale.x);
        t.mesh.material.uniforms.u_nearRotationList.value[r].copy(n.mesh.quaternion);
        _color.set(n.color);
        t.mesh.material.uniforms.u_nearColorList.value[r].copy(_color);
        t.mesh.material.uniforms.u_nearTransparencyLumaList.value[r].set(n.isSemitransparent ? 1 : 0, _color.r * 0.299 + _color.g * 0.587 + _color.b * 0.114);
      }
      t.mesh.getWorldPosition(_v$3);
      _v$3.applyMatrix4(properties.camera.matrixWorldInverse);
      t.distanceFromCamera = -_v$3.z;
    }
  }
  updateRenderOrder() {
    this._sortedBalloonList.sort((r, n) => r.distanceFromCamera < n.distanceFromCamera ? 1 : -1);
    let e = [-1];
    for (let r = 0; r < this.NUM_BALLOONS; r++) {
      if (this._sortedBalloonList[r].isSemitransparent) {
        e.push(r);
      }
    }
    e.push(this.NUM_BALLOONS);
    let t = 0;
    for (let r = 0; r < this.NUM_BALLOONS; r++) {
      let n = this._sortedBalloonList[r];
      if (n.isSemitransparent) {
        n.mesh.renderOrder = r * 3 + 2;
        n.meshBack.renderOrder = r * 3;
        t++;
      } else {
        n.mesh.renderOrder = (e[t + 1] - (r - e[t])) * 3 + 2;
      }
    }
  }
  updateTransformations() {
    for (let e = 0; e < this.NUM_BALLOONS; e++) {
      const t = this.balloonList[e];
      const r = homeBalloonsPhysics.bodies[e];
      t.mesh.position.copy(r.position);
      t.mesh.quaternion.copy(r.quaternion);
      t.selfPositionRadius.x = t.mesh.position.x;
      t.selfPositionRadius.y = t.mesh.position.y;
      t.selfPositionRadius.z = t.mesh.position.z;
      if (t.isSemitransparent) {
        t.meshBack.position.copy(t.mesh.position);
        t.meshBack.rotation.copy(t.mesh.rotation);
      }
    }
  }
  update(e) {
    if (this.isReady) {
      homeBalloonsBackground.update(e);
      homeBalloonsPhysics.update(e);
      if (this.lockedIndex > -1) {
        let t = this.balloonList[this.lockedIndex];
        t.mesh.position.set(0, 0, 3);
        if (t.meshBack) {
          t.meshBack.position.copy(t.mesh.position);
        }
        t.mesh.rotation.set(properties.time, properties.time * 1.5, 0);
      }
      this.updateTransformations();
      this.updateColor();
      this.updateUniforms();
      this.updateSorting();
      this.updateRenderOrder();
      this.prePassMeshList.sort(this._sortMeshDist2);
      for (let t = 0; t < this.prePassMeshList.length; t++) {
        let r = this.prePassMeshList[t];
        r.position.copy(r._mesh.position);
        r.rotation.copy(r._mesh.rotation);
        r.renderOrder = -500 + t;
      }
    }
  }
}
const homeBalloons = new HomeBalloons();
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
      t.isActive = false;
    }
  }
  syncProperties(e) {
    this.currentStage3D = this.defaultStage3D;
    for (let t = 0; t < this.stage3DList.length; t++) {
      let r = this.stage3DList[t];
      if (r.isActive === true) {
        this.currentStage3D = r;
        r.syncProperties(e);
        for (let n in r.properties) {
          properties[n] = r.properties[n];
        }
      } else {
        r.isActive = false;
      }
    }
  }
  update(e) {
    this.currentStage3D.update(e);
    this.currentStage3D.visible = true;
    for (let t = 0; t < this.stage3DList.length; t++) {
      let r = this.stage3DList[t];
      r.wasActive = r.isActive;
    }
  }
}
const visuals = new Visuals();
const frameVert = `#define GLSLIFY 1
attribute vec3 position;varying vec2 v_uv;uniform vec2 u_viewportResolution;uniform vec2 u_domXY;uniform vec2 u_domWH;void main(){v_uv=position.xy*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,1.0);}`;
const frameFrag = `#define GLSLIFY 1
uniform vec3 u_bgColor;uniform vec2 u_aspect;uniform vec2 u_domWH;uniform float u_globalRadius;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){float mask=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius,1.0);gl_FragColor.rgb=u_bgColor;gl_FragColor.a=mask;}`;
(function () {
  function o() {
    for (var r = arguments.length, n = 0; n < r; n++) {
      var a = n < 0 || arguments.length <= n ? undefined : arguments[n];
      if (a.nodeType === 1 || a.nodeType === 11) {
        this.appendChild(a);
      } else {
        this.appendChild(document.createTextNode(String(a)));
      }
    }
  }
  function e() {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }
    if (arguments.length) {
      this.append.apply(this, arguments);
    }
  }
  function t() {
    var r = this.parentNode;
    for (var n = arguments.length, a = new Array(n), l = 0; l < n; l++) {
      a[l] = arguments[l];
    }
    var c = a.length;
    if (r) {
      for (c || r.removeChild(this); c--;) {
        var u = a[c];
        if (typeof u != "object") {
          u = this.ownerDocument.createTextNode(u);
        } else if (u.parentNode) {
          u.parentNode.removeChild(u);
        }
        if (c) {
          r.insertBefore(this.previousSibling, u);
        } else {
          r.replaceChild(u, this);
        }
      }
    }
  }
  if (typeof Element !== "undefined") {
    if (!Element.prototype.append) {
      Element.prototype.append = o;
      DocumentFragment.prototype.append = o;
    }
    if (!Element.prototype.replaceChildren) {
      Element.prototype.replaceChildren = e;
      DocumentFragment.prototype.replaceChildren = e;
    }
    if (!Element.prototype.replaceWith) {
      Element.prototype.replaceWith = t;
      DocumentFragment.prototype.replaceWith = t;
    }
  }
})();
function _classCallCheck(o, e) {
  if (!(o instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(o, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || false;
    r.configurable = true;
    if ("value" in r) {
      r.writable = true;
    }
    Object.defineProperty(o, r.key, r);
  }
}
function _createClass(o, e, t) {
  if (e) {
    _defineProperties(o.prototype, e);
  }
  if (t) {
    _defineProperties(o, t);
  }
  return o;
}
function _defineProperty(o, e, t) {
  if (e in o) {
    Object.defineProperty(o, e, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    o[e] = t;
  }
  return o;
}
function ownKeys(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    if (e) {
      r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(o, n).enumerable;
      });
    }
    t.push.apply(t, r);
  }
  return t;
}
function _objectSpread2(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] ?? {};
    if (e % 2) {
      ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(o, r, t[r]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(o, Object.getOwnPropertyDescriptors(t));
    } else {
      ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(o, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
  }
  return o;
}
function _slicedToArray(o, e) {
  return _arrayWithHoles(o) || _iterableToArrayLimit(o, e) || _unsupportedIterableToArray(o, e) || _nonIterableRest();
}
function _toConsumableArray(o) {
  return _arrayWithoutHoles(o) || _iterableToArray(o) || _unsupportedIterableToArray(o) || _nonIterableSpread();
}
function _arrayWithoutHoles(o) {
  if (Array.isArray(o)) {
    return _arrayLikeToArray(o);
  }
}
function _arrayWithHoles(o) {
  if (Array.isArray(o)) {
    return o;
  }
}
function _iterableToArray(o) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(o)) {
    return Array.from(o);
  }
}
function _iterableToArrayLimit(o, e) {
  if (typeof Symbol !== "undefined" && !!(Symbol.iterator in Object(o))) {
    var t = [];
    var r = true;
    var n = false;
    var a = undefined;
    try {
      for (var l = o[Symbol.iterator](), c; !(r = (c = l.next()).done) && (t.push(c.value), !e || t.length !== e); r = true);
    } catch (u) {
      n = true;
      a = u;
    } finally {
      try {
        if (!r && l.return != null) {
          l.return();
        }
      } finally {
        if (n) {
          throw a;
        }
      }
    }
    return t;
  }
}
function _unsupportedIterableToArray(o, e) {
  if (o) {
    if (typeof o == "string") {
      return _arrayLikeToArray(o, e);
    }
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor) {
      t = o.constructor.name;
    }
    if (t === "Map" || t === "Set") {
      return Array.from(o);
    }
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) {
      return _arrayLikeToArray(o, e);
    }
  }
}
function _arrayLikeToArray(o, e) {
  if (e == null || e > o.length) {
    e = o.length;
  }
  for (var t = 0, r = new Array(e); t < e; t++) {
    r[t] = o[t];
  }
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
    var n = Object.getOwnPropertyDescriptor(Object(o), r);
    var a = Object.getOwnPropertyDescriptor(Object(e), r);
    return Object.defineProperty(t, r, a || n);
  }, {});
}
function isString(o) {
  return typeof o == "string";
}
function isArray(o) {
  return Array.isArray(o);
}
function parseSettings(o = {}) {
  var e = extend(o);
  var t;
  if (e.types !== undefined) {
    t = e.types;
  } else if (e.split !== undefined) {
    t = e.split;
  }
  if (t !== undefined) {
    e.types = (isString(t) || isArray(t) ? String(t) : "").split(",").map(function (r) {
      return String(r).trim();
    }).filter(function (r) {
      return /((line)|(word)|(char))/i.test(r);
    });
  }
  if (e.absolute || e.position) {
    e.absolute = e.absolute || /absolute/.test(o.position);
  }
  return e;
}
function parseTypes(o) {
  var e = isString(o) || isArray(o) ? String(o) : "";
  return {
    none: !e,
    lines: /line/i.test(e),
    words: /word/i.test(e),
    chars: /char/i.test(e)
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
  if (isArray(o)) {
    return o;
  } else if (o == null) {
    return [];
  } else if (isArrayLike(o)) {
    return Array.prototype.slice.call(o);
  } else {
    return [o];
  }
}
function getTargetElements(o) {
  var e = o;
  if (isString(o)) {
    if (/^(#[a-z]\w+)$/.test(o.trim())) {
      e = document.getElementById(o.trim().slice(1));
    } else {
      e = document.querySelectorAll(o);
    }
  }
  return toArray(e).reduce(function (t, r) {
    return [].concat(_toConsumableArray(t), _toConsumableArray(toArray(r).filter(isNode$1)));
  }, []);
}
var entries = Object.entries;
var expando = "_splittype";
var cache = {};
var uid = 0;
function set(o, e, t) {
  if (!isObject(o)) {
    console.warn("[data.set] owner is not an object");
    return null;
  }
  var r = o[expando] ||= ++uid;
  var n = cache[r] ||= {};
  if (t === undefined) {
    if (e && Object.getPrototypeOf(e) === Object.prototype) {
      cache[r] = _objectSpread2(_objectSpread2({}, n), e);
    }
  } else if (e !== undefined) {
    n[e] = t;
  }
  return t;
}
function get(o, e) {
  var t = isObject(o) ? o[expando] : null;
  var r = t && cache[t] || {};
  return r;
}
function remove(o) {
  var e = o && o[expando];
  if (e) {
    delete o[e];
    delete cache[e];
  }
}
function clear() {
  Object.keys(cache).forEach(function (o) {
    delete cache[o];
  });
}
function cleanup() {
  entries(cache).forEach(function (o) {
    var e = _slicedToArray(o, 2);
    var t = e[0];
    var r = e[1];
    var n = r.isRoot;
    var a = r.isSplit;
    if (!n || !a) {
      cache[t] = null;
      delete cache[t];
    }
  });
}
function toWords(o, e = " ") {
  var t = o ? String(o) : "";
  return t.trim().replace(/\s+/g, " ").split(e);
}
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
var rsComboSymbolsRange = "\\u20d0-\\u20f0";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = `[${rsAstralRange}]`;
var rsCombo = `[${rsComboMarksRange}${rsComboSymbolsRange}]`;
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = `(?:${rsCombo}|${rsFitz})`;
var rsNonAstral = `[^${rsAstralRange}]`;
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
var reOptMod = `${rsModifier}?`;
var rsOptVar = `[${rsVarRange}]?`;
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = `(?:${[`${rsNonAstral}${rsCombo}?`, rsCombo, rsRegional, rsSurrPair, rsAstral].join("|")}
)`;
var reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, "g");
var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
var reHasUnicode = RegExp(`[${unicodeRange.join("")}]`);
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
  if (hasUnicode(o)) {
    return unicodeToArray(o);
  } else {
    return asciiToArray(o);
  }
}
function toString(o) {
  if (o == null) {
    return "";
  } else {
    return String(o);
  }
}
function toChars(o, e = "") {
  o = toString(o);
  if (o && isString(o) && !e && hasUnicode(o)) {
    return stringToArray(o);
  } else {
    return o.split(e);
  }
}
function createElement(o, e) {
  var t = document.createElement(o);
  if (e) {
    Object.keys(e).forEach(function (r) {
      var n = e[r];
      var a = isString(n) ? n.trim() : n;
      if (a !== null && a !== "") {
        if (r === "children") {
          t.append.apply(t, _toConsumableArray(toArray(a)));
        } else {
          t.setAttribute(r, a);
        }
      }
    });
  }
  return t;
}
var defaults = {
  splitClass: "",
  lineClass: "line",
  wordClass: "word",
  charClass: "char",
  types: ["lines", "words", "chars"],
  absolute: false,
  tagName: "div"
};
function splitWordsAndChars(o, e) {
  e = extend(defaults, e);
  var t = parseTypes(e.types);
  var r = e.tagName;
  var n = o.nodeValue;
  var a = document.createDocumentFragment();
  var l = [];
  var c = [];
  if (/^\s/.test(n)) {
    a.append(" ");
  }
  l = toWords(n).reduce(function (u, f, p, g) {
    var v;
    var _;
    if (t.chars) {
      _ = toChars(f).map(function (T) {
        var M = createElement(r, {
          class: `${e.splitClass} ${e.charClass}`,
          style: "display: inline-block;",
          children: T
        });
        set(M, "isChar", true);
        c = [].concat(_toConsumableArray(c), [M]);
        return M;
      });
    }
    if (t.words || t.lines) {
      v = createElement(r, {
        class: `${e.wordClass} ${e.splitClass}`,
        style: `display: inline-block; ${t.words && e.absolute ? "position: relative;" : ""}`,
        children: t.chars ? _ : f
      });
      set(v, {
        isWord: true,
        isWordStart: true,
        isWordEnd: true
      });
      a.appendChild(v);
    } else {
      _.forEach(function (T) {
        a.appendChild(T);
      });
    }
    if (p < g.length - 1) {
      a.append(" ");
    }
    if (t.words) {
      return u.concat(v);
    } else {
      return u;
    }
  }, []);
  if (/\s$/.test(n)) {
    a.append(" ");
  }
  o.replaceWith(a);
  return {
    words: l,
    chars: c
  };
}
function split(o, e) {
  var t = o.nodeType;
  var r = {
    words: [],
    chars: []
  };
  if (!/(1|3|11)/.test(t)) {
    return r;
  }
  if (t === 3 && /\S/.test(o.nodeValue)) {
    return splitWordsAndChars(o, e);
  }
  var n = toArray(o.childNodes);
  if (n.length && (set(o, "isSplit", true), !get(o).isRoot)) {
    o.style.display = "inline-block";
    o.style.position = "relative";
    var a = o.nextSibling;
    var l = o.previousSibling;
    var c = o.textContent || "";
    var u = a ? a.textContent : " ";
    var f = l ? l.textContent : " ";
    set(o, {
      isWordEnd: /\s$/.test(c) || /^\s/.test(u),
      isWordStart: /^\s/.test(c) || /\s$/.test(f)
    });
  }
  return n.reduce(function (p, g) {
    var v = split(g, e);
    var _ = v.words;
    var T = v.chars;
    return {
      words: [].concat(_toConsumableArray(p.words), _toConsumableArray(_)),
      chars: [].concat(_toConsumableArray(p.chars), _toConsumableArray(T))
    };
  }, r);
}
function getPosition(o, e, t, r) {
  if (!t.absolute) {
    return {
      top: e ? o.offsetTop : null
    };
  }
  var n = o.offsetParent;
  var a = _slicedToArray(r, 2);
  var l = a[0];
  var c = a[1];
  var u = 0;
  var f = 0;
  if (n && n !== document.body) {
    var p = n.getBoundingClientRect();
    u = p.x + l;
    f = p.y + c;
  }
  var g = o.getBoundingClientRect();
  var v = g.width;
  var _ = g.height;
  var T = g.x;
  var M = g.y;
  var S = M + c - f;
  var b = T + l - u;
  return {
    width: v,
    height: _,
    top: S,
    left: b
  };
}
function unSplitWords(o) {
  if (get(o).isWord) {
    remove(o);
    o.replaceWith.apply(o, _toConsumableArray(o.childNodes));
  } else {
    toArray(o.children).forEach(function (e) {
      return unSplitWords(e);
    });
  }
}
var createFragment = function o() {
  return document.createDocumentFragment();
};
function repositionAfterSplit(o, e, t) {
  var r = parseTypes(e.types);
  var n = e.tagName;
  var a = o.getElementsByTagName("*");
  var l = [];
  var c = [];
  var u = null;
  var f;
  var p;
  var g;
  var v = [];
  var _ = o.parentElement;
  var T = o.nextElementSibling;
  var M = createFragment();
  var S = window.getComputedStyle(o);
  var b = S.textAlign;
  var C = parseFloat(S.fontSize);
  var w = C * 0.2;
  if (e.absolute) {
    g = {
      left: o.offsetLeft,
      top: o.offsetTop,
      width: o.offsetWidth
    };
    p = o.offsetWidth;
    f = o.offsetHeight;
    set(o, {
      cssWidth: o.style.width,
      cssHeight: o.style.height
    });
  }
  toArray(a).forEach(function (R) {
    var E = R.parentElement === o;
    var I = getPosition(R, E, e, t);
    var F = I.width;
    var k = I.height;
    var L = I.top;
    var D = I.left;
    if (!/^br$/i.test(R.nodeName)) {
      if (r.lines && E) {
        if (u === null || L - u >= w) {
          u = L;
          l.push(c = []);
        }
        c.push(R);
      }
      if (e.absolute) {
        set(R, {
          top: L,
          left: D,
          width: F,
          height: k
        });
      }
    }
  });
  if (_) {
    _.removeChild(o);
  }
  if (r.lines) {
    v = l.map(function (R) {
      var E = createElement(n, {
        class: `${e.splitClass} ${e.lineClass}`,
        style: `display: block; text-align: ${b}; width: 100%;`
      });
      set(E, "isLine", true);
      var I = {
        height: 0,
        top: 10000
      };
      M.appendChild(E);
      R.forEach(function (F, k, L) {
        var D = get(F);
        var ne = D.isWordEnd;
        var re = D.top;
        var ce = D.height;
        var z = L[k + 1];
        I.height = Math.max(I.height, ce);
        I.top = Math.min(I.top, re);
        E.appendChild(F);
        if (ne && get(z).isWordStart) {
          E.append(" ");
        }
      });
      if (e.absolute) {
        set(E, {
          height: I.height,
          top: I.top
        });
      }
      return E;
    });
    if (!r.words) {
      unSplitWords(M);
    }
    o.replaceChildren(M);
  }
  if (e.absolute) {
    o.style.width = `${o.style.width || p}px`;
    o.style.height = `${f}px`;
    toArray(a).forEach(function (R) {
      var E = get(R);
      var I = E.isLine;
      var F = E.top;
      var k = E.left;
      var L = E.width;
      var D = E.height;
      var ne = get(R.parentElement);
      var re = !I && ne.isLine;
      R.style.top = `${re ? F - ne.top : F}px`;
      R.style.left = I ? `${g.left}px` : `${k - (re ? g.left : 0)}px`;
      R.style.height = `${D}px`;
      R.style.width = I ? `${g.width}px` : `${L}px`;
      R.style.position = "absolute";
    });
  }
  if (_) {
    if (T) {
      _.insertBefore(o, T);
    } else {
      _.appendChild(o);
    }
  }
  return v;
}
var _defaults = extend(defaults, {});
var SplitType = function () {
  _createClass(o, null, [{
    key: "clearData",
    value: function () {
      clear();
    }
  }, {
    key: "setDefaults",
    value: function (t) {
      _defaults = extend(_defaults, parseSettings(t));
      return defaults;
    }
  }, {
    key: "revert",
    value: function (t) {
      getTargetElements(t).forEach(function (r) {
        var n = get(r);
        var a = n.isSplit;
        var l = n.html;
        var c = n.cssWidth;
        var u = n.cssHeight;
        if (a) {
          r.innerHTML = l;
          r.style.width = c || "";
          r.style.height = u || "";
          remove(r);
        }
      });
    }
  }, {
    key: "create",
    value: function (t, r) {
      return new o(t, r);
    }
  }, {
    key: "data",
    get: function () {
      return cache;
    }
  }, {
    key: "defaults",
    get: function () {
      return _defaults;
    },
    set: function (t) {
      _defaults = extend(_defaults, parseSettings(t));
    }
  }]);
  function o(e, t) {
    _classCallCheck(this, o);
    this.isSplit = false;
    this.settings = extend(_defaults, parseSettings(t));
    this.elements = getTargetElements(e);
    this.split();
  }
  _createClass(o, [{
    key: "split",
    value: function (t) {
      var r = this;
      this.revert();
      this.elements.forEach(function (l) {
        set(l, "html", l.innerHTML);
      });
      this.lines = [];
      this.words = [];
      this.chars = [];
      var n = [window.pageXOffset, window.pageYOffset];
      if (t !== undefined) {
        this.settings = extend(this.settings, parseSettings(t));
      }
      var a = parseTypes(this.settings.types);
      if (!a.none) {
        this.elements.forEach(function (l) {
          set(l, "isRoot", true);
          var c = split(l, r.settings);
          var u = c.words;
          var f = c.chars;
          r.words = [].concat(_toConsumableArray(r.words), _toConsumableArray(u));
          r.chars = [].concat(_toConsumableArray(r.chars), _toConsumableArray(f));
        });
        this.elements.forEach(function (l) {
          if (a.lines || r.settings.absolute) {
            var c = repositionAfterSplit(l, r.settings, n);
            r.lines = [].concat(_toConsumableArray(r.lines), _toConsumableArray(c));
          }
        });
        this.isSplit = true;
        window.scrollTo(n[0], n[1]);
        cleanup();
      }
    }
  }, {
    key: "revert",
    value: function () {
      if (this.isSplit) {
        this.lines = null;
        this.words = null;
        this.chars = null;
        this.isSplit = false;
      }
      o.revert(this.elements);
    }
  }]);
  return o;
}();
const AUDIO_DATA = {
  ui: [{
    id: "hover_[3]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "click_[2]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "focus_[3]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 0.4
  }, {
    id: "glass_broken",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "page_[2]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }],
  music: [{
    id: "generic",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: false,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_0",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_2",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_3",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "generic_end",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: false,
    isSfx: false,
    volume: 1
  }]
};
class AudioGroup {
  id = "";
  children = [];
  volume = 1;
  init(e) {
    Object.assign(this, e);
  }
  update(e) {
    e *= this.volume;
    this.children.forEach(t => {
      t.setFinalVolume(e);
    });
  }
  add(e) {
    if (!this.children.includes(e)) {
      this.children.push(e);
    }
  }
  remove(e) {
    if (this.children.includes(e)) {
      this.children.splice(this.children.indexOf(e), 1);
    }
  }
  play() {
    this.children.forEach(e => e.play());
  }
  stop() {
    this.children.forEach(e => e.stop());
  }
}
const LOW_PASS_FREQ = 300;
const MAX_FREQ = 22050;
class AudioItem {
  autoplay = false;
  elem = null;
  id = "";
  url = "";
  fileSize = 100;
  isMutable = false;
  isPositional = false;
  isLoopable = false;
  isPreload = true;
  onInitialized = new MinSignal$2();
  onEnded = new MinSignal$2();
  onPlayed = new MinSignal$2();
  volume = 1;
  audioObject = null;
  hasInitialized = false;
  container = null;
  refDistance = 1;
  _buffer = null;
  _originalOnEnd = null;
  needsFilter = false;
  fadeTime = 0;
  fadeDuration = 1;
  isFadingIn = false;
  isFadingOut = false;
  isSfx = false;
  preInit(e) {
    Object.assign(this, e);
    if (this.isPositional) {
      this.container = new Object3D();
    }
  }
  init(e) {
    if (this.hasInitialized !== true) {
      this.hasInitialized = true;
      this.audioObject = this.isPositional ? new PositionalAudio(e) : new Audio$1(e);
      if (this.isPositional) {
        this.container.add(this.audioObject);
      }
      this._originalOnEnd = this.audioObject.onEnded.bind(this.audioObject);
      this.audioObject.onEnded = this.onEnd.bind(this);
      if (this.isPositional) {
        this.setRefDistance(this.refDistance);
      }
      if (this.isElem && !this.elem) {
        this.elem = document.createElement("audio");
        if (settings.LOCAL_AUDIO_PATH !== settings.AUDIO_PATH) {
          this.elem.crossOrigin = "anonymous";
        }
        this.elem.src = this.url;
      }
      if (this.needsFilter) {
        const t = this.audioObject.context;
        this.biquadFilter = t.createBiquadFilter();
        this.biquadFilter.type = "lowpass";
        this.biquadFilter.frequency.value = MAX_FREQ;
        this.audioObject.setFilter(this.biquadFilter);
      }
      if (this.elem) {
        this.elem.loop = this.isLoopable;
        this.audioObject.setMediaElementSource(this.elem);
        this.elem.addEventListener("ended", this.onEnd.bind(this));
        if (this.autoplay) {
          this.play();
        }
      } else {
        this.audioObject.setLoop(this.isLoopable);
        if (this._buffer) {
          this.decodeAudioData();
        }
      }
      this.onInitialized.dispatch(this);
    }
  }
  load(e) {
    if (this.elem) {
      this.elem.src = this.url;
    } else {
      const t = this.isPreload ? "add" : "load";
      properties.loader[t](this.url, {
        weight: this.fileSize,
        type: "xhr",
        responseType: "arraybuffer",
        hasLoading: true,
        onLoad: r => {
          this._buffer = r;
          if (this.hasInitialized) {
            this.decodeAudioData();
          }
          if (e) {
            e();
          }
        }
      });
    }
  }
  setFinalVolume(e) {
    this.audioObject?.setVolume(e * this.volume);
  }
  activateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(LOW_PASS_FREQ, e.currentTime + 0.5);
    }
  }
  deactivateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(MAX_FREQ, e.currentTime + 0.5);
    }
  }
  setFilterFrequency(e = MAX_FREQ) {
    if (this.needsFilter && this.biquadFilter) {
      this.audioObject.context;
      this.biquadFilter.frequency.value = e;
    }
  }
  setFilterFrequencyViaRatio(e = 1) {
    this.setFilterFrequency(math.fit(e, 0, 1, MAX_FREQ, LOW_PASS_FREQ, ease.expoOut));
  }
  setPositionObjectParent(e) {
    if (this.hasInitialized) {
      if (e) {
        e.add(this.audioObject);
      } else if (this.audioObject.parent) {
        this.audioObject.parent.remove(this.audioObject);
      }
    } else {
      this.positionObjectParent = e;
    }
  }
  decodeAudioData() {
    const e = this._buffer.slice(0);
    AudioContext.getContext().decodeAudioData(e, r => {
      this.audioObject.setBuffer(r);
      if (this.autoplay) {
        this.play();
      }
    });
  }
  onEnd() {
    if (this._originalOnEnd) {
      this._originalOnEnd();
    }
    this.onEnded.dispatch(this);
  }
  play() {
    if (!this.isSfx) {
      this.autoplay = true;
    }
    if (this.audioObject && !this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.play();
        this.elem.currentTime = 0.01;
        this.audioObject.isPlaying = true;
      } else {
        this.audioObject.play();
      }
      this.onPlayed.dispatch(this);
    }
  }
  stop() {
    this.autoplay = false;
    if (this.audioObject && this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.pause();
        this.audioObject.isPlaying = false;
      } else {
        this.audioObject.stop();
      }
      this.onEnded.dispatch(this);
    }
  }
  setRefDistance(e) {
    this.refDistance = e;
    if (this.isPositional && this.audioObject) {
      this.audioObject.setRefDistance(this.refDistance);
    }
  }
  setFadeIn(e = 1) {
    this.fadeTime = 0;
    this.fadeDuration = e;
    this.isFadingIn = true;
    this.isFadingOut = false;
    this.play();
  }
  setFadeOut(e = 1) {
    this.fadeTime = e;
    this.fadeDuration = e;
    this.isFadingIn = false;
    this.isFadingOut = true;
  }
  update(e) {
    if (!this.isFadingOut && !this.isFadingIn) {
      return;
    }
    if (this.isFadingOut) {
      this.fadeTime -= e;
    }
    if (this.isFadingIn) {
      this.fadeTime += e;
    }
    const t = math.saturate(this.fadeTime / this.fadeDuration);
    this.volume = t;
    if (this.isFadingOut && t === 0) {
      this.stop();
      this.isFadingOut = false;
    }
    if (this.isFadingIn && t === 1) {
      this.isFadingIn = false;
    }
  }
}
class GlobalAudios {
  hasInit = false;
  constructor() {}
  init() {
    this.domRightTalkBtn = document.getElementById("header-right-talk-btn");
    this.domRightSoundBtn = document.getElementById("header-right-sound-btn");
    this.domRightMenuBtn = document.getElementById("header-right-menu-btn");
    this.domHeaderProjectBack = document.getElementById("header-center-project-back-btn");
    this.domMenuLabLink = document.getElementById("header-menu-labs");
    this.domEndSectionTitleLink = document.getElementById("end-section-title-link");
    this.domFooterBottomUp = document.getElementById("footer-bottom-up");
    this.domFooterEnquiresLink = document.getElementById("footer-enquires-link");
    this.domFooterBusinessLink = document.getElementById("footer-business-link");
    this.domFooterBottomLabs = document.getElementById("footer-bottom-labs");
    this.domMenuLinks = Array.from(document.querySelectorAll("#header-menu-links .header-menu-link"));
    this.domFooterSocialsLinks = Array.from(document.querySelectorAll(".footer-socials-line-wrapper"));
    audios.addHoverClickEvents(this.domRightTalkBtn);
    audios.addHoverClickEvents(this.domRightSoundBtn);
    audios.addHoverClickEvents(this.domRightMenuBtn);
    audios.addHoverClickEvents(this.domHeaderProjectBack);
    audios.addHoverClickEvents(this.domMenuLabLink);
    audios.addHoverClickEvents(this.domEndSectionTitleLink);
    audios.addHoverClickEvents(this.domFooterBottomUp);
    audios.addHoverClickEvents(this.domFooterEnquiresLink);
    audios.addHoverClickEvents(this.domFooterBusinessLink);
    audios.addHoverClickEvents(this.domFooterBottomLabs);
    this.domMenuLinks.forEach(e => audios.addHoverClickEvents(e));
    this.domFooterSocialsLinks.forEach(e => audios.addHoverClickEvents(e));
    this.hasInit = true;
  }
  update() {}
}
const globalAudios = new GlobalAudios();
let SKIP_AUDIO = !settings.USE_AUDIO;
class Audios {
  groups = {};
  items = {};
  isActive = true;
  volume = 0;
  listener = null;
  _boundOnBodyClick = null;
  _onBodyClicked = new MinSignal$2();
  _onRolloverCount = -1;
  _onClickCount = -1;
  _onFocusCount = -1;
  prevBgMusicId = null;
  currBgMusicId = null;
  wasActive = false;
  _counts = {};
  _maxes = {};
  preInit() {
    if (!SKIP_AUDIO) {
      this._boundOnBodyClick = () => this._onBodyClick();
      input.onDowned.add(this._boundOnBodyClick);
      for (let e in AUDIO_DATA) {
        let t = new AudioGroup();
        let r = AUDIO_DATA[e];
        t.init({
          id: e,
          volume: 1
        });
        this.groups[e] = t;
        let n = r.length;
        while (n--) {
          let a = r[n];
          let l = this._parseCountText(a.id);
          let c = l.text;
          if (l.count > 0) {
            for (let u = 1; u < l.count; u++) {
              let f = Object.assign({}, a);
              f.id = l.text + "_" + u;
              r.push(f);
            }
            this._counts[c] = -1;
            this._maxes[c] = l.count;
            a.id = l.text + "_0";
          }
        }
        r.forEach(a => {
          let l = new AudioItem();
          let c = a.id;
          let u = c + a.ext;
          a.url = settings.AUDIO_PATH + u;
          l.preInit(a);
          l.load(() => {});
          this.items[c] = l;
          this.groups[e].add(l);
        });
      }
    }
  }
  _parseCountText(e) {
    let t = 0;
    e.replace(/(.+)_\[(\d)\]/, (r, n, a, l) => {
      e = n;
      t = parseInt(a, 10);
    });
    return {
      text: e,
      count: t
    };
  }
  init() {
    if (!SKIP_AUDIO) {
      this.getListener(e => {
        for (let t in this.items) {
          this.items[t].init(e);
        }
      });
      globalAudios.init();
    }
  }
  on() {
    this.isActive = true;
  }
  off() {
    this.isActive = false;
  }
  toggle() {
    this.isActive = !this.isActive;
  }
  pause() {
    this.wasActive = this.isActive;
  }
  resume() {}
  getListener(e) {
    if (!SKIP_AUDIO) {
      if (this.listener) {
        e(this.listener);
      } else {
        this._onBodyClicked.add(e);
      }
    }
  }
  _onBodyClick() {
    if (!SKIP_AUDIO) {
      input.onDowned.remove(this._boundOnBodyClick);
      this.listener = new AudioListener();
      this._onBodyClicked.dispatch(this.listener);
      properties.camera.add(this.listener);
    }
  }
  addHoverClickEvents(e) {
    if (!SKIP_AUDIO) {
      this.addHoverEvent(e);
      this.addClickEvent(e);
    }
  }
  addHoverEvent(e, t = "hover") {
    if (!SKIP_AUDIO) {
      e.addEventListener("mouseenter", () => {
        this.countPlay(t);
      });
    }
  }
  addClickEvent(e, t = "click") {
    if (!SKIP_AUDIO) {
      input.onClicked.add(() => {
        if (input.hasThroughElem(e, t)) {
          this.countPlay(t);
        }
      });
    }
  }
  countPlay(e) {
    if (SKIP_AUDIO) {
      return;
    }
    let t = this._counts[e];
    let r = this._maxes[e];
    t = this._counts[e] = (t + 1) % r;
    this.items[e + "_" + t].play();
  }
  fadeBgMusic(e, t = 1, r = undefined) {
    if (!SKIP_AUDIO) {
      if (this.currBgMusicId !== e) {
        this.prevBgMusicId = this.currBgMusicId;
        this.currBgMusicId = e;
        if (r === undefined) {
          r = t;
        }
        this.items[this.prevBgMusicId]?.setFadeOut(r);
        this.items[this.currBgMusicId]?.setFadeIn(t);
      }
    }
  }
  update(e) {
    if (!SKIP_AUDIO && (globalAudios.update(e), this.listener)) {
      this.volume = math.saturate(this.volume + (this.isActive ? 1 : -1) * e);
      for (let t in this.items) {
        this.items[t].update(e);
      }
      for (let t in this.groups) {
        this.groups[t].update(this.volume);
      }
    }
  }
}
const audios = new Audios();
class HomeHeroSection {
  domContainer;
  domHomeTitle;
  sectionDomRange;
  preInit(e) {
    this.domContainer = e.querySelector("#home-hero");
    this.domVisualContainer = e.querySelector("#home-hero-visual-container");
    this.domHomeTitle = e.querySelector("#home-hero-title");
    this.domHomeScroll = e.querySelector("#home-hero-scroll");
    this.domHomeCrosses = Array.from(e.querySelectorAll(".home-hero-scroll-container-cross"));
    this.domHomeScroll = e.querySelector("#home-hero-scroll");
    this.domHomeScroll._animating = false;
    this.domHomeScroll._time = 0;
    visuals.stage3DList.push(homeBalloons);
    homeBalloons.preInit();
    this.frameMesh = new Mesh(fboHelper.triGeom, fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_viewportResolution: properties.sharedUniforms.u_viewportResolution,
        u_domXY: {
          value: new Vector2()
        },
        u_domWH: {
          value: new Vector2()
        },
        u_bgColor: properties.sharedUniforms.u_bgColor,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }),
      vertexShader: frameVert,
      fragmentShader: frameFrag,
      blending: NormalBlending,
      depthTest: false,
      depthWrite: false,
      derivatives: true,
      transparent: true,
      side: 2
    }));
    this.frameMesh.material.extensions.derivatives = true;
    homePage.preUfxContainer.add(this.frameMesh);
    this.frameMesh.visible = false;
    this.frameMesh.renderOrder = -1000;
  }
  init() {
    input.onClicked.add(() => {
      if (input.hasThroughElem(this.domVisualContainer, "click")) {
        audios.countPlay("click");
        homeBalloons.changeHomeHeroColorSignal.dispatch();
      }
    });
    homeBalloons.init();
  }
  initEvent() {
    window.addEventListener("wheel", this._onWheel.bind(this), {
      once: true
    });
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer);
    let n = r.isActive;
    homeBalloons.ratio = math.fit(r.ratio, 0, 1, 1, 0) * (n ? 1 : 0);
    let a = new SplitType(this.domHomeTitle, {
      types: "lines, words"
    });
    for (let l = 0; l < a.lines.length; l++) {
      let c = a.lines[l];
      c.style.position = "relative";
      c.style.overflow = "hidden";
    }
    this.domHomeTitle._words = a.words;
    a = new SplitType(this.domHomeScroll, {
      types: "words"
    });
    this.domHomeScroll._words = a.words;
    if (properties.hasInitialized) {
      homeBalloons.resize(properties.width, properties.height);
    }
  }
  _updateUi(e) {
    scrollManager.scrollPixel;
    math.fit(this.sectionDomRange.ratio, 0.3, 0.7, 0, 1, ease.cubcInOut);
    let t = Math.max(0, homePage.time - 1);
    for (let r = 0; r < this.domHomeTitle._words.length; r++) {
      let n = this.domHomeTitle._words[r];
      let a = t - r / 20;
      n.style.transform = `translate3d(0, ${math.fit(a, 0, 1, 1.7, 0, ease.lusion)}em, 0) rotate(${math.fit(a, 0, 0.7, 15, 0, ease.lusion)}deg)`;
    }
    for (let r = 0; r < this.domHomeCrosses.length; r++) {
      let n = this.domHomeCrosses[r];
      let a = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 1, ease.lusion);
      let l = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 180, ease.lusion);
      n.style.transform = `scale(${a}) rotate(${l}deg)`;
    }
    for (let r = 0; r < this.domHomeScroll._words.length; r++) {
      let n = this.domHomeScroll._words[r];
      let a = math.fit(t - 0.23 - r / 10, 0, 0.6, 0.8, 1, ease.lusion);
      let l = math.fit(t - 0.23 - r / 10, 0, 0.6, 0, 1, ease.lusion);
      n.style.opacity = l;
      n.style.transform = `scale(${a})`;
    }
  }
  _onWheel() {
    this.domHomeScroll._animating = true;
  }
  update(e) {
    this.sectionDomRange = scrollManager.getDomRange(this.domContainer);
    let t = this.sectionDomRange.isActive;
    let r = scrollManager.getDomRange(this.domVisualContainer);
    let n = this.frameMesh.material.uniforms;
    n.u_domXY.value.set(r.screenX, r.screenY);
    n.u_domWH.value.set(r.width, r.height);
    homeBalloons.ratio = math.fit(this.sectionDomRange.ratio, 0, 1, 1, 0) * (t ? 1 : 0);
    homeBalloons.isActive = homeBalloons.ratio > 0;
    this.frameMesh.visible = t;
    if (t) {
      homeBalloons.properties.cameraViewportOffsetY = -(r.screenY + r.height * 0.5 - properties.viewportHeight * 0.5);
      let a = r.width / r.height;
      let l = math.fit(a, 2.2, 2 / 3, 18, 30);
      homeBalloons.properties.cameraFov = l;
      homeBalloonsBackground.clipScale.set((r.width + 2) / properties.viewportWidth, (r.height + 2) / properties.viewportHeight);
      homeBalloonsBackground.clipOffset.set(-1 / properties.viewportWidth, (homeBalloons.properties.cameraViewportOffsetY - 1) / properties.viewportHeight);
    }
    if (t && properties.hasStarted) {
      this._updateUi(e, this.sectionDomRange);
    }
  }
  hide() {
    this._reset();
  }
  _reset() {
    this.domHomeScroll._animating = false;
    this.domHomeScroll._time = 0;
    for (let e = 0; e < this.domHomeTitle._words.length; e++) {
      let t = this.domHomeTitle._words[e];
      t.style.transform = "translate3d(0, 100%, 0)";
    }
  }
}
const homeHeroSection = new HomeHeroSection();
window.homeHeroSection = homeHeroSection;
window.homeBalloons = homeBalloons;
window.homeBalloonsPhysics = homeBalloonsPhysics;
window.audios = audios;
const ufxVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos){vec3 basePos=vec3((pos.xy)*u_domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}vec3 getScreenPosition(in vec3 basePos){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(u_domXY.xy,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}vec2 padUv(in vec2 uv){vec2 paddedUv=uv+mix(-u_domPadding.xz,u_domPadding.yw,uv)/u_domWH;paddedUv.y=1.-paddedUv.y;return paddedUv;}`;
const quadVert = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const quadFrag = `#define GLSLIFY 1
uniform sampler2D u_bgTexture;uniform vec2 u_resolution;uniform sampler2D u_texture;varying vec2 v_uv;void main(){vec2 bgUv=gl_FragCoord.xy/u_resolution;vec4 bgColor=texture2D(u_bgTexture,bgUv);float imagePaddingThreshold=max(abs(v_uv.x-.5),abs(v_uv.y-.5));float imageAlpha=smoothstep(0.5,0.5-fwidth(imagePaddingThreshold),imagePaddingThreshold);vec4 image=texture2D(u_texture,v_uv);image.a*=imageAlpha;gl_FragColor.rgb=mix(bgColor.rgb,image.rgb,image.a);gl_FragColor.a=image.a;}`;
ShaderChunk.ufxVert = ufxVert;
new Vector3();
new Vector3();
new Matrix4();
class UfxMesh extends Mesh {
  pivot = new Vector2();
  paddingL = 0;
  paddingR = 0;
  paddingT = 0;
  paddingB = 0;
  refDom;
  requireBg;
  tick = 0;
  _domX = 0;
  _domY = 0;
  _domWidth = 0;
  _domHeight = 0;
  _capturedOffsetX = 0;
  _capturedOffsetY = 0;
  constructor(e = {}) {
    let t = e.geometry || new PlaneGeometry(1, 1, e.segX || 1, e.segY || 1).translate(0.5, 0.5, 0);
    t.computeBoundingBox();
    super(t, e.material);
    this.refDom = e.refDom;
    this.pivot = e.pivot || new Vector2(0.5, 0.5);
    this.matrixAutoUpdate = false;
    this.frustumCulled = false;
    this.requireBg = e.requireBg === true;
    this.paddingL = e.paddingL || 0;
    this.paddingR = e.paddingR || 0;
    this.paddingT = e.paddingT || 0;
    this.paddingB = e.paddingB || 0;
    this._initMaterial(e);
    this.onBeforeRender = this._onBeforeRender.bind(this);
  }
  _onBeforeRender() {
    if (this.requireBg) {
      let e = fboHelper.renderer;
      let t = e.getRenderTarget();
      fboHelper.clearMultisampleRenderTargetState();
      fboHelper.copy(properties.postprocessing.sceneTexture, properties.postprocessing.fromRenderTarget);
      e.setRenderTarget(t);
    }
  }
  _initMaterial(e) {
    if (this.material != e.material) {
      this.material = new ShaderMaterial({
        vertexShader: e.vertexShader || quadVert,
        fragmentShader: e.fragmentShader || quadFrag
      });
      this.material.side = DoubleSide;
      this.material.transparent = true;
    }
    for (let r in e) {
      if (this.material[r] !== undefined) {
        this.material[r] = e[r];
      }
    }
    this.material.extensions.derivatives = true;
    let t = this.material.uniforms;
    if (t) {
      t.u_position = {
        value: this.position
      };
      t.u_quaternion = {
        value: this.quaternion
      };
      t.u_scale = {
        value: this.scale
      };
      t.u_domXY = {
        value: new Vector2()
      };
      t.u_domWH = {
        value: new Vector2()
      };
      t.u_domPivot = {
        value: new Vector2()
      };
      t.u_domPadding = {
        value: new Vector4()
      };
      t.u_bgTexture = properties.postprocessing.sharedUniforms.u_fromTexture;
      t.u_resolution = properties.postprocessing.sharedUniforms.u_resolution;
      t.u_viewportResolution = properties.sharedUniforms.u_viewportResolution;
    }
  }
  syncDom(e = 0, t = 0) {
    if (this.refDom) {
      let r = this.refDom.getBoundingClientRect();
      this.syncRect(r.left, r.top, Math.ceil(r.width), Math.ceil(r.height), e, t);
    } else {
      console.warn("refDom is missing");
    }
  }
  syncRect(e, t, r, n, a = 0, l = 0) {
    this._domX = e;
    this._domY = t;
    this._domWidth = Math.ceil(r);
    this._domHeight = Math.ceil(n);
    this.material.uniforms.u_domWH.value.set(this._domWidth, this._domHeight);
    this._capturedOffsetY = a;
    this._capturedOffsetX = l;
  }
  testViewport(e = 0, t = 0) {
    let r = this._domX - this._capturedOffsetX + t;
    let n = r + this._domWidth;
    let a = this._domY - this._capturedOffsetY + e;
    let l = a + this._domHeight;
    return a < properties.viewportHeight && l > 0 && r < properties.viewportWidth && n > 0;
  }
  update(e = 0, t = 0) {
    let r = this.material.uniforms;
    r.u_domXY.value.set(this._domX - this._capturedOffsetX + t, this._domY - this._capturedOffsetY + e);
    r.u_domPivot.value.set(this._domWidth * this.pivot.x, this._domHeight * this.pivot.y);
    r.u_domPadding.value.set(this.paddingL, this.paddingR, this.paddingT, this.paddingB);
    this.tick++;
  }
}
const videoVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXYFrom;uniform vec2 u_domWHFrom;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;varying float v_deltaRatio;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos,in vec2 domWH){vec3 basePos=vec3((pos.xy)*domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 getScreenPosition(in vec3 basePos,in vec2 domXY){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(domXY,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){float placementWeight=1.-(pow(position.x*position.x,0.75)+pow(1.-position.y,1.5))/2.;v_showRatio=(smoothstep(placementWeight*0.3,0.7+placementWeight*0.3,u_showRatio));vec2 domXY=mix(u_domXYFrom,u_domXY,v_showRatio);vec2 domWH=mix(u_domWHFrom,u_domWH,v_showRatio);domXY.x+=mix(domWH.x,0.,cos(v_showRatio*3.1415926*2.)*0.5+0.5)*0.1;vec3 basePos=getBasePosition(position,domWH);float rot=(smoothstep(0.,1.,v_showRatio)-v_showRatio)*-0.5;vec3 rotBasePos=qrotate(vec4(0.,0.,sin(rot),cos(rot)),basePos);vec3 screenPos=getScreenPosition(rotBasePos,domXY);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=vec2(uv.x,1.-uv.y);v_domWH=domWH;}`;
const videoFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec3 u_color;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_time;uniform vec2 u_radialCenter;uniform float u_showRatio;uniform float u_globalRadius;uniform float u_aspectScale;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*v_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(6.,25.));float imageAlpha=getRoundedCornerMask(v_uv,v_domWH,u_globalRadius,1.0);vec2 baseUv=v_uv;float toRadialCenterDist=length((baseUv-u_radialCenter)*vec2(v_domWH.x/v_domWH.y,1.));baseUv.y=(baseUv.y-.5)*mix(1.,u_aspectScale,v_showRatio)+0.5;vec3 color=texture2D(u_texture,baseUv).rgb;vec3 tintedColor=max(u_color,vec3(dot(color,vec3(0.299,0.587,0.114))));gl_FragColor=vec4(mix(tintedColor,color,v_showRatio),imageAlpha);}`;
const vert$j = `#define GLSLIFY 1
attribute vec3 CP;attribute float Cd;varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_scrollY;uniform vec2 u_viewportResolution;uniform vec2 u_aspect;uniform vec2 u_margin;uniform float u_radius;void main(){vec3 pos=vec3(CP.xy+position.xy*u_radius,0.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_cd=Cd;v_lineRatio=position.z;v_s=CP.z;}`;
const frag$m = `#define GLSLIFY 1
varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_showRatio;uniform float u_hideRatio;uniform vec3 u_colorBg;uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_aoThreshold;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}void main(){float ao=0.9+0.1*v_cd;float aoRatio=linearStep(u_aoThreshold-0.02,u_aoThreshold+0.02,u_showRatio);if(step(u_showRatio,v_lineRatio)>0.5)discard;float mixRatio=1.0-pow(1.0-clamp(v_lineRatio,0.0,1.0),2.0);gl_FragColor.rgb=hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),mixRatio));gl_FragColor.rgb*=min(1.0,ao+1.0-aoRatio);float alpha=abs(v_s-.5);gl_FragColor.a=linearStep(0.5,0.5-fwidth(alpha),alpha);}`;
const lineEndVert = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_mixRatio;uniform float u_ao;vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}varying vec3 v_color;varying vec2 v_uv;void main(){v_color=u_ao*hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),u_mixRatio));v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const lineEndFrag = `#define GLSLIFY 1
varying vec3 v_color;varying vec2 v_uv;void main(){float d=length(v_uv-.5)*2.;gl_FragColor.rgb=v_color;gl_FragColor.a=smoothstep(1.,1.-fwidth(d),d);}`;
const _v0$2 = new Vector3();
const _v1$5 = new Vector3();
const _box = new Box3();
const LINES_DATA_LIST = [{
  fileName: "line_reel",
  aoThreshold: 0.555,
  margin: {
    x: -0.05,
    y: -0.8
  },
  scrollToRatioFactors: [0.4, 1.3],
  boxMin: new Vector3(-0.0112049, -0.0141946, 0),
  boxMax: new Vector3(1.01357, 0.718671, 0),
  color0: "#5a90ff",
  color1: "#2a38ee"
}, {
  fileName: "line_goal",
  aoThreshold: 0.0001,
  margin: {
    x: 0.2,
    y: -0.6
  },
  scrollToRatioFactors: [1.2, 2],
  boxMin: new Vector3(-0.0180006, -0.00963629, 0),
  boxMax: new Vector3(1.01777, 0.850395, 0),
  color0: "#94fffb",
  color1: "#1285dc"
}, {
  fileName: "line_capability",
  aoThreshold: 0.0001,
  margin: {
    x: 0,
    y: -1.15
  },
  scrollToRatioFactors: [0, 2],
  boxMin: new Vector3(-0.0165916, -0.0152524, 0),
  boxMax: new Vector3(1.018, 1.08872, 0),
  color0: "#fff",
  color1: "#bbb"
}, {
  fileName: "line_office",
  aoThreshold: 0.0001,
  margin: {
    x: 0,
    y: -2.2
  },
  boxMin: new Vector3(-0.0131718, -0.0141192, 0),
  boxMax: new Vector3(1.01767, 1.2037, 0),
  scrollToRatioFactors: [-2, 1.85],
  color0: "#fff",
  color1: "#bbb"
}];
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
    this.lineId = e;
    this.lineData = LINES_DATA_LIST[this.lineId];
  }
  preInit() {
    this.container.add(this.innerContainer);
    properties.loader.add(settings.MODEL_PATH + "lines/" + this.lineData.fileName + ".buf", {
      onLoad: e => {
        this.geometry = e;
        if (this.mesh) {
          this.mesh.geometry = e;
        }
        if (!this.lineRatioArray && e.attributes && e.attributes.position) {
          const {
            array: a,
            count: c
          } = e.attributes.position;
          this.lineRatioArray = new Float32Array(c);
          for (let r = 0; r < c; r++) {
            this.lineRatioArray[r] = a[r * 3 + 2];
          }
        }
      }
    });
  }
  init() {
    this.mesh = new Mesh(this.geometry, new ShaderMaterial({
      uniforms: {
        u_showRatio: {
          value: 0
        },
        u_aoThreshold: {
          value: this.lineData.aoThreshold
        },
        u_colorBg: {
          value: new Color()
        },
        u_color0: {
          value: new Color(this.lineData.color0)
        },
        u_color1: {
          value: new Color(this.lineData.color1)
        },
        u_scrollY: {
          value: 0
        },
        u_radius: {
          value: 0
        },
        u_aspect: {
          value: new Vector2()
        },
        u_margin: {
          value: new Vector2(this.lineData.margin.x, this.lineData.margin.y)
        },
        u_viewportResolution: properties.sharedUniforms.u_viewportResolution
      },
      vertexShader: vert$j,
      fragmentShader: frag$m,
      depthTest: false,
      transparent: true
    }));
    this.mesh.frustumCulled = false;
    this.mesh.material.defines.IS_LINE = true;
    this.mesh.material.extensions.derivatives = true;
    this.box = new Box3().setFromObject(this.mesh);
    this.innerContainer.add(this.mesh);
    this.circle = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
      uniforms: {
        u_color0: {
          value: new Color(this.lineData.color0)
        },
        u_color1: {
          value: new Color(this.lineData.color1)
        },
        u_ao: {
          value: 1
        },
        u_mixRatio: {
          value: 0
        }
      },
      vertexShader: lineEndVert,
      fragmentShader: lineEndFrag,
      side: 2,
      depthTest: false,
      transparent: true
    }));
    this.circle.material.extensions.derivatives = true;
    this.circle.frustumCulled = false;
    this.innerContainer.add(this.circle);
    if (this.geometry && this.geometry.attributes && this.geometry.attributes.position) {
      const {
        array: e,
        count: t
      } = this.geometry.attributes.position;
      this.lineRatioArray = new Float32Array(this.geometry.attributes.position.count);
      for (let r = 0; r < t; r++) {
        this.lineRatioArray[r] = e[r * 3 + 2];
      }
    }
  }
  resize(e, t) {
    const r = t / Math.sqrt(e * e + t * t);
    this.mesh.material.uniforms.u_aspect.value.set(e / t * r, r);
  }
  update(e, t, r = 0) {
    let n = this.radius * math.fit(properties.viewportWidth, 540, 1920, 2, 1);
    let a = math.saturate(-(t.screenY - this.lineData.scrollToRatioFactors[0] * properties.viewportHeight) / (this.lineData.scrollToRatioFactors[1] * properties.viewportHeight));
    a = ease.quadInOut(a);
    const l = t.screenY + r;
    let c = properties.viewportWidth / this.mesh.material.uniforms.u_aspect.value.x;
    let u = properties.viewportHeight / this.mesh.material.uniforms.u_aspect.value.y;
    this.mesh.material.uniforms.u_showRatio.value = math.saturate(a);
    this.mesh.material.uniforms.u_scrollY.value = -l;
    this.mesh.material.uniforms.u_colorBg.value.copy(properties.bgColor);
    this.mesh.material.uniforms.u_radius.value = n;
    this.innerContainer.position.x = this.lineData.margin.x * c;
    this.innerContainer.position.y = this.lineData.margin.y * u - l;
    this.innerContainer.scale.x = c;
    this.innerContainer.scale.y = u;
    this.container.visible = false;
    if (this.container.parent) {
      this.container.parent.updateMatrixWorld(true);
      _box.min.copy(this.lineData.boxMin);
      _box.max.copy(this.lineData.boxMax);
      _box.applyMatrix4(this.innerContainer.matrixWorld);
      this.container.visible = _box.max.y > -properties.viewportHeight && _box.min.y < 0;
    }
    if (!this.geometry || !this.geometry.attributes || !this.geometry.attributes.CP || !this.geometry.attributes.position || !this.lineRatioArray) {
      return;
    }
    const {
      array: f,
      count: p
    } = this.geometry.attributes.CP;
    const {
      array: g
    } = this.geometry.attributes.position;
    let v = 0;
    let _ = 0;
    for (let R = 0; R < p; R++) {
      if (a >= this.lineRatioArray[R]) {
        v = R;
        if (R === p - 1) {
          _ = 0;
        } else {
          _ = (a - this.lineRatioArray[R]) / (this.lineRatioArray[R + 1] - this.lineRatioArray[R]);
        }
      }
    }
    const T = v;
    const M = Math.min(v + 1, p - 1);
    _v0$2.fromArray(f, v * 3);
    _v1$5.fromArray(f, Math.min(p - 1, v + 1) * 3);
    _v0$2.lerp(_v1$5, _);
    const S = this.geometry.attributes.Cd.array;
    let b = math.lerp(S[T], S[M], _);
    b = 0.9 + b * 0.1;
    const C = math.linearStep(this.lineData.aoThreshold - 0.02, this.lineData.aoThreshold + 0.02, a);
    this.circle.position.copy(_v0$2);
    this.circle.scale.set(n, n, 1);
    this.circle.material.uniforms.u_ao.value = Math.min(1, b + 1 - C);
    let w = math.lerp(g[T * 3 + 2], g[M * 3 + 2], _);
    w = 1 - Math.pow(1 - math.clamp(w, 0, 1), 2);
    this.circle.material.uniforms.u_mixRatio.value = w;
  }
}
/*! @vimeo/player v2.30.4 | (c) 2026 Vimeo | MIT License | https://github.com/vimeo/player.js */
const isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
const isBun = typeof Bun !== "undefined";
const isDeno = typeof Deno !== "undefined";
const isCloudflareWorker = typeof WebSocketPair == "function" && typeof caches?.default !== "undefined";
const isServerRuntime = isNode || isBun || isDeno || isCloudflareWorker;
function getMethodName(o, e) {
  if (o.indexOf(e.toLowerCase()) === 0) {
    return o;
  } else {
    return `${e.toLowerCase()}${o.substr(0, 1).toUpperCase()}${o.substr(1)}`;
  }
}
function isDomElement(o) {
  return !!o && o.nodeType === 1 && !!("nodeName" in o) && !!o.ownerDocument && !!o.ownerDocument.defaultView;
}
function isInteger(o) {
  return !isNaN(parseFloat(o)) && isFinite(o) && Math.floor(o) == o;
}
function isVimeoUrl(o) {
  return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))(?=$|\/)/.test(o);
}
function isVimeoEmbed(o) {
  return /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))\/video\/\d+/.test(o);
}
function getOembedDomain(o) {
  const e = (o || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/);
  const t = (e && e[1] || "").replace("player.", "");
  const r = [".videoji.hk", ".vimeo.work", ".videoji.cn"];
  for (const n of r) {
    if (t.endsWith(n)) {
      return t;
    }
  }
  return "vimeo.com";
}
function getVimeoUrl(o = {}) {
  const e = o.id;
  const t = o.url;
  const r = e || t;
  if (!r) {
    throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
  }
  if (isInteger(r)) {
    return `https://vimeo.com/${r}`;
  }
  if (isVimeoUrl(r)) {
    return r.replace("http:", "https:");
  }
  throw e ? new TypeError(`“${e}” is not a valid video id.`) : new TypeError(`“${r}” is not a vimeo.com url.`);
}
const subscribe = function (o, e, t, r = "addEventListener", n = "removeEventListener") {
  const a = typeof e == "string" ? [e] : e;
  a.forEach(l => {
    o[r](l, t);
  });
  return {
    cancel: () => a.forEach(l => o[n](l, t))
  };
};
function findIframeBySourceWindow(o, e = document) {
  if (!o || !e || typeof e.querySelectorAll != "function") {
    return null;
  }
  const t = e.querySelectorAll("iframe");
  for (let r = 0; r < t.length; r++) {
    if (t[r] && t[r].contentWindow === o) {
      return t[r];
    }
  }
  return null;
}
const arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
const postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
if (!isServerRuntime && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(o, e) {
  e = {
    exports: {}
  };
  o(e, e.exports);
  return e.exports;
}
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (o) {
  if (o.WeakMap) {
    return;
  }
  var e = Object.prototype.hasOwnProperty;
  var t = Object.defineProperty && function () {
    try {
      return Object.defineProperty({}, "x", {
        value: 1
      }).x === 1;
    } catch {}
  }();
  function r(a, l, c) {
    if (t) {
      Object.defineProperty(a, l, {
        configurable: true,
        writable: true,
        value: c
      });
    } else {
      a[l] = c;
    }
  }
  o.WeakMap = function () {
    function a() {
      if (this === undefined) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }
      r(this, "_id", c("_WeakMap"));
      if (arguments.length > 0) {
        throw new TypeError("WeakMap iterable is not supported");
      }
    }
    r(a.prototype, "delete", function (f) {
      l(this, "delete");
      if (!n(f)) {
        return false;
      }
      var p = f[this._id];
      if (p && p[0] === f) {
        delete f[this._id];
        return true;
      } else {
        return false;
      }
    });
    r(a.prototype, "get", function (f) {
      l(this, "get");
      if (n(f)) {
        var p = f[this._id];
        if (p && p[0] === f) {
          return p[1];
        }
      }
    });
    r(a.prototype, "has", function (f) {
      l(this, "has");
      if (!n(f)) {
        return false;
      }
      var p = f[this._id];
      return !!p && p[0] === f;
    });
    r(a.prototype, "set", function (f, p) {
      l(this, "set");
      if (!n(f)) {
        throw new TypeError("Invalid value used as weak map key");
      }
      var g = f[this._id];
      if (g && g[0] === f) {
        g[1] = p;
        return this;
      } else {
        r(f, this._id, [f, p]);
        return this;
      }
    });
    function l(f, p) {
      if (!n(f) || !e.call(f, "_id")) {
        throw new TypeError(p + " method called on incompatible receiver " + typeof f);
      }
    }
    function c(f) {
      return f + "_" + u() + "." + u();
    }
    function u() {
      return Math.random().toString().substring(2);
    }
    r(a, "_polyfill", true);
    return a;
  }();
  function n(a) {
    return Object(a) === a;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : commonjsGlobal);
var npo_src = createCommonjsModule(function (o) {
  /*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
  */
  (function (t, r, n) {
    r[t] = r[t] || n();
    o.exports &&= r[t];
  })("Promise", commonjsGlobal, function () {
    var t;
    var r;
    var n;
    var a = Object.prototype.toString;
    var l = typeof setImmediate !== "undefined" ? function (w) {
      return setImmediate(w);
    } : setTimeout;
    try {
      Object.defineProperty({}, "x", {});
      t = function (w, R, E, I) {
        return Object.defineProperty(w, R, {
          value: E,
          writable: true,
          configurable: I !== false
        });
      };
    } catch {
      t = function (R, E, I) {
        R[E] = I;
        return R;
      };
    }
    n = function () {
      var w;
      var R;
      var E;
      function I(F, k) {
        this.fn = F;
        this.self = k;
        this.next = undefined;
      }
      return {
        add: function (k, L) {
          E = new I(k, L);
          if (R) {
            R.next = E;
          } else {
            w = E;
          }
          R = E;
          E = undefined;
        },
        drain: function () {
          var k = w;
          for (w = R = r = undefined; k;) {
            k.fn.call(k.self);
            k = k.next;
          }
        }
      };
    }();
    function c(C, w) {
      n.add(C, w);
      r ||= l(n.drain);
    }
    function u(C) {
      var w;
      var R = typeof C;
      if (C != null && (R == "object" || R == "function")) {
        w = C.then;
      }
      if (typeof w == "function") {
        return w;
      } else {
        return false;
      }
    }
    function f() {
      for (var C = 0; C < this.chain.length; C++) {
        p(this, this.state === 1 ? this.chain[C].success : this.chain[C].failure, this.chain[C]);
      }
      this.chain.length = 0;
    }
    function p(C, w, R) {
      var E;
      var I;
      try {
        if (w === false) {
          R.reject(C.msg);
        } else {
          if (w === true) {
            E = C.msg;
          } else {
            E = w.call(undefined, C.msg);
          }
          if (E === R.promise) {
            R.reject(TypeError("Promise-chain cycle"));
          } else if (I = u(E)) {
            I.call(E, R.resolve, R.reject);
          } else {
            R.resolve(E);
          }
        }
      } catch (F) {
        R.reject(F);
      }
    }
    function g(C) {
      var w;
      var R = this;
      if (!R.triggered) {
        R.triggered = true;
        if (R.def) {
          R = R.def;
        }
        try {
          if (w = u(C)) {
            c(function () {
              var E = new T(R);
              try {
                w.call(C, function () {
                  g.apply(E, arguments);
                }, function () {
                  v.apply(E, arguments);
                });
              } catch (I) {
                v.call(E, I);
              }
            });
          } else {
            R.msg = C;
            R.state = 1;
            if (R.chain.length > 0) {
              c(f, R);
            }
          }
        } catch (E) {
          v.call(new T(R), E);
        }
      }
    }
    function v(C) {
      var w = this;
      if (!w.triggered) {
        w.triggered = true;
        if (w.def) {
          w = w.def;
        }
        w.msg = C;
        w.state = 2;
        if (w.chain.length > 0) {
          c(f, w);
        }
      }
    }
    function _(C, w, R, E) {
      for (var I = 0; I < w.length; I++) {
        (function (k) {
          C.resolve(w[k]).then(function (D) {
            R(k, D);
          }, E);
        })(I);
      }
    }
    function T(C) {
      this.def = C;
      this.triggered = false;
    }
    function M(C) {
      this.promise = C;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = undefined;
    }
    function S(C) {
      if (typeof C != "function") {
        throw TypeError("Not a function");
      }
      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      }
      this.__NPO__ = 1;
      var w = new M(this);
      this.then = function (E, I) {
        var F = {
          success: typeof E == "function" ? E : true,
          failure: typeof I == "function" ? I : false
        };
        F.promise = new this.constructor(function (L, D) {
          if (typeof L != "function" || typeof D != "function") {
            throw TypeError("Not a function");
          }
          F.resolve = L;
          F.reject = D;
        });
        w.chain.push(F);
        if (w.state !== 0) {
          c(f, w);
        }
        return F.promise;
      };
      this.catch = function (E) {
        return this.then(undefined, E);
      };
      try {
        C.call(undefined, function (E) {
          g.call(w, E);
        }, function (E) {
          v.call(w, E);
        });
      } catch (R) {
        v.call(w, R);
      }
    }
    var b = t({}, "constructor", S, false);
    S.prototype = b;
    t(b, "__NPO__", 0, false);
    t(S, "resolve", function (w) {
      var R = this;
      if (w && typeof w == "object" && w.__NPO__ === 1) {
        return w;
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          I(w);
        });
      }
    });
    t(S, "reject", function (w) {
      return new this(function (E, I) {
        if (typeof E != "function" || typeof I != "function") {
          throw TypeError("Not a function");
        }
        I(w);
      });
    });
    t(S, "all", function (w) {
      var R = this;
      if (a.call(w) != "[object Array]") {
        return R.reject(TypeError("Not an array"));
      } else if (w.length === 0) {
        return R.resolve([]);
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          var k = w.length;
          var L = Array(k);
          var D = 0;
          _(R, w, function (re, ce) {
            L[re] = ce;
            if (++D === k) {
              I(L);
            }
          }, F);
        });
      }
    });
    t(S, "race", function (w) {
      var R = this;
      if (a.call(w) != "[object Array]") {
        return R.reject(TypeError("Not an array"));
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          _(R, w, function (L, D) {
            I(D);
          }, F);
        });
      }
    });
    return S;
  });
});
const callbackMap = new WeakMap();
function storeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  if (!(e in r)) {
    r[e] = [];
  }
  r[e].push(t);
  callbackMap.set(o.element, r);
}
function getCallbacks(o, e) {
  return (callbackMap.get(o.element) || {})[e] || [];
}
function removeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  if (!r[e]) {
    return true;
  }
  if (!t) {
    r[e] = [];
    callbackMap.set(o.element, r);
    return true;
  }
  const n = r[e].indexOf(t);
  if (n !== -1) {
    r[e].splice(n, 1);
  }
  callbackMap.set(o.element, r);
  return r[e] && r[e].length === 0;
}
function shiftCallbacks(o, e) {
  const t = getCallbacks(o, e);
  if (t.length < 1) {
    return false;
  }
  const r = t.shift();
  removeCallback(o, e, r);
  return r;
}
function swapCallbacks(o, e) {
  const t = callbackMap.get(o);
  callbackMap.set(e, t);
  callbackMap.delete(o);
}
function parseMessageData(o) {
  if (typeof o == "string") {
    try {
      o = JSON.parse(o);
    } catch (e) {
      console.warn(e);
      return {};
    }
  }
  return o;
}
function postMessage(o, e, t) {
  if (!o.element.contentWindow || !o.element.contentWindow.postMessage) {
    return;
  }
  let r = {
    method: e
  };
  if (t !== undefined) {
    r.value = t;
  }
  const n = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
  if (n >= 8 && n < 10) {
    r = JSON.stringify(r);
  }
  o.element.contentWindow.postMessage(r, o.origin);
}
function processData(o, e) {
  e = parseMessageData(e);
  let t = [];
  let r;
  if (e.event) {
    if (e.event === "error") {
      getCallbacks(o, e.data.method).forEach(a => {
        const l = new Error(e.data.message);
        l.name = e.data.name;
        a.reject(l);
        removeCallback(o, e.data.method, a);
      });
    }
    t = getCallbacks(o, `event:${e.event}`);
    r = e.data;
  } else if (e.method) {
    const n = shiftCallbacks(o, e.method);
    if (n) {
      t.push(n);
      r = e.value;
    }
  }
  t.forEach(n => {
    try {
      if (typeof n == "function") {
        n.call(o, r);
        return;
      }
      n.resolve(r);
    } catch {}
  });
}
const oEmbedParameters = ["airplay", "audio_tracks", "audiotrack", "autopause", "autoplay", "background", "byline", "cc", "chapter_id", "chapters", "chromecast", "color", "colors", "controls", "disable_context_menu", "dnt", "end_time", "fullscreen", "height", "id", "initial_quality", "interactive_params", "keyboard", "loop", "maxheight", "max_quality", "maxwidth", "min_quality", "muted", "play_button_position", "playsinline", "portrait", "preload", "progress_bar", "quality", "quality_selector", "responsive", "skipping_forward", "speed", "start_time", "texttrack", "thumbnail_id", "title", "transcript", "transparent", "unmute_button", "url", "vimeo_logo", "volume", "watch_full_video", "width"];
function getOEmbedParameters(o, e = {}) {
  return oEmbedParameters.reduce((t, r) => {
    const n = o.getAttribute(`data-vimeo-${r}`);
    if (n || n === "") {
      t[r] = n === "" ? 1 : n;
    }
    return t;
  }, e);
}
function createEmbed(o, e) {
  let {
    html: t
  } = o;
  if (!e) {
    throw new TypeError("An element must be provided");
  }
  if (e.getAttribute("data-vimeo-initialized") !== null) {
    return e.querySelector("iframe");
  }
  const r = document.createElement("div");
  r.innerHTML = t;
  e.appendChild(r.firstChild);
  e.setAttribute("data-vimeo-initialized", "true");
  return e.querySelector("iframe");
}
function getOEmbedData(o, e = {}, t) {
  return new Promise((r, n) => {
    if (!isVimeoUrl(o)) {
      throw new TypeError(`“${o}” is not a vimeo.com url.`);
    }
    let l = `https://${getOembedDomain(o)}/api/oembed.json?url=${encodeURIComponent(o)}`;
    for (const u in e) {
      if (e.hasOwnProperty(u)) {
        l += `&${u}=${encodeURIComponent(e[u])}`;
      }
    }
    const c = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    c.open("GET", l, true);
    c.onload = function () {
      if (c.status === 404) {
        n(new Error(`“${o}” was not found.`));
        return;
      }
      if (c.status === 403) {
        n(new Error(`“${o}” is not embeddable.`));
        return;
      }
      try {
        const u = JSON.parse(c.responseText);
        if (u.domain_status_code === 403) {
          createEmbed(u, t);
          n(new Error(`“${o}” is not embeddable.`));
          return;
        }
        r(u);
      } catch (u) {
        n(u);
      }
    };
    c.onerror = function () {
      const u = c.status ? ` (${c.status})` : "";
      n(new Error(`There was an error fetching the embed code from Vimeo${u}.`));
    };
    c.send();
  });
}
function initializeEmbeds(o = document) {
  const e = [].slice.call(o.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
  const t = r => {
    if ("console" in window && console.error) {
      console.error(`There was an error creating an embed: ${r}`);
    }
  };
  e.forEach(r => {
    try {
      if (r.getAttribute("data-vimeo-defer") !== null) {
        return;
      }
      const n = getOEmbedParameters(r);
      const a = getVimeoUrl(n);
      getOEmbedData(a, n, r).then(l => createEmbed(l, r)).catch(t);
    } catch (n) {
      t(n);
    }
  });
}
function resizeEmbeds(o = document) {
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }
  window.VimeoPlayerResizeEmbeds_ = true;
  const e = t => {
    if (!isVimeoUrl(t.origin) || !t.data || t.data.event !== "spacechange") {
      return;
    }
    const r = t.source ? findIframeBySourceWindow(t.source, o) : null;
    if (r) {
      const n = r.parentElement;
      n.style.paddingBottom = `${t.data.data[0].bottom}px`;
    }
  };
  window.addEventListener("message", e);
}
function initAppendVideoMetadata(o = document) {
  if (window.VimeoSeoMetadataAppended) {
    return;
  }
  window.VimeoSeoMetadataAppended = true;
  const e = t => {
    if (!isVimeoUrl(t.origin)) {
      return;
    }
    const r = parseMessageData(t.data);
    if (!r || r.event !== "ready") {
      return;
    }
    const n = t.source ? findIframeBySourceWindow(t.source, o) : null;
    if (n && isVimeoEmbed(n.src)) {
      new Player(n).callMethod("appendVideoMetadata", window.location.href);
    }
  };
  window.addEventListener("message", e);
}
function checkUrlTimeParam(o = document) {
  if (window.VimeoCheckedUrlTimeParam) {
    return;
  }
  window.VimeoCheckedUrlTimeParam = true;
  const e = r => {
    if ("console" in window && console.error) {
      console.error(`There was an error getting video Id: ${r}`);
    }
  };
  const t = r => {
    if (!isVimeoUrl(r.origin)) {
      return;
    }
    const n = parseMessageData(r.data);
    if (!n || n.event !== "ready") {
      return;
    }
    const a = r.source ? findIframeBySourceWindow(r.source, o) : null;
    if (a && isVimeoEmbed(a.src)) {
      const l = new Player(a);
      l.getVideoId().then(c => {
        const u = new RegExp(`[?&]vimeo_t_${c}=([^&#]*)`).exec(window.location.href);
        if (u && u[1]) {
          const f = decodeURI(u[1]);
          l.setCurrentTime(f);
        }
      }).catch(e);
    }
  };
  window.addEventListener("message", t);
}
function updateDRMEmbeds() {
  if (window.VimeoDRMEmbedsUpdated) {
    return;
  }
  window.VimeoDRMEmbedsUpdated = true;
  const o = e => {
    if (!isVimeoUrl(e.origin)) {
      return;
    }
    const t = parseMessageData(e.data);
    if (!t || t.event !== "drminitfailed") {
      return;
    }
    const r = e.source ? findIframeBySourceWindow(e.source) : null;
    if (!r) {
      return;
    }
    const n = r.getAttribute("allow") || "";
    if (!n.includes("encrypted-media")) {
      r.setAttribute("allow", `${n}; encrypted-media`);
      const l = new URL(r.getAttribute("src"));
      l.searchParams.set("forcereload", "drm");
      r.setAttribute("src", l.toString());
      return;
    }
  };
  window.addEventListener("message", o);
}
function initializeScreenfull() {
  const o = function () {
    let r;
    const n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]];
    let a = 0;
    const l = n.length;
    const c = {};
    for (; a < l; a++) {
      r = n[a];
      if (r && r[1] in document) {
        for (a = 0; a < r.length; a++) {
          c[n[0][a]] = r[a];
        }
        return c;
      }
    }
    return false;
  }();
  const e = {
    fullscreenchange: o.fullscreenchange,
    fullscreenerror: o.fullscreenerror
  };
  const t = {
    request(r) {
      return new Promise((n, a) => {
        const l = function () {
          t.off("fullscreenchange", l);
          n();
        };
        t.on("fullscreenchange", l);
        r = r || document.documentElement;
        const c = r[o.requestFullscreen]();
        if (c instanceof Promise) {
          c.then(l).catch(a);
        }
      });
    },
    exit() {
      return new Promise((r, n) => {
        if (!t.isFullscreen) {
          r();
          return;
        }
        const a = function () {
          t.off("fullscreenchange", a);
          r();
        };
        t.on("fullscreenchange", a);
        const l = document[o.exitFullscreen]();
        if (l instanceof Promise) {
          l.then(a).catch(n);
        }
      });
    },
    on(r, n) {
      const a = e[r];
      if (a) {
        document.addEventListener(a, n);
      }
    },
    off(r, n) {
      const a = e[r];
      if (a) {
        document.removeEventListener(a, n);
      }
    }
  };
  Object.defineProperties(t, {
    isFullscreen: {
      get() {
        return !!document[o.fullscreenElement];
      }
    },
    element: {
      enumerable: true,
      get() {
        return document[o.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get() {
        return !!document[o.fullscreenEnabled];
      }
    }
  });
  return t;
}
const defaultOptions = {
  role: "viewer",
  autoPlayMuted: true,
  allowedDrift: 0.3,
  maxAllowedDrift: 1,
  minCheckInterval: 0.1,
  maxRateAdjustment: 0.2,
  maxTimeToCatchUp: 1
};
class TimingSrcConnector extends EventTarget {
  logger;
  constructor(e, t, r = {}, n) {
    super();
    this.logger = n;
    this.init(t, e, {
      ...defaultOptions,
      ...r
    });
  }
  disconnect() {
    this.dispatchEvent(new Event("disconnect"));
  }
  async init(e, t, r) {
    await this.waitForTOReadyState(e, "open");
    if (r.role === "viewer") {
      await this.updatePlayer(e, t, r);
      const n = subscribe(e, "change", () => this.updatePlayer(e, t, r));
      const a = this.maintainPlaybackPosition(e, t, r);
      this.addEventListener("disconnect", () => {
        a.cancel();
        n.cancel();
      });
    } else {
      await this.updateTimingObject(e, t);
      const n = subscribe(t, ["seeked", "play", "pause", "ratechange"], () => this.updateTimingObject(e, t), "on", "off");
      this.addEventListener("disconnect", () => n.cancel());
    }
  }
  async updateTimingObject(e, t) {
    const [r, n, a] = await Promise.all([t.getCurrentTime(), t.getPaused(), t.getPlaybackRate()]);
    e.update({
      position: r,
      velocity: n ? 0 : a
    });
  }
  async updatePlayer(e, t, r) {
    const {
      position: n,
      velocity: a
    } = e.query();
    if (typeof n == "number") {
      t.setCurrentTime(n);
    }
    if (typeof a == "number") {
      if (a === 0) {
        if ((await t.getPaused()) === false) {
          t.pause();
        }
      } else if (a > 0) {
        if ((await t.getPaused()) === true) {
          await t.play().catch(async l => {
            if (l.name === "NotAllowedError" && r.autoPlayMuted) {
              await t.setMuted(true);
              await t.play().catch(c => console.error("Couldn't play the video from TimingSrcConnector. Error:", c));
            }
          });
          this.updatePlayer(e, t, r);
        }
        if ((await t.getPlaybackRate()) !== a) {
          t.setPlaybackRate(a);
        }
      }
    }
  }
  maintainPlaybackPosition(e, t, r) {
    const {
      allowedDrift: n,
      maxAllowedDrift: a,
      minCheckInterval: l,
      maxRateAdjustment: c,
      maxTimeToCatchUp: u
    } = r;
    const f = Math.min(u, Math.max(l, a)) * 1000;
    const p = async () => {
      if (e.query().velocity === 0 || (await t.getPaused()) === true) {
        return;
      }
      const v = e.query().position - (await t.getCurrentTime());
      const _ = Math.abs(v);
      this.log(`Drift: ${v}`);
      if (_ > a) {
        await this.adjustSpeed(t, 0);
        t.setCurrentTime(e.query().position);
        this.log("Resync by currentTime");
      } else if (_ > n) {
        const T = _ / u;
        const M = c;
        const S = T < M ? (M - T) / 2 : M;
        await this.adjustSpeed(t, S * Math.sign(v));
        this.log("Resync by playbackRate");
      }
    };
    const g = setInterval(() => p(), f);
    return {
      cancel: () => clearInterval(g)
    };
  }
  log(e) {
    this.logger?.(`TimingSrcConnector: ${e}`);
  }
  speedAdjustment = 0;
  adjustSpeed = async (e, t) => {
    if (this.speedAdjustment === t) {
      return;
    }
    const r = (await e.getPlaybackRate()) - this.speedAdjustment + t;
    this.log(`New playbackRate:  ${r}`);
    await e.setPlaybackRate(r);
    this.speedAdjustment = t;
  };
  waitForTOReadyState(e, t) {
    return new Promise(r => {
      const n = () => {
        if (e.readyState === t) {
          r();
        } else {
          e.addEventListener("readystatechange", n, {
            once: true
          });
        }
      };
      n();
    });
  }
}
const playerMap = new WeakMap();
const readyMap = new WeakMap();
let screenfull = {};
class Player {
  constructor(e, t = {}) {
    if (window.jQuery && e instanceof jQuery) {
      if (e.length > 1 && window.console && console.warn) {
        console.warn("A jQuery object with multiple elements was passed, using the first element.");
      }
      e = e[0];
    }
    if (typeof document !== "undefined" && typeof e == "string") {
      e = document.getElementById(e);
    }
    if (!isDomElement(e)) {
      throw new TypeError("You must pass either a valid element or a valid id.");
    }
    if (e.nodeName !== "IFRAME") {
      const n = e.querySelector("iframe");
      if (n) {
        e = n;
      }
    }
    if (e.nodeName === "IFRAME" && !isVimeoUrl(e.getAttribute("src") || "")) {
      throw new Error("The player element passed isn’t a Vimeo embed.");
    }
    if (playerMap.has(e)) {
      return playerMap.get(e);
    }
    this._window = e.ownerDocument.defaultView;
    this.element = e;
    this.origin = "*";
    const r = new npo_src((n, a) => {
      this._onMessage = l => {
        if (!isVimeoUrl(l.origin) || this.element.contentWindow !== l.source) {
          return;
        }
        if (this.origin === "*") {
          this.origin = l.origin;
        }
        const c = parseMessageData(l.data);
        if (c && c.event === "error" && c.data && c.data.method === "ready") {
          const v = new Error(c.data.message);
          v.name = c.data.name;
          a(v);
          return;
        }
        const p = c && c.event === "ready";
        const g = c && c.method === "ping";
        if (p || g) {
          this.element.setAttribute("data-ready", "true");
          n();
          return;
        }
        processData(this, c);
      };
      this._window.addEventListener("message", this._onMessage);
      if (this.element.nodeName !== "IFRAME") {
        const l = getOEmbedParameters(e, t);
        const c = getVimeoUrl(l);
        getOEmbedData(c, l, e).then(u => {
          const f = createEmbed(u, e);
          this.element = f;
          this._originalElement = e;
          swapCallbacks(e, f);
          playerMap.set(this.element, this);
          return u;
        }).catch(a);
      }
    });
    readyMap.set(this, r);
    playerMap.set(this.element, this);
    if (this.element.nodeName === "IFRAME") {
      postMessage(this, "ping");
    }
    if (screenfull.isEnabled) {
      const n = () => screenfull.exit();
      this.fullscreenchangeHandler = () => {
        if (screenfull.isFullscreen) {
          storeCallback(this, "event:exitFullscreen", n);
        } else {
          removeCallback(this, "event:exitFullscreen", n);
        }
        this.ready().then(() => {
          postMessage(this, "fullscreenchange", screenfull.isFullscreen);
        });
      };
      screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
    }
    return this;
  }
  static isVimeoUrl(e) {
    return isVimeoUrl(e);
  }
  callMethod(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
      r[n - 1] = arguments[n];
    }
    if (e == null) {
      throw new TypeError("You must pass a method name.");
    }
    return new npo_src((a, l) => this.ready().then(() => {
      storeCallback(this, e, {
        resolve: a,
        reject: l
      });
      if (r.length === 0) {
        r = {};
      } else if (r.length === 1) {
        r = r[0];
      }
      postMessage(this, e, r);
    }).catch(l));
  }
  get(e) {
    return new npo_src((t, r) => {
      e = getMethodName(e, "get");
      return this.ready().then(() => {
        storeCallback(this, e, {
          resolve: t,
          reject: r
        });
        postMessage(this, e);
      }).catch(r);
    });
  }
  set(e, t) {
    return new npo_src((r, n) => {
      e = getMethodName(e, "set");
      if (t == null) {
        throw new TypeError("There must be a value to set.");
      }
      return this.ready().then(() => {
        storeCallback(this, e, {
          resolve: r,
          reject: n
        });
        postMessage(this, e, t);
      }).catch(n);
    });
  }
  on(e, t) {
    if (!e) {
      throw new TypeError("You must pass an event name.");
    }
    if (!t) {
      throw new TypeError("You must pass a callback function.");
    }
    if (typeof t != "function") {
      throw new TypeError("The callback must be a function.");
    }
    if (getCallbacks(this, `event:${e}`).length === 0) {
      this.callMethod("addEventListener", e).catch(() => {});
    }
    storeCallback(this, `event:${e}`, t);
  }
  off(e, t) {
    if (!e) {
      throw new TypeError("You must pass an event name.");
    }
    if (t && typeof t != "function") {
      throw new TypeError("The callback must be a function.");
    }
    if (removeCallback(this, `event:${e}`, t)) {
      this.callMethod("removeEventListener", e).catch(n => {});
    }
  }
  loadVideo(e) {
    return this.callMethod("loadVideo", e);
  }
  ready() {
    const e = readyMap.get(this) || new npo_src((t, r) => {
      r(new Error("Unknown player. Probably unloaded."));
    });
    return npo_src.resolve(e);
  }
  addCuePoint(e, t = {}) {
    return this.callMethod("addCuePoint", {
      time: e,
      data: t
    });
  }
  removeCuePoint(e) {
    return this.callMethod("removeCuePoint", e);
  }
  enableTextTrack(e, t = null, r = true) {
    if (!e) {
      throw new TypeError("You must pass a language.");
    }
    return this.callMethod("enableTextTrack", {
      language: e,
      kind: t,
      showing: r
    });
  }
  disableTextTrack() {
    return this.callMethod("disableTextTrack");
  }
  selectAudioTrack(e, t) {
    if (!e) {
      throw new TypeError("You must pass a language.");
    }
    return this.callMethod("selectAudioTrack", {
      language: e,
      kind: t
    });
  }
  selectDefaultAudioTrack() {
    return this.callMethod("selectDefaultAudioTrack");
  }
  pause() {
    return this.callMethod("pause");
  }
  play() {
    return this.callMethod("play");
  }
  requestFullscreen() {
    if (screenfull.isEnabled) {
      return screenfull.request(this.element);
    } else {
      return this.callMethod("requestFullscreen");
    }
  }
  exitFullscreen() {
    if (screenfull.isEnabled) {
      return screenfull.exit();
    } else {
      return this.callMethod("exitFullscreen");
    }
  }
  getFullscreen() {
    if (screenfull.isEnabled) {
      return npo_src.resolve(screenfull.isFullscreen);
    } else {
      return this.get("fullscreen");
    }
  }
  requestPictureInPicture() {
    return this.callMethod("requestPictureInPicture");
  }
  exitPictureInPicture() {
    return this.callMethod("exitPictureInPicture");
  }
  getPictureInPicture() {
    return this.get("pictureInPicture");
  }
  remotePlaybackPrompt() {
    return this.callMethod("remotePlaybackPrompt");
  }
  unload() {
    return this.callMethod("unload");
  }
  destroy() {
    return new npo_src(e => {
      readyMap.delete(this);
      playerMap.delete(this.element);
      if (this._originalElement) {
        playerMap.delete(this._originalElement);
        this._originalElement.removeAttribute("data-vimeo-initialized");
      }
      if (this.element && this.element.nodeName === "IFRAME" && this.element.parentNode) {
        if (this.element.parentNode.parentNode && this._originalElement && this._originalElement !== this.element.parentNode) {
          this.element.parentNode.parentNode.removeChild(this.element.parentNode);
        } else {
          this.element.parentNode.removeChild(this.element);
        }
      }
      if (this.element && this.element.nodeName === "DIV" && this.element.parentNode) {
        this.element.removeAttribute("data-vimeo-initialized");
        const t = this.element.querySelector("iframe");
        if (t && t.parentNode) {
          if (t.parentNode.parentNode && this._originalElement && this._originalElement !== t.parentNode) {
            t.parentNode.parentNode.removeChild(t.parentNode);
          } else {
            t.parentNode.removeChild(t);
          }
        }
      }
      this._window.removeEventListener("message", this._onMessage);
      if (screenfull.isEnabled) {
        screenfull.off("fullscreenchange", this.fullscreenchangeHandler);
      }
      e();
    });
  }
  getAutopause() {
    return this.get("autopause");
  }
  setAutopause(e) {
    return this.set("autopause", e);
  }
  getBuffered() {
    return this.get("buffered");
  }
  getCameraProps() {
    return this.get("cameraProps");
  }
  setCameraProps(e) {
    return this.set("cameraProps", e);
  }
  getChapters() {
    return this.get("chapters");
  }
  getCurrentChapter() {
    return this.get("currentChapter");
  }
  getColor() {
    return this.get("color");
  }
  getColors() {
    return npo_src.all([this.get("colorOne"), this.get("colorTwo"), this.get("colorThree"), this.get("colorFour")]);
  }
  setColor(e) {
    return this.set("color", e);
  }
  setColors(e) {
    if (!Array.isArray(e)) {
      return new npo_src((n, a) => a(new TypeError("Argument must be an array.")));
    }
    const t = new npo_src(n => n(null));
    const r = [e[0] ? this.set("colorOne", e[0]) : t, e[1] ? this.set("colorTwo", e[1]) : t, e[2] ? this.set("colorThree", e[2]) : t, e[3] ? this.set("colorFour", e[3]) : t];
    return npo_src.all(r);
  }
  getCuePoints() {
    return this.get("cuePoints");
  }
  getCurrentTime() {
    return this.get("currentTime");
  }
  setCurrentTime(e) {
    return this.set("currentTime", e);
  }
  getDuration() {
    return this.get("duration");
  }
  getEnded() {
    return this.get("ended");
  }
  getLoop() {
    return this.get("loop");
  }
  setLoop(e) {
    return this.set("loop", e);
  }
  setMuted(e) {
    return this.set("muted", e);
  }
  getMuted() {
    return this.get("muted");
  }
  getPaused() {
    return this.get("paused");
  }
  getPlaybackRate() {
    return this.get("playbackRate");
  }
  setPlaybackRate(e) {
    return this.set("playbackRate", e);
  }
  getPlayed() {
    return this.get("played");
  }
  getQualities() {
    return this.get("qualities");
  }
  getQuality() {
    return this.get("quality");
  }
  setQuality(e) {
    return this.set("quality", e);
  }
  getRemotePlaybackAvailability() {
    return this.get("remotePlaybackAvailability");
  }
  getRemotePlaybackState() {
    return this.get("remotePlaybackState");
  }
  getSeekable() {
    return this.get("seekable");
  }
  getSeeking() {
    return this.get("seeking");
  }
  getTextTracks() {
    return this.get("textTracks");
  }
  getAudioTracks() {
    return this.get("audioTracks");
  }
  getEnabledAudioTrack() {
    return this.get("enabledAudioTrack");
  }
  getDefaultAudioTrack() {
    return this.get("defaultAudioTrack");
  }
  getVideoEmbedCode() {
    return this.get("videoEmbedCode");
  }
  getVideoId() {
    return this.get("videoId");
  }
  getVideoTitle() {
    return this.get("videoTitle");
  }
  getVideoWidth() {
    return this.get("videoWidth");
  }
  getVideoHeight() {
    return this.get("videoHeight");
  }
  getVideoUrl() {
    return this.get("videoUrl");
  }
  getVolume() {
    return this.get("volume");
  }
  setVolume(e) {
    return this.set("volume", e);
  }
  async setTimingSrc(e, t) {
    if (!e) {
      throw new TypeError("A Timing Object must be provided.");
    }
    await this.ready();
    const r = new TimingSrcConnector(this, e, t);
    postMessage(this, "notifyTimingObjectConnect");
    r.addEventListener("disconnect", () => postMessage(this, "notifyTimingObjectDisconnect"));
    return r;
  }
}
if (!isServerRuntime) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
  initAppendVideoMetadata();
  checkUrlTimeParam();
  updateDRMEmbeds();
}
const VIDEO_LIST = {
  MAIN_VIDEO_REEL: 761102167
};
class VideoOverlay {
  domVideoContainer;
  domVideoCursor;
  domVideoCursorSvg;
  isOpened = false;
  openedRatio = 0;
  domVideoCursorDirection = -1;
  domVideoCursorActive = false;
  domVideoCursorActiveRatio = 0;
  domVideoCursorRotateRatio = 0;
  domVideoCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  hoverScaleFactor = 1;
  isVideoMuted = false;
  isControlsHover = false;
  isVideoPlaying = false;
  isVideoReady = false;
  videoPercentageWatched = 0;
  videoDuration = 0;
  videoWidth = 1920;
  videoHeight = 1080;
  hasInitalited = false;
  isProjectPage = false;
  preInit() {
    if (this.hasInitalited) {
      return;
    }
    this.domVideoContainer = document.querySelector("#video-overlay");
    this.domVideoCursor = document.querySelector("#video-overlay-cursor");
    this.domVideoCursorSvg = document.querySelector("#video-overlay-cursor-svg");
    this.domVimeoEntryPoint = document.querySelector("#video-overlay__vimeo-video");
    this.domVideoPlayBtn = document.querySelector("#video-overlay__play-btn");
    this.domVideoMuteBtn = document.querySelector("#video-overlay__mute-btn");
    this.domVideoProgress = document.querySelector("#video-overlay__progress-container");
    this.domVideoProgressActive = document.querySelector("#video-overlay__progress-active");
    this.domMobileCloseButton = document.querySelector("#video-overlay__mobile-close-btn");
    this.domVideoProgress.onmouseenter = () => this.isControlsHover = true;
    this.domVideoProgress.onmouseleave = () => this.isControlsHover = false;
    this.domVideoPlayBtn.onmouseenter = () => this.isControlsHover = true;
    this.domVideoPlayBtn.onmouseleave = () => this.isControlsHover = false;
    this.domVideoMuteBtn.onmouseenter = () => this.isControlsHover = true;
    this.domVideoMuteBtn.onmouseleave = () => this.isControlsHover = false;
    const e = {
      id: VIDEO_LIST.MAIN_VIDEO_REEL,
      width: "100%",
      height: "100%",
      responsive: true,
      title: false,
      controls: false,
      byline: false,
      end_screen: {
        type: "empty"
      }
    };
    this.videoPlayer = new Player("video-overlay__vimeo-video", e);
    this.videoPlayer.element.style.pointerEvents = "none";
    this.videoPlayer.setCurrentTime(0);
    this.videoPlayer.getVideoWidth().then(t => this.videoWidth = t);
    this.videoPlayer.getVideoHeight().then(t => this.videoHeight = t);
    this.videoPlayer.getDuration().then(t => this.videoDuration = t);
    this.videoPlayer.on("ended", function (t) {
      this.close();
    });
    this.domVideoContainer.addEventListener("click", () => {
      if (properties.width > 812) {
        this.close();
      }
    });
    this.domMobileCloseButton.addEventListener("click", () => {
      this.close();
    });
    this.videoPlayer.on("ended", () => {
      this.close();
    });
    this.videoPlayer.on("ended", () => {});
    this.videoPlayer.on("timeupdate", t => {
      this.videoPercentageWatched = t.percent;
      this.domVideoProgressActive.style.width = `${t.percent * 100}%`;
      if (t.percent > 0.996) {
        this.close();
      }
    });
    this.domVideoPlayBtn.onclick = t => {
      t.stopPropagation();
      if (this.isVideoPlaying) {
        this.videoPlayer.pause();
        this.isVideoPlaying = false;
      } else {
        this.videoPlayer.play();
        this.isVideoPlaying = true;
      }
      this.domVideoPlayBtn.innerHTML = this.isVideoPlaying ? "Play" : "Pause";
    };
    this.domVideoMuteBtn.onclick = t => {
      t.stopPropagation();
      if (this.isVideoMuted) {
        this.videoPlayer.setVolume(1);
        this.isVideoMuted = false;
      } else {
        this.videoPlayer.setVolume(0);
        this.isVideoMuted = true;
      }
      this.domVideoMuteBtn.innerHTML = this.isVideoMuted ? "Unmute" : "Mute";
    };
    this.domVideoProgress.onclick = t => {
      t.stopPropagation();
      if (this.domVideoProgressBCR.width === 0) {
        this.domVideoProgressBCR = this.domVideoProgress.getBoundingClientRect();
      }
      const r = (t.clientX - this.domVideoProgressBCR.x) / this.domVideoProgressBCR.width;
      this.videoPlayer.pause();
      this.videoPlayer.setCurrentTime(this.videoDuration * r).then(() => {
        this.videoPlayer.play();
      }).catch(n => {
        this.videoPlayer.play();
      });
    };
    this.hasInitalited = true;
  }
  initAndPlayVideo(e = VIDEO_LIST.MAIN_VIDEO_REEL, t = false) {
    this.isProjectPage = t;
    this.isVideoReady = false;
    this.videoPlayer.loadVideo(e).then(() => {
      this.videoPlayer.setCurrentTime(0);
      this.videoPlayer.getVideoWidth().then(r => this.videoWidth = r);
      this.videoPlayer.getVideoHeight().then(r => this.videoHeight = r);
      this.videoPlayer.getDuration().then(r => this.videoDuration = r);
      this.isVideoReady = true;
      this.open();
    });
  }
  init() {
    this.domVideoContainer.style.opacity = 0;
    this.domVideoContainer.style.display = "none";
  }
  resize() {
    if (!this.hasInitalited) {
      return;
    }
    const e = this.domVideoContainer.style.display;
    this.domVideoContainer.style.display = "block";
    const t = properties.viewportWidth / properties.viewportHeight;
    const r = this.videoWidth / this.videoHeight;
    if (this.isProjectPage) {
      this.domVimeoEntryPoint.classList.add("is-project-view");
      this.domVideoContainer.classList.add("is-project-view");
      this.domVimeoEntryPoint.style.removeProperty("width");
      this.domVimeoEntryPoint.style.removeProperty("height");
      this.domVimeoEntryPoint.style.transform = "translateZ(0)";
      const a = this.domVimeoEntryPoint.getBoundingClientRect().width / r;
      this.domVimeoEntryPoint.style.bottom = this.domVimeoEntryPoint.style.top = (properties.viewportHeight - a) * 0.5 + "px";
      this.videoPlayer.element.style.width = "100%";
      this.videoPlayer.element.style.height = "100%";
    } else {
      this.domVimeoEntryPoint.classList.remove("is-project-view");
      this.domVideoContainer.classList.remove("is-project-view");
      const n = Math.max(1, t / r);
      this.domVimeoEntryPoint.style.width = `${properties.viewportWidth}px`;
      this.domVimeoEntryPoint.style.height = `${properties.viewportHeight}px`;
      this.domVimeoEntryPoint.style.transform = `scale(${n})`;
      this.videoPlayer.element.style.width = `${properties.viewportWidth}px`;
      this.videoPlayer.element.style.height = `${properties.viewportHeight}px`;
    }
    this.domVideoProgressBCR = this.domVideoProgress.getBoundingClientRect();
    this.domVideoContainer.style.display = e;
  }
  update(e) {
    if (!this.hasInitalited || (this.openedRatio = math.saturate(this.openedRatio + (this.isOpened ? e : -e) * 2), this.domVideoContainer.style.opacity = ease.quadInOut(this.openedRatio), this.domVideoContainer.style.display = this.openedRatio > 0 ? "block" : "none", settings.USE_AUDIO && (audios.groups.music.volume = 1 - this.openedRatio), this.needsReset && this.openedRatio === 0 && (this.needsReset = false), this.openedRatio === 0)) {
      return;
    }
    let t = input.easedMouseDynamics.default.value.x;
    let r = input.easedMouseDynamics.default.value.y;
    let n = (t * 0.5 + 0.5) * properties.viewportWidth;
    let a = (0.5 - r * 0.5) * properties.viewportHeight;
    if (properties.useMobileLayout) {
      this.domVideoCursor.style.display = "none";
    } else {
      this.domVideoCursorActiveRatio = math.saturate(this.domVideoCursorActiveRatio + e * 1.5);
      this.domVideoCursorDirection = n > 0 ? 1 : -1;
      this.hoverScaleFactor = math.saturate(this.hoverScaleFactor + e * 4 * (this.isControlsHover ? -1 : 1));
      this.domVideoCursor.style.display = "flex";
      let l = n;
      let c = a;
      let u = math.fit(this.hoverScaleFactor, 0, 1, 0.2, 1) * Math.min(2.5, input.easedMouseDynamics.default.valueVel.length() / 5 + 1) * ease.backOut(this.domVideoCursorActiveRatio) * math.fit(this.openedRatio, 0.5, 1, 0, 1, ease.lusion);
      this.domVideoCursor.style.transform = `translate3d(${l}px, ${c}px,0) translate3d(-50%, -50%, 0) scale(${u})`;
      this.domVideoCursorRotateRatio = math.saturate(this.domVideoCursorRotateRatio + (this.domVideoCursorDirection > 0 ? e * 3 : e * -3));
      this.domVideoCursorExtraRotationMotion.update(e, math.clamp(input.easedMouseDynamics.default.valueVel.y * -this.domVideoCursorDirection, -1, 1));
      let f = ease.backInOut(this.domVideoCursorRotateRatio);
      this.domVideoCursorSvg.style.transform = `scale(${ease.quadInOut(this.hoverScaleFactor)}) rotate(${f * 180 + this.domVideoCursorExtraRotationMotion.value * 75}deg)`;
    }
  }
  open() {
    this.isOpened = true;
    setTimeout(() => {
      this.videoPlayer.play().then(() => {
        this.resize();
        this.isVideoPlaying = true;
      });
    }, 500);
  }
  close() {
    if (this.isVideoReady) {
      this.isOpened = false;
      this.videoPlayer.pause().then(() => {
        this.videoPlayer.setCurrentTime(0).then(() => {});
        this.needsReset = true;
        this.isVideoPlaying = false;
        this.isProjectPage = false;
      });
    }
  }
}
const videoOverlay = new VideoOverlay();
class HomeReelSection {
  domContainer;
  domTitle;
  domTitleLine1;
  domDesc;
  domTopContainer;
  domBottomContainer;
  domTopPlayButton;
  domReelContainer;
  domVideoPlaceholder;
  videoPlaceholderHeight = 0;
  ufxMesh;
  ufxShowRatio = 0;
  ufxMeshRadialCenter = new Vector2(0.5, 0.5);
  isUfxMeshHover = false;
  ROLLUP_ANIMATION_INTERVAL = 2;
  currRollupTime = 0;
  prevRollupTime = 0;
  hoverRatio = 0;
  geometry = null;
  _needsReset = true;
  isVerticalVideo = false;
  showVideoPlaceholderButton = false;
  preInit(e) {
    this.domContainer = e.querySelector("#home-reel");
    this.domTitle = e.querySelector("#home-reel-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitleInner = e.querySelector("#home-reel-title-inner");
    this.domTitleLine1 = e.querySelector("#home-reel-title-line-1");
    this.domContent = e.querySelector("#home-reel-content");
    this.domDescription = e.querySelector("#home-reel-desc");
    this.domDescription._time = 0;
    this.domDescription._animating = false;
    this.domBtn = e.querySelector("#home-reel-cta");
    this.domBtn._ratio = 0;
    this.domBtn._animating = false;
    this.domThumb = e.querySelector("#home-reel-thumb");
    this.domReelContainer = e.querySelector("#home-reel-container");
    this.domReelContainerInner = e.querySelector("#home-reel-container-inner");
    this.domVideoContainer = e.querySelector("#home-reel-video-container");
    this.domVideoContainerDecorationTop = e.querySelector("#home-reel-video-container-top");
    this.domVideoContainerDecorationTop._crosses = Array.from(this.domVideoContainerDecorationTop.querySelectorAll(".home-reel-video-container-cross"));
    this.domVideoContainerDecorationTop._svgWrapper = this.domVideoContainerDecorationTop.querySelector(".home-reel-video-container-svg-wrapper");
    this.domVideoContainerDecorationTop._svgs = Array.from(this.domVideoContainerDecorationTop.querySelectorAll("svg"));
    this.domVideoContainerDecorationTop._animating = false;
    this.domVideoContainerDecorationTop._time = 0;
    this.domVideoContainerDecorationBottom = e.querySelector("#home-reel-video-container-bottom");
    this.domVideoContainerDecorationBottom._crosses = Array.from(this.domVideoContainerDecorationBottom.querySelectorAll(".home-reel-video-container-cross"));
    this.domVideoContainerDecorationBottom._svgWrapper = this.domVideoContainerDecorationBottom.querySelector(".home-reel-video-container-svg-wrapper");
    this.domVideoContainerDecorationBottom._svgs = Array.from(this.domVideoContainerDecorationBottom.querySelectorAll("svg"));
    this.domVideoContainerDecorationBottom._animating = false;
    this.domVideoContainerDecorationBottom._time = 0;
    this.domVideoPlaceholder = e.querySelector("#home-reel-video-placeholder");
    this.domVideoTitle = e.querySelector("#home-reel-video-title");
    this.domVideoTitle._animating = false;
    this.domVideoTitle._time = 0;
    this.domVideoTitle._showAnimating = false;
    this.domVideoTitle._showTime = 0;
    this.domVideoContainerDecoration = e.querySelector("#home-reel-video-container-decoration");
    this.domTopContainer = e.querySelector("#home-reel-decoration-top-container");
    this.domBottomContainer = e.querySelector("#home-reel-decoration-bottom-container");
    this.domVideoButton = e.querySelector("#home-reel-video-watch-btn");
    this.domVideoButton._active = false;
    this.domVideoButton._ratio = 0;
    this.domVideoButton._time = 0;
    this.domVideoButton._hover = false;
    this.domVideoButton._hoverRatio = 0;
    this.domVideoButton._hoverRatio2 = 0;
    this.domVideoButton._hoverRatio3 = 0;
    this.domVideoButton._hoverTime = 0;
    this.isVerticalVideo = properties.viewportWidth <= 560;
    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.playsinline = true;
    this.video.setAttribute("playsinline", "");
    if (settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH) {
      this.video.crossOrigin = "anonymous";
    }
    this.video.src = settings.TEXTURE_PATH + (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4");
    this.video.loop = true;
    this.video.load();
    this.videoTexture = new VideoTexture(this.video);
    this.ufxMeshThumb = new UfxMesh({
      refDom: this.domThumb
    });
    this.ufxMesh = new UfxMesh({
      refDom: this.domReelContainerInner,
      segX: 32,
      segY: 32,
      uniforms: Object.assign({
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
        u_resolution: properties.sharedUniforms.u_resolution,
        u_texture: {
          value: this.videoTexture
        },
        u_radialCenter: {
          value: this.ufxMeshRadialCenter
        },
        u_color: {
          value: new Color(1716219)
        },
        u_showRatio: {
          value: 0
        },
        u_aspectScale: {
          value: 1
        },
        u_time: properties.sharedUniforms.u_time,
        u_domXYFrom: this.ufxMeshThumb.material.uniforms.u_domXY,
        u_domWHFrom: this.ufxMeshThumb.material.uniforms.u_domWH,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }, blueNoise.sharedUniforms),
      vertexShader: videoVert,
      fragmentShader: videoFrag,
      depthTest: false,
      depthWrite: false,
      side: 2
    });
    this.ufxMesh.renderOrder = 1000;
    homePage.preUfxContainer.add(this.ufxMesh);
    videoOverlay.preInit();
    this.lineVisual = new Line(0);
    this.lineVisual.preInit();
    this.domVideoPlaceholder.addEventListener("mouseenter", this._onVideoMeshMouseEnter.bind(this));
    this.domVideoPlaceholder.addEventListener("mouseleave", this._onVideoMeshMouseLeave.bind(this));
    this.domVideoButton.addEventListener("mouseenter", this._onDomVideoButtonMouseenter.bind(this));
    this.domVideoButton.addEventListener("mouseleave", this._onDomVideoButtonMouseleave.bind(this));
    input.onClicked.add(() => {
      if (input.hasThroughElem(this.domVideoButton, "click")) {
        this._onDomVideoButtonClick();
      }
    });
  }
  init() {
    this.lineVisual.init();
    this.lineVisual.mesh.material.transparent = true;
    this.lineVisual.circle.material.transparent = true;
    this.lineVisual.mesh.renderOrder = 200;
    this.lineVisual.circle.renderOrder = 200;
    videoOverlay.init();
    homePage.onHideStarted.add(this._onPageHideStarted.bind(this));
  }
  _onPageHideStarted() {
    if (!this.video.paused) {
      this.video.pause();
    }
    this.domDescription.style.transform = "translate3d(0, 0, 0)";
  }
  resize(e, t) {
    let r = e <= 560;
    this._splitText();
    let n = this.domVideoContainer.getBoundingClientRect().width;
    let a;
    let l = 0;
    let c = 1;
    if (r) {
      a = n / 3 * 4;
    } else {
      let u = document.getElementById("header-container").getBoundingClientRect().bottom;
      let f = properties.viewportHeight - u;
      let p = Math.abs(parseFloat(window.getComputedStyle(this.domVideoContainerDecoration).top) * 3) / 2;
      f -= p * 2;
      a = Math.min(f, n / 2);
      l = -properties.viewportHeight * 0.5 + f * 0.5 + u + p;
      c = a / (n / 1920 * 960);
    }
    this.domVideoContainer.style.height = a + "px";
    this.domVideoContainer.style.marginTop = l + "px";
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
    this.ufxMeshThumb.syncDom(-scrollManager.scrollPixel);
    this.ufxMesh.syncDom(-scrollManager.scrollPixel);
    this.ufxMesh.material.uniforms.u_aspectScale.value = c;
    this.lineVisual.resize(e, t);
    this.domVideoButton._width = parseFloat(getComputedStyle(document.documentElement).fontSize) * 12;
    this.videoPlaceholderHeight = this.domVideoPlaceholder.getBoundingClientRect().height;
    this.domTitleLine1._paddingLeft = Number(getComputedStyle(this.domTitleLine1).paddingLeft.split("px")[0]);
    this.domVideoContainer.style.transform = "translateZ(0)";
    this.domVideoContainerDecorationTop._svgWrapper._width = this.domVideoContainerDecorationTop._svgWrapper.getBoundingClientRect().width;
    if (this.isVerticalVideo !== r) {
      this.isVerticalVideo = r;
      this.video.src = settings.TEXTURE_PATH + (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4");
    }
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    this.lineVisual.update(e, t);
    let n = properties.viewportWidth <= 812;
    let a = scrollManager.getDomRange(this.domReelContainer);
    let l = scrollManager.getDomRange(this.domReelContainerInner);
    let c = n ? 0 : scrollManager.getEaseInOutOffset(scrollManager.scrollPixel - a.top + (properties.viewportHeight - l.height) * 0.5, properties.viewportHeight, 1, 0);
    let u = scrollManager.getDomRange(this.domThumb);
    let f = n ? l.isActive : u.showScreenOffset > 0 && l.hideScreenOffset < 1;
    homePage.preUfxContainer.add(this.lineVisual.container);
    homePage.preUfxContainer.add(this.lineVisual.container);
    if (f) {
      this.domVideoContainer.classList.add("--is-visible");
    } else {
      this.domVideoContainer.classList.remove("--is-visible");
    }
    if (f) {
      let p = u.top - (properties.viewportHeight - u.height) * 0.5;
      let g = a.top - (properties.viewportHeight - a.height) * 0.5;
      let v = Math.max(0, u.showScreenOffset * properties.viewportHeight - properties.viewportHeight * 0.5 - u.height * 0.5);
      this.ufxMeshThumb.update(-scrollManager.scrollPixel + v);
      this.ufxMesh.update(-scrollManager.scrollPixel + c);
      this.ufxMesh.visible = true;
      this.ufxMesh.visible = r;
      this.hoverRatio = math.saturate(this.hoverRatio + e * 4 * (this.isUfxMeshHover ? 1 : -1));
      let _ = input.mousePixelXY.x;
      let T = input.mousePixelXY.y + scrollManager.scrollPixel;
      let M = this.ufxMesh._domX;
      let S = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY;
      let b = this.ufxMesh._domWidth;
      let C = this.ufxMesh._domHeight;
      this.ufxMeshRadialCenter.set((_ - M) / b, 1 - (T - S) / C);
      let w = math.fit(scrollManager.scrollPixel, p, g, 0, 1);
      this.videoPlaceholderRatio = w;
      this.showVideoPlaceholderButton = w > 0.9;
      this.ufxMesh.material.uniforms.u_showRatio.value = n ? 1 : w;
      if (w === 1) {
        this.domVideoTitle._animating = true;
        this.domVideoTitle._showAnimating = true;
      } else {
        this.domVideoTitle._showAnimating = false;
        this.domVideoTitle._animating = false;
      }
      this.domVideoContainer.style.transform = `translate3d(0,${c}px,0)`;
      if (!properties.useMobileLayout && w % 1 > 0) {
        properties.autoScrollSpeed = input.lastScrollYDirection;
      }
      if (this.video.paused) {
        this.video.play();
      }
    } else {
      this.ufxMesh.visible = false;
      if (!this.video.paused) {
        this.video.pause();
      }
    }
    if (t.screenRatio === -1) {
      this._reset();
    }
    if (r) {
      this._updateUI(e, a, t);
    } else {
      this._needsReset = true;
    }
  }
  _updateUI(e, t, r) {
    let n = scrollManager.getDomRange(this.domTitle);
    let a = scrollManager.getDomRange(this.domContent);
    this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
    this.domDescription._time = math.clamp(this.domDescription._time + (this.domDescription._animating ? e : -e), 0, 2);
    this.domBtn._ratio = math.saturate(this.domBtn._ratio + (this.domBtn._animating ? e : -e));
    if (this.videoPlaceholderRatio !== 1) {
      this.domVideoButton._hover = false;
    }
    this.domVideoButton._ratio = math.fit(this.videoPlaceholderRatio, 0.3, 1, 0, 1);
    this.domVideoButton._active = this.domVideoButton._ratio === 1;
    this.domVideoButton._time = math.clamp(this.domVideoButton._time + (t.screenRatio > -1 ? e : -e), 0, Infinity);
    this.domVideoButton._hoverRatio = math.saturate(this.domVideoButton._hoverRatio + (this.domVideoButton._hover ? e : -e));
    this.domVideoButton._hoverRatio2 = math.saturate(this.domVideoButton._hoverRatio2 + (this.domVideoButton._hover ? e * 1.5 : -e * 1.5));
    this.domVideoButton._hoverRatio3 = math.saturate(this.domVideoButton._hoverRatio3 + (this.domVideoButton._hover ? e * 3 : -e * 3));
    this.domVideoButton._hoverTime = math.clamp(this.domVideoButton._hoverTime + (this.domVideoButton._hover ? e * 2 : -e * 0), 0, Infinity);
    this.domVideoContainerDecorationTop._time = math.clamp(this.domVideoContainerDecorationTop._time + (this.domVideoContainerDecorationTop._animating ? e : -e * 2), 0, 1.4);
    this.domVideoContainerDecorationBottom._time = math.clamp(this.domVideoContainerDecorationBottom._time + (this.domVideoContainerDecorationBottom._animating ? e : -e * 2), 0, 1.4);
    if (!properties.useMobileLayout) {
      this.domVideoButton.style.opacity = ease.expoInOut(this.domVideoButton._ratio);
      this.domVideoButton.style.transform = `scale(${ease.expoInOut(this.domVideoButton._ratio) + ease.expoInOut(this.domVideoButton._hoverRatio3) * 0.1})`;
      this.domVideoButton.style.display = this.domVideoButton._ratio > 0 ? "flex" : "none";
      if (this.domVideoButton._ratio === 1) {
        this.domVideoContainerDecorationTop._animating = true;
        this.domVideoContainerDecorationBottom._animating = true;
      } else {
        this.domVideoContainerDecorationTop._animating = false;
        this.domVideoContainerDecorationBottom._animating = false;
      }
      for (let f = 0; f < this.domVideoContainerDecorationTop._crosses.length; f++) {
        let p = this.domVideoContainerDecorationTop._crosses[f];
        let g = math.fit(this.domVideoContainerDecorationTop._time - f / 10, 0, 0.6, 0, 1, ease.lusion);
        let v = math.fit(this.domVideoContainerDecorationTop._time - f / 10, 0, 0.6, 0, 180, ease.lusion);
        let _ = math.fit(this.domVideoButton._hoverRatio2 - f / 10, 0, 0.7, 0, 1, ease.expoInOut);
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
      for (let f = 0; f < this.domVideoContainerDecorationBottom._crosses.length; f++) {
        let p = this.domVideoContainerDecorationBottom._crosses[f];
        let g = math.fit(this.domVideoContainerDecorationBottom._time - f / 10, 0, 0.6, 0, 1, ease.lusion);
        let v = math.fit(this.domVideoContainerDecorationBottom._time - f / 10, 0, 0.6, 0, 180, ease.lusion);
        let _ = math.fit(this.domVideoButton._hoverRatio2 - f / 10, 0, 0.7, 0, 1, ease.expoInOut);
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
    }
    for (let f = 0; f < this.domVideoContainerDecorationTop._svgs.length; f++) {
      let p = this.domVideoContainerDecorationTop._svgs[f];
      let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domVideoButton._hoverRatio2 - f / 25, 0.2, 1, 1.2, 0, ease.expoInOut) : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    for (let f = 0; f < this.domVideoContainerDecorationBottom._svgs.length; f++) {
      let p = this.domVideoContainerDecorationBottom._svgs[f];
      let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domVideoButton._hoverRatio2 - f / 25, 0.2, 1, 1.2, 0, ease.expoInOut) : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    let l = properties.viewportWidth < settings.MOBILE_WIDTH ? this.domVideoButton._time : this.domVideoButton._hoverTime;
    let c = math.fit(l % 15, 0, 15, 0, -this.domVideoContainerDecorationTop._svgWrapper._width / 2);
    this.domVideoContainerDecorationTop._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`;
    c = math.fit(l % 15, 0, 15, -this.domVideoContainerDecorationTop._svgWrapper._width / 2, 0);
    this.domVideoContainerDecorationBottom._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`;
    let u = properties.viewportHeight * 0.1;
    this.domTitleInner.style.transform = "translateZ(0)";
    if (n.screenRatio > -1) {
      this.domTitle._animating = true;
      if (!properties.useMobileLayout) {
        this.domVideoTitle._time = math.clamp(this.domVideoTitle._time + (this.domVideoTitle._animating ? e : -e), 0, Infinity);
        this.domVideoTitle._showTime = Math.min(this.domVideoButton._ratio, math.saturate(this.domVideoTitle._showTime + (this.domVideoTitle._showAnimating ? e : -e)));
        this.domVideoTitle._hoverTime = math.saturate(this.domVideoTitle._hoverTime + (this.domVideoTitle._hover && this.domVideoTitle._time > 1 ? e * 1.5 : -e * 1.5));
        this.currRollupTime = this.domVideoTitle._time % this.ROLLUP_ANIMATION_INTERVAL;
        for (let p = 0; p < this.domVideoTitle._splitted.words.length; p++) {
          let g = this.domVideoTitle._splitted.words[p];
          if (this.prevRollupTime - this.currRollupTime > this.ROLLUP_ANIMATION_INTERVAL - 1) {
            g._randCharIndex = Math.round(Math.random() * (g._chars.length - 1));
          }
          for (let v = 0; v < g._chars.length; v++) {
            let _ = g._chars[v];
            let T = math.fit(this.domVideoTitle._showTime - p / 4 - v / 20, 0, 0.6, 200, 0, ease.lusion);
            if (v === g._randCharIndex) {
              T += math.fit(this.currRollupTime - p / 10, 0.5, 1.3, 0, -100, ease.lusion);
            }
            _._wrapper.style.transform = `translate3d(0, ${T}%, 0)`;
          }
        }
        for (let p = 0, g = this.domTitle._splitted.words.length; p < g; p++) {
          let v = this.domTitle._splitted.words[p];
          let _;
          let T;
          if (p < 2) {
            _ = math.fit(this.domTitle._time - Math.abs(2 - p) / 10, 0.5, 1.2, -this.domTitleLine1._paddingLeft, 0, ease.lusion);
            T = math.fit(this.domTitle._time - p / 10, 0, 1, 100, 0, ease.lusion);
          } else {
            _ = 0;
            T = math.fit(this.domTitle._time - p / 10, 0, 1, -100, 0, ease.lusion);
          }
          v.style.transform = `translate3d(${_}px, ${T}%, 0)`;
        }
      }
      let f = n.showScreenOffset * -u * 0.5;
      this.domTitleInner.style.transform = "translate3d(0," + f + "px,0)";
      this.prevRollupTime = this.currRollupTime;
    }
    if (a.screenRatio > -1) {
      let f = a.showScreenOffset * -u * 1.5;
      this.domDescription.style.transform = "translate3d(0," + f + "px,0)";
      this.domDescription._animating = true;
      if (!properties.useMobileLayout) {
        this.domDescription._splitted.words.forEach((g, v) => {
          let _ = math.fit(this.domDescription._time - v / 100, 0, 1, 0.1, 1, ease.expoOut);
          let T = math.fit(this.domDescription._time - v / 100, 0, 1, 100, 0, ease.expoOut);
          g.style.opacity = _;
          g.style.transform = `translate3d(0, ${T}%, 0)`;
        });
      }
      this.domBtn._animating = true;
      let p = a.showScreenOffset * -u * 1.25;
      if (properties.viewportWidth >= 812) {
        this.domBtn.style.transform = `translateY(${p}px)translate3d(0, ${math.fit(this.domBtn._ratio, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domBtn._ratio, 0, 1, 10, 0, ease.lusion)}deg)`;
        this.domBtn.style.opacity = ease.lusion(this.domBtn._ratio);
      } else {
        this.domBtn.style.transform = `translateY(${p}px)`;
      }
    }
  }
  _onDomVideoButtonClick() {
    videoOverlay.initAndPlayVideo(VIDEO_LIST.MAIN_VIDEO_REEL);
  }
  _onDomVideoButtonMouseenter() {
    this.domVideoButton._hover = true;
    this.domVideoContainerDecorationBottom.classList.add("--is-active");
    this.domVideoContainerDecorationTop.classList.add("--is-active");
  }
  _onDomVideoButtonMouseleave() {
    this.domVideoButton._hover = false;
    this.domVideoContainerDecorationBottom.classList.remove("--is-active");
    this.domVideoContainerDecorationTop.classList.remove("--is-active");
  }
  _onVideoMeshMouseEnter() {
    this.isUfxMeshHover = true;
  }
  _onVideoMeshMouseLeave() {
    this.isUfxMeshHover = false;
  }
  _splitText() {
    if (properties.viewportWidth >= 812) {
      this.domDescription._splitted = new SplitType(this.domDescription, {
        types: "words"
      });
      this.domTitle._splitted = new SplitType(this.domTitleInner, {
        types: "words"
      });
      this.domTitleLine1 = document.getElementById("home-reel-title-line-1");
      this.domVideoTitle._splitted = new SplitType(this.domVideoTitle, {
        types: "words",
        wordClass: "home-reel-video-title-word"
      });
      for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
        let t = this.domVideoTitle._splitted.words[e];
        let r = new SplitType(t, {
          types: "chars"
        });
        t._chars = r.chars;
        for (let n = 0; n < t._chars.length; n++) {
          let a = t._chars[n];
          let l = a.cloneNode(true);
          let c = document.createElement("div");
          c.classList.add("char-wrapper");
          c.style.display = "inline-block";
          a._wrapper = c;
          c.append(a);
          c.append(l);
          t.append(c);
        }
      }
    }
  }
  _reset() {
    if (this.domDescription._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domDescription._time = 0;
      this.domDescription._animating = false;
      this.domVideoButton._active = false;
      this.domVideoButton._ratio = 0;
      this.domVideoButton._hover = false;
      this.domVideoButton._hoverTime = 0;
      this.domVideoButton._hoverRatio = 0;
      this.domVideoButton._hoverRatio2 = 0;
      this.domVideoButton._hoverRatio3 = 0;
      this.domBtn._animating = false;
      this.domBtn._ratio = 0;
      this.domVideoContainerDecorationTop._animating = false;
      this.domVideoContainerDecorationTop._time = 0;
      if (properties.useMobileLayout) {
        if (this.domDescription._splitted) {
          this.domDescription._splitted.revert();
        }
        if (this.domTitle._splitted) {
          this.domTitle._splitted.revert();
        }
      } else {
        this.domDescription._splitted.words.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
          e.style.opacity = 0;
        });
        this.domTitle._splitted.words.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
          let t = this.domVideoTitle._splitted.words[e];
          for (let r = 0; r < t._chars.length; r++) {
            let n = t._chars[r];
            n._wrapper.style.transform = "translate3d(0, 0, 0)";
            n.style.transform = "translate3d(0, 0, 0)";
          }
        }
      }
      this.domVideoTitle._animating = false;
      this.domVideoTitle._time = 0;
      this.domVideoTitle._showAnimating = false;
      this.domVideoTitle._showTime = 0;
    }
  }
}
const homeReelSection = new HomeReelSection();
window.homeReelSection = homeReelSection;
window.videoOverlay = videoOverlay;
let wrapper = document.createElement("div");
class DomHelper {
  clone(e) {
    wrapper.innerHTML = e.outerHTML;
    let t = wrapper.firstChild;
    wrapper.removeChild(t);
    return t;
  }
  _collapseWhiteSpace(e) {
    return e.trim().replace(/\s+/g, " ");
  }
  getLinesFromText(e) {
    let t = e.childNodes;
    let r = [];
    for (let n = 0, a = t.length; n < a; n++) {
      let l = t[n];
      if (l.nodeType == 3) {
        r.push.apply(r, this.getLinesFromTextNode(l));
      }
    }
    return r;
  }
  getLinesFromTextNode(e) {
    if (e.nodeType !== 3) {
      throw new Error("Lines can only be extracted from text nodes.");
    }
    e.textContent = this._collapseWhiteSpace(e.textContent);
    for (var t = e.textContent, r = document.createRange(), n = [], a = [], l = 0; l < t.length; l++) {
      r.setStart(e, 0);
      r.setEnd(e, l + 1);
      var c = r.getClientRects().length - 1;
      if (!n[c]) {
        n.push(a = []);
      }
      a.push(t.charAt(l));
    }
    n = n.map(u => this._collapseWhiteSpace(u.join("")));
    return n;
  }
}
const domHelper = new DomHelper();
const vert$i = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const frag$l = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform vec3 u_colorBg;uniform float u_showRatio;uniform float u_activeRatio;uniform vec2 u_textureSize;uniform vec2 u_domWH;uniform vec2 u_shiftXY;uniform vec3 u_focusPos;uniform float u_time;uniform float u_zoomRatio;uniform float u_dofRangeOffset;uniform float u_saturation;uniform float u_brightness;uniform float u_borderRatio;uniform float u_rippleStrength;uniform vec2 u_resolution;uniform float u_globalRadius;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*u_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;vec2 baseUv=v_uv;baseUv.x-=(screenUv.x-0.5)*(1.-sin((screenUv.y)*3.141592))*u_rippleStrength;float radiusRatio=1.;vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(5.,28.));float imageAlpha=getRoundedCornerMask(baseUv,u_domWH*mix(0.7,1.,u_showRatio),u_globalRadius,radiusRatio);vec2 toUvSpace=1./(u_textureSize*max(u_domWH.x/u_textureSize.x,u_domWH.y/u_textureSize.y));float borderThickenss=(u_domWH.y*0.08+5.)*u_borderRatio-5.;vec2 uv=baseUv-.5;uv*=u_domWH*mix(0.75,1.,u_showRatio);uv*=mix(0.975,1.,u_zoomRatio);float zMultiplier=u_domWH.y*(.15+u_activeRatio*15.);vec3 pos=vec3(uv,-zMultiplier);float cameraDepth=u_domWH.y*mix(10.,5.,u_zoomRatio);vec3 rayOri=vec3(u_focusPos.xy,cameraDepth);float dist=length(pos-rayOri);vec3 rayDir=(pos-rayOri)/dist;float skipDist=cameraDepth/-rayDir.z;dist-=skipDist;float stepDist=dist/float(PARALLAX_SAMPLES);vec3 rayStep=rayDir*stepDist;vec3 rayPos=rayOri+rayDir*(skipDist+stepDist*noise.x);for(int i=0;i<PARALLAX_SAMPLES;i++){float currZ=-texture2D(u_depthTexture,rayPos.xy*toUvSpace+.5).r*zMultiplier;if(currZ>rayPos.z){break;}rayPos+=rayStep;dist+=stepDist;}uv=rayPos.xy;uv*=toUvSpace;uv+=u_shiftXY*0.015;float depth=texture2D(u_depthTexture,uv+.5).r;vec3 color=vec3(0.0);float PI=3.1415926;float blurriness=mix(0.0,0.01,u_zoomRatio)*linearStep(0.0,0.5,abs(depth-u_focusPos.z)+u_dofRangeOffset);float angle=PI*2.*noise.y;float textureAspectInv=u_textureSize.y/u_textureSize.x;float numSampleInv=1./float(BLUR_SAMPLES);for(int i=0;i<BLUR_SAMPLES;i++){float fI=float(i);float r=sqrt((fI+0.5)*numSampleInv)*blurriness;angle+=10.16640738;vec2 uvOffset=r*vec2(cos(angle)*textureAspectInv,sin(angle));vec4 image=texture2D(u_texture,uv+uvOffset+.5);color+=image.rgb;}color*=numSampleInv;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color+=u_brightness;float fogThickness=0.75;color=mix(color,u_colorBg,linearStep(0.0,fogThickness,u_activeRatio*(1.+fogThickness*2.)-fogThickness-(1.0-depth)));gl_FragColor=vec4(color,imageAlpha);}`;
let TEXT_STAGGER = 20;
let LETTER_PER_SECOND = 40;
let MAX_RAND_LETTER_COUNT = 5;
class ProjectItem {
  static hoverDom = null;
  constructor(e, t, r, n) {
    this.list = e;
    this.id = t;
    this.dom = r;
    this.index = n;
    this.isHover = false;
    this.hoverRatio = 0;
    this.hoverThresholds = [0, 0.2, 0.3];
    this.focusZ = 0.5;
    this.parallaxStrength = 1;
    this.activeRatio = 0;
    this.showTime = 0;
    this.isHoverDom = false;
    this.domMain = this.dom.querySelector(".project-item-main");
    this.domFooterLine1 = this.dom.querySelector(".project-item-line-1");
    this.domFooterLine2 = this.dom.querySelector(".project-item-line-2-inner");
    this.domFooterLine2Icon = this.dom.querySelector(".project-item-line-2-icon");
    this.domFooterLine2List = [];
    this.domFooterLine1Text = this.domFooterLine1.textContent;
    this.domFooterLine1Time = 0;
    this.domFooterLine2Text = this.domFooterLine2.textContent;
    this.domFooterLine2Time = 0;
    this.domFooterLine2HoverRatio = 0;
    let a = settings.USE_WEBGL2 ? LinearMipmapLinearFilter : LinearFilter;
    let l = properties.loader.load(settings.PROJECT_PATH + this.id + "/home.webp", {
      type: "texture",
      minFilter: a
    }).content;
    let c = properties.loader.load(settings.PROJECT_PATH + this.id + "/home_depth.webp", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    this.focusPosMotion = new SecondOrderDynamics(new Vector3(), 1, 0.6, 2);
    this.focusPos = this.focusPosMotion.value;
    this.shiftXYTarget = new Vector2();
    this.shiftXY = new Vector2();
    this.zoomMotion = new SecondOrderDynamics(1, 2.2, 0.7, 3);
    this.dofRangeOffsetRatio = 0;
    this.borderMotion = new SecondOrderDynamics(0, 2.5, 0.5, 2);
    let u = n % 2 ? 1 : -1;
    this.ufxMesh = new UfxMesh({
      refDom: this.domMain,
      paddingL: u > 0 ? 0 : 1000,
      paddingR: u < 0 ? 0 : 1000,
      uniforms: Object.assign({
        u_side: {
          value: u
        },
        u_sideMargin: {
          value: 1
        },
        u_texture: {
          value: l
        },
        u_depthTexture: {
          value: c
        },
        u_textureSize: {
          value: l.size
        },
        u_focusPos: {
          value: this.focusPos
        },
        u_shiftXY: {
          value: this.shiftXY
        },
        u_deltaOffset: {
          value: new Vector2()
        },
        u_zoomRatio: this.zoomMotion,
        u_dofRangeOffset: {
          value: 0
        },
        u_dofStrength: {
          value: 1
        },
        u_saturation: {
          value: -1
        },
        u_brightness: {
          value: 0
        },
        u_colorBg: {
          value: new Color(r.dataset.colorBg)
        },
        u_activeRatio: {
          value: 0
        },
        u_showRatio: {
          value: 0
        },
        u_borderRatio: {
          value: 0
        },
        u_rippleStrength: {
          value: 0
        },
        u_time: properties.sharedUniforms.u_time,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }, blueNoise.sharedUniforms),
      depthTest: false,
      depthWrite: false,
      vertexShader: vert$i,
      fragmentShader: frag$l
    });
    this.ufxMesh.material.defines.PARALLAX_SAMPLES = 12;
    this.ufxMesh.material.defines.BLUR_SAMPLES = 6;
    this.ufxMesh.renderOrder = 10;
    this.domMain.addEventListener("mouseenter", this._onMouseEnter.bind(this));
    this.domMain.addEventListener("mouseleave", this._onMouseLeave.bind(this));
  }
  _onMouseEnter() {
    if (pagesManager.isIdle && this.list.zoomRatio == 0) {
      this.isHover = true;
      audios.countPlay("focus");
    }
  }
  _onMouseLeave() {
    this.isHover = false;
  }
  syncDom() {
    this.ufxMesh.syncDom(-scrollManager.scrollPixel);
  }
  _findIndexFromThresholds(e) {
    for (let t = 0; t < this.hoverThresholds.length; t++) {
      if (e < this.hoverThresholds[t]) {
        return t;
      }
    }
    return this.hoverThresholds.length;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.dom);
    if (t.ratio > -1 && t.ratio < 1) {
      this.ufxMesh.update(-scrollManager.scrollPixel);
      this.domFooterLine2HoverRatio = math.saturate(this.domFooterLine2HoverRatio + (this.isHoverDom ? 1 : -1) * e * 2.5);
      this.domFooterLine1Time += e;
      let r = this.domFooterLine1Text;
      let n = Math.min(r.length, Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time) - MAX_RAND_LETTER_COUNT);
      let a = Math.min(r.length, Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time));
      let l = "";
      for (let c = 0; c < n; c++) {
        l += r[c];
      }
      for (let c = 0; c < a - n; c++) {
        l += String.fromCharCode(33 + ~~(Math.random() * 93));
      }
      this.domFooterLine1.textContent = l;
      this.domFooterLine2Time += e * 0.8;
      if (properties.useMobileLayout) {
        this.domFooterLine2List.forEach((c, u) => {
          c.style.transform = "translate3d(1.5em, 0, 0)";
          let f = math.saturate(this.domFooterLine2HoverRatio - Math.abs(u - this.domFooterLine2List.length - 1) / 100);
          let p = math.fit(f, 0, 1, 0, 1.5, ease.lusion);
          c.style.transform += `translateX(${p}em)`;
        });
        this.domFooterLine2Icon.style.transform = "translateX(1em)";
      } else {
        this.domFooterLine2List.forEach((u, f) => {
          let p = math.fit(f, 0, this.domFooterLine2List.length - 1, Math.PI / 2, Math.PI * 3 / 2);
          let g = math.saturate(this.domFooterLine2Time - Math.cos(p) / TEXT_STAGGER);
          let v = math.fit(g, 0, 1, 500, 0, ease.expoInOut);
          let _ = math.saturate(this.domFooterLine2HoverRatio - Math.abs(f - this.domFooterLine2List.length - 1) / 100);
          let T = math.fit(_, 0, 1, 0, 1.5, ease.lusion);
          u.style.transform = `translate3d(${T}em, -${v}%, 0)`;
        });
        let c = math.fit(this.domFooterLine2HoverRatio, 0.3, 1, 0, 1, ease.lusion);
        this.domFooterLine2Icon.style.transform = `translateX(${c}em)`;
      }
      this.showTime += e;
      if (this.ufxMesh.testViewport(-scrollManager.scrollPixel)) {
        this.ufxMesh.visible = true;
        let c = input.mousePixelXY.x;
        let u = input.mousePixelXY.y + scrollManager.scrollPixel;
        let f = this.ufxMesh._domX;
        let p = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY;
        let g = this.ufxMesh._domWidth;
        let v = this.ufxMesh._domHeight;
        let _ = this.hoverRatio;
        this.hoverRatio = math.clamp(this.hoverRatio + (this.isHover ? 1 : -1) * e, 0, 1);
        if (_ < this.hoverRatio) {
          let w = this._findIndexFromThresholds(_);
          let R = this._findIndexFromThresholds(this.hoverRatio);
          if (R != w) {
            this.shiftXYTarget.set(Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(math.fit(this.hoverRatio, 0, 0.6, 1, 0));
          }
          if (R == this.hoverThresholds.length) {
            this.shiftXYTarget.multiplyScalar(0.5);
          }
        } else {
          this.shiftXYTarget.multiplyScalar(0.95);
        }
        this.shiftXY.lerp(this.shiftXYTarget, 0.2);
        let T = this.focusPosMotion.target;
        let M = this.list.zoomRatio;
        let S = this.activeRatio = this.id == this.list.selectedId ? M : Math.min(this.activeRatio, M);
        if (this.isHover && S == 0) {
          let w = this.parallaxStrength;
          let R = this.hoverRatio > 0 ? math.fit(this.hoverRatio, 0, 0.3, 1, 0) * v * 0.75 : 0;
          T.x = (c - f - g * 0.5 + Math.cos(properties.time * 20) * R) / g * -v * w;
          T.y = (u - p - v * 0.5 - Math.sin(properties.time * 30) * R) / v * v * w;
          T.z = this.focusZ;
        } else {
          T.x = 0;
          T.y = 0;
          T.z = S > 0 ? this.focusZ : -1;
        }
        this.zoomMotion.target = this.isHover || S > 0 ? 1 : 0;
        this.dofRangeOffsetRatio = math.clamp(this.dofRangeOffsetRatio + (this.isHover ? 0.75 : -1) * e, 0, 1);
        this.ufxMesh.material.uniforms.u_dofRangeOffset.value = math.mix(0, -0.5, this.dofRangeOffsetRatio);
        this.ufxMesh.material.uniforms.u_saturation.value = 0;
        this.ufxMesh.material.uniforms.u_brightness.value = 0;
        let b = math.fit(this.showTime, 0, 1.5, 0, 1, ease.expoOut);
        this.ufxMesh.material.uniforms.u_showRatio.value = b;
        this.ufxMesh.material.uniforms.u_activeRatio.value = S * S;
        let C = math.fit(this.showTime, 0, 2, 0, 1, ease.expoOut);
        this.ufxMesh.position.x = (1 - C) * (this.index % 2 - 0.5) * -properties.viewportWidth * 0.1;
        this.ufxMesh.rotation.z = (1 - C) * (this.index % 2 - 0.5) * 0.1;
        this.borderMotion.target = this.isHover && S == 0 ? 1 : 0;
        this.borderMotion.update(e);
        this.ufxMesh.material.uniforms.u_borderRatio.value = 0;
        this.ufxMesh.material.uniforms.u_rippleStrength.value = Math.min(0.15, scrollManager.easedScrollStrength * 0.5);
        this.focusPosMotion.update(e);
        this.zoomMotion.update(e);
      } else {
        this.ufxMesh.visible = false;
      }
    } else {
      this.ufxMesh.visible = false;
      this.showTime = 0;
      this.domFooterLine1Time = 0;
      this.domFooterLine2Time = 0;
      this.domFooterLine2.style.removeProperty("will-change");
    }
  }
  preloadImage() {}
}
class ProjectItemList {
  selectedId = null;
  page = null;
  zoomRatio = 0;
  projectItems = {};
  projectItemList = [];
  ufxContainer = new Object3D();
  ufxPivotContainer = new Object3D();
  constructor(e, t) {
    this.page = e;
    this.ufxContainer.add(this.ufxPivotContainer);
    e.postUfxContainer.add(this.ufxContainer);
    let r = t.querySelectorAll(".project-item");
    for (let n = 0; n < r.length; n++) {
      let a = r[n];
      let l = a.dataset.id;
      let c = this.projectItems[l] = this.projectItemList[n] = new ProjectItem(this, l, a, n);
      if (!properties.useMobileLayout) {
        c.dom.addEventListener("mouseenter", this._onDomItemMouseEnter.bind(this));
        c.dom.addEventListener("mouseleave", this._onDomItemMouseLeave.bind(this));
      }
      this.ufxPivotContainer.add(c.ufxMesh);
      let u = c.domFooterLine2.textContent.split("");
      c.domFooterLine2.textContent = "";
      u.forEach(f => {
        let p = document.createElement("div");
        p.classList.add("project-item-line-2-inner-list");
        p.style.display = "flex";
        p.style.flexDirection = "column";
        p.style.transform = "translateY(-400%)";
        c.domFooterLine2List.push(p);
        if (f === " ") {
          p.style.width = "0.3em";
        } else {
          for (let g = 0; g < 4; g++) {
            let v = document.createElement("span");
            v.textContent = f;
            p.appendChild(v);
          }
        }
        c.domFooterLine2.appendChild(p);
      });
    }
  }
  hasProject(e) {
    return !!this.projectItems[e];
  }
  getProjectItemTop(e) {
    let t = this.projectItems[e];
    if (t) {
      return scrollManager.getDomRange(t.dom)._top;
    } else {
      return 0;
    }
  }
  _onDomItemMouseEnter(e) {
    let t = this.projectItemList.filter(r => r.dom === e.target)[0];
    t.isHoverDom = true;
    ProjectItem.hoverDom = t;
  }
  _onDomItemMouseLeave(e) {
    let t = this.projectItemList.filter(r => r.dom === e.target)[0];
    t.isHoverDom = false;
    ProjectItem.hoverDom = null;
  }
  resize = (e, t) => {
    this.needsSyncUfx = true;
    this.ufxPivotContainer.position.set(-e * 0.5, t * 0.5, 0);
    this.ufxContainer.position.set(e * 0.5, -t * 0.5, 0);
    for (let r = 0; r < this.projectItemList.length; r++) {
      let n = this.projectItemList[r];
      n.isHoverDom = false;
    }
    ProjectItem.hoverDom = null;
  };
  update(e) {
    if (this.needsSyncUfx) {
      this.needsSyncUfx = false;
      for (let u = 0; u < this.projectItemList.length; u++) {
        this.projectItemList[u].syncDom();
      }
    }
    let t = 0;
    let r = 0;
    let n = 0;
    let a = 0;
    let l = 1;
    let c = this.projectItems[this.selectedId];
    if (c) {
      let u = ease.cubicInOut(this.zoomRatio);
      let f = Math.max(properties.viewportWidth / c.ufxMesh._domWidth, properties.viewportHeight / c.ufxMesh._domHeight);
      l *= math.mix(1, f * 1.2, u);
      let p = properties.viewportWidth * 0.5 - c.ufxMesh._domX - c.ufxMesh._domWidth * 0.5;
      let g = properties.viewportHeight * 0.5 - c.ufxMesh._domY - c.ufxMesh._domHeight * 0.5 + scrollManager.scrollPixel + c.ufxMesh._capturedOffsetY;
      t += p;
      r -= g;
      t -= p * (1 - u) / l;
      r += g * (1 - u) / l;
      n += u * 0.3 * p / properties.viewportWidth;
      a -= u * 0.3 * p / properties.viewportWidth;
    }
    t -= properties.viewportWidth * 0.5;
    r += properties.viewportHeight * 0.5;
    this.ufxPivotContainer.position.set(t, r, 0);
    this.ufxContainer.rotation.y = n;
    this.ufxContainer.rotation.z = a;
    this.ufxContainer.scale.setScalar(l);
    for (let u = 0; u < this.projectItemList.length; u++) {
      this.projectItemList[u].update(e);
    }
  }
}
class HomeFeaturedSection {
  domContainer;
  domTitle;
  domDisclaimer;
  domCta;
  projectItemList;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#home-featured");
    this.projectItemList = new ProjectItemList(homePage, e.querySelector(".project-list"));
    this.domItems = e.querySelectorAll(".project-item");
    this.domTitle = e.querySelector("#home-featured-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domDisclaimer = e.querySelector("#home-featured-disclaimer");
    this.domDisclaimer._time = 0;
    this.domDisclaimer._animating = false;
    this.domCta = e.querySelector("#home-featured-cta");
    this.domCta._time = 0;
    this.domCta._animating = false;
  }
  init() {}
  resize(e, t) {
    this._splitText();
    this.projectItemList.resize(e, t);
  }
  update(e) {
    if (scrollManager.getDomRange(this.domContainer).isActive) {
      if (this._needsReset) {
        this._reset();
      }
      let r = scrollManager.getDomRange(this.domTitle);
      let n = scrollManager.getDomRange(this.domDisclaimer);
      let a = scrollManager.getDomRange(this.domCta);
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      this.domDisclaimer._time = math.clamp(this.domDisclaimer._time + (this.domDisclaimer._animating ? e : -e), 0, 2);
      this.domCta._time = math.clamp(this.domCta._time + (this.domCta._animating ? e : -e), 0, 1);
      if (r.screenRatio > -1) {
        this.domTitle._animating = true;
        if (!properties.useMobileLayout) {
          this.domTitle._splitted.chars.forEach((l, c) => {
            let u = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 1, 0, ease.lusion);
            let f = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 10, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}em, 0) rotate(${f}deg)`;
          });
        }
      }
      if (n.screenRatio > -1) {
        this.domDisclaimer._animating = true;
        if (!properties.useMobileLayout) {
          this.domDisclaimer._splitted.lines.forEach((l, c) => {
            let u = math.fit(this.domDisclaimer._time * 1 - c / 20, 0, 1, 100, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}%, 0)`;
          });
        }
      }
      if (a.screenRatio > -1) {
        if (properties.useMobileLayout) {
          this.domCta.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
          this.domCta.style.opacity = 1;
        } else {
          this.domCta._animating = true;
          this.domCta.style.transform = `translate3d(0, ${math.fit(this.domCta._time, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domCta._time, 0, 1, 10, 0, ease.lusion)}deg)`;
          this.domCta.style.opacity = ease.lusion(this.domCta._time);
        }
      }
    } else {
      this._needsReset = true;
    }
    this.projectItemList.zoomRatio = math.fit(homePage.activeRatio, 0, 0.75, 1, 0);
    this.projectItemList.update(e);
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domDisclaimer._time = 0;
      this.domDisclaimer._animating = false;
      this.domCta._time = 0;
      this.domCta._animating = false;
      if (!properties.useMobileLayout) {
        this.domDisclaimer._splitted.lines.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitle._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
      }
    }
  }
  _splitText() {
    if (this.domTitle._splitted && this.domTitle._splitted.revert) {
      this.domTitle._splitted.revert();
    }
    if (this.domDisclaimer._splitted && this.domDisclaimer._splitted.revert) {
      this.domDisclaimer._splitted.revert();
    }
    if (!properties.useMobileLayout) {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, chars"
      });
      this.domDisclaimer._splitted = new SplitType(this.domDisclaimer, {
        types: "lines"
      });
      this.domDisclaimer._splitted.lines.forEach(e => {
        let t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.append(e);
        this.domDisclaimer.append(t);
      });
    }
  }
}
const homeFeaturedSection = new HomeFeaturedSection();
const channelMixerFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_channelMixerR;uniform vec4 u_channelMixerG;uniform vec4 u_channelMixerB;uniform vec4 u_channelMixerA;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv);gl_FragColor=vec4(dot(color,u_channelMixerR),dot(color,u_channelMixerG),dot(color,u_channelMixerB),dot(color,u_channelMixerA));}`;
class TextureHelper {
  blackTexture;
  whiteTexture;
  transparentTexture;
  channelMixerMaterial;
  init() {
    this.blackTexture = this._createPixelTexture([0, 0, 0, 255]);
    this.whiteTexture = this._createPixelTexture([255, 255, 255, 255]);
    this.transparentTexture = this._createPixelTexture([0, 0, 0, 0]);
  }
  _createPixelTexture(e) {
    return fboHelper.createDataTexture(new Uint8Array(e), 1, 1, false, true);
  }
  mixChannels(e, t, r = -1, n = -1, a = -1, l = -1) {
    this.channelMixerMaterial ||= fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_channelMixerR: {
          value: new Vector4()
        },
        u_channelMixerG: {
          value: new Vector4()
        },
        u_channelMixerB: {
          value: new Vector4()
        },
        u_channelMixerA: {
          value: new Vector4()
        }
      },
      vertexShader: fboHelper.vertexShader,
      fragmentShader: fboHelper.precisionPrefix + channelMixerFrag,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendDst: OneFactor,
      blendSrc: OneFactor,
      blendEquationAlpha: AddEquation,
      blendDstAlpha: OneFactor,
      blendSrcAlpha: OneFactor
    });
    this.channelMixerMaterial.uniforms.u_texture.value = e;
    this.channelMixerMaterial.uniforms.u_channelMixerR.value.set(+(r % 4 == 0), +(r % 4 == 1), +(r % 4 == 2), +(r % 4 == 3)).multiplyScalar(r < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerG.value.set(+(n % 4 == 0), +(n % 4 == 1), +(n % 4 == 2), +(n % 4 == 3)).multiplyScalar(n < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerB.value.set(+(a % 4 == 0), +(a % 4 == 1), +(a % 4 == 2), +(a % 4 == 3)).multiplyScalar(a < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerA.value.set(+(l % 4 == 0), +(l % 4 == 1), +(l % 4 == 2), +(l % 4 == 3)).multiplyScalar(l < 0 ? 0 : 1);
    let c = fboHelper.getColorState();
    fboHelper.renderer.autoClear = false;
    fboHelper.render(this.channelMixerMaterial, t);
    fboHelper.setColorState(c);
  }
}
const textureHelper = new TextureHelper();
class Simple1DNoise {
  static MAX_VERTICES = 512;
  static MAX_VERTICES_MASK = Simple1DNoise.MAX_VERTICES - 1;
  _scale = 1;
  _amplitude = 1;
  _r = [];
  constructor(e) {
    let t = e ? math.getSeedRandomFn(e) : Math.random;
    for (let r = 0; r < Simple1DNoise.MAX_VERTICES; ++r) {
      this._r.push(t() - 0.5);
    }
  }
  getVal(e) {
    const t = e * this._scale;
    const r = Math.floor(t);
    const n = t - r;
    const a = n * n * (3 - n * 2);
    const l = r & Simple1DNoise.MAX_VERTICES_MASK;
    const c = l + 1 & Simple1DNoise.MAX_VERTICES_MASK;
    return math.mix(this._r[l], this._r[c], a) * this._amplitude;
  }
  getFbm(e, t) {
    let r = 0;
    let n = 0.5;
    for (let a = 0; a < t; a++) {
      r += n * this.getVal(e);
      e *= 2;
      n *= 0.5;
    }
    return r;
  }
  get amplitude() {
    return this._amplitude;
  }
  set amplitude(e) {
    this._amplitude = e;
  }
  get scale() {
    return this._scale;
  }
  set scale(e) {
    this._scale = e;
  }
}
const _v$2 = new Vector3();
class BrownianMotion {
  _position = new Vector3();
  _rotation = new Quaternion();
  _euler = new Euler();
  _scale = new Vector3(1, 1, 1);
  _matrix = new Matrix4();
  _enablePositionNoise = true;
  _enableRotationNoise = true;
  _positionFrequency = 0.25;
  _rotationFrequency = 0.25;
  _positionAmplitude = 0.3;
  _rotationAmplitude = 0.003;
  _positionScale = new Vector3(1, 1, 1);
  _rotationScale = new Vector3(1, 1, 0);
  _positionFractalLevel = 3;
  _rotationFractalLevel = 3;
  _times = new Float32Array(6);
  _noise = new Simple1DNoise();
  static FBM_NORM = 1 / 0.75;
  constructor() {
    this.rehash();
  }
  rehash() {
    for (let e = 0; e < 6; e++) {
      this._times[e] = Math.random() * -10000;
    }
  }
  update(e) {
    const t = e === undefined ? 16.666666666666668 : e;
    if (this._enablePositionNoise) {
      for (let r = 0; r < 3; r++) {
        this._times[r] += this._positionFrequency * t;
      }
      _v$2.set(this._noise.getFbm(this._times[0], this._positionFractalLevel), this._noise.getFbm(this._times[1], this._positionFractalLevel), this._noise.getFbm(this._times[2], this._positionFractalLevel));
      _v$2.multiply(this._positionScale);
      _v$2.multiplyScalar(this._positionAmplitude * BrownianMotion.FBM_NORM);
      this._position.copy(_v$2);
    }
    if (this._enableRotationNoise) {
      for (let r = 0; r < 3; r++) {
        this._times[r + 3] += this._rotationFrequency * t;
      }
      _v$2.set(this._noise.getFbm(this._times[3], this._rotationFractalLevel), this._noise.getFbm(this._times[4], this._rotationFractalLevel), this._noise.getFbm(this._times[5], this._rotationFractalLevel));
      _v$2.multiply(this._rotationScale);
      _v$2.multiplyScalar(this._rotationAmplitude * BrownianMotion.FBM_NORM);
      this._euler.set(_v$2.x, _v$2.y, _v$2.z);
      this._rotation.setFromEuler(this._euler);
    }
    this._matrix.compose(this._position, this._rotation, this._scale);
  }
  get positionAmplitude() {
    return this._positionAmplitude;
  }
  set positionAmplitude(e) {
    this._positionAmplitude = e;
  }
  get positionFrequency() {
    return this._positionFrequency;
  }
  set positionFrequency(e) {
    this._positionFrequency = e;
  }
  get rotationAmplitude() {
    return this._rotationAmplitude;
  }
  set rotationAmplitude(e) {
    this._rotationAmplitude = e;
  }
  get rotationFrequency() {
    return this._rotationFrequency;
  }
  set rotationFrequency(e) {
    this._rotationFrequency = e;
  }
  get matrix() {
    return this._matrix;
  }
  set matrix(e) {
    this._matrix = e;
  }
}
const vert$h = `#define GLSLIFY 1
attribute float ao;attribute float areaRatio;attribute float cluster;attribute float height;attribute vec3 center;attribute vec3 instancePos;attribute vec3 instanceGridIds;attribute vec3 instanceAxis;attribute vec4 tangent;uniform float u_time;uniform float u_showRatio;uniform float u_offsetZ;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying float v_ao;varying float v_opacity;varying float v_emission;varying vec2 v_uv;varying vec4 v_rands;varying float v_depth;
#define PI 3.14159265359
vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float angle){float halfAngle=angle*0.5;return vec4(axis*sin(halfAngle),cos(halfAngle));}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash44(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}
#include <goalBlackTunnelTransform>
void main(){vec3 pos=position;vec3 nor=normal;vec3 tang=tangent.xyz;
#ifdef IS_HD
float blockId=floor(pos.x+0.5);
#else
float blockId=0.;
#endif
vec4 q;vec3 offsetInstanceGridIds=instanceGridIds;offsetInstanceGridIds.z-=floor(u_offsetZ/float(GRID_SIZE))*2.;vec4 instanceRand1s=hash44(floor(vec4(offsetInstanceGridIds+.5,blockId+cluster)));v_rands=hash44(floor(vec4(offsetInstanceGridIds+.5,100.0)));float showRatio=u_showRatio;showRatio*=1.-step(10.5,instanceGridIds.z)*mod(u_offsetZ/float(GRID_SIZE),1.);
#ifdef IS_HD
pos=mix(center,pos,showRatio);
#else
pos.xy*=showRatio*showRatio;pos.z*=showRatio;
#endif
#ifdef IS_HD
pos.x-=blockId;float blockOffset=sin(u_time*2.+cos(u_time*4.+0.2+offsetInstanceGridIds.z))*0.15*instanceRand1s.y;float heightRatio=1.;pos.y=pos.y*height*heightRatio+(0.025+blockOffset);float variation=floor(instanceRand1s.x*8.);q=quaternion(vec3(0.,0.,variation>3.5 ?-1. : 1.),(mod(blockId,4.)+mod(variation,4.))*PI*0.5);pos=qrotate(q,pos);nor=qrotate(q,nor);tang=qrotate(q,tang);
#endif
q=quaternion(instanceAxis,PI*0.5);pos=qrotate(q,pos)*float(GRID_SIZE)+instancePos;nor=qrotate(q,nor);tang=qrotate(q,tang);pos.z+=mod(u_offsetZ,float(GRID_SIZE));v_depth=-pos.z;pos=goalBlackTunnelTransform(pos);
#ifdef IS_HD
v_ao=ao;v_emission=areaRatio<0.25 ? sin(pos.z*0.25-u_time)*0.5+0.5 : 0.;
#else
v_ao=1.;v_emission=0.;
#endif
v_opacity=linearStep(57.,30.,length(pos.xy))*linearStep(5.+100.,5.+100.-20.,cameraPosition.z-pos.z);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}`;
const frag$k = `#define GLSLIFY 1
uniform sampler2D u_feedbackTexture;uniform sampler2D u_greebleArmbTexture;uniform sampler2D u_greebleNormalTexture;uniform vec2 u_resolution;uniform float u_outRatio;uniform vec3 u_outBloomFromToStrength;uniform vec3 u_color1;uniform vec3 u_color2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec4 v_rands;varying float v_ao;varying float v_opacity;varying float v_emission;varying float v_depth;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 worldNormal=normalize(v_worldNormal)*faceDirection;vec3 worldTangent=normalize(v_worldTangent.xyz)*faceDirection;vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_greebleNormalTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_greebleArmbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 lightPos=vec3(0.0,-0.0,-100.0);vec3 toLight=normalize(lightPos-v_worldPosition);float diffuse=(dot(worldNormal,toLight)*0.5+0.5);
#ifdef IS_HD
float feedbackMultiplier=2.5;
#else
float feedbackMultiplier=2.0;
#endif
vec3 color1=u_color1;vec3 color2=u_color2;vec3 baseColor=0.5+mix(color1,color2,v_rands.x)*1.2;vec3 emissiveColor=mix(color1,color2,v_rands.y)*3.5;diffuse*=(0.5+texture2D(u_feedbackTexture,screenUv+worldNormal.xy*0.02).r*feedbackMultiplier);gl_FragColor.rgb=baseColor*vec3(ao*0.75*diffuse)+emissiveColor*v_emission;gl_FragColor.rgb*=v_opacity;float endBloomStrength=linearStep(u_outBloomFromToStrength.x,u_outBloomFromToStrength.y,v_depth)*u_outBloomFromToStrength.z;float bloomScale=linearStep(5.0,20.0,v_depth)*(1.0-linearStep(15.0,25.0,length(v_worldPosition.xy)));gl_FragColor.a=bloomScale*max(0.,dot(gl_FragColor.rgb,vec3(.299,.587,.114))*2.5-1.)+endBloomStrength*0.75;gl_FragColor.rgb+=endBloomStrength*(0.35+gl_FragColor.rgb*0.65);}`;
const goalBlackTunnelTransformShader = `#define GLSLIFY 1
uniform float u_blackTunnelTransformRatio;vec3 goalBlackTunnelTransform(vec3 pos){float t=u_blackTunnelTransformRatio*6.2831853;float zWeight=pos.z*0.025;float angle=t*zWeight*zWeight*sign(zWeight);float sa=sin(angle);float ca=cos(angle);mat2 m2=mat2(ca,-sa,sa,ca);pos.xy=m2*pos.xy;pos.z+=t*1.;pos=pos.xzy;float rad=20.;pos/=rad;vec3 a=pos;vec2 pq=vec2(-1.,.5)*t;float ada=dot(a,a);vec4 b=vec4(2.*a,ada-1.)/(1.+ada);vec4 pq_cs=vec4(cos(pq),sin(pq)).xzyw;vec2 np1=vec2(-1.,1.);vec4 c=(b.xxyy*np1.yxyy*pq_cs+b.zzww*np1.yyxy*pq_cs.yxwz).xzyw;pos=c.xyz/(1.-c.w);pos=pos.xzy;return pos*rad;}`;
class PostEffect {
  sharedUniforms = {};
  enabled = true;
  material = null;
  renderOrder = 0;
  _hasShownWarning = false;
  init(e) {
    Object.assign(this, e);
  }
  needsRender() {
    return true;
  }
  warn(e) {
    if (!this._hasShownWarning) {
      console.warn(e);
      this._hasShownWarning = true;
    }
  }
  setPostprocessing(e) {}
  render(e, t = false) {
    if (this.material.uniforms.u_texture) {
      this.material.uniforms.u_texture.value = e.fromTexture;
    }
    fboHelper.render(this.material, t ? null : e.toRenderTarget);
    e.swap();
  }
}
const fragmentShader$4 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform mat4 u_projectionViewInverseMatrix;uniform mat4 u_prevProjectionViewMatrix;uniform vec2 u_aspect;uniform float u_amount;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 bnoise=getBlueNoise(gl_FragCoord.xy);float depth=texture2D(u_depthTexture,v_uv+bnoise.yz*0.01*u_aspect).r;vec4 ndc=vec4(v_uv.xy*2.0-1.0,depth,1.0);vec4 worldPos=u_projectionViewInverseMatrix*ndc;vec4 prevPos=u_prevProjectionViewMatrix*worldPos;prevPos/=prevPos.w;prevPos.xy=prevPos.xy*0.5+0.5;vec2 velocity=(prevPos.xy-v_uv)/16.0*u_amount;vec2 uv=v_uv+bnoise.xy*velocity;vec4 color=vec4(0.0);float weightSum=0.0;float weight=1.0;float weightFalloff=1.0;for(int i=0;i<16;i++){color+=texture2D(u_texture,uv)*weight;uv+=velocity;weightSum+=weight;weight*=weightFalloff;}gl_FragColor=color/weightSum;}`;
class GoalTunnelEfx extends PostEffect {
  needsSync = true;
  amount = 1;
  _position = null;
  _quaternion = null;
  _scale = null;
  _q = null;
  projectionMatrix = null;
  prevProjectionMatrix = null;
  projectionViewMatrix = null;
  prevProjectionViewMatrix = null;
  projectionViewInverseMatrix = null;
  offsetPostion = null;
  offsetRotation = null;
  offsetScale = null;
  isActive = false;
  init(e) {
    Object.assign(this, e);
    super.init();
    this._position = new Vector3();
    this._quaternion = new Quaternion();
    this._scale = new Vector3(1, 1, 1);
    this._q = new Quaternion();
    this.offsetPostion = new Vector3(0, 0, 0);
    this.offsetRotation = new Euler(0, 0, 0);
    this.offsetScale = new Vector3(1, 1, 1);
    this.projectionViewMatrix = new Matrix4();
    this.prevProjectionViewMatrix = new Matrix4();
    this.projectionViewInverseMatrix = new Matrix4();
    this.finalPrevMatrix = new Matrix4();
    this.extraTransformMatrix = new Matrix4();
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time,
        u_texture: {
          value: null
        },
        u_depthTexture: {
          value: null
        },
        u_amount: {
          value: 1
        },
        u_aspect: properties.postprocessing.sharedUniforms.u_aspect,
        u_projectionViewInverseMatrix: {
          value: this.projectionViewInverseMatrix
        },
        u_prevProjectionViewMatrix: {
          value: this.finalPrevMatrix
        }
      }, blueNoise.sharedUniforms),
      fragmentShader: fragmentShader$4
    });
  }
  needsRender(e) {
    let t = this.amount > 0;
    this.needsSync = !t;
    return t && this.isActive;
  }
  syncCamera(e) {
    this.needsSync = true;
    if (e) {
      e.matrixWorldInverse.decompose(this._position, this._quaternion, this._scale);
      this.projectionViewMatrix.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
      this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert();
    }
    this.prevProjectionViewMatrix.copy(this.projectionViewMatrix);
  }
  render(e, t = false) {
    let r = e.camera;
    this.material.uniforms.u_depthTexture = e.sharedUniforms.u_sceneDepthTexture;
    this.material.uniforms.u_amount.value = this.amount;
    if (this.needsSync || e.hasSizeChanged) {
      this.syncCamera(r);
      this.needsSync = false;
    } else {
      this.prevProjectionViewMatrix.copy(this.projectionViewMatrix);
    }
    this.projectionViewMatrix.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse);
    this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert();
    this.extraTransformMatrix.compose(this.offsetPostion, this._q.setFromEuler(this.offsetRotation), this.offsetScale).invert();
    this.finalPrevMatrix.copy(this.prevProjectionViewMatrix);
    this.finalPrevMatrix.multiply(this.extraTransformMatrix);
    super.render(e, t);
  }
}
const goalTunnelEfx = new GoalTunnelEfx();
const _c1$3 = new Color();
const _c2$2 = new Color();
const COLOR_1 = ["#0d2b27", "#ba0000", "#00b5a6", "#0099ff"];
const COLOR_2 = ["#8c8c8c", "#008e6b", "#7e7f05", "#ff0000"];
class GoalBlackTunnel {
  container = new Object3D();
  GRID_SIZE = 20;
  textures = {};
  feedbackRenderTarget = null;
  _structureGeometries = {};
  _baseGeometries = {};
  sharedUniforms = {
    u_blackTunnelTransformRatio: {
      value: 0
    },
    u_showRatio: {
      value: 1
    },
    u_outBloomFromToStrength: {
      value: new Vector3(0, 70, 0)
    },
    u_offsetZ: {
      value: 0
    },
    u_feedbackTexture: {
      value: null
    },
    u_greebleArmbTexture: {
      value: null
    },
    u_greebleNormalTexture: {
      value: null
    },
    u_color1: {
      value: new Color()
    },
    u_color2: {
      value: new Color()
    }
  };
  textureTypeList = ["arm", "base", "nor"];
  timeBasedPulseTime = 0;
  timeBasedLinearTime = 0;
  preInit() {
    let e = ["ld", "hd"];
    shaderHelper.addChunk("goalBlackTunnelTransform", goalBlackTunnelTransformShader);
    this.feedbackRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.feedbackRenderTarget.texture.wrapS = this.feedbackRenderTarget.texture.wrapT = MirroredRepeatWrapping;
    this.sharedUniforms.u_feedbackTexture.value = this.feedbackRenderTarget.texture;
    for (let t = 0; t < e.length; t++) {
      let r = e[t];
      properties.loader.add(settings.MODEL_PATH + "tunnels/grid_structure_" + r + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, r, "structure")
      });
      properties.loader.add(settings.MODEL_PATH + "tunnels/grid_base_" + r + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, r, "base")
      });
    }
    for (let t = 0; t < this.textureTypeList.length; t++) {
      let r = this.textureTypeList[t];
      properties.loader.add(settings.TEXTURE_PATH + "tunnels/grids/greeble_" + r + ".webp", {
        type: "texture",
        onLoad: this._onGreebleTextureLoad.bind(this, r)
      });
    }
  }
  _onGeometryLoad(e, t, r) {
    if (t == "structure") {
      this._structureGeometries[e] = r;
    } else {
      this._baseGeometries[e] = r;
    }
    let n = this._baseGeometries[e];
    let a = this._structureGeometries[e];
    if (n && a && n.attributes && a.attributes && a.attributes.position && a.attributes.gridIds && a.attributes.rotAxis) {
      let l = new InstancedBufferGeometry();
      for (let f in n.attributes) {
        l.attributes[f] = n.attributes[f];
      }
      l.index = n.index;
      l.setAttribute("instancePos", new InstancedBufferAttribute(a.attributes.position.array, 3));
      l.setAttribute("instanceGridIds", new InstancedBufferAttribute(a.attributes.gridIds.array, 3));
      l.setAttribute("instanceAxis", new InstancedBufferAttribute(a.attributes.rotAxis.array, 3));
      let c = Object.assign({
        u_time: goalTunnels.sharedUniforms.u_tunnelTime,
        u_resolution: properties.sharedUniforms.u_resolution
      }, this.sharedUniforms);
      let u = new Mesh(l, new ShaderMaterial({
        uniforms: c,
        vertexShader: vert$h,
        fragmentShader: frag$k,
        side: DoubleSide
      }));
      u.material.defines.GRID_SIZE = this.GRID_SIZE;
      u.material.defines.IS_HD = e == "hd";
      u.frustumCulled = false;
      if (e == "hd") {
        u.onAfterRender = this._onAfterRender.bind(this);
        u.renderOrder = 2;
      } else {
        u.renderOrder = 1;
      }
      this.container.add(u);
    }
  }
  _onAfterRender() {
    let e = fboHelper.getColorState();
    let t = fboHelper.renderer.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState(t);
    fboHelper.copy(t.texture, this.feedbackRenderTarget);
    fboHelper.renderer.setRenderTarget(t);
    fboHelper.setColorState(e);
  }
  _onGreebleTextureLoad(e, t) {
    this.textures[e] = t;
    t.wrapS = t.wrapT = RepeatWrapping;
    if (e == "arm" || e == "base") {
      let r = this.textures.arm;
      let n = this.textures.base;
      if (r && n) {
        let a = fboHelper.createRenderTarget(r.image.width, r.image.height, false, false);
        a.texture.wrapS = a.texture.wrapT = RepeatWrapping;
        this.textures.arm = this.textures.base = null;
        fboHelper.copy(textureHelper.transparentTexture, a);
        textureHelper.mixChannels(r, a, 0, 1, 2, -1);
        textureHelper.mixChannels(n, a, -1, -1, -1, 0);
        r.dispose();
        n.dispose();
        this.sharedUniforms.u_greebleArmbTexture.value = a.texture;
      }
    } else {
      this.sharedUniforms.u_greebleNormalTexture.value = t;
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = 0;
    let r = Math.floor(properties.width * 0.25);
    let n = Math.floor(properties.height * 0.25);
    if (this.feedbackRenderTarget.width != r || this.feedbackRenderTarget.height != n) {
      this.feedbackRenderTarget.setSize(r, n);
      fboHelper.clearColor(0, 0, 0, 1, this.feedbackRenderTarget);
    }
    let a = math.cUnMix(0.2, 0, goalTunnels.blackTunnelRatio) * -80;
    t += a - this.container.position.z;
    this.container.position.z = a;
    this.sharedUniforms.u_showRatio.value = goalTunnels.isBlackTunnelActive ? ease.expoIn(math.cUnMix(0, 0.1, goalTunnels.blackTunnelRatio)) : 0;
    let l = this.sharedUniforms.u_outBloomFromToStrength.value;
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.65, 0.75, 0, 0.2);
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, l.z, 0.15);
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.85, 1, l.z, 0.15);
    l.x = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, 20, 60);
    l.x = math.fit(goalTunnels.blackTunnelRatio, 0.9, 1, l.x, 30);
    let c = math.fit(goalTunnels.blackTunnelRatio, 0.6, 1, 0, 1, ease.sineIn);
    this.sharedUniforms.u_blackTunnelTransformRatio.value = c;
    const u = (input.lastScrollYDirection < 0 ? -1 : 1) * goalTunnels.tunnelDeltaTime;
    this.timeBasedPulseTime += u * math.cUnMix(0.1, 0.3, goalTunnels.blackTunnelRatio) * math.fit(c, 0, 0.25, 1, 0.5);
    this.timeBasedLinearTime += u * math.fit(c, 0, 0.25, 1.5, 1);
    let f = this.timeBasedPulseTime;
    let p = Math.floor(f);
    let g = f - p;
    let _ = (p + ease.cubicInOut(g)) * this.GRID_SIZE + this.timeBasedLinearTime * this.GRID_SIZE + goalTunnels.blackTunnelRatio * this.GRID_SIZE * 10;
    t += _ - this.sharedUniforms.u_offsetZ.value;
    this.sharedUniforms.u_offsetZ.value = _;
    goalTunnels.properties.cameraDollyZoomFovOffset = Math.sin(goalTunnels.blackTunnelRatio * 10 + properties.time * 1) * 7.5 * math.smoothstep(0, 0.2, goalTunnels.blackTunnelRatio);
    let T = COLOR_1.length * math.fit(goalTunnels.blackTunnelRatio, 0.2, 1, 0, 1);
    let M = Math.floor(T);
    let S = Math.min(Math.ceil(T), COLOR_1.length - 1);
    let b = T - M;
    _c1$3.set(COLOR_1[M]);
    _c2$2.set(COLOR_1[S]);
    _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0);
    this.sharedUniforms.u_color1.value.copy(_c1$3);
    _c1$3.set(COLOR_2[M]);
    _c2$2.set(COLOR_2[S]);
    _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0);
    this.sharedUniforms.u_color2.value.copy(_c1$3);
    goalTunnelEfx.offsetPostion.z = t * math.fit(goalTunnels.blackTunnelRatio, 0, 0.2, 0, 1);
    goalTunnelEfx.offsetRotation.z = t * c * 0.01;
    goalTunnelEfx.amount = 1;
  }
}
const goalBlackTunnel = new GoalBlackTunnel();
const _changeEvent = {
  type: "change"
};
const _startEvent = {
  type: "start"
};
const _endEvent = {
  type: "end"
};
class OrbitControls extends EventDispatcher {
  constructor(e, t) {
    super();
    if (t === undefined) {
      console.warn("THREE.OrbitControls: The second parameter \"domElement\" is now mandatory.");
    }
    if (t === document) {
      console.error("THREE.OrbitControls: \"document\" should not be used as the target \"domElement\". Please use \"renderer.domElement\" instead.");
    }
    this.object = e;
    this.domElement = t;
    this.domElement.style.touchAction = "none";
    this.enabled = true;
    this.target = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.15;
    this.enableZoom = false;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    };
    this.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    };
    this.touches = {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.scale = 1;
    this._domElementKeyEvents = null;
    this.getPolarAngle = function () {
      return c.phi;
    };
    this.getAzimuthalAngle = function () {
      return c.theta;
    };
    this.getDistance = function () {
      return this.object.position.distanceTo(this.target);
    };
    this.listenToKeyEvents = function (Y) {
      Y.addEventListener("keydown", Oe);
      this._domElementKeyEvents = Y;
    };
    this.saveState = function () {
      r.target0.copy(r.target);
      r.position0.copy(r.object.position);
      r.zoom0 = r.object.zoom;
    };
    this.reset = function () {
      r.target.copy(r.target0);
      r.object.position.copy(r.position0);
      r.object.zoom = r.zoom0;
      r.scale = 1;
      r.object.updateProjectionMatrix();
      r.dispatchEvent(_changeEvent);
      r.update();
      a = n.NONE;
    };
    this.update = function () {
      const Y = new Vector3();
      const we = new Quaternion().setFromUnitVectors(e.up, new Vector3(0, 1, 0));
      const Ee = we.clone().invert();
      const Fe = new Vector3();
      const Xe = new Quaternion();
      const tt = Math.PI * 2;
      return function () {
        const ot = r.object.position;
        Y.copy(ot).sub(r.target);
        Y.applyQuaternion(we);
        c.setFromVector3(Y);
        if (r.autoRotate && a === n.NONE) {
          k(I());
        }
        if (r.enableDamping) {
          c.theta += u.theta * r.dampingFactor;
          c.phi += u.phi * r.dampingFactor;
        } else {
          c.theta += u.theta;
          c.phi += u.phi;
        }
        let je = r.minAzimuthAngle;
        let We = r.maxAzimuthAngle;
        if (isFinite(je) && isFinite(We)) {
          if (je < -Math.PI) {
            je += tt;
          } else if (je > Math.PI) {
            je -= tt;
          }
          if (We < -Math.PI) {
            We += tt;
          } else if (We > Math.PI) {
            We -= tt;
          }
          if (je <= We) {
            c.theta = Math.max(je, Math.min(We, c.theta));
          } else {
            c.theta = c.theta > (je + We) / 2 ? Math.max(je, c.theta) : Math.min(We, c.theta);
          }
        }
        c.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, c.phi));
        c.makeSafe();
        let Ge = r.enableDamping ? (r.scale - 1) * r.dampingFactor + 1 : r.scale;
        c.radius *= Ge;
        c.radius = Math.max(r.minDistance, Math.min(r.maxDistance, c.radius));
        if (r.enableDamping === true) {
          r.target.addScaledVector(f, r.dampingFactor);
        } else {
          r.target.add(f);
        }
        Y.setFromSpherical(c);
        Y.applyQuaternion(Ee);
        ot.copy(r.target).add(Y);
        r.object.lookAt(r.target);
        if (r.enableDamping === true) {
          u.theta *= 1 - r.dampingFactor;
          u.phi *= 1 - r.dampingFactor;
          f.multiplyScalar(1 - r.dampingFactor);
        } else {
          u.set(0, 0, 0);
          f.set(0, 0, 0);
        }
        r.scale = r.scale / Ge;
        if (p || Fe.distanceToSquared(r.object.position) > l || (1 - Xe.dot(r.object.quaternion)) * 8 > l) {
          r.dispatchEvent(_changeEvent);
          Fe.copy(r.object.position);
          Xe.copy(r.object.quaternion);
          p = false;
          return true;
        } else {
          return false;
        }
      };
    }();
    this.dispose = function () {
      r.domElement.removeEventListener("contextmenu", W);
      r.domElement.removeEventListener("pointerdown", Ue);
      r.domElement.removeEventListener("pointercancel", Me);
      r.domElement.removeEventListener("wheel", $);
      r.domElement.removeEventListener("pointermove", fe);
      r.domElement.removeEventListener("pointerup", Se);
      if (r._domElementKeyEvents !== null) {
        r._domElementKeyEvents.removeEventListener("keydown", Oe);
      }
    };
    const r = this;
    const n = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = n.NONE;
    const l = 0.000001;
    const c = new Spherical();
    const u = new Spherical();
    const f = new Vector3();
    let p = false;
    const g = new Vector2();
    const v = new Vector2();
    const _ = new Vector2();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector2();
    const C = new Vector2();
    const w = new Vector2();
    const R = [];
    const E = {};
    function I() {
      return Math.PI * 2 / 60 / 60 * r.autoRotateSpeed;
    }
    function F() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function k(Y) {
      u.theta -= Y;
    }
    function L(Y) {
      u.phi -= Y;
    }
    const D = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        Y.setFromMatrixColumn(Fe, 0);
        Y.multiplyScalar(-Ee);
        f.add(Y);
      };
    }();
    const ne = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        if (r.screenSpacePanning === true) {
          Y.setFromMatrixColumn(Fe, 1);
        } else {
          Y.setFromMatrixColumn(Fe, 0);
          Y.crossVectors(r.object.up, Y);
        }
        Y.multiplyScalar(Ee);
        f.add(Y);
      };
    }();
    const re = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        const Xe = r.domElement;
        if (r.object.isPerspectiveCamera) {
          const tt = r.object.position;
          Y.copy(tt).sub(r.target);
          let Re = Y.length();
          Re *= Math.tan(r.object.fov / 2 * Math.PI / 180);
          D(Ee * 2 * Re / Xe.clientHeight, r.object.matrix);
          ne(Fe * 2 * Re / Xe.clientHeight, r.object.matrix);
        } else if (r.object.isOrthographicCamera) {
          D(Ee * (r.object.right - r.object.left) / r.object.zoom / Xe.clientWidth, r.object.matrix);
          ne(Fe * (r.object.top - r.object.bottom) / r.object.zoom / Xe.clientHeight, r.object.matrix);
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          r.enablePan = false;
        }
      };
    }();
    function ce(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale /= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function z(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale *= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function j(Y) {
      g.set(Y.clientX, Y.clientY);
    }
    function X(Y) {
      b.set(Y.clientX, Y.clientY);
    }
    function Z(Y) {
      T.set(Y.clientX, Y.clientY);
    }
    function q(Y) {
      v.set(Y.clientX, Y.clientY);
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
      r.update();
    }
    function ue(Y) {
      C.set(Y.clientX, Y.clientY);
      w.subVectors(C, b);
      if (w.y > 0) {
        ce(F());
      } else if (w.y < 0) {
        z(F());
      }
      b.copy(C);
      r.update();
    }
    function oe(Y) {
      M.set(Y.clientX, Y.clientY);
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
      r.update();
    }
    function te(Y) {
      if (Y.deltaY < 0) {
        z(F());
      } else if (Y.deltaY > 0) {
        ce(F());
      }
      r.update();
    }
    function le(Y) {
      let we = false;
      switch (Y.code) {
        case r.keys.UP:
          re(0, r.keyPanSpeed);
          we = true;
          break;
        case r.keys.BOTTOM:
          re(0, -r.keyPanSpeed);
          we = true;
          break;
        case r.keys.LEFT:
          re(r.keyPanSpeed, 0);
          we = true;
          break;
        case r.keys.RIGHT:
          re(-r.keyPanSpeed, 0);
          we = true;
          break;
      }
      if (we) {
        Y.preventDefault();
        r.update();
      }
    }
    function Te() {
      if (R.length === 1) {
        g.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        g.set(Y, we);
      }
    }
    function K() {
      if (R.length === 1) {
        T.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        T.set(Y, we);
      }
    }
    function G() {
      const Y = R[0].pageX - R[1].pageX;
      const we = R[0].pageY - R[1].pageY;
      const Ee = Math.sqrt(Y * Y + we * we);
      b.set(0, Ee);
    }
    function U() {
      if (r.enableZoom) {
        G();
      }
      if (r.enablePan) {
        K();
      }
    }
    function N() {
      if (r.enableZoom) {
        G();
      }
      if (r.enableRotate) {
        Te();
      }
    }
    function he(Y) {
      if (R.length == 1) {
        v.set(Y.pageX, Y.pageY);
      } else {
        const Ee = Le(Y);
        const Fe = (Y.pageX + Ee.x) * 0.5;
        const Xe = (Y.pageY + Ee.y) * 0.5;
        v.set(Fe, Xe);
      }
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
    }
    function ve(Y) {
      if (R.length === 1) {
        M.set(Y.pageX, Y.pageY);
      } else {
        const we = Le(Y);
        const Ee = (Y.pageX + we.x) * 0.5;
        const Fe = (Y.pageY + we.y) * 0.5;
        M.set(Ee, Fe);
      }
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
    }
    function de(Y) {
      const we = Le(Y);
      const Ee = Y.pageX - we.x;
      const Fe = Y.pageY - we.y;
      const Xe = Math.sqrt(Ee * Ee + Fe * Fe);
      C.set(0, Xe);
      w.set(0, Math.pow(C.y / b.y, r.zoomSpeed));
      ce(w.y);
      b.copy(C);
    }
    function xe(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enablePan) {
        ve(Y);
      }
    }
    function ee(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enableRotate) {
        he(Y);
      }
    }
    function Ue(Y) {
      if (r.enabled !== false) {
        if (R.length === 0) {
          r.domElement.setPointerCapture(Y.pointerId);
          r.domElement.addEventListener("pointermove", fe);
          r.domElement.addEventListener("pointerup", Se);
        }
        O(Y);
        if (Y.pointerType === "touch") {
          Ye(Y);
        } else {
          Be(Y);
        }
      }
    }
    function fe(Y) {
      if (r.enabled !== false) {
        if (Y.pointerType === "touch") {
          st(Y);
        } else {
          se(Y);
        }
      }
    }
    function Se(Y) {
      me(Y);
      if (R.length === 0) {
        r.domElement.releasePointerCapture(Y.pointerId);
        r.domElement.removeEventListener("pointermove", fe);
        r.domElement.removeEventListener("pointerup", Se);
      }
      r.dispatchEvent(_endEvent);
      a = n.NONE;
    }
    function Me(Y) {
      me(Y);
    }
    function Be(Y) {
      let we;
      switch (Y.button) {
        case 0:
          we = r.mouseButtons.LEFT;
          break;
        case 1:
          we = r.mouseButtons.MIDDLE;
          break;
        case 2:
          we = r.mouseButtons.RIGHT;
          break;
        default:
          we = -1;
      }
      switch (we) {
        case MOUSE.DOLLY:
          if (r.enableZoom === false) {
            return;
          }
          X(Y);
          a = n.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          } else {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          } else {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function se(Y) {
      if (r.enabled !== false) {
        switch (a) {
          case n.ROTATE:
            if (r.enableRotate === false) {
              return;
            }
            q(Y);
            break;
          case n.DOLLY:
            if (r.enableZoom === false) {
              return;
            }
            ue(Y);
            break;
          case n.PAN:
            if (r.enablePan === false) {
              return;
            }
            oe(Y);
            break;
        }
      }
    }
    function $(Y) {
      if (r.enabled !== false && r.enableZoom !== false && a === n.NONE) {
        r.dispatchEvent(_startEvent);
        te(Y);
        r.dispatchEvent(_endEvent);
      }
    }
    function Oe(Y) {
      if (r.enabled !== false && r.enablePan !== false) {
        le(Y);
      }
    }
    function Ye(Y) {
      Ie(Y);
      switch (R.length) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === false) {
                return;
              }
              Te();
              a = n.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (r.enablePan === false) {
                return;
              }
              K();
              a = n.TOUCH_PAN;
              break;
            default:
              a = n.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === false && r.enablePan === false) {
                return;
              }
              U();
              a = n.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === false && r.enableRotate === false) {
                return;
              }
              N();
              a = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = n.NONE;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function st(Y) {
      Ie(Y);
      switch (a) {
        case n.TOUCH_ROTATE:
          if (r.enableRotate === false) {
            return;
          }
          he(Y);
          r.update();
          break;
        case n.TOUCH_PAN:
          if (r.enablePan === false) {
            return;
          }
          ve(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (r.enableZoom === false && r.enablePan === false) {
            return;
          }
          xe(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === false && r.enableRotate === false) {
            return;
          }
          ee(Y);
          r.update();
          break;
        default:
          a = n.NONE;
      }
    }
    function W(Y) {
      r.enabled;
    }
    function O(Y) {
      R.push(Y);
    }
    function me(Y) {
      delete E[Y.pointerId];
      for (let we = 0; we < R.length; we++) {
        if (R[we].pointerId == Y.pointerId) {
          R.splice(we, 1);
          return;
        }
      }
    }
    function Ie(Y) {
      let we = E[Y.pointerId];
      if (we === undefined) {
        we = new Vector2();
        E[Y.pointerId] = we;
      }
      we.set(Y.pageX, Y.pageY);
    }
    function Le(Y) {
      const we = Y.pointerId === R[0].pointerId ? R[1] : R[0];
      return E[we.pointerId];
    }
    r.domElement.addEventListener("contextmenu", W);
    r.domElement.addEventListener("pointerdown", Ue);
    r.domElement.addEventListener("pointercancel", Me);
    r.domElement.addEventListener("wheel", $, {
      passive: false
    });
    this.update();
  }
}
class DeviceOrientationControls {
  object = null;
  enabled = true;
  hasValue = false;
  deviceOrientation = {};
  screenOrientation = 0;
  alphaOffset = 0;
  zee = new Vector3(0, 0, 1);
  euler = new Euler();
  q0 = new Quaternion();
  q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
  _onBoundDeviceOrientationChangeEvent;
  _onBoundScreenOrientationChangeEvent;
  constructor(e) {
    this.object = e;
    this.object.rotation.reorder("YXZ");
    this._onBoundDeviceOrientationChangeEvent = this._onDeviceOrientationChangeEvent.bind(this);
    this._onBoundScreenOrientationChangeEvent = this._onScreenOrientationChangeEvent.bind(this);
    this.connect();
  }
  _onDeviceOrientationChangeEvent(e) {
    this.deviceOrientation = e;
  }
  _onScreenOrientationChangeEvent() {
    this.screenOrientation = window.orientation || 0;
  }
  setObjectQuaternion(e, t, r, n, a) {
    this.euler.set(r, t, -n, "YXZ");
    e.setFromEuler(this.euler);
    e.multiply(this.q1);
    e.multiply(this.q0.setFromAxisAngle(this.zee, -a));
  }
  connect() {
    this._onBoundScreenOrientationChangeEvent();
    if (window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission == "function") {
      window.DeviceOrientationEvent.requestPermission().then(e => {
        if (e == "granted") {
          window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
          window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
        }
      }).catch(function (e) {});
    } else {
      window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
      window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    }
    this.enabled = true;
  }
  disconnect() {
    window.removeEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
    window.removeEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    this.enabled = false;
  }
  update() {
    if (this.enabled === false) {
      return;
    }
    let e = this.deviceOrientation;
    if (e) {
      let t = e.alpha ? MathUtils$1.degToRad(e.alpha) + this.alphaOffset : 0;
      let r = e.beta ? MathUtils$1.degToRad(e.beta) : 0;
      let n = e.gamma ? MathUtils$1.degToRad(e.gamma) : 0;
      let a = this.screenOrientation ? MathUtils$1.degToRad(this.screenOrientation) : 0;
      this.setObjectQuaternion(this.object.quaternion, t, r, n, a);
      this.hasValue = this.hasValue || e.alpha && e.beta && e.gamma;
    }
  }
  dispose() {
    this.disconnect();
  }
}
class CameraControls {
  useOrbitControls = false;
  preInit(e) {
    this.DEFAULT_CAMERA_POSITION = new Vector3(0, 0, 5);
    this.DEFAULT_LOOKAT_POSITION = new Vector3(0, 0, 0);
    this._brownianMotion = null;
    this._orbitControls = null;
    this._orbitCamera = null;
    this._deviceOrientationControls = null;
    this._baseDeviceControlQuaternion = null;
    this._targetDeviceControlQuaternion = null;
    this._deviceOrientationCamera = null;
    this._hasDeviceOrientationControlValues = false;
    this._q = new Quaternion();
    this._e = new Euler();
    this._v1 = new Vector3();
    this._v2 = new Vector3();
    this._camera = properties.camera;
    this._deviceOrientationEuler = new Euler();
    this._camera.position.copy(this.DEFAULT_CAMERA_POSITION);
    this._brownianMotion = new BrownianMotion();
    if (this.useOrbitControls === true) {
      this._orbitCamera = this._camera.clone();
      this._orbitControls = new OrbitControls(this._orbitCamera, document.documentElement);
      this._orbitControls.enableDamping = true;
      this._orbitControls.target0.copy(this.DEFAULT_LOOKAT_POSITION);
      this._orbitControls.reset();
    }
    if (browser$1.isMobile) {
      this._deviceOrientationCamera = new Camera();
      this._baseDeviceControlQuaternion = new Quaternion();
      this._targetDeviceControlQuaternion = new Quaternion();
      let t = () => {
        this._deviceOrientationControls = new DeviceOrientationControls(this._deviceOrientationCamera);
        this._deviceOrientationControls.connect();
      };
      if (browser$1.isIOS) {
        properties.onFirstClicked.addOnce(t);
      } else {
        t();
      }
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = this._camera;
    this.DEFAULT_CAMERA_POSITION.copy(properties.defaultCameraPosition);
    this.DEFAULT_LOOKAT_POSITION.copy(properties.defaultLookAtPosition);
    t.near = properties.cameraNear;
    t.far = properties.cameraFar;
    t.matrix.identity();
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    t.position.copy(this.DEFAULT_CAMERA_POSITION);
    t.lookAt(this.DEFAULT_LOOKAT_POSITION);
    if (browser$1.isMobile && this._deviceOrientationControls) {
      this._deviceOrientationControls.update();
    }
    if (this.useOrbitControls === true) {
      this._orbitControls.update();
      this._orbitCamera.updateMatrix();
      this._orbitCamera.matrix.decompose(t.position, t.quaternion, t.scale);
    }
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      this.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    } else {
      this.cameraDistance = this._v2.copy(this.DEFAULT_LOOKAT_POSITION).sub(t.position).dot(this._v1);
    }
    if (properties.cameraUsePhysical) {
      t.filmGauge = properties.cameraFilmGauge;
      t.setFocalLength(properties.cameraFocalLength);
    } else {
      t.fov = properties.cameraFov;
    }
    let r = t.fov;
    t.fov += properties.cameraDollyZoomFovOffset;
    let n = this.cameraDistance;
    n = n * Math.tan(r / 360 * Math.PI / 2) / Math.tan(t.fov / 360 * Math.PI / 2) - n;
    t.translateZ(n);
    t.setViewOffset(properties.viewportWidth, properties.viewportHeight, properties.cameraViewportOffsetX, properties.cameraViewportOffsetY, properties.viewportWidth, properties.viewportHeight);
    t.fov = r;
    this.cameraDistance += n;
    if (browser$1.isMobile) {
      if (this._deviceOrientationControls) {
        this._deviceOrientationControls.update();
        if (this._deviceOrientationControls.hasValue) {
          if (!this._hasDeviceOrientationControlValues) {
            this._targetDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
            this._baseDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
          }
          this._targetDeviceControlQuaternion.slerp(this._deviceOrientationCamera.quaternion, 0.15);
          this._baseDeviceControlQuaternion.slerp(this._targetDeviceControlQuaternion, 0.15);
          this._q.copy(this._baseDeviceControlQuaternion).invert().multiply(this._targetDeviceControlQuaternion);
          this._deviceOrientationEuler.setFromQuaternion(this._q);
          this._hasDeviceOrientationControlValues = true;
          t.quaternion.multiply(this._q);
        }
      }
    } else {
      t.translateZ(this.cameraDistance * -1);
      let a = math.clamp(input.mouseXY.y, -1, 1) * properties.cameraLookStrength;
      let l = math.clamp(-input.mouseXY.x, -1, 1) * properties.cameraLookStrength;
      properties.cameraLookX += (a - properties.cameraLookX) * properties.cameraLookEaseDamp;
      properties.cameraLookY += (l - properties.cameraLookY) * properties.cameraLookEaseDamp;
      this._e.set(properties.cameraLookX, properties.cameraLookY, 0);
      this._q.setFromEuler(this._e);
      t.quaternion.multiply(this._q);
      t.translateZ(this.cameraDistance);
    }
    t.matrix.compose(t.position, t.quaternion, t.scale);
    this._brownianMotion.positionAmplitude = properties.cameraShakePositionStrength;
    this._brownianMotion.positionFrequency = properties.cameraShakePositionSpeed;
    this._brownianMotion.rotationAmplitude = properties.cameraShakeRotationStrength;
    this._brownianMotion.rotationFrequency = properties.cameraShakeRotationSpeed;
    this._brownianMotion.update(e);
    t.matrix.multiply(this._brownianMotion.matrix);
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      properties.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    }
    t.updateMatrixWorld();
    properties.cameraDirection.set(0, 0, 1).applyMatrix4(t.matrixWorld).sub(this._v1.set(0, 0, 0).applyMatrix4(t.matrixWorld)).normalize();
  }
}
const cameraControls = new CameraControls();
const vert$g = `#define GLSLIFY 1
uniform float u_time;uniform sampler2D u_animationPositionTexture;uniform sampler2D u_animationOrientTexture;uniform vec2 u_animationTextureSize;uniform float u_loopLinearBlend;attribute vec2 boneIndices;attribute vec2 boneWeights;attribute vec4 tangent;attribute float ao;attribute vec3 instancePos;attribute vec4 instanceOrient;attribute vec3 instanceAnimationFrameFromToBlend1;attribute vec3 instanceAnimationFrameFromToBlend2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying vec2 v_uv;varying float v_ao;
#define PI 3.14159265359
vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void computeTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec4 uvBone12){vec3 bonePos1=texture2D(u_animationPositionTexture,uvBone12.xy).xyz;vec3 bonePos2=texture2D(u_animationPositionTexture,uvBone12.zw).xyz;vec4 boneOrient1=texture2D(u_animationOrientTexture,uvBone12.xy);vec4 boneOrient2=texture2D(u_animationOrientTexture,uvBone12.zw);pos=(qrotate(boneOrient1,pos)+bonePos1)*boneWeights.x+(qrotate(boneOrient2,pos)+bonePos2)*boneWeights.y;nor=normalize(qrotate(boneOrient1,nor)*boneWeights.x+qrotate(boneOrient2,nor)*boneWeights.y);tang=normalize(qrotate(boneOrient1,tang)*boneWeights.x+qrotate(boneOrient2,tang)*boneWeights.y);}void computeFrameTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec3 instanceAnimationFrameFromToBlend){vec4 dataOffset=boneIndices.xyxy+instanceAnimationFrameFromToBlend.xxyy*float(BONE_COUNT)+0.5;vec4 fromUvsBone12=vec4(floor(mod(dataOffset.xy,u_animationTextureSize.x))+.5,floor(dataOffset.xy/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec4 toUvsBone12=vec4(floor(mod(dataOffset.zw,u_animationTextureSize.x))+.5,floor(dataOffset.zw/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec3 fromPos=pos;vec3 fromNor=nor;vec3 fromTang=tang.xyz;computeTransform(fromPos,fromTang,fromNor,fromUvsBone12);vec3 toPos=pos;vec3 toNor=nor;vec3 toTang=tang.xyz;computeTransform(toPos,toNor,toTang,toUvsBone12);pos=mix(fromPos,toPos,instanceAnimationFrameFromToBlend.z);nor=mix(fromNor,toNor,instanceAnimationFrameFromToBlend.z);tang=mix(fromTang,toTang,instanceAnimationFrameFromToBlend.z);}void main(){v_ao=ao;vec3 posLoop=position;vec3 norLoop=normal;vec3 tangLoop=tangent.xyz;computeFrameTransform(posLoop,norLoop,tangLoop,instanceAnimationFrameFromToBlend1);vec3 posLinear=position;vec3 norLinear=normal;vec3 tangLinear=tangent.xyz;computeFrameTransform(posLinear,norLinear,tangLinear,instanceAnimationFrameFromToBlend2);vec3 pos=mix(posLoop,posLinear,u_loopLinearBlend);vec3 nor=mix(norLoop,norLinear,u_loopLinearBlend);vec3 tang=mix(tangLoop,tangLinear,u_loopLinearBlend);pos=qrotate(instanceOrient,pos)+instancePos.xyz;nor=normalize(qrotate(instanceOrient,nor));tang=normalize(qrotate(instanceOrient,tang));vec4 mvPos=modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;v_viewPosition=-mvPos.xyz;gl_Position=projectionMatrix*mvPos;}`;
const fragWhite = `#define GLSLIFY 1
uniform sampler2D u_matcapTexture;uniform float u_frameOutRatio;uniform float u_faceLedLight;uniform vec3 u_tintColor;uniform vec3 u_cardPosition;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_faceLedColor;uniform sampler2D u_envTexture;
#include <astronautCommon_pars>
float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}vec2 boxIntersection(in vec3 ro,in vec3 rd,vec3 boxSize){vec3 m=1.0/rd;vec3 n=m*ro;vec3 k=abs(m)*boxSize;vec3 t1=-n-k;vec3 t2=-n+k;float tN=max(max(t1.x,t1.y),t1.z);float tF=min(min(t2.x,t2.y),t2.z);if(tN>tF||tF<0.0)return vec2(-1.0);return vec2(tN,tF);}void main(){
#include <astronautCommon>
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),1.);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float outOfFrameRatio=linearStep(0.35,1.0,u_frameOutRatio);vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float metalMask=1.0-metalness;vec3 color=vec3(matcapShading*albedo);color+=0.8*zAxisShading;color*=u_ambientColor*(0.85+sunNdL*0.5);color*=metalMask;color+=(0.5+0.5*outOfFrameRatio)*metalMask*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color*=0.7+0.3*ao;color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 tunnelColor=color*0.75;vec2 dists=boxIntersection(v_worldPosition+vec3(0.,0.,u_whiteTunnelRatio*7.5*5.)+worldNormal*200.,-worldNormal,vec3(7.5,7.5,100.));float dist=200.-dists.x;vec3 hitPos=v_worldPosition+dist*worldNormal;tunnelColor+=vec3(1.)*(abs(worldNormal.x)*0.5+0.5)/dist*(0.25+0.75*ao)*(cos(u_whiteTunnelRatio*6.283185307179586*5.)*0.3+0.7)*3.5*(1.-metalness);color=mix(tunnelColor,color,outOfFrameRatio)*(0.7+armb.r*0.3);vec3 ledLightPos=u_cardPosition;vec3 ledLightDir=ledLightPos-v_worldPosition;float ledLightDist=length(ledLightDir);ledLightDir/=ledLightDist;float attenuationLed=1.0/(16.0*ledLightDist);color+=attenuationLed*u_faceLedLight*u_faceLedColor*getMetalShininess(V,u_cardPosition,N,(1.0-metalness),metalness);attenuationLed=1.0/(16.0*ledLightDist*ledLightDist);color+=0.5*u_faceLedLight*u_faceLedColor*albedo*attenuationLed*(0.5+0.5*saturate(dot(ledLightDir,N)));gl_FragColor.rgb=mix(u_bgColor,color,vec3(u_showRatio*0.8+0.2));
#ifndef IS_HELMET_GLASS
gl_FragColor.rgb+=outOfFrameRatio*max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao;
#endif
gl_FragColor.rgb=min(vec3(1.),gl_FragColor.rgb+u_tintColor*(1.-u_frameOutRatio*0.3)*(0.4+gl_FragColor.b*0.6));gl_FragColor.rgb*=0.95+mix(u_tintColor,vec3(1.0),v_ao)*0.1;gl_FragColor.rgb*=mix(1.,metalMask*0.7+0.3,linearStep(0.8,1.,u_frameOutRatio));gl_FragColor.a=0.01;}`;
const fragCard = `#define GLSLIFY 1
uniform sampler2D u_cardTexture;uniform sampler2D u_cardLedTexture;uniform vec2 u_cardUvOffset;uniform vec2 u_cardTextureSize;uniform vec3 u_cardColor;uniform float u_cardOpacity;uniform float u_time;varying vec2 v_uv;void main(){vec2 uv=v_uv/u_cardTextureSize;vec4 texel=texture2D(u_cardTexture,uv+u_cardUvOffset);vec3 ledTexture=pow(texture2D(u_cardLedTexture,fract(v_uv*vec2(20.,15.))).rgb,vec3(2.2));float ledMask=dot(ledTexture,u_cardColor*texel.r);gl_FragColor.rgb=pow(ledTexture,vec3(1./2.2))*ledMask*2.5;gl_FragColor.a=texel.r*0.35;}`;
const fragBlack = `#define GLSLIFY 1
uniform sampler2D u_blackTunnelTexture;uniform sampler2D u_matcapTexture;uniform sampler2D u_envTexture;uniform float u_sunFactor;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_sunFadeColor;uniform float u_blackTunnelRatio;uniform float u_offsetZ;uniform float u_frameIn;uniform float u_endRatio;
#ifdef IS_CLONE
uniform float u_alpha;
#endif
#include <astronautCommon_pars>
float sdBoxFrame(vec3 p,vec3 b,float e){p=abs(p)-b;vec3 q=abs(p+e)-e;return min(min(length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));}float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}void main(){
#include <astronautCommon>
vec2 uvDiff=cartesianToPolar(worldNormal);vec2 uvSpec=cartesianToPolar(reflection);vec3 blackTunnelEnvDiff=texture2D(u_blackTunnelTexture,0.25*uvDiff).rgb;vec3 blackTunnelEnvSpec=texture2D(u_blackTunnelTexture,0.25*uvSpec).rgb*(0.2+metalness*0.7)*2.;
#ifdef IS_CLONE
gl_FragColor.rgb=(blackTunnelEnvDiff*3.5*blackTunnelEnvDiff+blackTunnelEnvSpec*3.5)*v_ao*u_alpha*(0.5+fresnel*0.9);gl_FragColor.a=mix(max(gl_FragColor.r,max(gl_FragColor.g,gl_FragColor.b))*u_alpha,0.,u_endRatio);
#else
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),0.2+1.*u_frameIn);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float metalMask=1.0-metalness;float metalShininess=u_sunFactor*getMetalShininess(V,sunPosition,N,(1.0-0.9*metalness),0.4*metalness);vec3 color=vec3(matcapShading*albedo);color+=zAxisShading;color*=metalMask;color*=mix(u_ambientColor*(0.85+sunNdL*0.5),vec3(fresnel*2.),u_blackTunnelRatio*0.5);color+=linearStep(0.,10.0,metalShininess);color*=mix(0.5+0.5*ao,0.75+0.25*ao,u_blackTunnelRatio);color+=metalMask*u_sunFactor*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 blackTunnelColor=(color*blackTunnelEnvSpec*(7.+metalness*10.)+albedo*blackTunnelEnvDiff*1.6)*(1.3-abs(reflection.z))*(0.5+ao*0.5);float GRID_SIZE=20.0;float offsetZ=mod(u_offsetZ,GRID_SIZE);vec3 ro=vec3(0.0,0.0,offsetZ);float t=0.0;vec3 relPos=v_worldPosition+worldNormal*3.+vec3(0.,0.,u_offsetZ);float repDist=GRID_SIZE-1.;vec3 relPosRep=mod(relPos+0.5*repDist,repDist)-0.5*repDist;float sdf=sdBoxFrame(relPosRep,vec3(GRID_SIZE-1.)*.5,1.);blackTunnelColor+=exp(-sdf*0.25)*blackTunnelEnvDiff*2.;gl_FragColor.rgb=color;gl_FragColor.rgb=mix(gl_FragColor.rgb,0.3*gl_FragColor.rgb+blackTunnelColor,clamp(u_blackTunnelRatio*2.-1.+ao,0.,1.));gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,vec3(u_showRatio));gl_FragColor.rgb*=(0.3+armb.r*0.7);gl_FragColor.rgb+=max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao*(1.-u_blackTunnelRatio);gl_FragColor.a=0.01+0.1*max(0.0,gl_FragColor.g-1.+metalness*0.2)*(0.5+metalness*1.5)+gl_FragColor.b*u_blackTunnelRatio*dot(vec3(0.299,0.587,0.114),blackTunnelColor)*5.;gl_FragColor.a+=metalShininess;gl_FragColor.a*=(0.5+fresnel*0.9);
#endif
}`;
const astronautCommon = `#define GLSLIFY 1
vec3 worldNormal=normalize(v_worldNormal);vec3 worldTangent=normalize(v_worldTangent.xyz);vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_norTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_armbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 N=worldNormal;vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdV=clamp(abs(dot(N,V)),0.001,1.0);float fresnel=pow(1.0-NdV,5.0);`;
const astronautCommonPars = `#define GLSLIFY 1
uniform sampler2D u_armbTexture;uniform sampler2D u_norTexture;uniform float u_time;uniform vec3 u_bgColor;uniform float u_showRatio;
#ifdef IS_WHITE
uniform float u_whiteTunnelRatio;
#endif
varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_ao;varying vec3 v_viewPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;const float RECIPROCAL_PI2=0.15915494;const float LN2=0.6931472;const float ENV_LODS=6.0;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec2 cartesianToPolar(vec3 n){vec2 uv;uv.x=atan(n.z,n.x)*RECIPROCAL_PI2+0.5;uv.y=asin(n.y)*RECIPROCAL_PI+0.5;return uv;}mat4 rotation3d(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.0-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);}`;
let _m0 = new Matrix4();
let _v0$1 = new Vector3();
let _v1$4 = new Vector3();
let _p0 = new Vector3();
let _p1 = new Vector3();
let _e0 = new Euler();
let _q0$1 = new Quaternion();
let _q1$2 = new Quaternion();
let _matrixWorld$1 = new Matrix4();
let _matrixWorldInverse$1 = new Matrix4();
let _projectionMatrix$1 = new Matrix4();
let _perspectiveCamera = new PerspectiveCamera();
class GoalTunnelAstronauts {
  container = new Object3D();
  materials = {};
  meshes = {};
  cloneMeshes = {};
  CLONES_COUNT = 4;
  TOTAL_COUNT = 5;
  transformObjectList = [];
  partIdList = ["helmet", "helmet_glass", "glove_shoes", "wearpack", "card"];
  textureTypeList = ["arm", "base", "nor"];
  textures = {};
  textureUniforms = {};
  extraCameraViewportOffsetX = 0;
  extraCameraViewportOffsetY = 0;
  instancePosAttribute;
  instanceOrientAttribute;
  instanceAnimationFrameFromToBlend1Attribute;
  instanceAnimationFrameFromToBlend2Attribute;
  instanceClonePosAttribute;
  instanceCloneOrientAttribute;
  instanceCloneAnimationFrameFromToBlend1Attribute;
  instanceCloneAnimationFrameFromToBlend2Attribute;
  _cameraNeedsSync = false;
  sharedUniforms = {
    u_time: properties.sharedUniforms.u_time,
    u_animationPositionTexture: {
      value: null
    },
    u_animationOrientTexture: {
      value: null
    },
    u_animationTextureSize: {
      value: new Vector2(0, 0)
    },
    u_frameCount: {
      value: null
    },
    u_lut: {
      value: null
    },
    u_bgColor: {
      value: new Color()
    },
    u_showRatio: {
      value: 0
    },
    u_loopLinearBlend: {
      value: 0
    },
    u_ambientColor: {
      value: new Color("#566d80")
    }
  };
  whiteTunnelUniforms = {
    u_matcapTexture: {
      value: null
    },
    u_frameOutRatio: {
      value: 0
    },
    u_whiteTunnelRatio: {
      value: 0
    },
    u_faceLedLight: {
      value: 0
    },
    u_faceLedColor: {
      value: new Color("#aaaafb")
    },
    u_tintColor: {
      value: new Color()
    },
    u_cardPosition: {
      value: new Vector3()
    },
    u_sunPosition: {
      value: new Vector3(-20, 0, 22)
    },
    u_envTexture: {
      value: null
    }
  };
  blackTunnelUniforms = {
    u_matcapTexture: {
      value: null
    },
    u_frameIn: {
      value: 0
    },
    u_blackTunnelRatio: {
      value: 0
    },
    u_endRatio: {
      value: 0
    },
    u_blackTunnelTexture: {
      value: null
    },
    u_sunFactor: {
      value: 1
    },
    u_sunPosition: {
      value: new Vector3(-20, 0, 22)
    },
    u_blackTunnelTransformRatio: goalBlackTunnel.sharedUniforms.u_blackTunnelTransformRatio,
    u_envTexture: {
      value: null
    },
    u_offsetZ: goalBlackTunnel.sharedUniforms.u_offsetZ,
    u_sunFadeColor: {
      value: new Color("#bbb")
    }
  };
  cloneUniforms = {
    u_alpha: {
      value: 0
    }
  };
  BONE_COUNT = 53;
  frameCount = -1;
  showRatio = 1;
  clonesShowRatio = 0;
  cardNoise = new Simple1DNoise();
  renderTarget = null;
  interRenderTarget = null;
  textureSize = null;
  isCardActive = false;
  cardTextureSize = new Vector2(5, 23);
  cardTime = 0;
  preInit() {
    this.TOTAL_COUNT = this.CLONES_COUNT + 1;
    shaderHelper.addChunk("astronautCommon", astronautCommon);
    shaderHelper.addChunk("astronautCommon_pars", astronautCommonPars);
    this.camera = new PerspectiveCamera();
    for (let e = 0; e < this.TOTAL_COUNT; e++) {
      let t = new Object3D();
      t.position.set(Math.random(), Math.random(), Math.random()).subScalar(0.5).normalize().multiplyScalar(Math.pow(Math.random(), 1 / 3) * 4);
      t.position.z += 15;
      t.rotation.set(Math.random() * Math.PI / 2, Math.random() * Math.PI / 2, Math.random() * Math.PI / 2);
      t.userData.timeShift = e === 0 ? 0 : Math.random() * 2;
      t.userData.cloneTimeShift = Math.random();
      t.userData.rotation = new Euler();
      t.userData.motion = new BrownianMotion();
      t.userData.motion._positionFrequency = 0.2;
      t.userData.motion._rotationFrequency = 0.6;
      t.userData.motion._positionAmplitude = 14;
      t.userData.motion._rotationAmplitude = 8.3;
      t.userData.positionDynamic = new SecondOrderDynamics(new Vector3(), 1, 0.65, 1.3);
      t.userData.rotationDynamic = new SecondOrderDynamics(new Vector3(), 1, 0.85, 1.1);
      t.userData.pauseLoopTime = 0;
      t.userData.animationTime = 0;
      t.userData.deltaTimeMultiplier = 1;
      this.transformObjectList.push(t);
    }
    this.instancePosAttribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instancePosAttribute.usage = DynamicDrawUsage;
    this.instanceOrientAttribute = new InstancedBufferAttribute(new Float32Array(4), 4);
    this.instanceOrientAttribute.usage = DynamicDrawUsage;
    this.instanceAnimationFrameFromToBlend1Attribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instanceAnimationFrameFromToBlend1Attribute.usage = DynamicDrawUsage;
    this.instanceAnimationFrameFromToBlend2Attribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instanceAnimationFrameFromToBlend2Attribute.usage = DynamicDrawUsage;
    this.instanceClonePosAttribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceClonePosAttribute.usage = DynamicDrawUsage;
    this.instanceCloneOrientAttribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 4), 4);
    this.instanceCloneOrientAttribute.usage = DynamicDrawUsage;
    this.instanceCloneAnimationFrameFromToBlend1Attribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceCloneAnimationFrameFromToBlend1Attribute.usage = DynamicDrawUsage;
    this.instanceCloneAnimationFrameFromToBlend2Attribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceCloneAnimationFrameFromToBlend2Attribute.usage = DynamicDrawUsage;
    this.textures.card = properties.loader.add(settings.TEXTURE_PATH + "tunnels/astronaut/face.png", {
      type: "texture",
      minFilter: NearestFilter
    }).content;
    this.textures.card.magFilter = NearestFilter;
    this.textures.led = this._initLedTexture();
    for (let e = 0; e < this.partIdList.length; e++) {
      let t = this.partIdList[e];
      this.textureUniforms[t + "_armb"] = {
        value: null
      };
      this.textureUniforms[t + "_nor"] = {
        value: null
      };
      for (let r = 0; r < this.textureTypeList.length; r++) {
        let n = this.textureTypeList[r];
        if (t != "helmet_glass" && t !== "card") {
          properties.loader.add(settings.TEXTURE_PATH + "tunnels/astronaut/astronaut_" + t + "_" + n + ".webp", {
            type: "texture",
            onLoad: this._onTextureLoad.bind(this, t, n)
          });
        }
      }
      if (t === "card") {
        let r = new PlaneGeometry(0.2, 0.15).translate(0, 1.68, 0.1);
        r.setAttribute("boneIndices", new BufferAttribute(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 2));
        r.setAttribute("boneWeights", new BufferAttribute(new Float32Array([1, 0, 1, 0, 1, 0, 1, 0]), 2));
        r.setAttribute("tangent", new BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]), 4));
        this._onGeometryLoad("card", r);
      } else {
        properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_" + t + ".buf", {
          onLoad: r => {
            this._onGeometryLoad(t, r, true);
            this._onGeometryLoad(t, r, false);
          }
        });
      }
    }
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_in_animation.buf", {
      onLoad: e => this.inAnimation = e
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_out_animation.buf", {
      onLoad: e => this.outAnimation = e
    });
    this.whiteTunnelUniforms.u_envTexture.value = this.blackTunnelUniforms.u_envTexture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/earth.webp", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    this.blackTunnelUniforms.u_matcapTexture.value = this.whiteTunnelUniforms.u_matcapTexture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/white_matcap.jpg", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_animations.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
    this.initGui();
  }
  _initLedTexture() {
    let e = document.createElement("canvas");
    e.width = e.height = 11;
    let t = e.getContext("2d");
    t.fillStyle = "#000";
    t.fillRect(0, 0, 11, 11);
    t.fillStyle = "#f00";
    t.fillRect(1, 1, 3, 9);
    t.fillStyle = "#0f0";
    t.fillRect(4, 1, 3, 9);
    t.fillStyle = "#00f";
    t.fillRect(7, 1, 3, 9);
    let r = new Texture(e);
    r.needsUpdate = true;
    r.minFilter = LinearFilter;
    return r;
  }
  initGui() {
    settings.LOOK_DEV_MODE;
  }
  _onTextureLoad(e, t, r) {
    this.textures[e + "_" + t] = r;
    if (t == "arm" || t == "base") {
      let n = this.textures[e + "_arm"];
      let a = this.textures[e + "_base"];
      if (n && a) {
        let l = fboHelper.createRenderTarget(n.image.width, n.image.height, false, false);
        this.textures[e + "_arm"] = this.textures[e + "_base"] = null;
        fboHelper.copy(textureHelper.transparentTexture, l);
        textureHelper.mixChannels(n, l, 0, 1, 2, -1);
        textureHelper.mixChannels(a, l, -1, -1, -1, 0);
        n.dispose();
        a.dispose();
        this.textureUniforms[e + "_armb"].value = l.texture;
      }
    } else {
      this.textureUniforms[e + "_" + t].value = r;
    }
  }
  _onGeometryLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let p in t.attributes) {
      n.attributes[p] = t.attributes[p];
    }
    let a = e;
    if (e == "helmet_glass" || e == "card") {
      a = "helmet";
    }
    n.index = t.index;
    n.setAttribute("instancePos", this[`instance${r ? "Clone" : ""}PosAttribute`]);
    n.setAttribute("instanceOrient", this[`instance${r ? "Clone" : ""}OrientAttribute`]);
    n.setAttribute("instanceAnimationFrameFromToBlend1", this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend1Attribute`]);
    n.setAttribute("instanceAnimationFrameFromToBlend2", this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend2Attribute`]);
    let l;
    if (!r) {
      const p = Object.assign({}, this.whiteTunnelUniforms, this.sharedUniforms);
      p.u_armbTexture = this.textureUniforms[a + "_armb"];
      p.u_norTexture = this.textureUniforms[a + "_nor"];
      l = new ShaderMaterial({
        uniforms: p,
        vertexShader: vert$g,
        fragmentShader: e == "card" ? fragCard : fragWhite,
        side: DoubleSide,
        transparent: true,
        blending: NoBlending
      });
      l.defines.BONE_COUNT = this.BONE_COUNT;
      l.defines.IS_WHITE = true;
      l.name = "whiteTunnelMaterial";
      if (e == "helmet_glass") {
        l.defines.IS_HELMET_GLASS = true;
      }
      if (e == "card") {
        l.uniforms = Object.assign({
          u_cardLedTexture: {
            value: this.textures.led
          },
          u_cardTexture: {
            value: this.textures.card
          },
          u_cardColor: {
            value: new Color("#ddddff")
          },
          u_cardUvOffset: {
            value: new Vector2(0, 0)
          },
          u_cardTextureSize: {
            value: this.cardTextureSize
          },
          u_cardOpacity: {
            value: 1
          }
        }, this.sharedUniforms);
        l.depthTest = false;
        l.depthWrite = false;
        l.blending = CustomBlending;
        l.blendEquation = AddEquation;
        l.blendSrc = OneFactor;
        l.blendDst = OneFactor;
        l.blendEquationAlpha = AddEquation;
        l.blendSrcAlpha = OneFactor;
        l.blendDstAlpha = OneFactor;
      }
    }
    const c = Object.assign({}, this.blackTunnelUniforms, this.sharedUniforms, r ? this.cloneUniforms : {});
    c.u_armbTexture = this.textureUniforms[a + "_armb"];
    c.u_norTexture = this.textureUniforms[a + "_nor"];
    const u = new ShaderMaterial({
      uniforms: c,
      vertexShader: vert$g,
      fragmentShader: fragBlack,
      transparent: true
    });
    if (r) {
      u.blending = CustomBlending;
      u.blendEquation = AddEquation;
      u.blendSrc = OneFactor;
      u.blendDst = OneFactor;
      u.depthTest = false;
      u.side = DoubleSide;
    } else {
      u.blending = NoBlending;
      u.side = DoubleSide;
    }
    u.defines.BONE_COUNT = this.BONE_COUNT;
    u.defines.IS_BLACK = true;
    u.defines.IS_CLONE = r;
    u.name = "blackTunnelMaterial";
    if (l) {
      taskManager.add(l);
    }
    if (u) {
      taskManager.add(u);
    }
    const f = new Mesh(n, this.blackTunnelMaterial);
    if (r) {
      f.renderOrder = 1000;
    } else {
      f.onBeforeRender = this._onBeforeRender.bind(this);
      f.onAfterRender = this._onAfterRender.bind(this);
    }
    f.renderOrder = e == "card" ? 100 : 0;
    f.frustumCulled = false;
    this.container.add(f);
    if (r) {
      f.material = u;
      this.cloneMeshes[e] = f;
    } else {
      this.meshes[e] = f;
      this.materials[e] = {
        white: l,
        black: u
      };
    }
  }
  _onBeforeRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      let n = cameraControls._camera;
      _matrixWorld$1.copy(r.matrixWorld);
      r.matrixWorld.copy(n.matrixWorld);
      _matrixWorldInverse$1.copy(r.matrixWorldInverse);
      r.matrixWorldInverse.copy(n.matrixWorldInverse);
      _projectionMatrix$1.copy(r.projectionMatrix);
      if (this._cameraNeedsSync && (this._cameraNeedsSync = false, _perspectiveCamera.fov = n.fov, _perspectiveCamera.near = n.near, _perspectiveCamera.far = n.far, _perspectiveCamera.filmOffset = n.filmOffset, _perspectiveCamera.coordinateSystem = n.coordinateSystem, _perspectiveCamera.filmGauge = n.filmGauge, _perspectiveCamera.aspect = n.aspect, n.view)) {
        _perspectiveCamera.view = _perspectiveCamera.view || {};
        for (let a in n.view) {
          _perspectiveCamera.view[a] = n.view[a];
        }
        _perspectiveCamera.view.offsetX += this.extraCameraViewportOffsetX;
        _perspectiveCamera.view.offsetY += this.extraCameraViewportOffsetY;
        _perspectiveCamera.updateProjectionMatrix();
      }
      r.projectionMatrix.copy(_perspectiveCamera.projectionMatrix);
    }
  }
  _onAfterRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      r.matrixWorld.copy(_matrixWorld$1);
      r.matrixWorldInverse.copy(_matrixWorldInverse$1);
      r.projectionMatrix.copy(_projectionMatrix$1);
    }
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position || !e.attributes.orient) {
      return;
    }
    let t = e.attributes.position.array;
    let r = e.attributes.orient.array;
    let n = t.length / 3;
    this.frameCount = n / this.BONE_COUNT;
    let a = Math.ceil(Math.sqrt(n));
    let l = Math.ceil(n / a);
    let c = a * l;
    let u = new Float32Array(c * 4);
    let f = new Float32Array(c * 4);
    for (let p = 0, g = 0, v = 0; p < n; p++, g += 3, v += 4) {
      u[v + 0] = t[g + 0];
      u[v + 1] = t[g + 1];
      u[v + 2] = t[g + 2];
      u[v + 3] = 1;
      f[v + 0] = r[v + 0];
      f[v + 1] = r[v + 1];
      f[v + 2] = r[v + 2];
      f[v + 3] = r[v + 3];
    }
    this.sharedUniforms.u_animationPositionTexture.value = fboHelper.createDataTexture(u, a, l, true, true);
    this.sharedUniforms.u_animationPositionTexture.value.flipY = false;
    this.sharedUniforms.u_animationOrientTexture.value = fboHelper.createDataTexture(f, a, l, true, true);
    this.sharedUniforms.u_animationOrientTexture.value.flipY = false;
    this.sharedUniforms.u_animationTextureSize.value.set(a, l);
    this.sharedUniforms.u_frameCount.value = this.frameCount;
  }
  init() {
    this.renderTarget = fboHelper.createRenderTarget(1, 1);
    this.interRenderTarget = fboHelper.createRenderTarget(1, 1);
  }
  resize(e, t) {
    if (!this.renderTarget) {
      return;
    }
    let r = 0.5;
    e = Math.ceil(e * r / 2) * 2;
    t = Math.ceil(t * r / 2) * 2;
    e = math.powerTwoFloor(e);
    t = math.powerTwoFloor(t);
    this.renderTarget.setSize(e, t);
    this.interRenderTarget.setSize(e, t);
  }
  updateTransforms(e) {
    const t = this.transformObjectList[0];
    const {
      whiteFrameRatio: r,
      whiteTunnelRatio: n,
      blackTitleRatio: a,
      isBlackTunnelActive: l,
      blackTunnelRatio: c,
      isBlackTitleActive: u,
      isWhiteTunnelActive: f,
      astronautDropRatio: p
    } = goalTunnels;
    for (let g = 0; g < this.TOTAL_COUNT; g++) {
      let v = this.transformObjectList[g];
      v.scale.setScalar(1);
      v.position.set(0, 0, 0);
      v.rotation.set(0, 0, 0);
      if (g === 0) {
        let _ = 100;
        let T;
        let M;
        if (f) {
          T = this.outAnimation.attributes;
          if (n < 1) {
            M = math.fit(n, 0, 1, 0, 79);
          } else {
            M = math.fit(p, 0, 1, 79, 99);
          }
        } else {
          T = this.inAnimation.attributes;
          M = _ * ease.cubicIn(a);
        }
        let S = T.position.array;
        let b = T.orient.array;
        let C = Math.min(Math.floor(M), _ - 1);
        let w = Math.min(Math.ceil(M), _ - 1);
        let R = M - C;
        _p0.fromArray(S, C * 3);
        _p1.fromArray(S, w * 3);
        _p0.lerp(_p1, R);
        v.position.copy(_p0);
        _q0$1.fromArray(b, C * 4);
        _q1$2.fromArray(b, w * 4);
        _q0$1.slerp(_q1$2, R);
        v.rotation.setFromQuaternion(_q0$1);
        v.position.y -= (properties.useMobileLayout ? 0 : 0.4) * ease.backInOut(p);
        v.updateMatrix();
        let E = v.userData.motion;
        E._positionFrequency = 0.2;
        E._rotationFrequency = 0.15;
        E._positionAmplitude = 0;
        E._rotationAmplitude = 0;
        if (l) {
          let I = c;
          E._positionFrequency = 0.2 + I * 0.5;
          E._rotationFrequency = 0.15;
          E._positionAmplitude = I * 5;
          E._rotationAmplitude = I * 60;
        }
        if (f) {
          E._positionFrequency = math.fit(r, 0, 0.45, 0.5, 0.2);
          E._rotationFrequency = math.fit(r, 0, 0.45, 0.4, 0.15);
          E._positionAmplitude = math.fit(r, 0, 0.75, 5, 0);
          E._rotationAmplitude = math.fit(r, 0, 0.75, 15, 0);
        }
        E.update(e);
        v.userData.positionDynamic.update(e, E._position);
        _v0$1.copy(E._euler);
        v.userData.rotationDynamic.update(e, _v0$1);
        _e0.x = v.userData.rotationDynamic.value.x;
        _e0.y = v.userData.rotationDynamic.value.y;
        _e0.z = v.userData.rotationDynamic.value.z;
        v.userData.deltaTimeMultiplier = 1 + Math.min(3.5, v.userData.positionDynamic.valueVel.length() * 0.2 + v.userData.rotationDynamic.valueVel.length() * 0.2);
        _v1$4.set(1, 1, 1);
        E._matrix.compose(v.userData.positionDynamic.value, _q0$1.setFromEuler(_e0), _v1$4);
        _m0.copy(v.matrix);
        _m0.multiply(E._matrix);
        _m0.decompose(_v0$1, _q0$1, _v1$4);
      } else if (u || f) {
        v.scale.setScalar(0);
        v.updateMatrix();
        _m0.copy(v.matrix).decompose(_v0$1, _q0$1, _v1$4);
      } else {
        v.position.copy(t.position);
        v.rotation.copy(t.rotation);
        v.updateMatrix();
        v.userData.motion._positionFrequency = 0.2;
        v.userData.motion._rotationFrequency = 0.6;
        v.userData.motion._positionAmplitude = 12;
        v.userData.motion._rotationAmplitude = 10;
        v.userData.motion.update(e);
        _m0.copy(v.matrix);
        _m0.multiply(v.userData.motion._matrix);
        _m0.decompose(_v0$1, _q0$1, _v1$4);
        _v1$4.fromArray(this.instancePosAttribute.array, 0);
        _q1$2.fromArray(this.instanceOrientAttribute.array, 0);
        let _ = g / (this.CLONES_COUNT - 1);
        let T = math.fit(this.clonesShowRatio, _ * 0.3, 0.7 + _ * 0.3, 1, 0, ease.sineInOut);
        _v0$1.lerp(_v1$4, T);
      }
      if (g === 0) {
        _v0$1.toArray(this.instancePosAttribute.array, 0);
        _q0$1.toArray(this.instanceOrientAttribute.array, 0);
      } else {
        _v0$1.toArray(this.instanceClonePosAttribute.array, (g - 1) * 3);
        _q0$1.toArray(this.instanceCloneOrientAttribute.array, (g - 1) * 4);
      }
    }
    this.instancePosAttribute.needsUpdate = true;
    this.instanceOrientAttribute.needsUpdate = true;
    this.instanceClonePosAttribute.needsUpdate = true;
    this.instanceCloneOrientAttribute.needsUpdate = true;
  }
  updateAnimation(e) {
    const {
      blackTitleRatio: t,
      astronautDropRatio: r,
      whiteFrameOutRatio: n
    } = goalTunnels;
    let a = true;
    let l;
    let c;
    let u;
    let f;
    let p;
    let g = math.fit(r, 0, 0.1, 0, 1) * math.fit(r, 0.9, 1, 1, 0);
    let v = math.fit(n + r, 0.9, 2, 90, 139, ease.quartIn);
    u = Math.floor(v);
    f = Math.ceil(v);
    p = v - u;
    this.sharedUniforms.u_loopLinearBlend.value = g;
    const _ = math.fit(r, 0.9, 1, 0, 1, ease.cubicIn);
    this.isCardActive = _ > 0;
    for (let T = 0; T < this.TOTAL_COUNT; T++) {
      const M = this.transformObjectList[T];
      let S = 1;
      let b = this.materials.card.white.uniforms;
      if (r < 0.5) {
        M.userData.pauseLoopTime = 0;
        S = math.smoothstep(-0.3, 1, t) * 0.75;
        l = 0;
        c = 89;
        b.u_cardOpacity.value = 0;
      } else {
        S = math.fit(r, 0.9, 1, 0, 1);
        l = 140;
        c = 287;
        let k = math.clamp(0.5 + Math.max(0, this.cardNoise.getFbm(properties.time * 8, 3) + 0.5) * 4, 0, 2);
        b.u_cardOpacity.value = k * _;
        if (r < 1) {
          M.userData.pauseLoopTime = Math.max(0, M.userData.pauseLoopTime);
          a = false;
        } else {
          M.userData.pauseLoopTime = 0;
        }
      }
      if (M.userData.pauseLoopTime == 0) {
        M.userData.animationTime += e * S * M.userData.deltaTimeMultiplier;
      }
      if (g == 1) {
        M.userData.animationTime = 0;
      }
      let C = M.userData.timeShift;
      if (T === 0) {
        M.userData.cloneTimeShift = -1;
      } else {
        M.userData.cloneTimeShift += e * 0.2;
        M.userData.cloneTimeShift %= 1;
        C = math.mix(0, C, this.clonesShowRatio);
      }
      let w = C + M.userData.animationTime;
      let R = c - l + 1;
      let E = w * 60 % R;
      let I = Math.floor(E);
      let F = (I + 1) % R + l;
      I += l;
      if (F < I) {
        if (!a) {
          F = I = l;
          M.userData.animationTime = -C;
          M.userData.pauseLoopTime = Infinity;
        }
      }
      if (T === 0) {
        this.instanceAnimationFrameFromToBlend1Attribute.array[0] = I;
        this.instanceAnimationFrameFromToBlend1Attribute.array[1] = F;
        this.instanceAnimationFrameFromToBlend1Attribute.array[2] = E % 1;
        this.instanceAnimationFrameFromToBlend2Attribute.array[0] = u;
        this.instanceAnimationFrameFromToBlend2Attribute.array[1] = f;
        this.instanceAnimationFrameFromToBlend2Attribute.array[2] = p;
      } else {
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 0] = I;
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 1] = F;
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 2] = E % 1;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 0] = u;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 1] = f;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 2] = p;
      }
    }
    this.instanceAnimationFrameFromToBlend1Attribute.needsUpdate = true;
    this.instanceAnimationFrameFromToBlend2Attribute.needsUpdate = true;
    this.instanceCloneAnimationFrameFromToBlend1Attribute.needsUpdate = true;
    this.instanceCloneAnimationFrameFromToBlend2Attribute.needsUpdate = true;
  }
  updateCard(e) {
    this.cardTime = this.isCardActive ? this.cardTime + e : 0;
    const t = this.cardTextureSize.x;
    const r = this.cardTextureSize.y;
    const n = Math.floor(this.cardTime * 10 % (t * (r + 1)));
    const a = n / (t * (r + 1));
    const l = math.linearStep(0, 0.15, a) * math.linearStep(1, 0.9, a);
    this.whiteTunnelUniforms.u_faceLedLight.value = l;
    this.materials.card.white.uniforms.u_cardUvOffset.value.set(n % t / t, (r - Math.floor(n / t)) / r);
  }
  update(e) {
    const {
      blackFrameInRatio: t,
      whiteFrameBreakRatio: r,
      whiteTunnelRatio: n,
      whiteFrameRatio: a,
      blackTunnelRatio: l,
      whiteTunnelAstronautRatio: c,
      isBlackTunnelActive: u,
      isWhiteTunnelActive: f,
      astronautDropRatio: p,
      blackTitleRatio: g
    } = goalTunnels;
    if (u) {
      fboHelper.copy(goalBlackTunnel.feedbackRenderTarget.texture, this.renderTarget);
      blur.blur(16, 0.5, this.renderTarget, this.interRenderTarget);
      blur.blur(4, 0.5, this.renderTarget, this.interRenderTarget);
    }
    this.showRatio = f ? math.smoothstep(0, 0.15, c) : 1;
    this.clonesShowRatio = math.smoothstep(0.2, 0.4, l);
    this.partIdList.forEach(v => {
      this.meshes[v].material = this.materials[v][f ? "white" : "black"];
      if (this.cloneMeshes[v]) {
        this.cloneMeshes[v].visible = !f && this.clonesShowRatio > 0;
      }
    });
    this.meshes.card.visible = p >= 0.95;
    this.sharedUniforms.u_bgColor.value.copy(properties.bgColor);
    this.sharedUniforms.u_showRatio.value = this.showRatio;
    this.blackTunnelUniforms.u_frameIn.value = t;
    this.blackTunnelUniforms.u_sunFactor.value = u ? 1 - math.smoothstep(0.1, 0.2, l) : 1;
    this.blackTunnelUniforms.u_blackTunnelTexture.value = this.renderTarget.texture;
    this.blackTunnelUniforms.u_blackTunnelRatio.value = u ? math.smoothstep(0.1, 0.3, l) : 0;
    this.blackTunnelUniforms.u_endRatio.value = u ? math.smoothstep(0.65, 0.9, l) : 0;
    this.whiteTunnelUniforms.u_frameOutRatio.value = r;
    this.whiteTunnelUniforms.u_whiteTunnelRatio.value = n;
    this.whiteTunnelUniforms.u_tintColor.value.setStyle("#2533c2").multiplyScalar(math.fit(p, 1, 0, 0.2, 1) * (r > 0 ? 1 : 0));
    this.cloneUniforms.u_alpha.value = this.clonesShowRatio;
    this.updateTransforms(e);
    this.updateAnimation(e);
    this.updateCard(e);
    this._cameraNeedsSync = true;
    this.whiteTunnelUniforms.u_cardPosition.value.copy(this.transformObjectList[0].position);
    this.whiteTunnelUniforms.u_cardPosition.value.y += 0.9;
  }
}
const goalTunnelAstronauts = new GoalTunnelAstronauts();
const blockVert = `#define GLSLIFY 1
attribute float a_instanceId;uniform float u_time;uniform float u_ratio;uniform float u_ratioInverse;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;vec3 deform(in vec3 pos){float origZ=pos.z;float blockCount=float(BLOCK_COUNT);float ratio=mix(.1,1.,u_ratioInverse);float lengthRatio=-pos.z/blockCount;float scalar=mix(0.25,ratio,lengthRatio);pos.x*=1.0+scalar*0.5*sin(lengthRatio*6.283184);pos.y*=1.0+scalar*0.5*cos(lengthRatio*6.283184+3.1415926);float angleRatio=smoothstep(0.25,1.,u_ratioInverse);float angle=(angleRatio+angleRatio*lengthRatio*lengthRatio*1.)*-6.283184;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);pos.xy=m*pos.xy;pos.y+=ratio*sin(ratio*lengthRatio*3.141592*4.)*0.25;pos.z-=(cos(ratio*1.5+(1.0-ratio)*lengthRatio*3.141592*0.5)*0.5+0.5-1.0)*blockCount;pos.z*=1.0+16.0*(ratio*lengthRatio*lengthRatio)+2.0*ratio*(sin(8.0*lengthRatio)*0.5+0.5);pos.z*=(1.-ratio*ratio*ratio)*0.9+0.1;pos.z+=blockCount/4.;return pos*15.;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){float blockCount=float(BLOCK_COUNT);vec3 pos=position;pos.z-=a_instanceId;pos.z/=blockCount;float lengthRatio=-pos.z;pos.z*=blockCount;v_localPosition=pos;v_lengthRatio=lengthRatio;vec3 nor=deform(pos+normal*0.01);pos=deform(pos);nor=normalize(nor-pos);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;v_fog=-0.005*mvPosition.z/mvPosition.w;gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;}`;
const blockFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_ratioInverse;uniform vec3 u_fbm;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;uniform float u_time;float sphOcclusion(in vec3 pos,in vec3 nor,in vec4 sph){vec3 di=sph.xyz-pos;float l=length(di);float nl=dot(nor,di/l);float h=l/sph.w;float h2=h*h;float k2=1.0-h2*nl*nl;return max(0.0,nl)/h2;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 voronoi(const in vec4 x){vec4 p=floor(x);vec4 f=fract(x);float id=0.0;vec2 res=vec2(100.0);for(int l=-1;l<=1;l++){for(int k=-1;k<=1;k++){for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec4 b=vec4(float(i),float(j),float(k),float(l));vec4 r=vec4(b)-f+hash(p+b);float d=dot(r,r);float cond=max(sign(res.x-d),0.0);float nCond=1.0-cond;float cond2=nCond*max(sign(res.y-d),0.0);float nCond2=1.0-cond2;id=(dot(p+b,vec4(1.0,57.0,113.0,421.))*cond)+(id*nCond);res=vec2(d,res.x)*cond+res*nCond;res.y=cond2*d+nCond2*res.y;}}}}return vec3(sqrt(res),abs(id));}vec4 hash(float p){vec4 p4=fract(vec4(p)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 sph=vec4(u_fbm.x*2.,u_fbm.y*2.+1.,0.,2.5);vec3 worldNormal=normalize(v_worldNormal);float ao=1.-sphOcclusion(v_worldPosition,worldNormal,sph)*2.*smoothstep(0.8,0.5,u_ratioInverse);float shade=texture2D(u_texture,v_uv).r;float brightness=pow(v_lengthRatio,5.);float t=u_ratioInverse*-2.+u_time*0.2;vec3 vn=voronoi(vec4(v_localPosition*2.+vec3(0.,0.,-t*0.5),t*0.25));vec4 rnd=hash(vn.z);float threshold=0.05+rnd.x*0.1;float r=abs(vn.x-.5)*(1.75+rnd.y*0.5);float pattern=max(0.,1.-smoothstep(threshold-fwidth(r),threshold,r));vec3 color=mix(vec3(0.102,0.184,0.984),vec3(1.),pattern);color*=(.35+shade)*ao;color+=brightness;gl_FragColor=vec4(color,shade+brightness);gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0),smoothstep(0.8,1.0,u_ratioInverse)*0.5);gl_FragColor.a*=ao*mix(1.,0.15,pattern);gl_FragColor+=linearStep(-10.,-11.,v_localPosition.z);}`;
class GoalWhiteTunnel {
  container = new Object3D();
  baseMesh;
  wallMesh;
  BLOCK_COUNT = 16;
  TEXTURE_SIZE = 1024;
  prevRatio = 0;
  pt0 = new Vector3();
  pt1 = new Vector3();
  pt2 = new Vector3();
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_ratioInverse: {
      value: 0
    },
    u_fbm: {
      value: null
    }
  };
  preInit() {
    this.fbm = new BrownianMotion();
    this.fbm._positionAmplitude = 2;
    this.fbm._positionFrequency = 1;
    this.sharedUniforms.u_fbm.value = this.fbm._position;
    this.sharedUniforms.u_texture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/white_block.webp", {
      type: "texture"
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_base.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, false)
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_wall.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, true)
    });
    let e = new Mesh(new SphereGeometry(7.5, 32, 24), new MeshNormalMaterial());
    e.position.z = 0;
  }
  _onTunnelBlockLoad(e, t) {
    let r = new InstancedBufferGeometry();
    for (let c in e.attributes) {
      r.setAttribute(c, e.attributes[c]);
    }
    r.setIndex(e.index);
    let n = new Float32Array(this.BLOCK_COUNT);
    for (let c = 0; c < this.BLOCK_COUNT; c++) {
      n[c] = c;
    }
    r.setAttribute("a_instanceId", new InstancedBufferAttribute(n, 1));
    let a = {
      u_ratio: goalTunnels.sharedUniforms.u_whiteTunnelRatio,
      u_texture: this.sharedUniforms.u_texture,
      u_ratioInverse: this.sharedUniforms.u_ratioInverse,
      u_fbm: this.sharedUniforms.u_fbm,
      u_time: goalTunnels.sharedUniforms.u_tunnelTime
    };
    let l = new Mesh(r, new ShaderMaterial({
      uniforms: a,
      vertexShader: blockVert,
      fragmentShader: blockFrag,
      extensions: {
        derivatives: true
      }
    }));
    l.material.defines.BLOCK_COUNT = this.BLOCK_COUNT;
    l.frustumCulled = false;
    if (t) {
      this.wallMesh = l;
      l.material.defines.IS_WALL = true;
    } else {
      this.baseMesh = l;
    }
    this.container.add(l);
  }
  init() {}
  resize(e, t) {}
  update(e) {
    this.sharedUniforms.u_ratioInverse.value = 1 - goalTunnels.whiteTunnelRatio;
    goalTunnels.properties.cameraDollyZoomFovOffset = math.fit(goalTunnels.whiteTunnelRatio, 0, 1, 60, 0);
    let t = goalTunnels.whiteTunnelRatio - this.prevRatio;
    goalTunnelEfx.offsetPostion.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.9, 500, 0, ease.sineOut), -1, 1);
    goalTunnelEfx.offsetRotation.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.8, 45, 0, ease.sineOut), -1, 1);
    this.fbm.update(e);
    goalTunnelEfx.amount = math.fit(goalTunnels.whiteTunnelRatio, 0.75, 1, 1, 0);
    this.prevRatio = goalTunnels.whiteTunnelRatio;
  }
}
const goalWhiteTunnel = new GoalWhiteTunnel();
const vert$f = `#define GLSLIFY 1
attribute float piece;uniform sampler2D u_positionTexture;uniform sampler2D u_orientTexture;uniform vec2 u_textureSize;uniform float u_frameFrom;uniform float u_frameTo;uniform float u_frameRatio;uniform float u_fragmentScale;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec4 animationUvs=(vec4(piece,u_frameFrom,piece,u_frameTo)+.5)/u_textureSize.xyxy;vec3 piecePosFrom=texture2D(u_positionTexture,animationUvs.xy).xyz;vec4 pieceOrientFrom=texture2D(u_orientTexture,animationUvs.xy);vec3 piecePosTo=texture2D(u_positionTexture,animationUvs.zw).xyz;vec4 pieceOrientTo=texture2D(u_orientTexture,animationUvs.zw);float radius=length(position)*u_fragmentScale;vec3 dir=position/radius;vec3 posFrom=qrotate(pieceOrientFrom,dir);vec3 posTo=qrotate(pieceOrientTo,dir);v_localDir=normalize(mix(posFrom,posTo,u_frameRatio));vec3 pos=v_localDir*radius+mix(piecePosFrom,piecePosTo,u_frameRatio);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;gl_Position=projectionMatrix*mvPosition;}`;
const frag$j = `#define GLSLIFY 1
uniform sampler2D u_backgroundTexture;uniform vec2 u_resolution;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 hue2RGBSmooth(in float hue){vec3 rgb=clamp(abs(mod(hue*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return rgb*rgb*(3.0-2.0*rgb);}void main(){vec3 fdx=dFdx(v_viewPosition);vec3 fdy=dFdy(v_viewPosition);vec3 viewNormal=normalize(cross(fdx,fdy));float alpha=abs(1.-viewNormal.z);vec3 localDir=normalize(v_localDir);vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec3 bgColor=texture2D(u_backgroundTexture,uv).rgb;vec2 refl=reflect(normalize(v_viewPosition),viewNormal).xy;vec2 uvOffset=refl.xy*0.2*vec2(u_resolution.x/u_resolution.y,1.);vec3 color=texture2D(u_backgroundTexture,uv+uvOffset).rgb;color+=clamp(abs(mod((alpha)*8.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0)*(1.-alpha)*(1.-bgColor);gl_FragColor=vec4(color,alpha);}`;
class Ufx extends PostEffect {
  scene = new Scene();
  camera = new PerspectiveCamera(60, 1);
  frameIdx = -1;
  sectionLayer = new Object3D();
  projectDetailsLayer = new Object3D();
  sharedUniforms = {
    u_fromTexture: {
      value: null
    }
  };
  init() {}
  setPostprocessing(e) {
    let t = this.camera;
    let r = properties.viewportWidth;
    let n = properties.viewportHeight;
    t.position.set(r / 2, -n / 2, n / (Math.tan(t.fov * Math.PI / 360) * 2));
    t.aspect = r / n;
    t.far = t.position.z * 2;
    t.near = t.far / 1000;
    t.updateProjectionMatrix();
  }
  render(e, t = false) {
    let r = fboHelper.getColorState();
    let n = properties.renderer;
    fboHelper.copy(e.fromTexture, e.sceneRenderTarget);
    n.setRenderTarget(e.sceneRenderTarget);
    fboHelper.renderer.autoClear = false;
    fboHelper.renderer.autoClearColor = false;
    fboHelper.renderer.autoClearStencil = true;
    fboHelper.renderer.autoClearDepth = true;
    fboHelper.renderer.clear(false, true, true);
    n.render(this.scene, this.camera);
    n.setRenderTarget(null);
    let a = t ? null : e.toRenderTarget;
    fboHelper.copy(e.sceneTexture, a);
    fboHelper.setColorState(r);
    e.swap();
  }
}
class PreUfx extends Ufx {
  renderOrder = 50;
}
const preUfx = new PreUfx();
let _matrixWorld = new Matrix4();
let _matrixWorldInverse = new Matrix4();
let _projectionMatrix = new Matrix4();
let _q$1 = new Quaternion();
let _v1$3 = new Vector3();
class GoalTunnelGlass {
  PIECE_COUNT = 946;
  domFrameHeight = 1;
  domFrameRotation = 0;
  domFrameScale = 1;
  fragmentScale = 1;
  container;
  mesh;
  _geometry;
  ratio = 0;
  frameCount = 0;
  sharedUniforms = {
    u_positionTexture: {
      value: null
    },
    u_orientTexture: {
      value: null
    },
    u_textureSize: {
      value: new Vector2(0, 0)
    },
    u_frameFrom: {
      value: 0
    },
    u_frameTo: {
      value: 0
    },
    u_frameRatio: {
      value: 0
    },
    u_fragmentScale: {
      value: 0
    }
  };
  preInit() {
    this.container = new Object3D();
    properties.loader.add(settings.MODEL_PATH + "tunnels/broken_glass.buf", {
      onLoad: e => {
        this._onModelLoad(e);
      }
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/broken_glass_animation.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
  }
  _onModelLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: {
        u_backgroundTexture: properties.postprocessing.sharedUniforms.u_fromTexture,
        u_resolution: properties.sharedUniforms.u_resolution,
        u_positionTexture: this.sharedUniforms.u_positionTexture,
        u_orientTexture: this.sharedUniforms.u_orientTexture,
        u_textureSize: this.sharedUniforms.u_textureSize,
        u_frameFrom: this.sharedUniforms.u_frameFrom,
        u_frameTo: this.sharedUniforms.u_frameTo,
        u_frameRatio: this.sharedUniforms.u_frameRatio,
        u_fragmentScale: this.sharedUniforms.u_fragmentScale
      },
      vertexShader: vert$f,
      fragmentShader: frag$j,
      transparent: true,
      extensions: {
        derivatives: true
      }
    }));
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1000;
    this.container.add(this.mesh);
    this.mesh.onBeforeRender = this._onBeforeRender.bind(this);
    this.mesh.onAfterRender = this._onAfterRender.bind(this);
  }
  _onBeforeRender(e, t, r) {
    let n = cameraControls._camera;
    _matrixWorld.copy(r.matrixWorld);
    r.matrixWorld.copy(n.matrixWorld);
    _matrixWorldInverse.copy(r.matrixWorldInverse);
    r.matrixWorldInverse.copy(n.matrixWorldInverse);
    _projectionMatrix.copy(r.projectionMatrix);
    r.projectionMatrix.copy(n.projectionMatrix);
  }
  _onAfterRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      r.matrixWorld.copy(_matrixWorld);
      r.matrixWorldInverse.copy(_matrixWorldInverse);
      r.projectionMatrix.copy(_projectionMatrix);
    }
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) {
      return;
    }
    let t = e.attributes.position.array;
    let r = new Float32Array(t.length / 3 * 4);
    let n = this.frameCount = t.length / (this.PIECE_COUNT * 3);
    this.sharedUniforms.u_textureSize.value.set(this.PIECE_COUNT, n);
    for (let a = 0, l = 0; a < t.length; a += 3, l += 4) {
      r[l + 0] = t[a + 0];
      r[l + 1] = t[a + 1];
      r[l + 2] = t[a + 2];
      r[l + 3] = 0;
    }
    this.sharedUniforms.u_positionTexture.value = fboHelper.createDataTexture(r, this.PIECE_COUNT, n, true, true);
    this.sharedUniforms.u_orientTexture.value = fboHelper.createDataTexture(e.attributes.orient.array, this.PIECE_COUNT, n, true, true);
  }
  init() {
    taskManager.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    if (this.mesh && this.container.visible) {
      if (this.ratio > 0) {
        let t = cameraControls._camera;
        this.mesh.position.copy(t.position);
        this.mesh.quaternion.copy(t.quaternion);
        this.mesh.translateZ(-goalTunnels.EndCameraDepthToFrame);
        let r = Math.tan(t.fov * math.DEG2RAD / 2) * goalTunnels.EndCameraDepthToFrame * 2;
        let n = this.domFrameHeight / properties.viewportHeight;
        n *= r * this.domFrameScale;
        _q$1.setFromAxisAngle(_v1$3.set(0, 0, 1), -this.domFrameRotation);
        this.mesh.quaternion.multiply(_q$1);
        this.mesh.scale.setScalar(n);
        let a = this.ratio * (this.frameCount - 1);
        let l = Math.floor(a);
        let c = Math.min(l + 1, this.frameCount - 1);
        let u = a - l;
        this.sharedUniforms.u_frameFrom.value = l;
        this.sharedUniforms.u_frameTo.value = c;
        this.sharedUniforms.u_frameRatio.value = u;
        this.sharedUniforms.u_fragmentScale.value = this.fragmentScale;
        this.mesh.visible = true;
      } else {
        this.mesh.visible = false;
      }
    }
  }
}
const goalTunnelGlass = new GoalTunnelGlass();
const validateEmail = o => o.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var toQuerystring_min = {
  exports: {}
};
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    return (() => {
      var t = {
        d: (p, g) => {
          for (var v in g) {
            if (t.o(g, v) && !t.o(p, v)) {
              Object.defineProperty(p, v, {
                enumerable: true,
                get: g[v]
              });
            }
          }
        },
        o: (p, g) => Object.prototype.hasOwnProperty.call(p, g),
        r: p => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(p, Symbol.toStringTag, {
              value: "Module"
            });
          }
          Object.defineProperty(p, "__esModule", {
            value: true
          });
        }
      };
      var r = {};
      function n(p) {
        n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (g) {
          return typeof g;
        } : function (g) {
          if (g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof g;
          }
        };
        return n(p);
      }
      t.r(r);
      t.d(r, {
        default: () => f
      });
      var a = encodeURIComponent;
      function l(p, g, v, _, T) {
        var M = _ && T.arrayPrefix || "";
        if (n(g) === "object") {
          var S = `${p}${M}${v && "]"}[`;
          return `${u(g, `${v}${S}`, T)}`;
        }
        if (v && v.length) {
          return `${v}${p}]${M}=${a(g)}`;
        } else {
          return `${p}${M}=${a(g)}`;
        }
      }
      function c(p, g, v, _) {
        return g.map(function (T) {
          return l(p, T, v, true, _);
        }).join("&");
      }
      function u(p, g = "", v = {}) {
        return (Array.isArray(p) ? p.map(function (_, T) {
          return l(`${T}`, _, g, true, v);
        }) : Object.keys(p).filter(function (_) {
          return p[_] !== undefined;
        }).map(function (_) {
          if (p[_] && Array.isArray(p[_])) {
            return c(`${_}`, p[_], g, v);
          } else {
            return l(_, p[_], g, false, v);
          }
        })).join("&").replace(/%20/g, "+");
      }
      const f = u;
      return r;
    })();
  });
})(toQuerystring_min);
var toQuerystring_minExports = toQuerystring_min.exports;
const toQueryString = getDefaultExportFromCjs(toQuerystring_minExports);
var browser = {
  exports: {}
};
var debug$1 = {
  exports: {}
};
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
function ms(o, e) {
  e = e || {};
  var t = typeof o;
  if (t === "string" && o.length > 0) {
    return parse(o);
  }
  if (t === "number" && isNaN(o) === false) {
    if (e.long) {
      return fmtLong(o);
    } else {
      return fmtShort(o);
    }
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(o));
}
function parse(o) {
  o = String(o);
  if (!(o.length > 100)) {
    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(o);
    if (e) {
      var t = parseFloat(e[1]);
      var r = (e[2] || "ms").toLowerCase();
      switch (r) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return t * y;
        case "days":
        case "day":
        case "d":
          return t * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return t * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return t * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return t * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return t;
        default:
          return;
      }
    }
  }
}
function fmtShort(o) {
  if (o >= d) {
    return Math.round(o / d) + "d";
  } else if (o >= h) {
    return Math.round(o / h) + "h";
  } else if (o >= m) {
    return Math.round(o / m) + "m";
  } else if (o >= s) {
    return Math.round(o / s) + "s";
  } else {
    return o + "ms";
  }
}
function fmtLong(o) {
  return plural(o, d, "day") || plural(o, h, "hour") || plural(o, m, "minute") || plural(o, s, "second") || o + " ms";
}
function plural(o, e, t) {
  if (!(o < e)) {
    if (o < e * 1.5) {
      return Math.floor(o / e) + " " + t;
    } else {
      return Math.ceil(o / e) + " " + t + "s";
    }
  }
}
(function (o, e) {
  e = o.exports = n.debug = n.default = n;
  e.coerce = u;
  e.disable = l;
  e.enable = a;
  e.enabled = c;
  e.humanize = ms;
  e.names = [];
  e.skips = [];
  e.formatters = {};
  var t;
  function r(f) {
    var p = 0;
    var g;
    for (g in f) {
      p = (p << 5) - p + f.charCodeAt(g);
      p |= 0;
    }
    return e.colors[Math.abs(p) % e.colors.length];
  }
  function n(f) {
    function p() {
      if (p.enabled) {
        var g = p;
        var v = +new Date();
        var _ = v - (t || v);
        g.diff = _;
        g.prev = t;
        g.curr = v;
        t = v;
        for (var T = new Array(arguments.length), M = 0; M < T.length; M++) {
          T[M] = arguments[M];
        }
        T[0] = e.coerce(T[0]);
        if (typeof T[0] != "string") {
          T.unshift("%O");
        }
        var S = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, function (C, w) {
          if (C === "%%") {
            return C;
          }
          S++;
          var R = e.formatters[w];
          if (typeof R == "function") {
            var E = T[S];
            C = R.call(g, E);
            T.splice(S, 1);
            S--;
          }
          return C;
        });
        e.formatArgs.call(g, T);
        var b = p.log || e.log || console.log.bind(console);
        b.apply(g, T);
      }
    }
    p.namespace = f;
    p.enabled = e.enabled(f);
    p.useColors = e.useColors();
    p.color = r(f);
    if (typeof e.init == "function") {
      e.init(p);
    }
    return p;
  }
  function a(f) {
    e.save(f);
    e.names = [];
    e.skips = [];
    var p = (typeof f == "string" ? f : "").split(/[\s,]+/);
    for (var g = p.length, v = 0; v < g; v++) {
      if (p[v]) {
        f = p[v].replace(/\*/g, ".*?");
        if (f[0] === "-") {
          e.skips.push(new RegExp("^" + f.substr(1) + "$"));
        } else {
          e.names.push(new RegExp("^" + f + "$"));
        }
      }
    }
  }
  function l() {
    e.enable("");
  }
  function c(f) {
    var p;
    var g;
    p = 0;
    g = e.skips.length;
    for (; p < g; p++) {
      if (e.skips[p].test(f)) {
        return false;
      }
    }
    p = 0;
    g = e.names.length;
    for (; p < g; p++) {
      if (e.names[p].test(f)) {
        return true;
      }
    }
    return false;
  }
  function u(f) {
    if (f instanceof Error) {
      return f.stack || f.message;
    } else {
      return f;
    }
  }
})(debug$1, debug$1.exports);
var debugExports = debug$1.exports;
(function (o, e) {
  var t = {};
  e = o.exports = debugExports;
  e.log = a;
  e.formatArgs = n;
  e.save = l;
  e.load = c;
  e.useColors = r;
  e.storage = typeof chrome !== "undefined" && typeof chrome.storage !== "undefined" ? chrome.storage.local : u();
  e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
  function r() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    } else {
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
  }
  e.formatters.j = function (f) {
    try {
      return JSON.stringify(f);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
  function n(f) {
    var p = this.useColors;
    f[0] = (p ? "%c" : "") + this.namespace + (p ? " %c" : " ") + f[0] + (p ? "%c " : " ") + "+" + e.humanize(this.diff);
    if (p) {
      var g = "color: " + this.color;
      f.splice(1, 0, g, "color: inherit");
      var v = 0;
      var _ = 0;
      f[0].replace(/%[a-zA-Z%]/g, function (T) {
        if (T !== "%%") {
          v++;
          if (T === "%c") {
            _ = v;
          }
        }
      });
      f.splice(_, 0, g);
    }
  }
  function a() {
    return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function l(f) {
    try {
      if (f == null) {
        e.storage.removeItem("debug");
      } else {
        e.storage.debug = f;
      }
    } catch {}
  }
  function c() {
    var f;
    try {
      f = e.storage.debug;
    } catch {}
    if (!f && typeof process !== "undefined" && "env" in process) {
      f = t.DEBUG;
    }
    return f;
  }
  e.enable(c());
  function u() {
    try {
      return window.localStorage;
    } catch {}
  }
})(browser, browser.exports);
var browserExports = browser.exports;
var debug = browserExports("jsonp");
var jsonp_1 = jsonp;
var count = 0;
function noop() {}
function jsonp(o, e, t) {
  if (typeof e == "function") {
    t = e;
    e = {};
  }
  e ||= {};
  var r = e.prefix || "__jp";
  var n = e.name || r + count++;
  var a = e.param || "callback";
  var l = e.timeout ?? 60000;
  var c = encodeURIComponent;
  var u = document.getElementsByTagName("script")[0] || document.head;
  var f;
  var p;
  if (l) {
    p = setTimeout(function () {
      g();
      if (t) {
        t(new Error("Timeout"));
      }
    }, l);
  }
  function g() {
    if (f.parentNode) {
      f.parentNode.removeChild(f);
    }
    window[n] = noop;
    if (p) {
      clearTimeout(p);
    }
  }
  function v() {
    if (window[n]) {
      g();
    }
  }
  window[n] = function (_) {
    debug("jsonp got", _);
    g();
    if (t) {
      t(null, _);
    }
  };
  o += (~o.indexOf("?") ? "&" : "?") + a + "=" + c(n);
  o = o.replace("?&", "?");
  debug("jsonp req \"%s\"", o);
  f = document.createElement("script");
  f.src = o;
  u.parentNode.insertBefore(f, u);
  return v;
}
const jsonp$1 = getDefaultExportFromCjs(jsonp_1);
const MAILCHIMP_URL = "https://lusion.us20.list-manage.com/subscribe/post?u=ea813c53ac6d7a0b76f2e36a1&amp;id=44b41b41bf&amp;v_id=4233&amp;f_id=001e18e7f0";
const getAjaxUrl = o => o.replace("/post?", "/post-json?");
class NewletterForm {
  isSendingTheNewletterRequest = false;
  domNewsletterForm;
  domNewsletterMessage;
  constructor(e, t, r) {
    this.domNewsletterForm = e;
    this.domNewsletterButton = t;
    this.domNewsletterMessage = r;
    this.domNewsletterForm.addEventListener("submit", this._onFormSubmit.bind(this));
  }
  _onFormSubmit(e) {
    e.preventDefault();
    if (this.isSendingTheNewletterRequest) {
      return;
    }
    this.domNewsletterMessage.classList.remove("error");
    this.domNewsletterMessage.innerHTML = "";
    const t = e.target;
    const n = new FormData(t).get("EMAIL");
    if (!validateEmail(n)) {
      this.domNewsletterMessage.classList.add("error");
      this.domNewsletterMessage.innerHTML = "The email is not valid!";
      return;
    }
    this.isSendingTheNewletterRequest = true;
    this.domNewsletterButton.disabled = true;
    const a = getAjaxUrl(MAILCHIMP_URL) + "&" + toQueryString({
      EMAIL: n
    });
    jsonp$1(a, {
      param: "c"
    }, (l, c) => {
      if (l) {
        this.domNewsletterMessage.classList.add("error");
        this.domNewsletterMessage.innerHTML = "Something went wrong, try again";
      } else if (c.result !== "success") {
        this.domNewsletterMessage.classList.add("error");
        this.domNewsletterMessage.innerHTML = "Something went wrong, try again";
      } else {
        this.domNewsletterMessage.innerHTML = "Almost there! Check your email box!";
        t.reset();
        setTimeout(() => {
          this.domNewsletterMessage.innerHTML = "";
        }, 3000);
      }
      this.isSendingTheNewletterRequest = false;
      this.domNewsletterButton.disabled = false;
    });
  }
}
class FooterSection {
  domContainer;
  offsetY = 0;
  _needsReset = true;
  preInit() {
    this.domContainer = document.getElementById("footer-section");
    this.domContactAddress = document.getElementById("footer-contact-address");
    this.domContactAddress._words = [];
    this.domContactSocials = document.getElementById("footer-contact-socials");
    this.domContactSocials._words = [];
    this.domContactEnquires = document.getElementById("footer-contact-enquires");
    this.domContactEnquires._words = [];
    this.domContactBusiness = document.getElementById("footer-contact-business");
    this.domContactBusiness._words = [];
    this.domNewsletterHeader = document.getElementById("footer-newsletter-header");
    this.domNewsletterHeader._words = [];
    this.domNewsletterForm = document.getElementById("footer-newsletter-form");
    this.domNewsletterMessage = document.getElementById("footer-newsletter-feedback-message");
    this.domNewsletterInput = document.getElementById("footer-newsletter-input");
    this.domNewsletterInput._time = 0;
    this.domNewsletterInput._animating = false;
    this.domNewsletterBg = document.getElementById("footer-newsletter-bg");
    this.domNewsletterButton = document.getElementById("footer-newsletter-input-arrow");
    this.domFooterBottom = document.getElementById("footer-bottom");
    this.domFooterBottom._time = 0;
    this.domFooterBottom._animating = false;
    this.domFooterMiddle = document.getElementById("footer-middle");
    this.domFooterBottomLabs = document.getElementById("footer-bottom-labs");
    this.domFooterBottomCopyright = document.getElementById("footer-bottom-copyright");
    this.domFooterBottomTagline = document.getElementById("footer-bottom-tagline");
    this.domFooterBottomUp = document.getElementById("footer-bottom-up");
    this.domFooterBottomUp._time = 0;
    this.domAddressLines = Array.from(document.querySelectorAll(".footer-address-line"));
    this.domSocialsLines = Array.from(document.querySelectorAll(".footer-socials-line"));
    this.domEnquiresLines = [document.getElementById("footer-enquires-header"), document.getElementById("footer-enquires-link")];
    this.domBusinessLines = [document.getElementById("footer-business-header"), document.getElementById("footer-business-link")];
    this.domNewsletterLines = Array.from(document.querySelectorAll(".footer-newsletter-line"));
    this.middleContainers = [this.domContactAddress, this.domContactSocials, this.domContactEnquires, this.domContactBusiness, this.domNewsletterHeader];
    this.bottomContainers = [this.domFooterBottomCopyright, this.domFooterBottomLabs, this.domFooterBottomTagline, this.domFooterBottomUp];
  }
  init() {
    this.formManager = new NewletterForm(this.domNewsletterForm, this.domNewsletterButton, this.domNewsletterMessage);
    this.domFooterBottomUp.addEventListener("click", this._onDomUpBtnClick.bind(this));
    this._splitText();
  }
  resize(e, t) {
    let r = Array.from(this.domContactAddress.querySelectorAll(".footer-address-line-wrapper"));
    let n = this.domContactAddress.getBoundingClientRect();
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      let c = l.getBoundingClientRect();
      l.style.setProperty("--delta-x", n.right - c.right + "px");
    }
  }
  getDomRange() {
    return scrollManager.getDomRange(this.domContainer);
  }
  update(e) {
    let t = this.getDomRange();
    if (t.isActive) {
      if (this._needsReset) {
        this._reset();
      }
      if (t.screenRatio > -0.1) {
        document.documentElement.classList.add("is-footer-in");
      } else {
        document.documentElement.classList.remove("is-footer-in");
      }
      if (properties.useMobileLayout) {
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l];
          for (let u = 0; u < c._words.length; u++) {
            let f = c._words[u];
            for (let p = 0; p < f.length; p++) {
              let g = f[p];
              let v = 0;
              g.style.transform = `translate3d(0, ${v}em, 0)`;
            }
          }
        }
      } else {
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l];
          let u = scrollManager.getDomRange(c);
          c._time = math.clamp(c._time + (c._animating ? e : -e), 0, Infinity);
          for (let f = 0; f < c._words.length; f++) {
            let p = c._words[f];
            for (let g = 0; g < p.length; g++) {
              let v = p[g];
              let _ = math.fit(c._time - f / 10, 0, 1, 1.5, 0, ease.lusion);
              v.style.transform = `translate3d(0, ${_}em, 0)`;
            }
          }
          if (u.screenRatio > -1) {
            c._animating = true;
          } else {
            c._animating = false;
          }
        }
      }
      let n = scrollManager.getDomRange(this.domNewsletterInput);
      this.domNewsletterInput._time = math.saturate(this.domNewsletterInput._time + (this.domNewsletterInput._animating ? e : -e));
      if (n.screenRatio > -1) {
        this.domNewsletterInput._animating = true;
        this.domNewsletterInput.classList.add("--active");
      } else {
        this.domNewsletterInput._animating = false;
        this.domNewsletterInput.classList.remove("--active");
      }
      if (properties.useMobileLayout) {
        this.domNewsletterBg.style.transform = "scale3d(1, 1, 1)";
        this.domNewsletterButton.style.transform = "scale(1)";
      } else {
        this.domNewsletterBg.style.transform = `scale3d(${math.fit(this.domNewsletterInput._time, 0, 1, 0, 1, ease.lusion)}, 1, 1)`;
        this.domNewsletterButton.style.transform = `scale(${math.fit(this.domNewsletterInput._time - 0.8, 0, 0.2, 0, 1, ease.lusion)})`;
      }
      let a = scrollManager.getDomRange(this.domFooterBottom);
      this.domFooterBottom._time = math.saturate(this.domFooterBottom._time + (this.domFooterBottom._animating ? e * 1 : -e * 1));
      if (a.screenRatio > -1) {
        this.domFooterBottom._animating = true;
      } else {
        this.domFooterBottom._animating = false;
      }
      if (!properties.useMobileLayout) {
        for (let l = 0; l < this.bottomContainers.length; l++) {
          let c = this.bottomContainers[l];
          if (l === this.bottomContainers.length - 1) {
            let u = math.fit(this.domFooterBottom._time - 0.3, 0, 0.3, 0, 1, ease.lusion);
            c.style.transform = `scale(${u})`;
          } else {
            for (let u = 0; u < c._splitted.words.length; u++) {
              let f = c._splitted.words[u];
              let p = math.fit(this.domFooterBottom._time - l / 10 - u / 10, 0, 0.6, 100, 0, ease.lusion);
              f.style.transform = `translate3d(0, ${p}%, 0)`;
            }
          }
        }
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, {
        types: "words"
      });
    }
    let e = [{
      lines: this.domAddressLines,
      parent: this.domContactAddress
    }, {
      lines: this.domSocialsLines,
      parent: this.domContactSocials
    }, {
      lines: this.domEnquiresLines,
      parent: this.domContactEnquires
    }, {
      lines: this.domBusinessLines,
      parent: this.domContactBusiness
    }, {
      lines: this.domNewsletterLines,
      parent: this.domNewsletterHeader
    }];
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, {
        types: "words"
      });
    }
    for (let t = 0; t < e.length; t++) {
      let r = e[t].lines;
      let n = e[t].parent;
      for (let a = 0; a < r.length; a++) {
        let l = r[a];
        this._createWrapper(l, n);
      }
    }
  }
  _createWrapper(e, t) {
    let r = new SplitType(e, {
      types: "words"
    });
    let n = document.createElement("div");
    n.classList.add(e.classList[0] ? e.classList[0] + "-wrapper" : e.id + "-wrapper");
    n.style.position = "relative";
    n.style.overflow = "hidden";
    n.style.display = "flex";
    n.style.flexDirection = "column";
    n.append(e);
    t.appendChild(n);
    t._words.push(r.words);
    t._time = 0;
    t._animating = false;
    n._topWords = r.words;
  }
  _reset() {
    this._needsReset = false;
    for (let e = 0; e < this.middleContainers.length; e++) {
      let t = this.middleContainers[e];
      t._time = 0;
      for (let r = 0; r < t._words.length; r++) {
        let n = t._words[r];
        for (let a = 0; a < n.length; a++) {
          let l = n[a];
          l.style.transform = "translate3d(0, 0, 0)";
        }
      }
      t._animating = false;
    }
  }
  _onDomUpBtnClick() {
    scrollManager.scrollToPixel(0);
  }
}
const footerSection = new FooterSection();
class GoalSectionRanges {
  items = {};
  itemList = [{
    id: "blackFrameShow",
    isPixelBased: true
  }, {
    id: "blackFrameIn",
    weight: 1
  }, {
    id: "blackTitle",
    weight: 5
  }, {
    id: "blackTunnel",
    weight: 12
  }, {
    id: "whiteTunnel",
    weight: 2
  }, {
    id: "whiteFrameOut",
    weight: 1
  }, {
    id: "whiteFrameBreak",
    weight: 1.5
  }, {
    id: "astronautDrop",
    isPixelBased: true
  }, {
    id: "astronautWait",
    isPixelBased: true
  }];
  offsetY = 0;
  prevRatio = null;
  ratio = null;
  wasActive = null;
  isActive = null;
  _cachedRanges = {};
  totalPixelCount = 0;
  totalTunnelWeight = 0;
  baseY = 0;
  domContainer;
  domImgIn;
  domImgOut;
  tick = 0;
  SHOW_DEBUG = false;
  _debugTimeline;
  _debugTimelineItems = [];
  _debugTimelineIndicator;
  init(e) {
    this.domContainer = e.querySelector("#home-goal");
    this.domImgIn = e.querySelector("#home-goal-image-in");
    this.domImgOut = e.querySelector("#home-goal-image-out");
    for (let t = 0; t < this.itemList.length; t++) {
      let r = this.itemList[t];
      this.items[r.id] = r;
      if (r.weight) {
        this.totalTunnelWeight += r.weight;
      }
    }
    if (this.SHOW_DEBUG) {
      this._debugTimeline = document.createElement("div");
      this._debugTimeline.style = `
				position: fixed;
				bottom: 0;
				left: 0;
				zIndex: 1000;
				height: 4px;
				width: 100%;
				pointerEvents: none;
			`;
      document.body.appendChild(this._debugTimeline);
      for (let t = 0; t < this.itemList.length; t++) {
        let r = this._debugTimelineItems[t] = document.createElement("div");
        r.style = `
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					bottom: 0;
					background: ${t % 2 ? "green" : "blue"};
					transform-origin: 0 0;
				`;
        this._debugTimeline.appendChild(r);
      }
      this._debugTimelineIndicator = document.createElement("div");
      this._debugTimelineIndicator.style = `
				position: position;
				left: -10px;
				top: -20px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 20px 10px 0 10px;
				border-color: red transparent transparent transparent;
			`;
      this._debugTimeline.appendChild(this._debugTimelineIndicator);
    }
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer);
    let n = scrollManager.getDomRange(this.domImgIn);
    let a = scrollManager.getDomRange(this.domImgOut);
    this.baseY = n.top - properties.viewportHeight;
    let c = r.bottom - this.baseY - (t + n.height) * 0.5 - (t + a.height) * 0.5;
    this.items.blackFrameShow.pixelCount = (t + n.height) * 0.5;
    this.items.astronautDrop.pixelCount = (t + a.height) * 0.5 + t;
    let u = scrollManager.getDomRange(footerSection.domContainer).bottom - r.bottom;
    this.items.astronautWait.pixelCount = u - this.items.astronautDrop.pixelCount * 0;
    this.totalPixelCount = 0;
    for (let f = 0; f < this.itemList.length; f++) {
      let p = this.itemList[f];
      p.pixelFrom = this.totalPixelCount;
      if (p.weight) {
        p.pixelCount = c * p.weight / this.totalTunnelWeight;
      }
      this.totalPixelCount += p.pixelCount;
      p.pixelTo = this.totalPixelCount;
    }
    if (this.SHOW_DEBUG) {
      for (let f = 0; f < this.itemList.length; f++) {
        let p = this.itemList[f];
        let g = this._debugTimelineItems[f];
        g.style.transform = `translateX(${p.pixelFrom / this.totalPixelCount * e}px) scaleX(${p.pixelCount / this.totalPixelCount})`;
      }
    }
  }
  update(e) {
    this.tick++;
    this.offsetY = scrollManager.scrollPixel - this.baseY;
    this.prevRatio = this.ratio;
    this.ratio = this.offsetY / this.totalPixelCount;
    this.wasActive = this.isActive;
    this.isActive = this.ratio >= 0 && this.ratio < 1;
    if (this.SHOW_DEBUG) {
      this._debugTimelineIndicator.style.transform = `translateX(${this.ratio * properties.viewportWidth}px) translate3d(-50%, -20px, 0)`;
    }
  }
  getRange(e, t = e) {
    let r = e + "-" + t;
    let n = this._cachedRanges[r];
    n ||= this._cachedRanges[r] = {
      from: this.items[e],
      to: this.items[t]
    };
    if (n.tick !== this.tick) {
      n.tick = this.tick;
      n.pixelFrom = n.from.pixelFrom;
      n.pixelTo = n.to.pixelTo;
      n.pixelCount = n.pixelTo - n.pixelFrom;
      n.pixel = scrollManager.scrollPixel - this.baseY - n.pixelFrom;
      n.ratio = n.pixel / n.pixelCount;
      n.isActive = n.ratio >= 0 && n.ratio < 1;
    }
    return n;
  }
}
const homeGoalSectionRanges = new GoalSectionRanges();
const vert$e = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;void main(){vec3 pos=position;pos.z*=0.1;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=pos;}`;
const frag$i = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;uniform sampler2D u_earthTexture;uniform vec3 u_bgColor;uniform vec3 u_atmosphereColor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getBlueNoise>
void main(){vec3 bn=getBlueNoise(gl_FragCoord.xy);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 earthMap=texture2D(u_earthTexture,v_uv).rgb;gl_FragColor.rgb=earthMap;gl_FragColor.a=0.0;}`;
class GoalTunnelsBackground {
  container = new Object3D();
  mesh = null;
  constructor() {}
  preInit() {
    this.earthTexture = properties.loader.add(settings.TEXTURE_PATH + "tunnels/earth_landscape.jpg", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/earth_card.buf", {
      onLoad: e => {
        this.geo = e;
      }
    });
  }
  init() {
    this.mesh = new Mesh(this.geo, new ShaderMaterial({
      uniforms: Object.assign({
        u_bgColor: {
          value: new Color()
        },
        u_atmosphereColor: {
          value: new Color("#4169E1")
        },
        u_earthTexture: {
          value: this.earthTexture
        }
      }, blueNoise.sharedUniforms),
      vertexShader: vert$e,
      fragmentShader: frag$i
    }));
    this.mesh.renderOrder = -1;
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const t = math.saturate(homeGoalSectionRanges.getRange("blackFrameShow").ratio);
    const r = math.saturate(homeGoalSectionRanges.getRange("blackFrameIn").ratio);
    this.mesh.material.uniforms.u_bgColor.value.copy(properties.bgColor);
    this.mesh.position.y = -((1 - t) * 10 + 2.5 + r * 30);
    this.mesh.scale.setScalar(math.fit(r, 0, 0.5, 40, 70));
    this.container.rotation.x = math.fit(r, 0, 0.5, 0, -1);
    this.mesh.visible = r < 1;
  }
}
const goalTunnelsBackground = new GoalTunnelsBackground();
const vert$d = `#define GLSLIFY 1
attribute vec3 a_instancePosition;attribute vec3 a_instanceRotationAxis;attribute vec4 a_instanceRand;attribute float thickness;uniform float u_time;uniform float u_aspect;uniform float u_activeRatio;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif
float elasticOut(float t){return sin(-13.0*(t+1.0)*HALF_PI)*pow(2.0,-10.0*t)+1.0;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec3 rotate(vec3 v,vec3 axis,float angle){vec4 q=quaternion(axis,angle*.5);return qrotate(q,v);}void main(){float time=0.5*u_time+4.*a_instanceRand.x;float scale=0.75;vec3 pos=position;vec4 orient=quaternion(a_instanceRotationAxis,(0.5+a_instanceRand.y)*time);pos=qrotate(orient,pos);pos*=scale;vec3 nor=qrotate(orient,normal);vec3 instancePosition=a_instancePosition;instancePosition.y+=0.5*u_time*(1.+a_instanceRand.x);float yLimit=20.0/u_aspect;instancePosition.y=mod(instancePosition.y,yLimit)-0.5*yLimit;v_fadeOut=abs(instancePosition.y)/(yLimit*0.5);pos*=linearStep(a_instanceRand.w*0.5,a_instanceRand.w*0.5+0.5,u_activeRatio);pos+=instancePosition;vec4 orientInv=vec4(-orient.xyz,orient.w);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_cameraPositionLS=qrotate(orientInv,(cameraPosition-instancePosition)/scale);v_positionLS=position*scale;v_normalLS=normal;v_orient=orient;v_viewNormal=normalMatrix*nor;v_thickness=thickness;}`;
const frag$h = `#define GLSLIFY 1
uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec4 u_planes[25];uniform mat3 normalMatrix;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float plaIntersect(in vec3 ro,in vec3 rd,in vec4 p){return-(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);}vec4 getColorShade(vec3 dir,vec3 vn){float d=dot(dir,vn);float shade=(1.0-max(0.,vn.z))*v_thickness*5.;shade*=(pow(linearStep(2.,-1.,d),4.)*0.15+pow(linearStep(1.,-2.,d),5.)*7.);vec3 rgb=mix(vec3(0.8),clamp(abs(mod((d+vn.z)*12.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0),1.-shade);return vec4((vec3(u_color)+rgb*1.2)*shade,0.035+(1.-v_thickness)*shade*shade)*(1.-abs(vn.z));}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 localDir=normalize(v_positionLS);vec3 viewNormal=normalize(v_viewNormal);float ior=2.418;vec3 norLS=normalize(v_normalLS);vec3 refrLS=refract(normalize(v_positionLS-v_cameraPositionLS),norLS,1./ior);float dist=100.;vec3 planeDir=vec3(0.);for(int i=0;i<25;i++){vec4 plane=u_planes[i];plane.xyz*=-1.;plane.w*=0.7501;float hitDist=plaIntersect(v_positionLS+refrLS*0.001,refrLS,plane);if(hitDist>0.&&hitDist<dist){dist=hitDist;planeDir=u_planes[i].xyz;}}vec3 refrPosLS=v_positionLS+refrLS*dist;refrLS=refract(refrLS,planeDir,ior);vec3 refrLocalDir=qrotate(v_orient,normalize(refrPosLS));vec3 viewPlaneNor=normalMatrix*qrotate(v_orient,planeDir);vec4 frontColorShade=getColorShade(localDir,viewNormal);vec4 backColorShade=getColorShade(refrLocalDir,viewPlaneNor);gl_FragColor=frontColorShade*1.5+vec4(backColorShade.rgb*0.75,backColorShade.a*.5);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`;
const _v$1 = new Vector3();
class GoalWhiteTunnelParticles {
  PARTICLE_COUNT = 64;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  activeRatio = 0;
  constructor() {}
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "tunnels/diamond.buf", {
      onLoad: e => this.geo = e
    });
  }
  init() {
    let e = this.geo;
    let t = new InstancedBufferGeometry();
    for (let u in e.attributes) {
      t.attributes[u] = e.attributes[u];
    }
    t.index = e.index;
    let r = math.getSeedRandomFn("diamonds-3");
    const n = new Float32Array(this.PARTICLE_COUNT * 3);
    const a = new Float32Array(this.PARTICLE_COUNT * 3);
    const l = new Float32Array(this.PARTICLE_COUNT * 4);
    let c = [-0.694747, 0.694747, 0.186157, -0.239229, -0.50859, 0.694747, 0.50859, -0.239229, -0.186157, 0.694747, 0.694747, -0.239229, 0.186157, 0.694747, 0.694747, -0.239229, 0.50859, 0.694747, 0.50859, -0.239229, 0.694747, 0.694747, 0.186157, -0.239229, 0.694747, 0.694747, -0.186157, -0.239229, 0.50859, 0.694747, -0.50859, -0.239229, 0.186157, 0.694747, -0.694746, -0.239229, -0.186156, 0.694747, -0.694747, -0.239229, -0.508589, 0.694747, -0.50859, -0.239229, -0.694747, 0.694747, -0.186157, -0.239229, -0.694747, -0.694747, 0.186157, -0.455518, -0.50859, -0.694747, 0.50859, -0.455518, -0.186157, -0.694747, 0.694747, -0.455518, 0.186157, -0.694747, 0.694747, -0.455518, 0.50859, -0.694747, 0.50859, -0.455518, 0.694746, -0.694747, 0.186157, -0.455518, 0.694746, -0.694747, -0.186157, -0.455518, 0.50859, -0.694747, -0.50859, -0.455518, 0.186157, -0.694747, -0.694746, -0.455518, -0.186156, -0.694747, -0.694747, -0.455518, -0.508589, -0.694747, -0.50859, -0.455518, -0.694747, -0.694747, -0.186157, -0.455518, -0, -1, -0, -0.34434];
    for (let u = 0, f = 0, p = 0; u < this.PARTICLE_COUNT; u++, f += 3, p += 4) {
      n[f] = (r() * 2 - 1) * 16;
      n[f + 1] = (r() * 2 - 1) * 16;
      n[f + 2] = 19 - (this.PARTICLE_COUNT - u - 1) / (this.PARTICLE_COUNT - 1) * 8;
      _v$1.randomDirection();
      a[f] = _v$1.x;
      a[f + 1] = _v$1.y;
      a[f + 2] = _v$1.z;
      l[p] = r();
      l[p + 1] = r();
      l[p + 2] = r();
      l[p + 3] = r();
    }
    t.setAttribute("a_instancePosition", new InstancedBufferAttribute(n, 3));
    t.setAttribute("a_instanceRotationAxis", new InstancedBufferAttribute(a, 3));
    t.setAttribute("a_instanceRand", new InstancedBufferAttribute(l, 4));
    this.material = new ShaderMaterial({
      vertexShader: vert$d,
      fragmentShader: frag$h,
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_activeRatio: {
          value: 0
        },
        u_color: {
          value: new Color("#689aff")
        },
        u_planes: {
          value: c
        },
        u_bgColor: {
          value: new Color()
        },
        u_aspect: properties.sharedUniforms.u_aspect
      },
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: ZeroFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    this.mesh = new Mesh(t, this.material);
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const {
      whiteTunnelWaitRatio: t
    } = goalTunnels;
    this.activeRatio = math.fit(t, 0, 0.2, 0, 1);
    this.container.visible = this.activeRatio > 0;
    this.material.uniforms.u_activeRatio.value = this.activeRatio;
    this.material.uniforms.u_bgColor.value.copy(properties.bgColor);
  }
}
const goalWhiteTunnelParticles = new GoalWhiteTunnelParticles();
const vert$c = `#define GLSLIFY 1
attribute float instanceId;attribute vec4 instanceUvInfo;attribute vec4 instanceRands;uniform float u_time;uniform float u_activeRatio;uniform float u_aspect;uniform vec2 u_textureSize;varying float v_fadeOut;varying vec2 v_uv;vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 pos=position;pos.xy*=instanceUvInfo.zw*u_textureSize*0.01;float t=u_time*mix(0.05,0.1,instanceRands.x)+instanceRands.y;float cycle=floor(t);float ratio=fract(t);vec4 cycleRands=hash42(vec2(cycle,instanceId));pos.xy=rotate(pos.xy,instanceRands.z*6.28+sign(cycleRands.z-.5)*u_time*mix(.5,1.,cycleRands.y))*linearStep(instanceRands.w*0.5,instanceRands.w*0.5+0.5,u_activeRatio)*0.35;float yLimit=7.0/u_aspect;vec3 instancePos=vec3(mix(-5.,5.,cycleRands.x),yLimit*mix(-1.0,1.0,ratio),20.+instanceId/float(COUNT));pos+=instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=instanceUvInfo.xy+instanceUvInfo.zw*vec2(uv.x,1.-uv.y);v_uv.y=1.0-v_uv.y;v_fadeOut=2.0*abs(ratio-0.5);}`;
const frag$g = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_bgColor;varying vec2 v_uv;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){gl_FragColor=texture2D(u_texture,v_uv);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`;
const goalWhiteTunnelStickerData = [{
  x: 1132,
  y: 3,
  w: 195,
  h: 195
}, {
  x: 744,
  y: 3,
  w: 195,
  h: 256
}, {
  x: 525,
  y: 3,
  w: 213,
  h: 282
}, {
  x: 242,
  y: 3,
  w: 277,
  h: 286
}, {
  x: 1055,
  y: 633,
  w: 209,
  h: 209
}, {
  x: 1076,
  y: 398,
  w: 209,
  h: 209
}, {
  x: 3,
  y: 772,
  w: 298,
  h: 249
}, {
  x: 945,
  y: 3,
  w: 181,
  h: 249
}, {
  x: 1291,
  y: 389,
  w: 160,
  h: 197
}, {
  x: 1055,
  y: 848,
  w: 83,
  h: 122
}, {
  x: 1132,
  y: 204,
  w: 167,
  h: 179
}, {
  x: 1270,
  y: 828,
  w: 192,
  h: 193
}, {
  x: 780,
  y: 265,
  w: 182,
  h: 167
}, {
  x: 564,
  y: 445,
  w: 294,
  h: 184
}, {
  x: 307,
  y: 683,
  w: 205,
  h: 334
}, {
  x: 864,
  y: 438,
  w: 206,
  h: 189
}, {
  x: 968,
  y: 258,
  w: 149,
  h: 134
}, {
  x: 734,
  y: 635,
  w: 165,
  h: 382
}, {
  x: 605,
  y: 291,
  w: 169,
  h: 141
}, {
  x: 302,
  y: 445,
  w: 256,
  h: 232
}, {
  x: 518,
  y: 683,
  w: 210,
  h: 266
}, {
  x: 242,
  y: 295,
  w: 357,
  h: 144
}, {
  x: 3,
  y: 3,
  w: 233,
  h: 469
}, {
  x: 905,
  y: 633,
  w: 144,
  h: 340
}, {
  x: 1270,
  y: 613,
  w: 187,
  h: 209
}, {
  x: 3,
  y: 478,
  w: 293,
  h: 288
}];
new Vector3();
class GoalWhiteTunnelStickers {
  COUNT = 26;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  textureSize = new Vector2(1465, 1024);
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_textureSize: {
      value: this.textureSize
    },
    u_activeRatio: {
      value: 0
    }
  };
  preInit() {
    this.sharedUniforms.u_texture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/" + (browser$1.isMobile ? "stickers_low.png" : "stickers.png"), {
      type: "texture"
    }).content;
  }
  init() {
    let e = new PlaneGeometry(1, 1);
    let t = new InstancedBufferGeometry();
    for (let l in e.attributes) {
      t.attributes[l] = e.attributes[l];
    }
    t.index = e.index;
    let r = new Float32Array(this.COUNT);
    let n = new Float32Array(this.COUNT * 4);
    let a = new Float32Array(this.COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < this.COUNT; l++, c += 3, u += 4) {
      r[l] = l / this.COUNT;
      let f = goalWhiteTunnelStickerData[l % goalWhiteTunnelStickerData.length];
      n[u + 0] = f.x / this.textureSize.x;
      n[u + 1] = f.y / this.textureSize.y;
      n[u + 2] = f.w / this.textureSize.x;
      n[u + 3] = f.h / this.textureSize.y;
      a[u] = Math.random();
      a[u + 1] = Math.random();
      a[u + 2] = Math.random();
      a[u + 3] = Math.random();
    }
    t.setAttribute("instanceId", new InstancedBufferAttribute(r, 1));
    t.setAttribute("instanceUvInfo", new InstancedBufferAttribute(n, 4));
    t.setAttribute("instanceRands", new InstancedBufferAttribute(a, 4));
    this.material = new ShaderMaterial({
      vertexShader: vert$c,
      fragmentShader: frag$g,
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_activeRatio: this.sharedUniforms.u_activeRatio,
        u_texture: this.sharedUniforms.u_texture,
        u_textureSize: this.sharedUniforms.u_textureSize,
        u_bgColor: {
          value: new Color()
        },
        u_aspect: properties.sharedUniforms.u_aspect
      },
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: SrcAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: ZeroFactor,
      blendDstAlpha: ZeroFactor
    });
    this.material.defines.COUNT = this.COUNT;
    this.mesh = new Mesh(t, this.material);
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const {
      whiteTunnelWaitRatio: t
    } = goalTunnels;
    this.activeRatio = math.fit(t, 0, 0.2, 0, 1);
    this.container.visible = this.activeRatio > 0;
    this.material.uniforms.u_activeRatio.value = this.activeRatio;
    this.material.uniforms.u_bgColor.value.copy(properties.bgColor);
  }
}
const goalWhiteTunnelStickers = new GoalWhiteTunnelStickers();
class GoalTunnels extends Stage3D {
  THRESHOLD = [0, 0.3, 0.8, 1];
  blackTitleRatio = 0;
  blackTunnelRatio = 0;
  whiteTunnelRatio = 0;
  frameHeight = 1;
  EndCameraDepthToFrame = 2;
  isBlackTitleActive = false;
  isBlackTunnelActive = false;
  isWhiteTunnelActive = false;
  expectedFov = 45;
  freezeRatio = 0;
  tunnelDeltaTime = 1;
  tunnelTime = 1;
  sharedUniforms = {
    u_whiteTunnelRatio: {
      value: 0
    },
    u_tunnelTime: {
      value: 0
    }
  };
  constructor() {
    super({
      ratio: 0,
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 25),
        defaultLookAtPosition: new Vector3(0, 0, 24),
        cameraLookStrength: 0.2,
        cameraLookEaseDamp: 0.1,
        bloomAmount: 0,
        cameraFov: 30,
        haloRGBShift: 0.015,
        clearAlpha: 0
      }
    });
  }
  preInit() {
    goalTunnelEfx.init();
    properties.postprocessing.queue.push(goalTunnelEfx);
    goalTunnelAstronauts.preInit();
    goalBlackTunnel.preInit();
    goalWhiteTunnel.preInit();
    goalTunnelsBackground.preInit();
    goalWhiteTunnelParticles.preInit();
    goalWhiteTunnelStickers.preInit();
    this.add(goalTunnelsBackground.container);
    this.add(goalBlackTunnel.container);
    this.add(goalWhiteTunnel.container);
    this.add(goalWhiteTunnelParticles.container);
    this.add(goalWhiteTunnelStickers.container);
    goalTunnelGlass.preInit();
    homePage.preUfxContainer.add(goalTunnelGlass.container);
  }
  init() {
    goalTunnelAstronauts.init();
    goalBlackTunnel.init();
    goalWhiteTunnel.init();
    goalTunnelGlass.init();
    goalTunnelsBackground.init();
    goalWhiteTunnelParticles.init();
    goalWhiteTunnelStickers.init();
    this.resetAstronautLayer();
    taskManager.add(this);
  }
  resize(e, t) {
    goalTunnelAstronauts.resize(e, t);
    goalBlackTunnel.resize(e, t);
    goalWhiteTunnel.resize(e, t);
    goalTunnelsBackground.resize(e, t);
    goalWhiteTunnelParticles.resize(e, t);
    goalWhiteTunnelStickers.resize(e, t);
  }
  updateRatios() {
    this.blackFrameInRatio = math.saturate(homeGoalSectionRanges.getRange("blackFrameIn").ratio);
    this.blackTitleRatio = math.saturate(homeGoalSectionRanges.getRange("blackTitle").ratio);
    this.blackTunnelRatio = math.saturate(homeGoalSectionRanges.getRange("blackTunnel").ratio);
    this.whiteFrameRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel").ratio);
    this.whiteFrameOutRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameOut").ratio);
    this.whiteFrameBreakRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak").ratio);
    this.astronautDropRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop").ratio);
    this.whiteTunnelRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameOut").ratio);
    this.whiteTunnelAstronautRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameBreak").ratio);
    this.whiteTunnelAstronautOutRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautWait").ratio);
    this.whiteTunnelWaitRatio = math.saturate(homeGoalSectionRanges.getRange("astronautWait").ratio);
    let e = this.isBlackTunnelActive;
    let t = this.isWhiteTunnelActive;
    this.isBlackTitleActive = this.blackTitleRatio < 1;
    this.isBlackTunnelActive = this.blackTunnelRatio < 1 && !this.isBlackTitleActive;
    this.isWhiteTunnelActive = this.whiteTunnelRatio <= 1 && !this.isBlackTunnelActive && !this.isBlackTitleActive;
    goalBlackTunnel.container.visible = this.isBlackTunnelActive;
    goalWhiteTunnel.container.visible = this.isWhiteTunnelActive && this.astronautDropRatio < 1;
    if (goalTunnelGlass.container) {
      goalTunnelGlass.container.visible = goalTunnelGlass.container.visible && this.astronautDropRatio < 1;
      goalTunnelGlass.fragmentScale = math.fit(this.astronautDropRatio, 0.75, 1, 1, 0);
    }
    if (this.isWhiteTunnelActive && !t || this.isBlackTunnelActive && !e) {
      goalTunnelEfx.needsSync = true;
    }
    this.sharedUniforms.u_whiteTunnelRatio.value = this.whiteTunnelRatio;
    let r = math.mix(this.frameHeight, properties.viewportHeight, this.blackFrameInRatio < 1 ? this.blackFrameInRatio : 1 - this.whiteFrameRatio);
    let n = this.expectedFov / 180 * Math.PI;
    let a = this.defaultCameraPosition.distanceTo(this.defaultLookAtPosition);
    let l = Math.tan(n / 2) * a * 2 * properties.viewportHeight / r;
    this.properties.cameraFov = Math.atan(l / 2 / a) * 2 / Math.PI * 180;
    goalTunnelEfx.offsetPostion.set(0, 0, 0);
    goalTunnelEfx.offsetRotation.set(0, 0, 0);
    goalTunnelEfx.offsetScale.set(1, 1, 1);
    goalTunnelEfx.amount = 1;
  }
  syncProperties(e) {
    this.properties.haloStrength = this.blackFrameInRatio * (math.mix(0, 0.15, this.blackTitleRatio) + math.fit(this.blackTunnelRatio, 0.2, 0.4, 0, 0.25));
    this.properties.haloStrength = math.fit(this.blackTunnelRatio, 0.65, 0.75, this.properties.haloStrength, 0.08);
    this.properties.bloomSaturation = this.blackTunnelRatio < 1 ? math.fit(this.blackTunnelRatio, 0, 0.7, 1, 3) : 1;
    if (this.isWhiteTunnelActive) {
      this.properties.bloomAmount = this.astronautDropRatio < 1 ? math.fit(this.whiteFrameRatio, 0, 0.05, 4, 2) : math.fit(this.whiteTunnelWaitRatio, 0, 0.1, 0, 20);
      this.properties.haloStrength = 0;
      this.properties.clearAlpha = math.fit(this.whiteTunnelWaitRatio, 0, 0.1, 0.3, 0);
      this.properties.cameraNear = 1;
      this.properties.cameraFar = 200;
    } else {
      this.properties.bloomAmount = math.fit(this.blackTitleRatio, 0, 0.25, 30, 6);
      this.properties.cameraNear = 1;
      this.properties.cameraFar = 200;
    }
    this.properties.cameraLookStrength = math.smoothstep(0.5, 1, this.blackTitleRatio) * 0.08 + 0.02;
    this.properties.cameraLookStrength *= this.whiteTunnelRatio > 0 ? math.fit(this.whiteTunnelAstronautOutRatio, 0.75, 1, 0, 0.5) : 1;
    this.properties.cameraLookStrength = math.fit(this.whiteTunnelWaitRatio, 0, 0.1, this.properties.cameraLookStrength, 0.05);
    this.freezeRatio += ((input.isDown ? 1 : 0) - this.freezeRatio) * 0.1;
    this.tunnelDeltaTime = math.fit(this.freezeRatio, 0, 1, 1, 0.3) * e;
    this.tunnelDeltaTime = math.fit(this.blackFrameInRatio, 0, 1, e, this.tunnelDeltaTime);
    this.tunnelDeltaTime = math.fit(this.whiteTunnelAstronautOutRatio, 0.5, 0.75, this.tunnelDeltaTime, e);
    this.tunnelTime += this.tunnelDeltaTime;
    this.sharedUniforms.u_tunnelTime.value = this.tunnelTime;
    this.properties.autoScrollSpeed = (1 - this.freezeRatio) * input.lastScrollYDirection * 2.5 * math.fit(this.blackFrameInRatio, 0, 0.5, 0, 1) * math.fit(this.whiteTunnelWaitRatio, 0, 0.25, 1, 0);
  }
  resetAstronautLayer() {
    this.add(goalTunnelAstronauts.container);
  }
  update(e) {
    if (this.isBlackTitleActive) {
      properties.bgColor.setStyle("#000");
    }
    if (this.isBlackTunnelActive) {
      properties.bgColor.setStyle("#000");
      goalBlackTunnel.update(this.tunnelDeltaTime);
    }
    if (this.isWhiteTunnelActive) {
      properties.bgColor.setStyle(this.astronautDropRatio < 1 ? "#fff" : "#000");
      goalWhiteTunnel.update(this.tunnelDeltaTime);
      if (this.whiteTunnelRatio == 1 && this.astronautDropRatio < 1) {
        homePage.preUfxContainer.add(goalTunnelAstronauts.container);
      }
    }
    goalTunnelAstronauts.update(this.tunnelDeltaTime);
    goalTunnelGlass.update(e);
    goalTunnelsBackground.update(e);
    goalWhiteTunnelParticles.update(e);
    goalWhiteTunnelStickers.update(e);
  }
}
const goalTunnels = new GoalTunnels();
const frameBgVert = `#define GLSLIFY 1
attribute vec2 position;uniform vec2 u_viewportResolution;uniform vec2 u_frameOffset;uniform float u_frameScale;uniform float u_frameRotate;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_dom2Offset;uniform vec2 u_dom2WH;varying vec2 v_uv;varying vec2 v_uv2;mat2 getRotation2D(float a){float s=sin(a);float c=cos(a);return mat2(c,-s,s,c);}void main(){v_uv=position*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv-=u_frameOffset;v_uv=getRotation2D(u_frameRotate)*v_uv;v_uv/=u_frameScale;v_uv2=v_uv+(-u_dom2Offset);v_uv2=(v_uv2+u_dom2WH*0.5)/u_dom2WH;v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,0.0,1.0);}`;
const frameBgFrag = `#define GLSLIFY 1
uniform sampler2D u_dom2Texture;uniform vec3 u_bgColor;uniform vec2 u_domWH;uniform vec2 u_dom2WH;uniform float u_globalRadius;uniform float u_radiusScale;uniform vec3 u_glowColor;uniform float u_glowRadius;uniform float u_glowUpperBound;uniform float u_glowPow;uniform float u_glowTint;varying vec2 v_uv;varying vec2 v_uv2;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}float sdBox(in vec2 p,in vec2 b){vec2 w=abs(p)-b;vec2 s=vec2(p.x<0.0?-1:1,p.y<0.0?-1:1);float g=max(w.x,w.y);return(g>0.0)?length(max(w,0.0)):g;}void main(){vec3 map=texture2D(u_dom2Texture,v_uv2).rgb;float opacity=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius*u_radiusScale,1.);vec3 color=u_bgColor;float shadow=1.0;vec2 lightPos=vec2(2.,1.5);vec2 tabletSize=vec2(u_domWH.x/u_domWH.y,1.);float tabletRadiusOffset=0.05;vec2 pos=(v_uv*2.-1.)*tabletSize;vec2 toLight=normalize(lightPos-pos);float dist=sdBox(pos,tabletSize-tabletRadiusOffset)-u_glowRadius-tabletRadiusOffset;color=mix(u_glowColor,color,pow(linearStep(0.,u_glowUpperBound,dist),u_glowPow));color=mix(color,mix(map.ggg,map.ggg*u_glowColor,u_glowTint),1.-map.r);gl_FragColor=vec4(color,opacity);}`;
class HomeGoalSectionTunnelTitle {
  domContainer;
  domLines;
  domLineWords = [];
  totalLineHeight = 0;
  RATIO_FROM = 0.25;
  RATIO_TO = 1;
  init(e) {
    this.domContainer = e.querySelector("#home-goal-tunnel-title");
    this.domLines = e.querySelectorAll(".home-goal-tunnel-title-line");
    for (let t = 0; t < this.domLines.length; t++) {
      let r = this.domLines[t];
      let a = r.textContent.replace(/\s+/g, " ").split(" ");
      let l = "";
      for (let c = 0; c < a.length; c++) {
        l += "<span>" + a[c] + "</span>";
      }
      r.innerHTML = l;
      this.domLineWords[t] = r.querySelectorAll("span");
    }
  }
  resize(e, t) {
    this.domContainer.style.transform = "translateZ(0)";
    let r = this.domContainer.getBoundingClientRect();
    let n = r.width;
    let a = r.left;
    this._resetWords();
    for (let l = 0; l < this.domLineWords.length; l++) {
      let c = this.domLineWords[l];
      let u = n;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        g._domRect = g.getBoundingClientRect();
        g._centerX = g._domRect.left + g._domRect.width * 0.5;
        u -= g._domRect.width;
      }
      let f = 0;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        g._offsetX = -g._domRect.left + a + f;
        f += g._domRect.width + u / (c.length - 1);
      }
    }
    this.totalLineHeight = this.domLines[this.domLines.length - 1].getBoundingClientRect().bottom - this.domLines[0].getBoundingClientRect().top;
  }
  _resetWords() {
    this.domContainer.style.transform = "translateZ(0)";
    for (let e = 0; e < this.domLineWords.length; e++) {
      let t = this.domLineWords[e];
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        n.style.transform = "translateZ(0)";
      }
    }
  }
  update(e) {
    let t = homeGoalSectionRanges.getRange("blackTitle");
    let r = math.fit(t.ratio, this.RATIO_FROM, this.RATIO_TO, 0, 1);
    e = e && r % 1 > 0;
    this.domContainer.style.visibility = e ? "visible" : "hidden";
    if (e) {
      let n = math.fit(r, 0.5, 1, 1, 12, ease.cubicIn);
      let a = math.fit(r, 0.9, 1, 1, 0);
      let l = math.fit(r, 0.4, 0.6, 0, 1, ease.cubicInOut);
      n *= math.fit(r, 0, 0.15, 0.85, 1, ease.cubicOut);
      a *= math.fit(r, 0, 0.05, 0, 1);
      let c = homeGoalSectionRanges.offsetY - properties.viewportHeight * 0.5;
      this.domContainer.style.transform = "translate3d(0," + c + "px,0) scale(" + n + ")  translateY(" + -this.totalLineHeight * 0.5 + "px) translateY(0.25em)";
      this.domContainer.style.opacity = a;
      for (let u = 0; u < this.domLineWords.length; u++) {
        let f = this.domLineWords[u];
        for (let p = 0; p < f.length; p++) {
          let g = f[p];
          g.style.transform = "translateX(" + l * g._offsetX + "px)";
        }
      }
    }
  }
}
const homeGoalSectionTunnelTitle = new HomeGoalSectionTunnelTitle();
const TITLE_STAGGER$1 = 40;
const TITLE_DELAY = 0.4;
let _m$1 = new Matrix4();
let _q = new Quaternion();
let _e = new Euler();
let _c0 = new Color();
class GoalSection {
  domContainer;
  domContext;
  domContextInner;
  domImgIn;
  domImgInInner;
  domImgOut;
  domImgOutInner;
  frameBgMesh;
  _placeholderTexture1;
  _placeholderTexture2;
  offsetY = 0;
  radiusRatio = 0;
  uiBgColorNeedsOverride = false;
  isUIBgBlack = false;
  _needsReset = true;
  sectionPaddingTop = 0;
  line = null;
  preInit(e) {
    homeGoalSectionRanges.init(e);
    this.domContainer = e.querySelector("#home-goal");
    this.domContext = e.querySelector("#home-goal-context");
    this.domContextInner = e.querySelector("#home-goal-context-inner");
    this.domTitle = e.querySelector("#home-goal-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domDescs = e.querySelector("#home-goal-texts");
    this.domImgIn = e.querySelector("#home-goal-image-in");
    this.domImgInInner = e.querySelector("#home-goal-image-in-inner");
    this.domImgOut = e.querySelector("#home-goal-image-out");
    this.domImgOutInner = e.querySelector("#home-goal-image-out-inner");
    this.frameBgMesh = new UfxMesh({
      geometry: fboHelper.triGeom,
      material: fboHelper.createRawShaderMaterial({
        uniforms: {
          u_bgColor: {
            value: new Color()
          },
          u_frameOffset: {
            value: new Vector2()
          },
          u_frameScale: {
            value: 1
          },
          u_frameRotate: {
            value: 0
          },
          u_radiusScale: {
            value: 0
          },
          u_glowColor: {
            value: new Color(0, 0, 0)
          },
          u_glowRadius: {
            value: 0.11
          },
          u_glowUpperBound: {
            value: 0.5
          },
          u_glowPow: {
            value: 0.1
          },
          u_glowTint: {
            value: 0
          },
          u_dom2Offset: {
            value: new Vector2()
          },
          u_dom2WH: {
            value: new Vector2()
          },
          u_dom2Texture: {
            value: null
          },
          u_viewportResolution: properties.sharedUniforms.u_viewportResolution,
          u_time: properties.sharedUniforms.u_time,
          u_globalRadius: properties.sharedUniforms.u_globalRadius
        },
        vertexShader: frameBgVert,
        fragmentShader: frameBgFrag,
        depthTest: false,
        depthWrite: false,
        derivatives: true,
        transparent: true,
        blending: NormalBlending
      })
    });
    this.frameBgMesh.renderOrder = -1;
    homePage.preUfxContainer.add(this.frameBgMesh);
    this.frameBgMesh.visible = false;
    homeGoalSectionTunnelTitle.init(e);
    visuals.stage3DList.push(goalTunnels);
    goalTunnels.preInit();
    this.lineVisual = new Line(1);
    this.lineVisual.preInit();
  }
  init() {
    this._placeholderTexture1 = properties.loader.load(settings.TEXTURE_PATH + "/tunnels/tablet.png", {
      type: "texture",
      flipY: false,
      minFilter: LinearFilter
    }).content;
    this._placeholderTexture2 = properties.loader.load(settings.TEXTURE_PATH + "/tunnels/desktop.png", {
      type: "texture",
      flipY: false,
      minFilter: LinearFilter
    }).content;
    goalTunnels.init();
    this.lineVisual.init();
    homePage.postUfxContainer.add(this.lineVisual.container);
  }
  show() {}
  hide() {}
  resize(e, t) {
    this._splitText();
    scrollManager.resize(e, t);
    homeGoalSectionRanges.resize(e, t);
    goalTunnelGlass.resize(e, t);
    homeGoalSectionTunnelTitle.resize(e, t);
    goalTunnels.resize(properties.width, properties.height);
    this.lineVisual.resize(e, t);
    this.sectionPaddingTop = parseFloat(getComputedStyle(this.domContainer).getPropertyValue("padding-top"));
  }
  update(e) {
    homeGoalSectionRanges.update(e);
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    let n = scrollManager.getDomRange(this.domImgIn);
    let a = scrollManager.getDomRange(this.domImgInInner);
    let l = scrollManager.getDomRange(this.domImgOut);
    let c = scrollManager.getDomRange(this.domImgOutInner);
    let u = 0;
    goalTunnels.isActive = homeGoalSectionRanges.isActive && properties.hasInitialized;
    goalTunnels.resetAstronautLayer();
    if (goalTunnelGlass.container) {
      goalTunnelGlass.container.visible = false;
    }
    this.uiBgColorNeedsOverride = goalTunnels.isActive;
    if (this.uiBgColorNeedsOverride) {
      this.isUIBgBlack = homeGoalSectionRanges.getRange("blackTitle", "blackTunnel").isActive || homeGoalSectionRanges.getRange("whiteFrameOut", "astronautWait").isActive;
    }
    let f = 0;
    let p = 1;
    let g;
    let v;
    let _ = homeGoalSectionRanges.getRange("blackFrameIn");
    if (properties.useMobileLayout) {
      this.domDescs.style.transform = "translateZ(0)";
    } else {
      this.domDescs.style.transform = "translate3d(0," + (n._top - this.sectionPaddingTop - t._top + n.height * 0.5) + "px,0) translateY(-50%)";
    }
    if (goalTunnels.isActive) {
      let b = this.frameBgMesh.material.uniforms;
      let C = math.saturate(homeGoalSectionRanges.ratio);
      let w;
      let R;
      let E = 0;
      let I = 1;
      let F = 0;
      let k = 0;
      let L = 0;
      let D = 0;
      let ne = b.u_glowColor.value;
      goalTunnels.ratio = C;
      let re = textureHelper.blackTexture;
      let ce = 0;
      let z = homeGoalSectionRanges.getRange("blackTunnel");
      let j = homeGoalSectionRanges.getRange("blackFrameShow");
      let X = homeGoalSectionRanges.getRange("whiteFrameOut");
      let Z = homeGoalSectionRanges.getRange("whiteFrameBreak");
      let q = homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop");
      let ue = homeGoalSectionRanges.getRange("astronautDrop");
      homeGoalSectionTunnelTitle.update(true);
      let oe = q.ratio;
      let te = ue.ratio;
      let le = 0;
      E = math.saturate(_.ratio);
      let Te = 0;
      if (z.ratio < 1) {
        w = n;
        R = a;
        u = Math.max(0, homeGoalSectionRanges.offsetY - _.pixelFrom);
        le = u;
        f = E * 0.4;
        Te = 0;
        F = math.fit(E, 0, 1, 0.11, -0.5);
        k = math.fit(E, 0, 1, 0.25, 2);
        L = math.fit(E, 0, 1, 0.06, 0.3);
        ne.setStyle(properties.blackColorHex).lerp(_c0.setStyle(properties.offWhiteColorHex), E);
        if (this._placeholderTexture1 && this._placeholderTexture1.image.width) {
          re = this._placeholderTexture1;
        }
      } else {
        w = l;
        R = c;
        let xe = -properties.viewportHeight * 0.5 - l.top + n.top - l.height * 0.5;
        u = homeGoalSectionRanges.offsetY + xe;
        if (te < 1) {
          u = math.clamp(u, 0, Z.pixelTo + xe);
        }
        Te = 0;
        E = math.fit(homeGoalSectionRanges.offsetY, X.pixelFrom, X.pixelTo, 1, 0);
        ce = Math.max(0, homeGoalSectionRanges.offsetY - ue.pixelFrom);
        f = E * -0.3;
        if (oe < 0) {
          D = 0.8;
          ne.setStyle(properties.blackColorHex);
        } else {
          F = -0.5;
          k = math.fit(oe, 0, 0.15, 0, 0.8);
          k = math.fit(oe, 0.15, 0.3, k, 2);
          L = math.fit(oe, 0, 0.1, 0.3, 1);
          L = math.fit(oe, 0.1, 1, L, 0.2);
          D = 0.5;
          let ee = math.fit(oe, 0, 0.1, 1, 0);
          ee = math.fit(oe, 0.1, 0.8, ee, 0.85);
          ne.setStyle(properties.blueColorHex).lerp(_c0.setStyle(properties.blackColorHex), ee);
        }
        if (this._placeholderTexture2 && this._placeholderTexture2.image.width) {
          re = this._placeholderTexture2;
        }
        goalTunnelGlass.domFrameHeight = l.height;
        goalTunnelGlass.domFrameRotation = f;
        if (goalTunnelGlass.container) {
          goalTunnelGlass.container.visible = true;
        }
        I = 0;
      }
      let K = properties.viewportHeight * 0.2 * (1 - math.saturate(j.ratio));
      let G = Math.sqrt(properties.viewportWidth * properties.viewportWidth + properties.viewportHeight * properties.viewportHeight);
      p = math.mix(1, G / Math.min(w.width, w.height), E);
      goalTunnelGlass.domFrameScale = p;
      if (te < 1) {
        g = properties.viewportWidth * 0.5 - w.left - w.width * 0.5;
      } else {
        g = 0;
      }
      v = -(w.top + K - scrollManager.scrollPixel + w.height * 0.5 - properties.viewportHeight * 0.5 + u);
      goalTunnels.frameHeight = w.height;
      goalTunnelAstronauts.extraCameraViewportOffsetX = -math.fit(q.ratio, 0, 1, 0, -w.left - w.width * 0.5 + properties.viewportWidth * 0.5, ease.cubicInOut);
      goalTunnelAstronauts.extraCameraViewportOffsetY = -ce;
      properties.cameraViewportOffsetX = g * (1 - E);
      properties.cameraViewportOffsetY = v * (1 - E);
      b.u_dom2Texture.value = re;
      b.u_frameOffset.value.set(g * E, v * E);
      b.u_frameScale.value = p;
      b.u_frameRotate.value = f;
      b.u_radiusScale.value = I;
      b.u_bgColor.value.setStyle(C < 0.5 ? properties.offWhiteColorHex : properties.blackColorHex);
      b.u_glowRadius.value = F;
      b.u_glowUpperBound.value = k;
      b.u_glowPow.value = L;
      b.u_glowTint.value = D;
      properties.screenPaintOffsetRatio = 1 - E;
      this.frameBgMesh.syncRect(w.left, w.top + K, w.width, w.height);
      this.frameBgMesh.update(-scrollManager.scrollPixel + u);
      this.frameBgMesh.visible = E < 1;
      this.frameBgMesh.visible = E < 1 && te < 1;
      goalTunnelGlass.ratio = math.fit(q.ratio, 0, 1, 0, 1, ease.sineOut);
      if (goalTunnelGlass.container) {
        goalTunnelGlass.container.visible = goalTunnelGlass.container.visible && goalTunnelGlass.ratio > 0;
      }
      b.u_dom2Offset.value.set(R.left + R.width * 0.5 - w.left - w.width * 0.5, R.top + R.height * 0.5 - w.top - w.height * 0.5 + Te);
      b.u_dom2WH.value.set(R.width, R.height);
      this.domContextInner.style.transform = `translate3d(0, ${le}px, 0)`;
      this.domContextInner.style.visibility = this.frameBgMesh.visible ? "visible" : "hidden";
      let U = scrollManager.getDomRange(this.domContext);
      let N = properties.viewportWidth * 0.5 - U.screenX - properties.cameraViewportOffsetX;
      let he = properties.viewportHeight * 0.5 - U.screenY - properties.cameraViewportOffsetY - le;
      this.domContextInner.style.transformOrigin = "0 0";
      this.domContextInner.style.transform = `translate3d(${N}px, ${he + le}px, 0) scale(${p}) rotate(${f}rad) translate3d(${-N + g * E}px, ${-he + v * E}px, 0) `;
      let ve = properties.viewportWidth * 0.5 - properties.cameraViewportOffsetX;
      let de = -properties.viewportHeight * 0.5 + properties.cameraViewportOffsetY;
      ve *= -1;
      de *= -1;
      if (z.ratio < 1) {
        let xe = this.lineVisual.container.matrix;
        xe.makeTranslation(ve, de, 0);
        _e.set(0, 0, -f);
        _q.setFromEuler(_e);
        _m$1.makeRotationFromQuaternion(_q);
        xe.premultiply(_m$1);
        _m$1.makeScale(p, p, p);
        xe.premultiply(_m$1);
        _m$1.makeTranslation(-ve, -de, 0);
        xe.premultiply(_m$1);
        xe.decompose(this.lineVisual.container.position, this.lineVisual.container.quaternion, this.lineVisual.container.scale);
        this.lineVisual.update(e, t, u);
      }
    } else {
      this.lineVisual.update(e, t);
      this.frameBgMesh.visible = false;
      this.domContextInner.style.visibility = r ? "visible" : "hidden";
      this.domContextInner.style.transform = "translateZ(0)";
      this.lineVisual.container.position.set(0, 0, 0);
      this.lineVisual.container.quaternion.set(0, 0, 0, 1);
      this.lineVisual.container.scale.set(1, 1, 1);
      homeGoalSectionTunnelTitle.update(false);
    }
    if (_.ratio >= 1) {
      this.lineVisual.container.visible = false;
    }
    goalTunnels.updateRatios();
    let T = scrollManager.getDomRange(this.domContext, -u);
    let M = T;
    let S = properties.useMobileLayout ? 0 : 800;
    if (t.screenRatio < -0.8 && t.screenRatio !== -1) {
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      if (T.screenRatio > -1) {
        this.domTitle._animating = true;
        let b = math.fit(t.showScreenOffset, 0, 1.5, S * -0.2, 0);
        this.domTitle.style.transform = `translate3d(0, ${b}px, 0)`;
        if (!properties.useMobileLayout) {
          this.domTitle._splitted.words.forEach((C, w) => {
            let R = math.fit(this.domTitle._time - TITLE_DELAY - w / TITLE_STAGGER$1, 0, 1, 200, 0, ease.lusion);
            let E = math.fit(this.domTitle._time - w / TITLE_STAGGER$1, 0, 1, 100, 0, ease.lusion);
            C.style.transform = `translate3d(${R}px, ${E}%, 0)`;
          });
        }
      }
      M.screenRatio > -1;
      if (this._needsReset) {
        this._reset();
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    if (this.domTitle._splitted && this.domTitle._splitted.revert) {
      this.domTitle._splitted.revert();
    }
    if (!properties.useMobileLayout) {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, lines",
        charClass: "goal-title-char"
      });
      this.domTitle._splitted.lines.forEach(e => {
        const t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.classList.add("goal-title-line-wrapper");
        t.append(e);
        this.domTitle.append(t);
      });
    }
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      if (properties.viewportWidth > settings.MOBILE_WIDTH) {
        this.domTitle._splitted.words.forEach(e => {
          e.style.transform = "translate3d(100%, 100%, 0)";
        });
      }
    }
  }
}
const homeGoalSection = new GoalSection();
const vertexShader = `#define GLSLIFY 1
attribute float branchRatio;attribute vec3 branchSplinePos;attribute vec3 leafAxis;attribute float leafRatio;attribute float meshId;uniform float u_time;uniform float u_delay;uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform float u_angleForce;varying vec3 v_position;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 toQuaternion(float angle,vec3 axis){float half_angle=angle/2.0;vec4 q;q.x=axis.x*sin(half_angle);q.y=axis.y*sin(half_angle);q.z=axis.z*sin(half_angle);q.w=cos(half_angle);return q;}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=position;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;float time=u_delay+0.2*u_time;float branchNoiseStrength=0.001;vec3 branchOffset=branchNoiseStrength*branchRatio*branchRatio*simplexNoiseDerivatives(vec4(pos,time)).xyz;branchOffset+=vec3(-1.0,0.0,0.0)*u_angleForce*branchRatio*branchRatio*0.1;if(meshId>0.0){vec3 toBranchSpline=pos-branchSplinePos;float angle=0.005*simplexNoiseDerivatives(vec4(branchRatio*0.5,u_time,meshId,1.0)).x;angle-=0.5*sign(leafAxis.z)*leafRatio*leafRatio*u_angleForce;vec4 q=toQuaternion(angle,leafAxis);toBranchSpline=qrotate(q,toBranchSpline);pos=branchSplinePos+branchOffset+toBranchSpline;}else{pos+=branchOffset;}vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_position=pos;}`;
const fragmentShader$3 = `#define GLSLIFY 1
uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform vec3 u_mask;varying vec3 v_position;void main(){gl_FragColor.rgb=u_mask*vec3((v_position.x-u_bbMin.x)/(u_bbMax.x-u_bbMin.x));gl_FragColor.a=1.0;}`;
const vert$b = `#define GLSLIFY 1
attribute float centroidY;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_shadowProjPosition;varying vec3 v_worldPosition;
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);vec4 worldPosition=modelMatrix*vec4(position,1.0);v_worldPosition=worldPosition.xyz;}`;
const frag$f = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_shadowTexture;uniform vec3 u_shadowProjPosition;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_bgColor;uniform float u_plantsShadow;uniform vec3 u_previewBgColor;uniform float u_previewBgThreshold;uniform bool u_isVertical;uniform float u_scrollXStrength;uniform float u_activeRatio;varying vec2 v_uv;varying vec3 v_worldPosition;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(22.,45.));vec2 imageUv=v_uv;float moveAxis=u_isVertical ? 1.-v_uv.y : v_uv.x;float waveOffset=cos(moveAxis*6.2831853)*2.*u_scrollXStrength*u_scrollXStrength;vec2 imageUvOffsetBit=vec2(0.0,0.0);if(u_isVertical){imageUv.x+=waveOffset;imageUvOffsetBit.y=u_scrollXStrength/8.;}else{imageUv.y+=waveOffset;imageUvOffsetBit.x=u_scrollXStrength/8.;}imageUv+=imageUvOffsetBit*noise.x;vec4 image=vec4(0.0,0.0,0.0,0.0);vec4 baseColor=vec4(u_bgColor,0.0);for(int i=0;i<8;i++){vec4 texel=texture2D(u_texture,imageUv);image+=mix(baseColor,texel,texel.a);imageUv+=imageUvOffsetBit;}image/=8.;vec3 worldPosition=v_worldPosition;worldPosition.z+=mix(0.0,-4.,image.a);vec3 projectorDirection=normalize(u_shadowProjPosition-worldPosition);float projectorDistance=length(u_shadowProjPosition-worldPosition);vec4 texCoords=u_shadowViewMatrixCamera*vec4(worldPosition,1.0);vec2 shadowUv=(texCoords.xy/texCoords.w)*0.9;shadowUv.y=1.0-shadowUv.y;vec4 shadowImage=texture2D(u_shadowTexture,shadowUv);float shadow=max(shadowImage.r,max(shadowImage.g,shadowImage.b));shadow=mix(0.,mix(shadow,0.35+shadow*0.65,image.w),u_activeRatio);vec3 color=image.rgb;color=mix(color,u_previewBgColor,smoothstep(u_previewBgThreshold,u_previewBgThreshold+fwidth(moveAxis),moveAxis));color*=mix(1.0,u_plantsShadow,shadow);gl_FragColor=vec4(color,1.);}`;
const _v3 = new Vector3();
let _c1$2 = new Color();
new Color();
class ProjectDetailsScreen {
  screenRT;
  screenCamera;
  screenScene = new Scene();
  screenMesh;
  shadowContainer = new Object3D();
  shadowCamera;
  shadowRt;
  shadowBlurRt1;
  shadowBlurRt2;
  shadowBlurRt3;
  shadowFinalRt;
  plantGeo;
  plantMaterial;
  plantMesh0;
  plantMesh1;
  plantMesh2;
  velocity = new Vector2();
  mouse = new Vector2();
  angleForce = 0;
  angleForceEased = 0;
  shadow = 1;
  previewBgThreshold = 1;
  previewColorRatio = 0;
  previewBgColorDefaultColorHex = "#F3F4F9";
  previewBgColorHex = "#000";
  sharedUniforms = {
    u_shadowTexture: {
      value: null
    },
    u_shadowViewMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowProjectionMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowModelMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowProjPosition: {
      value: new Vector3()
    }
  };
  preInit(e) {
    this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 200);
    this.screenCamera.position.set(0, 0, 100);
    this.screenRT = fboHelper.createRenderTarget(1, 1);
    this.screenMesh = new UfxMesh({
      refDom: e,
      uniforms: Object.assign({
        u_texture: {
          value: this.screenRT.texture
        },
        u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
        u_previewBgColor: {
          value: new Color("#f00")
        },
        u_previewBgThreshold: {
          value: 1
        },
        u_plantsShadow: {
          value: 1
        },
        u_scrollXStrength: {
          value: 0
        },
        u_activeRatio: {
          value: 0
        },
        u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical
      }, this.sharedUniforms, blueNoise.sharedUniforms),
      vertexShader: vert$b,
      fragmentShader: frag$f,
      depthWrite: true,
      depthTest: true,
      transparent: false
    });
    projectPage.preUfxContainer.add(this.screenMesh);
    properties.loader.add(settings.MODEL_PATH + "plant.buf", {
      onLoad: t => this.plantGeo = t
    });
    this.shadowRT = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT1 = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT2 = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT3 = fboHelper.createRenderTarget(1, 1);
    this.shadowFinalRt = fboHelper.createRenderTarget(1, 1);
    this.shadowCamera = new OrthographicCamera(-1, 1, 1, -1, 0.001, 50);
    this.sharedUniforms.u_shadowTexture.value = this.shadowFinalRt.texture;
  }
  init() {
    this.shadowCamera.position.set(0, 0, 10);
    this.shadowCamera.lookAt(0.2, 0, 0);
    this.shadowCamera.zoom = 2500;
    this.shadowCamera.updateProjectionMatrix();
    this.shadowCamera.updateMatrixWorld();
    this.shadowCamera.updateWorldMatrix();
    this.plantGeo.computeBoundingBox();
    const e = new ShaderMaterial({
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_bbMin: {
          value: this.plantGeo.boundingBox.min
        },
        u_bbMax: {
          value: this.plantGeo.boundingBox.max
        },
        u_delay: {
          value: 0
        },
        u_angleForce: {
          value: 0
        },
        u_mask: {
          value: new Vector3()
        }
      },
      vertexShader,
      fragmentShader: fragmentShader$3,
      side: 2
    });
    e.uniforms.u_mask.value.set(1, 0, 0);
    this.plantMesh0 = new Mesh(this.plantGeo, e);
    this.plantMesh0.position.set(-0.55, -0.8, -5);
    this.plantMesh0.rotation.set(0, -0.2, -0.2);
    const t = e.clone();
    t.uniforms.u_time = properties.sharedUniforms.u_time;
    t.uniforms.u_mask.value.set(0, 1, 0);
    this.plantMesh1 = new Mesh(this.plantGeo, t);
    this.plantMesh1.position.set(-0.75, -0.8, 0);
    this.plantMesh1.rotation.set(0, 0.2, -0.5);
    const r = e.clone();
    r.uniforms.u_time = properties.sharedUniforms.u_time;
    r.uniforms.u_mask.value.set(0, 0, 1);
    this.plantMesh2 = new Mesh(this.plantGeo, r);
    this.plantMesh2.position.set(-0.45, -0.8, 5);
    this.plantMesh2.rotation.set(0.3, 0.3, 0.1);
    this.shadowContainer.add(this.plantMesh0);
    this.shadowContainer.add(this.plantMesh1);
    this.shadowContainer.add(this.plantMesh2);
    this.plantMesh0.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh0);
    this.plantMesh1.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh1);
    this.plantMesh2.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh2);
  }
  _onPlantMeshRender(e) {
    let t = e.material.uniforms.u_mask.value;
    properties.gl.colorMask(t.x == 1, t.y == 1, t.z == 1, true);
  }
  resize() {
    let e = properties.width;
    let t = properties.height;
    this.screenMesh.syncDom(0);
    this.screenRT.setSize(e, t);
    let r = properties.viewportWidth;
    let n = properties.viewportHeight;
    this.screenCamera.left = -r * 0.5;
    this.screenCamera.right = r * 0.5;
    this.screenCamera.top = n * 0.5;
    this.screenCamera.bottom = -n * 0.5;
    const a = 0.75;
    let l = Math.ceil(a * e);
    let c = Math.ceil(a * t);
    this.shadowRT.setSize(l, c);
    this.shadowFinalRt.setSize(l, c);
    this.shadowCamera.left = -r * 0.5;
    this.shadowCamera.right = r * 0.5;
    this.shadowCamera.top = n * 0.5;
    this.shadowCamera.bottom = -n * 0.5;
    this.shadowCamera.updateProjectionMatrix();
  }
  update(e) {
    if (!this.plantMesh0) {
      return;
    }
    let t = projectDetailsSection.scrollPane;
    _v3.set(-0.1, 0.1, 10);
    _v3.x += input.mouseXY.x * 0.03;
    _v3.y += input.mouseXY.y * 0.015;
    this.shadowCamera.position.lerp(_v3, e * 4);
    this.shadowCamera.lookAt(-0.1, 0, 0);
    this.shadowCamera.updateProjectionMatrix();
    this.shadowCamera.updateMatrixWorld();
    this.shadowCamera.updateWorldMatrix();
    this.angleForce += Math.abs(t.scrollViewDelta);
    this.angleForceEased = math.mix(this.angleForceEased, this.angleForce, 0.02);
    const r = math.clamp(this.angleForce - this.angleForceEased, -1, 1);
    this.sharedUniforms.u_shadowViewMatrixCamera.value.copy(this.shadowCamera.matrixWorldInverse);
    this.sharedUniforms.u_shadowProjectionMatrixCamera.value.copy(this.shadowCamera.projectionMatrix);
    this.sharedUniforms.u_shadowModelMatrixCamera.value.copy(this.shadowCamera.matrixWorld);
    this.sharedUniforms.u_shadowProjPosition.value.copy(this.shadowCamera.position);
    fboHelper.copy(textureHelper.transparentTexture, this.shadowFinalRt);
    const n = fboHelper.getColorState();
    let a = fboHelper.renderer.getRenderTarget();
    let l = fboHelper.renderer;
    l.setRenderTarget(this.shadowRT);
    l.setClearColor(0, 0);
    this.plantMesh0.material.uniforms.u_delay.value = 0;
    this.plantMesh1.material.uniforms.u_delay.value = 0.2;
    this.plantMesh2.material.uniforms.u_delay.value = 0.5;
    this.plantMesh0.material.uniforms.u_angleForce.value = r;
    this.plantMesh1.material.uniforms.u_angleForce.value = r;
    this.plantMesh2.material.uniforms.u_angleForce.value = r;
    fboHelper.renderMesh(this.shadowContainer, this.shadowRT, this.shadowCamera);
    properties.gl.colorMask(true, true, true, true);
    blur.blur(2, 1, this.shadowRT, this.shadowBlurRT1);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, 0, -1, -1, -1);
    blur.blur(4, 0.5, this.shadowRT, this.shadowBlurRT2);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, -1, 1, -1, -1);
    blur.blur(4, 0.75, this.shadowRT, this.shadowBlurRT3);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, -1, -1, 2, -1);
    l.setRenderTarget(null);
    this.screenCamera.position.x = properties.viewportWidth * 0.5;
    this.screenCamera.position.y = -properties.viewportHeight * 0.5;
    this.screenCamera.updateProjectionMatrix();
    this.screenMesh.material.uniforms.u_plantsShadow.value = this.shadow;
    this.screenMesh.material.uniforms.u_previewBgThreshold.value = this.previewBgThreshold;
    this.screenMesh.material.uniforms.u_scrollXStrength.value = Math.min(0.15, t.isActive ? t.scrollViewDelta : 0);
    this.screenMesh.material.uniforms.u_previewBgColor.value.setStyle(this.previewBgColorDefaultColorHex).lerp(_c1$2.setStyle(this.previewBgColorHex), this.previewColorRatio);
    this.screenMesh.material.uniforms.u_activeRatio.value = projectPage.activeRatio;
    this.screenMesh.update();
    l.setClearColor(0, 0);
    l.clear(this.screenRT);
    l.setRenderTarget(this.screenRT);
    l.render(this.screenScene, this.screenCamera);
    l.setRenderTarget(a);
    fboHelper.setColorState(n);
  }
}
const projectDetailsScreen = new ProjectDetailsScreen();
class Route {
  constructor(e) {
    this.path = e;
    this.pathNodes = e ? e.split("/") : [];
    this.target = null;
    this.title = "";
    this.dom = null;
    this.scrollNavPath = "";
    this.scrollNavText = "";
    this.hasContentPreloaded = false;
    this.content = {};
  }
  setTitleDom(e, t, r, n) {
    this.title = e;
    this.dom = t;
    this.scrollNavPath = r;
    this.scrollNavText = n;
  }
  setTarget(e) {
    let t = null;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (n.regExp.test(this.path)) {
        t = n;
        break;
      }
    }
    if (!t) {
      console.error("route not found for path: " + this.path);
      window.location.href = window.location.origin;
    }
    this.target = t.target;
  }
}
let loc = window.location;
let ORIGIN = window.location.origin;
let URL_PREFIX_REGEX = new RegExp("^" + ORIGIN.replace(/\//g, "\\/"));
class RouteManager {
  routes = {};
  matchList = [];
  currPath = null;
  _pendingPath = null;
  queryStr;
  onRouteChanged = new MinSignal$2();
  get currRoute() {
    return this.routes[this.currPath];
  }
  init() {
    this.queryStr = loc.href.split("?")[1] || "";
    window.addEventListener("popstate", this._onStatePop.bind(this));
    this.setUrl();
  }
  addPath(e, t) {
    this.matchList.push({
      regExp: e instanceof RegExp ? e : new RegExp("^" + e + "$"),
      target: t
    });
  }
  _createRoute(e) {
    let t = this.routes[e] = new Route(e);
    t.setTarget(this.matchList);
    return t;
  }
  _fetchHtml(e) {
    let t = this.routes[e];
    if (t) {
      if (t.dom) {
        this._onDomReady(t);
      }
    } else {
      properties.loader.load("/" + e, {
        type: "text",
        onLoad: this._initDom.bind(this, this._createRoute(e))
      });
    }
  }
  _initDom(e, t) {
    let r = document;
    let n = r.title;
    if (t) {
      r = r.implementation.createHTMLDocument();
      let headMatch = /<head[^>]*>((.|[\n\r])*)<\/head>/im.exec(t);
      if (headMatch) {
        r.head.innerHTML = headMatch[1];
        let links = r.head.querySelectorAll("link[rel=\"stylesheet\"]");
        links.forEach(link => {
          let href = link.getAttribute("href");
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            let newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.href = href;
            document.head.appendChild(newLink);
          }
        });
        let styles = r.head.querySelectorAll("style");
        styles.forEach(style => {
          let css = style.textContent;
          if (css && !Array.from(document.querySelectorAll("style")).some(s => s.textContent === css)) {
            let newStyle = document.createElement("style");
            newStyle.textContent = css;
            document.head.appendChild(newStyle);
          }
        });
      }
      let bodyMatch = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(t);
      if (bodyMatch) {
        r.body.innerHTML = bodyMatch[1];
      }
      let u = /<title[^>]*>((.|[\n\r])*)<\/title>/im.exec(t);
      n = u ? u[1] : "";
    }
    let a = r.getElementById("scroll-nav-section");
    let l;
    let c;
    if (a) {
      l = a.dataset.path;
      c = r.getElementById("scroll-nav-text").innerHTML;
    }
    e.setTitleDom(n, r.querySelector(".page"), l, c);
    if (a) {
      a.removeAttribute("data-path");
    }
    this._attachEvents(t ? e.dom : r.documentElement);
    this._onDomReady(e);
  }
  _attachEvents(e) {
    let t = e.querySelectorAll("a");
    for (let r = 0, n = t.length; r < n; r++) {
      let a = t[r];
      if (!a.__hasClickParsed) {
        a.__hasClickParsed = true;
        let l = a.href.indexOf(window.location.origin) === 0 || a.href.indexOf("/") === 0;
        if (a.dataset.linkType) {
          l = a.dataset.linkType === "internal";
        }
        if (l) {
          a.addEventListener("mouseenter", c => {
            this.preFetch(this.parseUrl(a.href));
          });
          a.addEventListener("click", this._onInternalLinkClick.bind(this, a));
        } else {
          a.addEventListener("click", this._onRegularLinkClick.bind(this, a));
        }
      }
    }
  }
  _onRegularLinkClick(e, t) {
    let r = e.href;
    if (r.indexOf("https://player.vimeo.com/video/") === 0) {
      t.preventDefault();
      let n = r.split("/").pop();
      videoOverlay.initAndPlayVideo(n, true);
    }
  }
  _onInternalLinkClick(e, t) {
    t.preventDefault();
    let r = true;
    if (e._onPreClick) {
      r = e._onPreClick() !== false;
    }
    if (r) {
      this.setUrl(e.href);
    }
  }
  _onDomReady(e) {
    if (this._pendingPath == e.path) {
      this._pendingPath = null;
      this.onRouteChanged.dispatch(e);
    }
  }
  parseUrl(e = loc.href) {
    let t = e.replace(URL_PREFIX_REGEX, "");
    let r = t.split("#");
    r[1];
    r = r[0].split("?");
    r[1];
    t = this.parsePath(r[0]);
    return t;
  }
  parsePath(e) {
    e = e.replace(/^\/|\/$/g, "");
    return e;
  }
  setUrl(e = loc.href) {
    let t = this.parseUrl(e);
    this.setPath(t);
  }
  setPath(e) {
    e = this.parsePath(e);
    if (e !== this.currPath) {
      history.pushState(null, null, (e || "/") + (this.queryStr ? "?" + this.queryStr : ""));
      this._onStatePop();
    }
  }
  preFetch(e) {
    e = this.parsePath(e);
    this._fetchHtml(e);
  }
  _onStatePop(e) {
    if (e) {
      e.preventDefault();
    }
    let t = this.parseUrl();
    if (t !== this.currPath) {
      this.currPath = t;
      this._pendingPath = t;
      if (properties.hasInitialized) {
        this._fetchHtml(t);
      } else {
        this._initDom(this._createRoute(t));
      }
    }
  }
}
const routeManager = new RouteManager();
let _c1$1 = new Color();
let _c2$1 = new Color();
class Header {
  sectionId = ["home", "about", "project", "who", "end"];
  isActive = false;
  ratio = 0;
  soundBtnTime = 0;
  soundBtnSize = 0;
  soundBtnHoverRatio = 0;
  soundBtnHoverAngle = 0;
  isSoundBtnHover = false;
  forceWhite = false;
  menu = {
    opened: false,
    ratio: 0
  };
  headerColor = "transparent";
  headerTextColor = "#000";
  preInit() {
    this.domContainer = document.getElementById("header");
    this.domHeaderContainer = document.getElementById("header-menu");
    this.domLogoSvg = document.querySelector("#header-logo svg");
    this.domBackground = document.getElementById("header-background");
    this.domRight = document.getElementById("header-right");
    this.domRightSoundBtn = document.getElementById("header-right-sound-btn");
    this.domRightSoundBtnCanvas = this.domRightSoundBtn.querySelector("canvas");
    this.domRightSoundBtnCtx = this.domRightSoundBtnCanvas.getContext("2d");
    this.domRightTalkBtn = document.getElementById("header-right-talk-btn");
    this.domRightTalkBtnContainer = document.getElementById("header-right-talk-container");
    this.domRightTalkPlaceholder = document.getElementById("header-right-talk-btn-placeholder");
    this.domRightMenuBtn = document.getElementById("header-right-menu-btn");
    this.domMenuLinks = Array.from(document.querySelectorAll("#header-menu-links .header-menu-link"));
    this.domMenuLinkContact = document.querySelector(".header-menu-link[data-scroll-to=\"contact\"]");
    this.domMenuTalk = document.getElementById("header-menu-talk");
    this.domMenuNewsletterForm = document.getElementById("header-menu-newsletter-form");
    this.domMenuNewsletterButton = document.getElementById("header-menu-newsletter-input-arrow");
    this.domMenuNewsletterMessage = document.getElementById("header-menu-newsletter-feedback-message");
    this.formManager = new NewletterForm(this.domMenuNewsletterForm, this.domMenuNewsletterButton, this.domMenuNewsletterMessage);
    this.containers = [document.getElementById("header-menu-links"), document.getElementById("header-menu-newsletter"), this.domMenuTalk, document.getElementById("header-menu-labs")];
    routeManager.onRouteChanged.add(this._onRouteChanged, this);
    pagesManager.onScrollTargetChanged.add(this._onPageScrollTargetChange, this);
    document.querySelector("#header-logo")._onPreClick = () => {
      if (routeManager.currRoute.target == homePage) {
        scrollManager.scrollToPixel(0);
        return false;
      }
    };
    pagesManager.onIdled.add(() => {
      this.headerColor = window.getComputedStyle(properties.domRoot, null).getPropertyValue("--header-color");
      this.headerTextColor = window.getComputedStyle(this.domRightMenuBtn).color;
      this.headerTextColorHover = window.getComputedStyle(properties.domRoot, null).getPropertyValue("--project-details-btn-text-hover");
    });
  }
  init() {
    if (!settings.USE_AUDIO) {
      this.domRightSoundBtn.style.visibility = "hidden";
    }
    input.onClicked.add(() => {
      if (!input.hasThroughElem(this.domRightMenuBtn, "click") && !input.hasThroughElem(this.domHeaderContainer, "click")) {
        this._enableMenu(false);
      }
    });
    this.domRightSoundBtn.addEventListener("mouseenter", e => {
      let t = this.domRightSoundBtn.getBoundingClientRect();
      let r = e.clientX - t.left - t.width / 2;
      let n = e.clientY - t.top - t.height / 2;
      this.soundBtnHoverAngle = Math.atan2(n, r) - Math.PI / 2;
      this.isSoundBtnHover = true;
    });
    this.domRightSoundBtn.addEventListener("mouseleave", () => {
      this.isSoundBtnHover = false;
    });
    this.domRightSoundBtn.addEventListener("click", this._onDomRightSoundBtn.bind(this));
    this.domRightMenuBtn.addEventListener("click", this._domRightMenuBtnClick.bind(this));
    this.domMenuLinkContact.addEventListener("click", this._onDomMenuLinkContact.bind(this));
    this.containers.forEach((e, t) => {
      e.style.setProperty("--open-delay", t / 50 + "s");
      e.style.setProperty("--close-delay", Math.abs(t - this.containers.length) / 50 + "s");
    });
  }
  show() {
    this.isActive = true;
  }
  hideTalkBtn() {}
  changeSection(e) {
    scrollManager.scrollTo(e);
  }
  _onDomRightSoundBtn() {
    audios.toggle();
  }
  _onRouteChanged() {
    this._enableMenu(false);
  }
  _domRightMenuBtnClick() {
    this._enableMenu(!this.menu.opened);
  }
  _onDomMenuLinkContact() {
    if (routeManager.currRoute.pathNodes[0] === "projects" && routeManager.currRoute.pathNodes[1]) {
      properties.isContactFromProjectPage = true;
      document.querySelector("[data-page='home']").click();
    } else {
      scrollManager.scrollTo("footer-section");
      this._enableMenu(false);
    }
  }
  _enableMenu(e) {
    this.menu.opened = e;
    this.domContainer.classList.toggle("--menu-opened", e);
    this.domHeaderContainer.classList.toggle("--opened", e);
    this.domBackground.classList.toggle("--opened", e);
    this.domRightMenuBtn.classList.toggle("--opened", e);
    if (e) {
      this.domBackground.style.opacity = properties.viewportWidth >= 1000 ? 0.2 : 1;
      this.domHeaderContainer.style.pointerEvents = "auto";
    } else {
      this.domBackground.style.opacity = 0;
      this.domHeaderContainer.style.pointerEvents = "none";
    }
  }
  _domRightMenuListMouseenter() {
    this.menu.hover = true;
  }
  _domRightMenuListMouseleave() {
    this.menu.hover = false;
  }
  _onWindowClick(e) {
    if (!e.target.closest("#header-menu") && !e.target.closest("#header-right-menu-btn")) {
      this._enableMenu(false);
    }
  }
  _onPageScrollTargetChange(e) {
    const t = this.domMenuLinks.filter(n => n.classList.contains("--active"))[0];
    const r = this.domMenuLinks.filter(n => n.dataset.page === e.id)[0];
    if (t) {
      t.classList.remove("--active");
    }
    if (r) {
      r.classList.add("--active");
    }
  }
  resize(e, t) {
    let r = this.domRightTalkBtn.getBoundingClientRect();
    let n = this.domRightTalkPlaceholder.getBoundingClientRect();
    let a = this.domRightSoundBtn.getBoundingClientRect();
    this.soundBtnSize = a.width;
    this.domRightSoundBtnCanvas.width = Math.round(this.soundBtnSize * (browser$1.devicePixelRatio > 1 ? 2 : 1));
    this.domRightSoundBtnCanvas.height = Math.round(this.soundBtnSize * (browser$1.devicePixelRatio > 1 ? 2 : 1));
    this.domRightTalkBtn._width = r.width;
    this.domRightTalkBtn._height = r.height;
    this.domRightTalkBtn._placeholderWidth = n.width;
    this.domRightTalkBtn._toWidth = r.height;
    this.domRightTalkBtn._deltaX = n.left - properties.viewportWidth * 0.5 + parseFloat(getComputedStyle(this.domRightTalkBtn).fontSize) * 3.2 * 0.5;
  }
  updateSoundWave(e) {
    let t = this.soundBtnHoverRatio = math.saturate(this.soundBtnHoverRatio + (this.isSoundBtnHover ? e : -e) / 0.3);
    this.soundBtnTime += e * 0.6 * (1 + t * 0.5);
    let r = this.soundBtnSize;
    let n = this.domRightSoundBtnCtx;
    let a = browser$1.devicePixelRatio > 1 ? 2 : 1;
    n.save();
    n.scale(a, a);
    n.clearRect(0, 0, r, r);
    n.translate(r / 2, r / 2);
    if (t < 1) {
      n.beginPath();
      n.arc(0, 0, r / 2, 0, Math.PI * 2);
      _c1$1.setStyle("#E4E6EF");
      _c2$1.setStyle("#fff");
      n.fillStyle = _c1$1.lerp(_c2$1, Math.max(this.menu.ratio, +this.forceWhite)).getStyle();
      n.fill();
      n.closePath();
    }
    if (t > 0) {
      n.save();
      if (t < 1) {
        n.globalCompositeOperation = "source-atop";
      }
      let f = ease.cubicInOut(t);
      n.rotate(this.soundBtnHoverAngle);
      n.translate(0, math.fit(t, 0, 1, r * 0.75, 0, ease.cubicInOut));
      n.scale(f, f);
      n.beginPath();
      n.arc(0, 0, r / 2, 0, Math.PI * 2);
      n.fillStyle = this.headerColor;
      n.fill();
      n.closePath();
      n.restore();
    }
    _c1$1.setStyle(this.headerTextColor);
    _c2$1.setStyle(this.headerTextColorHover);
    n.strokeStyle = _c1$1.lerp(_c2$1, t).getStyle();
    n.lineWidth = r * 0.05;
    n.lineCap = "round";
    n.beginPath();
    let l = 32;
    let c = r * 0.4;
    let u = r * 0.28 * audios.volume;
    for (let f = 0; f < l + 1; f++) {
      let p = -c / 2 + c * f / l;
      let g = Math.sin(this.soundBtnTime * 8 + f / l * 7) * u / 2 * math.fit(Math.abs(f / l - 0.5), 0.5, 0.25, 0.3, 1, ease.sineInOut);
      if (f == 0) {
        n.moveTo(p, g);
      } else {
        n.lineTo(p, g);
      }
    }
    n.stroke();
    n.closePath();
    n.restore();
  }
  update(e) {
    this.menu.ratio = math.saturate(this.menu.ratio + (this.menu.opened ? e : -e));
    this.ratio = math.clamp(this.ratio + (this.isActive ? e : -e), 0, 2);
    const t = math.fit(this.ratio, 0.9, 1.7, 0, 1);
    const r = math.fit(t, 0, 1, 4, 0, ease.lusion);
    this.domRightSoundBtn.style.transform = `translate3d(0, ${r}em, 0)`;
    this.domRightTalkBtn.style.display = "none";
    if (!properties.useMobileLayout) {
      this.updateSoundWave(e);
    }
    if (properties.useMobileLayout) {
      this.domRightTalkBtnContainer.style.opacity = 0;
      this.domRightTalkBtn.style.transform = "none";
    } else {
      let l = math.fit(this.ratio, 1, 1.8, 0, 1);
      let c = math.fit(l, 0, 1, 4, 0, ease.lusion);
      this.domRightTalkBtnContainer.style.opacity = 1;
      this.domRightTalkBtn.style.display = "block";
      this.domRightTalkBtn.style.pointerEvents = "auto";
      this.domRightTalkBtn.style.opacity = 1;
      this.domRightTalkBtn.style.transform = `translate3d(0, ${c}em, 0)`;
    }
    let n = math.fit(this.ratio, 1.1, 1.9, 0, 1);
    let a = math.fit(n, 0, 1, 4, 0, ease.lusion);
    this.domRightMenuBtn.style.transform = `translate3d(0, ${a}em, 0)`;
  }
  _hexToRgb(e) {
    const t = parseInt(e.substring(1, 3), 16) || 0;
    const r = parseInt(e.substring(3, 5), 16) || 0;
    const n = parseInt(e.substring(5, 7), 16) || 0;
    return [t, r, n];
  }
}
const header = new Header();
class ProjectDetailsData {
  id = "";
  title = "";
  desc = "";
  ctaTitle = "";
  ctaUrl = "";
  colorBg = "#000";
  colorBtnBg = "#000";
  colorBtnBgHover = "#000";
  colorBtnText = "#000";
  colorBtnTextHover = "#000";
  colorHighlight = "#000";
  colorIconBg = "#000";
  colorIconColor = "#000";
  colorText = "#000";
  shadow = 0;
  nextColorBg = "#000";
  nextColorText = "#000";
  nextId = "";
  nextTitle = "";
  nextShadow = 0;
  domServiceSideListItems;
  domLinkSideListItems;
  itemDataList = [];
  constructor(e, t) {
    this.id = e;
    this.title = t.querySelector("#project-details-title").innerHTML;
    this.desc = t.querySelector("#project-details-desc").innerHTML;
    this.ctaTitle = t.querySelector("#project-details-launch-cta-text").textContent;
    this.ctaUrl = t.querySelector("#project-details-launch-cta").href;
    let r = {
      ...t.querySelector("#project-details").dataset
    };
    this.colorBg = r.colorBg;
    this.colorBtnBg = r.colorBtnBg;
    this.colorBtnBgHover = r.colorBtnBgHover;
    this.colorBtnText = r.colorBtnText;
    this.colorBtnTextHover = r.colorBtnTextHover;
    this.colorHighlight = r.colorHighlight;
    this.colorIconBg = r.colorIconBg;
    this.colorIconColor = r.colorIconColor;
    this.colorText = r.colorText;
    this.shadow = parseFloat(r.shadow);
    (this.domServiceSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-services > *"))).forEach(l => {
      l.remove();
    });
    (this.domLinkSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-links > *"))).forEach(l => {
      l.remove();
    });
    let n = Array.from(t.querySelectorAll(".project-details-item"));
    for (let l = 0; l < n.length; l++) {
      let c = n[l];
      let u = {
        ...c.dataset
      };
      if (c.classList.contains("is-text")) {
        u.content = c.querySelector(".project-details-item-text").textContent;
      } else {
        u.width = parseFloat(u.width);
        u.height = parseFloat(u.height);
        u.parallax = parseFloat(u.parallax || 1);
        u.fullscreen = u.fullscreen !== undefined;
      }
      this.itemDataList.push(u);
      c.remove();
    }
    let a = {
      ...t.querySelector("#project-details-preview").dataset
    };
    this.nextColorBg = a.nextColorBg;
    this.nextColorText = a.nextColorText;
    this.nextId = a.nextId;
    this.nextShadow = parseFloat(a.nextShadow);
    this.nextTitle = t.querySelector("#project-details-preview-title").textContent;
  }
}
class UfxTextMesh extends UfxMesh {
  constructor(e = {}) {
    super(e);
    if (!this.refDom) {
      console.error("UfxTextMesh: refDom is not defined");
    }
    this.material.uniforms.u_texture = {
      value: textureHelper.transparentTexture
    };
    this.canvas = document.createElement("canvas");
  }
  syncText() {
    let e = domHelper.getLinesFromText(this.refDom);
    let t = this.refDom.getBoundingClientRect();
    let r = this.canvas;
    let n = r.getContext("2d");
    let a = getComputedStyle(this.refDom);
    let l = parseFloat(a.getPropertyValue("padding-left"));
    let c = Math.floor(parseFloat(a.getPropertyValue("font-size")));
    let u = a.getPropertyValue("font-style");
    let f = a.getPropertyValue("font-weight");
    let p = a.getPropertyValue("font-family");
    let g = Math.ceil(t.width);
    let v = Math.ceil(t.height);
    r.width = Math.ceil(g * properties.webglDPR);
    r.height = Math.ceil(v * properties.webglDPR);
    let _ = parseFloat(a.getPropertyValue("line-height"));
    n.save();
    n.scale(properties.webglDPR, properties.webglDPR);
    n.fillStyle = "#000";
    n.fillRect(0, 0, g, v);
    n.font = u + " " + f + " " + c + "px " + p;
    let T = 0;
    let M = [];
    for (let C = 0; C < e.length; C++) {
      let w = Math.ceil(n.measureText(e[C]).width + 1);
      M.push(w);
      T += w;
    }
    let S = 0;
    let b;
    b = _ * 0.15;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      let E = M[C];
      let I = n.createLinearGradient(w, 0, w + E, 0);
      I.addColorStop(0, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      S += E;
      I.addColorStop(1, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      n.fillStyle = I;
      n.fillRect(w, R, E, _);
    }
    n.globalCompositeOperation = "lighter";
    n.fillStyle = "#0f0";
    b = _ * 0.8;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      n.fillText(e[C], w, R);
    }
    n.restore();
    if (this.texture) {
      this.texture.dispose();
    }
    this.texture = new Texture(this.canvas);
    this.texture.minFilter = LinearFilter;
    this.texture.magFilter = LinearFilter;
    this.material.uniforms.u_texture.value = this.texture;
    this.texture.needsUpdate = true;
  }
}
const vert$a = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const frag$e = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform float u_opacity;uniform float u_parallax;uniform float u_time;uniform float u_dpr;uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec2 u_screenRTSize;uniform float u_activeRatio;uniform vec3 u_highlightColor;uniform vec3 u_bgColor;uniform vec2 u_mouseXY;uniform float u_borderRadius;uniform float u_parallaxRatio;uniform float u_isFullscreen;uniform int u_isVertical;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#ifdef IS_TEXT
uniform vec3 u_textColor;uniform float u_textRatio;
#else
uniform float u_readyRatio;float sdRoundedBox(in vec2 p,in vec2 b,in vec4 r){r.xy=(p.x>0.0)?r.xy : r.zw;r.x=(p.y>0.0)?r.x  : r.y;vec2 q=abs(p)-b+r.x;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;}float getRoundedCornerMask(vec2 uv,vec4 radius){float d=sdRoundedBox((uv-.5)*u_domWH,u_domWH*0.5*mix(0.6,1.,max(u_isFullscreen,u_activeRatio)),radius.yzwx);return smoothstep(0.,0.-fwidth(d),d);}
#endif
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(43.,12.));
#ifdef IS_TEXT
vec4 image=texture2D(u_texture,v_uv);vec3 color=u_textColor;float mask=smoothstep(u_textRatio,u_textRatio-.5/255.,image.r*255./256.);float imageAlpha=image.g;color=mix(u_bgColor,color,(0.2+mask*0.8));
#else
vec2 uv=v_uv;uv-=0.5;uv*=mix(0.6,1.,u_activeRatio);if(u_isVertical==1){uv.y*=u_parallaxRatio;uv.y+=u_parallax*(1.-u_parallaxRatio);}else{uv.x*=u_parallaxRatio;uv.x+=u_parallax*(1.-u_parallaxRatio);}uv+=0.5;vec3 color=texture2D(u_texture,uv).rgb;float imageAlpha=getRoundedCornerMask(v_uv,vec4(u_borderRadius));color=mix(u_highlightColor,color,u_readyRatio);
#endif
imageAlpha*=u_opacity;gl_FragColor=vec4(color,imageAlpha);}`;
let idx = 0;
class ProjectDetailsItem {
  constructor(e = "image") {
    this.idx = idx++;
    this.data = {};
    this.type = e;
    this.aspect = 1;
    this.imgVersion = 0;
    this.texture = null;
    this.isActive = false;
    this.textSpeed = 1;
    this.parallaxRatio = 1;
    this.activeTime = 0;
    this.domVideoButton = null;
    this.onClick = null;
    let t = this.domWrapper = document.createElement("div");
    t.classList.add("project-details-item");
    let r = this.uniforms = Object.assign({
      u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
      u_texture: {
        value: null
      },
      u_activeRatio: {
        value: 0
      },
      u_isFullscreen: {
        value: 0
      },
      u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical,
      u_opacity: projectDetailsSection.sharedUniforms.u_opacity,
      u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
      u_screenRTSize: projectDetailsSection.sharedUniforms.u_screenRTSize,
      u_highlightColor: projectDetailsSection.sharedUniforms.u_highlightColor,
      u_textureSize: {
        value: new Vector2(1, 1)
      },
      u_time: properties.sharedUniforms.u_time,
      u_dpr: properties.sharedUniforms.u_dpr,
      u_mouseXY: {
        value: input.mouseXY
      },
      u_parallax: {
        value: 0
      },
      u_parallaxRatio: {
        value: 1
      },
      u_borderRadius: {
        value: 0
      }
    }, blueNoise.sharedUniforms);
    t.classList.add("is-" + e);
    switch (e) {
      case "image":
      case "video":
        r.u_readyRatio = {
          value: 0
        };
        this.ufxMesh = new UfxMesh({
          refDom: t,
          uniforms: r,
          depthTest: false,
          depthWrite: false,
          vertexShader: vert$a,
          fragmentShader: frag$e,
          transparent: false
        });
        break;
      case "text":
        this.domText = document.createElement("div");
        this.domText.classList.add("project-details-item-text");
        this.domWrapper.appendChild(this.domText);
        r.u_textColor = projectDetailsSection.sharedUniforms.u_textColor;
        r.u_bgColor = projectDetailsSection.sharedUniforms.u_bgColor;
        r.u_textRatio = {
          value: 0
        };
        this.ufxMesh = new UfxTextMesh({
          refDom: this.domText,
          uniforms: r,
          depthTest: false,
          depthWrite: false,
          vertexShader: vert$a,
          fragmentShader: frag$e,
          transparent: false
        });
        this.ufxMesh.material.defines.IS_TEXT = true;
        break;
    }
    projectDetailsScreen.screenScene.add(this.ufxMesh);
  }
  activate(e) {
    this.data = e;
    this.parallaxRatio = this.uniforms.u_parallaxRatio.value = e.parallax || 1;
    this.isFullscreen = !!e.fullscreen;
    this.uniforms.u_isFullscreen.value = +this.isFullscreen;
    this.uniforms.u_activeRatio.value = 0;
    if (this.type == "image") {
      this._initImage();
    } else if (this.type == "video") {
      this._initVideo();
    } else if (this.type == "text") {
      this._initText();
    } else {
      console.error("unknown type");
    }
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
    this.playPauseVideo(false);
  }
  _initVideo() {
    let e = this.data;
    let t = browser$1.isMobile ? e.filename.replace("/video", "/mobile_video") : e.filename;
    if (t.indexOf("/") == 0) {
      t = settings.CDN_PATH + t;
    }
    let r = t + ".mp4";
    let n = this.texture;
    if (n && n.__url == r) {
      return;
    }
    this.imgVersion++;
    if (n && n.__loaded) {
      n.dispose();
    }
    this.aspect = e.width / e.height;
    this.uniforms.u_texture.value = textureHelper.blackTexture;
    this.uniforms.u_textureSize.value.set(e.width, e.height);
    let a;
    const l = document.createElement("video");
    if (settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH) {
      l.crossOrigin = "anonymous";
    }
    l.muted = true;
    l.playsinline = true;
    l.setAttribute("playsinline", "");
    l.src = r;
    l.loop = true;
    l.load();
    a = new VideoTexture(l);
    a.__version = this.version;
    a.__url = this.url;
    a.__loaded = true;
    this.texture = a;
    this.uniforms.u_texture.value = a;
  }
  _initImage() {
    let e = this.data;
    let t = browser$1.isMobile ? e.filename.replace("/image", "/mobile_image") : e.filename;
    if (t.indexOf("/") == 0) {
      t = settings.CDN_PATH + t;
    }
    let r = t + ".webp";
    let n = this.texture;
    if (n && n.__url == r) {
      return;
    }
    this.imgVersion++;
    if (n && n.__loaded) {
      n.dispose();
    }
    this.aspect = e.width / e.height;
    this.uniforms.u_texture.value = textureHelper.blackTexture;
    this.uniforms.u_textureSize.value.set(e.width, e.height);
    let a = new Texture(new Image());
    a.__version = this.version;
    a.__url = this.url;
    properties.loader.load(r, {
      type: "texture",
      content: a,
      minFilter: settings.USE_WEBGL2 ? LinearMipmapLinearFilter : LinearFilter,
      onLoad: l => {
        if (l.__version != this.imgVersion) {
          l.__loaded = true;
          this.texture = l;
          this.uniforms.u_texture.value = l;
        } else {
          l.dispose();
        }
      }
    });
  }
  _initText() {
    let e = this.data;
    this.domWrapper.style.fontSize = e.fontSize + "em";
    this.domText.innerHTML = e.content;
    this.uniforms.u_textRatio.value = 0;
    this.textSpeed = 50 / Math.max(30, e.content.length);
  }
  _onMouseEnter() {}
  _onMouseLeave() {}
  _onClick() {}
  resize(e, t, r) {
    let n;
    let a;
    if (r) {
      e += this.isFullscreen ? 2 : 0;
      n = e;
      a = e / this.aspect;
      if (this.type == "image" || this.type == "video") {
        a *= this.parallaxRatio;
      }
    } else {
      t += this.isFullscreen ? 2 : 0;
      n = t * this.aspect;
      a = t;
      if (this.type == "image" || this.type == "video") {
        n *= this.parallaxRatio;
      }
    }
    this.domWrapper.style.width = n + "px";
    if (this.type == "text" && r) {
      this.domWrapper.style.height = "auto";
    } else {
      this.domWrapper.style.height = a + "px";
    }
    if (this.type == "text") {
      this.ufxMesh.syncText();
    }
  }
  syncDom() {
    let e = properties.useMobileLayout;
    let t = e ? 0 : projectDetailsSection.scrollPane.scrollPixel;
    let r = e ? projectDetailsSection.scrollPane.scrollPixel : 0;
    this.ufxMesh.syncDom(-r, -t);
  }
  playPauseVideo(e) {
    if (this.type == "video") {
      let t = this.texture && this.texture.image && this.texture.image.pause ? this.texture.image : null;
      if (t) {
        if (!e && !t.paused) {
          t.pause();
        }
        if (e && t.paused) {
          t.play();
        }
      }
    }
  }
  update(e) {
    let t = properties.useMobileLayout;
    let r = t ? this.isFullscreen ? 1 : 0 : projectDetailsSection.scrollPane.scrollPixel;
    let n = t ? projectDetailsSection.scrollPane.scrollPixel : this.isFullscreen ? 1 : 0;
    let a = this.ufxMesh.testViewport(-n, -r);
    this.ufxMesh.update(-n, -r);
    if (a) {
      this.uniforms.u_borderRadius.value = this.isFullscreen && !properties.useMobileLayout ? 0 : properties.globalRadius;
      if (this.type == "image" || this.type == "video") {
        if (t) {
          let l = this.uniforms.u_domXY.value.y;
          this.uniforms.u_parallax.value = math.fit(l, -this.ufxMesh._domHeight, properties.viewportHeight, -0.5, 0.5);
        } else {
          let l = this.uniforms.u_domXY.value.x;
          this.uniforms.u_parallax.value = math.fit(l, -this.ufxMesh._domWidth, properties.viewportWidth, -0.5, 0.5);
        }
      }
      this.activeTime += e;
      this.uniforms.u_activeRatio.value = math.fit(this.activeTime, 0, 1, 0, 1, ease.expoOut);
      this.playPauseVideo(!!pagesManager.isIdle);
    } else {
      this.activeTime = 0;
      this.playPauseVideo(false);
    }
    if (this.type == "image" || this.type == "video") {
      let l = this.uniforms.u_texture.value;
      let c = l !== textureHelper.blackTexture && l.__loaded;
      this.uniforms.u_readyRatio.value = Math.min(1, this.uniforms.u_readyRatio.value + (c ? e : 0));
    }
    if (this.type == "text") {
      if (this.ufxMesh.testViewport(-n, -r)) {
        let l;
        if (t) {
          l = math.unClampedFit(this.uniforms.u_domXY.value.y, properties.viewportHeight, -this.uniforms.u_domWH.value.y, 0, 1);
        } else {
          l = math.unClampedFit(this.uniforms.u_domXY.value.x, properties.viewportWidth, -this.uniforms.u_domWH.value.x, 0, 1);
        }
        let c = l > 0.2 && l < 0.8;
        this.uniforms.u_textRatio.value = math.clamp(this.uniforms.u_textRatio.value + e * (c ? this.textSpeed : 0), 0, 1);
      } else {
        this.uniforms.u_textRatio.value = 0;
      }
    }
  }
}
class ProjectDetailsItems {
  moveContainer;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  useItem(e) {
    let t = e.type;
    let r;
    switch (t) {
      case "image":
        r = this.imageItemPool;
        break;
      case "video":
        r = this.videoItemPool;
        break;
      case "text":
        r = this.textItemPool;
        break;
    }
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      if (!l.isActive) {
        return l;
      }
    }
    let n = new ProjectDetailsItem(t);
    r.push(n);
    this.itemPool.push(n);
    return n;
  }
  deactivateAll() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      if (t.isActive) {
        t.deactivate();
        t.domWrapper.remove();
      }
    }
  }
  pauseAllVideos() {
    for (let e = 0; e < this.itemPool.length; e++) {
      this.itemPool[e].playPauseVideo(false);
    }
  }
  resizeAll(e, t, r) {
    let n = properties.useMobileLayout;
    for (let a = 0; a < this.itemPool.length; a++) {
      let l = this.itemPool[a];
      if (l.isActive) {
        let c = l.isFullscreen && !properties.useMobileLayout;
        l.resize(e, c ? properties.viewportHeight : t, n);
        l.domWrapper.style.top = (c ? -r : 0) + "px";
      }
    }
  }
  syncDoms() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      if (t.isActive) {
        t.syncDom();
      }
    }
  }
  update(e, t, r) {
    for (let n = 0; n < this.itemPool.length; n++) {
      let a = this.itemPool[n];
      if (a.isActive) {
        a.update(e);
      }
      if (a.isActive && a.ufxMesh.testViewport(-r, -t)) {
        a.ufxMesh.visible = true;
      } else {
        a.ufxMesh.visible = false;
      }
    }
  }
}
const projectDetailsItems = new ProjectDetailsItems();
let _c1 = new Color();
let _c2 = new Color();
class ProjectDetailsSection {
  projectDetailsDatas = {};
  projectDetailsData;
  domContainer;
  domHeaderInfo;
  domHeaderBackBtn;
  domTitle;
  domDesc;
  domCta;
  domSideListService;
  domSideListLinks;
  domDetailsItemsWrapper;
  domDetailsItemsMoveContainer;
  domPreview;
  domPreviewInner;
  domPreviewHeader;
  domPreviewTitle;
  domPreviewFooterBarInner;
  selectedId = "";
  contentShowRatio = 0;
  nextProjectRatio = 0;
  overScrollRatio = 0;
  overScrollSize = 0;
  previewInnerOffsetFrom = 0;
  previewInnerOffsetTo = 0;
  titleCenterOffsetY = 0;
  previewTitleColorDefaultColorHex = "#c2c3c7";
  previewTitleColorHex = "#000";
  previewShadow = 0;
  scrollPane;
  isVertical = null;
  VERTICAL_BREAK_PIONT = 1000;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  projectDatas = {};
  sharedUniforms = {
    u_opacity: {
      value: 0
    },
    u_isVertical: {
      value: 0
    },
    u_scrollX: {
      value: 0
    },
    u_highlightColor: {
      value: new Color()
    },
    u_bgColor: {
      value: new Color()
    },
    u_textColor: {
      value: new Color()
    }
  };
  domHeaderBackBtnHoverAnimation = {
    animating: false,
    ratio: 0
  };
  preInit(e) {
    this.domContainer = e.querySelector("#project-details");
    this.domContainer.style.backgroundColor = "";
    this.domHeaderInfo = e.querySelector("#project-details-header-info");
    this.domHeaderInfo._ratio = 0;
    this.domHeaderInfo._hide = false;
    this.domHeaderBackBtn = document.querySelector("#header-center-project-back-btn");
    this.domHeaderInfoSvg = document.querySelector("#project-details-header-info-svg");
    this.domMeta = e.querySelector("#project-details-meta");
    this.domTitle = e.querySelector("#project-details-title");
    this.domDesc = e.querySelector("#project-details-desc");
    this.domCta = e.querySelector("#project-details-launch-cta");
    this.domCtaText = e.querySelector("#project-details-launch-cta-text");
    this.domCtaMobile = e.querySelector("#project-details-launch-cta-mobile");
    this.domCtaMobileText = e.querySelector("#project-details-launch-cta-mobile-text");
    this.domSideListService = e.querySelector("#project-details-side-list-services");
    this.domSideListLinks = e.querySelector("#project-details-side-list-links");
    this.domDetailsItemsWrapper = e.querySelector("#project-details-items-wrapper");
    this.domDetailsItemsMoveContainer = e.querySelector("#project-details-items-move-container");
    this.domPreview = e.querySelector("#project-details-preview");
    this.domPreviewInner = e.querySelector("#project-details-preview-inner");
    this.domPreviewTitle = e.querySelector("#project-details-preview-title");
    this.domPreviewFooter = e.querySelector("#project-details-preview-footer");
    this.domPreviewFooterBarInner = e.querySelector("#project-details-preview-footer-bar-inner");
    this.scrollPane = new ScrollPane();
    this.scrollPane.contentDom = this.domDetailsItemsMoveContainer;
    this.scrollPane.init();
    projectDetailsScreen.preInit(this.domContainer);
  }
  preInitContent(e) {
    let t = e.pathNodes[1];
    this.projectDetailsDatas[t] = new ProjectDetailsData(t, e.dom);
  }
  _onModelLoad(e) {}
  init() {
    projectDetailsScreen.init();
    projectPage.onHideCompleted.add(() => {
      projectDetailsItems.pauseAllVideos();
    });
  }
  show(e) {
    this._disposeLayout();
    this._initLayout(e);
    this.overScrollRatio = 0;
    this.scrollPane.isActive = true;
    this.scrollPane.scrollToPixel(0, true);
    this.scrollPane.update(0);
    this.scrollPane.isActive = false;
    this.updatePreviewUI(e, true);
    this.resize(properties.viewportWidth, properties.viewportHeight);
    this.update(0, true);
  }
  updatePreviewUI(e, t = true) {
    let r = this.projectDetailsDatas[e];
    if (t) {
      this.domPreviewTitle.innerHTML = r.nextTitle;
      projectDetailsScreen.previewBgColorHex = r.nextColorBg;
      this.previewTitleColorHex = r.nextColorText;
      this.previewShadow = r.nextShadow;
    } else {
      this.domPreviewTitle.innerHTML = r.title;
      projectDetailsScreen.previewBgColorHex = r.colorBg;
      this.previewTitleColorHex = r.colorText;
      this.previewShadow = r.shadow;
    }
  }
  _disposeLayout() {
    let e = this.projectDetailsData;
    projectDetailsItems.deactivateAll();
    if (!e) {
      window.addEventListener("wheel", this._onWindowWheel.bind(this), {
        once: true
      });
    }
    if (e) {
      e.domServiceSideListItems.forEach(t => {
        t.remove();
      });
      e.domLinkSideListItems.forEach(t => {
        t.remove();
      });
    }
  }
  _initLayout(e) {
    let t = this.projectDetailsData = this.projectDetailsDatas[e];
    routeManager.preFetch("/projects/" + t.nextId);
    this.domTitle.innerHTML = t.title;
    this.domDesc.innerHTML = t.desc;
    this.domCtaText.textContent = t.ctaTitle;
    this.domCtaMobileText.textContent = t.ctaTitle;
    if (routeManager.parseUrl(t.ctaUrl)) {
      this.domCta.href = t.ctaUrl;
      this.domCtaMobile.href = t.ctaUrl;
      this.domContainer.classList.add("has-cta");
    } else {
      this.domContainer.classList.remove("has-cta");
    }
    this.domSideListService.style.visibility = t.domServiceSideListItems.length > 1 ? "visible" : "hidden";
    this.domSideListLinks.style.visibility = t.domLinkSideListItems.length > 1 ? "visible" : "hidden";
    t.domServiceSideListItems.forEach(r => {
      this.domSideListService.appendChild(r);
    });
    t.domLinkSideListItems.forEach(r => {
      this.domSideListLinks.appendChild(r);
    });
    this.sharedUniforms.u_highlightColor.value.setStyle(t.colorHighlight);
    this.sharedUniforms.u_textColor.value.setStyle(t.colorText);
    this.sharedUniforms.u_bgColor.value.setStyle(t.colorBg);
    this.domHeaderBackBtn.addEventListener("click", this._onBackBtnClick.bind(this));
    for (let r in t) {
      r.replace(/^color(.+)/g, (n, a) => {
        a = a.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (l, c, u) => c + "-" + u).toLowerCase();
        properties.domRoot.style.setProperty("--project-details-" + a, t[r]);
      });
    }
    properties.domRoot.style.setProperty("--header-color", t.colorHighlight);
    properties.domRoot.style.setProperty("--header-text-color", t.colorBtnText);
    header.domContainer.style.color = t.colorHighlight;
    t.itemDataList.forEach(r => {
      let n = projectDetailsItems.useItem(r);
      n.activate(r);
      this.domDetailsItemsMoveContainer.appendChild(n.domWrapper);
    });
  }
  _onBackBtnClick() {
    if (this.scrollPane.isActive && pagesManager.isIdle) {
      routeManager.setPath(projectPage.prevNonProjectPath || "/");
    }
  }
  _splitText() {}
  hide(e, t, r) {
    r();
    this.scrollPane.isActive = false;
  }
  resize(e, t) {
    this._splitText();
    let r = properties.useMobileLayout;
    this.sharedUniforms.u_isVertical.value = r ? 1 : 0;
    if (r) {
      this.domMeta.style.transform = "translateZ(0)";
    } else {
      this.domMeta.style.transform = "translate3d(0,-50%,0)";
    }
    let n = this.domMeta.getBoundingClientRect();
    this.domDetailsItemsMoveContainer.style.paddingTop = (r ? n.bottom : 0) + "px";
    if (r) {
      this.overScrollSize = this.domPreviewInner.getBoundingClientRect().height;
      this.domDetailsItemsMoveContainer.style.paddingRight = 0;
      this.domDetailsItemsMoveContainer.style.paddingBottom = this.overScrollSize + this.domDetailsItemsWrapper.getBoundingClientRect().top + "px";
    } else {
      this.overScrollSize = properties.viewportWidth * 0.25;
      this.domDetailsItemsMoveContainer.style.paddingRight = this.overScrollSize + "px";
      this.domDetailsItemsMoveContainer.style.paddingBottom = 0;
    }
    let a = this.domDetailsItemsMoveContainer.getBoundingClientRect();
    projectDetailsItems.resizeAll(a.width, a.height, a.top);
    let l = this.domTitle.getBoundingClientRect();
    if (r) {
      let c = this.domPreviewTitle.getBoundingClientRect();
      let u = this.domPreviewInner.getBoundingClientRect();
      this.previewInnerOffsetFrom = 0;
      this.previewInnerOffsetTo = l.top - (c.top - u.top);
    } else {
      this.previewInnerOffsetFrom = this.overScrollSize * 0.2;
      this.previewInnerOffsetTo = n.left;
    }
    this.domHeaderInfo.style.bottom = (properties.viewportHeight - this.domDetailsItemsWrapper.getBoundingClientRect().bottom) / 2 - this.domHeaderInfo.getBoundingClientRect().height / 2 + "px";
    this.titleCenterOffsetY = r ? 0 : properties.viewportHeight * 0.5 - n.top - l.height * 0.5;
    this.domPreviewTitle.style.width = l.width + "px";
    this.scrollPane.isVertical = r;
    this.scrollPane.isActive = true;
    this.scrollPane.resize(e, t);
    this.scrollPane.update(0);
    this.scrollPane.isActive = false;
    projectDetailsItems.syncDoms();
    projectDetailsScreen.resize(e, t);
  }
  update(e, t = false) {
    let r = this.projectDetailsData;
    if (!r) {
      return;
    }
    let n = properties.useMobileLayout;
    let a = n ? 0 : this.scrollPane.scrollPixel;
    let l = n ? this.scrollPane.scrollPixel : 0;
    let c = math.fit(projectPage.showRatio * (1 - projectPage.hideRatio), 0.5, 1, 0, 1);
    let u = math.fit(c, 0, 0.5, 0, 1, ease.expoOut);
    this.domHeaderBackBtn.style.transform = `translate3d(0,${1 - u}em,0)`;
    this.domHeaderBackBtn.style.opacity = u;
    this.scrollPane.isActive = projectPage.nextProjectRatio == 0 && projectPage.contentShowRatio > 0.75;
    if (projectPage.contentShowRatio <= 0.75) {
      this.scrollPane.scrollToPixel(0, true);
    }
    this.scrollPane.update(e);
    let f = (this.scrollPane.contentSize + 1) * this.scrollPane.viewSizePixel - this.scrollPane.scrollPixel - this.overScrollSize;
    if (n) {
      f = Math.min(f, l + properties.viewportHeight);
    } else {
      f = Math.min(f, a + properties.viewportWidth);
    }
    f = math.fit(projectPage.nextProjectRatio, 0, 1, f, 0, ease.quintInOut);
    let p = math.fit(projectPage.nextProjectRatio, 0, 1, this.previewInnerOffsetFrom, this.previewInnerOffsetTo);
    if (n) {
      this.domPreview.style.transform = `translate3d(0, ${f}px, 0)`;
      this.domPreviewInner.style.transform = `translate3d(0, ${p}px, 0)`;
    } else {
      this.domPreview.style.transform = `translate3d(${f}px, 0, 0)`;
      this.domPreviewInner.style.transform = `translate3d(${p}px, 0, 0)`;
    }
    this.domPreviewFooterBarInner.style.transform = `scaleX(${this.overScrollRatio})`;
    let g = c * math.fit(projectPage.nextProjectRatio, 0, 0.5, 1, 0) * math.fit(projectPage.contentShowRatio, 0.5, 1, 0, 1);
    let v = 1;
    if (n) {
      this.domMeta.style.transform = this.domDetailsItemsMoveContainer.style.transform;
    } else {
      this.domMeta.style.transform = "translate3d(0,-50%,0)";
      v = math.fit(this.scrollPane.scrollPixel, 0, (n ? properties.viewportHeight : properties.viewportWidth) * 0.25, 1, 0);
      v = Math.min(1 - projectPage.nextProjectRatio, v, c) * math.fit(projectPage.nextProjectRatio, 0, 0.3, 1, 0);
    }
    let _ = math.fit(projectPage.nextProjectRatio, 0.75, 1, 0, 1);
    this.domPreviewFooter.style.opacity = ease.expoInOut(g);
    this.domPreviewTitle.style.color = _c1.setStyle(this.previewTitleColorDefaultColorHex).lerp(_c2.setStyle(this.previewTitleColorHex), _).getStyle();
    projectDetailsScreen.previewColorRatio = _;
    projectDetailsScreen.previewBgThreshold = f / (n ? properties.viewportHeight : properties.viewportWidth);
    projectDetailsScreen.shadow = math.mix(r.shadow, this.previewShadow, projectPage.nextProjectRatio);
    this.domMeta.classList.toggle("is-active", v > 0.5);
    this.domTitle.style.transform = `translate3d(${this.scrollPane.x / 2}px, ${math.fit(projectPage.contentShowRatio, 0, 0.65, this.titleCenterOffsetY, 0, ease.expoInOut)}px, 0)`;
    this.domTitle.style.opacity = v;
    let T;
    T = math.fit(projectPage.contentShowRatio, 0.4, 0.85, 0, 1, ease.expoOut);
    this.domDesc.style.transform = `translate3d(${this.scrollPane.x / 3}px, ${(1 - T) * 30}px, 0)`;
    this.domDesc.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.45, 0.9, 0, 1, ease.expoOut);
    this.domCta.style.transform = `translate3d(0, ${(1 - T) * 30}px, 0)`;
    this.domCta.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.5, 0.95, 0, 1, ease.expoOut);
    this.domSideListService.style.transform = `translate3d(${this.scrollPane.x / 5}px, ${(1 - T) * 30}px, 0)`;
    this.domSideListService.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.55, 1, 0, 1, ease.expoOut);
    this.domSideListLinks.style.transform = `translate3d(${this.scrollPane.x / 4}px, ${(1 - T) * 30}px, 0)`;
    this.domSideListLinks.style.opacity = Math.min(v, T);
    this.domHeaderInfo._ratio = math.saturate(this.domHeaderInfo._ratio + (this.domHeaderInfo._hide ? e : -e));
    this.domHeaderInfo.style.opacity = T - ease.expoOut(this.domHeaderInfo._ratio);
    this.sharedUniforms.u_opacity.value = g;
    projectDetailsItems.update(e, a, l);
    if (!t) {
      projectDetailsScreen.update(e);
    }
    if (this.scrollPane.isActive && pagesManager.isIdle) {
      let M = this.scrollPane.targetScrollPixel >= this.scrollPane.contentSize * this.scrollPane.viewSizePixel - 1;
      let S = properties.useMobileLayout ? input.deltaDragScrollY + input.deltaWheel : input.deltaDragScrollX + input.deltaWheel;
      this.overScrollRatio = math.saturate(this.overScrollRatio + e * (M && S > 0 ? 3 : S < 0 ? -5 : -0.2));
      if (this.overScrollRatio == 1) {
        routeManager.setPath("/projects/" + r.nextId);
      }
    }
  }
  _onWindowWheel() {
    this.domHeaderInfo._hide = true;
  }
}
const projectDetailsSection = new ProjectDetailsSection();
class ProjectPageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1);
      if (!this.hasInit) {
        this.domProjectLaunchCta = document.getElementById("project-details-launch-cta");
        audios.addHoverClickEvents(this.domProjectLaunchCta);
        this.hasInit = true;
      }
    }
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectPageAudios = new ProjectPageAudios();
class ProjectPage extends Page {
  path = /projects\/([^\/]+)$/;
  id = "project";
  hasExtraPages = false;
  bypassShowingLoading = true;
  contentShowRatio = 0;
  nextProjectRatio = 0;
  prevNonProjectPath = null;
  preInit() {
    this._hideShownTween = new Tween(this, this._onContentShowComplete.bind(this));
    let e = this.domContainer;
    projectDetailsSection.preInit(e);
    videoOverlay.preInit();
  }
  preInitContent(e) {
    projectDetailsSection.preInitContent(e);
  }
  init() {
    projectDetailsSection.init();
    videoOverlay.init();
    super.init();
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    this._showPageTween.kill();
    let n = t.pathNodes[1];
    this.hideRatio = 0;
    header.forceWhite = true;
    header.domRightMenuBtn.style.background = "#fff";
    header.domContainer.classList.add("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "auto";
    if (e.target && e.target !== this) {
      this.prevNonProjectPath = e.path;
    }
    this._onShowCompleteCallback = r;
    if (e.target === t.target) {
      this.useGenericTransition = false;
      projectDetailsSection.updatePreviewUI(n, false);
      projectDetailsSection.update(0, true);
      this._showPageTween.onComplete = this._onNextProjectComplete.bind(this);
      this._showPageTween.fromTo(1, {
        nextProjectRatio: 0
      }, {
        nextProjectRatio: 1
      });
    } else {
      if (e.target && e.target.hasProject(n)) {
        this.useGenericTransition = false;
      }
      projectDetailsSection.show(n);
      this._showPageTween.onComplete = r;
      this._showPageTween.fromTo(this.showDuration, {
        showRatio: 0,
        contentShowRatio: 0
      }, {
        showRatio: 1,
        contentShowRatio: 1
      });
    }
    projectPageAudios.init();
  }
  hide(e, t, r) {
    this.useGenericTransition = true;
    header.domRightMenuBtn.style.removeProperty("background");
    header.domContainer.classList.remove("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "none";
    if (e.target === t.target) {
      this.useGenericTransition = false;
      this.hideRatio = 1;
      r();
    } else {
      let n = e.pathNodes[1];
      if (t.target.hasProject(n) && t.target.isFirstShown) {
        this.useGenericTransition = false;
      }
      super.hide(e, t, () => {
        header.domContainer.style.removeProperty("color");
        header.forceWhite = false;
        for (let a in projectDetailsSection.projectDetailsData) {
          a.replace(/^color(.+)/g, (l, c) => {
            c = c.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (u, f, p) => f + "-" + p).toLowerCase();
            properties.domRoot.style.removeProperty("--project-details-" + c);
            properties.domRoot.style.removeProperty("--header-color");
            properties.domRoot.style.removeProperty("--header-text-color");
          });
        }
        r();
      });
    }
  }
  resize(e, t) {
    if (this.hasInitialized) {
      projectDetailsSection.resize(e, t);
    }
  }
  update(e) {
    super.update(e);
    if (this.hasInitialized) {
      if (properties.smaa) {
        properties.smaa.enabled = false;
      }
      projectDetailsSection.update(e);
      projectPageAudios.update(e);
    }
  }
  _onContentShowComplete() {
    this._onShowCompleteCallback();
  }
  _onNextProjectComplete() {
    this._hideShownTween.kill();
    let e = pagesManager.currRoute.pathNodes[1];
    this.nextProjectRatio = 0;
    this.contentShowRatio = 0;
    projectDetailsSection.show(e);
    this._hideShownTween.fromTo(1.5, {
      contentShowRatio: 0
    }, {
      contentShowRatio: 1
    });
  }
}
const projectPage = new ProjectPage();
let _brokenGlassStep = 0;
class HomePageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1, 0);
      if (!this.hasInit) {
        this.domHomeReelCta = document.getElementById("home-reel-cta");
        this.domHomeReelVideoWatchBtn = document.getElementById("home-reel-video-watch-btn");
        this.domHomeFeaturedCta = document.getElementById("home-featured-cta");
        this.domVideoOverlayPlayBtn = document.getElementById("video-overlay__play-btn");
        this.domVideoOverlayMuteBtn = document.getElementById("video-overlay__mute-btn");
        this.domProjectItems = Array.from(document.querySelectorAll("#home .project-item"));
        audios.addHoverClickEvents(this.domHomeReelCta);
        audios.addHoverClickEvents(this.domHomeReelVideoWatchBtn);
        audios.addHoverClickEvents(this.domHomeFeaturedCta);
        audios.addHoverClickEvents(this.domVideoOverlayPlayBtn);
        audios.addHoverClickEvents(this.domVideoOverlayMuteBtn);
        this.domProjectItems.forEach(e => audios.addHoverClickEvents(e));
        this.hasInit = true;
      }
    }
  }
  update() {
    if (!settings.USE_AUDIO) {
      return;
    }
    const {
      astronautDropRatio: e,
      blackFrameInRatio: t,
      blackTunnelRatio: r,
      whiteTunnelRatio: n
    } = goalTunnels;
    if (t > 0.5 && r === 0) {
      _brokenGlassStep = 0;
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(0);
      _brokenGlassStep = 0;
    } else if (r > 0 && n === 0) {
      audios.fadeBgMusic("cinematic_3", 0.5);
      _brokenGlassStep = 0;
      audios.items.cinematic_3.setFilterFrequencyViaRatio(math.fit(goalTunnels.freezeRatio, 0.25, 1, 0, 0.5));
    } else if (n > 0 && e === 0) {
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(1);
    } else if (n > 0 && e <= 0.8) {
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(0);
    } else if (n > 0 && e > 0.8) {
      audios.fadeBgMusic("generic_end", 1);
    } else {
      _brokenGlassStep = 0;
      audios.fadeBgMusic("generic", 1);
    }
    if (e === 0) {
      _brokenGlassStep = 1;
    } else {
      if (_brokenGlassStep == 1) {
        audios.items.glass_broken.play();
      }
      _brokenGlassStep = 2;
    }
  }
}
const homePageAudios = new HomePageAudios();
class HomePage extends Page {
  path = /^(|home)$/;
  id = "home";
  hasEndVisual = false;
  updateAudio = false;
  endSectionActiveThreshold = 2.5;
  preInit() {
    let e = this.domContainer;
    homeHeroSection.preInit(e);
    homeReelSection.preInit(e);
    homeFeaturedSection.preInit(e);
    homeGoalSection.preInit(e);
  }
  init() {
    homeHeroSection.init();
    homeReelSection.init();
    homeFeaturedSection.init();
    homeGoalSection.init();
    super.init();
  }
  hasProject(e) {
    return homeFeaturedSection.projectItemList.hasProject(e);
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    this.updateAudio = true;
    homeFeaturedSection.projectItemList.selectedId = null;
    let n = e.pathNodes[1];
    if (e.target === projectPage && this.hasProject(n) && this.isFirstShown) {
      this.useGenericTransition = false;
      this.showDuration = 1.5;
      scrollManager.scrollToPixel(homeFeaturedSection.projectItemList.getProjectItemTop(n) - properties.viewportHeight * 0.25, true);
      homeFeaturedSection.projectItemList.selectedId = n;
    } else {
      this.showDuration = 1;
    }
    homeHeroSection.initEvent();
    homePageAudios.init();
    super.show(e, t, r);
  }
  hide(e, t, r) {
    this.updateAudio = false;
    this.useGenericTransition = true;
    homeFeaturedSection.projectItemList.selectedId = null;
    if (t.target === projectPage && this.hasProject(t.pathNodes[1])) {
      this.useGenericTransition = false;
      this.hideDuration = 1.5;
      homeFeaturedSection.projectItemList.selectedId = t.pathNodes[1];
    } else {
      this.hideDuration = 1;
    }
    homeHeroSection.hide();
    super.hide(e, t, r);
  }
  resize(e, t) {
    homeHeroSection.resize(e, t);
    homeReelSection.resize(e, t);
    homeFeaturedSection.resize(e, t);
    homeGoalSection.resize(e, t);
  }
  update(e) {
    if (this.hasInitialized) {
      super.update(e);
      homeHeroSection.update(e);
      homeReelSection.update(e);
      homeFeaturedSection.update(e);
      homeGoalSection.update(e);
      if (pagesManager.scrollTargetPage == this) {
        let t = true;
        let r = false;
        let n = false;
        if (scrollManager.getDomRange(homeGoalSection.domContainer).screenRatio == 1) {
          properties.bgColor.setStyle(properties.blackColorHex);
          t = false;
          r = true;
        } else {
          properties.bgColor.setStyle(properties.offWhiteColorHex);
          t = true;
          r = false;
        }
        if (homeGoalSection.uiBgColorNeedsOverride) {
          n = false;
          if (homeGoalSection.isUIBgBlack) {
            t = false;
            r = true;
          } else {
            t = true;
            r = false;
          }
        }
        if (footerSection.getDomRange().ratio > -0.1) {
          t = true;
          r = false;
          n = false;
        }
        document.documentElement.classList.toggle("is-black-bg", r);
        document.documentElement.classList.toggle("is-white-bg", t);
        document.documentElement.classList.toggle("is-blue-bg", n);
      }
      if (this.updateAudio) {
        homePageAudios.update(e);
      }
    }
  }
}
const homePage = new HomePage();
const getLightUvShader = `#define GLSLIFY 1
uniform vec2 u_lightShadowTextureTexelSize;vec2 getLightUv(vec3 lightToWorld){float flatYScale=1.5;vec2 flatUv=normalize(lightToWorld*vec3(1.,flatYScale,1.)).xz;vec2 dir=abs(normalize(flatUv));flatUv=(flatUv*(dir.y>dir.x ? 1./dir.y : 1./dir.x)*0.5+0.5)*vec2(1.,0.5);float isTop=lightToWorld.y>0.0 ? 1.0 : 0.0;float halfTexelY=u_lightShadowTextureTexelSize.y*0.5;flatUv.y=clamp(0.+isTop*halfTexelY,0.5-(1.-isTop)*halfTexelY,flatUv.y);return flatUv+vec2(0.,isTop*.5);}`;
class AboutHeroLight {
  shadowMapSize = 1024;
  position = new Vector3(0, 8, 0);
  shadowRenderTarget = null;
  sharedUniforms = {
    u_lightPosition: {
      value: this.position
    },
    u_lightColor: {
      value: new Color("#000")
    },
    u_lightShadowMaxDistance: {
      value: 12
    },
    u_lightShadowTexture: {
      value: null
    },
    u_lightShadowTextureTexelSize: {
      value: new Vector2(1 / this.shadowMapSize, 1 / (this.shadowMapSize * 2))
    }
  };
  preInit() {}
  init() {
    shaderHelper.addChunk("getLightUv", getLightUvShader);
    this.shadowRenderTarget = fboHelper.createRenderTarget(this.shadowMapSize, this.shadowMapSize * 2, true, HalfFloatType);
    let e = this.sharedUniforms.u_lightShadowTexture.value = this.shadowRenderTarget.texture;
    this.shadowRenderTarget.depthBuffer = true;
    if (settings.USE_WEBGL2) {
      e.format = RedFormat;
    }
  }
  update(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.setRenderTarget(this.shadowRenderTarget);
    t.setClearColor(16777215, 1);
    t.clear();
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  renderMesh(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.autoClearColor = false;
    fboHelper.renderMesh(e, this.shadowRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  postUpdate(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    properties.gl;
    t.autoClear = false;
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
}
const light = new AboutHeroLight();
const sliceShader = `#define GLSLIFY 1
uniform vec2 u_lightFieldSlicedTextureSize;uniform vec2 u_lightFieldSliceColRowCount;uniform vec3 u_lightFieldGridCount;uniform vec3 u_lightFieldVolumeOffset;uniform vec3 u_lightFieldVolumeSize;vec2 lightFieldGridToUv(vec3 grid){vec2 uv=grid.xy;vec2 colRow=floor(vec2(mod(grid.z,u_lightFieldSliceColRowCount.x),grid.z/u_lightFieldSliceColRowCount.x));uv+=colRow*u_lightFieldGridCount.xy+.5;return uv/u_lightFieldSlicedTextureSize;}vec3 lightFieldGridToUv3(vec3 grid){return grid/u_lightFieldGridCount;}vec3 clampLightFieldGrid(vec3 grid){return clamp(grid,vec3(.5),u_lightFieldGridCount-vec3(.5));}vec3 lightFieldPosToGrid(vec3 pos){return(pos-u_lightFieldVolumeOffset)/u_lightFieldVolumeSize*u_lightFieldGridCount;}vec3 clampedLightFieldPosToGrid(vec3 pos){return clampLightFieldGrid(lightFieldPosToGrid(pos));}vec4 sampleLightField(sampler2D tex,vec3 gridPos){gridPos.z-=.5;vec2 uv1=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,floor(gridPos.z)+.5)));vec2 uv2=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,ceil(gridPos.z)+.5)));return mix(texture2D(tex,uv1),texture2D(tex,uv2),fract(gridPos.z));}`;
const sliceBlendFrag = `#define GLSLIFY 1
uniform sampler2D u_prevSliceTexture;uniform sampler2D u_drawnSliceTexture;varying vec2 v_uv;
#include <lightFieldSlice>
vec4 sampleSlice4(vec3 gridPos){vec3 sliceOffset=vec3(-.5,.5,0.);return(texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xyz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yyz))))/4.;}void main(){vec3 gridPos=vec3(mod(gl_FragCoord.xy,u_lightFieldGridCount.xy),dot(floor(gl_FragCoord.xy/u_lightFieldGridCount.xy),vec2(1.,u_lightFieldSliceColRowCount.x))+.5);vec4 prev=texture2D(u_prevSliceTexture,v_uv);vec4 curr=(sampleSlice4(gridPos+vec3(0.,0.,-1.))+sampleSlice4(gridPos)*2.+sampleSlice4(gridPos+vec3(0.,0.,1.)))*.25;prev+=(curr-prev)*mix(0.15,0.08,clamp(prev.r,0.,1.));gl_FragColor=prev;}`;
class AboutHeroLightField {
  GRID_COUNT = new Vector3(64, 64, 64);
  VOLUME_SIZE = new Vector3(8, 0, 0);
  container = new Object3D();
  prevSliceRenderTarget = null;
  currSliceRenderTarget = null;
  drawnSliceRenderTarget = null;
  sliceTo3DMesh = null;
  sliceBlendMaterial;
  sliceColumnCount = 0;
  sliceRowCount = 0;
  gridSize = 0;
  SHOW_TEST_VOXELS = false;
  sharedUniforms = {
    u_lightFieldTexture3D: {
      value: null
    },
    u_lightFieldMaxLod: {
      value: 0
    },
    u_lightFieldSlicedTexture: {
      value: null
    },
    u_lightFieldSlicedTextureSize: {
      value: new Vector2()
    },
    u_lightFieldSliceColRowCount: {
      value: new Vector2()
    },
    u_lightFieldGridSize: {
      value: 0
    },
    u_lightFieldGridCount: {
      value: this.GRID_COUNT
    },
    u_lightFieldVolumeOffset: {
      value: new Vector3()
    },
    u_lightFieldVolumeSize: {
      value: new Vector3()
    }
  };
  preInit() {}
  init() {
    shaderHelper.addChunk("lightFieldSlice", sliceShader);
    this.gridSize = this.VOLUME_SIZE.x / (this.GRID_COUNT.x - 1);
    this.sharedUniforms.u_lightFieldGridSize.value = this.gridSize;
    this.VOLUME_SIZE.y = this.gridSize * (this.GRID_COUNT.y - 1);
    this.VOLUME_SIZE.z = this.gridSize * (this.GRID_COUNT.z - 1);
    this.sharedUniforms.u_lightFieldVolumeSize.value.setScalar(this.gridSize).add(this.VOLUME_SIZE);
    this.sharedUniforms.u_lightFieldMaxLod.value = Math.log2(Math.min(this.GRID_COUNT.x, this.GRID_COUNT.y, this.GRID_COUNT.z));
    let e = this.GRID_COUNT.x * this.GRID_COUNT.y * this.GRID_COUNT.z;
    let t = this.sliceColumnCount = Math.ceil(Math.sqrt(e) / this.GRID_COUNT.x);
    let r = this.sliceRowCount = Math.ceil(this.GRID_COUNT.z / t);
    this.sharedUniforms.u_lightFieldSliceColRowCount.value.set(t, r);
    let n = this.GRID_COUNT.x * t;
    let a = this.GRID_COUNT.y * r;
    this.sharedUniforms.u_lightFieldSlicedTextureSize.value.set(n, a);
    this.currSliceRenderTarget = fboHelper.createRenderTarget(n, a);
    this.prevSliceRenderTarget = this.currSliceRenderTarget.clone();
    this.drawnSliceRenderTarget = this.currSliceRenderTarget.clone();
    fboHelper.clearColor(0, 0, 0, 0, this.currSliceRenderTarget);
    this.sliceBlendMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lightFieldSlicedTextureSize: this.sharedUniforms.u_lightFieldSlicedTextureSize,
        u_lightFieldSliceColRowCount: this.sharedUniforms.u_lightFieldSliceColRowCount,
        u_lightFieldGridCount: this.sharedUniforms.u_lightFieldGridCount,
        u_lightFieldVolumeOffset: this.sharedUniforms.u_lightFieldVolumeOffset,
        u_lightFieldVolumeSize: this.sharedUniforms.u_lightFieldVolumeSize,
        u_prevSliceTexture: {
          value: null
        },
        u_drawnSliceTexture: {
          value: this.drawnSliceRenderTarget.texture
        }
      },
      fragmentShader: sliceBlendFrag
    });
  }
  update(e) {
    let t = this.VOLUME_SIZE.clone().multiplyScalar(0.5).sub(light.position).multiplyScalar(-1);
    this.sharedUniforms.u_lightFieldVolumeOffset.value.setScalar(-this.gridSize / 2).add(t);
    let r = properties.renderer;
    let n = fboHelper.getColorState();
    let a = r.getRenderTarget();
    r.setRenderTarget(this.drawnSliceRenderTarget);
    r.setClearColor(0, 0);
    r.clear();
    r.setRenderTarget(a);
    fboHelper.setColorState(n);
  }
  renderMesh(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.autoClearColor = false;
    fboHelper.renderMesh(e, this.drawnSliceRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  postUpdate(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    properties.gl;
    t.autoClear = false;
    let a = this.prevSliceRenderTarget;
    this.prevSliceRenderTarget = this.currSliceRenderTarget;
    this.currSliceRenderTarget = a;
    this.sharedUniforms.u_lightFieldSlicedTexture.value = this.currSliceRenderTarget.texture;
    this.sliceBlendMaterial.uniforms.u_prevSliceTexture.value = this.prevSliceRenderTarget.texture;
    fboHelper.render(this.sliceBlendMaterial, this.currSliceRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
}
const lightField = new AboutHeroLightField();
const fragSim = `#define GLSLIFY 1
uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simDefaultPosLifeTexture;uniform float u_introDeltaTime;uniform float u_noiseTime;uniform float u_noiseScale;uniform float u_noiseStableFactor;uniform vec3 u_lightPosition;varying vec2 v_uv;
#define PI2 6.283185307179586
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<2;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(xNoisePotentialDerivatives[3]-zNoisePotentialDerivatives[1],zNoisePotentialDerivatives[2]-yNoisePotentialDerivatives[3],yNoisePotentialDerivatives[1]-xNoisePotentialDerivatives[2]);}void main(){vec4 posLife=texture2D(u_simPrevPosLifeTexture,v_uv);vec3 posLifeOrigin=posLife.xyz-u_lightPosition;posLife.w-=(0.5+u_noiseStableFactor)*u_introDeltaTime;if(posLife.w<0.0){vec3 defPosOrigin=texture2D(u_simDefaultPosLifeTexture,v_uv).xyz;vec3 defPos=defPosOrigin*(1.25+sin(u_noiseTime*2.5+v_uv.x*21.)*0.25)+u_lightPosition;posLife.w+=1.;posLife.xyz=defPos;}vec3 toLight=posLife.xyz-u_lightPosition;vec3 axis=vec3(sin(u_noiseTime),cos(u_noiseTime*2.+v_uv.y*6.283185),0.0);vec3 spinDir=cross(axis,toLight);float dist=length(toLight);if(dist>0.01){float spinStrength=u_introDeltaTime*(0.1+smoothstep(0.5,2.0,dist-v_uv.x*0.5)*(v_uv.y<0.5 ? 1. :-1.)*mix(2.,4.,v_uv.x))*mix(0.75,1.5,u_noiseStableFactor);posLife.xyz+=spinDir*spinStrength;}posLife.xyz+=(1.25+0.5*u_noiseScale)*curl((posLife.xyz-u_lightPosition)*(0.4+0.3*u_noiseStableFactor),u_noiseTime,0.2)*u_introDeltaTime*mix(0.4,1.5,posLife.w*posLife.w)*mix(0.75,1.25,v_uv.x);gl_FragColor=posLife;}`;
new Vector3();
class AboutHeroParticlesSimulation {
  SIM_TEXTURE_WIDTH = 128;
  SIM_TEXTURE_HEIGHT = browser$1.isMobile ? 128 : 192;
  currPositionRenderTarget = null;
  prevPositionRenderTarget = null;
  ORIGIN = new Vector3(0, 8, 0);
  isPlaying = true;
  isFirstSim = true;
  noiseSpeed = 0.4;
  _noise = new Simple1DNoise();
  noiseScaleTime = Math.random();
  noiseStableFactorTime = Math.random();
  noiseStableFactor = Math.random();
  sharedUniforms = {
    u_simCurrPosLifeTexture: {
      value: null
    },
    u_simPrevPosLifeTexture: {
      value: null
    },
    u_simDefaultPosLifeTexture: {
      value: null
    },
    u_simTextureSize: {
      value: new Vector2(this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT)
    },
    u_noiseStableFactor: {
      value: 0
    }
  };
  preInit() {
    this.currPositionRenderTarget = fboHelper.createRenderTarget(this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT, true, FloatType);
    this.prevPositionRenderTarget = this.currPositionRenderTarget.clone();
    this.positionMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lightPosition: light.sharedUniforms.u_lightPosition,
        u_simPrevPosLifeTexture: this.sharedUniforms.u_simPrevPosLifeTexture,
        u_simDefaultPosLifeTexture: this.sharedUniforms.u_simDefaultPosLifeTexture,
        u_introDeltaTime: aboutHero.sharedUniforms.u_introDeltaTime,
        u_noiseTime: {
          value: 0
        },
        u_noiseScale: {
          value: 0
        },
        u_noiseStableFactor: this.sharedUniforms.u_noiseStableFactor
      },
      fragmentShader: fragSim
    });
    let e = this.SIM_TEXTURE_WIDTH * this.SIM_TEXTURE_HEIGHT;
    let t = new Float32Array(e * 4);
    for (let n = 0, a = 0; n < e; n++, a += 4) {
      let l = Math.random();
      let c = Math.random();
      let u = l * 2 * Math.PI;
      let f = Math.acos(c * 2 - 1);
      let p = 0.25 + Math.cbrt(Math.random()) * 0.5;
      let g = Math.sin(u);
      let v = Math.cos(u);
      let _ = Math.sin(f);
      let T = Math.cos(f);
      t[a + 0] = p * _ * v;
      t[a + 1] = p * _ * g;
      t[a + 2] = p * T;
      t[a + 3] = n / e - 1;
    }
    let r = this.sharedUniforms.u_simDefaultPosLifeTexture.value = fboHelper.createDataTexture(t, this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT, true, true);
    fboHelper.copy(r, this.currPositionRenderTarget);
  }
  init() {}
  update(e) {
    if (this.isPlaying) {
      let t = this.currPositionRenderTarget;
      this.currPositionRenderTarget = this.prevPositionRenderTarget;
      this.prevPositionRenderTarget = t;
      this.sharedUniforms.u_simCurrPosLifeTexture.value = this.currPositionRenderTarget.texture;
      this.sharedUniforms.u_simPrevPosLifeTexture.value = this.prevPositionRenderTarget.texture;
      this.positionMaterial.uniforms.u_noiseTime.value += e * this.noiseSpeed;
      this.noiseScaleTime += e;
      const r = this._noise.getFbm(this.noiseScaleTime, 3);
      this.positionMaterial.uniforms.u_noiseScale.value = Math.abs(r) * 10;
      this.noiseStableFactorTime += e * 0.5;
      this.noiseStableFactor += Math.abs(this._noise.getFbm(this.noiseStableFactorTime, 3)) * 0.05;
      this.sharedUniforms.u_noiseStableFactor.value = math.fit(aboutHero.introRatio, 0, 0.4, 0, 1) * math.smoothstep(0.9, 0.95, 0.5 + Math.sin(this.noiseStableFactor) * 0.5);
      fboHelper.render(this.positionMaterial, this.currPositionRenderTarget);
    }
  }
}
const sim = new AboutHeroParticlesSimulation();
const vert$9 = `#define GLSLIFY 1
attribute vec3 simUv;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_sceneHideRatio;uniform float u_isEmissive;uniform float u_noiseStableFactor;uniform sampler2D u_lightFieldSlicedTexture;
#include <lightFieldSlice>
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying float v_depth;varying float v_diff;varying float v_ao;varying float v_emission;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv.xy);vec4 rands=hash43(simUv);float particleSize=mix(0.06,0.175,u_isEmissive)*(0.5+rands.x*0.5);float particleSizeScale=linearStep(0.0,0.1,currPositionInfo.w)*linearStep(1.0,0.9,currPositionInfo.w);particleSize*=particleSizeScale*(1.0-u_sceneHideRatio);vec3 pos=position*particleSize+currPositionInfo.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*normal;v_worldNormal=normalize((vec4(v_viewNormal,0.)*viewMatrix).xyz);vec3 rayGridDir=v_worldNormal;vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec4 indirectDiffuse=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+rayGridDir);float lifeFalloff=mix(0.5,1.,particleSizeScale);v_emission=(indirectDiffuse.a*0.55*lifeFalloff+0.45)*u_isEmissive;v_diff=(1.-indirectDiffuse.a)*lifeFalloff;v_diff*=linearStep(5.,1.5,length(v_worldPosition-vec3(0.,8.,0.)));v_ao=1.0-indirectDiffuse.a;
#include <aboutHeroVisualFinal_vert>
}`;
const frag$d = `#define GLSLIFY 1
uniform sampler2D u_lightFieldSlicedTexture;uniform float u_noiseStableFactor;uniform float u_emissiveRatio;uniform float u_contrast;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewNormal;varying float v_depth;varying float v_diff;varying float v_emission;varying float v_ao;
#include <lightFieldSlice>
#include <getScatter>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=normalize(v_worldNormal);vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec3 rayGridDir=worldNormal;vec3 rayGridSpecDir=reflect(normalize(v_worldPosition-cameraPosition),worldNormal);vec4 indirectSpecular=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridSpecDir+(noise-.5)*0.25)*(1.+noise.z));float specular=indirectSpecular.r;vec3 rayGridRefractDir=refract(normalize(v_worldPosition-cameraPosition),worldNormal,1./1.4);vec4 refractionInfo=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridRefractDir+(noise-.5)*0.25)*(1.5+noise.z));float refraction=refractionInfo.r*(1.-refractionInfo.a*0.75);float shade=v_diff*0.45+specular+refraction;shade+=getScatter(cameraPosition,v_worldPosition)*1.35;float viewShade=linearStep(-1.,1.,dot(viewNormal,vec3(.5773)));shade=mix(shade,viewShade,v_emission*v_ao)*(.4+v_ao*.6);gl_FragColor=vec4(mix(shade,smoothstep(0.,1.,shade),0.5),v_depth,1.,mix(v_diff*v_diff+v_emission,1.,u_emissiveRatio));}`;
const lightFieldVert = `#define GLSLIFY 1
attribute vec3 position;uniform sampler2D u_simCurrPosLifeTexture;uniform float u_noiseStableFactor;
#include <lightFieldSlice>
varying vec4 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(position);vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,position.xy);float scale=linearStep(1.0,0.9,currPositionInfo.w);vec3 pos=currPositionInfo.xyz;vec3 lightFieldGrid=clampedLightFieldPosToGrid(pos);vec2 lightFieldUv=lightFieldGridToUv(lightFieldGrid);gl_Position=vec4(lightFieldUv*2.0-1.0,0.0,1.0);gl_PointSize=1.0;vec3 color=position.x<0.005 ? vec3(1.): vec3(0.1);v_color=vec4(color,1.)*scale;}`;
const lightFieldFrag = `#define GLSLIFY 1
varying vec4 v_color;void main(){gl_FragColor=v_color;}`;
const motionVert = `#define GLSLIFY 1
attribute vec2 simUv;uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_strength;uniform float u_aspect;varying vec2 v_delta;varying float v_headTail;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv);vec4 prevPositionInfo=texture2D(u_simPrevPosLifeTexture,simUv);vec4 rands=hash43(vec3(simUv.xy,0.));float particleSize=(simUv.x<0.005 ? 0.175 : 0.06)*(0.5+rands.x*0.5);mat4 mvp=projectionMatrix*modelViewMatrix;vec4 currScreenPos=mvp*vec4(currPositionInfo.xyz,1.0);vec4 prevScreenPos=mvp*vec4(prevPositionInfo.xyz,1.0);currScreenPos/=currScreenPos.w;prevScreenPos/=prevScreenPos.w;vec2 screenPosDelta=currScreenPos.xy-prevScreenPos.xy;float screenPosDist=length(screenPosDelta);float angle=screenPosDist>0.001 ? atan(screenPosDelta.y,screenPosDelta.x*u_aspect): 0.;vec4 screenPos=position.x>-0.0001 ? currScreenPos : prevScreenPos;vec4 offsetScreenPos=modelViewMatrix*vec4((position.x>0. ? currPositionInfo.xyz : prevPositionInfo.xyz),1.0);offsetScreenPos.xy+=particleSize;offsetScreenPos=projectionMatrix*offsetScreenPos;offsetScreenPos/=offsetScreenPos.w;offsetScreenPos=offsetScreenPos-screenPos;v_delta=screenPosDelta;v_headTail=position.x;vec4 pos=vec4(position,0.);pos.xy=rotate(pos.xy,angle)*length(offsetScreenPos.xy*vec2(u_aspect,1.));pos.xy*=vec2(1./u_aspect,1.);pos+=screenPos;pos.xy+=v_delta*.5;v_delta=v_delta*2.+.5;gl_Position=pos;if(currPositionInfo.w>prevPositionInfo.w){gl_Position=vec4(2.,0.,0.,1.);}}`;
const motionFrag = `#define GLSLIFY 1
varying vec2 v_delta;varying float v_headTail;void main(){float ratio=sqrt(abs(v_headTail)*2.);float strength=sign(v_headTail)*ratio*-.5;gl_FragColor=vec4(v_delta,strength+.5,v_headTail+0.5);}`;
const getScatter = `#define GLSLIFY 1
uniform vec2 u_lightScatterDivider;uniform float u_lightScatterPowInv;uniform vec3 u_lightScatterPos0;uniform vec3 u_lightScatterPos1;uniform float u_lightScatterRatio;float getScatterCoff(vec3 start,vec3 dir,vec3 lightPos,float d){vec3 q=start-lightPos;float b=dot(dir,q);float c=dot(q,q);float t=c-b*b;float s=1.0/(2.5+pow(0.001+t,0.8));return s*(atan((d+b)*s)-atan(b*s));}vec2 getScatterLine(vec3 start,vec3 dir,vec3 lightPos0,vec3 lightPos1,float d){vec3 segCenter=(lightPos0+lightPos1)*0.5;vec3 segDir=normalize(lightPos1-lightPos0);vec3 diff=start-segCenter;float segExtent=distance(lightPos0,lightPos1)*0.5;float a01=-dot(dir,segDir);float b0=dot(diff,dir);float b1=-dot(diff,segDir);float det=abs(1.0-a01*a01);float s=clamp((a01*b0-b1)/max(0.0001,det),-segExtent,segExtent);vec3 lightPos=segDir*s+segCenter;return vec2(getScatterCoff(start,dir,segExtent>0.0 ? lightPos : lightPos0,d),s/segExtent*0.5+0.5);}float getScatter(vec3 cameraPosition,vec3 worldPos,vec2 lightScatterDivider,float lightScatterPowInv){vec3 worldToCamera=worldPos-cameraPosition;float d=length(worldToCamera);vec3 dir=worldToCamera/d;vec2 val=getScatterLine(cameraPosition,dir,u_lightScatterPos0,u_lightScatterPos1,d);return pow(max(0.0,val.x/mix(lightScatterDivider.x,lightScatterDivider.y,val.y)),lightScatterPowInv)*u_lightScatterRatio;}float getScatter(vec3 cameraPosition,vec3 worldPos){return getScatter(cameraPosition,worldPos,u_lightScatterDivider,u_lightScatterPowInv);}`;
class AboutHeroScatter {
  sharedUniforms = {
    u_lightScatterDivider: {
      value: new Vector2(1.1, 5.5)
    },
    u_lightScatterPowInv: {
      value: 0
    },
    u_lightScatterRatio: {
      value: 0
    },
    u_lightScatterPos0: {
      value: new Vector3(0, 18, 0)
    },
    u_lightScatterPos1: {
      value: new Vector3(0, 0, 0)
    }
  };
  constructor() {
    this._brownianMotion0 = new BrownianMotion();
    this._brownianMotion1 = new BrownianMotion();
  }
  init() {
    shaderHelper.addChunk("getScatter", getScatter);
  }
  update(e) {
    let t = math.fit(aboutHero.introRatio, 0, 0.2, 2, 0.7);
    t = math.fit(aboutHero.introRatio, 0.7, 0.85, t, 0.4);
    this.sharedUniforms.u_lightScatterPowInv.value = t;
    this.sharedUniforms.u_lightScatterRatio.value = math.fit(aboutHero.introRatio, 0.7, 0.85, 1, 0, ease.cubicIn);
  }
}
const aboutHeroScatter = new AboutHeroScatter();
const fragmentShader$2 = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;void main(){gl_FragColor=texture2D(u_texture,v_uv).rrra;}`;
const motionBlurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_motionTexture;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(41.,25.));vec4 motion=texture2D(u_motionTexture,v_uv);motion.xy-=0.5;motion.xy*=(motion.z-.5)/16.*u_blurRatio*0.25;vec4 c=vec4(0.);vec2 offset=motion.xy*noise.xy;for(int i=0;i<16;i++){offset+=motion.xy;c+=texture2D(u_texture,v_uv+offset);}c/=16.;gl_FragColor=vec4(c.rrr,c.a);vec4 color=texture2D(u_texture,v_uv).rrra;gl_FragColor=max(color,gl_FragColor);}`;
const blurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform float u_aspect;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec4 tex=texture2D(u_texture,v_uv);vec2 ra=vec2(0.);float fi=0.;float theta=noise.x*6.283185307179586;vec2 strength=vec2(1.,1.*u_aspect)*.006*tex.b*u_blurRatio;for(int i=0;i<8;i++){theta+=10.166407384630519;ra+=texture2D(u_texture,v_uv+vec2(cos(theta),sin(theta))*sqrt((fi+.5)/8.)*strength).ra;fi+=1.;}ra/=8.;gl_FragColor=ra.xxxy;}`;
class AboutPageHeroEfxPrepass extends PostEffect {
  isActive = true;
  cacheRT = null;
  motionBlurRatio = 1;
  motionRT;
  motionTmpRT;
  useMotionBlur = false;
  blurRatio = 0;
  scene = new Scene();
  needsRenderScene = true;
  renderOrder = 5;
  init(e) {
    Object.assign(this, e);
    super.init();
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    this.motionRT = fboHelper.createRenderTarget(1, 1);
    this.motionRT.depthBuffer = true;
    this.motionTmpRT = fboHelper.createRenderTarget(1, 1);
    this._material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: null
        },
        u_motionTexture: {
          value: this.motionRT.texture
        },
        u_aspect: {
          value: 1
        },
        u_blurRatio: {
          value: 0
        }
      }, blueNoise.sharedUniforms),
      fragmentShader: fragmentShader$2
    });
    this._motionBlurMaterial = fboHelper.createRawShaderMaterial({
      uniforms: this._material.uniforms,
      fragmentShader: motionBlurFragmentShader
    });
    this._blurMaterial = fboHelper.createRawShaderMaterial({
      uniforms: this._material.uniforms,
      fragmentShader: blurFragmentShader
    });
  }
  needsRender() {
    return this.isActive;
  }
  setPostprocessing(e) {
    const t = e.width;
    const r = e.height;
    this.cacheRT.setSize(t, r);
    this._material.uniforms.u_aspect.value = t / r;
  }
  renderMotion(e, t, r, n) {
    let a = properties.renderer;
    let l = fboHelper.getColorState();
    let c = a.getRenderTarget();
    this.motionRT.setSize(r, n);
    a.setRenderTarget(this.motionRT);
    a.setClearColor(8355711, 0);
    a.clear();
    fboHelper.renderMesh(e, this.motionRT, t);
    blur.blur(2, 1, this.motionRT, this.motionTmpRT, this.motionRT);
    a.setRenderTarget(c);
    fboHelper.setColorState(l);
    this.useMotionBlur = true;
  }
  render(e, t = false) {
    fboHelper.copy(e.fromTexture, this.cacheRT);
    if (this.useMotionBlur) {
      this.useMotionBlur = false;
      this.material = this._motionBlurMaterial;
      this.material.uniforms.u_blurRatio.value = this.motionBlurRatio;
    } else {
      this.material = this.blurRatio > 0 ? this._blurMaterial : this._material;
      this.material.uniforms.u_blurRatio.value = this.blurRatio;
    }
    if (this.needsRenderScene) {
      this.material.uniforms.u_texture.value = e.fromTexture;
      fboHelper.render(this.material, e.toRenderTarget);
      let r = fboHelper.getColorState();
      fboHelper.renderer.autoClear = false;
      fboHelper.renderer.setRenderTarget(e.toRenderTarget);
      fboHelper.renderer.render(this.scene, e.camera);
      fboHelper.setColorState(r);
      e.swap();
    } else {
      super.render(e, t);
    }
  }
}
const aboutPageHeroEfxPrepass = new AboutPageHeroEfxPrepass();
class AboutHeroParticles {
  container = new Object3D();
  emissiveMesh = null;
  nonEmissiveMesh = null;
  lightFieldMesh = null;
  lodIds = ["l", "m", "s", "xs"];
  lodRefGeometries = [];
  preInit() {
    for (let p = settings.IS_SMALL_SCREEN ? 1 : 0; p < 4; p++) {
      properties.loader.add(settings.MODEL_PATH + "about/sphere_" + this.lodIds[p] + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, p)
      });
    }
    let e = sim.SIM_TEXTURE_WIDTH * sim.SIM_TEXTURE_HEIGHT;
    let t = new Float32Array(e * 3);
    let r = new InstancedBufferGeometry();
    let n = new InstancedBufferGeometry();
    let a = new Float32Array((sim.SIM_TEXTURE_WIDTH - 1) * sim.SIM_TEXTURE_HEIGHT * 2);
    let l = new Float32Array(sim.SIM_TEXTURE_HEIGHT * 2);
    for (let p = 0, g = 0, v = 0, _ = 0; p < e; p++, g += 3) {
      let T = t[g + 0] = (p % sim.SIM_TEXTURE_WIDTH + 0.5) / sim.SIM_TEXTURE_WIDTH;
      let M = t[g + 1] = (~~(p / sim.SIM_TEXTURE_WIDTH) + 0.5) / sim.SIM_TEXTURE_HEIGHT;
      if (p % sim.SIM_TEXTURE_WIDTH == 0) {
        l[v + 0] = T;
        l[v + 1] = M;
        v += 2;
      } else {
        a[_ + 0] = T;
        a[_ + 1] = M;
        _ += 2;
      }
    }
    r.setAttribute("simUv", new InstancedBufferAttribute(a, 2));
    this.nonEmissiveMesh = new Mesh(r, new ShaderMaterial({
      uniforms: Object.assign({
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_simTextureSize: sim.sharedUniforms.u_simTextureSize,
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
        u_isEmissive: {
          value: 0
        },
        u_emissiveRatio: {
          value: 0
        }
      }, lightField.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms, blueNoise.sharedUniforms),
      vertexShader: vert$9,
      fragmentShader: frag$d
    }));
    this.nonEmissiveMesh.renderOrder = 5;
    this.nonEmissiveMesh.frustumCulled = false;
    this.container.add(this.nonEmissiveMesh);
    n.setAttribute("simUv", new InstancedBufferAttribute(l, 2));
    this.emissiveMesh = new Mesh(n, new ShaderMaterial({
      uniforms: Object.assign({}, this.nonEmissiveMesh.material.uniforms, {
        u_isEmissive: {
          value: 1
        },
        u_emissiveRatio: {
          value: 0
        }
      }),
      vertexShader: vert$9,
      fragmentShader: frag$d
    }));
    this.emissiveMesh.renderOrder = 5;
    this.emissiveMesh.frustumCulled = false;
    this.container.add(this.emissiveMesh);
    let c = new PlaneGeometry(1, 1);
    let u = new InstancedBufferGeometry();
    for (let p in c.attributes) {
      u.attributes[p] = c.attributes[p];
    }
    u.setIndex(c.getIndex());
    u.setAttribute("simUv", new InstancedBufferAttribute(t, 3));
    this.motionMesh = new Mesh(u, new ShaderMaterial({
      uniforms: {
        u_simPrevPosLifeTexture: sim.sharedUniforms.u_simPrevPosLifeTexture,
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_aspect: properties.sharedUniforms.u_aspect
      },
      vertexShader: motionVert,
      fragmentShader: motionFrag
    }));
    this.motionMesh.frustumCulled = false;
    let f = new BufferGeometry();
    f.name = "lightFieldGeometry";
    f.setAttribute("position", new BufferAttribute(t, 3));
    this.lightFieldMesh = new Points(f, fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor
      }, lightField.sharedUniforms),
      vertexShader: lightFieldVert,
      fragmentShader: lightFieldFrag,
      blending: CustomBlending,
      blendEquation: MaxEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: MaxEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    }));
    this.lightFieldMesh.frustumCulled = false;
  }
  _onGeometryLoad(e, t) {
    this.lodRefGeometries[e] = t;
  }
  init() {}
  update(e) {
    this.nonEmissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 0.75);
    this.emissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 0.75);
    let t;
    let r = aboutHero.introRatio < 0.3;
    let n = !r && aboutHero.introRatio < 0.7;
    let a = 0;
    let l = 0;
    if (settings.IS_SMALL_SCREEN) {
      a = r ? 2 : 3;
      l = r ? 1 : n ? 2 : 3;
    } else {
      a = r ? 1 : n ? 2 : 3;
      l = r ? 0 : n ? 1 : 3;
    }
    t = this.lodRefGeometries[a];
    if (!t || typeof t.getIndex !== "function") {
      return;
    }
    for (let u in t.attributes) {
      this.nonEmissiveMesh.geometry.attributes[u] = t.attributes[u];
    }
    this.nonEmissiveMesh.geometry.setIndex(t.getIndex());
    t = this.lodRefGeometries[l];
    if (!t || typeof t.getIndex !== "function") {
      return;
    }
    for (let u in t.attributes) {
      this.emissiveMesh.geometry.attributes[u] = t.attributes[u];
    }
    this.emissiveMesh.geometry.setIndex(t.getIndex());
    lightField.renderMesh(this.lightFieldMesh);
    let c = math.fit(aboutHero.introRatio, 0, 0.1, 1, 1.5);
    c = math.fit(aboutHero.introRatio, 0.1, 0.15, c, 0);
    aboutPageHeroEfxPrepass.motionBlurRatio = c;
    if (aboutPageHeroEfxPrepass.motionBlurRatio > 0) {
      aboutPageHeroEfxPrepass.renderMotion(this.motionMesh, properties.camera, properties.width >> 2, properties.height >> 2);
    }
  }
}
const aboutHeroParticles = new AboutHeroParticles();
const vert$8 = `#define GLSLIFY 1
attribute float piece;attribute float instanceId;attribute vec4 instanceRands;uniform sampler2D u_posRandTexture;uniform sampler2D u_orientTexture;uniform vec2 u_animationTextureSize;uniform float u_time;uniform float u_globalTime;uniform float u_scale;uniform float u_noiseStableFactor;uniform float u_hudRatio;
#ifdef IS_SHADOW
uniform vec3 u_lightPosition;uniform float u_lightShadowMaxDistance;varying float v_distToLight;
#include <getLightUv>
#else
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){float duration=0.25+2.+4.;float time=duration*instanceRands.x+u_time;float cycle=floor(time/duration);time=time-duration*cycle;vec4 cycleRands=hash42(vec2(cycle,instanceId));float flyUpRatio=pow(linearStep(2.25,6.25,time),1.5);float appearRatio=linearStep(0.,0.25,time-instanceRands.y)*(1.0-u_hudRatio);vec4 selfSpin=quaternion(normalize(instanceRands.xyz-0.5),flyUpRatio*mix(5.0,30.,cycleRands.z));float pieceScale=appearRatio;vec3 origin=vec3(0.0,1.9+instanceRands.w*0.4,0.0);float angle=cycleRands.x*6.2832;float radius=4.+cycleRands.w*4.;float rollRatio=1.0-linearStep(0.,3.25,time+instanceRands.x);radius-=(rollRatio*rollRatio)*5.;vec2 dir=vec2(cos(angle),sin(angle));vec3 instanceOffset=vec3(dir.x*radius,flyUpRatio*mix(30.0,40.,cycleRands.z)+u_noiseStableFactor*(0.5+0.5*sin(u_globalTime+instanceId*0.1))*0.1,dir.y*radius);instanceOffset.xz=rotate(instanceOffset.xz,flyUpRatio*flyUpRatio*mix(-1.,1.,instanceRands.z))*smoothstep(1.5,0.35,flyUpRatio);float frame=linearStep(0.25,2.25,time)*119.;float frameFloor=floor(frame);float frameCeil=min(frameFloor+1.,119.);float frameFract=frame-frameFloor;vec4 simUvs=(vec3(piece,frameFloor,frameCeil).xyxz+.5)/u_animationTextureSize.xyxy;vec4 posRand1=texture2D(u_posRandTexture,simUvs.xy);vec4 orient1=texture2D(u_orientTexture,simUvs.xy);vec4 posRand2=texture2D(u_posRandTexture,simUvs.zw);vec4 orient2=texture2D(u_orientTexture,simUvs.zw);
#ifdef IS_SHADOW
pieceScale*=1.5;
#endif
vec3 pos1=qrotate(orient1,position)*pieceScale+posRand1.xyz;vec3 pos2=qrotate(orient2,position)*pieceScale+posRand2.xyz;vec3 pos=u_scale*0.75*mix(0.5,1.5,instanceRands.z*instanceRands.z)*linearStep(1.,0.9,flyUpRatio)*(qrotate(selfSpin,mix(pos1,pos2,frameFract)-origin)+origin)*mix(0.3,0.7,cycleRands.w)+instanceOffset;
#ifdef IS_SHADOW
pos=(modelMatrix*vec4(pos,1.0)).xyz;vec3 center=instanceOffset+origin-u_lightPosition;pos-=u_lightPosition;v_distToLight=length(pos)/u_lightShadowMaxDistance;if(center.y>0.0){pos.y=max(0.001,pos.y);}else{pos.y=min(-0.001,pos.y);}gl_Position=vec4(getLightUv(pos)*2.0-1.0,1.-v_distToLight,1.0);
#else
vec3 nor1=qrotate(selfSpin,qrotate(orient1,normal));vec3 nor2=qrotate(selfSpin,qrotate(orient2,normal));vec3 nor=normalize(mix(nor1,nor2,frameFract));gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*nor;v_uv=uv;vec4 viewPosition=modelViewMatrix*vec4(pos,1.0);
#include <aboutHeroVisualFinal_vert>
#endif
}`;
const frag$c = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_textureChannelMixer;uniform vec3 u_lightColor;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){float pattern=dot(u_textureChannelMixer,texture2D(u_texture,v_uv));vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);float attenutation=1.0/(0.05+(0.02-0.005*u_noiseStableFactor)*worldToLightDist*worldToLightDist);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);float diff=0.25+0.75*dot(worldNormal,worldToLight);float spec=0.8*dot(reflect(cameraToWorld,worldNormal),worldToLight);vec3 color=vec3(pattern);color*=attenutation*(0.05+diff+spec*diff);gl_FragColor=vec4(color*0.85+0.15,spec*(0.3+u_noiseStableFactor));gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
}`;
const lightShadowMapFrag = `#define GLSLIFY 1
varying float v_distToLight;void main(){gl_FragColor=vec4(v_distToLight);}`;
class AboutHeroRocks {
  ROCK_PIECE_COUNT = 16;
  FRAME_COUNT = 120;
  FPS = 60;
  COUNT = browser$1.isMobile ? 48 : 64;
  container = new Object3D();
  meshList = [];
  shadowMeshList = [];
  meshAnimationUniformList = [];
  meshInstanceUniformsList = [];
  meshInstanceAttributesList = [];
  time = 0;
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_animationTextureSize: {
      value: new Vector2(this.ROCK_PIECE_COUNT, this.FRAME_COUNT)
    },
    u_time: {
      value: 0
    },
    u_globalTime: {
      value: 0
    },
    u_scale: {
      value: 0
    },
    u_lightPosition: light.sharedUniforms.u_lightPosition,
    u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor
  };
  preInit() {
    properties.loader.add(settings.TEXTURE_PATH + "about/rocks.webp", {
      type: "texture",
      onLoad: e => {
        let t = fboHelper.createRawShaderMaterial({
          uniforms: Object.assign({
            u_texture: {
              value: e
            }
          }, aboutHeroScatter.sharedUniforms),
          fragmentShader: `
						uniform sampler2D u_texture;
						varying vec2 v_uv;
						void main () {
							vec2 uv = v_uv * 0.5;
							gl_FragColor = vec4(
								texture2D(u_texture, uv).g,
								texture2D(u_texture, uv + vec2(.5, 0.)).g,
								texture2D(u_texture, uv + vec2(0., .5)).g,
								texture2D(u_texture, uv + vec2(.5, .5)).g
							);
						}`
        });
        let r = fboHelper.createRenderTarget(512, 512);
        r.texture.minFitler = LinearMipmapLinearFilter;
        r.texture.generateMipmaps = true;
        fboHelper.render(t, r);
        this.sharedUniforms.u_texture.value = r.texture;
        t.dispose();
        e.dispose();
      }
    }).content;
    for (let e = 0; e < 4; e++) {
      this.meshAnimationUniformList[e] = {
        u_posRandTexture: {
          value: null
        },
        u_orientTexture: {
          value: null
        }
      };
      this.meshInstanceUniformsList[e] = Object.assign({
        u_textureChannelMixer: {
          value: new Vector4(+(e == 0), +(e == 1), +(e == 2), +(e == 3))
        }
      }, this.meshAnimationUniformList[e], this.sharedUniforms, aboutHero.sharedUniforms, light.sharedUniforms, aboutHeroScatter.sharedUniforms);
      let t = new Float32Array(this.COUNT);
      let r = new Float32Array(this.COUNT * 4);
      for (let n = 0; n < this.COUNT; n++) {
        t[n] = e + n * 4;
        r[n * 4 + 0] = Math.random();
        r[n * 4 + 1] = Math.random();
        r[n * 4 + 2] = Math.random();
        r[n * 4 + 3] = Math.random();
      }
      this.meshInstanceAttributesList[e] = {
        instanceId: new InstancedBufferAttribute(t, 1),
        instanceRands: new InstancedBufferAttribute(r, 4)
      };
      properties.loader.add(settings.MODEL_PATH + "about/rock_" + e + ".buf", {
        onLoad: this._onRockLoad.bind(this, e, false)
      });
      properties.loader.add(settings.MODEL_PATH + "about/rock_" + e + "_low.buf", {
        onLoad: this._onRockLoad.bind(this, e, true)
      });
      properties.loader.add(settings.MODEL_PATH + "about/rock_animation_" + e + ".buf", {
        onLoad: this._onRockAnimationLoad.bind(this, e)
      });
    }
  }
  loadRock(e) {}
  _onRockLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let c in r.attributes) {
      n.setAttribute(c, r.attributes[c]);
    }
    n.index = r.index;
    let a = this.meshInstanceAttributesList[e];
    n.setAttribute("instanceId", a.instanceId);
    n.setAttribute("instanceRands", a.instanceRands);
    let l = new Mesh(n, new ShaderMaterial({
      uniforms: this.meshInstanceUniformsList[e],
      vertexShader: vert$8,
      fragmentShader: frag$c
    }));
    l.frustumCulled = false;
    if (t) {
      this.shadowMeshList[e] = l;
      l.material.defines.IS_SHADOW = true;
      l.material.fragmentShader = lightShadowMapFrag;
      l.material.side = DoubleSide;
    } else {
      this.meshList[e] = l;
    }
  }
  _onRockAnimationLoad(e, t) {
    if (!t || !t.attributes || !t.attributes.position || !t.attributes.orient) {
      return;
    }
    let r = t.attributes.position.array;
    let n = t.attributes.orient.array;
    let a = new Float32Array(r.length / 3 * 4);
    let l = [];
    for (let c = 0, u = 0, f = 0; u < r.length; c++, u += 3, f += 4) {
      a[f] = r[u];
      a[f + 1] = r[u + 1];
      a[f + 2] = r[u + 2];
      if (c < this.ROCK_PIECE_COUNT) {
        l[c] = Math.random();
      }
      a[f + 3] = l[c % this.ROCK_PIECE_COUNT];
    }
    this.meshAnimationUniformList[e].u_posRandTexture.value = fboHelper.createDataTexture(a, this.ROCK_PIECE_COUNT, this.FRAME_COUNT, true, true);
    this.meshAnimationUniformList[e].u_orientTexture.value = fboHelper.createDataTexture(n, this.ROCK_PIECE_COUNT, this.FRAME_COUNT, true, true);
  }
  init() {
    for (let e = 0; e < 4; e++) {
      this.container.add(this.meshList[e]);
    }
  }
  update(e) {
    if (properties.hasInitialized) {
      sim.sharedUniforms.u_noiseStableFactor.value;
      this.time += e;
      this.sharedUniforms.u_time.value = this.time;
      this.sharedUniforms.u_globalTime.value = properties.time;
      this.sharedUniforms.u_scale.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 1);
      for (let t = 0; t < 4; t++) {
        light.renderMesh(this.shadowMeshList[t]);
      }
    }
  }
}
const aboutHeroRocks = new AboutHeroRocks();
const frag$b = `#define GLSLIFY 1
uniform sampler2D u_prevTexture;uniform sampler2D u_lightShadowTexture;uniform vec3 u_lightPosition;uniform vec2 u_blueNoiseOffset;uniform float u_lightShadowMaxDistance;uniform float u_radius;uniform float u_texelSize;varying vec2 v_uv;
#include <getLightUv>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+u_blueNoiseOffset);vec2 uvDir=normalize(v_uv-0.5);vec2 uv=v_uv-uvDir*u_texelSize;vec3 worldPosition=vec3(uv*2.0-1.0,0.0).xzy*u_radius;worldPosition.z*=-1.0;vec3 lightToWorld=worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float expandRatio=linearStep(u_lightPosition.y,14.,distToLight);vec3 lightSampleStep=((vec3(lightToWorld.x,0.0,lightToWorld.z)*(1.0-expandRatio*0.75)+(blueNoise-0.5)*expandRatio*4.)*25.0*expandRatio*expandRatio)/float(LIGHT_SHADOW_SAMPLE_COUNT)*-mix(0.06,0.1,expandRatio);vec3 lightToWorldPos=lightToWorld+lightSampleStep*blueNoise.y;float accum=0.0;for(int i=0;i<LIGHT_SHADOW_SAMPLE_COUNT;i++){float selfDist=min(1.0,length(lightToWorldPos)/u_lightShadowMaxDistance);vec2 lightShadowUv=getLightUv(lightToWorldPos);float dist=texture2D(u_lightShadowTexture,lightShadowUv).r;float delta=selfDist-dist;accum+=delta>0. ? min(delta*delta*20.,1.): 1.0;lightToWorldPos+=lightSampleStep;}float shadowMask=accum/float(LIGHT_SHADOW_SAMPLE_COUNT);shadowMask=mix(shadowMask,1.0,expandRatio);shadowMask=pow(shadowMask,6.);float prevShadowMask=texture2D(u_prevTexture,v_uv).r;gl_FragColor=vec4(mix(prevShadowMask,shadowMask,shadowMask>prevShadowMask ? 0.5 : 0.2));}`;
const groundVert = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(position,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;
#include <aboutHeroVisualFinal_vert>
}`;
const groundFrag = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform sampler2D u_texture;uniform sampler2D u_groundShadowTexture;uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform float u_fogA;uniform float u_fogB;uniform float u_sceneRatio;uniform float u_hudRatio;uniform float u_noiseStableFactor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 applyFog(in vec3 rgb,in float distance,in vec3 rayOri,in vec3 rayDir){float a=u_fogA;float b=u_fogB;float fogAmount=(a/b)*exp(-rayOri.y*b)*(1.0-exp(-distance*rayDir.y*b))/rayDir.y;return mix(rgb,u_bgColor,fogAmount);}vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(v_uv);vec2 dSTdy=dFdy(v_uv);float scale=0.1;float Hll=scale*texture2D(u_texture,v_uv).b;float dBx=scale*texture2D(u_texture,v_uv+dSTdx).b-Hll;float dBy=scale*texture2D(u_texture,v_uv+dSTdy).b-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+vec2(48.,31.));vec3 mixedTexture=texture2D(u_texture,v_uv).rgb;float shadow=mixedTexture.r;float light=clamp(mixedTexture.g,0.1,1.0);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 normal=normalize(v_viewNormal)*faceDirection;normal=perturbNormalArb(-v_viewPosition,normal,dHdxy_fwd(),faceDirection);vec3 N=inverseTransformDirection(normal,viewMatrix);vec3 L=normalize(u_lightPosition-v_worldPosition);vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdL=clamp(dot(N,L),0.001,1.0);float NdV=clamp(abs(dot(N,V)),0.001,1.0);vec3 lightToWorld=v_worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float attenutation=1.0/(0.05+(0.025-0.005*u_noiseStableFactor)*distToLight*distToLight);float dist=1.0-pow(2.0*length(v_uv-0.5),2.0);float rockShadows=texture2D(u_groundShadowTexture,(vec2(v_localPosition.x,-v_localPosition.z)+(blueNoise.xy-.5)*0.1)*0.0425+0.5).r;float spec=dot(reflect(V,N),L)*linearStep(0.9,0.0,N.y)*4.;gl_FragColor.rgb=vec3(light+attenutation*spec);gl_FragColor.rgb*=shadow*(0.5+rockShadows*0.5)*(1.+spec);gl_FragColor.rgb=applyFog(gl_FragColor.rgb,length(cameraPosition-v_worldPosition),cameraPosition,-V);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r=mix(gl_FragColor.r,shadow*(1.-abs(N.y)),u_hudRatio);gl_FragColor.r*=u_sceneRatio;gl_FragColor.g-=blueNoise.z*0.004;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=spec*shadow;}`;
class AboutHeroGround {
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  RADIUS = 12;
  SIZE = 768;
  sharedUniforms = {
    u_groundShadowTexture: {
      value: null
    }
  };
  prevRenderTarget = null;
  currRenderTarget = null;
  blurCacheRenderTarget = null;
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/terrain.buf", {
      onLoad: e => this.geometry = e
    });
    this.texture = properties.loader.load(settings.TEXTURE_PATH + "about/terrain_shadow_light_height.webp", {
      type: "texture",
      flipY: true,
      minFilter: LinearFilter
    }).content;
  }
  init() {
    this.prevRenderTarget = fboHelper.createRenderTarget(this.SIZE, this.SIZE);
    this.currRenderTarget = this.prevRenderTarget.clone();
    this.blurCacheRenderTarget = this.prevRenderTarget.clone();
    this.mesh = new Mesh(new CircleGeometry(1.1, 128), fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_prevTexture: {
          value: null
        },
        u_radius: {
          value: this.RADIUS
        },
        u_texelSize: {
          value: 1 / this.SIZE
        },
        u_blueNoiseOffset: {
          value: new Vector2()
        }
      }, light.sharedUniforms, blueNoise.sharedUniforms),
      fragmentShader: frag$b
    }));
    this.mesh.material.defines.LIGHT_SHADOW_SAMPLE_COUNT = 8;
    this.groundMesh = new Mesh(this.geometry, new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: this.texture
        },
        u_groundShadowTexture: {
          value: this.currRenderTarget.texture
        },
        u_color: {
          value: new Color()
        },
        u_bgColor: {
          value: new Color()
        },
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
        u_fogA: {
          value: 0.03
        },
        u_fogB: {
          value: 0.285
        }
      }, light.sharedUniforms, aboutHeroScatter.sharedUniforms, blueNoise.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: groundVert,
      fragmentShader: groundFrag
    }));
    this.groundMesh.material.extensions.derivatives = true;
    this.container.add(this.groundMesh);
    fboHelper.clearColor(1, 1, 1, 1, this.currRenderTarget);
  }
  update(e) {
    let t = this.prevRenderTarget;
    this.prevRenderTarget = this.currRenderTarget;
    this.currRenderTarget = t;
    let r = properties.renderer;
    let n = fboHelper.getColorState();
    let a = r.getRenderTarget();
    r.setRenderTarget(this.currRenderTarget);
    r.setClearColor(16777215, 1);
    this.mesh.material.uniforms.u_blueNoiseOffset.value.set(~~(Math.random() * 128), ~~(Math.random() * 128));
    this.mesh.material.uniforms.u_prevTexture.value = this.prevRenderTarget.texture;
    fboHelper.renderMesh(this.mesh, this.currRenderTarget);
    r.setRenderTarget(a);
    fboHelper.setColorState(n);
    sim.sharedUniforms.u_noiseStableFactor.value;
    this.groundMesh.material.uniforms.u_groundShadowTexture.value = this.currRenderTarget.texture;
    this.groundMesh.material.uniforms.u_bgColor.value.copy(properties.bgColor);
    this.groundMesh.material.uniforms.u_color.value.set("#fff");
  }
}
const aboutHeroGround = new AboutHeroGround();
const vert$7 = `#define GLSLIFY 1
attribute float t;attribute float totalLength;attribute float lineId;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){v_t=t;v_totalLength=totalLength;float yIndex=floor(position.y+.5);v_thicknessRatio=step(mod(yIndex,4.),0.5);vec3 pos=position+normal*mix(0.04,0.1,v_thicknessRatio);vec3 nor=normalize(normalMatrix*normal);v_viewNormal=nor;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);gl_Position.z-=0.1/gl_Position.w;}`;
const frag$a = `#define GLSLIFY 1
uniform float u_time;uniform float u_hudRatio;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float pnoise(vec2 P,vec2 rep){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,rep.xyxy);Pi=mod289(Pi);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float t=mod(v_t-u_time*2.,v_totalLength);float noiseScale=0.25;float n=pnoise(vec2(t*noiseScale,0.),vec2(v_totalLength*noiseScale,100.));float shade=mix(0.3+smoothstep(0.,0.-fwidth(n),n)*0.6,1.,v_thicknessRatio);shade*=linearStep(50.,-20.,v_worldPosition.z);gl_FragColor=vec4(shade,0.,0.,1.)*step(v_totalLength-v_t,v_totalLength*u_hudRatio);gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.r*=.85;}`;
let SEGMENT_COUNT = 3;
let THREHSOLDS = [60, 245, 806, 966, 991, 1026, 1191, 1853, 2061, 3111, 4279, 4309, 4338, 5265, 5316, 5447, 5475, 6407, 6445, 7116, 7235, 7349, 7934, 8555, 8583, 8614, 9154, 9640, 9688, 10163, 10420, 10645, 10895, 11074, 11286, 11453, 11596, 11628, 11740, 11799, 11832];
let v0 = new Vector3();
new Vector3();
new Vector3();
class AboutHeroLines {
  container = new Object3D();
  time = 0;
  sharedUniforms = {};
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/terrain_lines.buf", {
      onLoad: this._onLineLoad.bind(this)
    });
  }
  _onLineLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) {
      return;
    }
    let t = e.attributes.position.array;
    let r = THREHSOLDS.length;
    let n = t.length / 3;
    let a = new Float32Array(n * SEGMENT_COUNT * 3);
    let l = new Float32Array(n * SEGMENT_COUNT * 3);
    let c = new Float32Array(n * SEGMENT_COUNT);
    let u = new Float32Array(n * SEGMENT_COUNT);
    let f = new Uint8Array(n * SEGMENT_COUNT);
    let p = new Uint16Array((n - r) * 6 * SEGMENT_COUNT);
    let g = new Vector3();
    let v = new Vector3();
    let _ = new Vector3();
    let T = new Vector3();
    let M = new Vector3();
    let S = new Vector3();
    let b = new Quaternion();
    let C = new Vector3();
    let w = 0;
    let R = 0;
    let E = 0;
    for (let k = 0; k < THREHSOLDS.length; k++) {
      let L = k == 0 ? 0 : THREHSOLDS[k - 1];
      let D = THREHSOLDS[k];
      _.fromArray(t, L * 3);
      v.copy(_);
      M.set(0, 1, 0);
      let ne = 0;
      for (let z = L; z < D; z++) {
        let j = z * 3;
        g.copy(v);
        v.copy(_);
        if (z < D - 1) {
          _.fromArray(t, j + 3);
        }
        T.subVectors(_, g).normalize();
        S.crossVectors(M, T).normalize();
        b.setFromAxisAngle(T, Math.PI * 2 / SEGMENT_COUNT);
        C.copy(M);
        ne += v0.copy(v).sub(g).length();
        for (let X = 0; X < SEGMENT_COUNT; X++) {
          C.applyQuaternion(b);
          a[R + 0] = v.x;
          a[R + 1] = v.y;
          a[R + 2] = v.z;
          l[R + 0] = C.x;
          l[R + 1] = C.y;
          l[R + 2] = C.z;
          c[w] = ne;
          f[w] = k;
          if (z < D - 1) {
            let Z = X == SEGMENT_COUNT - 1 ? 1 - SEGMENT_COUNT : 1;
            p[E++] = w;
            p[E++] = w + Z;
            p[E++] = w + SEGMENT_COUNT;
            p[E++] = w + Z;
            p[E++] = w + SEGMENT_COUNT + Z;
            p[E++] = w + SEGMENT_COUNT;
          }
          w++;
          R += 3;
        }
      }
      let re = SEGMENT_COUNT * (D - L);
      w -= re;
      let ce = w + re;
      for (; w < ce; w++) {
        u[w] = ne;
      }
    }
    let I = new BufferGeometry();
    I.setAttribute("position", new BufferAttribute(a, 3));
    I.setAttribute("normal", new BufferAttribute(l, 3));
    I.setAttribute("t", new BufferAttribute(c, 1));
    I.setAttribute("totalLength", new BufferAttribute(u, 1));
    I.setAttribute("lineId", new BufferAttribute(f, 1));
    I.setIndex(new BufferAttribute(p, 1));
    let F = new ShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time
      }, aboutHero.sharedUniforms),
      vertexShader: vert$7,
      fragmentShader: frag$a,
      blending: CustomBlending,
      blendEquation: MaxEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    F.extensions.derivatives = true;
    this.mesh = new Mesh(I, F);
    this.mesh.renderOrder = 15;
    this.container.add(this.mesh);
  }
  init() {}
  update(e) {}
}
const aboutHeroLines = new AboutHeroLines();
const vert$6 = `#define GLSLIFY 1
attribute vec2 boneIndices;attribute vec2 boneWeights;uniform vec3 u_bonePoses[BONE_COUNT];uniform vec4 u_boneOrients[BONE_COUNT];varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=vec3(0.0);vec3 nor=vec3(0.0);vec3 bonePos;vec4 boneOrient;bonePos=u_bonePoses[int(boneIndices.x)];boneOrient=u_boneOrients[int(boneIndices.x)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.x;nor+=qrotate(boneOrient,normal)*boneWeights.x;bonePos=u_bonePoses[int(boneIndices.y)];boneOrient=u_boneOrients[int(boneIndices.y)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.y;nor+=qrotate(boneOrient,normal)*boneWeights.y;vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_uv=uv;
#include <aboutHeroVisualFinal_vert>
}`;
const frag$9 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightPosition;uniform vec3 u_lightMixer;uniform float u_sceneRatio;uniform float u_hudRatio;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){vec3 worldNormal=normalize(v_worldNormal);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);vec4 map=texture2D(u_texture,v_uv);float light=dot(u_lightMixer,map.rgb);light=pow(light,1.25);float baseShade=map.a;vec3 color=vec3(baseShade*light);gl_FragColor=vec4(color,0.);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);}`;
const shadowVert = `#define GLSLIFY 1
varying vec2 v_uv;void main(){v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const shadowFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightMixer;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(3.,36.));vec3 map3=texture2D(u_texture,v_uv).xyz;float light1=dot(u_lightMixer,map3);float light2=dot(u_lightMixer.gbr,map3);float light=mix(light1,light2,blueNoises.x);light=light*light*.3+.7;gl_FragColor=vec4(light,1.,1.,0.);}`;
let _v1$2 = new Vector3();
let _v2$1 = new Vector3();
let _q1$1 = new Quaternion();
let _q2 = new Quaternion();
class aboutHeroPerson {
  BONE_COUNT = 54;
  FPS = 60;
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  shadowMesh = null;
  shadowTexture = null;
  time = 0;
  frameCount = 0;
  bonePosAnimationData;
  boneOrientAnimationData;
  bonePoses = new Float32Array(this.BONE_COUNT * 3);
  boneOrients = new Float32Array(this.BONE_COUNT * 4);
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_lightMixer: {
      value: new Vector3(1, 0, 0)
    }
  };
  preInit() {
    properties.loader.load(settings.TEXTURE_PATH + "about/person_light.webp", {
      type: "texture",
      onLoad: e => {
        this.lightTexture = e;
        this._onTextureLoad(e);
      }
    }).content;
    properties.loader.load(settings.TEXTURE_PATH + "about/person.webp", {
      type: "texture",
      onLoad: e => {
        this.texture = e;
        this._onTextureLoad(e);
      }
    }).content;
    this.shadowTexture = properties.loader.load(settings.TEXTURE_PATH + "about/ground_person_shadow.webp", {
      type: "texture"
    }).content;
    properties.loader.add(settings.MODEL_PATH + "about/person.buf", {
      onLoad: e => {
        this._onModelLoad(e);
      }
    });
    properties.loader.add(settings.MODEL_PATH + "about/person_idle.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
  }
  _onTextureLoad() {
    if (this.lightTexture && this.texture) {
      let e = fboHelper.createRenderTarget(this.lightTexture.image.width, this.lightTexture.image.height);
      e.texture.minFilter = LinearMipMapNearestFilter;
      e.texture.generateMipmaps = false;
      this.sharedUniforms.u_texture.value = e.texture;
      fboHelper.copy(textureHelper.transparentTexture, e);
      textureHelper.mixChannels(this.lightTexture, e, 0, 1, 2, -1);
      e.texture.generateMipmaps = true;
      textureHelper.mixChannels(this.texture, e, -1, -1, -1, 0);
      this.texture.dispose();
      this.lightTexture.dispose();
      this.texture = null;
      this.lightTexture = null;
    }
  }
  _onModelLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: this.sharedUniforms.u_texture,
        u_lightMixer: this.sharedUniforms.u_lightMixer,
        u_bonePoses: {
          value: this.bonePoses
        },
        u_boneOrients: {
          value: this.boneOrients
        }
      }, light.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$6,
      fragmentShader: frag$9
    }));
    this.mesh.material.defines.BONE_COUNT = this.BONE_COUNT;
    this.container.add(this.mesh);
  }
  _onAnimationLoad(e) {
    if (!e || !e.attributes || !e.attributes.position || !e.attributes.orient) {
      return;
    }
    this.bonePosAnimationData = e.attributes.position.array;
    this.boneOrientAnimationData = e.attributes.orient.array;
    this.frameCount = this.bonePosAnimationData.length / (this.BONE_COUNT * 3);
  }
  init() {
    this.shadowMesh = new Mesh(new PlaneGeometry(1.5, 1.5), new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: this.shadowTexture
        },
        u_lightMixer: this.sharedUniforms.u_lightMixer
      }, blueNoise.sharedUniforms),
      vertexShader: shadowVert,
      fragmentShader: shadowFrag,
      blending: MultiplyBlending
    }));
    this.shadowMesh.renderOrder = 10;
    this.shadowMesh.position.y = 0.01;
    this.shadowMesh.rotation.x = -Math.PI / 2;
    this.container.add(this.shadowMesh);
  }
  update(e) {
    if (this.mesh && this.frameCount) {
      this.time += e * 0.5;
      let t = this.time * this.FPS % this.frameCount;
      let r = Math.floor(t);
      let n = Math.ceil(t) % this.frameCount;
      let a = t - r;
      let l = r * this.BONE_COUNT;
      let c = n * this.BONE_COUNT;
      let u = this.frameCount / 3;
      this.sharedUniforms.u_lightMixer.value.set(math.fit(t, u * 2, this.frameCount, 0, 1) + math.fit(t, 0, u, 1, 0), math.fit(t, 0, u, 0, 1) * math.fit(t, u, u * 2, 1, 0), math.fit(t, u, u * 2, 0, 1) * math.fit(t, u * 2, this.frameCount, 1, 0));
      for (let f = 0; f < this.BONE_COUNT; f++) {
        _v1$2.fromArray(this.bonePosAnimationData, (l + f) * 3).lerp(_v2$1.fromArray(this.bonePosAnimationData, (c + f) * 3), a).toArray(this.bonePoses, f * 3);
        _q1$1.fromArray(this.boneOrientAnimationData, (l + f) * 4).slerp(_q2.fromArray(this.boneOrientAnimationData, (c + f) * 4), a).toArray(this.boneOrients, f * 4);
      }
    }
  }
}
const aboutHeroPerson$1 = new aboutHeroPerson();
const aboutHeroVisualFinalVert = `#define GLSLIFY 1
float viewZ=(modelViewMatrix*vec4(pos,1.0)).z;float near=1.;float far=100.0;v_depth=1.0-(viewZ+near)/(near-far);`;
const aboutHeroVisualFinalFrag = `#define GLSLIFY 1
gl_FragColor.r=gl_FragColor.r;gl_FragColor.g=v_depth;gl_FragColor.b=1.0;`;
const vert$5 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;attribute float a_instanceId;attribute vec3 a_instancePos;attribute vec3 a_instanceRands;uniform float u_introTime;uniform float u_sceneRatio;uniform float u_hudRatio;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 localPos=position;localPos.xy=rotate(localPos.xy,a_instanceRands.y*6.28+sign(-a_instancePos.x)*u_introTime*mix(0.03,0.15,a_instanceRands.z));vec3 pos=(9.0+2.0*a_instanceRands.x)*localPos;vec3 noise=simplexNoiseDerivatives(vec4((a_instancePos+pos)*0.5,u_introTime*0.075)).yzw;float cycle=fract((0.08+0.08*a_instanceRands.x)*u_introTime+a_instanceRands.z);vec3 instancePos=a_instancePos+vec3(cycle*(a_instancePos.x*0.75+sign(a_instancePos.x)*0.25),0.0,0.0)+noise*vec3(0.35,0.2,0.1);instancePos.y-=linearStep(4.,1.,abs(instancePos.x))*1.+0.5;pos+=instancePos;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_uv=uv;v_instanceId=a_instanceId;float d=(modelViewMatrix*vec4(instancePos,1.0)).z;v_opacity=smoothstep(1.,3.,-d)*u_sceneRatio*(1.-u_hudRatio)*linearStep(0.,0.25,cycle)*linearStep(1.,0.75,cycle)*mix(1.,0.75,a_instanceRands.x);if(v_opacity<0.004){gl_Position.z=2.*gl_Position.w;}
#include <aboutHeroVisualFinal_vert>
}`;
const frag$8 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;uniform sampler2D u_currSceneTexture;uniform sampler2D u_fogTexture;uniform vec2 u_resolution;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;uniform float u_time;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
#include <getBlueNoise>
#include <getScatter>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec2 fogMap=texture2D(u_fogTexture,v_uv).rg;vec4 currScene=texture2D(u_currSceneTexture,screenPaintUv);float depth=v_depth-fogMap.y*0.02;float depthMask=fogMap.x*1.35-fogMap.y*0.15;gl_FragColor.r=depthMask*v_opacity;gl_FragColor.gb=currScene.gb;gl_FragColor.a=exp(-length(v_worldPosition+vec3(0.,0.,-max(0.,fogMap.y-0.25)*10.+5.)-vec3(0.,0.,0.))*(0.22-fogMap.x*0.2))*fogMap.y*linearStep(0.0,0.035,depth-currScene.g)*v_opacity*0.45;}`;
class AboutHeroFog {
  container = new Object3D();
  geometry = null;
  material = null;
  mesh = null;
  texture = null;
  cacheRT = null;
  INSTANCES_COUNT = 32;
  preInit() {
    this.texture = properties.loader.add(settings.TEXTURE_PATH + "about/fog.png", {
      type: "texture"
    }).content;
  }
  init() {
    let e = math.getSeedRandomFn("fog96");
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    const t = new PlaneGeometry(1, 1, 3, 3);
    this.geometry = new InstancedBufferGeometry();
    for (let l in t.attributes) {
      this.geometry.setAttribute(l, t.attributes[l]);
    }
    this.geometry.setIndex(t.index);
    const r = new Float32Array(this.INSTANCES_COUNT);
    const n = new Float32Array(this.INSTANCES_COUNT * 3);
    const a = new Float32Array(this.INSTANCES_COUNT * 3);
    for (let l = 0, c = 0; l < this.INSTANCES_COUNT; l++) {
      r[l] = l;
      n[c] = (e() * 2 - 1) * 12;
      n[c + 1] = -0.25 + e() * 0.5;
      n[c + 2] = (1 - l / (this.INSTANCES_COUNT - 1) * 2) * 12;
      a[c] = e() * 2 - 1;
      a[c + 1] = e() * 2 - 1;
      a[c + 2] = e() * 2 - 1;
      c += 3;
    }
    this.geometry.setAttribute("a_instanceId", new InstancedBufferAttribute(r, 1));
    this.geometry.setAttribute("a_instancePos", new InstancedBufferAttribute(n, 3));
    this.geometry.setAttribute("a_instanceRands", new InstancedBufferAttribute(a, 3));
    this.material = new ShaderMaterial({
      uniforms: Object.assign({
        u_fogTexture: {
          value: this.texture
        },
        u_currSceneTexture: {
          value: this.cacheRT.texture
        },
        u_lightPosition: light.sharedUniforms.u_lightPosition,
        u_resolution: properties.sharedUniforms.u_resolution
      }, blueNoise.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$5,
      fragmentShader: frag$8,
      side: DoubleSide,
      depthWrite: false,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: SrcAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: ZeroFactor,
      blendDstAlpha: OneFactor
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.renderOrder = 20;
    this.mesh.frustumCulled = false;
    this.mesh.onBeforeRender = this.onBeforeRender.bind(this);
    this.container.add(this.mesh);
  }
  onBeforeRender() {
    let e = fboHelper.renderer;
    let t = e.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState();
    fboHelper.copy(t.texture, this.cacheRT);
    e.setRenderTarget(t);
  }
  resize(e, t) {
    this.cacheRT.setSize(e, t);
  }
  update(e) {}
}
const aboutHeroFog = new AboutHeroFog();
const vert$4 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_lightPosition;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;gl_Position.z=1.*(gl_Position.w);}`;
const frag$7 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform vec2 u_resolution;uniform sampler2D u_currSceneTexture;uniform float u_sceneRatio;uniform float u_hudRatio;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(57.,27.));gl_FragColor.r=getScatter(cameraPosition,v_worldPosition);gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);gl_FragColor.g=1.;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=0.;gl_FragColor.r+=noise.r*0.004;}`;
class AboutHeroHalo {
  container = new Object3D();
  mesh = null;
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/bg_box.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_resolution: properties.sharedUniforms.u_resolution
      }, light.sharedUniforms, blueNoise.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$4,
      fragmentShader: frag$7
    }));
    this.mesh.renderOrder = 10;
    this.container.add(this.mesh);
  }
  init() {}
  resize(e, t) {}
  update(e) {}
}
const aboutHeroHalo = new AboutHeroHalo();
const vert$3 = `#define GLSLIFY 1
uniform sampler2D u_positionTexture;uniform sampler2D u_norShadeTexture;uniform float u_activeRatio;uniform float u_showRatio;uniform vec3 u_mouse;uniform vec2 u_resolution;uniform float u_time;uniform float u_isForward;uniform float u_glitchOffset;uniform float u_glitchStrength;uniform float u_glitchThreshold;attribute vec2 a_simUv;attribute vec4 a_rands1;attribute vec4 a_rands2;varying float v_shade;varying float v_showRatio;varying float v_blurriness;varying vec2 v_toCenter;varying vec2 v_uv;varying vec3 v_color;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){vec3 basePos=texture2D(u_positionTexture,a_simUv).xyz;vec3 pos=basePos;float yRatio=basePos.y*0.5+0.5;float showRatio=smoothstep(a_rands1.x*0.2+yRatio*0.4,0.4+a_rands1.y*0.2+yRatio*0.4,u_showRatio);pos*=1.3;pos+=(simplexNoiseDerivatives(vec4(basePos*8.,u_time)).yzw*0.2+vec3(1.*yRatio,0.0,-1.))*(1.-showRatio);v_showRatio=showRatio;vec4 norShade=texture2D(u_norShadeTexture,a_simUv);float depth=clamp(1.-pos.z,0.0,1.0);vec3 nor=norShade.xyz*2.-1.;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;vec3 viewNormal=normalMatrix*normalize(nor);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 lightDir=normalize(u_mouse-worldPosition);float distToLight=distance(u_mouse,worldPosition);float light=norShade.w*1.25;float diff=linearStep(0.35,1.0,dot(worldNormal,lightDir))/sqrt(distToLight*0.1);light*=diff+0.6;light+=(0.05+diff*0.15)*smoothstep(0.0,0.005,norShade.w);float frontFaceMultiplier=linearStep(-0.2,0.0,viewNormal.z);light*=frontFaceMultiplier;v_blurriness=min(1.0,(abs(depth-(1.-u_activeRatio*showRatio)*0.5))*2.5)*(2.-showRatio);float basePointSize=0.009*(1.+pow(v_blurriness,1.5)*8.)*frontFaceMultiplier;float pointSize=max(basePointSize,12./u_resolution.y);float subpixelMultiplier=pow(basePointSize/pointSize,1.5);pos.xy+=position.xy*pointSize*step(0.003,light)*linearStep(0.0,0.75,u_activeRatio);vec4 verticalRands=hash42(vec2(floor(basePos.y*3.+cos(basePos.y*3.+u_glitchOffset)*2.+u_glitchOffset),0.))*u_glitchStrength;float glitchWeight=verticalRands.x*step(u_glitchThreshold,verticalRands.y);pos.x+=(verticalRands.z*verticalRands.z)*glitchWeight*0.35*cos(basePos.y+u_glitchOffset);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_color=mix(vec3(1.0),(viewNormal.xzy*0.5+0.5)*vec3(1.0,0.5,2.0),glitchWeight);light*=(1.+glitchWeight*1.5);light+=0.1*glitchWeight;float scanline=smoothstep(0.04,0.,abs(fract(u_time*-0.3-basePos.y*.5+.5)));light+=scanline*(0.25*norShade.w*(1.0-light)+smoothstep(0.03,0.,abs(viewNormal.z)));v_shade=min(1.0,light*(1.-v_blurriness*0.5))*subpixelMultiplier*showRatio;v_toCenter=(uv-.5)*2.;v_uv=uv;}`;
const frag$6 = `#define GLSLIFY 1
varying float v_shade;varying float v_showRatio;varying vec2 v_toCenter;varying float v_blurriness;varying vec2 v_uv;varying vec3 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 linearStep(vec3 edge0,vec3 edge1,vec3 x){return clamp((x-edge0)/(edge1-edge0),vec3(0.),vec3(1.));}void main(){float shade=v_shade;float d=length(v_toCenter);float range=v_blurriness*5.;float brightness=linearStep(1.,1.-range-fwidth(d),d);shade*=brightness*(1.25-v_blurriness*v_shade);gl_FragColor=vec4(shade)*v_showRatio*v_showRatio;gl_FragColor.a*=pow(1.-v_blurriness,3.)*0.8*linearStep(0.8,1.0,v_showRatio*v_showRatio);}`;
const PARTICLE_COUNT = 8192;
const SIM_TEXTURE_WIDTH = 128;
const SIM_TEXTURE_HEIGHT = 64;
const MAX_FACE_NUM = 2;
let _v1$1 = new Vector3();
new Vector3();
let _m = new Matrix4();
class AboutHeroFaces {
  container = new Object3D();
  faceContainer = new Object3D();
  isActive = false;
  hasStartedLoads = {};
  teamPosDataTextures = {};
  teamNShadeDataTextures = {};
  sharedUniforms = {
    u_mouse: {
      value: new Vector3()
    },
    u_glitchOffset: {
      value: 0
    },
    u_glitchStrength: {
      value: 0
    },
    u_showRatio: {
      value: 0
    }
  };
  currId = "";
  nextId = "";
  transitionRatio = 0;
  showRatio = 0;
  activeRatio = 1;
  hideRatio = 0;
  meshArray = [];
  preInit() {}
  load(e) {
    if (!this.hasStartedLoads[e]) {
      this.hasStartedLoads[e] = true;
      properties.loader[properties.hasInitialized ? "load" : "add"](settings.TEAM_PATH + e + ".buf", {
        onLoad: t => {
          this._onModelLoaded(e, t);
        }
      });
    }
  }
  _onModelLoaded(e, t) {
    if (!t || !t.attributes || !t.attributes.position || !t.attributes.nShade) {
      return;
    }
    let r = t.attributes.position.array;
    let n = new Float32Array(PARTICLE_COUNT * 4);
    for (let a = 0, l = 0, c = 0; a < PARTICLE_COUNT; a++, l += 3, c += 4) {
      n[c] = r[l];
      n[c + 1] = r[l + 1];
      n[c + 2] = r[l + 2];
      n[c + 3] = 1 / PARTICLE_COUNT;
    }
    this.teamPosDataTextures[e] = fboHelper.createDataTexture(n, SIM_TEXTURE_WIDTH, SIM_TEXTURE_HEIGHT, true, true);
    this.teamNShadeDataTextures[e] = fboHelper.createDataTexture(t.attributes.nShade.array, SIM_TEXTURE_WIDTH, SIM_TEXTURE_HEIGHT, false, true);
  }
  init() {
    this.container.add(this.faceContainer);
    this.container.scale.set(27.5, 27.5, 16);
    this.container.rotation.y = Math.PI + 0.2;
    this.container.rotation.x = 0.1;
    this.container.position.y = 34;
    this.container.position.z = 25;
    this.container.updateMatrixWorld(true);
    let e = new PlaneGeometry(1, 1);
    let t = new InstancedBufferGeometry();
    for (let l in e.attributes) {
      t.attributes[l] = e.attributes[l];
    }
    t.index = e.index;
    let r = new Float32Array(PARTICLE_COUNT * 2);
    let n = new Float32Array(PARTICLE_COUNT * 4);
    let a = new Float32Array(PARTICLE_COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < PARTICLE_COUNT; l++, c += 2, u += 4) {
      r[c] = (l % SIM_TEXTURE_WIDTH + 0.5) / SIM_TEXTURE_WIDTH;
      r[c + 1] = (~~(l / SIM_TEXTURE_WIDTH) + 0.5) / SIM_TEXTURE_HEIGHT;
      n[u] = Math.random();
      n[u + 1] = Math.random();
      n[u + 2] = Math.random();
      n[u + 3] = Math.random();
      a[u] = Math.random();
      a[u + 1] = Math.random();
      a[u + 2] = Math.random();
      a[u + 3] = Math.random();
    }
    t.setAttribute("a_simUv", new InstancedBufferAttribute(r, 2));
    t.setAttribute("a_rands1", new InstancedBufferAttribute(n, 4));
    t.setAttribute("a_rands2", new InstancedBufferAttribute(a, 4));
    for (let l = 0; l < MAX_FACE_NUM; l++) {
      const c = new ShaderMaterial({
        uniforms: {
          u_time: properties.sharedUniforms.u_time,
          u_resolution: properties.sharedUniforms.u_resolution,
          u_mouse: this.sharedUniforms.u_mouse,
          u_glitchOffset: this.sharedUniforms.u_glitchOffset,
          u_glitchStrength: this.sharedUniforms.u_glitchStrength,
          u_glitchThreshold: {
            value: 0
          },
          u_activeRatio: {
            value: 0
          },
          u_showRatio: this.sharedUniforms.u_showRatio,
          u_positionTexture: {
            value: null
          },
          u_norShadeTexture: {
            value: null
          }
        },
        vertexShader: vert$3,
        fragmentShader: frag$6,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor
      });
      c.extensions.derivatives = true;
      const u = new Mesh(t, c);
      u.frustumCulled = false;
      u.visible = false;
      this.meshArray.push(u);
      this.faceContainer.add(u);
    }
  }
  resize(e, t) {}
  update(e) {
    if (this.meshArray.length > 0) {
      let t = this.transitionRatio;
      this.sharedUniforms.u_showRatio.value = this.showRatio;
      let r = input.easedMouseDynamics.default.value;
      _v1$1.set(r.x, r.y, 0.5).unproject(cameraControls._camera).sub(cameraControls._camera.position).normalize();
      _v1$1.multiplyScalar(75 / _v1$1.z).add(cameraControls._camera.position);
      _m.copy(this.faceContainer.matrixWorld).invert();
      _v1$1.applyMatrix4(_m);
      let n = math.clamp(_v1$1.y * 0.03, -0.05, 0.05);
      let a = math.clamp(_v1$1.x * 0.03, -0.05, 0.05);
      _v1$1.applyMatrix4(this.faceContainer.matrixWorld);
      this.sharedUniforms.u_mouse.value.copy(_v1$1);
      let l = this.meshArray[0];
      l.material.uniforms.u_positionTexture.value = this.teamPosDataTextures[this.currId];
      l.material.uniforms.u_norShadeTexture.value = this.teamNShadeDataTextures[this.currId];
      l.material.uniforms.u_activeRatio.value = 1 - t;
      l.material.uniforms.u_glitchThreshold.value = math.fit(l.material.uniforms.u_activeRatio.value, 0.4, 1, 0, 0.9);
      l.material.uniforms.u_activeRatio.value *= this.activeRatio;
      l.position.x = t * -1.5;
      l.position.z = -t * 2 - (1 - this.activeRatio) * 2;
      l.rotation.y = t * -0.3 + a;
      l.rotation.x = t * 0.4 + n;
      l.visible = true;
      let c = this.meshArray[1];
      c.material.uniforms.u_positionTexture.value = this.teamPosDataTextures[this.nextId];
      c.material.uniforms.u_norShadeTexture.value = this.teamNShadeDataTextures[this.nextId];
      c.material.uniforms.u_activeRatio.value = t;
      c.material.uniforms.u_glitchThreshold.value = math.fit(c.material.uniforms.u_activeRatio.value, 0.4, 1, 0, 0.9);
      c.material.uniforms.u_activeRatio.value *= this.activeRatio;
      c.position.x = (t - 1) * -1.5;
      c.position.z = (t - 1) * 2 - (1 - this.activeRatio) * 2;
      c.rotation.y = (t - 1) * -0.3 + a;
      c.rotation.x = (t - 1) * -0.4 + n;
      c.visible = true;
      this.sharedUniforms.u_glitchOffset.value = Math.random() * 1000;
      this.sharedUniforms.u_glitchStrength.value = Math.random();
      this.container.visible = this.isActive;
    }
  }
}
const aboutHeroFaces = new AboutHeroFaces();
const fragmentShader$1 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_colorBurn;uniform float u_colorBurnAlpha;uniform vec3 u_colorDodge;uniform float u_colorDodgeAlpha;varying vec2 v_uv;vec3 colorDodge(in vec3 src,in vec3 dst){return mix(step(0.,src)*(min(vec3(1.),dst/(1.-src))),vec3(1.),step(1.,dst));}vec3 colorBurn(in vec3 src,in vec3 dst){return mix(step(0.,src)*(1.-min(vec3(1.),(1.-dst)/src)),vec3(1.),step(1.,dst));}void main(){vec4 texture=texture2D(u_texture,v_uv);vec3 colorBurn=mix(texture.rgb,colorBurn(u_colorBurn,texture.rgb),u_colorBurnAlpha);vec3 colorDodge=mix(texture.rgb,colorDodge(u_colorDodge,texture.rgb),u_colorDodgeAlpha);texture.rgb=mix(colorBurn,colorDodge,texture.rgb);gl_FragColor=texture;}`;
let _sceneColorBurn = new Color("#00f0ff");
let _sceneColorDodge = new Color("#005aff");
let _sceneColorBurnAlpha = 0.15;
let _sceneColorDodgeAlpha = 0.12;
let _hudColorBurn = new Color("#79a8ff");
let _hudColorDodge = new Color("#a5ff44");
let _hudColorBurnAlpha = 1;
let _hudColorDodgeAlpha = 0.7;
class AboutPageHeroEfx extends PostEffect {
  colorBurn = new Color("#000");
  colorDodge = new Color("#000");
  hudRatio = 1;
  isActive = true;
  renderOrder = 20;
  randSimplex1Ds = [];
  init(e) {
    Object.assign(this, e);
    super.init();
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_colorBurn: {
          value: this.colorBurn
        },
        u_colorBurnAlpha: {
          value: 1
        },
        u_colorDodge: {
          value: this.colorDodge
        },
        u_colorDodgeAlpha: {
          value: 1
        }
      },
      fragmentShader: fragmentShader$1
    });
  }
  needsRender() {
    return this.isActive;
  }
  render(e, t = false) {
    let r = this.material.uniforms;
    this.colorBurn.copy(_sceneColorBurn).lerp(_hudColorBurn, this.hudRatio);
    this.colorDodge.copy(_sceneColorDodge).lerp(_hudColorDodge, this.hudRatio);
    r.u_colorBurnAlpha.value = math.mix(_sceneColorBurnAlpha, _hudColorBurnAlpha, this.hudRatio * this.hudRatio);
    r.u_colorDodgeAlpha.value = math.mix(_sceneColorDodgeAlpha, _hudColorDodgeAlpha, this.hudRatio * this.hudRatio);
    super.render(e, t);
  }
}
const aboutPageHeroEfx = new AboutPageHeroEfx();
const vert$2 = `#define GLSLIFY 1
attribute vec3 instancePos;attribute vec4 instanceRands;attribute float instanceDensity;uniform float u_time;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_charUv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;void main(){float charCount=mix(50.,100.,instanceRands.y);vec3 pos=position;v_uv=uv;pos.xy*=vec2(1.,6./5.*charCount);v_charUv=vec2(1.-position.x,position.y*charCount)+vec2(.5,0.);v_charUv.y-=u_time*mix(2.,10.,instanceRands.x);pos=pos*0.75+instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_instanceRands=instanceRands;v_opacity=mix(.5,1.,instanceDensity)*u_showRatio;}`;
const frag$5 = `#define GLSLIFY 1
uniform sampler2D u_letterTexture;uniform float u_time;varying vec2 v_charUv;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){float fade=1.-linearStep(15.,66.,v_worldPosition.z);float MAX_CHAR=42.;float charIdx=floor(mod(v_charUv.y,MAX_CHAR));float charTime=u_time*mix(1.,2.,v_instanceRands.y+hash43(vec3(charIdx,-100.,v_instanceRands.z)).x);vec4 charRands=hash43(vec3(charIdx,v_instanceRands.w,floor(charTime*-2.)));charIdx=mod(charIdx+floor(charRands.x*MAX_CHAR),MAX_CHAR);vec2 charUv=vec2((v_charUv.x+charIdx)/MAX_CHAR,mod(v_charUv.y,1.));float shade=texture2D(u_letterTexture,charUv).r;gl_FragColor=vec4(shade)*charRands.w*charRands.y*v_opacity;gl_FragColor*=smoothstep(0.5,0.35,abs(v_uv.y-.5))*(0.5+fade*0.5)*(0.3+v_instanceRands.z*1.25)*smoothstep(100.,150.,mod(v_charUv.y-200.*v_instanceRands.y,200.));gl_FragColor.a*=3.;}`;
class AboutHeroLetters {
  container = new Object3D();
  rt;
  blurRt;
  sharedUniforms = {};
  mesh;
  meshList = [];
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/letter_placements.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    if (!e || !e.attributes || !e.attributes.position) {
      return;
    }
    let t = new PlaneGeometry(1, 1).translate(0, 0.5, 0).rotateY(Math.PI);
    let r = e.attributes.position.count;
    let n = Math.floor(r / 4);
    let a = new ShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time,
        u_showRatio: aboutHeroFaces.sharedUniforms.u_showRatio
      }, aboutHero.sharedUniforms),
      depthTest: false,
      depthWrite: false,
      vertexShader: vert$2,
      fragmentShader: frag$5,
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    for (let l = 0; l < 4; l++) {
      let c = new InstancedBufferGeometry();
      for (let p in t.attributes) {
        c.setAttribute(p, t.attributes[p]);
      }
      c.setIndex(t.index);
      let u = new Float32Array(r * 4);
      for (let p = 0; p < n; p++) {
        u[p * 4 + 0] = Math.random();
        u[p * 4 + 1] = Math.random();
        u[p * 4 + 2] = Math.random();
        u[p * 4 + 3] = Math.random();
      }
      c.setAttribute("instanceRands", new InstancedBufferAttribute(u, 4));
      let f = n * l;
      c.setAttribute("instancePos", new InstancedBufferAttribute(e.attributes.position.array.slice(f * 3, (f + n) * 3), 3));
      c.setAttribute("instanceDensity", new InstancedBufferAttribute(e.attributes.density.array.slice(f, f + n), 1));
      this.meshList[l] = new Mesh(c, a);
    }
    this.rt = fboHelper.createRenderTarget(1, 1);
    this.blurRt = fboHelper.createRenderTarget(1, 1);
    this.mesh = new Mesh(new PlaneGeometry(2, 2), fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: this.rt.texture
        }
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 10;
    this.container.add(this.mesh);
    this.mesh.onBeforeRender = this._onBeforeRender.bind(this);
  }
  init() {}
  _onBeforeRender() {
    if (properties.width != this.rt.width || properties.height != this.rt.height) {
      this.rt.setSize(properties.width, properties.height);
    }
    let e = properties.renderer;
    let t = e.getRenderTarget();
    let r = fboHelper.getColorState();
    e.setClearColor(0, 0);
    e.setRenderTarget(this.rt);
    e.clear();
    e.autoClear = false;
    fboHelper.renderMesh(this.meshList[0], this.rt, properties.camera);
    blur.blur(16, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[1], this.rt, properties.camera);
    blur.blur(8, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[2], this.rt, properties.camera);
    blur.blur(4, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[3], this.rt, properties.camera);
    e.setRenderTarget(t);
    fboHelper.setColorState(r);
  }
  update(e) {}
}
const aboutHeroLetters = new AboutHeroLetters();
const _v = new Vector3();
const _q0 = new Quaternion();
const _q1 = new Quaternion();
class AboutHero extends Stage3D {
  container = new Object3D();
  sceneContainer = new Object3D();
  hudContainer = new Object3D();
  cameraSplineGeo = null;
  cameraSplinePositions = null;
  cameraSplineOrientation = null;
  sceneRatio = 0;
  sceneHideRatio = 0;
  initialSplineRatio = 0;
  hudRatio = 0;
  introRatio = 0;
  outSectionRatio = 0;
  freezeRatio = 1;
  introTime = 0;
  scrollYRatio = 0;
  panningSplineRaito = 0;
  sharedUniforms = {
    u_sceneRatio: {
      value: 0
    },
    u_sceneHideRatio: {
      value: 0
    },
    u_hudRatio: {
      value: 0
    },
    u_introRatio: {
      value: 0
    },
    u_introTime: {
      value: 0
    },
    u_introDeltaTime: {
      value: 0
    },
    u_letterTexture: {
      value: null
    }
  };
  constructor() {
    super({
      properties: {
        defaultCameraPosition: new Vector3(0, 5, 5),
        defaultLookAtPosition: new Vector3(0, 5, 0),
        cameraDollyZoomFovOffset: 0,
        cameraFov: 60,
        bloomAmount: 4,
        bloomRadius: 0.25,
        bloomThreshold: 0.8,
        bloomSmoothWidth: 0.3,
        haloStrength: 0,
        clearAlpha: 0,
        cameraLookStrength: 0.1,
        screenPaintOffsetRatio: 0,
        screenPaintDistortionRGBShift: 0.1
      }
    });
  }
  preInit() {
    aboutPageHeroEfxPrepass.init();
    properties.postprocessing.queue.push(aboutPageHeroEfxPrepass);
    aboutPageHeroEfx.init();
    properties.postprocessing.queue.push(aboutPageHeroEfx);
    this.sharedUniforms.u_letterTexture.value = properties.loader.add(settings.TEXTURE_PATH + "font.png", {
      minFilter: LinearFilter,
      type: "texture"
    }).content;
    shaderHelper.addChunk("aboutHeroVisualFinal_vert", aboutHeroVisualFinalVert);
    shaderHelper.addChunk("aboutHeroVisualFinal_frag", aboutHeroVisualFinalFrag);
    properties.loader.add(settings.MODEL_PATH + "about/camera_spline.buf", {
      onLoad: e => this.cameraSplineGeo = e
    });
    light.preInit();
    sim.preInit();
    lightField.preInit();
    aboutHeroParticles.preInit();
    aboutHeroRocks.preInit();
    aboutHeroGround.preInit();
    aboutHeroLines.preInit();
    aboutHeroPerson$1.preInit();
    aboutHeroFog.preInit();
    aboutHeroHalo.preInit();
    aboutHeroFaces.preInit();
    aboutHeroLetters.preInit();
  }
  init() {
    light.init();
    sim.init();
    lightField.init();
    aboutHeroParticles.init();
    aboutHeroRocks.init();
    aboutHeroGround.init();
    aboutHeroLines.init();
    aboutHeroPerson$1.init();
    aboutHeroFog.init();
    aboutHeroScatter.init();
    aboutHeroHalo.init();
    aboutHeroFaces.init();
    aboutHeroLetters.init();
    this.add(aboutHeroParticles.container);
    this.sceneContainer.add(aboutHeroRocks.container);
    this.sceneContainer.add(aboutHeroPerson$1.container);
    this.sceneContainer.add(aboutHeroFog.container);
    this.add(this.sceneContainer);
    this.add(aboutHeroGround.container);
    this.add(aboutHeroHalo.container);
    this.hudContainer.add(aboutHeroLines.container);
    this.add(this.hudContainer);
    aboutPageHeroEfxPrepass.scene.add(aboutHeroFaces.container);
    aboutPageHeroEfxPrepass.scene.add(aboutHeroLetters.container);
    this.cameraSplinePositions = this.cameraSplineGeo.attributes.position;
    this.cameraSplineOrientation = this.cameraSplineGeo.attributes.orient;
    taskManager.add(this);
    taskManager.add(aboutPageHeroEfxPrepass.scene);
  }
  resize(e, t) {
    aboutHeroFog.resize(e, t);
    aboutHeroHalo.resize(e, t);
    aboutHeroFaces.resize(e, t);
  }
  syncProperties(e) {
    this.sharedUniforms.u_introRatio.value = this.introRatio;
    const t = math.saturate(this.initialSplineRatio) * 149 + math.saturate(this.panningSplineRaito) * 50;
    const r = Math.floor(t);
    const n = Math.min(this.cameraSplinePositions.count - 1, Math.ceil(t));
    const a = t - r;
    this.sceneRatio = this.sharedUniforms.u_sceneRatio.value = math.fit(this.introRatio, 0.01, 0.1, 0, 1, ease.cubicOut);
    this.sceneHideRatio = this.sharedUniforms.u_sceneHideRatio.value = math.fit(this.introRatio, 0.85, 1, 0, 1);
    this.sharedUniforms.u_hudRatio.value = this.hudRatio;
    this.properties.bloomAmount = 3;
    this.properties.bloomAmount = math.fit(this.introRatio, 0.1, 0.85, this.properties.bloomAmount, 1.5, ease.sineOut);
    this.properties.bloomAmount = math.fit(this.introRatio, 0.85, 1, this.properties.bloomAmount, 10);
    this.properties.bloomAmount = math.fit(this.hudRatio, 0, 0.5, this.properties.bloomAmount, 12.5);
    this.properties.haloStrength = 0.08;
    this.properties.haloStrength = math.fit(this.introRatio, 0.1, 0.4, this.properties.haloStrength, 0.15);
    this.properties.haloStrength = math.fit(this.hudRatio, 0, 0.5, this.properties.haloStrength, 0);
    this.properties.screenPaintDistortionRGBShift = math.mix(0, properties.defaults.screenPaintDistortionRGBShift, this.outSectionRatio);
    this.properties.cameraLookStrength = math.fit(this.initialSplineRatio, 0, 1, 0.1, 0.035);
    _v.fromArray(this.cameraSplinePositions.array, n * 3);
    this.properties.defaultCameraPosition.fromArray(this.cameraSplinePositions.array, r * 3);
    this.properties.defaultCameraPosition.lerp(_v, a);
    _q0.fromArray(this.cameraSplineOrientation.array, r * 4);
    _q1.fromArray(this.cameraSplineOrientation.array, n * 4);
    _q0.slerp(_q1, a);
    _v.set(0, 0, 1).applyQuaternion(_q0).add(this.properties.defaultCameraPosition);
    this.properties.defaultLookAtPosition.copy(_v);
    this.properties.cameraDollyZoomFovOffset = math.fit(this.initialSplineRatio, 0.4, 0.8, 0, -10, ease.sineInOut);
    this.properties.defaultCameraPosition.y += math.fit(this.scrollYRatio, 0, 1, 0, -10, ease.sineOut);
    this.properties.defaultLookAtPosition.y += math.fit(this.scrollYRatio, 0, 1, 0, -10.1, ease.sineOut);
    this.freezeRatio += ((input.isDown ? 1 - this.hudRatio : 0) - this.freezeRatio) * 0.1;
  }
  update(e) {
    let t = e * math.mix(1, 0.1, this.freezeRatio);
    this.introTime += t;
    this.sharedUniforms.u_introTime.value = this.introTime;
    this.sharedUniforms.u_introDeltaTime.value = t;
    aboutHeroScatter.update();
    if (this.hudRatio < 1) {
      sim.update(e);
      lightField.update(t);
      aboutHeroParticles.update(t);
      aboutHeroParticles.container.visible = true;
    } else {
      aboutHeroParticles.container.visible = false;
    }
    if (this.sceneRatio > 0 && this.hudRatio < 1) {
      light.update(t);
      aboutHeroRocks.update(t);
      aboutHeroPerson$1.update(t);
      aboutHeroFog.update(t);
      aboutHeroHalo.update(t);
      this.sceneContainer.visible = true;
    } else {
      this.sceneContainer.visible = false;
    }
    if (this.sceneRatio > 0) {
      aboutHeroGround.update(t);
    }
    if (this.hudRatio > 0) {
      aboutHeroLines.update(e);
      this.hudContainer.visible = true;
    } else {
      this.hudContainer.visible = false;
    }
    aboutHeroFaces.update(e);
    aboutHeroLetters.update(e);
    aboutPageHeroEfxPrepass.blurRatio = this.hudRatio;
    aboutPageHeroEfxPrepass.needsRenderScene = aboutHeroFaces.isActive;
    aboutPageHeroEfx.hudRatio = aboutHeroFaces.showRatio;
    if (this.hudRatio < 1) {
      lightField.postUpdate(e);
    }
    if (this.sceneRatio > 0 && this.hudRatio < 1) {
      light.postUpdate(e);
    }
  }
}
const aboutHero = new AboutHero();
const vert$1 = `#define GLSLIFY 1
attribute float char;uniform float u_time;uniform float u_showRatio;uniform float u_hideRatio;uniform float u_aspect;uniform vec2 u_toDomXY;uniform vec2 u_toDomWH;uniform vec2 u_toDomPivot;varying float v_dist;
#include <ufxVert>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float cubicInOut(float t){return t<0.5? 4.0*t*t*t: 0.5*pow(2.0*t-2.0,3.0)+1.0;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){vec3 pos=vec3(position.xy,0.);vec3 aspectCorrectedPos=pos*vec3(1.,u_aspect,1.);v_dist=position.z;vec3 basePos=getBasePosition(aspectCorrectedPos);basePos.y=1.-basePos.y;vec3 screenPos=getScreenPosition(basePos);float vertexShowRatio=easeOutBack(linearStep(0.,1.,u_showRatio*2.2-aspectCorrectedPos.x-(aspectCorrectedPos.y)*0.2));screenPos.y-=(1.0-vertexShowRatio)*(u_domWH.y+min(u_domWH.y*1.1,100.));pos.x-=char/5.*0.08;vec3 aspectCorrectedToPos=pos*vec3(1.,u_aspect,1.);vec3 toBasePos=vec3((aspectCorrectedToPos.xy)*u_toDomWH-u_toDomPivot,aspectCorrectedToPos.z);toBasePos.y=1.-toBasePos.y;vec3 toScreenPos=toBasePos+vec3(u_toDomPivot.xy,0.);toScreenPos=(toScreenPos+vec3(u_toDomXY.xy,0.))*vec3(1.,-1.,1.);float vertexHideRatio=cubicInOut(linearStep(0.,1.,u_hideRatio*2.2-aspectCorrectedPos.x-pow(aspectCorrectedPos.y,1.+u_hideRatio)*0.2));screenPos=mix(screenPos,toScreenPos,vertexHideRatio);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);}`;
const frag$4 = `#define GLSLIFY 1
varying float v_dist;void main(){float alpha=smoothstep(0.,0.+fwidth(v_dist),v_dist);gl_FragColor=vec4(1.,1.,1.,alpha);}`;
let _needsSync = false;
class AboutWhoLogo {
  container = new Object3D();
  fromDom;
  toDom;
  mesh;
  toMesh;
  containerWidth = 0;
  hideRatio = 0;
  preInit(e) {
    this.fromDom = e.querySelector("#about-who-title-main-logo");
    this.toDom = e.querySelector("#about-who-title-left-2");
    aboutPage.postUfxContainer.add(this.container);
    this.toMesh = new UfxMesh({
      refDom: this.toDom
    });
    properties.loader.add(settings.MODEL_PATH + "about/logo_text.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    let t = this.toMesh.material.uniforms;
    this.mesh = new UfxMesh({
      refDom: this.fromDom,
      geometry: e,
      uniforms: {
        u_showRatio: {
          value: 1
        },
        u_hideRatio: {
          value: 0
        },
        u_aspect: {
          value: 1 / 0.200957
        },
        u_toDomXY: t.u_domXY,
        u_toDomWH: t.u_domWH,
        u_toDomPivot: t.u_domPivot,
        u_time: properties.sharedUniforms.u_time
      },
      vertexShader: vert$1,
      fragmentShader: frag$4
    });
    this.container.add(this.mesh);
  }
  init() {}
  resize(e, t) {
    _needsSync = true;
  }
  update(e, t, r, n, a) {
    if (this.mesh) {
      if (_needsSync) {
        _needsSync = false;
        this.mesh.syncDom(r, t - n);
        this.toMesh.syncDom(r, t - a);
      }
      this.mesh.material.uniforms.u_showRatio.value = math.fit(aboutPage.time, 0.5, 1.5, 0, 1);
      if (properties.useMobileLayout) {
        this.mesh.material.uniforms.u_showRatio.value *= 1 - this.hideRatio;
        this.mesh.material.uniforms.u_hideRatio.value = 0;
      } else {
        this.mesh.material.uniforms.u_hideRatio.value = this.hideRatio;
      }
      this.mesh.update(r, t);
      this.toMesh.update(r, t);
    }
  }
}
const aboutWhoLogo = new AboutWhoLogo();
class WhoSubsectionWeAre {
  domContainer;
  domScroll;
  domLeftTexts;
  logoHideRatio = 0;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-we-are");
    this.domScroll = e.querySelector("#about-who-title-main-scroll");
    this.domLeftTexts = e.querySelectorAll("#about-who-title-left-1, #about-who-title-left-2 svg, #about-who-title-left-3, #about-who-title-left-4 span");
    this.domRightTexts = e.querySelectorAll(".about-who-title-right-text");
    aboutWhoLogo.preInit(e);
  }
  init() {
    aboutWhoLogo.init();
  }
  show() {}
  hide() {}
  resize(e, t) {
    this.offsetUnitSize = Math.max(60, properties.viewportWidth * 0.08);
    aboutWhoLogo.resize(e, t);
  }
  update(e, t, r, n, a) {
    this.domContainer.style.visibility = t ? "visible" : "hidden";
    this.domContainer.style.opacity = t ? 1 : 0;
    aboutWhoLogo.container.visible = t;
    if (t) {
      let l = properties.useMobileLayout ? properties.viewportWidth * -r : 0;
      this.domContainer.style.transform = "translate3d(" + l + "px, 0, 0)";
      let c = aboutHero.introRatio < 0.05;
      this.logoHideRatio = math.saturate(this.logoHideRatio + e * (c ? -1 : 1));
      let u = this.offsetUnitSize;
      aboutWhoLogo._pageScrollOffsetXRatio = 0;
      for (let p = 0; p < this.domLeftTexts.length; p++) {
        let g = this.domLeftTexts[p];
        let _ = (!properties.useMobileLayout && p == 5 ? 4 : p) / (this.domLeftTexts.length - 1);
        let T = math.fit(this.logoHideRatio, _ * 0.2, _ * 0.2 + 0.8, 0, 1);
        let M = math.fit(r, 0, _ * 0.5 + 0.3, 0, -10, ease.cubicOut);
        g._pageScrollOffsetXRatio = M;
        if (properties.useMobileLayout || p != 1) {
          T = math.fit(T, 0.35, 1, 0, 1, ease.cubicOut);
          g.style.opacity = T;
          g.style.transform = "translate3d(" + ((1 - T) * 1 + M) * u + "px, 0, 0)";
          if (p == 1) {
            aboutWhoLogo.hideRatio = this.logoHideRatio;
          }
        } else {
          aboutWhoLogo.hideRatio = T;
          aboutWhoLogo._pageScrollOffsetXRatio = M;
        }
      }
      for (let p = 0; p < this.domRightTexts.length; p++) {
        let g = this.domRightTexts[p];
        let v = p / (this.domRightTexts.length - 1);
        let _ = math.fit(this.logoHideRatio, 0.5 + v * 0.1, v * 0.1 + 0.9, 0, 1, ease.cubicOut);
        let T = math.fit(r, 0.35, v * 0.5 + 1.35, 0, -5, ease.cubicOut);
        g.style.opacity = _;
        g.style.transform = "translate3d(" + ((1 - _) * 1 + T) * u + "px, 0, 0)";
      }
      let f = math.fit(this.logoHideRatio, 0, 0.35, 1, 0, ease.cubicInOut);
      this.domScroll.style.opacity = f;
      if (properties.useMobileLayout) {
        this.domScroll.style.transform = "translate3d(50%, " + (1 - f) * 120 + "%, 0)";
      } else {
        this.domScroll.style.transform = "translate3d(0, " + (1 - f) * 120 + "%, 0)";
      }
      aboutWhoLogo.update(e, -r * properties.viewportWidth + aboutWhoLogo._pageScrollOffsetXRatio * u, -scrollManager.scrollPixel + a, aboutWhoLogo._pageScrollOffsetXRatio * u, this.domLeftTexts[1]._pageScrollOffsetXRatio * u);
    }
  }
}
const whoSubsectionWeAre = new WhoSubsectionWeAre();
class WhoSubsectionDetails {
  domContainer;
  activeFaceId = -1;
  domTopWords;
  domBottomWords;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-details");
    let t = this.domContainer.querySelector("#about-who-desc-top");
    let r = this.domContainer.querySelector("#about-who-desc-bottom");
    this.domTopWords = this._parseDomText(t);
    this.domBottomWords = this._parseDomText(r);
  }
  _parseDomText(e) {
    let t = e.querySelectorAll("span");
    for (let r = 0; r < t.length; r++) {
      let n = t[r];
      let a = t[r].innerHTML.split(" ");
      n.innerHTML = "<span>" + a.join("</span><span>") + "</span>";
    }
    return e.querySelectorAll("span span");
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    let r;
    r = this.domTopWords;
    let n = Infinity;
    let a = -1;
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      c.style.transform = "translateZ(0)";
      c.style.opacity = 1;
      let u = c.getBoundingClientRect().left;
      if (u <= n) {
        a++;
      }
      n = u + 1;
      c._line = a;
    }
    this.domTopWords._lineCount = a + 1;
    r = this.domBottomWords;
    n = Infinity;
    a = -1;
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      c.style.transform = "translateZ(0)";
      c.style.opacity = 1;
      let u = c.getBoundingClientRect().right;
      if (u <= n) {
        a++;
      }
      n = u + 1;
      c._line = a;
    }
    this.domBottomWords._lineCount = a + 1;
  }
  update(e, t, r) {
    this.domContainer.style.visibility = t ? "visible" : "hidden";
    if (t) {
      let n = 0;
      if (properties.useMobileLayout) {
        n = math.fit(r, -0.75, -0.25, 0, 1) * math.fit(r, 0.25, 0.5, 1, 0);
      } else {
        n = 1;
        let a;
        let l;
        a = this.domTopWords;
        l = a._lineCount;
        for (let c = 0; c < a.length; c++) {
          let u = a[c];
          let f = u._line / l;
          let p = c / a.length;
          let g = math.fit(r, -1 + f * 0.5, -0.1, 0, 1);
          let v = math.fit(r, -1 + p * 0.5, -0.1, 0, 1);
          let _ = math.fit(r, 0.1, 0.5 + f * 0.5, 0, 1);
          let T = math.fit(r, 0.1, 0.5 + p * 0.5, 0, 1);
          u.style.transform = "translate3d(" + (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) + "em, 0, 0) translate3d(" + (math.fit(r, -1, 0, -50, 0) + math.fit(r, 0.1, 1, 0, 20)) + "vw, 0, 0)";
          u.style.opacity = v * (1 - T);
        }
        a = this.domBottomWords;
        l = a._lineCount;
        for (let c = 0; c < a.length; c++) {
          let u = a[c];
          let f = u._line / l;
          let p = c / a.length;
          let g = math.fit(r, -0.6 + f * 0.5, -0.1, 0, 1);
          let v = math.fit(r, -0.6 + p * 0.5, -0.1, 0, 1);
          let _ = math.fit(r, 0.2, 0.5 + f * 0.5, 0, 1);
          let T = math.fit(r, 0.2, 0.5 + p * 0.5, 0, 1);
          u.style.transform = "translate3d(" + (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) + "em, 0, 0) translate3d(" + (math.fit(r, -1, 0, -20, 0) + math.fit(r, 0, 1, 0, 50)) + "vw, 0, 0)";
          u.style.opacity = v * (1 - T);
        }
      }
      this.domContainer.style.opacity = n;
    }
  }
}
const whoSubsectionDetails = new WhoSubsectionDetails();
class TextAnimationHelper {
  setMatrixText(e, t, r = 0, n = 40, a = 2, l = 1 / 15) {
    e._rawTime = 0;
    e._time = 0;
    e._direction = 1;
    e._prevRefreshTime = -Infinity;
    e._refreshRate = l;
    e._delay = r;
    t = t.replace("<br>", `
`);
    e._text = t;
    e._letterPerSecond = n;
    e._maxRandLetterCount = a;
    e.textContent = "";
  }
  resetMatrixTextTime(e) {
    e._rawTime = 0;
    e._time = 0;
    e._prevRefreshTime = -Infinity;
  }
  updateMatrixText(e, t = properties.deltaTime) {
    e._rawTime += t;
    e._time += t * e._direction;
    e._time = math.clamp(e._time, 0, e._delay + (e._text.length + e._maxRandLetterCount) / e._letterPerSecond);
    if (e._rawTime >= e._prevRefreshTime + e._refreshRate) {
      e._prevRefreshTime = e._rawTime;
      let r = e._text;
      let n = Math.max(0, Math.floor(e._letterPerSecond * (e._time - e._delay)));
      let a = Math.min(r.length, n - e._maxRandLetterCount);
      let l = Math.min(r.length, n);
      let c = "";
      if (n > 0) {
        c = r.substr(0, a);
        for (let u = 0; u < l - a; u++) {
          c += String.fromCharCode(33 + ~~(Math.random() * 93));
        }
        c = c.replace(`
`, "<br>");
      }
      if (e._str != c) {
        e._str = c;
        e.innerHTML = c;
      }
    }
  }
}
const textAnimationHelper = new TextAnimationHelper();
const letterVert = `#define GLSLIFY 1
#include <ufxVert>
uniform float u_letterIdx;varying vec2 v_pixel;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_pixel=vec2(u_letterIdx*5.+1.,1.)+vec2(uv.x,1.-uv.y)*vec2(3.,4.);}`;
const letterFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_opacity;uniform float u_time;varying vec2 v_pixel;vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(vec3(floor(v_pixel),floor(u_opacity*3.)+floor(u_time+sin(u_time*3.)*1.5)));float opacity=mix(pow(rands.x,5.),0.95+rands.y*0.05,smoothstep(.75,1.,u_opacity))*u_opacity;vec2 uv=(floor(v_pixel)+.5)/vec2(210.,6.);float mask=texture2D(u_texture,uv).r;vec2 dd=abs(fract(v_pixel)-.5);float dotMask=step(max(dd.x,dd.y),.05);gl_FragColor=vec4(1.,1.,1.,max(dotMask*.3*(opacity*0.5+u_opacity*0.5),mask*opacity));}`;
class WhoSubsectionTeam {
  domContainer;
  domProgress;
  domLeftTexts;
  domLeftNamePlaceholder;
  domLeftNameText;
  domLeftJobPlaceholder;
  domLeftJobText;
  domRight;
  domIndicator;
  domIndicatorInner;
  teamDataMap = {};
  teamDataList = [];
  faceId = "edan";
  targetActiveFaceIndex = 0;
  faceIndex = 0;
  _faceIndexTween;
  facesCount = 0;
  faceIndexTimer = 0;
  containerOffsetX = 0;
  itemActiveRatio = 0;
  isForward = true;
  wasActive = null;
  isChangable = false;
  canSwipe = true;
  hasSwiped = false;
  hasSwipedOnce = false;
  _isAnimating = false;
  timeBaseChangeSpeed = 0.2;
  lastSwipeTime = -1;
  domCursorDirection = -1;
  domCursorActive = false;
  domCursorActiveRatio = 0;
  domCursorRotateRatio = 0;
  domCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  faceRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  };
  letterRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  };
  domRightWidth = 0;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-team");
    this.domProgress = e.querySelector("#about-who-team-progress");
    this.domLeft = e.querySelector("#about-who-team-left");
    this.domLeftInfo = e.querySelector("#about-who-team-info");
    this.domLeftNameIcon = e.querySelector("#about-who-team-name-icon");
    this.domLeftNamePlaceholder = e.querySelector("#about-who-team-name-placeholder");
    this.domLeftNameText = e.querySelector("#about-who-team-name-text");
    this.domLeftJobPlaceholder = e.querySelector("#about-who-team-job-placeholder");
    this.domLeftJobText = e.querySelector("#about-who-team-job-text");
    this.domNumber = e.querySelector("#about-who-team-number");
    this.domTopCompass = e.querySelector("#about-who-team-top-compass");
    this.domBottomCompass = e.querySelector("#about-who-team-bottom-compass");
    this.domDots = e.querySelector("#about-who-team-dots");
    this.domLetterContainer = e.querySelector("#about-who-team-letter-container");
    this.domIndicator = this.domProgress.querySelector("#about-who-team-indicator");
    this.domIndicatorInner = this.domProgress.querySelector("#about-who-team-indicator-inner");
    this.domIndicator._prevActiveRatio = -1;
    this.domRight = e.querySelector("#about-who-team-right");
    this.domTitle = e.querySelector("#about-who-team-title");
    this.domDesc = e.querySelector("#about-who-team-desc");
    this.domDescText = e.querySelector("#about-who-team-desc-text");
    this.domDescSquare = e.querySelector("#about-who-team-square");
    this.domCursor = e.querySelector("#about-who-face-cursor");
    this.domCursorArrow = e.querySelector("#about-who-face-cursor-arrow");
    this.domFaces = e.querySelector("#about-who-team-faces");
    this.domMobileSwipe = e.querySelector("#about-who-team-left-mobile-tips");
    this.domTeamNumber = e.querySelector("#about-who-team-number-center-item");
    properties.loader.add(settings.TEAM_PATH + "team.json", {
      onLoad: t => {
        this.teamDataList = t;
        this._createUIElements();
        for (let r = 0; r < t.length; r++) {
          t[r].index = r;
          this.teamDataMap[t[r].id] = t[r];
        }
      }
    });
    aboutHeroFaces.load(this.faceId);
    this.letterMesh = new UfxMesh({
      uniforms: {
        u_texture: {
          value: properties.loader.add(settings.TEXTURE_PATH + "font.png", {
            minFilter: LinearFilter,
            type: "texture"
          }).content
        },
        u_letterIdx: {
          value: 0
        },
        u_opacity: {
          value: 1
        },
        u_time: properties.sharedUniforms.u_time
      },
      vertexShader: letterVert,
      fragmentShader: letterFrag
    });
    this.letterMesh.visible = false;
    aboutPage.postUfxContainer.add(this.letterMesh);
    this._faceIndexTween = new Tween(this, () => {
      this.onTweenComplete();
    });
  }
  init() {
    input.onXScrolled.add(() => {
      if (properties.useMobileLayout && this.canSwipe && this.wasActive && properties.time - this.lastSwipeTime > 0.5) {
        this.hasSwiped = true;
        this.canSwipe = false;
        this.domCursorDirection = input.lastScrollXDirection;
        this.lastSwipeTime = properties.time;
      }
    }, this);
    input.onUped.add(() => {
      this.canSwipe = true;
    }, this);
  }
  onPageShow() {
    aboutHeroFaces.showRatio = 0;
    for (let e = 0; e < this.teamDataList.length; e++) {
      let t = this.teamDataList[e].id;
      aboutHeroFaces.load(t);
    }
    this.facesCount = this.teamDataList.length;
    this.updateTeamNumberUI();
  }
  prev() {
    this.targetActiveFaceIndex--;
    this.isForward = false;
    this._clearTween();
    this._isAnimating = true;
    this._faceIndexTween.to(1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25, {
      faceIndex: this.targetActiveFaceIndex
    }, ease.cubicInOut);
    this.updateTeamNumberUI();
  }
  next() {
    this.targetActiveFaceIndex++;
    this.isForward = true;
    this._clearTween();
    this._isAnimating = true;
    this._faceIndexTween.to(1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25, {
      faceIndex: this.targetActiveFaceIndex
    }, ease.cubicInOut);
    this.updateTeamNumberUI();
  }
  _clearTween() {
    this._isAnimating = false;
    this._faceIndexTween.kill();
  }
  updateTeamNumberUI() {
    const t = `${(math.mod(this.targetActiveFaceIndex, this.facesCount) + 1001).toString().substring(1)}`;
    this.domTeamNumber.innerHTML = t;
  }
  onTweenComplete() {
    this._clearTween();
    this.faceIndexTimer = 0;
    this._changeFaceUIByIndex(math.mod(this.targetActiveFaceIndex, this.teamDataList.length));
  }
  reset() {
    this._clearTween();
    this.faceIndexTimer = 0;
    this.targetActiveFaceIndex = 0;
    this.faceIndex = 0;
    this.canSwipe = true;
    this.isForward = true;
    this._changeFaceUIByIndex(0);
  }
  resize(e, t) {
    this._splitText();
    this.syncContainerOffset();
    this.domRightWidth = this.domRight.offsetWidth;
    let r = this.domContainer.getBoundingClientRect();
    let n = this.domFaces.getBoundingClientRect();
    this._updateRect(this.faceRect, n, r);
    let a = this.domLetterContainer.getBoundingClientRect();
    this._updateRect(this.letterRect, a, r);
    this._splitText();
  }
  _updateRect(e, t, r) {
    e.x = t.left - aboutWhoSection.subsectionContainerOffsetX - this.containerOffsetX;
    e.y = t.top - aboutWhoSection.subsectionContainerOffsetY + scrollManager.scrollPixel;
    e.width = t.width;
    e.height = t.height;
    e.offsetX = t.left - r.left;
    e.offsetY = t.top - r.top;
  }
  _changeFaceUIByIndex(e) {
    e = math.mod(e, this.teamDataList.length);
    let t = this.faceId = this.teamDataList[e].id;
    let r = this.teamDataMap[t].name;
    let n = this.teamDataMap[t].role;
    this.domLeftNamePlaceholder.innerHTML = r;
    textAnimationHelper.setMatrixText(this.domLeftNameText, r, 0, 1, 3, 1 / 30);
    this.domLeftJobPlaceholder.innerHTML = n;
    textAnimationHelper.setMatrixText(this.domLeftJobText, n, 0, 1, 3, 1 / 30);
  }
  _createUIElements() {
    if (!this.teamDataList || !this.domTopCompass || !this.domBottomCompass) {
      return;
    }
    let e = document.createElement("div");
    e.id = "about-who-team-top-compass-inner";
    this.topCompassInnerDiv = e;
    for (let r = 0; r < this.teamDataList.length - 4; r++) {
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        a.classList.add("about-who-team-top-compass-long");
        e.append(a);
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          c.classList.add("about-who-team-top-compass-small");
          e.append(c);
        }
      }
    }
    this.domTopCompass.append(e);
    let t = document.createElement("div");
    t.id = "about-who-team-bottom-compass-inner";
    this.bottomCompassInnerDiv = t;
    for (let r = 0; r < this.teamDataList.length - 4; r++) {
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        a.classList.add("about-who-team-bottom-compass-long");
        t.append(a);
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          c.classList.add("about-who-team-bottom-compass-small");
          t.append(c);
        }
      }
    }
    this.domBottomCompass.append(t);
    for (let r = 0; r < 11; r++) {
      let n = document.createElement("div");
      n.classList.add("about-who-team-dots-col");
      for (let a = 0; a < 3; a++) {
        let l = document.createElement("div");
        l.classList.add("about-who-team-dot");
        n.append(l);
      }
      this.domDots.append(n);
    }
    this.topCompassInnerDiv._width = this.topCompassInnerDiv.getBoundingClientRect().width - this.domTopCompass.getBoundingClientRect().width;
    this.bottomCompassInnerDiv._width = this.bottomCompassInnerDiv.getBoundingClientRect().width - this.domBottomCompass.getBoundingClientRect().width;
  }
  syncContainerOffset() {
    this.containerOffsetX = properties.useMobileLayout ? 0 : (aboutWhoSection.scrollRatio * aboutWhoSection.PAGE_DISTANCE - aboutWhoSection.PAGE_DISTANCE * 2) * properties.viewportWidth;
    this.domContainer.style.transform = "translate3d(" + this.containerOffsetX + "px,0,0)";
  }
  _splitText() {}
  preUpdate() {
    this.domCursor.style.display = "none";
    this.letterMesh.visible = false;
  }
  onSwipe() {
    this.hasSwipedOnce = true;
  }
  update(e, t, r, n, a, l) {
    let c = l > 0.5;
    aboutHeroFaces.showRatio = math.saturate(aboutHeroFaces.showRatio + (c ? e : -e) / 1.5);
    aboutHeroFaces.isActive = aboutHeroFaces.showRatio > 0;
    this.itemActiveRatio = math.saturate(this.itemActiveRatio + (aboutHeroFaces.isActive ? this._isAnimating ? -2 : 2 : 0) * e);
    if (t) {
      this.syncContainerOffset();
    }
    if (c && !this.hasSwipedOnce) {
      this.domMobileSwipe.classList.add("--is-active");
    } else {
      this.domMobileSwipe.classList.remove("--is-active");
    }
    let u = this.faceRect.x + aboutWhoSection.subsectionContainerOffsetX + this.containerOffsetX;
    let f = this.faceRect.y + aboutWhoSection.subsectionContainerOffsetY - scrollManager.scrollPixel;
    let p = this.faceRect.width;
    let g = this.faceRect.height;
    let v = input.easedMouseDynamics.default.value.x;
    let _ = input.easedMouseDynamics.default.value.y;
    let T = (v * 0.5 + 0.5) * properties.viewportWidth;
    let M = (0.5 - _ * 0.5) * properties.viewportHeight;
    let S = false;
    if (properties.useMobileLayout) {
      this.domCursor.style.display = "none";
    } else {
      if (!this.wasActive) {
        this.domCursorActiveRatio = 0;
      }
      S = c && T > u && T < u + p && M > f && M < f + g;
      this.domCursorActiveRatio = math.saturate(this.domCursorActiveRatio + (S ? e : -e) * 1.5);
      S = this.domCursorActiveRatio > 0;
      this.domCursorDirection = T - u - p * 0.5 > 0 ? 1 : -1;
      if (S) {
        this.domCursor.style.display = "flex";
        let R = T - u;
        let E = M + this.faceRect.offsetY - f;
        let I = Math.min(2.5, input.easedMouseDynamics.default.valueVel.length() / 5 + 1) * ease.backOut(this.domCursorActiveRatio) * math.fit(n, 0, properties.viewportHeight, 1, 0);
        this.domCursor.style.transform = `translate3d(${R}px, ${E}px,0) translate3d(-50%, -50%, 0) scale(${I})`;
        this.domCursorRotateRatio = math.saturate(this.domCursorRotateRatio + (this.domCursorDirection > 0 ? e * 3 : e * -3));
        this.domCursorExtraRotationMotion.update(e, math.clamp(input.easedMouseDynamics.default.valueVel.y * -this.domCursorDirection, -1, 1));
        let F = ease.backInOut(this.domCursorRotateRatio);
        this.domCursorArrow.style.transform = `rotate(${F * 180 + this.domCursorExtraRotationMotion.value * 75}deg)`;
      } else {
        this.domCursor.style.display = "none";
      }
    }
    let b = 0;
    let C = 0;
    let w = 0;
    if (t) {
      if (properties.useMobileLayout) {
        b = math.fit(r, -0.5, 0, 0, 1);
        C = math.fit(r, -0.5, 0, 0, 1) * math.fit(r, 0.5, 1, 1, 0);
        w = l;
      } else {
        b = math.fit(r, -0.5, -0.2, 0, 1);
        C = math.fit(r, -0.4, -0.1, 0, 1);
        w = math.fit(r, -0.3, 0, 0, 1);
      }
      this.domTitle.style.opacity = b;
      this.domDesc.style.opacity = C;
      this.domLeft.style.opacity = w;
      this.domLeft.style.visibility = "visible";
      this.domTitle.style.visibility = "visible";
      this.domDesc.style.visibility = "visible";
      this.letterMesh.syncRect(this.letterRect.x + aboutWhoSection.subsectionContainerOffsetX + this.containerOffsetX, this.letterRect.y + aboutWhoSection.subsectionContainerOffsetY - scrollManager.scrollPixel, this.letterRect.width, this.letterRect.height);
      this.letterMesh.update();
      this.letterMesh.visible = true;
    } else {
      this.domLeft.style.visibility = "hidden";
      this.domTitle.style.visibility = "hidden";
      this.domDesc.style.visibility = "hidden";
    }
    if (this.teamDataList.length) {
      if (t) {
        if (!this.wasActive) {
          this.reset();
        }
        if (!properties.useMobileLayout) {
          aboutHero.properties.cameraViewportOffsetX = (properties.viewportWidth / 2 - (properties.viewportWidth - this.domRightWidth) / 2) * math.fit(r, -aboutWhoSection.PAGE_DISTANCE, 0, 0, 1, ease.cubicInOut);
        }
        let R = this.hasSwiped && c;
        if (R || S && input.justClicked) {
          audios.countPlay("click");
          if (this.domCursorDirection == 1) {
            this.next();
          } else {
            this.prev();
          }
        }
        if (R) {
          this.onSwipe();
        }
        let E = this.faceIndexTimer;
        this.faceIndexTimer = Math.min(1, this.faceIndexTimer + e * this.timeBaseChangeSpeed * (this._isAnimating ? 0 : 1));
        if (E < 1 && this.faceIndexTimer >= 1) {
          if (this.isForward) {
            this.next();
          } else {
            this.prev();
          }
        }
        let I = Math.floor(math.mod(this.faceIndex, this.teamDataList.length));
        let F = math.mod(I + 1, this.teamDataList.length);
        let k = this.faceIndex - Math.floor(this.faceIndex);
        aboutHeroFaces.currId = this.teamDataList[I].id;
        aboutHeroFaces.nextId = this.teamDataList[F].id;
        aboutHeroFaces.transitionRatio = k;
        let L = this.domIndicatorInner;
        L.style.transform = "scaleX(" + this.faceIndexTimer + ")";
        this.domIndicator.style.transform = "scaleX(" + ease.expoInOut(this.itemActiveRatio) + ")";
        let D = this.itemActiveRatio > 0.95 ? 1 : (Math.cos(this.itemActiveRatio * 17.213) * 0.5 + 0.5) * Math.pow(this.itemActiveRatio, 0.25);
        this.domLeftNameIcon.style.opacity = D;
        this.domLeftNameText._direction = this.domLeftJobText._direction = this._isAnimating ? -1 : 1;
        this.domLeftNameText._letterPerSecond = this.domLeftJobText._letterPerSecond = this._isAnimating ? 60 : 30;
        textAnimationHelper.updateMatrixText(this.domLeftNameText);
        textAnimationHelper.updateMatrixText(this.domLeftJobText);
        this.letterMesh.material.uniforms.u_letterIdx.value = aboutHeroFaces.currId.substring(0, 1).toUpperCase().charCodeAt(0) - 65;
        this.letterMesh.material.uniforms.u_opacity.value = w * D;
      } else {
        this._clearTween();
      }
    }
    this.wasActive = t;
    this.hasSwiped = false;
  }
}
const whoSubsectionTeam = new WhoSubsectionTeam();
class AboutWhoSection {
  domContainer;
  activeFaceId = -1;
  scrollRatio = 0;
  subsectionContainerOffsetY = 0;
  subsectionContainerOffsetX = 0;
  RANGE_START_WAIT = 3.5;
  RANGE_PAGE_12 = 1.75;
  RANGE_PAGE_23 = 1.75;
  RANGE_PAGE_34 = 1.75;
  RANGE_END_WAIT = 2.5;
  PAGE_DISTANCE = 1.25;
  THRESHOLDS = [];
  MOBILE_THRESHOLDS = [];
  preInit(e) {
    this.domContainer = e.querySelector("#about-who");
    this.domSubsectionContainer = e.querySelector("#about-who-subsection-container");
    this.domCrosses = e.querySelector("#about-crosses ");
    let t = 0;
    let r = 0;
    this.THRESHOLDS.push(t += this.RANGE_START_WAIT);
    this.THRESHOLDS.push(t += this.RANGE_PAGE_12);
    this.THRESHOLDS.push(t += this.RANGE_PAGE_23);
    r = t;
    this.MOBILE_THRESHOLDS.push.apply(this.MOBILE_THRESHOLDS, this.THRESHOLDS);
    this.THRESHOLDS.push(t += this.RANGE_END_WAIT);
    this.MOBILE_THRESHOLDS.push(r += this.RANGE_PAGE_34);
    this.MOBILE_THRESHOLDS.push(r += this.RANGE_END_WAIT);
    whoSubsectionWeAre.preInit(e);
    whoSubsectionDetails.preInit(e);
    whoSubsectionTeam.preInit(e);
    aboutHero.preInit();
    visuals.stage3DList.push(aboutHero);
  }
  init() {
    whoSubsectionWeAre.init();
    whoSubsectionDetails.init();
    whoSubsectionTeam.init();
    aboutHero.init();
  }
  resize(e, t) {
    this.syncSubsectionContainerTransform();
    whoSubsectionWeAre.resize(e, t);
    whoSubsectionDetails.resize(e, t);
    whoSubsectionTeam.resize(e, t);
    aboutHero.resize(properties.width, properties.height);
  }
  show() {
    aboutWhoLogo.hideRatio = 0;
    whoSubsectionTeam.onPageShow();
  }
  getMoveRatio() {
    return -scrollManager.getDomRange(this.domContainer).screenY / (properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth);
  }
  getScrollRatio() {
    let e = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let t = this.getMoveRatio();
    let r = 0;
    if (t < e[0]) {
      r = 0;
    } else if (t < e[1]) {
      r = math.fit(t, e[0], e[1], 0, 1, ease.cubicInOut);
    } else if (properties.useMobileLayout) {
      if (t < e[2]) {
        r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut);
      } else {
        r = math.fit(t, e[2], e[3], 2, 3, ease.cubicInOut);
      }
    } else {
      r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut);
    }
    return this.scrollRatio = r;
  }
  syncSubsectionContainerTransform() {
    let e = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let t = properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth;
    this.scrollableSize = e[e.length - 1] * t;
    let n = scrollManager.getDomRange(this.domContainer).isActive;
    let a = scrollManager.getDomRange(this.domContainer);
    let l = this.getScrollRatio() * this.PAGE_DISTANCE;
    this.subsectionContainerOffsetY = math.fit(a.screenY, 0, -this.scrollableSize, 0, this.scrollableSize);
    if (properties.useMobileLayout) {
      this.subsectionContainerOffsetX = 0;
    } else {
      this.subsectionContainerOffsetX = l * -properties.viewportWidth;
    }
    this.domSubsectionContainer.style.transform = "translate3d(" + this.subsectionContainerOffsetX + "px," + this.subsectionContainerOffsetY + "px, 0)";
    this.domCrosses.style.transform = "translate3d(" + -this.subsectionContainerOffsetX + "px,0, 0)";
    if (!n) {
      aboutHero.isActive = false;
    }
  }
  update(e) {
    let t = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let r = properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth;
    this.scrollableSize = t[t.length - 1] * r;
    let a = scrollManager.getDomRange(this.domContainer).isActive;
    let l = scrollManager.getDomRange(this.domContainer);
    this.syncSubsectionContainerTransform();
    whoSubsectionTeam.preUpdate();
    if (a) {
      let c = this.getScrollRatio() * this.PAGE_DISTANCE;
      let u = -l.screenY / (properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth);
      aboutHero.initialSplineRatio = math.fit(u, 0, t[1], 0, 1);
      aboutHero.hudRatio = math.fit(u, t[1], t[1] + this.RANGE_PAGE_23 * 0.5, 0, 1);
      aboutHero.outSectionRatio = math.fit(u / t[3], 0.9, 1, 0, 1);
      aboutHero.properties.cameraViewportOffsetX = 0;
      aboutHero.properties.cameraViewportOffsetY = 0;
      aboutHero.scrollYRatio = 0;
      aboutHero.faceShowRatio = 0;
      if (c < this.PAGE_DISTANCE) {
        aboutHero.introRatio = u / (this.RANGE_START_WAIT + this.RANGE_PAGE_12);
        whoSubsectionWeAre.update(e, true, c, u, this.subsectionContainerOffsetY);
      } else {
        aboutHero.introRatio = 1;
        whoSubsectionWeAre.update(e, false, c, u, this.subsectionContainerOffsetY);
      }
      if (c > 0 && c < this.PAGE_DISTANCE * 2) {
        whoSubsectionDetails.update(e, true, c - this.PAGE_DISTANCE, this.subsectionContainerOffsetY);
      } else {
        whoSubsectionDetails.update(e, false, c - this.PAGE_DISTANCE, this.subsectionContainerOffsetY);
      }
      let f = this.getMoveRatio();
      if (properties.useMobileLayout) {
        aboutHero.panningSplineRaito = math.fit(f, t[2], t[4], 0, 1);
      } else {
        aboutHero.panningSplineRaito = math.fit(f, t[1], t[3], 0, 1);
      }
      let p = math.fit(c - this.PAGE_DISTANCE * 2 - (properties.useMobileLayout ? this.PAGE_DISTANCE : 0), -1, 0, 0, 1);
      let g = Math.max(0, scrollManager.scrollPixel - l.top - t[t.length - 1] * r);
      if (c >= this.PAGE_DISTANCE) {
        aboutHero.properties.cameraViewportOffsetY = g;
        aboutHero.scrollYRatio = g / r;
        whoSubsectionTeam.update(e, true, c - this.PAGE_DISTANCE * 2, g, this.subsectionContainerOffsetY, p);
      } else {
        whoSubsectionTeam.update(e, false, c - this.PAGE_DISTANCE * 2, g, this.subsectionContainerOffsetY, p);
      }
      aboutHero.isActive = true;
    } else {
      aboutHero.isActive = false;
      whoSubsectionTeam.wasActive = false;
    }
  }
}
const aboutWhoSection = new AboutWhoSection();
const TITLE_STAGGER = 20;
const DESCRIPTION_STAGGER = 50;
class AboutClientSection {
  _needsReset = true;
  isSectionWasActive = false;
  preInit(e) {
    this.domContainer = e.querySelector("#about-clients");
    this.domTitle = e.querySelector("#about-clients-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitle._words = [];
    this.domDesc = e.querySelector("#about-clients-desc");
    this.domDesc._time = 0;
    this.domDesc._animating = false;
    this.domCarousel = e.querySelector("#about-clients-carousel");
    this.domCarouselLines = Array.from(this.domCarousel.querySelectorAll(".about-clients-carousel-line"));
    this.domCarouselLinesWrapper = [];
  }
  init() {
    this._createCarousel();
  }
  resize(e, t) {
    this._splitText();
    for (let r = 0; r < this.domCarouselLines.length; r++) {
      let n = this.domCarouselLines[r];
      let a = this.domCarouselLinesWrapper[r];
      a._width = n.getBoundingClientRect().width;
    }
  }
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive;
    let n = scrollManager.scrollViewDelta;
    let a = scrollManager.getDomRange(this.domTitle);
    let l = scrollManager.getDomRange(this.domDesc);
    if (r) {
      if (this._needsReset) {
        this._reset();
      }
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 1 + this.domTitle._words.length / TITLE_STAGGER);
      this.domDesc._time = math.clamp(this.domDesc._time + (this.domDesc._animating ? e : -e), 0, 1 + this.domDesc._splitted.words.length / DESCRIPTION_STAGGER);
      if (a.screenRatio > -1) {
        this.domTitle._animating = true;
        if (properties.useMobileLayout) {
          this.domTitle._words.forEach(c => {
            c.forEach(u => {
              u.style.transform = "translate3d(0, 0, 0)";
            });
          });
        } else {
          this.domTitle._words.forEach((c, u) => {
            c.forEach((f, p) => {
              let g = math.saturate(this.domTitle._time - u / 20);
              let v = ease.expoOut(g);
              f.style.transform = `translate3d(0, ${(1 - v) * 100 - (4 - p) * 100 * v}%, 0)`;
            });
          });
        }
      }
      if (l.screenRatio > -1) {
        this.domDesc._animating = true;
        this.domDesc._splitted.words.forEach((c, u) => {
          let f = properties.viewportWidth >= settings.MOBILE_WIDTH ? ease.lusion(this.domDesc._time - u / DESCRIPTION_STAGGER) : 1;
          let p = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domDesc._time - u / DESCRIPTION_STAGGER, 0, 1, 100, 0, ease.lusion) : 0;
          c.style.transform = `translate3d(0, ${p}%, 0)`;
          c.style.opacity = f;
        });
      }
      for (let c = 0; c < this.domCarouselLinesWrapper.length; c++) {
        let u = this.domCarouselLinesWrapper[c];
        let f = c % 2;
        u._time += e * input.lastScrollYDirection * (100 + f * 35) + n * (100 + f * 35);
        let p = -math.loop(u._time, 0, u._width);
        u.style.transform = `translateX(${p}px)`;
      }
    } else {
      this._needsReset = true;
    }
    this.isSectionWasActive = r;
  }
  _createCarousel() {
    this.domCarouselLines.forEach(e => {
      const t = document.createElement("div");
      t.classList.add("about-clients-carousel-line-wrapper");
      const r = e.cloneNode(true);
      const n = e.cloneNode(true);
      t.append(r, n, e);
      this.domCarousel.append(t);
      t._time = 0;
      this.domCarouselLinesWrapper.push(t);
    });
  }
  _splitText() {
    this.domTitle._originalHTML = this.domTitle._originalHTML || this.domTitle.innerHTML;
    this.domTitle.innerHTML = this.domTitle._originalHTML;
    this.domTitleWordList = [];
    this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words",
      wordClass: "about-clients-title-word"
    });
    this.domTitle._splitted.words.forEach((e, t) => {
      const r = [];
      const n = e.parentNode;
      const a = document.createElement("div");
      a.style.position = "relative";
      a.style.overflow = "hidden";
      a.classList.add("about-clients-title-word-wrapper");
      a.style.display = "flex";
      a.style.flexDirection = "column";
      e.remove();
      this.domTitleWordList.push(a);
      for (let l = 0; l < 3; l++) {
        const c = e.cloneNode(true);
        c.style.transform = "translate3d(0, 100%, 0)";
        a.append(c);
        r.push(c);
        this.domTitle._words[t] = r;
      }
      n.append(a);
      e.remove();
    });
    this.domDesc._splitted = new SplitType(this.domDesc, {
      types: "words",
      wordClass: "about-clients-desc-text-word"
    });
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domTitle._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      this.domDesc._time = 0;
      this.domDesc._animating = false;
      this.domDesc._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
        e.style.opacity = 0;
      });
    }
  }
}
const aboutClientSection = new AboutClientSection();
class SVGParser {
  parse(e) {
    const t = this;
    function r(K, G) {
      if (K.nodeType !== 1) {
        return;
      }
      const U = R(K);
      let N = false;
      let he = null;
      switch (K.nodeName) {
        case "svg":
          G = T(K, G);
          break;
        case "style":
          a(K);
          break;
        case "g":
          G = T(K, G);
          break;
        case "path":
          G = T(K, G);
          if (K.hasAttribute("d")) {
            he = n(K);
          }
          break;
        case "rect":
          G = T(K, G);
          he = u(K);
          break;
        case "polygon":
          G = T(K, G);
          he = f(K);
          break;
        case "polyline":
          G = T(K, G);
          he = p(K);
          break;
        case "circle":
          G = T(K, G);
          he = g(K);
          break;
        case "ellipse":
          G = T(K, G);
          he = v(K);
          break;
        case "line":
          G = T(K, G);
          he = _(K);
          break;
        case "defs":
          N = true;
          break;
        case "use":
          G = T(K, G);
          const xe = (K.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "").substring(1);
          const ee = K.viewportElement.getElementById(xe);
          if (ee) {
            r(ee, G);
          } else {
            console.warn("SVGLoader: 'use node' references non-existent node id: " + xe);
          }
          break;
      }
      if (he) {
        if (G.fill !== undefined && G.fill !== "none") {
          he.color.setStyle(G.fill);
        }
        I(he, te);
        re.push(he);
        he.userData = {
          node: K,
          style: G
        };
      }
      const ve = K.childNodes;
      for (let de = 0; de < ve.length; de++) {
        const xe = ve[de];
        if (!N || xe.nodeName === "style" || xe.nodeName === "defs") {
          r(xe, G);
        }
      }
      if (U) {
        z.pop();
        if (z.length > 0) {
          te.copy(z[z.length - 1]);
        } else {
          te.identity();
        }
      }
    }
    function n(K) {
      const G = new ShapePath();
      const U = new Vector2();
      const N = new Vector2();
      const he = new Vector2();
      let ve = true;
      let de = false;
      const xe = K.getAttribute("d");
      if (xe === "" || xe === "none") {
        return null;
      }
      const ee = xe.match(/[a-df-z][^a-df-z]*/gi);
      for (let Ue = 0, fe = ee.length; Ue < fe; Ue++) {
        const Se = ee[Ue];
        const Me = Se.charAt(0);
        const Be = Se.slice(1).trim();
        if (ve === true) {
          de = true;
          ve = false;
        }
        let se;
        switch (Me) {
          case "M":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              if ($ === 0) {
                G.moveTo(U.x, U.y);
              } else {
                G.lineTo(U.x, U.y);
              }
              if ($ === 0) {
                he.copy(U);
              }
            }
            break;
          case "H":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.x = se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "V":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.y = se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "L":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "C":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6) {
              G.bezierCurveTo(se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], se[$ + 5]);
              N.x = se[$ + 2];
              N.y = se[$ + 3];
              U.x = se[$ + 4];
              U.y = se[$ + 5];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "S":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.bezierCurveTo(M(U.x, N.x), M(U.y, N.y), se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3]);
              N.x = se[$ + 0];
              N.y = se[$ + 1];
              U.x = se[$ + 2];
              U.y = se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "Q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.quadraticCurveTo(se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3]);
              N.x = se[$ + 0];
              N.y = se[$ + 1];
              U.x = se[$ + 2];
              U.y = se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "T":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x);
              const st = M(U.y, N.y);
              G.quadraticCurveTo(Ye, st, se[$ + 0], se[$ + 1]);
              N.x = Ye;
              N.y = st;
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "A":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == U.x && se[$ + 6] == U.y) {
                continue;
              }
              const Ye = U.clone();
              U.x = se[$ + 5];
              U.y = se[$ + 6];
              N.x = U.x;
              N.y = U.y;
              l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "m":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x += se[$ + 0];
              U.y += se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              if ($ === 0) {
                G.moveTo(U.x, U.y);
              } else {
                G.lineTo(U.x, U.y);
              }
              if ($ === 0) {
                he.copy(U);
              }
            }
            break;
          case "h":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.x += se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "v":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.y += se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "l":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x += se[$ + 0];
              U.y += se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "c":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6) {
              G.bezierCurveTo(U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3], U.x + se[$ + 4], U.y + se[$ + 5]);
              N.x = U.x + se[$ + 2];
              N.y = U.y + se[$ + 3];
              U.x += se[$ + 4];
              U.y += se[$ + 5];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "s":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.bezierCurveTo(M(U.x, N.x), M(U.y, N.y), U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3]);
              N.x = U.x + se[$ + 0];
              N.y = U.y + se[$ + 1];
              U.x += se[$ + 2];
              U.y += se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.quadraticCurveTo(U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3]);
              N.x = U.x + se[$ + 0];
              N.y = U.y + se[$ + 1];
              U.x += se[$ + 2];
              U.y += se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "t":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x);
              const st = M(U.y, N.y);
              G.quadraticCurveTo(Ye, st, U.x + se[$ + 0], U.y + se[$ + 1]);
              N.x = Ye;
              N.y = st;
              U.x = U.x + se[$ + 0];
              U.y = U.y + se[$ + 1];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "a":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == 0 && se[$ + 6] == 0) {
                continue;
              }
              const Ye = U.clone();
              U.x += se[$ + 5];
              U.y += se[$ + 6];
              N.x = U.x;
              N.y = U.y;
              l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "Z":
          case "z":
            G.currentPath.autoClose = true;
            if (G.currentPath.curves.length > 0) {
              U.copy(he);
              G.currentPath.currentPoint.copy(U);
              ve = true;
            }
            break;
          default:
            console.warn(Se);
        }
        de = false;
      }
      return G;
    }
    function a(K) {
      if (!!K.sheet && !!K.sheet.cssRules && !!K.sheet.cssRules.length) {
        for (let G = 0; G < K.sheet.cssRules.length; G++) {
          const U = K.sheet.cssRules[G];
          if (U.type !== 1) {
            continue;
          }
          const N = U.selectorText.split(/,/gm).filter(Boolean).map(he => he.trim());
          for (let he = 0; he < N.length; he++) {
            const ve = Object.fromEntries(Object.entries(U.style).filter(([, de]) => de !== ""));
            ce[N[he]] = Object.assign(ce[N[he]] || {}, ve);
          }
        }
      }
    }
    function l(K, G, U, N, he, ve, de, xe) {
      if (G == 0 || U == 0) {
        K.lineTo(xe.x, xe.y);
        return;
      }
      N = N * Math.PI / 180;
      G = Math.abs(G);
      U = Math.abs(U);
      const ee = (de.x - xe.x) / 2;
      const Ue = (de.y - xe.y) / 2;
      const fe = Math.cos(N) * ee + Math.sin(N) * Ue;
      const Se = -Math.sin(N) * ee + Math.cos(N) * Ue;
      let Me = G * G;
      let Be = U * U;
      const se = fe * fe;
      const $ = Se * Se;
      const Oe = se / Me + $ / Be;
      if (Oe > 1) {
        const Ee = Math.sqrt(Oe);
        G = Ee * G;
        U = Ee * U;
        Me = G * G;
        Be = U * U;
      }
      const Ye = Me * $ + Be * se;
      const st = (Me * Be - Ye) / Ye;
      let W = Math.sqrt(Math.max(0, st));
      if (he === ve) {
        W = -W;
      }
      const O = W * G * Se / U;
      const me = -W * U * fe / G;
      const Ie = Math.cos(N) * O - Math.sin(N) * me + (de.x + xe.x) / 2;
      const Le = Math.sin(N) * O + Math.cos(N) * me + (de.y + xe.y) / 2;
      const Y = c(1, 0, (fe - O) / G, (Se - me) / U);
      const we = c((fe - O) / G, (Se - me) / U, (-fe - O) / G, (-Se - me) / U) % (Math.PI * 2);
      K.currentPath.absellipse(Ie, Le, G, U, Y, Y + we, ve === 0, N);
    }
    function c(K, G, U, N) {
      const he = K * U + G * N;
      const ve = Math.sqrt(K * K + G * G) * Math.sqrt(U * U + N * N);
      let de = Math.acos(Math.max(-1, Math.min(1, he / ve)));
      if (K * N - G * U < 0) {
        de = -de;
      }
      return de;
    }
    function u(K) {
      const G = w(K.getAttribute("x") || 0);
      const U = w(K.getAttribute("y") || 0);
      const N = w(K.getAttribute("rx") || K.getAttribute("ry") || 0);
      const he = w(K.getAttribute("ry") || K.getAttribute("rx") || 0);
      const ve = w(K.getAttribute("width"));
      const de = w(K.getAttribute("height"));
      const xe = 0.448084975506;
      const ee = new ShapePath();
      ee.moveTo(G + N, U);
      ee.lineTo(G + ve - N, U);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + ve - N * xe, U, G + ve, U + he * xe, G + ve, U + he);
      }
      ee.lineTo(G + ve, U + de - he);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + ve, U + de - he * xe, G + ve - N * xe, U + de, G + ve - N, U + de);
      }
      ee.lineTo(G + N, U + de);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + N * xe, U + de, G, U + de - he * xe, G, U + de - he);
      }
      ee.lineTo(G, U + he);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G, U + he * xe, G + N * xe, U, G + N, U);
      }
      return ee;
    }
    function f(K) {
      function G(ve, de, xe) {
        const ee = w(de);
        const Ue = w(xe);
        if (he === 0) {
          N.moveTo(ee, Ue);
        } else {
          N.lineTo(ee, Ue);
        }
        he++;
      }
      const U = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const N = new ShapePath();
      let he = 0;
      K.getAttribute("points").replace(U, G);
      N.currentPath.autoClose = true;
      return N;
    }
    function p(K) {
      function G(ve, de, xe) {
        const ee = w(de);
        const Ue = w(xe);
        if (he === 0) {
          N.moveTo(ee, Ue);
        } else {
          N.lineTo(ee, Ue);
        }
        he++;
      }
      const U = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const N = new ShapePath();
      let he = 0;
      K.getAttribute("points").replace(U, G);
      N.currentPath.autoClose = false;
      return N;
    }
    function g(K) {
      const G = w(K.getAttribute("cx") || 0);
      const U = w(K.getAttribute("cy") || 0);
      const N = w(K.getAttribute("r") || 0);
      const he = new Path();
      he.absarc(G, U, N, 0, Math.PI * 2);
      const ve = new ShapePath();
      ve.subPaths.push(he);
      return ve;
    }
    function v(K) {
      const G = w(K.getAttribute("cx") || 0);
      const U = w(K.getAttribute("cy") || 0);
      const N = w(K.getAttribute("rx") || 0);
      const he = w(K.getAttribute("ry") || 0);
      const ve = new Path();
      ve.absellipse(G, U, N, he, 0, Math.PI * 2);
      const de = new ShapePath();
      de.subPaths.push(ve);
      return de;
    }
    function _(K) {
      const G = w(K.getAttribute("x1") || 0);
      const U = w(K.getAttribute("y1") || 0);
      const N = w(K.getAttribute("x2") || 0);
      const he = w(K.getAttribute("y2") || 0);
      const ve = new ShapePath();
      ve.moveTo(G, U);
      ve.lineTo(N, he);
      ve.currentPath.autoClose = false;
      return ve;
    }
    function T(K, G) {
      G = Object.assign({}, G);
      let U = {};
      if (K.hasAttribute("class")) {
        const de = K.getAttribute("class").split(/\s/).filter(Boolean).map(xe => xe.trim());
        for (let xe = 0; xe < de.length; xe++) {
          U = Object.assign(U, ce["." + de[xe]]);
        }
      }
      if (K.hasAttribute("id")) {
        U = Object.assign(U, ce["#" + K.getAttribute("id")]);
      }
      function N(de, xe, ee = function (fe) {
        if (fe.startsWith("url")) {
          console.warn("SVGLoader: url access in attributes is not implemented.");
        }
        return fe;
      }) {
        if (K.hasAttribute(de)) {
          G[xe] = ee(K.getAttribute(de));
        }
        if (U[de]) {
          G[xe] = ee(U[de]);
        }
        if (K.style && K.style[de] !== "") {
          G[xe] = ee(K.style[de]);
        }
      }
      function he(de) {
        return Math.max(0, Math.min(1, w(de)));
      }
      function ve(de) {
        return Math.max(0, w(de));
      }
      N("fill", "fill");
      N("fill-opacity", "fillOpacity", he);
      N("fill-rule", "fillRule");
      N("opacity", "opacity", he);
      N("stroke", "stroke");
      N("stroke-opacity", "strokeOpacity", he);
      N("stroke-width", "strokeWidth", ve);
      N("stroke-linejoin", "strokeLineJoin");
      N("stroke-linecap", "strokeLineCap");
      N("stroke-miterlimit", "strokeMiterLimit", ve);
      N("visibility", "visibility");
      return G;
    }
    function M(K, G) {
      return K - (G - K);
    }
    function S(K, G, U) {
      if (typeof K != "string") {
        throw new TypeError("Invalid input: " + typeof K);
      }
      const N = {
        WHITESPACE: /[ \t\r\n]/,
        DIGIT: /[\d]/,
        SIGN: /[-+]/,
        POINT: /\./,
        COMMA: /,/,
        EXP: /e/i,
        FLAGS: /[01]/
      };
      const he = 0;
      const ve = 1;
      const de = 2;
      const xe = 3;
      let ee = he;
      let Ue = true;
      let fe = "";
      let Se = "";
      const Me = [];
      function Be(Ye, st, W) {
        const O = new SyntaxError("Unexpected character \"" + Ye + "\" at index " + st + ".");
        O.partial = W;
        throw O;
      }
      function se() {
        if (fe !== "") {
          if (Se === "") {
            Me.push(Number(fe));
          } else {
            Me.push(Number(fe) * Math.pow(10, Number(Se)));
          }
        }
        fe = "";
        Se = "";
      }
      let $;
      const Oe = K.length;
      for (let Ye = 0; Ye < Oe; Ye++) {
        $ = K[Ye];
        if (Array.isArray(G) && G.includes(Me.length % U) && N.FLAGS.test($)) {
          ee = ve;
          fe = $;
          se();
          continue;
        }
        if (ee === he) {
          if (N.WHITESPACE.test($)) {
            continue;
          }
          if (N.DIGIT.test($) || N.SIGN.test($)) {
            ee = ve;
            fe = $;
            continue;
          }
          if (N.POINT.test($)) {
            ee = de;
            fe = $;
            continue;
          }
          if (N.COMMA.test($)) {
            if (Ue) {
              Be($, Ye, Me);
            }
            Ue = true;
          }
        }
        if (ee === ve) {
          if (N.DIGIT.test($)) {
            fe += $;
            continue;
          }
          if (N.POINT.test($)) {
            fe += $;
            ee = de;
            continue;
          }
          if (N.EXP.test($)) {
            ee = xe;
            continue;
          }
          if (N.SIGN.test($) && fe.length === 1 && N.SIGN.test(fe[0])) {
            Be($, Ye, Me);
          }
        }
        if (ee === de) {
          if (N.DIGIT.test($)) {
            fe += $;
            continue;
          }
          if (N.EXP.test($)) {
            ee = xe;
            continue;
          }
          if (N.POINT.test($) && fe[fe.length - 1] === ".") {
            Be($, Ye, Me);
          }
        }
        if (ee === xe) {
          if (N.DIGIT.test($)) {
            Se += $;
            continue;
          }
          if (N.SIGN.test($)) {
            if (Se === "") {
              Se += $;
              continue;
            }
            if (Se.length === 1 && N.SIGN.test(Se)) {
              Be($, Ye, Me);
            }
          }
        }
        if (N.WHITESPACE.test($)) {
          se();
          ee = he;
          Ue = false;
        } else if (N.COMMA.test($)) {
          se();
          ee = he;
          Ue = true;
        } else if (N.SIGN.test($)) {
          se();
          ee = ve;
          fe = $;
        } else if (N.POINT.test($)) {
          se();
          ee = de;
          fe = $;
        } else {
          Be($, Ye, Me);
        }
      }
      se();
      return Me;
    }
    const b = ["mm", "cm", "in", "pt", "pc", "px"];
    const C = {
      mm: {
        mm: 1,
        cm: 0.1,
        in: 1 / 25.4,
        pt: 72 / 25.4,
        pc: 6 / 25.4,
        px: -1
      },
      cm: {
        mm: 10,
        cm: 1,
        in: 1 / 2.54,
        pt: 72 / 2.54,
        pc: 6 / 2.54,
        px: -1
      },
      in: {
        mm: 25.4,
        cm: 2.54,
        in: 1,
        pt: 72,
        pc: 6,
        px: -1
      },
      pt: {
        mm: 25.4 / 72,
        cm: 2.54 / 72,
        in: 1 / 72,
        pt: 1,
        pc: 6 / 72,
        px: -1
      },
      pc: {
        mm: 25.4 / 6,
        cm: 2.54 / 6,
        in: 1 / 6,
        pt: 12,
        pc: 1,
        px: -1
      },
      px: {
        px: 1
      }
    };
    function w(K) {
      let G = "px";
      if (typeof K == "string" || K instanceof String) {
        for (let N = 0, he = b.length; N < he; N++) {
          const ve = b[N];
          if (K.endsWith(ve)) {
            G = ve;
            K = K.substring(0, K.length - ve.length);
            break;
          }
        }
      }
      let U;
      if (G === "px" && t.defaultUnit !== "px") {
        U = C.in[t.defaultUnit] / t.defaultDPI;
      } else {
        U = C[G][t.defaultUnit];
        if (U < 0) {
          U = C[G].in * t.defaultDPI;
        }
      }
      return U * parseFloat(K);
    }
    function R(K) {
      if (!K.hasAttribute("transform") && (K.nodeName !== "use" || !K.hasAttribute("x") && !K.hasAttribute("y"))) {
        return null;
      }
      const G = E(K);
      if (z.length > 0) {
        G.premultiply(z[z.length - 1]);
      }
      te.copy(G);
      z.push(G);
      return G;
    }
    function E(K) {
      const G = new Matrix3();
      const U = j;
      if (K.nodeName === "use" && (K.hasAttribute("x") || K.hasAttribute("y"))) {
        const N = w(K.getAttribute("x"));
        const he = w(K.getAttribute("y"));
        G.translate(N, he);
      }
      if (K.hasAttribute("transform")) {
        const N = K.getAttribute("transform").split(")");
        for (let he = N.length - 1; he >= 0; he--) {
          const ve = N[he].trim();
          if (ve === "") {
            continue;
          }
          const de = ve.indexOf("(");
          const xe = ve.length;
          if (de > 0 && de < xe) {
            const ee = ve.slice(0, de);
            const Ue = S(ve.slice(de + 1));
            U.identity();
            switch (ee) {
              case "translate":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = 0;
                  if (Ue.length >= 2) {
                    Se = Ue[1];
                  }
                  U.translate(fe, Se);
                }
                break;
              case "rotate":
                if (Ue.length >= 1) {
                  let fe = 0;
                  let Se = 0;
                  let Me = 0;
                  fe = Ue[0] * Math.PI / 180;
                  if (Ue.length >= 3) {
                    Se = Ue[1];
                    Me = Ue[2];
                  }
                  X.makeTranslation(-Se, -Me);
                  Z.makeRotation(fe);
                  q.multiplyMatrices(Z, X);
                  X.makeTranslation(Se, Me);
                  U.multiplyMatrices(X, q);
                }
                break;
              case "scale":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = fe;
                  if (Ue.length >= 2) {
                    Se = Ue[1];
                  }
                  U.scale(fe, Se);
                }
                break;
              case "skewX":
                if (Ue.length === 1) {
                  U.set(1, Math.tan(Ue[0] * Math.PI / 180), 0, 0, 1, 0, 0, 0, 1);
                }
                break;
              case "skewY":
                if (Ue.length === 1) {
                  U.set(1, 0, 0, Math.tan(Ue[0] * Math.PI / 180), 1, 0, 0, 0, 1);
                }
                break;
              case "matrix":
                if (Ue.length === 6) {
                  U.set(Ue[0], Ue[2], Ue[4], Ue[1], Ue[3], Ue[5], 0, 0, 1);
                }
                break;
            }
          }
          G.premultiply(U);
        }
      }
      return G;
    }
    function I(K, G) {
      function U(de) {
        oe.set(de.x, de.y, 1).applyMatrix3(G);
        de.set(oe.x, oe.y);
      }
      function N(de) {
        const xe = de.xRadius;
        const ee = de.yRadius;
        const Ue = Math.cos(de.aRotation);
        const fe = Math.sin(de.aRotation);
        const Se = new Vector3(xe * Ue, xe * fe, 0);
        const Me = new Vector3(-ee * fe, ee * Ue, 0);
        const Be = Se.applyMatrix3(G);
        const se = Me.applyMatrix3(G);
        const $ = j.set(Be.x, se.x, 0, Be.y, se.y, 0, 0, 0, 1);
        const Oe = X.copy($).invert();
        const W = Z.copy(Oe).transpose().multiply(Oe).elements;
        const O = ne(W[0], W[1], W[4]);
        const me = Math.sqrt(O.rt1);
        const Ie = Math.sqrt(O.rt2);
        de.xRadius = 1 / me;
        de.yRadius = 1 / Ie;
        de.aRotation = Math.atan2(O.sn, O.cs);
        if (!((de.aEndAngle - de.aStartAngle) % (Math.PI * 2) < Number.EPSILON)) {
          const Y = X.set(me, 0, 0, 0, Ie, 0, 0, 0, 1);
          const we = Z.set(O.cs, O.sn, 0, -O.sn, O.cs, 0, 0, 0, 1);
          const Ee = Y.multiply(we).multiply($);
          const Fe = Xe => {
            const {
              x: tt,
              y: Re
            } = new Vector3(Math.cos(Xe), Math.sin(Xe), 0).applyMatrix3(Ee);
            return Math.atan2(Re, tt);
          };
          de.aStartAngle = Fe(de.aStartAngle);
          de.aEndAngle = Fe(de.aEndAngle);
          if (F(G)) {
            de.aClockwise = !de.aClockwise;
          }
        }
      }
      function he(de) {
        const xe = L(G);
        const ee = D(G);
        de.xRadius *= xe;
        de.yRadius *= ee;
        const Ue = xe > Number.EPSILON ? Math.atan2(G.elements[1], G.elements[0]) : Math.atan2(-G.elements[3], G.elements[4]);
        de.aRotation += Ue;
        if (F(G)) {
          de.aStartAngle *= -1;
          de.aEndAngle *= -1;
          de.aClockwise = !de.aClockwise;
        }
      }
      const ve = K.subPaths;
      for (let de = 0, xe = ve.length; de < xe; de++) {
        const Ue = ve[de].curves;
        for (let fe = 0; fe < Ue.length; fe++) {
          const Se = Ue[fe];
          if (Se.isLineCurve) {
            U(Se.v1);
            U(Se.v2);
          } else if (Se.isCubicBezierCurve) {
            U(Se.v0);
            U(Se.v1);
            U(Se.v2);
            U(Se.v3);
          } else if (Se.isQuadraticBezierCurve) {
            U(Se.v0);
            U(Se.v1);
            U(Se.v2);
          } else if (Se.isEllipseCurve) {
            ue.set(Se.aX, Se.aY);
            U(ue);
            Se.aX = ue.x;
            Se.aY = ue.y;
            if (k(G)) {
              N(Se);
            } else {
              he(Se);
            }
          }
        }
      }
    }
    function F(K) {
      const G = K.elements;
      return G[0] * G[4] - G[1] * G[3] < 0;
    }
    function k(K) {
      const G = K.elements;
      const U = G[0] * G[3] + G[1] * G[4];
      if (U === 0) {
        return false;
      }
      const N = L(K);
      const he = D(K);
      return Math.abs(U / (N * he)) > Number.EPSILON;
    }
    function L(K) {
      const G = K.elements;
      return Math.sqrt(G[0] * G[0] + G[1] * G[1]);
    }
    function D(K) {
      const G = K.elements;
      return Math.sqrt(G[3] * G[3] + G[4] * G[4]);
    }
    function ne(K, G, U) {
      let N;
      let he;
      let ve;
      let de;
      let xe;
      const ee = K + U;
      const Ue = K - U;
      const fe = Math.sqrt(Ue * Ue + G * 4 * G);
      if (ee > 0) {
        N = (ee + fe) * 0.5;
        xe = 1 / N;
        he = K * xe * U - G * xe * G;
      } else if (ee < 0) {
        he = (ee - fe) * 0.5;
      } else {
        N = fe * 0.5;
        he = fe * -0.5;
      }
      if (Ue > 0) {
        ve = Ue + fe;
      } else {
        ve = Ue - fe;
      }
      if (Math.abs(ve) > Math.abs(G) * 2) {
        xe = G * -2 / ve;
        de = 1 / Math.sqrt(1 + xe * xe);
        ve = xe * de;
      } else if (Math.abs(G) === 0) {
        ve = 1;
        de = 0;
      } else {
        xe = ve * -0.5 / G;
        ve = 1 / Math.sqrt(1 + xe * xe);
        de = xe * ve;
      }
      if (Ue > 0) {
        xe = ve;
        ve = -de;
        de = xe;
      }
      return {
        rt1: N,
        rt2: he,
        cs: ve,
        sn: de
      };
    }
    const re = [];
    const ce = {};
    const z = [];
    const j = new Matrix3();
    const X = new Matrix3();
    const Z = new Matrix3();
    const q = new Matrix3();
    const ue = new Vector2();
    const oe = new Vector3();
    const te = new Matrix3();
    const le = new DOMParser().parseFromString(e, "image/svg+xml");
    r(le.documentElement, {
      fill: "#000",
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeLineJoin: "miter",
      strokeLineCap: "butt",
      strokeMiterLimit: 4
    });
    return {
      paths: re,
      xml: le.documentElement
    };
  }
  createShapes(e) {
    const r = {
      ORIGIN: 0,
      DESTINATION: 1,
      BETWEEN: 2,
      LEFT: 3,
      RIGHT: 4,
      BEHIND: 5,
      BEYOND: 6
    };
    const n = {
      loc: r.ORIGIN,
      t: 0
    };
    function a(M, S, b, C) {
      const w = M.x;
      const R = S.x;
      const E = b.x;
      const I = C.x;
      const F = M.y;
      const k = S.y;
      const L = b.y;
      const D = C.y;
      const ne = (I - E) * (F - L) - (D - L) * (w - E);
      const re = (R - w) * (F - L) - (k - F) * (w - E);
      const ce = (D - L) * (R - w) - (I - E) * (k - F);
      const z = ne / ce;
      const j = re / ce;
      if (ce === 0 && ne !== 0 || z <= 0 || z >= 1 || j < 0 || j > 1) {
        return null;
      }
      if (ne === 0 && ce === 0) {
        for (let X = 0; X < 2; X++) {
          l(X === 0 ? b : C, M, S);
          if (n.loc == r.ORIGIN) {
            const Z = X === 0 ? b : C;
            return {
              x: Z.x,
              y: Z.y,
              t: n.t
            };
          } else if (n.loc == r.BETWEEN) {
            const Z = +(w + n.t * (R - w)).toPrecision(10);
            const q = +(F + n.t * (k - F)).toPrecision(10);
            return {
              x: Z,
              y: q,
              t: n.t
            };
          }
        }
        return null;
      } else {
        for (let q = 0; q < 2; q++) {
          l(q === 0 ? b : C, M, S);
          if (n.loc == r.ORIGIN) {
            const ue = q === 0 ? b : C;
            return {
              x: ue.x,
              y: ue.y,
              t: n.t
            };
          }
        }
        const X = +(w + z * (R - w)).toPrecision(10);
        const Z = +(F + z * (k - F)).toPrecision(10);
        return {
          x: X,
          y: Z,
          t: z
        };
      }
    }
    function l(M, S, b) {
      const C = b.x - S.x;
      const w = b.y - S.y;
      const R = M.x - S.x;
      const E = M.y - S.y;
      const I = C * E - R * w;
      if (M.x === S.x && M.y === S.y) {
        n.loc = r.ORIGIN;
        n.t = 0;
        return;
      }
      if (M.x === b.x && M.y === b.y) {
        n.loc = r.DESTINATION;
        n.t = 1;
        return;
      }
      if (I < -Number.EPSILON) {
        n.loc = r.LEFT;
        return;
      }
      if (I > Number.EPSILON) {
        n.loc = r.RIGHT;
        return;
      }
      if (C * R < 0 || w * E < 0) {
        n.loc = r.BEHIND;
        return;
      }
      if (Math.sqrt(C * C + w * w) < Math.sqrt(R * R + E * E)) {
        n.loc = r.BEYOND;
        return;
      }
      let F;
      if (C !== 0) {
        F = R / C;
      } else {
        F = E / w;
      }
      n.loc = r.BETWEEN;
      n.t = F;
    }
    function c(M, S) {
      const b = [];
      const C = [];
      for (let w = 1; w < M.length; w++) {
        const R = M[w - 1];
        const E = M[w];
        for (let I = 1; I < S.length; I++) {
          const F = S[I - 1];
          const k = S[I];
          const L = a(R, E, F, k);
          if (L !== null && b.find(D => D.t <= L.t + Number.EPSILON && D.t >= L.t - Number.EPSILON) === undefined) {
            b.push(L);
            C.push(new Vector2(L.x, L.y));
          }
        }
      }
      return C;
    }
    function u(M, S, b) {
      const C = new Vector2();
      S.getCenter(C);
      const w = [];
      b.forEach(R => {
        if (R.boundingBox.containsPoint(C)) {
          c(M, R.points).forEach(I => {
            w.push({
              identifier: R.identifier,
              isCW: R.isCW,
              point: I
            });
          });
        }
      });
      w.sort((R, E) => R.point.x - E.point.x);
      return w;
    }
    function f(M, S, b, C, w) {
      if (w == null || w === "") {
        w = "nonzero";
      }
      const R = new Vector2();
      M.boundingBox.getCenter(R);
      const E = [new Vector2(b, R.y), new Vector2(C, R.y)];
      const I = u(E, M.boundingBox, S);
      I.sort((re, ce) => re.point.x - ce.point.x);
      const F = [];
      const k = [];
      I.forEach(re => {
        if (re.identifier === M.identifier) {
          F.push(re);
        } else {
          k.push(re);
        }
      });
      const L = F[0].point.x;
      const D = [];
      let ne = 0;
      while (ne < k.length && k[ne].point.x < L) {
        if (D.length > 0 && D[D.length - 1] === k[ne].identifier) {
          D.pop();
        } else {
          D.push(k[ne].identifier);
        }
        ne++;
      }
      D.push(M.identifier);
      if (w === "evenodd") {
        const re = D.length % 2 === 0;
        const ce = D[D.length - 2];
        return {
          identifier: M.identifier,
          isHole: re,
          for: ce
        };
      } else if (w === "nonzero") {
        let re = true;
        let ce = null;
        let z = null;
        for (let j = 0; j < D.length; j++) {
          const X = D[j];
          if (re) {
            z = S[X].isCW;
            re = false;
            ce = X;
          } else if (z !== S[X].isCW) {
            z = S[X].isCW;
            re = true;
          }
        }
        return {
          identifier: M.identifier,
          isHole: re,
          for: ce
        };
      } else {
        console.warn("fill-rule: \"" + w + "\" is currently not implemented.");
      }
    }
    let p = 999999999;
    let g = -999999999;
    let v = e.subPaths.map(M => {
      const S = M.getPoints();
      let b = -999999999;
      let C = 999999999;
      let w = -999999999;
      let R = 999999999;
      for (let E = 0; E < S.length; E++) {
        const I = S[E];
        if (I.y > b) {
          b = I.y;
        }
        if (I.y < C) {
          C = I.y;
        }
        if (I.x > w) {
          w = I.x;
        }
        if (I.x < R) {
          R = I.x;
        }
      }
      if (g <= w) {
        g = w + 1;
      }
      if (p >= R) {
        p = R - 1;
      }
      return {
        curves: M.curves,
        points: S,
        isCW: ShapeUtils.isClockWise(S),
        identifier: -1,
        boundingBox: new Box2(new Vector2(R, C), new Vector2(w, b))
      };
    });
    v = v.filter(M => M.points.length > 1);
    for (let M = 0; M < v.length; M++) {
      v[M].identifier = M;
    }
    const _ = v.map(M => f(M, v, p, g, e.userData ? e.userData.style.fillRule : undefined));
    const T = [];
    v.forEach(M => {
      if (!_[M.identifier].isHole) {
        const b = new Shape();
        b.curves = M.curves;
        _.filter(w => w.isHole && w.for === M.identifier).forEach(w => {
          const R = v[w.identifier];
          const E = new Path();
          E.curves = R.curves;
          b.holes.push(E);
        });
        T.push(b);
      }
    });
    return T;
  }
  getStrokeStyle(e, t, r, n, a) {
    e = e !== undefined ? e : 1;
    t = t !== undefined ? t : "#000";
    r = r !== undefined ? r : "miter";
    n = n !== undefined ? n : "butt";
    a = a !== undefined ? a : 4;
    return {
      strokeColor: t,
      strokeWidth: e,
      strokeLineJoin: r,
      strokeLineCap: n,
      strokeMiterLimit: a
    };
  }
  pointsToStroke(e, t, r, n) {
    const a = [];
    const l = [];
    const c = [];
    if (SVGLoader.pointsToStrokeWithBuffers(e, t, r, n, a, l, c) === 0) {
      return null;
    }
    const u = new BufferGeometry();
    u.setAttribute("position", new Float32BufferAttribute(a, 3));
    u.setAttribute("normal", new Float32BufferAttribute(l, 3));
    u.setAttribute("uv", new Float32BufferAttribute(c, 2));
    return u;
  }
  pointsToStrokeWithBuffers(e, t, r, n, a, l, c, u) {
    const f = new Vector2();
    const p = new Vector2();
    const g = new Vector2();
    const v = new Vector2();
    const _ = new Vector2();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector2();
    const C = new Vector2();
    const w = new Vector2();
    const R = new Vector2();
    const E = new Vector2();
    const I = new Vector2();
    const F = new Vector2();
    const k = new Vector2();
    const L = new Vector2();
    r = r !== undefined ? r : 12;
    n = n !== undefined ? n : 0.001;
    u = u !== undefined ? u : 0;
    e = Ue(e);
    const D = e.length;
    if (D < 2) {
      return 0;
    }
    const ne = e[0].equals(e[D - 1]);
    let re;
    let ce = e[0];
    let z;
    const j = t.strokeWidth / 2;
    const X = 1 / (D - 1);
    let Z = 0;
    let q;
    let ue;
    let oe;
    let te;
    let le = false;
    let Te = 0;
    let K = u * 3;
    let G = u * 2;
    U(e[0], e[1], f).multiplyScalar(j);
    S.copy(e[0]).sub(f);
    b.copy(e[0]).add(f);
    C.copy(S);
    w.copy(b);
    for (let fe = 1; fe < D; fe++) {
      re = e[fe];
      if (fe === D - 1) {
        if (ne) {
          z = e[1];
        } else {
          z = undefined;
        }
      } else {
        z = e[fe + 1];
      }
      const Se = f;
      U(ce, re, Se);
      g.copy(Se).multiplyScalar(j);
      R.copy(re).sub(g);
      E.copy(re).add(g);
      q = Z + X;
      ue = false;
      if (z !== undefined) {
        U(re, z, p);
        g.copy(p).multiplyScalar(j);
        I.copy(re).sub(g);
        F.copy(re).add(g);
        oe = true;
        g.subVectors(z, ce);
        if (Se.dot(g) < 0) {
          oe = false;
        }
        if (fe === 1) {
          le = oe;
        }
        g.subVectors(z, re);
        g.normalize();
        const Me = Math.abs(Se.dot(g));
        if (Me > Number.EPSILON) {
          const Be = j / Me;
          g.multiplyScalar(-Be);
          v.subVectors(re, ce);
          _.copy(v).setLength(Be).add(g);
          k.copy(_).negate();
          const se = _.length();
          const $ = v.length();
          v.divideScalar($);
          T.subVectors(z, re);
          const Oe = T.length();
          T.divideScalar(Oe);
          if (v.dot(k) < $ && T.dot(k) < Oe) {
            ue = true;
          }
          L.copy(_).add(re);
          k.add(re);
          te = false;
          if (ue) {
            if (oe) {
              F.copy(k);
              E.copy(k);
            } else {
              I.copy(k);
              R.copy(k);
            }
          } else {
            ve();
          }
          switch (t.strokeLineJoin) {
            case "bevel":
              de(oe, ue, q);
              break;
            case "round":
              xe(oe, ue);
              if (oe) {
                he(re, R, I, q, 0);
              } else {
                he(re, F, E, q, 1);
              }
              break;
            case "miter":
            case "miter-clip":
            default:
              const Ye = j * t.strokeMiterLimit / se;
              if (Ye < 1) {
                if (t.strokeLineJoin !== "miter-clip") {
                  de(oe, ue, q);
                  break;
                } else {
                  xe(oe, ue);
                  if (oe) {
                    T.subVectors(L, R).multiplyScalar(Ye).add(R);
                    M.subVectors(L, I).multiplyScalar(Ye).add(I);
                    N(R, q, 0);
                    N(T, q, 0);
                    N(re, q, 0.5);
                    N(re, q, 0.5);
                    N(T, q, 0);
                    N(M, q, 0);
                    N(re, q, 0.5);
                    N(M, q, 0);
                    N(I, q, 0);
                  } else {
                    T.subVectors(L, E).multiplyScalar(Ye).add(E);
                    M.subVectors(L, F).multiplyScalar(Ye).add(F);
                    N(E, q, 1);
                    N(T, q, 1);
                    N(re, q, 0.5);
                    N(re, q, 0.5);
                    N(T, q, 1);
                    N(M, q, 1);
                    N(re, q, 0.5);
                    N(M, q, 1);
                    N(F, q, 1);
                  }
                }
              } else {
                if (ue) {
                  if (oe) {
                    N(b, Z, 1);
                    N(S, Z, 0);
                    N(L, q, 0);
                    N(b, Z, 1);
                    N(L, q, 0);
                    N(k, q, 1);
                  } else {
                    N(b, Z, 1);
                    N(S, Z, 0);
                    N(L, q, 1);
                    N(S, Z, 0);
                    N(k, q, 0);
                    N(L, q, 1);
                  }
                  if (oe) {
                    I.copy(L);
                  } else {
                    F.copy(L);
                  }
                } else if (oe) {
                  N(R, q, 0);
                  N(L, q, 0);
                  N(re, q, 0.5);
                  N(re, q, 0.5);
                  N(L, q, 0);
                  N(I, q, 0);
                } else {
                  N(E, q, 1);
                  N(L, q, 1);
                  N(re, q, 0.5);
                  N(re, q, 0.5);
                  N(L, q, 1);
                  N(F, q, 1);
                }
                te = true;
              }
              break;
          }
        } else {
          ve();
        }
      } else {
        ve();
      }
      if (!ne && fe === D - 1) {
        ee(e[0], C, w, oe, true, Z);
      }
      Z = q;
      ce = re;
      S.copy(I);
      b.copy(F);
    }
    if (!ne) {
      ee(re, R, E, oe, false, q);
    } else if (ue && a) {
      let fe = L;
      let Se = k;
      if (le !== oe) {
        fe = k;
        Se = L;
      }
      if (oe) {
        if (te || le) {
          Se.toArray(a, 0);
          Se.toArray(a, 9);
          if (te) {
            fe.toArray(a, 3);
          }
        }
      } else if (te || !le) {
        Se.toArray(a, 3);
        Se.toArray(a, 9);
        if (te) {
          fe.toArray(a, 0);
        }
      }
    }
    return Te;
    function U(fe, Se, Me) {
      Me.subVectors(Se, fe);
      return Me.set(-Me.y, Me.x).normalize();
    }
    function N(fe, Se, Me) {
      if (a) {
        a[K] = fe.x;
        a[K + 1] = fe.y;
        a[K + 2] = 0;
        if (l) {
          l[K] = 0;
          l[K + 1] = 0;
          l[K + 2] = 1;
        }
        K += 3;
        if (c) {
          c[G] = Se;
          c[G + 1] = Me;
          G += 2;
        }
      }
      Te += 3;
    }
    function he(fe, Se, Me, Be, se) {
      f.copy(Se).sub(fe).normalize();
      p.copy(Me).sub(fe).normalize();
      let $ = Math.PI;
      const Oe = f.dot(p);
      if (Math.abs(Oe) < 1) {
        $ = Math.abs(Math.acos(Oe));
      }
      $ /= r;
      g.copy(Se);
      for (let Ye = 0, st = r - 1; Ye < st; Ye++) {
        v.copy(g).rotateAround(fe, $);
        N(g, Be, se);
        N(v, Be, se);
        N(fe, Be, 0.5);
        g.copy(v);
      }
      N(v, Be, se);
      N(Me, Be, se);
      N(fe, Be, 0.5);
    }
    function ve() {
      N(b, Z, 1);
      N(S, Z, 0);
      N(R, q, 0);
      N(b, Z, 1);
      N(R, q, 1);
      N(E, q, 0);
    }
    function de(fe, Se, Me) {
      if (Se) {
        if (fe) {
          N(b, Z, 1);
          N(S, Z, 0);
          N(R, q, 0);
          N(b, Z, 1);
          N(R, q, 0);
          N(k, q, 1);
          N(R, Me, 0);
          N(I, Me, 0);
          N(k, Me, 0.5);
        } else {
          N(b, Z, 1);
          N(S, Z, 0);
          N(E, q, 1);
          N(S, Z, 0);
          N(k, q, 0);
          N(E, q, 1);
          N(E, Me, 1);
          N(F, Me, 0);
          N(k, Me, 0.5);
        }
      } else if (fe) {
        N(R, Me, 0);
        N(I, Me, 0);
        N(re, Me, 0.5);
      } else {
        N(E, Me, 1);
        N(F, Me, 0);
        N(re, Me, 0.5);
      }
    }
    function xe(fe, Se) {
      if (Se) {
        if (fe) {
          N(b, Z, 1);
          N(S, Z, 0);
          N(R, q, 0);
          N(b, Z, 1);
          N(R, q, 0);
          N(k, q, 1);
          N(R, Z, 0);
          N(re, q, 0.5);
          N(k, q, 1);
          N(re, q, 0.5);
          N(I, Z, 0);
          N(k, q, 1);
        } else {
          N(b, Z, 1);
          N(S, Z, 0);
          N(E, q, 1);
          N(S, Z, 0);
          N(k, q, 0);
          N(E, q, 1);
          N(E, Z, 1);
          N(k, q, 0);
          N(re, q, 0.5);
          N(re, q, 0.5);
          N(k, q, 0);
          N(F, Z, 1);
        }
      }
    }
    function ee(fe, Se, Me, Be, se, $) {
      switch (t.strokeLineCap) {
        case "round":
          if (se) {
            he(fe, Me, Se, $, 0.5);
          } else {
            he(fe, Se, Me, $, 0.5);
          }
          break;
        case "square":
          if (se) {
            f.subVectors(Se, fe);
            p.set(f.y, -f.x);
            g.addVectors(f, p).add(fe);
            v.subVectors(p, f).add(fe);
            if (Be) {
              g.toArray(a, 3);
              v.toArray(a, 0);
              v.toArray(a, 9);
            } else {
              g.toArray(a, 3);
              g.toArray(a, 9);
              v.toArray(a, 0);
            }
          } else {
            f.subVectors(Me, fe);
            p.set(f.y, -f.x);
            g.addVectors(f, p).add(fe);
            v.subVectors(p, f).add(fe);
            const Oe = a.length;
            if (Be) {
              g.toArray(a, Oe - 3);
              v.toArray(a, Oe - 6);
              v.toArray(a, Oe - 12);
            } else {
              g.toArray(a, Oe - 6);
              v.toArray(a, Oe - 3);
              v.toArray(a, Oe - 12);
            }
          }
          break;
      }
    }
    function Ue(fe) {
      let Se = false;
      for (let Be = 1, se = fe.length - 1; Be < se; Be++) {
        if (fe[Be].distanceTo(fe[Be + 1]) < n) {
          Se = true;
          break;
        }
      }
      if (!Se) {
        return fe;
      }
      const Me = [];
      Me.push(fe[0]);
      for (let Be = 1, se = fe.length - 1; Be < se; Be++) {
        if (fe[Be].distanceTo(fe[Be + 1]) >= n) {
          Me.push(fe[Be]);
        }
      }
      Me.push(fe[fe.length - 1]);
      return Me;
    }
  }
}
const svgParser = new SVGParser();
const titleVert = `#define GLSLIFY 1
#ifdef IS_EDGE
attribute vec2 instancedPositionA;attribute vec2 instancedPositionB;varying vec2 v_toNode;uniform float u_radius;
#endif
uniform float u_scrollRatio;
#include <ufxVert>
varying vec2 v_uv;varying float v_ddd;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){
#ifdef IS_EDGE
bool isTop=position.y>0.;vec3 pos=vec3(isTop ? instancedPositionA : instancedPositionB,0.0);
#else
vec3 pos=position;
#endif
float lineRatio=floor(pos.y*6.)/6.;pos*=1.5;pos.x-=linearStep(lineRatio*0.4,0.56+lineRatio*0.4,u_scrollRatio)*0.5;vec3 basePos=getBasePosition(pos);vec3 screenPos=getScreenPosition(basePos);
#ifdef IS_EDGE
vec2 vAB=(instancedPositionA-instancedPositionB)*u_domWH;float angle=atan(vAB.y,vAB.x)+3.1415926*0.5;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);v_toNode=m*(position.xy*vec2(1.,step(0.5,abs(position.y))));screenPos.xy+=v_toNode*u_radius;
#endif
gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv*0.002);}`;
const titleFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform sampler2D u_gradientTexture;uniform vec2 u_screenPaintTextureSize;uniform vec2 u_resolution;uniform float u_time;uniform float u_invertRatio;uniform sampler2D u_texture;varying vec2 v_uv;
#ifdef IS_EDGE
varying vec2 v_toNode;
#endif
#include <getBlueNoise>
#include <textureBicubic>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(38.,27.));vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec4 screenPaintData=textureBicubic(u_screenPaintTexture,screenPaintUv,u_screenPaintTextureSize);float timeOffset=u_time;
#ifdef IS_EDGE
timeOffset+=3.1415926;
#endif
float d=cos((screenPaintUv.x+screenPaintUv.y)*4.+timeOffset)*0.5+0.5;float screenPaintStrength=1.;float constantStrength=0.;float alpha=1.0;
#ifdef IS_EDGE
vec2 toNode=v_toNode;float toNodeDist=length(toNode);alpha=smoothstep(1.0+fwidth(toNodeDist),1.0,toNodeDist);screenPaintStrength=4.;vec3 baseColor=vec3(0.004+d*d*0.15);constantStrength=max(0.,d*2.-1.)*0.15;
#else
vec3 baseColor=vec3(0.004+d*d*0.015);
#endif
float hue=(screenPaintData.x+screenPaintData.y)*1.5+d*2.;vec3 color=mix(baseColor,texture2D(u_gradientTexture,vec2(hue,0.0)).rgb,max(screenPaintData.z,screenPaintData.w)*screenPaintStrength+constantStrength)+noise.x*0.004;gl_FragColor=vec4(mix(color,1.-color,u_invertRatio),alpha);}`;
class PostUfx extends Ufx {
  renderOrder = 100;
}
const postUfx = new PostUfx();
class AboutAwardSection {
  domContainer;
  domTitle;
  domCapabilitySectionContainer;
  offsetY = 0;
  showItemPerSecond = 10;
  _needsReset = true;
  isSectionWasActive = false;
  preInit(e) {
    this.domContainer = e.querySelector("#about-award");
    this.domTitle = e.querySelector("#about-award-title");
    this.domHeaders = Array.from(e.querySelectorAll(".about-award-header"));
    this.domItems = Array.from(e.querySelectorAll(".about-award-item"));
    for (let l = 0; l < this.domHeaders.length; l++) {
      let c = this.domHeaders[l];
      let u = c.querySelector(".about-award-header-title");
      let f = c.querySelector(".about-award-header-svg");
      let p = c.querySelector(".about-award-header-text");
      u._splitted = new SplitType(u, {
        types: "chars"
      });
      p._splitted = new SplitType(p, {
        types: "chars"
      });
      c._title = u;
      c._svg = f;
      c._number = p;
      c._animating = false;
      c._time = 0;
    }
    for (let l = 0; l < this.domItems.length; l++) {
      let c = this.domItems[l];
      let u = c.querySelector(".about-award-line");
      let f = Array.from(c.querySelectorAll(".about-award-item-wrapper"));
      c._animating = false;
      c._time = 0;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        let v = Array.from(g.querySelectorAll(".about-award-item-wrapper-text"));
        for (let _ = 0; _ < v.length; _++) {
          let T = v[_];
          T._splitted = new SplitType(T, {
            types: "words"
          });
        }
        g._texts = v;
      }
      c._line = u;
      c._wrappers = f;
    }
    this.domCapabilitySectionContainer = e.querySelector("#about-capability");
    let t = svgParser.createShapes(svgParser.parse(this.domTitle.outerHTML).paths[0]);
    let r = new ShapeGeometry(t);
    r.scale(1 / 1438, 1 / 1252, 1);
    let n = this._generateEdgeIndices(r);
    let a = properties.loader.add(settings.TEXTURE_PATH + "award_gradient.png", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    a.wrapS = a.wrapT = RepeatWrapping;
    this.titleEdgeMesh = new UfxMesh({
      refDom: this.domTitle,
      geometry: n,
      uniforms: Object.assign({
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
        u_screenPaintTextureSize: screenPaint.sharedUniforms.u_paintTextureSize,
        u_time: properties.sharedUniforms.u_time,
        u_gradientTexture: {
          value: a
        },
        u_radius: {
          value: 2
        },
        u_invertRatio: {
          value: 0
        },
        u_scrollRatio: {
          value: 0
        }
      }, blueNoise.sharedUniforms),
      vertexShader: titleVert,
      fragmentShader: titleFrag
    });
    this.titleEdgeMesh.material.defines.IS_EDGE = true;
    aboutPage.postUfxContainer.add(this.titleEdgeMesh);
    this.titleMesh = new UfxMesh({
      refDom: this.domTitle,
      geometry: r,
      uniforms: this.titleEdgeMesh.material.uniforms,
      vertexShader: titleVert,
      fragmentShader: titleFrag
    });
    this.titleMesh.renderOrder = 1;
    aboutPage.postUfxContainer.add(this.titleMesh);
  }
  _generateEdgeIndices(e) {
    let t = {};
    let r = [];
    let n = [];
    let a = e.attributes.position.array;
    let l = e.index.array;
    for (let p = 0; p < l.length; p += 3) {
      let g = l[p];
      let v = l[p + 1];
      let _ = l[p + 2];
      let T = g < v ? `${g}_${v}` : `${v}_${g}`;
      let M = v < _ ? `${v}_${_}` : `${_}_${v}`;
      let S = _ < g ? `${_}_${g}` : `${g}_${_}`;
      if (t[T]) {
        t[T].count++;
      } else {
        t[T] = {
          count: 1,
          p0: g,
          p1: v
        };
      }
      if (t[M]) {
        t[M].count++;
      } else {
        t[M] = {
          count: 1,
          p0: v,
          p1: _
        };
      }
      if (t[S]) {
        t[S].count++;
      } else {
        t[S] = {
          count: 1,
          p0: _,
          p1: g
        };
      }
    }
    let c = 0;
    for (let p in t) {
      let g = t[p];
      if (g.count === 1) {
        r[c] = a[g.p0 * 3];
        n[c] = a[g.p1 * 3];
        c++;
        r[c] = a[g.p0 * 3 + 1];
        n[c] = a[g.p1 * 3 + 1];
        c++;
      }
    }
    let u = new PlaneGeometry(2, 2, 1, 3);
    let f = new InstancedBufferGeometry();
    f.index = u.index;
    f.attributes.position = u.attributes.position;
    f.attributes.instancedPositionA = new InstancedBufferAttribute(new Float32Array(r), 2);
    f.attributes.instancedPositionB = new InstancedBufferAttribute(new Float32Array(n), 2);
    return f;
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    this._splitText();
    this.titleMesh.syncDom(-scrollManager.scrollPixel);
    this.titleEdgeMesh.syncDom(-scrollManager.scrollPixel);
    this.titleEdgeMesh.material.uniforms.u_radius.value = Math.max(1, properties.viewportWidth / 1200);
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    this.titleMesh.visible = r;
    this.titleEdgeMesh.visible = r;
    if (this.titleMesh.visible) {
      this.titleMesh.material.uniforms.u_scrollRatio.value = math.fit(t.ratio, -0.75, 0.75, 0, 1);
      this.titleMesh.update(-scrollManager.scrollPixel);
      this.titleEdgeMesh.update(-scrollManager.scrollPixel);
      let n = scrollManager.getDomRange(this.domCapabilitySectionContainer);
      this.titleMesh.material.uniforms.u_invertRatio.value = math.fit(n.screenRatio, -1, -0.75, 0, 1);
    }
    if (r) {
      for (let n = 0; n < this.domHeaders.length; n++) {
        let a = this.domHeaders[n];
        let l = scrollManager.getDomRange(a);
        if (l.screenRatio > -1) {
          a._animating = true;
        } else {
          a._animating = false;
        }
        a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5);
        a._svg.style.transform = `scale(${math.fit(a._time, 0.2, 0.6, 0, 1, ease.backOut)}) rotate(${math.fit(l.screenRatio - n / 10, -1, 1, n % 2 === 0 ? -360 : 360, 0)}deg)`;
        for (let c = 0; c < a._title._splitted.chars.length; c++) {
          let u = a._title._splitted.chars[c];
          let f = math.fit(a._time - c / 25, 0, 0.7, 30, 0, ease.expoOut);
          let p = math.fit(a._time - c / 25, 0, 0.7, 100, 0, ease.expoOut);
          if (properties.viewportWidth < settings.MOBILE_WIDTH) {
            p = 0;
            f = 0;
          }
          u.style.transform = `translate3d(0, ${p}%, 0) rotate(${f}deg)`;
        }
        for (let c = 0; c < a._number._splitted.chars.length; c++) {
          let u = a._number._splitted.chars[c];
          let f = math.fit(a._time - c / 20, 0.2, 0.9, 100, 0, ease.expoOut);
          if (properties.viewportWidth < settings.MOBILE_WIDTH) {
            f = 0;
          }
          u.style.transform = `translate3d(0, ${f}%, 0)`;
        }
      }
      for (let n = 0; n < this.domItems.length; n++) {
        let a = this.domItems[n];
        if (scrollManager.getDomRange(a).screenRatio > -1) {
          a._animating = true;
        } else {
          a._animating = false;
        }
        a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5);
        a._line.style.transform = `scale3d(${math.fit(a._time, 0.2, 1, 0, 1, ease.expoOut)} ,1 ,1)`;
        for (let c = 0; c < a._wrappers.length; c++) {
          let u = a._wrappers[c];
          for (let f = 0; f < u._texts.length; f++) {
            let p = u._texts[f];
            for (let g = 0; g < p._splitted.words.length; g++) {
              let v = p._splitted.words[g];
              let _ = math.fit(a._time - c / 10 - f / 20 - g / 50, 0, 0.8, 100, 0, ease.expoOut);
              if (properties.viewportWidth < settings.MOBILE_WIDTH) {
                _ = 0;
              }
              v.style.transform = `translate3d(0, ${_}%, 0)`;
            }
          }
        }
      }
      if (this._needsReset) {
        this._reset();
      }
    } else {
      this._needsReset = true;
    }
    this.isSectionWasActive = r;
  }
  _splitText() {}
  _reset() {
    this._needsReset = false;
    for (let e = 0; e < this.domHeaders.length; e++) {
      let t = this.domHeaders[e];
      t._animating = false;
      t._time = 0;
    }
    for (let e = 0; e < this.domItems.length; e++) {
      let t = this.domItems[e];
      let r = Array.from(t.querySelectorAll(".about-award-item-wrapper"));
      t._animating = false;
      t._time = 0;
      for (let n = 0; n < r.length; n++) {
        let a = r[n];
        let l = Array.from(a.querySelectorAll(".about-award-item-wrapper-text"));
        for (let c = 0; c < l.length; c++) {
          let u = l[c];
          u._splitted = new SplitType(u, {
            types: "words"
          });
        }
        a._texts = l;
      }
    }
  }
}
const aboutAwardSection = new AboutAwardSection();
const NUMBER_OF_CARDS = 4;
class AboutCapabilitySection {
  domContainer;
  domList;
  domLine1;
  domLine2;
  domCards;
  showItemPerSecond = 10;
  time = 0;
  _needsReset = true;
  preInit(e) {
    if (!e) {
      return;
    }
    this.domContainer = e.querySelector("#about-capability");
    if (!this.domContainer) {
      return;
    }
    this.domTitle = e.querySelector("#about-capability-title");
    this.domSubheader = e.querySelector("#about-capability-subheader");
    this.domSubheaderText = e.querySelector("#about-capability-subheader-text");
    this.domSubhheaderCards = Array.from(e.querySelectorAll(".about-capability-subheader-card"));
    this.domLine1 = e.querySelector("#about-capability-title-line-1");
    this.domLine2 = e.querySelector("#about-capability-title-line-2");
    this.domCardsWrapper = e.querySelector("#about-capability-cards-wrapper");
    this.domCards = e.querySelector("#about-capability-cards");
    this.domCardsArray = Array.from(this.domContainer.querySelectorAll(".about-capability-card"));
    this.titleTime = 0;
    if (!browser$1.isMobile) {
      this.lineVisual = new Line(2);
      this.lineVisual.preInit();
      this.lineVisual2 = new Line(3);
      this.lineVisual2.preInit();
    }
  }
  init() {
    if (!browser$1.isMobile) {
      this.lineVisual.init();
      aboutPage.postUfxContainer.add(this.lineVisual.container);
      this.lineVisual2.init();
      aboutPage.postUfxContainer.add(this.lineVisual2.container);
    }
  }
  resize(e, t) {
    if (!this.domContainer || !this.domCards) {
      return;
    }
    this._splitText();
    this.domCards.style.transform = "translateZ(0)";
    for (let u = 0, f = this.domCardsArray.length; u < f; u++) {
      this.domCardsArray[u].style = "translateZ(0)";
    }
    let r = this.domCardsArray[0].getBoundingClientRect();
    this.domCards.style.height = properties.viewportWidth < 812 ? "auto" : r.height + "px";
    for (let u = 0, f = this.domCardsArray.length; u < f; u++);
    if (!browser$1.isMobile) {
      this.lineVisual.resize(e, t);
      this.lineVisual2.resize(e, t);
    }
    let n = this.domCardsWrapper.getBoundingClientRect();
    let a = this.domCards.getBoundingClientRect();
    let l = this.domLine1.getBoundingClientRect();
    let c = this.domLine2.getBoundingClientRect();
    for (let u = 0, f = this.domCardsArray.length; u < f; u++) {
      let p = this.domCardsArray[u];
      p._width = r.width;
      p._height = r.height;
      p._offsetY = u % 2 === 0 ? 30 : -30;
    }
    this.domCardsWrapper._height = this.domCardsWrapper.offsetHeight - this.domCardsArray[0]._height;
    this.domCardsWrapper._width = n.width;
    this.domCardsWrapper._cardOffset = this.domCardsWrapper._width - this.domCardsArray[0]._width * NUMBER_OF_CARDS;
    this.domCards._screenRatio = a.height / properties.viewportHeight;
    this.domLine2._translateX = c.left - l.left;
    this.domTitle._height = this.domTitle.getBoundingClientRect().height;
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
  }
  update(e) {
    if (!this.domContainer || !this.domCards) {
      return;
    }
    let t = scrollManager.getDomRange(this.domContainer);
    this.isSectionActive = t.isActive;
    if (!browser$1.isMobile) {
      this.lineVisual.update(e, t);
      this.lineVisual2.update(e, t);
    }
    let r = scrollManager.getDomRange(this.domTitle);
    this.domTitle.style.visibility = this.isSectionActive ? "visible" : "hidden";
    this.domCards.style.transform = "translateZ(0)";
    properties.screenPaintOffsetRatio *= math.fit(t.screenRatio, -0.5, 0, 1, 0) + math.fit(t.screenRatio, 0.8, 1, 0, 1);
    if (this.isSectionActive) {
      if (this._needsReset) {
        this._reset();
      }
      let n = math.fit(t.screenRatio, -0.6, 0.2, 0, 1);
      let a = math.fit(t.screenRatio, -0.5, 0.7, 0, 1);
      let l = math.fit(t.screenRatio, -0.5, 0.7, -Math.PI / 2, Math.PI - Math.PI / 2);
      this.time += e;
      if (properties.viewportWidth > 812) {
        let u = scrollManager.getDomRange(this.domCardsWrapper);
        let f = scrollManager.getEaseInOutOffset(scrollManager.scrollPixel - u.top + (properties.viewportHeight - u.height) * 0.5, properties.viewportHeight * 3, 5, 1);
        this.domCards.style.transform = `translate3d(0, ${f}px, 0)`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p];
          let _ = this.domCardsWrapper._width / 2 - v._width / 2;
          let T = p / NUMBER_OF_CARDS * (this.domCardsWrapper._width + this.domCardsWrapper._cardOffset / (NUMBER_OF_CARDS - 1));
          let M = math.fit(n, 0.2, 1, _, T, ease.expoOut);
          let S = math.fit(a, 0, 0.7 - Math.abs(g - 1 - p) / 20, 180, 0, ease.backInOut);
          let b = math.fit(Math.abs(math.fit(n, 0, 0.75, 0, 1) * 2 - 1), 1, 0, 0, (p - 1.5) * 9, ease.expoInOut);
          let C = Math.cos(this.time * 3 + p) * Math.cos(l);
          v.style.transform = `translate3d(${M}px, ${C * 10}px, 0) rotateZ(${b}deg) rotate3d(0, 1,  0, ${S}deg)`;
        }
      } else {
        let u = scrollManager.getDomRange(this.domCards);
        let f = math.fit(u.showScreenOffset, 0, this.domCards._screenRatio, 0, 1);
        this.domCards.style.perspectiveOrigin = `center ${f * 100}%`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p];
          let _ = scrollManager.getDomRange(v);
          let T = math.fit(_.screenRatio, -0.85 - p % 2 / 10, 0, 180, 0, ease.cubicInOut);
          v.style.transform = `rotateY(${T}deg)`;
        }
      }
      let c = r.screenRatio > -1;
      this.titleTime += e * (c ? 1 : 0);
      this.domTitle._splitted.words.forEach((u, f) => {
        if (properties.useMobileLayout) {
          u.style.transform = "translate3d(0px, 0, 0)";
        } else if (f < 2) {
          let p = math.fit(this.titleTime - f / 10, 0, 1, 100, 0, ease.lusion);
          u.style.transform = `translate3d(0, ${p}%, 0)`;
        } else {
          let p = math.fit(this.titleTime - f / 10, 1, 2, -this.domLine2._translateX, 0, ease.lusion);
          let g = math.fit(this.titleTime - f / 10, 0.1, 1.1, -100, 0, ease.lusion);
          u.style.transform = `translate3d(${p}px, ${g}%, 0)`;
        }
      });
      this.domSubheaderText._splitted.lines.forEach((u, f) => {
        let p = c ? math.saturate(this.titleTime - f / 10 - 0.25) : 0;
        let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? Math.round(ease.expoOut(p) * 1000) / 1000 : 1;
        u.style.transform = `translate3d(0, ${math.fit(g, 0, 1, 110, 0)}%, 0)`;
      });
      for (let u = 0, f = this.domSubhheaderCards.length; u < f; u++) {
        let p = this.domSubhheaderCards[u];
        let g = c ? math.saturate(this.titleTime - u / 10 - 0.25) : 0;
        let v = properties.viewportWidth >= settings.MOBILE_WIDTH ? Math.round(ease.expoOut(g) * 1000) / 1000 : 1;
        p.style.transform = `translate3d(0, ${math.fit(v, 0, 1, 110, 0)}%, 0)`;
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    this.domTitle._originalHTML = this.domTitle._originalHTML || this.domTitle.innerHTML;
    this.domTitle.innerHTML = this.domTitle._originalHTML;
    this.domSubheaderText._originalHTML = this.domSubheaderText._originalHTML || this.domSubheaderText.innerHTML;
    this.domSubheaderText.innerHTML = this.domSubheaderText._originalHTML;
    this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words, lines",
      charClass: "about-capability-title-char"
    });
    this.domTitle._splitted.lines.forEach(e => {
      const t = document.createElement("div");
      t.style.position = "relative";
      t.style.overflow = "hidden";
      t.append(e);
      this.domTitle.append(t);
    });
    this.domSubheaderText._splitted = new SplitType(this.domSubheaderText, {
      types: "lines"
    });
    this.domSubheaderText._splitted.lines.forEach(e => {
      const t = document.createElement("div");
      t.style.position = "relative";
      t.style.overflow = "hidden";
      t.append(e);
      this.domSubheaderText.append(t);
    });
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.titleTime = 0;
      this.domTitle._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      this.domSubheaderText._splitted.chars.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      for (let e = 0, t = this.domSubhheaderCards.length; e < t; e++) {
        let r = this.domSubhheaderCards[e];
        r.style.transform = "translate3d(0, 110%, 0)";
      }
    }
  }
}
const aboutCapabilitySection = new AboutCapabilitySection();
class AboutPageAudios {
  hasInit = false;
  bgFilterActive = false;
  bgTrackName = "cinematic_0";
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      this.hasInit ||= true;
    }
  }
  update(e) {
    if (!settings.USE_AUDIO) {
      return;
    }
    if (e) {
      audios.fadeBgMusic(this.bgTrackName, 1);
    } else {
      audios.fadeBgMusic("generic", 1);
    }
    audios.items[this.bgTrackName].setFilterFrequencyViaRatio(math.fit(aboutHero.freezeRatio, 0.25, 1, 0, 0.75));
  }
}
const aboutPageAudios = new AboutPageAudios();
let _c = new Color();
class AboutPage extends Page {
  path = "about";
  id = "about";
  endVisualColor = properties.offWhiteColorHex;
  preInit() {
    let e = this.domContainer;
    aboutWhoSection.preInit(e);
    aboutClientSection.preInit(e);
    aboutAwardSection.preInit(e);
    aboutCapabilitySection.preInit(e);
  }
  init() {
    aboutWhoSection.init();
    aboutClientSection.init();
    aboutAwardSection.init();
    aboutCapabilitySection.init();
    super.init();
  }
  resize(e, t) {
    aboutWhoSection.resize(e, t);
    aboutClientSection.resize(e, t);
    aboutAwardSection.resize(e, t);
    aboutCapabilitySection.resize(e, t);
  }
  show(e, t, r) {
    aboutWhoSection.show();
    aboutPageAudios.init();
    super.show(e, t, r);
  }
  update(e) {
    super.update(e);
    let t = false;
    let r = true;
    let n = false;
    if (pagesManager.scrollTargetPage == this) {
      properties.bgColor.setStyle(properties.blackColorHex);
      if (aboutCapabilitySection.domContainer) {
        let a = scrollManager.getDomRange(aboutCapabilitySection.domContainer);
        properties.bgColor.lerp(_c.setStyle(properties.blueColorHex), math.fit(a.screenRatio, -1, -0.5, 0, 1));
        if (a.screenRatio > -0.75) {
          n = true;
          r = false;
        } else {
          n = false;
          r = true;
        }
        if (footerSection.getDomRange().ratio > -0.1) {
          t = true;
          r = false;
          n = false;
        }
        document.documentElement.classList.toggle("is-black-bg", r);
        document.documentElement.classList.toggle("is-white-bg", t);
        document.documentElement.classList.toggle("is-blue-bg", n);
      }
    }
    aboutWhoSection.update(e);
    aboutClientSection.update(e);
    aboutAwardSection.update(e);
    aboutCapabilitySection.update(e);
    aboutPageAudios.update(r);
  }
}
const aboutPage = new AboutPage();
class ProjectsMainSection {
  domContainer;
  domTitle;
  projectItemList;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#projects-main");
    this.projectItemList = new ProjectItemList(projectsPage, e.querySelector(".project-list"));
    this.domItems = e.querySelectorAll(".project-item");
    this.domTitle = e.querySelector("#projects-main-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitleProjectNumber = e.querySelector("#projects-main-title-project-number");
    this.domTitleProjectArrow = e.querySelector("#projects-main-title-project-arrow");
  }
  init() {}
  hasProject(e) {
    return this.projectItemList.hasProject(e);
  }
  resize(e, t) {
    this._splitText();
    this.projectItemList.resize(e, t);
  }
  update(e) {
    if (scrollManager.getDomRange(this.domContainer).isActive) {
      if (this._needsReset) {
        this._reset();
      }
      let r = scrollManager.getDomRange(this.domTitle);
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      if (r.screenRatio > -1) {
        this.domTitle._animating = true;
      }
      if (properties.useMobileLayout) {
        this.domTitleProjectArrow.style.transform = "scale(1)";
      } else {
        this.domTitle._splitted.chars.forEach((a, l) => {
          let c = math.fit(this.domTitle._time * 1.5 - l / 20 - 0.2, 0, 1, 100, 0, ease.lusion);
          let u = math.fit(this.domTitle._time * 1.5 - l / 20 - 0.2, 0, 1, 30, 0, ease.lusion);
          a.style.transform = `translate3d(0, ${c}%, 0) rotate(${u}deg)`;
        });
        this.domTitleProjectNumber._splitted.chars.forEach((a, l) => {
          let c = math.fit(this.domTitle._time - l / 20 - 0.5, 0, 1, 100, 0, ease.lusion);
          a.style.transform = `translate3d(0, ${c}%, 0)`;
        });
        let n = ease.elasticOut(math.saturate(this.domTitle._time - 0.6));
        this.domTitleProjectArrow.style.transform = `scale(${n})`;
      }
    } else {
      this._needsReset = true;
    }
    this.projectItemList.zoomRatio = math.fit(projectsPage.activeRatio, 0, 0.75, 1, 0);
    this.projectItemList.update(e);
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      if (properties.useMobileLayout) {
        if (this.domTitle._splitted.chars) {
          this.domTitle._splitted.chars.forEach(e => {
            e.style.transform = "translate3d(0, 0, 0)";
          });
        }
        if (this.domTitleProjectNumber._splitted.chars) {
          this.domTitleProjectNumber._splitted.chars.forEach(e => {
            e.style.transform = "translate3d(0, 0, 0)";
          });
        }
        this.domTitleProjectArrow.style.transform = "scale(1)";
      } else {
        this.domTitle._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitleProjectNumber._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitleProjectArrow.style.transform = "scale(0)";
      }
    }
  }
  _splitText() {
    if (this.domTitle._splitted && this.domTitle._splitted.revert) {
      this.domTitle._splitted.revert();
    }
    if (this.domTitleProjectNumber._splitted && this.domTitleProjectNumber._splitted.revert) {
      this.domTitleProjectNumber._splitted.revert();
    }
    if (!properties.useMobileLayout) {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "chars"
      });
      this.domTitleProjectNumber._splitted = new SplitType(this.domTitleProjectNumber, {
        types: "chars"
      });
    }
  }
}
const projectsMainSection = new ProjectsMainSection();
class ProjectsPageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1);
      if (!this.hasInit) {
        this.domProjectItems = Array.from(document.querySelectorAll("#projects .project-item"));
        this.domProjectItems.forEach(e => {
          audios.addHoverClickEvents(e);
        });
        this.hasInit = true;
      }
    }
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectsPageAudios = new ProjectsPageAudios();
class ProjectsPage extends Page {
  path = "projects";
  id = "projects";
  endVisualUseTextured = true;
  preInit() {
    let e = this.domContainer;
    projectsMainSection.preInit(e);
  }
  init() {
    projectsMainSection.init();
  }
  hasProject(e) {
    return projectsMainSection.projectItemList.hasProject(e);
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    projectsMainSection.projectItemList.selectedId = null;
    let n = e.pathNodes[1];
    if (e.target === projectPage && this.hasProject(n) && this.isFirstShown) {
      this.useGenericTransition = false;
      this.showDuration = 1.5;
      scrollManager.scrollToPixel(projectsMainSection.projectItemList.getProjectItemTop(n) - properties.viewportHeight * 0.25, true);
      projectsMainSection.projectItemList.selectedId = n;
    } else {
      this.showDuration = 1;
    }
    projectsPageAudios.init();
    super.show(e, t, r);
  }
  hide(e, t, r) {
    this.useGenericTransition = true;
    projectsMainSection.projectItemList.selectedId = null;
    if (t.target === projectPage && this.hasProject(t.pathNodes[1])) {
      this.useGenericTransition = false;
      this.hideDuration = 1.5;
      projectsMainSection.projectItemList.selectedId = t.pathNodes[1];
    } else {
      this.hideDuration = 1;
    }
    super.hide(e, t, r);
  }
  resize(e, t) {
    projectsMainSection.resize(e, t);
  }
  update(e) {
    super.update(e);
    if (this.hasInitialized) {
      projectsMainSection.update(e);
      if (pagesManager.scrollTargetPage == this) {
        properties.bgColor.setStyle(properties.offWhiteColorHex);
        let t = true;
        let r = false;
        let n = false;
        document.documentElement.classList.toggle("is-black-bg", r);
        document.documentElement.classList.toggle("is-white-bg", t);
        document.documentElement.classList.toggle("is-blue-bg", n);
      }
      projectsPageAudios.update(e);
    }
  }
}
const projectsPage = new ProjectsPage();
var dayjs_min = {
  exports: {}
};
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    var t = 1000;
    var r = 60000;
    var n = 3600000;
    var a = "millisecond";
    var l = "second";
    var c = "minute";
    var u = "hour";
    var f = "day";
    var p = "week";
    var g = "month";
    var v = "quarter";
    var _ = "year";
    var T = "date";
    var M = "Invalid Date";
    var S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
    var b = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
    var C = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (z) {
        var j = ["th", "st", "nd", "rd"];
        var X = z % 100;
        return "[" + z + (j[(X - 20) % 10] || j[X] || j[0]) + "]";
      }
    };
    function w(z, j, X) {
      var Z = String(z);
      if (!Z || Z.length >= j) {
        return z;
      } else {
        return "" + Array(j + 1 - Z.length).join(X) + z;
      }
    }
    var R = {
      s: w,
      z: function (z) {
        var j = -z.utcOffset();
        var X = Math.abs(j);
        var Z = Math.floor(X / 60);
        var q = X % 60;
        return (j <= 0 ? "+" : "-") + w(Z, 2, "0") + ":" + w(q, 2, "0");
      },
      m: function z(j, X) {
        if (j.date() < X.date()) {
          return -z(X, j);
        }
        var Z = (X.year() - j.year()) * 12 + (X.month() - j.month());
        var q = j.clone().add(Z, g);
        var ue = X - q < 0;
        var oe = j.clone().add(Z + (ue ? -1 : 1), g);
        return +(-(Z + (X - q) / (ue ? q - oe : oe - q)) || 0);
      },
      a: function (z) {
        if (z < 0) {
          return Math.ceil(z) || 0;
        } else {
          return Math.floor(z);
        }
      },
      p: function (z) {
        return {
          M: g,
          y: _,
          w: p,
          d: f,
          D: T,
          h: u,
          m: c,
          s: l,
          ms: a,
          Q: v
        }[z] || String(z || "").toLowerCase().replace(/s$/, "");
      },
      u: function (z) {
        return z === undefined;
      }
    };
    var E = "en";
    var I = {
      [E]: C
    };
    var F = "$isDayjsObject";
    function k(z) {
      return z instanceof re || !!z && !!z[F];
    }
    var L = function z(j, X, Z) {
      var q;
      if (!j) {
        return E;
      }
      if (typeof j == "string") {
        var ue = j.toLowerCase();
        if (I[ue]) {
          q = ue;
        }
        if (X) {
          I[ue] = X;
          q = ue;
        }
        var oe = j.split("-");
        if (!q && oe.length > 1) {
          return z(oe[0]);
        }
      } else {
        var te = j.name;
        I[te] = j;
        q = te;
      }
      if (!Z && q) {
        E = q;
      }
      return q || !Z && E;
    };
    function D(z, j) {
      if (k(z)) {
        return z.clone();
      }
      var X = typeof j == "object" ? j : {};
      X.date = z;
      X.args = arguments;
      return new re(X);
    }
    var ne = R;
    ne.l = L;
    ne.i = k;
    ne.w = function (z, j) {
      return D(z, {
        locale: j.$L,
        utc: j.$u,
        x: j.$x,
        $offset: j.$offset
      });
    };
    var re = function () {
      function z(X) {
        this.$L = L(X.locale, null, true);
        this.parse(X);
        this.$x = this.$x || X.x || {};
        this[F] = true;
      }
      var j = z.prototype;
      j.parse = function (X) {
        this.$d = function (Z) {
          var q = Z.date;
          var ue = Z.utc;
          if (q === null) {
            return new Date(NaN);
          }
          if (ne.u(q)) {
            return new Date();
          }
          if (q instanceof Date) {
            return new Date(q);
          }
          if (typeof q == "string" && !/Z$/i.test(q)) {
            var oe = q.match(S);
            if (oe) {
              var te = oe[2] - 1 || 0;
              var le = (oe[7] || "0").substring(0, 3);
              if (ue) {
                return new Date(Date.UTC(oe[1], te, oe[3] || 1, oe[4] || 0, oe[5] || 0, oe[6] || 0, le));
              } else {
                return new Date(oe[1], te, oe[3] || 1, oe[4] || 0, oe[5] || 0, oe[6] || 0, le);
              }
            }
          }
          return new Date(q);
        }(X);
        this.init();
      };
      j.init = function () {
        var X = this.$d;
        this.$y = X.getFullYear();
        this.$M = X.getMonth();
        this.$D = X.getDate();
        this.$W = X.getDay();
        this.$H = X.getHours();
        this.$m = X.getMinutes();
        this.$s = X.getSeconds();
        this.$ms = X.getMilliseconds();
      };
      j.$utils = function () {
        return ne;
      };
      j.isValid = function () {
        return this.$d.toString() !== M;
      };
      j.isSame = function (X, Z) {
        var q = D(X);
        return this.startOf(Z) <= q && q <= this.endOf(Z);
      };
      j.isAfter = function (X, Z) {
        return D(X) < this.startOf(Z);
      };
      j.isBefore = function (X, Z) {
        return this.endOf(Z) < D(X);
      };
      j.$g = function (X, Z, q) {
        if (ne.u(X)) {
          return this[Z];
        } else {
          return this.set(q, X);
        }
      };
      j.unix = function () {
        return Math.floor(this.valueOf() / 1000);
      };
      j.valueOf = function () {
        return this.$d.getTime();
      };
      j.startOf = function (X, Z) {
        var q = this;
        var ue = !!ne.u(Z) || Z;
        var oe = ne.p(X);
        function te(ve, de) {
          var xe = ne.w(q.$u ? Date.UTC(q.$y, de, ve) : new Date(q.$y, de, ve), q);
          if (ue) {
            return xe;
          } else {
            return xe.endOf(f);
          }
        }
        function le(ve, de) {
          return ne.w(q.toDate()[ve].apply(q.toDate("s"), (ue ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(de)), q);
        }
        var Te = this.$W;
        var K = this.$M;
        var G = this.$D;
        var U = "set" + (this.$u ? "UTC" : "");
        switch (oe) {
          case _:
            if (ue) {
              return te(1, 0);
            } else {
              return te(31, 11);
            }
          case g:
            if (ue) {
              return te(1, K);
            } else {
              return te(0, K + 1);
            }
          case p:
            var N = this.$locale().weekStart || 0;
            var he = (Te < N ? Te + 7 : Te) - N;
            return te(ue ? G - he : G + (6 - he), K);
          case f:
          case T:
            return le(U + "Hours", 0);
          case u:
            return le(U + "Minutes", 1);
          case c:
            return le(U + "Seconds", 2);
          case l:
            return le(U + "Milliseconds", 3);
          default:
            return this.clone();
        }
      };
      j.endOf = function (X) {
        return this.startOf(X, false);
      };
      j.$set = function (X, Z) {
        var q;
        var ue = ne.p(X);
        var oe = "set" + (this.$u ? "UTC" : "");
        var te = (q = {}, q[f] = oe + "Date", q[T] = oe + "Date", q[g] = oe + "Month", q[_] = oe + "FullYear", q[u] = oe + "Hours", q[c] = oe + "Minutes", q[l] = oe + "Seconds", q[a] = oe + "Milliseconds", q)[ue];
        var le = ue === f ? this.$D + (Z - this.$W) : Z;
        if (ue === g || ue === _) {
          var Te = this.clone().set(T, 1);
          Te.$d[te](le);
          Te.init();
          this.$d = Te.set(T, Math.min(this.$D, Te.daysInMonth())).$d;
        } else if (te) {
          this.$d[te](le);
        }
        this.init();
        return this;
      };
      j.set = function (X, Z) {
        return this.clone().$set(X, Z);
      };
      j.get = function (X) {
        return this[ne.p(X)]();
      };
      j.add = function (X, Z) {
        var q;
        var ue = this;
        X = Number(X);
        var oe = ne.p(Z);
        function te(K) {
          var G = D(ue);
          return ne.w(G.date(G.date() + Math.round(K * X)), ue);
        }
        if (oe === g) {
          return this.set(g, this.$M + X);
        }
        if (oe === _) {
          return this.set(_, this.$y + X);
        }
        if (oe === f) {
          return te(1);
        }
        if (oe === p) {
          return te(7);
        }
        var le = (q = {}, q[c] = r, q[u] = n, q[l] = t, q)[oe] || 1;
        var Te = this.$d.getTime() + X * le;
        return ne.w(Te, this);
      };
      j.subtract = function (X, Z) {
        return this.add(X * -1, Z);
      };
      j.format = function (X) {
        var Z = this;
        var q = this.$locale();
        if (!this.isValid()) {
          return q.invalidDate || M;
        }
        var ue = X || "YYYY-MM-DDTHH:mm:ssZ";
        var oe = ne.z(this);
        var te = this.$H;
        var le = this.$m;
        var Te = this.$M;
        var K = q.weekdays;
        var G = q.months;
        var U = q.meridiem;
        function N(de, xe, ee, Ue) {
          return de && (de[xe] || de(Z, ue)) || ee[xe].slice(0, Ue);
        }
        function he(de) {
          return ne.s(te % 12 || 12, de, "0");
        }
        var ve = U || function (de, xe, ee) {
          var Ue = de < 12 ? "AM" : "PM";
          if (ee) {
            return Ue.toLowerCase();
          } else {
            return Ue;
          }
        };
        return ue.replace(b, function (de, xe) {
          return xe || function (ee) {
            switch (ee) {
              case "YY":
                return String(Z.$y).slice(-2);
              case "YYYY":
                return ne.s(Z.$y, 4, "0");
              case "M":
                return Te + 1;
              case "MM":
                return ne.s(Te + 1, 2, "0");
              case "MMM":
                return N(q.monthsShort, Te, G, 3);
              case "MMMM":
                return N(G, Te);
              case "D":
                return Z.$D;
              case "DD":
                return ne.s(Z.$D, 2, "0");
              case "d":
                return String(Z.$W);
              case "dd":
                return N(q.weekdaysMin, Z.$W, K, 2);
              case "ddd":
                return N(q.weekdaysShort, Z.$W, K, 3);
              case "dddd":
                return K[Z.$W];
              case "H":
                return String(te);
              case "HH":
                return ne.s(te, 2, "0");
              case "h":
                return he(1);
              case "hh":
                return he(2);
              case "a":
                return ve(te, le, true);
              case "A":
                return ve(te, le, false);
              case "m":
                return String(le);
              case "mm":
                return ne.s(le, 2, "0");
              case "s":
                return String(Z.$s);
              case "ss":
                return ne.s(Z.$s, 2, "0");
              case "SSS":
                return ne.s(Z.$ms, 3, "0");
              case "Z":
                return oe;
            }
            return null;
          }(de) || oe.replace(":", "");
        });
      };
      j.utcOffset = function () {
        return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
      };
      j.diff = function (X, Z, q) {
        var ue;
        var oe = this;
        var te = ne.p(Z);
        var le = D(X);
        var Te = (le.utcOffset() - this.utcOffset()) * r;
        var K = this - le;
        function G() {
          return ne.m(oe, le);
        }
        switch (te) {
          case _:
            ue = G() / 12;
            break;
          case g:
            ue = G();
            break;
          case v:
            ue = G() / 3;
            break;
          case p:
            ue = (K - Te) / 604800000;
            break;
          case f:
            ue = (K - Te) / 86400000;
            break;
          case u:
            ue = K / n;
            break;
          case c:
            ue = K / r;
            break;
          case l:
            ue = K / t;
            break;
          default:
            ue = K;
        }
        if (q) {
          return ue;
        } else {
          return ne.a(ue);
        }
      };
      j.daysInMonth = function () {
        return this.endOf(g).$D;
      };
      j.$locale = function () {
        return I[this.$L];
      };
      j.locale = function (X, Z) {
        if (!X) {
          return this.$L;
        }
        var q = this.clone();
        var ue = L(X, Z, true);
        if (ue) {
          q.$L = ue;
        }
        return q;
      };
      j.clone = function () {
        return ne.w(this.$d, this);
      };
      j.toDate = function () {
        return new Date(this.valueOf());
      };
      j.toJSON = function () {
        if (this.isValid()) {
          return this.toISOString();
        } else {
          return null;
        }
      };
      j.toISOString = function () {
        return this.$d.toISOString();
      };
      j.toString = function () {
        return this.$d.toUTCString();
      };
      return z;
    }();
    var ce = re.prototype;
    D.prototype = ce;
    [["$ms", a], ["$s", l], ["$m", c], ["$H", u], ["$W", f], ["$M", g], ["$y", _], ["$D", T]].forEach(function (z) {
      ce[z[1]] = function (j) {
        return this.$g(j, z[0], z[1]);
      };
    });
    D.extend = function (z, j) {
      if (!z.$i) {
        z(j, re, D);
        z.$i = true;
      }
      return D;
    };
    D.locale = L;
    D.isDayjs = k;
    D.unix = function (z) {
      return D(z * 1000);
    };
    D.en = I[E];
    D.Ls = I;
    D.p = {};
    return D;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = getDefaultExportFromCjs(dayjs_minExports);
class PlaygroundPage extends Page {
  path = "playground";
  id = "playground";
  mesh = null;
  container = new Object3D();
  events = [{
    date: dayjs("2019-01-25")
  }, {
    date: dayjs("2019-09-25")
  }, {
    date: dayjs("2022-04-25")
  }];
  domEvents = [];
  preInit() {
    let e = this.domContainer;
    this.domMain = e.querySelector("#playground-main");
    this.domInner = e.querySelector("#playground-main-inner");
    this.domTimeline = e.querySelector("#playground-main-timeline");
    this.domTimelineLine = e.querySelector("#playground-main-timeline-line");
    this.domTimelineLineProgress = e.querySelector("#playground-main-timeline-line-progress");
    for (let t = 0; t < this.events.length; t++) {
      let r = document.createElement("div");
      r.classList.add("playground-main-timeline-event");
      let n = document.createElement("div");
      n.classList.add("playground-main-timeline-dot");
      n.addEventListener("mouseenter", this._onDomDotMouseenter.bind(this));
      n.addEventListener("mouseleave", this._onDomDotMouseleave.bind(this));
      let a = document.createElement("div");
      a.classList.add("playground-main-timeline-text");
      a.innerHTML = this.events[t].date.format("YY MMMM'DD");
      r.append(a);
      r.append(n);
      this.domTimeline.append(r);
      this.domEvents[t] = r;
    }
    properties.loader.add(settings.MODEL_PATH + "playground/tunnel.buf", {
      onLoad: t => {
        this._onTunnelLoad(t);
      }
    });
  }
  init() {
    this.domTimeline.addEventListener("click", this._onDomTimelineClick.bind(this));
  }
  resize(e, t) {
    let r = Number(getComputedStyle(this.domMain).getPropertyValue("padding-left").split("px")[0]);
    let n = this.events[this.events.length - 1].date.diff(this.events[0].date, "day");
    let a = properties.viewportWidth - r * 2;
    this.offsetRatio = r / properties.viewportWidth;
    this.domMain._height = this.domMain.getBoundingClientRect().height - properties.viewportHeight;
    for (let l = 0; l < this.domEvents.length; l++) {
      let c = this.domEvents[l];
      let p = this.events[l].date.diff(this.events[0].date, "day") / n;
      c._ratio = math.fit(p, 0, 1, this.offsetRatio, 1 - this.offsetRatio);
      c.style.left = p * a + r + "px";
    }
  }
  update(e) {
    super.update(e);
    let t = scrollManager.getDomRange(this.domContainer);
    let r = math.fit(t.screenRatio, -0.5, 0.5, 0, 1);
    if (r < 1) {
      this.domInner.style.transform = `translate3d(0, ${-scrollManager.y}px, 0)`;
      this.domTimelineLineProgress.style.transform = `scale3d(${r}, 1, 1)`;
      for (let n = 0; n < this.domEvents.length; n++) {
        let a = this.domEvents[n];
        if (r >= a._ratio) {
          a.classList.add("--active");
        } else {
          a.classList.remove("--active");
        }
      }
    }
  }
  _onTunnelLoad(e) {
    this.mesh = new Mesh(e, new MeshNormalMaterial());
    this.container.add(this.mesh);
  }
  _onDomTimelineClick(e) {
    let t = e.clientX / properties.viewportWidth;
    scrollManager.scrollToPixel(t * this.domMain._height);
  }
  _onDomDotMouseenter(e) {
    e.target.closest(".playground-main-timeline-event").classList.add("--hover");
  }
  _onDomDotMouseleave(e) {
    e.target.closest(".playground-main-timeline-event").classList.remove("--hover");
  }
}
const playgroundPage = new PlaygroundPage();
var FLUID_CELL = 0;
var AIR_CELL = 1;
var SOLID_CELL = 2;
var EMIT_RATE = 2000;
let _v0 = new Vector2();
let _v1 = new Vector2();
let _v2 = new Vector2();
function clamp(o, e, t) {
  if (o < e) {
    return e;
  } else if (o > t) {
    return t;
  } else {
    return o;
  }
}
class FlipSim {
  constructor() {
    this.isFlushing = false;
    this.hasInitialized = false;
    this.emitterPosA = new Vector2(1, 1);
    this.emitterPosB = new Vector2(1, 1);
    this.colliderRectList = [];
  }
  addColliderRect = (e, t = 0, r = 0, n = 0, a = 0) => {
    let l = this.fInvSpacing;
    let c = this.fNumY;
    let u = clamp(Math.round(e.x * l) - t, 0, this.fNumX - 1);
    let f = clamp(Math.round(e.y * l) - a, 0, this.fNumY - 1);
    let p = clamp(Math.round((e.x + e.w) * l) + r, 0, this.fNumX - 1);
    let g = clamp(Math.round((e.y + e.h) * l) + n, 0, this.fNumY - 1);
    p = Math.max(u, p);
    g = Math.max(f, g);
    this.colliderRectList.push(e);
    for (let _ = u; _ <= p; _++) {
      for (let T = f; T <= g; T++) {
        var v = _ * c + T;
        this.s[v] = 0;
      }
    }
    e.x = u / l;
    e.y = f / l;
    e.w = Math.max(1, p - u) / l;
    e.h = Math.max(1, g - f) / l;
    e.l = e.x;
    e.r = e.x + e.w;
    e.b = e.y;
    e.t = e.y + e.h;
    e.hw = e.w / 2;
    e.hh = e.h / 2;
    e.cx = e.x + e.hw;
    e.cy = e.y + e.hh;
  };
  init(e, t, r, n, a, l) {
    let c = this.hasInitialized;
    this.colliderRectList.length = 0;
    this.density = e;
    this.fNumX = Math.ceil(t / n) + 1;
    this.fNumY = Math.ceil(r / n) + 1;
    this.h = Math.max(t / this.fNumX, r / this.fNumY);
    this.fInvSpacing = 1 / this.h;
    var u = this.fNumX * this.fNumY;
    this.tankInnerWidth = (this.fNumX - 2) * this.h;
    this.tankInnerHeight = (this.fNumY - 2) * this.h;
    if (!c || u > this.cellType.length) {
      this.u = new Float32Array(u);
      this.v = new Float32Array(u);
      this.du = new Float32Array(u);
      this.dv = new Float32Array(u);
      this.prevU = new Float32Array(u);
      this.prevV = new Float32Array(u);
      this.p = new Int8Array(u);
      this.s = new Int8Array(u);
      this.cellType = new Int8Array(u);
      this.particleDensity = new Float32Array(u);
    }
    this.fNumCells = u;
    for (var f = 0; f < u; f++) {
      this.u[f] = this.v[f] = this.du[f] = this.dv[f] = this.prevU[f] = this.prevV[f] = this.p[f] = this.s[f] = this.cellType[f] = this.particleDensity[f] = 0;
    }
    this.particleRadius = a;
    this.pInvSpacing = 1 / (a * 2.2);
    this.pNumX = Math.floor(t * this.pInvSpacing) + 1;
    this.pNumY = Math.floor(r * this.pInvSpacing) + 1;
    this.particleRestDensity = 0;
    let p = this.pNumX * this.pNumY;
    if (!c || p > this.numCellParticles.length) {
      this.numCellParticles = new Uint32Array(p);
      this.firstCellParticle = new Uint32Array(p + 1);
    } else {
      for (var f = 0; f < p; f++) {
        this.numCellParticles[f] = 0;
        this.firstCellParticle[f] = 0;
      }
      this.firstCellParticle[p] = 0;
    }
    this.pNumCells = p;
    this.particlePosOut = new Float32Array(l * 2);
    this.particlePos = new Float32Array(l * 2);
    this.particleInfo = new Float32Array(l * 2);
    if (!c || l > this.particleDir.length / 2) {
      this.particleDir = new Float32Array(l * 2);
      this.particlePrevPos = new Float32Array(l * 2);
      this.particleVel = new Float32Array(l * 2);
      this.cellParticleIds = new Uint32Array(l);
      this.particleStatuses = new Uint8Array(l);
    }
    for (var f = 0; f < l; f++) {
      this.particlePos[f * 2 + 0] = -10000;
      this.particlePos[f * 2 + 1] = 0;
      this.particlePosOut[f * 2 + 0] = -10000;
      this.particlePosOut[f * 2 + 1] = 0;
      this.particleInfo[f * 2 + 0] = 0;
      this.particleInfo[f * 2 + 1] = 0;
      this.particleDir[f * 2 + 0] = 0;
      this.particleDir[f * 2 + 1] = 0;
      this.particlePrevPos[f * 2 + 0] = -10000;
      this.particlePrevPos[f * 2 + 1] = 0;
      this.particleVel[f * 2 + 0] = 0;
      this.particleVel[f * 2 + 1] = 0;
      this.cellParticleIds[f] = 0;
      this.particleStatuses[f] = 0;
    }
    this.numParticles = l;
    var g = this.fNumY;
    for (var f = 0; f < this.fNumX; f++) {
      for (var v = 0; v < this.fNumY; v++) {
        var _ = 0;
        if (f > 0 && f < this.fNumX - 1 && v > 0 && v < this.fNumY - 1) {
          _ = 1;
        }
        this.s[f * g + v] = _;
      }
    }
    this.hasInitialized = true;
  }
  integrateParticles(e, t) {
    for (var r = 0; r < this.numParticles; r++) {
      if (this.particleStatuses[r]) {
        this.particleVel[r * 2 + 1] += e * t;
        this.particlePos[r * 2] += this.particleVel[r * 2] * e;
        this.particlePos[r * 2 + 1] += this.particleVel[r * 2 + 1] * e;
      }
    }
  }
  pushParticlesApart(e) {
    this.numCellParticles.fill(0);
    for (var t = 0; t < this.numParticles; t++) {
      if (this.particleStatuses[t]) {
        var r = this.particlePos[t * 2];
        var n = this.particlePos[t * 2 + 1];
        var a = clamp(Math.floor(r * this.pInvSpacing), 0, this.pNumX - 1);
        var l = clamp(Math.floor(n * this.pInvSpacing), 0, this.pNumY - 1);
        var c = a * this.pNumY + l;
        this.numCellParticles[c]++;
      }
    }
    var u = 0;
    for (var t = 0; t < this.pNumCells; t++) {
      u += this.numCellParticles[t];
      this.firstCellParticle[t] = u;
    }
    this.firstCellParticle[this.pNumCells] = u;
    for (var t = 0; t < this.numParticles; t++) {
      if (this.particleStatuses[t]) {
        var r = this.particlePos[t * 2];
        var n = this.particlePos[t * 2 + 1];
        var a = clamp(Math.floor(r * this.pInvSpacing), 0, this.pNumX - 1);
        var l = clamp(Math.floor(n * this.pInvSpacing), 0, this.pNumY - 1);
        var c = a * this.pNumY + l;
        this.firstCellParticle[c]--;
        this.cellParticleIds[this.firstCellParticle[c]] = t;
      }
    }
    var f = this.particleRadius * 3;
    var p = f * f;
    for (var g = 0; g < e; g++) {
      for (var t = 0; t < this.numParticles; t++) {
        if (this.particleStatuses[t]) {
          var v = this.particlePos[t * 2];
          var _ = this.particlePos[t * 2 + 1];
          var T = Math.floor(v * this.pInvSpacing);
          var M = Math.floor(_ * this.pInvSpacing);
          var S = Math.max(T - 1, 0);
          var b = Math.max(M - 1, 0);
          for (var C = Math.min(T + 1, this.pNumX - 1), w = Math.min(M + 1, this.pNumY - 1), a = S; a <= C; a++) {
            for (var l = b; l <= w; l++) {
              var c = a * this.pNumY + l;
              var u = this.firstCellParticle[c];
              for (var R = this.firstCellParticle[c + 1], E = u; E < R; E++) {
                var I = this.cellParticleIds[E];
                if (I != t && this.particleStatuses[I]) {
                  var F = this.particlePos[I * 2];
                  var k = this.particlePos[I * 2 + 1];
                  var L = F - v;
                  var D = k - _;
                  var ne = L * L + D * D;
                  if (!(ne > p) && ne != 0) {
                    var re = Math.sqrt(ne);
                    var ce = (f - re) * 0.5 / re;
                    L *= ce;
                    D *= ce;
                    this.particlePos[t * 2] -= L;
                    this.particlePos[t * 2 + 1] -= D;
                    this.particlePos[I * 2] += L;
                    this.particlePos[I * 2 + 1] += D;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  handleParticleCollisions(e, t, r, n, a, l) {
    var c = 1 / this.fInvSpacing;
    var u = this.particleRadius;
    var f = n + u;
    var p = f * f;
    var g = c + u;
    var v = (this.fNumX - 1) * c - u;
    var _ = c + u;
    var T = (this.fNumY - 1) * c - u;
    var M = this.isFlushing;
    for (var S = 0; S < this.numParticles; S++) {
      if (this.particleStatuses[S]) {
        var b = this.particlePos[S * 2];
        var C = this.particlePos[S * 2 + 1];
        var w = b - t;
        var R = C - r;
        var E = w * w + R * R;
        if (E < p) {
          var I = Math.sqrt(E);
          var F = (f - I) / I;
          b += w * F;
          C += R * F;
          this.particleVel[S * 2] = a * 2;
          this.particleVel[S * 2 + 1] = l * 2;
        }
        let k = b - this.particlePrevPos[S * 2];
        let L = C - this.particlePrevPos[S * 2 + 1];
        let D = Math.sqrt(k * k + L * L);
        if (D > 0) {
          let ne = k / D;
          let re = L / D;
          let ce = 1 / (Math.abs(ne) > 0.0001 ? ne : 0.0001);
          let z = 1 / (Math.abs(re) > 0.0001 ? re : 0.0001);
          for (let j = 0; j < this.colliderRectList.length; j++) {
            let X = this.colliderRectList[j];
            if (b > X.l && b < X.r && C > X.b && C < X.t) {
              let Z = b - X.cx;
              let q = C - X.cy;
              let ue = Z * ce;
              let oe = q * z;
              let te = Math.abs(ce) * X.hw;
              let le = Math.abs(z) * X.hh;
              let Te = Math.max(-ue - te, -oe - le);
              b = b + ne * Te;
              C = C + re * Te;
            }
          }
        }
        if (b < g) {
          b = g;
          this.particleVel[S * 2] = 0;
        }
        if (b > v) {
          b = v;
          this.particleVel[S * 2] = 0;
        }
        if (C < _) {
          if (M) {
            b = -10000;
            C = 0;
            this.particleStatuses[S] = 0;
          } else {
            C = _;
            this.particleVel[S * 2 + 1] = 0;
          }
        }
        if (C > T) {
          C = T;
          this.particleVel[S * 2 + 1] = 0;
        }
        this.particlePos[S * 2] = b;
        this.particlePos[S * 2 + 1] = C;
      }
    }
    for (var S = 0; S < this.numParticles; S++) {
      _v0.fromArray(this.particleVel, S * 2);
      let L = _v0.length();
      if (L > 0.00001) {
        _v2.fromArray(this.particleDir, S * 2);
        _v1.fromArray(this.particleInfo, S * 2);
        _v1.y = math.mix(_v1.y, 0, 1 - Math.exp(e * -4));
        _v0.multiplyScalar(1 / L);
        let D = Math.atan2(_v0.y, _v0.x);
        let ne = Math.atan2(_v2.y, _v2.x);
        _v1.y += L * math.normalizeAngle(D - ne);
        _v1.x += _v1.y * e;
        _v1.toArray(this.particleInfo, S * 2);
        _v2.toArray(this.particleDir, S * 2);
      }
      this.particlePrevPos[S * 2] = this.particlePos[S * 2];
      this.particlePrevPos[S * 2 + 1] = this.particlePos[S * 2 + 1];
    }
  }
  updateParticleDensity() {
    var e = this.fNumY;
    var t = this.h;
    var r = this.fInvSpacing;
    var n = t * 0.5;
    var a = this.particleDensity;
    a.fill(0);
    for (var l = 0; l < this.numParticles; l++) {
      if (this.particleStatuses[l]) {
        var c = this.particlePos[l * 2];
        var u = this.particlePos[l * 2 + 1];
        c = clamp(c, t, (this.fNumX - 1) * t);
        u = clamp(u, t, (this.fNumY - 1) * t);
        var f = Math.floor((c - n) * r);
        var p = (c - n - f * t) * r;
        var g = Math.min(f + 1, this.fNumX - 2);
        var v = Math.floor((u - n) * r);
        var _ = (u - n - v * t) * r;
        var T = Math.min(v + 1, this.fNumY - 2);
        var M = 1 - p;
        var S = 1 - _;
        if (f < this.fNumX && v < this.fNumY) {
          a[f * e + v] += M * S;
        }
        if (g < this.fNumX && v < this.fNumY) {
          a[g * e + v] += p * S;
        }
        if (g < this.fNumX && T < this.fNumY) {
          a[g * e + T] += p * _;
        }
        if (f < this.fNumX && T < this.fNumY) {
          a[f * e + T] += M * _;
        }
      }
    }
    if (this.particleRestDensity == 0) {
      var b = 0;
      var C = 0;
      for (var l = 0; l < this.fNumCells; l++) {
        if (this.cellType[l] == FLUID_CELL) {
          b += a[l];
          C++;
        }
      }
      if (C > 0) {
        this.particleRestDensity = b / C;
      }
    }
  }
  transferVelocities(e, t) {
    var r = this.fNumY;
    var n = this.h;
    var a = this.fInvSpacing;
    var l = n * 0.5;
    if (e) {
      this.prevU.set(this.u);
      this.prevV.set(this.v);
      this.du.fill(0);
      this.dv.fill(0);
      this.u.fill(0);
      this.v.fill(0);
      for (var c = 0; c < this.fNumCells; c++) {
        this.cellType[c] = this.s[c] == 0 ? SOLID_CELL : AIR_CELL;
      }
      for (var c = 0; c < this.numParticles; c++) {
        if (this.particleStatuses[c]) {
          var u = this.particlePos[c * 2];
          var f = this.particlePos[c * 2 + 1];
          var p = clamp(Math.floor(u * a), 0, this.fNumX - 1);
          var g = clamp(Math.floor(f * a), 0, this.fNumY - 1);
          var v = p * r + g;
          if (this.cellType[v] == AIR_CELL) {
            this.cellType[v] = FLUID_CELL;
          }
        }
      }
    }
    for (var _ = 0; _ < 2; _++) {
      var T = _ == 0 ? 0 : l;
      var M = _ == 0 ? l : 0;
      var S = _ == 0 ? this.u : this.v;
      var b = _ == 0 ? this.prevU : this.prevV;
      var C = _ == 0 ? this.du : this.dv;
      for (var c = 0; c < this.numParticles; c++) {
        if (this.particleStatuses[c]) {
          var u = this.particlePos[c * 2];
          var f = this.particlePos[c * 2 + 1];
          u = clamp(u, n, (this.fNumX - 1) * n);
          f = clamp(f, n, (this.fNumY - 1) * n);
          var w = Math.min(Math.floor((u - T) * a), this.fNumX - 2);
          var R = (u - T - w * n) * a;
          var E = Math.min(w + 1, this.fNumX - 2);
          var I = Math.min(Math.floor((f - M) * a), this.fNumY - 2);
          var F = (f - M - I * n) * a;
          var k = Math.min(I + 1, this.fNumY - 2);
          var L = 1 - R;
          var D = 1 - F;
          var ne = L * D;
          var re = R * D;
          var ce = R * F;
          var z = L * F;
          var j = w * r + I;
          var X = E * r + I;
          var Z = E * r + k;
          var q = w * r + k;
          if (e) {
            var ue = this.particleVel[c * 2 + _];
            S[j] += ue * ne;
            C[j] += ne;
            S[X] += ue * re;
            C[X] += re;
            S[Z] += ue * ce;
            C[Z] += ce;
            S[q] += ue * z;
            C[q] += z;
          } else {
            var oe = _ == 0 ? r : 1;
            var te = this.cellType[j] != AIR_CELL || this.cellType[j - oe] != AIR_CELL ? 1 : 0;
            var le = this.cellType[X] != AIR_CELL || this.cellType[X - oe] != AIR_CELL ? 1 : 0;
            var Te = this.cellType[Z] != AIR_CELL || this.cellType[Z - oe] != AIR_CELL ? 1 : 0;
            var K = this.cellType[q] != AIR_CELL || this.cellType[q - oe] != AIR_CELL ? 1 : 0;
            var G = this.particleVel[c * 2 + _];
            var C = te * ne + le * re + Te * ce + K * z;
            if (C > 0) {
              var U = (te * ne * S[j] + le * re * S[X] + Te * ce * S[Z] + K * z * S[q]) / C;
              var N = (te * ne * (S[j] - b[j]) + le * re * (S[X] - b[X]) + Te * ce * (S[Z] - b[Z]) + K * z * (S[q] - b[q])) / C;
              var he = G + N;
              this.particleVel[c * 2 + _] = (1 - t) * U + t * he;
            }
          }
        }
      }
      if (e) {
        for (var c = 0; c < S.length; c++) {
          if (C[c] > 0) {
            S[c] /= C[c];
          }
        }
        for (var c = 0; c < this.fNumX; c++) {
          for (var ve = 0; ve < this.fNumY; ve++) {
            var de = this.cellType[c * r + ve] == SOLID_CELL;
            if (de || c > 0 && this.cellType[(c - 1) * r + ve] == SOLID_CELL) {
              this.u[c * r + ve] = this.prevU[c * r + ve];
            }
            if (de || ve > 0 && this.cellType[c * r + ve - 1] == SOLID_CELL) {
              this.v[c * r + ve] = this.prevV[c * r + ve];
            }
          }
        }
      }
    }
  }
  solveIncompressibility(e, t, r, n = true) {
    this.p.fill(0);
    this.prevU.set(this.u);
    this.prevV.set(this.v);
    var a = this.fNumY;
    var l = this.density * this.h / t;
    for (var c = 0; c < this.fNumCells; c++) {
      this.u[c];
      this.v[c];
    }
    for (var u = 0; u < e; u++) {
      for (var c = 1; c < this.fNumX - 1; c++) {
        for (var f = 1; f < this.fNumY - 1; f++) {
          if (this.cellType[c * a + f] == FLUID_CELL) {
            var p = c * a + f;
            var g = (c - 1) * a + f;
            var v = (c + 1) * a + f;
            var _ = c * a + f - 1;
            var T = c * a + f + 1;
            var w = this.s[p];
            var M = this.s[g];
            var S = this.s[v];
            var b = this.s[_];
            var C = this.s[T];
            var w = M + S + b + C;
            if (w != 0) {
              var R = this.u[v] - this.u[p] + this.v[T] - this.v[p];
              if (this.particleRestDensity > 0 && n) {
                var E = 0.5;
                var I = this.particleDensity[c * a + f] - this.particleRestDensity;
                if (I > 0) {
                  R = R - E * I;
                }
              }
              var F = -R / w;
              F *= r;
              this.p[p] += l * F;
              this.u[p] -= M * F;
              this.u[v] += S * F;
              this.v[p] -= b * F;
              this.v[T] += C * F;
            }
          }
        }
      }
    }
  }
  resetParticles() {}
  simulate(e, t, r, n, a, l, c, u, f, p, g, v, _) {
    e = Math.min(e, 1 / 60);
    var T = 1;
    var M = e / T;
    let S = Math.ceil(EMIT_RATE * e);
    let b = 0;
    for (var C = 0; C < T; C++) {
      for (let R = 0; R < this.numParticles && !(b / T >= S); R++) {
        if (this.particleStatuses[R] == 0) {
          let E = Math.random();
          this.particlePos[R * 2 + 0] = this.particlePrevPos[R * 2 + 0] = this.particlePosOut[R * 2 + 0] = math.mix(this.emitterPosA.x, this.emitterPosB.x, E) + (Math.random() - 0.5) * 0.01;
          this.particlePos[R * 2 + 1] = this.particlePrevPos[R * 2 + 1] = this.particlePosOut[R * 2 + 1] = math.mix(this.emitterPosA.y, this.emitterPosB.y, E) + (Math.random() - 0.5) * 0.01;
          this.particleInfo[R * 2 + 0] = Math.random() * Math.PI * 2;
          this.particleInfo[R * 2 + 1] = 0;
          this.particleDir[R * 2 + 0] = 0;
          this.particleDir[R * 2 + 1] = -1;
          let I = (2 + Math.pow(Math.random(), 2) * 3) * t * 0.1;
          this.particleVel[R * 2 + 0] = 0;
          this.particleVel[R * 2 + 1] = I;
          this.particleStatuses[R] = 1;
          b++;
        }
      }
      this.integrateParticles(M, t);
      if (u) {
        this.pushParticlesApart(a);
      }
      this.handleParticleCollisions(M, f, p, g, v, _);
      this.transferVelocities(true);
      this.updateParticleDensity();
      this.solveIncompressibility(n, M, l, c);
      this.transferVelocities(false, r);
      for (var w = 0; w < this.numParticles; w++) {
        this.particlePosOut[w * 2] = this.particlePos[w * 2] + (this.particlePosOut[w * 2] - this.particlePrevPos[w * 2]) * 0.5;
        this.particlePosOut[w * 2 + 1] = this.particlePos[w * 2 + 1] + (this.particlePosOut[w * 2 + 1] - this.particlePrevPos[w * 2 + 1]) * 0.5;
      }
    }
  }
}
const flipSim = new FlipSim();
const vert = `#define GLSLIFY 1
attribute vec2 instancedPos;attribute vec2 instancedInfo;uniform vec2 u_tankOffset;uniform vec2 u_tankSize;uniform vec2 u_tankActualSize;uniform vec2 u_renderScale;uniform float u_radius;uniform float u_opacity;
#include <ufxVert>
#ifdef IS_TEXTURE
attribute vec4 instanceColorShape;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#endif
void main(){float angle=instancedInfo.x;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);vec3 basePos=vec3((instancedPos-u_tankOffset)/u_tankActualSize-vec2(.5),0.0);basePos.y=-basePos.y;basePos.xy*=u_renderScale*2.;float particleSize=1.;
#ifdef IS_TEXTURE
float colorFract=fract(instanceColorShape.w/3.);v_color=instanceColorShape.rgb;v_colorMix=vec3(colorFract<0.25 ? 1. : 0.,abs(colorFract-.5)<0.25 ? 1. : 0.,colorFract>0.75 ? 1. : 0.);v_uv=uv;v_uv.x=(v_uv.x+floor(instanceColorShape.w/3.))/8.;
#else
particleSize+=min(1.,abs(instancedInfo.y)*0.01);
#endif
vec3 screenPos=getScreenPosition(basePos);screenPos.xy+=(m*position.xy)*u_radius*particleSize*u_renderScale.x*2.*u_opacity;gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);}`;
const frag$3 = `#define GLSLIFY 1
#ifdef IS_TEXTURE
uniform sampler2D u_texture;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#else
uniform vec3 u_color;
#endif
void main(){
#ifdef IS_TEXTURE
float a=dot(v_colorMix,texture2D(u_texture,v_uv).rgb);gl_FragColor=vec4(v_color,a);
#else
gl_FragColor=vec4(u_color,1.);
#endif
}`;
let COLORS = ["#ff383c", "#0029ff", "#bb2bff", "#1eff5d", "#cfff0f", "#d6e4ec", "#bbcbda", "#7a8d9b", "#262229"];
class FlipAnimation {
  PRESSURE_ITERATION = 60;
  NUM_PARTICLES_ITERS = 4;
  OVER_RELAXATION = 1;
  FLIP_RATIO = 0;
  mesh;
  meshList = [];
  top = 0;
  height = 0;
  gravity = 0;
  isActive = false;
  needsReset = false;
  hasDown = false;
  prevViewportWidth = 0;
  prevViewportHeight = 0;
  opacity = 1;
  colorHex;
  container = new Object3D();
  shapedContainer = new Object3D();
  texturedContainer = new Object3D();
  prevUseTextured = null;
  useTextured = true;
  sharedUniforms = {
    u_tankOffset: {
      value: new Vector2()
    },
    u_tankSize: {
      value: new Vector2()
    },
    u_tankActualSize: {
      value: new Vector2()
    },
    u_radius: {
      value: 0
    },
    u_opacity: {
      value: 0
    },
    u_renderScale: {
      value: new Vector2()
    },
    u_color: {
      value: new Color("#1A2FFB")
    },
    u_texture: {
      value: null
    }
  };
  preInit() {
    let e = [];
    for (let n = 0; n < COLORS.length; n++) {
      COLORS[n] = new Color(COLORS[n]);
    }
    let t = new BufferGeometry();
    t.setAttribute("position", new BufferAttribute(new Float32Array([0.0714286, -0.5, 0, -0.0714286, -0.5, 0, 0.5, -0.0714286, 0, 0.0714286, -0.0714286, 0, -0.0714286, -0.0714286, 0, -0.5, -0.0714286, 0, 0.5, 0.0714286, 0, 0.0714286, 0.0714286, 0, -0.0714286, 0.0714286, 0, -0.5, 0.0714286, 0, 0.0714286, 0.5, 0, -0.0714286, 0.5, 0]), 3));
    t.setIndex(new BufferAttribute(new Uint8Array([4, 5, 9, 0, 4, 3, 8, 7, 3, 7, 2, 3, 7, 6, 2, 11, 10, 7, 7, 8, 11, 3, 4, 8, 0, 1, 4, 4, 9, 8]), 1));
    e.push(t);
    e.push(new PlaneGeometry(0.8, 0.8));
    e.push(new CircleGeometry(0.4, 10));
    e.push(new CircleGeometry(0.5, 3));
    e.push(new PlaneGeometry(1.6, 1.6));
    let r = properties.loader.add(settings.TEXTURE_PATH + "flip_texture.png", {
      type: "texture"
    }).content;
    this.sharedUniforms.u_texture.value = r;
    for (let n = 0; n < e.length; n++) {
      let a = e[n];
      let l = new InstancedBufferGeometry();
      for (let u in a.attributes) {
        l.setAttribute(u, a.attributes[u]);
      }
      l.index = a.index;
      let c = new UfxMesh({
        geometry: l,
        material: new ShaderMaterial({
          uniforms: this.sharedUniforms,
          vertexShader: vert,
          fragmentShader: frag$3,
          depthWrite: false,
          depthTest: false,
          side: DoubleSide
        })
      });
      c.material.extensions.derivatives = true;
      c.frustumCulled = false;
      if (n < e.length - 1) {
        this.shapedContainer.add(c);
      } else {
        this.texturedContainer.add(c);
        c.material.defines.IS_TEXTURE = true;
        c.material.transparent = true;
      }
      this.meshList.push(c);
    }
    this.container.add(this.shapedContainer);
    this.container.add(this.texturedContainer);
    pageExtraSections.postUfxContainer.add(this.container);
  }
  init() {}
  reInitTank() {
    let e = properties.viewportWidth;
    let t = properties.viewportHeight;
    scrollManager.syncDom();
    this.capturedOffsetY = -scrollManager.scrollPixel + endSection.offsetY;
    let r = document.querySelector("#end-section-outer").getBoundingClientRect().top - this.capturedOffsetY;
    let n = document.querySelector("#end-section-outer").getBoundingClientRect().bottom - this.capturedOffsetY;
    let a = this.prevViewportWidth != e || this.prevViewportHeight != t || !flipSim.hasInitialized || this.prevUseTextured !== this.useTextured;
    this.prevUseTextured = this.useTextured;
    if (a) {
      this.prevViewportWidth = properties.viewportWidth;
      this.prevViewportHeight = properties.viewportHeight;
    }
    var l = 2;
    var c = l * t / e;
    let u = this.useTextured ? 0.4 : 1;
    var f = Math.ceil(math.fit(e, 320, 2560, 20, 90) * u);
    var p = this.tankWidth = l * 1;
    var g = this.tankHeight = c * 1;
    var v = p / f;
    var _ = 1;
    this.gravity = Math.ceil(math.fit(e, 320, 2560, -15, -3)) * (this.useTextured ? 1.5 : 1);
    var T = v * 0.2;
    var M = Math.ceil(math.fit(e, 320, 2560, 20, 80) * u);
    var S = Math.ceil(M * t / e);
    var b = Math.ceil(M * S / (this.meshList.length - 1)) * (this.meshList.length - 1);
    if (a) {
      flipSim.init(_, p, g, v, T, b);
    }
    this.sharedUniforms.u_tankOffset.value.set(flipSim.h, flipSim.h);
    this.sharedUniforms.u_tankSize.value.set(p, g);
    this.sharedUniforms.u_tankActualSize.value.set(flipSim.tankInnerWidth, flipSim.tankInnerHeight);
    this.sharedUniforms.u_radius.value = T;
    this.sharedUniforms.u_renderScale.value.set(e / p, e / p * flipSim.tankInnerHeight / flipSim.tankInnerWidth);
    let C = r + n >> 1;
    let w = e;
    let R = flipSim.tankInnerHeight / flipSim.tankInnerWidth * w;
    r = C - R / 2;
    n = C + R / 2;
    this.top = r;
    this.height = R;
    let E = flipSim.particlePosOut.length / 2;
    let I = Math.floor(E / (this.meshList.length - 1));
    let F = 0;
    for (let k = 0; k < this.meshList.length; k++) {
      let L = this.meshList[k];
      if (a) {
        let D;
        if (k < this.meshList.length - 1) {
          D = new InstancedInterleavedBuffer(flipSim.particlePosOut, 2, 4);
          L.geometry.setAttribute("instancedPos", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          D.count /= 4;
          D = new InstancedInterleavedBuffer(flipSim.particleInfo, 2, 4);
          L.geometry.setAttribute("instancedInfo", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          D.count /= 4;
          F += I;
        } else {
          L.geometry.setAttribute("instancedPos", new InstancedBufferAttribute(flipSim.particlePosOut, 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          L.geometry.setAttribute("instancedInfo", new InstancedBufferAttribute(flipSim.particleInfo, 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          let ne = flipSim.particlePosOut.length / 2;
          let re = new Float32Array(ne * 4);
          for (let ce = 0, z = 0; ce < ne; ce++, z += 4) {
            let j = ce % 45;
            j = j < 5 ? j : 5 + (j - 5) % 4;
            let X = COLORS[j];
            re[z + 0] = X.r;
            re[z + 1] = X.g;
            re[z + 2] = X.b;
            re[z + 3] = ~~(ce / 23) % 23;
          }
          L.geometry.setAttribute("instanceColorShape", new InstancedBufferAttribute(re, 4));
        }
        L.geometry._maxInstanceCount = flipSim.maxParticles;
      }
      L.syncRect(0, r + this.capturedOffsetY, e, R, this.capturedOffsetY);
    }
    if (a && !this.useTextured) {
      let k = document.querySelector("#end-bottom");
      flipSim.addColliderRect(this.convertDomRectToTankRect(k.getBoundingClientRect()), -1, -1, -1, -1);
    }
    this.hasDown = false;
  }
  resize() {
    if (this.isActive && this.meshList.length > 0) {
      this.reInitTank();
    } else {
      this.needsReset = true;
    }
    this.hasDown = false;
  }
  convertDomRectToTankRect(e) {
    let t = this.convertPixelXYToTankXY(e.left, e.bottom);
    let r = this.convertPixelSizeToTankSize(e.width, e.height);
    return {
      x: t.x,
      y: t.y,
      w: r.w,
      h: r.h
    };
  }
  convertPixelSizeToTankSize(e, t) {
    return {
      w: e / properties.viewportWidth * flipSim.tankInnerWidth,
      h: t / this.height * flipSim.tankInnerHeight
    };
  }
  convertPixelXYToTankXY(e, t) {
    let r = this.convertPixelSizeToTankSize(math.clamp(e, 0, properties.viewportWidth - 1), math.clamp(this.top + this.height - t - scrollManager.scrollPixel + endSection.offsetY, 0, properties.viewportHeight - 1));
    return {
      x: r.w + flipSim.h,
      y: r.h + flipSim.h
    };
  }
  update(e) {
    if (this.isActive) {
      if (this.needsReset || this.prevUseTextured !== this.useTextured) {
        this.needsReset = false;
        this.reInitTank();
      }
      if (properties.hasInitialized) {
        if (this.useTextured) {
          this.shapedContainer.visible = false;
          this.texturedContainer.visible = true;
        } else {
          this.shapedContainer.visible = true;
          this.texturedContainer.visible = false;
        }
        let t = -scrollManager.scrollPixel + endSection.offsetY;
        this.sharedUniforms.u_color.value.setStyle(this.colorHex);
        this.sharedUniforms.u_opacity.value = this.opacity;
        if (this.meshList[0].testViewport(t)) {
          e = Math.max(1 / 120, e);
          let r = true;
          let n = true;
          let a = this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y);
          let l = this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y);
          let c = l.x;
          let u = l.y;
          let f = (l.x - a.x) / e;
          let p = (l.y - a.y) / e;
          let g = 150 / properties.viewportWidth * (properties.useMobileLayout ? input.isDown ? 0.35 : 0 : math.fit(Math.sqrt(f * f + p * p), 0, 2, 0.2, 1));
          if (input.isDown && !properties.useMobileLayout) {
            c = -1000;
            u = -1000;
            this.hasDown = true;
            flipSim.isFlushing = true;
            flipSim.emitterPosA.copy(this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y));
            flipSim.emitterPosB.copy(this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y));
          } else {
            if (!this.hasDown) {
              flipSim.emitterPosA.copy(flipSim.emitterPosB.set(1, this.tankHeight * 0.5, 0));
            }
            flipSim.isFlushing = false;
          }
          flipSim.simulate(e, this.gravity, this.FLIP_RATIO, this.PRESSURE_ITERATION, this.NUM_PARTICLES_ITERS, this.OVER_RELAXATION, r, n, c, u, g, f, p);
          for (let v = 0; v < this.meshList.length; v++) {
            let _ = this.meshList[v];
            _.geometry.attributes.instancedPos.needsUpdate = true;
            _.geometry.attributes.instancedInfo.needsUpdate = true;
            _.update(t);
            _.visible = true;
          }
        } else {
          for (let r = 0; r < this.meshList.length; r++) {
            let n = this.meshList[r];
            n.visible = false;
          }
        }
      }
    } else {
      this.needsReset = true;
      for (let t = 0; t < this.meshList.length; t++) {
        let r = this.meshList[t];
        r.visible = false;
      }
    }
  }
}
const flipAnimation = new FlipAnimation();
class EndSection {
  domContainer;
  offsetY = 0;
  _needsReset = true;
  ROLLUP_ANIMATION_DURATION = 1;
  ROLLUP_ANIMATION_INTERVAL = 2;
  activeRatio = 0;
  hoverRatio = 0;
  time = 0;
  isHover = false;
  preInit() {
    this.domContainer = document.getElementById("end-section");
    this.outerContainer = document.getElementById("end-section-outer");
    this.domContent = document.getElementById("end-section-content");
    this.domTitle = document.getElementById("end-section-title");
    this.domTitleLink = document.getElementById("end-section-title-link");
    this.domTitleTopDecoration = document.getElementById("end-section-title-top-decoration");
    this.domTitleBottomLeftDecoration = document.getElementById("end-section-title-bottom-left-decoration");
    this.domTitleBottomRightDecoration = document.getElementById("end-section-title-bottom-right-decoration");
    this.domSubtitle = document.getElementById("end-section-subtitle-text");
    this.domButton = document.getElementById("end-bottom");
    this.domCrosses = Array.from(document.querySelectorAll(".end-section-content-cross"));
    flipAnimation.preInit();
  }
  init() {
    flipAnimation.init();
    if (!properties.useMobileLayout) {
      this.domTitle.addEventListener("mouseenter", this._onDomTitleMouseenter.bind(this));
      this.domTitle.addEventListener("mouseleave", this._onDomTitleMouseleave.bind(this));
    }
  }
  resize(e, t) {
    this.domContent.style.transform = "translate3d(-50%,-50%,0) scale3d(1,1,1)";
    this._splitText();
    this._needsReset = true;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    if (pagesManager.scrollTargetPage) {
      flipAnimation.isActive = pagesManager.scrollTargetPage.hasEndVisual;
      flipAnimation.colorHex = pagesManager.scrollTargetPage.endVisualColor;
      flipAnimation.useTextured = pagesManager.scrollTargetPage.endVisualUseTextured;
      flipAnimation.container.visible = flipAnimation.isActive;
      flipAnimation.opacity = math.fit(pagesManager.scrollTargetPage.hideRatio, 0, 0.3, 1, 0);
    }
    let n = math.fit(t.hideScreenOffset, -0.75, 0, 0, 1);
    let a = math.mix(1, 0.9, n);
    this.offsetY = Math.max(0, -t.screenY);
    this.outerContainer.style.transform = `translate3d(0, ${this.offsetY - Math.max(0, t.hideScreenOffset) * properties.viewportHeight}px, 0)`;
    this.domContent.style.transform = `translate3d(-50%,-50%,0) scale3d(${a}, ${a}, ${a})`;
    if (r) {
      if (this._needsReset) {
        this._reset();
      }
      let l = pagesManager.scrollTargetPage ? pagesManager.scrollTargetPage.endSectionActiveThreshold : 1;
      let c = t.showScreenOffset > l;
      let u = this.time;
      this.activeRatio = math.saturate(this.activeRatio + (c ? e : -e));
      this.hoverRatio = math.saturate(this.hoverRatio + (this.isHover && this.activeRatio == 1 ? e : -e));
      this.time += e;
      let f = u % this.ROLLUP_ANIMATION_INTERVAL;
      let p = this.time % this.ROLLUP_ANIMATION_INTERVAL;
      this.domTitle.style.pointerEvents = c && this.activeRatio > 0.75 ? "auto" : "none";
      for (let v = 0; v < this.domCrosses.length; v++) {
        let _ = v / (this.domCrosses.length - 1);
        let T = math.fit(this.activeRatio, _ * 0.2, _ * 0.2 + 0.7, 0, 1, ease.lusion);
        let M = this.domCrosses[v];
        let S = math.fit(T, 0, 1, 0, 1, ease.lusion);
        let b = math.fit(T, 0, 1, 0, 180, ease.lusion);
        M.style.transform = `scale(${S}) rotate(${b}deg)`;
      }
      if (!properties.useMobileLayout) {
        for (let v = 0; v < this.domSubtitle._splitted.words.length; v++) {
          let _ = this.domSubtitle._splitted.words[v];
          let T = v / (this.domSubtitle._splitted.words.length - 1);
          let M = math.fit(this.activeRatio, T * 0.15, T * 0.15 + 0.75, 200, 0, ease.lusion);
          let S = math.fit(this.activeRatio, T * 0.1, T * 0.1 + 0.8, 30, 0, ease.lusion);
          _.style.transform = `translate3d(0, ${M}%, 0) rotate(${S}deg)`;
        }
      }
      for (let v = 0; v < this.domTitleLink._splitted.words.length; v++) {
        let _ = this.domTitleLink._splitted.words[v];
        let T = v / (this.domTitleLink._splitted.words.length - 1);
        if (f > p) {
          _._randCharIndex = Math.floor(Math.random() * _._chars.length);
          if (_._ratio == 0) {
            _._ratio = 0.001;
          }
        }
        if (_._ratio > 0) {
          _._ratio = math.saturate(_._ratio + (c ? e / this.ROLLUP_ANIMATION_DURATION : -e * 2));
          if (_._ratio == 1) {
            _._ratio = 0;
          }
        }
        for (let M = 0; M < _._chars.length; M++) {
          let S = _._chars[M];
          let b = M / (_._chars.length - 1);
          let C = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.activeRatio, T * 0.15 + b * 0.15, T * 0.15 + b * 0.15 + 0.7, 100, 0, ease.lusion) : 0;
          if (M === _._randCharIndex) {
            S._wrapper.style.transform = `translate3d(0, ${math.fit(_._ratio, T * 0.2, T * 0.2 + 0.8, 0, -100, ease.lusion)}%, 0)`;
          } else {
            S._wrapper.style.transform = "translateZ(0)";
          }
          S.style.transform = `translate3d(0, ${C}%, 0)`;
        }
      }
      this.domTitleTopDecoration.style.transform = `scale3d(${math.fit(this.hoverRatio, 0, 0.7, 0, 1, ease.cubicInOut)}, 1, 1)`;
      let g = math.fit(this.hoverRatio, 0.2, 1, 0, 1, ease.cubicInOut);
      this.domTitleBottomLeftDecoration.style.transform = `scale3d(${math.fit(g, 0, 0.35, 0, 1)}, 1, 1)`;
      this.domTitleBottomRightDecoration.style.transform = `scale3d(${math.fit(g, 0.4, 1, 0, 1)}, 1, 1)`;
    } else {
      this._needsReset = true;
      flipAnimation.isActive = false;
    }
    flipAnimation.update(e);
  }
  _splitText() {
    this.domSubtitle._originalHTML = this.domSubtitle._originalHTML || this.domSubtitle.innerHTML;
    this.domSubtitle.innerHTML = this.domSubtitle._originalHTML;
    this.domTitleLink._originalHTML = this.domTitleLink._originalHTML || this.domTitleLink.innerHTML;
    this.domTitleLink.innerHTML = this.domTitleLink._originalHTML;
    if (properties.useMobileLayout) {
      if (this.domSubtitle._splitted) {
        this.domSubtitle._splitted.revert();
      }
    } else {
      this.domSubtitle._splitted = new SplitType(this.domSubtitle, {
        types: "lines, words"
      });
      for (let e = 0; e < this.domSubtitle._splitted.lines.length; e++) {
        let t = this.domSubtitle._splitted.lines[e];
        let r = document.createElement("div");
        r.style.position = "relative";
        r.style.overflow = "hidden";
        r.append(t);
        this.domSubtitle.append(r);
      }
    }
    this.domTitleLink._splitted = new SplitType(this.domTitleLink, {
      types: "lines, words",
      lineClass: "end-section-title-link-line",
      wordClass: "end-section-title-link-word"
    });
    for (let e = 0; e < this.domTitleLink._splitted.lines.length; e++) {
      let t = this.domTitleLink._splitted.lines[e];
      if (e === 0) {
        t.append(this.domTitleTopDecoration);
      } else {
        t.append(this.domTitleBottomLeftDecoration);
        t.append(this.domTitleBottomRightDecoration);
      }
    }
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e];
      let r = new SplitType(t, {
        types: "chars"
      });
      t._chars = r.chars;
      t._ratio = 0;
      for (let n = 0; n < t._chars.length; n++) {
        let a = t._chars[n];
        let l = a.cloneNode(true);
        let c = document.createElement("div");
        c.classList.add("char-wrapper");
        c.style.display = "inline-block";
        a._wrapper = c;
        c.append(a);
        c.append(l);
        t.append(c);
      }
    }
  }
  _reset() {
    this._needsReset = false;
    this.time = 0;
    this.hoverRatio = 0;
    this.activeRatio = 0;
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e];
      for (let r = 0; r < t._chars.length; r++) {
        let n = t._chars[r];
        n._wrapper.style.transform = "translate3d(0, 0, 0)";
        n.style.transform = "translate3d(0, 0, 0)";
      }
    }
    flipAnimation.needsReset = true;
  }
  _onDomTitleMouseenter() {
    this.isHover = true;
  }
  _onDomTitleMouseleave() {
    this.isHover = false;
  }
}
const endSection = new EndSection();
class ScrollNavSection {
  domContainer;
  domText;
  overScrollRatio = 0;
  downWaitTime = 0;
  _needsReset = true;
  path = "";
  preInit() {
    this.domContainer = document.getElementById("scroll-nav-section");
    this.domText = document.getElementById("scroll-nav-text");
    this.barInner = document.getElementById("scroll-nav-next-bar-inner");
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive;
    let n = scrollManager.scrollPixel >= scrollManager.contentSize * scrollManager.viewSizePixel - 5;
    let a = (input.deltaDragScrollY + input.deltaWheel) * (scrollManager.isActive && pagesManager.isIdle ? 1 : 0);
    this.downWaitTime = a > 0 ? 0.3 : Math.max(0, this.downWaitTime - e);
    this.overScrollRatio = r ? math.saturate(this.overScrollRatio + e * (n && a > 0 ? 2 : this.downWaitTime > 0 ? 0 : a < 0 ? -5 : -0.2) * (pagesManager.isIdle ? 1 : 0)) : 0;
    if (r) {
      let l = pagesManager.currRoute;
      this.barInner.style.transform = `scaleX(${this.overScrollRatio})`;
      if (scrollManager.isActive && pagesManager.isIdle) {
        if (this.path !== l.scrollNavPath) {
          this.path = l.scrollNavPath;
          this.domText.innerHTML = l.scrollNavText;
        }
        if (this.overScrollRatio == 1) {
          routeManager.setPath(this.path);
        }
      }
    }
  }
}
const scrollNavSection = new ScrollNavSection();
class PageExtraSections {
  isActive = true;
  domContainer;
  _needsResize = false;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  preInit() {
    preUfx.scene.add(this.preUfxContainer);
    postUfx.scene.add(this.postUfxContainer);
    this.domContainer = document.querySelector("#page-extra-sections");
    endSection.preInit();
    footerSection.preInit();
    scrollNavSection.preInit();
  }
  init() {
    endSection.init();
    footerSection.init();
    scrollNavSection.init();
  }
  resize(e, t) {
    this.preUfxContainer.visible = this.postUfxContainer.visible = false;
    if (pagesManager.scrollTargetPage) {
      if (pagesManager.scrollTargetPage.hasExtraPages) {
        this.preUfxContainer.visible = this.postUfxContainer.visible = true;
        this._needsResize = false;
        this.domContainer.style.display = "block";
        endSection.resize(e, t);
        footerSection.resize(e, t);
        scrollNavSection.resize(e, t);
      } else {
        this.domContainer.style.display = "none";
        this._needsResize = true;
      }
    }
  }
  update(e) {
    this.preUfxContainer.visible = this.postUfxContainer.visible = false;
    if (pagesManager.scrollTargetPage) {
      if (pagesManager.scrollTargetPage.hasExtraPages) {
        this.preUfxContainer.visible = this.postUfxContainer.visible = true;
        if (this._needsResize) {
          this.resize(properties.viewportWidth, properties.viewportHeight);
        }
        this.domContainer.style.display = "block";
        endSection.update(e);
        footerSection.update(e);
        scrollNavSection.update(e);
      } else {
        this.domContainer.style.display = "none";
        this._needsResize = true;
      }
    }
  }
}
const pageExtraSections = new PageExtraSections();
let LOADING_RECTS = [1, 1, 1, 3, 2, 4, 2, 1, 6, 2, 1, 2, 7, 1, 1, 1, 7, 4, 1, 1, 8, 2, 1, 2, 11, 2, 1, 3, 13, 2, 1, 3, 12, 1, 1, 1, 16, 1, 2, 1, 18, 2, 1, 2, 16, 4, 2, 1, 22, 1, 1, 4, 26, 1, 1, 4, 27, 1, 1, 1, 28, 2, 1, 3, 32, 1, 1, 1, 33, 3, 1, 1, 31, 1, 1, 3, 32, 4, 2, 1];
class TransitionOverlay {
  contentShowRatio = 0;
  contentHideRatio = 1;
  loadBarRatio = 0;
  lineTransformRatio = 0;
  showTextRatio = 0;
  waitTextRatio = 0;
  hideTextRatio = 1;
  pixelWidth = 0;
  needsShowText = false;
  needsHideText = false;
  loadingTextAnimation = 0;
  onShowTextCompleted = new MinSignal$2();
  onHideTextCompleted = new MinSignal$2();
  init() {
    this.canvas = document.getElementById("transition-overlay");
    this.ctx = this.canvas.getContext("2d");
  }
  resize(e, t) {
    e += 2;
    t += 2;
    this.canvas.width = e * settings.DPR;
    this.canvas.height = t * settings.DPR;
    this.canvas.style.width = e + "px";
    this.canvas.style.height = t + "px";
    this.pixelWidth = ~~Math.min(42, properties.viewportWidth / 30);
  }
  isReadyToHide() {}
  get activeRatio() {
    return Math.min(1 - this.contentShowRatio, this.contentHideRatio);
  }
  update(e) {
    if (this.activeRatio > 0) {
      let t = properties.viewportWidth + 2;
      let r = properties.viewportHeight + 2;
      let n = this.pixelWidth;
      let a = this.loadBarRatio;
      let l = this.lineTransformRatio;
      let c = Math.sqrt(t * t + r * r) / n;
      let u = this.ctx;
      u.save();
      u.scale(settings.DPR, settings.DPR);
      u.fillStyle = "#000";
      u.fillRect(0, 0, t, r);
      let f = ease.expoInOut(1 - this.activeRatio);
      let p = (1 + f * c) * n;
      u.translate(t * 0.5, r * 0.5);
      u.rotate(f * (this.contentShowRatio == 0 ? -1 : 1));
      u.translate(n * f * c, -n * 0.5 * f * c);
      u.scale(p, p);
      if (l == 0) {
        u.fillStyle = "#333";
        u.fillRect(-2.5, -0.5, 5, 1);
        u.fillStyle = "#fff";
        u.fillRect(-2.5, -0.5, a * 5, 1);
      } else {
        u.fillStyle = "#fff";
        if (this.needsShowText) {
          this.showTextRatio = this.showTextRatio + e * 1.25;
          if (this.showTextRatio >= 1) {
            this.showTextRatio = 1;
            this.needsShowText = false;
            this.onShowTextCompleted.dispatch();
          }
        }
        if (this.showTextRatio == 1) {
          this.waitTextRatio = Math.min(1, this.waitTextRatio + e * 3);
          if (this.waitTextRatio == 1 && this.needsHideText && taskManager.percent == 1) {
            this.hideTextRatio = this.hideTextRatio + e * 1.25;
            if (this.hideTextRatio >= 1) {
              this.hideTextRatio = 1;
              this.needsHideText = false;
              this.onHideTextCompleted.dispatch();
            }
          }
        }
        let g = this.showTextRatio;
        let v = this.hideTextRatio;
        let _ = math.fit(Math.min(g, 1 - v), 0, 0.5, 1, 0.2, ease.expoInOut);
        let T = (ease.expoInOut(g) + ease.expoInOut(v)) * -15;
        if (g > 0 && v < 1) {
          u.scale(_, _);
          u.translate(-l, l * 1.5);
          u.translate(T, 0);
          u.save();
          u.translate(-1.5, -4.5);
          u.beginPath();
          for (let M = 0, S = LOADING_RECTS.length / 4, b = 0; M < S; M++, b += 4) {
            u.fillStyle = "#fff";
            let C = LOADING_RECTS[b + 0];
            let w = LOADING_RECTS[b + 1];
            let R = LOADING_RECTS[b + 2];
            let E = LOADING_RECTS[b + 3];
            let I = M / (S - 1);
            let F = math.fit(g, I * 0.5, 0.5 + I * 0.5, 0, 1, ease.expoIn) * math.fit(v, I * 0.5, 0.5 + I * 0.5, 1, 0, ease.expoOut);
            if (g < 1) {
              if (M < 2) {
                F = 1;
              }
            } else if (M >= S - 2) {
              F = 1;
            }
            u.rect(C + (1 - F) * R * 0.5, w + (1 - F) * E * 0.5, R * F, E * F);
          }
          u.closePath();
          u.fill();
          u.restore();
        } else {
          u.translate(-l, l * 1.5);
          u.save();
          u.translate(0.5, -0.5);
          u.rotate(l * Math.PI * 0.5);
          u.globalCompositeOperation = "xor";
          u.fillRect(-3, 0, 3, 1);
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = 1 - f;
          u.fillRect(-3, 0, 3, 1);
          u.restore();
          u.save();
          u.translate(0.5, -0.5);
          u.globalCompositeOperation = "xor";
          u.fillRect(0, 0, 2, 1);
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = 1 - f;
          u.fillRect(0, 0, 2, 1);
          u.restore();
        }
      }
      u.restore();
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }
}
const transitionOverlay = new TransitionOverlay();
class PageManager {
  pages = {};
  pageList = [homePage, aboutPage, projectPage, projectsPage, playgroundPage];
  scrollTargetPage = null;
  domContainer = null;
  domInner = null;
  prevRoute = null;
  currRoute = null;
  _defaultRoute;
  _pendingRoute;
  _isHiding = false;
  _isShowing = false;
  _hasPreloaded = true;
  isFirstRoute = true;
  _needsShowLoading = false;
  onIdled = new MinSignal$2();
  onScrollTargetChanged = new MinSignal$2();
  NEEDS_LOG = false;
  constructor() {
    this._defaultRoute = new Route(undefined);
    this.prevRoute = this.currRoute = this._defaultRoute;
    for (let e = 0; e < this.pageList.length; e++) {
      let t = this.pageList[e];
      this.pages[t.id] = t;
      routeManager.addPath(t.path, t);
      preUfx.scene.add(t.preUfxContainer);
      postUfx.scene.add(t.postUfxContainer);
    }
    transitionOverlay.onShowTextCompleted.add(this._onShowTextComplete, this);
    transitionOverlay.onHideTextCompleted.add(this._onHideTextComplete, this);
    taskManager.onCompleted.add(this._onTaskComplete, this);
  }
  preInit() {
    this.domContainer = document.getElementById("page-container");
    this.domContainerInner = document.getElementById("page-container-inner");
    routeManager.onRouteChanged.add(this._onRouteChanged, this);
    this._onRouteChanged(routeManager.currRoute);
  }
  get isIdle() {
    return !this._isHiding && this._hasPreloaded && !this._isShowing && !this._needsShowLoading;
  }
  _onRouteChanged(e) {
    if (!this.isIdle) {
      this._pendingRoute = e;
    } else if (this.currRoute !== e) {
      this.prevRoute = this.currRoute;
      this.currRoute = e;
      let t = this.currRoute.target;
      if (!t.domContainer) {
        t.domContainer = this.currRoute.dom;
        this._log("preInit: " + this.currRoute.path);
        t.preInit(this.currRoute);
        if (properties.hasInitialized && !t.bypassShowingLoading) {
          this._needsShowLoading = true;
        }
      }
      if (properties.hasInitialized) {
        this._hasPreloaded = false;
      } else {
        this.scrollTargetPage = t;
        this.onScrollTargetChanged.dispatch(t);
      }
      if (!this.currRoute.hasContentPreloaded) {
        this._log("preInitContent: " + this.currRoute.path);
        t.preInitContent(this.currRoute);
      }
      if (properties.hasInitialized) {
        transitionOverlay.showTextRatio = 0;
        transitionOverlay.waitTextRatio = 0;
        transitionOverlay.hideTextRatio = 0;
        transitionOverlay.needsShowText = false;
        transitionOverlay.needsHideText = false;
        let r = this.prevRoute.target;
        this._isHiding = true;
        this._log("hide page", r.id);
        r.onHideStarted.dispatch();
        r.hide(this.prevRoute, this.currRoute, () => {
          this._isHiding = false;
          if (this._needsShowLoading) {
            transitionOverlay.needsShowText = true;
          } else if (this._hasPreloaded) {
            this._onHideComplete();
          }
        });
        if (r.useGenericTransition) {
          audios.countPlay("page");
        }
        properties.loader.start(n => {
          if (n == 1) {
            this._hasPreloaded = true;
            if (!this._isHiding) {
              if (this._needsShowLoading) {
                if (transitionOverlay.showTextRatio == 1) {
                  this._onHideComplete();
                }
              } else {
                this._onHideComplete();
              }
            }
          }
        });
      }
    }
  }
  _onShowTextComplete() {
    if (this._hasPreloaded) {
      this._onHideComplete();
    }
  }
  _onHideTextComplete() {
    this._showPage();
  }
  _onTaskComplete() {
    this.isFirstRoute;
  }
  init() {
    this._initPage();
  }
  _initPage() {
    let e = this.currRoute.target;
    if (!e.hasInitialized) {
      this._log("init: " + this.currRoute.path);
      e.init(this.currRoute);
      e.hasInitialized = true;
    }
    if (!this.currRoute.hasContentPreloaded) {
      this.currRoute.hasContentPreloaded = true;
      this._log("initContent: " + this.currRoute.path);
      e.initContent(this.currRoute);
    }
    taskManager.start();
  }
  _onHideComplete() {
    this._initPage();
    if (this.prevRoute.target) {
      let e = this.prevRoute.target;
      e.onHideCompleted.dispatch();
      this._log("hide page complete: " + this.prevRoute.path);
      e.isActive = false;
      if (e !== this.currRoute.target) {
        e.domContainer.remove();
        e.preUfxContainer.visible = false;
        e.postUfxContainer.visible = false;
      }
    }
    if (this._needsShowLoading) {
      transitionOverlay.needsHideText = true;
    } else {
      this._showPage();
    }
  }
  resize(e, t) {
    if (this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.hasInitialized) {
      this.prevRoute.target.resize(e, t);
    }
    if (this.currRoute && this.currRoute.target.isActive) {
      this.currRoute.target.resize(e, t);
    }
  }
  start() {
    this._showPage();
  }
  _showPage() {
    this._isShowing = true;
    this._needsShowLoading = false;
    let e = this.currRoute.target;
    e.isActive = true;
    if (properties.hasInitialized && e !== this.prevRoute.target) {
      this.domContainerInner.prepend(e.domContainer);
      e.time = 0;
    }
    document.title = this.currRoute.title;
    this.scrollTargetPage = e;
    e.preUfxContainer.visible = true;
    e.postUfxContainer.visible = true;
    this.onScrollTargetChanged.dispatch(e);
    this._log("show page: " + this.currRoute.path);
    pageExtraSections.resize(properties.viewportWidth, properties.viewportHeight);
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
    scrollManager.scrollToPixel(0, true);
    e.resize(properties.viewportWidth, properties.viewportHeight);
    e.onShowStarted.dispatch();
    e.show(this.prevRoute, this.currRoute, this._onShowComplete.bind(this));
    if (e.useGenericTransition) {
      audios.countPlay("page");
    }
  }
  _onShowComplete() {
    transitionOverlay.contentShowRatio = 1;
    this._isShowing = false;
    this.isFirstRoute = false;
    this.currRoute.target.isFirstShown = true;
    this.currRoute.target.onShowCompleted.dispatch();
    this._log("===============");
    if (this._pendingRoute) {
      let e = this._pendingRoute;
      this._pendingRoute = null;
      this._onRouteChanged(e);
    } else {
      this.onIdled.dispatch();
    }
    if (properties.isContactFromProjectPage) {
      properties.isContactFromProjectPage = false;
      scrollManager.scrollTo("footer-section", 0, false);
    }
  }
  update(e) {
    if (this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.hasInitialized) {
      let t = this.prevRoute.target;
      t.time += e;
      t.update(e);
    }
    if (this.currRoute && this.currRoute.target.isActive) {
      let t = this.currRoute.target;
      t.time += e;
      t.update(e);
    }
    if (!this.isFirstRoute) {
      if ((this._isHiding || !this._hasPreloaded) && !this._isShowing && this.prevRoute.target.useGenericTransition) {
        transitionOverlay.contentHideRatio = this.prevRoute.target.hideRatio;
        transitionOverlay.contentShowRatio = 0;
      }
      if (this._isShowing && this.currRoute.target && this.currRoute.target.useGenericTransition) {
        transitionOverlay.contentHideRatio = 1;
        transitionOverlay.contentShowRatio = this.currRoute.target.showRatio;
      }
      let t = 1;
      if (this.prevRoute != this.currRoute) {
        if (this._isHiding && !this.prevRoute.target.useGenericTransition) {
          t *= math.fit(this.prevRoute.target.hideRatio, 0, 0.5, 1, 0);
        }
        if (this._isShowing && !this.currRoute.target.useGenericTransition) {
          t *= math.fit(this.currRoute.target.showRatio, 0.5, 1, 0, 1);
        }
      }
      this.domContainer.style.opacity = t;
    }
  }
  _log(e) {}
}
const pagesManager = new PageManager();
window.pagesManager = pagesManager;
class ScrollPane {
  lockOnDirection = true;
  isActive = false;
  x;
  y;
  viewDom;
  contentDom;
  isVertical = true;
  targetScrollPixel = 0;
  scrollViewDelta = 0;
  viewWidthPixel = 0;
  viewHeightPixel = 0;
  contentSize = 0;
  contentSizePixel = 0;
  scrollView = 0;
  progress = 0;
  minScrollPixel = 0.1;
  viewSizePixel = 1;
  scrollMultiplier = (browser$1.isMobile, 1);
  domRanges = new Map();
  useResizeObserver = true;
  tick = -1;
  lastResizeTick = -1;
  resizeObserveTick = -1;
  hasResizeObserved = false;
  autoScrollSpeed = 0;
  autoScrollRatio = 0;
  skipAutoScroll = false;
  dragHistory = [];
  dragHistoryMaxTime = 0.1;
  isWheelScrolling = false;
  frictionCoeffFrom = 2.1;
  frictionCoeffTo = 1.9;
  frictionCoeffWeightDivisor = 5;
  minVelocity = -1;
  wheelEaseCoeff = 12;
  scrollPixel = 0;
  init(e = {}) {
    Object.assign(this, e);
    if (this.contentDom && this.useResizeObserver && window.ResizeObserver) {
      new ResizeObserver(this._onResizeObserve.bind(this)).observe(this.contentDom);
    }
    document.documentElement.addEventListener("keydown", t => {
      if (this.isMoveable) {
        if (this.isVertical) {
          if (t.key === "ArrowUp") {
            this.scrollToPixel(this.scrollPixel - 100);
          } else if (t.key === "ArrowDown") {
            this.scrollToPixel(this.scrollPixel + 100);
          }
        } else if (t.key === "ArrowLeft") {
          this.scrollToPixel(this.scrollPixel - 100);
        } else if (t.key === "ArrowRight") {
          this.scrollToPixel(this.scrollPixel + 100);
        }
        if (t.key === "PageUp") {
          this.scrollToPixel(this.scrollPixel - this.viewSizePixel);
        } else if (t.key === "PageDown") {
          this.scrollToPixel(this.scrollPixel + this.viewSizePixel);
        }
      }
    });
  }
  _onResizeObserve() {
    this.hasResizeObserved = true;
    this.resizeObserveTick = this.tick;
  }
  getDomRange(e, t = 0, r = false) {
    let n = this.domRanges.get(e);
    if (!n) {
      this.domRanges.set(e, n = new ScrollDomRange(e, this.isVertical));
    }
    n.update(this.scrollPixel, this.viewSizePixel, t, r);
    return n;
  }
  scrollTo(e, t = 0, r = false) {
    e = typeof e == "string" ? document.getElementById(e) : e;
    if (e) {
      let n = this.getDomRange(e);
      this.scrollToPixel(n.top + t * this.viewSizePixel, r);
    }
  }
  scrollToPixel(e = 0, t = false) {
    e = this._clampScrollPixel(e);
    if (t) {
      this.resetScroll(e);
      this.progress = this.contentSize > 0 ? e / this.contentSizePixel : 0;
    } else {
      this.resetScroll(this.scrollPixel);
      this.targetScrollPixel = e;
      this.isWheelScrolling = true;
      this.skipAutoScroll = true;
    }
    this.syncDom();
  }
  getEaseInOutOffset(e, t, r = 0, n = 0.5) {
    let a = 1.5 + n;
    let l = (a - 1) * 2 + r;
    let c = 0;
    let u = a;
    let f = u + r;
    let p = f + a;
    let g = t * p / l;
    let v = e + g * 0.5 - t * 0.5;
    let _ = Math.min(1, v / g);
    if (_ > 0) {
      let M = _ * p;
      var T = M;
      if (M > c && M <= u) {
        let S = (M - c) / (u - c);
        T = math.cubicBezier(c, (u - c) / 3 + c, 1, 1, S);
      } else if (M > u && M <= f) {
        T = 1;
      } else if (M > f && M <= p) {
        let S = (M - f) / (p - f);
        T = math.cubicBezier(1, 1, -(p - f) / 3 + 2, 2, S);
      } else if (M > p) {
        T = M - l;
      }
      return (M - T) / l * t;
    }
    return 0;
  }
  resize(e, t) {
    this.domRanges.forEach(n => {
      n.needsUpdate = true;
    });
    if (this.viewDom) {
      let n = this.viewDom.getBoundingClientRect();
      e = n.width;
      t = n.height;
    }
    this.viewWidthPixel = e;
    this.viewHeightPixel = t;
    let r = this.isVertical ? t : e;
    if (this.contentDom) {
      let n = this.contentDom.getBoundingClientRect();
      this.contentSize = Math.max(0, (this.isVertical ? n.height : n.width) / r - 1);
    }
    this.contentSizePixel = Math.floor(this.contentSize * r);
    this.targetScrollPixel = this.contentSizePixel * this.progress;
    this.resetScroll(this.targetScrollPixel);
    this.viewSizePixel = r;
    this.lastResizeTick = this.tick;
    this.syncDom();
  }
  _clampScrollPixel(e) {
    return math.clamp(e, 0, this.contentSizePixel);
  }
  resetScroll(e) {
    this.targetScrollPixel = this.scrollPixel = e;
    this.velocityPixel = 0;
    this.dragHistory.length = 0;
  }
  update(e, t) {
    if (this.hasResizeObserved) {
      this.hasResizeObserved = false;
      if (this.resizeObserveTick !== this.lastResizeTick) {
        this.resize(this.viewWidthPixel, this.viewHeightPixel);
      }
    }
    let r = this.scrollView;
    let n = input.isDown && (!this.lockOnDirection && (input.isDragScrollingY || input.isDragScrollingX) || this.isVertical && input.isDragScrollingY || !this.isVertical && input.isDragScrollingX);
    let a = 0;
    if (input.isDown && !input.wasDown) {
      this.dragHistory.length = 0;
    }
    if (this.isMoveable) {
      let l = 0;
      if (this.isVertical) {
        if (input.isWheelScrolling || input.isDragScrollingY) {
          l = input.deltaScrollY;
        } else if (!this.lockOnDirection && input.isDragScrollingX) {
          l = -input.deltaPixelXY.y + input.deltaWheel;
        }
      } else if (input.isWheelScrolling || input.isDragScrollingX) {
        l = input.deltaScrollX;
      } else if (!this.lockOnDirection && input.isDragScrollingY) {
        l = -input.deltaPixelXY.x + input.deltaWheel;
      }
      if (input.isWheelScrolling) {
        this.isWheelScrolling = true;
      }
      if (l !== 0) {
        this.skipAutoScroll = false;
      }
      this.autoScrollRatio = math.saturate(this.autoScrollRatio + (Math.abs(this.autoScrollSpeed) > 0 && l == 0 ? e : -1));
      let c = this.autoScrollSpeed * this.viewSizePixel * e * (this.skipAutoScroll ? 0 : this.autoScrollRatio);
      let u = properties.time;
      if (n) {
        for (this.dragHistory.push({
          time: u,
          deltaTime: e,
          deltaPixel: l
        }); this.dragHistory.length > 0 && u - this.dragHistory[0].time > this.dragHistoryMaxTime;) {
          this.dragHistory.shift();
        }
        this.targetScrollPixel = this.scrollPixel;
        this.isWheelScrolling = false;
        a = l;
      } else {
        if (input.isDown) {
          this.resetScroll(this.scrollPixel);
        }
        if (this.isWheelScrolling) {
          this.dragHistory.length = 0;
          this.velocityPixel = 0;
          this.targetScrollPixel += l;
          this.targetScrollPixel = this._clampScrollPixel(this.targetScrollPixel);
          let f = this.targetScrollPixel - this.scrollPixel;
          a = f * (1 - Math.exp(-this.wheelEaseCoeff * e));
          if (Math.abs(f) < this.minScrollPixel) {
            a = f;
            this.isWheelScrolling = false;
          }
        } else {
          if (this.dragHistory.length > 0) {
            let g = 0;
            let v = 0;
            for (let _ = 0; _ < this.dragHistory.length; _++) {
              let T = this.dragHistory[_];
              if (T.time > 0) {
                let M = T.deltaPixel / T.deltaTime;
                let S = T.deltaTime;
                let b = this.dragHistory.length == 1 ? 1 : (T.time - this.dragHistory[0].time) / this.dragHistoryMaxTime;
                let C = S * b;
                v += M * C;
                g += C;
              }
            }
            this.velocityPixel = v / g;
            this.dragHistory.length = 0;
          }
          let p = -math.mix(this.frictionCoeffFrom, this.frictionCoeffTo, math.clamp(Math.abs(this.velocityPixel / this.viewSizePixel / this.frictionCoeffWeightDivisor), 0, 1)) * this.velocityPixel;
          this.velocityPixel += p * e;
          a = this.velocityPixel * e;
        }
      }
      this.targetScrollPixel += c;
      this.scrollPixel += c;
    }
    this.scrollPixel = this._clampScrollPixel(this.scrollPixel + a);
    this.scrollView = this.scrollPixel / this.viewSizePixel;
    this.scrollViewDelta = this.scrollView - r;
    this.progress = this.contentSize > 0 ? this.scrollPixel / this.contentSizePixel : 0;
    if (Math.abs(this.targetScrollPixel - this.scrollPixel) < this.minScrollPixel) {
      this.scrollPixel = this.targetScrollPixel;
    }
    if (Math.abs(this.velocityPixel) <= this.minVelocity) {
      this.velocityPixel = 0;
    }
    this.isScrolling = this.targetScrollPixel !== this.scrollPixel || Math.abs(this.velocityPixel) > 0;
    this.syncDom();
    this.tick++;
  }
  syncDom() {
    if (this.contentDom) {
      this.x = 0;
      this.y = 0;
      if (this.isVertical) {
        this.y = -this.scrollPixel;
      } else {
        this.x = -this.scrollPixel;
      }
      this.contentDom.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
    }
  }
  get isMoveable() {
    return this.isActive && !videoOverlay.isOpened && pagesManager.isIdle && !header.menu.opened && this.contentSize > 0 && (!this.viewDom || input.hasThroughElem(this.viewDom, "down"));
  }
}
class ScrollManager extends ScrollPane {
  domScrollIndicator;
  domScrollIndicatorHeight = 1;
  domScrollIndicatorBar;
  scrollIndicatorActiveRatio = 0;
  lastMouseInteractiveTime = -Infinity;
  isIndicatorActive = undefined;
  easedScrollStrength = 0;
  frameIdx = -1;
  MIN_BAR_SCALE_Y = 2 / 10;
  init() {
    super.init({
      contentDom: document.getElementById("page-container"),
      domScrollIndicator: document.getElementById("scroll-indicator"),
      domScrollIndicatorBar: document.getElementById("scroll-indicator-bar")
    });
  }
  resize(e, t) {
    super.resize(e, t);
    this.domScrollIndicatorHeight = this.domScrollIndicator.getBoundingClientRect().height;
  }
  update(e) {
    super.update(e, this.scrollValue);
    this.easedScrollStrength += Math.abs(this.scrollViewDelta);
    this.easedScrollStrength += (0 - this.easedScrollStrength) * (1 - Math.exp(e * -10));
    this.easedScrollStrength = Math.min(this.easedScrollStrength, 1);
    if (Math.abs(this.scrollViewDelta) > 0) {
      this.lastMouseInteractiveTime = properties.time;
      this.isIndicatorActive = true;
    } else if (properties.time > this.lastMouseInteractiveTime + 0.5) {
      this.isIndicatorActive = false;
    }
    this.scrollIndicatorActiveRatio = math.clamp(this.scrollIndicatorActiveRatio + (this.isIndicatorActive ? 2 : -2) * e, 0, 1);
    this.domScrollIndicator.style.opacity = this.scrollIndicatorActiveRatio;
    let r = 1;
    let n = 0;
    if (this.contentSize > 0) {
      r = Math.max(this.MIN_BAR_SCALE_Y, 1 / (1 + this.contentSize));
      n = this.scrollView / this.contentSize * (1 - r);
    }
    this.domScrollIndicatorBar.style.height = this.domScrollIndicatorHeight * r + "px";
    this.domScrollIndicatorBar.style.transform = "translate3d(0," + this.domScrollIndicatorHeight * n + "px,0)";
    this.frameIdx++;
  }
  get isMoveable() {
    return super.isMoveable;
  }
}
const scrollManager = new ScrollManager();
window.scrollManager = scrollManager;
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
  useDepthTexture = true;
  depthTexture = null;
  fromTexture = null;
  toTexture = null;
  sceneTexture = null;
  mesh = null;
  queue = [];
  sharedUniforms = {};
  geom;
  hasSizeChanged = true;
  init(e) {
    Object.assign(this, e);
    if (_geom) {
      this.geom = _geom;
    } else {
      this.geom = _geom = new BufferGeometry();
      this.geom.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]), 3));
      this.geom.setAttribute("a_uvClamp", new BufferAttribute(new Float32Array([0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]), 4));
    }
    this.sceneFlatRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.sceneFlatRenderTarget.depthBuffer = true;
    this.sceneMsRenderTarget = fboHelper.createMultisampleRenderTarget(1, 1);
    this.sceneMsRenderTarget.depthBuffer = true;
    this.fromRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.toRenderTarget = this.fromRenderTarget.clone();
    this.useDepthTexture = !!this.useDepthTexture && fboHelper.renderer && (fboHelper.renderer.capabilities.isWebGL2 || fboHelper.renderer.extensions.get("WEBGL_depth_texture"));
    this.fromTexture = this.fromRenderTarget.texture;
    this.toTexture = this.toRenderTarget.texture;
    this.sceneRenderTarget = this.sceneMsRenderTarget;
    this.sceneTexture = this.sceneMsRenderTarget.texture;
    this.mesh = new Mesh();
    this.sharedUniforms = Object.assign(this.sharedUniforms, {
      u_sceneTexture: {
        value: this.sceneTexture
      },
      u_fromTexture: {
        value: null
      },
      u_toTexture: {
        value: null
      },
      u_sceneDepthTexture: {
        value: null
      },
      u_cameraNear: {
        value: 0
      },
      u_cameraFar: {
        value: 1
      },
      u_cameraFovRad: {
        value: 1
      },
      u_resolution: {
        value: this.resolution
      },
      u_texelSize: {
        value: this.texelSize
      },
      u_aspect: {
        value: this.aspect
      }
    });
    if (this.useDepthTexture && fboHelper.renderer) {
      const t = new DepthTexture(this.resolution.width, this.resolution.height);
      if (fboHelper.renderer.capabilities.isWebGL2) {
        t.type = UnsignedIntType;
      } else {
        t.format = DepthStencilFormat;
        t.type = UnsignedInt248Type;
      }
      t.minFilter = NearestFilter;
      t.magFilter = NearestFilter;
      this.sceneFlatRenderTarget.depthTexture = t;
      this.sceneMsRenderTarget.depthTexture = t;
      this.depthTexture = this.sharedUniforms.u_sceneDepthTexture.value = t;
    }
  }
  swap() {
    const e = this.fromRenderTarget;
    this.fromRenderTarget = this.toRenderTarget;
    this.toRenderTarget = e;
    this.fromTexture = this.fromRenderTarget.texture;
    this.toTexture = this.toRenderTarget.texture;
    this.sharedUniforms.u_fromTexture.value = this.fromTexture;
    this.sharedUniforms.u_toTexture.value = this.toTexture;
  }
  setSize(e, t) {
    if (this.width !== e || this.height !== t) {
      this.hasSizeChanged = true;
      this.width = e;
      this.height = t;
      this.resolution.set(e, t);
      this.texelSize.set(1 / e, 1 / t);
      const r = t / Math.sqrt(e * e + t * t) * 2;
      this.aspect.set(e / t * r, r);
      this.sceneFlatRenderTarget.setSize(e, t);
      this.sceneMsRenderTarget.setSize(e, t);
      this.fromRenderTarget.setSize(e, t);
      this.toRenderTarget.setSize(e, t);
    }
  }
  dispose() {
    if (this.fromRenderTarget) {
      this.fromRenderTarget.dispose();
    }
    if (this.toRenderTarget) {
      this.toRenderTarget.dispose();
    }
    if (this.sceneMsRenderTarget) {
      this.sceneMsRenderTarget.dispose();
    }
    if (this.sceneFlatRenderTarget) {
      this.sceneFlatRenderTarget.dispose();
    }
  }
  _filterQueue(e) {
    return e.enabled && e.needsRender();
  }
  renderMaterial(e, t) {
    this.mesh.material = e;
    fboHelper.renderMesh(this.mesh, t);
  }
  checkSceneRt() {
    this.sceneRenderTarget = properties.isSmaaEnabled ? this.sceneFlatRenderTarget : this.sceneMsRenderTarget;
    this.sceneTexture = this.sceneRenderTarget.texture;
    this.sharedUniforms.u_sceneTexture.value = this.sceneTexture;
  }
  render(e, t, r) {
    if (!fboHelper.renderer) {
      return;
    }
    this.scene = e;
    this.camera = t;
    this.mesh.geometry = this.geom;
    const n = this.queue.filter(this._filterQueue);
    const a = this.sharedUniforms;
    n.sort((l, c) => l.renderOrder == c.renderOrder ? 0 : l.renderOrder - c.renderOrder);
    this.checkSceneRt();
    a.u_cameraNear.value = t.near;
    a.u_cameraFar.value = t.far;
    a.u_cameraFovRad.value = t.fov / 180 * Math.PI;
    this.onBeforeSceneRendered.dispatch();
    if (n.length) {
      fboHelper.renderer.setRenderTarget(this.sceneRenderTarget);
      fboHelper.renderer.render(e, t);
      fboHelper.renderer.setRenderTarget(null);
      fboHelper.copy(this.sceneRenderTarget.texture, this.fromRenderTarget);
      this.onAfterSceneRendered.dispatch(this.sceneRenderTarget);
      const l = fboHelper.getColorState();
      fboHelper.renderer.autoClear = false;
      for (let c = 0, u = n.length; c < u; c++) {
        const f = c === u - 1 && r;
        const p = n[c];
        p.setPostprocessing(this);
        p.render(this, f);
      }
      fboHelper.setColorState(l);
    } else {
      fboHelper.renderer.render(e, t);
      this.onAfterSceneRendered.dispatch();
    }
    this.onAfterRendered.dispatch();
    this.hasSizeChanged = false;
  }
}
const smaaBlendVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[2];void SMAANeighborhoodBlendingVS(vec2 texcoord){v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-1.0,0.0,0.0,1.0);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(1.0,0.0,0.0,-1.0);}void main(){v_uv=position.xy*0.5+0.5;SMAANeighborhoodBlendingVS(v_uv);gl_Position=vec4(position,1.0);}`;
const smaaBlendFrag = `#define GLSLIFY 1
uniform sampler2D u_weightsTexture;uniform sampler2D u_texture;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[2];vec4 SMAANeighborhoodBlendingPS(vec2 texcoord,vec4 offset[2],sampler2D colorTex,sampler2D blendTex){vec4 a;a.xz=texture2D(blendTex,texcoord).xz;a.y=texture2D(blendTex,offset[1].zw).g;a.w=texture2D(blendTex,offset[1].xy).a;if(dot(a,vec4(1.0,1.0,1.0,1.0))<1e-5){return texture2D(colorTex,texcoord,0.0);}else{vec2 offset;offset.x=a.a>a.b ? a.a :-a.b;offset.y=a.g>a.r ?-a.g : a.r;if(abs(offset.x)>abs(offset.y)){offset.y=0.0;}else{offset.x=0.0;}vec4 C=texture2D(colorTex,texcoord,0.0);texcoord+=sign(offset)*u_texelSize;vec4 Cop=texture2D(colorTex,texcoord,0.0);float s=abs(offset.x)>abs(offset.y)? abs(offset.x): abs(offset.y);C.xyz=pow(abs(C.xyz),vec3(2.2));Cop.xyz=pow(abs(Cop.xyz),vec3(2.2));vec4 mixed=mix(C,Cop,s);mixed.xyz=pow(abs(mixed.xyz),vec3(1.0/2.2));return mixed;}}void main(){gl_FragColor=SMAANeighborhoodBlendingPS(v_uv,v_offsets,u_texture,u_weightsTexture);}`;
const smaaEdgesVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];void SMAAEdgeDetectionVS(vec2 texcoord){v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-1.0,0.0,0.0,1.0);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(1.0,0.0,0.0,-1.0);v_offsets[2]=texcoord.xyxy+u_texelSize.xyxy*vec4(-2.0,0.0,0.0,2.0);}void main(){v_uv=position.xy*0.5+0.5;SMAAEdgeDetectionVS(v_uv);gl_Position=vec4(position,1.0);}`;
const smaaEdgesFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv;varying vec4 v_offsets[3];vec4 SMAAColorEdgeDetectionPS(vec2 texcoord,vec4 offset[3],sampler2D colorTex){vec2 threshold=vec2(SMAA_THRESHOLD,SMAA_THRESHOLD);vec4 delta;vec3 C=texture2D(colorTex,texcoord).rgb;vec3 Cleft=texture2D(colorTex,offset[0].xy).rgb;vec3 t=abs(C-Cleft);delta.x=max(max(t.r,t.g),t.b);vec3 Ctop=texture2D(colorTex,offset[0].zw).rgb;t=abs(C-Ctop);delta.y=max(max(t.r,t.g),t.b);vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0,1.0))==0.0)discard;vec3 Cright=texture2D(colorTex,offset[1].xy).rgb;t=abs(C-Cright);delta.z=max(max(t.r,t.g),t.b);vec3 Cbottom=texture2D(colorTex,offset[1].zw).rgb;t=abs(C-Cbottom);delta.w=max(max(t.r,t.g),t.b);float maxDelta=max(max(max(delta.x,delta.y),delta.z),delta.w);vec3 Cleftleft=texture2D(colorTex,offset[2].xy).rgb;t=abs(C-Cleftleft);delta.z=max(max(t.r,t.g),t.b);vec3 Ctoptop=texture2D(colorTex,offset[2].zw).rgb;t=abs(C-Ctoptop);delta.w=max(max(t.r,t.g),t.b);maxDelta=max(max(maxDelta,delta.z),delta.w);edges.xy*=step(0.5*maxDelta,delta.xy);return vec4(edges,0.0,0.0);}void main(){gl_FragColor=SMAAColorEdgeDetectionPS(v_uv,v_offsets,u_texture);}`;
const smaaWeightsVert = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];varying vec2 v_pixcoord;void SMAABlendingWeightCalculationVS(vec2 texcoord){v_pixcoord=texcoord/u_texelSize;v_offsets[0]=texcoord.xyxy+u_texelSize.xyxy*vec4(-0.25,0.125,1.25,0.125);v_offsets[1]=texcoord.xyxy+u_texelSize.xyxy*vec4(-0.125,0.25,-0.125,-1.25);v_offsets[2]=vec4(v_offsets[0].xz,v_offsets[1].yw)+vec4(-2.0,2.0,-2.0,2.0)*u_texelSize.xxyy*float(SMAA_MAX_SEARCH_STEPS);}void main(){v_uv=position.xy*0.5+0.5;SMAABlendingWeightCalculationVS(v_uv);gl_Position=vec4(position,1.0);}`;
const smaaWeightsFrag = `#define GLSLIFY 1
#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * u_texelSize, 0.0 )
uniform sampler2D u_edgesTexture;uniform sampler2D u_areaTexture;uniform sampler2D u_searchTexture;uniform vec2 u_texelSize;varying vec2 v_uv;varying vec4 v_offsets[3];varying vec2 v_pixcoord;vec2 round2(vec2 x){return sign(x)*floor(abs(x)+0.5);}float SMAASearchLength(sampler2D searchTex,vec2 e,float bias,float scale){e.r=bias+e.r*scale;return 255.0*texture2D(searchTex,e,0.0).r;}float SMAASearchXLeft(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord-=vec2(2.0,0.0)*u_texelSize;if(!(texcoord.x>end&&e.g>0.8281&&e.r==0.0))break;}texcoord.x+=0.25*u_texelSize.x;texcoord.x+=u_texelSize.x;texcoord.x+=2.0*u_texelSize.x;texcoord.x-=u_texelSize.x*SMAASearchLength(searchTex,e,0.0,0.5);return texcoord.x;}float SMAASearchXRight(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord+=vec2(2.0,0.0)*u_texelSize;if(!(texcoord.x<end&&e.g>0.8281&&e.r==0.0))break;}texcoord.x-=0.25*u_texelSize.x;texcoord.x-=u_texelSize.x;texcoord.x-=2.0*u_texelSize.x;texcoord.x+=u_texelSize.x*SMAASearchLength(searchTex,e,0.5,0.5);return texcoord.x;}float SMAASearchYUp(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord+=vec2(0.0,2.0)*u_texelSize;if(!(texcoord.y>end&&e.r>0.8281&&e.g==0.0))break;}texcoord.y-=0.25*u_texelSize.y;texcoord.y-=u_texelSize.y;texcoord.y-=2.0*u_texelSize.y;texcoord.y+=u_texelSize.y*SMAASearchLength(searchTex,e.gr,0.0,0.5);return texcoord.y;}float SMAASearchYDown(sampler2D edgesTex,sampler2D searchTex,vec2 texcoord,float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<SMAA_MAX_SEARCH_STEPS;i++){e=texture2D(edgesTex,texcoord,0.0).rg;texcoord-=vec2(0.0,2.0)*u_texelSize;if(!(texcoord.y<end&&e.r>0.8281&&e.g==0.0))break;}texcoord.y+=0.25*u_texelSize.y;texcoord.y+=u_texelSize.y;texcoord.y+=2.0*u_texelSize.y;texcoord.y-=u_texelSize.y*SMAASearchLength(searchTex,e.gr,0.5,0.5);return texcoord.y;}vec2 SMAAArea(sampler2D areaTex,vec2 dist,float e1,float e2,float offset){vec2 texcoord=float(SMAA_AREATEX_MAX_DISTANCE)*round2(4.0*vec2(e1,e2))+dist;texcoord=SMAA_AREATEX_PIXEL_SIZE*texcoord+(0.5*SMAA_AREATEX_PIXEL_SIZE);texcoord.y+=SMAA_AREATEX_SUBTEX_SIZE*offset;return texture2D(areaTex,texcoord,0.0).rg;}vec4 SMAABlendingWeightCalculationPS(vec2 texcoord,vec2 pixcoord,vec4 offset[3],sampler2D edgesTex,sampler2D areaTex,sampler2D searchTex,ivec4 subsampleIndices){vec4 weights=vec4(0.0,0.0,0.0,0.0);vec2 e=texture2D(edgesTex,texcoord).rg;if(e.g>0.0){vec2 d;vec2 coords;coords.x=SMAASearchXLeft(edgesTex,searchTex,offset[0].xy,offset[2].x);coords.y=offset[1].y;d.x=coords.x;float e1=texture2D(edgesTex,coords,0.0).r;coords.x=SMAASearchXRight(edgesTex,searchTex,offset[0].zw,offset[2].y);d.y=coords.x;d=d/u_texelSize.x-pixcoord.x;vec2 sqrt_d=sqrt(abs(d));coords.y-=1.0*u_texelSize.y;float e2=SMAASampleLevelZeroOffset(edgesTex,coords,ivec2(1,0)).r;weights.rg=SMAAArea(areaTex,sqrt_d,e1,e2,float(subsampleIndices.y));}if(e.r>0.0){vec2 d;vec2 coords;coords.y=SMAASearchYUp(edgesTex,searchTex,offset[1].xy,offset[2].z);coords.x=offset[0].x;d.x=coords.y;float e1=texture2D(edgesTex,coords,0.0).g;coords.y=SMAASearchYDown(edgesTex,searchTex,offset[1].zw,offset[2].w);d.y=coords.y;d=d/u_texelSize.y-pixcoord.y;vec2 sqrt_d=sqrt(abs(d));coords.y-=1.0*u_texelSize.y;float e2=SMAASampleLevelZeroOffset(edgesTex,coords,ivec2(0,1)).g;weights.ba=SMAAArea(areaTex,sqrt_d,e1,e2,float(subsampleIndices.x));}return weights;}void main(){gl_FragColor=SMAABlendingWeightCalculationPS(v_uv,v_pixcoord,v_offsets,u_edgesTexture,u_areaTexture,u_searchTexture,ivec4(0.0));}`;
class Smaa extends PostEffect {
  edgesRenderTarget = null;
  weightsRenderTarget = null;
  edgesMaterial = null;
  weightsMaterial = null;
  renderOrder = 500;
  init(e) {
    Object.assign(this, {
      sharedUniforms: {
        u_areaTexture: {
          value: null
        },
        u_searchTexture: {
          value: null
        }
      }
    }, e);
    super.init();
    this.weightsRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.edgesRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.edgesMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_texelSize: null
      },
      vertexShader: smaaEdgesVert,
      fragmentShader: smaaEdgesFrag,
      defines: {
        SMAA_THRESHOLD: "0.1"
      },
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    this.weightsMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_edgesTexture: {
          value: this.edgesRenderTarget.texture
        },
        u_areaTexture: this.sharedUniforms.u_areaTexture,
        u_searchTexture: this.sharedUniforms.u_searchTexture,
        u_texelSize: null
      },
      vertexShader: smaaWeightsVert,
      fragmentShader: smaaWeightsFrag,
      defines: {
        SMAA_MAX_SEARCH_STEPS: "8",
        SMAA_AREATEX_MAX_DISTANCE: "16",
        SMAA_AREATEX_PIXEL_SIZE: "( 1.0 / vec2( 160.0, 560.0 ) )",
        SMAA_AREATEX_SUBTEX_SIZE: "( 1.0 / 7.0 )"
      },
      transparent: true,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_weightsTexture: {
          value: this.weightsRenderTarget.texture
        },
        u_texelSize: null
      },
      vertexShader: smaaBlendVert,
      fragmentShader: smaaBlendFrag
    });
  }
  setTextures(e, t) {
    const r = this.sharedUniforms.u_areaTexture.value = this._createTexture(e);
    r.minFilter = LinearFilter;
    const n = this.sharedUniforms.u_searchTexture.value = this._createTexture(t);
    n.magFilter = NearestFilter;
    n.minFilter = NearestFilter;
  }
  updateTextures() {
    this.sharedUniforms.u_areaTexture.value.needsUpdate = true;
    this.sharedUniforms.u_searchTexture.value.needsUpdate = true;
  }
  setPostprocessing(e) {
    super.setPostprocessing(e);
    const t = e.width;
    const r = e.height;
    this.edgesRenderTarget.setSize(t, r);
    this.weightsRenderTarget.setSize(t, r);
  }
  dispose() {
    if (this.edgesRenderTarget) {
      this.edgesRenderTarget.dispose();
    }
    if (this.weightsRenderTarget) {
      this.weightsRenderTarget.dispose();
    }
  }
  needsRender() {
    return this.enabled && !this.sharedUniforms.u_areaTexture.value.needsUpdate && properties.isSmaaEnabled;
  }
  render(e, t) {
    const r = fboHelper.getColorState();
    if (!this.sharedUniforms.u_searchTexture.value) {
      console.warn("You need to use Smaa.setImages() to set the smaa textures manually and assign to this class.");
    }
    const n = fboHelper.renderer;
    if (n) {
      n.autoClear = true;
      n.setClearColor(0, 0);
    }
    this.edgesMaterial.uniforms.u_texelSize = this.weightsMaterial.uniforms.u_texelSize = this.material.uniforms.u_texelSize = e.sharedUniforms.u_texelSize;
    this.edgesMaterial.uniforms.u_texture.value = e.fromTexture;
    e.renderMaterial(this.edgesMaterial, this.edgesRenderTarget);
    e.renderMaterial(this.weightsMaterial, this.weightsRenderTarget);
    fboHelper.setColorState(r);
    this.material.uniforms.u_texture.value = e.fromTexture;
    super.render(e, t);
  }
  _createTexture(e) {
    const t = new Texture(e);
    t.generateMipmaps = false;
    t.flipY = false;
    return t;
  }
}
const frag$2 = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform float u_saturation;uniform sampler2D u_blurTexture0;
#if ITERATION > 1
uniform sampler2D u_blurTexture1;
#endif
#if ITERATION > 2
uniform sampler2D u_blurTexture2;
#endif
#if ITERATION > 3
uniform sampler2D u_blurTexture3;
#endif
#if ITERATION > 4
uniform sampler2D u_blurTexture4;
#endif
uniform float u_bloomWeights[ITERATION];
#include <common>
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}void main(){vec4 c=texture2D(u_texture,v_uv);gl_FragColor=c+(u_bloomWeights[0]*texture2D(u_blurTexture0,v_uv)
#if ITERATION > 1
+u_bloomWeights[1]*texture2D(u_blurTexture1,v_uv)
#endif
#if ITERATION > 2
+u_bloomWeights[2]*texture2D(u_blurTexture2,v_uv)
#endif
#if ITERATION > 3
+u_bloomWeights[3]*texture2D(u_blurTexture3,v_uv)
#endif
#if ITERATION > 4
+u_bloomWeights[4]*texture2D(u_blurTexture4,v_uv)
#endif
);gl_FragColor.rgb=mix(vec3(dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114))),gl_FragColor.rgb,u_saturation);gl_FragColor.rgb=dithering(gl_FragColor.rgb);gl_FragColor.a=1.0;}`;
const highPassFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_luminosityThreshold;uniform float u_smoothWidth;uniform float u_amount;
#ifdef USE_HALO
uniform vec2 u_texelSize;uniform vec2 u_aspect;uniform float u_haloWidth;uniform float u_haloRGBShift;uniform float u_haloStrength;uniform float u_haloMaskInner;uniform float u_haloMaskOuter;
#ifdef USE_LENS_DIRT
uniform sampler2D u_dirtTexture;uniform vec2 u_dirtAspect;
#endif
#endif
#ifdef USE_CONVOLUTION
uniform float u_convolutionBuffer;
#endif
varying vec2 v_uv;void main(){vec2 uv=v_uv;
#ifdef USE_CONVOLUTION
uv=(uv-0.5)*(1.0+u_convolutionBuffer)+0.5;
#endif
vec4 texel=texture2D(u_texture,uv);vec3 luma=vec3(0.299,0.587,0.114);float v=dot(texel.xyz,luma);float alpha=texel.a*u_amount;gl_FragColor=vec4(texel.rgb*alpha,1.0);
#ifdef USE_HALO
vec2 toCenter=(uv-0.5)*u_aspect;vec2 ghostUv=1.0-(toCenter+0.5);vec2 ghostVec=(vec2(0.5)-ghostUv);vec2 direction=normalize(ghostVec);vec2 haloVec=direction*u_haloWidth;float weight=length(vec2(0.5)-fract(ghostUv+haloVec));weight=pow(1.0-weight,3.0);vec3 distortion=vec3(-u_texelSize.x,0.0,u_texelSize.x)*u_haloRGBShift;float zoomBlurRatio=fract(atan(toCenter.y,toCenter.x)*40.0)*0.05+0.95;ghostUv*=zoomBlurRatio;vec2 haloUv=ghostUv+haloVec;vec3 halo=vec3(texture2D(u_texture,haloUv+direction*distortion.r).r,texture2D(u_texture,haloUv+direction*distortion.g).g,texture2D(u_texture,haloUv+direction*distortion.b).b)*u_haloStrength*smoothstep(u_haloMaskInner,u_haloMaskOuter,length(toCenter));
#ifdef USE_LENS_DIRT
vec2 dirtUv=(uv-0.5)*u_dirtAspect+0.5;vec3 dirt=texture2D(u_dirtTexture,dirtUv).rgb;gl_FragColor.rgb+=(halo+alpha+0.05*dirt)*dirt;
#else
gl_FragColor.rgb+=halo;
#endif
#endif
#ifdef USE_CONVOLUTION
gl_FragColor.rgb*=max(abs(uv.x-0.5),abs(uv.y-0.5))>0.5 ? 0. : 1.;
#endif
}`;
const blurFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform vec2 u_resolution;uniform vec2 u_direction;float gaussianPdf(in float x,in float sigma){return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;}void main(){vec2 invSize=1.0/u_resolution;float fSigma=float(SIGMA);float weightSum=gaussianPdf(0.0,fSigma);vec3 diffuseSum=texture2D(u_texture,v_uv).rgb*weightSum;for(int i=1;i<KERNEL_RADIUS;i++){float x=float(i);float w=gaussianPdf(x,fSigma);vec2 uvOffset=u_direction*invSize*x;vec3 sample1=texture2D(u_texture,v_uv+uvOffset).rgb;vec3 sample2=texture2D(u_texture,v_uv-uvOffset).rgb;diffuseSum+=(sample1+sample2)*w;weightSum+=2.0*w;}gl_FragColor=vec4(diffuseSum/weightSum,1.0);}`;
const fftFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_texelSize;uniform float u_subtransformSize;uniform float u_normalization;uniform bool u_isForward;const float TWOPI=6.283185307179586;void main(){
#ifdef HORIZTONAL
float index=gl_FragCoord.x-.5;
#else
float index=gl_FragCoord.y-.5;
#endif
float evenIndex=floor(index/u_subtransformSize)*(u_subtransformSize*0.5)+mod(index,u_subtransformSize*0.5);
#ifdef HORIZTONAL
vec2 evenPos=vec2(evenIndex,gl_FragCoord.y)*u_texelSize;vec2 oddPos=evenPos+vec2(.5,0.);
#else
vec2 evenPos=vec2(gl_FragCoord.x,evenIndex)*u_texelSize;vec2 oddPos=evenPos+vec2(0.,.5);
#endif
vec4 even=texture2D(u_texture,evenPos);vec4 odd=texture2D(u_texture,oddPos);float twiddleArgument=(u_isForward ? TWOPI :-TWOPI)*(index/u_subtransformSize);vec2 twiddle=vec2(cos(twiddleArgument),sin(twiddleArgument));gl_FragColor=(even+vec4(twiddle.x*odd.xy-twiddle.y*odd.zw,twiddle.y*odd.xy+twiddle.x*odd.zw))*u_normalization;}`;
const convolutionSrcFrag = `#define GLSLIFY 1
uniform vec2 u_aspect;uniform sampler2D u_texture;varying vec2 v_uv;void main(){vec2 toCenter=(fract(v_uv+0.5)-0.5)*u_aspect;vec2 rotToCenter=mat2(0.7071067811865476,-0.7071067811865476,0.7071067811865476,0.7071067811865476)*toCenter;float res=exp(-length(toCenter)*1.0)*0.05+exp(-length(toCenter)*7.5)*0.5+exp(-length(toCenter)*25.0)*1.+exp(-length(toCenter*vec2(1.0,10.0))*30.0)*20.+exp(-length(toCenter*vec2(1.0,20.0))*60.0)*300.+exp(-length(toCenter*vec2(10.0,1.0))*30.0)*20.+exp(-length(toCenter*vec2(20.0,1.0))*60.0)*300.+exp(-length(rotToCenter*vec2(1.0,8.0))*37.5)*12.+exp(-length(rotToCenter*vec2(1.0,20.0))*75.0)*300.+exp(-length(rotToCenter*vec2(20.0,1.0))*75.0)*300.;gl_FragColor=vec4(res,res,0.,0.);}`;
const convolutionMixFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_kernelTexture;void main(){vec4 a=texture2D(u_texture,v_uv);vec4 b=texture2D(u_kernelTexture,v_uv);gl_FragColor=vec4(a.xy*b.xy-a.zw*b.zw,a.xy*b.zw+a.zw*b.xy);}`;
const convolutionCacheFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_amount;uniform float u_saturation;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv)*u_amount;gl_FragColor.rgb=mix(vec3(dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114))),gl_FragColor.rgb,u_saturation);}`;
const convolutionFrag = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_bloomTexture;uniform float u_convolutionBuffer;
#include <common>
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}void main(){vec4 c=texture2D(u_texture,v_uv);vec2 bloomUv=(v_uv-0.5)/(1.0+u_convolutionBuffer)+0.5;gl_FragColor=c+texture2D(u_bloomTexture,bloomUv);gl_FragColor.rgb=dithering(gl_FragColor.rgb);gl_FragColor.a=1.0;}`;
class Bloom extends PostEffect {
  ITERATION = 5;
  USE_CONVOLUTION = true;
  USE_HD = true;
  USE_LENS_DIRT = false;
  amount = 1;
  radius = 0;
  threshold = 0.1;
  smoothWidth = 1;
  highPassMultiplier = 1;
  haloWidth = 0.8;
  haloRGBShift = 0.03;
  haloStrength = 0.21;
  haloMaskInner = 0.3;
  haloMaskOuter = 0.5;
  highPassMaterial;
  highPassRenderTarget;
  fftHMaterial;
  fftVMaterial;
  srcMaterial;
  convolutionSrcFrag = convolutionSrcFrag;
  srcSize = 256;
  srcRT;
  fftCacheRT1;
  fftCacheRT2;
  fftSrcRT;
  fftBloomOutCacheMaterial;
  fftBloomOutCacheRT;
  convolutionMixMaterial;
  convolutionMixDownScale = 1;
  convolutionBuffer = 0.1;
  renderTargetsHorizontal = [];
  renderTargetsVertical = [];
  blurMaterials = [];
  saturation = 1;
  renderOrder = 10;
  directionX = new Vector2(1, 0);
  directionY = new Vector2(0, 1);
  fftSrcRT;
  init(e) {
    Object.assign(this, e);
    super.init();
    let t = HalfFloatType;
    this.highPassRenderTarget = fboHelper.createRenderTarget(1, 1, !this.USE_HD, t);
    this.highPassMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_luminosityThreshold: {
          value: 1
        },
        u_smoothWidth: {
          value: 1
        },
        u_amount: {
          value: 1
        },
        u_haloWidth: {
          value: 1
        },
        u_haloRGBShift: {
          value: 1
        },
        u_haloStrength: {
          value: 1
        },
        u_haloMaskInner: {
          value: 1
        },
        u_haloMaskOuter: {
          value: 1
        },
        u_texelSize: null,
        u_aspect: {
          value: new Vector2()
        },
        u_dirtTexture: {
          value: null
        },
        u_dirtAspect: {
          value: new Vector2()
        }
      },
      fragmentShader: highPassFrag
    });
    this.highPassMaterial.defines.USE_LENS_DIRT = this.USE_LENS_DIRT;
    if (this.USE_CONVOLUTION) {
      this.highPassMaterial.defines.USE_CONVOLUTION = true;
      this.highPassMaterial.uniforms.u_convolutionBuffer = {
        value: 0.15
      };
      this.fftSrcRT = fboHelper.createRenderTarget(1, 1, true, t);
      this.fftCacheRT1 = fboHelper.createRenderTarget(1, 1, true, t);
      this.fftCacheRT2 = this.fftCacheRT1.clone();
      this.fftBloomOutCacheRT = fboHelper.createRenderTarget(1, 1);
      this.srcMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_aspect: {
            value: new Vector2()
          }
        },
        fragmentShader: this.convolutionSrcFrag
      });
      this.fftHMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: {
            value: null
          },
          u_texelSize: {
            value: new Vector2()
          },
          u_subtransformSize: {
            value: 0
          },
          u_normalization: {
            value: 0
          },
          u_isForward: {
            value: 0
          }
        },
        fragmentShader: fftFrag
      });
      this.fftHMaterial.defines.HORIZTONAL = true;
      this.fftVMaterial = fboHelper.createRawShaderMaterial({
        uniforms: this.fftHMaterial.uniforms,
        fragmentShader: fftFrag
      });
      this.convolutionMixMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: {
            value: null
          },
          u_kernelTexture: {
            value: this.fftSrcRT.texture
          }
        },
        fragmentShader: convolutionMixFrag
      });
      this.fftBloomOutCacheMaterial = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: {
            value: null
          },
          u_amount: {
            value: 0
          },
          u_saturation: {
            value: 0
          }
        },
        fragmentShader: convolutionCacheFrag
      });
      this.material = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: {
            value: null
          },
          u_bloomTexture: {
            value: this.fftBloomOutCacheRT.texture
          },
          u_convolutionBuffer: this.highPassMaterial.uniforms.u_convolutionBuffer
        },
        fragmentShader: convolutionFrag,
        blending: NoBlending
      });
    } else {
      for (let r = 0; r < this.ITERATION; r++) {
        this.renderTargetsHorizontal.push(fboHelper.createRenderTarget(1, 1, false, t));
        this.renderTargetsVertical.push(fboHelper.createRenderTarget(1, 1, false, t));
        const n = 3 + r * 2;
        this.blurMaterials[r] = fboHelper.createRawShaderMaterial({
          uniforms: {
            u_texture: {
              value: null
            },
            u_resolution: {
              value: new Vector2()
            },
            u_direction: {
              value: null
            }
          },
          fragmentShader: blurFrag,
          defines: {
            KERNEL_RADIUS: n,
            SIGMA: n
          }
        });
      }
      this.material = fboHelper.createRawShaderMaterial({
        uniforms: {
          u_texture: {
            value: null
          },
          u_bloomStrength: {
            value: 1
          },
          u_bloomWeights: {
            value: []
          },
          u_saturation: {
            value: 0
          }
        },
        fragmentShader: frag$2,
        blending: NoBlending,
        defines: {
          ITERATION: this.ITERATION
        }
      });
      for (let r = 0; r < this.ITERATION; r++) {
        this.material.uniforms["u_blurTexture" + r] = {
          value: this.renderTargetsVertical[r].texture
        };
      }
    }
  }
  setDirtTexture(e) {
    this.highPassMaterial.uniforms.u_dirtTexture.value = e;
  }
  setPostprocessing(e) {
    const t = e.width;
    const r = e.height;
    if (this.USE_CONVOLUTION) {
      let n = math.powerTwoCeiling(t / 2) >> this.convolutionMixDownScale;
      let a = math.powerTwoCeiling(r / 2) >> this.convolutionMixDownScale;
      this.highPassRenderTarget.setSize(n, a);
      if (n !== this.fftCacheRT1.width || a !== this.fftCacheRT1.height) {
        this.fftSrcRT.setSize(n, a);
        this.fftCacheRT1.setSize(n, a);
        this.fftCacheRT2.setSize(n, a);
        this.fftBloomOutCacheRT.setSize(n, a);
        let l = r / Math.max(t, r);
        this.srcMaterial.uniforms.u_aspect.value.set(t / r * l, l);
        fboHelper.render(this.srcMaterial, this.fftCacheRT1);
        this.renderFFT(this.fftCacheRT1, this.fftSrcRT, true);
      }
    } else {
      let n = Math.ceil(t / 2);
      let a = Math.ceil(r / 2);
      this.highPassRenderTarget.setSize(n, a);
      super.setPostprocessing(e);
      for (let l = 0; l < this.ITERATION; l++) {
        this.renderTargetsHorizontal[l].setSize(n, a);
        this.renderTargetsVertical[l].setSize(n, a);
        this.blurMaterials[l].uniforms.u_resolution.value.set(n, a);
        n = Math.ceil(n / 2);
        a = Math.ceil(a / 2);
      }
    }
  }
  dispose() {
    if (!this.USE_CONVOLUTION) {
      if (this.highPassRenderTarget) {
        this.highPassRenderTarget.dispose();
      }
      for (let e = 0; e < this.ITERATION; e++) {
        if (this.renderTargetsHorizontal[e]) {
          this.renderTargetsHorizontal[e].dispose();
        }
        if (this.renderTargetsVertical[e]) {
          this.renderTargetsVertical[e].dispose();
        }
      }
    }
  }
  needsRender() {
    return !!this.amount;
  }
  renderFFT(e, t, r) {
    let n = e.width;
    let a = e.height;
    let l = Math.round(Math.log(n) / Math.log(2));
    let c = Math.round(Math.log(a) / Math.log(2));
    let u = l + c;
    let f = u % 2 === 0;
    this.fftHMaterial;
    let p = this.fftHMaterial.uniforms;
    for (let g = 0; g < u; g++) {
      let v = g < l;
      p.u_texture.value = e.texture;
      p.u_normalization.value = g === 0 ? 1 / Math.sqrt(n * a) : 1;
      p.u_isForward.value = !!r;
      p.u_texelSize.value.set(1 / n, 1 / a);
      p.u_subtransformSize.value = Math.pow(2, (v ? g : g - l) + 1);
      fboHelper.render(v ? this.fftHMaterial : this.fftVMaterial, t);
      let _ = e;
      e = t;
      t = _;
    }
    if (f) {
      fboHelper.copy(e.texture, t);
    }
  }
  render(e, t = false) {
    let r = properties.postprocessing.width;
    let n = properties.postprocessing.height;
    this.highPassMaterial.uniforms.u_texture.value = e.fromTexture;
    this.highPassMaterial.uniforms.u_luminosityThreshold.value = this.threshold;
    this.highPassMaterial.uniforms.u_smoothWidth.value = this.smoothWidth;
    this.highPassMaterial.uniforms.u_amount.value = this.highPassMultiplier;
    this.highPassMaterial.uniforms.u_haloWidth.value = this.haloWidth;
    this.highPassMaterial.uniforms.u_haloRGBShift.value = this.haloRGBShift * r;
    this.highPassMaterial.uniforms.u_haloStrength.value = this.haloStrength;
    this.highPassMaterial.uniforms.u_haloMaskInner.value = this.haloMaskInner;
    this.highPassMaterial.uniforms.u_haloMaskOuter.value = this.haloMaskOuter;
    this.highPassMaterial.uniforms.u_texelSize = e.sharedUniforms.u_texelSize;
    this.highPassMaterial.uniforms.u_aspect = e.sharedUniforms.u_aspect;
    let a = this.haloStrength > 0;
    let l = n / Math.sqrt(r * r + n * n) * 2;
    this.highPassMaterial.uniforms.u_aspect.value.set(r / n * l, l);
    l = n / Math.max(r, n);
    this.highPassMaterial.uniforms.u_dirtAspect.value.set(r / n * l, l);
    if (this.highPassMaterial.defines.USE_HALO !== a) {
      this.highPassMaterial.defines.USE_HALO = a;
      this.highPassMaterial.needsUpdate = true;
    }
    if (this.USE_CONVOLUTION) {
      this.highPassMaterial.uniforms.u_convolutionBuffer.value = this.convolutionBuffer;
    }
    e.renderMaterial(this.highPassMaterial, this.highPassRenderTarget);
    if (this.USE_CONVOLUTION) {
      fboHelper.copy(this.highPassRenderTarget.texture, this.fftCacheRT1);
      this.renderFFT(this.fftCacheRT1, this.fftCacheRT2, true);
      this.convolutionMixMaterial.uniforms.u_texture.value = this.fftCacheRT2.texture;
      fboHelper.render(this.convolutionMixMaterial, this.fftCacheRT1);
      this.renderFFT(this.fftCacheRT1, this.fftCacheRT2, false);
      let c = this.amount * 1024;
      c = c / Math.pow(math.powerTwoCeilingBase(this.fftCacheRT1.width * this.fftCacheRT1.height), 4) * 0.85;
      this.fftBloomOutCacheMaterial.uniforms.u_amount.value = c;
      this.fftBloomOutCacheMaterial.uniforms.u_saturation.value = this.saturation;
      this.fftBloomOutCacheMaterial.uniforms.u_texture.value = this.fftCacheRT2.texture;
      e.renderMaterial(this.fftBloomOutCacheMaterial, this.fftBloomOutCacheRT);
      super.render(e, t);
    } else {
      let c = this.highPassRenderTarget;
      for (let u = 0; u < this.ITERATION; u++) {
        const f = this.blurMaterials[u];
        f.uniforms.u_texture.value = c.texture;
        f.uniforms.u_direction.value = this.directionX;
        e.renderMaterial(f, this.renderTargetsHorizontal[u]);
        f.uniforms.u_texture.value = this.renderTargetsHorizontal[u].texture;
        f.uniforms.u_direction.value = this.directionY;
        e.renderMaterial(f, this.renderTargetsVertical[u]);
        c = this.renderTargetsVertical[u];
      }
      this.material.uniforms.u_texture.value = e.fromTexture;
      this.material.uniforms.u_saturation.value = math.mix(1, this.saturation, 0.5);
      for (let u = 0; u < this.ITERATION; u++) {
        const f = (this.ITERATION - u) / this.ITERATION;
        this.material.uniforms.u_bloomWeights.value[u] = this.amount * (f + (1.2 - f * 2) * this.radius) / Math.pow(2, this.ITERATION - u - 1);
      }
      super.render(e, t);
    }
  }
}
const frag$1 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_screenPaintTexture;uniform vec2 u_screenPaintTexelSize;uniform float u_amount;uniform float u_rgbShift;uniform float u_multiplier;uniform float u_colorMultiplier;uniform float u_shade;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 bnoise=getBlueNoise(gl_FragCoord.xy+vec2(17.,29.));vec4 data=texture2D(u_screenPaintTexture,v_uv);float weight=(data.z+data.w)*0.5;vec2 vel=(0.5-data.xy-0.001)*2.*weight;vec4 color=vec4(0.0);vec2 velocity=vel*u_amount/4.0*u_screenPaintTexelSize*u_multiplier;vec2 uv=v_uv+bnoise.xy*velocity;for(int i=0;i<9;i++){color+=texture2D(u_texture,uv);uv+=velocity;}color/=9.;color.rgb+=sin(vec3(vel.x+vel.y)*40.0+vec3(0.0,2.0,4.0)*u_rgbShift)*smoothstep(0.4,-0.9,weight)*u_shade*max(abs(vel.x),abs(vel.y))*u_colorMultiplier;gl_FragColor=color;}`;
class ScreenPaintDistortion extends PostEffect {
  screenPaint = null;
  amount = 20;
  rgbShift = 1;
  multiplier = 1.25;
  colorMultiplier = 1;
  shade = 1.25;
  renderOrder = 75;
  init(e) {
    Object.assign(this, e);
    super.init();
    if (!this.screenPaint) {
      throw new Error("screenPaint is required");
    }
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: null
        },
        u_screenPaintTexture: this.screenPaint.sharedUniforms.u_currPaintTexture,
        u_screenPaintTexelSize: this.screenPaint.sharedUniforms.u_paintTexelSize,
        u_amount: {
          value: 0
        },
        u_rgbShift: {
          value: 0
        },
        u_multiplier: {
          value: 0
        },
        u_colorMultiplier: {
          value: 0
        },
        u_shade: {
          value: 0
        }
      }, blueNoise.sharedUniforms),
      fragmentShader: frag$1
    });
  }
  needsRender(e) {
    return this.amount > 0;
  }
  syncCamera(e) {
    this.needsSync = true;
    if (e) {
      e.matrixWorldInverse.decompose(this._position, this._quaternion, this._scale);
      this.projectionViewMatrix.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
      this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert();
    }
    this.prevProjectionViewMatrix.copy(this.projectionViewMatrix);
  }
  render(e, t = false) {
    this.material.uniforms.u_amount.value = this.amount;
    this.material.uniforms.u_rgbShift.value = this.rgbShift;
    this.material.uniforms.u_multiplier.value = this.multiplier;
    this.material.uniforms.u_colorMultiplier.value = this.colorMultiplier;
    this.material.uniforms.u_shade.value = this.shade;
    super.render(e, t);
  }
}
const fragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform vec3 u_bgColor;uniform float u_opacity;uniform float u_vignetteFrom;uniform float u_vignetteTo;uniform vec2 u_vignetteAspect;uniform vec3 u_vignetteColor;uniform float u_saturation;uniform float u_contrast;uniform float u_brightness;uniform vec3 u_tintColor;uniform float u_tintOpacity;uniform float u_ditherSeed;float hash13(vec3 p3){p3=fract(p3*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}vec3 screen(vec3 cb,vec3 cs){return cb+cs-(cb*cs);}vec3 colorDodge(vec3 cb,vec3 cs){return mix(min(vec3(1.0),cb/(1.0-cs)),vec3(1.0),step(vec3(1.0),cs));}void main(){vec2 uv=v_uv;vec3 color=texture2D(u_texture,uv).rgb;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color=0.5+(1.0+u_contrast)*(color-0.5);color+=u_brightness;color=mix(color,screen(colorDodge(color,u_tintColor),u_tintColor),u_tintOpacity);float d=length((uv-0.5)*u_vignetteAspect)*2.0;color=mix(color,u_vignetteColor,smoothstep(u_vignetteFrom,u_vignetteTo,d));gl_FragColor=vec4(mix(u_bgColor,color,u_opacity)+hash13(vec3(gl_FragCoord.xy,u_ditherSeed))/255.0,1.0);}`;
class Final extends PostEffect {
  vignetteFrom = 0.6;
  vignetteTo = 1.6;
  vignetteAspect = new Vector2();
  vignetteColor = new Color();
  saturation = 1;
  contrast = 0;
  brightness = 1;
  tintColor = new Color();
  tintOpacity = 1;
  bgColor = new Color();
  opacity = 1;
  isActive = false;
  renderOrder = 30;
  init(e) {
    Object.assign(this, e);
    super.init();
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_vignetteFrom: {
          value: 0
        },
        u_vignetteTo: {
          value: 0
        },
        u_vignetteAspect: {
          value: this.vignetteAspect
        },
        u_vignetteColor: {
          value: this.vignetteColor
        },
        u_saturation: {
          value: 0
        },
        u_contrast: {
          value: 0
        },
        u_brightness: {
          value: 0
        },
        u_tintColor: {
          value: this.tintColor
        },
        u_tintOpacity: {
          value: 0
        },
        u_bgColor: {
          value: this.bgColor
        },
        u_opacity: {
          value: 0
        },
        u_ditherSeed: {
          value: 0
        }
      },
      fragmentShader
    });
  }
  needsRender() {
    return this.isActive;
  }
  render(e, t = false) {
    const r = e.width;
    const n = e.height;
    let a = this.material.uniforms;
    a.u_vignetteFrom.value = this.vignetteFrom;
    a.u_vignetteTo.value = this.vignetteTo;
    const l = n / Math.sqrt(r * r + n * n);
    this.vignetteAspect.set(r / n * l, l);
    a.u_saturation.value = this.saturation - 1;
    a.u_contrast.value = this.contrast;
    a.u_brightness.value = this.brightness - 1;
    a.u_tintOpacity.value = this.tintOpacity;
    a.u_opacity.value = this.opacity;
    a.u_ditherSeed.value = Math.random() * 1000;
    super.render(e, t);
  }
}
const easuFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_inResolution;uniform vec2 u_outResolution;vec3 FsrEasuCF(vec2 p){return texture2D(u_texture,p).rgb;}void FsrEasuCon(out vec4 con0,out vec4 con1,out vec4 con2,out vec4 con3,vec2 inputViewportInPixels,vec2 inputSizeInPixels,vec2 outputSizeInPixels){con0=vec4(inputViewportInPixels.x/outputSizeInPixels.x,inputViewportInPixels.y/outputSizeInPixels.y,.5*inputViewportInPixels.x/outputSizeInPixels.x-.5,.5*inputViewportInPixels.y/outputSizeInPixels.y-.5);con1=vec4(1,1,1,-1)/inputSizeInPixels.xyxy;con2=vec4(-1,2,1,2)/inputSizeInPixels.xyxy;con3=vec4(0,4,0,0)/inputSizeInPixels.xyxy;}void FsrEasuTapF(inout vec3 aC,inout float aW,vec2 off,vec2 dir,vec2 len,float lob,float clp,vec3 c){vec2 v=vec2(dot(off,dir),dot(off,vec2(-dir.y,dir.x)));v*=len;float d2=min(dot(v,v),clp);float wB=.4*d2-1.;float wA=lob*d2-1.;wB*=wB;wA*=wA;wB=1.5625*wB-.5625;float w=wB*wA;aC+=c*w;aW+=w;}void FsrEasuSetF(inout vec2 dir,inout float len,float w,float lA,float lB,float lC,float lD,float lE){float lenX=max(abs(lD-lC),abs(lC-lB));float dirX=lD-lB;dir.x+=dirX*w;lenX=clamp(abs(dirX)/lenX,0.,1.);lenX*=lenX;len+=lenX*w;float lenY=max(abs(lE-lC),abs(lC-lA));float dirY=lE-lA;dir.y+=dirY*w;lenY=clamp(abs(dirY)/lenY,0.,1.);lenY*=lenY;len+=lenY*w;}void FsrEasuF(out vec3 pix,vec2 ip,vec4 con0,vec4 con1,vec4 con2,vec4 con3){vec2 pp=ip*con0.xy+con0.zw;vec2 fp=floor(pp);pp-=fp;vec2 p0=fp*con1.xy+con1.zw;vec2 p1=p0+con2.xy;vec2 p2=p0+con2.zw;vec2 p3=p0+con3.xy;vec4 off=vec4(-.5,.5,-.5,.5)*con1.xxyy;vec3 bC=FsrEasuCF(p0+off.xw);float bL=bC.g+0.5*(bC.r+bC.b);vec3 cC=FsrEasuCF(p0+off.yw);float cL=cC.g+0.5*(cC.r+cC.b);vec3 iC=FsrEasuCF(p1+off.xw);float iL=iC.g+0.5*(iC.r+iC.b);vec3 jC=FsrEasuCF(p1+off.yw);float jL=jC.g+0.5*(jC.r+jC.b);vec3 fC=FsrEasuCF(p1+off.yz);float fL=fC.g+0.5*(fC.r+fC.b);vec3 eC=FsrEasuCF(p1+off.xz);float eL=eC.g+0.5*(eC.r+eC.b);vec3 kC=FsrEasuCF(p2+off.xw);float kL=kC.g+0.5*(kC.r+kC.b);vec3 lC=FsrEasuCF(p2+off.yw);float lL=lC.g+0.5*(lC.r+lC.b);vec3 hC=FsrEasuCF(p2+off.yz);float hL=hC.g+0.5*(hC.r+hC.b);vec3 gC=FsrEasuCF(p2+off.xz);float gL=gC.g+0.5*(gC.r+gC.b);vec3 oC=FsrEasuCF(p3+off.yz);float oL=oC.g+0.5*(oC.r+oC.b);vec3 nC=FsrEasuCF(p3+off.xz);float nL=nC.g+0.5*(nC.r+nC.b);vec2 dir=vec2(0.);float len=0.;FsrEasuSetF(dir,len,(1.-pp.x)*(1.-pp.y),bL,eL,fL,gL,jL);FsrEasuSetF(dir,len,pp.x*(1.-pp.y),cL,fL,gL,hL,kL);FsrEasuSetF(dir,len,(1.-pp.x)*pp.y,fL,iL,jL,kL,nL);FsrEasuSetF(dir,len,pp.x*pp.y,gL,jL,kL,lL,oL);vec2 dir2=dir*dir;float dirR=dir2.x+dir2.y;bool zro=dirR<(1./32768.);dirR=inversesqrt(dirR);dirR=zro ? 1. : dirR;dir.x=zro ? 1. : dir.x;dir*=vec2(dirR);len=len*.5;len*=len;float stretch=dot(dir,dir)/(max(abs(dir.x),abs(dir.y)));vec2 len2=vec2(1.+(stretch-1.0)*len,1.-.5*len);float lob=.5-.29*len;float clp=1./lob;vec3 min4=min(min(fC,gC),min(jC,kC));vec3 max4=max(max(fC,gC),max(jC,kC));vec3 aC=vec3(0);float aW=0.;FsrEasuTapF(aC,aW,vec2(0.,-1.)-pp,dir,len2,lob,clp,bC);FsrEasuTapF(aC,aW,vec2(1.,-1.)-pp,dir,len2,lob,clp,cC);FsrEasuTapF(aC,aW,vec2(-1.,1.)-pp,dir,len2,lob,clp,iC);FsrEasuTapF(aC,aW,vec2(0.,1.)-pp,dir,len2,lob,clp,jC);FsrEasuTapF(aC,aW,vec2(0.,0.)-pp,dir,len2,lob,clp,fC);FsrEasuTapF(aC,aW,vec2(-1.,0.)-pp,dir,len2,lob,clp,eC);FsrEasuTapF(aC,aW,vec2(1.,1.)-pp,dir,len2,lob,clp,kC);FsrEasuTapF(aC,aW,vec2(2.,1.)-pp,dir,len2,lob,clp,lC);FsrEasuTapF(aC,aW,vec2(2.,0.)-pp,dir,len2,lob,clp,hC);FsrEasuTapF(aC,aW,vec2(1.,0.)-pp,dir,len2,lob,clp,gC);FsrEasuTapF(aC,aW,vec2(1.,2.)-pp,dir,len2,lob,clp,oC);FsrEasuTapF(aC,aW,vec2(0.,2.)-pp,dir,len2,lob,clp,nC);pix=min(max4,max(min4,aC/aW));}void main(){vec3 c;vec4 con0,con1,con2,con3;FsrEasuCon(con0,con1,con2,con3,u_inResolution,u_inResolution,u_outResolution);FsrEasuF(c,gl_FragCoord.xy,con0,con1,con2,con3);gl_FragColor=vec4(c.xyz,1);}`;
const frag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_outResolution;uniform float u_sharpness;
#define FSR_RCAS_LIMIT (0.25-(1.0/16.0))
vec4 FsrRcasLoadF(vec2 p);void FsrRcasCon(out float con,float sharpness){con=exp2(-sharpness);}vec3 FsrRcasF(vec2 ip,float con){vec2 sp=vec2(ip);vec3 b=FsrRcasLoadF(sp+vec2(0,-1)).rgb;vec3 d=FsrRcasLoadF(sp+vec2(-1,0)).rgb;vec3 e=FsrRcasLoadF(sp).rgb;vec3 f=FsrRcasLoadF(sp+vec2(1,0)).rgb;vec3 h=FsrRcasLoadF(sp+vec2(0,1)).rgb;float bL=b.g+.5*(b.b+b.r);float dL=d.g+.5*(d.b+d.r);float eL=e.g+.5*(e.b+e.r);float fL=f.g+.5*(f.b+f.r);float hL=h.g+.5*(h.b+h.r);float nz=.25*(bL+dL+fL+hL)-eL;nz=clamp(abs(nz)/(max(max(bL,dL),max(eL,max(fL,hL)))-min(min(bL,dL),min(eL,min(fL,hL)))),0.,1.);nz=1.-.5*nz;vec3 mn4=min(b,min(f,h));vec3 mx4=max(b,max(f,h));vec2 peakC=vec2(1.,-4.);vec3 hitMin=mn4/(4.*mx4);vec3 hitMax=(peakC.x-mx4)/(4.*mn4+peakC.y);vec3 lobeRGB=max(-hitMin,hitMax);float lobe=max(-FSR_RCAS_LIMIT,min(max(lobeRGB.r,max(lobeRGB.g,lobeRGB.b)),0.))*con;
#ifdef FSR_RCAS_DENOISE
lobe*=nz;
#endif
return(lobe*(b+d+h+f)+e)/(4.*lobe+1.);}vec4 FsrRcasLoadF(vec2 p){return texture2D(u_texture,p/u_outResolution.xy);}void main(){vec2 uv=gl_FragCoord.xy/u_outResolution.xy;float con;FsrRcasCon(con,u_sharpness);vec3 col=FsrRcasF(gl_FragCoord.xy,con);gl_FragColor=vec4(col,1.);}`;
let Fsr$1 = class {
  sharpness = 1;
  _easuMaterial;
  _material;
  _inResolution = new Vector2();
  _outResolution = new Vector2();
  _cacheRenderTarget = null;
  constructor() {
    this._cacheRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._easuMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_inResolution: {
          value: this._inResolution
        },
        u_outResolution: {
          value: this._outResolution
        }
      },
      fragmentShader: easuFrag
    });
    this._material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: this._cacheRenderTarget.texture
        },
        u_outResolution: this._easuMaterial.uniforms.u_outResolution,
        u_sharpness: {
          value: 0
        }
      },
      fragmentShader: frag
    });
  }
  render(e, t) {
    let r = e.image.width;
    let n = e.image.height;
    this._material.uniforms.u_sharpness.value = this.sharpness;
    if (this._inResolution.width !== r || this._inResolution.height !== n) {
      this._inResolution.set(r, n);
    }
    let a;
    let l;
    if (t) {
      a = t.width;
      l = t.height;
    } else {
      a = fboHelper.renderer.domElement.width;
      l = fboHelper.renderer.domElement.height;
    }
    if (this._outResolution.width !== a || this._outResolution.height !== l) {
      this._outResolution.set(a, l);
      this._cacheRenderTarget.setSize(a, l);
    }
    this._easuMaterial.uniforms.u_texture.value = e;
    fboHelper.render(this._easuMaterial, this._cacheRenderTarget);
    if (!t) {
      fboHelper.renderer.setRenderTarget(null);
      fboHelper.renderer.setViewport(0, 0, this._outResolution.x, this._outResolution.y);
    }
    fboHelper.render(this._material, t);
  }
};
class Fsr extends PostEffect {
  sharpness = 1;
  fsr;
  renderOrder = 2000;
  init(e) {
    Object.assign(this, e);
    super.init();
    this.fsr = new Fsr$1();
  }
  render(e, t = false) {
    this.fsr.sharpness = this.sharpness;
    this.fsr.render(e.fromTexture, t ? null : e.toRenderTarget);
    e.swap();
  }
}
const XHRItem = properties.loader.ITEM_CLASSES.xhr;
class BufItem extends XHRItem {
  constructor(e, t) {
    super(e, {
      ...t,
      responseType: "arraybuffer"
    });
  }
  retrieve() {
    return false;
  }
  _onLoad() {
    if (!this.content) {
      try {
        const e = this.xmlhttp.response;
        let t = new Uint32Array(e, 0, 1)[0];
        let r = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(e, 4, t)));
        let n = r.vertexCount;
        let a = r.indexCount;
        let l = 4 + t;
        let c = new BufferGeometry();
        let u = r.attributes;
        let f = false;
        let p = {};
        for (let _ = 0, T = u.length; _ < T; _++) {
          let M = u[_];
          let S = M.id;
          let b = S === "indices" ? a : n;
          let C = M.componentSize;
          let w = window[M.storageType];
          let R = new w(e, l, b * C);
          let E = w.BYTES_PER_ELEMENT;
          let I;
          if (M.needsPack) {
            let F = M.packedComponents;
            let k = F.length;
            let L = M.storageType.indexOf("Int") === 0;
            let D = 1 << E * 8;
            let ne = L ? D * 0.5 : 0;
            let re = 1 / D;
            I = new Float32Array(b * C);
            for (let ce = 0, z = 0; ce < b; ce++) {
              for (let j = 0; j < k; j++) {
                let X = F[j];
                I[z] = (R[z] + ne) * re * X.delta + X.from;
                z++;
              }
            }
          } else {
            p[S] = l;
            I = R;
          }
          if (S === "normal") {
            f = true;
          }
          if (S === "indices") {
            c.setIndex(new BufferAttribute(I, 1));
          } else {
            c.setAttribute(S, new BufferAttribute(I, C));
          }
          l += b * C * E;
        }
        let g = r.meshType;
        let v = [];
        if (r.sceneData) {
          let _ = r.sceneData;
          let T = new Object3D();
          let M = [];
          let S = g === "Mesh" ? 3 : g === "LineSegments" ? 2 : 1;
          for (let b = 0, C = _.length; b < C; b++) {
            let w = _[b];
            let R;
            if (w.vertexCount == 0) {
              R = new Object3D();
            } else {
              let E = new BufferGeometry();
              let I = c.index;
              let F = I.array;
              let k = F.constructor;
              let L = k.BYTES_PER_ELEMENT;
              E.setIndex(new BufferAttribute(new F.constructor(F.buffer, w.faceIndex * I.itemSize * L * S + (p.indices || 0), w.faceCount * I.itemSize * S), I.itemSize));
              for (let D = 0, ne = E.index.array.length; D < ne; D++) {
                E.index.array[D] -= w.vertexIndex;
              }
              for (let D in c.attributes) {
                I = c.attributes[D];
                F = I.array;
                k = F.constructor;
                L = k.BYTES_PER_ELEMENT;
                E.setAttribute(D, new BufferAttribute(new F.constructor(F.buffer, w.vertexIndex * I.itemSize * L + (p[D] || 0), w.vertexCount * I.itemSize), I.itemSize));
              }
              if (g === "Mesh") {
                R = new Mesh(E, new MeshNormalMaterial({
                  flatShading: !f
                }));
              } else if (g === "LineSegments") {
                R = new LineSegments(E, new LineBasicMaterial());
              } else {
                R = new Points(E, new PointsMaterial({
                  sizeAttenuation: false,
                  size: 2
                }));
              }
              M.push(R);
            }
            if (w.parentIndex > -1) {
              v[w.parentIndex].add(R);
            } else {
              T.add(R);
            }
            R.position.fromArray(w.position);
            R.quaternion.fromArray(w.quaternion);
            R.scale.fromArray(w.scale);
            R.name = w.name;
            R.userData.material = w.material;
            v[b] = R;
          }
          c.userData.meshList = M;
          c.userData.sceneObject = T;
        }
        this.content = c;
      } catch (err) {
        console.warn("[BufItem error]:", this.url, err);
        this.content = new BufferGeometry();
      }
    }
    this.xmlhttp = undefined;
    super._onLoad(this);
  }
}
BufItem.type = "buf";
BufItem.extensions = ["buf"];
BufItem.responseType = "arraybuffer";
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/
function durl(o) {
  return URL.createObjectURL(new Blob([o], {
    type: "text/javascript"
  }));
}
try {
  URL.revokeObjectURL(durl(""));
} catch (o) {
  durl = function (e) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(e);
  };
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
function freb(o, e) {
  var t = new u16(31);
  for (var r = 0; r < 31; ++r) {
    t[r] = e += 1 << o[r - 1];
  }
  var n = new u32(t[30]);
  for (var r = 1; r < 30; ++r) {
    for (var a = t[r]; a < t[r + 1]; ++a) {
      n[a] = a - t[r] << 5 | r;
    }
  }
  return [t, n];
}
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258;
revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
function hMap(o, e, t) {
  for (var r = o.length, n = 0, a = new u16(e); n < r; ++n) {
    ++a[o[n] - 1];
  }
  var l = new u16(e);
  for (n = 0; n < e; ++n) {
    l[n] = l[n - 1] + a[n - 1] << 1;
  }
  var c;
  if (t) {
    c = new u16(1 << e);
    var u = 15 - e;
    for (n = 0; n < r; ++n) {
      if (o[n]) {
        var f = n << 4 | o[n];
        var p = e - o[n];
        for (var g = l[o[n] - 1]++ << p, v = g | (1 << p) - 1; g <= v; ++g) {
          c[rev[g] >>> u] = f;
        }
      }
    }
  } else {
    c = new u16(r);
    n = 0;
    for (; n < r; ++n) {
      if (o[n]) {
        c[n] = rev[l[o[n] - 1]++] >>> 15 - o[n];
      }
    }
  }
  return c;
}
var flt = new u8(288);
for (var i = 0; i < 144; ++i) {
  flt[i] = 8;
}
for (var i = 144; i < 256; ++i) {
  flt[i] = 9;
}
for (var i = 256; i < 280; ++i) {
  flt[i] = 7;
}
for (var i = 280; i < 288; ++i) {
  flt[i] = 8;
}
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) {
  fdt[i] = 5;
}
var flrm = hMap(flt, 9, 1);
var fdrm = hMap(fdt, 5, 1);
function max(o) {
  var e = o[0];
  for (var t = 1; t < o.length; ++t) {
    if (o[t] > e) {
      e = o[t];
    }
  }
  return e;
}
function bits(o, e, t) {
  var r = e / 8 | 0;
  return (o[r] | o[r + 1] << 8) >> (e & 7) & t;
}
function bits16(o, e) {
  var t = e / 8 | 0;
  return (o[t] | o[t + 1] << 8 | o[t + 2] << 16) >> (e & 7);
}
function shft(o) {
  return (o / 8 | 0) + (o & 7 && 1);
}
function slc(o, e, t) {
  if (t == null || t > o.length) {
    t = o.length;
  }
  var r = new (o instanceof u16 ? u16 : o instanceof u32 ? u32 : u8)(t - e);
  r.set(o.subarray(e, t));
  return r;
}
function inflt(o, e, t) {
  var r = o.length;
  if (!r || t && !t.l && r < 5) {
    return e || new u8(0);
  }
  var n = !e || t;
  var a = !t || t.i;
  t ||= {};
  e ||= new u8(r * 3);
  function l(U) {
    var N = e.length;
    if (U > N) {
      var he = new u8(Math.max(N * 2, U));
      he.set(e);
      e = he;
    }
  }
  var c = t.f || 0;
  var u = t.p || 0;
  var f = t.b || 0;
  var p = t.l;
  var g = t.d;
  var v = t.m;
  var _ = t.n;
  var T = r * 8;
  do {
    if (!p) {
      t.f = c = bits(o, u, 1);
      var M = bits(o, u + 1, 3);
      u += 3;
      if (M) {
        if (M == 1) {
          p = flrm;
          g = fdrm;
          v = 9;
          _ = 5;
        } else if (M == 2) {
          var w = bits(o, u, 31) + 257;
          var R = bits(o, u + 10, 15) + 4;
          var E = w + bits(o, u + 5, 31) + 1;
          u += 14;
          var I = new u8(E);
          var F = new u8(19);
          for (var k = 0; k < R; ++k) {
            F[clim[k]] = bits(o, u + k * 3, 7);
          }
          u += R * 3;
          var L = max(F);
          var D = (1 << L) - 1;
          var ne = hMap(F, L, 1);
          for (var k = 0; k < E;) {
            var re = ne[bits(o, u, D)];
            u += re & 15;
            var S = re >>> 4;
            if (S < 16) {
              I[k++] = S;
            } else {
              var ce = 0;
              var z = 0;
              for (S == 16 ? (z = 3 + bits(o, u, 3), u += 2, ce = I[k - 1]) : S == 17 ? (z = 3 + bits(o, u, 7), u += 3) : S == 18 && (z = 11 + bits(o, u, 127), u += 7); z--;) {
                I[k++] = ce;
              }
            }
          }
          var j = I.subarray(0, w);
          var X = I.subarray(w);
          v = max(j);
          _ = max(X);
          p = hMap(j, v, 1);
          g = hMap(X, _, 1);
        } else {
          throw "invalid block type";
        }
      } else {
        var S = shft(u) + 4;
        var b = o[S - 4] | o[S - 3] << 8;
        var C = S + b;
        if (C > r) {
          if (a) {
            throw "unexpected EOF";
          }
          break;
        }
        if (n) {
          l(f + b);
        }
        e.set(o.subarray(S, C), f);
        t.b = f += b;
        t.p = u = C * 8;
        continue;
      }
      if (u > T) {
        if (a) {
          throw "unexpected EOF";
        }
        break;
      }
    }
    if (n) {
      l(f + 131072);
    }
    var Z = (1 << v) - 1;
    var q = (1 << _) - 1;
    for (var ue = u;; ue = u) {
      var ce = p[bits16(o, u) & Z];
      var oe = ce >>> 4;
      u += ce & 15;
      if (u > T) {
        if (a) {
          throw "unexpected EOF";
        }
        break;
      }
      if (!ce) {
        throw "invalid length/literal";
      }
      if (oe < 256) {
        e[f++] = oe;
      } else if (oe == 256) {
        ue = u;
        p = null;
        break;
      } else {
        var te = oe - 254;
        if (oe > 264) {
          var k = oe - 257;
          var le = fleb[k];
          te = bits(o, u, (1 << le) - 1) + fl[k];
          u += le;
        }
        var Te = g[bits16(o, u) & q];
        var K = Te >>> 4;
        if (!Te) {
          throw "invalid distance";
        }
        u += Te & 15;
        var X = fd[K];
        if (K > 3) {
          var le = fdeb[K];
          X += bits16(o, u) & (1 << le) - 1;
          u += le;
        }
        if (u > T) {
          if (a) {
            throw "unexpected EOF";
          }
          break;
        }
        if (n) {
          l(f + 131072);
        }
        for (var G = f + te; f < G; f += 4) {
          e[f] = e[f - X];
          e[f + 1] = e[f + 1 - X];
          e[f + 2] = e[f + 2 - X];
          e[f + 3] = e[f + 3 - X];
        }
        f = G;
      }
    }
    t.l = p;
    t.p = ue;
    t.b = f;
    if (p) {
      c = 1;
      t.m = v;
      t.d = g;
      t.n = _;
    }
  } while (!c);
  if (f == e.length) {
    return e;
  } else {
    return slc(e, 0, f);
  }
}
var et = new u8(0);
function zlv(o) {
  if ((o[0] & 15) != 8 || o[0] >>> 4 > 7 || (o[0] << 8 | o[1]) % 31) {
    throw "invalid zlib data";
  }
  if (o[1] & 32) {
    throw "invalid zlib data: preset dictionaries not supported";
  }
}
function unzlibSync(o, e) {
  return inflt((zlv(o), o.subarray(2, -4)), e);
}
var td = typeof TextDecoder !== "undefined" && new TextDecoder();
var tds = 0;
try {
  td.decode(et, {
    stream: true
  });
  tds = 1;
} catch (o) {}
class EXRLoader extends DataTextureLoader {
  constructor(e) {
    super(e);
    this.type = HalfFloatType;
  }
  parse(e) {
    const L = Math.pow(2.7182818, 2.2);
    function D(P, B) {
      let Q = 0;
      for (let H = 0; H < 65536; ++H) {
        if (H == 0 || P[H >> 3] & 1 << (H & 7)) {
          B[Q++] = H;
        }
      }
      const A = Q - 1;
      while (Q < 65536) {
        B[Q++] = 0;
      }
      return A;
    }
    function ne(P) {
      for (let B = 0; B < 16384; B++) {
        P[B] = {};
        P[B].len = 0;
        P[B].lit = 0;
        P[B].p = null;
      }
    }
    const re = {
      l: 0,
      c: 0,
      lc: 0
    };
    function ce(P, B, Q, A, H) {
      while (Q < P) {
        B = B << 8 | ot(A, H);
        Q += 8;
      }
      Q -= P;
      re.l = B >> Q & (1 << P) - 1;
      re.c = B;
      re.lc = Q;
    }
    const z = new Array(59);
    function j(P) {
      for (let Q = 0; Q <= 58; ++Q) {
        z[Q] = 0;
      }
      for (let Q = 0; Q < 65537; ++Q) {
        z[P[Q]] += 1;
      }
      let B = 0;
      for (let Q = 58; Q > 0; --Q) {
        const A = B + z[Q] >> 1;
        z[Q] = B;
        B = A;
      }
      for (let Q = 0; Q < 65537; ++Q) {
        const A = P[Q];
        if (A > 0) {
          P[Q] = A | z[A]++ << 6;
        }
      }
    }
    function X(P, B, Q, A, H, V) {
      const J = B;
      let ie = 0;
      let ge = 0;
      for (; A <= H; A++) {
        if (J.value - B.value > Q) {
          return false;
        }
        ce(6, ie, ge, P, J);
        const pe = re.l;
        ie = re.c;
        ge = re.lc;
        V[A] = pe;
        if (pe == 63) {
          if (J.value - B.value > Q) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          ce(8, ie, ge, P, J);
          let ye = re.l + 6;
          ie = re.c;
          ge = re.lc;
          if (A + ye > H + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (ye--) {
            V[A++] = 0;
          }
          A--;
        } else if (pe >= 59) {
          let ye = pe - 59 + 2;
          if (A + ye > H + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (ye--) {
            V[A++] = 0;
          }
          A--;
        }
      }
      j(V);
    }
    function Z(P) {
      return P & 63;
    }
    function q(P) {
      return P >> 6;
    }
    function ue(P, B, Q, A) {
      for (; B <= Q; B++) {
        const H = q(P[B]);
        const V = Z(P[B]);
        if (H >> V) {
          throw new Error("Invalid table entry");
        }
        if (V > 14) {
          const J = A[H >> V - 14];
          if (J.len) {
            throw new Error("Invalid table entry");
          }
          J.lit++;
          if (J.p) {
            const ie = J.p;
            J.p = new Array(J.lit);
            for (let ge = 0; ge < J.lit - 1; ++ge) {
              J.p[ge] = ie[ge];
            }
          } else {
            J.p = new Array(1);
          }
          J.p[J.lit - 1] = B;
        } else if (V) {
          let J = 0;
          for (let ie = 1 << 14 - V; ie > 0; ie--) {
            const ge = A[(H << 14 - V) + J];
            if (ge.len || ge.p) {
              throw new Error("Invalid table entry");
            }
            ge.len = V;
            ge.lit = B;
            J++;
          }
        }
      }
      return true;
    }
    const oe = {
      c: 0,
      lc: 0
    };
    function te(P, B, Q, A) {
      P = P << 8 | ot(Q, A);
      B += 8;
      oe.c = P;
      oe.lc = B;
    }
    const le = {
      c: 0,
      lc: 0
    };
    function Te(P, B, Q, A, H, V, J, ie, ge) {
      if (P == B) {
        if (A < 8) {
          te(Q, A, H, V);
          Q = oe.c;
          A = oe.lc;
        }
        A -= 8;
        let pe = Q >> A;
        pe = new Uint8Array([pe])[0];
        if (ie.value + pe > ge) {
          return false;
        }
        const ye = J[ie.value - 1];
        while (pe-- > 0) {
          J[ie.value++] = ye;
        }
      } else if (ie.value < ge) {
        J[ie.value++] = P;
      } else {
        return false;
      }
      le.c = Q;
      le.lc = A;
    }
    function K(P) {
      return P & 65535;
    }
    function G(P) {
      const B = K(P);
      if (B > 32767) {
        return B - 65536;
      } else {
        return B;
      }
    }
    const U = {
      a: 0,
      b: 0
    };
    function N(P, B) {
      const Q = G(P);
      const H = G(B);
      const V = Q + (H & 1) + (H >> 1);
      const J = V;
      const ie = V - H;
      U.a = J;
      U.b = ie;
    }
    function he(P, B) {
      const Q = K(P);
      const A = K(B);
      const H = Q - (A >> 1) & 65535;
      const V = A + H - 32768 & 65535;
      U.a = V;
      U.b = H;
    }
    function ve(P, B, Q, A, H, V, J) {
      const ie = J < 16384;
      const ge = Q > H ? H : Q;
      let pe = 1;
      let ye;
      let Ce;
      while (pe <= ge) {
        pe <<= 1;
      }
      pe >>= 1;
      ye = pe;
      pe >>= 1;
      while (pe >= 1) {
        Ce = 0;
        const Ae = Ce + V * (H - ye);
        const De = V * pe;
        const He = V * ye;
        const Ve = A * pe;
        const $e = A * ye;
        let Ze;
        let ct;
        let it;
        let Qe;
        for (; Ce <= Ae; Ce += He) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve;
            const _t = ut + De;
            const ft = _t + Ve;
            if (ie) {
              N(P[ut + B], P[_t + B]);
              Ze = U.a;
              it = U.b;
              N(P[dt + B], P[ft + B]);
              ct = U.a;
              Qe = U.b;
              N(Ze, ct);
              P[ut + B] = U.a;
              P[dt + B] = U.b;
              N(it, Qe);
              P[_t + B] = U.a;
              P[ft + B] = U.b;
            } else {
              he(P[ut + B], P[_t + B]);
              Ze = U.a;
              it = U.b;
              he(P[dt + B], P[ft + B]);
              ct = U.a;
              Qe = U.b;
              he(Ze, ct);
              P[ut + B] = U.a;
              P[dt + B] = U.b;
              he(it, Qe);
              P[_t + B] = U.a;
              P[ft + B] = U.b;
            }
          }
          if (Q & pe) {
            const dt = ut + De;
            if (ie) {
              N(P[ut + B], P[dt + B]);
            } else {
              he(P[ut + B], P[dt + B]);
            }
            Ze = U.a;
            P[dt + B] = U.b;
            P[ut + B] = Ze;
          }
        }
        if (H & pe) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve;
            if (ie) {
              N(P[ut + B], P[dt + B]);
            } else {
              he(P[ut + B], P[dt + B]);
            }
            Ze = U.a;
            P[dt + B] = U.b;
            P[ut + B] = Ze;
          }
        }
        ye = pe;
        pe >>= 1;
      }
      return Ce;
    }
    function de(P, B, Q, A, H, V, J, ie, ge) {
      let pe = 0;
      let ye = 0;
      const Ce = J;
      const Ae = Math.trunc(A.value + (H + 7) / 8);
      while (A.value < Ae) {
        te(pe, ye, Q, A);
        pe = oe.c;
        ye = oe.lc;
        while (ye >= 14) {
          const He = pe >> ye - 14 & 16383;
          const Ve = B[He];
          if (Ve.len) {
            ye -= Ve.len;
            Te(Ve.lit, V, pe, ye, Q, A, ie, ge, Ce);
            pe = le.c;
            ye = le.lc;
          } else {
            if (!Ve.p) {
              throw new Error("hufDecode issues");
            }
            let $e;
            for ($e = 0; $e < Ve.lit; $e++) {
              const Ze = Z(P[Ve.p[$e]]);
              while (ye < Ze && A.value < Ae) {
                te(pe, ye, Q, A);
                pe = oe.c;
                ye = oe.lc;
              }
              if (ye >= Ze && q(P[Ve.p[$e]]) == (pe >> ye - Ze & (1 << Ze) - 1)) {
                ye -= Ze;
                Te(Ve.p[$e], V, pe, ye, Q, A, ie, ge, Ce);
                pe = le.c;
                ye = le.lc;
                break;
              }
            }
            if ($e == Ve.lit) {
              throw new Error("hufDecode issues");
            }
          }
        }
      }
      const De = 8 - H & 7;
      pe >>= De;
      ye -= De;
      while (ye > 0) {
        const He = B[pe << 14 - ye & 16383];
        if (He.len) {
          ye -= He.len;
          Te(He.lit, V, pe, ye, Q, A, ie, ge, Ce);
          pe = le.c;
          ye = le.lc;
        } else {
          throw new Error("hufDecode issues");
        }
      }
      return true;
    }
    function xe(P, B, Q, A, H, V) {
      const J = {
        value: 0
      };
      const ie = Q.value;
      const ge = Re(B, Q);
      const pe = Re(B, Q);
      Q.value += 4;
      const ye = Re(B, Q);
      Q.value += 4;
      if (ge < 0 || ge >= 65537 || pe < 0 || pe >= 65537) {
        throw new Error("Something wrong with HUF_ENCSIZE");
      }
      const Ce = new Array(65537);
      const Ae = new Array(16384);
      ne(Ae);
      const De = A - (Q.value - ie);
      X(P, Q, De, ge, pe, Ce);
      if (ye > (A - (Q.value - ie)) * 8) {
        throw new Error("Something wrong with hufUncompress");
      }
      ue(Ce, ge, pe, Ae);
      de(Ce, Ae, P, Q, ye, pe, V, H, J);
    }
    function ee(P, B, Q) {
      for (let A = 0; A < Q; ++A) {
        B[A] = P[B[A]];
      }
    }
    function Ue(P) {
      for (let B = 1; B < P.length; B++) {
        const Q = P[B - 1] + P[B] - 128;
        P[B] = Q;
      }
    }
    function fe(P, B) {
      let Q = 0;
      let A = Math.floor((P.length + 1) / 2);
      let H = 0;
      const V = P.length - 1;
      while (!(H > V) && !(B[H++] = P[Q++], H > V)) {
        B[H++] = P[A++];
      }
    }
    function Se(P) {
      let B = P.byteLength;
      const Q = new Array();
      let A = 0;
      const H = new DataView(P);
      while (B > 0) {
        const V = H.getInt8(A++);
        if (V < 0) {
          const J = -V;
          B -= J + 1;
          for (let ie = 0; ie < J; ie++) {
            Q.push(H.getUint8(A++));
          }
        } else {
          const J = V;
          B -= 2;
          const ie = H.getUint8(A++);
          for (let ge = 0; ge < J + 1; ge++) {
            Q.push(ie);
          }
        }
      }
      return Q;
    }
    function Me(P, B, Q, A, H, V) {
      let J = new DataView(V.buffer);
      const ie = Q[P.idx[0]].width;
      const ge = Q[P.idx[0]].height;
      const pe = 3;
      const ye = Math.floor(ie / 8);
      const Ce = Math.ceil(ie / 8);
      const Ae = Math.ceil(ge / 8);
      const De = ie - (Ce - 1) * 8;
      const He = ge - (Ae - 1) * 8;
      const Ve = {
        value: 0
      };
      const $e = new Array(pe);
      const Ze = new Array(pe);
      const ct = new Array(pe);
      const it = new Array(pe);
      const Qe = new Array(pe);
      for (let Ke = 0; Ke < pe; ++Ke) {
        Qe[Ke] = B[P.idx[Ke]];
        $e[Ke] = Ke < 1 ? 0 : $e[Ke - 1] + Ce * Ae;
        Ze[Ke] = new Float32Array(64);
        ct[Ke] = new Uint16Array(64);
        it[Ke] = new Uint16Array(Ce * 64);
      }
      for (let Ke = 0; Ke < Ae; ++Ke) {
        let dt = 8;
        if (Ke == Ae - 1) {
          dt = He;
        }
        let _t = 8;
        for (let lt = 0; lt < Ce; ++lt) {
          if (lt == Ce - 1) {
            _t = De;
          }
          for (let rt = 0; rt < pe; ++rt) {
            ct[rt].fill(0);
            ct[rt][0] = H[$e[rt]++];
            Be(Ve, A, ct[rt]);
            se(ct[rt], Ze[rt]);
            $(Ze[rt]);
          }
          Oe(Ze);
          for (let rt = 0; rt < pe; ++rt) {
            Ye(Ze[rt], it[rt], lt * 64);
          }
        }
        let ft = 0;
        for (let lt = 0; lt < pe; ++lt) {
          const rt = Q[P.idx[lt]].type;
          for (let vt = Ke * 8; vt < Ke * 8 + dt; ++vt) {
            ft = Qe[lt][vt];
            for (let bt = 0; bt < ye; ++bt) {
              const mt = bt * 64 + (vt & 7) * 8;
              J.setUint16(ft + rt * 0, it[lt][mt + 0], true);
              J.setUint16(ft + rt * 2, it[lt][mt + 1], true);
              J.setUint16(ft + rt * 4, it[lt][mt + 2], true);
              J.setUint16(ft + rt * 6, it[lt][mt + 3], true);
              J.setUint16(ft + rt * 8, it[lt][mt + 4], true);
              J.setUint16(ft + rt * 10, it[lt][mt + 5], true);
              J.setUint16(ft + rt * 12, it[lt][mt + 6], true);
              J.setUint16(ft + rt * 14, it[lt][mt + 7], true);
              ft += rt * 16;
            }
          }
          if (ye != Ce) {
            for (let vt = Ke * 8; vt < Ke * 8 + dt; ++vt) {
              const bt = Qe[lt][vt] + ye * 8 * 2 * rt;
              const mt = ye * 64 + (vt & 7) * 8;
              for (let wt = 0; wt < _t; ++wt) {
                J.setUint16(bt + wt * 2 * rt, it[lt][mt + wt], true);
              }
            }
          }
        }
      }
      const ut = new Uint16Array(ie);
      J = new DataView(V.buffer);
      for (let Ke = 0; Ke < pe; ++Ke) {
        Q[P.idx[Ke]].decoded = true;
        const dt = Q[P.idx[Ke]].type;
        if (Q[Ke].type == 2) {
          for (let _t = 0; _t < ge; ++_t) {
            const ft = Qe[Ke][_t];
            for (let lt = 0; lt < ie; ++lt) {
              ut[lt] = J.getUint16(ft + lt * 2 * dt, true);
            }
            for (let lt = 0; lt < ie; ++lt) {
              J.setFloat32(ft + lt * 2 * dt, Pe(ut[lt]), true);
            }
          }
        }
      }
    }
    function Be(P, B, Q) {
      let A;
      let H = 1;
      while (H < 64) {
        A = B[P.value];
        if (A == 65280) {
          H = 64;
        } else if (A >> 8 == 255) {
          H += A & 255;
        } else {
          Q[H] = A;
          H++;
        }
        P.value++;
      }
    }
    function se(P, B) {
      B[0] = Pe(P[0]);
      B[1] = Pe(P[1]);
      B[2] = Pe(P[5]);
      B[3] = Pe(P[6]);
      B[4] = Pe(P[14]);
      B[5] = Pe(P[15]);
      B[6] = Pe(P[27]);
      B[7] = Pe(P[28]);
      B[8] = Pe(P[2]);
      B[9] = Pe(P[4]);
      B[10] = Pe(P[7]);
      B[11] = Pe(P[13]);
      B[12] = Pe(P[16]);
      B[13] = Pe(P[26]);
      B[14] = Pe(P[29]);
      B[15] = Pe(P[42]);
      B[16] = Pe(P[3]);
      B[17] = Pe(P[8]);
      B[18] = Pe(P[12]);
      B[19] = Pe(P[17]);
      B[20] = Pe(P[25]);
      B[21] = Pe(P[30]);
      B[22] = Pe(P[41]);
      B[23] = Pe(P[43]);
      B[24] = Pe(P[9]);
      B[25] = Pe(P[11]);
      B[26] = Pe(P[18]);
      B[27] = Pe(P[24]);
      B[28] = Pe(P[31]);
      B[29] = Pe(P[40]);
      B[30] = Pe(P[44]);
      B[31] = Pe(P[53]);
      B[32] = Pe(P[10]);
      B[33] = Pe(P[19]);
      B[34] = Pe(P[23]);
      B[35] = Pe(P[32]);
      B[36] = Pe(P[39]);
      B[37] = Pe(P[45]);
      B[38] = Pe(P[52]);
      B[39] = Pe(P[54]);
      B[40] = Pe(P[20]);
      B[41] = Pe(P[22]);
      B[42] = Pe(P[33]);
      B[43] = Pe(P[38]);
      B[44] = Pe(P[46]);
      B[45] = Pe(P[51]);
      B[46] = Pe(P[55]);
      B[47] = Pe(P[60]);
      B[48] = Pe(P[21]);
      B[49] = Pe(P[34]);
      B[50] = Pe(P[37]);
      B[51] = Pe(P[47]);
      B[52] = Pe(P[50]);
      B[53] = Pe(P[56]);
      B[54] = Pe(P[59]);
      B[55] = Pe(P[61]);
      B[56] = Pe(P[35]);
      B[57] = Pe(P[36]);
      B[58] = Pe(P[48]);
      B[59] = Pe(P[49]);
      B[60] = Pe(P[57]);
      B[61] = Pe(P[58]);
      B[62] = Pe(P[62]);
      B[63] = Pe(P[63]);
    }
    function $(P) {
      const B = Math.cos(0.7853975) * 0.5;
      const Q = Math.cos(3.14159 / 16) * 0.5;
      const A = Math.cos(3.14159 / 8) * 0.5;
      const H = Math.cos(9.424769999999999 / 16) * 0.5;
      const V = Math.cos(15.70795 / 16) * 0.5;
      const J = Math.cos(9.424769999999999 / 8) * 0.5;
      const ie = Math.cos(21.99113 / 16) * 0.5;
      const ge = new Array(4);
      const pe = new Array(4);
      const ye = new Array(4);
      const Ce = new Array(4);
      for (let Ae = 0; Ae < 8; ++Ae) {
        const De = Ae * 8;
        ge[0] = A * P[De + 2];
        ge[1] = J * P[De + 2];
        ge[2] = A * P[De + 6];
        ge[3] = J * P[De + 6];
        pe[0] = Q * P[De + 1] + H * P[De + 3] + V * P[De + 5] + ie * P[De + 7];
        pe[1] = H * P[De + 1] - ie * P[De + 3] - Q * P[De + 5] - V * P[De + 7];
        pe[2] = V * P[De + 1] - Q * P[De + 3] + ie * P[De + 5] + H * P[De + 7];
        pe[3] = ie * P[De + 1] - V * P[De + 3] + H * P[De + 5] - Q * P[De + 7];
        ye[0] = B * (P[De + 0] + P[De + 4]);
        ye[3] = B * (P[De + 0] - P[De + 4]);
        ye[1] = ge[0] + ge[3];
        ye[2] = ge[1] - ge[2];
        Ce[0] = ye[0] + ye[1];
        Ce[1] = ye[3] + ye[2];
        Ce[2] = ye[3] - ye[2];
        Ce[3] = ye[0] - ye[1];
        P[De + 0] = Ce[0] + pe[0];
        P[De + 1] = Ce[1] + pe[1];
        P[De + 2] = Ce[2] + pe[2];
        P[De + 3] = Ce[3] + pe[3];
        P[De + 4] = Ce[3] - pe[3];
        P[De + 5] = Ce[2] - pe[2];
        P[De + 6] = Ce[1] - pe[1];
        P[De + 7] = Ce[0] - pe[0];
      }
      for (let Ae = 0; Ae < 8; ++Ae) {
        ge[0] = A * P[16 + Ae];
        ge[1] = J * P[16 + Ae];
        ge[2] = A * P[48 + Ae];
        ge[3] = J * P[48 + Ae];
        pe[0] = Q * P[8 + Ae] + H * P[24 + Ae] + V * P[40 + Ae] + ie * P[56 + Ae];
        pe[1] = H * P[8 + Ae] - ie * P[24 + Ae] - Q * P[40 + Ae] - V * P[56 + Ae];
        pe[2] = V * P[8 + Ae] - Q * P[24 + Ae] + ie * P[40 + Ae] + H * P[56 + Ae];
        pe[3] = ie * P[8 + Ae] - V * P[24 + Ae] + H * P[40 + Ae] - Q * P[56 + Ae];
        ye[0] = B * (P[Ae] + P[32 + Ae]);
        ye[3] = B * (P[Ae] - P[32 + Ae]);
        ye[1] = ge[0] + ge[3];
        ye[2] = ge[1] - ge[2];
        Ce[0] = ye[0] + ye[1];
        Ce[1] = ye[3] + ye[2];
        Ce[2] = ye[3] - ye[2];
        Ce[3] = ye[0] - ye[1];
        P[0 + Ae] = Ce[0] + pe[0];
        P[8 + Ae] = Ce[1] + pe[1];
        P[16 + Ae] = Ce[2] + pe[2];
        P[24 + Ae] = Ce[3] + pe[3];
        P[32 + Ae] = Ce[3] - pe[3];
        P[40 + Ae] = Ce[2] - pe[2];
        P[48 + Ae] = Ce[1] - pe[1];
        P[56 + Ae] = Ce[0] - pe[0];
      }
    }
    function Oe(P) {
      for (let B = 0; B < 64; ++B) {
        const Q = P[0][B];
        const A = P[1][B];
        const H = P[2][B];
        P[0][B] = Q + H * 1.5747;
        P[1][B] = Q - A * 0.1873 - H * 0.4682;
        P[2][B] = Q + A * 1.8556;
      }
    }
    function Ye(P, B, Q) {
      for (let A = 0; A < 64; ++A) {
        B[Q + A] = DataUtils.toHalfFloat(st(P[A]));
      }
    }
    function st(P) {
      if (P <= 1) {
        return Math.sign(P) * Math.pow(Math.abs(P), 2.2);
      } else {
        return Math.sign(P) * Math.pow(L, Math.abs(P) - 1);
      }
    }
    function W(P) {
      return new DataView(P.array.buffer, P.offset.value, P.size);
    }
    function O(P) {
      const B = P.viewer.buffer.slice(P.offset.value, P.offset.value + P.size);
      const Q = new Uint8Array(Se(B));
      const A = new Uint8Array(Q.length);
      Ue(Q);
      fe(Q, A);
      return new DataView(A.buffer);
    }
    function me(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size);
      const Q = unzlibSync(B);
      const A = new Uint8Array(Q.length);
      Ue(Q);
      fe(Q, A);
      return new DataView(A.buffer);
    }
    function Ie(P) {
      const B = P.viewer;
      const Q = {
        value: P.offset.value
      };
      const A = new Uint16Array(P.width * P.scanlineBlockSize * (P.channels * P.type));
      const H = new Uint8Array(8192);
      let V = 0;
      const J = new Array(P.channels);
      for (let He = 0; He < P.channels; He++) {
        J[He] = {};
        J[He].start = V;
        J[He].end = J[He].start;
        J[He].nx = P.width;
        J[He].ny = P.lines;
        J[He].size = P.type;
        V += J[He].nx * J[He].ny * J[He].size;
      }
      const ie = ae(B, Q);
      const ge = ae(B, Q);
      if (ge >= 8192) {
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      }
      if (ie <= ge) {
        for (let He = 0; He < ge - ie + 1; He++) {
          H[He + ie] = je(B, Q);
        }
      }
      const pe = new Uint16Array(65536);
      const ye = D(H, pe);
      const Ce = Re(B, Q);
      xe(P.array, B, Q, Ce, A, V);
      for (let He = 0; He < P.channels; ++He) {
        const Ve = J[He];
        for (let $e = 0; $e < J[He].size; ++$e) {
          ve(A, Ve.start + $e, Ve.nx, Ve.size, Ve.ny, Ve.nx * Ve.size, ye);
        }
      }
      ee(pe, A, V);
      let Ae = 0;
      const De = new Uint8Array(A.buffer.byteLength);
      for (let He = 0; He < P.lines; He++) {
        for (let Ve = 0; Ve < P.channels; Ve++) {
          const $e = J[Ve];
          const Ze = $e.nx * $e.size;
          const ct = new Uint8Array(A.buffer, $e.end * 2, Ze * 2);
          De.set(ct, Ae);
          Ae += Ze * 2;
          $e.end += Ze;
        }
      }
      return new DataView(De.buffer);
    }
    function Le(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size);
      const Q = unzlibSync(B);
      const A = P.lines * P.channels * P.width;
      const H = P.type == 1 ? new Uint16Array(A) : new Uint32Array(A);
      let V = 0;
      let J = 0;
      const ie = new Array(4);
      for (let ge = 0; ge < P.lines; ge++) {
        for (let pe = 0; pe < P.channels; pe++) {
          let ye = 0;
          switch (P.type) {
            case 1:
              ie[0] = V;
              ie[1] = ie[0] + P.width;
              V = ie[1] + P.width;
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae = Q[ie[0]++] << 8 | Q[ie[1]++];
                ye += Ae;
                H[J] = ye;
                J++;
              }
              break;
            case 2:
              ie[0] = V;
              ie[1] = ie[0] + P.width;
              ie[2] = ie[1] + P.width;
              V = ie[2] + P.width;
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae = Q[ie[0]++] << 24 | Q[ie[1]++] << 16 | Q[ie[2]++] << 8;
                ye += Ae;
                H[J] = ye;
                J++;
              }
              break;
          }
        }
      }
      return new DataView(H.buffer);
    }
    function Y(P) {
      const B = P.viewer;
      const Q = {
        value: P.offset.value
      };
      const A = new Uint8Array(P.width * P.lines * (P.channels * P.type * 2));
      const H = {
        version: We(B, Q),
        unknownUncompressedSize: We(B, Q),
        unknownCompressedSize: We(B, Q),
        acCompressedSize: We(B, Q),
        dcCompressedSize: We(B, Q),
        rleCompressedSize: We(B, Q),
        rleUncompressedSize: We(B, Q),
        rleRawSize: We(B, Q),
        totalAcUncompressedCount: We(B, Q),
        totalDcUncompressedCount: We(B, Q),
        acCompression: We(B, Q)
      };
      if (H.version < 2) {
        throw new Error("EXRLoader.parse: " + Tt.compression + " version " + H.version + " is unsupported");
      }
      const V = new Array();
      let J = ae(B, Q) - 2;
      while (J > 0) {
        const Ve = we(B.buffer, Q);
        const $e = je(B, Q);
        const Ze = $e >> 2 & 3;
        const ct = ($e >> 4) - 1;
        const it = new Int8Array([ct])[0];
        const Qe = je(B, Q);
        V.push({
          name: Ve,
          index: it,
          type: Qe,
          compression: Ze
        });
        J -= Ve.length + 3;
      }
      const ie = Tt.channels;
      const ge = new Array(P.channels);
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = ge[Ve] = {};
        const Ze = ie[Ve];
        $e.name = Ze.name;
        $e.compression = 0;
        $e.decoded = false;
        $e.type = Ze.pixelType;
        $e.pLinear = Ze.pLinear;
        $e.width = P.width;
        $e.height = P.lines;
      }
      const pe = {
        idx: new Array(3)
      };
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = ge[Ve];
        for (let Ze = 0; Ze < V.length; ++Ze) {
          const ct = V[Ze];
          if ($e.name == ct.name) {
            $e.compression = ct.compression;
            if (ct.index >= 0) {
              pe.idx[ct.index] = Ve;
            }
            $e.offset = Ve;
          }
        }
      }
      let ye;
      let Ce;
      let Ae;
      if (H.acCompressedSize > 0) {
        switch (H.acCompression) {
          case 0:
            ye = new Uint16Array(H.totalAcUncompressedCount);
            xe(P.array, B, Q, H.acCompressedSize, ye, H.totalAcUncompressedCount);
            break;
          case 1:
            const Ve = P.array.slice(Q.value, Q.value + H.totalAcUncompressedCount);
            const $e = unzlibSync(Ve);
            ye = new Uint16Array($e.buffer);
            Q.value += H.totalAcUncompressedCount;
            break;
        }
      }
      if (H.dcCompressedSize > 0) {
        const Ve = {
          array: P.array,
          offset: Q,
          size: H.dcCompressedSize
        };
        Ce = new Uint16Array(me(Ve).buffer);
        Q.value += H.dcCompressedSize;
      }
      if (H.rleRawSize > 0) {
        const Ve = P.array.slice(Q.value, Q.value + H.rleCompressedSize);
        const $e = unzlibSync(Ve);
        Ae = Se($e.buffer);
        Q.value += H.rleCompressedSize;
      }
      let De = 0;
      const He = new Array(ge.length);
      for (let Ve = 0; Ve < He.length; ++Ve) {
        He[Ve] = new Array();
      }
      for (let Ve = 0; Ve < P.lines; ++Ve) {
        for (let $e = 0; $e < ge.length; ++$e) {
          He[$e].push(De);
          De += ge[$e].width * P.type * 2;
        }
      }
      Me(pe, He, ge, ye, Ce, A);
      for (let Ve = 0; Ve < ge.length; ++Ve) {
        const $e = ge[Ve];
        if (!$e.decoded) {
          switch ($e.compression) {
            case 2:
              let Ze = 0;
              let ct = 0;
              for (let it = 0; it < P.lines; ++it) {
                let Qe = He[Ve][Ze];
                for (let ut = 0; ut < $e.width; ++ut) {
                  for (let Ke = 0; Ke < $e.type * 2; ++Ke) {
                    A[Qe++] = Ae[ct + Ke * $e.width * $e.height];
                  }
                  ct++;
                }
                Ze++;
              }
              break;
            case 1:
            default:
              throw new Error("EXRLoader.parse: unsupported channel compression");
          }
        }
      }
      return new DataView(A.buffer);
    }
    function we(P, B) {
      const Q = new Uint8Array(P);
      let A = 0;
      while (Q[B.value + A] != 0) {
        A += 1;
      }
      const H = new TextDecoder().decode(Q.slice(B.value, B.value + A));
      B.value = B.value + A + 1;
      return H;
    }
    function Ee(P, B, Q) {
      const A = new TextDecoder().decode(new Uint8Array(P).slice(B.value, B.value + Q));
      B.value = B.value + Q;
      return A;
    }
    function Fe(P, B) {
      const Q = tt(P, B);
      const A = Re(P, B);
      return [Q, A];
    }
    function Xe(P, B) {
      const Q = Re(P, B);
      const A = Re(P, B);
      return [Q, A];
    }
    function tt(P, B) {
      const Q = P.getInt32(B.value, true);
      B.value = B.value + 4;
      return Q;
    }
    function Re(P, B) {
      const Q = P.getUint32(B.value, true);
      B.value = B.value + 4;
      return Q;
    }
    function ot(P, B) {
      const Q = P[B.value];
      B.value = B.value + 1;
      return Q;
    }
    function je(P, B) {
      const Q = P.getUint8(B.value);
      B.value = B.value + 1;
      return Q;
    }
    const We = function (P, B) {
      let Q;
      if ("getBigInt64" in DataView.prototype) {
        Q = Number(P.getBigInt64(B.value, true));
      } else {
        Q = P.getUint32(B.value + 4, true) + Number(P.getUint32(B.value, true) << 0);
      }
      B.value += 8;
      return Q;
    };
    function Ge(P, B) {
      const Q = P.getFloat32(B.value, true);
      B.value += 4;
      return Q;
    }
    function qe(P, B) {
      return DataUtils.toHalfFloat(Ge(P, B));
    }
    function Pe(P) {
      const B = (P & 31744) >> 10;
      const Q = P & 1023;
      return (P >> 15 ? -1 : 1) * (B ? B === 31 ? Q ? NaN : Infinity : Math.pow(2, B - 15) * (1 + Q / 1024) : Q / 1024 * 0.00006103515625);
    }
    function ae(P, B) {
      const Q = P.getUint16(B.value, true);
      B.value += 2;
      return Q;
    }
    function ke(P, B) {
      return Pe(ae(P, B));
    }
    function Ne(P, B, Q, A) {
      const H = Q.value;
      const V = [];
      while (Q.value < H + A - 1) {
        const J = we(B, Q);
        const ie = tt(P, Q);
        const ge = je(P, Q);
        Q.value += 3;
        const pe = tt(P, Q);
        const ye = tt(P, Q);
        V.push({
          name: J,
          pixelType: ie,
          pLinear: ge,
          xSampling: pe,
          ySampling: ye
        });
      }
      Q.value += 1;
      return V;
    }
    function be(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      const H = Ge(P, B);
      const V = Ge(P, B);
      const J = Ge(P, B);
      const ie = Ge(P, B);
      const ge = Ge(P, B);
      const pe = Ge(P, B);
      return {
        redX: Q,
        redY: A,
        greenX: H,
        greenY: V,
        blueX: J,
        blueY: ie,
        whiteX: ge,
        whiteY: pe
      };
    }
    function ze(P, B) {
      const Q = ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"];
      const A = je(P, B);
      return Q[A];
    }
    function Je(P, B) {
      const Q = Re(P, B);
      const A = Re(P, B);
      const H = Re(P, B);
      const V = Re(P, B);
      return {
        xMin: Q,
        yMin: A,
        xMax: H,
        yMax: V
      };
    }
    function at(P, B) {
      const Q = ["INCREASING_Y"];
      const A = je(P, B);
      return Q[A];
    }
    function pt(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      return [Q, A];
    }
    function xt(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      const H = Ge(P, B);
      return [Q, A, H];
    }
    function ht(P, B, Q, A, H) {
      if (A === "string" || A === "stringvector" || A === "iccProfile") {
        return Ee(B, Q, H);
      }
      if (A === "chlist") {
        return Ne(P, B, Q, H);
      }
      if (A === "chromaticities") {
        return be(P, Q);
      }
      if (A === "compression") {
        return ze(P, Q);
      }
      if (A === "box2i") {
        return Je(P, Q);
      }
      if (A === "lineOrder") {
        return at(P, Q);
      }
      if (A === "float") {
        return Ge(P, Q);
      }
      if (A === "v2f") {
        return pt(P, Q);
      }
      if (A === "v3f") {
        return xt(P, Q);
      }
      if (A === "int") {
        return tt(P, Q);
      }
      if (A === "rational") {
        return Fe(P, Q);
      }
      if (A === "timecode") {
        return Xe(P, Q);
      }
      if (A === "preview") {
        Q.value += H;
        return "skipped";
      }
      Q.value += H;
    }
    function gt(P, B, Q) {
      const A = {};
      if (P.getUint32(0, true) != 20000630) {
        throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
      }
      A.version = P.getUint8(4);
      const H = P.getUint8(5);
      A.spec = {
        singleTile: !!(H & 2),
        longName: !!(H & 4),
        deepFormat: !!(H & 8),
        multiPart: !!(H & 16)
      };
      Q.value = 8;
      let V = true;
      while (V) {
        const J = we(B, Q);
        if (J == 0) {
          V = false;
        } else {
          const ie = we(B, Q);
          const ge = Re(P, Q);
          const pe = ht(P, B, Q, ie, ge);
          if (pe === undefined) {
            console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${ie}'.`);
          } else {
            A[J] = pe;
          }
        }
      }
      if (H & -5) {
        console.error("THREE.EXRHeader:", A);
        throw new Error("THREE.EXRLoader: Provided file is currently unsupported.");
      }
      return A;
    }
    function yt(P, B, Q, A, H) {
      const V = {
        size: 0,
        viewer: B,
        array: Q,
        offset: A,
        width: P.dataWindow.xMax - P.dataWindow.xMin + 1,
        height: P.dataWindow.yMax - P.dataWindow.yMin + 1,
        channels: P.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: P.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        colorSpace: LinearSRGBColorSpace
      };
      switch (P.compression) {
        case "NO_COMPRESSION":
          V.lines = 1;
          V.uncompress = W;
          break;
        case "RLE_COMPRESSION":
          V.lines = 1;
          V.uncompress = O;
          break;
        case "ZIPS_COMPRESSION":
          V.lines = 1;
          V.uncompress = me;
          break;
        case "ZIP_COMPRESSION":
          V.lines = 16;
          V.uncompress = me;
          break;
        case "PIZ_COMPRESSION":
          V.lines = 32;
          V.uncompress = Ie;
          break;
        case "PXR24_COMPRESSION":
          V.lines = 16;
          V.uncompress = Le;
          break;
        case "DWAA_COMPRESSION":
          V.lines = 32;
          V.uncompress = Y;
          break;
        case "DWAB_COMPRESSION":
          V.lines = 256;
          V.uncompress = Y;
          break;
        default:
          throw new Error("EXRLoader.parse: " + P.compression + " is unsupported");
      }
      V.scanlineBlockSize = V.lines;
      if (V.type == 1) {
        switch (H) {
          case FloatType:
            V.getter = ke;
            V.inputSize = 2;
            break;
          case HalfFloatType:
            V.getter = ae;
            V.inputSize = 2;
            break;
        }
      } else if (V.type == 2) {
        switch (H) {
          case FloatType:
            V.getter = Ge;
            V.inputSize = 4;
            break;
          case HalfFloatType:
            V.getter = qe;
            V.inputSize = 4;
        }
      } else {
        throw new Error("EXRLoader.parse: unsupported pixelType " + V.type + " for " + P.compression + ".");
      }
      V.blockCount = (P.dataWindow.yMax + 1) / V.scanlineBlockSize;
      for (let ie = 0; ie < V.blockCount; ie++) {
        We(B, A);
      }
      V.outputChannels = V.channels == 3 ? 4 : V.channels;
      const J = V.width * V.height * V.outputChannels;
      switch (H) {
        case FloatType:
          V.byteArray = new Float32Array(J);
          if (V.channels < V.outputChannels) {
            V.byteArray.fill(1, 0, J);
          }
          break;
        case HalfFloatType:
          V.byteArray = new Uint16Array(J);
          if (V.channels < V.outputChannels) {
            V.byteArray.fill(15360, 0, J);
          }
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", H);
          break;
      }
      V.bytesPerLine = V.width * V.inputSize * V.channels;
      if (V.outputChannels == 4) {
        V.format = RGBAFormat;
        V.colorSpace = LinearSRGBColorSpace;
      } else {
        V.format = RedFormat;
        V.colorSpace = NoColorSpace;
      }
      return V;
    }
    const Mt = new DataView(e);
    const Et = new Uint8Array(e);
    const St = {
      value: 0
    };
    const Tt = gt(Mt, e, St);
    const nt = yt(Tt, Mt, Et, St, this.type);
    const Rt = {
      value: 0
    };
    const Ct = {
      R: 0,
      G: 1,
      B: 2,
      A: 3,
      Y: 0
    };
    for (let P = 0; P < nt.height / nt.scanlineBlockSize; P++) {
      const B = Re(Mt, St);
      nt.size = Re(Mt, St);
      nt.lines = B + nt.scanlineBlockSize > nt.height ? nt.height - B : nt.scanlineBlockSize;
      const A = nt.size < nt.lines * nt.bytesPerLine ? nt.uncompress(nt) : W(nt);
      St.value += nt.size;
      for (let H = 0; H < nt.scanlineBlockSize; H++) {
        const V = H + P * nt.scanlineBlockSize;
        if (V >= nt.height) {
          break;
        }
        for (let J = 0; J < nt.channels; J++) {
          const ie = Ct[Tt.channels[J].name];
          for (let ge = 0; ge < nt.width; ge++) {
            Rt.value = (H * (nt.channels * nt.width) + J * nt.width + ge) * nt.inputSize;
            const pe = (nt.height - 1 - V) * (nt.width * nt.outputChannels) + ge * nt.outputChannels + ie;
            nt.byteArray[pe] = nt.getter(A, Rt);
          }
        }
      }
    }
    return {
      header: Tt,
      width: nt.width,
      height: nt.height,
      data: nt.byteArray,
      format: nt.format,
      colorSpace: nt.colorSpace,
      type: this.type
    };
  }
  setDataType(e) {
    this.type = e;
    return this;
  }
  load(e, t, r, n) {
    function a(l, c) {
      l.colorSpace = c.colorSpace;
      l.minFilter = LinearFilter;
      l.magFilter = LinearFilter;
      l.generateMipmaps = false;
      l.flipY = false;
      if (t) {
        t(l, c);
      }
    }
    return super.load(e, a, r, n);
  }
}
const AnyItem$2 = properties.loader.ITEM_CLASSES.any;
class EXRItem extends AnyItem$2 {
  constructor(e, t) {
    super(e, {
      ...t,
      responseType: "type"
    });
    this.EXRLoader = new EXRLoader();
  }
  retrieve() {
    return false;
  }
  _onLoad(e) {
    this.content = e;
    super._onLoad(this);
  }
  loadFunc() {
    this.EXRLoader.load(this.url, this._onLoad.bind(this), this._onGLTFLoading.bind(this));
  }
  _onGLTFLoading(e) {
    if (this.hasLoading) {
      this.loadingSignal.dispatch(e.loaded / e.total);
    }
  }
}
EXRItem.type = "exr";
EXRItem.extensions = ["exr"];
const ImageItem = properties.loader.ITEM_CLASSES.image;
class TextureItem extends ImageItem {
  constructor(e, t) {
    let r = t.content || new Texture(new Image());
    t.content = r.image;
    r.size = new Vector2();
    r.minFilter = t.minFilter || LinearMipMapLinearFilter;
    switch (r.minFilter) {
      case NearestMipMapNearestFilter:
      case NearestMipMapLinearFilter:
      case LinearMipMapNearestFilter:
      case LinearMipMapLinearFilter:
        r.generateMipmaps = true;
        r.anisotropy = t.anisotropy || properties.renderer.capabilities.getMaxAnisotropy();
        break;
      default:
        r.generateMipmaps = false;
    }
    r.flipY = t.flipY === undefined ? true : t.flipY;
    if (t.wrap) {
      r.wrapS = r.wrapT = t.wrap;
    } else {
      if (t.wrapS) {
        r.wrapS = t.wrapS;
      }
      if (t.wrapT) {
        r.wrapT = t.wrapT;
      }
    }
    super(e, t);
    this.content = r;
  }
  retrieve() {
    return false;
  }
  load() {
    this.isStartLoaded = true;
    let e = this.content.image;
    e.onload = this.boundOnLoad;
    e.onerror = this.boundOnLoad;
    e.src = this.url;
  }
  _onLoad() {
    delete this.content.image.onload;
    this.width = this.content.image.width || 1;
    this.height = this.content.image.height || 1;
    this.content.size.set(this.width, this.height);
    this.content.needsUpdate = true;
    taskManager.add(this.content);
    if (this.onPost) {
      this.onPost.call(this, this.content, this.onPostLoadingSignal);
    } else {
      this._onLoadComplete();
    }
  }
}
TextureItem.type = "texture";
TextureItem.extensions = [];
const AnyItem$1 = properties.loader.ITEM_CLASSES.any;
class ThreeLoaderItem extends AnyItem$1 {
  constructor(e, t) {
    t.loadFunc = () => {};
    t.hasLoading = t.hasLoading === undefined ? true : t.hasLoading;
    super(e, t);
    if (!t.loader && console) {
      (console.error || console.log)("loader is required.");
    }
    this.loadFunc = this._loadFunc.bind(this);
  }
  _loadFunc(e, t, r) {
    this.loader.load(e, this._onLoaderLoad.bind(this, t), this._onLoaderLoading.bind(this, r));
  }
  _onLoaderLoad(e, t) {
    this.content = t;
    e(t);
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
ThreeLoaderItem.type = "three-loader";
ThreeLoaderItem.extensions = [];
const shader = `#define GLSLIFY 1
uniform vec2 u_glPositionOffset;vec4 glPositionOffset(vec4 glPosition){return glPosition+vec4(u_glPositionOffset*glPosition.w,0.0,0.0);}`;
class GlPositionOffset {
  offset = new Vector2();
  sharedUniforms = {
    u_glPositionOffset: {
      value: null
    }
  };
  init() {
    this.sharedUniforms.u_glPositionOffset.value = this.offset;
    shaderHelper.addChunk("glPositionOffset", shader);
  }
  setOffset(e, t) {
    return this.offset.set(e, t);
  }
}
const glPositionOffset = new GlPositionOffset();
class Support {
  isSupported() {
    properties._isSupportedDevice = true;
    properties._isSupportedBrowser = (browser$1.isChrome || browser$1.isSafari || browser$1.isEdge || browser$1.isFirefox || browser$1.isOpera) && !browser$1.isIE;
    properties._isSupportedWebGL = this.checkSupportWebGL();
    return properties._isSupportedWebGL;
  }
  checkSupportWebGL() {
    if (!(properties.canvas instanceof HTMLCanvasElement)) {
      return false;
    }
    if (settings.USE_WEBGL2 && window.WebGL2RenderingContext) {
      try {
        properties.gl = properties.canvas.getContext("webgl2", properties.webglOpts);
        settings.RENDER_TARGET_FLOAT_TYPE = HalfFloatType;
        settings.DATA_FLOAT_TYPE = FloatType;
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    settings.USE_WEBGL2 = false;
    if (window.WebGLRenderingContext) {
      try {
        let e = properties.gl = properties.canvas.getContext("webgl", properties.webglOpts) || properties.canvas.getContext("experimental-webgl", properties.webglOpts);
        if ((e.getExtension("OES_texture_float") || e.getExtension("OES_texture_half_float")) && e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
          settings.RENDER_TARGET_FLOAT_TYPE = browser$1.isIOS || e.getExtension("OES_texture_half_float") ? HalfFloatType : FloatType;
          settings.DATA_FLOAT_TYPE = FloatType;
        } else {
          settings.USE_FLOAT_PACKING = true;
          settings.RENDER_TARGET_FLOAT_TYPE = settings.DATA_FLOAT_TYPE = UnsignedByteType;
          return false;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return false;
  }
}
const support = new Support();
const textureBicubicShader = `#define GLSLIFY 1
vec4 cubic(float v){vec4 n=vec4(1.0,2.0,3.0,4.0)-v;vec4 s=n*n*n;float x=s.x;float y=s.y-4.0*s.x;float z=s.z-4.0*s.y+6.0*s.x;float w=6.0-x-y-z;return vec4(x,y,z,w);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,offset.xz);vec4 sample1=texture2D(t,offset.yz);vec4 sample2=texture2D(t,offset.xw);vec4 sample3=texture2D(t,offset.yw);float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize,vec4 clampRect){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,clamp(offset.xz,clampRect.xy,clampRect.zw));vec4 sample1=texture2D(t,clamp(offset.yz,clampRect.xy,clampRect.zw));vec4 sample2=texture2D(t,clamp(offset.xw,clampRect.xy,clampRect.zw));vec4 sample3=texture2D(t,clamp(offset.yw,clampRect.xy,clampRect.zw));float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}`;
class App {
  initEngine() {
    properties.canvas = document.getElementById("canvas");
    properties.isSupported = support.isSupported();
    if (properties.isSupported) {
      properties.loader.register(BufItem);
      properties.loader.register(EXRItem);
      properties.loader.register(TextureItem);
      properties.loader.register(ThreeLoaderItem);
      properties.renderer = new WebGLRenderer({
        canvas: properties.canvas,
        context: properties.gl,
        premultipliedAlpha: false
      });
      properties.scene = new Scene();
      properties.camera = new PerspectiveCamera(45, 1, 0.1, 200);
      properties.scene.add(properties.camera);
      properties.sharedUniforms.u_resolution.value = properties.resolution = new Vector2();
      properties.sharedUniforms.u_viewportResolution.value = properties.viewportResolution = new Vector2();
      properties.sharedUniforms.u_bgColor.value = properties.bgColor = new Color();
      shaderHelper.addChunk("textureBicubic", textureBicubicShader);
      fboHelper.init(properties.renderer, settings.RENDER_TARGET_FLOAT_TYPE);
      textureHelper.init();
      properties.postprocessing = new Postprocessing();
      properties.postprocessing.init();
      blueNoise.preInit();
      glPositionOffset.init();
      screenPaint.init();
      properties.smaa = new Smaa();
      properties.smaa.init();
      properties.smaa.setTextures(properties.loader.add(settings.TEXTURE_PATH + "smaa-area.png", {
        weight: 32
      }).content, properties.loader.add(settings.TEXTURE_PATH + "smaa-search.png", {
        weight: 0.1
      }).content);
      properties.postprocessing.queue.push(properties.smaa);
      let e = !browser$1.isMobile || settings.USE_HD;
      properties.bloom = new Bloom();
      properties.bloom.init({
        USE_CONVOLUTION: e,
        USE_HD: e
      });
      properties.postprocessing.queue.push(properties.bloom);
      properties.screenPaintDistortion = new ScreenPaintDistortion();
      properties.screenPaintDistortion.init({
        screenPaint
      });
      properties.postprocessing.queue.push(properties.screenPaintDistortion);
      properties.final = new Final();
      properties.final.init();
      properties.postprocessing.queue.push(properties.final);
      if (settings.UP_SCALE > 1) {
        properties.upscaler = new Fsr();
        properties.upscaler.init();
        properties.postprocessing.queue.push(properties.upscaler);
      }
      preUfx.init();
      properties.postprocessing.queue.push(preUfx);
      postUfx.init();
      properties.postprocessing.queue.push(postUfx);
    }
  }
  preInit() {
    if (!settings.WEBGL_OFF) {
      cameraControls.preInit();
      visuals.preInit();
      audios.preInit();
    }
  }
  init() {
    if (!settings.WEBGL_OFF) {
      if (properties.smaa) {
        properties.smaa.updateTextures();
      }
      cameraControls.init();
      visuals.init();
      audios.init();
      if (settings.IS_DEV === false) {
        if (console.clear) {
          console.clear();
        }
        console.log("%c Created by Lusion: https://lusion.co/", "border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;");
      }
    }
  }
  start() {
    visuals.start();
  }
  resize(e, t) {
    if (!settings.WEBGL_OFF) {
      properties.renderer.setSize(e, t);
      properties.canvas.style.width = `${properties.viewportWidth}px`;
      properties.canvas.style.height = `${properties.viewportHeight}px`;
      properties.camera.aspect = properties.width / properties.height;
      properties.sharedUniforms.u_aspect.value = properties.camera.aspect;
      properties.camera.updateProjectionMatrix();
      properties.postprocessing.setSize(properties.width, properties.height);
      screenPaint.resize(properties.width, properties.height);
      visuals.resize(properties.width, properties.height);
    }
  }
  preUpdate(e = 0) {
    visuals.deactivateAll();
  }
  update(e = 0) {
    if (!settings.WEBGL_OFF) {
      properties.time = properties.sharedUniforms.u_time.value += e;
      properties.deltaTime = properties.sharedUniforms.u_deltaTime.value = e;
      visuals.syncProperties(e);
      blueNoise.update(e);
      screenPaint.update(e);
      cameraControls.update(e);
      visuals.update(e);
      audios.update(e);
      properties.renderer.setClearColor(properties.bgColor, properties.clearAlpha);
      properties.bgColor.setStyle(properties.bgColorHex);
      aboutPageHeroEfxPrepass.isActive = aboutHero.isActive;
      aboutPageHeroEfx.isActive = aboutHero.isActive;
      goalTunnelEfx.isActive = goalTunnels.isActive;
      properties.bloom.amount = properties.bloomAmount;
      properties.bloom.radius = properties.bloomRadius;
      properties.bloom.threshold = properties.bloomThreshold;
      properties.bloom.smoothWidth = properties.bloomSmoothWidth;
      properties.bloom.haloWidth = properties.haloWidth;
      properties.bloom.haloRGBShift = properties.haloRGBShift;
      properties.bloom.haloStrength = properties.haloStrength;
      properties.bloom.haloMaskInner = properties.haloMaskInner;
      properties.bloom.haloMaskOuter = properties.haloMaskOuter;
      properties.bloom.saturation = properties.bloomSaturation;
      properties.bloom.highPassMultiplier = properties.bloomHighPassMultiplier * (properties.bloom.USE_CONVOLUTION ? 1 : 1.5);
      properties.final.isActive = properties.useFinal;
      properties.final.vignetteFrom = properties.vignetteFrom;
      properties.final.vignetteTo = properties.vignetteTo;
      properties.final.vignetteColor.setStyle(properties.vignetteColorHex);
      properties.final.saturation = properties.saturation;
      properties.final.contrast = properties.contrast;
      properties.final.brightness = properties.brightness;
      properties.final.tintColor.setStyle(properties.tintColorHex);
      properties.final.tintOpacity = properties.tintOpacity;
      properties.final.bgColor.setStyle(properties.bgColorHex);
      properties.final.opacity = properties.opacity;
      screenPaint.needsMouseDown = properties.screenPaintNeedsMouseDown;
      screenPaint.minRadius = 0;
      screenPaint.maxRadius = Math.max(40, properties.viewportWidth / 20);
      screenPaint.radiusDistanceRange = properties.screenPaintRadiusDistanceRange;
      screenPaint.pushStrength = properties.screenPaintPushStrength;
      screenPaint.velocityDissipation = properties.screenPaintVelocityDissipation;
      screenPaint.weight1Dissipation = properties.screenPaintWeight1Dissipation;
      screenPaint.weight2Dissipation = properties.screenPaintWeight2Dissipation;
      screenPaint.useNoise = properties.screenPaintUseNoise;
      screenPaint.curlScale = properties.screenPaintCurlScale;
      screenPaint.curlStrength = properties.screenPaintCurlStrength;
      properties.screenPaintDistortion.amount = properties.screenPaintDistortionAmount;
      properties.screenPaintDistortion.rgbShift = properties.screenPaintDistortionRGBShift;
      properties.screenPaintDistortion.colorMultiplier = properties.screenPaintDistortionColorMultiplier;
      properties.screenPaintDistortion.multiplier = properties.screenPaintDistortionMultiplier;
      if (properties.upscaler) {
        properties.upscaler.sharpness = properties.upscalerSharpness;
      }
      if (transitionOverlay.activeRatio < 1) {
        properties.postprocessing.render(visuals.currentStage3D, properties.camera, true);
      }
      if (window.__debugTexture) {
        fboHelper.debugTo(window.__debugTexture);
      }
    }
  }
}
const app = new App();
window.__app = app;
class Preloader {
  percentTarget = 0;
  percent = 0;
  percentToStart = 0;
  DELAY = 1.5;
  MIN_PRELOAD_DURATION = 1;
  PERCENT_BETWEEN_INIT_AND_START = 0.3;
  MIN_DURATION_BETWEEN_INIT_AND_START = 0.25;
  HIDE_DURATION = 0.5;
  isActive = false;
  lineTransformTime = 0;
  digitsWidth = 0;
  preInit() {
    this.domContainer = document.getElementById("preloader");
    this.domDigitsContainer = document.getElementById("preloader-percent-digits");
    this.domDigits = document.querySelectorAll(".preloader-percent-digit");
    for (let e = 0; e < this.domDigits.length; e++) {
      let t = this.domDigits[e];
      t._domNums = t.querySelectorAll(".preloader-percent-digit-num");
      t._easedVal = 0;
    }
  }
  init() {}
  show(e, t) {
    this._initCallback = e;
    this._startCallback = t;
    this.isActive = true;
    properties.loader.start(r => {
      this.percentTarget = r >= 0.95 ? 1 : r;
    });
    setTimeout(() => {
      if (this.percentTarget < 1) {
        console.warn("[Preloader timeout trigger]");
        this.percentTarget = 1;
      }
    }, 1200);
    setTimeout(() => {
      if (!properties.hasStarted) {
        console.warn("[Preloader auto-start fallback trigger]");
        this.percentTarget = 1;
        this.percent = 1;
        this.percentToStart = 1;
        taskManager.percent = 1;
        if (!properties.hasInitialized) {
          this._initCallback();
        }
        this._startCallback();
      }
    }, 2200);
  }
  hide() {}
  resize(e, t, r) {
    if (r !== true) {
      this.digitsWidth = this.domDigitsContainer.offsetWidth;
    }
  }
  update(e) {
    if (!this.isActive) {
      return;
    }
    this.percent = Math.min(this.percentTarget, this.percent + (settings.SKIP_ANIMATION ? 1 : this.percentTarget > this.percent ? e : 0) / this.MIN_PRELOAD_DURATION);
    if (this.percentTarget >= 0.98) {
      this.percentTarget = 1;
      if (!properties.hasInitialized) {
        this._initCallback();
      }
      this.percentToStart = settings.SKIP_ANIMATION ? 1 : Math.min(taskManager.percent >= 0.98 ? 1 : taskManager.percent, this.percentToStart + e / this.MIN_DURATION_BETWEEN_INIT_AND_START);
    }
    let t = this.percentToStart * this.PERCENT_BETWEEN_INIT_AND_START + this.percent * (1 - this.PERCENT_BETWEEN_INIT_AND_START);
    let r = 0;
    if (t >= 0.98) {
      t = 1;
    }
    if (t == 1) {
      this.lineTransformTime += settings.SKIP_ANIMATION ? 1 : e;
      r = ease.expoInOut(math.saturate(this.lineTransformTime));
    }
    if (r >= 0.98) {
      r = 1;
    }
    if (r == 1 && !properties.hasStarted) {
      this._startCallback();
    }
    let n = settings.SKIP_ANIMATION ? +properties.hasStarted : math.saturate(properties.startTime);
    for (let a = 0; a < this.domDigits.length; a++) {
      let l = this.domDigits[a];
      let c = Math.floor(t * 100 / Math.pow(10, this.domDigits.length - a - 1));
      l._easedVal = math.mix(l._easedVal, c, 1 - Math.exp(e * -7));
      if (c - l._easedVal < 0.01) {
        l._easedVal = c;
      }
      let u = l._easedVal % 10;
      let f = Math.floor(u);
      let p = Math.ceil(u) % 10;
      let g = u - f;
      l._domNums[0].innerHTML = f;
      l._domNums[1].innerHTML = p;
      l.style.transform = "translateY(" + -(g - ease.expoInOut(math.saturate(n * 1.2 - a * 0.2 / (this.domDigits.length - 1)))) * 50 + "%) translateY(-0.05em)";
    }
    transitionOverlay.loadBarRatio = t;
    transitionOverlay.lineTransformRatio = r;
    transitionOverlay.contentShowRatio = n;
    if (n >= 0.98) {
      this.domContainer.style.display = "none";
      this.isActive = false;
    }
  }
}
const preloader = new Preloader();
class Links {
  links = [];
  preInit() {
    Array.from(document.querySelectorAll(".is-link")).forEach(t => {
      const r = {
        el: t,
        canvas: document.createElement("canvas"),
        context: null,
        ratio: 0,
        animating: false,
        color: t.classList.contains("is-email") ? "#000000" : "#ffffff"
      };
      r.context = r.canvas.getContext("2d");
      r.el.style.position = "relative";
      r.el.style.width = "fit-content";
      r.canvas.style.position = "absolute";
      r.canvas.style.left = "0";
      r.canvas.style.top = "0";
      r.canvas.style.pointerEvents = "none";
      r.el.append(r.canvas);
      this.links.push(r);
    });
  }
  init() {
    this.links.forEach(e => {
      e.el.addEventListener("mouseenter", this._onLinkMouseenter.bind(this));
      e.el.addEventListener("mouseleave", this._onLinkMouseleave.bind(this));
    });
  }
  resize() {
    this.links.forEach(e => {
      const t = e.el.getBoundingClientRect();
      e._width = t.width;
      e._height = t.height;
      e.canvas.width = e._width * settings.DPR;
      e.canvas.height = e._height * settings.DPR;
      e.canvas.style.width = e._width + "px";
      e.canvas.style.height = e._height + "px";
    });
  }
  update(e) {
    this.links.forEach(t => {
      let r = t.ratio;
      t.ratio = math.saturate(t.ratio + (t.animating ? 1 : -1) * e * 3);
      if (t.ratio !== 0 || r !== t.ratio) {
        const n = ease.quadInOut(t.ratio);
        const a = ease.quadOut(Math.abs(t.ratio * 2 - 1));
        t.context.save();
        t.context.scale(settings.DPR, settings.DPR);
        t.context.lineWidth = 2;
        t.context.strokeStyle = t.color;
        t.context.clearRect(0, 0, t._width, t._height);
        t.context.beginPath();
        t.context.moveTo(0, t._height - t.context.lineWidth / 2);
        t.context.arcTo(t._width * n, t._height - t.context.lineWidth / 2, t._width * n, t._height - t.context.lineWidth / 2 - 1, (1 - a) * 30);
        t.context.stroke();
        t.context.restore();
      }
    });
  }
  _onLinkMouseenter(e) {
    const t = this.links.filter(r => r.el === e.target)[0];
    t.animating = true;
  }
  _onLinkMouseleave(e) {
    const t = this.links.filter(r => r.el === e.target)[0];
    t.animating = false;
  }
}
const links = new Links();
new Color();
class UI {
  domSectionsContainer = document.querySelector("#page-container");
  preInit() {
    if (!settings.WEBGL_OFF) {
      document.documentElement.classList.add("is-ready");
    }
    transitionOverlay.init();
    preloader.preInit();
    header.preInit();
    links.preInit();
    pageExtraSections.preInit();
  }
  preload(e, t) {
    preloader.show(e, t);
  }
  init() {
    header.init();
    links.init();
    pageExtraSections.init();
  }
  start() {
    preloader.hide();
    header.show();
  }
  resize(e, t, r) {
    transitionOverlay.resize(e, t);
    preloader.resize(e, t, r);
    links.resize(e, t);
    header.resize(e, t);
    pageExtraSections.resize(e, t);
    videoOverlay.resize(e, t);
    const a = getComputedStyle(document.documentElement).getPropertyValue("--global-border-radius").split("px")[0];
    properties.globalRadius = properties.sharedUniforms.u_globalRadius.value = parseInt(a);
  }
  update(e) {
    preloader.update(e);
    transitionOverlay.update(e);
    links.update(e);
    header.update(e);
    pageExtraSections.update(e);
    videoOverlay.update(e);
  }
}
const ui = new UI();
const AnyItem = properties.loader.ITEM_CLASSES.any;
class FontItem extends AnyItem {
  constructor(e, t) {
    if (!FontItem.dom) {
      FontItem.initDom();
    }
    t.loadFunc = () => {};
    t.hasLoading = t.hasLoading === undefined ? true : t.hasLoading;
    t.refText = "refing something...";
    t.refFontSize = t.refFontSize || 120;
    t.refFont = "Helvetica, Arial, FreeSans, Garuda, sans-serif";
    t.interval = t.interval || 20;
    t.refTextWidth = 0;
    super(e, t);
    this.loadFunc = this._loadFunc.bind(this);
  }
  static dom;
  static initDom() {
    let e = document.createElement("dom");
    e.style.position = "fixed";
    e.style.left = e.style.top = 0;
    e.style.visibility = "hidden";
    document.body.appendChild(e);
    FontItem.dom = e;
  }
  _loadFunc(e, t, r) {
    let n = e.split(",");
    let a = [];
    for (let g = 0; g < n.length; g++) {
      a.push(n[g].trim());
    }
    n = this.refFont.split(":");
    let l = n[0];
    let c = n[1] || "normal";
    let u = n[2] || "normal";
    let f;
    let p = a.length;
    let timer = setTimeout(() => {
      clearInterval(f);
      t();
    }, 1200);
    f = setInterval(() => {
      if (!a.length) {
        clearInterval(f);
        clearTimeout(timer);
        t();
        return;
      }
      n = a[0].split(":");
      l = n[0];
      c = n[1] || "normal";
      u = n[2] || "normal";
      let g = this._getTextWidth(l, c, u, this.refFont);
      let v = this._getTextWidth(this.refFont, c, u, this.refFont);
      if (g !== v) {
        a.shift();
        r.dispatch((p - a.length) / p);
        if (a.length === 0) {
          clearInterval(f);
          clearTimeout(timer);
          t();
        }
      }
    }, this.interval);
  }
  _getTextWidth = (e, t, r, n) => {
    let a = FontItem.dom;
    a.style.fontFamily = "\"" + e + "\"" + (n ? ", " + n : "");
    a.style.fontWeight = t;
    a.style.fontStyle = r;
    a.innerHTML = this.refText;
    return a.getBoundingClientRect().width;
  };
  _onLoaderLoad(e, t) {
    this.content = t;
    e(t);
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
FontItem.type = "font";
FontItem.extensions = [];
let dateTime = performance.now();
let _needsResize = false;
function preRun() {
  for (const [o, e] of Object.entries(settings.CROSS_ORIGINS)) {
    properties.loader.setCrossOrigin(o, e);
  }
  routeManager.init();
  properties.loader.register(FontItem);
  properties.loader.add("Aeonik:400", {
    type: "font"
  });
  properties.loader.start(o => {
    if (o === 1) {
      run();
    }
  });
}
function run() {
  let o = properties.viewportWidth = window.innerWidth;
  let e = properties.viewportHeight = window.innerHeight;
  properties.viewportResolution = new Vector2(o, e);
  properties.width = o;
  properties.height = e;
  properties.loader.add("Aeonik:500,Aeonik:400:italic,IBMPlexMono:400,IBMPlexMono:500,LusionMono:400", {
    type: "font"
  });
  app.initEngine();
  input.preInit();
  scrollManager.init();
  pagesManager.preInit();
  ui.preInit();
  app.preInit();
  window.addEventListener("resize", onResize);
  _onResize();
  loop();
  ui.preload(init, start);
}
function init() {
  input.init();
  pagesManager.init();
  ui.init();
  app.init();
  properties.hasInitialized = true;
}
function start() {
  ui.start();
  pagesManager.start();
  app.start();
  properties.hasStarted = true;
  _onResize(true);
  scrollManager.isActive = true;
  if (settings.JUMP_SECTION !== "") {
    scrollManager.scrollTo(settings.JUMP_SECTION, settings.JUMP_OFFSET, true);
  }
}
function onResize() {
  _needsResize = true;
}
function _onResize(o) {
  let e = properties.viewportWidth = window.innerWidth;
  let t = properties.viewportHeight = window.innerHeight;
  properties.viewportResolution.set(e, window.innerHeight);
  properties.useMobileLayout = e <= settings.MOBILE_WIDTH;
  document.documentElement.style.setProperty("--vh", t * 0.01 + "px");
  let r = e * settings.DPR;
  let n = t * settings.DPR;
  if (settings.USE_PIXEL_LIMIT === true && r * n > settings.MAX_PIXEL_COUNT) {
    let a = r / n;
    n = Math.sqrt(settings.MAX_PIXEL_COUNT / a);
    r = Math.ceil(n * a);
    n = Math.ceil(n);
  }
  properties.width = r;
  properties.height = n;
  properties.webglDPR = properties.width / e;
  properties.resolution.set(properties.width, properties.height);
  if (!o) {
    input.resize();
  }
  scrollManager.resize(e, t);
  pagesManager.resize(e, t);
  ui.resize(e, t, o);
  app.resize(Math.ceil(r * properties.upscalerAmount), Math.ceil(n * properties.upscalerAmount));
  scrollManager.resize(e, t);
}
function update(o) {
  scrollManager.autoScrollSpeed = properties.autoScrollSpeed;
  if (window.__AUTO_SCROLL__) {
    scrollManager.autoScrollSpeed = window.__AUTO_SCROLL__;
  }
  taskManager.update();
  properties.reset();
  app.preUpdate(o);
  input.update(o);
  scrollManager.update(o);
  pagesManager.update(o);
  ui.update(o);
  app.update(o);
  input.postUpdate(o);
}
function loop() {
  window.requestAnimationFrame(loop);
  let o = performance.now();
  let e = (o - dateTime) / 1000;
  dateTime = o;
  e = Math.min(e, 1 / 20);
  if (_needsResize) {
    _onResize();
  }
  if (properties.hasStarted) {
    properties.startTime += e;
  }
  Tween.autoUpdate(e);
  update(e);
  _needsResize = false;
}
preRun();
if (!Object.assign) {
  document.documentElement.classList.add("not-supported not-supported--browser");
}
document.documentElement.classList.remove("no-js");
if (/(ipad|iphone|android)/i.test((navigator.userAgent || navigator.vendor).toLowerCase())) {
  document.documentElement.classList.add("is-mobile");
} else {
  document.documentElement.classList.add("is-desktop");
}
function preventZoom(o) {
  o.preventDefault();
  document.body.style.zoom = 1;
}
window.addEventListener("wheel", o => o.preventDefault(), {
  passive: false
});
document.addEventListener("gesturestart", o => preventZoom(o));
document.addEventListener("gesturechange", o => preventZoom(o));
document.addEventListener("gestureend", o => preventZoom(o));