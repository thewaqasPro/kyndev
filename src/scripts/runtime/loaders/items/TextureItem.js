/**
 * Texture and Three.js Asset Loaders
 */
import * as THREE from "../../three.js";
import properties from "../../core/Properties.js";
const ImageItem = properties.loader.ITEM_CLASSES.image;
class TextureItem extends ImageItem {
  constructor(e, t) {
    let r = t.content || new Texture(new Image());
    switch (
      ((t.content = r.image),
      (r.size = new Vector2()),
      (r.minFilter = t.minFilter || LinearMipMapLinearFilter),
      r.minFilter)
    ) {
      case NearestMipMapNearestFilter:
      case NearestMipMapLinearFilter:
      case LinearMipMapNearestFilter:
      case LinearMipMapLinearFilter:
        ((r.generateMipmaps = !0),
          (r.anisotropy =
            t.anisotropy ||
            properties.renderer.capabilities.getMaxAnisotropy()));
        break;
      default:
        r.generateMipmaps = !1;
    }
    ((r.flipY = t.flipY === void 0 ? !0 : t.flipY),
      t.wrap
        ? (r.wrapS = r.wrapT = t.wrap)
        : (t.wrapS && (r.wrapS = t.wrapS), t.wrapT && (r.wrapT = t.wrapT)),
      super(e, t),
      (this.content = r));
  }
  retrieve() {
    return !1;
  }
  load() {
    this.isStartLoaded = !0;
    let e = this.content.image;
    e.onload = this.boundOnLoad;
    e.onerror = this.boundOnLoad;
    e.src = this.url;
  }
  _onLoad() {
    delete this.content.image.onload;
    this.width = this.content.image.width || 1;
    ((this.height = this.content.image.height || 1),
      this.content.size.set(this.width, this.height),
      (this.content.needsUpdate = !0),
      taskManager.add(this.content),
      this.onPost
        ? this.onPost.call(this, this.content, this.onPostLoadingSignal)
        : this._onLoadComplete());
  }
}
TextureItem.type = "texture";
TextureItem.extensions = [];
const AnyItem$1 = properties.loader.ITEM_CLASSES.any;
class ThreeLoaderItem extends AnyItem$1 {
  constructor(e, t) {
    ((t.loadFunc = () => {}),
      (t.hasLoading = t.hasLoading === void 0 ? !0 : t.hasLoading),
      super(e, t),
      !t.loader &&
        console &&
        (console.error || console.log)("loader is required."),
      (this.loadFunc = this._loadFunc.bind(this)));
  }
  _loadFunc(e, t, r) {
    this.loader.load(
      e,
      this._onLoaderLoad.bind(this, t),
      this._onLoaderLoading.bind(this, r),
    );
  }
  _onLoaderLoad(e, t) {
    ((this.content = t), e(t));
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
ThreeLoaderItem.type = "three-loader";
ThreeLoaderItem.extensions = [];
const shader = `#define GLSLIFY 1
uniform vec2 u_glPositionOffset;vec4 glPositionOffset(vec4 glPosition){return glPosition+vec4(u_glPositionOffset*glPosition.w,0.0,0.0);}`;

export { TextureItem, ThreeLoaderItem };

globalThis.TextureItem = TextureItem;
globalThis.ThreeLoaderItem = ThreeLoaderItem;
