export function getNumb() {
  const num: any = []
  for (let i = 0; i < 10; i++) {
    const val = Math.ceil(Math.random() * 30)
    let isEqu = false
    for (const idx in num) {
      if (num[idx] === val) {
        isEqu = true
        break
      }
    }
    if (isEqu) i--
    else num[num.length] = val
  }
  return num
}

export function assert(condition: any, msg: any) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
