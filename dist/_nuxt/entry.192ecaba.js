function Xi(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function pr(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = pe(r) ? vf(r) : pr(r);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else {
    if (pe(e)) return e;
    if (fe(e)) return e;
  }
}
const mf = /;(?![^(]*\))/g,
  _f = /:([^]+)/,
  yf = /\/\*.*?\*\//gs;
function vf(e) {
  const t = {};
  return (
    e
      .replace(yf, '')
      .split(mf)
      .forEach((n) => {
        if (n) {
          const r = n.split(_f);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function gr(e) {
  let t = '';
  if (pe(e)) t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const r = gr(e[n]);
      r && (t += r + ' ');
    }
  else if (fe(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
function gE(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !pe(t) && (e.class = gr(t)), n && (e.style = pr(n)), e;
}
const bf =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  wf = Xi(bf);
function Mc(e) {
  return !!e || e === '';
}
const mE = (e) =>
    pe(e)
      ? e
      : e == null
      ? ''
      : q(e) || (fe(e) && (e.toString === Nc || !Z(e.toString)))
      ? JSON.stringify(e, Lc, 2)
      : String(e),
  Lc = (e, t) =>
    t && t.__v_isRef
      ? Lc(e, t.value)
      : ln(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : $c(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : fe(t) && !q(t) && !Dc(t)
      ? String(t)
      : t,
  ue = {},
  cn = [],
  Ge = () => {},
  Ef = () => !1,
  If = /^on[^a-z]/,
  mr = (e) => If.test(e),
  Qi = (e) => e.startsWith('onUpdate:'),
  we = Object.assign,
  eo = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Cf = Object.prototype.hasOwnProperty,
  ne = (e, t) => Cf.call(e, t),
  q = Array.isArray,
  ln = (e) => ys(e) === '[object Map]',
  $c = (e) => ys(e) === '[object Set]',
  Z = (e) => typeof e == 'function',
  pe = (e) => typeof e == 'string',
  to = (e) => typeof e == 'symbol',
  fe = (e) => e !== null && typeof e == 'object',
  xc = (e) => fe(e) && Z(e.then) && Z(e.catch),
  Nc = Object.prototype.toString,
  ys = (e) => Nc.call(e),
  Tf = (e) => ys(e).slice(8, -1),
  Dc = (e) => ys(e) === '[object Object]',
  no = (e) =>
    pe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Gn = Xi(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  vs = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  kf = /-(\w)/g,
  st = vs((e) => e.replace(kf, (t, n) => (n ? n.toUpperCase() : ''))),
  Sf = /\B([A-Z])/g,
  Pn = vs((e) => e.replace(Sf, '-$1').toLowerCase()),
  bs = vs((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Wr = vs((e) => (e ? `on${bs(e)}` : '')),
  nr = (e, t) => !Object.is(e, t),
  un = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Yr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  vn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let jo;
const Af = () =>
  jo ||
  (jo =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
let Xe;
class Rf {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Xe),
      !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Xe;
      try {
        return (Xe = this), t();
      } finally {
        Xe = n;
      }
    }
  }
  on() {
    Xe = this;
  }
  off() {
    Xe = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function Pf(e, t = Xe) {
  t && t.active && t.effects.push(e);
}
const ro = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Bc = (e) => (e.w & Lt) > 0,
  Hc = (e) => (e.n & Lt) > 0,
  Of = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Lt;
  },
  Mf = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Bc(s) && !Hc(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Lt),
          (s.n &= ~Lt);
      }
      t.length = n;
    }
  },
  mi = new WeakMap();
let Wn = 0,
  Lt = 1;
const _i = 30;
let qe;
const Kt = Symbol(''),
  yi = Symbol('');
class so {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Pf(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = qe,
      n = Pt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = qe),
        (qe = this),
        (Pt = !0),
        (Lt = 1 << ++Wn),
        Wn <= _i ? Of(this) : Fo(this),
        this.fn()
      );
    } finally {
      Wn <= _i && Mf(this),
        (Lt = 1 << --Wn),
        (qe = this.parent),
        (Pt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    qe === this
      ? (this.deferStop = !0)
      : this.active &&
        (Fo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Fo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Pt = !0;
const Uc = [];
function On() {
  Uc.push(Pt), (Pt = !1);
}
function Mn() {
  const e = Uc.pop();
  Pt = e === void 0 ? !0 : e;
}
function Be(e, t, n) {
  if (Pt && qe) {
    let r = mi.get(e);
    r || mi.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = ro())), jc(s);
  }
}
function jc(e, t) {
  let n = !1;
  Wn <= _i ? Hc(e) || ((e.n |= Lt), (n = !Bc(e))) : (n = !e.has(qe)),
    n && (e.add(qe), qe.deps.push(e));
}
function dt(e, t, n, r, s, i) {
  const o = mi.get(e);
  if (!o) return;
  let a = [];
  if (t === 'clear') a = [...o.values()];
  else if (n === 'length' && q(e)) {
    const c = vn(r);
    o.forEach((l, u) => {
      (u === 'length' || u >= c) && a.push(l);
    });
  } else
    switch ((n !== void 0 && a.push(o.get(n)), t)) {
      case 'add':
        q(e)
          ? no(n) && a.push(o.get('length'))
          : (a.push(o.get(Kt)), ln(e) && a.push(o.get(yi)));
        break;
      case 'delete':
        q(e) || (a.push(o.get(Kt)), ln(e) && a.push(o.get(yi)));
        break;
      case 'set':
        ln(e) && a.push(o.get(Kt));
        break;
    }
  if (a.length === 1) a[0] && vi(a[0]);
  else {
    const c = [];
    for (const l of a) l && c.push(...l);
    vi(ro(c));
  }
}
function vi(e, t) {
  const n = q(e) ? e : [...e];
  for (const r of n) r.computed && Wo(r);
  for (const r of n) r.computed || Wo(r);
}
function Wo(e, t) {
  (e !== qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Lf = Xi('__proto__,__v_isRef,__isVue'),
  Fc = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(to)
  ),
  $f = io(),
  xf = io(!1, !0),
  Nf = io(!0),
  zo = Df();
function Df() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = re(this);
        for (let i = 0, o = this.length; i < o; i++) Be(r, 'get', i + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(re)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        On();
        const r = re(this)[t].apply(this, n);
        return Mn(), r;
      };
    }),
    e
  );
}
function io(e = !1, t = !1) {
  return function (r, s, i) {
    if (s === '__v_isReactive') return !e;
    if (s === '__v_isReadonly') return e;
    if (s === '__v_isShallow') return t;
    if (s === '__v_raw' && i === (e ? (t ? Qf : qc) : t ? Kc : Vc).get(r))
      return r;
    const o = q(r);
    if (!e && o && ne(zo, s)) return Reflect.get(zo, s, i);
    const a = Reflect.get(r, s, i);
    return (to(s) ? Fc.has(s) : Lf(s)) || (e || Be(r, 'get', s), t)
      ? a
      : _e(a)
      ? o && no(s)
        ? a
        : a.value
      : fe(a)
      ? e
        ? Gc(a)
        : it(a)
      : a;
  };
}
const Bf = Wc(),
  Hf = Wc(!0);
function Wc(e = !1) {
  return function (n, r, s, i) {
    let o = n[r];
    if (bn(o) && _e(o) && !_e(s)) return !1;
    if (
      !e &&
      (!Xr(s) && !bn(s) && ((o = re(o)), (s = re(s))), !q(n) && _e(o) && !_e(s))
    )
      return (o.value = s), !0;
    const a = q(n) && no(r) ? Number(r) < n.length : ne(n, r),
      c = Reflect.set(n, r, s, i);
    return (
      n === re(i) && (a ? nr(s, o) && dt(n, 'set', r, s) : dt(n, 'add', r, s)),
      c
    );
  };
}
function Uf(e, t) {
  const n = ne(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && dt(e, 'delete', t, void 0), r;
}
function jf(e, t) {
  const n = Reflect.has(e, t);
  return (!to(t) || !Fc.has(t)) && Be(e, 'has', t), n;
}
function Ff(e) {
  return Be(e, 'iterate', q(e) ? 'length' : Kt), Reflect.ownKeys(e);
}
const zc = { get: $f, set: Bf, deleteProperty: Uf, has: jf, ownKeys: Ff },
  Wf = {
    get: Nf,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  zf = we({}, zc, { get: xf, set: Hf }),
  oo = (e) => e,
  ws = (e) => Reflect.getPrototypeOf(e);
function Pr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = re(e),
    i = re(t);
  n || (t !== i && Be(s, 'get', t), Be(s, 'get', i));
  const { has: o } = ws(s),
    a = r ? oo : n ? lo : rr;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, i)) return a(e.get(i));
  e !== s && e.get(t);
}
function Or(e, t = !1) {
  const n = this.__v_raw,
    r = re(n),
    s = re(e);
  return (
    t || (e !== s && Be(r, 'has', e), Be(r, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Mr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Be(re(e), 'iterate', Kt), Reflect.get(e, 'size', e)
  );
}
function Vo(e) {
  e = re(e);
  const t = re(this);
  return ws(t).has.call(t, e) || (t.add(e), dt(t, 'add', e, e)), this;
}
function Ko(e, t) {
  t = re(t);
  const n = re(this),
    { has: r, get: s } = ws(n);
  let i = r.call(n, e);
  i || ((e = re(e)), (i = r.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), i ? nr(t, o) && dt(n, 'set', e, t) : dt(n, 'add', e, t), this
  );
}
function qo(e) {
  const t = re(this),
    { has: n, get: r } = ws(t);
  let s = n.call(t, e);
  s || ((e = re(e)), (s = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return s && dt(t, 'delete', e, void 0), i;
}
function Go() {
  const e = re(this),
    t = e.size !== 0,
    n = e.clear();
  return t && dt(e, 'clear', void 0, void 0), n;
}
function Lr(e, t) {
  return function (r, s) {
    const i = this,
      o = i.__v_raw,
      a = re(o),
      c = t ? oo : e ? lo : rr;
    return (
      !e && Be(a, 'iterate', Kt), o.forEach((l, u) => r.call(s, c(l), c(u), i))
    );
  };
}
function $r(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = re(s),
      o = ln(i),
      a = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      l = s[e](...r),
      u = n ? oo : t ? lo : rr;
    return (
      !t && Be(i, 'iterate', c ? yi : Kt),
      {
        next() {
          const { value: f, done: d } = l.next();
          return d
            ? { value: f, done: d }
            : { value: a ? [u(f[0]), u(f[1])] : u(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function _t(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function Vf() {
  const e = {
      get(i) {
        return Pr(this, i);
      },
      get size() {
        return Mr(this);
      },
      has: Or,
      add: Vo,
      set: Ko,
      delete: qo,
      clear: Go,
      forEach: Lr(!1, !1),
    },
    t = {
      get(i) {
        return Pr(this, i, !1, !0);
      },
      get size() {
        return Mr(this);
      },
      has: Or,
      add: Vo,
      set: Ko,
      delete: qo,
      clear: Go,
      forEach: Lr(!1, !0),
    },
    n = {
      get(i) {
        return Pr(this, i, !0);
      },
      get size() {
        return Mr(this, !0);
      },
      has(i) {
        return Or.call(this, i, !0);
      },
      add: _t('add'),
      set: _t('set'),
      delete: _t('delete'),
      clear: _t('clear'),
      forEach: Lr(!0, !1),
    },
    r = {
      get(i) {
        return Pr(this, i, !0, !0);
      },
      get size() {
        return Mr(this, !0);
      },
      has(i) {
        return Or.call(this, i, !0);
      },
      add: _t('add'),
      set: _t('set'),
      delete: _t('delete'),
      clear: _t('clear'),
      forEach: Lr(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((i) => {
      (e[i] = $r(i, !1, !1)),
        (n[i] = $r(i, !0, !1)),
        (t[i] = $r(i, !1, !0)),
        (r[i] = $r(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Kf, qf, Gf, Jf] = Vf();
function ao(e, t) {
  const n = t ? (e ? Jf : Gf) : e ? qf : Kf;
  return (r, s, i) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? r
      : Reflect.get(ne(n, s) && s in r ? n : r, s, i);
}
const Zf = { get: ao(!1, !1) },
  Yf = { get: ao(!1, !0) },
  Xf = { get: ao(!0, !1) },
  Vc = new WeakMap(),
  Kc = new WeakMap(),
  qc = new WeakMap(),
  Qf = new WeakMap();
function ed(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function td(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ed(Tf(e));
}
function it(e) {
  return bn(e) ? e : co(e, !1, zc, Zf, Vc);
}
function nd(e) {
  return co(e, !1, zf, Yf, Kc);
}
function Gc(e) {
  return co(e, !0, Wf, Xf, qc);
}
function co(e, t, n, r, s) {
  if (!fe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = s.get(e);
  if (i) return i;
  const o = td(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? r : n);
  return s.set(e, a), a;
}
function fn(e) {
  return bn(e) ? fn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bn(e) {
  return !!(e && e.__v_isReadonly);
}
function Xr(e) {
  return !!(e && e.__v_isShallow);
}
function Jc(e) {
  return fn(e) || bn(e);
}
function re(e) {
  const t = e && e.__v_raw;
  return t ? re(t) : e;
}
function Zc(e) {
  return Yr(e, '__v_skip', !0), e;
}
const rr = (e) => (fe(e) ? it(e) : e),
  lo = (e) => (fe(e) ? Gc(e) : e);
function Yc(e) {
  Pt && qe && ((e = re(e)), jc(e.dep || (e.dep = ro())));
}
function Xc(e, t) {
  (e = re(e)), e.dep && vi(e.dep);
}
function _e(e) {
  return !!(e && e.__v_isRef === !0);
}
function qt(e) {
  return Qc(e, !1);
}
function bi(e) {
  return Qc(e, !0);
}
function Qc(e, t) {
  return _e(e) ? e : new rd(e, t);
}
class rd {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : re(t)),
      (this._value = n ? t : rr(t));
  }
  get value() {
    return Yc(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Xr(t) || bn(t);
    (t = n ? t : re(t)),
      nr(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : rr(t)), Xc(this));
  }
}
function Oe(e) {
  return _e(e) ? e.value : e;
}
const sd = {
  get: (e, t, n) => Oe(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return _e(s) && !_e(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function el(e) {
  return fn(e) ? e : new Proxy(e, sd);
}
class id {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function tl(e, t, n) {
  const r = e[t];
  return _e(r) ? r : new id(e, t, n);
}
var nl;
class od {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[nl] = !1),
      (this._dirty = !0),
      (this.effect = new so(t, () => {
        this._dirty || ((this._dirty = !0), Xc(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = re(this);
    return (
      Yc(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
nl = '__v_isReadonly';
function ad(e, t, n = !1) {
  let r, s;
  const i = Z(e);
  return (
    i ? ((r = e), (s = Ge)) : ((r = e.get), (s = e.set)),
    new od(r, s, i || !s, n)
  );
}
function Ot(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (i) {
    Ln(i, t, n);
  }
  return s;
}
function Fe(e, t, n, r) {
  if (Z(e)) {
    const i = Ot(e, t, n, r);
    return (
      i &&
        xc(i) &&
        i.catch((o) => {
          Ln(o, t, n);
        }),
      i
    );
  }
  const s = [];
  for (let i = 0; i < e.length; i++) s.push(Fe(e[i], t, n, r));
  return s;
}
function Ln(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      a = n;
    for (; i; ) {
      const l = i.ec;
      if (l) {
        for (let u = 0; u < l.length; u++) if (l[u](e, o, a) === !1) return;
      }
      i = i.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Ot(c, null, 10, [e, o, a]);
      return;
    }
  }
  cd(e, n, s, r);
}
function cd(e, t, n, r = !0) {
  console.error(e);
}
let sr = !1,
  wi = !1;
const Ce = [];
let et = 0;
const dn = [];
let ct = null,
  Ft = 0;
const rl = Promise.resolve();
let uo = null;
function $n(e) {
  const t = uo || rl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ld(e) {
  let t = et + 1,
    n = Ce.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    ir(Ce[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Es(e) {
  (!Ce.length || !Ce.includes(e, sr && e.allowRecurse ? et + 1 : et)) &&
    (e.id == null ? Ce.push(e) : Ce.splice(ld(e.id), 0, e), sl());
}
function sl() {
  !sr && !wi && ((wi = !0), (uo = rl.then(ol)));
}
function ud(e) {
  const t = Ce.indexOf(e);
  t > et && Ce.splice(t, 1);
}
function il(e) {
  q(e)
    ? dn.push(...e)
    : (!ct || !ct.includes(e, e.allowRecurse ? Ft + 1 : Ft)) && dn.push(e),
    sl();
}
function Jo(e, t = sr ? et + 1 : 0) {
  for (; t < Ce.length; t++) {
    const n = Ce[t];
    n && n.pre && (Ce.splice(t, 1), t--, n());
  }
}
function Qr(e) {
  if (dn.length) {
    const t = [...new Set(dn)];
    if (((dn.length = 0), ct)) {
      ct.push(...t);
      return;
    }
    for (ct = t, ct.sort((n, r) => ir(n) - ir(r)), Ft = 0; Ft < ct.length; Ft++)
      ct[Ft]();
    (ct = null), (Ft = 0);
  }
}
const ir = (e) => (e.id == null ? 1 / 0 : e.id),
  fd = (e, t) => {
    const n = ir(e) - ir(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ol(e) {
  (wi = !1), (sr = !0), Ce.sort(fd);
  const t = Ge;
  try {
    for (et = 0; et < Ce.length; et++) {
      const n = Ce[et];
      n && n.active !== !1 && Ot(n, null, 14);
    }
  } finally {
    (et = 0),
      (Ce.length = 0),
      Qr(),
      (sr = !1),
      (uo = null),
      (Ce.length || dn.length) && ol();
  }
}
function dd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ue;
  let s = n;
  const i = t.startsWith('update:'),
    o = i && t.slice(7);
  if (o && o in r) {
    const u = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: f, trim: d } = r[u] || ue;
    d && (s = n.map((g) => (pe(g) ? g.trim() : g))), f && (s = n.map(vn));
  }
  let a,
    c = r[(a = Wr(t))] || r[(a = Wr(st(t)))];
  !c && i && (c = r[(a = Wr(Pn(t)))]), c && Fe(c, e, 6, s);
  const l = r[a + 'Once'];
  if (l) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Fe(l, e, 6, s);
  }
}
function al(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {},
    a = !1;
  if (!Z(e)) {
    const c = (l) => {
      const u = al(l, t, !0);
      u && ((a = !0), we(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !i && !a
    ? (fe(e) && r.set(e, null), null)
    : (q(i) ? i.forEach((c) => (o[c] = null)) : we(o, i),
      fe(e) && r.set(e, o),
      o);
}
function Is(e, t) {
  return !e || !mr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, Pn(t)) || ne(e, t));
}
let be = null,
  Cs = null;
function es(e) {
  const t = be;
  return (be = e), (Cs = (e && e.type.__scopeId) || null), t;
}
function _E(e) {
  Cs = e;
}
function yE() {
  Cs = null;
}
function fo(e, t = be, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && oa(-1);
    const i = es(t);
    let o;
    try {
      o = e(...s);
    } finally {
      es(i), r._d && oa(1);
    }
    return o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Us(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: i,
    propsOptions: [o],
    slots: a,
    attrs: c,
    emit: l,
    render: u,
    renderCache: f,
    data: d,
    setupState: g,
    ctx: m,
    inheritAttrs: E,
  } = e;
  let R, y;
  const p = es(e);
  try {
    if (n.shapeFlag & 4) {
      const I = s || r;
      (R = Ue(u.call(I, I, f, i, g, d, m))), (y = c);
    } else {
      const I = t;
      (R = Ue(
        I.length > 1 ? I(i, { attrs: c, slots: a, emit: l }) : I(i, null)
      )),
        (y = t.props ? c : pd(c));
    }
  } catch (I) {
    (Zn.length = 0), Ln(I, e, 1), (R = he(Se));
  }
  let v = R;
  if (y && E !== !1) {
    const I = Object.keys(y),
      { shapeFlag: O } = v;
    I.length && O & 7 && (o && I.some(Qi) && (y = gd(y, o)), (v = ht(v, y)));
  }
  return (
    n.dirs && ((v = ht(v)), (v.dirs = v.dirs ? v.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (v.transition = n.transition),
    (R = v),
    es(p),
    R
  );
}
function hd(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (In(r)) {
      if (r.type !== Se || r.children === 'v-if') {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const pd = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || mr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  gd = (e, t) => {
    const n = {};
    for (const r in e) (!Qi(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function md(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: o, children: a, patchFlag: c } = t,
    l = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Zo(r, o, l) : !!o;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const d = u[f];
        if (o[d] !== r[d] && !Is(l, d)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? Zo(r, o, l)
        : !0
      : !!o;
  return !1;
}
function Zo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !Is(n, i)) return !0;
  }
  return !1;
}
function ho({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const cl = (e) => e.__isSuspense,
  _d = {
    name: 'Suspense',
    __isSuspense: !0,
    process(e, t, n, r, s, i, o, a, c, l) {
      e == null ? yd(t, n, r, s, i, o, a, c, l) : vd(e, t, n, r, s, o, a, c, l);
    },
    hydrate: bd,
    create: po,
    normalize: wd,
  },
  ll = _d;
function or(e, t) {
  const n = e.props && e.props[t];
  Z(n) && n();
}
function yd(e, t, n, r, s, i, o, a, c) {
  const {
      p: l,
      o: { createElement: u },
    } = c,
    f = u('div'),
    d = (e.suspense = po(e, s, r, t, f, n, i, o, a, c));
  l(null, (d.pendingBranch = e.ssContent), f, null, r, d, i, o),
    d.deps > 0
      ? (or(e, 'onPending'),
        or(e, 'onFallback'),
        l(null, e.ssFallback, t, n, r, null, i, o),
        hn(d, e.ssFallback))
      : d.resolve();
}
function vd(e, t, n, r, s, i, o, a, { p: c, um: l, o: { createElement: u } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const d = t.ssContent,
    g = t.ssFallback,
    { activeBranch: m, pendingBranch: E, isInFallback: R, isHydrating: y } = f;
  if (E)
    (f.pendingBranch = d),
      tt(d, E)
        ? (c(E, d, f.hiddenContainer, null, s, f, i, o, a),
          f.deps <= 0
            ? f.resolve()
            : R && (c(m, g, n, r, s, null, i, o, a), hn(f, g)))
        : (f.pendingId++,
          y ? ((f.isHydrating = !1), (f.activeBranch = E)) : l(E, s, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = u('div')),
          R
            ? (c(null, d, f.hiddenContainer, null, s, f, i, o, a),
              f.deps <= 0
                ? f.resolve()
                : (c(m, g, n, r, s, null, i, o, a), hn(f, g)))
            : m && tt(d, m)
            ? (c(m, d, n, r, s, f, i, o, a), f.resolve(!0))
            : (c(null, d, f.hiddenContainer, null, s, f, i, o, a),
              f.deps <= 0 && f.resolve()));
  else if (m && tt(d, m)) c(m, d, n, r, s, f, i, o, a), hn(f, d);
  else if (
    (or(t, 'onPending'),
    (f.pendingBranch = d),
    f.pendingId++,
    c(null, d, f.hiddenContainer, null, s, f, i, o, a),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: p, pendingId: v } = f;
    p > 0
      ? setTimeout(() => {
          f.pendingId === v && f.fallback(g);
        }, p)
      : p === 0 && f.fallback(g);
  }
}
function po(e, t, n, r, s, i, o, a, c, l, u = !1) {
  const {
      p: f,
      m: d,
      um: g,
      n: m,
      o: { parentNode: E, remove: R },
    } = l,
    y = vn(e.props && e.props.timeout),
    p = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: o,
      container: r,
      hiddenContainer: s,
      anchor: i,
      deps: 0,
      pendingId: 0,
      timeout: typeof y == 'number' ? y : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: u,
      isUnmounted: !1,
      effects: [],
      resolve(v = !1) {
        const {
          vnode: I,
          activeBranch: O,
          pendingBranch: L,
          pendingId: x,
          effects: k,
          parentComponent: H,
          container: U,
        } = p;
        if (p.isHydrating) p.isHydrating = !1;
        else if (!v) {
          const Y = O && L.transition && L.transition.mode === 'out-in';
          Y &&
            (O.transition.afterLeave = () => {
              x === p.pendingId && d(L, U, j, 0);
            });
          let { anchor: j } = p;
          O && ((j = m(O)), g(O, H, p, !0)), Y || d(L, U, j, 0);
        }
        hn(p, L), (p.pendingBranch = null), (p.isInFallback = !1);
        let K = p.parent,
          D = !1;
        for (; K; ) {
          if (K.pendingBranch) {
            K.effects.push(...k), (D = !0);
            break;
          }
          K = K.parent;
        }
        D || il(k), (p.effects = []), or(I, 'onResolve');
      },
      fallback(v) {
        if (!p.pendingBranch) return;
        const {
          vnode: I,
          activeBranch: O,
          parentComponent: L,
          container: x,
          isSVG: k,
        } = p;
        or(I, 'onFallback');
        const H = m(O),
          U = () => {
            !p.isInFallback || (f(null, v, x, H, L, null, k, a, c), hn(p, v));
          },
          K = v.transition && v.transition.mode === 'out-in';
        K && (O.transition.afterLeave = U),
          (p.isInFallback = !0),
          g(O, L, null, !0),
          K || U();
      },
      move(v, I, O) {
        p.activeBranch && d(p.activeBranch, v, I, O), (p.container = v);
      },
      next() {
        return p.activeBranch && m(p.activeBranch);
      },
      registerDep(v, I) {
        const O = !!p.pendingBranch;
        O && p.deps++;
        const L = v.vnode.el;
        v.asyncDep
          .catch((x) => {
            Ln(x, v, 0);
          })
          .then((x) => {
            if (v.isUnmounted || p.isUnmounted || p.pendingId !== v.suspenseId)
              return;
            v.asyncResolved = !0;
            const { vnode: k } = v;
            Si(v, x, !1), L && (k.el = L);
            const H = !L && v.subTree.el;
            I(v, k, E(L || v.subTree.el), L ? null : m(v.subTree), p, o, c),
              H && R(H),
              ho(v, k.el),
              O && --p.deps === 0 && p.resolve();
          });
      },
      unmount(v, I) {
        (p.isUnmounted = !0),
          p.activeBranch && g(p.activeBranch, n, v, I),
          p.pendingBranch && g(p.pendingBranch, n, v, I);
      },
    };
  return p;
}
function bd(e, t, n, r, s, i, o, a, c) {
  const l = (t.suspense = po(
      t,
      r,
      n,
      e.parentNode,
      document.createElement('div'),
      null,
      s,
      i,
      o,
      a,
      !0
    )),
    u = c(e, (l.pendingBranch = t.ssContent), n, l, i, o);
  return l.deps === 0 && l.resolve(), u;
}
function wd(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = Yo(r ? n.default : n)),
    (e.ssFallback = r ? Yo(n.fallback) : he(Se));
}
function Yo(e) {
  let t;
  if (Z(e)) {
    const n = En && e._c;
    n && ((e._d = !1), We()), (e = e()), n && ((e._d = !0), (t = je), Pl());
  }
  return (
    q(e) && (e = hd(e)),
    (e = Ue(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function ul(e, t) {
  t && t.pendingBranch
    ? q(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : il(e);
}
function hn(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    s = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = s), ho(r, s));
}
function pn(e, t) {
  if (me) {
    let n = me.provides;
    const r = me.parent && me.parent.provides;
    r === n && (n = me.provides = Object.create(r)), (n[e] = t);
  }
}
function Ne(e, t, n = !1) {
  const r = me || be;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && Z(t) ? t.call(r.proxy) : t;
  }
}
function Ed(e, t) {
  return go(e, null, t);
}
const xr = {};
function gn(e, t, n) {
  return go(e, t, n);
}
function go(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: o } = ue
) {
  const a = me;
  let c,
    l = !1,
    u = !1;
  if (
    (_e(e)
      ? ((c = () => e.value), (l = Xr(e)))
      : fn(e)
      ? ((c = () => e), (r = !0))
      : q(e)
      ? ((u = !0),
        (l = e.some((v) => fn(v) || Xr(v))),
        (c = () =>
          e.map((v) => {
            if (_e(v)) return v.value;
            if (fn(v)) return zt(v);
            if (Z(v)) return Ot(v, a, 2);
          })))
      : Z(e)
      ? t
        ? (c = () => Ot(e, a, 2))
        : (c = () => {
            if (!(a && a.isUnmounted)) return f && f(), Fe(e, a, 3, [d]);
          })
      : (c = Ge),
    t && r)
  ) {
    const v = c;
    c = () => zt(v());
  }
  let f,
    d = (v) => {
      f = y.onStop = () => {
        Ot(v, a, 4);
      };
    },
    g;
  if (Tn)
    if (
      ((d = Ge),
      t ? n && Fe(t, a, 3, [c(), u ? [] : void 0, d]) : c(),
      s === 'sync')
    ) {
      const v = mh();
      g = v.__watcherHandles || (v.__watcherHandles = []);
    } else return Ge;
  let m = u ? new Array(e.length).fill(xr) : xr;
  const E = () => {
    if (!!y.active)
      if (t) {
        const v = y.run();
        (r || l || (u ? v.some((I, O) => nr(I, m[O])) : nr(v, m))) &&
          (f && f(),
          Fe(t, a, 3, [v, m === xr ? void 0 : u && m[0] === xr ? [] : m, d]),
          (m = v));
      } else y.run();
  };
  E.allowRecurse = !!t;
  let R;
  s === 'sync'
    ? (R = E)
    : s === 'post'
    ? (R = () => ye(E, a && a.suspense))
    : ((E.pre = !0), a && (E.id = a.uid), (R = () => Es(E)));
  const y = new so(c, R);
  t
    ? n
      ? E()
      : (m = y.run())
    : s === 'post'
    ? ye(y.run.bind(y), a && a.suspense)
    : y.run();
  const p = () => {
    y.stop(), a && a.scope && eo(a.scope.effects, y);
  };
  return g && g.push(p), p;
}
function Id(e, t, n) {
  const r = this.proxy,
    s = pe(e) ? (e.includes('.') ? fl(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  Z(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = me;
  Cn(this);
  const a = go(s, i.bind(r), n);
  return o ? Cn(o) : Jt(), a;
}
function fl(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function zt(e, t) {
  if (!fe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), _e(e))) zt(e.value, t);
  else if (q(e)) for (let n = 0; n < e.length; n++) zt(e[n], t);
  else if ($c(e) || ln(e))
    e.forEach((n) => {
      zt(n, t);
    });
  else if (Dc(e)) for (const n in e) zt(e[n], t);
  return e;
}
function Cd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    ks(() => {
      e.isMounted = !0;
    }),
    yr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const He = [Function, Array],
  Td = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: He,
      onEnter: He,
      onAfterEnter: He,
      onEnterCancelled: He,
      onBeforeLeave: He,
      onLeave: He,
      onAfterLeave: He,
      onLeaveCancelled: He,
      onBeforeAppear: He,
      onAppear: He,
      onAfterAppear: He,
      onAppearCancelled: He,
    },
    setup(e, { slots: t }) {
      const n = Nn(),
        r = Cd();
      let s;
      return () => {
        const i = t.default && pl(t.default(), !0);
        if (!i || !i.length) return;
        let o = i[0];
        if (i.length > 1) {
          for (const E of i)
            if (E.type !== Se) {
              o = E;
              break;
            }
        }
        const a = re(e),
          { mode: c } = a;
        if (r.isLeaving) return js(o);
        const l = Xo(o);
        if (!l) return js(o);
        const u = Ei(l, a, r, n);
        ts(l, u);
        const f = n.subTree,
          d = f && Xo(f);
        let g = !1;
        const { getTransitionKey: m } = l.type;
        if (m) {
          const E = m();
          s === void 0 ? (s = E) : E !== s && ((s = E), (g = !0));
        }
        if (d && d.type !== Se && (!tt(l, d) || g)) {
          const E = Ei(d, a, r, n);
          if ((ts(d, E), c === 'out-in'))
            return (
              (r.isLeaving = !0),
              (E.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              js(o)
            );
          c === 'in-out' &&
            l.type !== Se &&
            (E.delayLeave = (R, y, p) => {
              const v = hl(r, d);
              (v[String(d.key)] = d),
                (R._leaveCb = () => {
                  y(), (R._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = p);
            });
        }
        return o;
      };
    },
  },
  dl = Td;
function hl(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Ei(e, t, n, r) {
  const {
      appear: s,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: a,
      onEnter: c,
      onAfterEnter: l,
      onEnterCancelled: u,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: g,
      onLeaveCancelled: m,
      onBeforeAppear: E,
      onAppear: R,
      onAfterAppear: y,
      onAppearCancelled: p,
    } = t,
    v = String(e.key),
    I = hl(n, e),
    O = (k, H) => {
      k && Fe(k, r, 9, H);
    },
    L = (k, H) => {
      const U = H[1];
      O(k, H),
        q(k) ? k.every((K) => K.length <= 1) && U() : k.length <= 1 && U();
    },
    x = {
      mode: i,
      persisted: o,
      beforeEnter(k) {
        let H = a;
        if (!n.isMounted)
          if (s) H = E || a;
          else return;
        k._leaveCb && k._leaveCb(!0);
        const U = I[v];
        U && tt(e, U) && U.el._leaveCb && U.el._leaveCb(), O(H, [k]);
      },
      enter(k) {
        let H = c,
          U = l,
          K = u;
        if (!n.isMounted)
          if (s) (H = R || c), (U = y || l), (K = p || u);
          else return;
        let D = !1;
        const Y = (k._enterCb = (j) => {
          D ||
            ((D = !0),
            j ? O(K, [k]) : O(U, [k]),
            x.delayedLeave && x.delayedLeave(),
            (k._enterCb = void 0));
        });
        H ? L(H, [k, Y]) : Y();
      },
      leave(k, H) {
        const U = String(e.key);
        if ((k._enterCb && k._enterCb(!0), n.isUnmounting)) return H();
        O(f, [k]);
        let K = !1;
        const D = (k._leaveCb = (Y) => {
          K ||
            ((K = !0),
            H(),
            Y ? O(m, [k]) : O(g, [k]),
            (k._leaveCb = void 0),
            I[U] === e && delete I[U]);
        });
        (I[U] = e), d ? L(d, [k, D]) : D();
      },
      clone(k) {
        return Ei(k, t, n, r);
      },
    };
  return x;
}
function js(e) {
  if (_r(e)) return (e = ht(e)), (e.children = null), e;
}
function Xo(e) {
  return _r(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ts(e, t) {
  e.shapeFlag & 6 && e.component
    ? ts(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function pl(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === Pe
      ? (o.patchFlag & 128 && s++, (r = r.concat(pl(o.children, t, a))))
      : (t || o.type !== Se) && r.push(a != null ? ht(o, { key: a }) : o);
  }
  if (s > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
function gt(e) {
  return Z(e) ? { setup: e, name: e.name } : e;
}
const Gt = (e) => !!e.type.__asyncLoader;
function kd(e) {
  Z(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    timeout: i,
    suspensible: o = !0,
    onError: a,
  } = e;
  let c = null,
    l,
    u = 0;
  const f = () => (u++, (c = null), d()),
    d = () => {
      let g;
      return (
        c ||
        (g = c =
          t()
            .catch((m) => {
              if (((m = m instanceof Error ? m : new Error(String(m))), a))
                return new Promise((E, R) => {
                  a(
                    m,
                    () => E(f()),
                    () => R(m),
                    u + 1
                  );
                });
              throw m;
            })
            .then((m) =>
              g !== c && c
                ? c
                : (m &&
                    (m.__esModule || m[Symbol.toStringTag] === 'Module') &&
                    (m = m.default),
                  (l = m),
                  m)
            ))
      );
    };
  return gt({
    name: 'AsyncComponentWrapper',
    __asyncLoader: d,
    get __asyncResolved() {
      return l;
    },
    setup() {
      const g = me;
      if (l) return () => Fs(l, g);
      const m = (p) => {
        (c = null), Ln(p, g, 13, !r);
      };
      if ((o && g.suspense) || Tn)
        return d()
          .then((p) => () => Fs(p, g))
          .catch((p) => (m(p), () => (r ? he(r, { error: p }) : null)));
      const E = qt(!1),
        R = qt(),
        y = qt(!!s);
      return (
        s &&
          setTimeout(() => {
            y.value = !1;
          }, s),
        i != null &&
          setTimeout(() => {
            if (!E.value && !R.value) {
              const p = new Error(`Async component timed out after ${i}ms.`);
              m(p), (R.value = p);
            }
          }, i),
        d()
          .then(() => {
            (E.value = !0),
              g.parent && _r(g.parent.vnode) && Es(g.parent.update);
          })
          .catch((p) => {
            m(p), (R.value = p);
          }),
        () => {
          if (E.value && l) return Fs(l, g);
          if (R.value && r) return he(r, { error: R.value });
          if (n && !y.value) return he(n);
        }
      );
    },
  });
}
function Fs(e, t) {
  const { ref: n, props: r, children: s, ce: i } = t.vnode,
    o = he(e, r, s);
  return (o.ref = n), (o.ce = i), delete t.vnode.ce, o;
}
const _r = (e) => e.type.__isKeepAlive,
  Sd = {
    name: 'KeepAlive',
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = Nn(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const p = t.default && t.default();
          return p && p.length === 1 ? p[0] : p;
        };
      const s = new Map(),
        i = new Set();
      let o = null;
      const a = n.suspense,
        {
          renderer: {
            p: c,
            m: l,
            um: u,
            o: { createElement: f },
          },
        } = r,
        d = f('div');
      (r.activate = (p, v, I, O, L) => {
        const x = p.component;
        l(p, v, I, 0, a),
          c(x.vnode, p, v, I, x, a, O, p.slotScopeIds, L),
          ye(() => {
            (x.isDeactivated = !1), x.a && un(x.a);
            const k = p.props && p.props.onVnodeMounted;
            k && Re(k, x.parent, p);
          }, a);
      }),
        (r.deactivate = (p) => {
          const v = p.component;
          l(p, d, null, 1, a),
            ye(() => {
              v.da && un(v.da);
              const I = p.props && p.props.onVnodeUnmounted;
              I && Re(I, v.parent, p), (v.isDeactivated = !0);
            }, a);
        });
      function g(p) {
        Ws(p), u(p, n, a, !0);
      }
      function m(p) {
        s.forEach((v, I) => {
          const O = Ai(v.type);
          O && (!p || !p(O)) && E(I);
        });
      }
      function E(p) {
        const v = s.get(p);
        !o || v.type !== o.type ? g(v) : o && Ws(o), s.delete(p), i.delete(p);
      }
      gn(
        () => [e.include, e.exclude],
        ([p, v]) => {
          p && m((I) => zn(p, I)), v && m((I) => !zn(v, I));
        },
        { flush: 'post', deep: !0 }
      );
      let R = null;
      const y = () => {
        R != null && s.set(R, zs(n.subTree));
      };
      return (
        ks(y),
        ml(y),
        yr(() => {
          s.forEach((p) => {
            const { subTree: v, suspense: I } = n,
              O = zs(v);
            if (p.type === O.type) {
              Ws(O);
              const L = O.component.da;
              L && ye(L, I);
              return;
            }
            g(p);
          });
        }),
        () => {
          if (((R = null), !t.default)) return null;
          const p = t.default(),
            v = p[0];
          if (p.length > 1) return (o = null), p;
          if (!In(v) || (!(v.shapeFlag & 4) && !(v.shapeFlag & 128)))
            return (o = null), v;
          let I = zs(v);
          const O = I.type,
            L = Ai(Gt(I) ? I.type.__asyncResolved || {} : O),
            { include: x, exclude: k, max: H } = e;
          if ((x && (!L || !zn(x, L))) || (k && L && zn(k, L)))
            return (o = I), v;
          const U = I.key == null ? O : I.key,
            K = s.get(U);
          return (
            I.el && ((I = ht(I)), v.shapeFlag & 128 && (v.ssContent = I)),
            (R = U),
            K
              ? ((I.el = K.el),
                (I.component = K.component),
                I.transition && ts(I, I.transition),
                (I.shapeFlag |= 512),
                i.delete(U),
                i.add(U))
              : (i.add(U),
                H && i.size > parseInt(H, 10) && E(i.values().next().value)),
            (I.shapeFlag |= 256),
            (o = I),
            cl(v.type) ? v : I
          );
        }
      );
    },
  },
  Ad = Sd;
function zn(e, t) {
  return q(e)
    ? e.some((n) => zn(n, t))
    : pe(e)
    ? e.split(',').includes(t)
    : e.test
    ? e.test(t)
    : !1;
}
function Rd(e, t) {
  gl(e, 'a', t);
}
function Pd(e, t) {
  gl(e, 'da', t);
}
function gl(e, t, n = me) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Ts(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      _r(s.parent.vnode) && Od(r, t, n, s), (s = s.parent);
  }
}
function Od(e, t, n, r) {
  const s = Ts(t, e, r, !0);
  _l(() => {
    eo(r[t], s);
  }, n);
}
function Ws(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function zs(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Ts(e, t, n = me, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          On(), Cn(n);
          const a = Fe(t, n, e, o);
          return Jt(), Mn(), a;
        });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const mt =
    (e) =>
    (t, n = me) =>
      (!Tn || e === 'sp') && Ts(e, (...r) => t(...r), n),
  Md = mt('bm'),
  ks = mt('m'),
  Ld = mt('bu'),
  ml = mt('u'),
  yr = mt('bum'),
  _l = mt('um'),
  $d = mt('sp'),
  xd = mt('rtg'),
  Nd = mt('rtc');
function yl(e, t = me) {
  Ts('ec', e, t);
}
function vE(e, t) {
  const n = be;
  if (n === null) return e;
  const r = As(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, a, c, l = ue] = t[i];
    o &&
      (Z(o) && (o = { mounted: o, updated: o }),
      o.deep && zt(a),
      s.push({
        dir: o,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: c,
        modifiers: l,
      }));
  }
  return e;
}
function Qe(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    i && (a.oldValue = i[o].value);
    let c = a.dir[r];
    c && (On(), Fe(c, n, 8, [e.el, a, e, t]), Mn());
  }
}
const vl = 'components';
function Dd(e, t) {
  return Hd(vl, e, !0, t) || e;
}
const Bd = Symbol();
function Hd(e, t, n = !0, r = !1) {
  const s = be || me;
  if (s) {
    const i = s.type;
    if (e === vl) {
      const a = Ai(i, !1);
      if (a && (a === t || a === st(t) || a === bs(st(t)))) return i;
    }
    const o = Qo(s[e] || i[e], t) || Qo(s.appContext[e], t);
    return !o && r ? i : o;
  }
}
function Qo(e, t) {
  return e && (e[t] || e[st(t)] || e[bs(st(t))]);
}
function bE(e, t, n, r) {
  let s;
  const i = n && n[r];
  if (q(e) || pe(e)) {
    s = new Array(e.length);
    for (let o = 0, a = e.length; o < a; o++)
      s[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == 'number') {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (fe(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let a = 0, c = o.length; a < c; a++) {
        const l = o[a];
        s[a] = t(e[l], l, a, i && i[a]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function ar(e, t, n = {}, r, s) {
  if (be.isCE || (be.parent && Gt(be.parent) && be.parent.isCE))
    return t !== 'default' && (n.name = t), he('slot', n, r && r());
  let i = e[t];
  i && i._c && (i._d = !1), We();
  const o = i && bl(i(n)),
    a = Yn(
      Pe,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (r ? r() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !s && a.scopeId && (a.slotScopeIds = [a.scopeId + '-s']),
    i && i._c && (i._d = !0),
    a
  );
}
function bl(e) {
  return e.some((t) =>
    In(t) ? !(t.type === Se || (t.type === Pe && !bl(t.children))) : !0
  )
    ? e
    : null;
}
function Ud(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : Wr(r)] = e[r];
  return n;
}
const Ii = (e) => (e ? (xl(e) ? As(e) || e.proxy : Ii(e.parent)) : null),
  Jn = we(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ii(e.parent),
    $root: (e) => Ii(e.root),
    $emit: (e) => e.emit,
    $options: (e) => mo(e),
    $forceUpdate: (e) => e.f || (e.f = () => Es(e.update)),
    $nextTick: (e) => e.n || (e.n = $n.bind(e.proxy)),
    $watch: (e) => Id.bind(e),
  }),
  Vs = (e, t) => e !== ue && !e.__isScriptSetup && ne(e, t),
  jd = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: i,
        accessCache: o,
        type: a,
        appContext: c,
      } = e;
      let l;
      if (t[0] !== '$') {
        const g = o[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Vs(r, t)) return (o[t] = 1), r[t];
          if (s !== ue && ne(s, t)) return (o[t] = 2), s[t];
          if ((l = e.propsOptions[0]) && ne(l, t)) return (o[t] = 3), i[t];
          if (n !== ue && ne(n, t)) return (o[t] = 4), n[t];
          Ci && (o[t] = 0);
        }
      }
      const u = Jn[t];
      let f, d;
      if (u) return t === '$attrs' && Be(e, 'get', t), u(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== ue && ne(n, t)) return (o[t] = 4), n[t];
      if (((d = c.config.globalProperties), ne(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e;
      return Vs(s, t)
        ? ((s[t] = n), !0)
        : r !== ue && ne(r, t)
        ? ((r[t] = n), !0)
        : ne(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: i,
        },
      },
      o
    ) {
      let a;
      return (
        !!n[o] ||
        (e !== ue && ne(e, o)) ||
        Vs(t, o) ||
        ((a = i[0]) && ne(a, o)) ||
        ne(r, o) ||
        ne(Jn, o) ||
        ne(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ne(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Ci = !0;
function Fd(e) {
  const t = mo(e),
    n = e.proxy,
    r = e.ctx;
  (Ci = !1), t.beforeCreate && ea(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: i,
    methods: o,
    watch: a,
    provide: c,
    inject: l,
    created: u,
    beforeMount: f,
    mounted: d,
    beforeUpdate: g,
    updated: m,
    activated: E,
    deactivated: R,
    beforeDestroy: y,
    beforeUnmount: p,
    destroyed: v,
    unmounted: I,
    render: O,
    renderTracked: L,
    renderTriggered: x,
    errorCaptured: k,
    serverPrefetch: H,
    expose: U,
    inheritAttrs: K,
    components: D,
    directives: Y,
    filters: j,
  } = t;
  if ((l && Wd(l, r, null, e.appContext.config.unwrapInjectedRef), o))
    for (const ae in o) {
      const ie = o[ae];
      Z(ie) && (r[ae] = ie.bind(n));
    }
  if (s) {
    const ae = s.call(n, n);
    fe(ae) && (e.data = it(ae));
  }
  if (((Ci = !0), i))
    for (const ae in i) {
      const ie = i[ae],
        ze = Z(ie) ? ie.bind(n, n) : Z(ie.get) ? ie.get.bind(n, n) : Ge,
        Nt = !Z(ie) && Z(ie.set) ? ie.set.bind(n) : Ge,
        Ve = ve({ get: ze, set: Nt });
      Object.defineProperty(r, ae, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (Ae) => (Ve.value = Ae),
      });
    }
  if (a) for (const ae in a) wl(a[ae], r, n, ae);
  if (c) {
    const ae = Z(c) ? c.call(n) : c;
    Reflect.ownKeys(ae).forEach((ie) => {
      pn(ie, ae[ie]);
    });
  }
  u && ea(u, e, 'c');
  function ee(ae, ie) {
    q(ie) ? ie.forEach((ze) => ae(ze.bind(n))) : ie && ae(ie.bind(n));
  }
  if (
    (ee(Md, f),
    ee(ks, d),
    ee(Ld, g),
    ee(ml, m),
    ee(Rd, E),
    ee(Pd, R),
    ee(yl, k),
    ee(Nd, L),
    ee(xd, x),
    ee(yr, p),
    ee(_l, I),
    ee($d, H),
    q(U))
  )
    if (U.length) {
      const ae = e.exposed || (e.exposed = {});
      U.forEach((ie) => {
        Object.defineProperty(ae, ie, {
          get: () => n[ie],
          set: (ze) => (n[ie] = ze),
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === Ge && (e.render = O),
    K != null && (e.inheritAttrs = K),
    D && (e.components = D),
    Y && (e.directives = Y);
}
function Wd(e, t, n = Ge, r = !1) {
  q(e) && (e = Ti(e));
  for (const s in e) {
    const i = e[s];
    let o;
    fe(i)
      ? 'default' in i
        ? (o = Ne(i.from || s, i.default, !0))
        : (o = Ne(i.from || s))
      : (o = Ne(i)),
      _e(o) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (a) => (o.value = a),
          })
        : (t[s] = o);
  }
}
function ea(e, t, n) {
  Fe(q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wl(e, t, n, r) {
  const s = r.includes('.') ? fl(n, r) : () => n[r];
  if (pe(e)) {
    const i = t[e];
    Z(i) && gn(s, i);
  } else if (Z(e)) gn(s, e.bind(n));
  else if (fe(e))
    if (q(e)) e.forEach((i) => wl(i, t, n, r));
    else {
      const i = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(i) && gn(s, i, e);
    }
}
function mo(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    a = i.get(t);
  let c;
  return (
    a
      ? (c = a)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((l) => ns(c, l, o, !0)), ns(c, t, o)),
    fe(t) && i.set(t, c),
    c
  );
}
function ns(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && ns(e, i, n, !0), s && s.forEach((o) => ns(e, o, n, !0));
  for (const o in t)
    if (!(r && o === 'expose')) {
      const a = zd[o] || (n && n[o]);
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const zd = {
  data: ta,
  props: Ut,
  emits: Ut,
  methods: Ut,
  computed: Ut,
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  components: Ut,
  directives: Ut,
  watch: Kd,
  provide: ta,
  inject: Vd,
};
function ta(e, t) {
  return t
    ? e
      ? function () {
          return we(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Vd(e, t) {
  return Ut(Ti(e), Ti(t));
}
function Ti(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ut(e, t) {
  return e ? we(we(Object.create(null), e), t) : t;
}
function Kd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = we(Object.create(null), e);
  for (const r in t) n[r] = ke(e[r], t[r]);
  return n;
}
function qd(e, t, n, r = !1) {
  const s = {},
    i = {};
  Yr(i, Ss, 1), (e.propsDefaults = Object.create(null)), El(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = r ? s : nd(s)) : e.type.props ? (e.props = s) : (e.props = i),
    (e.attrs = i);
}
function Gd(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    a = re(s),
    [c] = e.propsOptions;
  let l = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let d = u[f];
        if (Is(e.emitsOptions, d)) continue;
        const g = t[d];
        if (c)
          if (ne(i, d)) g !== i[d] && ((i[d] = g), (l = !0));
          else {
            const m = st(d);
            s[m] = ki(c, a, m, g, e, !1);
          }
        else g !== i[d] && ((i[d] = g), (l = !0));
      }
    }
  } else {
    El(e, t, s, i) && (l = !0);
    let u;
    for (const f in a)
      (!t || (!ne(t, f) && ((u = Pn(f)) === f || !ne(t, u)))) &&
        (c
          ? n &&
            (n[f] !== void 0 || n[u] !== void 0) &&
            (s[f] = ki(c, a, f, void 0, e, !0))
          : delete s[f]);
    if (i !== a)
      for (const f in i) (!t || (!ne(t, f) && !0)) && (delete i[f], (l = !0));
  }
  l && dt(e, 'set', '$attrs');
}
function El(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let c in t) {
      if (Gn(c)) continue;
      const l = t[c];
      let u;
      s && ne(s, (u = st(c)))
        ? !i || !i.includes(u)
          ? (n[u] = l)
          : ((a || (a = {}))[u] = l)
        : Is(e.emitsOptions, c) ||
          ((!(c in r) || l !== r[c]) && ((r[c] = l), (o = !0)));
    }
  if (i) {
    const c = re(n),
      l = a || ue;
    for (let u = 0; u < i.length; u++) {
      const f = i[u];
      n[f] = ki(s, c, f, l[f], e, !ne(l, f));
    }
  }
  return o;
}
function ki(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const a = ne(o, 'default');
    if (a && r === void 0) {
      const c = o.default;
      if (o.type !== Function && Z(c)) {
        const { propsDefaults: l } = s;
        n in l ? (r = l[n]) : (Cn(s), (r = l[n] = c.call(null, t)), Jt());
      } else r = c;
    }
    o[0] &&
      (i && !a ? (r = !1) : o[1] && (r === '' || r === Pn(n)) && (r = !0));
  }
  return r;
}
function Il(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const i = e.props,
    o = {},
    a = [];
  let c = !1;
  if (!Z(e)) {
    const u = (f) => {
      c = !0;
      const [d, g] = Il(f, t, !0);
      we(o, d), g && a.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !c) return fe(e) && r.set(e, cn), cn;
  if (q(i))
    for (let u = 0; u < i.length; u++) {
      const f = st(i[u]);
      na(f) && (o[f] = ue);
    }
  else if (i)
    for (const u in i) {
      const f = st(u);
      if (na(f)) {
        const d = i[u],
          g = (o[f] = q(d) || Z(d) ? { type: d } : Object.assign({}, d));
        if (g) {
          const m = ia(Boolean, g.type),
            E = ia(String, g.type);
          (g[0] = m > -1),
            (g[1] = E < 0 || m < E),
            (m > -1 || ne(g, 'default')) && a.push(f);
        }
      }
    }
  const l = [o, a];
  return fe(e) && r.set(e, l), l;
}
function na(e) {
  return e[0] !== '$';
}
function ra(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? 'null' : '';
}
function sa(e, t) {
  return ra(e) === ra(t);
}
function ia(e, t) {
  return q(t) ? t.findIndex((n) => sa(n, e)) : Z(t) && sa(t, e) ? 0 : -1;
}
const Cl = (e) => e[0] === '_' || e === '$stable',
  _o = (e) => (q(e) ? e.map(Ue) : [Ue(e)]),
  Jd = (e, t, n) => {
    if (t._n) return t;
    const r = fo((...s) => _o(t(...s)), n);
    return (r._c = !1), r;
  },
  Tl = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Cl(s)) continue;
      const i = e[s];
      if (Z(i)) t[s] = Jd(s, i, r);
      else if (i != null) {
        const o = _o(i);
        t[s] = () => o;
      }
    }
  },
  kl = (e, t) => {
    const n = _o(t);
    e.slots.default = () => n;
  },
  Zd = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = re(t)), Yr(t, '_', n)) : Tl(t, (e.slots = {}));
    } else (e.slots = {}), t && kl(e, t);
    Yr(e.slots, Ss, 1);
  },
  Yd = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let i = !0,
      o = ue;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (i = !1)
          : (we(s, t), !n && a === 1 && delete s._)
        : ((i = !t.$stable), Tl(t, s)),
        (o = t);
    } else t && (kl(e, t), (o = { default: 1 }));
    if (i) for (const a in s) !Cl(a) && !(a in o) && delete s[a];
  };
function Sl() {
  return {
    app: null,
    config: {
      isNativeTag: Ef,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Xd = 0;
function Qd(e, t) {
  return function (r, s = null) {
    Z(r) || (r = Object.assign({}, r)), s != null && !fe(s) && (s = null);
    const i = Sl(),
      o = new Set();
    let a = !1;
    const c = (i.app = {
      _uid: Xd++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: vo,
      get config() {
        return i.config;
      },
      set config(l) {},
      use(l, ...u) {
        return (
          o.has(l) ||
            (l && Z(l.install)
              ? (o.add(l), l.install(c, ...u))
              : Z(l) && (o.add(l), l(c, ...u))),
          c
        );
      },
      mixin(l) {
        return i.mixins.includes(l) || i.mixins.push(l), c;
      },
      component(l, u) {
        return u ? ((i.components[l] = u), c) : i.components[l];
      },
      directive(l, u) {
        return u ? ((i.directives[l] = u), c) : i.directives[l];
      },
      mount(l, u, f) {
        if (!a) {
          const d = he(r, s);
          return (
            (d.appContext = i),
            u && t ? t(d, l) : e(d, l, f),
            (a = !0),
            (c._container = l),
            (l.__vue_app__ = c),
            As(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(l, u) {
        return (i.provides[l] = u), c;
      },
    });
    return c;
  };
}
function rs(e, t, n, r, s = !1) {
  if (q(e)) {
    e.forEach((d, g) => rs(d, t && (q(t) ? t[g] : t), n, r, s));
    return;
  }
  if (Gt(r) && !s) return;
  const i = r.shapeFlag & 4 ? As(r.component) || r.component.proxy : r.el,
    o = s ? null : i,
    { i: a, r: c } = e,
    l = t && t.r,
    u = a.refs === ue ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (l != null &&
      l !== c &&
      (pe(l)
        ? ((u[l] = null), ne(f, l) && (f[l] = null))
        : _e(l) && (l.value = null)),
    Z(c))
  )
    Ot(c, a, 12, [o, u]);
  else {
    const d = pe(c),
      g = _e(c);
    if (d || g) {
      const m = () => {
        if (e.f) {
          const E = d ? (ne(f, c) ? f[c] : u[c]) : c.value;
          s
            ? q(E) && eo(E, i)
            : q(E)
            ? E.includes(i) || E.push(i)
            : d
            ? ((u[c] = [i]), ne(f, c) && (f[c] = u[c]))
            : ((c.value = [i]), e.k && (u[e.k] = c.value));
        } else
          d
            ? ((u[c] = o), ne(f, c) && (f[c] = o))
            : g && ((c.value = o), e.k && (u[e.k] = o));
      };
      o ? ((m.id = -1), ye(m, n)) : m();
    }
  }
}
let yt = !1;
const Nr = (e) => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
  Dr = (e) => e.nodeType === 8;
function eh(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: i,
        parentNode: o,
        remove: a,
        insert: c,
        createComment: l,
      },
    } = e,
    u = (y, p) => {
      if (!p.hasChildNodes()) {
        n(null, y, p), Qr(), (p._vnode = y);
        return;
      }
      (yt = !1),
        f(p.firstChild, y, null, null, null),
        Qr(),
        (p._vnode = y),
        yt && console.error('Hydration completed but contains mismatches.');
    },
    f = (y, p, v, I, O, L = !1) => {
      const x = Dr(y) && y.data === '[',
        k = () => E(y, p, v, I, O, x),
        { type: H, ref: U, shapeFlag: K, patchFlag: D } = p;
      let Y = y.nodeType;
      (p.el = y), D === -2 && ((L = !1), (p.dynamicChildren = null));
      let j = null;
      switch (H) {
        case wn:
          Y !== 3
            ? p.children === ''
              ? (c((p.el = s('')), o(y), y), (j = y))
              : (j = k())
            : (y.data !== p.children && ((yt = !0), (y.data = p.children)),
              (j = i(y)));
          break;
        case Se:
          Y !== 8 || x ? (j = k()) : (j = i(y));
          break;
        case zr:
          if ((x && ((y = i(y)), (Y = y.nodeType)), Y === 1 || Y === 3)) {
            j = y;
            const Ie = !p.children.length;
            for (let ee = 0; ee < p.staticCount; ee++)
              Ie && (p.children += j.nodeType === 1 ? j.outerHTML : j.data),
                ee === p.staticCount - 1 && (p.anchor = j),
                (j = i(j));
            return x ? i(j) : j;
          } else k();
          break;
        case Pe:
          x ? (j = m(y, p, v, I, O, L)) : (j = k());
          break;
        default:
          if (K & 1)
            Y !== 1 || p.type.toLowerCase() !== y.tagName.toLowerCase()
              ? (j = k())
              : (j = d(y, p, v, I, O, L));
          else if (K & 6) {
            p.slotScopeIds = O;
            const Ie = o(y);
            if (
              (t(p, Ie, null, v, I, Nr(Ie), L),
              (j = x ? R(y) : i(y)),
              j && Dr(j) && j.data === 'teleport end' && (j = i(j)),
              Gt(p))
            ) {
              let ee;
              x
                ? ((ee = he(Pe)),
                  (ee.anchor = j ? j.previousSibling : Ie.lastChild))
                : (ee = y.nodeType === 3 ? Ll('') : he('div')),
                (ee.el = y),
                (p.component.subTree = ee);
            }
          } else
            K & 64
              ? Y !== 8
                ? (j = k())
                : (j = p.type.hydrate(y, p, v, I, O, L, e, g))
              : K & 128 &&
                (j = p.type.hydrate(y, p, v, I, Nr(o(y)), O, L, e, f));
      }
      return U != null && rs(U, null, I, p), j;
    },
    d = (y, p, v, I, O, L) => {
      L = L || !!p.dynamicChildren;
      const { type: x, props: k, patchFlag: H, shapeFlag: U, dirs: K } = p,
        D = (x === 'input' && K) || x === 'option';
      if (D || H !== -1) {
        if ((K && Qe(p, null, v, 'created'), k))
          if (D || !L || H & 48)
            for (const j in k)
              ((D && j.endsWith('value')) || (mr(j) && !Gn(j))) &&
                r(y, j, null, k[j], !1, void 0, v);
          else k.onClick && r(y, 'onClick', null, k.onClick, !1, void 0, v);
        let Y;
        if (
          ((Y = k && k.onVnodeBeforeMount) && Re(Y, v, p),
          K && Qe(p, null, v, 'beforeMount'),
          ((Y = k && k.onVnodeMounted) || K) &&
            ul(() => {
              Y && Re(Y, v, p), K && Qe(p, null, v, 'mounted');
            }, I),
          U & 16 && !(k && (k.innerHTML || k.textContent)))
        ) {
          let j = g(y.firstChild, p, y, v, I, O, L);
          for (; j; ) {
            yt = !0;
            const Ie = j;
            (j = j.nextSibling), a(Ie);
          }
        } else
          U & 8 &&
            y.textContent !== p.children &&
            ((yt = !0), (y.textContent = p.children));
      }
      return y.nextSibling;
    },
    g = (y, p, v, I, O, L, x) => {
      x = x || !!p.dynamicChildren;
      const k = p.children,
        H = k.length;
      for (let U = 0; U < H; U++) {
        const K = x ? k[U] : (k[U] = Ue(k[U]));
        if (y) y = f(y, K, I, O, L, x);
        else {
          if (K.type === wn && !K.children) continue;
          (yt = !0), n(null, K, v, null, I, O, Nr(v), L);
        }
      }
      return y;
    },
    m = (y, p, v, I, O, L) => {
      const { slotScopeIds: x } = p;
      x && (O = O ? O.concat(x) : x);
      const k = o(y),
        H = g(i(y), p, k, v, I, O, L);
      return H && Dr(H) && H.data === ']'
        ? i((p.anchor = H))
        : ((yt = !0), c((p.anchor = l(']')), k, H), H);
    },
    E = (y, p, v, I, O, L) => {
      if (((yt = !0), (p.el = null), L)) {
        const H = R(y);
        for (;;) {
          const U = i(y);
          if (U && U !== H) a(U);
          else break;
        }
      }
      const x = i(y),
        k = o(y);
      return a(y), n(null, p, k, x, v, I, Nr(k), O), x;
    },
    R = (y) => {
      let p = 0;
      for (; y; )
        if (
          ((y = i(y)), y && Dr(y) && (y.data === '[' && p++, y.data === ']'))
        ) {
          if (p === 0) return i(y);
          p--;
        }
      return y;
    };
  return [u, f];
}
const ye = ul;
function th(e) {
  return Al(e);
}
function nh(e) {
  return Al(e, eh);
}
function Al(e, t) {
  const n = Af();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: o,
      createText: a,
      createComment: c,
      setText: l,
      setElementText: u,
      parentNode: f,
      nextSibling: d,
      setScopeId: g = Ge,
      insertStaticContent: m,
    } = e,
    E = (
      h,
      _,
      b,
      w = null,
      T = null,
      P = null,
      N = !1,
      A = null,
      M = !!_.dynamicChildren
    ) => {
      if (h === _) return;
      h && !tt(h, _) && ((w = $(h)), Ae(h, T, P, !0), (h = null)),
        _.patchFlag === -2 && ((M = !1), (_.dynamicChildren = null));
      const { type: S, ref: z, shapeFlag: F } = _;
      switch (S) {
        case wn:
          R(h, _, b, w);
          break;
        case Se:
          y(h, _, b, w);
          break;
        case zr:
          h == null && p(_, b, w, N);
          break;
        case Pe:
          D(h, _, b, w, T, P, N, A, M);
          break;
        default:
          F & 1
            ? O(h, _, b, w, T, P, N, A, M)
            : F & 6
            ? Y(h, _, b, w, T, P, N, A, M)
            : (F & 64 || F & 128) && S.process(h, _, b, w, T, P, N, A, M, te);
      }
      z != null && T && rs(z, h && h.ref, P, _ || h, !_);
    },
    R = (h, _, b, w) => {
      if (h == null) r((_.el = a(_.children)), b, w);
      else {
        const T = (_.el = h.el);
        _.children !== h.children && l(T, _.children);
      }
    },
    y = (h, _, b, w) => {
      h == null ? r((_.el = c(_.children || '')), b, w) : (_.el = h.el);
    },
    p = (h, _, b, w) => {
      [h.el, h.anchor] = m(h.children, _, b, w, h.el, h.anchor);
    },
    v = ({ el: h, anchor: _ }, b, w) => {
      let T;
      for (; h && h !== _; ) (T = d(h)), r(h, b, w), (h = T);
      r(_, b, w);
    },
    I = ({ el: h, anchor: _ }) => {
      let b;
      for (; h && h !== _; ) (b = d(h)), s(h), (h = b);
      s(_);
    },
    O = (h, _, b, w, T, P, N, A, M) => {
      (N = N || _.type === 'svg'),
        h == null ? L(_, b, w, T, P, N, A, M) : H(h, _, T, P, N, A, M);
    },
    L = (h, _, b, w, T, P, N, A) => {
      let M, S;
      const { type: z, props: F, shapeFlag: V, transition: J, dirs: Q } = h;
      if (
        ((M = h.el = o(h.type, P, F && F.is, F)),
        V & 8
          ? u(M, h.children)
          : V & 16 &&
            k(h.children, M, null, w, T, P && z !== 'foreignObject', N, A),
        Q && Qe(h, null, w, 'created'),
        F)
      ) {
        for (const oe in F)
          oe !== 'value' &&
            !Gn(oe) &&
            i(M, oe, null, F[oe], P, h.children, w, T, B);
        'value' in F && i(M, 'value', null, F.value),
          (S = F.onVnodeBeforeMount) && Re(S, w, h);
      }
      x(M, h, h.scopeId, N, w), Q && Qe(h, null, w, 'beforeMount');
      const ce = (!T || (T && !T.pendingBranch)) && J && !J.persisted;
      ce && J.beforeEnter(M),
        r(M, _, b),
        ((S = F && F.onVnodeMounted) || ce || Q) &&
          ye(() => {
            S && Re(S, w, h), ce && J.enter(M), Q && Qe(h, null, w, 'mounted');
          }, T);
    },
    x = (h, _, b, w, T) => {
      if ((b && g(h, b), w)) for (let P = 0; P < w.length; P++) g(h, w[P]);
      if (T) {
        let P = T.subTree;
        if (_ === P) {
          const N = T.vnode;
          x(h, N, N.scopeId, N.slotScopeIds, T.parent);
        }
      }
    },
    k = (h, _, b, w, T, P, N, A, M = 0) => {
      for (let S = M; S < h.length; S++) {
        const z = (h[S] = A ? It(h[S]) : Ue(h[S]));
        E(null, z, _, b, w, T, P, N, A);
      }
    },
    H = (h, _, b, w, T, P, N) => {
      const A = (_.el = h.el);
      let { patchFlag: M, dynamicChildren: S, dirs: z } = _;
      M |= h.patchFlag & 16;
      const F = h.props || ue,
        V = _.props || ue;
      let J;
      b && Dt(b, !1),
        (J = V.onVnodeBeforeUpdate) && Re(J, b, _, h),
        z && Qe(_, h, b, 'beforeUpdate'),
        b && Dt(b, !0);
      const Q = T && _.type !== 'foreignObject';
      if (
        (S
          ? U(h.dynamicChildren, S, A, b, w, Q, P)
          : N || ie(h, _, A, null, b, w, Q, P, !1),
        M > 0)
      ) {
        if (M & 16) K(A, _, F, V, b, w, T);
        else if (
          (M & 2 && F.class !== V.class && i(A, 'class', null, V.class, T),
          M & 4 && i(A, 'style', F.style, V.style, T),
          M & 8)
        ) {
          const ce = _.dynamicProps;
          for (let oe = 0; oe < ce.length; oe++) {
            const ge = ce[oe],
              Ke = F[ge],
              nn = V[ge];
            (nn !== Ke || ge === 'value') &&
              i(A, ge, Ke, nn, T, h.children, b, w, B);
          }
        }
        M & 1 && h.children !== _.children && u(A, _.children);
      } else !N && S == null && K(A, _, F, V, b, w, T);
      ((J = V.onVnodeUpdated) || z) &&
        ye(() => {
          J && Re(J, b, _, h), z && Qe(_, h, b, 'updated');
        }, w);
    },
    U = (h, _, b, w, T, P, N) => {
      for (let A = 0; A < _.length; A++) {
        const M = h[A],
          S = _[A],
          z =
            M.el && (M.type === Pe || !tt(M, S) || M.shapeFlag & 70)
              ? f(M.el)
              : b;
        E(M, S, z, null, w, T, P, N, !0);
      }
    },
    K = (h, _, b, w, T, P, N) => {
      if (b !== w) {
        if (b !== ue)
          for (const A in b)
            !Gn(A) && !(A in w) && i(h, A, b[A], null, N, _.children, T, P, B);
        for (const A in w) {
          if (Gn(A)) continue;
          const M = w[A],
            S = b[A];
          M !== S && A !== 'value' && i(h, A, S, M, N, _.children, T, P, B);
        }
        'value' in w && i(h, 'value', b.value, w.value);
      }
    },
    D = (h, _, b, w, T, P, N, A, M) => {
      const S = (_.el = h ? h.el : a('')),
        z = (_.anchor = h ? h.anchor : a(''));
      let { patchFlag: F, dynamicChildren: V, slotScopeIds: J } = _;
      J && (A = A ? A.concat(J) : J),
        h == null
          ? (r(S, b, w), r(z, b, w), k(_.children, b, z, T, P, N, A, M))
          : F > 0 && F & 64 && V && h.dynamicChildren
          ? (U(h.dynamicChildren, V, b, T, P, N, A),
            (_.key != null || (T && _ === T.subTree)) && Rl(h, _, !0))
          : ie(h, _, b, z, T, P, N, A, M);
    },
    Y = (h, _, b, w, T, P, N, A, M) => {
      (_.slotScopeIds = A),
        h == null
          ? _.shapeFlag & 512
            ? T.ctx.activate(_, b, w, N, M)
            : j(_, b, w, T, P, N, M)
          : Ie(h, _, M);
    },
    j = (h, _, b, w, T, P, N) => {
      const A = (h.component = lh(h, w, T));
      if ((_r(h) && (A.ctx.renderer = te), uh(A), A.asyncDep)) {
        if ((T && T.registerDep(A, ee), !h.el)) {
          const M = (A.subTree = he(Se));
          y(null, M, _, b);
        }
        return;
      }
      ee(A, h, _, b, T, P, N);
    },
    Ie = (h, _, b) => {
      const w = (_.component = h.component);
      if (md(h, _, b))
        if (w.asyncDep && !w.asyncResolved) {
          ae(w, _, b);
          return;
        } else (w.next = _), ud(w.update), w.update();
      else (_.el = h.el), (w.vnode = _);
    },
    ee = (h, _, b, w, T, P, N) => {
      const A = () => {
          if (h.isMounted) {
            let { next: z, bu: F, u: V, parent: J, vnode: Q } = h,
              ce = z,
              oe;
            Dt(h, !1),
              z ? ((z.el = Q.el), ae(h, z, N)) : (z = Q),
              F && un(F),
              (oe = z.props && z.props.onVnodeBeforeUpdate) && Re(oe, J, z, Q),
              Dt(h, !0);
            const ge = Us(h),
              Ke = h.subTree;
            (h.subTree = ge),
              E(Ke, ge, f(Ke.el), $(Ke), h, T, P),
              (z.el = ge.el),
              ce === null && ho(h, ge.el),
              V && ye(V, T),
              (oe = z.props && z.props.onVnodeUpdated) &&
                ye(() => Re(oe, J, z, Q), T);
          } else {
            let z;
            const { el: F, props: V } = _,
              { bm: J, m: Q, parent: ce } = h,
              oe = Gt(_);
            if (
              (Dt(h, !1),
              J && un(J),
              !oe && (z = V && V.onVnodeBeforeMount) && Re(z, ce, _),
              Dt(h, !0),
              F && X)
            ) {
              const ge = () => {
                (h.subTree = Us(h)), X(F, h.subTree, h, T, null);
              };
              oe
                ? _.type.__asyncLoader().then(() => !h.isUnmounted && ge())
                : ge();
            } else {
              const ge = (h.subTree = Us(h));
              E(null, ge, b, w, h, T, P), (_.el = ge.el);
            }
            if ((Q && ye(Q, T), !oe && (z = V && V.onVnodeMounted))) {
              const ge = _;
              ye(() => Re(z, ce, ge), T);
            }
            (_.shapeFlag & 256 ||
              (ce && Gt(ce.vnode) && ce.vnode.shapeFlag & 256)) &&
              h.a &&
              ye(h.a, T),
              (h.isMounted = !0),
              (_ = b = w = null);
          }
        },
        M = (h.effect = new so(A, () => Es(S), h.scope)),
        S = (h.update = () => M.run());
      (S.id = h.uid), Dt(h, !0), S();
    },
    ae = (h, _, b) => {
      _.component = h;
      const w = h.vnode.props;
      (h.vnode = _),
        (h.next = null),
        Gd(h, _.props, w, b),
        Yd(h, _.children, b),
        On(),
        Jo(),
        Mn();
    },
    ie = (h, _, b, w, T, P, N, A, M = !1) => {
      const S = h && h.children,
        z = h ? h.shapeFlag : 0,
        F = _.children,
        { patchFlag: V, shapeFlag: J } = _;
      if (V > 0) {
        if (V & 128) {
          Nt(S, F, b, w, T, P, N, A, M);
          return;
        } else if (V & 256) {
          ze(S, F, b, w, T, P, N, A, M);
          return;
        }
      }
      J & 8
        ? (z & 16 && B(S, T, P), F !== S && u(b, F))
        : z & 16
        ? J & 16
          ? Nt(S, F, b, w, T, P, N, A, M)
          : B(S, T, P, !0)
        : (z & 8 && u(b, ''), J & 16 && k(F, b, w, T, P, N, A, M));
    },
    ze = (h, _, b, w, T, P, N, A, M) => {
      (h = h || cn), (_ = _ || cn);
      const S = h.length,
        z = _.length,
        F = Math.min(S, z);
      let V;
      for (V = 0; V < F; V++) {
        const J = (_[V] = M ? It(_[V]) : Ue(_[V]));
        E(h[V], J, b, null, T, P, N, A, M);
      }
      S > z ? B(h, T, P, !0, !1, F) : k(_, b, w, T, P, N, A, M, F);
    },
    Nt = (h, _, b, w, T, P, N, A, M) => {
      let S = 0;
      const z = _.length;
      let F = h.length - 1,
        V = z - 1;
      for (; S <= F && S <= V; ) {
        const J = h[S],
          Q = (_[S] = M ? It(_[S]) : Ue(_[S]));
        if (tt(J, Q)) E(J, Q, b, null, T, P, N, A, M);
        else break;
        S++;
      }
      for (; S <= F && S <= V; ) {
        const J = h[F],
          Q = (_[V] = M ? It(_[V]) : Ue(_[V]));
        if (tt(J, Q)) E(J, Q, b, null, T, P, N, A, M);
        else break;
        F--, V--;
      }
      if (S > F) {
        if (S <= V) {
          const J = V + 1,
            Q = J < z ? _[J].el : w;
          for (; S <= V; )
            E(null, (_[S] = M ? It(_[S]) : Ue(_[S])), b, Q, T, P, N, A, M), S++;
        }
      } else if (S > V) for (; S <= F; ) Ae(h[S], T, P, !0), S++;
      else {
        const J = S,
          Q = S,
          ce = new Map();
        for (S = Q; S <= V; S++) {
          const Me = (_[S] = M ? It(_[S]) : Ue(_[S]));
          Me.key != null && ce.set(Me.key, S);
        }
        let oe,
          ge = 0;
        const Ke = V - Q + 1;
        let nn = !1,
          Bo = 0;
        const Hn = new Array(Ke);
        for (S = 0; S < Ke; S++) Hn[S] = 0;
        for (S = J; S <= F; S++) {
          const Me = h[S];
          if (ge >= Ke) {
            Ae(Me, T, P, !0);
            continue;
          }
          let Ye;
          if (Me.key != null) Ye = ce.get(Me.key);
          else
            for (oe = Q; oe <= V; oe++)
              if (Hn[oe - Q] === 0 && tt(Me, _[oe])) {
                Ye = oe;
                break;
              }
          Ye === void 0
            ? Ae(Me, T, P, !0)
            : ((Hn[Ye - Q] = S + 1),
              Ye >= Bo ? (Bo = Ye) : (nn = !0),
              E(Me, _[Ye], b, null, T, P, N, A, M),
              ge++);
        }
        const Ho = nn ? rh(Hn) : cn;
        for (oe = Ho.length - 1, S = Ke - 1; S >= 0; S--) {
          const Me = Q + S,
            Ye = _[Me],
            Uo = Me + 1 < z ? _[Me + 1].el : w;
          Hn[S] === 0
            ? E(null, Ye, b, Uo, T, P, N, A, M)
            : nn && (oe < 0 || S !== Ho[oe] ? Ve(Ye, b, Uo, 2) : oe--);
        }
      }
    },
    Ve = (h, _, b, w, T = null) => {
      const { el: P, type: N, transition: A, children: M, shapeFlag: S } = h;
      if (S & 6) {
        Ve(h.component.subTree, _, b, w);
        return;
      }
      if (S & 128) {
        h.suspense.move(_, b, w);
        return;
      }
      if (S & 64) {
        N.move(h, _, b, te);
        return;
      }
      if (N === Pe) {
        r(P, _, b);
        for (let F = 0; F < M.length; F++) Ve(M[F], _, b, w);
        r(h.anchor, _, b);
        return;
      }
      if (N === zr) {
        v(h, _, b);
        return;
      }
      if (w !== 2 && S & 1 && A)
        if (w === 0) A.beforeEnter(P), r(P, _, b), ye(() => A.enter(P), T);
        else {
          const { leave: F, delayLeave: V, afterLeave: J } = A,
            Q = () => r(P, _, b),
            ce = () => {
              F(P, () => {
                Q(), J && J();
              });
            };
          V ? V(P, Q, ce) : ce();
        }
      else r(P, _, b);
    },
    Ae = (h, _, b, w = !1, T = !1) => {
      const {
        type: P,
        props: N,
        ref: A,
        children: M,
        dynamicChildren: S,
        shapeFlag: z,
        patchFlag: F,
        dirs: V,
      } = h;
      if ((A != null && rs(A, null, b, h, !0), z & 256)) {
        _.ctx.deactivate(h);
        return;
      }
      const J = z & 1 && V,
        Q = !Gt(h);
      let ce;
      if ((Q && (ce = N && N.onVnodeBeforeUnmount) && Re(ce, _, h), z & 6))
        C(h.component, b, w);
      else {
        if (z & 128) {
          h.suspense.unmount(b, w);
          return;
        }
        J && Qe(h, null, _, 'beforeUnmount'),
          z & 64
            ? h.type.remove(h, _, b, T, te, w)
            : S && (P !== Pe || (F > 0 && F & 64))
            ? B(S, _, b, !1, !0)
            : ((P === Pe && F & 384) || (!T && z & 16)) && B(M, _, b),
          w && tn(h);
      }
      ((Q && (ce = N && N.onVnodeUnmounted)) || J) &&
        ye(() => {
          ce && Re(ce, _, h), J && Qe(h, null, _, 'unmounted');
        }, b);
    },
    tn = (h) => {
      const { type: _, el: b, anchor: w, transition: T } = h;
      if (_ === Pe) {
        Rr(b, w);
        return;
      }
      if (_ === zr) {
        I(h);
        return;
      }
      const P = () => {
        s(b), T && !T.persisted && T.afterLeave && T.afterLeave();
      };
      if (h.shapeFlag & 1 && T && !T.persisted) {
        const { leave: N, delayLeave: A } = T,
          M = () => N(b, P);
        A ? A(h.el, P, M) : M();
      } else P();
    },
    Rr = (h, _) => {
      let b;
      for (; h !== _; ) (b = d(h)), s(h), (h = b);
      s(_);
    },
    C = (h, _, b) => {
      const { bum: w, scope: T, update: P, subTree: N, um: A } = h;
      w && un(w),
        T.stop(),
        P && ((P.active = !1), Ae(N, h, _, b)),
        A && ye(A, _),
        ye(() => {
          h.isUnmounted = !0;
        }, _),
        _ &&
          _.pendingBranch &&
          !_.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === _.pendingId &&
          (_.deps--, _.deps === 0 && _.resolve());
    },
    B = (h, _, b, w = !1, T = !1, P = 0) => {
      for (let N = P; N < h.length; N++) Ae(h[N], _, b, w, T);
    },
    $ = (h) =>
      h.shapeFlag & 6
        ? $(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : d(h.anchor || h.el),
    W = (h, _, b) => {
      h == null
        ? _._vnode && Ae(_._vnode, null, null, !0)
        : E(_._vnode || null, h, _, null, null, null, b),
        Jo(),
        Qr(),
        (_._vnode = h);
    },
    te = {
      p: E,
      um: Ae,
      m: Ve,
      r: tn,
      mt: j,
      mc: k,
      pc: ie,
      pbc: U,
      n: $,
      o: e,
    };
  let de, X;
  return (
    t && ([de, X] = t(te)), { render: W, hydrate: de, createApp: Qd(W, de) }
  );
}
function Dt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Rl(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (q(r) && q(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let a = s[i];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[i] = It(s[i])), (a.el = o.el)),
        n || Rl(o, a)),
        a.type === wn && (a.el = o.el);
    }
}
function rh(e) {
  const t = e.slice(),
    n = [0];
  let r, s, i, o, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const l = e[r];
    if (l !== 0) {
      if (((s = n[n.length - 1]), e[s] < l)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (a = (i + o) >> 1), e[n[a]] < l ? (i = a + 1) : (o = a);
      l < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
const sh = (e) => e.__isTeleport,
  Pe = Symbol(void 0),
  wn = Symbol(void 0),
  Se = Symbol(void 0),
  zr = Symbol(void 0),
  Zn = [];
let je = null;
function We(e = !1) {
  Zn.push((je = e ? null : []));
}
function Pl() {
  Zn.pop(), (je = Zn[Zn.length - 1] || null);
}
let En = 1;
function oa(e) {
  En += e;
}
function Ol(e) {
  return (
    (e.dynamicChildren = En > 0 ? je || cn : null),
    Pl(),
    En > 0 && je && je.push(e),
    e
  );
}
function xn(e, t, n, r, s, i) {
  return Ol(ss(e, t, n, r, s, i, !0));
}
function Yn(e, t, n, r, s) {
  return Ol(he(e, t, n, r, s, !0));
}
function In(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ss = '__vInternal',
  Ml = ({ key: e }) => (e != null ? e : null),
  Vr = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? pe(e) || _e(e) || Z(e)
        ? { i: be, r: e, k: t, f: !!n }
        : e
      : null;
function ss(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  i = e === Pe ? 0 : 1,
  o = !1,
  a = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ml(t),
    ref: t && Vr(t),
    scopeId: Cs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: be,
  };
  return (
    a
      ? (yo(c, n), i & 128 && e.normalize(c))
      : n && (c.shapeFlag |= pe(n) ? 8 : 16),
    En > 0 &&
      !o &&
      je &&
      (c.patchFlag > 0 || i & 6) &&
      c.patchFlag !== 32 &&
      je.push(c),
    c
  );
}
const he = ih;
function ih(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === Bd) && (e = Se), In(e))) {
    const a = ht(e, t, !0);
    return (
      n && yo(a, n),
      En > 0 &&
        !i &&
        je &&
        (a.shapeFlag & 6 ? (je[je.indexOf(e)] = a) : je.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((ph(e) && (e = e.__vccOpts), t)) {
    t = oh(t);
    let { class: a, style: c } = t;
    a && !pe(a) && (t.class = gr(a)),
      fe(c) && (Jc(c) && !q(c) && (c = we({}, c)), (t.style = pr(c)));
  }
  const o = pe(e) ? 1 : cl(e) ? 128 : sh(e) ? 64 : fe(e) ? 4 : Z(e) ? 2 : 0;
  return ss(e, t, n, r, s, o, i, !0);
}
function oh(e) {
  return e ? (Jc(e) || Ss in e ? we({}, e) : e) : null;
}
function ht(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: i, children: o } = e,
    a = t ? $l(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Ml(a),
    ref:
      t && t.ref ? (n && s ? (q(s) ? s.concat(Vr(t)) : [s, Vr(t)]) : Vr(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Pe ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ht(e.ssContent),
    ssFallback: e.ssFallback && ht(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Ll(e = ' ', t = 0) {
  return he(wn, null, e, t);
}
function wE(e = '', t = !1) {
  return t ? (We(), Yn(Se, null, e)) : he(Se, null, e);
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? he(Se)
    : q(e)
    ? he(Pe, null, e.slice())
    : typeof e == 'object'
    ? It(e)
    : he(wn, null, String(e));
}
function It(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : ht(e);
}
function yo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (q(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), yo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Ss in t)
        ? (t._ctx = be)
        : s === 3 &&
          be &&
          (be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: be }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ll(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function $l(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = gr([t.class, r.class]));
      else if (s === 'style') t.style = pr([t.style, r.style]);
      else if (mr(s)) {
        const i = t[s],
          o = r[s];
        o &&
          i !== o &&
          !(q(i) && i.includes(o)) &&
          (t[s] = i ? [].concat(i, o) : o);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function Re(e, t, n, r = null) {
  Fe(e, t, 7, [n, r]);
}
const ah = Sl();
let ch = 0;
function lh(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || ah,
    i = {
      uid: ch++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Rf(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Il(r, s),
      emitsOptions: al(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: r.inheritAttrs,
      ctx: ue,
      data: ue,
      props: ue,
      attrs: ue,
      slots: ue,
      refs: ue,
      setupState: ue,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = dd.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let me = null;
const Nn = () => me || be,
  Cn = (e) => {
    (me = e), e.scope.on();
  },
  Jt = () => {
    me && me.scope.off(), (me = null);
  };
function xl(e) {
  return e.vnode.shapeFlag & 4;
}
let Tn = !1;
function uh(e, t = !1) {
  Tn = t;
  const { props: n, children: r } = e.vnode,
    s = xl(e);
  qd(e, n, s, t), Zd(e, r);
  const i = s ? fh(e, t) : void 0;
  return (Tn = !1), i;
}
function fh(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Zc(new Proxy(e.ctx, jd)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? hh(e) : null);
    Cn(e), On();
    const i = Ot(r, e, 0, [e.props, s]);
    if ((Mn(), Jt(), xc(i))) {
      if ((i.then(Jt, Jt), t))
        return i
          .then((o) => {
            Si(e, o, t);
          })
          .catch((o) => {
            Ln(o, e, 0);
          });
      e.asyncDep = i;
    } else Si(e, i, t);
  } else Nl(e, t);
}
function Si(e, t, n) {
  Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : fe(t) && (e.setupState = el(t)),
    Nl(e, n);
}
let aa;
function Nl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && aa && !r.render) {
      const s = r.template || mo(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: c } = r,
          l = we(we({ isCustomElement: i, delimiters: a }, o), c);
        r.render = aa(s, l);
      }
    }
    e.render = r.render || Ge;
  }
  Cn(e), On(), Fd(e), Mn(), Jt();
}
function dh(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Be(e, 'get', '$attrs'), t[n];
    },
  });
}
function hh(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = dh(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function As(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(el(Zc(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Jn) return Jn[n](e);
        },
        has(t, n) {
          return n in t || n in Jn;
        },
      }))
    );
}
function Ai(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function ph(e) {
  return Z(e) && '__vccOpts' in e;
}
const ve = (e, t) => ad(e, t, Tn);
function De(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? fe(t) && !q(t)
      ? In(t)
        ? he(e, null, [t])
        : he(e, t)
      : he(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && In(n) && (n = [n]),
      he(e, t, n));
}
const gh = Symbol(''),
  mh = () => Ne(gh),
  vo = '3.2.45',
  _h = 'http://www.w3.org/2000/svg',
  Wt = typeof document < 'u' ? document : null,
  ca = Wt && Wt.createElement('template'),
  yh = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Wt.createElementNS(_h, e)
        : Wt.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: (e) => Wt.createTextNode(e),
    createComment: (e) => Wt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Wt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === i || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === i || !(s = s.nextSibling));

        );
      else {
        ca.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = ca.content;
        if (r) {
          const c = a.firstChild;
          for (; c.firstChild; ) a.appendChild(c.firstChild);
          a.removeChild(c);
        }
        t.insertBefore(a, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function vh(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
function bh(e, t, n) {
  const r = e.style,
    s = pe(n);
  if (n && !s) {
    for (const i in n) Ri(r, i, n[i]);
    if (t && !pe(t)) for (const i in t) n[i] == null && Ri(r, i, '');
  } else {
    const i = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (r.display = i);
  }
}
const la = /\s*!important$/;
function Ri(e, t, n) {
  if (q(n)) n.forEach((r) => Ri(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = wh(e, t);
    la.test(n)
      ? e.setProperty(Pn(r), n.replace(la, ''), 'important')
      : (e[r] = n);
  }
}
const ua = ['Webkit', 'Moz', 'ms'],
  Ks = {};
function wh(e, t) {
  const n = Ks[t];
  if (n) return n;
  let r = st(t);
  if (r !== 'filter' && r in e) return (Ks[t] = r);
  r = bs(r);
  for (let s = 0; s < ua.length; s++) {
    const i = ua[s] + r;
    if (i in e) return (Ks[t] = i);
  }
  return t;
}
const fa = 'http://www.w3.org/1999/xlink';
function Eh(e, t, n, r, s) {
  if (r && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(fa, t.slice(6, t.length))
      : e.setAttributeNS(fa, t, n);
  else {
    const i = wf(t);
    n == null || (i && !Mc(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : n);
  }
}
function Ih(e, t, n, r, s, i, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && o(r, s, i), (e[t] = n == null ? '' : n);
    return;
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n;
    const c = n == null ? '' : n;
    (e.value !== c || e.tagName === 'OPTION') && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === '' || n == null) {
    const c = typeof e[t];
    c === 'boolean'
      ? (n = Mc(n))
      : n == null && c === 'string'
      ? ((n = ''), (a = !0))
      : c === 'number' && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function sn(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Ch(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Th(e, t, n, r, s = null) {
  const i = e._vei || (e._vei = {}),
    o = i[t];
  if (r && o) o.value = r;
  else {
    const [a, c] = kh(t);
    if (r) {
      const l = (i[t] = Rh(r, s));
      sn(e, a, l, c);
    } else o && (Ch(e, a, o, c), (i[t] = void 0));
  }
}
const da = /(?:Once|Passive|Capture)$/;
function kh(e) {
  let t;
  if (da.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(da)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Pn(e.slice(2)), t];
}
let qs = 0;
const Sh = Promise.resolve(),
  Ah = () => qs || (Sh.then(() => (qs = 0)), (qs = Date.now()));
function Rh(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Fe(Ph(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Ah()), n;
}
function Ph(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const ha = /^on[a-z]/,
  Oh = (e, t, n, r, s = !1, i, o, a, c) => {
    t === 'class'
      ? vh(e, r, s)
      : t === 'style'
      ? bh(e, n, r)
      : mr(t)
      ? Qi(t) || Th(e, t, n, r, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : Mh(e, t, r, s)
        )
      ? Ih(e, t, r, i, o, a, c)
      : (t === 'true-value'
          ? (e._trueValue = r)
          : t === 'false-value' && (e._falseValue = r),
        Eh(e, t, r, s));
  };
function Mh(e, t, n, r) {
  return r
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && ha.test(t) && Z(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (ha.test(t) && pe(n))
    ? !1
    : t in e;
}
const vt = 'transition',
  Un = 'animation',
  Rs = (e, { slots: t }) => De(dl, Lh(e), t);
Rs.displayName = 'Transition';
const Dl = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Rs.props = we({}, dl.props, Dl);
const Bt = (e, t = []) => {
    q(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  pa = (e) => (e ? (q(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Lh(e) {
  const t = {};
  for (const D in e) D in Dl || (t[D] = e[D]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: s,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: l = o,
      appearToClass: u = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: g = `${n}-leave-to`,
    } = e,
    m = $h(s),
    E = m && m[0],
    R = m && m[1],
    {
      onBeforeEnter: y,
      onEnter: p,
      onEnterCancelled: v,
      onLeave: I,
      onLeaveCancelled: O,
      onBeforeAppear: L = y,
      onAppear: x = p,
      onAppearCancelled: k = v,
    } = t,
    H = (D, Y, j) => {
      Ht(D, Y ? u : a), Ht(D, Y ? l : o), j && j();
    },
    U = (D, Y) => {
      (D._isLeaving = !1), Ht(D, f), Ht(D, g), Ht(D, d), Y && Y();
    },
    K = (D) => (Y, j) => {
      const Ie = D ? x : p,
        ee = () => H(Y, D, j);
      Bt(Ie, [Y, ee]),
        ga(() => {
          Ht(Y, D ? c : i), bt(Y, D ? u : a), pa(Ie) || ma(Y, r, E, ee);
        });
    };
  return we(t, {
    onBeforeEnter(D) {
      Bt(y, [D]), bt(D, i), bt(D, o);
    },
    onBeforeAppear(D) {
      Bt(L, [D]), bt(D, c), bt(D, l);
    },
    onEnter: K(!1),
    onAppear: K(!0),
    onLeave(D, Y) {
      D._isLeaving = !0;
      const j = () => U(D, Y);
      bt(D, f),
        Dh(),
        bt(D, d),
        ga(() => {
          !D._isLeaving || (Ht(D, f), bt(D, g), pa(I) || ma(D, r, R, j));
        }),
        Bt(I, [D, j]);
    },
    onEnterCancelled(D) {
      H(D, !1), Bt(v, [D]);
    },
    onAppearCancelled(D) {
      H(D, !0), Bt(k, [D]);
    },
    onLeaveCancelled(D) {
      U(D), Bt(O, [D]);
    },
  });
}
function $h(e) {
  if (e == null) return null;
  if (fe(e)) return [Gs(e.enter), Gs(e.leave)];
  {
    const t = Gs(e);
    return [t, t];
  }
}
function Gs(e) {
  return vn(e);
}
function bt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Ht(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function ga(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let xh = 0;
function ma(e, t, n, r) {
  const s = (e._endId = ++xh),
    i = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: o, timeout: a, propCount: c } = Nh(e, t);
  if (!o) return r();
  const l = o + 'end';
  let u = 0;
  const f = () => {
      e.removeEventListener(l, d), i();
    },
    d = (g) => {
      g.target === e && ++u >= c && f();
    };
  setTimeout(() => {
    u < c && f();
  }, a + 1),
    e.addEventListener(l, d);
}
function Nh(e, t) {
  const n = window.getComputedStyle(e),
    r = (m) => (n[m] || '').split(', '),
    s = r(`${vt}Delay`),
    i = r(`${vt}Duration`),
    o = _a(s, i),
    a = r(`${Un}Delay`),
    c = r(`${Un}Duration`),
    l = _a(a, c);
  let u = null,
    f = 0,
    d = 0;
  t === vt
    ? o > 0 && ((u = vt), (f = o), (d = i.length))
    : t === Un
    ? l > 0 && ((u = Un), (f = l), (d = c.length))
    : ((f = Math.max(o, l)),
      (u = f > 0 ? (o > l ? vt : Un) : null),
      (d = u ? (u === vt ? i.length : c.length) : 0));
  const g =
    u === vt && /\b(transform|all)(,|$)/.test(r(`${vt}Property`).toString());
  return { type: u, timeout: f, propCount: d, hasTransform: g };
}
function _a(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => ya(n) + ya(e[r])));
}
function ya(e) {
  return Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Dh() {
  return document.body.offsetHeight;
}
const va = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1;
  return q(t) ? (n) => un(t, n) : t;
};
function Bh(e) {
  e.target.composing = !0;
}
function ba(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const EE = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e._assign = va(s);
      const i = r || (s.props && s.props.type === 'number');
      sn(e, t ? 'change' : 'input', (o) => {
        if (o.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), i && (a = vn(a)), e._assign(a);
      }),
        n &&
          sn(e, 'change', () => {
            e.value = e.value.trim();
          }),
        t ||
          (sn(e, 'compositionstart', Bh),
          sn(e, 'compositionend', ba),
          sn(e, 'change', ba));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? '' : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      i
    ) {
      if (
        ((e._assign = va(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== 'range' &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === 'number') && vn(e.value) === t))))
      )
        return;
      const o = t == null ? '' : t;
      e.value !== o && (e.value = o);
    },
  },
  IE = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : jn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), jn(e, !0), r.enter(e))
            : r.leave(e, () => {
                jn(e, !1);
              })
          : jn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      jn(e, t);
    },
  };
function jn(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const Bl = we({ patchProp: Oh }, yh);
let Xn,
  wa = !1;
function Hh() {
  return Xn || (Xn = th(Bl));
}
function Uh() {
  return (Xn = wa ? Xn : nh(Bl)), (wa = !0), Xn;
}
const Pi = (...e) => {
    const t = Hh().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Hl(r);
        if (!s) return;
        const i = t._component;
        !Z(i) && !i.render && !i.template && (i.template = s.innerHTML),
          (s.innerHTML = '');
        const o = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
          o
        );
      }),
      t
    );
  },
  jh = (...e) => {
    const t = Uh().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Hl(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function Hl(e) {
  return pe(e) ? document.querySelector(e) : e;
}
const Fh =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Wh =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  zh = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Vh(e, t) {
  if (
    e !== '__proto__' &&
    !(e === 'constructor' && t && typeof t == 'object' && 'prototype' in t)
  )
    return t;
}
function Kh(e, t = {}) {
  if (typeof e != 'string') return e;
  const n = e.toLowerCase().trim();
  if (n === 'true') return !0;
  if (n === 'false') return !1;
  if (n === 'null') return null;
  if (n === 'nan') return Number.NaN;
  if (n === 'infinity') return Number.POSITIVE_INFINITY;
  if (n !== 'undefined') {
    if (!zh.test(e)) {
      if (t.strict) throw new SyntaxError('Invalid JSON');
      return e;
    }
    try {
      return Fh.test(e) || Wh.test(e) ? JSON.parse(e, Vh) : JSON.parse(e);
    } catch (r) {
      if (t.strict) throw r;
      return e;
    }
  }
}
const qh = /#/g,
  Gh = /&/g,
  Jh = /=/g,
  Ul = /\+/g,
  Zh = /%5b/gi,
  Yh = /%5d/gi,
  Xh = /%5e/gi,
  Qh = /%60/gi,
  ep = /%7b/gi,
  tp = /%7c/gi,
  np = /%7d/gi,
  rp = /%20/gi;
function sp(e) {
  return encodeURI('' + e)
    .replace(tp, '|')
    .replace(Zh, '[')
    .replace(Yh, ']');
}
function Oi(e) {
  return sp(e)
    .replace(Ul, '%2B')
    .replace(rp, '+')
    .replace(qh, '%23')
    .replace(Gh, '%26')
    .replace(Qh, '`')
    .replace(ep, '{')
    .replace(np, '}')
    .replace(Xh, '^');
}
function Js(e) {
  return Oi(e).replace(Jh, '%3D');
}
function jl(e = '') {
  try {
    return decodeURIComponent('' + e);
  } catch {
    return '' + e;
  }
}
function ip(e) {
  return jl(e.replace(Ul, ' '));
}
function op(e = '') {
  const t = {};
  e[0] === '?' && (e = e.slice(1));
  for (const n of e.split('&')) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const s = jl(r[1]);
    if (s === '__proto__' || s === 'constructor') continue;
    const i = ip(r[2] || '');
    typeof t[s] < 'u'
      ? Array.isArray(t[s])
        ? t[s].push(i)
        : (t[s] = [t[s], i])
      : (t[s] = i);
  }
  return t;
}
function ap(e, t) {
  return (
    (typeof t == 'number' || typeof t == 'boolean') && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map((n) => `${Js(e)}=${Oi(n)}`).join('&')
        : `${Js(e)}=${Oi(t)}`
      : Js(e)
  );
}
function cp(e) {
  return Object.keys(e)
    .filter((t) => e[t] !== void 0)
    .map((t) => ap(t, e[t]))
    .join('&');
}
const lp = /^\w{2,}:(\/\/)?/,
  up = /^\/\/[^/]+/;
function Ps(e, t = !1) {
  return lp.test(e) || (t && up.test(e));
}
const fp = /\/$|\/\?/;
function Mi(e = '', t = !1) {
  return t ? fp.test(e) : e.endsWith('/');
}
function Fl(e = '', t = !1) {
  if (!t) return (Mi(e) ? e.slice(0, -1) : e) || '/';
  if (!Mi(e, !0)) return e || '/';
  const [n, ...r] = e.split('?');
  return (n.slice(0, -1) || '/') + (r.length > 0 ? `?${r.join('?')}` : '');
}
function dp(e = '', t = !1) {
  if (!t) return e.endsWith('/') ? e : e + '/';
  if (Mi(e, !0)) return e || '/';
  const [n, ...r] = e.split('?');
  return n + '/' + (r.length > 0 ? `?${r.join('?')}` : '');
}
function hp(e = '') {
  return e.startsWith('/');
}
function pp(e = '') {
  return (hp(e) ? e.slice(1) : e) || '/';
}
function gp(e, t) {
  if (Wl(t) || Ps(e)) return e;
  const n = Fl(t);
  return e.startsWith(n) ? e : Os(n, e);
}
function Ea(e, t) {
  if (Wl(t)) return e;
  const n = Fl(t);
  if (!e.startsWith(n)) return e;
  const r = e.slice(n.length);
  return r[0] === '/' ? r : '/' + r;
}
function mp(e, t) {
  const n = Ms(e),
    r = { ...op(n.search), ...t };
  return (n.search = cp(r)), yp(n);
}
function Wl(e) {
  return !e || e === '/';
}
function _p(e) {
  return e && e !== '/';
}
function Os(e, ...t) {
  let n = e || '';
  for (const r of t.filter((s) => _p(s))) n = n ? dp(n) + pp(r) : r;
  return n;
}
function Ms(e = '', t) {
  if (!Ps(e, !0)) return t ? Ms(t + e) : Ia(e);
  const [n = '', r, s = ''] = (
      e.replace(/\\/g, '/').match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
    ).splice(1),
    [i = '', o = ''] = (s.match(/([^#/?]*)(.*)?/) || []).splice(1),
    { pathname: a, search: c, hash: l } = Ia(o.replace(/\/(?=[A-Za-z]:)/, ''));
  return {
    protocol: n,
    auth: r ? r.slice(0, Math.max(0, r.length - 1)) : '',
    host: i,
    pathname: a,
    search: c,
    hash: l,
  };
}
function Ia(e = '') {
  const [t = '', n = '', r = ''] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: n, hash: r };
}
function yp(e) {
  const t =
    e.pathname +
    (e.search ? (e.search.startsWith('?') ? '' : '?') + e.search : '') +
    e.hash;
  return e.protocol
    ? e.protocol + '//' + (e.auth ? e.auth + '@' : '') + e.host + t
    : t;
}
class vp extends Error {
  constructor() {
    super(...arguments), (this.name = 'FetchError');
  }
}
function bp(e, t, n) {
  let r = '';
  e && n && (r = `${n.status} ${n.statusText} (${e.toString()})`),
    t && (r = `${t.message} (${r})`);
  const s = new vp(r);
  return (
    Object.defineProperty(s, 'request', {
      get() {
        return e;
      },
    }),
    Object.defineProperty(s, 'response', {
      get() {
        return n;
      },
    }),
    Object.defineProperty(s, 'data', {
      get() {
        return n && n._data;
      },
    }),
    Object.defineProperty(s, 'status', {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(s, 'statusText', {
      get() {
        return n && n.statusText;
      },
    }),
    Object.defineProperty(s, 'statusCode', {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(s, 'statusMessage', {
      get() {
        return n && n.statusText;
      },
    }),
    s
  );
}
const wp = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));
function Ca(e = 'GET') {
  return wp.has(e.toUpperCase());
}
function Ep(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === 'string' || t === 'number' || t === 'boolean' || t === null
    ? !0
    : t !== 'object'
    ? !1
    : Array.isArray(e)
    ? !0
    : (e.constructor && e.constructor.name === 'Object') ||
      typeof e.toJSON == 'function';
}
const Ip = new Set([
    'image/svg',
    'application/xml',
    'application/xhtml',
    'application/html',
  ]),
  Cp = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Tp(e = '') {
  if (!e) return 'json';
  const t = e.split(';').shift();
  return Cp.test(t)
    ? 'json'
    : Ip.has(t) || t.startsWith('text/')
    ? 'text'
    : 'blob';
}
const kp = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function zl(e) {
  const { fetch: t, Headers: n } = e;
  function r(o) {
    const a = (o.error && o.error.name === 'AbortError') || !1;
    if (o.options.retry !== !1 && !a) {
      const l =
          typeof o.options.retry == 'number'
            ? o.options.retry
            : Ca(o.options.method)
            ? 0
            : 1,
        u = (o.response && o.response.status) || 500;
      if (l > 0 && kp.has(u))
        return s(o.request, { ...o.options, retry: l - 1 });
    }
    const c = bp(o.request, o.error, o.response);
    throw (Error.captureStackTrace && Error.captureStackTrace(c, s), c);
  }
  const s = async function (a, c = {}) {
      const l = {
        request: a,
        options: { ...e.defaults, ...c },
        response: void 0,
        error: void 0,
      };
      l.options.onRequest && (await l.options.onRequest(l)),
        typeof l.request == 'string' &&
          (l.options.baseURL && (l.request = gp(l.request, l.options.baseURL)),
          (l.options.query || l.options.params) &&
            (l.request = mp(l.request, {
              ...l.options.params,
              ...l.options.query,
            })),
          l.options.body &&
            Ca(l.options.method) &&
            Ep(l.options.body) &&
            ((l.options.body =
              typeof l.options.body == 'string'
                ? l.options.body
                : JSON.stringify(l.options.body)),
            (l.options.headers = new n(l.options.headers)),
            l.options.headers.has('content-type') ||
              l.options.headers.set('content-type', 'application/json'),
            l.options.headers.has('accept') ||
              l.options.headers.set('accept', 'application/json'))),
        (l.response = await t(l.request, l.options).catch(
          async (f) => (
            (l.error = f),
            l.options.onRequestError && (await l.options.onRequestError(l)),
            r(l)
          )
        ));
      const u =
        (l.options.parseResponse ? 'json' : l.options.responseType) ||
        Tp(l.response.headers.get('content-type') || '');
      if (u === 'json') {
        const f = await l.response.text(),
          d = l.options.parseResponse || Kh;
        l.response._data = d(f);
      } else
        u === 'stream'
          ? (l.response._data = l.response.body)
          : (l.response._data = await l.response[u]());
      return (
        l.options.onResponse && (await l.options.onResponse(l)),
        l.response.status >= 400 && l.response.status < 600
          ? (l.options.onResponseError && (await l.options.onResponseError(l)),
            r(l))
          : l.response
      );
    },
    i = function (a, c) {
      return s(a, c).then((l) => l._data);
    };
  return (
    (i.raw = s),
    (i.native = t),
    (i.create = (o = {}) => zl({ ...e, defaults: { ...e.defaults, ...o } })),
    i
  );
}
const Vl = (function () {
    if (typeof globalThis < 'u') return globalThis;
    if (typeof self < 'u') return self;
    if (typeof window < 'u') return window;
    if (typeof global < 'u') return global;
    throw new Error('unable to locate global object');
  })(),
  Sp =
    Vl.fetch ||
    (() =>
      Promise.reject(new Error('[ofetch] global.fetch is not supported!'))),
  Ap = Vl.Headers,
  Rp = zl({ fetch: Sp, Headers: Ap }),
  Pp = Rp,
  Op = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  is = Op().app,
  Mp = () => is.baseURL,
  Lp = () => is.buildAssetsDir,
  $p = (...e) => Os(Kl(), Lp(), ...e),
  Kl = (...e) => {
    const t = is.cdnURL || is.baseURL;
    return e.length ? Os(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = $p), (globalThis.__publicAssetsURL = Kl);
function Li(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      i = n ? `${n}:${r}` : r;
    typeof s == 'object' && s !== null
      ? Li(s, t, i)
      : typeof s == 'function' && (t[i] = s);
  }
  return t;
}
function xp(e, t) {
  return e.reduce(
    (n, r) => n.then(() => r.apply(void 0, t)),
    Promise.resolve()
  );
}
function Np(e, t) {
  return Promise.all(e.map((n) => n.apply(void 0, t)));
}
function Zs(e, t) {
  for (const n of e) n(t);
}
class Dp {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != 'function') return () => {};
    const s = t;
    let i;
    for (; this._deprecatedHooks[t]; )
      (i = this._deprecatedHooks[t]), (t = i.to);
    if (i && !r.allowDeprecated) {
      let o = i.message;
      o ||
        (o =
          `${s} hook has been deprecated` +
          (i.to ? `, please use ${i.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(o) ||
          (console.warn(o), this._deprecatedMessages.add(o));
    }
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...i) => (
        typeof r == 'function' && r(), (r = void 0), (s = void 0), n(...i)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == 'string' ? { to: n } : n;
    const r = this._hooks[t] || [];
    this._hooks[t] = void 0;
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = Li(t),
      r = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = Li(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  callHook(t, ...n) {
    return this.callHookWith(xp, t, ...n);
  }
  callHookParallel(t, ...n) {
    return this.callHookWith(Np, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Zs(this._before, s);
    const i = t(this._hooks[n] || [], r);
    return i instanceof Promise
      ? i.finally(() => {
          this._after && s && Zs(this._after, s);
        })
      : (this._after && s && Zs(this._after, s), i);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    );
  }
}
function ql() {
  return new Dp();
}
function Bp() {
  let e,
    t = !1;
  const n = (r) => {
    if (e && e !== r) throw new Error('Context conflict');
  };
  return {
    use: () => {
      if (e === void 0) throw new Error('Context is not available');
      return e;
    },
    tryUse: () => e,
    set: (r, s) => {
      s || n(r), (e = r), (t = !0);
    },
    unset: () => {
      (e = void 0), (t = !1);
    },
    call: (r, s) => {
      n(r), (e = r);
      try {
        return s();
      } finally {
        t || (e = void 0);
      }
    },
    async callAsync(r, s) {
      e = r;
      const i = () => {
          e = r;
        },
        o = () => (e === r ? i : void 0);
      $i.add(o);
      try {
        const a = s();
        return t || (e = void 0), await a;
      } finally {
        $i.delete(o);
      }
    },
  };
}
function Hp() {
  const e = {};
  return {
    get(t) {
      return e[t] || (e[t] = Bp()), e[t], e[t];
    },
  };
}
const os =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof global < 'u'
      ? global
      : typeof window < 'u'
      ? window
      : {},
  Ta = '__unctx__',
  Up = os[Ta] || (os[Ta] = Hp()),
  jp = (e) => Up.get(e),
  ka = '__unctx_async_handlers__',
  $i = os[ka] || (os[ka] = new Set());
function Gl(e) {
  const t = [];
  for (const s of $i) {
    const i = s();
    i && t.push(i);
  }
  const n = () => {
    for (const s of t) s();
  };
  let r = e();
  return (
    r &&
      typeof r == 'object' &&
      'catch' in r &&
      (r = r.catch((s) => {
        throw (n(), s);
      })),
    [r, n]
  );
}
const Jl = jp('nuxt-app'),
  Fp = '__nuxt_plugin';
function Wp(e) {
  let t = 0;
  const n = {
    provide: void 0,
    globalName: 'nuxt',
    payload: it({ data: {}, state: {}, _errors: {}, ...window.__NUXT__ }),
    static: { data: {} },
    isHydrating: !0,
    deferHydration() {
      if (!n.isHydrating) return () => {};
      t++;
      let i = !1;
      return () => {
        if (!i && ((i = !0), t--, t === 0))
          return (n.isHydrating = !1), n.callHook('app:suspense:resolve');
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...e,
  };
  (n.hooks = ql()),
    (n.hook = n.hooks.hook),
    (n.callHook = n.hooks.callHook),
    (n.provide = (i, o) => {
      const a = '$' + i;
      Br(n, a, o), Br(n.vueApp.config.globalProperties, a, o);
    }),
    Br(n.vueApp, '$nuxt', n),
    Br(n.vueApp.config.globalProperties, '$nuxt', n);
  const r = it(n.payload.config),
    s = new Proxy(r, {
      get(i, o) {
        var a;
        return o === 'public' ? i.public : (a = i[o]) != null ? a : i.public[o];
      },
      set(i, o, a) {
        return o === 'public' || o === 'app'
          ? !1
          : ((i[o] = a), (i.public[o] = a), !0);
      },
    });
  return n.provide('config', s), n;
}
async function zp(e, t) {
  if (typeof t != 'function') return;
  const { provide: n } = (await Ct(e, t, [e])) || {};
  if (n && typeof n == 'object') for (const r in n) e.provide(r, n[r]);
}
async function Vp(e, t) {
  for (const n of t) await zp(e, n);
}
function Kp(e) {
  return e
    .map((n) =>
      typeof n != 'function' ? null : n.length > 1 ? (r) => n(r, r.provide) : n
    )
    .filter(Boolean);
}
function Dn(e) {
  return (e[Fp] = !0), e;
}
function Ct(e, t, n) {
  const r = () => (n ? t(...n) : t());
  return Jl.set(e), r();
}
function Ee() {
  const e = Jl.tryUse();
  if (!e) {
    const t = Nn();
    if (!t) throw new Error('nuxt instance unavailable');
    return t.appContext.app.$nuxt;
  }
  return e;
}
function Zl() {
  return Ee().$config;
}
function Br(e, t, n) {
  Object.defineProperty(e, t, { get: () => n });
}
class xi extends Error {
  constructor() {
    super(...arguments),
      (this.statusCode = 500),
      (this.fatal = !1),
      (this.unhandled = !1),
      (this.statusMessage = void 0);
  }
  toJSON() {
    const t = { message: this.message, statusCode: this.statusCode };
    return (
      this.statusMessage && (t.statusMessage = this.statusMessage),
      this.data !== void 0 && (t.data = this.data),
      t
    );
  }
}
xi.__h3_error__ = !0;
function Ni(e) {
  var n;
  if (typeof e == 'string') return new xi(e);
  if (qp(e)) return e;
  const t = new xi(
    (n = e.message) != null ? n : e.statusMessage,
    e.cause ? { cause: e.cause } : void 0
  );
  if ('stack' in e)
    try {
      Object.defineProperty(t, 'stack', {
        get() {
          return e.stack;
        },
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  return (
    e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = e.statusCode)
      : e.status && (t.statusCode = e.status),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function qp(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const Ls = () => tl(Ee().payload, 'error'),
  Vn = (e) => {
    const t = Yl(e);
    try {
      Ee().callHook('app:error', t);
      const r = Ls();
      r.value = r.value || t;
    } catch {
      throw t;
    }
    return t;
  },
  Gp = async (e = {}) => {
    const t = Ee(),
      n = Ls();
    t.callHook('app:error:cleared', e),
      e.redirect && (await t.$router.replace(e.redirect)),
      (n.value = null);
  },
  Jp = (e) => !!(e && typeof e == 'object' && '__nuxt_error' in e),
  Yl = (e) => {
    const t = Ni(e);
    return (t.__nuxt_error = !0), t;
  };
function Zp(...e) {
  const t = typeof e[e.length - 1] == 'string' ? e.pop() : void 0;
  typeof e[0] != 'string' && e.unshift(t);
  const [n, r] = e;
  if (!n || typeof n != 'string')
    throw new TypeError('[nuxt] [useState] key must be a string: ' + n);
  if (r !== void 0 && typeof r != 'function')
    throw new Error('[nuxt] [useState] init must be a function: ' + r);
  const s = '$s' + n,
    i = Ee(),
    o = tl(i.payload.state, s);
  if (o.value === void 0 && r) {
    const a = r();
    if (_e(a)) return (i.payload.state[s] = a), a;
    o.value = a;
  }
  return o;
}
const $s = () => {
    var e;
    return (e = Ee()) == null ? void 0 : e.$router;
  },
  Xl = () => (Nn() ? Ne('_route', Ee()._route) : Ee()._route),
  Yp = (e) => e,
  Xp = () => {
    try {
      if (Ee()._processingMiddleware) return !0;
    } catch {
      return !0;
    }
    return !1;
  },
  Qp = (e, t) => {
    e || (e = '/');
    const n = typeof e == 'string' ? e : e.path || '/',
      r = Ps(n, !0);
    if (r && !(t != null && t.external))
      throw new Error(
        'Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.'
      );
    if (r && Ms(n).protocol === 'script:')
      throw new Error('Cannot navigate to an URL with script protocol.');
    if (!r && Xp()) return e;
    const s = $s();
    return r
      ? (t != null && t.replace ? location.replace(n) : (location.href = n),
        Promise.resolve())
      : t != null && t.replace
      ? s.replace(e)
      : s.push(e);
  };
function eg(e, t) {
  return Ee()._useHead(e, t);
}
async function Ql(e, t = $s()) {
  if (
    (t._routePreloaded || (t._routePreloaded = new Set()),
    t._routePreloaded.has(e))
  )
    return;
  t._routePreloaded.add(e);
  const n = (t._preloadPromises = t._preloadPromises || []);
  if (n.length > 4) return Promise.all(n).then(() => Ql(e, t));
  const r = t
    .resolve(e)
    .matched.map((s) => {
      var i;
      return (i = s.components) == null ? void 0 : i.default;
    })
    .filter((s) => typeof s == 'function');
  for (const s of r) {
    const i = Promise.resolve(s())
      .catch(() => {})
      .finally(() => n.splice(n.indexOf(i)));
    n.push(i);
  }
  await Promise.all(n);
}
const tg = 'modulepreload',
  ng = function (e, t) {
    return e.startsWith('.') ? new URL(e, t).href : e;
  },
  Sa = {},
  kn = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      n.map((i) => {
        if (((i = ng(i, r)), i in Sa)) return;
        Sa[i] = !0;
        const o = i.endsWith('.css'),
          a = o ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let u = s.length - 1; u >= 0; u--) {
            const f = s[u];
            if (f.href === i && (!o || f.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${i}"]${a}`)) return;
        const l = document.createElement('link');
        if (
          ((l.rel = o ? 'stylesheet' : tg),
          o || ((l.as = 'script'), (l.crossOrigin = '')),
          (l.href = i),
          document.head.appendChild(l),
          o)
        )
          return new Promise((u, f) => {
            l.addEventListener('load', u),
              l.addEventListener('error', () =>
                f(new Error(`Unable to preload CSS for ${i}`))
              );
          });
      })
    ).then(() => t());
  };
function Aa(e, t = {}) {
  const n = rg(e, t),
    r = Ee(),
    s = (r._payloadCache = r._payloadCache || {});
  return s[e] || (s[e] = sg(n).then((i) => i || (delete s[e], null))), s[e];
}
function rg(e, t = {}) {
  const n = new URL(e, 'http://localhost');
  if (n.search)
    throw new Error('Payload URL cannot contain search params: ' + e);
  if (n.host !== 'localhost')
    throw new Error('Payload URL cannot contain host: ' + e);
  const r = t.hash || (t.fresh ? Date.now() : '');
  return Os(
    Zl().app.baseURL,
    n.pathname,
    r ? `_payload.${r}.js` : '_payload.js'
  );
}
async function sg(e) {
  const t = await kn(() => import(e), [], import.meta.url).catch((n) => {
    console.warn('[nuxt] Cannot load payload ', e, n);
  });
  return (t == null ? void 0 : t.default) || null;
}
function ig() {
  return !!Ee().payload.prerenderedAt;
}
const og = (...e) => e.find((t) => t !== void 0),
  ag = 'noopener noreferrer',
  cg =
    globalThis.requestIdleCallback ||
    ((e) => {
      const t = Date.now(),
        n = {
          didTimeout: !1,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - t)),
        };
      return setTimeout(() => {
        e(n);
      }, 1);
    }),
  lg =
    globalThis.cancelIdleCallback ||
    ((e) => {
      clearTimeout(e);
    });
function ug(e) {
  const t = e.componentName || 'NuxtLink';
  return gt({
    name: t,
    props: {
      to: { type: [String, Object], default: void 0, required: !1 },
      href: { type: [String, Object], default: void 0, required: !1 },
      target: { type: String, default: void 0, required: !1 },
      rel: { type: String, default: void 0, required: !1 },
      noRel: { type: Boolean, default: void 0, required: !1 },
      prefetch: { type: Boolean, default: void 0, required: !1 },
      noPrefetch: { type: Boolean, default: void 0, required: !1 },
      activeClass: { type: String, default: void 0, required: !1 },
      exactActiveClass: { type: String, default: void 0, required: !1 },
      prefetchedClass: { type: String, default: void 0, required: !1 },
      replace: { type: Boolean, default: void 0, required: !1 },
      ariaCurrentValue: { type: String, default: void 0, required: !1 },
      external: { type: Boolean, default: void 0, required: !1 },
      custom: { type: Boolean, default: void 0, required: !1 },
    },
    setup(n, { slots: r }) {
      const s = $s(),
        i = ve(() => n.to || n.href || ''),
        o = ve(() =>
          n.external || (n.target && n.target !== '_self')
            ? !0
            : typeof i.value == 'object'
            ? !1
            : i.value === '' || Ps(i.value, !0)
        ),
        a = qt(!1),
        c = qt(null);
      if (
        n.prefetch !== !1 &&
        n.noPrefetch !== !0 &&
        typeof i.value == 'string' &&
        n.target !== '_blank' &&
        !dg()
      ) {
        const u = Ee(),
          f = fg();
        let d,
          g = null;
        ks(() => {
          d = cg(() => {
            var m;
            (m = c == null ? void 0 : c.value) != null &&
              m.tagName &&
              (g = f.observe(c.value, async () => {
                g == null || g(),
                  (g = null),
                  await Promise.all([
                    u.hooks.callHook('link:prefetch', i.value).catch(() => {}),
                    !o.value && Ql(i.value, s).catch(() => {}),
                  ]),
                  (a.value = !0);
              }));
          });
        }),
          yr(() => {
            d && lg(d), g == null || g(), (g = null);
          });
      }
      return () => {
        var g, m, E;
        if (!o.value)
          return De(
            Dd('RouterLink'),
            {
              ref: (R) => {
                c.value = R == null ? void 0 : R.$el;
              },
              to: i.value,
              ...(a.value && !n.custom
                ? { class: n.prefetchedClass || e.prefetchedClass }
                : {}),
              activeClass: n.activeClass || e.activeClass,
              exactActiveClass: n.exactActiveClass || e.exactActiveClass,
              replace: n.replace,
              ariaCurrentValue: n.ariaCurrentValue,
              custom: n.custom,
            },
            r.default
          );
        const l =
            typeof i.value == 'object'
              ? (m = (g = s.resolve(i.value)) == null ? void 0 : g.href) != null
                ? m
                : null
              : i.value || null,
          u = n.target || null,
          f = n.noRel
            ? null
            : og(n.rel, e.externalRelAttribute, l ? ag : '') || null,
          d = () => Qp(l, { replace: n.replace });
        return n.custom
          ? r.default
            ? r.default({
                href: l,
                navigate: d,
                route: s.resolve(l),
                rel: f,
                target: u,
                isExternal: o.value,
                isActive: !1,
                isExactActive: !1,
              })
            : null
          : De(
              'a',
              { ref: c, href: l, rel: f, target: u },
              (E = r.default) == null ? void 0 : E.call(r)
            );
      };
    },
  });
}
const CE = ug({ componentName: 'NuxtLink' });
function fg() {
  const e = Ee();
  if (e._observer) return e._observer;
  let t = null;
  const n = new Map(),
    r = (i, o) => (
      t ||
        (t = new IntersectionObserver((a) => {
          for (const c of a) {
            const l = n.get(c.target);
            (c.isIntersecting || c.intersectionRatio > 0) && l && l();
          }
        })),
      n.set(i, o),
      t.observe(i),
      () => {
        n.delete(i),
          t.unobserve(i),
          n.size === 0 && (t.disconnect(), (t = null));
      }
    );
  return (e._observer = { observe: r });
}
function dg() {
  const e = navigator.connection;
  return !!(e && (e.saveData || /2g/.test(e.effectiveType)));
}
function Ys(e) {
  return e !== null && typeof e == 'object';
}
function Di(e, t, n = '.', r) {
  if (!Ys(t)) return Di(e, {}, n, r);
  const s = Object.assign({}, t);
  for (const i in e) {
    if (i === '__proto__' || i === 'constructor') continue;
    const o = e[i];
    o != null &&
      ((r && r(s, i, o, n)) ||
        (Array.isArray(o) && Array.isArray(s[i])
          ? (s[i] = [...o, ...s[i]])
          : Ys(o) && Ys(s[i])
          ? (s[i] = Di(o, s[i], (n ? `${n}.` : '') + i.toString(), r))
          : (s[i] = o)));
  }
  return s;
}
function eu(e) {
  return (...t) => t.reduce((n, r) => Di(n, r, '', e), {});
}
const hg = eu(),
  pg = eu((e, t, n, r) => {
    if (typeof e[t] < 'u' && typeof n == 'function')
      return (e[t] = n(e[t])), !0;
  }),
  gg = {};
pg(gg);
const Xs = {},
  mg = Dn((e) => {
    for (const t in Xs)
      e.vueApp.component(t, Xs[t]), e.vueApp.component('Lazy' + t, Xs[t]);
  }),
  _g = ['script', 'style', 'noscript'],
  yg = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
  vg = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function bg(e, t) {
  const { props: n, tag: r } = e;
  if (vg.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const s = ['id'];
  r === 'meta' && s.push('name', 'property', 'http-equiv');
  for (const i of s)
    if (typeof n[i] < 'u') {
      const o = String(n[i]);
      return t && !t(o) ? !1 : `${r}:${i}:${o}`;
    }
  return !1;
}
const Hr = (e, t) => {
  const { tag: n, $el: r } = e;
  !r ||
    (Object.entries(n.props).forEach(([s, i]) => {
      i = String(i);
      const o = `attr:${s}`;
      if (s === 'class') {
        if (!i) return;
        for (const a of i.split(' ')) {
          const c = `${o}:${a}`;
          t && t(e, c, () => r.classList.remove(a)),
            r.classList.contains(a) || r.classList.add(a);
        }
        return;
      }
      t && !s.startsWith('data-h-') && t(e, o, () => r.removeAttribute(s)),
        r.getAttribute(s) !== i && r.setAttribute(s, i);
    }),
    _g.includes(n.tag) &&
      r.innerHTML !== (n.children || '') &&
      (r.innerHTML = n.children || ''));
};
function bo(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function tu(e, t = {}) {
  var u, f;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook('dom:beforeRender', n), !n.shouldRender)) return;
  const r = t.document || window.document,
    s = e._popSideEffectQueue();
  e.headEntries()
    .map((d) => d._sde)
    .forEach((d) => {
      Object.entries(d).forEach(([g, m]) => {
        s[g] = m;
      });
    });
  const i = async (d) => {
      const g = e.headEntries().find((E) => E._i === d._e),
        m = {
          renderId:
            d._d || bo(JSON.stringify({ ...d, _e: void 0, _p: void 0 })),
          $el: null,
          shouldRender: !0,
          tag: d,
          entry: g,
          staleSideEffects: s,
        };
      return await e.hooks.callHook('dom:beforeRenderTag', m), m;
    },
    o = [],
    a = { body: [], head: [] },
    c = (d, g, m) => {
      (g = `${d.renderId}:${g}`), d.entry && (d.entry._sde[g] = m), delete s[g];
    },
    l = (d) => {
      (e._elMap[d.renderId] = d.$el),
        o.push(d),
        c(d, 'el', () => {
          var g;
          (g = d.$el) == null || g.remove(), delete e._elMap[d.renderId];
        });
    };
  for (const d of await e.resolveTags()) {
    const g = await i(d);
    if (!g.shouldRender) continue;
    const { tag: m } = g;
    if (m.tag === 'title') {
      (r.title = m.children || ''), o.push(g);
      continue;
    }
    if (m.tag === 'htmlAttrs' || m.tag === 'bodyAttrs') {
      (g.$el = r[m.tag === 'htmlAttrs' ? 'documentElement' : 'body']),
        Hr(g, c),
        o.push(g);
      continue;
    }
    if (
      ((g.$el = e._elMap[g.renderId]),
      !g.$el &&
        m._hash &&
        (g.$el = r.querySelector(
          `${
            (u = m.tagPosition) != null && u.startsWith('body')
              ? 'body'
              : 'head'
          } > ${m.tag}[data-h-${m._hash}]`
        )),
      g.$el)
    ) {
      g.tag._d && Hr(g), l(g);
      continue;
    }
    (g.$el = r.createElement(m.tag)),
      Hr(g),
      a[
        (f = m.tagPosition) != null && f.startsWith('body') ? 'body' : 'head'
      ].push(g);
  }
  Object.entries(a).forEach(([d, g]) => {
    if (!!g.length) {
      for (const m of [...r[d].children].reverse()) {
        const E = m.tagName.toLowerCase();
        if (!yg.includes(E)) continue;
        const R = bg({
            tag: E,
            props: m
              .getAttributeNames()
              .reduce((p, v) => ({ ...p, [v]: m.getAttribute(v) }), {}),
          }),
          y = g.findIndex((p) => p && (p.tag._d === R || m.isEqualNode(p.$el)));
        if (y !== -1) {
          const p = g[y];
          (p.$el = m), Hr(p), l(p), delete g[y];
        }
      }
      g.forEach((m) => {
        if (!!m.$el) {
          switch (m.tag.tagPosition) {
            case 'bodyClose':
              r.body.appendChild(m.$el);
              break;
            case 'bodyOpen':
              r.body.insertBefore(m.$el, r.body.firstChild);
              break;
            case 'head':
            default:
              r.head.appendChild(m.$el);
              break;
          }
          l(m);
        }
      });
    }
  });
  for (const d of o) await e.hooks.callHook('dom:renderTag', d);
  Object.values(s).forEach((d) => d());
}
let Kr = null;
async function wg(e, t = {}) {
  function n() {
    return (Kr = null), tu(e, t);
  }
  const r = t.delayFn || ((s) => setTimeout(s, 10));
  return (Kr = Kr || new Promise((s) => r(() => s(n()))));
}
const Eg = {
    __proto__: null,
    debouncedRenderDOMHead: wg,
    get domUpdatePromise() {
      return Kr;
    },
    hashCode: bo,
    renderDOMHead: tu,
  },
  Ig = [
    'title',
    'titleTemplate',
    'base',
    'htmlAttrs',
    'bodyAttrs',
    'meta',
    'link',
    'style',
    'script',
    'noscript',
  ],
  Cg = ['tagPosition', 'tagPriority', 'tagDuplicateStrategy'];
async function Tg(e, t) {
  const n = { tag: e, props: {} };
  return e === 'title' || e === 'titleTemplate'
    ? ((n.children = t instanceof Promise ? await t : t), n)
    : ((n.props = await kg({ ...t })),
      ['children', 'innerHtml', 'innerHTML'].forEach((r) => {
        typeof n.props[r] < 'u' &&
          ((n.children = n.props[r]),
          typeof n.children == 'object' &&
            (n.children = JSON.stringify(n.children)),
          delete n.props[r]);
      }),
      Object.keys(n.props)
        .filter((r) => Cg.includes(r))
        .forEach((r) => {
          (n[r] = n.props[r]), delete n.props[r];
        }),
      typeof n.props.class == 'object' &&
        !Array.isArray(n.props.class) &&
        (n.props.class = Object.keys(n.props.class).filter(
          (r) => n.props.class[r]
        )),
      Array.isArray(n.props.class) && (n.props.class = n.props.class.join(' ')),
      n.props.content && Array.isArray(n.props.content)
        ? n.props.content.map((r, s) => {
            const i = { ...n, props: { ...n.props } };
            return (
              (i.props.content = r),
              (i.key = `${n.props.name || n.props.property}:${s}`),
              i
            );
          })
        : n);
}
async function kg(e) {
  for (const t of Object.keys(e))
    e[t] instanceof Promise && (e[t] = await e[t]),
      String(e[t]) === 'true'
        ? (e[t] = '')
        : String(e[t]) === 'false' && delete e[t];
  return e;
}
const Ra = (e) => {
    if (typeof e.tagPriority == 'number') return e.tagPriority;
    switch (e.tagPriority) {
      case 'critical':
        return 2;
      case 'high':
        return 9;
      case 'low':
        return 12;
    }
    switch (e.tag) {
      case 'base':
        return -1;
      case 'title':
        return 1;
      case 'meta':
        return e.props.charset
          ? -2
          : e.props['http-equiv'] === 'content-security-policy'
          ? 0
          : 10;
      default:
        return 10;
    }
  },
  Sg = (e, t) => Ra(e) - Ra(t),
  Ag = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function Rg(e, t) {
  const { props: n, tag: r } = e;
  if (Ag.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const s = ['id'];
  r === 'meta' && s.push('name', 'property', 'http-equiv');
  for (const i of s)
    if (typeof n[i] < 'u') {
      const o = String(n[i]);
      return t && !t(o) ? !1 : `${r}:${i}:${o}`;
    }
  return !1;
}
const Pa = (e, t) =>
  e == null
    ? t || null
    : typeof e == 'function'
    ? e(t)
    : e.replace('%s', t != null ? t : '');
function Pg(e) {
  let t = e.findIndex((r) => r.tag === 'titleTemplate');
  const n = e.findIndex((r) => r.tag === 'title');
  if (n !== -1 && t !== -1) {
    const r = Pa(e[t].children, e[n].children);
    r !== null ? (e[n].children = r || e[n].children) : delete e[n];
  } else if (t !== -1) {
    const r = Pa(e[t].children);
    r !== null && ((e[t].children = r), (e[t].tag = 'title'), (t = -1));
  }
  return t !== -1 && delete e[t], e.filter(Boolean);
}
const Og = (e) => {
    e = e || {};
    const t = e.dedupeKeys || ['hid', 'vmid', 'key'];
    return {
      hooks: {
        'tag:normalise': function ({ tag: n }) {
          t.forEach((s) => {
            n.props[s] && ((n.key = n.props[s]), delete n.props[s]);
          });
          const r = n.key ? `${n.tag}:${n.key}` : Rg(n);
          r && (n._d = r);
        },
        'tags:resolve': function (n) {
          const r = {};
          n.tags.forEach((s) => {
            let i = s._d || s._p;
            const o = r[i];
            if (o) {
              let a = s == null ? void 0 : s.tagDuplicateStrategy;
              if (
                (!a &&
                  (s.tag === 'htmlAttrs' || s.tag === 'bodyAttrs') &&
                  (a = 'merge'),
                a === 'merge')
              ) {
                const l = o.props;
                ['class', 'style'].forEach((u) => {
                  s.props[u] &&
                    l[u] &&
                    (u === 'style' && !l[u].endsWith(';') && (l[u] += ';'),
                    (s.props[u] = `${l[u]} ${s.props[u]}`));
                }),
                  (r[i].props = { ...l, ...s.props });
                return;
              } else s._e === o._e && (i = s._d = `${i}:${s._p}`);
              const c = Object.keys(s.props).length;
              if (
                (c === 0 || (c === 1 && typeof s.props['data-h-key'] < 'u')) &&
                !s.children
              ) {
                delete r[i];
                return;
              }
            }
            r[i] = s;
          }),
            (n.tags = Object.values(r));
        },
      },
    };
  },
  Mg = () => ({
    hooks: {
      'tags:resolve': (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((s) => s._d === n)) == null ? void 0 : r._p;
        };
        for (const n of e.tags) {
          if (!n.tagPriority || typeof n.tagPriority == 'number') continue;
          const r = [
            { prefix: 'before:', offset: -1 },
            { prefix: 'after:', offset: 1 },
          ];
          for (const { prefix: s, offset: i } of r)
            if (n.tagPriority.startsWith(s)) {
              const o = n.tagPriority.replace(s, ''),
                a = t(o);
              typeof a < 'u' && (n._p = a + i);
            }
        }
        e.tags.sort((n, r) => n._p - r._p).sort(Sg);
      },
    },
  }),
  Lg = () => ({
    hooks: {
      'tags:resolve': (e) => {
        e.tags = Pg(e.tags);
      },
    },
  }),
  $g = () => ({
    hooks: {
      'tag:normalise': function ({ tag: e }) {
        typeof e.props.body < 'u' &&
          ((e.tagPosition = 'bodyClose'), delete e.props.body);
      },
    },
  }),
  xg = typeof window < 'u',
  Ng = () => ({
    hooks: {
      'tag:normalise': (e) => {
        var s, i;
        const { tag: t, entry: n } = e,
          r = typeof t.props._dynamic < 'u';
        !nu.includes(t.tag) ||
          !t.key ||
          ((t._hash = bo(JSON.stringify({ tag: t.tag, key: t.key }))),
          !(
            xg ||
            ((i = (s = su()) == null ? void 0 : s.resolvedOptions) == null
              ? void 0
              : i.document)
          ) &&
            (n._m === 'server' || r) &&
            (t.props[`data-h-${t._hash}`] = ''));
      },
      'tags:resolve': (e) => {
        e.tags = e.tags.map((t) => (delete t.props._dynamic, t));
      },
    },
  }),
  Dg = (e) => ({
    hooks: {
      'entries:updated': function (t) {
        if (
          typeof (e == null ? void 0 : e.document) > 'u' &&
          typeof window > 'u'
        )
          return;
        let n = e == null ? void 0 : e.delayFn;
        !n && typeof requestAnimationFrame < 'u' && (n = requestAnimationFrame),
          Promise.resolve()
            .then(function () {
              return Eg;
            })
            .then(({ debouncedRenderDOMHead: r }) => {
              r(t, {
                document: (e == null ? void 0 : e.document) || window.document,
                delayFn: n,
              });
            });
      },
    },
  }),
  Bg = () => {
    const e = (t, n) => {
      const r = {},
        s = {};
      Object.entries(n.props).forEach(([o, a]) => {
        o.startsWith('on') && typeof a == 'function' ? (s[o] = a) : (r[o] = a);
      });
      let i;
      return (
        t === 'dom' &&
          n.tag === 'script' &&
          typeof r.src == 'string' &&
          typeof s.onload < 'u' &&
          ((i = r.src), delete r.src),
        { props: r, eventHandlers: s, delayedSrc: i }
      );
    };
    return {
      hooks: {
        'ssr:render': function (t) {
          t.tags = t.tags.map((n) => ((n.props = e('ssr', n).props), n));
        },
        'dom:beforeRenderTag': function (t) {
          const { props: n, eventHandlers: r, delayedSrc: s } = e('dom', t.tag);
          !Object.keys(r).length ||
            ((t.tag.props = n),
            (t.tag._eventHandlers = r),
            (t.tag._delayedSrc = s));
        },
        'dom:renderTag': function (t) {
          const n = t.$el;
          if (!t.tag._eventHandlers || !n) return;
          const r =
            t.tag.tag === 'bodyAttrs' && typeof window < 'u' ? window : n;
          Object.entries(t.tag._eventHandlers).forEach(([s, i]) => {
            const o = `${t.tag._d || t.tag._p}:${s}`,
              a = s.slice(2).toLowerCase(),
              c = `data-h-${a}`;
            if ((delete t.staleSideEffects[o], n.hasAttribute(c))) return;
            const l = i;
            n.setAttribute(c, ''),
              r.addEventListener(a, l),
              t.entry &&
                (t.entry._sde[o] = () => {
                  r.removeEventListener(a, l), n.removeAttribute(c);
                });
          }),
            t.tag._delayedSrc && n.setAttribute('src', t.tag._delayedSrc);
        },
      },
    };
  };
function Hg(e) {
  return Array.isArray(e) ? e : [e];
}
const nu = ['base', 'meta', 'link', 'style', 'script', 'noscript'];
let ru;
const Ug = (e) => (ru = e),
  su = () => ru,
  jg = 10;
async function Fg(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput || e.input)
      .filter(([n, r]) => typeof r < 'u' && Ig.includes(n))
      .forEach(([n, r]) => {
        const s = Hg(r);
        t.push(...s.map((i) => Tg(n, i)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .map((n, r) => ((n._e = e._i), (n._p = (e._i << jg) + r), n))
  );
}
const Wg = () => [Og(), Mg(), Lg(), Ng(), Bg(), $g()],
  zg = (e = {}) => [
    Dg({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
function Vg(e = {}) {
  const t = Kg({
    ...e,
    plugins: [...zg(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return Ug(t), t;
}
function Kg(e = {}) {
  let t = [],
    n = {},
    r = 0;
  const s = ql();
  e != null && e.hooks && s.addHooks(e.hooks),
    (e.plugins = [...Wg(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((a) => a.hooks && s.addHooks(a.hooks));
  const i = () => s.callHook('entries:updated', o),
    o = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return s;
      },
      use(a) {
        a.hooks && s.addHooks(a.hooks);
      },
      push(a, c) {
        const l = { _i: r++, input: a, _sde: {} };
        return (
          c != null && c.mode && (l._m = c == null ? void 0 : c.mode),
          t.push(l),
          i(),
          {
            dispose() {
              t = t.filter((u) =>
                u._i !== l._i
                  ? !0
                  : ((n = { ...n, ...(u._sde || {}) }), (u._sde = {}), i(), !1)
              );
            },
            patch(u) {
              t = t.map(
                (f) => (f._i === l._i && ((l.input = f.input = u), i()), f)
              );
            },
          }
        );
      },
      async resolveTags() {
        const a = { tags: [], entries: [...t] };
        await s.callHook('entries:resolve', a);
        for (const c of a.entries)
          for (const l of await Fg(c)) {
            const u = { tag: l, entry: c };
            await s.callHook('tag:normalise', u), a.tags.push(u.tag);
          }
        return await s.callHook('tags:resolve', a), a.tags;
      },
      _elMap: {},
      _popSideEffectQueue() {
        const a = { ...n };
        return (n = {}), a;
      },
    };
  return o.hooks.callHook('init', o), o;
}
function qg(e) {
  return typeof e == 'function' ? e() : Oe(e);
}
function as(e, t = '') {
  if (e instanceof Promise) return e;
  const n = qg(e);
  if (!e || !n) return n;
  if (Array.isArray(n)) return n.map((r) => as(r, t));
  if (typeof n == 'object') {
    let r = !1;
    const s = Object.fromEntries(
      Object.entries(n).map(([i, o]) =>
        i === 'titleTemplate' || i.startsWith('on')
          ? [i, Oe(o)]
          : ((typeof o == 'function' || _e(o)) && (r = !0), [i, as(o, i)])
      )
    );
    return r && nu.includes(String(t)) && (s._dynamic = !0), s;
  }
  return n;
}
const Gg = vo.startsWith('3'),
  Jg = typeof window < 'u',
  iu = 'usehead';
function wo() {
  return (Nn() && Ne(iu)) || su();
}
function Zg(e = {}) {
  const t = Vg({
      ...e,
      domDelayFn: (r) => setTimeout(() => $n(() => r()), 10),
      plugins: [Yg(), ...((e == null ? void 0 : e.plugins) || [])],
    }),
    n = {
      install(r) {
        Gg && ((r.config.globalProperties.$unhead = t), r.provide(iu, t));
      },
    };
  return (t.install = n.install), t;
}
const Yg = () => ({
  hooks: {
    'entries:resolve': function (e) {
      for (const t of e.entries) t.resolvedInput = as(t.input);
    },
  },
});
function Xg(e, t = {}) {
  const n = wo(),
    r = qt({});
  Ed(() => {
    r.value = as(e);
  });
  const s = n.push(r.value, t);
  return (
    gn(r, (o) => s.patch(o)),
    Nn() &&
      yr(() => {
        s.dispose();
      }),
    s
  );
}
function Qg(e, t = {}) {
  return wo().push(e, t);
}
function ou(e, t = {}) {
  var r;
  const n = wo();
  if (n) {
    const s = Jg || !!((r = n.resolvedOptions) != null && r.document);
    return (t.mode === 'server' && s) || (t.mode === 'client' && !s)
      ? void 0
      : s
      ? Xg(e, t)
      : Qg(e, t);
  }
}
const em = ['script', 'style', 'noscript'],
  tm = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
  nm = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function rm(e, t) {
  const { props: n, tag: r } = e;
  if (nm.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const s = ['id'];
  r === 'meta' && s.push('name', 'property', 'http-equiv');
  for (const i of s)
    if (typeof n[i] < 'u') {
      const o = String(n[i]);
      return t && !t(o) ? !1 : `${r}:${i}:${o}`;
    }
  return !1;
}
const Ur = (e, t) => {
  const { tag: n, $el: r } = e;
  !r ||
    (Object.entries(n.props).forEach(([s, i]) => {
      i = String(i);
      const o = `attr:${s}`;
      if (s === 'class') {
        if (!i) return;
        for (const a of i.split(' ')) {
          const c = `${o}:${a}`;
          t && t(e, c, () => r.classList.remove(a)),
            r.classList.contains(a) || r.classList.add(a);
        }
        return;
      }
      t && !s.startsWith('data-h-') && t(e, o, () => r.removeAttribute(s)),
        r.getAttribute(s) !== i && r.setAttribute(s, i);
    }),
    em.includes(n.tag) &&
      r.innerHTML !== (n.children || '') &&
      (r.innerHTML = n.children || ''));
};
function sm(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function au(e, t = {}) {
  var u, f;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook('dom:beforeRender', n), !n.shouldRender)) return;
  const r = t.document || window.document,
    s = e._popSideEffectQueue();
  e.headEntries()
    .map((d) => d._sde)
    .forEach((d) => {
      Object.entries(d).forEach(([g, m]) => {
        s[g] = m;
      });
    });
  const i = async (d) => {
      const g = e.headEntries().find((E) => E._i === d._e),
        m = {
          renderId:
            d._d || sm(JSON.stringify({ ...d, _e: void 0, _p: void 0 })),
          $el: null,
          shouldRender: !0,
          tag: d,
          entry: g,
          staleSideEffects: s,
        };
      return await e.hooks.callHook('dom:beforeRenderTag', m), m;
    },
    o = [],
    a = { body: [], head: [] },
    c = (d, g, m) => {
      (g = `${d.renderId}:${g}`), d.entry && (d.entry._sde[g] = m), delete s[g];
    },
    l = (d) => {
      (e._elMap[d.renderId] = d.$el),
        o.push(d),
        c(d, 'el', () => {
          var g;
          (g = d.$el) == null || g.remove(), delete e._elMap[d.renderId];
        });
    };
  for (const d of await e.resolveTags()) {
    const g = await i(d);
    if (!g.shouldRender) continue;
    const { tag: m } = g;
    if (m.tag === 'title') {
      (r.title = m.children || ''), o.push(g);
      continue;
    }
    if (m.tag === 'htmlAttrs' || m.tag === 'bodyAttrs') {
      (g.$el = r[m.tag === 'htmlAttrs' ? 'documentElement' : 'body']),
        Ur(g, c),
        o.push(g);
      continue;
    }
    if (
      ((g.$el = e._elMap[g.renderId]),
      !g.$el &&
        m._hash &&
        (g.$el = r.querySelector(
          `${
            (u = m.tagPosition) != null && u.startsWith('body')
              ? 'body'
              : 'head'
          } > ${m.tag}[data-h-${m._hash}]`
        )),
      g.$el)
    ) {
      g.tag._d && Ur(g), l(g);
      continue;
    }
    (g.$el = r.createElement(m.tag)),
      Ur(g),
      a[
        (f = m.tagPosition) != null && f.startsWith('body') ? 'body' : 'head'
      ].push(g);
  }
  Object.entries(a).forEach(([d, g]) => {
    if (!!g.length) {
      for (const m of [...r[d].children].reverse()) {
        const E = m.tagName.toLowerCase();
        if (!tm.includes(E)) continue;
        const R = rm({
            tag: E,
            props: m
              .getAttributeNames()
              .reduce((p, v) => ({ ...p, [v]: m.getAttribute(v) }), {}),
          }),
          y = g.findIndex((p) => p && (p.tag._d === R || m.isEqualNode(p.$el)));
        if (y !== -1) {
          const p = g[y];
          (p.$el = m), Ur(p), l(p), delete g[y];
        }
      }
      g.forEach((m) => {
        if (!!m.$el) {
          switch (m.tag.tagPosition) {
            case 'bodyClose':
              r.body.appendChild(m.$el);
              break;
            case 'bodyOpen':
              r.body.insertBefore(m.$el, r.body.firstChild);
              break;
            case 'head':
            default:
              r.head.appendChild(m.$el);
              break;
          }
          l(m);
        }
      });
    }
  });
  for (const d of o) await e.hooks.callHook('dom:renderTag', d);
  Object.values(s).forEach((d) => d());
}
let Qs = null;
async function im(e, t = {}) {
  function n() {
    return (Qs = null), au(e, t);
  }
  const r = t.delayFn || ((s) => setTimeout(s, 10));
  return (Qs = Qs || new Promise((s) => r(() => s(n()))));
}
function om(e) {
  const t = Zg(),
    n = {
      unhead: t,
      install(r) {
        vo.startsWith('3') &&
          ((r.config.globalProperties.$head = t), r.provide('usehead', t));
      },
      use(r) {
        t.use(r);
      },
      resolveTags() {
        return t.resolveTags();
      },
      headEntries() {
        return t.headEntries();
      },
      headTags() {
        return t.resolveTags();
      },
      push(r, s) {
        return t.push(r, s);
      },
      addEntry(r, s) {
        return t.push(r, s);
      },
      addHeadObjs(r, s) {
        return t.push(r, s);
      },
      addReactiveEntry(r, s) {
        const i = ou(r, s);
        return typeof i < 'u' ? i.dispose : () => {};
      },
      removeHeadObjs() {},
      updateDOM(r, s) {
        s
          ? au(t, { document: r })
          : im(t, { delayFn: (i) => setTimeout(() => i(), 50), document: r });
      },
      internalHooks: t.hooks,
      hooks: { 'before:dom': [], 'resolved:tags': [], 'resolved:entries': [] },
    };
  return (
    (t.addHeadObjs = n.addHeadObjs),
    (t.updateDOM = n.updateDOM),
    t.hooks.hook('dom:beforeRender', (r) => {
      for (const s of n.hooks['before:dom'])
        s() === !1 && (r.shouldRender = !1);
    }),
    e && n.addHeadObjs(e),
    n
  );
}
const am = {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
      {
        hid: 'mobile-web-app-capable',
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Nuxt PWA',
      },
      { hid: 'theme-color', name: 'theme-color', content: '#000000' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Nuxt PWA' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt PWA' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
    ],
    link: [
      {
        rel: 'icon',
        href: '/_nuxt/icons/512x512.maskable.43d27045.png',
        key: 'favicon',
      },
      {
        rel: 'apple-touch-icon',
        href: '/_nuxt/icons/512x512.maskable.43d27045.png',
        sizes: '512x512',
        key: 'favicon-apple',
      },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    style: [],
    script: [],
    noscript: [],
    title: 'Nuxt PWA',
    htmlAttrs: { lang: 'ja' },
  },
  cm = !1,
  Bi = !1,
  lm = !1,
  um = '__nuxt',
  fm = Dn((e) => {
    const t = om();
    t.push(am), e.vueApp.use(t);
    {
      let n = !0;
      const r = () => {
        (n = !1), t.internalHooks.callHook('entries:updated', t.unhead);
      };
      t.internalHooks.hook('dom:beforeRender', (s) => {
        s.shouldRender = !n;
      }),
        e.hooks.hook('page:start', () => {
          n = !0;
        }),
        e.hooks.hook('page:finish', r),
        e.hooks.hook('app:mounted', r);
    }
    e._useHead = ou;
  });
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const on = typeof window < 'u';
function dm(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module';
}
const se = Object.assign;
function ei(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Je(s) ? s.map(e) : e(s);
  }
  return n;
}
const Qn = () => {},
  Je = Array.isArray,
  hm = /\/$/,
  pm = (e) => e.replace(hm, '');
function ti(e, t, n = '/') {
  let r,
    s = {},
    i = '',
    o = '';
  const a = t.indexOf('#');
  let c = t.indexOf('?');
  return (
    a < c && a >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (i = t.slice(c + 1, a > -1 ? a : t.length)),
      (s = e(i))),
    a > -1 && ((r = r || t.slice(0, a)), (o = t.slice(a, t.length))),
    (r = ym(r != null ? r : t, n)),
    { fullPath: r + (i && '?') + i + o, path: r, query: s, hash: o }
  );
}
function gm(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function Oa(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function mm(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    Sn(t.matched[r], n.matched[s]) &&
    cu(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Sn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function cu(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!_m(e[n], t[n])) return !1;
  return !0;
}
function _m(e, t) {
  return Je(e) ? Ma(e, t) : Je(t) ? Ma(t, e) : e === t;
}
function Ma(e, t) {
  return Je(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function ym(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/');
  let s = n.length - 1,
    i,
    o;
  for (i = 0; i < r.length; i++)
    if (((o = r[i]), o !== '.'))
      if (o === '..') s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join('/') +
    '/' +
    r.slice(i - (i === r.length ? 1 : 0)).join('/')
  );
}
var cr;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(cr || (cr = {}));
var er;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(er || (er = {}));
function vm(e) {
  if (!e)
    if (on) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), pm(e);
}
const bm = /^[^#]+#/;
function wm(e, t) {
  return e.replace(bm, '#') + t;
}
function Em(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const xs = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Im(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Em(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function La(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Hi = new Map();
function Cm(e, t) {
  Hi.set(e, t);
}
function Tm(e) {
  const t = Hi.get(e);
  return Hi.delete(e), t;
}
let km = () => location.protocol + '//' + location.host;
function lu(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    i = e.indexOf('#');
  if (i > -1) {
    let a = s.includes(e.slice(i)) ? e.slice(i).length : 1,
      c = s.slice(a);
    return c[0] !== '/' && (c = '/' + c), Oa(c, '');
  }
  return Oa(n, e) + r + s;
}
function Sm(e, t, n, r) {
  let s = [],
    i = [],
    o = null;
  const a = ({ state: d }) => {
    const g = lu(e, location),
      m = n.value,
      E = t.value;
    let R = 0;
    if (d) {
      if (((n.value = g), (t.value = d), o && o === m)) {
        o = null;
        return;
      }
      R = E ? d.position - E.position : 0;
    } else r(g);
    s.forEach((y) => {
      y(n.value, m, {
        delta: R,
        type: cr.pop,
        direction: R ? (R > 0 ? er.forward : er.back) : er.unknown,
      });
    });
  };
  function c() {
    o = n.value;
  }
  function l(d) {
    s.push(d);
    const g = () => {
      const m = s.indexOf(d);
      m > -1 && s.splice(m, 1);
    };
    return i.push(g), g;
  }
  function u() {
    const { history: d } = window;
    !d.state || d.replaceState(se({}, d.state, { scroll: xs() }), '');
  }
  function f() {
    for (const d of i) d();
    (i = []),
      window.removeEventListener('popstate', a),
      window.removeEventListener('beforeunload', u);
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', u),
    { pauseListeners: c, listen: l, destroy: f }
  );
}
function $a(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? xs() : null,
  };
}
function Am(e) {
  const { history: t, location: n } = window,
    r = { value: lu(e, n) },
    s = { value: t.state };
  s.value ||
    i(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function i(c, l, u) {
    const f = e.indexOf('#'),
      d =
        f > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(f)) + c
          : km() + e + c;
    try {
      t[u ? 'replaceState' : 'pushState'](l, '', d), (s.value = l);
    } catch (g) {
      console.error(g), n[u ? 'replace' : 'assign'](d);
    }
  }
  function o(c, l) {
    const u = se({}, t.state, $a(s.value.back, c, s.value.forward, !0), l, {
      position: s.value.position,
    });
    i(c, u, !0), (r.value = c);
  }
  function a(c, l) {
    const u = se({}, s.value, t.state, { forward: c, scroll: xs() });
    i(u.current, u, !0);
    const f = se({}, $a(r.value, c, null), { position: u.position + 1 }, l);
    i(c, f, !1), (r.value = c);
  }
  return { location: r, state: s, push: a, replace: o };
}
function uu(e) {
  e = vm(e);
  const t = Am(e),
    n = Sm(e, t.state, t.location, t.replace);
  function r(i, o = !0) {
    o || n.pauseListeners(), history.go(i);
  }
  const s = se(
    { location: '', base: e, go: r, createHref: wm.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Rm(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''),
    e.includes('#') || (e += '#'),
    uu(e)
  );
}
function Pm(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function fu(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const wt = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  du = Symbol('');
var xa;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(xa || (xa = {}));
function An(e, t) {
  return se(new Error(), { type: e, [du]: !0 }, t);
}
function ot(e, t) {
  return e instanceof Error && du in e && (t == null || !!(e.type & t));
}
const Na = '[^/]+?',
  Om = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Mm = /[.+*?^${}()[\]/\\]/g;
function Lm(e, t) {
  const n = se({}, Om, t),
    r = [];
  let s = n.start ? '^' : '';
  const i = [];
  for (const l of e) {
    const u = l.length ? [] : [90];
    n.strict && !l.length && (s += '/');
    for (let f = 0; f < l.length; f++) {
      const d = l[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (s += '/'), (s += d.value.replace(Mm, '\\$&')), (g += 40);
      else if (d.type === 1) {
        const { value: m, repeatable: E, optional: R, regexp: y } = d;
        i.push({ name: m, repeatable: E, optional: R });
        const p = y || Na;
        if (p !== Na) {
          g += 10;
          try {
            new RegExp(`(${p})`);
          } catch (I) {
            throw new Error(
              `Invalid custom RegExp for param "${m}" (${p}): ` + I.message
            );
          }
        }
        let v = E ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`;
        f || (v = R && l.length < 2 ? `(?:/${v})` : '/' + v),
          R && (v += '?'),
          (s += v),
          (g += 20),
          R && (g += -8),
          E && (g += -20),
          p === '.*' && (g += -50);
      }
      u.push(g);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const l = r.length - 1;
    r[l][r[l].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)');
  const o = new RegExp(s, n.sensitive ? '' : 'i');
  function a(l) {
    const u = l.match(o),
      f = {};
    if (!u) return null;
    for (let d = 1; d < u.length; d++) {
      const g = u[d] || '',
        m = i[d - 1];
      f[m.name] = g && m.repeatable ? g.split('/') : g;
    }
    return f;
  }
  function c(l) {
    let u = '',
      f = !1;
    for (const d of e) {
      (!f || !u.endsWith('/')) && (u += '/'), (f = !1);
      for (const g of d)
        if (g.type === 0) u += g.value;
        else if (g.type === 1) {
          const { value: m, repeatable: E, optional: R } = g,
            y = m in l ? l[m] : '';
          if (Je(y) && !E)
            throw new Error(
              `Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`
            );
          const p = Je(y) ? y.join('/') : y;
          if (!p)
            if (R)
              d.length < 2 &&
                (u.endsWith('/') ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${m}"`);
          u += p;
        }
    }
    return u || '/';
  }
  return { re: o, score: r, keys: i, parse: a, stringify: c };
}
function $m(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function xm(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const i = $m(r[n], s[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Da(r)) return 1;
    if (Da(s)) return -1;
  }
  return s.length - r.length;
}
function Da(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Nm = { type: 0, value: '' },
  Dm = /[a-zA-Z0-9_]/;
function Bm(e) {
  if (!e) return [[]];
  if (e === '/') return [[Nm]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${l}": ${g}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let i;
  function o() {
    i && s.push(i), (i = []);
  }
  let a = 0,
    c,
    l = '',
    u = '';
  function f() {
    !l ||
      (n === 0
        ? i.push({ type: 0, value: l })
        : n === 1 || n === 2 || n === 3
        ? (i.length > 1 &&
            (c === '*' || c === '+') &&
            t(
              `A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`
            ),
          i.push({
            type: 1,
            value: l,
            regexp: u,
            repeatable: c === '*' || c === '+',
            optional: c === '*' || c === '?',
          }))
        : t('Invalid state to consume buffer'),
      (l = ''));
  }
  function d() {
    l += c;
  }
  for (; a < e.length; ) {
    if (((c = e[a++]), c === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === '/' ? (l && f(), o()) : c === ':' ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        c === '('
          ? (n = 2)
          : Dm.test(c)
          ? d()
          : (f(), (n = 0), c !== '*' && c !== '?' && c !== '+' && a--);
        break;
      case 2:
        c === ')'
          ? u[u.length - 1] == '\\'
            ? (u = u.slice(0, -1) + c)
            : (n = 3)
          : (u += c);
        break;
      case 3:
        f(), (n = 0), c !== '*' && c !== '?' && c !== '+' && a--, (u = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${l}"`), f(), o(), s;
}
function Hm(e, t, n) {
  const r = Lm(Bm(e.path), n),
    s = se(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Um(e, t) {
  const n = [],
    r = new Map();
  t = Ua({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(u) {
    return r.get(u);
  }
  function i(u, f, d) {
    const g = !d,
      m = jm(u);
    m.aliasOf = d && d.record;
    const E = Ua(t, u),
      R = [m];
    if ('alias' in u) {
      const v = typeof u.alias == 'string' ? [u.alias] : u.alias;
      for (const I of v)
        R.push(
          se({}, m, {
            components: d ? d.record.components : m.components,
            path: I,
            aliasOf: d ? d.record : m,
          })
        );
    }
    let y, p;
    for (const v of R) {
      const { path: I } = v;
      if (f && I[0] !== '/') {
        const O = f.record.path,
          L = O[O.length - 1] === '/' ? '' : '/';
        v.path = f.record.path + (I && L + I);
      }
      if (
        ((y = Hm(v, f, E)),
        d
          ? d.alias.push(y)
          : ((p = p || y),
            p !== y && p.alias.push(y),
            g && u.name && !Ha(y) && o(u.name)),
        m.children)
      ) {
        const O = m.children;
        for (let L = 0; L < O.length; L++) i(O[L], y, d && d.children[L]);
      }
      (d = d || y),
        ((y.record.components && Object.keys(y.record.components).length) ||
          y.record.name ||
          y.record.redirect) &&
          c(y);
    }
    return p
      ? () => {
          o(p);
        }
      : Qn;
  }
  function o(u) {
    if (fu(u)) {
      const f = r.get(u);
      f &&
        (r.delete(u),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(o),
        f.alias.forEach(o));
    } else {
      const f = n.indexOf(u);
      f > -1 &&
        (n.splice(f, 1),
        u.record.name && r.delete(u.record.name),
        u.children.forEach(o),
        u.alias.forEach(o));
    }
  }
  function a() {
    return n;
  }
  function c(u) {
    let f = 0;
    for (
      ;
      f < n.length &&
      xm(u, n[f]) >= 0 &&
      (u.record.path !== n[f].record.path || !hu(u, n[f]));

    )
      f++;
    n.splice(f, 0, u), u.record.name && !Ha(u) && r.set(u.record.name, u);
  }
  function l(u, f) {
    let d,
      g = {},
      m,
      E;
    if ('name' in u && u.name) {
      if (((d = r.get(u.name)), !d)) throw An(1, { location: u });
      (E = d.record.name),
        (g = se(
          Ba(
            f.params,
            d.keys.filter((p) => !p.optional).map((p) => p.name)
          ),
          u.params &&
            Ba(
              u.params,
              d.keys.map((p) => p.name)
            )
        )),
        (m = d.stringify(g));
    } else if ('path' in u)
      (m = u.path),
        (d = n.find((p) => p.re.test(m))),
        d && ((g = d.parse(m)), (E = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find((p) => p.re.test(f.path))), !d))
        throw An(1, { location: u, currentLocation: f });
      (E = d.record.name),
        (g = se({}, f.params, u.params)),
        (m = d.stringify(g));
    }
    const R = [];
    let y = d;
    for (; y; ) R.unshift(y.record), (y = y.parent);
    return { name: E, path: m, params: g, matched: R, meta: Wm(R) };
  }
  return (
    e.forEach((u) => i(u)),
    {
      addRoute: i,
      resolve: l,
      removeRoute: o,
      getRoutes: a,
      getRecordMatcher: s,
    }
  );
}
function Ba(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function jm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Fm(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Fm(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r];
  return t;
}
function Ha(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Wm(e) {
  return e.reduce((t, n) => se(t, n.meta), {});
}
function Ua(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function hu(e, t) {
  return t.children.some((n) => n === e || hu(e, n));
}
const pu = /#/g,
  zm = /&/g,
  Vm = /\//g,
  Km = /=/g,
  qm = /\?/g,
  gu = /\+/g,
  Gm = /%5B/g,
  Jm = /%5D/g,
  mu = /%5E/g,
  Zm = /%60/g,
  _u = /%7B/g,
  Ym = /%7C/g,
  yu = /%7D/g,
  Xm = /%20/g;
function Eo(e) {
  return encodeURI('' + e)
    .replace(Ym, '|')
    .replace(Gm, '[')
    .replace(Jm, ']');
}
function Qm(e) {
  return Eo(e).replace(_u, '{').replace(yu, '}').replace(mu, '^');
}
function Ui(e) {
  return Eo(e)
    .replace(gu, '%2B')
    .replace(Xm, '+')
    .replace(pu, '%23')
    .replace(zm, '%26')
    .replace(Zm, '`')
    .replace(_u, '{')
    .replace(yu, '}')
    .replace(mu, '^');
}
function e_(e) {
  return Ui(e).replace(Km, '%3D');
}
function t_(e) {
  return Eo(e).replace(pu, '%23').replace(qm, '%3F');
}
function n_(e) {
  return e == null ? '' : t_(e).replace(Vm, '%2F');
}
function cs(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function r_(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const i = r[s].replace(gu, ' '),
      o = i.indexOf('='),
      a = cs(o < 0 ? i : i.slice(0, o)),
      c = o < 0 ? null : cs(i.slice(o + 1));
    if (a in t) {
      let l = t[a];
      Je(l) || (l = t[a] = [l]), l.push(c);
    } else t[a] = c;
  }
  return t;
}
function ja(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = e_(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Je(r) ? r.map((i) => i && Ui(i)) : [r && Ui(r)]).forEach((i) => {
      i !== void 0 &&
        ((t += (t.length ? '&' : '') + n), i != null && (t += '=' + i));
    });
  }
  return t;
}
function s_(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Je(r)
        ? r.map((s) => (s == null ? null : '' + s))
        : r == null
        ? r
        : '' + r);
  }
  return t;
}
const i_ = Symbol(''),
  Fa = Symbol(''),
  Io = Symbol(''),
  Co = Symbol(''),
  ji = Symbol('');
function Fn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Tt(e, t, n, r, s) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((o, a) => {
      const c = (f) => {
          f === !1
            ? a(An(4, { from: n, to: t }))
            : f instanceof Error
            ? a(f)
            : Pm(f)
            ? a(An(2, { from: t, to: f }))
            : (i &&
                r.enterCallbacks[s] === i &&
                typeof f == 'function' &&
                i.push(f),
              o());
        },
        l = e.call(r && r.instances[s], t, n, c);
      let u = Promise.resolve(l);
      e.length < 3 && (u = u.then(c)), u.catch((f) => a(f));
    });
}
function ni(e, t, n, r) {
  const s = [];
  for (const i of e)
    for (const o in i.components) {
      let a = i.components[o];
      if (!(t !== 'beforeRouteEnter' && !i.instances[o]))
        if (o_(a)) {
          const l = (a.__vccOpts || a)[t];
          l && s.push(Tt(l, n, r, i, o));
        } else {
          let c = a();
          s.push(() =>
            c.then((l) => {
              if (!l)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${i.path}"`)
                );
              const u = dm(l) ? l.default : l;
              i.components[o] = u;
              const d = (u.__vccOpts || u)[t];
              return d && Tt(d, n, r, i, o)();
            })
          );
        }
    }
  return s;
}
function o_(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function Wa(e) {
  const t = Ne(Io),
    n = Ne(Co),
    r = ve(() => t.resolve(Oe(e.to))),
    s = ve(() => {
      const { matched: c } = r.value,
        { length: l } = c,
        u = c[l - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const d = f.findIndex(Sn.bind(null, u));
      if (d > -1) return d;
      const g = za(c[l - 2]);
      return l > 1 && za(u) === g && f[f.length - 1].path !== g
        ? f.findIndex(Sn.bind(null, c[l - 2]))
        : d;
    }),
    i = ve(() => s.value > -1 && u_(n.params, r.value.params)),
    o = ve(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        cu(n.params, r.value.params)
    );
  function a(c = {}) {
    return l_(c)
      ? t[Oe(e.replace) ? 'replace' : 'push'](Oe(e.to)).catch(Qn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: ve(() => r.value.href),
    isActive: i,
    isExactActive: o,
    navigate: a,
  };
}
const a_ = gt({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: Wa,
    setup(e, { slots: t }) {
      const n = it(Wa(e)),
        { options: r } = Ne(Io),
        s = ve(() => ({
          [Va(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [Va(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive,
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom
          ? i
          : De(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              i
            );
      };
    },
  }),
  c_ = a_;
function l_(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function u_(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (!Je(s) || s.length !== r.length || r.some((i, o) => i !== s[o]))
      return !1;
  }
  return !0;
}
function za(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const Va = (e, t, n) => (e != null ? e : t != null ? t : n),
  f_ = gt({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ne(ji),
        s = ve(() => e.route || r.value),
        i = Ne(Fa, 0),
        o = ve(() => {
          let l = Oe(i);
          const { matched: u } = s.value;
          let f;
          for (; (f = u[l]) && !f.components; ) l++;
          return l;
        }),
        a = ve(() => s.value.matched[o.value]);
      pn(
        Fa,
        ve(() => o.value + 1)
      ),
        pn(i_, a),
        pn(ji, s);
      const c = qt();
      return (
        gn(
          () => [c.value, a.value, e.name],
          ([l, u, f], [d, g, m]) => {
            u &&
              ((u.instances[f] = l),
              g &&
                g !== u &&
                l &&
                l === d &&
                (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards),
                u.updateGuards.size || (u.updateGuards = g.updateGuards))),
              l &&
                u &&
                (!g || !Sn(u, g) || !d) &&
                (u.enterCallbacks[f] || []).forEach((E) => E(l));
          },
          { flush: 'post' }
        ),
        () => {
          const l = s.value,
            u = e.name,
            f = a.value,
            d = f && f.components[u];
          if (!d) return Ka(n.default, { Component: d, route: l });
          const g = f.props[u],
            m = g
              ? g === !0
                ? l.params
                : typeof g == 'function'
                ? g(l)
                : g
              : null,
            R = De(
              d,
              se({}, m, t, {
                onVnodeUnmounted: (y) => {
                  y.component.isUnmounted && (f.instances[u] = null);
                },
                ref: c,
              })
            );
          return Ka(n.default, { Component: R, route: l }) || R;
        }
      );
    },
  });
function Ka(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const vu = f_;
function d_(e) {
  const t = Um(e.routes, e),
    n = e.parseQuery || r_,
    r = e.stringifyQuery || ja,
    s = e.history,
    i = Fn(),
    o = Fn(),
    a = Fn(),
    c = bi(wt);
  let l = wt;
  on &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const u = ei.bind(null, (C) => '' + C),
    f = ei.bind(null, n_),
    d = ei.bind(null, cs);
  function g(C, B) {
    let $, W;
    return (
      fu(C) ? (($ = t.getRecordMatcher(C)), (W = B)) : (W = C), t.addRoute(W, $)
    );
  }
  function m(C) {
    const B = t.getRecordMatcher(C);
    B && t.removeRoute(B);
  }
  function E() {
    return t.getRoutes().map((C) => C.record);
  }
  function R(C) {
    return !!t.getRecordMatcher(C);
  }
  function y(C, B) {
    if (((B = se({}, B || c.value)), typeof C == 'string')) {
      const h = ti(n, C, B.path),
        _ = t.resolve({ path: h.path }, B),
        b = s.createHref(h.fullPath);
      return se(h, _, {
        params: d(_.params),
        hash: cs(h.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let $;
    if ('path' in C) $ = se({}, C, { path: ti(n, C.path, B.path).path });
    else {
      const h = se({}, C.params);
      for (const _ in h) h[_] == null && delete h[_];
      ($ = se({}, C, { params: f(C.params) })), (B.params = f(B.params));
    }
    const W = t.resolve($, B),
      te = C.hash || '';
    W.params = u(d(W.params));
    const de = gm(r, se({}, C, { hash: Qm(te), path: W.path })),
      X = s.createHref(de);
    return se(
      { fullPath: de, hash: te, query: r === ja ? s_(C.query) : C.query || {} },
      W,
      { redirectedFrom: void 0, href: X }
    );
  }
  function p(C) {
    return typeof C == 'string' ? ti(n, C, c.value.path) : se({}, C);
  }
  function v(C, B) {
    if (l !== C) return An(8, { from: B, to: C });
  }
  function I(C) {
    return x(C);
  }
  function O(C) {
    return I(se(p(C), { replace: !0 }));
  }
  function L(C) {
    const B = C.matched[C.matched.length - 1];
    if (B && B.redirect) {
      const { redirect: $ } = B;
      let W = typeof $ == 'function' ? $(C) : $;
      return (
        typeof W == 'string' &&
          ((W = W.includes('?') || W.includes('#') ? (W = p(W)) : { path: W }),
          (W.params = {})),
        se(
          { query: C.query, hash: C.hash, params: 'path' in W ? {} : C.params },
          W
        )
      );
    }
  }
  function x(C, B) {
    const $ = (l = y(C)),
      W = c.value,
      te = C.state,
      de = C.force,
      X = C.replace === !0,
      h = L($);
    if (h)
      return x(
        se(p(h), {
          state: typeof h == 'object' ? se({}, te, h.state) : te,
          force: de,
          replace: X,
        }),
        B || $
      );
    const _ = $;
    _.redirectedFrom = B;
    let b;
    return (
      !de &&
        mm(r, W, $) &&
        ((b = An(16, { to: _, from: W })), Nt(W, W, !0, !1)),
      (b ? Promise.resolve(b) : H(_, W))
        .catch((w) => (ot(w) ? (ot(w, 2) ? w : ze(w)) : ae(w, _, W)))
        .then((w) => {
          if (w) {
            if (ot(w, 2))
              return x(
                se({ replace: X }, p(w.to), {
                  state: typeof w.to == 'object' ? se({}, te, w.to.state) : te,
                  force: de,
                }),
                B || _
              );
          } else w = K(_, W, !0, X, te);
          return U(_, W, w), w;
        })
    );
  }
  function k(C, B) {
    const $ = v(C, B);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function H(C, B) {
    let $;
    const [W, te, de] = h_(C, B);
    $ = ni(W.reverse(), 'beforeRouteLeave', C, B);
    for (const h of W)
      h.leaveGuards.forEach((_) => {
        $.push(Tt(_, C, B));
      });
    const X = k.bind(null, C, B);
    return (
      $.push(X),
      rn($)
        .then(() => {
          $ = [];
          for (const h of i.list()) $.push(Tt(h, C, B));
          return $.push(X), rn($);
        })
        .then(() => {
          $ = ni(te, 'beforeRouteUpdate', C, B);
          for (const h of te)
            h.updateGuards.forEach((_) => {
              $.push(Tt(_, C, B));
            });
          return $.push(X), rn($);
        })
        .then(() => {
          $ = [];
          for (const h of C.matched)
            if (h.beforeEnter && !B.matched.includes(h))
              if (Je(h.beforeEnter))
                for (const _ of h.beforeEnter) $.push(Tt(_, C, B));
              else $.push(Tt(h.beforeEnter, C, B));
          return $.push(X), rn($);
        })
        .then(
          () => (
            C.matched.forEach((h) => (h.enterCallbacks = {})),
            ($ = ni(de, 'beforeRouteEnter', C, B)),
            $.push(X),
            rn($)
          )
        )
        .then(() => {
          $ = [];
          for (const h of o.list()) $.push(Tt(h, C, B));
          return $.push(X), rn($);
        })
        .catch((h) => (ot(h, 8) ? h : Promise.reject(h)))
    );
  }
  function U(C, B, $) {
    for (const W of a.list()) W(C, B, $);
  }
  function K(C, B, $, W, te) {
    const de = v(C, B);
    if (de) return de;
    const X = B === wt,
      h = on ? history.state : {};
    $ &&
      (W || X
        ? s.replace(C.fullPath, se({ scroll: X && h && h.scroll }, te))
        : s.push(C.fullPath, te)),
      (c.value = C),
      Nt(C, B, $, X),
      ze();
  }
  let D;
  function Y() {
    D ||
      (D = s.listen((C, B, $) => {
        if (!Rr.listening) return;
        const W = y(C),
          te = L(W);
        if (te) {
          x(se(te, { replace: !0 }), W).catch(Qn);
          return;
        }
        l = W;
        const de = c.value;
        on && Cm(La(de.fullPath, $.delta), xs()),
          H(W, de)
            .catch((X) =>
              ot(X, 12)
                ? X
                : ot(X, 2)
                ? (x(X.to, W)
                    .then((h) => {
                      ot(h, 20) &&
                        !$.delta &&
                        $.type === cr.pop &&
                        s.go(-1, !1);
                    })
                    .catch(Qn),
                  Promise.reject())
                : ($.delta && s.go(-$.delta, !1), ae(X, W, de))
            )
            .then((X) => {
              (X = X || K(W, de, !1)),
                X &&
                  ($.delta && !ot(X, 8)
                    ? s.go(-$.delta, !1)
                    : $.type === cr.pop && ot(X, 20) && s.go(-1, !1)),
                U(W, de, X);
            })
            .catch(Qn);
      }));
  }
  let j = Fn(),
    Ie = Fn(),
    ee;
  function ae(C, B, $) {
    ze(C);
    const W = Ie.list();
    return (
      W.length ? W.forEach((te) => te(C, B, $)) : console.error(C),
      Promise.reject(C)
    );
  }
  function ie() {
    return ee && c.value !== wt
      ? Promise.resolve()
      : new Promise((C, B) => {
          j.add([C, B]);
        });
  }
  function ze(C) {
    return (
      ee ||
        ((ee = !C),
        Y(),
        j.list().forEach(([B, $]) => (C ? $(C) : B())),
        j.reset()),
      C
    );
  }
  function Nt(C, B, $, W) {
    const { scrollBehavior: te } = e;
    if (!on || !te) return Promise.resolve();
    const de =
      (!$ && Tm(La(C.fullPath, 0))) ||
      ((W || !$) && history.state && history.state.scroll) ||
      null;
    return $n()
      .then(() => te(C, B, de))
      .then((X) => X && Im(X))
      .catch((X) => ae(X, C, B));
  }
  const Ve = (C) => s.go(C);
  let Ae;
  const tn = new Set(),
    Rr = {
      currentRoute: c,
      listening: !0,
      addRoute: g,
      removeRoute: m,
      hasRoute: R,
      getRoutes: E,
      resolve: y,
      options: e,
      push: I,
      replace: O,
      go: Ve,
      back: () => Ve(-1),
      forward: () => Ve(1),
      beforeEach: i.add,
      beforeResolve: o.add,
      afterEach: a.add,
      onError: Ie.add,
      isReady: ie,
      install(C) {
        const B = this;
        C.component('RouterLink', c_),
          C.component('RouterView', vu),
          (C.config.globalProperties.$router = B),
          Object.defineProperty(C.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => Oe(c),
          }),
          on &&
            !Ae &&
            c.value === wt &&
            ((Ae = !0), I(s.location).catch((te) => {}));
        const $ = {};
        for (const te in wt) $[te] = ve(() => c.value[te]);
        C.provide(Io, B), C.provide(Co, it($)), C.provide(ji, c);
        const W = C.unmount;
        tn.add(C),
          (C.unmount = function () {
            tn.delete(C),
              tn.size < 1 &&
                ((l = wt),
                D && D(),
                (D = null),
                (c.value = wt),
                (Ae = !1),
                (ee = !1)),
              W();
          });
      },
    };
  return Rr;
}
function rn(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function h_(e, t) {
  const n = [],
    r = [],
    s = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < i; o++) {
    const a = t.matched[o];
    a && (e.matched.find((l) => Sn(l, a)) ? r.push(a) : n.push(a));
    const c = e.matched[o];
    c && (t.matched.find((l) => Sn(l, c)) || s.push(c));
  }
  return [n, r, s];
}
function p_() {
  return Ne(Co);
}
const Le = { middleware: 'auth' },
  $e = { layout: !1, middleware: 'auth' };
var Ac, Rc, Pc, Oc;
const qa = [
    {
      name: (Ac = Le == null ? void 0 : Le.name) != null ? Ac : 'index',
      path: (Rc = Le == null ? void 0 : Le.path) != null ? Rc : '/',
      file: 'C:/Users/hidet/Downloads/App/signal/pages/index.vue',
      children: [],
      meta: Le,
      alias: (Le == null ? void 0 : Le.alias) || [],
      redirect: (Le == null ? void 0 : Le.redirect) || void 0,
      component: () =>
        kn(
          () => import('./index.c648e7d5.js'),
          [
            './index.c648e7d5.js',
            './userInfoState.7308cf64.js',
            './index.esm2017.cd6d08be.js',
            './navState.fcbedf6b.js',
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
    {
      name: (Pc = $e == null ? void 0 : $e.name) != null ? Pc : 'login',
      path: (Oc = $e == null ? void 0 : $e.path) != null ? Oc : '/login',
      file: 'C:/Users/hidet/Downloads/App/signal/pages/login.vue',
      children: [],
      meta: $e,
      alias: ($e == null ? void 0 : $e.alias) || [],
      redirect: ($e == null ? void 0 : $e.redirect) || void 0,
      component: () =>
        kn(
          () => import('./login.bba5ad0b.js'),
          [
            './login.bba5ad0b.js',
            './firebaseAuthState.9ed8168b.js',
            './userInfoState.7308cf64.js',
            './index.esm2017.cd6d08be.js',
          ],
          import.meta.url
        ).then((e) => e.default || e),
    },
  ],
  g_ = {
    scrollBehavior(e, t, n) {
      const r = Ee();
      let s = n || void 0;
      if (
        (!s &&
          t &&
          e &&
          e.meta.scrollToTop !== !1 &&
          m_(t, e) &&
          (s = { left: 0, top: 0 }),
        e.path === t.path)
      ) {
        if (t.hash && !e.hash) return { left: 0, top: 0 };
        if (e.hash) return { el: e.hash, top: Ga(e.hash) };
      }
      const i = (a) => {
          var c;
          return !!((c = a.meta.pageTransition) != null ? c : Bi);
        },
        o = i(t) && i(e) ? 'page:transition:finish' : 'page:finish';
      return new Promise((a) => {
        r.hooks.hookOnce(o, async () => {
          await $n(), e.hash && (s = { el: e.hash, top: Ga(e.hash) }), a(s);
        });
      });
    },
  };
function Ga(e) {
  try {
    const t = document.querySelector(e);
    if (t) return parseFloat(getComputedStyle(t).scrollMarginTop);
  } catch {}
  return 0;
}
function m_(e, t) {
  const n = e.matched[0] === t.matched[0];
  return !!(!n || (n && JSON.stringify(e.params) !== JSON.stringify(t.params)));
}
const __ = {},
  at = { ...__, ...g_ },
  y_ = Yp(async (e) => {
    var s;
    let t, n;
    if (!((s = e.meta) != null && s.validate)) return;
    const r =
      (([t, n] = Gl(() => Promise.resolve(e.meta.validate(e)))),
      (t = await t),
      n(),
      t);
    return typeof r == 'boolean' ? r : Yl(r);
  }),
  v_ = [y_],
  ri = {
    auth: () =>
      kn(
        () => import('./auth.165bba06.js'),
        ['./auth.165bba06.js', './userInfoState.7308cf64.js'],
        import.meta.url
      ),
  };
function b_(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    i = e.indexOf('#');
  if (i > -1) {
    const a = s.includes(e.slice(i)) ? e.slice(i).length : 1;
    let c = s.slice(a);
    return c[0] !== '/' && (c = '/' + c), Ea(c, '');
  }
  return Ea(n, e) + r + s;
}
const w_ = Dn(async (e) => {
    var m, E, R, y;
    let t,
      n,
      r = Zl().app.baseURL;
    at.hashMode && !r.includes('#') && (r += '#');
    const s =
        (E = (m = at.history) == null ? void 0 : m.call(at, r)) != null
          ? E
          : at.hashMode
          ? Rm(r)
          : uu(r),
      i =
        (y = (R = at.routes) == null ? void 0 : R.call(at, qa)) != null
          ? y
          : qa,
      o = b_(r, window.location),
      a = d_({ ...at, history: s, routes: i });
    e.vueApp.use(a);
    const c = bi(a.currentRoute.value);
    a.afterEach((p, v) => {
      c.value = v;
    }),
      Object.defineProperty(e.vueApp.config.globalProperties, 'previousRoute', {
        get: () => c.value,
      });
    const l = bi(a.resolve(o)),
      u = () => {
        l.value = a.currentRoute.value;
      };
    e.hook('page:finish', u),
      a.afterEach((p, v) => {
        var I, O, L, x;
        ((O = (I = p.matched[0]) == null ? void 0 : I.components) == null
          ? void 0
          : O.default) ===
          ((x = (L = v.matched[0]) == null ? void 0 : L.components) == null
            ? void 0
            : x.default) && u();
      });
    const f = {};
    for (const p in l.value) f[p] = ve(() => l.value[p]);
    (e._route = it(f)),
      (e._middleware = e._middleware || { global: [], named: {} });
    const d = Ls();
    try {
      ([t, n] = Gl(() => a.isReady())), await t, n();
    } catch (p) {
      Ct(e, Vn, [p]);
    }
    const g = Zp('_layout');
    return (
      a.beforeEach(async (p, v) => {
        var O, L;
        (p.meta = it(p.meta)),
          e.isHydrating &&
            (p.meta.layout = (O = g.value) != null ? O : p.meta.layout),
          (e._processingMiddleware = !0);
        const I = new Set([...v_, ...e._middleware.global]);
        for (const x of p.matched) {
          const k = x.meta.middleware;
          if (!!k)
            if (Array.isArray(k)) for (const H of k) I.add(H);
            else I.add(k);
        }
        for (const x of I) {
          const k =
            typeof x == 'string'
              ? e._middleware.named[x] ||
                (await ((L = ri[x]) == null
                  ? void 0
                  : L.call(ri).then((U) => U.default || U)))
              : x;
          if (!k) throw new Error(`Unknown route middleware: '${x}'.`);
          const H = await Ct(e, k, [p, v]);
          if (
            !e.payload.serverRendered &&
            e.isHydrating &&
            (H === !1 || H instanceof Error)
          ) {
            const U =
              H ||
              Ni({ statusCode: 404, statusMessage: `Page Not Found: ${o}` });
            return await Ct(e, Vn, [U]), !1;
          }
          if (H || H === !1) return H;
        }
      }),
      a.afterEach(async (p) => {
        delete e._processingMiddleware,
          !e.isHydrating && d.value && (await Ct(e, Gp)),
          p.matched.length === 0 &&
            Ct(e, Vn, [
              Ni({
                statusCode: 404,
                fatal: !1,
                statusMessage: `Page not found: ${p.fullPath}`,
              }),
            ]);
      }),
      e.hooks.hookOnce('app:created', async () => {
        try {
          await a.replace({ ...a.resolve(o), name: void 0, force: !0 });
        } catch (p) {
          Ct(e, Vn, [p]);
        }
      }),
      { provide: { router: a } }
    );
  }),
  E_ = Dn((e) => {
    !ig() ||
      (e.hooks.hook('link:prefetch', (t) => {
        if (!Ms(t).protocol) return Aa(t);
      }),
      $s().beforeResolve(async (t, n) => {
        if (t.path === n.path) return;
        const r = await Aa(t.path);
        !r || Object.assign(e.static.data, r.data);
      }));
  });
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const bu = {
  NODE_CLIENT: !1,
  NODE_ADMIN: !1,
  SDK_VERSION: '${JSCORE_VERSION}',
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const I_ = function (e, t) {
    if (!e) throw C_(t);
  },
  C_ = function (e) {
    return new Error(
      'Firebase Database (' + bu.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + e
    );
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wu = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e.charCodeAt(r);
      s < 128
        ? (t[n++] = s)
        : s < 2048
        ? ((t[n++] = (s >> 6) | 192), (t[n++] = (s & 63) | 128))
        : (s & 64512) === 55296 &&
          r + 1 < e.length &&
          (e.charCodeAt(r + 1) & 64512) === 56320
        ? ((s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
          (t[n++] = (s >> 18) | 240),
          (t[n++] = ((s >> 12) & 63) | 128),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (s & 63) | 128))
        : ((t[n++] = (s >> 12) | 224),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (s & 63) | 128));
    }
    return t;
  },
  T_ = function (e) {
    const t = [];
    let n = 0,
      r = 0;
    for (; n < e.length; ) {
      const s = e[n++];
      if (s < 128) t[r++] = String.fromCharCode(s);
      else if (s > 191 && s < 224) {
        const i = e[n++];
        t[r++] = String.fromCharCode(((s & 31) << 6) | (i & 63));
      } else if (s > 239 && s < 365) {
        const i = e[n++],
          o = e[n++],
          a = e[n++],
          c =
            (((s & 7) << 18) | ((i & 63) << 12) | ((o & 63) << 6) | (a & 63)) -
            65536;
        (t[r++] = String.fromCharCode(55296 + (c >> 10))),
          (t[r++] = String.fromCharCode(56320 + (c & 1023)));
      } else {
        const i = e[n++],
          o = e[n++];
        t[r++] = String.fromCharCode(
          ((s & 15) << 12) | ((i & 63) << 6) | (o & 63)
        );
      }
    }
    return t.join('');
  },
  Eu = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + '+/=';
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + '-_.';
    },
    HAS_NATIVE_SUPPORT: typeof atob == 'function',
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error('encodeByteArray takes an array as a parameter');
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let s = 0; s < e.length; s += 3) {
        const i = e[s],
          o = s + 1 < e.length,
          a = o ? e[s + 1] : 0,
          c = s + 2 < e.length,
          l = c ? e[s + 2] : 0,
          u = i >> 2,
          f = ((i & 3) << 4) | (a >> 4);
        let d = ((a & 15) << 2) | (l >> 6),
          g = l & 63;
        c || ((g = 64), o || (d = 64)), r.push(n[u], n[f], n[d], n[g]);
      }
      return r.join('');
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(wu(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : T_(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let s = 0; s < e.length; ) {
        const i = n[e.charAt(s++)],
          a = s < e.length ? n[e.charAt(s)] : 0;
        ++s;
        const l = s < e.length ? n[e.charAt(s)] : 64;
        ++s;
        const f = s < e.length ? n[e.charAt(s)] : 64;
        if ((++s, i == null || a == null || l == null || f == null))
          throw Error();
        const d = (i << 2) | (a >> 4);
        if ((r.push(d), l !== 64)) {
          const g = ((a << 4) & 240) | (l >> 2);
          if ((r.push(g), f !== 64)) {
            const m = ((l << 6) & 192) | f;
            r.push(m);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  },
  k_ = function (e) {
    const t = wu(e);
    return Eu.encodeByteArray(t, !0);
  },
  ls = function (e) {
    return k_(e).replace(/\./g, '');
  },
  us = function (e) {
    try {
      return Eu.decodeString(e, !0);
    } catch (t) {
      console.error('base64Decode failed: ', t);
    }
    return null;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function TE(e) {
  return Iu(void 0, e);
}
function Iu(e, t) {
  if (!(t instanceof Object)) return t;
  switch (t.constructor) {
    case Date:
      const n = t;
      return new Date(n.getTime());
    case Object:
      e === void 0 && (e = {});
      break;
    case Array:
      e = [];
      break;
    default:
      return t;
  }
  for (const n in t) !t.hasOwnProperty(n) || !S_(n) || (e[n] = Iu(e[n], t[n]));
  return e;
}
function S_(e) {
  return e !== '__proto__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Te() {
  return typeof navigator < 'u' && typeof navigator.userAgent == 'string'
    ? navigator.userAgent
    : '';
}
function A_() {
  return (
    typeof window < 'u' &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Te())
  );
}
function R_() {
  const e =
    typeof chrome == 'object'
      ? chrome.runtime
      : typeof browser == 'object'
      ? browser.runtime
      : void 0;
  return typeof e == 'object' && e.id !== void 0;
}
function P_() {
  return typeof navigator == 'object' && navigator.product === 'ReactNative';
}
function O_() {
  const e = Te();
  return e.indexOf('MSIE ') >= 0 || e.indexOf('Trident/') >= 0;
}
function kE() {
  return bu.NODE_ADMIN === !0;
}
function M_() {
  try {
    return typeof indexedDB == 'object';
  } catch {
    return !1;
  }
}
function L_() {
  return new Promise((e, t) => {
    try {
      let n = !0;
      const r = 'validate-browser-context-for-indexeddb-analytics-module',
        s = self.indexedDB.open(r);
      (s.onsuccess = () => {
        s.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
      }),
        (s.onupgradeneeded = () => {
          n = !1;
        }),
        (s.onerror = () => {
          var i;
          t(
            ((i = s.error) === null || i === void 0 ? void 0 : i.message) || ''
          );
        });
    } catch (n) {
      t(n);
    }
  });
}
function SE() {
  return !(typeof navigator > 'u' || !navigator.cookieEnabled);
}
function $_() {
  if (typeof self < 'u') return self;
  if (typeof window < 'u') return window;
  if (typeof global < 'u') return global;
  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const x_ = () => $_().__FIREBASE_DEFAULTS__,
  N_ = () => {
    if (typeof process > 'u' || typeof process.env > 'u') return;
    const e = {}.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  D_ = () => {
    if (typeof document > 'u') return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const t = e && us(e[1]);
    return t && JSON.parse(t);
  },
  To = () => {
    try {
      return x_() || N_() || D_();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  },
  Cu = (e) => {
    var t, n;
    return (n =
      (t = To()) === null || t === void 0 ? void 0 : t.emulatorHosts) ===
      null || n === void 0
      ? void 0
      : n[e];
  },
  AE = (e) => {
    const t = Cu(e);
    if (!t) return;
    const n = t.lastIndexOf(':');
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const r = parseInt(t.substring(n + 1), 10);
    return t[0] === '[' ? [t.substring(1, n - 1), r] : [t.substring(0, n), r];
  },
  B_ = () => {
    var e;
    return (e = To()) === null || e === void 0 ? void 0 : e.config;
  },
  Tu = (e) => {
    var t;
    return (t = To()) === null || t === void 0 ? void 0 : t[`_${e}`];
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class H_ {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, n) => {
        (this.resolve = t), (this.reject = n);
      }));
  }
  wrapCallback(t) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r),
        typeof t == 'function' &&
          (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r));
    };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function RE(e, t) {
  if (e.uid)
    throw new Error(
      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
    );
  const n = { alg: 'none', type: 'JWT' },
    r = t || 'demo-project',
    s = e.iat || 0,
    i = e.sub || e.user_id;
  if (!i)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const o = Object.assign(
      {
        iss: `https://securetoken.google.com/${r}`,
        aud: r,
        iat: s,
        exp: s + 3600,
        auth_time: s,
        sub: i,
        user_id: i,
        firebase: { sign_in_provider: 'custom', identities: {} },
      },
      e
    ),
    a = '';
  return [ls(JSON.stringify(n)), ls(JSON.stringify(o)), a].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const U_ = 'FirebaseError';
class $t extends Error {
  constructor(t, n, r) {
    super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = U_),
      Object.setPrototypeOf(this, $t.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, vr.prototype.create);
  }
}
class vr {
  constructor(t, n, r) {
    (this.service = t), (this.serviceName = n), (this.errors = r);
  }
  create(t, ...n) {
    const r = n[0] || {},
      s = `${this.service}/${t}`,
      i = this.errors[t],
      o = i ? j_(i, r) : 'Error',
      a = `${this.serviceName}: ${o} (${s}).`;
    return new $t(s, a, r);
  }
}
function j_(e, t) {
  return e.replace(F_, (n, r) => {
    const s = t[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const F_ = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ja(e) {
  return JSON.parse(e);
}
function PE(e) {
  return JSON.stringify(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ku = function (e) {
    let t = {},
      n = {},
      r = {},
      s = '';
    try {
      const i = e.split('.');
      (t = Ja(us(i[0]) || '')),
        (n = Ja(us(i[1]) || '')),
        (s = i[2]),
        (r = n.d || {}),
        delete n.d;
    } catch {}
    return { header: t, claims: n, data: r, signature: s };
  },
  OE = function (e) {
    const t = ku(e),
      n = t.claims;
    return !!n && typeof n == 'object' && n.hasOwnProperty('iat');
  },
  ME = function (e) {
    const t = ku(e).claims;
    return typeof t == 'object' && t.admin === !0;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function LE(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function $E(e, t) {
  if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
}
function W_(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
function xE(e, t, n) {
  const r = {};
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) &&
      (r[s] = t.call(n, e[s], s, e));
  return r;
}
function fs(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    r = Object.keys(t);
  for (const s of n) {
    if (!r.includes(s)) return !1;
    const i = e[s],
      o = t[s];
    if (Za(i) && Za(o)) {
      if (!fs(i, o)) return !1;
    } else if (i !== o) return !1;
  }
  for (const s of r) if (!n.includes(s)) return !1;
  return !0;
}
function Za(e) {
  return e !== null && typeof e == 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function br(e) {
  const t = [];
  for (const [n, r] of Object.entries(e))
    Array.isArray(r)
      ? r.forEach((s) => {
          t.push(encodeURIComponent(n) + '=' + encodeURIComponent(s));
        })
      : t.push(encodeURIComponent(n) + '=' + encodeURIComponent(r));
  return t.length ? '&' + t.join('&') : '';
}
function Kn(e) {
  const t = {};
  return (
    e
      .replace(/^\?/, '')
      .split('&')
      .forEach((r) => {
        if (r) {
          const [s, i] = r.split('=');
          t[decodeURIComponent(s)] = decodeURIComponent(i);
        }
      }),
    t
  );
}
function qn(e) {
  const t = e.indexOf('?');
  if (!t) return '';
  const n = e.indexOf('#', t);
  return e.substring(t, n > 0 ? n : void 0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class NE {
  constructor() {
    (this.chain_ = []),
      (this.buf_ = []),
      (this.W_ = []),
      (this.pad_ = []),
      (this.inbuf_ = 0),
      (this.total_ = 0),
      (this.blockSize = 512 / 8),
      (this.pad_[0] = 128);
    for (let t = 1; t < this.blockSize; ++t) this.pad_[t] = 0;
    this.reset();
  }
  reset() {
    (this.chain_[0] = 1732584193),
      (this.chain_[1] = 4023233417),
      (this.chain_[2] = 2562383102),
      (this.chain_[3] = 271733878),
      (this.chain_[4] = 3285377520),
      (this.inbuf_ = 0),
      (this.total_ = 0);
  }
  compress_(t, n) {
    n || (n = 0);
    const r = this.W_;
    if (typeof t == 'string')
      for (let f = 0; f < 16; f++)
        (r[f] =
          (t.charCodeAt(n) << 24) |
          (t.charCodeAt(n + 1) << 16) |
          (t.charCodeAt(n + 2) << 8) |
          t.charCodeAt(n + 3)),
          (n += 4);
    else
      for (let f = 0; f < 16; f++)
        (r[f] = (t[n] << 24) | (t[n + 1] << 16) | (t[n + 2] << 8) | t[n + 3]),
          (n += 4);
    for (let f = 16; f < 80; f++) {
      const d = r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16];
      r[f] = ((d << 1) | (d >>> 31)) & 4294967295;
    }
    let s = this.chain_[0],
      i = this.chain_[1],
      o = this.chain_[2],
      a = this.chain_[3],
      c = this.chain_[4],
      l,
      u;
    for (let f = 0; f < 80; f++) {
      f < 40
        ? f < 20
          ? ((l = a ^ (i & (o ^ a))), (u = 1518500249))
          : ((l = i ^ o ^ a), (u = 1859775393))
        : f < 60
        ? ((l = (i & o) | (a & (i | o))), (u = 2400959708))
        : ((l = i ^ o ^ a), (u = 3395469782));
      const d = (((s << 5) | (s >>> 27)) + l + c + u + r[f]) & 4294967295;
      (c = a),
        (a = o),
        (o = ((i << 30) | (i >>> 2)) & 4294967295),
        (i = s),
        (s = d);
    }
    (this.chain_[0] = (this.chain_[0] + s) & 4294967295),
      (this.chain_[1] = (this.chain_[1] + i) & 4294967295),
      (this.chain_[2] = (this.chain_[2] + o) & 4294967295),
      (this.chain_[3] = (this.chain_[3] + a) & 4294967295),
      (this.chain_[4] = (this.chain_[4] + c) & 4294967295);
  }
  update(t, n) {
    if (t == null) return;
    n === void 0 && (n = t.length);
    const r = n - this.blockSize;
    let s = 0;
    const i = this.buf_;
    let o = this.inbuf_;
    for (; s < n; ) {
      if (o === 0) for (; s <= r; ) this.compress_(t, s), (s += this.blockSize);
      if (typeof t == 'string') {
        for (; s < n; )
          if (((i[o] = t.charCodeAt(s)), ++o, ++s, o === this.blockSize)) {
            this.compress_(i), (o = 0);
            break;
          }
      } else
        for (; s < n; )
          if (((i[o] = t[s]), ++o, ++s, o === this.blockSize)) {
            this.compress_(i), (o = 0);
            break;
          }
    }
    (this.inbuf_ = o), (this.total_ += n);
  }
  digest() {
    const t = [];
    let n = this.total_ * 8;
    this.inbuf_ < 56
      ? this.update(this.pad_, 56 - this.inbuf_)
      : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    for (let s = this.blockSize - 1; s >= 56; s--)
      (this.buf_[s] = n & 255), (n /= 256);
    this.compress_(this.buf_);
    let r = 0;
    for (let s = 0; s < 5; s++)
      for (let i = 24; i >= 0; i -= 8)
        (t[r] = (this.chain_[s] >> i) & 255), ++r;
    return t;
  }
}
function z_(e, t) {
  const n = new V_(e, t);
  return n.subscribe.bind(n);
}
class V_ {
  constructor(t, n) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = n),
      this.task
        .then(() => {
          t(this);
        })
        .catch((r) => {
          this.error(r);
        });
  }
  next(t) {
    this.forEachObserver((n) => {
      n.next(t);
    });
  }
  error(t) {
    this.forEachObserver((n) => {
      n.error(t);
    }),
      this.close(t);
  }
  complete() {
    this.forEachObserver((t) => {
      t.complete();
    }),
      this.close();
  }
  subscribe(t, n, r) {
    let s;
    if (t === void 0 && n === void 0 && r === void 0)
      throw new Error('Missing Observer.');
    K_(t, ['next', 'error', 'complete'])
      ? (s = t)
      : (s = { next: t, error: n, complete: r }),
      s.next === void 0 && (s.next = si),
      s.error === void 0 && (s.error = si),
      s.complete === void 0 && (s.complete = si);
    const i = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? s.error(this.finalError) : s.complete();
          } catch {}
        }),
      this.observers.push(s),
      i
    );
  }
  unsubscribeOne(t) {
    this.observers === void 0 ||
      this.observers[t] === void 0 ||
      (delete this.observers[t],
      (this.observerCount -= 1),
      this.observerCount === 0 &&
        this.onNoObservers !== void 0 &&
        this.onNoObservers(this));
  }
  forEachObserver(t) {
    if (!this.finalized)
      for (let n = 0; n < this.observers.length; n++) this.sendOne(n, t);
  }
  sendOne(t, n) {
    this.task.then(() => {
      if (this.observers !== void 0 && this.observers[t] !== void 0)
        try {
          n(this.observers[t]);
        } catch (r) {
          typeof console < 'u' && console.error && console.error(r);
        }
    });
  }
  close(t) {
    this.finalized ||
      ((this.finalized = !0),
      t !== void 0 && (this.finalError = t),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function K_(e, t) {
  if (typeof e != 'object' || e === null) return !1;
  for (const n of t) if (n in e && typeof e[n] == 'function') return !0;
  return !1;
}
function si() {}
function DE(e, t) {
  return `${e} failed: ${t} argument `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const BE = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e.charCodeAt(r);
      if (s >= 55296 && s <= 56319) {
        const i = s - 55296;
        r++, I_(r < e.length, 'Surrogate pair missing trail surrogate.');
        const o = e.charCodeAt(r) - 56320;
        s = 65536 + (i << 10) + o;
      }
      s < 128
        ? (t[n++] = s)
        : s < 2048
        ? ((t[n++] = (s >> 6) | 192), (t[n++] = (s & 63) | 128))
        : s < 65536
        ? ((t[n++] = (s >> 12) | 224),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (s & 63) | 128))
        : ((t[n++] = (s >> 18) | 240),
          (t[n++] = ((s >> 12) & 63) | 128),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (s & 63) | 128));
    }
    return t;
  },
  HE = function (e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n);
      r < 128
        ? t++
        : r < 2048
        ? (t += 2)
        : r >= 55296 && r <= 56319
        ? ((t += 4), n++)
        : (t += 3);
    }
    return t;
  };
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function en(e) {
  return e && e._delegate ? e._delegate : e;
}
class Rn {
  constructor(t, n, r) {
    (this.name = t),
      (this.instanceFactory = n),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = 'LAZY'),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(t) {
    return (this.instantiationMode = t), this;
  }
  setMultipleInstances(t) {
    return (this.multipleInstances = t), this;
  }
  setServiceProps(t) {
    return (this.serviceProps = t), this;
  }
  setInstanceCreatedCallback(t) {
    return (this.onInstanceCreated = t), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jt = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class q_ {
  constructor(t, n) {
    (this.name = t),
      (this.container = n),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(t) {
    const n = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(n)) {
      const r = new H_();
      if (
        (this.instancesDeferred.set(n, r),
        this.isInitialized(n) || this.shouldAutoInitialize())
      )
        try {
          const s = this.getOrInitializeService({ instanceIdentifier: n });
          s && r.resolve(s);
        } catch {}
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(t) {
    var n;
    const r = this.normalizeInstanceIdentifier(
        t == null ? void 0 : t.identifier
      ),
      s =
        (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: r });
      } catch (i) {
        if (s) return null;
        throw i;
      }
    else {
      if (s) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (J_(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: jt });
        } catch {}
      for (const [n, r] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(n);
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: s });
          r.resolve(i);
        } catch {}
      }
    }
  }
  clearInstance(t = jt) {
    this.instancesDeferred.delete(t),
      this.instancesOptions.delete(t),
      this.instances.delete(t);
  }
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((n) => 'INTERNAL' in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => '_delete' in n).map((n) => n._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = jt) {
    return this.instances.has(t);
  }
  getOptions(t = jt) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: n = {} } = t,
      r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const s = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n,
    });
    for (const [i, o] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(i);
      r === a && o.resolve(s);
    }
    return s;
  }
  onInit(t, n) {
    var r;
    const s = this.normalizeInstanceIdentifier(n),
      i =
        (r = this.onInitCallbacks.get(s)) !== null && r !== void 0
          ? r
          : new Set();
    i.add(t), this.onInitCallbacks.set(s, i);
    const o = this.instances.get(s);
    return (
      o && t(o, s),
      () => {
        i.delete(t);
      }
    );
  }
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n);
    if (!!r)
      for (const s of r)
        try {
          s(t, n);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t);
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: G_(t),
        options: n,
      })),
      this.instances.set(t, r),
      this.instancesOptions.set(t, n),
      this.invokeOnInitCallbacks(r, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, r);
      } catch {}
    return r || null;
  }
  normalizeInstanceIdentifier(t = jt) {
    return this.component ? (this.component.multipleInstances ? t : jt) : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== 'EXPLICIT';
  }
}
function G_(e) {
  return e === jt ? void 0 : e;
}
function J_(e) {
  return e.instantiationMode === 'EAGER';
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Z_ {
  constructor(t) {
    (this.name = t), (this.providers = new Map());
  }
  addComponent(t) {
    const n = this.getProvider(t.name);
    if (n.isComponentSet())
      throw new Error(
        `Component ${t.name} has already been registered with ${this.name}`
      );
    n.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t);
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t);
    const n = new q_(t, this);
    return this.providers.set(t, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var le;
(function (e) {
  (e[(e.DEBUG = 0)] = 'DEBUG'),
    (e[(e.VERBOSE = 1)] = 'VERBOSE'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.WARN = 3)] = 'WARN'),
    (e[(e.ERROR = 4)] = 'ERROR'),
    (e[(e.SILENT = 5)] = 'SILENT');
})(le || (le = {}));
const Y_ = {
    debug: le.DEBUG,
    verbose: le.VERBOSE,
    info: le.INFO,
    warn: le.WARN,
    error: le.ERROR,
    silent: le.SILENT,
  },
  X_ = le.INFO,
  Q_ = {
    [le.DEBUG]: 'log',
    [le.VERBOSE]: 'log',
    [le.INFO]: 'info',
    [le.WARN]: 'warn',
    [le.ERROR]: 'error',
  },
  ey = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const r = new Date().toISOString(),
      s = Q_[t];
    if (s) console[s](`[${r}]  ${e.name}:`, ...n);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
  };
class Su {
  constructor(t) {
    (this.name = t),
      (this._logLevel = X_),
      (this._logHandler = ey),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in le))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  setLogLevel(t) {
    this._logLevel = typeof t == 'string' ? Y_[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != 'function')
      throw new TypeError('Value assigned to `logHandler` must be a function');
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, le.DEBUG, ...t),
      this._logHandler(this, le.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, le.VERBOSE, ...t),
      this._logHandler(this, le.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, le.INFO, ...t),
      this._logHandler(this, le.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, le.WARN, ...t),
      this._logHandler(this, le.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, le.ERROR, ...t),
      this._logHandler(this, le.ERROR, ...t);
  }
}
const ty = (e, t) => t.some((n) => e instanceof n);
let Ya, Xa;
function ny() {
  return (
    Ya ||
    (Ya = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function ry() {
  return (
    Xa ||
    (Xa = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Au = new WeakMap(),
  Fi = new WeakMap(),
  Ru = new WeakMap(),
  ii = new WeakMap(),
  ko = new WeakMap();
function sy(e) {
  const t = new Promise((n, r) => {
    const s = () => {
        e.removeEventListener('success', i), e.removeEventListener('error', o);
      },
      i = () => {
        n(ft(e.result)), s();
      },
      o = () => {
        r(e.error), s();
      };
    e.addEventListener('success', i), e.addEventListener('error', o);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && Au.set(n, e);
      })
      .catch(() => {}),
    ko.set(t, e),
    t
  );
}
function iy(e) {
  if (Fi.has(e)) return;
  const t = new Promise((n, r) => {
    const s = () => {
        e.removeEventListener('complete', i),
          e.removeEventListener('error', o),
          e.removeEventListener('abort', o);
      },
      i = () => {
        n(), s();
      },
      o = () => {
        r(e.error || new DOMException('AbortError', 'AbortError')), s();
      };
    e.addEventListener('complete', i),
      e.addEventListener('error', o),
      e.addEventListener('abort', o);
  });
  Fi.set(e, t);
}
let Wi = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === 'done') return Fi.get(e);
      if (t === 'objectStoreNames') return e.objectStoreNames || Ru.get(e);
      if (t === 'store')
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return ft(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === 'done' || t === 'store')
      ? !0
      : t in e;
  },
};
function oy(e) {
  Wi = e(Wi);
}
function ay(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(oi(this), t, ...n);
        return Ru.set(r, t.sort ? t.sort() : [t]), ft(r);
      }
    : ry().includes(e)
    ? function (...t) {
        return e.apply(oi(this), t), ft(Au.get(this));
      }
    : function (...t) {
        return ft(e.apply(oi(this), t));
      };
}
function cy(e) {
  return typeof e == 'function'
    ? ay(e)
    : (e instanceof IDBTransaction && iy(e),
      ty(e, ny()) ? new Proxy(e, Wi) : e);
}
function ft(e) {
  if (e instanceof IDBRequest) return sy(e);
  if (ii.has(e)) return ii.get(e);
  const t = cy(e);
  return t !== e && (ii.set(e, t), ko.set(t, e)), t;
}
const oi = (e) => ko.get(e);
function ly(e, t, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
  const o = indexedDB.open(e, t),
    a = ft(o);
  return (
    r &&
      o.addEventListener('upgradeneeded', (c) => {
        r(ft(o.result), c.oldVersion, c.newVersion, ft(o.transaction));
      }),
    n && o.addEventListener('blocked', () => n()),
    a
      .then((c) => {
        i && c.addEventListener('close', () => i()),
          s && c.addEventListener('versionchange', () => s());
      })
      .catch(() => {}),
    a
  );
}
function UE(e, { blocked: t } = {}) {
  const n = indexedDB.deleteDatabase(e);
  return t && n.addEventListener('blocked', () => t()), ft(n).then(() => {});
}
const uy = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  fy = ['put', 'add', 'delete', 'clear'],
  ai = new Map();
function Qa(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return;
  if (ai.get(t)) return ai.get(t);
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    s = fy.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || uy.includes(n))
  )
    return;
  const i = async function (o, ...a) {
    const c = this.transaction(o, s ? 'readwrite' : 'readonly');
    let l = c.store;
    return (
      r && (l = l.index(a.shift())),
      (await Promise.all([l[n](...a), s && c.done]))[0]
    );
  };
  return ai.set(t, i), i;
}
oy((e) => ({
  ...e,
  get: (t, n, r) => Qa(t, n) || e.get(t, n, r),
  has: (t, n) => !!Qa(t, n) || e.has(t, n),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dy {
  constructor(t) {
    this.container = t;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (hy(n)) {
          const r = n.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((n) => n)
      .join(' ');
  }
}
function hy(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === 'VERSION';
}
const zi = '@firebase/app',
  ec = '0.9.0';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yt = new Su('@firebase/app'),
  py = '@firebase/app-compat',
  gy = '@firebase/analytics-compat',
  my = '@firebase/analytics',
  _y = '@firebase/app-check-compat',
  yy = '@firebase/app-check',
  vy = '@firebase/auth',
  by = '@firebase/auth-compat',
  wy = '@firebase/database',
  Ey = '@firebase/database-compat',
  Iy = '@firebase/functions',
  Cy = '@firebase/functions-compat',
  Ty = '@firebase/installations',
  ky = '@firebase/installations-compat',
  Sy = '@firebase/messaging',
  Ay = '@firebase/messaging-compat',
  Ry = '@firebase/performance',
  Py = '@firebase/performance-compat',
  Oy = '@firebase/remote-config',
  My = '@firebase/remote-config-compat',
  Ly = '@firebase/storage',
  $y = '@firebase/storage-compat',
  xy = '@firebase/firestore',
  Ny = '@firebase/firestore-compat',
  Dy = 'firebase',
  By = '9.15.0';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vi = '[DEFAULT]',
  Hy = {
    [zi]: 'fire-core',
    [py]: 'fire-core-compat',
    [my]: 'fire-analytics',
    [gy]: 'fire-analytics-compat',
    [yy]: 'fire-app-check',
    [_y]: 'fire-app-check-compat',
    [vy]: 'fire-auth',
    [by]: 'fire-auth-compat',
    [wy]: 'fire-rtdb',
    [Ey]: 'fire-rtdb-compat',
    [Iy]: 'fire-fn',
    [Cy]: 'fire-fn-compat',
    [Ty]: 'fire-iid',
    [ky]: 'fire-iid-compat',
    [Sy]: 'fire-fcm',
    [Ay]: 'fire-fcm-compat',
    [Ry]: 'fire-perf',
    [Py]: 'fire-perf-compat',
    [Oy]: 'fire-rc',
    [My]: 'fire-rc-compat',
    [Ly]: 'fire-gcs',
    [$y]: 'fire-gcs-compat',
    [xy]: 'fire-fst',
    [Ny]: 'fire-fst-compat',
    'fire-js': 'fire-js',
    [Dy]: 'fire-js-all',
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ds = new Map(),
  Ki = new Map();
function Uy(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    Yt.debug(
      `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
      n
    );
  }
}
function lr(e) {
  const t = e.name;
  if (Ki.has(t))
    return (
      Yt.debug(`There were multiple attempts to register component ${t}.`), !1
    );
  Ki.set(t, e);
  for (const n of ds.values()) Uy(n, e);
  return !0;
}
function Pu(e, t) {
  const n = e.container.getProvider('heartbeat').getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jy = {
    ['no-app']:
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    ['bad-app-name']: "Illegal App name: '{$appName}",
    ['duplicate-app']:
      "Firebase App named '{$appName}' already exists with different options or config",
    ['app-deleted']: "Firebase App named '{$appName}' already deleted",
    ['no-options']:
      'Need to provide options, when not being deployed to hosting via source.',
    ['invalid-app-argument']:
      'firebase.{$appName}() takes either no argument or a Firebase App instance.',
    ['invalid-log-argument']:
      'First argument to `onLog` must be null or a function.',
    ['idb-open']:
      'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
    ['idb-get']:
      'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
    ['idb-set']:
      'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
    ['idb-delete']:
      'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
  },
  Mt = new vr('app', 'Firebase', jy);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fy {
  constructor(t, n, r) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new Rn('app', () => this, 'PUBLIC'));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(t) {
    this._isDeleted = t;
  }
  checkDestroyed() {
    if (this.isDeleted) throw Mt.create('app-deleted', { appName: this._name });
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ns = By;
function Ou(e, t = {}) {
  let n = e;
  typeof t != 'object' && (t = { name: t });
  const r = Object.assign({ name: Vi, automaticDataCollectionEnabled: !1 }, t),
    s = r.name;
  if (typeof s != 'string' || !s)
    throw Mt.create('bad-app-name', { appName: String(s) });
  if ((n || (n = B_()), !n)) throw Mt.create('no-options');
  const i = ds.get(s);
  if (i) {
    if (fs(n, i.options) && fs(r, i.config)) return i;
    throw Mt.create('duplicate-app', { appName: s });
  }
  const o = new Z_(s);
  for (const c of Ki.values()) o.addComponent(c);
  const a = new Fy(n, r, o);
  return ds.set(s, a), a;
}
function Wy(e = Vi) {
  const t = ds.get(e);
  if (!t && e === Vi) return Ou();
  if (!t) throw Mt.create('no-app', { appName: e });
  return t;
}
function mn(e, t, n) {
  var r;
  let s = (r = Hy[e]) !== null && r !== void 0 ? r : e;
  n && (s += `-${n}`);
  const i = s.match(/\s|\//),
    o = t.match(/\s|\//);
  if (i || o) {
    const a = [`Unable to register library "${s}" with version "${t}":`];
    i &&
      a.push(
        `library name "${s}" contains illegal characters (whitespace or "/")`
      ),
      i && o && a.push('and'),
      o &&
        a.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
      Yt.warn(a.join(' '));
    return;
  }
  lr(new Rn(`${s}-version`, () => ({ library: s, version: t }), 'VERSION'));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zy = 'firebase-heartbeat-database',
  Vy = 1,
  ur = 'firebase-heartbeat-store';
let ci = null;
function Mu() {
  return (
    ci ||
      (ci = ly(zy, Vy, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              e.createObjectStore(ur);
          }
        },
      }).catch((e) => {
        throw Mt.create('idb-open', { originalErrorMessage: e.message });
      })),
    ci
  );
}
async function Ky(e) {
  try {
    return (await Mu()).transaction(ur).objectStore(ur).get(Lu(e));
  } catch (t) {
    if (t instanceof $t) Yt.warn(t.message);
    else {
      const n = Mt.create('idb-get', {
        originalErrorMessage: t == null ? void 0 : t.message,
      });
      Yt.warn(n.message);
    }
  }
}
async function tc(e, t) {
  try {
    const r = (await Mu()).transaction(ur, 'readwrite');
    return await r.objectStore(ur).put(t, Lu(e)), r.done;
  } catch (n) {
    if (n instanceof $t) Yt.warn(n.message);
    else {
      const r = Mt.create('idb-set', {
        originalErrorMessage: n == null ? void 0 : n.message,
      });
      Yt.warn(r.message);
    }
  }
}
function Lu(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const qy = 1024,
  Gy = 30 * 24 * 60 * 60 * 1e3;
class Jy {
  constructor(t) {
    (this.container = t), (this._heartbeatsCache = null);
    const n = this.container.getProvider('app').getImmediate();
    (this._storage = new Yy(n)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    const n = this.container
        .getProvider('platform-logger')
        .getImmediate()
        .getPlatformInfoString(),
      r = nc();
    if (
      (this._heartbeatsCache === null &&
        (this._heartbeatsCache = await this._heartbeatsCachePromise),
      !(
        this._heartbeatsCache.lastSentHeartbeatDate === r ||
        this._heartbeatsCache.heartbeats.some((s) => s.date === r)
      ))
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: r, agent: n }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((s) => {
            const i = new Date(s.date).valueOf();
            return Date.now() - i <= Gy;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  async getHeartbeatsHeader() {
    if (
      (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
      this._heartbeatsCache === null ||
        this._heartbeatsCache.heartbeats.length === 0)
    )
      return '';
    const t = nc(),
      { heartbeatsToSend: n, unsentEntries: r } = Zy(
        this._heartbeatsCache.heartbeats
      ),
      s = ls(JSON.stringify({ version: 2, heartbeats: n }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = t),
      r.length > 0
        ? ((this._heartbeatsCache.heartbeats = r),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      s
    );
  }
}
function nc() {
  return new Date().toISOString().substring(0, 10);
}
function Zy(e, t = qy) {
  const n = [];
  let r = e.slice();
  for (const s of e) {
    const i = n.find((o) => o.agent === s.agent);
    if (i) {
      if ((i.dates.push(s.date), rc(n) > t)) {
        i.dates.pop();
        break;
      }
    } else if ((n.push({ agent: s.agent, dates: [s.date] }), rc(n) > t)) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: n, unsentEntries: r };
}
class Yy {
  constructor(t) {
    (this.app = t),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return M_()
      ? L_()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    return (await this._canUseIndexedDBPromise)
      ? (await Ky(this.app)) || { heartbeats: [] }
      : { heartbeats: [] };
  }
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return tc(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : s.lastSentHeartbeatDate,
        heartbeats: t.heartbeats,
      });
    } else return;
  }
  async add(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return tc(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...t.heartbeats],
      });
    } else return;
  }
}
function rc(e) {
  return ls(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xy(e) {
  lr(new Rn('platform-logger', (t) => new dy(t), 'PRIVATE')),
    lr(new Rn('heartbeat', (t) => new Jy(t), 'PRIVATE')),
    mn(zi, ec, e),
    mn(zi, ec, 'esm2017'),
    mn('fire-js', '');
}
Xy('');
var Qy = 'firebase',
  ev = '9.15.0';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ mn(Qy, ev, 'app');
function So(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var s = 0, r = Object.getOwnPropertySymbols(e); s < r.length; s++)
      t.indexOf(r[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[s]) &&
        (n[r[s]] = e[r[s]]);
  return n;
}
function $u() {
  return {
    ['dependent-sdk-initialized-before-auth']:
      'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
  };
}
const tv = $u,
  xu = new vr('auth', 'Firebase', $u());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sc = new Su('@firebase/auth');
function qr(e, ...t) {
  sc.logLevel <= le.ERROR && sc.error(`Auth (${Ns}): ${e}`, ...t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ze(e, ...t) {
  throw Ao(e, ...t);
}
function nt(e, ...t) {
  return Ao(e, ...t);
}
function nv(e, t, n) {
  const r = Object.assign(Object.assign({}, tv()), { [t]: n });
  return new vr('auth', 'Firebase', r).create(t, { appName: e.name });
}
function Ao(e, ...t) {
  if (typeof e != 'string') {
    const n = t[0],
      r = [...t.slice(1)];
    return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r);
  }
  return xu.create(e, ...t);
}
function G(e, t, ...n) {
  if (!e) throw Ao(t, ...n);
}
function lt(e) {
  const t = 'INTERNAL ASSERTION FAILED: ' + e;
  throw (qr(t), new Error(t));
}
function pt(e, t) {
  e || lt(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ic = new Map();
function ut(e) {
  pt(e instanceof Function, 'Expected a class definition');
  let t = ic.get(e);
  return t
    ? (pt(t instanceof e, 'Instance stored in cache mismatched with class'), t)
    : ((t = new e()), ic.set(e, t), t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rv(e, t) {
  const n = Pu(e, 'auth');
  if (n.isInitialized()) {
    const s = n.getImmediate(),
      i = n.getOptions();
    if (fs(i, t != null ? t : {})) return s;
    Ze(s, 'already-initialized');
  }
  return n.initialize({ options: t });
}
function sv(e, t) {
  const n = (t == null ? void 0 : t.persistence) || [],
    r = (Array.isArray(n) ? n : [n]).map(ut);
  t != null && t.errorMap && e._updateErrorMap(t.errorMap),
    e._initializeWithPersistence(
      r,
      t == null ? void 0 : t.popupRedirectResolver
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function qi() {
  var e;
  return (
    (typeof self < 'u' &&
      ((e = self.location) === null || e === void 0 ? void 0 : e.href)) ||
    ''
  );
}
function iv() {
  return oc() === 'http:' || oc() === 'https:';
}
function oc() {
  var e;
  return (
    (typeof self < 'u' &&
      ((e = self.location) === null || e === void 0 ? void 0 : e.protocol)) ||
    null
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ov() {
  return typeof navigator < 'u' &&
    navigator &&
    'onLine' in navigator &&
    typeof navigator.onLine == 'boolean' &&
    (iv() || R_() || 'connection' in navigator)
    ? navigator.onLine
    : !0;
}
function av() {
  if (typeof navigator > 'u') return null;
  const e = navigator;
  return (e.languages && e.languages[0]) || e.language || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wr {
  constructor(t, n) {
    (this.shortDelay = t),
      (this.longDelay = n),
      pt(n > t, 'Short delay should be less than long delay!'),
      (this.isMobile = A_() || P_());
  }
  get() {
    return ov()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ro(e, t) {
  pt(e.emulator, 'Emulator should always be set here');
  const { url: n } = e.emulator;
  return t ? `${n}${t.startsWith('/') ? t.slice(1) : t}` : n;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nu {
  static initialize(t, n, r) {
    (this.fetchImpl = t),
      n && (this.headersImpl = n),
      r && (this.responseImpl = r);
  }
  static fetch() {
    if (this.fetchImpl) return this.fetchImpl;
    if (typeof self < 'u' && 'fetch' in self) return self.fetch;
    lt(
      'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
    );
  }
  static headers() {
    if (this.headersImpl) return this.headersImpl;
    if (typeof self < 'u' && 'Headers' in self) return self.Headers;
    lt(
      'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
    );
  }
  static response() {
    if (this.responseImpl) return this.responseImpl;
    if (typeof self < 'u' && 'Response' in self) return self.Response;
    lt(
      'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const cv = {
  CREDENTIAL_MISMATCH: 'custom-token-mismatch',
  MISSING_CUSTOM_TOKEN: 'internal-error',
  INVALID_IDENTIFIER: 'invalid-email',
  MISSING_CONTINUE_URI: 'internal-error',
  INVALID_PASSWORD: 'wrong-password',
  MISSING_PASSWORD: 'internal-error',
  EMAIL_EXISTS: 'email-already-in-use',
  PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
  INVALID_IDP_RESPONSE: 'invalid-credential',
  INVALID_PENDING_TOKEN: 'invalid-credential',
  FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
  MISSING_REQ_TYPE: 'internal-error',
  EMAIL_NOT_FOUND: 'user-not-found',
  RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
  EXPIRED_OOB_CODE: 'expired-action-code',
  INVALID_OOB_CODE: 'invalid-action-code',
  MISSING_OOB_CODE: 'internal-error',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
  INVALID_ID_TOKEN: 'invalid-user-token',
  TOKEN_EXPIRED: 'user-token-expired',
  USER_NOT_FOUND: 'user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
  INVALID_CODE: 'invalid-verification-code',
  INVALID_SESSION_INFO: 'invalid-verification-id',
  INVALID_TEMPORARY_PROOF: 'invalid-credential',
  MISSING_SESSION_INFO: 'missing-verification-id',
  SESSION_EXPIRED: 'code-expired',
  MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
  UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
  INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
  ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
  INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
  MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
  MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
  MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
  SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
  BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error',
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const lv = new wr(3e4, 6e4);
function Er(e, t) {
  return e.tenantId && !t.tenantId
    ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
    : t;
}
async function Ir(e, t, n, r, s = {}) {
  return Du(e, s, async () => {
    let i = {},
      o = {};
    r && (t === 'GET' ? (o = r) : (i = { body: JSON.stringify(r) }));
    const a = br(Object.assign({ key: e.config.apiKey }, o)).slice(1),
      c = await e._getAdditionalHeaders();
    return (
      (c['Content-Type'] = 'application/json'),
      e.languageCode && (c['X-Firebase-Locale'] = e.languageCode),
      Nu.fetch()(
        Bu(e, e.config.apiHost, n, a),
        Object.assign(
          { method: t, headers: c, referrerPolicy: 'no-referrer' },
          i
        )
      )
    );
  });
}
async function Du(e, t, n) {
  e._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, cv), t);
  try {
    const s = new uv(e),
      i = await Promise.race([n(), s.promise]);
    s.clearNetworkTimeout();
    const o = await i.json();
    if ('needConfirmation' in o)
      throw jr(e, 'account-exists-with-different-credential', o);
    if (i.ok && !('errorMessage' in o)) return o;
    {
      const a = i.ok ? o.errorMessage : o.error.message,
        [c, l] = a.split(' : ');
      if (c === 'FEDERATED_USER_ID_ALREADY_LINKED')
        throw jr(e, 'credential-already-in-use', o);
      if (c === 'EMAIL_EXISTS') throw jr(e, 'email-already-in-use', o);
      if (c === 'USER_DISABLED') throw jr(e, 'user-disabled', o);
      const u = r[c] || c.toLowerCase().replace(/[_\s]+/g, '-');
      if (l) throw nv(e, u, l);
      Ze(e, u);
    }
  } catch (s) {
    if (s instanceof $t) throw s;
    Ze(e, 'network-request-failed');
  }
}
async function Cr(e, t, n, r, s = {}) {
  const i = await Ir(e, t, n, r, s);
  return (
    'mfaPendingCredential' in i &&
      Ze(e, 'multi-factor-auth-required', { _serverResponse: i }),
    i
  );
}
function Bu(e, t, n, r) {
  const s = `${t}${n}?${r}`;
  return e.config.emulator ? Ro(e.config, s) : `${e.config.apiScheme}://${s}`;
}
class uv {
  constructor(t) {
    (this.auth = t),
      (this.timer = null),
      (this.promise = new Promise((n, r) => {
        this.timer = setTimeout(
          () => r(nt(this.auth, 'network-request-failed')),
          lv.get()
        );
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function jr(e, t, n) {
  const r = { appName: e.name };
  n.email && (r.email = n.email),
    n.phoneNumber && (r.phoneNumber = n.phoneNumber);
  const s = nt(e, t, r);
  return (s.customData._tokenResponse = n), s;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function fv(e, t) {
  return Ir(e, 'POST', '/v1/accounts:delete', t);
}
async function dv(e, t) {
  return Ir(e, 'POST', '/v1/accounts:lookup', t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tr(e) {
  if (!!e)
    try {
      const t = new Date(Number(e));
      if (!isNaN(t.getTime())) return t.toUTCString();
    } catch {}
}
async function hv(e, t = !1) {
  const n = en(e),
    r = await n.getIdToken(t),
    s = Po(r);
  G(s && s.exp && s.auth_time && s.iat, n.auth, 'internal-error');
  const i = typeof s.firebase == 'object' ? s.firebase : void 0,
    o = i == null ? void 0 : i.sign_in_provider;
  return {
    claims: s,
    token: r,
    authTime: tr(li(s.auth_time)),
    issuedAtTime: tr(li(s.iat)),
    expirationTime: tr(li(s.exp)),
    signInProvider: o || null,
    signInSecondFactor: (i == null ? void 0 : i.sign_in_second_factor) || null,
  };
}
function li(e) {
  return Number(e) * 1e3;
}
function Po(e) {
  const [t, n, r] = e.split('.');
  if (t === void 0 || n === void 0 || r === void 0)
    return qr('JWT malformed, contained fewer than 3 sections'), null;
  try {
    const s = us(n);
    return s
      ? JSON.parse(s)
      : (qr('Failed to decode base64 JWT payload'), null);
  } catch (s) {
    return (
      qr(
        'Caught error parsing JWT payload as JSON',
        s == null ? void 0 : s.toString()
      ),
      null
    );
  }
}
function pv(e) {
  const t = Po(e);
  return (
    G(t, 'internal-error'),
    G(typeof t.exp < 'u', 'internal-error'),
    G(typeof t.iat < 'u', 'internal-error'),
    Number(t.exp) - Number(t.iat)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function fr(e, t, n = !1) {
  if (n) return t;
  try {
    return await t;
  } catch (r) {
    throw (
      (r instanceof $t &&
        gv(r) &&
        e.auth.currentUser === e &&
        (await e.auth.signOut()),
      r)
    );
  }
}
function gv({ code: e }) {
  return e === 'auth/user-disabled' || e === 'auth/user-token-expired';
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mv {
  constructor(t) {
    (this.user = t),
      (this.isRunning = !1),
      (this.timerId = null),
      (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    !this.isRunning ||
      ((this.isRunning = !1),
      this.timerId !== null && clearTimeout(this.timerId));
  }
  getInterval(t) {
    var n;
    if (t) {
      const r = this.errorBackoff;
      return (this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), r;
    } else {
      this.errorBackoff = 3e4;
      const s =
        ((n = this.user.stsTokenManager.expirationTime) !== null && n !== void 0
          ? n
          : 0) -
        Date.now() -
        3e5;
      return Math.max(0, s);
    }
  }
  schedule(t = !1) {
    if (!this.isRunning) return;
    const n = this.getInterval(t);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, n);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (t) {
      (t == null ? void 0 : t.code) === 'auth/network-request-failed' &&
        this.schedule(!0);
      return;
    }
    this.schedule();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hu {
  constructor(t, n) {
    (this.createdAt = t), (this.lastLoginAt = n), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = tr(this.lastLoginAt)),
      (this.creationTime = tr(this.createdAt));
  }
  _copy(t) {
    (this.createdAt = t.createdAt),
      (this.lastLoginAt = t.lastLoginAt),
      this._initializeTime();
  }
  toJSON() {
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function hs(e) {
  var t;
  const n = e.auth,
    r = await e.getIdToken(),
    s = await fr(e, dv(n, { idToken: r }));
  G(s == null ? void 0 : s.users.length, n, 'internal-error');
  const i = s.users[0];
  e._notifyReloadListener(i);
  const o =
      !((t = i.providerUserInfo) === null || t === void 0) && t.length
        ? vv(i.providerUserInfo)
        : [],
    a = yv(e.providerData, o),
    c = e.isAnonymous,
    l = !(e.email && i.passwordHash) && !(a != null && a.length),
    u = c ? l : !1,
    f = {
      uid: i.localId,
      displayName: i.displayName || null,
      photoURL: i.photoUrl || null,
      email: i.email || null,
      emailVerified: i.emailVerified || !1,
      phoneNumber: i.phoneNumber || null,
      tenantId: i.tenantId || null,
      providerData: a,
      metadata: new Hu(i.createdAt, i.lastLoginAt),
      isAnonymous: u,
    };
  Object.assign(e, f);
}
async function _v(e) {
  const t = en(e);
  await hs(t),
    await t.auth._persistUserIfCurrent(t),
    t.auth._notifyListenersIfCurrent(t);
}
function yv(e, t) {
  return [
    ...e.filter((r) => !t.some((s) => s.providerId === r.providerId)),
    ...t,
  ];
}
function vv(e) {
  return e.map((t) => {
    var { providerId: n } = t,
      r = So(t, ['providerId']);
    return {
      providerId: n,
      uid: r.rawId || '',
      displayName: r.displayName || null,
      email: r.email || null,
      phoneNumber: r.phoneNumber || null,
      photoURL: r.photoUrl || null,
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function bv(e, t) {
  const n = await Du(e, {}, async () => {
    const r = br({ grant_type: 'refresh_token', refresh_token: t }).slice(1),
      { tokenApiHost: s, apiKey: i } = e.config,
      o = Bu(e, s, '/v1/token', `key=${i}`),
      a = await e._getAdditionalHeaders();
    return (
      (a['Content-Type'] = 'application/x-www-form-urlencoded'),
      Nu.fetch()(o, { method: 'POST', headers: a, body: r })
    );
  });
  return {
    accessToken: n.access_token,
    expiresIn: n.expires_in,
    refreshToken: n.refresh_token,
  };
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dr {
  constructor() {
    (this.refreshToken = null),
      (this.accessToken = null),
      (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(t) {
    G(t.idToken, 'internal-error'),
      G(typeof t.idToken < 'u', 'internal-error'),
      G(typeof t.refreshToken < 'u', 'internal-error');
    const n =
      'expiresIn' in t && typeof t.expiresIn < 'u'
        ? Number(t.expiresIn)
        : pv(t.idToken);
    this.updateTokensAndExpiration(t.idToken, t.refreshToken, n);
  }
  async getToken(t, n = !1) {
    return (
      G(!this.accessToken || this.refreshToken, t, 'user-token-expired'),
      !n && this.accessToken && !this.isExpired
        ? this.accessToken
        : this.refreshToken
        ? (await this.refresh(t, this.refreshToken), this.accessToken)
        : null
    );
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(t, n) {
    const { accessToken: r, refreshToken: s, expiresIn: i } = await bv(t, n);
    this.updateTokensAndExpiration(r, s, Number(i));
  }
  updateTokensAndExpiration(t, n, r) {
    (this.refreshToken = n || null),
      (this.accessToken = t || null),
      (this.expirationTime = Date.now() + r * 1e3);
  }
  static fromJSON(t, n) {
    const { refreshToken: r, accessToken: s, expirationTime: i } = n,
      o = new dr();
    return (
      r &&
        (G(typeof r == 'string', 'internal-error', { appName: t }),
        (o.refreshToken = r)),
      s &&
        (G(typeof s == 'string', 'internal-error', { appName: t }),
        (o.accessToken = s)),
      i &&
        (G(typeof i == 'number', 'internal-error', { appName: t }),
        (o.expirationTime = i)),
      o
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime,
    };
  }
  _assign(t) {
    (this.accessToken = t.accessToken),
      (this.refreshToken = t.refreshToken),
      (this.expirationTime = t.expirationTime);
  }
  _clone() {
    return Object.assign(new dr(), this.toJSON());
  }
  _performRefresh() {
    return lt('not implemented');
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Et(e, t) {
  G(typeof e == 'string' || typeof e > 'u', 'internal-error', { appName: t });
}
class Zt {
  constructor(t) {
    var { uid: n, auth: r, stsTokenManager: s } = t,
      i = So(t, ['uid', 'auth', 'stsTokenManager']);
    (this.providerId = 'firebase'),
      (this.proactiveRefresh = new mv(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = n),
      (this.auth = r),
      (this.stsTokenManager = s),
      (this.accessToken = s.accessToken),
      (this.displayName = i.displayName || null),
      (this.email = i.email || null),
      (this.emailVerified = i.emailVerified || !1),
      (this.phoneNumber = i.phoneNumber || null),
      (this.photoURL = i.photoURL || null),
      (this.isAnonymous = i.isAnonymous || !1),
      (this.tenantId = i.tenantId || null),
      (this.providerData = i.providerData ? [...i.providerData] : []),
      (this.metadata = new Hu(i.createdAt || void 0, i.lastLoginAt || void 0));
  }
  async getIdToken(t) {
    const n = await fr(this, this.stsTokenManager.getToken(this.auth, t));
    return (
      G(n, this.auth, 'internal-error'),
      this.accessToken !== n &&
        ((this.accessToken = n),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      n
    );
  }
  getIdTokenResult(t) {
    return hv(this, t);
  }
  reload() {
    return _v(this);
  }
  _assign(t) {
    this !== t &&
      (G(this.uid === t.uid, this.auth, 'internal-error'),
      (this.displayName = t.displayName),
      (this.photoURL = t.photoURL),
      (this.email = t.email),
      (this.emailVerified = t.emailVerified),
      (this.phoneNumber = t.phoneNumber),
      (this.isAnonymous = t.isAnonymous),
      (this.tenantId = t.tenantId),
      (this.providerData = t.providerData.map((n) => Object.assign({}, n))),
      this.metadata._copy(t.metadata),
      this.stsTokenManager._assign(t.stsTokenManager));
  }
  _clone(t) {
    return new Zt(
      Object.assign(Object.assign({}, this), {
        auth: t,
        stsTokenManager: this.stsTokenManager._clone(),
      })
    );
  }
  _onReload(t) {
    G(!this.reloadListener, this.auth, 'internal-error'),
      (this.reloadListener = t),
      this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo),
        (this.reloadUserInfo = null));
  }
  _notifyReloadListener(t) {
    this.reloadListener ? this.reloadListener(t) : (this.reloadUserInfo = t);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(t, n = !1) {
    let r = !1;
    t.idToken &&
      t.idToken !== this.stsTokenManager.accessToken &&
      (this.stsTokenManager.updateFromServerResponse(t), (r = !0)),
      n && (await hs(this)),
      await this.auth._persistUserIfCurrent(this),
      r && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    const t = await this.getIdToken();
    return (
      await fr(this, fv(this.auth, { idToken: t })),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((t) => Object.assign({}, t)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON()
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name }
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || '';
  }
  static _fromJSON(t, n) {
    var r, s, i, o, a, c, l, u;
    const f = (r = n.displayName) !== null && r !== void 0 ? r : void 0,
      d = (s = n.email) !== null && s !== void 0 ? s : void 0,
      g = (i = n.phoneNumber) !== null && i !== void 0 ? i : void 0,
      m = (o = n.photoURL) !== null && o !== void 0 ? o : void 0,
      E = (a = n.tenantId) !== null && a !== void 0 ? a : void 0,
      R = (c = n._redirectEventId) !== null && c !== void 0 ? c : void 0,
      y = (l = n.createdAt) !== null && l !== void 0 ? l : void 0,
      p = (u = n.lastLoginAt) !== null && u !== void 0 ? u : void 0,
      {
        uid: v,
        emailVerified: I,
        isAnonymous: O,
        providerData: L,
        stsTokenManager: x,
      } = n;
    G(v && x, t, 'internal-error');
    const k = dr.fromJSON(this.name, x);
    G(typeof v == 'string', t, 'internal-error'),
      Et(f, t.name),
      Et(d, t.name),
      G(typeof I == 'boolean', t, 'internal-error'),
      G(typeof O == 'boolean', t, 'internal-error'),
      Et(g, t.name),
      Et(m, t.name),
      Et(E, t.name),
      Et(R, t.name),
      Et(y, t.name),
      Et(p, t.name);
    const H = new Zt({
      uid: v,
      auth: t,
      email: d,
      emailVerified: I,
      displayName: f,
      isAnonymous: O,
      photoURL: m,
      phoneNumber: g,
      tenantId: E,
      stsTokenManager: k,
      createdAt: y,
      lastLoginAt: p,
    });
    return (
      L &&
        Array.isArray(L) &&
        (H.providerData = L.map((U) => Object.assign({}, U))),
      R && (H._redirectEventId = R),
      H
    );
  }
  static async _fromIdTokenResponse(t, n, r = !1) {
    const s = new dr();
    s.updateFromServerResponse(n);
    const i = new Zt({
      uid: n.localId,
      auth: t,
      stsTokenManager: s,
      isAnonymous: r,
    });
    return await hs(i), i;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uu {
  constructor() {
    (this.type = 'NONE'), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(t, n) {
    this.storage[t] = n;
  }
  async _get(t) {
    const n = this.storage[t];
    return n === void 0 ? null : n;
  }
  async _remove(t) {
    delete this.storage[t];
  }
  _addListener(t, n) {}
  _removeListener(t, n) {}
}
Uu.type = 'NONE';
const ac = Uu;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Gr(e, t, n) {
  return `firebase:${e}:${t}:${n}`;
}
class _n {
  constructor(t, n, r) {
    (this.persistence = t), (this.auth = n), (this.userKey = r);
    const { config: s, name: i } = this.auth;
    (this.fullUserKey = Gr(this.userKey, s.apiKey, i)),
      (this.fullPersistenceKey = Gr('persistence', s.apiKey, i)),
      (this.boundEventHandler = n._onStorageEvent.bind(n)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(t) {
    return this.persistence._set(this.fullUserKey, t.toJSON());
  }
  async getCurrentUser() {
    const t = await this.persistence._get(this.fullUserKey);
    return t ? Zt._fromJSON(this.auth, t) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(
      this.fullPersistenceKey,
      this.persistence.type
    );
  }
  async setPersistence(t) {
    if (this.persistence === t) return;
    const n = await this.getCurrentUser();
    if ((await this.removeCurrentUser(), (this.persistence = t), n))
      return this.setCurrentUser(n);
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(t, n, r = 'authUser') {
    if (!n.length) return new _n(ut(ac), t, r);
    const s = (
      await Promise.all(
        n.map(async (l) => {
          if (await l._isAvailable()) return l;
        })
      )
    ).filter((l) => l);
    let i = s[0] || ut(ac);
    const o = Gr(r, t.config.apiKey, t.name);
    let a = null;
    for (const l of n)
      try {
        const u = await l._get(o);
        if (u) {
          const f = Zt._fromJSON(t, u);
          l !== i && (a = f), (i = l);
          break;
        }
      } catch {}
    const c = s.filter((l) => l._shouldAllowMigration);
    return !i._shouldAllowMigration || !c.length
      ? new _n(i, t, r)
      : ((i = c[0]),
        a && (await i._set(o, a.toJSON())),
        await Promise.all(
          n.map(async (l) => {
            if (l !== i)
              try {
                await l._remove(o);
              } catch {}
          })
        ),
        new _n(i, t, r));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function cc(e) {
  const t = e.toLowerCase();
  if (t.includes('opera/') || t.includes('opr/') || t.includes('opios/'))
    return 'Opera';
  if (Wu(t)) return 'IEMobile';
  if (t.includes('msie') || t.includes('trident/')) return 'IE';
  if (t.includes('edge/')) return 'Edge';
  if (ju(t)) return 'Firefox';
  if (t.includes('silk/')) return 'Silk';
  if (Vu(t)) return 'Blackberry';
  if (Ku(t)) return 'Webos';
  if (Oo(t)) return 'Safari';
  if ((t.includes('chrome/') || Fu(t)) && !t.includes('edge/')) return 'Chrome';
  if (zu(t)) return 'Android';
  {
    const n = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      r = e.match(n);
    if ((r == null ? void 0 : r.length) === 2) return r[1];
  }
  return 'Other';
}
function ju(e = Te()) {
  return /firefox\//i.test(e);
}
function Oo(e = Te()) {
  const t = e.toLowerCase();
  return (
    t.includes('safari/') &&
    !t.includes('chrome/') &&
    !t.includes('crios/') &&
    !t.includes('android')
  );
}
function Fu(e = Te()) {
  return /crios\//i.test(e);
}
function Wu(e = Te()) {
  return /iemobile/i.test(e);
}
function zu(e = Te()) {
  return /android/i.test(e);
}
function Vu(e = Te()) {
  return /blackberry/i.test(e);
}
function Ku(e = Te()) {
  return /webos/i.test(e);
}
function Ds(e = Te()) {
  return (
    /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e))
  );
}
function wv(e = Te()) {
  var t;
  return (
    Ds(e) &&
    !!(!((t = window.navigator) === null || t === void 0) && t.standalone)
  );
}
function Ev() {
  return O_() && document.documentMode === 10;
}
function qu(e = Te()) {
  return Ds(e) || zu(e) || Ku(e) || Vu(e) || /windows phone/i.test(e) || Wu(e);
}
function Iv() {
  try {
    return !!(window && window !== window.top);
  } catch {
    return !1;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Gu(e, t = []) {
  let n;
  switch (e) {
    case 'Browser':
      n = cc(Te());
      break;
    case 'Worker':
      n = `${cc(Te())}-${e}`;
      break;
    default:
      n = e;
  }
  const r = t.length ? t.join(',') : 'FirebaseCore-web';
  return `${n}/JsCore/${Ns}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Cv {
  constructor(t) {
    (this.auth = t), (this.queue = []);
  }
  pushCallback(t, n) {
    const r = (i) =>
      new Promise((o, a) => {
        try {
          const c = t(i);
          o(c);
        } catch (c) {
          a(c);
        }
      });
    (r.onAbort = n), this.queue.push(r);
    const s = this.queue.length - 1;
    return () => {
      this.queue[s] = () => Promise.resolve();
    };
  }
  async runMiddleware(t) {
    if (this.auth.currentUser === t) return;
    const n = [];
    try {
      for (const r of this.queue) await r(t), r.onAbort && n.push(r.onAbort);
    } catch (r) {
      n.reverse();
      for (const s of n)
        try {
          s();
        } catch {}
      throw this.auth._errorFactory.create('login-blocked', {
        originalMessage: r == null ? void 0 : r.message,
      });
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Tv {
  constructor(t, n, r) {
    (this.app = t),
      (this.heartbeatServiceProvider = n),
      (this.config = r),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new lc(this)),
      (this.idTokenSubscription = new lc(this)),
      (this.beforeStateQueue = new Cv(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = xu),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = t.name),
      (this.clientVersion = r.sdkClientVersion);
  }
  _initializeWithPersistence(t, n) {
    return (
      n && (this._popupRedirectResolver = ut(n)),
      (this._initializationPromise = this.queue(async () => {
        var r, s;
        if (
          !this._deleted &&
          ((this.persistenceManager = await _n.create(this, t)), !this._deleted)
        ) {
          if (
            !((r = this._popupRedirectResolver) === null || r === void 0) &&
            r._shouldInitProactively
          )
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch {}
          await this.initializeCurrentUser(n),
            (this.lastNotifiedUid =
              ((s = this.currentUser) === null || s === void 0
                ? void 0
                : s.uid) || null),
            !this._deleted && (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  async _onStorageEvent() {
    if (this._deleted) return;
    const t = await this.assertedPersistence.getCurrentUser();
    if (!(!this.currentUser && !t)) {
      if (this.currentUser && t && this.currentUser.uid === t.uid) {
        this._currentUser._assign(t), await this.currentUser.getIdToken();
        return;
      }
      await this._updateCurrentUser(t, !0);
    }
  }
  async initializeCurrentUser(t) {
    var n;
    const r = await this.assertedPersistence.getCurrentUser();
    let s = r,
      i = !1;
    if (t && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const o =
          (n = this.redirectUser) === null || n === void 0
            ? void 0
            : n._redirectEventId,
        a = s == null ? void 0 : s._redirectEventId,
        c = await this.tryRedirectSignIn(t);
      (!o || o === a) &&
        (c == null ? void 0 : c.user) &&
        ((s = c.user), (i = !0));
    }
    if (!s) return this.directlySetCurrentUser(null);
    if (!s._redirectEventId) {
      if (i)
        try {
          await this.beforeStateQueue.runMiddleware(s);
        } catch (o) {
          (s = r),
            this._popupRedirectResolver._overrideRedirectResult(this, () =>
              Promise.reject(o)
            );
        }
      return s
        ? this.reloadAndSetCurrentUserOrClear(s)
        : this.directlySetCurrentUser(null);
    }
    return (
      G(this._popupRedirectResolver, this, 'argument-error'),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser &&
      this.redirectUser._redirectEventId === s._redirectEventId
        ? this.directlySetCurrentUser(s)
        : this.reloadAndSetCurrentUserOrClear(s)
    );
  }
  async tryRedirectSignIn(t) {
    let n = null;
    try {
      n = await this._popupRedirectResolver._completeRedirectFn(this, t, !0);
    } catch {
      await this._setRedirectUser(null);
    }
    return n;
  }
  async reloadAndSetCurrentUserOrClear(t) {
    try {
      await hs(t);
    } catch (n) {
      if ((n == null ? void 0 : n.code) !== 'auth/network-request-failed')
        return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(t);
  }
  useDeviceLanguage() {
    this.languageCode = av();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(t) {
    const n = t ? en(t) : null;
    return (
      n &&
        G(
          n.auth.config.apiKey === this.config.apiKey,
          this,
          'invalid-user-token'
        ),
      this._updateCurrentUser(n && n._clone(this))
    );
  }
  async _updateCurrentUser(t, n = !1) {
    if (!this._deleted)
      return (
        t && G(this.tenantId === t.tenantId, this, 'tenant-id-mismatch'),
        n || (await this.beforeStateQueue.runMiddleware(t)),
        this.queue(async () => {
          await this.directlySetCurrentUser(t), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return (
      await this.beforeStateQueue.runMiddleware(null),
      (this.redirectPersistenceManager || this._popupRedirectResolver) &&
        (await this._setRedirectUser(null)),
      this._updateCurrentUser(null, !0)
    );
  }
  setPersistence(t) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(ut(t));
    });
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(t) {
    this._errorFactory = new vr('auth', 'Firebase', t());
  }
  onAuthStateChanged(t, n, r) {
    return this.registerStateListener(this.authStateSubscription, t, n, r);
  }
  beforeAuthStateChanged(t, n) {
    return this.beforeStateQueue.pushCallback(t, n);
  }
  onIdTokenChanged(t, n, r) {
    return this.registerStateListener(this.idTokenSubscription, t, n, r);
  }
  toJSON() {
    var t;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser:
        (t = this._currentUser) === null || t === void 0 ? void 0 : t.toJSON(),
    };
  }
  async _setRedirectUser(t, n) {
    const r = await this.getOrInitRedirectPersistenceManager(n);
    return t === null ? r.removeCurrentUser() : r.setCurrentUser(t);
  }
  async getOrInitRedirectPersistenceManager(t) {
    if (!this.redirectPersistenceManager) {
      const n = (t && ut(t)) || this._popupRedirectResolver;
      G(n, this, 'argument-error'),
        (this.redirectPersistenceManager = await _n.create(
          this,
          [ut(n._redirectPersistence)],
          'redirectUser'
        )),
        (this.redirectUser =
          await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(t) {
    var n, r;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      ((n = this._currentUser) === null || n === void 0
        ? void 0
        : n._redirectEventId) === t
        ? this._currentUser
        : ((r = this.redirectUser) === null || r === void 0
            ? void 0
            : r._redirectEventId) === t
        ? this.redirectUser
        : null
    );
  }
  async _persistUserIfCurrent(t) {
    if (t === this.currentUser)
      return this.queue(async () => this.directlySetCurrentUser(t));
  }
  _notifyListenersIfCurrent(t) {
    t === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0),
      this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1),
      this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var t, n;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const r =
      (n = (t = this.currentUser) === null || t === void 0 ? void 0 : t.uid) !==
        null && n !== void 0
        ? n
        : null;
    this.lastNotifiedUid !== r &&
      ((this.lastNotifiedUid = r),
      this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(t, n, r, s) {
    if (this._deleted) return () => {};
    const i = typeof n == 'function' ? n : n.next.bind(n),
      o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
    return (
      G(o, this, 'internal-error'),
      o.then(() => i(this.currentUser)),
      typeof n == 'function' ? t.addObserver(n, r, s) : t.addObserver(n)
    );
  }
  async directlySetCurrentUser(t) {
    this.currentUser &&
      this.currentUser !== t &&
      this._currentUser._stopProactiveRefresh(),
      t && this.isProactiveRefreshEnabled && t._startProactiveRefresh(),
      (this.currentUser = t),
      t
        ? await this.assertedPersistence.setCurrentUser(t)
        : await this.assertedPersistence.removeCurrentUser();
  }
  queue(t) {
    return (this.operations = this.operations.then(t, t)), this.operations;
  }
  get assertedPersistence() {
    return (
      G(this.persistenceManager, this, 'internal-error'),
      this.persistenceManager
    );
  }
  _logFramework(t) {
    !t ||
      this.frameworks.includes(t) ||
      (this.frameworks.push(t),
      this.frameworks.sort(),
      (this.clientVersion = Gu(
        this.config.clientPlatform,
        this._getFrameworks()
      )));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var t;
    const n = { ['X-Client-Version']: this.clientVersion };
    this.app.options.appId && (n['X-Firebase-gmpid'] = this.app.options.appId);
    const r = await ((t = this.heartbeatServiceProvider.getImmediate({
      optional: !0,
    })) === null || t === void 0
      ? void 0
      : t.getHeartbeatsHeader());
    return r && (n['X-Firebase-Client'] = r), n;
  }
}
function Tr(e) {
  return en(e);
}
class lc {
  constructor(t) {
    (this.auth = t),
      (this.observer = null),
      (this.addObserver = z_((n) => (this.observer = n)));
  }
  get next() {
    return (
      G(this.observer, this.auth, 'internal-error'),
      this.observer.next.bind(this.observer)
    );
  }
}
function kv(e, t, n) {
  const r = Tr(e);
  G(r._canInitEmulator, r, 'emulator-config-failed'),
    G(/^https?:\/\//.test(t), r, 'invalid-emulator-scheme');
  const s = !!(n != null && n.disableWarnings),
    i = Ju(t),
    { host: o, port: a } = Sv(t),
    c = a === null ? '' : `:${a}`;
  (r.config.emulator = { url: `${i}//${o}${c}/` }),
    (r.settings.appVerificationDisabledForTesting = !0),
    (r.emulatorConfig = Object.freeze({
      host: o,
      port: a,
      protocol: i.replace(':', ''),
      options: Object.freeze({ disableWarnings: s }),
    })),
    s || Av();
}
function Ju(e) {
  const t = e.indexOf(':');
  return t < 0 ? '' : e.substr(0, t + 1);
}
function Sv(e) {
  const t = Ju(e),
    n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
  if (!n) return { host: '', port: null };
  const r = n[2].split('@').pop() || '',
    s = /^(\[[^\]]+\])(:|$)/.exec(r);
  if (s) {
    const i = s[1];
    return { host: i, port: uc(r.substr(i.length + 1)) };
  } else {
    const [i, o] = r.split(':');
    return { host: i, port: uc(o) };
  }
}
function uc(e) {
  if (!e) return null;
  const t = Number(e);
  return isNaN(t) ? null : t;
}
function Av() {
  function e() {
    const t = document.createElement('p'),
      n = t.style;
    (t.innerText =
      'Running in emulator mode. Do not use with production credentials.'),
      (n.position = 'fixed'),
      (n.width = '100%'),
      (n.backgroundColor = '#ffffff'),
      (n.border = '.1em solid #000000'),
      (n.color = '#b50000'),
      (n.bottom = '0px'),
      (n.left = '0px'),
      (n.margin = '0px'),
      (n.zIndex = '10000'),
      (n.textAlign = 'center'),
      t.classList.add('firebase-emulator-warning'),
      document.body.appendChild(t);
  }
  typeof console < 'u' &&
    typeof console.info == 'function' &&
    console.info(
      'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
    ),
    typeof window < 'u' &&
      typeof document < 'u' &&
      (document.readyState === 'loading'
        ? window.addEventListener('DOMContentLoaded', e)
        : e());
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mo {
  constructor(t, n) {
    (this.providerId = t), (this.signInMethod = n);
  }
  toJSON() {
    return lt('not implemented');
  }
  _getIdTokenResponse(t) {
    return lt('not implemented');
  }
  _linkToIdToken(t, n) {
    return lt('not implemented');
  }
  _getReauthenticationResolver(t) {
    return lt('not implemented');
  }
}
async function Rv(e, t) {
  return Ir(e, 'POST', '/v1/accounts:update', t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Pv(e, t) {
  return Cr(e, 'POST', '/v1/accounts:signInWithPassword', Er(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Ov(e, t) {
  return Cr(e, 'POST', '/v1/accounts:signInWithEmailLink', Er(e, t));
}
async function Mv(e, t) {
  return Cr(e, 'POST', '/v1/accounts:signInWithEmailLink', Er(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hr extends Mo {
  constructor(t, n, r, s = null) {
    super('password', r),
      (this._email = t),
      (this._password = n),
      (this._tenantId = s);
  }
  static _fromEmailAndPassword(t, n) {
    return new hr(t, n, 'password');
  }
  static _fromEmailAndCode(t, n, r = null) {
    return new hr(t, n, 'emailLink', r);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
  static fromJSON(t) {
    const n = typeof t == 'string' ? JSON.parse(t) : t;
    if ((n == null ? void 0 : n.email) && (n == null ? void 0 : n.password)) {
      if (n.signInMethod === 'password')
        return this._fromEmailAndPassword(n.email, n.password);
      if (n.signInMethod === 'emailLink')
        return this._fromEmailAndCode(n.email, n.password, n.tenantId);
    }
    return null;
  }
  async _getIdTokenResponse(t) {
    switch (this.signInMethod) {
      case 'password':
        return Pv(t, {
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
        });
      case 'emailLink':
        return Ov(t, { email: this._email, oobCode: this._password });
      default:
        Ze(t, 'internal-error');
    }
  }
  async _linkToIdToken(t, n) {
    switch (this.signInMethod) {
      case 'password':
        return Rv(t, {
          idToken: n,
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
        });
      case 'emailLink':
        return Mv(t, {
          idToken: n,
          email: this._email,
          oobCode: this._password,
        });
      default:
        Ze(t, 'internal-error');
    }
  }
  _getReauthenticationResolver(t) {
    return this._getIdTokenResponse(t);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function yn(e, t) {
  return Cr(e, 'POST', '/v1/accounts:signInWithIdp', Er(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Lv = 'http://localhost';
class Xt extends Mo {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(t) {
    const n = new Xt(t.providerId, t.signInMethod);
    return (
      t.idToken || t.accessToken
        ? (t.idToken && (n.idToken = t.idToken),
          t.accessToken && (n.accessToken = t.accessToken),
          t.nonce && !t.pendingToken && (n.nonce = t.nonce),
          t.pendingToken && (n.pendingToken = t.pendingToken))
        : t.oauthToken && t.oauthTokenSecret
        ? ((n.accessToken = t.oauthToken), (n.secret = t.oauthTokenSecret))
        : Ze('argument-error'),
      n
    );
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod,
    };
  }
  static fromJSON(t) {
    const n = typeof t == 'string' ? JSON.parse(t) : t,
      { providerId: r, signInMethod: s } = n,
      i = So(n, ['providerId', 'signInMethod']);
    if (!r || !s) return null;
    const o = new Xt(r, s);
    return (
      (o.idToken = i.idToken || void 0),
      (o.accessToken = i.accessToken || void 0),
      (o.secret = i.secret),
      (o.nonce = i.nonce),
      (o.pendingToken = i.pendingToken || null),
      o
    );
  }
  _getIdTokenResponse(t) {
    const n = this.buildRequest();
    return yn(t, n);
  }
  _linkToIdToken(t, n) {
    const r = this.buildRequest();
    return (r.idToken = n), yn(t, r);
  }
  _getReauthenticationResolver(t) {
    const n = this.buildRequest();
    return (n.autoCreate = !1), yn(t, n);
  }
  buildRequest() {
    const t = { requestUri: Lv, returnSecureToken: !0 };
    if (this.pendingToken) t.pendingToken = this.pendingToken;
    else {
      const n = {};
      this.idToken && (n.id_token = this.idToken),
        this.accessToken && (n.access_token = this.accessToken),
        this.secret && (n.oauth_token_secret = this.secret),
        (n.providerId = this.providerId),
        this.nonce && !this.pendingToken && (n.nonce = this.nonce),
        (t.postBody = br(n));
    }
    return t;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $v(e) {
  switch (e) {
    case 'recoverEmail':
      return 'RECOVER_EMAIL';
    case 'resetPassword':
      return 'PASSWORD_RESET';
    case 'signIn':
      return 'EMAIL_SIGNIN';
    case 'verifyEmail':
      return 'VERIFY_EMAIL';
    case 'verifyAndChangeEmail':
      return 'VERIFY_AND_CHANGE_EMAIL';
    case 'revertSecondFactorAddition':
      return 'REVERT_SECOND_FACTOR_ADDITION';
    default:
      return null;
  }
}
function xv(e) {
  const t = Kn(qn(e)).link,
    n = t ? Kn(qn(t)).deep_link_id : null,
    r = Kn(qn(e)).deep_link_id;
  return (r ? Kn(qn(r)).link : null) || r || n || t || e;
}
class Lo {
  constructor(t) {
    var n, r, s, i, o, a;
    const c = Kn(qn(t)),
      l = (n = c.apiKey) !== null && n !== void 0 ? n : null,
      u = (r = c.oobCode) !== null && r !== void 0 ? r : null,
      f = $v((s = c.mode) !== null && s !== void 0 ? s : null);
    G(l && u && f, 'argument-error'),
      (this.apiKey = l),
      (this.operation = f),
      (this.code = u),
      (this.continueUrl =
        (i = c.continueUrl) !== null && i !== void 0 ? i : null),
      (this.languageCode =
        (o = c.languageCode) !== null && o !== void 0 ? o : null),
      (this.tenantId = (a = c.tenantId) !== null && a !== void 0 ? a : null);
  }
  static parseLink(t) {
    const n = xv(t);
    try {
      return new Lo(n);
    } catch {
      return null;
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bn {
  constructor() {
    this.providerId = Bn.PROVIDER_ID;
  }
  static credential(t, n) {
    return hr._fromEmailAndPassword(t, n);
  }
  static credentialWithLink(t, n) {
    const r = Lo.parseLink(n);
    return G(r, 'argument-error'), hr._fromEmailAndCode(t, r.code, r.tenantId);
  }
}
Bn.PROVIDER_ID = 'password';
Bn.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password';
Bn.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zu {
  constructor(t) {
    (this.providerId = t),
      (this.defaultLanguageCode = null),
      (this.customParameters = {});
  }
  setDefaultLanguage(t) {
    this.defaultLanguageCode = t;
  }
  setCustomParameters(t) {
    return (this.customParameters = t), this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kr extends Zu {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(t) {
    return this.scopes.includes(t) || this.scopes.push(t), this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kt extends kr {
  constructor() {
    super('facebook.com');
  }
  static credential(t) {
    return Xt._fromParams({
      providerId: kt.PROVIDER_ID,
      signInMethod: kt.FACEBOOK_SIGN_IN_METHOD,
      accessToken: t,
    });
  }
  static credentialFromResult(t) {
    return kt.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return kt.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t || !('oauthAccessToken' in t) || !t.oauthAccessToken) return null;
    try {
      return kt.credential(t.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
kt.FACEBOOK_SIGN_IN_METHOD = 'facebook.com';
kt.PROVIDER_ID = 'facebook.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class St extends kr {
  constructor() {
    super('google.com'), this.addScope('profile');
  }
  static credential(t, n) {
    return Xt._fromParams({
      providerId: St.PROVIDER_ID,
      signInMethod: St.GOOGLE_SIGN_IN_METHOD,
      idToken: t,
      accessToken: n,
    });
  }
  static credentialFromResult(t) {
    return St.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return St.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    const { oauthIdToken: n, oauthAccessToken: r } = t;
    if (!n && !r) return null;
    try {
      return St.credential(n, r);
    } catch {
      return null;
    }
  }
}
St.GOOGLE_SIGN_IN_METHOD = 'google.com';
St.PROVIDER_ID = 'google.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class At extends kr {
  constructor() {
    super('github.com');
  }
  static credential(t) {
    return Xt._fromParams({
      providerId: At.PROVIDER_ID,
      signInMethod: At.GITHUB_SIGN_IN_METHOD,
      accessToken: t,
    });
  }
  static credentialFromResult(t) {
    return At.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return At.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t || !('oauthAccessToken' in t) || !t.oauthAccessToken) return null;
    try {
      return At.credential(t.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
At.GITHUB_SIGN_IN_METHOD = 'github.com';
At.PROVIDER_ID = 'github.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rt extends kr {
  constructor() {
    super('twitter.com');
  }
  static credential(t, n) {
    return Xt._fromParams({
      providerId: Rt.PROVIDER_ID,
      signInMethod: Rt.TWITTER_SIGN_IN_METHOD,
      oauthToken: t,
      oauthTokenSecret: n,
    });
  }
  static credentialFromResult(t) {
    return Rt.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return Rt.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    const { oauthAccessToken: n, oauthTokenSecret: r } = t;
    if (!n || !r) return null;
    try {
      return Rt.credential(n, r);
    } catch {
      return null;
    }
  }
}
Rt.TWITTER_SIGN_IN_METHOD = 'twitter.com';
Rt.PROVIDER_ID = 'twitter.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Nv(e, t) {
  return Cr(e, 'POST', '/v1/accounts:signUp', Er(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qt {
  constructor(t) {
    (this.user = t.user),
      (this.providerId = t.providerId),
      (this._tokenResponse = t._tokenResponse),
      (this.operationType = t.operationType);
  }
  static async _fromIdTokenResponse(t, n, r, s = !1) {
    const i = await Zt._fromIdTokenResponse(t, r, s),
      o = fc(r);
    return new Qt({
      user: i,
      providerId: o,
      _tokenResponse: r,
      operationType: n,
    });
  }
  static async _forOperation(t, n, r) {
    await t._updateTokensIfNecessary(r, !0);
    const s = fc(r);
    return new Qt({
      user: t,
      providerId: s,
      _tokenResponse: r,
      operationType: n,
    });
  }
}
function fc(e) {
  return e.providerId ? e.providerId : 'phoneNumber' in e ? 'phone' : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ps extends $t {
  constructor(t, n, r, s) {
    var i;
    super(n.code, n.message),
      (this.operationType = r),
      (this.user = s),
      Object.setPrototypeOf(this, ps.prototype),
      (this.customData = {
        appName: t.name,
        tenantId: (i = t.tenantId) !== null && i !== void 0 ? i : void 0,
        _serverResponse: n.customData._serverResponse,
        operationType: r,
      });
  }
  static _fromErrorAndOperation(t, n, r, s) {
    return new ps(t, n, r, s);
  }
}
function Yu(e, t, n, r) {
  return (
    t === 'reauthenticate'
      ? n._getReauthenticationResolver(e)
      : n._getIdTokenResponse(e)
  ).catch((i) => {
    throw i.code === 'auth/multi-factor-auth-required'
      ? ps._fromErrorAndOperation(e, i, t, r)
      : i;
  });
}
async function Dv(e, t, n = !1) {
  const r = await fr(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
  return Qt._forOperation(e, 'link', r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Bv(e, t, n = !1) {
  const { auth: r } = e,
    s = 'reauthenticate';
  try {
    const i = await fr(e, Yu(r, s, t, e), n);
    G(i.idToken, r, 'internal-error');
    const o = Po(i.idToken);
    G(o, r, 'internal-error');
    const { sub: a } = o;
    return G(e.uid === a, r, 'user-mismatch'), Qt._forOperation(e, s, i);
  } catch (i) {
    throw (
      ((i == null ? void 0 : i.code) === 'auth/user-not-found' &&
        Ze(r, 'user-mismatch'),
      i)
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Xu(e, t, n = !1) {
  const r = 'signIn',
    s = await Yu(e, r, t),
    i = await Qt._fromIdTokenResponse(e, r, s);
  return n || (await e._updateCurrentUser(i.user)), i;
}
async function Hv(e, t) {
  return Xu(Tr(e), t);
}
async function jE(e, t, n) {
  const r = Tr(e),
    s = await Nv(r, { returnSecureToken: !0, email: t, password: n }),
    i = await Qt._fromIdTokenResponse(r, 'signIn', s);
  return await r._updateCurrentUser(i.user), i;
}
function FE(e, t, n) {
  return Hv(en(e), Bn.credential(t, n));
}
function Uv(e, t, n, r) {
  return en(e).onIdTokenChanged(t, n, r);
}
function jv(e, t, n) {
  return en(e).beforeAuthStateChanged(t, n);
}
const gs = '__sak';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qu {
  constructor(t, n) {
    (this.storageRetriever = t), (this.type = n);
  }
  _isAvailable() {
    try {
      return this.storage
        ? (this.storage.setItem(gs, '1'),
          this.storage.removeItem(gs),
          Promise.resolve(!0))
        : Promise.resolve(!1);
    } catch {
      return Promise.resolve(!1);
    }
  }
  _set(t, n) {
    return this.storage.setItem(t, JSON.stringify(n)), Promise.resolve();
  }
  _get(t) {
    const n = this.storage.getItem(t);
    return Promise.resolve(n ? JSON.parse(n) : null);
  }
  _remove(t) {
    return this.storage.removeItem(t), Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Fv() {
  const e = Te();
  return Oo(e) || Ds(e);
}
const Wv = 1e3,
  zv = 10;
class ef extends Qu {
  constructor() {
    super(() => window.localStorage, 'LOCAL'),
      (this.boundEventHandler = (t, n) => this.onStorageEvent(t, n)),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.safariLocalStorageNotSynced = Fv() && Iv()),
      (this.fallbackToPolling = qu()),
      (this._shouldAllowMigration = !0);
  }
  forAllChangedKeys(t) {
    for (const n of Object.keys(this.listeners)) {
      const r = this.storage.getItem(n),
        s = this.localCache[n];
      r !== s && t(n, s, r);
    }
  }
  onStorageEvent(t, n = !1) {
    if (!t.key) {
      this.forAllChangedKeys((o, a, c) => {
        this.notifyListeners(o, c);
      });
      return;
    }
    const r = t.key;
    if (
      (n ? this.detachListener() : this.stopPolling(),
      this.safariLocalStorageNotSynced)
    ) {
      const o = this.storage.getItem(r);
      if (t.newValue !== o)
        t.newValue !== null
          ? this.storage.setItem(r, t.newValue)
          : this.storage.removeItem(r);
      else if (this.localCache[r] === t.newValue && !n) return;
    }
    const s = () => {
        const o = this.storage.getItem(r);
        (!n && this.localCache[r] === o) || this.notifyListeners(r, o);
      },
      i = this.storage.getItem(r);
    Ev() && i !== t.newValue && t.newValue !== t.oldValue
      ? setTimeout(s, zv)
      : s();
  }
  notifyListeners(t, n) {
    this.localCache[t] = n;
    const r = this.listeners[t];
    if (r) for (const s of Array.from(r)) s(n && JSON.parse(n));
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((t, n, r) => {
          this.onStorageEvent(
            new StorageEvent('storage', { key: t, oldValue: n, newValue: r }),
            !0
          );
        });
      }, Wv));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  attachListener() {
    window.addEventListener('storage', this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener('storage', this.boundEventHandler);
  }
  _addListener(t, n) {
    Object.keys(this.listeners).length === 0 &&
      (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
      this.listeners[t] ||
        ((this.listeners[t] = new Set()),
        (this.localCache[t] = this.storage.getItem(t))),
      this.listeners[t].add(n);
  }
  _removeListener(t, n) {
    this.listeners[t] &&
      (this.listeners[t].delete(n),
      this.listeners[t].size === 0 && delete this.listeners[t]),
      Object.keys(this.listeners).length === 0 &&
        (this.detachListener(), this.stopPolling());
  }
  async _set(t, n) {
    await super._set(t, n), (this.localCache[t] = JSON.stringify(n));
  }
  async _get(t) {
    const n = await super._get(t);
    return (this.localCache[t] = JSON.stringify(n)), n;
  }
  async _remove(t) {
    await super._remove(t), delete this.localCache[t];
  }
}
ef.type = 'LOCAL';
const Vv = ef;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tf extends Qu {
  constructor() {
    super(() => window.sessionStorage, 'SESSION');
  }
  _addListener(t, n) {}
  _removeListener(t, n) {}
}
tf.type = 'SESSION';
const nf = tf;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Kv(e) {
  return Promise.all(
    e.map(async (t) => {
      try {
        return { fulfilled: !0, value: await t };
      } catch (n) {
        return { fulfilled: !1, reason: n };
      }
    })
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bs {
  constructor(t) {
    (this.eventTarget = t),
      (this.handlersMap = {}),
      (this.boundEventHandler = this.handleEvent.bind(this));
  }
  static _getInstance(t) {
    const n = this.receivers.find((s) => s.isListeningto(t));
    if (n) return n;
    const r = new Bs(t);
    return this.receivers.push(r), r;
  }
  isListeningto(t) {
    return this.eventTarget === t;
  }
  async handleEvent(t) {
    const n = t,
      { eventId: r, eventType: s, data: i } = n.data,
      o = this.handlersMap[s];
    if (!(o != null && o.size)) return;
    n.ports[0].postMessage({ status: 'ack', eventId: r, eventType: s });
    const a = Array.from(o).map(async (l) => l(n.origin, i)),
      c = await Kv(a);
    n.ports[0].postMessage({
      status: 'done',
      eventId: r,
      eventType: s,
      response: c,
    });
  }
  _subscribe(t, n) {
    Object.keys(this.handlersMap).length === 0 &&
      this.eventTarget.addEventListener('message', this.boundEventHandler),
      this.handlersMap[t] || (this.handlersMap[t] = new Set()),
      this.handlersMap[t].add(n);
  }
  _unsubscribe(t, n) {
    this.handlersMap[t] && n && this.handlersMap[t].delete(n),
      (!n || this.handlersMap[t].size === 0) && delete this.handlersMap[t],
      Object.keys(this.handlersMap).length === 0 &&
        this.eventTarget.removeEventListener('message', this.boundEventHandler);
  }
}
Bs.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $o(e = '', t = 10) {
  let n = '';
  for (let r = 0; r < t; r++) n += Math.floor(Math.random() * 10);
  return e + n;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qv {
  constructor(t) {
    (this.target = t), (this.handlers = new Set());
  }
  removeMessageHandler(t) {
    t.messageChannel &&
      (t.messageChannel.port1.removeEventListener('message', t.onMessage),
      t.messageChannel.port1.close()),
      this.handlers.delete(t);
  }
  async _send(t, n, r = 50) {
    const s = typeof MessageChannel < 'u' ? new MessageChannel() : null;
    if (!s) throw new Error('connection_unavailable');
    let i, o;
    return new Promise((a, c) => {
      const l = $o('', 20);
      s.port1.start();
      const u = setTimeout(() => {
        c(new Error('unsupported_event'));
      }, r);
      (o = {
        messageChannel: s,
        onMessage(f) {
          const d = f;
          if (d.data.eventId === l)
            switch (d.data.status) {
              case 'ack':
                clearTimeout(u),
                  (i = setTimeout(() => {
                    c(new Error('timeout'));
                  }, 3e3));
                break;
              case 'done':
                clearTimeout(i), a(d.data.response);
                break;
              default:
                clearTimeout(u),
                  clearTimeout(i),
                  c(new Error('invalid_response'));
                break;
            }
        },
      }),
        this.handlers.add(o),
        s.port1.addEventListener('message', o.onMessage),
        this.target.postMessage({ eventType: t, eventId: l, data: n }, [
          s.port2,
        ]);
    }).finally(() => {
      o && this.removeMessageHandler(o);
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rt() {
  return window;
}
function Gv(e) {
  rt().location.href = e;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rf() {
  return (
    typeof rt().WorkerGlobalScope < 'u' &&
    typeof rt().importScripts == 'function'
  );
}
async function Jv() {
  if (!(navigator != null && navigator.serviceWorker)) return null;
  try {
    return (await navigator.serviceWorker.ready).active;
  } catch {
    return null;
  }
}
function Zv() {
  var e;
  return (
    ((e = navigator == null ? void 0 : navigator.serviceWorker) === null ||
    e === void 0
      ? void 0
      : e.controller) || null
  );
}
function Yv() {
  return rf() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sf = 'firebaseLocalStorageDb',
  Xv = 1,
  ms = 'firebaseLocalStorage',
  of = 'fbase_key';
class Sr {
  constructor(t) {
    this.request = t;
  }
  toPromise() {
    return new Promise((t, n) => {
      this.request.addEventListener('success', () => {
        t(this.request.result);
      }),
        this.request.addEventListener('error', () => {
          n(this.request.error);
        });
    });
  }
}
function Hs(e, t) {
  return e.transaction([ms], t ? 'readwrite' : 'readonly').objectStore(ms);
}
function Qv() {
  const e = indexedDB.deleteDatabase(sf);
  return new Sr(e).toPromise();
}
function Gi() {
  const e = indexedDB.open(sf, Xv);
  return new Promise((t, n) => {
    e.addEventListener('error', () => {
      n(e.error);
    }),
      e.addEventListener('upgradeneeded', () => {
        const r = e.result;
        try {
          r.createObjectStore(ms, { keyPath: of });
        } catch (s) {
          n(s);
        }
      }),
      e.addEventListener('success', async () => {
        const r = e.result;
        r.objectStoreNames.contains(ms)
          ? t(r)
          : (r.close(), await Qv(), t(await Gi()));
      });
  });
}
async function dc(e, t, n) {
  const r = Hs(e, !0).put({ [of]: t, value: n });
  return new Sr(r).toPromise();
}
async function eb(e, t) {
  const n = Hs(e, !1).get(t),
    r = await new Sr(n).toPromise();
  return r === void 0 ? null : r.value;
}
function hc(e, t) {
  const n = Hs(e, !0).delete(t);
  return new Sr(n).toPromise();
}
const tb = 800,
  nb = 3;
class af {
  constructor() {
    (this.type = 'LOCAL'),
      (this._shouldAllowMigration = !0),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.pendingWrites = 0),
      (this.receiver = null),
      (this.sender = null),
      (this.serviceWorkerReceiverAvailable = !1),
      (this.activeServiceWorker = null),
      (this._workerInitializationPromise =
        this.initializeServiceWorkerMessaging().then(
          () => {},
          () => {}
        ));
  }
  async _openDb() {
    return this.db ? this.db : ((this.db = await Gi()), this.db);
  }
  async _withRetries(t) {
    let n = 0;
    for (;;)
      try {
        const r = await this._openDb();
        return await t(r);
      } catch (r) {
        if (n++ > nb) throw r;
        this.db && (this.db.close(), (this.db = void 0));
      }
  }
  async initializeServiceWorkerMessaging() {
    return rf() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    (this.receiver = Bs._getInstance(Yv())),
      this.receiver._subscribe('keyChanged', async (t, n) => ({
        keyProcessed: (await this._poll()).includes(n.key),
      })),
      this.receiver._subscribe('ping', async (t, n) => ['keyChanged']);
  }
  async initializeSender() {
    var t, n;
    if (((this.activeServiceWorker = await Jv()), !this.activeServiceWorker))
      return;
    this.sender = new qv(this.activeServiceWorker);
    const r = await this.sender._send('ping', {}, 800);
    !r ||
      (((t = r[0]) === null || t === void 0 ? void 0 : t.fulfilled) &&
        ((n = r[0]) === null || n === void 0
          ? void 0
          : n.value.includes('keyChanged')) &&
        (this.serviceWorkerReceiverAvailable = !0));
  }
  async notifyServiceWorker(t) {
    if (
      !(
        !this.sender ||
        !this.activeServiceWorker ||
        Zv() !== this.activeServiceWorker
      )
    )
      try {
        await this.sender._send(
          'keyChanged',
          { key: t },
          this.serviceWorkerReceiverAvailable ? 800 : 50
        );
      } catch {}
  }
  async _isAvailable() {
    try {
      if (!indexedDB) return !1;
      const t = await Gi();
      return await dc(t, gs, '1'), await hc(t, gs), !0;
    } catch {}
    return !1;
  }
  async _withPendingWrite(t) {
    this.pendingWrites++;
    try {
      await t();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(t, n) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((r) => dc(r, t, n)),
        (this.localCache[t] = n),
        this.notifyServiceWorker(t)
      )
    );
  }
  async _get(t) {
    const n = await this._withRetries((r) => eb(r, t));
    return (this.localCache[t] = n), n;
  }
  async _remove(t) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((n) => hc(n, t)),
        delete this.localCache[t],
        this.notifyServiceWorker(t)
      )
    );
  }
  async _poll() {
    const t = await this._withRetries((s) => {
      const i = Hs(s, !1).getAll();
      return new Sr(i).toPromise();
    });
    if (!t) return [];
    if (this.pendingWrites !== 0) return [];
    const n = [],
      r = new Set();
    for (const { fbase_key: s, value: i } of t)
      r.add(s),
        JSON.stringify(this.localCache[s]) !== JSON.stringify(i) &&
          (this.notifyListeners(s, i), n.push(s));
    for (const s of Object.keys(this.localCache))
      this.localCache[s] &&
        !r.has(s) &&
        (this.notifyListeners(s, null), n.push(s));
    return n;
  }
  notifyListeners(t, n) {
    this.localCache[t] = n;
    const r = this.listeners[t];
    if (r) for (const s of Array.from(r)) s(n);
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(async () => this._poll(), tb));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  _addListener(t, n) {
    Object.keys(this.listeners).length === 0 && this.startPolling(),
      this.listeners[t] || ((this.listeners[t] = new Set()), this._get(t)),
      this.listeners[t].add(n);
  }
  _removeListener(t, n) {
    this.listeners[t] &&
      (this.listeners[t].delete(n),
      this.listeners[t].size === 0 && delete this.listeners[t]),
      Object.keys(this.listeners).length === 0 && this.stopPolling();
  }
}
af.type = 'LOCAL';
const rb = af;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function sb() {
  var e, t;
  return (t =
    (e = document.getElementsByTagName('head')) === null || e === void 0
      ? void 0
      : e[0]) !== null && t !== void 0
    ? t
    : document;
}
function ib(e) {
  return new Promise((t, n) => {
    const r = document.createElement('script');
    r.setAttribute('src', e),
      (r.onload = t),
      (r.onerror = (s) => {
        const i = nt('internal-error');
        (i.customData = s), n(i);
      }),
      (r.type = 'text/javascript'),
      (r.charset = 'UTF-8'),
      sb().appendChild(r);
  });
}
function ob(e) {
  return `__${e}${Math.floor(Math.random() * 1e6)}`;
}
new wr(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ab(e, t) {
  return t
    ? ut(t)
    : (G(e._popupRedirectResolver, e, 'argument-error'),
      e._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xo extends Mo {
  constructor(t) {
    super('custom', 'custom'), (this.params = t);
  }
  _getIdTokenResponse(t) {
    return yn(t, this._buildIdpRequest());
  }
  _linkToIdToken(t, n) {
    return yn(t, this._buildIdpRequest(n));
  }
  _getReauthenticationResolver(t) {
    return yn(t, this._buildIdpRequest());
  }
  _buildIdpRequest(t) {
    const n = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return t && (n.idToken = t), n;
  }
}
function cb(e) {
  return Xu(e.auth, new xo(e), e.bypassAuthState);
}
function lb(e) {
  const { auth: t, user: n } = e;
  return G(n, t, 'internal-error'), Bv(n, new xo(e), e.bypassAuthState);
}
async function ub(e) {
  const { auth: t, user: n } = e;
  return G(n, t, 'internal-error'), Dv(n, new xo(e), e.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cf {
  constructor(t, n, r, s, i = !1) {
    (this.auth = t),
      (this.resolver = r),
      (this.user = s),
      (this.bypassAuthState = i),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(n) ? n : [n]);
  }
  execute() {
    return new Promise(async (t, n) => {
      this.pendingPromise = { resolve: t, reject: n };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (r) {
        this.reject(r);
      }
    });
  }
  async onAuthEvent(t) {
    const {
      urlResponse: n,
      sessionId: r,
      postBody: s,
      tenantId: i,
      error: o,
      type: a,
    } = t;
    if (o) {
      this.reject(o);
      return;
    }
    const c = {
      auth: this.auth,
      requestUri: n,
      sessionId: r,
      tenantId: i || void 0,
      postBody: s || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState,
    };
    try {
      this.resolve(await this.getIdpTask(a)(c));
    } catch (l) {
      this.reject(l);
    }
  }
  onError(t) {
    this.reject(t);
  }
  getIdpTask(t) {
    switch (t) {
      case 'signInViaPopup':
      case 'signInViaRedirect':
        return cb;
      case 'linkViaPopup':
      case 'linkViaRedirect':
        return ub;
      case 'reauthViaPopup':
      case 'reauthViaRedirect':
        return lb;
      default:
        Ze(this.auth, 'internal-error');
    }
  }
  resolve(t) {
    pt(this.pendingPromise, 'Pending promise was never set'),
      this.pendingPromise.resolve(t),
      this.unregisterAndCleanUp();
  }
  reject(t) {
    pt(this.pendingPromise, 'Pending promise was never set'),
      this.pendingPromise.reject(t),
      this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this),
      (this.pendingPromise = null),
      this.cleanUp();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fb = new wr(2e3, 1e4);
class an extends cf {
  constructor(t, n, r, s, i) {
    super(t, n, s, i),
      (this.provider = r),
      (this.authWindow = null),
      (this.pollId = null),
      an.currentPopupAction && an.currentPopupAction.cancel(),
      (an.currentPopupAction = this);
  }
  async executeNotNull() {
    const t = await this.execute();
    return G(t, this.auth, 'internal-error'), t;
  }
  async onExecution() {
    pt(this.filter.length === 1, 'Popup operations only handle one event');
    const t = $o();
    (this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      t
    )),
      (this.authWindow.associatedEvent = t),
      this.resolver._originValidation(this.auth).catch((n) => {
        this.reject(n);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (n) => {
        n || this.reject(nt(this.auth, 'web-storage-unsupported'));
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var t;
    return (
      ((t = this.authWindow) === null || t === void 0
        ? void 0
        : t.associatedEvent) || null
    );
  }
  cancel() {
    this.reject(nt(this.auth, 'cancelled-popup-request'));
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (an.currentPopupAction = null);
  }
  pollUserCancellation() {
    const t = () => {
      var n, r;
      if (
        !(
          (r =
            (n = this.authWindow) === null || n === void 0
              ? void 0
              : n.window) === null || r === void 0
        ) &&
        r.closed
      ) {
        this.pollId = window.setTimeout(() => {
          (this.pollId = null),
            this.reject(nt(this.auth, 'popup-closed-by-user'));
        }, 2e3);
        return;
      }
      this.pollId = window.setTimeout(t, fb.get());
    };
    t();
  }
}
an.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const db = 'pendingRedirect',
  Jr = new Map();
class hb extends cf {
  constructor(t, n, r = !1) {
    super(
      t,
      ['signInViaRedirect', 'linkViaRedirect', 'reauthViaRedirect', 'unknown'],
      n,
      void 0,
      r
    ),
      (this.eventId = null);
  }
  async execute() {
    let t = Jr.get(this.auth._key());
    if (!t) {
      try {
        const r = (await pb(this.resolver, this.auth))
          ? await super.execute()
          : null;
        t = () => Promise.resolve(r);
      } catch (n) {
        t = () => Promise.reject(n);
      }
      Jr.set(this.auth._key(), t);
    }
    return (
      this.bypassAuthState ||
        Jr.set(this.auth._key(), () => Promise.resolve(null)),
      t()
    );
  }
  async onAuthEvent(t) {
    if (t.type === 'signInViaRedirect') return super.onAuthEvent(t);
    if (t.type === 'unknown') {
      this.resolve(null);
      return;
    }
    if (t.eventId) {
      const n = await this.auth._redirectUserForId(t.eventId);
      if (n) return (this.user = n), super.onAuthEvent(t);
      this.resolve(null);
    }
  }
  async onExecution() {}
  cleanUp() {}
}
async function pb(e, t) {
  const n = _b(t),
    r = mb(e);
  if (!(await r._isAvailable())) return !1;
  const s = (await r._get(n)) === 'true';
  return await r._remove(n), s;
}
function gb(e, t) {
  Jr.set(e._key(), t);
}
function mb(e) {
  return ut(e._redirectPersistence);
}
function _b(e) {
  return Gr(db, e.config.apiKey, e.name);
}
async function yb(e, t, n = !1) {
  const r = Tr(e),
    s = ab(r, t),
    o = await new hb(r, s, n).execute();
  return (
    o &&
      !n &&
      (delete o.user._redirectEventId,
      await r._persistUserIfCurrent(o.user),
      await r._setRedirectUser(null, t)),
    o
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const vb = 10 * 60 * 1e3;
class bb {
  constructor(t) {
    (this.auth = t),
      (this.cachedEventUids = new Set()),
      (this.consumers = new Set()),
      (this.queuedRedirectEvent = null),
      (this.hasHandledPotentialRedirect = !1),
      (this.lastProcessedEventTime = Date.now());
  }
  registerConsumer(t) {
    this.consumers.add(t),
      this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, t) &&
        (this.sendToConsumer(this.queuedRedirectEvent, t),
        this.saveEventToCache(this.queuedRedirectEvent),
        (this.queuedRedirectEvent = null));
  }
  unregisterConsumer(t) {
    this.consumers.delete(t);
  }
  onEvent(t) {
    if (this.hasEventBeenHandled(t)) return !1;
    let n = !1;
    return (
      this.consumers.forEach((r) => {
        this.isEventForConsumer(t, r) &&
          ((n = !0), this.sendToConsumer(t, r), this.saveEventToCache(t));
      }),
      this.hasHandledPotentialRedirect ||
        !wb(t) ||
        ((this.hasHandledPotentialRedirect = !0),
        n || ((this.queuedRedirectEvent = t), (n = !0))),
      n
    );
  }
  sendToConsumer(t, n) {
    var r;
    if (t.error && !lf(t)) {
      const s =
        ((r = t.error.code) === null || r === void 0
          ? void 0
          : r.split('auth/')[1]) || 'internal-error';
      n.onError(nt(this.auth, s));
    } else n.onAuthEvent(t);
  }
  isEventForConsumer(t, n) {
    const r = n.eventId === null || (!!t.eventId && t.eventId === n.eventId);
    return n.filter.includes(t.type) && r;
  }
  hasEventBeenHandled(t) {
    return (
      Date.now() - this.lastProcessedEventTime >= vb &&
        this.cachedEventUids.clear(),
      this.cachedEventUids.has(pc(t))
    );
  }
  saveEventToCache(t) {
    this.cachedEventUids.add(pc(t)), (this.lastProcessedEventTime = Date.now());
  }
}
function pc(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId]
    .filter((t) => t)
    .join('-');
}
function lf({ type: e, error: t }) {
  return (
    e === 'unknown' && (t == null ? void 0 : t.code) === 'auth/no-auth-event'
  );
}
function wb(e) {
  switch (e.type) {
    case 'signInViaRedirect':
    case 'linkViaRedirect':
    case 'reauthViaRedirect':
      return !0;
    case 'unknown':
      return lf(e);
    default:
      return !1;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Eb(e, t = {}) {
  return Ir(e, 'GET', '/v1/projects', t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ib = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  Cb = /^https?/;
async function Tb(e) {
  if (e.config.emulator) return;
  const { authorizedDomains: t } = await Eb(e);
  for (const n of t)
    try {
      if (kb(n)) return;
    } catch {}
  Ze(e, 'unauthorized-domain');
}
function kb(e) {
  const t = qi(),
    { protocol: n, hostname: r } = new URL(t);
  if (e.startsWith('chrome-extension://')) {
    const o = new URL(e);
    return o.hostname === '' && r === ''
      ? n === 'chrome-extension:' &&
          e.replace('chrome-extension://', '') ===
            t.replace('chrome-extension://', '')
      : n === 'chrome-extension:' && o.hostname === r;
  }
  if (!Cb.test(n)) return !1;
  if (Ib.test(e)) return r === e;
  const s = e.replace(/\./g, '\\.');
  return new RegExp('^(.+\\.' + s + '|' + s + ')$', 'i').test(r);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Sb = new wr(3e4, 6e4);
function gc() {
  const e = rt().___jsl;
  if (e != null && e.H) {
    for (const t of Object.keys(e.H))
      if (
        ((e.H[t].r = e.H[t].r || []),
        (e.H[t].L = e.H[t].L || []),
        (e.H[t].r = [...e.H[t].L]),
        e.CP)
      )
        for (let n = 0; n < e.CP.length; n++) e.CP[n] = null;
  }
}
function Ab(e) {
  return new Promise((t, n) => {
    var r, s, i;
    function o() {
      gc(),
        gapi.load('gapi.iframes', {
          callback: () => {
            t(gapi.iframes.getContext());
          },
          ontimeout: () => {
            gc(), n(nt(e, 'network-request-failed'));
          },
          timeout: Sb.get(),
        });
    }
    if (
      !(
        (s = (r = rt().gapi) === null || r === void 0 ? void 0 : r.iframes) ===
          null || s === void 0
      ) &&
      s.Iframe
    )
      t(gapi.iframes.getContext());
    else if (!((i = rt().gapi) === null || i === void 0) && i.load) o();
    else {
      const a = ob('iframefcb');
      return (
        (rt()[a] = () => {
          gapi.load ? o() : n(nt(e, 'network-request-failed'));
        }),
        ib(`https://apis.google.com/js/api.js?onload=${a}`).catch((c) => n(c))
      );
    }
  }).catch((t) => {
    throw ((Zr = null), t);
  });
}
let Zr = null;
function Rb(e) {
  return (Zr = Zr || Ab(e)), Zr;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Pb = new wr(5e3, 15e3),
  Ob = '__/auth/iframe',
  Mb = 'emulator/auth/iframe',
  Lb = {
    style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' },
    'aria-hidden': 'true',
    tabindex: '-1',
  },
  $b = new Map([
    ['identitytoolkit.googleapis.com', 'p'],
    ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
    ['test-identitytoolkit.sandbox.googleapis.com', 't'],
  ]);
function xb(e) {
  const t = e.config;
  G(t.authDomain, e, 'auth-domain-config-required');
  const n = t.emulator ? Ro(t, Mb) : `https://${e.config.authDomain}/${Ob}`,
    r = { apiKey: t.apiKey, appName: e.name, v: Ns },
    s = $b.get(e.config.apiHost);
  s && (r.eid = s);
  const i = e._getFrameworks();
  return i.length && (r.fw = i.join(',')), `${n}?${br(r).slice(1)}`;
}
async function Nb(e) {
  const t = await Rb(e),
    n = rt().gapi;
  return (
    G(n, e, 'internal-error'),
    t.open(
      {
        where: document.body,
        url: xb(e),
        messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: Lb,
        dontclear: !0,
      },
      (r) =>
        new Promise(async (s, i) => {
          await r.restyle({ setHideOnLeave: !1 });
          const o = nt(e, 'network-request-failed'),
            a = rt().setTimeout(() => {
              i(o);
            }, Pb.get());
          function c() {
            rt().clearTimeout(a), s(r);
          }
          r.ping(c).then(c, () => {
            i(o);
          });
        })
    )
  );
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Db = {
    location: 'yes',
    resizable: 'yes',
    statusbar: 'yes',
    toolbar: 'no',
  },
  Bb = 500,
  Hb = 600,
  Ub = '_blank',
  jb = 'http://localhost';
class mc {
  constructor(t) {
    (this.window = t), (this.associatedEvent = null);
  }
  close() {
    if (this.window)
      try {
        this.window.close();
      } catch {}
  }
}
function Fb(e, t, n, r = Bb, s = Hb) {
  const i = Math.max((window.screen.availHeight - s) / 2, 0).toString(),
    o = Math.max((window.screen.availWidth - r) / 2, 0).toString();
  let a = '';
  const c = Object.assign(Object.assign({}, Db), {
      width: r.toString(),
      height: s.toString(),
      top: i,
      left: o,
    }),
    l = Te().toLowerCase();
  n && (a = Fu(l) ? Ub : n), ju(l) && ((t = t || jb), (c.scrollbars = 'yes'));
  const u = Object.entries(c).reduce((d, [g, m]) => `${d}${g}=${m},`, '');
  if (wv(l) && a !== '_self') return Wb(t || '', a), new mc(null);
  const f = window.open(t || '', a, u);
  G(f, e, 'popup-blocked');
  try {
    f.focus();
  } catch {}
  return new mc(f);
}
function Wb(e, t) {
  const n = document.createElement('a');
  (n.href = e), (n.target = t);
  const r = document.createEvent('MouseEvent');
  r.initMouseEvent(
    'click',
    !0,
    !0,
    window,
    1,
    0,
    0,
    0,
    0,
    !1,
    !1,
    !1,
    !1,
    1,
    null
  ),
    n.dispatchEvent(r);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zb = '__/auth/handler',
  Vb = 'emulator/auth/handler';
function _c(e, t, n, r, s, i) {
  G(e.config.authDomain, e, 'auth-domain-config-required'),
    G(e.config.apiKey, e, 'invalid-api-key');
  const o = {
    apiKey: e.config.apiKey,
    appName: e.name,
    authType: n,
    redirectUrl: r,
    v: Ns,
    eventId: s,
  };
  if (t instanceof Zu) {
    t.setDefaultLanguage(e.languageCode),
      (o.providerId = t.providerId || ''),
      W_(t.getCustomParameters()) ||
        (o.customParameters = JSON.stringify(t.getCustomParameters()));
    for (const [c, l] of Object.entries(i || {})) o[c] = l;
  }
  if (t instanceof kr) {
    const c = t.getScopes().filter((l) => l !== '');
    c.length > 0 && (o.scopes = c.join(','));
  }
  e.tenantId && (o.tid = e.tenantId);
  const a = o;
  for (const c of Object.keys(a)) a[c] === void 0 && delete a[c];
  return `${Kb(e)}?${br(a).slice(1)}`;
}
function Kb({ config: e }) {
  return e.emulator ? Ro(e, Vb) : `https://${e.authDomain}/${zb}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ui = 'webStorageSupport';
class qb {
  constructor() {
    (this.eventManagers = {}),
      (this.iframes = {}),
      (this.originValidationPromises = {}),
      (this._redirectPersistence = nf),
      (this._completeRedirectFn = yb),
      (this._overrideRedirectResult = gb);
  }
  async _openPopup(t, n, r, s) {
    var i;
    pt(
      (i = this.eventManagers[t._key()]) === null || i === void 0
        ? void 0
        : i.manager,
      '_initialize() not called before _openPopup()'
    );
    const o = _c(t, n, r, qi(), s);
    return Fb(t, o, $o());
  }
  async _openRedirect(t, n, r, s) {
    return (
      await this._originValidation(t),
      Gv(_c(t, n, r, qi(), s)),
      new Promise(() => {})
    );
  }
  _initialize(t) {
    const n = t._key();
    if (this.eventManagers[n]) {
      const { manager: s, promise: i } = this.eventManagers[n];
      return s
        ? Promise.resolve(s)
        : (pt(i, 'If manager is not set, promise should be'), i);
    }
    const r = this.initAndGetManager(t);
    return (
      (this.eventManagers[n] = { promise: r }),
      r.catch(() => {
        delete this.eventManagers[n];
      }),
      r
    );
  }
  async initAndGetManager(t) {
    const n = await Nb(t),
      r = new bb(t);
    return (
      n.register(
        'authEvent',
        (s) => (
          G(s == null ? void 0 : s.authEvent, t, 'invalid-auth-event'),
          { status: r.onEvent(s.authEvent) ? 'ACK' : 'ERROR' }
        ),
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      ),
      (this.eventManagers[t._key()] = { manager: r }),
      (this.iframes[t._key()] = n),
      r
    );
  }
  _isIframeWebStorageSupported(t, n) {
    this.iframes[t._key()].send(
      ui,
      { type: ui },
      (s) => {
        var i;
        const o =
          (i = s == null ? void 0 : s[0]) === null || i === void 0
            ? void 0
            : i[ui];
        o !== void 0 && n(!!o), Ze(t, 'internal-error');
      },
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );
  }
  _originValidation(t) {
    const n = t._key();
    return (
      this.originValidationPromises[n] ||
        (this.originValidationPromises[n] = Tb(t)),
      this.originValidationPromises[n]
    );
  }
  get _shouldInitProactively() {
    return qu() || Oo() || Ds();
  }
}
const Gb = qb;
var yc = '@firebase/auth',
  vc = '0.21.0';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jb {
  constructor(t) {
    (this.auth = t), (this.internalListeners = new Map());
  }
  getUid() {
    var t;
    return (
      this.assertAuthConfigured(),
      ((t = this.auth.currentUser) === null || t === void 0 ? void 0 : t.uid) ||
        null
    );
  }
  async getToken(t) {
    return (
      this.assertAuthConfigured(),
      await this.auth._initializationPromise,
      this.auth.currentUser
        ? { accessToken: await this.auth.currentUser.getIdToken(t) }
        : null
    );
  }
  addAuthTokenListener(t) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(t))) return;
    const n = this.auth.onIdTokenChanged((r) => {
      t((r == null ? void 0 : r.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(t, n), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(t) {
    this.assertAuthConfigured();
    const n = this.internalListeners.get(t);
    !n ||
      (this.internalListeners.delete(t), n(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    G(
      this.auth._initializationPromise,
      'dependent-sdk-initialized-before-auth'
    );
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0
      ? this.auth._startProactiveRefresh()
      : this.auth._stopProactiveRefresh();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zb(e) {
  switch (e) {
    case 'Node':
      return 'node';
    case 'ReactNative':
      return 'rn';
    case 'Worker':
      return 'webworker';
    case 'Cordova':
      return 'cordova';
    default:
      return;
  }
}
function Yb(e) {
  lr(
    new Rn(
      'auth',
      (t, { options: n }) => {
        const r = t.getProvider('app').getImmediate(),
          s = t.getProvider('heartbeat'),
          { apiKey: i, authDomain: o } = r.options;
        return ((a, c) => {
          G(i && !i.includes(':'), 'invalid-api-key', { appName: a.name }),
            G(!(o != null && o.includes(':')), 'argument-error', {
              appName: a.name,
            });
          const l = {
              apiKey: i,
              authDomain: o,
              clientPlatform: e,
              apiHost: 'identitytoolkit.googleapis.com',
              tokenApiHost: 'securetoken.googleapis.com',
              apiScheme: 'https',
              sdkClientVersion: Gu(e),
            },
            u = new Tv(a, c, l);
          return sv(u, n), u;
        })(r, s);
      },
      'PUBLIC'
    )
      .setInstantiationMode('EXPLICIT')
      .setInstanceCreatedCallback((t, n, r) => {
        t.getProvider('auth-internal').initialize();
      })
  ),
    lr(
      new Rn(
        'auth-internal',
        (t) => {
          const n = Tr(t.getProvider('auth').getImmediate());
          return ((r) => new Jb(r))(n);
        },
        'PRIVATE'
      ).setInstantiationMode('EXPLICIT')
    ),
    mn(yc, vc, Zb(e)),
    mn(yc, vc, 'esm2017');
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Xb = 5 * 60,
  Qb = Tu('authIdTokenMaxAge') || Xb;
let bc = null;
const ew = (e) => async (t) => {
  const n = t && (await t.getIdTokenResult()),
    r = n && (new Date().getTime() - Date.parse(n.issuedAtTime)) / 1e3;
  if (r && r > Qb) return;
  const s = n == null ? void 0 : n.token;
  bc !== s &&
    ((bc = s),
    await fetch(e, {
      method: s ? 'POST' : 'DELETE',
      headers: s ? { Authorization: `Bearer ${s}` } : {},
    }));
};
function tw(e = Wy()) {
  const t = Pu(e, 'auth');
  if (t.isInitialized()) return t.getImmediate();
  const n = rv(e, { popupRedirectResolver: Gb, persistence: [rb, Vv, nf] }),
    r = Tu('authTokenSyncURL');
  if (r) {
    const i = ew(r);
    jv(n, i, () => i(n.currentUser)), Uv(n, (o) => i(o));
  }
  const s = Cu('auth');
  return s && kv(n, `http://${s}`), n;
}
Yb('Browser');
const nw = Dn(() => {
    const t = Ou({
      apiKey: 'AIzaSyDLuQUzqDAvWi75rMkYaR8XGWGUW3SS94E',
      authDomain: 'noble-vine-369311.firebaseapp.com',
      databaseURL:
        'https://noble-vine-369311-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'noble-vine-369311',
      storageBucket: 'noble-vine-369311.appspot.com',
      messagingSenderId: '94687119429',
      appId: '1:94687119429:web:6d2080a1d3f92853f77b2c',
      measurementId: 'G-7KK9WN5V0T',
    });
    tw(t);
  }),
  wc = (e) => {
    let t = !1,
      n;
    return () => (t || ((t = !0), (n = e())), n);
  };
class Ji {
  static isServer() {
    return typeof document > 'u';
  }
}
function rw(e) {
  const t = document.createElement('SCRIPT');
  if (typeof e != 'object') throw new Error('options should  be an object');
  Array.prototype.isPrototypeOf(e.libraries) &&
    (e.libraries = e.libraries.join(',')),
    (e.callback = 'vueGoogleMapsInit');
  let r =
    'https://maps.googleapis.com/maps/api/js?' +
    Object.keys(e)
      .map((s) => encodeURIComponent(s) + '=' + encodeURIComponent(e[s]))
      .join('&');
  return (
    t.setAttribute('src', r),
    t.setAttribute('async', ''),
    t.setAttribute('defer', ''),
    t
  );
}
let Ec = !1;
function sw(e) {
  if (!Ji.isServer()) {
    if (Ec) throw new Error('You already started the loading of google maps');
    {
      Ec = !0;
      const t = rw(e);
      document.head.appendChild(t);
    }
  }
}
const uf = (e, t, n) => {
  for (let r of n) {
    const s = `on${r.charAt(0).toUpperCase()}${r.slice(1)}`.replace(
      /[-_]+(.)?/g,
      (i, o) => (o ? o.toUpperCase() : '')
    );
    e.$props[s] || e.$attrs[s]
      ? t.addListener(r, (i) => {
          e.$emit(r, i);
        })
      : (e.$gmapOptions.autobindAllEvents || e.$attrs[r]) &&
        t.addListener(r, (i) => {
          e.$emit(r, i);
        });
  }
};
function ff(e, t, n, r = !1) {
  let s = !1;
  function i() {
    s ||
      ((s = !0),
      e.$nextTick(() => {
        (s = !1), n();
      }));
  }
  for (let o of t) e.$watch(o, i, { immediate: r });
}
class Ic {
  static capitalizeFirstLetter(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
}
function _s(e, t) {
  return Object.keys(t).reduce(
    (n, r) => (e[r] !== void 0 && (n[r] = e[r]), n),
    {}
  );
}
function No(e, t, n) {
  for (let r in n) {
    let { twoWay: s, type: i, trackProperties: o, noBind: a } = n[r];
    if (a) continue;
    const c = 'set' + Ic.capitalizeFirstLetter(r),
      l = 'get' + Ic.capitalizeFirstLetter(r),
      u = r.toLowerCase() + '_changed',
      f = e[r];
    if (typeof t[c] > 'u')
      throw new Error(
        `${c} is not a method of (the Maps object corresponding to) ${e.$options._componentTag}`
      );
    i !== Object || !o
      ? e.$watch(
          r,
          () => {
            const d = e[r];
            t[c](d);
          },
          { immediate: typeof f < 'u', deep: i === Object }
        )
      : ff(
          e,
          o.map((d) => `${r}.${d}`),
          () => {
            t[c](e[r]);
          },
          e[r] !== void 0
        ),
      s &&
        (e.$gmapOptions.autobindAllEvents || e.$attrs[u]) &&
        t.addListener(u, () => {
          e.$emit(u, t[l]());
        });
  }
}
const iw = {
  inject: { $mapPromise: { default: 'abcdef' } },
  provide() {
    return (
      this.$mapPromise.then((e) => {
        this.$map = e;
      }),
      {}
    );
  },
};
function xt(e) {
  const {
      mappedProps: t,
      name: n,
      ctr: r,
      ctrArgs: s,
      events: i,
      beforeCreate: o,
      afterCreate: a,
      props: c,
      ...l
    } = e,
    u = `$${n}Promise`,
    f = `$${n}Object`;
  return (
    ow(!(l.props instanceof Array), '`props` should be an object, not Array'),
    {
      ...(typeof GENERATE_DOC < 'u' ? { $vgmOptions: e } : {}),
      mixins: [iw],
      props: { ...c, ...Do(t) },
      render() {
        return '';
      },
      provide() {
        const d = this.$mapPromise
          .then((g) => {
            this.$map = g;
            const m = { ...this.options, map: g, ..._s(this, t) };
            if ((delete m.options, o)) {
              const E = o.bind(this)(m);
              if (E instanceof Promise) return E.then(() => ({ options: m }));
            }
            return { options: m };
          })
          .then(({ options: g }) => {
            const m = r();
            return (
              (this[f] = s
                ? new (Function.prototype.bind.call(
                    m,
                    null,
                    ...s(g, _s(this, c || {}))
                  ))()
                : new m(g)),
              No(this, this[f], t),
              uf(this, this[f], i),
              a && a.bind(this)(this[f]),
              this[f]
            );
          });
        return (this[u] = d), { [u]: d };
      },
      unmounted() {
        this[f] && this[f].setMap && this[f].setMap(null);
      },
      ...l,
    }
  );
}
function ow(e, t) {
  if (!e) throw new Error(t);
}
function Do(e) {
  return Object.entries(e)
    .map(([t, n]) => {
      const r = {};
      return (
        'type' in n && (r.type = n.type),
        'default' in n && (r.default = n.default),
        'required' in n && (r.required = n.required),
        [t, r]
      );
    })
    .reduce((t, [n, r]) => ((t[n] = r), t), {});
}
const aw = {
    draggable: { type: Boolean },
    editable: { type: Boolean },
    options: { twoWay: !1, type: Object },
    path: { type: Array, twoWay: !0 },
  },
  cw = [
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'rightclick',
  ],
  lw = xt({
    mappedProps: aw,
    props: { deepWatch: { type: Boolean, default: !1 } },
    events: cw,
    name: 'polyline',
    ctr: () => google.maps.Polyline,
    afterCreate() {
      let e = () => {};
      this.$watch(
        'path',
        (t) => {
          if (t) {
            e(), this.$polylineObject.setPath(t);
            const n = this.$polylineObject.getPath(),
              r = [],
              s = () => {
                this.$emit('path_changed', this.$polylineObject.getPath());
              };
            r.push([n, n.addListener('insert_at', s)]),
              r.push([n, n.addListener('remove_at', s)]),
              r.push([n, n.addListener('set_at', s)]),
              (e = () => {
                r.map(([i, o]) => google.maps.event.removeListener(o));
              });
          }
        },
        { deep: this.deepWatch, immediate: !0 }
      );
    },
  }),
  uw = {
    draggable: { type: Boolean },
    editable: { type: Boolean },
    options: { type: Object },
    path: { type: Array, twoWay: !0, noBind: !0 },
    paths: { type: Array, twoWay: !0, noBind: !0 },
  },
  fw = [
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'rightclick',
  ],
  dw = xt({
    props: { deepWatch: { type: Boolean, default: !1 } },
    events: fw,
    mappedProps: uw,
    name: 'polygon',
    ctr: () => google.maps.Polygon,
    beforeCreate(e) {
      e.path || delete e.path, e.paths || delete e.paths;
    },
    afterCreate(e) {
      let t = () => {};
      this.$watch(
        'paths',
        (n) => {
          if (n) {
            t(), e.setPaths(n);
            const r = () => {
                this.$emit('paths_changed', e.getPaths());
              },
              s = [],
              i = e.getPaths();
            for (let o = 0; o < i.getLength(); o++) {
              let a = i.getAt(o);
              s.push([a, a.addListener('insert_at', r)]),
                s.push([a, a.addListener('remove_at', r)]),
                s.push([a, a.addListener('set_at', r)]);
            }
            s.push([i, i.addListener('insert_at', r)]),
              s.push([i, i.addListener('remove_at', r)]),
              s.push([i, i.addListener('set_at', r)]),
              (t = () => {
                s.map(([o, a]) => google.maps.event.removeListener(a));
              });
          }
        },
        { deep: this.deepWatch, immediate: !0 }
      ),
        this.$watch(
          'path',
          (n) => {
            if (n) {
              t(), e.setPaths(n);
              const r = e.getPath(),
                s = [],
                i = () => {
                  this.$emit('path_changed', e.getPath());
                };
              s.push([r, r.addListener('insert_at', i)]),
                s.push([r, r.addListener('remove_at', i)]),
                s.push([r, r.addListener('set_at', i)]),
                (t = () => {
                  s.map(([o, a]) => google.maps.event.removeListener(a));
                });
            }
          },
          { deep: this.deepWatch, immediate: !0 }
        );
    },
  }),
  hw = {
    center: { type: Object, twoWay: !0, required: !0 },
    radius: { type: Number, twoWay: !0 },
    draggable: { type: Boolean, default: !1 },
    editable: { type: Boolean, default: !1 },
    options: { type: Object, twoWay: !1 },
  },
  pw = [
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'rightclick',
  ],
  gw = xt({
    mappedProps: hw,
    name: 'circle',
    ctr: () => google.maps.Circle,
    events: pw,
  }),
  mw = {
    bounds: { type: Object, twoWay: !0 },
    draggable: { type: Boolean, default: !1 },
    editable: { type: Boolean, default: !1 },
    options: { type: Object, twoWay: !1 },
  },
  _w = [
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'rightclick',
  ],
  yw = xt({
    mappedProps: mw,
    name: 'rectangle',
    ctr: () => google.maps.Rectangle,
    events: _w,
  }),
  Ar = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  vw = {
    animation: { twoWay: !0, type: Number },
    attribution: { type: Object },
    clickable: { type: Boolean, twoWay: !0, default: !0 },
    cursor: { type: String, twoWay: !0 },
    draggable: { type: Boolean, twoWay: !0, default: !1 },
    icon: { twoWay: !0 },
    label: {},
    opacity: { type: Number, default: 1 },
    options: { type: Object },
    place: { type: Object },
    position: { type: Object, twoWay: !0 },
    shape: { type: Object, twoWay: !0 },
    title: { type: String, twoWay: !0 },
    zIndex: { type: Number, twoWay: !0 },
    visible: { twoWay: !0, default: !0 },
  },
  fi = [
    'click',
    'rightclick',
    'dblclick',
    'drag',
    'dragstart',
    'dragend',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
  ],
  bw = xt({
    mappedProps: vw,
    events: fi,
    name: 'marker',
    ctr: () => google.maps.Marker,
    inject: { $clusterPromise: { default: null } },
    emits: fi,
    unmounted() {
      !this.$markerObject ||
        (this.$clusterObject
          ? this.$clusterObject.removeMarker(this.$markerObject, !0)
          : this.$markerObject.setMap(null));
    },
    beforeCreate(e) {
      return this.$clusterPromise && (e.map = null), this.$clusterPromise;
    },
    afterCreate(e) {
      fi.forEach((t) => {
        e.addListener(t, (n) => {
          this.$emit(t, n);
        });
      }),
        this.$clusterPromise &&
          this.$clusterPromise.then((t) => {
            (this.$clusterObject = t), t.addMarker(e);
          });
    },
  });
function ww(e, t, n, r, s, i) {
  return (
    We(),
    xn(
      'div',
      {
        onClick:
          t[0] ||
          (t[0] = () => {
            e.console.log('sdfsd');
          }),
      },
      [ar(e.$slots, 'default')]
    )
  );
}
const Ew = Ar(bw, [['render', ww]]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Zi =
  function (e, t) {
    return (
      (Zi =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (n, r) {
            n.__proto__ = r;
          }) ||
        function (n, r) {
          for (var s in r) r.hasOwnProperty(s) && (n[s] = r[s]);
        }),
      Zi(e, t)
    );
  };
function df(e, t) {
  Zi(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
var Vt = function () {
  return (
    (Vt =
      Object.assign ||
      function (t) {
        for (var n, r = 1, s = arguments.length; r < s; r++) {
          n = arguments[r];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }),
    Vt.apply(this, arguments)
  );
};
function Iw(e, t) {
  for (var n in t.prototype) e.prototype[n] = t.prototype[n];
}
var hf = (function () {
  function e() {
    Iw(e, google.maps.OverlayView);
  }
  return e;
})();
function di(e) {
  return Object.keys(e)
    .reduce(function (t, n) {
      return e[n] && t.push(n + ':' + e[n]), t;
    }, [])
    .join(';');
}
function xe(e) {
  return e ? e + 'px' : void 0;
}
var Cw = (function (e) {
    df(t, e);
    function t(n, r) {
      var s = e.call(this) || this;
      return (
        (s.cluster_ = n),
        (s.styles_ = r),
        (s.center_ = null),
        (s.div_ = null),
        (s.sums_ = null),
        (s.visible_ = !1),
        (s.style = null),
        s.setMap(n.getMap()),
        s
      );
    }
    return (
      (t.prototype.onAdd = function () {
        var n = this,
          r,
          s,
          i = this.cluster_.getMarkerClusterer(),
          o = google.maps.version.split('.'),
          a = o[0],
          c = o[1],
          l = parseInt(a, 10) * 100 + parseInt(c, 10);
        (this.div_ = document.createElement('div')),
          this.visible_ && this.show(),
          this.getPanes().overlayMouseTarget.appendChild(this.div_),
          (this.boundsChangedListener_ = google.maps.event.addListener(
            this.getMap(),
            'bounds_changed',
            function () {
              s = r;
            }
          )),
          google.maps.event.addDomListener(this.div_, 'mousedown', function () {
            (r = !0), (s = !1);
          }),
          google.maps.event.addDomListener(
            this.div_,
            'contextmenu',
            function () {
              google.maps.event.trigger(i, 'contextmenu', n.cluster_);
            }
          ),
          l >= 332 &&
            google.maps.event.addDomListener(
              this.div_,
              'touchstart',
              function (u) {
                u.stopPropagation();
              }
            ),
          google.maps.event.addDomListener(this.div_, 'click', function (u) {
            if (((r = !1), !s)) {
              if (
                (google.maps.event.trigger(i, 'click', n.cluster_),
                google.maps.event.trigger(i, 'clusterclick', n.cluster_),
                i.getZoomOnClick())
              ) {
                var f = i.getMaxZoom(),
                  d = n.cluster_.getBounds();
                i.getMap().fitBounds(d),
                  setTimeout(function () {
                    i.getMap().fitBounds(d),
                      f !== null &&
                        i.getMap().getZoom() > f &&
                        i.getMap().setZoom(f + 1);
                  }, 100);
              }
              (u.cancelBubble = !0), u.stopPropagation && u.stopPropagation();
            }
          }),
          google.maps.event.addDomListener(this.div_, 'mouseover', function () {
            google.maps.event.trigger(i, 'mouseover', n.cluster_);
          }),
          google.maps.event.addDomListener(this.div_, 'mouseout', function () {
            google.maps.event.trigger(i, 'mouseout', n.cluster_);
          });
      }),
      (t.prototype.onRemove = function () {
        this.div_ &&
          this.div_.parentNode &&
          (this.hide(),
          google.maps.event.removeListener(this.boundsChangedListener_),
          google.maps.event.clearInstanceListeners(this.div_),
          this.div_.parentNode.removeChild(this.div_),
          (this.div_ = null));
      }),
      (t.prototype.draw = function () {
        if (this.visible_) {
          var n = this.getPosFromLatLng_(this.center_);
          (this.div_.style.top = n.y + 'px'),
            (this.div_.style.left = n.x + 'px');
        }
      }),
      (t.prototype.hide = function () {
        this.div_ && (this.div_.style.display = 'none'), (this.visible_ = !1);
      }),
      (t.prototype.show = function () {
        this.div_ &&
          ((this.div_.className = this.className_),
          (this.div_.style.cssText = this.createCss_(
            this.getPosFromLatLng_(this.center_)
          )),
          (this.div_.innerHTML =
            (this.style.url ? this.getImageElementHtml() : '') +
            this.getLabelDivHtml()),
          typeof this.sums_.title > 'u' || this.sums_.title === ''
            ? (this.div_.title = this.cluster_.getMarkerClusterer().getTitle())
            : (this.div_.title = this.sums_.title),
          (this.div_.style.display = '')),
          (this.visible_ = !0);
      }),
      (t.prototype.getLabelDivHtml = function () {
        var n = this.cluster_.getMarkerClusterer(),
          r = n.ariaLabelFn(this.sums_.text),
          s = {
            position: 'absolute',
            top: xe(this.anchorText_[0]),
            left: xe(this.anchorText_[1]),
            color: this.style.textColor,
            'font-size': xe(this.style.textSize),
            'font-family': this.style.fontFamily,
            'font-weight': this.style.fontWeight,
            'font-style': this.style.fontStyle,
            'text-decoration': this.style.textDecoration,
            'text-align': 'center',
            width: xe(this.style.width),
            'line-height': xe(this.style.textLineHeight),
          };
        return `
<div aria-label="`
          .concat(r, '" style="')
          .concat(
            di(s),
            `" tabindex="0">
  <span aria-hidden="true">`
          )
          .concat(
            this.sums_.text,
            `</span>
</div>
`
          );
      }),
      (t.prototype.getImageElementHtml = function () {
        var n = (this.style.backgroundPosition || '0 0').split(' '),
          r = parseInt(n[0].replace(/^\s+|\s+$/g, ''), 10),
          s = parseInt(n[1].replace(/^\s+|\s+$/g, ''), 10),
          i = {};
        if (this.cluster_.getMarkerClusterer().getEnableRetinaIcons())
          i = { width: xe(this.style.width), height: xe(this.style.height) };
        else {
          var o = [
              -1 * s,
              -1 * r + this.style.width,
              -1 * s + this.style.height,
              -1 * r,
            ],
            a = o[0],
            c = o[1],
            l = o[2],
            u = o[3];
          i = {
            clip: 'rect('
              .concat(a, 'px, ')
              .concat(c, 'px, ')
              .concat(l, 'px, ')
              .concat(u, 'px)'),
          };
        }
        var f = this.sums_.url ? { width: '100%', height: '100%' } : {},
          d = di(
            Vt(Vt({ position: 'absolute', top: xe(s), left: xe(r) }, i), f)
          );
        return '<img alt="'
          .concat(this.sums_.text, '" aria-hidden="true" src="')
          .concat(this.style.url, '" style="')
          .concat(d, '"/>');
      }),
      (t.prototype.useStyle = function (n) {
        this.sums_ = n;
        var r = Math.max(0, n.index - 1);
        (r = Math.min(this.styles_.length - 1, r)),
          (this.style = this.sums_.url
            ? Vt(Vt({}, this.styles_[r]), { url: this.sums_.url })
            : this.styles_[r]),
          (this.anchorText_ = this.style.anchorText || [0, 0]),
          (this.anchorIcon_ = this.style.anchorIcon || [
            Math.floor(this.style.height / 2),
            Math.floor(this.style.width / 2),
          ]),
          (this.className_ =
            this.cluster_.getMarkerClusterer().getClusterClass() +
            ' ' +
            (this.style.className || 'cluster-' + r));
      }),
      (t.prototype.setCenter = function (n) {
        this.center_ = n;
      }),
      (t.prototype.createCss_ = function (n) {
        return di({
          'z-index': ''.concat(this.cluster_.getMarkerClusterer().getZIndex()),
          top: xe(n.y),
          left: xe(n.x),
          width: xe(this.style.width),
          height: xe(this.style.height),
          cursor: 'pointer',
          position: 'absolute',
          '-webkit-user-select': 'none',
          '-khtml-user-select': 'none',
          '-moz-user-select': 'none',
          '-o-user-select': 'none',
          'user-select': 'none',
        });
      }),
      (t.prototype.getPosFromLatLng_ = function (n) {
        var r = this.getProjection().fromLatLngToDivPixel(n);
        return (
          (r.x = Math.floor(r.x - this.anchorIcon_[1])),
          (r.y = Math.floor(r.y - this.anchorIcon_[0])),
          r
        );
      }),
      t
    );
  })(hf),
  Tw = (function () {
    function e(t) {
      (this.markerClusterer_ = t),
        (this.map_ = this.markerClusterer_.getMap()),
        (this.minClusterSize_ = this.markerClusterer_.getMinimumClusterSize()),
        (this.averageCenter_ = this.markerClusterer_.getAverageCenter()),
        (this.markers_ = []),
        (this.center_ = null),
        (this.bounds_ = null),
        (this.clusterIcon_ = new Cw(this, this.markerClusterer_.getStyles()));
    }
    return (
      (e.prototype.getSize = function () {
        return this.markers_.length;
      }),
      (e.prototype.getMarkers = function () {
        return this.markers_;
      }),
      (e.prototype.getCenter = function () {
        return this.center_;
      }),
      (e.prototype.getMap = function () {
        return this.map_;
      }),
      (e.prototype.getMarkerClusterer = function () {
        return this.markerClusterer_;
      }),
      (e.prototype.getBounds = function () {
        for (
          var t = new google.maps.LatLngBounds(this.center_, this.center_),
            n = this.getMarkers(),
            r = 0;
          r < n.length;
          r++
        )
          t.extend(n[r].getPosition());
        return t;
      }),
      (e.prototype.remove = function () {
        this.clusterIcon_.setMap(null),
          (this.markers_ = []),
          delete this.markers_;
      }),
      (e.prototype.addMarker = function (t) {
        if (this.isMarkerAlreadyAdded_(t)) return !1;
        if (!this.center_)
          (this.center_ = t.getPosition()), this.calculateBounds_();
        else if (this.averageCenter_) {
          var n = this.markers_.length + 1,
            r = (this.center_.lat() * (n - 1) + t.getPosition().lat()) / n,
            s = (this.center_.lng() * (n - 1) + t.getPosition().lng()) / n;
          (this.center_ = new google.maps.LatLng(r, s)),
            this.calculateBounds_();
        }
        (t.isAdded = !0), this.markers_.push(t);
        var i = this.markers_.length,
          o = this.markerClusterer_.getMaxZoom();
        if (o !== null && this.map_.getZoom() > o)
          t.getMap() !== this.map_ && t.setMap(this.map_);
        else if (i < this.minClusterSize_)
          t.getMap() !== this.map_ && t.setMap(this.map_);
        else if (i === this.minClusterSize_)
          for (var a = 0; a < i; a++) this.markers_[a].setMap(null);
        else t.setMap(null);
        return !0;
      }),
      (e.prototype.isMarkerInClusterBounds = function (t) {
        return this.bounds_.contains(t.getPosition());
      }),
      (e.prototype.calculateBounds_ = function () {
        var t = new google.maps.LatLngBounds(this.center_, this.center_);
        this.bounds_ = this.markerClusterer_.getExtendedBounds(t);
      }),
      (e.prototype.updateIcon = function () {
        var t = this.markers_.length,
          n = this.markerClusterer_.getMaxZoom();
        if (n !== null && this.map_.getZoom() > n) {
          this.clusterIcon_.hide();
          return;
        }
        if (t < this.minClusterSize_) {
          this.clusterIcon_.hide();
          return;
        }
        var r = this.markerClusterer_.getStyles().length,
          s = this.markerClusterer_.getCalculator()(this.markers_, r);
        this.clusterIcon_.setCenter(this.center_),
          this.clusterIcon_.useStyle(s),
          this.clusterIcon_.show();
      }),
      (e.prototype.isMarkerAlreadyAdded_ = function (t) {
        if (this.markers_.indexOf) return this.markers_.indexOf(t) !== -1;
        for (var n = 0; n < this.markers_.length; n++)
          if (t === this.markers_[n]) return !0;
        return !1;
      }),
      e
    );
  })(),
  Fr = function (e, t, n) {
    return e[t] !== void 0 ? e[t] : n;
  },
  Cc = (function (e) {
    df(t, e);
    function t(n, r, s) {
      r === void 0 && (r = []), s === void 0 && (s = {});
      var i = e.call(this) || this;
      return (
        (i.options = s),
        (i.markers_ = []),
        (i.clusters_ = []),
        (i.listeners_ = []),
        (i.activeMap_ = null),
        (i.ready_ = !1),
        (i.ariaLabelFn =
          i.options.ariaLabelFn ||
          function () {
            return '';
          }),
        (i.zIndex_ =
          i.options.zIndex || Number(google.maps.Marker.MAX_ZINDEX) + 1),
        (i.gridSize_ = i.options.gridSize || 60),
        (i.minClusterSize_ = i.options.minimumClusterSize || 2),
        (i.maxZoom_ = i.options.maxZoom || null),
        (i.styles_ = i.options.styles || []),
        (i.title_ = i.options.title || ''),
        (i.zoomOnClick_ = Fr(i.options, 'zoomOnClick', !0)),
        (i.averageCenter_ = Fr(i.options, 'averageCenter', !1)),
        (i.ignoreHidden_ = Fr(i.options, 'ignoreHidden', !1)),
        (i.enableRetinaIcons_ = Fr(i.options, 'enableRetinaIcons', !1)),
        (i.imagePath_ = i.options.imagePath || t.IMAGE_PATH),
        (i.imageExtension_ = i.options.imageExtension || t.IMAGE_EXTENSION),
        (i.imageSizes_ = i.options.imageSizes || t.IMAGE_SIZES),
        (i.calculator_ = i.options.calculator || t.CALCULATOR),
        (i.batchSize_ = i.options.batchSize || t.BATCH_SIZE),
        (i.batchSizeIE_ = i.options.batchSizeIE || t.BATCH_SIZE_IE),
        (i.clusterClass_ = i.options.clusterClass || 'cluster'),
        navigator.userAgent.toLowerCase().indexOf('msie') !== -1 &&
          (i.batchSize_ = i.batchSizeIE_),
        i.setupStyles_(),
        i.addMarkers(r, !0),
        i.setMap(n),
        i
      );
    }
    return (
      (t.prototype.onAdd = function () {
        var n = this;
        (this.activeMap_ = this.getMap()),
          (this.ready_ = !0),
          this.repaint(),
          (this.prevZoom_ = this.getMap().getZoom()),
          (this.listeners_ = [
            google.maps.event.addListener(
              this.getMap(),
              'zoom_changed',
              function () {
                var r = n.getMap(),
                  s = r.minZoom || 0,
                  i = Math.min(
                    r.maxZoom || 100,
                    r.mapTypes[r.getMapTypeId()].maxZoom
                  ),
                  o = Math.min(Math.max(n.getMap().getZoom(), s), i);
                n.prevZoom_ != o && ((n.prevZoom_ = o), n.resetViewport_(!1));
              }
            ),
            google.maps.event.addListener(this.getMap(), 'idle', function () {
              n.redraw_();
            }),
          ]);
      }),
      (t.prototype.onRemove = function () {
        for (var n = 0; n < this.markers_.length; n++)
          this.markers_[n].getMap() !== this.activeMap_ &&
            this.markers_[n].setMap(this.activeMap_);
        for (var n = 0; n < this.clusters_.length; n++)
          this.clusters_[n].remove();
        this.clusters_ = [];
        for (var n = 0; n < this.listeners_.length; n++)
          google.maps.event.removeListener(this.listeners_[n]);
        (this.listeners_ = []), (this.activeMap_ = null), (this.ready_ = !1);
      }),
      (t.prototype.draw = function () {}),
      (t.prototype.setupStyles_ = function () {
        if (!(this.styles_.length > 0))
          for (var n = 0; n < this.imageSizes_.length; n++) {
            var r = this.imageSizes_[n];
            this.styles_.push(
              t.withDefaultStyle({
                url: this.imagePath_ + (n + 1) + '.' + this.imageExtension_,
                height: r,
                width: r,
              })
            );
          }
      }),
      (t.prototype.fitMapToMarkers = function (n) {
        for (
          var r = this.getMarkers(), s = new google.maps.LatLngBounds(), i = 0;
          i < r.length;
          i++
        )
          (r[i].getVisible() || !this.getIgnoreHidden()) &&
            s.extend(r[i].getPosition());
        this.getMap().fitBounds(s, n);
      }),
      (t.prototype.getGridSize = function () {
        return this.gridSize_;
      }),
      (t.prototype.setGridSize = function (n) {
        this.gridSize_ = n;
      }),
      (t.prototype.getMinimumClusterSize = function () {
        return this.minClusterSize_;
      }),
      (t.prototype.setMinimumClusterSize = function (n) {
        this.minClusterSize_ = n;
      }),
      (t.prototype.getMaxZoom = function () {
        return this.maxZoom_;
      }),
      (t.prototype.setMaxZoom = function (n) {
        this.maxZoom_ = n;
      }),
      (t.prototype.getZIndex = function () {
        return this.zIndex_;
      }),
      (t.prototype.setZIndex = function (n) {
        this.zIndex_ = n;
      }),
      (t.prototype.getStyles = function () {
        return this.styles_;
      }),
      (t.prototype.setStyles = function (n) {
        this.styles_ = n;
      }),
      (t.prototype.getTitle = function () {
        return this.title_;
      }),
      (t.prototype.setTitle = function (n) {
        this.title_ = n;
      }),
      (t.prototype.getZoomOnClick = function () {
        return this.zoomOnClick_;
      }),
      (t.prototype.setZoomOnClick = function (n) {
        this.zoomOnClick_ = n;
      }),
      (t.prototype.getAverageCenter = function () {
        return this.averageCenter_;
      }),
      (t.prototype.setAverageCenter = function (n) {
        this.averageCenter_ = n;
      }),
      (t.prototype.getIgnoreHidden = function () {
        return this.ignoreHidden_;
      }),
      (t.prototype.setIgnoreHidden = function (n) {
        this.ignoreHidden_ = n;
      }),
      (t.prototype.getEnableRetinaIcons = function () {
        return this.enableRetinaIcons_;
      }),
      (t.prototype.setEnableRetinaIcons = function (n) {
        this.enableRetinaIcons_ = n;
      }),
      (t.prototype.getImageExtension = function () {
        return this.imageExtension_;
      }),
      (t.prototype.setImageExtension = function (n) {
        this.imageExtension_ = n;
      }),
      (t.prototype.getImagePath = function () {
        return this.imagePath_;
      }),
      (t.prototype.setImagePath = function (n) {
        this.imagePath_ = n;
      }),
      (t.prototype.getImageSizes = function () {
        return this.imageSizes_;
      }),
      (t.prototype.setImageSizes = function (n) {
        this.imageSizes_ = n;
      }),
      (t.prototype.getCalculator = function () {
        return this.calculator_;
      }),
      (t.prototype.setCalculator = function (n) {
        this.calculator_ = n;
      }),
      (t.prototype.getBatchSizeIE = function () {
        return this.batchSizeIE_;
      }),
      (t.prototype.setBatchSizeIE = function (n) {
        this.batchSizeIE_ = n;
      }),
      (t.prototype.getClusterClass = function () {
        return this.clusterClass_;
      }),
      (t.prototype.setClusterClass = function (n) {
        this.clusterClass_ = n;
      }),
      (t.prototype.getMarkers = function () {
        return this.markers_;
      }),
      (t.prototype.getTotalMarkers = function () {
        return this.markers_.length;
      }),
      (t.prototype.getClusters = function () {
        return this.clusters_;
      }),
      (t.prototype.getTotalClusters = function () {
        return this.clusters_.length;
      }),
      (t.prototype.addMarker = function (n, r) {
        this.pushMarkerTo_(n), r || this.redraw_();
      }),
      (t.prototype.addMarkers = function (n, r) {
        for (var s in n)
          Object.prototype.hasOwnProperty.call(n, s) &&
            this.pushMarkerTo_(n[s]);
        r || this.redraw_();
      }),
      (t.prototype.pushMarkerTo_ = function (n) {
        var r = this;
        n.getDraggable() &&
          google.maps.event.addListener(n, 'dragend', function () {
            r.ready_ && ((n.isAdded = !1), r.repaint());
          }),
          (n.isAdded = !1),
          this.markers_.push(n);
      }),
      (t.prototype.removeMarker = function (n, r) {
        var s = this.removeMarker_(n);
        return !r && s && this.repaint(), s;
      }),
      (t.prototype.removeMarkers = function (n, r) {
        for (var s = !1, i = 0; i < n.length; i++) {
          var o = this.removeMarker_(n[i]);
          s = s || o;
        }
        return !r && s && this.repaint(), s;
      }),
      (t.prototype.removeMarker_ = function (n) {
        var r = -1;
        if (this.markers_.indexOf) r = this.markers_.indexOf(n);
        else
          for (var s = 0; s < this.markers_.length; s++)
            if (n === this.markers_[s]) {
              r = s;
              break;
            }
        return r === -1 ? !1 : (n.setMap(null), this.markers_.splice(r, 1), !0);
      }),
      (t.prototype.clearMarkers = function () {
        this.resetViewport_(!0), (this.markers_ = []);
      }),
      (t.prototype.repaint = function () {
        var n = this.clusters_.slice();
        (this.clusters_ = []),
          this.resetViewport_(!1),
          this.redraw_(),
          setTimeout(function () {
            for (var r = 0; r < n.length; r++) n[r].remove();
          }, 0);
      }),
      (t.prototype.getExtendedBounds = function (n) {
        var r = this.getProjection(),
          s = new google.maps.LatLng(
            n.getNorthEast().lat(),
            n.getNorthEast().lng()
          ),
          i = new google.maps.LatLng(
            n.getSouthWest().lat(),
            n.getSouthWest().lng()
          ),
          o = r.fromLatLngToDivPixel(s);
        (o.x += this.gridSize_), (o.y -= this.gridSize_);
        var a = r.fromLatLngToDivPixel(i);
        (a.x -= this.gridSize_), (a.y += this.gridSize_);
        var c = r.fromDivPixelToLatLng(o),
          l = r.fromDivPixelToLatLng(a);
        return n.extend(c), n.extend(l), n;
      }),
      (t.prototype.redraw_ = function () {
        this.createClusters_(0);
      }),
      (t.prototype.resetViewport_ = function (n) {
        for (var r = 0; r < this.clusters_.length; r++)
          this.clusters_[r].remove();
        this.clusters_ = [];
        for (var r = 0; r < this.markers_.length; r++) {
          var s = this.markers_[r];
          (s.isAdded = !1), n && s.setMap(null);
        }
      }),
      (t.prototype.distanceBetweenPoints_ = function (n, r) {
        var s = 6371,
          i = ((r.lat() - n.lat()) * Math.PI) / 180,
          o = ((r.lng() - n.lng()) * Math.PI) / 180,
          a =
            Math.sin(i / 2) * Math.sin(i / 2) +
            Math.cos((n.lat() * Math.PI) / 180) *
              Math.cos((r.lat() * Math.PI) / 180) *
              Math.sin(o / 2) *
              Math.sin(o / 2),
          c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return s * c;
      }),
      (t.prototype.isMarkerInBounds_ = function (n, r) {
        return r.contains(n.getPosition());
      }),
      (t.prototype.addToClosestCluster_ = function (n) {
        for (var r = 4e4, s = null, i = 0; i < this.clusters_.length; i++) {
          var o = this.clusters_[i],
            a = o.getCenter();
          if (a) {
            var c = this.distanceBetweenPoints_(a, n.getPosition());
            c < r && ((r = c), (s = o));
          }
        }
        if (s && s.isMarkerInClusterBounds(n)) s.addMarker(n);
        else {
          var o = new Tw(this);
          o.addMarker(n), this.clusters_.push(o);
        }
      }),
      (t.prototype.createClusters_ = function (n) {
        var r = this;
        if (!!this.ready_) {
          n === 0 &&
            (google.maps.event.trigger(this, 'clusteringbegin', this),
            typeof this.timerRefStatic < 'u' &&
              (clearTimeout(this.timerRefStatic), delete this.timerRefStatic));
          for (
            var s = new google.maps.LatLngBounds(
                this.getMap().getBounds().getSouthWest(),
                this.getMap().getBounds().getNorthEast()
              ),
              i = this.getExtendedBounds(s),
              o = Math.min(n + this.batchSize_, this.markers_.length),
              a = n;
            a < o;
            a++
          ) {
            var c = this.markers_[a];
            !c.isAdded &&
              this.isMarkerInBounds_(c, i) &&
              (!this.ignoreHidden_ || (this.ignoreHidden_ && c.getVisible())) &&
              this.addToClosestCluster_(c);
          }
          if (o < this.markers_.length)
            this.timerRefStatic = window.setTimeout(function () {
              r.createClusters_(o);
            }, 0);
          else {
            delete this.timerRefStatic,
              google.maps.event.trigger(this, 'clusteringend', this);
            for (var a = 0; a < this.clusters_.length; a++)
              this.clusters_[a].updateIcon();
          }
        }
      }),
      (t.CALCULATOR = function (n, r) {
        for (var s = 0, i = n.length, o = i; o !== 0; )
          (o = Math.floor(o / 10)), s++;
        return (
          (s = Math.min(s, r)), { text: i.toString(), index: s, title: '' }
        );
      }),
      (t.withDefaultStyle = function (n) {
        return Vt(
          {
            textColor: 'black',
            textSize: 11,
            textDecoration: 'none',
            textLineHeight: n.height,
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontFamily: 'Arial,sans-serif',
            backgroundPosition: '0 0',
          },
          n
        );
      }),
      (t.BATCH_SIZE = 2e3),
      (t.BATCH_SIZE_IE = 500),
      (t.IMAGE_PATH = '../images/m'),
      (t.IMAGE_EXTENSION = 'png'),
      (t.IMAGE_SIZES = [53, 56, 66, 78, 90]),
      t
    );
  })(hf);
const hi = {
    maxZoom: { type: Number, twoWay: !1 },
    batchSizeIE: { type: Number, twoWay: !1 },
    calculator: { type: Function, twoWay: !1 },
    enableRetinaIcons: { type: Boolean, twoWay: !1 },
    gridSize: { type: Number, twoWay: !1 },
    ignoreHidden: { type: Boolean, twoWay: !1 },
    imageExtension: { type: String, twoWay: !1 },
    imagePath: { type: String, twoWay: !1 },
    imageSizes: { type: Array, twoWay: !1 },
    minimumClusterSize: { type: Number, twoWay: !1 },
    styles: { type: Array, twoWay: !1 },
    zoomOnClick: { type: Boolean, twoWay: !1 },
  },
  kw = [
    'click',
    'rightclick',
    'dblclick',
    'drag',
    'dragstart',
    'dragend',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
  ],
  Sw = xt({
    mappedProps: hi,
    events: kw,
    name: 'cluster',
    ctr: () => {
      if (typeof Cc > 'u') {
        const e = 'MarkerClusterer is not installed!';
        throw (console.error(e), new Error(e));
      }
      return Cc;
    },
    ctrArgs: ({ map: e, ...t }) => [e, [], t],
    afterCreate(e) {
      const t = () => {
        const n = e.getMarkers();
        e.clearMarkers(), e.addMarkers(n);
      };
      for (let n in hi)
        hi[n].twoWay && this.$on(n.toLowerCase() + '_changed', t);
    },
    updated() {
      this.$clusterObject && this.$clusterObject.repaint();
    },
    beforeUnmount() {
      this.$children &&
        this.$children.length &&
        this.$children.forEach((e) => {
          e.$clusterObject === this.$clusterObject && (e.$clusterObject = null);
        }),
        this.$clusterObject && this.$clusterObject.clearMarkers();
    },
  });
function Aw(e, t, n, r, s, i) {
  return We(), xn('div', null, [ar(e.$slots, 'default')]);
}
const Rw = Ar(Sw, [['render', Aw]]),
  Pw = {
    options: {
      type: Object,
      required: !1,
      default() {
        return {};
      },
    },
    position: { type: Object, twoWay: !0 },
    zIndex: { type: Number, twoWay: !0 },
  },
  Ow = ['domready', 'click', 'closeclick', 'content_changed'],
  Mw = xt({
    mappedProps: Pw,
    events: Ow,
    name: 'infoWindow',
    ctr: () => google.maps.InfoWindow,
    props: { opened: { type: Boolean, default: !0 } },
    inject: { $markerPromise: { default: null } },
    mounted() {
      const e = this.$refs.infoWindow;
      e.parentNode.removeChild(e);
    },
    beforeCreate(e) {
      if (((e.content = this.$refs.infoWindow), this.$markerPromise))
        return (
          delete e.position,
          this.$markerPromise.then((t) => ((this.$markerObject = t), t))
        );
    },
    emits: ['closeclick'],
    methods: {
      _openInfoWindow() {
        this.$infoWindowObject.close(),
          this.opened
            ? this.$infoWindowObject.open(this.$map, this.$markerObject)
            : this.$emit('closeclick');
      },
    },
    afterCreate() {
      this._openInfoWindow(),
        this.$watch('opened', () => {
          this._openInfoWindow();
        });
    },
  }),
  Lw = { ref: 'infoWindow' };
function $w(e, t, n, r, s, i) {
  return We(), xn('div', Lw, [ar(e.$slots, 'default')], 512);
}
const xw = Ar(Mw, [['render', $w]]),
  Nw = {
    props: ['resizeBus'],
    data() {
      return { _actualResizeBus: null };
    },
    created() {
      typeof this.resizeBus > 'u'
        ? (this.$data._actualResizeBus = this.$gmapDefaultResizeBus)
        : (this.$data._actualResizeBus = this.resizeBus);
    },
    methods: {
      _resizeCallback() {
        this.resize();
      },
      isFunction(e) {
        return e && {}.toString.call(e) === '[object Function]';
      },
      _delayedResizeCallback() {
        this.$nextTick(() => this._resizeCallback());
      },
    },
    watch: {
      resizeBus(e) {
        this.$data._actualResizeBus = e;
      },
      '$data._actualResizeBus'(e, t) {
        t && t.$off('resize', this._delayedResizeCallback);
      },
    },
    unmounted() {
      this.$data._actualResizeBus &&
        this.isFunction(this.$data._actualResizeBus.$off) &&
        this.$data._actualResizeBus.$off('resize', this._delayedResizeCallback);
    },
  };
function Dw(e) {
  let t = 0;
  e(
    () => {
      t += 1;
    },
    () => {
      t = Math.max(0, t - 1);
    },
    () => t === 0
  );
}
const pi = {
    center: { required: !0, twoWay: !0, type: Object, noBind: !0 },
    zoom: { required: !1, twoWay: !0, type: Number, noBind: !0 },
    heading: { type: Number, twoWay: !0 },
    mapTypeId: { twoWay: !0, type: String },
    tilt: { twoWay: !0, type: Number },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  Tc = [
    'bounds_changed',
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'idle',
    'mousemove',
    'mouseout',
    'mouseover',
    'resize',
    'rightclick',
    'tilesloaded',
  ],
  Bw = ['panBy', 'panTo', 'panToBounds', 'fitBounds'].reduce(
    (e, t) => (
      (e[t] = function () {
        this.$mapObject && this.$mapObject[t].apply(this.$mapObject, arguments);
      }),
      e
    ),
    {}
  ),
  Hw = {
    resize() {
      this.$mapObject && google.maps.event.trigger(this.$mapObject, 'resize');
    },
    resizePreserveCenter() {
      if (!this.$mapObject) return;
      const e = this.$mapObject.getCenter();
      google.maps.event.trigger(this.$mapObject, 'resize'),
        this.$mapObject.setCenter(e);
    },
    _resizeCallback() {
      this.resizePreserveCenter();
    },
  },
  Uw = {
    mixins: [Nw],
    props: Do({
      ...pi,
      ...Tc.reduce(
        (e, t) => ({
          ...e,
          [`on${t.charAt(0).toUpperCase()}${t.slice(1)}`.replace(
            /[-_]+(.)?/g,
            (n, r) => (r ? r.toUpperCase() : '')
          )]: Function,
        }),
        {}
      ),
    }),
    inheritAttrs: !1,
    provide() {
      return (
        (this.$mapPromise = new Promise((e, t) => {
          this.$mapPromiseDeferred = { resolve: e, reject: t };
        })),
        { $mapPromise: this.$mapPromise }
      );
    },
    emits: ['center_changed', 'zoom_changed', 'bounds_changed'],
    computed: {
      finalLat() {
        return this.center && typeof this.center.lat == 'function'
          ? this.center.lat()
          : this.center.lat;
      },
      finalLng() {
        return this.center && typeof this.center.lng == 'function'
          ? this.center.lng()
          : this.center.lng;
      },
      finalLatLng() {
        return { lat: this.finalLat, lng: this.finalLng };
      },
    },
    watch: {
      zoom(e) {
        this.$mapObject && this.$mapObject.setZoom(e);
      },
    },
    mounted() {
      return this.$gmapApiPromiseLazy()
        .then(() => {
          const e = this.$refs['vue-map'],
            t = { ...this.options, ..._s(this, pi) };
          return (
            delete t.options,
            (this.$mapObject = new google.maps.Map(e, t)),
            No(this, this.$mapObject, pi),
            uf(this, this.$mapObject, Tc),
            Dw((n, r, s) => {
              this.$mapObject.addListener('center_changed', () => {
                s() &&
                  this.$emit('center_changed', this.$mapObject.getCenter()),
                  r();
              }),
                ff(this, ['finalLat', 'finalLng'], () => {
                  n(), this.$mapObject.setCenter(this.finalLatLng);
                });
            }),
            this.$mapObject.addListener('zoom_changed', () => {
              this.$emit('zoom_changed', this.$mapObject.getZoom());
            }),
            this.$mapObject.addListener('bounds_changed', () => {
              this.$emit('bounds_changed', this.$mapObject.getBounds());
            }),
            this.$mapPromiseDeferred.resolve(this.$mapObject),
            this.$mapObject
          );
        })
        .catch((e) => {
          throw e;
        });
    },
    methods: { ...Hw, ...Bw },
  },
  jw = { class: 'vue-map-hidden' };
function Fw(e, t, n, r, s, i) {
  return (
    We(),
    xn(
      'div',
      { class: gr(['vue-map-container', e.$attrs.class]) },
      [
        ss(
          'div',
          {
            ref: 'vue-map',
            class: 'vue-map',
            style: pr(e.$attrs.style ? e.$attrs.style : ''),
          },
          null,
          4
        ),
        ss('div', jw, [ar(e.$slots, 'default')]),
        ar(e.$slots, 'visible'),
      ],
      2
    )
  );
}
const Ww = Ar(Uw, [['render', Fw]]),
  zw = {
    options: { type: Object, twoWay: !1, default: () => {} },
    data: { type: Array, twoWay: !0 },
  },
  Vw = [],
  Kw = xt({
    mappedProps: zw,
    name: 'heatmap',
    ctr: () => google.maps.visualization.HeatmapLayer,
    events: Vw,
  }),
  qw = (e) => {
    const t = e.addEventListener ? e.addEventListener : e.attachEvent;
    function n(r, s) {
      if (r === 'keydown') {
        const i = s;
        s = function (o) {
          const a =
            document.getElementsByClassName('pac-item-selected').length > 0;
          if (o.which === 13 && !a) {
            const c = document.createEvent('Event');
            (c.keyCode = 40), (c.which = 40), i.apply(e, [c]);
          }
          i.apply(e, [o]);
        };
      }
      t.apply(e, [r, s]);
    }
    (e.addEventListener = n), (e.attachEvent = n);
  },
  gi = {
    bounds: { type: Object },
    componentRestrictions: { type: Object, noBind: !0 },
    types: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  Gw = {
    selectFirstOnEnter: { required: !1, type: Boolean, default: !1 },
    options: { type: Object },
  },
  Jw = {
    mounted() {
      this.$gmapApiPromiseLazy().then(() => {
        if (
          (this.selectFirstOnEnter && qw(this.$refs.input),
          typeof google.maps.places.Autocomplete != 'function')
        )
          throw new Error(
            "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
          );
        const e = { ..._s(this, gi), ...this.options };
        (this.$autocomplete = new google.maps.places.Autocomplete(
          this.$refs.input,
          e
        )),
          No(this, this.$autocomplete, gi),
          this.$watch('componentRestrictions', (t) => {
            t !== void 0 && this.$autocomplete.setComponentRestrictions(t);
          }),
          this.$autocomplete.addListener('place_changed', () => {
            this.$emit('place_changed', this.$autocomplete.getPlace());
          });
      });
    },
    props: { ...Do(gi), ...Gw },
  };
function Zw(e, t, n, r, s, i) {
  return (
    We(),
    xn('input', $l({ ref: 'input' }, e.$attrs, Ud(e.$attrs, !0)), null, 16)
  );
}
const Yw = Ar(Jw, [['render', Zw]]);
let pf = null;
function Xw(e, t) {
  (t = { installComponents: !0, autobindAllEvents: !1, ...t }),
    (pf = Pi({
      data: function () {
        return { gmapApi: null };
      },
    }));
  const n = Pi();
  let r = Qw(t);
  e.mixin({
    created() {
      (this.$gmapDefaultResizeBus = n),
        (this.$gmapOptions = t),
        (this.$gmapApiPromiseLazy = r);
    },
  }),
    (e.$gmapDefaultResizeBus = n),
    (e.$gmapApiPromiseLazy = r),
    t.installComponents &&
      (e.component('GMapMap', Ww),
      e.component('GMapMarker', Ew),
      e.component('GMapInfoWindow', xw),
      e.component('GMapCluster', Rw),
      e.component('GMapPolyline', lw),
      e.component('GMapPolygon', dw),
      e.component('GMapCircle', gw),
      e.component('GMapRectangle', yw),
      e.component('GMapAutocomplete', Yw),
      e.component('GMapHeatmap', Kw));
}
function Qw(e) {
  function t() {
    return (pf.gmapApi = {}), window.google;
  }
  if (e.load)
    return wc(() =>
      Ji.isServer()
        ? new Promise(() => {}).then(t)
        : new Promise((n, r) => {
            try {
              (window.vueGoogleMapsInit = n), sw(e.load);
            } catch (s) {
              r(s);
            }
          }).then(t)
    );
  {
    const n = new Promise((r) => {
      Ji.isServer() || (window.vueGoogleMapsInit = r);
    }).then(t);
    return wc(() => n);
  }
}
const eE = Dn((e) => {
    e.vueApp.use(Xw, {
      load: { key: 'AIzaSyBYMH9eVYOmIiAHosJZ5Q8zQvVBIfURG7E' },
    });
  }),
  tE = [mg, fm, w_, E_, nw, eE],
  nE = (e, t) =>
    t.path
      .replace(/(:\w+)\([^)]+\)/g, '$1')
      .replace(/(:\w+)[?+*]/g, '$1')
      .replace(/:\w+/g, (n) => {
        var r;
        return (
          ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ''
        );
      }),
  rE = (e, t) => {
    var s;
    const n = t.route.matched.find((i) => {
        var o;
        return (
          ((o = i.components) == null ? void 0 : o.default) === t.Component.type
        );
      }),
      r =
        (s = e != null ? e : n == null ? void 0 : n.meta.key) != null
          ? s
          : n && nE(t.route, n);
    return typeof r == 'function' ? r(t.route) : r;
  },
  sE = (e, t) => ({ default: () => (e ? De(Ad, e === !0 ? {} : e, t) : t) }),
  iE = gt({
    setup(e, { slots: t }) {
      return () => {
        var n;
        return (n = t.default) == null ? void 0 : n.call(t);
      };
    },
  }),
  Yi = (e, t, n) => ({
    default: () => (t ? De(e, t === !0 ? {} : t, n) : De(iE, {}, n)),
  }),
  oE = gt({
    name: 'NuxtPage',
    inheritAttrs: !1,
    props: {
      name: { type: String },
      transition: { type: [Boolean, Object], default: void 0 },
      keepalive: { type: [Boolean, Object], default: void 0 },
      route: { type: Object },
      pageKey: { type: [Function, String], default: null },
    },
    setup(e, { attrs: t }) {
      const n = Ee();
      return () =>
        De(
          vu,
          { name: e.name, route: e.route, ...t },
          {
            default: (r) => {
              var c, l, u, f;
              if (!r.Component) return;
              const s = rE(e.pageKey, r),
                i = n.deferHydration(),
                o = !!((l =
                  (c = e.transition) != null
                    ? c
                    : r.route.meta.pageTransition) != null
                  ? l
                  : Bi),
                a =
                  o &&
                  cE(
                    [
                      e.transition,
                      r.route.meta.pageTransition,
                      Bi,
                      {
                        onAfterLeave: () => {
                          n.callHook('page:transition:finish', r.Component);
                        },
                      },
                    ].filter(Boolean)
                  );
              return Yi(
                Rs,
                o && a,
                sE(
                  (f =
                    (u = e.keepalive) != null ? u : r.route.meta.keepalive) !=
                    null
                    ? f
                    : lm,
                  De(
                    ll,
                    {
                      onPending: () => n.callHook('page:start', r.Component),
                      onResolve: () => {
                        $n(() =>
                          n.callHook('page:finish', r.Component).finally(i)
                        );
                      },
                    },
                    {
                      default: () =>
                        De(lE, {
                          key: s,
                          routeProps: r,
                          pageKey: s,
                          hasTransition: o,
                        }),
                    }
                  )
                )
              ).default();
            },
          }
        );
    },
  });
function aE(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function cE(e) {
  const t = e.map((n) => ({ ...n, onAfterLeave: aE(n.onAfterLeave) }));
  return hg(...t);
}
const lE = gt({
    props: ['routeProps', 'pageKey', 'hasTransition'],
    setup(e) {
      const t = e.pageKey,
        n = e.routeProps.route,
        r = {};
      for (const s in e.routeProps.route)
        r[s] = ve(() => (t === e.pageKey ? e.routeProps.route[s] : n[s]));
      return pn('_route', it(r)), () => De(e.routeProps.Component);
    },
  }),
  gf = {
    default: () =>
      kn(
        () => import('./default.2f488299.js'),
        [
          './default.2f488299.js',
          './navState.fcbedf6b.js',
          './userInfoState.7308cf64.js',
          './firebaseAuthState.9ed8168b.js',
          './index.esm2017.cd6d08be.js',
        ],
        import.meta.url
      ).then((e) => e.default || e),
  },
  uE = gt({
    props: { name: String },
    async setup(e, t) {
      const n = await gf[e.name]().then((r) => r.default || r);
      return () => De(n, {}, t.slots);
    },
  }),
  fE = gt({
    props: { name: { type: [String, Boolean, Object], default: null } },
    setup(e, t) {
      const n = Ne('_route'),
        r = n === Xl() ? p_() : n,
        s = ve(() => {
          var i, o;
          return (o = (i = Oe(e.name)) != null ? i : r.meta.layout) != null
            ? o
            : 'default';
        });
      return () => {
        var a;
        const i = s.value && s.value in gf,
          o = (a = r.meta.layoutTransition) != null ? a : cm;
        return Yi(Rs, i && o, {
          default: () =>
            Yi(
              uE,
              i && { key: s.value, name: s.value, hasTransition: void 0 },
              t.slots
            ).default(),
        }).default();
      };
    },
  }),
  dE = { class: 'h-screen', 'data-theme': 'mytheme' },
  hE = {
    __name: 'app',
    setup(e) {
      return (
        eg({ htmlAttrs: { 'data-theme': 'forest' } }),
        (t, n) => {
          const r = oE,
            s = fE;
          return (
            We(),
            xn('div', dE, [he(s, null, { default: fo(() => [he(r)]), _: 1 })])
          );
        }
      );
    },
  },
  kc = {
    __name: 'nuxt-root',
    setup(e) {
      const t = kd(() =>
          kn(
            () => import('./error-component.de8abb37.js'),
            [],
            import.meta.url
          ).then((i) => i.default || i)
        ),
        n = Ee(),
        r = n.deferHydration();
      pn('_route', Xl()),
        n.hooks.callHookWith((i) => i.map((o) => o()), 'vue:setup');
      const s = Ls();
      return (
        yl((i, o, a) => {
          n.hooks
            .callHook('vue:error', i, o, a)
            .catch((c) => console.error('[nuxt] Error in `vue:error` hook', c)),
            Jp(i) && (i.fatal || i.unhandled) && Ct(n, Vn, [i]);
        }),
        (i, o) => (
          We(),
          Yn(
            ll,
            { onResolve: Oe(r) },
            {
              default: fo(() => [
                Oe(s)
                  ? (We(),
                    Yn(Oe(t), { key: 0, error: Oe(s) }, null, 8, ['error']))
                  : (We(), Yn(Oe(hE), { key: 1 })),
              ]),
              _: 1,
            },
            8,
            ['onResolve']
          )
        )
      );
    },
  };
globalThis.$fetch || (globalThis.$fetch = Pp.create({ baseURL: Mp() }));
let Sc;
const pE = Kp(tE);
(Sc = async function () {
  var s;
  const n = Boolean((s = window.__NUXT__) == null ? void 0 : s.serverRendered)
      ? jh(kc)
      : Pi(kc),
    r = Wp({ vueApp: n });
  try {
    await Vp(r, pE);
  } catch (i) {
    await r.callHook('app:error', i), (r.payload.error = r.payload.error || i);
  }
  try {
    await r.hooks.callHook('app:created', n),
      await r.hooks.callHook('app:beforeMount', n),
      n.mount('#' + um),
      await r.hooks.callHook('app:mounted', n),
      await $n();
  } catch (i) {
    await r.callHook('app:error', i), (r.payload.error = r.payload.error || i);
  }
}),
  Sc().catch((e) => {
    console.error('Error while mounting app:', e);
  });
export {
  OE as $,
  Pu as A,
  en as B,
  Rn as C,
  AE as D,
  Wy as E,
  Pe as F,
  $t as G,
  wE as H,
  I_ as I,
  PE as J,
  Ja as K,
  LE as L,
  Su as M,
  BE as N,
  Eu as O,
  $E as P,
  xE as Q,
  H_ as R,
  NE as S,
  RE as T,
  C_ as U,
  HE as V,
  DE as W,
  le as X,
  kE as Y,
  ME as Z,
  kn as _,
  Zp as a,
  W_ as a0,
  A_ as a1,
  P_ as a2,
  br as a3,
  TE as a4,
  Ns as a5,
  k_ as a6,
  vr as a7,
  ly as a8,
  L_ as a9,
  M_ as aa,
  SE as ab,
  UE as ac,
  tw as ad,
  jE as ae,
  Qp as af,
  FE as ag,
  Yp as ah,
  ar as ai,
  CE as aj,
  Ll as ak,
  eg as al,
  _E as am,
  yE as an,
  gt as b,
  Yn as c,
  kd as d,
  Dd as e,
  xn as f,
  oh as g,
  he as h,
  bE as i,
  ss as j,
  gr as k,
  vE as l,
  ks as m,
  gE as n,
  We as o,
  EE as p,
  Ar as q,
  Gc as r,
  qt as s,
  mE as t,
  Oe as u,
  IE as v,
  fo as w,
  _e as x,
  lr as y,
  mn as z,
};
