import { SERVER_PATH as serverPath } from '~/config/index'

// const serverPath = "http://222.222.222.125:7001/api";

export const qa = [
  {
    name: 'list',
    method: 'GET',
    path: '/qa',
    serverPath,
  },
  {
    name: 'detail',
    method: 'GET',
    path: '/qa/:id',
    serverPath,
  },
  {
    name: 'del',
    method: 'DELETE',
    path: '/qa/:id',
    serverPath,
  },
  {
    name: 'create',
    method: 'POST',
    path: '/qa',
    serverPath,
    params: {
      value: '',
    },
  },
  // 回答
  {
    name: 'getanswer',
    method: 'GET',
    path: 'qa/:qaId/answer',
    serverPath,
  },
  {
    name: 'answer',
    method: 'POST',
    path: 'qa/:qaId/answer',
    serverPath,
  },
  // 回复
  {
    name: 'getcomment',
    method: 'GET',
    path: '/qa/:answerId/comment',
    serverPath,
  },
  {
    name: 'comment',
    method: 'POST',
    path: '/qa/:answerId/comment',
    serverPath,
  },
  {
    name: 'commentDelete',
    method: 'delete',
    path: '/qa/comment/:id',
    serverPath,
  },
  // 评论
  {
    name: 'getsupplement',
    method: 'GET',
    path: '/qa/supplement/:qaId',
    serverPath,
  },
  {
    name: 'supplement',
    method: 'POST',
    path: '/qa/supplement/:qaId',
    serverPath,
  },
  {
    name: 'supplementDelete',
    method: 'delete',
    path: '/qa/supplement/:id',
    serverPath,
  },
]
