export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Juls07',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google', content: 'notranslate'},
      { hid: 'description', name: 'description', content: 'Juls07 is a game developer, web developer and pixel artist.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/og.png' },
      { property: 'og:title', content: 'Juls07' },
      { property: 'og:description', content: "Juls07's website" },
      { property: 'og:url', content: 'https://juls07.dev' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap', as: 'style', onload: 'this.onload=null;this.rel="stylesheet"', async: true, defer: true }
    ]
  },

  server: {
    port: 8000,
    host: '0.0.0.0'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/lineNumbers.js'}],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  googleAnalytics: {
    id: 'UA-183042760-3',
    layer: 'dataLayer',
    pageTracking: true,
    debug: {
      sendHitTask: true // true
    },
    set: [
      { field: 'anonymizeIp', value: true }
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/gtm'
  ],

  gtm: {
    id: 'GTM-5M6WL6M'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
  postcss: {
    // Add plugin names as key and arguments as value
    // Install them before as dependencies with npm or yarn
    plugins: {
      // Disable a plugin by passing false as value
      'postcss-url': false,
      'postcss-nested': {},
      'postcss-responsive-type': {},
      'postcss-hexrgba': {},
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {}
    },
    preset: {
      // Change the postcss-preset-env settings
      autoprefixer: {
        grid: true
      }
    }
  },
}
