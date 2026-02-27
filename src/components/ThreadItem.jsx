import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postedAt } from '../utils/time'
import { truncateHtml } from '../utils/truncate'

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike
} from 'react-icons/ai'

import { MdOutlineInsertComment } from 'react-icons/md'

import {
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
  asyncNeutralizeThread
} from '../states/threads/action'

const ThreadItem = ({ thread, user, authUser }) => {
  const dispatch = useDispatch()
  const isLiked = thread.upVotesBy.includes(authUser.id)
  const isDisliked = thread.downVotesBy.includes(authUser.id)

  function onLikeClick () {
    if (isLiked) {
      dispatch(asyncNeutralizeThread({ threadId: thread.id }))
    } else {
      dispatch(asyncToggleLikeThread({ threadId: thread.id }))
    }
  }

  function onDislikeClick () {
    if (isDisliked) {
      dispatch(asyncNeutralizeThread({ threadId: thread.id }))
    } else {
      dispatch(asyncToggleDislikeThread({ threadId: thread.id }))
    }
  }

  return (
    <div className="thread-card mb-2">
      <div className="thread-card__header">
        <span className="thread-card__category">#{thread.category}</span>
        <h3 className="thread-card__title"><Link to={`/threads/${thread.id}`}>{thread.title}</Link></h3>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: truncateHtml(thread.body, 200)
        }}
      />

      <div className="thread-card__footer my-2">
        <div className="thread-card__actions">
          {/* LIKE */}
          <span
            className="thread-card__action"
            onClick={onLikeClick}
            style={{ cursor: 'pointer' }}
          >
            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}{' '}
            {thread.upVotesBy.length}
          </span>

          {/* DISLIKE */}
          <span
            className="thread-card__action"
            onClick={onDislikeClick}
            style={{ cursor: 'pointer' }}
          >
            {isDisliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}{' '}
            {thread.downVotesBy.length}
          </span>

          {/* COMMENT */}
          <span className="thread-card__action">
            <MdOutlineInsertComment size={20}/> {thread.totalComments}
          </span>
        </div>
        <div className="thread-card__meta">
          <span>{postedAt(thread.createdAt)}</span>
          <span>
            Dibuat oleh <strong>{user.name}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    upVotesBy: PropTypes.number,
    downVotesBy: PropTypes.number,
    totalComments: PropTypes.number,
    createdAt: PropTypes.string,
    ownerId: PropTypes.string
  }).isRequired,
  user: PropTypes.string.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
}

export default ThreadItem
