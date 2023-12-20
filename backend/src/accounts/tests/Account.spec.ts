import { describe, expect, it } from 'vitest'
import { Account } from '../domain/entities/Account'
import { Username } from '../domain/value-objects/Username'
import { randomUUID } from 'node:crypto'
import { Password } from '../domain/value-objects/Password'
import { InvalidCredentialsError } from '../domain/core/errors/InvalidCredentialsError'

describe('account', () => {
  it('should generate unique id when creating a new account', async () => {
    const sut = Account.create(
      'John Doe',
      new Username('john@doe.com'),
      new Password('Password@123'),
    )
    expect(sut.getPassword()).toEqual('Password@123')
    expect(sut.id).toEqual(expect.any(String))
  })
  it.only('should not be possible to create an account with invalid password', async () => {
    expect(() =>
      Account.create(
        'John Doe',
        new Username('john@doe.com'),
        new Password('wrongPassword'),
      ),
    ).toThrow(InvalidCredentialsError)
  })
  it('should restore an account', async () => {
    const id = randomUUID()
    const sut = Account.restore(
      id,
      'John Doe',
      new Username('john@doe.com'),
      new Password('Password@123'),
    )
    expect(sut.id).toEqual(expect.any(String))
  })
})
