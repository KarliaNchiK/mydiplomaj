module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'AJ',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  telemetry: false,
  loading: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],
  purgeCSS: { whitelist: [ "aos-init", "aos-animate", "data-aos-delay", "data-aos-duration", "fade-up", "fade-left", "fade-right", "flip-left", ], },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vuetify.js',
    { src: '~plugins/library.js', ssr: false },
    '@plugins/global_components',
    { src: '@/plugins/aos', ssr: false },
    { src: '@/plugins/scrolls', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    'nuxt-helmet',
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage'
  ],
  axios: {
    baseURL: 'http://localhost:3000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  router:{
    //base:'/dist/',
    middleware:["mobile"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
