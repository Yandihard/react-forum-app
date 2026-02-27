import { describe, it, expect } from 'vitest'
import leaderboardsReducer from './reducer'
import { ActionType } from './action'

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 *
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []

    const action = {
      type: 'UNKNOWN'
    }

    const nextState = leaderboardsReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    const initialState = []

    const leaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'User 1',
          avatar: 'avatar-1.png'
        },
        score: 100
      },
      {
        user: {
          id: 'users-2',
          name: 'User 2',
          avatar: 'avatar-2.png'
        },
        score: 90
      }
    ]

    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards
      }
    }

    const nextState = leaderboardsReducer(initialState, action)
    expect(nextState).toEqual(leaderboards)
  })
})
