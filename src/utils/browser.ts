export function isSupportWebp() {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp', 0.5)
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
export function getUrlParam(paraName?: string, url = location.href) {
  const arrObj = url.split('?')
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&')
    let arr
    const para: any = {}
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null) {
        if (paraName && arr[0] === paraName) {
          return arr[1]
        } else {
          para[arr[0]] = arr[1]
        }
      }
    }
    return paraName ? para[paraName] : para
  } else {
    return paraName ? undefined : {}
  }
}

export function isWeb(userAgent: string) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    // true for mobile device
    return false
  } else {
    // false for not mobile device
    return true
  }
}
