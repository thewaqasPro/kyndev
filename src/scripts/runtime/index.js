/**
 * ============================================================================
 * KYNDEV Modular WebGL & Experience Runtime
 * ============================================================================
 * Deconstructed from the original monolithic runtime.js.
 * Provides clean modular subsystems for:
 *   - Core (Math, Settings, Properties, Input, Easing, TaskManager)
 *   - Loaders (QuickLoader, FontItem, BufItem, EXRLoader, TextureItem)
 *   - WebGL Engine & Post-processing (App, Stage3D, FBO, SMAA, Bloom, FSR)
 *   - 3D Interactive Scenes (Jacks Hero, Space Tunnels, Lunar Moon, FLIP Fluid)
 *   - UI & Audio (Header, Preloader, TransitionOverlay, Audios, VideoOverlay)
 *   - Navigation (ScrollManager, RouteManager, PageManager, Pages)
 */

// Decoupled Three.js
export { default as THREE } from './three.js';

// Core Subsystem
export * from './core/MathUtils.js';
export * from './core/Browser.js';
export * from './core/Settings.js';
export * from './core/Properties.js';
export * from './core/Dynamics.js';
export * from './core/Input.js';
export * from './core/ScrollDomRange.js';
export * from './core/Tween.js';
export * from './core/TaskManager.js';
export * from './core/Ease.js';
export * from './core/Support.js';

// Loaders Subsystem
export { default as quickLoader } from './loaders/QuickLoader.js';
export * from './loaders/items/FontItem.js';
export * from './loaders/items/BufItem.js';
export * from './loaders/items/EXRLoader.js';
export * from './loaders/items/TextureItem.js';

// Audio Subsystem
export * from './audio/AudioGroup.js';
export * from './audio/AudioItem.js';
export * from './audio/Audios.js';
export * from './audio/PageAudios.js';

// WebGL & Postprocessing Subsystem
export * from './webgl/Stage3D.js';
export * from './webgl/FboHelper.js';
export * from './webgl/Blur.js';
export * from './webgl/ShaderHelper.js';
export * from './webgl/BlueNoise.js';
export * from './webgl/TextureHelper.js';
export * from './webgl/ScreenPaint.js';
export * from './webgl/Postprocessing.js';
export * from './webgl/passes/PostEffect.js';
export * from './webgl/passes/Smaa.js';
export * from './webgl/passes/Bloom.js';
export * from './webgl/passes/ScreenPaintDistortion.js';
export * from './webgl/passes/Fsr.js';
export * from './webgl/passes/Final.js';
export * from './webgl/geometry/UfxMesh.js';
export * from './webgl/geometry/Line.js';
export * from './webgl/geometry/SVGParser.js';
export * from './webgl/App.js';

// 3D Interactive Scenes Subsystem
export * from './scenes/hero/HomeBalloons.js';
export * from './scenes/tunnels/GoalTunnels.js';
export * from './scenes/lunar/AboutHero.js';
export * from './scenes/fluid/FlipFluid.js';
export * from './scenes/product/ProjectDetails.js';

// UI Subsystem
export * from './ui/Header.js';
export * from './ui/Preloader.js';
export * from './ui/TransitionOverlay.js';
export * from './ui/Links.js';
export * from './ui/VideoOverlay.js';
export * from './ui/DomHelper.js';
export * from './ui/FooterSection.js';
export * from './ui/UI.js';

// Independent Section Controllers Subsystem
export * from "./sections/index.js";

// Navigation & Pages Subsystem
export * from './navigation/ScrollManager.js';
export * from './navigation/RouteManager.js';
export * from './navigation/pages/Page.js';
export * from './navigation/pages/HomePage.js';
export * from './navigation/pages/AboutPage.js';
export * from './navigation/pages/ServicesPage.js';
export * from './navigation/pages/ContactPage.js';
export * from './navigation/pages/ProjectsPage.js';
export * from './navigation/pages/ProjectPage.js';
export * from './navigation/pages/PlaygroundPage.js';
export * from './navigation/pages/HeroToolsPage.js';
export * from './navigation/PageManager.js';

// ============================================================================
// Runtime Lifecycle Bootstrap
// ============================================================================
import * as THREE from './three.js';
import settings from './core/Settings.js';
import properties from './core/Properties.js';
import input from './core/Input.js';
import taskManager from './core/TaskManager.js';
import Tween from './core/Tween.js';
import ease from './core/Ease.js';
import app from './webgl/App.js';
import ui from './ui/UI.js';
import preloader from './ui/Preloader.js';
import header from './ui/Header.js';
import transitionOverlay from './ui/TransitionOverlay.js';
import routeManager from './navigation/RouteManager.js';
import scrollManager from './navigation/ScrollManager.js';
import pagesManager from './navigation/PageManager.js';
import FontItem from './loaders/items/FontItem.js';

const { Vector2 } = THREE;

let dateTime = performance.now(),
  _needsResize = !1;

function preRun() {
  for (const [o, e] of Object.entries(settings.CROSS_ORIGINS))
    properties.loader.setCrossOrigin(o, e);
  let hasRun = false;
  const onDone = (o) => {
    if (!hasRun && o >= 0.99) {
      hasRun = true;
      run();
    }
  };
  routeManager.init();
  properties.loader.register(FontItem);
  properties.loader.add("Aeonik:400", { type: "font" });
  properties.loader.start(onDone);
  setTimeout(() => {
    if (!hasRun) {
      hasRun = true;
      run();
    }
  }, 300);
}

function run() {
  let o = (properties.viewportWidth = window.innerWidth),
    e = (properties.viewportHeight = window.innerHeight);
  ((properties.viewportResolution = new Vector2(o, e)),
    (properties.width = o),
    (properties.height = e),
    properties.loader.add(
      "Aeonik:500,Aeonik:400:italic,IBMPlexMono:400,IBMPlexMono:500,LusionMono:400",
      { type: "font" },
    ),
    app.initEngine(),
    input.preInit(),
    scrollManager.init(),
    pagesManager.preInit(),
    ui.preInit(),
    app.preInit(),
    window.addEventListener("resize", onResize),
    _onResize(),
    loop(),
    ui.preload(init, start));
}

function init() {
  (input.init(),
    pagesManager.init(),
    ui.init(),
    app.init(),
    (properties.hasInitialized = !0));
}

function start() {
  (ui.start(),
    pagesManager.start(),
    app.start(),
    (properties.hasStarted = !0),
    _onResize(!0),
    (scrollManager.isActive = !0),
    settings.JUMP_SECTION !== "" &&
      scrollManager.scrollTo(settings.JUMP_SECTION, settings.JUMP_OFFSET, !0));
}

function onResize() {
  _needsResize = !0;
}

function _onResize(o) {
  let e = (properties.viewportWidth = window.innerWidth),
    t = (properties.viewportHeight = window.innerHeight);
  (properties.viewportResolution.set(e, window.innerHeight),
    (properties.useMobileLayout = e <= settings.MOBILE_WIDTH),
    document.documentElement.style.setProperty("--vh", t * 0.01 + "px"));
  let r = e * settings.DPR,
    n = t * settings.DPR;
  if (settings.USE_PIXEL_LIMIT === !0 && r * n > settings.MAX_PIXEL_COUNT) {
    let a = r / n;
    ((n = Math.sqrt(settings.MAX_PIXEL_COUNT / a)),
      (r = Math.ceil(n * a)),
      (n = Math.ceil(n)));
  }
  ((properties.width = r),
    (properties.height = n),
    (properties.webglDPR = properties.width / e),
    properties.resolution.set(properties.width, properties.height),
    o || input.resize(),
    scrollManager.resize(e, t),
    pagesManager.resize(e, t),
    ui.resize(e, t, o),
    app.resize(
      Math.ceil(r * properties.upscalerAmount),
      Math.ceil(n * properties.upscalerAmount),
    ),
    scrollManager.resize(e, t));
}

function update(o) {
  ((scrollManager.autoScrollSpeed = properties.autoScrollSpeed),
    window.__AUTO_SCROLL__ &&
      (scrollManager.autoScrollSpeed = window.__AUTO_SCROLL__),
    taskManager.update(),
    properties.reset(),
    app.preUpdate(o),
    input.update(o),
    scrollManager.update(o),
    pagesManager.update(o),
    ui.update(o),
    app.update(o),
    input.postUpdate(o));
}

let _lastLoopTime = performance.now();
function loop() {
  window.requestAnimationFrame(loop);
  _lastLoopTime = performance.now();
  let o = performance.now(),
    e = (o - dateTime) / 1e3;
  ((dateTime = o),
    (e = Math.min(e, 1 / 20)),
    _needsResize && _onResize(),
    properties.hasStarted && (properties.startTime += e),
    Tween.autoUpdate(e),
    update(e),
    (_needsResize = !1));
}



globalThis.preRun = preRun;
globalThis.run = run;
globalThis.init = init;
globalThis.start = start;
globalThis.onResize = onResize;
globalThis.loop = loop;

if (typeof window !== "undefined") {
  Object.assign ||
    document.documentElement.classList.add(
      "not-supported not-supported--browser",
    );
  document.documentElement.classList.remove("no-js");
  /(ipad|iphone|android)/i.test(
    (navigator.userAgent || navigator.vendor).toLowerCase(),
  )
    ? document.documentElement.classList.add("is-mobile")
    : document.documentElement.classList.add("is-desktop");
  function preventZoom(o) {
    (o.preventDefault(), (document.body.style.zoom = 1));
  }
  window.addEventListener("wheel", (o) => o.preventDefault(), { passive: !1 });
  document.addEventListener("gesturestart", (o) => preventZoom(o));
  document.addEventListener("gesturechange", (o) => preventZoom(o));
  document.addEventListener("gestureend", (o) => preventZoom(o));

  function startRuntime() {
    if (!window.__KYNDEV_RUNTIME_INITIALIZED__) {
      window.__KYNDEV_RUNTIME_INITIALIZED__ = true;
      try {
        preRun();
      } catch (err) {
        console.error("[KYNDEV Runtime preRun Error]:", err);
        window.__PRE_RUN_ERROR__ = err.stack || err.message;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startRuntime);
  } else {
    startRuntime();
  }
}

export { preRun, run, init, start, onResize, loop };
