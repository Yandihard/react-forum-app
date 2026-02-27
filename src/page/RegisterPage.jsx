import RegisterInput from '../components/RegisterInput'
import { useDispatch } from 'react-redux'
import { asyncRegisterUser } from '../states/users/action'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function registerHandler (name, email, password) {
    await dispatch(asyncRegisterUser({ name, email, password }))
    navigate('/')
  }
  return (
    <RegisterInput onRegister={registerHandler} />
  )
}

export default RegisterPage
