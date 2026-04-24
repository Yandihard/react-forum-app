import { createThread, upVoteThread, downVoteThread, neutralVoteThread } from '../../../data/api/api'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'
import { showNotificationActionCreator } from '../notification/action'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
  NEUTRALIZE_THREAD: 'NEUTRALIZE_THREAD'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function createThreadActionCreator ({ thread }) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread
    }
  }
}

function toggleLikeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleDislikeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function neutralizeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function asyncCreateThread ({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const thread = await createThread({ title, body, category })
      dispatch(createThreadActionCreator({ thread }))
      dispatch(showNotificationActionCreator({ 
        message: 'Diskusi berhasil dipublikasikan!', 
        type: 'success' 
      }))
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
    }
    dispatch(hideLoading())
  }
}

function asyncToggleLikeThread ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await upVoteThread(threadId)
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncToggleDislikeThread ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await downVoteThread(threadId)
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
      dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncNeutralizeThread ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(neutralizeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await neutralVoteThread(threadId)
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
      dispatch(neutralizeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  toggleLikeThreadActionCreator,
  toggleDislikeThreadActionCreator,
  asyncCreateThread,
  neutralizeThreadActionCreator,
  asyncNeutralizeThread,
  asyncToggleDislikeThread,
  asyncToggleLikeThread
}
