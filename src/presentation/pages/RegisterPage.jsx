import RegisterInput from '../components/RegisterInput'
import { useDispatch } from 'react-redux'
import { asyncRegisterUser } from '../../application/store/users/action'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerHandler = async ({ name, email, password }) => {
    const success = await dispatch(asyncRegisterUser({ name, email, password }))
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12">
      <Helmet>
        <title>Register - Forumify</title>
      </Helmet>
      <RegisterInput onRegister={registerHandler} />
    </div>
  )
}

export default RegisterPage
