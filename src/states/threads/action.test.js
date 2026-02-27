import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  asyncCreateThread,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
  asyncNeutralizeThread,
  toggleLikeThreadActionCreator,
  toggleDislikeThreadActionCreator,
  neutralizeThreadActionCreator,
  createThreadActionCreator
} from './action'
import * as api from '../../utils/api'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'

/**
 * test scenario for asyncCreateThread thunk
 *
 * - asyncCreateThread function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch hideLoading and alert when data fetching failed
 *
 */

/**
 * test scenario for asyncToggleLikeThread thunk
 *
 * - asyncToggleLikeThread function
 *   - should dispatch toggleLikeThreadActionCreator when success
 *   - should dispatch toggleLikeThreadActionCreator twice when failed
 *
 */

/**
 * test scenario for asyncToggleDislikeThread thunk
 *
 * - asyncToggleDislikeThread function
 *   - should dispatch toggleDislikeThreadActionCreator when success
 *   - should dispatch toggleDislikeThreadActionCreator twice when failed
 *
 */

/**
 * test scenario for asyncNeutralizeThread thunk
 *
 * - asyncNeutralizeThread function
 *   - should dispatch neutralizeThreadActionCreator when success
 *   - should dispatch neutralizeThreadActionCreator twice when failed
 *
 */

describe('threads thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'createThread')
    vi.spyOn(api, 'upVoteThread')
    vi.spyOn(api, 'downVoteThread')
    vi.spyOn(api, 'neutralVoteThread')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should dispatch action correctly when asyncCreateThread success', async () => {
    const fakeThread = {
      id: 'thread-1',
      title: 'test',
      body: 'test'
    }

    api.createThread.mockResolvedValue(fakeThread)

    const dispatch = vi.fn()
    await asyncCreateThread({
      title: 'test',
      body: 'test',
      category: 'test'
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator({ thread: fakeThread })
    )

    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch toggleLikeThreadActionCreator when asyncToggleLikeThread success', async () => {
    const dispatch = vi.fn()
    const getState = () => ({
      authUser: {
        id: 'user-1'
      }
    })

    api.upVoteThread.mockResolvedValue()
    await asyncToggleLikeThread({
      threadId: 'thread-1'
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(
      toggleLikeThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1'
      })
    )
  })

  it('should dispatch toggleDislikeThreadActionCreator when asyncToggleDislikeThread success', async () => {
    const dispatch = vi.fn()
    const getState = () => ({
      authUser: {
        id: 'user-1'
      }
    })

    api.downVoteThread.mockResolvedValue()
    await asyncToggleDislikeThread({
      threadId: 'thread-1'
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(
      toggleDislikeThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1'
      })
    )
  })

  it('should dispatch neutralizeThreadActionCreator when asyncNeutralizeThread success', async () => {
    const dispatch = vi.fn()
    const getState = () => ({
      authUser: {
        id: 'user-1'
      }
    })

    api.neutralVoteThread.mockResolvedValue()
    await asyncNeutralizeThread({
      threadId: 'thread-1'
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1'
      })
    )
  })
})
