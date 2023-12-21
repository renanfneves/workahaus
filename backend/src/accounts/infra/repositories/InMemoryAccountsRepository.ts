import { Account } from '@/accounts/domain/entities/Account'
import { IAccountsRepository } from '@/accounts/domain/repositories/AccountsRepository'

export class InMemoryAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = []

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((acc: any) => acc.id === id)
    if (!account) return null
    return account
  }

  async findByUsername(username: string): Promise<Account | null> {
    const account = this.accounts.find(
      (acc: any) => acc.username.value === username,
    )
    if (!account) return null
    return account
  }

  async create(account: Account) {
    this.accounts.push(account)
    return {
      id: account.id,
    }
  }
}
