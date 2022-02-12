export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'api-builder',
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
    ],
    script: []
  },

  loading: {
    color: 'blue',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    ['nuxt-buefy', { css: false, }],
    '@nuxtjs/auth-next'
  ],

  router: {
    middleware: ['auth']
  },

  i18n: {},

  auth: {
    strategies: {
      local: {
        token: {
          maxAge: 1800,
          // maxAge: 28800,
        },
        user: {
          property: 'user',
         // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login/admin', method: 'post' },
          user: { url: '/api/v1/users/current', method: 'get' },
          logout: { url: '/api/auth/logout', method: 'post' }
        },
        // autoLogout: false
      }
    }
  },

  // Server Middleware
  serverMiddleware: {
    '/api': '~/api'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
