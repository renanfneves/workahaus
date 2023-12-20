import { DuplicatedResourceError } from '@/accounts/domain/core/errors/DuplicatedResourceError'
import { IAccountsRepository } from '@/accounts/domain/core/infra/repositories/AccountsRepository'
import { ICriptor } from '@/accounts/domain/core/infra/services/Criptor'
import { Account } from '@/accounts/domain/entities/Account'
import { Password } from '@/accounts/domain/value-objects/Password'
import { Username } from '@/accounts/domain/value-objects/Username'

interface CreateAccountInput {
  name: string
  username: string
  password: string
}

interface CreateAccountOutput {
  id: string
}

export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: IAccountsRepository,
    private readonly criptor: ICriptor,
  ) {}

  async execute({
    name,
    username,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    const existingAccount =
      await this.accountRepository.findByUsername(username)
    if (existingAccount) throw new DuplicatedResourceError()

    const account = Account.create(
      name,
      new Username(username),
      new Password(password),
    )
    const { id } = await this.accountRepository.create(account)
    return {
      id,
    }
  }
}
