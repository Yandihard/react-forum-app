import { describe, it, expect } from 'vitest'
import threadsReducer from './reducer'
import { ActionType } from './action'

/**
* test scenario for threadsReducer
*
* - threadsReducers function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the threads with the new thread when given by CREATE_THREAD action
*  - should return the threads with the toggled like thread when given by TOGGLE_LIKE_THREAD action
*  - should return the threads with the toggled dislike thread when given by TOGGLE_DISLIKE_THREAD action
*  - should return the threads with the toggled neutral thread when given by NEUTRALIZE_THREAD action
*
*/

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = []
    const action = { type: 'UNKNOWN' }

    const nextState = threadsReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = []
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    }

    const nextState = threadsReducer(initialState, action)

    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return the threads with the new thread when given by CREATE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Lama',
        body: 'Body lama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Body baru',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }

    const action = {
      type: ActionType.CREATE_THREAD,
      payload: {
        thread: newThread
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual([newThread, ...initialState])
  })

  it('should toggle like thread correctly', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: []
      }
    ]
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState[0].upVotesBy).toContain('user-1')
    expect(nextState[0].downVotesBy).not.toContain('user-1')
  })

  it('should toggle dislike thread correctly', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: []
      }
    ]
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState[0].downVotesBy).toContain('user-1')
    expect(nextState[0].upVotesBy).not.toContain('user-1')
  })

  it('should neutralize vote thread correctly', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: ['user-1']
      }
    ]
    const action = {
      type: ActionType.NEUTRALIZE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState[0].upVotesBy).not.toContain('user-1')
    expect(nextState[0].downVotesBy).not.toContain('user-1')
  })
})
