import { SERVER_PATH as serverPath } from '~/config/index'

export const article = [
  {
    name: 'list',
    method: 'GET',
    path: '/article',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'type',
    method: 'GET',
    path: '/articleType',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'detail',
    method: 'GET',
    showErrorText: true,
    path: '/article/:id',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/article',
    showErrorText: true,
    serverPath,
    params: {
      value: '',
    },
  },
  {
    name: 'update',
    method: 'PUT',
    showErrorText: true,
    path: '/article/:id',
    serverPath,
    params: {
      value: '',
    },
  },
  {
    name: 'delete',
    method: 'DELETE',
    showErrorText: true,
    path: '/article/:id',
    serverPath,
    params: {
      value: '',
    },
  },
]
