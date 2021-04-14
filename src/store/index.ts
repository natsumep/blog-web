import { Store } from 'vuex'
import { getCookie } from '~/utils/cookie'
import { isWeb } from '~/utils/browser'
import {
  initialiseStores,
  userStore,
  systemStore,
} from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]

export * from '~/utils/store-accessor'

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async nuxtServerInit({ commit }: any, { app, req, $api }: any) {
    if (process.server) {
      const userToken = getCookie(req.headers.cookie, '_t')
      if (userToken) {
        try {
          const userDetail = await $api['user/detail']()
          userStore.set_userinfo(userDetail)
          userStore.set_user_token(userToken)
        } catch (e) {}
      }
      systemStore.set_web(isWeb(req.headers['user-agent']))
      // const token = req.;
    }
  },
}
