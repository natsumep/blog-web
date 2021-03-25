// import path from 'path'
// import fs from 'fs'
import { SERVER_PATH, SERVER_USER_PATH } from './src/config'
export default {
  srcDir: 'src/',
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '博客',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'description',
        content:
          '一个包含技术问答、博客、前端、后端、web、html、css、javascript、typescript、后端的技术交流平台。你可以编写博客、提问、访问开放api。',
      },
      {
        name: 'keywords',
        content:
          '技术问答,博客,前端,后端,web,html,css,javascript,typescript,后端,nuxt,开发者社区,技术笔记,api',
      },
      {
        name: 'viewport',
        content:
          'initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/style.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios.client',
    '@/plugins/axios',
    '@/plugins/axios.server',
    '@/plugins/axios-accessor',
    '@/plugins/visit-view.client',
    '@/plugins/onInit',
    // '@/plugins/ba.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', extensions: ['vue'], ignore: ['*.client.vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // retry: { retries: 3 },
    baseURL: SERVER_PATH,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: SERVER_PATH,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: SERVER_USER_PATH,
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh-CN',
    },
  },
  // router: {
  //   // middleware: 'view',
  //   middleware: 'auth',
  // },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // typesript
  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}',
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 静态分析使用 分析结果可在 http://localhost:8888 上查看。
    // analyze: {
    //   analyzerMode: 'static',
    // },
    transpile: [/^element-ui/, /^validator/],
    // 默认: true 为开发模式(development)， false 为生产模式(production)。
    // cssSourceMap: true,
  },
  cli: {
    bannerColor: 'red',
  },

  // server: {
  //   // https: {
  //   //   key: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.key')),
  //   //   cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.crt')),
  //   // },
  // },
}
