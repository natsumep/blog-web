import { $axios } from '@/utils/api'
import { Message } from 'element-ui'
export async function updateFile(blob: Blob) {
  if (blob.size > 300 * 1024) {
    Message.error('图片超过最大尺寸300kb')
    return false
  }
  const formDate = new FormData()
  formDate.append('file', blob)
  formDate.append('time', String(+new Date()))
  const data: any = await $axios.post('/upload', formDate).catch
  // callback(url)
  const name = (data.url && data.url[0]) || ''
  return name
}
