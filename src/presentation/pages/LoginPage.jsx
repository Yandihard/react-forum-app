import LoginInput from '../components/LoginInput'
import { useDispatch } from 'react-redux'
import { asyncSetAuthUser } from '../../application/store/authUser/action'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12">
      <Helmet>
        <title>Login - Forumify</title>
      </Helmet>
      <LoginInput onLogin={onLogin} />
    </div>
  )
}

export default LoginPage
