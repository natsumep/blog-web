import { SERVER_PATH as serverPath } from '~/config/index'

export const user = [
  {
    name: 'detail',
    method: 'GET',
    path: '/user',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/user',
    serverPath,
  },
  {
    name: 'update',
    method: 'PUT',
    path: '/user',
    serverPath,
    params: {
      value: '',
    },
  },
]
