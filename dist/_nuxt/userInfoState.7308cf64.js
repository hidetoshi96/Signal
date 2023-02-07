import {
  I as f,
  y as Mi,
  C as Di,
  z as Ln,
  J as b,
  K as $t,
  L as H,
  M as Oi,
  N as Li,
  S as Fi,
  O as Wi,
  P as ne,
  Q as Je,
  B as le,
  R as Ve,
  A as Ui,
  D as Vi,
  E as Gi,
  T as Hi,
  U as Ge,
  V as ft,
  W as _t,
  X as qi,
  Y as ms,
  Z as Bi,
  $ as Yi,
  a0 as Fn,
  a1 as ys,
  a2 as Qi,
  a3 as Ki,
  a4 as zi,
  a5 as ji,
  a6 as $i,
  a as Xt,
  r as vs,
} from './entry.192ecaba.js';
const Wn = '@firebase/database',
  Un = '0.14.0';
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
 */ let Cs = '';
function Xi(n) {
  Cs = n;
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
 */ class Ji {
  constructor(e) {
    (this.domStorage_ = e), (this.prefix_ = 'firebase:');
  }
  set(e, t) {
    t == null
      ? this.domStorage_.removeItem(this.prefixedName_(e))
      : this.domStorage_.setItem(this.prefixedName_(e), b(t));
  }
  get(e) {
    const t = this.domStorage_.getItem(this.prefixedName_(e));
    return t == null ? null : $t(t);
  }
  remove(e) {
    this.domStorage_.removeItem(this.prefixedName_(e));
  }
  prefixedName_(e) {
    return this.prefix_ + e;
  }
  toString() {
    return this.domStorage_.toString();
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
 */ class Zi {
  constructor() {
    (this.cache_ = {}), (this.isInMemoryStorage = !0);
  }
  set(e, t) {
    t == null ? delete this.cache_[e] : (this.cache_[e] = t);
  }
  get(e) {
    return H(this.cache_, e) ? this.cache_[e] : null;
  }
  remove(e) {
    delete this.cache_[e];
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
 */ const Es = function (n) {
    try {
      if (typeof window < 'u' && typeof window[n] < 'u') {
        const e = window[n];
        return (
          e.setItem('firebase:sentinel', 'cache'),
          e.removeItem('firebase:sentinel'),
          new Ji(e)
        );
      }
    } catch {}
    return new Zi();
  },
  ee = Es('localStorage'),
  Lt = Es('sessionStorage');
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
 */ const _e = new Oi('@firebase/database'),
  ws = (function () {
    let n = 1;
    return function () {
      return n++;
    };
  })(),
  Ts = function (n) {
    const e = Li(n),
      t = new Fi();
    t.update(e);
    const s = t.digest();
    return Wi.encodeByteArray(s);
  },
  He = function (...n) {
    let e = '';
    for (let t = 0; t < n.length; t++) {
      const s = n[t];
      Array.isArray(s) ||
      (s && typeof s == 'object' && typeof s.length == 'number')
        ? (e += He.apply(null, s))
        : typeof s == 'object'
        ? (e += b(s))
        : (e += s),
        (e += ' ');
    }
    return e;
  };
let te = null,
  Vn = !0;
const er = function (n, e) {
    f(!e || n === !0 || n === !1, "Can't turn on custom loggers persistently."),
      n === !0
        ? ((_e.logLevel = qi.VERBOSE),
          (te = _e.log.bind(_e)),
          e && Lt.set('logging_enabled', !0))
        : typeof n == 'function'
        ? (te = n)
        : ((te = null), Lt.remove('logging_enabled'));
  },
  A = function (...n) {
    if (
      (Vn === !0 &&
        ((Vn = !1), te === null && Lt.get('logging_enabled') === !0 && er(!0)),
      te)
    ) {
      const e = He.apply(null, n);
      te(e);
    }
  },
  qe = function (n) {
    return function (...e) {
      A(n, ...e);
    };
  },
  Ft = function (...n) {
    const e = 'FIREBASE INTERNAL ERROR: ' + He(...n);
    _e.error(e);
  },
  Q = function (...n) {
    const e = `FIREBASE FATAL ERROR: ${He(...n)}`;
    throw (_e.error(e), new Error(e));
  },
  O = function (...n) {
    const e = 'FIREBASE WARNING: ' + He(...n);
    _e.warn(e);
  },
  tr = function () {
    typeof window < 'u' &&
      window.location &&
      window.location.protocol &&
      window.location.protocol.indexOf('https:') !== -1 &&
      O(
        'Insecure Firebase access from a secure page. Please use https in calls to new Firebase().'
      );
  },
  Jt = function (n) {
    return (
      typeof n == 'number' &&
      (n !== n ||
        n === Number.POSITIVE_INFINITY ||
        n === Number.NEGATIVE_INFINITY)
    );
  },
  nr = function (n) {
    if (document.readyState === 'complete') n();
    else {
      let e = !1;
      const t = function () {
        if (!document.body) {
          setTimeout(t, Math.floor(10));
          return;
        }
        e || ((e = !0), n());
      };
      document.addEventListener
        ? (document.addEventListener('DOMContentLoaded', t, !1),
          window.addEventListener('load', t, !1))
        : document.attachEvent &&
          (document.attachEvent('onreadystatechange', () => {
            document.readyState === 'complete' && t();
          }),
          window.attachEvent('onload', t));
    }
  },
  me = '[MIN_NAME]',
  se = '[MAX_NAME]',
  ae = function (n, e) {
    if (n === e) return 0;
    if (n === me || e === se) return -1;
    if (e === me || n === se) return 1;
    {
      const t = Gn(n),
        s = Gn(e);
      return t !== null
        ? s !== null
          ? t - s === 0
            ? n.length - e.length
            : t - s
          : -1
        : s !== null
        ? 1
        : n < e
        ? -1
        : 1;
    }
  },
  sr = function (n, e) {
    return n === e ? 0 : n < e ? -1 : 1;
  },
  Se = function (n, e) {
    if (e && n in e) return e[n];
    throw new Error('Missing required key (' + n + ') in object: ' + b(e));
  },
  Zt = function (n) {
    if (typeof n != 'object' || n === null) return b(n);
    const e = [];
    for (const s in n) e.push(s);
    e.sort();
    let t = '{';
    for (let s = 0; s < e.length; s++)
      s !== 0 && (t += ','), (t += b(e[s])), (t += ':'), (t += Zt(n[e[s]]));
    return (t += '}'), t;
  },
  Is = function (n, e) {
    const t = n.length;
    if (t <= e) return [n];
    const s = [];
    for (let i = 0; i < t; i += e)
      i + e > t ? s.push(n.substring(i, t)) : s.push(n.substring(i, i + e));
    return s;
  };
function M(n, e) {
  for (const t in n) n.hasOwnProperty(t) && e(t, n[t]);
}
const Ss = function (n) {
    f(!Jt(n), 'Invalid JSON number');
    const e = 11,
      t = 52,
      s = (1 << (e - 1)) - 1;
    let i, r, o, l, a;
    n === 0
      ? ((r = 0), (o = 0), (i = 1 / n === -1 / 0 ? 1 : 0))
      : ((i = n < 0),
        (n = Math.abs(n)),
        n >= Math.pow(2, 1 - s)
          ? ((l = Math.min(Math.floor(Math.log(n) / Math.LN2), s)),
            (r = l + s),
            (o = Math.round(n * Math.pow(2, t - l) - Math.pow(2, t))))
          : ((r = 0), (o = Math.round(n / Math.pow(2, 1 - s - t)))));
    const c = [];
    for (a = t; a; a -= 1) c.push(o % 2 ? 1 : 0), (o = Math.floor(o / 2));
    for (a = e; a; a -= 1) c.push(r % 2 ? 1 : 0), (r = Math.floor(r / 2));
    c.push(i ? 1 : 0), c.reverse();
    const u = c.join('');
    let h = '';
    for (a = 0; a < 64; a += 8) {
      let d = parseInt(u.substr(a, 8), 2).toString(16);
      d.length === 1 && (d = '0' + d), (h = h + d);
    }
    return h.toLowerCase();
  },
  ir = function () {
    return !!(
      typeof window == 'object' &&
      window.chrome &&
      window.chrome.extension &&
      !/^chrome/.test(window.location.href)
    );
  },
  rr = function () {
    return typeof Windows == 'object' && typeof Windows.UI == 'object';
  };
function or(n, e) {
  let t = 'Unknown Error';
  n === 'too_big'
    ? (t =
        'The data requested exceeds the maximum size that can be accessed with a single request.')
    : n === 'permission_denied'
    ? (t = "Client doesn't have permission to access the desired data.")
    : n === 'unavailable' && (t = 'The service is unavailable');
  const s = new Error(n + ' at ' + e._path.toString() + ': ' + t);
  return (s.code = n.toUpperCase()), s;
}
const lr = new RegExp('^-?(0*)\\d{1,10}$'),
  ar = -2147483648,
  cr = 2147483647,
  Gn = function (n) {
    if (lr.test(n)) {
      const e = Number(n);
      if (e >= ar && e <= cr) return e;
    }
    return null;
  },
  we = function (n) {
    try {
      n();
    } catch (e) {
      setTimeout(() => {
        const t = e.stack || '';
        throw (O('Exception was thrown by user callback.', t), e);
      }, Math.floor(0));
    }
  },
  hr = function () {
    return (
      (
        (typeof window == 'object' &&
          window.navigator &&
          window.navigator.userAgent) ||
        ''
      ).search(
        /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
      ) >= 0
    );
  },
  ke = function (n, e) {
    const t = setTimeout(n, e);
    return (
      typeof t == 'number' && typeof Deno < 'u' && Deno.unrefTimer
        ? Deno.unrefTimer(t)
        : typeof t == 'object' && t.unref && t.unref(),
      t
    );
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
 */ class ur {
  constructor(e, t) {
    (this.appName_ = e),
      (this.appCheckProvider = t),
      (this.appCheck = t == null ? void 0 : t.getImmediate({ optional: !0 })),
      this.appCheck || t == null || t.get().then((s) => (this.appCheck = s));
  }
  getToken(e) {
    return this.appCheck
      ? this.appCheck.getToken(e)
      : new Promise((t, s) => {
          setTimeout(() => {
            this.appCheck ? this.getToken(e).then(t, s) : t(null);
          }, 0);
        });
  }
  addTokenChangeListener(e) {
    var t;
    (t = this.appCheckProvider) === null ||
      t === void 0 ||
      t.get().then((s) => s.addTokenListener(e));
  }
  notifyForInvalidToken() {
    O(
      `Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`
    );
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
 */ class dr {
  constructor(e, t, s) {
    (this.appName_ = e),
      (this.firebaseOptions_ = t),
      (this.authProvider_ = s),
      (this.auth_ = null),
      (this.auth_ = s.getImmediate({ optional: !0 })),
      this.auth_ || s.onInit((i) => (this.auth_ = i));
  }
  getToken(e) {
    return this.auth_
      ? this.auth_
          .getToken(e)
          .catch((t) =>
            t && t.code === 'auth/token-not-initialized'
              ? (A(
                  'Got auth/token-not-initialized error.  Treating as null token.'
                ),
                null)
              : Promise.reject(t)
          )
      : new Promise((t, s) => {
          setTimeout(() => {
            this.auth_ ? this.getToken(e).then(t, s) : t(null);
          }, 0);
        });
  }
  addTokenChangeListener(e) {
    this.auth_
      ? this.auth_.addAuthTokenListener(e)
      : this.authProvider_.get().then((t) => t.addAuthTokenListener(e));
  }
  removeTokenChangeListener(e) {
    this.authProvider_.get().then((t) => t.removeAuthTokenListener(e));
  }
  notifyForInvalidToken() {
    let e =
      'Provided authentication credentials for the app named "' +
      this.appName_ +
      '" are invalid. This usually indicates your app was not initialized correctly. ';
    'credential' in this.firebaseOptions_
      ? (e +=
          'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
      : 'serviceAccount' in this.firebaseOptions_
      ? (e +=
          'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
      : (e +=
          'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
      O(e);
  }
}
class pe {
  constructor(e) {
    this.accessToken = e;
  }
  getToken(e) {
    return Promise.resolve({ accessToken: this.accessToken });
  }
  addTokenChangeListener(e) {
    e(this.accessToken);
  }
  removeTokenChangeListener(e) {}
  notifyForInvalidToken() {}
}
pe.OWNER = 'owner';
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
 */ const en = '5',
  Ns = 'v',
  Rs = 's',
  bs = 'r',
  ks = 'f',
  xs =
    /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
  Ps = 'ls',
  As = 'p',
  Wt = 'ac',
  Ms = 'websocket',
  Ds = 'long_polling';
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
 */ class Os {
  constructor(e, t, s, i, r = !1, o = '', l = !1) {
    (this.secure = t),
      (this.namespace = s),
      (this.webSocketOnly = i),
      (this.nodeAdmin = r),
      (this.persistenceKey = o),
      (this.includeNamespaceInQueryParams = l),
      (this._host = e.toLowerCase()),
      (this._domain = this._host.substr(this._host.indexOf('.') + 1)),
      (this.internalHost = ee.get('host:' + e) || this._host);
  }
  isCacheableHost() {
    return this.internalHost.substr(0, 2) === 's-';
  }
  isCustomHost() {
    return (
      this._domain !== 'firebaseio.com' &&
      this._domain !== 'firebaseio-demo.com'
    );
  }
  get host() {
    return this._host;
  }
  set host(e) {
    e !== this.internalHost &&
      ((this.internalHost = e),
      this.isCacheableHost() &&
        ee.set('host:' + this._host, this.internalHost));
  }
  toString() {
    let e = this.toURLString();
    return this.persistenceKey && (e += '<' + this.persistenceKey + '>'), e;
  }
  toURLString() {
    const e = this.secure ? 'https://' : 'http://',
      t = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : '';
    return `${e}${this.host}/${t}`;
  }
}
function fr(n) {
  return (
    n.host !== n.internalHost ||
    n.isCustomHost() ||
    n.includeNamespaceInQueryParams
  );
}
function Ls(n, e, t) {
  f(typeof e == 'string', 'typeof type must == string'),
    f(typeof t == 'object', 'typeof params must == object');
  let s;
  if (e === Ms) s = (n.secure ? 'wss://' : 'ws://') + n.internalHost + '/.ws?';
  else if (e === Ds)
    s = (n.secure ? 'https://' : 'http://') + n.internalHost + '/.lp?';
  else throw new Error('Unknown connection type: ' + e);
  fr(n) && (t.ns = n.namespace);
  const i = [];
  return (
    M(t, (r, o) => {
      i.push(r + '=' + o);
    }),
    s + i.join('&')
  );
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
 */ class _r {
  constructor() {
    this.counters_ = {};
  }
  incrementCounter(e, t = 1) {
    H(this.counters_, e) || (this.counters_[e] = 0), (this.counters_[e] += t);
  }
  get() {
    return zi(this.counters_);
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
 */ const kt = {},
  xt = {};
function tn(n) {
  const e = n.toString();
  return kt[e] || (kt[e] = new _r()), kt[e];
}
function pr(n, e) {
  const t = n.toString();
  return xt[t] || (xt[t] = e()), xt[t];
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
 */ class gr {
  constructor(e) {
    (this.onMessage_ = e),
      (this.pendingResponses = []),
      (this.currentResponseNum = 0),
      (this.closeAfterResponse = -1),
      (this.onClose = null);
  }
  closeAfter(e, t) {
    (this.closeAfterResponse = e),
      (this.onClose = t),
      this.closeAfterResponse < this.currentResponseNum &&
        (this.onClose(), (this.onClose = null));
  }
  handleResponse(e, t) {
    for (
      this.pendingResponses[e] = t;
      this.pendingResponses[this.currentResponseNum];

    ) {
      const s = this.pendingResponses[this.currentResponseNum];
      delete this.pendingResponses[this.currentResponseNum];
      for (let i = 0; i < s.length; ++i)
        s[i] &&
          we(() => {
            this.onMessage_(s[i]);
          });
      if (this.currentResponseNum === this.closeAfterResponse) {
        this.onClose && (this.onClose(), (this.onClose = null));
        break;
      }
      this.currentResponseNum++;
    }
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
 */ const Hn = 'start',
  mr = 'close',
  yr = 'pLPCommand',
  vr = 'pRTLPCB',
  Fs = 'id',
  Ws = 'pw',
  Us = 'ser',
  Cr = 'cb',
  Er = 'seg',
  wr = 'ts',
  Tr = 'd',
  Ir = 'dframe',
  Vs = 1870,
  Gs = 30,
  Sr = Vs - Gs,
  Nr = 25e3,
  Rr = 3e4;
class fe {
  constructor(e, t, s, i, r, o, l) {
    (this.connId = e),
      (this.repoInfo = t),
      (this.applicationId = s),
      (this.appCheckToken = i),
      (this.authToken = r),
      (this.transportSessionId = o),
      (this.lastSessionId = l),
      (this.bytesSent = 0),
      (this.bytesReceived = 0),
      (this.everConnected_ = !1),
      (this.log_ = qe(e)),
      (this.stats_ = tn(t)),
      (this.urlFn = (a) => (
        this.appCheckToken && (a[Wt] = this.appCheckToken), Ls(t, Ds, a)
      ));
  }
  open(e, t) {
    (this.curSegmentNum = 0),
      (this.onDisconnect_ = t),
      (this.myPacketOrderer = new gr(e)),
      (this.isClosed_ = !1),
      (this.connectTimeoutTimer_ = setTimeout(() => {
        this.log_('Timed out trying to connect.'),
          this.onClosed_(),
          (this.connectTimeoutTimer_ = null);
      }, Math.floor(Rr))),
      nr(() => {
        if (this.isClosed_) return;
        this.scriptTagHolder = new nn(
          (...r) => {
            const [o, l, a, c, u] = r;
            if ((this.incrementIncomingBytes_(r), !!this.scriptTagHolder))
              if (
                (this.connectTimeoutTimer_ &&
                  (clearTimeout(this.connectTimeoutTimer_),
                  (this.connectTimeoutTimer_ = null)),
                (this.everConnected_ = !0),
                o === Hn)
              )
                (this.id = l), (this.password = a);
              else if (o === mr)
                l
                  ? ((this.scriptTagHolder.sendNewPolls = !1),
                    this.myPacketOrderer.closeAfter(l, () => {
                      this.onClosed_();
                    }))
                  : this.onClosed_();
              else throw new Error('Unrecognized command received: ' + o);
          },
          (...r) => {
            const [o, l] = r;
            this.incrementIncomingBytes_(r),
              this.myPacketOrderer.handleResponse(o, l);
          },
          () => {
            this.onClosed_();
          },
          this.urlFn
        );
        const s = {};
        (s[Hn] = 't'),
          (s[Us] = Math.floor(Math.random() * 1e8)),
          this.scriptTagHolder.uniqueCallbackIdentifier &&
            (s[Cr] = this.scriptTagHolder.uniqueCallbackIdentifier),
          (s[Ns] = en),
          this.transportSessionId && (s[Rs] = this.transportSessionId),
          this.lastSessionId && (s[Ps] = this.lastSessionId),
          this.applicationId && (s[As] = this.applicationId),
          this.appCheckToken && (s[Wt] = this.appCheckToken),
          typeof location < 'u' &&
            location.hostname &&
            xs.test(location.hostname) &&
            (s[bs] = ks);
        const i = this.urlFn(s);
        this.log_('Connecting via long-poll to ' + i),
          this.scriptTagHolder.addTag(i, () => {});
      });
  }
  start() {
    this.scriptTagHolder.startLongPoll(this.id, this.password),
      this.addDisconnectPingFrame(this.id, this.password);
  }
  static forceAllow() {
    fe.forceAllow_ = !0;
  }
  static forceDisallow() {
    fe.forceDisallow_ = !0;
  }
  static isAvailable() {
    return fe.forceAllow_
      ? !0
      : !fe.forceDisallow_ &&
          typeof document < 'u' &&
          document.createElement != null &&
          !ir() &&
          !rr();
  }
  markConnectionHealthy() {}
  shutdown_() {
    (this.isClosed_ = !0),
      this.scriptTagHolder &&
        (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
      this.myDisconnFrame &&
        (document.body.removeChild(this.myDisconnFrame),
        (this.myDisconnFrame = null)),
      this.connectTimeoutTimer_ &&
        (clearTimeout(this.connectTimeoutTimer_),
        (this.connectTimeoutTimer_ = null));
  }
  onClosed_() {
    this.isClosed_ ||
      (this.log_('Longpoll is closing itself'),
      this.shutdown_(),
      this.onDisconnect_ &&
        (this.onDisconnect_(this.everConnected_), (this.onDisconnect_ = null)));
  }
  close() {
    this.isClosed_ ||
      (this.log_('Longpoll is being closed.'), this.shutdown_());
  }
  send(e) {
    const t = b(e);
    (this.bytesSent += t.length),
      this.stats_.incrementCounter('bytes_sent', t.length);
    const s = $i(t),
      i = Is(s, Sr);
    for (let r = 0; r < i.length; r++)
      this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[r]),
        this.curSegmentNum++;
  }
  addDisconnectPingFrame(e, t) {
    this.myDisconnFrame = document.createElement('iframe');
    const s = {};
    (s[Ir] = 't'),
      (s[Fs] = e),
      (s[Ws] = t),
      (this.myDisconnFrame.src = this.urlFn(s)),
      (this.myDisconnFrame.style.display = 'none'),
      document.body.appendChild(this.myDisconnFrame);
  }
  incrementIncomingBytes_(e) {
    const t = b(e).length;
    (this.bytesReceived += t),
      this.stats_.incrementCounter('bytes_received', t);
  }
}
class nn {
  constructor(e, t, s, i) {
    (this.onDisconnect = s),
      (this.urlFn = i),
      (this.outstandingRequests = new Set()),
      (this.pendingSegs = []),
      (this.currentSerial = Math.floor(Math.random() * 1e8)),
      (this.sendNewPolls = !0);
    {
      (this.uniqueCallbackIdentifier = ws()),
        (window[yr + this.uniqueCallbackIdentifier] = e),
        (window[vr + this.uniqueCallbackIdentifier] = t),
        (this.myIFrame = nn.createIFrame_());
      let r = '';
      this.myIFrame.src &&
        this.myIFrame.src.substr(0, 11) === 'javascript:' &&
        (r = '<script>document.domain="' + document.domain + '";</script>');
      const o = '<html><body>' + r + '</body></html>';
      try {
        this.myIFrame.doc.open(),
          this.myIFrame.doc.write(o),
          this.myIFrame.doc.close();
      } catch (l) {
        A('frame writing exception'), l.stack && A(l.stack), A(l);
      }
    }
  }
  static createIFrame_() {
    const e = document.createElement('iframe');
    if (((e.style.display = 'none'), document.body)) {
      document.body.appendChild(e);
      try {
        e.contentWindow.document || A('No IE domain setting required');
      } catch {
        const s = document.domain;
        e.src =
          "javascript:void((function(){document.open();document.domain='" +
          s +
          "';document.close();})())";
      }
    } else
      throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
    return (
      e.contentDocument
        ? (e.doc = e.contentDocument)
        : e.contentWindow
        ? (e.doc = e.contentWindow.document)
        : e.document && (e.doc = e.document),
      e
    );
  }
  close() {
    (this.alive = !1),
      this.myIFrame &&
        ((this.myIFrame.doc.body.innerHTML = ''),
        setTimeout(() => {
          this.myIFrame !== null &&
            (document.body.removeChild(this.myIFrame), (this.myIFrame = null));
        }, Math.floor(0)));
    const e = this.onDisconnect;
    e && ((this.onDisconnect = null), e());
  }
  startLongPoll(e, t) {
    for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_(); );
  }
  newRequest_() {
    if (
      this.alive &&
      this.sendNewPolls &&
      this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)
    ) {
      this.currentSerial++;
      const e = {};
      (e[Fs] = this.myID), (e[Ws] = this.myPW), (e[Us] = this.currentSerial);
      let t = this.urlFn(e),
        s = '',
        i = 0;
      for (
        ;
        this.pendingSegs.length > 0 &&
        this.pendingSegs[0].d.length + Gs + s.length <= Vs;

      ) {
        const o = this.pendingSegs.shift();
        (s =
          s +
          '&' +
          Er +
          i +
          '=' +
          o.seg +
          '&' +
          wr +
          i +
          '=' +
          o.ts +
          '&' +
          Tr +
          i +
          '=' +
          o.d),
          i++;
      }
      return (t = t + s), this.addLongPollTag_(t, this.currentSerial), !0;
    } else return !1;
  }
  enqueueSegment(e, t, s) {
    this.pendingSegs.push({ seg: e, ts: t, d: s }),
      this.alive && this.newRequest_();
  }
  addLongPollTag_(e, t) {
    this.outstandingRequests.add(t);
    const s = () => {
        this.outstandingRequests.delete(t), this.newRequest_();
      },
      i = setTimeout(s, Math.floor(Nr)),
      r = () => {
        clearTimeout(i), s();
      };
    this.addTag(e, r);
  }
  addTag(e, t) {
    setTimeout(() => {
      try {
        if (!this.sendNewPolls) return;
        const s = this.myIFrame.doc.createElement('script');
        (s.type = 'text/javascript'),
          (s.async = !0),
          (s.src = e),
          (s.onload = s.onreadystatechange =
            function () {
              const i = s.readyState;
              (!i || i === 'loaded' || i === 'complete') &&
                ((s.onload = s.onreadystatechange = null),
                s.parentNode && s.parentNode.removeChild(s),
                t());
            }),
          (s.onerror = () => {
            A('Long-poll script failed to load: ' + e),
              (this.sendNewPolls = !1),
              this.close();
          }),
          this.myIFrame.doc.body.appendChild(s);
      } catch {}
    }, Math.floor(1));
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
 */ const br = 16384,
  kr = 45e3;
let Ze = null;
typeof MozWebSocket < 'u'
  ? (Ze = MozWebSocket)
  : typeof WebSocket < 'u' && (Ze = WebSocket);
class U {
  constructor(e, t, s, i, r, o, l) {
    (this.connId = e),
      (this.applicationId = s),
      (this.appCheckToken = i),
      (this.authToken = r),
      (this.keepaliveTimer = null),
      (this.frames = null),
      (this.totalFrames = 0),
      (this.bytesSent = 0),
      (this.bytesReceived = 0),
      (this.log_ = qe(this.connId)),
      (this.stats_ = tn(t)),
      (this.connURL = U.connectionURL_(t, o, l, i, s)),
      (this.nodeAdmin = t.nodeAdmin);
  }
  static connectionURL_(e, t, s, i, r) {
    const o = {};
    return (
      (o[Ns] = en),
      typeof location < 'u' &&
        location.hostname &&
        xs.test(location.hostname) &&
        (o[bs] = ks),
      t && (o[Rs] = t),
      s && (o[Ps] = s),
      i && (o[Wt] = i),
      r && (o[As] = r),
      Ls(e, Ms, o)
    );
  }
  open(e, t) {
    (this.onDisconnect = t),
      (this.onMessage = e),
      this.log_('Websocket connecting to ' + this.connURL),
      (this.everConnected_ = !1),
      ee.set('previous_websocket_failure', !0);
    try {
      let s;
      ms(), (this.mySock = new Ze(this.connURL, [], s));
    } catch (s) {
      this.log_('Error instantiating WebSocket.');
      const i = s.message || s.data;
      i && this.log_(i), this.onClosed_();
      return;
    }
    (this.mySock.onopen = () => {
      this.log_('Websocket connected.'), (this.everConnected_ = !0);
    }),
      (this.mySock.onclose = () => {
        this.log_('Websocket connection was disconnected.'),
          (this.mySock = null),
          this.onClosed_();
      }),
      (this.mySock.onmessage = (s) => {
        this.handleIncomingFrame(s);
      }),
      (this.mySock.onerror = (s) => {
        this.log_('WebSocket error.  Closing connection.');
        const i = s.message || s.data;
        i && this.log_(i), this.onClosed_();
      });
  }
  start() {}
  static forceDisallow() {
    U.forceDisallow_ = !0;
  }
  static isAvailable() {
    let e = !1;
    if (typeof navigator < 'u' && navigator.userAgent) {
      const t = /Android ([0-9]{0,}\.[0-9]{0,})/,
        s = navigator.userAgent.match(t);
      s && s.length > 1 && parseFloat(s[1]) < 4.4 && (e = !0);
    }
    return !e && Ze !== null && !U.forceDisallow_;
  }
  static previouslyFailed() {
    return ee.isInMemoryStorage || ee.get('previous_websocket_failure') === !0;
  }
  markConnectionHealthy() {
    ee.remove('previous_websocket_failure');
  }
  appendFrame_(e) {
    if ((this.frames.push(e), this.frames.length === this.totalFrames)) {
      const t = this.frames.join('');
      this.frames = null;
      const s = $t(t);
      this.onMessage(s);
    }
  }
  handleNewFrameCount_(e) {
    (this.totalFrames = e), (this.frames = []);
  }
  extractFrameCount_(e) {
    if (
      (f(this.frames === null, 'We already have a frame buffer'), e.length <= 6)
    ) {
      const t = Number(e);
      if (!isNaN(t)) return this.handleNewFrameCount_(t), null;
    }
    return this.handleNewFrameCount_(1), e;
  }
  handleIncomingFrame(e) {
    if (this.mySock === null) return;
    const t = e.data;
    if (
      ((this.bytesReceived += t.length),
      this.stats_.incrementCounter('bytes_received', t.length),
      this.resetKeepAlive(),
      this.frames !== null)
    )
      this.appendFrame_(t);
    else {
      const s = this.extractFrameCount_(t);
      s !== null && this.appendFrame_(s);
    }
  }
  send(e) {
    this.resetKeepAlive();
    const t = b(e);
    (this.bytesSent += t.length),
      this.stats_.incrementCounter('bytes_sent', t.length);
    const s = Is(t, br);
    s.length > 1 && this.sendString_(String(s.length));
    for (let i = 0; i < s.length; i++) this.sendString_(s[i]);
  }
  shutdown_() {
    (this.isClosed_ = !0),
      this.keepaliveTimer &&
        (clearInterval(this.keepaliveTimer), (this.keepaliveTimer = null)),
      this.mySock && (this.mySock.close(), (this.mySock = null));
  }
  onClosed_() {
    this.isClosed_ ||
      (this.log_('WebSocket is closing itself'),
      this.shutdown_(),
      this.onDisconnect &&
        (this.onDisconnect(this.everConnected_), (this.onDisconnect = null)));
  }
  close() {
    this.isClosed_ ||
      (this.log_('WebSocket is being closed'), this.shutdown_());
  }
  resetKeepAlive() {
    clearInterval(this.keepaliveTimer),
      (this.keepaliveTimer = setInterval(() => {
        this.mySock && this.sendString_('0'), this.resetKeepAlive();
      }, Math.floor(kr)));
  }
  sendString_(e) {
    try {
      this.mySock.send(e);
    } catch (t) {
      this.log_(
        'Exception thrown from WebSocket.send():',
        t.message || t.data,
        'Closing connection.'
      ),
        setTimeout(this.onClosed_.bind(this), 0);
    }
  }
}
U.responsesRequiredToBeHealthy = 2;
U.healthyTimeout = 3e4;
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
 */ class Me {
  constructor(e) {
    this.initTransports_(e);
  }
  static get ALL_TRANSPORTS() {
    return [fe, U];
  }
  static get IS_TRANSPORT_INITIALIZED() {
    return this.globalTransportInitialized_;
  }
  initTransports_(e) {
    const t = U && U.isAvailable();
    let s = t && !U.previouslyFailed();
    if (
      (e.webSocketOnly &&
        (t ||
          O(
            "wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
          ),
        (s = !0)),
      s)
    )
      this.transports_ = [U];
    else {
      const i = (this.transports_ = []);
      for (const r of Me.ALL_TRANSPORTS) r && r.isAvailable() && i.push(r);
      Me.globalTransportInitialized_ = !0;
    }
  }
  initialTransport() {
    if (this.transports_.length > 0) return this.transports_[0];
    throw new Error('No transports available');
  }
  upgradeTransport() {
    return this.transports_.length > 1 ? this.transports_[1] : null;
  }
}
Me.globalTransportInitialized_ = !1;
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
 */ const xr = 6e4,
  Pr = 5e3,
  Ar = 10 * 1024,
  Mr = 100 * 1024,
  Pt = 't',
  qn = 'd',
  Dr = 's',
  Bn = 'r',
  Or = 'e',
  Yn = 'o',
  Qn = 'a',
  Kn = 'n',
  zn = 'p',
  Lr = 'h';
class Fr {
  constructor(e, t, s, i, r, o, l, a, c, u) {
    (this.id = e),
      (this.repoInfo_ = t),
      (this.applicationId_ = s),
      (this.appCheckToken_ = i),
      (this.authToken_ = r),
      (this.onMessage_ = o),
      (this.onReady_ = l),
      (this.onDisconnect_ = a),
      (this.onKill_ = c),
      (this.lastSessionId = u),
      (this.connectionCount = 0),
      (this.pendingDataMessages = []),
      (this.state_ = 0),
      (this.log_ = qe('c:' + this.id + ':')),
      (this.transportManager_ = new Me(t)),
      this.log_('Connection created'),
      this.start_();
  }
  start_() {
    const e = this.transportManager_.initialTransport();
    (this.conn_ = new e(
      this.nextTransportId_(),
      this.repoInfo_,
      this.applicationId_,
      this.appCheckToken_,
      this.authToken_,
      null,
      this.lastSessionId
    )),
      (this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
    const t = this.connReceiver_(this.conn_),
      s = this.disconnReceiver_(this.conn_);
    (this.tx_ = this.conn_),
      (this.rx_ = this.conn_),
      (this.secondaryConn_ = null),
      (this.isHealthy_ = !1),
      setTimeout(() => {
        this.conn_ && this.conn_.open(t, s);
      }, Math.floor(0));
    const i = e.healthyTimeout || 0;
    i > 0 &&
      (this.healthyTimeout_ = ke(() => {
        (this.healthyTimeout_ = null),
          this.isHealthy_ ||
            (this.conn_ && this.conn_.bytesReceived > Mr
              ? (this.log_(
                  'Connection exceeded healthy timeout but has received ' +
                    this.conn_.bytesReceived +
                    ' bytes.  Marking connection healthy.'
                ),
                (this.isHealthy_ = !0),
                this.conn_.markConnectionHealthy())
              : this.conn_ && this.conn_.bytesSent > Ar
              ? this.log_(
                  'Connection exceeded healthy timeout but has sent ' +
                    this.conn_.bytesSent +
                    ' bytes.  Leaving connection alive.'
                )
              : (this.log_('Closing unhealthy connection after timeout.'),
                this.close()));
      }, Math.floor(i)));
  }
  nextTransportId_() {
    return 'c:' + this.id + ':' + this.connectionCount++;
  }
  disconnReceiver_(e) {
    return (t) => {
      e === this.conn_
        ? this.onConnectionLost_(t)
        : e === this.secondaryConn_
        ? (this.log_('Secondary connection lost.'),
          this.onSecondaryConnectionLost_())
        : this.log_('closing an old connection');
    };
  }
  connReceiver_(e) {
    return (t) => {
      this.state_ !== 2 &&
        (e === this.rx_
          ? this.onPrimaryMessageReceived_(t)
          : e === this.secondaryConn_
          ? this.onSecondaryMessageReceived_(t)
          : this.log_('message on old connection'));
    };
  }
  sendRequest(e) {
    const t = { t: 'd', d: e };
    this.sendData_(t);
  }
  tryCleanupConnection() {
    this.tx_ === this.secondaryConn_ &&
      this.rx_ === this.secondaryConn_ &&
      (this.log_(
        'cleaning up and promoting a connection: ' + this.secondaryConn_.connId
      ),
      (this.conn_ = this.secondaryConn_),
      (this.secondaryConn_ = null));
  }
  onSecondaryControl_(e) {
    if (Pt in e) {
      const t = e[Pt];
      t === Qn
        ? this.upgradeIfSecondaryHealthy_()
        : t === Bn
        ? (this.log_('Got a reset on secondary, closing it'),
          this.secondaryConn_.close(),
          (this.tx_ === this.secondaryConn_ ||
            this.rx_ === this.secondaryConn_) &&
            this.close())
        : t === Yn &&
          (this.log_('got pong on secondary.'),
          this.secondaryResponsesRequired_--,
          this.upgradeIfSecondaryHealthy_());
    }
  }
  onSecondaryMessageReceived_(e) {
    const t = Se('t', e),
      s = Se('d', e);
    if (t === 'c') this.onSecondaryControl_(s);
    else if (t === 'd') this.pendingDataMessages.push(s);
    else throw new Error('Unknown protocol layer: ' + t);
  }
  upgradeIfSecondaryHealthy_() {
    this.secondaryResponsesRequired_ <= 0
      ? (this.log_('Secondary connection is healthy.'),
        (this.isHealthy_ = !0),
        this.secondaryConn_.markConnectionHealthy(),
        this.proceedWithUpgrade_())
      : (this.log_('sending ping on secondary.'),
        this.secondaryConn_.send({ t: 'c', d: { t: zn, d: {} } }));
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start(),
      this.log_('sending client ack on secondary'),
      this.secondaryConn_.send({ t: 'c', d: { t: Qn, d: {} } }),
      this.log_('Ending transmission on primary'),
      this.conn_.send({ t: 'c', d: { t: Kn, d: {} } }),
      (this.tx_ = this.secondaryConn_),
      this.tryCleanupConnection();
  }
  onPrimaryMessageReceived_(e) {
    const t = Se('t', e),
      s = Se('d', e);
    t === 'c' ? this.onControl_(s) : t === 'd' && this.onDataMessage_(s);
  }
  onDataMessage_(e) {
    this.onPrimaryResponse_(), this.onMessage_(e);
  }
  onPrimaryResponse_() {
    this.isHealthy_ ||
      (this.primaryResponsesRequired_--,
      this.primaryResponsesRequired_ <= 0 &&
        (this.log_('Primary connection is healthy.'),
        (this.isHealthy_ = !0),
        this.conn_.markConnectionHealthy()));
  }
  onControl_(e) {
    const t = Se(Pt, e);
    if (qn in e) {
      const s = e[qn];
      if (t === Lr) this.onHandshake_(s);
      else if (t === Kn) {
        this.log_('recvd end transmission on primary'),
          (this.rx_ = this.secondaryConn_);
        for (let i = 0; i < this.pendingDataMessages.length; ++i)
          this.onDataMessage_(this.pendingDataMessages[i]);
        (this.pendingDataMessages = []), this.tryCleanupConnection();
      } else
        t === Dr
          ? this.onConnectionShutdown_(s)
          : t === Bn
          ? this.onReset_(s)
          : t === Or
          ? Ft('Server Error: ' + s)
          : t === Yn
          ? (this.log_('got pong on primary.'),
            this.onPrimaryResponse_(),
            this.sendPingOnPrimaryIfNecessary_())
          : Ft('Unknown control packet command: ' + t);
    }
  }
  onHandshake_(e) {
    const t = e.ts,
      s = e.v,
      i = e.h;
    (this.sessionId = e.s),
      (this.repoInfo_.host = i),
      this.state_ === 0 &&
        (this.conn_.start(),
        this.onConnectionEstablished_(this.conn_, t),
        en !== s && O('Protocol version mismatch detected'),
        this.tryStartUpgrade_());
  }
  tryStartUpgrade_() {
    const e = this.transportManager_.upgradeTransport();
    e && this.startUpgrade_(e);
  }
  startUpgrade_(e) {
    (this.secondaryConn_ = new e(
      this.nextTransportId_(),
      this.repoInfo_,
      this.applicationId_,
      this.appCheckToken_,
      this.authToken_,
      this.sessionId
    )),
      (this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
    const t = this.connReceiver_(this.secondaryConn_),
      s = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(t, s),
      ke(() => {
        this.secondaryConn_ &&
          (this.log_('Timed out trying to upgrade.'),
          this.secondaryConn_.close());
      }, Math.floor(xr));
  }
  onReset_(e) {
    this.log_('Reset packet received.  New host: ' + e),
      (this.repoInfo_.host = e),
      this.state_ === 1
        ? this.close()
        : (this.closeConnections_(), this.start_());
  }
  onConnectionEstablished_(e, t) {
    this.log_('Realtime connection established.'),
      (this.conn_ = e),
      (this.state_ = 1),
      this.onReady_ &&
        (this.onReady_(t, this.sessionId), (this.onReady_ = null)),
      this.primaryResponsesRequired_ === 0
        ? (this.log_('Primary connection is healthy.'), (this.isHealthy_ = !0))
        : ke(() => {
            this.sendPingOnPrimaryIfNecessary_();
          }, Math.floor(Pr));
  }
  sendPingOnPrimaryIfNecessary_() {
    !this.isHealthy_ &&
      this.state_ === 1 &&
      (this.log_('sending ping on primary.'),
      this.sendData_({ t: 'c', d: { t: zn, d: {} } }));
  }
  onSecondaryConnectionLost_() {
    const e = this.secondaryConn_;
    (this.secondaryConn_ = null),
      (this.tx_ === e || this.rx_ === e) && this.close();
  }
  onConnectionLost_(e) {
    (this.conn_ = null),
      !e && this.state_ === 0
        ? (this.log_('Realtime connection failed.'),
          this.repoInfo_.isCacheableHost() &&
            (ee.remove('host:' + this.repoInfo_.host),
            (this.repoInfo_.internalHost = this.repoInfo_.host)))
        : this.state_ === 1 && this.log_('Realtime connection lost.'),
      this.close();
  }
  onConnectionShutdown_(e) {
    this.log_('Connection shutdown command received. Shutting down...'),
      this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
      (this.onDisconnect_ = null),
      this.close();
  }
  sendData_(e) {
    if (this.state_ !== 1) throw 'Connection is not connected';
    this.tx_.send(e);
  }
  close() {
    this.state_ !== 2 &&
      (this.log_('Closing realtime connection.'),
      (this.state_ = 2),
      this.closeConnections_(),
      this.onDisconnect_ &&
        (this.onDisconnect_(), (this.onDisconnect_ = null)));
  }
  closeConnections_() {
    this.log_('Shutting down all connections'),
      this.conn_ && (this.conn_.close(), (this.conn_ = null)),
      this.secondaryConn_ &&
        (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
      this.healthyTimeout_ &&
        (clearTimeout(this.healthyTimeout_), (this.healthyTimeout_ = null));
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
 */ class Hs {
  put(e, t, s, i) {}
  merge(e, t, s, i) {}
  refreshAuthToken(e) {}
  refreshAppCheckToken(e) {}
  onDisconnectPut(e, t, s) {}
  onDisconnectMerge(e, t, s) {}
  onDisconnectCancel(e, t) {}
  reportStats(e) {}
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
 */ class qs {
  constructor(e) {
    (this.allowedEvents_ = e),
      (this.listeners_ = {}),
      f(Array.isArray(e) && e.length > 0, 'Requires a non-empty array');
  }
  trigger(e, ...t) {
    if (Array.isArray(this.listeners_[e])) {
      const s = [...this.listeners_[e]];
      for (let i = 0; i < s.length; i++) s[i].callback.apply(s[i].context, t);
    }
  }
  on(e, t, s) {
    this.validateEventType_(e),
      (this.listeners_[e] = this.listeners_[e] || []),
      this.listeners_[e].push({ callback: t, context: s });
    const i = this.getInitialEvent(e);
    i && t.apply(s, i);
  }
  off(e, t, s) {
    this.validateEventType_(e);
    const i = this.listeners_[e] || [];
    for (let r = 0; r < i.length; r++)
      if (i[r].callback === t && (!s || s === i[r].context)) {
        i.splice(r, 1);
        return;
      }
  }
  validateEventType_(e) {
    f(
      this.allowedEvents_.find((t) => t === e),
      'Unknown event: ' + e
    );
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
 */ class et extends qs {
  constructor() {
    super(['online']),
      (this.online_ = !0),
      typeof window < 'u' &&
        typeof window.addEventListener < 'u' &&
        !ys() &&
        (window.addEventListener(
          'online',
          () => {
            this.online_ || ((this.online_ = !0), this.trigger('online', !0));
          },
          !1
        ),
        window.addEventListener(
          'offline',
          () => {
            this.online_ && ((this.online_ = !1), this.trigger('online', !1));
          },
          !1
        ));
  }
  static getInstance() {
    return new et();
  }
  getInitialEvent(e) {
    return f(e === 'online', 'Unknown event type: ' + e), [this.online_];
  }
  currentlyOnline() {
    return this.online_;
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
 */ const jn = 32,
  $n = 768;
class w {
  constructor(e, t) {
    if (t === void 0) {
      this.pieces_ = e.split('/');
      let s = 0;
      for (let i = 0; i < this.pieces_.length; i++)
        this.pieces_[i].length > 0 &&
          ((this.pieces_[s] = this.pieces_[i]), s++);
      (this.pieces_.length = s), (this.pieceNum_ = 0);
    } else (this.pieces_ = e), (this.pieceNum_ = t);
  }
  toString() {
    let e = '';
    for (let t = this.pieceNum_; t < this.pieces_.length; t++)
      this.pieces_[t] !== '' && (e += '/' + this.pieces_[t]);
    return e || '/';
  }
}
function C() {
  return new w('');
}
function m(n) {
  return n.pieceNum_ >= n.pieces_.length ? null : n.pieces_[n.pieceNum_];
}
function $(n) {
  return n.pieces_.length - n.pieceNum_;
}
function I(n) {
  let e = n.pieceNum_;
  return e < n.pieces_.length && e++, new w(n.pieces_, e);
}
function sn(n) {
  return n.pieceNum_ < n.pieces_.length
    ? n.pieces_[n.pieces_.length - 1]
    : null;
}
function Wr(n) {
  let e = '';
  for (let t = n.pieceNum_; t < n.pieces_.length; t++)
    n.pieces_[t] !== '' &&
      (e += '/' + encodeURIComponent(String(n.pieces_[t])));
  return e || '/';
}
function De(n, e = 0) {
  return n.pieces_.slice(n.pieceNum_ + e);
}
function Bs(n) {
  if (n.pieceNum_ >= n.pieces_.length) return null;
  const e = [];
  for (let t = n.pieceNum_; t < n.pieces_.length - 1; t++) e.push(n.pieces_[t]);
  return new w(e, 0);
}
function N(n, e) {
  const t = [];
  for (let s = n.pieceNum_; s < n.pieces_.length; s++) t.push(n.pieces_[s]);
  if (e instanceof w)
    for (let s = e.pieceNum_; s < e.pieces_.length; s++) t.push(e.pieces_[s]);
  else {
    const s = e.split('/');
    for (let i = 0; i < s.length; i++) s[i].length > 0 && t.push(s[i]);
  }
  return new w(t, 0);
}
function v(n) {
  return n.pieceNum_ >= n.pieces_.length;
}
function D(n, e) {
  const t = m(n),
    s = m(e);
  if (t === null) return e;
  if (t === s) return D(I(n), I(e));
  throw new Error(
    'INTERNAL ERROR: innerPath (' + e + ') is not within outerPath (' + n + ')'
  );
}
function Ur(n, e) {
  const t = De(n, 0),
    s = De(e, 0);
  for (let i = 0; i < t.length && i < s.length; i++) {
    const r = ae(t[i], s[i]);
    if (r !== 0) return r;
  }
  return t.length === s.length ? 0 : t.length < s.length ? -1 : 1;
}
function rn(n, e) {
  if ($(n) !== $(e)) return !1;
  for (let t = n.pieceNum_, s = e.pieceNum_; t <= n.pieces_.length; t++, s++)
    if (n.pieces_[t] !== e.pieces_[s]) return !1;
  return !0;
}
function W(n, e) {
  let t = n.pieceNum_,
    s = e.pieceNum_;
  if ($(n) > $(e)) return !1;
  for (; t < n.pieces_.length; ) {
    if (n.pieces_[t] !== e.pieces_[s]) return !1;
    ++t, ++s;
  }
  return !0;
}
class Vr {
  constructor(e, t) {
    (this.errorPrefix_ = t),
      (this.parts_ = De(e, 0)),
      (this.byteLength_ = Math.max(1, this.parts_.length));
    for (let s = 0; s < this.parts_.length; s++)
      this.byteLength_ += ft(this.parts_[s]);
    Ys(this);
  }
}
function Gr(n, e) {
  n.parts_.length > 0 && (n.byteLength_ += 1),
    n.parts_.push(e),
    (n.byteLength_ += ft(e)),
    Ys(n);
}
function Hr(n) {
  const e = n.parts_.pop();
  (n.byteLength_ -= ft(e)), n.parts_.length > 0 && (n.byteLength_ -= 1);
}
function Ys(n) {
  if (n.byteLength_ > $n)
    throw new Error(
      n.errorPrefix_ +
        'has a key path longer than ' +
        $n +
        ' bytes (' +
        n.byteLength_ +
        ').'
    );
  if (n.parts_.length > jn)
    throw new Error(
      n.errorPrefix_ +
        'path specified exceeds the maximum depth that can be written (' +
        jn +
        ') or object contains a cycle ' +
        Z(n)
    );
}
function Z(n) {
  return n.parts_.length === 0
    ? ''
    : "in property '" + n.parts_.join('.') + "'";
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
 */ class on extends qs {
  constructor() {
    super(['visible']);
    let e, t;
    typeof document < 'u' &&
      typeof document.addEventListener < 'u' &&
      (typeof document.hidden < 'u'
        ? ((t = 'visibilitychange'), (e = 'hidden'))
        : typeof document.mozHidden < 'u'
        ? ((t = 'mozvisibilitychange'), (e = 'mozHidden'))
        : typeof document.msHidden < 'u'
        ? ((t = 'msvisibilitychange'), (e = 'msHidden'))
        : typeof document.webkitHidden < 'u' &&
          ((t = 'webkitvisibilitychange'), (e = 'webkitHidden'))),
      (this.visible_ = !0),
      t &&
        document.addEventListener(
          t,
          () => {
            const s = !document[e];
            s !== this.visible_ &&
              ((this.visible_ = s), this.trigger('visible', s));
          },
          !1
        );
  }
  static getInstance() {
    return new on();
  }
  getInitialEvent(e) {
    return f(e === 'visible', 'Unknown event type: ' + e), [this.visible_];
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
 */ const Ne = 1e3,
  qr = 60 * 5 * 1e3,
  Xn = 30 * 1e3,
  Br = 1.3,
  Yr = 3e4,
  Qr = 'server_kill',
  Jn = 3;
class Y extends Hs {
  constructor(e, t, s, i, r, o, l, a) {
    if (
      (super(),
      (this.repoInfo_ = e),
      (this.applicationId_ = t),
      (this.onDataUpdate_ = s),
      (this.onConnectStatus_ = i),
      (this.onServerInfoUpdate_ = r),
      (this.authTokenProvider_ = o),
      (this.appCheckTokenProvider_ = l),
      (this.authOverride_ = a),
      (this.id = Y.nextPersistentConnectionId_++),
      (this.log_ = qe('p:' + this.id + ':')),
      (this.interruptReasons_ = {}),
      (this.listens = new Map()),
      (this.outstandingPuts_ = []),
      (this.outstandingGets_ = []),
      (this.outstandingPutCount_ = 0),
      (this.outstandingGetCount_ = 0),
      (this.onDisconnectRequestQueue_ = []),
      (this.connected_ = !1),
      (this.reconnectDelay_ = Ne),
      (this.maxReconnectDelay_ = qr),
      (this.securityDebugCallback_ = null),
      (this.lastSessionId = null),
      (this.establishConnectionTimer_ = null),
      (this.visible_ = !1),
      (this.requestCBHash_ = {}),
      (this.requestNumber_ = 0),
      (this.realtime_ = null),
      (this.authToken_ = null),
      (this.appCheckToken_ = null),
      (this.forceTokenRefresh_ = !1),
      (this.invalidAuthTokenCount_ = 0),
      (this.invalidAppCheckTokenCount_ = 0),
      (this.firstConnection_ = !0),
      (this.lastConnectionAttemptTime_ = null),
      (this.lastConnectionEstablishedTime_ = null),
      a && !ms())
    )
      throw new Error(
        'Auth override specified in options, but not supported on non Node.js platforms'
      );
    on.getInstance().on('visible', this.onVisible_, this),
      e.host.indexOf('fblocal') === -1 &&
        et.getInstance().on('online', this.onOnline_, this);
  }
  sendRequest(e, t, s) {
    const i = ++this.requestNumber_,
      r = { r: i, a: e, b: t };
    this.log_(b(r)),
      f(
        this.connected_,
        "sendRequest call when we're not connected not allowed."
      ),
      this.realtime_.sendRequest(r),
      s && (this.requestCBHash_[i] = s);
  }
  get(e) {
    this.initConnection_();
    const t = new Ve(),
      i = {
        action: 'g',
        request: { p: e._path.toString(), q: e._queryObject },
        onComplete: (o) => {
          const l = o.d;
          o.s === 'ok' ? t.resolve(l) : t.reject(l);
        },
      };
    this.outstandingGets_.push(i), this.outstandingGetCount_++;
    const r = this.outstandingGets_.length - 1;
    return this.connected_ && this.sendGet_(r), t.promise;
  }
  listen(e, t, s, i) {
    this.initConnection_();
    const r = e._queryIdentifier,
      o = e._path.toString();
    this.log_('Listen called for ' + o + ' ' + r),
      this.listens.has(o) || this.listens.set(o, new Map()),
      f(
        e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
        'listen() called for non-default but complete query'
      ),
      f(
        !this.listens.get(o).has(r),
        'listen() called twice for same path/queryId.'
      );
    const l = { onComplete: i, hashFn: t, query: e, tag: s };
    this.listens.get(o).set(r, l), this.connected_ && this.sendListen_(l);
  }
  sendGet_(e) {
    const t = this.outstandingGets_[e];
    this.sendRequest('g', t.request, (s) => {
      delete this.outstandingGets_[e],
        this.outstandingGetCount_--,
        this.outstandingGetCount_ === 0 && (this.outstandingGets_ = []),
        t.onComplete && t.onComplete(s);
    });
  }
  sendListen_(e) {
    const t = e.query,
      s = t._path.toString(),
      i = t._queryIdentifier;
    this.log_('Listen on ' + s + ' for ' + i);
    const r = { p: s },
      o = 'q';
    e.tag && ((r.q = t._queryObject), (r.t = e.tag)),
      (r.h = e.hashFn()),
      this.sendRequest(o, r, (l) => {
        const a = l.d,
          c = l.s;
        Y.warnOnListenWarnings_(a, t),
          (this.listens.get(s) && this.listens.get(s).get(i)) === e &&
            (this.log_('listen response', l),
            c !== 'ok' && this.removeListen_(s, i),
            e.onComplete && e.onComplete(c, a));
      });
  }
  static warnOnListenWarnings_(e, t) {
    if (e && typeof e == 'object' && H(e, 'w')) {
      const s = ne(e, 'w');
      if (Array.isArray(s) && ~s.indexOf('no_index')) {
        const i = '".indexOn": "' + t._queryParams.getIndex().toString() + '"',
          r = t._path.toString();
        O(
          `Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`
        );
      }
    }
  }
  refreshAuthToken(e) {
    (this.authToken_ = e),
      this.log_('Auth token refreshed'),
      this.authToken_
        ? this.tryAuth()
        : this.connected_ && this.sendRequest('unauth', {}, () => {}),
      this.reduceReconnectDelayIfAdminCredential_(e);
  }
  reduceReconnectDelayIfAdminCredential_(e) {
    ((e && e.length === 40) || Bi(e)) &&
      (this.log_(
        'Admin auth credential detected.  Reducing max reconnect time.'
      ),
      (this.maxReconnectDelay_ = Xn));
  }
  refreshAppCheckToken(e) {
    (this.appCheckToken_ = e),
      this.log_('App check token refreshed'),
      this.appCheckToken_
        ? this.tryAppCheck()
        : this.connected_ && this.sendRequest('unappeck', {}, () => {});
  }
  tryAuth() {
    if (this.connected_ && this.authToken_) {
      const e = this.authToken_,
        t = Yi(e) ? 'auth' : 'gauth',
        s = { cred: e };
      this.authOverride_ === null
        ? (s.noauth = !0)
        : typeof this.authOverride_ == 'object' &&
          (s.authvar = this.authOverride_),
        this.sendRequest(t, s, (i) => {
          const r = i.s,
            o = i.d || 'error';
          this.authToken_ === e &&
            (r === 'ok'
              ? (this.invalidAuthTokenCount_ = 0)
              : this.onAuthRevoked_(r, o));
        });
    }
  }
  tryAppCheck() {
    this.connected_ &&
      this.appCheckToken_ &&
      this.sendRequest('appcheck', { token: this.appCheckToken_ }, (e) => {
        const t = e.s,
          s = e.d || 'error';
        t === 'ok'
          ? (this.invalidAppCheckTokenCount_ = 0)
          : this.onAppCheckRevoked_(t, s);
      });
  }
  unlisten(e, t) {
    const s = e._path.toString(),
      i = e._queryIdentifier;
    this.log_('Unlisten called for ' + s + ' ' + i),
      f(
        e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
        'unlisten() called for non-default but complete query'
      ),
      this.removeListen_(s, i) &&
        this.connected_ &&
        this.sendUnlisten_(s, i, e._queryObject, t);
  }
  sendUnlisten_(e, t, s, i) {
    this.log_('Unlisten on ' + e + ' for ' + t);
    const r = { p: e },
      o = 'n';
    i && ((r.q = s), (r.t = i)), this.sendRequest(o, r);
  }
  onDisconnectPut(e, t, s) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_('o', e, t, s)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: 'o',
            data: t,
            onComplete: s,
          });
  }
  onDisconnectMerge(e, t, s) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_('om', e, t, s)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: 'om',
            data: t,
            onComplete: s,
          });
  }
  onDisconnectCancel(e, t) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_('oc', e, null, t)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: 'oc',
            data: null,
            onComplete: t,
          });
  }
  sendOnDisconnect_(e, t, s, i) {
    const r = { p: t, d: s };
    this.log_('onDisconnect ' + e, r),
      this.sendRequest(e, r, (o) => {
        i &&
          setTimeout(() => {
            i(o.s, o.d);
          }, Math.floor(0));
      });
  }
  put(e, t, s, i) {
    this.putInternal('p', e, t, s, i);
  }
  merge(e, t, s, i) {
    this.putInternal('m', e, t, s, i);
  }
  putInternal(e, t, s, i, r) {
    this.initConnection_();
    const o = { p: t, d: s };
    r !== void 0 && (o.h = r),
      this.outstandingPuts_.push({ action: e, request: o, onComplete: i }),
      this.outstandingPutCount_++;
    const l = this.outstandingPuts_.length - 1;
    this.connected_ ? this.sendPut_(l) : this.log_('Buffering put: ' + t);
  }
  sendPut_(e) {
    const t = this.outstandingPuts_[e].action,
      s = this.outstandingPuts_[e].request,
      i = this.outstandingPuts_[e].onComplete;
    (this.outstandingPuts_[e].queued = this.connected_),
      this.sendRequest(t, s, (r) => {
        this.log_(t + ' response', r),
          delete this.outstandingPuts_[e],
          this.outstandingPutCount_--,
          this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []),
          i && i(r.s, r.d);
      });
  }
  reportStats(e) {
    if (this.connected_) {
      const t = { c: e };
      this.log_('reportStats', t),
        this.sendRequest('s', t, (s) => {
          if (s.s !== 'ok') {
            const r = s.d;
            this.log_('reportStats', 'Error sending stats: ' + r);
          }
        });
    }
  }
  onDataMessage_(e) {
    if ('r' in e) {
      this.log_('from server: ' + b(e));
      const t = e.r,
        s = this.requestCBHash_[t];
      s && (delete this.requestCBHash_[t], s(e.b));
    } else {
      if ('error' in e) throw 'A server-side error has occurred: ' + e.error;
      'a' in e && this.onDataPush_(e.a, e.b);
    }
  }
  onDataPush_(e, t) {
    this.log_('handleServerMessage', e, t),
      e === 'd'
        ? this.onDataUpdate_(t.p, t.d, !1, t.t)
        : e === 'm'
        ? this.onDataUpdate_(t.p, t.d, !0, t.t)
        : e === 'c'
        ? this.onListenRevoked_(t.p, t.q)
        : e === 'ac'
        ? this.onAuthRevoked_(t.s, t.d)
        : e === 'apc'
        ? this.onAppCheckRevoked_(t.s, t.d)
        : e === 'sd'
        ? this.onSecurityDebugPacket_(t)
        : Ft(
            'Unrecognized action received from server: ' +
              b(e) +
              `
Are you using the latest client?`
          );
  }
  onReady_(e, t) {
    this.log_('connection ready'),
      (this.connected_ = !0),
      (this.lastConnectionEstablishedTime_ = new Date().getTime()),
      this.handleTimestamp_(e),
      (this.lastSessionId = t),
      this.firstConnection_ && this.sendConnectStats_(),
      this.restoreState_(),
      (this.firstConnection_ = !1),
      this.onConnectStatus_(!0);
  }
  scheduleConnect_(e) {
    f(
      !this.realtime_,
      "Scheduling a connect when we're already connected/ing?"
    ),
      this.establishConnectionTimer_ &&
        clearTimeout(this.establishConnectionTimer_),
      (this.establishConnectionTimer_ = setTimeout(() => {
        (this.establishConnectionTimer_ = null), this.establishConnection_();
      }, Math.floor(e)));
  }
  initConnection_() {
    !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
  }
  onVisible_(e) {
    e &&
      !this.visible_ &&
      this.reconnectDelay_ === this.maxReconnectDelay_ &&
      (this.log_('Window became visible.  Reducing delay.'),
      (this.reconnectDelay_ = Ne),
      this.realtime_ || this.scheduleConnect_(0)),
      (this.visible_ = e);
  }
  onOnline_(e) {
    e
      ? (this.log_('Browser went online.'),
        (this.reconnectDelay_ = Ne),
        this.realtime_ || this.scheduleConnect_(0))
      : (this.log_('Browser went offline.  Killing connection.'),
        this.realtime_ && this.realtime_.close());
  }
  onRealtimeDisconnect_() {
    if (
      (this.log_('data client disconnected'),
      (this.connected_ = !1),
      (this.realtime_ = null),
      this.cancelSentTransactions_(),
      (this.requestCBHash_ = {}),
      this.shouldReconnect_())
    ) {
      this.visible_
        ? this.lastConnectionEstablishedTime_ &&
          (new Date().getTime() - this.lastConnectionEstablishedTime_ > Yr &&
            (this.reconnectDelay_ = Ne),
          (this.lastConnectionEstablishedTime_ = null))
        : (this.log_("Window isn't visible.  Delaying reconnect."),
          (this.reconnectDelay_ = this.maxReconnectDelay_),
          (this.lastConnectionAttemptTime_ = new Date().getTime()));
      const e = new Date().getTime() - this.lastConnectionAttemptTime_;
      let t = Math.max(0, this.reconnectDelay_ - e);
      (t = Math.random() * t),
        this.log_('Trying to reconnect in ' + t + 'ms'),
        this.scheduleConnect_(t),
        (this.reconnectDelay_ = Math.min(
          this.maxReconnectDelay_,
          this.reconnectDelay_ * Br
        ));
    }
    this.onConnectStatus_(!1);
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_('Making a connection attempt'),
        (this.lastConnectionAttemptTime_ = new Date().getTime()),
        (this.lastConnectionEstablishedTime_ = null);
      const e = this.onDataMessage_.bind(this),
        t = this.onReady_.bind(this),
        s = this.onRealtimeDisconnect_.bind(this),
        i = this.id + ':' + Y.nextConnectionId_++,
        r = this.lastSessionId;
      let o = !1,
        l = null;
      const a = function () {
          l ? l.close() : ((o = !0), s());
        },
        c = function (h) {
          f(l, "sendRequest call when we're not connected not allowed."),
            l.sendRequest(h);
        };
      this.realtime_ = { close: a, sendRequest: c };
      const u = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = !1;
      try {
        const [h, d] = await Promise.all([
          this.authTokenProvider_.getToken(u),
          this.appCheckTokenProvider_.getToken(u),
        ]);
        o
          ? A('getToken() completed but was canceled')
          : (A('getToken() completed. Creating connection.'),
            (this.authToken_ = h && h.accessToken),
            (this.appCheckToken_ = d && d.token),
            (l = new Fr(
              i,
              this.repoInfo_,
              this.applicationId_,
              this.appCheckToken_,
              this.authToken_,
              e,
              t,
              s,
              (_) => {
                O(_ + ' (' + this.repoInfo_.toString() + ')'),
                  this.interrupt(Qr);
              },
              r
            )));
      } catch (h) {
        this.log_('Failed to get token: ' + h),
          o || (this.repoInfo_.nodeAdmin && O(h), a());
      }
    }
  }
  interrupt(e) {
    A('Interrupting connection for reason: ' + e),
      (this.interruptReasons_[e] = !0),
      this.realtime_
        ? this.realtime_.close()
        : (this.establishConnectionTimer_ &&
            (clearTimeout(this.establishConnectionTimer_),
            (this.establishConnectionTimer_ = null)),
          this.connected_ && this.onRealtimeDisconnect_());
  }
  resume(e) {
    A('Resuming connection for reason: ' + e),
      delete this.interruptReasons_[e],
      Fn(this.interruptReasons_) &&
        ((this.reconnectDelay_ = Ne),
        this.realtime_ || this.scheduleConnect_(0));
  }
  handleTimestamp_(e) {
    const t = e - new Date().getTime();
    this.onServerInfoUpdate_({ serverTimeOffset: t });
  }
  cancelSentTransactions_() {
    for (let e = 0; e < this.outstandingPuts_.length; e++) {
      const t = this.outstandingPuts_[e];
      t &&
        'h' in t.request &&
        t.queued &&
        (t.onComplete && t.onComplete('disconnect'),
        delete this.outstandingPuts_[e],
        this.outstandingPutCount_--);
    }
    this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []);
  }
  onListenRevoked_(e, t) {
    let s;
    t ? (s = t.map((r) => Zt(r)).join('$')) : (s = 'default');
    const i = this.removeListen_(e, s);
    i && i.onComplete && i.onComplete('permission_denied');
  }
  removeListen_(e, t) {
    const s = new w(e).toString();
    let i;
    if (this.listens.has(s)) {
      const r = this.listens.get(s);
      (i = r.get(t)), r.delete(t), r.size === 0 && this.listens.delete(s);
    } else i = void 0;
    return i;
  }
  onAuthRevoked_(e, t) {
    A('Auth token revoked: ' + e + '/' + t),
      (this.authToken_ = null),
      (this.forceTokenRefresh_ = !0),
      this.realtime_.close(),
      (e === 'invalid_token' || e === 'permission_denied') &&
        (this.invalidAuthTokenCount_++,
        this.invalidAuthTokenCount_ >= Jn &&
          ((this.reconnectDelay_ = Xn),
          this.authTokenProvider_.notifyForInvalidToken()));
  }
  onAppCheckRevoked_(e, t) {
    A('App check token revoked: ' + e + '/' + t),
      (this.appCheckToken_ = null),
      (this.forceTokenRefresh_ = !0),
      (e === 'invalid_token' || e === 'permission_denied') &&
        (this.invalidAppCheckTokenCount_++,
        this.invalidAppCheckTokenCount_ >= Jn &&
          this.appCheckTokenProvider_.notifyForInvalidToken());
  }
  onSecurityDebugPacket_(e) {
    this.securityDebugCallback_
      ? this.securityDebugCallback_(e)
      : 'msg' in e &&
        console.log(
          'FIREBASE: ' +
            e.msg.replace(
              `
`,
              `
FIREBASE: `
            )
        );
  }
  restoreState_() {
    this.tryAuth(), this.tryAppCheck();
    for (const e of this.listens.values())
      for (const t of e.values()) this.sendListen_(t);
    for (let e = 0; e < this.outstandingPuts_.length; e++)
      this.outstandingPuts_[e] && this.sendPut_(e);
    for (; this.onDisconnectRequestQueue_.length; ) {
      const e = this.onDisconnectRequestQueue_.shift();
      this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete);
    }
    for (let e = 0; e < this.outstandingGets_.length; e++)
      this.outstandingGets_[e] && this.sendGet_(e);
  }
  sendConnectStats_() {
    const e = {};
    let t = 'js';
    (e['sdk.' + t + '.' + Cs.replace(/\./g, '-')] = 1),
      ys()
        ? (e['framework.cordova'] = 1)
        : Qi() && (e['framework.reactnative'] = 1),
      this.reportStats(e);
  }
  shouldReconnect_() {
    const e = et.getInstance().currentlyOnline();
    return Fn(this.interruptReasons_) && e;
  }
}
Y.nextPersistentConnectionId_ = 0;
Y.nextConnectionId_ = 0;
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
 */ class y {
  constructor(e, t) {
    (this.name = e), (this.node = t);
  }
  static Wrap(e, t) {
    return new y(e, t);
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
 */ class pt {
  getCompare() {
    return this.compare.bind(this);
  }
  indexedValueChanged(e, t) {
    const s = new y(me, e),
      i = new y(me, t);
    return this.compare(s, i) !== 0;
  }
  minPost() {
    return y.MIN;
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
 */ let $e;
class Qs extends pt {
  static get __EMPTY_NODE() {
    return $e;
  }
  static set __EMPTY_NODE(e) {
    $e = e;
  }
  compare(e, t) {
    return ae(e.name, t.name);
  }
  isDefinedOn(e) {
    throw Ge('KeyIndex.isDefinedOn not expected to be called.');
  }
  indexedValueChanged(e, t) {
    return !1;
  }
  minPost() {
    return y.MIN;
  }
  maxPost() {
    return new y(se, $e);
  }
  makePost(e, t) {
    return (
      f(typeof e == 'string', 'KeyIndex indexValue must always be a string.'),
      new y(e, $e)
    );
  }
  toString() {
    return '.key';
  }
}
const ge = new Qs();
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
 */ class Xe {
  constructor(e, t, s, i, r = null) {
    (this.isReverse_ = i), (this.resultGenerator_ = r), (this.nodeStack_ = []);
    let o = 1;
    for (; !e.isEmpty(); )
      if (((e = e), (o = t ? s(e.key, t) : 1), i && (o *= -1), o < 0))
        this.isReverse_ ? (e = e.left) : (e = e.right);
      else if (o === 0) {
        this.nodeStack_.push(e);
        break;
      } else
        this.nodeStack_.push(e), this.isReverse_ ? (e = e.right) : (e = e.left);
  }
  getNext() {
    if (this.nodeStack_.length === 0) return null;
    let e = this.nodeStack_.pop(),
      t;
    if (
      (this.resultGenerator_
        ? (t = this.resultGenerator_(e.key, e.value))
        : (t = { key: e.key, value: e.value }),
      this.isReverse_)
    )
      for (e = e.left; !e.isEmpty(); ) this.nodeStack_.push(e), (e = e.right);
    else
      for (e = e.right; !e.isEmpty(); ) this.nodeStack_.push(e), (e = e.left);
    return t;
  }
  hasNext() {
    return this.nodeStack_.length > 0;
  }
  peek() {
    if (this.nodeStack_.length === 0) return null;
    const e = this.nodeStack_[this.nodeStack_.length - 1];
    return this.resultGenerator_
      ? this.resultGenerator_(e.key, e.value)
      : { key: e.key, value: e.value };
  }
}
class x {
  constructor(e, t, s, i, r) {
    (this.key = e),
      (this.value = t),
      (this.color = s != null ? s : x.RED),
      (this.left = i != null ? i : L.EMPTY_NODE),
      (this.right = r != null ? r : L.EMPTY_NODE);
  }
  copy(e, t, s, i, r) {
    return new x(
      e != null ? e : this.key,
      t != null ? t : this.value,
      s != null ? s : this.color,
      i != null ? i : this.left,
      r != null ? r : this.right
    );
  }
  count() {
    return this.left.count() + 1 + this.right.count();
  }
  isEmpty() {
    return !1;
  }
  inorderTraversal(e) {
    return (
      this.left.inorderTraversal(e) ||
      !!e(this.key, this.value) ||
      this.right.inorderTraversal(e)
    );
  }
  reverseTraversal(e) {
    return (
      this.right.reverseTraversal(e) ||
      e(this.key, this.value) ||
      this.left.reverseTraversal(e)
    );
  }
  min_() {
    return this.left.isEmpty() ? this : this.left.min_();
  }
  minKey() {
    return this.min_().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(e, t, s) {
    let i = this;
    const r = s(e, i.key);
    return (
      r < 0
        ? (i = i.copy(null, null, null, i.left.insert(e, t, s), null))
        : r === 0
        ? (i = i.copy(null, t, null, null, null))
        : (i = i.copy(null, null, null, null, i.right.insert(e, t, s))),
      i.fixUp_()
    );
  }
  removeMin_() {
    if (this.left.isEmpty()) return L.EMPTY_NODE;
    let e = this;
    return (
      !e.left.isRed_() && !e.left.left.isRed_() && (e = e.moveRedLeft_()),
      (e = e.copy(null, null, null, e.left.removeMin_(), null)),
      e.fixUp_()
    );
  }
  remove(e, t) {
    let s, i;
    if (((s = this), t(e, s.key) < 0))
      !s.left.isEmpty() &&
        !s.left.isRed_() &&
        !s.left.left.isRed_() &&
        (s = s.moveRedLeft_()),
        (s = s.copy(null, null, null, s.left.remove(e, t), null));
    else {
      if (
        (s.left.isRed_() && (s = s.rotateRight_()),
        !s.right.isEmpty() &&
          !s.right.isRed_() &&
          !s.right.left.isRed_() &&
          (s = s.moveRedRight_()),
        t(e, s.key) === 0)
      ) {
        if (s.right.isEmpty()) return L.EMPTY_NODE;
        (i = s.right.min_()),
          (s = s.copy(i.key, i.value, null, null, s.right.removeMin_()));
      }
      s = s.copy(null, null, null, null, s.right.remove(e, t));
    }
    return s.fixUp_();
  }
  isRed_() {
    return this.color;
  }
  fixUp_() {
    let e = this;
    return (
      e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()),
      e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()),
      e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
      e
    );
  }
  moveRedLeft_() {
    let e = this.colorFlip_();
    return (
      e.right.left.isRed_() &&
        ((e = e.copy(null, null, null, null, e.right.rotateRight_())),
        (e = e.rotateLeft_()),
        (e = e.colorFlip_())),
      e
    );
  }
  moveRedRight_() {
    let e = this.colorFlip_();
    return (
      e.left.left.isRed_() && ((e = e.rotateRight_()), (e = e.colorFlip_())), e
    );
  }
  rotateLeft_() {
    const e = this.copy(null, null, x.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight_() {
    const e = this.copy(null, null, x.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip_() {
    const e = this.left.copy(null, null, !this.left.color, null, null),
      t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  checkMaxDepth_() {
    const e = this.check_();
    return Math.pow(2, e) <= this.count() + 1;
  }
  check_() {
    if (this.isRed_() && this.left.isRed_())
      throw new Error(
        'Red node has red child(' + this.key + ',' + this.value + ')'
      );
    if (this.right.isRed_())
      throw new Error(
        'Right child of (' + this.key + ',' + this.value + ') is red'
      );
    const e = this.left.check_();
    if (e !== this.right.check_()) throw new Error('Black depths differ');
    return e + (this.isRed_() ? 0 : 1);
  }
}
x.RED = !0;
x.BLACK = !1;
class Kr {
  copy(e, t, s, i, r) {
    return this;
  }
  insert(e, t, s) {
    return new x(e, t, null);
  }
  remove(e, t) {
    return this;
  }
  count() {
    return 0;
  }
  isEmpty() {
    return !0;
  }
  inorderTraversal(e) {
    return !1;
  }
  reverseTraversal(e) {
    return !1;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  check_() {
    return 0;
  }
  isRed_() {
    return !1;
  }
}
class L {
  constructor(e, t = L.EMPTY_NODE) {
    (this.comparator_ = e), (this.root_ = t);
  }
  insert(e, t) {
    return new L(
      this.comparator_,
      this.root_
        .insert(e, t, this.comparator_)
        .copy(null, null, x.BLACK, null, null)
    );
  }
  remove(e) {
    return new L(
      this.comparator_,
      this.root_
        .remove(e, this.comparator_)
        .copy(null, null, x.BLACK, null, null)
    );
  }
  get(e) {
    let t,
      s = this.root_;
    for (; !s.isEmpty(); ) {
      if (((t = this.comparator_(e, s.key)), t === 0)) return s.value;
      t < 0 ? (s = s.left) : t > 0 && (s = s.right);
    }
    return null;
  }
  getPredecessorKey(e) {
    let t,
      s = this.root_,
      i = null;
    for (; !s.isEmpty(); )
      if (((t = this.comparator_(e, s.key)), t === 0)) {
        if (s.left.isEmpty()) return i ? i.key : null;
        for (s = s.left; !s.right.isEmpty(); ) s = s.right;
        return s.key;
      } else t < 0 ? (s = s.left) : t > 0 && ((i = s), (s = s.right));
    throw new Error(
      'Attempted to find predecessor key for a nonexistent key.  What gives?'
    );
  }
  isEmpty() {
    return this.root_.isEmpty();
  }
  count() {
    return this.root_.count();
  }
  minKey() {
    return this.root_.minKey();
  }
  maxKey() {
    return this.root_.maxKey();
  }
  inorderTraversal(e) {
    return this.root_.inorderTraversal(e);
  }
  reverseTraversal(e) {
    return this.root_.reverseTraversal(e);
  }
  getIterator(e) {
    return new Xe(this.root_, null, this.comparator_, !1, e);
  }
  getIteratorFrom(e, t) {
    return new Xe(this.root_, e, this.comparator_, !1, t);
  }
  getReverseIteratorFrom(e, t) {
    return new Xe(this.root_, e, this.comparator_, !0, t);
  }
  getReverseIterator(e) {
    return new Xe(this.root_, null, this.comparator_, !0, e);
  }
}
L.EMPTY_NODE = new Kr();
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
 */ function zr(n, e) {
  return ae(n.name, e.name);
}
function ln(n, e) {
  return ae(n, e);
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
 */ let Ut;
function jr(n) {
  Ut = n;
}
const Ks = function (n) {
    return typeof n == 'number' ? 'number:' + Ss(n) : 'string:' + n;
  },
  zs = function (n) {
    if (n.isLeafNode()) {
      const e = n.val();
      f(
        typeof e == 'string' ||
          typeof e == 'number' ||
          (typeof e == 'object' && H(e, '.sv')),
        'Priority must be a string or number.'
      );
    } else f(n === Ut || n.isEmpty(), 'priority of unexpected type.');
    f(
      n === Ut || n.getPriority().isEmpty(),
      "Priority nodes can't have a priority of their own."
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
 */ let Zn;
class k {
  constructor(e, t = k.__childrenNodeConstructor.EMPTY_NODE) {
    (this.value_ = e),
      (this.priorityNode_ = t),
      (this.lazyHash_ = null),
      f(
        this.value_ !== void 0 && this.value_ !== null,
        "LeafNode shouldn't be created with null/undefined value."
      ),
      zs(this.priorityNode_);
  }
  static set __childrenNodeConstructor(e) {
    Zn = e;
  }
  static get __childrenNodeConstructor() {
    return Zn;
  }
  isLeafNode() {
    return !0;
  }
  getPriority() {
    return this.priorityNode_;
  }
  updatePriority(e) {
    return new k(this.value_, e);
  }
  getImmediateChild(e) {
    return e === '.priority'
      ? this.priorityNode_
      : k.__childrenNodeConstructor.EMPTY_NODE;
  }
  getChild(e) {
    return v(e)
      ? this
      : m(e) === '.priority'
      ? this.priorityNode_
      : k.__childrenNodeConstructor.EMPTY_NODE;
  }
  hasChild() {
    return !1;
  }
  getPredecessorChildName(e, t) {
    return null;
  }
  updateImmediateChild(e, t) {
    return e === '.priority'
      ? this.updatePriority(t)
      : t.isEmpty() && e !== '.priority'
      ? this
      : k.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
          e,
          t
        ).updatePriority(this.priorityNode_);
  }
  updateChild(e, t) {
    const s = m(e);
    return s === null
      ? t
      : t.isEmpty() && s !== '.priority'
      ? this
      : (f(
          s !== '.priority' || $(e) === 1,
          '.priority must be the last token in a path'
        ),
        this.updateImmediateChild(
          s,
          k.__childrenNodeConstructor.EMPTY_NODE.updateChild(I(e), t)
        ));
  }
  isEmpty() {
    return !1;
  }
  numChildren() {
    return 0;
  }
  forEachChild(e, t) {
    return !1;
  }
  val(e) {
    return e && !this.getPriority().isEmpty()
      ? { '.value': this.getValue(), '.priority': this.getPriority().val() }
      : this.getValue();
  }
  hash() {
    if (this.lazyHash_ === null) {
      let e = '';
      this.priorityNode_.isEmpty() ||
        (e += 'priority:' + Ks(this.priorityNode_.val()) + ':');
      const t = typeof this.value_;
      (e += t + ':'),
        t === 'number' ? (e += Ss(this.value_)) : (e += this.value_),
        (this.lazyHash_ = Ts(e));
    }
    return this.lazyHash_;
  }
  getValue() {
    return this.value_;
  }
  compareTo(e) {
    return e === k.__childrenNodeConstructor.EMPTY_NODE
      ? 1
      : e instanceof k.__childrenNodeConstructor
      ? -1
      : (f(e.isLeafNode(), 'Unknown node type'), this.compareToLeafNode_(e));
  }
  compareToLeafNode_(e) {
    const t = typeof e.value_,
      s = typeof this.value_,
      i = k.VALUE_TYPE_ORDER.indexOf(t),
      r = k.VALUE_TYPE_ORDER.indexOf(s);
    return (
      f(i >= 0, 'Unknown leaf type: ' + t),
      f(r >= 0, 'Unknown leaf type: ' + s),
      i === r
        ? s === 'object'
          ? 0
          : this.value_ < e.value_
          ? -1
          : this.value_ === e.value_
          ? 0
          : 1
        : r - i
    );
  }
  withIndex() {
    return this;
  }
  isIndexed() {
    return !0;
  }
  equals(e) {
    if (e === this) return !0;
    if (e.isLeafNode()) {
      const t = e;
      return (
        this.value_ === t.value_ && this.priorityNode_.equals(t.priorityNode_)
      );
    } else return !1;
  }
}
k.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];
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
 */ let js, $s;
function $r(n) {
  js = n;
}
function Xr(n) {
  $s = n;
}
class Jr extends pt {
  compare(e, t) {
    const s = e.node.getPriority(),
      i = t.node.getPriority(),
      r = s.compareTo(i);
    return r === 0 ? ae(e.name, t.name) : r;
  }
  isDefinedOn(e) {
    return !e.getPriority().isEmpty();
  }
  indexedValueChanged(e, t) {
    return !e.getPriority().equals(t.getPriority());
  }
  minPost() {
    return y.MIN;
  }
  maxPost() {
    return new y(se, new k('[PRIORITY-POST]', $s));
  }
  makePost(e, t) {
    const s = js(e);
    return new y(t, new k('[PRIORITY-POST]', s));
  }
  toString() {
    return '.priority';
  }
}
const S = new Jr();
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
 */ const Zr = Math.log(2);
class eo {
  constructor(e) {
    const t = (r) => parseInt(Math.log(r) / Zr, 10),
      s = (r) => parseInt(Array(r + 1).join('1'), 2);
    (this.count = t(e + 1)), (this.current_ = this.count - 1);
    const i = s(this.count);
    this.bits_ = (e + 1) & i;
  }
  nextBitIsOne() {
    const e = !(this.bits_ & (1 << this.current_));
    return this.current_--, e;
  }
}
const tt = function (n, e, t, s) {
  n.sort(e);
  const i = function (a, c) {
      const u = c - a;
      let h, d;
      if (u === 0) return null;
      if (u === 1)
        return (
          (h = n[a]), (d = t ? t(h) : h), new x(d, h.node, x.BLACK, null, null)
        );
      {
        const _ = parseInt(u / 2, 10) + a,
          p = i(a, _),
          E = i(_ + 1, c);
        return (h = n[_]), (d = t ? t(h) : h), new x(d, h.node, x.BLACK, p, E);
      }
    },
    r = function (a) {
      let c = null,
        u = null,
        h = n.length;
      const d = function (p, E) {
          const P = h - p,
            ue = h;
          h -= p;
          const je = i(P + 1, ue),
            bt = n[P],
            Ai = t ? t(bt) : bt;
          _(new x(Ai, bt.node, E, null, je));
        },
        _ = function (p) {
          c ? ((c.left = p), (c = p)) : ((u = p), (c = p));
        };
      for (let p = 0; p < a.count; ++p) {
        const E = a.nextBitIsOne(),
          P = Math.pow(2, a.count - (p + 1));
        E ? d(P, x.BLACK) : (d(P, x.BLACK), d(P, x.RED));
      }
      return u;
    },
    o = new eo(n.length),
    l = r(o);
  return new L(s || e, l);
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
 */ let At;
const de = {};
class B {
  constructor(e, t) {
    (this.indexes_ = e), (this.indexSet_ = t);
  }
  static get Default() {
    return (
      f(de && S, 'ChildrenNode.ts has not been loaded'),
      (At = At || new B({ '.priority': de }, { '.priority': S })),
      At
    );
  }
  get(e) {
    const t = ne(this.indexes_, e);
    if (!t) throw new Error('No index defined for ' + e);
    return t instanceof L ? t : null;
  }
  hasIndex(e) {
    return H(this.indexSet_, e.toString());
  }
  addIndex(e, t) {
    f(
      e !== ge,
      "KeyIndex always exists and isn't meant to be added to the IndexMap."
    );
    const s = [];
    let i = !1;
    const r = t.getIterator(y.Wrap);
    let o = r.getNext();
    for (; o; ) (i = i || e.isDefinedOn(o.node)), s.push(o), (o = r.getNext());
    let l;
    i ? (l = tt(s, e.getCompare())) : (l = de);
    const a = e.toString(),
      c = Object.assign({}, this.indexSet_);
    c[a] = e;
    const u = Object.assign({}, this.indexes_);
    return (u[a] = l), new B(u, c);
  }
  addToIndexes(e, t) {
    const s = Je(this.indexes_, (i, r) => {
      const o = ne(this.indexSet_, r);
      if ((f(o, 'Missing index implementation for ' + r), i === de))
        if (o.isDefinedOn(e.node)) {
          const l = [],
            a = t.getIterator(y.Wrap);
          let c = a.getNext();
          for (; c; ) c.name !== e.name && l.push(c), (c = a.getNext());
          return l.push(e), tt(l, o.getCompare());
        } else return de;
      else {
        const l = t.get(e.name);
        let a = i;
        return l && (a = a.remove(new y(e.name, l))), a.insert(e, e.node);
      }
    });
    return new B(s, this.indexSet_);
  }
  removeFromIndexes(e, t) {
    const s = Je(this.indexes_, (i) => {
      if (i === de) return i;
      {
        const r = t.get(e.name);
        return r ? i.remove(new y(e.name, r)) : i;
      }
    });
    return new B(s, this.indexSet_);
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
 */ let Re;
class g {
  constructor(e, t, s) {
    (this.children_ = e),
      (this.priorityNode_ = t),
      (this.indexMap_ = s),
      (this.lazyHash_ = null),
      this.priorityNode_ && zs(this.priorityNode_),
      this.children_.isEmpty() &&
        f(
          !this.priorityNode_ || this.priorityNode_.isEmpty(),
          'An empty node cannot have a priority'
        );
  }
  static get EMPTY_NODE() {
    return Re || (Re = new g(new L(ln), null, B.Default));
  }
  isLeafNode() {
    return !1;
  }
  getPriority() {
    return this.priorityNode_ || Re;
  }
  updatePriority(e) {
    return this.children_.isEmpty()
      ? this
      : new g(this.children_, e, this.indexMap_);
  }
  getImmediateChild(e) {
    if (e === '.priority') return this.getPriority();
    {
      const t = this.children_.get(e);
      return t === null ? Re : t;
    }
  }
  getChild(e) {
    const t = m(e);
    return t === null ? this : this.getImmediateChild(t).getChild(I(e));
  }
  hasChild(e) {
    return this.children_.get(e) !== null;
  }
  updateImmediateChild(e, t) {
    if ((f(t, 'We should always be passing snapshot nodes'), e === '.priority'))
      return this.updatePriority(t);
    {
      const s = new y(e, t);
      let i, r;
      t.isEmpty()
        ? ((i = this.children_.remove(e)),
          (r = this.indexMap_.removeFromIndexes(s, this.children_)))
        : ((i = this.children_.insert(e, t)),
          (r = this.indexMap_.addToIndexes(s, this.children_)));
      const o = i.isEmpty() ? Re : this.priorityNode_;
      return new g(i, o, r);
    }
  }
  updateChild(e, t) {
    const s = m(e);
    if (s === null) return t;
    {
      f(
        m(e) !== '.priority' || $(e) === 1,
        '.priority must be the last token in a path'
      );
      const i = this.getImmediateChild(s).updateChild(I(e), t);
      return this.updateImmediateChild(s, i);
    }
  }
  isEmpty() {
    return this.children_.isEmpty();
  }
  numChildren() {
    return this.children_.count();
  }
  val(e) {
    if (this.isEmpty()) return null;
    const t = {};
    let s = 0,
      i = 0,
      r = !0;
    if (
      (this.forEachChild(S, (o, l) => {
        (t[o] = l.val(e)),
          s++,
          r && g.INTEGER_REGEXP_.test(o)
            ? (i = Math.max(i, Number(o)))
            : (r = !1);
      }),
      !e && r && i < 2 * s)
    ) {
      const o = [];
      for (const l in t) o[l] = t[l];
      return o;
    } else
      return (
        e &&
          !this.getPriority().isEmpty() &&
          (t['.priority'] = this.getPriority().val()),
        t
      );
  }
  hash() {
    if (this.lazyHash_ === null) {
      let e = '';
      this.getPriority().isEmpty() ||
        (e += 'priority:' + Ks(this.getPriority().val()) + ':'),
        this.forEachChild(S, (t, s) => {
          const i = s.hash();
          i !== '' && (e += ':' + t + ':' + i);
        }),
        (this.lazyHash_ = e === '' ? '' : Ts(e));
    }
    return this.lazyHash_;
  }
  getPredecessorChildName(e, t, s) {
    const i = this.resolveIndex_(s);
    if (i) {
      const r = i.getPredecessorKey(new y(e, t));
      return r ? r.name : null;
    } else return this.children_.getPredecessorKey(e);
  }
  getFirstChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const s = t.minKey();
      return s && s.name;
    } else return this.children_.minKey();
  }
  getFirstChild(e) {
    const t = this.getFirstChildName(e);
    return t ? new y(t, this.children_.get(t)) : null;
  }
  getLastChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const s = t.maxKey();
      return s && s.name;
    } else return this.children_.maxKey();
  }
  getLastChild(e) {
    const t = this.getLastChildName(e);
    return t ? new y(t, this.children_.get(t)) : null;
  }
  forEachChild(e, t) {
    const s = this.resolveIndex_(e);
    return s
      ? s.inorderTraversal((i) => t(i.name, i.node))
      : this.children_.inorderTraversal(t);
  }
  getIterator(e) {
    return this.getIteratorFrom(e.minPost(), e);
  }
  getIteratorFrom(e, t) {
    const s = this.resolveIndex_(t);
    if (s) return s.getIteratorFrom(e, (i) => i);
    {
      const i = this.children_.getIteratorFrom(e.name, y.Wrap);
      let r = i.peek();
      for (; r != null && t.compare(r, e) < 0; ) i.getNext(), (r = i.peek());
      return i;
    }
  }
  getReverseIterator(e) {
    return this.getReverseIteratorFrom(e.maxPost(), e);
  }
  getReverseIteratorFrom(e, t) {
    const s = this.resolveIndex_(t);
    if (s) return s.getReverseIteratorFrom(e, (i) => i);
    {
      const i = this.children_.getReverseIteratorFrom(e.name, y.Wrap);
      let r = i.peek();
      for (; r != null && t.compare(r, e) > 0; ) i.getNext(), (r = i.peek());
      return i;
    }
  }
  compareTo(e) {
    return this.isEmpty()
      ? e.isEmpty()
        ? 0
        : -1
      : e.isLeafNode() || e.isEmpty()
      ? 1
      : e === Be
      ? -1
      : 0;
  }
  withIndex(e) {
    if (e === ge || this.indexMap_.hasIndex(e)) return this;
    {
      const t = this.indexMap_.addIndex(e, this.children_);
      return new g(this.children_, this.priorityNode_, t);
    }
  }
  isIndexed(e) {
    return e === ge || this.indexMap_.hasIndex(e);
  }
  equals(e) {
    if (e === this) return !0;
    if (e.isLeafNode()) return !1;
    {
      const t = e;
      if (this.getPriority().equals(t.getPriority()))
        if (this.children_.count() === t.children_.count()) {
          const s = this.getIterator(S),
            i = t.getIterator(S);
          let r = s.getNext(),
            o = i.getNext();
          for (; r && o; ) {
            if (r.name !== o.name || !r.node.equals(o.node)) return !1;
            (r = s.getNext()), (o = i.getNext());
          }
          return r === null && o === null;
        } else return !1;
      else return !1;
    }
  }
  resolveIndex_(e) {
    return e === ge ? null : this.indexMap_.get(e.toString());
  }
}
g.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class to extends g {
  constructor() {
    super(new L(ln), g.EMPTY_NODE, B.Default);
  }
  compareTo(e) {
    return e === this ? 0 : 1;
  }
  equals(e) {
    return e === this;
  }
  getPriority() {
    return this;
  }
  getImmediateChild(e) {
    return g.EMPTY_NODE;
  }
  isEmpty() {
    return !1;
  }
}
const Be = new to();
Object.defineProperties(y, {
  MIN: { value: new y(me, g.EMPTY_NODE) },
  MAX: { value: new y(se, Be) },
});
Qs.__EMPTY_NODE = g.EMPTY_NODE;
k.__childrenNodeConstructor = g;
jr(Be);
Xr(Be);
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
 */ const no = !0;
function R(n, e = null) {
  if (n === null) return g.EMPTY_NODE;
  if (
    (typeof n == 'object' && '.priority' in n && (e = n['.priority']),
    f(
      e === null ||
        typeof e == 'string' ||
        typeof e == 'number' ||
        (typeof e == 'object' && '.sv' in e),
      'Invalid priority type found: ' + typeof e
    ),
    typeof n == 'object' &&
      '.value' in n &&
      n['.value'] !== null &&
      (n = n['.value']),
    typeof n != 'object' || '.sv' in n)
  ) {
    const t = n;
    return new k(t, R(e));
  }
  if (!(n instanceof Array) && no) {
    const t = [];
    let s = !1;
    if (
      (M(n, (o, l) => {
        if (o.substring(0, 1) !== '.') {
          const a = R(l);
          a.isEmpty() ||
            ((s = s || !a.getPriority().isEmpty()), t.push(new y(o, a)));
        }
      }),
      t.length === 0)
    )
      return g.EMPTY_NODE;
    const r = tt(t, zr, (o) => o.name, ln);
    if (s) {
      const o = tt(t, S.getCompare());
      return new g(r, R(e), new B({ '.priority': o }, { '.priority': S }));
    } else return new g(r, R(e), B.Default);
  } else {
    let t = g.EMPTY_NODE;
    return (
      M(n, (s, i) => {
        if (H(n, s) && s.substring(0, 1) !== '.') {
          const r = R(i);
          (r.isLeafNode() || !r.isEmpty()) &&
            (t = t.updateImmediateChild(s, r));
        }
      }),
      t.updatePriority(R(e))
    );
  }
}
$r(R);
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
 */ class so extends pt {
  constructor(e) {
    super(),
      (this.indexPath_ = e),
      f(
        !v(e) && m(e) !== '.priority',
        "Can't create PathIndex with empty path or .priority key"
      );
  }
  extractChild(e) {
    return e.getChild(this.indexPath_);
  }
  isDefinedOn(e) {
    return !e.getChild(this.indexPath_).isEmpty();
  }
  compare(e, t) {
    const s = this.extractChild(e.node),
      i = this.extractChild(t.node),
      r = s.compareTo(i);
    return r === 0 ? ae(e.name, t.name) : r;
  }
  makePost(e, t) {
    const s = R(e),
      i = g.EMPTY_NODE.updateChild(this.indexPath_, s);
    return new y(t, i);
  }
  maxPost() {
    const e = g.EMPTY_NODE.updateChild(this.indexPath_, Be);
    return new y(se, e);
  }
  toString() {
    return De(this.indexPath_, 0).join('/');
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
 */ class io extends pt {
  compare(e, t) {
    const s = e.node.compareTo(t.node);
    return s === 0 ? ae(e.name, t.name) : s;
  }
  isDefinedOn(e) {
    return !0;
  }
  indexedValueChanged(e, t) {
    return !e.equals(t);
  }
  minPost() {
    return y.MIN;
  }
  maxPost() {
    return y.MAX;
  }
  makePost(e, t) {
    const s = R(e);
    return new y(t, s);
  }
  toString() {
    return '.value';
  }
}
const ro = new io();
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
 */ function Xs(n) {
  return { type: 'value', snapshotNode: n };
}
function ye(n, e) {
  return { type: 'child_added', snapshotNode: e, childName: n };
}
function Oe(n, e) {
  return { type: 'child_removed', snapshotNode: e, childName: n };
}
function Le(n, e, t) {
  return { type: 'child_changed', snapshotNode: e, childName: n, oldSnap: t };
}
function oo(n, e) {
  return { type: 'child_moved', snapshotNode: e, childName: n };
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
 */ class an {
  constructor(e) {
    this.index_ = e;
  }
  updateChild(e, t, s, i, r, o) {
    f(
      e.isIndexed(this.index_),
      'A node must be indexed if only a child is updated'
    );
    const l = e.getImmediateChild(t);
    return (l.getChild(i).equals(s.getChild(i)) &&
      l.isEmpty() === s.isEmpty()) ||
      (o != null &&
        (s.isEmpty()
          ? e.hasChild(t)
            ? o.trackChildChange(Oe(t, l))
            : f(
                e.isLeafNode(),
                'A child remove without an old child only makes sense on a leaf node'
              )
          : l.isEmpty()
          ? o.trackChildChange(ye(t, s))
          : o.trackChildChange(Le(t, s, l))),
      e.isLeafNode() && s.isEmpty())
      ? e
      : e.updateImmediateChild(t, s).withIndex(this.index_);
  }
  updateFullNode(e, t, s) {
    return (
      s != null &&
        (e.isLeafNode() ||
          e.forEachChild(S, (i, r) => {
            t.hasChild(i) || s.trackChildChange(Oe(i, r));
          }),
        t.isLeafNode() ||
          t.forEachChild(S, (i, r) => {
            if (e.hasChild(i)) {
              const o = e.getImmediateChild(i);
              o.equals(r) || s.trackChildChange(Le(i, r, o));
            } else s.trackChildChange(ye(i, r));
          })),
      t.withIndex(this.index_)
    );
  }
  updatePriority(e, t) {
    return e.isEmpty() ? g.EMPTY_NODE : e.updatePriority(t);
  }
  filtersNodes() {
    return !1;
  }
  getIndexedFilter() {
    return this;
  }
  getIndex() {
    return this.index_;
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
 */ class Fe {
  constructor(e) {
    (this.indexedFilter_ = new an(e.getIndex())),
      (this.index_ = e.getIndex()),
      (this.startPost_ = Fe.getStartPost_(e)),
      (this.endPost_ = Fe.getEndPost_(e)),
      (this.startIsInclusive_ = !e.startAfterSet_),
      (this.endIsInclusive_ = !e.endBeforeSet_);
  }
  getStartPost() {
    return this.startPost_;
  }
  getEndPost() {
    return this.endPost_;
  }
  matches(e) {
    const t = this.startIsInclusive_
        ? this.index_.compare(this.getStartPost(), e) <= 0
        : this.index_.compare(this.getStartPost(), e) < 0,
      s = this.endIsInclusive_
        ? this.index_.compare(e, this.getEndPost()) <= 0
        : this.index_.compare(e, this.getEndPost()) < 0;
    return t && s;
  }
  updateChild(e, t, s, i, r, o) {
    return (
      this.matches(new y(t, s)) || (s = g.EMPTY_NODE),
      this.indexedFilter_.updateChild(e, t, s, i, r, o)
    );
  }
  updateFullNode(e, t, s) {
    t.isLeafNode() && (t = g.EMPTY_NODE);
    let i = t.withIndex(this.index_);
    i = i.updatePriority(g.EMPTY_NODE);
    const r = this;
    return (
      t.forEachChild(S, (o, l) => {
        r.matches(new y(o, l)) || (i = i.updateImmediateChild(o, g.EMPTY_NODE));
      }),
      this.indexedFilter_.updateFullNode(e, i, s)
    );
  }
  updatePriority(e, t) {
    return e;
  }
  filtersNodes() {
    return !0;
  }
  getIndexedFilter() {
    return this.indexedFilter_;
  }
  getIndex() {
    return this.index_;
  }
  static getStartPost_(e) {
    if (e.hasStart()) {
      const t = e.getIndexStartName();
      return e.getIndex().makePost(e.getIndexStartValue(), t);
    } else return e.getIndex().minPost();
  }
  static getEndPost_(e) {
    if (e.hasEnd()) {
      const t = e.getIndexEndName();
      return e.getIndex().makePost(e.getIndexEndValue(), t);
    } else return e.getIndex().maxPost();
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
 */ class lo {
  constructor(e) {
    (this.withinDirectionalStart = (t) =>
      this.reverse_ ? this.withinEndPost(t) : this.withinStartPost(t)),
      (this.withinDirectionalEnd = (t) =>
        this.reverse_ ? this.withinStartPost(t) : this.withinEndPost(t)),
      (this.withinStartPost = (t) => {
        const s = this.index_.compare(this.rangedFilter_.getStartPost(), t);
        return this.startIsInclusive_ ? s <= 0 : s < 0;
      }),
      (this.withinEndPost = (t) => {
        const s = this.index_.compare(t, this.rangedFilter_.getEndPost());
        return this.endIsInclusive_ ? s <= 0 : s < 0;
      }),
      (this.rangedFilter_ = new Fe(e)),
      (this.index_ = e.getIndex()),
      (this.limit_ = e.getLimit()),
      (this.reverse_ = !e.isViewFromLeft()),
      (this.startIsInclusive_ = !e.startAfterSet_),
      (this.endIsInclusive_ = !e.endBeforeSet_);
  }
  updateChild(e, t, s, i, r, o) {
    return (
      this.rangedFilter_.matches(new y(t, s)) || (s = g.EMPTY_NODE),
      e.getImmediateChild(t).equals(s)
        ? e
        : e.numChildren() < this.limit_
        ? this.rangedFilter_.getIndexedFilter().updateChild(e, t, s, i, r, o)
        : this.fullLimitUpdateChild_(e, t, s, r, o)
    );
  }
  updateFullNode(e, t, s) {
    let i;
    if (t.isLeafNode() || t.isEmpty()) i = g.EMPTY_NODE.withIndex(this.index_);
    else if (this.limit_ * 2 < t.numChildren() && t.isIndexed(this.index_)) {
      i = g.EMPTY_NODE.withIndex(this.index_);
      let r;
      this.reverse_
        ? (r = t.getReverseIteratorFrom(
            this.rangedFilter_.getEndPost(),
            this.index_
          ))
        : (r = t.getIteratorFrom(
            this.rangedFilter_.getStartPost(),
            this.index_
          ));
      let o = 0;
      for (; r.hasNext() && o < this.limit_; ) {
        const l = r.getNext();
        if (this.withinDirectionalStart(l))
          if (this.withinDirectionalEnd(l))
            (i = i.updateImmediateChild(l.name, l.node)), o++;
          else break;
        else continue;
      }
    } else {
      (i = t.withIndex(this.index_)), (i = i.updatePriority(g.EMPTY_NODE));
      let r;
      this.reverse_
        ? (r = i.getReverseIterator(this.index_))
        : (r = i.getIterator(this.index_));
      let o = 0;
      for (; r.hasNext(); ) {
        const l = r.getNext();
        o < this.limit_ &&
        this.withinDirectionalStart(l) &&
        this.withinDirectionalEnd(l)
          ? o++
          : (i = i.updateImmediateChild(l.name, g.EMPTY_NODE));
      }
    }
    return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, s);
  }
  updatePriority(e, t) {
    return e;
  }
  filtersNodes() {
    return !0;
  }
  getIndexedFilter() {
    return this.rangedFilter_.getIndexedFilter();
  }
  getIndex() {
    return this.index_;
  }
  fullLimitUpdateChild_(e, t, s, i, r) {
    let o;
    if (this.reverse_) {
      const h = this.index_.getCompare();
      o = (d, _) => h(_, d);
    } else o = this.index_.getCompare();
    const l = e;
    f(l.numChildren() === this.limit_, '');
    const a = new y(t, s),
      c = this.reverse_
        ? l.getFirstChild(this.index_)
        : l.getLastChild(this.index_),
      u = this.rangedFilter_.matches(a);
    if (l.hasChild(t)) {
      const h = l.getImmediateChild(t);
      let d = i.getChildAfterChild(this.index_, c, this.reverse_);
      for (; d != null && (d.name === t || l.hasChild(d.name)); )
        d = i.getChildAfterChild(this.index_, d, this.reverse_);
      const _ = d == null ? 1 : o(d, a);
      if (u && !s.isEmpty() && _ >= 0)
        return (
          r != null && r.trackChildChange(Le(t, s, h)),
          l.updateImmediateChild(t, s)
        );
      {
        r != null && r.trackChildChange(Oe(t, h));
        const E = l.updateImmediateChild(t, g.EMPTY_NODE);
        return d != null && this.rangedFilter_.matches(d)
          ? (r != null && r.trackChildChange(ye(d.name, d.node)),
            E.updateImmediateChild(d.name, d.node))
          : E;
      }
    } else
      return s.isEmpty()
        ? e
        : u && o(c, a) >= 0
        ? (r != null &&
            (r.trackChildChange(Oe(c.name, c.node)),
            r.trackChildChange(ye(t, s))),
          l
            .updateImmediateChild(t, s)
            .updateImmediateChild(c.name, g.EMPTY_NODE))
        : e;
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
 */ class cn {
  constructor() {
    (this.limitSet_ = !1),
      (this.startSet_ = !1),
      (this.startNameSet_ = !1),
      (this.startAfterSet_ = !1),
      (this.endSet_ = !1),
      (this.endNameSet_ = !1),
      (this.endBeforeSet_ = !1),
      (this.limit_ = 0),
      (this.viewFrom_ = ''),
      (this.indexStartValue_ = null),
      (this.indexStartName_ = ''),
      (this.indexEndValue_ = null),
      (this.indexEndName_ = ''),
      (this.index_ = S);
  }
  hasStart() {
    return this.startSet_;
  }
  isViewFromLeft() {
    return this.viewFrom_ === '' ? this.startSet_ : this.viewFrom_ === 'l';
  }
  getIndexStartValue() {
    return (
      f(this.startSet_, 'Only valid if start has been set'),
      this.indexStartValue_
    );
  }
  getIndexStartName() {
    return (
      f(this.startSet_, 'Only valid if start has been set'),
      this.startNameSet_ ? this.indexStartName_ : me
    );
  }
  hasEnd() {
    return this.endSet_;
  }
  getIndexEndValue() {
    return (
      f(this.endSet_, 'Only valid if end has been set'), this.indexEndValue_
    );
  }
  getIndexEndName() {
    return (
      f(this.endSet_, 'Only valid if end has been set'),
      this.endNameSet_ ? this.indexEndName_ : se
    );
  }
  hasLimit() {
    return this.limitSet_;
  }
  hasAnchoredLimit() {
    return this.limitSet_ && this.viewFrom_ !== '';
  }
  getLimit() {
    return f(this.limitSet_, 'Only valid if limit has been set'), this.limit_;
  }
  getIndex() {
    return this.index_;
  }
  loadsAllData() {
    return !(this.startSet_ || this.endSet_ || this.limitSet_);
  }
  isDefault() {
    return this.loadsAllData() && this.index_ === S;
  }
  copy() {
    const e = new cn();
    return (
      (e.limitSet_ = this.limitSet_),
      (e.limit_ = this.limit_),
      (e.startSet_ = this.startSet_),
      (e.startAfterSet_ = this.startAfterSet_),
      (e.indexStartValue_ = this.indexStartValue_),
      (e.startNameSet_ = this.startNameSet_),
      (e.indexStartName_ = this.indexStartName_),
      (e.endSet_ = this.endSet_),
      (e.endBeforeSet_ = this.endBeforeSet_),
      (e.indexEndValue_ = this.indexEndValue_),
      (e.endNameSet_ = this.endNameSet_),
      (e.indexEndName_ = this.indexEndName_),
      (e.index_ = this.index_),
      (e.viewFrom_ = this.viewFrom_),
      e
    );
  }
}
function ao(n) {
  return n.loadsAllData()
    ? new an(n.getIndex())
    : n.hasLimit()
    ? new lo(n)
    : new Fe(n);
}
function es(n) {
  const e = {};
  if (n.isDefault()) return e;
  let t;
  if (
    (n.index_ === S
      ? (t = '$priority')
      : n.index_ === ro
      ? (t = '$value')
      : n.index_ === ge
      ? (t = '$key')
      : (f(n.index_ instanceof so, 'Unrecognized index type!'),
        (t = n.index_.toString())),
    (e.orderBy = b(t)),
    n.startSet_)
  ) {
    const s = n.startAfterSet_ ? 'startAfter' : 'startAt';
    (e[s] = b(n.indexStartValue_)),
      n.startNameSet_ && (e[s] += ',' + b(n.indexStartName_));
  }
  if (n.endSet_) {
    const s = n.endBeforeSet_ ? 'endBefore' : 'endAt';
    (e[s] = b(n.indexEndValue_)),
      n.endNameSet_ && (e[s] += ',' + b(n.indexEndName_));
  }
  return (
    n.limitSet_ &&
      (n.isViewFromLeft()
        ? (e.limitToFirst = n.limit_)
        : (e.limitToLast = n.limit_)),
    e
  );
}
function ts(n) {
  const e = {};
  if (
    (n.startSet_ &&
      ((e.sp = n.indexStartValue_),
      n.startNameSet_ && (e.sn = n.indexStartName_),
      (e.sin = !n.startAfterSet_)),
    n.endSet_ &&
      ((e.ep = n.indexEndValue_),
      n.endNameSet_ && (e.en = n.indexEndName_),
      (e.ein = !n.endBeforeSet_)),
    n.limitSet_)
  ) {
    e.l = n.limit_;
    let t = n.viewFrom_;
    t === '' && (n.isViewFromLeft() ? (t = 'l') : (t = 'r')), (e.vf = t);
  }
  return n.index_ !== S && (e.i = n.index_.toString()), e;
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
 */ class nt extends Hs {
  constructor(e, t, s, i) {
    super(),
      (this.repoInfo_ = e),
      (this.onDataUpdate_ = t),
      (this.authTokenProvider_ = s),
      (this.appCheckTokenProvider_ = i),
      (this.log_ = qe('p:rest:')),
      (this.listens_ = {});
  }
  reportStats(e) {
    throw new Error('Method not implemented.');
  }
  static getListenId_(e, t) {
    return t !== void 0
      ? 'tag$' + t
      : (f(
          e._queryParams.isDefault(),
          "should have a tag if it's not a default query."
        ),
        e._path.toString());
  }
  listen(e, t, s, i) {
    const r = e._path.toString();
    this.log_('Listen called for ' + r + ' ' + e._queryIdentifier);
    const o = nt.getListenId_(e, s),
      l = {};
    this.listens_[o] = l;
    const a = es(e._queryParams);
    this.restRequest_(r + '.json', a, (c, u) => {
      let h = u;
      if (
        (c === 404 && ((h = null), (c = null)),
        c === null && this.onDataUpdate_(r, h, !1, s),
        ne(this.listens_, o) === l)
      ) {
        let d;
        c
          ? c === 401
            ? (d = 'permission_denied')
            : (d = 'rest_error:' + c)
          : (d = 'ok'),
          i(d, null);
      }
    });
  }
  unlisten(e, t) {
    const s = nt.getListenId_(e, t);
    delete this.listens_[s];
  }
  get(e) {
    const t = es(e._queryParams),
      s = e._path.toString(),
      i = new Ve();
    return (
      this.restRequest_(s + '.json', t, (r, o) => {
        let l = o;
        r === 404 && ((l = null), (r = null)),
          r === null
            ? (this.onDataUpdate_(s, l, !1, null), i.resolve(l))
            : i.reject(new Error(l));
      }),
      i.promise
    );
  }
  refreshAuthToken(e) {}
  restRequest_(e, t = {}, s) {
    return (
      (t.format = 'export'),
      Promise.all([
        this.authTokenProvider_.getToken(!1),
        this.appCheckTokenProvider_.getToken(!1),
      ]).then(([i, r]) => {
        i && i.accessToken && (t.auth = i.accessToken),
          r && r.token && (t.ac = r.token);
        const o =
          (this.repoInfo_.secure ? 'https://' : 'http://') +
          this.repoInfo_.host +
          e +
          '?ns=' +
          this.repoInfo_.namespace +
          Ki(t);
        this.log_('Sending REST request for ' + o);
        const l = new XMLHttpRequest();
        (l.onreadystatechange = () => {
          if (s && l.readyState === 4) {
            this.log_(
              'REST Response for ' + o + ' received. status:',
              l.status,
              'response:',
              l.responseText
            );
            let a = null;
            if (l.status >= 200 && l.status < 300) {
              try {
                a = $t(l.responseText);
              } catch {
                O(
                  'Failed to parse JSON response for ' +
                    o +
                    ': ' +
                    l.responseText
                );
              }
              s(null, a);
            } else
              l.status !== 401 &&
                l.status !== 404 &&
                O(
                  'Got unsuccessful REST response for ' +
                    o +
                    ' Status: ' +
                    l.status
                ),
                s(l.status);
            s = null;
          }
        }),
          l.open('GET', o, !0),
          l.send();
      })
    );
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
 */ class co {
  constructor() {
    this.rootNode_ = g.EMPTY_NODE;
  }
  getNode(e) {
    return this.rootNode_.getChild(e);
  }
  updateSnapshot(e, t) {
    this.rootNode_ = this.rootNode_.updateChild(e, t);
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
 */ function st() {
  return { value: null, children: new Map() };
}
function Js(n, e, t) {
  if (v(e)) (n.value = t), n.children.clear();
  else if (n.value !== null) n.value = n.value.updateChild(e, t);
  else {
    const s = m(e);
    n.children.has(s) || n.children.set(s, st());
    const i = n.children.get(s);
    (e = I(e)), Js(i, e, t);
  }
}
function Vt(n, e, t) {
  n.value !== null
    ? t(e, n.value)
    : ho(n, (s, i) => {
        const r = new w(e.toString() + '/' + s);
        Vt(i, r, t);
      });
}
function ho(n, e) {
  n.children.forEach((t, s) => {
    e(s, t);
  });
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
 */ class uo {
  constructor(e) {
    (this.collection_ = e), (this.last_ = null);
  }
  get() {
    const e = this.collection_.get(),
      t = Object.assign({}, e);
    return (
      this.last_ &&
        M(this.last_, (s, i) => {
          t[s] = t[s] - i;
        }),
      (this.last_ = e),
      t
    );
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
 */ const ns = 10 * 1e3,
  fo = 30 * 1e3,
  _o = 5 * 60 * 1e3;
class po {
  constructor(e, t) {
    (this.server_ = t),
      (this.statsToReport_ = {}),
      (this.statsListener_ = new uo(e));
    const s = ns + (fo - ns) * Math.random();
    ke(this.reportStats_.bind(this), Math.floor(s));
  }
  reportStats_() {
    const e = this.statsListener_.get(),
      t = {};
    let s = !1;
    M(e, (i, r) => {
      r > 0 && H(this.statsToReport_, i) && ((t[i] = r), (s = !0));
    }),
      s && this.server_.reportStats(t),
      ke(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * _o));
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
 */ var V;
(function (n) {
  (n[(n.OVERWRITE = 0)] = 'OVERWRITE'),
    (n[(n.MERGE = 1)] = 'MERGE'),
    (n[(n.ACK_USER_WRITE = 2)] = 'ACK_USER_WRITE'),
    (n[(n.LISTEN_COMPLETE = 3)] = 'LISTEN_COMPLETE');
})(V || (V = {}));
function hn() {
  return { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 };
}
function un() {
  return { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 };
}
function dn(n) {
  return { fromUser: !1, fromServer: !0, queryId: n, tagged: !0 };
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
 */ class it {
  constructor(e, t, s) {
    (this.path = e),
      (this.affectedTree = t),
      (this.revert = s),
      (this.type = V.ACK_USER_WRITE),
      (this.source = hn());
  }
  operationForChild(e) {
    if (v(this.path)) {
      if (this.affectedTree.value != null)
        return (
          f(
            this.affectedTree.children.isEmpty(),
            'affectedTree should not have overlapping affected paths.'
          ),
          this
        );
      {
        const t = this.affectedTree.subtree(new w(e));
        return new it(C(), t, this.revert);
      }
    } else
      return (
        f(m(this.path) === e, 'operationForChild called for unrelated child.'),
        new it(I(this.path), this.affectedTree, this.revert)
      );
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
 */ class We {
  constructor(e, t) {
    (this.source = e), (this.path = t), (this.type = V.LISTEN_COMPLETE);
  }
  operationForChild(e) {
    return v(this.path)
      ? new We(this.source, C())
      : new We(this.source, I(this.path));
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
 */ class ie {
  constructor(e, t, s) {
    (this.source = e),
      (this.path = t),
      (this.snap = s),
      (this.type = V.OVERWRITE);
  }
  operationForChild(e) {
    return v(this.path)
      ? new ie(this.source, C(), this.snap.getImmediateChild(e))
      : new ie(this.source, I(this.path), this.snap);
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
 */ class ve {
  constructor(e, t, s) {
    (this.source = e),
      (this.path = t),
      (this.children = s),
      (this.type = V.MERGE);
  }
  operationForChild(e) {
    if (v(this.path)) {
      const t = this.children.subtree(new w(e));
      return t.isEmpty()
        ? null
        : t.value
        ? new ie(this.source, C(), t.value)
        : new ve(this.source, C(), t);
    } else
      return (
        f(
          m(this.path) === e,
          "Can't get a merge for a child not on the path of the operation"
        ),
        new ve(this.source, I(this.path), this.children)
      );
  }
  toString() {
    return (
      'Operation(' +
      this.path +
      ': ' +
      this.source.toString() +
      ' merge: ' +
      this.children.toString() +
      ')'
    );
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
 */ class X {
  constructor(e, t, s) {
    (this.node_ = e), (this.fullyInitialized_ = t), (this.filtered_ = s);
  }
  isFullyInitialized() {
    return this.fullyInitialized_;
  }
  isFiltered() {
    return this.filtered_;
  }
  isCompleteForPath(e) {
    if (v(e)) return this.isFullyInitialized() && !this.filtered_;
    const t = m(e);
    return this.isCompleteForChild(t);
  }
  isCompleteForChild(e) {
    return (
      (this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(e)
    );
  }
  getNode() {
    return this.node_;
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
 */ class go {
  constructor(e) {
    (this.query_ = e), (this.index_ = this.query_._queryParams.getIndex());
  }
}
function mo(n, e, t, s) {
  const i = [],
    r = [];
  return (
    e.forEach((o) => {
      o.type === 'child_changed' &&
        n.index_.indexedValueChanged(o.oldSnap, o.snapshotNode) &&
        r.push(oo(o.childName, o.snapshotNode));
    }),
    be(n, i, 'child_removed', e, s, t),
    be(n, i, 'child_added', e, s, t),
    be(n, i, 'child_moved', r, s, t),
    be(n, i, 'child_changed', e, s, t),
    be(n, i, 'value', e, s, t),
    i
  );
}
function be(n, e, t, s, i, r) {
  const o = s.filter((l) => l.type === t);
  o.sort((l, a) => vo(n, l, a)),
    o.forEach((l) => {
      const a = yo(n, l, r);
      i.forEach((c) => {
        c.respondsTo(l.type) && e.push(c.createEvent(a, n.query_));
      });
    });
}
function yo(n, e, t) {
  return (
    e.type === 'value' ||
      e.type === 'child_removed' ||
      (e.prevName = t.getPredecessorChildName(
        e.childName,
        e.snapshotNode,
        n.index_
      )),
    e
  );
}
function vo(n, e, t) {
  if (e.childName == null || t.childName == null)
    throw Ge('Should only compare child_ events.');
  const s = new y(e.childName, e.snapshotNode),
    i = new y(t.childName, t.snapshotNode);
  return n.index_.compare(s, i);
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
 */ function gt(n, e) {
  return { eventCache: n, serverCache: e };
}
function xe(n, e, t, s) {
  return gt(new X(e, t, s), n.serverCache);
}
function Zs(n, e, t, s) {
  return gt(n.eventCache, new X(e, t, s));
}
function rt(n) {
  return n.eventCache.isFullyInitialized() ? n.eventCache.getNode() : null;
}
function re(n) {
  return n.serverCache.isFullyInitialized() ? n.serverCache.getNode() : null;
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
 */ let Mt;
const Co = () => (Mt || (Mt = new L(sr)), Mt);
class T {
  constructor(e, t = Co()) {
    (this.value = e), (this.children = t);
  }
  static fromObject(e) {
    let t = new T(null);
    return (
      M(e, (s, i) => {
        t = t.set(new w(s), i);
      }),
      t
    );
  }
  isEmpty() {
    return this.value === null && this.children.isEmpty();
  }
  findRootMostMatchingPathAndValue(e, t) {
    if (this.value != null && t(this.value))
      return { path: C(), value: this.value };
    if (v(e)) return null;
    {
      const s = m(e),
        i = this.children.get(s);
      if (i !== null) {
        const r = i.findRootMostMatchingPathAndValue(I(e), t);
        return r != null ? { path: N(new w(s), r.path), value: r.value } : null;
      } else return null;
    }
  }
  findRootMostValueAndPath(e) {
    return this.findRootMostMatchingPathAndValue(e, () => !0);
  }
  subtree(e) {
    if (v(e)) return this;
    {
      const t = m(e),
        s = this.children.get(t);
      return s !== null ? s.subtree(I(e)) : new T(null);
    }
  }
  set(e, t) {
    if (v(e)) return new T(t, this.children);
    {
      const s = m(e),
        r = (this.children.get(s) || new T(null)).set(I(e), t),
        o = this.children.insert(s, r);
      return new T(this.value, o);
    }
  }
  remove(e) {
    if (v(e))
      return this.children.isEmpty() ? new T(null) : new T(null, this.children);
    {
      const t = m(e),
        s = this.children.get(t);
      if (s) {
        const i = s.remove(I(e));
        let r;
        return (
          i.isEmpty()
            ? (r = this.children.remove(t))
            : (r = this.children.insert(t, i)),
          this.value === null && r.isEmpty()
            ? new T(null)
            : new T(this.value, r)
        );
      } else return this;
    }
  }
  get(e) {
    if (v(e)) return this.value;
    {
      const t = m(e),
        s = this.children.get(t);
      return s ? s.get(I(e)) : null;
    }
  }
  setTree(e, t) {
    if (v(e)) return t;
    {
      const s = m(e),
        r = (this.children.get(s) || new T(null)).setTree(I(e), t);
      let o;
      return (
        r.isEmpty()
          ? (o = this.children.remove(s))
          : (o = this.children.insert(s, r)),
        new T(this.value, o)
      );
    }
  }
  fold(e) {
    return this.fold_(C(), e);
  }
  fold_(e, t) {
    const s = {};
    return (
      this.children.inorderTraversal((i, r) => {
        s[i] = r.fold_(N(e, i), t);
      }),
      t(e, this.value, s)
    );
  }
  findOnPath(e, t) {
    return this.findOnPath_(e, C(), t);
  }
  findOnPath_(e, t, s) {
    const i = this.value ? s(t, this.value) : !1;
    if (i) return i;
    if (v(e)) return null;
    {
      const r = m(e),
        o = this.children.get(r);
      return o ? o.findOnPath_(I(e), N(t, r), s) : null;
    }
  }
  foreachOnPath(e, t) {
    return this.foreachOnPath_(e, C(), t);
  }
  foreachOnPath_(e, t, s) {
    if (v(e)) return this;
    {
      this.value && s(t, this.value);
      const i = m(e),
        r = this.children.get(i);
      return r ? r.foreachOnPath_(I(e), N(t, i), s) : new T(null);
    }
  }
  foreach(e) {
    this.foreach_(C(), e);
  }
  foreach_(e, t) {
    this.children.inorderTraversal((s, i) => {
      i.foreach_(N(e, s), t);
    }),
      this.value && t(e, this.value);
  }
  foreachChild(e) {
    this.children.inorderTraversal((t, s) => {
      s.value && e(t, s.value);
    });
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
 */ class G {
  constructor(e) {
    this.writeTree_ = e;
  }
  static empty() {
    return new G(new T(null));
  }
}
function Pe(n, e, t) {
  if (v(e)) return new G(new T(t));
  {
    const s = n.writeTree_.findRootMostValueAndPath(e);
    if (s != null) {
      const i = s.path;
      let r = s.value;
      const o = D(i, e);
      return (r = r.updateChild(o, t)), new G(n.writeTree_.set(i, r));
    } else {
      const i = new T(t),
        r = n.writeTree_.setTree(e, i);
      return new G(r);
    }
  }
}
function Gt(n, e, t) {
  let s = n;
  return (
    M(t, (i, r) => {
      s = Pe(s, N(e, i), r);
    }),
    s
  );
}
function ss(n, e) {
  if (v(e)) return G.empty();
  {
    const t = n.writeTree_.setTree(e, new T(null));
    return new G(t);
  }
}
function Ht(n, e) {
  return ce(n, e) != null;
}
function ce(n, e) {
  const t = n.writeTree_.findRootMostValueAndPath(e);
  return t != null ? n.writeTree_.get(t.path).getChild(D(t.path, e)) : null;
}
function is(n) {
  const e = [],
    t = n.writeTree_.value;
  return (
    t != null
      ? t.isLeafNode() ||
        t.forEachChild(S, (s, i) => {
          e.push(new y(s, i));
        })
      : n.writeTree_.children.inorderTraversal((s, i) => {
          i.value != null && e.push(new y(s, i.value));
        }),
    e
  );
}
function z(n, e) {
  if (v(e)) return n;
  {
    const t = ce(n, e);
    return t != null ? new G(new T(t)) : new G(n.writeTree_.subtree(e));
  }
}
function qt(n) {
  return n.writeTree_.isEmpty();
}
function Ce(n, e) {
  return ei(C(), n.writeTree_, e);
}
function ei(n, e, t) {
  if (e.value != null) return t.updateChild(n, e.value);
  {
    let s = null;
    return (
      e.children.inorderTraversal((i, r) => {
        i === '.priority'
          ? (f(r.value !== null, 'Priority writes must always be leaf nodes'),
            (s = r.value))
          : (t = ei(N(n, i), r, t));
      }),
      !t.getChild(n).isEmpty() &&
        s !== null &&
        (t = t.updateChild(N(n, '.priority'), s)),
      t
    );
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
 */ function mt(n, e) {
  return ii(e, n);
}
function Eo(n, e, t, s, i) {
  f(s > n.lastWriteId, 'Stacking an older write on top of newer ones'),
    i === void 0 && (i = !0),
    n.allWrites.push({ path: e, snap: t, writeId: s, visible: i }),
    i && (n.visibleWrites = Pe(n.visibleWrites, e, t)),
    (n.lastWriteId = s);
}
function wo(n, e, t, s) {
  f(s > n.lastWriteId, 'Stacking an older merge on top of newer ones'),
    n.allWrites.push({ path: e, children: t, writeId: s, visible: !0 }),
    (n.visibleWrites = Gt(n.visibleWrites, e, t)),
    (n.lastWriteId = s);
}
function To(n, e) {
  for (let t = 0; t < n.allWrites.length; t++) {
    const s = n.allWrites[t];
    if (s.writeId === e) return s;
  }
  return null;
}
function Io(n, e) {
  const t = n.allWrites.findIndex((l) => l.writeId === e);
  f(t >= 0, 'removeWrite called with nonexistent writeId.');
  const s = n.allWrites[t];
  n.allWrites.splice(t, 1);
  let i = s.visible,
    r = !1,
    o = n.allWrites.length - 1;
  for (; i && o >= 0; ) {
    const l = n.allWrites[o];
    l.visible &&
      (o >= t && So(l, s.path) ? (i = !1) : W(s.path, l.path) && (r = !0)),
      o--;
  }
  if (i) {
    if (r) return No(n), !0;
    if (s.snap) n.visibleWrites = ss(n.visibleWrites, s.path);
    else {
      const l = s.children;
      M(l, (a) => {
        n.visibleWrites = ss(n.visibleWrites, N(s.path, a));
      });
    }
    return !0;
  } else return !1;
}
function So(n, e) {
  if (n.snap) return W(n.path, e);
  for (const t in n.children)
    if (n.children.hasOwnProperty(t) && W(N(n.path, t), e)) return !0;
  return !1;
}
function No(n) {
  (n.visibleWrites = ti(n.allWrites, Ro, C())),
    n.allWrites.length > 0
      ? (n.lastWriteId = n.allWrites[n.allWrites.length - 1].writeId)
      : (n.lastWriteId = -1);
}
function Ro(n) {
  return n.visible;
}
function ti(n, e, t) {
  let s = G.empty();
  for (let i = 0; i < n.length; ++i) {
    const r = n[i];
    if (e(r)) {
      const o = r.path;
      let l;
      if (r.snap)
        W(t, o)
          ? ((l = D(t, o)), (s = Pe(s, l, r.snap)))
          : W(o, t) && ((l = D(o, t)), (s = Pe(s, C(), r.snap.getChild(l))));
      else if (r.children) {
        if (W(t, o)) (l = D(t, o)), (s = Gt(s, l, r.children));
        else if (W(o, t))
          if (((l = D(o, t)), v(l))) s = Gt(s, C(), r.children);
          else {
            const a = ne(r.children, m(l));
            if (a) {
              const c = a.getChild(I(l));
              s = Pe(s, C(), c);
            }
          }
      } else throw Ge('WriteRecord should have .snap or .children');
    }
  }
  return s;
}
function ni(n, e, t, s, i) {
  if (!s && !i) {
    const r = ce(n.visibleWrites, e);
    if (r != null) return r;
    {
      const o = z(n.visibleWrites, e);
      if (qt(o)) return t;
      if (t == null && !Ht(o, C())) return null;
      {
        const l = t || g.EMPTY_NODE;
        return Ce(o, l);
      }
    }
  } else {
    const r = z(n.visibleWrites, e);
    if (!i && qt(r)) return t;
    if (!i && t == null && !Ht(r, C())) return null;
    {
      const o = function (c) {
          return (
            (c.visible || i) &&
            (!s || !~s.indexOf(c.writeId)) &&
            (W(c.path, e) || W(e, c.path))
          );
        },
        l = ti(n.allWrites, o, e),
        a = t || g.EMPTY_NODE;
      return Ce(l, a);
    }
  }
}
function bo(n, e, t) {
  let s = g.EMPTY_NODE;
  const i = ce(n.visibleWrites, e);
  if (i)
    return (
      i.isLeafNode() ||
        i.forEachChild(S, (r, o) => {
          s = s.updateImmediateChild(r, o);
        }),
      s
    );
  if (t) {
    const r = z(n.visibleWrites, e);
    return (
      t.forEachChild(S, (o, l) => {
        const a = Ce(z(r, new w(o)), l);
        s = s.updateImmediateChild(o, a);
      }),
      is(r).forEach((o) => {
        s = s.updateImmediateChild(o.name, o.node);
      }),
      s
    );
  } else {
    const r = z(n.visibleWrites, e);
    return (
      is(r).forEach((o) => {
        s = s.updateImmediateChild(o.name, o.node);
      }),
      s
    );
  }
}
function ko(n, e, t, s, i) {
  f(s || i, 'Either existingEventSnap or existingServerSnap must exist');
  const r = N(e, t);
  if (Ht(n.visibleWrites, r)) return null;
  {
    const o = z(n.visibleWrites, r);
    return qt(o) ? i.getChild(t) : Ce(o, i.getChild(t));
  }
}
function xo(n, e, t, s) {
  const i = N(e, t),
    r = ce(n.visibleWrites, i);
  if (r != null) return r;
  if (s.isCompleteForChild(t)) {
    const o = z(n.visibleWrites, i);
    return Ce(o, s.getNode().getImmediateChild(t));
  } else return null;
}
function Po(n, e) {
  return ce(n.visibleWrites, e);
}
function Ao(n, e, t, s, i, r, o) {
  let l;
  const a = z(n.visibleWrites, e),
    c = ce(a, C());
  if (c != null) l = c;
  else if (t != null) l = Ce(a, t);
  else return [];
  if (((l = l.withIndex(o)), !l.isEmpty() && !l.isLeafNode())) {
    const u = [],
      h = o.getCompare(),
      d = r ? l.getReverseIteratorFrom(s, o) : l.getIteratorFrom(s, o);
    let _ = d.getNext();
    for (; _ && u.length < i; ) h(_, s) !== 0 && u.push(_), (_ = d.getNext());
    return u;
  } else return [];
}
function Mo() {
  return { visibleWrites: G.empty(), allWrites: [], lastWriteId: -1 };
}
function ot(n, e, t, s) {
  return ni(n.writeTree, n.treePath, e, t, s);
}
function fn(n, e) {
  return bo(n.writeTree, n.treePath, e);
}
function rs(n, e, t, s) {
  return ko(n.writeTree, n.treePath, e, t, s);
}
function lt(n, e) {
  return Po(n.writeTree, N(n.treePath, e));
}
function Do(n, e, t, s, i, r) {
  return Ao(n.writeTree, n.treePath, e, t, s, i, r);
}
function _n(n, e, t) {
  return xo(n.writeTree, n.treePath, e, t);
}
function si(n, e) {
  return ii(N(n.treePath, e), n.writeTree);
}
function ii(n, e) {
  return { treePath: n, writeTree: e };
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
 */ class Oo {
  constructor() {
    this.changeMap = new Map();
  }
  trackChildChange(e) {
    const t = e.type,
      s = e.childName;
    f(
      t === 'child_added' || t === 'child_changed' || t === 'child_removed',
      'Only child changes supported for tracking'
    ),
      f(s !== '.priority', 'Only non-priority child changes can be tracked.');
    const i = this.changeMap.get(s);
    if (i) {
      const r = i.type;
      if (t === 'child_added' && r === 'child_removed')
        this.changeMap.set(s, Le(s, e.snapshotNode, i.snapshotNode));
      else if (t === 'child_removed' && r === 'child_added')
        this.changeMap.delete(s);
      else if (t === 'child_removed' && r === 'child_changed')
        this.changeMap.set(s, Oe(s, i.oldSnap));
      else if (t === 'child_changed' && r === 'child_added')
        this.changeMap.set(s, ye(s, e.snapshotNode));
      else if (t === 'child_changed' && r === 'child_changed')
        this.changeMap.set(s, Le(s, e.snapshotNode, i.oldSnap));
      else
        throw Ge(
          'Illegal combination of changes: ' + e + ' occurred after ' + i
        );
    } else this.changeMap.set(s, e);
  }
  getChanges() {
    return Array.from(this.changeMap.values());
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
 */ class Lo {
  getCompleteChild(e) {
    return null;
  }
  getChildAfterChild(e, t, s) {
    return null;
  }
}
const ri = new Lo();
class pn {
  constructor(e, t, s = null) {
    (this.writes_ = e),
      (this.viewCache_ = t),
      (this.optCompleteServerCache_ = s);
  }
  getCompleteChild(e) {
    const t = this.viewCache_.eventCache;
    if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
    {
      const s =
        this.optCompleteServerCache_ != null
          ? new X(this.optCompleteServerCache_, !0, !1)
          : this.viewCache_.serverCache;
      return _n(this.writes_, e, s);
    }
  }
  getChildAfterChild(e, t, s) {
    const i =
        this.optCompleteServerCache_ != null
          ? this.optCompleteServerCache_
          : re(this.viewCache_),
      r = Do(this.writes_, i, t, 1, s, e);
    return r.length === 0 ? null : r[0];
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
 */ function Fo(n) {
  return { filter: n };
}
function Wo(n, e) {
  f(
    e.eventCache.getNode().isIndexed(n.filter.getIndex()),
    'Event snap not indexed'
  ),
    f(
      e.serverCache.getNode().isIndexed(n.filter.getIndex()),
      'Server snap not indexed'
    );
}
function Uo(n, e, t, s, i) {
  const r = new Oo();
  let o, l;
  if (t.type === V.OVERWRITE) {
    const c = t;
    c.source.fromUser
      ? (o = Bt(n, e, c.path, c.snap, s, i, r))
      : (f(c.source.fromServer, 'Unknown source.'),
        (l = c.source.tagged || (e.serverCache.isFiltered() && !v(c.path))),
        (o = at(n, e, c.path, c.snap, s, i, l, r)));
  } else if (t.type === V.MERGE) {
    const c = t;
    c.source.fromUser
      ? (o = Go(n, e, c.path, c.children, s, i, r))
      : (f(c.source.fromServer, 'Unknown source.'),
        (l = c.source.tagged || e.serverCache.isFiltered()),
        (o = Yt(n, e, c.path, c.children, s, i, l, r)));
  } else if (t.type === V.ACK_USER_WRITE) {
    const c = t;
    c.revert
      ? (o = Bo(n, e, c.path, s, i, r))
      : (o = Ho(n, e, c.path, c.affectedTree, s, i, r));
  } else if (t.type === V.LISTEN_COMPLETE) o = qo(n, e, t.path, s, r);
  else throw Ge('Unknown operation type: ' + t.type);
  const a = r.getChanges();
  return Vo(e, o, a), { viewCache: o, changes: a };
}
function Vo(n, e, t) {
  const s = e.eventCache;
  if (s.isFullyInitialized()) {
    const i = s.getNode().isLeafNode() || s.getNode().isEmpty(),
      r = rt(n);
    (t.length > 0 ||
      !n.eventCache.isFullyInitialized() ||
      (i && !s.getNode().equals(r)) ||
      !s.getNode().getPriority().equals(r.getPriority())) &&
      t.push(Xs(rt(e)));
  }
}
function oi(n, e, t, s, i, r) {
  const o = e.eventCache;
  if (lt(s, t) != null) return e;
  {
    let l, a;
    if (v(t))
      if (
        (f(
          e.serverCache.isFullyInitialized(),
          'If change path is empty, we must have complete server data'
        ),
        e.serverCache.isFiltered())
      ) {
        const c = re(e),
          u = c instanceof g ? c : g.EMPTY_NODE,
          h = fn(s, u);
        l = n.filter.updateFullNode(e.eventCache.getNode(), h, r);
      } else {
        const c = ot(s, re(e));
        l = n.filter.updateFullNode(e.eventCache.getNode(), c, r);
      }
    else {
      const c = m(t);
      if (c === '.priority') {
        f($(t) === 1, "Can't have a priority with additional path components");
        const u = o.getNode();
        a = e.serverCache.getNode();
        const h = rs(s, t, u, a);
        h != null ? (l = n.filter.updatePriority(u, h)) : (l = o.getNode());
      } else {
        const u = I(t);
        let h;
        if (o.isCompleteForChild(c)) {
          a = e.serverCache.getNode();
          const d = rs(s, t, o.getNode(), a);
          d != null
            ? (h = o.getNode().getImmediateChild(c).updateChild(u, d))
            : (h = o.getNode().getImmediateChild(c));
        } else h = _n(s, c, e.serverCache);
        h != null
          ? (l = n.filter.updateChild(o.getNode(), c, h, u, i, r))
          : (l = o.getNode());
      }
    }
    return xe(e, l, o.isFullyInitialized() || v(t), n.filter.filtersNodes());
  }
}
function at(n, e, t, s, i, r, o, l) {
  const a = e.serverCache;
  let c;
  const u = o ? n.filter : n.filter.getIndexedFilter();
  if (v(t)) c = u.updateFullNode(a.getNode(), s, null);
  else if (u.filtersNodes() && !a.isFiltered()) {
    const _ = a.getNode().updateChild(t, s);
    c = u.updateFullNode(a.getNode(), _, null);
  } else {
    const _ = m(t);
    if (!a.isCompleteForPath(t) && $(t) > 1) return e;
    const p = I(t),
      P = a.getNode().getImmediateChild(_).updateChild(p, s);
    _ === '.priority'
      ? (c = u.updatePriority(a.getNode(), P))
      : (c = u.updateChild(a.getNode(), _, P, p, ri, null));
  }
  const h = Zs(e, c, a.isFullyInitialized() || v(t), u.filtersNodes()),
    d = new pn(i, h, r);
  return oi(n, h, t, i, d, l);
}
function Bt(n, e, t, s, i, r, o) {
  const l = e.eventCache;
  let a, c;
  const u = new pn(i, e, r);
  if (v(t))
    (c = n.filter.updateFullNode(e.eventCache.getNode(), s, o)),
      (a = xe(e, c, !0, n.filter.filtersNodes()));
  else {
    const h = m(t);
    if (h === '.priority')
      (c = n.filter.updatePriority(e.eventCache.getNode(), s)),
        (a = xe(e, c, l.isFullyInitialized(), l.isFiltered()));
    else {
      const d = I(t),
        _ = l.getNode().getImmediateChild(h);
      let p;
      if (v(d)) p = s;
      else {
        const E = u.getCompleteChild(h);
        E != null
          ? sn(d) === '.priority' && E.getChild(Bs(d)).isEmpty()
            ? (p = E)
            : (p = E.updateChild(d, s))
          : (p = g.EMPTY_NODE);
      }
      if (_.equals(p)) a = e;
      else {
        const E = n.filter.updateChild(l.getNode(), h, p, d, u, o);
        a = xe(e, E, l.isFullyInitialized(), n.filter.filtersNodes());
      }
    }
  }
  return a;
}
function os(n, e) {
  return n.eventCache.isCompleteForChild(e);
}
function Go(n, e, t, s, i, r, o) {
  let l = e;
  return (
    s.foreach((a, c) => {
      const u = N(t, a);
      os(e, m(u)) && (l = Bt(n, l, u, c, i, r, o));
    }),
    s.foreach((a, c) => {
      const u = N(t, a);
      os(e, m(u)) || (l = Bt(n, l, u, c, i, r, o));
    }),
    l
  );
}
function ls(n, e, t) {
  return (
    t.foreach((s, i) => {
      e = e.updateChild(s, i);
    }),
    e
  );
}
function Yt(n, e, t, s, i, r, o, l) {
  if (e.serverCache.getNode().isEmpty() && !e.serverCache.isFullyInitialized())
    return e;
  let a = e,
    c;
  v(t) ? (c = s) : (c = new T(null).setTree(t, s));
  const u = e.serverCache.getNode();
  return (
    c.children.inorderTraversal((h, d) => {
      if (u.hasChild(h)) {
        const _ = e.serverCache.getNode().getImmediateChild(h),
          p = ls(n, _, d);
        a = at(n, a, new w(h), p, i, r, o, l);
      }
    }),
    c.children.inorderTraversal((h, d) => {
      const _ = !e.serverCache.isCompleteForChild(h) && d.value === null;
      if (!u.hasChild(h) && !_) {
        const p = e.serverCache.getNode().getImmediateChild(h),
          E = ls(n, p, d);
        a = at(n, a, new w(h), E, i, r, o, l);
      }
    }),
    a
  );
}
function Ho(n, e, t, s, i, r, o) {
  if (lt(i, t) != null) return e;
  const l = e.serverCache.isFiltered(),
    a = e.serverCache;
  if (s.value != null) {
    if ((v(t) && a.isFullyInitialized()) || a.isCompleteForPath(t))
      return at(n, e, t, a.getNode().getChild(t), i, r, l, o);
    if (v(t)) {
      let c = new T(null);
      return (
        a.getNode().forEachChild(ge, (u, h) => {
          c = c.set(new w(u), h);
        }),
        Yt(n, e, t, c, i, r, l, o)
      );
    } else return e;
  } else {
    let c = new T(null);
    return (
      s.foreach((u, h) => {
        const d = N(t, u);
        a.isCompleteForPath(d) && (c = c.set(u, a.getNode().getChild(d)));
      }),
      Yt(n, e, t, c, i, r, l, o)
    );
  }
}
function qo(n, e, t, s, i) {
  const r = e.serverCache,
    o = Zs(e, r.getNode(), r.isFullyInitialized() || v(t), r.isFiltered());
  return oi(n, o, t, s, ri, i);
}
function Bo(n, e, t, s, i, r) {
  let o;
  if (lt(s, t) != null) return e;
  {
    const l = new pn(s, e, i),
      a = e.eventCache.getNode();
    let c;
    if (v(t) || m(t) === '.priority') {
      let u;
      if (e.serverCache.isFullyInitialized()) u = ot(s, re(e));
      else {
        const h = e.serverCache.getNode();
        f(h instanceof g, 'serverChildren would be complete if leaf node'),
          (u = fn(s, h));
      }
      (u = u), (c = n.filter.updateFullNode(a, u, r));
    } else {
      const u = m(t);
      let h = _n(s, u, e.serverCache);
      h == null &&
        e.serverCache.isCompleteForChild(u) &&
        (h = a.getImmediateChild(u)),
        h != null
          ? (c = n.filter.updateChild(a, u, h, I(t), l, r))
          : e.eventCache.getNode().hasChild(u)
          ? (c = n.filter.updateChild(a, u, g.EMPTY_NODE, I(t), l, r))
          : (c = a),
        c.isEmpty() &&
          e.serverCache.isFullyInitialized() &&
          ((o = ot(s, re(e))),
          o.isLeafNode() && (c = n.filter.updateFullNode(c, o, r)));
    }
    return (
      (o = e.serverCache.isFullyInitialized() || lt(s, C()) != null),
      xe(e, c, o, n.filter.filtersNodes())
    );
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
 */ class Yo {
  constructor(e, t) {
    (this.query_ = e), (this.eventRegistrations_ = []);
    const s = this.query_._queryParams,
      i = new an(s.getIndex()),
      r = ao(s);
    this.processor_ = Fo(r);
    const o = t.serverCache,
      l = t.eventCache,
      a = i.updateFullNode(g.EMPTY_NODE, o.getNode(), null),
      c = r.updateFullNode(g.EMPTY_NODE, l.getNode(), null),
      u = new X(a, o.isFullyInitialized(), i.filtersNodes()),
      h = new X(c, l.isFullyInitialized(), r.filtersNodes());
    (this.viewCache_ = gt(h, u)), (this.eventGenerator_ = new go(this.query_));
  }
  get query() {
    return this.query_;
  }
}
function Qo(n) {
  return n.viewCache_.serverCache.getNode();
}
function Ko(n) {
  return rt(n.viewCache_);
}
function zo(n, e) {
  const t = re(n.viewCache_);
  return t &&
    (n.query._queryParams.loadsAllData() ||
      (!v(e) && !t.getImmediateChild(m(e)).isEmpty()))
    ? t.getChild(e)
    : null;
}
function as(n) {
  return n.eventRegistrations_.length === 0;
}
function jo(n, e) {
  n.eventRegistrations_.push(e);
}
function cs(n, e, t) {
  const s = [];
  if (t) {
    f(e == null, 'A cancel should cancel all event registrations.');
    const i = n.query._path;
    n.eventRegistrations_.forEach((r) => {
      const o = r.createCancelEvent(t, i);
      o && s.push(o);
    });
  }
  if (e) {
    let i = [];
    for (let r = 0; r < n.eventRegistrations_.length; ++r) {
      const o = n.eventRegistrations_[r];
      if (!o.matches(e)) i.push(o);
      else if (e.hasAnyCallback()) {
        i = i.concat(n.eventRegistrations_.slice(r + 1));
        break;
      }
    }
    n.eventRegistrations_ = i;
  } else n.eventRegistrations_ = [];
  return s;
}
function hs(n, e, t, s) {
  e.type === V.MERGE &&
    e.source.queryId !== null &&
    (f(
      re(n.viewCache_),
      'We should always have a full cache before handling merges'
    ),
    f(
      rt(n.viewCache_),
      'Missing event cache, even though we have a server cache'
    ));
  const i = n.viewCache_,
    r = Uo(n.processor_, i, e, t, s);
  return (
    Wo(n.processor_, r.viewCache),
    f(
      r.viewCache.serverCache.isFullyInitialized() ||
        !i.serverCache.isFullyInitialized(),
      'Once a server snap is complete, it should never go back'
    ),
    (n.viewCache_ = r.viewCache),
    li(n, r.changes, r.viewCache.eventCache.getNode(), null)
  );
}
function $o(n, e) {
  const t = n.viewCache_.eventCache,
    s = [];
  return (
    t.getNode().isLeafNode() ||
      t.getNode().forEachChild(S, (r, o) => {
        s.push(ye(r, o));
      }),
    t.isFullyInitialized() && s.push(Xs(t.getNode())),
    li(n, s, t.getNode(), e)
  );
}
function li(n, e, t, s) {
  const i = s ? [s] : n.eventRegistrations_;
  return mo(n.eventGenerator_, e, t, i);
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
 */ let ct;
class ai {
  constructor() {
    this.views = new Map();
  }
}
function Xo(n) {
  f(!ct, '__referenceConstructor has already been defined'), (ct = n);
}
function Jo() {
  return f(ct, 'Reference.ts has not been loaded'), ct;
}
function Zo(n) {
  return n.views.size === 0;
}
function gn(n, e, t, s) {
  const i = e.source.queryId;
  if (i !== null) {
    const r = n.views.get(i);
    return (
      f(r != null, 'SyncTree gave us an op for an invalid query.'),
      hs(r, e, t, s)
    );
  } else {
    let r = [];
    for (const o of n.views.values()) r = r.concat(hs(o, e, t, s));
    return r;
  }
}
function ci(n, e, t, s, i) {
  const r = e._queryIdentifier,
    o = n.views.get(r);
  if (!o) {
    let l = ot(t, i ? s : null),
      a = !1;
    l
      ? (a = !0)
      : s instanceof g
      ? ((l = fn(t, s)), (a = !1))
      : ((l = g.EMPTY_NODE), (a = !1));
    const c = gt(new X(l, a, !1), new X(s, i, !1));
    return new Yo(e, c);
  }
  return o;
}
function el(n, e, t, s, i, r) {
  const o = ci(n, e, s, i, r);
  return (
    n.views.has(e._queryIdentifier) || n.views.set(e._queryIdentifier, o),
    jo(o, t),
    $o(o, t)
  );
}
function tl(n, e, t, s) {
  const i = e._queryIdentifier,
    r = [];
  let o = [];
  const l = J(n);
  if (i === 'default')
    for (const [a, c] of n.views.entries())
      (o = o.concat(cs(c, t, s))),
        as(c) &&
          (n.views.delete(a),
          c.query._queryParams.loadsAllData() || r.push(c.query));
  else {
    const a = n.views.get(i);
    a &&
      ((o = o.concat(cs(a, t, s))),
      as(a) &&
        (n.views.delete(i),
        a.query._queryParams.loadsAllData() || r.push(a.query)));
  }
  return (
    l && !J(n) && r.push(new (Jo())(e._repo, e._path)),
    { removed: r, events: o }
  );
}
function hi(n) {
  const e = [];
  for (const t of n.views.values())
    t.query._queryParams.loadsAllData() || e.push(t);
  return e;
}
function j(n, e) {
  let t = null;
  for (const s of n.views.values()) t = t || zo(s, e);
  return t;
}
function ui(n, e) {
  if (e._queryParams.loadsAllData()) return yt(n);
  {
    const s = e._queryIdentifier;
    return n.views.get(s);
  }
}
function di(n, e) {
  return ui(n, e) != null;
}
function J(n) {
  return yt(n) != null;
}
function yt(n) {
  for (const e of n.views.values())
    if (e.query._queryParams.loadsAllData()) return e;
  return null;
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
 */ let ht;
function nl(n) {
  f(!ht, '__referenceConstructor has already been defined'), (ht = n);
}
function sl() {
  return f(ht, 'Reference.ts has not been loaded'), ht;
}
let il = 1;
class us {
  constructor(e) {
    (this.listenProvider_ = e),
      (this.syncPointTree_ = new T(null)),
      (this.pendingWriteTree_ = Mo()),
      (this.tagToQueryMap = new Map()),
      (this.queryToTagMap = new Map());
  }
}
function mn(n, e, t, s, i) {
  return (
    Eo(n.pendingWriteTree_, e, t, s, i), i ? Te(n, new ie(hn(), e, t)) : []
  );
}
function rl(n, e, t, s) {
  wo(n.pendingWriteTree_, e, t, s);
  const i = T.fromObject(t);
  return Te(n, new ve(hn(), e, i));
}
function K(n, e, t = !1) {
  const s = To(n.pendingWriteTree_, e);
  if (Io(n.pendingWriteTree_, e)) {
    let r = new T(null);
    return (
      s.snap != null
        ? (r = r.set(C(), !0))
        : M(s.children, (o) => {
            r = r.set(new w(o), !0);
          }),
      Te(n, new it(s.path, r, t))
    );
  } else return [];
}
function Ye(n, e, t) {
  return Te(n, new ie(un(), e, t));
}
function ol(n, e, t) {
  const s = T.fromObject(t);
  return Te(n, new ve(un(), e, s));
}
function ll(n, e) {
  return Te(n, new We(un(), e));
}
function al(n, e, t) {
  const s = yn(n, t);
  if (s) {
    const i = vn(s),
      r = i.path,
      o = i.queryId,
      l = D(r, e),
      a = new We(dn(o), l);
    return Cn(n, r, a);
  } else return [];
}
function ut(n, e, t, s, i = !1) {
  const r = e._path,
    o = n.syncPointTree_.get(r);
  let l = [];
  if (o && (e._queryIdentifier === 'default' || di(o, e))) {
    const a = tl(o, e, t, s);
    Zo(o) && (n.syncPointTree_ = n.syncPointTree_.remove(r));
    const c = a.removed;
    if (((l = a.events), !i)) {
      const u = c.findIndex((d) => d._queryParams.loadsAllData()) !== -1,
        h = n.syncPointTree_.findOnPath(r, (d, _) => J(_));
      if (u && !h) {
        const d = n.syncPointTree_.subtree(r);
        if (!d.isEmpty()) {
          const _ = ul(d);
          for (let p = 0; p < _.length; ++p) {
            const E = _[p],
              P = E.query,
              ue = gi(n, E);
            n.listenProvider_.startListening(
              Ae(P),
              Ue(n, P),
              ue.hashFn,
              ue.onComplete
            );
          }
        }
      }
      !h &&
        c.length > 0 &&
        !s &&
        (u
          ? n.listenProvider_.stopListening(Ae(e), null)
          : c.forEach((d) => {
              const _ = n.queryToTagMap.get(Ct(d));
              n.listenProvider_.stopListening(Ae(d), _);
            }));
    }
    dl(n, c);
  }
  return l;
}
function fi(n, e, t, s) {
  const i = yn(n, s);
  if (i != null) {
    const r = vn(i),
      o = r.path,
      l = r.queryId,
      a = D(o, e),
      c = new ie(dn(l), a, t);
    return Cn(n, o, c);
  } else return [];
}
function cl(n, e, t, s) {
  const i = yn(n, s);
  if (i) {
    const r = vn(i),
      o = r.path,
      l = r.queryId,
      a = D(o, e),
      c = T.fromObject(t),
      u = new ve(dn(l), a, c);
    return Cn(n, o, u);
  } else return [];
}
function Qt(n, e, t, s = !1) {
  const i = e._path;
  let r = null,
    o = !1;
  n.syncPointTree_.foreachOnPath(i, (d, _) => {
    const p = D(d, i);
    (r = r || j(_, p)), (o = o || J(_));
  });
  let l = n.syncPointTree_.get(i);
  l
    ? ((o = o || J(l)), (r = r || j(l, C())))
    : ((l = new ai()), (n.syncPointTree_ = n.syncPointTree_.set(i, l)));
  let a;
  r != null
    ? (a = !0)
    : ((a = !1),
      (r = g.EMPTY_NODE),
      n.syncPointTree_.subtree(i).foreachChild((_, p) => {
        const E = j(p, C());
        E && (r = r.updateImmediateChild(_, E));
      }));
  const c = di(l, e);
  if (!c && !e._queryParams.loadsAllData()) {
    const d = Ct(e);
    f(!n.queryToTagMap.has(d), 'View does not exist, but we have a tag');
    const _ = fl();
    n.queryToTagMap.set(d, _), n.tagToQueryMap.set(_, d);
  }
  const u = mt(n.pendingWriteTree_, i);
  let h = el(l, e, t, u, r, a);
  if (!c && !o && !s) {
    const d = ui(l, e);
    h = h.concat(_l(n, e, d));
  }
  return h;
}
function vt(n, e, t) {
  const i = n.pendingWriteTree_,
    r = n.syncPointTree_.findOnPath(e, (o, l) => {
      const a = D(o, e),
        c = j(l, a);
      if (c) return c;
    });
  return ni(i, e, r, t, !0);
}
function hl(n, e) {
  const t = e._path;
  let s = null;
  n.syncPointTree_.foreachOnPath(t, (c, u) => {
    const h = D(c, t);
    s = s || j(u, h);
  });
  let i = n.syncPointTree_.get(t);
  i
    ? (s = s || j(i, C()))
    : ((i = new ai()), (n.syncPointTree_ = n.syncPointTree_.set(t, i)));
  const r = s != null,
    o = r ? new X(s, !0, !1) : null,
    l = mt(n.pendingWriteTree_, e._path),
    a = ci(i, e, l, r ? o.getNode() : g.EMPTY_NODE, r);
  return Ko(a);
}
function Te(n, e) {
  return _i(e, n.syncPointTree_, null, mt(n.pendingWriteTree_, C()));
}
function _i(n, e, t, s) {
  if (v(n.path)) return pi(n, e, t, s);
  {
    const i = e.get(C());
    t == null && i != null && (t = j(i, C()));
    let r = [];
    const o = m(n.path),
      l = n.operationForChild(o),
      a = e.children.get(o);
    if (a && l) {
      const c = t ? t.getImmediateChild(o) : null,
        u = si(s, o);
      r = r.concat(_i(l, a, c, u));
    }
    return i && (r = r.concat(gn(i, n, s, t))), r;
  }
}
function pi(n, e, t, s) {
  const i = e.get(C());
  t == null && i != null && (t = j(i, C()));
  let r = [];
  return (
    e.children.inorderTraversal((o, l) => {
      const a = t ? t.getImmediateChild(o) : null,
        c = si(s, o),
        u = n.operationForChild(o);
      u && (r = r.concat(pi(u, l, a, c)));
    }),
    i && (r = r.concat(gn(i, n, s, t))),
    r
  );
}
function gi(n, e) {
  const t = e.query,
    s = Ue(n, t);
  return {
    hashFn: () => (Qo(e) || g.EMPTY_NODE).hash(),
    onComplete: (i) => {
      if (i === 'ok') return s ? al(n, t._path, s) : ll(n, t._path);
      {
        const r = or(i, t);
        return ut(n, t, null, r);
      }
    },
  };
}
function Ue(n, e) {
  const t = Ct(e);
  return n.queryToTagMap.get(t);
}
function Ct(n) {
  return n._path.toString() + '$' + n._queryIdentifier;
}
function yn(n, e) {
  return n.tagToQueryMap.get(e);
}
function vn(n) {
  const e = n.indexOf('$');
  return (
    f(e !== -1 && e < n.length - 1, 'Bad queryKey.'),
    { queryId: n.substr(e + 1), path: new w(n.substr(0, e)) }
  );
}
function Cn(n, e, t) {
  const s = n.syncPointTree_.get(e);
  f(s, "Missing sync point for query tag that we're tracking");
  const i = mt(n.pendingWriteTree_, e);
  return gn(s, t, i, null);
}
function ul(n) {
  return n.fold((e, t, s) => {
    if (t && J(t)) return [yt(t)];
    {
      let i = [];
      return (
        t && (i = hi(t)),
        M(s, (r, o) => {
          i = i.concat(o);
        }),
        i
      );
    }
  });
}
function Ae(n) {
  return n._queryParams.loadsAllData() && !n._queryParams.isDefault()
    ? new (sl())(n._repo, n._path)
    : n;
}
function dl(n, e) {
  for (let t = 0; t < e.length; ++t) {
    const s = e[t];
    if (!s._queryParams.loadsAllData()) {
      const i = Ct(s),
        r = n.queryToTagMap.get(i);
      n.queryToTagMap.delete(i), n.tagToQueryMap.delete(r);
    }
  }
}
function fl() {
  return il++;
}
function _l(n, e, t) {
  const s = e._path,
    i = Ue(n, e),
    r = gi(n, t),
    o = n.listenProvider_.startListening(Ae(e), i, r.hashFn, r.onComplete),
    l = n.syncPointTree_.subtree(s);
  if (i) f(!J(l.value), "If we're adding a query, it shouldn't be shadowed");
  else {
    const a = l.fold((c, u, h) => {
      if (!v(c) && u && J(u)) return [yt(u).query];
      {
        let d = [];
        return (
          u && (d = d.concat(hi(u).map((_) => _.query))),
          M(h, (_, p) => {
            d = d.concat(p);
          }),
          d
        );
      }
    });
    for (let c = 0; c < a.length; ++c) {
      const u = a[c];
      n.listenProvider_.stopListening(Ae(u), Ue(n, u));
    }
  }
  return o;
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
 */ class En {
  constructor(e) {
    this.node_ = e;
  }
  getImmediateChild(e) {
    const t = this.node_.getImmediateChild(e);
    return new En(t);
  }
  node() {
    return this.node_;
  }
}
class wn {
  constructor(e, t) {
    (this.syncTree_ = e), (this.path_ = t);
  }
  getImmediateChild(e) {
    const t = N(this.path_, e);
    return new wn(this.syncTree_, t);
  }
  node() {
    return vt(this.syncTree_, this.path_);
  }
}
const pl = function (n) {
    return (
      (n = n || {}), (n.timestamp = n.timestamp || new Date().getTime()), n
    );
  },
  ds = function (n, e, t) {
    if (!n || typeof n != 'object') return n;
    if (
      (f('.sv' in n, 'Unexpected leaf node or priority contents'),
      typeof n['.sv'] == 'string')
    )
      return gl(n['.sv'], e, t);
    if (typeof n['.sv'] == 'object') return ml(n['.sv'], e);
    f(!1, 'Unexpected server value: ' + JSON.stringify(n, null, 2));
  },
  gl = function (n, e, t) {
    switch (n) {
      case 'timestamp':
        return t.timestamp;
      default:
        f(!1, 'Unexpected server value: ' + n);
    }
  },
  ml = function (n, e, t) {
    n.hasOwnProperty('increment') ||
      f(!1, 'Unexpected server value: ' + JSON.stringify(n, null, 2));
    const s = n.increment;
    typeof s != 'number' && f(!1, 'Unexpected increment value: ' + s);
    const i = e.node();
    if (
      (f(
        i !== null && typeof i < 'u',
        'Expected ChildrenNode.EMPTY_NODE for nulls'
      ),
      !i.isLeafNode())
    )
      return s;
    const o = i.getValue();
    return typeof o != 'number' ? s : o + s;
  },
  mi = function (n, e, t, s) {
    return In(e, new wn(t, n), s);
  },
  Tn = function (n, e, t) {
    return In(n, new En(e), t);
  };
function In(n, e, t) {
  const s = n.getPriority().val(),
    i = ds(s, e.getImmediateChild('.priority'), t);
  let r;
  if (n.isLeafNode()) {
    const o = n,
      l = ds(o.getValue(), e, t);
    return l !== o.getValue() || i !== o.getPriority().val()
      ? new k(l, R(i))
      : n;
  } else {
    const o = n;
    return (
      (r = o),
      i !== o.getPriority().val() && (r = r.updatePriority(new k(i))),
      o.forEachChild(S, (l, a) => {
        const c = In(a, e.getImmediateChild(l), t);
        c !== a && (r = r.updateImmediateChild(l, c));
      }),
      r
    );
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
 */ class Sn {
  constructor(e = '', t = null, s = { children: {}, childCount: 0 }) {
    (this.name = e), (this.parent = t), (this.node = s);
  }
}
function Et(n, e) {
  let t = e instanceof w ? e : new w(e),
    s = n,
    i = m(t);
  for (; i !== null; ) {
    const r = ne(s.node.children, i) || { children: {}, childCount: 0 };
    (s = new Sn(i, s, r)), (t = I(t)), (i = m(t));
  }
  return s;
}
function he(n) {
  return n.node.value;
}
function Nn(n, e) {
  (n.node.value = e), Kt(n);
}
function yi(n) {
  return n.node.childCount > 0;
}
function yl(n) {
  return he(n) === void 0 && !yi(n);
}
function wt(n, e) {
  M(n.node.children, (t, s) => {
    e(new Sn(t, n, s));
  });
}
function vi(n, e, t, s) {
  t && !s && e(n),
    wt(n, (i) => {
      vi(i, e, !0, s);
    }),
    t && s && e(n);
}
function vl(n, e, t) {
  let s = t ? n : n.parent;
  for (; s !== null; ) {
    if (e(s)) return !0;
    s = s.parent;
  }
  return !1;
}
function Qe(n) {
  return new w(n.parent === null ? n.name : Qe(n.parent) + '/' + n.name);
}
function Kt(n) {
  n.parent !== null && Cl(n.parent, n.name, n);
}
function Cl(n, e, t) {
  const s = yl(t),
    i = H(n.node.children, e);
  s && i
    ? (delete n.node.children[e], n.node.childCount--, Kt(n))
    : !s && !i && ((n.node.children[e] = t.node), n.node.childCount++, Kt(n));
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
 */ const El = /[\[\].#$\/\u0000-\u001F\u007F]/,
  wl = /[\[\].#$\u0000-\u001F\u007F]/,
  Dt = 10 * 1024 * 1024,
  Rn = function (n) {
    return typeof n == 'string' && n.length !== 0 && !El.test(n);
  },
  Ci = function (n) {
    return typeof n == 'string' && n.length !== 0 && !wl.test(n);
  },
  Tl = function (n) {
    return n && (n = n.replace(/^\/*\.info(\/|$)/, '/')), Ci(n);
  },
  Ei = function (n) {
    return (
      n === null ||
      typeof n == 'string' ||
      (typeof n == 'number' && !Jt(n)) ||
      (n && typeof n == 'object' && H(n, '.sv'))
    );
  },
  Il = function (n, e, t, s) {
    (s && e === void 0) || Ke(_t(n, 'value'), e, t);
  },
  Ke = function (n, e, t) {
    const s = t instanceof w ? new Vr(t, n) : t;
    if (e === void 0) throw new Error(n + 'contains undefined ' + Z(s));
    if (typeof e == 'function')
      throw new Error(
        n + 'contains a function ' + Z(s) + ' with contents = ' + e.toString()
      );
    if (Jt(e)) throw new Error(n + 'contains ' + e.toString() + ' ' + Z(s));
    if (typeof e == 'string' && e.length > Dt / 3 && ft(e) > Dt)
      throw new Error(
        n +
          'contains a string greater than ' +
          Dt +
          ' utf8 bytes ' +
          Z(s) +
          " ('" +
          e.substring(0, 50) +
          "...')"
      );
    if (e && typeof e == 'object') {
      let i = !1,
        r = !1;
      if (
        (M(e, (o, l) => {
          if (o === '.value') i = !0;
          else if (o !== '.priority' && o !== '.sv' && ((r = !0), !Rn(o)))
            throw new Error(
              n +
                ' contains an invalid key (' +
                o +
                ') ' +
                Z(s) +
                `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`
            );
          Gr(s, o), Ke(n, l, s), Hr(s);
        }),
        i && r)
      )
        throw new Error(
          n +
            ' contains ".value" child ' +
            Z(s) +
            ' in addition to actual children.'
        );
    }
  },
  Sl = function (n, e) {
    let t, s;
    for (t = 0; t < e.length; t++) {
      s = e[t];
      const r = De(s);
      for (let o = 0; o < r.length; o++)
        if (!(r[o] === '.priority' && o === r.length - 1)) {
          if (!Rn(r[o]))
            throw new Error(
              n +
                'contains an invalid key (' +
                r[o] +
                ') in path ' +
                s.toString() +
                `. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`
            );
        }
    }
    e.sort(Ur);
    let i = null;
    for (t = 0; t < e.length; t++) {
      if (((s = e[t]), i !== null && W(i, s)))
        throw new Error(
          n +
            'contains a path ' +
            i.toString() +
            ' that is ancestor of another path ' +
            s.toString()
        );
      i = s;
    }
  },
  Nl = function (n, e, t, s) {
    if (s && e === void 0) return;
    const i = _t(n, 'values');
    if (!(e && typeof e == 'object') || Array.isArray(e))
      throw new Error(
        i + ' must be an object containing the children to replace.'
      );
    const r = [];
    M(e, (o, l) => {
      const a = new w(o);
      if ((Ke(i, l, N(t, a)), sn(a) === '.priority' && !Ei(l)))
        throw new Error(
          i +
            "contains an invalid value for '" +
            a.toString() +
            "', which must be a valid Firebase priority (a string, finite number, server value, or null)."
        );
      r.push(a);
    }),
      Sl(i, r);
  },
  wi = function (n, e, t, s) {
    if (!(s && t === void 0) && !Ci(t))
      throw new Error(
        _t(n, e) +
          'was an invalid path = "' +
          t +
          `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
      );
  },
  Rl = function (n, e, t, s) {
    t && (t = t.replace(/^\/*\.info(\/|$)/, '/')), wi(n, e, t, s);
  },
  Ti = function (n, e) {
    if (m(e) === '.info')
      throw new Error(n + " failed = Can't modify data under /.info/");
  },
  bl = function (n, e) {
    const t = e.path.toString();
    if (
      typeof e.repoInfo.host != 'string' ||
      e.repoInfo.host.length === 0 ||
      (!Rn(e.repoInfo.namespace) &&
        e.repoInfo.host.split(':')[0] !== 'localhost') ||
      (t.length !== 0 && !Tl(t))
    )
      throw new Error(
        _t(n, 'url') +
          `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`
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
 */ class kl {
  constructor() {
    (this.eventLists_ = []), (this.recursionDepth_ = 0);
  }
}
function Tt(n, e) {
  let t = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s],
      r = i.getPath();
    t !== null && !rn(r, t.path) && (n.eventLists_.push(t), (t = null)),
      t === null && (t = { events: [], path: r }),
      t.events.push(i);
  }
  t && n.eventLists_.push(t);
}
function Ii(n, e, t) {
  Tt(n, t), Si(n, (s) => rn(s, e));
}
function F(n, e, t) {
  Tt(n, t), Si(n, (s) => W(s, e) || W(e, s));
}
function Si(n, e) {
  n.recursionDepth_++;
  let t = !0;
  for (let s = 0; s < n.eventLists_.length; s++) {
    const i = n.eventLists_[s];
    if (i) {
      const r = i.path;
      e(r) ? (xl(n.eventLists_[s]), (n.eventLists_[s] = null)) : (t = !1);
    }
  }
  t && (n.eventLists_ = []), n.recursionDepth_--;
}
function xl(n) {
  for (let e = 0; e < n.events.length; e++) {
    const t = n.events[e];
    if (t !== null) {
      n.events[e] = null;
      const s = t.getEventRunner();
      te && A('event: ' + t.toString()), we(s);
    }
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
 */ const Pl = 'repo_interrupt',
  Al = 25;
class Ml {
  constructor(e, t, s, i) {
    (this.repoInfo_ = e),
      (this.forceRestClient_ = t),
      (this.authTokenProvider_ = s),
      (this.appCheckProvider_ = i),
      (this.dataUpdateCount = 0),
      (this.statsListener_ = null),
      (this.eventQueue_ = new kl()),
      (this.nextWriteId_ = 1),
      (this.interceptServerDataCallback_ = null),
      (this.onDisconnect_ = st()),
      (this.transactionQueueTree_ = new Sn()),
      (this.persistentConnection_ = null),
      (this.key = this.repoInfo_.toURLString());
  }
  toString() {
    return (
      (this.repoInfo_.secure ? 'https://' : 'http://') + this.repoInfo_.host
    );
  }
}
function Dl(n, e, t) {
  if (((n.stats_ = tn(n.repoInfo_)), n.forceRestClient_ || hr()))
    (n.server_ = new nt(
      n.repoInfo_,
      (s, i, r, o) => {
        fs(n, s, i, r, o);
      },
      n.authTokenProvider_,
      n.appCheckProvider_
    )),
      setTimeout(() => _s(n, !0), 0);
  else {
    if (typeof t < 'u' && t !== null) {
      if (typeof t != 'object')
        throw new Error(
          'Only objects are supported for option databaseAuthVariableOverride'
        );
      try {
        b(t);
      } catch (s) {
        throw new Error('Invalid authOverride provided: ' + s);
      }
    }
    (n.persistentConnection_ = new Y(
      n.repoInfo_,
      e,
      (s, i, r, o) => {
        fs(n, s, i, r, o);
      },
      (s) => {
        _s(n, s);
      },
      (s) => {
        Ll(n, s);
      },
      n.authTokenProvider_,
      n.appCheckProvider_,
      t
    )),
      (n.server_ = n.persistentConnection_);
  }
  n.authTokenProvider_.addTokenChangeListener((s) => {
    n.server_.refreshAuthToken(s);
  }),
    n.appCheckProvider_.addTokenChangeListener((s) => {
      n.server_.refreshAppCheckToken(s.token);
    }),
    (n.statsReporter_ = pr(n.repoInfo_, () => new po(n.stats_, n.server_))),
    (n.infoData_ = new co()),
    (n.infoSyncTree_ = new us({
      startListening: (s, i, r, o) => {
        let l = [];
        const a = n.infoData_.getNode(s._path);
        return (
          a.isEmpty() ||
            ((l = Ye(n.infoSyncTree_, s._path, a)),
            setTimeout(() => {
              o('ok');
            }, 0)),
          l
        );
      },
      stopListening: () => {},
    })),
    bn(n, 'connected', !1),
    (n.serverSyncTree_ = new us({
      startListening: (s, i, r, o) => (
        n.server_.listen(s, r, i, (l, a) => {
          const c = o(l, a);
          F(n.eventQueue_, s._path, c);
        }),
        []
      ),
      stopListening: (s, i) => {
        n.server_.unlisten(s, i);
      },
    }));
}
function Ol(n) {
  const t = n.infoData_.getNode(new w('.info/serverTimeOffset')).val() || 0;
  return new Date().getTime() + t;
}
function ze(n) {
  return pl({ timestamp: Ol(n) });
}
function fs(n, e, t, s, i) {
  n.dataUpdateCount++;
  const r = new w(e);
  t = n.interceptServerDataCallback_ ? n.interceptServerDataCallback_(e, t) : t;
  let o = [];
  if (i)
    if (s) {
      const a = Je(t, (c) => R(c));
      o = cl(n.serverSyncTree_, r, a, i);
    } else {
      const a = R(t);
      o = fi(n.serverSyncTree_, r, a, i);
    }
  else if (s) {
    const a = Je(t, (c) => R(c));
    o = ol(n.serverSyncTree_, r, a);
  } else {
    const a = R(t);
    o = Ye(n.serverSyncTree_, r, a);
  }
  let l = r;
  o.length > 0 && (l = Ee(n, r)), F(n.eventQueue_, l, o);
}
function _s(n, e) {
  bn(n, 'connected', e), e === !1 && Vl(n);
}
function Ll(n, e) {
  M(e, (t, s) => {
    bn(n, t, s);
  });
}
function bn(n, e, t) {
  const s = new w('/.info/' + e),
    i = R(t);
  n.infoData_.updateSnapshot(s, i);
  const r = Ye(n.infoSyncTree_, s, i);
  F(n.eventQueue_, s, r);
}
function It(n) {
  return n.nextWriteId_++;
}
function Fl(n, e, t) {
  const s = hl(n.serverSyncTree_, e);
  return s != null
    ? Promise.resolve(s)
    : n.server_.get(e).then(
        (i) => {
          const r = R(i).withIndex(e._queryParams.getIndex());
          Qt(n.serverSyncTree_, e, t, !0);
          let o;
          if (e._queryParams.loadsAllData())
            o = Ye(n.serverSyncTree_, e._path, r);
          else {
            const l = Ue(n.serverSyncTree_, e);
            o = fi(n.serverSyncTree_, e._path, r, l);
          }
          return (
            F(n.eventQueue_, e._path, o),
            ut(n.serverSyncTree_, e, t, null, !0),
            r
          );
        },
        (i) => (
          Ie(n, 'get for query ' + b(e) + ' failed: ' + i),
          Promise.reject(new Error(i))
        )
      );
}
function Wl(n, e, t, s, i) {
  Ie(n, 'set', { path: e.toString(), value: t, priority: s });
  const r = ze(n),
    o = R(t, s),
    l = vt(n.serverSyncTree_, e),
    a = Tn(o, l, r),
    c = It(n),
    u = mn(n.serverSyncTree_, e, a, c, !0);
  Tt(n.eventQueue_, u),
    n.server_.put(e.toString(), o.val(!0), (d, _) => {
      const p = d === 'ok';
      p || O('set at ' + e + ' failed: ' + d);
      const E = K(n.serverSyncTree_, c, !p);
      F(n.eventQueue_, e, E), zt(n, i, d, _);
    });
  const h = xn(n, e);
  Ee(n, h), F(n.eventQueue_, h, []);
}
function Ul(n, e, t, s) {
  Ie(n, 'update', { path: e.toString(), value: t });
  let i = !0;
  const r = ze(n),
    o = {};
  if (
    (M(t, (l, a) => {
      (i = !1), (o[l] = mi(N(e, l), R(a), n.serverSyncTree_, r));
    }),
    i)
  )
    A("update() called with empty data.  Don't do anything."),
      zt(n, s, 'ok', void 0);
  else {
    const l = It(n),
      a = rl(n.serverSyncTree_, e, o, l);
    Tt(n.eventQueue_, a),
      n.server_.merge(e.toString(), t, (c, u) => {
        const h = c === 'ok';
        h || O('update at ' + e + ' failed: ' + c);
        const d = K(n.serverSyncTree_, l, !h),
          _ = d.length > 0 ? Ee(n, e) : e;
        F(n.eventQueue_, _, d), zt(n, s, c, u);
      }),
      M(t, (c) => {
        const u = xn(n, N(e, c));
        Ee(n, u);
      }),
      F(n.eventQueue_, e, []);
  }
}
function Vl(n) {
  Ie(n, 'onDisconnectEvents');
  const e = ze(n),
    t = st();
  Vt(n.onDisconnect_, C(), (i, r) => {
    const o = mi(i, r, n.serverSyncTree_, e);
    Js(t, i, o);
  });
  let s = [];
  Vt(t, C(), (i, r) => {
    s = s.concat(Ye(n.serverSyncTree_, i, r));
    const o = xn(n, i);
    Ee(n, o);
  }),
    (n.onDisconnect_ = st()),
    F(n.eventQueue_, C(), s);
}
function Gl(n, e, t) {
  let s;
  m(e._path) === '.info'
    ? (s = Qt(n.infoSyncTree_, e, t))
    : (s = Qt(n.serverSyncTree_, e, t)),
    Ii(n.eventQueue_, e._path, s);
}
function ps(n, e, t) {
  let s;
  m(e._path) === '.info'
    ? (s = ut(n.infoSyncTree_, e, t))
    : (s = ut(n.serverSyncTree_, e, t)),
    Ii(n.eventQueue_, e._path, s);
}
function Hl(n) {
  n.persistentConnection_ && n.persistentConnection_.interrupt(Pl);
}
function Ie(n, ...e) {
  let t = '';
  n.persistentConnection_ && (t = n.persistentConnection_.id + ':'), A(t, ...e);
}
function zt(n, e, t, s) {
  e &&
    we(() => {
      if (t === 'ok') e(null);
      else {
        const i = (t || 'error').toUpperCase();
        let r = i;
        s && (r += ': ' + s);
        const o = new Error(r);
        (o.code = i), e(o);
      }
    });
}
function ql(n, e, t, s, i, r) {
  Ie(n, 'transaction on ' + e);
  const o = {
      path: e,
      update: t,
      onComplete: s,
      status: null,
      order: ws(),
      applyLocally: r,
      retryCount: 0,
      unwatcher: i,
      abortReason: null,
      currentWriteId: null,
      currentInputSnapshot: null,
      currentOutputSnapshotRaw: null,
      currentOutputSnapshotResolved: null,
    },
    l = kn(n, e, void 0);
  o.currentInputSnapshot = l;
  const a = o.update(l.val());
  if (a === void 0)
    o.unwatcher(),
      (o.currentOutputSnapshotRaw = null),
      (o.currentOutputSnapshotResolved = null),
      o.onComplete && o.onComplete(null, !1, o.currentInputSnapshot);
  else {
    Ke('transaction failed: Data returned ', a, o.path), (o.status = 0);
    const c = Et(n.transactionQueueTree_, e),
      u = he(c) || [];
    u.push(o), Nn(c, u);
    let h;
    typeof a == 'object' && a !== null && H(a, '.priority')
      ? ((h = ne(a, '.priority')),
        f(
          Ei(h),
          'Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.'
        ))
      : (h = (vt(n.serverSyncTree_, e) || g.EMPTY_NODE).getPriority().val());
    const d = ze(n),
      _ = R(a, h),
      p = Tn(_, l, d);
    (o.currentOutputSnapshotRaw = _),
      (o.currentOutputSnapshotResolved = p),
      (o.currentWriteId = It(n));
    const E = mn(n.serverSyncTree_, e, p, o.currentWriteId, o.applyLocally);
    F(n.eventQueue_, e, E), St(n, n.transactionQueueTree_);
  }
}
function kn(n, e, t) {
  return vt(n.serverSyncTree_, e, t) || g.EMPTY_NODE;
}
function St(n, e = n.transactionQueueTree_) {
  if ((e || Nt(n, e), he(e))) {
    const t = Ri(n, e);
    f(t.length > 0, 'Sending zero length transaction queue'),
      t.every((i) => i.status === 0) && Bl(n, Qe(e), t);
  } else
    yi(e) &&
      wt(e, (t) => {
        St(n, t);
      });
}
function Bl(n, e, t) {
  const s = t.map((c) => c.currentWriteId),
    i = kn(n, e, s);
  let r = i;
  const o = i.hash();
  for (let c = 0; c < t.length; c++) {
    const u = t[c];
    f(
      u.status === 0,
      'tryToSendTransactionQueue_: items in queue should all be run.'
    ),
      (u.status = 1),
      u.retryCount++;
    const h = D(e, u.path);
    r = r.updateChild(h, u.currentOutputSnapshotRaw);
  }
  const l = r.val(!0),
    a = e;
  n.server_.put(
    a.toString(),
    l,
    (c) => {
      Ie(n, 'transaction put response', { path: a.toString(), status: c });
      let u = [];
      if (c === 'ok') {
        const h = [];
        for (let d = 0; d < t.length; d++)
          (t[d].status = 2),
            (u = u.concat(K(n.serverSyncTree_, t[d].currentWriteId))),
            t[d].onComplete &&
              h.push(() =>
                t[d].onComplete(null, !0, t[d].currentOutputSnapshotResolved)
              ),
            t[d].unwatcher();
        Nt(n, Et(n.transactionQueueTree_, e)),
          St(n, n.transactionQueueTree_),
          F(n.eventQueue_, e, u);
        for (let d = 0; d < h.length; d++) we(h[d]);
      } else {
        if (c === 'datastale')
          for (let h = 0; h < t.length; h++)
            t[h].status === 3 ? (t[h].status = 4) : (t[h].status = 0);
        else {
          O('transaction at ' + a.toString() + ' failed: ' + c);
          for (let h = 0; h < t.length; h++)
            (t[h].status = 4), (t[h].abortReason = c);
        }
        Ee(n, e);
      }
    },
    o
  );
}
function Ee(n, e) {
  const t = Ni(n, e),
    s = Qe(t),
    i = Ri(n, t);
  return Yl(n, i, s), s;
}
function Yl(n, e, t) {
  if (e.length === 0) return;
  const s = [];
  let i = [];
  const o = e.filter((l) => l.status === 0).map((l) => l.currentWriteId);
  for (let l = 0; l < e.length; l++) {
    const a = e[l],
      c = D(t, a.path);
    let u = !1,
      h;
    if (
      (f(
        c !== null,
        'rerunTransactionsUnderNode_: relativePath should not be null.'
      ),
      a.status === 4)
    )
      (u = !0),
        (h = a.abortReason),
        (i = i.concat(K(n.serverSyncTree_, a.currentWriteId, !0)));
    else if (a.status === 0)
      if (a.retryCount >= Al)
        (u = !0),
          (h = 'maxretry'),
          (i = i.concat(K(n.serverSyncTree_, a.currentWriteId, !0)));
      else {
        const d = kn(n, a.path, o);
        a.currentInputSnapshot = d;
        const _ = e[l].update(d.val());
        if (_ !== void 0) {
          Ke('transaction failed: Data returned ', _, a.path);
          let p = R(_);
          (typeof _ == 'object' && _ != null && H(_, '.priority')) ||
            (p = p.updatePriority(d.getPriority()));
          const P = a.currentWriteId,
            ue = ze(n),
            je = Tn(p, d, ue);
          (a.currentOutputSnapshotRaw = p),
            (a.currentOutputSnapshotResolved = je),
            (a.currentWriteId = It(n)),
            o.splice(o.indexOf(P), 1),
            (i = i.concat(
              mn(
                n.serverSyncTree_,
                a.path,
                je,
                a.currentWriteId,
                a.applyLocally
              )
            )),
            (i = i.concat(K(n.serverSyncTree_, P, !0)));
        } else
          (u = !0),
            (h = 'nodata'),
            (i = i.concat(K(n.serverSyncTree_, a.currentWriteId, !0)));
      }
    F(n.eventQueue_, t, i),
      (i = []),
      u &&
        ((e[l].status = 2),
        (function (d) {
          setTimeout(d, Math.floor(0));
        })(e[l].unwatcher),
        e[l].onComplete &&
          (h === 'nodata'
            ? s.push(() => e[l].onComplete(null, !1, e[l].currentInputSnapshot))
            : s.push(() => e[l].onComplete(new Error(h), !1, null))));
  }
  Nt(n, n.transactionQueueTree_);
  for (let l = 0; l < s.length; l++) we(s[l]);
  St(n, n.transactionQueueTree_);
}
function Ni(n, e) {
  let t,
    s = n.transactionQueueTree_;
  for (t = m(e); t !== null && he(s) === void 0; )
    (s = Et(s, t)), (e = I(e)), (t = m(e));
  return s;
}
function Ri(n, e) {
  const t = [];
  return bi(n, e, t), t.sort((s, i) => s.order - i.order), t;
}
function bi(n, e, t) {
  const s = he(e);
  if (s) for (let i = 0; i < s.length; i++) t.push(s[i]);
  wt(e, (i) => {
    bi(n, i, t);
  });
}
function Nt(n, e) {
  const t = he(e);
  if (t) {
    let s = 0;
    for (let i = 0; i < t.length; i++)
      t[i].status !== 2 && ((t[s] = t[i]), s++);
    (t.length = s), Nn(e, t.length > 0 ? t : void 0);
  }
  wt(e, (s) => {
    Nt(n, s);
  });
}
function xn(n, e) {
  const t = Qe(Ni(n, e)),
    s = Et(n.transactionQueueTree_, e);
  return (
    vl(s, (i) => {
      Ot(n, i);
    }),
    Ot(n, s),
    vi(s, (i) => {
      Ot(n, i);
    }),
    t
  );
}
function Ot(n, e) {
  const t = he(e);
  if (t) {
    const s = [];
    let i = [],
      r = -1;
    for (let o = 0; o < t.length; o++)
      t[o].status === 3 ||
        (t[o].status === 1
          ? (f(r === o - 1, 'All SENT items should be at beginning of queue.'),
            (r = o),
            (t[o].status = 3),
            (t[o].abortReason = 'set'))
          : (f(t[o].status === 0, 'Unexpected transaction status in abort'),
            t[o].unwatcher(),
            (i = i.concat(K(n.serverSyncTree_, t[o].currentWriteId, !0))),
            t[o].onComplete &&
              s.push(t[o].onComplete.bind(null, new Error('set'), !1, null))));
    r === -1 ? Nn(e, void 0) : (t.length = r + 1), F(n.eventQueue_, Qe(e), i);
    for (let o = 0; o < s.length; o++) we(s[o]);
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
 */ function Ql(n) {
  let e = '';
  const t = n.split('/');
  for (let s = 0; s < t.length; s++)
    if (t[s].length > 0) {
      let i = t[s];
      try {
        i = decodeURIComponent(i.replace(/\+/g, ' '));
      } catch {}
      e += '/' + i;
    }
  return e;
}
function Kl(n) {
  const e = {};
  n.charAt(0) === '?' && (n = n.substring(1));
  for (const t of n.split('&')) {
    if (t.length === 0) continue;
    const s = t.split('=');
    s.length === 2
      ? (e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]))
      : O(`Invalid query segment '${t}' in query '${n}'`);
  }
  return e;
}
const gs = function (n, e) {
    const t = zl(n),
      s = t.namespace;
    t.domain === 'firebase.com' &&
      Q(
        t.host +
          ' is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead'
      ),
      (!s || s === 'undefined') &&
        t.domain !== 'localhost' &&
        Q(
          'Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com'
        ),
      t.secure || tr();
    const i = t.scheme === 'ws' || t.scheme === 'wss';
    return {
      repoInfo: new Os(t.host, t.secure, s, i, e, '', s !== t.subdomain),
      path: new w(t.pathString),
    };
  },
  zl = function (n) {
    let e = '',
      t = '',
      s = '',
      i = '',
      r = '',
      o = !0,
      l = 'https',
      a = 443;
    if (typeof n == 'string') {
      let c = n.indexOf('//');
      c >= 0 && ((l = n.substring(0, c - 1)), (n = n.substring(c + 2)));
      let u = n.indexOf('/');
      u === -1 && (u = n.length);
      let h = n.indexOf('?');
      h === -1 && (h = n.length),
        (e = n.substring(0, Math.min(u, h))),
        u < h && (i = Ql(n.substring(u, h)));
      const d = Kl(n.substring(Math.min(n.length, h)));
      (c = e.indexOf(':')),
        c >= 0
          ? ((o = l === 'https' || l === 'wss'),
            (a = parseInt(e.substring(c + 1), 10)))
          : (c = e.length);
      const _ = e.slice(0, c);
      if (_.toLowerCase() === 'localhost') t = 'localhost';
      else if (_.split('.').length <= 2) t = _;
      else {
        const p = e.indexOf('.');
        (s = e.substring(0, p).toLowerCase()),
          (t = e.substring(p + 1)),
          (r = s);
      }
      'ns' in d && (r = d.ns);
    }
    return {
      host: e,
      port: a,
      domain: t,
      subdomain: s,
      secure: o,
      scheme: l,
      pathString: i,
      namespace: r,
    };
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
 */ class ki {
  constructor(e, t, s, i) {
    (this.eventType = e),
      (this.eventRegistration = t),
      (this.snapshot = s),
      (this.prevName = i);
  }
  getPath() {
    const e = this.snapshot.ref;
    return this.eventType === 'value' ? e._path : e.parent._path;
  }
  getEventType() {
    return this.eventType;
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return (
      this.getPath().toString() +
      ':' +
      this.eventType +
      ':' +
      b(this.snapshot.exportVal())
    );
  }
}
class xi {
  constructor(e, t, s) {
    (this.eventRegistration = e), (this.error = t), (this.path = s);
  }
  getPath() {
    return this.path;
  }
  getEventType() {
    return 'cancel';
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return this.path.toString() + ':cancel';
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
 */ class Pi {
  constructor(e, t) {
    (this.snapshotCallback = e), (this.cancelCallback = t);
  }
  onValue(e, t) {
    this.snapshotCallback.call(null, e, t);
  }
  onCancel(e) {
    return (
      f(
        this.hasCancelCallback,
        'Raising a cancel event on a listener with no cancel callback'
      ),
      this.cancelCallback.call(null, e)
    );
  }
  get hasCancelCallback() {
    return !!this.cancelCallback;
  }
  matches(e) {
    return (
      this.snapshotCallback === e.snapshotCallback ||
      (this.snapshotCallback.userCallback !== void 0 &&
        this.snapshotCallback.userCallback ===
          e.snapshotCallback.userCallback &&
        this.snapshotCallback.context === e.snapshotCallback.context)
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
 */ class Pn {
  constructor(e, t, s, i) {
    (this._repo = e),
      (this._path = t),
      (this._queryParams = s),
      (this._orderByCalled = i);
  }
  get key() {
    return v(this._path) ? null : sn(this._path);
  }
  get ref() {
    return new q(this._repo, this._path);
  }
  get _queryIdentifier() {
    const e = ts(this._queryParams),
      t = Zt(e);
    return t === '{}' ? 'default' : t;
  }
  get _queryObject() {
    return ts(this._queryParams);
  }
  isEqual(e) {
    if (((e = le(e)), !(e instanceof Pn))) return !1;
    const t = this._repo === e._repo,
      s = rn(this._path, e._path),
      i = this._queryIdentifier === e._queryIdentifier;
    return t && s && i;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return this._repo.toString() + Wr(this._path);
  }
}
class q extends Pn {
  constructor(e, t) {
    super(e, t, new cn(), !1);
  }
  get parent() {
    const e = Bs(this._path);
    return e === null ? null : new q(this._repo, e);
  }
  get root() {
    let e = this;
    for (; e.parent !== null; ) e = e.parent;
    return e;
  }
}
class oe {
  constructor(e, t, s) {
    (this._node = e), (this.ref = t), (this._index = s);
  }
  get priority() {
    return this._node.getPriority().val();
  }
  get key() {
    return this.ref.key;
  }
  get size() {
    return this._node.numChildren();
  }
  child(e) {
    const t = new w(e),
      s = dt(this.ref, e);
    return new oe(this._node.getChild(t), s, S);
  }
  exists() {
    return !this._node.isEmpty();
  }
  exportVal() {
    return this._node.val(!0);
  }
  forEach(e) {
    return this._node.isLeafNode()
      ? !1
      : !!this._node.forEachChild(this._index, (s, i) =>
          e(new oe(i, dt(this.ref, s), S))
        );
  }
  hasChild(e) {
    const t = new w(e);
    return !this._node.getChild(t).isEmpty();
  }
  hasChildren() {
    return this._node.isLeafNode() ? !1 : !this._node.isEmpty();
  }
  toJSON() {
    return this.exportVal();
  }
  val() {
    return this._node.val();
  }
}
function An(n, e) {
  return (
    (n = le(n)),
    n._checkNotDeleted('ref'),
    e !== void 0 ? dt(n._root, e) : n._root
  );
}
function dt(n, e) {
  return (
    (n = le(n)),
    m(n._path) === null
      ? Rl('child', 'path', e, !1)
      : wi('child', 'path', e, !1),
    new q(n._repo, N(n._path, e))
  );
}
function ca(n, e) {
  (n = le(n)), Ti('set', n._path), Il('set', e, n._path, !1);
  const t = new Ve();
  return (
    Wl(
      n._repo,
      n._path,
      e,
      null,
      t.wrapCallback(() => {})
    ),
    t.promise
  );
}
function Mn(n, e) {
  Nl('update', e, n._path, !1);
  const t = new Ve();
  return (
    Ul(
      n._repo,
      n._path,
      e,
      t.wrapCallback(() => {})
    ),
    t.promise
  );
}
function ha(n) {
  n = le(n);
  const e = new Pi(() => {}),
    t = new Rt(e);
  return Fl(n._repo, n, t).then(
    (s) => new oe(s, new q(n._repo, n._path), n._queryParams.getIndex())
  );
}
class Rt {
  constructor(e) {
    this.callbackContext = e;
  }
  respondsTo(e) {
    return e === 'value';
  }
  createEvent(e, t) {
    const s = t._queryParams.getIndex();
    return new ki(
      'value',
      this,
      new oe(e.snapshotNode, new q(t._repo, t._path), s)
    );
  }
  getEventRunner(e) {
    return e.getEventType() === 'cancel'
      ? () => this.callbackContext.onCancel(e.error)
      : () => this.callbackContext.onValue(e.snapshot, null);
  }
  createCancelEvent(e, t) {
    return this.callbackContext.hasCancelCallback ? new xi(this, e, t) : null;
  }
  matches(e) {
    return e instanceof Rt
      ? !e.callbackContext || !this.callbackContext
        ? !0
        : e.callbackContext.matches(this.callbackContext)
      : !1;
  }
  hasAnyCallback() {
    return this.callbackContext !== null;
  }
}
class Dn {
  constructor(e, t) {
    (this.eventType = e), (this.callbackContext = t);
  }
  respondsTo(e) {
    let t = e === 'children_added' ? 'child_added' : e;
    return (
      (t = t === 'children_removed' ? 'child_removed' : t), this.eventType === t
    );
  }
  createCancelEvent(e, t) {
    return this.callbackContext.hasCancelCallback ? new xi(this, e, t) : null;
  }
  createEvent(e, t) {
    f(e.childName != null, 'Child events should have a childName.');
    const s = dt(new q(t._repo, t._path), e.childName),
      i = t._queryParams.getIndex();
    return new ki(e.type, this, new oe(e.snapshotNode, s, i), e.prevName);
  }
  getEventRunner(e) {
    return e.getEventType() === 'cancel'
      ? () => this.callbackContext.onCancel(e.error)
      : () => this.callbackContext.onValue(e.snapshot, e.prevName);
  }
  matches(e) {
    return e instanceof Dn
      ? this.eventType === e.eventType &&
          (!this.callbackContext ||
            !e.callbackContext ||
            this.callbackContext.matches(e.callbackContext))
      : !1;
  }
  hasAnyCallback() {
    return !!this.callbackContext;
  }
}
function jl(n, e, t, s, i) {
  let r;
  if (
    (typeof s == 'object' && ((r = void 0), (i = s)),
    typeof s == 'function' && (r = s),
    i && i.onlyOnce)
  ) {
    const a = t,
      c = (u, h) => {
        ps(n._repo, n, l), a(u, h);
      };
    (c.userCallback = t.userCallback), (c.context = t.context), (t = c);
  }
  const o = new Pi(t, r || void 0),
    l = e === 'value' ? new Rt(o) : new Dn(e, o);
  return Gl(n._repo, n, l), () => ps(n._repo, n, l);
}
function $l(n, e, t, s) {
  return jl(n, 'value', e, t, s);
}
Xo(q);
nl(q);
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
 */ const Xl = 'FIREBASE_DATABASE_EMULATOR_HOST',
  jt = {};
let Jl = !1;
function Zl(n, e, t, s) {
  (n.repoInfo_ = new Os(
    `${e}:${t}`,
    !1,
    n.repoInfo_.namespace,
    n.repoInfo_.webSocketOnly,
    n.repoInfo_.nodeAdmin,
    n.repoInfo_.persistenceKey,
    n.repoInfo_.includeNamespaceInQueryParams
  )),
    s && (n.authTokenProvider_ = s);
}
function ea(n, e, t, s, i) {
  let r = s || n.options.databaseURL;
  r === void 0 &&
    (n.options.projectId ||
      Q(
        "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
      ),
    A('Using default host for project ', n.options.projectId),
    (r = `${n.options.projectId}-default-rtdb.firebaseio.com`));
  let o = gs(r, i),
    l = o.repoInfo,
    a,
    c;
  typeof process < 'u' && process.env && (c = process.env[Xl]),
    c
      ? ((a = !0),
        (r = `http://${c}?ns=${l.namespace}`),
        (o = gs(r, i)),
        (l = o.repoInfo))
      : (a = !o.repoInfo.secure);
  const u = i && a ? new pe(pe.OWNER) : new dr(n.name, n.options, e);
  bl('Invalid Firebase Database URL', o),
    v(o.path) ||
      Q(
        'Database URL must point to the root of a Firebase Database (not including a child path).'
      );
  const h = na(l, n, u, new ur(n.name, t));
  return new sa(h, n);
}
function ta(n, e) {
  const t = jt[e];
  (!t || t[n.key] !== n) &&
    Q(`Database ${e}(${n.repoInfo_}) has already been deleted.`),
    Hl(n),
    delete t[n.key];
}
function na(n, e, t, s) {
  let i = jt[e.name];
  i || ((i = {}), (jt[e.name] = i));
  let r = i[n.toURLString()];
  return (
    r &&
      Q(
        'Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.'
      ),
    (r = new Ml(n, Jl, t, s)),
    (i[n.toURLString()] = r),
    r
  );
}
class sa {
  constructor(e, t) {
    (this._repoInternal = e),
      (this.app = t),
      (this.type = 'database'),
      (this._instanceStarted = !1);
  }
  get _repo() {
    return (
      this._instanceStarted ||
        (Dl(
          this._repoInternal,
          this.app.options.appId,
          this.app.options.databaseAuthVariableOverride
        ),
        (this._instanceStarted = !0)),
      this._repoInternal
    );
  }
  get _root() {
    return (
      this._rootInternal || (this._rootInternal = new q(this._repo, C())),
      this._rootInternal
    );
  }
  _delete() {
    return (
      this._rootInternal !== null &&
        (ta(this._repo, this.app.name),
        (this._repoInternal = null),
        (this._rootInternal = null)),
      Promise.resolve()
    );
  }
  _checkNotDeleted(e) {
    this._rootInternal === null &&
      Q('Cannot call ' + e + ' on a deleted database.');
  }
}
function On(n = Gi(), e) {
  const t = Ui(n, 'database').getImmediate({ identifier: e }),
    s = Vi('database');
  return s && ia(t, ...s), t;
}
function ia(n, e, t, s = {}) {
  (n = le(n)),
    n._checkNotDeleted('useEmulator'),
    n._instanceStarted &&
      Q(
        'Cannot call useEmulator() after instance has already been initialized.'
      );
  const i = n._repoInternal;
  let r;
  if (i.repoInfo_.nodeAdmin)
    s.mockUserToken &&
      Q(
        'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'
      ),
      (r = new pe(pe.OWNER));
  else if (s.mockUserToken) {
    const o =
      typeof s.mockUserToken == 'string'
        ? s.mockUserToken
        : Hi(s.mockUserToken, n.app.options.projectId);
    r = new pe(o);
  }
  Zl(i, e, t, r);
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
 */ function ra(n) {
  Xi(ji),
    Mi(
      new Di(
        'database',
        (e, { instanceIdentifier: t }) => {
          const s = e.getProvider('app').getImmediate(),
            i = e.getProvider('auth-internal'),
            r = e.getProvider('app-check-internal');
          return ea(s, i, r, t);
        },
        'PUBLIC'
      ).setMultipleInstances(!0)
    ),
    Ln(Wn, Un, n),
    Ln(Wn, Un, 'esm2017');
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
 */ class oa {
  constructor(e, t) {
    (this.committed = e), (this.snapshot = t);
  }
  toJSON() {
    return { committed: this.committed, snapshot: this.snapshot.toJSON() };
  }
}
function ua(n, e, t) {
  var s;
  if (
    ((n = le(n)),
    Ti('Reference.transaction', n._path),
    n.key === '.length' || n.key === '.keys')
  )
    throw 'Reference.transaction failed: ' + n.key + ' is a read-only object.';
  const i =
      (s = t == null ? void 0 : t.applyLocally) !== null && s !== void 0
        ? s
        : !0,
    r = new Ve(),
    o = (a, c, u) => {
      let h = null;
      a
        ? r.reject(a)
        : ((h = new oe(u, new q(n._repo, n._path), S)),
          r.resolve(new oa(c, h)));
    },
    l = $l(n, () => {});
  return ql(n._repo, n._path, e, o, l, i), r.promise;
}
Y.prototype.simpleListen = function (n, e) {
  this.sendRequest('q', { p: n }, e);
};
Y.prototype.echo = function (n, e) {
  this.sendRequest('echo', { d: n }, e);
};
ra();
const la = () => Xt('userInfo', () => null),
  da = () => {
    const n = Xt('location', () => null),
      e = (s) => (i) => {
        s.value = i;
      },
      t = (s) => () => {
        const i = la();
        if (i.value && s.value) {
          const r = On(),
            o = {},
            l = new Date();
          (o[`users/${i.value.id}/position`] = s.value),
            (o[`users/${i.value.id}/lastUpdateTime`] = l.toLocaleString('ja')),
            Mn(An(r), o);
        }
      };
    return { location: vs(n), updateLocation: e(n), uploadLocation: t(n) };
  },
  fa = () => {
    const n = Xt('permission', () => !0),
      e = (t) => () => {
        t.value = !t.value;
      };
    return { permission: vs(n), changePermission: e(n) };
  },
  _a = (n, e, t, s) => {
    const i = On(),
      r = {};
    return (
      (r[`users/${n}/name`] = e),
      (r[`users/${n}/message`] = t),
      (r[`users/${n}/urgency`] = s),
      Mn(An(i), r)
    );
  },
  pa = (n) => {
    const e = On(),
      t = {};
    return (
      (t[`users/${n}/position`] = {
        lat: 34.26571704774958,
        lng: 135.1519788915844,
      }),
      Mn(An(e), t)
    );
  };
export {
  ha as a,
  ua as b,
  dt as c,
  _a as d,
  pa as e,
  da as f,
  On as g,
  fa as h,
  Mn as i,
  An as r,
  ca as s,
  la as u,
};
