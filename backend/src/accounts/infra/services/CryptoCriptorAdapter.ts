import crypto from 'node:crypto'
import { ICriptor } from '@/accounts/domain/core/infra/services/Criptor'

export class CryptoCriptorAdapter implements ICriptor {
  key: Buffer = crypto.randomBytes(32)
  iv: Buffer = crypto.randomBytes(16)

  encrypt(text: string) {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      this.iv,
    )
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  }

  decrypt(text: string) {
    const encryptedText = Buffer.from(text, 'hex')
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      this.iv,
    )
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }
}
