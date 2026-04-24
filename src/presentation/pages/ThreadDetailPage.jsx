import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  asyncDetailThread, 
  asyncToggleLikeThreadDetail, 
  asyncToggleDislikeThreadDetail, 
  asyncNeutralizeThreadDetail, 
  asyncCreateComment, 
  asyncToggleLikeComment, 
  asyncToggleDislikeComment, 
  asyncNeutralizeComment 
} from '../../application/store/threadDetail/action'
import { postedAt } from '../../data/api/time'
import { cleanHtml } from '../../data/api/truncate'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { MdOutlineSend } from 'react-icons/md'
import { Helmet } from 'react-helmet'

const ThreadDetailPage = () => {
  const thread = useSelector((state) => state.detailThread)
  const authUser = useSelector((state) => state.authUser)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(asyncDetailThread(id))
  }, [dispatch, id])

  if (!thread) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-3xl mb-8"></div>
      </div>
    )
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

  const isLiked = upVotesBy.includes(authUser?.id)
  const isDisliked = downVotesBy.includes(authUser?.id)

  const onLikeClick = () => {
    if (!authUser) return
    if (isLiked) dispatch(asyncNeutralizeThreadDetail({ threadId: id }))
    else dispatch(asyncToggleLikeThreadDetail({ threadId: id }))
  }

  const onDislikeClick = () => {
    if (!authUser) return
    if (isDisliked) dispatch(asyncNeutralizeThreadDetail({ threadId: id }))
    else dispatch(asyncToggleDislikeThreadDetail({ threadId: id }))
  }

  const onLikeCommentClick = (commentId) => {
    if (!authUser) return
    const comment = comments.find(c => c.id === commentId)
    const isLiked = comment.upVotesBy.includes(authUser.id)
    if (isLiked) dispatch(asyncNeutralizeComment({ threadId: id, commentId }))
    else dispatch(asyncToggleLikeComment({ threadId: id, commentId }))
  }

  const onDislikeCommentClick = (commentId) => {
    if (!authUser) return
    const comment = comments.find(c => c.id === commentId)
    const isDisliked = comment.downVotesBy.includes(authUser.id)
    if (isDisliked) dispatch(asyncNeutralizeComment({ threadId: id, commentId }))
    else dispatch(asyncToggleDislikeComment({ threadId: id, commentId }))
  }

  const createComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    dispatch(asyncCreateComment({ threadId: id, content: comment }))
    setComment('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
      <Helmet>
        <title>{title} - Forumify</title>
      </Helmet>

      {/* Thread Header & Body */}
      <article className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 mb-10 transition-all duration-300">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-500/30">
              #{category}
            </span>
            <span className="text-sm text-slate-400 font-medium">
              Diterbitkan pada {postedAt(createdAt)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <img src={owner.avatar} alt={owner.name} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">{owner.name}</p>
              <p className="text-xs text-slate-500">Penulis Utama</p>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: cleanHtml(body) }}
        />

        <footer className="flex items-center gap-6 pt-8 border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <button 
              onClick={onLikeClick}
              className={`flex items-center gap-2 transition-all hover:scale-110 active:scale-90 ${isLiked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}
            >
              {isLiked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
              <span className="font-bold">{upVotesBy.length}</span>
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" />
            <button 
              onClick={onDislikeClick}
              className={`flex items-center gap-2 transition-all hover:scale-110 active:scale-90 ${isDisliked ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'}`}
            >
              {isDisliked ? <AiFillDislike size={24} /> : <AiOutlineDislike size={24} />}
              <span className="font-bold">{downVotesBy.length}</span>
            </button>
          </div>
        </footer>
      </article>

      {/* Comment Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            Komentar <span className="text-indigo-600 dark:text-indigo-400 ml-2">({comments.length})</span>
          </h3>
        </div>

        {/* Comment Input */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-700">
          <form onSubmit={createComment} className="relative">
            <textarea
              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white rounded-2xl p-4 pr-16 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Berikan pendapatmu di sini..."
            />
            <button 
              type="submit"
              className="absolute bottom-4 right-4 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <MdOutlineSend size={20} />
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.map(comment => {
            const isCommentLiked = comment.upVotesBy.includes(authUser?.id)
            const isCommentDisliked = comment.downVotesBy.includes(authUser?.id)
            return (
              <div key={comment.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-50 dark:border-slate-700/50 shadow-sm">
                <header className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={comment.owner.avatar} alt={comment.owner.name} className="w-8 h-8 rounded-full shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{comment.owner.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{postedAt(comment.createdAt)}</p>
                    </div>
                  </div>
                </header>
                <div 
                  className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 pl-1"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
                <div className="flex items-center gap-4 pl-1">
                  <button 
                    onClick={() => onLikeCommentClick(comment.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-110 ${isCommentLiked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
                  >
                    {isCommentLiked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
                    {comment.upVotesBy.length}
                  </button>
                  <button 
                    onClick={() => onDislikeCommentClick(comment.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-110 ${isCommentDisliked ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`}
                  >
                    {isCommentDisliked ? <AiFillDislike size={18} /> : <AiOutlineDislike size={18} />}
                    {comment.downVotesBy.length}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ThreadDetailPage
