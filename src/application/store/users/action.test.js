import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { asyncRegisterUser } from './action'
import { register } from '../../../data/api/api'

/**
 * skenario test:
 *
 * asyncRegisterUser thunk
 * - should call register API correctly when success
 * - should call alert when register API failed
 */

vi.mock('../../../data/api/api', () => ({
  register: vi.fn()
}))

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    global.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call register API correctly when success', async () => {
    const fakeInput = {
      name: 'Imelda',
      email: 'imelda@mail.com',
      password: 'password'
    }

    const fakeResponse = {
      id: 'user-1',
      name: 'Imelda'
    }

    register.mockResolvedValue(fakeResponse)
    await asyncRegisterUser(fakeInput)()

    expect(register).toHaveBeenCalledWith(fakeInput)
  })

  it('should call alert when register API failed', async () => {
    const fakeInput = {
      name: 'Tasya',
      email: 'tasya@mail.com',
      password: 'password'
    }

    const fakeError = new Error('Register failed')
    register.mockRejectedValue(fakeError)
    await asyncRegisterUser(fakeInput)()

    expect(register).toHaveBeenCalledWith(fakeInput)
    expect(global.alert).toHaveBeenCalledWith(fakeError.message)
  })
})
