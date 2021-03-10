import { Plugin } from '@nuxt/types'
import { getCookie } from '~/utils/cookie'

const pulgin: Plugin = function ({ $axios, req, error }) {
  $axios.onRequest((config) => {
    const token = getCookie(req?.headers?.cookie as string, '_t')
    if (token) config.headers.Authorization = 'Bearer ' + token
    // 其他的请求前业务逻辑 比如：api map
    return config
  })
  $axios.onResponse((responseObj) => {
    // eslint-disable-next-line no-console
    const resData = responseObj.data
    const code = resData.status * 1 // 强转数字
    if (code === 200) {
      return resData.body
    } else {
      return Promise.reject(responseObj)
    }
  })
  $axios.onError((responseError: any) => {
    const resData = responseError?.data || responseError?.request || {}
    const code = resData.code * 1 || resData.status // 强转数字
    const msg = resData.msg || '服务端异常'
    if (code >= 500) {
      error({
        statusCode: 500,
        message: msg,
      })
    }
  })
}

export default pulgin
