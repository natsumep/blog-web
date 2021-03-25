import { SERVER_PATH as serverPath } from '~/config/index'

export const comments = [
  {
    name: 'list',
    method: 'GET',
    showErrorText: true,
    path: '/article/comment/:articleId',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/article/comment/:articleId',
    notShowError: true,
    serverPath,
  },
  {
    name: 'delete',
    method: 'DELETE',
    path: '/article/comment/:id',
    notShowError: true,
    serverPath,
  },
]
