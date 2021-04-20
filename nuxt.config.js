// import path from 'path'
// import fs from 'fs'
import { SERVER_PATH, SERVER_USER_PATH } from './src/config'
export default {
  srcDir: 'src/',
  server: {
    host: '0.0.0.0', // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '博客铺子 _ store',
    meta: [
      { charset: 'utf-8' },
      // google 验证
      {
        name: 'google-site-verification',
        content: 'EXeON780PopcgKRsKvtGqt_I0J6NYIKG_9eBJD8LK8c',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '一个包含技术问答、博客、前端、后端、web、html、css、javascript、typescript、后端的技术交流平台。你可以编写博客、提问、访问开放api。',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          '技术问答,博客,前端,后端,web,html,css,javascript,typescript,后端,nuxt,开发者社区,技术笔记,api,彩虹屁,句子,句子杂货铺',
      },
      {
        name: 'viewport',
        content:
          'initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: '博客铺子 _ store',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: '博客铺子 _ store',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        property: 'og:url',
        content: 'https://www.tinker.run/',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: '/icon.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/style.less',
    '@/normalize.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios.client',
    '@/plugins/axios',
    '@/plugins/axios.server',
    '@/plugins/axios-accessor',
    '@/plugins/visit-view.client',
    '@/plugins/browser-init.client',
    '@/plugins/onInit',
    '@/plugins/ba.client',
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
  render: {
    compressor: false,
  },
  // server: {
  //   // https: {
  //   //   key: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.key')),
  //   //   cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.crt')),
  //   // },
  // },
}
