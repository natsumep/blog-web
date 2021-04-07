import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'system',
  stateFactory: true,
  namespaced: true,
})
export default class SystemModule extends VuexModule {
  _isWeb = true

  @Mutation
  set_web(isweb: any) {
    // 登录后的一些信息
    this._isWeb = isweb
  }

  get isWeb(): any {
    return this._isWeb
  }
}
