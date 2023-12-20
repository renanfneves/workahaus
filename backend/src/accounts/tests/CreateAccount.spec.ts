import { describe, beforeEach, expect, it, beforeAll } from 'vitest'
import { ICriptor } from '../domain/core/infra/services/Criptor'
import { IAccountsRepository } from '../domain/core/infra/repositories/AccountsRepository'
import { CryptoCriptorAdapter } from '../infra/services/CryptoCriptorAdapter'
import { InMemoryAccountsRepository } from '../infra/repositories/InMemoryAccountsRepository'
import { DuplicatedResourceError } from '../domain/core/errors/DuplicatedResourceError'
import { CreateAccountUseCase } from '../application/use-cases/CreateAccount'

let criptor: ICriptor
let accountRepository: IAccountsRepository
let sut: CreateAccountUseCase

describe('CreateAccountUseCase', () => {
  beforeAll(() => {
    criptor = new CryptoCriptorAdapter()
  })
  beforeEach(() => {
    accountRepository = new InMemoryAccountsRepository()
    sut = new CreateAccountUseCase(accountRepository, criptor)
  })
  it('should not be possible to create an account with an existing username', async () => {
    const account = {
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: 'Password@123',
    }
    await sut.execute(account)
    await expect(sut.execute(account)).rejects.toBeInstanceOf(
      DuplicatedResourceError,
    )
  })
  it('should be possible to create an account', async () => {
    const account = {
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: 'Password@123',
    }
    const { id } = await sut.execute(account)
    expect(id).toEqual(expect.any(String))
  })
})
