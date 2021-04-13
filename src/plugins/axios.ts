/* eslint-disable no-empty-pattern */
/* eslint-disable no-console */
import { assign, isEmpty } from 'lodash'
import { Plugin } from '@nuxt/types'
import qs from 'qs'
import { $axios } from '~/utils/api'
import API_CONFIG from '~/api'
import { API_DEFAULT_CONFIG } from '~/config'
class MakeApi {
  api: any = {}
  constructor(options: any) {
    this.apiBuilder(options)
  }

  apiBuilder({
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
  }: any) {
    Object.keys(config).forEach((namespace) => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace],
      })
    })
  }

  _apiSingleBuilder({
    namespace,
    sep = '|',
    config = {},
    mock = false,
    debug = false,
  }: // mockBaseURL = '',
  any) {
    config.forEach((api: any) => {
      const {
        name,
        desc,
        params,
        method,
        path,
        mockPath,
        showErrorText,
        serverPath = '',
        notShowError,
        notRouterError,
        hasLoading,
      } = api
      const apiName = `${namespace}${sep}${name}`
      const url = mock ? mockPath : path
      if (debug) {
        if (!name) throw new Error(`${url} :接口name属性不能为空`)
        if (url[0] !== '/') {
          throw new Error(`${url} :接口路径path，首字符应为/`)
        }
      }
      Object.defineProperty(this.api, apiName, {
        value(outerParams: any, outerOptions: any) {
          const _data = isEmpty(outerParams)
            ? params
            : assign({}, params, outerParams)
          const reurl = replaceUrl(url, _data)
          return $axios(
            _normoalize(
              assign(
                {
                  url: reurl,
                  desc,
                  apiName,
                  hasLoading,
                  showErrorText,
                  baseURL: serverPath,
                  method,
                  notShowError,
                  notRouterError,
                  path,
                },
                outerOptions
              ),
              _data
            )
          )
        },
      })
    })
  }
}
function replaceUrl(url: string, option: any = {}) {
  let arr = url.split('/')
  arr = arr.map((item) => {
    if (item && item[0] === ':') {
      const val = option[item.slice(1)]
      return val ?? ''
    }
    return item
  })
  return arr.join('/')
}
function _normoalize(options: any, data: any) {
  if (options.method === 'POST' || options.method === 'PUT') {
    options.data = data
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    options.transformRequest = [
      function (data: any) {
        const ret = []
        for (const it in data) {
          ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
        }
        return ret.join('&')
      },
    ]
  } else if (options.method === 'GET') {
    // data = qs.stringify(data, {arrayFormat: 'brackets'})
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
    options.params = data
    options.paramsSerializer = function (params: any) {
      return qs.stringify(params, {
        arrayFormat: 'brackets',
      })
    }
  }
  return options
}

const pulgin: Plugin = ({}, inject) => {
  const _def: any = new MakeApi({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG,
  }).api
  inject('api', _def)
}

export default pulgin
