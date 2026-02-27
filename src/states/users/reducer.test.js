import { describe, it, expect } from 'vitest'
import usersReducer from './reducer'
import { ActionType } from './action'

/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the users when given by RECEIVE_USERS action
 *
 */

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []

    const action = {
      type: 'UNKNOWN'
    }

    const nextState = usersReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return the users when given by RECEIVE_USERS action', () => {
    const initialState = []
    const users = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg'
      }
    ]

    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users
      }
    }

    const nextState = usersReducer(initialState, action)

    expect(nextState).toEqual(users)
  })
})
