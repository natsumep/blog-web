import * as CryptoJS from 'crypto-js'
const iv = CryptoJS.enc.Utf8.parse('tptdtpcbptptbtpc')
function decrypt(word: any, key: any) {
  const content = word
  key = CryptoJS.enc.Utf8.parse(key)
  const bytes = CryptoJS.AES.decrypt(content.toString(), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptResult = bytes.toString(CryptoJS.enc.Utf8)
  return decryptResult
  // return decryptedStr.toString();
}

// 加密方法
function encrypt(word: any, key: any) {
  const content = word
  key = CryptoJS.enc.Utf8.parse(key) // abcdefghigkliopk密码，16位
  const encryptResult = CryptoJS.AES.encrypt(content, key, {
    iv,
    mode: CryptoJS.mode.CBC, // aes加密模式cbc
    padding: CryptoJS.pad.Pkcs7, // 填充
  })
  const result = String(encryptResult) // 把object转化为string
  return result
}

export default {
  encrypt,
  decrypt,
}
