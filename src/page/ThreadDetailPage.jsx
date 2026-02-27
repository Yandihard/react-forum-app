import '../style/ThreadDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { asyncDetailThread, asyncToggleLikeThreadDetail, asyncToggleDislikeThreadDetail, asyncNeutralizeThreadDetail, asyncCreateComment, asyncToggleLikeComment, asyncToggleDislikeComment, asyncNeutralizeComment } from '../states/threadDetail/action'
import { postedAt } from '../utils/time'
import { cleanHtml } from '../utils/truncate'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'

const ThreadDetailPage = () => {
  const thread = useSelector((state) => state.detailThread)
  const authUser = useSelector((state) => state.authUser)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(asyncDetailThread(id))
    // console.log('Data', { thread })
  }, [dispatch, id])

  if (!thread) {
    return null
  }

  const {
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    comments
  } = thread

  const isLiked = thread.upVotesBy.includes(authUser.id)
  const isDisliked = thread.downVotesBy.includes(authUser.id)

  function onLikeClick () {
    if (isLiked) {
      dispatch(asyncNeutralizeThreadDetail({ threadId: id }))
    } else {
      dispatch(asyncToggleLikeThreadDetail({ threadId: id }))
    }
  }

  function onDislikeClick () {
    if (isDisliked) {
      dispatch(asyncNeutralizeThreadDetail({ threadId: id }))
    } else {
      dispatch(asyncToggleDislikeThreadDetail({ threadId: id }))
    }
  }

  function onLikeCommentClick (commentId) {
    const comment = comments.find(comment => comment.id === commentId)
    const isLiked = comment.upVotesBy.includes(authUser.id)

    if (isLiked) {
      dispatch(asyncNeutralizeComment({
        threadId: id,
        commentId
      }))
    } else {
      dispatch(asyncToggleLikeComment({
        threadId: id,
        commentId
      }))
    }
  }

  function onDislikeCommentClick (commentId) {
    const comment = comments.find(comment => comment.id === commentId)
    const isDisliked = comment.downVotesBy.includes(authUser.id)

    if (isDisliked) {
      dispatch(asyncNeutralizeComment({
        threadId: id,
        commentId
      }))
    } else {
      dispatch(asyncToggleDislikeComment({
        threadId: id,
        commentId
      }))
    }
  }

  function createComment (event) {
    event.preventDefault()

    dispatch(asyncCreateComment({
      threadId: id,
      content: comment
    }))

    setComment('')
  }

  return (

     <div className="container bg-white shadow">
      {/* CATEGORY */}
      <header className="thread-header">
        <p className="thread-header__category thread-card__category">
          #{category}
        </p>
      </header>

      {/* CONTENT */}
      <div className="thread-content">
        {/* TITLE (UNGU) */}
        <h2 className="thread-title">
          {title}
        </h2>
        <div
        className="thread-content__body"
        dangerouslySetInnerHTML={{
          __html: cleanHtml(body)
        }}
      />
      </div>

      {/* FOOTER */}
      <footer className="thread-footer">
        <span
                    className="thread-card__action"
                    onClick={onLikeClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}{' '}
                    {upVotesBy.length}
                  </span>

        <span
                    className="thread-card__action"
                    onClick={onDislikeClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {isDisliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}{' '}
                    {downVotesBy.length}
                  </span>

        {/* OWNER */}
        <div className="owner-info">
          <span>Dibuat oleh</span>
          <img
            src={owner.avatar}
            alt={owner.name}
          />
          <span>{owner.name}</span>
        </div>
        <span className="posted-at">
          {postedAt(createdAt)}
        </span>
      </footer>

      {/* COMMENTS */}
      <div className="thread-comment">
        <div className="thread-comment__input">
          <h4>Beri komentar</h4>
          <form onSubmit={createComment}>

            <textarea
            className="comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis komentar..."

            />
            <button className="btn btn-primary mb-4">Kirim</button>
          </form>
        </div>

        <div className="thread-comment__list">
          <h4>
            Komentar ({comments.length})
          </h4>
        {comments.map(comment => {
          const isCommentLiked = comment.upVotesBy.includes(authUser.id)
          const isCommentDisliked = comment.downVotesBy.includes(authUser.id)
          return (
          <div
            key={comment.id}
            className="comment-item"
          >
            <header>
              <div className="comment-owner">
                <img
                  src={comment.owner.avatar}
                  alt=""
                />
                <span>
                  {comment.owner.name}
                </span>
              </div>
              <span className="posted-at">
                {postedAt(comment.createdAt)}
              </span>
            </header>
            <p>
              <div
                className="thread-content__body"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </p>
            <div className="thread-footer">
                <span
                  className="thread-card__action"
                  onClick={() => onLikeCommentClick(comment.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {isCommentLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}{' '}
                  {comment.upVotesBy.length}
                </span>

                <span
                  className="thread-card__action"
                  onClick={() => onDislikeCommentClick(comment.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {isCommentDisliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}{' '}
                  {comment.downVotesBy.length}
                </span>
            </div>
            <hr />
          </div>
          )
        })}
        </div>
      </div>
      </div>
  )
}

export default ThreadDetailPage
