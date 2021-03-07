export const word = [
  {
    name: 'index',
    method: 'GET',
    path: '/',
    showErrorText: true,
    serverPath: 'https://api.tinker.run/oword',
  },
  {
    name: 'like',
    method: 'POST',
    path: '/like/:id',
    showErrorText: true,
    serverPath: 'https://api.tinker.run/oword',
  },
  {
    name: 'unlike',
    method: 'POST',
    path: '/unlike/:id',
    showErrorText: true,
    serverPath: 'https://api.tinker.run/oword',
  },
]
