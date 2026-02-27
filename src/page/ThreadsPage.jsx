import ThreadItem from '../components/ThreadItem'
import AddThreadButton from '../components/AddThreadButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { asyncPopulateThreadsAndUsers } from '../states/shared/action'
import { Helmet } from 'react-helmet'

const ThreadsPage = () => {
  const dispatch = useDispatch()
  const threads = useSelector((state) => state.threads)
  const users = useSelector((state) => state.users)
  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers())
  }, [dispatch])

  return (
   <>
        <Helmet>
            <title>Threads - Forum App</title>
        </Helmet>
    <div className="container bg-white shadow">
      <div className="container-wrapper">
        <h3 className="mb-4">Diskusi tersedia</h3>
        <div className="div threads-list">
          {threads.map((thread) => {
            const user = users.find(
              (user) => user.id === thread.ownerId
            )

            return (
             <>
              <ThreadItem key={thread.id} thread={thread} user={user} authUser={authUser} />
              <AddThreadButton />
            </>
            )
          })}
        </div>
      </div>
    </div>
  </>
  )
}

export default ThreadsPage
