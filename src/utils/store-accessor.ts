/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserModule from '~/store/user'
import SystemModule from '~/store/system'
let userStore: UserModule
let systemStore: SystemModule
function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserModule, store)
  systemStore = getModule(SystemModule, store)
}

export { initialiseStores, userStore, systemStore }
