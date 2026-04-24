import { login, getOwnProfile, putAccessToken, clearAccessToken, putUserProfile } from '../../../data/api/api'
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar'

import { showNotificationActionCreator } from '../notification/action'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

function setAuthUserActionCreator (authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

function unsetAuthUserActionCreator () {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}

function asyncSetAuthUser ({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const token = await login({ email, password })
      putAccessToken(token)
      const authUser = await getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
      putUserProfile(authUser)
      dispatch(showNotificationActionCreator({ 
        message: `Selamat datang kembali, ${authUser.name}!`, 
        type: 'success' 
      }))
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
    }
    dispatch(hideLoading())
  }
}

function asyncUnsetAuthUser () {
  return (dispatch) => {
    clearAccessToken()
    dispatch(unsetAuthUserActionCreator())
  }
}

export { ActionType, asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator }
