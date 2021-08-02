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
    '@/assets/stylesheet/preflight.scss',
  ],
  plugins: [
  ],
  components: false,
  buildModules: [
    '@nuxtjs/eslint-module',
    'svg-to-vue-component/nuxt',
  ],
  build: {
    extend (config) {
      const csvLoaderRule = {
        test: /\.csv$/,
        oneOf: [
          {
            resourceQuery: /headers/,
            loader: './webpacks/csv-header-to-json.loader.js',
          },
          {
            loader: './webpacks/csv-to-json.loader.js',
          },
        ],
      }
      config.module.rules.unshift(csvLoaderRule)
    },
  },
}
