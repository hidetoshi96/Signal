import {
  a as $,
  r as A,
  b as O,
  e as L,
  o as _,
  f as m,
  h as M,
  w as j,
  F as N,
  i as E,
  u,
  c as S,
  j as e,
  k as F,
  t as b,
  l as x,
  v as z,
  m as se,
  p as U,
  q as ne,
  s as D,
  x as X,
  y as ue,
  C as de,
  z as Q,
  A as pe,
  B as H,
  D as he,
  E as _e,
  G as ge,
  H as B,
} from './entry.192ecaba.js';
import {
  g as oe,
  a as me,
  c as fe,
  r as le,
  b as ve,
  u as re,
  d as we,
  e as be,
  f as ke,
  h as ye,
} from './userInfoState.7308cf64.js';
import { g as Ce, a as xe } from './index.esm2017.cd6d08be.js';
import { u as $e } from './navState.fcbedf6b.js';
const P = () => {
    const s = $('users', () => ({})),
      t = $('selectedUsers', () => ({})),
      n = (l, a) => (i) => {
        if (((a.value = {}), i == null)) a.value = l.value;
        else
          for (const [r, d] of Object.entries(l.value))
            i.includes(r) && (a.value[r] = d);
      },
      o = (l) => async () => {
        const a = oe();
        await me(fe(le(a), 'users/')).then((i) => {
          for (const [r, d] of Object.entries(i.val()))
            l.value[r] = {
              name: d.name,
              position: d.position,
              lastUpdateTime: d.lastUpdateTime,
              urgency: d.urgency,
              message: d.message,
              supporters: d.supporters == null ? {} : d.supporters,
            };
        });
      };
    return {
      users: A(s),
      selectedUsers: A(t),
      getUsers: o(s),
      selectUsers: n(s, t),
    };
  },
  Ne = (s, t, n) => {
    const o = oe();
    ve(
      le(o, `users/${n}/supporters/`),
      (l) => (
        l ? (l[s] ? (l[s] = null) : (l[s] = t)) : ((l = {}), (l[s] = t)), l
      )
    );
  },
  ie = () => {
    const s = $('windowOpened', () => ({})),
      t = (o) => (l) => {
        o.value[l] = !o.value[l];
      },
      n = (o) => (l) => {
        o.value[l] = !1;
      };
    return { windowOpened: A(s), windowSwitch: t(s), windowClose: n(s) };
  },
  q = () => {
    const s = $('mapCenter', () => ({ lat: 0, lng: 0 })),
      t = (n) => (o) => {
        n.value = o;
      };
    return { mapCenter: A(s), moveCenter: t(s) };
  },
  Te = { class: 'h-3/6' },
  Ae = { class: 'grid grid-cols-6 gap-4' },
  Me = { class: 'm-auto' },
  Ee = e(
    'path',
    {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    null,
    -1
  ),
  Se = [Ee],
  Ue = { class: 'col-span-5' },
  De = { class: 'font-bold text-black' },
  Fe = { class: 'text-sm opacity-50 text-black' },
  Oe = { class: 'text-xs text-black opacity-50 text-right' },
  Be = O({
    __name: 'Map',
    setup(s) {
      const { selectedUsers: t } = P(),
        { windowOpened: n, windowSwitch: o, windowClose: l } = ie(),
        { mapCenter: a } = q(),
        i = ['Green', 'Yellow', 'Red'];
      return (r, d) => {
        const p = L('GMapInfoWindow'),
          c = L('GMapMarker'),
          h = L('GMapMap');
        return (
          _(),
          m('div', Te, [
            M(
              h,
              {
                center: u(a),
                zoom: 15,
                options: {
                  zoomControl: !1,
                  mapTypeControl: !0,
                  scaleControl: !0,
                  streetViewControl: !1,
                  rotateControl: !0,
                  fullscreenControl: !1,
                  gestureHandling: 'greedy',
                },
                style: { width: '100%', height: '100%' },
              },
              {
                default: j(() => [
                  (_(!0),
                  m(
                    N,
                    null,
                    E(
                      u(t),
                      (g, w) => (
                        _(),
                        S(
                          c,
                          {
                            key: w,
                            position: g.position,
                            clickable: !0,
                            onClick: (v) => u(o)(w),
                            icon: `/user${i[Number(g.urgency)]}.svg`,
                          },
                          {
                            default: j(() => [
                              M(
                                p,
                                {
                                  opened: u(n)[w],
                                  closeclick: !0,
                                  onCloseclick: (v) => u(l)(w),
                                },
                                {
                                  default: j(() => [
                                    e('div', Ae, [
                                      e('div', Me, [
                                        (_(),
                                        m(
                                          'svg',
                                          {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            fill: 'none',
                                            viewBox: '0 0 24 24',
                                            'stroke-width': '1.5',
                                            stroke: 'currentColor',
                                            class: F([
                                              'w-10 h-10',
                                              {
                                                'fill-red-500':
                                                  g.urgency === '2',
                                                'fill-yellow-500':
                                                  g.urgency === '1',
                                                'fill-green-500':
                                                  g.urgency === '0',
                                              },
                                            ]),
                                          },
                                          Se,
                                          2
                                        )),
                                      ]),
                                      e('div', Ue, [
                                        e('div', De, b(g.name), 1),
                                        e('div', Fe, b(w), 1),
                                        x(
                                          e(
                                            'div',
                                            {
                                              class:
                                                'whitespace-pre-line break-words border rounded-lg border-current text-xl text-center p-2 m-2 text-black',
                                            },
                                            b(g.message),
                                            513
                                          ),
                                          [[z, g.message != '']]
                                        ),
                                        e(
                                          'div',
                                          Oe,
                                          '\u6700\u7D42\u66F4\u65B0\u6642\u523B\uFF1A ' +
                                            b(g.lastUpdateTime),
                                          1
                                        ),
                                      ]),
                                    ]),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ['opened', 'onCloseclick']
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['position', 'onClick', 'icon']
                        )
                      )
                    ),
                    128
                  )),
                ]),
                _: 1,
              },
              8,
              ['center']
            ),
          ])
        );
      };
    },
  }),
  Ge = { class: 'h-3/6 p-4 overflow-y-scroll' },
  Pe = { class: 'table w-full' },
  Ie = { class: 'bg-neutral' },
  Le = {
    class:
      'grid grid-rows-2 grid-cols-6 grid-flow-col gap-x-2 place-items-center',
  },
  je = { class: 'row-span-1 m-auto col-span-1' },
  Re = e(
    'path',
    {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    null,
    -1
  ),
  ze = [Re],
  Je = { class: 'row-span-1 col-span-1' },
  Ve = ['onClick'],
  He = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      'stroke-width': '1.5',
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
      }),
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
      }),
    ],
    -1
  ),
  qe = [He],
  We = { class: 'row-span-2 col-span-5 place-self-stretch' },
  Ye = { class: 'font-bold' },
  Ke = { class: 'text-sm opacity-50' },
  Xe = e('summary', null, '\u30E1\u30C3\u30BB\u30FC\u30B8', -1),
  Qe = {
    class:
      'whitespace-pre-line break-words border rounded-lg border-current text-xl text-center p-2 m-2',
  },
  Ze = { class: 'flex flex-row justify-between' },
  et = ['onClick'],
  tt = e('summary', null, '\u5FD7\u9858\u8005\u30EA\u30B9\u30C8', -1),
  st = { class: 'divide-y px-2 rounded-md border' },
  nt = ['onClick'],
  ot = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      'stroke-width': '1.5',
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
      }),
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
      }),
    ],
    -1
  ),
  lt = [ot],
  rt = { class: 'text-xs opacity-50 text-right' },
  it = O({
    __name: 'TagList',
    setup(s) {
      const { users: t, selectedUsers: n } = P(),
        { moveCenter: o } = q(),
        l = re(),
        a = Math.PI / 180,
        i = (d, p, c, h) => (
          (d *= a),
          (p *= a),
          (c *= a),
          (h *= a),
          Math.round(
            1e3 *
              6371 *
              Math.acos(
                Math.cos(d) * Math.cos(c) * Math.cos(h - p) +
                  Math.sin(d) * Math.sin(c)
              )
          )
        ),
        r = (d, p, c) => {
          console.log(Ne(d, p, c));
        };
      return (d, p) => (
        _(),
        m('div', Ge, [
          e('table', Pe, [
            e('tbody', null, [
              (_(!0),
              m(
                N,
                null,
                E(
                  u(n),
                  (c, h) => (
                    _(),
                    m('tr', { key: h, class: 'overflow-x-scroll' }, [
                      e('td', Ie, [
                        e('div', Le, [
                          e('div', je, [
                            (_(),
                            m(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                'stroke-width': '1.5',
                                stroke: 'currentColor',
                                class: F([
                                  'w-full h-full',
                                  {
                                    'fill-red-500': c.urgency === '2',
                                    'fill-yellow-500': c.urgency === '1',
                                    'fill-green-500': c.urgency === '0',
                                  },
                                ]),
                              },
                              ze,
                              2
                            )),
                          ]),
                          e('div', Je, [
                            e(
                              'button',
                              {
                                class: 'btn btn-circle btn-ghost',
                                onClick: (g) => u(o)(c.position),
                              },
                              qe,
                              8,
                              Ve
                            ),
                          ]),
                          e('div', We, [
                            e('div', Ye, b(c.name), 1),
                            e('div', Ke, b(h), 1),
                            x(
                              e(
                                'details',
                                null,
                                [Xe, e('div', Qe, b(c.message), 1)],
                                512
                              ),
                              [[z, c.message != '']]
                            ),
                            e('div', Ze, [
                              e(
                                'div',
                                null,
                                '\u73FE\u5728\u306E\u5FD7\u9858\u8005\u6570\uFF1A' +
                                  b(Object.keys(c.supporters).length) +
                                  '\u4EBA',
                                1
                              ),
                              e(
                                'button',
                                {
                                  class: 'btn btn-xs btn-primary',
                                  onClick: (g) => r(u(l).id, u(l).name, h),
                                },
                                '\u52A9\u3051\u306B\u884C\u304F',
                                8,
                                et
                              ),
                            ]),
                            x(
                              e(
                                'details',
                                null,
                                [
                                  tt,
                                  e('div', st, [
                                    (_(!0),
                                    m(
                                      N,
                                      null,
                                      E(
                                        c.supporters,
                                        (g, w) => (
                                          _(),
                                          m(
                                            'div',
                                            {
                                              key: w,
                                              class:
                                                'flex flex-row justify-between',
                                            },
                                            [
                                              e('div', null, [
                                                e('p', null, b(g), 1),
                                                e(
                                                  'p',
                                                  null,
                                                  '\u6551\u63F4\u8005\u3068\u306E\u8DDD\u96E2\uFF1A' +
                                                    b(
                                                      i(
                                                        c.position.lat,
                                                        c.position.lng,
                                                        u(t)[w].position.lat,
                                                        u(t)[w].position.lng
                                                      )
                                                    ) +
                                                    'm',
                                                  1
                                                ),
                                              ]),
                                              e(
                                                'button',
                                                {
                                                  class:
                                                    'btn btn-circle btn-ghost',
                                                  onClick: (v) =>
                                                    u(o)(u(t)[w].position),
                                                },
                                                lt,
                                                8,
                                                nt
                                              ),
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                ],
                                512
                              ),
                              [[z, Object.keys(c.supporters).length > 0]]
                            ),
                            e(
                              'div',
                              rt,
                              '\u6700\u7D42\u66F4\u65B0\u6642\u523B\uFF1A ' +
                                b(c.lastUpdateTime),
                              1
                            ),
                          ]),
                        ]),
                      ]),
                    ])
                  )
                ),
                128
              )),
            ]),
          ]),
        ])
      );
    },
  }),
  W = () => {
    const s = $('groups', () => []),
      t = $('selectedGroup', () => null),
      n = (p) => (c) => {
        p.value = c;
      },
      o = (p) => () => {
        p.value.unshift({
          groupName: `group${p.value.length + 1}`,
          userIDs: [],
        });
      },
      l = (p) => (c) => {
        p.value.splice(c, 1);
      },
      a = (p, c) => (h) => {
        c.value = p.value.find((g) => g.groupName === h);
      },
      i = (p) => (c, h) => {
        p.value[c].groupName = h;
      },
      r = (p) => (c, h) => {
        p.value[c].userIDs.push(h);
      },
      d = (p) => (c, h) => {
        p.value[c].userIDs.splice(h, 1);
      };
    return {
      groups: A(s),
      selectedGroup: A(t),
      setGroups: n(s),
      addGroup: o(s),
      deleteGroup: l(s),
      selectGroup: a(s, t),
      updateGroupName: i(s),
      addUserID: r(s),
      deleteUserID: d(s),
    };
  },
  at = () => $('selectedTab', () => '\u8AB0\u3067\u3082'),
  ct = {
    class: 'tabs tabs-boxed place-content-center',
    style: { height: '6%' },
  },
  ut = ['onClick'],
  dt = { style: { height: '94%' }, class: 'space-y-2' },
  pt = O({
    __name: 'MapPage',
    setup(s) {
      const { groups: t, selectedGroup: n, selectGroup: o } = W(),
        l = at(),
        { users: a, selectedUsers: i, getUsers: r, selectUsers: d } = P(),
        { windowClose: p } = ie(),
        c = (h) => {
          (l.value = h),
            h === '\u8AB0\u3067\u3082'
              ? d(null)
              : (o(h), n.value == null ? d(null) : d(n.value.userIDs));
        };
      return (
        se(async () => {
          if (
            (console.log('onMounted'),
            await r(),
            c('\u8AB0\u3067\u3082'),
            i.value != null)
          )
            for (const h of Object.keys(i.value)) p(h);
        }),
        (h, g) => {
          const w = Be,
            v = it;
          return (
            _(),
            m(
              N,
              null,
              [
                e('div', ct, [
                  e(
                    'a',
                    {
                      class: F([
                        'tab',
                        { 'tab-active': u(l) === '\u8AB0\u3067\u3082' },
                      ]),
                      onClick: g[0] || (g[0] = (f) => c('\u8AB0\u3067\u3082')),
                    },
                    b('\u8AB0\u3067\u3082'),
                    2
                  ),
                  (_(!0),
                  m(
                    N,
                    null,
                    E(
                      u(t),
                      (f) => (
                        _(),
                        m(
                          'a',
                          {
                            class: F([
                              'tab',
                              { 'tab-active': u(l) === f.groupName },
                            ]),
                            onClick: (k) => c(f.groupName),
                          },
                          b(f.groupName),
                          11,
                          ut
                        )
                      )
                    ),
                    256
                  )),
                ]),
                e('div', dt, [M(w), M(v)]),
              ],
              64
            )
          );
        }
      );
    },
  }),
  ht = { class: 'space-y-4' },
  _t = e(
    'h2',
    { class: 'text-center text-xl font-medium' },
    '\u30DE\u30A4\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB',
    -1
  ),
  gt = { class: 'form-control' },
  mt = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, 'Name')],
    -1
  ),
  ft = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, 'ID')],
    -1
  ),
  vt = { class: 'input-group' },
  wt = ['value'],
  bt = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      'stroke-width': '1.5',
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6',
      }),
    ],
    -1
  ),
  kt = [bt],
  yt = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, '\u30E1\u30C3\u30BB\u30FC\u30B8')],
    -1
  ),
  Ct = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, '\u7DCA\u6025\u5EA6')],
    -1
  ),
  xt = { class: 'flex flex-row space-x-4' },
  $t = e(
    'path',
    {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    null,
    -1
  ),
  Nt = [$t],
  Tt = { class: 'grow' },
  At = e(
    'div',
    { class: 'w-full flex justify-between text-xs px-2' },
    [
      e('span', null, '\u5C0F'),
      e('span', null, '\u4E2D'),
      e('span', null, '\u5927'),
    ],
    -1
  ),
  Mt = e(
    'label',
    { class: 'label' },
    [
      e('div', null, [
        e(
          'p',
          { class: 'label-text' },
          '\u4F4D\u7F6E\u60C5\u5831\u30EA\u30BB\u30C3\u30C8'
        ),
        e(
          'p',
          { class: 'text-xs opacity-50' },
          '\u904E\u53BB\u306B\u8A18\u9332\u3057\u305F\u4F4D\u7F6E\u60C5\u5831\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3059'
        ),
      ]),
    ],
    -1
  ),
  Et = { class: 'flex justify-center' },
  St = {
    __name: 'Profile',
    setup(s) {
      const t = re(),
        n = (a) => {
          if (!navigator.clipboard) {
            alert(
              '\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u306F\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093'
            );
            return;
          }
          navigator.clipboard.writeText(a);
        },
        o = async (a, i, r, d) => {
          const p = await we(a, i, r, d);
          (t.value.name = i),
            (t.value.message = r),
            (t.value.urgency = d),
            console.log(p);
        },
        l = async (a) => {
          const i = await be(a);
          console.log(i);
        };
      return (a, i) => (
        _(),
        m('div', ht, [
          _t,
          e('div', gt, [
            e('div', null, [
              mt,
              x(
                e(
                  'input',
                  {
                    type: 'text',
                    placeholder: 'Type here',
                    class: 'input input-bordered w-full',
                    'onUpdate:modelValue':
                      i[0] || (i[0] = (r) => (u(t).name = r)),
                  },
                  null,
                  512
                ),
                [[U, u(t).name]]
              ),
            ]),
            e('div', null, [
              ft,
              e('div', vt, [
                e(
                  'input',
                  {
                    type: 'text',
                    placeholder: 'Type here',
                    class: 'input input-bordered w-full',
                    value: u(t).id,
                    readonly: '',
                  },
                  null,
                  8,
                  wt
                ),
                e(
                  'button',
                  {
                    class: 'btn btn-square',
                    onClick: i[1] || (i[1] = (r) => n(u(t).id)),
                  },
                  kt
                ),
              ]),
            ]),
            e('div', null, [
              yt,
              x(
                e(
                  'textarea',
                  {
                    class: 'textarea textarea-bordered w-full',
                    placeholder: 'Type here',
                    'onUpdate:modelValue':
                      i[2] || (i[2] = (r) => (u(t).message = r)),
                  },
                  null,
                  512
                ),
                [[U, u(t).message]]
              ),
            ]),
            e('div', null, [
              Ct,
              e('div', xt, [
                e('div', null, [
                  (_(),
                  m(
                    'svg',
                    {
                      xmlns: 'http://www.w3.org/2000/svg',
                      fill: 'none',
                      viewBox: '0 0 24 24',
                      'stroke-width': '1.5',
                      stroke: 'currentColor',
                      class: F([
                        'w-10 h-10',
                        {
                          'fill-red-500': u(t).urgency === '2',
                          'fill-yellow-500': u(t).urgency === '1',
                          'fill-green-500': u(t).urgency === '0',
                        },
                      ]),
                    },
                    Nt,
                    2
                  )),
                ]),
                e('div', Tt, [
                  x(
                    e(
                      'input',
                      {
                        type: 'range',
                        min: '0',
                        max: '2',
                        class: 'range',
                        step: '1',
                        'onUpdate:modelValue':
                          i[3] || (i[3] = (r) => (u(t).urgency = r)),
                      },
                      null,
                      512
                    ),
                    [[U, u(t).urgency]]
                  ),
                  At,
                ]),
              ]),
            ]),
          ]),
          e('input', {
            type: 'submit',
            value: 'save',
            class: 'btn btn-sm w-full',
            onClick:
              i[4] ||
              (i[4] = (r) => o(u(t).id, u(t).name, u(t).message, u(t).urgency)),
          }),
          e('div', null, [
            Mt,
            e('div', Et, [
              e(
                'button',
                {
                  class: 'btn btn-wide btn-primary',
                  onClick: i[5] || (i[5] = (r) => l(u(t).id)),
                },
                'Reset'
              ),
            ]),
          ]),
        ])
      );
    },
  },
  Ut = {},
  Dt = { class: 'space-y-8 m-4' };
function Ft(s, t) {
  const n = St;
  return _(), m('div', Dt, [M(n)]);
}
const Ot = ne(Ut, [['render', Ft]]),
  Bt = { class: 'space-y-4' },
  Gt = e(
    'h2',
    { class: 'text-center text-xl font-medium' },
    '\u77E5\u308A\u5408\u3044\u30EA\u30B9\u30C8',
    -1
  ),
  Pt = { class: 'carousel w-full p-4 space-x-4 rounded-box border-y-2' },
  It = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'icon icon-tabler icon-tabler-plus',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      'stroke-width': '2',
      stroke: 'currentColor',
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      e('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      e('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
      e('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
    ],
    -1
  ),
  Lt = [It],
  jt = { class: 'input-group' },
  Rt = ['value'],
  zt = ['for'],
  Jt = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      'stroke-width': '1.5',
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
      }),
    ],
    -1
  ),
  Vt = [Jt],
  Ht = ['id', 'onChange'],
  qt = { class: 'modal' },
  Wt = { class: 'modal-box relative' },
  Yt = ['for'],
  Kt = e(
    'h3',
    { class: 'h-3 text-center' },
    '\u30B0\u30EB\u30FC\u30D7\u540D\u5909\u66F4',
    -1
  ),
  Xt = { class: 'form-control w-full max-w-xs' },
  Qt = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, 'GroupName')],
    -1
  ),
  Zt = ['onClick'],
  es = { class: 'table w-full' },
  ts = { class: 'bg-neutral' },
  ss = { class: 'grid grid-cols-6 gap-4' },
  ns = ['onClick'],
  os = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M6 18L18 6M6 6l12 12',
      }),
    ],
    -1
  ),
  ls = [os],
  rs = { class: 'col-span-5' },
  is = { class: 'font-bold' },
  as = { class: 'p-0' },
  cs = { class: 'border-2 border-dashed rounded-xl my-4' },
  us = ['for'],
  ds = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      'stroke-width': '1.5',
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 4.5v15m7.5-7.5h-15',
      }),
    ],
    -1
  ),
  ps = [ds],
  hs = ['id'],
  _s = { class: 'modal' },
  gs = { class: 'modal-box relative' },
  ms = ['for'],
  fs = e(
    'h3',
    { class: 'h-3 text-center' },
    '\u30E6\u30FC\u30B6\u30FC\u8FFD\u52A0',
    -1
  ),
  vs = { class: 'form-control w-full max-w-xs' },
  ws = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, 'Group')],
    -1
  ),
  bs = ['value'],
  ks = e(
    'label',
    { class: 'label' },
    [e('span', { class: 'label-text' }, 'ID')],
    -1
  ),
  ys = ['onClick'],
  Cs = ['onClick'],
  xs = e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
    },
    [
      e('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M6 18L18 6M6 6l12 12',
      }),
    ],
    -1
  ),
  $s = [xs],
  Ns = O({
    __name: 'CommunityList',
    setup(s) {
      const {
          groups: t,
          addGroup: n,
          deleteGroup: o,
          updateGroupName: l,
          addUserID: a,
          deleteUserID: i,
        } = W(),
        r = D(''),
        d = D(''),
        p = () => {
          n(), localStorage.setItem('groups', JSON.stringify(t.value));
        },
        c = (v) => {
          o(v), localStorage.setItem('groups', JSON.stringify(t.value));
        },
        h = (v, f) => {
          l(v, f),
            localStorage.setItem('groups', JSON.stringify(t.value)),
            (document.getElementById(`modal${v}UpdateName`).checked = !1);
        },
        g = (v, f) => {
          a(v, f),
            localStorage.setItem('groups', JSON.stringify(t.value)),
            (f = ''),
            (document.getElementById(`modal${v}`).checked = !1);
        },
        w = (v, f) => {
          i(v, f), localStorage.setItem('groups', JSON.stringify(t.value));
        };
      return (v, f) => (
        _(),
        m('div', Bt, [
          Gt,
          e('div', Pt, [
            e(
              'div',
              {
                class:
                  'carousel-item place-items-center rounded-box px-4 py-6 space-y-4 shadow-lg border',
              },
              [e('button', { class: 'btn btn-square btn-sm', onClick: p }, Lt)]
            ),
            (_(!0),
            m(
              N,
              null,
              E(
                u(t),
                (k, y) => (
                  _(),
                  m(
                    'div',
                    {
                      class:
                        'carousel-item w-auto grid justify-items-center rounded-box px-4 py-6 space-y-4 shadow-lg border',
                      key: y,
                    },
                    [
                      e('div', jt, [
                        e(
                          'input',
                          {
                            type: 'text',
                            placeholder: 'Type here',
                            class:
                              'input input-bordered input-primary w-full text-center text-xl font-bold',
                            value: k.groupName,
                            readonly: '',
                          },
                          null,
                          8,
                          Rt
                        ),
                        e(
                          'label',
                          {
                            for: `modal${y}UpdateName`,
                            class: 'btn btn-square border-primary',
                          },
                          Vt,
                          8,
                          zt
                        ),
                      ]),
                      e(
                        'input',
                        {
                          type: 'checkbox',
                          id: `modal${y}UpdateName`,
                          class: 'modal-toggle',
                          onChange: () => {
                            d.value = k.groupName;
                          },
                        },
                        null,
                        40,
                        Ht
                      ),
                      e('div', qt, [
                        e('div', Wt, [
                          e(
                            'label',
                            {
                              for: `modal${y}UpdateName`,
                              class:
                                'btn btn-md btn-circle absolute right-2 top-2',
                            },
                            '\u2715',
                            8,
                            Yt
                          ),
                          Kt,
                          e('div', Xt, [
                            e('div', null, [
                              Qt,
                              x(
                                e(
                                  'input',
                                  {
                                    type: 'text',
                                    placeholder: 'Type here',
                                    class:
                                      'input input-md input-bordered input-primary w-full',
                                    'onUpdate:modelValue':
                                      f[0] ||
                                      (f[0] = (C) =>
                                        X(d) ? (d.value = C) : null),
                                  },
                                  null,
                                  512
                                ),
                                [[U, u(d)]]
                              ),
                            ]),
                            e(
                              'input',
                              {
                                type: 'submit',
                                value: 'Update',
                                class: 'btn btn-md w-full mt-2',
                                onClick: (C) => h(y, u(d)),
                              },
                              null,
                              8,
                              Zt
                            ),
                          ]),
                        ]),
                      ]),
                      e('table', es, [
                        e('tbody', null, [
                          (_(!0),
                          m(
                            N,
                            null,
                            E(
                              k.userIDs,
                              (C, I) => (
                                _(),
                                m('tr', null, [
                                  e('td', ts, [
                                    e('div', ss, [
                                      e(
                                        'button',
                                        {
                                          class:
                                            'btn btn-xs btn-circle m-auto border',
                                          onClick: (K) => w(y, I),
                                        },
                                        ls,
                                        8,
                                        ns
                                      ),
                                      e('div', rs, [e('div', is, b(C), 1)]),
                                    ]),
                                  ]),
                                ])
                              )
                            ),
                            256
                          )),
                          e('tr', null, [
                            e('td', as, [
                              e('div', cs, [
                                e(
                                  'label',
                                  {
                                    for: `modal${y}`,
                                    class: 'btn btn-block w-full bg-inherit',
                                  },
                                  ps,
                                  8,
                                  us
                                ),
                                e(
                                  'input',
                                  {
                                    type: 'checkbox',
                                    id: `modal${y}`,
                                    class: 'modal-toggle',
                                  },
                                  null,
                                  8,
                                  hs
                                ),
                                e('div', _s, [
                                  e('div', gs, [
                                    e(
                                      'label',
                                      {
                                        for: `modal${y}`,
                                        class:
                                          'btn btn-md btn-circle absolute right-2 top-2',
                                      },
                                      '\u2715',
                                      8,
                                      ms
                                    ),
                                    fs,
                                    e('div', vs, [
                                      e('div', null, [
                                        ws,
                                        e(
                                          'input',
                                          {
                                            type: 'text',
                                            placeholder: 'Type here',
                                            class:
                                              'input input-bordered w-full',
                                            value: k.groupName,
                                            readonly: '',
                                          },
                                          null,
                                          8,
                                          bs
                                        ),
                                      ]),
                                      e('div', null, [
                                        ks,
                                        x(
                                          e(
                                            'input',
                                            {
                                              type: 'text',
                                              placeholder: 'Type here',
                                              class:
                                                'input input-md input-bordered w-full',
                                              'onUpdate:modelValue':
                                                f[1] ||
                                                (f[1] = (C) =>
                                                  X(r) ? (r.value = C) : null),
                                            },
                                            null,
                                            512
                                          ),
                                          [[U, u(r)]]
                                        ),
                                      ]),
                                      e(
                                        'input',
                                        {
                                          type: 'submit',
                                          value: 'Add',
                                          class: 'btn btn-md w-full mt-2',
                                          onClick: (C) => g(y, u(r)),
                                        },
                                        null,
                                        8,
                                        ys
                                      ),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                      e(
                        'button',
                        {
                          class: 'btn btn-square btn-sm',
                          onClick: (C) => c(y),
                        },
                        $s,
                        8,
                        Cs
                      ),
                    ]
                  )
                )
              ),
              128
            )),
          ]),
        ])
      );
    },
  }),
  Ts = {},
  As = { class: 'space-y-8 m-4' };
function Ms(s, t) {
  const n = Ns;
  return _(), m('div', As, [M(n)]);
}
const Es = ne(Ts, [['render', Ms]]);
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
 */ const Ss = 'type.googleapis.com/google.protobuf.Int64Value',
  Us = 'type.googleapis.com/google.protobuf.UInt64Value';
function ae(s, t) {
  const n = {};
  for (const o in s) s.hasOwnProperty(o) && (n[o] = t(s[o]));
  return n;
}
function J(s) {
  if (s == null) return null;
  if (
    (s instanceof Number && (s = s.valueOf()),
    (typeof s == 'number' && isFinite(s)) ||
      s === !0 ||
      s === !1 ||
      Object.prototype.toString.call(s) === '[object String]')
  )
    return s;
  if (s instanceof Date) return s.toISOString();
  if (Array.isArray(s)) return s.map((t) => J(t));
  if (typeof s == 'function' || typeof s == 'object') return ae(s, (t) => J(t));
  throw new Error('Data cannot be encoded in JSON: ' + s);
}
function G(s) {
  if (s == null) return s;
  if (s['@type'])
    switch (s['@type']) {
      case Ss:
      case Us: {
        const t = Number(s.value);
        if (isNaN(t)) throw new Error('Data cannot be decoded from JSON: ' + s);
        return t;
      }
      default:
        throw new Error('Data cannot be decoded from JSON: ' + s);
    }
  return Array.isArray(s)
    ? s.map((t) => G(t))
    : typeof s == 'function' || typeof s == 'object'
    ? ae(s, (t) => G(t))
    : s;
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
 */ const Y = 'functions';
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
 */ const Z = {
  OK: 'ok',
  CANCELLED: 'cancelled',
  UNKNOWN: 'unknown',
  INVALID_ARGUMENT: 'invalid-argument',
  DEADLINE_EXCEEDED: 'deadline-exceeded',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  PERMISSION_DENIED: 'permission-denied',
  UNAUTHENTICATED: 'unauthenticated',
  RESOURCE_EXHAUSTED: 'resource-exhausted',
  FAILED_PRECONDITION: 'failed-precondition',
  ABORTED: 'aborted',
  OUT_OF_RANGE: 'out-of-range',
  UNIMPLEMENTED: 'unimplemented',
  INTERNAL: 'internal',
  UNAVAILABLE: 'unavailable',
  DATA_LOSS: 'data-loss',
};
class T extends ge {
  constructor(t, n, o) {
    super(`${Y}/${t}`, n || ''), (this.details = o);
  }
}
function Ds(s) {
  if (s >= 200 && s < 300) return 'ok';
  switch (s) {
    case 0:
      return 'internal';
    case 400:
      return 'invalid-argument';
    case 401:
      return 'unauthenticated';
    case 403:
      return 'permission-denied';
    case 404:
      return 'not-found';
    case 409:
      return 'aborted';
    case 429:
      return 'resource-exhausted';
    case 499:
      return 'cancelled';
    case 500:
      return 'internal';
    case 501:
      return 'unimplemented';
    case 503:
      return 'unavailable';
    case 504:
      return 'deadline-exceeded';
  }
  return 'unknown';
}
function Fs(s, t) {
  let n = Ds(s),
    o = n,
    l;
  try {
    const a = t && t.error;
    if (a) {
      const i = a.status;
      if (typeof i == 'string') {
        if (!Z[i]) return new T('internal', 'internal');
        (n = Z[i]), (o = i);
      }
      const r = a.message;
      typeof r == 'string' && (o = r),
        (l = a.details),
        l !== void 0 && (l = G(l));
    }
  } catch {}
  return n === 'ok' ? null : new T(n, o, l);
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
 */ class Os {
  constructor(t, n, o) {
    (this.auth = null),
      (this.messaging = null),
      (this.appCheck = null),
      (this.auth = t.getImmediate({ optional: !0 })),
      (this.messaging = n.getImmediate({ optional: !0 })),
      this.auth ||
        t.get().then(
          (l) => (this.auth = l),
          () => {}
        ),
      this.messaging ||
        n.get().then(
          (l) => (this.messaging = l),
          () => {}
        ),
      this.appCheck ||
        o.get().then(
          (l) => (this.appCheck = l),
          () => {}
        );
  }
  async getAuthToken() {
    if (!!this.auth)
      try {
        const t = await this.auth.getToken();
        return t == null ? void 0 : t.accessToken;
      } catch {
        return;
      }
  }
  async getMessagingToken() {
    if (
      !(
        !this.messaging ||
        !('Notification' in self) ||
        Notification.permission !== 'granted'
      )
    )
      try {
        return await this.messaging.getToken();
      } catch {
        return;
      }
  }
  async getAppCheckToken() {
    if (this.appCheck) {
      const t = await this.appCheck.getToken();
      return t.error ? null : t.token;
    }
    return null;
  }
  async getContext() {
    const t = await this.getAuthToken(),
      n = await this.getMessagingToken(),
      o = await this.getAppCheckToken();
    return { authToken: t, messagingToken: n, appCheckToken: o };
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
 */ const V = 'us-central1';
function Bs(s) {
  let t = null;
  return {
    promise: new Promise((n, o) => {
      t = setTimeout(() => {
        o(new T('deadline-exceeded', 'deadline-exceeded'));
      }, s);
    }),
    cancel: () => {
      t && clearTimeout(t);
    },
  };
}
class Gs {
  constructor(t, n, o, l, a = V, i) {
    (this.app = t),
      (this.fetchImpl = i),
      (this.emulatorOrigin = null),
      (this.contextProvider = new Os(n, o, l)),
      (this.cancelAllRequests = new Promise((r) => {
        this.deleteService = () => Promise.resolve(r());
      }));
    try {
      const r = new URL(a);
      (this.customDomain = r.origin), (this.region = V);
    } catch {
      (this.customDomain = null), (this.region = a);
    }
  }
  _delete() {
    return this.deleteService();
  }
  _url(t) {
    const n = this.app.options.projectId;
    return this.emulatorOrigin !== null
      ? `${this.emulatorOrigin}/${n}/${this.region}/${t}`
      : this.customDomain !== null
      ? `${this.customDomain}/${t}`
      : `https://${this.region}-${n}.cloudfunctions.net/${t}`;
  }
}
function Ps(s, t, n) {
  s.emulatorOrigin = `http://${t}:${n}`;
}
function Is(s, t, n) {
  return (o) => js(s, t, o, n || {});
}
async function Ls(s, t, n, o) {
  n['Content-Type'] = 'application/json';
  let l;
  try {
    l = await o(s, { method: 'POST', body: JSON.stringify(t), headers: n });
  } catch {
    return { status: 0, json: null };
  }
  let a = null;
  try {
    a = await l.json();
  } catch {}
  return { status: l.status, json: a };
}
function js(s, t, n, o) {
  const l = s._url(t);
  return Rs(s, l, n, o);
}
async function Rs(s, t, n, o) {
  n = J(n);
  const l = { data: n },
    a = {},
    i = await s.contextProvider.getContext();
  i.authToken && (a.Authorization = 'Bearer ' + i.authToken),
    i.messagingToken && (a['Firebase-Instance-ID-Token'] = i.messagingToken),
    i.appCheckToken !== null && (a['X-Firebase-AppCheck'] = i.appCheckToken);
  const r = o.timeout || 7e4,
    d = Bs(r),
    p = await Promise.race([
      Ls(t, l, a, s.fetchImpl),
      d.promise,
      s.cancelAllRequests,
    ]);
  if ((d.cancel(), !p))
    throw new T('cancelled', 'Firebase Functions instance was deleted.');
  const c = Fs(p.status, p.json);
  if (c) throw c;
  if (!p.json) throw new T('internal', 'Response is not valid JSON object.');
  let h = p.json.data;
  if ((typeof h > 'u' && (h = p.json.result), typeof h > 'u'))
    throw new T('internal', 'Response is missing data field.');
  return { data: G(h) };
}
const ee = '@firebase/functions',
  te = '0.9.0';
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
 */ const zs = 'auth-internal',
  Js = 'app-check-internal',
  Vs = 'messaging-internal';
function Hs(s, t) {
  const n = (o, { instanceIdentifier: l }) => {
    const a = o.getProvider('app').getImmediate(),
      i = o.getProvider(zs),
      r = o.getProvider(Vs),
      d = o.getProvider(Js);
    return new Gs(a, i, r, d, l, s);
  };
  ue(new de(Y, n, 'PUBLIC').setMultipleInstances(!0)),
    Q(ee, te, t),
    Q(ee, te, 'esm2017');
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
 */ function qs(s = _e(), t = V) {
  const o = pe(H(s), Y).getImmediate({ identifier: t }),
    l = he('functions');
  return l && Ws(o, ...l), o;
}
function Ws(s, t, n) {
  Ps(H(s), t, n);
}
function R(s, t, n) {
  return Is(H(s), t, n);
}
Hs(fetch.bind(self));
const Ys = { class: 'toast toast-center toast-middle space-y-8' },
  Ks = {
    __name: 'DevSetting',
    setup(s) {
      const t = qs(),
        n = () => {
          R(t, 'getJson')()
            .then((r) => {
              console.log(r);
            })
            .catch((r) => {
              console.error(r);
            });
        },
        o = () => {
          R(t, 'earthquakeTest')()
            .then((r) => {
              console.log(r);
            })
            .catch((r) => {
              console.error(r);
            });
        },
        l = () => {
          R(t, 'getAllTokens')()
            .then((r) => {
              console.log(r);
            })
            .catch((r) => {
              console.error(r);
            });
        },
        a = () => {
          console.log('Requesting permission...'),
            Notification.requestPermission().then((r) => {
              r === 'granted' &&
                console.log('Notification permission granted.'),
                console.log(r);
            });
          const i = Ce();
          xe(i, {
            vapidKey:
              'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
          })
            .then((r) => {
              console.log(
                r ||
                  'No registration token available. Request permission to generate one.'
              );
            })
            .catch((r) => {
              console.log('An error occurred while retrieving token. ', r);
            });
        };
      return (i, r) => (
        _(),
        m('div', Ys, [
          e('button', { class: 'btn btn-lg', onClick: n }, 'getJson'),
          e('button', { class: 'btn btn-lg', onClick: o }, 'Earthquake Test'),
          e(
            'button',
            { class: 'btn btn-lg', onClick: a },
            'getLoginUserFCMToken'
          ),
          e('button', { class: 'btn btn-lg', onClick: l }, 'getFCMTokens'),
        ])
      );
    },
  },
  Xs = { class: 'h-full' },
  sn = O({
    __name: 'index',
    setup(s) {
      const t = $e(),
        { groups: n, setGroups: o } = W(),
        { location: l, updateLocation: a, uploadLocation: i } = ke(),
        { permission: r } = ye(),
        { getUsers: d } = P(),
        { moveCenter: p } = q(),
        c = D(0),
        h = D(0),
        g = D(!1),
        w = 3e4,
        v = (k) => {
          f(k), p(l.value);
        },
        f = (k) => {
          a({ lat: k.coords.latitude, lng: k.coords.longitude }),
            (h.value = k.timestamp),
            (g.value = !0);
        };
      return (
        navigator.geolocation.watchPosition(f, null, {
          enableHighAccuracy: !0,
        }),
        setInterval(() => {
          h.value - c.value >= w &&
            r.value === !0 &&
            g.value === !0 &&
            ((c.value = h.value), (g.value = !1), i()),
            d();
        }, 3e4),
        o(JSON.parse(localStorage.getItem('groups'))),
        n.value == null &&
          (o([]), localStorage.setItem('groups', JSON.stringify(n.value))),
        Notification.requestPermission(),
        se(() => {
          navigator.geolocation.getCurrentPosition(v, null, {
            enableHighAccuracy: !0,
          });
        }),
        (k, y) => {
          const C = pt,
            I = Ot,
            K = Es,
            ce = Ks;
          return (
            _(),
            m('div', Xs, [
              u(t) === 'Map' ? (_(), S(C, { key: 0 })) : B('', !0),
              u(t) === 'Setting' ? (_(), S(I, { key: 1 })) : B('', !0),
              u(t) === 'Groups' ? (_(), S(K, { key: 2 })) : B('', !0),
              u(t) === 'DevSetting' ? (_(), S(ce, { key: 3 })) : B('', !0),
            ])
          );
        }
      );
    },
  });
export { sn as default };
