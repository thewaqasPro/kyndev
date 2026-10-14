/**
 * Video Reel Modal Player & Sync Connector
 */
/*! @vimeo/player v2.30.4 | (c) 2026 Vimeo | MIT License | https://github.com/vimeo/player.js */ const isNode =
    typeof global < "u" && {}.toString.call(global) === "[object global]",
  isBun = typeof Bun < "u",
  isDeno = typeof Deno < "u",
  isCloudflareWorker =
    typeof WebSocketPair == "function" && typeof caches?.default < "u",
  isServerRuntime = isNode || isBun || isDeno || isCloudflareWorker;
function getMethodName(o, e) {
  return o.indexOf(e.toLowerCase()) === 0
    ? o
    : `${e.toLowerCase()}${o.substr(0, 1).toUpperCase()}${o.substr(1)}`;
}
function isDomElement(o) {
  return !!(
    o &&
    o.nodeType === 1 &&
    "nodeName" in o &&
    o.ownerDocument &&
    o.ownerDocument.defaultView
  );
}
function isInteger(o) {
  return !isNaN(parseFloat(o)) && isFinite(o) && Math.floor(o) == o;
}
function isVimeoUrl(o) {
  return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))(?=$|\/)/.test(
    o,
  );
}
function isVimeoEmbed(o) {
  return /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))\/video\/\d+/.test(
    o,
  );
}
function getOembedDomain(o) {
  const e = (o || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/),
    t = ((e && e[1]) || "").replace("player.", ""),
    r = [".videoji.hk", ".vimeo.work", ".videoji.cn"];
  for (const n of r) if (t.endsWith(n)) return t;
  return "vimeo.com";
}
function getVimeoUrl() {
  let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const e = o.id,
    t = o.url,
    r = e || t;
  if (!r)
    throw new Error(
      "An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.",
    );
  if (isInteger(r)) return `https://vimeo.com/${r}`;
  if (isVimeoUrl(r)) return r.replace("http:", "https:");
  throw e
    ? new TypeError(`“${e}” is not a valid video id.`)
    : new TypeError(`“${r}” is not a vimeo.com url.`);
}
const subscribe = function (o, e, t) {
  let r =
      arguments.length > 3 && arguments[3] !== void 0
        ? arguments[3]
        : "addEventListener",
    n =
      arguments.length > 4 && arguments[4] !== void 0
        ? arguments[4]
        : "removeEventListener";
  const a = typeof e == "string" ? [e] : e;
  return (
    a.forEach((l) => {
      o[r](l, t);
    }),
    { cancel: () => a.forEach((l) => o[n](l, t)) }
  );
};
function findIframeBySourceWindow(o) {
  let e =
    arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
  if (!o || !e || typeof e.querySelectorAll != "function") return null;
  const t = e.querySelectorAll("iframe");
  for (let r = 0; r < t.length; r++)
    if (t[r] && t[r].contentWindow === o) return t[r];
  return null;
}
const arrayIndexOfSupport = typeof Array.prototype.indexOf < "u",
  postMessageSupport = typeof window < "u" && typeof window.postMessage < "u";
if (!isServerRuntime && (!arrayIndexOfSupport || !postMessageSupport))
  throw new Error(
    "Sorry, the Vimeo Player API is not available in this browser.",
  );
var commonjsGlobal =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function createCommonjsModule(o, e) {
  return ((e = { exports: {} }), o(e, e.exports), e.exports);
}
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */ (function (o) {
  if (o.WeakMap) return;
  var e = Object.prototype.hasOwnProperty,
    t =
      Object.defineProperty &&
      (function () {
        try {
          return Object.defineProperty({}, "x", { value: 1 }).x === 1;
        } catch {}
      })(),
    r = function (a, l, c) {
      t
        ? Object.defineProperty(a, l, {
            configurable: !0,
            writable: !0,
            value: c,
          })
        : (a[l] = c);
    };
  o.WeakMap = (function () {
    function a() {
      if (this === void 0)
        throw new TypeError("Constructor WeakMap requires 'new'");
      if ((r(this, "_id", c("_WeakMap")), arguments.length > 0))
        throw new TypeError("WeakMap iterable is not supported");
    }
    (r(a.prototype, "delete", function (f) {
      if ((l(this, "delete"), !n(f))) return !1;
      var p = f[this._id];
      return p && p[0] === f ? (delete f[this._id], !0) : !1;
    }),
      r(a.prototype, "get", function (f) {
        if ((l(this, "get"), !!n(f))) {
          var p = f[this._id];
          if (p && p[0] === f) return p[1];
        }
      }),
      r(a.prototype, "has", function (f) {
        if ((l(this, "has"), !n(f))) return !1;
        var p = f[this._id];
        return !!(p && p[0] === f);
      }),
      r(a.prototype, "set", function (f, p) {
        if ((l(this, "set"), !n(f)))
          throw new TypeError("Invalid value used as weak map key");
        var g = f[this._id];
        return g && g[0] === f
          ? ((g[1] = p), this)
          : (r(f, this._id, [f, p]), this);
      }));
    function l(f, p) {
      if (!n(f) || !e.call(f, "_id"))
        throw new TypeError(
          p + " method called on incompatible receiver " + typeof f,
        );
    }
    function c(f) {
      return f + "_" + u() + "." + u();
    }
    function u() {
      return Math.random().toString().substring(2);
    }
    return (r(a, "_polyfill", !0), a);
  })();
  function n(a) {
    return Object(a) === a;
  }
})(
  typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : commonjsGlobal,
);
var npo_src = createCommonjsModule(function (o) {
  /*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/ (function (t, r, n) {
    ((r[t] = r[t] || n()), o.exports && (o.exports = r[t]));
  })("Promise", commonjsGlobal, function () {
    var t,
      r,
      n,
      a = Object.prototype.toString,
      l =
        typeof setImmediate < "u"
          ? function (w) {
              return setImmediate(w);
            }
          : setTimeout;
    try {
      (Object.defineProperty({}, "x", {}),
        (t = function (w, R, E, I) {
          return Object.defineProperty(w, R, {
            value: E,
            writable: !0,
            configurable: I !== !1,
          });
        }));
    } catch {
      t = function (R, E, I) {
        return ((R[E] = I), R);
      };
    }
    n = (function () {
      var w, R, E;
      function I(F, k) {
        ((this.fn = F), (this.self = k), (this.next = void 0));
      }
      return {
        add: function (k, L) {
          ((E = new I(k, L)),
            R ? (R.next = E) : (w = E),
            (R = E),
            (E = void 0));
        },
        drain: function () {
          var k = w;
          for (w = R = r = void 0; k;) (k.fn.call(k.self), (k = k.next));
        },
      };
    })();
    function c(C, w) {
      (n.add(C, w), r || (r = l(n.drain)));
    }
    function u(C) {
      var w,
        R = typeof C;
      return (
        C != null && (R == "object" || R == "function") && (w = C.then),
        typeof w == "function" ? w : !1
      );
    }
    function f() {
      for (var C = 0; C < this.chain.length; C++)
        p(
          this,
          this.state === 1 ? this.chain[C].success : this.chain[C].failure,
          this.chain[C],
        );
      this.chain.length = 0;
    }
    function p(C, w, R) {
      var E, I;
      try {
        w === !1
          ? R.reject(C.msg)
          : (w === !0 ? (E = C.msg) : (E = w.call(void 0, C.msg)),
            E === R.promise
              ? R.reject(TypeError("Promise-chain cycle"))
              : (I = u(E))
                ? I.call(E, R.resolve, R.reject)
                : R.resolve(E));
      } catch (F) {
        R.reject(F);
      }
    }
    function g(C) {
      var w,
        R = this;
      if (!R.triggered) {
        ((R.triggered = !0), R.def && (R = R.def));
        try {
          (w = u(C))
            ? c(function () {
                var E = new T(R);
                try {
                  w.call(
                    C,
                    function () {
                      g.apply(E, arguments);
                    },
                    function () {
                      v.apply(E, arguments);
                    },
                  );
                } catch (I) {
                  v.call(E, I);
                }
              })
            : ((R.msg = C), (R.state = 1), R.chain.length > 0 && c(f, R));
        } catch (E) {
          v.call(new T(R), E);
        }
      }
    }
    function v(C) {
      var w = this;
      w.triggered ||
        ((w.triggered = !0),
        w.def && (w = w.def),
        (w.msg = C),
        (w.state = 2),
        w.chain.length > 0 && c(f, w));
    }
    function _(C, w, R, E) {
      for (var I = 0; I < w.length; I++)
        (function (k) {
          C.resolve(w[k]).then(function (D) {
            R(k, D);
          }, E);
        })(I);
    }
    function T(C) {
      ((this.def = C), (this.triggered = !1));
    }
    function M(C) {
      ((this.promise = C),
        (this.state = 0),
        (this.triggered = !1),
        (this.chain = []),
        (this.msg = void 0));
    }
    function S(C) {
      if (typeof C != "function") throw TypeError("Not a function");
      if (this.__NPO__ !== 0) throw TypeError("Not a promise");
      this.__NPO__ = 1;
      var w = new M(this);
      ((this.then = function (E, I) {
        var F = {
          success: typeof E == "function" ? E : !0,
          failure: typeof I == "function" ? I : !1,
        };
        return (
          (F.promise = new this.constructor(function (L, D) {
            if (typeof L != "function" || typeof D != "function")
              throw TypeError("Not a function");
            ((F.resolve = L), (F.reject = D));
          })),
          w.chain.push(F),
          w.state !== 0 && c(f, w),
          F.promise
        );
      }),
        (this.catch = function (E) {
          return this.then(void 0, E);
        }));
      try {
        C.call(
          void 0,
          function (E) {
            g.call(w, E);
          },
          function (E) {
            v.call(w, E);
          },
        );
      } catch (R) {
        v.call(w, R);
      }
    }
    var b = t({}, "constructor", S, !1);
    return (
      (S.prototype = b),
      t(b, "__NPO__", 0, !1),
      t(S, "resolve", function (w) {
        var R = this;
        return w && typeof w == "object" && w.__NPO__ === 1
          ? w
          : new R(function (I, F) {
              if (typeof I != "function" || typeof F != "function")
                throw TypeError("Not a function");
              I(w);
            });
      }),
      t(S, "reject", function (w) {
        return new this(function (E, I) {
          if (typeof E != "function" || typeof I != "function")
            throw TypeError("Not a function");
          I(w);
        });
      }),
      t(S, "all", function (w) {
        var R = this;
        return a.call(w) != "[object Array]"
          ? R.reject(TypeError("Not an array"))
          : w.length === 0
            ? R.resolve([])
            : new R(function (I, F) {
                if (typeof I != "function" || typeof F != "function")
                  throw TypeError("Not a function");
                var k = w.length,
                  L = Array(k),
                  D = 0;
                _(
                  R,
                  w,
                  function (re, ce) {
                    ((L[re] = ce), ++D === k && I(L));
                  },
                  F,
                );
              });
      }),
      t(S, "race", function (w) {
        var R = this;
        return a.call(w) != "[object Array]"
          ? R.reject(TypeError("Not an array"))
          : new R(function (I, F) {
              if (typeof I != "function" || typeof F != "function")
                throw TypeError("Not a function");
              _(
                R,
                w,
                function (L, D) {
                  I(D);
                },
                F,
              );
            });
      }),
      S
    );
  });
});
const callbackMap = new WeakMap();
function storeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  (e in r || (r[e] = []), r[e].push(t), callbackMap.set(o.element, r));
}
function getCallbacks(o, e) {
  return (callbackMap.get(o.element) || {})[e] || [];
}
function removeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  if (!r[e]) return !0;
  if (!t) return ((r[e] = []), callbackMap.set(o.element, r), !0);
  const n = r[e].indexOf(t);
  return (
    n !== -1 && r[e].splice(n, 1),
    callbackMap.set(o.element, r),
    r[e] && r[e].length === 0
  );
}
function shiftCallbacks(o, e) {
  const t = getCallbacks(o, e);
  if (t.length < 1) return !1;
  const r = t.shift();
  return (removeCallback(o, e, r), r);
}
function swapCallbacks(o, e) {
  const t = callbackMap.get(o);
  (callbackMap.set(e, t), callbackMap.delete(o));
}
function parseMessageData(o) {
  if (typeof o == "string")
    try {
      o = JSON.parse(o);
    } catch (e) {
      return (console.warn(e), {});
    }
  return o;
}
function postMessage(o, e, t) {
  if (!o.element.contentWindow || !o.element.contentWindow.postMessage) return;
  let r = { method: e };
  t !== void 0 && (r.value = t);
  const n = parseFloat(
    navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"),
  );
  (n >= 8 && n < 10 && (r = JSON.stringify(r)),
    o.element.contentWindow.postMessage(r, o.origin));
}
function processData(o, e) {
  e = parseMessageData(e);
  let t = [],
    r;
  if (e.event)
    (e.event === "error" &&
      getCallbacks(o, e.data.method).forEach((a) => {
        const l = new Error(e.data.message);
        ((l.name = e.data.name),
          a.reject(l),
          removeCallback(o, e.data.method, a));
      }),
      (t = getCallbacks(o, `event:${e.event}`)),
      (r = e.data));
  else if (e.method) {
    const n = shiftCallbacks(o, e.method);
    n && (t.push(n), (r = e.value));
  }
  t.forEach((n) => {
    try {
      if (typeof n == "function") {
        n.call(o, r);
        return;
      }
      n.resolve(r);
    } catch {}
  });
}
const oEmbedParameters = [
  "airplay",
  "audio_tracks",
  "audiotrack",
  "autopause",
  "autoplay",
  "background",
  "byline",
  "cc",
  "chapter_id",
  "chapters",
  "chromecast",
  "color",
  "colors",
  "controls",
  "disable_context_menu",
  "dnt",
  "end_time",
  "fullscreen",
  "height",
  "id",
  "initial_quality",
  "interactive_params",
  "keyboard",
  "loop",
  "maxheight",
  "max_quality",
  "maxwidth",
  "min_quality",
  "muted",
  "play_button_position",
  "playsinline",
  "portrait",
  "preload",
  "progress_bar",
  "quality",
  "quality_selector",
  "responsive",
  "skipping_forward",
  "speed",
  "start_time",
  "texttrack",
  "thumbnail_id",
  "title",
  "transcript",
  "transparent",
  "unmute_button",
  "url",
  "vimeo_logo",
  "volume",
  "watch_full_video",
  "width",
];
function getOEmbedParameters(o) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return oEmbedParameters.reduce((t, r) => {
    const n = o.getAttribute(`data-vimeo-${r}`);
    return ((n || n === "") && (t[r] = n === "" ? 1 : n), t);
  }, e);
}
function createEmbed(o, e) {
  let { html: t } = o;
  if (!e) throw new TypeError("An element must be provided");
  if (e.getAttribute("data-vimeo-initialized") !== null)
    return e.querySelector("iframe");
  const r = document.createElement("div");
  return (
    (r.innerHTML = t),
    e.appendChild(r.firstChild),
    e.setAttribute("data-vimeo-initialized", "true"),
    e.querySelector("iframe")
  );
}
function getOEmbedData(o) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    t = arguments.length > 2 ? arguments[2] : void 0;
  return new Promise((r, n) => {
    if (!isVimeoUrl(o)) throw new TypeError(`“${o}” is not a vimeo.com url.`);
    let l = `https://${getOembedDomain(o)}/api/oembed.json?url=${encodeURIComponent(o)}`;
    for (const u in e)
      e.hasOwnProperty(u) && (l += `&${u}=${encodeURIComponent(e[u])}`);
    const c =
      "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    (c.open("GET", l, !0),
      (c.onload = function () {
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
            (createEmbed(u, t), n(new Error(`“${o}” is not embeddable.`)));
            return;
          }
          r(u);
        } catch (u) {
          n(u);
        }
      }),
      (c.onerror = function () {
        const u = c.status ? ` (${c.status})` : "";
        n(
          new Error(
            `There was an error fetching the embed code from Vimeo${u}.`,
          ),
        );
      }),
      c.send());
  });
}
function initializeEmbeds() {
  let o =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  const e = [].slice.call(
      o.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"),
    ),
    t = (r) => {
      "console" in window &&
        console.error &&
        console.error(`There was an error creating an embed: ${r}`);
    };
  e.forEach((r) => {
    try {
      if (r.getAttribute("data-vimeo-defer") !== null) return;
      const n = getOEmbedParameters(r),
        a = getVimeoUrl(n);
      getOEmbedData(a, n, r)
        .then((l) => createEmbed(l, r))
        .catch(t);
    } catch (n) {
      t(n);
    }
  });
}
function resizeEmbeds() {
  let o =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoPlayerResizeEmbeds_) return;
  window.VimeoPlayerResizeEmbeds_ = !0;
  const e = (t) => {
    if (!isVimeoUrl(t.origin) || !t.data || t.data.event !== "spacechange")
      return;
    const r = t.source ? findIframeBySourceWindow(t.source, o) : null;
    if (r) {
      const n = r.parentElement;
      n.style.paddingBottom = `${t.data.data[0].bottom}px`;
    }
  };
  window.addEventListener("message", e);
}
function initAppendVideoMetadata() {
  let o =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoSeoMetadataAppended) return;
  window.VimeoSeoMetadataAppended = !0;
  const e = (t) => {
    if (!isVimeoUrl(t.origin)) return;
    const r = parseMessageData(t.data);
    if (!r || r.event !== "ready") return;
    const n = t.source ? findIframeBySourceWindow(t.source, o) : null;
    n &&
      isVimeoEmbed(n.src) &&
      new Player(n).callMethod("appendVideoMetadata", window.location.href);
  };
  window.addEventListener("message", e);
}
function checkUrlTimeParam() {
  let o =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoCheckedUrlTimeParam) return;
  window.VimeoCheckedUrlTimeParam = !0;
  const e = (r) => {
      "console" in window &&
        console.error &&
        console.error(`There was an error getting video Id: ${r}`);
    },
    t = (r) => {
      if (!isVimeoUrl(r.origin)) return;
      const n = parseMessageData(r.data);
      if (!n || n.event !== "ready") return;
      const a = r.source ? findIframeBySourceWindow(r.source, o) : null;
      if (a && isVimeoEmbed(a.src)) {
        const l = new Player(a);
        l.getVideoId()
          .then((c) => {
            const u = new RegExp(`[?&]vimeo_t_${c}=([^&#]*)`).exec(
              window.location.href,
            );
            if (u && u[1]) {
              const f = decodeURI(u[1]);
              l.setCurrentTime(f);
            }
          })
          .catch(e);
      }
    };
  window.addEventListener("message", t);
}
function updateDRMEmbeds() {
  if (window.VimeoDRMEmbedsUpdated) return;
  window.VimeoDRMEmbedsUpdated = !0;
  const o = (e) => {
    if (!isVimeoUrl(e.origin)) return;
    const t = parseMessageData(e.data);
    if (!t || t.event !== "drminitfailed") return;
    const r = e.source ? findIframeBySourceWindow(e.source) : null;
    if (!r) return;
    const n = r.getAttribute("allow") || "";
    if (!n.includes("encrypted-media")) {
      r.setAttribute("allow", `${n}; encrypted-media`);
      const l = new URL(r.getAttribute("src"));
      (l.searchParams.set("forcereload", "drm"),
        r.setAttribute("src", l.toString()));
      return;
    }
  };
  window.addEventListener("message", o);
}
function initializeScreenfull() {
  const o = (function () {
      let r;
      const n = [
        [
          "requestFullscreen",
          "exitFullscreen",
          "fullscreenElement",
          "fullscreenEnabled",
          "fullscreenchange",
          "fullscreenerror",
        ],
        [
          "webkitRequestFullscreen",
          "webkitExitFullscreen",
          "webkitFullscreenElement",
          "webkitFullscreenEnabled",
          "webkitfullscreenchange",
          "webkitfullscreenerror",
        ],
        [
          "webkitRequestFullScreen",
          "webkitCancelFullScreen",
          "webkitCurrentFullScreenElement",
          "webkitCancelFullScreen",
          "webkitfullscreenchange",
          "webkitfullscreenerror",
        ],
        [
          "mozRequestFullScreen",
          "mozCancelFullScreen",
          "mozFullScreenElement",
          "mozFullScreenEnabled",
          "mozfullscreenchange",
          "mozfullscreenerror",
        ],
        [
          "msRequestFullscreen",
          "msExitFullscreen",
          "msFullscreenElement",
          "msFullscreenEnabled",
          "MSFullscreenChange",
          "MSFullscreenError",
        ],
      ];
      let a = 0;
      const l = n.length,
        c = {};
      for (; a < l; a++)
        if (((r = n[a]), r && r[1] in document)) {
          for (a = 0; a < r.length; a++) c[n[0][a]] = r[a];
          return c;
        }
      return !1;
    })(),
    e = {
      fullscreenchange: o.fullscreenchange,
      fullscreenerror: o.fullscreenerror,
    },
    t = {
      request(r) {
        return new Promise((n, a) => {
          const l = function () {
            (t.off("fullscreenchange", l), n());
          };
          (t.on("fullscreenchange", l), (r = r || document.documentElement));
          const c = r[o.requestFullscreen]();
          c instanceof Promise && c.then(l).catch(a);
        });
      },
      exit() {
        return new Promise((r, n) => {
          if (!t.isFullscreen) {
            r();
            return;
          }
          const a = function () {
            (t.off("fullscreenchange", a), r());
          };
          t.on("fullscreenchange", a);
          const l = document[o.exitFullscreen]();
          l instanceof Promise && l.then(a).catch(n);
        });
      },
      on(r, n) {
        const a = e[r];
        a && document.addEventListener(a, n);
      },
      off(r, n) {
        const a = e[r];
        a && document.removeEventListener(a, n);
      },
    };
  return (
    Object.defineProperties(t, {
      isFullscreen: {
        get() {
          return !!document[o.fullscreenElement];
        },
      },
      element: {
        enumerable: !0,
        get() {
          return document[o.fullscreenElement];
        },
      },
      isEnabled: {
        enumerable: !0,
        get() {
          return !!document[o.fullscreenEnabled];
        },
      },
    }),
    t
  );
}
const defaultOptions = {
  role: "viewer",
  autoPlayMuted: !0,
  allowedDrift: 0.3,
  maxAllowedDrift: 1,
  minCheckInterval: 0.1,
  maxRateAdjustment: 0.2,
  maxTimeToCatchUp: 1,
};
class TimingSrcConnector extends EventTarget {
  logger;
  constructor(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      n = arguments.length > 3 ? arguments[3] : void 0;
    (super(), (this.logger = n), this.init(t, e, { ...defaultOptions, ...r }));
  }
  disconnect() {
    this.dispatchEvent(new Event("disconnect"));
  }
  async init(e, t, r) {
    if ((await this.waitForTOReadyState(e, "open"), r.role === "viewer")) {
      await this.updatePlayer(e, t, r);
      const n = subscribe(e, "change", () => this.updatePlayer(e, t, r)),
        a = this.maintainPlaybackPosition(e, t, r);
      this.addEventListener("disconnect", () => {
        (a.cancel(), n.cancel());
      });
    } else {
      await this.updateTimingObject(e, t);
      const n = subscribe(
        t,
        ["seeked", "play", "pause", "ratechange"],
        () => this.updateTimingObject(e, t),
        "on",
        "off",
      );
      this.addEventListener("disconnect", () => n.cancel());
    }
  }
  async updateTimingObject(e, t) {
    const [r, n, a] = await Promise.all([
      t.getCurrentTime(),
      t.getPaused(),
      t.getPlaybackRate(),
    ]);
    e.update({ position: r, velocity: n ? 0 : a });
  }
  async updatePlayer(e, t, r) {
    const { position: n, velocity: a } = e.query();
    (typeof n == "number" && t.setCurrentTime(n),
      typeof a == "number" &&
        (a === 0
          ? (await t.getPaused()) === !1 && t.pause()
          : a > 0 &&
            ((await t.getPaused()) === !0 &&
              (await t.play().catch(async (l) => {
                l.name === "NotAllowedError" &&
                  r.autoPlayMuted &&
                  (await t.setMuted(!0),
                  await t
                    .play()
                    .catch((c) =>
                      console.error(
                        "Couldn't play the video from TimingSrcConnector. Error:",
                        c,
                      ),
                    ));
              }),
              this.updatePlayer(e, t, r)),
            (await t.getPlaybackRate()) !== a && t.setPlaybackRate(a))));
  }
  maintainPlaybackPosition(e, t, r) {
    const {
        allowedDrift: n,
        maxAllowedDrift: a,
        minCheckInterval: l,
        maxRateAdjustment: c,
        maxTimeToCatchUp: u,
      } = r,
      f = Math.min(u, Math.max(l, a)) * 1e3,
      p = async () => {
        if (e.query().velocity === 0 || (await t.getPaused()) === !0) return;
        const v = e.query().position - (await t.getCurrentTime()),
          _ = Math.abs(v);
        if ((this.log(`Drift: ${v}`), _ > a))
          (await this.adjustSpeed(t, 0),
            t.setCurrentTime(e.query().position),
            this.log("Resync by currentTime"));
        else if (_ > n) {
          const T = _ / u,
            M = c,
            S = T < M ? (M - T) / 2 : M;
          (await this.adjustSpeed(t, S * Math.sign(v)),
            this.log("Resync by playbackRate"));
        }
      },
      g = setInterval(() => p(), f);
    return { cancel: () => clearInterval(g) };
  }
  log(e) {
    this.logger?.(`TimingSrcConnector: ${e}`);
  }
  speedAdjustment = 0;
  adjustSpeed = async (e, t) => {
    if (this.speedAdjustment === t) return;
    const r = (await e.getPlaybackRate()) - this.speedAdjustment + t;
    (this.log(`New playbackRate:  ${r}`),
      await e.setPlaybackRate(r),
      (this.speedAdjustment = t));
  };
  waitForTOReadyState(e, t) {
    return new Promise((r) => {
      const n = () => {
        e.readyState === t
          ? r()
          : e.addEventListener("readystatechange", n, { once: !0 });
      };
      n();
    });
  }
}
const playerMap = new WeakMap(),
  readyMap = new WeakMap();
let screenfull = {};
class Player {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (
      (window.jQuery &&
        e instanceof jQuery &&
        (e.length > 1 &&
          window.console &&
          console.warn &&
          console.warn(
            "A jQuery object with multiple elements was passed, using the first element.",
          ),
        (e = e[0])),
      typeof document < "u" &&
        typeof e == "string" &&
        (e = document.getElementById(e)),
      !isDomElement(e))
    )
      throw new TypeError(
        "You must pass either a valid element or a valid id.",
      );
    if (e.nodeName !== "IFRAME") {
      const n = e.querySelector("iframe");
      n && (e = n);
    }
    if (e.nodeName === "IFRAME" && !isVimeoUrl(e.getAttribute("src") || ""))
      throw new Error("The player element passed isn’t a Vimeo embed.");
    if (playerMap.has(e)) return playerMap.get(e);
    ((this._window = e.ownerDocument.defaultView),
      (this.element = e),
      (this.origin = "*"));
    const r = new npo_src((n, a) => {
      if (
        ((this._onMessage = (l) => {
          if (!isVimeoUrl(l.origin) || this.element.contentWindow !== l.source)
            return;
          this.origin === "*" && (this.origin = l.origin);
          const c = parseMessageData(l.data);
          if (c && c.event === "error" && c.data && c.data.method === "ready") {
            const v = new Error(c.data.message);
            ((v.name = c.data.name), a(v));
            return;
          }
          const p = c && c.event === "ready",
            g = c && c.method === "ping";
          if (p || g) {
            (this.element.setAttribute("data-ready", "true"), n());
            return;
          }
          processData(this, c);
        }),
        this._window.addEventListener("message", this._onMessage),
        this.element.nodeName !== "IFRAME")
      ) {
        const l = getOEmbedParameters(e, t),
          c = getVimeoUrl(l);
        getOEmbedData(c, l, e)
          .then((u) => {
            const f = createEmbed(u, e);
            return (
              (this.element = f),
              (this._originalElement = e),
              swapCallbacks(e, f),
              playerMap.set(this.element, this),
              u
            );
          })
          .catch(a);
      }
    });
    if (
      (readyMap.set(this, r),
      playerMap.set(this.element, this),
      this.element.nodeName === "IFRAME" && postMessage(this, "ping"),
      screenfull.isEnabled)
    ) {
      const n = () => screenfull.exit();
      ((this.fullscreenchangeHandler = () => {
        (screenfull.isFullscreen
          ? storeCallback(this, "event:exitFullscreen", n)
          : removeCallback(this, "event:exitFullscreen", n),
          this.ready().then(() => {
            postMessage(this, "fullscreenchange", screenfull.isFullscreen);
          }));
      }),
        screenfull.on("fullscreenchange", this.fullscreenchangeHandler));
    }
    return this;
  }
  static isVimeoUrl(e) {
    return isVimeoUrl(e);
  }
  callMethod(e) {
    for (
      var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      r[n - 1] = arguments[n];
    if (e == null) throw new TypeError("You must pass a method name.");
    return new npo_src((a, l) =>
      this.ready()
        .then(() => {
          (storeCallback(this, e, { resolve: a, reject: l }),
            r.length === 0 ? (r = {}) : r.length === 1 && (r = r[0]),
            postMessage(this, e, r));
        })
        .catch(l),
    );
  }
  get(e) {
    return new npo_src(
      (t, r) => (
        (e = getMethodName(e, "get")),
        this.ready()
          .then(() => {
            (storeCallback(this, e, { resolve: t, reject: r }),
              postMessage(this, e));
          })
          .catch(r)
      ),
    );
  }
  set(e, t) {
    return new npo_src((r, n) => {
      if (((e = getMethodName(e, "set")), t == null))
        throw new TypeError("There must be a value to set.");
      return this.ready()
        .then(() => {
          (storeCallback(this, e, { resolve: r, reject: n }),
            postMessage(this, e, t));
        })
        .catch(n);
    });
  }
  on(e, t) {
    if (!e) throw new TypeError("You must pass an event name.");
    if (!t) throw new TypeError("You must pass a callback function.");
    if (typeof t != "function")
      throw new TypeError("The callback must be a function.");
    (getCallbacks(this, `event:${e}`).length === 0 &&
      this.callMethod("addEventListener", e).catch(() => {}),
      storeCallback(this, `event:${e}`, t));
  }
  off(e, t) {
    if (!e) throw new TypeError("You must pass an event name.");
    if (t && typeof t != "function")
      throw new TypeError("The callback must be a function.");
    removeCallback(this, `event:${e}`, t) &&
      this.callMethod("removeEventListener", e).catch((n) => {});
  }
  loadVideo(e) {
    return this.callMethod("loadVideo", e);
  }
  ready() {
    const e =
      readyMap.get(this) ||
      new npo_src((t, r) => {
        r(new Error("Unknown player. Probably unloaded."));
      });
    return npo_src.resolve(e);
  }
  addCuePoint(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return this.callMethod("addCuePoint", { time: e, data: t });
  }
  removeCuePoint(e) {
    return this.callMethod("removeCuePoint", e);
  }
  enableTextTrack(e) {
    let t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null,
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!e) throw new TypeError("You must pass a language.");
    return this.callMethod("enableTextTrack", {
      language: e,
      kind: t,
      showing: r,
    });
  }
  disableTextTrack() {
    return this.callMethod("disableTextTrack");
  }
  selectAudioTrack(e, t) {
    if (!e) throw new TypeError("You must pass a language.");
    return this.callMethod("selectAudioTrack", { language: e, kind: t });
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
    return screenfull.isEnabled
      ? screenfull.request(this.element)
      : this.callMethod("requestFullscreen");
  }
  exitFullscreen() {
    return screenfull.isEnabled
      ? screenfull.exit()
      : this.callMethod("exitFullscreen");
  }
  getFullscreen() {
    return screenfull.isEnabled
      ? npo_src.resolve(screenfull.isFullscreen)
      : this.get("fullscreen");
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
    return new npo_src((e) => {
      if (
        (readyMap.delete(this),
        playerMap.delete(this.element),
        this._originalElement &&
          (playerMap.delete(this._originalElement),
          this._originalElement.removeAttribute("data-vimeo-initialized")),
        this.element &&
          this.element.nodeName === "IFRAME" &&
          this.element.parentNode &&
          (this.element.parentNode.parentNode &&
          this._originalElement &&
          this._originalElement !== this.element.parentNode
            ? this.element.parentNode.parentNode.removeChild(
                this.element.parentNode,
              )
            : this.element.parentNode.removeChild(this.element)),
        this.element &&
          this.element.nodeName === "DIV" &&
          this.element.parentNode)
      ) {
        this.element.removeAttribute("data-vimeo-initialized");
        const t = this.element.querySelector("iframe");
        t &&
          t.parentNode &&
          (t.parentNode.parentNode &&
          this._originalElement &&
          this._originalElement !== t.parentNode
            ? t.parentNode.parentNode.removeChild(t.parentNode)
            : t.parentNode.removeChild(t));
      }
      (this._window.removeEventListener("message", this._onMessage),
        screenfull.isEnabled &&
          screenfull.off("fullscreenchange", this.fullscreenchangeHandler),
        e());
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
    return npo_src.all([
      this.get("colorOne"),
      this.get("colorTwo"),
      this.get("colorThree"),
      this.get("colorFour"),
    ]);
  }
  setColor(e) {
    return this.set("color", e);
  }
  setColors(e) {
    if (!Array.isArray(e))
      return new npo_src((n, a) =>
        a(new TypeError("Argument must be an array.")),
      );
    const t = new npo_src((n) => n(null)),
      r = [
        e[0] ? this.set("colorOne", e[0]) : t,
        e[1] ? this.set("colorTwo", e[1]) : t,
        e[2] ? this.set("colorThree", e[2]) : t,
        e[3] ? this.set("colorFour", e[3]) : t,
      ];
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
    if (!e) throw new TypeError("A Timing Object must be provided.");
    await this.ready();
    const r = new TimingSrcConnector(this, e, t);
    return (
      postMessage(this, "notifyTimingObjectConnect"),
      r.addEventListener("disconnect", () =>
        postMessage(this, "notifyTimingObjectDisconnect"),
      ),
      r
    );
  }
}
isServerRuntime ||
  ((screenfull = initializeScreenfull()),
  initializeEmbeds(),
  resizeEmbeds(),
  initAppendVideoMetadata(),
  checkUrlTimeParam(),
  updateDRMEmbeds());
const VIDEO_LIST = { MAIN_VIDEO_REEL: 761102167 };
globalThis.VIDEO_LIST = VIDEO_LIST;

class VideoOverlay {
  domVideoContainer;
  domVideoCursor;
  domVideoCursorSvg;
  isOpened = !1;
  openedRatio = 0;
  domVideoCursorDirection = -1;
  domVideoCursorActive = !1;
  domVideoCursorActiveRatio = 0;
  domVideoCursorRotateRatio = 0;
  domVideoCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  hoverScaleFactor = 1;
  isVideoMuted = !1;
  isControlsHover = !1;
  isVideoPlaying = !1;
  isVideoReady = !1;
  videoPercentageWatched = 0;
  videoDuration = 0;
  videoWidth = 1920;
  videoHeight = 1080;
  hasInitalited = !1;
  isProjectPage = !1;
  preInit() {
    if (this.hasInitalited) return;
    ((this.domVideoContainer = document.querySelector("#video-overlay")),
      (this.domVideoCursor = document.querySelector("#video-overlay-cursor")),
      (this.domVideoCursorSvg = document.querySelector(
        "#video-overlay-cursor-svg",
      )),
      (this.domVimeoEntryPoint = document.querySelector(
        "#video-overlay__vimeo-video",
      )),
      (this.domVideoPlayBtn = document.querySelector(
        "#video-overlay__play-btn",
      )),
      (this.domVideoMuteBtn = document.querySelector(
        "#video-overlay__mute-btn",
      )),
      (this.domVideoProgress = document.querySelector(
        "#video-overlay__progress-container",
      )),
      (this.domVideoProgressActive = document.querySelector(
        "#video-overlay__progress-active",
      )),
      (this.domMobileCloseButton = document.querySelector(
        "#video-overlay__mobile-close-btn",
      )),
      (this.domVideoProgress.onmouseenter = () => (this.isControlsHover = !0)),
      (this.domVideoProgress.onmouseleave = () => (this.isControlsHover = !1)),
      (this.domVideoPlayBtn.onmouseenter = () => (this.isControlsHover = !0)),
      (this.domVideoPlayBtn.onmouseleave = () => (this.isControlsHover = !1)),
      (this.domVideoMuteBtn.onmouseenter = () => (this.isControlsHover = !0)),
      (this.domVideoMuteBtn.onmouseleave = () => (this.isControlsHover = !1)));
    const e = {
      id: VIDEO_LIST.MAIN_VIDEO_REEL,
      width: "100%",
      height: "100%",
      responsive: !0,
      title: !1,
      controls: !1,
      byline: !1,
      end_screen: { type: "empty" },
    };
    ((this.videoPlayer = new Player("video-overlay__vimeo-video", e)),
      (this.videoPlayer.element.style.pointerEvents = "none"),
      this.videoPlayer.setCurrentTime(0),
      this.videoPlayer.getVideoWidth().then((t) => (this.videoWidth = t)),
      this.videoPlayer.getVideoHeight().then((t) => (this.videoHeight = t)),
      this.videoPlayer.getDuration().then((t) => (this.videoDuration = t)),
      this.videoPlayer.on("ended", function (t) {
        this.close();
      }),
      this.domVideoContainer.addEventListener("click", () => {
        properties.width > 812 && this.close();
      }),
      this.domMobileCloseButton.addEventListener("click", () => {
        this.close();
      }),
      this.videoPlayer.on("ended", () => {
        this.close();
      }),
      this.videoPlayer.on("ended", () => {}),
      this.videoPlayer.on("timeupdate", (t) => {
        ((this.videoPercentageWatched = t.percent),
          (this.domVideoProgressActive.style.width = `${t.percent * 100}%`),
          t.percent > 0.996 && this.close());
      }),
      (this.domVideoPlayBtn.onclick = (t) => {
        (t.stopPropagation(),
          this.isVideoPlaying
            ? (this.videoPlayer.pause(), (this.isVideoPlaying = !1))
            : (this.videoPlayer.play(), (this.isVideoPlaying = !0)),
          (this.domVideoPlayBtn.innerHTML = this.isVideoPlaying
            ? "Play"
            : "Pause"));
      }),
      (this.domVideoMuteBtn.onclick = (t) => {
        (t.stopPropagation(),
          this.isVideoMuted
            ? (this.videoPlayer.setVolume(1), (this.isVideoMuted = !1))
            : (this.videoPlayer.setVolume(0), (this.isVideoMuted = !0)),
          (this.domVideoMuteBtn.innerHTML = this.isVideoMuted
            ? "Unmute"
            : "Mute"));
      }),
      (this.domVideoProgress.onclick = (t) => {
        (t.stopPropagation(),
          this.domVideoProgressBCR.width === 0 &&
            (this.domVideoProgressBCR =
              this.domVideoProgress.getBoundingClientRect()));
        const r =
          (t.clientX - this.domVideoProgressBCR.x) /
          this.domVideoProgressBCR.width;
        (this.videoPlayer.pause(),
          this.videoPlayer
            .setCurrentTime(this.videoDuration * r)
            .then(() => {
              this.videoPlayer.play();
            })
            .catch((n) => {
              this.videoPlayer.play();
            }));
      }),
      (this.hasInitalited = !0));
  }
  initAndPlayVideo(e = VIDEO_LIST.MAIN_VIDEO_REEL, t = !1) {
    ((this.isProjectPage = t),
      (this.isVideoReady = !1),
      this.videoPlayer.loadVideo(e).then(() => {
        (this.videoPlayer.setCurrentTime(0),
          this.videoPlayer.getVideoWidth().then((r) => (this.videoWidth = r)),
          this.videoPlayer.getVideoHeight().then((r) => (this.videoHeight = r)),
          this.videoPlayer.getDuration().then((r) => (this.videoDuration = r)),
          (this.isVideoReady = !0),
          this.open());
      }));
  }
  init() {
    ((this.domVideoContainer.style.opacity = 0),
      (this.domVideoContainer.style.display = "none"));
  }
  resize() {
    if (!this.hasInitalited) return;
    const e = this.domVideoContainer.style.display;
    this.domVideoContainer.style.display = "block";
    const t = properties.viewportWidth / properties.viewportHeight,
      r = this.videoWidth / this.videoHeight;
    if (this.isProjectPage) {
      (this.domVimeoEntryPoint.classList.add("is-project-view"),
        this.domVideoContainer.classList.add("is-project-view"),
        this.domVimeoEntryPoint.style.removeProperty("width"),
        this.domVimeoEntryPoint.style.removeProperty("height"),
        (this.domVimeoEntryPoint.style.transform = "translateZ(0)"));
      const a = this.domVimeoEntryPoint.getBoundingClientRect().width / r;
      ((this.domVimeoEntryPoint.style.bottom =
        this.domVimeoEntryPoint.style.top =
          0.5 * (properties.viewportHeight - a) + "px"),
        (this.videoPlayer.element.style.width = "100%"),
        (this.videoPlayer.element.style.height = "100%"));
    } else {
      (this.domVimeoEntryPoint.classList.remove("is-project-view"),
        this.domVideoContainer.classList.remove("is-project-view"));
      const n = Math.max(1, t / r);
      ((this.domVimeoEntryPoint.style.width = `${properties.viewportWidth}px`),
        (this.domVimeoEntryPoint.style.height = `${properties.viewportHeight}px`),
        (this.domVimeoEntryPoint.style.transform = `scale(${n})`),
        (this.videoPlayer.element.style.width = `${properties.viewportWidth}px`),
        (this.videoPlayer.element.style.height = `${properties.viewportHeight}px`));
    }
    ((this.domVideoProgressBCR = this.domVideoProgress.getBoundingClientRect()),
      (this.domVideoContainer.style.display = e));
  }
  update(e) {
    if (
      !this.hasInitalited ||
      ((this.openedRatio = math.saturate(
        this.openedRatio + 2 * (this.isOpened ? e : -e),
      )),
      (this.domVideoContainer.style.opacity = ease.quadInOut(this.openedRatio)),
      (this.domVideoContainer.style.display =
        this.openedRatio > 0 ? "block" : "none"),
      settings.USE_AUDIO && audios.groups && audios.groups.music && (audios.groups.music.volume = 1 - this.openedRatio),
      this.needsReset && this.openedRatio === 0 && (this.needsReset = !1),
      this.openedRatio === 0)
    )
      return;
    let t = input.easedMouseDynamics.default.value.x,
      r = input.easedMouseDynamics.default.value.y,
      n = (t * 0.5 + 0.5) * properties.viewportWidth,
      a = (0.5 - r * 0.5) * properties.viewportHeight;
    if (properties.useMobileLayout) this.domVideoCursor.style.display = "none";
    else {
      ((this.domVideoCursorActiveRatio = math.saturate(
        this.domVideoCursorActiveRatio + e * 1.5,
      )),
        (this.domVideoCursorDirection = n > 0 ? 1 : -1),
        (this.hoverScaleFactor = math.saturate(
          this.hoverScaleFactor + 4 * e * (this.isControlsHover ? -1 : 1),
        )),
        (this.domVideoCursor.style.display = "flex"));
      let l = n,
        c = a,
        u =
          math.fit(this.hoverScaleFactor, 0, 1, 0.2, 1) *
          Math.min(
            2.5,
            input.easedMouseDynamics.default.valueVel.length() / 5 + 1,
          ) *
          ease.backOut(this.domVideoCursorActiveRatio) *
          math.fit(this.openedRatio, 0.5, 1, 0, 1, ease.lusion);
      ((this.domVideoCursor.style.transform = `translate3d(${l}px, ${c}px,0) translate3d(-50%, -50%, 0) scale(${u})`),
        (this.domVideoCursorRotateRatio = math.saturate(
          this.domVideoCursorRotateRatio +
            (this.domVideoCursorDirection > 0 ? e * 3 : e * -3),
        )),
        this.domVideoCursorExtraRotationMotion.update(
          e,
          math.clamp(
            input.easedMouseDynamics.default.valueVel.y *
              -this.domVideoCursorDirection,
            -1,
            1,
          ),
        ));
      let f = ease.backInOut(this.domVideoCursorRotateRatio);
      this.domVideoCursorSvg.style.transform = `scale(${ease.quadInOut(this.hoverScaleFactor)}) rotate(${f * 180 + this.domVideoCursorExtraRotationMotion.value * 75}deg)`;
    }
  }
  open() {
    ((this.isOpened = !0),
      setTimeout(() => {
        this.videoPlayer.play().then(() => {
          (this.resize(), (this.isVideoPlaying = !0));
        });
      }, 500));
  }
  close() {
    this.isVideoReady &&
      ((this.isOpened = !1),
      this.videoPlayer.pause().then(() => {
        (this.videoPlayer.setCurrentTime(0).then(() => {}),
          (this.needsReset = !0),
          (this.isVideoPlaying = !1),
          (this.isProjectPage = !1));
      }));
  }
}
const videoOverlay = new VideoOverlay();

globalThis.videoOverlay = videoOverlay;
export { TimingSrcConnector, Player, VideoOverlay, videoOverlay, VIDEO_LIST };
export default videoOverlay;
