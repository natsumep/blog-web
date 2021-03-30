import Vue from 'vue'
// ts-shim.d.ts
import { NuxtAxiosInstance } from '@nuxtjs/axios'
declare module '*.vue' {
  export default Vue
}
declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
    $api: any
    $message: any
    $msgbox: any
    $alert: any
    $confirm: any
    $prompt: any
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $api: any
  }
}
