import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  asyncPopulateLeaderboards,
  receiveLeaderboardsActionCreator
} from './action'
import * as api from '../../utils/api'
import {
  showLoading,
  hideLoading
} from '@dimasmds/react-redux-loading-bar'

/**
 * test scenario for asyncPopulateLeaderboards thunk
 *
 * - asyncPopulateLeaderboards function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch alert and hideLoading when data fetching failed
 *
 */

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getLeaderboards')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    const fakeLeaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'User 1',
          avatar: 'avatar-1.png'
        },
        score: 100
      }
    ]

    api.getLeaderboards.mockResolvedValue(fakeLeaderboards)
    const dispatch = vi.fn()
    await asyncPopulateLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboards)
    )

    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch alert and hideLoading when data fetching failed', async () => {
    const fakeError = new Error('Failed')
    api.getLeaderboards.mockRejectedValue(fakeError)
    const dispatch = vi.fn()
    global.alert = vi.fn()
    await asyncPopulateLeaderboards()(dispatch)

    expect(global.alert).toHaveBeenCalledWith(fakeError.message)
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
