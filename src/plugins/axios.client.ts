import { Plugin } from '@nuxt/types'
import { Message as $message, MessageBox } from 'element-ui'
import { userStore } from '~/store'
// , $message, $alert
const pulgin: Plugin = function (content) {
  const { $axios } = content
  $axios.onRequest((config) => {
    const token = userStore.token
    if (token) config.headers.Authorization = 'Bearer ' + token
    // 其他的请求前业务逻辑 比如：api map
    return config
  })
  $axios.onResponse((responseObj) => {
    // eslint-disable-next-line no-console
    const resData = responseObj.data
    const code = resData.status * 1 // 强转数字
    // const msg = resData.msg || ''
    if (code === 200) {
      return resData.body
    } else {
      // $message.error(code === 500 ? '服务端异常' : msg)
      return Promise.reject(responseObj)
    }
  })

  $axios.onError((responseError: any) => {
    const config = responseError.config || {}
    const resData = responseError?.data || responseError?.request || {}

    if (responseError.message === 'Network Error') {
      !config.notShowError && $message.error('网络异常')
      return Promise.reject(resData)
    }
    if (
      responseError.code === 'ECONNABORTED' &&
      responseError.message.includes('timeout')
    ) {
      /* return new Promise(() => {
        let promise = new Promise(function () {
          api[responseError.config.apiName]({
            ...responseError.config.params
          }).then((data) => {
            a(data)
          }, () => {
            b()
          })
        })
        GLOBAL.vbus.$emit('global.$dialog.confim', {
          title: "提示",
          content: "当前网络存在异常，是否从新发起请求",
          fn: promise
        }, a, b);
      }) */
      !config.notShowError &&
        MessageBox.alert('当前网络存在异常，请重试', '提示')
      return Promise.reject(resData)
    }
    const code = resData.code * 1 || resData.status // 强转数字
    const msg = resData.msg || ''
    switch (code) {
      case 401:
        // userLoginAndGetConfig().then(() => {
        //   api[responseError.config.apiName]({
        //     ...responseError.config.params
        //   }).then((data) => {
        //     a(data)
        //   }, () => {
        //     b()
        //   })
        // }, () => {
        //   b(responseError);
        // })
        !config.notShowError && $message.error('登录状态已过期，请重新登录')
        break
      default:
        !config.notShowError && $message.error(code <= 500 ? '服务端异常' : msg)
    }
    return Promise.reject(resData)
  })
}

export default pulgin
