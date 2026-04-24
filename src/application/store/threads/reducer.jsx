import { ActionType } from './action'

function threadsReducer (threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads
    case ActionType.DETAIL_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            isDetail: true
          }
        }
        return {
          ...thread,
          isDetail: false
        }
      })
    case ActionType.CREATE_THREAD:
      return [action.payload.thread, ...threads]

    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread
        }

        const { userId } = action.payload

        const isLiked = thread.upVotesBy.includes(userId)

        return {

          ...thread,

          upVotesBy: isLiked
            ? thread.upVotesBy.filter((id) => id !== userId)
            : thread.upVotesBy.concat(userId),

          downVotesBy: thread.downVotesBy.filter((id) => id !== userId)

        }
      })

    case ActionType.TOGGLE_DISLIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread
        }

        const { userId } = action.payload

        const isDisliked = thread.downVotesBy.includes(userId)

        return {

          ...thread,

          downVotesBy: isDisliked
            ? thread.downVotesBy.filter((id) => id !== userId)
            : thread.downVotesBy.concat(userId),

          upVotesBy: thread.upVotesBy.filter((id) => id !== userId)

        }
      })

    case ActionType.NEUTRALIZE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread
        }

        const { userId } = action.payload

        return {

          ...thread,

          upVotesBy: thread.upVotesBy.filter((id) => id !== userId),

          downVotesBy: thread.downVotesBy.filter((id) => id !== userId)

        }
      })

    default:
      return threads
  }
}

export default threadsReducer
