import {
  b as w,
  s as i,
  f as r,
  j as s,
  k as B,
  u as t,
  l as c,
  p,
  x as m,
  H as _,
  t as x,
  o as d,
} from './entry.192ecaba.js';
import { s as C, c as F } from './firebaseAuthState.9ed8168b.js';
import './userInfoState.7308cf64.js';
import './index.esm2017.cd6d08be.js';
const k = { class: 'grid content-center my-auto py-auto h-full' },
  h = { class: 'card w-96 shadow-xl m-auto' },
  D = { class: 'card-body' },
  E = { class: 'tabs m-auto' },
  g = { class: 'form-control w-full max-w-xs' },
  A = s(
    'label',
    { class: 'label' },
    [
      s(
        'span',
        { class: 'label-text' },
        '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9'
      ),
    ],
    -1
  ),
  U = s(
    'label',
    { class: 'label' },
    [s('span', { class: 'label-text' }, '\u30D1\u30B9\u30EF\u30FC\u30C9')],
    -1
  ),
  V = { key: 0 },
  T = s(
    'label',
    { class: 'label' },
    [s('span', { class: 'label-text' }, '\u540D\u524D')],
    -1
  ),
  j = { class: 'card-actions justify-end' },
  H = w({
    __name: 'login',
    setup(I) {
      const l = i('\u30ED\u30B0\u30A4\u30F3'),
        a = i(''),
        o = i(''),
        n = i(''),
        b = (v) => {
          l.value = v;
        },
        f = () => C(a.value, o.value),
        y = () => F(a.value, o.value, n.value);
      return (v, e) => (
        d(),
        r('div', k, [
          s('div', h, [
            s('div', D, [
              s('div', E, [
                s(
                  'a',
                  {
                    class: B([
                      'tab',
                      { 'tab-active': t(l) === '\u30ED\u30B0\u30A4\u30F3' },
                    ]),
                    onClick:
                      e[0] || (e[0] = (u) => b('\u30ED\u30B0\u30A4\u30F3')),
                  },
                  '\u30ED\u30B0\u30A4\u30F3',
                  2
                ),
                s(
                  'a',
                  {
                    class: B([
                      'tab',
                      { 'tab-active': t(l) === '\u65B0\u898F\u767B\u9332' },
                    ]),
                    onClick:
                      e[1] || (e[1] = (u) => b('\u65B0\u898F\u767B\u9332')),
                  },
                  '\u65B0\u898F\u767B\u9332',
                  2
                ),
              ]),
              s('div', g, [
                s('div', null, [
                  A,
                  c(
                    s(
                      'input',
                      {
                        'onUpdate:modelValue':
                          e[2] || (e[2] = (u) => (m(a) ? (a.value = u) : null)),
                        type: 'email',
                        placeholder: 'Type here',
                        class: 'input input-bordered w-full max-w-xs',
                      },
                      null,
                      512
                    ),
                    [[p, t(a)]]
                  ),
                ]),
                s('div', null, [
                  U,
                  c(
                    s(
                      'input',
                      {
                        'onUpdate:modelValue':
                          e[3] || (e[3] = (u) => (m(o) ? (o.value = u) : null)),
                        type: 'password',
                        placeholder: 'Type here',
                        class: 'input input-bordered w-full max-w-xs',
                      },
                      null,
                      512
                    ),
                    [[p, t(o)]]
                  ),
                ]),
                t(l) === '\u65B0\u898F\u767B\u9332'
                  ? (d(),
                    r('div', V, [
                      T,
                      c(
                        s(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[4] ||
                              (e[4] = (u) => (m(n) ? (n.value = u) : null)),
                            type: 'text',
                            placeholder: 'Type here',
                            class: 'input input-bordered w-full max-w-xs',
                          },
                          null,
                          512
                        ),
                        [[p, t(n)]]
                      ),
                    ]))
                  : _('', !0),
              ]),
              s('div', j, [
                t(l) === '\u30ED\u30B0\u30A4\u30F3'
                  ? (d(),
                    r(
                      'button',
                      { key: 0, class: 'btn btn-primary', onClick: f },
                      x(t(l)),
                      1
                    ))
                  : t(l) === '\u65B0\u898F\u767B\u9332'
                  ? (d(),
                    r(
                      'button',
                      { key: 1, class: 'btn btn-primary', onClick: y },
                      x(t(l)),
                      1
                    ))
                  : _('', !0),
              ]),
            ]),
          ]),
        ])
      );
    },
  });
export { H as default };
