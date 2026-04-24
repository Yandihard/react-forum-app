import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'
import { ActionType } from './action'

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 *
 */

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null

    const action = {
      type: 'UNKNOWN'
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    const initialState = null

    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    }

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser
      }
    }

    const nextState = authUserReducer(initialState, action)
    expect(nextState).toEqual(authUser)
  })

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    }

    const action = {
      type: ActionType.UNSET_AUTH_USER
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(null)
  })
})
