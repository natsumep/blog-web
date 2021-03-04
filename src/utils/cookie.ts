export function getCookie(cookie: string, cname: string) {
  const name = cname + '='
  const ca = cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}
