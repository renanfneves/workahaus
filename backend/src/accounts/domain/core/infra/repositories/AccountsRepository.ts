import { Account } from '@/accounts/domain/entities/Account'

export interface IAccountsRepository {
  findByUsername(username: string): Promise<Account | null>
  findById(id: string): Promise<Account | null>
  create(account: Account): Promise<{ id: string }>
}
