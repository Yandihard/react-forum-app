import { register } from '../../../data/api/api'
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar'
import { showNotificationActionCreator } from '../notification/action'

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
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      await register({ name, email, password })
      dispatch(showNotificationActionCreator({ 
        message: 'Akun berhasil dibuat! Silakan masuk.', 
        type: 'success' 
      }))
      dispatch(hideLoading())
      return true
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
      dispatch(hideLoading())
      return false
    }
  }
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator }
