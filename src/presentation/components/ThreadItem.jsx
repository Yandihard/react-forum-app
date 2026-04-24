import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postedAt } from '../../data/api/time'
import { truncateHtml } from '../../data/api/truncate'

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
} from '../../application/store/threads/action'

const ThreadItem = ({ thread, user, authUser }) => {
  const dispatch = useDispatch()
  const isLiked = thread.upVotesBy.includes(authUser?.id)
  const isDisliked = thread.downVotesBy.includes(authUser?.id)

  function onLikeClick (e) {
    e.preventDefault()
    if (!authUser) return
    if (isLiked) {
      dispatch(asyncNeutralizeThread({ threadId: thread.id }))
    } else {
      dispatch(asyncToggleLikeThread({ threadId: thread.id }))
    }
  }

  function onDislikeClick (e) {
    e.preventDefault()
    if (!authUser) return
    if (isDisliked) {
      dispatch(asyncNeutralizeThread({ threadId: thread.id }))
    } else {
      dispatch(asyncToggleDislikeThread({ threadId: thread.id }))
    }
  }

  return (
    <Link to={`/threads/${thread.id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/10 group-hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-500/20">
            #{thread.category}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {postedAt(thread.createdAt)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {thread.title}
        </h3>

        <div
          className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: truncateHtml(thread.body, 200)
          }}
        />

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-700 object-cover"
            />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {user?.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <button
                onClick={onLikeClick}
                className={`flex items-center gap-1.5 transition-all hover:scale-110 active:scale-90 ${isLiked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500'}`}
              >
                {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                <span className="text-xs font-bold">{thread.upVotesBy.length}</span>
              </button>

              <button
                onClick={onDislikeClick}
                className={`flex items-center gap-1.5 transition-all hover:scale-110 active:scale-90 ${isDisliked ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500 hover:text-rose-500'}`}
              >
                {isDisliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                <span className="text-xs font-bold">{thread.downVotesBy.length}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
              <MdOutlineInsertComment size={20} />
              <span className="text-xs font-bold">{thread.totalComments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
    totalComments: PropTypes.number,
    createdAt: PropTypes.string,
    ownerId: PropTypes.string
  }).isRequired,
  user: PropTypes.object,
  authUser: PropTypes.shape({
    id: PropTypes.string
  })
}

export default ThreadItem
