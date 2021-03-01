// 主要负责登陆 保存用户信息

import {
  getUserinfo,
  setTokenInfo,
  setTokenSessionStorage,
  clearAll,
  setUserinfo,
} from '@/utils/passwordManagement'
import { SERVER_PATH } from '~/config'
import { $axios as api } from '~/utils/api'
import { userStore } from '~/utils/store-accessor'

const serverpath = SERVER_PATH
export async function loginAjax(
  userDatas: { username: any; password: any },
  success: { (token: any, expiresIn: any): void; (arg0: any, arg1: any): any },
  error?: any
) {
  try {
    let data: any = await api.post<any>(serverpath + 'login', {
      username: userDatas.username,
      password: userDatas.password,
    })
    data = data.data.body
    success && success(data.token, data.expiresIn)
    getUser()
    userStore.set_login_dialog_visible()
  } catch (e) {
    const { XMLHttpRequest, textStatus, errorThrown } = e
    clearAll()
    error && error(XMLHttpRequest, textStatus, errorThrown)
  }

  // , {
  //   headers: {
  //     ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'
  //   },
  //   transformRequest: [function (data) {
  //     let ret = []
  //     for (let it in data) {
  //       ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
  //     }
  //     return ret.join("&")
  //   }]
  // }
}

// 获取用户信息
export async function getUser() {
  const userDetail = await api.get(serverpath + 'user/detail')
  setUserinfo(userDetail)
}

export function exit() {
  clearAll()
  // this.$message.success("退出成功");
  window.location.href = '/'
}
export async function autoUserLogin() {
  const { username, password } = getUserinfo()
  if (username && password) {
    await loginAjax({ username, password }, (token: any, expiresIn: any) => {
      setTokenInfo(token, expiresIn)
    })
  }
}
export function setTokenAndGetConfig(_token: any) {
  setTokenSessionStorage(_token)
  return Promise.resolve()
  // return getUserLoadConfigJson()
}

export async function userLoginAndGetConfig(): Promise<void> {
  await autoUserLogin()
  //   getUserLoadConfigJson().then(() => {
  //     a()
  //   }, () => {
  //     b()
  //   })
}
