import { InvalidStatusError } from '@/core/errors/InvalidStatusError'
import { Connection } from './Connection'

export abstract class ConnectionStatus {
  abstract value: string

  constructor(readonly connection: Connection) {}

  abstract request(): void
  abstract accept(): void
  abstract reject(): void
}

export class RequestedStatus extends ConnectionStatus {
  value: string

  constructor(connection: Connection) {
    super(connection)
    this.value = 'requested'
  }

  request(): void {
    throw new InvalidStatusError()
  }

  accept(): void {
    this.connection.status = new AcceptedStatus(this.connection)
  }

  reject(): void {
    this.connection.status = new RejectedStatus(this.connection)
  }
}

export class AcceptedStatus extends ConnectionStatus {
  value: string

  constructor(connection: Connection) {
    super(connection)
    this.value = 'accepted'
  }

  request(): void {
    throw new InvalidStatusError()
  }

  accept(): void {
    throw new InvalidStatusError()
  }

  reject(): void {
    throw new InvalidStatusError()
  }
}

export class RejectedStatus extends ConnectionStatus {
  value: string

  constructor(connection: Connection) {
    super(connection)
    this.value = 'rejected'
  }

  request(): void {
    throw new InvalidStatusError()
  }

  accept(): void {
    throw new InvalidStatusError()
  }

  reject(): void {
    throw new InvalidStatusError()
  }
}

export class RideStatusFactory {
  static create(type: string, connection: Connection) {
    if (type === 'requested') return new RequestedStatus(connection)
    if (type === 'accepted') return new AcceptedStatus(connection)
    if (type === 'rejected') return new RejectedStatus(connection)
    throw new Error()
  }
}
