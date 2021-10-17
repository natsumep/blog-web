import { SERVER_PATH as serverPath } from '~/config/index'

export const recipe = [
  {
    name: 'upfood',
    method: 'POST',
    showErrorText: true,
    path: '/recipe/:id',
    serverPath,
  },
  {
    name: 'loadlist',
    method: 'GET',
    showErrorText: true,
    path: '/recipe/',
    serverPath,
  },
  {
    name: 'loaddetail',
    method: 'GET',
    showErrorText: true,
    path: '/recipe/:id',
    serverPath,
  },
]
