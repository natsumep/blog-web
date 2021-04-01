import { SERVER_PATH as serverPath } from '~/config/index'

export const message = [
  {
    name: 'list',
    method: 'GET',
    showErrorText: true,
    path: '/message/:id',
    serverPath,
  },
  {
    name: 'add',
    method: 'POST',
    path: '/message/:id',
    notShowError: true,
    serverPath,
  },
  {
    name: 'delete',
    method: 'DELETE',
    path: '/message/:id',
    notShowError: true,
    serverPath,
  },
  {
    name: 'commentList',
    method: 'GET',
    showErrorText: true,
    path: '/message/comment/:messageId',
    serverPath,
  },
  {
    name: 'commentAdd',
    method: 'POST',
    path: '/message/comment/:messageId',
    notShowError: true,
    serverPath,
  },
  {
    name: 'commentDelete',
    method: 'DELETE',
    path: '/message/comment/:id',
    notShowError: true,
    serverPath,
  },
]
