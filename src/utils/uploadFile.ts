import { $axios } from '@/utils/api'
// import { Message } from 'element-ui'
import Compressor from 'compressorjs'
export async function updateFile(blob: Blob) {
  const size = blob.size
  let file: any = blob
  if (size > 1024 * 950) {
    try {
      file = await compressorFile(blob)
    } catch (e) {
      return false
    }
  }
  const formDate = new FormData()
  formDate.append('file', file, file.name)
  formDate.append('time', String(+new Date()))
  const data: any = await $axios.post('/upload', formDate).catch()
  // callback(url)
  const name = (data.url && data.url[0]) || ''
  return name
}

function compressorFile(blob: Blob): any {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(blob, {
      quality: 1,
      maxWidth: 1000,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
