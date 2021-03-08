/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-unused-vars
  // const _hmt = (window as any)._hmt || []
  ;(function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?33ee44d7f5f6d433675eda12e658fdc8'
    const s: any = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}
