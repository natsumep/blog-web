import { SERVER_PATH as serverPath } from '~/config/index'

// const serverPath = "http://222.222.222.125:7001/api";

export const qa = [
  {
    name: 'list',
    method: 'GET',
    path: '/qa',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'detail',
    method: 'GET',
    showErrorText: true,
    path: '/qa/:id',
    serverPath,
  },
  {
    name: 'del',
    method: 'DELETE',
    showErrorText: true,
    path: '/qa/:id',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/qa',
    showErrorText: true,
    serverPath,
    params: {
      value: '',
    },
  },
  // 回答
  {
    name: 'getanswer',
    method: 'GET',
    showErrorText: true,
    path: 'qa/:qaId/answer',
    serverPath,
  },
  {
    name: 'answer',
    method: 'POST',
    showErrorText: true,
    path: 'qa/:qaId/answer',
    serverPath,
  },
  // 回复
  {
    name: 'getcomment',
    method: 'GET',
    path: '/qa/:qaId/comment',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'comment',
    method: 'POST',
    path: '/qa/:answerId/comment',
    showErrorText: true,
    serverPath,
  },
  // 评论
  {
    name: 'getsupplement',
    method: 'GET',
    path: '/qa/supplement/:qaId',
    showErrorText: true,
    serverPath,
  },
  {
    name: 'supplement',
    method: 'POST',
    path: '/qa/supplement',
    showErrorText: true,
    serverPath,
  },
]
