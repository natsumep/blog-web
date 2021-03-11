export const word = [
  {
    name: 'index',
    method: 'GET',
    path: '/',
    notShowError: true,
    serverPath: 'https://api.tinker.run/oword',
  },
  {
    name: 'like',
    method: 'POST',
    path: '/like/:id',
    notShowError: true,
    serverPath: 'https://api.tinker.run/oword',
  },
  {
    name: 'unlike',
    method: 'POST',
    path: '/unlike/:id',
    notShowError: true,
    serverPath: 'https://api.tinker.run/oword',
  },
]
