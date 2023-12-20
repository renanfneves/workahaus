import { randomUUID } from 'node:crypto'
import { Username } from '../value-objects/Username'
import { Password } from '../value-objects/Password'

export class Account {
  private constructor(
    readonly id: string,
    public name: string,
    readonly username: Username,
    readonly password: Password,
  ) {}

  static create(name: string, username: Username, password: Password) {
    const id = randomUUID()
    return new Account(id, name, username, password)
  }

  static restore(
    id: string,
    name: string,
    username: Username,
    password: Password,
  ) {
    return new Account(id, name, username, password)
  }

  getPassword() {
    return this.password.value
  }
}
