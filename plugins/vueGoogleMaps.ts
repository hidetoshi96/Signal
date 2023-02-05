import VueGoogleMaps from '@fawmi/vue-google-maps';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBYMH9eVYOmIiAHosJZ5Q8zQvVBIfURG7E',
    },
  });
});
