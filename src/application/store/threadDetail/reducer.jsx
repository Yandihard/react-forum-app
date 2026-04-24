import { ActionType } from './action'

function detailThreadReducer (detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.thread

    case ActionType.CLEAR_DETAIL_THREAD:
      return null

    case ActionType.TOGGLE_LIKE_DETAIL_THREAD: {
      if (!detailThread || detailThread.id !== action.payload.threadId) {
        return detailThread
      }

      const { userId } = action.payload

      const isLiked = detailThread.upVotesBy.includes(userId)

      return {
        ...detailThread,

        upVotesBy: isLiked
          ? detailThread.upVotesBy.filter((id) => id !== userId)
          : detailThread.upVotesBy.concat(userId),

        downVotesBy: detailThread.downVotesBy.filter((id) => id !== userId)
      }
    }

    case ActionType.TOGGLE_DISLIKE_DETAIL_THREAD: {
      if (!detailThread || detailThread.id !== action.payload.threadId) {
        return detailThread
      }

      const { userId } = action.payload

      const isDisliked = detailThread.downVotesBy.includes(userId)

      return {
        ...detailThread,

        downVotesBy: isDisliked
          ? detailThread.downVotesBy.filter((id) => id !== userId)
          : detailThread.downVotesBy.concat(userId),

        upVotesBy: detailThread.upVotesBy.filter((id) => id !== userId)
      }
    }

    case ActionType.NEUTRALIZE_DETAIL_THREAD: {
      if (!detailThread || detailThread.id !== action.payload.threadId) {
        return detailThread
      }

      const { userId } = action.payload

      return {
        ...detailThread,

        upVotesBy: detailThread.upVotesBy.filter((id) => id !== userId),

        downVotesBy: detailThread.downVotesBy.filter((id) => id !== userId)
      }
    }

    case ActionType.CREATE_COMMENT:

      return {
        ...detailThread,

        comments: [
          action.payload.comment,
          ...detailThread.comments
        ]

      }

    case ActionType.TOGGLE_LIKE_COMMENT: {
      const { commentId, userId } = action.payload

      return {
        ...detailThread,
        comments: detailThread.comments.map(comment => {
          if (comment.id !== commentId) {
            return comment
          }

          const isLiked = comment.upVotesBy.includes(userId)

          return {
            ...comment,

            upVotesBy: isLiked
              ? comment.upVotesBy.filter(id => id !== userId)
              : comment.upVotesBy.concat(userId),

            downVotesBy: comment.downVotesBy.filter(id => id !== userId)

          }
        })
      }
    }

    case ActionType.TOGGLE_DISLIKE_COMMENT: {
      const { commentId, userId } = action.payload

      return {
        ...detailThread,

        comments: detailThread.comments.map(comment => {
          if (comment.id !== commentId) {
            return comment
          }

          const isDisliked = comment.downVotesBy.includes(userId)

          return {

            ...comment,

            downVotesBy: isDisliked
              ? comment.downVotesBy.filter(id => id !== userId)
              : comment.downVotesBy.concat(userId),

            upVotesBy: comment.upVotesBy.filter(id => id !== userId)

          }
        })
      }
    }

    case ActionType.TOGGLE_NEUTRALIZE_COMMENT: {
      if (!detailThread || detailThread.id !== action.payload.threadId) {
        return detailThread
      }

      const { commentId, userId } = action.payload

      return {
        ...detailThread,

        comments: detailThread.comments.map((comment) => {
          if (comment.id !== commentId) {
            return comment
          }

          return {
            ...comment,

            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== userId
            ),

            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== userId
            )

          }
        })

      }
    }

    default:
      return detailThread
  }
}

export default detailThreadReducer
