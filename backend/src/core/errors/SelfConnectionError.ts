export class SelfConnectionError extends Error {
  constructor() {
    super('Self connection not accepted')
  }
}
