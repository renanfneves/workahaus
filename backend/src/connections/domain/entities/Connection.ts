import Aggregate from '@/core/entities/Aggregate'
import { ConnectionStatus, RideStatusFactory } from './ConnectionStatus'
import { ConnectionPerson } from './ConnectionPerson'
import { randomUUID } from 'node:crypto'
import { SelfConnectionError } from '@/core/errors/SelfConnectionError'

export class Connection extends Aggregate {
  status: ConnectionStatus

  constructor(
    private readonly id: string,
    readonly requester: ConnectionPerson,
    readonly addressee: ConnectionPerson,
    status: string,
    readonly createdAt: Date,
  ) {
    super()
    this.status = RideStatusFactory.create(status, this)
  }

  static create(requester: ConnectionPerson, addressee: ConnectionPerson) {
    if (requester.id === addressee.id) throw new SelfConnectionError()
    const id = randomUUID()
    const status = 'requested'
    const createdAt = new Date()
    return new Connection(id, requester, addressee, status, createdAt)
  }

  accept() {
    this.status.accept()
  }

  reject() {
    this.status.reject()
  }

  getStatus() {
    return this.status.value
  }
}
