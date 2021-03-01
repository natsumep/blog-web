export function setLocal(key: string, val: any) {
  localStorage.setItem(key, val)
}

export function getLocal(key: string) {
  return localStorage.getItem(key) || null
}

export function removeLocal(key: string) {
  localStorage.removeItem(key)
}

export function clearLocals() {
  localStorage.clear()
}
