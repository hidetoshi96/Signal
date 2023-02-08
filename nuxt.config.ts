// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@kevinmarrec/nuxt-pwa'],
  pwa: {
    icon: {
      source: 'static/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    meta: {
      lang: 'ja',
    },
    manifest: {
      name: 'シグナル',
      short_name: 'シグナル',
      lang: 'ja',
      icons: [
        {
          src: '/_nuxt/icons/64x64.maskable.320027f5.png',
          sizes: '64x64',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/120x120.maskable.320027f5.png',
          sizes: '120x120',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/144x144.maskable.320027f5.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/152x152.maskable.320027f5.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/192x192.maskable.320027f5.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/384x384.maskable.320027f5.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/_nuxt/icons/512x512.maskable.320027f5.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      enabled: true,
      templatePath: '~/static/firebase-messaging-sw.js',
    },
  },
  build: { transpile: ['@fawmi/vue-google-maps'] },
  ssr: false,
});
