import LoginInput from '../components/LoginInput'
import { useDispatch } from 'react-redux'
import { asyncSetAuthUser } from '../states/authUser/action'
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
   <>
    <Helmet>
      <title>Login - Forum App</title>
    </Helmet>
    <LoginInput onLogin={onLogin} />
  </>
  )
}

export default LoginPage
