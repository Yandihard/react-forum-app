import { getAllThreads, getAllUsers } from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'

function asyncPopulateThreadsAndUsers () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const threads = await getAllThreads()
      const users = await getAllUsers()

      dispatch(receiveThreadsActionCreator(threads))
      dispatch(receiveUsersActionCreator(users))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export { asyncPopulateThreadsAndUsers }
