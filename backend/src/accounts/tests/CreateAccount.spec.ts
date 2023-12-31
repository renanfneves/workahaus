import { describe, beforeEach, expect, it, beforeAll, vi } from 'vitest'
import { ICriptor } from '../../core/infra/services/Criptor'
import { CryptoCriptorAdapter } from '../infra/services/CryptoCriptorAdapter'
import { InMemoryAccountsRepository } from '../infra/repositories/InMemoryAccountsRepository'
import { DuplicatedResourceError } from '../../core/errors/DuplicatedResourceError'
import { CreateAccountUseCase } from '../application/use-cases/CreateAccount'
import { IAccountsRepository } from '../domain/repositories/AccountsRepository'
import { Account } from '../domain/entities/Account'

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
  it('should notify when a new account is created', async () => {
    const sendAccountCreatedEventSpy = vi.spyOn(
      Account.prototype,
      'sendAccountCreatedEvent',
    )
    await sut.execute({
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: 'Password@123',
    })
    expect(sendAccountCreatedEventSpy).toHaveBeenCalled()
    sendAccountCreatedEventSpy.mockRestore()
  })
})
