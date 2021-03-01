import { Plugin } from '@nuxt/types'
const pulgin: Plugin = function ({ $axios, $message, $alert }) {
  $axios.onResponse((responseObj) => {
    // eslint-disable-next-line no-console
    const resData = responseObj.data
    const code = resData.status * 1 // 强转数字
    const msg = resData.msg || ''
    if (code === 200) {
      return resData.body
    } else {
      $message.error(code === 500 ? '服务端异常' : msg)
    }
  })

  $axios.onError((responseError) => {
    const resData = responseError?.response?.data || {}
    const code = resData.code * 1 // 强转数字
    const msg = resData.msg || ''
    if (responseError.message === 'Network Error') {
      $message.error('网络异常')
      return
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
      $alert('当前网络存在异常，请重试', '提示')
      return
    }
    switch (responseError.request.status * 1) {
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
        $alert('登录状态已过期，请重新登录', '提示')
        break
      default:
        $message.error(code === 500 ? '服务端异常' : msg)
    }
  })
}

export default pulgin
