import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncCreateThread } from '../states/threads/action'
import ThreadInput from '../components/ThreadInput'

const AddThreadPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function addThreadHandler (title, category, body) {
    await dispatch(asyncCreateThread({ title, category, body }))
    navigate('/')
  }

  return (
        <ThreadInput onAddThread={addThreadHandler} />
  )
}

export default AddThreadPage
