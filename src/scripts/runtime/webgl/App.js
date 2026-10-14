const textureBicubicShader = `#define GLSLIFY 1
vec4 cubic(float v){vec4 n=vec4(1.0,2.0,3.0,4.0)-v;vec4 s=n*n*n;float x=s.x;float y=s.y-4.0*s.x;float z=s.z-4.0*s.y+6.0*s.x;float w=6.0-x-y-z;return vec4(x,y,z,w);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,offset.xz);vec4 sample1=texture2D(t,offset.yz);vec4 sample2=texture2D(t,offset.xw);vec4 sample3=texture2D(t,offset.yw);float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize,vec4 clampRect){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,clamp(offset.xz,clampRect.xy,clampRect.zw));vec4 sample1=texture2D(t,clamp(offset.yz,clampRect.xy,clampRect.zw));vec4 sample2=texture2D(t,clamp(offset.xw,clampRect.xy,clampRect.zw));vec4 sample3=texture2D(t,clamp(offset.yw,clampRect.xy,clampRect.zw));float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}`;
globalThis.textureBicubicShader = textureBicubicShader;

/**
 * Root WebGL Engine Application Coordinator
 */
import * as THREE from "../three.js";
class App {
  initEngine() {
    if (
      ((properties.canvas = document.getElementById("canvas")),
      (properties.isSupported = support.isSupported()),
      properties.isSupported)
    ) {
      (properties.loader.register(BufItem),
        properties.loader.register(EXRItem),
        properties.loader.register(TextureItem),
        properties.loader.register(ThreeLoaderItem),
        (properties.renderer = new WebGLRenderer({
          canvas: properties.canvas,
          context: properties.gl,
          premultipliedAlpha: !1,
        })),
        (properties.scene = new Scene()),
        (properties.camera = new PerspectiveCamera(45, 1, 0.1, 200)),
        properties.scene.add(properties.camera),
        (properties.sharedUniforms.u_resolution.value = properties.resolution =
          new Vector2()),
        (properties.sharedUniforms.u_viewportResolution.value =
          properties.viewportResolution =
            new Vector2()),
        (properties.sharedUniforms.u_bgColor.value = properties.bgColor =
          new Color()),
        shaderHelper.addChunk("textureBicubic", textureBicubicShader),
        fboHelper.init(properties.renderer, settings.RENDER_TARGET_FLOAT_TYPE),
        textureHelper.init(),
        (properties.postprocessing = new Postprocessing()),
        properties.postprocessing.init(),
        blueNoise.preInit(),
        glPositionOffset.init(),
        screenPaint.init(),
        (properties.smaa = new Smaa()),
        properties.smaa.init(),
        properties.smaa.setTextures(
          properties.loader.add(settings.TEXTURE_PATH + "smaa-area.png", {
            weight: 32,
          }).content,
          properties.loader.add(settings.TEXTURE_PATH + "smaa-search.png", {
            weight: 0.1,
          }).content,
        ),
        properties.postprocessing.queue.push(properties.smaa));
      let e = !browser$1.isMobile || settings.USE_HD;
      ((properties.bloom = new Bloom()),
        properties.bloom.init({ USE_CONVOLUTION: e, USE_HD: e }),
        properties.postprocessing.queue.push(properties.bloom),
        (properties.screenPaintDistortion = new ScreenPaintDistortion()),
        properties.screenPaintDistortion.init({ screenPaint }),
        properties.postprocessing.queue.push(properties.screenPaintDistortion),
        (properties.final = new Final()),
        properties.final.init(),
        properties.postprocessing.queue.push(properties.final),
        settings.UP_SCALE > 1 &&
          ((properties.upscaler = new Fsr()),
          properties.upscaler.init(),
          properties.postprocessing.queue.push(properties.upscaler)),
        preUfx.init(),
        properties.postprocessing.queue.push(preUfx),
        postUfx.init(),
        properties.postprocessing.queue.push(postUfx));
    }
  }
  preInit() {
    settings.WEBGL_OFF ||
      (cameraControls.preInit(), visuals.preInit(), audios.preInit());
  }
  init() {
    settings.WEBGL_OFF ||
      (properties.smaa && properties.smaa.updateTextures(),
      cameraControls.init(),
      visuals.init(),
      audios.init(),
      settings.IS_DEV === !1 &&
        (console.clear && console.clear(),
        console.log(
          "%c Created by Lusion: https://lusion.co/",
          "border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;",
        )));
  }
  start() {
    visuals.start();
  }
  resize(e, t) {
    settings.WEBGL_OFF ||
      (properties.renderer.setSize(e, t),
      (properties.canvas.style.width = `${properties.viewportWidth}px`),
      (properties.canvas.style.height = `${properties.viewportHeight}px`),
      (properties.camera.aspect = properties.width / properties.height),
      (properties.sharedUniforms.u_aspect.value = properties.camera.aspect),
      properties.camera.updateProjectionMatrix(),
      properties.postprocessing.setSize(properties.width, properties.height),
      screenPaint.resize(properties.width, properties.height),
      visuals.resize(properties.width, properties.height));
  }
  preUpdate(e = 0) {
    visuals.deactivateAll();
  }
  update(e = 0) {
    settings.WEBGL_OFF ||
      ((properties.time = properties.sharedUniforms.u_time.value += e),
      (properties.deltaTime = properties.sharedUniforms.u_deltaTime.value = e),
      visuals.syncProperties(e),
      blueNoise.update(e),
      screenPaint.update(e),
      cameraControls.update(e),
      visuals.update(e),
      audios.update(e),
      properties.renderer.setClearColor(
        properties.bgColor,
        properties.clearAlpha,
      ),
      properties.bgColor.setStyle(properties.bgColorHex),
      (aboutPageHeroEfxPrepass.isActive = aboutHero.isActive),
      (aboutPageHeroEfx.isActive = aboutHero.isActive),
      (goalTunnelEfx.isActive = goalTunnels.isActive),
      (properties.bloom.amount = properties.bloomAmount),
      (properties.bloom.radius = properties.bloomRadius),
      (properties.bloom.threshold = properties.bloomThreshold),
      (properties.bloom.smoothWidth = properties.bloomSmoothWidth),
      (properties.bloom.haloWidth = properties.haloWidth),
      (properties.bloom.haloRGBShift = properties.haloRGBShift),
      (properties.bloom.haloStrength = properties.haloStrength),
      (properties.bloom.haloMaskInner = properties.haloMaskInner),
      (properties.bloom.haloMaskOuter = properties.haloMaskOuter),
      (properties.bloom.saturation = properties.bloomSaturation),
      (properties.bloom.highPassMultiplier =
        properties.bloomHighPassMultiplier *
        (properties.bloom.USE_CONVOLUTION ? 1 : 1.5)),
      (properties.final.isActive = properties.useFinal),
      (properties.final.vignetteFrom = properties.vignetteFrom),
      (properties.final.vignetteTo = properties.vignetteTo),
      properties.final.vignetteColor.setStyle(properties.vignetteColorHex),
      (properties.final.saturation = properties.saturation),
      (properties.final.contrast = properties.contrast),
      (properties.final.brightness = properties.brightness),
      properties.final.tintColor.setStyle(properties.tintColorHex),
      (properties.final.tintOpacity = properties.tintOpacity),
      properties.final.bgColor.setStyle(properties.bgColorHex),
      (properties.final.opacity = properties.opacity),
      (screenPaint.needsMouseDown = properties.screenPaintNeedsMouseDown),
      (screenPaint.minRadius = 0),
      (screenPaint.maxRadius = Math.max(40, properties.viewportWidth / 20)),
      (screenPaint.radiusDistanceRange =
        properties.screenPaintRadiusDistanceRange),
      (screenPaint.pushStrength = properties.screenPaintPushStrength),
      (screenPaint.velocityDissipation =
        properties.screenPaintVelocityDissipation),
      (screenPaint.weight1Dissipation =
        properties.screenPaintWeight1Dissipation),
      (screenPaint.weight2Dissipation =
        properties.screenPaintWeight2Dissipation),
      (screenPaint.useNoise = properties.screenPaintUseNoise),
      (screenPaint.curlScale = properties.screenPaintCurlScale),
      (screenPaint.curlStrength = properties.screenPaintCurlStrength),
      (properties.screenPaintDistortion.amount =
        properties.screenPaintDistortionAmount),
      (properties.screenPaintDistortion.rgbShift =
        properties.screenPaintDistortionRGBShift),
      (properties.screenPaintDistortion.colorMultiplier =
        properties.screenPaintDistortionColorMultiplier),
      (properties.screenPaintDistortion.multiplier =
        properties.screenPaintDistortionMultiplier),
      properties.upscaler &&
        (properties.upscaler.sharpness = properties.upscalerSharpness),
      transitionOverlay.activeRatio < 1 &&
        properties.postprocessing.render(
          visuals.currentStage3D,
          properties.camera,
          !0,
        ),
      window.__debugTexture && fboHelper.debugTo(window.__debugTexture));
  }
}
const app = new App();
globalThis.app = app;
window.__app = app;

export { App, app };
export default app;
