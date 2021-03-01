import { article } from './article'
import { user } from './user'
import { comments } from './comments'
import { SERVER_PATH as serverPath } from '~/config/index'

export default {
  file: [
    {
      name: 'put',
      method: 'POST',
      path: '/upload',
      serverPath: 'http://222.222.222.125:8081',
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
  article,
  user,
  comments,
}
