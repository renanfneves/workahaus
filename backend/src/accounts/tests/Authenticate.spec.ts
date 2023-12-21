import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../application/use-cases/Authenticate'
import { InMemoryAccountsRepository } from '../infra/repositories/InMemoryAccountsRepository'
import { ICriptor } from '../../core/infra/services/Criptor'
import { CryptoCriptorAdapter } from '../infra/services/CryptoCriptorAdapter'
import { Username } from '../domain/value-objects/Username'
import { Account } from '../domain/entities/Account'
import { InvalidCredentialsError } from '../../core/errors/InvalidCredentialsError'
import { Password } from '../domain/value-objects/Password'
import { IAccountsRepository } from '../domain/repositories/AccountsRepository'

let criptor: ICriptor
let accountsRepository: IAccountsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeAll(() => {
    criptor = new CryptoCriptorAdapter()
  })
  beforeEach(async () => {
    accountsRepository = new InMemoryAccountsRepository()
    const account = Account.create(
      'John Doe',
      new Username('johndoe@example.com'),
      new Password('Password@123'),
    )
    await accountsRepository.create(account)
    sut = new AuthenticateUseCase(accountsRepository, criptor)
  })

  it('should be able to authenticate', async () => {
    const { account } = await sut.execute({
      username: 'johndoe@example.com',
      password: 'Password@123',
    })

    expect(account.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong username', async () => {
    await expect(() =>
      sut.execute({
        username: 'wrong@example.com',
        password: 'Password@123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate wrong password', async () => {
    await expect(() =>
      sut.execute({
        username: 'johndoe@example.com',
        password: 'Password@125',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
