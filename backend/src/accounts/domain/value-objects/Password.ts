import { InvalidCredentialsError } from '../core/errors/InvalidCredentialsError'

export class Password {
  constructor(readonly value: string) {
    if (this.invalidPassword(value)) throw new InvalidCredentialsError()
  }

  invalidPassword(value: string) {
    return !value.match(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/,
    )
  }
}
