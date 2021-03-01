import { $axios } from '@/utils/api'

export async function updateFile(blob: Blob) {
  const formDate = new FormData()
  formDate.append('file', blob)
  formDate.append('time', String(+new Date()))
  const data: any = await $axios.post('/upload', formDate)
  // callback(url)
  const name = data.url[0]
  return name
}
