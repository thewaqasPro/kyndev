/**
 * High Dynamic Range OpenEXR (.exr) Loader
 */
import * as THREE from "../../three.js";
class EXRLoader extends DataTextureLoader {
  constructor(e) {
    (super(e), (this.type = HalfFloatType));
  }
  parse(e) {
    const L = Math.pow(2.7182818, 2.2);
    function D(P, B) {
      let Q = 0;
      for (let H = 0; H < 65536; ++H)
        (H == 0 || P[H >> 3] & (1 << (H & 7))) && (B[Q++] = H);
      const A = Q - 1;
      for (; Q < 65536;) B[Q++] = 0;
      return A;
    }
    function ne(P) {
      for (let B = 0; B < 16384; B++)
        ((P[B] = {}), (P[B].len = 0), (P[B].lit = 0), (P[B].p = null));
    }
    const re = { l: 0, c: 0, lc: 0 };
    function ce(P, B, Q, A, H) {
      for (; Q < P;) ((B = (B << 8) | ot(A, H)), (Q += 8));
      ((Q -= P), (re.l = (B >> Q) & ((1 << P) - 1)), (re.c = B), (re.lc = Q));
    }
    const z = new Array(59);
    function j(P) {
      for (let Q = 0; Q <= 58; ++Q) z[Q] = 0;
      for (let Q = 0; Q < 65537; ++Q) z[P[Q]] += 1;
      let B = 0;
      for (let Q = 58; Q > 0; --Q) {
        const A = (B + z[Q]) >> 1;
        ((z[Q] = B), (B = A));
      }
      for (let Q = 0; Q < 65537; ++Q) {
        const A = P[Q];
        A > 0 && (P[Q] = A | (z[A]++ << 6));
      }
    }
    function X(P, B, Q, A, H, V) {
      const J = B;
      let ie = 0,
        ge = 0;
      for (; A <= H; A++) {
        if (J.value - B.value > Q) return !1;
        ce(6, ie, ge, P, J);
        const pe = re.l;
        if (((ie = re.c), (ge = re.lc), (V[A] = pe), pe == 63)) {
          if (J.value - B.value > Q)
            throw new Error("Something wrong with hufUnpackEncTable");
          ce(8, ie, ge, P, J);
          let ye = re.l + 6;
          if (((ie = re.c), (ge = re.lc), A + ye > H + 1))
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; ye--;) V[A++] = 0;
          A--;
        } else if (pe >= 59) {
          let ye = pe - 59 + 2;
          if (A + ye > H + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; ye--;) V[A++] = 0;
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
        const H = q(P[B]),
          V = Z(P[B]);
        if (H >> V) throw new Error("Invalid table entry");
        if (V > 14) {
          const J = A[H >> (V - 14)];
          if (J.len) throw new Error("Invalid table entry");
          if ((J.lit++, J.p)) {
            const ie = J.p;
            J.p = new Array(J.lit);
            for (let ge = 0; ge < J.lit - 1; ++ge) J.p[ge] = ie[ge];
          } else J.p = new Array(1);
          J.p[J.lit - 1] = B;
        } else if (V) {
          let J = 0;
          for (let ie = 1 << (14 - V); ie > 0; ie--) {
            const ge = A[(H << (14 - V)) + J];
            if (ge.len || ge.p) throw new Error("Invalid table entry");
            ((ge.len = V), (ge.lit = B), J++);
          }
        }
      }
      return !0;
    }
    const oe = { c: 0, lc: 0 };
    function te(P, B, Q, A) {
      ((P = (P << 8) | ot(Q, A)), (B += 8), (oe.c = P), (oe.lc = B));
    }
    const le = { c: 0, lc: 0 };
    function Te(P, B, Q, A, H, V, J, ie, ge) {
      if (P == B) {
        (A < 8 && (te(Q, A, H, V), (Q = oe.c), (A = oe.lc)), (A -= 8));
        let pe = Q >> A;
        if (((pe = new Uint8Array([pe])[0]), ie.value + pe > ge)) return !1;
        const ye = J[ie.value - 1];
        for (; pe-- > 0;) J[ie.value++] = ye;
      } else if (ie.value < ge) J[ie.value++] = P;
      else return !1;
      ((le.c = Q), (le.lc = A));
    }
    function K(P) {
      return P & 65535;
    }
    function G(P) {
      const B = K(P);
      return B > 32767 ? B - 65536 : B;
    }
    const U = { a: 0, b: 0 };
    function N(P, B) {
      const Q = G(P),
        H = G(B),
        V = Q + (H & 1) + (H >> 1),
        J = V,
        ie = V - H;
      ((U.a = J), (U.b = ie));
    }
    function he(P, B) {
      const Q = K(P),
        A = K(B),
        H = (Q - (A >> 1)) & 65535,
        V = (A + H - 32768) & 65535;
      ((U.a = V), (U.b = H));
    }
    function ve(P, B, Q, A, H, V, J) {
      const ie = J < 16384,
        ge = Q > H ? H : Q;
      let pe = 1,
        ye,
        Ce;
      for (; pe <= ge;) pe <<= 1;
      for (pe >>= 1, ye = pe, pe >>= 1; pe >= 1;) {
        Ce = 0;
        const Ae = Ce + V * (H - ye),
          De = V * pe,
          He = V * ye,
          Ve = A * pe,
          $e = A * ye;
        let Ze, ct, it, Qe;
        for (; Ce <= Ae; Ce += He) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve,
              _t = ut + De,
              ft = _t + Ve;
            ie
              ? (N(P[ut + B], P[_t + B]),
                (Ze = U.a),
                (it = U.b),
                N(P[dt + B], P[ft + B]),
                (ct = U.a),
                (Qe = U.b),
                N(Ze, ct),
                (P[ut + B] = U.a),
                (P[dt + B] = U.b),
                N(it, Qe),
                (P[_t + B] = U.a),
                (P[ft + B] = U.b))
              : (he(P[ut + B], P[_t + B]),
                (Ze = U.a),
                (it = U.b),
                he(P[dt + B], P[ft + B]),
                (ct = U.a),
                (Qe = U.b),
                he(Ze, ct),
                (P[ut + B] = U.a),
                (P[dt + B] = U.b),
                he(it, Qe),
                (P[_t + B] = U.a),
                (P[ft + B] = U.b));
          }
          if (Q & pe) {
            const dt = ut + De;
            (ie ? N(P[ut + B], P[dt + B]) : he(P[ut + B], P[dt + B]),
              (Ze = U.a),
              (P[dt + B] = U.b),
              (P[ut + B] = Ze));
          }
        }
        if (H & pe) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve;
            (ie ? N(P[ut + B], P[dt + B]) : he(P[ut + B], P[dt + B]),
              (Ze = U.a),
              (P[dt + B] = U.b),
              (P[ut + B] = Ze));
          }
        }
        ((ye = pe), (pe >>= 1));
      }
      return Ce;
    }
    function de(P, B, Q, A, H, V, J, ie, ge) {
      let pe = 0,
        ye = 0;
      const Ce = J,
        Ae = Math.trunc(A.value + (H + 7) / 8);
      for (; A.value < Ae;)
        for (te(pe, ye, Q, A), pe = oe.c, ye = oe.lc; ye >= 14;) {
          const He = (pe >> (ye - 14)) & 16383,
            Ve = B[He];
          if (Ve.len)
            ((ye -= Ve.len),
              Te(Ve.lit, V, pe, ye, Q, A, ie, ge, Ce),
              (pe = le.c),
              (ye = le.lc));
          else {
            if (!Ve.p) throw new Error("hufDecode issues");
            let $e;
            for ($e = 0; $e < Ve.lit; $e++) {
              const Ze = Z(P[Ve.p[$e]]);
              for (; ye < Ze && A.value < Ae;)
                (te(pe, ye, Q, A), (pe = oe.c), (ye = oe.lc));
              if (
                ye >= Ze &&
                q(P[Ve.p[$e]]) == ((pe >> (ye - Ze)) & ((1 << Ze) - 1))
              ) {
                ((ye -= Ze),
                  Te(Ve.p[$e], V, pe, ye, Q, A, ie, ge, Ce),
                  (pe = le.c),
                  (ye = le.lc));
                break;
              }
            }
            if ($e == Ve.lit) throw new Error("hufDecode issues");
          }
        }
      const De = (8 - H) & 7;
      for (pe >>= De, ye -= De; ye > 0;) {
        const He = B[(pe << (14 - ye)) & 16383];
        if (He.len)
          ((ye -= He.len),
            Te(He.lit, V, pe, ye, Q, A, ie, ge, Ce),
            (pe = le.c),
            (ye = le.lc));
        else throw new Error("hufDecode issues");
      }
      return !0;
    }
    function xe(P, B, Q, A, H, V) {
      const J = { value: 0 },
        ie = Q.value,
        ge = Re(B, Q),
        pe = Re(B, Q);
      Q.value += 4;
      const ye = Re(B, Q);
      if (((Q.value += 4), ge < 0 || ge >= 65537 || pe < 0 || pe >= 65537))
        throw new Error("Something wrong with HUF_ENCSIZE");
      const Ce = new Array(65537),
        Ae = new Array(16384);
      ne(Ae);
      const De = A - (Q.value - ie);
      if ((X(P, Q, De, ge, pe, Ce), ye > 8 * (A - (Q.value - ie))))
        throw new Error("Something wrong with hufUncompress");
      (ue(Ce, ge, pe, Ae), de(Ce, Ae, P, Q, ye, pe, V, H, J));
    }
    function ee(P, B, Q) {
      for (let A = 0; A < Q; ++A) B[A] = P[B[A]];
    }
    function Ue(P) {
      for (let B = 1; B < P.length; B++) {
        const Q = P[B - 1] + P[B] - 128;
        P[B] = Q;
      }
    }
    function fe(P, B) {
      let Q = 0,
        A = Math.floor((P.length + 1) / 2),
        H = 0;
      const V = P.length - 1;
      for (; !(H > V || ((B[H++] = P[Q++]), H > V));) B[H++] = P[A++];
    }
    function Se(P) {
      let B = P.byteLength;
      const Q = new Array();
      let A = 0;
      const H = new DataView(P);
      for (; B > 0;) {
        const V = H.getInt8(A++);
        if (V < 0) {
          const J = -V;
          B -= J + 1;
          for (let ie = 0; ie < J; ie++) Q.push(H.getUint8(A++));
        } else {
          const J = V;
          B -= 2;
          const ie = H.getUint8(A++);
          for (let ge = 0; ge < J + 1; ge++) Q.push(ie);
        }
      }
      return Q;
    }
    function Me(P, B, Q, A, H, V) {
      let J = new DataView(V.buffer);
      const ie = Q[P.idx[0]].width,
        ge = Q[P.idx[0]].height,
        pe = 3,
        ye = Math.floor(ie / 8),
        Ce = Math.ceil(ie / 8),
        Ae = Math.ceil(ge / 8),
        De = ie - (Ce - 1) * 8,
        He = ge - (Ae - 1) * 8,
        Ve = { value: 0 },
        $e = new Array(pe),
        Ze = new Array(pe),
        ct = new Array(pe),
        it = new Array(pe),
        Qe = new Array(pe);
      for (let Ke = 0; Ke < pe; ++Ke)
        ((Qe[Ke] = B[P.idx[Ke]]),
          ($e[Ke] = Ke < 1 ? 0 : $e[Ke - 1] + Ce * Ae),
          (Ze[Ke] = new Float32Array(64)),
          (ct[Ke] = new Uint16Array(64)),
          (it[Ke] = new Uint16Array(Ce * 64)));
      for (let Ke = 0; Ke < Ae; ++Ke) {
        let dt = 8;
        Ke == Ae - 1 && (dt = He);
        let _t = 8;
        for (let lt = 0; lt < Ce; ++lt) {
          lt == Ce - 1 && (_t = De);
          for (let rt = 0; rt < pe; ++rt)
            (ct[rt].fill(0),
              (ct[rt][0] = H[$e[rt]++]),
              Be(Ve, A, ct[rt]),
              se(ct[rt], Ze[rt]),
              $(Ze[rt]));
          Oe(Ze);
          for (let rt = 0; rt < pe; ++rt) Ye(Ze[rt], it[rt], lt * 64);
        }
        let ft = 0;
        for (let lt = 0; lt < pe; ++lt) {
          const rt = Q[P.idx[lt]].type;
          for (let vt = 8 * Ke; vt < 8 * Ke + dt; ++vt) {
            ft = Qe[lt][vt];
            for (let bt = 0; bt < ye; ++bt) {
              const mt = bt * 64 + (vt & 7) * 8;
              (J.setUint16(ft + 0 * 2 * rt, it[lt][mt + 0], !0),
                J.setUint16(ft + 1 * 2 * rt, it[lt][mt + 1], !0),
                J.setUint16(ft + 2 * 2 * rt, it[lt][mt + 2], !0),
                J.setUint16(ft + 3 * 2 * rt, it[lt][mt + 3], !0),
                J.setUint16(ft + 4 * 2 * rt, it[lt][mt + 4], !0),
                J.setUint16(ft + 5 * 2 * rt, it[lt][mt + 5], !0),
                J.setUint16(ft + 6 * 2 * rt, it[lt][mt + 6], !0),
                J.setUint16(ft + 7 * 2 * rt, it[lt][mt + 7], !0),
                (ft += 8 * 2 * rt));
            }
          }
          if (ye != Ce)
            for (let vt = 8 * Ke; vt < 8 * Ke + dt; ++vt) {
              const bt = Qe[lt][vt] + 8 * ye * 2 * rt,
                mt = ye * 64 + (vt & 7) * 8;
              for (let wt = 0; wt < _t; ++wt)
                J.setUint16(bt + wt * 2 * rt, it[lt][mt + wt], !0);
            }
        }
      }
      const ut = new Uint16Array(ie);
      J = new DataView(V.buffer);
      for (let Ke = 0; Ke < pe; ++Ke) {
        Q[P.idx[Ke]].decoded = !0;
        const dt = Q[P.idx[Ke]].type;
        if (Q[Ke].type == 2)
          for (let _t = 0; _t < ge; ++_t) {
            const ft = Qe[Ke][_t];
            for (let lt = 0; lt < ie; ++lt)
              ut[lt] = J.getUint16(ft + lt * 2 * dt, !0);
            for (let lt = 0; lt < ie; ++lt)
              J.setFloat32(ft + lt * 2 * dt, Pe(ut[lt]), !0);
          }
      }
    }
    function Be(P, B, Q) {
      let A,
        H = 1;
      for (; H < 64;)
        ((A = B[P.value]),
          A == 65280
            ? (H = 64)
            : A >> 8 == 255
              ? (H += A & 255)
              : ((Q[H] = A), H++),
          P.value++);
    }
    function se(P, B) {
      ((B[0] = Pe(P[0])),
        (B[1] = Pe(P[1])),
        (B[2] = Pe(P[5])),
        (B[3] = Pe(P[6])),
        (B[4] = Pe(P[14])),
        (B[5] = Pe(P[15])),
        (B[6] = Pe(P[27])),
        (B[7] = Pe(P[28])),
        (B[8] = Pe(P[2])),
        (B[9] = Pe(P[4])),
        (B[10] = Pe(P[7])),
        (B[11] = Pe(P[13])),
        (B[12] = Pe(P[16])),
        (B[13] = Pe(P[26])),
        (B[14] = Pe(P[29])),
        (B[15] = Pe(P[42])),
        (B[16] = Pe(P[3])),
        (B[17] = Pe(P[8])),
        (B[18] = Pe(P[12])),
        (B[19] = Pe(P[17])),
        (B[20] = Pe(P[25])),
        (B[21] = Pe(P[30])),
        (B[22] = Pe(P[41])),
        (B[23] = Pe(P[43])),
        (B[24] = Pe(P[9])),
        (B[25] = Pe(P[11])),
        (B[26] = Pe(P[18])),
        (B[27] = Pe(P[24])),
        (B[28] = Pe(P[31])),
        (B[29] = Pe(P[40])),
        (B[30] = Pe(P[44])),
        (B[31] = Pe(P[53])),
        (B[32] = Pe(P[10])),
        (B[33] = Pe(P[19])),
        (B[34] = Pe(P[23])),
        (B[35] = Pe(P[32])),
        (B[36] = Pe(P[39])),
        (B[37] = Pe(P[45])),
        (B[38] = Pe(P[52])),
        (B[39] = Pe(P[54])),
        (B[40] = Pe(P[20])),
        (B[41] = Pe(P[22])),
        (B[42] = Pe(P[33])),
        (B[43] = Pe(P[38])),
        (B[44] = Pe(P[46])),
        (B[45] = Pe(P[51])),
        (B[46] = Pe(P[55])),
        (B[47] = Pe(P[60])),
        (B[48] = Pe(P[21])),
        (B[49] = Pe(P[34])),
        (B[50] = Pe(P[37])),
        (B[51] = Pe(P[47])),
        (B[52] = Pe(P[50])),
        (B[53] = Pe(P[56])),
        (B[54] = Pe(P[59])),
        (B[55] = Pe(P[61])),
        (B[56] = Pe(P[35])),
        (B[57] = Pe(P[36])),
        (B[58] = Pe(P[48])),
        (B[59] = Pe(P[49])),
        (B[60] = Pe(P[57])),
        (B[61] = Pe(P[58])),
        (B[62] = Pe(P[62])),
        (B[63] = Pe(P[63])));
    }
    function $(P) {
      const B = 0.5 * Math.cos(0.7853975),
        Q = 0.5 * Math.cos(3.14159 / 16),
        A = 0.5 * Math.cos(3.14159 / 8),
        H = 0.5 * Math.cos((3 * 3.14159) / 16),
        V = 0.5 * Math.cos((5 * 3.14159) / 16),
        J = 0.5 * Math.cos((3 * 3.14159) / 8),
        ie = 0.5 * Math.cos((7 * 3.14159) / 16),
        ge = new Array(4),
        pe = new Array(4),
        ye = new Array(4),
        Ce = new Array(4);
      for (let Ae = 0; Ae < 8; ++Ae) {
        const De = Ae * 8;
        ((ge[0] = A * P[De + 2]),
          (ge[1] = J * P[De + 2]),
          (ge[2] = A * P[De + 6]),
          (ge[3] = J * P[De + 6]),
          (pe[0] =
            Q * P[De + 1] + H * P[De + 3] + V * P[De + 5] + ie * P[De + 7]),
          (pe[1] =
            H * P[De + 1] - ie * P[De + 3] - Q * P[De + 5] - V * P[De + 7]),
          (pe[2] =
            V * P[De + 1] - Q * P[De + 3] + ie * P[De + 5] + H * P[De + 7]),
          (pe[3] =
            ie * P[De + 1] - V * P[De + 3] + H * P[De + 5] - Q * P[De + 7]),
          (ye[0] = B * (P[De + 0] + P[De + 4])),
          (ye[3] = B * (P[De + 0] - P[De + 4])),
          (ye[1] = ge[0] + ge[3]),
          (ye[2] = ge[1] - ge[2]),
          (Ce[0] = ye[0] + ye[1]),
          (Ce[1] = ye[3] + ye[2]),
          (Ce[2] = ye[3] - ye[2]),
          (Ce[3] = ye[0] - ye[1]),
          (P[De + 0] = Ce[0] + pe[0]),
          (P[De + 1] = Ce[1] + pe[1]),
          (P[De + 2] = Ce[2] + pe[2]),
          (P[De + 3] = Ce[3] + pe[3]),
          (P[De + 4] = Ce[3] - pe[3]),
          (P[De + 5] = Ce[2] - pe[2]),
          (P[De + 6] = Ce[1] - pe[1]),
          (P[De + 7] = Ce[0] - pe[0]));
      }
      for (let Ae = 0; Ae < 8; ++Ae)
        ((ge[0] = A * P[16 + Ae]),
          (ge[1] = J * P[16 + Ae]),
          (ge[2] = A * P[48 + Ae]),
          (ge[3] = J * P[48 + Ae]),
          (pe[0] =
            Q * P[8 + Ae] + H * P[24 + Ae] + V * P[40 + Ae] + ie * P[56 + Ae]),
          (pe[1] =
            H * P[8 + Ae] - ie * P[24 + Ae] - Q * P[40 + Ae] - V * P[56 + Ae]),
          (pe[2] =
            V * P[8 + Ae] - Q * P[24 + Ae] + ie * P[40 + Ae] + H * P[56 + Ae]),
          (pe[3] =
            ie * P[8 + Ae] - V * P[24 + Ae] + H * P[40 + Ae] - Q * P[56 + Ae]),
          (ye[0] = B * (P[Ae] + P[32 + Ae])),
          (ye[3] = B * (P[Ae] - P[32 + Ae])),
          (ye[1] = ge[0] + ge[3]),
          (ye[2] = ge[1] - ge[2]),
          (Ce[0] = ye[0] + ye[1]),
          (Ce[1] = ye[3] + ye[2]),
          (Ce[2] = ye[3] - ye[2]),
          (Ce[3] = ye[0] - ye[1]),
          (P[0 + Ae] = Ce[0] + pe[0]),
          (P[8 + Ae] = Ce[1] + pe[1]),
          (P[16 + Ae] = Ce[2] + pe[2]),
          (P[24 + Ae] = Ce[3] + pe[3]),
          (P[32 + Ae] = Ce[3] - pe[3]),
          (P[40 + Ae] = Ce[2] - pe[2]),
          (P[48 + Ae] = Ce[1] - pe[1]),
          (P[56 + Ae] = Ce[0] - pe[0]));
    }
    function Oe(P) {
      for (let B = 0; B < 64; ++B) {
        const Q = P[0][B],
          A = P[1][B],
          H = P[2][B];
        ((P[0][B] = Q + 1.5747 * H),
          (P[1][B] = Q - 0.1873 * A - 0.4682 * H),
          (P[2][B] = Q + 1.8556 * A));
      }
    }
    function Ye(P, B, Q) {
      for (let A = 0; A < 64; ++A) B[Q + A] = DataUtils.toHalfFloat(st(P[A]));
    }
    function st(P) {
      return P <= 1
        ? Math.sign(P) * Math.pow(Math.abs(P), 2.2)
        : Math.sign(P) * Math.pow(L, Math.abs(P) - 1);
    }
    function W(P) {
      return new DataView(P.array.buffer, P.offset.value, P.size);
    }
    function O(P) {
      const B = P.viewer.buffer.slice(P.offset.value, P.offset.value + P.size),
        Q = new Uint8Array(Se(B)),
        A = new Uint8Array(Q.length);
      return (Ue(Q), fe(Q, A), new DataView(A.buffer));
    }
    function me(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size),
        Q = unzlibSync(B),
        A = new Uint8Array(Q.length);
      return (Ue(Q), fe(Q, A), new DataView(A.buffer));
    }
    function Ie(P) {
      const B = P.viewer,
        Q = { value: P.offset.value },
        A = new Uint16Array(
          P.width * P.scanlineBlockSize * (P.channels * P.type),
        ),
        H = new Uint8Array(8192);
      let V = 0;
      const J = new Array(P.channels);
      for (let He = 0; He < P.channels; He++)
        ((J[He] = {}),
          (J[He].start = V),
          (J[He].end = J[He].start),
          (J[He].nx = P.width),
          (J[He].ny = P.lines),
          (J[He].size = P.type),
          (V += J[He].nx * J[He].ny * J[He].size));
      const ie = ae(B, Q),
        ge = ae(B, Q);
      if (ge >= 8192)
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      if (ie <= ge)
        for (let He = 0; He < ge - ie + 1; He++) H[He + ie] = je(B, Q);
      const pe = new Uint16Array(65536),
        ye = D(H, pe),
        Ce = Re(B, Q);
      xe(P.array, B, Q, Ce, A, V);
      for (let He = 0; He < P.channels; ++He) {
        const Ve = J[He];
        for (let $e = 0; $e < J[He].size; ++$e)
          ve(A, Ve.start + $e, Ve.nx, Ve.size, Ve.ny, Ve.nx * Ve.size, ye);
      }
      ee(pe, A, V);
      let Ae = 0;
      const De = new Uint8Array(A.buffer.byteLength);
      for (let He = 0; He < P.lines; He++)
        for (let Ve = 0; Ve < P.channels; Ve++) {
          const $e = J[Ve],
            Ze = $e.nx * $e.size,
            ct = new Uint8Array(A.buffer, $e.end * 2, Ze * 2);
          (De.set(ct, Ae), (Ae += Ze * 2), ($e.end += Ze));
        }
      return new DataView(De.buffer);
    }
    function Le(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size),
        Q = unzlibSync(B),
        A = P.lines * P.channels * P.width,
        H = P.type == 1 ? new Uint16Array(A) : new Uint32Array(A);
      let V = 0,
        J = 0;
      const ie = new Array(4);
      for (let ge = 0; ge < P.lines; ge++)
        for (let pe = 0; pe < P.channels; pe++) {
          let ye = 0;
          switch (P.type) {
            case 1:
              ((ie[0] = V), (ie[1] = ie[0] + P.width), (V = ie[1] + P.width));
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae = (Q[ie[0]++] << 8) | Q[ie[1]++];
                ((ye += Ae), (H[J] = ye), J++);
              }
              break;
            case 2:
              ((ie[0] = V),
                (ie[1] = ie[0] + P.width),
                (ie[2] = ie[1] + P.width),
                (V = ie[2] + P.width));
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae =
                  (Q[ie[0]++] << 24) | (Q[ie[1]++] << 16) | (Q[ie[2]++] << 8);
                ((ye += Ae), (H[J] = ye), J++);
              }
              break;
          }
        }
      return new DataView(H.buffer);
    }
    function Y(P) {
      const B = P.viewer,
        Q = { value: P.offset.value },
        A = new Uint8Array(P.width * P.lines * (P.channels * P.type * 2)),
        H = {
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
          acCompression: We(B, Q),
        };
      if (H.version < 2)
        throw new Error(
          "EXRLoader.parse: " +
            Tt.compression +
            " version " +
            H.version +
            " is unsupported",
        );
      const V = new Array();
      let J = ae(B, Q) - 2;
      for (; J > 0;) {
        const Ve = we(B.buffer, Q),
          $e = je(B, Q),
          Ze = ($e >> 2) & 3,
          ct = ($e >> 4) - 1,
          it = new Int8Array([ct])[0],
          Qe = je(B, Q);
        (V.push({ name: Ve, index: it, type: Qe, compression: Ze }),
          (J -= Ve.length + 3));
      }
      const ie = Tt.channels,
        ge = new Array(P.channels);
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = (ge[Ve] = {}),
          Ze = ie[Ve];
        (($e.name = Ze.name),
          ($e.compression = 0),
          ($e.decoded = !1),
          ($e.type = Ze.pixelType),
          ($e.pLinear = Ze.pLinear),
          ($e.width = P.width),
          ($e.height = P.lines));
      }
      const pe = { idx: new Array(3) };
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = ge[Ve];
        for (let Ze = 0; Ze < V.length; ++Ze) {
          const ct = V[Ze];
          $e.name == ct.name &&
            (($e.compression = ct.compression),
            ct.index >= 0 && (pe.idx[ct.index] = Ve),
            ($e.offset = Ve));
        }
      }
      let ye, Ce, Ae;
      if (H.acCompressedSize > 0)
        switch (H.acCompression) {
          case 0:
            ((ye = new Uint16Array(H.totalAcUncompressedCount)),
              xe(
                P.array,
                B,
                Q,
                H.acCompressedSize,
                ye,
                H.totalAcUncompressedCount,
              ));
            break;
          case 1:
            const Ve = P.array.slice(
                Q.value,
                Q.value + H.totalAcUncompressedCount,
              ),
              $e = unzlibSync(Ve);
            ((ye = new Uint16Array($e.buffer)),
              (Q.value += H.totalAcUncompressedCount));
            break;
        }
      if (H.dcCompressedSize > 0) {
        const Ve = { array: P.array, offset: Q, size: H.dcCompressedSize };
        ((Ce = new Uint16Array(me(Ve).buffer)),
          (Q.value += H.dcCompressedSize));
      }
      if (H.rleRawSize > 0) {
        const Ve = P.array.slice(Q.value, Q.value + H.rleCompressedSize),
          $e = unzlibSync(Ve);
        ((Ae = Se($e.buffer)), (Q.value += H.rleCompressedSize));
      }
      let De = 0;
      const He = new Array(ge.length);
      for (let Ve = 0; Ve < He.length; ++Ve) He[Ve] = new Array();
      for (let Ve = 0; Ve < P.lines; ++Ve)
        for (let $e = 0; $e < ge.length; ++$e)
          (He[$e].push(De), (De += ge[$e].width * P.type * 2));
      Me(pe, He, ge, ye, Ce, A);
      for (let Ve = 0; Ve < ge.length; ++Ve) {
        const $e = ge[Ve];
        if (!$e.decoded)
          switch ($e.compression) {
            case 2:
              let Ze = 0,
                ct = 0;
              for (let it = 0; it < P.lines; ++it) {
                let Qe = He[Ve][Ze];
                for (let ut = 0; ut < $e.width; ++ut) {
                  for (let Ke = 0; Ke < 2 * $e.type; ++Ke)
                    A[Qe++] = Ae[ct + Ke * $e.width * $e.height];
                  ct++;
                }
                Ze++;
              }
              break;
            case 1:
            default:
              throw new Error(
                "EXRLoader.parse: unsupported channel compression",
              );
          }
      }
      return new DataView(A.buffer);
    }
    function we(P, B) {
      const Q = new Uint8Array(P);
      let A = 0;
      for (; Q[B.value + A] != 0;) A += 1;
      const H = new TextDecoder().decode(Q.slice(B.value, B.value + A));
      return ((B.value = B.value + A + 1), H);
    }
    function Ee(P, B, Q) {
      const A = new TextDecoder().decode(
        new Uint8Array(P).slice(B.value, B.value + Q),
      );
      return ((B.value = B.value + Q), A);
    }
    function Fe(P, B) {
      const Q = tt(P, B),
        A = Re(P, B);
      return [Q, A];
    }
    function Xe(P, B) {
      const Q = Re(P, B),
        A = Re(P, B);
      return [Q, A];
    }
    function tt(P, B) {
      const Q = P.getInt32(B.value, !0);
      return ((B.value = B.value + 4), Q);
    }
    function Re(P, B) {
      const Q = P.getUint32(B.value, !0);
      return ((B.value = B.value + 4), Q);
    }
    function ot(P, B) {
      const Q = P[B.value];
      return ((B.value = B.value + 1), Q);
    }
    function je(P, B) {
      const Q = P.getUint8(B.value);
      return ((B.value = B.value + 1), Q);
    }
    const We = function (P, B) {
      let Q;
      return (
        "getBigInt64" in DataView.prototype
          ? (Q = Number(P.getBigInt64(B.value, !0)))
          : (Q =
              P.getUint32(B.value + 4, !0) +
              Number(P.getUint32(B.value, !0) << 32)),
        (B.value += 8),
        Q
      );
    };
    function Ge(P, B) {
      const Q = P.getFloat32(B.value, !0);
      return ((B.value += 4), Q);
    }
    function qe(P, B) {
      return DataUtils.toHalfFloat(Ge(P, B));
    }
    function Pe(P) {
      const B = (P & 31744) >> 10,
        Q = P & 1023;
      return (
        (P >> 15 ? -1 : 1) *
        (B
          ? B === 31
            ? Q
              ? NaN
              : 1 / 0
            : Math.pow(2, B - 15) * (1 + Q / 1024)
          : 6103515625e-14 * (Q / 1024))
      );
    }
    function ae(P, B) {
      const Q = P.getUint16(B.value, !0);
      return ((B.value += 2), Q);
    }
    function ke(P, B) {
      return Pe(ae(P, B));
    }
    function Ne(P, B, Q, A) {
      const H = Q.value,
        V = [];
      for (; Q.value < H + A - 1;) {
        const J = we(B, Q),
          ie = tt(P, Q),
          ge = je(P, Q);
        Q.value += 3;
        const pe = tt(P, Q),
          ye = tt(P, Q);
        V.push({
          name: J,
          pixelType: ie,
          pLinear: ge,
          xSampling: pe,
          ySampling: ye,
        });
      }
      return ((Q.value += 1), V);
    }
    function be(P, B) {
      const Q = Ge(P, B),
        A = Ge(P, B),
        H = Ge(P, B),
        V = Ge(P, B),
        J = Ge(P, B),
        ie = Ge(P, B),
        ge = Ge(P, B),
        pe = Ge(P, B);
      return {
        redX: Q,
        redY: A,
        greenX: H,
        greenY: V,
        blueX: J,
        blueY: ie,
        whiteX: ge,
        whiteY: pe,
      };
    }
    function ze(P, B) {
      const Q = [
          "NO_COMPRESSION",
          "RLE_COMPRESSION",
          "ZIPS_COMPRESSION",
          "ZIP_COMPRESSION",
          "PIZ_COMPRESSION",
          "PXR24_COMPRESSION",
          "B44_COMPRESSION",
          "B44A_COMPRESSION",
          "DWAA_COMPRESSION",
          "DWAB_COMPRESSION",
        ],
        A = je(P, B);
      return Q[A];
    }
    function Je(P, B) {
      const Q = Re(P, B),
        A = Re(P, B),
        H = Re(P, B),
        V = Re(P, B);
      return { xMin: Q, yMin: A, xMax: H, yMax: V };
    }
    function at(P, B) {
      const Q = ["INCREASING_Y"],
        A = je(P, B);
      return Q[A];
    }
    function pt(P, B) {
      const Q = Ge(P, B),
        A = Ge(P, B);
      return [Q, A];
    }
    function xt(P, B) {
      const Q = Ge(P, B),
        A = Ge(P, B),
        H = Ge(P, B);
      return [Q, A, H];
    }
    function ht(P, B, Q, A, H) {
      if (A === "string" || A === "stringvector" || A === "iccProfile")
        return Ee(B, Q, H);
      if (A === "chlist") return Ne(P, B, Q, H);
      if (A === "chromaticities") return be(P, Q);
      if (A === "compression") return ze(P, Q);
      if (A === "box2i") return Je(P, Q);
      if (A === "lineOrder") return at(P, Q);
      if (A === "float") return Ge(P, Q);
      if (A === "v2f") return pt(P, Q);
      if (A === "v3f") return xt(P, Q);
      if (A === "int") return tt(P, Q);
      if (A === "rational") return Fe(P, Q);
      if (A === "timecode") return Xe(P, Q);
      if (A === "preview") return ((Q.value += H), "skipped");
      Q.value += H;
    }
    function gt(P, B, Q) {
      const A = {};
      if (P.getUint32(0, !0) != 20000630)
        throw new Error(
          "THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.",
        );
      A.version = P.getUint8(4);
      const H = P.getUint8(5);
      ((A.spec = {
        singleTile: !!(H & 2),
        longName: !!(H & 4),
        deepFormat: !!(H & 8),
        multiPart: !!(H & 16),
      }),
        (Q.value = 8));
      let V = !0;
      for (; V;) {
        const J = we(B, Q);
        if (J == 0) V = !1;
        else {
          const ie = we(B, Q),
            ge = Re(P, Q),
            pe = ht(P, B, Q, ie, ge);
          pe === void 0
            ? console.warn(
                `THREE.EXRLoader: Skipped unknown header attribute type '${ie}'.`,
              )
            : (A[J] = pe);
        }
      }
      if (H & -5)
        throw (
          console.error("THREE.EXRHeader:", A),
          new Error("THREE.EXRLoader: Provided file is currently unsupported.")
        );
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
        colorSpace: LinearSRGBColorSpace,
      };
      switch (P.compression) {
        case "NO_COMPRESSION":
          ((V.lines = 1), (V.uncompress = W));
          break;
        case "RLE_COMPRESSION":
          ((V.lines = 1), (V.uncompress = O));
          break;
        case "ZIPS_COMPRESSION":
          ((V.lines = 1), (V.uncompress = me));
          break;
        case "ZIP_COMPRESSION":
          ((V.lines = 16), (V.uncompress = me));
          break;
        case "PIZ_COMPRESSION":
          ((V.lines = 32), (V.uncompress = Ie));
          break;
        case "PXR24_COMPRESSION":
          ((V.lines = 16), (V.uncompress = Le));
          break;
        case "DWAA_COMPRESSION":
          ((V.lines = 32), (V.uncompress = Y));
          break;
        case "DWAB_COMPRESSION":
          ((V.lines = 256), (V.uncompress = Y));
          break;
        default:
          throw new Error(
            "EXRLoader.parse: " + P.compression + " is unsupported",
          );
      }
      if (((V.scanlineBlockSize = V.lines), V.type == 1))
        switch (H) {
          case FloatType:
            ((V.getter = ke), (V.inputSize = 2));
            break;
          case HalfFloatType:
            ((V.getter = ae), (V.inputSize = 2));
            break;
        }
      else if (V.type == 2)
        switch (H) {
          case FloatType:
            ((V.getter = Ge), (V.inputSize = 4));
            break;
          case HalfFloatType:
            ((V.getter = qe), (V.inputSize = 4));
        }
      else
        throw new Error(
          "EXRLoader.parse: unsupported pixelType " +
            V.type +
            " for " +
            P.compression +
            ".",
        );
      V.blockCount = (P.dataWindow.yMax + 1) / V.scanlineBlockSize;
      for (let ie = 0; ie < V.blockCount; ie++) We(B, A);
      V.outputChannels = V.channels == 3 ? 4 : V.channels;
      const J = V.width * V.height * V.outputChannels;
      switch (H) {
        case FloatType:
          ((V.byteArray = new Float32Array(J)),
            V.channels < V.outputChannels && V.byteArray.fill(1, 0, J));
          break;
        case HalfFloatType:
          ((V.byteArray = new Uint16Array(J)),
            V.channels < V.outputChannels && V.byteArray.fill(15360, 0, J));
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", H);
          break;
      }
      return (
        (V.bytesPerLine = V.width * V.inputSize * V.channels),
        V.outputChannels == 4
          ? ((V.format = RGBAFormat), (V.colorSpace = LinearSRGBColorSpace))
          : ((V.format = RedFormat), (V.colorSpace = NoColorSpace)),
        V
      );
    }
    const Mt = new DataView(e),
      Et = new Uint8Array(e),
      St = { value: 0 },
      Tt = gt(Mt, e, St),
      nt = yt(Tt, Mt, Et, St, this.type),
      Rt = { value: 0 },
      Ct = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let P = 0; P < nt.height / nt.scanlineBlockSize; P++) {
      const B = Re(Mt, St);
      ((nt.size = Re(Mt, St)),
        (nt.lines =
          B + nt.scanlineBlockSize > nt.height
            ? nt.height - B
            : nt.scanlineBlockSize));
      const A =
        nt.size < nt.lines * nt.bytesPerLine ? nt.uncompress(nt) : W(nt);
      St.value += nt.size;
      for (let H = 0; H < nt.scanlineBlockSize; H++) {
        const V = H + P * nt.scanlineBlockSize;
        if (V >= nt.height) break;
        for (let J = 0; J < nt.channels; J++) {
          const ie = Ct[Tt.channels[J].name];
          for (let ge = 0; ge < nt.width; ge++) {
            Rt.value =
              (H * (nt.channels * nt.width) + J * nt.width + ge) * nt.inputSize;
            const pe =
              (nt.height - 1 - V) * (nt.width * nt.outputChannels) +
              ge * nt.outputChannels +
              ie;
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
      type: this.type,
    };
  }
  setDataType(e) {
    return ((this.type = e), this);
  }
  load(e, t, r, n) {
    function a(l, c) {
      ((l.colorSpace = c.colorSpace),
        (l.minFilter = LinearFilter),
        (l.magFilter = LinearFilter),
        (l.generateMipmaps = !1),
        (l.flipY = !1),
        t && t(l, c));
    }
    return super.load(e, a, r, n);
  }
}
const AnyItem$2 = properties.loader.ITEM_CLASSES.any;
class EXRItem extends AnyItem$2 {
  constructor(e, t) {
    (super(e, { ...t, responseType: "type" }),
      (this.EXRLoader = new EXRLoader()));
  }
  retrieve() {
    return !1;
  }
  _onLoad(e) {
    ((this.content = e), super._onLoad(this));
  }
  loadFunc() {
    this.EXRLoader.load(
      this.url,
      this._onLoad.bind(this),
      this._onGLTFLoading.bind(this),
    );
  }
  _onGLTFLoading(e) {
    this.hasLoading && this.loadingSignal.dispatch(e.loaded / e.total);
  }
}
EXRItem.type = "exr";
EXRItem.extensions = ["exr"];
const ImageItem = properties.loader.ITEM_CLASSES.image;

export { EXRLoader, EXRItem };
export default EXRLoader;

globalThis.EXRItem = EXRItem;
globalThis.EXRLoader = EXRLoader;
