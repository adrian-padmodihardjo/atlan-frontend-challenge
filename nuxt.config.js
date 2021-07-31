export default {
  target: 'static',
  head: {
    title: 'atlan-frontend-challenge',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: [
  ],
  plugins: [
  ],
  components: false,
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  build: {
    extend (config) {
      const csvLoaderRule = {
        test: /\.csv$/,
        loader: './webpacks/csv-to-json.loader.js',
      }
      config.module.rules.unshift(csvLoaderRule)
    },
  },
}
