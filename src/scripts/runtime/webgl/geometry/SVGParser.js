const ufxVert = globalThis.ufxVert;
/**
 * Vector SVG Geometry Triangulator & Bezier Curve Decomposer
 */
import * as THREE from "../../three.js";
class SVGParser {
  parse(e) {
    const t = this;
    function r(K, G) {
      if (K.nodeType !== 1) return;
      const U = R(K);
      let N = !1,
        he = null;
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
          ((G = T(K, G)), K.hasAttribute("d") && (he = n(K)));
          break;
        case "rect":
          ((G = T(K, G)), (he = u(K)));
          break;
        case "polygon":
          ((G = T(K, G)), (he = f(K)));
          break;
        case "polyline":
          ((G = T(K, G)), (he = p(K)));
          break;
        case "circle":
          ((G = T(K, G)), (he = g(K)));
          break;
        case "ellipse":
          ((G = T(K, G)), (he = v(K)));
          break;
        case "line":
          ((G = T(K, G)), (he = _(K)));
          break;
        case "defs":
          N = !0;
          break;
        case "use":
          G = T(K, G);
          const xe = (
              K.getAttributeNS("http://www.w3.org/1999/xlink", "href") || ""
            ).substring(1),
            ee = K.viewportElement.getElementById(xe);
          ee
            ? r(ee, G)
            : console.warn(
                "SVGLoader: 'use node' references non-existent node id: " + xe,
              );
          break;
      }
      he &&
        (G.fill !== void 0 && G.fill !== "none" && he.color.setStyle(G.fill),
        I(he, te),
        re.push(he),
        (he.userData = { node: K, style: G }));
      const ve = K.childNodes;
      for (let de = 0; de < ve.length; de++) {
        const xe = ve[de];
        (N && xe.nodeName !== "style" && xe.nodeName !== "defs") || r(xe, G);
      }
      U && (z.pop(), z.length > 0 ? te.copy(z[z.length - 1]) : te.identity());
    }
    function n(K) {
      const G = new ShapePath(),
        U = new Vector2(),
        N = new Vector2(),
        he = new Vector2();
      let ve = !0,
        de = !1;
      const xe = K.getAttribute("d");
      if (xe === "" || xe === "none") return null;
      const ee = xe.match(/[a-df-z][^a-df-z]*/gi);
      for (let Ue = 0, fe = ee.length; Ue < fe; Ue++) {
        const Se = ee[Ue],
          Me = Se.charAt(0),
          Be = Se.slice(1).trim();
        ve === !0 && ((de = !0), (ve = !1));
        let se;
        switch (Me) {
          case "M":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2)
              ((U.x = se[$ + 0]),
                (U.y = se[$ + 1]),
                (N.x = U.x),
                (N.y = U.y),
                $ === 0 ? G.moveTo(U.x, U.y) : G.lineTo(U.x, U.y),
                $ === 0 && he.copy(U));
            break;
          case "H":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++)
              ((U.x = se[$]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "V":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++)
              ((U.y = se[$]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "L":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2)
              ((U.x = se[$ + 0]),
                (U.y = se[$ + 1]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "C":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6)
              (G.bezierCurveTo(
                se[$ + 0],
                se[$ + 1],
                se[$ + 2],
                se[$ + 3],
                se[$ + 4],
                se[$ + 5],
              ),
                (N.x = se[$ + 2]),
                (N.y = se[$ + 3]),
                (U.x = se[$ + 4]),
                (U.y = se[$ + 5]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "S":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4)
              (G.bezierCurveTo(
                M(U.x, N.x),
                M(U.y, N.y),
                se[$ + 0],
                se[$ + 1],
                se[$ + 2],
                se[$ + 3],
              ),
                (N.x = se[$ + 0]),
                (N.y = se[$ + 1]),
                (U.x = se[$ + 2]),
                (U.y = se[$ + 3]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "Q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4)
              (G.quadraticCurveTo(se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3]),
                (N.x = se[$ + 0]),
                (N.y = se[$ + 1]),
                (U.x = se[$ + 2]),
                (U.y = se[$ + 3]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "T":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x),
                st = M(U.y, N.y);
              (G.quadraticCurveTo(Ye, st, se[$ + 0], se[$ + 1]),
                (N.x = Ye),
                (N.y = st),
                (U.x = se[$ + 0]),
                (U.y = se[$ + 1]),
                $ === 0 && de === !0 && he.copy(U));
            }
            break;
          case "A":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == U.x && se[$ + 6] == U.y) continue;
              const Ye = U.clone();
              ((U.x = se[$ + 5]),
                (U.y = se[$ + 6]),
                (N.x = U.x),
                (N.y = U.y),
                l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U),
                $ === 0 && de === !0 && he.copy(U));
            }
            break;
          case "m":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2)
              ((U.x += se[$ + 0]),
                (U.y += se[$ + 1]),
                (N.x = U.x),
                (N.y = U.y),
                $ === 0 ? G.moveTo(U.x, U.y) : G.lineTo(U.x, U.y),
                $ === 0 && he.copy(U));
            break;
          case "h":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++)
              ((U.x += se[$]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "v":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++)
              ((U.y += se[$]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "l":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2)
              ((U.x += se[$ + 0]),
                (U.y += se[$ + 1]),
                (N.x = U.x),
                (N.y = U.y),
                G.lineTo(U.x, U.y),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "c":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6)
              (G.bezierCurveTo(
                U.x + se[$ + 0],
                U.y + se[$ + 1],
                U.x + se[$ + 2],
                U.y + se[$ + 3],
                U.x + se[$ + 4],
                U.y + se[$ + 5],
              ),
                (N.x = U.x + se[$ + 2]),
                (N.y = U.y + se[$ + 3]),
                (U.x += se[$ + 4]),
                (U.y += se[$ + 5]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "s":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4)
              (G.bezierCurveTo(
                M(U.x, N.x),
                M(U.y, N.y),
                U.x + se[$ + 0],
                U.y + se[$ + 1],
                U.x + se[$ + 2],
                U.y + se[$ + 3],
              ),
                (N.x = U.x + se[$ + 0]),
                (N.y = U.y + se[$ + 1]),
                (U.x += se[$ + 2]),
                (U.y += se[$ + 3]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4)
              (G.quadraticCurveTo(
                U.x + se[$ + 0],
                U.y + se[$ + 1],
                U.x + se[$ + 2],
                U.y + se[$ + 3],
              ),
                (N.x = U.x + se[$ + 0]),
                (N.y = U.y + se[$ + 1]),
                (U.x += se[$ + 2]),
                (U.y += se[$ + 3]),
                $ === 0 && de === !0 && he.copy(U));
            break;
          case "t":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x),
                st = M(U.y, N.y);
              (G.quadraticCurveTo(Ye, st, U.x + se[$ + 0], U.y + se[$ + 1]),
                (N.x = Ye),
                (N.y = st),
                (U.x = U.x + se[$ + 0]),
                (U.y = U.y + se[$ + 1]),
                $ === 0 && de === !0 && he.copy(U));
            }
            break;
          case "a":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == 0 && se[$ + 6] == 0) continue;
              const Ye = U.clone();
              ((U.x += se[$ + 5]),
                (U.y += se[$ + 6]),
                (N.x = U.x),
                (N.y = U.y),
                l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U),
                $ === 0 && de === !0 && he.copy(U));
            }
            break;
          case "Z":
          case "z":
            ((G.currentPath.autoClose = !0),
              G.currentPath.curves.length > 0 &&
                (U.copy(he), G.currentPath.currentPoint.copy(U), (ve = !0)));
            break;
          default:
            console.warn(Se);
        }
        de = !1;
      }
      return G;
    }
    function a(K) {
      if (!(!K.sheet || !K.sheet.cssRules || !K.sheet.cssRules.length))
        for (let G = 0; G < K.sheet.cssRules.length; G++) {
          const U = K.sheet.cssRules[G];
          if (U.type !== 1) continue;
          const N = U.selectorText
            .split(/,/gm)
            .filter(Boolean)
            .map((he) => he.trim());
          for (let he = 0; he < N.length; he++) {
            const ve = Object.fromEntries(
              Object.entries(U.style).filter(([, de]) => de !== ""),
            );
            ce[N[he]] = Object.assign(ce[N[he]] || {}, ve);
          }
        }
    }
    function l(K, G, U, N, he, ve, de, xe) {
      if (G == 0 || U == 0) {
        K.lineTo(xe.x, xe.y);
        return;
      }
      ((N = (N * Math.PI) / 180), (G = Math.abs(G)), (U = Math.abs(U)));
      const ee = (de.x - xe.x) / 2,
        Ue = (de.y - xe.y) / 2,
        fe = Math.cos(N) * ee + Math.sin(N) * Ue,
        Se = -Math.sin(N) * ee + Math.cos(N) * Ue;
      let Me = G * G,
        Be = U * U;
      const se = fe * fe,
        $ = Se * Se,
        Oe = se / Me + $ / Be;
      if (Oe > 1) {
        const Ee = Math.sqrt(Oe);
        ((G = Ee * G), (U = Ee * U), (Me = G * G), (Be = U * U));
      }
      const Ye = Me * $ + Be * se,
        st = (Me * Be - Ye) / Ye;
      let W = Math.sqrt(Math.max(0, st));
      he === ve && (W = -W);
      const O = (W * G * Se) / U,
        me = (-W * U * fe) / G,
        Ie = Math.cos(N) * O - Math.sin(N) * me + (de.x + xe.x) / 2,
        Le = Math.sin(N) * O + Math.cos(N) * me + (de.y + xe.y) / 2,
        Y = c(1, 0, (fe - O) / G, (Se - me) / U),
        we =
          c((fe - O) / G, (Se - me) / U, (-fe - O) / G, (-Se - me) / U) %
          (Math.PI * 2);
      K.currentPath.absellipse(Ie, Le, G, U, Y, Y + we, ve === 0, N);
    }
    function c(K, G, U, N) {
      const he = K * U + G * N,
        ve = Math.sqrt(K * K + G * G) * Math.sqrt(U * U + N * N);
      let de = Math.acos(Math.max(-1, Math.min(1, he / ve)));
      return (K * N - G * U < 0 && (de = -de), de);
    }
    function u(K) {
      const G = w(K.getAttribute("x") || 0),
        U = w(K.getAttribute("y") || 0),
        N = w(K.getAttribute("rx") || K.getAttribute("ry") || 0),
        he = w(K.getAttribute("ry") || K.getAttribute("rx") || 0),
        ve = w(K.getAttribute("width")),
        de = w(K.getAttribute("height")),
        xe = 1 - 0.551915024494,
        ee = new ShapePath();
      return (
        ee.moveTo(G + N, U),
        ee.lineTo(G + ve - N, U),
        (N !== 0 || he !== 0) &&
          ee.bezierCurveTo(
            G + ve - N * xe,
            U,
            G + ve,
            U + he * xe,
            G + ve,
            U + he,
          ),
        ee.lineTo(G + ve, U + de - he),
        (N !== 0 || he !== 0) &&
          ee.bezierCurveTo(
            G + ve,
            U + de - he * xe,
            G + ve - N * xe,
            U + de,
            G + ve - N,
            U + de,
          ),
        ee.lineTo(G + N, U + de),
        (N !== 0 || he !== 0) &&
          ee.bezierCurveTo(
            G + N * xe,
            U + de,
            G,
            U + de - he * xe,
            G,
            U + de - he,
          ),
        ee.lineTo(G, U + he),
        (N !== 0 || he !== 0) &&
          ee.bezierCurveTo(G, U + he * xe, G + N * xe, U, G + N, U),
        ee
      );
    }
    function f(K) {
      function G(ve, de, xe) {
        const ee = w(de),
          Ue = w(xe);
        (he === 0 ? N.moveTo(ee, Ue) : N.lineTo(ee, Ue), he++);
      }
      const U =
          /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,
        N = new ShapePath();
      let he = 0;
      return (
        K.getAttribute("points").replace(U, G),
        (N.currentPath.autoClose = !0),
        N
      );
    }
    function p(K) {
      function G(ve, de, xe) {
        const ee = w(de),
          Ue = w(xe);
        (he === 0 ? N.moveTo(ee, Ue) : N.lineTo(ee, Ue), he++);
      }
      const U =
          /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,
        N = new ShapePath();
      let he = 0;
      return (
        K.getAttribute("points").replace(U, G),
        (N.currentPath.autoClose = !1),
        N
      );
    }
    function g(K) {
      const G = w(K.getAttribute("cx") || 0),
        U = w(K.getAttribute("cy") || 0),
        N = w(K.getAttribute("r") || 0),
        he = new Path();
      he.absarc(G, U, N, 0, Math.PI * 2);
      const ve = new ShapePath();
      return (ve.subPaths.push(he), ve);
    }
    function v(K) {
      const G = w(K.getAttribute("cx") || 0),
        U = w(K.getAttribute("cy") || 0),
        N = w(K.getAttribute("rx") || 0),
        he = w(K.getAttribute("ry") || 0),
        ve = new Path();
      ve.absellipse(G, U, N, he, 0, Math.PI * 2);
      const de = new ShapePath();
      return (de.subPaths.push(ve), de);
    }
    function _(K) {
      const G = w(K.getAttribute("x1") || 0),
        U = w(K.getAttribute("y1") || 0),
        N = w(K.getAttribute("x2") || 0),
        he = w(K.getAttribute("y2") || 0),
        ve = new ShapePath();
      return (
        ve.moveTo(G, U),
        ve.lineTo(N, he),
        (ve.currentPath.autoClose = !1),
        ve
      );
    }
    function T(K, G) {
      G = Object.assign({}, G);
      let U = {};
      if (K.hasAttribute("class")) {
        const de = K.getAttribute("class")
          .split(/\s/)
          .filter(Boolean)
          .map((xe) => xe.trim());
        for (let xe = 0; xe < de.length; xe++)
          U = Object.assign(U, ce["." + de[xe]]);
      }
      K.hasAttribute("id") &&
        (U = Object.assign(U, ce["#" + K.getAttribute("id")]));
      function N(de, xe, ee) {
        (ee === void 0 &&
          (ee = function (fe) {
            return (
              fe.startsWith("url") &&
                console.warn(
                  "SVGLoader: url access in attributes is not implemented.",
                ),
              fe
            );
          }),
          K.hasAttribute(de) && (G[xe] = ee(K.getAttribute(de))),
          U[de] && (G[xe] = ee(U[de])),
          K.style && K.style[de] !== "" && (G[xe] = ee(K.style[de])));
      }
      function he(de) {
        return Math.max(0, Math.min(1, w(de)));
      }
      function ve(de) {
        return Math.max(0, w(de));
      }
      return (
        N("fill", "fill"),
        N("fill-opacity", "fillOpacity", he),
        N("fill-rule", "fillRule"),
        N("opacity", "opacity", he),
        N("stroke", "stroke"),
        N("stroke-opacity", "strokeOpacity", he),
        N("stroke-width", "strokeWidth", ve),
        N("stroke-linejoin", "strokeLineJoin"),
        N("stroke-linecap", "strokeLineCap"),
        N("stroke-miterlimit", "strokeMiterLimit", ve),
        N("visibility", "visibility"),
        G
      );
    }
    function M(K, G) {
      return K - (G - K);
    }
    function S(K, G, U) {
      if (typeof K != "string")
        throw new TypeError("Invalid input: " + typeof K);
      const N = {
          WHITESPACE: /[ \t\r\n]/,
          DIGIT: /[\d]/,
          SIGN: /[-+]/,
          POINT: /\./,
          COMMA: /,/,
          EXP: /e/i,
          FLAGS: /[01]/,
        },
        he = 0,
        ve = 1,
        de = 2,
        xe = 3;
      let ee = he,
        Ue = !0,
        fe = "",
        Se = "";
      const Me = [];
      function Be(Ye, st, W) {
        const O = new SyntaxError(
          'Unexpected character "' + Ye + '" at index ' + st + ".",
        );
        throw ((O.partial = W), O);
      }
      function se() {
        (fe !== "" &&
          (Se === ""
            ? Me.push(Number(fe))
            : Me.push(Number(fe) * Math.pow(10, Number(Se)))),
          (fe = ""),
          (Se = ""));
      }
      let $;
      const Oe = K.length;
      for (let Ye = 0; Ye < Oe; Ye++) {
        if (
          (($ = K[Ye]),
          Array.isArray(G) && G.includes(Me.length % U) && N.FLAGS.test($))
        ) {
          ((ee = ve), (fe = $), se());
          continue;
        }
        if (ee === he) {
          if (N.WHITESPACE.test($)) continue;
          if (N.DIGIT.test($) || N.SIGN.test($)) {
            ((ee = ve), (fe = $));
            continue;
          }
          if (N.POINT.test($)) {
            ((ee = de), (fe = $));
            continue;
          }
          N.COMMA.test($) && (Ue && Be($, Ye, Me), (Ue = !0));
        }
        if (ee === ve) {
          if (N.DIGIT.test($)) {
            fe += $;
            continue;
          }
          if (N.POINT.test($)) {
            ((fe += $), (ee = de));
            continue;
          }
          if (N.EXP.test($)) {
            ee = xe;
            continue;
          }
          N.SIGN.test($) &&
            fe.length === 1 &&
            N.SIGN.test(fe[0]) &&
            Be($, Ye, Me);
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
          N.POINT.test($) && fe[fe.length - 1] === "." && Be($, Ye, Me);
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
            Se.length === 1 && N.SIGN.test(Se) && Be($, Ye, Me);
          }
        }
        N.WHITESPACE.test($)
          ? (se(), (ee = he), (Ue = !1))
          : N.COMMA.test($)
            ? (se(), (ee = he), (Ue = !0))
            : N.SIGN.test($)
              ? (se(), (ee = ve), (fe = $))
              : N.POINT.test($)
                ? (se(), (ee = de), (fe = $))
                : Be($, Ye, Me);
      }
      return (se(), Me);
    }
    const b = ["mm", "cm", "in", "pt", "pc", "px"],
      C = {
        mm: {
          mm: 1,
          cm: 0.1,
          in: 1 / 25.4,
          pt: 72 / 25.4,
          pc: 6 / 25.4,
          px: -1,
        },
        cm: {
          mm: 10,
          cm: 1,
          in: 1 / 2.54,
          pt: 72 / 2.54,
          pc: 6 / 2.54,
          px: -1,
        },
        in: { mm: 25.4, cm: 2.54, in: 1, pt: 72, pc: 6, px: -1 },
        pt: {
          mm: 25.4 / 72,
          cm: 2.54 / 72,
          in: 1 / 72,
          pt: 1,
          pc: 6 / 72,
          px: -1,
        },
        pc: {
          mm: 25.4 / 6,
          cm: 2.54 / 6,
          in: 1 / 6,
          pt: 72 / 6,
          pc: 1,
          px: -1,
        },
        px: { px: 1 },
      };
    function w(K) {
      let G = "px";
      if (typeof K == "string" || K instanceof String)
        for (let N = 0, he = b.length; N < he; N++) {
          const ve = b[N];
          if (K.endsWith(ve)) {
            ((G = ve), (K = K.substring(0, K.length - ve.length)));
            break;
          }
        }
      let U;
      return (
        G === "px" && t.defaultUnit !== "px"
          ? (U = C.in[t.defaultUnit] / t.defaultDPI)
          : ((U = C[G][t.defaultUnit]), U < 0 && (U = C[G].in * t.defaultDPI)),
        U * parseFloat(K)
      );
    }
    function R(K) {
      if (!(
        K.hasAttribute("transform") ||
        (K.nodeName === "use" && (K.hasAttribute("x") || K.hasAttribute("y")))
      ))
        return null;
      const G = E(K);
      return (
        z.length > 0 && G.premultiply(z[z.length - 1]),
        te.copy(G),
        z.push(G),
        G
      );
    }
    function E(K) {
      const G = new Matrix3(),
        U = j;
      if (
        K.nodeName === "use" &&
        (K.hasAttribute("x") || K.hasAttribute("y"))
      ) {
        const N = w(K.getAttribute("x")),
          he = w(K.getAttribute("y"));
        G.translate(N, he);
      }
      if (K.hasAttribute("transform")) {
        const N = K.getAttribute("transform").split(")");
        for (let he = N.length - 1; he >= 0; he--) {
          const ve = N[he].trim();
          if (ve === "") continue;
          const de = ve.indexOf("("),
            xe = ve.length;
          if (de > 0 && de < xe) {
            const ee = ve.slice(0, de),
              Ue = S(ve.slice(de + 1));
            switch ((U.identity(), ee)) {
              case "translate":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = 0;
                  (Ue.length >= 2 && (Se = Ue[1]), U.translate(fe, Se));
                }
                break;
              case "rotate":
                if (Ue.length >= 1) {
                  let fe = 0,
                    Se = 0,
                    Me = 0;
                  ((fe = (Ue[0] * Math.PI) / 180),
                    Ue.length >= 3 && ((Se = Ue[1]), (Me = Ue[2])),
                    X.makeTranslation(-Se, -Me),
                    Z.makeRotation(fe),
                    q.multiplyMatrices(Z, X),
                    X.makeTranslation(Se, Me),
                    U.multiplyMatrices(X, q));
                }
                break;
              case "scale":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = fe;
                  (Ue.length >= 2 && (Se = Ue[1]), U.scale(fe, Se));
                }
                break;
              case "skewX":
                Ue.length === 1 &&
                  U.set(
                    1,
                    Math.tan((Ue[0] * Math.PI) / 180),
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    1,
                  );
                break;
              case "skewY":
                Ue.length === 1 &&
                  U.set(
                    1,
                    0,
                    0,
                    Math.tan((Ue[0] * Math.PI) / 180),
                    1,
                    0,
                    0,
                    0,
                    1,
                  );
                break;
              case "matrix":
                Ue.length === 6 &&
                  U.set(Ue[0], Ue[2], Ue[4], Ue[1], Ue[3], Ue[5], 0, 0, 1);
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
        (oe.set(de.x, de.y, 1).applyMatrix3(G), de.set(oe.x, oe.y));
      }
      function N(de) {
        const xe = de.xRadius,
          ee = de.yRadius,
          Ue = Math.cos(de.aRotation),
          fe = Math.sin(de.aRotation),
          Se = new Vector3(xe * Ue, xe * fe, 0),
          Me = new Vector3(-ee * fe, ee * Ue, 0),
          Be = Se.applyMatrix3(G),
          se = Me.applyMatrix3(G),
          $ = j.set(Be.x, se.x, 0, Be.y, se.y, 0, 0, 0, 1),
          Oe = X.copy($).invert(),
          W = Z.copy(Oe).transpose().multiply(Oe).elements,
          O = ne(W[0], W[1], W[4]),
          me = Math.sqrt(O.rt1),
          Ie = Math.sqrt(O.rt2);
        if (
          ((de.xRadius = 1 / me),
          (de.yRadius = 1 / Ie),
          (de.aRotation = Math.atan2(O.sn, O.cs)),
          !((de.aEndAngle - de.aStartAngle) % (2 * Math.PI) < Number.EPSILON))
        ) {
          const Y = X.set(me, 0, 0, 0, Ie, 0, 0, 0, 1),
            we = Z.set(O.cs, O.sn, 0, -O.sn, O.cs, 0, 0, 0, 1),
            Ee = Y.multiply(we).multiply($),
            Fe = (Xe) => {
              const { x: tt, y: Re } = new Vector3(
                Math.cos(Xe),
                Math.sin(Xe),
                0,
              ).applyMatrix3(Ee);
              return Math.atan2(Re, tt);
            };
          ((de.aStartAngle = Fe(de.aStartAngle)),
            (de.aEndAngle = Fe(de.aEndAngle)),
            F(G) && (de.aClockwise = !de.aClockwise));
        }
      }
      function he(de) {
        const xe = L(G),
          ee = D(G);
        ((de.xRadius *= xe), (de.yRadius *= ee));
        const Ue =
          xe > Number.EPSILON
            ? Math.atan2(G.elements[1], G.elements[0])
            : Math.atan2(-G.elements[3], G.elements[4]);
        ((de.aRotation += Ue),
          F(G) &&
            ((de.aStartAngle *= -1),
            (de.aEndAngle *= -1),
            (de.aClockwise = !de.aClockwise)));
      }
      const ve = K.subPaths;
      for (let de = 0, xe = ve.length; de < xe; de++) {
        const Ue = ve[de].curves;
        for (let fe = 0; fe < Ue.length; fe++) {
          const Se = Ue[fe];
          Se.isLineCurve
            ? (U(Se.v1), U(Se.v2))
            : Se.isCubicBezierCurve
              ? (U(Se.v0), U(Se.v1), U(Se.v2), U(Se.v3))
              : Se.isQuadraticBezierCurve
                ? (U(Se.v0), U(Se.v1), U(Se.v2))
                : Se.isEllipseCurve &&
                  (ue.set(Se.aX, Se.aY),
                  U(ue),
                  (Se.aX = ue.x),
                  (Se.aY = ue.y),
                  k(G) ? N(Se) : he(Se));
        }
      }
    }
    function F(K) {
      const G = K.elements;
      return G[0] * G[4] - G[1] * G[3] < 0;
    }
    function k(K) {
      const G = K.elements,
        U = G[0] * G[3] + G[1] * G[4];
      if (U === 0) return !1;
      const N = L(K),
        he = D(K);
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
      let N, he, ve, de, xe;
      const ee = K + U,
        Ue = K - U,
        fe = Math.sqrt(Ue * Ue + 4 * G * G);
      return (
        ee > 0
          ? ((N = 0.5 * (ee + fe)),
            (xe = 1 / N),
            (he = K * xe * U - G * xe * G))
          : ee < 0
            ? (he = 0.5 * (ee - fe))
            : ((N = 0.5 * fe), (he = -0.5 * fe)),
        Ue > 0 ? (ve = Ue + fe) : (ve = Ue - fe),
        Math.abs(ve) > 2 * Math.abs(G)
          ? ((xe = (-2 * G) / ve),
            (de = 1 / Math.sqrt(1 + xe * xe)),
            (ve = xe * de))
          : Math.abs(G) === 0
            ? ((ve = 1), (de = 0))
            : ((xe = (-0.5 * ve) / G),
              (ve = 1 / Math.sqrt(1 + xe * xe)),
              (de = xe * ve)),
        Ue > 0 && ((xe = ve), (ve = -de), (de = xe)),
        { rt1: N, rt2: he, cs: ve, sn: de }
      );
    }
    const re = [],
      ce = {},
      z = [],
      j = new Matrix3(),
      X = new Matrix3(),
      Z = new Matrix3(),
      q = new Matrix3(),
      ue = new Vector2(),
      oe = new Vector3(),
      te = new Matrix3(),
      le = new DOMParser().parseFromString(e, "image/svg+xml");
    return (
      r(le.documentElement, {
        fill: "#000",
        fillOpacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLineJoin: "miter",
        strokeLineCap: "butt",
        strokeMiterLimit: 4,
      }),
      { paths: re, xml: le.documentElement }
    );
  }
  createShapes(e) {
    const r = {
        ORIGIN: 0,
        DESTINATION: 1,
        BETWEEN: 2,
        LEFT: 3,
        RIGHT: 4,
        BEHIND: 5,
        BEYOND: 6,
      },
      n = { loc: r.ORIGIN, t: 0 };
    function a(M, S, b, C) {
      const w = M.x,
        R = S.x,
        E = b.x,
        I = C.x,
        F = M.y,
        k = S.y,
        L = b.y,
        D = C.y,
        ne = (I - E) * (F - L) - (D - L) * (w - E),
        re = (R - w) * (F - L) - (k - F) * (w - E),
        ce = (D - L) * (R - w) - (I - E) * (k - F),
        z = ne / ce,
        j = re / ce;
      if ((ce === 0 && ne !== 0) || z <= 0 || z >= 1 || j < 0 || j > 1)
        return null;
      if (ne === 0 && ce === 0) {
        for (let X = 0; X < 2; X++)
          if ((l(X === 0 ? b : C, M, S), n.loc == r.ORIGIN)) {
            const Z = X === 0 ? b : C;
            return { x: Z.x, y: Z.y, t: n.t };
          } else if (n.loc == r.BETWEEN) {
            const Z = +(w + n.t * (R - w)).toPrecision(10),
              q = +(F + n.t * (k - F)).toPrecision(10);
            return { x: Z, y: q, t: n.t };
          }
        return null;
      } else {
        for (let q = 0; q < 2; q++)
          if ((l(q === 0 ? b : C, M, S), n.loc == r.ORIGIN)) {
            const ue = q === 0 ? b : C;
            return { x: ue.x, y: ue.y, t: n.t };
          }
        const X = +(w + z * (R - w)).toPrecision(10),
          Z = +(F + z * (k - F)).toPrecision(10);
        return { x: X, y: Z, t: z };
      }
    }
    function l(M, S, b) {
      const C = b.x - S.x,
        w = b.y - S.y,
        R = M.x - S.x,
        E = M.y - S.y,
        I = C * E - R * w;
      if (M.x === S.x && M.y === S.y) {
        ((n.loc = r.ORIGIN), (n.t = 0));
        return;
      }
      if (M.x === b.x && M.y === b.y) {
        ((n.loc = r.DESTINATION), (n.t = 1));
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
      (C !== 0 ? (F = R / C) : (F = E / w), (n.loc = r.BETWEEN), (n.t = F));
    }
    function c(M, S) {
      const b = [],
        C = [];
      for (let w = 1; w < M.length; w++) {
        const R = M[w - 1],
          E = M[w];
        for (let I = 1; I < S.length; I++) {
          const F = S[I - 1],
            k = S[I],
            L = a(R, E, F, k);
          L !== null &&
            b.find(
              (D) => D.t <= L.t + Number.EPSILON && D.t >= L.t - Number.EPSILON,
            ) === void 0 &&
            (b.push(L), C.push(new Vector2(L.x, L.y)));
        }
      }
      return C;
    }
    function u(M, S, b) {
      const C = new Vector2();
      S.getCenter(C);
      const w = [];
      return (
        b.forEach((R) => {
          R.boundingBox.containsPoint(C) &&
            c(M, R.points).forEach((I) => {
              w.push({ identifier: R.identifier, isCW: R.isCW, point: I });
            });
        }),
        w.sort((R, E) => R.point.x - E.point.x),
        w
      );
    }
    function f(M, S, b, C, w) {
      (w == null || w === "") && (w = "nonzero");
      const R = new Vector2();
      M.boundingBox.getCenter(R);
      const E = [new Vector2(b, R.y), new Vector2(C, R.y)],
        I = u(E, M.boundingBox, S);
      I.sort((re, ce) => re.point.x - ce.point.x);
      const F = [],
        k = [];
      I.forEach((re) => {
        re.identifier === M.identifier ? F.push(re) : k.push(re);
      });
      const L = F[0].point.x,
        D = [];
      let ne = 0;
      for (; ne < k.length && k[ne].point.x < L;)
        (D.length > 0 && D[D.length - 1] === k[ne].identifier
          ? D.pop()
          : D.push(k[ne].identifier),
          ne++);
      if ((D.push(M.identifier), w === "evenodd")) {
        const re = D.length % 2 === 0,
          ce = D[D.length - 2];
        return { identifier: M.identifier, isHole: re, for: ce };
      } else if (w === "nonzero") {
        let re = !0,
          ce = null,
          z = null;
        for (let j = 0; j < D.length; j++) {
          const X = D[j];
          re
            ? ((z = S[X].isCW), (re = !1), (ce = X))
            : z !== S[X].isCW && ((z = S[X].isCW), (re = !0));
        }
        return { identifier: M.identifier, isHole: re, for: ce };
      } else
        console.warn('fill-rule: "' + w + '" is currently not implemented.');
    }
    let p = 999999999,
      g = -999999999,
      v = e.subPaths.map((M) => {
        const S = M.getPoints();
        let b = -999999999,
          C = 999999999,
          w = -999999999,
          R = 999999999;
        for (let E = 0; E < S.length; E++) {
          const I = S[E];
          (I.y > b && (b = I.y),
            I.y < C && (C = I.y),
            I.x > w && (w = I.x),
            I.x < R && (R = I.x));
        }
        return (
          g <= w && (g = w + 1),
          p >= R && (p = R - 1),
          {
            curves: M.curves,
            points: S,
            isCW: ShapeUtils.isClockWise(S),
            identifier: -1,
            boundingBox: new Box2(new Vector2(R, C), new Vector2(w, b)),
          }
        );
      });
    v = v.filter((M) => M.points.length > 1);
    for (let M = 0; M < v.length; M++) v[M].identifier = M;
    const _ = v.map((M) =>
        f(M, v, p, g, e.userData ? e.userData.style.fillRule : void 0),
      ),
      T = [];
    return (
      v.forEach((M) => {
        if (!_[M.identifier].isHole) {
          const b = new Shape();
          ((b.curves = M.curves),
            _.filter((w) => w.isHole && w.for === M.identifier).forEach((w) => {
              const R = v[w.identifier],
                E = new Path();
              ((E.curves = R.curves), b.holes.push(E));
            }),
            T.push(b));
        }
      }),
      T
    );
  }
  getStrokeStyle(e, t, r, n, a) {
    return (
      (e = e !== void 0 ? e : 1),
      (t = t !== void 0 ? t : "#000"),
      (r = r !== void 0 ? r : "miter"),
      (n = n !== void 0 ? n : "butt"),
      (a = a !== void 0 ? a : 4),
      {
        strokeColor: t,
        strokeWidth: e,
        strokeLineJoin: r,
        strokeLineCap: n,
        strokeMiterLimit: a,
      }
    );
  }
  pointsToStroke(e, t, r, n) {
    const a = [],
      l = [],
      c = [];
    if (SVGLoader.pointsToStrokeWithBuffers(e, t, r, n, a, l, c) === 0)
      return null;
    const u = new BufferGeometry();
    return (
      u.setAttribute("position", new Float32BufferAttribute(a, 3)),
      u.setAttribute("normal", new Float32BufferAttribute(l, 3)),
      u.setAttribute("uv", new Float32BufferAttribute(c, 2)),
      u
    );
  }
  pointsToStrokeWithBuffers(e, t, r, n, a, l, c, u) {
    const f = new Vector2(),
      p = new Vector2(),
      g = new Vector2(),
      v = new Vector2(),
      _ = new Vector2(),
      T = new Vector2(),
      M = new Vector2(),
      S = new Vector2(),
      b = new Vector2(),
      C = new Vector2(),
      w = new Vector2(),
      R = new Vector2(),
      E = new Vector2(),
      I = new Vector2(),
      F = new Vector2(),
      k = new Vector2(),
      L = new Vector2();
    ((r = r !== void 0 ? r : 12),
      (n = n !== void 0 ? n : 0.001),
      (u = u !== void 0 ? u : 0),
      (e = Ue(e)));
    const D = e.length;
    if (D < 2) return 0;
    const ne = e[0].equals(e[D - 1]);
    let re,
      ce = e[0],
      z;
    const j = t.strokeWidth / 2,
      X = 1 / (D - 1);
    let Z = 0,
      q,
      ue,
      oe,
      te,
      le = !1,
      Te = 0,
      K = u * 3,
      G = u * 2;
    (U(e[0], e[1], f).multiplyScalar(j),
      S.copy(e[0]).sub(f),
      b.copy(e[0]).add(f),
      C.copy(S),
      w.copy(b));
    for (let fe = 1; fe < D; fe++) {
      ((re = e[fe]),
        fe === D - 1 ? (ne ? (z = e[1]) : (z = void 0)) : (z = e[fe + 1]));
      const Se = f;
      if (
        (U(ce, re, Se),
        g.copy(Se).multiplyScalar(j),
        R.copy(re).sub(g),
        E.copy(re).add(g),
        (q = Z + X),
        (ue = !1),
        z !== void 0)
      ) {
        (U(re, z, p),
          g.copy(p).multiplyScalar(j),
          I.copy(re).sub(g),
          F.copy(re).add(g),
          (oe = !0),
          g.subVectors(z, ce),
          Se.dot(g) < 0 && (oe = !1),
          fe === 1 && (le = oe),
          g.subVectors(z, re),
          g.normalize());
        const Me = Math.abs(Se.dot(g));
        if (Me > Number.EPSILON) {
          const Be = j / Me;
          (g.multiplyScalar(-Be),
            v.subVectors(re, ce),
            _.copy(v).setLength(Be).add(g),
            k.copy(_).negate());
          const se = _.length(),
            $ = v.length();
          (v.divideScalar($), T.subVectors(z, re));
          const Oe = T.length();
          switch (
            (T.divideScalar(Oe),
            v.dot(k) < $ && T.dot(k) < Oe && (ue = !0),
            L.copy(_).add(re),
            k.add(re),
            (te = !1),
            ue ? (oe ? (F.copy(k), E.copy(k)) : (I.copy(k), R.copy(k))) : ve(),
            t.strokeLineJoin)
          ) {
            case "bevel":
              de(oe, ue, q);
              break;
            case "round":
              (xe(oe, ue), oe ? he(re, R, I, q, 0) : he(re, F, E, q, 1));
              break;
            case "miter":
            case "miter-clip":
            default:
              const Ye = (j * t.strokeMiterLimit) / se;
              if (Ye < 1)
                if (t.strokeLineJoin !== "miter-clip") {
                  de(oe, ue, q);
                  break;
                } else
                  (xe(oe, ue),
                    oe
                      ? (T.subVectors(L, R).multiplyScalar(Ye).add(R),
                        M.subVectors(L, I).multiplyScalar(Ye).add(I),
                        N(R, q, 0),
                        N(T, q, 0),
                        N(re, q, 0.5),
                        N(re, q, 0.5),
                        N(T, q, 0),
                        N(M, q, 0),
                        N(re, q, 0.5),
                        N(M, q, 0),
                        N(I, q, 0))
                      : (T.subVectors(L, E).multiplyScalar(Ye).add(E),
                        M.subVectors(L, F).multiplyScalar(Ye).add(F),
                        N(E, q, 1),
                        N(T, q, 1),
                        N(re, q, 0.5),
                        N(re, q, 0.5),
                        N(T, q, 1),
                        N(M, q, 1),
                        N(re, q, 0.5),
                        N(M, q, 1),
                        N(F, q, 1)));
              else
                (ue
                  ? (oe
                      ? (N(b, Z, 1),
                        N(S, Z, 0),
                        N(L, q, 0),
                        N(b, Z, 1),
                        N(L, q, 0),
                        N(k, q, 1))
                      : (N(b, Z, 1),
                        N(S, Z, 0),
                        N(L, q, 1),
                        N(S, Z, 0),
                        N(k, q, 0),
                        N(L, q, 1)),
                    oe ? I.copy(L) : F.copy(L))
                  : oe
                    ? (N(R, q, 0),
                      N(L, q, 0),
                      N(re, q, 0.5),
                      N(re, q, 0.5),
                      N(L, q, 0),
                      N(I, q, 0))
                    : (N(E, q, 1),
                      N(L, q, 1),
                      N(re, q, 0.5),
                      N(re, q, 0.5),
                      N(L, q, 1),
                      N(F, q, 1)),
                  (te = !0));
              break;
          }
        } else ve();
      } else ve();
      (!ne && fe === D - 1 && ee(e[0], C, w, oe, !0, Z),
        (Z = q),
        (ce = re),
        S.copy(I),
        b.copy(F));
    }
    if (!ne) ee(re, R, E, oe, !1, q);
    else if (ue && a) {
      let fe = L,
        Se = k;
      (le !== oe && ((fe = k), (Se = L)),
        oe
          ? (te || le) &&
            (Se.toArray(a, 0 * 3),
            Se.toArray(a, 3 * 3),
            te && fe.toArray(a, 1 * 3))
          : (te || !le) &&
            (Se.toArray(a, 1 * 3),
            Se.toArray(a, 3 * 3),
            te && fe.toArray(a, 0 * 3)));
    }
    return Te;
    function U(fe, Se, Me) {
      return (Me.subVectors(Se, fe), Me.set(-Me.y, Me.x).normalize());
    }
    function N(fe, Se, Me) {
      (a &&
        ((a[K] = fe.x),
        (a[K + 1] = fe.y),
        (a[K + 2] = 0),
        l && ((l[K] = 0), (l[K + 1] = 0), (l[K + 2] = 1)),
        (K += 3),
        c && ((c[G] = Se), (c[G + 1] = Me), (G += 2))),
        (Te += 3));
    }
    function he(fe, Se, Me, Be, se) {
      (f.copy(Se).sub(fe).normalize(), p.copy(Me).sub(fe).normalize());
      let $ = Math.PI;
      const Oe = f.dot(p);
      (Math.abs(Oe) < 1 && ($ = Math.abs(Math.acos(Oe))), ($ /= r), g.copy(Se));
      for (let Ye = 0, st = r - 1; Ye < st; Ye++)
        (v.copy(g).rotateAround(fe, $),
          N(g, Be, se),
          N(v, Be, se),
          N(fe, Be, 0.5),
          g.copy(v));
      (N(v, Be, se), N(Me, Be, se), N(fe, Be, 0.5));
    }
    function ve() {
      (N(b, Z, 1), N(S, Z, 0), N(R, q, 0), N(b, Z, 1), N(R, q, 1), N(E, q, 0));
    }
    function de(fe, Se, Me) {
      Se
        ? fe
          ? (N(b, Z, 1),
            N(S, Z, 0),
            N(R, q, 0),
            N(b, Z, 1),
            N(R, q, 0),
            N(k, q, 1),
            N(R, Me, 0),
            N(I, Me, 0),
            N(k, Me, 0.5))
          : (N(b, Z, 1),
            N(S, Z, 0),
            N(E, q, 1),
            N(S, Z, 0),
            N(k, q, 0),
            N(E, q, 1),
            N(E, Me, 1),
            N(F, Me, 0),
            N(k, Me, 0.5))
        : fe
          ? (N(R, Me, 0), N(I, Me, 0), N(re, Me, 0.5))
          : (N(E, Me, 1), N(F, Me, 0), N(re, Me, 0.5));
    }
    function xe(fe, Se) {
      Se &&
        (fe
          ? (N(b, Z, 1),
            N(S, Z, 0),
            N(R, q, 0),
            N(b, Z, 1),
            N(R, q, 0),
            N(k, q, 1),
            N(R, Z, 0),
            N(re, q, 0.5),
            N(k, q, 1),
            N(re, q, 0.5),
            N(I, Z, 0),
            N(k, q, 1))
          : (N(b, Z, 1),
            N(S, Z, 0),
            N(E, q, 1),
            N(S, Z, 0),
            N(k, q, 0),
            N(E, q, 1),
            N(E, Z, 1),
            N(k, q, 0),
            N(re, q, 0.5),
            N(re, q, 0.5),
            N(k, q, 0),
            N(F, Z, 1)));
    }
    function ee(fe, Se, Me, Be, se, $) {
      switch (t.strokeLineCap) {
        case "round":
          se ? he(fe, Me, Se, $, 0.5) : he(fe, Se, Me, $, 0.5);
          break;
        case "square":
          if (se)
            (f.subVectors(Se, fe),
              p.set(f.y, -f.x),
              g.addVectors(f, p).add(fe),
              v.subVectors(p, f).add(fe),
              Be
                ? (g.toArray(a, 1 * 3),
                  v.toArray(a, 0 * 3),
                  v.toArray(a, 3 * 3))
                : (g.toArray(a, 1 * 3),
                  g.toArray(a, 3 * 3),
                  v.toArray(a, 0 * 3)));
          else {
            (f.subVectors(Me, fe),
              p.set(f.y, -f.x),
              g.addVectors(f, p).add(fe),
              v.subVectors(p, f).add(fe));
            const Oe = a.length;
            Be
              ? (g.toArray(a, Oe - 1 * 3),
                v.toArray(a, Oe - 2 * 3),
                v.toArray(a, Oe - 4 * 3))
              : (g.toArray(a, Oe - 2 * 3),
                v.toArray(a, Oe - 1 * 3),
                v.toArray(a, Oe - 4 * 3));
          }
          break;
      }
    }
    function Ue(fe) {
      let Se = !1;
      for (let Be = 1, se = fe.length - 1; Be < se; Be++)
        if (fe[Be].distanceTo(fe[Be + 1]) < n) {
          Se = !0;
          break;
        }
      if (!Se) return fe;
      const Me = [];
      Me.push(fe[0]);
      for (let Be = 1, se = fe.length - 1; Be < se; Be++)
        fe[Be].distanceTo(fe[Be + 1]) >= n && Me.push(fe[Be]);
      return (Me.push(fe[fe.length - 1]), Me);
    }
  }
}
const svgParser = new SVGParser(),
  titleVert = `#define GLSLIFY 1
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
gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv*0.002);}`,
  titleFrag = `#define GLSLIFY 1
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

globalThis.svgParser = svgParser;
export { SVGParser, svgParser };
export default SVGParser;
