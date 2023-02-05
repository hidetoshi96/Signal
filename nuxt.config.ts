// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@kevinmarrec/nuxt-pwa'],
  pwa: {
    icon: {
      source: 'static/icon.png',
      sizes: [512],
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
          src: '/_nuxt/icons/512x512.maskable.43d27045.png',
          sizes: '512*512',
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
