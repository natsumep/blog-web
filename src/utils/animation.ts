export function easeout(A: any, B: any, rate: any, callback: any) {
  if (A === B || typeof A !== 'number') {
    return
  }
  B = B || 0
  rate = rate || 2
  const step = function () {
    A = A + (B - A) / rate
    if (A < 1) {
      callback(B, true)
      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}
