import { describe, expect, it } from 'vitest'
import { Connection } from '../domain/entities/Connection'
import { randomUUID } from 'node:crypto'
import { SelfConnectionError } from '@/core/errors/SelfConnectionError'
import { InvalidStatusError } from '@/core/errors/InvalidStatusError'

describe('Connection', () => {
  it('should request a connection', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    expect(sut.getStatus()).toBe('requested')
  })
  it('should be possible to accept a connection', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.accept()
    expect(sut.getStatus()).toBe('accepted')
  })
  it('should not be possible to accept a connection a rejected connection', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.reject()

    expect(() => sut.accept()).toThrow(InvalidStatusError)
  })
  it('should not be possible to accept a connection twice', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.accept()

    expect(() => sut.accept()).toThrow(InvalidStatusError)
  })
  it('should be possible to reject a connection', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.reject()
    expect(sut.getStatus()).toBe('rejected')
  })
  it('should not be possible to reject a connection a accepted connection', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.accept()
    expect(() => sut.reject()).toThrow(InvalidStatusError)
  })
  it('should not be possible to reject a connection twice', () => {
    const sut = Connection.create(
      { id: randomUUID(), name: 'John Doe' },
      { id: randomUUID(), name: 'Fulano Detal' },
    )
    sut.accept()
    expect(() => sut.accept()).toThrow(InvalidStatusError)
  })
  it('should not be possible to a user request a connection with himself', () => {
    const id = randomUUID()

    expect(() =>
      Connection.create({ id, name: 'John Doe' }, { id, name: 'John Doe' }),
    ).toThrow(SelfConnectionError)
  })
})
