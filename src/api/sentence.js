export const sentence = [
  {
    name: 'index',
    method: 'GET',
    path: '/',
    notShowError: true,
    serverPath: 'https://api.tinker.run/sentence',
  },
  {
    name: 'like',
    method: 'POST',
    path: '/like/:id',
    notShowError: true,
    serverPath: 'https://api.tinker.run/sentence',
  },
  {
    name: 'unlike',
    method: 'POST',
    path: '/unlike/:id',
    notShowError: true,
    serverPath: 'https://api.tinker.run/sentence',
  },
]
