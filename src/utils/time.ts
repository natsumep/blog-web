export function dateFormat(fmt: string, date: string | number | Date) {
  date = new Date(+date)
  let ret
  const opt: any = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

/*
 ** 时间戳显示为多少分钟前，多少天前的处理
 ** eg.
 ** console.log(dateDiff(1411111111111));  // 2014年09月19日
 ** console.log(dateDiff(1481111111111));  // 9月前
 ** console.log(dateDiff(1499911111111));  // 2月前
 ** console.log(dateDiff(1503211111111));  // 3周前
 ** console.log(dateDiff(1505283100802));  // 1分钟前
 */
export function dateDiff(timestamp: number) {
  // 补全为13位
  const arrTimestamp = (timestamp + '').split('')
  for (let start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0'
    }
  }
  timestamp = Number(arrTimestamp.join(''))

  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - timestamp

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前'
  }

  // 计算差异时间的量级
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute

  // 数值补0方法
  const zero = function (value: number) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (function () {
      const date = new Date(timestamp)
      return (
        date.getFullYear() +
        '年' +
        zero(date.getMonth() + 1) +
        '月' +
        zero(date.getDate()) +
        '日'
      )
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC + '') + '月前'
  } else if (weekC >= 1) {
    return parseInt(weekC + '') + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC + '') + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC + '') + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC + '') + '分钟前'
  }
  return '刚刚'
}

// dateFormat("YYYY-mm-dd HH:MM", date)
