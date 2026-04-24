import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator
} from './action'
import {
  showLoading,
  hideLoading
} from '@dimasmds/react-redux-loading-bar'
import * as api from '../../../data/api/api'

vi.mock('../../../data/api/api', () => ({
  login: vi.fn(),
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
  clearAccessToken: vi.fn(),
  putUserProfile: vi.fn()
}))

/**
 * test scenario for asyncSetAuthUser thunk
 *
 * - asyncSetAuthUser function
 *   - should dispatch action correctly when login success
 *   - should dispatch alert when login failed
 *
 */

/**
 * test scenario for asyncUnsetAuthUser thunk
 *
 * - asyncUnsetAuthUser function
 *   - should dispatch unsetAuthUserActionCreator correctly
 *
 */

describe('authUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.alert = vi.fn()
  })

  it('should dispatch action correctly when login success', async () => {
    const fakeToken = 'token'
    const fakeUser = {
      id: 'user-1',
      name: 'User',
      email: 'user@test.com',
      avatar: 'avatar.png'
    }

    api.login.mockResolvedValue(fakeToken)
    api.getOwnProfile.mockResolvedValue(fakeUser)
    const dispatch = vi.fn()

    await asyncSetAuthUser({
      email: 'user@test.com',
      password: 'password'
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken)
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeUser)
    )

    expect(api.putUserProfile).toHaveBeenCalledWith(fakeUser)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch alert when login failed', async () => {
    const fakeError = new Error('Login failed')
    api.login.mockRejectedValue(fakeError)
    const dispatch = vi.fn()

    await asyncSetAuthUser({
      email: 'user@test.com',
      password: 'wrong'
    })(dispatch)

    expect(global.alert).toHaveBeenCalledWith(fakeError.message)
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch unsetAuthUserActionCreator correctly', () => {
    const dispatch = vi.fn()

    asyncUnsetAuthUser()(dispatch)
    expect(api.clearAccessToken).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(
      unsetAuthUserActionCreator()
    )
  })
})
