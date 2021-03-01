const strategies: any = {
  required(val: string, errMsg: any) {
    if (val === '') {
      return errMsg
    }
  },
  isLongThan(val: any, len: any, errMsg: any) {
    if (val === len) {
      return errMsg
    }
  },
  isRepeat(val: any[], len: any, errMsg: any) {
    const isRepeat = val.some((item: any) => {
      return item === len
    })
    if (isRepeat) {
      return errMsg
    }
  },
  isMobile(val: string, errMsg: any) {
    // var isMobile = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[0-9])[0-9]{8}$/g;
    const isMobile = /(^1[3|4|5|7|8][0-9]{9}$)/
    if (!isMobile.test(val)) {
      return errMsg
    }
  },
  isLineNumber(val: string, errMsg: any) {
    const isMobile = /^\s*\d+-?\d+\s*$/
    if (!isMobile.test(val)) {
      return errMsg
    }
  },
  limitTitle(val: string | any[], errMsg: any) {
    // 富文本编辑器验证title
    if (val.length < 5 || val.length > 30) {
      return errMsg
    }
  },
  limitContent(val: any, errMsg: any) {
    // 富文本编辑器验证content
    if (
      val.replace(/<h2[^>]*>.*<\/h2>/i, '').replace(/<\/?[^>]*>/g, '').length <
      10
    ) {
      return errMsg
    }
  },
  isNumber(val: number, errMsg: any) {
    if (!Math.trunc(val) && Math.trunc(val) !== 0) {
      return errMsg
    }
  },
}

/**
 * 接受验证的数组
            [{
                value: this.modalData.datas.keywordInput,
                rules: [{
                    rule: 'required',
                    msg: '关键词不能为空'
                }]
            }]
 */
export const validate = function (arr: any) {
  let obj: any = {
    status: true,
  }
  for (let i = 0, l1 = arr.length; i < l1; i++) {
    const item = arr[i]
    let stop = false
    for (let k = 0, l2 = item.rules.length; k < l2; k++) {
      const r = item.rules[k]
      const arg = r.rule.split(':')
      const rule = arg.shift()
      if (r.type) {
        arg.unshift(r.type)
      }
      arg.unshift(item.value)
      arg.push(r.msg)
      const status = strategies[rule].apply(null, arg)
      if (status) {
        obj = {
          value: item.value,
          status: false,
          msg: status,
        }
        stop = true
        break
      }
    }
    if (stop) break
  }
  return obj
}
