import { ad as g, ae as y, af as m, ag as M } from './entry.192ecaba.js';
import {
  u as d,
  g as k,
  s as l,
  r as o,
  a as U,
  c as f,
  i as h,
} from './userInfoState.7308cf64.js';
import { g as F, a as v } from './index.esm2017.cd6d08be.js';
const x = async (t, a, i) => {
    const c = g(),
      w = F(),
      e = d();
    return await y(c, t, a).then(async (n) => {
      e.value = { id: n.user.uid, name: i, message: '', urgency: '0' };
      const s = k();
      l(o(s, `users/${n.user.uid}`), { name: i, message: '', urgency: '0' });
      const u = await v(w, {
        vapidKey:
          'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
      });
      l(o(s, `FCMTokens/${n.user.uid}`), { FCMToken: u }), await m('/');
    });
  },
  D = async (t, a) => {
    const i = d(),
      c = g();
    return await M(c, t, a).then(async (e) => {
      const r = k();
      await U(f(o(r), `users/${e.user.uid}`)).then((s) => {
        i.value = {
          id: e.user.uid,
          name: s.val().name,
          message: s.val().message,
          urgency: s.val().urgency,
        };
      });
      const n = F();
      v(n, {
        vapidKey:
          'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
      }).then((s) => {
        const u = {};
        (u[`FCMTokens/${e.user.uid}/FCMToken`] = s), h(o(r), u);
      }),
        await m('/');
    });
  },
  I = async () => {
    await g().signOut();
    const a = d();
    (a.value = null), await m('/login');
  };
export { I as a, x as c, D as s };
