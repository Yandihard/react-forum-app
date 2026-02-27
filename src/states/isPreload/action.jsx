import { getOwnProfile } from '../../utils/api'
import { setAuthUserActionCreator } from '../authUser/action'
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar'

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreloadActionCreator (isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  }
}

function asyncPreloadProcess () {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const authuser = await getOwnProfile()
      dispatch(setAuthUserActionCreator(authuser))
    } catch (error) {
      dispatch(setAuthUserActionCreator(null))
    } finally {
      dispatch(setIsPreloadActionCreator(false))
    }
    dispatch(hideLoading())
  }
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess }
