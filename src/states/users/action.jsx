import { register } from '../../utils/api'

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
}

function receiveUsersActionCreator (users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  }
}

function asyncRegisterUser ({ name, email, password }) {
  return async () => {
    try {
      const result = await register({ name, email, password })
      console.log('Register Data:', result)
    } catch (error) {
      alert(error.message)
    }
  }
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator }
