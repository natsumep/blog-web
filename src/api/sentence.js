import { SERVER_PATH as serverPath } from '~/config/index'

export const sentence = [
  {
    name: 'type',
    method: 'GET',
    path: '/type',
    notShowError: true,

    serverPath: serverPath + 'sentence',
  },
  {
    name: 'add',
    method: 'POST',
    path: '/add',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'index',
    method: 'GET',
    path: '/',
    params: {
      from: 'web',
    },
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'indexid',
    method: 'GET',
    path: '/id/:uuid',
    params: {
      from: 'web',
    },
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'like',
    method: 'POST',
    path: '/like/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'unlike',
    method: 'POST',
    path: '/unlike/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'collce',
    method: 'POST',
    path: '/collect/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'uncollce',
    method: 'POST',
    path: '/uncollect/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'report',
    method: 'POST',
    path: '/report',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },

  {
    name: 'caihongadd',
    method: 'POST',
    path: '/add',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihong',
    method: 'GET',
    path: '/',
    params: {
      from: 'web',
    },
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongid',
    method: 'GET',
    path: '/id/:uuid',
    params: {
      from: 'web',
    },
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihonglike',
    method: 'POST',
    path: '/like/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongunlike',
    method: 'POST',
    path: '/unlike/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongcollce',
    method: 'POST',
    path: '/collect/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihonguncollce',
    method: 'POST',
    path: '/uncollect/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongreport',
    method: 'POST',
    path: '/report',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
]
