import { Plugin } from '@nuxt/types'
const pulgin: Plugin = function ({ $axios }) {
  $axios.onResponse((responseObj) => {
    // eslint-disable-next-line no-console
    const resData = responseObj.data
    const code = resData.status * 1 // 强转数字
    if (code === 200) {
      return resData.body
    } else {
      return {}
    }
  })
}

export default pulgin
