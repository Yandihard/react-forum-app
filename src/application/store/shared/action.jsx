import { getAllThreads, getAllUsers } from '../../../data/api/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'
import { showNotificationActionCreator } from '../notification/action'

function asyncPopulateThreadsAndUsers () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const threads = await getAllThreads()
      const users = await getAllUsers()

      dispatch(receiveThreadsActionCreator(threads))
      dispatch(receiveUsersActionCreator(users))
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
    }
    dispatch(hideLoading())
  }
}

export { asyncPopulateThreadsAndUsers }
