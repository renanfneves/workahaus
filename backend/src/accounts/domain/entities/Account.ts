import { randomUUID } from 'node:crypto'
import { Username } from '../value-objects/Username'
import { Password } from '../value-objects/Password'
import Aggregate from '@/core/entities/Aggregate'
import { AccountCreatedEvent } from '../events/AccountCreated'

export class Account extends Aggregate {
  private constructor(
    readonly id: string,
    public name: string,
    readonly username: Username,
    readonly password: Password,
    private avatarUrl?: string,
  ) {
    super()
  }

  static create(
    name: string,
    username: Username,
    password: Password,
    avatarUrl?: string,
  ) {
    const id = randomUUID()
    return new Account(id, name, username, password, avatarUrl)
  }

  static restore(
    id: string,
    name: string,
    username: Username,
    password: Password,
    avatarUrl?: string,
  ) {
    return new Account(id, name, username, password, avatarUrl)
  }

  getPassword() {
    return this.password.value
  }

  sendAccountCreatedEvent() {
    this.notify(new AccountCreatedEvent(this.id, this.name))
  }

  updateAvatarUrl(url: string) {
    this.avatarUrl = url
  }

  getAvatar() {
    return this.avatarUrl
  }
}
