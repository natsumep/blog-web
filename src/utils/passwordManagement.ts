/**
 * 主要用于获取本地存储 和 写入;
 *
 * 后续如果需要可以开放其他的数据获取 和写入
 *
 */
import { getLocal, setLocal, removeLocal } from '~/utils/session' //
import encryption from '~/utils/encryption' // 加密解密
import { userStore } from '~/utils/store-accessor'
import { $axios as api } from '~/utils/api'

const KEY = 'CPTBTPTPBCPTDTPT'
const TOKEN_PASS_TIME = 1000 * 60 * 60 * 12

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
  const tokenInfo = {
    token,
    createTime: time || +new Date() - 1000 * 60,
  } // 设置token 过期时间

  setLocalInfo('_t', token && tokenInfo)
  setTokenSessionStorage(token)
}

function _checkTokenTime(time: number) {
  const newDate = +new Date()
  if (newDate - time > TOKEN_PASS_TIME) {
    return false
  } else {
    return true
  }
}

export function getTokenInfo() {
  let tokenInfo: any = getLocal('_t') // 用户账号 密码
  try {
    if (!tokenInfo || tokenInfo === 'undefined') {
      return {
        isPass: false,
      }
    }
    // tokenInfo = encryption.decrypt(tokenInfo, KEY);
    tokenInfo = JSON.parse(tokenInfo)
    const flag = _checkTokenTime(tokenInfo.createTime)
    const tokenObj: any = { token: tokenInfo.token }
    if (flag) {
      tokenObj.isPass = true
    } else {
      tokenObj.isPass = false
    }
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
  return userStore.token || getLocal('_t')
}

export function setVuexToken(token = getLocal('_t')) {
  userStore.set_user_token(token)
}

export function clearAll() {
  setVuexToken()
  removeLocal('_u')
  removeLocal('_t')
}
