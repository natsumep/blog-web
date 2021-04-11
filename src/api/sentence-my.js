import { SERVER_PATH as serverPath } from '~/config/index'

export const sentenceMe = [
  {
    name: 'sentencelike',
    method: 'GET',
    path: '/likes',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentenceverify',
    method: 'GET',
    path: '/verify',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencecollect',
    method: 'GET',
    path: '/collect',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentenceupload',
    method: 'GET',
    path: '/upload',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencereport',
    method: 'GET',
    path: '/report',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentenceinfo',
    method: 'GET',
    path: '/info',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },

  {
    name: 'caihonglike',
    method: 'GET',
    path: '/likes',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongverify',
    method: 'GET',
    path: '/verify',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongcollect',
    method: 'GET',
    path: '/collect',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongupload',
    method: 'GET',
    path: '/upload',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongreport',
    method: 'GET',
    path: '/report',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihonginfo',
    method: 'GET',
    path: '/info',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
]
