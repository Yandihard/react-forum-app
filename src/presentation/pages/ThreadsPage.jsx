import ThreadItem from '../components/ThreadItem'
import AddThreadButton from '../components/AddThreadButton'
import SkeletonThreadCard from '../components/SkeletonThreadCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { asyncPopulateThreadsAndUsers } from '../../application/store/shared/action'
import { Helmet } from 'react-helmet'

const ThreadsPage = () => {
  const dispatch = useDispatch()
  const threads = useSelector((state) => state.threads)
  const users = useSelector((state) => state.users)
  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers())
  }, [dispatch])

  const isLoading = threads.length === 0 && users.length === 0

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <Helmet>
        <title>Threads - Forumify</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">Diskusi Terbaru</h2>
          <p className="text-slate-500 dark:text-slate-400">Temukan dan bagikan ide menarik hari ini</p>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <>
            <SkeletonThreadCard />
            <SkeletonThreadCard />
            <SkeletonThreadCard />
          </>
        ) : (
          threads.map((thread) => {
            const user = users.find((user) => user.id === thread.ownerId)
            return (
              <ThreadItem 
                key={thread.id} 
                thread={thread} 
                user={user} 
                authUser={authUser} 
              />
            )
          })
        )}
      </div>

      <AddThreadButton />
    </div>
  )
}

export default ThreadsPage
