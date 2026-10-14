import THREE from "../three.js";
/**
 * Browser detection & hardware capabilities
 */
var isSSR = typeof window > "u",
  DetectUA = (function () {
    function o(e) {
      ((this.userAgent =
        e || (!isSSR && window.navigator ? window.navigator.userAgent : "")),
        (this.isAndroidDevice =
          !/like android/i.test(this.userAgent) &&
          /android/i.test(this.userAgent)),
        (this.iOSDevice = this.match(1, /(iphone|ipod|ipad)/i).toLowerCase()),
        !isSSR &&
          navigator.platform === "MacIntel" &&
          navigator.maxTouchPoints > 2 &&
          !window.MSStream &&
          (this.iOSDevice = "ipad"));
    }
    return (
      (o.prototype.match = function (e, t) {
        var r = this.userAgent.match(t);
        return (r && r.length > 1 && r[e]) || "";
      }),
      Object.defineProperty(o.prototype, "isMobile", {
        get: function () {
          return (
            !this.isTablet &&
            (/[^-]mobi/i.test(this.userAgent) ||
              this.iOSDevice === "iphone" ||
              this.iOSDevice === "ipod" ||
              this.isAndroidDevice ||
              /nexus\s*[0-6]\s*/i.test(this.userAgent))
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isTablet", {
        get: function () {
          return (
            (/tablet/i.test(this.userAgent) &&
              !/tablet pc/i.test(this.userAgent)) ||
            this.iOSDevice === "ipad" ||
            (this.isAndroidDevice && !/[^-]mobi/i.test(this.userAgent)) ||
            (!/nexus\s*[0-6]\s*/i.test(this.userAgent) &&
              /nexus\s*[0-9]+/i.test(this.userAgent))
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isDesktop", {
        get: function () {
          return !this.isMobile && !this.isTablet;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isMacOS", {
        get: function () {
          return (
            /macintosh/i.test(this.userAgent) && {
              version: this.match(1, /mac os x (\d+(\.?_?\d+)+)/i)
                .replace(/[_\s]/g, ".")
                .split(".")
                .map(function (e) {
                  return e;
                })[1],
            }
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isWindows", {
        get: function () {
          return (
            /windows /i.test(this.userAgent) && {
              version: this.match(1, /Windows ((NT|XP)( \d\d?.\d)?)/i),
            }
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isiOS", {
        get: function () {
          return (
            !!this.iOSDevice && {
              version:
                this.match(1, /os (\d+([_\s]\d+)*) like mac os x/i).replace(
                  /[_\s]/g,
                  ".",
                ) || this.match(1, /version\/(\d+(\.\d+)?)/i),
            }
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "isAndroid", {
        get: function () {
          return (
            this.isAndroidDevice && {
              version: this.match(1, /android[ \/-](\d+(\.\d+)*)/i),
            }
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "browser", {
        get: function () {
          var e = this.match(1, /version\/(\d+(\.\d+)?)/i);
          return /opera/i.test(this.userAgent)
            ? {
                name: "Opera",
                version:
                  e || this.match(1, /(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
              }
            : /opr\/|opios/i.test(this.userAgent)
              ? {
                  name: "Opera",
                  version:
                    this.match(1, /(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || e,
                }
              : /SamsungBrowser/i.test(this.userAgent)
                ? {
                    name: "Samsung Internet for Android",
                    version:
                      e ||
                      this.match(1, /(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
                  }
                : /yabrowser/i.test(this.userAgent)
                  ? {
                      name: "Yandex Browser",
                      version:
                        e || this.match(1, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
                    }
                  : /ucbrowser/i.test(this.userAgent)
                    ? {
                        name: "UC Browser",
                        version: this.match(
                          1,
                          /(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i,
                        ),
                      }
                    : /msie|trident/i.test(this.userAgent)
                      ? {
                          name: "Internet Explorer",
                          version: this.match(1, /(?:msie |rv:)(\d+(\.\d+)?)/i),
                        }
                      : /(edge|edgios|edga|edg)/i.test(this.userAgent)
                        ? {
                            name: "Microsoft Edge",
                            version: this.match(
                              2,
                              /(edge|edgios|edga|edg)\/(\d+(\.\d+)?)/i,
                            ),
                          }
                        : /firefox|iceweasel|fxios/i.test(this.userAgent)
                          ? {
                              name: "Firefox",
                              version: this.match(
                                1,
                                /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i,
                              ),
                            }
                          : /chromium/i.test(this.userAgent)
                            ? {
                                name: "Chromium",
                                version:
                                  this.match(
                                    1,
                                    /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i,
                                  ) || e,
                              }
                            : /chrome|crios|crmo/i.test(this.userAgent)
                              ? {
                                  name: "Chrome",
                                  version: this.match(
                                    1,
                                    /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i,
                                  ),
                                }
                              : /safari|applewebkit/i.test(this.userAgent)
                                ? { name: "Safari", version: e }
                                : {
                                    name: this.match(1, /^(.*)\/(.*) /),
                                    version: this.match(2, /^(.*)\/(.*) /),
                                  };
        },
        enumerable: !1,
        configurable: !0,
      }),
      o
    );
  })();
ColorManagement.enabled = !1;
let detectUA = new DetectUA(),
  userAgent = (navigator.userAgent || navigator.vendor).toLowerCase(),
  browserName = detectUA.browser.name,
  audioElem = document.createElement("audio");
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
globalThis.browser = browser$1;
globalThis.browser$1 = browser$1;
let CDN_PATH = "";
/* local assets */ CDN_PATH = "";
window.location.hostname == "lusion.dev" &&
  (window.location.href =
    "https://lusion.co" + window.location.pathname + window.location.search);

export { Browser, browser$1, browser$1 as browser };
export default browser$1;
