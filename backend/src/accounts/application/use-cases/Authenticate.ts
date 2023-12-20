import { InvalidCredentialsError } from '@/accounts/domain/core/errors/InvalidCredentialsError'
import { IAccountsRepository } from '@/accounts/domain/core/infra/repositories/AccountsRepository'
import { ICriptor } from '@/accounts/domain/core/infra/services/Criptor'
import { Account } from '@/accounts/domain/entities/Account'

interface AuthenticateUseCaseInput {
  username: string
  password: string
}

type AuthenticateUseCaseOutput = {
  account: Account
}

export class AuthenticateUseCase {
  constructor(
    private readonly accountsRepository: IAccountsRepository,
    private readonly criptor: ICriptor,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const account = await this.accountsRepository.findByUsername(username)
    if (!account) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatches = password === account.getPassword()
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return {
      account,
    }
  }
}
