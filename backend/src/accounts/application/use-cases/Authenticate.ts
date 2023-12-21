import { InvalidCredentialsError } from '@/core/errors/InvalidCredentialsError'
import { ICriptor } from '@/core/infra/services/Criptor'
import { Account } from '@/accounts/domain/entities/Account'
import { IAccountsRepository } from '@/accounts/domain/repositories/AccountsRepository'

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
