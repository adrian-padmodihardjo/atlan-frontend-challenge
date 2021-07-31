module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'operator-linebreak': ['error', 'before'],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
        allowFirstLine: true,
      },
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
  },
}
