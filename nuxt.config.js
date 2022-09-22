export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  head: {
    script: [
      {
        src: "https://plausible.io/js/plausible.js",
        data-domain: "Juls07.dev",
        defer: true
      },
    ],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    //'@nuxtjs/google-analytics',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /*googleAnalytics: {
    id: 'UA-183042760-3',
    layer: 'dataLayer',
    pageTracking: true,
    debug: {
      sendHitTask: true // true
    },
    set: [
      { field: 'anonymizeIp', value: true }
    ]
  },*/

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content'
    //'@nuxtjs/gtm'
  ],

 // gtm: {
 //   id: 'GTM-5M6WL6M'
 // },

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
