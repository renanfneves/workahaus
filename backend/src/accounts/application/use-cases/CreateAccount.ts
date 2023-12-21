import { DuplicatedResourceError } from '@/core/errors/DuplicatedResourceError'
import { ICriptor } from '@/core/infra/services/Criptor'
import { Account } from '@/accounts/domain/entities/Account'
import { Password } from '@/accounts/domain/value-objects/Password'
import { Username } from '@/accounts/domain/value-objects/Username'
import { DomainEvent } from '@/core/entities/DomainEvent'
import { IAccountsRepository } from '@/accounts/domain/repositories/AccountsRepository'

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
    account.register(async (event: DomainEvent) => {
      console.log(event.name)
    })
    const { id } = await this.accountRepository.create(account)
    account.sendAccountCreatedEvent()
    return {
      id,
    }
  }
}
