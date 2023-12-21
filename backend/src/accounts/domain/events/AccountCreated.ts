import { DomainEvent } from '@/core/entities/DomainEvent'

export class AccountCreatedEvent implements DomainEvent {
  name = 'accountCreated'

  constructor(
    readonly accountId: string,
    readonly accountName: string,
  ) {}
}
