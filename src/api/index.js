import { article } from './article'
import { user } from './user'
import { comments } from './comments'
import { sentence } from './sentence'
import { qa } from './qa'
import { SERVER_PATH as serverPath } from '~/config/index'

export default {
  file: [
    {
      name: 'put',
      method: 'POST',
      path: '/upload',
    },
  ],
  views: [
    {
      name: 'getViews',
      method: 'GET',
      path: '/views',
      serverPath,
    },
    {
      name: 'postViews',
      method: 'POST',
      path: '/views',
      serverPath,
    },
  ],
  login: [
    {
      name: 'index',
      method: 'POST',
      path: '/login',
      serverPath,
      notShowError: true,
    },
  ],
  article,
  user,
  comments,
  sentence,
  qa,
}
