import { beforeAll, describe, expect, it } from 'vitest'
import { ICriptor } from '../domain/core/infra/services/Criptor'
import { CryptoCriptorAdapter } from '../infra/services/CryptoCriptorAdapter'

let sut: ICriptor

describe('BcryptJsCriptorAdapter', () => {
  beforeAll(() => {
    sut = new CryptoCriptorAdapter()
  })

  it('should encrypt a string', async () => {
    expect(sut.encrypt('123456')).toEqual(expect.any(String))
  })

  it('should decrypt a string', async () => {
    const value = '123456'
    const encrypted = sut.encrypt(value)
    const decrypted = sut.decrypt(encrypted)
    await expect(value).toEqual(decrypted)
  })
})
