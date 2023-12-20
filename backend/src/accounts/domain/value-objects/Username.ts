import { InvalidCredentialsError } from '../core/errors/InvalidCredentialsError'

export class Username {
  constructor(readonly value: string) {
    if (this.isInvalidEmail(value)) throw new InvalidCredentialsError()
  }

  isInvalidEmail(value: string) {
    return !value.match(/^(.+)@(.+)$/)
  }
}
