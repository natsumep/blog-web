import { SERVER_PATH as serverPath } from '~/config/index'

export const sentenceMessage = [
  {
    name: 'sentencemessage',
    method: 'GET',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencemessagePost',
    method: 'POST',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencemessageDelete',
    method: 'DELETE',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencecomment',
    method: 'GET',
    path: '/comment/:messageId',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencecommentPost',
    method: 'POST',
    path: '/comment/:messageId',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'sentencecommentDelete',
    method: 'DELETE',
    path: '/comment/:id',
    notShowError: true,
    serverPath: serverPath + 'sentence',
  },
  {
    name: 'caihongmessage',
    method: 'GET',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongmessagePost',
    method: 'POST',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongmessageDelete',
    method: 'DELETE',
    path: '/message/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongcomment',
    method: 'GET',
    path: '/comment/:messageId',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongcommentPost',
    method: 'POST',
    path: '/comment/:messageId',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
  {
    name: 'caihongcommentDelete',
    method: 'DELETE',
    path: '/comment/:id',
    notShowError: true,
    serverPath: serverPath + 'caihong',
  },
]
