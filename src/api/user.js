import { SERVER_PATH as serverPath } from '~/config/index'

export const user = [
  {
    name: 'detail',
    method: 'GET',
    showErrorText: true,
    path: '/user',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/user',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'update',
    method: 'PUT',
    showErrorText: true,
    path: '/user',
    serverPath,
    params: {
      value: '',
    },
  },
]
