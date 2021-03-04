import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  _userinfoObj = null // 用户信息
  _userLoadConfigJson = null // 用户详细信息
  _token = null
  _routeScroll: any = {} // 记录路由位置 用于切换路由时候修改滚动位置  ps:如果用了viwebox 那个这个滚动位置需要保存viwebox的！！！！
  _loginDialogVisible = false

  @Mutation
  set_userinfo(obj: any) {
    // 登录后的一些信息
    this._userinfoObj = obj
  }

  @Mutation
  set_loadConfigJson(obj: any) {
    this._userLoadConfigJson = obj
  }

  @Mutation
  set_user_token(obj: any) {
    this._token = obj
  }

  @Mutation
  set_route_scroll(obj: any) {
    this._routeScroll[obj.name] = obj.scroll || 0
  }

  @Mutation
  set_login_dialog_visible(isShow: boolean) {
    this._loginDialogVisible = isShow
  }

  get userinfoObj(): any {
    return Object.assign({}, this._userinfoObj)
  }

  get userLoadConfigJson(): any {
    return this._userLoadConfigJson
  }

  get token(): any {
    return this._token
  }

  get routeScroll(): any {
    return Object.assign({}, this._routeScroll)
  }

  get loginDialogVisible(): any {
    return this._loginDialogVisible
  }
}
