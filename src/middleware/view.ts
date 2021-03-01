// import { $axios } from '~/utils/api'
export default function (context: any) {
  // Add the userAgent property to the context
  if (process.client) {
    const userAgent = process.server
      ? context.req.headers['user-agent']
      : navigator.userAgent
    context.$api['views/postViews']({
      userAgent,
      form: location.href,
    })
  }
}
