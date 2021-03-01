import { NuxtAxiosInstance } from '@nuxtjs/axios'

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance
// eslint-disable-next-line import/no-mutable-exports
let $api: any
export function initializeAxios(axiosInstance: NuxtAxiosInstance, api: any) {
  $axios = axiosInstance
  $api = api
}

export { $axios, $api }
