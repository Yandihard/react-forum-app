import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncCreateThread } from '../../application/store/threads/action'
import ThreadInput from '../components/ThreadInput'
import { Helmet } from 'react-helmet'

const AddThreadPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addThreadHandler = ({ title, category, body }) => {
    dispatch(asyncCreateThread({ title, category, body }))
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12">
      <Helmet>
        <title>New Thread - Forumify</title>
      </Helmet>
      <ThreadInput onAddThread={addThreadHandler} />
    </div>
  )
}

export default AddThreadPage
