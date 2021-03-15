export const SERVER_PATH = 'https://www.tinker.run/api/'
export const SERVER_USER_PATH = 'https://www.tinker.run/api/' // 'http://127.0.0.1:8088/api/'
// export const SERVER_PATH = 'http://127.0.0.1:8088/api/'
// export const SERVER_USER_PATH = 'http://127.0.0.1:8088/api/'

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 30000,
  // maxContentLength: 100000,
  headers: {},
}

export const API_DEFAULT_CONFIG = {
  mockBaseURL: '',
  mock: false,
  debug: false,
  sep: '/',
}
