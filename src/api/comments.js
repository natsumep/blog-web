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
    showErrorText: true,
    serverPath,
  },
  {
    name: 'delete',
    method: 'DELETE',
    path: '/article/comment/:articleId',
    showErrorText: true,
    serverPath,
  },
]
