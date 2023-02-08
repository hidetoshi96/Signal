module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
  },
};
