import { throttle } from 'lodash'
import { systemStore } from '~/utils/store-accessor'
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 ** 只在生产模式的客户端中使用
 */
if (process.client) {
  function checkIsWeb() {
    const width = document.documentElement.offsetWidth
    if (width < 800) {
      return false
    }
    return true
  }
  window.addEventListener(
    'resize',
    throttle((e) => {
      systemStore.set_web(checkIsWeb())
    }, 300)
  )
  window.addEventListener('load', () => {
    systemStore.set_web(checkIsWeb())
  })
}
