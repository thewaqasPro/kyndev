/**
 * Three.js decoupled runtime module
 * Binds official three to globalThis/window for legacy shader chunks and compatibility.
 */
import * as THREE from 'three';

if (typeof globalThis !== 'undefined') {
  globalThis.THREE = THREE;
  globalThis.__THREE__ = THREE.REVISION;

  // Preserve native Web Audio API AudioContext constructor before Three.js assignment
  const NativeAudioContext = typeof window !== 'undefined'
    ? (window.AudioContext || window.webkitAudioContext)
    : (globalThis.AudioContext || globalThis.webkitAudioContext);

  Object.assign(globalThis, THREE);

  if (NativeAudioContext) {
    globalThis.AudioContext = NativeAudioContext;
    if (typeof window !== 'undefined') {
      window.AudioContext = NativeAudioContext;
    }
  }

  globalThis.commonjsGlobal$1 = globalThis;
  globalThis.isServerRuntime = typeof window === "undefined";

  function getDefaultExportFromCjs(o) {
    return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")
      ? o.default
      : o;
  }
  globalThis.getDefaultExportFromCjs = getDefaultExportFromCjs;
}

export default THREE;
export * from 'three';
