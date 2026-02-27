import { getDetailThread, upVoteThread, downVoteThread, neutralVoteThread, createComment, upVoteComment, downVoteComment, neutralVoteComment } from '../../utils/api'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
  TOGGLE_NEUTRALIZE_COMMENT: 'TOGGLE_NEUTRALIZE_COMMENT',
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_DETAIL_THREAD: 'TOGGLE_LIKE_DETAIL_THREAD',
  TOGGLE_DISLIKE_DETAIL_THREAD: 'TOGGLE_DISLIKE_DETAIL_THREAD',
  NEUTRALIZE_DETAIL_THREAD: 'NEUTRALIZE_DETAIL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT'
}

function detailThreadActionCreator (thread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      thread
    }
  }
}

function cleardetailThreadActionCreator () {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL
  }
}

function toggleLikeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_DETAIL_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleDislikeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_DETAIL_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function neutralizeThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function createCommentActionCreator (comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment
    }
  }
}

function toggleLikeCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  }
}

function toggleDislikeCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  }
}

function neutralizeCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRALIZE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  }
}

function asyncDetailThread (threadId) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const thread = await getDetailThread(threadId)
      dispatch(detailThreadActionCreator(thread))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleLikeThreadDetail ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await upVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncToggleDislikeThreadDetail ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await downVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncNeutralizeThreadDetail ({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(neutralizeThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await neutralVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(neutralizeThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncCreateComment ({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const comment = await createComment({ threadId, content })
      dispatch(createCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleLikeComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleLikeCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await upVoteComment({ threadId, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(toggleLikeCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

function asyncToggleDislikeComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleDislikeCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await downVoteComment({ threadId, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(toggleDislikeCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

function asyncNeutralizeComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(neutralizeCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await neutralVoteComment({ threadId, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(neutralizeCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

export {
  ActionType,
  detailThreadActionCreator,
  cleardetailThreadActionCreator,
  asyncDetailThread,
  asyncToggleLikeThreadDetail,
  asyncToggleDislikeThreadDetail,
  asyncNeutralizeThreadDetail,
  asyncCreateComment,
  asyncToggleLikeComment,
  asyncToggleDislikeComment,
  asyncNeutralizeComment
}
