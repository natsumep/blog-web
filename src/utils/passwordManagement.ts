/**
 * 主要用于获取本地存储 和 写入;
 *
 * 后续如果需要可以开放其他的数据获取 和写入
 *
 */
import Cookies from 'js-cookie'
import { getLocal, setLocal, removeLocal } from '~/utils/session' //
import encryption from '~/utils/encryption' // 加密解密
import { userStore } from '~/utils/store-accessor'
import { $axios as api } from '~/utils/api'
const KEY = 'CPTBTPTPBCPTDTPT'

// 设置local信息
export function setLocalInfo(key: string, value: any) {
  if (value) {
    try {
      const string = JSON.stringify(value)
      const userInfo = _encryptInfo(string)
      setLocal(key, userInfo)
    } catch (error) {}
  } else {
    removeLocal(key)
  }
}

// 加密
function _encryptInfo(string: string) {
  const str = encryption.encrypt(string, KEY)
  return str
}

// 获取用户信息
export function getUserinfo(): any {
  const string = getLocal('_u') // 用户账号 密码
  try {
    if (!string) {
      return false
    }
    // let decryptInfo = encryption.decrypt(string, KEY);
    return JSON.parse(string)
  } catch (e) {
    return false
  }
}

// 设置用户信息
export function setUserinfo(userObj: any) {
  setLocalInfo('_u', userObj)
  userStore.set_userinfo(userObj)
}

// 设置token 信息
export function setTokenInfo(token: string, time: number) {
  const day = new Date(time)

  Cookies.set('_t', token, { expires: day })
  setTokenSessionStorage(token)
}

export function getTokenInfo() {
  const tokenInfo: any = Cookies.get('_t')
  try {
    if (!tokenInfo || tokenInfo === 'undefined') {
      return {
        isPass: false,
      }
    }
    // tokenInfo = encryption.decrypt(tokenInfo, KEY);
    const tokenObj: any = { token: tokenInfo, isPass: true }
    return tokenObj
  } catch (e) {
    clearAll()
    return {
      isPass: false,
    }
  }
}

export function setTokenSessionStorage(value: any) {
  if (value) {
    setVuexToken(value)
  }
  api.setHeader('authorization', `Bearer ${value}`)
}

export function getVuexToken() {
  return userStore.token || Cookies.get('_t')
}

export function setVuexToken(token = Cookies.get('_t')) {
  userStore.set_user_token(token)
}

export function clearAll() {
  setVuexToken()
  removeLocal('_u')
  Cookies.remove('_t')
}
